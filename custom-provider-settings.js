(function () {
  function debugLog(type, payload, level) {
    try {
      globalThis.__CP_OPTIONS_DEBUG__?.log(type, payload, level);
    } catch {}
  }
  const STORAGE_KEY = "customProviderConfig";
  const BACKUP_KEY = "customProviderOriginalApiKey";
  const STYLE_ID = "cp-options-inline-provider-style";
  const ROOT_ID = "cp-options-enhancements-root";
  const PROMPT_ROOT_ID = "cp-options-prompt-root";
  const DEBUG_ROOT_ID = "cp-options-debug-root";
  const PANEL_ID = "cp-options-inline-provider-panel";
  const NAV_ITEM_ID = "cp-options-provider-nav-item";
  const PROMPT_NAV_ITEM_ID = "cp-options-prompt-nav-item";
  const BUILTIN_PROMPT_PROFILE_ID = "__builtin_default_prompt__";
  const DEBUG_LOGS_KEY = "sidepanelDebugLogs";
  const DEBUG_META_KEY = "sidepanelDebugMeta";
  const SYSTEM_PROMPT_STORAGE_KEY = "chrome_ext_system_prompt";
  const PROMPT_PROFILES_STORAGE_KEY = "customSystemPromptProfiles";
  const PROMPT_ACTIVE_PROFILE_STORAGE_KEY = "customSystemPromptActiveProfileId";
  const DEFAULT_AGENT_ROLE_PROMPT = "You are Claude CUSTOM, a browser sidepanel assistant inside a Chrome extension. Help the user complete their request accurately and concisely. Use available browser context and tools when needed, but never pretend an action succeeded if you did not actually perform it. If a request could cause irreversible changes, purchases, submissions, account changes, authentication changes, or destructive actions, pause and ask the user to confirm before proceeding.";
  const DEBUG_EXPORT_SENSITIVE_KEYS = new Set(["apikey", "anthropicapikey", "accesstoken", "refreshtoken", "authtoken", "authorization", "token", "secret", "password", "currentapikey", "originalapikey"]);
  const DEBUG_EXPORT_PRIVATE_URL_KEYS = new Set(["baseurl", "providerurl", "requesturl", "url", "href", "uri", "filename", "source", "origin"]);
  const DEBUG_EXPORT_PRIVATE_TEXT_KEYS = new Set(["bodypreview", "notes", "prompt", "content", "requestbody", "responsebody", "rawbody", "inputtext", "outputtext"]);
  function normalizeDebugExportKey(key) {
    return String(key || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
  }
  function isDebugExportSensitiveKey(key) {
    const normalized = normalizeDebugExportKey(key);
    return !!normalized && DEBUG_EXPORT_SENSITIVE_KEYS.has(normalized);
  }
  function isDebugExportPrivateUrlKey(key) {
    const normalized = normalizeDebugExportKey(key);
    return !!normalized && DEBUG_EXPORT_PRIVATE_URL_KEYS.has(normalized);
  }
  function isDebugExportPrivateTextKey(key) {
    const normalized = normalizeDebugExportKey(key);
    return !!normalized && DEBUG_EXPORT_PRIVATE_TEXT_KEYS.has(normalized);
  }
  function sanitizeDebugExportString(value, key) {
    const normalized = normalizeDebugExportKey(key);
    let text = String(value || "");
    if (!text) {
      return text;
    }
    if (isDebugExportSensitiveKey(normalized)) {
      return "[redacted-secret]";
    }
    if (normalized === "useragent") {
      return "[redacted-user-agent]";
    }
    if (isDebugExportPrivateTextKey(normalized)) {
      return `[redacted-text:${text.length}]`;
    }
    if (isDebugExportPrivateUrlKey(normalized)) {
      if (normalized === "href" && text.startsWith("/")) {
        return text.split(/[?#]/)[0] || "[redacted-url]";
      }
      return "[redacted-url]";
    }
    text = text.replace(/\b(?:https?|wss?|chrome-extension):\/\/[^\s"'<>]+/gi, "[redacted-url]").replace(/\bBearer\s+[A-Za-z0-9._-]+\b/gi, "Bearer [redacted]").replace(/\b(?:sk|rk|pk)-[A-Za-z0-9*._-]{5,}\b/gi, function (token) {
      return token.split("-")[0] + "-[redacted]";
    }).replace(/\b(?:api[_-]?key|access[_-]?token|refresh[_-]?token|auth(?:orization|[_-]?token)?|secret|password)\b\s*[:=]\s*[^\s,;]+/gi, function (match) {
      return match.replace(/[:=]\s*[^\s,;]+$/, ": [redacted]");
    });
    return text.length > 600 ? text.slice(0, 600) + "...[truncated]" : text;
  }
  function summarizeDebugExportProvider(value) {
    const fetchedModels = Array.isArray(value?.fetchedModels) ? value.fetchedModels : [];
    return {
      enabled: !!value?.enabled,
      format: sanitizeDebugExportString(value?.format || "", "format"),
      defaultModel: sanitizeDebugExportString(value?.defaultModel || "", "defaultModel"),
      reasoningEffort: sanitizeDebugExportString(value?.reasoningEffort || "", "reasoningEffort"),
      contextWindow: typeof value?.contextWindow === "number" ? value.contextWindow : value?.contextWindow || undefined,
      name: sanitizeDebugExportString(value?.name || "", "name"),
      fetchedModelCount: fetchedModels.length,
      hasApiKey: !!value?.apiKey,
      hasBaseUrl: !!value?.baseUrl,
      hasNotes: !!String(value?.notes || "").trim()
    };
  }
  function sanitizeDebugExportValue(value, depth, seen, parentKey) {
    if (value == null) {
      return value;
    }
    if (depth > 4) {
      return "[max-depth]";
    }
    if (typeof value === "string") {
      return sanitizeDebugExportString(value, parentKey);
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return value;
    }
    if (typeof value === "bigint") {
      return value.toString();
    }
    if (typeof value === "function") {
      return "[function]";
    }
    if (value instanceof Error) {
      return {
        name: value.name,
        message: sanitizeDebugExportString(value.message, "message"),
        stack: sanitizeDebugExportString(value.stack || "", "stack")
      };
    }
    if (typeof URL !== "undefined" && value instanceof URL) {
      return sanitizeDebugExportString(value.toString(), parentKey);
    }
    if (Array.isArray(value)) {
      return value.slice(0, 50).map(function (item) {
        return sanitizeDebugExportValue(item, depth + 1, seen);
      });
    }
    if (typeof value !== "object") {
      return String(value);
    }
    if (seen.has(value)) {
      return "[circular]";
    }
    seen.add(value);
    if (isDebugExportSensitiveKey(parentKey)) {
      return "[redacted-secret]";
    }
    if (normalizeDebugExportKey(parentKey) === "customproviderconfig" || normalizeDebugExportKey(parentKey) === "customprovider") {
      return summarizeDebugExportProvider(value);
    }
    const output = {};
    for (const key of Object.keys(value).slice(0, 30)) {
      output[key] = isDebugExportSensitiveKey(key) ? "[redacted-secret]" : sanitizeDebugExportValue(value[key], depth + 1, seen, key);
    }
    return output;
  }
  function sanitizeDebugExportLogs(logs) {
    return Array.isArray(logs) ? logs.map(function (entry) {
      return sanitizeDebugExportValue(entry, 0, new WeakSet());
    }) : [];
  }
  function sanitizeDebugExportMeta(meta) {
    return meta && typeof meta === "object" ? sanitizeDebugExportValue(meta, 0, new WeakSet()) : null;
  }
  const UI_STRINGS = {
    en: {
      providerName: "Model provider",
      subtitle: "Configure a compatible provider, endpoint, and default model used by Claw in Chrome.",
      toggleTitle: "Use custom provider",
      toggleHelp: "When enabled, side panel requests are routed through this provider.",
      providerNameLabel: "Provider name",
      providerNamePlaceholder: "OpenRouter / Private gateway",
      providerFormatLabel: "Provider format",
      baseUrlLabel: "Base URL",
      baseUrlPlaceholder: "https://api.openai.com/v1",
      requestUrlPrefix: "Request URL: ",
      apiKeyLabel: "API key",
      apiKeyPlaceholder: "provider key",
      showApiKey: "Show API key",
      hideApiKey: "Hide API key",
      defaultModelLabel: "Model",
      defaultModelPlaceholder: "gpt-5.4",
      reasoningEffortLabel: "Reasoning effort",
      reasoningEffortHelp: "Only applies to providers and models that support reasoning effort, such as GPT-5 and o-series models.",
      contextWindowLabel: "Context window (unit: k)",
      contextWindowPlaceholder: "200",
      reasoningEffortNone: "Off",
      reasoningEffortLow: "Low",
      reasoningEffortMedium: "Medium",
      reasoningEffortHigh: "High",
      reasoningEffortMax: "Max",
      fetchedModelsLabel: "Fetched models",
      fetchedModelsHint: "Fetch models from your provider to select one directly.",
      fetchedModelsReady: "Models were fetched successfully. You can pick one directly.",
      fetchedModelsLoading: "Fetching models from the provider...",
      fetchedModelsError: "Model fetch failed. Check the format, endpoint, and API key.",
      fetchModels: "Fetch model list",
      fetchingModels: "Fetching...",
      addModelAria: "Add model manually",
      manualAddModelTitle: "Add model",
      manualAddModelSubtitle: "Enter a model ID to add it to the current list.",
      manualModelIdLabel: "Model ID",
      manualModelIdPlaceholder: "e.g. gpt-5.4",
      manualAddConfirm: "Add model",
      cancelAction: "Cancel",
      manualModelIdRequired: "Enter a model ID first.",
      manualModelAdded: "Model added. Save to apply it.",
      manualModelSelected: "Model already exists. Selected for you.",
      manualModelRemoved: "Model removed from the list.",
      newProfile: "New profile",
      backToList: "Back to list",
      editProfile: "Edit",
      activateProfile: "Set as current",
      activeProfile: "Current",
      deleteProfile: "Delete",
      deleteProfileConfirm: "Delete \"{name}\"?",
      emptyProfilesTitle: "No provider profiles yet",
      emptyProfilesHelp: "Create a provider profile, then save and apply it to the side panel.",
      unnamedProfile: "Provider profile",
      createProfileTitle: "Create profile",
      editProfileTitle: "Edit profile",
      formatSummaryLabel: "Format",
      modelSummaryLabel: "Model",
      endpointSummaryLabel: "Endpoint",
      notConfigured: "Not configured",
      currentBadge: "Current",
      profileActivated: "Current provider updated.",
      profileDeleted: "Provider profile deleted.",
      healthCheck: "Health check",
      healthChecking: "Checking...",
      healthCheckFailure: "Health check failed.",
      healthCheckSuccess: "Health check passed. Model replied: {reply}",
      notesLabel: "Notes",
      notesPlaceholder: "Optional. Add endpoint notes, routing hints, or account details.",
      saveAndApply: "Save and apply",
      selectFetchedModel: "Select model",
      fetchModelsToPickOne: "Fetch models to pick one",
      fetchFailure: "Unable to fetch models right now.",
      baseUrlRequired: "Base URL is required.",
      apiKeyRequired: "API key is required.",
      defaultModelRequired: "Choose or enter a default model before saving.",
      saveSuccessEnabled: "Saved. Reopen the side panel to apply the provider.",
      saveSuccessDisabled: "Saved. The custom provider is turned off.",
      saveFailure: "Failed to save this provider configuration.",
      promptTitle: "Prompt overrides",
      promptSubtitle: "Manage reusable agent role prompt profiles for the side panel assistant. The built-in default prompt always stays in the list and cannot be edited or deleted.",
      promptEmptyProfilesTitle: "No prompt profiles yet",
      promptEmptyProfilesHelp: "Create a prompt profile, then save and set it as current whenever you want to use it.",
      promptDefaultProfileName: "Built-in default prompt",
      promptProfileNameLabel: "Profile name",
      promptProfileNamePlaceholder: "Default coding role",
      agentRoleLabel: "Agent role",
      agentRoleHelp: "This field maps to the main system prompt used by the side panel assistant.",
      agentRolePlaceholder: "Enter custom system prompt...",
      promptCreateTitle: "Create prompt profile",
      promptEditTitle: "Edit prompt profile",
      promptSummaryTargetLabel: "Target",
      promptSummaryPreviewLabel: "Preview",
      promptSummaryLengthLabel: "Length",
      promptTargetValue: "Main agent role",
      promptSave: "Save and apply",
      promptSaved: "Prompt profile saved and applied.",
      promptActivated: "Current prompt profile updated.",
      promptDeleted: "Prompt profile deleted.",
      promptDeleteConfirm: "Delete prompt profile \"{name}\"?",
      promptNameRequired: "Enter a profile name.",
      promptContentRequired: "Enter the agent role prompt first.",
      promptSaveFailure: "Failed to save this prompt profile.",
      inlineModelSaved: "Model updated.",
      inlineReasoningSaved: "Reasoning effort updated.",
      toggleAria: "Toggle custom provider",
      debugTitle: "Captured logs",
      debugSubtitle: "Side panel logs are captured automatically. Export the latest 500 entries when you need to troubleshoot issues.",
      debugToggleTitle: "Enable debug mode",
      debugToggleHelp: "When enabled, the side panel writes diagnostic events into local extension storage.",
      debugToggleAria: "Toggle debug mode",
      debugLogsTitle: "Captured logs",
      debugLogsHelp: "Copy or download the stored logs for troubleshooting.",
      debugLogsEmpty: "No debug logs have been captured yet.",
      debugLogsCount: "{count} log entries available.",
      debugLogsUpdatedPrefix: "Last updated:",
      debugEnabled: "Debug mode is enabled.",
      debugDisabled: "Debug mode is disabled.",
      debugSaveFailure: "Failed to update debug mode.",
      copyLogs: "Copy logs",
      downloadLogs: "Download logs",
      copyLogsSuccess: "Logs copied to clipboard.",
      copyLogsFailure: "Failed to copy logs.",
      downloadLogsSuccess: "Logs downloaded.",
      downloadLogsFailure: "Failed to download logs."
    },
    zh: {
      providerName: "模型供应商",
      subtitle: "配置 Claw in Chrome 使用的兼容模型供应商、接口地址和默认模型。",
      toggleTitle: "启用自定义供应商",
      toggleHelp: "开启后，侧边栏请求会通过这里配置的模型供应商发出。",
      providerNameLabel: "供应商名称",
      providerNamePlaceholder: "例如 OpenRouter / 自建网关",
      providerFormatLabel: "供应商格式",
      baseUrlLabel: "Base URL",
      baseUrlPlaceholder: "例如 https://api.openai.com/v1",
      requestUrlPrefix: "请求地址：",
      apiKeyLabel: "API Key",
      apiKeyPlaceholder: "provider key",
      showApiKey: "显示 API Key",
      hideApiKey: "隐藏 API Key",
      defaultModelLabel: "模型",
      defaultModelPlaceholder: "例如 gpt-5.4",
      reasoningEffortLabel: "思考深度",
      reasoningEffortHelp: "只会用于支持 reasoning effort 的供应商和模型，例如 GPT-5 与 o 系列模型。",
      contextWindowLabel: "上下文窗口 (单位:k)",
      contextWindowPlaceholder: "200",
      reasoningEffortNone: "关闭",
      reasoningEffortLow: "低",
      reasoningEffortMedium: "中",
      reasoningEffortHigh: "高",
      reasoningEffortMax: "极高",
      fetchedModelsLabel: "已获取模型",
      fetchedModelsHint: "可以从供应商接口拉取模型列表后直接选择。",
      fetchedModelsReady: "模型列表已获取成功，你可以直接选择。",
      fetchedModelsLoading: "正在从供应商拉取模型列表...",
      fetchedModelsError: "获取模型失败，请检查格式、地址和 API Key。",
      fetchModels: "获取模型列表",
      fetchingModels: "获取中...",
      addModelAria: "手动添加模型",
      manualAddModelTitle: "手动添加模型",
      manualAddModelSubtitle: "输入模型 ID 后即可加入当前列表。",
      manualModelIdLabel: "模型 ID",
      manualModelIdPlaceholder: "例如 gpt-5.4",
      manualAddConfirm: "添加模型",
      cancelAction: "取消",
      manualModelIdRequired: "请先输入模型 ID。",
      manualModelAdded: "模型已添加，保存后即可应用。",
      manualModelSelected: "该模型已存在，已为你选中。",
      manualModelRemoved: "模型已从列表中删除。",
      newProfile: "新增配置",
      backToList: "返回列表",
      editProfile: "编辑",
      activateProfile: "设为当前",
      activeProfile: "当前使用",
      deleteProfile: "删除",
      deleteProfileConfirm: "确定删除“{name}”吗？",
      emptyProfilesTitle: "还没有模型供应商配置",
      emptyProfilesHelp: "先新增一套供应商配置，保存并应用后侧边栏就会使用它。",
      unnamedProfile: "供应商配置",
      createProfileTitle: "新增配置",
      editProfileTitle: "编辑配置",
      formatSummaryLabel: "格式",
      modelSummaryLabel: "模型",
      endpointSummaryLabel: "地址",
      notConfigured: "未配置",
      currentBadge: "当前使用",
      profileActivated: "已切换当前使用的供应商配置。",
      profileDeleted: "供应商配置已删除。",
      healthCheck: "健康检测",
      healthChecking: "检测中...",
      healthCheckFailure: "健康检测失败。",
      healthCheckSuccess: "健康检测通过，模型回复：{reply}",
      notesLabel: "备注",
      notesPlaceholder: "可选。填写路由说明、鉴权要求或账号备注。",
      saveAndApply: "保存并应用",
      selectFetchedModel: "选择模型",
      fetchModelsToPickOne: "先获取模型后再选择",
      fetchFailure: "暂时无法获取模型列表。",
      baseUrlRequired: "必须填写 Base URL。",
      apiKeyRequired: "必须填写 API Key。",
      defaultModelRequired: "请先填写或选择默认模型。",
      saveSuccessEnabled: "保存成功。重新打开侧边栏后会应用新配置。",
      saveSuccessDisabled: "保存成功。当前已关闭自定义供应商。",
      saveFailure: "保存模型供应商配置失败。",
      promptTitle: "提示词修改",
      promptSubtitle: "智能体的角色提示词配置",
      promptEmptyProfilesTitle: "还没有提示词配置",
      promptEmptyProfilesHelp: "先新增一套提示词配置，保存后就可以在列表里切换当前使用。",
      promptDefaultProfileName: "默认提示词",
      promptProfileNameLabel: "配置名称",
      promptProfileNamePlaceholder: "例如 默认编码角色",
      agentRoleLabel: "智能体角色",
      agentRoleHelp: "这里只编辑侧边栏主助手实际使用的 system prompt。",
      agentRolePlaceholder: "输入自定义系统提示词...",
      promptCreateTitle: "新增提示词配置",
      promptEditTitle: "编辑提示词配置",
      promptSummaryTargetLabel: "目标",
      promptSummaryPreviewLabel: "预览",
      promptSummaryLengthLabel: "长度",
      promptTargetValue: "主智能体角色",
      promptSave: "保存并应用",
      promptSaved: "提示词配置已保存并应用。",
      promptActivated: "已切换当前使用的提示词配置。",
      promptDeleted: "提示词配置已删除。",
      promptDeleteConfirm: "确定删除“{name}”这套提示词配置吗？",
      promptNameRequired: "请先填写配置名称。",
      promptContentRequired: "请先填写智能体角色提示词。",
      promptSaveFailure: "保存提示词配置失败。",
      inlineModelSaved: "模型已更新。",
      inlineReasoningSaved: "思考深度已更新。",
      toggleAria: "切换自定义供应商",
      debugTitle: "日志捕获",
      debugSubtitle: "侧边栏日志会自动捕获并保留最近 500 条，排查问题时可直接导出。",
      debugToggleTitle: "启用调试模式",
      debugToggleHelp: "开启后，侧边栏会把诊断事件写入扩展本地存储。",
      debugToggleAria: "切换调试模式",
      debugLogsTitle: "已捕获日志",
      debugLogsHelp: "可以直接复制或下载当前已保存的日志，用于排查问题。",
      debugLogsEmpty: "当前还没有捕获到调试日志。",
      debugLogsCount: "当前已保存 {count} 条日志。",
      debugLogsUpdatedPrefix: "最后更新时间：",
      debugEnabled: "调试模式已开启。",
      debugDisabled: "调试模式已关闭。",
      debugSaveFailure: "更新调试模式失败。",
      copyLogs: "复制日志",
      downloadLogs: "下载日志",
      copyLogsSuccess: "日志已复制到剪贴板。",
      copyLogsFailure: "复制日志失败。",
      downloadLogsSuccess: "日志文件已开始下载。",
      downloadLogsFailure: "下载日志失败。"
    }
  };
  const helpers = globalThis.CustomProviderModels || {};
  const DEFAULT_FORMAT = helpers.DEFAULT_FORMAT || "anthropic";
  const DEFAULT_CONTEXT_WINDOW = helpers.DEFAULT_CONTEXT_WINDOW || 200000;
  const MIN_CONTEXT_WINDOW = 20000;
  const CONTEXT_WINDOW_STEP_K = 10;
  const PROFILES_STORAGE_KEY = helpers.PROFILES_STORAGE_KEY || "customProviderProfiles";
  const ACTIVE_PROFILE_STORAGE_KEY = helpers.ACTIVE_PROFILE_STORAGE_KEY || "customProviderActiveProfileId";
  const readProviderStoreState = helpers.readProviderStoreState || async function () {
    const stored = await chrome.storage.local.get([STORAGE_KEY, BACKUP_KEY, "anthropicApiKey"]);
    return {
      profiles: [],
      activeProfileId: null,
      activeProfile: null,
      config: stored[STORAGE_KEY] || (helpers.createEmptyConfig ? helpers.createEmptyConfig() : {
        enabled: true,
        name: "",
        format: DEFAULT_FORMAT,
        baseUrl: "",
        apiKey: "",
        defaultModel: "",
        reasoningEffort: "medium",
        contextWindow: DEFAULT_CONTEXT_WINDOW,
        notes: "",
        fetchedModels: []
      }),
      originalApiKey: Object.prototype.hasOwnProperty.call(stored, BACKUP_KEY) ? stored[BACKUP_KEY] : undefined,
      currentApiKey: stored.anthropicApiKey || ""
    };
  };
  const saveProviderProfile = helpers.saveProviderProfile || async function (next) {
    await chrome.storage.local.set({
      [STORAGE_KEY]: next
    });
    return readProviderStoreState();
  };
  const setActiveProviderProfile = helpers.setActiveProviderProfile || async function () {
    return readProviderStoreState();
  };
  const deleteProviderProfile = helpers.deleteProviderProfile || async function () {
    return readProviderStoreState();
  };
  const readCachedFetchedModels = helpers.readCachedFetchedModels || async function () {
    return [];
  };
  const persistFetchedModelsForConfig = helpers.persistFetchedModelsForConfig || async function (config, models) {
    return Array.isArray(models) ? models.slice() : [];
  };
  function generatePromptProfileId() {
    if (globalThis.crypto?.randomUUID) {
      return globalThis.crypto.randomUUID();
    }
    return `prompt-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
  }
  function normalizePromptProfile(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const id = String(source.id || "").trim();
    if (!id) {
      return null;
    }
    return {
      id,
      name: String(source.name || "").trim(),
      prompt: String(source.prompt || "").trim(),
      createdAt: source.createdAt || null,
      updatedAt: source.updatedAt || null
    };
  }
  async function readPromptProfilesState() {
    const stored = await chrome.storage.local.get([PROMPT_PROFILES_STORAGE_KEY, PROMPT_ACTIVE_PROFILE_STORAGE_KEY]);
    const profiles = Array.isArray(stored[PROMPT_PROFILES_STORAGE_KEY]) ? stored[PROMPT_PROFILES_STORAGE_KEY].map(normalizePromptProfile).filter(Boolean) : [];
    const activeProfileId = typeof stored[PROMPT_ACTIVE_PROFILE_STORAGE_KEY] === "string" ? stored[PROMPT_ACTIVE_PROFILE_STORAGE_KEY] : null;
    const activeProfile = profiles.find(function (profile) {
      return profile.id === activeProfileId;
    }) || null;
    return {
      profiles,
      activeProfileId: activeProfile ? activeProfile.id : null,
      activeProfile
    };
  }
  async function writePromptProfilesState(profiles, activeProfileId) {
    await chrome.storage.local.set({
      [PROMPT_PROFILES_STORAGE_KEY]: profiles
    });
    if (activeProfileId) {
      await chrome.storage.local.set({
        [PROMPT_ACTIVE_PROFILE_STORAGE_KEY]: activeProfileId
      });
    } else {
      await chrome.storage.local.remove(PROMPT_ACTIVE_PROFILE_STORAGE_KEY);
    }
  }
  async function readAgentSystemPromptState() {
    const stored = await chrome.storage.local.get([SYSTEM_PROMPT_STORAGE_KEY]);
    const raw = stored[SYSTEM_PROMPT_STORAGE_KEY];
    const record = raw && typeof raw === "object" ? raw : {};
    const customPrompt = typeof record.systemPrompt === "string" ? record.systemPrompt : "";
    return {
      record,
      customPrompt,
      effectivePrompt: customPrompt.trim() ? customPrompt : DEFAULT_AGENT_ROLE_PROMPT,
      isCustom: !!customPrompt.trim()
    };
  }
  async function saveAgentSystemPrompt(promptText) {
    const stored = await chrome.storage.local.get([SYSTEM_PROMPT_STORAGE_KEY]);
    const current = stored[SYSTEM_PROMPT_STORAGE_KEY] && typeof stored[SYSTEM_PROMPT_STORAGE_KEY] === "object" ? {
      ...stored[SYSTEM_PROMPT_STORAGE_KEY]
    } : {};
    current.systemPrompt = String(promptText || "");
    await chrome.storage.local.set({
      [SYSTEM_PROMPT_STORAGE_KEY]: current
    });
    return readAgentSystemPromptState();
  }
  async function restoreAgentSystemPrompt() {
    const stored = await chrome.storage.local.get([SYSTEM_PROMPT_STORAGE_KEY]);
    const current = stored[SYSTEM_PROMPT_STORAGE_KEY] && typeof stored[SYSTEM_PROMPT_STORAGE_KEY] === "object" ? {
      ...stored[SYSTEM_PROMPT_STORAGE_KEY]
    } : {};
    delete current.systemPrompt;
    if (Object.keys(current).length) {
      await chrome.storage.local.set({
        [SYSTEM_PROMPT_STORAGE_KEY]: current
      });
    } else {
      await chrome.storage.local.remove(SYSTEM_PROMPT_STORAGE_KEY);
    }
    return readAgentSystemPromptState();
  }
  async function savePromptProfile(next, options) {
    const settings = options && typeof options === "object" ? options : {};
    const state = await readPromptProfilesState();
    const now = new Date().toISOString();
    const existingIndex = settings.profileId ? state.profiles.findIndex(function (profile) {
      return profile.id === settings.profileId;
    }) : -1;
    const base = existingIndex >= 0 ? state.profiles[existingIndex] : null;
    const profile = {
      id: existingIndex >= 0 ? base.id : generatePromptProfileId(),
      name: String(next?.name || "").trim(),
      prompt: String(next?.prompt || "").trim(),
      createdAt: base?.createdAt || now,
      updatedAt: now
    };
    const profiles = state.profiles.slice();
    if (existingIndex >= 0) {
      profiles.splice(existingIndex, 1, profile);
    } else {
      profiles.push(profile);
    }
    const activateOnSave = settings.activateOnSave !== false;
    const nextActiveProfileId = activateOnSave ? profile.id : state.activeProfileId === profile.id ? profile.id : state.activeProfileId;
    await writePromptProfilesState(profiles, nextActiveProfileId);
    if (nextActiveProfileId === profile.id) {
      await saveAgentSystemPrompt(profile.prompt);
    } else if (!nextActiveProfileId) {
      await restoreAgentSystemPrompt();
    }
    return readPromptProfilesState();
  }
  async function setActivePromptProfile(profileId) {
    const state = await readPromptProfilesState();
    if (!profileId) {
      await writePromptProfilesState(state.profiles, null);
      await restoreAgentSystemPrompt();
      return readPromptProfilesState();
    }
    const profile = state.profiles.find(function (entry) {
      return entry.id === profileId;
    });
    if (!profile) {
      throw new Error("Prompt profile not found.");
    }
    await writePromptProfilesState(state.profiles, profile.id);
    await saveAgentSystemPrompt(profile.prompt);
    return readPromptProfilesState();
  }
  async function deletePromptProfile(profileId) {
    const state = await readPromptProfilesState();
    const profiles = state.profiles.filter(function (profile) {
      return profile.id !== profileId;
    });
    const nextActiveProfileId = state.activeProfileId === profileId ? null : state.activeProfileId;
    await writePromptProfilesState(profiles, nextActiveProfileId);
    if (state.activeProfileId === profileId) {
      await restoreAgentSystemPrompt();
    }
    return readPromptProfilesState();
  }
  const createEmptyConfig = helpers.createEmptyConfig || function () {
    return {
      enabled: true,
      name: "",
      format: DEFAULT_FORMAT,
      baseUrl: "",
      apiKey: "",
      defaultModel: "",
      reasoningEffort: "medium",
      contextWindow: DEFAULT_CONTEXT_WINDOW,
      notes: "",
      fetchedModels: []
    };
  };
  const probeProviderModel = helpers.probeProviderModel || async function () {
    throw new Error("健康检测工具未加载。");
  };
  const SHARED_FRAME_CLASS = "bg-bg-100 border border-border-300 rounded-xl";
  let activeDropdownController = null;
  let activeUiCleanup = null;
  let uiRebuildScheduled = false;
  const normalizeReasoningEffort = helpers.normalizeReasoningEffort || function (value) {
    const effort = String(value || "").trim().toLowerCase();
    return ["none", "low", "medium", "high", "max"].includes(effort) ? effort : "medium";
  };
  const normalizeContextWindow = helpers.normalizeContextWindow || function (value, fallbackValue) {
    const numeric = Number(String(value ?? "").trim());
    if (!Number.isFinite(numeric) || numeric <= 0) {
      return fallbackValue || DEFAULT_CONTEXT_WINDOW;
    }
    return Math.max(MIN_CONTEXT_WINDOW, Math.round(numeric));
  };
  function formatContextWindowForInput(value) {
    return String(Math.max(Math.ceil(MIN_CONTEXT_WINDOW / 1000), Math.ceil(normalizeContextWindow(value, DEFAULT_CONTEXT_WINDOW) / 1000)));
  }
  function parseContextWindowInputK(value) {
    return Number(String(value ?? "").trim().replace(/[kK]/g, ""));
  }
  function getContextWindowInputWidth(value, placeholder) {
    const text = String(value ?? "").trim() || String(placeholder ?? "").trim() || "200";
    const characters = Math.max(4, Math.min(7, text.length + 2));
    return `${characters}ch`;
  }
  const normalizeConfig = helpers.normalizeConfig || function (raw, fallbackEnabled) {
    const source = raw && typeof raw === "object" ? raw : {};
    return {
      enabled: true,
      name: String(source.name || "").trim(),
      format: String(source.format || DEFAULT_FORMAT).trim() || DEFAULT_FORMAT,
      baseUrl: String(source.baseUrl || "").trim().replace(/\/+$/, ""),
      apiKey: String(source.apiKey || "").trim(),
      defaultModel: String(source.defaultModel || "").trim(),
      reasoningEffort: normalizeReasoningEffort(source.reasoningEffort),
      contextWindow: normalizeContextWindow(source.contextWindow),
      notes: String(source.notes || "").trim(),
      fetchedModels: Array.isArray(source.fetchedModels) ? source.fetchedModels.slice() : []
    };
  };
  const buildRequestUrl = helpers.buildRequestUrl || function (baseUrl, format) {
    const normalizedBaseUrl = String(baseUrl || "").trim().replace(/\/+$/, "");
    const normalizedFormat = String(format || DEFAULT_FORMAT).trim().toLowerCase();
    if (!normalizedBaseUrl) {
      return "";
    }
    if (normalizedFormat === "openai_chat" || normalizedFormat === "openai") {
      return /\/chat\/completions$/i.test(normalizedBaseUrl) ? normalizedBaseUrl : normalizedBaseUrl + "/chat/completions";
    }
    if (normalizedFormat === "openai_responses" || normalizedFormat === "responses") {
      return /\/responses$/i.test(normalizedBaseUrl) ? normalizedBaseUrl : normalizedBaseUrl + "/responses";
    }
    return /\/messages$/i.test(normalizedBaseUrl) ? normalizedBaseUrl : normalizedBaseUrl + "/messages";
  };
  const fetchProviderModels = helpers.fetchProviderModels || async function () {
    throw new Error("Model fetch helper is not available.");
  };
  function getDocumentTextExcludingCustomRoots() {
    if (!document.body || typeof document.createTreeWalker !== "function") {
      return "";
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest(`#${ROOT_ID}, #${DEBUG_ROOT_ID}`)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let text = "";
    while (walker.nextNode()) {
      text += " " + String(walker.currentNode.nodeValue || "");
    }
    return text.trim();
  }
  function getUiLocaleKey() {
    const nativeText = getDocumentTextExcludingCustomRoots();
    if (/\bPermissions\b|\bShortcuts\b|\bOptions\b|\bChange language\b/i.test(nativeText)) {
      return "en";
    }
    if (nativeText.includes("Claw in Chrome 设置") || nativeText.includes("Claude in Chrome 设置") || nativeText.includes("权限") || nativeText.includes("快捷键") || nativeText.includes("选项")) {
      return "zh";
    }
    const htmlLang = String(document.documentElement.lang || "").toLowerCase();
    if (htmlLang.startsWith("en")) {
      return "en";
    }
    if (htmlLang.startsWith("zh")) {
      return "zh";
    }
    const navigatorLang = String(navigator.language || "").toLowerCase();
    return navigatorLang.startsWith("zh") ? "zh" : "en";
  }
  function isChineseUi() {
    return getUiLocaleKey() === "zh";
  }
  function getStrings() {
    return getUiLocaleKey() === "zh" ? UI_STRINGS.zh : UI_STRINGS.en;
  }
  function scheduleUiRebuild() {
    if (uiRebuildScheduled) {
      return;
    }
    uiRebuildScheduled = true;
    const scheduler = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function (callback) {
      return setTimeout(callback, 16);
    };
    scheduler(function () {
      uiRebuildScheduled = false;
      buildUi();
    });
  }
  function getApiKeyVisibilityIconMarkup(visible) {
    if (visible) {
      return "<svg viewBox='0 0 20 20' fill='none' aria-hidden='true'><path d='M2.2 2.2L17.8 17.8' stroke='currentColor' stroke-width='1.6' stroke-linecap='round'/><path d='M8.7 8.83A2 2 0 0 0 8 10a2 2 0 0 0 3.17 1.63' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/><path d='M4.46 6.54C3.21 7.57 2.4 8.83 2 10c1.04 3.04 4.18 5.5 8 5.5 1.7 0 3.27-.49 4.58-1.32' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/><path d='M7 4.92A8.36 8.36 0 0 1 10 4.5c3.82 0 6.96 2.46 8 5.5a9.72 9.72 0 0 1-1.73 2.83' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>";
    }
    return "<svg viewBox='0 0 20 20' fill='none' aria-hidden='true'><path d='M2 10c1.04-3.04 4.18-5.5 8-5.5s6.96 2.46 8 5.5c-1.04 3.04-4.18 5.5-8 5.5S3.04 13.04 2 10Z' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/><circle cx='10' cy='10' r='2.5' stroke='currentColor' stroke-width='1.6'/></svg>";
  }
  function truncateStatusText(value, maxLength) {
    const text = typeof value === "string" ? value.trim() : String(value || "").trim();
    const limit = Number.isFinite(maxLength) && maxLength > 0 ? maxLength : 72;
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  }
  function appendStatusCodeSuffix(fallback, code) {
    if (!fallback) {
      return code;
    }
    return /[\u4e00-\u9fff]/.test(fallback) ? `${fallback}（${code}）` : `${fallback} (${code})`;
  }
  function compactStatusMessage(message, fallback) {
    const fallbackText = typeof fallback === "string" ? fallback.trim() : "";
    if (typeof message !== "string") {
      return fallbackText;
    }
    const raw = message.trim();
    if (!raw) {
      return fallbackText;
    }
    const normalized = raw.replace(/\s+/g, " ").trim();
    const statusCodeMatch = normalized.match(/\b([45]\d{2})\b/);
    const hasHtml = /<!doctype|<html|<head|<body|<title|<center|<h1|<hr\b|<\/?[a-z][\s\S]*>/i.test(raw);
    if (hasHtml) {
      return statusCodeMatch ? appendStatusCodeSuffix(fallbackText, statusCodeMatch[1]) : fallbackText;
    }
    if (!normalized) {
      return fallbackText;
    }
    if (normalized.length > 120) {
      return statusCodeMatch ? appendStatusCodeSuffix(fallbackText, statusCodeMatch[1]) : fallbackText;
    }
    return normalized;
  }
  const syncModelOptions = function (select, models, selectedValue) {
    if (!select) {
      return;
    }
    const strings = getStrings();
    const normalizedSelectedValue = String(selectedValue || "").trim();
    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = models.length ? strings.selectFetchedModel : strings.fetchModelsToPickOne;
    select.appendChild(placeholder);
    for (const model of models || []) {
      const option = document.createElement("option");
      option.value = model.value;
      option.textContent = model.label || model.value;
      option.dataset.manual = model.manual ? "true" : "false";
      select.appendChild(option);
    }
    if (normalizedSelectedValue && !(models || []).some(model => model.value === normalizedSelectedValue)) {
      const fallbackOption = document.createElement("option");
      fallbackOption.value = normalizedSelectedValue;
      fallbackOption.textContent = normalizedSelectedValue;
      fallbackOption.dataset.manual = "false";
      select.appendChild(fallbackOption);
    }
    select.disabled = !models.length && !normalizedSelectedValue;
    select.value = normalizedSelectedValue;
  };
  const styles = `
    html {
      scrollbar-gutter: stable both-edges;
    }
    body {
      overflow-y: auto;
    }
    .cp-page-stack {
      display: grid;
      gap: 1.25rem;
    }
    .cp-page-card {
      color: hsl(var(--text-100));
    }
    .cp-page-heading {
      margin: 0;
    }
    .cp-page-subheading {
      margin: 0.5rem 0 1.5rem;
      max-width: 54rem;
    }
    .cp-page-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0;
    }
    .cp-page-row-copy,
    .cp-page-field {
      display: grid;
      gap: 0.5rem;
      min-width: 0;
    }
    .cp-page-row-title {
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.4;
      color: hsl(var(--text-100));
    }
    .cp-page-help,
    .cp-page-row-help,
    .cp-page-status,
    .cp-page-url-preview,
    .cp-page-meta {
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      line-height: 1.45;
      color: hsl(var(--text-400));
    }
    .cp-page-help,
    .cp-page-row-help,
    .cp-page-status {
      font-size: 0.875rem;
    }
    .cp-page-url-preview,
    .cp-page-meta {
      font-size: 0.8125rem;
      display: block;
      max-width: 100%;
      white-space: normal;
    }
    .cp-page-grid {
      display: grid;
      gap: 1rem;
      width: 100%;
    }
    .cp-page-grid-2 {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: start;
    }
    .cp-page-grid-2 > * {
      min-width: 0;
    }
    .cp-page-label-row {
      display: grid;
      gap: 0.25rem;
      align-items: start;
      justify-items: start;
    }
    .cp-page-split-label-row {
      display: grid;
      gap: 0.75rem;
      width: 100%;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: end;
    }
    .cp-page-split-label-row > .cp-page-label {
      min-width: 0;
    }
    .cp-model-control-row {
      display: flex;
      align-items: stretch;
      gap: 0.75rem;
      width: 100%;
    }
    .cp-model-control-row > .cp-dropdown {
      flex: 1 1 auto;
      min-width: 0;
    }
    .cp-model-control-row > .cp-page-select {
      flex: 1 1 auto;
      min-width: 0;
    }
    .cp-model-control-row > .cp-page-input {
      flex: 1 1 auto;
      min-width: 0;
    }
    .cp-model-control-row > .cp-page-input-shell {
      flex: 1 1 auto;
      min-width: 0;
    }
    .cp-context-window-shell {
      justify-content: flex-start;
      gap: 0.5rem;
      padding-left: 0.875rem;
      padding-right: 0.25rem;
    }
    .cp-context-window-value {
      display: inline-flex;
      align-items: baseline;
      gap: 0.125rem;
      flex: 0 0 auto;
      min-width: auto;
    }
    .cp-context-window-shell .cp-context-window-input {
      flex: 0 0 auto;
      width: 5ch;
      min-width: 4ch;
      padding-left: 0;
      padding-right: 0;
      text-align: left;
    }
    .cp-context-window-stepper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.125rem;
      flex: 0 0 auto;
      margin-left: auto;
      margin-right: 0.375rem;
    }
    .cp-context-window-step-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 0.875rem;
      padding: 0;
      border: 0;
      background: transparent;
      color: hsl(var(--text-300));
      font-size: 0.75rem;
      line-height: 1;
      cursor: pointer;
      transition: color 0.15s ease;
    }
    .cp-context-window-step-btn:hover,
    .cp-context-window-step-btn:focus {
      color: hsl(var(--text-100));
      outline: none;
    }
    .cp-model-action-group {
      display: flex;
      align-items: stretch;
      flex: 0 0 auto;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 0.75rem;
    }
    .cp-model-action-btn {
      min-height: 3rem;
      box-sizing: border-box;
      white-space: nowrap;
    }
    .cp-model-action-btn-main {
      flex: 0 0 auto;
    }
    .cp-model-action-btn-add {
      min-width: 3rem;
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1.5rem;
      line-height: 1;
    }
    .cp-page-label {
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.3;
      color: hsl(var(--text-200));
    }
    .cp-page-input,
    .cp-page-select,
    .cp-page-textarea {
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      box-sizing: border-box;
      min-height: 3rem;
      color: hsl(var(--text-100));
      padding: 0.75rem 0.875rem;
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.95rem;
      line-height: 1.45;
      box-shadow: none;
      transition: none;
    }
    .cp-page-select {
      padding-right: 2.75rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M3.5 5.25L7 8.75L10.5 5.25' stroke='%235B5A55' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.95rem center;
      background-size: 14px 14px;
    }
    .cp-native-select {
      display: none !important;
    }
    .cp-dropdown {
      position: relative;
      width: 100%;
      overflow: visible;
    }
    .cp-dropdown-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      width: 100%;
      min-height: 3rem;
      padding: 0.75rem 0.875rem;
      text-align: left;
      color: hsl(var(--text-200));
      cursor: pointer;
    }
    .cp-dropdown-trigger:hover,
    .cp-dropdown-trigger[data-open="true"] {
      background: hsl(var(--bg-200));
      color: hsl(var(--text-100));
    }
    .cp-dropdown-trigger:disabled {
      opacity: 0.64;
      cursor: not-allowed;
    }
    .cp-dropdown-trigger-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.95rem;
      line-height: 1.45;
    }
    .cp-dropdown-trigger-icon {
      flex: 0 0 auto;
      width: 14px;
      height: 14px;
      opacity: 0.85;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M3.5 5.25L7 8.75L10.5 5.25' stroke='%235B5A55' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 14px 14px;
    }
    .cp-dropdown-menu {
      position: absolute;
      z-index: 80;
      left: 0;
      right: 0;
      top: calc(100% + 0.5rem);
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      padding: 0.5rem;
      box-shadow: none;
      max-height: 300px;
      overflow-y: auto;
    }
    .cp-dropdown-menu[data-placement="top"] {
      top: auto;
      bottom: calc(100% + 0.5rem);
    }
    .cp-dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1 1 auto;
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0.75rem 0.875rem;
      border: 0;
      border-radius: 0.875rem;
      background: transparent;
      color: hsl(var(--text-100));
      text-align: left;
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .cp-dropdown-item:hover,
    .cp-dropdown-item[data-active="true"] {
      background: hsl(var(--bg-200));
      color: hsl(var(--text-000));
    }
    .cp-dropdown-item:disabled {
      opacity: 0.56;
      cursor: default;
    }
    .cp-dropdown-item-label {
      flex: 1;
      min-width: 0;
      font-size: 0.875rem;
      line-height: 1.4;
      white-space: normal;
      word-break: break-word;
    }
    .cp-dropdown-item-check {
      margin-left: auto;
      color: hsl(var(--accent-100));
      font-size: 0.875rem;
      line-height: 1;
      flex: 0 0 auto;
    }
    .cp-dropdown-item-shell {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      width: 100%;
    }
    .cp-dropdown-item-shell[data-active="true"] .cp-dropdown-item {
      background: hsl(var(--bg-200));
      color: hsl(var(--text-000));
    }
    .cp-dropdown-item-delete {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      width: 1.875rem;
      height: 1.875rem;
      border: 0;
      border-radius: 0.5rem;
      background: transparent;
      color: hsl(var(--text-400));
      font-size: 1rem;
      line-height: 1;
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .cp-dropdown-item-delete:hover {
      background: hsl(var(--bg-200));
      color: hsl(var(--danger-100));
    }
    .cp-page-input-mono {
      font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
      font-size: 0.875rem;
    }
    .cp-page-textarea {
      min-height: 5.5rem;
      resize: vertical;
    }
    .cp-prompt-textarea {
      min-height: 14rem;
    }
    .cp-page-input::placeholder,
    .cp-page-textarea::placeholder {
      color: hsl(var(--text-400));
    }
    .cp-page-input:hover,
    .cp-page-select:hover,
    .cp-page-textarea:hover {
      box-shadow: none;
    }
    .cp-page-input-shell {
      display: flex;
      align-items: center;
      min-height: 3rem;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
    .cp-page-input-shell .cp-page-input {
      min-height: 0;
      border: 0;
      background: transparent;
      padding-right: 0.375rem;
      box-shadow: none;
      flex: 1 1 auto;
      min-width: 0;
    }
    .cp-page-input-shell .cp-page-input:hover,
    .cp-page-input-shell .cp-page-input:focus {
      box-shadow: none;
      outline: none;
    }
    .cp-page-visibility-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.25rem;
      padding: 0;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: hsl(var(--text-300));
      cursor: pointer;
      flex: 0 0 auto;
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .cp-page-visibility-btn:hover {
      background: hsl(var(--bg-200));
      color: hsl(var(--text-100));
    }
    .cp-page-visibility-btn:focus {
      outline: none;
      box-shadow: none;
    }
    .cp-page-visibility-btn svg {
      width: 1rem;
      height: 1rem;
      display: block;
    }
    .cp-page-input:focus,
    .cp-page-select:focus,
    .cp-page-textarea:focus {
      outline: none;
      box-shadow: none;
    }
    .cp-provider-view {
      display: grid;
      gap: 1rem;
    }
    .cp-provider-header {
      position: relative;
    }
    .cp-provider-header-action {
      position: absolute;
      top: 0;
      right: 0;
    }
    .cp-provider-header .cp-page-subheading {
      margin-right: 12rem;
    }
    .cp-provider-toolbar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .cp-provider-toolbar-copy {
      display: grid;
      gap: 0.35rem;
      min-width: 0;
    }
    .cp-provider-card-list {
      display: grid;
      gap: 1rem;
    }
    .cp-provider-card {
      display: grid;
      gap: 1rem;
    }
    .cp-provider-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .cp-provider-card-title-wrap {
      display: grid;
      gap: 0.25rem;
      min-width: 0;
    }
    .cp-provider-card-title {
      margin: 0;
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.35;
      color: hsl(var(--text-100));
      word-break: break-word;
    }
    .cp-provider-card-subtitle {
      margin: 0;
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.875rem;
      line-height: 1.45;
      color: hsl(var(--text-400));
      word-break: break-word;
    }
    .cp-provider-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 1.75rem;
      padding: 0.25rem 0.625rem;
      border-radius: 999px;
      background: hsl(var(--bg-200));
      color: hsl(var(--text-100));
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.8125rem;
      font-weight: 500;
      line-height: 1.2;
      white-space: nowrap;
    }
    .cp-provider-badge[data-tone="brand"] {
      background: hsl(var(--brand-100));
      color: hsl(var(--oncolor-100));
    }
    .cp-provider-summary {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .cp-provider-summary[data-layout="single"] {
      grid-template-columns: minmax(0, 1fr);
    }
    .cp-provider-summary-item {
      display: grid;
      gap: 0.25rem;
      min-width: 0;
    }
    .cp-provider-summary-item[data-field="model"],
    .cp-provider-summary-item[data-field="reasoning"] {
      gap: 0.5rem;
    }
    .cp-provider-summary-label {
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1.35;
      color: hsl(var(--text-400));
    }
    .cp-provider-summary-value {
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.875rem;
      line-height: 1.45;
      color: hsl(var(--text-100));
      word-break: break-word;
    }
    .cp-provider-summary-value[data-truncate="true"] {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
    }
    .cp-provider-summary-value[data-truncate="multiline"] {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-word;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .cp-provider-summary-value[data-mono="true"] {
      font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
      font-size: 0.8125rem;
    }
    .cp-provider-inline-control {
      width: 100%;
    }
    .cp-provider-inline-control .cp-dropdown {
      width: 100%;
    }
    .cp-provider-inline-control .cp-dropdown-trigger {
      width: 100%;
    }
    .cp-provider-card-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .cp-provider-empty {
      display: grid;
      gap: 0.5rem;
      padding: 1.25rem;
      background: hsl(var(--bg-100));
      border: 1px dashed hsl(var(--border-300));
      border-radius: 0.75rem;
    }
    .cp-provider-empty-title {
      margin: 0;
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.35;
      color: hsl(var(--text-100));
    }
    .cp-provider-empty-help {
      margin: 0;
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.875rem;
      line-height: 1.45;
      color: hsl(var(--text-400));
    }
    .cp-provider-editor-toolbar {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .cp-provider-editor-title {
      margin: 0;
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.35;
      color: hsl(var(--text-100));
    }
    .cp-provider-editor-help {
      margin: 0.25rem 0 0;
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.875rem;
      line-height: 1.45;
      color: hsl(var(--text-400));
    }
    .cp-provider-floating-shell {
      position: sticky;
      bottom: 1rem;
      z-index: 8;
      display: flex;
      justify-content: center;
      margin-top: 0.25rem;
      pointer-events: none;
    }
    .cp-provider-floating-capsule {
      pointer-events: auto;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
    }
    .cp-provider-floating-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      flex: 0 0 auto;
    }
    .cp-provider-floating-btn:disabled {
      opacity: 0.56;
      cursor: not-allowed;
    }
    .cp-page-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .cp-page-btn-row {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .cp-page-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 3rem;
      padding: 0.75rem 1rem;
      color: hsl(var(--text-200));
      font-family: var(--font-ui, ui-sans-serif, system-ui);
      font-size: 0.95rem;
      cursor: pointer;
      box-shadow: none;
      transition: none;
    }
    .cp-page-field > .cp-page-btn,
    .cp-page-field > .cp-page-select,
    .cp-page-field > .cp-page-input,
    .cp-page-field > .cp-page-textarea {
      width: 100%;
    }
    .cp-page-btn:hover {
      color: hsl(var(--text-100));
    }
    .cp-page-btn:disabled {
      opacity: 0.64;
      cursor: wait;
    }
    .cp-page-btn-primary {
      border-color: hsl(var(--brand-100));
      background: hsl(var(--brand-100));
      color: hsl(var(--oncolor-100));
    }
    .cp-page-btn-primary:hover {
      border-color: hsl(var(--brand-200));
      background: hsl(var(--brand-200));
      color: hsl(var(--oncolor-100));
    }
    .cp-page-btn-quiet {
      min-height: 3rem;
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
    }
    .cp-page-toggle {
      position: relative;
      width: 3rem;
      height: 1.75rem;
      border: 0;
      border-radius: 999px;
      background: hsl(var(--bg-300));
      cursor: pointer;
      transition: background-color 0.2s ease;
      flex: 0 0 auto;
    }
    .cp-page-toggle::after {
      content: "";
      position: absolute;
      top: 0.1875rem;
      left: 0.1875rem;
      width: 1.375rem;
      height: 1.375rem;
      border-radius: 999px;
      background: hsl(var(--bg-000));
      box-shadow: 0 1px 2px rgba(20, 20, 19, 0.14);
      transition: transform 0.2s ease;
    }
    .cp-page-toggle[data-enabled="true"] {
      background: hsl(var(--brand-100));
    }
    .cp-page-toggle[data-enabled="true"]::after {
      transform: translateX(1.25rem);
    }
    .cp-page-status[data-kind="success"],
    .cp-page-meta[data-tone="ready"] {
      color: hsl(var(--success-100));
    }
    .cp-page-status[data-kind="error"],
    .cp-page-meta[data-tone="error"] {
      color: hsl(var(--danger-100));
    }
    .cp-page-meta[data-tone="loading"] {
      color: hsl(var(--text-300));
    }
    .cp-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: rgba(20, 20, 19, 0.34);
    }
    .cp-modal-card {
      width: min(28rem, calc(100vw - 2rem));
    }
    .cp-modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .cp-page-panel[data-disabled="true"] .cp-page-fieldset {
      opacity: 0.72;
    }
    .cp-nav-override-inactive > a,
    .cp-nav-override-inactive > button,
    .cp-nav-override-inactive [data-active="true"] {
      background: transparent !important;
      color: hsl(var(--text-200)) !important;
      font-weight: 500 !important;
    }
    .cp-nav-override-inactive > a:hover,
    .cp-nav-override-inactive > button:hover {
      background: hsl(var(--bg-200)) !important;
      color: hsl(var(--text-100)) !important;
    }
    .cp-options-host-provider-active > :not(#${ROOT_ID}):not(#${PROMPT_ROOT_ID}):not(#${DEBUG_ROOT_ID}) {
      display: none !important;
    }
    @media (max-width: 767px) {
      .cp-provider-header-action {
        position: static;
        margin-top: 1rem;
      }
      .cp-provider-header .cp-page-subheading {
        margin-right: 0;
      }
      .cp-provider-floating-shell {
        bottom: 0.75rem;
      }
      .cp-provider-floating-capsule {
        width: min(100%, 32rem);
      }
      .cp-provider-floating-btn {
        flex: 1 1 0;
        min-width: 0;
      }
      .cp-page-grid-2 {
        grid-template-columns: 1fr;
      }
      .cp-page-split-label-row {
        grid-template-columns: 1fr;
      }
      .cp-model-control-row {
        flex-direction: column;
      }
      .cp-provider-summary {
        grid-template-columns: 1fr;
      }
      .cp-model-action-group {
        width: 100%;
      }
      .cp-model-action-btn-main {
        flex: 1 1 auto;
      }
      .cp-page-row,
      .cp-page-actions {
        flex-direction: column;
        align-items: flex-start;
      }
      .cp-page-btn-row,
      .cp-page-btn {
        width: 100%;
      }
    }
  `;
  function createNode(tag, className, text) {
    const node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text != null) {
      node.textContent = text;
    }
    return node;
  }
  function closeActiveDropdown(except) {
    if (activeDropdownController && activeDropdownController !== except) {
      activeDropdownController.close();
    }
  }
  function enhanceSelect(select) {
    select.classList.add("cp-native-select");
    const shell = createNode("div", "cp-dropdown");
    const trigger = createNode("button", `cp-dropdown-trigger ${SHARED_FRAME_CLASS}`);
    trigger.type = "button";
    const triggerLabel = createNode("span", "cp-dropdown-trigger-label");
    const triggerIcon = createNode("span", "cp-dropdown-trigger-icon");
    trigger.appendChild(triggerLabel);
    trigger.appendChild(triggerIcon);
    const menu = createNode("div", `cp-dropdown-menu ${SHARED_FRAME_CLASS}`);
    menu.hidden = true;
    let isOpen = false;
    let isPreparingOpen = false;
    function getOptions() {
      return Array.from(select.options || []);
    }
    function getSelectedOption() {
      return getOptions().find(function (option) {
        return option.value === select.value;
      }) || select.options[select.selectedIndex] || null;
    }
    function positionMenu() {
      const rect = trigger.getBoundingClientRect();
      menu.style.left = "0";
      menu.style.right = "0";
      menu.style.width = "100%";
      menu.style.top = "calc(100% + 0.5rem)";
      menu.style.bottom = "auto";
      menu.dataset.placement = "bottom";
      menu.style.visibility = "hidden";
      menu.hidden = false;
      const menuHeight = menu.offsetHeight;
      if (rect.bottom + 8 + menuHeight > window.innerHeight - 8 && rect.top - 8 - menuHeight >= 8) {
        menu.dataset.placement = "top";
        menu.style.top = "auto";
        menu.style.bottom = "calc(100% + 0.5rem)";
      }
      menu.style.visibility = "";
    }
    function syncTrigger() {
      const selected = getSelectedOption();
      triggerLabel.textContent = selected ? selected.textContent : "";
      trigger.disabled = !!select.disabled;
    }
    function dispatchChange() {
      select.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      select.dispatchEvent(new Event("input", {
        bubbles: true
      }));
    }
    function renderMenu() {
      menu.innerHTML = "";
      const options = getOptions();
      const nonEmptyOptions = options.filter(function (option) {
        return option.value !== "";
      });
      const sourceOptions = nonEmptyOptions.length ? nonEmptyOptions : options;
      for (const option of sourceOptions) {
        const shell = createNode("div", "cp-dropdown-item-shell");
        shell.dataset.active = option.value === select.value ? "true" : "false";
        const item = createNode("button", "cp-dropdown-item");
        item.type = "button";
        item.disabled = !!option.disabled;
        const label = createNode("span", "cp-dropdown-item-label", option.textContent || "");
        item.appendChild(label);
        if (option.value === select.value) {
          item.appendChild(createNode("span", "cp-dropdown-item-check", "✓"));
        }
        item.addEventListener("click", function () {
          if (option.disabled) {
            return;
          }
          if (select.value !== option.value) {
            select.value = option.value;
            dispatchChange();
          }
          controller.close();
        });
        shell.appendChild(item);
        if (option.dataset.manual === "true" && typeof select.__cpDeleteOption === "function") {
          const deleteButton = createNode("button", "cp-dropdown-item-delete", "×");
          deleteButton.type = "button";
          deleteButton.setAttribute("aria-label", `delete-${option.value}`);
          deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            select.__cpDeleteOption(option.value);
            if (isOpen) {
              renderMenu();
              positionMenu();
            }
          });
          shell.appendChild(deleteButton);
        }
        menu.appendChild(shell);
      }
    }
    async function open() {
      if (isOpen || isPreparingOpen) {
        return;
      }
      isPreparingOpen = true;
      closeActiveDropdown(controller);
      try {
        if (typeof select.__cpBeforeOpen === "function") {
          trigger.disabled = true;
          trigger.dataset.loading = "true";
          await select.__cpBeforeOpen({
            select,
            controller,
            trigger,
            menu
          });
          syncTrigger();
        }
        if (select.disabled) {
          return;
        }
        renderMenu();
        isOpen = true;
        trigger.dataset.open = "true";
        positionMenu();
        activeDropdownController = controller;
      } finally {
        isPreparingOpen = false;
        delete trigger.dataset.loading;
        syncTrigger();
      }
    }
    function close() {
      if (!isOpen) {
        return;
      }
      isOpen = false;
      trigger.dataset.open = "false";
      menu.hidden = true;
      if (activeDropdownController === controller) {
        activeDropdownController = null;
      }
    }
    function toggle() {
      if (isOpen) {
        close();
      } else {
        open();
      }
    }
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      void toggle();
    });
    trigger.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        void open();
      } else if (event.key === "Escape") {
        close();
      }
    });
    const handleDocumentPointerDown = function (event) {
      const target = event.target;
      if (!shell.contains(target) && !menu.contains(target)) {
        close();
      }
    };
    const handleWindowReflow = function () {
      if (isOpen) {
        positionMenu();
      }
    };
    document.addEventListener("mousedown", handleDocumentPointerDown, true);
    window.addEventListener("resize", handleWindowReflow);
    window.addEventListener("scroll", handleWindowReflow, true);
    const handleSelectChange = function () {
      syncTrigger();
      if (isOpen) {
        renderMenu();
        positionMenu();
      }
    };
    select.addEventListener("change", handleSelectChange);
    select.parentNode.insertBefore(shell, select);
    shell.appendChild(trigger);
    shell.appendChild(menu);
    shell.appendChild(select);
    syncTrigger();
    const controller = {
      close,
      refresh() {
        syncTrigger();
        if (isOpen) {
          renderMenu();
          positionMenu();
        }
      },
      open,
      destroy() {
        close();
        document.removeEventListener("mousedown", handleDocumentPointerDown, true);
        window.removeEventListener("resize", handleWindowReflow);
        window.removeEventListener("scroll", handleWindowReflow, true);
        select.removeEventListener("change", handleSelectChange);
      }
    };
    return controller;
  }
  async function getState() {
    const stored = await readProviderStoreState();
    return {
      profiles: stored.profiles || [],
      activeProfileId: stored.activeProfileId || null,
      config: stored.activeProfile || stored.config || createEmptyConfig(),
      originalApiKey: stored.originalApiKey,
      currentApiKey: stored.currentApiKey
    };
  }
  async function getDebugState() {
    const stored = await chrome.storage.local.get([DEBUG_LOGS_KEY, DEBUG_META_KEY]);
    const rawLogs = Array.isArray(stored[DEBUG_LOGS_KEY]) ? stored[DEBUG_LOGS_KEY] : [];
    const rawMeta = stored[DEBUG_META_KEY] && typeof stored[DEBUG_META_KEY] === "object" ? stored[DEBUG_META_KEY] : null;
    const logs = sanitizeDebugExportLogs(rawLogs);
    const meta = sanitizeDebugExportMeta(rawMeta);
    if (JSON.stringify(rawLogs) !== JSON.stringify(logs) || JSON.stringify(rawMeta) !== JSON.stringify(meta)) {
      try {
        await chrome.storage.local.set({
          [DEBUG_LOGS_KEY]: logs,
          [DEBUG_META_KEY]: meta
        });
      } catch {}
    }
    return {
      logs,
      meta
    };
  }
  function formatTimestamp(value) {
    if (!value) {
      return "";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return String(value);
    }
    return parsed.toLocaleString(isChineseUi() ? "zh-CN" : undefined, {
      hour12: false
    });
  }
  function buildDebugExport(logs, meta) {
    return JSON.stringify({
      exportedAt: new Date().toISOString(),
      meta: sanitizeDebugExportMeta(meta),
      count: Array.isArray(logs) ? logs.length : 0,
      logs: sanitizeDebugExportLogs(logs)
    }, null, 2);
  }
  function setStatus(node, kind, message) {
    node.dataset.kind = kind || "";
    if (node.classList.contains("cp-page-meta")) {
      node.dataset.tone = kind === "success" ? "ready" : kind === "error" ? "error" : kind === "loading" ? "loading" : "";
    }
    node.textContent = message || "";
  }
  async function saveConfig(next, state) {
    return saveProviderProfile(next, {
      profileId: state.editingProfileId || undefined
    });
  }
  function getActiveTab() {
    const hash = String(window.location.hash || "").replace(/^#/, "");
    return (hash.split("?")[0] || "permissions").toLowerCase();
  }
  function getHashQuery() {
    const hash = String(window.location.hash || "").replace(/^#/, "");
    const parts = hash.split("?");
    return new URLSearchParams(parts[1] || "");
  }
  function isOptionsTabActive() {
    return getActiveTab() === "options";
  }
  function getCustomSubview() {
    if (!isOptionsTabActive()) {
      return "";
    }
    const value = String(getHashQuery().get("provider") || "").trim().toLowerCase();
    if (value === "prompt" || value === "prompts") {
      return "prompt";
    }
    if (value === "true" || value === "provider") {
      return "provider";
    }
    return "";
  }
  function isProviderViewActive() {
    return getCustomSubview() === "provider";
  }
  function isPromptViewActive() {
    return getCustomSubview() === "prompt";
  }
  function setCustomSubview(view) {
    const nextHash = view === "provider" ? "options?provider=true" : view === "prompt" ? "options?provider=prompt" : "options";
    if (window.location.hash.replace(/^#/, "") !== nextHash) {
      window.location.hash = nextHash;
    }
  }
  function findSidebarNavList() {
    const navLists = Array.from(document.querySelectorAll("nav ul"));
    return navLists.find(function (node) {
      const text = String(node.textContent || "");
      return text.includes("Options") || text.includes("选项");
    }) || null;
  }
  function findOptionsNavItem(list) {
    const items = Array.from((list || findSidebarNavList())?.children || []);
    return items.find(function (node) {
      const text = String(node.textContent || "").trim();
      return text === "Options" || text === "选项";
    }) || null;
  }
  function findNavButton(node) {
    if (!node || typeof node.querySelector !== "function") {
      return null;
    }
    return node.querySelector("button, a");
  }
  function isNativeNavButtonActive(button) {
    const className = String(button?.className || "");
    return className.includes("bg-bg-300") && className.includes("text-text-000");
  }
  function getNativeNavButtonClassNames(list, optionsItem) {
    const nativeButtons = Array.from((list || findSidebarNavList())?.children || []).filter(function (node) {
      return node && node.id !== NAV_ITEM_ID && node.id !== PROMPT_NAV_ITEM_ID;
    }).map(findNavButton).filter(Boolean);
    const activeButton = nativeButtons.find(isNativeNavButtonActive) || findNavButton(optionsItem) || nativeButtons[0] || null;
    const inactiveButton = nativeButtons.find(function (button) {
      return button !== activeButton;
    }) || nativeButtons[0] || activeButton;
    return {
      activeClassName: String(activeButton?.className || ""),
      inactiveClassName: String(inactiveButton?.className || activeButton?.className || "")
    };
  }
  function ensureCustomNavItem(options) {
    const config = options && typeof options === "object" ? options : {};
    const list = config.list;
    const optionsItem = config.optionsItem;
    const optionsButton = config.optionsButton;
    const id = config.id;
    if (!list || !optionsItem || !optionsButton || !id) {
      return null;
    }
    let navItem = document.getElementById(id);
    let button = findNavButton(navItem);
    if (!navItem || !button) {
      if (navItem?.parentNode) {
        navItem.remove();
      }
      navItem = document.createElement("li");
      navItem.id = id;
      button = optionsButton.cloneNode(true);
      button.removeAttribute("href");
      button.type = "button";
      button.addEventListener("click", function (event) {
        event.preventDefault();
        config.onClick?.();
      });
      navItem.appendChild(button);
    }
    const nativeClassNames = getNativeNavButtonClassNames(list, optionsItem);
    const nextClassName = config.active ? nativeClassNames.activeClassName : nativeClassNames.inactiveClassName;
    if (button.textContent !== config.label) {
      button.textContent = config.label;
    }
    if (nextClassName && button.className !== nextClassName) {
      button.className = nextClassName;
    }
    if (button.type !== "button") {
      button.type = "button";
    }
    return navItem;
  }
  function ensureProviderNavItem(strings) {
    const list = findSidebarNavList();
    const optionsItem = findOptionsNavItem(list);
    if (!list || !optionsItem) {
      return null;
    }
    const optionsButton = findNavButton(optionsItem);
    if (!optionsButton) {
      debugLog("customProvider.nav.no-button", {
        hasOptionsItem: !!optionsItem
      }, "warn");
      return null;
    }
    const providerActive = isProviderViewActive();
    const promptActive = isPromptViewActive();
    const providerNavItem = ensureCustomNavItem({
      list,
      optionsItem,
      optionsButton,
      id: NAV_ITEM_ID,
      label: strings.providerName,
      active: providerActive,
      onClick() {
        debugLog("customProvider.nav.click", {
          currentHash: location.hash,
          target: "provider"
        });
        setCustomSubview("provider");
      }
    });
    const promptNavItem = ensureCustomNavItem({
      list,
      optionsItem,
      optionsButton,
      id: PROMPT_NAV_ITEM_ID,
      label: strings.promptTitle,
      active: promptActive,
      onClick() {
        debugLog("customProvider.nav.click", {
          currentHash: location.hash,
          target: "prompt"
        });
        setCustomSubview("prompt");
      }
    });
    const nativeClassNames = getNativeNavButtonClassNames(list, optionsItem);
    if (providerNavItem && optionsItem.nextElementSibling !== providerNavItem) {
      optionsItem.insertAdjacentElement("afterend", providerNavItem);
    }
    if (promptNavItem && providerNavItem?.nextElementSibling !== promptNavItem) {
      (providerNavItem || optionsItem).insertAdjacentElement("afterend", promptNavItem);
    }
    const nextInactive = providerActive || promptActive;
    if (optionsItem.classList.contains("cp-nav-override-inactive") !== nextInactive) {
      optionsItem.classList.toggle("cp-nav-override-inactive", nextInactive);
    }
    return {
      providerNavItem,
      promptNavItem,
      nativeClassNames
    };
  }
  function findOptionsContentRoot() {
    const list = findSidebarNavList();
    const nav = list ? list.closest("nav") : null;
    const grid = nav ? nav.parentElement : null;
    if (!grid) {
      return null;
    }
    return Array.from(grid.children).find(function (node) {
      return node !== nav && node && node.nodeType === Node.ELEMENT_NODE;
    }) || null;
  }
  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }
    const style = createNode("style");
    style.id = STYLE_ID;
    style.textContent = styles;
    document.head.appendChild(style);
  }
  function buildUi() {
    if (typeof activeUiCleanup === "function") {
      activeUiCleanup();
      activeUiCleanup = null;
    }
    debugLog("customProvider.buildUi.start", {
      readyState: document.readyState,
      hash: location.hash
    });
    ensureStyles();
    let localeKey = getUiLocaleKey();
    let strings = localeKey === "zh" ? UI_STRINGS.zh : UI_STRINGS.en;
    const providerRoot = createNode("div", "space-y-6");
    providerRoot.id = ROOT_ID;
    const debugMountRoot = createNode("div", "space-y-6 mt-6");
    debugMountRoot.id = DEBUG_ROOT_ID;
    const panel = createNode("section", "cp-page-card cp-page-panel bg-bg-100 border border-border-300 rounded-xl px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8");
    panel.id = PANEL_ID;
    const stack = createNode("div", "cp-page-stack");
    const header = createNode("div", "cp-provider-header");
    header.appendChild(createNode("h3", "cp-page-heading text-text-100 font-xl-bold", strings.providerName));
    header.appendChild(createNode("p", "cp-page-subheading text-text-300 font-base", strings.subtitle));
    const headerAction = createNode("div", "cp-provider-header-action");
    const listButtonRow = createNode("div", "cp-page-btn-row");
    const addProfileButton = createNode("button", "px-6 py-3 bg-brand-100 text-oncolor-100 rounded-xl hover:bg-brand-100/90 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.newProfile);
    addProfileButton.type = "button";
    listButtonRow.appendChild(addProfileButton);
    headerAction.appendChild(listButtonRow);
    header.appendChild(headerAction);
    const listView = createNode("div", "cp-provider-view");
    listView.hidden = false;
    const listStatus = createNode("div", "cp-page-status");
    const emptyState = createNode("div", "cp-provider-empty");
    emptyState.appendChild(createNode("h4", "cp-provider-empty-title", strings.emptyProfilesTitle));
    emptyState.appendChild(createNode("p", "cp-provider-empty-help", strings.emptyProfilesHelp));
    const profileCardList = createNode("div", "cp-provider-card-list");
    listView.appendChild(listStatus);
    listView.appendChild(emptyState);
    listView.appendChild(profileCardList);
    const editorView = createNode("div", "cp-provider-view");
    editorView.hidden = true;
    const editorToolbar = createNode("div", "cp-provider-editor-toolbar");
    const editorToolbarCopy = createNode("div");
    const editorTitle = createNode("h4", "cp-provider-editor-title", strings.createProfileTitle);
    editorToolbarCopy.appendChild(editorTitle);
    const backToListButton = createNode("button", "cp-provider-floating-btn px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.backToList);
    backToListButton.type = "button";
    editorToolbar.appendChild(editorToolbarCopy);
    const form = document.createElement("form");
    form.id = "cp-provider-editor-form";
    form.className = "cp-page-stack cp-page-fieldset";
    const providerFormatOptions = [["anthropic", "Anthropic Messages"], ["openai_chat", "OpenAI Chat Completions"], ["openai_responses", "OpenAI Responses API"]];
    const identityGrid = createNode("div", "cp-page-grid cp-page-grid-2");
    const nameField = createNode("label", "cp-page-field");
    const nameInput = createNode("input", `cp-page-input ${SHARED_FRAME_CLASS}`);
    nameInput.placeholder = strings.providerNamePlaceholder;
    nameField.appendChild(createNode("span", "cp-page-label", strings.providerNameLabel));
    nameField.appendChild(nameInput);
    const formatField = createNode("label", "cp-page-field");
    const formatSelect = createNode("select", `cp-page-select ${SHARED_FRAME_CLASS}`);
    providerFormatOptions.forEach(function (option) {
      const node = document.createElement("option");
      node.value = option[0];
      node.textContent = option[1];
      formatSelect.appendChild(node);
    });
    formatField.appendChild(createNode("span", "cp-page-label", strings.providerFormatLabel));
    formatField.appendChild(formatSelect);
    identityGrid.appendChild(nameField);
    identityGrid.appendChild(formatField);
    const baseUrlField = createNode("label", "cp-page-field");
    const baseUrlInput = createNode("input", `cp-page-input cp-page-input-mono ${SHARED_FRAME_CLASS}`);
    baseUrlInput.placeholder = strings.baseUrlPlaceholder;
    const requestPreview = createNode("div", "cp-page-url-preview", strings.requestUrlPrefix + "/messages");
    requestPreview.dataset.empty = "true";
    baseUrlField.appendChild(createNode("span", "cp-page-label", strings.baseUrlLabel));
    baseUrlField.appendChild(baseUrlInput);
    baseUrlField.appendChild(requestPreview);
    const apiKeyField = createNode("label", "cp-page-field");
    const apiKeyShell = createNode("div", `cp-page-input-shell ${SHARED_FRAME_CLASS}`);
    const apiKeyInput = createNode("input", "cp-page-input cp-page-input-mono");
    apiKeyInput.type = "password";
    apiKeyInput.placeholder = strings.apiKeyPlaceholder;
    const apiKeyToggle = createNode("button", "cp-page-visibility-btn");
    apiKeyToggle.type = "button";
    function setApiKeyVisibility(visible) {
      apiKeyInput.type = visible ? "text" : "password";
      const label = visible ? strings.hideApiKey : strings.showApiKey;
      apiKeyToggle.setAttribute("aria-label", label);
      apiKeyToggle.title = label;
      apiKeyToggle.dataset.visible = visible ? "true" : "false";
      apiKeyToggle.innerHTML = getApiKeyVisibilityIconMarkup(visible);
    }
    setApiKeyVisibility(false);
    apiKeyToggle.addEventListener("click", function () {
      setApiKeyVisibility(apiKeyInput.type === "password");
      apiKeyInput.focus({
        preventScroll: true
      });
    });
    apiKeyField.appendChild(createNode("span", "cp-page-label", strings.apiKeyLabel));
    apiKeyShell.appendChild(apiKeyInput);
    apiKeyShell.appendChild(apiKeyToggle);
    apiKeyField.appendChild(apiKeyShell);
    const modelField = createNode("div", "cp-page-field");
    const pickerLabelRow = createNode("div", "cp-page-label-row");
    pickerLabelRow.appendChild(createNode("span", "cp-page-label", strings.defaultModelLabel));
    const modelMeta = createNode("span", "cp-page-meta", strings.fetchedModelsHint);
    pickerLabelRow.appendChild(modelMeta);
    const modelControlRow = createNode("div", "cp-model-control-row");
    const modelSelect = createNode("select", `cp-page-select ${SHARED_FRAME_CLASS}`);
    const modelActionGroup = createNode("div", "cp-model-action-group");
    const fetchModelsButton = createNode("button", "cp-model-action-btn cp-model-action-btn-main px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.fetchModels);
    fetchModelsButton.type = "button";
    const addModelButton = createNode("button", "cp-model-action-btn cp-model-action-btn-add px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", "+");
    addModelButton.type = "button";
    addModelButton.setAttribute("aria-label", strings.addModelAria);
    const healthCheckButton = createNode("button", "cp-model-action-btn cp-model-action-btn-main px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.healthCheck);
    healthCheckButton.type = "button";
    modelActionGroup.appendChild(fetchModelsButton);
    modelActionGroup.appendChild(addModelButton);
    modelActionGroup.appendChild(healthCheckButton);
    modelField.appendChild(pickerLabelRow);
    modelControlRow.appendChild(modelSelect);
    modelControlRow.appendChild(modelActionGroup);
    modelField.appendChild(modelControlRow);
    const reasoningField = createNode("div", "cp-page-field");
    const reasoningLabelRow = createNode("div", "cp-page-split-label-row");
    const reasoningControlRow = createNode("div", "cp-model-control-row");
    const reasoningSelect = createNode("select", `cp-page-select ${SHARED_FRAME_CLASS}`);
    const contextWindowShell = createNode("div", `cp-page-input-shell cp-context-window-shell ${SHARED_FRAME_CLASS}`);
    const contextWindowValue = createNode("div", "cp-context-window-value");
    const contextWindowInput = createNode("input", "cp-page-input cp-page-input-mono cp-context-window-input");
    const contextWindowStepper = createNode("div", "cp-context-window-stepper");
    const contextWindowStepUp = createNode("button", "cp-context-window-step-btn", "▴");
    const contextWindowStepDown = createNode("button", "cp-context-window-step-btn", "▾");
    contextWindowInput.type = "text";
    contextWindowInput.inputMode = "numeric";
    contextWindowInput.placeholder = strings.contextWindowPlaceholder;
    contextWindowInput.setAttribute("aria-label", strings.contextWindowLabel);
    contextWindowInput.title = strings.contextWindowLabel;
    contextWindowInput.autocomplete = "off";
    contextWindowInput.spellcheck = false;
    contextWindowStepUp.type = "button";
    contextWindowStepDown.type = "button";
    contextWindowStepUp.setAttribute("aria-label", `${strings.contextWindowLabel} +${CONTEXT_WINDOW_STEP_K}k`);
    contextWindowStepDown.setAttribute("aria-label", `${strings.contextWindowLabel} -${CONTEXT_WINDOW_STEP_K}k`);
    appendReasoningEffortOptions(reasoningSelect);
    reasoningLabelRow.appendChild(createNode("span", "cp-page-label", strings.reasoningEffortLabel));
    reasoningLabelRow.appendChild(createNode("span", "cp-page-label", strings.contextWindowLabel));
    reasoningField.appendChild(reasoningLabelRow);
    reasoningControlRow.appendChild(reasoningSelect);
    contextWindowValue.appendChild(contextWindowInput);
    contextWindowShell.appendChild(contextWindowValue);
    contextWindowStepper.appendChild(contextWindowStepUp);
    contextWindowStepper.appendChild(contextWindowStepDown);
    contextWindowShell.appendChild(contextWindowStepper);
    reasoningControlRow.appendChild(contextWindowShell);
    reasoningField.appendChild(reasoningControlRow);
    const saveButton = createNode("button", "cp-provider-floating-btn px-6 py-3 bg-brand-100 text-oncolor-100 rounded-xl hover:bg-brand-100/90 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.saveAndApply);
    saveButton.type = "submit";
    saveButton.setAttribute("form", form.id);
    const editorFloatingShell = createNode("div", "cp-provider-floating-shell");
    editorFloatingShell.hidden = true;
    const editorFloatingCapsule = createNode("div", `cp-provider-floating-capsule ${SHARED_FRAME_CLASS}`);
    editorFloatingCapsule.appendChild(backToListButton);
    editorFloatingCapsule.appendChild(saveButton);
    editorFloatingShell.appendChild(editorFloatingCapsule);
    const manualModelOverlay = createNode("div", "cp-modal-backdrop");
    manualModelOverlay.hidden = true;
    const manualModelCard = createNode("div", "cp-page-card cp-modal-card bg-bg-100 border border-border-300 rounded-xl px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8");
    const manualModelStack = createNode("div", "cp-page-stack");
    const manualModelHeader = createNode("div");
    manualModelHeader.appendChild(createNode("h3", "cp-page-heading text-text-100 font-xl-bold", strings.manualAddModelTitle));
    manualModelHeader.appendChild(createNode("p", "cp-page-subheading text-text-300 font-base", strings.manualAddModelSubtitle));
    const manualModelField = createNode("label", "cp-page-field");
    const manualModelInput = createNode("input", `cp-page-input cp-page-input-mono ${SHARED_FRAME_CLASS}`);
    manualModelInput.placeholder = strings.manualModelIdPlaceholder;
    manualModelField.appendChild(createNode("span", "cp-page-label", strings.manualModelIdLabel));
    manualModelField.appendChild(manualModelInput);
    const manualModelStatus = createNode("div", "cp-page-status");
    const manualModelActions = createNode("div", "cp-modal-actions");
    const manualModelCancelButton = createNode("button", "px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.cancelAction);
    manualModelCancelButton.type = "button";
    const manualModelConfirmButton = createNode("button", "px-6 py-3 bg-brand-100 text-oncolor-100 rounded-xl hover:bg-brand-100/90 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.manualAddConfirm);
    manualModelConfirmButton.type = "button";
    manualModelActions.appendChild(manualModelCancelButton);
    manualModelActions.appendChild(manualModelConfirmButton);
    manualModelStack.appendChild(manualModelHeader);
    manualModelStack.appendChild(manualModelField);
    manualModelStack.appendChild(manualModelStatus);
    manualModelStack.appendChild(manualModelActions);
    manualModelCard.appendChild(manualModelStack);
    manualModelOverlay.appendChild(manualModelCard);
    form.appendChild(identityGrid);
    form.appendChild(baseUrlField);
    form.appendChild(apiKeyField);
    form.appendChild(modelField);
    form.appendChild(reasoningField);
    stack.appendChild(header);
    editorView.appendChild(editorToolbar);
    editorView.appendChild(form);
    stack.appendChild(listView);
    stack.appendChild(editorView);
    panel.appendChild(stack);
    const promptRoot = createNode("div", "space-y-6");
    promptRoot.id = PROMPT_ROOT_ID;
    const promptPanel = createNode("section", "cp-page-card cp-page-panel bg-bg-100 border border-border-300 rounded-xl px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8");
    const promptStack = createNode("div", "cp-page-stack");
    const promptHeader = createNode("div", "cp-provider-header");
    promptHeader.appendChild(createNode("h3", "cp-page-heading text-text-100 font-xl-bold", strings.promptTitle));
    promptHeader.appendChild(createNode("p", "cp-page-subheading text-text-300 font-base", strings.promptSubtitle));
    const promptHeaderAction = createNode("div", "cp-provider-header-action");
    const promptHeaderButtons = createNode("div", "cp-page-btn-row");
    const addPromptProfileButton = createNode("button", "px-6 py-3 bg-brand-100 text-oncolor-100 rounded-xl hover:bg-brand-100/90 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.newProfile);
    addPromptProfileButton.type = "button";
    promptHeaderButtons.appendChild(addPromptProfileButton);
    promptHeaderAction.appendChild(promptHeaderButtons);
    promptHeader.appendChild(promptHeaderAction);
    const promptListView = createNode("div", "cp-provider-view");
    const promptListStatus = createNode("div", "cp-page-status");
    const promptEmptyState = createNode("div", "cp-provider-empty");
    promptEmptyState.appendChild(createNode("h4", "cp-provider-empty-title", strings.promptEmptyProfilesTitle));
    promptEmptyState.appendChild(createNode("p", "cp-provider-empty-help", strings.promptEmptyProfilesHelp));
    const promptCardList = createNode("div", "cp-provider-card-list");
    promptListView.appendChild(promptListStatus);
    promptListView.appendChild(promptEmptyState);
    promptListView.appendChild(promptCardList);
    const promptEditorView = createNode("div", "cp-provider-view");
    promptEditorView.hidden = true;
    const promptEditorToolbar = createNode("div", "cp-provider-editor-toolbar");
    const promptEditorToolbarCopy = createNode("div");
    const promptEditorTitle = createNode("h4", "cp-provider-editor-title", strings.promptCreateTitle);
    promptEditorToolbarCopy.appendChild(promptEditorTitle);
    const promptBackButton = createNode("button", "cp-provider-floating-btn px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.backToList);
    promptBackButton.type = "button";
    promptEditorToolbar.appendChild(promptEditorToolbarCopy);
    const promptForm = document.createElement("form");
    promptForm.id = "cp-prompt-editor-form";
    promptForm.className = "cp-page-stack cp-page-fieldset";
    const promptNameField = createNode("label", "cp-page-field");
    const promptNameInput = createNode("input", `cp-page-input ${SHARED_FRAME_CLASS}`);
    promptNameInput.placeholder = strings.promptProfileNamePlaceholder;
    promptNameField.appendChild(createNode("span", "cp-page-label", strings.promptProfileNameLabel));
    promptNameField.appendChild(promptNameInput);
    const promptField = createNode("label", "cp-page-field");
    const promptLabelRow = createNode("div", "cp-page-label-row");
    const promptTextarea = createNode("textarea", `cp-page-textarea cp-prompt-textarea ${SHARED_FRAME_CLASS}`);
    promptTextarea.placeholder = strings.agentRolePlaceholder;
    promptTextarea.spellcheck = false;
    promptTextarea.wrap = "soft";
    promptLabelRow.appendChild(createNode("span", "cp-page-label", strings.agentRoleLabel));
    promptLabelRow.appendChild(createNode("span", "cp-page-help", strings.agentRoleHelp));
    promptField.appendChild(promptLabelRow);
    promptField.appendChild(promptTextarea);
    const promptStatus = createNode("div", "cp-page-status");
    const promptSaveButton = createNode("button", "cp-provider-floating-btn px-6 py-3 bg-brand-100 text-oncolor-100 rounded-xl hover:bg-brand-100/90 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.promptSave);
    promptSaveButton.type = "submit";
    promptSaveButton.setAttribute("form", promptForm.id);
    const promptFloatingShell = createNode("div", "cp-provider-floating-shell");
    promptFloatingShell.hidden = true;
    const promptFloatingCapsule = createNode("div", `cp-provider-floating-capsule ${SHARED_FRAME_CLASS}`);
    promptFloatingCapsule.appendChild(promptBackButton);
    promptFloatingCapsule.appendChild(promptSaveButton);
    promptFloatingShell.appendChild(promptFloatingCapsule);
    promptForm.appendChild(promptNameField);
    promptForm.appendChild(promptField);
    promptForm.appendChild(promptStatus);
    promptEditorView.appendChild(promptEditorToolbar);
    promptEditorView.appendChild(promptForm);
    promptStack.appendChild(promptHeader);
    promptStack.appendChild(promptListView);
    promptStack.appendChild(promptEditorView);
    promptPanel.appendChild(promptStack);
    promptRoot.appendChild(promptPanel);
    promptRoot.appendChild(promptFloatingShell);
    const debugPanel = createNode("section", "cp-page-card cp-page-panel bg-bg-100 border border-border-300 rounded-xl px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8");
    const debugStack = createNode("div", "cp-page-stack");
    const debugHeader = createNode("div");
    debugHeader.appendChild(createNode("h3", "cp-page-heading text-text-100 font-xl-bold", strings.debugTitle));
    debugHeader.appendChild(createNode("p", "cp-page-subheading text-text-300 font-base", strings.debugSubtitle));
    const debugLogsRow = createNode("div", "cp-page-row");
    const debugLogsCopy = createNode("div", "cp-page-row-copy");
    debugLogsCopy.appendChild(createNode("div", "cp-page-row-title", strings.debugLogsTitle));
    debugLogsCopy.appendChild(createNode("p", "cp-page-row-help", strings.debugLogsHelp));
    const debugLogsMeta = createNode("div", "cp-page-meta", strings.debugLogsEmpty);
    debugLogsCopy.appendChild(debugLogsMeta);
    const debugButtonRow = createNode("div", "cp-page-btn-row");
    const copyLogsButton = createNode("button", `cp-page-btn cp-page-btn-quiet ${SHARED_FRAME_CLASS}`, strings.copyLogs);
    copyLogsButton.type = "button";
    const downloadLogsButton = createNode("button", `cp-page-btn cp-page-btn-quiet ${SHARED_FRAME_CLASS}`, strings.downloadLogs);
    downloadLogsButton.type = "button";
    debugButtonRow.appendChild(copyLogsButton);
    debugButtonRow.appendChild(downloadLogsButton);
    debugLogsRow.appendChild(debugLogsCopy);
    debugLogsRow.appendChild(debugButtonRow);
    const debugStatus = createNode("div", "cp-page-status");
    debugStack.appendChild(debugHeader);
    debugStack.appendChild(debugLogsRow);
    debugStack.appendChild(debugStatus);
    debugPanel.appendChild(debugStack);
    providerRoot.appendChild(panel);
    providerRoot.appendChild(editorFloatingShell);
    providerRoot.appendChild(manualModelOverlay);
    debugMountRoot.appendChild(debugPanel);
    const state = {
      profiles: [],
      activeProfileId: null,
      editorMode: "list",
      editingProfileId: null,
      originalApiKey: undefined,
      currentApiKey: "",
      availableModels: [],
      isFetchingModels: false,
      isCheckingHealth: false,
      cardDropdownControllers: []
    };
    const promptProfilesState = {
      profiles: [],
      activeProfileId: null,
      editorMode: "list",
      editingProfileId: null,
      isSaving: false
    };
    const formatDropdown = enhanceSelect(formatSelect);
    const modelDropdown = enhanceSelect(modelSelect);
    const reasoningDropdown = enhanceSelect(reasoningSelect);
    modelSelect.__cpDeleteOption = function (value) {
      removeManualModel(value);
    };
    let isManualModelDialogOpen = false;
    const debugState = {
      logs: [],
      meta: null
    };
    const formatLabelByValue = new Map(providerFormatOptions);
    function mergeModelOptions(primary, secondary) {
      const merged = [];
      const seen = new Set();
      for (const source of [primary, secondary]) {
        for (const item of source || []) {
          const value = String(item?.value || item?.model || "").trim();
          if (!value || seen.has(value)) {
            continue;
          }
          seen.add(value);
          merged.push({
            value,
            label: String(item?.label || item?.name || value).trim() || value,
            manual: !!item?.manual
          });
        }
      }
      return merged;
    }
    function getProviderFetchIdentity(config) {
      const next = normalizeConfig(config, false);
      return [next.format || DEFAULT_FORMAT, String(next.baseUrl || "").trim(), String(next.apiKey || "").trim()].join("::");
    }
    let cachedModelsHydrationToken = 0;
    async function hydrateCachedModelsForConfig(config, selectedValue) {
      const identity = getProviderFetchIdentity(config);
      if (!identity || identity === `${DEFAULT_FORMAT}:::`) {
        return;
      }
      const token = ++cachedModelsHydrationToken;
      const cachedModels = await readCachedFetchedModels(config);
      if (token !== cachedModelsHydrationToken) {
        return;
      }
      if (!cachedModels.length) {
        return;
      }
      if (getProviderFetchIdentity(readForm()) !== identity) {
        return;
      }
      state.availableModels = mergeModelOptions(cachedModels, state.availableModels);
      renderModelOptions(selectedValue || String(config?.defaultModel || "").trim() || modelSelect.value || "");
    }
    async function persistFetchedModelsForEditor(config, models) {
      const persistedModels = await persistFetchedModelsForConfig(config, models);
      const editingProfile = state.editingProfileId ? state.profiles.find(function (entry) {
        return entry.id === state.editingProfileId;
      }) : null;
      if (!editingProfile) {
        return persistedModels;
      }
      if (getProviderFetchIdentity(editingProfile) !== getProviderFetchIdentity(config)) {
        return persistedModels;
      }
      const stored = await saveProviderProfile({
        ...editingProfile,
        fetchedModels: persistedModels
      }, {
        profileId: editingProfile.id,
        activateOnSave: false
      });
      applyStoredState(stored);
      return persistedModels;
    }
    function getFormatLabel(value) {
      return formatLabelByValue.get(String(value || "").trim()) || String(value || DEFAULT_FORMAT).trim() || DEFAULT_FORMAT;
    }
    function appendReasoningEffortOptions(select) {
      [["none", strings.reasoningEffortNone], ["low", strings.reasoningEffortLow], ["medium", strings.reasoningEffortMedium], ["high", strings.reasoningEffortHigh], ["max", strings.reasoningEffortMax]].forEach(function (option) {
        const node = document.createElement("option");
        node.value = option[0];
        node.textContent = option[1];
        select.appendChild(node);
      });
    }
    function syncReasoningEditorControls(reasoningEffort, contextWindow) {
      reasoningSelect.value = normalizeReasoningEffort(reasoningEffort);
      contextWindowInput.value = formatContextWindowForInput(contextWindow);
      contextWindowInput.style.width = getContextWindowInputWidth(contextWindowInput.value, contextWindowInput.placeholder);
      reasoningDropdown.refresh();
    }
    function readContextWindowValue() {
      const numericK = parseContextWindowInputK(contextWindowInput.value);
      if (!Number.isFinite(numericK) || numericK <= 0) {
        return normalizeContextWindow(DEFAULT_CONTEXT_WINDOW, DEFAULT_CONTEXT_WINDOW);
      }
      return normalizeContextWindow(numericK * 1000, DEFAULT_CONTEXT_WINDOW);
    }
    function adjustContextWindowValue(deltaK) {
      const numericK = parseContextWindowInputK(contextWindowInput.value);
      const fallbackK = Number(formatContextWindowForInput(DEFAULT_CONTEXT_WINDOW));
      const baseK = Number.isFinite(numericK) && numericK > 0 ? Math.round(numericK) : fallbackK;
      const nextK = Math.max(Math.ceil(MIN_CONTEXT_WINDOW / 1000), baseK + deltaK);
      contextWindowInput.value = formatContextWindowForInput(normalizeContextWindow(nextK * 1000, DEFAULT_CONTEXT_WINDOW));
      contextWindowInput.style.width = getContextWindowInputWidth(contextWindowInput.value, contextWindowInput.placeholder);
      setEditorStatus("", "");
    }
    function getProfileDisplayName(profile, index) {
      const name = String(profile?.name || "").trim();
      if (name) {
        return name;
      }
      const model = String(profile?.defaultModel || "").trim();
      const format = getFormatLabel(profile?.format);
      if (format && model) {
        return `${format} · ${model}`;
      }
      if (model) {
        return model;
      }
      return `${strings.unnamedProfile} ${index + 1}`;
    }
    function getEndpointSummary(baseUrl) {
      const value = String(baseUrl || "").trim();
      if (!value) {
        return strings.notConfigured;
      }
      try {
        const parsed = new URL(value);
        return parsed.host || value;
      } catch {
        return value.length > 48 ? value.slice(0, 48) + "..." : value;
      }
    }
    function getActiveProfile() {
      return state.profiles.find(function (profile) {
        return profile.id === state.activeProfileId;
      }) || null;
    }
    function cleanupCardDropdowns() {
      for (const controller of state.cardDropdownControllers) {
        try {
          controller?.destroy?.();
        } catch {}
      }
      state.cardDropdownControllers = [];
    }
    async function handleInlineModelChange(profile, select, controller) {
      const nextModel = String(select?.value || "").trim();
      if (!nextModel || nextModel === String(profile?.defaultModel || "").trim()) {
        return;
      }
      try {
        setStatus(listStatus, "", "");
        select.disabled = true;
        controller?.refresh?.();
        const stored = await saveProviderProfile({
          ...profile,
          defaultModel: nextModel
        }, {
          profileId: profile.id,
          activateOnSave: false
        });
        applyStoredState(stored);
        renderProfileCards();
        setStatus(listStatus, "success", strings.inlineModelSaved);
      } catch (error) {
        select.disabled = false;
        controller?.refresh?.();
        setStatus(listStatus, "error", error && typeof error.message === "string" ? error.message : strings.saveFailure);
      }
    }
    async function ensureCardModelsLoaded(profile, select, controller) {
      const next = normalizeConfig(profile, false);
      try {
        const fetchedModels = mergeModelOptions(await fetchProviderModels(next), Array.isArray(profile?.fetchedModels) ? profile.fetchedModels : []);
        const persistedModels = await persistFetchedModelsForConfig(next, fetchedModels);
        profile.fetchedModels = persistedModels.slice();
        const liveProfile = state.profiles.find(function (entry) {
          return entry.id === profile?.id;
        });
        if (liveProfile) {
          liveProfile.fetchedModels = persistedModels.slice();
        }
        const stored = await saveProviderProfile({
          ...profile,
          fetchedModels: persistedModels
        }, {
          profileId: profile.id,
          activateOnSave: false
        });
        applyStoredState(stored);
        syncModelOptions(select, persistedModels, String(profile?.defaultModel || "").trim());
        controller?.refresh?.();
      } catch (error) {
        controller?.refresh?.();
        setStatus(listStatus, "error", error && typeof error.message === "string" ? error.message : strings.fetchFailure);
      }
    }
    async function handleInlineReasoningChange(profile, select, controller) {
      const nextReasoningEffort = normalizeReasoningEffort(select?.value);
      if (nextReasoningEffort === normalizeReasoningEffort(profile?.reasoningEffort)) {
        return;
      }
      try {
        setStatus(listStatus, "", "");
        select.disabled = true;
        controller?.refresh?.();
        const stored = await saveProviderProfile({
          ...profile,
          reasoningEffort: nextReasoningEffort
        }, {
          profileId: profile.id,
          activateOnSave: false
        });
        applyStoredState(stored);
        renderProfileCards();
        setStatus(listStatus, "success", strings.inlineReasoningSaved);
      } catch (error) {
        select.disabled = false;
        controller?.refresh?.();
        setStatus(listStatus, "error", error && typeof error.message === "string" ? error.message : strings.saveFailure);
      }
    }
    async function handleCardHealthCheck(profile, button) {
      const next = normalizeConfig(profile, false);
      try {
        setStatus(listStatus, "", "");
        if (button) {
          button.disabled = true;
          button.textContent = strings.healthChecking;
        }
        debugLog("customProvider.health.start", {
          profileId: profile?.id || null,
          model: next.defaultModel,
          format: next.format,
          baseUrl: next.baseUrl
        });
        const result = await probeProviderModel(next);
        const preview = truncateStatusText(result?.replyText || "");
        debugLog("customProvider.health.success", {
          profileId: profile?.id || null,
          model: next.defaultModel,
          format: result?.format || next.format,
          requestUrl: result?.requestUrl || "",
          replyPreview: preview
        });
        setStatus(listStatus, "success", strings.healthCheckSuccess.replace("{reply}", preview));
      } catch (error) {
        debugLog("customProvider.health.failure", {
          profileId: profile?.id || null,
          model: next.defaultModel,
          format: next.format,
          baseUrl: next.baseUrl,
          message: error && typeof error.message === "string" ? error.message : String(error || "")
        }, "error");
        setStatus(listStatus, "error", error && typeof error.message === "string" ? error.message : strings.healthCheckFailure);
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = strings.healthCheck;
        }
      }
    }
    function applyStoredState(stored) {
      state.profiles = Array.isArray(stored.profiles) ? stored.profiles.slice() : [];
      state.activeProfileId = stored.activeProfileId || null;
      state.originalApiKey = stored.originalApiKey;
      state.currentApiKey = stored.currentApiKey;
    }
    function updateEditorModeUi() {
      const isEditing = state.editorMode === "edit";
      listView.hidden = isEditing;
      editorView.hidden = !isEditing;
      editorFloatingShell.hidden = !isEditing;
      addProfileButton.hidden = isEditing;
      editorTitle.textContent = state.editingProfileId ? strings.editProfileTitle : strings.createProfileTitle;
    }
    function applyPromptProfilesStoredState(stored) {
      promptProfilesState.profiles = Array.isArray(stored?.profiles) ? stored.profiles.slice() : [];
      promptProfilesState.activeProfileId = stored?.activeProfileId || null;
    }
    function isBuiltinPromptProfileId(profileId) {
      return String(profileId || "") === BUILTIN_PROMPT_PROFILE_ID;
    }
    function createBuiltinPromptProfile() {
      return {
        id: BUILTIN_PROMPT_PROFILE_ID,
        name: strings.promptDefaultProfileName,
        prompt: DEFAULT_AGENT_ROLE_PROMPT,
        isBuiltin: true
      };
    }
    function getRenderablePromptProfiles() {
      return [createBuiltinPromptProfile()].concat(promptProfilesState.profiles.slice());
    }
    function getPromptProfileDisplayName(profile, index) {
      if (profile?.isBuiltin || isBuiltinPromptProfileId(profile?.id)) {
        return strings.promptDefaultProfileName;
      }
      const name = String(profile?.name || "").trim();
      if (name) {
        return name;
      }
      return `${strings.promptTitle} ${index + 1}`;
    }
    function getPromptPreview(prompt) {
      const normalized = String(prompt || "").trim().replace(/\s+/g, " ");
      if (!normalized) {
        return strings.notConfigured;
      }
      return normalized;
    }
    function updatePromptControls() {
      promptSaveButton.disabled = promptProfilesState.isSaving;
      addPromptProfileButton.disabled = promptProfilesState.isSaving;
    }
    function updatePromptEditorModeUi() {
      const isEditing = promptProfilesState.editorMode === "edit";
      promptListView.hidden = isEditing;
      promptEditorView.hidden = !isEditing;
      promptFloatingShell.hidden = !isEditing;
      addPromptProfileButton.hidden = isEditing;
      promptEditorTitle.textContent = promptProfilesState.editingProfileId ? strings.promptEditTitle : strings.promptCreateTitle;
    }
    function renderPromptProfileCards() {
      promptCardList.innerHTML = "";
      const profiles = getRenderablePromptProfiles();
      promptEmptyState.hidden = profiles.length > 0;
      profiles.forEach(function (profile, index) {
        const isBuiltin = !!profile?.isBuiltin || isBuiltinPromptProfileId(profile?.id);
        const isActive = isBuiltin ? !promptProfilesState.activeProfileId : profile.id === promptProfilesState.activeProfileId;
        const card = createNode("div", "cp-provider-card cp-page-card cp-page-panel bg-bg-100 border border-border-300 rounded-xl px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8");
        const cardHeader = createNode("div", "cp-provider-card-header");
        const titleWrap = createNode("div", "cp-provider-card-title-wrap");
        titleWrap.appendChild(createNode("h4", "cp-provider-card-title", getPromptProfileDisplayName(profile, index)));
        cardHeader.appendChild(titleWrap);
        if (isActive) {
          const badge = createNode("span", "cp-provider-badge", strings.currentBadge);
          badge.dataset.tone = "brand";
          cardHeader.appendChild(badge);
        }
        const summary = createNode("div", "cp-provider-summary");
        summary.dataset.layout = "single";
        [[strings.promptSummaryPreviewLabel, getPromptPreview(profile.prompt), false]].forEach(function (entry) {
          const item = createNode("div", "cp-provider-summary-item");
          item.appendChild(createNode("span", "cp-provider-summary-label", entry[0]));
          const value = createNode("span", "cp-provider-summary-value", entry[1]);
          value.dataset.truncate = "multiline";
          if (entry[2]) {
            value.dataset.mono = "true";
          }
          item.appendChild(value);
          summary.appendChild(item);
        });
        const actionRow = createNode("div", "cp-provider-card-actions");
        const activateButton = createNode("button", "px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", isActive ? strings.activeProfile : strings.activateProfile);
        activateButton.type = "button";
        activateButton.disabled = isActive;
        activateButton.addEventListener("click", function () {
          handleActivatePromptProfile(profile.id).catch(function () {});
        });
        actionRow.appendChild(activateButton);
        if (!isBuiltin) {
          const editButton = createNode("button", "px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.editProfile);
          editButton.type = "button";
          editButton.addEventListener("click", function () {
            openPromptEditor(profile.id);
          });
          const deleteButton = createNode("button", "px-6 py-3 bg-bg-100 text-danger-100 border border-border-300 rounded-xl hover:bg-bg-200 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.deleteProfile);
          deleteButton.type = "button";
          deleteButton.addEventListener("click", function () {
            handleDeletePromptProfile(profile.id).catch(function () {});
          });
          actionRow.appendChild(editButton);
          actionRow.appendChild(deleteButton);
        }
        card.appendChild(cardHeader);
        card.appendChild(summary);
        card.appendChild(actionRow);
        promptCardList.appendChild(card);
      });
    }
    function readPromptForm() {
      return {
        name: String(promptNameInput.value || "").trim(),
        prompt: String(promptTextarea.value || "").trim()
      };
    }
    function writePromptForm(profile) {
      const next = profile && typeof profile === "object" ? profile : {
        name: "",
        prompt: ""
      };
      promptNameInput.value = String(next.name || "");
      promptTextarea.value = String(next.prompt || "");
    }
    function openPromptList(kind, message) {
      promptProfilesState.editorMode = "list";
      promptProfilesState.editingProfileId = null;
      setStatus(promptStatus, "", "");
      renderPromptProfileCards();
      updatePromptEditorModeUi();
      setStatus(promptListStatus, kind || "", message || "");
      updatePromptControls();
    }
    function openPromptEditor(profileId) {
      if (isBuiltinPromptProfileId(profileId)) {
        return;
      }
      promptProfilesState.editorMode = "edit";
      promptProfilesState.editingProfileId = profileId || null;
      const profile = profileId ? promptProfilesState.profiles.find(function (entry) {
        return entry.id === profileId;
      }) : null;
      writePromptForm(profile || {
        name: "",
        prompt: DEFAULT_AGENT_ROLE_PROMPT
      });
      setStatus(promptListStatus, "", "");
      setStatus(promptStatus, "", "");
      updatePromptEditorModeUi();
      updatePromptControls();
    }
    async function refreshPromptProfiles(resetToList) {
      const stored = await readPromptProfilesState();
      applyPromptProfilesStoredState(stored);
      if (resetToList || promptProfilesState.editorMode === "list") {
        if (resetToList) {
          setStatus(promptListStatus, "", "");
        }
        openPromptList("", "");
        return;
      }
      if (promptProfilesState.editingProfileId) {
        const profile = promptProfilesState.profiles.find(function (entry) {
          return entry.id === promptProfilesState.editingProfileId;
        });
        if (profile) {
          writePromptForm(profile);
          updatePromptEditorModeUi();
        } else {
          openPromptList("", "");
        }
      } else {
        writePromptForm({
          name: "",
          prompt: DEFAULT_AGENT_ROLE_PROMPT
        });
        updatePromptEditorModeUi();
      }
      setStatus(promptStatus, "", "");
      updatePromptControls();
    }
    async function handleActivatePromptProfile(profileId) {
      try {
        setStatus(promptListStatus, "", "");
        const stored = await setActivePromptProfile(isBuiltinPromptProfileId(profileId) ? null : profileId);
        applyPromptProfilesStoredState(stored);
        openPromptList("success", strings.promptActivated);
      } catch (error) {
        setStatus(promptListStatus, "error", error && typeof error.message === "string" ? error.message : strings.promptSaveFailure);
      }
    }
    async function handleDeletePromptProfile(profileId) {
      if (isBuiltinPromptProfileId(profileId)) {
        return;
      }
      const profile = promptProfilesState.profiles.find(function (entry) {
        return entry.id === profileId;
      });
      const label = getPromptProfileDisplayName(profile, Math.max(0, promptProfilesState.profiles.findIndex(function (entry) {
        return entry.id === profileId;
      })));
      if (!window.confirm(strings.promptDeleteConfirm.replace("{name}", label))) {
        return;
      }
      try {
        setStatus(promptListStatus, "", "");
        const stored = await deletePromptProfile(profileId);
        applyPromptProfilesStoredState(stored);
        openPromptList("success", strings.promptDeleted);
      } catch (error) {
        setStatus(promptListStatus, "error", error && typeof error.message === "string" ? error.message : strings.promptSaveFailure);
      }
    }
    async function handlePromptSave() {
      const next = readPromptForm();
      if (!next.name) {
        setStatus(promptStatus, "error", strings.promptNameRequired);
        promptNameInput.focus();
        return;
      }
      if (!next.prompt) {
        setStatus(promptStatus, "error", strings.promptContentRequired);
        promptTextarea.focus();
        return;
      }
      try {
        promptProfilesState.isSaving = true;
        updatePromptControls();
        setStatus(promptStatus, "", "");
        const stored = await savePromptProfile(next, {
          profileId: promptProfilesState.editingProfileId || undefined
        });
        applyPromptProfilesStoredState(stored);
        openPromptList("success", strings.promptSaved);
      } catch (error) {
        setStatus(promptStatus, "error", error && typeof error.message === "string" ? error.message : strings.promptSaveFailure);
      } finally {
        promptProfilesState.isSaving = false;
        updatePromptControls();
      }
    }
    function renderProfileCards() {
      cleanupCardDropdowns();
      profileCardList.innerHTML = "";
      const profiles = state.profiles.slice();
      emptyState.hidden = profiles.length > 0;
      profiles.forEach(function (profile, index) {
        const isActive = profile.id === state.activeProfileId;
        const card = createNode("div", "cp-provider-card cp-page-card cp-page-panel bg-bg-100 border border-border-300 rounded-xl px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8");
        const cardHeader = createNode("div", "cp-provider-card-header");
        const titleWrap = createNode("div", "cp-provider-card-title-wrap");
        titleWrap.appendChild(createNode("h4", "cp-provider-card-title", getProfileDisplayName(profile, index)));
        titleWrap.appendChild(createNode("p", "cp-provider-card-subtitle", String(profile.baseUrl || "").trim() || strings.notConfigured));
        cardHeader.appendChild(titleWrap);
        if (isActive) {
          const badge = createNode("span", "cp-provider-badge", strings.currentBadge);
          badge.dataset.tone = "brand";
          cardHeader.appendChild(badge);
        }
        const summary = createNode("div", "cp-provider-summary");
        [[strings.formatSummaryLabel, getFormatLabel(profile.format), false, "format"], [strings.modelSummaryLabel, String(profile.defaultModel || "").trim() || strings.notConfigured, true, "model"], [strings.reasoningEffortLabel, normalizeReasoningEffort(profile.reasoningEffort), false, "reasoning"]].forEach(function (entry) {
          const item = createNode("div", "cp-provider-summary-item");
          item.dataset.field = entry[3];
          item.appendChild(createNode("span", "cp-provider-summary-label", entry[0]));
          if (entry[3] === "model") {
            const modelShell = createNode("div", "cp-provider-inline-control");
            const modelSelectInline = createNode("select", `cp-page-select ${SHARED_FRAME_CLASS}`);
            syncModelOptions(modelSelectInline, Array.isArray(profile.fetchedModels) ? profile.fetchedModels : [], String(profile.defaultModel || "").trim());
            modelShell.appendChild(modelSelectInline);
            item.appendChild(modelShell);
            const inlineDropdownController = enhanceSelect(modelSelectInline);
            modelSelectInline.__cpBeforeOpen = function () {
              return ensureCardModelsLoaded(profile, modelSelectInline, inlineDropdownController);
            };
            state.cardDropdownControllers.push(inlineDropdownController);
            modelSelectInline.addEventListener("change", function () {
              handleInlineModelChange(profile, modelSelectInline, inlineDropdownController).catch(function () {});
            });
          } else if (entry[3] === "reasoning") {
            const reasoningShell = createNode("div", "cp-provider-inline-control");
            const reasoningSelectInline = createNode("select", `cp-page-select ${SHARED_FRAME_CLASS}`);
            appendReasoningEffortOptions(reasoningSelectInline);
            reasoningSelectInline.value = normalizeReasoningEffort(profile.reasoningEffort);
            reasoningShell.appendChild(reasoningSelectInline);
            item.appendChild(reasoningShell);
            const inlineDropdownController = enhanceSelect(reasoningSelectInline);
            state.cardDropdownControllers.push(inlineDropdownController);
            reasoningSelectInline.addEventListener("change", function () {
              handleInlineReasoningChange(profile, reasoningSelectInline, inlineDropdownController).catch(function () {});
            });
          } else {
            const value = createNode("span", "cp-provider-summary-value", entry[1]);
            if (entry[2]) {
              value.dataset.mono = "true";
            }
            item.appendChild(value);
          }
          summary.appendChild(item);
        });
        const actionRow = createNode("div", "cp-provider-card-actions");
        const activateButton = createNode("button", "px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", isActive ? strings.activeProfile : strings.activateProfile);
        activateButton.type = "button";
        activateButton.disabled = isActive;
        activateButton.addEventListener("click", function () {
          handleActivateProfile(profile.id).catch(function () {});
        });
        const healthCheckCardButton = createNode("button", "px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.healthCheck);
        healthCheckCardButton.type = "button";
        healthCheckCardButton.addEventListener("click", function () {
          handleCardHealthCheck(profile, healthCheckCardButton).catch(function () {});
        });
        const editButton = createNode("button", "px-6 py-3 bg-bg-100 text-text-200 border border-border-300 rounded-xl hover:bg-bg-200 hover:text-text-100 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.editProfile);
        editButton.type = "button";
        editButton.addEventListener("click", function () {
          openEditor(profile.id);
        });
        const deleteButton = createNode("button", "px-6 py-3 bg-bg-100 text-danger-100 border border-border-300 rounded-xl hover:bg-bg-200 transition-all font-large disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", strings.deleteProfile);
        deleteButton.type = "button";
        deleteButton.addEventListener("click", function () {
          handleDeleteProfile(profile.id).catch(function () {});
        });
        actionRow.appendChild(activateButton);
        actionRow.appendChild(healthCheckCardButton);
        actionRow.appendChild(editButton);
        actionRow.appendChild(deleteButton);
        card.appendChild(cardHeader);
        card.appendChild(summary);
        card.appendChild(actionRow);
        profileCardList.appendChild(card);
      });
    }
    function openList(kind, message) {
      closeManualModelDialog();
      state.editorMode = "list";
      state.editingProfileId = null;
      setEditorStatus("", "");
      renderProfileCards();
      updateEditorModeUi();
      if (kind || message) {
        setStatus(listStatus, kind || "", message || "");
      }
    }
    function openEditor(profileId) {
      cleanupCardDropdowns();
      closeManualModelDialog();
      state.editorMode = "edit";
      state.editingProfileId = profileId || null;
      const profile = profileId ? state.profiles.find(function (entry) {
        return entry.id === profileId;
      }) : null;
      writeForm(profile || createEmptyConfig());
      setApiKeyVisibility(false);
      setFetchState(false);
      setHealthCheckState(false);
      setStatus(listStatus, "", "");
      setEditorStatus("", "");
      updateEditorModeUi();
      hydrateCachedModelsForConfig(profile || createEmptyConfig(), String((profile || createEmptyConfig()).defaultModel || "").trim()).catch(function () {});
    }
    function openManualModelDialog() {
      closeActiveDropdown();
      isManualModelDialogOpen = true;
      manualModelOverlay.hidden = false;
      manualModelInput.value = modelSelect.value || "";
      setStatus(manualModelStatus, "", "");
      requestAnimationFrame(function () {
        manualModelInput.focus();
        manualModelInput.select();
      });
    }
    function closeManualModelDialog() {
      isManualModelDialogOpen = false;
      manualModelOverlay.hidden = true;
      setStatus(manualModelStatus, "", "");
    }
    function applyManualModel() {
      const modelId = String(manualModelInput.value || "").trim();
      if (!modelId) {
        setStatus(manualModelStatus, "error", strings.manualModelIdRequired);
        manualModelInput.focus();
        return;
      }
      const alreadyExists = state.availableModels.some(function (item) {
        return item.value === modelId;
      });
      state.availableModels = mergeModelOptions(state.availableModels, [{
        value: modelId,
        label: modelId,
        manual: true
      }]);
      renderModelOptions(modelId);
      closeManualModelDialog();
      setEditorStatus("success", alreadyExists ? strings.manualModelSelected : strings.manualModelAdded, alreadyExists ? strings.manualModelSelected : strings.manualModelAdded);
    }
    function removeManualModel(modelId) {
      const nextSelectedValue = modelSelect.value === modelId ? "" : modelSelect.value;
      state.availableModels = state.availableModels.filter(function (item) {
        return !(item.value === modelId && item.manual);
      });
      renderModelOptions(nextSelectedValue);
      setEditorStatus("success", strings.manualModelRemoved, strings.manualModelRemoved);
    }
    function setFetchState(isFetching) {
      state.isFetchingModels = isFetching;
      fetchModelsButton.disabled = isFetching;
      fetchModelsButton.textContent = isFetching ? strings.fetchingModels : strings.fetchModels;
    }
    function setHealthCheckState(isChecking) {
      state.isCheckingHealth = isChecking;
      healthCheckButton.disabled = isChecking;
      healthCheckButton.textContent = isChecking ? strings.healthChecking : strings.healthCheck;
    }
    function updateModelMeta(message, tone) {
      modelMeta.textContent = message || strings.fetchedModelsHint;
      modelMeta.dataset.tone = tone || "";
    }
    function restoreModelMeta() {
      updateModelMeta(state.availableModels.length ? strings.fetchedModelsReady : strings.fetchedModelsHint, state.availableModels.length ? "ready" : "");
    }
    function setEditorStatus(kind, message, fallback) {
      if (!kind) {
        restoreModelMeta();
        return;
      }
      updateModelMeta(compactStatusMessage(message, fallback || ""), kind === "success" ? "ready" : kind === "error" ? "error" : kind === "loading" ? "loading" : "");
    }
    function renderModelOptions(selectedValue) {
      syncModelOptions(modelSelect, state.availableModels, selectedValue);
      modelDropdown.refresh();
      restoreModelMeta();
    }
    function clearModels() {
      const currentModel = modelSelect.value;
      state.availableModels = [];
      renderModelOptions(currentModel);
    }
    function updateRequestPreview() {
      const previewUrl = buildRequestUrl(baseUrlInput.value, formatSelect.value) || "/messages";
      requestPreview.textContent = strings.requestUrlPrefix + previewUrl;
      requestPreview.dataset.empty = baseUrlInput.value.trim() ? "false" : "true";
    }
    function readForm() {
      const next = normalizeConfig({
        enabled: true,
        name: nameInput.value,
        format: formatSelect.value,
        baseUrl: baseUrlInput.value,
        apiKey: apiKeyInput.value,
        defaultModel: modelSelect.value,
        reasoningEffort: reasoningSelect.value,
        contextWindow: readContextWindowValue(),
        notes: "",
        fetchedModels: state.availableModels
      }, false);
      next.fetchedModels = Array.isArray(state.availableModels) ? state.availableModels.slice() : [];
      return next;
    }
    function writeForm(config) {
      const next = normalizeConfig(config, false);
      nameInput.value = next.name || "";
      formatSelect.value = next.format || DEFAULT_FORMAT;
      baseUrlInput.value = next.baseUrl || "";
      apiKeyInput.value = next.apiKey || "";
      formatDropdown.refresh();
      syncReasoningEditorControls(next.reasoningEffort || "medium", next.contextWindow);
      state.availableModels = Array.isArray(next.fetchedModels) ? next.fetchedModels.slice() : [];
      renderModelOptions(next.defaultModel || "");
      updateRequestPreview();
    }
    async function refresh(resetToList) {
      const stored = await getState();
      applyStoredState(stored);
      setFetchState(false);
      setHealthCheckState(false);
      if (resetToList || state.editorMode === "list") {
        if (resetToList) {
          setStatus(listStatus, "", "");
        }
        openList("", "");
        return;
      }
      if (state.editingProfileId) {
        const profile = state.profiles.find(function (entry) {
          return entry.id === state.editingProfileId;
        });
        if (profile) {
          writeForm(profile);
          await hydrateCachedModelsForConfig(profile, String(profile.defaultModel || "").trim());
          updateEditorModeUi();
        } else {
          openList("", "");
        }
      } else {
        writeForm(createEmptyConfig());
        await hydrateCachedModelsForConfig(createEmptyConfig(), "");
        updateEditorModeUi();
      }
      setEditorStatus("", "");
    }
    async function handleActivateProfile(profileId) {
      try {
        setStatus(listStatus, "", "");
        const stored = await setActiveProviderProfile(profileId);
        applyStoredState(stored);
        openList("success", strings.profileActivated);
      } catch (error) {
        setStatus(listStatus, "error", error && typeof error.message === "string" ? error.message : strings.saveFailure);
      }
    }
    async function handleDeleteProfile(profileId) {
      const profile = state.profiles.find(function (entry) {
        return entry.id === profileId;
      });
      const label = getProfileDisplayName(profile, Math.max(0, state.profiles.findIndex(function (entry) {
        return entry.id === profileId;
      })));
      if (!window.confirm(strings.deleteProfileConfirm.replace("{name}", label))) {
        return;
      }
      try {
        setStatus(listStatus, "", "");
        const stored = await deleteProviderProfile(profileId);
        applyStoredState(stored);
        openList("success", strings.profileDeleted);
      } catch (error) {
        setStatus(listStatus, "error", error && typeof error.message === "string" ? error.message : strings.saveFailure);
      }
    }
    function renderDebugMeta() {
      const count = debugState.logs.length;
      if (!count) {
        debugLogsMeta.textContent = strings.debugLogsEmpty;
        debugLogsMeta.dataset.tone = "";
      } else {
        let message = strings.debugLogsCount.replace("{count}", String(count));
        if (debugState.meta && debugState.meta.lastFlushAt) {
          message += " " + strings.debugLogsUpdatedPrefix + " " + formatTimestamp(debugState.meta.lastFlushAt);
        }
        debugLogsMeta.textContent = message;
        debugLogsMeta.dataset.tone = "ready";
      }
      copyLogsButton.disabled = !count;
      downloadLogsButton.disabled = !count;
    }
    async function refreshDebug() {
      const stored = await getDebugState();
      debugState.logs = stored.logs;
      debugState.meta = stored.meta;
      renderDebugMeta();
    }
    async function handleFetchModels() {
      const next = readForm();
      try {
        setFetchState(true);
        setEditorStatus("", "");
        updateModelMeta(strings.fetchedModelsLoading, "loading");
        const fetchedModels = mergeModelOptions(await fetchProviderModels(next), state.availableModels);
        state.availableModels = await persistFetchedModelsForEditor(next, fetchedModels);
        renderModelOptions(next.defaultModel || "");
        setEditorStatus("", "");
      } catch (error) {
        renderModelOptions(next.defaultModel || modelSelect.value || "");
        restoreModelMeta();
        setEditorStatus("error", error && typeof error.message === "string" ? error.message : "", strings.fetchFailure);
      } finally {
        setFetchState(false);
      }
    }
    async function handleHealthCheck() {
      const next = readForm();
      try {
        setHealthCheckState(true);
        setEditorStatus("", "");
        updateModelMeta(strings.healthChecking, "loading");
        debugLog("customProvider.health.start", {
          model: next.defaultModel,
          format: next.format,
          baseUrl: next.baseUrl
        });
        const result = await probeProviderModel(next);
        const preview = truncateStatusText(result?.replyText || "");
        debugLog("customProvider.health.success", {
          model: next.defaultModel,
          format: result?.format || next.format,
          requestUrl: result?.requestUrl || "",
          replyPreview: preview
        });
        restoreModelMeta();
        setEditorStatus("success", strings.healthCheckSuccess.replace("{reply}", preview), strings.healthCheckSuccess);
      } catch (error) {
        debugLog("customProvider.health.failure", {
          model: next.defaultModel,
          format: next.format,
          baseUrl: next.baseUrl,
          message: error && typeof error.message === "string" ? error.message : String(error || "")
        }, "error");
        restoreModelMeta();
        setEditorStatus("error", error && typeof error.message === "string" ? error.message : "", strings.healthCheckFailure);
      } finally {
        setHealthCheckState(false);
      }
    }
    addProfileButton.addEventListener("click", function () {
      openEditor(null);
    });
    backToListButton.addEventListener("click", function () {
      openList("", "");
    });
    addPromptProfileButton.addEventListener("click", function () {
      openPromptEditor(null);
    });
    promptBackButton.addEventListener("click", function () {
      openPromptList("", "");
    });
    promptNameInput.addEventListener("input", function () {
      setStatus(promptStatus, "", "");
    });
    promptTextarea.addEventListener("input", function () {
      setStatus(promptStatus, "", "");
    });
    promptForm.addEventListener("submit", function (event) {
      event.preventDefault();
      handlePromptSave().catch(function () {});
    });
    writePromptForm({
      name: "",
      prompt: DEFAULT_AGENT_ROLE_PROMPT
    });
    updatePromptEditorModeUi();
    updatePromptControls();
    healthCheckButton.addEventListener("click", function () {
      handleHealthCheck().catch(function () {});
    });
    copyLogsButton.addEventListener("click", async function () {
      try {
        await refreshDebug();
        if (!debugState.logs.length) {
          setStatus(debugStatus, "error", strings.debugLogsEmpty);
          return;
        }
        await navigator.clipboard.writeText(buildDebugExport(debugState.logs, debugState.meta));
        setStatus(debugStatus, "success", strings.copyLogsSuccess);
      } catch (error) {
        setStatus(debugStatus, "error", error && typeof error.message === "string" ? error.message : strings.copyLogsFailure);
      }
    });
    downloadLogsButton.addEventListener("click", async function () {
      try {
        await refreshDebug();
        if (!debugState.logs.length) {
          setStatus(debugStatus, "error", strings.debugLogsEmpty);
          return;
        }
        const blob = new Blob([buildDebugExport(debugState.logs, debugState.meta)], {
          type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "claude-sidepanel-logs-" + new Date().toISOString().replace(/[:.]/g, "-") + ".json";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 0);
        setStatus(debugStatus, "success", strings.downloadLogsSuccess);
      } catch (error) {
        setStatus(debugStatus, "error", error && typeof error.message === "string" ? error.message : strings.downloadLogsFailure);
      }
    });
    fetchModelsButton.addEventListener("click", function () {
      handleFetchModels().catch(function () {});
    });
    addModelButton.addEventListener("click", function () {
      openManualModelDialog();
    });
    manualModelCancelButton.addEventListener("click", function () {
      closeManualModelDialog();
    });
    manualModelConfirmButton.addEventListener("click", function () {
      applyManualModel();
    });
    manualModelInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        applyManualModel();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeManualModelDialog();
      }
    });
    manualModelOverlay.addEventListener("click", function (event) {
      if (event.target === manualModelOverlay) {
        closeManualModelDialog();
      }
    });
    const handleWindowKeydown = function (event) {
      if (event.key === "Escape" && isManualModelDialogOpen) {
        closeManualModelDialog();
      }
    };
    window.addEventListener("keydown", handleWindowKeydown);
    modelSelect.addEventListener("change", function () {
      setEditorStatus("", "");
    });
    reasoningSelect.addEventListener("change", function () {
      setEditorStatus("", "");
    });
    contextWindowInput.addEventListener("input", function () {
      contextWindowInput.style.width = getContextWindowInputWidth(contextWindowInput.value, contextWindowInput.placeholder);
      setEditorStatus("", "");
    });
    contextWindowInput.addEventListener("change", function () {
      contextWindowInput.value = formatContextWindowForInput(readContextWindowValue());
      contextWindowInput.style.width = getContextWindowInputWidth(contextWindowInput.value, contextWindowInput.placeholder);
      setEditorStatus("", "");
    });
    contextWindowInput.addEventListener("keydown", function (event) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        adjustContextWindowValue(CONTEXT_WINDOW_STEP_K);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        adjustContextWindowValue(-CONTEXT_WINDOW_STEP_K);
      }
    });
    contextWindowStepUp.addEventListener("click", function () {
      adjustContextWindowValue(CONTEXT_WINDOW_STEP_K);
      contextWindowInput.focus({
        preventScroll: true
      });
    });
    contextWindowStepDown.addEventListener("click", function () {
      adjustContextWindowValue(-CONTEXT_WINDOW_STEP_K);
      contextWindowInput.focus({
        preventScroll: true
      });
    });
    [formatSelect, baseUrlInput, apiKeyInput].forEach(function (node) {
      node.addEventListener("change", clearModels);
      node.addEventListener("input", function () {
        if (state.availableModels.length) {
          clearModels();
        }
        hydrateCachedModelsForConfig(readForm(), modelSelect.value || "").catch(function () {});
      });
      node.addEventListener("change", function () {
        hydrateCachedModelsForConfig(readForm(), modelSelect.value || "").catch(function () {});
      });
    });
    [formatSelect, baseUrlInput].forEach(function (node) {
      node.addEventListener("change", updateRequestPreview);
      node.addEventListener("input", updateRequestPreview);
    });
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const next = readForm();
      if (!next.baseUrl) {
        setEditorStatus("error", strings.baseUrlRequired, strings.baseUrlRequired);
        baseUrlInput.focus();
        return;
      }
      if (!next.apiKey) {
        setEditorStatus("error", strings.apiKeyRequired, strings.apiKeyRequired);
        apiKeyInput.focus();
        return;
      }
      if (!next.defaultModel) {
        setEditorStatus("error", strings.defaultModelRequired, strings.defaultModelRequired);
        modelSelect.focus();
        return;
      }
      try {
        saveButton.disabled = true;
        const stored = await saveConfig(next, state);
        applyStoredState(stored);
        openList("success", strings.saveSuccessEnabled);
      } catch (error) {
        setEditorStatus("error", error && typeof error.message === "string" ? error.message : "", strings.saveFailure);
      } finally {
        saveButton.disabled = false;
      }
    });
    let lastHost = null;
    let syncScheduled = false;
    let syncInFlight = false;
    let syncPending = false;
    let observer = null;
    const handleStorageChange = function (changes, areaName) {
      if (areaName !== "local") {
        return;
      }
      if (DEBUG_LOGS_KEY in changes || DEBUG_META_KEY in changes) {
        refreshDebug().catch(function () {});
      }
      if (PROMPT_PROFILES_STORAGE_KEY in changes || PROMPT_ACTIVE_PROFILE_STORAGE_KEY in changes || SYSTEM_PROMPT_STORAGE_KEY in changes) {
        if (isPromptViewActive()) {
          refreshPromptProfiles(false).catch(function () {});
        }
      }
      if (STORAGE_KEY in changes || PROFILES_STORAGE_KEY in changes || ACTIVE_PROFILE_STORAGE_KEY in changes || BACKUP_KEY in changes || "anthropicApiKey" in changes) {
        if (isProviderViewActive()) {
          refresh(false).catch(function () {});
        }
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    function updateOptionsContentVisibility(host, customViewActive) {
      if (!host) {
        return;
      }
      host.classList.toggle("cp-options-host-provider-active", customViewActive);
    }
    async function syncMount() {
      const nextLocaleKey = getUiLocaleKey();
      if (nextLocaleKey !== localeKey) {
        debugLog("customProvider.locale.changed", {
          from: localeKey,
          to: nextLocaleKey,
          hash: location.hash
        });
        scheduleUiRebuild();
        return;
      }
      ensureProviderNavItem(strings);
      const providerActive = isProviderViewActive();
      const promptActive = isPromptViewActive();
      const customViewActive = providerActive || promptActive;
      if (!isOptionsTabActive()) {
        closeManualModelDialog();
        debugLog("customProvider.syncMount.skip", {
          reason: "not-options-tab",
          hash: location.hash
        });
        if (lastHost) {
          updateOptionsContentVisibility(lastHost, false);
        }
        if (providerRoot.parentNode) {
          providerRoot.remove();
        }
        if (promptRoot.parentNode) {
          promptRoot.remove();
        }
        if (debugMountRoot.parentNode) {
          debugMountRoot.remove();
        }
        lastHost = null;
        return;
      }
      const host = findOptionsContentRoot();
      if (!host) {
        closeManualModelDialog();
        if (lastHost) {
          updateOptionsContentVisibility(lastHost, false);
        }
        if (providerRoot.parentNode) {
          providerRoot.remove();
        }
        if (promptRoot.parentNode) {
          promptRoot.remove();
        }
        if (debugMountRoot.parentNode) {
          debugMountRoot.remove();
        }
        lastHost = null;
        return;
      }
      if (lastHost && lastHost !== host) {
        updateOptionsContentVisibility(lastHost, false);
      }
      const providerNeedsRefresh = providerRoot.parentNode !== host || lastHost !== host;
      const promptNeedsRefresh = promptRoot.parentNode !== host || lastHost !== host;
      const debugNeedsRefresh = debugMountRoot.parentNode !== host || lastHost !== host;
      debugLog("customProvider.syncMount.host", {
        providerActive,
        promptActive,
        providerNeedsRefresh,
        promptNeedsRefresh,
        debugNeedsRefresh,
        hostTag: host.tagName,
        hostClassName: host.className || "",
        hostChildCount: host.children.length
      });
      updateOptionsContentVisibility(host, customViewActive);
      if (providerActive) {
        if (promptRoot.parentNode) {
          promptRoot.remove();
        }
        if (debugMountRoot.parentNode) {
          debugMountRoot.remove();
        }
        if (providerRoot.parentNode !== host) {
          host.appendChild(providerRoot);
        }
      } else if (promptActive) {
        closeManualModelDialog();
        if (providerRoot.parentNode) {
          providerRoot.remove();
        }
        if (debugMountRoot.parentNode) {
          debugMountRoot.remove();
        }
        if (promptRoot.parentNode !== host) {
          host.appendChild(promptRoot);
        }
      } else {
        closeManualModelDialog();
        if (providerRoot.parentNode) {
          providerRoot.remove();
        }
        if (promptRoot.parentNode) {
          promptRoot.remove();
        }
        if (debugMountRoot.parentNode !== host) {
          host.appendChild(debugMountRoot);
        }
      }
      lastHost = host;
      if (providerActive && providerNeedsRefresh) {
        await refresh(true);
        debugLog("customProvider.syncMount.refreshed", {
          providerActive
        });
      } else if (promptActive && promptNeedsRefresh) {
        await refreshPromptProfiles(true);
        debugLog("customProvider.syncMount.refreshed", {
          providerActive,
          promptActive
        });
      } else if (!customViewActive && debugNeedsRefresh) {
        await refreshDebug();
        debugLog("customProvider.syncMount.refreshed", {
          providerActive,
          promptActive
        });
      }
    }
    function resumeObserver() {
      if (!observer) {
        return;
      }
      observer.disconnect();
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    function runSyncMount(reason) {
      if (syncInFlight) {
        syncPending = true;
        return;
      }
      syncScheduled = false;
      syncInFlight = true;
      if (observer) {
        observer.disconnect();
      }
      debugLog("customProvider.syncMount.run", {
        reason,
        hash: location.hash
      });
      syncMount().catch(function (error) {
        debugLog("customProvider.syncMount.error", {
          reason,
          error
        }, "error");
      }).finally(function () {
        syncInFlight = false;
        resumeObserver();
        if (syncPending) {
          syncPending = false;
          queueSyncMount("pending");
        }
      });
    }
    function queueSyncMount(reason) {
      if (syncInFlight) {
        syncPending = true;
        return;
      }
      if (syncScheduled) {
        return;
      }
      syncScheduled = true;
      const scheduler = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function (callback) {
        return setTimeout(callback, 16);
      };
      scheduler(function () {
        runSyncMount(reason);
      });
    }
    observer = new MutationObserver(function () {
      queueSyncMount("mutation");
    });
    resumeObserver();
    const handleHashChange = function () {
      queueSyncMount("hashchange");
    };
    window.addEventListener("hashchange", handleHashChange);
    activeUiCleanup = function () {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      chrome.storage.onChanged.removeListener(handleStorageChange);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("keydown", handleWindowKeydown);
      cleanupCardDropdowns();
      closeManualModelDialog();
      closeActiveDropdown();
      if (lastHost) {
        updateOptionsContentVisibility(lastHost, false);
      }
      if (providerRoot.parentNode) {
        providerRoot.remove();
      }
      if (promptRoot.parentNode) {
        promptRoot.remove();
      }
      if (debugMountRoot.parentNode) {
        debugMountRoot.remove();
      }
      const navItem = document.getElementById(NAV_ITEM_ID);
      if (navItem) {
        navItem.remove();
      }
      const promptNavItem = document.getElementById(PROMPT_NAV_ITEM_ID);
      if (promptNavItem) {
        promptNavItem.remove();
      }
      lastHost = null;
    };
    queueSyncMount("initial");
    debugLog("customProvider.buildUi.done", {
      hash: location.hash
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildUi, {
      once: true
    });
  } else {
    buildUi();
  }
})();
