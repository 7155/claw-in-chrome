(function () {
  const STORAGE_KEY = "customProviderConfig";
  const PATCH_FLAG = "__customProviderFormatAdapterPatched__";
  const NATIVE_FETCH_KEY = "__customProviderNativeFetch__";
  const OPENAI_CHAT_FORMAT = "openai_chat";
  const OPENAI_RESPONSES_FORMAT = "openai_responses";
  const ANTHROPIC_FORMAT = "anthropic";
  if (globalThis[PATCH_FLAG]) {
    return;
  }
  globalThis[PATCH_FLAG] = true;
  const nativeFetch = globalThis.fetch.bind(globalThis);
  globalThis[NATIVE_FETCH_KEY] = nativeFetch;
  let cachedConfig = null;
  let hasLoadedConfig = false;
  function normalizeFormat(value) {
    const format = String(value || "").trim().toLowerCase();
    if (!format || format === ANTHROPIC_FORMAT) {
      return ANTHROPIC_FORMAT;
    }
    if (format === "openai" || format === OPENAI_CHAT_FORMAT) {
      return OPENAI_CHAT_FORMAT;
    }
    if (format === "responses" || format === OPENAI_RESPONSES_FORMAT) {
      return OPENAI_RESPONSES_FORMAT;
    }
    return ANTHROPIC_FORMAT;
  }
  function inferFormat(source) {
    const explicitFormat = String(source?.format || "").trim();
    if (explicitFormat) {
      return normalizeFormat(explicitFormat);
    }
    const baseUrl = String(source?.baseUrl || "").trim().toLowerCase();
    if (/\/responses$/i.test(baseUrl)) {
      return OPENAI_RESPONSES_FORMAT;
    }
    if (/\/chat\/completions$/i.test(baseUrl)) {
      return OPENAI_CHAT_FORMAT;
    }
    const name = String(source?.name || "").trim().toLowerCase();
    const model = String(source?.defaultModel || "").trim().toLowerCase();
    if (name.includes("openai") || name.includes("gpt") || model.startsWith("gpt-") || model.startsWith("chatgpt") || isOpenAIOSeries(model)) {
      return OPENAI_CHAT_FORMAT;
    }
    return ANTHROPIC_FORMAT;
  }
  function normalizeConfig(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    return {
      enabled: true,
      name: String(source.name || "").trim(),
      baseUrl: String(source.baseUrl || "").trim().replace(/\/+$/, ""),
      apiKey: String(source.apiKey || "").trim(),
      defaultModel: String(source.defaultModel || "").trim(),
      notes: String(source.notes || "").trim(),
      format: inferFormat(source)
    };
  }
  async function readConfig() {
    if (!globalThis.chrome?.storage?.local) {
      cachedConfig = normalizeConfig({});
      hasLoadedConfig = true;
      return cachedConfig;
    }
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    cachedConfig = normalizeConfig(stored[STORAGE_KEY]);
    hasLoadedConfig = true;
    return cachedConfig;
  }
  async function getConfig() {
    if (hasLoadedConfig) {
      return cachedConfig;
    }
    return readConfig();
  }
  if (globalThis.chrome?.storage?.onChanged) {
    chrome.storage.onChanged.addListener(function (changes, areaName) {
      if (areaName !== "local" || !changes[STORAGE_KEY]) {
        return;
      }
      cachedConfig = normalizeConfig(changes[STORAGE_KEY].newValue);
      hasLoadedConfig = true;
    });
  }
  function debugLog(type, payload, level) {
    try {
      globalThis.__CP_SIDEPANEL_DEBUG__?.log(type, payload, level);
    } catch {}
  }
  function truncateText(value, maxLength) {
    const text = typeof value === "string" ? value : String(value || "");
    const limit = Number.isFinite(maxLength) && maxLength > 0 ? maxLength : 400;
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...[truncated]";
  }
  function resolvePromptCacheUserId(body) {
    return String(body?.metadata?.user_id || "").trim();
  }
  function buildPromptCacheKey(body, format) {
    const userId = resolvePromptCacheUserId(body);
    if (!userId) {
      return "";
    }
    const model = String(body?.model || "").trim() || "unknown";
    return truncateText("claw:" + String(format || "openai") + ":" + model + ":" + userId, 240);
  }
  function resolvePromptCacheRetention(body) {
    const retention = String(body?.prompt_cache_retention || "").trim().toLowerCase();
    if (retention === "24h" || retention === "in_memory") {
      return retention;
    }
    return "in_memory";
  }
  function applyPromptCacheHints(target, body, format) {
    if (!target || !body || typeof target !== "object" || typeof body !== "object") {
      return;
    }
    const promptCacheKey = buildPromptCacheKey(body, format);
    if (!promptCacheKey) {
      return;
    }
    target.prompt_cache_key = promptCacheKey;
    target.prompt_cache_retention = resolvePromptCacheRetention(body);
  }
  function findSseSeparator(buffer) {
    const lfIndex = buffer.indexOf("\n\n");
    const crlfIndex = buffer.indexOf("\r\n\r\n");
    if (lfIndex === -1 && crlfIndex === -1) {
      return null;
    }
    if (lfIndex === -1) {
      return {
        index: crlfIndex,
        length: 4
      };
    }
    if (crlfIndex === -1) {
      return {
        index: lfIndex,
        length: 2
      };
    }
    if (crlfIndex < lfIndex) {
      return {
        index: crlfIndex,
        length: 4
      };
    }
    return {
      index: lfIndex,
      length: 2
    };
  }
  function isOpenAIOSeries(model) {
    const name = String(model || "").trim().toLowerCase();
    return name.length > 1 && name.startsWith("o") && /\d/.test(name[1]);
  }
  function supportsReasoningEffort(model) {
    const name = String(model || "").trim().toLowerCase();
    if (isOpenAIOSeries(name)) {
      return true;
    }
    if (!name.startsWith("gpt-")) {
      return false;
    }
    const rest = name.slice(4);
    return !!rest && /\d/.test(rest[0]) && rest[0] >= "5";
  }
  function resolveReasoningEffort(body) {
    const explicit = body?.output_config?.effort;
    if (explicit === "low" || explicit === "medium" || explicit === "high") {
      return explicit;
    }
    if (explicit === "max") {
      return "xhigh";
    }
    const thinking = body?.thinking;
    if (!thinking || typeof thinking !== "object") {
      return null;
    }
    if (thinking.type === "adaptive") {
      return "high";
    }
    if (thinking.type !== "enabled") {
      return null;
    }
    const budget = Number(thinking.budget_tokens);
    if (!Number.isFinite(budget)) {
      return "high";
    }
    if (budget < 4000) {
      return "low";
    }
    if (budget < 16000) {
      return "medium";
    }
    return "high";
  }
  function cleanSchema(schema) {
    if (!schema || typeof schema !== "object") {
      return schema;
    }
    if (Array.isArray(schema)) {
      return schema.map(cleanSchema);
    }
    const result = {
      ...schema
    };
    if (result.format === "uri") {
      delete result.format;
    }
    if (result.properties && typeof result.properties === "object") {
      const nextProperties = {};
      for (const [key, value] of Object.entries(result.properties)) {
        nextProperties[key] = cleanSchema(value);
      }
      result.properties = nextProperties;
    }
    if (result.items) {
      result.items = cleanSchema(result.items);
    }
    return result;
  }
  function safeJsonParse(text, fallback) {
    try {
      return JSON.parse(text);
    } catch {
      return fallback;
    }
  }
  function stringifyContent(value) {
    if (typeof value === "string") {
      return value;
    }
    if (value == null) {
      return "";
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  function isChatLikeProvider(config, body) {
    const baseUrl = String(config?.baseUrl || "").trim().toLowerCase();
    const name = String(config?.name || "").trim().toLowerCase();
    const model = String(body?.model || config?.defaultModel || "").trim().toLowerCase();
    if (/\/chat\/completions$/i.test(baseUrl)) {
      return true;
    }
    return name.includes("openai") || name.includes("gpt") || model.startsWith("gpt-") || model.startsWith("chatgpt") || isOpenAIOSeries(model);
  }
  function buildProviderRequestCandidates(config, body) {
    const requestedFormat = normalizeFormat(config?.format);
    const candidates = [{
      format: requestedFormat,
      reason: "configured_format"
    }];
    if (requestedFormat === OPENAI_RESPONSES_FORMAT && isChatLikeProvider(config, body) && !/\/responses$/i.test(String(config?.baseUrl || ""))) {
      candidates.push({
        format: OPENAI_CHAT_FORMAT,
        reason: "responses_fallback_to_chat"
      });
    }
    return candidates;
  }
  function buildAnthropicUsageFromChat(usage) {
    const inputTokens = Number(usage?.prompt_tokens || 0);
    const outputTokens = Number(usage?.completion_tokens || 0);
    const result = {
      input_tokens: Number.isFinite(inputTokens) ? inputTokens : 0,
      output_tokens: Number.isFinite(outputTokens) ? outputTokens : 0
    };
    const cachedTokens = usage?.prompt_tokens_details?.cached_tokens ?? usage?.cache_read_input_tokens;
    const createdTokens = usage?.cache_creation_input_tokens;
    if (Number.isFinite(Number(cachedTokens))) {
      result.cache_read_input_tokens = Number(cachedTokens);
    }
    if (Number.isFinite(Number(createdTokens))) {
      result.cache_creation_input_tokens = Number(createdTokens);
    }
    return result;
  }
  function buildAnthropicUsageFromResponses(usage) {
    const inputTokens = Number(usage?.input_tokens || 0);
    const outputTokens = Number(usage?.output_tokens || 0);
    const result = {
      input_tokens: Number.isFinite(inputTokens) ? inputTokens : 0,
      output_tokens: Number.isFinite(outputTokens) ? outputTokens : 0
    };
    const cachedTokens = usage?.input_tokens_details?.cached_tokens ?? usage?.prompt_tokens_details?.cached_tokens ?? usage?.cache_read_input_tokens;
    const createdTokens = usage?.cache_creation_input_tokens;
    if (Number.isFinite(Number(cachedTokens))) {
      result.cache_read_input_tokens = Number(cachedTokens);
    }
    if (Number.isFinite(Number(createdTokens))) {
      result.cache_creation_input_tokens = Number(createdTokens);
    }
    return result;
  }
  function getSafeAnthropicUsage(usage) {
    if (usage && typeof usage === "object") {
      return {
        input_tokens: Number.isFinite(Number(usage.input_tokens)) ? Number(usage.input_tokens) : 0,
        output_tokens: Number.isFinite(Number(usage.output_tokens)) ? Number(usage.output_tokens) : 0,
        cache_read_input_tokens: Number.isFinite(Number(usage.cache_read_input_tokens)) ? Number(usage.cache_read_input_tokens) : 0,
        cache_creation_input_tokens: Number.isFinite(Number(usage.cache_creation_input_tokens)) ? Number(usage.cache_creation_input_tokens) : 0
      };
    }
    return {
      input_tokens: 0,
      output_tokens: 0,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 0
    };
  }
  function mapChatStopReason(finishReason, hasToolUse) {
    if (finishReason === "tool_calls" || finishReason === "function_call") {
      return "tool_use";
    }
    if (finishReason === "length") {
      return "max_tokens";
    }
    if (finishReason === "stop" || finishReason === "content_filter") {
      return "end_turn";
    }
    if (!finishReason && hasToolUse) {
      return "tool_use";
    }
    if (finishReason) {
      return "end_turn";
    } else {
      return null;
    }
  }
  function mapResponsesStopReason(status, hasToolUse, incompleteReason) {
    if (status === "completed") {
      if (hasToolUse) {
        return "tool_use";
      } else {
        return "end_turn";
      }
    }
    if (status === "incomplete") {
      if (incompleteReason === "max_output_tokens" || incompleteReason === "max_tokens" || incompleteReason == null) {
        return "max_tokens";
      }
      return "end_turn";
    }
    if (status) {
      return "end_turn";
    } else {
      return null;
    }
  }
  function mapToolChoiceToOpenAIChat(toolChoice) {
    if (!toolChoice) {
      return undefined;
    }
    if (typeof toolChoice === "string") {
      return toolChoice;
    }
    if (typeof toolChoice !== "object") {
      return toolChoice;
    }
    switch (toolChoice.type) {
      case "auto":
        return "auto";
      case "none":
        return "none";
      case "any":
        return "required";
      case "tool":
        return {
          type: "function",
          function: {
            name: String(toolChoice.name || "")
          }
        };
      default:
        return toolChoice;
    }
  }
  function mapToolChoiceToResponses(toolChoice) {
    if (!toolChoice) {
      return undefined;
    }
    if (typeof toolChoice === "string") {
      return toolChoice;
    }
    if (typeof toolChoice !== "object") {
      return toolChoice;
    }
    switch (toolChoice.type) {
      case "auto":
        return "auto";
      case "none":
        return "none";
      case "any":
        return "required";
      case "tool":
        return {
          type: "function",
          name: String(toolChoice.name || "")
        };
      default:
        return toolChoice;
    }
  }
  function convertMessageToOpenAI(role, content) {
    const result = [];
    if (content == null) {
      result.push({
        role,
        content: null
      });
      return result;
    }
    if (typeof content === "string") {
      result.push({
        role,
        content
      });
      return result;
    }
    if (!Array.isArray(content)) {
      result.push({
        role,
        content
      });
      return result;
    }
    const contentParts = [];
    const toolCalls = [];
    for (const block of content) {
      const type = block?.type || "";
      if (type === "text") {
        if (typeof block.text === "string") {
          const part = {
            type: "text",
            text: block.text
          };
          if (block.cache_control) {
            part.cache_control = block.cache_control;
          }
          contentParts.push(part);
        }
        continue;
      }
      if (type === "image") {
        const mediaType = block?.source?.media_type || "image/png";
        const data = block?.source?.data || "";
        contentParts.push({
          type: "image_url",
          image_url: {
            url: "data:" + mediaType + ";base64," + data
          }
        });
        continue;
      }
      if (type === "tool_use") {
        toolCalls.push({
          id: String(block.id || ""),
          type: "function",
          function: {
            name: String(block.name || ""),
            arguments: JSON.stringify(block.input || {})
          }
        });
        continue;
      }
      if (type === "tool_result") {
        result.push({
          role: "tool",
          tool_call_id: String(block.tool_use_id || ""),
          content: stringifyContent(block.content)
        });
      }
    }
    if (contentParts.length || toolCalls.length) {
      const message = {
        role
      };
      if (!contentParts.length) {
        message.content = null;
      } else if (contentParts.length === 1 && contentParts[0].type === "text" && !contentParts[0].cache_control) {
        message.content = contentParts[0].text;
      } else {
        message.content = contentParts;
      }
      if (toolCalls.length) {
        message.tool_calls = toolCalls;
      }
      result.push(message);
    }
    return result;
  }
  function anthropicToOpenAIChat(body) {
    const result = {};
    if (body?.model) {
      result.model = body.model;
    }
    const messages = [];
    const system = body?.system;
    if (typeof system === "string" && system) {
      messages.push({
        role: "system",
        content: system
      });
    } else if (Array.isArray(system)) {
      for (const message of system) {
        if (typeof message?.text !== "string" || !message.text) {
          continue;
        }
        const systemMessage = {
          role: "system",
          content: message.text
        };
        if (message.cache_control) {
          systemMessage.cache_control = message.cache_control;
        }
        messages.push(systemMessage);
      }
    }
    for (const message of Array.isArray(body?.messages) ? body.messages : []) {
      const role = message?.role || "user";
      messages.push(...convertMessageToOpenAI(role, message?.content));
    }
    result.messages = messages;
    if (body?.max_tokens != null) {
      if (isOpenAIOSeries(body.model)) {
        result.max_completion_tokens = body.max_tokens;
      } else {
        result.max_tokens = body.max_tokens;
      }
    }
    if (body?.temperature != null) {
      result.temperature = body.temperature;
    }
    if (body?.top_p != null) {
      result.top_p = body.top_p;
    }
    if (body?.stop_sequences != null) {
      result.stop = body.stop_sequences;
    }
    if (body?.stream != null) {
      result.stream = body.stream;
    }
    if (supportsReasoningEffort(body?.model)) {
      const effort = resolveReasoningEffort(body);
      if (effort) {
        result.reasoning_effort = effort;
      }
    }
    const tools = [];
    for (const tool of Array.isArray(body?.tools) ? body.tools : []) {
      if (tool?.type === "BatchTool") {
        continue;
      }
      const nextTool = {
        type: "function",
        function: {
          name: String(tool?.name || ""),
          description: tool?.description,
          parameters: cleanSchema(tool?.input_schema || {})
        }
      };
      if (tool?.cache_control) {
        nextTool.cache_control = tool.cache_control;
      }
      tools.push(nextTool);
    }
    if (tools.length) {
      result.tools = tools;
    }
    const toolChoice = mapToolChoiceToOpenAIChat(body?.tool_choice);
    if (toolChoice !== undefined) {
      result.tool_choice = toolChoice;
    }
    applyPromptCacheHints(result, body, OPENAI_CHAT_FORMAT);
    return result;
  }
  function openAIChatToAnthropic(body) {
    const choice = Array.isArray(body?.choices) ? body.choices[0] : null;
    if (!choice || !choice.message) {
      throw new Error("OpenAI Chat 响应里缺少 choices[0].message。");
    }
    const message = choice.message;
    const content = [];
    let hasToolUse = false;
    if (typeof message.content === "string") {
      if (message.content) {
        content.push({
          type: "text",
          text: message.content
        });
      }
    } else if (Array.isArray(message.content)) {
      for (const part of message.content) {
        const type = part?.type || "";
        if ((type === "text" || type === "output_text") && typeof part.text === "string" && part.text) {
          content.push({
            type: "text",
            text: part.text
          });
        } else if (type === "refusal" && typeof part.refusal === "string" && part.refusal) {
          content.push({
            type: "text",
            text: part.refusal
          });
        }
      }
    }
    if (typeof message.refusal === "string" && message.refusal) {
      content.push({
        type: "text",
        text: message.refusal
      });
    }
    for (const toolCall of Array.isArray(message.tool_calls) ? message.tool_calls : []) {
      const args = safeJsonParse(toolCall?.function?.arguments || "{}", {});
      content.push({
        type: "tool_use",
        id: String(toolCall?.id || ""),
        name: String(toolCall?.function?.name || ""),
        input: args
      });
      hasToolUse = true;
    }
    if (!hasToolUse && message.function_call) {
      const args = message.function_call.arguments;
      const input = typeof args === "string" ? safeJsonParse(args, {}) : args && typeof args === "object" ? args : {};
      if (message.function_call.name || args != null) {
        content.push({
          type: "tool_use",
          id: String(message.function_call.id || ""),
          name: String(message.function_call.name || ""),
          input
        });
        hasToolUse = true;
      }
    }
    return {
      id: String(body?.id || ""),
      type: "message",
      role: "assistant",
      content,
      model: String(body?.model || ""),
      stop_reason: mapChatStopReason(choice.finish_reason, hasToolUse),
      stop_sequence: null,
      usage: buildAnthropicUsageFromChat(body?.usage || {})
    };
  }
  function convertMessagesToResponsesInput(messages) {
    const input = [];
    for (const message of messages) {
      const role = message?.role || "user";
      const content = message?.content;
      if (typeof content === "string") {
        input.push({
          role,
          content: [{
            type: role === "assistant" ? "output_text" : "input_text",
            text: content
          }]
        });
        continue;
      }
      if (!Array.isArray(content)) {
        input.push({
          role
        });
        continue;
      }
      const messageContent = [];
      for (const block of content) {
        const type = block?.type || "";
        if (type === "text" && typeof block.text === "string") {
          messageContent.push({
            type: role === "assistant" ? "output_text" : "input_text",
            text: block.text
          });
          continue;
        }
        if (type === "image") {
          const mediaType = block?.source?.media_type || "image/png";
          const data = block?.source?.data || "";
          messageContent.push({
            type: "input_image",
            image_url: "data:" + mediaType + ";base64," + data
          });
          continue;
        }
        if (type === "tool_use") {
          if (messageContent.length) {
            input.push({
              role,
              content: messageContent.splice(0)
            });
          }
          input.push({
            type: "function_call",
            call_id: String(block.id || ""),
            name: String(block.name || ""),
            arguments: JSON.stringify(block.input || {})
          });
          continue;
        }
        if (type === "tool_result") {
          if (messageContent.length) {
            input.push({
              role,
              content: messageContent.splice(0)
            });
          }
          input.push({
            type: "function_call_output",
            call_id: String(block.tool_use_id || ""),
            output: stringifyContent(block.content)
          });
        }
      }
      if (messageContent.length) {
        input.push({
          role,
          content: messageContent
        });
      }
    }
    return input;
  }
  function anthropicToOpenAIResponses(body) {
    const result = {};
    if (body?.model) {
      result.model = body.model;
    }
    const system = body?.system;
    if (typeof system === "string" && system) {
      result.instructions = system;
    } else if (Array.isArray(system)) {
      const parts = system.map(function (item) {
        if (typeof item?.text === "string") {
          return item.text;
        } else {
          return "";
        }
      }).filter(Boolean);
      if (parts.length) {
        result.instructions = parts.join("\n\n");
      }
    }
    if (Array.isArray(body?.messages)) {
      result.input = convertMessagesToResponsesInput(body.messages);
    }
    if (body?.max_tokens != null) {
      result.max_output_tokens = body.max_tokens;
    }
    if (body?.temperature != null) {
      result.temperature = body.temperature;
    }
    if (body?.top_p != null) {
      result.top_p = body.top_p;
    }
    if (body?.stream != null) {
      result.stream = body.stream;
    }
    if (supportsReasoningEffort(body?.model)) {
      const effort = resolveReasoningEffort(body);
      if (effort) {
        result.reasoning = {
          effort
        };
      }
    }
    const tools = [];
    for (const tool of Array.isArray(body?.tools) ? body.tools : []) {
      if (tool?.type === "BatchTool") {
        continue;
      }
      tools.push({
        type: "function",
        name: String(tool?.name || ""),
        description: tool?.description,
        parameters: cleanSchema(tool?.input_schema || {})
      });
    }
    if (tools.length) {
      result.tools = tools;
    }
    const toolChoice = mapToolChoiceToResponses(body?.tool_choice);
    if (toolChoice !== undefined) {
      result.tool_choice = toolChoice;
    }
    applyPromptCacheHints(result, body, OPENAI_RESPONSES_FORMAT);
    return result;
  }
  function openAIResponsesToAnthropic(body) {
    const output = Array.isArray(body?.output) ? body.output : null;
    if (!output) {
      if (typeof body?.output_text === "string" && body.output_text) {
        return {
          id: String(body?.id || ""),
          type: "message",
          role: "assistant",
          content: [{
            type: "text",
            text: body.output_text
          }],
          model: String(body?.model || ""),
          stop_reason: mapResponsesStopReason(body?.status, false, body?.incomplete_details?.reason),
          stop_sequence: null,
          usage: buildAnthropicUsageFromResponses(body?.usage || {})
        };
      }
      throw new Error("OpenAI Responses 响应里缺少 output。");
    }
    const content = [];
    let hasToolUse = false;
    for (const item of output) {
      const type = item?.type || "";
      if (type === "message") {
        for (const block of Array.isArray(item.content) ? item.content : []) {
          const blockType = block?.type || "";
          if (blockType === "output_text" && typeof block.text === "string" && block.text) {
            content.push({
              type: "text",
              text: block.text
            });
          } else if (blockType === "refusal" && typeof block.refusal === "string" && block.refusal) {
            content.push({
              type: "text",
              text: block.refusal
            });
          }
        }
        continue;
      }
      if (type === "function_call") {
        content.push({
          type: "tool_use",
          id: String(item.call_id || ""),
          name: String(item.name || ""),
          input: safeJsonParse(item.arguments || "{}", {})
        });
        hasToolUse = true;
        continue;
      }
      if (type === "reasoning") {
        const summary = Array.isArray(item.summary) ? item.summary : [];
        const thinking = summary.filter(function (part) {
          return part?.type === "summary_text" && typeof part.text === "string";
        }).map(function (part) {
          return part.text;
        }).join("");
        if (thinking) {
          content.push({
            type: "thinking",
            thinking
          });
        }
      }
    }
    return {
      id: String(body?.id || ""),
      type: "message",
      role: "assistant",
      content,
      model: String(body?.model || ""),
      stop_reason: mapResponsesStopReason(body?.status, hasToolUse, body?.incomplete_details?.reason),
      stop_sequence: null,
      usage: buildAnthropicUsageFromResponses(body?.usage || {})
    };
  }
  function sseChunk(eventName, payload) {
    return "event: " + eventName + "\ndata: " + JSON.stringify(payload) + "\n\n";
  }
  function normalizeChatContentDelta(content) {
    if (typeof content === "string") {
      return content;
    }
    if (!Array.isArray(content)) {
      return "";
    }
    return content.map(function (part) {
      if (typeof part?.text === "string") {
        return part.text;
      }
      if (typeof part?.refusal === "string") {
        return part.refusal;
      }
      return "";
    }).join("");
  }
  function createAnthropicStreamFromOpenAIChat(stream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";
    let messageId = "";
    let currentModel = "";
    let nextContentIndex = 0;
    let hasSentMessageStart = false;
    let hasSentMessageDelta = false;
    let currentNonToolBlockType = null;
    let currentNonToolBlockIndex = null;
    const toolBlocksByIndex = new Map();
    const openToolBlockIndices = new Set();
    function closeCurrentNonTool(output) {
      if (currentNonToolBlockIndex == null) {
        return;
      }
      output.push(sseChunk("content_block_stop", {
        type: "content_block_stop",
        index: currentNonToolBlockIndex
      }));
      currentNonToolBlockType = null;
      currentNonToolBlockIndex = null;
    }
    function ensureMessageStart(output, chunk) {
      if (hasSentMessageStart) {
        return;
      }
      const usage = buildAnthropicUsageFromChat(chunk?.usage || {});
      output.push(sseChunk("message_start", {
        type: "message_start",
        message: {
          id: messageId,
          type: "message",
          role: "assistant",
          model: currentModel,
          content: [],
          usage
        }
      }));
      hasSentMessageStart = true;
    }
    function ensureNonToolBlock(output, type) {
      if (currentNonToolBlockType === type && currentNonToolBlockIndex != null) {
        return currentNonToolBlockIndex;
      }
      closeCurrentNonTool(output);
      currentNonToolBlockType = type;
      currentNonToolBlockIndex = nextContentIndex++;
      output.push(sseChunk("content_block_start", {
        type: "content_block_start",
        index: currentNonToolBlockIndex,
        content_block: type === "thinking" ? {
          type: "thinking",
          thinking: ""
        } : {
          type: "text",
          text: ""
        }
      }));
      return currentNonToolBlockIndex;
    }
    function emitToolDelta(output, index, partialJson) {
      output.push(sseChunk("content_block_delta", {
        type: "content_block_delta",
        index,
        delta: {
          type: "input_json_delta",
          partial_json: partialJson
        }
      }));
    }
    function closeAllToolBlocks(output) {
      const indices = Array.from(openToolBlockIndices).sort(function (a, b) {
        return a - b;
      });
      for (const index of indices) {
        output.push(sseChunk("content_block_stop", {
          type: "content_block_stop",
          index
        }));
        openToolBlockIndices.delete(index);
      }
    }
    async function processBlock(block, controller) {
      const output = [];
      const lines = block.split(/\r?\n/);
      const dataParts = [];
      for (const line of lines) {
        if (line.startsWith("data:")) {
          dataParts.push(line.slice(5).trimStart());
        }
      }
      if (!dataParts.length) {
        return;
      }
      const data = dataParts.join("\n");
      if (data === "[DONE]") {
        closeCurrentNonTool(output);
        closeAllToolBlocks(output);
        if (hasSentMessageStart && !hasSentMessageDelta) {
          output.push(sseChunk("message_delta", {
            type: "message_delta",
            delta: {
              stop_reason: "end_turn",
              stop_sequence: null
            },
            usage: getSafeAnthropicUsage(null)
          }));
        }
        output.push(sseChunk("message_stop", {
          type: "message_stop"
        }));
        for (const chunk of output) {
          controller.enqueue(encoder.encode(chunk));
        }
        return;
      }
      const chunk = safeJsonParse(data, null);
      if (!chunk || !Array.isArray(chunk.choices) || !chunk.choices[0]) {
        return;
      }
      if (!messageId && chunk.id) {
        messageId = String(chunk.id);
      }
      if (!currentModel && chunk.model) {
        currentModel = String(chunk.model);
      }
      const choice = chunk.choices[0] || {};
      const delta = choice.delta || {};
      ensureMessageStart(output, chunk);
      if (typeof delta.reasoning === "string" && delta.reasoning) {
        const index = ensureNonToolBlock(output, "thinking");
        output.push(sseChunk("content_block_delta", {
          type: "content_block_delta",
          index,
          delta: {
            type: "thinking_delta",
            thinking: delta.reasoning
          }
        }));
      }
      const contentDelta = normalizeChatContentDelta(delta.content);
      if (contentDelta) {
        const index = ensureNonToolBlock(output, "text");
        output.push(sseChunk("content_block_delta", {
          type: "content_block_delta",
          index,
          delta: {
            type: "text_delta",
            text: contentDelta
          }
        }));
      }
      if (Array.isArray(delta.tool_calls) && delta.tool_calls.length) {
        closeCurrentNonTool(output);
        for (const toolCall of delta.tool_calls) {
          const key = Number.isFinite(toolCall?.index) ? toolCall.index : 0;
          let state = toolBlocksByIndex.get(key);
          if (!state) {
            state = {
              anthropicIndex: nextContentIndex++,
              id: "",
              name: "",
              started: false,
              pendingArgs: ""
            };
            toolBlocksByIndex.set(key, state);
          }
          if (toolCall?.id) {
            state.id = String(toolCall.id);
          }
          if (toolCall?.function?.name) {
            state.name = String(toolCall.function.name);
          }
          const shouldStart = !state.started && state.id && state.name;
          if (shouldStart) {
            state.started = true;
            output.push(sseChunk("content_block_start", {
              type: "content_block_start",
              index: state.anthropicIndex,
              content_block: {
                type: "tool_use",
                id: state.id,
                name: state.name
              }
            }));
            openToolBlockIndices.add(state.anthropicIndex);
            if (state.pendingArgs) {
              emitToolDelta(output, state.anthropicIndex, state.pendingArgs);
              state.pendingArgs = "";
            }
          }
          const argsDelta = typeof toolCall?.function?.arguments === "string" ? toolCall.function.arguments : "";
          if (argsDelta) {
            if (state.started) {
              emitToolDelta(output, state.anthropicIndex, argsDelta);
            } else {
              state.pendingArgs += argsDelta;
            }
          }
        }
      }
      if (choice.finish_reason != null) {
        closeCurrentNonTool(output);
        for (const [toolIndex, state] of toolBlocksByIndex.entries()) {
          if (state.started) {
            continue;
          }
          if (!state.pendingArgs && !state.id && !state.name) {
            continue;
          }
          state.started = true;
          state.id = state.id || "tool_call_" + toolIndex;
          state.name = state.name || "unknown_tool";
          output.push(sseChunk("content_block_start", {
            type: "content_block_start",
            index: state.anthropicIndex,
            content_block: {
              type: "tool_use",
              id: state.id,
              name: state.name
            }
          }));
          openToolBlockIndices.add(state.anthropicIndex);
          if (state.pendingArgs) {
            emitToolDelta(output, state.anthropicIndex, state.pendingArgs);
            state.pendingArgs = "";
          }
        }
        closeAllToolBlocks(output);
        output.push(sseChunk("message_delta", {
          type: "message_delta",
          delta: {
            stop_reason: mapChatStopReason(choice.finish_reason, openToolBlockIndices.size > 0),
            stop_sequence: null
          },
          usage: getSafeAnthropicUsage(chunk.usage ? buildAnthropicUsageFromChat(chunk.usage) : null)
        }));
        hasSentMessageDelta = true;
      }
      for (const chunkText of output) {
        controller.enqueue(encoder.encode(chunkText));
      }
    }
    return new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const next = await reader.read();
            if (next.done) {
              break;
            }
            buffer += decoder.decode(next.value, {
              stream: true
            });
            let separator = findSseSeparator(buffer);
            while (separator) {
              const block = buffer.slice(0, separator.index);
              buffer = buffer.slice(separator.index + separator.length);
              if (block.trim()) {
                await processBlock(block, controller);
              }
              separator = findSseSeparator(buffer);
            }
          }
          controller.close();
        } catch (error) {
          controller.enqueue(encoder.encode(sseChunk("error", {
            type: "error",
            error: {
              type: "stream_error",
              message: error && typeof error.message === "string" ? error.message : "流式转换失败。"
            }
          })));
          controller.close();
        }
      }
    });
  }
  function responseObjectFromEvent(data) {
    if (data && typeof data === "object" && data.response && typeof data.response === "object") {
      return data.response;
    }
    return data || {};
  }
  function contentPartKey(data) {
    const itemId = typeof data?.item_id === "string" ? data.item_id : "";
    const outputIndex = Number(data?.output_index);
    const contentIndex = Number(data?.content_index);
    if (itemId && Number.isFinite(contentIndex)) {
      return "part:" + itemId + ":" + contentIndex;
    }
    if (Number.isFinite(outputIndex) && Number.isFinite(contentIndex)) {
      return "part:out:" + outputIndex + ":" + contentIndex;
    }
    return "";
  }
  function toolItemKeyFromAdded(data, item) {
    if (item?.id) {
      return "tool:" + String(item.id);
    }
    if (data?.item_id) {
      return "tool:" + String(data.item_id);
    }
    const outputIndex = Number(data?.output_index);
    if (Number.isFinite(outputIndex)) {
      return "tool:out:" + outputIndex;
    }
    return "";
  }
  function toolItemKeyFromEvent(data) {
    if (data?.item_id) {
      return "tool:" + String(data.item_id);
    }
    const outputIndex = Number(data?.output_index);
    if (Number.isFinite(outputIndex)) {
      return "tool:out:" + outputIndex;
    }
    return "";
  }
  function createAnthropicStreamFromResponses(stream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";
    let messageId = "";
    let currentModel = "";
    let hasSentMessageStart = false;
    let hasSentMessageDelta = false;
    let hasToolUse = false;
    let nextContentIndex = 0;
    let fallbackOpenIndex = null;
    let currentTextIndex = null;
    let currentThinkingIndex = null;
    const openIndices = new Set();
    const indexByKey = new Map();
    const toolIndicesByItemId = new Map();
    let lastToolIndex = null;
    function updateResponseMetadata(responseObject) {
      if (!messageId && responseObject?.id) {
        messageId = String(responseObject.id);
      }
      if (!currentModel && responseObject?.model) {
        currentModel = String(responseObject.model);
      }
    }
    function ensureMessageStart(output, responseObject) {
      if (hasSentMessageStart) {
        return;
      }
      updateResponseMetadata(responseObject);
      output.push(sseChunk("message_start", {
        type: "message_start",
        message: {
          id: messageId,
          type: "message",
          role: "assistant",
          model: currentModel,
          content: [],
          usage: buildAnthropicUsageFromResponses(responseObject?.usage || {})
        }
      }));
      hasSentMessageStart = true;
    }
    function resolveContentIndex(data, preferredIndex) {
      if (preferredIndex != null) {
        return preferredIndex;
      }
      const key = contentPartKey(data);
      if (key) {
        const existing = indexByKey.get(key);
        if (existing != null) {
          return existing;
        }
        const assigned = nextContentIndex++;
        indexByKey.set(key, assigned);
        return assigned;
      }
      if (fallbackOpenIndex != null) {
        return fallbackOpenIndex;
      }
      fallbackOpenIndex = nextContentIndex++;
      return fallbackOpenIndex;
    }
    function findContentIndex(data, currentIndex) {
      if (currentIndex != null) {
        return currentIndex;
      }
      const key = contentPartKey(data);
      if (key) {
        return indexByKey.get(key);
      }
      return fallbackOpenIndex;
    }
    function closeIndex(output, index) {
      if (index == null || !openIndices.has(index)) {
        return;
      }
      output.push(sseChunk("content_block_stop", {
        type: "content_block_stop",
        index
      }));
      openIndices.delete(index);
      if (fallbackOpenIndex === index) {
        fallbackOpenIndex = null;
      }
    }
    function closeCurrentText(output) {
      if (currentTextIndex == null) {
        return;
      }
      closeIndex(output, currentTextIndex);
      currentTextIndex = null;
    }
    function closeCurrentThinking(output) {
      if (currentThinkingIndex == null) {
        return;
      }
      closeIndex(output, currentThinkingIndex);
      currentThinkingIndex = null;
    }
    function ensureTextBlock(output, data) {
      closeCurrentThinking(output);
      const index = currentTextIndex != null ? currentTextIndex : resolveContentIndex(data, currentTextIndex);
      currentTextIndex = index;
      if (!openIndices.has(index)) {
        output.push(sseChunk("content_block_start", {
          type: "content_block_start",
          index,
          content_block: {
            type: "text",
            text: ""
          }
        }));
        openIndices.add(index);
      }
      return index;
    }
    function ensureThinkingBlock(output, data) {
      closeCurrentText(output);
      const index = currentThinkingIndex != null ? currentThinkingIndex : resolveContentIndex(data, currentThinkingIndex);
      currentThinkingIndex = index;
      if (!openIndices.has(index)) {
        output.push(sseChunk("content_block_start", {
          type: "content_block_start",
          index,
          content_block: {
            type: "thinking",
            thinking: ""
          }
        }));
        openIndices.add(index);
      }
      return index;
    }
    function resolveToolIndex(data, item) {
      const itemId = typeof data?.item_id === "string" ? data.item_id : typeof item?.id === "string" ? item.id : "";
      if (itemId) {
        const existingById = toolIndicesByItemId.get(itemId);
        if (existingById != null) {
          return existingById;
        }
      }
      const key = item ? toolItemKeyFromAdded(data, item) : toolItemKeyFromEvent(data);
      if (key) {
        const existingByKey = indexByKey.get(key);
        if (existingByKey != null) {
          if (itemId) {
            toolIndicesByItemId.set(itemId, existingByKey);
          }
          return existingByKey;
        }
        const assignedByKey = nextContentIndex++;
        indexByKey.set(key, assignedByKey);
        if (itemId) {
          toolIndicesByItemId.set(itemId, assignedByKey);
        }
        return assignedByKey;
      }
      if (lastToolIndex != null) {
        return lastToolIndex;
      }
      const assigned = nextContentIndex++;
      if (itemId) {
        toolIndicesByItemId.set(itemId, assigned);
      }
      return assigned;
    }
    function ensureToolBlock(output, data, item) {
      closeCurrentText(output);
      closeCurrentThinking(output);
      const index = resolveToolIndex(data, item);
      lastToolIndex = index;
      if (!openIndices.has(index)) {
        output.push(sseChunk("content_block_start", {
          type: "content_block_start",
          index,
          content_block: {
            type: "tool_use",
            id: String(item?.call_id || data?.call_id || data?.item_id || item?.id || "tool_" + index),
            name: String(item?.name || data?.name || "unknown_tool")
          }
        }));
        openIndices.add(index);
      }
      return index;
    }
    async function processBlock(block, controller) {
      const output = [];
      let eventName = "";
      const dataParts = [];
      for (const line of block.split(/\r?\n/)) {
        if (line.startsWith("event:")) {
          eventName = line.slice(6).trim();
        } else if (line.startsWith("data:")) {
          dataParts.push(line.slice(5).trimStart());
        }
      }
      if (!dataParts.length) {
        return;
      }
      const data = safeJsonParse(dataParts.join("\n"), null);
      if (!data) {
        return;
      }
      const resolvedEvent = eventName || String(data.type || "");
      const responseObject = responseObjectFromEvent(data);
      updateResponseMetadata(responseObject);
      if (resolvedEvent === "response.created") {
        ensureMessageStart(output, responseObject);
      } else if (resolvedEvent === "response.content_part.added") {
        ensureMessageStart(output, responseObject);
        const partType = String(data?.part?.type || "");
        if (partType === "output_text" || partType === "refusal") {
          const index = ensureTextBlock(output, data);
          const initialText = typeof data?.part?.text === "string" ? data.part.text : typeof data?.part?.refusal === "string" ? data.part.refusal : "";
          if (initialText) {
            output.push(sseChunk("content_block_delta", {
              type: "content_block_delta",
              index,
              delta: {
                type: "text_delta",
                text: initialText
              }
            }));
          }
        }
      } else if (resolvedEvent === "response.output_text.delta" || resolvedEvent === "response.refusal.delta") {
        ensureMessageStart(output, responseObject);
        const delta = typeof data.delta === "string" ? data.delta : typeof data.text === "string" ? data.text : "";
        if (delta) {
          const index = ensureTextBlock(output, data);
          output.push(sseChunk("content_block_delta", {
            type: "content_block_delta",
            index,
            delta: {
              type: "text_delta",
              text: delta
            }
          }));
        }
      } else if (resolvedEvent === "response.output_text.done" || resolvedEvent === "response.refusal.done" || resolvedEvent === "response.content_part.done") {
        const index = findContentIndex(data, currentTextIndex);
        if (currentTextIndex === index) {
          currentTextIndex = null;
        }
        closeIndex(output, index);
      } else if (resolvedEvent === "response.reasoning.delta") {
        ensureMessageStart(output, responseObject);
        const delta = typeof data.delta === "string" ? data.delta : typeof data.text === "string" ? data.text : "";
        if (delta) {
          const index = ensureThinkingBlock(output, data);
          output.push(sseChunk("content_block_delta", {
            type: "content_block_delta",
            index,
            delta: {
              type: "thinking_delta",
              thinking: delta
            }
          }));
        }
      } else if (resolvedEvent === "response.reasoning.done") {
        const index = findContentIndex(data, currentThinkingIndex);
        if (currentThinkingIndex === index) {
          currentThinkingIndex = null;
        }
        closeIndex(output, index);
      } else if (resolvedEvent === "response.output_item.added") {
        const itemType = String(data?.item?.type || "");
        if (itemType === "function_call") {
          hasToolUse = true;
          ensureMessageStart(output, responseObject);
          ensureToolBlock(output, data, data.item);
        } else if (itemType === "message") {
          ensureMessageStart(output, responseObject);
        }
      } else if (resolvedEvent === "response.function_call_arguments.delta") {
        hasToolUse = true;
        ensureMessageStart(output, responseObject);
        const index = ensureToolBlock(output, data, null);
        if (typeof data.delta === "string" && data.delta) {
          output.push(sseChunk("content_block_delta", {
            type: "content_block_delta",
            index,
            delta: {
              type: "input_json_delta",
              partial_json: data.delta
            }
          }));
        }
      } else if (resolvedEvent === "response.function_call_arguments.done") {
        const itemId = typeof data?.item_id === "string" ? data.item_id : "";
        const key = toolItemKeyFromEvent(data);
        const index = itemId ? toolIndicesByItemId.get(itemId) : key ? indexByKey.get(key) : lastToolIndex;
        if (index != null) {
          closeIndex(output, index);
          if (itemId) {
            toolIndicesByItemId.delete(itemId);
          }
        }
      } else if (resolvedEvent === "response.output_item.done") {
        const itemId = typeof data?.item_id === "string" ? data.item_id : typeof data?.item?.id === "string" ? data.item.id : "";
        const key = data?.item ? toolItemKeyFromAdded(data, data.item) : toolItemKeyFromEvent(data);
        const index = itemId ? toolIndicesByItemId.get(itemId) : key ? indexByKey.get(key) : null;
        if (index != null) {
          closeIndex(output, index);
          if (itemId) {
            toolIndicesByItemId.delete(itemId);
          }
        }
      } else if (resolvedEvent === "response.completed") {
        if (!hasSentMessageStart) {
          ensureMessageStart(output, responseObject);
        }
        closeCurrentText(output);
        closeCurrentThinking(output);
        const dangling = Array.from(openIndices).sort(function (a, b) {
          return a - b;
        });
        for (const index of dangling) {
          closeIndex(output, index);
        }
        output.push(sseChunk("message_delta", {
          type: "message_delta",
          delta: {
            stop_reason: mapResponsesStopReason(responseObject?.status, hasToolUse, responseObject?.incomplete_details?.reason),
            stop_sequence: null
          },
          usage: buildAnthropicUsageFromResponses(responseObject?.usage || {})
        }));
        output.push(sseChunk("message_stop", {
          type: "message_stop"
        }));
        hasSentMessageDelta = true;
      }
      for (const chunkText of output) {
        controller.enqueue(encoder.encode(chunkText));
      }
    }
    return new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const next = await reader.read();
            if (next.done) {
              break;
            }
            buffer += decoder.decode(next.value, {
              stream: true
            });
            let separator = findSseSeparator(buffer);
            while (separator) {
              const block = buffer.slice(0, separator.index);
              buffer = buffer.slice(separator.index + separator.length);
              if (block.trim()) {
                await processBlock(block, controller);
              }
              separator = findSseSeparator(buffer);
            }
          }
          if (hasSentMessageStart && !hasSentMessageDelta) {
            const tailOutput = [];
            closeCurrentText(tailOutput);
            closeCurrentThinking(tailOutput);
            const dangling = Array.from(openIndices).sort(function (a, b) {
              return a - b;
            });
            for (const index of dangling) {
              closeIndex(tailOutput, index);
            }
            tailOutput.push(sseChunk("message_delta", {
              type: "message_delta",
              delta: {
                stop_reason: hasToolUse ? "tool_use" : "end_turn",
                stop_sequence: null
              },
              usage: getSafeAnthropicUsage(null)
            }));
            tailOutput.push(sseChunk("message_stop", {
              type: "message_stop"
            }));
            for (const chunkText of tailOutput) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (error) {
          controller.enqueue(encoder.encode(sseChunk("error", {
            type: "error",
            error: {
              type: "stream_error",
              message: error && typeof error.message === "string" ? error.message : "Responses 流式转换失败。"
            }
          })));
          controller.close();
        }
      }
    });
  }
  function createSseResponse(response, transformedStream) {
    return new Response(transformedStream, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache, no-transform",
        connection: "keep-alive"
      }
    });
  }
  function detectOpenAIResponseFormat(body, fallbackFormat) {
    if (Array.isArray(body?.choices)) {
      return OPENAI_CHAT_FORMAT;
    }
    if (Array.isArray(body?.output) || typeof body?.output_text === "string" && body.output_text) {
      return OPENAI_RESPONSES_FORMAT;
    }
    return normalizeFormat(fallbackFormat);
  }
  function detectOpenAIStreamFormatFromBlock(block) {
    let eventName = "";
    const dataParts = [];
    for (const line of block.split(/\r?\n/)) {
      if (line.startsWith("event:")) {
        eventName = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        dataParts.push(line.slice(5).trimStart());
      }
    }
    const dataText = dataParts.join("\n");
    if (!dataText) {
      return null;
    }
    if (dataText === "[DONE]") {
      return OPENAI_CHAT_FORMAT;
    }
    if (eventName.startsWith("response.")) {
      return OPENAI_RESPONSES_FORMAT;
    }
    const data = safeJsonParse(dataText, null);
    if (data?.response && typeof data.response === "object") {
      return OPENAI_RESPONSES_FORMAT;
    }
    if (typeof data?.type === "string" && data.type.startsWith("response.")) {
      return OPENAI_RESPONSES_FORMAT;
    }
    if (Array.isArray(data?.output)) {
      return OPENAI_RESPONSES_FORMAT;
    }
    if (Array.isArray(data?.choices)) {
      return OPENAI_CHAT_FORMAT;
    }
    if (typeof data?.object === "string" && data.object.includes("chat.completion")) {
      return OPENAI_CHAT_FORMAT;
    }
    return null;
  }
  async function detectOpenAIStreamFormat(stream, fallbackFormat) {
    if (!stream || typeof stream.getReader !== "function") {
      return normalizeFormat(fallbackFormat);
    }
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let blockCount = 0;
    let bytesRead = 0;
    try {
      while (blockCount < 8 && bytesRead < 32768) {
        const next = await reader.read();
        if (next.done) {
          break;
        }
        bytesRead += next.value?.byteLength || 0;
        buffer += decoder.decode(next.value, {
          stream: true
        });
        let separator = findSseSeparator(buffer);
        while (separator && blockCount < 8) {
          const block = buffer.slice(0, separator.index);
          buffer = buffer.slice(separator.index + separator.length);
          blockCount++;
          const detected = detectOpenAIStreamFormatFromBlock(block);
          if (detected) {
            return detected;
          }
          separator = findSseSeparator(buffer);
        }
      }
      const trailingDetected = detectOpenAIStreamFormatFromBlock(buffer);
      if (trailingDetected) {
        return trailingDetected;
      }
    } catch (error) {
      debugLog("provider.stream_probe_failed", {
        error: error && typeof error.message === "string" ? error.message : String(error || "")
      }, "warn");
    } finally {
      try {
        const cancelResult = reader.cancel();
        if (cancelResult && typeof cancelResult.catch === "function") {
          cancelResult.catch(function () {});
        }
      } catch {}
    }
    return normalizeFormat(fallbackFormat);
  }
  function isAnthropicMessagesPath(url) {
    return /\/messages\/?$/.test(url.pathname);
  }
  function shouldInterceptRequest(config, requestUrl, method) {
    if (!config?.baseUrl || !config.apiKey) {
      return false;
    }
    if (config.format === ANTHROPIC_FORMAT) {
      return false;
    }
    if (String(method || "GET").toUpperCase() !== "POST") {
      return false;
    }
    return requestUrl.startsWith(config.baseUrl) && isAnthropicMessagesPath(new URL(requestUrl));
  }
  function buildProviderUrl(config) {
    const baseUrl = config.baseUrl.replace(/\/+$/, "");
    if (config.format === OPENAI_CHAT_FORMAT) {
      if (/\/chat\/completions$/i.test(baseUrl)) {
        return baseUrl;
      } else {
        return baseUrl + "/chat/completions";
      }
    }
    if (config.format === OPENAI_RESPONSES_FORMAT) {
      if (/\/responses$/i.test(baseUrl)) {
        return baseUrl;
      } else {
        return baseUrl + "/responses";
      }
    }
    return baseUrl;
  }
  function buildProviderHeaders(originalHeaders, config, isStreamRequest) {
    const headers = new Headers();
    const blocked = new Set(["authorization", "content-length", "host", "x-api-key", "anthropic-version", "anthropic-beta"]);
    for (const [key, value] of originalHeaders.entries()) {
      if (blocked.has(key.toLowerCase())) {
        continue;
      }
      headers.set(key, value);
    }
    headers.set("content-type", "application/json");
    headers.set("authorization", "Bearer " + config.apiKey);
    if (isStreamRequest) {
      headers.set("accept", "text/event-stream");
    }
    return headers;
  }
  function createAnthropicErrorResponse(status, message) {
    return new Response(JSON.stringify({
      type: "error",
      error: {
        type: "invalid_request_error",
        message: String(message || "请求失败")
      }
    }), {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store"
      }
    });
  }
  async function parseProviderError(response, fallbackMessage) {
    const text = await response.text().catch(function () {
      return "";
    });
    const json = safeJsonParse(text, null);
    const message = json?.error?.message || json?.message || typeof text === "string" && text.trim() || fallbackMessage || "上游模型供应商请求失败，状态码 " + response.status;
    return {
      status: response.status || 500,
      message,
      text,
      json
    };
  }
  async function wrapProviderError(response, fallbackMessage) {
    const parsed = await parseProviderError(response, fallbackMessage);
    return createAnthropicErrorResponse(parsed.status, parsed.message);
  }
  async function forwardProviderRequest(request, config) {
    const bodyText = await request.clone().text();
    const body = safeJsonParse(bodyText, null);
    if (!body || typeof body !== "object") {
      return createAnthropicErrorResponse(400, "自定义供应商只支持 JSON 请求体。");
    }
    const candidates = buildProviderRequestCandidates(config, body);
    debugLog("provider.request_start", {
      configuredFormat: config.format,
      candidateFormats: candidates.map(function (item) {
        return item.format;
      }),
      baseUrl: config.baseUrl,
      model: String(body?.model || ""),
      stream: !!body?.stream,
      messageCount: Array.isArray(body?.messages) ? body.messages.length : 0
    });
    for (let index = 0; index < candidates.length; index++) {
      const candidate = candidates[index];
      const candidateConfig = {
        ...config,
        format: candidate.format
      };
      const providerBody = candidate.format === OPENAI_CHAT_FORMAT ? anthropicToOpenAIChat(body) : anthropicToOpenAIResponses(body);
      const providerUrl = buildProviderUrl(candidateConfig);
      const isStreamRequest = !!providerBody.stream;
      debugLog("provider.request_attempt", {
        attempt: index + 1,
        totalAttempts: candidates.length,
        format: candidate.format,
        reason: candidate.reason,
        providerUrl,
        stream: isStreamRequest
      });
      const upstream = await nativeFetch(providerUrl, {
        method: "POST",
        headers: buildProviderHeaders(request.headers, candidateConfig, isStreamRequest),
        body: JSON.stringify(providerBody),
        signal: request.signal
      });
      if (!upstream.ok) {
        const providerError = await parseProviderError(upstream, "自定义模型供应商返回了错误。");
        debugLog("provider.request_failed", {
          attempt: index + 1,
          totalAttempts: candidates.length,
          format: candidate.format,
          reason: candidate.reason,
          providerUrl,
          status: providerError.status,
          message: providerError.message,
          bodyPreview: truncateText(providerError.text, 500)
        }, "warn");
        if (index < candidates.length - 1) {
          continue;
        }
        return createAnthropicErrorResponse(providerError.status, providerError.message);
      }
      const contentType = upstream.headers.get("content-type") || "";
      debugLog("provider.request_upstream_ok", {
        attempt: index + 1,
        totalAttempts: candidates.length,
        format: candidate.format,
        providerUrl,
        contentType,
        stream: isStreamRequest
      });
      if (isStreamRequest && contentType.includes("text/event-stream") && upstream.body) {
        let detectedStreamFormat = candidate.format;
        let liveStream = upstream.body;
        if (typeof upstream.body.tee === "function") {
          const streams = upstream.body.tee();
          const probeStream = streams[0];
          liveStream = streams[1];
          detectedStreamFormat = await detectOpenAIStreamFormat(probeStream, candidate.format);
        }
        debugLog("provider.stream_detected", {
          attempt: index + 1,
          totalAttempts: candidates.length,
          requestedFormat: candidate.format,
          detectedFormat: detectedStreamFormat,
          providerUrl
        });
        const transformedStream = detectedStreamFormat === OPENAI_CHAT_FORMAT ? createAnthropicStreamFromOpenAIChat(liveStream) : createAnthropicStreamFromResponses(liveStream);
        return createSseResponse(upstream, transformedStream);
      }
      const upstreamText = await upstream.text();
      const upstreamJson = safeJsonParse(upstreamText, null);
      if (!upstreamJson || typeof upstreamJson !== "object") {
        debugLog("provider.request_invalid_json", {
          attempt: index + 1,
          totalAttempts: candidates.length,
          format: candidate.format,
          providerUrl,
          contentType,
          bodyPreview: truncateText(upstreamText, 500)
        }, "warn");
        if (index < candidates.length - 1) {
          continue;
        }
        return createAnthropicErrorResponse(502, "自定义模型供应商返回了无法解析的 JSON 响应。");
      }
      const detectedResponseFormat = detectOpenAIResponseFormat(upstreamJson, candidate.format);
      debugLog("provider.response_detected", {
        attempt: index + 1,
        totalAttempts: candidates.length,
        requestedFormat: candidate.format,
        detectedFormat: detectedResponseFormat,
        providerUrl,
        contentType
      });
      try {
        const anthropicResponse = detectedResponseFormat === OPENAI_CHAT_FORMAT ? openAIChatToAnthropic(upstreamJson) : openAIResponsesToAnthropic(upstreamJson);
        return new Response(JSON.stringify(anthropicResponse), {
          status: upstream.status,
          statusText: upstream.statusText,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store"
          }
        });
      } catch (error) {
        debugLog("provider.response_transform_failed", {
          attempt: index + 1,
          totalAttempts: candidates.length,
          requestedFormat: candidate.format,
          detectedFormat: detectedResponseFormat,
          providerUrl,
          contentType,
          message: error && typeof error.message === "string" ? error.message : String(error || ""),
          bodyPreview: truncateText(upstreamText, 500)
        }, "warn");
        if (index < candidates.length - 1) {
          continue;
        }
        throw error;
      }
    }
    return createAnthropicErrorResponse(500, "自定义供应商请求失败。");
  }
  globalThis.fetch = async function patchedFetch(input, init) {
    const request = input instanceof Request ? new Request(input, init) : new Request(input, init);
    const config = await getConfig();
    if (!shouldInterceptRequest(config, request.url, request.method)) {
      return nativeFetch(input, init);
    }
    try {
      return await forwardProviderRequest(request, config);
    } catch (error) {
      const isAbortError = error?.name === "AbortError" || /aborted/i.test(String(error?.message || ""));
      if (isAbortError) {
        debugLog("provider.request_aborted", {
          format: config.format,
          baseUrl: config.baseUrl,
          message: error && typeof error.message === "string" ? error.message : String(error || "")
        }, "info");
        throw error;
      }
      debugLog("provider.request_exception", {
        format: config.format,
        baseUrl: config.baseUrl,
        message: error && typeof error.message === "string" ? error.message : String(error || ""),
        stack: error?.stack || ""
      }, "error");
      return createAnthropicErrorResponse(500, error && typeof error.message === "string" ? error.message : "自定义供应商协议转换失败。");
    }
  };
})();
