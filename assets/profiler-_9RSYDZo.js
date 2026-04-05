import { bw as t, bB as e, bC as n, by as s, bD as r, bE as o, bF as a, bb as i, bG as c, bH as u, bs as l, bI as p, br as d, b2 as f, bJ as m } from "./useStorageState-hbwNMVUA.js";
import "./index-BVS4T5_D.js";
import "./index-5uYI7rOK.js";
import "./PermissionManager-9s959502.js";
function v(t, e) {
  return new Promise(n => {
    t.write(e);
    t.finish(t => {
      n(t);
    });
  });
}
const w = /\/(?![vV]\d{1,2}\/)([^/\d?]*\d+[^/?]*)/g;
const b = (t, e) => t || function (t) {
  if (t) {
    return t.replace(w, "/?");
  } else {
    return "/";
  }
}(e);
function g(t, e, n) {
  const s = {
    application: {
      id: e
    }
  };
  if (n) {
    s.session = {
      id: n
    };
  }
  const {
    ids: r,
    names: o
  } = function (t) {
    const e = {
      ids: [],
      names: []
    };
    for (const n of t) {
      e.ids.push(n.viewId);
      if (n.viewName) {
        e.names.push(n.viewName);
      }
    }
    e.names = Array.from(new Set(e.names));
    return e;
  }(t.views);
  if (r.length) {
    s.view = {
      id: r,
      name: o
    };
  }
  const a = t.longTasks.map(t => t.id).filter(t => t !== undefined);
  if (a.length) {
    s.long_task = {
      id: a
    };
  }
  return s;
}
function h(t, e, n) {
  const s = function (t, e, n) {
    const s = r(e);
    const a = g(t, e.applicationId, n);
    const i = function (t) {
      const e = t.concat(["language:javascript", "runtime:chrome", "family:chrome", "host:browser"]);
      return e;
    }(s);
    const c = {
      ...a,
      attachments: ["wall-time.json"],
      start: new Date(t.startClocks.timeStamp).toISOString(),
      end: new Date(t.endClocks.timeStamp).toISOString(),
      family: "chrome",
      runtime: "chrome",
      format: "json",
      version: 4,
      tags_profiler: i.join(","),
      _dd: {
        clock_drift: o()
      }
    };
    return c;
  }(t, e, n);
  return {
    event: s,
    "wall-time.json": t
  };
}
const y = {
  sampleIntervalMs: 10,
  collectIntervalMs: 60000,
  minProfileDurationMs: 5000,
  minNumberOfSamples: 50
};
function k(r, o, w, g, k, I, S, M = y) {
  const j = function (r, o, a, i) {
    const c = t([r.profilingEndpointBuilder], t => {
      o.notify(14, {
        error: t
      });
      s("Error reported to customer", {
        "error.message": t.message
      });
    });
    const u = a(i);
    return {
      async send({
        event: t,
        ...s
      }) {
        const r = new FormData();
        const o = e(t);
        if (!o) {
          throw new Error("Failed to serialize event");
        }
        r.append("event", new Blob([o], {
          type: "application/json"
        }), "event.json");
        let a = o.length;
        for (const [i, c] of n(s)) {
          const t = e(c);
          if (!t) {
            throw new Error("Failed to serialize attachment");
          }
          const n = await v(u, t);
          a += n.outputBytesCount;
          r.append(i, new Blob([n.output]), i);
        }
        c.send({
          data: r,
          bytesCount: a
        });
      }
    };
  }(r, o, I, 6);
  let C;
  const E = [];
  let T = {
    state: "stopped",
    stateReason: "initializing"
  };
  function D() {
    if (T.state === "running") {
      return;
    }
    const t = S.findView();
    C = t ? {
      startClocks: t.startClocks,
      viewId: t.id,
      viewName: b(t.name, document.location.pathname)
    } : undefined;
    E.push(i(r, window, "visibilitychange", R).stop, i(r, window, "beforeunload", z).stop);
    _();
  }
  async function P(t) {
    await async function (t) {
      if (T.state !== "running") {
        return;
      }
      await B();
      T = {
        state: "stopped",
        stateReason: t
      };
    }(t);
    E.forEach(t => t());
    g.set({
      status: "stopped",
      error_reason: undefined
    });
  }
  function _() {
    const t = c().Profiler;
    if (!t) {
      g.set({
        status: "error",
        error_reason: "not-supported-by-browser"
      });
      throw new Error("RUM Profiler is not supported in this browser.");
    }
    x(T).catch(a);
    const {
      cleanupTasks: e
    } = function (t) {
      if (t.state === "running") {
        return {
          cleanupTasks: t.cleanupTasks
        };
      }
      const e = [];
      const n = o.subscribe(2, t => {
        const e = {
          viewId: t.id,
          viewName: b(t.name, document.location.pathname),
          startClocks: t.startClocks
        };
        N(e);
        C = e;
      });
      e.push(n.unsubscribe);
      return {
        cleanupTasks: e
      };
    }(T);
    let n;
    try {
      n = new t({
        sampleInterval: M.sampleIntervalMs,
        maxBufferSize: Math.round(M.collectIntervalMs * 1.5 / M.sampleIntervalMs)
      });
    } catch (s) {
      if (s instanceof Error && s.message.includes("disabled by Document Policy")) {
        u.warn("[DD_RUM] Profiler startup failed. Ensure your server includes the `Document-Policy: js-profiling` response header when serving HTML pages.", s);
        g.set({
          status: "error",
          error_reason: "missing-document-policy-header"
        });
      } else {
        g.set({
          status: "error",
          error_reason: "unexpected-exception"
        });
      }
      return;
    }
    g.set({
      status: "running",
      error_reason: undefined
    });
    T = {
      state: "running",
      startClocks: p(),
      profiler: n,
      timeoutId: l(_, M.collectIntervalMs),
      views: [],
      cleanupTasks: e,
      longTasks: []
    };
    N(C);
    n.addEventListener("samplebufferfull", O);
  }
  async function x(t) {
    if (t.state !== "running") {
      return;
    }
    d(t.timeoutId);
    t.profiler.removeEventListener("samplebufferfull", O);
    const {
      startClocks: e,
      views: n
    } = t;
    await t.profiler.stop().then(t => {
      const s = p();
      const o = k.findLongTasks(e.relative);
      const a = f(e.timeStamp, s.timeStamp) < M.minProfileDurationMs;
      const i = function (t) {
        let e = 0;
        for (const n of t) {
          if (n.stackId !== undefined) {
            e++;
          }
        }
        return e;
      }(t.samples) < M.minNumberOfSamples;
      if (o.length !== 0 || !a && !i) {
        (function (t) {
          const n = w.findTrackedSession()?.id;
          const s = h(t, r, n);
          j.send(s);
        })(Object.assign(t, {
          startClocks: e,
          endClocks: s,
          clocksOrigin: m(),
          longTasks: o,
          views: n,
          sampleInterval: M.sampleIntervalMs
        }));
      }
    }).catch(a);
  }
  async function B() {
    if (T.state === "running") {
      T.cleanupTasks.forEach(t => t());
      await x(T);
    }
  }
  function N(t) {
    if (T.state === "running" && t) {
      T.views.push(t);
    }
  }
  function O() {
    _();
  }
  function R() {
    if (document.visibilityState === "hidden" && T.state === "running") {
      (async function () {
        if (T.state === "running") {
          await B();
          T = {
            state: "paused"
          };
        }
      })().catch(a);
    } else if (document.visibilityState === "visible" && T.state === "paused") {
      _();
    }
  }
  function z() {
    _();
  }
  o.subscribe(9, () => {
    P("session-expired").catch(a);
  });
  o.subscribe(10, () => {
    if (T.state === "stopped" && T.stateReason === "session-expired") {
      D();
    }
  });
  return {
    start: D,
    stop: async function () {
      await P("stopped-by-user");
    },
    isStopped: function () {
      return T.state === "stopped";
    },
    isRunning: function () {
      return T.state === "running";
    },
    isPaused: function () {
      return T.state === "paused";
    }
  };
}
export { y as DEFAULT_RUM_PROFILER_CONFIGURATION, k as createRumProfiler };