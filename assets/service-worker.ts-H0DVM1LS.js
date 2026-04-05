import { Y as e, t, Z as s, _ as a, $ as n, a0 as o, a1 as i, a2 as r, a3 as c, a4 as d, a5 as u } from "./mcpPermissions-qqAoJjJ8.js";
import { r as m, s as l, S as p, x as h, j as w, n as y, y as f, p as g, z as _, A as T, B as b, c as I, C as v, E } from "./PermissionManager-9s959502.js";
import "./index-BVS4T5_D.js";
let A = null;
let N = null;
let P = false;
let k = false;
let S = false;
let C = null;
let M = null;
function L(e) {
  if (e?.includes("native messaging host not found")) {
    k = false;
  }
}
async function R() {
  try {
    return await async function () {
      if (A) {
        return true;
      }
      if (P) {
        return false;
      }
      P = true;
      try {
        if (!(await chrome.permissions.contains({
          permissions: ["nativeMessaging"]
        }))) {
          return false;
        }
        if (typeof chrome.runtime.connectNative != "function") {
          return false;
        }
        const s = [{
          name: "com.anthropic.claude_browser_extension",
          label: "Desktop"
        }, {
          name: "com.anthropic.claude_code_browser_extension",
          label: "Claude Code"
        }];
        for (const a of s) {
          try {
            const t = chrome.runtime.connectNative(a.name);
            if (await new Promise(e => {
              let s = false;
              const a = () => {
                if (!s) {
                  s = true;
                  chrome.runtime.lastError;
                  e(false);
                }
              };
              const n = o => {
                if (!s) {
                  if (o.type === "pong") {
                    s = true;
                    t.onDisconnect.removeListener(a);
                    t.onMessage.removeListener(n);
                    e(true);
                  }
                }
              };
              t.onDisconnect.addListener(a);
              t.onMessage.addListener(n);
              try {
                t.postMessage({
                  type: "ping"
                });
              } catch (o) {
                if (!s) {
                  s = true;
                  e(false);
                }
                return;
              }
              setTimeout(() => {
                if (!s) {
                  s = true;
                  t.onDisconnect.removeListener(a);
                  t.onMessage.removeListener(n);
                  e(false);
                }
              }, 10000);
            })) {
              A = t;
              N = a.name;
              k = true;
              A.onMessage.addListener(async e => {
                await O(e);
              });
              A.onDisconnect.addListener(() => {
                const t = chrome.runtime.lastError?.message;
                A = null;
                N = null;
                S = false;
                l(p.MCP_CONNECTED, false);
                L(t);
                e();
              });
              A.postMessage({
                type: "get_status"
              });
              return true;
            }
            t.disconnect();
          } catch (t) {}
        }
        return false;
      } catch (t) {
        if (t instanceof Error) {
          L(t.message);
        }
        return false;
      } finally {
        P = false;
      }
    }();
  } catch (t) {
    return false;
  }
}
async function U() {
  try {
    await chrome.permissions.remove({
      permissions: ["nativeMessaging"]
    });
    A?.disconnect();
    A = null;
    N = null;
    P = false;
    k = false;
    S = false;
    return true;
  } catch (e) {
    return false;
  }
}
async function O(e) {
  switch (e.type) {
    case "tool_request":
      await async function (e) {
        try {
          const {
            method: t,
            params: n
          } = e;
          if (t === "execute_tool") {
            if (!n?.tool) {
              D(s("No tool specified"));
              return;
            }
            const e = n.client_id;
            const t = n.args?.tabGroupId;
            const o = typeof t == "number" ? t : typeof t == "string" && parseInt(t, 10) || undefined;
            const i = n.args?.tabId;
            const r = typeof i == "number" ? i : typeof i == "string" && parseInt(i, 10) || undefined;
            const c = n.session_scope;
            D(await a({
              toolName: n.tool,
              args: n.args || {},
              tabId: r,
              tabGroupId: o,
              clientId: e,
              source: "native-messaging",
              sessionScope: c
            }), e);
          } else {
            D({
              content: `Unknown method: ${t}`
            });
          }
        } catch (t) {
          D(s(`Tool execution failed: ${t instanceof Error ? t.message : "Unknown error"}`));
        }
      }(e);
      break;
    case "status_response":
      if (C) {
        clearTimeout(M);
        M = null;
        C({
          nativeHostInstalled: k,
          mcpConnected: S
        });
        C = null;
      }
      break;
    case "mcp_connected":
      (async function () {
        S = true;
        l(p.MCP_CONNECTED, true);
        await t.initialize();
        t.startTabGroupChangeListener();
      })();
      break;
    case "mcp_disconnected":
      S = false;
      l(p.MCP_CONNECTED, false);
      t.stopTabGroupChangeListener();
  }
}
function D({
  content: e,
  is_error: t
}, s) {
  if (!A) {
    return;
  }
  if (!e || typeof e != "string" && !Array.isArray(e)) {
    return;
  }
  let a;
  a = t ? function (e) {
    let t;
    const s = "IMPORTANT: The user has explicitly declined this action. Do not attempt to use other tools or workarounds. Instead, acknowledge the denial and ask the user how they would prefer to proceed.";
    t = typeof e == "string" ? e.includes("Permission denied by user") ? `${e} - ${s}` : e : e.map(t => typeof t == "object" && t !== null && "text" in t && typeof t.text == "string" && t.text.includes("Permission denied by user") ? {
      ...t,
      text: `${e} - ${s}`
    } : t);
    return {
      type: "tool_response",
      error: {
        content: t
      }
    };
  }(e) : {
    type: "tool_response",
    result: {
      content: e
    }
  };
  A.postMessage(a);
}
const x = "/chrome/";
async function $(e, s) {
  try {
    const a = new URL(e);
    if (a.host !== "clau.de") {
      return false;
    }
    if (a.pathname.toLowerCase() === "/chrome/permissions") {
      await async function (e) {
        try {
          const e = chrome.runtime.getURL("options.html#permissions");
          await chrome.tabs.create({
            url: e
          });
        } catch (t) {} finally {
          await G(e);
        }
      }(s);
      return true;
    }
    if (!a.pathname.startsWith(x)) {
      return false;
    }
    const i = a.pathname.substring(8).toLowerCase();
    if (i === "reconnect") {
      await async function (e) {
        try {
          await U();
          n();
          await new Promise(e => setTimeout(e, 500));
          const [e, t] = await Promise.all([R(), o()]);
          h("claude_chrome.extension_url.reconnect", {
            native_host_success: e,
            bridge_initiated: t
          });
        } catch (t) {
          h("claude_chrome.extension_url.reconnect", {
            success: false
          });
        } finally {
          await G(e);
        }
      }(s);
      return true;
    }
    if (i.startsWith("tab/")) {
      const e = parseInt(i.substring(4), 10);
      await async function (e, s) {
        if (isNaN(e)) {
          h("claude_chrome.extension_url.tab_switch", {
            success: false,
            error: "invalid_tab_id"
          });
          await G(s);
          return true;
        }
        try {
          await t.initialize();
          const a = await t.findGroupByTab(e);
          if (!a || a.isUnmanaged) {
            h("claude_chrome.extension_url.tab_switch", {
              success: false,
              error: "tab_not_managed"
            });
            await G(s);
            return true;
          }
          const n = await chrome.tabs.get(e);
          if (n.windowId !== undefined) {
            await chrome.windows.update(n.windowId, {
              focused: true
            });
          }
          await chrome.tabs.update(e, {
            active: true
          });
          h("claude_chrome.extension_url.tab_switch", {
            success: true
          });
          await G(s);
          return true;
        } catch (a) {
          h("claude_chrome.extension_url.tab_switch", {
            success: false
          });
          await G(s);
          return true;
        }
      }(e, s);
      return true;
    }
    return false;
  } catch {
    h("claude_chrome.extension_url.unknown_exception", {});
    return false;
  }
}
async function G(e) {
  try {
    await chrome.tabs.remove(e);
  } catch (t) {}
}
async function B() {
  const e = w();
  const t = `${`claude-browser-extension/${chrome.runtime.getManifest().version} (external)`} ${navigator.userAgent} `;
  const s = [{
    id: 1,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [{
        header: "User-Agent",
        operation: chrome.declarativeNetRequest.HeaderOperation.SET,
        value: t
      }]
    },
    condition: {
      urlFilter: `${e.apiBaseUrl}/*`,
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST, chrome.declarativeNetRequest.ResourceType.OTHER]
    }
  }];
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [1],
    addRules: s
  });
}
async function F() {
  try {
    const t = (await I.getAllPrompts()).filter(e => e.repeatType && e.repeatType !== "none");
    if (t.length === 0) {
      return;
    }
    let s = 0;
    let a = 0;
    for (const n of t) {
      try {
        await I.updateAlarmForPrompt(n);
        s++;
      } catch (e) {
        a++;
      }
    }
    try {
      await I.updateNextRunTimes();
    } catch (e) {}
  } catch (e) {}
}
y();
i();
r();
o();
c().catch(e => {});
R();
const H = new Map();
chrome.runtime.onInstalled.addListener(async e => {
  chrome.storage.local.remove(["updateAvailable"]);
  chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdLa1wTVkB2ml2abPI1FP9KiboOnp2N0c3aDmp5rWmaOybWwQ/viewform");
  f();
  await t.initialize();
  await B();
  R();
  await F();
});
chrome.runtime.onStartup.addListener(async () => {
  f();
  await B();
  await t.initialize();
  o();
  R();
  await F();
});
chrome.permissions.onAdded.addListener(e => {
  if (e.permissions?.includes("nativeMessaging")) {
    R();
  }
});
chrome.permissions.onRemoved.addListener(e => {
  if (e.permissions?.includes("nativeMessaging")) {
    U();
  }
});
chrome.action.onClicked.addListener(K);
chrome.notifications.onClicked.addListener(async e => {
  chrome.notifications.clear(e);
  const t = e.split("_");
  let s = null;
  if (t.length >= 2 && t[1] !== "unknown") {
    s = parseInt(t[1], 10);
  }
  if (s && !isNaN(s)) {
    try {
      const e = await chrome.tabs.get(s);
      if (e && e.windowId) {
        await chrome.windows.update(e.windowId, {
          focused: true
        });
        await chrome.tabs.update(s, {
          active: true
        });
        return;
      }
    } catch {}
  }
  const [a] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  if (a?.id && a.windowId) {
    await chrome.windows.update(a.windowId, {
      focused: true
    });
  }
});
chrome.commands.onCommand.addListener(e => {
  if (e === "toggle-side-panel") {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, e => {
      const t = e[0];
      if (t) {
        K(t);
      }
    });
  }
});
let q = false;
async function W(e) {
  if (!chrome.sidePanel) {
    h("claude_chrome.sidepanel.unsupported_browser", {
      user_agent: navigator.userAgent
    });
    if (!q) {
      q = true;
      chrome.notifications.create({
        type: "basic",
        iconUrl: "/icon-128.png",
        title: "Browser not supported",
        message: "Claw requires the Chrome Side Panel API, which isn't available in this browser. Use Google Chrome, Microsoft Edge, or Brave."
      });
    }
    return;
  }
  chrome.sidePanel.setOptions({
    tabId: e,
    path: `sidepanel.html?tabId=${encodeURIComponent(e)}`,
    enabled: true
  });
  chrome.sidePanel.open({
    tabId: e
  });
  await t.initialize(true);
  const s = await t.findGroupByTab(e);
  if (s) {
    if (s.isUnmanaged) {
      try {
        await t.adoptOrphanedGroup(e, s.chromeGroupId);
      } catch (a) {}
      return;
    }
  } else {
    try {
      await t.createGroup(e);
    } catch (a) {}
    R();
  }
}
async function K(e) {
  const t = e.id;
  if (t) {
    await W(t);
  }
}
async function z(e, s) {
  const a = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  const n = await chrome.windows.create({
    url: e.url || "about:blank",
    type: "normal",
    focused: true
  });
  if (!n || !n.id || !n.tabs || n.tabs.length === 0) {
    throw new Error("Failed to create window for scheduled task");
  }
  const o = n.tabs[0];
  if (!o.id) {
    throw new Error("Failed to get tab in new window for scheduled task");
  }
  await t.initialize(true);
  await t.createGroup(o.id);
  await l(p.TARGET_TAB_ID, o.id);
  await async function (e) {
    const {
      sessionId: t,
      skipPermissions: s,
      model: a
    } = e;
    const n = chrome.runtime.getURL(`sidepanel.html?mode=window&sessionId=${t}${s ? "&skipPermissions=true" : ""}${a ? `&model=${encodeURIComponent(a)}` : ""}`);
    const o = await chrome.windows.create({
      url: n,
      type: "popup",
      width: 500,
      height: 768,
      left: 100,
      top: 100,
      focused: true
    });
    if (!o) {
      throw new Error("Failed to create sidepanel window");
    }
    return o;
  }({
    sessionId: a,
    skipPermissions: e.skipPermissions,
    model: e.model
  });
  await async function (e) {
    const {
      tabId: t,
      prompt: s,
      taskName: a,
      runLogId: n,
      sessionId: o,
      isScheduledTask: i
    } = e;
    return new Promise((e, r) => {
      const c = 30000;
      const d = Date.now();
      let u = false;
      const m = async () => {
        try {
          if (Date.now() - d > c) {
            r(new Error("Timeout waiting for tab to load for task execution"));
            return;
          }
          if ((await chrome.tabs.get(t)).status === "complete") {
            setTimeout(() => {
              if (!u) {
                u = true;
                chrome.runtime.sendMessage({
                  type: "EXECUTE_TASK",
                  prompt: s,
                  taskName: a,
                  runLogId: n,
                  windowSessionId: o,
                  isScheduledTask: i
                }, t => {
                  const s = chrome.runtime.lastError?.message;
                  if (s || !t?.success) {
                    r(new Error(`Failed to send prompt: ${s ?? "side panel not ready"}`));
                  } else {
                    e();
                  }
                });
              }
            }, 3000);
          } else {
            setTimeout(m, 500);
          }
        } catch (l) {
          r(l);
        }
      };
      setTimeout(m, 1000);
    });
  }({
    tabId: o.id,
    prompt: e.prompt,
    taskName: e.name,
    runLogId: s,
    sessionId: a,
    isScheduledTask: true
  });
}
chrome.runtime.onUpdateAvailable.addListener(e => {
  l(p.UPDATE_AVAILABLE, true);
  h("claude_chrome.extension.update_available", {
    current_version: chrome.runtime.getManifest().version,
    new_version: e.version
  });
});
// 后台消息桥，负责 sidepanel 打开、权限通知、OAuth 刷新和 MCP 回包。
chrome.runtime.onMessage.addListener((e, s, a) => {
  let __cpResponseSent = false;
  const __cpSendResponse = a;
  a = e => {
    if (__cpResponseSent) {
      return;
    }
    __cpResponseSent = true;
    try {
      __cpSendResponse(e);
    } catch {}
  };
  (async () => {
    if (e.type !== "SW_KEEPALIVE") {
      if (e.type === "PANEL_OPENED" || e.type === "PANEL_CLOSED" || e.type === "SHOW_PERMISSION_NOTIFICATION" || e.type === "resize_window" || e.type === "MCP_PERMISSION_RESPONSE") {
        a({
          success: true
        });
        return;
      }
      if (e.type === "check_and_refresh_oauth") {
        a({
          isValid: false,
          isRefreshed: false
        });
        return;
      }
      if (e.type !== "PLAY_NOTIFICATION_SOUND") {
        if (e.type === "open_side_panel") {
          const t = e.tabId || s.tab?.id;
          if (!t) {
            a({
              success: false
            });
            return;
          }
          await W(t);
          if (e.prompt) {
            const t = async (s = 0) => {
              try {
                const t = s === 0 ? 800 : 500;
                await new Promise(e => setTimeout(e, t));
                await new Promise((t, s) => {
                  chrome.runtime.sendMessage({
                    type: "POPULATE_INPUT_TEXT",
                    prompt: e.prompt,
                    permissionMode: e.permissionMode,
                    selectedModel: e.selectedModel,
                    attachments: e.attachments
                  }, e => {
                    const a = chrome.runtime.lastError?.message;
                    if (a || !e?.success) {
                      s(new Error(a ?? "side panel not ready"));
                    } else {
                      t();
                    }
                  });
                });
              } catch (a) {
                if (s < 5) {
                  await t(s + 1);
                }
              }
            };
            await t();
          }
          a({
            success: true
          });
          return;
        }
        if (e.type === "logout") {
          a({
            success: true,
            disabled: true
          });
        } else if (e.type === "check_native_host_status") {
          const e = await async function () {
            if (A && k) {
              if (M) {
                clearTimeout(M);
              }
              return new Promise(e => {
                C = e;
                A.postMessage({
                  type: "get_status"
                });
                M = setTimeout(() => {
                  C = null;
                  e({
                    nativeHostInstalled: k,
                    mcpConnected: S
                  });
                }, 10000);
              });
            } else {
              return {
                nativeHostInstalled: k,
                mcpConnected: S
              };
            }
          }();
          a({
            status: {
              nativeHostInstalled: e.nativeHostInstalled,
              mcpConnected: e.mcpConnected || d()
            }
          });
        } else if (e.type === "SEND_MCP_NOTIFICATION") {
          const t = function (e, t) {
            if (!A) {
              return false;
            }
            const s = {
              type: "notification",
              jsonrpc: "2.0",
              method: e,
              params: t || {}
            };
            A.postMessage(s);
            return true;
          }(e.method, e.params);
          const s = u(e.method, e.params);
          a({
            success: t || s
          });
        } else if (e.type === "OPEN_OPTIONS_WITH_TASK") {
          try {
            await l(p.PENDING_SCHEDULED_TASK, e.task);
            const t = chrome.runtime.getURL("options.html");
            const s = (await chrome.tabs.query({})).find(e => e.url?.startsWith(t));
            if (s && s.id) {
              await chrome.tabs.update(s.id, {
                url: chrome.runtime.getURL("options.html#prompts"),
                active: true
              });
              if (s.windowId) {
                await chrome.windows.update(s.windowId, {
                  focused: true
                });
              }
            } else {
              await chrome.tabs.create({
                url: chrome.runtime.getURL("options.html#prompts")
              });
            }
            a({
              success: true
            });
          } catch (n) {
            a({
              success: false,
              error: n.message
            });
          }
        } else if (e.type === "EXECUTE_SCHEDULED_TASK") {
          try {
            const {
              task: t,
              runLogId: s
            } = e;
            await z(t, s);
            h("claude_chrome.scheduled_task.executed", {
              task_id: t.id,
              task_name: t.name,
              success: true,
              execution_type: e.isManual ? "manual" : "automatic"
            });
            a({
              success: true
            });
          } catch (n) {
            h("claude_chrome.scheduled_task.executed", {
              task_id: e.task.id,
              task_name: e.task.name,
              success: false,
              execution_type: e.isManual ? "manual" : "automatic",
              error: n.message
            });
            a({
              success: false,
              error: n.message
            });
          }
        } else if (e.type === "STOP_AGENT") {
          let n;
          if (e.fromTabId === "CURRENT_TAB" && s.tab?.id) {
            n = (await t.getMainTabId(s.tab.id)) || s.tab.id;
          } else if (typeof e.fromTabId == "number") {
            n = e.fromTabId;
          }
          if (n) {
            chrome.runtime.sendMessage({
              type: "STOP_AGENT",
              targetTabId: n
            });
          }
          a({
            success: true
          });
        } else if (e.type === "SWITCH_TO_MAIN_TAB") {
          if (s.tab?.id) {
            try {
              await t.initialize(true);
              const e = await t.getMainTabId(s.tab.id);
              if (e) {
                await chrome.tabs.update(e, {
                  active: true
                });
                const t = await chrome.tabs.get(e);
                if (t.windowId) {
                  await chrome.windows.update(t.windowId, {
                    focused: true
                  });
                }
                a({
                  success: true
                });
              } else {
                a({
                  success: false,
                  error: "No main tab found"
                });
              }
            } catch (n) {
              a({
                success: false,
                error: n.message
              });
            }
          } else {
            a({
              success: false,
              error: "No sender tab"
            });
          }
        } else if (e.type === "SECONDARY_TAB_CHECK_MAIN") {
          chrome.runtime.sendMessage({
            type: "MAIN_TAB_ACK_REQUEST",
            secondaryTabId: e.secondaryTabId,
            mainTabId: e.mainTabId,
            timestamp: e.timestamp
          }, e => {
            const t = chrome.runtime.lastError?.message;
            a(!t && e?.success ? {
              success: true
            } : {
              success: false
            });
          });
        } else if (e.type === "MAIN_TAB_ACK_RESPONSE") {
          a({
            success: e.success
          });
        } else if (e.type === "STATIC_INDICATOR_HEARTBEAT") {
          (async () => {
            const e = s.tab?.id;
            if (e) {
              try {
                const s = (await chrome.tabs.get(e)).groupId;
                if (s === undefined || s === chrome.tabGroups.TAB_GROUP_ID_NONE) {
                  a({
                    success: false
                  });
                  return;
                }
                if (await t.findGroupByTab(e)) {
                  a({
                    success: true
                  });
                  return;
                }
                const n = await chrome.tabs.query({
                  groupId: s
                });
                const o = async t => {
                  if (t >= n.length) {
                    a({
                      success: false
                    });
                    return;
                  }
                  const s = n[t];
                  if (s.id === e || !s.id) {
                    await o(t + 1);
                    return;
                  }
                  const i = s.id;
                  const r = Date.now();
                  const c = H.get(i);
                  if (c && r - c.timestamp < 3000) {
                    if (c.isAlive) {
                      a({
                        success: true
                      });
                      return;
                    } else {
                      await o(t + 1);
                      return;
                    }
                  }
                   chrome.runtime.sendMessage({
                     type: "MAIN_TAB_ACK_REQUEST",
                     secondaryTabId: e,
                     mainTabId: i,
                     timestamp: r
                   }, async e => {
                     const t = chrome.runtime.lastError?.message;
                     const s = !t && (e?.success ?? false);
                     H.set(i, {
                       timestamp: r,
                       isAlive: s
                     });
                    if (s) {
                      a({
                        success: true
                      });
                    } else {
                      await o(t + 1);
                    }
                  });
                };
                await o(0);
              } catch (n) {
                a({
                  success: false
                });
              }
            } else {
              a({
                success: false
              });
            }
          })();
        } else if (e.type === "DISMISS_STATIC_INDICATOR_FOR_GROUP") {
          (async () => {
            const e = s.tab?.id;
            if (e) {
              try {
                const s = (await chrome.tabs.get(e)).groupId;
                if (s === undefined || s === chrome.tabGroups.TAB_GROUP_ID_NONE) {
                  a({
                    success: false
                  });
                  return;
                }
                await t.initialize();
                await t.dismissStaticIndicatorsForGroup(s);
                a({
                  success: true
                });
              } catch (n) {
                a({
                  success: false
                });
              }
            } else {
              a({
                success: false
              });
            }
          })();
        }
      } else {
        try {
          await c();
          await chrome.runtime.sendMessage({
            type: "OFFSCREEN_PLAY_SOUND",
            audioUrl: e.audioUrl,
            volume: e.volume || 0.5
          });
          a({
            success: true
          });
        } catch (n) {
          a({
            success: false,
            error: n.message
          });
        }
      }
    } else {
      a();
    }
  })().catch(t => {
    a({
      success: false,
      error: t && typeof t.message === "string" ? t.message : String(t || "Unknown background error")
    });
  });
  return true;
});
chrome.tabs.onRemoved.addListener(async e => {
  await t.handleTabClosed(e);
});
chrome.webNavigation.onBeforeNavigate.addListener(async e => {
  if (e.frameId === 0) {
    await $(e.url, e.tabId);
  }
});
chrome.alarms.onAlarm.addListener(async e => {
  if (e.name.startsWith("prompt_")) {
    try {
      const n = e.name;
      const o = await chrome.storage.local.get(["savedPrompts"]);
      const i = (o.savedPrompts || []).find(e => e.id === n);
      if (i) {
        const e = `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        let o = null;
        try {
          const t = {
            id: i.id,
            name: i.command || "Scheduled Task",
            prompt: i.prompt,
            url: i.url,
            enabled: true,
            skipPermissions: i.skipPermissions !== false,
            model: i.model
          };
          await z(t, e);
        } catch (t) {
          o = t instanceof Error ? t : new Error(String(t));
          try {
            await chrome.notifications.create({
              type: "basic",
              iconUrl: "/icon-128.png",
              title: "Scheduled Task Failed",
              message: `Task "${i.command || "Scheduled Task"}" failed to execute. ${o.message}`,
              priority: 2
            });
          } catch (s) {}
        }
        if (i.repeatType === "monthly" || i.repeatType === "annually") {
          try {
            await I.updateAlarmForPrompt(i);
          } catch (t) {
            const e = `retry_${n}`;
            try {
              await chrome.alarms.create(e, {
                delayInMinutes: 1
              });
            } catch (a) {}
            try {
              await chrome.notifications.create({
                type: "basic",
                iconUrl: "/icon-128.png",
                title: "Scheduled Task Setup Failed",
                message: `Failed to schedule next occurrence of "${i.command || "Scheduled Task"}". Please check the task settings.`,
                priority: 2
              });
            } catch (s) {}
          }
        }
      }
    } catch (t) {}
  } else if (e.name.startsWith("retry_")) {
    try {
      const a = e.name.replace("retry_", "");
      const n = await chrome.storage.local.get(["savedPrompts"]);
      const o = (n.savedPrompts || []).find(e => e.id === a);
      if (o && (o.repeatType === "monthly" || o.repeatType === "annually")) {
        try {
          await I.updateAlarmForPrompt(o);
        } catch (t) {
          try {
            await chrome.notifications.create({
              type: "basic",
              iconUrl: "/icon-128.png",
              title: "Scheduled Task Needs Attention",
              message: `Could not automatically reschedule "${o.command || "Scheduled Task"}". Please edit the task to reschedule it.`,
              priority: 2
            });
          } catch (s) {}
        }
      }
    } catch (t) {}
  }
});
chrome.runtime.onMessageExternal.addListener((e, t, s) => {
  (async () => {
    var a;
    if ((a = t.origin) && ["https://claude.ai"].includes(a)) {
      if (e.type === "oauth_redirect") {
        s({
          success: false,
          disabled: true
        });
      } else if (e.type === "ping") {
        s({
          success: true,
          exists: true
        });
      } else if (e.type === "onboarding_task") {
        chrome.runtime.sendMessage({
          type: "POPULATE_INPUT_TEXT",
          prompt: e.payload?.prompt
        }, e => {
          const t = chrome.runtime.lastError?.message;
          s({
            success: !t && !!e?.success,
            error: t ?? (e?.success ? undefined : "side panel not ready")
          });
        });
      }
    } else {
      s({
        success: false,
        error: "Untrusted origin"
      });
    }
  })();
  return true;
});
