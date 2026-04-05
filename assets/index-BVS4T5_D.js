function e(e, t) {
  for (var r = 0; r < t.length; r++) {
    const n = t[r];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const t in n) {
        if (t !== "default" && !(t in e)) {
          const r = Object.getOwnPropertyDescriptor(n, t);
          if (r) {
            Object.defineProperty(e, t, r.get ? r : {
              enumerable: true,
              get: () => n[t]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
    value: "Module"
  }));
}
var t = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function r(e) {
  if (e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")) {
    return e.default;
  } else {
    return e;
  }
}
function n(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) {
    return e;
  }
  var t = e.default;
  if (typeof t == "function") {
    var r = function e() {
      var r = false;
      try {
        r = this instanceof e;
      } catch {}
      if (r) {
        return Reflect.construct(t, arguments, this.constructor);
      } else {
        return t.apply(this, arguments);
      }
    };
    r.prototype = t.prototype;
  } else {
    r = {};
  }
  Object.defineProperty(r, "__esModule", {
    value: true
  });
  Object.keys(e).forEach(function (t) {
    var n = Object.getOwnPropertyDescriptor(e, t);
    Object.defineProperty(r, t, n.get ? n : {
      enumerable: true,
      get: function () {
        return e[t];
      }
    });
  });
  return r;
}
var o;
var u;
var i = {
  exports: {}
};
var a = {};
function c() {
  if (!u) {
    u = 1;
    i.exports = function () {
      if (o) {
        return a;
      }
      o = 1;
      var e = Symbol.for("react.transitional.element");
      var t = Symbol.for("react.fragment");
      function r(t, r, n) {
        var o = null;
        if (n !== undefined) {
          o = "" + n;
        }
        if (r.key !== undefined) {
          o = "" + r.key;
        }
        if ("key" in r) {
          n = {};
          for (var u in r) {
            if (u !== "key") {
              n[u] = r[u];
            }
          }
        } else {
          n = r;
        }
        r = n.ref;
        return {
          $$typeof: e,
          type: t,
          key: o,
          ref: r !== undefined ? r : null,
          props: n
        };
      }
      a.Fragment = t;
      a.jsx = r;
      a.jsxs = r;
      return a;
    }();
  }
  return i.exports;
}
var f;
var s;
var l = c();
var p = {
  exports: {}
};
var y = {};
function d() {
  if (f) {
    return y;
  }
  f = 1;
  var e = Symbol.for("react.transitional.element");
  var t = Symbol.for("react.portal");
  var r = Symbol.for("react.fragment");
  var n = Symbol.for("react.strict_mode");
  var o = Symbol.for("react.profiler");
  var u = Symbol.for("react.consumer");
  var i = Symbol.for("react.context");
  var a = Symbol.for("react.forward_ref");
  var c = Symbol.for("react.suspense");
  var s = Symbol.for("react.memo");
  var l = Symbol.for("react.lazy");
  var p = Symbol.for("react.activity");
  var d = Symbol.iterator;
  var h = {
    isMounted: function () {
      return false;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  };
  var b = Object.assign;
  var v = {};
  function _(e, t, r) {
    this.props = e;
    this.context = t;
    this.refs = v;
    this.updater = r || h;
  }
  function m() {}
  function S(e, t, r) {
    this.props = e;
    this.context = t;
    this.refs = v;
    this.updater = r || h;
  }
  _.prototype.isReactComponent = {};
  _.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) {
      throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    }
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  _.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  m.prototype = _.prototype;
  var g = S.prototype = new m();
  g.constructor = S;
  b(g, _.prototype);
  g.isPureReactComponent = true;
  var E = Array.isArray;
  function j() {}
  var w = {
    H: null,
    A: null,
    T: null,
    S: null
  };
  var k = Object.prototype.hasOwnProperty;
  function O(t, r, n) {
    var o = n.ref;
    return {
      $$typeof: e,
      type: t,
      key: r,
      ref: o !== undefined ? o : null,
      props: n
    };
  }
  function H(t) {
    return typeof t == "object" && t !== null && t.$$typeof === e;
  }
  var R = /\/+/g;
  function x(e, t) {
    if (typeof e == "object" && e !== null && e.key != null) {
      r = "" + e.key;
      n = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + r.replace(/[=:]/g, function (e) {
        return n[e];
      });
    } else {
      return t.toString(36);
    }
    var r;
    var n;
  }
  function $(r, n, o, u, i) {
    var a = typeof r;
    if (a === "undefined" || a === "boolean") {
      r = null;
    }
    var c;
    var f;
    var s = false;
    if (r === null) {
      s = true;
    } else {
      switch (a) {
        case "bigint":
        case "string":
        case "number":
          s = true;
          break;
        case "object":
          switch (r.$$typeof) {
            case e:
            case t:
              s = true;
              break;
            case l:
              return $((s = r._init)(r._payload), n, o, u, i);
          }
      }
    }
    if (s) {
      i = i(r);
      s = u === "" ? "." + x(r, 0) : u;
      if (E(i)) {
        o = "";
        if (s != null) {
          o = s.replace(R, "$&/") + "/";
        }
        $(i, n, o, "", function (e) {
          return e;
        });
      } else if (i != null) {
        if (H(i)) {
          c = i;
          f = o + (i.key == null || r && r.key === i.key ? "" : ("" + i.key).replace(R, "$&/") + "/") + s;
          i = O(c.type, f, c.props);
        }
        n.push(i);
      }
      return 1;
    }
    s = 0;
    var p;
    var y = u === "" ? "." : u + ":";
    if (E(r)) {
      for (var h = 0; h < r.length; h++) {
        s += $(u = r[h], n, o, a = y + x(u, h), i);
      }
    } else if (typeof (h = (p = r) === null || typeof p != "object" ? null : typeof (p = d && p[d] || p["@@iterator"]) == "function" ? p : null) == "function") {
      r = h.call(r);
      h = 0;
      while (!(u = r.next()).done) {
        s += $(u = u.value, n, o, a = y + x(u, h++), i);
      }
    } else if (a === "object") {
      if (typeof r.then == "function") {
        return $(function (e) {
          switch (e.status) {
            case "fulfilled":
              return e.value;
            case "rejected":
              throw e.reason;
            default:
              if (typeof e.status == "string") {
                e.then(j, j);
              } else {
                e.status = "pending";
                e.then(function (t) {
                  if (e.status === "pending") {
                    e.status = "fulfilled";
                    e.value = t;
                  }
                }, function (t) {
                  if (e.status === "pending") {
                    e.status = "rejected";
                    e.reason = t;
                  }
                });
              }
              switch (e.status) {
                case "fulfilled":
                  return e.value;
                case "rejected":
                  throw e.reason;
              }
          }
          throw e;
        }(r), n, o, u, i);
      }
      n = String(r);
      throw Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
    }
    return s;
  }
  function C(e, t, r) {
    if (e == null) {
      return e;
    }
    var n = [];
    var o = 0;
    $(e, n, "", "", function (e) {
      return t.call(r, e, o++);
    });
    return n;
  }
  function P(e) {
    if (e._status === -1) {
      var t = e._result;
      (t = t()).then(function (t) {
        if (e._status === 0 || e._status === -1) {
          e._status = 1;
          e._result = t;
        }
      }, function (t) {
        if (e._status === 0 || e._status === -1) {
          e._status = 2;
          e._result = t;
        }
      });
      if (e._status === -1) {
        e._status = 0;
        e._result = t;
      }
    }
    if (e._status === 1) {
      return e._result.default;
    }
    throw e._result;
  }
  var T = typeof reportError == "function" ? reportError : function (e) {
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
  var A = {
    map: C,
    forEach: function (e, t, r) {
      C(e, function () {
        t.apply(this, arguments);
      }, r);
    },
    count: function (e) {
      var t = 0;
      C(e, function () {
        t++;
      });
      return t;
    },
    toArray: function (e) {
      return C(e, function (e) {
        return e;
      }) || [];
    },
    only: function (e) {
      if (!H(e)) {
        throw Error("React.Children.only expected to receive a single React element child.");
      }
      return e;
    }
  };
  y.Activity = p;
  y.Children = A;
  y.Component = _;
  y.Fragment = r;
  y.Profiler = o;
  y.PureComponent = S;
  y.StrictMode = n;
  y.Suspense = c;
  y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w;
  y.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function (e) {
      return w.H.useMemoCache(e);
    }
  };
  y.cache = function (e) {
    return function () {
      return e.apply(null, arguments);
    };
  };
  y.cacheSignal = function () {
    return null;
  };
  y.cloneElement = function (e, t, r) {
    if (e == null) {
      throw Error("The argument must be a React element, but you passed " + e + ".");
    }
    var n = b({}, e.props);
    var o = e.key;
    if (t != null) {
      if (t.key !== undefined) {
        o = "" + t.key;
      }
      for (u in t) {
        if (!!k.call(t, u) && u !== "key" && u !== "__self" && u !== "__source" && (u !== "ref" || t.ref !== undefined)) {
          n[u] = t[u];
        }
      }
    }
    var u = arguments.length - 2;
    if (u === 1) {
      n.children = r;
    } else if (u > 1) {
      var i = Array(u);
      for (var a = 0; a < u; a++) {
        i[a] = arguments[a + 2];
      }
      n.children = i;
    }
    return O(e.type, o, n);
  };
  y.createContext = function (e) {
    (e = {
      $$typeof: i,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }).Provider = e;
    e.Consumer = {
      $$typeof: u,
      _context: e
    };
    return e;
  };
  y.createElement = function (e, t, r) {
    var n;
    var o = {};
    var u = null;
    if (t != null) {
      if (t.key !== undefined) {
        u = "" + t.key;
      }
      for (n in t) {
        if (k.call(t, n) && n !== "key" && n !== "__self" && n !== "__source") {
          o[n] = t[n];
        }
      }
    }
    var i = arguments.length - 2;
    if (i === 1) {
      o.children = r;
    } else if (i > 1) {
      var a = Array(i);
      for (var c = 0; c < i; c++) {
        a[c] = arguments[c + 2];
      }
      o.children = a;
    }
    if (e && e.defaultProps) {
      for (n in i = e.defaultProps) {
        if (o[n] === undefined) {
          o[n] = i[n];
        }
      }
    }
    return O(e, u, o);
  };
  y.createRef = function () {
    return {
      current: null
    };
  };
  y.forwardRef = function (e) {
    return {
      $$typeof: a,
      render: e
    };
  };
  y.isValidElement = H;
  y.lazy = function (e) {
    return {
      $$typeof: l,
      _payload: {
        _status: -1,
        _result: e
      },
      _init: P
    };
  };
  y.memo = function (e, t) {
    return {
      $$typeof: s,
      type: e,
      compare: t === undefined ? null : t
    };
  };
  y.startTransition = function (e) {
    var t = w.T;
    var r = {};
    w.T = r;
    try {
      var n = e();
      var o = w.S;
      if (o !== null) {
        o(r, n);
      }
      if (typeof n == "object" && n !== null && typeof n.then == "function") {
        n.then(j, T);
      }
    } catch (u) {
      T(u);
    } finally {
      if (t !== null && r.types !== null) {
        t.types = r.types;
      }
      w.T = t;
    }
  };
  y.unstable_useCacheRefresh = function () {
    return w.H.useCacheRefresh();
  };
  y.use = function (e) {
    return w.H.use(e);
  };
  y.useActionState = function (e, t, r) {
    return w.H.useActionState(e, t, r);
  };
  y.useCallback = function (e, t) {
    return w.H.useCallback(e, t);
  };
  y.useContext = function (e) {
    return w.H.useContext(e);
  };
  y.useDebugValue = function () {};
  y.useDeferredValue = function (e, t) {
    return w.H.useDeferredValue(e, t);
  };
  y.useEffect = function (e, t) {
    return w.H.useEffect(e, t);
  };
  y.useEffectEvent = function (e) {
    return w.H.useEffectEvent(e);
  };
  y.useId = function () {
    return w.H.useId();
  };
  y.useImperativeHandle = function (e, t, r) {
    return w.H.useImperativeHandle(e, t, r);
  };
  y.useInsertionEffect = function (e, t) {
    return w.H.useInsertionEffect(e, t);
  };
  y.useLayoutEffect = function (e, t) {
    return w.H.useLayoutEffect(e, t);
  };
  y.useMemo = function (e, t) {
    return w.H.useMemo(e, t);
  };
  y.useOptimistic = function (e, t) {
    return w.H.useOptimistic(e, t);
  };
  y.useReducer = function (e, t, r) {
    return w.H.useReducer(e, t, r);
  };
  y.useRef = function (e) {
    return w.H.useRef(e);
  };
  y.useState = function (e) {
    return w.H.useState(e);
  };
  y.useSyncExternalStore = function (e, t, r) {
    return w.H.useSyncExternalStore(e, t, r);
  };
  y.useTransition = function () {
    return w.H.useTransition();
  };
  y.version = "19.2.4";
  return y;
}
function h() {
  if (!s) {
    s = 1;
    p.exports = d();
  }
  return p.exports;
}
var b = h();
const v = r(b);
const _ = e({
  __proto__: null,
  default: v
}, [b]);
export { v as R, h as a, c as b, t as c, _ as d, n as e, r as g, l as j, b as r };