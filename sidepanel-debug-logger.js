(function () {
  if (globalThis.__CP_SIDEPANEL_DEBUG__) {
    return;
  }
  const STORAGE_KEY = "sidepanelDebugLogs";
  const META_KEY = "sidepanelDebugMeta";
  const MAX_ENTRIES = 500;
  const FLUSH_DELAY_MS = 150;
  const SESSION_ID = "sp-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  const RELEVANT_STORAGE_KEYS = new Set(["customProviderConfig", "anthropicApiKey", "accessToken", "refreshToken", "lastAuthFailureReason", "selectedModel", "selectedModelQuickMode", "lastPermissionModePreference", "chrome_ext_models"]);
  const SENSITIVE_KEYS = new Set(["apikey", "anthropicapikey", "accesstoken", "refreshtoken", "authtoken", "authorization", "token", "secret", "password", "currentapikey", "originalapikey"]);
  const PRIVATE_URL_KEYS = new Set(["baseurl", "providerurl", "requesturl", "url", "href", "uri", "filename", "source", "origin"]);
  const PRIVATE_TEXT_KEYS = new Set(["bodypreview", "notes", "prompt", "content", "requestbody", "responsebody", "rawbody", "inputtext", "outputtext"]);
  const REDACTED_SECRET = "[redacted-secret]";
  const REDACTED_TEXT = "[redacted-text]";
  const REDACTED_URL = "[redacted-url]";
  let sequence = 0;
  let flushTimer = null;
  let isFlushing = false;
  let debugEnabled = true;
  const pendingEntries = [];
  function normalizeKey(key) {
    return String(key || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
  }
  function isObjectLike(value) {
    return !!value && typeof value === "object";
  }
  function isSensitiveKey(key) {
    const normalized = normalizeKey(key);
    return !!normalized && SENSITIVE_KEYS.has(normalized);
  }
  function isPrivateUrlKey(key) {
    const normalized = normalizeKey(key);
    return !!normalized && PRIVATE_URL_KEYS.has(normalized);
  }
  function isPrivateTextKey(key) {
    const normalized = normalizeKey(key);
    return !!normalized && PRIVATE_TEXT_KEYS.has(normalized);
  }
  function redactUrlLikeValue(value, key) {
    const text = String(value || "");
    const normalized = normalizeKey(key);
    if (!text) {
      return text;
    }
    if (normalized === "href" && text.startsWith("/")) {
      return text.split(/[?#]/)[0] || REDACTED_URL;
    }
    return REDACTED_URL;
  }
  function sanitizeInlineSecrets(text) {
    return String(text || "").replace(/\b(?:https?|wss?|chrome-extension):\/\/[^\s"'<>]+/gi, REDACTED_URL).replace(/\bBearer\s+[A-Za-z0-9._-]+\b/gi, "Bearer [redacted]").replace(/\b(?:sk|rk|pk)-[A-Za-z0-9*._-]{5,}\b/gi, function (token) {
      return token.split("-")[0] + "-[redacted]";
    }).replace(/\b(?:api[_-]?key|access[_-]?token|refresh[_-]?token|auth(?:orization|[_-]?token)?|secret|password)\b\s*[:=]\s*[^\s,;]+/gi, function (match) {
      return match.replace(/[:=]\s*[^\s,;]+$/, ": [redacted]");
    });
  }
  function sanitizeString(value, key) {
    const normalized = normalizeKey(key);
    let text = String(value || "");
    if (!text) {
      return text;
    }
    if (isSensitiveKey(normalized)) {
      return REDACTED_SECRET;
    }
    if (normalized === "useragent") {
      return "[redacted-user-agent]";
    }
    if (isPrivateTextKey(normalized)) {
      return `${REDACTED_TEXT}:${text.length}`;
    }
    if (isPrivateUrlKey(normalized)) {
      return redactUrlLikeValue(text, normalized);
    }
    text = sanitizeInlineSecrets(text);
    if (text.length > 600) {
      return text.slice(0, 600) + "...[truncated]";
    }
    return text;
  }
  function summarizeProviderConfig(value) {
    const fetchedModels = Array.isArray(value?.fetchedModels) ? value.fetchedModels : [];
    return {
      enabled: !!value?.enabled,
      format: sanitizeString(value?.format || "", "format"),
      defaultModel: sanitizeString(value?.defaultModel || "", "defaultModel"),
      reasoningEffort: sanitizeString(value?.reasoningEffort || "", "reasoningEffort"),
      contextWindow: typeof value?.contextWindow === "number" ? value.contextWindow : value?.contextWindow || undefined,
      name: sanitizeString(value?.name || "", "name"),
      fetchedModelCount: fetchedModels.length,
      hasApiKey: !!value?.apiKey,
      hasBaseUrl: !!value?.baseUrl,
      hasNotes: !!String(value?.notes || "").trim()
    };
  }
  function normalizeError(error) {
    if (!error) {
      return null;
    }
    if (error instanceof Error) {
      return {
        name: error.name,
        message: sanitizeString(error.message, "message"),
        stack: sanitizeString(error.stack || "", "stack")
      };
    }
    return safeClone(error, 0, new WeakSet());
  }
  function safeClone(value, depth, seen, parentKey) {
    if (value == null) {
      return value;
    }
    if (depth > 4) {
      return "[max-depth]";
    }
    if (typeof value === "string") {
      return sanitizeString(value, parentKey);
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
      return normalizeError(value);
    }
    if (value instanceof URL) {
      return sanitizeString(value.toString(), parentKey);
    }
    if (value instanceof Event) {
      return {
        type: value.type,
        target: value.target && "tagName" in value.target ? value.target.tagName : typeof value.target
      };
    }
    if (Array.isArray(value)) {
      return value.slice(0, 20).map(item => safeClone(item, depth + 1, seen));
    }
    if (!isObjectLike(value)) {
      return String(value);
    }
    if (seen.has(value)) {
      return "[circular]";
    }
    seen.add(value);
    if (isSensitiveKey(parentKey)) {
      return maskSensitiveValue(parentKey, value);
    }
    if (normalizeKey(parentKey) === "customproviderconfig" || normalizeKey(parentKey) === "customprovider") {
      return summarizeProviderConfig(value);
    }
    const output = {};
    const keys = Object.keys(value).slice(0, 30);
    for (const key of keys) {
      const item = value[key];
      output[key] = isSensitiveKey(key) ? maskSensitiveValue(key, item) : safeClone(item, depth + 1, seen, key);
    }
    return output;
  }
  function maskSensitiveValue(key, value) {
    if (value == null || value === "") {
      return value;
    }
    if (typeof value === "string") {
      return REDACTED_SECRET;
    }
    if (isObjectLike(value)) {
      return {
        masked: true,
        key: normalizeKey(key)
      };
    }
    return REDACTED_SECRET;
  }
  function createEntry(level, type, payload) {
    sequence += 1;
    return {
      id: SESSION_ID + ":" + sequence,
      sessionId: SESSION_ID,
      ts: new Date().toISOString(),
      level,
      type,
      href: location.pathname,
      payload: safeClone(payload, 0, new WeakSet())
    };
  }
  function sanitizeLogEntries(entries) {
    if (!Array.isArray(entries)) {
      return [];
    }
    return entries.slice(-MAX_ENTRIES).map(function (entry) {
      return safeClone(entry, 0, new WeakSet());
    });
  }
  async function hydrateDebugMode() {
    debugEnabled = true;
    return debugEnabled;
  }
  function scheduleFlush() {
    if (flushTimer) {
      return;
    }
    flushTimer = setTimeout(() => {
      flushTimer = null;
      flush().catch(() => {});
    }, FLUSH_DELAY_MS);
  }
  async function flush() {
    if (isFlushing || !pendingEntries.length) {
      return;
    }
    if (!chrome?.storage?.local) {
      return;
    }
    isFlushing = true;
    const batch = pendingEntries.splice(0, pendingEntries.length);
    try {
      const stored = await chrome.storage.local.get([STORAGE_KEY, META_KEY]);
      const existing = Array.isArray(stored[STORAGE_KEY]) ? stored[STORAGE_KEY] : [];
      const nextLogs = sanitizeLogEntries(existing.concat(batch));
      await chrome.storage.local.set({
        [STORAGE_KEY]: nextLogs,
        [META_KEY]: {
          sessionId: SESSION_ID,
          lastFlushAt: new Date().toISOString(),
          href: location.pathname
        }
      });
    } catch (error) {
      console.warn("[sidepanel-debug] flush failed", error);
    } finally {
      isFlushing = false;
      if (pendingEntries.length) {
        scheduleFlush();
      }
    }
  }
  function log(type, payload, level) {
    if (!debugEnabled) {
      return null;
    }
    const entry = createEntry(level || "info", type, payload);
    pendingEntries.push(entry);
    if (entry.level === "error") {
      console.error("[sidepanel-debug]", entry.type, entry.payload);
    } else {
      console.debug("[sidepanel-debug]", entry.type, entry.payload);
    }
    scheduleFlush();
    return entry;
  }
  async function readLogs() {
    if (!chrome?.storage?.local) {
      return [];
    }
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    if (Array.isArray(stored[STORAGE_KEY])) {
      return sanitizeLogEntries(stored[STORAGE_KEY]);
    } else {
      return [];
    }
  }
  async function clearLogs() {
    pendingEntries.length = 0;
    if (flushTimer) {
      clearTimeout(flushTimer);
      flushTimer = null;
    }
    if (!chrome?.storage?.local) {
      return;
    }
    await chrome.storage.local.remove([STORAGE_KEY, META_KEY]);
  }
  async function snapshot(label) {
    if (!chrome?.storage?.local) {
      log("snapshot.unavailable", {
        label
      }, "warn");
      return null;
    }
    const keys = Array.from(RELEVANT_STORAGE_KEYS);
    const snapshotValue = await chrome.storage.local.get(keys);
    log("storage.snapshot", {
      label,
      state: snapshotValue
    });
    return snapshotValue;
  }
  function dumpToConsole() {
    readLogs().then(entries => {
      console.group("[sidepanel-debug] dump");
      entries.forEach(entry => console.log(entry));
      console.groupEnd();
    });
  }
  const panelState = {
    mounted: false,
    open: false,
    launcherVisible: false,
    refreshTimer: null,
    statusText: "",
    elements: null,
    mountRetryTimer: null
  };
  function showLauncher() {
    if (!panelState.elements?.host) {
      return;
    }
    panelState.launcherVisible = true;
    panelState.elements.host.style.display = "flex";
  }
  function hideLauncher() {
    if (!panelState.elements?.host) {
      return;
    }
    panelState.launcherVisible = false;
    panelState.elements.host.style.display = "none";
  }
  function stopPanelRefresh() {
    if (panelState.refreshTimer) {
      clearInterval(panelState.refreshTimer);
      panelState.refreshTimer = null;
    }
  }
  function schedulePanelMountRetry() {
    if (panelState.mounted || panelState.mountRetryTimer) {
      return;
    }
    panelState.mountRetryTimer = setTimeout(function () {
      panelState.mountRetryTimer = null;
      ensurePanelMounted();
    }, 120);
  }
  function setPanelStatus(text) {
    panelState.statusText = text || "";
    if (panelState.elements?.status) {
      panelState.elements.status.textContent = panelState.statusText;
    }
  }
  async function renderPanelLogs() {
    if (!panelState.elements) {
      return;
    }
    try {
      await flush();
      const entries = await readLogs();
      const visibleEntries = entries.slice(-80);
      panelState.elements.textarea.value = JSON.stringify(visibleEntries, null, 2);
      const lastEntry = visibleEntries.length ? visibleEntries[visibleEntries.length - 1] : null;
      panelState.elements.meta.textContent = "共 " + entries.length + " 条，显示最近 " + visibleEntries.length + " 条" + (lastEntry ? "，最后更新时间 " + lastEntry.ts : "");
      if (!panelState.statusText) {
        setPanelStatus(lastEntry ? "最后事件: " + lastEntry.type : "当前还没有日志");
      }
    } catch (error) {
      panelState.elements.textarea.value = JSON.stringify({
        error: "failed_to_render_logs",
        detail: normalizeError(error)
      }, null, 2);
      panelState.elements.meta.textContent = "日志读取失败";
      setPanelStatus("读取失败");
    }
  }
  function openPanel() {
    if (!panelState.mounted) {
      ensurePanelMounted();
    }
    if (!panelState.elements) {
      return;
    }
    showLauncher();
    panelState.open = true;
    panelState.elements.panel.style.display = "flex";
    panelState.elements.toggle.textContent = "收起日志";
    panelState.elements.toggle.style.background = "#2f241a";
    setPanelStatus("");
    renderPanelLogs().catch(() => {});
    stopPanelRefresh();
    panelState.refreshTimer = setInterval(() => {
      renderPanelLogs().catch(() => {});
    }, 1200);
  }
  function closePanel() {
    if (!panelState.elements) {
      return;
    }
    panelState.open = false;
    panelState.elements.panel.style.display = "none";
    panelState.elements.toggle.textContent = "查看日志";
    panelState.elements.toggle.style.background = "#171717";
    stopPanelRefresh();
    hideLauncher();
  }
  function togglePanel() {
    if (panelState.open) {
      closePanel();
    } else {
      openPanel();
    }
  }
  function buildButton(label) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.style.border = "1px solid #d7c8b4";
    button.style.background = "#fffaf3";
    button.style.color = "#2f241a";
    button.style.borderRadius = "10px";
    button.style.padding = "6px 10px";
    button.style.fontSize = "12px";
    button.style.lineHeight = "1";
    button.style.cursor = "pointer";
    return button;
  }
  function ensurePanelMounted() {
    if (panelState.mounted) {
      return;
    }
    if (!document.body) {
      schedulePanelMountRetry();
      return;
    }
    const host = document.createElement("div");
    host.id = "sidepanel-debug-floating";
    host.style.position = "fixed";
    host.style.right = "12px";
    host.style.bottom = "12px";
    host.style.zIndex = "2147483647";
    host.style.display = "none";
    host.style.flexDirection = "column";
    host.style.alignItems = "flex-end";
    host.style.gap = "10px";
    host.style.fontFamily = "\"SF Pro Text\",\"Segoe UI\",\"PingFang SC\",\"Microsoft YaHei\",sans-serif";
    const panel = document.createElement("div");
    panel.style.display = "none";
    panel.style.width = "min(420px, calc(100vw - 24px))";
    panel.style.height = "min(440px, calc(100vh - 80px))";
    panel.style.background = "#f9f3ea";
    panel.style.border = "1px solid #dccfbe";
    panel.style.borderRadius = "16px";
    panel.style.boxShadow = "0 18px 48px rgba(26, 20, 14, 0.2)";
    panel.style.overflow = "hidden";
    panel.style.display = "none";
    panel.style.flexDirection = "column";
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "space-between";
    header.style.gap = "8px";
    header.style.padding = "12px 14px";
    header.style.background = "linear-gradient(180deg, rgba(255,250,243,0.98), rgba(245,235,221,0.98))";
    header.style.borderBottom = "1px solid #e2d7c9";
    const title = document.createElement("div");
    title.textContent = "Sidepanel 调试日志";
    title.style.fontSize = "13px";
    title.style.fontWeight = "700";
    title.style.color = "#2f241a";
    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.flexWrap = "wrap";
    actions.style.justifyContent = "flex-end";
    actions.style.gap = "6px";
    const refreshButton = buildButton("刷新");
    const copyButton = buildButton("复制");
    const clearButton = buildButton("清空");
    const closeButton = buildButton("关闭");
    const body = document.createElement("div");
    body.style.display = "flex";
    body.style.flexDirection = "column";
    body.style.gap = "8px";
    body.style.padding = "12px";
    body.style.flex = "1";
    body.style.minHeight = "0";
    const meta = document.createElement("div");
    meta.style.fontSize = "12px";
    meta.style.color = "#6f6254";
    meta.textContent = "准备读取日志...";
    const textarea = document.createElement("textarea");
    textarea.readOnly = true;
    textarea.spellcheck = false;
    textarea.wrap = "off";
    textarea.style.flex = "1";
    textarea.style.minHeight = "0";
    textarea.style.resize = "none";
    textarea.style.width = "100%";
    textarea.style.boxSizing = "border-box";
    textarea.style.border = "1px solid #d8cbb8";
    textarea.style.borderRadius = "12px";
    textarea.style.background = "#fffdf9";
    textarea.style.color = "#2b241d";
    textarea.style.font = "12px/1.45 \"Cascadia Code\",\"Consolas\",\"Courier New\",monospace";
    textarea.style.padding = "10px";
    const status = document.createElement("div");
    status.style.fontSize = "12px";
    status.style.color = "#8b5e3c";
    status.textContent = "";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.textContent = "查看日志";
    toggle.style.border = "0";
    toggle.style.borderRadius = "999px";
    toggle.style.background = "#171717";
    toggle.style.color = "#fff7ed";
    toggle.style.padding = "10px 14px";
    toggle.style.fontSize = "12px";
    toggle.style.fontWeight = "700";
    toggle.style.boxShadow = "0 10px 24px rgba(0, 0, 0, 0.22)";
    toggle.style.cursor = "pointer";
    actions.appendChild(refreshButton);
    actions.appendChild(copyButton);
    actions.appendChild(clearButton);
    actions.appendChild(closeButton);
    header.appendChild(title);
    header.appendChild(actions);
    body.appendChild(meta);
    body.appendChild(textarea);
    body.appendChild(status);
    panel.appendChild(header);
    panel.appendChild(body);
    host.appendChild(panel);
    host.appendChild(toggle);
    document.body.appendChild(host);
    panelState.elements = {
      host,
      panel,
      toggle,
      textarea,
      status,
      meta,
      refreshButton,
      copyButton,
      clearButton,
      closeButton
    };
    toggle.addEventListener("click", togglePanel);
    closeButton.addEventListener("click", closePanel);
    refreshButton.addEventListener("click", function () {
      setPanelStatus("正在刷新...");
      renderPanelLogs().then(() => {
        setPanelStatus("已刷新");
      }).catch(() => {
        setPanelStatus("刷新失败");
      });
    });
    copyButton.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(textarea.value || "");
        setPanelStatus("日志已复制");
      } catch (error) {
        textarea.focus();
        textarea.select();
        setPanelStatus("复制失败，请手动 Ctrl+C");
      }
    });
    clearButton.addEventListener("click", async function () {
      try {
        await clearLogs();
        textarea.value = "";
        meta.textContent = "日志已清空";
        setPanelStatus("已清空");
      } catch (error) {
        setPanelStatus("清空失败");
      }
    });
    panelState.mounted = true;
    if (panelState.mountRetryTimer) {
      clearTimeout(panelState.mountRetryTimer);
      panelState.mountRetryTimer = null;
    }
  }
  globalThis.__CP_SIDEPANEL_DEBUG__ = {
    sessionId: SESSION_ID,
    log,
    flush,
    read: readLogs,
    clear: clearLogs,
    snapshot,
    dumpToConsole,
    openPanel,
    closePanel,
    togglePanel
  };
  window.addEventListener("error", function (event) {
    log("window.error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      source: [event.filename || "", event.lineno || 0, event.colno || 0].join(":"),
      error: normalizeError(event.error),
      fallbackStack: event.error?.stack || ""
    }, "error");
    flush().catch(() => {});
  });
  window.addEventListener("unhandledrejection", function (event) {
    log("window.unhandledrejection", {
      reason: normalizeError(event.reason),
      fallbackStack: event.reason instanceof Error ? event.reason.stack || "" : new Error("sidepanel.unhandledrejection").stack || ""
    }, "error");
    flush().catch(() => {});
  });
  document.addEventListener("visibilitychange", function () {
    log("document.visibilitychange", {
      state: document.visibilityState
    });
  });
  if (chrome?.storage?.onChanged) {
    chrome.storage.onChanged.addListener(function (changes, areaName) {
      if (areaName !== "local") {
        return;
      }
      const changedKeys = Object.keys(changes).filter(key => {
        return RELEVANT_STORAGE_KEYS.has(key) && key !== STORAGE_KEY && key !== META_KEY;
      });
      if (!changedKeys.length) {
        return;
      }
      const payload = {};
      for (const key of changedKeys) {
        payload[key] = {
          oldValue: safeClone(changes[key].oldValue, 0, new WeakSet(), key),
          newValue: safeClone(changes[key].newValue, 0, new WeakSet(), key)
        };
      }
      log("storage.changed", payload);
    });
  }
  hydrateDebugMode().then(() => {
    log("logger.ready", {
      sessionId: SESSION_ID,
      title: document.title
    });
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        log("dom.content_loaded", {
          readyState: document.readyState
        });
        snapshot("dom-content-loaded").catch(() => {});
      });
    } else {
      log("dom.already_ready", {
        readyState: document.readyState
      });
      snapshot("dom-already-ready").catch(() => {});
    }
  }).catch(() => {});
  window.addEventListener("load", function () {
    log("window.load", {
      readyState: document.readyState
    });
  });
})();
