import { aN as t, aO as e, aP as n, aQ as o, aR as s, aS as r, aT as i, aU as a, aV as c, aW as u, aX as d, aY as l, aZ as f, a_ as p, a$ as m, b0 as h, b1 as g, b2 as y, b3 as v, b4 as b, b5 as w, b6 as S, b7 as x, b8 as N, b9 as E, ba as I, bb as T, bc as C, bd as R, be as D, bf as _, bg as M, bh as O, bi as L, bj as k, bk as P, bl as A, bm as V, bn as z, bo as H, bp as F, bq as $, br as B, bs as G, bt as U, bu as X, bv as Y, bw as j, bx as W, by as q } from "./useStorageState-hbwNMVUA.js";
import "./index-BVS4T5_D.js";
import "./index-5uYI7rOK.js";
import "./PermissionManager-9s959502.js";
const J = 2;
const Z = 3;
const K = 4;
const Q = 6;
const tt = 7;
const et = 8;
const nt = 9;
const ot = 0;
const st = 1;
const rt = 2;
const it = 3;
const at = 4;
const ct = 11;
const ut = 0;
const dt = 1;
const lt = 2;
const ft = 3;
const pt = 4;
const mt = 5;
const ht = 6;
const gt = 7;
const yt = 8;
const vt = 5;
const bt = 6;
const wt = 0;
const St = 1;
function xt(n, o) {
  const s = n.tagName;
  const r = n.value;
  if (t(n, o)) {
    const t = n.type;
    if (s === "INPUT" && (t === "button" || t === "submit" || t === "reset")) {
      return r;
    }
    if (!r || s === "OPTION") {
      return;
    }
    return e;
  }
  if (s === "OPTION" || s === "SELECT") {
    return n.value;
  } else if (s === "INPUT" || s === "TEXTAREA") {
    return r;
  } else {
    return undefined;
  }
}
const Nt = /url\((?:(')([^']*)'|(")([^"]*)"|([^)]*))\)/gm;
const Et = /^[A-Za-z]+:|^\/\//;
const It = /^["']?data:.*,/i;
function Tt(t, e) {
  return t.replace(Nt, (t, o, s, r, i, a) => {
    const c = s || i || a;
    if (!e || !c || Et.test(c) || It.test(c)) {
      return t;
    }
    const u = o || r || "";
    return `url(${u}${function (t, e) {
      try {
        return n(t, e).href;
      } catch (o) {
        return t;
      }
    }(c, e)}${u})`;
  });
}
const Ct = /[^a-z1-6-_]/;
function Rt(t) {
  return t.tagName.toLowerCase();
}
function Dt(t, e) {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${t}' height='${e}' style='background-color:silver'%3E%3C/svg%3E`;
}
function _t(t) {
  if (t !== undefined && t.length !== 0) {
    return t.map(t => {
      const e = t.cssRules || t.rules;
      return {
        cssRules: Array.from(e, t => t.cssText),
        disabled: t.disabled || undefined,
        media: t.media.length > 0 ? Array.from(t.media) : undefined
      };
    });
  }
}
function Mt(t, n, a, c) {
  if (n === o.HIDDEN) {
    return null;
  }
  const u = t.getAttribute(a);
  const d = t.tagName;
  if (s(d, a, u, n, c)) {
    if (d === "IMG") {
      const e = t;
      if (e.naturalWidth > 0) {
        return Dt(e.naturalWidth, e.naturalHeight);
      }
      const {
        width: n,
        height: o
      } = t.getBoundingClientRect();
      if (n > 0 || o > 0) {
        return Dt(n, o);
      } else {
        return r;
      }
    }
    if (d === "SOURCE") {
      return r;
    } else {
      return e;
    }
  }
  if (u) {
    return i(u, 1000000);
  } else {
    return u;
  }
}
function Ot(e, n, s) {
  if (n === o.HIDDEN) {
    return {};
  }
  const r = {};
  const i = Rt(e);
  for (let t = 0; t < e.attributes.length; t += 1) {
    const o = e.attributes.item(t).name;
    const i = Mt(e, n, o, s.scope.configuration);
    if (i !== null) {
      r[o] = i;
    }
  }
  if (e.value && (i === "textarea" || i === "select" || i === "option" || i === "input")) {
    const t = xt(e, n);
    if (t !== undefined) {
      r.value = t;
    }
  }
  if (i === "option") {
    const o = e;
    if (o.selected && !t(o, n)) {
      r.selected = "";
    } else {
      delete r.selected;
    }
  }
  const a = e;
  if (i === "input" && (a.type === "radio" || a.type === "checkbox")) {
    if (a.checked && !t(a, n)) {
      r.checked = "";
    } else {
      delete r.checked;
    }
  }
  return r;
}
function Lt(t, e, n) {
  if (e === o.HIDDEN) {
    return {};
  }
  const s = {};
  const r = t.ownerDocument;
  const i = Rt(t);
  if (i === "link") {
    const e = Array.from(r.styleSheets).find(e => e.href === t.href);
    const o = kt(e);
    if (o && e) {
      n.addMetric("cssText", o.length);
      s._cssText = o;
    }
  }
  if (i === "style" && t.sheet) {
    const e = kt(t.sheet);
    if (e) {
      n.addMetric("cssText", e.length);
      s._cssText = e;
    }
  }
  if (i === "audio" || i === "video") {
    const e = t;
    s.rr_mediaState = e.paused ? "paused" : "played";
  }
  let a;
  let c;
  switch (n.kind) {
    case 0:
      a = Math.round(t.scrollTop);
      c = Math.round(t.scrollLeft);
      if (a || c) {
        n.scope.elementsScrollPositions.set(t, {
          scrollTop: a,
          scrollLeft: c
        });
      }
      break;
    case 1:
      if (n.scope.elementsScrollPositions.has(t)) {
        ({
          scrollTop: a,
          scrollLeft: c
        } = n.scope.elementsScrollPositions.get(t));
      }
  }
  if (c) {
    s.rr_scrollLeft = c;
  }
  if (a) {
    s.rr_scrollTop = a;
  }
  return s;
}
function kt(t) {
  if (!t) {
    return null;
  }
  let e;
  try {
    e = t.rules || t.cssRules;
  } catch (n) {}
  if (!e) {
    return null;
  }
  return Tt(Array.from(e, a() ? Pt : At).join(""), t.href);
}
function Pt(t) {
  if (function (t) {
    return "selectorText" in t;
  }(t) && t.selectorText.includes(":")) {
    const e = /(\[[\w-]+[^\\])(:[^\]]+\])/g;
    return t.cssText.replace(e, "$1\\$2");
  }
  return At(t);
}
function At(t) {
  return function (t) {
    return "styleSheet" in t;
  }(t) && kt(t.styleSheet) || t.cssText;
}
function Vt(t, e, n) {
  switch (t.nodeType) {
    case t.DOCUMENT_NODE:
      return function (t, e, n) {
        return {
          type: ot,
          id: n.assignId(t),
          childNodes: zt(t, e, n),
          adoptedStyleSheets: _t(t.adoptedStyleSheets)
        };
      }(t, e, n);
    case t.DOCUMENT_FRAGMENT_NODE:
      return function (t, e, n) {
        const o = m(t);
        if (o) {
          n.scope.shadowRootsController.addShadowRoot(t, n.scope);
        }
        return {
          type: ct,
          id: n.assignId(t),
          childNodes: zt(t, e, n),
          isShadowRoot: o,
          adoptedStyleSheets: o ? _t(t.adoptedStyleSheets) : undefined
        };
      }(t, e, n);
    case t.DOCUMENT_TYPE_NODE:
      return function (t, e) {
        return {
          type: st,
          id: e.assignId(t),
          name: t.name,
          publicId: t.publicId,
          systemId: t.systemId
        };
      }(t, n);
    case t.ELEMENT_NODE:
      return function (t, e, n) {
        const s = function (t) {
          const e = t.toLowerCase().trim();
          if (Ct.test(e)) {
            return "div";
          } else {
            return e;
          }
        }(t.tagName);
        a = t;
        const r = a.tagName === "svg" || a instanceof SVGElement || undefined;
        const i = u(d(t), e);
        var a;
        if (i === o.HIDDEN) {
          const {
            width: e,
            height: o
          } = t.getBoundingClientRect();
          return {
            type: rt,
            id: n.assignId(t),
            tagName: s,
            attributes: {
              rr_width: `${e}px`,
              rr_height: `${o}px`,
              [f]: l
            },
            childNodes: [],
            isSVG: r
          };
        }
        if (i === o.IGNORE) {
          return null;
        }
        const c = n.assignId(t);
        const m = function (t, e, n) {
          return {
            ...Ot(t, e, n),
            ...Lt(t, e, n)
          };
        }(t, i, n);
        let h = [];
        if (p(t) && s !== "style") {
          h = zt(t, i, n);
        }
        return {
          type: rt,
          id: c,
          tagName: s,
          attributes: m,
          childNodes: h,
          isSVG: r
        };
      }(t, e, n);
    case t.TEXT_NODE:
      return function (t, e, n) {
        const o = c(t, e);
        if (o === undefined) {
          return null;
        }
        return {
          type: it,
          id: n.assignId(t),
          textContent: o
        };
      }(t, e, n);
    case t.CDATA_SECTION_NODE:
      return function (t, e) {
        return {
          type: at,
          id: e.assignId(t),
          textContent: ""
        };
      }(t, n);
    default:
      return null;
  }
}
function zt(t, e, n) {
  const o = [];
  h(t, t => {
    const s = Vt(t, e, n);
    if (s) {
      o.push(s);
    }
  });
  return o;
}
function Ht(t, e) {
  return Vt(t, e.scope.configuration.defaultPrivacyLevel, e);
}
function Ft(t, e, n) {
  t[e].count += 1;
  t[e].max = Math.max(t[e].max, n);
  t[e].sum += n;
}
function $t(t, e, n, o, s) {
  const r = [];
  const i = {
    cssText: {
      count: 0,
      max: 0,
      sum: 0
    },
    serializationDuration: {
      count: 0,
      max: 0,
      sum: 0
    }
  };
  const a = {
    add(t) {
      r.push(t);
    },
    addMetric(t, e) {
      Ft(i, t, e);
    },
    assignId(t) {
      const e = o.nodeIds.assign(t);
      if (a.serializedNodeIds) {
        a.serializedNodeIds.add(e);
      }
      return e;
    },
    kind: t,
    scope: o
  };
  const c = g();
  s(a);
  Ft(i, "serializationDuration", y(c, g()));
  for (const u of r) {
    e(u);
  }
  n(i);
}
const Bt = (t, e) => {
  const n = window.visualViewport;
  const o = {
    layoutViewportX: t,
    layoutViewportY: e,
    visualViewportX: t,
    visualViewportY: e
  };
  if (n) {
    if (!function (t) {
      return Math.abs(t.pageTop - t.offsetTop - window.scrollY) > 25 || Math.abs(t.pageLeft - t.offsetLeft - window.scrollX) > 25;
    }(n)) {
      o.visualViewportX = Math.round(t - n.offsetLeft);
      o.visualViewportY = Math.round(e - n.offsetTop);
    } else {
      o.layoutViewportX = Math.round(t + n.offsetLeft);
      o.layoutViewportY = Math.round(e + n.offsetTop);
    }
    return o;
  } else {
    return o;
  }
};
const Gt = t => ({
  scale: t.scale,
  offsetLeft: t.offsetLeft,
  offsetTop: t.offsetTop,
  pageLeft: t.pageLeft,
  pageTop: t.pageTop,
  height: t.height,
  width: t.width
});
function Ut(t, e, n, o, s) {
  $t(e, n, o, s, e => {
    const {
      width: n,
      height: o
    } = v();
    e.add({
      data: {
        height: o,
        href: window.location.href,
        width: n
      },
      type: K,
      timestamp: t
    });
    e.add({
      data: {
        has_focus: document.hasFocus()
      },
      type: Q,
      timestamp: t
    });
    e.add({
      data: {
        node: Ht(document, e),
        initialOffset: {
          left: w(),
          top: b()
        }
      },
      type: J,
      timestamp: t
    });
    if (window.visualViewport) {
      e.add({
        data: Gt(window.visualViewport),
        type: et,
        timestamp: t
      });
    }
  });
}
function Xt(t) {
  return Boolean(t.changedTouches);
}
function Yt(t) {
  if (t.composed === true && x(t.target)) {
    return t.composedPath()[0];
  } else {
    return t.target;
  }
}
function jt(t, e) {
  return {
    data: {
      source: t,
      ...e
    },
    type: Z,
    timestamp: g()
  };
}
function Wt(t, e) {
  const {
    throttled: n,
    cancel: o
  } = N(n => {
    const o = Yt(n);
    const s = e.nodeIds.get(o);
    if (s === undefined) {
      return;
    }
    const r = qt(n);
    if (!r) {
      return;
    }
    const i = {
      id: s,
      timeOffset: 0,
      x: r.x,
      y: r.y
    };
    t(jt(Xt(n) ? ht : dt, {
      positions: [i]
    }));
  }, 50, {
    trailing: false
  });
  const {
    stop: s
  } = E(e.configuration, document, ["mousemove", "touchmove"], n, {
    capture: true,
    passive: true
  });
  return {
    stop: () => {
      s();
      o();
    }
  };
}
function qt(t) {
  let {
    clientX: e,
    clientY: n
  } = Xt(t) ? t.changedTouches[0] : t;
  if (window.visualViewport) {
    const {
      visualViewportX: t,
      visualViewportY: o
    } = Bt(e, n);
    e = t;
    n = o;
  }
  if (Number.isFinite(e) && Number.isFinite(n)) {
    return {
      x: e,
      y: n
    };
  }
}
const Jt = {
  pointerup: 0,
  mousedown: 1,
  click: 2,
  contextmenu: 3,
  dblclick: 4,
  focus: vt,
  blur: bt,
  touchstart: 7,
  touchend: 9
};
function Zt(t, e) {
  return E(e.configuration, document, Object.keys(Jt), n => {
    const s = Yt(n);
    const r = e.nodeIds.get(s);
    if (r === undefined || I(s, e.configuration.defaultPrivacyLevel) === o.HIDDEN) {
      return;
    }
    const i = Jt[n.type];
    let a;
    if (i !== bt && i !== vt) {
      const t = qt(n);
      if (!t) {
        return;
      }
      a = {
        id: r,
        type: i,
        x: t.x,
        y: t.y
      };
    } else {
      a = {
        id: r,
        type: i
      };
    }
    t({
      id: e.eventIds.getIdForEvent(n),
      ...jt(lt, a)
    });
  }, {
    capture: true,
    passive: true
  });
}
function Kt(t, e, n) {
  const {
    throttled: s,
    cancel: r
  } = N(t => {
    const s = Yt(t);
    if (!s) {
      return;
    }
    const r = n.nodeIds.get(s);
    if (r === undefined || I(s, n.configuration.defaultPrivacyLevel) === o.HIDDEN) {
      return;
    }
    const i = s === document ? {
      scrollTop: b(),
      scrollLeft: w()
    } : {
      scrollTop: Math.round(s.scrollTop),
      scrollLeft: Math.round(s.scrollLeft)
    };
    n.elementsScrollPositions.set(s, i);
    e(jt(ft, {
      id: r,
      x: i.scrollLeft,
      y: i.scrollTop
    }));
  }, 100);
  const {
    stop: i
  } = T(n.configuration, t, "scroll", s, {
    capture: true,
    passive: true
  });
  return {
    stop: () => {
      i();
      r();
    }
  };
}
function Qt(t, e) {
  const n = C(e.configuration).subscribe(e => {
    t(jt(pt, e));
  });
  return {
    stop: () => {
      n.unsubscribe();
    }
  };
}
function te(t, e) {
  const n = window.visualViewport;
  if (!n) {
    return {
      stop: R
    };
  }
  const {
    throttled: o,
    cancel: s
  } = N(() => {
    t({
      data: Gt(n),
      type: et,
      timestamp: g()
    });
  }, 200, {
    trailing: false
  });
  const {
    stop: r
  } = E(e.configuration, n, ["resize", "scroll"], o, {
    capture: true,
    passive: true
  });
  return {
    stop: () => {
      r();
      s();
    }
  };
}
function ee(t, e) {
  return E(e.configuration, document, ["play", "pause"], n => {
    const s = Yt(n);
    if (!s) {
      return;
    }
    const r = e.nodeIds.get(s);
    if (r !== undefined && I(s, e.configuration.defaultPrivacyLevel) !== o.HIDDEN) {
      t(jt(gt, {
        id: r,
        type: n.type === "play" ? wt : St
      }));
    }
  }, {
    capture: true,
    passive: true
  });
}
function ne(t, e) {
  function n(t, n) {
    if (!t || !t.ownerNode) {
      return;
    }
    const o = e.nodeIds.get(t.ownerNode);
    if (o !== undefined) {
      n(o);
    }
  }
  const o = [D(CSSStyleSheet.prototype, "insertRule", ({
    target: e,
    parameters: [o, s]
  }) => {
    n(e, e => t(jt(yt, {
      id: e,
      adds: [{
        rule: o,
        index: s
      }]
    })));
  }), D(CSSStyleSheet.prototype, "deleteRule", ({
    target: e,
    parameters: [o]
  }) => {
    n(e, e => t(jt(yt, {
      id: e,
      removes: [{
        index: o
      }]
    })));
  })];
  function s(e) {
    o.push(D(e.prototype, "insertRule", ({
      target: e,
      parameters: [o, s]
    }) => {
      n(e.parentStyleSheet, n => {
        const r = oe(e);
        if (r) {
          r.push(s || 0);
          t(jt(yt, {
            id: n,
            adds: [{
              rule: o,
              index: r
            }]
          }));
        }
      });
    }), D(e.prototype, "deleteRule", ({
      target: e,
      parameters: [o]
    }) => {
      n(e.parentStyleSheet, n => {
        const s = oe(e);
        if (s) {
          s.push(o);
          t(jt(yt, {
            id: n,
            removes: [{
              index: s
            }]
          }));
        }
      });
    }));
  }
  if (typeof CSSGroupingRule != "undefined") {
    s(CSSGroupingRule);
  } else {
    s(CSSMediaRule);
    s(CSSSupportsRule);
  }
  return {
    stop: () => {
      o.forEach(t => t.stop());
    }
  };
}
function oe(t) {
  const e = [];
  let n = t;
  while (n.parentRule) {
    const t = Array.from(n.parentRule.cssRules).indexOf(n);
    e.unshift(t);
    n = n.parentRule;
  }
  if (!n.parentStyleSheet) {
    return;
  }
  const o = Array.from(n.parentStyleSheet.cssRules).indexOf(n);
  e.unshift(o);
  return e;
}
function se(t, e) {
  return E(e.configuration, window, ["focus", "blur"], () => {
    t({
      data: {
        has_focus: document.hasFocus()
      },
      type: Q,
      timestamp: g()
    });
  });
}
function re(t, e, n) {
  const o = t.subscribe(12, t => {
    if (t.rawRumEvent.type === _.ACTION && t.rawRumEvent.action.type === M.CLICK && t.rawRumEvent.action.frustration?.type?.length && "events" in t.domainContext && t.domainContext.events && t.domainContext.events.length) {
      e({
        timestamp: t.rawRumEvent.date,
        type: nt,
        data: {
          frustrationTypes: t.rawRumEvent.action.frustration.type,
          recordIds: t.domainContext.events.map(t => n.eventIds.getIdForEvent(t))
        }
      });
    }
  });
  return {
    stop: () => {
      o.unsubscribe();
    }
  };
}
function ie(t, e, n) {
  const o = t.subscribe(5, () => {
    n();
    e({
      timestamp: g(),
      type: tt
    });
  });
  return {
    stop: () => {
      o.unsubscribe();
    }
  };
}
function ae(e, n, s) {
  const r = s.configuration.defaultPrivacyLevel;
  const i = new WeakMap();
  const a = e !== document;
  const {
    stop: c
  } = E(s.configuration, e, a ? ["change"] : ["input", "change"], t => {
    const e = Yt(t);
    if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement) {
      d(e);
    }
  }, {
    capture: true,
    passive: true
  });
  let u;
  if (a) {
    u = R;
  } else {
    const t = [O(HTMLInputElement.prototype, "value", d), O(HTMLInputElement.prototype, "checked", d), O(HTMLSelectElement.prototype, "value", d), O(HTMLTextAreaElement.prototype, "value", d), O(HTMLSelectElement.prototype, "selectedIndex", d)];
    u = () => {
      t.forEach(t => t.stop());
    };
  }
  return {
    stop: () => {
      u();
      c();
    }
  };
  function d(e) {
    const n = I(e, r);
    if (n === o.HIDDEN) {
      return;
    }
    const s = e.type;
    let i;
    if (s === "radio" || s === "checkbox") {
      if (t(e, n)) {
        return;
      }
      i = {
        isChecked: e.checked
      };
    } else {
      const t = xt(e, n);
      if (t === undefined) {
        return;
      }
      i = {
        text: t
      };
    }
    l(e, i);
    const a = e.name;
    if (s === "radio" && a && e.checked) {
      document.querySelectorAll(`input[type="radio"][name="${CSS.escape(a)}"]`).forEach(t => {
        if (t !== e) {
          l(t, {
            isChecked: false
          });
        }
      });
    }
  }
  function l(t, e) {
    const o = s.nodeIds.get(t);
    if (o === undefined) {
      return;
    }
    const r = i.get(t);
    if (!r || r.text !== e.text || r.isChecked !== e.isChecked) {
      i.set(t, e);
      n(jt(mt, {
        id: o,
        ...e
      }));
    }
  }
}
function ce(t, e, n, s) {
  const r = k();
  if (!r) {
    return {
      stop: R,
      flush: R
    };
  }
  const i = function (t) {
    let e = R;
    let n = [];
    function o() {
      e();
      t(n);
      n = [];
    }
    const {
      throttled: s,
      cancel: r
    } = N(o, 16, {
      leading: false
    });
    return {
      addMutations: t => {
        if (n.length === 0) {
          e = L(s, {
            timeout: 100
          });
        }
        n.push(...t);
      },
      flush: o,
      stop: () => {
        e();
        r();
      }
    };
  }(t => {
    $t(2, e, n, s, e => function (t, e) {
      const n = new Map();
      t.filter(t => t.type === "childList").forEach(t => {
        t.removedNodes.forEach(t => {
          ue(t, e.scope.shadowRootsController.removeShadowRoot);
        });
      });
      const s = t.filter(t => t.target.isConnected && e.scope.nodeIds.areAssignedForNodeAndAncestors(t.target) && I(t.target, e.scope.configuration.defaultPrivacyLevel, n) !== o.HIDDEN);
      const {
        adds: r,
        removes: i,
        hasBeenSerialized: a
      } = function (t, e, n) {
        const s = new Set();
        const r = new Map();
        for (const o of t) {
          o.addedNodes.forEach(t => {
            s.add(t);
          });
          o.removedNodes.forEach(t => {
            if (!s.has(t)) {
              r.set(t, o.target);
            }
            s.delete(t);
          });
        }
        const i = Array.from(s);
        a = i;
        a.sort((t, e) => {
          const n = t.compareDocumentPosition(e);
          if (n & Node.DOCUMENT_POSITION_CONTAINED_BY) {
            return -1;
          } else if (n & Node.DOCUMENT_POSITION_CONTAINS || n & Node.DOCUMENT_POSITION_FOLLOWING) {
            return 1;
          } else if (n & Node.DOCUMENT_POSITION_PRECEDING) {
            return -1;
          } else {
            return 0;
          }
        });
        n.serializedNodeIds = new Set();
        var a;
        const c = [];
        for (const f of i) {
          if (d(f)) {
            continue;
          }
          const t = I(f.parentNode, n.scope.configuration.defaultPrivacyLevel, e);
          if (t === o.HIDDEN || t === o.IGNORE) {
            continue;
          }
          const s = Vt(f, t, n);
          if (!s) {
            continue;
          }
          const r = S(f);
          c.push({
            nextId: l(f),
            parentId: n.scope.nodeIds.get(r),
            node: s
          });
        }
        const u = [];
        r.forEach((t, e) => {
          const o = n.scope.nodeIds.get(t);
          const s = n.scope.nodeIds.get(e);
          if (o !== undefined && s !== undefined) {
            u.push({
              parentId: o,
              id: s
            });
          }
        });
        return {
          adds: c,
          removes: u,
          hasBeenSerialized: d
        };
        function d(t) {
          var e;
          const o = n.scope.nodeIds.get(t);
          return o !== undefined && ((e = n.serializedNodeIds) === null || e === undefined ? undefined : e.has(o));
        }
        function l(t) {
          let e = t.nextSibling;
          while (e) {
            const t = n.scope.nodeIds.get(e);
            if (t !== undefined) {
              return t;
            }
            e = e.nextSibling;
          }
          return null;
        }
      }(s.filter(t => t.type === "childList"), n, e);
      const u = function (t, e, n) {
        const r = [];
        const i = new Set();
        const a = t.filter(t => !i.has(t.target) && (i.add(t.target), true));
        for (const u of a) {
          if (u.target.textContent === u.oldValue) {
            continue;
          }
          const t = n.scope.nodeIds.get(u.target);
          if (t === undefined) {
            continue;
          }
          const i = I(S(u.target), n.scope.configuration.defaultPrivacyLevel, e);
          if (i !== o.HIDDEN && i !== o.IGNORE) {
            r.push({
              id: t,
              value: c(u.target, i) ?? null
            });
          }
        }
        return r;
      }(s.filter(t => t.type === "characterData" && !a(t.target)), n, e);
      const d = function (t, e, n) {
        const o = [];
        const s = new Map();
        const r = t.filter(t => {
          const e = s.get(t.target);
          return (!e || !e.has(t.attributeName)) && (e ? e.add(t.attributeName) : s.set(t.target, new Set([t.attributeName])), true);
        });
        const i = new Map();
        for (const a of r) {
          if (a.target.getAttribute(a.attributeName) === a.oldValue) {
            continue;
          }
          const t = n.scope.nodeIds.get(a.target);
          if (t === undefined) {
            continue;
          }
          const s = I(a.target, n.scope.configuration.defaultPrivacyLevel, e);
          const r = Mt(a.target, s, a.attributeName, n.scope.configuration);
          let c;
          if (a.attributeName === "value") {
            const t = xt(a.target, s);
            if (t === undefined) {
              continue;
            }
            c = t;
          } else {
            c = typeof r == "string" ? r : null;
          }
          let u = i.get(a.target);
          if (!u) {
            u = {
              id: t,
              attributes: {}
            };
            o.push(u);
            i.set(a.target, u);
          }
          u.attributes[a.attributeName] = c;
        }
        return o;
      }(s.filter(t => t.type === "attributes" && !a(t.target)), n, e);
      if (!u.length && !d.length && !i.length && !r.length) {
        return;
      }
      e.add(jt(ut, {
        adds: r,
        removes: i,
        texts: u,
        attributes: d
      }));
    }(t.concat(a.takeRecords()), e));
  });
  const a = new r(P(i.addMutations));
  a.observe(t, {
    attributeOldValue: true,
    attributes: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true
  });
  return {
    stop: () => {
      a.disconnect();
      i.stop();
    },
    flush: () => {
      i.flush();
    }
  };
}
function ue(t, e) {
  if (x(t)) {
    e(t.shadowRoot);
  }
  h(t, t => ue(t, e));
}
function de(t) {
  const {
    emitRecord: e,
    emitStats: n,
    configuration: o,
    lifeCycle: s
  } = t;
  if (!e || !n) {
    throw new Error("emit functions are required");
  }
  const r = n => {
    e(n);
    A("record", {
      record: n
    });
    const o = t.viewHistory.findView();
    V(o.id);
  };
  const i = ((t, e) => {
    const n = new Map();
    return {
      addShadowRoot: (o, s) => {
        if (n.has(o)) {
          return;
        }
        const r = ce(o, t, e, s);
        const i = ae(o, t, s);
        const a = Kt(o, t, s);
        n.set(o, {
          flush: () => r.flush(),
          stop: () => {
            r.stop();
            i.stop();
            a.stop();
          }
        });
      },
      removeShadowRoot: t => {
        const e = n.get(t);
        if (e) {
          e.stop();
          n.delete(t);
        }
      },
      stop: () => {
        n.forEach(({
          stop: t
        }) => t());
      },
      flush: () => {
        n.forEach(({
          flush: t
        }) => t());
      }
    };
  })(r, n);
  const a = function (t, e, n, o, s) {
    return {
      configuration: t,
      elementsScrollPositions: e,
      eventIds: n,
      nodeIds: o,
      shadowRootsController: s
    };
  }(o, function () {
    const t = new WeakMap();
    return {
      set(e, n) {
        if (e !== document || document.scrollingElement) {
          t.set(e === document ? document.scrollingElement : e, n);
        }
      },
      get: e => t.get(e),
      has: e => t.has(e)
    };
  }(), function () {
    const t = new WeakMap();
    let e = 1;
    return {
      getIdForEvent: n => {
        if (!t.has(n)) {
          t.set(n, e++);
        }
        return t.get(n);
      }
    };
  }(), function () {
    const t = new WeakMap();
    let e = 0;
    const n = e => t.get(e);
    return {
      assign: o => {
        let s = n(o);
        if (s === undefined) {
          s = e++;
          t.set(o, s);
        }
        return s;
      },
      get: n,
      areAssignedForNodeAndAncestors: t => {
        let e = t;
        while (e) {
          if (n(e) === undefined && !m(e)) {
            return false;
          }
          e = S(e);
        }
        return true;
      }
    };
  }(), i);
  const {
    stop: c
  } = function (t, e, n, o, s) {
    Ut(g(), 0, e, n, s);
    const {
      unsubscribe: r
    } = t.subscribe(2, t => {
      o();
      Ut(t.startClocks.timeStamp, 1, e, n, s);
    });
    return {
      stop: r
    };
  }(s, r, n, u, a);
  function u() {
    i.flush();
    d.flush();
  }
  const d = ce(document, r, n, a);
  const l = [d, Wt(r, a), Zt(r, a), Kt(document, r, a), Qt(r, a), ae(document, r, a), ee(r, a), ne(r, a), se(r, a), te(r, a), re(s, r, a), ie(s, r, u)];
  return {
    stop: () => {
      i.stop();
      l.forEach(t => t.stop());
      c();
    },
    flushMutations: u,
    shadowRootsController: i
  };
}
function le({
  context: t,
  creationReason: e,
  encoder: n
}) {
  let o = 0;
  const s = t.view.id;
  const r = {
    start: Infinity,
    end: -Infinity,
    creation_reason: e,
    records_count: 0,
    has_full_snapshot: false,
    index_in_view: z(s),
    source: "browser",
    ...t
  };
  const i = {
    cssText: {
      count: 0,
      max: 0,
      sum: 0
    },
    serializationDuration: {
      count: 0,
      max: 0,
      sum: 0
    }
  };
  H(s);
  return {
    addRecord: function (t, e) {
      r.start = Math.min(r.start, t.timestamp);
      r.end = Math.max(r.end, t.timestamp);
      r.records_count += 1;
      r.has_full_snapshot ||= t.type === J;
      const s = n.isEmpty ? "{\"records\":[" : ",";
      n.write(s + JSON.stringify(t), t => {
        o += t;
        e(o);
      });
    },
    addStats: function (t) {
      (function (t, e) {
        for (const n of ["cssText", "serializationDuration"]) {
          t[n].count += e[n].count;
          t[n].max = Math.max(t[n].max, e[n].max);
          t[n].sum += e[n].sum;
        }
      })(i, t);
    },
    flush: function (t) {
      if (n.isEmpty) {
        throw new Error("Empty segment flushed");
      }
      n.write(`],${JSON.stringify(r).slice(1)}\n`);
      n.finish(e => {
        F(r.view.id, e.rawBytesCount);
        t(r, i, e);
      });
    }
  };
}
const fe = U * 5;
let pe = 60000;
function me(t, e, n, o, s, r) {
  return function (t, e, n, o) {
    let s = {
      status: 0,
      nextSegmentCreationReason: "init"
    };
    const {
      unsubscribe: r
    } = t.subscribe(2, () => {
      a("view_change");
    });
    const {
      unsubscribe: i
    } = t.subscribe(11, t => {
      a(t.reason);
    });
    function a(t) {
      if (s.status === 1) {
        s.segment.flush((e, o, s) => {
          const r = function (t, e, n, o) {
            const s = new FormData();
            s.append("segment", new Blob([t], {
              type: "application/octet-stream"
            }), `${e.session.id}-${e.start}`);
            const r = {
              raw_segment_size: o,
              compressed_segment_size: t.byteLength,
              ...e
            };
            const i = JSON.stringify(r);
            s.append("event", new Blob([i], {
              type: "application/json"
            }));
            return {
              data: s,
              bytesCount: t.byteLength,
              cssText: n.cssText,
              isFullSnapshot: e.index_in_view === 0,
              rawSize: o,
              recordCount: e.records_count,
              serializationDuration: n.serializationDuration
            };
          }(s.output, e, o, s.rawBytesCount);
          if ($(t)) {
            n.sendOnExit(r);
          } else {
            n.send(r);
          }
        });
        B(s.expirationTimeoutId);
      }
      s = t !== "stop" ? {
        status: 0,
        nextSegmentCreationReason: t
      } : {
        status: 2
      };
    }
    return {
      addRecord: t => {
        if (s.status !== 2) {
          if (s.status === 0) {
            const t = e();
            if (!t) {
              return;
            }
            s = {
              status: 1,
              segment: le({
                encoder: o,
                context: t,
                creationReason: s.nextSegmentCreationReason
              }),
              expirationTimeoutId: G(() => {
                a("segment_duration_limit");
              }, fe)
            };
          }
          s.segment.addRecord(t, t => {
            if (t > pe) {
              a("segment_bytes_limit");
            }
          });
        }
      },
      addStats: t => {
        if (s.status === 1) {
          s.segment.addStats(t);
        }
      },
      stop: () => {
        a("stop");
        r();
        i();
      }
    };
  }(t, () => function (t, e, n) {
    const o = e.findTrackedSession();
    const s = n.findView();
    if (!o || !s) {
      return;
    }
    return {
      application: {
        id: t
      },
      session: {
        id: o.id
      },
      view: {
        id: s.id
      }
    };
  }(e.applicationId, n, o), s, r);
}
function he(t, e, n, o, s, r, i) {
  const a = [];
  const c = i || j([e.sessionReplayEndpointBuilder], e => {
    t.notify(14, {
      error: e
    });
    q("Error reported to customer", {
      "error.message": e.message
    });
  }, pe);
  let u;
  let d;
  if (W()) {
    ({
      addRecord: u
    } = function (t) {
      const e = Y();
      return {
        addRecord: n => {
          const o = t.findView();
          e.send("record", n, o.id);
        }
      };
    }(o));
    d = R;
  } else {
    const i = me(t, e, n, o, c, s);
    u = i.addRecord;
    d = i.addStats;
    a.push(i.stop);
    const l = function (t, e) {
      if (!t.metricsEnabled) {
        return {
          stop: R
        };
      }
      const {
        unsubscribe: n
      } = e.subscribe(t => {
        if (t.type === "failure" || t.type === "queue-full" || t.type === "success" && t.payload.isFullSnapshot) {
          e = t.type;
          n = t.bandwidth;
          const s = {
            cssText: {
              count: (o = t.payload).cssText.count,
              max: o.cssText.max,
              sum: o.cssText.sum
            },
            isFullSnapshot: o.isFullSnapshot,
            ongoingRequests: {
              count: n.ongoingRequestCount,
              totalSize: n.ongoingByteCount
            },
            recordCount: o.recordCount,
            result: e,
            serializationDuration: {
              count: o.serializationDuration.count,
              max: o.serializationDuration.max,
              sum: o.serializationDuration.sum
            },
            size: {
              compressed: o.bytesCount,
              raw: o.rawSize
            }
          };
          X("Segment network request metrics", {
            metrics: s
          });
        }
        var e;
        var n;
        var o;
      });
      return {
        stop: n
      };
    }(r, c.observable);
    a.push(l.stop);
  }
  const {
    stop: l
  } = de({
    emitRecord: u,
    emitStats: d,
    configuration: e,
    lifeCycle: t,
    viewHistory: o
  });
  a.push(l);
  return {
    stop: () => {
      a.forEach(t => t());
    }
  };
}
export { he as startRecording };