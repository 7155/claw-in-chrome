import { a as e, g as t, r as n, j as r } from "./index-BVS4T5_D.js";
(function () {
  const e = document.createElement("link").relList;
  if (!e || !e.supports || !e.supports("modulepreload")) {
    for (const e of document.querySelectorAll("link[rel=\"modulepreload\"]")) {
      t(e);
    }
    new MutationObserver(e => {
      for (const n of e) {
        if (n.type === "childList") {
          for (const e of n.addedNodes) {
            if (e.tagName === "LINK" && e.rel === "modulepreload") {
              t(e);
            }
          }
        }
      }
    }).observe(document, {
      childList: true,
      subtree: true
    });
  }
  function t(e) {
    if (e.ep) {
      return;
    }
    e.ep = true;
    const t = function (e) {
      const t = {};
      if (e.integrity) {
        t.integrity = e.integrity;
      }
      if (e.referrerPolicy) {
        t.referrerPolicy = e.referrerPolicy;
      }
      if (e.crossOrigin === "use-credentials") {
        t.credentials = "include";
      } else if (e.crossOrigin === "anonymous") {
        t.credentials = "omit";
      } else {
        t.credentials = "same-origin";
      }
      return t;
    }(e);
    fetch(e.href, t);
  }
})();
var a;
var l;
var o = {
  exports: {}
};
var i = {};
var u = {
  exports: {}
};
var s = {};
function c() {
  if (!l) {
    l = 1;
    if (!a) {
      a = 1;
      (function (e) {
        function t(e, t) {
          var n = e.length;
          e.push(t);
          e: while (n > 0) {
            var r = n - 1 >>> 1;
            var l = e[r];
            if (!(a(l, t) > 0)) {
              break e;
            }
            e[r] = t;
            e[n] = l;
            n = r;
          }
        }
        function n(e) {
          if (e.length === 0) {
            return null;
          } else {
            return e[0];
          }
        }
        function r(e) {
          if (e.length === 0) {
            return null;
          }
          var t = e[0];
          var n = e.pop();
          if (n !== t) {
            e[0] = n;
            e: for (var r = 0, l = e.length, o = l >>> 1; r < o;) {
              var i = (r + 1) * 2 - 1;
              var u = e[i];
              var s = i + 1;
              var c = e[s];
              if (a(u, n) < 0) {
                if (s < l && a(c, u) < 0) {
                  e[r] = c;
                  e[s] = n;
                  r = s;
                } else {
                  e[r] = u;
                  e[i] = n;
                  r = i;
                }
              } else {
                if (!(s < l) || !(a(c, n) < 0)) {
                  break e;
                }
                e[r] = c;
                e[s] = n;
                r = s;
              }
            }
          }
          return t;
        }
        function a(e, t) {
          var n = e.sortIndex - t.sortIndex;
          if (n !== 0) {
            return n;
          } else {
            return e.id - t.id;
          }
        }
        e.unstable_now = undefined;
        if (typeof performance == "object" && typeof performance.now == "function") {
          var l = performance;
          e.unstable_now = function () {
            return l.now();
          };
        } else {
          var o = Date;
          var i = o.now();
          e.unstable_now = function () {
            return o.now() - i;
          };
        }
        var u = [];
        var s = [];
        var c = 1;
        var f = null;
        var d = 3;
        var h = false;
        var p = false;
        var m = false;
        var g = false;
        var y = typeof setTimeout == "function" ? setTimeout : null;
        var v = typeof clearTimeout == "function" ? clearTimeout : null;
        var b = typeof setImmediate != "undefined" ? setImmediate : null;
        function S(e) {
          for (var a = n(s); a !== null;) {
            if (a.callback === null) {
              r(s);
            } else {
              if (!(a.startTime <= e)) {
                break;
              }
              r(s);
              a.sortIndex = a.expirationTime;
              t(u, a);
            }
            a = n(s);
          }
        }
        function E(e) {
          m = false;
          S(e);
          if (!p) {
            if (n(u) !== null) {
              p = true;
              if (!k) {
                k = true;
                w();
              }
            } else {
              var t = n(s);
              if (t !== null) {
                O(E, t.startTime - e);
              }
            }
          }
        }
        var w;
        var k = false;
        var T = -1;
        var P = 5;
        var _ = -1;
        function C() {
          return !!g || !(e.unstable_now() - _ < P);
        }
        function N() {
          g = false;
          if (k) {
            var t = e.unstable_now();
            _ = t;
            var a = true;
            try {
              e: {
                p = false;
                if (m) {
                  m = false;
                  v(T);
                  T = -1;
                }
                h = true;
                var l = d;
                try {
                  t: {
                    S(t);
                    f = n(u);
                    while (f !== null && (!(f.expirationTime > t) || !C())) {
                      var o = f.callback;
                      if (typeof o == "function") {
                        f.callback = null;
                        d = f.priorityLevel;
                        var i = o(f.expirationTime <= t);
                        t = e.unstable_now();
                        if (typeof i == "function") {
                          f.callback = i;
                          S(t);
                          a = true;
                          break t;
                        }
                        if (f === n(u)) {
                          r(u);
                        }
                        S(t);
                      } else {
                        r(u);
                      }
                      f = n(u);
                    }
                    if (f !== null) {
                      a = true;
                    } else {
                      var c = n(s);
                      if (c !== null) {
                        O(E, c.startTime - t);
                      }
                      a = false;
                    }
                  }
                  break e;
                } finally {
                  f = null;
                  d = l;
                  h = false;
                }
                a = undefined;
              }
            } finally {
              if (a) {
                w();
              } else {
                k = false;
              }
            }
          }
        }
        if (typeof b == "function") {
          w = function () {
            b(N);
          };
        } else if (typeof MessageChannel != "undefined") {
          var L = new MessageChannel();
          var A = L.port2;
          L.port1.onmessage = N;
          w = function () {
            A.postMessage(null);
          };
        } else {
          w = function () {
            y(N, 0);
          };
        }
        function O(t, n) {
          T = y(function () {
            t(e.unstable_now());
          }, n);
        }
        e.unstable_IdlePriority = 5;
        e.unstable_ImmediatePriority = 1;
        e.unstable_LowPriority = 4;
        e.unstable_NormalPriority = 3;
        e.unstable_Profiling = null;
        e.unstable_UserBlockingPriority = 2;
        e.unstable_cancelCallback = function (e) {
          e.callback = null;
        };
        e.unstable_forceFrameRate = function (e) {
          if (!(e < 0) && !(e > 125)) {
            P = e > 0 ? Math.floor(1000 / e) : 5;
          }
        };
        e.unstable_getCurrentPriorityLevel = function () {
          return d;
        };
        e.unstable_next = function (e) {
          switch (d) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = d;
          }
          var n = d;
          d = t;
          try {
            return e();
          } finally {
            d = n;
          }
        };
        e.unstable_requestPaint = function () {
          g = true;
        };
        e.unstable_runWithPriority = function (e, t) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var n = d;
          d = e;
          try {
            return t();
          } finally {
            d = n;
          }
        };
        e.unstable_scheduleCallback = function (r, a, l) {
          var o = e.unstable_now();
          l = typeof l == "object" && l !== null && typeof (l = l.delay) == "number" && l > 0 ? o + l : o;
          switch (r) {
            case 1:
              var i = -1;
              break;
            case 2:
              i = 250;
              break;
            case 5:
              i = 1073741823;
              break;
            case 4:
              i = 10000;
              break;
            default:
              i = 5000;
          }
          r = {
            id: c++,
            callback: a,
            priorityLevel: r,
            startTime: l,
            expirationTime: i = l + i,
            sortIndex: -1
          };
          if (l > o) {
            r.sortIndex = l;
            t(s, r);
            if (n(u) === null && r === n(s)) {
              if (m) {
                v(T);
                T = -1;
              } else {
                m = true;
              }
              O(E, l - o);
            }
          } else {
            r.sortIndex = i;
            t(u, r);
            if (!p && !h) {
              p = true;
              if (!k) {
                k = true;
                w();
              }
            }
          }
          return r;
        };
        e.unstable_shouldYield = C;
        e.unstable_wrapCallback = function (e) {
          var t = d;
          return function () {
            var n = d;
            d = t;
            try {
              return e.apply(this, arguments);
            } finally {
              d = n;
            }
          };
        };
      })(s);
    }
    u.exports = s;
  }
  return u.exports;
}
var f;
var d;
var h;
var p;
var m = {
  exports: {}
};
var g = {};
function y() {
  if (f) {
    return g;
  }
  f = 1;
  var t = e();
  function n(e) {
    var t = "https://react.dev/errors/" + e;
    if (arguments.length > 1) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++) {
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      }
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {}
  var a = {
    d: {
      f: r,
      r: function () {
        throw Error(n(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  };
  var l = Symbol.for("react.portal");
  var o = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function i(e, t) {
    if (e === "font") {
      return "";
    } else if (typeof t == "string") {
      if (t === "use-credentials") {
        return t;
      } else {
        return "";
      }
    } else {
      return undefined;
    }
  }
  g.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a;
  g.createPortal = function (e, t, r = null) {
    if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) {
      throw Error(n(299));
    }
    return function (e, t, n, r = null) {
      return {
        $$typeof: l,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
      };
    }(e, t, null, r);
  };
  g.flushSync = function (e) {
    var t = o.T;
    var n = a.p;
    try {
      o.T = null;
      a.p = 2;
      if (e) {
        return e();
      }
    } finally {
      o.T = t;
      a.p = n;
      a.d.f();
    }
  };
  g.preconnect = function (e, t) {
    if (typeof e == "string") {
      if (t) {
        t = typeof (t = t.crossOrigin) == "string" ? t === "use-credentials" ? t : "" : undefined;
      } else {
        t = null;
      }
      a.d.C(e, t);
    }
  };
  g.prefetchDNS = function (e) {
    if (typeof e == "string") {
      a.d.D(e);
    }
  };
  g.preinit = function (e, t) {
    if (typeof e == "string" && t && typeof t.as == "string") {
      var n = t.as;
      var r = i(n, t.crossOrigin);
      var l = typeof t.integrity == "string" ? t.integrity : undefined;
      var o = typeof t.fetchPriority == "string" ? t.fetchPriority : undefined;
      if (n === "style") {
        a.d.S(e, typeof t.precedence == "string" ? t.precedence : undefined, {
          crossOrigin: r,
          integrity: l,
          fetchPriority: o
        });
      } else if (n === "script") {
        a.d.X(e, {
          crossOrigin: r,
          integrity: l,
          fetchPriority: o,
          nonce: typeof t.nonce == "string" ? t.nonce : undefined
        });
      }
    }
  };
  g.preinitModule = function (e, t) {
    if (typeof e == "string") {
      if (typeof t == "object" && t !== null) {
        if (t.as == null || t.as === "script") {
          var n = i(t.as, t.crossOrigin);
          a.d.M(e, {
            crossOrigin: n,
            integrity: typeof t.integrity == "string" ? t.integrity : undefined,
            nonce: typeof t.nonce == "string" ? t.nonce : undefined
          });
        }
      } else if (t == null) {
        a.d.M(e);
      }
    }
  };
  g.preload = function (e, t) {
    if (typeof e == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
      var n = t.as;
      var r = i(n, t.crossOrigin);
      a.d.L(e, n, {
        crossOrigin: r,
        integrity: typeof t.integrity == "string" ? t.integrity : undefined,
        nonce: typeof t.nonce == "string" ? t.nonce : undefined,
        type: typeof t.type == "string" ? t.type : undefined,
        fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : undefined,
        referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : undefined,
        imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : undefined,
        imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : undefined,
        media: typeof t.media == "string" ? t.media : undefined
      });
    }
  };
  g.preloadModule = function (e, t) {
    if (typeof e == "string") {
      if (t) {
        var n = i(t.as, t.crossOrigin);
        a.d.m(e, {
          as: typeof t.as == "string" && t.as !== "script" ? t.as : undefined,
          crossOrigin: n,
          integrity: typeof t.integrity == "string" ? t.integrity : undefined
        });
      } else {
        a.d.m(e);
      }
    }
  };
  g.requestFormReset = function (e) {
    a.d.r(e);
  };
  g.unstable_batchedUpdates = function (e, t) {
    return e(t);
  };
  g.useFormState = function (e, t, n) {
    return o.H.useFormState(e, t, n);
  };
  g.useFormStatus = function () {
    return o.H.useHostTransitionStatus();
  };
  g.version = "19.2.4";
  return g;
}
function v() {
  if (d) {
    return m.exports;
  }
  d = 1;
  (function e() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {}
    }
  })();
  m.exports = y();
  return m.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function b() {
  if (h) {
    return i;
  }
  h = 1;
  var t = c();
  var n = e();
  var r = v();
  function a(e) {
    var t = "https://react.dev/errors/" + e;
    if (arguments.length > 1) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++) {
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      }
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l(e) {
    return !!e && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11);
  }
  function o(e) {
    var t = e;
    var n = e;
    if (e.alternate) {
      while (t.return) {
        t = t.return;
      }
    } else {
      e = t;
      do {
        if ((t = e).flags & 4098) {
          n = t.return;
        }
        e = t.return;
      } while (e);
    }
    if (t.tag === 3) {
      return n;
    } else {
      return null;
    }
  }
  function u(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate) !== null) {
        t = e.memoizedState;
      }
      if (t !== null) {
        return t.dehydrated;
      }
    }
    return null;
  }
  function s(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate) !== null) {
        t = e.memoizedState;
      }
      if (t !== null) {
        return t.dehydrated;
      }
    }
    return null;
  }
  function f(e) {
    if (o(e) !== e) {
      throw Error(a(188));
    }
  }
  function d(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) {
      return e;
    }
    for (e = e.child; e !== null;) {
      if ((t = d(e)) !== null) {
        return t;
      }
      e = e.sibling;
    }
    return null;
  }
  var p = Object.assign;
  var m = Symbol.for("react.element");
  var g = Symbol.for("react.transitional.element");
  var y = Symbol.for("react.portal");
  var b = Symbol.for("react.fragment");
  var S = Symbol.for("react.strict_mode");
  var E = Symbol.for("react.profiler");
  var w = Symbol.for("react.consumer");
  var k = Symbol.for("react.context");
  var T = Symbol.for("react.forward_ref");
  var P = Symbol.for("react.suspense");
  var _ = Symbol.for("react.suspense_list");
  var C = Symbol.for("react.memo");
  var N = Symbol.for("react.lazy");
  var L = Symbol.for("react.activity");
  var A = Symbol.for("react.memo_cache_sentinel");
  var O = Symbol.iterator;
  function x(e) {
    if (e === null || typeof e != "object") {
      return null;
    } else if (typeof (e = O && e[O] || e["@@iterator"]) == "function") {
      return e;
    } else {
      return null;
    }
  }
  var R = Symbol.for("react.client.reference");
  function I(e) {
    if (e == null) {
      return null;
    }
    if (typeof e == "function") {
      if (e.$$typeof === R) {
        return null;
      } else {
        return e.displayName || e.name || null;
      }
    }
    if (typeof e == "string") {
      return e;
    }
    switch (e) {
      case b:
        return "Fragment";
      case E:
        return "Profiler";
      case S:
        return "StrictMode";
      case P:
        return "Suspense";
      case _:
        return "SuspenseList";
      case L:
        return "Activity";
    }
    if (typeof e == "object") {
      switch (e.$$typeof) {
        case y:
          return "Portal";
        case k:
          return e.displayName || "Context";
        case w:
          return (e._context.displayName || "Context") + ".Consumer";
        case T:
          var t = e.render;
          if (!(e = e.displayName)) {
            e = (e = t.displayName || t.name || "") !== "" ? "ForwardRef(" + e + ")" : "ForwardRef";
          }
          return e;
        case C:
          if ((t = e.displayName || null) !== null) {
            return t;
          } else {
            return I(e.type) || "Memo";
          }
        case N:
          t = e._payload;
          e = e._init;
          try {
            return I(e(t));
          } catch (n) {}
      }
    }
    return null;
  }
  var M = Array.isArray;
  var H = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var D = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var z = {
    pending: false,
    data: null,
    method: null,
    action: null
  };
  var F = [];
  var B = -1;
  function U(e) {
    return {
      current: e
    };
  }
  function G(e) {
    if (!(B < 0)) {
      e.current = F[B];
      F[B] = null;
      B--;
    }
  }
  function j(e, t) {
    B++;
    F[B] = e.current;
    e.current = t;
  }
  var V;
  var $;
  var W = U(null);
  var Q = U(null);
  var q = U(null);
  var K = U(null);
  function X(e, t) {
    j(q, t);
    j(Q, e);
    j(W, null);
    switch (t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Sf(e) : 0;
        break;
      default:
        e = t.tagName;
        if (t = t.namespaceURI) {
          e = Ef(t = Sf(t), e);
        } else {
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
        }
    }
    G(W);
    j(W, e);
  }
  function Y() {
    G(W);
    G(Q);
    G(q);
  }
  function Z(e) {
    if (e.memoizedState !== null) {
      j(K, e);
    }
    var t = W.current;
    var n = Ef(t, e.type);
    if (t !== n) {
      j(Q, e);
      j(W, n);
    }
  }
  function J(e) {
    if (Q.current === e) {
      G(W);
      G(Q);
    }
    if (K.current === e) {
      G(K);
      hd._currentValue = z;
    }
  }
  function ee(e) {
    if (V === undefined) {
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        V = t && t[1] || "";
        $ = n.stack.indexOf("\n    at") > -1 ? " (<anonymous>)" : n.stack.indexOf("@") > -1 ? "@unknown:0:0" : "";
      }
    }
    return "\n" + V + e + $;
  }
  var te = false;
  function ne(e, t) {
    if (!e || te) {
      return "";
    }
    te = true;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = undefined;
    try {
      var r = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              function n() {
                throw Error();
              }
              Object.defineProperty(n.prototype, "props", {
                set: function () {
                  throw Error();
                }
              });
              if (typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(n, []);
                } catch (a) {
                  var r = a;
                }
                Reflect.construct(e, [], n);
              } else {
                try {
                  n.call();
                } catch (l) {
                  r = l;
                }
                e.call(n.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (o) {
                r = o;
              }
              if ((n = e()) && typeof n.catch == "function") {
                n.catch(function () {});
              }
            }
          } catch (i) {
            if (i && r && typeof i.stack == "string") {
              return [i.stack, r.stack];
            }
          }
          return [null, null];
        }
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
      if (a && a.configurable) {
        Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
      }
      var l = r.DetermineComponentFrameRoot();
      var o = l[0];
      var i = l[1];
      if (o && i) {
        var u = o.split("\n");
        var s = i.split("\n");
        for (a = r = 0; r < u.length && !u[r].includes("DetermineComponentFrameRoot");) {
          r++;
        }
        while (a < s.length && !s[a].includes("DetermineComponentFrameRoot")) {
          a++;
        }
        if (r === u.length || a === s.length) {
          r = u.length - 1;
          a = s.length - 1;
          while (r >= 1 && a >= 0 && u[r] !== s[a]) {
            a--;
          }
        }
        for (; r >= 1 && a >= 0; r--, a--) {
          if (u[r] !== s[a]) {
            if (r !== 1 || a !== 1) {
              do {
                r--;
                if (--a < 0 || u[r] !== s[a]) {
                  var c = "\n" + u[r].replace(" at new ", " at ");
                  if (e.displayName && c.includes("<anonymous>")) {
                    c = c.replace("<anonymous>", e.displayName);
                  }
                  return c;
                }
              } while (r >= 1 && a >= 0);
            }
            break;
          }
        }
      }
    } finally {
      te = false;
      Error.prepareStackTrace = n;
    }
    if (n = e ? e.displayName || e.name : "") {
      return ee(n);
    } else {
      return "";
    }
  }
  function re(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ee(e.type);
      case 16:
        return ee("Lazy");
      case 13:
        if (e.child !== t && t !== null) {
          return ee("Suspense Fallback");
        } else {
          return ee("Suspense");
        }
      case 19:
        return ee("SuspenseList");
      case 0:
      case 15:
        return ne(e.type, false);
      case 11:
        return ne(e.type.render, false);
      case 1:
        return ne(e.type, true);
      case 31:
        return ee("Activity");
      default:
        return "";
    }
  }
  function ae(e) {
    try {
      var t = "";
      var n = null;
      do {
        t += re(e, n);
        n = e;
        e = e.return;
      } while (e);
      return t;
    } catch (r) {
      return "\nError generating stack: " + r.message + "\n" + r.stack;
    }
  }
  var le = Object.prototype.hasOwnProperty;
  var oe = t.unstable_scheduleCallback;
  var ie = t.unstable_cancelCallback;
  var ue = t.unstable_shouldYield;
  var se = t.unstable_requestPaint;
  var ce = t.unstable_now;
  var fe = t.unstable_getCurrentPriorityLevel;
  var de = t.unstable_ImmediatePriority;
  var he = t.unstable_UserBlockingPriority;
  var pe = t.unstable_NormalPriority;
  var me = t.unstable_LowPriority;
  var ge = t.unstable_IdlePriority;
  var ye = t.log;
  var ve = t.unstable_setDisableYieldValue;
  var be = null;
  var Se = null;
  function Ee(e) {
    if (typeof ye == "function") {
      ve(e);
    }
    if (Se && typeof Se.setStrictMode == "function") {
      try {
        Se.setStrictMode(be, e);
      } catch (t) {}
    }
  }
  var we = Math.clz32 ? Math.clz32 : function (e) {
    if ((e >>>= 0) === 0) {
      return 32;
    } else {
      return 31 - (ke(e) / Te | 0) | 0;
    }
  };
  var ke = Math.log;
  var Te = Math.LN2;
  var Pe = 256;
  var _e = 262144;
  var Ce = 4194304;
  function Ne(e) {
    var t = e & 42;
    if (t !== 0) {
      return t;
    }
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Le(e, t, n) {
    var r = e.pendingLanes;
    if (r === 0) {
      return 0;
    }
    var a = 0;
    var l = e.suspendedLanes;
    var o = e.pingedLanes;
    e = e.warmLanes;
    var i = r & 134217727;
    if (i !== 0) {
      if ((r = i & ~l) !== 0) {
        a = Ne(r);
      } else if ((o &= i) !== 0) {
        a = Ne(o);
      } else if (!n) {
        if ((n = i & ~e) !== 0) {
          a = Ne(n);
        }
      }
    } else if ((i = r & ~l) !== 0) {
      a = Ne(i);
    } else if (o !== 0) {
      a = Ne(o);
    } else if (!n) {
      if ((n = r & ~e) !== 0) {
        a = Ne(n);
      }
    }
    if (a === 0) {
      return 0;
    } else if (t !== 0 && t !== a && (t & l) === 0 && ((l = a & -a) >= (n = t & -t) || l === 32 && n & 4194048)) {
      return t;
    } else {
      return a;
    }
  }
  function Ae(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Oe(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5000;
      default:
        return -1;
    }
  }
  function xe() {
    var e = Ce;
    if (!((Ce <<= 1) & 62914560)) {
      Ce = 4194304;
    }
    return e;
  }
  function Re(e) {
    var t = [];
    for (var n = 0; n < 31; n++) {
      t.push(e);
    }
    return t;
  }
  function Ie(e, t) {
    e.pendingLanes |= t;
    if (t !== 268435456) {
      e.suspendedLanes = 0;
      e.pingedLanes = 0;
      e.warmLanes = 0;
    }
  }
  function Me(e, t, n) {
    e.pendingLanes |= t;
    e.suspendedLanes &= ~t;
    var r = 31 - we(t);
    e.entangledLanes |= t;
    e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
  }
  function He(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
      var r = 31 - we(n);
      var a = 1 << r;
      if (a & t | e[r] & t) {
        e[r] |= t;
      }
      n &= ~a;
    }
  }
  function De(e, t) {
    var n = t & -t;
    if (((n = n & 42 ? 1 : ze(n)) & (e.suspendedLanes | t)) !== 0) {
      return 0;
    } else {
      return n;
    }
  }
  function ze(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Fe(e) {
    if ((e &= -e) > 2) {
      if (e > 8) {
        if (e & 134217727) {
          return 32;
        } else {
          return 268435456;
        }
      } else {
        return 8;
      }
    } else {
      return 2;
    }
  }
  function Be() {
    var e = D.p;
    if (e !== 0) {
      return e;
    } else if ((e = window.event) === undefined) {
      return 32;
    } else {
      return Ld(e.type);
    }
  }
  function Ue(e, t) {
    var n = D.p;
    try {
      D.p = e;
      return t();
    } finally {
      D.p = n;
    }
  }
  var Ge = Math.random().toString(36).slice(2);
  var je = "__reactFiber$" + Ge;
  var Ve = "__reactProps$" + Ge;
  var $e = "__reactContainer$" + Ge;
  var We = "__reactEvents$" + Ge;
  var Qe = "__reactListeners$" + Ge;
  var qe = "__reactHandles$" + Ge;
  var Ke = "__reactResources$" + Ge;
  var Xe = "__reactMarker$" + Ge;
  function Ye(e) {
    delete e[je];
    delete e[Ve];
    delete e[We];
    delete e[Qe];
    delete e[qe];
  }
  function Ze(e) {
    var t = e[je];
    if (t) {
      return t;
    }
    for (var n = e.parentNode; n;) {
      if (t = n[$e] || n[je]) {
        n = t.alternate;
        if (t.child !== null || n !== null && n.child !== null) {
          for (e = Ff(e); e !== null;) {
            if (n = e[je]) {
              return n;
            }
            e = Ff(e);
          }
        }
        return t;
      }
      n = (e = n).parentNode;
    }
    return null;
  }
  function Je(e) {
    if (e = e[je] || e[$e]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) {
        return e;
      }
    }
    return null;
  }
  function et(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) {
      return e.stateNode;
    }
    throw Error(a(33));
  }
  function tt(e) {
    var t = e[Ke];
    t ||= e[Ke] = {
      hoistableStyles: new Map(),
      hoistableScripts: new Map()
    };
    return t;
  }
  function nt(e) {
    e[Xe] = true;
  }
  var rt = new Set();
  var at = {};
  function lt(e, t) {
    ot(e, t);
    ot(e + "Capture", t);
  }
  function ot(e, t) {
    at[e] = t;
    e = 0;
    for (; e < t.length; e++) {
      rt.add(t[e]);
    }
  }
  var it = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
  var ut = {};
  var st = {};
  function ct(e, t, n) {
    a = t;
    if (le.call(st, a) || !le.call(ut, a) && (it.test(a) ? st[a] = true : (ut[a] = true, 0))) {
      if (n === null) {
        e.removeAttribute(t);
      } else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var r = t.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
    }
    var a;
  }
  function ft(e, t, n) {
    if (n === null) {
      e.removeAttribute(t);
    } else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function dt(e, t, n, r) {
    if (r === null) {
      e.removeAttribute(n);
    } else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + r);
    }
  }
  function ht(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
      case "object":
        return e;
      default:
        return "";
    }
  }
  function pt(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function mt(e) {
    if (!e._valueTracker) {
      var t = pt(e) ? "checked" : "value";
      e._valueTracker = function (e, t, n) {
        var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
        if (!e.hasOwnProperty(t) && r !== undefined && typeof r.get == "function" && typeof r.set == "function") {
          var a = r.get;
          var l = r.set;
          Object.defineProperty(e, t, {
            configurable: true,
            get: function () {
              return a.call(this);
            },
            set: function (e) {
              n = "" + e;
              l.call(this, e);
            }
          });
          Object.defineProperty(e, t, {
            enumerable: r.enumerable
          });
          return {
            getValue: function () {
              return n;
            },
            setValue: function (e) {
              n = "" + e;
            },
            stopTracking: function () {
              e._valueTracker = null;
              delete e[t];
            }
          };
        }
      }(e, t, "" + e[t]);
    }
  }
  function gt(e) {
    if (!e) {
      return false;
    }
    var t = e._valueTracker;
    if (!t) {
      return true;
    }
    var n = t.getValue();
    var r = "";
    if (e) {
      r = pt(e) ? e.checked ? "true" : "false" : e.value;
    }
    return (e = r) !== n && (t.setValue(e), true);
  }
  function yt(e) {
    if ((e = e || (typeof document != "undefined" ? document : undefined)) === undefined) {
      return null;
    }
    try {
      return e.activeElement || e.body;
    } catch (t) {
      return e.body;
    }
  }
  var vt = /[\n"\\]/g;
  function bt(e) {
    return e.replace(vt, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function St(e, t, n, r, a, l, o, i) {
    e.name = "";
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean") {
      e.type = o;
    } else {
      e.removeAttribute("type");
    }
    if (t != null) {
      if (o === "number") {
        if (t === 0 && e.value === "" || e.value != t) {
          e.value = "" + ht(t);
        }
      } else if (e.value !== "" + ht(t)) {
        e.value = "" + ht(t);
      }
    } else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
    }
    if (t != null) {
      wt(e, o, ht(t));
    } else if (n != null) {
      wt(e, o, ht(n));
    } else if (r != null) {
      e.removeAttribute("value");
    }
    if (a == null && l != null) {
      e.defaultChecked = !!l;
    }
    if (a != null) {
      e.checked = a && typeof a != "function" && typeof a != "symbol";
    }
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean") {
      e.name = "" + ht(i);
    } else {
      e.removeAttribute("name");
    }
  }
  function Et(e, t, n, r, a, l, o, i) {
    if (l != null && typeof l != "function" && typeof l != "symbol" && typeof l != "boolean") {
      e.type = l;
    }
    if (t != null || n != null) {
      if ((l === "submit" || l === "reset") && t == null) {
        mt(e);
        return;
      }
      n = n != null ? "" + ht(n) : "";
      t = t != null ? "" + ht(t) : n;
      if (!i && t !== e.value) {
        e.value = t;
      }
      e.defaultValue = t;
    }
    r = typeof (r = r ?? a) != "function" && typeof r != "symbol" && !!r;
    e.checked = i ? e.checked : !!r;
    e.defaultChecked = !!r;
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean") {
      e.name = o;
    }
    mt(e);
  }
  function wt(e, t, n) {
    if ((t !== "number" || yt(e.ownerDocument) !== e) && e.defaultValue !== "" + n) {
      e.defaultValue = "" + n;
    }
  }
  function kt(e, t, n, r) {
    e = e.options;
    if (t) {
      t = {};
      for (var a = 0; a < n.length; a++) {
        t["$" + n[a]] = true;
      }
      for (n = 0; n < e.length; n++) {
        a = t.hasOwnProperty("$" + e[n].value);
        if (e[n].selected !== a) {
          e[n].selected = a;
        }
        if (a && r) {
          e[n].defaultSelected = true;
        }
      }
    } else {
      n = "" + ht(n);
      t = null;
      a = 0;
      for (; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = true;
          if (r) {
            e[a].defaultSelected = true;
          }
          return;
        }
        if (t === null && !e[a].disabled) {
          t = e[a];
        }
      }
      if (t !== null) {
        t.selected = true;
      }
    }
  }
  function Tt(e, t, n) {
    if (t == null || ((t = "" + ht(t)) !== e.value && (e.value = t), n != null)) {
      e.defaultValue = n != null ? "" + ht(n) : "";
    } else if (e.defaultValue !== t) {
      e.defaultValue = t;
    }
  }
  function Pt(e, t, n, r) {
    if (t == null) {
      if (r != null) {
        if (n != null) {
          throw Error(a(92));
        }
        if (M(r)) {
          if (r.length > 1) {
            throw Error(a(93));
          }
          r = r[0];
        }
        n = r;
      }
      if (n == null) {
        n = "";
      }
      t = n;
    }
    n = ht(t);
    e.defaultValue = n;
    if ((r = e.textContent) === n && r !== "" && r !== null) {
      e.value = r;
    }
    mt(e);
  }
  function _t(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ct = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Nt(e, t, n) {
    var r = t.indexOf("--") === 0;
    if (n == null || typeof n == "boolean" || n === "") {
      if (r) {
        e.setProperty(t, "");
      } else if (t === "float") {
        e.cssFloat = "";
      } else {
        e[t] = "";
      }
    } else if (r) {
      e.setProperty(t, n);
    } else if (typeof n != "number" || n === 0 || Ct.has(t)) {
      if (t === "float") {
        e.cssFloat = n;
      } else {
        e[t] = ("" + n).trim();
      }
    } else {
      e[t] = n + "px";
    }
  }
  function Lt(e, t, n) {
    if (t != null && typeof t != "object") {
      throw Error(a(62));
    }
    e = e.style;
    if (n != null) {
      for (var r in n) {
        if (!!n.hasOwnProperty(r) && (t == null || !t.hasOwnProperty(r))) {
          if (r.indexOf("--") === 0) {
            e.setProperty(r, "");
          } else if (r === "float") {
            e.cssFloat = "";
          } else {
            e[r] = "";
          }
        }
      }
      for (var l in t) {
        r = t[l];
        if (t.hasOwnProperty(l) && n[l] !== r) {
          Nt(e, l, r);
        }
      }
    } else {
      for (var o in t) {
        if (t.hasOwnProperty(o)) {
          Nt(e, o, t[o]);
        }
      }
    }
  }
  function At(e) {
    if (e.indexOf("-") === -1) {
      return false;
    }
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var Ot = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]);
  var xt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Rt(e) {
    if (xt.test("" + e)) {
      return "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')";
    } else {
      return e;
    }
  }
  function It() {}
  var Mt = null;
  function Ht(e) {
    if ((e = e.target || e.srcElement || window).correspondingUseElement) {
      e = e.correspondingUseElement;
    }
    if (e.nodeType === 3) {
      return e.parentNode;
    } else {
      return e;
    }
  }
  var Dt = null;
  var zt = null;
  function Ft(e) {
    var t = Je(e);
    if (t && (e = t.stateNode)) {
      var n = e[Ve] || null;
      e = t.stateNode;
      e: switch (t.type) {
        case "input":
          St(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
          t = n.name;
          if (n.type === "radio" && t != null) {
            for (n = e; n.parentNode;) {
              n = n.parentNode;
            }
            n = n.querySelectorAll("input[name=\"" + bt("" + t) + "\"][type=\"radio\"]");
            t = 0;
            for (; t < n.length; t++) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var l = r[Ve] || null;
                if (!l) {
                  throw Error(a(90));
                }
                St(r, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name);
              }
            }
            for (t = 0; t < n.length; t++) {
              if ((r = n[t]).form === e.form) {
                gt(r);
              }
            }
          }
          break e;
        case "textarea":
          Tt(e, n.value, n.defaultValue);
          break e;
        case "select":
          if ((t = n.value) != null) {
            kt(e, !!n.multiple, t, false);
          }
      }
    }
  }
  var Bt = false;
  function Ut(e, t, n) {
    if (Bt) {
      return e(t, n);
    }
    Bt = true;
    try {
      return e(t);
    } finally {
      Bt = false;
      if ((Dt !== null || zt !== null) && (tc(), Dt && (t = Dt, e = zt, zt = Dt = null, Ft(t), e))) {
        for (t = 0; t < e.length; t++) {
          Ft(e[t]);
        }
      }
    }
  }
  function Gt(e, t) {
    var n = e.stateNode;
    if (n === null) {
      return null;
    }
    var r = n[Ve] || null;
    if (r === null) {
      return null;
    }
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        if (!(r = !r.disabled)) {
          r = (e = e.type) !== "button" && e !== "input" && e !== "select" && e !== "textarea";
        }
        e = !r;
        break e;
      default:
        e = false;
    }
    if (e) {
      return null;
    }
    if (n && typeof n != "function") {
      throw Error(a(231, t, typeof n));
    }
    return n;
  }
  var jt = typeof window != "undefined" && window.document !== undefined && window.document.createElement !== undefined;
  var Vt = false;
  if (jt) {
    try {
      var $t = {};
      Object.defineProperty($t, "passive", {
        get: function () {
          Vt = true;
        }
      });
      window.addEventListener("test", $t, $t);
      window.removeEventListener("test", $t, $t);
    } catch (eh) {
      Vt = false;
    }
  }
  var Wt = null;
  var Qt = null;
  var qt = null;
  function Kt() {
    if (qt) {
      return qt;
    }
    var e;
    var t;
    var n = Qt;
    var r = n.length;
    var a = "value" in Wt ? Wt.value : Wt.textContent;
    var l = a.length;
    for (e = 0; e < r && n[e] === a[e]; e++);
    var o = r - e;
    for (t = 1; t <= o && n[r - t] === a[l - t]; t++);
    return qt = a.slice(e, t > 1 ? 1 - t : undefined);
  }
  function Xt(e) {
    var t = e.keyCode;
    if ("charCode" in e) {
      if ((e = e.charCode) === 0 && t === 13) {
        e = 13;
      }
    } else {
      e = t;
    }
    if (e === 10) {
      e = 13;
    }
    if (e >= 32 || e === 13) {
      return e;
    } else {
      return 0;
    }
  }
  function Yt() {
    return true;
  }
  function Zt() {
    return false;
  }
  function Jt(e) {
    function t(t, n, r, a, l) {
      this._reactName = t;
      this._targetInst = r;
      this.type = n;
      this.nativeEvent = a;
      this.target = l;
      this.currentTarget = null;
      for (var o in e) {
        if (e.hasOwnProperty(o)) {
          t = e[o];
          this[o] = t ? t(a) : a[o];
        }
      }
      this.isDefaultPrevented = a.defaultPrevented ?? a.returnValue === false ? Yt : Zt;
      this.isPropagationStopped = Zt;
      return this;
    }
    p(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = true;
        var e = this.nativeEvent;
        if (e) {
          if (e.preventDefault) {
            e.preventDefault();
          } else if (typeof e.returnValue != "unknown") {
            e.returnValue = false;
          }
          this.isDefaultPrevented = Yt;
        }
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        if (e) {
          if (e.stopPropagation) {
            e.stopPropagation();
          } else if (typeof e.cancelBubble != "unknown") {
            e.cancelBubble = true;
          }
          this.isPropagationStopped = Yt;
        }
      },
      persist: function () {},
      isPersistent: Yt
    });
    return t;
  }
  var en;
  var tn;
  var nn;
  var rn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  };
  var an = Jt(rn);
  var ln = p({}, rn, {
    view: 0,
    detail: 0
  });
  var on = Jt(ln);
  var un = p({}, ln, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: bn,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      if (e.relatedTarget === undefined) {
        if (e.fromElement === e.srcElement) {
          return e.toElement;
        } else {
          return e.fromElement;
        }
      } else {
        return e.relatedTarget;
      }
    },
    movementX: function (e) {
      if ("movementX" in e) {
        return e.movementX;
      } else {
        if (e !== nn) {
          if (nn && e.type === "mousemove") {
            en = e.screenX - nn.screenX;
            tn = e.screenY - nn.screenY;
          } else {
            tn = en = 0;
          }
          nn = e;
        }
        return en;
      }
    },
    movementY: function (e) {
      if ("movementY" in e) {
        return e.movementY;
      } else {
        return tn;
      }
    }
  });
  var sn = Jt(un);
  var cn = Jt(p({}, un, {
    dataTransfer: 0
  }));
  var fn = Jt(p({}, ln, {
    relatedTarget: 0
  }));
  var dn = Jt(p({}, rn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }));
  var hn = Jt(p({}, rn, {
    clipboardData: function (e) {
      if ("clipboardData" in e) {
        return e.clipboardData;
      } else {
        return window.clipboardData;
      }
    }
  }));
  var pn = Jt(p({}, rn, {
    data: 0
  }));
  var mn = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  };
  var gn = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  };
  var yn = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vn(e) {
    var t = this.nativeEvent;
    if (t.getModifierState) {
      return t.getModifierState(e);
    } else {
      return !!(e = yn[e]) && !!t[e];
    }
  }
  function bn() {
    return vn;
  }
  var Sn = Jt(p({}, ln, {
    key: function (e) {
      if (e.key) {
        var t = mn[e.key] || e.key;
        if (t !== "Unidentified") {
          return t;
        }
      }
      if (e.type === "keypress") {
        if ((e = Xt(e)) === 13) {
          return "Enter";
        } else {
          return String.fromCharCode(e);
        }
      } else if (e.type === "keydown" || e.type === "keyup") {
        return gn[e.keyCode] || "Unidentified";
      } else {
        return "";
      }
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: bn,
    charCode: function (e) {
      if (e.type === "keypress") {
        return Xt(e);
      } else {
        return 0;
      }
    },
    keyCode: function (e) {
      if (e.type === "keydown" || e.type === "keyup") {
        return e.keyCode;
      } else {
        return 0;
      }
    },
    which: function (e) {
      if (e.type === "keypress") {
        return Xt(e);
      } else if (e.type === "keydown" || e.type === "keyup") {
        return e.keyCode;
      } else {
        return 0;
      }
    }
  }));
  var En = Jt(p({}, un, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }));
  var wn = Jt(p({}, ln, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: bn
  }));
  var kn = Jt(p({}, rn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }));
  var Tn = Jt(p({}, un, {
    deltaX: function (e) {
      if ("deltaX" in e) {
        return e.deltaX;
      } else if ("wheelDeltaX" in e) {
        return -e.wheelDeltaX;
      } else {
        return 0;
      }
    },
    deltaY: function (e) {
      if ("deltaY" in e) {
        return e.deltaY;
      } else if ("wheelDeltaY" in e) {
        return -e.wheelDeltaY;
      } else if ("wheelDelta" in e) {
        return -e.wheelDelta;
      } else {
        return 0;
      }
    },
    deltaZ: 0,
    deltaMode: 0
  }));
  var Pn = Jt(p({}, rn, {
    newState: 0,
    oldState: 0
  }));
  var _n = [9, 13, 27, 32];
  var Cn = jt && "CompositionEvent" in window;
  var Nn = null;
  if (jt && "documentMode" in document) {
    Nn = document.documentMode;
  }
  var Ln = jt && "TextEvent" in window && !Nn;
  var An = jt && (!Cn || Nn && Nn > 8 && Nn <= 11);
  var On = String.fromCharCode(32);
  var xn = false;
  function Rn(e, t) {
    switch (e) {
      case "keyup":
        return _n.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function In(e) {
    if (typeof (e = e.detail) == "object" && "data" in e) {
      return e.data;
    } else {
      return null;
    }
  }
  var Mn = false;
  var Hn = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  };
  function Dn(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    if (t === "input") {
      return !!Hn[e.type];
    } else {
      return t === "textarea";
    }
  }
  function zn(e, t, n, r) {
    if (Dt) {
      if (zt) {
        zt.push(r);
      } else {
        zt = [r];
      }
    } else {
      Dt = r;
    }
    if ((t = lf(t, "onChange")).length > 0) {
      n = new an("onChange", "change", null, n, r);
      e.push({
        event: n,
        listeners: t
      });
    }
  }
  var Fn = null;
  var Bn = null;
  function Un(e) {
    Yc(e, 0);
  }
  function Gn(e) {
    if (gt(et(e))) {
      return e;
    }
  }
  function jn(e, t) {
    if (e === "change") {
      return t;
    }
  }
  var Vn = false;
  if (jt) {
    var $n;
    if (jt) {
      var Wn = "oninput" in document;
      if (!Wn) {
        var Qn = document.createElement("div");
        Qn.setAttribute("oninput", "return;");
        Wn = typeof Qn.oninput == "function";
      }
      $n = Wn;
    } else {
      $n = false;
    }
    Vn = $n && (!document.documentMode || document.documentMode > 9);
  }
  function qn() {
    if (Fn) {
      Fn.detachEvent("onpropertychange", Kn);
      Bn = Fn = null;
    }
  }
  function Kn(e) {
    if (e.propertyName === "value" && Gn(Bn)) {
      var t = [];
      zn(t, Bn, e, Ht(e));
      Ut(Un, t);
    }
  }
  function Xn(e, t, n) {
    if (e === "focusin") {
      qn();
      Bn = n;
      (Fn = t).attachEvent("onpropertychange", Kn);
    } else if (e === "focusout") {
      qn();
    }
  }
  function Yn(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") {
      return Gn(Bn);
    }
  }
  function Zn(e, t) {
    if (e === "click") {
      return Gn(t);
    }
  }
  function Jn(e, t) {
    if (e === "input" || e === "change") {
      return Gn(t);
    }
  }
  var er = typeof Object.is == "function" ? Object.is : function (e, t) {
    return e === t && (e !== 0 || 1 / e == 1 / t) || e != e && t != t;
  };
  function tr(e, t) {
    if (er(e, t)) {
      return true;
    }
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) {
      return false;
    }
    var n = Object.keys(e);
    var r = Object.keys(t);
    if (n.length !== r.length) {
      return false;
    }
    for (r = 0; r < n.length; r++) {
      var a = n[r];
      if (!le.call(t, a) || !er(e[a], t[a])) {
        return false;
      }
    }
    return true;
  }
  function nr(e) {
    while (e && e.firstChild) {
      e = e.firstChild;
    }
    return e;
  }
  function rr(e, t) {
    var n;
    var r = nr(e);
    for (e = 0; r;) {
      if (r.nodeType === 3) {
        n = e + r.textContent.length;
        if (e <= t && n >= t) {
          return {
            node: r,
            offset: t - e
          };
        }
        e = n;
      }
      e: {
        while (r) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = undefined;
      }
      r = nr(r);
    }
  }
  function ar(e, t) {
    return !!e && !!t && (e === t || (!e || e.nodeType !== 3) && (t && t.nodeType === 3 ? ar(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(e.compareDocumentPosition(t) & 16)));
  }
  function lr(e) {
    for (var t = yt((e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window).document); t instanceof e.HTMLIFrameElement;) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch (r) {
        n = false;
      }
      if (!n) {
        break;
      }
      t = yt((e = t.contentWindow).document);
    }
    return t;
  }
  function or(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var ir = jt && "documentMode" in document && document.documentMode <= 11;
  var ur = null;
  var sr = null;
  var cr = null;
  var fr = false;
  function dr(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    if (!fr && ur != null && ur === yt(r)) {
      if ("selectionStart" in (r = ur) && or(r)) {
        r = {
          start: r.selectionStart,
          end: r.selectionEnd
        };
      } else {
        r = {
          anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset
        };
      }
      if (!cr || !tr(cr, r)) {
        cr = r;
        if ((r = lf(sr, "onSelect")).length > 0) {
          t = new an("onSelect", "select", null, t, n);
          e.push({
            event: t,
            listeners: r
          });
          t.target = ur;
        }
      }
    }
  }
  function hr(e, t) {
    var n = {};
    n[e.toLowerCase()] = t.toLowerCase();
    n["Webkit" + e] = "webkit" + t;
    n["Moz" + e] = "moz" + t;
    return n;
  }
  var pr = {
    animationend: hr("Animation", "AnimationEnd"),
    animationiteration: hr("Animation", "AnimationIteration"),
    animationstart: hr("Animation", "AnimationStart"),
    transitionrun: hr("Transition", "TransitionRun"),
    transitionstart: hr("Transition", "TransitionStart"),
    transitioncancel: hr("Transition", "TransitionCancel"),
    transitionend: hr("Transition", "TransitionEnd")
  };
  var mr = {};
  var gr = {};
  function yr(e) {
    if (mr[e]) {
      return mr[e];
    }
    if (!pr[e]) {
      return e;
    }
    var t;
    var n = pr[e];
    for (t in n) {
      if (n.hasOwnProperty(t) && t in gr) {
        return mr[e] = n[t];
      }
    }
    return e;
  }
  if (jt) {
    gr = document.createElement("div").style;
    if (!("AnimationEvent" in window)) {
      delete pr.animationend.animation;
      delete pr.animationiteration.animation;
      delete pr.animationstart.animation;
    }
    if (!("TransitionEvent" in window)) {
      delete pr.transitionend.transition;
    }
  }
  var vr = yr("animationend");
  var br = yr("animationiteration");
  var Sr = yr("animationstart");
  var Er = yr("transitionrun");
  var wr = yr("transitionstart");
  var kr = yr("transitioncancel");
  var Tr = yr("transitionend");
  var Pr = new Map();
  var _r = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Cr(e, t) {
    Pr.set(e, t);
    lt(t, [e]);
  }
  _r.push("scrollEnd");
  var Nr = typeof reportError == "function" ? reportError : function (e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) {
        return;
      }
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
  };
  var Lr = [];
  var Ar = 0;
  var Or = 0;
  function xr() {
    for (var e = Ar, t = Or = Ar = 0; t < e;) {
      var n = Lr[t];
      Lr[t++] = null;
      var r = Lr[t];
      Lr[t++] = null;
      var a = Lr[t];
      Lr[t++] = null;
      var l = Lr[t];
      Lr[t++] = null;
      if (r !== null && a !== null) {
        var o = r.pending;
        if (o === null) {
          a.next = a;
        } else {
          a.next = o.next;
          o.next = a;
        }
        r.pending = a;
      }
      if (l !== 0) {
        Hr(n, a, l);
      }
    }
  }
  function Rr(e, t, n, r) {
    Lr[Ar++] = e;
    Lr[Ar++] = t;
    Lr[Ar++] = n;
    Lr[Ar++] = r;
    Or |= r;
    e.lanes |= r;
    if ((e = e.alternate) !== null) {
      e.lanes |= r;
    }
  }
  function Ir(e, t, n, r) {
    Rr(e, t, n, r);
    return Dr(e);
  }
  function Mr(e, t) {
    Rr(e, null, null, t);
    return Dr(e);
  }
  function Hr(e, t, n) {
    e.lanes |= n;
    var r = e.alternate;
    if (r !== null) {
      r.lanes |= n;
    }
    var a = false;
    for (var l = e.return; l !== null;) {
      l.childLanes |= n;
      if ((r = l.alternate) !== null) {
        r.childLanes |= n;
      }
      if (l.tag === 22) {
        if ((e = l.stateNode) !== null && !(e._visibility & 1)) {
          a = true;
        }
      }
      e = l;
      l = l.return;
    }
    if (e.tag === 3) {
      l = e.stateNode;
      if (a && t !== null) {
        a = 31 - we(n);
        if ((r = (e = l.hiddenUpdates)[a]) === null) {
          e[a] = [t];
        } else {
          r.push(t);
        }
        t.lane = n | 536870912;
      }
      return l;
    } else {
      return null;
    }
  }
  function Dr(e) {
    if (Ws > 50) {
      Ws = 0;
      Qs = null;
      throw Error(a(185));
    }
    for (var t = e.return; t !== null;) {
      t = (e = t).return;
    }
    if (e.tag === 3) {
      return e.stateNode;
    } else {
      return null;
    }
  }
  var zr = {};
  function Fr(e, t, n, r) {
    this.tag = e;
    this.key = n;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.refCleanup = this.ref = null;
    this.pendingProps = t;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = r;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Br(e, t, n, r) {
    return new Fr(e, t, n, r);
  }
  function Ur(e) {
    return !!(e = e.prototype) && !!e.isReactComponent;
  }
  function Gr(e, t) {
    var n = e.alternate;
    if (n === null) {
      (n = Br(e.tag, t, e.key, e.mode)).elementType = e.elementType;
      n.type = e.type;
      n.stateNode = e.stateNode;
      n.alternate = e;
      e.alternate = n;
    } else {
      n.pendingProps = t;
      n.type = e.type;
      n.flags = 0;
      n.subtreeFlags = 0;
      n.deletions = null;
    }
    n.flags = e.flags & 65011712;
    n.childLanes = e.childLanes;
    n.lanes = e.lanes;
    n.child = e.child;
    n.memoizedProps = e.memoizedProps;
    n.memoizedState = e.memoizedState;
    n.updateQueue = e.updateQueue;
    t = e.dependencies;
    n.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    };
    n.sibling = e.sibling;
    n.index = e.index;
    n.ref = e.ref;
    n.refCleanup = e.refCleanup;
    return n;
  }
  function jr(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    if (n === null) {
      e.childLanes = 0;
      e.lanes = t;
      e.child = null;
      e.subtreeFlags = 0;
      e.memoizedProps = null;
      e.memoizedState = null;
      e.updateQueue = null;
      e.dependencies = null;
      e.stateNode = null;
    } else {
      e.childLanes = n.childLanes;
      e.lanes = n.lanes;
      e.child = n.child;
      e.subtreeFlags = 0;
      e.deletions = null;
      e.memoizedProps = n.memoizedProps;
      e.memoizedState = n.memoizedState;
      e.updateQueue = n.updateQueue;
      e.type = n.type;
      t = n.dependencies;
      e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      };
    }
    return e;
  }
  function Vr(e, t, n, r, l, o) {
    var i = 0;
    r = e;
    if (typeof e == "function") {
      if (Ur(e)) {
        i = 1;
      }
    } else if (typeof e == "string") {
      i = function (e, t, n) {
        if (n === 1 || t.itemProp != null) {
          return false;
        }
        switch (e) {
          case "meta":
          case "title":
            return true;
          case "style":
            if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
              break;
            }
            return true;
          case "link":
            if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
              break;
            }
            return t.rel !== "stylesheet" || (e = t.disabled, typeof t.precedence == "string" && e == null);
          case "script":
            if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") {
              return true;
            }
        }
        return false;
      }(e, n, W.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    } else {
      e: switch (e) {
        case L:
          (e = Br(31, n, t, l)).elementType = L;
          e.lanes = o;
          return e;
        case b:
          return $r(n.children, l, o, t);
        case S:
          i = 8;
          l |= 24;
          break;
        case E:
          (e = Br(12, n, t, l | 2)).elementType = E;
          e.lanes = o;
          return e;
        case P:
          (e = Br(13, n, t, l)).elementType = P;
          e.lanes = o;
          return e;
        case _:
          (e = Br(19, n, t, l)).elementType = _;
          e.lanes = o;
          return e;
        default:
          if (typeof e == "object" && e !== null) {
            switch (e.$$typeof) {
              case k:
                i = 10;
                break e;
              case w:
                i = 9;
                break e;
              case T:
                i = 11;
                break e;
              case C:
                i = 14;
                break e;
              case N:
                i = 16;
                r = null;
                break e;
            }
          }
          i = 29;
          n = Error(a(130, e === null ? "null" : typeof e, ""));
          r = null;
      }
    }
    (t = Br(i, n, t, l)).elementType = e;
    t.type = r;
    t.lanes = o;
    return t;
  }
  function $r(e, t, n, r) {
    (e = Br(7, e, r, t)).lanes = n;
    return e;
  }
  function Wr(e, t, n) {
    (e = Br(6, e, null, t)).lanes = n;
    return e;
  }
  function Qr(e) {
    var t = Br(18, null, null, 0);
    t.stateNode = e;
    return t;
  }
  function qr(e, t, n) {
    (t = Br(4, e.children !== null ? e.children : [], e.key, t)).lanes = n;
    t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    };
    return t;
  }
  var Kr = new WeakMap();
  function Xr(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Kr.get(e);
      if (n !== undefined) {
        return n;
      } else {
        t = {
          value: e,
          source: t,
          stack: ae(t)
        };
        Kr.set(e, t);
        return t;
      }
    }
    return {
      value: e,
      source: t,
      stack: ae(t)
    };
  }
  var Yr = [];
  var Zr = 0;
  var Jr = null;
  var ea = 0;
  var ta = [];
  var na = 0;
  var ra = null;
  var aa = 1;
  var la = "";
  function oa(e, t) {
    Yr[Zr++] = ea;
    Yr[Zr++] = Jr;
    Jr = e;
    ea = t;
  }
  function ia(e, t, n) {
    ta[na++] = aa;
    ta[na++] = la;
    ta[na++] = ra;
    ra = e;
    var r = aa;
    e = la;
    var a = 32 - we(r) - 1;
    r &= ~(1 << a);
    n += 1;
    var l = 32 - we(t) + a;
    if (l > 30) {
      var o = a - a % 5;
      l = (r & (1 << o) - 1).toString(32);
      r >>= o;
      a -= o;
      aa = 1 << 32 - we(t) + a | n << a | r;
      la = l + e;
    } else {
      aa = 1 << l | n << a | r;
      la = e;
    }
  }
  function ua(e) {
    if (e.return !== null) {
      oa(e, 1);
      ia(e, 1, 0);
    }
  }
  function sa(e) {
    while (e === Jr) {
      Jr = Yr[--Zr];
      Yr[Zr] = null;
      ea = Yr[--Zr];
      Yr[Zr] = null;
    }
    while (e === ra) {
      ra = ta[--na];
      ta[na] = null;
      la = ta[--na];
      ta[na] = null;
      aa = ta[--na];
      ta[na] = null;
    }
  }
  function ca(e, t) {
    ta[na++] = aa;
    ta[na++] = la;
    ta[na++] = ra;
    aa = t.id;
    la = t.overflow;
    ra = e;
  }
  var fa = null;
  var da = null;
  var ha = false;
  var pa = null;
  var ma = false;
  var ga = Error(a(519));
  function ya(e) {
    ka(Xr(Error(a(418, arguments.length > 1 && arguments[1] !== undefined && arguments[1] ? "text" : "HTML", "")), e));
    throw ga;
  }
  function va(e) {
    var t = e.stateNode;
    var n = e.type;
    var r = e.memoizedProps;
    t[je] = e;
    t[Ve] = r;
    switch (n) {
      case "dialog":
        Zc("cancel", t);
        Zc("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Zc("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Kc.length; n++) {
          Zc(Kc[n], t);
        }
        break;
      case "source":
        Zc("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Zc("error", t);
        Zc("load", t);
        break;
      case "details":
        Zc("toggle", t);
        break;
      case "input":
        Zc("invalid", t);
        Et(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, true);
        break;
      case "select":
        Zc("invalid", t);
        break;
      case "textarea":
        Zc("invalid", t);
        Pt(t, r.value, r.defaultValue, r.children);
    }
    if (typeof (n = r.children) != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || r.suppressHydrationWarning === true || df(t.textContent, n)) {
      if (r.popover != null) {
        Zc("beforetoggle", t);
        Zc("toggle", t);
      }
      if (r.onScroll != null) {
        Zc("scroll", t);
      }
      if (r.onScrollEnd != null) {
        Zc("scrollend", t);
      }
      if (r.onClick != null) {
        t.onclick = It;
      }
      t = true;
    } else {
      t = false;
    }
    if (!t) {
      ya(e, true);
    }
  }
  function ba(e) {
    for (fa = e.return; fa;) {
      switch (fa.tag) {
        case 5:
        case 31:
        case 13:
          ma = false;
          return;
        case 27:
        case 3:
          ma = true;
          return;
        default:
          fa = fa.return;
      }
    }
  }
  function Sa(e) {
    if (e !== fa) {
      return false;
    }
    if (!ha) {
      ba(e);
      ha = true;
      return false;
    }
    var t;
    var n = e.tag;
    if (t = n !== 3 && n !== 27) {
      if (t = n === 5) {
        t = (t = e.type) === "form" || t === "button" || wf(e.type, e.memoizedProps);
      }
      t = !t;
    }
    if (t && da) {
      ya(e);
    }
    ba(e);
    if (n === 13) {
      if (!(e = (e = e.memoizedState) !== null ? e.dehydrated : null)) {
        throw Error(a(317));
      }
      da = zf(e);
    } else if (n === 31) {
      if (!(e = (e = e.memoizedState) !== null ? e.dehydrated : null)) {
        throw Error(a(317));
      }
      da = zf(e);
    } else if (n === 27) {
      n = da;
      if (Lf(e.type)) {
        e = Df;
        Df = null;
        da = e;
      } else {
        da = n;
      }
    } else {
      da = fa ? Hf(e.stateNode.nextSibling) : null;
    }
    return true;
  }
  function Ea() {
    da = fa = null;
    ha = false;
  }
  function wa() {
    var e = pa;
    if (e !== null) {
      if (xs === null) {
        xs = e;
      } else {
        xs.push.apply(xs, e);
      }
      pa = null;
    }
    return e;
  }
  function ka(e) {
    if (pa === null) {
      pa = [e];
    } else {
      pa.push(e);
    }
  }
  var Ta = U(null);
  var Pa = null;
  var _a = null;
  function Ca(e, t, n) {
    j(Ta, t._currentValue);
    t._currentValue = n;
  }
  function Na(e) {
    e._currentValue = Ta.current;
    G(Ta);
  }
  function La(e, t, n) {
    while (e !== null) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t) {
        e.childLanes |= t;
        if (r !== null) {
          r.childLanes |= t;
        }
      } else if (r !== null && (r.childLanes & t) !== t) {
        r.childLanes |= t;
      }
      if (e === n) {
        break;
      }
      e = e.return;
    }
  }
  function Aa(e, t, n, r) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null;) {
      var o = l.dependencies;
      if (o !== null) {
        var i = l.child;
        o = o.firstContext;
        e: while (o !== null) {
          var u = o;
          o = l;
          for (var s = 0; s < t.length; s++) {
            if (u.context === t[s]) {
              o.lanes |= n;
              if ((u = o.alternate) !== null) {
                u.lanes |= n;
              }
              La(o.return, n, e);
              if (!r) {
                i = null;
              }
              break e;
            }
          }
          o = u.next;
        }
      } else if (l.tag === 18) {
        if ((i = l.return) === null) {
          throw Error(a(341));
        }
        i.lanes |= n;
        if ((o = i.alternate) !== null) {
          o.lanes |= n;
        }
        La(i, n, e);
        i = null;
      } else {
        i = l.child;
      }
      if (i !== null) {
        i.return = l;
      } else {
        for (i = l; i !== null;) {
          if (i === e) {
            i = null;
            break;
          }
          if ((l = i.sibling) !== null) {
            l.return = i.return;
            i = l;
            break;
          }
          i = i.return;
        }
      }
      l = i;
    }
  }
  function Oa(e, t, n, r) {
    e = null;
    for (var l = t, o = false; l !== null;) {
      if (!o) {
        if (l.flags & 524288) {
          o = true;
        } else if (l.flags & 262144) {
          break;
        }
      }
      if (l.tag === 10) {
        var i = l.alternate;
        if (i === null) {
          throw Error(a(387));
        }
        if ((i = i.memoizedProps) !== null) {
          var u = l.type;
          if (!er(l.pendingProps.value, i.value)) {
            if (e !== null) {
              e.push(u);
            } else {
              e = [u];
            }
          }
        }
      } else if (l === K.current) {
        if ((i = l.alternate) === null) {
          throw Error(a(387));
        }
        if (i.memoizedState.memoizedState !== l.memoizedState.memoizedState) {
          if (e !== null) {
            e.push(hd);
          } else {
            e = [hd];
          }
        }
      }
      l = l.return;
    }
    if (e !== null) {
      Aa(t, e, n, r);
    }
    t.flags |= 262144;
  }
  function xa(e) {
    for (e = e.firstContext; e !== null;) {
      if (!er(e.context._currentValue, e.memoizedValue)) {
        return true;
      }
      e = e.next;
    }
    return false;
  }
  function Ra(e) {
    Pa = e;
    _a = null;
    if ((e = e.dependencies) !== null) {
      e.firstContext = null;
    }
  }
  function Ia(e) {
    return Ha(Pa, e);
  }
  function Ma(e, t) {
    if (Pa === null) {
      Ra(e);
    }
    return Ha(e, t);
  }
  function Ha(e, t) {
    var n = t._currentValue;
    t = {
      context: t,
      memoizedValue: n,
      next: null
    };
    if (_a === null) {
      if (e === null) {
        throw Error(a(308));
      }
      _a = t;
      e.dependencies = {
        lanes: 0,
        firstContext: t
      };
      e.flags |= 524288;
    } else {
      _a = _a.next = t;
    }
    return n;
  }
  var Da = typeof AbortController != "undefined" ? AbortController : function () {
    var e = [];
    var t = this.signal = {
      aborted: false,
      addEventListener: function (t, n) {
        e.push(n);
      }
    };
    this.abort = function () {
      t.aborted = true;
      e.forEach(function (e) {
        return e();
      });
    };
  };
  var za = t.unstable_scheduleCallback;
  var Fa = t.unstable_NormalPriority;
  var Ba = {
    $$typeof: k,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ua() {
    return {
      controller: new Da(),
      data: new Map(),
      refCount: 0
    };
  }
  function Ga(e) {
    e.refCount--;
    if (e.refCount === 0) {
      za(Fa, function () {
        e.controller.abort();
      });
    }
  }
  var ja = null;
  var Va = 0;
  var $a = 0;
  var Wa = null;
  function Qa() {
    if (--Va === 0 && ja !== null) {
      if (Wa !== null) {
        Wa.status = "fulfilled";
      }
      var e = ja;
      ja = null;
      $a = 0;
      Wa = null;
      for (var t = 0; t < e.length; t++) {
        (0, e[t])();
      }
    }
  }
  var qa = H.S;
  H.S = function (e, t) {
    Ms = ce();
    if (typeof t == "object" && t !== null && typeof t.then == "function") {
      (function (e, t) {
        if (ja === null) {
          var n = ja = [];
          Va = 0;
          $a = Vc();
          Wa = {
            status: "pending",
            value: undefined,
            then: function (e) {
              n.push(e);
            }
          };
        }
        Va++;
        t.then(Qa, Qa);
      })(0, t);
    }
    if (qa !== null) {
      qa(e, t);
    }
  };
  var Ka = U(null);
  function Xa() {
    var e = Ka.current;
    if (e !== null) {
      return e;
    } else {
      return gs.pooledCache;
    }
  }
  function Ya(e, t) {
    j(Ka, t === null ? Ka.current : t.pool);
  }
  function Za() {
    var e = Xa();
    if (e === null) {
      return null;
    } else {
      return {
        parent: Ba._currentValue,
        pool: e
      };
    }
  }
  var Ja = Error(a(460));
  var el = Error(a(474));
  var tl = Error(a(542));
  var nl = {
    then: function () {}
  };
  function rl(e) {
    return (e = e.status) === "fulfilled" || e === "rejected";
  }
  function al(e, t, n) {
    if ((n = e[n]) === undefined) {
      e.push(t);
    } else if (n !== t) {
      t.then(It, It);
      t = n;
    }
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        ul(e = t.reason);
        throw e;
      default:
        if (typeof t.status == "string") {
          t.then(It, It);
        } else {
          if ((e = gs) !== null && e.shellSuspendCounter > 100) {
            throw Error(a(482));
          }
          (e = t).status = "pending";
          e.then(function (e) {
            if (t.status === "pending") {
              var n = t;
              n.status = "fulfilled";
              n.value = e;
            }
          }, function (e) {
            if (t.status === "pending") {
              var n = t;
              n.status = "rejected";
              n.reason = e;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            ul(e = t.reason);
            throw e;
        }
        ol = t;
        throw Ja;
    }
  }
  function ll(e) {
    try {
      return (0, e._init)(e._payload);
    } catch (t) {
      if (t !== null && typeof t == "object" && typeof t.then == "function") {
        ol = t;
        throw Ja;
      }
      throw t;
    }
  }
  var ol = null;
  function il() {
    if (ol === null) {
      throw Error(a(459));
    }
    var e = ol;
    ol = null;
    return e;
  }
  function ul(e) {
    if (e === Ja || e === tl) {
      throw Error(a(483));
    }
  }
  var sl = null;
  var cl = 0;
  function fl(e) {
    var t = cl;
    cl += 1;
    if (sl === null) {
      sl = [];
    }
    return al(sl, e, t);
  }
  function dl(e, t) {
    t = t.props.ref;
    e.ref = t !== undefined ? t : null;
  }
  function hl(e, t) {
    if (t.$$typeof === m) {
      throw Error(a(525));
    }
    e = Object.prototype.toString.call(t);
    throw Error(a(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function pl(e) {
    function t(t, n) {
      if (e) {
        var r = t.deletions;
        if (r === null) {
          t.deletions = [n];
          t.flags |= 16;
        } else {
          r.push(n);
        }
      }
    }
    function n(n, r) {
      if (!e) {
        return null;
      }
      while (r !== null) {
        t(n, r);
        r = r.sibling;
      }
      return null;
    }
    function r(e) {
      var t = new Map();
      for (; e !== null;) {
        if (e.key !== null) {
          t.set(e.key, e);
        } else {
          t.set(e.index, e);
        }
        e = e.sibling;
      }
      return t;
    }
    function l(e, t) {
      (e = Gr(e, t)).index = 0;
      e.sibling = null;
      return e;
    }
    function o(t, n, r) {
      t.index = r;
      if (e) {
        if ((r = t.alternate) !== null) {
          if ((r = r.index) < n) {
            t.flags |= 67108866;
            return n;
          } else {
            return r;
          }
        } else {
          t.flags |= 67108866;
          return n;
        }
      } else {
        t.flags |= 1048576;
        return n;
      }
    }
    function i(t) {
      if (e && t.alternate === null) {
        t.flags |= 67108866;
      }
      return t;
    }
    function u(e, t, n, r) {
      if (t === null || t.tag !== 6) {
        (t = Wr(n, e.mode, r)).return = e;
        return t;
      } else {
        (t = l(t, n)).return = e;
        return t;
      }
    }
    function s(e, t, n, r) {
      var a = n.type;
      if (a === b) {
        return f(e, t, n.props.children, r, n.key);
      } else if (t !== null && (t.elementType === a || typeof a == "object" && a !== null && a.$$typeof === N && ll(a) === t.type)) {
        dl(t = l(t, n.props), n);
        t.return = e;
        return t;
      } else {
        dl(t = Vr(n.type, n.key, n.props, null, e.mode, r), n);
        t.return = e;
        return t;
      }
    }
    function c(e, t, n, r) {
      if (t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation) {
        (t = qr(n, e.mode, r)).return = e;
        return t;
      } else {
        (t = l(t, n.children || [])).return = e;
        return t;
      }
    }
    function f(e, t, n, r, a) {
      if (t === null || t.tag !== 7) {
        (t = $r(n, e.mode, r, a)).return = e;
        return t;
      } else {
        (t = l(t, n)).return = e;
        return t;
      }
    }
    function d(e, t, n) {
      if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") {
        (t = Wr("" + t, e.mode, n)).return = e;
        return t;
      }
      if (typeof t == "object" && t !== null) {
        switch (t.$$typeof) {
          case g:
            dl(n = Vr(t.type, t.key, t.props, null, e.mode, n), t);
            n.return = e;
            return n;
          case y:
            (t = qr(t, e.mode, n)).return = e;
            return t;
          case N:
            return d(e, t = ll(t), n);
        }
        if (M(t) || x(t)) {
          (t = $r(t, e.mode, n, null)).return = e;
          return t;
        }
        if (typeof t.then == "function") {
          return d(e, fl(t), n);
        }
        if (t.$$typeof === k) {
          return d(e, Ma(e, t), n);
        }
        hl(e, t);
      }
      return null;
    }
    function h(e, t, n, r) {
      var a = t !== null ? t.key : null;
      if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") {
        if (a !== null) {
          return null;
        } else {
          return u(e, t, "" + n, r);
        }
      }
      if (typeof n == "object" && n !== null) {
        switch (n.$$typeof) {
          case g:
            if (n.key === a) {
              return s(e, t, n, r);
            } else {
              return null;
            }
          case y:
            if (n.key === a) {
              return c(e, t, n, r);
            } else {
              return null;
            }
          case N:
            return h(e, t, n = ll(n), r);
        }
        if (M(n) || x(n)) {
          if (a !== null) {
            return null;
          } else {
            return f(e, t, n, r, null);
          }
        }
        if (typeof n.then == "function") {
          return h(e, t, fl(n), r);
        }
        if (n.$$typeof === k) {
          return h(e, t, Ma(e, n), r);
        }
        hl(e, n);
      }
      return null;
    }
    function p(e, t, n, r, a) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") {
        return u(t, e = e.get(n) || null, "" + r, a);
      }
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case g:
            return s(t, e = e.get(r.key === null ? n : r.key) || null, r, a);
          case y:
            return c(t, e = e.get(r.key === null ? n : r.key) || null, r, a);
          case N:
            return p(e, t, n, r = ll(r), a);
        }
        if (M(r) || x(r)) {
          return f(t, e = e.get(n) || null, r, a, null);
        }
        if (typeof r.then == "function") {
          return p(e, t, n, fl(r), a);
        }
        if (r.$$typeof === k) {
          return p(e, t, n, Ma(t, r), a);
        }
        hl(t, r);
      }
      return null;
    }
    function m(u, s, c, f) {
      if (typeof c == "object" && c !== null && c.type === b && c.key === null) {
        c = c.props.children;
      }
      if (typeof c == "object" && c !== null) {
        switch (c.$$typeof) {
          case g:
            e: {
              var v = c.key;
              for (; s !== null;) {
                if (s.key === v) {
                  if ((v = c.type) === b) {
                    if (s.tag === 7) {
                      n(u, s.sibling);
                      (f = l(s, c.props.children)).return = u;
                      u = f;
                      break e;
                    }
                  } else if (s.elementType === v || typeof v == "object" && v !== null && v.$$typeof === N && ll(v) === s.type) {
                    n(u, s.sibling);
                    dl(f = l(s, c.props), c);
                    f.return = u;
                    u = f;
                    break e;
                  }
                  n(u, s);
                  break;
                }
                t(u, s);
                s = s.sibling;
              }
              if (c.type === b) {
                (f = $r(c.props.children, u.mode, f, c.key)).return = u;
                u = f;
              } else {
                dl(f = Vr(c.type, c.key, c.props, null, u.mode, f), c);
                f.return = u;
                u = f;
              }
            }
            return i(u);
          case y:
            e: {
              for (v = c.key; s !== null;) {
                if (s.key === v) {
                  if (s.tag === 4 && s.stateNode.containerInfo === c.containerInfo && s.stateNode.implementation === c.implementation) {
                    n(u, s.sibling);
                    (f = l(s, c.children || [])).return = u;
                    u = f;
                    break e;
                  }
                  n(u, s);
                  break;
                }
                t(u, s);
                s = s.sibling;
              }
              (f = qr(c, u.mode, f)).return = u;
              u = f;
            }
            return i(u);
          case N:
            return m(u, s, c = ll(c), f);
        }
        if (M(c)) {
          return function (a, l, i, u) {
            var s = null;
            var c = null;
            for (var f = l, m = l = 0, g = null; f !== null && m < i.length; m++) {
              if (f.index > m) {
                g = f;
                f = null;
              } else {
                g = f.sibling;
              }
              var y = h(a, f, i[m], u);
              if (y === null) {
                if (f === null) {
                  f = g;
                }
                break;
              }
              if (e && f && y.alternate === null) {
                t(a, f);
              }
              l = o(y, l, m);
              if (c === null) {
                s = y;
              } else {
                c.sibling = y;
              }
              c = y;
              f = g;
            }
            if (m === i.length) {
              n(a, f);
              if (ha) {
                oa(a, m);
              }
              return s;
            }
            if (f === null) {
              for (; m < i.length; m++) {
                if ((f = d(a, i[m], u)) !== null) {
                  l = o(f, l, m);
                  if (c === null) {
                    s = f;
                  } else {
                    c.sibling = f;
                  }
                  c = f;
                }
              }
              if (ha) {
                oa(a, m);
              }
              return s;
            }
            for (f = r(f); m < i.length; m++) {
              if ((g = p(f, a, m, i[m], u)) !== null) {
                if (e && g.alternate !== null) {
                  f.delete(g.key === null ? m : g.key);
                }
                l = o(g, l, m);
                if (c === null) {
                  s = g;
                } else {
                  c.sibling = g;
                }
                c = g;
              }
            }
            if (e) {
              f.forEach(function (e) {
                return t(a, e);
              });
            }
            if (ha) {
              oa(a, m);
            }
            return s;
          }(u, s, c, f);
        }
        if (x(c)) {
          if (typeof (v = x(c)) != "function") {
            throw Error(a(150));
          }
          return function (l, i, u, s) {
            if (u == null) {
              throw Error(a(151));
            }
            var c = null;
            var f = null;
            for (var m = i, g = i = 0, y = null, v = u.next(); m !== null && !v.done; g++, v = u.next()) {
              if (m.index > g) {
                y = m;
                m = null;
              } else {
                y = m.sibling;
              }
              var b = h(l, m, v.value, s);
              if (b === null) {
                if (m === null) {
                  m = y;
                }
                break;
              }
              if (e && m && b.alternate === null) {
                t(l, m);
              }
              i = o(b, i, g);
              if (f === null) {
                c = b;
              } else {
                f.sibling = b;
              }
              f = b;
              m = y;
            }
            if (v.done) {
              n(l, m);
              if (ha) {
                oa(l, g);
              }
              return c;
            }
            if (m === null) {
              for (; !v.done; g++, v = u.next()) {
                if ((v = d(l, v.value, s)) !== null) {
                  i = o(v, i, g);
                  if (f === null) {
                    c = v;
                  } else {
                    f.sibling = v;
                  }
                  f = v;
                }
              }
              if (ha) {
                oa(l, g);
              }
              return c;
            }
            for (m = r(m); !v.done; g++, v = u.next()) {
              if ((v = p(m, l, g, v.value, s)) !== null) {
                if (e && v.alternate !== null) {
                  m.delete(v.key === null ? g : v.key);
                }
                i = o(v, i, g);
                if (f === null) {
                  c = v;
                } else {
                  f.sibling = v;
                }
                f = v;
              }
            }
            if (e) {
              m.forEach(function (e) {
                return t(l, e);
              });
            }
            if (ha) {
              oa(l, g);
            }
            return c;
          }(u, s, c = v.call(c), f);
        }
        if (typeof c.then == "function") {
          return m(u, s, fl(c), f);
        }
        if (c.$$typeof === k) {
          return m(u, s, Ma(u, c), f);
        }
        hl(u, c);
      }
      if (typeof c == "string" && c !== "" || typeof c == "number" || typeof c == "bigint") {
        c = "" + c;
        if (s !== null && s.tag === 6) {
          n(u, s.sibling);
          (f = l(s, c)).return = u;
          u = f;
        } else {
          n(u, s);
          (f = Wr(c, u.mode, f)).return = u;
          u = f;
        }
        return i(u);
      } else {
        return n(u, s);
      }
    }
    return function (e, t, n, r) {
      try {
        cl = 0;
        var a = m(e, t, n, r);
        sl = null;
        return a;
      } catch (o) {
        if (o === Ja || o === tl) {
          throw o;
        }
        var l = Br(29, o, null, e.mode);
        l.lanes = r;
        l.return = e;
        return l;
      }
    };
  }
  var ml = pl(true);
  var gl = pl(false);
  var yl = false;
  function vl(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null
      },
      callbacks: null
    };
  }
  function bl(e, t) {
    e = e.updateQueue;
    if (t.updateQueue === e) {
      t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      };
    }
  }
  function Sl(e) {
    return {
      lane: e,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function El(e, t, n) {
    var r = e.updateQueue;
    if (r === null) {
      return null;
    }
    r = r.shared;
    if (ms & 2) {
      var a = r.pending;
      if (a === null) {
        t.next = t;
      } else {
        t.next = a.next;
        a.next = t;
      }
      r.pending = t;
      t = Dr(e);
      Hr(e, null, n);
      return t;
    }
    Rr(e, r, t, n);
    return Dr(e);
  }
  function wl(e, t, n) {
    if ((t = t.updateQueue) !== null && (t = t.shared, n & 4194048)) {
      var r = t.lanes;
      n |= r &= e.pendingLanes;
      t.lanes = n;
      He(e, n);
    }
  }
  function kl(e, t) {
    var n = e.updateQueue;
    var r = e.alternate;
    if (r !== null && n === (r = r.updateQueue)) {
      var a = null;
      var l = null;
      if ((n = n.firstBaseUpdate) !== null) {
        do {
          var o = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          if (l === null) {
            a = l = o;
          } else {
            l = l.next = o;
          }
          n = n.next;
        } while (n !== null);
        if (l === null) {
          a = l = t;
        } else {
          l = l.next = t;
        }
      } else {
        a = l = t;
      }
      n = {
        baseState: r.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: l,
        shared: r.shared,
        callbacks: r.callbacks
      };
      e.updateQueue = n;
      return;
    }
    if ((e = n.lastBaseUpdate) === null) {
      n.firstBaseUpdate = t;
    } else {
      e.next = t;
    }
    n.lastBaseUpdate = t;
  }
  var Tl = false;
  function Pl() {
    if (Tl) {
      if (Wa !== null) {
        throw Wa;
      }
    }
  }
  function _l(e, t, n, r) {
    Tl = false;
    var a = e.updateQueue;
    yl = false;
    var l = a.firstBaseUpdate;
    var o = a.lastBaseUpdate;
    var i = a.shared.pending;
    if (i !== null) {
      a.shared.pending = null;
      var u = i;
      var s = u.next;
      u.next = null;
      if (o === null) {
        l = s;
      } else {
        o.next = s;
      }
      o = u;
      var c = e.alternate;
      if (c !== null && (i = (c = c.updateQueue).lastBaseUpdate) !== o) {
        if (i === null) {
          c.firstBaseUpdate = s;
        } else {
          i.next = s;
        }
        c.lastBaseUpdate = u;
      }
    }
    if (l !== null) {
      var f = a.baseState;
      o = 0;
      c = s = u = null;
      i = l;
      while (true) {
        var d = i.lane & -536870913;
        var h = d !== i.lane;
        if (h ? (vs & d) === d : (r & d) === d) {
          if (d !== 0 && d === $a) {
            Tl = true;
          }
          if (c !== null) {
            c = c.next = {
              lane: 0,
              tag: i.tag,
              payload: i.payload,
              callback: null,
              next: null
            };
          }
          e: {
            var m = e;
            var g = i;
            d = t;
            var y = n;
            switch (g.tag) {
              case 1:
                if (typeof (m = g.payload) == "function") {
                  f = m.call(y, f, d);
                  break e;
                }
                f = m;
                break e;
              case 3:
                m.flags = m.flags & -65537 | 128;
              case 0:
                if ((d = typeof (m = g.payload) == "function" ? m.call(y, f, d) : m) == null) {
                  break e;
                }
                f = p({}, f, d);
                break e;
              case 2:
                yl = true;
            }
          }
          if ((d = i.callback) !== null) {
            e.flags |= 64;
            if (h) {
              e.flags |= 8192;
            }
            if ((h = a.callbacks) === null) {
              a.callbacks = [d];
            } else {
              h.push(d);
            }
          }
        } else {
          h = {
            lane: d,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null
          };
          if (c === null) {
            s = c = h;
            u = f;
          } else {
            c = c.next = h;
          }
          o |= d;
        }
        if ((i = i.next) === null) {
          if ((i = a.shared.pending) === null) {
            break;
          }
          i = (h = i).next;
          h.next = null;
          a.lastBaseUpdate = h;
          a.shared.pending = null;
        }
      }
      if (c === null) {
        u = f;
      }
      a.baseState = u;
      a.firstBaseUpdate = s;
      a.lastBaseUpdate = c;
      if (l === null) {
        a.shared.lanes = 0;
      }
      _s |= o;
      e.lanes = o;
      e.memoizedState = f;
    }
  }
  function Cl(e, t) {
    if (typeof e != "function") {
      throw Error(a(191, e));
    }
    e.call(t);
  }
  function Nl(e, t) {
    var n = e.callbacks;
    if (n !== null) {
      e.callbacks = null;
      e = 0;
      for (; e < n.length; e++) {
        Cl(n[e], t);
      }
    }
  }
  var Ll = U(null);
  var Al = U(0);
  function Ol(e, t) {
    j(Al, e = Ts);
    j(Ll, t);
    Ts = e | t.baseLanes;
  }
  function xl() {
    j(Al, Ts);
    j(Ll, Ll.current);
  }
  function Rl() {
    Ts = Al.current;
    G(Ll);
    G(Al);
  }
  var Il = U(null);
  var Ml = null;
  function Hl(e) {
    var t = e.alternate;
    j(Ul, Ul.current & 1);
    j(Il, e);
    if (Ml === null && (t === null || Ll.current !== null || t.memoizedState !== null)) {
      Ml = e;
    }
  }
  function Dl(e) {
    j(Ul, Ul.current);
    j(Il, e);
    if (Ml === null) {
      Ml = e;
    }
  }
  function zl(e) {
    if (e.tag === 22) {
      j(Ul, Ul.current);
      j(Il, e);
      if (Ml === null) {
        Ml = e;
      }
    } else {
      Fl();
    }
  }
  function Fl() {
    j(Ul, Ul.current);
    j(Il, Il.current);
  }
  function Bl(e) {
    G(Il);
    if (Ml === e) {
      Ml = null;
    }
    G(Ul);
  }
  var Ul = U(0);
  function Gl(e) {
    for (var t = e; t !== null;) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated) === null || If(n) || Mf(n))) {
          return t;
        }
      } else if (t.tag !== 19 || t.memoizedProps.revealOrder !== "forwards" && t.memoizedProps.revealOrder !== "backwards" && t.memoizedProps.revealOrder !== "unstable_legacy-backwards" && t.memoizedProps.revealOrder !== "together") {
        if (t.child !== null) {
          t.child.return = t;
          t = t.child;
          continue;
        }
      } else if (t.flags & 128) {
        return t;
      }
      if (t === e) {
        break;
      }
      while (t.sibling === null) {
        if (t.return === null || t.return === e) {
          return null;
        }
        t = t.return;
      }
      t.sibling.return = t.return;
      t = t.sibling;
    }
    return null;
  }
  var jl = 0;
  var Vl = null;
  var $l = null;
  var Wl = null;
  var Ql = false;
  var ql = false;
  var Kl = false;
  var Xl = 0;
  var Yl = 0;
  var Zl = null;
  var Jl = 0;
  function eo() {
    throw Error(a(321));
  }
  function to(e, t) {
    if (t === null) {
      return false;
    }
    for (var n = 0; n < t.length && n < e.length; n++) {
      if (!er(e[n], t[n])) {
        return false;
      }
    }
    return true;
  }
  function no(e, t, n, r, a, l) {
    jl = l;
    Vl = t;
    t.memoizedState = null;
    t.updateQueue = null;
    t.lanes = 0;
    H.H = e === null || e.memoizedState === null ? vi : bi;
    Kl = false;
    l = n(r, a);
    Kl = false;
    if (ql) {
      l = ao(t, n, r, a);
    }
    ro(e);
    return l;
  }
  function ro(e) {
    H.H = yi;
    var t = $l !== null && $l.next !== null;
    jl = 0;
    Wl = $l = Vl = null;
    Ql = false;
    Yl = 0;
    Zl = null;
    if (t) {
      throw Error(a(300));
    }
    if (e !== null && !Mi) {
      if ((e = e.dependencies) !== null && xa(e)) {
        Mi = true;
      }
    }
  }
  function ao(e, t, n, r) {
    Vl = e;
    var l = 0;
    do {
      if (ql) {
        Zl = null;
      }
      Yl = 0;
      ql = false;
      if (l >= 25) {
        throw Error(a(301));
      }
      l += 1;
      Wl = $l = null;
      if (e.updateQueue != null) {
        var o = e.updateQueue;
        o.lastEffect = null;
        o.events = null;
        o.stores = null;
        if (o.memoCache != null) {
          o.memoCache.index = 0;
        }
      }
      H.H = Si;
      o = t(n, r);
    } while (ql);
    return o;
  }
  function lo() {
    var e = H.H;
    var t = e.useState()[0];
    t = typeof t.then == "function" ? fo(t) : t;
    e = e.useState()[0];
    if (($l !== null ? $l.memoizedState : null) !== e) {
      Vl.flags |= 1024;
    }
    return t;
  }
  function oo() {
    var e = Xl !== 0;
    Xl = 0;
    return e;
  }
  function io(e, t, n) {
    t.updateQueue = e.updateQueue;
    t.flags &= -2053;
    e.lanes &= ~n;
  }
  function uo(e) {
    if (Ql) {
      for (e = e.memoizedState; e !== null;) {
        var t = e.queue;
        if (t !== null) {
          t.pending = null;
        }
        e = e.next;
      }
      Ql = false;
    }
    jl = 0;
    Wl = $l = Vl = null;
    ql = false;
    Yl = Xl = 0;
    Zl = null;
  }
  function so() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    if (Wl === null) {
      Vl.memoizedState = Wl = e;
    } else {
      Wl = Wl.next = e;
    }
    return Wl;
  }
  function co() {
    if ($l === null) {
      var e = Vl.alternate;
      e = e !== null ? e.memoizedState : null;
    } else {
      e = $l.next;
    }
    var t = Wl === null ? Vl.memoizedState : Wl.next;
    if (t !== null) {
      Wl = t;
      $l = e;
    } else {
      if (e === null) {
        if (Vl.alternate === null) {
          throw Error(a(467));
        }
        throw Error(a(310));
      }
      e = {
        memoizedState: ($l = e).memoizedState,
        baseState: $l.baseState,
        baseQueue: $l.baseQueue,
        queue: $l.queue,
        next: null
      };
      if (Wl === null) {
        Vl.memoizedState = Wl = e;
      } else {
        Wl = Wl.next = e;
      }
    }
    return Wl;
  }
  function fo(e) {
    var t = Yl;
    Yl += 1;
    if (Zl === null) {
      Zl = [];
    }
    e = al(Zl, e, t);
    t = Vl;
    if ((Wl === null ? t.memoizedState : Wl.next) === null) {
      t = t.alternate;
      H.H = t === null || t.memoizedState === null ? vi : bi;
    }
    return e;
  }
  function ho(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") {
        return fo(e);
      }
      if (e.$$typeof === k) {
        return Ia(e);
      }
    }
    throw Error(a(438, String(e)));
  }
  function po(e) {
    var t = null;
    var n = Vl.updateQueue;
    if (n !== null) {
      t = n.memoCache;
    }
    if (t == null) {
      var r = Vl.alternate;
      if (r !== null && (r = r.updateQueue) !== null && (r = r.memoCache) != null) {
        t = {
          data: r.data.map(function (e) {
            return e.slice();
          }),
          index: 0
        };
      }
    }
    if (t == null) {
      t = {
        data: [],
        index: 0
      };
    }
    if (n === null) {
      n = {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
      Vl.updateQueue = n;
    }
    n.memoCache = t;
    if ((n = t.data[t.index]) === undefined) {
      n = t.data[t.index] = Array(e);
      r = 0;
      for (; r < e; r++) {
        n[r] = A;
      }
    }
    t.index++;
    return n;
  }
  function mo(e, t) {
    if (typeof t == "function") {
      return t(e);
    } else {
      return t;
    }
  }
  function go(e) {
    return yo(co(), $l, e);
  }
  function yo(e, t, n) {
    var r = e.queue;
    if (r === null) {
      throw Error(a(311));
    }
    r.lastRenderedReducer = n;
    var l = e.baseQueue;
    var o = r.pending;
    if (o !== null) {
      if (l !== null) {
        var i = l.next;
        l.next = o.next;
        o.next = i;
      }
      t.baseQueue = l = o;
      r.pending = null;
    }
    o = e.baseState;
    if (l === null) {
      e.memoizedState = o;
    } else {
      var u = i = null;
      var s = null;
      var c = t = l.next;
      var f = false;
      do {
        var d = c.lane & -536870913;
        if (d !== c.lane ? (vs & d) === d : (jl & d) === d) {
          var h = c.revertLane;
          if (h === 0) {
            if (s !== null) {
              s = s.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: c.action,
                hasEagerState: c.hasEagerState,
                eagerState: c.eagerState,
                next: null
              };
            }
            if (d === $a) {
              f = true;
            }
          } else {
            if ((jl & h) === h) {
              c = c.next;
              if (h === $a) {
                f = true;
              }
              continue;
            }
            d = {
              lane: 0,
              revertLane: c.revertLane,
              gesture: null,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null
            };
            if (s === null) {
              u = s = d;
              i = o;
            } else {
              s = s.next = d;
            }
            Vl.lanes |= h;
            _s |= h;
          }
          d = c.action;
          if (Kl) {
            n(o, d);
          }
          o = c.hasEagerState ? c.eagerState : n(o, d);
        } else {
          h = {
            lane: d,
            revertLane: c.revertLane,
            gesture: c.gesture,
            action: c.action,
            hasEagerState: c.hasEagerState,
            eagerState: c.eagerState,
            next: null
          };
          if (s === null) {
            u = s = h;
            i = o;
          } else {
            s = s.next = h;
          }
          Vl.lanes |= d;
          _s |= d;
        }
        c = c.next;
      } while (c !== null && c !== t);
      if (s === null) {
        i = o;
      } else {
        s.next = u;
      }
      if (!er(o, e.memoizedState) && (Mi = true, f && (n = Wa) !== null)) {
        throw n;
      }
      e.memoizedState = o;
      e.baseState = i;
      e.baseQueue = s;
      r.lastRenderedState = o;
    }
    if (l === null) {
      r.lanes = 0;
    }
    return [e.memoizedState, r.dispatch];
  }
  function vo(e) {
    var t = co();
    var n = t.queue;
    if (n === null) {
      throw Error(a(311));
    }
    n.lastRenderedReducer = e;
    var r = n.dispatch;
    var l = n.pending;
    var o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var i = l = l.next;
      do {
        o = e(o, i.action);
        i = i.next;
      } while (i !== l);
      if (!er(o, t.memoizedState)) {
        Mi = true;
      }
      t.memoizedState = o;
      if (t.baseQueue === null) {
        t.baseState = o;
      }
      n.lastRenderedState = o;
    }
    return [o, r];
  }
  function bo(e, t, n) {
    var r = Vl;
    var l = co();
    var o = ha;
    if (o) {
      if (n === undefined) {
        throw Error(a(407));
      }
      n = n();
    } else {
      n = t();
    }
    var i = !er(($l || l).memoizedState, n);
    if (i) {
      l.memoizedState = n;
      Mi = true;
    }
    l = l.queue;
    Vo(wo.bind(null, r, l, e), [e]);
    if (l.getSnapshot !== t || i || Wl !== null && Wl.memoizedState.tag & 1) {
      r.flags |= 2048;
      Fo(9, {
        destroy: undefined
      }, Eo.bind(null, r, l, n, t), null);
      if (gs === null) {
        throw Error(a(349));
      }
      if (!o && !(jl & 127)) {
        So(r, t, n);
      }
    }
    return n;
  }
  function So(e, t, n) {
    e.flags |= 16384;
    e = {
      getSnapshot: t,
      value: n
    };
    if ((t = Vl.updateQueue) === null) {
      t = {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
      Vl.updateQueue = t;
      t.stores = [e];
    } else if ((n = t.stores) === null) {
      t.stores = [e];
    } else {
      n.push(e);
    }
  }
  function Eo(e, t, n, r) {
    t.value = n;
    t.getSnapshot = r;
    if (ko(t)) {
      To(e);
    }
  }
  function wo(e, t, n) {
    return n(function () {
      if (ko(t)) {
        To(e);
      }
    });
  }
  function ko(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !er(e, n);
    } catch (r) {
      return true;
    }
  }
  function To(e) {
    var t = Mr(e, 2);
    if (t !== null) {
      Xs(t, e, 2);
    }
  }
  function Po(e) {
    var t = so();
    if (typeof e == "function") {
      var n = e;
      e = n();
      if (Kl) {
        Ee(true);
        try {
          n();
        } finally {
          Ee(false);
        }
      }
    }
    t.memoizedState = t.baseState = e;
    t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: mo,
      lastRenderedState: e
    };
    return t;
  }
  function _o(e, t, n, r) {
    e.baseState = n;
    return yo(e, $l, typeof r == "function" ? r : mo);
  }
  function Co(e, t, n, r, l) {
    if (pi(e)) {
      throw Error(a(485));
    }
    if ((e = t.action) !== null) {
      var o = {
        payload: l,
        action: e,
        next: null,
        isTransition: true,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (e) {
          o.listeners.push(e);
        }
      };
      if (H.T !== null) {
        n(true);
      } else {
        o.isTransition = false;
      }
      r(o);
      if ((n = t.pending) === null) {
        o.next = t.pending = o;
        No(t, o);
      } else {
        o.next = n.next;
        t.pending = n.next = o;
      }
    }
  }
  function No(e, t) {
    var n = t.action;
    var r = t.payload;
    var a = e.state;
    if (t.isTransition) {
      var l = H.T;
      var o = {};
      H.T = o;
      try {
        var i = n(a, r);
        var u = H.S;
        if (u !== null) {
          u(o, i);
        }
        Lo(e, t, i);
      } catch (s) {
        Oo(e, t, s);
      } finally {
        if (l !== null && o.types !== null) {
          l.types = o.types;
        }
        H.T = l;
      }
    } else {
      try {
        Lo(e, t, l = n(a, r));
      } catch (c) {
        Oo(e, t, c);
      }
    }
  }
  function Lo(e, t, n) {
    if (n !== null && typeof n == "object" && typeof n.then == "function") {
      n.then(function (n) {
        Ao(e, t, n);
      }, function (n) {
        return Oo(e, t, n);
      });
    } else {
      Ao(e, t, n);
    }
  }
  function Ao(e, t, n) {
    t.status = "fulfilled";
    t.value = n;
    xo(t);
    e.state = n;
    if ((t = e.pending) !== null) {
      if ((n = t.next) === t) {
        e.pending = null;
      } else {
        n = n.next;
        t.next = n;
        No(e, n);
      }
    }
  }
  function Oo(e, t, n) {
    var r = e.pending;
    e.pending = null;
    if (r !== null) {
      r = r.next;
      do {
        t.status = "rejected";
        t.reason = n;
        xo(t);
        t = t.next;
      } while (t !== r);
    }
    e.action = null;
  }
  function xo(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) {
      (0, e[t])();
    }
  }
  function Ro(e, t) {
    return t;
  }
  function Io(e, t) {
    if (ha) {
      var n = gs.formState;
      if (n !== null) {
        e: {
          var r = Vl;
          if (ha) {
            if (da) {
              t: {
                for (var a = da, l = ma; a.nodeType !== 8;) {
                  if (!l) {
                    a = null;
                    break t;
                  }
                  if ((a = Hf(a.nextSibling)) === null) {
                    a = null;
                    break t;
                  }
                }
                a = (l = a.data) === "F!" || l === "F" ? a : null;
              }
              if (a) {
                da = Hf(a.nextSibling);
                r = a.data === "F!";
                break e;
              }
            }
            ya(r);
          }
          r = false;
        }
        if (r) {
          t = n[0];
        }
      }
    }
    (n = so()).memoizedState = n.baseState = t;
    r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ro,
      lastRenderedState: t
    };
    n.queue = r;
    n = fi.bind(null, Vl, r);
    r.dispatch = n;
    r = Po(false);
    l = hi.bind(null, Vl, false, r.queue);
    a = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    };
    (r = so()).queue = a;
    n = Co.bind(null, Vl, a, l, n);
    a.dispatch = n;
    r.memoizedState = e;
    return [t, n, false];
  }
  function Mo(e) {
    return Ho(co(), $l, e);
  }
  function Ho(e, t, n) {
    t = yo(e, t, Ro)[0];
    e = go(mo)[0];
    if (typeof t == "object" && t !== null && typeof t.then == "function") {
      try {
        var r = fo(t);
      } catch (o) {
        if (o === Ja) {
          throw tl;
        }
        throw o;
      }
    } else {
      r = t;
    }
    var a = (t = co()).queue;
    var l = a.dispatch;
    if (n !== t.memoizedState) {
      Vl.flags |= 2048;
      Fo(9, {
        destroy: undefined
      }, Do.bind(null, a, n), null);
    }
    return [r, l, e];
  }
  function Do(e, t) {
    e.action = t;
  }
  function zo(e) {
    var t = co();
    var n = $l;
    if (n !== null) {
      return Ho(t, n, e);
    }
    co();
    t = t.memoizedState;
    var r = (n = co()).queue.dispatch;
    n.memoizedState = e;
    return [t, r, false];
  }
  function Fo(e, t, n, r) {
    e = {
      tag: e,
      create: n,
      deps: r,
      inst: t,
      next: null
    };
    if ((t = Vl.updateQueue) === null) {
      t = {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
      Vl.updateQueue = t;
    }
    if ((n = t.lastEffect) === null) {
      t.lastEffect = e.next = e;
    } else {
      r = n.next;
      n.next = e;
      e.next = r;
      t.lastEffect = e;
    }
    return e;
  }
  function Bo() {
    return co().memoizedState;
  }
  function Uo(e, t, n, r) {
    var a = so();
    Vl.flags |= e;
    a.memoizedState = Fo(t | 1, {
      destroy: undefined
    }, n, r === undefined ? null : r);
  }
  function Go(e, t, n, r) {
    var a = co();
    r = r === undefined ? null : r;
    var l = a.memoizedState.inst;
    if ($l !== null && r !== null && to(r, $l.memoizedState.deps)) {
      a.memoizedState = Fo(t, l, n, r);
    } else {
      Vl.flags |= e;
      a.memoizedState = Fo(t | 1, l, n, r);
    }
  }
  function jo(e, t) {
    Uo(8390656, 8, e, t);
  }
  function Vo(e, t) {
    Go(2048, 8, e, t);
  }
  function $o(e) {
    var t = co().memoizedState;
    (function (e) {
      Vl.flags |= 4;
      var t = Vl.updateQueue;
      if (t === null) {
        t = {
          lastEffect: null,
          events: null,
          stores: null,
          memoCache: null
        };
        Vl.updateQueue = t;
        t.events = [e];
      } else {
        var n = t.events;
        if (n === null) {
          t.events = [e];
        } else {
          n.push(e);
        }
      }
    })({
      ref: t,
      nextImpl: e
    });
    return function () {
      if (ms & 2) {
        throw Error(a(440));
      }
      return t.impl.apply(undefined, arguments);
    };
  }
  function Wo(e, t) {
    return Go(4, 2, e, t);
  }
  function Qo(e, t) {
    return Go(4, 4, e, t);
  }
  function qo(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        if (typeof n == "function") {
          n();
        } else {
          t(null);
        }
      };
    }
    if (t != null) {
      e = e();
      t.current = e;
      return function () {
        t.current = null;
      };
    }
  }
  function Ko(e, t, n) {
    n = n != null ? n.concat([e]) : null;
    Go(4, 4, qo.bind(null, t, e), n);
  }
  function Xo() {}
  function Yo(e, t) {
    var n = co();
    t = t === undefined ? null : t;
    var r = n.memoizedState;
    if (t !== null && to(t, r[1])) {
      return r[0];
    } else {
      n.memoizedState = [e, t];
      return e;
    }
  }
  function Zo(e, t) {
    var n = co();
    t = t === undefined ? null : t;
    var r = n.memoizedState;
    if (t !== null && to(t, r[1])) {
      return r[0];
    }
    r = e();
    if (Kl) {
      Ee(true);
      try {
        e();
      } finally {
        Ee(false);
      }
    }
    n.memoizedState = [r, t];
    return r;
  }
  function Jo(e, t, n) {
    if (n === undefined || jl & 1073741824 && !(vs & 261930)) {
      return e.memoizedState = t;
    } else {
      e.memoizedState = n;
      e = Ks();
      Vl.lanes |= e;
      _s |= e;
      return n;
    }
  }
  function ei(e, t, n, r) {
    if (er(n, t)) {
      return n;
    } else if (Ll.current !== null) {
      e = Jo(e, n, r);
      if (!er(e, t)) {
        Mi = true;
      }
      return e;
    } else if (jl & 42 && (!(jl & 1073741824) || vs & 261930)) {
      e = Ks();
      Vl.lanes |= e;
      _s |= e;
      return t;
    } else {
      Mi = true;
      return e.memoizedState = n;
    }
  }
  function ti(e, t, n, r, a) {
    var l = D.p;
    D.p = l !== 0 && l < 8 ? l : 8;
    var o;
    var i;
    var u;
    var s = H.T;
    var c = {};
    H.T = c;
    hi(e, false, t, n);
    try {
      var f = a();
      var d = H.S;
      if (d !== null) {
        d(c, f);
      }
      if (f !== null && typeof f == "object" && typeof f.then == "function") {
        di(e, t, (o = r, i = [], u = {
          status: "pending",
          value: null,
          reason: null,
          then: function (e) {
            i.push(e);
          }
        }, f.then(function () {
          u.status = "fulfilled";
          u.value = o;
          for (var e = 0; e < i.length; e++) {
            (0, i[e])(o);
          }
        }, function (e) {
          u.status = "rejected";
          u.reason = e;
          e = 0;
          for (; e < i.length; e++) {
            (0, i[e])(undefined);
          }
        }), u), qs());
      } else {
        di(e, t, r, qs());
      }
    } catch (h) {
      di(e, t, {
        then: function () {},
        status: "rejected",
        reason: h
      }, qs());
    } finally {
      D.p = l;
      if (s !== null && c.types !== null) {
        s.types = c.types;
      }
      H.T = s;
    }
  }
  function ni() {}
  function ri(e, t, n, r) {
    if (e.tag !== 5) {
      throw Error(a(476));
    }
    var l = ai(e).queue;
    ti(e, l, t, z, n === null ? ni : function () {
      li(e);
      return n(r);
    });
  }
  function ai(e) {
    var t = e.memoizedState;
    if (t !== null) {
      return t;
    }
    var n = {};
    (t = {
      memoizedState: z,
      baseState: z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: mo,
        lastRenderedState: z
      },
      next: null
    }).next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: mo,
        lastRenderedState: n
      },
      next: null
    };
    e.memoizedState = t;
    if ((e = e.alternate) !== null) {
      e.memoizedState = t;
    }
    return t;
  }
  function li(e) {
    var t = ai(e);
    if (t.next === null) {
      t = e.alternate.memoizedState;
    }
    di(e, t.next.queue, {}, qs());
  }
  function oi() {
    return Ia(hd);
  }
  function ii() {
    return co().memoizedState;
  }
  function ui() {
    return co().memoizedState;
  }
  function si(e) {
    for (var t = e.return; t !== null;) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = qs();
          var r = El(t, e = Sl(n), n);
          if (r !== null) {
            Xs(r, t, n);
            wl(r, t, n);
          }
          t = {
            cache: Ua()
          };
          e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ci(e, t, n) {
    var r = qs();
    n = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (pi(e)) {
      mi(t, n);
    } else if ((n = Ir(e, t, n, r)) !== null) {
      Xs(n, e, r);
      gi(n, t, r);
    }
  }
  function fi(e, t, n) {
    di(e, t, n, qs());
  }
  function di(e, t, n, r) {
    var a = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (pi(e)) {
      mi(t, a);
    } else {
      var l = e.alternate;
      if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer) !== null) {
        try {
          var o = t.lastRenderedState;
          var i = l(o, n);
          a.hasEagerState = true;
          a.eagerState = i;
          if (er(i, o)) {
            Rr(e, t, a, 0);
            if (gs === null) {
              xr();
            }
            return false;
          }
        } catch (u) {}
      }
      if ((n = Ir(e, t, a, r)) !== null) {
        Xs(n, e, r);
        gi(n, t, r);
        return true;
      }
    }
    return false;
  }
  function hi(e, t, n, r) {
    r = {
      lane: 2,
      revertLane: Vc(),
      gesture: null,
      action: r,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (pi(e)) {
      if (t) {
        throw Error(a(479));
      }
    } else if ((t = Ir(e, n, r, 2)) !== null) {
      Xs(t, e, 2);
    }
  }
  function pi(e) {
    var t = e.alternate;
    return e === Vl || t !== null && t === Vl;
  }
  function mi(e, t) {
    ql = Ql = true;
    var n = e.pending;
    if (n === null) {
      t.next = t;
    } else {
      t.next = n.next;
      n.next = t;
    }
    e.pending = t;
  }
  function gi(e, t, n) {
    if (n & 4194048) {
      var r = t.lanes;
      n |= r &= e.pendingLanes;
      t.lanes = n;
      He(e, n);
    }
  }
  var yi = {
    readContext: Ia,
    use: ho,
    useCallback: eo,
    useContext: eo,
    useEffect: eo,
    useImperativeHandle: eo,
    useLayoutEffect: eo,
    useInsertionEffect: eo,
    useMemo: eo,
    useReducer: eo,
    useRef: eo,
    useState: eo,
    useDebugValue: eo,
    useDeferredValue: eo,
    useTransition: eo,
    useSyncExternalStore: eo,
    useId: eo,
    useHostTransitionStatus: eo,
    useFormState: eo,
    useActionState: eo,
    useOptimistic: eo,
    useMemoCache: eo,
    useCacheRefresh: eo
  };
  yi.useEffectEvent = eo;
  var vi = {
    readContext: Ia,
    use: ho,
    useCallback: function (e, t) {
      so().memoizedState = [e, t === undefined ? null : t];
      return e;
    },
    useContext: Ia,
    useEffect: jo,
    useImperativeHandle: function (e, t, n) {
      n = n != null ? n.concat([e]) : null;
      Uo(4194308, 4, qo.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return Uo(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      Uo(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = so();
      t = t === undefined ? null : t;
      var r = e();
      if (Kl) {
        Ee(true);
        try {
          e();
        } finally {
          Ee(false);
        }
      }
      n.memoizedState = [r, t];
      return r;
    },
    useReducer: function (e, t, n) {
      var r = so();
      if (n !== undefined) {
        var a = n(t);
        if (Kl) {
          Ee(true);
          try {
            n(t);
          } finally {
            Ee(false);
          }
        }
      } else {
        a = t;
      }
      r.memoizedState = r.baseState = a;
      e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: a
      };
      r.queue = e;
      e = e.dispatch = ci.bind(null, Vl, e);
      return [r.memoizedState, e];
    },
    useRef: function (e) {
      e = {
        current: e
      };
      return so().memoizedState = e;
    },
    useState: function (e) {
      var t = (e = Po(e)).queue;
      var n = fi.bind(null, Vl, t);
      t.dispatch = n;
      return [e.memoizedState, n];
    },
    useDebugValue: Xo,
    useDeferredValue: function (e, t) {
      return Jo(so(), e, t);
    },
    useTransition: function () {
      var e = Po(false);
      e = ti.bind(null, Vl, e.queue, true, false);
      so().memoizedState = e;
      return [false, e];
    },
    useSyncExternalStore: function (e, t, n) {
      var r = Vl;
      var l = so();
      if (ha) {
        if (n === undefined) {
          throw Error(a(407));
        }
        n = n();
      } else {
        n = t();
        if (gs === null) {
          throw Error(a(349));
        }
        if (!(vs & 127)) {
          So(r, t, n);
        }
      }
      l.memoizedState = n;
      var o = {
        value: n,
        getSnapshot: t
      };
      l.queue = o;
      jo(wo.bind(null, r, o, e), [e]);
      r.flags |= 2048;
      Fo(9, {
        destroy: undefined
      }, Eo.bind(null, r, o, n, t), null);
      return n;
    },
    useId: function () {
      var e = so();
      var t = gs.identifierPrefix;
      if (ha) {
        var n = la;
        t = "_" + t + "R_" + (n = (aa & ~(1 << 32 - we(aa) - 1)).toString(32) + n);
        if ((n = Xl++) > 0) {
          t += "H" + n.toString(32);
        }
        t += "_";
      } else {
        t = "_" + t + "r_" + (n = Jl++).toString(32) + "_";
      }
      return e.memoizedState = t;
    },
    useHostTransitionStatus: oi,
    useFormState: Io,
    useActionState: Io,
    useOptimistic: function (e) {
      var t = so();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      t.queue = n;
      t = hi.bind(null, Vl, true, n);
      n.dispatch = t;
      return [e, t];
    },
    useMemoCache: po,
    useCacheRefresh: function () {
      return so().memoizedState = si.bind(null, Vl);
    },
    useEffectEvent: function (e) {
      var t = so();
      var n = {
        impl: e
      };
      t.memoizedState = n;
      return function () {
        if (ms & 2) {
          throw Error(a(440));
        }
        return n.impl.apply(undefined, arguments);
      };
    }
  };
  var bi = {
    readContext: Ia,
    use: ho,
    useCallback: Yo,
    useContext: Ia,
    useEffect: Vo,
    useImperativeHandle: Ko,
    useInsertionEffect: Wo,
    useLayoutEffect: Qo,
    useMemo: Zo,
    useReducer: go,
    useRef: Bo,
    useState: function () {
      return go(mo);
    },
    useDebugValue: Xo,
    useDeferredValue: function (e, t) {
      return ei(co(), $l.memoizedState, e, t);
    },
    useTransition: function () {
      var e = go(mo)[0];
      var t = co().memoizedState;
      return [typeof e == "boolean" ? e : fo(e), t];
    },
    useSyncExternalStore: bo,
    useId: ii,
    useHostTransitionStatus: oi,
    useFormState: Mo,
    useActionState: Mo,
    useOptimistic: function (e, t) {
      return _o(co(), 0, e, t);
    },
    useMemoCache: po,
    useCacheRefresh: ui
  };
  bi.useEffectEvent = $o;
  var Si = {
    readContext: Ia,
    use: ho,
    useCallback: Yo,
    useContext: Ia,
    useEffect: Vo,
    useImperativeHandle: Ko,
    useInsertionEffect: Wo,
    useLayoutEffect: Qo,
    useMemo: Zo,
    useReducer: vo,
    useRef: Bo,
    useState: function () {
      return vo(mo);
    },
    useDebugValue: Xo,
    useDeferredValue: function (e, t) {
      var n = co();
      if ($l === null) {
        return Jo(n, e, t);
      } else {
        return ei(n, $l.memoizedState, e, t);
      }
    },
    useTransition: function () {
      var e = vo(mo)[0];
      var t = co().memoizedState;
      return [typeof e == "boolean" ? e : fo(e), t];
    },
    useSyncExternalStore: bo,
    useId: ii,
    useHostTransitionStatus: oi,
    useFormState: zo,
    useActionState: zo,
    useOptimistic: function (e, t) {
      var n = co();
      if ($l !== null) {
        return _o(n, 0, e, t);
      } else {
        n.baseState = e;
        return [e, n.queue.dispatch];
      }
    },
    useMemoCache: po,
    useCacheRefresh: ui
  };
  function Ei(e, t, n, r) {
    n = (n = n(r, t = e.memoizedState)) == null ? t : p({}, t, n);
    e.memoizedState = n;
    if (e.lanes === 0) {
      e.updateQueue.baseState = n;
    }
  }
  Si.useEffectEvent = $o;
  var wi = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = qs();
      var a = Sl(r);
      a.payload = t;
      if (n != null) {
        a.callback = n;
      }
      if ((t = El(e, a, r)) !== null) {
        Xs(t, e, r);
        wl(t, e, r);
      }
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = qs();
      var a = Sl(r);
      a.tag = 1;
      a.payload = t;
      if (n != null) {
        a.callback = n;
      }
      if ((t = El(e, a, r)) !== null) {
        Xs(t, e, r);
        wl(t, e, r);
      }
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = qs();
      var r = Sl(n);
      r.tag = 2;
      if (t != null) {
        r.callback = t;
      }
      if ((t = El(e, r, n)) !== null) {
        Xs(t, e, n);
        wl(t, e, n);
      }
    }
  };
  function ki(e, t, n, r, a, l, o) {
    if (typeof (e = e.stateNode).shouldComponentUpdate == "function") {
      return e.shouldComponentUpdate(r, l, o);
    } else {
      return !t.prototype || !t.prototype.isPureReactComponent || !tr(n, r) || !tr(a, l);
    }
  }
  function Ti(e, t, n, r) {
    e = t.state;
    if (typeof t.componentWillReceiveProps == "function") {
      t.componentWillReceiveProps(n, r);
    }
    if (typeof t.UNSAFE_componentWillReceiveProps == "function") {
      t.UNSAFE_componentWillReceiveProps(n, r);
    }
    if (t.state !== e) {
      wi.enqueueReplaceState(t, t.state, null);
    }
  }
  function Pi(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var r in t) {
        if (r !== "ref") {
          n[r] = t[r];
        }
      }
    }
    if (e = e.defaultProps) {
      if (n === t) {
        n = p({}, n);
      }
      for (var a in e) {
        if (n[a] === undefined) {
          n[a] = e[a];
        }
      }
    }
    return n;
  }
  function _i(e) {
    Nr(e);
  }
  function Ci(e) {}
  function Ni(e) {
    Nr(e);
  }
  function Li(e, t) {
    try {
      (0, e.onUncaughtError)(t.value, {
        componentStack: t.stack
      });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Ai(e, t, n) {
    try {
      (0, e.onCaughtError)(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function Oi(e, t, n) {
    (n = Sl(n)).tag = 3;
    n.payload = {
      element: null
    };
    n.callback = function () {
      Li(e, t);
    };
    return n;
  }
  function xi(e) {
    (e = Sl(e)).tag = 3;
    return e;
  }
  function Ri(e, t, n, r) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var l = r.value;
      e.payload = function () {
        return a(l);
      };
      e.callback = function () {
        Ai(t, n, r);
      };
    }
    var o = n.stateNode;
    if (o !== null && typeof o.componentDidCatch == "function") {
      e.callback = function () {
        Ai(t, n, r);
        if (typeof a != "function") {
          if (zs === null) {
            zs = new Set([this]);
          } else {
            zs.add(this);
          }
        }
        var e = r.stack;
        this.componentDidCatch(r.value, {
          componentStack: e !== null ? e : ""
        });
      };
    }
  }
  var Ii = Error(a(461));
  var Mi = false;
  function Hi(e, t, n, r) {
    t.child = e === null ? gl(t, null, n, r) : ml(t, e.child, n, r);
  }
  function Di(e, t, n, r, a) {
    n = n.render;
    var l = t.ref;
    if ("ref" in r) {
      var o = {};
      for (var i in r) {
        if (i !== "ref") {
          o[i] = r[i];
        }
      }
    } else {
      o = r;
    }
    Ra(t);
    r = no(e, t, n, o, l, a);
    i = oo();
    if (e === null || Mi) {
      if (ha && i) {
        ua(t);
      }
      t.flags |= 1;
      Hi(e, t, r, a);
      return t.child;
    } else {
      io(e, t, a);
      return ou(e, t, a);
    }
  }
  function zi(e, t, n, r, a) {
    if (e === null) {
      var l = n.type;
      if (typeof l != "function" || Ur(l) || l.defaultProps !== undefined || n.compare !== null) {
        (e = Vr(n.type, null, r, t, t.mode, a)).ref = t.ref;
        e.return = t;
        return t.child = e;
      } else {
        t.tag = 15;
        t.type = l;
        return Fi(e, t, l, r, a);
      }
    }
    l = e.child;
    if (!iu(e, a)) {
      var o = l.memoizedProps;
      if ((n = (n = n.compare) !== null ? n : tr)(o, r) && e.ref === t.ref) {
        return ou(e, t, a);
      }
    }
    t.flags |= 1;
    (e = Gr(l, r)).ref = t.ref;
    e.return = t;
    return t.child = e;
  }
  function Fi(e, t, n, r, a) {
    if (e !== null) {
      var l = e.memoizedProps;
      if (tr(l, r) && e.ref === t.ref) {
        Mi = false;
        t.pendingProps = r = l;
        if (!iu(e, a)) {
          t.lanes = e.lanes;
          return ou(e, t, a);
        }
        if (e.flags & 131072) {
          Mi = true;
        }
      }
    }
    return Wi(e, t, n, r, a);
  }
  function Bi(e, t, n, r) {
    var a = r.children;
    var l = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null) {
      t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      };
    }
    if (r.mode === "hidden") {
      if (t.flags & 128) {
        l = l !== null ? l.baseLanes | n : n;
        if (e !== null) {
          r = t.child = e.child;
          a = 0;
          while (r !== null) {
            a = a | r.lanes | r.childLanes;
            r = r.sibling;
          }
          r = a & ~l;
        } else {
          r = 0;
          t.child = null;
        }
        return Gi(e, t, l, n, r);
      }
      if (!(n & 536870912)) {
        r = t.lanes = 536870912;
        return Gi(e, t, l !== null ? l.baseLanes | n : n, n, r);
      }
      t.memoizedState = {
        baseLanes: 0,
        cachePool: null
      };
      if (e !== null) {
        Ya(0, l !== null ? l.cachePool : null);
      }
      if (l !== null) {
        Ol(t, l);
      } else {
        xl();
      }
      zl(t);
    } else if (l !== null) {
      Ya(0, l.cachePool);
      Ol(t, l);
      Fl();
      t.memoizedState = null;
    } else {
      if (e !== null) {
        Ya(0, null);
      }
      xl();
      Fl();
    }
    Hi(e, t, a, n);
    return t.child;
  }
  function Ui(e, t) {
    if ((e === null || e.tag !== 22) && t.stateNode === null) {
      t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      };
    }
    return t.sibling;
  }
  function Gi(e, t, n, r, a) {
    var l = Xa();
    l = l === null ? null : {
      parent: Ba._currentValue,
      pool: l
    };
    t.memoizedState = {
      baseLanes: n,
      cachePool: l
    };
    if (e !== null) {
      Ya(0, null);
    }
    xl();
    zl(t);
    if (e !== null) {
      Oa(e, t, r, true);
    }
    t.childLanes = a;
    return null;
  }
  function ji(e, t) {
    (t = tu({
      mode: t.mode,
      children: t.children
    }, e.mode)).ref = e.ref;
    e.child = t;
    t.return = e;
    return t;
  }
  function Vi(e, t, n) {
    ml(t, e.child, null, n);
    (e = ji(t, t.pendingProps)).flags |= 2;
    Bl(t);
    t.memoizedState = null;
    return e;
  }
  function $i(e, t) {
    var n = t.ref;
    if (n === null) {
      if (e !== null && e.ref !== null) {
        t.flags |= 4194816;
      }
    } else {
      if (typeof n != "function" && typeof n != "object") {
        throw Error(a(284));
      }
      if (e === null || e.ref !== n) {
        t.flags |= 4194816;
      }
    }
  }
  function Wi(e, t, n, r, a) {
    Ra(t);
    n = no(e, t, n, r, undefined, a);
    r = oo();
    if (e === null || Mi) {
      if (ha && r) {
        ua(t);
      }
      t.flags |= 1;
      Hi(e, t, n, a);
      return t.child;
    } else {
      io(e, t, a);
      return ou(e, t, a);
    }
  }
  function Qi(e, t, n, r, a, l) {
    Ra(t);
    t.updateQueue = null;
    n = ao(t, r, n, a);
    ro(e);
    r = oo();
    if (e === null || Mi) {
      if (ha && r) {
        ua(t);
      }
      t.flags |= 1;
      Hi(e, t, n, l);
      return t.child;
    } else {
      io(e, t, l);
      return ou(e, t, l);
    }
  }
  function qi(e, t, n, r, a) {
    Ra(t);
    if (t.stateNode === null) {
      var l = zr;
      var o = n.contextType;
      if (typeof o == "object" && o !== null) {
        l = Ia(o);
      }
      l = new n(r, l);
      t.memoizedState = l.state ?? null;
      l.updater = wi;
      t.stateNode = l;
      l._reactInternals = t;
      (l = t.stateNode).props = r;
      l.state = t.memoizedState;
      l.refs = {};
      vl(t);
      o = n.contextType;
      l.context = typeof o == "object" && o !== null ? Ia(o) : zr;
      l.state = t.memoizedState;
      if (typeof (o = n.getDerivedStateFromProps) == "function") {
        Ei(t, n, o, r);
        l.state = t.memoizedState;
      }
      if (typeof n.getDerivedStateFromProps != "function" && typeof l.getSnapshotBeforeUpdate != "function" && (typeof l.UNSAFE_componentWillMount == "function" || typeof l.componentWillMount == "function")) {
        o = l.state;
        if (typeof l.componentWillMount == "function") {
          l.componentWillMount();
        }
        if (typeof l.UNSAFE_componentWillMount == "function") {
          l.UNSAFE_componentWillMount();
        }
        if (o !== l.state) {
          wi.enqueueReplaceState(l, l.state, null);
        }
        _l(t, r, l, a);
        Pl();
        l.state = t.memoizedState;
      }
      if (typeof l.componentDidMount == "function") {
        t.flags |= 4194308;
      }
      r = true;
    } else if (e === null) {
      l = t.stateNode;
      var i = t.memoizedProps;
      var u = Pi(n, i);
      l.props = u;
      var s = l.context;
      var c = n.contextType;
      o = zr;
      if (typeof c == "object" && c !== null) {
        o = Ia(c);
      }
      var f = n.getDerivedStateFromProps;
      c = typeof f == "function" || typeof l.getSnapshotBeforeUpdate == "function";
      i = t.pendingProps !== i;
      if (!c && (typeof l.UNSAFE_componentWillReceiveProps == "function" || typeof l.componentWillReceiveProps == "function")) {
        if (i || s !== o) {
          Ti(t, l, r, o);
        }
      }
      yl = false;
      var d = t.memoizedState;
      l.state = d;
      _l(t, r, l, a);
      Pl();
      s = t.memoizedState;
      if (i || d !== s || yl) {
        if (typeof f == "function") {
          Ei(t, n, f, r);
          s = t.memoizedState;
        }
        if (u = yl || ki(t, n, u, r, d, s, o)) {
          if (!c && (typeof l.UNSAFE_componentWillMount == "function" || typeof l.componentWillMount == "function")) {
            if (typeof l.componentWillMount == "function") {
              l.componentWillMount();
            }
            if (typeof l.UNSAFE_componentWillMount == "function") {
              l.UNSAFE_componentWillMount();
            }
          }
          if (typeof l.componentDidMount == "function") {
            t.flags |= 4194308;
          }
        } else {
          if (typeof l.componentDidMount == "function") {
            t.flags |= 4194308;
          }
          t.memoizedProps = r;
          t.memoizedState = s;
        }
        l.props = r;
        l.state = s;
        l.context = o;
        r = u;
      } else {
        if (typeof l.componentDidMount == "function") {
          t.flags |= 4194308;
        }
        r = false;
      }
    } else {
      l = t.stateNode;
      bl(e, t);
      c = Pi(n, o = t.memoizedProps);
      l.props = c;
      f = t.pendingProps;
      d = l.context;
      s = n.contextType;
      u = zr;
      if (typeof s == "object" && s !== null) {
        u = Ia(s);
      }
      if (!(s = typeof (i = n.getDerivedStateFromProps) == "function" || typeof l.getSnapshotBeforeUpdate == "function") && (typeof l.UNSAFE_componentWillReceiveProps == "function" || typeof l.componentWillReceiveProps == "function")) {
        if (o !== f || d !== u) {
          Ti(t, l, r, u);
        }
      }
      yl = false;
      d = t.memoizedState;
      l.state = d;
      _l(t, r, l, a);
      Pl();
      var h = t.memoizedState;
      if (o !== f || d !== h || yl || e !== null && e.dependencies !== null && xa(e.dependencies)) {
        if (typeof i == "function") {
          Ei(t, n, i, r);
          h = t.memoizedState;
        }
        if (c = yl || ki(t, n, c, r, d, h, u) || e !== null && e.dependencies !== null && xa(e.dependencies)) {
          if (!s && (typeof l.UNSAFE_componentWillUpdate == "function" || typeof l.componentWillUpdate == "function")) {
            if (typeof l.componentWillUpdate == "function") {
              l.componentWillUpdate(r, h, u);
            }
            if (typeof l.UNSAFE_componentWillUpdate == "function") {
              l.UNSAFE_componentWillUpdate(r, h, u);
            }
          }
          if (typeof l.componentDidUpdate == "function") {
            t.flags |= 4;
          }
          if (typeof l.getSnapshotBeforeUpdate == "function") {
            t.flags |= 1024;
          }
        } else {
          if (typeof l.componentDidUpdate == "function" && (o !== e.memoizedProps || d !== e.memoizedState)) {
            t.flags |= 4;
          }
          if (typeof l.getSnapshotBeforeUpdate == "function" && (o !== e.memoizedProps || d !== e.memoizedState)) {
            t.flags |= 1024;
          }
          t.memoizedProps = r;
          t.memoizedState = h;
        }
        l.props = r;
        l.state = h;
        l.context = u;
        r = c;
      } else {
        if (typeof l.componentDidUpdate == "function" && (o !== e.memoizedProps || d !== e.memoizedState)) {
          t.flags |= 4;
        }
        if (typeof l.getSnapshotBeforeUpdate == "function" && (o !== e.memoizedProps || d !== e.memoizedState)) {
          t.flags |= 1024;
        }
        r = false;
      }
    }
    l = r;
    $i(e, t);
    r = !!(t.flags & 128);
    if (l || r) {
      l = t.stateNode;
      n = r && typeof n.getDerivedStateFromError != "function" ? null : l.render();
      t.flags |= 1;
      if (e !== null && r) {
        t.child = ml(t, e.child, null, a);
        t.child = ml(t, null, n, a);
      } else {
        Hi(e, t, n, a);
      }
      t.memoizedState = l.state;
      e = t.child;
    } else {
      e = ou(e, t, a);
    }
    return e;
  }
  function Ki(e, t, n, r) {
    Ea();
    t.flags |= 256;
    Hi(e, t, n, r);
    return t.child;
  }
  var Xi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Yi(e) {
    return {
      baseLanes: e,
      cachePool: Za()
    };
  }
  function Zi(e, t, n) {
    e = e !== null ? e.childLanes & ~n : 0;
    if (t) {
      e |= Ls;
    }
    return e;
  }
  function Ji(e, t, n) {
    var r;
    var l = t.pendingProps;
    var o = false;
    var i = !!(t.flags & 128);
    if (!(r = i)) {
      r = (e === null || e.memoizedState !== null) && !!(Ul.current & 2);
    }
    if (r) {
      o = true;
      t.flags &= -129;
    }
    r = !!(t.flags & 32);
    t.flags &= -33;
    if (e === null) {
      if (ha) {
        if (o) {
          Hl(t);
        } else {
          Fl();
        }
        if (e = da) {
          if ((e = (e = Rf(e, ma)) !== null && e.data !== "&" ? e : null) !== null) {
            t.memoizedState = {
              dehydrated: e,
              treeContext: ra !== null ? {
                id: aa,
                overflow: la
              } : null,
              retryLane: 536870912,
              hydrationErrors: null
            };
            (n = Qr(e)).return = t;
            t.child = n;
            fa = t;
            da = null;
          }
        } else {
          e = null;
        }
        if (e === null) {
          throw ya(t);
        }
        if (Mf(e)) {
          t.lanes = 32;
        } else {
          t.lanes = 536870912;
        }
        return null;
      }
      var u = l.children;
      l = l.fallback;
      if (o) {
        Fl();
        u = tu({
          mode: "hidden",
          children: u
        }, o = t.mode);
        l = $r(l, o, n, null);
        u.return = t;
        l.return = t;
        u.sibling = l;
        t.child = u;
        (l = t.child).memoizedState = Yi(n);
        l.childLanes = Zi(e, r, n);
        t.memoizedState = Xi;
        return Ui(null, l);
      } else {
        Hl(t);
        return eu(t, u);
      }
    }
    var s = e.memoizedState;
    if (s !== null && (u = s.dehydrated) !== null) {
      if (i) {
        if (t.flags & 256) {
          Hl(t);
          t.flags &= -257;
          t = nu(e, t, n);
        } else if (t.memoizedState !== null) {
          Fl();
          t.child = e.child;
          t.flags |= 128;
          t = null;
        } else {
          Fl();
          u = l.fallback;
          o = t.mode;
          l = tu({
            mode: "visible",
            children: l.children
          }, o);
          (u = $r(u, o, n, null)).flags |= 2;
          l.return = t;
          u.return = t;
          l.sibling = u;
          t.child = l;
          ml(t, e.child, null, n);
          (l = t.child).memoizedState = Yi(n);
          l.childLanes = Zi(e, r, n);
          t.memoizedState = Xi;
          t = Ui(null, l);
        }
      } else {
        Hl(t);
        if (Mf(u)) {
          if (r = u.nextSibling && u.nextSibling.dataset) {
            var c = r.dgst;
          }
          r = c;
          (l = Error(a(419))).stack = "";
          l.digest = r;
          ka({
            value: l,
            source: null,
            stack: null
          });
          t = nu(e, t, n);
        } else {
          if (!Mi) {
            Oa(e, t, n, false);
          }
          r = (n & e.childLanes) !== 0;
          if (Mi || r) {
            if ((r = gs) !== null && (l = De(r, n)) !== 0 && l !== s.retryLane) {
              s.retryLane = l;
              Mr(e, l);
              Xs(r, e, l);
              throw Ii;
            }
            if (!If(u)) {
              uc();
            }
            t = nu(e, t, n);
          } else if (If(u)) {
            t.flags |= 192;
            t.child = e.child;
            t = null;
          } else {
            e = s.treeContext;
            da = Hf(u.nextSibling);
            fa = t;
            ha = true;
            pa = null;
            ma = false;
            if (e !== null) {
              ca(t, e);
            }
            (t = eu(t, l.children)).flags |= 4096;
          }
        }
      }
      return t;
    }
    if (o) {
      Fl();
      u = l.fallback;
      o = t.mode;
      c = (s = e.child).sibling;
      (l = Gr(s, {
        mode: "hidden",
        children: l.children
      })).subtreeFlags = s.subtreeFlags & 65011712;
      if (c !== null) {
        u = Gr(c, u);
      } else {
        (u = $r(u, o, n, null)).flags |= 2;
      }
      u.return = t;
      l.return = t;
      l.sibling = u;
      t.child = l;
      Ui(null, l);
      l = t.child;
      if ((u = e.child.memoizedState) === null) {
        u = Yi(n);
      } else {
        if ((o = u.cachePool) !== null) {
          s = Ba._currentValue;
          o = o.parent !== s ? {
            parent: s,
            pool: s
          } : o;
        } else {
          o = Za();
        }
        u = {
          baseLanes: u.baseLanes | n,
          cachePool: o
        };
      }
      l.memoizedState = u;
      l.childLanes = Zi(e, r, n);
      t.memoizedState = Xi;
      return Ui(e.child, l);
    } else {
      Hl(t);
      e = (n = e.child).sibling;
      (n = Gr(n, {
        mode: "visible",
        children: l.children
      })).return = t;
      n.sibling = null;
      if (e !== null) {
        if ((r = t.deletions) === null) {
          t.deletions = [e];
          t.flags |= 16;
        } else {
          r.push(e);
        }
      }
      t.child = n;
      t.memoizedState = null;
      return n;
    }
  }
  function eu(e, t) {
    (t = tu({
      mode: "visible",
      children: t
    }, e.mode)).return = e;
    return e.child = t;
  }
  function tu(e, t) {
    (e = Br(22, e, null, t)).lanes = 0;
    return e;
  }
  function nu(e, t, n) {
    ml(t, e.child, null, n);
    (e = eu(t, t.pendingProps.children)).flags |= 2;
    t.memoizedState = null;
    return e;
  }
  function ru(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    if (r !== null) {
      r.lanes |= t;
    }
    La(e.return, t, n);
  }
  function au(e, t, n, r, a, l) {
    var o = e.memoizedState;
    if (o === null) {
      e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: a,
        treeForkCount: l
      };
    } else {
      o.isBackwards = t;
      o.rendering = null;
      o.renderingStartTime = 0;
      o.last = r;
      o.tail = n;
      o.tailMode = a;
      o.treeForkCount = l;
    }
  }
  function lu(e, t, n) {
    var r = t.pendingProps;
    var a = r.revealOrder;
    var l = r.tail;
    r = r.children;
    var o = Ul.current;
    var i = !!(o & 2);
    if (i) {
      o = o & 1 | 2;
      t.flags |= 128;
    } else {
      o &= 1;
    }
    j(Ul, o);
    Hi(e, t, r, n);
    r = ha ? ea : 0;
    if (!i && e !== null && e.flags & 128) {
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) {
          if (e.memoizedState !== null) {
            ru(e, n, t);
          }
        } else if (e.tag === 19) {
          ru(e, n, t);
        } else if (e.child !== null) {
          e.child.return = e;
          e = e.child;
          continue;
        }
        if (e === t) {
          break e;
        }
        while (e.sibling === null) {
          if (e.return === null || e.return === t) {
            break e;
          }
          e = e.return;
        }
        e.sibling.return = e.return;
        e = e.sibling;
      }
    }
    switch (a) {
      case "forwards":
        n = t.child;
        a = null;
        while (n !== null) {
          if ((e = n.alternate) !== null && Gl(e) === null) {
            a = n;
          }
          n = n.sibling;
        }
        if ((n = a) === null) {
          a = t.child;
          t.child = null;
        } else {
          a = n.sibling;
          n.sibling = null;
        }
        au(t, false, a, n, l, r);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        n = null;
        a = t.child;
        t.child = null;
        while (a !== null) {
          if ((e = a.alternate) !== null && Gl(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling;
          a.sibling = n;
          n = a;
          a = e;
        }
        au(t, true, n, null, l, r);
        break;
      case "together":
        au(t, false, null, null, undefined, r);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ou(e, t, n) {
    if (e !== null) {
      t.dependencies = e.dependencies;
    }
    _s |= t.lanes;
    if ((n & t.childLanes) === 0) {
      if (e === null) {
        return null;
      }
      Oa(e, t, n, false);
      if ((n & t.childLanes) === 0) {
        return null;
      }
    }
    if (e !== null && t.child !== e.child) {
      throw Error(a(153));
    }
    if (t.child !== null) {
      n = Gr(e = t.child, e.pendingProps);
      t.child = n;
      n.return = t;
      while (e.sibling !== null) {
        e = e.sibling;
        (n = n.sibling = Gr(e, e.pendingProps)).return = t;
      }
      n.sibling = null;
    }
    return t.child;
  }
  function iu(e, t) {
    return (e.lanes & t) !== 0 || (e = e.dependencies) !== null && !!xa(e);
  }
  function uu(e, t, n) {
    if (e !== null) {
      if (e.memoizedProps !== t.pendingProps) {
        Mi = true;
      } else {
        if (!iu(e, n) && !(t.flags & 128)) {
          Mi = false;
          return function (e, t, n) {
            switch (t.tag) {
              case 3:
                X(t, t.stateNode.containerInfo);
                Ca(0, Ba, e.memoizedState.cache);
                Ea();
                break;
              case 27:
              case 5:
                Z(t);
                break;
              case 4:
                X(t, t.stateNode.containerInfo);
                break;
              case 10:
                Ca(0, t.type, t.memoizedProps.value);
                break;
              case 31:
                if (t.memoizedState !== null) {
                  t.flags |= 128;
                  Dl(t);
                  return null;
                }
                break;
              case 13:
                var r = t.memoizedState;
                if (r !== null) {
                  if (r.dehydrated !== null) {
                    Hl(t);
                    t.flags |= 128;
                    return null;
                  } else if ((n & t.child.childLanes) !== 0) {
                    return Ji(e, t, n);
                  } else {
                    Hl(t);
                    if ((e = ou(e, t, n)) !== null) {
                      return e.sibling;
                    } else {
                      return null;
                    }
                  }
                }
                Hl(t);
                break;
              case 19:
                var a = !!(e.flags & 128);
                if (!(r = (n & t.childLanes) !== 0)) {
                  Oa(e, t, n, false);
                  r = (n & t.childLanes) !== 0;
                }
                if (a) {
                  if (r) {
                    return lu(e, t, n);
                  }
                  t.flags |= 128;
                }
                if ((a = t.memoizedState) !== null) {
                  a.rendering = null;
                  a.tail = null;
                  a.lastEffect = null;
                }
                j(Ul, Ul.current);
                if (r) {
                  break;
                }
                return null;
              case 22:
                t.lanes = 0;
                return Bi(e, t, n, t.pendingProps);
              case 24:
                Ca(0, Ba, e.memoizedState.cache);
            }
            return ou(e, t, n);
          }(e, t, n);
        }
        Mi = !!(e.flags & 131072);
      }
    } else {
      Mi = false;
      if (ha && t.flags & 1048576) {
        ia(t, ea, t.index);
      }
    }
    t.lanes = 0;
    switch (t.tag) {
      case 16:
        e: {
          var r = t.pendingProps;
          e = ll(t.elementType);
          t.type = e;
          if (typeof e != "function") {
            if (e != null) {
              var l = e.$$typeof;
              if (l === T) {
                t.tag = 11;
                t = Di(null, t, e, r, n);
                break e;
              }
              if (l === C) {
                t.tag = 14;
                t = zi(null, t, e, r, n);
                break e;
              }
            }
            t = I(e) || e;
            throw Error(a(306, t, ""));
          }
          if (Ur(e)) {
            r = Pi(e, r);
            t.tag = 1;
            t = qi(null, t, e, r, n);
          } else {
            t.tag = 0;
            t = Wi(null, t, e, r, n);
          }
        }
        return t;
      case 0:
        return Wi(e, t, t.type, t.pendingProps, n);
      case 1:
        return qi(e, t, r = t.type, l = Pi(r, t.pendingProps), n);
      case 3:
        e: {
          X(t, t.stateNode.containerInfo);
          if (e === null) {
            throw Error(a(387));
          }
          r = t.pendingProps;
          var o = t.memoizedState;
          l = o.element;
          bl(e, t);
          _l(t, r, null, n);
          var i = t.memoizedState;
          r = i.cache;
          Ca(0, Ba, r);
          if (r !== o.cache) {
            Aa(t, [Ba], n, true);
          }
          Pl();
          r = i.element;
          if (o.isDehydrated) {
            o = {
              element: r,
              isDehydrated: false,
              cache: i.cache
            };
            t.updateQueue.baseState = o;
            t.memoizedState = o;
            if (t.flags & 256) {
              t = Ki(e, t, r, n);
              break e;
            }
            if (r !== l) {
              ka(l = Xr(Error(a(424)), t));
              t = Ki(e, t, r, n);
              break e;
            }
            if ((e = t.stateNode.containerInfo).nodeType === 9) {
              e = e.body;
            } else {
              e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
            }
            da = Hf(e.firstChild);
            fa = t;
            ha = true;
            pa = null;
            ma = true;
            n = gl(t, null, r, n);
            t.child = n;
            while (n) {
              n.flags = n.flags & -3 | 4096;
              n = n.sibling;
            }
          } else {
            Ea();
            if (r === l) {
              t = ou(e, t, n);
              break e;
            }
            Hi(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        $i(e, t);
        if (e === null) {
          if (n = qf(t.type, null, t.pendingProps, null)) {
            t.memoizedState = n;
          } else if (!ha) {
            n = t.type;
            e = t.pendingProps;
            (r = bf(q.current).createElement(n))[je] = t;
            r[Ve] = e;
            mf(r, n, e);
            nt(r);
            t.stateNode = r;
          }
        } else {
          t.memoizedState = qf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState);
        }
        return null;
      case 27:
        Z(t);
        if (e === null && ha) {
          r = t.stateNode = Bf(t.type, t.pendingProps, q.current);
          fa = t;
          ma = true;
          l = da;
          if (Lf(t.type)) {
            Df = l;
            da = Hf(r.firstChild);
          } else {
            da = l;
          }
        }
        Hi(e, t, t.pendingProps.children, n);
        $i(e, t);
        if (e === null) {
          t.flags |= 4194304;
        }
        return t.child;
      case 5:
        if (e === null && ha) {
          if (l = r = da) {
            if ((r = function (e, t, n, r) {
              while (e.nodeType === 1) {
                var a = n;
                if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                  if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) {
                    break;
                  }
                } else if (r) {
                  if (!e[Xe]) {
                    switch (t) {
                      case "meta":
                        if (!e.hasAttribute("itemprop")) {
                          break;
                        }
                        return e;
                      case "link":
                        if ((l = e.getAttribute("rel")) === "stylesheet" && e.hasAttribute("data-precedence")) {
                          break;
                        }
                        if (l !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title)) {
                          break;
                        }
                        return e;
                      case "style":
                        if (e.hasAttribute("data-precedence")) {
                          break;
                        }
                        return e;
                      case "script":
                        if (((l = e.getAttribute("src")) !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && l && e.hasAttribute("async") && !e.hasAttribute("itemprop")) {
                          break;
                        }
                        return e;
                      default:
                        return e;
                    }
                  }
                } else {
                  if (t !== "input" || e.type !== "hidden") {
                    return e;
                  }
                  var l = a.name == null ? null : "" + a.name;
                  if (a.type === "hidden" && e.getAttribute("name") === l) {
                    return e;
                  }
                }
                if ((e = Hf(e.nextSibling)) === null) {
                  break;
                }
              }
              return null;
            }(r, t.type, t.pendingProps, ma)) !== null) {
              t.stateNode = r;
              fa = t;
              da = Hf(r.firstChild);
              ma = false;
              l = true;
            } else {
              l = false;
            }
          }
          if (!l) {
            ya(t);
          }
        }
        Z(t);
        l = t.type;
        o = t.pendingProps;
        i = e !== null ? e.memoizedProps : null;
        r = o.children;
        if (wf(l, o)) {
          r = null;
        } else if (i !== null && wf(l, i)) {
          t.flags |= 32;
        }
        if (t.memoizedState !== null) {
          l = no(e, t, lo, null, null, n);
          hd._currentValue = l;
        }
        $i(e, t);
        Hi(e, t, r, n);
        return t.child;
      case 6:
        if (e === null && ha) {
          if (e = n = da) {
            if ((n = function (e, t, n) {
              if (t === "") {
                return null;
              }
              while (e.nodeType !== 3) {
                if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n) {
                  return null;
                }
                if ((e = Hf(e.nextSibling)) === null) {
                  return null;
                }
              }
              return e;
            }(n, t.pendingProps, ma)) !== null) {
              t.stateNode = n;
              fa = t;
              da = null;
              e = true;
            } else {
              e = false;
            }
          }
          if (!e) {
            ya(t);
          }
        }
        return null;
      case 13:
        return Ji(e, t, n);
      case 4:
        X(t, t.stateNode.containerInfo);
        r = t.pendingProps;
        if (e === null) {
          t.child = ml(t, null, r, n);
        } else {
          Hi(e, t, r, n);
        }
        return t.child;
      case 11:
        return Di(e, t, t.type, t.pendingProps, n);
      case 7:
        Hi(e, t, t.pendingProps, n);
        return t.child;
      case 8:
      case 12:
        Hi(e, t, t.pendingProps.children, n);
        return t.child;
      case 10:
        r = t.pendingProps;
        Ca(0, t.type, r.value);
        Hi(e, t, r.children, n);
        return t.child;
      case 9:
        l = t.type._context;
        r = t.pendingProps.children;
        Ra(t);
        r = r(l = Ia(l));
        t.flags |= 1;
        Hi(e, t, r, n);
        return t.child;
      case 14:
        return zi(e, t, t.type, t.pendingProps, n);
      case 15:
        return Fi(e, t, t.type, t.pendingProps, n);
      case 19:
        return lu(e, t, n);
      case 31:
        return function (e, t, n) {
          var r = t.pendingProps;
          var l = !!(t.flags & 128);
          t.flags &= -129;
          if (e === null) {
            if (ha) {
              if (r.mode === "hidden") {
                e = ji(t, r);
                t.lanes = 536870912;
                return Ui(null, e);
              }
              Dl(t);
              if (e = da) {
                if ((e = (e = Rf(e, ma)) !== null && e.data === "&" ? e : null) !== null) {
                  t.memoizedState = {
                    dehydrated: e,
                    treeContext: ra !== null ? {
                      id: aa,
                      overflow: la
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                  };
                  (n = Qr(e)).return = t;
                  t.child = n;
                  fa = t;
                  da = null;
                }
              } else {
                e = null;
              }
              if (e === null) {
                throw ya(t);
              }
              t.lanes = 536870912;
              return null;
            }
            return ji(t, r);
          }
          var o = e.memoizedState;
          if (o !== null) {
            var i = o.dehydrated;
            Dl(t);
            if (l) {
              if (t.flags & 256) {
                t.flags &= -257;
                t = Vi(e, t, n);
              } else {
                if (t.memoizedState === null) {
                  throw Error(a(558));
                }
                t.child = e.child;
                t.flags |= 128;
                t = null;
              }
            } else {
              if (!Mi) {
                Oa(e, t, n, false);
              }
              l = (n & e.childLanes) !== 0;
              if (Mi || l) {
                if ((r = gs) !== null && (i = De(r, n)) !== 0 && i !== o.retryLane) {
                  o.retryLane = i;
                  Mr(e, i);
                  Xs(r, e, i);
                  throw Ii;
                }
                uc();
                t = Vi(e, t, n);
              } else {
                e = o.treeContext;
                da = Hf(i.nextSibling);
                fa = t;
                ha = true;
                pa = null;
                ma = false;
                if (e !== null) {
                  ca(t, e);
                }
                (t = ji(t, r)).flags |= 4096;
              }
            }
            return t;
          }
          (e = Gr(e.child, {
            mode: r.mode,
            children: r.children
          })).ref = t.ref;
          t.child = e;
          e.return = t;
          return e;
        }(e, t, n);
      case 22:
        return Bi(e, t, n, t.pendingProps);
      case 24:
        Ra(t);
        r = Ia(Ba);
        if (e === null) {
          if ((l = Xa()) === null) {
            l = gs;
            o = Ua();
            l.pooledCache = o;
            o.refCount++;
            if (o !== null) {
              l.pooledCacheLanes |= n;
            }
            l = o;
          }
          t.memoizedState = {
            parent: r,
            cache: l
          };
          vl(t);
          Ca(0, Ba, l);
        } else {
          if ((e.lanes & n) !== 0) {
            bl(e, t);
            _l(t, null, null, n);
            Pl();
          }
          l = e.memoizedState;
          o = t.memoizedState;
          if (l.parent !== r) {
            l = {
              parent: r,
              cache: r
            };
            t.memoizedState = l;
            if (t.lanes === 0) {
              t.memoizedState = t.updateQueue.baseState = l;
            }
            Ca(0, Ba, r);
          } else {
            r = o.cache;
            Ca(0, Ba, r);
            if (r !== l.cache) {
              Aa(t, [Ba], n, true);
            }
          }
        }
        Hi(e, t, t.pendingProps.children, n);
        return t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(a(156, t.tag));
  }
  function su(e) {
    e.flags |= 4;
  }
  function cu(e, t, n, r, a) {
    if (t = !!(e.mode & 32)) {
      t = false;
    }
    if (t) {
      e.flags |= 16777216;
      if ((a & 335544128) === a) {
        if (e.stateNode.complete) {
          e.flags |= 8192;
        } else {
          if (!lc()) {
            ol = nl;
            throw el;
          }
          e.flags |= 8192;
        }
      }
    } else {
      e.flags &= -16777217;
    }
  }
  function fu(e, t) {
    if (t.type !== "stylesheet" || t.state.loading & 4) {
      e.flags &= -16777217;
    } else {
      e.flags |= 16777216;
      if (!id(t)) {
        if (!lc()) {
          ol = nl;
          throw el;
        }
        e.flags |= 8192;
      }
    }
  }
  function du(e, t) {
    if (t !== null) {
      e.flags |= 4;
    }
    if (e.flags & 16384) {
      t = e.tag !== 22 ? xe() : 536870912;
      e.lanes |= t;
      As |= t;
    }
  }
  function hu(e, t) {
    if (!ha) {
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          var n = null;
          for (; t !== null;) {
            if (t.alternate !== null) {
              n = t;
            }
            t = t.sibling;
          }
          if (n === null) {
            e.tail = null;
          } else {
            n.sibling = null;
          }
          break;
        case "collapsed":
          n = e.tail;
          var r = null;
          for (; n !== null;) {
            if (n.alternate !== null) {
              r = n;
            }
            n = n.sibling;
          }
          if (r === null) {
            if (t || e.tail === null) {
              e.tail = null;
            } else {
              e.tail.sibling = null;
            }
          } else {
            r.sibling = null;
          }
      }
    }
  }
  function pu(e) {
    var t = e.alternate !== null && e.alternate.child === e.child;
    var n = 0;
    var r = 0;
    if (t) {
      for (var a = e.child; a !== null;) {
        n |= a.lanes | a.childLanes;
        r |= a.subtreeFlags & 65011712;
        r |= a.flags & 65011712;
        a.return = e;
        a = a.sibling;
      }
    } else {
      for (a = e.child; a !== null;) {
        n |= a.lanes | a.childLanes;
        r |= a.subtreeFlags;
        r |= a.flags;
        a.return = e;
        a = a.sibling;
      }
    }
    e.subtreeFlags |= r;
    e.childLanes = n;
    return t;
  }
  function mu(e, t, n) {
    var r = t.pendingProps;
    sa(t);
    switch (t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
      case 1:
        pu(t);
        return null;
      case 3:
        n = t.stateNode;
        r = null;
        if (e !== null) {
          r = e.memoizedState.cache;
        }
        if (t.memoizedState.cache !== r) {
          t.flags |= 2048;
        }
        Na(Ba);
        Y();
        if (n.pendingContext) {
          n.context = n.pendingContext;
          n.pendingContext = null;
        }
        if (e === null || e.child === null) {
          if (Sa(t)) {
            su(t);
          } else if (e !== null && (!e.memoizedState.isDehydrated || !!(t.flags & 256))) {
            t.flags |= 1024;
            wa();
          }
        }
        pu(t);
        return null;
      case 26:
        var l = t.type;
        var o = t.memoizedState;
        if (e === null) {
          su(t);
          if (o !== null) {
            pu(t);
            fu(t, o);
          } else {
            pu(t);
            cu(t, l, 0, 0, n);
          }
        } else if (o) {
          if (o !== e.memoizedState) {
            su(t);
            pu(t);
            fu(t, o);
          } else {
            pu(t);
            t.flags &= -16777217;
          }
        } else {
          if ((e = e.memoizedProps) !== r) {
            su(t);
          }
          pu(t);
          cu(t, l, 0, 0, n);
        }
        return null;
      case 27:
        J(t);
        n = q.current;
        l = t.type;
        if (e !== null && t.stateNode != null) {
          if (e.memoizedProps !== r) {
            su(t);
          }
        } else {
          if (!r) {
            if (t.stateNode === null) {
              throw Error(a(166));
            }
            pu(t);
            return null;
          }
          e = W.current;
          if (Sa(t)) {
            va(t);
          } else {
            e = Bf(l, r, n);
            t.stateNode = e;
            su(t);
          }
        }
        pu(t);
        return null;
      case 5:
        J(t);
        l = t.type;
        if (e !== null && t.stateNode != null) {
          if (e.memoizedProps !== r) {
            su(t);
          }
        } else {
          if (!r) {
            if (t.stateNode === null) {
              throw Error(a(166));
            }
            pu(t);
            return null;
          }
          o = W.current;
          if (Sa(t)) {
            va(t);
          } else {
            var i = bf(q.current);
            switch (o) {
              case 1:
                o = i.createElementNS("http://www.w3.org/2000/svg", l);
                break;
              case 2:
                o = i.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                break;
              default:
                switch (l) {
                  case "svg":
                    o = i.createElementNS("http://www.w3.org/2000/svg", l);
                    break;
                  case "math":
                    o = i.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                    break;
                  case "script":
                    (o = i.createElement("div")).innerHTML = "<script></script>";
                    o = o.removeChild(o.firstChild);
                    break;
                  case "select":
                    o = typeof r.is == "string" ? i.createElement("select", {
                      is: r.is
                    }) : i.createElement("select");
                    if (r.multiple) {
                      o.multiple = true;
                    } else if (r.size) {
                      o.size = r.size;
                    }
                    break;
                  default:
                    o = typeof r.is == "string" ? i.createElement(l, {
                      is: r.is
                    }) : i.createElement(l);
                }
            }
            o[je] = t;
            o[Ve] = r;
            e: for (i = t.child; i !== null;) {
              if (i.tag === 5 || i.tag === 6) {
                o.appendChild(i.stateNode);
              } else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i;
                i = i.child;
                continue;
              }
              if (i === t) {
                break e;
              }
              while (i.sibling === null) {
                if (i.return === null || i.return === t) {
                  break e;
                }
                i = i.return;
              }
              i.sibling.return = i.return;
              i = i.sibling;
            }
            t.stateNode = o;
            mf(o, l, r);
            e: switch (l) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = true;
                break e;
              default:
                r = false;
            }
            if (r) {
              su(t);
            }
          }
        }
        pu(t);
        cu(t, t.type, e === null || e.memoizedProps, t.pendingProps, n);
        return null;
      case 6:
        if (e && t.stateNode != null) {
          if (e.memoizedProps !== r) {
            su(t);
          }
        } else {
          if (typeof r != "string" && t.stateNode === null) {
            throw Error(a(166));
          }
          e = q.current;
          if (Sa(t)) {
            e = t.stateNode;
            n = t.memoizedProps;
            r = null;
            if ((l = fa) !== null) {
              switch (l.tag) {
                case 27:
                case 5:
                  r = l.memoizedProps;
              }
            }
            e[je] = t;
            if (!(e = e.nodeValue === n || r !== null && r.suppressHydrationWarning === true || !!df(e.nodeValue, n))) {
              ya(t, true);
            }
          } else {
            (e = bf(e).createTextNode(r))[je] = t;
            t.stateNode = e;
          }
        }
        pu(t);
        return null;
      case 31:
        n = t.memoizedState;
        if (e === null || e.memoizedState !== null) {
          r = Sa(t);
          if (n !== null) {
            if (e === null) {
              if (!r) {
                throw Error(a(318));
              }
              if (!(e = (e = t.memoizedState) !== null ? e.dehydrated : null)) {
                throw Error(a(557));
              }
              e[je] = t;
            } else {
              Ea();
              if (!(t.flags & 128)) {
                t.memoizedState = null;
              }
              t.flags |= 4;
            }
            pu(t);
            e = false;
          } else {
            n = wa();
            if (e !== null && e.memoizedState !== null) {
              e.memoizedState.hydrationErrors = n;
            }
            e = true;
          }
          if (!e) {
            if (t.flags & 256) {
              Bl(t);
              return t;
            } else {
              Bl(t);
              return null;
            }
          }
          if (t.flags & 128) {
            throw Error(a(558));
          }
        }
        pu(t);
        return null;
      case 13:
        r = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          l = Sa(t);
          if (r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!l) {
                throw Error(a(318));
              }
              if (!(l = (l = t.memoizedState) !== null ? l.dehydrated : null)) {
                throw Error(a(317));
              }
              l[je] = t;
            } else {
              Ea();
              if (!(t.flags & 128)) {
                t.memoizedState = null;
              }
              t.flags |= 4;
            }
            pu(t);
            l = false;
          } else {
            l = wa();
            if (e !== null && e.memoizedState !== null) {
              e.memoizedState.hydrationErrors = l;
            }
            l = true;
          }
          if (!l) {
            if (t.flags & 256) {
              Bl(t);
              return t;
            } else {
              Bl(t);
              return null;
            }
          }
        }
        Bl(t);
        if (t.flags & 128) {
          t.lanes = n;
          return t;
        } else {
          n = r !== null;
          e = e !== null && e.memoizedState !== null;
          if (n) {
            l = null;
            if ((r = t.child).alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null) {
              l = r.alternate.memoizedState.cachePool.pool;
            }
            o = null;
            if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
              o = r.memoizedState.cachePool.pool;
            }
            if (o !== l) {
              r.flags |= 2048;
            }
          }
          if (n !== e && n) {
            t.child.flags |= 8192;
          }
          du(t, t.updateQueue);
          pu(t);
          return null;
        }
      case 4:
        Y();
        if (e === null) {
          tf(t.stateNode.containerInfo);
        }
        pu(t);
        return null;
      case 10:
        Na(t.type);
        pu(t);
        return null;
      case 19:
        G(Ul);
        if ((r = t.memoizedState) === null) {
          pu(t);
          return null;
        }
        l = !!(t.flags & 128);
        if ((o = r.rendering) === null) {
          if (l) {
            hu(r, false);
          } else {
            if (Ps !== 0 || e !== null && e.flags & 128) {
              for (e = t.child; e !== null;) {
                if ((o = Gl(e)) !== null) {
                  t.flags |= 128;
                  hu(r, false);
                  e = o.updateQueue;
                  t.updateQueue = e;
                  du(t, e);
                  t.subtreeFlags = 0;
                  e = n;
                  n = t.child;
                  while (n !== null) {
                    jr(n, e);
                    n = n.sibling;
                  }
                  j(Ul, Ul.current & 1 | 2);
                  if (ha) {
                    oa(t, r.treeForkCount);
                  }
                  return t.child;
                }
                e = e.sibling;
              }
            }
            if (r.tail !== null && ce() > Hs) {
              t.flags |= 128;
              l = true;
              hu(r, false);
              t.lanes = 4194304;
            }
          }
        } else {
          if (!l) {
            if ((e = Gl(o)) !== null) {
              t.flags |= 128;
              l = true;
              e = e.updateQueue;
              t.updateQueue = e;
              du(t, e);
              hu(r, true);
              if (r.tail === null && r.tailMode === "hidden" && !o.alternate && !ha) {
                pu(t);
                return null;
              }
            } else if (ce() * 2 - r.renderingStartTime > Hs && n !== 536870912) {
              t.flags |= 128;
              l = true;
              hu(r, false);
              t.lanes = 4194304;
            }
          }
          if (r.isBackwards) {
            o.sibling = t.child;
            t.child = o;
          } else {
            if ((e = r.last) !== null) {
              e.sibling = o;
            } else {
              t.child = o;
            }
            r.last = o;
          }
        }
        if (r.tail !== null) {
          e = r.tail;
          r.rendering = e;
          r.tail = e.sibling;
          r.renderingStartTime = ce();
          e.sibling = null;
          n = Ul.current;
          j(Ul, l ? n & 1 | 2 : n & 1);
          if (ha) {
            oa(t, r.treeForkCount);
          }
          return e;
        } else {
          pu(t);
          return null;
        }
      case 22:
      case 23:
        Bl(t);
        Rl();
        r = t.memoizedState !== null;
        if (e !== null) {
          if (e.memoizedState !== null !== r) {
            t.flags |= 8192;
          }
        } else if (r) {
          t.flags |= 8192;
        }
        if (r) {
          if (!!(n & 536870912) && !(t.flags & 128)) {
            pu(t);
            if (t.subtreeFlags & 6) {
              t.flags |= 8192;
            }
          }
        } else {
          pu(t);
        }
        if ((n = t.updateQueue) !== null) {
          du(t, n.retryQueue);
        }
        n = null;
        if (e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null) {
          n = e.memoizedState.cachePool.pool;
        }
        r = null;
        if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
          r = t.memoizedState.cachePool.pool;
        }
        if (r !== n) {
          t.flags |= 2048;
        }
        if (e !== null) {
          G(Ka);
        }
        return null;
      case 24:
        n = null;
        if (e !== null) {
          n = e.memoizedState.cache;
        }
        if (t.memoizedState.cache !== n) {
          t.flags |= 2048;
        }
        Na(Ba);
        pu(t);
        return null;
      case 25:
      case 30:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  function gu(e, t) {
    sa(t);
    switch (t.tag) {
      case 1:
        if ((e = t.flags) & 65536) {
          t.flags = e & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 3:
        Na(Ba);
        Y();
        if ((e = t.flags) & 65536 && !(e & 128)) {
          t.flags = e & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 26:
      case 27:
      case 5:
        J(t);
        return null;
      case 31:
        if (t.memoizedState !== null) {
          Bl(t);
          if (t.alternate === null) {
            throw Error(a(340));
          }
          Ea();
        }
        if ((e = t.flags) & 65536) {
          t.flags = e & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 13:
        Bl(t);
        if ((e = t.memoizedState) !== null && e.dehydrated !== null) {
          if (t.alternate === null) {
            throw Error(a(340));
          }
          Ea();
        }
        if ((e = t.flags) & 65536) {
          t.flags = e & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 19:
        G(Ul);
        return null;
      case 4:
        Y();
        return null;
      case 10:
        Na(t.type);
        return null;
      case 22:
      case 23:
        Bl(t);
        Rl();
        if (e !== null) {
          G(Ka);
        }
        if ((e = t.flags) & 65536) {
          t.flags = e & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 24:
        Na(Ba);
        return null;
      default:
        return null;
    }
  }
  function yu(e, t) {
    sa(t);
    switch (t.tag) {
      case 3:
        Na(Ba);
        Y();
        break;
      case 26:
      case 27:
      case 5:
        J(t);
        break;
      case 4:
        Y();
        break;
      case 31:
        if (t.memoizedState !== null) {
          Bl(t);
        }
        break;
      case 13:
        Bl(t);
        break;
      case 19:
        G(Ul);
        break;
      case 10:
        Na(t.type);
        break;
      case 22:
      case 23:
        Bl(t);
        Rl();
        if (e !== null) {
          G(Ka);
        }
        break;
      case 24:
        Na(Ba);
    }
  }
  function vu(e, t) {
    try {
      var n = t.updateQueue;
      var r = n !== null ? n.lastEffect : null;
      if (r !== null) {
        var a = r.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            r = undefined;
            var l = n.create;
            var o = n.inst;
            r = l();
            o.destroy = r;
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (i) {
      Pc(t, t.return, i);
    }
  }
  function bu(e, t, n) {
    try {
      var r = t.updateQueue;
      var a = r !== null ? r.lastEffect : null;
      if (a !== null) {
        var l = a.next;
        r = l;
        do {
          if ((r.tag & e) === e) {
            var o = r.inst;
            var i = o.destroy;
            if (i !== undefined) {
              o.destroy = undefined;
              a = t;
              var u = n;
              var s = i;
              try {
                s();
              } catch (c) {
                Pc(a, u, c);
              }
            }
          }
          r = r.next;
        } while (r !== l);
      }
    } catch (c) {
      Pc(t, t.return, c);
    }
  }
  function Su(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Nl(t, n);
      } catch (r) {
        Pc(e, e.return, r);
      }
    }
  }
  function Eu(e, t, n) {
    n.props = Pi(e.type, e.memoizedProps);
    n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (r) {
      Pc(e, t, r);
    }
  }
  function wu(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        if (typeof n == "function") {
          e.refCleanup = n(r);
        } else {
          n.current = r;
        }
      }
    } catch (a) {
      Pc(e, t, a);
    }
  }
  function ku(e, t) {
    var n = e.ref;
    var r = e.refCleanup;
    if (n !== null) {
      if (typeof r == "function") {
        try {
          r();
        } catch (a) {
          Pc(e, t, a);
        } finally {
          e.refCleanup = null;
          if ((e = e.alternate) != null) {
            e.refCleanup = null;
          }
        }
      } else if (typeof n == "function") {
        try {
          n(null);
        } catch (l) {
          Pc(e, t, l);
        }
      } else {
        n.current = null;
      }
    }
  }
  function Tu(e) {
    var t = e.type;
    var n = e.memoizedProps;
    var r = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          if (n.autoFocus) {
            r.focus();
          }
          break e;
        case "img":
          if (n.src) {
            r.src = n.src;
          } else if (n.srcSet) {
            r.srcset = n.srcSet;
          }
      }
    } catch (a) {
      Pc(e, e.return, a);
    }
  }
  function Pu(e, t, n) {
    try {
      var r = e.stateNode;
      (function (e, t, n, r) {
        switch (t) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "input":
            var l = null;
            var o = null;
            var i = null;
            var u = null;
            var s = null;
            var c = null;
            var f = null;
            for (p in n) {
              var d = n[p];
              if (n.hasOwnProperty(p) && d != null) {
                switch (p) {
                  case "checked":
                  case "value":
                    break;
                  case "defaultValue":
                    s = d;
                  default:
                    if (!r.hasOwnProperty(p)) {
                      hf(e, t, p, null, r, d);
                    }
                }
              }
            }
            for (var h in r) {
              var p = r[h];
              d = n[h];
              if (r.hasOwnProperty(h) && (p != null || d != null)) {
                switch (h) {
                  case "type":
                    o = p;
                    break;
                  case "name":
                    l = p;
                    break;
                  case "checked":
                    c = p;
                    break;
                  case "defaultChecked":
                    f = p;
                    break;
                  case "value":
                    i = p;
                    break;
                  case "defaultValue":
                    u = p;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (p != null) {
                      throw Error(a(137, t));
                    }
                    break;
                  default:
                    if (p !== d) {
                      hf(e, t, h, p, r, d);
                    }
                }
              }
            }
            St(e, i, u, s, c, f, o, l);
            return;
          case "select":
            p = i = u = h = null;
            for (o in n) {
              s = n[o];
              if (n.hasOwnProperty(o) && s != null) {
                switch (o) {
                  case "value":
                    break;
                  case "multiple":
                    p = s;
                  default:
                    if (!r.hasOwnProperty(o)) {
                      hf(e, t, o, null, r, s);
                    }
                }
              }
            }
            for (l in r) {
              o = r[l];
              s = n[l];
              if (r.hasOwnProperty(l) && (o != null || s != null)) {
                switch (l) {
                  case "value":
                    h = o;
                    break;
                  case "defaultValue":
                    u = o;
                    break;
                  case "multiple":
                    i = o;
                  default:
                    if (o !== s) {
                      hf(e, t, l, o, r, s);
                    }
                }
              }
            }
            t = u;
            n = i;
            r = p;
            if (h != null) {
              kt(e, !!n, h, false);
            } else if (!!r != !!n) {
              if (t != null) {
                kt(e, !!n, t, true);
              } else {
                kt(e, !!n, n ? [] : "", false);
              }
            }
            return;
          case "textarea":
            p = h = null;
            for (u in n) {
              l = n[u];
              if (n.hasOwnProperty(u) && l != null && !r.hasOwnProperty(u)) {
                switch (u) {
                  case "value":
                  case "children":
                    break;
                  default:
                    hf(e, t, u, null, r, l);
                }
              }
            }
            for (i in r) {
              l = r[i];
              o = n[i];
              if (r.hasOwnProperty(i) && (l != null || o != null)) {
                switch (i) {
                  case "value":
                    h = l;
                    break;
                  case "defaultValue":
                    p = l;
                    break;
                  case "children":
                    break;
                  case "dangerouslySetInnerHTML":
                    if (l != null) {
                      throw Error(a(91));
                    }
                    break;
                  default:
                    if (l !== o) {
                      hf(e, t, i, l, r, o);
                    }
                }
              }
            }
            Tt(e, h, p);
            return;
          case "option":
            for (var m in n) {
              h = n[m];
              if (n.hasOwnProperty(m) && h != null && !r.hasOwnProperty(m)) {
                if (m === "selected") {
                  e.selected = false;
                } else {
                  hf(e, t, m, null, r, h);
                }
              }
            }
            for (s in r) {
              h = r[s];
              p = n[s];
              if (r.hasOwnProperty(s) && h !== p && (h != null || p != null)) {
                if (s === "selected") {
                  e.selected = h && typeof h != "function" && typeof h != "symbol";
                } else {
                  hf(e, t, s, h, r, p);
                }
              }
            }
            return;
          case "img":
          case "link":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
          case "menuitem":
            for (var g in n) {
              h = n[g];
              if (n.hasOwnProperty(g) && h != null && !r.hasOwnProperty(g)) {
                hf(e, t, g, null, r, h);
              }
            }
            for (c in r) {
              h = r[c];
              p = n[c];
              if (r.hasOwnProperty(c) && h !== p && (h != null || p != null)) {
                switch (c) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (h != null) {
                      throw Error(a(137, t));
                    }
                    break;
                  default:
                    hf(e, t, c, h, r, p);
                }
              }
            }
            return;
          default:
            if (At(t)) {
              for (var y in n) {
                h = n[y];
                if (n.hasOwnProperty(y) && h !== undefined && !r.hasOwnProperty(y)) {
                  pf(e, t, y, undefined, r, h);
                }
              }
              for (f in r) {
                h = r[f];
                p = n[f];
                if (!!r.hasOwnProperty(f) && h !== p && (h !== undefined || p !== undefined)) {
                  pf(e, t, f, h, r, p);
                }
              }
              return;
            }
        }
        for (var v in n) {
          h = n[v];
          if (n.hasOwnProperty(v) && h != null && !r.hasOwnProperty(v)) {
            hf(e, t, v, null, r, h);
          }
        }
        for (d in r) {
          h = r[d];
          p = n[d];
          if (!!r.hasOwnProperty(d) && h !== p && (h != null || p != null)) {
            hf(e, t, d, h, r, p);
          }
        }
      })(r, e.type, n, t);
      r[Ve] = t;
    } catch (l) {
      Pc(e, e.return, l);
    }
  }
  function _u(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Lf(e.type) || e.tag === 4;
  }
  function Cu(e) {
    e: while (true) {
      while (e.sibling === null) {
        if (e.return === null || _u(e.return)) {
          return null;
        }
        e = e.return;
      }
      e.sibling.return = e.return;
      e = e.sibling;
      while (e.tag !== 5 && e.tag !== 6 && e.tag !== 18) {
        if (e.tag === 27 && Lf(e.type)) {
          continue e;
        }
        if (e.flags & 2) {
          continue e;
        }
        if (e.child === null || e.tag === 4) {
          continue e;
        }
        e.child.return = e;
        e = e.child;
      }
      if (!(e.flags & 2)) {
        return e.stateNode;
      }
    }
  }
  function Nu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) {
      e = e.stateNode;
      if (t) {
        (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t);
      } else {
        (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).appendChild(e);
        if ((n = n._reactRootContainer) == null && t.onclick === null) {
          t.onclick = It;
        }
      }
    } else if (r !== 4 && (r === 27 && Lf(e.type) && (n = e.stateNode, t = null), (e = e.child) !== null)) {
      Nu(e, t, n);
      e = e.sibling;
      while (e !== null) {
        Nu(e, t, n);
        e = e.sibling;
      }
    }
  }
  function Lu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) {
      e = e.stateNode;
      if (t) {
        n.insertBefore(e, t);
      } else {
        n.appendChild(e);
      }
    } else if (r !== 4 && (r === 27 && Lf(e.type) && (n = e.stateNode), (e = e.child) !== null)) {
      Lu(e, t, n);
      e = e.sibling;
      while (e !== null) {
        Lu(e, t, n);
        e = e.sibling;
      }
    }
  }
  function Au(e) {
    var t = e.stateNode;
    var n = e.memoizedProps;
    try {
      var r = e.type;
      for (var a = t.attributes; a.length;) {
        t.removeAttributeNode(a[0]);
      }
      mf(t, r, n);
      t[je] = e;
      t[Ve] = n;
    } catch (l) {
      Pc(e, e.return, l);
    }
  }
  var Ou = false;
  var xu = false;
  var Ru = false;
  var Iu = typeof WeakSet == "function" ? WeakSet : Set;
  var Mu = null;
  function Hu(e, t, n) {
    var r = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Xu(e, n);
        if (r & 4) {
          vu(5, n);
        }
        break;
      case 1:
        Xu(e, n);
        if (r & 4) {
          e = n.stateNode;
          if (t === null) {
            try {
              e.componentDidMount();
            } catch (o) {
              Pc(n, n.return, o);
            }
          } else {
            var a = Pi(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              Pc(n, n.return, i);
            }
          }
        }
        if (r & 64) {
          Su(n);
        }
        if (r & 512) {
          wu(n, n.return);
        }
        break;
      case 3:
        Xu(e, n);
        if (r & 64 && (e = n.updateQueue) !== null) {
          t = null;
          if (n.child !== null) {
            switch (n.child.tag) {
              case 27:
              case 5:
              case 1:
                t = n.child.stateNode;
            }
          }
          try {
            Nl(e, t);
          } catch (o) {
            Pc(n, n.return, o);
          }
        }
        break;
      case 27:
        if (t === null && r & 4) {
          Au(n);
        }
      case 26:
      case 5:
        Xu(e, n);
        if (t === null && r & 4) {
          Tu(n);
        }
        if (r & 512) {
          wu(n, n.return);
        }
        break;
      case 12:
        Xu(e, n);
        break;
      case 31:
        Xu(e, n);
        if (r & 4) {
          Gu(e, n);
        }
        break;
      case 13:
        Xu(e, n);
        if (r & 4) {
          ju(e, n);
        }
        if (r & 64 && (e = n.memoizedState) !== null && (e = e.dehydrated) !== null) {
          (function (e, t) {
            var n = e.ownerDocument;
            if (e.data === "$~") {
              e._reactRetry = t;
            } else if (e.data !== "$?" || n.readyState !== "loading") {
              t();
            } else {
              function r() {
                t();
                n.removeEventListener("DOMContentLoaded", r);
              }
              n.addEventListener("DOMContentLoaded", r);
              e._reactRetry = r;
            }
          })(e, n = Lc.bind(null, n));
        }
        break;
      case 22:
        if (!(r = n.memoizedState !== null || Ou)) {
          t = t !== null && t.memoizedState !== null || xu;
          a = Ou;
          var l = xu;
          Ou = r;
          if ((xu = t) && !l) {
            Zu(e, n, !!(n.subtreeFlags & 8772));
          } else {
            Xu(e, n);
          }
          Ou = a;
          xu = l;
        }
        break;
      case 30:
        break;
      default:
        Xu(e, n);
    }
  }
  function Du(e) {
    var t = e.alternate;
    if (t !== null) {
      e.alternate = null;
      Du(t);
    }
    e.child = null;
    e.deletions = null;
    e.sibling = null;
    if (e.tag === 5 && (t = e.stateNode) !== null) {
      Ye(t);
    }
    e.stateNode = null;
    e.return = null;
    e.dependencies = null;
    e.memoizedProps = null;
    e.memoizedState = null;
    e.pendingProps = null;
    e.stateNode = null;
    e.updateQueue = null;
  }
  var zu = null;
  var Fu = false;
  function Bu(e, t, n) {
    for (n = n.child; n !== null;) {
      Uu(e, t, n);
      n = n.sibling;
    }
  }
  function Uu(e, t, n) {
    if (Se && typeof Se.onCommitFiberUnmount == "function") {
      try {
        Se.onCommitFiberUnmount(be, n);
      } catch (l) {}
    }
    switch (n.tag) {
      case 26:
        if (!xu) {
          ku(n, t);
        }
        Bu(e, t, n);
        if (n.memoizedState) {
          n.memoizedState.count--;
        } else if (n.stateNode) {
          (n = n.stateNode).parentNode.removeChild(n);
        }
        break;
      case 27:
        if (!xu) {
          ku(n, t);
        }
        var r = zu;
        var a = Fu;
        if (Lf(n.type)) {
          zu = n.stateNode;
          Fu = false;
        }
        Bu(e, t, n);
        Uf(n.stateNode);
        zu = r;
        Fu = a;
        break;
      case 5:
        if (!xu) {
          ku(n, t);
        }
      case 6:
        r = zu;
        a = Fu;
        zu = null;
        Bu(e, t, n);
        Fu = a;
        if ((zu = r) !== null) {
          if (Fu) {
            try {
              (zu.nodeType === 9 ? zu.body : zu.nodeName === "HTML" ? zu.ownerDocument.body : zu).removeChild(n.stateNode);
            } catch (o) {
              Pc(n, t, o);
            }
          } else {
            try {
              zu.removeChild(n.stateNode);
            } catch (o) {
              Pc(n, t, o);
            }
          }
        }
        break;
      case 18:
        if (zu !== null) {
          if (Fu) {
            Af((e = zu).nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode);
            Qd(e);
          } else {
            Af(zu, n.stateNode);
          }
        }
        break;
      case 4:
        r = zu;
        a = Fu;
        zu = n.stateNode.containerInfo;
        Fu = true;
        Bu(e, t, n);
        zu = r;
        Fu = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        bu(2, n, t);
        if (!xu) {
          bu(4, n, t);
        }
        Bu(e, t, n);
        break;
      case 1:
        if (!xu) {
          ku(n, t);
          if (typeof (r = n.stateNode).componentWillUnmount == "function") {
            Eu(n, t, r);
          }
        }
        Bu(e, t, n);
        break;
      case 21:
        Bu(e, t, n);
        break;
      case 22:
        xu = (r = xu) || n.memoizedState !== null;
        Bu(e, t, n);
        xu = r;
        break;
      default:
        Bu(e, t, n);
    }
  }
  function Gu(e, t) {
    if (t.memoizedState === null && (e = t.alternate) !== null && (e = e.memoizedState) !== null) {
      e = e.dehydrated;
      try {
        Qd(e);
      } catch (n) {
        Pc(t, t.return, n);
      }
    }
  }
  function ju(e, t) {
    if (t.memoizedState === null && (e = t.alternate) !== null && (e = e.memoizedState) !== null && (e = e.dehydrated) !== null) {
      try {
        Qd(e);
      } catch (n) {
        Pc(t, t.return, n);
      }
    }
  }
  function Vu(e, t) {
    var n = function (e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          if (t === null) {
            t = e.stateNode = new Iu();
          }
          return t;
        case 22:
          if ((t = (e = e.stateNode)._retryCache) === null) {
            t = e._retryCache = new Iu();
          }
          return t;
        default:
          throw Error(a(435, e.tag));
      }
    }(e);
    t.forEach(function (t) {
      if (!n.has(t)) {
        n.add(t);
        var r = Ac.bind(null, e, t);
        t.then(r, r);
      }
    });
  }
  function $u(e, t) {
    var n = t.deletions;
    if (n !== null) {
      for (var r = 0; r < n.length; r++) {
        var l = n[r];
        var o = e;
        var i = t;
        var u = i;
        e: while (u !== null) {
          switch (u.tag) {
            case 27:
              if (Lf(u.type)) {
                zu = u.stateNode;
                Fu = false;
                break e;
              }
              break;
            case 5:
              zu = u.stateNode;
              Fu = false;
              break e;
            case 3:
            case 4:
              zu = u.stateNode.containerInfo;
              Fu = true;
              break e;
          }
          u = u.return;
        }
        if (zu === null) {
          throw Error(a(160));
        }
        Uu(o, i, l);
        zu = null;
        Fu = false;
        if ((o = l.alternate) !== null) {
          o.return = null;
        }
        l.return = null;
      }
    }
    if (t.subtreeFlags & 13886) {
      for (t = t.child; t !== null;) {
        Qu(t, e);
        t = t.sibling;
      }
    }
  }
  var Wu = null;
  function Qu(e, t) {
    var n = e.alternate;
    var r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        $u(t, e);
        qu(e);
        if (r & 4) {
          bu(3, e, e.return);
          vu(3, e);
          bu(5, e, e.return);
        }
        break;
      case 1:
        $u(t, e);
        qu(e);
        if (r & 512) {
          if (!xu && n !== null) {
            ku(n, n.return);
          }
        }
        if (r & 64 && Ou && (e = e.updateQueue) !== null && (r = e.callbacks) !== null) {
          n = e.shared.hiddenCallbacks;
          e.shared.hiddenCallbacks = n === null ? r : n.concat(r);
        }
        break;
      case 26:
        var l = Wu;
        $u(t, e);
        qu(e);
        if (r & 512) {
          if (!xu && n !== null) {
            ku(n, n.return);
          }
        }
        if (r & 4) {
          var o = n !== null ? n.memoizedState : null;
          r = e.memoizedState;
          if (n === null) {
            if (r === null) {
              if (e.stateNode === null) {
                e: {
                  r = e.type;
                  n = e.memoizedProps;
                  l = l.ownerDocument || l;
                  t: switch (r) {
                    case "title":
                      if (!(o = l.getElementsByTagName("title")[0]) || o[Xe] || o[je] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) {
                        o = l.createElement(r);
                        l.head.insertBefore(o, l.querySelector("head > title"));
                      }
                      mf(o, r, n);
                      o[je] = e;
                      nt(o);
                      r = o;
                      break e;
                    case "link":
                      var i = ld("link", "href", l).get(r + (n.href || ""));
                      if (i) {
                        for (var u = 0; u < i.length; u++) {
                          if ((o = i[u]).getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            i.splice(u, 1);
                            break t;
                          }
                        }
                      }
                      mf(o = l.createElement(r), r, n);
                      l.head.appendChild(o);
                      break;
                    case "meta":
                      if (i = ld("meta", "content", l).get(r + (n.content || ""))) {
                        for (u = 0; u < i.length; u++) {
                          if ((o = i[u]).getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            i.splice(u, 1);
                            break t;
                          }
                        }
                      }
                      mf(o = l.createElement(r), r, n);
                      l.head.appendChild(o);
                      break;
                    default:
                      throw Error(a(468, r));
                  }
                  o[je] = e;
                  nt(o);
                  r = o;
                }
                e.stateNode = r;
              } else {
                od(l, e.type, e.stateNode);
              }
            } else {
              e.stateNode = ed(l, r, e.memoizedProps);
            }
          } else if (o !== r) {
            if (o === null) {
              if (n.stateNode !== null) {
                (n = n.stateNode).parentNode.removeChild(n);
              }
            } else {
              o.count--;
            }
            if (r === null) {
              od(l, e.type, e.stateNode);
            } else {
              ed(l, r, e.memoizedProps);
            }
          } else if (r === null && e.stateNode !== null) {
            Pu(e, e.memoizedProps, n.memoizedProps);
          }
        }
        break;
      case 27:
        $u(t, e);
        qu(e);
        if (r & 512) {
          if (!xu && n !== null) {
            ku(n, n.return);
          }
        }
        if (n !== null && r & 4) {
          Pu(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 5:
        $u(t, e);
        qu(e);
        if (r & 512) {
          if (!xu && n !== null) {
            ku(n, n.return);
          }
        }
        if (e.flags & 32) {
          l = e.stateNode;
          try {
            _t(l, "");
          } catch (m) {
            Pc(e, e.return, m);
          }
        }
        if (r & 4 && e.stateNode != null) {
          Pu(e, l = e.memoizedProps, n !== null ? n.memoizedProps : l);
        }
        if (r & 1024) {
          Ru = true;
        }
        break;
      case 6:
        $u(t, e);
        qu(e);
        if (r & 4) {
          if (e.stateNode === null) {
            throw Error(a(162));
          }
          r = e.memoizedProps;
          n = e.stateNode;
          try {
            n.nodeValue = r;
          } catch (m) {
            Pc(e, e.return, m);
          }
        }
        break;
      case 3:
        ad = null;
        l = Wu;
        Wu = Vf(t.containerInfo);
        $u(t, e);
        Wu = l;
        qu(e);
        if (r & 4 && n !== null && n.memoizedState.isDehydrated) {
          try {
            Qd(t.containerInfo);
          } catch (m) {
            Pc(e, e.return, m);
          }
        }
        if (Ru) {
          Ru = false;
          Ku(e);
        }
        break;
      case 4:
        r = Wu;
        Wu = Vf(e.stateNode.containerInfo);
        $u(t, e);
        qu(e);
        Wu = r;
        break;
      case 12:
      default:
        $u(t, e);
        qu(e);
        break;
      case 31:
      case 19:
        $u(t, e);
        qu(e);
        if (r & 4 && (r = e.updateQueue) !== null) {
          e.updateQueue = null;
          Vu(e, r);
        }
        break;
      case 13:
        $u(t, e);
        qu(e);
        if (e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null)) {
          Is = ce();
        }
        if (r & 4 && (r = e.updateQueue) !== null) {
          e.updateQueue = null;
          Vu(e, r);
        }
        break;
      case 22:
        l = e.memoizedState !== null;
        var s = n !== null && n.memoizedState !== null;
        var c = Ou;
        var f = xu;
        Ou = c || l;
        xu = f || s;
        $u(t, e);
        xu = f;
        Ou = c;
        qu(e);
        if (r & 8192) {
          t = e.stateNode;
          t._visibility = l ? t._visibility & -2 : t._visibility | 1;
          if (l) {
            if (n !== null && !s && !Ou && !xu) {
              Yu(e);
            }
          }
          n = null;
          t = e;
          e: while (true) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                s = n = t;
                try {
                  o = s.stateNode;
                  if (l) {
                    if (typeof (i = o.style).setProperty == "function") {
                      i.setProperty("display", "none", "important");
                    } else {
                      i.display = "none";
                    }
                  } else {
                    u = s.stateNode;
                    var d = s.memoizedProps.style;
                    var h = d != null && d.hasOwnProperty("display") ? d.display : null;
                    u.style.display = h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                  }
                } catch (m) {
                  Pc(s, s.return, m);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = l ? "" : s.memoizedProps;
                } catch (m) {
                  Pc(s, s.return, m);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                s = t;
                try {
                  var p = s.stateNode;
                  if (l) {
                    Of(p, true);
                  } else {
                    Of(s.stateNode, false);
                  }
                } catch (m) {
                  Pc(s, s.return, m);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t;
              t = t.child;
              continue;
            }
            if (t === e) {
              break e;
            }
            while (t.sibling === null) {
              if (t.return === null || t.return === e) {
                break e;
              }
              if (n === t) {
                n = null;
              }
              t = t.return;
            }
            if (n === t) {
              n = null;
            }
            t.sibling.return = t.return;
            t = t.sibling;
          }
        }
        if (r & 4 && (r = e.updateQueue) !== null && (n = r.retryQueue) !== null) {
          r.retryQueue = null;
          Vu(e, n);
        }
      case 30:
      case 21:
    }
  }
  function qu(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        var n;
        for (var r = e.return; r !== null;) {
          if (_u(r)) {
            n = r;
            break;
          }
          r = r.return;
        }
        if (n == null) {
          throw Error(a(160));
        }
        switch (n.tag) {
          case 27:
            var l = n.stateNode;
            Lu(e, Cu(e), l);
            break;
          case 5:
            var o = n.stateNode;
            if (n.flags & 32) {
              _t(o, "");
              n.flags &= -33;
            }
            Lu(e, Cu(e), o);
            break;
          case 3:
          case 4:
            var i = n.stateNode.containerInfo;
            Nu(e, Cu(e), i);
            break;
          default:
            throw Error(a(161));
        }
      } catch (u) {
        Pc(e, e.return, u);
      }
      e.flags &= -3;
    }
    if (t & 4096) {
      e.flags &= -4097;
    }
  }
  function Ku(e) {
    if (e.subtreeFlags & 1024) {
      for (e = e.child; e !== null;) {
        var t = e;
        Ku(t);
        if (t.tag === 5 && t.flags & 1024) {
          t.stateNode.reset();
        }
        e = e.sibling;
      }
    }
  }
  function Xu(e, t) {
    if (t.subtreeFlags & 8772) {
      for (t = t.child; t !== null;) {
        Hu(e, t.alternate, t);
        t = t.sibling;
      }
    }
  }
  function Yu(e) {
    for (e = e.child; e !== null;) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          bu(4, t, t.return);
          Yu(t);
          break;
        case 1:
          ku(t, t.return);
          var n = t.stateNode;
          if (typeof n.componentWillUnmount == "function") {
            Eu(t, t.return, n);
          }
          Yu(t);
          break;
        case 27:
          Uf(t.stateNode);
        case 26:
        case 5:
          ku(t, t.return);
          Yu(t);
          break;
        case 22:
          if (t.memoizedState === null) {
            Yu(t);
          }
          break;
        default:
          Yu(t);
      }
      e = e.sibling;
    }
  }
  function Zu(e, t, n) {
    n = n && !!(t.subtreeFlags & 8772);
    t = t.child;
    while (t !== null) {
      var r = t.alternate;
      var a = e;
      var l = t;
      var o = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Zu(a, l, n);
          vu(4, l);
          break;
        case 1:
          Zu(a, l, n);
          if (typeof (a = (r = l).stateNode).componentDidMount == "function") {
            try {
              a.componentDidMount();
            } catch (s) {
              Pc(r, r.return, s);
            }
          }
          if ((a = (r = l).updateQueue) !== null) {
            var i = r.stateNode;
            try {
              var u = a.shared.hiddenCallbacks;
              if (u !== null) {
                a.shared.hiddenCallbacks = null;
                a = 0;
                for (; a < u.length; a++) {
                  Cl(u[a], i);
                }
              }
            } catch (s) {
              Pc(r, r.return, s);
            }
          }
          if (n && o & 64) {
            Su(l);
          }
          wu(l, l.return);
          break;
        case 27:
          Au(l);
        case 26:
        case 5:
          Zu(a, l, n);
          if (n && r === null && o & 4) {
            Tu(l);
          }
          wu(l, l.return);
          break;
        case 12:
          Zu(a, l, n);
          break;
        case 31:
          Zu(a, l, n);
          if (n && o & 4) {
            Gu(a, l);
          }
          break;
        case 13:
          Zu(a, l, n);
          if (n && o & 4) {
            ju(a, l);
          }
          break;
        case 22:
          if (l.memoizedState === null) {
            Zu(a, l, n);
          }
          wu(l, l.return);
          break;
        case 30:
          break;
        default:
          Zu(a, l, n);
      }
      t = t.sibling;
    }
  }
  function Ju(e, t) {
    var n = null;
    if (e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null) {
      n = e.memoizedState.cachePool.pool;
    }
    e = null;
    if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
      e = t.memoizedState.cachePool.pool;
    }
    if (e !== n) {
      if (e != null) {
        e.refCount++;
      }
      if (n != null) {
        Ga(n);
      }
    }
  }
  function es(e, t) {
    e = null;
    if (t.alternate !== null) {
      e = t.alternate.memoizedState.cache;
    }
    if ((t = t.memoizedState.cache) !== e) {
      t.refCount++;
      if (e != null) {
        Ga(e);
      }
    }
  }
  function ts(e, t, n, r) {
    if (t.subtreeFlags & 10256) {
      for (t = t.child; t !== null;) {
        ns(e, t, n, r);
        t = t.sibling;
      }
    }
  }
  function ns(e, t, n, r) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ts(e, t, n, r);
        if (a & 2048) {
          vu(9, t);
        }
        break;
      case 1:
      case 31:
      case 13:
      default:
        ts(e, t, n, r);
        break;
      case 3:
        ts(e, t, n, r);
        if (a & 2048) {
          e = null;
          if (t.alternate !== null) {
            e = t.alternate.memoizedState.cache;
          }
          if ((t = t.memoizedState.cache) !== e) {
            t.refCount++;
            if (e != null) {
              Ga(e);
            }
          }
        }
        break;
      case 12:
        if (a & 2048) {
          ts(e, t, n, r);
          e = t.stateNode;
          try {
            var l = t.memoizedProps;
            var o = l.id;
            var i = l.onPostCommit;
            if (typeof i == "function") {
              i(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
            }
          } catch (u) {
            Pc(t, t.return, u);
          }
        } else {
          ts(e, t, n, r);
        }
        break;
      case 23:
        break;
      case 22:
        l = t.stateNode;
        o = t.alternate;
        if (t.memoizedState !== null) {
          if (l._visibility & 2) {
            ts(e, t, n, r);
          } else {
            as(e, t);
          }
        } else if (l._visibility & 2) {
          ts(e, t, n, r);
        } else {
          l._visibility |= 2;
          rs(e, t, n, r, !!(t.subtreeFlags & 10256) || false);
        }
        if (a & 2048) {
          Ju(o, t);
        }
        break;
      case 24:
        ts(e, t, n, r);
        if (a & 2048) {
          es(t.alternate, t);
        }
    }
  }
  function rs(e, t, n, r, a) {
    a = a && (!!(t.subtreeFlags & 10256) || false);
    t = t.child;
    while (t !== null) {
      var l = e;
      var o = t;
      var i = n;
      var u = r;
      var s = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          rs(l, o, i, u, a);
          vu(8, o);
          break;
        case 23:
          break;
        case 22:
          var c = o.stateNode;
          if (o.memoizedState !== null) {
            if (c._visibility & 2) {
              rs(l, o, i, u, a);
            } else {
              as(l, o);
            }
          } else {
            c._visibility |= 2;
            rs(l, o, i, u, a);
          }
          if (a && s & 2048) {
            Ju(o.alternate, o);
          }
          break;
        case 24:
          rs(l, o, i, u, a);
          if (a && s & 2048) {
            es(o.alternate, o);
          }
          break;
        default:
          rs(l, o, i, u, a);
      }
      t = t.sibling;
    }
  }
  function as(e, t) {
    if (t.subtreeFlags & 10256) {
      for (t = t.child; t !== null;) {
        var n = e;
        var r = t;
        var a = r.flags;
        switch (r.tag) {
          case 22:
            as(n, r);
            if (a & 2048) {
              Ju(r.alternate, r);
            }
            break;
          case 24:
            as(n, r);
            if (a & 2048) {
              es(r.alternate, r);
            }
            break;
          default:
            as(n, r);
        }
        t = t.sibling;
      }
    }
  }
  var ls = 8192;
  function os(e, t, n) {
    if (e.subtreeFlags & ls) {
      for (e = e.child; e !== null;) {
        is(e, t, n);
        e = e.sibling;
      }
    }
  }
  function is(e, t, n) {
    switch (e.tag) {
      case 26:
        os(e, t, n);
        if (e.flags & ls && e.memoizedState !== null) {
          (function (e, t, n, r) {
            if (n.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== false) && !(n.state.loading & 4)) {
              if (n.instance === null) {
                var a = Kf(r.href);
                var l = t.querySelector(Xf(a));
                if (l) {
                  if ((t = l._p) !== null && typeof t == "object" && typeof t.then == "function") {
                    e.count++;
                    e = sd.bind(e);
                    t.then(e, e);
                  }
                  n.state.loading |= 4;
                  n.instance = l;
                  nt(l);
                  return;
                }
                l = t.ownerDocument || t;
                r = Yf(r);
                if (a = Gf.get(a)) {
                  nd(r, a);
                }
                nt(l = l.createElement("link"));
                var o = l;
                o._p = new Promise(function (e, t) {
                  o.onload = e;
                  o.onerror = t;
                });
                mf(l, "link", r);
                n.instance = l;
              }
              if (e.stylesheets === null) {
                e.stylesheets = new Map();
              }
              e.stylesheets.set(n, t);
              if ((t = n.state.preload) && !(n.state.loading & 3)) {
                e.count++;
                n = sd.bind(e);
                t.addEventListener("load", n);
                t.addEventListener("error", n);
              }
            }
          })(n, Wu, e.memoizedState, e.memoizedProps);
        }
        break;
      case 5:
      default:
        os(e, t, n);
        break;
      case 3:
      case 4:
        var r = Wu;
        Wu = Vf(e.stateNode.containerInfo);
        os(e, t, n);
        Wu = r;
        break;
      case 22:
        if (e.memoizedState === null) {
          if ((r = e.alternate) !== null && r.memoizedState !== null) {
            r = ls;
            ls = 16777216;
            os(e, t, n);
            ls = r;
          } else {
            os(e, t, n);
          }
        }
    }
  }
  function us(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child) !== null) {
      t.child = null;
      do {
        t = e.sibling;
        e.sibling = null;
        e = t;
      } while (e !== null);
    }
  }
  function ss(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          Mu = r;
          ds(r, e);
        }
      }
      us(e);
    }
    if (e.subtreeFlags & 10256) {
      for (e = e.child; e !== null;) {
        cs(e);
        e = e.sibling;
      }
    }
  }
  function cs(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ss(e);
        if (e.flags & 2048) {
          bu(9, e, e.return);
        }
        break;
      case 3:
      case 12:
      default:
        ss(e);
        break;
      case 22:
        var t = e.stateNode;
        if (e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)) {
          t._visibility &= -3;
          fs(e);
        } else {
          ss(e);
        }
    }
  }
  function fs(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          Mu = r;
          ds(r, e);
        }
      }
      us(e);
    }
    for (e = e.child; e !== null;) {
      switch ((t = e).tag) {
        case 0:
        case 11:
        case 15:
          bu(8, t, t.return);
          fs(t);
          break;
        case 22:
          if ((n = t.stateNode)._visibility & 2) {
            n._visibility &= -3;
            fs(t);
          }
          break;
        default:
          fs(t);
      }
      e = e.sibling;
    }
  }
  function ds(e, t) {
    while (Mu !== null) {
      var n = Mu;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          bu(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var r = n.memoizedState.cachePool.pool;
            if (r != null) {
              r.refCount++;
            }
          }
          break;
        case 24:
          Ga(n.memoizedState.cache);
      }
      if ((r = n.child) !== null) {
        r.return = n;
        Mu = r;
      } else {
        e: for (n = e; Mu !== null;) {
          var a = (r = Mu).sibling;
          var l = r.return;
          Du(r);
          if (r === n) {
            Mu = null;
            break e;
          }
          if (a !== null) {
            a.return = l;
            Mu = a;
            break e;
          }
          Mu = l;
        }
      }
    }
  }
  var hs = {
    getCacheForType: function (e) {
      var t = Ia(Ba);
      var n = t.data.get(e);
      if (n === undefined) {
        n = e();
        t.data.set(e, n);
      }
      return n;
    },
    cacheSignal: function () {
      return Ia(Ba).controller.signal;
    }
  };
  var ps = typeof WeakMap == "function" ? WeakMap : Map;
  var ms = 0;
  var gs = null;
  var ys = null;
  var vs = 0;
  var bs = 0;
  var Ss = null;
  var Es = false;
  var ws = false;
  var ks = false;
  var Ts = 0;
  var Ps = 0;
  var _s = 0;
  var Cs = 0;
  var Ns = 0;
  var Ls = 0;
  var As = 0;
  var Os = null;
  var xs = null;
  var Rs = false;
  var Is = 0;
  var Ms = 0;
  var Hs = Infinity;
  var Ds = null;
  var zs = null;
  var Fs = 0;
  var Bs = null;
  var Us = null;
  var Gs = 0;
  var js = 0;
  var Vs = null;
  var $s = null;
  var Ws = 0;
  var Qs = null;
  function qs() {
    if (ms & 2 && vs !== 0) {
      return vs & -vs;
    } else if (H.T !== null) {
      return Vc();
    } else {
      return Be();
    }
  }
  function Ks() {
    if (Ls === 0) {
      if (vs & 536870912 && !ha) {
        Ls = 536870912;
      } else {
        var e = _e;
        if (!((_e <<= 1) & 3932160)) {
          _e = 262144;
        }
        Ls = e;
      }
    }
    if ((e = Il.current) !== null) {
      e.flags |= 32;
    }
    return Ls;
  }
  function Xs(e, t, n) {
    if (e === gs && (bs === 2 || bs === 9) || e.cancelPendingCommit !== null) {
      rc(e, 0);
      ec(e, vs, Ls, false);
    }
    Ie(e, n);
    if (!(ms & 2) || e !== gs) {
      if (e === gs) {
        if (!(ms & 2)) {
          Cs |= n;
        }
        if (Ps === 4) {
          ec(e, vs, Ls, false);
        }
      }
      Dc(e);
    }
  }
  function Ys(e, t, n) {
    if (ms & 6) {
      throw Error(a(327));
    }
    var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Ae(e, t);
    var l = r ? function (e, t) {
      var n = ms;
      ms |= 2;
      var r = oc();
      var l = ic();
      if (gs !== e || vs !== t) {
        Ds = null;
        Hs = ce() + 500;
        rc(e, t);
      } else {
        ws = Ae(e, t);
      }
      e: while (true) {
        try {
          if (bs !== 0 && ys !== null) {
            t = ys;
            var o = Ss;
            t: switch (bs) {
              case 1:
                bs = 0;
                Ss = null;
                pc(e, t, o, 1);
                break;
              case 2:
              case 9:
                if (rl(o)) {
                  bs = 0;
                  Ss = null;
                  hc(t);
                  break;
                }
                t = function () {
                  if ((bs === 2 || bs === 9) && gs === e) {
                    bs = 7;
                  }
                  Dc(e);
                };
                o.then(t, t);
                break e;
              case 3:
                bs = 7;
                break e;
              case 4:
                bs = 5;
                break e;
              case 7:
                if (rl(o)) {
                  bs = 0;
                  Ss = null;
                  hc(t);
                } else {
                  bs = 0;
                  Ss = null;
                  pc(e, t, o, 7);
                }
                break;
              case 5:
                var i = null;
                switch (ys.tag) {
                  case 26:
                    i = ys.memoizedState;
                  case 5:
                  case 27:
                    var u = ys;
                    if (i ? id(i) : u.stateNode.complete) {
                      bs = 0;
                      Ss = null;
                      var s = u.sibling;
                      if (s !== null) {
                        ys = s;
                      } else {
                        var c = u.return;
                        if (c !== null) {
                          ys = c;
                          mc(c);
                        } else {
                          ys = null;
                        }
                      }
                      break t;
                    }
                }
                bs = 0;
                Ss = null;
                pc(e, t, o, 5);
                break;
              case 6:
                bs = 0;
                Ss = null;
                pc(e, t, o, 6);
                break;
              case 8:
                nc();
                Ps = 6;
                break e;
              default:
                throw Error(a(462));
            }
          }
          fc();
          break;
        } catch (f) {
          ac(e, f);
        }
      }
      _a = Pa = null;
      H.H = r;
      H.A = l;
      ms = n;
      if (ys !== null) {
        return 0;
      } else {
        gs = null;
        vs = 0;
        xr();
        return Ps;
      }
    }(e, t) : sc(e, t, true);
    var o = r;
    while (true) {
      if (l === 0) {
        if (ws && !r) {
          ec(e, t, 0, false);
        }
        break;
      }
      n = e.current.alternate;
      if (!o || Js(n)) {
        if (l === 2) {
          o = t;
          if (e.errorRecoveryDisabledLanes & o) {
            var i = 0;
          } else {
            i = (i = e.pendingLanes & -536870913) !== 0 ? i : i & 536870912 ? 536870912 : 0;
          }
          if (i !== 0) {
            t = i;
            e: {
              var u = e;
              l = Os;
              var s = u.current.memoizedState.isDehydrated;
              if (s) {
                rc(u, i).flags |= 256;
              }
              if ((i = sc(u, i, false)) !== 2) {
                if (ks && !s) {
                  u.errorRecoveryDisabledLanes |= o;
                  Cs |= o;
                  l = 4;
                  break e;
                }
                o = xs;
                xs = l;
                if (o !== null) {
                  if (xs === null) {
                    xs = o;
                  } else {
                    xs.push.apply(xs, o);
                  }
                }
              }
              l = i;
            }
            o = false;
            if (l !== 2) {
              continue;
            }
          }
        }
        if (l === 1) {
          rc(e, 0);
          ec(e, t, 0, true);
          break;
        }
        e: {
          r = e;
          switch (o = l) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((t & 4194048) !== t) {
                break;
              }
            case 6:
              ec(r, t, Ls, !Es);
              break e;
            case 2:
              xs = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((t & 62914560) === t && (l = Is + 300 - ce()) > 10) {
            ec(r, t, Ls, !Es);
            if (Le(r, 0, true) !== 0) {
              break e;
            }
            Gs = t;
            r.timeoutHandle = Tf(Zs.bind(null, r, n, xs, Ds, Rs, t, Ls, Cs, As, Es, o, "Throttled", -0, 0), l);
          } else {
            Zs(r, n, xs, Ds, Rs, t, Ls, Cs, As, Es, o, null, -0, 0);
          }
        }
        break;
      }
      l = sc(e, t, false);
      o = false;
    }
    Dc(e);
  }
  function Zs(e, t, n, r, a, l, o, i, u, s, c, f, d, h) {
    e.timeoutHandle = -1;
    if ((f = t.subtreeFlags) & 8192 || !(~f & 16785408)) {
      is(t, l, f = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: It
      });
      var p = (l & 62914560) === l ? Is - ce() : (l & 4194048) === l ? Ms - ce() : 0;
      if ((p = function (e, t) {
        if (e.stylesheets && e.count === 0) {
          fd(e, e.stylesheets);
        }
        if (e.count > 0 || e.imgCount > 0) {
          return function (n) {
            var r = setTimeout(function () {
              if (e.stylesheets) {
                fd(e, e.stylesheets);
              }
              if (e.unsuspend) {
                var t = e.unsuspend;
                e.unsuspend = null;
                t();
              }
            }, 60000 + t);
            if (e.imgBytes > 0 && ud === 0) {
              ud = function () {
                if (typeof performance.getEntriesByType == "function") {
                  var e = 0;
                  var t = 0;
                  for (var n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
                    var a = n[r];
                    var l = a.transferSize;
                    var o = a.initiatorType;
                    var i = a.duration;
                    if (l && i && gf(o)) {
                      o = 0;
                      i = a.responseEnd;
                      r += 1;
                      for (; r < n.length; r++) {
                        var u = n[r];
                        var s = u.startTime;
                        if (s > i) {
                          break;
                        }
                        var c = u.transferSize;
                        var f = u.initiatorType;
                        if (c && gf(f)) {
                          o += c * ((u = u.responseEnd) < i ? 1 : (i - s) / (u - s));
                        }
                      }
                      --r;
                      t += (l + o) * 8 / (a.duration / 1000);
                      if (++e > 10) {
                        break;
                      }
                    }
                  }
                  if (e > 0) {
                    return t / e / 1000000;
                  }
                }
                if (navigator.connection && typeof (e = navigator.connection.downlink) == "number") {
                  return e;
                } else {
                  return 5;
                }
              }() * 62500;
            }
            var a = setTimeout(function () {
              e.waitingForImages = false;
              if (e.count === 0 && (e.stylesheets && fd(e, e.stylesheets), e.unsuspend)) {
                var t = e.unsuspend;
                e.unsuspend = null;
                t();
              }
            }, (e.imgBytes > ud ? 50 : 800) + t);
            e.unsuspend = n;
            return function () {
              e.unsuspend = null;
              clearTimeout(r);
              clearTimeout(a);
            };
          };
        } else {
          return null;
        }
      }(f, p)) !== null) {
        Gs = l;
        e.cancelPendingCommit = p(yc.bind(null, e, t, l, n, r, a, o, i, u, c, f, null, d, h));
        ec(e, l, o, !s);
        return;
      }
    }
    yc(e, t, l, n, r, a, o, i, u);
  }
  function Js(e) {
    var t = e;
    for (;;) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue) !== null && (n = n.stores) !== null) {
        for (var r = 0; r < n.length; r++) {
          var a = n[r];
          var l = a.getSnapshot;
          a = a.value;
          try {
            if (!er(l(), a)) {
              return false;
            }
          } catch (o) {
            return false;
          }
        }
      }
      n = t.child;
      if (t.subtreeFlags & 16384 && n !== null) {
        n.return = t;
        t = n;
      } else {
        if (t === e) {
          break;
        }
        while (t.sibling === null) {
          if (t.return === null || t.return === e) {
            return true;
          }
          t = t.return;
        }
        t.sibling.return = t.return;
        t = t.sibling;
      }
    }
    return true;
  }
  function ec(e, t, n, r) {
    t &= ~Ns;
    t &= ~Cs;
    e.suspendedLanes |= t;
    e.pingedLanes &= ~t;
    if (r) {
      e.warmLanes |= t;
    }
    r = e.expirationTimes;
    for (var a = t; a > 0;) {
      var l = 31 - we(a);
      var o = 1 << l;
      r[l] = -1;
      a &= ~o;
    }
    if (n !== 0) {
      Me(e, n, t);
    }
  }
  function tc() {
    return !!(ms & 6) || (zc(0), false);
  }
  function nc() {
    if (ys !== null) {
      if (bs === 0) {
        var e = ys.return;
      } else {
        _a = Pa = null;
        uo(e = ys);
        sl = null;
        cl = 0;
        e = ys;
      }
      while (e !== null) {
        yu(e.alternate, e);
        e = e.return;
      }
      ys = null;
    }
  }
  function rc(e, t) {
    var n = e.timeoutHandle;
    if (n !== -1) {
      e.timeoutHandle = -1;
      Pf(n);
    }
    if ((n = e.cancelPendingCommit) !== null) {
      e.cancelPendingCommit = null;
      n();
    }
    Gs = 0;
    nc();
    gs = e;
    ys = n = Gr(e.current, null);
    vs = t;
    bs = 0;
    Ss = null;
    Es = false;
    ws = Ae(e, t);
    ks = false;
    As = Ls = Ns = Cs = _s = Ps = 0;
    xs = Os = null;
    Rs = false;
    if (t & 8) {
      t |= t & 32;
    }
    var r = e.entangledLanes;
    if (r !== 0) {
      e = e.entanglements;
      r &= t;
      while (r > 0) {
        var a = 31 - we(r);
        var l = 1 << a;
        t |= e[a];
        r &= ~l;
      }
    }
    Ts = t;
    xr();
    return n;
  }
  function ac(e, t) {
    Vl = null;
    H.H = yi;
    if (t === Ja || t === tl) {
      t = il();
      bs = 3;
    } else if (t === el) {
      t = il();
      bs = 4;
    } else {
      bs = t === Ii ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1;
    }
    Ss = t;
    if (ys === null) {
      Ps = 1;
      Li(e, Xr(t, e.current));
    }
  }
  function lc() {
    var e = Il.current;
    return e === null || ((vs & 4194048) === vs ? Ml === null : ((vs & 62914560) === vs || !!(vs & 536870912)) && e === Ml);
  }
  function oc() {
    var e = H.H;
    H.H = yi;
    if (e === null) {
      return yi;
    } else {
      return e;
    }
  }
  function ic() {
    var e = H.A;
    H.A = hs;
    return e;
  }
  function uc() {
    Ps = 4;
    if (!Es && ((vs & 4194048) === vs || Il.current === null)) {
      ws = true;
    }
    if ((!!(_s & 134217727) || !!(Cs & 134217727)) && gs !== null) {
      ec(gs, vs, Ls, false);
    }
  }
  function sc(e, t, n) {
    var r = ms;
    ms |= 2;
    var a = oc();
    var l = ic();
    if (gs !== e || vs !== t) {
      Ds = null;
      rc(e, t);
    }
    t = false;
    var o = Ps;
    e: while (true) {
      try {
        if (bs !== 0 && ys !== null) {
          var i = ys;
          var u = Ss;
          switch (bs) {
            case 8:
              nc();
              o = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              if (Il.current === null) {
                t = true;
              }
              var s = bs;
              bs = 0;
              Ss = null;
              pc(e, i, u, s);
              if (n && ws) {
                o = 0;
                break e;
              }
              break;
            default:
              s = bs;
              bs = 0;
              Ss = null;
              pc(e, i, u, s);
          }
        }
        cc();
        o = Ps;
        break;
      } catch (c) {
        ac(e, c);
      }
    }
    if (t) {
      e.shellSuspendCounter++;
    }
    _a = Pa = null;
    ms = r;
    H.H = a;
    H.A = l;
    if (ys === null) {
      gs = null;
      vs = 0;
      xr();
    }
    return o;
  }
  function cc() {
    while (ys !== null) {
      dc(ys);
    }
  }
  function fc() {
    while (ys !== null && !ue()) {
      dc(ys);
    }
  }
  function dc(e) {
    var t = uu(e.alternate, e, Ts);
    e.memoizedProps = e.pendingProps;
    if (t === null) {
      mc(e);
    } else {
      ys = t;
    }
  }
  function hc(e) {
    var t = e;
    var n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Qi(n, t, t.pendingProps, t.type, undefined, vs);
        break;
      case 11:
        t = Qi(n, t, t.pendingProps, t.type.render, t.ref, vs);
        break;
      case 5:
        uo(t);
      default:
        yu(n, t);
        t = uu(n, t = ys = jr(t, Ts), Ts);
    }
    e.memoizedProps = e.pendingProps;
    if (t === null) {
      mc(e);
    } else {
      ys = t;
    }
  }
  function pc(e, t, n, r) {
    _a = Pa = null;
    uo(t);
    sl = null;
    cl = 0;
    var l = t.return;
    try {
      if (function (e, t, n, r, l) {
        n.flags |= 32768;
        if (r !== null && typeof r == "object" && typeof r.then == "function") {
          if ((t = n.alternate) !== null) {
            Oa(t, n, l, true);
          }
          if ((n = Il.current) !== null) {
            switch (n.tag) {
              case 31:
              case 13:
                if (Ml === null) {
                  uc();
                } else if (n.alternate === null && Ps === 0) {
                  Ps = 3;
                }
                n.flags &= -257;
                n.flags |= 65536;
                n.lanes = l;
                if (r === nl) {
                  n.flags |= 16384;
                } else {
                  if ((t = n.updateQueue) === null) {
                    n.updateQueue = new Set([r]);
                  } else {
                    t.add(r);
                  }
                  _c(e, r, l);
                }
                return false;
              case 22:
                n.flags |= 65536;
                if (r === nl) {
                  n.flags |= 16384;
                } else {
                  if ((t = n.updateQueue) === null) {
                    t = {
                      transitions: null,
                      markerInstances: null,
                      retryQueue: new Set([r])
                    };
                    n.updateQueue = t;
                  } else if ((n = t.retryQueue) === null) {
                    t.retryQueue = new Set([r]);
                  } else {
                    n.add(r);
                  }
                  _c(e, r, l);
                }
                return false;
            }
            throw Error(a(435, n.tag));
          }
          _c(e, r, l);
          uc();
          return false;
        }
        if (ha) {
          if ((t = Il.current) !== null) {
            if (!(t.flags & 65536)) {
              t.flags |= 256;
            }
            t.flags |= 65536;
            t.lanes = l;
            if (r !== ga) {
              ka(Xr(e = Error(a(422), {
                cause: r
              }), n));
            }
          } else {
            if (r !== ga) {
              ka(Xr(t = Error(a(423), {
                cause: r
              }), n));
            }
            (e = e.current.alternate).flags |= 65536;
            l &= -l;
            e.lanes |= l;
            r = Xr(r, n);
            kl(e, l = Oi(e.stateNode, r, l));
            if (Ps !== 4) {
              Ps = 2;
            }
          }
          return false;
        }
        var o = Error(a(520), {
          cause: r
        });
        o = Xr(o, n);
        if (Os === null) {
          Os = [o];
        } else {
          Os.push(o);
        }
        if (Ps !== 4) {
          Ps = 2;
        }
        if (t === null) {
          return true;
        }
        r = Xr(r, n);
        n = t;
        do {
          switch (n.tag) {
            case 3:
              n.flags |= 65536;
              e = l & -l;
              n.lanes |= e;
              kl(n, e = Oi(n.stateNode, r, e));
              return false;
            case 1:
              t = n.type;
              o = n.stateNode;
              if (!(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (zs === null || !zs.has(o)))) {
                n.flags |= 65536;
                l &= -l;
                n.lanes |= l;
                Ri(l = xi(l), e, n, r);
                kl(n, l);
                return false;
              }
          }
          n = n.return;
        } while (n !== null);
        return false;
      }(e, l, t, n, vs)) {
        Ps = 1;
        Li(e, Xr(n, e.current));
        ys = null;
        return;
      }
    } catch (o) {
      if (l !== null) {
        ys = l;
        throw o;
      }
      Ps = 1;
      Li(e, Xr(n, e.current));
      ys = null;
      return;
    }
    if (t.flags & 32768) {
      if (ha || r === 1) {
        e = true;
      } else if (ws || vs & 536870912) {
        e = false;
      } else {
        Es = e = true;
        if ((r === 2 || r === 9 || r === 3 || r === 6) && (r = Il.current) !== null && r.tag === 13) {
          r.flags |= 16384;
        }
      }
      gc(t, e);
    } else {
      mc(t);
    }
  }
  function mc(e) {
    var t = e;
    do {
      if (t.flags & 32768) {
        gc(t, Es);
        return;
      }
      e = t.return;
      var n = mu(t.alternate, t, Ts);
      if (n !== null) {
        ys = n;
        return;
      }
      if ((t = t.sibling) !== null) {
        ys = t;
        return;
      }
      ys = t = e;
    } while (t !== null);
    if (Ps === 0) {
      Ps = 5;
    }
  }
  function gc(e, t) {
    do {
      var n = gu(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767;
        ys = n;
        return;
      }
      if ((n = e.return) !== null) {
        n.flags |= 32768;
        n.subtreeFlags = 0;
        n.deletions = null;
      }
      if (!t && (e = e.sibling) !== null) {
        ys = e;
        return;
      }
      ys = e = n;
    } while (e !== null);
    Ps = 6;
    ys = null;
  }
  function yc(e, t, n, r, l, o, i, u, s) {
    e.cancelPendingCommit = null;
    do {
      wc();
    } while (Fs !== 0);
    if (ms & 6) {
      throw Error(a(327));
    }
    if (t !== null) {
      if (t === e.current) {
        throw Error(a(177));
      }
      o = t.lanes | t.childLanes;
      (function (e, t, n, r, a, l) {
        var o = e.pendingLanes;
        e.pendingLanes = n;
        e.suspendedLanes = 0;
        e.pingedLanes = 0;
        e.warmLanes = 0;
        e.expiredLanes &= n;
        e.entangledLanes &= n;
        e.errorRecoveryDisabledLanes &= n;
        e.shellSuspendCounter = 0;
        var i = e.entanglements;
        var u = e.expirationTimes;
        var s = e.hiddenUpdates;
        for (n = o & ~n; n > 0;) {
          var c = 31 - we(n);
          var f = 1 << c;
          i[c] = 0;
          u[c] = -1;
          var d = s[c];
          if (d !== null) {
            s[c] = null;
            c = 0;
            for (; c < d.length; c++) {
              var h = d[c];
              if (h !== null) {
                h.lane &= -536870913;
              }
            }
          }
          n &= ~f;
        }
        if (r !== 0) {
          Me(e, r, 0);
        }
        if (l !== 0 && a === 0 && e.tag !== 0) {
          e.suspendedLanes |= l & ~(o & ~t);
        }
      })(e, n, o |= Or, i, u, s);
      if (e === gs) {
        ys = gs = null;
        vs = 0;
      }
      Us = t;
      Bs = e;
      Gs = n;
      js = o;
      Vs = l;
      $s = r;
      if (t.subtreeFlags & 10256 || t.flags & 10256) {
        e.callbackNode = null;
        e.callbackPriority = 0;
        oe(pe, function () {
          kc();
          return null;
        });
      } else {
        e.callbackNode = null;
        e.callbackPriority = 0;
      }
      r = !!(t.flags & 13878);
      if (t.subtreeFlags & 13878 || r) {
        r = H.T;
        H.T = null;
        l = D.p;
        D.p = 2;
        i = ms;
        ms |= 4;
        try {
          (function (e, t) {
            e = e.containerInfo;
            yf = wd;
            if (or(e = lr(e))) {
              if ("selectionStart" in e) {
                var n = {
                  start: e.selectionStart,
                  end: e.selectionEnd
                };
              } else {
                e: {
                  var r = (n = (n = e.ownerDocument) && n.defaultView || window).getSelection && n.getSelection();
                  if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset;
                    var o = r.focusNode;
                    r = r.focusOffset;
                    try {
                      n.nodeType;
                      o.nodeType;
                    } catch (g) {
                      n = null;
                      break e;
                    }
                    var i = 0;
                    var u = -1;
                    var s = -1;
                    var c = 0;
                    var f = 0;
                    var d = e;
                    var h = null;
                    t: while (true) {
                      for (var p; d !== n || l !== 0 && d.nodeType !== 3 || (u = i + l), d !== o || r !== 0 && d.nodeType !== 3 || (s = i + r), d.nodeType === 3 && (i += d.nodeValue.length), (p = d.firstChild) !== null;) {
                        h = d;
                        d = p;
                      }
                      while (true) {
                        if (d === e) {
                          break t;
                        }
                        if (h === n && ++c === l) {
                          u = i;
                        }
                        if (h === o && ++f === r) {
                          s = i;
                        }
                        if ((p = d.nextSibling) !== null) {
                          break;
                        }
                        h = (d = h).parentNode;
                      }
                      d = p;
                    }
                    n = u === -1 || s === -1 ? null : {
                      start: u,
                      end: s
                    };
                  } else {
                    n = null;
                  }
                }
              }
              n = n || {
                start: 0,
                end: 0
              };
            } else {
              n = null;
            }
            vf = {
              focusedElem: e,
              selectionRange: n
            };
            wd = false;
            Mu = t;
            while (Mu !== null) {
              e = (t = Mu).child;
              if (t.subtreeFlags & 1028 && e !== null) {
                e.return = t;
                Mu = e;
              } else {
                while (Mu !== null) {
                  o = (t = Mu).alternate;
                  e = t.flags;
                  switch (t.tag) {
                    case 0:
                      if (e & 4 && (e = (e = t.updateQueue) !== null ? e.events : null) !== null) {
                        for (n = 0; n < e.length; n++) {
                          (l = e[n]).ref.impl = l.nextImpl;
                        }
                      }
                      break;
                    case 11:
                    case 15:
                    case 5:
                    case 26:
                    case 27:
                    case 6:
                    case 4:
                    case 17:
                      break;
                    case 1:
                      if (e & 1024 && o !== null) {
                        e = undefined;
                        n = t;
                        l = o.memoizedProps;
                        o = o.memoizedState;
                        r = n.stateNode;
                        try {
                          var m = Pi(n.type, l);
                          e = r.getSnapshotBeforeUpdate(m, o);
                          r.__reactInternalSnapshotBeforeUpdate = e;
                        } catch (y) {
                          Pc(n, n.return, y);
                        }
                      }
                      break;
                    case 3:
                      if (e & 1024) {
                        if ((n = (e = t.stateNode.containerInfo).nodeType) === 9) {
                          xf(e);
                        } else if (n === 1) {
                          switch (e.nodeName) {
                            case "HEAD":
                            case "HTML":
                            case "BODY":
                              xf(e);
                              break;
                            default:
                              e.textContent = "";
                          }
                        }
                      }
                      break;
                    default:
                      if (e & 1024) {
                        throw Error(a(163));
                      }
                  }
                  if ((e = t.sibling) !== null) {
                    e.return = t.return;
                    Mu = e;
                    break;
                  }
                  Mu = t.return;
                }
              }
            }
          })(e, t);
        } finally {
          ms = i;
          D.p = l;
          H.T = r;
        }
      }
      Fs = 1;
      vc();
      bc();
      Sc();
    }
  }
  function vc() {
    if (Fs === 1) {
      Fs = 0;
      var e = Bs;
      var t = Us;
      var n = !!(t.flags & 13878);
      if (t.subtreeFlags & 13878 || n) {
        n = H.T;
        H.T = null;
        var r = D.p;
        D.p = 2;
        var a = ms;
        ms |= 4;
        try {
          Qu(t, e);
          var l = vf;
          var o = lr(e.containerInfo);
          var i = l.focusedElem;
          var u = l.selectionRange;
          if (o !== i && i && i.ownerDocument && ar(i.ownerDocument.documentElement, i)) {
            if (u !== null && or(i)) {
              var s = u.start;
              var c = u.end;
              if (c === undefined) {
                c = s;
              }
              if ("selectionStart" in i) {
                i.selectionStart = s;
                i.selectionEnd = Math.min(c, i.value.length);
              } else {
                var f = i.ownerDocument || document;
                var d = f && f.defaultView || window;
                if (d.getSelection) {
                  var h = d.getSelection();
                  var p = i.textContent.length;
                  var m = Math.min(u.start, p);
                  var g = u.end === undefined ? m : Math.min(u.end, p);
                  if (!h.extend && m > g) {
                    o = g;
                    g = m;
                    m = o;
                  }
                  var y = rr(i, m);
                  var v = rr(i, g);
                  if (y && v && (h.rangeCount !== 1 || h.anchorNode !== y.node || h.anchorOffset !== y.offset || h.focusNode !== v.node || h.focusOffset !== v.offset)) {
                    var b = f.createRange();
                    b.setStart(y.node, y.offset);
                    h.removeAllRanges();
                    if (m > g) {
                      h.addRange(b);
                      h.extend(v.node, v.offset);
                    } else {
                      b.setEnd(v.node, v.offset);
                      h.addRange(b);
                    }
                  }
                }
              }
            }
            f = [];
            h = i;
            while (h = h.parentNode) {
              if (h.nodeType === 1) {
                f.push({
                  element: h,
                  left: h.scrollLeft,
                  top: h.scrollTop
                });
              }
            }
            if (typeof i.focus == "function") {
              i.focus();
            }
            i = 0;
            for (; i < f.length; i++) {
              var S = f[i];
              S.element.scrollLeft = S.left;
              S.element.scrollTop = S.top;
            }
          }
          wd = !!yf;
          vf = yf = null;
        } finally {
          ms = a;
          D.p = r;
          H.T = n;
        }
      }
      e.current = t;
      Fs = 2;
    }
  }
  function bc() {
    if (Fs === 2) {
      Fs = 0;
      var e = Bs;
      var t = Us;
      var n = !!(t.flags & 8772);
      if (t.subtreeFlags & 8772 || n) {
        n = H.T;
        H.T = null;
        var r = D.p;
        D.p = 2;
        var a = ms;
        ms |= 4;
        try {
          Hu(e, t.alternate, t);
        } finally {
          ms = a;
          D.p = r;
          H.T = n;
        }
      }
      Fs = 3;
    }
  }
  function Sc() {
    if (Fs === 4 || Fs === 3) {
      Fs = 0;
      se();
      var e = Bs;
      var t = Us;
      var n = Gs;
      var r = $s;
      if (t.subtreeFlags & 10256 || t.flags & 10256) {
        Fs = 5;
      } else {
        Fs = 0;
        Us = Bs = null;
        Ec(e, e.pendingLanes);
      }
      var a = e.pendingLanes;
      if (a === 0) {
        zs = null;
      }
      Fe(n);
      t = t.stateNode;
      if (Se && typeof Se.onCommitFiberRoot == "function") {
        try {
          Se.onCommitFiberRoot(be, t, undefined, !(~t.current.flags & 128));
        } catch (u) {}
      }
      if (r !== null) {
        t = H.T;
        a = D.p;
        D.p = 2;
        H.T = null;
        try {
          var l = e.onRecoverableError;
          for (var o = 0; o < r.length; o++) {
            var i = r[o];
            l(i.value, {
              componentStack: i.stack
            });
          }
        } finally {
          H.T = t;
          D.p = a;
        }
      }
      if (Gs & 3) {
        wc();
      }
      Dc(e);
      a = e.pendingLanes;
      if (n & 261930 && a & 42) {
        if (e === Qs) {
          Ws++;
        } else {
          Ws = 0;
          Qs = e;
        }
      } else {
        Ws = 0;
      }
      zc(0);
    }
  }
  function Ec(e, t) {
    if ((e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache) != null) {
      e.pooledCache = null;
      Ga(t);
    }
  }
  function wc() {
    vc();
    bc();
    Sc();
    return kc();
  }
  function kc() {
    if (Fs !== 5) {
      return false;
    }
    var e = Bs;
    var t = js;
    js = 0;
    var n = Fe(Gs);
    var r = H.T;
    var l = D.p;
    try {
      D.p = n < 32 ? 32 : n;
      H.T = null;
      n = Vs;
      Vs = null;
      var o = Bs;
      var i = Gs;
      Fs = 0;
      Us = Bs = null;
      Gs = 0;
      if (ms & 6) {
        throw Error(a(331));
      }
      var u = ms;
      ms |= 4;
      cs(o.current);
      ns(o, o.current, i, n);
      ms = u;
      zc(0, false);
      if (Se && typeof Se.onPostCommitFiberRoot == "function") {
        try {
          Se.onPostCommitFiberRoot(be, o);
        } catch (s) {}
      }
      return true;
    } finally {
      D.p = l;
      H.T = r;
      Ec(e, t);
    }
  }
  function Tc(e, t, n) {
    t = Xr(n, t);
    if ((e = El(e, t = Oi(e.stateNode, t, 2), 2)) !== null) {
      Ie(e, 2);
      Dc(e);
    }
  }
  function Pc(e, t, n) {
    if (e.tag === 3) {
      Tc(e, e, n);
    } else {
      while (t !== null) {
        if (t.tag === 3) {
          Tc(t, e, n);
          break;
        }
        if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (zs === null || !zs.has(r))) {
            e = Xr(n, e);
            if ((r = El(t, n = xi(2), 2)) !== null) {
              Ri(n, r, t, e);
              Ie(r, 2);
              Dc(r);
            }
            break;
          }
        }
        t = t.return;
      }
    }
  }
  function _c(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new ps();
      var a = new Set();
      r.set(t, a);
    } else if ((a = r.get(t)) === undefined) {
      a = new Set();
      r.set(t, a);
    }
    if (!a.has(n)) {
      ks = true;
      a.add(n);
      e = Cc.bind(null, e, t, n);
      t.then(e, e);
    }
  }
  function Cc(e, t, n) {
    var r = e.pingCache;
    if (r !== null) {
      r.delete(t);
    }
    e.pingedLanes |= e.suspendedLanes & n;
    e.warmLanes &= ~n;
    if (gs === e && (vs & n) === n) {
      if (Ps === 4 || Ps === 3 && (vs & 62914560) === vs && ce() - Is < 300) {
        if (!(ms & 2)) {
          rc(e, 0);
        }
      } else {
        Ns |= n;
      }
      if (As === vs) {
        As = 0;
      }
    }
    Dc(e);
  }
  function Nc(e, t) {
    if (t === 0) {
      t = xe();
    }
    if ((e = Mr(e, t)) !== null) {
      Ie(e, t);
      Dc(e);
    }
  }
  function Lc(e) {
    var t = e.memoizedState;
    var n = 0;
    if (t !== null) {
      n = t.retryLane;
    }
    Nc(e, n);
  }
  function Ac(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode;
        var l = e.memoizedState;
        if (l !== null) {
          n = l.retryLane;
        }
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    if (r !== null) {
      r.delete(t);
    }
    Nc(e, n);
  }
  var Oc = null;
  var xc = null;
  var Rc = false;
  var Ic = false;
  var Mc = false;
  var Hc = 0;
  function Dc(e) {
    if (e !== xc && e.next === null) {
      if (xc === null) {
        Oc = xc = e;
      } else {
        xc = xc.next = e;
      }
    }
    Ic = true;
    if (!Rc) {
      Rc = true;
      Cf(function () {
        if (ms & 6) {
          oe(de, Fc);
        } else {
          Bc();
        }
      });
    }
  }
  function zc(e, t) {
    if (!Mc && Ic) {
      Mc = true;
      do {
        for (var n = false, r = Oc; r !== null;) {
          if (e !== 0) {
            var a = r.pendingLanes;
            if (a === 0) {
              var l = 0;
            } else {
              var o = r.suspendedLanes;
              var i = r.pingedLanes;
              l = (1 << 31 - we(e | 42) + 1) - 1;
              l = (l &= a & ~(o & ~i)) & 201326741 ? l & 201326741 | 1 : l ? l | 2 : 0;
            }
            if (l !== 0) {
              n = true;
              jc(r, l);
            }
          } else {
            l = vs;
            if (!!((l = Le(r, r === gs ? l : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1)) & 3) && !Ae(r, l)) {
              n = true;
              jc(r, l);
            }
          }
          r = r.next;
        }
      } while (n);
      Mc = false;
    }
  }
  function Fc() {
    Bc();
  }
  function Bc() {
    Ic = Rc = false;
    var e = 0;
    if (Hc !== 0 && function () {
      var e = window.event;
      if (e && e.type === "popstate") {
        return e !== kf && (kf = e, true);
      }
      kf = null;
      return false;
    }()) {
      e = Hc;
    }
    var t = ce();
    for (var n = null, r = Oc; r !== null;) {
      var a = r.next;
      var l = Uc(r, t);
      if (l === 0) {
        r.next = null;
        if (n === null) {
          Oc = a;
        } else {
          n.next = a;
        }
        if (a === null) {
          xc = n;
        }
      } else {
        n = r;
        if (e !== 0 || l & 3) {
          Ic = true;
        }
      }
      r = a;
    }
    if (Fs === 0 || Fs === 5) {
      zc(e);
    }
    if (Hc !== 0) {
      Hc = 0;
    }
  }
  function Uc(e, t) {
    var n = e.suspendedLanes;
    var r = e.pingedLanes;
    var a = e.expirationTimes;
    for (var l = e.pendingLanes & -62914561; l > 0;) {
      var o = 31 - we(l);
      var i = 1 << o;
      var u = a[o];
      if (u === -1) {
        if ((i & n) === 0 || (i & r) !== 0) {
          a[o] = Oe(i, t);
        }
      } else if (u <= t) {
        e.expiredLanes |= i;
      }
      l &= ~i;
    }
    n = vs;
    n = Le(e, e === (t = gs) ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1);
    r = e.callbackNode;
    if (n === 0 || e === t && (bs === 2 || bs === 9) || e.cancelPendingCommit !== null) {
      if (r !== null && r !== null) {
        ie(r);
      }
      e.callbackNode = null;
      return e.callbackPriority = 0;
    }
    if (!(n & 3) || Ae(e, n)) {
      if ((t = n & -n) === e.callbackPriority) {
        return t;
      }
      if (r !== null) {
        ie(r);
      }
      switch (Fe(n)) {
        case 2:
        case 8:
          n = he;
          break;
        case 32:
        default:
          n = pe;
          break;
        case 268435456:
          n = ge;
      }
      r = Gc.bind(null, e);
      n = oe(n, r);
      e.callbackPriority = t;
      e.callbackNode = n;
      return t;
    }
    if (r !== null && r !== null) {
      ie(r);
    }
    e.callbackPriority = 2;
    e.callbackNode = null;
    return 2;
  }
  function Gc(e, t) {
    if (Fs !== 0 && Fs !== 5) {
      e.callbackNode = null;
      e.callbackPriority = 0;
      return null;
    }
    var n = e.callbackNode;
    if (wc() && e.callbackNode !== n) {
      return null;
    }
    var r = vs;
    if ((r = Le(e, e === gs ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)) === 0) {
      return null;
    } else {
      Ys(e, r, t);
      Uc(e, ce());
      if (e.callbackNode != null && e.callbackNode === n) {
        return Gc.bind(null, e);
      } else {
        return null;
      }
    }
  }
  function jc(e, t) {
    if (wc()) {
      return null;
    }
    Ys(e, t, true);
  }
  function Vc() {
    if (Hc === 0) {
      var e = $a;
      if (e === 0) {
        e = Pe;
        if (!((Pe <<= 1) & 261888)) {
          Pe = 256;
        }
      }
      Hc = e;
    }
    return Hc;
  }
  function $c(e) {
    if (e == null || typeof e == "symbol" || typeof e == "boolean") {
      return null;
    } else if (typeof e == "function") {
      return e;
    } else {
      return Rt("" + e);
    }
  }
  function Wc(e, t) {
    var n = t.ownerDocument.createElement("input");
    n.name = t.name;
    n.value = t.value;
    if (e.id) {
      n.setAttribute("form", e.id);
    }
    t.parentNode.insertBefore(n, t);
    e = new FormData(e);
    n.parentNode.removeChild(n);
    return e;
  }
  for (var Qc = 0; Qc < _r.length; Qc++) {
    var qc = _r[Qc];
    Cr(qc.toLowerCase(), "on" + (qc[0].toUpperCase() + qc.slice(1)));
  }
  Cr(vr, "onAnimationEnd");
  Cr(br, "onAnimationIteration");
  Cr(Sr, "onAnimationStart");
  Cr("dblclick", "onDoubleClick");
  Cr("focusin", "onFocus");
  Cr("focusout", "onBlur");
  Cr(Er, "onTransitionRun");
  Cr(wr, "onTransitionStart");
  Cr(kr, "onTransitionCancel");
  Cr(Tr, "onTransitionEnd");
  ot("onMouseEnter", ["mouseout", "mouseover"]);
  ot("onMouseLeave", ["mouseout", "mouseover"]);
  ot("onPointerEnter", ["pointerout", "pointerover"]);
  ot("onPointerLeave", ["pointerout", "pointerover"]);
  lt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  lt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  lt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  lt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  lt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  lt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Kc = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
  var Xc = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Kc));
  function Yc(e, t) {
    t = !!(t & 4);
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      var a = r.event;
      r = r.listeners;
      e: {
        var l = undefined;
        if (t) {
          for (var o = r.length - 1; o >= 0; o--) {
            var i = r[o];
            var u = i.instance;
            var s = i.currentTarget;
            i = i.listener;
            if (u !== l && a.isPropagationStopped()) {
              break e;
            }
            l = i;
            a.currentTarget = s;
            try {
              l(a);
            } catch (c) {
              Nr(c);
            }
            a.currentTarget = null;
            l = u;
          }
        } else {
          for (o = 0; o < r.length; o++) {
            u = (i = r[o]).instance;
            s = i.currentTarget;
            i = i.listener;
            if (u !== l && a.isPropagationStopped()) {
              break e;
            }
            l = i;
            a.currentTarget = s;
            try {
              l(a);
            } catch (c) {
              Nr(c);
            }
            a.currentTarget = null;
            l = u;
          }
        }
      }
    }
  }
  function Zc(e, t) {
    var n = t[We];
    if (n === undefined) {
      n = t[We] = new Set();
    }
    var r = e + "__bubble";
    if (!n.has(r)) {
      nf(t, e, 2, false);
      n.add(r);
    }
  }
  function Jc(e, t, n) {
    var r = 0;
    if (t) {
      r |= 4;
    }
    nf(n, e, r, t);
  }
  var ef = "_reactListening" + Math.random().toString(36).slice(2);
  function tf(e) {
    if (!e[ef]) {
      e[ef] = true;
      rt.forEach(function (t) {
        if (t !== "selectionchange") {
          if (!Xc.has(t)) {
            Jc(t, false, e);
          }
          Jc(t, true, e);
        }
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      if (t !== null && !t[ef]) {
        t[ef] = true;
        Jc("selectionchange", false, t);
      }
    }
  }
  function nf(e, t, n, r) {
    switch (Ld(t)) {
      case 2:
        var a = kd;
        break;
      case 8:
        a = Td;
        break;
      default:
        a = Pd;
    }
    n = a.bind(null, t, n, e);
    a = undefined;
    if (!!Vt && (t === "touchstart" || t === "touchmove" || t === "wheel")) {
      a = true;
    }
    if (r) {
      if (a !== undefined) {
        e.addEventListener(t, n, {
          capture: true,
          passive: a
        });
      } else {
        e.addEventListener(t, n, true);
      }
    } else if (a !== undefined) {
      e.addEventListener(t, n, {
        passive: a
      });
    } else {
      e.addEventListener(t, n, false);
    }
  }
  function rf(e, t, n, r, a) {
    var l = r;
    if (!(t & 1) && !(t & 2) && r !== null) {
      e: while (true) {
        if (r === null) {
          return;
        }
        var i = r.tag;
        if (i === 3 || i === 4) {
          var u = r.stateNode.containerInfo;
          if (u === a) {
            break;
          }
          if (i === 4) {
            for (i = r.return; i !== null;) {
              var s = i.tag;
              if ((s === 3 || s === 4) && i.stateNode.containerInfo === a) {
                return;
              }
              i = i.return;
            }
          }
          while (u !== null) {
            if ((i = Ze(u)) === null) {
              return;
            }
            if ((s = i.tag) === 5 || s === 6 || s === 26 || s === 27) {
              r = l = i;
              continue e;
            }
            u = u.parentNode;
          }
        }
        r = r.return;
      }
    }
    Ut(function () {
      var r = l;
      var a = Ht(n);
      var i = [];
      e: {
        var u = Pr.get(e);
        if (u !== undefined) {
          var s = an;
          var c = e;
          switch (e) {
            case "keypress":
              if (Xt(n) === 0) {
                break e;
              }
            case "keydown":
            case "keyup":
              s = Sn;
              break;
            case "focusin":
              c = "focus";
              s = fn;
              break;
            case "focusout":
              c = "blur";
              s = fn;
              break;
            case "beforeblur":
            case "afterblur":
              s = fn;
              break;
            case "click":
              if (n.button === 2) {
                break e;
              }
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              s = sn;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              s = cn;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              s = wn;
              break;
            case vr:
            case br:
            case Sr:
              s = dn;
              break;
            case Tr:
              s = kn;
              break;
            case "scroll":
            case "scrollend":
              s = on;
              break;
            case "wheel":
              s = Tn;
              break;
            case "copy":
            case "cut":
            case "paste":
              s = hn;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              s = En;
              break;
            case "toggle":
            case "beforetoggle":
              s = Pn;
          }
          var f = !!(t & 4);
          var d = !f && (e === "scroll" || e === "scrollend");
          var h = f ? u !== null ? u + "Capture" : null : u;
          f = [];
          var p;
          for (var m = r; m !== null;) {
            var g = m;
            p = g.stateNode;
            if (((g = g.tag) === 5 || g === 26 || g === 27) && p !== null && h !== null) {
              if ((g = Gt(m, h)) != null) {
                f.push(af(m, g, p));
              }
            }
            if (d) {
              break;
            }
            m = m.return;
          }
          if (f.length > 0) {
            u = new s(u, c, null, n, a);
            i.push({
              event: u,
              listeners: f
            });
          }
        }
      }
      if (!(t & 7)) {
        s = e === "mouseout" || e === "pointerout";
        if ((!(u = e === "mouseover" || e === "pointerover") || n === Mt || !(c = n.relatedTarget || n.fromElement) || !Ze(c) && !c[$e]) && (s || u) && (u = a.window === a ? a : (u = a.ownerDocument) ? u.defaultView || u.parentWindow : window, s ? (s = r, (c = (c = n.relatedTarget || n.toElement) ? Ze(c) : null) !== null && (d = o(c), f = c.tag, c !== d || f !== 5 && f !== 27 && f !== 6) && (c = null)) : (s = null, c = r), s !== c)) {
          f = sn;
          g = "onMouseLeave";
          h = "onMouseEnter";
          m = "mouse";
          if (e === "pointerout" || e === "pointerover") {
            f = En;
            g = "onPointerLeave";
            h = "onPointerEnter";
            m = "pointer";
          }
          d = s == null ? u : et(s);
          p = c == null ? u : et(c);
          (u = new f(g, m + "leave", s, n, a)).target = d;
          u.relatedTarget = p;
          g = null;
          if (Ze(a) === r) {
            (f = new f(h, m + "enter", c, n, a)).target = p;
            f.relatedTarget = d;
            g = f;
          }
          d = g;
          if (s && c) {
            e: {
              f = of;
              m = c;
              p = 0;
              g = h = s;
              for (; g; g = f(g)) {
                p++;
              }
              g = 0;
              for (var y = m; y; y = f(y)) {
                g++;
              }
              while (p - g > 0) {
                h = f(h);
                p--;
              }
              while (g - p > 0) {
                m = f(m);
                g--;
              }
              while (p--) {
                if (h === m || m !== null && h === m.alternate) {
                  f = h;
                  break e;
                }
                h = f(h);
                m = f(m);
              }
              f = null;
            }
          } else {
            f = null;
          }
          if (s !== null) {
            uf(i, u, s, f, false);
          }
          if (c !== null && d !== null) {
            uf(i, d, c, f, true);
          }
        }
        if ((s = (u = r ? et(r) : window).nodeName && u.nodeName.toLowerCase()) === "select" || s === "input" && u.type === "file") {
          var v = jn;
        } else if (Dn(u)) {
          if (Vn) {
            v = Jn;
          } else {
            v = Yn;
            var b = Xn;
          }
        } else if (!(s = u.nodeName) || s.toLowerCase() !== "input" || u.type !== "checkbox" && u.type !== "radio") {
          if (r && At(r.elementType)) {
            v = jn;
          }
        } else {
          v = Zn;
        }
        if (v &&= v(e, r)) {
          zn(i, v, n, a);
        } else {
          if (b) {
            b(e, u, r);
          }
          if (e === "focusout" && r && u.type === "number" && r.memoizedProps.value != null) {
            wt(u, "number", u.value);
          }
        }
        b = r ? et(r) : window;
        switch (e) {
          case "focusin":
            if (Dn(b) || b.contentEditable === "true") {
              ur = b;
              sr = r;
              cr = null;
            }
            break;
          case "focusout":
            cr = sr = ur = null;
            break;
          case "mousedown":
            fr = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            fr = false;
            dr(i, n, a);
            break;
          case "selectionchange":
            if (ir) {
              break;
            }
          case "keydown":
          case "keyup":
            dr(i, n, a);
        }
        var S;
        if (Cn) {
          e: {
            switch (e) {
              case "compositionstart":
                var E = "onCompositionStart";
                break e;
              case "compositionend":
                E = "onCompositionEnd";
                break e;
              case "compositionupdate":
                E = "onCompositionUpdate";
                break e;
            }
            E = undefined;
          }
        } else if (Mn) {
          if (Rn(e, n)) {
            E = "onCompositionEnd";
          }
        } else if (e === "keydown" && n.keyCode === 229) {
          E = "onCompositionStart";
        }
        if (E) {
          if (An && n.locale !== "ko") {
            if (Mn || E !== "onCompositionStart") {
              if (E === "onCompositionEnd" && Mn) {
                S = Kt();
              }
            } else {
              Qt = "value" in (Wt = a) ? Wt.value : Wt.textContent;
              Mn = true;
            }
          }
          if ((b = lf(r, E)).length > 0) {
            E = new pn(E, e, null, n, a);
            i.push({
              event: E,
              listeners: b
            });
            if (S) {
              E.data = S;
            } else if ((S = In(n)) !== null) {
              E.data = S;
            }
          }
        }
        if ((S = Ln ? function (e, t) {
          switch (e) {
            case "compositionend":
              return In(t);
            case "keypress":
              if (t.which !== 32) {
                return null;
              } else {
                xn = true;
                return On;
              }
            case "textInput":
              if ((e = t.data) === On && xn) {
                return null;
              } else {
                return e;
              }
            default:
              return null;
          }
        }(e, n) : function (e, t) {
          if (Mn) {
            if (e === "compositionend" || !Cn && Rn(e, t)) {
              e = Kt();
              qt = Qt = Wt = null;
              Mn = false;
              return e;
            } else {
              return null;
            }
          }
          switch (e) {
            case "paste":
            default:
              return null;
            case "keypress":
              if (!t.ctrlKey && !t.altKey && !t.metaKey || t.ctrlKey && t.altKey) {
                if (t.char && t.char.length > 1) {
                  return t.char;
                }
                if (t.which) {
                  return String.fromCharCode(t.which);
                }
              }
              return null;
            case "compositionend":
              if (An && t.locale !== "ko") {
                return null;
              } else {
                return t.data;
              }
          }
        }(e, n)) && (E = lf(r, "onBeforeInput")).length > 0) {
          b = new pn("onBeforeInput", "beforeinput", null, n, a);
          i.push({
            event: b,
            listeners: E
          });
          b.data = S;
        }
        (function (e, t, n, r, a) {
          if (t === "submit" && n && n.stateNode === a) {
            var l = $c((a[Ve] || null).action);
            var o = r.submitter;
            if (o && (t = (t = o[Ve] || null) ? $c(t.formAction) : o.getAttribute("formAction")) !== null) {
              l = t;
              o = null;
            }
            var i = new an("action", "action", null, r, a);
            e.push({
              event: i,
              listeners: [{
                instance: null,
                listener: function () {
                  if (r.defaultPrevented) {
                    if (Hc !== 0) {
                      var e = o ? Wc(a, o) : new FormData(a);
                      ri(n, {
                        pending: true,
                        data: e,
                        method: a.method,
                        action: l
                      }, null, e);
                    }
                  } else if (typeof l == "function") {
                    i.preventDefault();
                    e = o ? Wc(a, o) : new FormData(a);
                    ri(n, {
                      pending: true,
                      data: e,
                      method: a.method,
                      action: l
                    }, l, e);
                  }
                },
                currentTarget: a
              }]
            });
          }
        })(i, e, r, n, a);
      }
      Yc(i, t);
    });
  }
  function af(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function lf(e, t) {
    var n = t + "Capture";
    var r = [];
    for (; e !== null;) {
      var a = e;
      var l = a.stateNode;
      if (((a = a.tag) === 5 || a === 26 || a === 27) && l !== null) {
        if ((a = Gt(e, n)) != null) {
          r.unshift(af(e, a, l));
        }
        if ((a = Gt(e, t)) != null) {
          r.push(af(e, a, l));
        }
      }
      if (e.tag === 3) {
        return r;
      }
      e = e.return;
    }
    return [];
  }
  function of(e) {
    if (e === null) {
      return null;
    }
    do {
      e = e.return;
    } while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function uf(e, t, n, r, a) {
    var l = t._reactName;
    var o = [];
    for (; n !== null && n !== r;) {
      var i = n;
      var u = i.alternate;
      var s = i.stateNode;
      i = i.tag;
      if (u !== null && u === r) {
        break;
      }
      if ((i === 5 || i === 26 || i === 27) && s !== null) {
        u = s;
        if (a) {
          if ((s = Gt(n, l)) != null) {
            o.unshift(af(n, s, u));
          }
        } else if (!a) {
          if ((s = Gt(n, l)) != null) {
            o.push(af(n, s, u));
          }
        }
      }
      n = n.return;
    }
    if (o.length !== 0) {
      e.push({
        event: t,
        listeners: o
      });
    }
  }
  var sf = /\r\n?/g;
  var cf = /\u0000|\uFFFD/g;
  function ff(e) {
    return (typeof e == "string" ? e : "" + e).replace(sf, "\n").replace(cf, "");
  }
  function df(e, t) {
    t = ff(t);
    return ff(e) === t;
  }
  function hf(e, t, n, r, l, o) {
    switch (n) {
      case "children":
        if (typeof r == "string") {
          if (t !== "body" && (t !== "textarea" || r !== "")) {
            _t(e, r);
          }
        } else if ((typeof r == "number" || typeof r == "bigint") && t !== "body") {
          _t(e, "" + r);
        }
        break;
      case "className":
        ft(e, "class", r);
        break;
      case "tabIndex":
        ft(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ft(e, n, r);
        break;
      case "style":
        Lt(e, r, o);
        break;
      case "data":
        if (t !== "object") {
          ft(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(n);
          break;
        }
        r = Rt("" + r);
        e.setAttribute(n, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        }
        if (typeof o == "function") {
          if (n === "formAction") {
            if (t !== "input") {
              hf(e, t, "name", l.name, l, null);
            }
            hf(e, t, "formEncType", l.formEncType, l, null);
            hf(e, t, "formMethod", l.formMethod, l, null);
            hf(e, t, "formTarget", l.formTarget, l, null);
          } else {
            hf(e, t, "encType", l.encType, l, null);
            hf(e, t, "method", l.method, l, null);
            hf(e, t, "target", l.target, l, null);
          }
        }
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(n);
          break;
        }
        r = Rt("" + r);
        e.setAttribute(n, r);
        break;
      case "onClick":
        if (r != null) {
          e.onclick = It;
        }
        break;
      case "onScroll":
        if (r != null) {
          Zc("scroll", e);
        }
        break;
      case "onScrollEnd":
        if (r != null) {
          Zc("scrollend", e);
        }
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r)) {
            throw Error(a(61));
          }
          if ((n = r.__html) != null) {
            if (l.children != null) {
              throw Error(a(60));
            }
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        e.muted = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
      case "autoFocus":
        break;
      case "xlinkHref":
        if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Rt("" + r);
        e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        if (r != null && typeof r != "function" && typeof r != "symbol") {
          e.setAttribute(n, "" + r);
        } else {
          e.removeAttribute(n);
        }
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        if (r && typeof r != "function" && typeof r != "symbol") {
          e.setAttribute(n, "");
        } else {
          e.removeAttribute(n);
        }
        break;
      case "capture":
      case "download":
        if (r === true) {
          e.setAttribute(n, "");
        } else if (r !== false && r != null && typeof r != "function" && typeof r != "symbol") {
          e.setAttribute(n, r);
        } else {
          e.removeAttribute(n);
        }
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        if (r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && r >= 1) {
          e.setAttribute(n, r);
        } else {
          e.removeAttribute(n);
        }
        break;
      case "rowSpan":
      case "start":
        if (r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r)) {
          e.removeAttribute(n);
        } else {
          e.setAttribute(n, r);
        }
        break;
      case "popover":
        Zc("beforetoggle", e);
        Zc("toggle", e);
        ct(e, "popover", r);
        break;
      case "xlinkActuate":
        dt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
        break;
      case "xlinkArcrole":
        dt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
        break;
      case "xlinkRole":
        dt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
        break;
      case "xlinkShow":
        dt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
        break;
      case "xlinkTitle":
        dt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
        break;
      case "xlinkType":
        dt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
        break;
      case "xmlBase":
        dt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
        break;
      case "xmlLang":
        dt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
        break;
      case "xmlSpace":
        dt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
        break;
      case "is":
        ct(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!(n.length > 2) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") {
          ct(e, n = Ot.get(n) || n, r);
        }
    }
  }
  function pf(e, t, n, r, l, o) {
    switch (n) {
      case "style":
        Lt(e, r, o);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r)) {
            throw Error(a(61));
          }
          if ((n = r.__html) != null) {
            if (l.children != null) {
              throw Error(a(60));
            }
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        if (typeof r == "string") {
          _t(e, r);
        } else if (typeof r == "number" || typeof r == "bigint") {
          _t(e, "" + r);
        }
        break;
      case "onScroll":
        if (r != null) {
          Zc("scroll", e);
        }
        break;
      case "onScrollEnd":
        if (r != null) {
          Zc("scrollend", e);
        }
        break;
      case "onClick":
        if (r != null) {
          e.onclick = It;
        }
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
      case "innerText":
      case "textContent":
        break;
      default:
        if (!at.hasOwnProperty(n)) {
          if (n[0] !== "o" || n[1] !== "n" || (l = n.endsWith("Capture"), t = n.slice(2, l ? n.length - 7 : undefined), typeof (o = (o = e[Ve] || null) != null ? o[n] : null) == "function" && e.removeEventListener(t, o, l), typeof r != "function")) {
            if (n in e) {
              e[n] = r;
            } else if (r === true) {
              e.setAttribute(n, "");
            } else {
              ct(e, n, r);
            }
          } else {
            if (typeof o != "function" && o !== null) {
              if (n in e) {
                e[n] = null;
              } else if (e.hasAttribute(n)) {
                e.removeAttribute(n);
              }
            }
            e.addEventListener(t, r, l);
          }
        }
    }
  }
  function mf(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Zc("error", e);
        Zc("load", e);
        var r;
        var l = false;
        var o = false;
        for (r in n) {
          if (n.hasOwnProperty(r)) {
            var i = n[r];
            if (i != null) {
              switch (r) {
                case "src":
                  l = true;
                  break;
                case "srcSet":
                  o = true;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, t));
                default:
                  hf(e, t, r, i, n, null);
              }
            }
          }
        }
        if (o) {
          hf(e, t, "srcSet", n.srcSet, n, null);
        }
        if (l) {
          hf(e, t, "src", n.src, n, null);
        }
        return;
      case "input":
        Zc("invalid", e);
        var u = r = i = o = null;
        var s = null;
        var c = null;
        for (l in n) {
          if (n.hasOwnProperty(l)) {
            var f = n[l];
            if (f != null) {
              switch (l) {
                case "name":
                  o = f;
                  break;
                case "type":
                  i = f;
                  break;
                case "checked":
                  s = f;
                  break;
                case "defaultChecked":
                  c = f;
                  break;
                case "value":
                  r = f;
                  break;
                case "defaultValue":
                  u = f;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (f != null) {
                    throw Error(a(137, t));
                  }
                  break;
                default:
                  hf(e, t, l, f, n, null);
              }
            }
          }
        }
        Et(e, r, u, s, c, i, o, false);
        return;
      case "select":
        Zc("invalid", e);
        l = i = r = null;
        for (o in n) {
          if (n.hasOwnProperty(o) && (u = n[o]) != null) {
            switch (o) {
              case "value":
                r = u;
                break;
              case "defaultValue":
                i = u;
                break;
              case "multiple":
                l = u;
              default:
                hf(e, t, o, u, n, null);
            }
          }
        }
        t = r;
        n = i;
        e.multiple = !!l;
        if (t != null) {
          kt(e, !!l, t, false);
        } else if (n != null) {
          kt(e, !!l, n, true);
        }
        return;
      case "textarea":
        Zc("invalid", e);
        r = o = l = null;
        for (i in n) {
          if (n.hasOwnProperty(i) && (u = n[i]) != null) {
            switch (i) {
              case "value":
                l = u;
                break;
              case "defaultValue":
                o = u;
                break;
              case "children":
                r = u;
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) {
                  throw Error(a(91));
                }
                break;
              default:
                hf(e, t, i, u, n, null);
            }
          }
        }
        Pt(e, l, o, r);
        return;
      case "option":
        for (s in n) {
          if (n.hasOwnProperty(s) && (l = n[s]) != null) {
            if (s === "selected") {
              e.selected = l && typeof l != "function" && typeof l != "symbol";
            } else {
              hf(e, t, s, l, n, null);
            }
          }
        }
        return;
      case "dialog":
        Zc("beforetoggle", e);
        Zc("toggle", e);
        Zc("cancel", e);
        Zc("close", e);
        break;
      case "iframe":
      case "object":
        Zc("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Kc.length; l++) {
          Zc(Kc[l], e);
        }
        break;
      case "image":
        Zc("error", e);
        Zc("load", e);
        break;
      case "details":
        Zc("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Zc("error", e);
        Zc("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (c in n) {
          if (n.hasOwnProperty(c) && (l = n[c]) != null) {
            switch (c) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, t));
              default:
                hf(e, t, c, l, n, null);
            }
          }
        }
        return;
      default:
        if (At(t)) {
          for (f in n) {
            if (n.hasOwnProperty(f) && (l = n[f]) !== undefined) {
              pf(e, t, f, l, n, undefined);
            }
          }
          return;
        }
    }
    for (u in n) {
      if (n.hasOwnProperty(u) && (l = n[u]) != null) {
        hf(e, t, u, l, n, null);
      }
    }
  }
  function gf(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  var yf = null;
  var vf = null;
  function bf(e) {
    if (e.nodeType === 9) {
      return e;
    } else {
      return e.ownerDocument;
    }
  }
  function Sf(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ef(e, t) {
    if (e === 0) {
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    }
    if (e === 1 && t === "foreignObject") {
      return 0;
    } else {
      return e;
    }
  }
  function wf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var kf = null;
  var Tf = typeof setTimeout == "function" ? setTimeout : undefined;
  var Pf = typeof clearTimeout == "function" ? clearTimeout : undefined;
  var _f = typeof Promise == "function" ? Promise : undefined;
  var Cf = typeof queueMicrotask == "function" ? queueMicrotask : _f !== undefined ? function (e) {
    return _f.resolve(null).then(e).catch(Nf);
  } : Tf;
  function Nf(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Lf(e) {
    return e === "head";
  }
  function Af(e, t) {
    var n = t;
    var r = 0;
    do {
      var a = n.nextSibling;
      e.removeChild(n);
      if (a && a.nodeType === 8) {
        if ((n = a.data) === "/$" || n === "/&") {
          if (r === 0) {
            e.removeChild(a);
            Qd(t);
            return;
          }
          r--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") {
          r++;
        } else if (n === "html") {
          Uf(e.ownerDocument.documentElement);
        } else if (n === "head") {
          Uf(n = e.ownerDocument.head);
          for (var l = n.firstChild; l;) {
            var o = l.nextSibling;
            var i = l.nodeName;
            if (!l[Xe] && i !== "SCRIPT" && i !== "STYLE" && (i !== "LINK" || l.rel.toLowerCase() !== "stylesheet")) {
              n.removeChild(l);
            }
            l = o;
          }
        } else if (n === "body") {
          Uf(e.ownerDocument.body);
        }
      }
      n = a;
    } while (n);
    Qd(t);
  }
  function Of(e, t) {
    var n = e;
    e = 0;
    do {
      var r = n.nextSibling;
      if (n.nodeType === 1) {
        if (t) {
          n._stashedDisplay = n.style.display;
          n.style.display = "none";
        } else {
          n.style.display = n._stashedDisplay || "";
          if (n.getAttribute("style") === "") {
            n.removeAttribute("style");
          }
        }
      } else if (n.nodeType === 3) {
        if (t) {
          n._stashedText = n.nodeValue;
          n.nodeValue = "";
        } else {
          n.nodeValue = n._stashedText || "";
        }
      }
      if (r && r.nodeType === 8) {
        if ((n = r.data) === "/$") {
          if (e === 0) {
            break;
          }
          e--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!") {
          e++;
        }
      }
      n = r;
    } while (n);
  }
  function xf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
      var n = t;
      t = t.nextSibling;
      switch (n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          xf(n);
          Ye(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") {
            continue;
          }
      }
      e.removeChild(n);
    }
  }
  function Rf(e, t) {
    while (e.nodeType !== 8) {
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t) {
        return null;
      }
      if ((e = Hf(e.nextSibling)) === null) {
        return null;
      }
    }
    return e;
  }
  function If(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Mf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Hf(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) {
        break;
      }
      if (t === 8) {
        if ((t = e.data) === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") {
          break;
        }
        if (t === "/$" || t === "/&") {
          return null;
        }
      }
    }
    return e;
  }
  var Df = null;
  function zf(e) {
    e = e.nextSibling;
    var t = 0;
    for (; e;) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0) {
            return Hf(e.nextSibling);
          }
          t--;
        } else if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          t++;
        }
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Ff(e) {
    e = e.previousSibling;
    var t = 0;
    for (; e;) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) {
            return e;
          }
          t--;
        } else if (n === "/$" || n === "/&") {
          t++;
        }
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Bf(e, t, n) {
    t = bf(n);
    switch (e) {
      case "html":
        if (!(e = t.documentElement)) {
          throw Error(a(452));
        }
        return e;
      case "head":
        if (!(e = t.head)) {
          throw Error(a(453));
        }
        return e;
      case "body":
        if (!(e = t.body)) {
          throw Error(a(454));
        }
        return e;
      default:
        throw Error(a(451));
    }
  }
  function Uf(e) {
    for (var t = e.attributes; t.length;) {
      e.removeAttributeNode(t[0]);
    }
    Ye(e);
  }
  var Gf = new Map();
  var jf = new Set();
  function Vf(e) {
    if (typeof e.getRootNode == "function") {
      return e.getRootNode();
    } else if (e.nodeType === 9) {
      return e;
    } else {
      return e.ownerDocument;
    }
  }
  var $f = D.d;
  D.d = {
    f: function () {
      var e = $f.f();
      var t = tc();
      return e || t;
    },
    r: function (e) {
      var t = Je(e);
      if (t !== null && t.tag === 5 && t.type === "form") {
        li(t);
      } else {
        $f.r(e);
      }
    },
    D: function (e) {
      $f.D(e);
      Qf("dns-prefetch", e, null);
    },
    C: function (e, t) {
      $f.C(e, t);
      Qf("preconnect", e, t);
    },
    L: function (e, t, n) {
      $f.L(e, t, n);
      var r = Wf;
      if (r && e && t) {
        var a = "link[rel=\"preload\"][as=\"" + bt(t) + "\"]";
        if (t === "image" && n && n.imageSrcSet) {
          a += "[imagesrcset=\"" + bt(n.imageSrcSet) + "\"]";
          if (typeof n.imageSizes == "string") {
            a += "[imagesizes=\"" + bt(n.imageSizes) + "\"]";
          }
        } else {
          a += "[href=\"" + bt(e) + "\"]";
        }
        var l = a;
        switch (t) {
          case "style":
            l = Kf(e);
            break;
          case "script":
            l = Zf(e);
        }
        if (!Gf.has(l)) {
          e = p({
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? undefined : e,
            as: t
          }, n);
          Gf.set(l, e);
          if (r.querySelector(a) === null && (t !== "style" || !r.querySelector(Xf(l))) && (t !== "script" || !r.querySelector(Jf(l)))) {
            mf(t = r.createElement("link"), "link", e);
            nt(t);
            r.head.appendChild(t);
          }
        }
      }
    },
    m: function (e, t) {
      $f.m(e, t);
      var n = Wf;
      if (n && e) {
        var r = t && typeof t.as == "string" ? t.as : "script";
        var a = "link[rel=\"modulepreload\"][as=\"" + bt(r) + "\"][href=\"" + bt(e) + "\"]";
        var l = a;
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            l = Zf(e);
        }
        if (!Gf.has(l) && (e = p({
          rel: "modulepreload",
          href: e
        }, t), Gf.set(l, e), n.querySelector(a) === null)) {
          switch (r) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (n.querySelector(Jf(l))) {
                return;
              }
          }
          mf(r = n.createElement("link"), "link", e);
          nt(r);
          n.head.appendChild(r);
        }
      }
    },
    X: function (e, t) {
      $f.X(e, t);
      var n = Wf;
      if (n && e) {
        var r = tt(n).hoistableScripts;
        var a = Zf(e);
        var l = r.get(a);
        if (!l) {
          if (!(l = n.querySelector(Jf(a)))) {
            e = p({
              src: e,
              async: true
            }, t);
            if (t = Gf.get(a)) {
              rd(e, t);
            }
            nt(l = n.createElement("script"));
            mf(l, "link", e);
            n.head.appendChild(l);
          }
          l = {
            type: "script",
            instance: l,
            count: 1,
            state: null
          };
          r.set(a, l);
        }
      }
    },
    S: function (e, t, n) {
      $f.S(e, t, n);
      var r = Wf;
      if (r && e) {
        var a = tt(r).hoistableStyles;
        var l = Kf(e);
        t = t || "default";
        var o = a.get(l);
        if (!o) {
          var i = {
            loading: 0,
            preload: null
          };
          if (o = r.querySelector(Xf(l))) {
            i.loading = 5;
          } else {
            e = p({
              rel: "stylesheet",
              href: e,
              "data-precedence": t
            }, n);
            if (n = Gf.get(l)) {
              nd(e, n);
            }
            var u = o = r.createElement("link");
            nt(u);
            mf(u, "link", e);
            u._p = new Promise(function (e, t) {
              u.onload = e;
              u.onerror = t;
            });
            u.addEventListener("load", function () {
              i.loading |= 1;
            });
            u.addEventListener("error", function () {
              i.loading |= 2;
            });
            i.loading |= 4;
            td(o, t, r);
          }
          o = {
            type: "stylesheet",
            instance: o,
            count: 1,
            state: i
          };
          a.set(l, o);
        }
      }
    },
    M: function (e, t) {
      $f.M(e, t);
      var n = Wf;
      if (n && e) {
        var r = tt(n).hoistableScripts;
        var a = Zf(e);
        var l = r.get(a);
        if (!l) {
          if (!(l = n.querySelector(Jf(a)))) {
            e = p({
              src: e,
              async: true,
              type: "module"
            }, t);
            if (t = Gf.get(a)) {
              rd(e, t);
            }
            nt(l = n.createElement("script"));
            mf(l, "link", e);
            n.head.appendChild(l);
          }
          l = {
            type: "script",
            instance: l,
            count: 1,
            state: null
          };
          r.set(a, l);
        }
      }
    }
  };
  var Wf = typeof document == "undefined" ? null : document;
  function Qf(e, t, n) {
    var r = Wf;
    if (r && typeof t == "string" && t) {
      var a = bt(t);
      a = "link[rel=\"" + e + "\"][href=\"" + a + "\"]";
      if (typeof n == "string") {
        a += "[crossorigin=\"" + n + "\"]";
      }
      if (!jf.has(a)) {
        jf.add(a);
        e = {
          rel: e,
          crossOrigin: n,
          href: t
        };
        if (r.querySelector(a) === null) {
          mf(t = r.createElement("link"), "link", e);
          nt(t);
          r.head.appendChild(t);
        }
      }
    }
  }
  function qf(e, t, n, r) {
    var l;
    var o;
    var i;
    var u;
    var s = (s = q.current) ? Vf(s) : null;
    if (!s) {
      throw Error(a(446));
    }
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        if (typeof n.precedence == "string" && typeof n.href == "string") {
          t = Kf(n.href);
          if (!(r = (n = tt(s).hoistableStyles).get(t))) {
            r = {
              type: "style",
              instance: null,
              count: 0,
              state: null
            };
            n.set(t, r);
          }
          return r;
        } else {
          return {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        }
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Kf(n.href);
          var c = tt(s).hoistableStyles;
          var f = c.get(e);
          if (!f) {
            s = s.ownerDocument || s;
            f = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null
              }
            };
            c.set(e, f);
            if ((c = s.querySelector(Xf(e))) && !c._p) {
              f.instance = c;
              f.state.loading = 5;
            }
            if (!Gf.has(e)) {
              n = {
                rel: "preload",
                as: "style",
                href: n.href,
                crossOrigin: n.crossOrigin,
                integrity: n.integrity,
                media: n.media,
                hrefLang: n.hrefLang,
                referrerPolicy: n.referrerPolicy
              };
              Gf.set(e, n);
              if (!c) {
                l = s;
                o = e;
                i = n;
                u = f.state;
                if (l.querySelector("link[rel=\"preload\"][as=\"style\"][" + o + "]")) {
                  u.loading = 1;
                } else {
                  o = l.createElement("link");
                  u.preload = o;
                  o.addEventListener("load", function () {
                    return u.loading |= 1;
                  });
                  o.addEventListener("error", function () {
                    return u.loading |= 2;
                  });
                  mf(o, "link", i);
                  nt(o);
                  l.head.appendChild(o);
                }
              }
            }
          }
          if (t && r === null) {
            throw Error(a(528, ""));
          }
          return f;
        }
        if (t && r !== null) {
          throw Error(a(529, ""));
        }
        return null;
      case "script":
        t = n.async;
        if (typeof (n = n.src) == "string" && t && typeof t != "function" && typeof t != "symbol") {
          t = Zf(n);
          if (!(r = (n = tt(s).hoistableScripts).get(t))) {
            r = {
              type: "script",
              instance: null,
              count: 0,
              state: null
            };
            n.set(t, r);
          }
          return r;
        } else {
          return {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        }
      default:
        throw Error(a(444, e));
    }
  }
  function Kf(e) {
    return "href=\"" + bt(e) + "\"";
  }
  function Xf(e) {
    return "link[rel=\"stylesheet\"][" + e + "]";
  }
  function Yf(e) {
    return p({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Zf(e) {
    return "[src=\"" + bt(e) + "\"]";
  }
  function Jf(e) {
    return "script[async]" + e;
  }
  function ed(e, t, n) {
    t.count++;
    if (t.instance === null) {
      switch (t.type) {
        case "style":
          var r = e.querySelector("style[data-href~=\"" + bt(n.href) + "\"]");
          if (r) {
            t.instance = r;
            nt(r);
            return r;
          }
          var l = p({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          nt(r = (e.ownerDocument || e).createElement("style"));
          mf(r, "style", l);
          td(r, n.precedence, e);
          return t.instance = r;
        case "stylesheet":
          l = Kf(n.href);
          var o = e.querySelector(Xf(l));
          if (o) {
            t.state.loading |= 4;
            t.instance = o;
            nt(o);
            return o;
          }
          r = Yf(n);
          if (l = Gf.get(l)) {
            nd(r, l);
          }
          nt(o = (e.ownerDocument || e).createElement("link"));
          var i = o;
          i._p = new Promise(function (e, t) {
            i.onload = e;
            i.onerror = t;
          });
          mf(o, "link", r);
          t.state.loading |= 4;
          td(o, n.precedence, e);
          return t.instance = o;
        case "script":
          o = Zf(n.src);
          if (l = e.querySelector(Jf(o))) {
            t.instance = l;
            nt(l);
            return l;
          } else {
            r = n;
            if (l = Gf.get(o)) {
              rd(r = p({}, n), l);
            }
            nt(l = (e = e.ownerDocument || e).createElement("script"));
            mf(l, "link", r);
            e.head.appendChild(l);
            return t.instance = l;
          }
        case "void":
          return null;
        default:
          throw Error(a(443, t.type));
      }
    } else if (t.type === "stylesheet" && !(t.state.loading & 4)) {
      r = t.instance;
      t.state.loading |= 4;
      td(r, n.precedence, e);
    }
    return t.instance;
  }
  function td(e, t, n) {
    for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), a = r.length ? r[r.length - 1] : null, l = a, o = 0; o < r.length; o++) {
      var i = r[o];
      if (i.dataset.precedence === t) {
        l = i;
      } else if (l !== a) {
        break;
      }
    }
    if (l) {
      l.parentNode.insertBefore(e, l.nextSibling);
    } else {
      (t = n.nodeType === 9 ? n.head : n).insertBefore(e, t.firstChild);
    }
  }
  function nd(e, t) {
    if (e.crossOrigin == null) {
      e.crossOrigin = t.crossOrigin;
    }
    if (e.referrerPolicy == null) {
      e.referrerPolicy = t.referrerPolicy;
    }
    if (e.title == null) {
      e.title = t.title;
    }
  }
  function rd(e, t) {
    if (e.crossOrigin == null) {
      e.crossOrigin = t.crossOrigin;
    }
    if (e.referrerPolicy == null) {
      e.referrerPolicy = t.referrerPolicy;
    }
    if (e.integrity == null) {
      e.integrity = t.integrity;
    }
  }
  var ad = null;
  function ld(e, t, n) {
    if (ad === null) {
      var r = new Map();
      var a = ad = new Map();
      a.set(n, r);
    } else if (!(r = (a = ad).get(n))) {
      r = new Map();
      a.set(n, r);
    }
    if (r.has(e)) {
      return r;
    }
    r.set(e, null);
    n = n.getElementsByTagName(e);
    a = 0;
    for (; a < n.length; a++) {
      var l = n[a];
      if (!l[Xe] && !l[je] && (e !== "link" || l.getAttribute("rel") !== "stylesheet") && l.namespaceURI !== "http://www.w3.org/2000/svg") {
        var o = l.getAttribute(t) || "";
        o = e + o;
        var i = r.get(o);
        if (i) {
          i.push(l);
        } else {
          r.set(o, [l]);
        }
      }
    }
    return r;
  }
  function od(e, t, n) {
    (e = e.ownerDocument || e).head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
  }
  function id(e) {
    return e.type !== "stylesheet" || !!(e.state.loading & 3);
  }
  var ud = 0;
  function sd() {
    this.count--;
    if (this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) {
        fd(this, this.stylesheets);
      } else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null;
        e();
      }
    }
  }
  var cd = null;
  function fd(e, t) {
    e.stylesheets = null;
    if (e.unsuspend !== null) {
      e.count++;
      cd = new Map();
      t.forEach(dd, e);
      cd = null;
      sd.call(e);
    }
  }
  function dd(e, t) {
    if (!(t.state.loading & 4)) {
      var n = cd.get(e);
      if (n) {
        var r = n.get(null);
      } else {
        n = new Map();
        cd.set(e, n);
        for (var a = e.querySelectorAll("link[data-precedence],style[data-precedence]"), l = 0; l < a.length; l++) {
          var o = a[l];
          if (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") {
            n.set(o.dataset.precedence, o);
            r = o;
          }
        }
        if (r) {
          n.set(null, r);
        }
      }
      o = (a = t.instance).getAttribute("data-precedence");
      if ((l = n.get(o) || r) === r) {
        n.set(null, a);
      }
      n.set(o, a);
      this.count++;
      r = sd.bind(this);
      a.addEventListener("load", r);
      a.addEventListener("error", r);
      if (l) {
        l.parentNode.insertBefore(a, l.nextSibling);
      } else {
        (e = e.nodeType === 9 ? e.head : e).insertBefore(a, e.firstChild);
      }
      t.state.loading |= 4;
    }
  }
  var hd = {
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: z,
    _currentValue2: z,
    _threadCount: 0
  };
  function pd(e, t, n, r, a, l, o, i, u) {
    this.tag = 1;
    this.containerInfo = e;
    this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
    this.callbackPriority = 0;
    this.expirationTimes = Re(-1);
    this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = Re(0);
    this.hiddenUpdates = Re(null);
    this.identifierPrefix = r;
    this.onUncaughtError = a;
    this.onCaughtError = l;
    this.onRecoverableError = o;
    this.pooledCache = null;
    this.pooledCacheLanes = 0;
    this.formState = u;
    this.incompleteTransitions = new Map();
  }
  function md(e, t, n, r, a, l, o, i, u, s, c, f) {
    e = new pd(e, t, n, o, u, s, c, f, i);
    t = 1;
    if (l === true) {
      t |= 24;
    }
    l = Br(3, null, null, t);
    e.current = l;
    l.stateNode = e;
    (t = Ua()).refCount++;
    e.pooledCache = t;
    t.refCount++;
    l.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: t
    };
    vl(l);
    return e;
  }
  function gd(e) {
    if (e) {
      return e = zr;
    } else {
      return zr;
    }
  }
  function yd(e, t, n, r, a, l) {
    a = gd(a);
    if (r.context === null) {
      r.context = a;
    } else {
      r.pendingContext = a;
    }
    (r = Sl(t)).payload = {
      element: n
    };
    if ((l = l === undefined ? null : l) !== null) {
      r.callback = l;
    }
    if ((n = El(e, r, t)) !== null) {
      Xs(n, 0, t);
      wl(n, e, t);
    }
  }
  function vd(e, t) {
    if ((e = e.memoizedState) !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function bd(e, t) {
    vd(e, t);
    if (e = e.alternate) {
      vd(e, t);
    }
  }
  function Sd(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Mr(e, 67108864);
      if (t !== null) {
        Xs(t, 0, 67108864);
      }
      bd(e, 67108864);
    }
  }
  function Ed(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = qs();
      var n = Mr(e, t = ze(t));
      if (n !== null) {
        Xs(n, 0, t);
      }
      bd(e, t);
    }
  }
  var wd = true;
  function kd(e, t, n, r) {
    var a = H.T;
    H.T = null;
    var l = D.p;
    try {
      D.p = 2;
      Pd(e, t, n, r);
    } finally {
      D.p = l;
      H.T = a;
    }
  }
  function Td(e, t, n, r) {
    var a = H.T;
    H.T = null;
    var l = D.p;
    try {
      D.p = 8;
      Pd(e, t, n, r);
    } finally {
      D.p = l;
      H.T = a;
    }
  }
  function Pd(e, t, n, r) {
    if (wd) {
      var a = _d(r);
      if (a === null) {
        rf(e, t, r, Cd, n);
        zd(e, r);
      } else if (function (e, t, n, r, a) {
        switch (t) {
          case "focusin":
            Od = Fd(Od, e, t, n, r, a);
            return true;
          case "dragenter":
            xd = Fd(xd, e, t, n, r, a);
            return true;
          case "mouseover":
            Rd = Fd(Rd, e, t, n, r, a);
            return true;
          case "pointerover":
            var l = a.pointerId;
            Id.set(l, Fd(Id.get(l) || null, e, t, n, r, a));
            return true;
          case "gotpointercapture":
            l = a.pointerId;
            Md.set(l, Fd(Md.get(l) || null, e, t, n, r, a));
            return true;
        }
        return false;
      }(a, e, t, n, r)) {
        r.stopPropagation();
      } else {
        zd(e, r);
        if (t & 4 && Dd.indexOf(e) > -1) {
          while (a !== null) {
            var l = Je(a);
            if (l !== null) {
              switch (l.tag) {
                case 3:
                  if ((l = l.stateNode).current.memoizedState.isDehydrated) {
                    var o = Ne(l.pendingLanes);
                    if (o !== 0) {
                      var i = l;
                      i.pendingLanes |= 2;
                      i.entangledLanes |= 2;
                      while (o) {
                        var u = 1 << 31 - we(o);
                        i.entanglements[1] |= u;
                        o &= ~u;
                      }
                      Dc(l);
                      if (!(ms & 6)) {
                        Hs = ce() + 500;
                        zc(0);
                      }
                    }
                  }
                  break;
                case 31:
                case 13:
                  if ((i = Mr(l, 2)) !== null) {
                    Xs(i, 0, 2);
                  }
                  tc();
                  bd(l, 2);
              }
            }
            if ((l = _d(r)) === null) {
              rf(e, t, r, Cd, n);
            }
            if (l === a) {
              break;
            }
            a = l;
          }
          if (a !== null) {
            r.stopPropagation();
          }
        } else {
          rf(e, t, r, null, n);
        }
      }
    }
  }
  function _d(e) {
    return Nd(e = Ht(e));
  }
  var Cd = null;
  function Nd(e) {
    Cd = null;
    if ((e = Ze(e)) !== null) {
      var t = o(e);
      if (t === null) {
        e = null;
      } else {
        var n = t.tag;
        if (n === 13) {
          if ((e = u(t)) !== null) {
            return e;
          }
          e = null;
        } else if (n === 31) {
          if ((e = s(t)) !== null) {
            return e;
          }
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) {
            if (t.tag === 3) {
              return t.stateNode.containerInfo;
            } else {
              return null;
            }
          }
          e = null;
        } else if (t !== e) {
          e = null;
        }
      }
    }
    Cd = e;
    return null;
  }
  function Ld(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (fe()) {
          case de:
            return 2;
          case he:
            return 8;
          case pe:
          case me:
            return 32;
          case ge:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ad = false;
  var Od = null;
  var xd = null;
  var Rd = null;
  var Id = new Map();
  var Md = new Map();
  var Hd = [];
  var Dd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function zd(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Od = null;
        break;
      case "dragenter":
      case "dragleave":
        xd = null;
        break;
      case "mouseover":
      case "mouseout":
        Rd = null;
        break;
      case "pointerover":
      case "pointerout":
        Id.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Md.delete(t.pointerId);
    }
  }
  function Fd(e, t, n, r, a, l) {
    if (e === null || e.nativeEvent !== l) {
      e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [a]
      };
      if (t !== null && (t = Je(t)) !== null) {
        Sd(t);
      }
      return e;
    } else {
      e.eventSystemFlags |= r;
      t = e.targetContainers;
      if (a !== null && t.indexOf(a) === -1) {
        t.push(a);
      }
      return e;
    }
  }
  function Bd(e) {
    var t = Ze(e.target);
    if (t !== null) {
      var n = o(t);
      if (n !== null) {
        if ((t = n.tag) === 13) {
          if ((t = u(n)) !== null) {
            e.blockedOn = t;
            Ue(e.priority, function () {
              Ed(n);
            });
            return;
          }
        } else if (t === 31) {
          if ((t = s(n)) !== null) {
            e.blockedOn = t;
            Ue(e.priority, function () {
              Ed(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ud(e) {
    if (e.blockedOn !== null) {
      return false;
    }
    for (var t = e.targetContainers; t.length > 0;) {
      var n = _d(e.nativeEvent);
      if (n !== null) {
        if ((t = Je(n)) !== null) {
          Sd(t);
        }
        e.blockedOn = n;
        return false;
      }
      var r = new (n = e.nativeEvent).constructor(n.type, n);
      Mt = r;
      n.target.dispatchEvent(r);
      Mt = null;
      t.shift();
    }
    return true;
  }
  function Gd(e, t, n) {
    if (Ud(e)) {
      n.delete(t);
    }
  }
  function jd() {
    Ad = false;
    if (Od !== null && Ud(Od)) {
      Od = null;
    }
    if (xd !== null && Ud(xd)) {
      xd = null;
    }
    if (Rd !== null && Ud(Rd)) {
      Rd = null;
    }
    Id.forEach(Gd);
    Md.forEach(Gd);
  }
  function Vd(e, n) {
    if (e.blockedOn === n) {
      e.blockedOn = null;
      if (!Ad) {
        Ad = true;
        t.unstable_scheduleCallback(t.unstable_NormalPriority, jd);
      }
    }
  }
  var $d = null;
  function Wd(e) {
    if ($d !== e) {
      $d = e;
      t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
        if ($d === e) {
          $d = null;
        }
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t];
          var r = e[t + 1];
          var a = e[t + 2];
          if (typeof r != "function") {
            if (Nd(r || n) === null) {
              continue;
            }
            break;
          }
          var l = Je(n);
          if (l !== null) {
            e.splice(t, 3);
            t -= 3;
            ri(l, {
              pending: true,
              data: a,
              method: n.method,
              action: r
            }, r, a);
          }
        }
      });
    }
  }
  function Qd(e) {
    function t(t) {
      return Vd(t, e);
    }
    if (Od !== null) {
      Vd(Od, e);
    }
    if (xd !== null) {
      Vd(xd, e);
    }
    if (Rd !== null) {
      Vd(Rd, e);
    }
    Id.forEach(t);
    Md.forEach(t);
    for (var n = 0; n < Hd.length; n++) {
      var r = Hd[n];
      if (r.blockedOn === e) {
        r.blockedOn = null;
      }
    }
    while (Hd.length > 0 && (n = Hd[0]).blockedOn === null) {
      Bd(n);
      if (n.blockedOn === null) {
        Hd.shift();
      }
    }
    if ((n = (e.ownerDocument || e).$$reactFormReplay) != null) {
      for (r = 0; r < n.length; r += 3) {
        var a = n[r];
        var l = n[r + 1];
        var o = a[Ve] || null;
        if (typeof l == "function") {
          if (!o) {
            Wd(n);
          }
        } else if (o) {
          var i = null;
          if (l && l.hasAttribute("formAction")) {
            a = l;
            if (o = l[Ve] || null) {
              i = o.formAction;
            } else if (Nd(a) !== null) {
              continue;
            }
          } else {
            i = o.action;
          }
          if (typeof i == "function") {
            n[r + 1] = i;
          } else {
            n.splice(r, 3);
            r -= 3;
          }
          Wd(n);
        }
      }
    }
  }
  function qd() {
    function e(e) {
      if (e.canIntercept && e.info === "react-transition") {
        e.intercept({
          handler: function () {
            return new Promise(function (e) {
              return a = e;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
    }
    function t() {
      if (a !== null) {
        a();
        a = null;
      }
      if (!r) {
        setTimeout(n, 20);
      }
    }
    function n() {
      if (!r && !navigation.transition) {
        var e = navigation.currentEntry;
        if (e && e.url != null) {
          navigation.navigate(e.url, {
            state: e.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
    }
    if (typeof navigation == "object") {
      var r = false;
      var a = null;
      navigation.addEventListener("navigate", e);
      navigation.addEventListener("navigatesuccess", t);
      navigation.addEventListener("navigateerror", t);
      setTimeout(n, 100);
      return function () {
        r = true;
        navigation.removeEventListener("navigate", e);
        navigation.removeEventListener("navigatesuccess", t);
        navigation.removeEventListener("navigateerror", t);
        if (a !== null) {
          a();
          a = null;
        }
      };
    }
  }
  function Kd(e) {
    this._internalRoot = e;
  }
  function Xd(e) {
    this._internalRoot = e;
  }
  Xd.prototype.render = Kd.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) {
      throw Error(a(409));
    }
    yd(t.current, qs(), e, t, null, null);
  };
  Xd.prototype.unmount = Kd.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      yd(e.current, 2, null, e, null, null);
      tc();
      t[$e] = null;
    }
  };
  Xd.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Be();
      e = {
        blockedOn: null,
        target: e,
        priority: t
      };
      for (var n = 0; n < Hd.length && t !== 0 && t < Hd[n].priority; n++);
      Hd.splice(n, 0, e);
      if (n === 0) {
        Bd(e);
      }
    }
  };
  var Yd = n.version;
  if (Yd !== "19.2.4") {
    throw Error(a(527, Yd, "19.2.4"));
  }
  D.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === undefined) {
      if (typeof e.render == "function") {
        throw Error(a(188));
      }
      e = Object.keys(e).join(",");
      throw Error(a(268, e));
    }
    e = function (e) {
      var t = e.alternate;
      if (!t) {
        if ((t = o(e)) === null) {
          throw Error(a(188));
        }
        if (t !== e) {
          return null;
        } else {
          return e;
        }
      }
      var n = e;
      var r = t;
      while (true) {
        var l = n.return;
        if (l === null) {
          break;
        }
        var i = l.alternate;
        if (i === null) {
          if ((r = l.return) !== null) {
            n = r;
            continue;
          }
          break;
        }
        if (l.child === i.child) {
          for (i = l.child; i;) {
            if (i === n) {
              f(l);
              return e;
            }
            if (i === r) {
              f(l);
              return t;
            }
            i = i.sibling;
          }
          throw Error(a(188));
        }
        if (n.return !== r.return) {
          n = l;
          r = i;
        } else {
          var u = false;
          for (var s = l.child; s;) {
            if (s === n) {
              u = true;
              n = l;
              r = i;
              break;
            }
            if (s === r) {
              u = true;
              r = l;
              n = i;
              break;
            }
            s = s.sibling;
          }
          if (!u) {
            for (s = i.child; s;) {
              if (s === n) {
                u = true;
                n = i;
                r = l;
                break;
              }
              if (s === r) {
                u = true;
                r = i;
                n = l;
                break;
              }
              s = s.sibling;
            }
            if (!u) {
              throw Error(a(189));
            }
          }
        }
        if (n.alternate !== r) {
          throw Error(a(190));
        }
      }
      if (n.tag !== 3) {
        throw Error(a(188));
      }
      if (n.stateNode.current === n) {
        return e;
      } else {
        return t;
      }
    }(t);
    return e = (e = e !== null ? d(e) : null) === null ? null : e.stateNode;
  };
  var Zd = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: H,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
    var Jd = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Jd.isDisabled && Jd.supportsFiber) {
      try {
        be = Jd.inject(Zd);
        Se = Jd;
      } catch (th) {}
    }
  }
  i.createRoot = function (e, t) {
    if (!l(e)) {
      throw Error(a(299));
    }
    var n = false;
    var r = "";
    var o = _i;
    var i = Ci;
    var u = Ni;
    if (t != null) {
      if (t.unstable_strictMode === true) {
        n = true;
      }
      if (t.identifierPrefix !== undefined) {
        r = t.identifierPrefix;
      }
      if (t.onUncaughtError !== undefined) {
        o = t.onUncaughtError;
      }
      if (t.onCaughtError !== undefined) {
        i = t.onCaughtError;
      }
      if (t.onRecoverableError !== undefined) {
        u = t.onRecoverableError;
      }
    }
    t = md(e, 1, false, null, 0, n, r, null, o, i, u, qd);
    e[$e] = t.current;
    tf(e);
    return new Kd(t);
  };
  i.hydrateRoot = function (e, t, n) {
    if (!l(e)) {
      throw Error(a(299));
    }
    var r = false;
    var o = "";
    var i = _i;
    var u = Ci;
    var s = Ni;
    var c = null;
    if (n != null) {
      if (n.unstable_strictMode === true) {
        r = true;
      }
      if (n.identifierPrefix !== undefined) {
        o = n.identifierPrefix;
      }
      if (n.onUncaughtError !== undefined) {
        i = n.onUncaughtError;
      }
      if (n.onCaughtError !== undefined) {
        u = n.onCaughtError;
      }
      if (n.onRecoverableError !== undefined) {
        s = n.onRecoverableError;
      }
      if (n.formState !== undefined) {
        c = n.formState;
      }
    }
    (t = md(e, 1, true, t, 0, r, o, c, i, u, s, qd)).context = gd(null);
    n = t.current;
    (o = Sl(r = ze(r = qs()))).callback = null;
    El(n, o, r);
    n = r;
    t.current.lanes = n;
    Ie(t, n);
    Dc(t);
    e[$e] = t.current;
    tf(e);
    return new Xd(t);
  };
  i.version = "19.2.4";
  return i;
}
const S = t((p || (p = 1, function e() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
    } catch (t) {}
  }
}(), o.exports = b()), o.exports));
function E(e, t) {
  var n = t && t.cache ? t.cache : N;
  var r = t && t.serializer ? t.serializer : _;
  return (t && t.strategy ? t.strategy : P)(e, {
    cache: n,
    serializer: r
  });
}
function w(e, t, n, r) {
  var a;
  var l = (a = r) == null || typeof a == "number" || typeof a == "boolean" ? r : n(r);
  var o = t.get(l);
  if (o === undefined) {
    o = e.call(this, r);
    t.set(l, o);
  }
  return o;
}
function k(e, t, n) {
  var r = Array.prototype.slice.call(arguments, 3);
  var a = n(r);
  var l = t.get(a);
  if (l === undefined) {
    l = e.apply(this, r);
    t.set(a, l);
  }
  return l;
}
function T(e, t, n, r, a) {
  return n.bind(t, e, r, a);
}
function P(e, t) {
  return T(e, this, e.length === 1 ? w : k, t.cache.create(), t.serializer);
}
function _() {
  return JSON.stringify(arguments);
}
var C = function () {
  function e() {
    this.cache = Object.create(null);
  }
  e.prototype.get = function (e) {
    return this.cache[e];
  };
  e.prototype.set = function (e, t) {
    this.cache[e] = t;
  };
  return e;
}();
var N = {
  create: function () {
    return new C();
  }
};
var L = {
  variadic: function (e, t) {
    return T(e, this, k, t.cache.create(), t.serializer);
  }
};
function A(e, t) {
  return (A = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var n in t) {
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        e[n] = t[n];
      }
    }
  })(e, t);
}
function O(e, t) {
  if (typeof t != "function" && t !== null) {
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  }
  function n() {
    this.constructor = e;
  }
  A(e, t);
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function x() {
  x = Object.assign || function (e) {
    var t;
    for (var n = 1, r = arguments.length; n < r; n++) {
      for (var a in t = arguments[n]) {
        if (Object.prototype.hasOwnProperty.call(t, a)) {
          e[a] = t[a];
        }
      }
    }
    return e;
  };
  return x.apply(this, arguments);
}
function R(e, t, n) {
  if (n || arguments.length === 2) {
    var r;
    for (var a = 0, l = t.length; a < l; a++) {
      if (!!r || !(a in t)) {
        r ||= Array.prototype.slice.call(t, 0, a);
        r[a] = t[a];
      }
    }
  }
  return e.concat(r || Array.prototype.slice.call(t));
}
if (typeof SuppressedError == "function") {
  SuppressedError;
}
var I;
var M;
var H;
var D;
var z;
var F;
function B() {
  B = Object.assign || function (e) {
    var t;
    for (var n = 1, r = arguments.length; n < r; n++) {
      for (var a in t = arguments[n]) {
        if (Object.prototype.hasOwnProperty.call(t, a)) {
          e[a] = t[a];
        }
      }
    }
    return e;
  };
  return B.apply(this, arguments);
}
function U(e) {
  return e.type === H.literal;
}
function G(e) {
  return e.type === H.argument;
}
function j(e) {
  return e.type === H.number;
}
function V(e) {
  return e.type === H.date;
}
function $(e) {
  return e.type === H.time;
}
function W(e) {
  return e.type === H.select;
}
function Q(e) {
  return e.type === H.plural;
}
function q(e) {
  return e.type === H.pound;
}
function K(e) {
  return e.type === H.tag;
}
function X(e) {
  return !!e && typeof e == "object" && e.type === z.number;
}
function Y(e) {
  return !!e && typeof e == "object" && e.type === z.dateTime;
}
if (typeof SuppressedError == "function") {
  SuppressedError;
}
(M = I ||= {})[M.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
M[M.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT";
M[M.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT";
M[M.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE";
M[M.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE";
M[M.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE";
M[M.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON";
M[M.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON";
M[M.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON";
M[M.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON";
M[M.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
M[M.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
M[M.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
M[M.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
M[M.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
M[M.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
M[M.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
M[M.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
M[M.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
M[M.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
M[M.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
M[M.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE";
M[M.INVALID_TAG = 23] = "INVALID_TAG";
M[M.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME";
M[M.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG";
M[M.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
(D = H ||= {})[D.literal = 0] = "literal";
D[D.argument = 1] = "argument";
D[D.number = 2] = "number";
D[D.date = 3] = "date";
D[D.time = 4] = "time";
D[D.select = 5] = "select";
D[D.plural = 6] = "plural";
D[D.pound = 7] = "pound";
D[D.tag = 8] = "tag";
(F = z ||= {})[F.number = 0] = "number";
F[F.dateTime = 1] = "dateTime";
var Z = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var J = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function ee(e) {
  var t = {};
  e.replace(J, function (e) {
    var n = e.length;
    switch (e[0]) {
      case "G":
        t.era = n === 4 ? "long" : n === 5 ? "narrow" : "short";
        break;
      case "y":
        t.year = n === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        t.month = ["numeric", "2-digit", "short", "long", "narrow"][n - 1];
        break;
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        t.day = ["numeric", "2-digit"][n - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      case "E":
        t.weekday = n === 4 ? "long" : n === 5 ? "narrow" : "short";
        break;
      case "e":
        if (n < 4) {
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        }
        t.weekday = ["short", "long", "narrow", "short"][n - 4];
        break;
      case "c":
        if (n < 4) {
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        }
        t.weekday = ["short", "long", "narrow", "short"][n - 4];
        break;
      case "a":
        t.hour12 = true;
        break;
      case "b":
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      case "h":
        t.hourCycle = "h12";
        t.hour = ["numeric", "2-digit"][n - 1];
        break;
      case "H":
        t.hourCycle = "h23";
        t.hour = ["numeric", "2-digit"][n - 1];
        break;
      case "K":
        t.hourCycle = "h11";
        t.hour = ["numeric", "2-digit"][n - 1];
        break;
      case "k":
        t.hourCycle = "h24";
        t.hour = ["numeric", "2-digit"][n - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        t.minute = ["numeric", "2-digit"][n - 1];
        break;
      case "s":
        t.second = ["numeric", "2-digit"][n - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      case "z":
        t.timeZoneName = n < 4 ? "short" : "long";
        break;
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  });
  return t;
}
var te = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function ne(e) {
  return e.replace(/^(.*?)-/, "");
}
var re = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var ae = /^(@+)?(\+|#+)?[rs]?$/g;
var le = /(\*)(0+)|(#+)(0+)|(0+)/g;
var oe = /^(0+)$/;
function ie(e) {
  var t = {};
  if (e[e.length - 1] === "r") {
    t.roundingPriority = "morePrecision";
  } else if (e[e.length - 1] === "s") {
    t.roundingPriority = "lessPrecision";
  }
  e.replace(ae, function (e, n, r) {
    if (typeof r != "string") {
      t.minimumSignificantDigits = n.length;
      t.maximumSignificantDigits = n.length;
    } else if (r === "+") {
      t.minimumSignificantDigits = n.length;
    } else if (n[0] === "#") {
      t.maximumSignificantDigits = n.length;
    } else {
      t.minimumSignificantDigits = n.length;
      t.maximumSignificantDigits = n.length + (typeof r == "string" ? r.length : 0);
    }
    return "";
  });
  return t;
}
function ue(e) {
  switch (e) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function se(e) {
  var t;
  if (e[0] === "E" && e[1] === "E") {
    t = {
      notation: "engineering"
    };
    e = e.slice(2);
  } else if (e[0] === "E") {
    t = {
      notation: "scientific"
    };
    e = e.slice(1);
  }
  if (t) {
    var n = e.slice(0, 2);
    if (n === "+!") {
      t.signDisplay = "always";
      e = e.slice(2);
    } else if (n === "+?") {
      t.signDisplay = "exceptZero";
      e = e.slice(2);
    }
    if (!oe.test(e)) {
      throw new Error("Malformed concise eng/scientific notation");
    }
    t.minimumIntegerDigits = e.length;
  }
  return t;
}
function ce(e) {
  var t = ue(e);
  return t || {};
}
function fe(e) {
  var t = {};
  for (var n = 0, r = e; n < r.length; n++) {
    var a = r[n];
    switch (a.stem) {
      case "percent":
      case "%":
        t.style = "percent";
        continue;
      case "%x100":
        t.style = "percent";
        t.scale = 100;
        continue;
      case "currency":
        t.style = "currency";
        t.currency = a.options[0];
        continue;
      case "group-off":
      case ",_":
        t.useGrouping = false;
        continue;
      case "precision-integer":
      case ".":
        t.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        t.style = "unit";
        t.unit = ne(a.options[0]);
        continue;
      case "compact-short":
      case "K":
        t.notation = "compact";
        t.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        t.notation = "compact";
        t.compactDisplay = "long";
        continue;
      case "scientific":
        t = B(B(B({}, t), {
          notation: "scientific"
        }), a.options.reduce(function (e, t) {
          return B(B({}, e), ce(t));
        }, {}));
        continue;
      case "engineering":
        t = B(B(B({}, t), {
          notation: "engineering"
        }), a.options.reduce(function (e, t) {
          return B(B({}, e), ce(t));
        }, {}));
        continue;
      case "notation-simple":
        t.notation = "standard";
        continue;
      case "unit-width-narrow":
        t.currencyDisplay = "narrowSymbol";
        t.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        t.currencyDisplay = "code";
        t.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        t.currencyDisplay = "name";
        t.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        t.currencyDisplay = "symbol";
        continue;
      case "scale":
        t.scale = parseFloat(a.options[0]);
        continue;
      case "rounding-mode-floor":
        t.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        t.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        t.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        t.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        t.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        t.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        t.roundingMode = "halfExpand";
        continue;
      case "integer-width":
        if (a.options.length > 1) {
          throw new RangeError("integer-width stems only accept a single optional option");
        }
        a.options[0].replace(le, function (e, n, r, a, l, o) {
          if (n) {
            t.minimumIntegerDigits = r.length;
          } else {
            if (a && l) {
              throw new Error("We currently do not support maximum integer digits");
            }
            if (o) {
              throw new Error("We currently do not support exact integer digits");
            }
          }
          return "";
        });
        continue;
    }
    if (oe.test(a.stem)) {
      t.minimumIntegerDigits = a.stem.length;
    } else if (re.test(a.stem)) {
      if (a.options.length > 1) {
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      }
      a.stem.replace(re, function (e, n, r, a, l, o) {
        if (r === "*") {
          t.minimumFractionDigits = n.length;
        } else if (a && a[0] === "#") {
          t.maximumFractionDigits = a.length;
        } else if (l && o) {
          t.minimumFractionDigits = l.length;
          t.maximumFractionDigits = l.length + o.length;
        } else {
          t.minimumFractionDigits = n.length;
          t.maximumFractionDigits = n.length;
        }
        return "";
      });
      var l = a.options[0];
      if (l === "w") {
        t = B(B({}, t), {
          trailingZeroDisplay: "stripIfInteger"
        });
      } else if (l) {
        t = B(B({}, t), ie(l));
      }
    } else if (ae.test(a.stem)) {
      t = B(B({}, t), ie(a.stem));
    } else {
      var o = ue(a.stem);
      if (o) {
        t = B(B({}, t), o);
      }
      var i = se(a.stem);
      if (i) {
        t = B(B({}, t), i);
      }
    }
  }
  return t;
}
var he = {
  "001": ["H", "h"],
  419: ["h", "H", "hB", "hb"],
  AC: ["H", "h", "hb", "hB"],
  AD: ["H", "hB"],
  AE: ["h", "hB", "hb", "H"],
  AF: ["H", "hb", "hB", "h"],
  AG: ["h", "hb", "H", "hB"],
  AI: ["H", "h", "hb", "hB"],
  AL: ["h", "H", "hB"],
  AM: ["H", "hB"],
  AO: ["H", "hB"],
  AR: ["h", "H", "hB", "hb"],
  AS: ["h", "H"],
  AT: ["H", "hB"],
  AU: ["h", "hb", "H", "hB"],
  AW: ["H", "hB"],
  AX: ["H"],
  AZ: ["H", "hB", "h"],
  BA: ["H", "hB", "h"],
  BB: ["h", "hb", "H", "hB"],
  BD: ["h", "hB", "H"],
  BE: ["H", "hB"],
  BF: ["H", "hB"],
  BG: ["H", "hB", "h"],
  BH: ["h", "hB", "hb", "H"],
  BI: ["H", "h"],
  BJ: ["H", "hB"],
  BL: ["H", "hB"],
  BM: ["h", "hb", "H", "hB"],
  BN: ["hb", "hB", "h", "H"],
  BO: ["h", "H", "hB", "hb"],
  BQ: ["H"],
  BR: ["H", "hB"],
  BS: ["h", "hb", "H", "hB"],
  BT: ["h", "H"],
  BW: ["H", "h", "hb", "hB"],
  BY: ["H", "h"],
  BZ: ["H", "h", "hb", "hB"],
  CA: ["h", "hb", "H", "hB"],
  CC: ["H", "h", "hb", "hB"],
  CD: ["hB", "H"],
  CF: ["H", "h", "hB"],
  CG: ["H", "hB"],
  CH: ["H", "hB", "h"],
  CI: ["H", "hB"],
  CK: ["H", "h", "hb", "hB"],
  CL: ["h", "H", "hB", "hb"],
  CM: ["H", "h", "hB"],
  CN: ["H", "hB", "hb", "h"],
  CO: ["h", "H", "hB", "hb"],
  CP: ["H"],
  CR: ["h", "H", "hB", "hb"],
  CU: ["h", "H", "hB", "hb"],
  CV: ["H", "hB"],
  CW: ["H", "hB"],
  CX: ["H", "h", "hb", "hB"],
  CY: ["h", "H", "hb", "hB"],
  CZ: ["H"],
  DE: ["H", "hB"],
  DG: ["H", "h", "hb", "hB"],
  DJ: ["h", "H"],
  DK: ["H"],
  DM: ["h", "hb", "H", "hB"],
  DO: ["h", "H", "hB", "hb"],
  DZ: ["h", "hB", "hb", "H"],
  EA: ["H", "h", "hB", "hb"],
  EC: ["h", "H", "hB", "hb"],
  EE: ["H", "hB"],
  EG: ["h", "hB", "hb", "H"],
  EH: ["h", "hB", "hb", "H"],
  ER: ["h", "H"],
  ES: ["H", "hB", "h", "hb"],
  ET: ["hB", "hb", "h", "H"],
  FI: ["H"],
  FJ: ["h", "hb", "H", "hB"],
  FK: ["H", "h", "hb", "hB"],
  FM: ["h", "hb", "H", "hB"],
  FO: ["H", "h"],
  FR: ["H", "hB"],
  GA: ["H", "hB"],
  GB: ["H", "h", "hb", "hB"],
  GD: ["h", "hb", "H", "hB"],
  GE: ["H", "hB", "h"],
  GF: ["H", "hB"],
  GG: ["H", "h", "hb", "hB"],
  GH: ["h", "H"],
  GI: ["H", "h", "hb", "hB"],
  GL: ["H", "h"],
  GM: ["h", "hb", "H", "hB"],
  GN: ["H", "hB"],
  GP: ["H", "hB"],
  GQ: ["H", "hB", "h", "hb"],
  GR: ["h", "H", "hb", "hB"],
  GT: ["h", "H", "hB", "hb"],
  GU: ["h", "hb", "H", "hB"],
  GW: ["H", "hB"],
  GY: ["h", "hb", "H", "hB"],
  HK: ["h", "hB", "hb", "H"],
  HN: ["h", "H", "hB", "hb"],
  HR: ["H", "hB"],
  HU: ["H", "h"],
  IC: ["H", "h", "hB", "hb"],
  ID: ["H"],
  IE: ["H", "h", "hb", "hB"],
  IL: ["H", "hB"],
  IM: ["H", "h", "hb", "hB"],
  IN: ["h", "H"],
  IO: ["H", "h", "hb", "hB"],
  IQ: ["h", "hB", "hb", "H"],
  IR: ["hB", "H"],
  IS: ["H"],
  IT: ["H", "hB"],
  JE: ["H", "h", "hb", "hB"],
  JM: ["h", "hb", "H", "hB"],
  JO: ["h", "hB", "hb", "H"],
  JP: ["H", "K", "h"],
  KE: ["hB", "hb", "H", "h"],
  KG: ["H", "h", "hB", "hb"],
  KH: ["hB", "h", "H", "hb"],
  KI: ["h", "hb", "H", "hB"],
  KM: ["H", "h", "hB", "hb"],
  KN: ["h", "hb", "H", "hB"],
  KP: ["h", "H", "hB", "hb"],
  KR: ["h", "H", "hB", "hb"],
  KW: ["h", "hB", "hb", "H"],
  KY: ["h", "hb", "H", "hB"],
  KZ: ["H", "hB"],
  LA: ["H", "hb", "hB", "h"],
  LB: ["h", "hB", "hb", "H"],
  LC: ["h", "hb", "H", "hB"],
  LI: ["H", "hB", "h"],
  LK: ["H", "h", "hB", "hb"],
  LR: ["h", "hb", "H", "hB"],
  LS: ["h", "H"],
  LT: ["H", "h", "hb", "hB"],
  LU: ["H", "h", "hB"],
  LV: ["H", "hB", "hb", "h"],
  LY: ["h", "hB", "hb", "H"],
  MA: ["H", "h", "hB", "hb"],
  MC: ["H", "hB"],
  MD: ["H", "hB"],
  ME: ["H", "hB", "h"],
  MF: ["H", "hB"],
  MG: ["H", "h"],
  MH: ["h", "hb", "H", "hB"],
  MK: ["H", "h", "hb", "hB"],
  ML: ["H"],
  MM: ["hB", "hb", "H", "h"],
  MN: ["H", "h", "hb", "hB"],
  MO: ["h", "hB", "hb", "H"],
  MP: ["h", "hb", "H", "hB"],
  MQ: ["H", "hB"],
  MR: ["h", "hB", "hb", "H"],
  MS: ["H", "h", "hb", "hB"],
  MT: ["H", "h"],
  MU: ["H", "h"],
  MV: ["H", "h"],
  MW: ["h", "hb", "H", "hB"],
  MX: ["h", "H", "hB", "hb"],
  MY: ["hb", "hB", "h", "H"],
  MZ: ["H", "hB"],
  NA: ["h", "H", "hB", "hb"],
  NC: ["H", "hB"],
  NE: ["H"],
  NF: ["H", "h", "hb", "hB"],
  NG: ["H", "h", "hb", "hB"],
  NI: ["h", "H", "hB", "hb"],
  NL: ["H", "hB"],
  NO: ["H", "h"],
  NP: ["H", "h", "hB"],
  NR: ["H", "h", "hb", "hB"],
  NU: ["H", "h", "hb", "hB"],
  NZ: ["h", "hb", "H", "hB"],
  OM: ["h", "hB", "hb", "H"],
  PA: ["h", "H", "hB", "hb"],
  PE: ["h", "H", "hB", "hb"],
  PF: ["H", "h", "hB"],
  PG: ["h", "H"],
  PH: ["h", "hB", "hb", "H"],
  PK: ["h", "hB", "H"],
  PL: ["H", "h"],
  PM: ["H", "hB"],
  PN: ["H", "h", "hb", "hB"],
  PR: ["h", "H", "hB", "hb"],
  PS: ["h", "hB", "hb", "H"],
  PT: ["H", "hB"],
  PW: ["h", "H"],
  PY: ["h", "H", "hB", "hb"],
  QA: ["h", "hB", "hb", "H"],
  RE: ["H", "hB"],
  RO: ["H", "hB"],
  RS: ["H", "hB", "h"],
  RU: ["H"],
  RW: ["H", "h"],
  SA: ["h", "hB", "hb", "H"],
  SB: ["h", "hb", "H", "hB"],
  SC: ["H", "h", "hB"],
  SD: ["h", "hB", "hb", "H"],
  SE: ["H"],
  SG: ["h", "hb", "H", "hB"],
  SH: ["H", "h", "hb", "hB"],
  SI: ["H", "hB"],
  SJ: ["H"],
  SK: ["H"],
  SL: ["h", "hb", "H", "hB"],
  SM: ["H", "h", "hB"],
  SN: ["H", "h", "hB"],
  SO: ["h", "H"],
  SR: ["H", "hB"],
  SS: ["h", "hb", "H", "hB"],
  ST: ["H", "hB"],
  SV: ["h", "H", "hB", "hb"],
  SX: ["H", "h", "hb", "hB"],
  SY: ["h", "hB", "hb", "H"],
  SZ: ["h", "hb", "H", "hB"],
  TA: ["H", "h", "hb", "hB"],
  TC: ["h", "hb", "H", "hB"],
  TD: ["h", "H", "hB"],
  TF: ["H", "h", "hB"],
  TG: ["H", "hB"],
  TH: ["H", "h"],
  TJ: ["H", "h"],
  TL: ["H", "hB", "hb", "h"],
  TM: ["H", "h"],
  TN: ["h", "hB", "hb", "H"],
  TO: ["h", "H"],
  TR: ["H", "hB"],
  TT: ["h", "hb", "H", "hB"],
  TW: ["hB", "hb", "h", "H"],
  TZ: ["hB", "hb", "H", "h"],
  UA: ["H", "hB", "h"],
  UG: ["hB", "hb", "H", "h"],
  UM: ["h", "hb", "H", "hB"],
  US: ["h", "hb", "H", "hB"],
  UY: ["h", "H", "hB", "hb"],
  UZ: ["H", "hB", "h"],
  VA: ["H", "h", "hB"],
  VC: ["h", "hb", "H", "hB"],
  VE: ["h", "H", "hB", "hb"],
  VG: ["h", "hb", "H", "hB"],
  VI: ["h", "hb", "H", "hB"],
  VN: ["H", "h"],
  VU: ["h", "H"],
  WF: ["H", "hB"],
  WS: ["h", "H"],
  XK: ["H", "hB", "h"],
  YE: ["h", "hB", "hb", "H"],
  YT: ["H", "hB"],
  ZA: ["H", "h", "hb", "hB"],
  ZM: ["h", "hb", "H", "hB"],
  ZW: ["H", "h"],
  "af-ZA": ["H", "h", "hB", "hb"],
  "ar-001": ["h", "hB", "hb", "H"],
  "ca-ES": ["H", "h", "hB"],
  "en-001": ["h", "hb", "H", "hB"],
  "en-HK": ["h", "hb", "H", "hB"],
  "en-IL": ["H", "h", "hb", "hB"],
  "en-MY": ["h", "hb", "H", "hB"],
  "es-BR": ["H", "h", "hB", "hb"],
  "es-ES": ["H", "h", "hB", "hb"],
  "es-GQ": ["H", "h", "hB", "hb"],
  "fr-CA": ["H", "h", "hB"],
  "gl-ES": ["H", "h", "hB"],
  "gu-IN": ["hB", "hb", "h", "H"],
  "hi-IN": ["hB", "h", "H"],
  "it-CH": ["H", "h", "hB"],
  "it-IT": ["H", "h", "hB"],
  "kn-IN": ["hB", "h", "H"],
  "ml-IN": ["hB", "h", "H"],
  "mr-IN": ["hB", "hb", "h", "H"],
  "pa-IN": ["hB", "hb", "h", "H"],
  "ta-IN": ["hB", "h", "hb", "H"],
  "te-IN": ["hB", "h", "H"],
  "zu-ZA": ["H", "hB", "hb", "h"]
};
function pe(e) {
  var t = e.hourCycle;
  if (t === undefined && e.hourCycles && e.hourCycles.length) {
    t = e.hourCycles[0];
  }
  if (t) {
    switch (t) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  }
  var n;
  var r = e.language;
  if (r !== "root") {
    n = e.maximize().region;
  }
  return (he[n || ""] || he[r || ""] || he[`${r}-001`] || he["001"])[0];
}
var me = new RegExp(`^${Z.source}*`);
var ge = new RegExp(`${Z.source}*\$`);
function ye(e, t) {
  return {
    start: e,
    end: t
  };
}
var ve = !!String.prototype.startsWith && "_a".startsWith("a", 1);
var be = !!String.fromCodePoint;
var Se = !!Object.fromEntries;
var Ee = !!String.prototype.codePointAt;
var we = !!String.prototype.trimStart;
var ke = !!String.prototype.trimEnd;
var Te = Number.isSafeInteger ? Number.isSafeInteger : function (e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e && Math.abs(e) <= 9007199254740991;
};
var Pe = true;
try {
  Pe = Re("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu").exec("a")?.[0] === "a";
} catch (On) {
  Pe = false;
}
var _e;
var Ce = ve ? function (e, t, n) {
  return e.startsWith(t, n);
} : function (e, t, n) {
  return e.slice(n, n + t.length) === t;
};
var Ne = be ? String.fromCodePoint : function () {
  var e = [];
  for (var t = 0; t < arguments.length; t++) {
    e[t] = arguments[t];
  }
  var n;
  var r = "";
  for (var a = e.length, l = 0; a > l;) {
    if ((n = e[l++]) > 1114111) {
      throw RangeError(n + " is not a valid code point");
    }
    r += n < 65536 ? String.fromCharCode(n) : String.fromCharCode(55296 + ((n -= 65536) >> 10), n % 1024 + 56320);
  }
  return r;
};
var Le = Se ? Object.fromEntries : function (e) {
  var t = {};
  for (var n = 0, r = e; n < r.length; n++) {
    var a = r[n];
    var l = a[0];
    var o = a[1];
    t[l] = o;
  }
  return t;
};
var Ae = Ee ? function (e, t) {
  return e.codePointAt(t);
} : function (e, t) {
  var n = e.length;
  if (!(t < 0) && !(t >= n)) {
    var r;
    var a = e.charCodeAt(t);
    if (a < 55296 || a > 56319 || t + 1 === n || (r = e.charCodeAt(t + 1)) < 56320 || r > 57343) {
      return a;
    } else {
      return r - 56320 + (a - 55296 << 10) + 65536;
    }
  }
};
var Oe = we ? function (e) {
  return e.trimStart();
} : function (e) {
  return e.replace(me, "");
};
var xe = ke ? function (e) {
  return e.trimEnd();
} : function (e) {
  return e.replace(ge, "");
};
function Re(e, t) {
  return new RegExp(e, t);
}
if (Pe) {
  var Ie = Re("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  _e = function (e, t) {
    Ie.lastIndex = t;
    return Ie.exec(e)[1] ?? "";
  };
} else {
  _e = function (e, t) {
    var n = [];
    for (;;) {
      var r = Ae(e, t);
      if (r === undefined || Be(r) || Ue(r)) {
        break;
      }
      n.push(r);
      t += r >= 65536 ? 2 : 1;
    }
    return Ne.apply(undefined, n);
  };
}
var Me;
var He;
var De = function () {
  function e(e, t = {}) {
    this.message = e;
    this.position = {
      offset: 0,
      line: 1,
      column: 1
    };
    this.ignoreTag = !!t.ignoreTag;
    this.locale = t.locale;
    this.requiresOtherClause = !!t.requiresOtherClause;
    this.shouldParseSkeletons = !!t.shouldParseSkeletons;
  }
  e.prototype.parse = function () {
    if (this.offset() !== 0) {
      throw Error("parser can only be used once");
    }
    return this.parseMessage(0, "", false);
  };
  e.prototype.parseMessage = function (e, t, n) {
    var r = [];
    for (; !this.isEOF();) {
      var a = this.char();
      if (a === 123) {
        if ((l = this.parseArgument(e, n)).err) {
          return l;
        }
        r.push(l.val);
      } else {
        if (a === 125 && e > 0) {
          break;
        }
        if (a !== 35 || t !== "plural" && t !== "selectordinal") {
          if (a === 60 && !this.ignoreTag && this.peek() === 47) {
            if (n) {
              break;
            }
            return this.error(I.UNMATCHED_CLOSING_TAG, ye(this.clonePosition(), this.clonePosition()));
          }
          if (a === 60 && !this.ignoreTag && ze(this.peek() || 0)) {
            if ((l = this.parseTag(e, t)).err) {
              return l;
            }
            r.push(l.val);
          } else {
            var l;
            if ((l = this.parseLiteral(e, t)).err) {
              return l;
            }
            r.push(l.val);
          }
        } else {
          var o = this.clonePosition();
          this.bump();
          r.push({
            type: H.pound,
            location: ye(o, this.clonePosition())
          });
        }
      }
    }
    return {
      val: r,
      err: null
    };
  };
  e.prototype.parseTag = function (e, t) {
    var n = this.clonePosition();
    this.bump();
    var r = this.parseTagName();
    this.bumpSpace();
    if (this.bumpIf("/>")) {
      return {
        val: {
          type: H.literal,
          value: `<${r}/>`,
          location: ye(n, this.clonePosition())
        },
        err: null
      };
    }
    if (this.bumpIf(">")) {
      var a = this.parseMessage(e + 1, t, true);
      if (a.err) {
        return a;
      }
      var l = a.val;
      var o = this.clonePosition();
      if (this.bumpIf("</")) {
        if (this.isEOF() || !ze(this.char())) {
          return this.error(I.INVALID_TAG, ye(o, this.clonePosition()));
        }
        var i = this.clonePosition();
        if (r !== this.parseTagName()) {
          return this.error(I.UNMATCHED_CLOSING_TAG, ye(i, this.clonePosition()));
        } else {
          this.bumpSpace();
          if (this.bumpIf(">")) {
            return {
              val: {
                type: H.tag,
                value: r,
                children: l,
                location: ye(n, this.clonePosition())
              },
              err: null
            };
          } else {
            return this.error(I.INVALID_TAG, ye(o, this.clonePosition()));
          }
        }
      }
      return this.error(I.UNCLOSED_TAG, ye(n, this.clonePosition()));
    }
    return this.error(I.INVALID_TAG, ye(n, this.clonePosition()));
  };
  e.prototype.parseTagName = function () {
    var e = this.offset();
    for (this.bump(); !this.isEOF() && Fe(this.char());) {
      this.bump();
    }
    return this.message.slice(e, this.offset());
  };
  e.prototype.parseLiteral = function (e, t) {
    var n = this.clonePosition();
    var r = "";
    while (true) {
      var a = this.tryParseQuote(t);
      if (a) {
        r += a;
      } else {
        var l = this.tryParseUnquoted(e, t);
        if (l) {
          r += l;
        } else {
          var o = this.tryParseLeftAngleBracket();
          if (!o) {
            break;
          }
          r += o;
        }
      }
    }
    var i = ye(n, this.clonePosition());
    return {
      val: {
        type: H.literal,
        value: r,
        location: i
      },
      err: null
    };
  };
  e.prototype.tryParseLeftAngleBracket = function () {
    if (this.isEOF() || this.char() !== 60 || !this.ignoreTag && (ze(e = this.peek() || 0) || e === 47)) {
      return null;
    } else {
      this.bump();
      return "<";
    }
    var e;
  };
  e.prototype.tryParseQuote = function (e) {
    if (this.isEOF() || this.char() !== 39) {
      return null;
    }
    switch (this.peek()) {
      case 39:
        this.bump();
        this.bump();
        return "'";
      case 123:
      case 60:
      case 62:
      case 125:
        break;
      case 35:
        if (e === "plural" || e === "selectordinal") {
          break;
        }
        return null;
      default:
        return null;
    }
    this.bump();
    var t = [this.char()];
    for (this.bump(); !this.isEOF();) {
      var n = this.char();
      if (n === 39) {
        if (this.peek() !== 39) {
          this.bump();
          break;
        }
        t.push(39);
        this.bump();
      } else {
        t.push(n);
      }
      this.bump();
    }
    return Ne.apply(undefined, t);
  };
  e.prototype.tryParseUnquoted = function (e, t) {
    if (this.isEOF()) {
      return null;
    }
    var n = this.char();
    if (n === 60 || n === 123 || n === 35 && (t === "plural" || t === "selectordinal") || n === 125 && e > 0) {
      return null;
    } else {
      this.bump();
      return Ne(n);
    }
  };
  e.prototype.parseArgument = function (e, t) {
    var n = this.clonePosition();
    this.bump();
    this.bumpSpace();
    if (this.isEOF()) {
      return this.error(I.EXPECT_ARGUMENT_CLOSING_BRACE, ye(n, this.clonePosition()));
    }
    if (this.char() === 125) {
      this.bump();
      return this.error(I.EMPTY_ARGUMENT, ye(n, this.clonePosition()));
    }
    var r = this.parseIdentifierIfPossible().value;
    if (!r) {
      return this.error(I.MALFORMED_ARGUMENT, ye(n, this.clonePosition()));
    }
    this.bumpSpace();
    if (this.isEOF()) {
      return this.error(I.EXPECT_ARGUMENT_CLOSING_BRACE, ye(n, this.clonePosition()));
    }
    switch (this.char()) {
      case 125:
        this.bump();
        return {
          val: {
            type: H.argument,
            value: r,
            location: ye(n, this.clonePosition())
          },
          err: null
        };
      case 44:
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(I.EXPECT_ARGUMENT_CLOSING_BRACE, ye(n, this.clonePosition()));
        } else {
          return this.parseArgumentOptions(e, t, r, n);
        }
      default:
        return this.error(I.MALFORMED_ARGUMENT, ye(n, this.clonePosition()));
    }
  };
  e.prototype.parseIdentifierIfPossible = function () {
    var e = this.clonePosition();
    var t = this.offset();
    var n = _e(this.message, t);
    var r = t + n.length;
    this.bumpTo(r);
    return {
      value: n,
      location: ye(e, this.clonePosition())
    };
  };
  e.prototype.parseArgumentOptions = function (e, t, n, r) {
    var l = this.clonePosition();
    var o = this.parseIdentifierIfPossible().value;
    var i = this.clonePosition();
    switch (o) {
      case "":
        return this.error(I.EXPECT_ARGUMENT_TYPE, ye(l, i));
      case "number":
      case "date":
      case "time":
        this.bumpSpace();
        var u = null;
        if (this.bumpIf(",")) {
          this.bumpSpace();
          var s = this.clonePosition();
          if ((y = this.parseSimpleArgStyleIfPossible()).err) {
            return y;
          }
          if ((h = xe(y.val)).length === 0) {
            return this.error(I.EXPECT_ARGUMENT_STYLE, ye(this.clonePosition(), this.clonePosition()));
          }
          u = {
            style: h,
            styleLocation: ye(s, this.clonePosition())
          };
        }
        if ((v = this.tryParseArgumentClose(r)).err) {
          return v;
        }
        var c = ye(r, this.clonePosition());
        if (u && Ce(u == null ? undefined : u.style, "::", 0)) {
          var f = Oe(u.style.slice(2));
          if (o === "number") {
            if ((y = this.parseNumberSkeletonFromString(f, u.styleLocation)).err) {
              return y;
            } else {
              return {
                val: {
                  type: H.number,
                  value: n,
                  location: c,
                  style: y.val
                },
                err: null
              };
            }
          }
          if (f.length === 0) {
            return this.error(I.EXPECT_DATE_TIME_SKELETON, c);
          }
          var d = f;
          if (this.locale) {
            d = function (e, t) {
              var n = "";
              for (var r = 0; r < e.length; r++) {
                var a = e.charAt(r);
                if (a === "j") {
                  var l = 0;
                  while (r + 1 < e.length && e.charAt(r + 1) === a) {
                    l++;
                    r++;
                  }
                  var o = 1 + (l & 1);
                  var i = l < 2 ? 1 : 3 + (l >> 1);
                  var u = pe(t);
                  for (u != "H" && u != "k" || (i = 0); i-- > 0;) {
                    n += "a";
                  }
                  while (o-- > 0) {
                    n = u + n;
                  }
                } else {
                  n += a === "J" ? "H" : a;
                }
              }
              return n;
            }(f, this.locale);
          }
          var h = {
            type: z.dateTime,
            pattern: d,
            location: u.styleLocation,
            parsedOptions: this.shouldParseSkeletons ? ee(d) : {}
          };
          return {
            val: {
              type: o === "date" ? H.date : H.time,
              value: n,
              location: c,
              style: h
            },
            err: null
          };
        }
        return {
          val: {
            type: o === "number" ? H.number : o === "date" ? H.date : H.time,
            value: n,
            location: c,
            style: (u == null ? undefined : u.style) ?? null
          },
          err: null
        };
      case "plural":
      case "selectordinal":
      case "select":
        var p = this.clonePosition();
        this.bumpSpace();
        if (!this.bumpIf(",")) {
          return this.error(I.EXPECT_SELECT_ARGUMENT_OPTIONS, ye(p, B({}, p)));
        }
        this.bumpSpace();
        var m = this.parseIdentifierIfPossible();
        var g = 0;
        if (o !== "select" && m.value === "offset") {
          if (!this.bumpIf(":")) {
            return this.error(I.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ye(this.clonePosition(), this.clonePosition()));
          }
          var y;
          this.bumpSpace();
          if ((y = this.tryParseDecimalInteger(I.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, I.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err) {
            return y;
          }
          this.bumpSpace();
          m = this.parseIdentifierIfPossible();
          g = y.val;
        }
        var v;
        var b = this.tryParsePluralOrSelectOptions(e, o, t, m);
        if (b.err) {
          return b;
        }
        if ((v = this.tryParseArgumentClose(r)).err) {
          return v;
        }
        var S = ye(r, this.clonePosition());
        if (o === "select") {
          return {
            val: {
              type: H.select,
              value: n,
              options: Le(b.val),
              location: S
            },
            err: null
          };
        } else {
          return {
            val: {
              type: H.plural,
              value: n,
              options: Le(b.val),
              offset: g,
              pluralType: o === "plural" ? "cardinal" : "ordinal",
              location: S
            },
            err: null
          };
        }
      default:
        return this.error(I.INVALID_ARGUMENT_TYPE, ye(l, i));
    }
  };
  e.prototype.tryParseArgumentClose = function (e) {
    if (this.isEOF() || this.char() !== 125) {
      return this.error(I.EXPECT_ARGUMENT_CLOSING_BRACE, ye(e, this.clonePosition()));
    } else {
      this.bump();
      return {
        val: true,
        err: null
      };
    }
  };
  e.prototype.parseSimpleArgStyleIfPossible = function () {
    var e = 0;
    var t = this.clonePosition();
    for (; !this.isEOF();) {
      switch (this.char()) {
        case 39:
          this.bump();
          var n = this.clonePosition();
          if (!this.bumpUntil("'")) {
            return this.error(I.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, ye(n, this.clonePosition()));
          }
          this.bump();
          break;
        case 123:
          e += 1;
          this.bump();
          break;
        case 125:
          if (!(e > 0)) {
            return {
              val: this.message.slice(t.offset, this.offset()),
              err: null
            };
          }
          e -= 1;
          break;
        default:
          this.bump();
      }
    }
    return {
      val: this.message.slice(t.offset, this.offset()),
      err: null
    };
  };
  e.prototype.parseNumberSkeletonFromString = function (e, t) {
    var n = [];
    try {
      n = function (e) {
        if (e.length === 0) {
          throw new Error("Number skeleton cannot be empty");
        }
        var t = [];
        for (var n = 0, r = e.split(te).filter(function (e) {
            return e.length > 0;
          }); n < r.length; n++) {
          var a = r[n].split("/");
          if (a.length === 0) {
            throw new Error("Invalid number skeleton");
          }
          var l = a[0];
          var o = a.slice(1);
          for (var i = 0, u = o; i < u.length; i++) {
            if (u[i].length === 0) {
              throw new Error("Invalid number skeleton");
            }
          }
          t.push({
            stem: l,
            options: o
          });
        }
        return t;
      }(e);
    } catch (r) {
      return this.error(I.INVALID_NUMBER_SKELETON, t);
    }
    return {
      val: {
        type: z.number,
        tokens: n,
        location: t,
        parsedOptions: this.shouldParseSkeletons ? fe(n) : {}
      },
      err: null
    };
  };
  e.prototype.tryParsePluralOrSelectOptions = function (e, t, n, r) {
    var a;
    var l = false;
    var o = [];
    var i = new Set();
    var u = r.value;
    var s = r.location;
    while (true) {
      if (u.length === 0) {
        var c = this.clonePosition();
        if (t === "select" || !this.bumpIf("=")) {
          break;
        }
        var f = this.tryParseDecimalInteger(I.EXPECT_PLURAL_ARGUMENT_SELECTOR, I.INVALID_PLURAL_ARGUMENT_SELECTOR);
        if (f.err) {
          return f;
        }
        s = ye(c, this.clonePosition());
        u = this.message.slice(c.offset, this.offset());
      }
      if (i.has(u)) {
        return this.error(t === "select" ? I.DUPLICATE_SELECT_ARGUMENT_SELECTOR : I.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, s);
      }
      if (u === "other") {
        l = true;
      }
      this.bumpSpace();
      var d = this.clonePosition();
      if (!this.bumpIf("{")) {
        return this.error(t === "select" ? I.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : I.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, ye(this.clonePosition(), this.clonePosition()));
      }
      var h = this.parseMessage(e + 1, t, n);
      if (h.err) {
        return h;
      }
      var p = this.tryParseArgumentClose(d);
      if (p.err) {
        return p;
      }
      o.push([u, {
        value: h.val,
        location: ye(d, this.clonePosition())
      }]);
      i.add(u);
      this.bumpSpace();
      u = (a = this.parseIdentifierIfPossible()).value;
      s = a.location;
    }
    if (o.length === 0) {
      return this.error(t === "select" ? I.EXPECT_SELECT_ARGUMENT_SELECTOR : I.EXPECT_PLURAL_ARGUMENT_SELECTOR, ye(this.clonePosition(), this.clonePosition()));
    } else if (this.requiresOtherClause && !l) {
      return this.error(I.MISSING_OTHER_CLAUSE, ye(this.clonePosition(), this.clonePosition()));
    } else {
      return {
        val: o,
        err: null
      };
    }
  };
  e.prototype.tryParseDecimalInteger = function (e, t) {
    var n = 1;
    var r = this.clonePosition();
    if (!this.bumpIf("+")) {
      if (this.bumpIf("-")) {
        n = -1;
      }
    }
    var a = false;
    var l = 0;
    for (; !this.isEOF();) {
      var o = this.char();
      if (!(o >= 48) || !(o <= 57)) {
        break;
      }
      a = true;
      l = l * 10 + (o - 48);
      this.bump();
    }
    var i = ye(r, this.clonePosition());
    if (a) {
      if (Te(l *= n)) {
        return {
          val: l,
          err: null
        };
      } else {
        return this.error(t, i);
      }
    } else {
      return this.error(e, i);
    }
  };
  e.prototype.offset = function () {
    return this.position.offset;
  };
  e.prototype.isEOF = function () {
    return this.offset() === this.message.length;
  };
  e.prototype.clonePosition = function () {
    return {
      offset: this.position.offset,
      line: this.position.line,
      column: this.position.column
    };
  };
  e.prototype.char = function () {
    var e = this.position.offset;
    if (e >= this.message.length) {
      throw Error("out of bound");
    }
    var t = Ae(this.message, e);
    if (t === undefined) {
      throw Error(`Offset ${e} is at invalid UTF-16 code unit boundary`);
    }
    return t;
  };
  e.prototype.error = function (e, t) {
    return {
      val: null,
      err: {
        kind: e,
        message: this.message,
        location: t
      }
    };
  };
  e.prototype.bump = function () {
    if (!this.isEOF()) {
      var e = this.char();
      if (e === 10) {
        this.position.line += 1;
        this.position.column = 1;
        this.position.offset += 1;
      } else {
        this.position.column += 1;
        this.position.offset += e < 65536 ? 1 : 2;
      }
    }
  };
  e.prototype.bumpIf = function (e) {
    if (Ce(this.message, e, this.offset())) {
      for (var t = 0; t < e.length; t++) {
        this.bump();
      }
      return true;
    }
    return false;
  };
  e.prototype.bumpUntil = function (e) {
    var t = this.offset();
    var n = this.message.indexOf(e, t);
    if (n >= 0) {
      this.bumpTo(n);
      return true;
    } else {
      this.bumpTo(this.message.length);
      return false;
    }
  };
  e.prototype.bumpTo = function (e) {
    if (this.offset() > e) {
      throw Error(`targetOffset ${e} must be greater than or equal to the current offset ${this.offset()}`);
    }
    for (e = Math.min(e, this.message.length);;) {
      var t = this.offset();
      if (t === e) {
        break;
      }
      if (t > e) {
        throw Error(`targetOffset ${e} is at invalid UTF-16 code unit boundary`);
      }
      this.bump();
      if (this.isEOF()) {
        break;
      }
    }
  };
  e.prototype.bumpSpace = function () {
    while (!this.isEOF() && Be(this.char())) {
      this.bump();
    }
  };
  e.prototype.peek = function () {
    if (this.isEOF()) {
      return null;
    }
    var e = this.char();
    var t = this.offset();
    var n = this.message.charCodeAt(t + (e >= 65536 ? 2 : 1));
    return n ?? null;
  };
  return e;
}();
function ze(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function Fe(e) {
  return e === 45 || e === 46 || e >= 48 && e <= 57 || e === 95 || e >= 97 && e <= 122 || e >= 65 && e <= 90 || e == 183 || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039;
}
function Be(e) {
  return e >= 9 && e <= 13 || e === 32 || e === 133 || e >= 8206 && e <= 8207 || e === 8232 || e === 8233;
}
function Ue(e) {
  return e >= 33 && e <= 35 || e === 36 || e >= 37 && e <= 39 || e === 40 || e === 41 || e === 42 || e === 43 || e === 44 || e === 45 || e >= 46 && e <= 47 || e >= 58 && e <= 59 || e >= 60 && e <= 62 || e >= 63 && e <= 64 || e === 91 || e === 92 || e === 93 || e === 94 || e === 96 || e === 123 || e === 124 || e === 125 || e === 126 || e === 161 || e >= 162 && e <= 165 || e === 166 || e === 167 || e === 169 || e === 171 || e === 172 || e === 174 || e === 176 || e === 177 || e === 182 || e === 187 || e === 191 || e === 215 || e === 247 || e >= 8208 && e <= 8213 || e >= 8214 && e <= 8215 || e === 8216 || e === 8217 || e === 8218 || e >= 8219 && e <= 8220 || e === 8221 || e === 8222 || e === 8223 || e >= 8224 && e <= 8231 || e >= 8240 && e <= 8248 || e === 8249 || e === 8250 || e >= 8251 && e <= 8254 || e >= 8257 && e <= 8259 || e === 8260 || e === 8261 || e === 8262 || e >= 8263 && e <= 8273 || e === 8274 || e === 8275 || e >= 8277 && e <= 8286 || e >= 8592 && e <= 8596 || e >= 8597 && e <= 8601 || e >= 8602 && e <= 8603 || e >= 8604 && e <= 8607 || e === 8608 || e >= 8609 && e <= 8610 || e === 8611 || e >= 8612 && e <= 8613 || e === 8614 || e >= 8615 && e <= 8621 || e === 8622 || e >= 8623 && e <= 8653 || e >= 8654 && e <= 8655 || e >= 8656 && e <= 8657 || e === 8658 || e === 8659 || e === 8660 || e >= 8661 && e <= 8691 || e >= 8692 && e <= 8959 || e >= 8960 && e <= 8967 || e === 8968 || e === 8969 || e === 8970 || e === 8971 || e >= 8972 && e <= 8991 || e >= 8992 && e <= 8993 || e >= 8994 && e <= 9000 || e === 9001 || e === 9002 || e >= 9003 && e <= 9083 || e === 9084 || e >= 9085 && e <= 9114 || e >= 9115 && e <= 9139 || e >= 9140 && e <= 9179 || e >= 9180 && e <= 9185 || e >= 9186 && e <= 9254 || e >= 9255 && e <= 9279 || e >= 9280 && e <= 9290 || e >= 9291 && e <= 9311 || e >= 9472 && e <= 9654 || e === 9655 || e >= 9656 && e <= 9664 || e === 9665 || e >= 9666 && e <= 9719 || e >= 9720 && e <= 9727 || e >= 9728 && e <= 9838 || e === 9839 || e >= 9840 && e <= 10087 || e === 10088 || e === 10089 || e === 10090 || e === 10091 || e === 10092 || e === 10093 || e === 10094 || e === 10095 || e === 10096 || e === 10097 || e === 10098 || e === 10099 || e === 10100 || e === 10101 || e >= 10132 && e <= 10175 || e >= 10176 && e <= 10180 || e === 10181 || e === 10182 || e >= 10183 && e <= 10213 || e === 10214 || e === 10215 || e === 10216 || e === 10217 || e === 10218 || e === 10219 || e === 10220 || e === 10221 || e === 10222 || e === 10223 || e >= 10224 && e <= 10239 || e >= 10240 && e <= 10495 || e >= 10496 && e <= 10626 || e === 10627 || e === 10628 || e === 10629 || e === 10630 || e === 10631 || e === 10632 || e === 10633 || e === 10634 || e === 10635 || e === 10636 || e === 10637 || e === 10638 || e === 10639 || e === 10640 || e === 10641 || e === 10642 || e === 10643 || e === 10644 || e === 10645 || e === 10646 || e === 10647 || e === 10648 || e >= 10649 && e <= 10711 || e === 10712 || e === 10713 || e === 10714 || e === 10715 || e >= 10716 && e <= 10747 || e === 10748 || e === 10749 || e >= 10750 && e <= 11007 || e >= 11008 && e <= 11055 || e >= 11056 && e <= 11076 || e >= 11077 && e <= 11078 || e >= 11079 && e <= 11084 || e >= 11085 && e <= 11123 || e >= 11124 && e <= 11125 || e >= 11126 && e <= 11157 || e === 11158 || e >= 11159 && e <= 11263 || e >= 11776 && e <= 11777 || e === 11778 || e === 11779 || e === 11780 || e === 11781 || e >= 11782 && e <= 11784 || e === 11785 || e === 11786 || e === 11787 || e === 11788 || e === 11789 || e >= 11790 && e <= 11798 || e === 11799 || e >= 11800 && e <= 11801 || e === 11802 || e === 11803 || e === 11804 || e === 11805 || e >= 11806 && e <= 11807 || e === 11808 || e === 11809 || e === 11810 || e === 11811 || e === 11812 || e === 11813 || e === 11814 || e === 11815 || e === 11816 || e === 11817 || e >= 11818 && e <= 11822 || e === 11823 || e >= 11824 && e <= 11833 || e >= 11834 && e <= 11835 || e >= 11836 && e <= 11839 || e === 11840 || e === 11841 || e === 11842 || e >= 11843 && e <= 11855 || e >= 11856 && e <= 11857 || e === 11858 || e >= 11859 && e <= 11903 || e >= 12289 && e <= 12291 || e === 12296 || e === 12297 || e === 12298 || e === 12299 || e === 12300 || e === 12301 || e === 12302 || e === 12303 || e === 12304 || e === 12305 || e >= 12306 && e <= 12307 || e === 12308 || e === 12309 || e === 12310 || e === 12311 || e === 12312 || e === 12313 || e === 12314 || e === 12315 || e === 12316 || e === 12317 || e >= 12318 && e <= 12319 || e === 12320 || e === 12336 || e === 64830 || e === 64831 || e >= 65093 && e <= 65094;
}
function Ge(e) {
  e.forEach(function (e) {
    delete e.location;
    if (W(e) || Q(e)) {
      for (var t in e.options) {
        delete e.options[t].location;
        Ge(e.options[t].value);
      }
    } else if (j(e) && X(e.style) || (V(e) || $(e)) && Y(e.style)) {
      delete e.style.location;
    } else if (K(e)) {
      Ge(e.children);
    }
  });
}
function je(e, t = {}) {
  t = B({
    shouldParseSkeletons: true,
    requiresOtherClause: true
  }, t);
  var n = new De(e, t).parse();
  if (n.err) {
    var r = SyntaxError(I[n.err.kind]);
    r.location = n.err.location;
    r.originalMessage = n.err.message;
    throw r;
  }
  if (!(t == null ? undefined : t.captureLocation)) {
    Ge(n.val);
  }
  return n.val;
}
(He = Me ||= {}).MISSING_VALUE = "MISSING_VALUE";
He.INVALID_VALUE = "INVALID_VALUE";
He.MISSING_INTL_API = "MISSING_INTL_API";
var Ve;
var $e;
var We = function (e) {
  function t(t, n, r) {
    var a = e.call(this, t) || this;
    a.code = n;
    a.originalMessage = r;
    return a;
  }
  O(t, e);
  t.prototype.toString = function () {
    return `[formatjs Error: ${this.code}] ${this.message}`;
  };
  return t;
}(Error);
var Qe = function (e) {
  function t(t, n, r, a) {
    return e.call(this, `Invalid values for "${t}": "${n}". Options are "${Object.keys(r).join("\", \"")}"`, Me.INVALID_VALUE, a) || this;
  }
  O(t, e);
  return t;
}(We);
var qe = function (e) {
  function t(t, n, r) {
    return e.call(this, `Value for "${t}" must be of type ${n}`, Me.INVALID_VALUE, r) || this;
  }
  O(t, e);
  return t;
}(We);
var Ke = function (e) {
  function t(t, n) {
    return e.call(this, `The intl string context variable "${t}" was not provided to the string "${n}"`, Me.MISSING_VALUE, n) || this;
  }
  O(t, e);
  return t;
}(We);
function Xe(e) {
  return typeof e == "function";
}
function Ye(e, t, n, r, a, l, o) {
  if (e.length === 1 && U(e[0])) {
    return [{
      type: Ve.literal,
      value: e[0].value
    }];
  }
  var i = [];
  for (var u = 0, s = e; u < s.length; u++) {
    var c = s[u];
    if (U(c)) {
      i.push({
        type: Ve.literal,
        value: c.value
      });
    } else if (q(c)) {
      if (typeof l == "number") {
        i.push({
          type: Ve.literal,
          value: n.getNumberFormat(t).format(l)
        });
      }
    } else {
      var f = c.value;
      if (!a || !(f in a)) {
        throw new Ke(f, o);
      }
      var d = a[f];
      if (G(c)) {
        if (!d || typeof d == "string" || typeof d == "number") {
          d = typeof d == "string" || typeof d == "number" ? String(d) : "";
        }
        i.push({
          type: typeof d == "string" ? Ve.literal : Ve.object,
          value: d
        });
      } else if (V(c)) {
        var h = typeof c.style == "string" ? r.date[c.style] : Y(c.style) ? c.style.parsedOptions : undefined;
        i.push({
          type: Ve.literal,
          value: n.getDateTimeFormat(t, h).format(d)
        });
      } else if ($(c)) {
        h = typeof c.style == "string" ? r.time[c.style] : Y(c.style) ? c.style.parsedOptions : r.time.medium;
        i.push({
          type: Ve.literal,
          value: n.getDateTimeFormat(t, h).format(d)
        });
      } else if (j(c)) {
        if ((h = typeof c.style == "string" ? r.number[c.style] : X(c.style) ? c.style.parsedOptions : undefined) && h.scale) {
          d *= h.scale || 1;
        }
        i.push({
          type: Ve.literal,
          value: n.getNumberFormat(t, h).format(d)
        });
      } else {
        if (K(c)) {
          var p = c.children;
          var m = c.value;
          var g = a[m];
          if (!Xe(g)) {
            throw new qe(m, "function", o);
          }
          var y = g(Ye(p, t, n, r, a, l).map(function (e) {
            return e.value;
          }));
          if (!Array.isArray(y)) {
            y = [y];
          }
          i.push.apply(i, y.map(function (e) {
            return {
              type: typeof e == "string" ? Ve.literal : Ve.object,
              value: e
            };
          }));
        }
        if (W(c)) {
          if (!(v = c.options[d] || c.options.other)) {
            throw new Qe(c.value, d, Object.keys(c.options), o);
          }
          i.push.apply(i, Ye(v.value, t, n, r, a));
        } else if (Q(c)) {
          var v;
          if (!(v = c.options[`=${d}`])) {
            if (!Intl.PluralRules) {
              throw new We("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", Me.MISSING_INTL_API, o);
            }
            var b = n.getPluralRules(t, {
              type: c.pluralType
            }).select(d - (c.offset || 0));
            v = c.options[b] || c.options.other;
          }
          if (!v) {
            throw new Qe(c.value, d, Object.keys(c.options), o);
          }
          i.push.apply(i, Ye(v.value, t, n, r, a, d - (c.offset || 0)));
        } else {
          ;
        }
      }
    }
  }
  return function (e) {
    if (e.length < 2) {
      return e;
    } else {
      return e.reduce(function (e, t) {
        var n = e[e.length - 1];
        if (n && n.type === Ve.literal && t.type === Ve.literal) {
          n.value += t.value;
        } else {
          e.push(t);
        }
        return e;
      }, []);
    }
  }(i);
}
function Ze(e, t) {
  if (t) {
    return Object.keys(e).reduce(function (n, r) {
      var a;
      var l;
      a = e[r];
      n[r] = (l = t[r]) ? x(x(x({}, a || {}), l || {}), Object.keys(a).reduce(function (e, t) {
        e[t] = x(x({}, a[t]), l[t] || {});
        return e;
      }, {})) : a;
      return n;
    }, x({}, e));
  } else {
    return e;
  }
}
function Je(e) {
  return {
    create: function () {
      return {
        get: function (t) {
          return e[t];
        },
        set: function (t, n) {
          e[t] = n;
        }
      };
    }
  };
}
($e = Ve ||= {})[$e.literal = 0] = "literal";
$e[$e.object = 1] = "object";
var et;
var tt;
var nt;
var rt;
var at = function () {
  function e(t, n = e.defaultLocale, r, a) {
    var l;
    var o = this;
    this.formatterCache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };
    this.format = function (e) {
      var t = o.formatToParts(e);
      if (t.length === 1) {
        return t[0].value;
      }
      var n = t.reduce(function (e, t) {
        if (e.length && t.type === Ve.literal && typeof e[e.length - 1] == "string") {
          e[e.length - 1] += t.value;
        } else {
          e.push(t.value);
        }
        return e;
      }, []);
      if (n.length <= 1) {
        return n[0] || "";
      } else {
        return n;
      }
    };
    this.formatToParts = function (e) {
      return Ye(o.ast, o.locales, o.formatters, o.formats, e, undefined, o.message);
    };
    this.resolvedOptions = function () {
      var e;
      return {
        locale: ((e = o.resolvedLocale) === null || e === undefined ? undefined : e.toString()) || Intl.NumberFormat.supportedLocalesOf(o.locales)[0]
      };
    };
    this.getAst = function () {
      return o.ast;
    };
    this.locales = n;
    this.resolvedLocale = e.resolveLocale(n);
    if (typeof t == "string") {
      this.message = t;
      if (!e.__parse) {
        throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
      }
      var i = a || {};
      i.formatters;
      var u = function (e, t) {
        var n = {};
        for (var r in e) {
          if (Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0) {
            n[r] = e[r];
          }
        }
        if (e != null && typeof Object.getOwnPropertySymbols == "function") {
          var a = 0;
          for (r = Object.getOwnPropertySymbols(e); a < r.length; a++) {
            if (t.indexOf(r[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[a])) {
              n[r[a]] = e[r[a]];
            }
          }
        }
        return n;
      }(i, ["formatters"]);
      this.ast = e.__parse(t, x(x({}, u), {
        locale: this.resolvedLocale
      }));
    } else {
      this.ast = t;
    }
    if (!Array.isArray(this.ast)) {
      throw new TypeError("A message must be provided as a String or AST.");
    }
    this.formats = Ze(e.formats, r);
    this.formatters = a && a.formatters || ((l = this.formatterCache) === undefined && (l = {
      number: {},
      dateTime: {},
      pluralRules: {}
    }), {
      getNumberFormat: E(function () {
        var e;
        var t = [];
        for (var n = 0; n < arguments.length; n++) {
          t[n] = arguments[n];
        }
        return new ((e = Intl.NumberFormat).bind.apply(e, R([undefined], t, false)))();
      }, {
        cache: Je(l.number),
        strategy: L.variadic
      }),
      getDateTimeFormat: E(function () {
        var e;
        var t = [];
        for (var n = 0; n < arguments.length; n++) {
          t[n] = arguments[n];
        }
        return new ((e = Intl.DateTimeFormat).bind.apply(e, R([undefined], t, false)))();
      }, {
        cache: Je(l.dateTime),
        strategy: L.variadic
      }),
      getPluralRules: E(function () {
        var e;
        var t = [];
        for (var n = 0; n < arguments.length; n++) {
          t[n] = arguments[n];
        }
        return new ((e = Intl.PluralRules).bind.apply(e, R([undefined], t, false)))();
      }, {
        cache: Je(l.pluralRules),
        strategy: L.variadic
      })
    });
  }
  Object.defineProperty(e, "defaultLocale", {
    get: function () {
      e.memoizedDefaultLocale ||= new Intl.NumberFormat().resolvedOptions().locale;
      return e.memoizedDefaultLocale;
    },
    enumerable: false,
    configurable: true
  });
  e.memoizedDefaultLocale = null;
  e.resolveLocale = function (e) {
    if (Intl.Locale !== undefined) {
      var t = Intl.NumberFormat.supportedLocalesOf(e);
      if (t.length > 0) {
        return new Intl.Locale(t[0]);
      } else {
        return new Intl.Locale(typeof e == "string" ? e : e[0]);
      }
    }
  };
  e.__parse = je;
  e.formats = {
    number: {
      integer: {
        maximumFractionDigits: 0
      },
      currency: {
        style: "currency"
      },
      percent: {
        style: "percent"
      }
    },
    date: {
      short: {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
      },
      medium: {
        month: "short",
        day: "numeric",
        year: "numeric"
      },
      long: {
        month: "long",
        day: "numeric",
        year: "numeric"
      },
      full: {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    },
    time: {
      short: {
        hour: "numeric",
        minute: "numeric"
      },
      medium: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      },
      long: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      },
      full: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      }
    }
  };
  return e;
}();
var lt = {
  exports: {}
};
var ot = {};
function it() {
  if (!tt) {
    tt = 1;
    lt.exports = function () {
      if (et) {
        return ot;
      }
      et = 1;
      var e = typeof Symbol == "function" && Symbol.for;
      var t = e ? Symbol.for("react.element") : 60103;
      var n = e ? Symbol.for("react.portal") : 60106;
      var r = e ? Symbol.for("react.fragment") : 60107;
      var a = e ? Symbol.for("react.strict_mode") : 60108;
      var l = e ? Symbol.for("react.profiler") : 60114;
      var o = e ? Symbol.for("react.provider") : 60109;
      var i = e ? Symbol.for("react.context") : 60110;
      var u = e ? Symbol.for("react.async_mode") : 60111;
      var s = e ? Symbol.for("react.concurrent_mode") : 60111;
      var c = e ? Symbol.for("react.forward_ref") : 60112;
      var f = e ? Symbol.for("react.suspense") : 60113;
      var d = e ? Symbol.for("react.suspense_list") : 60120;
      var h = e ? Symbol.for("react.memo") : 60115;
      var p = e ? Symbol.for("react.lazy") : 60116;
      var m = e ? Symbol.for("react.block") : 60121;
      var g = e ? Symbol.for("react.fundamental") : 60117;
      var y = e ? Symbol.for("react.responder") : 60118;
      var v = e ? Symbol.for("react.scope") : 60119;
      function b(e) {
        if (typeof e == "object" && e !== null) {
          var d = e.$$typeof;
          switch (d) {
            case t:
              switch (e = e.type) {
                case u:
                case s:
                case r:
                case l:
                case a:
                case f:
                  return e;
                default:
                  switch (e = e && e.$$typeof) {
                    case i:
                    case c:
                    case p:
                    case h:
                    case o:
                      return e;
                    default:
                      return d;
                  }
              }
            case n:
              return d;
          }
        }
      }
      function S(e) {
        return b(e) === s;
      }
      ot.AsyncMode = u;
      ot.ConcurrentMode = s;
      ot.ContextConsumer = i;
      ot.ContextProvider = o;
      ot.Element = t;
      ot.ForwardRef = c;
      ot.Fragment = r;
      ot.Lazy = p;
      ot.Memo = h;
      ot.Portal = n;
      ot.Profiler = l;
      ot.StrictMode = a;
      ot.Suspense = f;
      ot.isAsyncMode = function (e) {
        return S(e) || b(e) === u;
      };
      ot.isConcurrentMode = S;
      ot.isContextConsumer = function (e) {
        return b(e) === i;
      };
      ot.isContextProvider = function (e) {
        return b(e) === o;
      };
      ot.isElement = function (e) {
        return typeof e == "object" && e !== null && e.$$typeof === t;
      };
      ot.isForwardRef = function (e) {
        return b(e) === c;
      };
      ot.isFragment = function (e) {
        return b(e) === r;
      };
      ot.isLazy = function (e) {
        return b(e) === p;
      };
      ot.isMemo = function (e) {
        return b(e) === h;
      };
      ot.isPortal = function (e) {
        return b(e) === n;
      };
      ot.isProfiler = function (e) {
        return b(e) === l;
      };
      ot.isStrictMode = function (e) {
        return b(e) === a;
      };
      ot.isSuspense = function (e) {
        return b(e) === f;
      };
      ot.isValidElementType = function (e) {
        return typeof e == "string" || typeof e == "function" || e === r || e === s || e === l || e === a || e === f || e === d || typeof e == "object" && e !== null && (e.$$typeof === p || e.$$typeof === h || e.$$typeof === o || e.$$typeof === i || e.$$typeof === c || e.$$typeof === g || e.$$typeof === y || e.$$typeof === v || e.$$typeof === m);
      };
      ot.typeOf = b;
      return ot;
    }();
  }
  return lt.exports;
}
(function () {
  if (rt) {
    return nt;
  }
  rt = 1;
  var e = it();
  var t = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var n = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var r = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var a = {};
  function l(n) {
    if (e.isMemo(n)) {
      return r;
    } else {
      return a[n.$$typeof] || t;
    }
  }
  a[e.ForwardRef] = {
    $$typeof: true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  a[e.Memo] = r;
  var o = Object.defineProperty;
  var i = Object.getOwnPropertyNames;
  var u = Object.getOwnPropertySymbols;
  var s = Object.getOwnPropertyDescriptor;
  var c = Object.getPrototypeOf;
  var f = Object.prototype;
  nt = function e(t, r, a) {
    if (typeof r != "string") {
      if (f) {
        var d = c(r);
        if (d && d !== f) {
          e(t, d, a);
        }
      }
      var h = i(r);
      if (u) {
        h = h.concat(u(r));
      }
      var p = l(t);
      var m = l(r);
      for (var g = 0; g < h.length; ++g) {
        var y = h[g];
        if (!n[y] && (!a || !a[y]) && (!m || !m[y]) && (!p || !p[y])) {
          var v = s(r, y);
          try {
            o(t, y, v);
          } catch (b) {}
        }
      }
    }
    return t;
  };
})();
function ut(e, t) {
  return (ut = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var n in t) {
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        e[n] = t[n];
      }
    }
  })(e, t);
}
function st(e, t) {
  if (typeof t != "function" && t !== null) {
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  }
  function n() {
    this.constructor = e;
  }
  ut(e, t);
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var ct;
var ft;
function dt() {
  dt = Object.assign || function (e) {
    var t;
    for (var n = 1, r = arguments.length; n < r; n++) {
      for (var a in t = arguments[n]) {
        if (Object.prototype.hasOwnProperty.call(t, a)) {
          e[a] = t[a];
        }
      }
    }
    return e;
  };
  return dt.apply(this, arguments);
}
function ht(e, t) {
  var n = {};
  for (var r in e) {
    if (Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0) {
      n[r] = e[r];
    }
  }
  if (e != null && typeof Object.getOwnPropertySymbols == "function") {
    var a = 0;
    for (r = Object.getOwnPropertySymbols(e); a < r.length; a++) {
      if (t.indexOf(r[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[a])) {
        n[r[a]] = e[r[a]];
      }
    }
  }
  return n;
}
function pt(e, t, n) {
  if (n || arguments.length === 2) {
    var r;
    for (var a = 0, l = t.length; a < l; a++) {
      if (!!r || !(a in t)) {
        r ||= Array.prototype.slice.call(t, 0, a);
        r[a] = t[a];
      }
    }
  }
  return e.concat(r || Array.prototype.slice.call(t));
}
if (typeof SuppressedError == "function") {
  SuppressedError;
}
(ft = ct ||= {}).FORMAT_ERROR = "FORMAT_ERROR";
ft.UNSUPPORTED_FORMATTER = "UNSUPPORTED_FORMATTER";
ft.INVALID_CONFIG = "INVALID_CONFIG";
ft.MISSING_DATA = "MISSING_DATA";
ft.MISSING_TRANSLATION = "MISSING_TRANSLATION";
var mt = function (e) {
  function t(n, r, a) {
    var l = this;
    var o = a ? a instanceof Error ? a : new Error(String(a)) : undefined;
    (l = e.call(this, `[@formatjs/intl Error ${n}] ${r}
${o ? `
${o.message}
${o.stack}` : ""}`) || this).code = n;
    if (typeof Error.captureStackTrace == "function") {
      Error.captureStackTrace(l, t);
    }
    return l;
  }
  st(t, e);
  return t;
}(Error);
var gt = function (e) {
  function t(t, n) {
    return e.call(this, ct.UNSUPPORTED_FORMATTER, t, n) || this;
  }
  st(t, e);
  return t;
}(mt);
var yt = function (e) {
  function t(t, n) {
    return e.call(this, ct.INVALID_CONFIG, t, n) || this;
  }
  st(t, e);
  return t;
}(mt);
var vt = function (e) {
  function t(t, n) {
    return e.call(this, ct.MISSING_DATA, t, n) || this;
  }
  st(t, e);
  return t;
}(mt);
var bt = function (e) {
  function t(t, n, r) {
    var a = e.call(this, ct.FORMAT_ERROR, `${t}
Locale: ${n}
`, r) || this;
    a.locale = n;
    return a;
  }
  st(t, e);
  return t;
}(mt);
var St = function (e) {
  function t(t, n, r, a) {
    var l = e.call(this, `${t}
MessageID: ${r == null ? undefined : r.id}
Default Message: ${r == null ? undefined : r.defaultMessage}
Description: ${r == null ? undefined : r.description}
`, n, a) || this;
    l.descriptor = r;
    l.locale = n;
    return l;
  }
  st(t, e);
  return t;
}(bt);
var Et = function (e) {
  function t(t, n) {
    var r = e.call(this, ct.MISSING_TRANSLATION, `Missing message: "${t.id}" for locale "${n}", using ${t.defaultMessage ? `default message (${typeof t.defaultMessage == "string" ? t.defaultMessage : t.defaultMessage.map(function (e) {
      return e.value ?? JSON.stringify(e);
    }).join()})` : "id"} as fallback.`) || this;
    r.descriptor = t;
    return r;
  }
  st(t, e);
  return t;
}(mt);
function wt(e, t, n = {}) {
  return t.reduce(function (t, r) {
    if (r in e) {
      t[r] = e[r];
    } else if (r in n) {
      t[r] = n[r];
    }
    return t;
  }, {});
}
var kt = {
  formats: {},
  messages: {},
  timeZone: undefined,
  defaultLocale: "en",
  defaultFormats: {},
  fallbackOnEmptyString: true,
  onError: function (e) {},
  onWarn: function (e) {}
};
function Tt(e) {
  return {
    create: function () {
      return {
        get: function (t) {
          return e[t];
        },
        set: function (t, n) {
          e[t] = n;
        }
      };
    }
  };
}
function Pt(e, t, n, r) {
  var a;
  var l = e && e[t];
  if (l) {
    a = l[n];
  }
  if (a) {
    return a;
  }
  r(new gt(`No ${t} format named: ${n}`));
}
function _t(e, t) {
  return Object.keys(e).reduce(function (n, r) {
    n[r] = dt({
      timeZone: t
    }, e[r]);
    return n;
  }, {});
}
function Ct(e, t) {
  return Object.keys(dt(dt({}, e), t)).reduce(function (n, r) {
    n[r] = dt(dt({}, e[r] || {}), t[r] || {});
    return n;
  }, {});
}
function Nt(e, t) {
  if (!t) {
    return e;
  }
  var n = at.formats;
  return dt(dt(dt({}, n), e), {
    date: Ct(_t(n.date, t), _t(e.date || {}, t)),
    time: Ct(_t(n.time, t), _t(e.time || {}, t))
  });
}
function Lt(e, t, n, r, a) {
  var l = e.locale;
  var o = e.formats;
  var i = e.messages;
  var u = e.defaultLocale;
  var s = e.defaultFormats;
  var c = e.fallbackOnEmptyString;
  var f = e.onError;
  var d = e.timeZone;
  var h = e.defaultRichTextElements;
  if (n === undefined) {
    n = {
      id: ""
    };
  }
  var p = n.id;
  var m = n.defaultMessage;
  (function (e, t, n = Error) {
    if (!e) {
      throw new n(t);
    }
  })(!!p, "[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.github.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.github.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.github.io/docs/tooling/linter#enforce-id)\nto autofix this issue");
  var g = String(p);
  var y = i && Object.prototype.hasOwnProperty.call(i, g) && i[g];
  if (Array.isArray(y) && y.length === 1 && y[0].type === H.literal) {
    return y[0].value;
  }
  if (!r && y && typeof y == "string" && !h) {
    return y.replace(/'\{(.*?)\}'/gi, "{$1}");
  }
  r = dt(dt({}, h), r || {});
  o = Nt(o, d);
  s = Nt(s, d);
  if (!y) {
    if (c === false && y === "") {
      return y;
    }
    if (!m || l && l.toLowerCase() !== u.toLowerCase()) {
      f(new Et(n, l));
    }
    if (m) {
      try {
        return t.getMessageFormat(m, u, s, a).format(r);
      } catch (v) {
        f(new St(`Error formatting default message for: "${g}", rendering default message verbatim`, l, n, v));
        if (typeof m == "string") {
          return m;
        } else {
          return g;
        }
      }
    }
    return g;
  }
  try {
    return t.getMessageFormat(y, l, o, dt({
      formatters: t
    }, a || {})).format(r);
  } catch (v) {
    f(new St(`Error formatting message: "${g}", using ${m ? "default message" : "id"} as fallback.`, l, n, v));
  }
  if (m) {
    try {
      return t.getMessageFormat(m, u, s, a).format(r);
    } catch (v) {
      f(new St(`Error formatting the default message for: "${g}", rendering message verbatim`, l, n, v));
    }
  }
  if (typeof y == "string") {
    return y;
  } else if (typeof m == "string") {
    return m;
  } else {
    return g;
  }
}
var At = ["formatMatcher", "timeZone", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "hourCycle", "dateStyle", "timeStyle", "calendar", "numberingSystem", "fractionalSecondDigits"];
function Ot(e, t, n, r) {
  var a = e.locale;
  var l = e.formats;
  var o = e.onError;
  var i = e.timeZone;
  if (r === undefined) {
    r = {};
  }
  var u = r.format;
  var s = dt(dt({}, i && {
    timeZone: i
  }), u && Pt(l, t, u, o));
  var c = wt(r, At, s);
  if (t === "time" && !c.hour && !c.minute && !c.second && !c.timeStyle && !c.dateStyle) {
    c = dt(dt({}, c), {
      hour: "numeric",
      minute: "numeric"
    });
  }
  return n(a, c);
}
function xt(e, t) {
  var n = [];
  for (var r = 2; r < arguments.length; r++) {
    n[r - 2] = arguments[r];
  }
  var a = n[0];
  var l = n[1];
  var o = l === undefined ? {} : l;
  var i = typeof a == "string" ? new Date(a || 0) : a;
  try {
    return Ot(e, "date", t, o).format(i);
  } catch (u) {
    e.onError(new bt("Error formatting date.", e.locale, u));
  }
  return String(i);
}
function Rt(e, t) {
  var n = [];
  for (var r = 2; r < arguments.length; r++) {
    n[r - 2] = arguments[r];
  }
  var a = n[0];
  var l = n[1];
  var o = l === undefined ? {} : l;
  var i = typeof a == "string" ? new Date(a || 0) : a;
  try {
    return Ot(e, "time", t, o).format(i);
  } catch (u) {
    e.onError(new bt("Error formatting time.", e.locale, u));
  }
  return String(i);
}
function It(e, t) {
  var n = [];
  for (var r = 2; r < arguments.length; r++) {
    n[r - 2] = arguments[r];
  }
  var a = n[0];
  var l = n[1];
  var o = n[2];
  var i = o === undefined ? {} : o;
  var u = typeof a == "string" ? new Date(a || 0) : a;
  var s = typeof l == "string" ? new Date(l || 0) : l;
  try {
    return Ot(e, "dateTimeRange", t, i).formatRange(u, s);
  } catch (c) {
    e.onError(new bt("Error formatting date time range.", e.locale, c));
  }
  return String(u);
}
function Mt(e, t) {
  var n = [];
  for (var r = 2; r < arguments.length; r++) {
    n[r - 2] = arguments[r];
  }
  var a = n[0];
  var l = n[1];
  var o = l === undefined ? {} : l;
  var i = typeof a == "string" ? new Date(a || 0) : a;
  try {
    return Ot(e, "date", t, o).formatToParts(i);
  } catch (u) {
    e.onError(new bt("Error formatting date.", e.locale, u));
  }
  return [];
}
function Ht(e, t) {
  var n = [];
  for (var r = 2; r < arguments.length; r++) {
    n[r - 2] = arguments[r];
  }
  var a = n[0];
  var l = n[1];
  var o = l === undefined ? {} : l;
  var i = typeof a == "string" ? new Date(a || 0) : a;
  try {
    return Ot(e, "time", t, o).formatToParts(i);
  } catch (u) {
    e.onError(new bt("Error formatting time.", e.locale, u));
  }
  return [];
}
var Dt = ["style", "type", "fallback", "languageDisplay"];
function zt(e, t, n, r) {
  var a = e.locale;
  var l = e.onError;
  if (!Intl.DisplayNames) {
    l(new We("Intl.DisplayNames is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-displaynames\"\n", Me.MISSING_INTL_API));
  }
  var o = wt(r, Dt);
  try {
    return t(a, o).of(n);
  } catch (i) {
    l(new bt("Error formatting display name.", a, i));
  }
}
var Ft = ["type", "style"];
var Bt = Date.now();
function Ut(e, t, n, r = {}) {
  var a = Gt(e, t, n, r).reduce(function (e, t) {
    var n = t.value;
    if (typeof n != "string") {
      e.push(n);
    } else if (typeof e[e.length - 1] == "string") {
      e[e.length - 1] += n;
    } else {
      e.push(n);
    }
    return e;
  }, []);
  if (a.length === 1) {
    return a[0];
  } else if (a.length === 0) {
    return "";
  } else {
    return a;
  }
}
function Gt(e, t, n, r) {
  var a = e.locale;
  var l = e.onError;
  if (r === undefined) {
    r = {};
  }
  if (!Intl.ListFormat) {
    l(new We("Intl.ListFormat is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-listformat\"\n", Me.MISSING_INTL_API));
  }
  var o = wt(r, Ft);
  try {
    var i = {};
    var u = n.map(function (e, t) {
      if (typeof e == "object") {
        var n = function (e) {
          return `${Bt}_${e}_${Bt}`;
        }(t);
        i[n] = e;
        return n;
      }
      return String(e);
    });
    return t(a, o).formatToParts(u).map(function (e) {
      if (e.type === "literal") {
        return e;
      } else {
        return dt(dt({}, e), {
          value: i[e.value] || e.value
        });
      }
    });
  } catch (s) {
    l(new bt("Error formatting list.", a, s));
  }
  return n;
}
var jt = ["type"];
function Vt(e, t, n, r) {
  var a = e.locale;
  var l = e.onError;
  if (r === undefined) {
    r = {};
  }
  if (!Intl.PluralRules) {
    l(new We("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", Me.MISSING_INTL_API));
  }
  var o = wt(r, jt);
  try {
    return t(a, o).select(n);
  } catch (i) {
    l(new bt("Error formatting plural.", a, i));
  }
  return "other";
}
var $t = ["numeric", "style"];
function Wt(e, t, n, r, a = {}) {
  r ||= "second";
  if (!Intl.RelativeTimeFormat) {
    e.onError(new We("Intl.RelativeTimeFormat is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-relativetimeformat\"\n", Me.MISSING_INTL_API));
  }
  try {
    return function (e, t, n) {
      var r = e.locale;
      var a = e.formats;
      var l = e.onError;
      if (n === undefined) {
        n = {};
      }
      var o = n.format;
      var i = !!o && Pt(a, "relative", o, l) || {};
      return t(r, wt(n, $t, i));
    }(e, t, a).format(n, r);
  } catch (l) {
    e.onError(new bt("Error formatting relative time.", e.locale, l));
  }
  return String(n);
}
var Qt = ["style", "currency", "unit", "unitDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "currencyDisplay", "currencySign", "notation", "signDisplay", "unit", "unitDisplay", "numberingSystem", "trailingZeroDisplay", "roundingPriority", "roundingIncrement", "roundingMode"];
function qt(e, t, n) {
  var r = e.locale;
  var a = e.formats;
  var l = e.onError;
  if (n === undefined) {
    n = {};
  }
  var o = n.format;
  var i = o && Pt(a, "number", o, l) || {};
  return t(r, wt(n, Qt, i));
}
function Kt(e, t, n, r = {}) {
  try {
    return qt(e, t, r).format(n);
  } catch (a) {
    e.onError(new bt("Error formatting number.", e.locale, a));
  }
  return String(n);
}
function Xt(e, t, n, r = {}) {
  try {
    return qt(e, t, r).formatToParts(n);
  } catch (a) {
    e.onError(new bt("Error formatting number.", e.locale, a));
  }
  return [];
}
function Yt(e) {
  var t;
  if (e.onWarn && e.defaultRichTextElements && typeof ((t = e.messages || {}) ? t[Object.keys(t)[0]] : undefined) == "string") {
    e.onWarn("[@formatjs/intl] \"defaultRichTextElements\" was specified but \"message\" was not pre-compiled. \nPlease consider using \"@formatjs/cli\" to pre-compile your messages for performance.\nFor more details see https://formatjs.github.io/docs/getting-started/message-distribution");
  }
}
function Zt(e, t) {
  var n = function (e = {
    dateTime: {},
    number: {},
    message: {},
    relativeTime: {},
    pluralRules: {},
    list: {},
    displayNames: {}
  }) {
    var t = Intl.RelativeTimeFormat;
    var n = Intl.ListFormat;
    var r = Intl.DisplayNames;
    var a = E(function () {
      var e;
      var t = [];
      for (var n = 0; n < arguments.length; n++) {
        t[n] = arguments[n];
      }
      return new ((e = Intl.DateTimeFormat).bind.apply(e, pt([undefined], t, false)))();
    }, {
      cache: Tt(e.dateTime),
      strategy: L.variadic
    });
    var l = E(function () {
      var e;
      var t = [];
      for (var n = 0; n < arguments.length; n++) {
        t[n] = arguments[n];
      }
      return new ((e = Intl.NumberFormat).bind.apply(e, pt([undefined], t, false)))();
    }, {
      cache: Tt(e.number),
      strategy: L.variadic
    });
    var o = E(function () {
      var e;
      var t = [];
      for (var n = 0; n < arguments.length; n++) {
        t[n] = arguments[n];
      }
      return new ((e = Intl.PluralRules).bind.apply(e, pt([undefined], t, false)))();
    }, {
      cache: Tt(e.pluralRules),
      strategy: L.variadic
    });
    return {
      getDateTimeFormat: a,
      getNumberFormat: l,
      getMessageFormat: E(function (e, t, n, r) {
        return new at(e, t, n, dt({
          formatters: {
            getNumberFormat: l,
            getDateTimeFormat: a,
            getPluralRules: o
          }
        }, r || {}));
      }, {
        cache: Tt(e.message),
        strategy: L.variadic
      }),
      getRelativeTimeFormat: E(function () {
        var e = [];
        for (var n = 0; n < arguments.length; n++) {
          e[n] = arguments[n];
        }
        return new (t.bind.apply(t, pt([undefined], e, false)))();
      }, {
        cache: Tt(e.relativeTime),
        strategy: L.variadic
      }),
      getPluralRules: o,
      getListFormat: E(function () {
        var e = [];
        for (var t = 0; t < arguments.length; t++) {
          e[t] = arguments[t];
        }
        return new (n.bind.apply(n, pt([undefined], e, false)))();
      }, {
        cache: Tt(e.list),
        strategy: L.variadic
      }),
      getDisplayNames: E(function () {
        var e = [];
        for (var t = 0; t < arguments.length; t++) {
          e[t] = arguments[t];
        }
        return new (r.bind.apply(r, pt([undefined], e, false)))();
      }, {
        cache: Tt(e.displayNames),
        strategy: L.variadic
      })
    };
  }(t);
  var r = dt(dt({}, kt), e);
  var a = r.locale;
  var l = r.defaultLocale;
  var o = r.onError;
  if (a) {
    if (!Intl.NumberFormat.supportedLocalesOf(a).length && o) {
      o(new vt(`Missing locale data for locale: "${a}" in Intl.NumberFormat. Using default locale: "${l}" as fallback. See https://formatjs.github.io/docs/react-intl#runtime-requirements for more details`));
    } else if (!Intl.DateTimeFormat.supportedLocalesOf(a).length && o) {
      o(new vt(`Missing locale data for locale: "${a}" in Intl.DateTimeFormat. Using default locale: "${l}" as fallback. See https://formatjs.github.io/docs/react-intl#runtime-requirements for more details`));
    }
  } else {
    if (o) {
      o(new yt(`"locale" was not configured, using "${l}" as fallback. See https://formatjs.github.io/docs/react-intl/api#intlshape for more details`));
    }
    r.locale = r.defaultLocale || "en";
  }
  Yt(r);
  return dt(dt({}, r), {
    formatters: n,
    formatNumber: Kt.bind(null, r, n.getNumberFormat),
    formatNumberToParts: Xt.bind(null, r, n.getNumberFormat),
    formatRelativeTime: Wt.bind(null, r, n.getRelativeTimeFormat),
    formatDate: xt.bind(null, r, n.getDateTimeFormat),
    formatDateToParts: Mt.bind(null, r, n.getDateTimeFormat),
    formatTime: Rt.bind(null, r, n.getDateTimeFormat),
    formatDateTimeRange: It.bind(null, r, n.getDateTimeFormat),
    formatTimeToParts: Ht.bind(null, r, n.getDateTimeFormat),
    formatPlural: Vt.bind(null, r, n.getPluralRules),
    formatMessage: Lt.bind(null, r, n),
    $t: Lt.bind(null, r, n),
    formatList: Ut.bind(null, r, n.getListFormat),
    formatListToParts: Gt.bind(null, r, n.getListFormat),
    formatDisplayName: zt.bind(null, r, n.getDisplayNames)
  });
}
function Jt(e) {
  (function (e, t, n = Error) {
    if (!e) {
      throw new n(t);
    }
  })(e, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.");
}
var en = dt(dt({}, kt), {
  textComponent: n.Fragment
});
var tn = {
  key: 42
};
function nn(e) {
  if (n.isValidElement(e)) {
    return n.createElement(n.Fragment, tn, e);
  } else {
    return e;
  }
}
function rn(e, t) {
  if (e === t) {
    return true;
  }
  if (!e || !t) {
    return false;
  }
  var n = Object.keys(e);
  var r = Object.keys(t);
  var a = n.length;
  if (r.length !== a) {
    return false;
  }
  for (var l = 0; l < a; l++) {
    var o = n[l];
    if (e[o] !== t[o] || !Object.prototype.hasOwnProperty.call(t, o)) {
      return false;
    }
  }
  return true;
}
var an = typeof window == "undefined" || window.__REACT_INTL_BYPASS_GLOBAL_CONTEXT__ ? n.createContext(null) : window.__REACT_INTL_CONTEXT__ ||= n.createContext(null);
an.Consumer;
var ln;
var on;
var un;
var sn;
var cn = an.Provider;
var fn = an;
function dn() {
  var e = n.useContext(fn);
  Jt(e);
  return e;
}
function hn(e) {
  function t(t) {
    var n = dn();
    var r = t.value;
    var a = t.children;
    var l = ht(t, ["value", "children"]);
    var o = typeof r == "string" ? new Date(r || 0) : r;
    return a(e === "formatDate" ? n.formatDateToParts(o, l) : n.formatTimeToParts(o, l));
  }
  t.displayName = un[e];
  return t;
}
function pn(e) {
  function t(t) {
    var r = dn();
    var a = t.value;
    var l = t.children;
    var o = ht(t, ["value", "children"]);
    var i = r[e](a, o);
    if (typeof l == "function") {
      return l(i);
    }
    var u = r.textComponent || n.Fragment;
    return n.createElement(u, null, i);
  }
  t.displayName = ln[e];
  return t;
}
function mn(e) {
  if (e) {
    return Object.keys(e).reduce(function (t, r) {
      var a;
      var l = e[r];
      t[r] = Xe(l) ? (a = l, function (e) {
        return a(n.Children.toArray(e));
      }) : l;
      return t;
    }, {});
  } else {
    return e;
  }
}
(on = ln ||= {}).formatDate = "FormattedDate";
on.formatTime = "FormattedTime";
on.formatNumber = "FormattedNumber";
on.formatList = "FormattedList";
on.formatDisplayName = "FormattedDisplayName";
(sn = un ||= {}).formatDate = "FormattedDateParts";
sn.formatTime = "FormattedTimeParts";
sn.formatNumber = "FormattedNumberParts";
sn.formatList = "FormattedListParts";
function gn(e, t, r, a) {
  var l = [];
  for (var o = 4; o < arguments.length; o++) {
    l[o - 4] = arguments[o];
  }
  var i;
  var s = mn(a);
  var c = Lt.apply(undefined, pt([e, t, r, s], l, false));
  if (Array.isArray(c)) {
    i = c;
    return n.Children.map(i, nn) ?? [];
  } else {
    return c;
  }
}
function yn(e, t) {
  var n = e.defaultRichTextElements;
  var r = ht(e, ["defaultRichTextElements"]);
  var a = mn(n);
  var l = Zt(dt(dt(dt({}, en), r), {
    defaultRichTextElements: a
  }), t);
  var o = {
    locale: l.locale,
    timeZone: l.timeZone,
    fallbackOnEmptyString: l.fallbackOnEmptyString,
    formats: l.formats,
    defaultLocale: l.defaultLocale,
    defaultFormats: l.defaultFormats,
    messages: l.messages,
    onError: l.onError,
    defaultRichTextElements: a
  };
  return dt(dt({}, l), {
    formatMessage: gn.bind(null, o, l.formatters),
    $t: gn.bind(null, o, l.formatters)
  });
}
function vn(e) {
  var t = dn();
  var r = t.formatMessage;
  var a = t.textComponent;
  var l = a === undefined ? n.Fragment : a;
  var o = e.id;
  var i = e.description;
  var u = e.defaultMessage;
  var s = e.values;
  var c = e.children;
  var f = e.tagName;
  var d = f === undefined ? l : f;
  var h = r({
    id: o,
    description: i,
    defaultMessage: u
  }, s, {
    ignoreTag: e.ignoreTag
  });
  if (typeof c == "function") {
    return c(Array.isArray(h) ? h : [h]);
  } else if (d) {
    return n.createElement(d, null, h);
  } else {
    return n.createElement(n.Fragment, null, h);
  }
}
vn.displayName = "FormattedMessage";
var bn = n.memo(vn, function (e, t) {
  var n = e.values;
  var r = ht(e, ["values"]);
  var a = t.values;
  var l = ht(t, ["values"]);
  return rn(a, n) && rn(r, l);
});
function Sn(e) {
  return {
    locale: e.locale,
    timeZone: e.timeZone,
    fallbackOnEmptyString: e.fallbackOnEmptyString,
    formats: e.formats,
    textComponent: e.textComponent,
    messages: e.messages,
    defaultLocale: e.defaultLocale,
    defaultFormats: e.defaultFormats,
    onError: e.onError,
    onWarn: e.onWarn,
    wrapRichTextChunksInFragment: e.wrapRichTextChunksInFragment,
    defaultRichTextElements: e.defaultRichTextElements
  };
}
bn.displayName = "MemoizedFormattedMessage";
var En = function (e) {
  function t() {
    var t = e !== null && e.apply(this, arguments) || this;
    t.cache = {
      dateTime: {},
      number: {},
      message: {},
      relativeTime: {},
      pluralRules: {},
      list: {},
      displayNames: {}
    };
    t.state = {
      cache: t.cache,
      intl: yn(Sn(t.props), t.cache),
      prevConfig: Sn(t.props)
    };
    return t;
  }
  st(t, e);
  t.getDerivedStateFromProps = function (e, t) {
    var n = t.prevConfig;
    var r = t.cache;
    var a = Sn(e);
    if (rn(n, a)) {
      return null;
    } else {
      return {
        intl: yn(a, r),
        prevConfig: a
      };
    }
  };
  t.prototype.render = function () {
    Jt(this.state.intl);
    return n.createElement(cn, {
      value: this.state.intl
    }, this.props.children);
  };
  t.displayName = "IntlProvider";
  t.defaultProps = en;
  return t;
}(n.PureComponent);
pn("formatDate");
pn("formatTime");
pn("formatNumber");
pn("formatList");
pn("formatDisplayName");
hn("formatDate");
hn("formatTime");
const wn = "en-US";
const kn = ["en-US", "zh-CN", "de-DE", "fr-FR", "ko-KR", "ja-JP", "es-419", "es-ES", "it-IT", "hi-IN", "pt-BR", "id-ID"];
const Tn = {
  "en-US": "English",
  "zh-CN": "简体中文",
  "de-DE": "Deutsch",
  "fr-FR": "Français",
  "ko-KR": "한국어",
  "ja-JP": "日本語",
  "es-419": "Español (Latinoamérica)",
  "es-ES": "Español (España)",
  "it-IT": "Italiano",
  "hi-IN": "हिन्दी",
  "pt-BR": "Português (Brasil)",
  "id-ID": "Bahasa Indonesia"
};
function Pn() {
  const e = navigator.language;
  if (kn.includes(e)) {
    return e;
  }
  const t = e.split("-")[0];
  return kn.find(e => e.startsWith(t + "-")) || wn;
}
const _n = "preferred_locale";
function Cn() {
  const [e, t] = n.useState(wn);
  const [r, a] = n.useState(true);
  n.useEffect(() => {
    (async () => {
      try {
        const e = (await chrome.storage.local.get(_n))[_n];
        if (e && kn.includes(e)) {
          t(e);
        } else {
          t(Pn());
        }
      } catch {
        t(Pn());
      } finally {
        a(false);
      }
    })();
    const e = (e, n) => {
      if (n === "local" && e[_n]) {
        const n = e[_n].newValue;
        if (n && kn.includes(n)) {
          t(n);
        }
      }
    };
    chrome.storage.onChanged.addListener(e);
    return () => {
      chrome.storage.onChanged.removeListener(e);
    };
  }, []);
  return {
    locale: e,
    setLocale: n.useCallback(async e => {
      try {
        await chrome.storage.local.set({
          [_n]: e
        });
        t(e);
      } catch (n) {
        throw n;
      }
    }, []),
    isLoading: r
  };
}
function Nn({
  children: e
}) {
  const {
    locale: t,
    isLoading: a
  } = Cn();
  const [l, o] = n.useState({});
  const [i, u] = n.useState(true);
  n.useEffect(() => {
    if (!a) {
      (async () => {
        u(true);
        try {
          const e = await fetch(chrome.runtime.getURL(`i18n/${t}.json`));
          if (e.ok) {
            const t = await e.json();
            o(t);
          } else {
            o({});
          }
        } catch {
          o({});
        } finally {
          u(false);
        }
      })();
    }
  }, [t, a]);
  if (a || i) {
    return null;
  } else {
    return r.jsx(En, {
      locale: t,
      defaultLocale: wn,
      messages: l,
      onError: An,
      children: e
    });
  }
}
const Ln = new Set();
function An(e) {
  if (e.message.includes("MISSING_TRANSLATION")) {
    if (Ln.has(e.message)) {
      return;
    }
    Ln.add(e.message);
  }
}
export { kn as A, Nn as I, Tn as L, bn as M, S as R, Cn as a, v as r, dn as u };
