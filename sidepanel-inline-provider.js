(function () {
  const STORAGE_KEY = "customProviderConfig";
  const BACKUP_KEY = "customProviderOriginalApiKey";
  const ROOT_ID = "cp-inline-provider-root";
  const helpers = globalThis.CustomProviderModels || {};
  const PROFILES_STORAGE_KEY = helpers.PROFILES_STORAGE_KEY || "customProviderProfiles";
  const ACTIVE_PROFILE_STORAGE_KEY = helpers.ACTIVE_PROFILE_STORAGE_KEY || "customProviderActiveProfileId";
  const DEFAULT_FORMAT = helpers.DEFAULT_FORMAT || "anthropic";
  const DEFAULT_CONTEXT_WINDOW = helpers.DEFAULT_CONTEXT_WINDOW || 200000;
  const MIN_CONTEXT_WINDOW = 20000;
  const readProviderStoreState = helpers.readProviderStoreState || async function () {
    const stored = await chrome.storage.local.get([STORAGE_KEY, BACKUP_KEY, "anthropicApiKey"]);
    return {
      profiles: [],
      activeProfileId: null,
      activeProfile: null,
      config: stored[STORAGE_KEY] || {
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
      },
      originalApiKey: Object.prototype.hasOwnProperty.call(stored, BACKUP_KEY) ? stored[BACKUP_KEY] : undefined,
      currentApiKey: stored.anthropicApiKey || ""
    };
  };
  const saveProviderProfile = helpers.saveProviderProfile || async function (next) {
    await chrome.storage.local.set({
      [STORAGE_KEY]: next
    });
    return {
      profiles: [],
      activeProfileId: null,
      activeProfile: next,
      config: next,
      originalApiKey: undefined,
      currentApiKey: ""
    };
  };
  const readCachedFetchedModels = helpers.readCachedFetchedModels || async function () {
    return [];
  };
  const persistFetchedModelsForConfig = helpers.persistFetchedModelsForConfig || async function (config, models) {
    return Array.isArray(models) ? models.slice() : [];
  };
  const normalizeReasoningEffort = helpers.normalizeReasoningEffort || function (value) {
    const effort = String(value || "").trim().toLowerCase();
    return ["none", "low", "medium", "high", "max"].includes(effort) ? effort : "medium";
  };
  const normalizeContextWindow = helpers.normalizeContextWindow || function (value) {
    const numeric = Number(String(value ?? "").trim());
    if (!Number.isFinite(numeric) || numeric <= 0) {
      return DEFAULT_CONTEXT_WINDOW;
    }
    return Math.max(MIN_CONTEXT_WINDOW, Math.round(numeric));
  };
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
      if (/\/chat\/completions$/i.test(normalizedBaseUrl)) {
        return normalizedBaseUrl;
      } else {
        return normalizedBaseUrl + "/chat/completions";
      }
    }
    if (normalizedFormat === "openai_responses" || normalizedFormat === "responses") {
      if (/\/responses$/i.test(normalizedBaseUrl)) {
        return normalizedBaseUrl;
      } else {
        return normalizedBaseUrl + "/responses";
      }
    }
    if (/\/messages$/i.test(normalizedBaseUrl)) {
      return normalizedBaseUrl;
    } else {
      return normalizedBaseUrl + "/messages";
    }
  };
  const fetchProviderModels = helpers.fetchProviderModels || async function () {
    throw new Error("模型拉取工具未加载。");
  };
  const syncModelOptions = helpers.syncModelOptions || function (select, models, selectedValue) {
    if (!select) {
      return;
    }
    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = models.length ? "选择一个已获取的模型" : "点击“获取模型”后可直接选择";
    select.appendChild(placeholder);
    for (const model of models || []) {
      const option = document.createElement("option");
      option.value = model.value;
      option.textContent = model.label || model.value;
      select.appendChild(option);
    }
    select.disabled = !models.length;
    select.value = selectedValue || "";
  };
  let overlay = null;
  let formRefs = null;
  let isOverlayVisible = false;
  let state = {
    enabled: true,
    activeProfileId: null,
    originalApiKey: undefined,
    currentApiKey: "",
    availableModels: [],
    isFetchingModels: false,
    hasLoadedConfig: false,
    savedConfig: null
  };
  function getProviderFetchIdentity(config) {
    const next = normalizeConfig(config, true);
    return [next.format || DEFAULT_FORMAT, String(next.baseUrl || "").trim(), String(next.apiKey || "").trim()].join("::");
  }
  function hasUsableConfig(config) {
    return !!(config?.baseUrl && config?.apiKey && config?.defaultModel);
  }
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
  async function getState() {
    const stored = await readProviderStoreState();
    return {
      config: stored.activeProfile || stored.config || {
        enabled: true,
        name: "",
        format: DEFAULT_FORMAT,
        baseUrl: "",
        apiKey: "",
        defaultModel: "",
        reasoningEffort: "medium",
        contextWindow: DEFAULT_CONTEXT_WINDOW,
        notes: ""
      },
      activeProfileId: stored.activeProfileId || null,
      originalApiKey: stored.originalApiKey,
      currentApiKey: stored.currentApiKey
    };
  }
  async function saveConfig(next) {
    const nextState = await saveProviderProfile(next, {
      profileId: state.activeProfileId || undefined
    });
    state.activeProfileId = nextState.activeProfileId || state.activeProfileId;
    state.originalApiKey = nextState.originalApiKey;
    state.currentApiKey = nextState.currentApiKey;
  }
  async function refreshStoredState() {
    const stored = await getState();
    state.activeProfileId = stored.activeProfileId;
    state.originalApiKey = stored.originalApiKey;
    state.currentApiKey = stored.currentApiKey;
    const next = normalizeConfig(stored.config, true);
    const cachedModels = Array.isArray(next.fetchedModels) && next.fetchedModels.length ? next.fetchedModels.slice() : await readCachedFetchedModels(next);
    state.availableModels = Array.isArray(cachedModels) ? cachedModels.slice() : [];
    state.savedConfig = {
      ...next,
      fetchedModels: state.availableModels.slice()
    };
    state.hasLoadedConfig = true;
    return state.savedConfig;
  }
  function setStatus(kind, message) {
    if (!formRefs) {
      return;
    }
    formRefs.status.dataset.kind = kind || "";
    formRefs.status.textContent = message || "";
  }
  function setFetchState(isFetching) {
    state.isFetchingModels = isFetching;
    if (!formRefs) {
      return;
    }
    formRefs.fetchModelsButton.disabled = isFetching;
    formRefs.fetchModelsButton.textContent = isFetching ? "正在获取..." : "获取模型";
  }
  function updateModelMeta(message, tone) {
    if (!formRefs) {
      return;
    }
    formRefs.modelMeta.textContent = message || "支持接口返回后直接选择模型。";
    formRefs.modelMeta.dataset.tone = tone || "";
    formRefs.modelCount.textContent = state.availableModels.length ? `已加载 ${state.availableModels.length} 个模型` : "未获取";
  }
  function readForm() {
    if (!formRefs) {
      return normalizeConfig({}, true);
    }
    const next = normalizeConfig({
      enabled: true,
      name: formRefs.nameInput.value,
      format: formRefs.formatSelect.value,
      baseUrl: formRefs.baseUrlInput.value,
      apiKey: formRefs.apiKeyInput.value,
      defaultModel: formRefs.modelInput.value,
      reasoningEffort: state.savedConfig?.reasoningEffort || "medium",
      contextWindow: state.savedConfig?.contextWindow || DEFAULT_CONTEXT_WINDOW,
      notes: ""
    }, true);
    next.fetchedModels = Array.isArray(state.availableModels) ? state.availableModels.slice() : [];
    return next;
  }
  function renderModelOptions(selectedValue) {
    if (!formRefs) {
      return;
    }
    syncModelOptions(formRefs.modelSelect, state.availableModels, selectedValue);
    updateModelMeta(state.availableModels.length ? "已从接口返回中整理模型列表，你可以直接选择。" : "支持接口返回后直接选择模型。", state.availableModels.length ? "ready" : "");
  }
  function clearModels() {
    state.availableModels = [];
    renderModelOptions("");
  }
  function resolvePreviewUrl(baseUrl, format) {
    const requestUrl = buildRequestUrl(baseUrl, format);
    if (requestUrl) {
      return requestUrl;
    }
    const normalizedFormat = String(format || DEFAULT_FORMAT).trim().toLowerCase();
    if (normalizedFormat === "openai_chat" || normalizedFormat === "openai") {
      return "/chat/completions";
    }
    if (normalizedFormat === "openai_responses" || normalizedFormat === "responses") {
      return "/responses";
    }
    return "/messages";
  }
  function updateRequestPreview() {
    if (!formRefs) {
      return;
    }
    const previewUrl = resolvePreviewUrl(formRefs.baseUrlInput.value, formRefs.formatSelect.value);
    formRefs.requestPreviewValue.textContent = `预览： ${previewUrl}`;
    formRefs.requestPreviewValue.dataset.empty = formRefs.baseUrlInput.value.trim() ? "false" : "true";
  }
  function writeForm(config) {
    if (!formRefs) {
      return;
    }
    const next = normalizeConfig(config, true);
    state.enabled = true;
    formRefs.nameInput.value = next.name || "";
    formRefs.formatSelect.value = next.format || DEFAULT_FORMAT;
    formRefs.baseUrlInput.value = next.baseUrl || "";
    formRefs.apiKeyInput.value = next.apiKey || "";
    formRefs.modelInput.value = next.defaultModel || "";
    renderModelOptions(next.defaultModel || "");
    updateRequestPreview();
  }
  async function refreshForm() {
    if (!formRefs) {
      return;
    }
    const next = await refreshStoredState();
    if (!next.baseUrl && !next.apiKey && !next.defaultModel && !next.name) {
      next.enabled = true;
    }
    writeForm(next);
    formRefs.saveButton.disabled = false;
    formRefs.reloadButton.disabled = false;
    setFetchState(false);
    setStatus("", "");
  }
  async function handleFetchModels() {
    const next = readForm();
    try {
      setFetchState(true);
      setStatus("", "");
      updateModelMeta("正在向供应商请求模型列表...", "loading");
      const models = await fetchProviderModels(next);
      state.availableModels = await persistFetchedModelsForConfig(next, models);
      if (state.savedConfig && getProviderFetchIdentity(state.savedConfig) === getProviderFetchIdentity(next)) {
        const persistedConfig = {
          ...state.savedConfig,
          fetchedModels: state.availableModels.slice()
        };
        await saveConfig(persistedConfig);
        state.savedConfig = persistedConfig;
      }
      renderModelOptions(next.defaultModel || "");
      setStatus("success", "模型列表已获取，你可以直接选择后保存。");
    } catch (error) {
      const message = error && typeof error.message === "string" ? error.message : "获取模型失败，请稍后再试。";
      state.availableModels = [];
      renderModelOptions("");
      setStatus("error", message);
      updateModelMeta("模型列表获取失败，请检查地址、Key 和格式。", "error");
    } finally {
      setFetchState(false);
    }
  }
  function hasText(selector, matcher) {
    const nodes = document.querySelectorAll(selector);
    for (const node of nodes) {
      const text = (node.textContent || "").trim();
      if (!text) {
        continue;
      }
      if (typeof matcher === "string" ? text.includes(matcher) : matcher(text)) {
        return true;
      }
    }
    return false;
  }
  function shouldShowInlineProvider() {
    return hasText("h1, h2, h3, p, div, span", "配置你的模型供应商") || hasText("h1, h2, h3, p, div, span", "当前资格校验仍然在触发登录提示") || hasText("button", function (text) {
      return text === "Log in";
    }) && hasText("p, div, span", "Claude in Chrome is available to") && hasText("p, div, span", "all paid plan subscribers");
  }
  function setOverlayOpen(isOpen) {
    if (!overlay) {
      return;
    }
    overlay.dataset.open = isOpen ? "true" : "false";
  }
  function buildOverlay() {
    if (overlay) {
      return overlay;
    }
    overlay = createNode("div", "cp-inline-overlay");
    overlay.id = ROOT_ID;
    overlay.dataset.open = "false";
    const card = createNode("section", "cp-inline-card");
    const hero = createNode("div", "cp-inline-hero");
    const eyebrow = createNode("div", "cp-inline-eyebrow", "Custom Provider");
    const titleRow = createNode("div", "cp-inline-title-row");
    const title = createNode("h2", "cp-inline-title", "直接配置模型供应商");
    const badge = createNode("div", "cp-inline-badge", "Claw 风格");
    hero.appendChild(eyebrow);
    titleRow.appendChild(title);
    titleRow.appendChild(badge);
    hero.appendChild(titleRow);
    const body = createNode("div", "cp-inline-body");
    const form = document.createElement("form");
    form.className = "cp-inline-form";
    const nameField = createNode("label", "cp-inline-field");
    const nameLabel = createNode("span", "cp-inline-label", "供应商名称");
    const nameInput = createNode("input", "cp-inline-input");
    nameInput.placeholder = "例如 OpenRouter / 自建网关";
    nameField.appendChild(nameLabel);
    nameField.appendChild(nameInput);
    const formatField = createNode("label", "cp-inline-field");
    const formatLabel = createNode("span", "cp-inline-label", "供应商格式");
    const formatSelect = createNode("select", "cp-inline-select");
    [["anthropic", "Anthropic Messages"], ["openai_chat", "OpenAI Chat Completions"], ["openai_responses", "OpenAI Responses API"]].forEach(function (option) {
      const node = document.createElement("option");
      node.value = option[0];
      node.textContent = option[1];
      formatSelect.appendChild(node);
    });
    formatField.appendChild(formatLabel);
    formatField.appendChild(formatSelect);
    const baseUrlField = createNode("label", "cp-inline-field");
    const baseUrlLabel = createNode("span", "cp-inline-label", "Base URL");
    const baseUrlInput = createNode("input", "cp-inline-input cp-inline-input-mono");
    baseUrlInput.placeholder = "例如 https://api.openai.com/v1";
    const requestPreview = createNode("div", "cp-inline-url-preview");
    const requestPreviewValue = createNode("div", "cp-inline-url-preview-value", "预览： /messages");
    requestPreviewValue.dataset.empty = "true";
    requestPreview.appendChild(requestPreviewValue);
    baseUrlField.appendChild(baseUrlLabel);
    baseUrlField.appendChild(baseUrlInput);
    baseUrlField.appendChild(requestPreview);
    const apiKeyField = createNode("label", "cp-inline-field");
    const apiKeyLabel = createNode("span", "cp-inline-label", "API Key");
    const apiKeyInput = createNode("input", "cp-inline-input cp-inline-input-mono");
    apiKeyInput.type = "password";
    apiKeyInput.placeholder = "provider key";
    apiKeyField.appendChild(apiKeyLabel);
    apiKeyField.appendChild(apiKeyInput);
    const modelField = createNode("div", "cp-inline-field");
    const modelLabel = createNode("span", "cp-inline-label", "默认模型");
    const modelInput = createNode("input", "cp-inline-input cp-inline-input-mono");
    modelInput.placeholder = "例如 claude-3-7-sonnet / gpt-4.1 / gpt-5";
    const modelControls = createNode("div", "cp-inline-model-controls");
    const modelMeta = createNode("div", "cp-inline-model-meta", "支持接口返回后直接选择模型。");
    const modelCount = createNode("div", "cp-inline-model-count", "未获取");
    const fetchModelsButton = createNode("button", "cp-inline-btn cp-inline-btn-ghost", "获取模型");
    fetchModelsButton.type = "button";
    modelControls.appendChild(modelMeta);
    modelControls.appendChild(modelCount);
    modelControls.appendChild(fetchModelsButton);
    const modelPickerField = createNode("label", "cp-inline-field cp-inline-subfield");
    const modelPickerLabel = createNode("span", "cp-inline-subfield-label", "从已获取模型中选择");
    const modelSelect = createNode("select", "cp-inline-select");
    modelPickerField.appendChild(modelPickerLabel);
    modelPickerField.appendChild(modelSelect);
    modelField.appendChild(modelLabel);
    modelField.appendChild(modelInput);
    modelField.appendChild(modelControls);
    modelField.appendChild(modelPickerField);
    const status = createNode("div", "cp-inline-status");
    const actions = createNode("div", "cp-inline-actions");
    const reloadButton = createNode("button", "cp-inline-btn cp-inline-btn-secondary", "读取已保存");
    reloadButton.type = "button";
    const saveButton = createNode("button", "cp-inline-btn cp-inline-btn-primary", "保存并应用");
    saveButton.type = "submit";
    actions.appendChild(reloadButton);
    actions.appendChild(saveButton);
    form.appendChild(nameField);
    form.appendChild(formatField);
    form.appendChild(baseUrlField);
    form.appendChild(apiKeyField);
    form.appendChild(modelField);
    form.appendChild(status);
    form.appendChild(actions);
    body.appendChild(form);
    card.appendChild(hero);
    card.appendChild(body);
    overlay.appendChild(card);
    formRefs = {
      nameInput,
      formatSelect,
      baseUrlInput,
      requestPreviewValue,
      apiKeyInput,
      modelInput,
      modelSelect,
      modelMeta,
      modelCount,
      fetchModelsButton,
      reloadButton,
      saveButton,
      status
    };
    syncModelOptions(modelSelect, [], "");
    reloadButton.addEventListener("click", function () {
      refreshForm().catch(function (error) {
        const message = error && typeof error.message === "string" ? error.message : "读取已保存配置失败。";
        setStatus("error", message);
      });
    });
    fetchModelsButton.addEventListener("click", function () {
      handleFetchModels().catch(function () {});
    });
    modelSelect.addEventListener("change", function () {
      if (!modelSelect.value) {
        return;
      }
      modelInput.value = modelSelect.value;
      setStatus("", "");
    });
    [formatSelect, baseUrlInput, apiKeyInput].forEach(function (node) {
      node.addEventListener("change", clearModels);
      node.addEventListener("input", function () {
        if (state.availableModels.length) {
          clearModels();
        }
      });
    });
    [formatSelect, baseUrlInput].forEach(function (node) {
      node.addEventListener("change", updateRequestPreview);
      node.addEventListener("input", updateRequestPreview);
    });
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const next = readForm();
      if (next.enabled && !next.baseUrl) {
        setStatus("error", "必须填写 Base URL。");
        formRefs.baseUrlInput.focus();
        return;
      }
      if (next.enabled && !next.apiKey) {
        setStatus("error", "必须填写 API Key。");
        formRefs.apiKeyInput.focus();
        return;
      }
      if (next.enabled && !next.defaultModel) {
        setStatus("error", "必须填写默认模型。");
        formRefs.modelInput.focus();
        return;
      }
      try {
        formRefs.saveButton.disabled = true;
        formRefs.reloadButton.disabled = true;
        const previousApiKey = state.currentApiKey;
        await saveConfig(next);
        if (next.enabled && state.originalApiKey === undefined) {
          state.originalApiKey = previousApiKey && previousApiKey !== next.apiKey ? previousApiKey : null;
        }
        state.currentApiKey = next.enabled ? "" : state.originalApiKey || "";
        setStatus("success", "配置已保存，正在应用到当前侧栏...");
        window.setTimeout(function () {
          window.location.reload();
        }, 320);
      } catch (error) {
        const message = error && typeof error.message === "string" ? error.message : "保存失败，请稍后再试。";
        setStatus("error", message);
        formRefs.saveButton.disabled = false;
        formRefs.reloadButton.disabled = false;
      }
    });
    return overlay;
  }
  function ensureMounted() {
    if (document.getElementById(ROOT_ID)) {
      return;
    }
    document.body.appendChild(buildOverlay());
  }
  function syncVisibility() {
    if (!document.body) {
      return;
    }
    const shouldShow = shouldShowInlineProvider() && !(state.hasLoadedConfig && hasUsableConfig(state.savedConfig));
    if (shouldShow) {
      ensureMounted();
      setOverlayOpen(true);
      if (!isOverlayVisible) {
        isOverlayVisible = true;
        refreshForm().catch(function () {});
      }
    } else if (overlay) {
      setOverlayOpen(false);
      isOverlayVisible = false;
    }
  }
  async function boot() {
    try {
      await refreshStoredState();
    } catch (error) {}
    syncVisibility();
    const observer = new MutationObserver(function () {
      syncVisibility();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    chrome.storage.onChanged.addListener(function (changes, areaName) {
      if (areaName !== "local") {
        return;
      }
      if (changes[STORAGE_KEY] || changes[PROFILES_STORAGE_KEY] || changes[ACTIVE_PROFILE_STORAGE_KEY] || changes.anthropicApiKey || changes[BACKUP_KEY]) {
        const syncTask = isOverlayVisible ? refreshForm() : refreshStoredState();
        syncTask.catch(function () {}).finally(function () {
          syncVisibility();
        });
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, {
      once: true
    });
  } else {
    boot();
  }
})();
