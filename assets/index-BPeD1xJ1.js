import { o as e, l as t, f as n, m as a } from "./sidepanel-BoLm9pmH.js";
import "./index-5uYI7rOK.js";
import "./index-BVS4T5_D.js";
import "./PermissionManager-9s959502.js";
import "./useStorageState-hbwNMVUA.js";
import "./mcpPermissions-qqAoJjJ8.js";
import "./punycode.es6-D49_gIz_.js";
import "./PairingPrompt-Do4C6yFu.js";
const i = {
  tokenize: function (e, t, i) {
    const o = this;
    const c = o.events[o.events.length - 1];
    const s = c && c[1].type === "linePrefix" ? c[2].sliceSerialize(c[1], true).length : 0;
    let u = 0;
    return function (t) {
      e.enter("mathFlow");
      e.enter("mathFlowFence");
      e.enter("mathFlowFenceSequence");
      return l(t);
    };
    function l(t) {
      if (t === 36) {
        e.consume(t);
        u++;
        return l;
      } else if (u < 2) {
        return i(t);
      } else {
        e.exit("mathFlowFenceSequence");
        return n(e, h, "whitespace")(t);
      }
    }
    function h(t) {
      if (t === null || a(t)) {
        return f(t);
      } else {
        e.enter("mathFlowFenceMeta");
        e.enter("chunkString", {
          contentType: "string"
        });
        return m(t);
      }
    }
    function m(t) {
      if (t === null || a(t)) {
        e.exit("chunkString");
        e.exit("mathFlowFenceMeta");
        return f(t);
      } else if (t === 36) {
        return i(t);
      } else {
        e.consume(t);
        return m;
      }
    }
    function f(n) {
      e.exit("mathFlowFence");
      if (o.interrupt) {
        return t(n);
      } else {
        return e.attempt(r, p, g)(n);
      }
    }
    function p(t) {
      return e.attempt({
        tokenize: w,
        partial: true
      }, g, d)(t);
    }
    function d(t) {
      return (s ? n(e, x, "linePrefix", s + 1) : x)(t);
    }
    function x(t) {
      if (t === null) {
        return g(t);
      } else if (a(t)) {
        return e.attempt(r, p, g)(t);
      } else {
        e.enter("mathFlowValue");
        return F(t);
      }
    }
    function F(t) {
      if (t === null || a(t)) {
        e.exit("mathFlowValue");
        return x(t);
      } else {
        e.consume(t);
        return F;
      }
    }
    function g(n) {
      e.exit("mathFlow");
      return t(n);
    }
    function w(e, t, i) {
      let r = 0;
      return n(e, function (t) {
        e.enter("mathFlowFence");
        e.enter("mathFlowFenceSequence");
        return c(t);
      }, "linePrefix", o.parser.constructs.disable.null.includes("codeIndented") ? undefined : 4);
      function c(t) {
        if (t === 36) {
          r++;
          e.consume(t);
          return c;
        } else if (r < u) {
          return i(t);
        } else {
          e.exit("mathFlowFenceSequence");
          return n(e, s, "whitespace")(t);
        }
      }
      function s(n) {
        if (n === null || a(n)) {
          e.exit("mathFlowFence");
          return t(n);
        } else {
          return i(n);
        }
      }
    }
  },
  concrete: true
};
const r = {
  tokenize: function (e, t, n) {
    const a = this;
    return function (n) {
      if (n === null) {
        return t(n);
      }
      e.enter("lineEnding");
      e.consume(n);
      e.exit("lineEnding");
      return i;
    };
    function i(e) {
      if (a.parser.lazy[a.now().line]) {
        return n(e);
      } else {
        return t(e);
      }
    }
  },
  partial: true
};
function o(e) {
  let t = (e || {}).singleDollarTextMath;
  if (t == null) {
    t = true;
  }
  return {
    tokenize: function (e, n, i) {
      let r;
      let o;
      let c = 0;
      return function (t) {
        e.enter("mathText");
        e.enter("mathTextSequence");
        return s(t);
      };
      function s(n) {
        if (n === 36) {
          e.consume(n);
          c++;
          return s;
        } else if (c < 2 && !t) {
          return i(n);
        } else {
          e.exit("mathTextSequence");
          return u(n);
        }
      }
      function u(t) {
        if (t === null) {
          return i(t);
        } else if (t === 36) {
          o = e.enter("mathTextSequence");
          r = 0;
          return h(t);
        } else if (t === 32) {
          e.enter("space");
          e.consume(t);
          e.exit("space");
          return u;
        } else if (a(t)) {
          e.enter("lineEnding");
          e.consume(t);
          e.exit("lineEnding");
          return u;
        } else {
          e.enter("mathTextData");
          return l(t);
        }
      }
      function l(t) {
        if (t === null || t === 32 || t === 36 || a(t)) {
          e.exit("mathTextData");
          return u(t);
        } else {
          e.consume(t);
          return l;
        }
      }
      function h(t) {
        if (t === 36) {
          e.consume(t);
          r++;
          return h;
        } else if (r === c) {
          e.exit("mathTextSequence");
          e.exit("mathText");
          return n(t);
        } else {
          o.type = "mathTextData";
          return l(t);
        }
      }
    },
    resolve: c,
    previous: s
  };
}
function c(e) {
  let t;
  let n;
  let a = e.length - 4;
  let i = 3;
  if ((e[i][1].type === "lineEnding" || e[i][1].type === "space") && (e[a][1].type === "lineEnding" || e[a][1].type === "space")) {
    for (t = i; ++t < a;) {
      if (e[t][1].type === "mathTextData") {
        e[a][1].type = "mathTextPadding";
        e[i][1].type = "mathTextPadding";
        i += 2;
        a -= 2;
        break;
      }
    }
  }
  t = i - 1;
  a++;
  while (++t <= a) {
    if (n === undefined) {
      if (t !== a && e[t][1].type !== "lineEnding") {
        n = t;
      }
    } else if (t === a || e[t][1].type === "lineEnding") {
      e[n][1].type = "mathTextData";
      if (t !== n + 2) {
        e[n][1].end = e[t - 1][1].end;
        e.splice(n + 2, t - n - 2);
        a -= t - n - 2;
        t = n + 2;
      }
      n = undefined;
    }
  }
  return e;
}
function s(e) {
  return e !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
const u = {};
function l(n) {
  const a = n || u;
  const r = this.data();
  const c = r.micromarkExtensions ||= [];
  const s = r.fromMarkdownExtensions ||= [];
  const l = r.toMarkdownExtensions ||= [];
  c.push(function (e) {
    return {
      flow: {
        36: i
      },
      text: {
        36: o(e)
      }
    };
  }(a));
  s.push(function () {
    return {
      enter: {
        mathFlow: function (e) {
          this.enter({
            type: "math",
            meta: null,
            value: "",
            data: {
              hName: "pre",
              hChildren: [{
                type: "element",
                tagName: "code",
                properties: {
                  className: ["language-math", "math-display"]
                },
                children: []
              }]
            }
          }, e);
        },
        mathFlowFenceMeta: function () {
          this.buffer();
        },
        mathText: function (e) {
          this.enter({
            type: "inlineMath",
            value: "",
            data: {
              hName: "code",
              hProperties: {
                className: ["language-math", "math-inline"]
              },
              hChildren: []
            }
          }, e);
          this.buffer();
        }
      },
      exit: {
        mathFlow: function (t) {
          const n = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
          const a = this.stack[this.stack.length - 1];
          e(a.type === "math");
          this.exit(t);
          a.value = n;
          const i = a.data.hChildren[0];
          e(i.type === "element");
          e(i.tagName === "code");
          i.children.push({
            type: "text",
            value: n
          });
          this.data.mathFlowInside = undefined;
        },
        mathFlowFence: function () {
          if (!this.data.mathFlowInside) {
            this.buffer();
            this.data.mathFlowInside = true;
          }
        },
        mathFlowFenceMeta: function () {
          const t = this.resume();
          const n = this.stack[this.stack.length - 1];
          e(n.type === "math");
          n.meta = t;
        },
        mathFlowValue: t,
        mathText: function (t) {
          const n = this.resume();
          const a = this.stack[this.stack.length - 1];
          e(a.type === "inlineMath");
          this.exit(t);
          a.value = n;
          a.data.hChildren.push({
            type: "text",
            value: n
          });
        },
        mathTextData: t
      }
    };
    function t(e) {
      this.config.enter.data.call(this, e);
      this.config.exit.data.call(this, e);
    }
  }());
  l.push(function (e) {
    let n = (e || {}).singleDollarTextMath;
    if (n == null) {
      n = true;
    }
    a.peek = function () {
      return "$";
    };
    return {
      unsafe: [{
        character: "\r",
        inConstruct: "mathFlowMeta"
      }, {
        character: "\n",
        inConstruct: "mathFlowMeta"
      }, {
        character: "$",
        after: n ? undefined : "\\$",
        inConstruct: "phrasing"
      }, {
        character: "$",
        inConstruct: "mathFlowMeta"
      }, {
        atBreak: true,
        character: "$",
        after: "\\$"
      }],
      handlers: {
        math: function (e, n, a, i) {
          const r = e.value || "";
          const o = a.createTracker(i);
          const c = "$".repeat(Math.max(t(r, "$") + 1, 2));
          const s = a.enter("mathFlow");
          let u = o.move(c);
          if (e.meta) {
            const t = a.enter("mathFlowMeta");
            u += o.move(a.safe(e.meta, {
              after: "\n",
              before: u,
              encode: ["$"],
              ...o.current()
            }));
            t();
          }
          u += o.move("\n");
          if (r) {
            u += o.move(r + "\n");
          }
          u += o.move(c);
          s();
          return u;
        },
        inlineMath: a
      }
    };
    function a(e, t, a) {
      let i = e.value || "";
      let r = 1;
      for (n || r++; new RegExp("(^|[^$])" + "\\$".repeat(r) + "([^$]|$)").test(i);) {
        r++;
      }
      const o = "$".repeat(r);
      if (/[^ \r\n]/.test(i) && (/^[ \r\n]/.test(i) && /[ \r\n]$/.test(i) || /^\$|\$$/.test(i))) {
        i = " " + i + " ";
      }
      let c = -1;
      while (++c < a.unsafe.length) {
        const e = a.unsafe[c];
        if (!e.atBreak) {
          continue;
        }
        const t = a.compilePattern(e);
        let n;
        while (n = t.exec(i)) {
          let e = n.index;
          if (i.codePointAt(e) === 10 && i.codePointAt(e - 1) === 13) {
            e--;
          }
          i = i.slice(0, e) + " " + i.slice(n.index + 1);
        }
      }
      return o + i + o;
    }
  }(a));
}
export { l as default };