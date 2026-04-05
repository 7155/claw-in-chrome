import { G as e, H as t, S as r, I as o, J as a, K as n, L as s, W as i, T as c, R as l, M as d, N as u, O as h, j as p, x as m, z as f, g, s as b, c as w, m as y, w as _, e as v, P as I } from "./PermissionManager-9s959502.js";
import { R as k } from "./index-BVS4T5_D.js";
class T extends Error {
  constructor(e) {
    super(`Page still loading (executeScript waited ${e}ms for document_idle). The previous action may have triggered navigation — try again in a moment.`);
    this.name = "PageLoadingError";
  }
}
async function x(t, r = e) {
  let o;
  try {
    return await Promise.race([chrome.scripting.executeScript(t), new Promise((e, t) => {
      o = setTimeout(() => t(new T(r)), r);
    })]);
  } finally {
    if (o !== undefined) {
      clearTimeout(o);
    }
  }
}
function S(e, t) {
  return Math.floor((e - 1) / t) + 1;
}
function E(e, t, r) {
  return S(e, r) * S(t, r);
}
function C(e, t, r) {
  const {
    pxPerToken: o,
    maxTargetPx: a,
    maxTargetTokens: n
  } = r;
  if (e <= a && t <= a && E(e, t, o) <= n) {
    return [e, t];
  }
  if (t > e) {
    const [o, a] = C(t, e, r);
    return [a, o];
  }
  const s = e / t;
  let i = e;
  let c = 1;
  while (true) {
    if (c + 1 === i) {
      return [c, Math.max(Math.round(c / s), 1)];
    }
    const e = Math.floor((c + i) / 2);
    const t = Math.max(Math.round(e / s), 1);
    if (e <= a && E(e, t, o) <= n) {
      c = e;
    } else {
      i = e;
    }
  }
}
const M = new class {
  contexts = new Map();
  setContext(e, t) {
    if (t.viewportWidth && t.viewportHeight) {
      const r = {
        viewportWidth: t.viewportWidth,
        viewportHeight: t.viewportHeight,
        screenshotWidth: t.width,
        screenshotHeight: t.height
      };
      this.contexts.set(e, r);
    }
  }
  getContext(e) {
    return this.contexts.get(e);
  }
  clearContext(e) {
    this.contexts.delete(e);
  }
  clearAllContexts() {
    this.contexts.clear();
  }
}();
function D(e) {
  if (!e.startsWith("http")) {
    e = `https://${e}`;
  }
  try {
    return new URL(e).hostname;
  } catch {
    return "";
  }
}
function R(e) {
  return e.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/.*$/, "");
}
async function A(e, t, r) {
  if (!t) {
    return null;
  }
  const o = await chrome.tabs.get(e);
  if (!o.url) {
    return {
      error: "Unable to verify current URL for security check"
    };
  }
  const a = D(t);
  const n = D(o.url);
  if (a !== n) {
    return {
      error: `Security check failed: Domain changed from ${a} to ${n} during ${r}`
    };
  } else {
    return null;
  }
}
const P = "blockedUrlPatterns";
function U(e, t) {
  let r;
  try {
    r = new URL(/^https?:\/\//.test(e) ? e : `https://${e}`);
  } catch {
    return false;
  }
  const o = r.hostname.toLowerCase().replace(/^www\./, "") + r.pathname.toLowerCase();
  let a = t.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "/*");
  if (!a.includes("/")) {
    a += "/*";
  }
  const n = a.split("*").map(e => e.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*");
  return new RegExp(`^${n}$`).test(o);
}
class $ {
  static blockedUrlPatterns = null;
  static listenerRegistered = false;
  static async isUrlBlockedByManagedPolicy(e) {
    if (this.blockedUrlPatterns === null) {
      this.blockedUrlPatterns = await this.loadBlockedUrlPatterns();
      this.registerChangeListener();
    }
    for (const t of this.blockedUrlPatterns) {
      if (U(e, t)) {
        return true;
      }
    }
    return false;
  }
  static registerChangeListener() {
    if (!this.listenerRegistered) {
      this.listenerRegistered = true;
      chrome.storage.onChanged.addListener((e, t) => {
        if (t === "managed" && e[P]) {
          this.loadBlockedUrlPatterns().then(e => {
            this.blockedUrlPatterns = e;
          });
        }
      });
    }
  }
  static async loadBlockedUrlPatterns() {
    try {
      const e = (await chrome.storage.managed.get(P))[P];
      if (Array.isArray(e)) {
        return e.filter(e => typeof e == "string" && e.length > 0);
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  }
  static _resetForTests() {
    this.blockedUrlPatterns = null;
    this.listenerRegistered = false;
  }
}
class O {
  static cache = new Map();
  static CACHE_TTL_MS = 300000;
  static pendingRequests = new Map();
  static async getCategory(e) {
    if (await $.isUrlBlockedByManagedPolicy(e)) {
      return "category_org_blocked";
    }
    const t = R(D(e));
    const r = this.cache.get(t);
    if (r) {
      if (!(Date.now() - r.timestamp > this.CACHE_TTL_MS)) {
        return r.category;
      }
      this.cache.delete(t);
    }
    const o = this.pendingRequests.get(t);
    if (o) {
      return o;
    }
    const a = this.fetchCategoryFromAPI(t);
    this.pendingRequests.set(t, a);
    try {
      return await a;
    } finally {
      this.pendingRequests.delete(t);
    }
  }
  static async fetchCategoryFromAPI(e) {
    const r = await t();
    if (r) {
      try {
        const t = new URL("/api/web/domain_info/browser_extension", "https://api.anthropic.com");
        t.searchParams.append("domain", e);
        const o = await fetch(t.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${r}`
          }
        });
        if (!o.ok) {
          return;
        }
        const a = await o.json();
        const n = this.getEffectiveCategory(a);
        this.cache.set(e, {
          category: n,
          timestamp: Date.now()
        });
        return n;
      } catch (o) {
        return;
      }
    }
  }
  static getEffectiveCategory(e) {
    if (e.org_policy === "block") {
      return "category_org_blocked";
    } else {
      return e.category;
    }
  }
  static clearCache() {
    this.cache.clear();
  }
  static evictFromCache(e) {
    const t = R(e);
    this.cache.delete(t);
  }
  static getCacheSize() {
    return this.cache.size;
  }
}
class G {
  static instance = null;
  subscriptions = new Map();
  chromeUpdateListener = null;
  chromeActivatedListener = null;
  chromeRemovedListener = null;
  relevantTabIds = new Set();
  nextSubscriptionId = 1;
  constructor() {}
  static getInstance() {
    G.instance ||= new G();
    return G.instance;
  }
  subscribe(e, t, r) {
    const o = "sub_" + this.nextSubscriptionId++;
    this.subscriptions.set(o, {
      tabId: e,
      eventTypes: t,
      callback: r
    });
    if (e !== "all") {
      this.relevantTabIds.add(e);
    }
    if (this.subscriptions.size === 1) {
      this.startListeners();
    }
    return o;
  }
  unsubscribe(e) {
    const t = this.subscriptions.get(e);
    if (t) {
      this.subscriptions.delete(e);
      if (t.tabId !== "all") {
        let e = false;
        for (const [, r] of this.subscriptions) {
          if (r.tabId === t.tabId) {
            e = true;
            break;
          }
        }
        if (!e) {
          this.relevantTabIds.delete(t.tabId);
        }
      }
      if (this.subscriptions.size === 0) {
        this.stopListeners();
      }
    }
  }
  startListeners() {
    this.chromeUpdateListener = (e, t, r) => {
      if (this.relevantTabIds.size > 0 && !this.relevantTabIds.has(e)) {
        let e = false;
        for (const [, t] of this.subscriptions) {
          if (t.tabId === "all") {
            e = true;
            break;
          }
        }
        if (!e) {
          return;
        }
      }
      const o = {};
      let a = false;
      if (t.url !== undefined) {
        o.url = t.url;
        a = true;
      }
      if (t.status !== undefined) {
        o.status = t.status;
        a = true;
      }
      if ("groupId" in t) {
        o.groupId = t.groupId;
        a = true;
      }
      if (t.title !== undefined) {
        o.title = t.title;
        a = true;
      }
      if (a) {
        for (const [, s] of this.subscriptions) {
          if (s.tabId !== "all" && s.tabId !== e) {
            continue;
          }
          let t = false;
          for (const e of s.eventTypes) {
            if (o[e] !== undefined) {
              t = true;
              break;
            }
          }
          if (t) {
            try {
              s.callback(e, o, r);
            } catch (n) {}
          }
        }
      }
    };
    this.chromeActivatedListener = e => {
      const t = e.tabId;
      if (this.relevantTabIds.size > 0 && !this.relevantTabIds.has(t)) {
        let e = false;
        for (const [, t] of this.subscriptions) {
          if (t.tabId === "all") {
            e = true;
            break;
          }
        }
        if (!e) {
          return;
        }
      }
      const r = {
        active: true
      };
      for (const [, a] of this.subscriptions) {
        if ((a.tabId === "all" || a.tabId === t) && a.eventTypes.includes("active")) {
          try {
            a.callback(t, r);
          } catch (o) {}
        }
      }
    };
    chrome.tabs.onUpdated.addListener(this.chromeUpdateListener);
    chrome.tabs.onActivated.addListener(this.chromeActivatedListener);
    this.chromeRemovedListener = e => {
      if (this.relevantTabIds.size > 0 && !this.relevantTabIds.has(e)) {
        let e = false;
        for (const [, t] of this.subscriptions) {
          if (t.tabId === "all") {
            e = true;
            break;
          }
        }
        if (!e) {
          return;
        }
      }
      const t = {
        removed: true
      };
      for (const [, o] of this.subscriptions) {
        if ((o.tabId === "all" || o.tabId === e) && o.eventTypes.includes("removed")) {
          try {
            o.callback(e, t);
          } catch (r) {}
        }
      }
    };
    chrome.tabs.onRemoved.addListener(this.chromeRemovedListener);
  }
  stopListeners() {
    if (this.chromeUpdateListener) {
      chrome.tabs.onUpdated.removeListener(this.chromeUpdateListener);
      this.chromeUpdateListener = null;
    }
    if (this.chromeActivatedListener) {
      chrome.tabs.onActivated.removeListener(this.chromeActivatedListener);
      this.chromeActivatedListener = null;
    }
    if (this.chromeRemovedListener) {
      chrome.tabs.onRemoved.removeListener(this.chromeRemovedListener);
      this.chromeRemovedListener = null;
    }
    this.relevantTabIds.clear();
  }
  getSubscriptionCount() {
    return this.subscriptions.size;
  }
  hasActiveListeners() {
    return this.chromeUpdateListener !== null || this.chromeActivatedListener !== null || this.chromeRemovedListener !== null;
  }
}
const N = () => G.getInstance();
const L = "Claw";
const q = "Claw (MCP)";
const LEGACY_DEFAULT_GROUP_TITLE = "Claude";
class B {
  static instance;
  groupMetadata = new Map();
  initialized = false;
  STORAGE_KEY = r.TAB_GROUPS;
  groupBlocklistStatuses = new Map();
  blocklistListeners = new Set();
  indicatorUpdateTimer = null;
  INDICATOR_UPDATE_DELAY = 100;
  pendingRegroups = new Map();
  processingMainTabRemoval = new Set();
  mcpTabGroupId = null;
  MCP_TAB_GROUP_KEY = r.MCP_TAB_GROUP_ID;
  tabGroupListenerSubscriptionId = null;
  isTabGroupListenerStarted = false;
  DISMISSED_GROUPS_KEY = r.DISMISSED_TAB_GROUPS;
  constructor() {
    this.startTabRemovalListener();
  }
  startTabRemovalListener() {
    chrome.tabs.onRemoved.addListener(async e => {
      for (const [t, r] of this.groupBlocklistStatuses.entries()) {
        if (r.categoriesByTab.has(e)) {
          await this.removeTabFromBlocklistTracking(t, e);
        }
      }
    });
  }
  static getInstance() {
    B.instance ||= new B();
    return B.instance;
  }
  async dismissStaticIndicatorsForGroup(e) {
    const t = (await chrome.storage.local.get(this.DISMISSED_GROUPS_KEY))[this.DISMISSED_GROUPS_KEY] || [];
    if (!t.includes(e)) {
      t.push(e);
    }
    await chrome.storage.local.set({
      [this.DISMISSED_GROUPS_KEY]: t
    });
    try {
      const t = await chrome.tabs.query({
        groupId: e
      });
      for (const e of t) {
        if (e.id) {
          try {
            await chrome.tabs.sendMessage(e.id, {
              type: "HIDE_STATIC_INDICATOR"
            });
          } catch (r) {}
        }
      }
    } catch (r) {}
  }
  async isGroupDismissed(e) {
    try {
      const t = (await chrome.storage.local.get(this.DISMISSED_GROUPS_KEY))[this.DISMISSED_GROUPS_KEY];
      return !!Array.isArray(t) && t.includes(e);
    } catch (t) {
      return false;
    }
  }
  async initialize(e = false) {
    if (!this.initialized || !!e) {
      await this.loadFromStorage();
      await this.reconcileWithChrome();
      this.initialized = true;
    }
  }
  startTabGroupChangeListener() {
    if (this.isTabGroupListenerStarted) {
      return;
    }
    const e = N();
    this.tabGroupListenerSubscriptionId = e.subscribe("all", ["groupId"], async (e, t) => {
      if ("groupId" in t) {
        await this.handleTabGroupChange(e, t.groupId);
      }
    });
    this.isTabGroupListenerStarted = true;
  }
  stopTabGroupChangeListener() {
    if (!this.isTabGroupListenerStarted || !this.tabGroupListenerSubscriptionId) {
      return;
    }
    N().unsubscribe(this.tabGroupListenerSubscriptionId);
    this.tabGroupListenerSubscriptionId = null;
    this.isTabGroupListenerStarted = false;
  }
  async handleTabGroupChange(e, t) {
    for (const [a, n] of this.groupMetadata.entries()) {
      if (n.memberStates.has(e)) {
        if (t === chrome.tabGroups.TAB_GROUP_ID_NONE || t !== n.chromeGroupId) {
          const t = n.memberStates.get(e);
          const s = t?.indicatorState || "none";
          try {
            let t = "HIDE_AGENT_INDICATORS";
            if (s === "static") {
              t = "HIDE_STATIC_INDICATOR";
            }
            await this.sendIndicatorMessage(e, t);
          } catch (r) {}
          n.memberStates.delete(e);
          if (e === a) {
            if (this.processingMainTabRemoval.has(a)) {
              return;
            }
            if (this.pendingRegroups.has(a)) {
              return;
            }
            this.processingMainTabRemoval.add(a);
            const e = n.memberStates.get(a)?.indicatorState || "none";
            const t = n.chromeGroupId;
            try {
              const r = await chrome.tabs.group({
                tabIds: [a]
              });
              await chrome.tabGroups.update(r, {
                title: L,
                color: chrome.tabGroups.Color.ORANGE,
                collapsed: false
              });
              n.chromeGroupId = r;
              n.memberStates.clear();
              n.memberStates.set(a, {
                indicatorState: e
              });
              if (t !== r) {
                this.groupBlocklistStatuses.delete(t);
              }
              if (e === "pulsing") {
                try {
                  await this.sendIndicatorMessage(a, "SHOW_AGENT_INDICATORS");
                } catch (o) {}
              }
              this.groupMetadata.set(a, n);
              await this.saveToStorage();
              await this.cleanupOldGroup(t, a);
              this.processingMainTabRemoval.delete(a);
              return;
            } catch (r) {
              if (r instanceof Error && r.message && r.message.includes("dragging")) {
                this.pendingRegroups.set(a, {
                  tabId: a,
                  originalGroupId: t,
                  indicatorState: e,
                  metadata: n,
                  attemptCount: 0
                });
                this.scheduleRegroupRetry(a);
                return;
              } else {
                this.groupMetadata.delete(a);
                this.groupBlocklistStatuses.delete(t);
                await this.saveToStorage();
                this.processingMainTabRemoval.delete(a);
                return;
              }
            }
          }
          await this.saveToStorage();
          break;
        }
      }
    }
    if (t && t !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
      for (const [a, n] of this.groupMetadata.entries()) {
        if (n.chromeGroupId === t) {
          if (!n.memberStates.has(e)) {
            const t = e !== a;
            n.memberStates.set(e, {
              indicatorState: t ? "static" : "none"
            });
            try {
              const t = await chrome.tabs.get(e);
              if (t.url) {
                await this.updateTabBlocklistStatus(e, t.url);
              }
            } catch (r) {}
            const o = await this.isGroupDismissed(n.chromeGroupId);
            if (t && !o) {
              let t = 0;
              const o = 3;
              const a = 500;
              const n = async () => {
                try {
                  await this.sendIndicatorMessage(e, "SHOW_STATIC_INDICATOR");
                  return true;
                } catch (r) {
                  t++;
                  if (t < o) {
                    setTimeout(n, a);
                  }
                  return false;
                }
              };
              await n();
            }
            await this.saveToStorage();
          }
          break;
        }
      }
    }
  }
  async cleanupOldGroup(e, t) {
    try {
      const r = await chrome.tabs.query({
        groupId: e
      });
      for (const e of r) {
        if (e.id && e.id !== t) {
          try {
            await this.sendIndicatorMessage(e.id, "HIDE_STATIC_INDICATOR");
          } catch {}
        }
      }
      const o = r.filter(e => e.id && e.id !== t).map(e => e.id);
      if (o.length > 0) {
        await chrome.tabs.ungroup(o);
      }
    } catch (r) {}
  }
  scheduleRegroupRetry(e) {
    const t = this.pendingRegroups.get(e);
    if (t) {
      if (t.timeoutId) {
        clearTimeout(t.timeoutId);
      }
      t.timeoutId = setTimeout(() => {
        this.attemptRegroup(e);
      }, 1000);
    }
  }
  async attemptRegroup(e) {
    const t = this.pendingRegroups.get(e);
    if (t) {
      t.attemptCount++;
      try {
        if ((await chrome.tabs.get(e)).groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
          this.pendingRegroups.delete(e);
          return;
        }
        const o = await chrome.tabs.group({
          tabIds: [e]
        });
        await chrome.tabGroups.update(o, {
          title: L,
          color: chrome.tabGroups.Color.ORANGE,
          collapsed: false
        });
        t.metadata.chromeGroupId = o;
        t.metadata.memberStates.clear();
        t.metadata.memberStates.set(e, {
          indicatorState: t.indicatorState
        });
        if (t.originalGroupId !== o) {
          this.groupBlocklistStatuses.delete(t.originalGroupId);
        }
        if (t.indicatorState === "pulsing") {
          try {
            await this.sendIndicatorMessage(e, "SHOW_AGENT_INDICATORS");
          } catch (r) {}
        }
        this.groupMetadata.set(e, t.metadata);
        await this.saveToStorage();
        await this.cleanupOldGroup(t.originalGroupId, e);
        this.pendingRegroups.delete(e);
        this.processingMainTabRemoval.delete(e);
      } catch {
        if (t.attemptCount < 5) {
          this.scheduleRegroupRetry(e);
        } else {
          try {
            const o = await chrome.tabs.group({
              tabIds: [e]
            });
            await chrome.tabGroups.update(o, {
              title: L,
              color: chrome.tabGroups.Color.ORANGE,
              collapsed: false
            });
            t.metadata.chromeGroupId = o;
            t.metadata.memberStates.clear();
            t.metadata.memberStates.set(e, {
              indicatorState: t.indicatorState
            });
            if (t.originalGroupId !== o) {
              this.groupBlocklistStatuses.delete(t.originalGroupId);
            }
            if (t.indicatorState === "pulsing") {
              try {
                await this.sendIndicatorMessage(e, "SHOW_AGENT_INDICATORS");
              } catch (r) {}
            }
            this.groupMetadata.set(e, t.metadata);
            await this.saveToStorage();
            await this.cleanupOldGroup(t.originalGroupId, e);
          } catch (o) {
            this.groupMetadata.delete(e);
            this.groupBlocklistStatuses.delete(t.originalGroupId);
            await this.saveToStorage();
          }
          this.pendingRegroups.delete(e);
          this.processingMainTabRemoval.delete(e);
        }
      }
    }
  }
  async loadFromStorage() {
    try {
      const e = (await chrome.storage.local.get(this.STORAGE_KEY))[this.STORAGE_KEY];
      if (e && typeof e == "object") {
        this.groupMetadata = new Map(Object.entries(e).map(([e, t]) => {
          const r = t;
          if (r.memberStates && typeof r.memberStates == "object") {
            r.memberStates = new Map(Object.entries(r.memberStates).map(([e, t]) => [parseInt(e), t]));
          } else {
            r.memberStates = new Map();
          }
          return [parseInt(e), r];
        }));
      }
    } catch (e) {}
  }
  async saveToStorage() {
    try {
      const e = Object.fromEntries(Array.from(this.groupMetadata.entries()).map(([e, t]) => [e, {
        ...t,
        memberStates: Object.fromEntries(t.memberStates || new Map())
      }]));
      await chrome.storage.local.set({
        [this.STORAGE_KEY]: e
      });
    } catch (e) {}
  }
  findMainTabInChromeGroup(e) {
    for (const [t, r] of this.groupMetadata.entries()) {
      if (r.chromeGroupId === e) {
        return t;
      }
    }
    return null;
  }
  async createGroup(e) {
    const t = await this.findGroupByMainTab(e);
    if (t) {
      return t;
    }
    const r = await chrome.tabs.get(e);
    let o;
    let a = "blank";
    if (r.url && r.url !== "" && !r.url.startsWith("chrome://")) {
      try {
        a = new URL(r.url).hostname || "blank";
      } catch {
        a = "blank";
      }
    }
    if (r.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
      if (!this.findMainTabInChromeGroup(r.groupId)) {
        await chrome.tabs.ungroup([e]);
      }
    }
    let n = 3;
    while (n > 0) {
      try {
        o = await chrome.tabs.group({
          tabIds: [e]
        });
        break;
      } catch (c) {
        n--;
        if (n === 0) {
          throw c;
        }
        await new Promise(e => setTimeout(e, 100));
      }
    }
    if (!o) {
      throw new Error("Failed to create Chrome tab group");
    }
    await chrome.tabGroups.update(o, {
      title: L,
      color: chrome.tabGroups.Color.ORANGE,
      collapsed: false
    });
    const s = {
      mainTabId: e,
      createdAt: Date.now(),
      domain: a,
      chromeGroupId: o,
      memberStates: new Map()
    };
    s.memberStates.set(e, {
      indicatorState: "none"
    });
    this.groupMetadata.set(e, s);
    await this.saveToStorage();
    const i = await this.getGroupMembers(o);
    return {
      ...s,
      memberTabs: i
    };
  }
  async adoptOrphanedGroup(e, t) {
    const r = await this.findGroupByMainTab(e);
    if (r) {
      return r;
    }
    const o = await chrome.tabs.get(e);
    if (!o.url) {
      throw new Error("Tab has no URL");
    }
    const a = new URL(o.url).hostname;
    if (o.groupId !== t) {
      throw new Error(`Tab ${e} is not in Chrome group ${t}`);
    }
    const n = {
      mainTabId: e,
      createdAt: Date.now(),
      domain: a,
      chromeGroupId: t,
      memberStates: new Map()
    };
    n.memberStates.set(e, {
      indicatorState: "none"
    });
    const s = await chrome.tabs.query({
      groupId: t
    });
    for (const c of s) {
      if (c.id && c.id !== e) {
        n.memberStates.set(c.id, {
          indicatorState: "static"
        });
      }
    }
    this.groupMetadata.set(e, n);
    await this.saveToStorage();
    const i = await this.getGroupMembers(t);
    return {
      ...n,
      memberTabs: i
    };
  }
  async addTabToGroup(e, t) {
    const r = this.groupMetadata.get(e);
    if (r) {
      try {
        await chrome.tabs.group({
          tabIds: [t],
          groupId: r.chromeGroupId
        });
        if (!r.memberStates.has(t)) {
          r.memberStates.set(t, {
            indicatorState: t === e ? "none" : "static"
          });
        }
        try {
          const e = await chrome.tabs.get(t);
          if (e.url) {
            await this.updateTabBlocklistStatus(t, e.url);
          }
        } catch (o) {}
        const a = await this.isGroupDismissed(r.chromeGroupId);
        if (t !== e && !a) {
          try {
            await chrome.tabs.sendMessage(t, {
              type: "SHOW_STATIC_INDICATOR"
            });
          } catch {}
        }
      } catch (o) {}
      await this.saveToStorage();
    }
  }
  async getGroupMembers(e) {
    const t = await chrome.tabs.query({
      groupId: e
    });
    let r;
    for (const [, o] of this.groupMetadata.entries()) {
      if (o.chromeGroupId === e) {
        r = o;
        break;
      }
    }
    return t.filter(e => e.id !== undefined).map(e => {
      const t = e.id;
      const o = r?.memberStates.get(t);
      return {
        tabId: t,
        url: e.url || "",
        title: e.title || "",
        joinedAt: Date.now(),
        indicatorState: o?.indicatorState || "none"
      };
    });
  }
  async getGroupDetails(e) {
    const t = this.groupMetadata.get(e);
    if (!t) {
      throw new Error(`No group found for main tab ${e}`);
    }
    const r = await this.getGroupMembers(t.chromeGroupId);
    return {
      ...t,
      memberTabs: r
    };
  }
  async findOrphanedTabs() {
    const e = [];
    const t = new Set();
    const r = await chrome.tabs.query({
      groupId: chrome.tabGroups.TAB_GROUP_ID_NONE
    });
    const o = new Set();
    for (const [a] of this.groupMetadata.entries()) {
      o.add(a);
      const e = await this.findGroupByMainTab(a);
      if (e) {
        e.memberTabs.forEach(e => o.add(e.tabId));
      }
    }
    for (const a of r) {
      if (!a.id || t.has(a.id) || o.has(a.id)) {
        continue;
      }
      t.add(a.id);
      if (a.openerTabId && o.has(a.openerTabId) && a.url && !a.url.startsWith("chrome://") && !a.url.startsWith("chrome-extension://") && a.url !== "about:blank") {
        e.push({
          tabId: a.id,
          url: a.url || "",
          title: a.title || "",
          openerTabId: a.openerTabId,
          detectedAt: Date.now()
        });
      }
    }
    return e;
  }
  async reconcileWithChrome() {
    const e = await chrome.tabs.query({});
    const t = new Set();
    for (const a of e) {
      if (a.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
        t.add(a.groupId);
      }
    }
    const r = [];
    let o = false;
    for (const [a, n] of this.groupMetadata.entries()) {
      try {
        const e = await chrome.tabs.get(a);
        if (t.has(n.chromeGroupId)) {
          if (e.groupId !== n.chromeGroupId) {
            r.push(a);
          } else {
            const e = await chrome.tabs.query({
              groupId: n.chromeGroupId
            });
            const t = new Set(e.map(e => e.id).filter(e => e !== undefined));
            const r = [];
            for (const [o] of n.memberStates) {
              if (!t.has(o)) {
                r.push(o);
              }
            }
            if (r.length > 0) {
              for (const e of r) {
                n.memberStates.delete(e);
                try {
                  await this.sendIndicatorMessage(e, "HIDE_AGENT_INDICATORS");
                } catch {}
              }
              o = true;
            }
          }
        } else {
          r.push(a);
        }
      } catch {
        r.push(a);
      }
    }
    for (const a of r) {
      this.groupMetadata.delete(a);
    }
    if (r.length > 0 || o) {
      await this.saveToStorage();
    }
  }
  async getAllGroups() {
    await this.initialize();
    const e = [];
    for (const [r, o] of this.groupMetadata.entries()) {
      try {
        const t = await this.getGroupMembers(o.chromeGroupId);
        e.push({
          ...o,
          memberTabs: t
        });
      } catch (t) {}
    }
    return e;
  }
  async findGroupByTab(e) {
    await this.initialize();
    const t = this.groupMetadata.get(e);
    if (t) {
      const e = await this.getGroupMembers(t.chromeGroupId);
      return {
        ...t,
        memberTabs: e
      };
    }
    const r = await chrome.tabs.get(e);
    if (r.groupId === chrome.tabGroups.TAB_GROUP_ID_NONE) {
      return null;
    }
    for (const [, n] of this.groupMetadata.entries()) {
      if (n.chromeGroupId === r.groupId) {
        const e = await this.getGroupMembers(n.chromeGroupId);
        return {
          ...n,
          memberTabs: e
        };
      }
    }
    const o = await chrome.tabs.query({
      groupId: r.groupId
    });
    if (o.length === 0) {
      return null;
    }
    o.sort((e, t) => e.index - t.index);
    const a = o[0];
    if (!a.id || !a.url) {
      return null;
    }
    return {
      mainTabId: a.id,
      createdAt: Date.now(),
      domain: new URL(a.url).hostname,
      chromeGroupId: r.groupId,
      memberStates: new Map(),
      memberTabs: o.filter(e => e.id !== undefined).map(e => ({
        tabId: e.id,
        url: e.url || "",
        title: e.title || "",
        joinedAt: Date.now()
      })),
      isUnmanaged: true
    };
  }
  async findGroupByMainTab(e) {
    await this.initialize();
    const t = this.groupMetadata.get(e);
    if (!t) {
      return null;
    }
    try {
      const e = await this.getGroupMembers(t.chromeGroupId);
      return {
        ...t,
        memberTabs: e
      };
    } catch (r) {
      return null;
    }
  }
  async isInGroup(e) {
    return (await this.findGroupByTab(e)) !== null;
  }
  isMainTab(e) {
    return this.groupMetadata.has(e);
  }
  async getMainTabId(e) {
    const t = await this.findGroupByTab(e);
    return t?.mainTabId || null;
  }
  async promoteToMainTab(e, t) {
    const r = this.groupMetadata.get(e);
    if (!r) {
      throw new Error(`No group found for main tab ${e}`);
    }
    if ((await chrome.tabs.get(t)).groupId !== r.chromeGroupId) {
      throw new Error(`Tab ${t} is not in the same group as ${e}`);
    }
    const o = r.memberStates.get(e) || {
      indicatorState: "none"
    };
    try {
      await chrome.tabs.get(e);
      if (o.indicatorState === "pulsing") {
        await this.sendIndicatorMessage(e, "HIDE_AGENT_INDICATORS");
      }
    } catch {}
    r.memberStates.get(t);
    r.mainTabId = t;
    try {
      await this.sendIndicatorMessage(t, "HIDE_STATIC_INDICATOR");
      r.memberStates.delete(t);
    } catch (a) {}
    if (o.indicatorState === "pulsing") {
      r.memberStates.set(t, {
        indicatorState: "pulsing"
      });
      await this.sendIndicatorMessage(t, "SHOW_AGENT_INDICATORS");
    } else {
      r.memberStates.set(t, {
        indicatorState: "none"
      });
    }
    this.groupMetadata.delete(e);
    this.groupMetadata.set(t, r);
    await this.saveToStorage();
  }
  async deleteGroup(e) {
    const t = this.groupMetadata.get(e);
    if (t) {
      try {
        const e = await chrome.tabs.query({
          groupId: t.chromeGroupId
        });
        const o = e.map(e => e.id).filter(e => e !== undefined);
        if (o.length > 0) {
          try {
            for (const t of e) {
              if (t.id) {
                try {
                  await chrome.tabs.sendMessage(t.id, {
                    type: "HIDE_AGENT_INDICATORS"
                  });
                  await chrome.tabs.sendMessage(t.id, {
                    type: "HIDE_STATIC_INDICATOR"
                  });
                } catch {}
              }
            }
          } catch (r) {}
        }
        await new Promise(e => setTimeout(e, 100));
        if (o.length > 0) {
          await chrome.tabs.ungroup(o);
        }
      } catch (r) {}
      this.groupMetadata.delete(e);
      await this.saveToStorage();
    }
  }
  async clearAllGroups() {
    const e = Array.from(this.groupMetadata.keys());
    for (const t of e) {
      await this.deleteGroup(t);
    }
    this.groupMetadata.clear();
    await this.saveToStorage();
  }
  async clearAll() {
    await this.clearAllGroups();
    this.initialized = false;
  }
  async handleTabClosed(e) {
    if (this.groupMetadata.has(e)) {
      await this.deleteGroup(e);
    }
  }
  async getGroup(e) {
    return (await this.findGroupByMainTab(e)) || undefined;
  }
  async updateTabBlocklistStatus(e, t) {
    const r = await this.findGroupByTab(e);
    if (!r) {
      return;
    }
    const o = t.includes("blocked.html");
    const a = o ? "category1" : await O.getCategory(t);
    await this.updateGroupBlocklistStatus(r.chromeGroupId, e, a, o);
  }
  async removeTabFromBlocklistTracking(e, t) {
    const r = this.groupBlocklistStatuses.get(e);
    if (r) {
      r.categoriesByTab.delete(t);
      r.blockedHtmlTabs.delete(t);
      await this.recalculateGroupBlocklistStatus(e);
    }
  }
  async updateGroupBlocklistStatus(e, t, r, o = false) {
    let a = this.groupBlocklistStatuses.get(e);
    if (!a) {
      a = {
        groupId: e,
        mostRestrictiveCategory: undefined,
        categoriesByTab: new Map(),
        blockedHtmlTabs: new Set(),
        lastChecked: Date.now()
      };
      this.groupBlocklistStatuses.set(e, a);
    }
    a.categoriesByTab.set(t, r);
    if (o) {
      a.blockedHtmlTabs.add(t);
    } else {
      a.blockedHtmlTabs.delete(t);
    }
    await this.recalculateGroupBlocklistStatus(e);
  }
  async recalculateGroupBlocklistStatus(e) {
    const t = this.groupBlocklistStatuses.get(e);
    if (!t) {
      return;
    }
    const r = t.mostRestrictiveCategory;
    const o = Array.from(t.categoriesByTab.values());
    t.mostRestrictiveCategory = this.getMostRestrictiveCategory(o);
    t.lastChecked = Date.now();
    if (r !== t.mostRestrictiveCategory) {
      this.notifyBlocklistListeners(e, t.mostRestrictiveCategory);
    }
  }
  getMostRestrictiveCategory(e) {
    const t = {
      category3: 2,
      category2: 3,
      category_org_blocked: 3,
      category1: 4,
      category0: 1
    };
    let r;
    let o = 0;
    for (const a of e) {
      if (a && t[a] > o) {
        o = t[a];
        r = a;
      }
    }
    return r;
  }
  async getGroupBlocklistStatus(e) {
    await this.initialize();
    const t = await this.findGroupByMainTab(e);
    if (!t) {
      const t = await chrome.tabs.get(e);
      return await O.getCategory(t.url || "");
    }
    const r = this.groupBlocklistStatuses.get(t.chromeGroupId);
    if (!r || Date.now() - r.lastChecked > 5000) {
      await this.checkAllTabsInGroupForBlocklist(t.chromeGroupId);
    }
    return this.groupBlocklistStatuses.get(t.chromeGroupId)?.mostRestrictiveCategory;
  }
  async getBlockedTabsInfo(e) {
    await this.initialize();
    const t = await this.findGroupByMainTab(e);
    const r = [];
    let o = false;
    if (!t) {
      const t = await chrome.tabs.get(e);
      if (t.url?.includes("blocked.html")) {
        o = true;
        r.push({
          tabId: e,
          title: t.title || "Untitled",
          url: t.url || "",
          category: "category1"
        });
      } else {
        const a = await O.getCategory(t.url || "");
        if (a && a !== "category0") {
          o = true;
          r.push({
            tabId: e,
            title: t.title || "Untitled",
            url: t.url || "",
            category: a
          });
        }
      }
      return {
        isMainTabBlocked: o,
        blockedTabs: r
      };
    }
    const a = this.groupBlocklistStatuses.get(t.chromeGroupId);
    if (!a || Date.now() - a.lastChecked > 5000) {
      await this.checkAllTabsInGroupForBlocklist(t.chromeGroupId);
    }
    const n = this.groupBlocklistStatuses.get(t.chromeGroupId);
    if (!n) {
      return {
        isMainTabBlocked: o,
        blockedTabs: r
      };
    }
    for (const s of n.blockedHtmlTabs) {
      try {
        const t = await chrome.tabs.get(s);
        r.push({
          tabId: s,
          title: t.title || "Untitled",
          url: t.url || "",
          category: "category1"
        });
        if (s === e) {
          o = true;
        }
      } catch {}
    }
    for (const [s, i] of n.categoriesByTab.entries()) {
      if (i && (i === "category1" || i === "category2" || i === "category_org_blocked") && !n.blockedHtmlTabs.has(s)) {
        try {
          const t = await chrome.tabs.get(s);
          r.push({
            tabId: s,
            title: t.title || "Untitled",
            url: t.url || "",
            category: i
          });
          if (s === e) {
            o = true;
          }
        } catch {}
      }
    }
    return {
      isMainTabBlocked: o,
      blockedTabs: r
    };
  }
  async checkAllTabsInGroupForBlocklist(e) {
    const t = await chrome.tabs.query({
      groupId: e
    });
    const r = {
      groupId: e,
      mostRestrictiveCategory: undefined,
      categoriesByTab: new Map(),
      blockedHtmlTabs: new Set(),
      lastChecked: Date.now()
    };
    for (const o of t) {
      if (o.id && o.url) {
        if (o.url.includes("blocked.html")) {
          r.blockedHtmlTabs.add(o.id);
          r.categoriesByTab.set(o.id, "category1");
        } else {
          const e = await O.getCategory(o.url);
          r.categoriesByTab.set(o.id, e);
        }
      }
    }
    r.mostRestrictiveCategory = this.getMostRestrictiveCategory(Array.from(r.categoriesByTab.values()));
    this.groupBlocklistStatuses.set(e, r);
    this.notifyBlocklistListeners(e, r.mostRestrictiveCategory);
  }
  addBlocklistListener(e) {
    this.blocklistListeners.add(e);
  }
  removeBlocklistListener(e) {
    this.blocklistListeners.delete(e);
  }
  notifyBlocklistListeners(e, t) {
    for (const o of this.blocklistListeners) {
      try {
        o(e, t);
      } catch (r) {}
    }
  }
  clearBlocklistCache() {
    this.groupBlocklistStatuses.clear();
  }
  async isTabInSameGroup(e, t) {
    try {
      await this.initialize();
      const r = await this.getMainTabId(e);
      if (!r) {
        return e === t;
      }
      return r === (await this.getMainTabId(t));
    } catch (r) {
      return false;
    }
  }
  async getValidTabIds(e) {
    try {
      await this.initialize();
      const t = await this.getMainTabId(e);
      if (!t) {
        return [e];
      }
      return (await this.getGroupDetails(t)).memberTabs.map(e => e.tabId);
    } catch (t) {
      return [e];
    }
  }
  async getValidTabsWithMetadata(e) {
    try {
      const t = await this.getValidTabIds(e);
      return await Promise.all(t.map(async e => {
        try {
          const t = await chrome.tabs.get(e);
          return {
            id: e,
            title: t.title || "Untitled",
            url: t.url || ""
          };
        } catch (t) {
          return {
            id: e,
            title: "Error loading tab",
            url: ""
          };
        }
      }));
    } catch (t) {
      try {
        const t = await chrome.tabs.get(e);
        return [{
          id: e,
          title: t.title || "Untitled",
          url: t.url || ""
        }];
      } catch {
        return [{
          id: e,
          title: "Error loading tab",
          url: ""
        }];
      }
    }
  }
  async getEffectiveTabId(e, t) {
    if (e === undefined) {
      return t;
    }
    if (!(await this.isTabInSameGroup(t, e))) {
      const r = await this.getValidTabIds(t);
      throw new Error(`Tab ${e} is not in the same group as the current tab. Valid tab IDs are: ${r.join(", ")}`);
    }
    return e;
  }
  async setTabIndicatorState(e, t, r) {
    let o;
    let a = false;
    for (const [, n] of this.groupMetadata.entries()) {
      if ((await this.getGroupMembers(n.chromeGroupId)).some(t => t.tabId === e)) {
        o = n.chromeGroupId;
        if (t === "static" && (await this.isGroupDismissed(o))) {
          return;
        }
        const s = n.memberStates.get(e);
        n.memberStates.set(e, {
          indicatorState: t,
          previousIndicatorState: s?.indicatorState,
          isMcp: r ?? s?.isMcp
        });
        a = true;
        break;
      }
    }
    this.queueIndicatorUpdate(e, t);
  }
  async setGroupIndicatorState(e, t) {
    const r = await this.getGroupDetails(e);
    if (t === "pulsing") {
      await this.setTabIndicatorState(e, "pulsing");
    } else {
      await this.setTabIndicatorState(e, t);
    }
    for (const o of r.memberTabs) {
      if (o.tabId !== e) {
        const e = t === "none" ? "none" : "static";
        await this.setTabIndicatorState(o.tabId, e);
      }
    }
  }
  getTabIndicatorState(e) {
    for (const [, t] of this.groupMetadata.entries()) {
      const r = t.memberStates.get(e);
      if (r) {
        return r.indicatorState;
      }
    }
    return "none";
  }
  async showSecondaryTabIndicators(e) {
    const t = await this.getGroupDetails(e);
    if (!(await this.isGroupDismissed(t.chromeGroupId))) {
      for (const r of t.memberTabs) {
        if (r.tabId !== e) {
          await this.setTabIndicatorState(r.tabId, "static");
        }
      }
      await this.processIndicatorQueue();
    }
  }
  async showStaticIndicatorsForChromeGroup(e) {
    if (await this.isGroupDismissed(e)) {
      return;
    }
    const t = await chrome.tabs.query({
      groupId: e
    });
    if (t.length === 0) {
      return;
    }
    let r;
    for (const [a, n] of this.groupMetadata.entries()) {
      if (n.chromeGroupId === e) {
        r = a;
        break;
      }
    }
    if (!r) {
      t.sort((e, t) => e.index - t.index);
      r = t[0].id;
    }
    for (const a of t) {
      if (a.id && a.id !== r) {
        try {
          await chrome.tabs.sendMessage(a.id, {
            type: "SHOW_STATIC_INDICATOR"
          });
        } catch (o) {}
      }
    }
  }
  async hideSecondaryTabIndicators(e) {
    try {
      const t = await this.getGroupDetails(e);
      for (const r of t.memberTabs) {
        if (r.tabId !== e) {
          await this.setTabIndicatorState(r.tabId, "none");
        }
      }
      await this.processIndicatorQueue();
    } catch (t) {}
  }
  async hideIndicatorForToolUse(e) {
    try {
      const t = this.getTabIndicatorState(e);
      for (const [, r] of this.groupMetadata.entries()) {
        const o = r.memberStates.get(e);
        if (o) {
          o.previousIndicatorState = t;
          o.indicatorState = "hidden_for_screenshot";
          break;
        }
      }
      await this.sendIndicatorMessage(e, "HIDE_FOR_TOOL_USE");
    } catch (t) {}
  }
  async restoreIndicatorAfterToolUse(e) {
    try {
      for (const [, t] of this.groupMetadata.entries()) {
        const r = t.memberStates.get(e);
        if (r && r.previousIndicatorState !== undefined) {
          const o = r.previousIndicatorState;
          r.indicatorState = o;
          delete r.previousIndicatorState;
          if (o === "static") {
            if (await this.isGroupDismissed(t.chromeGroupId)) {
              return;
            }
          }
          let a;
          switch (o) {
            case "pulsing":
              a = "SHOW_AGENT_INDICATORS";
              break;
            case "static":
              a = "SHOW_STATIC_INDICATOR";
              break;
            case "none":
              return;
            default:
              a = "SHOW_AFTER_TOOL_USE";
          }
          await this.sendIndicatorMessage(e, a);
          break;
        }
      }
    } catch (t) {}
  }
  async startRunning(e) {
    await this.setGroupIndicatorState(e, "pulsing");
  }
  async stopRunning() {
    for (const [, e] of this.groupMetadata.entries()) {
      for (const [t] of e.memberStates) {
        await this.setTabIndicatorState(t, "none");
      }
    }
    await this.processIndicatorQueue();
  }
  async updateGroupTitle(e, t, r = false) {
    if (!t || t.trim() === "") {
      return;
    }
    const o = this.groupMetadata.get(e);
    if (o) {
      try {
        const e = (await chrome.tabGroups.get(o.chromeGroupId)).title;
        if (e !== L && e !== LEGACY_DEFAULT_GROUP_TITLE) {
          return;
        }
        const a = (await chrome.tabGroups.query({})).filter(e => e.id !== o.chromeGroupId).map(e => e.color);
        const n = [chrome.tabGroups.Color.GREY, chrome.tabGroups.Color.BLUE, chrome.tabGroups.Color.RED, chrome.tabGroups.Color.YELLOW, chrome.tabGroups.Color.GREEN, chrome.tabGroups.Color.PINK, chrome.tabGroups.Color.PURPLE, chrome.tabGroups.Color.CYAN, chrome.tabGroups.Color.ORANGE];
        const s = n.filter(e => !a.includes(e));
        let i;
        if (s.length > 0) {
          i = s[0];
        } else {
          const e = new Map();
          n.forEach(t => e.set(t, 0));
          a.forEach(t => {
            e.set(t, (e.get(t) || 0) + 1);
          });
          let r = Infinity;
          i = chrome.tabGroups.Color.ORANGE;
          for (const [t, o] of e.entries()) {
            if (o < r) {
              r = o;
              i = t;
            }
          }
        }
        const l = r ? "⌛" + t.trim() : t.trim();
        await chrome.tabGroups.update(o.chromeGroupId, {
          title: l,
          color: i
        });
      } catch (a) {}
    }
  }
  async updateTabGroupPrefix(e, t, r) {
    const o = this.groupMetadata.get(e);
    if (!o) {
      return;
    }
    let a = 0;
    const n = /^(⌛|🔔|✅)/;
    const s = async () => {
      try {
        const e = (await chrome.tabGroups.get(o.chromeGroupId)).title || "";
        if (r && !e.startsWith(r)) {
          return;
        }
        if (t && e.startsWith(t)) {
          return;
        }
        if (!t && !e.match(n)) {
          return;
        }
        const a = e.replace(n, "").trim();
        const s = t ? `${t}${a}` : a;
        await chrome.tabGroups.update(o.chromeGroupId, {
          title: s
        });
      } catch (e) {
        a++;
        if (a <= 3) {
          await new Promise(e => setTimeout(e, 500));
          return s();
        }
      }
    };
    await s();
  }
  async addCompletionPrefix(e) {
    await this.updateTabGroupPrefix(e, "✅");
  }
  async addLoadingPrefix(e) {
    await this.updateTabGroupPrefix(e, "⌛");
  }
  async addPermissionPrefix(e) {
    await this.updateTabGroupPrefix(e, "🔔");
  }
  async removeCompletionPrefix(e) {
    await this.updateTabGroupPrefix(e, null, "✅");
  }
  async removePrefix(e) {
    await this.updateTabGroupPrefix(e, null);
  }
  async addTabToIndicatorGroup(e) {
    const {
      tabId: t,
      isRunning: r,
      isMcp: o
    } = e;
    let a;
    a = this.isMainTab(t) && r ? "pulsing" : "static";
    await this.setTabIndicatorState(t, a, o);
  }
  async getTabForMcp(e, t, r = false) {
    await this.initialize();
    await this.loadMcpTabGroupId();
    if (e !== undefined) {
      try {
        const t = await chrome.tabs.get(e);
        if (t) {
          const o = await this.findGroupByTab(e);
          let a;
          if (o && !r) {
            this.mcpTabGroupId = o.chromeGroupId;
            await this.saveMcpTabGroupId();
            await this.ensureMcpGroupCharacteristics(o.chromeGroupId);
          }
          const n = t.url && !t.url.startsWith("chrome://") ? t.url : undefined;
          if (n) {
            try {
              a = new URL(n).hostname || undefined;
            } catch {}
          }
          return {
            tabId: e,
            domain: a,
            url: n
          };
        }
      } catch {
        throw new Error(`Tab ${e} does not exist`);
      }
    }
    if (t !== undefined) {
      for (const [e, r] of this.groupMetadata.entries()) {
        if (r.chromeGroupId === t) {
          try {
            const t = await chrome.tabs.get(e);
            if (t) {
              const o = t.url && !t.url.startsWith("chrome://") ? t.url : undefined;
              return {
                tabId: e,
                domain: r.domain,
                url: o
              };
            }
          } catch {
            break;
          }
        }
      }
      try {
        const e = await chrome.tabs.query({
          groupId: t
        });
        if (e.length > 0 && e[0].id) {
          let t;
          const r = e[0].url;
          const o = r && !r.startsWith("chrome://") ? r : undefined;
          if (o) {
            try {
              t = new URL(o).hostname || undefined;
            } catch {}
          }
          return {
            tabId: e[0].id,
            domain: t,
            url: o
          };
        }
      } catch (o) {}
      throw new Error(`Could not find tab group ${t}`);
    }
    return {
      tabId: undefined
    };
  }
  async isTabMcp(e) {
    if ((await chrome.storage.local.get(r.MCP_CONNECTED))[r.MCP_CONNECTED] !== true) {
      return false;
    }
    await this.loadMcpTabGroupId();
    if (this.mcpTabGroupId === null) {
      return false;
    }
    for (const [, t] of this.groupMetadata.entries()) {
      if (t.chromeGroupId === this.mcpTabGroupId && t.memberStates.has(e)) {
        return true;
      }
    }
    return false;
  }
  async ensureMcpGroupCharacteristics(e) {
    try {
      const t = await chrome.tabGroups.get(e);
      if (t.title !== q || t.color !== chrome.tabGroups.Color.YELLOW) {
        await chrome.tabGroups.update(e, {
          title: q,
          color: chrome.tabGroups.Color.YELLOW
        });
      }
    } catch (t) {}
  }
  async clearMcpTabGroup() {
    this.mcpTabGroupId = null;
    await chrome.storage.local.remove(this.MCP_TAB_GROUP_KEY);
  }
  async getOrCreateMcpTabContext(e) {
    const {
      createIfEmpty: t = false
    } = e || {};
    await this.loadMcpTabGroupId();
    if (this.mcpTabGroupId !== null) {
      try {
        await chrome.tabGroups.get(this.mcpTabGroupId);
        await this.ensureMcpGroupCharacteristics(this.mcpTabGroupId);
        const e = (await chrome.tabs.query({
          groupId: this.mcpTabGroupId
        })).filter(e => e.id !== undefined).map(e => ({
          id: e.id,
          title: e.title || "",
          url: e.url || ""
        }));
        if (e.length > 0) {
          return {
            currentTabId: e[0].id,
            availableTabs: e,
            tabCount: e.length,
            tabGroupId: this.mcpTabGroupId
          };
        }
      } catch {
        this.mcpTabGroupId = null;
        await this.saveMcpTabGroupId();
      }
    }
    if (t) {
      const e = await chrome.windows.create({
        url: "chrome://newtab",
        focused: true,
        type: "normal"
      });
      const t = e?.tabs?.[0]?.id;
      if (!t) {
        throw new Error("Failed to create window with new tab");
      }
      const r = await this.createGroup(t);
      await chrome.tabGroups.update(r.chromeGroupId, {
        title: q,
        color: chrome.tabGroups.Color.YELLOW
      });
      this.mcpTabGroupId = r.chromeGroupId;
      await this.saveMcpTabGroupId();
      return {
        currentTabId: t,
        availableTabs: [{
          id: t,
          title: "New Tab",
          url: "chrome://newtab"
        }],
        tabCount: 1,
        tabGroupId: r.chromeGroupId
      };
    }
  }
  static SESSION_GROUP_COLORS = [chrome.tabGroups.Color.BLUE, chrome.tabGroups.Color.CYAN, chrome.tabGroups.Color.GREEN, chrome.tabGroups.Color.ORANGE, chrome.tabGroups.Color.RED, chrome.tabGroups.Color.PINK, chrome.tabGroups.Color.PURPLE, chrome.tabGroups.Color.GREY];
  async getOrCreateSessionTabContext(e, t) {
    if (e !== undefined) {
      try {
        await chrome.tabGroups.get(e);
        const r = (await chrome.tabs.query({
          groupId: e
        })).filter(e => e.id !== undefined).map(e => ({
          id: e.id,
          title: e.title || "",
          url: e.url || ""
        }));
        if (r.length > 0) {
          if (t.displayName) {
            await chrome.tabGroups.update(e, {
              title: t.displayName
            });
          }
          return {
            currentTabId: r[0].id,
            availableTabs: r,
            tabCount: r.length,
            tabGroupId: e
          };
        }
      } catch {}
    }
    if (!t.createIfEmpty) {
      return;
    }
    let r;
    try {
      const e = await chrome.windows.getLastFocused({
        windowTypes: ["normal"]
      });
      if (e.id === undefined) {
        throw new Error("no normal window");
      }
      r = e.id;
    } catch {
      const e = await chrome.windows.create({
        url: "chrome://newtab/",
        focused: false,
        type: "normal"
      });
      if (!e?.id || !e.tabs?.[0]?.id) {
        throw new Error("Failed to create fallback window for session group");
      }
      const r = e.tabs[0].id;
      const o = await this.createGroup(r);
      const a = B.SESSION_GROUP_COLORS[t.colorIndex % B.SESSION_GROUP_COLORS.length];
      await chrome.tabGroups.update(o.chromeGroupId, {
        title: t.displayName ?? L,
        color: a
      });
      return {
        currentTabId: r,
        availableTabs: [{
          id: r,
          title: "New Tab",
          url: "chrome://newtab/"
        }],
        tabCount: 1,
        tabGroupId: o.chromeGroupId
      };
    }
    const o = await chrome.tabs.create({
      windowId: r,
      url: "chrome://newtab/",
      active: false
    });
    if (o.id === undefined) {
      throw new Error("Failed to create tab for session group");
    }
    const a = await this.createGroup(o.id);
    const n = B.SESSION_GROUP_COLORS[t.colorIndex % B.SESSION_GROUP_COLORS.length];
    await chrome.tabGroups.update(a.chromeGroupId, {
      title: t.displayName ?? L,
      color: n
    });
    return {
      currentTabId: o.id,
      availableTabs: [{
        id: o.id,
        title: "New Tab",
        url: "chrome://newtab/"
      }],
      tabCount: 1,
      tabGroupId: a.chromeGroupId
    };
  }
  async saveMcpTabGroupId() {
    await chrome.storage.local.set({
      [this.MCP_TAB_GROUP_KEY]: this.mcpTabGroupId
    });
  }
  async loadMcpTabGroupId() {
    try {
      const e = (await chrome.storage.local.get(this.MCP_TAB_GROUP_KEY))[this.MCP_TAB_GROUP_KEY];
      if (typeof e == "number") {
        try {
          await chrome.tabGroups.get(e);
          this.mcpTabGroupId = e;
          return;
        } catch {}
      }
      const t = await this.findMcpTabGroupByCharacteristics();
      if (t !== null) {
        this.mcpTabGroupId = t;
        await this.saveMcpTabGroupId();
        return;
      }
      this.mcpTabGroupId = null;
    } catch (e) {
      this.mcpTabGroupId = null;
    }
  }
  async findMcpTabGroupByCharacteristics() {
    try {
      const e = await chrome.tabGroups.query({});
      for (const t of e) {
        if (t.color === chrome.tabGroups.Color.YELLOW && t.title?.includes(q)) {
          if ((await chrome.tabs.query({
            groupId: t.id
          })).length > 0) {
            return t.id;
          }
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  queueIndicatorUpdate(e, t) {
    for (const [, r] of this.groupMetadata.entries()) {
      const o = r.memberStates.get(e);
      if (o) {
        o.pendingUpdate = t;
        break;
      }
    }
    if (this.indicatorUpdateTimer) {
      clearTimeout(this.indicatorUpdateTimer);
    }
    this.indicatorUpdateTimer = setTimeout(() => {
      this.processIndicatorQueue();
    }, this.INDICATOR_UPDATE_DELAY);
  }
  async processIndicatorQueue() {
    for (const [, e] of this.groupMetadata.entries()) {
      for (const [t, r] of e.memberStates) {
        if (r.pendingUpdate) {
          let e;
          switch (r.pendingUpdate) {
            case "pulsing":
              e = "SHOW_AGENT_INDICATORS";
              break;
            case "static":
              e = "SHOW_STATIC_INDICATOR";
              break;
            case "none":
              e = "HIDE_AGENT_INDICATORS";
              break;
            default:
              continue;
          }
          await this.sendIndicatorMessage(t, e, r.isMcp);
          delete r.pendingUpdate;
        }
      }
    }
  }
  async sendIndicatorMessage(e, t, r) {
    try {
      await chrome.tabs.sendMessage(e, {
        type: t,
        isMcp: r
      });
    } catch (o) {
      const a = o && typeof o.message == "string" ? o.message : typeof o == "string" ? o : "";
      if (a.includes("Receiving end does not exist") || a.includes("message channel closed") || a.includes("The tab was closed")) {
        return;
      }
      throw o;
    }
  }
}
const F = B.getInstance();
globalThis.__cdpDebuggerListenerRegistered ||= false;
globalThis.__cdpConsoleMessagesByTab ||= new Map();
globalThis.__cdpNetworkRequestsByTab ||= new Map();
globalThis.__cdpNetworkTrackingEnabled ||= new Set();
globalThis.__cdpConsoleTrackingEnabled ||= new Set();
globalThis.__cdpBeforeunloadPolicyByTab ||= new Map();
globalThis.__cdpBeforeunloadOutcomeByTab ||= new Map();
globalThis.__cdpBeforeunloadWaitersByTab ||= new Map();
globalThis.__cdpRecentCaptureAttempts ||= new Map();
globalThis.__cdpScreencastActiveTabs ||= new Set();
const W = {
  backspace: "deleteBackward",
  enter: "insertNewline",
  numpadenter: "insertNewline",
  kp_enter: "insertNewline",
  escape: "cancelOperation",
  arrowup: "moveUp",
  arrowdown: "moveDown",
  arrowleft: "moveLeft",
  arrowRight: "moveRight",
  up: "moveUp",
  down: "moveDown",
  left: "moveLeft",
  right: "moveRight",
  f5: "complete",
  delete: "deleteForward",
  home: "scrollToBeginningOfDocument",
  end: "scrollToEndOfDocument",
  pageup: "scrollPageUp",
  pagedown: "scrollPageDown",
  "shift+backspace": "deleteBackward",
  "shift+enter": "insertNewline",
  "shift+escape": "cancelOperation",
  "shift+arrowup": "moveUpAndModifySelection",
  "shift+arrowdown": "moveDownAndModifySelection",
  "shift+arrowleft": "moveLeftAndModifySelection",
  "shift+arrowright": "moveRightAndModifySelection",
  "shift+up": "moveUpAndModifySelection",
  "shift+down": "moveDownAndModifySelection",
  "shift+left": "moveLeftAndModifySelection",
  "shift+right": "moveRightAndModifySelection",
  "shift+f5": "complete",
  "shift+delete": "deleteForward",
  "shift+home": "moveToBeginningOfDocumentAndModifySelection",
  "shift+end": "moveToEndOfDocumentAndModifySelection",
  "shift+pageup": "pageUpAndModifySelection",
  "shift+pagedown": "pageDownAndModifySelection",
  "shift+numpad5": "delete",
  "ctrl+tab": "selectNextKeyView",
  "ctrl+enter": "insertLineBreak",
  "ctrl+numpadenter": "insertLineBreak",
  "ctrl+kp_enter": "insertLineBreak",
  "ctrl+quote": "insertSingleQuoteIgnoringSubstitution",
  "ctrl+'": "insertSingleQuoteIgnoringSubstitution",
  "ctrl+a": "moveToBeginningOfParagraph",
  "ctrl+b": "moveBackward",
  "ctrl+d": "deleteForward",
  "ctrl+e": "moveToEndOfParagraph",
  "ctrl+f": "moveForward",
  "ctrl+h": "deleteBackward",
  "ctrl+k": "deleteToEndOfParagraph",
  "ctrl+l": "centerSelectionInVisibleArea",
  "ctrl+n": "moveDown",
  "ctrl+p": "moveUp",
  "ctrl+t": "transpose",
  "ctrl+v": "moveUp",
  "ctrl+y": "yank",
  "ctrl+o": ["insertNewlineIgnoringFieldEditor", "moveBackward"],
  "ctrl+backspace": "deleteBackwardByDecomposingPreviousCharacter",
  "ctrl+arrowup": "scrollPageUp",
  "ctrl+arrowdown": "scrollPageDown",
  "ctrl+arrowleft": "moveToLeftEndOfLine",
  "ctrl+arrowright": "moveToRightEndOfLine",
  "ctrl+up": "scrollPageUp",
  "ctrl+down": "scrollPageDown",
  "ctrl+left": "moveToLeftEndOfLine",
  "ctrl+right": "moveToRightEndOfLine",
  "shift+ctrl+enter": "insertLineBreak",
  "shift+control+numpadenter": "insertLineBreak",
  "shift+control+kp_enter": "insertLineBreak",
  "shift+ctrl+tab": "selectPreviousKeyView",
  "shift+ctrl+quote": "insertDoubleQuoteIgnoringSubstitution",
  "shift+ctrl+'": "insertDoubleQuoteIgnoringSubstitution",
  "ctrl+\"": "insertDoubleQuoteIgnoringSubstitution",
  "shift+ctrl+a": "moveToBeginningOfParagraphAndModifySelection",
  "shift+ctrl+b": "moveBackwardAndModifySelection",
  "shift+ctrl+e": "moveToEndOfParagraphAndModifySelection",
  "shift+ctrl+f": "moveForwardAndModifySelection",
  "shift+ctrl+n": "moveDownAndModifySelection",
  "shift+ctrl+p": "moveUpAndModifySelection",
  "shift+ctrl+v": "pageDownAndModifySelection",
  "shift+ctrl+backspace": "deleteBackwardByDecomposingPreviousCharacter",
  "shift+ctrl+arrowup": "scrollPageUp",
  "shift+ctrl+arrowdown": "scrollPageDown",
  "shift+ctrl+arrowleft": "moveToLeftEndOfLineAndModifySelection",
  "shift+ctrl+arrowright": "moveToRightEndOfLineAndModifySelection",
  "shift+ctrl+up": "scrollPageUp",
  "shift+ctrl+down": "scrollPageDown",
  "shift+ctrl+left": "moveToLeftEndOfLineAndModifySelection",
  "shift+ctrl+right": "moveToRightEndOfLineAndModifySelection",
  "alt+backspace": "deleteWordBackward",
  "alt+enter": "insertNewlineIgnoringFieldEditor",
  "alt+numpadenter": "insertNewlineIgnoringFieldEditor",
  "alt+kp_enter": "insertNewlineIgnoringFieldEditor",
  "alt+escape": "complete",
  "alt+arrowup": ["moveBackward", "moveToBeginningOfParagraph"],
  "alt+arrowdown": ["moveForward", "moveToEndOfParagraph"],
  "alt+arrowleft": "moveWordLeft",
  "alt+arrowright": "moveWordRight",
  "alt+up": ["moveBackward", "moveToBeginningOfParagraph"],
  "alt+down": ["moveForward", "moveToEndOfParagraph"],
  "alt+left": "moveWordLeft",
  "alt+right": "moveWordRight",
  "alt+delete": "deleteWordForward",
  "alt+pageup": "pageUp",
  "alt+pagedown": "pageDown",
  "shift+alt+backspace": "deleteWordBackward",
  "shift+alt+enter": "insertNewlineIgnoringFieldEditor",
  "shift+alt+numpadenter": "insertNewlineIgnoringFieldEditor",
  "shift+alt+kp_enter": "insertNewlineIgnoringFieldEditor",
  "shift+alt+escape": "complete",
  "shift+alt+arrowup": "moveParagraphBackwardAndModifySelection",
  "shift+alt+arrowdown": "moveParagraphForwardAndModifySelection",
  "shift+alt+arrowleft": "moveWordLeftAndModifySelection",
  "shift+alt+arrowright": "moveWordRightAndModifySelection",
  "shift+alt+up": "moveParagraphBackwardAndModifySelection",
  "shift+alt+down": "moveParagraphForwardAndModifySelection",
  "shift+alt+left": "moveWordLeftAndModifySelection",
  "shift+alt+right": "moveWordRightAndModifySelection",
  "shift+alt+delete": "deleteWordForward",
  "shift+alt+pageup": "pageUp",
  "shift+alt+pagedown": "pageDown",
  "ctrl+alt+b": "moveWordBackward",
  "ctrl+alt+f": "moveWordForward",
  "ctrl+alt+backspace": "deleteWordBackward",
  "shift+ctrl+alt+b": "moveWordBackwardAndModifySelection",
  "shift+ctrl+alt+f": "moveWordForwardAndModifySelection",
  "shift+ctrl+alt+backspace": "deleteWordBackward",
  "cmd+numpadsubtract": "cancel",
  "cmd+backspace": "deleteToBeginningOfLine",
  "cmd+arrowup": "moveToBeginningOfDocument",
  "cmd+arrowdown": "moveToEndOfDocument",
  "cmd+arrowleft": "moveToLeftEndOfLine",
  "cmd+arrowright": "moveToRightEndOfLine",
  "cmd+home": "moveToBeginningOfDocument",
  "cmd+up": "moveToBeginningOfDocument",
  "cmd+down": "moveToEndOfDocument",
  "cmd+left": "moveToLeftEndOfLine",
  "cmd+right": "moveToRightEndOfLine",
  "shift+cmd+numpadsubtract": "cancel",
  "shift+cmd+backspace": "deleteToBeginningOfLine",
  "shift+cmd+arrowup": "moveToBeginningOfDocumentAndModifySelection",
  "shift+cmd+arrowdown": "moveToEndOfDocumentAndModifySelection",
  "shift+cmd+arrowleft": "moveToLeftEndOfLineAndModifySelection",
  "shift+cmd+arrowright": "moveToRightEndOfLineAndModifySelection",
  "cmd+a": "selectAll",
  "cmd+c": "copy",
  "cmd+x": "cut",
  "cmd+v": "paste",
  "cmd+z": "undo",
  "shift+cmd+z": "redo"
};
const j = {
  enter: {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    text: "\r"
  },
  return: {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    text: "\r"
  },
  kp_enter: {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    text: "\r",
    isKeypad: true
  },
  tab: {
    key: "Tab",
    code: "Tab",
    keyCode: 9
  },
  delete: {
    key: "Delete",
    code: "Delete",
    keyCode: 46
  },
  backspace: {
    key: "Backspace",
    code: "Backspace",
    keyCode: 8
  },
  escape: {
    key: "Escape",
    code: "Escape",
    keyCode: 27
  },
  esc: {
    key: "Escape",
    code: "Escape",
    keyCode: 27
  },
  space: {
    key: " ",
    code: "Space",
    keyCode: 32,
    text: " "
  },
  " ": {
    key: " ",
    code: "Space",
    keyCode: 32,
    text: " "
  },
  arrowup: {
    key: "ArrowUp",
    code: "ArrowUp",
    keyCode: 38
  },
  arrowdown: {
    key: "ArrowDown",
    code: "ArrowDown",
    keyCode: 40
  },
  arrowleft: {
    key: "ArrowLeft",
    code: "ArrowLeft",
    keyCode: 37
  },
  arrowright: {
    key: "ArrowRight",
    code: "ArrowRight",
    keyCode: 39
  },
  up: {
    key: "ArrowUp",
    code: "ArrowUp",
    keyCode: 38
  },
  down: {
    key: "ArrowDown",
    code: "ArrowDown",
    keyCode: 40
  },
  left: {
    key: "ArrowLeft",
    code: "ArrowLeft",
    keyCode: 37
  },
  right: {
    key: "ArrowRight",
    code: "ArrowRight",
    keyCode: 39
  },
  home: {
    key: "Home",
    code: "Home",
    keyCode: 36
  },
  end: {
    key: "End",
    code: "End",
    keyCode: 35
  },
  pageup: {
    key: "PageUp",
    code: "PageUp",
    keyCode: 33
  },
  pagedown: {
    key: "PageDown",
    code: "PageDown",
    keyCode: 34
  },
  f1: {
    key: "F1",
    code: "F1",
    keyCode: 112
  },
  f2: {
    key: "F2",
    code: "F2",
    keyCode: 113
  },
  f3: {
    key: "F3",
    code: "F3",
    keyCode: 114
  },
  f4: {
    key: "F4",
    code: "F4",
    keyCode: 115
  },
  f5: {
    key: "F5",
    code: "F5",
    keyCode: 116
  },
  f6: {
    key: "F6",
    code: "F6",
    keyCode: 117
  },
  f7: {
    key: "F7",
    code: "F7",
    keyCode: 118
  },
  f8: {
    key: "F8",
    code: "F8",
    keyCode: 119
  },
  f9: {
    key: "F9",
    code: "F9",
    keyCode: 120
  },
  f10: {
    key: "F10",
    code: "F10",
    keyCode: 121
  },
  f11: {
    key: "F11",
    code: "F11",
    keyCode: 122
  },
  f12: {
    key: "F12",
    code: "F12",
    keyCode: 123
  },
  ";": {
    key: ";",
    code: "Semicolon",
    keyCode: 186,
    text: ";"
  },
  "=": {
    key: "=",
    code: "Equal",
    keyCode: 187,
    text: "="
  },
  ",": {
    key: ",",
    code: "Comma",
    keyCode: 188,
    text: ","
  },
  "-": {
    key: "-",
    code: "Minus",
    keyCode: 189,
    text: "-"
  },
  ".": {
    key: ".",
    code: "Period",
    keyCode: 190,
    text: "."
  },
  "/": {
    key: "/",
    code: "Slash",
    keyCode: 191,
    text: "/"
  },
  "`": {
    key: "`",
    code: "Backquote",
    keyCode: 192,
    text: "`"
  },
  "[": {
    key: "[",
    code: "BracketLeft",
    keyCode: 219,
    text: "["
  },
  "\\": {
    key: "\\",
    code: "Backslash",
    keyCode: 220,
    text: "\\"
  },
  "]": {
    key: "]",
    code: "BracketRight",
    keyCode: 221,
    text: "]"
  },
  "'": {
    key: "'",
    code: "Quote",
    keyCode: 222,
    text: "'"
  },
  "!": {
    key: "!",
    code: "Digit1",
    keyCode: 49,
    text: "!"
  },
  "@": {
    key: "@",
    code: "Digit2",
    keyCode: 50,
    text: "@"
  },
  "#": {
    key: "#",
    code: "Digit3",
    keyCode: 51,
    text: "#"
  },
  $: {
    key: "$",
    code: "Digit4",
    keyCode: 52,
    text: "$"
  },
  "%": {
    key: "%",
    code: "Digit5",
    keyCode: 53,
    text: "%"
  },
  "^": {
    key: "^",
    code: "Digit6",
    keyCode: 54,
    text: "^"
  },
  "&": {
    key: "&",
    code: "Digit7",
    keyCode: 55,
    text: "&"
  },
  "*": {
    key: "*",
    code: "Digit8",
    keyCode: 56,
    text: "*"
  },
  "(": {
    key: "(",
    code: "Digit9",
    keyCode: 57,
    text: "("
  },
  ")": {
    key: ")",
    code: "Digit0",
    keyCode: 48,
    text: ")"
  },
  _: {
    key: "_",
    code: "Minus",
    keyCode: 189,
    text: "_"
  },
  "+": {
    key: "+",
    code: "Equal",
    keyCode: 187,
    text: "+"
  },
  "{": {
    key: "{",
    code: "BracketLeft",
    keyCode: 219,
    text: "{"
  },
  "}": {
    key: "}",
    code: "BracketRight",
    keyCode: 221,
    text: "}"
  },
  "|": {
    key: "|",
    code: "Backslash",
    keyCode: 220,
    text: "|"
  },
  ":": {
    key: ":",
    code: "Semicolon",
    keyCode: 186,
    text: ":"
  },
  "\"": {
    key: "\"",
    code: "Quote",
    keyCode: 222,
    text: "\""
  },
  "<": {
    key: "<",
    code: "Comma",
    keyCode: 188,
    text: "<"
  },
  ">": {
    key: ">",
    code: "Period",
    keyCode: 190,
    text: ">"
  },
  "?": {
    key: "?",
    code: "Slash",
    keyCode: 191,
    text: "?"
  },
  "~": {
    key: "~",
    code: "Backquote",
    keyCode: 192,
    text: "~"
  },
  capslock: {
    key: "CapsLock",
    code: "CapsLock",
    keyCode: 20
  },
  numlock: {
    key: "NumLock",
    code: "NumLock",
    keyCode: 144
  },
  scrolllock: {
    key: "ScrollLock",
    code: "ScrollLock",
    keyCode: 145
  },
  pause: {
    key: "Pause",
    code: "Pause",
    keyCode: 19
  },
  insert: {
    key: "Insert",
    code: "Insert",
    keyCode: 45
  },
  printscreen: {
    key: "PrintScreen",
    code: "PrintScreen",
    keyCode: 44
  },
  numpad0: {
    key: "0",
    code: "Numpad0",
    keyCode: 96,
    isKeypad: true
  },
  numpad1: {
    key: "1",
    code: "Numpad1",
    keyCode: 97,
    isKeypad: true
  },
  numpad2: {
    key: "2",
    code: "Numpad2",
    keyCode: 98,
    isKeypad: true
  },
  numpad3: {
    key: "3",
    code: "Numpad3",
    keyCode: 99,
    isKeypad: true
  },
  numpad4: {
    key: "4",
    code: "Numpad4",
    keyCode: 100,
    isKeypad: true
  },
  numpad5: {
    key: "5",
    code: "Numpad5",
    keyCode: 101,
    isKeypad: true
  },
  numpad6: {
    key: "6",
    code: "Numpad6",
    keyCode: 102,
    isKeypad: true
  },
  numpad7: {
    key: "7",
    code: "Numpad7",
    keyCode: 103,
    isKeypad: true
  },
  numpad8: {
    key: "8",
    code: "Numpad8",
    keyCode: 104,
    isKeypad: true
  },
  numpad9: {
    key: "9",
    code: "Numpad9",
    keyCode: 105,
    isKeypad: true
  },
  numpadmultiply: {
    key: "*",
    code: "NumpadMultiply",
    keyCode: 106,
    isKeypad: true
  },
  numpadadd: {
    key: "+",
    code: "NumpadAdd",
    keyCode: 107,
    isKeypad: true
  },
  numpadsubtract: {
    key: "-",
    code: "NumpadSubtract",
    keyCode: 109,
    isKeypad: true
  },
  numpaddecimal: {
    key: ".",
    code: "NumpadDecimal",
    keyCode: 110,
    isKeypad: true
  },
  numpaddivide: {
    key: "/",
    code: "NumpadDivide",
    keyCode: 111,
    isKeypad: true
  }
};
class H {
  static MAX_LOGS_PER_TAB = 10000;
  static MAX_REQUESTS_PER_TAB = 1000;
  static get debuggerListenerRegistered() {
    return globalThis.__cdpDebuggerListenerRegistered;
  }
  static set debuggerListenerRegistered(e) {
    globalThis.__cdpDebuggerListenerRegistered = e;
  }
  static get consoleMessagesByTab() {
    return globalThis.__cdpConsoleMessagesByTab;
  }
  static get networkRequestsByTab() {
    return globalThis.__cdpNetworkRequestsByTab;
  }
  static get networkTrackingEnabled() {
    return globalThis.__cdpNetworkTrackingEnabled;
  }
  static get consoleTrackingEnabled() {
    return globalThis.__cdpConsoleTrackingEnabled;
  }
  static get beforeunloadPolicyByTab() {
    return globalThis.__cdpBeforeunloadPolicyByTab;
  }
  static get beforeunloadOutcomeByTab() {
    return globalThis.__cdpBeforeunloadOutcomeByTab;
  }
  static get beforeunloadWaitersByTab() {
    return globalThis.__cdpBeforeunloadWaitersByTab;
  }
  static get recentCaptureAttempts() {
    return globalThis.__cdpRecentCaptureAttempts;
  }
  static get screencastActiveTabs() {
    return globalThis.__cdpScreencastActiveTabs;
  }
  isMac = false;
  constructor() {
    this.isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0 || navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;
    this.initializeDebuggerEventListener();
  }
  registerDebuggerEventHandlers() {
    if (!globalThis.__cdpDebuggerEventHandler) {
      globalThis.__cdpDebuggerEventHandler = (e, t, r) => {
        const o = e.tabId;
        if (o) {
          if (t === "Page.screencastFrame") {
            H.screencastActiveTabs.add(o);
            chrome.debugger.sendCommand({
              tabId: o
            }, "Page.screencastFrameAck", {
              sessionId: r.sessionId
            }, () => {
              chrome.runtime.lastError;
            });
            return;
          }
          if (t === "Runtime.consoleAPICalled") {
            const e = {
              type: r.type || "log",
              text: r.args?.map(e => e.value !== undefined ? String(e.value) : e.description || "").join(" "),
              timestamp: r.timestamp || Date.now(),
              url: r.stackTrace?.callFrames?.[0]?.url,
              lineNumber: r.stackTrace?.callFrames?.[0]?.lineNumber,
              columnNumber: r.stackTrace?.callFrames?.[0]?.columnNumber,
              args: r.args
            };
            const t = this.extractDomain(e.url);
            this.addConsoleMessage(o, t, e);
          }
          if (t === "Runtime.exceptionThrown") {
            const e = r.exceptionDetails;
            const t = {
              type: "exception",
              text: e?.exception?.description || e?.text || "Unknown exception",
              timestamp: e?.timestamp || Date.now(),
              url: e?.url,
              lineNumber: e?.lineNumber,
              columnNumber: e?.columnNumber,
              stackTrace: e?.stackTrace?.callFrames?.map(e => `    at ${e.functionName || "<anonymous>"} (${e.url}:${e.lineNumber}:${e.columnNumber})`).join("\n")
            };
            const a = this.extractDomain(t.url);
            this.addConsoleMessage(o, a, t);
          }
          if (t === "Network.requestWillBeSent") {
            const e = r.requestId;
            const t = r.request;
            const a = r.documentURL;
            const n = {
              requestId: e,
              url: t.url,
              method: t.method
            };
            const s = a || t.url;
            const i = this.extractDomain(s);
            this.addNetworkRequest(o, i, n);
          }
          if (t === "Network.responseReceived") {
            const e = r.requestId;
            const t = r.response;
            const a = H.networkRequestsByTab.get(o);
            if (a) {
              const r = a.requests.find(t => t.requestId === e);
              if (r) {
                r.status = t.status;
              }
            }
          }
          if (t === "Network.loadingFailed") {
            const e = r.requestId;
            const t = H.networkRequestsByTab.get(o);
            if (t) {
              const r = t.requests.find(t => t.requestId === e);
              if (r) {
                r.status = 503;
              }
            }
          }
          if (t === "Page.javascriptDialogOpening") {
            const e = r?.type;
            if (e === "beforeunload") {
              const e = (H.beforeunloadPolicyByTab.get(o) ?? "dismiss") === "accept";
              H.beforeunloadPolicyByTab.delete(o);
              H.beforeunloadOutcomeByTab.set(o, {
                action: e ? "accepted" : "dismissed",
                url: r?.url || "",
                timestamp: Date.now()
              });
              if (!e) {
                const e = H.beforeunloadWaitersByTab.get(o);
                if (e) {
                  H.beforeunloadWaitersByTab.delete(o);
                  e();
                }
              }
              chrome.debugger.sendCommand({
                tabId: o
              }, "Page.handleJavaScriptDialog", {
                accept: e
              }, () => {
                chrome.runtime.lastError;
              });
            }
          }
          if (t === "Page.frameNavigated" && !r?.frame?.parentId) {
            const e = H.beforeunloadWaitersByTab.get(o);
            if (e) {
              H.beforeunloadWaitersByTab.delete(o);
              e();
            }
          }
        }
      };
      chrome.debugger.onEvent.addListener(globalThis.__cdpDebuggerEventHandler);
    }
  }
  initializeDebuggerEventListener() {
    if (!H.debuggerListenerRegistered) {
      H.debuggerListenerRegistered = true;
      this.registerDebuggerEventHandlers();
    }
  }
  defaultResizeParams = {
    pxPerToken: 28,
    maxTargetPx: 1568,
    maxTargetTokens: 1568
  };
  static MAX_BASE64_CHARS = 1398100;
  static INITIAL_JPEG_QUALITY = 0.75;
  static JPEG_QUALITY_STEP = 0.05;
  static MIN_JPEG_QUALITY = 0.1;
  async attachDebugger(e) {
    const t = {
      tabId: e
    };
    const r = await chrome.tabs.get(e);
    if (r.url) {
      let e;
      try {
        e = new URL(r.url).protocol;
      } catch {}
      if (e === "chrome:" || e === "chrome-extension:") {
        throw new Error(`Cannot attach debugger to ${e}// pages. Navigate to a regular web page (http:// or https://) first, then retry.`);
      }
    }
    const n = H.networkTrackingEnabled.has(e);
    const s = H.consoleTrackingEnabled.has(e);
    try {
      await this.detachDebugger(e);
    } catch {}
    const i = o();
    let c;
    try {
      await Promise.race([new Promise((e, r) => {
        chrome.debugger.attach(t, "1.3", () => {
          if (chrome.runtime.lastError) {
            r(new Error(chrome.runtime.lastError.message));
          } else {
            e();
          }
        });
      }), new Promise((t, r) => {
        c = setTimeout(() => r(new Error(`debugger_attach_error: chrome.debugger.attach timed out after ${i}ms on tab ${e}. DevTools may be open on this tab, or the renderer may have crashed.`)), i);
      })]);
    } finally {
      if (c !== undefined) {
        clearTimeout(c);
      }
    }
    this.registerDebuggerEventHandlers();
    if (s) {
      try {
        await this.sendCommand(e, "Runtime.enable");
      } catch (l) {}
    }
    if (n) {
      try {
        await this.sendCommand(e, "Network.enable", {
          maxPostDataSize: 65536
        });
      } catch (l) {}
    }
    try {
      await this.sendCommand(e, "Page.enable");
    } catch (l) {}
    if (a()) {
      try {
        await this.sendCommand(e, "Page.startScreencast", {
          format: "jpeg",
          quality: 10,
          maxWidth: 100,
          maxHeight: 100,
          everyNthFrame: 30
        });
        H.screencastActiveTabs.add(e);
      } catch (l) {}
    }
  }
  async detachDebugger(e) {
    if (H.screencastActiveTabs.has(e)) {
      chrome.debugger.sendCommand({
        tabId: e
      }, "Page.stopScreencast", {}, () => {
        chrome.runtime.lastError;
      });
      H.screencastActiveTabs.delete(e);
    }
    return new Promise(t => {
      chrome.debugger.detach({
        tabId: e
      }, () => {
        chrome.runtime.lastError;
        t();
      });
    });
  }
  isScreencastActive(e) {
    return H.screencastActiveTabs.has(e);
  }
  async isDebuggerAttached(e) {
    return new Promise(t => {
      chrome.debugger.getTargets(r => {
        const o = r.find(t => t.tabId === e);
        t(o?.attached ?? false);
      });
    });
  }
  async sendCommandOnce(e, t, r, o = n()) {
    let a;
    try {
      return await Promise.race([new Promise((o, a) => {
        chrome.debugger.sendCommand({
          tabId: e
        }, t, r, e => {
          if (chrome.runtime.lastError) {
            a(new Error(chrome.runtime.lastError.message));
          } else {
            o(e);
          }
        });
      }), new Promise((r, n) => {
        a = setTimeout(() => n(new Error(`CDP sendCommand "${t}" timed out after ${o}ms on tab ${e}. The renderer may be frozen or unresponsive.`)), o);
      })]);
    } finally {
      if (a !== undefined) {
        clearTimeout(a);
      }
    }
  }
  async sendCommand(e, t, r, o) {
    try {
      return await this.sendCommandOnce(e, t, r, o);
    } catch (a) {
      if ((a instanceof Error ? a.message : String(a)).toLowerCase().includes("debugger is not attached")) {
        await this.attachDebugger(e);
        return this.sendCommandOnce(e, t, r, o);
      }
      throw a;
    }
  }
  setBeforeunloadPolicy(e, t) {
    H.beforeunloadPolicyByTab.set(e, t);
    H.beforeunloadOutcomeByTab.delete(e);
    const r = H.beforeunloadWaitersByTab.get(e);
    if (r) {
      H.beforeunloadWaitersByTab.delete(e);
      r();
    }
  }
  waitForBeforeunloadResolution(e, t) {
    if (H.beforeunloadOutcomeByTab.get(e)?.action === "dismissed") {
      return Promise.resolve();
    } else {
      return new Promise(r => {
        let o = false;
        const a = () => {
          if (!o) {
            o = true;
            clearTimeout(n);
            H.beforeunloadWaitersByTab.delete(e);
            r();
          }
        };
        H.beforeunloadWaitersByTab.set(e, a);
        const n = setTimeout(a, t);
      });
    }
  }
  consumeBeforeunloadOutcome(e) {
    const t = H.beforeunloadOutcomeByTab.get(e);
    if (t) {
      H.beforeunloadOutcomeByTab.delete(e);
    }
    H.beforeunloadPolicyByTab.delete(e);
    return t;
  }
  async dispatchMouseEvent(e, t) {
    const r = {
      type: t.type,
      x: Math.round(t.x),
      y: Math.round(t.y),
      modifiers: t.modifiers || 0
    };
    if (t.type === "mousePressed" || t.type === "mouseReleased" || t.type === "mouseMoved") {
      r.button = t.button || "none";
      if (t.type === "mousePressed" || t.type === "mouseReleased") {
        r.clickCount = t.clickCount || 1;
      }
    }
    if (t.type !== "mouseWheel") {
      r.buttons = t.buttons !== undefined ? t.buttons : 0;
    }
    if (t.type === "mouseWheel" && (t.deltaX !== undefined || t.deltaY !== undefined)) {
      Object.assign(r, {
        deltaX: t.deltaX || 0,
        deltaY: t.deltaY || 0
      });
    }
    await this.sendCommand(e, "Input.dispatchMouseEvent", r);
  }
  async dispatchKeyEvent(e, t) {
    const r = {
      modifiers: 0,
      ...t
    };
    await this.sendCommand(e, "Input.dispatchKeyEvent", r);
  }
  async insertText(e, t) {
    await this.sendCommand(e, "Input.insertText", {
      text: t
    });
  }
  async click(e, t, r, o = "left", a = 1, n = 0, s) {
    if (!s?.skipIndicator) {
      await F.hideIndicatorForToolUse(e);
      await new Promise(e => setTimeout(e, 50));
    }
    try {
      let i = 0;
      if (o === "left") {
        i = 1;
      } else if (o === "right") {
        i = 2;
      } else if (o === "middle") {
        i = 4;
      }
      await this.dispatchMouseEvent(e, {
        type: "mouseMoved",
        x: t,
        y: r,
        button: "none",
        buttons: 0,
        modifiers: n
      });
      if (!s?.skipIndicator) {
        await new Promise(e => setTimeout(e, 100));
      }
      for (let c = 1; c <= a; c++) {
        await this.dispatchMouseEvent(e, {
          type: "mousePressed",
          x: t,
          y: r,
          button: o,
          buttons: i,
          clickCount: c,
          modifiers: n
        });
        if (!s?.skipIndicator) {
          await new Promise(e => setTimeout(e, 12));
        }
        await this.dispatchMouseEvent(e, {
          type: "mouseReleased",
          x: t,
          y: r,
          button: o,
          buttons: 0,
          modifiers: n,
          clickCount: c
        });
        if (c < a && !s?.skipIndicator) {
          await new Promise(e => setTimeout(e, 100));
        }
      }
    } finally {
      if (!s?.skipIndicator) {
        await F.restoreIndicatorAfterToolUse(e);
      }
    }
  }
  async type(e, t) {
    for (const r of t) {
      let t = r;
      if (r === "\n" || r === "\r") {
        t = "Enter";
      }
      const o = this.getKeyCode(t);
      if (o) {
        const t = this.requiresShift(r) ? 8 : 0;
        await this.pressKey(e, o, t);
      } else {
        await this.insertText(e, r);
      }
    }
  }
  async keyDown(e, t, r = 0, o) {
    await this.dispatchKeyEvent(e, {
      type: t.text ? "keyDown" : "rawKeyDown",
      key: t.key,
      code: t.code,
      windowsVirtualKeyCode: t.windowsVirtualKeyCode || t.keyCode,
      modifiers: r,
      text: t.text ?? "",
      unmodifiedText: t.text ?? "",
      location: t.location ?? 0,
      commands: o ?? [],
      isKeypad: t.isKeypad ?? false
    });
  }
  async keyUp(e, t, r = 0) {
    await this.dispatchKeyEvent(e, {
      type: "keyUp",
      key: t.key,
      modifiers: r,
      windowsVirtualKeyCode: t.windowsVirtualKeyCode || t.keyCode,
      code: t.code,
      location: t.location ?? 0
    });
  }
  async pressKey(e, t, r = 0, o) {
    await this.keyDown(e, t, r, o);
    await this.keyUp(e, t, r);
  }
  async pressKeyChord(e, t) {
    const r = t.toLowerCase().split("+");
    const o = [];
    let a = "";
    for (const c of r) {
      if (["ctrl", "control", "alt", "shift", "cmd", "meta", "command", "win", "windows"].includes(c)) {
        o.push(c);
      } else {
        a = c;
      }
    }
    let n = 0;
    const s = {
      alt: 1,
      ctrl: 2,
      control: 2,
      meta: 4,
      cmd: 4,
      command: 4,
      win: 4,
      windows: 4,
      shift: 8
    };
    for (const c of o) {
      n |= s[c] || 0;
    }
    const i = [];
    if (this.isMac) {
      const e = W[t.toLowerCase()];
      if (e && Array.isArray(e)) {
        i.push(...e);
      } else if (e) {
        i.push(e);
      }
    }
    if (a) {
      const r = this.getKeyCode(a);
      if (!r) {
        throw new Error(`Unknown key: ${t}`);
      }
      await this.pressKey(e, r, n, i);
    }
  }
  async scrollWheel(e, t, r, o, a) {
    await this.dispatchMouseEvent(e, {
      type: "mouseWheel",
      x: t,
      y: r,
      deltaX: o,
      deltaY: a
    });
  }
  getKeyCode(e) {
    const t = e.toLowerCase();
    const r = j[t];
    if (r) {
      return r;
    }
    if (e.length === 1) {
      const t = e.toUpperCase();
      let r;
      if (t >= "A" && t <= "Z") {
        r = `Key${t}`;
      } else {
        if (!(e >= "0") || !(e <= "9")) {
          return;
        }
        r = `Digit${e}`;
      }
      return {
        key: e,
        code: r,
        keyCode: t.charCodeAt(0),
        text: e
      };
    }
  }
  requiresShift(e) {
    return "~!@#$%^&*()_+{}|:\"<>?".includes(e) || e >= "A" && e <= "Z";
  }
  extractDomain(e) {
    if (!e) {
      return "unknown";
    }
    try {
      return new URL(e).hostname || "unknown";
    } catch {
      return "unknown";
    }
  }
  addConsoleMessage(e, t, r) {
    let o = H.consoleMessagesByTab.get(e);
    if (o && o.domain !== t) {
      o = {
        domain: t,
        messages: []
      };
      H.consoleMessagesByTab.set(e, o);
    } else if (!o) {
      o = {
        domain: t,
        messages: []
      };
      H.consoleMessagesByTab.set(e, o);
    }
    if (o.messages.length > 0) {
      const e = o.messages[o.messages.length - 1].timestamp;
      if (r.timestamp < e) {
        r.timestamp = e;
      }
    }
    o.messages.push(r);
    if (o.messages.length > H.MAX_LOGS_PER_TAB) {
      const e = o.messages.length - H.MAX_LOGS_PER_TAB;
      o.messages.splice(0, e);
    }
  }
  async enableConsoleTracking(e) {
    try {
      await this.sendCommand(e, "Runtime.enable");
      H.consoleTrackingEnabled.add(e);
    } catch (t) {
      throw t;
    }
  }
  getConsoleMessages(e, t = false, r) {
    const o = H.consoleMessagesByTab.get(e);
    if (!o) {
      return [];
    }
    let a = o.messages;
    if (t) {
      a = a.filter(e => e.type === "error" || e.type === "exception");
    }
    if (r) {
      try {
        const e = new RegExp(r, "i");
        a = a.filter(t => e.test(t.text));
      } catch {
        a = a.filter(e => e.text.toLowerCase().includes(r.toLowerCase()));
      }
    }
    return a;
  }
  clearConsoleMessages(e) {
    H.consoleMessagesByTab.delete(e);
  }
  addNetworkRequest(e, t, r) {
    let o = H.networkRequestsByTab.get(e);
    if (o) {
      if (o.domain !== t) {
        o.domain = t;
        o.requests = [];
      }
    } else {
      o = {
        domain: t,
        requests: []
      };
      H.networkRequestsByTab.set(e, o);
    }
    o.requests.push(r);
    if (o.requests.length > H.MAX_REQUESTS_PER_TAB) {
      const e = o.requests.length - H.MAX_REQUESTS_PER_TAB;
      o.requests.splice(0, e);
    }
  }
  async enableNetworkTracking(e) {
    try {
      if (!H.debuggerListenerRegistered) {
        this.initializeDebuggerEventListener();
      }
      try {
        await this.sendCommand(e, "Network.disable");
        await new Promise(e => setTimeout(e, 50));
      } catch {}
      await this.sendCommand(e, "Network.enable", {
        maxPostDataSize: 65536
      });
      H.networkTrackingEnabled.add(e);
    } catch (t) {
      throw t;
    }
  }
  getNetworkRequests(e, t) {
    const r = H.networkRequestsByTab.get(e);
    if (!r) {
      return [];
    }
    let o = r.requests;
    if (t) {
      o = o.filter(e => e.url.includes(t));
    }
    return o;
  }
  clearNetworkRequests(e) {
    H.networkRequestsByTab.delete(e);
  }
  isNetworkTrackingEnabled(e) {
    return H.networkTrackingEnabled.has(e);
  }
  async screenshot(e, t, r) {
    const o = t || this.defaultResizeParams;
    const n = r?.span;
    const s = r?.format ?? "jpeg";
    const i = r?.quality ?? H.INITIAL_JPEG_QUALITY * 100;
    if (!r?.skipIndicator) {
      await F.hideIndicatorForToolUse(e);
      await new Promise(e => setTimeout(e, 50));
    }
    if (n) {
      const t = Date.now();
      const r = H.recentCaptureAttempts;
      const o = (r.get(e) ?? []).filter(e => t - e < 60000);
      o.push(t);
      r.set(e, o);
      n.setAttribute("screenshot_attempts_last_60s", o.length);
      for (const [e, a] of r) {
        if (a.length === 0 || t - a[a.length - 1] >= 60000) {
          r.delete(e);
        }
      }
    }
    try {
      const t = performance.now();
      const r = await x({
        target: {
          tabId: e
        },
        injectImmediately: true,
        func: e => {
          const t = {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio
          };
          if (e) {
            return {
              ...t,
              dom_nodes: document.querySelectorAll("*").length,
              ready_state: document.readyState,
              visibility_state: document.visibilityState,
              iframe_count: document.querySelectorAll("iframe").length,
              js_heap_mb: (performance.memory?.usedJSHeapSize ?? 0) / 1048576
            };
          } else {
            return {
              ...t,
              dom_nodes: 0,
              ready_state: "",
              visibility_state: "",
              iframe_count: 0,
              js_heap_mb: 0
            };
          }
        },
        args: [!!n]
      });
      n?.setAttribute("viewport_probe_ms", performance.now() - t);
      if (!r || !r[0]?.result) {
        throw new Error("Failed to get viewport information");
      }
      const {
        width: l,
        height: d,
        dom_nodes: u,
        ready_state: h,
        visibility_state: p,
        iframe_count: m,
        js_heap_mb: f
      } = r[0].result;
      n?.setAttributes({
        target_dom_nodes: u,
        target_ready_state: h,
        target_visibility_state: p,
        target_iframe_count: m,
        target_js_heap_mb: Math.round(f)
      });
      const [g, b] = C(l, d, o);
      const w = g < l ? g / l : 1;
      if (a()) {
        try {
          await this.sendCommand(e, "Page.bringToFront", {});
        } catch (c) {}
      }
      const y = performance.now();
      let _;
      try {
        _ = await this.sendCommand(e, "Page.captureScreenshot", {
          format: s,
          ...((s === "jpeg" || s === "webp") && {
            quality: i
          }),
          captureBeyondViewport: false,
          fromSurface: true,
          clip: {
            x: 0,
            y: 0,
            width: l,
            height: d,
            scale: w
          }
        });
      } finally {
        n?.setAttribute("screenshot_cdp_ms", performance.now() - y);
      }
      if (!_ || !_.data) {
        throw new Error("Failed to capture screenshot via CDP");
      }
      const v = _.data;
      n?.setAttributes({
        screenshot_b64_len: v.length,
        screenshot_format: s,
        screenshot_capture_px: g * b
      });
      if (v.length <= H.MAX_BASE64_CHARS) {
        const t = {
          base64: v,
          width: g,
          height: b,
          format: s,
          viewportWidth: l,
          viewportHeight: d
        };
        M.setContext(e, t);
        return t;
      }
      return await this.processScreenshotInContentScript(e, v, s, l, d, 1, o, i);
    } finally {
      if (!r?.skipIndicator) {
        await F.restoreIndicatorAfterToolUse(e);
      }
    }
  }
  async processScreenshotInContentScript(e, t, r, o, a, n, s, i) {
    const c = await x({
      target: {
        tabId: e
      },
      injectImmediately: true,
      func: (e, t, r, o, a, n, s, i, c, l) => {
        const d = `data:image/${t};base64,${e}`;
        return new Promise((u, h) => {
          const p = new Image();
          p.onload = () => {
            let d = p.width;
            let m = p.height;
            if (a > 1) {
              d = Math.round(p.width / a);
              m = Math.round(p.height / a);
            }
            const f = d / m;
            const g = n.pxPerToken || 28;
            const b = n.maxTargetTokens || 1568;
            const w = Math.ceil(d / g * (m / g));
            let y = d;
            let _ = m;
            if (w > b) {
              const e = Math.sqrt(b / w);
              y = Math.round(d * e);
              _ = Math.round(y / f);
            }
            if (a <= 1 && y >= d && _ >= m && t === "jpeg" && e.length <= s) {
              u({
                base64: e,
                width: d,
                height: m,
                format: "jpeg",
                viewportWidth: r,
                viewportHeight: o
              });
              return;
            }
            const v = document.createElement("canvas");
            v.width = d;
            v.height = m;
            const I = v.getContext("2d");
            if (!I) {
              h(new Error("Failed to get canvas context"));
              return;
            }
            if (a > 1) {
              I.drawImage(p, 0, 0, p.width, p.height, 0, 0, d, m);
            } else {
              I.drawImage(p, 0, 0);
            }
            const k = e => {
              let t = i;
              let r = e.toDataURL("image/jpeg", t).split(",")[1];
              while (r.length > s && t > l) {
                t -= c;
                r = e.toDataURL("image/jpeg", t).split(",")[1];
              }
              return r;
            };
            if (y >= d && _ >= m) {
              const e = k(v);
              u({
                base64: e,
                width: d,
                height: m,
                format: "jpeg",
                viewportWidth: r,
                viewportHeight: o
              });
              return;
            }
            const T = document.createElement("canvas");
            T.width = y;
            T.height = _;
            const x = T.getContext("2d");
            if (!x) {
              h(new Error("Failed to get target canvas context"));
              return;
            }
            x.drawImage(v, 0, 0, d, m, 0, 0, y, _);
            const S = k(T);
            u({
              base64: S,
              width: y,
              height: _,
              format: "jpeg",
              viewportWidth: r,
              viewportHeight: o
            });
          };
          p.onerror = () => {
            h(new Error("Failed to load screenshot image"));
          };
          p.src = d;
        });
      },
      args: [t, r, o, a, n, s, H.MAX_BASE64_CHARS, i / 100, H.JPEG_QUALITY_STEP, H.MIN_JPEG_QUALITY]
    });
    if (!c || !c[0]?.result) {
      throw new Error("Failed to process screenshot in content script");
    }
    const l = c[0].result;
    M.setContext(e, l);
    return l;
  }
}
const K = new H();
const z = e => {
  let t;
  const r = new Set();
  const o = (e, o) => {
    const a = typeof e == "function" ? e(t) : e;
    if (!Object.is(a, t)) {
      const e = t;
      t = o ?? (typeof a != "object" || a === null) ? a : Object.assign({}, t, a);
      r.forEach(r => r(t, e));
    }
  };
  const a = () => t;
  const n = {
    setState: o,
    getState: a,
    getInitialState: () => s,
    subscribe: e => {
      r.add(e);
      return () => r.delete(e);
    }
  };
  const s = t = e(o, a, n);
  return n;
};
const X = e => e;
const V = e => {
  const t = (e => e ? z(e) : z)(e);
  const r = e => function (e, t = X) {
    const r = k.useSyncExternalStore(e.subscribe, k.useCallback(() => t(e.getState()), [e, t]), k.useCallback(() => t(e.getInitialState()), [e, t]));
    k.useDebugValue(r);
    return r;
  }(t, e);
  Object.assign(r, t);
  return r;
};
const Y = e => e ? V(e) : V;
function J(e, t, r, o) {
  const a = {
    availableTabs: e.map(e => ({
      tabId: e.id,
      title: e.title,
      url: e.url,
      ...(e.storageDecision !== undefined && {
        storageDecision: e.storageDecision
      })
    }))
  };
  if (r !== undefined) {
    a.selectedTabId = r;
  }
  if (t !== undefined) {
    a.tabGroupId = t;
  }
  if (o !== undefined) {
    a.checkedUrls = o;
  }
  return JSON.stringify(a);
}
function Q(e) {
  const t = {};
  if (e.availableTabs) {
    t.availableTabs = e.availableTabs.map(e => ({
      tabId: e.id,
      title: e.title,
      url: e.url
    }));
  }
  if (e.domainSkills && e.domainSkills.length > 0) {
    t.domainSkills = e.domainSkills;
  }
  if (e.initialTabId !== undefined) {
    t.initialTabId = e.initialTabId;
  }
  return JSON.stringify(t);
}
function Z(e) {
  return e.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/gi, "").trim();
}
const ee = async (e, t) => await Promise.all(e.map(e => e.toAnthropicSchema(t)));
const te = (e, t, r) => {
  const o = r.find(t => t.name === e);
  if (!o || !o.parameters || typeof t != "object" || !t) {
    return t;
  }
  const a = {
    ...t
  };
  for (const [n, s] of Object.entries(o.parameters)) {
    if (n in a && s && typeof s == "object") {
      const e = a[n];
      const t = s;
      if (t.type === "number" && typeof e == "string") {
        const t = Number(e);
        if (!isNaN(t)) {
          a[n] = t;
        }
      } else if (t.type === "boolean" && typeof e == "string") {
        a[n] = e === "true";
      }
    }
  }
  return a;
};
const re = (e, t) => {
  if (Array.isArray(e)) {
    return e;
  }
  if (typeof e == "string") {
    try {
      const t = JSON.parse(e);
      if (Array.isArray(t)) {
        return t;
      } else {
        return [];
      }
    } catch {
      return [];
    }
  }
  return [];
};
function oe(e, t) {
  console.info(`[imageUtils] Looking for image with ID: ${t}`);
  console.info(`[imageUtils] Total messages to search: ${e.length}`);
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    if (o.role === "user" && Array.isArray(o.content)) {
      for (const r of o.content) {
        if (r.type === "tool_result") {
          const e = r;
          if (e.content) {
            const r = Array.isArray(e.content) ? e.content : [{
              type: "text",
              text: e.content
            }];
            let o = false;
            let a = "";
            for (const e of r) {
              if (e.type === "text" && e.text && e.text.includes(t)) {
                o = true;
                a = e.text;
                console.info("[imageUtils] ✅ Found image ID in tool_result text");
                break;
              }
            }
            if (o) {
              for (const e of r) {
                if (e.type === "image") {
                  const r = e;
                  if (r.source && "data" in r.source && r.source.data) {
                    console.info(`[imageUtils] ✅ Found image data for ID ${t}`);
                    return {
                      base64: r.source.data,
                      mediaType: r.source.media_type,
                      width: ae(a, "width"),
                      height: ae(a, "height")
                    };
                  }
                }
              }
            }
          }
        }
      }
      const e = o.content.findIndex(e => e.type === "text" && e.text?.includes(t));
      if (e !== -1) {
        console.info(`[imageUtils] Found image ID in user text at index ${e}, looking for next adjacent image`);
        for (let r = e + 1; r < o.content.length; r++) {
          const e = o.content[r];
          if (e.type === "image") {
            const o = e;
            if (o.source && "data" in o.source && o.source.data) {
              console.info(`[imageUtils] ✅ Found user-uploaded image for ID ${t} at index ${r}`);
              return {
                base64: o.source.data,
                mediaType: o.source.media_type
              };
            }
          }
          if (e.type === "text") {
            console.info("[imageUtils] Hit another text block, stopping search");
            break;
          }
        }
      }
    }
  }
  console.info(`[imageUtils] ❌ Image not found with ID: ${t}`);
}
function ae(e, t) {
  if (!e) {
    return;
  }
  const r = e.match(/\((\d+)x(\d+)/);
  if (r) {
    if (t === "width") {
      return parseInt(r[1], 10);
    } else {
      return parseInt(r[2], 10);
    }
  } else {
    return undefined;
  }
}
function ne(e, t, r) {
  const o = r.viewportWidth / r.screenshotWidth;
  const a = r.viewportHeight / r.screenshotHeight;
  return [Math.round(e * o), Math.round(t * a)];
}
function se(e) {
  const [t, r] = e.split(",");
  const o = t.match(/:(.*?);/)?.[1] || "image/png";
  const a = atob(r);
  const n = new Uint8Array(a.length);
  for (let s = 0; s < a.length; s++) {
    n[s] = a.charCodeAt(s);
  }
  return new Blob([n], {
    type: o
  });
}
function ie(e) {
  return new Promise((t, r) => {
    const o = new FileReader();
    o.onloadend = () => t(o.result);
    o.onerror = r;
    o.readAsDataURL(e);
  });
}
function ce(e) {
  return e && e.includes(",") && e.split(",")[1] || "";
}
function le(e, t = "image/png") {
  const r = atob(e);
  const o = new Uint8Array(r.length);
  for (let a = 0; a < r.length; a++) {
    o[a] = r.charCodeAt(a);
  }
  return new Blob([o], {
    type: t
  });
}
const de = 5000;
const ue = Math.max(s - 5000 - 400, 1000);
async function he(e, t, r, o, a, n = s) {
  await x({
    target: {
      tabId: e
    },
    func: (e, t, r, o) => {
      const a = document.elementFromPoint(r, o);
      if (a && a !== document.body && a !== document.documentElement) {
        const r = e => {
          const t = window.getComputedStyle(e);
          const r = t.overflowY;
          const o = t.overflowX;
          return (r === "auto" || r === "scroll" || o === "auto" || o === "scroll") && (e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth);
        };
        let o = a;
        while (o && !r(o)) {
          o = o.parentElement;
        }
        if (o && r(o)) {
          o.scrollBy({
            left: e,
            top: t,
            behavior: "instant"
          });
          return;
        }
      }
      window.scrollBy({
        left: e,
        top: t,
        behavior: "instant"
      });
    },
    args: [o, a, t, r]
  }, n);
}
const pe = {
  name: "computer",
  description: "Use a mouse and keyboard to interact with a web browser, and take screenshots. If you don't have a valid tab ID, use tabs_context first to get available tabs.\n* The screen's resolution is {self.display_width_px}x{self.display_height_px}.\n* Whenever you intend to click on an element like an icon, you should consult a screenshot to determine the coordinates of the element before moving the cursor.\n* If you tried clicking on a program or link but it failed to load, even after waiting, try adjusting your click location so that the tip of the cursor visually falls on the element that you want to click.\n* Make sure to click any buttons, links, icons, etc with the cursor tip in the center of the element. Don't click boxes on their edges unless asked.",
  parameters: {
    action: {
      type: "string",
      enum: ["left_click", "right_click", "type", "screenshot", "wait", "scroll", "key", "left_click_drag", "double_click", "triple_click", "zoom", "scroll_to", "hover"],
      description: "The action to perform:\n* `left_click`: Click the left mouse button at the specified coordinates.\n* `right_click`: Click the right mouse button at the specified coordinates to open context menus.\n* `double_click`: Double-click the left mouse button at the specified coordinates.\n* `triple_click`: Triple-click the left mouse button at the specified coordinates.\n* `type`: Type a string of text.\n* `screenshot`: Take a screenshot of the screen.\n* `wait`: Wait for a specified number of seconds.\n* `scroll`: Scroll up, down, left, or right at the specified coordinates.\n* `key`: Press a specific keyboard key.\n* `left_click_drag`: Drag from start_coordinate to coordinate.\n* `zoom`: Take a screenshot of a specific region and scale it to fill the viewport.\n* `scroll_to`: Scroll an element into view using its element reference ID from read_page or find tools.\n* `hover`: Move the mouse cursor to the specified coordinates or element without clicking. Useful for revealing tooltips, dropdown menus, or triggering hover states."
    },
    coordinate: {
      type: "array",
      items: {
        type: "number"
      },
      minItems: 2,
      maxItems: 2,
      description: "(x, y): The x (pixels from the left edge) and y (pixels from the top edge) coordinates. Required for `scroll` and `left_click_drag`. For click actions (left_click, right_click, double_click, triple_click), either `coordinate` or `ref` must be provided (not both)."
    },
    text: {
      type: "string",
      description: "The text to type (for `type` action) or the key(s) to press (for `key` action). For `key` action: Provide space-separated keys (e.g., \"Backspace Backspace Delete\"). Supports keyboard shortcuts using the platform's modifier key (use \"cmd\" on Mac, \"ctrl\" on Windows/Linux, e.g., \"cmd+a\" or \"ctrl+a\" for select all)."
    },
    duration: {
      type: "number",
      minimum: 0,
      maximum: i,
      description: `The number of seconds to wait. Required for \`wait\`. Maximum ${i} seconds.`
    },
    scroll_direction: {
      type: "string",
      enum: ["up", "down", "left", "right"],
      description: "The direction to scroll. Required for `scroll`."
    },
    scroll_amount: {
      type: "number",
      minimum: 1,
      maximum: 10,
      description: "The number of scroll wheel ticks. Optional for `scroll`, defaults to 3."
    },
    start_coordinate: {
      type: "array",
      items: {
        type: "number"
      },
      minItems: 2,
      maxItems: 2,
      description: "(x, y): The starting coordinates for `left_click_drag`."
    },
    region: {
      type: "array",
      items: {
        type: "number"
      },
      minItems: 4,
      maxItems: 4,
      description: "(x0, y0, x1, y1): The rectangular region to capture for `zoom`. Coordinates are in pixels from the top-left corner of the viewport. Required for `zoom` action."
    },
    repeat: {
      type: "number",
      minimum: 1,
      maximum: 100,
      description: "Number of times to repeat the key sequence. Only applicable for `key` action. Must be a positive integer between 1 and 100. Default is 1."
    },
    ref: {
      type: "string",
      description: "Element reference ID from read_page or find tools (e.g., \"ref_1\", \"ref_2\"). Required for `scroll_to` action. Can be used as alternative to `coordinate` for click actions (left_click, right_click, double_click, triple_click)."
    },
    modifiers: {
      type: "string",
      description: "Modifier keys for click actions (left_click, right_click, double_click, triple_click). Supports: \"ctrl\", \"shift\", \"alt\", \"cmd\" (or \"meta\"), \"win\" (or \"windows\"). Can be combined with \"+\" (e.g., \"ctrl+shift\", \"cmd+alt\"). Optional."
    },
    tabId: {
      type: "number",
      description: "Tab ID to execute the action on. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
    }
  },
  execute: async (e, t) => {
    try {
      const o = e || {};
      if (!o.action) {
        throw new Error("Action parameter is required");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found in context");
      }
      const n = await F.getEffectiveTabId(o.tabId, t.tabId);
      const s = await chrome.tabs.get(n);
      if (!s.id) {
        throw new Error("Active tab has no ID");
      }
      if (!["wait"].includes(o.action)) {
        const e = s.url;
        if (!e) {
          throw new Error("No URL available for active tab");
        }
        const a = function (e) {
          const t = {
            screenshot: c.READ_PAGE_CONTENT,
            scroll: c.READ_PAGE_CONTENT,
            scroll_to: c.READ_PAGE_CONTENT,
            zoom: c.READ_PAGE_CONTENT,
            hover: c.READ_PAGE_CONTENT,
            left_click: c.CLICK,
            right_click: c.CLICK,
            double_click: c.CLICK,
            triple_click: c.CLICK,
            left_click_drag: c.CLICK,
            type: c.TYPE,
            key: c.TYPE
          };
          if (!t[e]) {
            throw new Error(`Unsupported action: ${e}`);
          }
          return t[e];
        }(o.action);
        const i = t?.toolUseId;
        const l = await t.permissionManager.checkPermission(e, i);
        if (!l.allowed) {
          if (l.needsPrompt) {
            const t = {
              type: "permission_required",
              tool: a,
              url: e,
              toolUseId: i
            };
            if (o.action === "left_click" || o.action === "right_click" || o.action === "double_click" || o.action === "triple_click") {
              try {
                const e = await K.screenshot(n);
                t.actionData = {
                  screenshot: `data:image/${e.format};base64,${e.base64}`
                };
                if (o.coordinate) {
                  t.actionData.coordinate = o.coordinate;
                }
              } catch (r) {
                t.actionData = {};
                if (o.coordinate) {
                  t.actionData.coordinate = o.coordinate;
                }
              }
            } else if (o.action === "type" && o.text) {
              t.actionData = {
                text: o.text
              };
            } else if (o.action === "left_click_drag" && o.start_coordinate && o.coordinate) {
              t.actionData = {
                start_coordinate: o.start_coordinate,
                coordinate: o.coordinate
              };
            }
            return t;
          }
          return {
            error: "Permission denied for this action on this domain"
          };
        }
      }
      const l = s.url;
      let d;
      const u = {
        skipIndicator: t.skipIndicator,
        span: t?.span
      };
      switch (o.action) {
        case "left_click":
        case "right_click":
          d = await fe(n, o, 1, l, u);
          break;
        case "type":
          d = await async function (e, t, o) {
            if (!t.text) {
              throw new Error("Text parameter is required for type action");
            }
            try {
              const r = await A(e, o, "type action");
              return r || (await K.type(e, t.text), {
                output: `Typed "${t.text}"`
              });
            } catch (r) {
              return {
                error: `Failed to type: ${r instanceof Error ? r.message : "Unknown error"}`
              };
            }
          }(n, o, l);
          break;
        case "screenshot":
          d = await ge(n, u);
          break;
        case "wait":
          d = await async function (e) {
            if (!e.duration || e.duration <= 0) {
              throw new Error("Duration parameter is required and must be positive");
            }
            if (e.duration > i) {
              throw new Error(`Duration cannot exceed ${i} seconds`);
            }
            const t = Math.round(e.duration * 1000);
            await new Promise(e => setTimeout(e, t));
            return {
              output: `Waited for ${e.duration} second${e.duration === 1 ? "" : "s"}`
            };
          }(o);
          break;
        case "scroll":
          d = await async function (e, t, o, a) {
            if (!t.coordinate || t.coordinate.length !== 2) {
              throw new Error("Coordinate parameter is required for scroll action");
            }
            let [n, s] = t.coordinate;
            const i = M.getContext(e);
            if (i) {
              const [e, t] = ne(n, s, i);
              n = e;
              s = t;
            }
            const c = t.scroll_direction || "down";
            const l = t.scroll_amount || 3;
            try {
              let t = 0;
              let i = 0;
              const d = 100;
              switch (c) {
                case "up":
                  i = -l * d;
                  break;
                case "down":
                  i = l * d;
                  break;
                case "left":
                  t = -l * d;
                  break;
                case "right":
                  t = l * d;
                  break;
                default:
                  throw new Error(`Invalid scroll direction: ${c}`);
              }
              if (a?.skipIndicator) {
                await K.scrollWheel(e, n, s, t, i);
              } else {
                const o = await be(e);
                const a = await chrome.tabs.get(e);
                if (a.active ?? false) {
                  try {
                    const r = K.scrollWheel(e, n, s, t, i);
                    let a;
                    try {
                      await Promise.race([r, new Promise((e, t) => {
                        a = setTimeout(() => t(new Error("Scroll timeout")), de);
                      })]);
                    } finally {
                      if (a !== undefined) {
                        clearTimeout(a);
                      }
                    }
                    await new Promise(e => setTimeout(e, 200));
                    const c = await be(e);
                    if (!(Math.abs(c.x - o.x) > 5) && !(Math.abs(c.y - o.y) > 5)) {
                      throw new Error("CDP scroll ineffective");
                    }
                  } catch (r) {
                    await he(e, n, s, t, i, ue);
                    await new Promise(e => setTimeout(e, 200));
                  }
                } else {
                  await he(e, n, s, t, i);
                  await new Promise(e => setTimeout(e, 200));
                }
              }
              if (!a?.skipIndicator) {
                const t = await async function (e, t, o) {
                  try {
                    const r = await chrome.tabs.get(e);
                    if (!r?.url) {
                      return;
                    }
                    if ((await t.checkPermission(r.url, undefined)).allowed) {
                      try {
                        const t = await ge(e, o);
                        return {
                          base64Image: t.base64Image,
                          imageFormat: t.imageFormat || "jpeg"
                        };
                      } catch (a) {
                        return;
                      }
                    }
                    return;
                  } catch (r) {
                    return;
                  }
                }(e, o, {
                  skipIndicator: a?.skipIndicator
                });
                return {
                  output: `Scrolled ${c} by ${l} ticks at (${n}, ${s})`,
                  ...(t && {
                    base64Image: t.base64Image,
                    imageFormat: t.imageFormat
                  })
                };
              }
              return {
                output: `Scrolled ${c} by ${l} ticks at (${n}, ${s})`
              };
            } catch (r) {
              return {
                error: `Error scrolling: ${r instanceof Error ? r.message : "Unknown error"}`
              };
            }
          }(n, o, t.permissionManager, u);
          break;
        case "key":
          d = await async function (e, t, o) {
            if (!t.text) {
              throw new Error("Text parameter is required for key action");
            }
            const a = t.repeat ?? 1;
            if (!Number.isInteger(a) || a < 1) {
              throw new Error("Repeat parameter must be a positive integer");
            }
            if (a > 100) {
              throw new Error("Repeat parameter cannot exceed 100");
            }
            try {
              const r = await A(e, o, "key action");
              if (r) {
                return r;
              }
              const n = t.text.trim().split(/\s+/).filter(e => e.length > 0);
              console.info({
                keyInputs: n
              });
              if (n.length === 1) {
                const t = n[0].toLowerCase();
                if (t === "cmd+r" || t === "cmd+shift+r" || t === "ctrl+r" || t === "ctrl+shift+r" || t === "f5" || t === "ctrl+f5" || t === "shift+f5") {
                  const r = t === "cmd+shift+r" || t === "ctrl+shift+r" || t === "ctrl+f5" || t === "shift+f5";
                  await chrome.tabs.reload(e, {
                    bypassCache: r
                  });
                  const o = r ? "hard reload" : "reload";
                  return {
                    output: `Executed ${n[0]} (${o} page)`
                  };
                }
              }
              for (let t = 0; t < a; t++) {
                for (const r of n) {
                  if (r.includes("+")) {
                    await K.pressKeyChord(e, r);
                  } else {
                    const t = K.getKeyCode(r);
                    if (t) {
                      await K.pressKey(e, t);
                    } else {
                      await K.insertText(e, r);
                    }
                  }
                }
              }
              const s = a > 1 ? ` (repeated ${a} times)` : "";
              return {
                output: `Pressed ${n.length} key${n.length === 1 ? "" : "s"}: ${n.join(" ")}${s}`
              };
            } catch (r) {
              return {
                error: `Error pressing key: ${r instanceof Error ? r.message : "Unknown error"}`
              };
            }
          }(n, o, l);
          break;
        case "left_click_drag":
          d = await async function (e, t, o) {
            if (!t.start_coordinate || t.start_coordinate.length !== 2) {
              throw new Error("start_coordinate parameter is required for left_click_drag action");
            }
            if (!t.coordinate || t.coordinate.length !== 2) {
              throw new Error("coordinate parameter (end position) is required for left_click_drag action");
            }
            let [a, n] = t.start_coordinate;
            let [s, i] = t.coordinate;
            const c = M.getContext(e);
            if (c) {
              const [e, t] = ne(a, n, c);
              const [r, o] = ne(s, i, c);
              a = e;
              n = t;
              s = r;
              i = o;
            }
            try {
              const t = await A(e, o, "drag action");
              return t || (await K.dispatchMouseEvent(e, {
                type: "mouseMoved",
                x: a,
                y: n,
                button: "none",
                buttons: 0,
                modifiers: 0
              }), await K.dispatchMouseEvent(e, {
                type: "mousePressed",
                x: a,
                y: n,
                button: "left",
                buttons: 1,
                clickCount: 1,
                modifiers: 0
              }), await K.dispatchMouseEvent(e, {
                type: "mouseMoved",
                x: s,
                y: i,
                button: "left",
                buttons: 1,
                modifiers: 0
              }), await K.dispatchMouseEvent(e, {
                type: "mouseReleased",
                x: s,
                y: i,
                button: "left",
                buttons: 0,
                clickCount: 1,
                modifiers: 0
              }), {
                output: `Dragged from (${a}, ${n}) to (${s}, ${i})`
              });
            } catch (r) {
              return {
                error: `Error performing drag: ${r instanceof Error ? r.message : "Unknown error"}`
              };
            }
          }(n, o, l);
          break;
        case "double_click":
          d = await fe(n, o, 2, l, u);
          break;
        case "triple_click":
          d = await fe(n, o, 3, l, u);
          break;
        case "zoom":
          d = await async function (e, t) {
            if (!t.region || t.region.length !== 4) {
              throw new Error("Region parameter is required for zoom action and must be [x0, y0, x1, y1]");
            }
            let [o, n, s, i] = t.region;
            if (o < 0 || n < 0 || s <= o || i <= n) {
              throw new Error("Invalid region coordinates: x0 and y0 must be non-negative, and x1 > x0, y1 > y0");
            }
            try {
              const t = M.getContext(e);
              if (t) {
                const [e, r] = ne(o, n, t);
                const [a, c] = ne(s, i, t);
                o = e;
                n = r;
                s = a;
                i = c;
              }
              const r = await x({
                target: {
                  tabId: e
                },
                injectImmediately: true,
                func: () => ({
                  width: window.innerWidth,
                  height: window.innerHeight
                })
              });
              if (!r || !r[0]?.result) {
                throw new Error("Failed to get viewport dimensions");
              }
              const {
                width: l,
                height: d
              } = r[0].result;
              if (s > l || i > d) {
                throw new Error(`Region exceeds viewport boundaries (${l}x${d}). Please choose a region within the visible viewport.`);
              }
              const u = s - o;
              const h = i - n;
              if (a()) {
                try {
                  await K.sendCommand(e, "Page.bringToFront", {});
                } catch (c) {}
              }
              const p = await K.sendCommand(e, "Page.captureScreenshot", {
                format: "png",
                captureBeyondViewport: false,
                fromSurface: true,
                clip: {
                  x: o,
                  y: n,
                  width: u,
                  height: h,
                  scale: 1
                }
              });
              if (!p || !p.data) {
                throw new Error("Failed to capture zoomed screenshot via CDP");
              }
              return {
                output: `Successfully captured zoomed screenshot of region (${o},${n}) to (${s},${i}) - ${u}x${h} pixels`,
                base64Image: p.data,
                imageFormat: "png"
              };
            } catch (r) {
              return {
                error: `Error capturing zoomed screenshot: ${r instanceof Error ? r.message : "Unknown error"}`
              };
            }
          }(n, o);
          break;
        case "scroll_to":
          d = await async function (e, t, o, a) {
            if (!t.ref) {
              throw new Error("ref parameter is required for scroll_to action");
            }
            try {
              const r = await A(e, o, "scroll_to action");
              if (r) {
                return r;
              }
              const n = await me(e, t.ref, a?.span);
              if (n.success) {
                return {
                  output: `Scrolled to element with reference: ${t.ref}`
                };
              } else {
                return {
                  error: n.error
                };
              }
            } catch (r) {
              return {
                error: `Failed to scroll to element: ${r instanceof Error ? r.message : "Unknown error"}`
              };
            }
          }(n, o, l, u);
          break;
        case "hover":
          d = await async function (e, t, o, a) {
            let n;
            let s;
            if (t.ref) {
              const r = await me(e, t.ref, a?.span);
              if (!r.success) {
                return {
                  error: r.error
                };
              }
              [n, s] = r.coordinates;
            } else {
              if (!t.coordinate) {
                throw new Error("Either ref or coordinate parameter is required for hover action");
              }
              {
                [n, s] = t.coordinate;
                const r = M.getContext(e);
                if (r) {
                  const [e, t] = ne(n, s, r);
                  n = e;
                  s = t;
                }
              }
            }
            try {
              const r = await A(e, o, "hover action");
              return r || (await K.dispatchMouseEvent(e, {
                type: "mouseMoved",
                x: n,
                y: s,
                button: "none",
                buttons: 0,
                modifiers: 0
              }), t.ref ? {
                output: `Hovered over element ${t.ref}`
              } : {
                output: `Hovered at (${Math.round(t.coordinate[0])}, ${Math.round(t.coordinate[1])})`
              });
            } catch (r) {
              return {
                error: `Error hovering: ${r instanceof Error ? r.message : "Unknown error"}`
              };
            }
          }(n, o, l, u);
          break;
        default:
          throw new Error(`Unsupported action: ${o.action}`);
      }
      const h = await F.getValidTabsWithMetadata(t.tabId);
      return {
        ...d,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: n,
          availableTabs: h,
          tabCount: h.length
        }
      };
    } catch (r) {
      return {
        error: `Failed to execute action: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "computer",
    description: "Use a mouse and keyboard to interact with a web browser, and take screenshots. If you don't have a valid tab ID, use tabs_context first to get available tabs.\n* Whenever you intend to click on an element like an icon, you should consult a screenshot to determine the coordinates of the element before moving the cursor.\n* If you tried clicking on a program or link but it failed to load, even after waiting, try adjusting your click location so that the tip of the cursor visually falls on the element that you want to click.\n* Make sure to click any buttons, links, icons, etc with the cursor tip in the center of the element. Don't click boxes on their edges unless asked.",
    input_schema: {
      type: "object",
      properties: {
        action: {
          type: "string",
          enum: ["left_click", "right_click", "type", "screenshot", "wait", "scroll", "key", "left_click_drag", "double_click", "triple_click", "zoom", "scroll_to", "hover"],
          description: "The action to perform:\n* `left_click`: Click the left mouse button at the specified coordinates.\n* `right_click`: Click the right mouse button at the specified coordinates to open context menus.\n* `double_click`: Double-click the left mouse button at the specified coordinates.\n* `triple_click`: Triple-click the left mouse button at the specified coordinates.\n* `type`: Type a string of text.\n* `screenshot`: Take a screenshot of the screen.\n* `wait`: Wait for a specified number of seconds.\n* `scroll`: Scroll up, down, left, or right at the specified coordinates.\n* `key`: Press a specific keyboard key.\n* `left_click_drag`: Drag from start_coordinate to coordinate.\n* `zoom`: Take a screenshot of a specific region for closer inspection.\n* `scroll_to`: Scroll an element into view using its element reference ID from read_page or find tools.\n* `hover`: Move the mouse cursor to the specified coordinates or element without clicking. Useful for revealing tooltips, dropdown menus, or triggering hover states."
        },
        coordinate: {
          type: "array",
          items: {
            type: "number"
          },
          minItems: 2,
          maxItems: 2,
          description: "(x, y): The x (pixels from the left edge) and y (pixels from the top edge) coordinates. Required for `left_click`, `right_click`, `double_click`, `triple_click`, and `scroll`. For `left_click_drag`, this is the end position."
        },
        text: {
          type: "string",
          description: "The text to type (for `type` action) or the key(s) to press (for `key` action). For `key` action: Provide space-separated keys (e.g., \"Backspace Backspace Delete\"). Supports keyboard shortcuts using the platform's modifier key (use \"cmd\" on Mac, \"ctrl\" on Windows/Linux, e.g., \"cmd+a\" or \"ctrl+a\" for select all)."
        },
        duration: {
          type: "number",
          minimum: 0,
          maximum: i,
          description: `The number of seconds to wait. Required for \`wait\`. Maximum ${i} seconds.`
        },
        scroll_direction: {
          type: "string",
          enum: ["up", "down", "left", "right"],
          description: "The direction to scroll. Required for `scroll`."
        },
        scroll_amount: {
          type: "number",
          minimum: 1,
          maximum: 10,
          description: "The number of scroll wheel ticks. Optional for `scroll`, defaults to 3."
        },
        start_coordinate: {
          type: "array",
          items: {
            type: "number"
          },
          minItems: 2,
          maxItems: 2,
          description: "(x, y): The starting coordinates for `left_click_drag`."
        },
        region: {
          type: "array",
          items: {
            type: "number"
          },
          minItems: 4,
          maxItems: 4,
          description: "(x0, y0, x1, y1): The rectangular region to capture for `zoom`. Coordinates define a rectangle from top-left (x0, y0) to bottom-right (x1, y1) in pixels from the viewport origin. Required for `zoom` action. Useful for inspecting small UI elements like icons, buttons, or text."
        },
        repeat: {
          type: "number",
          minimum: 1,
          maximum: 100,
          description: "Number of times to repeat the key sequence. Only applicable for `key` action. Must be a positive integer between 1 and 100. Default is 1. Useful for navigation tasks like pressing arrow keys multiple times."
        },
        ref: {
          type: "string",
          description: "Element reference ID from read_page or find tools (e.g., \"ref_1\", \"ref_2\"). Required for `scroll_to` action. Can be used as alternative to `coordinate` for click actions."
        },
        modifiers: {
          type: "string",
          description: "Modifier keys for click actions. Supports: \"ctrl\", \"shift\", \"alt\", \"cmd\" (or \"meta\"), \"win\" (or \"windows\"). Can be combined with \"+\" (e.g., \"ctrl+shift\", \"cmd+alt\"). Optional."
        },
        tabId: {
          type: "number",
          description: "Tab ID to execute the action on. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        }
      },
      required: ["action", "tabId"]
    }
  })
};
async function me(e, t, r) {
  try {
    const o = performance.now();
    let a;
    try {
      a = await x({
        target: {
          tabId: e
        },
        injectImmediately: true,
        func: e => {
          try {
            let t = null;
            if (window.__claudeElementMap && window.__claudeElementMap[e]) {
              t = window.__claudeElementMap[e].deref() || null;
              if (!t || !document.contains(t)) {
                delete window.__claudeElementMap[e];
                t = null;
              }
            }
            if (!t) {
              return {
                success: false,
                error: `No element found with reference: "${e}". The element may have been removed from the page.`
              };
            }
            t.scrollIntoView({
              behavior: "instant",
              block: "center",
              inline: "center"
            });
            if (t instanceof HTMLElement) {
              t.offsetHeight;
            }
            const r = t.getBoundingClientRect();
            const o = r.left + r.width / 2;
            return {
              success: true,
              coordinates: [o, r.top + r.height / 2]
            };
          } catch (t) {
            return {
              success: false,
              error: `Error getting element coordinates: ${t instanceof Error ? t.message : "Unknown error"}`
            };
          }
        },
        args: [t]
      });
    } finally {
      r?.setAttribute("ref_lookup_ms", performance.now() - o);
    }
    if (a && a.length !== 0) {
      return a[0].result;
    } else {
      return {
        success: false,
        error: "Failed to execute script to get element coordinates"
      };
    }
  } catch (o) {
    return {
      success: false,
      error: `Failed to get element coordinates from ref: ${o instanceof Error ? o.message : "Unknown error"}`
    };
  }
}
async function fe(e, t, r = 1, o, a) {
  let n;
  let s;
  if (t.ref) {
    const r = await me(e, t.ref, a?.span);
    if (!r.success) {
      return {
        error: r.error
      };
    }
    [n, s] = r.coordinates;
  } else {
    if (!t.coordinate) {
      throw new Error("Either ref or coordinate parameter is required for click action");
    }
    {
      [n, s] = t.coordinate;
      const r = M.getContext(e);
      if (r) {
        const [e, t] = ne(n, s, r);
        n = e;
        s = t;
      }
    }
  }
  const i = t.action === "right_click" ? "right" : "left";
  let c = 0;
  if (t.modifiers) {
    c = function (e) {
      const t = {
        alt: 1,
        ctrl: 2,
        control: 2,
        meta: 4,
        cmd: 4,
        command: 4,
        win: 4,
        windows: 4,
        shift: 8
      };
      let r = 0;
      for (const o of e) {
        r |= t[o] || 0;
      }
      return r;
    }(function (e) {
      const t = e.toLowerCase().split("+");
      const r = ["ctrl", "control", "alt", "shift", "cmd", "meta", "command", "win", "windows"];
      return t.filter(e => r.includes(e.trim()));
    }(t.modifiers));
  }
  try {
    const l = await A(e, o, "click action");
    if (l) {
      return l;
    }
    await K.click(e, n, s, i, r, c, a);
    const d = r === 1 ? "Clicked" : r === 2 ? "Double-clicked" : "Triple-clicked";
    if (t.ref) {
      return {
        output: `${d} on element ${t.ref}`
      };
    } else {
      return {
        output: `${d} at (${Math.round(t.coordinate[0])}, ${Math.round(t.coordinate[1])})`
      };
    }
  } catch (l) {
    return {
      error: `Error clicking: ${l instanceof Error ? l.message : "Unknown error"}`
    };
  }
}
async function ge(e, t) {
  try {
    const r = await K.screenshot(e, undefined, t);
    const o = `ss_${Date.now().toString().slice(-4)}${Math.random().toString(36).substring(2, 7)}`;
    console.info(`[Computer Tool] Generated screenshot ID: ${o}`);
    console.info(`[Computer Tool] Screenshot dimensions: ${r.width}x${r.height}`);
    return {
      output: `Successfully captured screenshot (${r.width}x${r.height}, ${r.format}) - ID: ${o}`,
      base64Image: r.base64,
      imageFormat: r.format,
      imageId: o
    };
  } catch (r) {
    return {
      error: `Error capturing screenshot: ${r instanceof Error ? r.message : "Unknown error"}`
    };
  }
}
async function be(e) {
  const t = await x({
    target: {
      tabId: e
    },
    injectImmediately: true,
    func: () => ({
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    })
  });
  if (!t || !t[0]?.result) {
    throw new Error("Failed to get scroll position");
  }
  return t[0].result;
}
const we = {
  name: "javascript_tool",
  description: "Execute JavaScript code in the context of the current page. The code runs in the page's context and can interact with the DOM, window object, and page variables. Returns the result of the last expression or any thrown errors. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
  parameters: {
    action: {
      type: "string",
      description: "Must be set to 'javascript_exec'"
    },
    text: {
      type: "string",
      description: "The JavaScript code to execute. The code will be evaluated in the page context. The result of the last expression will be returned automatically. Do NOT use 'return' statements - just write the expression you want to evaluate (e.g., 'window.myData.value' not 'return window.myData.value'). You can access and modify the DOM, call page functions, and interact with page variables."
    },
    tabId: {
      type: "number",
      description: "Tab ID to execute the code in. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
    }
  },
  execute: async (e, t) => {
    try {
      const {
        action: r,
        text: o,
        tabId: a
      } = e;
      if (r !== "javascript_exec") {
        throw new Error("'javascript_exec' is the only supported action");
      }
      if (!o) {
        throw new Error("Code parameter is required");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const n = await F.getEffectiveTabId(a, t.tabId);
      const s = (await chrome.tabs.get(n)).url;
      if (!s) {
        throw new Error("No URL available for active tab");
      }
      const i = t?.toolUseId;
      const u = await t.permissionManager.checkPermission(s, i);
      if (!u.allowed) {
        if (u.needsPrompt) {
          return {
            type: "permission_required",
            tool: c.EXECUTE_JAVASCRIPT,
            url: s,
            toolUseId: i,
            actionData: {
              text: o
            }
          };
        }
        return {
          error: "Permission denied for JavaScript execution on this domain"
        };
      }
      const h = await A(n, s, "JavaScript execution");
      if (h) {
        return h;
      }
      const p = `\n        (function() {\n          'use strict';\n          try {\n            return eval(${JSON.stringify(o)});\n          } catch (e) {\n            throw e;\n          }\n        })()\n      `;
      const m = await K.sendCommand(n, "Runtime.evaluate", {
        expression: p,
        returnByValue: true,
        awaitPromise: true,
        timeout: l
      }, l + d);
      let f = "";
      let g = false;
      let b = "";
      const w = (e, t = 0) => {
        if (t > 5) {
          return "[TRUNCATED: Max depth exceeded]";
        }
        const r = [/password/i, /token/i, /secret/i, /api[_-]?key/i, /auth/i, /credential/i, /private[_-]?key/i, /access[_-]?key/i, /bearer/i, /oauth/i, /session/i];
        if (typeof e == "string") {
          if (e.includes("=") && (e.includes(";") || e.includes("&"))) {
            return "[BLOCKED: Cookie/query string data]";
          }
          if (e.match(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/)) {
            return "[BLOCKED: JWT token]";
          }
          if (/^[A-Za-z0-9+/]{20,}={0,2}$/.test(e)) {
            return "[BLOCKED: Base64 encoded data]";
          }
          if (/^[a-f0-9]{32,}$/i.test(e)) {
            return "[BLOCKED: Hex credential]";
          }
          if (e.length > 1000) {
            return e.substring(0, 1000) + "[TRUNCATED]";
          }
        }
        if (e && typeof e == "object" && !Array.isArray(e)) {
          const o = {};
          for (const [a, n] of Object.entries(e)) {
            const e = r.some(e => e.test(a));
            o[a] = e ? "[BLOCKED: Sensitive key]" : a === "cookie" || a === "cookies" ? "[BLOCKED: Cookie access]" : w(n, t + 1);
          }
          return o;
        }
        if (Array.isArray(e)) {
          const r = e.slice(0, 100).map(e => w(e, t + 1));
          if (e.length > 100) {
            r.push(`[TRUNCATED: ${e.length - 100} more items]`);
          }
          return r;
        }
        return e;
      };
      const y = 51200;
      if (m.exceptionDetails) {
        g = true;
        const e = m.exceptionDetails.exception;
        const t = e?.description?.includes("execution was terminated");
        b = t ? `Execution timeout: Code exceeded ${l / 1000}-second limit` : e?.description || e?.value || "Unknown error";
      } else if (m.result) {
        const e = m.result;
        if (e.type === "undefined") {
          f = "undefined";
        } else if (e.type === "object" && e.subtype === "null") {
          f = "null";
        } else if (e.type === "function") {
          f = e.description || "[Function]";
        } else if (e.type === "object") {
          if (e.subtype === "node") {
            f = e.description || "[DOM Node]";
          } else if (e.subtype === "array") {
            f = e.description || "[Array]";
          } else {
            const t = w(e.value || {});
            f = e.description || JSON.stringify(t, null, 2);
          }
        } else if (e.value !== undefined) {
          const t = w(e.value);
          f = typeof t == "string" ? t : JSON.stringify(t, null, 2);
        } else {
          f = e.description || String(e.value);
        }
      } else {
        f = "undefined";
      }
      const _ = await F.getValidTabsWithMetadata(t.tabId);
      if (g) {
        return {
          error: `JavaScript execution error: ${b}`,
          tabContext: {
            currentTabId: t.tabId,
            executedOnTabId: n,
            availableTabs: _,
            tabCount: _.length
          }
        };
      } else {
        if (f.length > y) {
          f = f.substring(0, y) + "\n[OUTPUT TRUNCATED: Exceeded 50KB limit]";
        }
        return {
          output: f,
          tabContext: {
            currentTabId: t.tabId,
            executedOnTabId: n,
            availableTabs: _,
            tabCount: _.length
          }
        };
      }
    } catch (r) {
      return {
        error: `Failed to execute JavaScript: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "javascript_tool",
    description: "Execute JavaScript code in the context of the current page. The code runs in the page's context and can interact with the DOM, window object, and page variables. Returns the result of the last expression or any thrown errors. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
    input_schema: {
      type: "object",
      properties: {
        action: {
          type: "string",
          description: "Must be set to 'javascript_exec'"
        },
        text: {
          type: "string",
          description: "The JavaScript code to execute. The code will be evaluated in the page context. The result of the last expression will be returned automatically. Do NOT use 'return' statements - just write the expression you want to evaluate (e.g., 'window.myData.value' not 'return window.myData.value'). You can access and modify the DOM, call page functions, and interact with page variables."
        },
        tabId: {
          type: "number",
          description: "Tab ID to execute the code in. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        }
      },
      required: ["action", "text", "tabId"]
    }
  })
};
const ye = {
  name: "file_upload",
  description: "Upload one or multiple files from the local filesystem to a file input element on the page. Do not click on file upload buttons or file inputs — clicking opens a native file picker dialog that you cannot see or interact with. Instead, use read_page or find to locate the file input element, then use this tool with its ref to upload files directly. The paths must be absolute file paths on the local machine.",
  parameters: {
    paths: {
      type: "array",
      items: {
        type: "string"
      },
      description: "The absolute paths to the files to upload. Can be a single file or multiple files."
    },
    ref: {
      type: "string",
      description: "Element reference ID of the file input from read_page or find tools (e.g., \"ref_1\", \"ref_2\")."
    },
    tabId: {
      type: "number",
      description: "Tab ID where the file input is located. Use tabs_context first if you don't have a valid tab ID."
    }
  },
  execute: async (e, t) => {
    try {
      const o = e;
      if (!o?.paths || !Array.isArray(o.paths) || o.paths.length === 0) {
        throw new Error("paths parameter is required and must be a non-empty array of file paths");
      }
      if (!o?.ref) {
        throw new Error("ref parameter is required");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const a = await F.getEffectiveTabId(o.tabId, t.tabId);
      const n = await chrome.tabs.get(a);
      if (!n.id) {
        throw new Error("Active tab has no ID");
      }
      const s = n.url;
      if (!s) {
        throw new Error("No URL available for tab");
      }
      const i = t?.toolUseId;
      const l = await t.permissionManager.checkPermission(s, i);
      if (!l.allowed) {
        if (l.needsPrompt) {
          return {
            type: "permission_required",
            tool: c.UPLOAD_IMAGE,
            url: s,
            toolUseId: i,
            actionData: {
              ref: o.ref
            }
          };
        }
        return {
          error: "Permission denied for uploading files to this domain"
        };
      }
      const d = n.url;
      if (!d) {
        return {
          error: "Unable to get original URL for security check"
        };
      }
      const u = await A(n.id, d, "file upload action");
      if (u) {
        return u;
      }
      const h = `data-claude-upload-${Date.now()}`;
      const p = await x({
        target: {
          tabId: n.id
        },
        func: (e, t) => {
          const r = window.__claudeElementMap;
          if (!r?.[e]) {
            return {
              error: `Element ref not found: "${e}". The element may have been removed from the page.`
            };
          }
          const o = r[e].deref();
          if (o) {
            if (document.contains(o)) {
              if (o.tagName !== "INPUT" || o.type !== "file") {
                return {
                  error: `Element is not a file input. Found: <${o.tagName.toLowerCase()}${o.type ? ` type="${o.type}"` : ""}>`
                };
              } else {
                o.setAttribute(t, "1");
                return {
                  success: true
                };
              }
            } else {
              delete r[e];
              return {
                error: `Element is no longer in the document: "${e}"`
              };
            }
          } else {
            delete r[e];
            return {
              error: `Element has been garbage collected: "${e}"`
            };
          }
        },
        args: [o.ref, h]
      });
      if (!p || p.length === 0) {
        return {
          error: "Failed to execute script to find element"
        };
      }
      const m = p[0].result;
      if (m.error) {
        return {
          error: m.error
        };
      }
      const f = await K.sendCommand(n.id, "Runtime.evaluate", {
        expression: `document.querySelector('[${h}="1"]')`,
        returnByValue: false
      });
      if (f.exceptionDetails) {
        return {
          error: f.exceptionDetails.exception?.description || f.exceptionDetails.text || "Failed to resolve element via CDP"
        };
      }
      const g = f.result?.objectId;
      if (!g) {
        return {
          error: "Failed to get object reference for element"
        };
      }
      await K.sendCommand(n.id, "DOM.enable");
      await K.sendCommand(n.id, "DOM.setFileInputFiles", {
        files: o.paths,
        objectId: g
      });
      await K.sendCommand(n.id, "DOM.disable");
      try {
        await x({
          target: {
            tabId: n.id
          },
          injectImmediately: true,
          func: (e, t) => {
            const r = window.__claudeElementMap;
            if (!r?.[e]) {
              return;
            }
            const o = r[e].deref();
            if (o) {
              o.removeAttribute(t);
            }
          },
          args: [o.ref, h]
        });
      } catch (r) {
        if (!(r instanceof T)) {
          throw r;
        }
      }
      const b = o.paths.map(e => {
        const t = e.split(/[/\\]/);
        return t[t.length - 1];
      });
      const w = await F.getValidTabsWithMetadata(t.tabId);
      return {
        output: `Uploaded ${o.paths.length} file(s) to file input: ${b.join(", ")}`,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: a,
          availableTabs: w,
          tabCount: w.length
        }
      };
    } catch (o) {
      return {
        error: `Failed to upload file(s): ${o instanceof Error ? o.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "file_upload",
    description: "Upload one or multiple files from the local filesystem to a file input element on the page. Do not click on file upload buttons or file inputs — clicking opens a native file picker dialog that you cannot see or interact with. Instead, use read_page or find to locate the file input element, then use this tool with its ref to upload files directly. The paths must be absolute file paths on the local machine.",
    input_schema: {
      type: "object",
      properties: {
        paths: {
          type: "array",
          items: {
            type: "string"
          },
          description: "The absolute paths to the files to upload. Can be a single file or multiple files."
        },
        ref: {
          type: "string",
          description: "Element reference ID of the file input from read_page or find tools (e.g., \"ref_1\", \"ref_2\")."
        },
        tabId: {
          type: "number",
          description: "Tab ID where the file input is located. Use tabs_context first if you don't have a valid tab ID."
        }
      },
      required: ["paths", "ref", "tabId"]
    }
  })
};
const _e = {
  name: "find",
  description: "Find elements on the page using natural language. Can search for elements by their purpose (e.g., \"search bar\", \"login button\") or by text content (e.g., \"organic mango product\"). Returns up to 20 matching elements with references that can be used with other tools. If more than 20 matches exist, you'll be notified to use a more specific query. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
  parameters: {
    query: {
      type: "string",
      description: "Natural language description of what to find (e.g., \"search bar\", \"add to cart button\", \"product title containing organic\")",
      required: true
    },
    tabId: {
      type: "number",
      description: "Tab ID to search in. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
    }
  },
  execute: async (e, t) => {
    try {
      const {
        query: r,
        tabId: o
      } = e;
      if (!r) {
        throw new Error("Query parameter is required");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const a = await F.getEffectiveTabId(o, t.tabId);
      const n = await chrome.tabs.get(a);
      if (!n.id) {
        throw new Error("Active tab has no ID");
      }
      const s = n.url;
      if (!s) {
        throw new Error("No URL available for active tab");
      }
      const i = t?.toolUseId;
      const l = await t.permissionManager.checkPermission(s, i);
      if (!l.allowed) {
        if (l.needsPrompt) {
          return {
            type: "permission_required",
            tool: c.READ_PAGE_CONTENT,
            url: s,
            toolUseId: i
          };
        }
        return {
          error: "Permission denied for reading pages on this domain"
        };
      }
      const d = await x({
        target: {
          tabId: n.id
        },
        func: () => {
          if (typeof window.__generateAccessibilityTree != "function") {
            throw new Error("Accessibility tree function not found. Please refresh the page.");
          }
          return window.__generateAccessibilityTree("all");
        },
        args: []
      });
      if (!d || d.length === 0) {
        throw new Error("No results returned from page script");
      }
      if ("error" in d[0] && d[0].error) {
        throw new Error(`Script execution failed: ${d[0].error.message || "Unknown error"}`);
      }
      if (!d[0].result) {
        throw new Error("Page script returned empty result");
      }
      const u = d[0].result;
      const h = t?.createAnthropicMessage;
      if (!h) {
        throw new Error("Anthropic client not available. Please check your API configuration.");
      }
      u.pageContent.length;
      const p = await h({
        maxTokens: 800,
        modelClass: "small_fast",
        messages: [{
          role: "user",
          content: `You are helping find elements on a web page. The user wants to find: "${r}"\n\nHere is the accessibility tree of the page:\n${u.pageContent}\n\nFind ALL elements that match the user's query. Return up to 20 most relevant matches, ordered by relevance.\n\nReturn your findings in this exact format (one line per matching element):\n\nFOUND: <total_number_of_matching_elements>\nSHOWING: <number_shown_up_to_20>\n---\nref_X | role | name | type | reason why this matches\nref_Y | role | name | type | reason why this matches\n...\n\nIf there are more than 20 matches, add this line at the end:\nMORE: Use a more specific query to see additional results\n\nIf no matching elements are found, return only:\nFOUND: 0\nERROR: explanation of why no elements were found`
        }]
      }, "sampling_find_tool");
      p.content;
      const m = p.content[0];
      if (m.type !== "text") {
        throw new Error("Unexpected response type from API");
      }
      const f = m.text.trim().split("\n").map(e => e.trim()).filter(e => e);
      let g = 0;
      const b = [];
      let w;
      let y = false;
      for (const e of f) {
        if (e.startsWith("FOUND:")) {
          g = parseInt(e.split(":")[1].trim()) || 0;
        } else if (e.startsWith("SHOWING:")) ;else if (e.startsWith("ERROR:")) {
          w = e.substring(6).trim();
        } else if (e.startsWith("MORE:")) {
          y = true;
        } else if (e.includes("|") && e.startsWith("ref_")) {
          const t = e.split("|").map(e => e.trim());
          if (t.length >= 4) {
            b.push({
              ref: t[0],
              role: t[1],
              name: t[2],
              type: t[3] || undefined,
              description: t[4] || undefined
            });
          }
        }
      }
      if (g === 0 || b.length === 0) {
        return {
          error: w || "No matching elements found"
        };
      }
      let _ = `Found ${g} matching element${g === 1 ? "" : "s"}`;
      if (y) {
        _ += ` (showing first ${b.length}, use a more specific query to narrow results)`;
      }
      const v = b.map(e => `- ${e.ref}: ${e.role}${e.name ? ` "${e.name}"` : ""}${e.type ? ` (${e.type})` : ""}${e.description ? ` - ${e.description}` : ""}`).join("\n");
      b.length;
      const I = await F.getValidTabsWithMetadata(t.tabId);
      return {
        output: `${_}\n\n${v}`,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: a,
          availableTabs: I,
          tabCount: I.length
        }
      };
    } catch (r) {
      return {
        error: `Failed to find element: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "find",
    description: "Find elements on the page using natural language. Can search for elements by their purpose (e.g., \"search bar\", \"login button\") or by text content (e.g., \"organic mango product\"). Returns up to 20 matching elements with references that can be used with other tools. If more than 20 matches exist, you'll be notified to use a more specific query. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Natural language description of what to find (e.g., \"search bar\", \"add to cart button\", \"product title containing organic\")"
        },
        tabId: {
          type: "number",
          description: "Tab ID to search in. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        }
      },
      required: ["query", "tabId"]
    }
  })
};
const ve = {
  name: "form_input",
  description: "Set values in form elements using element reference ID from the read_page or find tools. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
  parameters: {
    ref: {
      type: "string",
      description: "Element reference ID from the read_page or find tools (e.g., \"ref_1\", \"ref_2\")"
    },
    value: {
      type: ["string", "boolean", "number"],
      description: "The value to set. For checkboxes use boolean, for selects use option value or text, for other inputs use appropriate string/number"
    },
    tabId: {
      type: "number",
      description: "Tab ID to set form value in. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
    }
  },
  execute: async (e, t) => {
    try {
      const r = e;
      if (!r?.ref) {
        throw new Error("ref parameter is required");
      }
      if (r.value === undefined || r.value === null) {
        throw new Error("Value parameter is required");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const o = await F.getEffectiveTabId(r.tabId, t.tabId);
      const a = await chrome.tabs.get(o);
      if (!a.id) {
        throw new Error("Active tab has no ID");
      }
      const n = a.url;
      if (!n) {
        throw new Error("No URL available for active tab");
      }
      const s = t?.toolUseId;
      const i = await t.permissionManager.checkPermission(n, s);
      if (!i.allowed) {
        if (i.needsPrompt) {
          return {
            type: "permission_required",
            tool: c.TYPE,
            url: n,
            toolUseId: s,
            actionData: {
              ref: r.ref,
              value: r.value
            }
          };
        }
        return {
          error: "Permission denied for form input on this domain"
        };
      }
      const l = a.url;
      if (!l) {
        return {
          error: "Unable to get original URL for security check"
        };
      }
      const d = await A(a.id, l, "form input action");
      if (d) {
        return d;
      }
      const u = await x({
        target: {
          tabId: a.id
        },
        func: (e, t) => {
          try {
            let r = null;
            if (window.__claudeElementMap && window.__claudeElementMap[e]) {
              r = window.__claudeElementMap[e].deref() || null;
              if (!r || !document.contains(r)) {
                delete window.__claudeElementMap[e];
                r = null;
              }
            }
            if (!r) {
              return {
                error: `No element found with reference: "${e}". The element may have been removed from the page.`
              };
            }
            r.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
            if (r instanceof HTMLSelectElement) {
              const e = r.value;
              const o = Array.from(r.options);
              let a = false;
              const n = String(t);
              for (let t = 0; t < o.length; t++) {
                if (o[t].value === n || o[t].text === n) {
                  r.selectedIndex = t;
                  a = true;
                  break;
                }
              }
              if (a) {
                r.focus();
                r.dispatchEvent(new Event("change", {
                  bubbles: true
                }));
                r.dispatchEvent(new Event("input", {
                  bubbles: true
                }));
                return {
                  output: `Selected option "${n}" in dropdown (previous: "${e}")`
                };
              } else {
                return {
                  error: `Option "${n}" not found. Available options: ${o.map(e => `"${e.text}" (value: "${e.value}")`).join(", ")}`
                };
              }
            }
            if (r instanceof HTMLInputElement && r.type === "checkbox") {
              const e = r.checked;
              if (typeof t != "boolean") {
                return {
                  error: "Checkbox requires a boolean value (true/false)"
                };
              } else {
                r.checked = t;
                r.focus();
                r.dispatchEvent(new Event("change", {
                  bubbles: true
                }));
                r.dispatchEvent(new Event("input", {
                  bubbles: true
                }));
                return {
                  output: `Checkbox ${r.checked ? "checked" : "unchecked"} (previous: ${e})`
                };
              }
            }
            if (r instanceof HTMLInputElement && r.type === "radio") {
              const t = r.checked;
              const o = r.name;
              r.checked = true;
              r.focus();
              r.dispatchEvent(new Event("change", {
                bubbles: true
              }));
              r.dispatchEvent(new Event("input", {
                bubbles: true
              }));
              return {
                success: true,
                action: "form_input",
                ref: e,
                element_type: "radio",
                previous_value: t,
                new_value: r.checked,
                message: "Radio button selected" + (o ? ` in group "${o}"` : "")
              };
            }
            if (r instanceof HTMLInputElement && (r.type === "date" || r.type === "time" || r.type === "datetime-local" || r.type === "month" || r.type === "week")) {
              const e = r.value;
              r.value = String(t);
              r.focus();
              r.dispatchEvent(new Event("change", {
                bubbles: true
              }));
              r.dispatchEvent(new Event("input", {
                bubbles: true
              }));
              return {
                output: `Set ${r.type} to "${r.value}" (previous: ${e})`
              };
            }
            if (r instanceof HTMLInputElement && r.type === "range") {
              const o = r.value;
              const a = Number(t);
              if (isNaN(a)) {
                return {
                  error: "Range input requires a numeric value"
                };
              } else {
                r.value = String(a);
                r.focus();
                r.dispatchEvent(new Event("change", {
                  bubbles: true
                }));
                r.dispatchEvent(new Event("input", {
                  bubbles: true
                }));
                return {
                  success: true,
                  action: "form_input",
                  ref: e,
                  element_type: "range",
                  previous_value: o,
                  new_value: r.value,
                  message: `Set range to ${r.value} (min: ${r.min}, max: ${r.max})`
                };
              }
            }
            if (r instanceof HTMLInputElement && r.type === "number") {
              const e = r.value;
              const o = Number(t);
              if (isNaN(o) && t !== "") {
                return {
                  error: "Number input requires a numeric value"
                };
              } else {
                r.value = String(t);
                r.focus();
                r.dispatchEvent(new Event("change", {
                  bubbles: true
                }));
                r.dispatchEvent(new Event("input", {
                  bubbles: true
                }));
                return {
                  output: `Set number input to ${r.value} (previous: ${e})`
                };
              }
            }
            if (r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement) {
              const e = r.value;
              r.value = String(t);
              r.focus();
              if (r instanceof HTMLTextAreaElement || r instanceof HTMLInputElement && ["text", "search", "url", "tel", "password"].includes(r.type)) {
                r.setSelectionRange(r.value.length, r.value.length);
              }
              r.dispatchEvent(new Event("change", {
                bubbles: true
              }));
              r.dispatchEvent(new Event("input", {
                bubbles: true
              }));
              return {
                output: `Set ${r instanceof HTMLTextAreaElement ? "textarea" : r.type || "text"} value to "${r.value}" (previous: "${e}")`
              };
            }
            return {
              error: `Element type "${r.tagName}" is not a supported form input`
            };
          } catch (r) {
            return {
              error: `Error setting form value: ${r instanceof Error ? r.message : "Unknown error"}`
            };
          }
        },
        args: [r.ref, r.value]
      });
      if (!u || u.length === 0) {
        throw new Error("Failed to execute form input");
      }
      const h = await F.getValidTabsWithMetadata(t.tabId);
      return {
        ...u[0].result,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: o,
          availableTabs: h,
          tabCount: h.length
        }
      };
    } catch (r) {
      return {
        error: `Failed to execute form input: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "form_input",
    description: "Set values in form elements using element reference ID from the read_page tool. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
    input_schema: {
      type: "object",
      properties: {
        ref: {
          type: "string",
          description: "Element reference ID from the read_page tool (e.g., \"ref_1\", \"ref_2\")"
        },
        value: {
          type: ["string", "boolean", "number"],
          description: "The value to set. For checkboxes use boolean, for selects use option value or text, for other inputs use appropriate string/number"
        },
        tabId: {
          type: "number",
          description: "Tab ID to set form value in. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        }
      },
      required: ["ref", "value", "tabId"]
    }
  })
};
const Ie = {
  name: "get_page_text",
  description: "Extract raw text content from the page, prioritizing article content. Ideal for reading articles, blog posts, or other text-heavy pages. Returns plain text without HTML formatting. If you don't have a valid tab ID, use tabs_context first to get available tabs. Output is limited to 50000 characters by default.",
  parameters: {
    tabId: {
      type: "number",
      description: "Tab ID to extract text from. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
    },
    max_chars: {
      type: "number",
      description: "Maximum characters for output (default: 50000). Set to a higher value if your client can handle large outputs."
    }
  },
  execute: async (e, t) => {
    const {
      tabId: r,
      max_chars: o
    } = e || {};
    if (!t?.tabId) {
      throw new Error("No active tab found");
    }
    const a = await F.getEffectiveTabId(r, t.tabId);
    const n = (await chrome.tabs.get(a)).url;
    if (!n) {
      throw new Error("No URL available for active tab");
    }
    const s = t?.toolUseId;
    const i = await t.permissionManager.checkPermission(n, s);
    if (!i.allowed) {
      if (i.needsPrompt) {
        return {
          type: "permission_required",
          tool: c.READ_PAGE_CONTENT,
          url: n,
          toolUseId: s
        };
      }
      return {
        error: "Permission denied for reading page content on this domain"
      };
    }
    await F.hideIndicatorForToolUse(a);
    await new Promise(e => setTimeout(e, 50));
    try {
      const e = await x({
        target: {
          tabId: a
        },
        func: e => function () {
          const t = ["article", "main", "[class*=\"articleBody\"]", "[class*=\"article-body\"]", "[class*=\"post-content\"]", "[class*=\"entry-content\"]", "[class*=\"content-body\"]", "[role=\"main\"]", ".content", "#content"];
          let r = null;
          for (const e of t) {
            const t = document.querySelectorAll(e);
            if (t.length > 0) {
              let e = t[0];
              let o = 0;
              t.forEach(t => {
                const r = t.textContent?.length || 0;
                if (r > o) {
                  o = r;
                  e = t;
                }
              });
              r = e;
              break;
            }
          }
          if (!r) {
            if ((document.body.textContent || "").length > e) {
              return {
                text: "",
                source: "none",
                title: document.title,
                url: window.location.href,
                error: "No semantic content element found and page body is too large (likely contains CSS/scripts). Try using read_page_content (screenshot) instead."
              };
            }
            r = document.body;
          }
          const o = (r.textContent || "").replace(/\s+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
          if (!o || o.length < 10) {
            return {
              text: "",
              source: "none",
              title: document.title,
              url: window.location.href,
              error: "No text content found. Page may contain only images, videos, or canvas-based content."
            };
          } else if (o.length > e) {
            return {
              text: "",
              source: r.tagName.toLowerCase(),
              title: document.title,
              url: window.location.href,
              error: "Output exceeds " + e + " character limit (" + o.length + " characters). Try using read_page with a specific ref_id to focus on a smaller section, or increase max_chars if your client can handle larger outputs."
            };
          } else {
            return {
              text: o,
              source: r.tagName.toLowerCase(),
              title: document.title,
              url: window.location.href
            };
          }
        }(),
        args: [o ?? 50000]
      });
      if (!e || e.length === 0) {
        throw new Error("No main text content found. The content might be visual content only, or rendered in a canvas element.");
      }
      if ("error" in e[0] && e[0].error) {
        throw new Error(`Script execution failed: ${e[0].error.message || "Unknown error"}`);
      }
      if (!e[0].result) {
        throw new Error("Page script returned empty result");
      }
      const r = e[0].result;
      const n = await F.getValidTabsWithMetadata(t.tabId);
      if (r.error) {
        return {
          error: r.error,
          tabContext: {
            currentTabId: t.tabId,
            executedOnTabId: a,
            availableTabs: n,
            tabCount: n.length
          }
        };
      } else {
        return {
          output: `Title: ${r.title}\nURL: ${r.url}\nSource element: <${r.source}>\n---\n${r.text}`,
          tabContext: {
            currentTabId: t.tabId,
            executedOnTabId: a,
            availableTabs: n,
            tabCount: n.length
          }
        };
      }
    } catch (l) {
      return {
        error: `Failed to extract page text: ${l instanceof Error ? l.message : "Unknown error"}`
      };
    } finally {
      await F.restoreIndicatorAfterToolUse(a);
    }
  },
  toAnthropicSchema: async () => ({
    name: "get_page_text",
    description: "Extract raw text content from the page, prioritizing article content. Ideal for reading articles, blog posts, or other text-heavy pages. Returns plain text without HTML formatting. If you don't have a valid tab ID, use tabs_context first to get available tabs. Output is limited to 50000 characters by default. If the output exceeds this limit, you will receive an error suggesting alternatives.",
    input_schema: {
      type: "object",
      properties: {
        tabId: {
          type: "number",
          description: "Tab ID to extract text from. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        },
        max_chars: {
          type: "number",
          description: "Maximum characters for output (default: 50000). Set to a higher value if your client can handle large outputs."
        }
      },
      required: ["tabId"]
    }
  })
};
let ke;
function Te() {
  ke ??= (async () => {
    if (chrome.offscreen) {
      if (!(await chrome.offscreen.hasDocument())) {
        await chrome.offscreen.createDocument({
          url: "offscreen.html",
          reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK, chrome.offscreen.Reason.BLOBS],
          justification: "Keep service worker alive, play notification sounds, generate GIFs"
        });
      }
    }
  })().finally(() => {
    ke = undefined;
  });
  return ke;
}
const xe = new class {
  storage = new Map();
  recordingGroups = new Set();
  addFrame(e, t) {
    if (!this.storage.has(e)) {
      this.storage.set(e, {
        frames: [],
        lastUpdated: Date.now()
      });
    }
    const r = this.storage.get(e);
    r.frames.push(t);
    r.lastUpdated = Date.now();
    if (r.frames.length > 50) {
      r.frames.shift();
    }
  }
  getFrames(e) {
    return this.storage.get(e)?.frames ?? [];
  }
  clearFrames(e) {
    this.storage.get(e)?.frames.length;
    this.storage.delete(e);
    this.recordingGroups.delete(e);
  }
  getFrameCount(e) {
    return this.storage.get(e)?.frames.length ?? 0;
  }
  getActiveGroupIds() {
    return Array.from(this.storage.keys());
  }
  startRecording(e) {
    this.recordingGroups.add(e);
  }
  stopRecording(e) {
    this.recordingGroups.delete(e);
  }
  isRecording(e) {
    return this.recordingGroups.has(e);
  }
  getRecordingGroupIds() {
    return Array.from(this.recordingGroups);
  }
  clearAll() {
    Array.from(this.storage.values()).reduce((e, t) => e + t.frames.length, 0);
    this.storage.clear();
    this.recordingGroups.clear();
  }
}();
const Se = "mcp-native-session";
const Ee = {
  name: "gif_creator",
  description: "Manage GIF recording and export for browser automation sessions. Control when to start/stop recording browser actions (clicks, scrolls, navigation), then export as an animated GIF with visual overlays (click indicators, action labels, progress bar, watermark). All operations are scoped to the tab's group. When starting recording, take a screenshot immediately after to capture the initial state as the first frame. When stopping recording, take a screenshot immediately before to capture the final state as the last frame. For export, either provide 'coordinate' to drag/drop upload to a page element, or set 'download: true' to download the GIF.",
  parameters: {
    action: {
      type: "string",
      description: "Action to perform: 'start_recording' (begin capturing), 'stop_recording' (stop capturing but keep frames), 'export' (generate and export GIF), 'clear' (discard frames)"
    },
    tabId: {
      type: "number",
      description: "Tab ID to identify which tab group this operation applies to"
    },
    coordinate: {
      type: "array",
      description: "Viewport coordinates [x, y] for drag & drop upload. Required for 'export' action unless 'download' is true."
    },
    download: {
      type: "boolean",
      description: "If true, download the GIF instead of drag/drop upload. For 'export' action only."
    },
    filename: {
      type: "string",
      description: "Optional filename for exported GIF (default: 'recording-[timestamp].gif'). For 'export' action only."
    },
    options: {
      type: "object",
      description: "Optional GIF enhancement options for 'export' action. All default to true."
    }
  },
  execute: async (e, t) => {
    try {
      const o = e;
      if (!o?.action) {
        throw new Error("action parameter is required");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found in context");
      }
      const a = await chrome.tabs.get(o.tabId);
      if (!a) {
        throw new Error(`Tab ${o.tabId} not found`);
      }
      const n = a.groupId ?? -1;
      if (t.sessionId === Se) {
        const e = await chrome.storage.local.get(r.MCP_TAB_GROUP_ID);
        if (n !== e[r.MCP_TAB_GROUP_ID]) {
          return {
            error: `Tab ${o.tabId} is not in the MCP tab group. GIF recording only works for tabs within the MCP tab group.`
          };
        }
      }
      switch (o.action) {
        case "start_recording":
          return await async function (e) {
            const t = xe.isRecording(e);
            if (t) {
              return {
                output: "Recording is already active for this tab group. Use 'stop_recording' to stop or 'export' to generate GIF."
              };
            }
            xe.clearFrames(e);
            xe.startRecording(e);
            return {
              output: "Started recording browser actions for this tab group. All computer and navigate tool actions will now be captured (max 50 frames). Previous frames cleared."
            };
          }(n);
        case "stop_recording":
          return await async function (e) {
            const t = xe.isRecording(e);
            if (!t) {
              return {
                output: "Recording is not active for this tab group. Use 'start_recording' to begin capturing."
              };
            }
            xe.stopRecording(e);
            const r = xe.getFrameCount(e);
            return {
              output: `Stopped recording for this tab group. Captured ${r} frame${r === 1 ? "" : "s"}. Use 'export' to generate GIF or 'clear' to discard.`
            };
          }(n);
        case "export":
          return await async function (e, t, r, o) {
            const a = e.download === true;
            if (!a && (!e.coordinate || e.coordinate.length !== 2)) {
              throw new Error("coordinate parameter is required for export action (or set download: true to download the GIF)");
            }
            if (!t.id || !t.url) {
              throw new Error("Tab has no ID or URL");
            }
            const n = xe.getFrames(r);
            if (n.length === 0) {
              return {
                error: "No frames recorded for this tab group. Use 'start_recording' and perform browser actions first."
              };
            }
            if (!a) {
              const r = t.url;
              const a = o?.toolUseId;
              const n = await o.permissionManager.checkPermission(r, a);
              if (!n.allowed) {
                if (n.needsPrompt) {
                  return {
                    type: "permission_required",
                    tool: c.UPLOAD_IMAGE,
                    url: r,
                    toolUseId: a,
                    actionData: {
                      coordinate: e.coordinate
                    }
                  };
                }
                return {
                  error: "Permission denied for uploading to this domain"
                };
              }
            }
            const s = t.url;
            await Te();
            const i = n.map(e => ({
              base64: e.base64,
              format: "jpeg",
              action: e.action,
              delay: e.action ? Ce(e.action.type) : 800,
              viewportWidth: e.viewportWidth,
              viewportHeight: e.viewportHeight,
              devicePixelRatio: e.devicePixelRatio
            }));
            const l = {
              showClickIndicators: e.options?.showClickIndicators ?? true,
              showDragPaths: e.options?.showDragPaths ?? true,
              showActionLabels: e.options?.showActionLabels ?? true,
              showProgressBar: e.options?.showProgressBar ?? true,
              showWatermark: e.options?.showWatermark ?? true,
              quality: e.options?.quality ?? 10
            };
            const d = await new Promise((e, t) => {
              chrome.runtime.sendMessage({
                type: "GENERATE_GIF",
                frames: i,
                options: l
              }, r => {
                if (chrome.runtime.lastError) {
                  t(new Error(chrome.runtime.lastError.message));
                } else if (r && r.success) {
                  e(r.result);
                } else {
                  t(new Error(r?.error || "Unknown error from offscreen"));
                }
              });
            });
            const u = new Date().toISOString().replace(/[:.]/g, "-");
            const h = e.filename || `recording-${u}.gif`;
            let p;
            const m = () => {
              chrome.runtime.sendMessage({
                type: "REVOKE_BLOB_URL",
                blobUrl: d.blobUrl
              });
            };
            let f = false;
            try {
              if (a) {
                const e = await chrome.downloads.download({
                  url: d.blobUrl,
                  filename: h,
                  saveAs: false
                });
                const t = r => {
                  if (r.id === e && (r.state?.current === "complete" || r.state?.current === "interrupted")) {
                    chrome.downloads.onChanged.removeListener(t);
                    m();
                  }
                };
                chrome.downloads.onChanged.addListener(t);
                f = true;
                const [r] = await chrome.downloads.search({
                  id: e
                });
                if (r && r.state !== "in_progress") {
                  chrome.downloads.onChanged.removeListener(t);
                  m();
                }
                p = `Successfully exported GIF with ${n.length} frames. Downloaded "${h}" (${Math.round(d.size / 1024)}KB). Dimensions: ${d.width}x${d.height}. Recording cleared.`;
              } else {
                const r = await A(t.id, s, "GIF export upload action");
                if (r) {
                  return r;
                }
                const o = await chrome.scripting.executeScript({
                  target: {
                    tabId: t.id
                  },
                  func: (e, t, r, o) => {
                    const a = atob(e);
                    const n = new Array(a.length);
                    for (let u = 0; u < a.length; u++) {
                      n[u] = a.charCodeAt(u);
                    }
                    const s = new Uint8Array(n);
                    const i = new Blob([s], {
                      type: "image/gif"
                    });
                    const c = new File([i], t, {
                      type: "image/gif",
                      lastModified: Date.now()
                    });
                    const l = new DataTransfer();
                    l.items.add(c);
                    const d = document.elementFromPoint(r, o);
                    if (!d) {
                      throw new Error(`No element found at coordinates (${r}, ${o})`);
                    }
                    d.dispatchEvent(new DragEvent("dragenter", {
                      bubbles: true,
                      cancelable: true,
                      dataTransfer: l,
                      clientX: r,
                      clientY: o
                    }));
                    d.dispatchEvent(new DragEvent("dragover", {
                      bubbles: true,
                      cancelable: true,
                      dataTransfer: l,
                      clientX: r,
                      clientY: o
                    }));
                    d.dispatchEvent(new DragEvent("drop", {
                      bubbles: true,
                      cancelable: true,
                      dataTransfer: l,
                      clientX: r,
                      clientY: o
                    }));
                    return {
                      output: `Successfully dropped ${t} (${Math.round(i.size / 1024)}KB) at (${r}, ${o})`
                    };
                  },
                  args: [d.base64, h, e.coordinate[0], e.coordinate[1]]
                });
                if (!o || !o[0]?.result) {
                  throw new Error("Failed to upload GIF to page");
                }
                p = `Successfully exported GIF with ${n.length} frames. ${o[0].result.output}. Dimensions: ${d.width}x${d.height}. Recording cleared.`;
              }
            } finally {
              if (!f) {
                m();
              }
            }
            xe.clearFrames(r);
            const g = await F.getValidTabsWithMetadata(o.tabId);
            return {
              output: p,
              tabContext: {
                currentTabId: o.tabId,
                executedOnTabId: t.id,
                availableTabs: g,
                tabCount: g.length
              }
            };
          }(o, a, n, t);
        case "clear":
          return await async function (e) {
            const t = xe.getFrameCount(e);
            if (t === 0) {
              return {
                output: "No frames to clear for this tab group."
              };
            }
            xe.clearFrames(e);
            return {
              output: `Cleared ${t} frame${t === 1 ? "" : "s"} for this tab group. Recording stopped.`
            };
          }(n);
        default:
          throw new Error(`Unknown action: ${o.action}. Must be one of: start_recording, stop_recording, export, clear`);
      }
    } catch (o) {
      return {
        error: `Failed to execute gif_creator: ${o instanceof Error ? o.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "gif_creator",
    description: "Manage GIF recording and export for browser automation sessions. Control when to start/stop recording browser actions (clicks, scrolls, navigation), then export as an animated GIF with visual overlays (click indicators, action labels, progress bar, watermark). All operations are scoped to the tab's group. When starting recording, take a screenshot immediately after to capture the initial state as the first frame. When stopping recording, take a screenshot immediately before to capture the final state as the last frame. For export, either provide 'coordinate' to drag/drop upload to a page element, or set 'download: true' to download the GIF.",
    input_schema: {
      type: "object",
      properties: {
        action: {
          type: "string",
          enum: ["start_recording", "stop_recording", "export", "clear"],
          description: "Action to perform: 'start_recording' (begin capturing), 'stop_recording' (stop capturing but keep frames), 'export' (generate and export GIF), 'clear' (discard frames)"
        },
        tabId: {
          type: "number",
          description: "Tab ID to identify which tab group this operation applies to"
        },
        coordinate: {
          type: "array",
          items: {
            type: "number"
          },
          description: "Viewport coordinates [x, y] for drag & drop upload. Required for 'export' action unless 'download' is true."
        },
        download: {
          type: "boolean",
          description: "If true, download the GIF instead of drag/drop upload. For 'export' action only."
        },
        filename: {
          type: "string",
          description: "Optional filename for exported GIF (default: 'recording-[timestamp].gif'). For 'export' action only."
        },
        options: {
          type: "object",
          description: "Optional GIF enhancement options for 'export' action. Properties: showClickIndicators (bool), showDragPaths (bool), showActionLabels (bool), showProgressBar (bool), showWatermark (bool), quality (number 1-30). All default to true except quality (default: 10).",
          properties: {
            showClickIndicators: {
              type: "boolean",
              description: "Show orange circles at click locations (default: true)"
            },
            showDragPaths: {
              type: "boolean",
              description: "Show red arrows for drag actions (default: true)"
            },
            showActionLabels: {
              type: "boolean",
              description: "Show black labels describing actions (default: true)"
            },
            showProgressBar: {
              type: "boolean",
              description: "Show orange progress bar at bottom (default: true)"
            },
            showWatermark: {
              type: "boolean",
              description: "Show Claw logo watermark (default: true)"
            },
            quality: {
              type: "number",
              description: "GIF compression quality, 1-30 (lower = better quality, slower encoding). Default: 10"
            }
          }
        }
      },
      required: ["action", "tabId"]
    }
  })
};
function Ce(e) {
  return {
    wait: 300,
    screenshot: 300,
    navigate: 800,
    scroll: 800,
    scroll_to: 800,
    type: 800,
    key: 800,
    zoom: 800,
    left_click: 1500,
    right_click: 1500,
    double_click: 1500,
    triple_click: 1500,
    left_click_drag: 1500
  }[e] ?? 800;
}
async function Me(e, t, r) {
  K.setBeforeunloadPolicy(e, t ? "accept" : "dismiss");
  await r();
  await K.waitForBeforeunloadResolution(e, 300);
  const o = K.consumeBeforeunloadOutcome(e);
  if (o) {
    if (o.action === "accepted") {
      return {
        kind: "accepted",
        suffix: " (discarded a \"Leave site?\" dialog — the page had unsaved changes that are now lost)"
      };
    } else {
      return {
        kind: "blocked",
        error: `Navigation was blocked by a "Leave site?" dialog — the page at ${o.url} has unsaved changes. The page is still open and unchanged. Either address the unsaved state first, or retry with force: true to discard it and navigate anyway.`
      };
    }
  } else {
    return {
      kind: "none"
    };
  }
}
const De = {
  name: "navigate",
  description: "Navigate to a URL, or go forward/back in browser history. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
  parameters: {
    url: {
      type: "string",
      description: "The URL to navigate to. Can be provided with or without protocol (defaults to https://). Use \"forward\" to go forward in history or \"back\" to go back in history."
    },
    tabId: {
      type: "number",
      description: "Tab ID to navigate. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
    },
    force: {
      type: "boolean",
      description: "If the page shows a \"Leave site?\" dialog because of unsaved changes, discard those changes and navigate anyway. Defaults to false: navigation is blocked and an error is returned so you can decide first."
    }
  },
  execute: async (e, t) => {
    try {
      const {
        url: o,
        tabId: a,
        force: n
      } = e;
      if (!o) {
        throw new Error("URL parameter is required");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const s = await F.getEffectiveTabId(a, t.tabId);
      try {
        if (await K.isDebuggerAttached(s)) {
          await K.sendCommand(s, "Page.enable");
        } else {
          await K.attachDebugger(s);
        }
      } catch (r) {}
      if (o && !["back", "forward"].includes(o.toLowerCase())) {
        try {
          const e = await O.getCategory(o);
          if (e && (e === "category1" || e === "category2" || e === "category_org_blocked")) {
            return {
              error: e === "category_org_blocked" ? "This site is blocked by your organization's policy." : "This site is not allowed due to safety restrictions."
            };
          }
        } catch {}
      }
      const i = await chrome.tabs.get(s);
      if (!i.id) {
        throw new Error("Active tab has no ID");
      }
      if (o.toLowerCase() === "back") {
        const e = await Me(s, n, () => chrome.tabs.goBack(i.id));
        if (e.kind === "blocked") {
          return {
            error: e.error
          };
        }
        const r = await chrome.tabs.get(i.id);
        const o = await F.getValidTabsWithMetadata(t.tabId);
        return {
          output: `Navigated back to ${r.url}${e.kind === "accepted" ? e.suffix : ""}`,
          tabContext: {
            currentTabId: t.tabId,
            executedOnTabId: s,
            availableTabs: o,
            tabCount: o.length
          }
        };
      }
      if (o.toLowerCase() === "forward") {
        const e = await Me(s, n, () => chrome.tabs.goForward(i.id));
        if (e.kind === "blocked") {
          return {
            error: e.error
          };
        }
        const r = await chrome.tabs.get(i.id);
        const o = await F.getValidTabsWithMetadata(t.tabId);
        return {
          output: `Navigated forward to ${r.url}${e.kind === "accepted" ? e.suffix : ""}`,
          tabContext: {
            currentTabId: t.tabId,
            executedOnTabId: s,
            availableTabs: o,
            tabCount: o.length
          }
        };
      }
      let l = o;
      if (!l.match(/^https?:\/\//i)) {
        l = `https://${l}`;
      }
      try {
        new URL(l);
      } catch (r) {
        throw new Error(`Invalid URL: ${o}`);
      }
      const d = t?.toolUseId;
      const u = await t.permissionManager.checkPermission(l, d);
      if (!u.allowed) {
        if (u.needsPrompt) {
          return {
            type: "permission_required",
            tool: c.NAVIGATE,
            url: l,
            toolUseId: d
          };
        } else {
          return {
            error: "Navigation to this domain is not allowed"
          };
        }
      }
      const h = await Me(s, n, async () => {
        await chrome.tabs.update(s, {
          url: l
        });
      });
      if (h.kind === "blocked") {
        return {
          error: h.error
        };
      }
      const p = await F.getValidTabsWithMetadata(t.tabId);
      return {
        output: `Navigated to ${l}${h.kind === "accepted" ? h.suffix : ""}`,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: s,
          availableTabs: p,
          tabCount: p.length
        }
      };
    } catch (o) {
      return {
        error: `Failed to navigate: ${o instanceof Error ? o.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "navigate",
    description: "Navigate to a URL, or go forward/back in browser history. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
    input_schema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL to navigate to. Can be provided with or without protocol (defaults to https://). Use \"forward\" to go forward in history or \"back\" to go back in history."
        },
        tabId: {
          type: "number",
          description: "Tab ID to navigate. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        },
        force: {
          type: "boolean",
          description: "If the page shows a \"Leave site?\" dialog because of unsaved changes, discard those changes and navigate anyway. Defaults to false: navigation is blocked and an error is returned so you can decide first."
        }
      },
      required: ["url", "tabId"]
    }
  })
};
const Re = {
  name: "read_console_messages",
  description: "Read browser console messages (console.log, console.error, console.warn, etc.) from a specific tab. Useful for debugging JavaScript errors, viewing application logs, or understanding what's happening in the browser console. Returns console messages from the current domain only. If you don't have a valid tab ID, use tabs_context first to get available tabs. IMPORTANT: Always provide a pattern to filter messages - without a pattern, you may get too many irrelevant messages.",
  parameters: {
    tabId: {
      type: "number",
      description: "Tab ID to read console messages from. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID.",
      required: true
    },
    onlyErrors: {
      type: "boolean",
      description: "If true, only return error and exception messages. Default is false (return all message types).",
      required: false
    },
    clear: {
      type: "boolean",
      description: "If true, clear the console messages after reading to avoid duplicates on subsequent calls. Default is false.",
      required: false
    },
    pattern: {
      type: "string",
      description: "Regex pattern to filter console messages. Only messages matching this pattern will be returned (e.g., 'error|warning' to find errors and warnings, 'MyApp' to filter app-specific logs). You should always provide a pattern to avoid getting too many irrelevant messages.",
      required: false
    }
  },
  execute: async (e, t) => {
    try {
      const {
        tabId: o,
        onlyErrors: a = false,
        clear: n = false,
        pattern: s,
        limit: i = 100
      } = e;
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const l = await F.getEffectiveTabId(o, t.tabId);
      const d = await chrome.tabs.get(l);
      if (!d.id) {
        throw new Error("Active tab has no ID");
      }
      const u = d.url;
      if (!u) {
        throw new Error("No URL available for active tab");
      }
      const h = t?.toolUseId;
      const p = await t.permissionManager.checkPermission(u, h);
      if (!p.allowed) {
        if (p.needsPrompt) {
          return {
            type: "permission_required",
            tool: c.READ_CONSOLE_MESSAGES,
            url: u,
            toolUseId: h
          };
        }
        return {
          error: "Permission denied for reading console messages on this domain"
        };
      }
      try {
        await K.enableConsoleTracking(d.id);
      } catch (r) {}
      const m = K.getConsoleMessages(d.id, a, s);
      if (n) {
        K.clearConsoleMessages(d.id);
      }
      if (m.length === 0) {
        return {
          output: `No console ${a ? "errors or exceptions" : "messages"} found for this tab.\n\nNote: Console tracking starts when this tool is first called. If the page loaded before calling this tool, you may need to refresh the page to capture console messages from page load.`,
          tabContext: {
            currentTabId: t.tabId,
            executedOnTabId: l,
            availableTabs: await F.getValidTabsWithMetadata(t.tabId),
            tabCount: (await F.getValidTabsWithMetadata(t.tabId)).length
          }
        };
      }
      const f = m.slice(0, i);
      const g = m.length > i;
      const b = f.map((e, t) => {
        const r = new Date(e.timestamp).toLocaleTimeString();
        const o = e.url && e.lineNumber !== undefined ? ` (${e.url}:${e.lineNumber}${e.columnNumber !== undefined ? `:${e.columnNumber}` : ""})` : "";
        let a = `[${t + 1}] [${r}] [${e.type.toUpperCase()}]${o}\n${e.text}`;
        if (e.stackTrace) {
          a += `\nStack trace:\n${e.stackTrace}`;
        }
        return a;
      }).join("\n\n");
      const w = a ? "error/exception messages" : "console messages";
      const y = g ? ` (showing first ${i} of ${m.length})` : "";
      const _ = `Found ${m.length} ${w}${y}:`;
      const v = await F.getValidTabsWithMetadata(t.tabId);
      return {
        output: `${_}\n\n${b}`,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: l,
          availableTabs: v,
          tabCount: v.length
        }
      };
    } catch (r) {
      return {
        error: `Failed to read console messages: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "read_console_messages",
    description: "Read browser console messages (console.log, console.error, console.warn, etc.) from a specific tab. Useful for debugging JavaScript errors, viewing application logs, or understanding what's happening in the browser console. Returns console messages from the current domain only. If you don't have a valid tab ID, use tabs_context first to get available tabs. IMPORTANT: Always provide a pattern to filter messages - without a pattern, you may get too many irrelevant messages.",
    input_schema: {
      type: "object",
      properties: {
        tabId: {
          type: "number",
          description: "Tab ID to read console messages from. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        },
        onlyErrors: {
          type: "boolean",
          description: "If true, only return error and exception messages. Default is false (return all message types)."
        },
        clear: {
          type: "boolean",
          description: "If true, clear the console messages after reading to avoid duplicates on subsequent calls. Default is false."
        },
        pattern: {
          type: "string",
          description: "Regex pattern to filter console messages. Only messages matching this pattern will be returned (e.g., 'error|warning' to find errors and warnings, 'MyApp' to filter app-specific logs). You should always provide a pattern to avoid getting too many irrelevant messages."
        },
        limit: {
          type: "number",
          description: "Maximum number of messages to return. Defaults to 100. Increase only if you need more results."
        }
      },
      required: ["tabId"]
    }
  })
};
const Ae = {
  name: "read_network_requests",
  description: "Read HTTP network requests (XHR, Fetch, documents, images, etc.) from a specific tab. Useful for debugging API calls, monitoring network activity, or understanding what requests a page is making. Returns all network requests made by the current page, including cross-origin requests. Requests are automatically cleared when the page navigates to a different domain. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
  parameters: {
    tabId: {
      type: "number",
      description: "Tab ID to read network requests from. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID.",
      required: true
    },
    urlPattern: {
      type: "string",
      description: "Optional URL pattern to filter requests. Only requests whose URL contains this string will be returned (e.g., '/api/' to filter API calls, 'example.com' to filter by domain).",
      required: false
    },
    clear: {
      type: "boolean",
      description: "If true, clear the network requests after reading to avoid duplicates on subsequent calls. Default is false.",
      required: false
    },
    limit: {
      type: "number",
      description: "Maximum number of requests to return. Defaults to 100. Increase only if you need more results.",
      required: false
    }
  },
  execute: async (e, t) => {
    try {
      const {
        tabId: o,
        urlPattern: a,
        clear: n = false,
        limit: s = 100
      } = e;
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const i = await F.getEffectiveTabId(o, t.tabId);
      const l = await chrome.tabs.get(i);
      if (!l.id) {
        throw new Error("Active tab has no ID");
      }
      const d = l.url;
      if (!d) {
        throw new Error("No URL available for active tab");
      }
      const u = t?.toolUseId;
      const h = await t.permissionManager.checkPermission(d, u);
      if (!h.allowed) {
        if (h.needsPrompt) {
          return {
            type: "permission_required",
            tool: c.READ_NETWORK_REQUESTS,
            url: d,
            toolUseId: u
          };
        }
        return {
          error: "Permission denied for reading network requests on this domain"
        };
      }
      try {
        await K.enableNetworkTracking(l.id);
      } catch (r) {}
      const p = K.getNetworkRequests(l.id, a);
      if (n) {
        K.clearNetworkRequests(l.id);
      }
      if (p.length === 0) {
        let e = "network requests";
        if (a) {
          e = `requests matching "${a}"`;
        }
        return {
          output: `No ${e} found for this tab.\n\nNote: Network tracking starts when this tool is first called. If the page loaded before calling this tool, you may need to refresh the page or perform actions that trigger network requests.`,
          tabContext: {
            currentTabId: t.tabId,
            executedOnTabId: i,
            availableTabs: await F.getValidTabsWithMetadata(t.tabId),
            tabCount: (await F.getValidTabsWithMetadata(t.tabId)).length
          }
        };
      }
      const m = p.slice(0, s);
      const f = p.length > s;
      const g = m.map((e, t) => {
        const r = e.status || "pending";
        return `${t + 1}. url: ${e.url}\n   method: ${e.method}\n   statusCode: ${r}`;
      }).join("\n\n");
      const b = [];
      if (a) {
        b.push(`URL pattern: "${a}"`);
      }
      const w = b.length > 0 ? ` (filtered by ${b.join(", ")})` : "";
      const y = f ? ` (showing first ${s} of ${p.length})` : "";
      const _ = `Found ${p.length} network request${p.length === 1 ? "" : "s"}${w}${y}:`;
      const v = await F.getValidTabsWithMetadata(t.tabId);
      return {
        output: `${_}\n\n${g}`,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: i,
          availableTabs: v,
          tabCount: v.length
        }
      };
    } catch (r) {
      return {
        error: `Failed to read network requests: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "read_network_requests",
    description: "Read HTTP network requests (XHR, Fetch, documents, images, etc.) from a specific tab. Useful for debugging API calls, monitoring network activity, or understanding what requests a page is making. Returns all network requests made by the current page, including cross-origin requests. Requests are automatically cleared when the page navigates to a different domain. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
    input_schema: {
      type: "object",
      properties: {
        tabId: {
          type: "number",
          description: "Tab ID to read network requests from. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        },
        urlPattern: {
          type: "string",
          description: "Optional URL pattern to filter requests. Only requests whose URL contains this string will be returned (e.g., '/api/' to filter API calls, 'example.com' to filter by domain)."
        },
        clear: {
          type: "boolean",
          description: "If true, clear the network requests after reading to avoid duplicates on subsequent calls. Default is false."
        },
        limit: {
          type: "number",
          description: "Maximum number of requests to return. Defaults to 100. Increase only if you need more results."
        }
      },
      required: ["tabId"]
    }
  })
};
const Pe = {
  name: "read_page",
  description: "Get an accessibility tree representation of elements on the page. By default returns all elements including non-visible ones. Can optionally filter for only interactive elements, limit tree depth, or focus on a specific element. Returns a structured tree that represents how screen readers see the page content. If you don't have a valid tab ID, use tabs_context first to get available tabs. Output is limited to 50000 characters - if exceeded, specify a depth limit or ref_id to focus on a specific element.",
  parameters: {
    filter: {
      type: "string",
      enum: ["interactive", "all"],
      description: "Filter elements: \"interactive\" for buttons/links/inputs only, \"all\" for all elements including non-visible ones (default: all elements)"
    },
    tabId: {
      type: "number",
      description: "Tab ID to read from. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
    },
    depth: {
      type: "number",
      description: "Maximum depth of the tree to traverse (default: 15). Use a smaller depth if output is too large."
    },
    ref_id: {
      type: "string",
      description: "Reference ID of a parent element to read. Will return the specified element and all its children. Use this to focus on a specific part of the page when output is too large."
    },
    max_chars: {
      type: "number",
      description: "Maximum characters for output (default: 50000). Set to a higher value if your client can handle large outputs."
    }
  },
  execute: async (e, t) => {
    const {
      filter: r,
      tabId: o,
      depth: a,
      ref_id: n,
      max_chars: s
    } = e || {};
    if (!t?.tabId) {
      throw new Error("No active tab found");
    }
    const i = await F.getEffectiveTabId(o, t.tabId);
    const l = await chrome.tabs.get(i);
    if (!l.id) {
      throw new Error("Active tab has no ID");
    }
    const d = l.url;
    if (!d) {
      throw new Error("No URL available for active tab");
    }
    const u = t?.toolUseId;
    const h = await t.permissionManager.checkPermission(d, u);
    if (!h.allowed) {
      if (h.needsPrompt) {
        return {
          type: "permission_required",
          tool: c.READ_PAGE_CONTENT,
          url: d,
          toolUseId: u
        };
      }
      return {
        error: "Permission denied for reading pages on this domain"
      };
    }
    await F.hideIndicatorForToolUse(i);
    await new Promise(e => setTimeout(e, 50));
    try {
      const e = await x({
        target: {
          tabId: l.id
        },
        func: (e, t, r, o) => {
          if (typeof window.__generateAccessibilityTree != "function") {
            throw new Error("Accessibility tree function not found. Please refresh the page.");
          }
          return window.__generateAccessibilityTree(e, t, r, o);
        },
        args: [r || null, a ?? null, s ?? 50000, n ?? null]
      });
      if (!e || e.length === 0) {
        throw new Error("No results returned from page script");
      }
      if ("error" in e[0] && e[0].error) {
        throw new Error(`Script execution failed: ${e[0].error.message || "Unknown error"}`);
      }
      if (!e[0].result) {
        throw new Error("Page script returned empty result");
      }
      const o = e[0].result;
      if (o.error) {
        return {
          error: o.error
        };
      }
      if (!e[0].result) {
        throw new Error("Page script returned empty result");
      }
      const c = `Viewport: ${o.viewport.width}x${o.viewport.height}`;
      const d = await F.getValidTabsWithMetadata(t.tabId);
      return {
        output: `${o.pageContent}\n\n${c}`,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: i,
          availableTabs: d,
          tabCount: d.length
        }
      };
    } catch (p) {
      return {
        error: `Failed to read page: ${p instanceof Error ? p.message : "Unknown error"}`
      };
    } finally {
      await F.restoreIndicatorAfterToolUse(i);
    }
  },
  toAnthropicSchema: async () => ({
    name: "read_page",
    description: "Get an accessibility tree representation of elements on the page. By default returns all elements including non-visible ones. Output is limited to 50000 characters. If the output exceeds this limit, you will receive an error asking you to specify a smaller depth or focus on a specific element using ref_id. Optionally filter for only interactive elements. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
    input_schema: {
      type: "object",
      properties: {
        filter: {
          type: "string",
          enum: ["interactive", "all"],
          description: "Filter elements: \"interactive\" for buttons/links/inputs only, \"all\" for all elements including non-visible ones (default: all elements)"
        },
        tabId: {
          type: "number",
          description: "Tab ID to read from. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        },
        depth: {
          type: "number",
          description: "Maximum depth of the tree to traverse (default: 15). Use a smaller depth if output is too large."
        },
        ref_id: {
          type: "string",
          description: "Reference ID of a parent element to read. Will return the specified element and all its children. Use this to focus on a specific part of the page when output is too large."
        },
        max_chars: {
          type: "number",
          description: "Maximum characters for output (default: 50000). Set to a higher value if your client can handle large outputs."
        }
      },
      required: ["tabId"]
    }
  })
};
const Ue = {
  name: "resize_window",
  description: "Resize the current browser window to specified dimensions. Useful for testing responsive designs or setting up specific screen sizes. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
  parameters: {
    width: {
      type: "number",
      description: "Target window width in pixels"
    },
    height: {
      type: "number",
      description: "Target window height in pixels"
    },
    tabId: {
      type: "number",
      description: "Tab ID to get the window for. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
    }
  },
  execute: async (e, t) => {
    try {
      const {
        width: r,
        height: o,
        tabId: a
      } = e;
      if (!r || !o) {
        throw new Error("Both width and height parameters are required");
      }
      if (!a) {
        throw new Error("tabId parameter is required");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      if (typeof r != "number" || typeof o != "number") {
        throw new Error("Width and height must be numbers");
      }
      if (r <= 0 || o <= 0) {
        throw new Error("Width and height must be positive numbers");
      }
      if (r > 7680 || o > 4320) {
        throw new Error("Dimensions exceed 8K resolution limit. Maximum dimensions are 7680x4320");
      }
      const n = await F.getEffectiveTabId(a, t.tabId);
      const s = await chrome.tabs.get(n);
      if (!s.windowId) {
        throw new Error("Tab does not have an associated window");
      }
      await chrome.windows.update(s.windowId, {
        width: Math.floor(r),
        height: Math.floor(o)
      });
      return {
        output: `Successfully resized window containing tab ${n} to ${Math.floor(r)}x${Math.floor(o)} pixels`
      };
    } catch (r) {
      return {
        error: `Failed to resize window: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "resize_window",
    description: "Resize the current browser window to specified dimensions. Useful for testing responsive designs or setting up specific screen sizes. If you don't have a valid tab ID, use tabs_context first to get available tabs.",
    input_schema: {
      type: "object",
      properties: {
        width: {
          type: "number",
          description: "Target window width in pixels"
        },
        height: {
          type: "number",
          description: "Target window height in pixels"
        },
        tabId: {
          type: "number",
          description: "Tab ID to get the window for. Must be a tab in the current group. Use tabs_context first if you don't have a valid tab ID."
        }
      },
      required: ["width", "height", "tabId"]
    }
  })
};
const $e = {
  name: "tabs_context",
  description: "Get context information about all tabs in the current tab group",
  parameters: {},
  execute: async (e, t) => {
    try {
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const e = t.sessionId === Se;
      const r = await F.getValidTabsWithMetadata(t.tabId);
      const o = {
        currentTabId: t.tabId,
        availableTabs: r,
        tabCount: r.length
      };
      let a;
      if (e) {
        a = await async function (e) {
          try {
            const t = await chrome.tabs.get(e);
            if (t.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
              return t.groupId;
            }
          } catch (t) {}
        }(t.tabId);
      }
      const n = J(r, a);
      if (a !== undefined) {
        return {
          output: n,
          tabContext: {
            ...o,
            tabGroupId: a
          }
        };
      } else {
        return {
          output: n,
          tabContext: o
        };
      }
    } catch (r) {
      return {
        error: `Failed to query tabs: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "tabs_context",
    description: "Get context information about all tabs in the current tab group",
    input_schema: {
      type: "object",
      properties: {},
      required: []
    }
  })
};
const Oe = {
  name: "tabs_create",
  description: "Creates a new empty tab in the current tab group",
  parameters: {},
  execute: async (e, t) => {
    try {
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const e = await chrome.tabs.get(t.tabId);
      const r = await chrome.tabs.create({
        url: "chrome://newtab",
        active: false
      });
      if (!r.id) {
        throw new Error("Failed to create tab - no tab ID returned");
      }
      if (e.groupId && e.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
        await chrome.tabs.group({
          tabIds: r.id,
          groupId: e.groupId
        });
      }
      const o = await F.getValidTabsWithMetadata(t.tabId);
      return {
        output: `Created new tab. Tab ID: ${r.id}`,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: r.id,
          availableTabs: o,
          tabCount: o.length
        }
      };
    } catch (r) {
      return {
        error: `Failed to create tab: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "tabs_create",
    description: "Creates a new empty tab in the current tab group",
    input_schema: {
      type: "object",
      properties: {},
      required: []
    }
  })
};
const Ge = {
  type: "object",
  properties: {},
  required: []
};
const Ne = {
  name: "turn_answer_start",
  description: "Call this immediately before your text response to the user for this turn. Required every turn - whether or not you made tool calls. After calling, write your response. No more tools after this.",
  parameters: Ge,
  execute: async () => ({
    output: "Proceed with your response."
  }),
  toAnthropicSchema() {
    return {
      type: "custom",
      name: this.name,
      description: this.description,
      input_schema: Ge
    };
  }
};
function Le(e, t) {
  return e === "follow_a_plan" && !t;
}
function qe() {
  return "<system-reminder>You are in planning mode. Before executing any tools, you must first present a plan to the user using the update_plan tool. The plan should include: domains (list of domains you will visit) and approach (high-level steps you will take).</system-reminder>";
}
async function Be(e) {
  const t = [];
  const r = [];
  for (const a of e) {
    try {
      const e = a.startsWith("http") ? a : `https://${a}`;
      const o = await O.getCategory(e);
      if (!o || o !== "category1" && o !== "category2" && o !== "category_org_blocked") {
        t.push(a);
      } else {
        r.push(a);
      }
    } catch (o) {
      t.push(a);
    }
  }
  return {
    approved: t,
    filtered: r
  };
}
async function Fe(e, t) {
  if (!e || e.length === 0) {
    return [];
  }
  const {
    approved: r,
    filtered: o
  } = await Be(e);
  o.length;
  t.setTurnApprovedDomains(r);
  return r;
}
const We = {
  type: "object",
  properties: {
    domains: {
      type: "array",
      items: {
        type: "string"
      },
      description: "List of domains you will visit (e.g., ['github.com', 'stackoverflow.com']). These domains will be approved for the session when the user accepts the plan."
    },
    approach: {
      type: "array",
      items: {
        type: "string"
      },
      description: "High-level description of what you will do. Focus on outcomes and key actions, not implementation details. Be concise - aim for 3-7 items."
    }
  },
  required: ["domains", "approach"]
};
const je = {
  name: "update_plan",
  description: "Present a plan to the user for approval before taking actions. The user will see the domains you intend to visit and your approach. Once approved, you can proceed with actions on the approved domains without additional permission prompts.",
  parameters: We,
  async execute(e, t) {
    const r = function (e) {
      const t = e;
      const r = {};
      if (!t.domains || !Array.isArray(t.domains)) {
        r.domains = "Required field missing or not an array";
      }
      if (!t.approach || !Array.isArray(t.approach)) {
        r.approach = "Required field missing or not an array";
      }
      if (Object.keys(r).length > 0) {
        return {
          error: {
            type: "validation_error",
            message: "Invalid plan format. Both 'domains' and 'approach' are required arrays.",
            fields: r
          }
        };
      } else {
        return null;
      }
    }(e);
    if (r) {
      return {
        error: JSON.stringify(r.error)
      };
    }
    const {
      domains: o,
      approach: a
    } = e;
    const n = await async function (e) {
      const t = [];
      for (const o of e) {
        try {
          const e = o.startsWith("http") ? o : `https://${o}`;
          const r = await O.getCategory(e);
          t.push({
            domain: o,
            category: r
          });
        } catch (r) {
          t.push({
            domain: o
          });
        }
      }
      return t;
    }(o);
    return {
      type: "permission_required",
      tool: c.PLAN_APPROVAL,
      url: "",
      toolUseId: t?.toolUseId,
      actionData: {
        plan: {
          domains: n,
          approach: a
        }
      }
    };
  },
  setPromptsConfig(e) {
    if (e.toolDescription) {
      this.description = e.toolDescription;
    }
    if (e.inputPropertyDescriptions) {
      const t = We.properties;
      if (e.inputPropertyDescriptions.domains) {
        t.domains.description = e.inputPropertyDescriptions.domains;
      }
      if (e.inputPropertyDescriptions.approach) {
        t.approach.description = e.inputPropertyDescriptions.approach;
      }
    }
  },
  toAnthropicSchema() {
    return {
      type: "custom",
      name: this.name,
      description: this.description,
      input_schema: We
    };
  }
};
const He = {
  name: "upload_image",
  description: "Upload a previously captured screenshot or user-uploaded image to a file input or drag & drop target. Supports two approaches: (1) ref - for targeting specific elements, especially hidden file inputs, (2) coordinate - for drag & drop to visible locations like Google Docs. Provide either ref or coordinate, not both.",
  parameters: {
    imageId: {
      type: "string",
      description: "ID of a previously captured screenshot (from the computer tool's screenshot action) or a user-uploaded image"
    },
    ref: {
      type: "string",
      description: "Element reference ID from read_page or find tools (e.g., \"ref_1\", \"ref_2\"). Use this for file inputs (especially hidden ones) or specific elements. Provide either ref or coordinate, not both."
    },
    coordinate: {
      type: "array",
      description: "Viewport coordinates [x, y] for drag & drop to a visible location. Use this for drag & drop targets like Google Docs. Provide either ref or coordinate, not both."
    },
    tabId: {
      type: "number",
      description: "Tab ID where the target element is located. This is where the image will be uploaded to."
    },
    filename: {
      type: "string",
      description: "Optional filename for the uploaded file (default: \"image.png\")"
    }
  },
  execute: async (e, t) => {
    try {
      const r = e;
      if (!r?.imageId) {
        throw new Error("imageId parameter is required");
      }
      if (!r?.ref && !r?.coordinate) {
        throw new Error("Either ref or coordinate parameter is required. Provide ref for targeting specific elements or coordinate for drag & drop to a location.");
      }
      if (r?.ref && r?.coordinate) {
        throw new Error("Provide either ref or coordinate, not both. Use ref for specific elements or coordinate for drag & drop.");
      }
      if (!t?.tabId) {
        throw new Error("No active tab found");
      }
      const o = await F.getEffectiveTabId(r.tabId, t.tabId);
      const a = await chrome.tabs.get(o);
      if (!a.id) {
        throw new Error("Upload tab has no ID");
      }
      const n = a.url;
      if (!n) {
        throw new Error("No URL available for upload tab");
      }
      const s = t?.toolUseId;
      const i = await t.permissionManager.checkPermission(n, s);
      if (!i.allowed) {
        if (i.needsPrompt) {
          return {
            type: "permission_required",
            tool: c.UPLOAD_IMAGE,
            url: n,
            toolUseId: s,
            actionData: {
              ref: r.ref,
              coordinate: r.coordinate,
              imageId: r.imageId
            }
          };
        }
        return {
          error: "Permission denied for uploading to this domain"
        };
      }
      const l = a.url;
      if (!l) {
        return {
          error: "Unable to get original URL for security check"
        };
      }
      if (!t.messages) {
        return {
          error: "Unable to access message history to retrieve image"
        };
      }
      console.info(`[Upload-Image] Looking for image with ID: ${r.imageId}`);
      console.info(`[Upload-Image] Messages available: ${t.messages.length}`);
      const d = oe(t.messages, r.imageId);
      if (!d) {
        return {
          error: `Image not found with ID: ${r.imageId}. Please ensure the image was captured or uploaded earlier in this conversation.`
        };
      }
      const u = d.base64;
      const h = d.mediaType || "image/png";
      const p = await A(a.id, l, "upload image action");
      if (p) {
        return p;
      }
      const m = await x({
        target: {
          tabId: a.id
        },
        func: (e, t, r, o, a) => {
          try {
            let n = null;
            if (t) {
              n = document.elementFromPoint(t[0], t[1]);
              if (!n) {
                return {
                  error: `No element found at coordinates (${t[0]}, ${t[1]})`
                };
              }
              if (n.tagName === "IFRAME") {
                try {
                  const e = n;
                  const r = e.contentDocument || (e.contentWindow ? e.contentWindow.document : null);
                  if (r) {
                    const o = e.getBoundingClientRect();
                    const a = t[0] - o.left;
                    const s = t[1] - o.top;
                    const i = r.elementFromPoint(a, s);
                    if (i) {
                      n = i;
                    }
                  }
                } catch {}
              }
            } else {
              if (!e) {
                return {
                  error: "Neither coordinate nor elementRef provided"
                };
              }
              if (window.__claudeElementMap && window.__claudeElementMap[e]) {
                n = window.__claudeElementMap[e].deref() || null;
                if (!n || !document.contains(n)) {
                  delete window.__claudeElementMap[e];
                  n = null;
                }
              }
              if (!n) {
                return {
                  error: `No element found with reference: "${e}". The element may have been removed from the page.`
                };
              }
            }
            n.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
            const s = atob(r);
            const i = new Array(s.length);
            for (let e = 0; e < s.length; e++) {
              i[e] = s.charCodeAt(e);
            }
            const c = new Uint8Array(i);
            const l = new Blob([c], {
              type: a
            });
            const d = new File([l], o, {
              type: a,
              lastModified: Date.now()
            });
            const u = new DataTransfer();
            u.items.add(d);
            if (n.tagName === "INPUT" && n.type === "file") {
              const e = n;
              e.files = u.files;
              e.focus();
              e.dispatchEvent(new Event("change", {
                bubbles: true
              }));
              e.dispatchEvent(new Event("input", {
                bubbles: true
              }));
              const t = new CustomEvent("filechange", {
                bubbles: true,
                detail: {
                  files: u.files
                }
              });
              e.dispatchEvent(t);
              return {
                output: `Successfully uploaded image "${o}" (${Math.round(l.size / 1024)}KB) to file input`
              };
            }
            {
              let e;
              let r;
              n.focus();
              if (t) {
                e = t[0];
                r = t[1];
              } else {
                const t = n.getBoundingClientRect();
                e = t.left + t.width / 2;
                r = t.top + t.height / 2;
              }
              const a = new DragEvent("dragenter", {
                bubbles: true,
                cancelable: true,
                dataTransfer: u,
                clientX: e,
                clientY: r,
                screenX: e + window.screenX,
                screenY: r + window.screenY
              });
              n.dispatchEvent(a);
              const s = new DragEvent("dragover", {
                bubbles: true,
                cancelable: true,
                dataTransfer: u,
                clientX: e,
                clientY: r,
                screenX: e + window.screenX,
                screenY: r + window.screenY
              });
              n.dispatchEvent(s);
              const i = new DragEvent("drop", {
                bubbles: true,
                cancelable: true,
                dataTransfer: u,
                clientX: e,
                clientY: r,
                screenX: e + window.screenX,
                screenY: r + window.screenY
              });
              n.dispatchEvent(i);
              return {
                output: `Successfully dropped image "${o}" (${Math.round(l.size / 1024)}KB) onto element at (${Math.round(e)}, ${Math.round(r)})`
              };
            }
          } catch (n) {
            return {
              error: `Error uploading image: ${n instanceof Error ? n.message : "Unknown error"}`
            };
          }
        },
        args: [r.ref || null, r.coordinate || null, u, r.filename || "image.png", h]
      });
      if (!m || m.length === 0) {
        throw new Error("Failed to execute upload image");
      }
      const f = await F.getValidTabsWithMetadata(t.tabId);
      return {
        ...m[0].result,
        tabContext: {
          currentTabId: t.tabId,
          executedOnTabId: o,
          availableTabs: f,
          tabCount: f.length
        }
      };
    } catch (r) {
      return {
        error: `Failed to upload image: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "upload_image",
    description: "Upload a previously captured screenshot or user-uploaded image to a file input or drag & drop target. Supports two approaches: (1) ref - for targeting specific elements, especially hidden file inputs, (2) coordinate - for drag & drop to visible locations like Google Docs. Provide either ref or coordinate, not both.",
    input_schema: {
      type: "object",
      properties: {
        imageId: {
          type: "string",
          description: "ID of a previously captured screenshot (from the computer tool's screenshot action) or a user-uploaded image"
        },
        ref: {
          type: "string",
          description: "Element reference ID from read_page or find tools (e.g., \"ref_1\", \"ref_2\"). Use this for file inputs (especially hidden ones) or specific elements. Provide either ref or coordinate, not both."
        },
        coordinate: {
          type: "array",
          items: {
            type: "number"
          },
          description: "Viewport coordinates [x, y] for drag & drop to a visible location. Use this for drag & drop targets like Google Docs. Provide either ref or coordinate, not both."
        },
        tabId: {
          type: "number",
          description: "Tab ID where the target element is located. This is where the image will be uploaded to."
        },
        filename: {
          type: "string",
          description: "Optional filename for the uploaded file (default: \"image.png\")"
        }
      },
      required: ["imageId", "tabId"]
    }
  })
};
const Ke = Y((e, t) => ({
  remoteServers: {},
  remoteTools: {},
  addServers: t => e(e => ({
    remoteServers: t.reduce((e, t) => ({
      ...e,
      [t.uuid]: t
    }), e.remoteServers)
  })),
  addTools: (t, r) => e(e => ({
    remoteTools: {
      ...e.remoteTools,
      [t]: r
    }
  })),
  updateServerConnection: (t, r) => e(e => {
    const o = e.remoteServers[t];
    if (o) {
      return {
        remoteServers: {
          ...e.remoteServers,
          [t]: {
            ...o,
            connected: r
          }
        }
      };
    } else {
      return e;
    }
  }),
  getServerByUuid: e => t().remoteServers[e]
}));
function ze(e, t, r, o, a) {
  if (typeof t == "function" || !t.has(e)) {
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  }
  t.set(e, r);
  return r;
}
function Xe(e, t, r, o) {
  if (r === "a" && !o) {
    throw new TypeError("Private accessor was defined without a getter");
  }
  if (typeof t == "function" ? e !== t || !o : !t.has(e)) {
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  }
  if (r === "m") {
    return o;
  } else if (r === "a") {
    return o.call(e);
  } else if (o) {
    return o.value;
  } else {
    return t.get(e);
  }
}
let Ve = function () {
  const {
    crypto: e
  } = globalThis;
  if (e?.randomUUID) {
    Ve = e.randomUUID.bind(e);
    return e.randomUUID();
  }
  const t = new Uint8Array(1);
  const r = e ? () => e.getRandomValues(t)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, e => (+e ^ r() & 15 >> +e / 4).toString(16));
};
function Ye(e) {
  return typeof e == "object" && e !== null && ("name" in e && e.name === "AbortError" || "message" in e && String(e.message).includes("FetchRequestCanceledException"));
}
const Je = e => {
  if (e instanceof Error) {
    return e;
  }
  if (typeof e == "object" && e !== null) {
    try {
      if (Object.prototype.toString.call(e) === "[object Error]") {
        const t = new Error(e.message, e.cause ? {
          cause: e.cause
        } : {});
        if (e.stack) {
          t.stack = e.stack;
        }
        if (e.cause && !t.cause) {
          t.cause = e.cause;
        }
        if (e.name) {
          t.name = e.name;
        }
        return t;
      }
    } catch {}
    try {
      return new Error(JSON.stringify(e));
    } catch {}
  }
  return new Error(e);
};
class Qe extends Error {}
class Ze extends Qe {
  constructor(e, t, r, o) {
    super(`${Ze.makeMessage(e, t, r)}`);
    this.status = e;
    this.headers = o;
    this.requestID = o?.get("request-id");
    this.error = t;
  }
  static makeMessage(e, t, r) {
    const o = t?.message ? typeof t.message == "string" ? t.message : JSON.stringify(t.message) : t ? JSON.stringify(t) : r;
    if (e && o) {
      return `${e} ${o}`;
    } else if (e) {
      return `${e} status code (no body)`;
    } else {
      return o || "(no status code or body)";
    }
  }
  static generate(e, t, r, o) {
    if (!e || !o) {
      return new tt({
        message: r,
        cause: Je(t)
      });
    }
    const a = t;
    if (e === 400) {
      return new ot(e, a, r, o);
    } else if (e === 401) {
      return new at(e, a, r, o);
    } else if (e === 403) {
      return new nt(e, a, r, o);
    } else if (e === 404) {
      return new st(e, a, r, o);
    } else if (e === 409) {
      return new it(e, a, r, o);
    } else if (e === 422) {
      return new ct(e, a, r, o);
    } else if (e === 429) {
      return new lt(e, a, r, o);
    } else if (e >= 500) {
      return new dt(e, a, r, o);
    } else {
      return new Ze(e, a, r, o);
    }
  }
}
class et extends Ze {
  constructor({
    message: e
  } = {}) {
    super(undefined, undefined, e || "Request was aborted.", undefined);
  }
}
class tt extends Ze {
  constructor({
    message: e,
    cause: t
  }) {
    super(undefined, undefined, e || "Connection error.", undefined);
    if (t) {
      this.cause = t;
    }
  }
}
class rt extends tt {
  constructor({
    message: e
  } = {}) {
    super({
      message: e ?? "Request timed out."
    });
  }
}
class ot extends Ze {}
class at extends Ze {}
class nt extends Ze {}
class st extends Ze {}
class it extends Ze {}
class ct extends Ze {}
class lt extends Ze {}
class dt extends Ze {}
const ut = /^[a-z][a-z0-9+.-]*:/i;
let ht = e => {
  ht = Array.isArray;
  return ht(e);
};
let pt = ht;
function mt(e) {
  if (typeof e != "object") {
    return {};
  } else {
    return e ?? {};
  }
}
const ft = e => {
  try {
    return JSON.parse(e);
  } catch (t) {
    return;
  }
};
const gt = "0.72.1";
const bt = () => {
  const e = typeof Deno != "undefined" && Deno.build != null ? "deno" : typeof EdgeRuntime != "undefined" ? "edge" : Object.prototype.toString.call(globalThis.process !== undefined ? globalThis.process : 0) === "[object process]" ? "node" : "unknown";
  if (e === "deno") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": gt,
      "X-Stainless-OS": yt(Deno.build.os),
      "X-Stainless-Arch": wt(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : Deno.version?.deno ?? "unknown"
    };
  }
  if (typeof EdgeRuntime != "undefined") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": gt,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
  }
  if (e === "node") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": gt,
      "X-Stainless-OS": yt(globalThis.process.platform ?? "unknown"),
      "X-Stainless-Arch": wt(globalThis.process.arch ?? "unknown"),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
    };
  }
  const t = function () {
    if (typeof navigator == "undefined" || !navigator) {
      return null;
    }
    const e = [{
      key: "edge",
      pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
      key: "ie",
      pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
      key: "ie",
      pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
      key: "chrome",
      pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
      key: "firefox",
      pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
      key: "safari",
      pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
    }];
    for (const {
      key: t,
      pattern: r
    } of e) {
      const e = r.exec(navigator.userAgent);
      if (e) {
        return {
          browser: t,
          version: `${e[1] || 0}.${e[2] || 0}.${e[3] || 0}`
        };
      }
    }
    return null;
  }();
  if (t) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": gt,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": `browser:${t.browser}`,
      "X-Stainless-Runtime-Version": t.version
    };
  } else {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": gt,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": "unknown",
      "X-Stainless-Runtime-Version": "unknown"
    };
  }
};
const wt = e => e === "x32" ? "x32" : e === "x86_64" || e === "x64" ? "x64" : e === "arm" ? "arm" : e === "aarch64" || e === "arm64" ? "arm64" : e ? `other:${e}` : "unknown";
const yt = e => (e = e.toLowerCase()).includes("ios") ? "iOS" : e === "android" ? "Android" : e === "darwin" ? "MacOS" : e === "win32" ? "Windows" : e === "freebsd" ? "FreeBSD" : e === "openbsd" ? "OpenBSD" : e === "linux" ? "Linux" : e ? `Other:${e}` : "Unknown";
let _t;
function vt(...e) {
  const t = globalThis.ReadableStream;
  if (t === undefined) {
    throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  }
  return new t(...e);
}
function It(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : e[Symbol.iterator]();
  return vt({
    start() {},
    async pull(e) {
      const {
        done: r,
        value: o
      } = await t.next();
      if (r) {
        e.close();
      } else {
        e.enqueue(o);
      }
    },
    async cancel() {
      await t.return?.();
    }
  });
}
function kt(e) {
  if (e[Symbol.asyncIterator]) {
    return e;
  }
  const t = e.getReader();
  return {
    async next() {
      try {
        const e = await t.read();
        if (e?.done) {
          t.releaseLock();
        }
        return e;
      } catch (e) {
        t.releaseLock();
        throw e;
      }
    },
    async return() {
      const e = t.cancel();
      t.releaseLock();
      await e;
      return {
        done: true,
        value: undefined
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
const Tt = ({
  headers: e,
  body: t
}) => ({
  bodyHeaders: {
    "content-type": "application/json"
  },
  body: JSON.stringify(t)
});
let xt;
let St;
function Et(e) {
  let t;
  return (xt ?? (t = new globalThis.TextEncoder(), xt = t.encode.bind(t)))(e);
}
function Ct(e) {
  let t;
  return (St ?? (t = new globalThis.TextDecoder(), St = t.decode.bind(t)))(e);
}
var Mt;
var Dt;
class Rt {
  constructor() {
    Mt.set(this, undefined);
    Dt.set(this, undefined);
    ze(this, Mt, new Uint8Array());
    ze(this, Dt, null);
  }
  decode(e) {
    if (e == null) {
      return [];
    }
    const t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? Et(e) : e;
    ze(this, Mt, function (e) {
      let t = 0;
      for (const a of e) {
        t += a.length;
      }
      const r = new Uint8Array(t);
      let o = 0;
      for (const a of e) {
        r.set(a, o);
        o += a.length;
      }
      return r;
    }([Xe(this, Mt, "f"), t]));
    const r = [];
    let o;
    while ((o = At(Xe(this, Mt, "f"), Xe(this, Dt, "f"))) != null) {
      if (o.carriage && Xe(this, Dt, "f") == null) {
        ze(this, Dt, o.index);
        continue;
      }
      if (Xe(this, Dt, "f") != null && (o.index !== Xe(this, Dt, "f") + 1 || o.carriage)) {
        r.push(Ct(Xe(this, Mt, "f").subarray(0, Xe(this, Dt, "f") - 1)));
        ze(this, Mt, Xe(this, Mt, "f").subarray(Xe(this, Dt, "f")));
        ze(this, Dt, null);
        continue;
      }
      const e = Xe(this, Dt, "f") !== null ? o.preceding - 1 : o.preceding;
      const t = Ct(Xe(this, Mt, "f").subarray(0, e));
      r.push(t);
      ze(this, Mt, Xe(this, Mt, "f").subarray(o.index));
      ze(this, Dt, null);
    }
    return r;
  }
  flush() {
    if (Xe(this, Mt, "f").length) {
      return this.decode("\n");
    } else {
      return [];
    }
  }
}
function At(e, t) {
  for (let r = t ?? 0; r < e.length; r++) {
    if (e[r] === 10) {
      return {
        preceding: r,
        index: r + 1,
        carriage: false
      };
    }
    if (e[r] === 13) {
      return {
        preceding: r,
        index: r + 1,
        carriage: true
      };
    }
  }
  return null;
}
function Pt(e) {
  for (let t = 0; t < e.length - 1; t++) {
    if (e[t] === 10 && e[t + 1] === 10) {
      return t + 2;
    }
    if (e[t] === 13 && e[t + 1] === 13) {
      return t + 2;
    }
    if (e[t] === 13 && e[t + 1] === 10 && t + 3 < e.length && e[t + 2] === 13 && e[t + 3] === 10) {
      return t + 4;
    }
  }
  return -1;
}
Mt = new WeakMap();
Dt = new WeakMap();
Rt.NEWLINE_CHARS = new Set(["\n", "\r"]);
Rt.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
const Ut = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
};
const $t = (e, t, r) => {
  var o;
  var a;
  if (e) {
    o = Ut;
    a = e;
    if (Object.prototype.hasOwnProperty.call(o, a)) {
      return e;
    } else {
      qt(r).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(Ut))}`);
      return;
    }
  }
};
function Ot() {}
function Gt(e, t, r) {
  if (!t || Ut[e] > Ut[r]) {
    return Ot;
  } else {
    return t[e].bind(t);
  }
}
const Nt = {
  error: Ot,
  warn: Ot,
  info: Ot,
  debug: Ot
};
let Lt = new WeakMap();
function qt(e) {
  const t = e.logger;
  const r = e.logLevel ?? "off";
  if (!t) {
    return Nt;
  }
  const o = Lt.get(t);
  if (o && o[0] === r) {
    return o[1];
  }
  const a = {
    error: Gt("error", t, r),
    warn: Gt("warn", t, r),
    info: Gt("info", t, r),
    debug: Gt("debug", t, r)
  };
  Lt.set(t, [r, a]);
  return a;
}
const Bt = e => {
  if (e.options) {
    e.options = {
      ...e.options
    };
    delete e.options.headers;
  }
  e.headers &&= Object.fromEntries((e.headers instanceof Headers ? [...e.headers] : Object.entries(e.headers)).map(([e, t]) => [e, e.toLowerCase() === "x-api-key" || e.toLowerCase() === "authorization" || e.toLowerCase() === "cookie" || e.toLowerCase() === "set-cookie" ? "***" : t]));
  if ("retryOfRequestLogID" in e) {
    if (e.retryOfRequestLogID) {
      e.retryOf = e.retryOfRequestLogID;
    }
    delete e.retryOfRequestLogID;
  }
  return e;
};
var Ft;
var Wt;
var jt;
class Ht {
  constructor(e, t, r) {
    this.iterator = e;
    Ft.set(this, undefined);
    this.controller = t;
    ze(this, Ft, r);
  }
  static fromSSEResponse(e, t, r) {
    let o = false;
    const a = r ? qt(r) : console;
    return new Ht(async function* () {
      if (o) {
        throw new Qe("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      }
      o = true;
      let r = false;
      try {
        for await (const r of async function* (e, t) {
          if (!e.body) {
            t.abort();
            if (globalThis.navigator !== undefined && globalThis.navigator.product === "ReactNative") {
              throw new Qe("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");
            }
            throw new Qe("Attempted to iterate over a response with no body");
          }
          const r = new Kt();
          const o = new Rt();
          const a = kt(e.body);
          for await (const n of async function* (e) {
            let t = new Uint8Array();
            for await (const r of e) {
              if (r == null) {
                continue;
              }
              const e = r instanceof ArrayBuffer ? new Uint8Array(r) : typeof r == "string" ? Et(r) : r;
              let o;
              let a = new Uint8Array(t.length + e.length);
              a.set(t);
              a.set(e, t.length);
              t = a;
              while ((o = Pt(t)) !== -1) {
                yield t.slice(0, o);
                t = t.slice(o);
              }
            }
            if (t.length > 0) {
              yield t;
            }
          }(a)) {
            for (const e of o.decode(n)) {
              const t = r.decode(e);
              if (t) {
                yield t;
              }
            }
          }
          for (const n of o.flush()) {
            const e = r.decode(n);
            if (e) {
              yield e;
            }
          }
        }(e, t)) {
          if (r.event === "completion") {
            try {
              yield JSON.parse(r.data);
            } catch (n) {
              a.error("Could not parse message into JSON:", r.data);
              a.error("From chunk:", r.raw);
              throw n;
            }
          }
          if (r.event === "message_start" || r.event === "message_delta" || r.event === "message_stop" || r.event === "content_block_start" || r.event === "content_block_delta" || r.event === "content_block_stop") {
            try {
              yield JSON.parse(r.data);
            } catch (n) {
              a.error("Could not parse message into JSON:", r.data);
              a.error("From chunk:", r.raw);
              throw n;
            }
          }
          if (r.event !== "ping" && r.event === "error") {
            throw new Ze(undefined, ft(r.data) ?? r.data, undefined, e.headers);
          }
        }
        r = true;
      } catch (n) {
        if (Ye(n)) {
          return;
        }
        throw n;
      } finally {
        if (!r) {
          t.abort();
        }
      }
    }, t, r);
  }
  static fromReadableStream(e, t, r) {
    let o = false;
    return new Ht(async function* () {
      if (o) {
        throw new Qe("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      }
      o = true;
      let r = false;
      try {
        for await (const t of async function* () {
          const t = new Rt();
          const r = kt(e);
          for await (const e of r) {
            for (const r of t.decode(e)) {
              yield r;
            }
          }
          for (const e of t.flush()) {
            yield e;
          }
        }()) {
          if (!r) {
            if (t) {
              yield JSON.parse(t);
            }
          }
        }
        r = true;
      } catch (a) {
        if (Ye(a)) {
          return;
        }
        throw a;
      } finally {
        if (!r) {
          t.abort();
        }
      }
    }, t, r);
  }
  [(Ft = new WeakMap(), Symbol.asyncIterator)]() {
    return this.iterator();
  }
  tee() {
    const e = [];
    const t = [];
    const r = this.iterator();
    const o = o => ({
      next: () => {
        if (o.length === 0) {
          const o = r.next();
          e.push(o);
          t.push(o);
        }
        return o.shift();
      }
    });
    return [new Ht(() => o(e), this.controller, Xe(this, Ft, "f")), new Ht(() => o(t), this.controller, Xe(this, Ft, "f"))];
  }
  toReadableStream() {
    const e = this;
    let t;
    return vt({
      async start() {
        t = e[Symbol.asyncIterator]();
      },
      async pull(e) {
        try {
          const {
            value: r,
            done: o
          } = await t.next();
          if (o) {
            return e.close();
          }
          const a = Et(JSON.stringify(r) + "\n");
          e.enqueue(a);
        } catch (r) {
          e.error(r);
        }
      },
      async cancel() {
        await t.return?.();
      }
    });
  }
}
class Kt {
  constructor() {
    this.event = null;
    this.data = [];
    this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r")) {
      e = e.substring(0, e.length - 1);
    }
    if (!e) {
      if (!this.event && !this.data.length) {
        return null;
      }
      const e = {
        event: this.event,
        data: this.data.join("\n"),
        raw: this.chunks
      };
      this.event = null;
      this.data = [];
      this.chunks = [];
      return e;
    }
    this.chunks.push(e);
    if (e.startsWith(":")) {
      return null;
    }
    let [t, r, o] = function (e, t) {
      const r = e.indexOf(t);
      if (r !== -1) {
        return [e.substring(0, r), t, e.substring(r + t.length)];
      }
      return [e, "", ""];
    }(e, ":");
    if (o.startsWith(" ")) {
      o = o.substring(1);
    }
    if (t === "event") {
      this.event = o;
    } else if (t === "data") {
      this.data.push(o);
    }
    return null;
  }
}
async function zt(e, t) {
  const {
    response: r,
    requestLogID: o,
    retryOfRequestLogID: a,
    startTime: n
  } = t;
  const s = await (async () => {
    if (t.options.stream) {
      qt(e).debug("response", r.status, r.url, r.headers, r.body);
      if (t.options.__streamClass) {
        return t.options.__streamClass.fromSSEResponse(r, t.controller);
      } else {
        return Ht.fromSSEResponse(r, t.controller);
      }
    }
    if (r.status === 204) {
      return null;
    }
    if (t.options.__binaryResponse) {
      return r;
    }
    const o = r.headers.get("content-type");
    const a = o?.split(";")[0]?.trim();
    if (a?.includes("application/json") || a?.endsWith("+json")) {
      return Xt(await r.json(), r);
    }
    return await r.text();
  })();
  qt(e).debug(`[${o}] response parsed`, Bt({
    retryOfRequestLogID: a,
    url: r.url,
    status: r.status,
    body: s,
    durationMs: Date.now() - n
  }));
  return s;
}
function Xt(e, t) {
  if (!e || typeof e != "object" || Array.isArray(e)) {
    return e;
  } else {
    return Object.defineProperty(e, "_request_id", {
      value: t.headers.get("request-id"),
      enumerable: false
    });
  }
}
class Vt extends Promise {
  constructor(e, t, r = zt) {
    super(e => {
      e(null);
    });
    this.responsePromise = t;
    this.parseResponse = r;
    Wt.set(this, undefined);
    ze(this, Wt, e);
  }
  _thenUnwrap(e) {
    return new Vt(Xe(this, Wt, "f"), this.responsePromise, async (t, r) => Xt(e(await this.parseResponse(t, r), r), r.response));
  }
  asResponse() {
    return this.responsePromise.then(e => e.response);
  }
  async withResponse() {
    const [e, t] = await Promise.all([this.parse(), this.asResponse()]);
    return {
      data: e,
      response: t,
      request_id: t.headers.get("request-id")
    };
  }
  parse() {
    this.parsedPromise ||= this.responsePromise.then(e => this.parseResponse(Xe(this, Wt, "f"), e));
    return this.parsedPromise;
  }
  then(e, t) {
    return this.parse().then(e, t);
  }
  catch(e) {
    return this.parse().catch(e);
  }
  finally(e) {
    return this.parse().finally(e);
  }
}
Wt = new WeakMap();
class Yt {
  constructor(e, t, r, o) {
    jt.set(this, undefined);
    ze(this, jt, e);
    this.options = o;
    this.response = t;
    this.body = r;
  }
  hasNextPage() {
    return !!this.getPaginatedItems().length && this.nextPageRequestOptions() != null;
  }
  async getNextPage() {
    const e = this.nextPageRequestOptions();
    if (!e) {
      throw new Qe("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    }
    return await Xe(this, jt, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage();) {
      e = await e.getNextPage();
      yield e;
    }
  }
  async *[(jt = new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages()) {
      for (const t of e.getPaginatedItems()) {
        yield t;
      }
    }
  }
}
class Jt extends Vt {
  constructor(e, t, r) {
    super(e, t, async (e, t) => new r(e, t.response, await zt(e, t), t.options));
  }
  async *[Symbol.asyncIterator]() {
    const e = await this;
    for await (const t of e) {
      yield t;
    }
  }
}
class Qt extends Yt {
  constructor(e, t, r, o) {
    super(e, t, r, o);
    this.data = r.data || [];
    this.has_more = r.has_more || false;
    this.first_id = r.first_id || null;
    this.last_id = r.last_id || null;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.has_more !== false && super.hasNextPage();
  }
  nextPageRequestOptions() {
    if (this.options.query?.before_id) {
      const e = this.first_id;
      if (e) {
        return {
          ...this.options,
          query: {
            ...mt(this.options.query),
            before_id: e
          }
        };
      } else {
        return null;
      }
    }
    const e = this.last_id;
    if (e) {
      return {
        ...this.options,
        query: {
          ...mt(this.options.query),
          after_id: e
        }
      };
    } else {
      return null;
    }
  }
}
class Zt extends Yt {
  constructor(e, t, r, o) {
    super(e, t, r, o);
    this.data = r.data || [];
    this.has_more = r.has_more || false;
    this.next_page = r.next_page || null;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.has_more !== false && super.hasNextPage();
  }
  nextPageRequestOptions() {
    const e = this.next_page;
    if (e) {
      return {
        ...this.options,
        query: {
          ...mt(this.options.query),
          page: e
        }
      };
    } else {
      return null;
    }
  }
}
const er = () => {
  if (typeof File == "undefined") {
    const {
      process: e
    } = globalThis;
    const t = typeof e?.versions?.node == "string" && parseInt(e.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (t ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function tr(e, t, r) {
  er();
  return new File(e, t ?? "unknown_file", r);
}
function rr(e, t) {
  const r = typeof e == "object" && e !== null && ("name" in e && e.name && String(e.name) || "url" in e && e.url && String(e.url) || "filename" in e && e.filename && String(e.filename) || "path" in e && e.path && String(e.path)) || "";
  if (t) {
    return r.split(/[\\/]/).pop() || undefined;
  } else {
    return r;
  }
}
const or = e => e != null && typeof e == "object" && typeof e[Symbol.asyncIterator] == "function";
const ar = async (e, t, r = true) => ({
  ...e,
  body: await sr(e.body, t, r)
});
const nr = new WeakMap();
const sr = async (e, t, r = true) => {
  if (!(await function (e) {
    const t = typeof e == "function" ? e : e.fetch;
    const r = nr.get(t);
    if (r) {
      return r;
    }
    const o = (async () => {
      try {
        const e = "Response" in t ? t.Response : (await t("data:,")).constructor;
        const r = new FormData();
        return r.toString() !== (await new e(r).text());
      } catch {
        return true;
      }
    })();
    nr.set(t, o);
    return o;
  }(t))) {
    throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
  }
  const o = new FormData();
  await Promise.all(Object.entries(e || {}).map(([e, t]) => ir(o, e, t, r)));
  return o;
};
const ir = async (e, t, r, o) => {
  if (r !== undefined) {
    if (r == null) {
      throw new TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    }
    if (typeof r == "string" || typeof r == "number" || typeof r == "boolean") {
      e.append(t, String(r));
    } else if (r instanceof Response) {
      let a = {};
      const n = r.headers.get("Content-Type");
      if (n) {
        a = {
          type: n
        };
      }
      e.append(t, tr([await r.blob()], rr(r, o), a));
    } else if (or(r)) {
      e.append(t, tr([await new Response(It(r)).blob()], rr(r, o)));
    } else if ((e => e instanceof Blob && "name" in e)(r)) {
      e.append(t, tr([r], rr(r, o), {
        type: r.type
      }));
    } else if (Array.isArray(r)) {
      await Promise.all(r.map(r => ir(e, t + "[]", r, o)));
    } else {
      if (typeof r != "object") {
        throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${r} instead`);
      }
      await Promise.all(Object.entries(r).map(([r, a]) => ir(e, `${t}[${r}]`, a, o)));
    }
  }
};
const cr = e => e != null && typeof e == "object" && typeof e.size == "number" && typeof e.type == "string" && typeof e.text == "function" && typeof e.slice == "function" && typeof e.arrayBuffer == "function";
async function lr(e) {
  let t = [];
  if (typeof e == "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) {
    t.push(e);
  } else if (cr(e)) {
    t.push(e instanceof Blob ? e : await e.arrayBuffer());
  } else {
    if (!or(e)) {
      const t = e?.constructor?.name;
      throw new Error(`Unexpected data type: ${typeof e}${t ? `; constructor: ${t}` : ""}${function (e) {
        if (typeof e != "object" || e === null) {
          return "";
        }
        const t = Object.getOwnPropertyNames(e);
        return `; props: [${t.map(e => `"${e}"`).join(", ")}]`;
      }(e)}`);
    }
    for await (const r of e) {
      t.push(...(await lr(r)));
    }
  }
  return t;
}
class dr {
  constructor(e) {
    this._client = e;
  }
}
const ur = Symbol.for("brand.privateNullableHeaders");
function* hr(e) {
  if (!e) {
    return;
  }
  if (ur in e) {
    const {
      values: t,
      nulls: r
    } = e;
    yield* t.entries();
    for (const e of r) {
      yield [e, null];
    }
    return;
  }
  let t;
  let r = false;
  if (e instanceof Headers) {
    t = e.entries();
  } else if (pt(e)) {
    t = e;
  } else {
    r = true;
    t = Object.entries(e ?? {});
  }
  for (let o of t) {
    const e = o[0];
    if (typeof e != "string") {
      throw new TypeError("expected header name to be a string");
    }
    const t = pt(o[1]) ? o[1] : [o[1]];
    let a = false;
    for (const o of t) {
      if (o !== undefined) {
        if (r && !a) {
          a = true;
          yield [e, null];
        }
        yield [e, o];
      }
    }
  }
}
const pr = e => {
  const t = new Headers();
  const r = new Set();
  for (const o of e) {
    const e = new Set();
    for (const [a, n] of hr(o)) {
      const o = a.toLowerCase();
      if (!e.has(o)) {
        t.delete(a);
        e.add(o);
      }
      if (n === null) {
        t.delete(a);
        r.add(o);
      } else {
        t.append(a, n);
        r.delete(o);
      }
    }
  }
  return {
    [ur]: true,
    values: t,
    nulls: r
  };
};
const mr = Symbol("anthropic.sdk.stainlessHelper");
function fr(e) {
  return typeof e == "object" && e !== null && mr in e;
}
function gr(e, t) {
  const r = new Set();
  if (e) {
    for (const o of e) {
      if (fr(o)) {
        r.add(o[mr]);
      }
    }
  }
  if (t) {
    for (const o of t) {
      if (fr(o)) {
        r.add(o[mr]);
      }
      if (Array.isArray(o.content)) {
        for (const e of o.content) {
          if (fr(e)) {
            r.add(e[mr]);
          }
        }
      }
    }
  }
  return Array.from(r);
}
function br(e, t) {
  const r = gr(e, t);
  if (r.length === 0) {
    return {};
  } else {
    return {
      "x-stainless-helper": r.join(", ")
    };
  }
}
function wr(e) {
  return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
const yr = Object.freeze(Object.create(null));
const _r = ((e = wr) => function (t, ...r) {
  if (t.length === 1) {
    return t[0];
  }
  let o = false;
  const a = [];
  const n = t.reduce((t, n, s) => {
    if (/[?#]/.test(n)) {
      o = true;
    }
    const i = r[s];
    let c = (o ? encodeURIComponent : e)("" + i);
    if (s !== r.length && (i == null || typeof i == "object" && i.toString === Object.getPrototypeOf(Object.getPrototypeOf(i.hasOwnProperty ?? yr) ?? yr)?.toString)) {
      c = i + "";
      a.push({
        start: t.length + n.length,
        length: c.length,
        error: `Value of type ${Object.prototype.toString.call(i).slice(8, -1)} is not a valid path parameter`
      });
    }
    return t + n + (s === r.length ? "" : c);
  }, "");
  const s = n.split(/[?#]/, 1)[0];
  const i = new RegExp("(?<=^|\\/)(?:\\.|%2e){1,2}(?=\\/|$)", "gi");
  let c;
  while ((c = i.exec(s)) !== null) {
    a.push({
      start: c.index,
      length: c[0].length,
      error: `Value "${c[0]}" can't be safely passed as a path parameter`
    });
  }
  a.sort((e, t) => e.start - t.start);
  if (a.length > 0) {
    let e = 0;
    const t = a.reduce((t, r) => {
      const o = " ".repeat(r.start - e);
      const a = "^".repeat(r.length);
      e = r.start + r.length;
      return t + o + a;
    }, "");
    throw new Qe(`Path parameters result in path with invalid segments:\n${a.map(e => e.error).join("\n")}\n${n}\n${t}`);
  }
  return n;
})(wr);
class vr extends dr {
  list(e = {}, t) {
    const {
      betas: r,
      ...o
    } = e ?? {};
    return this._client.getAPIList("/v1/files", Qt, {
      query: o,
      ...t,
      headers: pr([{
        "anthropic-beta": [...(r ?? []), "files-api-2025-04-14"].toString()
      }, t?.headers])
    });
  }
  delete(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.delete(_r`/v1/files/${e}`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "files-api-2025-04-14"].toString()
      }, r?.headers])
    });
  }
  download(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.get(_r`/v1/files/${e}/content`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "files-api-2025-04-14"].toString(),
        Accept: "application/binary"
      }, r?.headers]),
      __binaryResponse: true
    });
  }
  retrieveMetadata(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.get(_r`/v1/files/${e}`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "files-api-2025-04-14"].toString()
      }, r?.headers])
    });
  }
  upload(e, t) {
    const {
      betas: r,
      ...o
    } = e;
    return this._client.post("/v1/files", ar({
      body: o,
      ...t,
      headers: pr([{
        "anthropic-beta": [...(r ?? []), "files-api-2025-04-14"].toString()
      }, (a = o.file, fr(a) ? {
        "x-stainless-helper": a[mr]
      } : {}), t?.headers])
    }, this._client));
    var a;
  }
}
let Ir = class extends dr {
  retrieve(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.get(_r`/v1/models/${e}?beta=true`, {
      ...r,
      headers: pr([{
        ...(o?.toString() != null ? {
          "anthropic-beta": o?.toString()
        } : undefined)
      }, r?.headers])
    });
  }
  list(e = {}, t) {
    const {
      betas: r,
      ...o
    } = e ?? {};
    return this._client.getAPIList("/v1/models?beta=true", Qt, {
      query: o,
      ...t,
      headers: pr([{
        ...(r?.toString() != null ? {
          "anthropic-beta": r?.toString()
        } : undefined)
      }, t?.headers])
    });
  }
};
const kr = {
  "claude-opus-4-20250514": 8192,
  "claude-opus-4-0": 8192,
  "claude-4-opus-20250514": 8192,
  "anthropic.claude-opus-4-20250514-v1:0": 8192,
  "claude-opus-4@20250514": 8192,
  "claude-opus-4-1-20250805": 8192,
  "anthropic.claude-opus-4-1-20250805-v1:0": 8192,
  "claude-opus-4-1@20250805": 8192
};
function Tr(e) {
  return e?.output_format ?? e?.output_config?.format;
}
function xr(e, t, r) {
  const o = Tr(t);
  if (t && "parse" in (o ?? {})) {
    return Sr(e, t, r);
  } else {
    return {
      ...e,
      content: e.content.map(e => {
        if (e.type === "text") {
          const t = Object.defineProperty({
            ...e
          }, "parsed_output", {
            value: null,
            enumerable: false
          });
          return Object.defineProperty(t, "parsed", {
            get: () => {
              r.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead.");
              return null;
            },
            enumerable: false
          });
        }
        return e;
      }),
      parsed_output: null
    };
  }
}
function Sr(e, t, r) {
  let o = null;
  const a = e.content.map(e => {
    if (e.type === "text") {
      const a = function (e, t) {
        const r = Tr(e);
        if (r?.type !== "json_schema") {
          return null;
        }
        try {
          if ("parse" in r) {
            return r.parse(t);
          } else {
            return JSON.parse(t);
          }
        } catch (o) {
          throw new Qe(`Failed to parse structured output: ${o}`);
        }
      }(t, e.text);
      if (o === null) {
        o = a;
      }
      const n = Object.defineProperty({
        ...e
      }, "parsed_output", {
        value: a,
        enumerable: false
      });
      return Object.defineProperty(n, "parsed", {
        get: () => {
          r.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead.");
          return a;
        },
        enumerable: false
      });
    }
    return e;
  });
  return {
    ...e,
    content: a,
    parsed_output: o
  };
}
const Er = e => {
  if (e.length === 0) {
    return e;
  }
  let t = e[e.length - 1];
  switch (t.type) {
    case "separator":
      e = e.slice(0, e.length - 1);
      return Er(e);
    case "number":
      let r = t.value[t.value.length - 1];
      if (r === "." || r === "-") {
        e = e.slice(0, e.length - 1);
        return Er(e);
      }
    case "string":
      let o = e[e.length - 2];
      if (o?.type === "delimiter") {
        e = e.slice(0, e.length - 1);
        return Er(e);
      }
      if (o?.type === "brace" && o.value === "{") {
        e = e.slice(0, e.length - 1);
        return Er(e);
      }
      break;
    case "delimiter":
      e = e.slice(0, e.length - 1);
      return Er(e);
  }
  return e;
};
const Cr = e => JSON.parse((e => {
  let t = "";
  e.map(e => {
    if (e.type === "string") {
      t += "\"" + e.value + "\"";
    } else {
      t += e.value;
    }
  });
  return t;
})((e => {
  let t = [];
  e.map(e => {
    if (e.type === "brace") {
      if (e.value === "{") {
        t.push("}");
      } else {
        t.splice(t.lastIndexOf("}"), 1);
      }
    }
    if (e.type === "paren") {
      if (e.value === "[") {
        t.push("]");
      } else {
        t.splice(t.lastIndexOf("]"), 1);
      }
    }
  });
  if (t.length > 0) {
    t.reverse().map(t => {
      if (t === "}") {
        e.push({
          type: "brace",
          value: "}"
        });
      } else if (t === "]") {
        e.push({
          type: "paren",
          value: "]"
        });
      }
    });
  }
  return e;
})(Er((e => {
  let t = 0;
  let r = [];
  while (t < e.length) {
    let o = e[t];
    if (o === "\\") {
      t++;
      continue;
    }
    if (o === "{") {
      r.push({
        type: "brace",
        value: "{"
      });
      t++;
      continue;
    }
    if (o === "}") {
      r.push({
        type: "brace",
        value: "}"
      });
      t++;
      continue;
    }
    if (o === "[") {
      r.push({
        type: "paren",
        value: "["
      });
      t++;
      continue;
    }
    if (o === "]") {
      r.push({
        type: "paren",
        value: "]"
      });
      t++;
      continue;
    }
    if (o === ":") {
      r.push({
        type: "separator",
        value: ":"
      });
      t++;
      continue;
    }
    if (o === ",") {
      r.push({
        type: "delimiter",
        value: ","
      });
      t++;
      continue;
    }
    if (o === "\"") {
      let a = "";
      let n = false;
      for (o = e[++t]; o !== "\"";) {
        if (t === e.length) {
          n = true;
          break;
        }
        if (o === "\\") {
          t++;
          if (t === e.length) {
            n = true;
            break;
          }
          a += o + e[t];
          o = e[++t];
        } else {
          a += o;
          o = e[++t];
        }
      }
      o = e[++t];
      if (!n) {
        r.push({
          type: "string",
          value: a
        });
      }
      continue;
    }
    if (o && /\s/.test(o)) {
      t++;
      continue;
    }
    let a = /[0-9]/;
    if (o && a.test(o) || o === "-" || o === ".") {
      let n = "";
      for (o === "-" && (n += o, o = e[++t]); o && a.test(o) || o === ".";) {
        n += o;
        o = e[++t];
      }
      r.push({
        type: "number",
        value: n
      });
      continue;
    }
    let n = /[a-z]/i;
    if (o && n.test(o)) {
      let a = "";
      while (o && n.test(o) && t !== e.length) {
        a += o;
        o = e[++t];
      }
      if (a != "true" && a != "false" && a !== "null") {
        t++;
        continue;
      }
      r.push({
        type: "name",
        value: a
      });
      continue;
    }
    t++;
  }
  return r;
})(e)))));
var Mr;
var Dr;
var Rr;
var Ar;
var Pr;
var Ur;
var $r;
var Or;
var Gr;
var Nr;
var Lr;
var qr;
var Br;
var Fr;
var Wr;
var jr;
var Hr;
var Kr;
var zr;
var Xr;
var Vr;
var Yr;
var Jr;
var Qr;
const Zr = "__json_buf";
function eo(e) {
  return e.type === "tool_use" || e.type === "server_tool_use" || e.type === "mcp_tool_use";
}
class to {
  constructor(e, t) {
    Mr.add(this);
    this.messages = [];
    this.receivedMessages = [];
    Dr.set(this, undefined);
    Rr.set(this, null);
    this.controller = new AbortController();
    Ar.set(this, undefined);
    Pr.set(this, () => {});
    Ur.set(this, () => {});
    $r.set(this, undefined);
    Or.set(this, () => {});
    Gr.set(this, () => {});
    Nr.set(this, {});
    Lr.set(this, false);
    qr.set(this, false);
    Br.set(this, false);
    Fr.set(this, false);
    Wr.set(this, undefined);
    jr.set(this, undefined);
    Hr.set(this, undefined);
    Xr.set(this, e => {
      ze(this, qr, true);
      if (Ye(e)) {
        e = new et();
      }
      if (e instanceof et) {
        ze(this, Br, true);
        return this._emit("abort", e);
      }
      if (e instanceof Qe) {
        return this._emit("error", e);
      }
      if (e instanceof Error) {
        const t = new Qe(e.message);
        t.cause = e;
        return this._emit("error", t);
      }
      return this._emit("error", new Qe(String(e)));
    });
    ze(this, Ar, new Promise((e, t) => {
      ze(this, Pr, e);
      ze(this, Ur, t);
    }));
    ze(this, $r, new Promise((e, t) => {
      ze(this, Or, e);
      ze(this, Gr, t);
    }));
    Xe(this, Ar, "f").catch(() => {});
    Xe(this, $r, "f").catch(() => {});
    ze(this, Rr, e);
    ze(this, Hr, t?.logger ?? console);
  }
  get response() {
    return Xe(this, Wr, "f");
  }
  get request_id() {
    return Xe(this, jr, "f");
  }
  async withResponse() {
    ze(this, Fr, true);
    const e = await Xe(this, Ar, "f");
    if (!e) {
      throw new Error("Could not resolve a `Response` object");
    }
    return {
      data: this,
      response: e,
      request_id: e.headers.get("request-id")
    };
  }
  static fromReadableStream(e) {
    const t = new to(null);
    t._run(() => t._fromReadableStream(e));
    return t;
  }
  static createMessage(e, t, r, {
    logger: o
  } = {}) {
    const a = new to(t, {
      logger: o
    });
    for (const n of t.messages) {
      a._addMessageParam(n);
    }
    ze(a, Rr, {
      ...t,
      stream: true
    });
    a._run(() => a._createMessage(e, {
      ...t,
      stream: true
    }, {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    }));
    return a;
  }
  _run(e) {
    e().then(() => {
      this._emitFinal();
      this._emit("end");
    }, Xe(this, Xr, "f"));
  }
  _addMessageParam(e) {
    this.messages.push(e);
  }
  _addMessage(e, t = true) {
    this.receivedMessages.push(e);
    if (t) {
      this._emit("message", e);
    }
  }
  async _createMessage(e, t, r) {
    const o = r?.signal;
    let a;
    if (o) {
      if (o.aborted) {
        this.controller.abort();
      }
      a = this.controller.abort.bind(this.controller);
      o.addEventListener("abort", a);
    }
    try {
      Xe(this, Mr, "m", Vr).call(this);
      const {
        response: o,
        data: a
      } = await e.create({
        ...t,
        stream: true
      }, {
        ...r,
        signal: this.controller.signal
      }).withResponse();
      this._connected(o);
      for await (const e of a) {
        Xe(this, Mr, "m", Yr).call(this, e);
      }
      if (a.controller.signal?.aborted) {
        throw new et();
      }
      Xe(this, Mr, "m", Jr).call(this);
    } finally {
      if (o && a) {
        o.removeEventListener("abort", a);
      }
    }
  }
  _connected(e) {
    if (!this.ended) {
      ze(this, Wr, e);
      ze(this, jr, e?.headers.get("request-id"));
      Xe(this, Pr, "f").call(this, e);
      this._emit("connect");
    }
  }
  get ended() {
    return Xe(this, Lr, "f");
  }
  get errored() {
    return Xe(this, qr, "f");
  }
  get aborted() {
    return Xe(this, Br, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(e, t) {
    (Xe(this, Nr, "f")[e] ||= []).push({
      listener: t
    });
    return this;
  }
  off(e, t) {
    const r = Xe(this, Nr, "f")[e];
    if (!r) {
      return this;
    }
    const o = r.findIndex(e => e.listener === t);
    if (o >= 0) {
      r.splice(o, 1);
    }
    return this;
  }
  once(e, t) {
    (Xe(this, Nr, "f")[e] ||= []).push({
      listener: t,
      once: true
    });
    return this;
  }
  emitted(e) {
    return new Promise((t, r) => {
      ze(this, Fr, true);
      if (e !== "error") {
        this.once("error", r);
      }
      this.once(e, t);
    });
  }
  async done() {
    ze(this, Fr, true);
    await Xe(this, $r, "f");
  }
  get currentMessage() {
    return Xe(this, Dr, "f");
  }
  async finalMessage() {
    await this.done();
    return Xe(this, Mr, "m", Kr).call(this);
  }
  async finalText() {
    await this.done();
    return Xe(this, Mr, "m", zr).call(this);
  }
  _emit(e, ...t) {
    if (Xe(this, Lr, "f")) {
      return;
    }
    if (e === "end") {
      ze(this, Lr, true);
      Xe(this, Or, "f").call(this);
    }
    const r = Xe(this, Nr, "f")[e];
    if (r) {
      Xe(this, Nr, "f")[e] = r.filter(e => !e.once);
      r.forEach(({
        listener: e
      }) => e(...t));
    }
    if (e === "abort") {
      const e = t[0];
      if (!Xe(this, Fr, "f") && !r?.length) {
        Promise.reject(e);
      }
      Xe(this, Ur, "f").call(this, e);
      Xe(this, Gr, "f").call(this, e);
      this._emit("end");
      return;
    }
    if (e === "error") {
      const e = t[0];
      if (!Xe(this, Fr, "f") && !r?.length) {
        Promise.reject(e);
      }
      Xe(this, Ur, "f").call(this, e);
      Xe(this, Gr, "f").call(this, e);
      this._emit("end");
    }
  }
  _emitFinal() {
    if (this.receivedMessages.at(-1)) {
      this._emit("finalMessage", Xe(this, Mr, "m", Kr).call(this));
    }
  }
  async _fromReadableStream(e, t) {
    const r = t?.signal;
    let o;
    if (r) {
      if (r.aborted) {
        this.controller.abort();
      }
      o = this.controller.abort.bind(this.controller);
      r.addEventListener("abort", o);
    }
    try {
      Xe(this, Mr, "m", Vr).call(this);
      this._connected(null);
      const t = Ht.fromReadableStream(e, this.controller);
      for await (const e of t) {
        Xe(this, Mr, "m", Yr).call(this, e);
      }
      if (t.controller.signal?.aborted) {
        throw new et();
      }
      Xe(this, Mr, "m", Jr).call(this);
    } finally {
      if (r && o) {
        r.removeEventListener("abort", o);
      }
    }
  }
  [(Dr = new WeakMap(), Rr = new WeakMap(), Ar = new WeakMap(), Pr = new WeakMap(), Ur = new WeakMap(), $r = new WeakMap(), Or = new WeakMap(), Gr = new WeakMap(), Nr = new WeakMap(), Lr = new WeakMap(), qr = new WeakMap(), Br = new WeakMap(), Fr = new WeakMap(), Wr = new WeakMap(), jr = new WeakMap(), Hr = new WeakMap(), Xr = new WeakMap(), Mr = new WeakSet(), Kr = function () {
    if (this.receivedMessages.length === 0) {
      throw new Qe("stream ended without producing a Message with role=assistant");
    }
    return this.receivedMessages.at(-1);
  }, zr = function () {
    if (this.receivedMessages.length === 0) {
      throw new Qe("stream ended without producing a Message with role=assistant");
    }
    const e = this.receivedMessages.at(-1).content.filter(e => e.type === "text").map(e => e.text);
    if (e.length === 0) {
      throw new Qe("stream ended without producing a content block with type=text");
    }
    return e.join(" ");
  }, Vr = function () {
    if (!this.ended) {
      ze(this, Dr, undefined);
    }
  }, Yr = function (e) {
    if (this.ended) {
      return;
    }
    const t = Xe(this, Mr, "m", Qr).call(this, e);
    this._emit("streamEvent", e, t);
    switch (e.type) {
      case "content_block_delta":
        {
          const r = t.content.at(-1);
          switch (e.delta.type) {
            case "text_delta":
              if (r.type === "text") {
                this._emit("text", e.delta.text, r.text || "");
              }
              break;
            case "citations_delta":
              if (r.type === "text") {
                this._emit("citation", e.delta.citation, r.citations ?? []);
              }
              break;
            case "input_json_delta":
              if (eo(r) && r.input) {
                this._emit("inputJson", e.delta.partial_json, r.input);
              }
              break;
            case "thinking_delta":
              if (r.type === "thinking") {
                this._emit("thinking", e.delta.thinking, r.thinking);
              }
              break;
            case "signature_delta":
              if (r.type === "thinking") {
                this._emit("signature", r.signature);
              }
              break;
            default:
              e.delta;
          }
          break;
        }
      case "message_stop":
        this._addMessageParam(t);
        this._addMessage(xr(t, Xe(this, Rr, "f"), {
          logger: Xe(this, Hr, "f")
        }), true);
        break;
      case "content_block_stop":
        this._emit("contentBlock", t.content.at(-1));
        break;
      case "message_start":
        ze(this, Dr, t);
    }
  }, Jr = function () {
    if (this.ended) {
      throw new Qe("stream has ended, this shouldn't happen");
    }
    const e = Xe(this, Dr, "f");
    if (!e) {
      throw new Qe("request ended without sending any chunks");
    }
    ze(this, Dr, undefined);
    return xr(e, Xe(this, Rr, "f"), {
      logger: Xe(this, Hr, "f")
    });
  }, Qr = function (e) {
    let t = Xe(this, Dr, "f");
    if (e.type === "message_start") {
      if (t) {
        throw new Qe(`Unexpected event order, got ${e.type} before receiving "message_stop"`);
      }
      return e.message;
    }
    if (!t) {
      throw new Qe(`Unexpected event order, got ${e.type} before "message_start"`);
    }
    switch (e.type) {
      case "message_stop":
      case "content_block_stop":
        return t;
      case "message_delta":
        t.container = e.delta.container;
        t.stop_reason = e.delta.stop_reason;
        t.stop_sequence = e.delta.stop_sequence;
        t.usage.output_tokens = e.usage.output_tokens;
        t.context_management = e.context_management;
        if (e.usage.input_tokens != null) {
          t.usage.input_tokens = e.usage.input_tokens;
        }
        if (e.usage.cache_creation_input_tokens != null) {
          t.usage.cache_creation_input_tokens = e.usage.cache_creation_input_tokens;
        }
        if (e.usage.cache_read_input_tokens != null) {
          t.usage.cache_read_input_tokens = e.usage.cache_read_input_tokens;
        }
        if (e.usage.server_tool_use != null) {
          t.usage.server_tool_use = e.usage.server_tool_use;
        }
        return t;
      case "content_block_start":
        t.content.push(e.content_block);
        return t;
      case "content_block_delta":
        {
          const o = t.content.at(e.index);
          switch (e.delta.type) {
            case "text_delta":
              if (o?.type === "text") {
                t.content[e.index] = {
                  ...o,
                  text: (o.text || "") + e.delta.text
                };
              }
              break;
            case "citations_delta":
              if (o?.type === "text") {
                t.content[e.index] = {
                  ...o,
                  citations: [...(o.citations ?? []), e.delta.citation]
                };
              }
              break;
            case "input_json_delta":
              if (o && eo(o)) {
                let a = o[Zr] || "";
                a += e.delta.partial_json;
                const n = {
                  ...o
                };
                Object.defineProperty(n, Zr, {
                  value: a,
                  enumerable: false,
                  writable: true
                });
                if (a) {
                  try {
                    n.input = Cr(a);
                  } catch (r) {
                    const e = new Qe(`Unable to parse tool parameter JSON from model. Please retry your request or adjust your prompt. Error: ${r}. JSON: ${a}`);
                    Xe(this, Xr, "f").call(this, e);
                  }
                }
                t.content[e.index] = n;
              }
              break;
            case "thinking_delta":
              if (o?.type === "thinking") {
                t.content[e.index] = {
                  ...o,
                  thinking: o.thinking + e.delta.thinking
                };
              }
              break;
            case "signature_delta":
              if (o?.type === "thinking") {
                t.content[e.index] = {
                  ...o,
                  signature: e.delta.signature
                };
              }
              break;
            default:
              e.delta;
          }
          return t;
        }
    }
  }, Symbol.asyncIterator)]() {
    const e = [];
    const t = [];
    let r = false;
    this.on("streamEvent", r => {
      const o = t.shift();
      if (o) {
        o.resolve(r);
      } else {
        e.push(r);
      }
    });
    this.on("end", () => {
      r = true;
      for (const e of t) {
        e.resolve(undefined);
      }
      t.length = 0;
    });
    this.on("abort", e => {
      r = true;
      for (const r of t) {
        r.reject(e);
      }
      t.length = 0;
    });
    this.on("error", e => {
      r = true;
      for (const r of t) {
        r.reject(e);
      }
      t.length = 0;
    });
    return {
      next: async () => {
        if (!e.length) {
          if (r) {
            return {
              value: undefined,
              done: true
            };
          } else {
            return new Promise((e, r) => t.push({
              resolve: e,
              reject: r
            })).then(e => e ? {
              value: e,
              done: false
            } : {
              value: undefined,
              done: true
            });
          }
        }
        return {
          value: e.shift(),
          done: false
        };
      },
      return: async () => {
        this.abort();
        return {
          value: undefined,
          done: true
        };
      }
    };
  }
  toReadableStream() {
    return new Ht(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
}
class ro extends Error {
  constructor(e) {
    super(typeof e == "string" ? e : e.map(e => e.type === "text" ? e.text : `[${e.type}]`).join(" "));
    this.name = "ToolError";
    this.content = e;
  }
}
var oo;
var ao;
var no;
var so;
var io;
var co;
var lo;
var uo;
var ho;
var po;
var mo;
function fo() {
  let e;
  let t;
  return {
    promise: new Promise((r, o) => {
      e = r;
      t = o;
    }),
    resolve: e,
    reject: t
  };
}
class go {
  constructor(e, t, r) {
    oo.add(this);
    this.client = e;
    ao.set(this, false);
    no.set(this, false);
    so.set(this, undefined);
    io.set(this, undefined);
    co.set(this, undefined);
    lo.set(this, undefined);
    uo.set(this, undefined);
    ho.set(this, 0);
    ze(this, so, {
      params: {
        ...t,
        messages: structuredClone(t.messages)
      }
    });
    const o = ["BetaToolRunner", ...gr(t.tools, t.messages)].join(", ");
    ze(this, io, {
      ...r,
      headers: pr([{
        "x-stainless-helper": o
      }, r?.headers])
    });
    ze(this, uo, fo());
  }
  async *[(ao = new WeakMap(), no = new WeakMap(), so = new WeakMap(), io = new WeakMap(), co = new WeakMap(), lo = new WeakMap(), uo = new WeakMap(), ho = new WeakMap(), oo = new WeakSet(), po = async function () {
    const e = Xe(this, so, "f").params.compactionControl;
    if (!e || !e.enabled) {
      return false;
    }
    let t = 0;
    if (Xe(this, co, "f") !== undefined) {
      try {
        const e = await Xe(this, co, "f");
        t = e.usage.input_tokens + (e.usage.cache_creation_input_tokens ?? 0) + (e.usage.cache_read_input_tokens ?? 0) + e.usage.output_tokens;
      } catch {
        return false;
      }
    }
    if (t < (e.contextTokenThreshold ?? 100000)) {
      return false;
    }
    const r = e.model ?? Xe(this, so, "f").params.model;
    const o = e.summaryPrompt ?? "You have been working on the task described above but have not yet completed it. Write a continuation summary that will allow you (or another instance of yourself) to resume work efficiently in a future context window where the conversation history will be replaced with this summary. Your summary should be structured, concise, and actionable. Include:\n1. Task Overview\nThe user's core request and success criteria\nAny clarifications or constraints they specified\n2. Current State\nWhat has been completed so far\nFiles created, modified, or analyzed (with paths if relevant)\nKey outputs or artifacts produced\n3. Important Discoveries\nTechnical constraints or requirements uncovered\nDecisions made and their rationale\nErrors encountered and how they were resolved\nWhat approaches were tried that didn't work (and why)\n4. Next Steps\nSpecific actions needed to complete the task\nAny blockers or open questions to resolve\nPriority order if multiple steps remain\n5. Context to Preserve\nUser preferences or style requirements\nDomain-specific details that aren't obvious\nAny promises made to the user\nBe concise but complete—err on the side of including information that would prevent duplicate work or repeated mistakes. Write in a way that enables immediate resumption of the task.\nWrap your summary in <summary></summary> tags.";
    const a = Xe(this, so, "f").params.messages;
    if (a[a.length - 1].role === "assistant") {
      const e = a[a.length - 1];
      if (Array.isArray(e.content)) {
        const t = e.content.filter(e => e.type !== "tool_use");
        if (t.length === 0) {
          a.pop();
        } else {
          e.content = t;
        }
      }
    }
    const n = await this.client.beta.messages.create({
      model: r,
      messages: [...a, {
        role: "user",
        content: [{
          type: "text",
          text: o
        }]
      }],
      max_tokens: Xe(this, so, "f").params.max_tokens
    }, {
      headers: {
        "x-stainless-helper": "compaction"
      }
    });
    if (n.content[0]?.type !== "text") {
      throw new Qe("Expected text response for compaction");
    }
    Xe(this, so, "f").params.messages = [{
      role: "user",
      content: n.content
    }];
    return true;
  }, Symbol.asyncIterator)]() {
    var e;
    if (Xe(this, ao, "f")) {
      throw new Qe("Cannot iterate over a consumed stream");
    }
    ze(this, ao, true);
    ze(this, no, true);
    ze(this, lo, undefined);
    try {
      while (true) {
        let t;
        try {
          if (Xe(this, so, "f").params.max_iterations && Xe(this, ho, "f") >= Xe(this, so, "f").params.max_iterations) {
            break;
          }
          ze(this, no, false);
          ze(this, lo, undefined);
          ze(this, ho, (e = Xe(this, ho, "f"), ++e));
          ze(this, co, undefined);
          const {
            max_iterations: r,
            compactionControl: o,
            ...a
          } = Xe(this, so, "f").params;
          if (a.stream) {
            t = this.client.beta.messages.stream({
              ...a
            }, Xe(this, io, "f"));
            ze(this, co, t.finalMessage());
            Xe(this, co, "f").catch(() => {});
            yield t;
          } else {
            ze(this, co, this.client.beta.messages.create({
              ...a,
              stream: false
            }, Xe(this, io, "f")));
            yield Xe(this, co, "f");
          }
          if (!(await Xe(this, oo, "m", po).call(this))) {
            if (!Xe(this, no, "f")) {
              const {
                role: e,
                content: t
              } = await Xe(this, co, "f");
              Xe(this, so, "f").params.messages.push({
                role: e,
                content: t
              });
            }
            const e = await Xe(this, oo, "m", mo).call(this, Xe(this, so, "f").params.messages.at(-1));
            if (e) {
              Xe(this, so, "f").params.messages.push(e);
            } else if (!Xe(this, no, "f")) {
              break;
            }
          }
        } finally {
          if (t) {
            t.abort();
          }
        }
      }
      if (!Xe(this, co, "f")) {
        throw new Qe("ToolRunner concluded without a message from the server");
      }
      Xe(this, uo, "f").resolve(await Xe(this, co, "f"));
    } catch (t) {
      ze(this, ao, false);
      Xe(this, uo, "f").promise.catch(() => {});
      Xe(this, uo, "f").reject(t);
      ze(this, uo, fo());
      throw t;
    }
  }
  setMessagesParams(e) {
    Xe(this, so, "f").params = typeof e == "function" ? e(Xe(this, so, "f").params) : e;
    ze(this, no, true);
    ze(this, lo, undefined);
  }
  async generateToolResponse() {
    const e = (await Xe(this, co, "f")) ?? this.params.messages.at(-1);
    if (e) {
      return Xe(this, oo, "m", mo).call(this, e);
    } else {
      return null;
    }
  }
  done() {
    return Xe(this, uo, "f").promise;
  }
  async runUntilDone() {
    if (!Xe(this, ao, "f")) {
      for await (const e of this);
    }
    return this.done();
  }
  get params() {
    return Xe(this, so, "f").params;
  }
  pushMessages(...e) {
    this.setMessagesParams(t => ({
      ...t,
      messages: [...t.messages, ...e]
    }));
  }
  then(e, t) {
    return this.runUntilDone().then(e, t);
  }
}
mo = async function (e) {
  if (Xe(this, lo, "f") === undefined) {
    ze(this, lo, async function (e, t = e.messages.at(-1)) {
      if (!t || t.role !== "assistant" || !t.content || typeof t.content == "string") {
        return null;
      }
      const r = t.content.filter(e => e.type === "tool_use");
      if (r.length === 0) {
        return null;
      }
      return {
        role: "user",
        content: await Promise.all(r.map(async t => {
          const r = e.tools.find(e => ("name" in e ? e.name : e.mcp_server_name) === t.name);
          if (!r || !("run" in r)) {
            return {
              type: "tool_result",
              tool_use_id: t.id,
              content: `Error: Tool '${t.name}' not found`,
              is_error: true
            };
          }
          try {
            let e = t.input;
            if ("parse" in r && r.parse) {
              e = r.parse(e);
            }
            const o = await r.run(e);
            return {
              type: "tool_result",
              tool_use_id: t.id,
              content: o
            };
          } catch (o) {
            return {
              type: "tool_result",
              tool_use_id: t.id,
              content: o instanceof ro ? o.content : `Error: ${o instanceof Error ? o.message : String(o)}`,
              is_error: true
            };
          }
        }))
      };
    }(Xe(this, so, "f").params, e));
  }
  return Xe(this, lo, "f");
};
class bo {
  constructor(e, t) {
    this.iterator = e;
    this.controller = t;
  }
  async *decoder() {
    const e = new Rt();
    for await (const t of this.iterator) {
      for (const r of e.decode(t)) {
        yield JSON.parse(r);
      }
    }
    for (const t of e.flush()) {
      yield JSON.parse(t);
    }
  }
  [Symbol.asyncIterator]() {
    return this.decoder();
  }
  static fromResponse(e, t) {
    if (!e.body) {
      t.abort();
      if (globalThis.navigator !== undefined && globalThis.navigator.product === "ReactNative") {
        throw new Qe("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");
      }
      throw new Qe("Attempted to iterate over a response with no body");
    }
    return new bo(kt(e.body), t);
  }
}
let wo = class extends dr {
  create(e, t) {
    const {
      betas: r,
      ...o
    } = e;
    return this._client.post("/v1/messages/batches?beta=true", {
      body: o,
      ...t,
      headers: pr([{
        "anthropic-beta": [...(r ?? []), "message-batches-2024-09-24"].toString()
      }, t?.headers])
    });
  }
  retrieve(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.get(_r`/v1/messages/batches/${e}?beta=true`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "message-batches-2024-09-24"].toString()
      }, r?.headers])
    });
  }
  list(e = {}, t) {
    const {
      betas: r,
      ...o
    } = e ?? {};
    return this._client.getAPIList("/v1/messages/batches?beta=true", Qt, {
      query: o,
      ...t,
      headers: pr([{
        "anthropic-beta": [...(r ?? []), "message-batches-2024-09-24"].toString()
      }, t?.headers])
    });
  }
  delete(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.delete(_r`/v1/messages/batches/${e}?beta=true`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "message-batches-2024-09-24"].toString()
      }, r?.headers])
    });
  }
  cancel(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.post(_r`/v1/messages/batches/${e}/cancel?beta=true`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "message-batches-2024-09-24"].toString()
      }, r?.headers])
    });
  }
  async results(e, t = {}, r) {
    const o = await this.retrieve(e);
    if (!o.results_url) {
      throw new Qe(`No batch \`results_url\`; Has it finished processing? ${o.processing_status} - ${o.id}`);
    }
    const {
      betas: a
    } = t ?? {};
    return this._client.get(o.results_url, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(a ?? []), "message-batches-2024-09-24"].toString(),
        Accept: "application/binary"
      }, r?.headers]),
      stream: true,
      __binaryResponse: true
    })._thenUnwrap((e, t) => bo.fromResponse(t.response, t.controller));
  }
};
let yo = class extends dr {
  constructor() {
    super(...arguments);
    this.batches = new wo(this._client);
  }
  create(e, t) {
    const r = _o(e);
    const {
      betas: o,
      ...a
    } = r;
    a.model;
    let n = this._client._options.timeout;
    if (!a.stream && n == null) {
      const e = kr[a.model] ?? undefined;
      n = this._client.calculateNonstreamingTimeout(a.max_tokens, e);
    }
    const s = br(a.tools, a.messages);
    return this._client.post("/v1/messages?beta=true", {
      body: a,
      timeout: n ?? 600000,
      ...t,
      headers: pr([{
        ...(o?.toString() != null ? {
          "anthropic-beta": o?.toString()
        } : undefined)
      }, s, t?.headers]),
      stream: r.stream ?? false
    });
  }
  parse(e, t) {
    t = {
      ...t,
      headers: pr([{
        "anthropic-beta": [...(e.betas ?? []), "structured-outputs-2025-12-15"].toString()
      }, t?.headers])
    };
    return this.create(e, t).then(t => Sr(t, e, {
      logger: this._client.logger ?? console
    }));
  }
  stream(e, t) {
    return to.createMessage(this, e, t);
  }
  countTokens(e, t) {
    const r = _o(e);
    const {
      betas: o,
      ...a
    } = r;
    return this._client.post("/v1/messages/count_tokens?beta=true", {
      body: a,
      ...t,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "token-counting-2024-11-01"].toString()
      }, t?.headers])
    });
  }
  toolRunner(e, t) {
    return new go(this._client, e, t);
  }
};
function _o(e) {
  if (!e.output_format) {
    return e;
  }
  if (e.output_config?.format) {
    throw new Qe("Both output_format and output_config.format were provided. Please use only output_config.format (output_format is deprecated).");
  }
  const {
    output_format: t,
    ...r
  } = e;
  return {
    ...r,
    output_config: {
      ...e.output_config,
      format: t
    }
  };
}
yo.Batches = wo;
yo.BetaToolRunner = go;
yo.ToolError = ro;
class vo extends dr {
  create(e, t = {}, r) {
    const {
      betas: o,
      ...a
    } = t ?? {};
    return this._client.post(_r`/v1/skills/${e}/versions?beta=true`, ar({
      body: a,
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "skills-2025-10-02"].toString()
      }, r?.headers])
    }, this._client));
  }
  retrieve(e, t, r) {
    const {
      skill_id: o,
      betas: a
    } = t;
    return this._client.get(_r`/v1/skills/${o}/versions/${e}?beta=true`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(a ?? []), "skills-2025-10-02"].toString()
      }, r?.headers])
    });
  }
  list(e, t = {}, r) {
    const {
      betas: o,
      ...a
    } = t ?? {};
    return this._client.getAPIList(_r`/v1/skills/${e}/versions?beta=true`, Zt, {
      query: a,
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "skills-2025-10-02"].toString()
      }, r?.headers])
    });
  }
  delete(e, t, r) {
    const {
      skill_id: o,
      betas: a
    } = t;
    return this._client.delete(_r`/v1/skills/${o}/versions/${e}?beta=true`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(a ?? []), "skills-2025-10-02"].toString()
      }, r?.headers])
    });
  }
}
class Io extends dr {
  constructor() {
    super(...arguments);
    this.versions = new vo(this._client);
  }
  create(e = {}, t) {
    const {
      betas: r,
      ...o
    } = e ?? {};
    return this._client.post("/v1/skills?beta=true", ar({
      body: o,
      ...t,
      headers: pr([{
        "anthropic-beta": [...(r ?? []), "skills-2025-10-02"].toString()
      }, t?.headers])
    }, this._client, false));
  }
  retrieve(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.get(_r`/v1/skills/${e}?beta=true`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "skills-2025-10-02"].toString()
      }, r?.headers])
    });
  }
  list(e = {}, t) {
    const {
      betas: r,
      ...o
    } = e ?? {};
    return this._client.getAPIList("/v1/skills?beta=true", Zt, {
      query: o,
      ...t,
      headers: pr([{
        "anthropic-beta": [...(r ?? []), "skills-2025-10-02"].toString()
      }, t?.headers])
    });
  }
  delete(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.delete(_r`/v1/skills/${e}?beta=true`, {
      ...r,
      headers: pr([{
        "anthropic-beta": [...(o ?? []), "skills-2025-10-02"].toString()
      }, r?.headers])
    });
  }
}
Io.Versions = vo;
class ko extends dr {
  constructor() {
    super(...arguments);
    this.models = new Ir(this._client);
    this.messages = new yo(this._client);
    this.files = new vr(this._client);
    this.skills = new Io(this._client);
  }
}
ko.Models = Ir;
ko.Messages = yo;
ko.Files = vr;
ko.Skills = Io;
class To extends dr {
  create(e, t) {
    const {
      betas: r,
      ...o
    } = e;
    return this._client.post("/v1/complete", {
      body: o,
      timeout: this._client._options.timeout ?? 600000,
      ...t,
      headers: pr([{
        ...(r?.toString() != null ? {
          "anthropic-beta": r?.toString()
        } : undefined)
      }, t?.headers]),
      stream: e.stream ?? false
    });
  }
}
function xo(e) {
  return e?.output_config?.format;
}
function So(e, t, r) {
  const o = xo(t);
  if (t && "parse" in (o ?? {})) {
    return Eo(e, t);
  } else {
    return {
      ...e,
      content: e.content.map(e => {
        if (e.type === "text") {
          return Object.defineProperty({
            ...e
          }, "parsed_output", {
            value: null,
            enumerable: false
          });
        }
        return e;
      }),
      parsed_output: null
    };
  }
}
function Eo(e, t, r) {
  let o = null;
  const a = e.content.map(e => {
    if (e.type === "text") {
      const r = function (e, t) {
        const r = xo(e);
        if (r?.type !== "json_schema") {
          return null;
        }
        try {
          if ("parse" in r) {
            return r.parse(t);
          } else {
            return JSON.parse(t);
          }
        } catch (o) {
          throw new Qe(`Failed to parse structured output: ${o}`);
        }
      }(t, e.text);
      if (o === null) {
        o = r;
      }
      return Object.defineProperty({
        ...e
      }, "parsed_output", {
        value: r,
        enumerable: false
      });
    }
    return e;
  });
  return {
    ...e,
    content: a,
    parsed_output: o
  };
}
var Co;
var Mo;
var Do;
var Ro;
var Ao;
var Po;
var Uo;
var $o;
var Oo;
var Go;
var No;
var Lo;
var qo;
var Bo;
var Fo;
var Wo;
var jo;
var Ho;
var Ko;
var zo;
var Xo;
var Vo;
var Yo;
var Jo;
const Qo = "__json_buf";
function Zo(e) {
  return e.type === "tool_use" || e.type === "server_tool_use";
}
class ea {
  constructor(e, t) {
    Co.add(this);
    this.messages = [];
    this.receivedMessages = [];
    Mo.set(this, undefined);
    Do.set(this, null);
    this.controller = new AbortController();
    Ro.set(this, undefined);
    Ao.set(this, () => {});
    Po.set(this, () => {});
    Uo.set(this, undefined);
    $o.set(this, () => {});
    Oo.set(this, () => {});
    Go.set(this, {});
    No.set(this, false);
    Lo.set(this, false);
    qo.set(this, false);
    Bo.set(this, false);
    Fo.set(this, undefined);
    Wo.set(this, undefined);
    jo.set(this, undefined);
    zo.set(this, e => {
      ze(this, Lo, true);
      if (Ye(e)) {
        e = new et();
      }
      if (e instanceof et) {
        ze(this, qo, true);
        return this._emit("abort", e);
      }
      if (e instanceof Qe) {
        return this._emit("error", e);
      }
      if (e instanceof Error) {
        const t = new Qe(e.message);
        t.cause = e;
        return this._emit("error", t);
      }
      return this._emit("error", new Qe(String(e)));
    });
    ze(this, Ro, new Promise((e, t) => {
      ze(this, Ao, e);
      ze(this, Po, t);
    }));
    ze(this, Uo, new Promise((e, t) => {
      ze(this, $o, e);
      ze(this, Oo, t);
    }));
    Xe(this, Ro, "f").catch(() => {});
    Xe(this, Uo, "f").catch(() => {});
    ze(this, Do, e);
    ze(this, jo, t?.logger ?? console);
  }
  get response() {
    return Xe(this, Fo, "f");
  }
  get request_id() {
    return Xe(this, Wo, "f");
  }
  async withResponse() {
    ze(this, Bo, true);
    const e = await Xe(this, Ro, "f");
    if (!e) {
      throw new Error("Could not resolve a `Response` object");
    }
    return {
      data: this,
      response: e,
      request_id: e.headers.get("request-id")
    };
  }
  static fromReadableStream(e) {
    const t = new ea(null);
    t._run(() => t._fromReadableStream(e));
    return t;
  }
  static createMessage(e, t, r, {
    logger: o
  } = {}) {
    const a = new ea(t, {
      logger: o
    });
    for (const n of t.messages) {
      a._addMessageParam(n);
    }
    ze(a, Do, {
      ...t,
      stream: true
    });
    a._run(() => a._createMessage(e, {
      ...t,
      stream: true
    }, {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    }));
    return a;
  }
  _run(e) {
    e().then(() => {
      this._emitFinal();
      this._emit("end");
    }, Xe(this, zo, "f"));
  }
  _addMessageParam(e) {
    this.messages.push(e);
  }
  _addMessage(e, t = true) {
    this.receivedMessages.push(e);
    if (t) {
      this._emit("message", e);
    }
  }
  async _createMessage(e, t, r) {
    const o = r?.signal;
    let a;
    if (o) {
      if (o.aborted) {
        this.controller.abort();
      }
      a = this.controller.abort.bind(this.controller);
      o.addEventListener("abort", a);
    }
    try {
      Xe(this, Co, "m", Xo).call(this);
      const {
        response: o,
        data: a
      } = await e.create({
        ...t,
        stream: true
      }, {
        ...r,
        signal: this.controller.signal
      }).withResponse();
      this._connected(o);
      for await (const e of a) {
        Xe(this, Co, "m", Vo).call(this, e);
      }
      if (a.controller.signal?.aborted) {
        throw new et();
      }
      Xe(this, Co, "m", Yo).call(this);
    } finally {
      if (o && a) {
        o.removeEventListener("abort", a);
      }
    }
  }
  _connected(e) {
    if (!this.ended) {
      ze(this, Fo, e);
      ze(this, Wo, e?.headers.get("request-id"));
      Xe(this, Ao, "f").call(this, e);
      this._emit("connect");
    }
  }
  get ended() {
    return Xe(this, No, "f");
  }
  get errored() {
    return Xe(this, Lo, "f");
  }
  get aborted() {
    return Xe(this, qo, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(e, t) {
    (Xe(this, Go, "f")[e] ||= []).push({
      listener: t
    });
    return this;
  }
  off(e, t) {
    const r = Xe(this, Go, "f")[e];
    if (!r) {
      return this;
    }
    const o = r.findIndex(e => e.listener === t);
    if (o >= 0) {
      r.splice(o, 1);
    }
    return this;
  }
  once(e, t) {
    (Xe(this, Go, "f")[e] ||= []).push({
      listener: t,
      once: true
    });
    return this;
  }
  emitted(e) {
    return new Promise((t, r) => {
      ze(this, Bo, true);
      if (e !== "error") {
        this.once("error", r);
      }
      this.once(e, t);
    });
  }
  async done() {
    ze(this, Bo, true);
    await Xe(this, Uo, "f");
  }
  get currentMessage() {
    return Xe(this, Mo, "f");
  }
  async finalMessage() {
    await this.done();
    return Xe(this, Co, "m", Ho).call(this);
  }
  async finalText() {
    await this.done();
    return Xe(this, Co, "m", Ko).call(this);
  }
  _emit(e, ...t) {
    if (Xe(this, No, "f")) {
      return;
    }
    if (e === "end") {
      ze(this, No, true);
      Xe(this, $o, "f").call(this);
    }
    const r = Xe(this, Go, "f")[e];
    if (r) {
      Xe(this, Go, "f")[e] = r.filter(e => !e.once);
      r.forEach(({
        listener: e
      }) => e(...t));
    }
    if (e === "abort") {
      const e = t[0];
      if (!Xe(this, Bo, "f") && !r?.length) {
        Promise.reject(e);
      }
      Xe(this, Po, "f").call(this, e);
      Xe(this, Oo, "f").call(this, e);
      this._emit("end");
      return;
    }
    if (e === "error") {
      const e = t[0];
      if (!Xe(this, Bo, "f") && !r?.length) {
        Promise.reject(e);
      }
      Xe(this, Po, "f").call(this, e);
      Xe(this, Oo, "f").call(this, e);
      this._emit("end");
    }
  }
  _emitFinal() {
    if (this.receivedMessages.at(-1)) {
      this._emit("finalMessage", Xe(this, Co, "m", Ho).call(this));
    }
  }
  async _fromReadableStream(e, t) {
    const r = t?.signal;
    let o;
    if (r) {
      if (r.aborted) {
        this.controller.abort();
      }
      o = this.controller.abort.bind(this.controller);
      r.addEventListener("abort", o);
    }
    try {
      Xe(this, Co, "m", Xo).call(this);
      this._connected(null);
      const t = Ht.fromReadableStream(e, this.controller);
      for await (const e of t) {
        Xe(this, Co, "m", Vo).call(this, e);
      }
      if (t.controller.signal?.aborted) {
        throw new et();
      }
      Xe(this, Co, "m", Yo).call(this);
    } finally {
      if (r && o) {
        r.removeEventListener("abort", o);
      }
    }
  }
  [(Mo = new WeakMap(), Do = new WeakMap(), Ro = new WeakMap(), Ao = new WeakMap(), Po = new WeakMap(), Uo = new WeakMap(), $o = new WeakMap(), Oo = new WeakMap(), Go = new WeakMap(), No = new WeakMap(), Lo = new WeakMap(), qo = new WeakMap(), Bo = new WeakMap(), Fo = new WeakMap(), Wo = new WeakMap(), jo = new WeakMap(), zo = new WeakMap(), Co = new WeakSet(), Ho = function () {
    if (this.receivedMessages.length === 0) {
      throw new Qe("stream ended without producing a Message with role=assistant");
    }
    return this.receivedMessages.at(-1);
  }, Ko = function () {
    if (this.receivedMessages.length === 0) {
      throw new Qe("stream ended without producing a Message with role=assistant");
    }
    const e = this.receivedMessages.at(-1).content.filter(e => e.type === "text").map(e => e.text);
    if (e.length === 0) {
      throw new Qe("stream ended without producing a content block with type=text");
    }
    return e.join(" ");
  }, Xo = function () {
    if (!this.ended) {
      ze(this, Mo, undefined);
    }
  }, Vo = function (e) {
    if (this.ended) {
      return;
    }
    const t = Xe(this, Co, "m", Jo).call(this, e);
    this._emit("streamEvent", e, t);
    switch (e.type) {
      case "content_block_delta":
        {
          const r = t.content.at(-1);
          switch (e.delta.type) {
            case "text_delta":
              if (r.type === "text") {
                this._emit("text", e.delta.text, r.text || "");
              }
              break;
            case "citations_delta":
              if (r.type === "text") {
                this._emit("citation", e.delta.citation, r.citations ?? []);
              }
              break;
            case "input_json_delta":
              if (Zo(r) && r.input) {
                this._emit("inputJson", e.delta.partial_json, r.input);
              }
              break;
            case "thinking_delta":
              if (r.type === "thinking") {
                this._emit("thinking", e.delta.thinking, r.thinking);
              }
              break;
            case "signature_delta":
              if (r.type === "thinking") {
                this._emit("signature", r.signature);
              }
              break;
            default:
              e.delta;
          }
          break;
        }
      case "message_stop":
        this._addMessageParam(t);
        this._addMessage(So(t, Xe(this, Do, "f"), Xe(this, jo, "f")), true);
        break;
      case "content_block_stop":
        this._emit("contentBlock", t.content.at(-1));
        break;
      case "message_start":
        ze(this, Mo, t);
    }
  }, Yo = function () {
    if (this.ended) {
      throw new Qe("stream has ended, this shouldn't happen");
    }
    const e = Xe(this, Mo, "f");
    if (!e) {
      throw new Qe("request ended without sending any chunks");
    }
    ze(this, Mo, undefined);
    return So(e, Xe(this, Do, "f"), Xe(this, jo, "f"));
  }, Jo = function (e) {
    let t = Xe(this, Mo, "f");
    if (e.type === "message_start") {
      if (t) {
        throw new Qe(`Unexpected event order, got ${e.type} before receiving "message_stop"`);
      }
      return e.message;
    }
    if (!t) {
      throw new Qe(`Unexpected event order, got ${e.type} before "message_start"`);
    }
    switch (e.type) {
      case "message_stop":
      case "content_block_stop":
        return t;
      case "message_delta":
        t.stop_reason = e.delta.stop_reason;
        t.stop_sequence = e.delta.stop_sequence;
        t.usage.output_tokens = e.usage.output_tokens;
        if (e.usage.input_tokens != null) {
          t.usage.input_tokens = e.usage.input_tokens;
        }
        if (e.usage.cache_creation_input_tokens != null) {
          t.usage.cache_creation_input_tokens = e.usage.cache_creation_input_tokens;
        }
        if (e.usage.cache_read_input_tokens != null) {
          t.usage.cache_read_input_tokens = e.usage.cache_read_input_tokens;
        }
        if (e.usage.server_tool_use != null) {
          t.usage.server_tool_use = e.usage.server_tool_use;
        }
        return t;
      case "content_block_start":
        t.content.push({
          ...e.content_block
        });
        return t;
      case "content_block_delta":
        {
          const r = t.content.at(e.index);
          switch (e.delta.type) {
            case "text_delta":
              if (r?.type === "text") {
                t.content[e.index] = {
                  ...r,
                  text: (r.text || "") + e.delta.text
                };
              }
              break;
            case "citations_delta":
              if (r?.type === "text") {
                t.content[e.index] = {
                  ...r,
                  citations: [...(r.citations ?? []), e.delta.citation]
                };
              }
              break;
            case "input_json_delta":
              if (r && Zo(r)) {
                let o = r[Qo] || "";
                o += e.delta.partial_json;
                const a = {
                  ...r
                };
                Object.defineProperty(a, Qo, {
                  value: o,
                  enumerable: false,
                  writable: true
                });
                if (o) {
                  a.input = Cr(o);
                }
                t.content[e.index] = a;
              }
              break;
            case "thinking_delta":
              if (r?.type === "thinking") {
                t.content[e.index] = {
                  ...r,
                  thinking: r.thinking + e.delta.thinking
                };
              }
              break;
            case "signature_delta":
              if (r?.type === "thinking") {
                t.content[e.index] = {
                  ...r,
                  signature: e.delta.signature
                };
              }
              break;
            default:
              e.delta;
          }
          return t;
        }
    }
  }, Symbol.asyncIterator)]() {
    const e = [];
    const t = [];
    let r = false;
    this.on("streamEvent", r => {
      const o = t.shift();
      if (o) {
        o.resolve(r);
      } else {
        e.push(r);
      }
    });
    this.on("end", () => {
      r = true;
      for (const e of t) {
        e.resolve(undefined);
      }
      t.length = 0;
    });
    this.on("abort", e => {
      r = true;
      for (const r of t) {
        r.reject(e);
      }
      t.length = 0;
    });
    this.on("error", e => {
      r = true;
      for (const r of t) {
        r.reject(e);
      }
      t.length = 0;
    });
    return {
      next: async () => {
        if (!e.length) {
          if (r) {
            return {
              value: undefined,
              done: true
            };
          } else {
            return new Promise((e, r) => t.push({
              resolve: e,
              reject: r
            })).then(e => e ? {
              value: e,
              done: false
            } : {
              value: undefined,
              done: true
            });
          }
        }
        return {
          value: e.shift(),
          done: false
        };
      },
      return: async () => {
        this.abort();
        return {
          value: undefined,
          done: true
        };
      }
    };
  }
  toReadableStream() {
    return new Ht(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
}
class ta extends dr {
  create(e, t) {
    return this._client.post("/v1/messages/batches", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(_r`/v1/messages/batches/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/v1/messages/batches", Qt, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(_r`/v1/messages/batches/${e}`, t);
  }
  cancel(e, t) {
    return this._client.post(_r`/v1/messages/batches/${e}/cancel`, t);
  }
  async results(e, t) {
    const r = await this.retrieve(e);
    if (!r.results_url) {
      throw new Qe(`No batch \`results_url\`; Has it finished processing? ${r.processing_status} - ${r.id}`);
    }
    return this._client.get(r.results_url, {
      ...t,
      headers: pr([{
        Accept: "application/binary"
      }, t?.headers]),
      stream: true,
      __binaryResponse: true
    })._thenUnwrap((e, t) => bo.fromResponse(t.response, t.controller));
  }
}
class ra extends dr {
  constructor() {
    super(...arguments);
    this.batches = new ta(this._client);
  }
  create(e, t) {
    e.model;
    let r = this._client._options.timeout;
    if (!e.stream && r == null) {
      const t = kr[e.model] ?? undefined;
      r = this._client.calculateNonstreamingTimeout(e.max_tokens, t);
    }
    const o = br(e.tools, e.messages);
    return this._client.post("/v1/messages", {
      body: e,
      timeout: r ?? 600000,
      ...t,
      headers: pr([o, t?.headers]),
      stream: e.stream ?? false
    });
  }
  parse(e, t) {
    return this.create(e, t).then(t => Eo(t, e, this._client.logger ?? console));
  }
  stream(e, t) {
    return ea.createMessage(this, e, t, {
      logger: this._client.logger ?? console
    });
  }
  countTokens(e, t) {
    return this._client.post("/v1/messages/count_tokens", {
      body: e,
      ...t
    });
  }
}
ra.Batches = ta;
class oa extends dr {
  retrieve(e, t = {}, r) {
    const {
      betas: o
    } = t ?? {};
    return this._client.get(_r`/v1/models/${e}`, {
      ...r,
      headers: pr([{
        ...(o?.toString() != null ? {
          "anthropic-beta": o?.toString()
        } : undefined)
      }, r?.headers])
    });
  }
  list(e = {}, t) {
    const {
      betas: r,
      ...o
    } = e ?? {};
    return this._client.getAPIList("/v1/models", Qt, {
      query: o,
      ...t,
      headers: pr([{
        ...(r?.toString() != null ? {
          "anthropic-beta": r?.toString()
        } : undefined)
      }, t?.headers])
    });
  }
}
var aa = {};
const na = e => globalThis.process !== undefined ? aa?.[e]?.trim() ?? undefined : globalThis.Deno !== undefined ? globalThis.Deno.env?.get?.(e)?.trim() : undefined;
var sa;
var ia;
var ca;
var la;
class da {
  constructor({
    baseURL: e = na("ANTHROPIC_BASE_URL"),
    apiKey: t = na("ANTHROPIC_API_KEY") ?? null,
    authToken: r = na("ANTHROPIC_AUTH_TOKEN") ?? null,
    ...o
  } = {}) {
    sa.add(this);
    ca.set(this, undefined);
    const a = {
      apiKey: t,
      authToken: r,
      ...o,
      baseURL: e || "https://api.anthropic.com"
    };
    if (!a.dangerouslyAllowBrowser && typeof window != "undefined" && window.document !== undefined && typeof navigator != "undefined") {
      throw new Qe("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew Anthropic({ apiKey, dangerouslyAllowBrowser: true });\n");
    }
    this.baseURL = a.baseURL;
    this.timeout = a.timeout ?? ia.DEFAULT_TIMEOUT;
    this.logger = a.logger ?? console;
    const n = "warn";
    this.logLevel = n;
    this.logLevel = $t(a.logLevel, "ClientOptions.logLevel", this) ?? $t(na("ANTHROPIC_LOG"), "process.env['ANTHROPIC_LOG']", this) ?? n;
    this.fetchOptions = a.fetchOptions;
    this.maxRetries = a.maxRetries ?? 2;
    this.fetch = a.fetch ?? function () {
      if (typeof fetch != "undefined") {
        return fetch;
      }
      throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
    }();
    ze(this, ca, Tt);
    this._options = a;
    this.apiKey = typeof t == "string" ? t : null;
    this.authToken = r;
  }
  withOptions(e) {
    return new this.constructor({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      authToken: this.authToken,
      ...e
    });
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({
    values: e,
    nulls: t
  }) {
    if (!e.get("x-api-key") && !e.get("authorization") && (!this.apiKey || !e.get("x-api-key")) && !t.has("x-api-key") && (!this.authToken || !e.get("authorization")) && !t.has("authorization")) {
      throw new Error("Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the \"X-Api-Key\" or \"Authorization\" headers to be explicitly omitted");
    }
  }
  async authHeaders(e) {
    return pr([await this.apiKeyAuth(e), await this.bearerAuth(e)]);
  }
  async apiKeyAuth(e) {
    if (this.apiKey != null) {
      return pr([{
        "X-Api-Key": this.apiKey
      }]);
    }
  }
  async bearerAuth(e) {
    if (this.authToken != null) {
      return pr([{
        Authorization: `Bearer ${this.authToken}`
      }]);
    }
  }
  stringifyQuery(e) {
    return Object.entries(e).filter(([e, t]) => t !== undefined).map(([e, t]) => {
      if (typeof t == "string" || typeof t == "number" || typeof t == "boolean") {
        return `${encodeURIComponent(e)}=${encodeURIComponent(t)}`;
      }
      if (t === null) {
        return `${encodeURIComponent(e)}=`;
      }
      throw new Qe(`Cannot stringify type ${typeof t}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
    }).join("&");
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${gt}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${Ve()}`;
  }
  makeStatusError(e, t, r, o) {
    return Ze.generate(e, t, r, o);
  }
  buildURL(e, t, r) {
    const o = !Xe(this, sa, "m", la).call(this) && r || this.baseURL;
    const a = (e => ut.test(e))(e) ? new URL(e) : new URL(o + (o.endsWith("/") && e.startsWith("/") ? e.slice(1) : e));
    const n = this.defaultQuery();
    if (!function (e) {
      if (!e) {
        return true;
      }
      for (const t in e) {
        return false;
      }
      return true;
    }(n)) {
      t = {
        ...n,
        ...t
      };
    }
    if (typeof t == "object" && t && !Array.isArray(t)) {
      a.search = this.stringifyQuery(t);
    }
    return a.toString();
  }
  _calculateNonstreamingTimeout(e) {
    if (e * 3600 / 128000 > 600) {
      throw new Qe("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#streaming-responses for more details");
    }
    return 600000;
  }
  async prepareOptions(e) {}
  async prepareRequest(e, {
    url: t,
    options: r
  }) {}
  get(e, t) {
    return this.methodRequest("get", e, t);
  }
  post(e, t) {
    return this.methodRequest("post", e, t);
  }
  patch(e, t) {
    return this.methodRequest("patch", e, t);
  }
  put(e, t) {
    return this.methodRequest("put", e, t);
  }
  delete(e, t) {
    return this.methodRequest("delete", e, t);
  }
  methodRequest(e, t, r) {
    return this.request(Promise.resolve(r).then(r => ({
      method: e,
      path: t,
      ...r
    })));
  }
  request(e, t = null) {
    return new Vt(this, this.makeRequest(e, t, undefined));
  }
  async makeRequest(e, t, r) {
    const o = await e;
    const a = o.maxRetries ?? this.maxRetries;
    if (t == null) {
      t = a;
    }
    await this.prepareOptions(o);
    const {
      req: n,
      url: s,
      timeout: i
    } = await this.buildRequest(o, {
      retryCount: a - t
    });
    await this.prepareRequest(n, {
      url: s,
      options: o
    });
    const c = "log_" + (Math.random() * 16777216 | 0).toString(16).padStart(6, "0");
    const l = r === undefined ? "" : `, retryOf: ${r}`;
    const d = Date.now();
    qt(this).debug(`[${c}] sending request`, Bt({
      retryOfRequestLogID: r,
      method: o.method,
      url: s,
      options: o,
      headers: n.headers
    }));
    if (o.signal?.aborted) {
      throw new et();
    }
    const u = new AbortController();
    const h = await this.fetchWithTimeout(s, n, i, u).catch(Je);
    const p = Date.now();
    if (h instanceof globalThis.Error) {
      const e = `retrying, ${t} attempts remaining`;
      if (o.signal?.aborted) {
        throw new et();
      }
      const a = Ye(h) || /timed? ?out/i.test(String(h) + ("cause" in h ? String(h.cause) : ""));
      if (t) {
        qt(this).info(`[${c}] connection ${a ? "timed out" : "failed"} - ${e}`);
        qt(this).debug(`[${c}] connection ${a ? "timed out" : "failed"} (${e})`, Bt({
          retryOfRequestLogID: r,
          url: s,
          durationMs: p - d,
          message: h.message
        }));
        return this.retryRequest(o, t, r ?? c);
      }
      qt(this).info(`[${c}] connection ${a ? "timed out" : "failed"} - error; no more retries left`);
      qt(this).debug(`[${c}] connection ${a ? "timed out" : "failed"} (error; no more retries left)`, Bt({
        retryOfRequestLogID: r,
        url: s,
        durationMs: p - d,
        message: h.message
      }));
      if (a) {
        throw new rt();
      }
      throw new tt({
        cause: h
      });
    }
    const m = `[${c}${l}${[...h.headers.entries()].filter(([e]) => e === "request-id").map(([e, t]) => ", " + e + ": " + JSON.stringify(t)).join("")}] ${n.method} ${s} ${h.ok ? "succeeded" : "failed"} with status ${h.status} in ${p - d}ms`;
    if (!h.ok) {
      const e = await this.shouldRetry(h);
      if (t && e) {
        const e = `retrying, ${t} attempts remaining`;
        await async function (e) {
          if (e === null || typeof e != "object") {
            return;
          }
          if (e[Symbol.asyncIterator]) {
            await e[Symbol.asyncIterator]().return?.();
            return;
          }
          const t = e.getReader();
          const r = t.cancel();
          t.releaseLock();
          await r;
        }(h.body);
        qt(this).info(`${m} - ${e}`);
        qt(this).debug(`[${c}] response error (${e})`, Bt({
          retryOfRequestLogID: r,
          url: h.url,
          status: h.status,
          headers: h.headers,
          durationMs: p - d
        }));
        return this.retryRequest(o, t, r ?? c, h.headers);
      }
      const a = e ? "error; no more retries left" : "error; not retryable";
      qt(this).info(`${m} - ${a}`);
      const n = await h.text().catch(e => Je(e).message);
      const s = ft(n);
      const i = s ? undefined : n;
      qt(this).debug(`[${c}] response error (${a})`, Bt({
        retryOfRequestLogID: r,
        url: h.url,
        status: h.status,
        headers: h.headers,
        message: i,
        durationMs: Date.now() - d
      }));
      throw this.makeStatusError(h.status, s, i, h.headers);
    }
    qt(this).info(m);
    qt(this).debug(`[${c}] response start`, Bt({
      retryOfRequestLogID: r,
      url: h.url,
      status: h.status,
      headers: h.headers,
      durationMs: p - d
    }));
    return {
      response: h,
      options: o,
      controller: u,
      requestLogID: c,
      retryOfRequestLogID: r,
      startTime: d
    };
  }
  getAPIList(e, t, r) {
    return this.requestAPIList(t, {
      method: "get",
      path: e,
      ...r
    });
  }
  requestAPIList(e, t) {
    const r = this.makeRequest(t, null, undefined);
    return new Jt(this, r, e);
  }
  async fetchWithTimeout(e, t, r, o) {
    const {
      signal: a,
      method: n,
      ...s
    } = t || {};
    if (a) {
      a.addEventListener("abort", () => o.abort());
    }
    const i = setTimeout(() => o.abort(), r);
    const c = globalThis.ReadableStream && s.body instanceof globalThis.ReadableStream || typeof s.body == "object" && s.body !== null && Symbol.asyncIterator in s.body;
    const l = {
      signal: o.signal,
      ...(c ? {
        duplex: "half"
      } : {}),
      method: "GET",
      ...s
    };
    if (n) {
      l.method = n.toUpperCase();
    }
    try {
      return await this.fetch.call(undefined, e, l);
    } finally {
      clearTimeout(i);
    }
  }
  async shouldRetry(e) {
    const t = e.headers.get("x-should-retry");
    return t === "true" || t !== "false" && (e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500);
  }
  async retryRequest(e, t, r, o) {
    let a;
    const n = o?.get("retry-after-ms");
    if (n) {
      const e = parseFloat(n);
      if (!Number.isNaN(e)) {
        a = e;
      }
    }
    const s = o?.get("retry-after");
    if (s && !a) {
      const e = parseFloat(s);
      a = Number.isNaN(e) ? Date.parse(s) - Date.now() : e * 1000;
    }
    if (!a || !(a >= 0) || !(a < 60000)) {
      const r = e.maxRetries ?? this.maxRetries;
      a = this.calculateDefaultRetryTimeoutMillis(t, r);
    }
    var i;
    await (i = a, new Promise(e => setTimeout(e, i)));
    return this.makeRequest(e, t - 1, r);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    const r = t - e;
    return Math.min(Math.pow(2, r) * 0.5, 8) * (1 - Math.random() * 0.25) * 1000;
  }
  calculateNonstreamingTimeout(e, t) {
    const r = 600000;
    if (e * 3600000 / 128000 > r || t != null && e > t) {
      throw new Qe("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#long-requests for more details");
    }
    return r;
  }
  async buildRequest(e, {
    retryCount: t = 0
  } = {}) {
    const r = {
      ...e
    };
    const {
      method: o,
      path: a,
      query: n,
      defaultBaseURL: s
    } = r;
    const i = this.buildURL(a, n, s);
    if ("timeout" in r) {
      ((e, t) => {
        if (typeof t != "number" || !Number.isInteger(t)) {
          throw new Qe(`${e} must be an integer`);
        }
        if (t < 0) {
          throw new Qe(`${e} must be a positive integer`);
        }
      })("timeout", r.timeout);
    }
    r.timeout = r.timeout ?? this.timeout;
    const {
      bodyHeaders: c,
      body: l
    } = this.buildBody({
      options: r
    });
    return {
      req: {
        method: o,
        headers: await this.buildHeaders({
          options: e,
          method: o,
          bodyHeaders: c,
          retryCount: t
        }),
        ...(r.signal && {
          signal: r.signal
        }),
        ...(globalThis.ReadableStream && l instanceof globalThis.ReadableStream && {
          duplex: "half"
        }),
        ...(l && {
          body: l
        }),
        ...(this.fetchOptions ?? {}),
        ...(r.fetchOptions ?? {})
      },
      url: i,
      timeout: r.timeout
    };
  }
  async buildHeaders({
    options: e,
    method: t,
    bodyHeaders: r,
    retryCount: o
  }) {
    let a = {};
    if (this.idempotencyHeader && t !== "get") {
      e.idempotencyKey ||= this.defaultIdempotencyKey();
      a[this.idempotencyHeader] = e.idempotencyKey;
    }
    const n = pr([a, {
      Accept: "application/json",
      "User-Agent": this.getUserAgent(),
      "X-Stainless-Retry-Count": String(o),
      ...(e.timeout ? {
        "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1000))
      } : {}),
      ...(_t ??= bt()),
      ...(this._options.dangerouslyAllowBrowser ? {
        "anthropic-dangerous-direct-browser-access": "true"
      } : undefined),
      "anthropic-version": "2023-06-01"
    }, await this.authHeaders(e), this._options.defaultHeaders, r, e.headers]);
    this.validateHeaders(n);
    return n.values;
  }
  buildBody({
    options: {
      body: e,
      headers: t
    }
  }) {
    if (!e) {
      return {
        bodyHeaders: undefined,
        body: undefined
      };
    }
    const r = pr([t]);
    if (ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e == "string" && r.values.has("content-type") || globalThis.Blob && e instanceof globalThis.Blob || e instanceof FormData || e instanceof URLSearchParams || globalThis.ReadableStream && e instanceof globalThis.ReadableStream) {
      return {
        bodyHeaders: undefined,
        body: e
      };
    } else if (typeof e == "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next == "function")) {
      return {
        bodyHeaders: undefined,
        body: It(e)
      };
    } else {
      return Xe(this, ca, "f").call(this, {
        body: e,
        headers: r
      });
    }
  }
}
ia = da;
ca = new WeakMap();
sa = new WeakSet();
la = function () {
  return this.baseURL !== "https://api.anthropic.com";
};
da.Anthropic = ia;
da.HUMAN_PROMPT = "\\n\\nHuman:";
da.AI_PROMPT = "\\n\\nAssistant:";
da.DEFAULT_TIMEOUT = 600000;
da.AnthropicError = Qe;
da.APIError = Ze;
da.APIConnectionError = tt;
da.APIConnectionTimeoutError = rt;
da.APIUserAbortError = et;
da.NotFoundError = st;
da.ConflictError = it;
da.RateLimitError = lt;
da.BadRequestError = ot;
da.AuthenticationError = at;
da.InternalServerError = dt;
da.PermissionDeniedError = nt;
da.UnprocessableEntityError = ct;
da.toFile = async function (e, t, r) {
  er();
  e = await e;
  t ||= rr(e, true);
  if ((e => e != null && typeof e == "object" && typeof e.name == "string" && typeof e.lastModified == "number" && cr(e))(e)) {
    if (e instanceof File && t == null && r == null) {
      return e;
    } else {
      return tr([await e.arrayBuffer()], t ?? e.name, {
        type: e.type,
        lastModified: e.lastModified,
        ...r
      });
    }
  }
  if ((e => e != null && typeof e == "object" && typeof e.url == "string" && typeof e.blob == "function")(e)) {
    const o = await e.blob();
    t ||= new URL(e.url).pathname.split(/[\\/]/).pop();
    return tr(await lr(o), t, r);
  }
  const o = await lr(e);
  if (!r?.type) {
    const e = o.find(e => typeof e == "object" && "type" in e && e.type);
    if (typeof e == "string") {
      r = {
        ...r,
        type: e
      };
    }
  }
  return tr(o, t, r);
};
class ua extends da {
  constructor() {
    super(...arguments);
    this.completions = new To(this);
    this.messages = new ra(this);
    this.models = new oa(this);
    this.beta = new ko(this);
  }
}
function ha(e) {
  return e.toLowerCase().replace(/^www\./, "");
}
function pa(e) {
  try {
    return ha(new URL(e).hostname);
  } catch {
    return "";
  }
}
ua.Completions = To;
ua.Messages = ra;
ua.Models = oa;
ua.Beta = ko;
const ma = [{
  domain: "docs.google.com",
  pathPrefix: "/document/",
  app: "google_docs"
}, {
  domain: "docs.google.com",
  pathPrefix: "/spreadsheets/",
  app: "google_sheets"
}, {
  domain: "docs.google.com",
  pathPrefix: "/presentation/",
  app: "google_slides"
}];
function fa(e) {
  try {
    const t = new URL(e);
    const r = ha(t.hostname);
    const o = t.pathname;
    for (const e of ma) {
      if (r === e.domain && o.startsWith(e.pathPrefix)) {
        return e.app;
      }
    }
  } catch {}
}
let ga = null;
let ba = false;
let wa = null;
let ya = 0;
let _a = null;
let va = null;
let Ia = 0;
let ka = null;
const Ta = Date.now();
let xa;
async function Sa() {
  return (await chrome.storage.local.get("bridgeDisplayName")).bridgeDisplayName;
}
const Ea = "bridge-keepalive";
const Ca = new Map();
function Ma() {
  try {
    const e = navigator.userAgentData;
    return e?.platform ?? navigator.platform ?? "Unknown";
  } catch {
    return navigator.platform ?? "Unknown";
  }
}
async function Da() {
  if (va) {
    return va;
  }
  const e = await chrome.storage.local.get("bridgeDeviceId");
  if (e.bridgeDeviceId) {
    va = e.bridgeDeviceId;
    return va;
  } else {
    va = crypto.randomUUID();
    await chrome.storage.local.set({
      bridgeDeviceId: va
    });
    return va;
  }
}
function Ra() {
  Aa();
  _a = setInterval(() => {
    if (ga?.readyState === WebSocket.OPEN) {
      ga.send(JSON.stringify({
        type: "ping"
      }));
    }
  }, 20000);
}
function Aa() {
  if (_a) {
    clearInterval(_a);
    _a = null;
  }
}
async function Pa() {
  if (ga?.readyState === WebSocket.OPEN || ba) {
    return false;
  }
  ba = true;
  const e = p().localBridge;
  let t;
  let o;
  o = await u();
  if (!o) {
    ba = false;
    Na();
    return false;
  }
  t = await h(o);
  if (!t) {
    ba = false;
    Na();
    return false;
  }
  try {
    const a = await Da();
    ka = a;
    const n = await Sa();
    const s = `wss://bridge.claudeusercontent.com/chrome/${t}`;
    if (ga) {
      ga.onclose = null;
      ga.close();
    }
    const i = new WebSocket(s);
    ga = i;
    i.onopen = () => {
      if (ga !== i) {
        return;
      }
      const t = {
        type: "connect",
        client_type: "chrome-extension",
        device_id: a,
        os_platform: Ma(),
        extension_version: chrome.runtime.getManifest().version,
        ...(n && {
          display_name: n
        })
      };
      if (!e) {
        t.oauth_token = o;
      }
      i.send(JSON.stringify(t));
    };
    i.onmessage = async e => {
      if (ga === i) {
        try {
          const t = JSON.parse(e.data);
          await async function (e) {
            switch (e.type) {
              case "paired":
                m("claude_chrome.bridge.connected", {
                  status: "paired",
                  sw_uptime_ms: Date.now() - Ta,
                  previous_close_code: xa ?? null,
                  reconnect_attempt: ya
                });
                Ra();
                ba = false;
                ya = 0;
                break;
              case "waiting":
                m("claude_chrome.bridge.connected", {
                  status: "waiting",
                  sw_uptime_ms: Date.now() - Ta,
                  previous_close_code: xa ?? null,
                  reconnect_attempt: ya
                });
                Ra();
                ba = false;
                ya = 0;
                break;
              case "ping":
                La({
                  type: "pong"
                });
                break;
              case "pong":
                break;
              case "peer_connected":
                m("claude_chrome.bridge.peer_connected");
                break;
              case "peer_disconnected":
                m("claude_chrome.bridge.peer_disconnected");
                break;
              case "tool_call":
                await async function (e) {
                  const t = e.target_device_id;
                  if (t && t !== ka) {
                    return;
                  }
                  const o = e.tool_use_id;
                  const a = e.tool;
                  const n = e.client_type || "desktop";
                  const s = e.args ?? {};
                  const i = e.permission_mode;
                  const c = e.allowed_domains;
                  const l = e.handle_permission_prompts === true;
                  const d = e.session_scope;
                  if (!o || !a) {
                    return;
                  }
                  m("claude_chrome.bridge.tool_received", {
                    tool_name: a,
                    client_type: n,
                    tool_use_id: o
                  });
                  const u = {
                    tool_name: a,
                    client_type: n,
                    tool_use_id: o
                  };
                  if ((await g(r.LAST_AUTH_FAILURE_REASON)) === "session_expired") {
                    m("claude_chrome.bridge.tool_call", {
                      ...u,
                      success: false,
                      error: "session_expired"
                    });
                    La({
                      type: "tool_result",
                      tool_use_id: o,
                      error: {
                        content: [{
                          type: "text",
                          text: "Authentication failed. Please check your custom provider or API key settings in Claw for Chrome."
                        }]
                      }
                    });
                    return;
                  }
                  const h = typeof s.tabId == "number" ? s.tabId : undefined;
                  if (h !== undefined) {
                    try {
                      await chrome.tabs.get(h);
                    } catch {
                      if (t) {
                        m("claude_chrome.bridge.tool_call", {
                          ...u,
                          success: false,
                          error: "tab_not_found"
                        });
                        La({
                          type: "tool_result",
                          tool_use_id: o,
                          error: {
                            content: [{
                              type: "text",
                              text: `Tab ${h} no longer exists. Call tabs_context_mcp to get current tabs.`
                            }]
                          }
                        });
                      }
                      return;
                    }
                  }
                  try {
                    const e = await wn({
                      toolName: a,
                      args: s,
                      tabId: h,
                      tabGroupId: s.tabGroupId,
                      clientId: n,
                      source: "bridge",
                      permissionMode: i,
                      allowedDomains: c,
                      toolUseId: o,
                      handlePermissionPrompts: l,
                      sessionScope: d
                    });
                    m("claude_chrome.bridge.tool_call", {
                      ...u,
                      success: true
                    });
                    La({
                      ...e,
                      type: "tool_result",
                      tool_use_id: o
                    });
                  } catch (p) {
                    m("claude_chrome.bridge.tool_call", {
                      ...u,
                      success: false,
                      error: p instanceof Error ? p.message : String(p)
                    });
                    La({
                      type: "tool_result",
                      tool_use_id: o,
                      error: {
                        content: [{
                          type: "text",
                          text: p instanceof Error ? p.message : String(p)
                        }]
                      }
                    });
                  }
                }(e);
                break;
              case "pairing_request":
                await async function (e) {
                  const t = e.request_id;
                  if (!t) {
                    return;
                  }
                  if (t === qa) {
                    return;
                  }
                  qa = t;
                  const r = e.client_type || "desktop";
                  const o = await Sa();
                  try {
                    const e = await chrome.runtime.sendMessage({
                      type: "show_pairing_prompt",
                      request_id: t,
                      client_type: r,
                      current_name: o
                    });
                    if (e?.handled) {
                      return;
                    }
                  } catch {}
                  const a = chrome.runtime.getURL(`pairing.html?request_id=${encodeURIComponent(t)}&client_type=${encodeURIComponent(r)}&current_name=${encodeURIComponent(o || "")}`);
                  chrome.tabs.create({
                    url: a
                  });
                }(e);
                break;
              case "permission_response":
                (function (e) {
                  const t = e.request_id;
                  if (!t) {
                    return;
                  }
                  const r = Ca.get(t);
                  if (!r) {
                    return;
                  }
                  Ca.delete(t);
                  r.resolve(e.allowed ?? false);
                })(e);
                break;
              case "error":
                ba = false;
            }
          }(t);
        } catch (t) {}
      }
    };
    i.onclose = e => {
      xa = e.code;
      m("claude_chrome.bridge.disconnected", {
        code: e.code,
        reason: e.reason,
        reconnect_attempt: ya,
        sw_uptime_ms: Date.now() - Ta
      });
      if (ga === i) {
        Aa();
        ba = false;
        ga = null;
        Ga();
        Na();
      }
    };
    i.onerror = e => {
      m("claude_chrome.bridge.error", {
        error: String(e)
      });
      if (ga === i) {
        ba = false;
      }
    };
    return true;
  } catch (a) {
    ba = false;
    Na();
    return false;
  }
}
function Ua() {
  if (wa) {
    clearTimeout(wa);
    wa = null;
  }
  Aa();
  ya = 0;
  ba = false;
  Ga();
  if (ga) {
    ga.onclose = null;
    ga.close();
    ga = null;
  }
}
function $a() {
  return ga?.readyState === WebSocket.OPEN;
}
function Oa(e, t) {
  return !!$a() && (La({
    type: "notification",
    method: e,
    params: t || {}
  }), true);
}
function Ga() {
  for (const [, e] of Ca) {
    e.resolve(false);
  }
  Ca.clear();
}
function Na() {
  if (wa) {
    return;
  }
  ya++;
  const e = Math.min(Math.pow(1.5, ya - 1) * 2000, 20000);
  wa = setTimeout(() => {
    wa = null;
    Pa();
  }, e);
}
function La(e) {
  if (ga?.readyState === WebSocket.OPEN) {
    ga.send(JSON.stringify(e));
  }
  if (e.type === "tool_result" && e.tool_use_id) {
    m("claude_chrome.bridge.result_sent", {
      tool_use_id: e.tool_use_id,
      socket_state: ga?.readyState ?? -1,
      buffered_amount: ga?.bufferedAmount ?? -1,
      is_error: Boolean(e.error)
    });
  }
}
let qa;
let Ba = false;
function Fa() {
  if ("ServiceWorkerGlobalScope" in globalThis) {
    if (!Ba) {
      Ba = true;
      chrome.alarms.create(Ea, {
        periodInMinutes: 0.5
      });
      chrome.alarms.onAlarm.addListener(e => {
        if (e.name === Ea) {
          Pa();
          if (ga?.readyState === WebSocket.OPEN) {
            ga.send(JSON.stringify({
              type: "ping"
            }));
          }
          if (Date.now() - Ia >= 1800000) {
            Ia = Date.now();
            f().then(({
              isRefreshed: e
            }) => {});
          }
        }
      });
      chrome.runtime.onMessage.addListener((e, t, r) => {
        if (e.type === "pairing_confirmed") {
          const {
            request_id: t,
            name: o
          } = e;
          (async function (e) {
            await chrome.storage.local.set({
              bridgeDisplayName: e
            });
          })(o);
          Da().then(e => {
            La({
              type: "pairing_response",
              request_id: t,
              device_id: e,
              name: o
            });
          });
          r({
            ok: true
          });
        }
        return false;
      });
    }
  }
}
async function Wa(e) {
  const {
    tabId: t,
    prompt: o,
    taskName: a,
    skipPermissions: n,
    model: s
  } = e;
  const i = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  const c = `shortcut_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  await b(r.TARGET_TAB_ID, t);
  await async function (e) {
    const {
      sessionId: t,
      skipPermissions: r,
      model: o
    } = e;
    const a = chrome.runtime.getURL(`sidepanel.html?mode=window&sessionId=${t}${r ? "&skipPermissions=true" : ""}${o ? `&model=${encodeURIComponent(o)}` : ""}`);
    const n = await chrome.windows.create({
      url: a,
      type: "popup",
      width: 500,
      height: 768,
      left: 100,
      top: 100,
      focused: true
    });
    if (!n) {
      throw new Error("Failed to create sidepanel window");
    }
    return n;
  }({
    sessionId: i,
    skipPermissions: n,
    model: s
  });
  await async function (e) {
    const {
      tabId: t,
      prompt: r,
      taskName: o,
      runLogId: a,
      sessionId: n,
      isScheduledTask: s
    } = e;
    return new Promise((e, i) => {
      const c = Date.now();
      let l = false;
      const d = async () => {
        try {
          if (Date.now() - c > 30000) {
            i(new Error("Timeout waiting for tab to load for task execution"));
            return;
          }
          if ((await chrome.tabs.get(t)).status === "complete") {
            setTimeout(() => {
              if (!l) {
                l = true;
                chrome.runtime.sendMessage({
                  type: "EXECUTE_TASK",
                  prompt: r,
                  taskName: o,
                  runLogId: a,
                  windowSessionId: n,
                  isScheduledTask: s
                }, t => {
                  const r = chrome.runtime.lastError?.message;
                  if (r || !t?.success) {
                    i(new Error(`Failed to send prompt: ${r ?? "side panel not ready"}`));
                  } else {
                    e();
                  }
                });
              }
            }, 3000);
          } else {
            setTimeout(d, 500);
          }
        } catch (u) {
          i(u);
        }
      };
      setTimeout(d, 1000);
    });
  }({
    tabId: t,
    prompt: o,
    taskName: a,
    runLogId: c,
    sessionId: i,
    isScheduledTask: false
  });
  return {
    success: true
  };
}
let ja;
async function Ha(e) {
  ja ??= new y(() => false);
  const t = await ja.checkPermission(e, undefined, {
    readonly: true
  });
  return t.permission?.action;
}
async function Ka(e) {
  for (const t of e) {
    if (t.url) {
      try {
        t.storageDecision = await Ha(t.url);
      } catch {}
    }
  }
}
const za = [Pe, _e, ve, pe, De, Ie, $e, {
  name: "tabs_context_mcp",
  description: "Get context information about the current MCP tab group. Returns all tab IDs inside the group if it exists. CRITICAL: You must get the context at least once before using other browser automation tools so you know what tabs exist. Each new conversation should create its own new tab (using tabs_create) rather than reusing existing tabs, unless the user explicitly asks to use an existing tab.",
  parameters: {
    createIfEmpty: {
      type: "boolean",
      description: "Creates a new MCP tab group if none exists, creates a new Window with a new tab group containing an empty tab (which can be used for this conversation). If a MCP tab group already exists, this parameter has no effect."
    }
  },
  execute: async (e, t) => {
    try {
      const {
        createIfEmpty: r,
        includePermissionState: o,
        checkUrls: a
      } = e || {};
      const n = a && a.length > 0 ? await async function (e) {
        const t = [];
        for (const r of e) {
          let e;
          try {
            e = await Ha(r);
          } catch {}
          t.push({
            url: r,
            storageDecision: e
          });
        }
        return t;
      }(a) : undefined;
      await F.initialize();
      if (t?.sessionScope) {
        const e = function () {
          let e = 0;
          for (const t of hn.values()) {
            if (t.tabGroupId !== undefined) {
              e++;
            }
          }
          return e;
        }();
        const a = await F.getOrCreateSessionTabContext(t.tabGroupId, {
          createIfEmpty: r ?? false,
          displayName: t.sessionScope.displayName,
          colorIndex: e
        });
        if (!a) {
          if (n) {
            return {
              output: J([], undefined, undefined, n)
            };
          } else {
            return {
              output: "No tab group exists for this session. Use createIfEmpty: true to create one."
            };
          }
        }
        if (a.tabGroupId !== undefined) {
          (function (e, t) {
            const r = pn(e);
            hn.set(r, {
              tabGroupId: t,
              lastActiveAt: Date.now()
            });
          })(t.sessionScope, a.tabGroupId);
        }
        if (o) {
          await Ka(a.availableTabs);
        }
        return {
          output: J(a.availableTabs, a.tabGroupId, undefined, n),
          tabContext: a
        };
      }
      const s = await F.getOrCreateMcpTabContext({
        createIfEmpty: r
      });
      if (!s) {
        return {
          output: "No MCP tab groups found. Use createIfEmpty: true to create one."
        };
      }
      const i = s.tabGroupId;
      const c = s.availableTabs;
      if (o) {
        await Ka(c);
      }
      return {
        output: J(c, i, undefined, n),
        tabContext: {
          ...s,
          tabGroupId: i
        }
      };
    } catch (r) {
      return {
        error: `Failed to query tabs: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "tabs_context_mcp",
    description: "Get context information about the current MCP tab group. Returns all tab IDs inside the group if it exists. CRITICAL: You must get the context at least once before using other browser automation tools so you know what tabs exist. Each new conversation should create its own new tab (using tabs_create) rather than reusing existing tabs, unless the user explicitly asks to use an existing tab.",
    input_schema: {
      type: "object",
      properties: {
        createIfEmpty: {
          type: "boolean",
          description: "Creates a new MCP tab group if none exists, creates a new Window with a new tab group containing an empty tab (which can be used for this conversation). If a MCP tab group already exists, this parameter has no effect."
        }
      },
      required: []
    }
  })
}, Oe, {
  name: "tabs_create_mcp",
  description: "Creates a new empty tab in the MCP tab group.",
  parameters: {},
  execute: async (e, t) => {
    try {
      let e;
      await F.initialize();
      if (t?.sessionScope) {
        if (t.tabGroupId === undefined) {
          return {
            error: "No tab group exists for this session yet. Call tabs_context_mcp with createIfEmpty: true first — that creates this session's group and returns its tab IDs."
          };
        }
        try {
          await chrome.tabGroups.get(t.tabGroupId);
          e = t.tabGroupId;
        } catch {
          return {
            error: "This session's tab group no longer exists (tabs were closed). Call tabs_context_mcp with createIfEmpty: true to create a new one."
          };
        }
      } else {
        const t = await F.getOrCreateMcpTabContext({
          createIfEmpty: false
        });
        if (!t?.tabGroupId) {
          return {
            error: "No MCP tab group exists. Use tabs_context_mcp with createIfEmpty: true first to create one."
          };
        }
        e = t.tabGroupId;
      }
      const r = await chrome.tabs.create({
        url: "chrome://newtab",
        active: false
      });
      if (!r.id) {
        throw new Error("Failed to create tab - no tab ID returned");
      }
      await chrome.tabs.group({
        tabIds: r.id,
        groupId: e
      });
      const o = (await chrome.tabs.query({
        groupId: e
      })).filter(e => e.id !== undefined).map(e => ({
        id: e.id,
        title: e.title || "",
        url: e.url || ""
      }));
      return {
        output: `Created new tab. Tab ID: ${r.id}`,
        tabContext: {
          currentTabId: r.id,
          executedOnTabId: r.id,
          availableTabs: o,
          tabCount: o.length,
          tabGroupId: e
        }
      };
    } catch (r) {
      return {
        error: `Failed to create tab: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "tabs_create_mcp",
    description: "Creates a new empty tab in the MCP tab group.",
    input_schema: {
      type: "object",
      properties: {},
      required: []
    }
  })
}, {
  name: "tabs_close_mcp",
  description: "Close a tab in the MCP tab group by its tab ID. Only tabs within the current session's group (or the shared MCP group for legacy clients) can be closed. Call tabs_context_mcp first to get valid tab IDs. If the closed tab is the last one in the group, Chrome auto-removes the group.",
  parameters: {
    type: "object",
    properties: {
      tabId: {
        type: "integer",
        description: "The ID of the tab to close. Must be a tab in this session's MCP tab group. Get valid IDs from tabs_context_mcp."
      }
    },
    required: ["tabId"]
  },
  execute: async (e, t) => {
    try {
      const r = function (e) {
        if (typeof e != "object" || e === null) {
          return "Expected an object with tabId";
        }
        const t = e;
        if (typeof t.tabId == "number" && Number.isInteger(t.tabId)) {
          return {
            tabId: t.tabId
          };
        } else {
          return "tabId must be an integer";
        }
      }(e);
      if (typeof r == "string") {
        return {
          error: r
        };
      }
      const {
        tabId: o
      } = r;
      let a;
      let n;
      await F.initialize();
      if (t?.sessionScope) {
        if (t.tabGroupId === undefined) {
          return {
            error: "No tab group exists for this session yet. Nothing to close. Call tabs_context_mcp first if you need a working tab."
          };
        }
        try {
          await chrome.tabGroups.get(t.tabGroupId);
          a = t.tabGroupId;
        } catch {
          return {
            error: "This session's tab group no longer exists. Call tabs_context_mcp first to re-establish context."
          };
        }
      } else {
        const e = await F.getOrCreateMcpTabContext({
          createIfEmpty: false
        });
        a = e?.tabGroupId;
        if (a === undefined) {
          return {
            error: "No MCP tab group exists. Nothing to close. Call tabs_context_mcp with createIfEmpty: true if you need a working tab."
          };
        }
      }
      try {
        n = await chrome.tabs.get(o);
      } catch {
        return {
          error: `Tab ${o} does not exist (may have already been closed). Call tabs_context_mcp to see current tabs.`
        };
      }
      if (n.groupId !== a) {
        return {
          error: `Tab ${o} is not in this session's tab group. Only tabs visible to this session can be closed. Call tabs_context_mcp to see closable tabs.`
        };
      }
      await chrome.tabs.remove(o);
      const s = (await chrome.tabs.query({
        groupId: a
      })).filter(e => e.id !== undefined).map(e => ({
        id: e.id,
        title: e.title || "",
        url: e.url || ""
      }));
      return {
        output: s.length > 0 ? `Closed tab ${o}. ${s.length} tab(s) remain.` : `Closed tab ${o}. Group is now empty (auto-removed).`,
        tabContext: {
          currentTabId: s[0]?.id,
          availableTabs: s,
          tabCount: s.length,
          tabGroupId: s.length > 0 ? a : undefined
        }
      };
    } catch (r) {
      return {
        error: `Failed to close tab: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "tabs_close_mcp",
    description: "Close a tab in the MCP tab group by its tab ID. Use when you're done with a tab to keep the browser tidy. Only tabs in this session's group can be closed.",
    input_schema: {
      type: "object",
      properties: {
        tabId: {
          type: "integer",
          description: "The ID of the tab to close. Must be in this session's tab group — call tabs_context_mcp first to see valid IDs."
        }
      },
      required: ["tabId"]
    }
  })
}, je, He, ye, Re, Ae, Ue, Ee, Ne, we, {
  name: "shortcuts_list",
  description: "List all available shortcuts and workflows (shortcuts and workflows are interchangeable). Returns shortcuts with their commands, descriptions, and whether they are workflows. Use shortcuts_execute to run a shortcut or workflow.",
  parameters: {},
  execute: async () => {
    try {
      const e = (await w.getAllPrompts()).map(e => ({
        id: e.id,
        ...(e.command && {
          command: e.command
        })
      }));
      if (e.length === 0) {
        return {
          output: JSON.stringify({
            message: "No shortcuts found",
            shortcuts: []
          }, null, 2)
        };
      } else {
        return {
          output: JSON.stringify({
            message: `Found ${e.length} shortcut(s)`,
            shortcuts: e
          }, null, 2)
        };
      }
    } catch (e) {
      return {
        error: `Failed to list shortcuts: ${e instanceof Error ? e.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "shortcuts_list",
    description: "List all available shortcuts and workflows (shortcuts and workflows are interchangeable). Returns shortcuts with their commands, descriptions, and whether they are workflows. Use shortcuts_execute to run a shortcut or workflow.",
    input_schema: {
      type: "object",
      properties: {},
      required: []
    }
  })
}, {
  name: "shortcuts_execute",
  description: "Execute a shortcut or workflow by running it in a new sidepanel window using the current tab (shortcuts and workflows are interchangeable). Use shortcuts_list first to see available shortcuts. This starts the execution and returns immediately - it does not wait for completion.",
  parameters: {
    shortcutId: {
      type: "string",
      description: "The ID of the shortcut to execute"
    },
    command: {
      type: "string",
      description: "The command name of the shortcut to execute (e.g., 'debug', 'summarize'). Do not include the leading slash."
    }
  },
  execute: async (e, t) => {
    try {
      const {
        shortcutId: r,
        command: o
      } = e;
      if (!r && !o) {
        return {
          error: "Either shortcutId or command is required. Use shortcuts_list to see available shortcuts."
        };
      }
      const a = t?.tabId;
      if (!a) {
        return {
          error: "No tab context available. Cannot execute shortcut without a target tab."
        };
      }
      let n;
      if (r) {
        n = await w.getPromptById(r);
      } else if (o) {
        const e = o.startsWith("/") ? o.slice(1) : o;
        n = await w.getPromptByCommand(e);
      }
      if (!n) {
        return {
          error: `Shortcut not found. ${r ? `No shortcut with ID "${r}"` : `No shortcut with command "/${o}"`}. Use shortcuts_list to see available shortcuts.`
        };
      }
      await w.recordPromptUsage(n.id);
      const s = n.command || n.id;
      const i = `[[shortcut:${n.id}:${s}]]`;
      const c = await Wa({
        tabId: a,
        tabGroupId: t?.tabGroupId,
        prompt: i,
        taskName: n.command || n.id,
        skipPermissions: n.skipPermissions,
        model: n.model
      });
      if (c.success) {
        return {
          output: JSON.stringify({
            success: true,
            message: `Shortcut "${n.command || n.id}" started. Execution is running in a separate sidepanel window.`,
            shortcut: {
              id: n.id,
              command: n.command
            }
          }, null, 2)
        };
      } else {
        return {
          error: c.error || "Shortcut execution failed"
        };
      }
    } catch (r) {
      return {
        error: `Failed to execute shortcut: ${r instanceof Error ? r.message : "Unknown error"}`
      };
    }
  },
  toAnthropicSchema: async () => ({
    name: "shortcuts_execute",
    description: "Execute a shortcut or workflow by running it in a new sidepanel window using the current tab (shortcuts and workflows are interchangeable). Use shortcuts_list first to see available shortcuts. This starts the execution and returns immediately - it does not wait for completion.",
    input_schema: {
      type: "object",
      properties: {
        shortcutId: {
          type: "string",
          description: "The ID of the shortcut to execute"
        },
        command: {
          type: "string",
          description: "The command name of the shortcut to execute (e.g., 'debug', 'summarize'). Do not include the leading slash."
        }
      },
      required: []
    }
  })
}];
const Xa = ["tabs_context_mcp", "tabs_create_mcp", "tabs_close_mcp"];
class Va {
  constructor(e) {
    this.context = e;
  }
  async handleToolCall(e, t, r, o, a, n, s, i) {
    const c = t.action;
    return await _(`tool_execution_${e}${c ? "_" + c : ""}`, async n => {
      if (!this.context.tabId && !Xa.includes(e)) {
        throw new Error("No tab available");
      }
      n.setAttribute("session_id", this.context.sessionId);
      n.setAttribute("tool_name", e);
      if (o) {
        n.setAttribute("permissions", o);
      }
      if (c) {
        n.setAttribute("action", c);
      }
      if (e === "navigate") {
        const e = t?.url;
        if (typeof e == "string" && !["back", "forward"].includes(e.toLowerCase())) {
          let t;
          try {
            t = new URL(e).hostname;
          } catch {
            try {
              t = new URL(`https://${e}`).hostname;
            } catch {}
          }
          if (t) {
            n.setAttribute("nav_destination_domain", t);
          }
        }
      }
      if (this.context.tabId) {
        const e = t?.tabId ?? this.context.tabId;
        try {
          const t = await chrome.tabs.get(e);
          if (t.url) {
            n.setAttribute("target_domain", new URL(t.url).hostname);
            const e = fa(t.url);
            if (e) {
              n.setAttribute("target_app", e);
            }
          }
          n.setAttribute("target_tab_active", t.active);
          n.setAttribute("target_tab_discarded", t.discarded ?? false);
          n.setAttribute("target_tab_status", t.status ?? "unknown");
          if (t.width && t.height) {
            n.setAttribute("target_viewport_px", t.width * t.height);
          }
        } catch {
          n.setAttribute("target_tab_gone", true);
        }
      }
      const l = {
        toolUseId: r,
        span: n,
        tabId: this.context.tabId,
        tabGroupId: this.context.tabGroupId,
        sessionScope: this.context.sessionScope,
        model: this.context.model,
        sessionId: this.context.sessionId,
        anthropicClient: this.context.anthropicClient,
        permissionManager: i ?? this.context.permissionManager,
        createAnthropicMessage: this.createAnthropicMessage()
      };
      const d = za.find(t => t.name === e);
      if (!d) {
        throw new Error(`Unknown tool: ${e}`);
      }
      const u = {
        name: e,
        sessionId: this.context.sessionId,
        permissions: o,
        quick_mode: false
      };
      if (e === "computer" && c) {
        u.action = c;
      }
      if (a) {
        u.domain = a;
      }
      if (s) {
        const e = fa(s);
        if (e) {
          u.app = e;
        }
      }
      try {
        const r = te(e, t, za);
        let o;
        n.addEvent("tool_execute_begin");
        try {
          o = await d.execute(r, l);
        } finally {
          n.addEvent("tool_execute_end");
        }
        if ("type" in o) {
          u.success = false;
          n.setAttribute("success", false);
          n.setAttribute("failure_reason", "needs_permission");
        } else {
          u.success = !o.error;
          n.setAttribute("success", !o.error);
          if (o.error) {
            n.setAttribute("result_error", typeof o.error == "string" ? o.error : JSON.stringify(o.error));
          }
        }
        if (!("type" in o) && !o.error && !!l.tabId) {
          await async function (e, t, r) {
            try {
              if (!["computer", "navigate"].includes(e)) {
                return;
              }
              const a = await chrome.tabs.get(r);
              if (!a) {
                return;
              }
              const n = a.groupId ?? -1;
              if (!xe.isRecording(n)) {
                return;
              }
              let s;
              let i;
              if (e === "computer" && t.action) {
                const e = t.action;
                if (e === "screenshot") {
                  return;
                }
                s = {
                  type: e,
                  coordinate: t.coordinate,
                  start_coordinate: t.start_coordinate,
                  text: t.text,
                  timestamp: Date.now()
                };
                if (e.includes("click")) {
                  s.description = "Clicked";
                } else if (e === "type" && t.text) {
                  s.description = `Typed: "${t.text}"`;
                } else if (e === "key" && t.text) {
                  s.description = `Pressed key: ${t.text}`;
                } else {
                  s.description = e === "scroll" ? "Scrolled" : e === "left_click_drag" ? "Dragged" : e;
                }
              } else if (e === "navigate" && t.url) {
                s = {
                  type: "navigate",
                  timestamp: Date.now(),
                  description: `Navigated to ${t.url}`
                };
              }
              if (s && (s.type.includes("click") || s.type === "left_click_drag")) {
                const e = xe.getFrames(n);
                if (e.length > 0) {
                  const t = e[e.length - 1];
                  const r = {
                    base64: t.base64,
                    action: s,
                    frameNumber: e.length,
                    timestamp: Date.now(),
                    viewportWidth: t.viewportWidth,
                    viewportHeight: t.viewportHeight,
                    devicePixelRatio: t.devicePixelRatio
                  };
                  xe.addFrame(n, r);
                }
              }
              await new Promise(e => setTimeout(e, 100));
              try {
                i = await K.screenshot(r);
              } catch (o) {
                return;
              }
              let c = 1;
              try {
                const e = await x({
                  target: {
                    tabId: r
                  },
                  injectImmediately: true,
                  func: () => window.devicePixelRatio
                });
                if (e && e[0]?.result) {
                  c = e[0].result;
                }
              } catch (o) {}
              const l = xe.getFrames(n).length;
              const d = {
                base64: i.base64,
                action: s,
                frameNumber: l,
                timestamp: Date.now(),
                viewportWidth: i.viewportWidth || i.width,
                viewportHeight: i.viewportHeight || i.height,
                devicePixelRatio: c
              };
              xe.addFrame(n, d);
            } catch (o) {}
          }(e, r, l.tabId);
        }
        this.context.analytics?.track("claude_chrome.chat.tool_called", u);
        return o;
      } catch (h) {
        n.setAttribute("success", false);
        n.setAttribute("result_error", h instanceof Error ? h.message : String(h));
        this.context.analytics?.track("claude_chrome.chat.tool_called", {
          ...u,
          success: false,
          failureReason: "exception"
        });
        throw h;
      }
    }, n);
  }
  createAnthropicMessage() {
    if (this.context.anthropicClient || this.context.refreshClient) {
      return async e => {
        if (this.context.refreshClient) {
          const e = await this.context.refreshClient();
          if (e) {
            this.context.anthropicClient = e;
          }
        }
        if (!this.context.anthropicClient) {
          throw new Error("Anthropic client not available");
        }
        const {
          modelClass: t,
          maxTokens: r,
          ...o
        } = e;
        const {
          customProviderConfig: n
        } = await chrome.storage.local.get("customProviderConfig");
        const s = n?.enabled && n?.defaultModel ? n.defaultModel : undefined;
        let a = s || this.context.model;
        if (t === "small_fast") {
          const e = await v("chrome_ext_models");
          a = s || e?.small_fast_model || "claude-haiku-4-5-20251001";
        }
        return await this.context.anthropicClient.beta.messages.create({
          ...o,
          max_tokens: r,
          model: a,
          betas: ["oauth-2025-04-20"]
        });
      };
    }
  }
  async processToolResults(e, t) {
    const r = [];
    const o = e => {
      if (e.error) {
        return e.error;
      }
      const t = [];
      if (e.output) {
        t.push({
          type: "text",
          text: e.output
        });
      }
      if (e.tabContext) {
        const r = `\n\nTab Context:${e.tabContext.executedOnTabId ? `\n- Executed on tabId: ${e.tabContext.executedOnTabId}` : ""}\n- Available tabs:\n${e.tabContext.availableTabs.map(e => `  • tabId ${e.id}: "${e.title}" (${e.url})`).join("\n")}`;
        t.push({
          type: "text",
          text: r
        });
      }
      if (e.base64Image) {
        const r = e.imageFormat ? `image/${e.imageFormat}` : "image/png";
        t.push({
          type: "image",
          source: {
            type: "base64",
            media_type: r,
            data: e.base64Image
          }
        });
      }
      if (t.length > 0) {
        return t;
      } else {
        return "";
      }
    };
    const a = (e, t) => {
      const r = !!t.error;
      return {
        type: "tool_result",
        tool_use_id: e,
        content: o(t),
        ...(r && {
          is_error: true
        })
      };
    };
    for (const s of e) {
      let e = Date.now();
      let o = "first_execute_ms";
      const i = r => {
        t?.onStageTiming?.(r, Date.now() - e);
        o = undefined;
      };
      try {
        const n = await this.handleToolCall(s.name, s.input, s.id, undefined, undefined, undefined, undefined, t?.permissionManager);
        i("first_execute_ms");
        if ("type" in n && n.type === "permission_required") {
          const c = t?.onPermissionRequired ?? this.context.onPermissionRequired;
          if (!c || !this.context.tabId) {
            r.push(a(s.id, {
              error: "Permission required but no handler or tab id available"
            }));
            continue;
          }
          e = Date.now();
          o = "permission_wait_ms";
          const l = await c(n, this.context.tabId);
          i("permission_wait_ms");
          if (!l) {
            r.push(a(s.id, {
              error: s.name === "update_plan" ? "Plan rejected by user. Ask the user how they would like to change the plan." : "Permission denied by user"
            }));
            continue;
          }
          if (s.name === "update_plan") {
            r.push(a(s.id, {
              output: "User has approved your plan. You can now start executing the plan. Start with updating your todo list if applicable."
            }));
            continue;
          }
          const d = n;
          if (d.url) {
            try {
              const {
                host: e
              } = new URL(d.url);
              const r = t?.permissionManager ?? this.context.permissionManager;
              await r.grantPermission({
                type: "netloc",
                netloc: e
              }, I.ONCE, d.toolUseId);
            } catch {}
          }
          e = Date.now();
          o = "retry_execute_ms";
          const u = await this.handleToolCall(s.name, s.input, s.id, undefined, undefined, undefined, undefined, t?.permissionManager);
          i("retry_execute_ms");
          if ("type" in u && u.type === "permission_required") {
            throw new Error("Permission still required after granting");
          }
          r.push(a(s.id, u));
        } else {
          r.push(a(s.id, n));
        }
      } catch (n) {
        if (o) {
          t?.onStageTiming?.(o, Date.now() - e);
        }
        r.push(a(s.id, {
          error: n instanceof Error ? n.message : "Unknown error"
        }));
      }
    }
    return r;
  }
}
async function Ya(e, t) {
  const r = t === e;
  await F.initialize();
  const o = await F.findGroupByTab(t);
  return {
    isMainTab: r,
    isSecondaryTab: !!o && o.mainTabId === e && t !== e,
    group: o
  };
}
function Ja(e) {
  return e === "category1" || e === "category2" || e === "category_org_blocked";
}
function Qa(e) {
  try {
    return new URL(e).hostname;
  } catch {
    return null;
  }
}
function Za(e, t) {
  if (!e || (r = e).startsWith("chrome://") || r.startsWith("chrome-extension://") || r.startsWith("about:") || r === "") {
    return null;
  }
  var r;
  const o = Qa(e);
  const a = Qa(t);
  if (o && a && o !== a && o !== "newtab") {
    return {
      oldDomain: o,
      newDomain: a
    };
  } else {
    return null;
  }
}
async function en(e, t) {
  const r = await O.getCategory(t);
  await F.updateTabBlocklistStatus(e, t);
  return r ?? null;
}
function tn(e) {
  return chrome.runtime.getURL(`blocked.html?url=${encodeURIComponent(e)}`);
}
function rn(e, t, r, o, a) {
  return {
    type: "permission_required",
    tool: c.DOMAIN_TRANSITION,
    url: r,
    toolUseId: crypto.randomUUID(),
    actionData: {
      fromDomain: e,
      toDomain: t,
      sourceTabId: o,
      isSecondaryTab: a
    }
  };
}
let on;
let an;
let nn;
let providerBaseCache;
let sn;
let cn;
let ln;
const dn = 60000;
const un = "__legacy_shared__";
const hn = new Map();
function pn(e) {
  return e?.sessionId ?? un;
}
async function mn() {
  const [e, t, {
    customProviderConfig: o
  }] = await Promise.all([g(r.SELECTED_MODEL), v("chrome_ext_models"), chrome.storage.local.get("customProviderConfig")]);
  const a = o?.enabled && o?.defaultModel ? o.defaultModel : undefined;
  return a || e || t?.default || "claude-3-5-sonnet-20241022";
}
async function fn(e, t, r) {
  const o = function (e, t) {
    const r = pn(e);
    if (e?.tabGroupId !== undefined) {
      hn.set(r, {
        tabGroupId: e.tabGroupId,
        lastActiveAt: Date.now()
      });
      return e.tabGroupId;
    }
    const o = hn.get(r);
    if (o?.tabGroupId !== undefined) {
      o.lastActiveAt = Date.now();
      return o.tabGroupId;
    } else {
      hn.set(r, {
        tabGroupId: t,
        lastActiveAt: Date.now()
      });
      return t;
    }
  }(r, t);
  if (sn) {
    sn.context.tabId = e;
    sn.context.tabGroupId = o;
    sn.context.sessionScope = r;
    return sn;
  }
  const [a, n] = await Promise.all([gn(), mn()]);
  sn = new Va({
    anthropicClient: a,
    permissionManager: new y(() => false, {}),
    sessionId: Se,
    tabId: e,
    tabGroupId: o,
    sessionScope: r,
    model: n,
    onPermissionRequired: async (e, t) => await Sn(e, t),
    refreshClient: gn
  });
  return sn;
}
async function gn() {
  const [e, {
    anthropicApiKey: t
  }, {
    customProviderConfig: r
  }] = await Promise.all([u(), chrome.storage.local.get("anthropicApiKey"), chrome.storage.local.get("customProviderConfig")]);
  const o = !!r?.enabled && !!r?.baseUrl;
  const a = o ? r.apiKey || undefined : t || undefined;
  const i = o ? r.baseUrl : undefined;
  if (an !== e || nn !== a || providerBaseCache !== i) {
    on = undefined;
    an = e;
    nn = a;
    providerBaseCache = i;
  }
  if (on) {
    return on;
  }
  if (o && !a) {
    return;
  }
  if (!o && !e && !a) {
    return;
  }
  const s = p();
  const c = i || s.apiBaseUrl;
  on = new ua({
    baseURL: c,
    dangerouslyAllowBrowser: true,
    ...(o ? {
      apiKey: a
    } : e ? {
      authToken: e
    } : {
      apiKey: a
    })
  });
  return on;
}
const bn = e => ({
  content: [{
    type: "text",
    text: e
  }],
  is_error: true
});
async function wn(e) {
  const t = crypto.randomUUID();
  const r = e.clientId;
  const o = Date.now();
  const n = {};
  let s = Date.now();
  const i = e => {
    const t = Date.now();
    n[e] = t - s;
    s = t;
  };
  const c = await mn();
  if (cn && ln) {
    if (Date.now() - ln < dn) {
      const t = cn;
      cn = undefined;
      ln = undefined;
      m("claude_chrome.mcp.tool_called", {
        tool_name: e.toolName,
        client_id: r,
        model: c,
        success: false,
        error_type: "navigation_blocked",
        duration_ms: Date.now() - o,
        tool_use_id: e.toolUseId,
        session_id: e.sessionScope?.sessionId
      });
      return bn(t);
    }
    cn = undefined;
    ln = undefined;
  }
  let l;
  let d;
  let u;
  let h;
  s = Date.now();
  try {
    const t = await F.getTabForMcp(e.tabId, e.tabGroupId, e.sessionScope !== undefined);
    l = t.tabId;
    d = t.domain;
    u = t.url;
    i("tab_orchestration_ms");
  } catch {
    i("tab_orchestration_ms");
    m("claude_chrome.mcp.tool_called", {
      tool_name: e.toolName,
      client_id: r,
      model: c,
      success: false,
      error_type: "no_tabs_available",
      duration_ms: Date.now() - o,
      tool_use_id: e.toolUseId,
      session_id: e.sessionScope?.sessionId,
      ...n
    });
    return bn("No tabs available. Please open a new tab or window in Chrome.");
  }
  if (u) {
    const t = await O.getCategory(u);
    i("blocklist_ms");
    if (Ja(t)) {
      m("claude_chrome.mcp.tool_called", {
        tool_name: e.toolName,
        client_id: r,
        model: c,
        success: false,
        error_type: "domain_blocked",
        duration_ms: Date.now() - o,
        tool_use_id: e.toolUseId,
        session_id: e.sessionScope?.sessionId,
        ...n,
        ...(d && {
          domain: d
        })
      });
      return bn(t === "category_org_blocked" ? "This site is blocked by your organization's policy." : "This site is blocked.");
    }
  }
  if (l !== undefined && a()) {
    s = Date.now();
    try {
      const e = await chrome.tabs.get(l);
      const t = e.frozen;
      if (e.discarded || t) {
        await chrome.tabs.update(l, {
          active: true
        });
      }
    } catch (_) {}
    i("tab_foreground_ms");
  }
  if (l !== undefined) {
    s = Date.now();
    try {
      if (!(await K.isDebuggerAttached(l))) {
        await K.attachDebugger(l);
        await new Promise(e => setTimeout(e, 500));
      }
      i("debugger_attach_ms");
    } catch (v) {
      i("debugger_attach_ms");
      n.debugger_attach_error = v instanceof Error ? v.message : String(v);
    }
  }
  let p;
  let f = false;
  let g = false;
  try {
    if (l !== undefined) {
      await async function (e, t, r, o) {
        yn.set(e, {
          toolName: t,
          requestId: r,
          startTime: Date.now(),
          errorCallback: o
        });
        await F.addTabToIndicatorGroup({
          tabId: e,
          isRunning: true,
          isMcp: true
        });
        if (_n.has(e)) {
          const t = _n.get(e);
          if (t) {
            clearTimeout(t);
          }
          F.addLoadingPrefix(e).catch(() => {});
          _n.set(e, null);
        } else {
          F.addLoadingPrefix(e).catch(() => {});
          _n.set(e, null);
        }
      }(l, e.toolName, t, e => {
        cn = e;
        ln = Date.now();
      });
    }
    const r = await fn(l, e.tabGroupId, e.sessionScope);
    const o = {
      onStageTiming: (e, t) => {
        n[e] = t;
      }
    };
    if (e.source === "bridge") {
      const t = function (e, t) {
        if (!e || e === "ask") {
          return;
        }
        const r = e === "skip_all_permission_checks";
        const o = new y(() => r, {});
        if (e === "follow_a_plan" && t?.length) {
          o.setTurnApprovedDomains(t);
        }
        return o;
      }(e.permissionMode, e.allowedDomains);
      if (t) {
        o.permissionManager = t;
      }
      if (e.handlePermissionPrompts && e.toolUseId) {
        o.onPermissionRequired = async t => function (e, t) {
          const r = crypto.randomUUID();
          return new Promise(o => {
            Ca.set(r, {
              resolve: o
            });
            La({
              type: "permission_request",
              tool_use_id: e,
              request_id: r,
              tool_type: t.tool,
              url: t.url,
              action_data: t.actionData
            });
          });
        }(e.toolUseId, t);
      }
    }
    s = Date.now();
    g = true;
    [h] = await r.processToolResults([{
      type: "tool_use",
      id: t,
      name: e.toolName,
      input: e.args
    }], o);
    i("tool_execute_ms");
    f = h?.is_error === true;
  } catch (v) {
    if (g) {
      i("tool_execute_ms");
    }
    f = true;
    if (v instanceof Error && (v.message.includes("401") || v.message.includes("authentication") || v.message.includes("invalid x-api-key"))) {
      on = undefined;
      an = undefined;
      nn = undefined;
      p = "authentication_failed";
      h = bn("Authentication failed. Please check your custom provider or API key settings.");
    } else {
      p = "execution_error";
      h = bn(v instanceof Error ? v.message : String(v));
    }
  }
  if (l !== undefined) {
    In(l, r);
  }
  const b = u ? fa(u) : undefined;
  const w = l !== undefined && K.isScreencastActive(l);
  m("claude_chrome.mcp.tool_called", {
    tool_name: e.toolName,
    client_id: r,
    model: c,
    success: !f,
    tab_id: l,
    tab_group_id: e.tabGroupId,
    duration_ms: Date.now() - o,
    tool_use_id: e.toolUseId,
    session_id: e.sessionScope?.sessionId,
    screencast_active: w,
    ...n,
    ...(d && {
      domain: d
    }),
    ...(b && {
      app: b
    }),
    ...(p && {
      error_type: p
    })
  });
  return h;
}
const yn = new Map();
const _n = new Map();
const vn = 20000;
function In(e, t) {
  if (yn.has(e)) {
    yn.get(e);
    yn.delete(e);
    const t = setTimeout(async () => {
      if (!yn.has(e) && _n.has(e)) {
        F.addCompletionPrefix(e).catch(() => {});
        _n.set(e, null);
        try {
          await K.detachDebugger(e);
        } catch (t) {}
      }
    }, vn);
    _n.set(e, t);
  }
}
function kn(e) {
  const t = _n.get(e);
  if (t) {
    clearTimeout(t);
  }
  _n.delete(e);
  F.removePrefix(e).catch(() => {});
}
async function Tn() {
  try {
    const e = await F.getAllGroups();
    for (const t of e) {
      kn(t.mainTabId);
    }
  } catch (e) {}
}
let xn = Promise.resolve(true);
async function Sn(e, t) {
  const r = xn.then(() => async function (e, t) {
    const r = crypto.randomUUID();
    const o = Date.now();
    const a = _n.get(t);
    if (a) {
      clearTimeout(a);
    }
    await F.addPermissionPrefix(t);
    _n.set(t, null);
    await chrome.storage.local.set({
      [`mcp_prompt_${r}`]: {
        prompt: e,
        tabId: t,
        timestamp: Date.now()
      }
    });
    m("claude_chrome.permission.prompted", {
      permission_type: e.type,
      tool_type: e.tool,
      tab_id: t
    });
    return new Promise(a => {
      let n;
      let s = false;
      const i = async (i = false) => {
        if (!s) {
          s = true;
          chrome.runtime.onMessage.removeListener(c);
          m("claude_chrome.permission.responded", {
            permission_type: e.type,
            tool_type: e.tool,
            tab_id: t,
            allowed: i,
            response_time_ms: Date.now() - o
          });
          await chrome.storage.local.remove(`mcp_prompt_${r}`);
          if (n) {
            chrome.windows.remove(n).catch(() => {});
          }
          await F.addLoadingPrefix(t);
          _n.set(t, null);
          a(i);
        }
      };
      const c = e => {
        if (e.type === "MCP_PERMISSION_RESPONSE" && e.requestId === r) {
          i(e.allowed);
        }
      };
      chrome.runtime.onMessage.addListener(c);
      chrome.windows.create({
        url: chrome.runtime.getURL(`sidepanel.html?tabId=${t}&mcpPermissionOnly=true&requestId=${r}`),
        type: "popup",
        width: 600,
        height: 600,
        focused: true
      }, e => {
        if (e) {
          n = e.id;
        } else {
          i(false);
        }
      });
      setTimeout(() => {
        i(false);
      }, 30000);
    });
  }(e, t));
  xn = r.catch(() => false);
  return r;
}
let En = false;
function Cn() {
  if ("ServiceWorkerGlobalScope" in globalThis) {
    if (!En) {
      En = true;
      chrome.webNavigation.onCommitted.addListener(async e => {
        if (e.frameId !== 0 || (t = e.tabId, !yn.has(t))) {
          return;
        }
        var t;
        const r = yn.get(e.tabId);
        if (!r) {
          return;
        }
        const {
          isMainTab: o,
          isSecondaryTab: a
        } = await Ya(e.tabId, e.tabId);
        if (!o && !a) {
          return;
        }
        (await fn(e.tabId)).context.permissionManager;
        try {
          const t = await en(e.tabId, e.url);
          if (t === "category1" || t === "category2" || t === "category_org_blocked") {
            if (t === "category1") {
              const t = tn(e.url);
              await chrome.tabs.update(e.tabId, {
                url: t
              });
            }
            if (r?.errorCallback) {
              r.errorCallback("Cannot access this page. Claw cannot assist with the content on this page.");
            }
            In(e.tabId);
            return;
          }
          await chrome.tabs.get(e.tabId);
          return undefined;
        } catch (n) {}
      });
    }
  }
}
export { Ua as $, Ze as A, we as B, ua as C, pa as D, Q as E, Fe as F, qe as G, ee as H, fa as I, te as J, K, J as L, Be as M, R as N, Ya as O, en as P, Ja as Q, tn as R, Za as S, rn as T, ce as U, le as V, O as W, oe as X, Tn as Y, bn as Z, wn as _, ve as a, Pa as a0, Fa as a1, Cn as a2, Te as a3, $a as a4, Oa as a5, ie as b, Y as c, se as d, x as e, _e as f, N as g, pe as h, De as i, Ie as j, je as k, Oe as l, $e as m, Le as n, He as o, re as p, ye as q, Pe as r, Z as s, F as t, Ke as u, Re as v, Ae as w, Ue as x, Ee as y, Ne as z };

