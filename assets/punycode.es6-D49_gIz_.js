const o = 2147483647;
const t = 36;
const n = /^xn--/;
const e = /[^\0-\x7F]/;
const r = /[\x2E\u3002\uFF0E\uFF61]/g;
const c = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
};
const s = Math.floor;
const i = String.fromCharCode;
function u(o) {
  throw new RangeError(c[o]);
}
function l(o, t) {
  const n = o.split("@");
  let e = "";
  if (n.length > 1) {
    e = n[0] + "@";
    o = n[1];
  }
  const c = function (o, t) {
    const n = [];
    let e = o.length;
    while (e--) {
      n[e] = t(o[e]);
    }
    return n;
  }((o = o.replace(r, ".")).split("."), t).join(".");
  return e + c;
}
function f(o) {
  const t = [];
  let n = 0;
  const e = o.length;
  while (n < e) {
    const r = o.charCodeAt(n++);
    if (r >= 55296 && r <= 56319 && n < e) {
      const e = o.charCodeAt(n++);
      if ((e & 64512) == 56320) {
        t.push(((r & 1023) << 10) + (e & 1023) + 65536);
      } else {
        t.push(r);
        n--;
      }
    } else {
      t.push(r);
    }
  }
  return t;
}
const d = o => String.fromCodePoint(...o);
const a = function (o) {
  if (o >= 48 && o < 58) {
    return o - 48 + 26;
  } else if (o >= 65 && o < 91) {
    return o - 65;
  } else if (o >= 97 && o < 123) {
    return o - 97;
  } else {
    return t;
  }
};
const p = function (o, t) {
  return o + 22 + (o < 26) * 75 - ((t != 0) << 5);
};
const h = function (o, n, e) {
  let r = 0;
  o = e ? s(o / 700) : o >> 1;
  o += s(o / n);
  for (; o > 455; r += t) {
    o = s(o / 35);
  }
  return s(r + o * 36 / (o + 38));
};
const g = function (n) {
  const e = [];
  const r = n.length;
  let c = 0;
  let i = 128;
  let l = 72;
  let f = n.lastIndexOf("-");
  if (f < 0) {
    f = 0;
  }
  for (let o = 0; o < f; ++o) {
    if (n.charCodeAt(o) >= 128) {
      u("not-basic");
    }
    e.push(n.charCodeAt(o));
  }
  for (let d = f > 0 ? f + 1 : 0; d < r;) {
    const f = c;
    for (let e = 1, i = t;; i += t) {
      if (d >= r) {
        u("invalid-input");
      }
      const f = a(n.charCodeAt(d++));
      if (f >= t) {
        u("invalid-input");
      }
      if (f > s((o - c) / e)) {
        u("overflow");
      }
      c += f * e;
      const p = i <= l ? 1 : i >= l + 26 ? 26 : i - l;
      if (f < p) {
        break;
      }
      const h = t - p;
      if (e > s(o / h)) {
        u("overflow");
      }
      e *= h;
    }
    const p = e.length + 1;
    l = h(c - f, p, f == 0);
    if (s(c / p) > o - i) {
      u("overflow");
    }
    i += s(c / p);
    c %= p;
    e.splice(c++, 0, i);
  }
  return String.fromCodePoint(...e);
};
const v = function (n) {
  const e = [];
  const r = (n = f(n)).length;
  let c = 128;
  let l = 0;
  let d = 72;
  for (const o of n) {
    if (o < 128) {
      e.push(i(o));
    }
  }
  const a = e.length;
  let g = a;
  for (a && e.push("-"); g < r;) {
    let r = o;
    for (const o of n) {
      if (o >= c && o < r) {
        r = o;
      }
    }
    const f = g + 1;
    if (r - c > s((o - l) / f)) {
      u("overflow");
    }
    l += (r - c) * f;
    c = r;
    for (const v of n) {
      if (v < c && ++l > o) {
        u("overflow");
      }
      if (v === c) {
        let o = l;
        for (let n = t;; n += t) {
          const r = n <= d ? 1 : n >= d + 26 ? 26 : n - d;
          if (o < r) {
            break;
          }
          const c = o - r;
          const u = t - r;
          e.push(i(p(r + c % u, 0)));
          o = s(c / u);
        }
        e.push(i(p(o, 0)));
        d = h(l, f, g === a);
        l = 0;
        ++g;
      }
    }
    ++l;
    ++c;
  }
  return e.join("");
};
const C = function (o) {
  return l(o, function (o) {
    if (n.test(o)) {
      return g(o.slice(4).toLowerCase());
    } else {
      return o;
    }
  });
};
const w = function (o) {
  return l(o, function (o) {
    if (e.test(o)) {
      return "xn--" + v(o);
    } else {
      return o;
    }
  });
};
const b = {
  version: "2.3.1",
  ucs2: {
    decode: f,
    encode: d
  },
  decode: g,
  encode: v,
  toASCII: w,
  toUnicode: C
};
const x = Object.freeze(Object.defineProperty({
  __proto__: null,
  decode: g,
  default: b,
  encode: v,
  toASCII: w,
  toUnicode: C,
  ucs2decode: f,
  ucs2encode: d
}, Symbol.toStringTag, {
  value: "Module"
}));
export { x as p, C as t };