(function () {
  if (globalThis.__CP_OPTIONS_DEBUG__) {
    return;
  }
  const STORAGE_KEY = "optionsDebugLogs";
  const META_KEY = "optionsDebugMeta";
  const MAX_ENTRIES = 500;
  const SESSION_ID = "opt-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  const SENSITIVE_KEYS = new Set(["apikey", "anthropicapikey", "accesstoken", "refreshtoken", "authtoken", "authorization", "token", "secret", "password", "currentapikey", "originalapikey"]);
  const PRIVATE_URL_KEYS = new Set(["baseurl", "providerurl", "requesturl", "url", "href", "uri", "filename", "source", "origin"]);
  const PRIVATE_TEXT_KEYS = new Set(["bodypreview", "notes", "prompt", "content", "requestbody", "responsebody", "rawbody", "inputtext", "outputtext"]);
  const REDACTED_SECRET = "[redacted-secret]";
  const REDACTED_TEXT = "[redacted-text]";
  const REDACTED_URL = "[redacted-url]";
  let sequence = 0;
  function normalizeKey(key) {
    return String(key || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
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
      if (normalized === "href" && text.startsWith("/")) {
        return text.split(/[?#]/)[0] || REDACTED_URL;
      }
      return REDACTED_URL;
    }
    text = sanitizeInlineSecrets(text);
    return text.length > 500 ? text.slice(0, 500) + "...[truncated]" : text;
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
      return {
        name: value.name,
        message: sanitizeString(value.message, "message"),
        stack: sanitizeString(value.stack || "", "stack")
      };
    }
    if (typeof Event !== "undefined" && value instanceof Event) {
      return {
        type: value.type,
        target: value.target && value.target.tagName ? value.target.tagName : typeof value.target
      };
    }
    if (Array.isArray(value)) {
      return value.slice(0, 20).map(function (item) {
        return safeClone(item, depth + 1, seen);
      });
    }
    if (typeof value !== "object") {
      return String(value);
    }
    if (seen.has(value)) {
      return "[circular]";
    }
    seen.add(value);
    if (isSensitiveKey(parentKey)) {
      return REDACTED_SECRET;
    }
    if (normalizeKey(parentKey) === "customproviderconfig" || normalizeKey(parentKey) === "customprovider") {
      return summarizeProviderConfig(value);
    }
    const output = {};
    for (const key of Object.keys(value).slice(0, 30)) {
      output[key] = isSensitiveKey(key) ? REDACTED_SECRET : safeClone(value[key], depth + 1, seen, key);
    }
    return output;
  }
  function sanitizeLogEntries(entries) {
    if (!Array.isArray(entries)) {
      return [];
    }
    return entries.slice(-MAX_ENTRIES).map(function (entry) {
      return safeClone(entry, 0, new WeakSet());
    });
  }
  async function persist(entry) {
    if (!chrome?.storage?.local) {
      return;
    }
    try {
      const stored = await chrome.storage.local.get([STORAGE_KEY, META_KEY]);
      const existing = Array.isArray(stored[STORAGE_KEY]) ? stored[STORAGE_KEY] : [];
      const nextLogs = sanitizeLogEntries(existing.concat(entry));
      await chrome.storage.local.set({
        [STORAGE_KEY]: nextLogs,
        [META_KEY]: {
          sessionId: SESSION_ID,
          lastFlushAt: new Date().toISOString(),
          href: location.pathname
        }
      });
    } catch (error) {
      console.warn("[options-debug] persist failed", error);
    }
  }
  function createEntry(level, type, payload) {
    sequence += 1;
    return {
      id: SESSION_ID + ":" + sequence,
      sessionId: SESSION_ID,
      ts: new Date().toISOString(),
      href: location.pathname,
      level,
      type,
      payload: safeClone(payload, 0, new WeakSet())
    };
  }
  function log(type, payload, level) {
    const entry = createEntry(level || "info", type, payload);
    const method = entry.level === "error" ? "error" : entry.level === "warn" ? "warn" : "debug";
    console[method]("[options-debug]", entry.type, entry.payload);
    persist(entry).catch(function () {});
    return entry;
  }
  async function read() {
    if (!chrome?.storage?.local) {
      return [];
    }
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    return Array.isArray(stored[STORAGE_KEY]) ? sanitizeLogEntries(stored[STORAGE_KEY]) : [];
  }
  async function clear() {
    if (!chrome?.storage?.local) {
      return;
    }
    await chrome.storage.local.remove([STORAGE_KEY, META_KEY]);
  }
  async function dumpToConsole() {
    const logs = await read();
    console.groupCollapsed("[options-debug] dump", logs.length);
    for (const item of logs) {
      console.log(item.ts, item.level, item.type, item.payload);
    }
    console.groupEnd();
    return logs;
  }
  globalThis.__CP_OPTIONS_DEBUG__ = {
    log,
    read,
    clear,
    dumpToConsole
  };
  window.addEventListener("error", function (event) {
    log("window.error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    }, "error");
  });
  window.addEventListener("unhandledrejection", function (event) {
    log("window.unhandledrejection", {
      reason: event.reason
    }, "error");
  });
  document.addEventListener("readystatechange", function () {
    log("document.readyState", {
      readyState: document.readyState
    });
  });
  window.addEventListener("DOMContentLoaded", function () {
    log("window.domcontentloaded", {
      hash: location.hash
    });
  });
  window.addEventListener("load", function () {
    log("window.load", {
      hash: location.hash
    });
  });
  window.addEventListener("hashchange", function () {
    log("window.hashchange", {
      hash: location.hash
    });
  });
  document.addEventListener("click", function (event) {
    const target = event.target instanceof Element ? event.target.closest("button, a, input, label") : null;
    if (!target) {
      return;
    }
    log("document.click", {
      tag: target.tagName,
      text: String(target.textContent || "").trim().slice(0, 80),
      id: target.id || "",
      className: target.className || ""
    });
  }, true);
  log("options.debug.bootstrap", {
    href: location.pathname
  });
})();
