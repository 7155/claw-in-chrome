const __vite__mapDeps = (i, m = __vite__mapDeps, d = m.f ||= ["assets/index-DeoomIOo.js", "assets/index-BVS4T5_D.js", "assets/punycode.es6-D49_gIz_.js"]) => i.map(i => d[i]);
import { r as t, j as e, c as n, g as r } from "./index-BVS4T5_D.js";
var i;
var s = {};
var o = {};
var a;
var c;
var u = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
if (!c) {
  c = 1;
  (function (t) {
    const e = function () {
      if (i) {
        return o;
      }
      i = 1;
      o.byteLength = function (t) {
        var e = a(t);
        var n = e[0];
        var r = e[1];
        return (n + r) * 3 / 4 - r;
      };
      o.toByteArray = function (t) {
        var r;
        var i;
        var s = a(t);
        var o = s[0];
        var c = s[1];
        var u = new n(function (t, e, n) {
          return (e + n) * 3 / 4 - n;
        }(0, o, c));
        var l = 0;
        var h = c > 0 ? o - 4 : o;
        for (i = 0; i < h; i += 4) {
          r = e[t.charCodeAt(i)] << 18 | e[t.charCodeAt(i + 1)] << 12 | e[t.charCodeAt(i + 2)] << 6 | e[t.charCodeAt(i + 3)];
          u[l++] = r >> 16 & 255;
          u[l++] = r >> 8 & 255;
          u[l++] = r & 255;
        }
        if (c === 2) {
          r = e[t.charCodeAt(i)] << 2 | e[t.charCodeAt(i + 1)] >> 4;
          u[l++] = r & 255;
        }
        if (c === 1) {
          r = e[t.charCodeAt(i)] << 10 | e[t.charCodeAt(i + 1)] << 4 | e[t.charCodeAt(i + 2)] >> 2;
          u[l++] = r >> 8 & 255;
          u[l++] = r & 255;
        }
        return u;
      };
      o.fromByteArray = function (e) {
        var n;
        var r = e.length;
        var i = r % 3;
        var s = [];
        for (var o = 16383, a = 0, c = r - i; a < c; a += o) {
          s.push(u(e, a, a + o > c ? c : a + o));
        }
        if (i === 1) {
          n = e[r - 1];
          s.push(t[n >> 2] + t[n << 4 & 63] + "==");
        } else if (i === 2) {
          n = (e[r - 2] << 8) + e[r - 1];
          s.push(t[n >> 10] + t[n >> 4 & 63] + t[n << 2 & 63] + "=");
        }
        return s.join("");
      };
      var t = [];
      var e = [];
      var n = typeof Uint8Array != "undefined" ? Uint8Array : Array;
      var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (var s = 0; s < 64; ++s) {
        t[s] = r[s];
        e[r.charCodeAt(s)] = s;
      }
      function a(t) {
        var e = t.length;
        if (e % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var n = t.indexOf("=");
        if (n === -1) {
          n = e;
        }
        return [n, n === e ? 0 : 4 - n % 4];
      }
      function c(e) {
        return t[e >> 18 & 63] + t[e >> 12 & 63] + t[e >> 6 & 63] + t[e & 63];
      }
      function u(t, e, n) {
        var r;
        var i = [];
        for (var s = e; s < n; s += 3) {
          r = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (t[s + 2] & 255);
          i.push(c(r));
        }
        return i.join("");
      }
      e["-".charCodeAt(0)] = 62;
      e["_".charCodeAt(0)] = 63;
      return o;
    }();
    if (!a) {
      a = 1;
      u.read = function (t, e, n, r, i) {
        var s;
        var o;
        var a = i * 8 - r - 1;
        var c = (1 << a) - 1;
        var u = c >> 1;
        var l = -7;
        var h = n ? i - 1 : 0;
        var d = n ? -1 : 1;
        var p = t[e + h];
        h += d;
        s = p & (1 << -l) - 1;
        p >>= -l;
        l += a;
        for (; l > 0; l -= 8) {
          s = s * 256 + t[e + h];
          h += d;
        }
        o = s & (1 << -l) - 1;
        s >>= -l;
        l += r;
        for (; l > 0; l -= 8) {
          o = o * 256 + t[e + h];
          h += d;
        }
        if (s === 0) {
          s = 1 - u;
        } else {
          if (s === c) {
            if (o) {
              return NaN;
            } else {
              return (p ? -1 : 1) * Infinity;
            }
          }
          o += Math.pow(2, r);
          s -= u;
        }
        return (p ? -1 : 1) * o * Math.pow(2, s - r);
      };
      u.write = function (t, e, n, r, i, s) {
        var o;
        var a;
        var c;
        var u = s * 8 - i - 1;
        var l = (1 << u) - 1;
        var h = l >> 1;
        var d = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var p = r ? 0 : s - 1;
        var f = r ? 1 : -1;
        var m = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
        e = Math.abs(e);
        if (isNaN(e) || e === Infinity) {
          a = isNaN(e) ? 1 : 0;
          o = l;
        } else {
          o = Math.floor(Math.log(e) / Math.LN2);
          if (e * (c = Math.pow(2, -o)) < 1) {
            o--;
            c *= 2;
          }
          if ((e += o + h >= 1 ? d / c : d * Math.pow(2, 1 - h)) * c >= 2) {
            o++;
            c /= 2;
          }
          if (o + h >= l) {
            a = 0;
            o = l;
          } else if (o + h >= 1) {
            a = (e * c - 1) * Math.pow(2, i);
            o += h;
          } else {
            a = e * Math.pow(2, h - 1) * Math.pow(2, i);
            o = 0;
          }
        }
        for (; i >= 8; i -= 8) {
          t[n + p] = a & 255;
          p += f;
          a /= 256;
        }
        o = o << i | a;
        u += i;
        for (; u > 0; u -= 8) {
          t[n + p] = o & 255;
          p += f;
          o /= 256;
        }
        t[n + p - f] |= m * 128;
      };
    }
    const n = u;
    const r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    t.Buffer = l;
    t.SlowBuffer = function (t) {
      if (+t != t) {
        t = 0;
      }
      return l.alloc(+t);
    };
    t.INSPECT_MAX_BYTES = 50;
    const s = 2147483647;
    function c(t) {
      if (t > s) {
        throw new RangeError("The value \"" + t + "\" is invalid for option \"size\"");
      }
      const e = new Uint8Array(t);
      Object.setPrototypeOf(e, l.prototype);
      return e;
    }
    function l(t, e, n) {
      if (typeof t == "number") {
        if (typeof e == "string") {
          throw new TypeError("The \"string\" argument must be of type string. Received type number");
        }
        return p(t);
      }
      return h(t, e, n);
    }
    function h(t, e, n) {
      if (typeof t == "string") {
        return function (t, e) {
          if (typeof e != "string" || e === "") {
            e = "utf8";
          }
          if (!l.isEncoding(e)) {
            throw new TypeError("Unknown encoding: " + e);
          }
          const n = _(t, e) | 0;
          let r = c(n);
          const i = r.write(t, e);
          if (i !== n) {
            r = r.slice(0, i);
          }
          return r;
        }(t, e);
      }
      if (ArrayBuffer.isView(t)) {
        return function (t) {
          if (J(t, Uint8Array)) {
            const e = new Uint8Array(t);
            return m(e.buffer, e.byteOffset, e.byteLength);
          }
          return f(t);
        }(t);
      }
      if (t == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
      }
      if (J(t, ArrayBuffer) || t && J(t.buffer, ArrayBuffer)) {
        return m(t, e, n);
      }
      if (typeof SharedArrayBuffer != "undefined" && (J(t, SharedArrayBuffer) || t && J(t.buffer, SharedArrayBuffer))) {
        return m(t, e, n);
      }
      if (typeof t == "number") {
        throw new TypeError("The \"value\" argument must not be of type number. Received type number");
      }
      const r = t.valueOf && t.valueOf();
      if (r != null && r !== t) {
        return l.from(r, e, n);
      }
      const i = function (t) {
        if (l.isBuffer(t)) {
          const e = g(t.length) | 0;
          const n = c(e);
          if (n.length !== 0) {
            t.copy(n, 0, 0, e);
          }
          return n;
        }
        if (t.length !== undefined) {
          if (typeof t.length != "number" || Q(t.length)) {
            return c(0);
          } else {
            return f(t);
          }
        } else if (t.type === "Buffer" && Array.isArray(t.data)) {
          return f(t.data);
        } else {
          return undefined;
        }
      }(t);
      if (i) {
        return i;
      }
      if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function") {
        return l.from(t[Symbol.toPrimitive]("string"), e, n);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
    }
    function d(t) {
      if (typeof t != "number") {
        throw new TypeError("\"size\" argument must be of type number");
      }
      if (t < 0) {
        throw new RangeError("The value \"" + t + "\" is invalid for option \"size\"");
      }
    }
    function p(t) {
      d(t);
      return c(t < 0 ? 0 : g(t) | 0);
    }
    function f(t) {
      const e = t.length < 0 ? 0 : g(t.length) | 0;
      const n = c(e);
      for (let r = 0; r < e; r += 1) {
        n[r] = t[r] & 255;
      }
      return n;
    }
    function m(t, e, n) {
      if (e < 0 || t.byteLength < e) {
        throw new RangeError("\"offset\" is outside of buffer bounds");
      }
      if (t.byteLength < e + (n || 0)) {
        throw new RangeError("\"length\" is outside of buffer bounds");
      }
      let r;
      r = e === undefined && n === undefined ? new Uint8Array(t) : n === undefined ? new Uint8Array(t, e) : new Uint8Array(t, e, n);
      Object.setPrototypeOf(r, l.prototype);
      return r;
    }
    function g(t) {
      if (t >= s) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
      }
      return t | 0;
    }
    function _(t, e) {
      if (l.isBuffer(t)) {
        return t.length;
      }
      if (ArrayBuffer.isView(t) || J(t, ArrayBuffer)) {
        return t.byteLength;
      }
      if (typeof t != "string") {
        throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof t);
      }
      const n = t.length;
      const r = arguments.length > 2 && arguments[2] === true;
      if (!r && n === 0) {
        return 0;
      }
      let i = false;
      while (true) {
        switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return n;
          case "utf8":
          case "utf-8":
            return K(t).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return n * 2;
          case "hex":
            return n >>> 1;
          case "base64":
            return Y(t).length;
          default:
            if (i) {
              if (r) {
                return -1;
              } else {
                return K(t).length;
              }
            }
            e = ("" + e).toLowerCase();
            i = true;
        }
      }
    }
    function y(t, e, n) {
      let r = false;
      if (e === undefined || e < 0) {
        e = 0;
      }
      if (e > this.length) {
        return "";
      }
      if (n === undefined || n > this.length) {
        n = this.length;
      }
      if (n <= 0) {
        return "";
      }
      if ((n >>>= 0) <= (e >>>= 0)) {
        return "";
      }
      for (t ||= "utf8";;) {
        switch (t) {
          case "hex":
            return R(this, e, n);
          case "utf8":
          case "utf-8":
            return C(this, e, n);
          case "ascii":
            return k(this, e, n);
          case "latin1":
          case "binary":
            return I(this, e, n);
          case "base64":
            return O(this, e, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return L(this, e, n);
          default:
            if (r) {
              throw new TypeError("Unknown encoding: " + t);
            }
            t = (t + "").toLowerCase();
            r = true;
        }
      }
    }
    function v(t, e, n) {
      const r = t[e];
      t[e] = t[n];
      t[n] = r;
    }
    function b(t, e, n, r, i) {
      if (t.length === 0) {
        return -1;
      }
      if (typeof n == "string") {
        r = n;
        n = 0;
      } else if (n > 2147483647) {
        n = 2147483647;
      } else if (n < -2147483648) {
        n = -2147483648;
      }
      if (Q(n = +n)) {
        n = i ? 0 : t.length - 1;
      }
      if (n < 0) {
        n = t.length + n;
      }
      if (n >= t.length) {
        if (i) {
          return -1;
        }
        n = t.length - 1;
      } else if (n < 0) {
        if (!i) {
          return -1;
        }
        n = 0;
      }
      if (typeof e == "string") {
        e = l.from(e, r);
      }
      if (l.isBuffer(e)) {
        if (e.length === 0) {
          return -1;
        } else {
          return w(t, e, n, r, i);
        }
      }
      if (typeof e == "number") {
        e &= 255;
        if (typeof Uint8Array.prototype.indexOf == "function") {
          if (i) {
            return Uint8Array.prototype.indexOf.call(t, e, n);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(t, e, n);
          }
        } else {
          return w(t, [e], n, r, i);
        }
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function w(t, e, n, r, i) {
      let s;
      let o = 1;
      let a = t.length;
      let c = e.length;
      if (r !== undefined && ((r = String(r).toLowerCase()) === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le")) {
        if (t.length < 2 || e.length < 2) {
          return -1;
        }
        o = 2;
        a /= 2;
        c /= 2;
        n /= 2;
      }
      function u(t, e) {
        if (o === 1) {
          return t[e];
        } else {
          return t.readUInt16BE(e * o);
        }
      }
      if (i) {
        let r = -1;
        for (s = n; s < a; s++) {
          if (u(t, s) === u(e, r === -1 ? 0 : s - r)) {
            if (r === -1) {
              r = s;
            }
            if (s - r + 1 === c) {
              return r * o;
            }
          } else {
            if (r !== -1) {
              s -= s - r;
            }
            r = -1;
          }
        }
      } else {
        if (n + c > a) {
          n = a - c;
        }
        s = n;
        for (; s >= 0; s--) {
          let n = true;
          for (let r = 0; r < c; r++) {
            if (u(t, s + r) !== u(e, r)) {
              n = false;
              break;
            }
          }
          if (n) {
            return s;
          }
        }
      }
      return -1;
    }
    function E(t, e, n, r) {
      n = Number(n) || 0;
      const i = t.length - n;
      if (r) {
        if ((r = Number(r)) > i) {
          r = i;
        }
      } else {
        r = i;
      }
      const s = e.length;
      let o;
      if (r > s / 2) {
        r = s / 2;
      }
      o = 0;
      for (; o < r; ++o) {
        const r = parseInt(e.substr(o * 2, 2), 16);
        if (Q(r)) {
          return o;
        }
        t[n + o] = r;
      }
      return o;
    }
    function S(t, e, n, r) {
      return X(K(e, t.length - n), t, n, r);
    }
    function T(t, e, n, r) {
      return X(function (t) {
        const e = [];
        for (let n = 0; n < t.length; ++n) {
          e.push(t.charCodeAt(n) & 255);
        }
        return e;
      }(e), t, n, r);
    }
    function x(t, e, n, r) {
      return X(Y(e), t, n, r);
    }
    function A(t, e, n, r) {
      return X(function (t, e) {
        let n;
        let r;
        let i;
        const s = [];
        for (let o = 0; o < t.length && !((e -= 2) < 0); ++o) {
          n = t.charCodeAt(o);
          r = n >> 8;
          i = n % 256;
          s.push(i);
          s.push(r);
        }
        return s;
      }(e, t.length - n), t, n, r);
    }
    function O(t, n, r) {
      if (n === 0 && r === t.length) {
        return e.fromByteArray(t);
      } else {
        return e.fromByteArray(t.slice(n, r));
      }
    }
    function C(t, e, n) {
      n = Math.min(t.length, n);
      const r = [];
      let i = e;
      while (i < n) {
        const e = t[i];
        let s = null;
        let o = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
        if (i + o <= n) {
          let n;
          let r;
          let a;
          let c;
          switch (o) {
            case 1:
              if (e < 128) {
                s = e;
              }
              break;
            case 2:
              n = t[i + 1];
              if ((n & 192) == 128) {
                c = (e & 31) << 6 | n & 63;
                if (c > 127) {
                  s = c;
                }
              }
              break;
            case 3:
              n = t[i + 1];
              r = t[i + 2];
              if ((n & 192) == 128 && (r & 192) == 128) {
                c = (e & 15) << 12 | (n & 63) << 6 | r & 63;
                if (c > 2047 && (c < 55296 || c > 57343)) {
                  s = c;
                }
              }
              break;
            case 4:
              n = t[i + 1];
              r = t[i + 2];
              a = t[i + 3];
              if ((n & 192) == 128 && (r & 192) == 128 && (a & 192) == 128) {
                c = (e & 15) << 18 | (n & 63) << 12 | (r & 63) << 6 | a & 63;
                if (c > 65535 && c < 1114112) {
                  s = c;
                }
              }
          }
        }
        if (s === null) {
          s = 65533;
          o = 1;
        } else if (s > 65535) {
          s -= 65536;
          r.push(s >>> 10 & 1023 | 55296);
          s = s & 1023 | 56320;
        }
        r.push(s);
        i += o;
      }
      return function (t) {
        const e = t.length;
        if (e <= P) {
          return String.fromCharCode.apply(String, t);
        }
        let n = "";
        let r = 0;
        while (r < e) {
          n += String.fromCharCode.apply(String, t.slice(r, r += P));
        }
        return n;
      }(r);
    }
    t.kMaxLength = s;
    l.TYPED_ARRAY_SUPPORT = function () {
      try {
        const t = new Uint8Array(1);
        const e = {
          foo: function () {
            return 42;
          }
        };
        Object.setPrototypeOf(e, Uint8Array.prototype);
        Object.setPrototypeOf(t, e);
        return t.foo() === 42;
      } catch (t) {
        return false;
      }
    }();
    if (!l.TYPED_ARRAY_SUPPORT && typeof console != "undefined") {
      console.error;
    }
    Object.defineProperty(l.prototype, "parent", {
      enumerable: true,
      get: function () {
        if (l.isBuffer(this)) {
          return this.buffer;
        }
      }
    });
    Object.defineProperty(l.prototype, "offset", {
      enumerable: true,
      get: function () {
        if (l.isBuffer(this)) {
          return this.byteOffset;
        }
      }
    });
    l.poolSize = 8192;
    l.from = function (t, e, n) {
      return h(t, e, n);
    };
    Object.setPrototypeOf(l.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(l, Uint8Array);
    l.alloc = function (t, e, n) {
      return function (t, e, n) {
        d(t);
        if (t <= 0) {
          return c(t);
        } else if (e !== undefined) {
          if (typeof n == "string") {
            return c(t).fill(e, n);
          } else {
            return c(t).fill(e);
          }
        } else {
          return c(t);
        }
      }(t, e, n);
    };
    l.allocUnsafe = function (t) {
      return p(t);
    };
    l.allocUnsafeSlow = function (t) {
      return p(t);
    };
    l.isBuffer = function (t) {
      return t != null && t._isBuffer === true && t !== l.prototype;
    };
    l.compare = function (t, e) {
      if (J(t, Uint8Array)) {
        t = l.from(t, t.offset, t.byteLength);
      }
      if (J(e, Uint8Array)) {
        e = l.from(e, e.offset, e.byteLength);
      }
      if (!l.isBuffer(t) || !l.isBuffer(e)) {
        throw new TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");
      }
      if (t === e) {
        return 0;
      }
      let n = t.length;
      let r = e.length;
      for (let i = 0, s = Math.min(n, r); i < s; ++i) {
        if (t[i] !== e[i]) {
          n = t[i];
          r = e[i];
          break;
        }
      }
      if (n < r) {
        return -1;
      } else if (r < n) {
        return 1;
      } else {
        return 0;
      }
    };
    l.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    l.concat = function (t, e) {
      if (!Array.isArray(t)) {
        throw new TypeError("\"list\" argument must be an Array of Buffers");
      }
      if (t.length === 0) {
        return l.alloc(0);
      }
      let n;
      if (e === undefined) {
        e = 0;
        n = 0;
        for (; n < t.length; ++n) {
          e += t[n].length;
        }
      }
      const r = l.allocUnsafe(e);
      let i = 0;
      for (n = 0; n < t.length; ++n) {
        let e = t[n];
        if (J(e, Uint8Array)) {
          if (i + e.length > r.length) {
            if (!l.isBuffer(e)) {
              e = l.from(e);
            }
            e.copy(r, i);
          } else {
            Uint8Array.prototype.set.call(r, e, i);
          }
        } else {
          if (!l.isBuffer(e)) {
            throw new TypeError("\"list\" argument must be an Array of Buffers");
          }
          e.copy(r, i);
        }
        i += e.length;
      }
      return r;
    };
    l.byteLength = _;
    l.prototype._isBuffer = true;
    l.prototype.swap16 = function () {
      const t = this.length;
      if (t % 2 != 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let e = 0; e < t; e += 2) {
        v(this, e, e + 1);
      }
      return this;
    };
    l.prototype.swap32 = function () {
      const t = this.length;
      if (t % 4 != 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let e = 0; e < t; e += 4) {
        v(this, e, e + 3);
        v(this, e + 1, e + 2);
      }
      return this;
    };
    l.prototype.swap64 = function () {
      const t = this.length;
      if (t % 8 != 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let e = 0; e < t; e += 8) {
        v(this, e, e + 7);
        v(this, e + 1, e + 6);
        v(this, e + 2, e + 5);
        v(this, e + 3, e + 4);
      }
      return this;
    };
    l.prototype.toString = function () {
      const t = this.length;
      if (t === 0) {
        return "";
      } else if (arguments.length === 0) {
        return C(this, 0, t);
      } else {
        return y.apply(this, arguments);
      }
    };
    l.prototype.toLocaleString = l.prototype.toString;
    l.prototype.equals = function (t) {
      if (!l.isBuffer(t)) {
        throw new TypeError("Argument must be a Buffer");
      }
      return this === t || l.compare(this, t) === 0;
    };
    l.prototype.inspect = function () {
      let e = "";
      const n = t.INSPECT_MAX_BYTES;
      e = this.toString("hex", 0, n).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > n) {
        e += " ... ";
      }
      return "<Buffer " + e + ">";
    };
    if (r) {
      l.prototype[r] = l.prototype.inspect;
    }
    l.prototype.compare = function (t, e, n, r, i) {
      if (J(t, Uint8Array)) {
        t = l.from(t, t.offset, t.byteLength);
      }
      if (!l.isBuffer(t)) {
        throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof t);
      }
      if (e === undefined) {
        e = 0;
      }
      if (n === undefined) {
        n = t ? t.length : 0;
      }
      if (r === undefined) {
        r = 0;
      }
      if (i === undefined) {
        i = this.length;
      }
      if (e < 0 || n > t.length || r < 0 || i > this.length) {
        throw new RangeError("out of range index");
      }
      if (r >= i && e >= n) {
        return 0;
      }
      if (r >= i) {
        return -1;
      }
      if (e >= n) {
        return 1;
      }
      if (this === t) {
        return 0;
      }
      let s = (i >>>= 0) - (r >>>= 0);
      let o = (n >>>= 0) - (e >>>= 0);
      const a = Math.min(s, o);
      const c = this.slice(r, i);
      const u = t.slice(e, n);
      for (let l = 0; l < a; ++l) {
        if (c[l] !== u[l]) {
          s = c[l];
          o = u[l];
          break;
        }
      }
      if (s < o) {
        return -1;
      } else if (o < s) {
        return 1;
      } else {
        return 0;
      }
    };
    l.prototype.includes = function (t, e, n) {
      return this.indexOf(t, e, n) !== -1;
    };
    l.prototype.indexOf = function (t, e, n) {
      return b(this, t, e, n, true);
    };
    l.prototype.lastIndexOf = function (t, e, n) {
      return b(this, t, e, n, false);
    };
    l.prototype.write = function (t, e, n, r) {
      if (e === undefined) {
        r = "utf8";
        n = this.length;
        e = 0;
      } else if (n === undefined && typeof e == "string") {
        r = e;
        n = this.length;
        e = 0;
      } else {
        if (!isFinite(e)) {
          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        }
        e >>>= 0;
        if (isFinite(n)) {
          n >>>= 0;
          if (r === undefined) {
            r = "utf8";
          }
        } else {
          r = n;
          n = undefined;
        }
      }
      const i = this.length - e;
      if (n === undefined || n > i) {
        n = i;
      }
      if (t.length > 0 && (n < 0 || e < 0) || e > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      r ||= "utf8";
      let s = false;
      while (true) {
        switch (r) {
          case "hex":
            return E(this, t, e, n);
          case "utf8":
          case "utf-8":
            return S(this, t, e, n);
          case "ascii":
          case "latin1":
          case "binary":
            return T(this, t, e, n);
          case "base64":
            return x(this, t, e, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return A(this, t, e, n);
          default:
            if (s) {
              throw new TypeError("Unknown encoding: " + r);
            }
            r = ("" + r).toLowerCase();
            s = true;
        }
      }
    };
    l.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    const P = 4096;
    function k(t, e, n) {
      let r = "";
      n = Math.min(t.length, n);
      for (let i = e; i < n; ++i) {
        r += String.fromCharCode(t[i] & 127);
      }
      return r;
    }
    function I(t, e, n) {
      let r = "";
      n = Math.min(t.length, n);
      for (let i = e; i < n; ++i) {
        r += String.fromCharCode(t[i]);
      }
      return r;
    }
    function R(t, e, n) {
      const r = t.length;
      if (!e || e < 0) {
        e = 0;
      }
      if (!n || n < 0 || n > r) {
        n = r;
      }
      let i = "";
      for (let s = e; s < n; ++s) {
        i += Z[t[s]];
      }
      return i;
    }
    function L(t, e, n) {
      const r = t.slice(e, n);
      let i = "";
      for (let s = 0; s < r.length - 1; s += 2) {
        i += String.fromCharCode(r[s] + r[s + 1] * 256);
      }
      return i;
    }
    function M(t, e, n) {
      if (t % 1 != 0 || t < 0) {
        throw new RangeError("offset is not uint");
      }
      if (t + e > n) {
        throw new RangeError("Trying to access beyond buffer length");
      }
    }
    function N(t, e, n, r, i, s) {
      if (!l.isBuffer(t)) {
        throw new TypeError("\"buffer\" argument must be a Buffer instance");
      }
      if (e > i || e < s) {
        throw new RangeError("\"value\" argument is out of bounds");
      }
      if (n + r > t.length) {
        throw new RangeError("Index out of range");
      }
    }
    function D(t, e, n, r, i) {
      V(e, r, i, t, n, 7);
      let s = Number(e & BigInt(4294967295));
      t[n++] = s;
      s >>= 8;
      t[n++] = s;
      s >>= 8;
      t[n++] = s;
      s >>= 8;
      t[n++] = s;
      let o = Number(e >> BigInt(32) & BigInt(4294967295));
      t[n++] = o;
      o >>= 8;
      t[n++] = o;
      o >>= 8;
      t[n++] = o;
      o >>= 8;
      t[n++] = o;
      return n;
    }
    function U(t, e, n, r, i) {
      V(e, r, i, t, n, 7);
      let s = Number(e & BigInt(4294967295));
      t[n + 7] = s;
      s >>= 8;
      t[n + 6] = s;
      s >>= 8;
      t[n + 5] = s;
      s >>= 8;
      t[n + 4] = s;
      let o = Number(e >> BigInt(32) & BigInt(4294967295));
      t[n + 3] = o;
      o >>= 8;
      t[n + 2] = o;
      o >>= 8;
      t[n + 1] = o;
      o >>= 8;
      t[n] = o;
      return n + 8;
    }
    function B(t, e, n, r, i, s) {
      if (n + r > t.length) {
        throw new RangeError("Index out of range");
      }
      if (n < 0) {
        throw new RangeError("Index out of range");
      }
    }
    function $(t, e, r, i, s) {
      e = +e;
      r >>>= 0;
      if (!s) {
        B(t, 0, r, 4);
      }
      n.write(t, e, r, i, 23, 4);
      return r + 4;
    }
    function j(t, e, r, i, s) {
      e = +e;
      r >>>= 0;
      if (!s) {
        B(t, 0, r, 8);
      }
      n.write(t, e, r, i, 52, 8);
      return r + 8;
    }
    l.prototype.slice = function (t, e) {
      const n = this.length;
      if ((t = ~~t) < 0) {
        if ((t += n) < 0) {
          t = 0;
        }
      } else if (t > n) {
        t = n;
      }
      if ((e = e === undefined ? n : ~~e) < 0) {
        if ((e += n) < 0) {
          e = 0;
        }
      } else if (e > n) {
        e = n;
      }
      if (e < t) {
        e = t;
      }
      const r = this.subarray(t, e);
      Object.setPrototypeOf(r, l.prototype);
      return r;
    };
    l.prototype.readUintLE = l.prototype.readUIntLE = function (t, e, n) {
      t >>>= 0;
      e >>>= 0;
      if (!n) {
        M(t, e, this.length);
      }
      let r = this[t];
      let i = 1;
      let s = 0;
      while (++s < e && (i *= 256)) {
        r += this[t + s] * i;
      }
      return r;
    };
    l.prototype.readUintBE = l.prototype.readUIntBE = function (t, e, n) {
      t >>>= 0;
      e >>>= 0;
      if (!n) {
        M(t, e, this.length);
      }
      let r = this[t + --e];
      let i = 1;
      while (e > 0 && (i *= 256)) {
        r += this[t + --e] * i;
      }
      return r;
    };
    l.prototype.readUint8 = l.prototype.readUInt8 = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 1, this.length);
      }
      return this[t];
    };
    l.prototype.readUint16LE = l.prototype.readUInt16LE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 2, this.length);
      }
      return this[t] | this[t + 1] << 8;
    };
    l.prototype.readUint16BE = l.prototype.readUInt16BE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 2, this.length);
      }
      return this[t] << 8 | this[t + 1];
    };
    l.prototype.readUint32LE = l.prototype.readUInt32LE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 4, this.length);
      }
      return (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
    };
    l.prototype.readUint32BE = l.prototype.readUInt32BE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 4, this.length);
      }
      return this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
    };
    l.prototype.readBigUInt64LE = tt(function (t) {
      H(t >>>= 0, "offset");
      const e = this[t];
      const n = this[t + 7];
      if (e === undefined || n === undefined) {
        q(t, this.length - 8);
      }
      const r = e + this[++t] * 256 + this[++t] * 65536 + this[++t] * 16777216;
      const i = this[++t] + this[++t] * 256 + this[++t] * 65536 + n * 16777216;
      return BigInt(r) + (BigInt(i) << BigInt(32));
    });
    l.prototype.readBigUInt64BE = tt(function (t) {
      H(t >>>= 0, "offset");
      const e = this[t];
      const n = this[t + 7];
      if (e === undefined || n === undefined) {
        q(t, this.length - 8);
      }
      const r = e * 16777216 + this[++t] * 65536 + this[++t] * 256 + this[++t];
      const i = this[++t] * 16777216 + this[++t] * 65536 + this[++t] * 256 + n;
      return (BigInt(r) << BigInt(32)) + BigInt(i);
    });
    l.prototype.readIntLE = function (t, e, n) {
      t >>>= 0;
      e >>>= 0;
      if (!n) {
        M(t, e, this.length);
      }
      let r = this[t];
      let i = 1;
      let s = 0;
      while (++s < e && (i *= 256)) {
        r += this[t + s] * i;
      }
      i *= 128;
      if (r >= i) {
        r -= Math.pow(2, e * 8);
      }
      return r;
    };
    l.prototype.readIntBE = function (t, e, n) {
      t >>>= 0;
      e >>>= 0;
      if (!n) {
        M(t, e, this.length);
      }
      let r = e;
      let i = 1;
      let s = this[t + --r];
      while (r > 0 && (i *= 256)) {
        s += this[t + --r] * i;
      }
      i *= 128;
      if (s >= i) {
        s -= Math.pow(2, e * 8);
      }
      return s;
    };
    l.prototype.readInt8 = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 1, this.length);
      }
      if (this[t] & 128) {
        return (255 - this[t] + 1) * -1;
      } else {
        return this[t];
      }
    };
    l.prototype.readInt16LE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 2, this.length);
      }
      const n = this[t] | this[t + 1] << 8;
      if (n & 32768) {
        return n | 4294901760;
      } else {
        return n;
      }
    };
    l.prototype.readInt16BE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 2, this.length);
      }
      const n = this[t + 1] | this[t] << 8;
      if (n & 32768) {
        return n | 4294901760;
      } else {
        return n;
      }
    };
    l.prototype.readInt32LE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 4, this.length);
      }
      return this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
    };
    l.prototype.readInt32BE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 4, this.length);
      }
      return this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
    };
    l.prototype.readBigInt64LE = tt(function (t) {
      H(t >>>= 0, "offset");
      const e = this[t];
      const n = this[t + 7];
      if (e === undefined || n === undefined) {
        q(t, this.length - 8);
      }
      const r = this[t + 4] + this[t + 5] * 256 + this[t + 6] * 65536 + (n << 24);
      return (BigInt(r) << BigInt(32)) + BigInt(e + this[++t] * 256 + this[++t] * 65536 + this[++t] * 16777216);
    });
    l.prototype.readBigInt64BE = tt(function (t) {
      H(t >>>= 0, "offset");
      const e = this[t];
      const n = this[t + 7];
      if (e === undefined || n === undefined) {
        q(t, this.length - 8);
      }
      const r = (e << 24) + this[++t] * 65536 + this[++t] * 256 + this[++t];
      return (BigInt(r) << BigInt(32)) + BigInt(this[++t] * 16777216 + this[++t] * 65536 + this[++t] * 256 + n);
    });
    l.prototype.readFloatLE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 4, this.length);
      }
      return n.read(this, t, true, 23, 4);
    };
    l.prototype.readFloatBE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 4, this.length);
      }
      return n.read(this, t, false, 23, 4);
    };
    l.prototype.readDoubleLE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 8, this.length);
      }
      return n.read(this, t, true, 52, 8);
    };
    l.prototype.readDoubleBE = function (t, e) {
      t >>>= 0;
      if (!e) {
        M(t, 8, this.length);
      }
      return n.read(this, t, false, 52, 8);
    };
    l.prototype.writeUintLE = l.prototype.writeUIntLE = function (t, e, n, r) {
      t = +t;
      e >>>= 0;
      n >>>= 0;
      if (!r) {
        N(this, t, e, n, Math.pow(2, n * 8) - 1, 0);
      }
      let i = 1;
      let s = 0;
      for (this[e] = t & 255; ++s < n && (i *= 256);) {
        this[e + s] = t / i & 255;
      }
      return e + n;
    };
    l.prototype.writeUintBE = l.prototype.writeUIntBE = function (t, e, n, r) {
      t = +t;
      e >>>= 0;
      n >>>= 0;
      if (!r) {
        N(this, t, e, n, Math.pow(2, n * 8) - 1, 0);
      }
      let i = n - 1;
      let s = 1;
      for (this[e + i] = t & 255; --i >= 0 && (s *= 256);) {
        this[e + i] = t / s & 255;
      }
      return e + n;
    };
    l.prototype.writeUint8 = l.prototype.writeUInt8 = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 1, 255, 0);
      }
      this[e] = t & 255;
      return e + 1;
    };
    l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 2, 65535, 0);
      }
      this[e] = t & 255;
      this[e + 1] = t >>> 8;
      return e + 2;
    };
    l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 2, 65535, 0);
      }
      this[e] = t >>> 8;
      this[e + 1] = t & 255;
      return e + 2;
    };
    l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 4, 4294967295, 0);
      }
      this[e + 3] = t >>> 24;
      this[e + 2] = t >>> 16;
      this[e + 1] = t >>> 8;
      this[e] = t & 255;
      return e + 4;
    };
    l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 4, 4294967295, 0);
      }
      this[e] = t >>> 24;
      this[e + 1] = t >>> 16;
      this[e + 2] = t >>> 8;
      this[e + 3] = t & 255;
      return e + 4;
    };
    l.prototype.writeBigUInt64LE = tt(function (t, e = 0) {
      return D(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    l.prototype.writeBigUInt64BE = tt(function (t, e = 0) {
      return U(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    l.prototype.writeIntLE = function (t, e, n, r) {
      t = +t;
      e >>>= 0;
      if (!r) {
        const r = Math.pow(2, n * 8 - 1);
        N(this, t, e, n, r - 1, -r);
      }
      let i = 0;
      let s = 1;
      let o = 0;
      for (this[e] = t & 255; ++i < n && (s *= 256);) {
        if (t < 0 && o === 0 && this[e + i - 1] !== 0) {
          o = 1;
        }
        this[e + i] = (t / s | 0) - o & 255;
      }
      return e + n;
    };
    l.prototype.writeIntBE = function (t, e, n, r) {
      t = +t;
      e >>>= 0;
      if (!r) {
        const r = Math.pow(2, n * 8 - 1);
        N(this, t, e, n, r - 1, -r);
      }
      let i = n - 1;
      let s = 1;
      let o = 0;
      for (this[e + i] = t & 255; --i >= 0 && (s *= 256);) {
        if (t < 0 && o === 0 && this[e + i + 1] !== 0) {
          o = 1;
        }
        this[e + i] = (t / s | 0) - o & 255;
      }
      return e + n;
    };
    l.prototype.writeInt8 = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 1, 127, -128);
      }
      if (t < 0) {
        t = 255 + t + 1;
      }
      this[e] = t & 255;
      return e + 1;
    };
    l.prototype.writeInt16LE = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 2, 32767, -32768);
      }
      this[e] = t & 255;
      this[e + 1] = t >>> 8;
      return e + 2;
    };
    l.prototype.writeInt16BE = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 2, 32767, -32768);
      }
      this[e] = t >>> 8;
      this[e + 1] = t & 255;
      return e + 2;
    };
    l.prototype.writeInt32LE = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 4, 2147483647, -2147483648);
      }
      this[e] = t & 255;
      this[e + 1] = t >>> 8;
      this[e + 2] = t >>> 16;
      this[e + 3] = t >>> 24;
      return e + 4;
    };
    l.prototype.writeInt32BE = function (t, e, n) {
      t = +t;
      e >>>= 0;
      if (!n) {
        N(this, t, e, 4, 2147483647, -2147483648);
      }
      if (t < 0) {
        t = 4294967295 + t + 1;
      }
      this[e] = t >>> 24;
      this[e + 1] = t >>> 16;
      this[e + 2] = t >>> 8;
      this[e + 3] = t & 255;
      return e + 4;
    };
    l.prototype.writeBigInt64LE = tt(function (t, e = 0) {
      return D(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    l.prototype.writeBigInt64BE = tt(function (t, e = 0) {
      return U(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    l.prototype.writeFloatLE = function (t, e, n) {
      return $(this, t, e, true, n);
    };
    l.prototype.writeFloatBE = function (t, e, n) {
      return $(this, t, e, false, n);
    };
    l.prototype.writeDoubleLE = function (t, e, n) {
      return j(this, t, e, true, n);
    };
    l.prototype.writeDoubleBE = function (t, e, n) {
      return j(this, t, e, false, n);
    };
    l.prototype.copy = function (t, e, n, r) {
      if (!l.isBuffer(t)) {
        throw new TypeError("argument should be a Buffer");
      }
      n ||= 0;
      if (!r && r !== 0) {
        r = this.length;
      }
      if (e >= t.length) {
        e = t.length;
      }
      e ||= 0;
      if (r > 0 && r < n) {
        r = n;
      }
      if (r === n) {
        return 0;
      }
      if (t.length === 0 || this.length === 0) {
        return 0;
      }
      if (e < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (n < 0 || n >= this.length) {
        throw new RangeError("Index out of range");
      }
      if (r < 0) {
        throw new RangeError("sourceEnd out of bounds");
      }
      if (r > this.length) {
        r = this.length;
      }
      if (t.length - e < r - n) {
        r = t.length - e + n;
      }
      const i = r - n;
      if (this === t && typeof Uint8Array.prototype.copyWithin == "function") {
        this.copyWithin(e, n, r);
      } else {
        Uint8Array.prototype.set.call(t, this.subarray(n, r), e);
      }
      return i;
    };
    l.prototype.fill = function (t, e, n, r) {
      if (typeof t == "string") {
        if (typeof e == "string") {
          r = e;
          e = 0;
          n = this.length;
        } else if (typeof n == "string") {
          r = n;
          n = this.length;
        }
        if (r !== undefined && typeof r != "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof r == "string" && !l.isEncoding(r)) {
          throw new TypeError("Unknown encoding: " + r);
        }
        if (t.length === 1) {
          const e = t.charCodeAt(0);
          if (r === "utf8" && e < 128 || r === "latin1") {
            t = e;
          }
        }
      } else if (typeof t == "number") {
        t &= 255;
      } else if (typeof t == "boolean") {
        t = Number(t);
      }
      if (e < 0 || this.length < e || this.length < n) {
        throw new RangeError("Out of range index");
      }
      if (n <= e) {
        return this;
      }
      let i;
      e >>>= 0;
      n = n === undefined ? this.length : n >>> 0;
      t ||= 0;
      if (typeof t == "number") {
        for (i = e; i < n; ++i) {
          this[i] = t;
        }
      } else {
        const s = l.isBuffer(t) ? t : l.from(t, r);
        const o = s.length;
        if (o === 0) {
          throw new TypeError("The value \"" + t + "\" is invalid for argument \"value\"");
        }
        for (i = 0; i < n - e; ++i) {
          this[i + e] = s[i % o];
        }
      }
      return this;
    };
    const F = {};
    function z(t, e, n) {
      F[t] = class extends n {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: e.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${t}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return t;
        }
        set code(t) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value: t,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${t}]: ${this.message}`;
        }
      };
    }
    function G(t) {
      let e = "";
      let n = t.length;
      const r = t[0] === "-" ? 1 : 0;
      for (; n >= r + 4; n -= 3) {
        e = `_${t.slice(n - 3, n)}${e}`;
      }
      return `${t.slice(0, n)}${e}`;
    }
    function V(t, e, n, r, i, s) {
      if (t > n || t < e) {
        const n = typeof e == "bigint" ? "n" : "";
        let r;
        r = e === 0 || e === BigInt(0) ? `>= 0${n} and < 2${n} ** ${(s + 1) * 8}${n}` : `>= -(2${n} ** ${(s + 1) * 8 - 1}${n}) and < 2 ** ${(s + 1) * 8 - 1}${n}`;
        throw new F.ERR_OUT_OF_RANGE("value", r, t);
      }
      (function (t, e, n) {
        H(e, "offset");
        if (t[e] === undefined || t[e + n] === undefined) {
          q(e, t.length - (n + 1));
        }
      })(r, i, s);
    }
    function H(t, e) {
      if (typeof t != "number") {
        throw new F.ERR_INVALID_ARG_TYPE(e, "number", t);
      }
    }
    function q(t, e, n) {
      if (Math.floor(t) !== t) {
        H(t, n);
        throw new F.ERR_OUT_OF_RANGE("offset", "an integer", t);
      }
      if (e < 0) {
        throw new F.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new F.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${e}`, t);
    }
    z("ERR_BUFFER_OUT_OF_BOUNDS", function (t) {
      if (t) {
        return `${t} is outside of buffer bounds`;
      } else {
        return "Attempt to access memory outside buffer bounds";
      }
    }, RangeError);
    z("ERR_INVALID_ARG_TYPE", function (t, e) {
      return `The "${t}" argument must be of type number. Received type ${typeof e}`;
    }, TypeError);
    z("ERR_OUT_OF_RANGE", function (t, e, n) {
      let r = `The value of "${t}" is out of range.`;
      let i = n;
      if (Number.isInteger(n) && Math.abs(n) > 4294967296) {
        i = G(String(n));
      } else if (typeof n == "bigint") {
        i = String(n);
        if (n > BigInt(2) ** BigInt(32) || n < -(BigInt(2) ** BigInt(32))) {
          i = G(i);
        }
        i += "n";
      }
      r += ` It must be ${e}. Received ${i}`;
      return r;
    }, RangeError);
    const W = /[^+/0-9A-Za-z-_]/g;
    function K(t, e) {
      let n;
      e = e || Infinity;
      const r = t.length;
      let i = null;
      const s = [];
      for (let o = 0; o < r; ++o) {
        n = t.charCodeAt(o);
        if (n > 55295 && n < 57344) {
          if (!i) {
            if (n > 56319) {
              if ((e -= 3) > -1) {
                s.push(239, 191, 189);
              }
              continue;
            }
            if (o + 1 === r) {
              if ((e -= 3) > -1) {
                s.push(239, 191, 189);
              }
              continue;
            }
            i = n;
            continue;
          }
          if (n < 56320) {
            if ((e -= 3) > -1) {
              s.push(239, 191, 189);
            }
            i = n;
            continue;
          }
          n = 65536 + (i - 55296 << 10 | n - 56320);
        } else if (i && (e -= 3) > -1) {
          s.push(239, 191, 189);
        }
        i = null;
        if (n < 128) {
          if ((e -= 1) < 0) {
            break;
          }
          s.push(n);
        } else if (n < 2048) {
          if ((e -= 2) < 0) {
            break;
          }
          s.push(n >> 6 | 192, n & 63 | 128);
        } else if (n < 65536) {
          if ((e -= 3) < 0) {
            break;
          }
          s.push(n >> 12 | 224, n >> 6 & 63 | 128, n & 63 | 128);
        } else {
          if (!(n < 1114112)) {
            throw new Error("Invalid code point");
          }
          if ((e -= 4) < 0) {
            break;
          }
          s.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, n & 63 | 128);
        }
      }
      return s;
    }
    function Y(t) {
      return e.toByteArray(function (t) {
        if ((t = (t = t.split("=")[0]).trim().replace(W, "")).length < 2) {
          return "";
        }
        while (t.length % 4 != 0) {
          t += "=";
        }
        return t;
      }(t));
    }
    function X(t, e, n, r) {
      let i;
      for (i = 0; i < r && !(i + n >= e.length) && !(i >= t.length); ++i) {
        e[i + n] = t[i];
      }
      return i;
    }
    function J(t, e) {
      return t instanceof e || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name;
    }
    function Q(t) {
      return t != t;
    }
    const Z = function () {
      const t = "0123456789abcdef";
      const e = new Array(256);
      for (let n = 0; n < 16; ++n) {
        const r = n * 16;
        for (let i = 0; i < 16; ++i) {
          e[r + i] = t[n] + t[i];
        }
      }
      return e;
    }();
    function tt(t) {
      if (typeof BigInt == "undefined") {
        return et;
      } else {
        return t;
      }
    }
    function et() {
      throw new Error("BigInt not supported");
    }
  })(s);
}
var l = s;
const h = {};
const d = function (t, e, n) {
  let r = Promise.resolve();
  if (e && e.length > 0) {
    let t = function (t) {
      return Promise.all(t.map(t => Promise.resolve(t).then(t => ({
        status: "fulfilled",
        value: t
      }), t => ({
        status: "rejected",
        reason: t
      }))));
    };
    document.getElementsByTagName("link");
    const n = document.querySelector("meta[property=csp-nonce]");
    const i = n?.nonce || n?.getAttribute("nonce");
    r = t(e.map(t => {
      if ((t = function (t) {
        return "/" + t;
      }(t)) in h) {
        return;
      }
      h[t] = true;
      const e = t.endsWith(".css");
      const n = e ? "[rel=\"stylesheet\"]" : "";
      if (document.querySelector(`link[href="${t}"]${n}`)) {
        return;
      }
      const r = document.createElement("link");
      r.rel = e ? "stylesheet" : "modulepreload";
      if (!e) {
        r.as = "script";
      }
      r.crossOrigin = "";
      r.href = t;
      if (i) {
        r.setAttribute("nonce", i);
      }
      document.head.appendChild(r);
      if (e) {
        return new Promise((e, n) => {
          r.addEventListener("load", e);
          r.addEventListener("error", () => n(new Error(`Unable to preload CSS for ${t}`)));
        });
      } else {
        return undefined;
      }
    }));
  }
  function i(t) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = t;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw t;
    }
  }
  return r.then(e => {
    for (const t of e || []) {
      if (t.status === "rejected") {
        i(t.reason);
      }
    }
    return t().catch(i);
  });
};
function p(t, e, n) {
  if (e.split) {
    e = e.split(".");
  }
  var r;
  for (var i, s = 0, o = e.length, a = t; s < o && (i = "" + e[s++]) != "__proto__" && i !== "constructor" && i !== "prototype";) {
    a = a[i] = s === o ? n : typeof (r = a[i]) == typeof e ? r : e[s] * 0 != 0 || ~("" + e[s]).indexOf(".") ? {} : [];
  }
}
var f;
for (var m = 256, g = []; m--;) {
  g[m] = (m + 256).toString(16).substring(1);
}
function _() {
  var t;
  var e = 0;
  var n = "";
  if (!f || m + 16 > 256) {
    for (f = Array(e = 256); e--;) {
      f[e] = Math.random() * 256 | 0;
    }
    e = m = 0;
  }
  for (; e < 16; e++) {
    t = f[m + e];
    n += e == 6 ? g[t & 15 | 64] : e == 8 ? g[t & 63 | 128] : g[t];
    if (e & 1 && e > 1 && e < 11) {
      n += "-";
    }
  }
  m++;
  return n;
}
const y = {
  production: {
    SEGMENT_WRITE_KEY: "H7hVDRIBUrlBySLqJ15oAivgqhomdAKT"
  },
  development: {
    SEGMENT_WRITE_KEY: "hNex10EGp3coubOXQI1BIElYaZcA1o0u"
  }
};
const v = "fcoeoabgfenejglbffodgkkbkcdhcgfn";
const b = {
  AUTHORIZE_URL: "https://claude.ai/oauth/authorize",
  TOKEN_URL: "https://platform.claude.com/v1/oauth/token",
  SCOPES_STR: "user:profile user:inference user:chat",
  CLIENT_ID: "54511e87-7abf-4923-9d84-d6f24532e871",
  REDIRECT_URI: `chrome-extension://${"dihbgbndebgnbjfmelmegjepbnkhlgni"}/oauth_callback.html`
};
const w = {
  development: b,
  production: {
    ...b,
    CLIENT_ID: "dae2cad8-15c5-43d2-9046-fcaecc135fa4",
    REDIRECT_URI: `chrome-extension://${v}/oauth_callback.html`
  }
};
const E = () => {
  const t = "production";
  const e = w[t];
  return {
    environment: t,
    apiBaseUrl: "https://api.anthropic.com",
    wsApiBaseUrl: "wss://api.anthropic.com",
    segmentWriteKey: y[t].SEGMENT_WRITE_KEY,
    oauth: e,
    localBridge: false
  };
};
async function __cpShouldBypassAnthropicTraffic() {
  try {
    const {
      customProviderConfig: t
    } = await chrome.storage.local.get("customProviderConfig");
    return !!t?.enabled && !!t?.baseUrl && !!t?.apiKey;
  } catch {
    return false;
  }
}
function S(t) {
  let e;
  let n;
  let r;
  let i = false;
  return function (s) {
    if (e === undefined) {
      e = s;
      n = 0;
      r = -1;
    } else {
      e = function (t, e) {
        const n = new Uint8Array(t.length + e.length);
        n.set(t);
        n.set(e, t.length);
        return n;
      }(e, s);
    }
    const o = e.length;
    let a = 0;
    while (n < o) {
      if (i) {
        if (e[n] === 10) {
          a = ++n;
        }
        i = false;
      }
      let s = -1;
      for (; n < o && s === -1; ++n) {
        switch (e[n]) {
          case 58:
            if (r === -1) {
              r = n - a;
            }
            break;
          case 13:
            i = true;
          case 10:
            s = n;
        }
      }
      if (s === -1) {
        break;
      }
      t(e.subarray(a, s), r);
      a = n;
      r = -1;
    }
    if (a === o) {
      e = undefined;
    } else if (a !== 0) {
      e = e.subarray(a);
      n -= a;
    }
  };
}
const T = "text/event-stream";
const x = "last-event-id";
function A(t, e) {
  var {
    signal: n,
    headers: r,
    onopen: i,
    onmessage: s,
    onclose: o,
    onerror: a,
    openWhenHidden: c,
    fetch: u
  } = e;
  var l = function (t, e) {
    var n = {};
    for (var r in t) {
      if (Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0) {
        n[r] = t[r];
      }
    }
    if (t != null && typeof Object.getOwnPropertySymbols == "function") {
      var i = 0;
      for (r = Object.getOwnPropertySymbols(t); i < r.length; i++) {
        if (e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i])) {
          n[r[i]] = t[r[i]];
        }
      }
    }
    return n;
  }(e, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
  return new Promise((e, h) => {
    const d = Object.assign({}, r);
    let p;
    function f() {
      p.abort();
      if (!document.hidden) {
        b();
      }
    }
    d.accept ||= T;
    if (!c) {
      document.addEventListener("visibilitychange", f);
    }
    let m = 1000;
    let g = 0;
    function _() {
      document.removeEventListener("visibilitychange", f);
      window.clearTimeout(g);
      p.abort();
    }
    if (n != null) {
      n.addEventListener("abort", () => {
        _();
        e();
      });
    }
    const y = u ?? window.fetch;
    const v = i ?? O;
    async function b() {
      p = new AbortController();
      try {
        const n = await y(t, Object.assign(Object.assign({}, l), {
          headers: d,
          signal: p.signal
        }));
        await v(n);
        await async function (t, e) {
          const n = t.getReader();
          let r;
          while (!(r = await n.read()).done) {
            e(r.value);
          }
        }(n.body, S(function (t, e, n) {
          let r = {
            data: "",
            event: "",
            id: "",
            retry: undefined
          };
          const i = new TextDecoder();
          return function (s, o) {
            if (s.length === 0) {
              if (n != null) {
                n(r);
              }
              r = {
                data: "",
                event: "",
                id: "",
                retry: undefined
              };
            } else if (o > 0) {
              const n = i.decode(s.subarray(0, o));
              const a = o + (s[o + 1] === 32 ? 2 : 1);
              const c = i.decode(s.subarray(a));
              switch (n) {
                case "data":
                  r.data = r.data ? r.data + "\n" + c : c;
                  break;
                case "event":
                  r.event = c;
                  break;
                case "id":
                  t(r.id = c);
                  break;
                case "retry":
                  const n = parseInt(c, 10);
                  if (!isNaN(n)) {
                    e(r.retry = n);
                  }
              }
            }
          };
        }(t => {
          if (t) {
            d[x] = t;
          } else {
            delete d[x];
          }
        }, t => {
          m = t;
        }, s)));
        if (o != null) {
          o();
        }
        _();
        e();
      } catch (r) {
        if (!p.signal.aborted) {
          try {
            const t = (a == null ? undefined : a(r)) ?? m;
            window.clearTimeout(g);
            g = window.setTimeout(b, t);
          } catch (i) {
            _();
            h(i);
          }
        }
      }
    }
    b();
  });
}
function O(t) {
  const e = t.headers.get("content-type");
  if (!(e == null ? undefined : e.startsWith(T))) {
    throw new Error(`Expected content-type to be ${T}, Actual: ${e}`);
  }
}
const C = new class {
  baseURL;
  constructor() {
    const t = E();
    this.baseURL = t.apiBaseUrl;
  }
  async fetch(t, e = {}) {
    const n = await Oe();
    if (!n) {
      throw new Error("No valid OAuth token available");
    }
    const r = `${this.baseURL}${t}`;
    const i = {
      Authorization: `Bearer ${n}`,
      "Content-Type": "application/json",
      "anthropic-client-platform": "claude_browser_extension",
      ...e.headers
    };
    const s = await fetch(r, {
      ...e,
      headers: i
    });
    if (!s.ok) {
      throw new Error(`API request failed: ${s.status} ${s.statusText}`);
    }
    const o = s.headers.get("content-type");
    if (s.status === 204) {
      return null;
    } else if (o?.includes("application/json")) {
      return s.json();
    } else if (o) {
      return s.blob();
    } else {
      return null;
    }
  }
  async fetchEventSource(t, e) {
    const n = await Oe();
    if (!n) {
      throw new Error("No valid OAuth token available for SSE stream");
    }
    const r = `${this.baseURL}${t}`;
    const i = new AbortController();
    await A(r, {
      ...e,
      headers: {
        Authorization: `Bearer ${n}`,
        "anthropic-client-platform": "claude_browser_extension",
        ...e.headers
      },
      signal: e.signal || i.signal
    });
    return () => {
      i.abort();
    };
  }
}();
class P {
  config;
  features = null;
  cacheTimestamp = null;
  initPromise = null;
  isRefreshing = false;
  constructor(t) {
    this.config = {
      ...t,
      cacheTTL: t.cacheTTL ?? 300000,
      storageKey: t.storageKey ?? "features"
    };
  }
  setOnFeaturesUpdated(t) {
    this.config.onFeaturesUpdated = t;
  }
  async loadFromCache() {
    try {
      const t = (await chrome.storage.local.get(this.config.storageKey))[this.config.storageKey];
      if (t && t.payload && t.timestamp) {
        if (Date.now() - t.timestamp < this.config.cacheTTL) {
          return t;
        }
      }
    } catch (t) {}
    return null;
  }
  async saveToCache(t) {
    try {
      const e = {
        payload: t,
        timestamp: Date.now()
      };
      await chrome.storage.local.set({
        [this.config.storageKey]: e
      });
    } catch (e) {}
  }
  async fetchAndUpdate() {
    try {
      const t = await this.config.fetchFeatures();
      this.features = t.features;
      this.cacheTimestamp = Date.now();
      await this.saveToCache(t);
      this.config.onFeaturesUpdated?.(t.features);
    } catch (t) {
      throw t;
    }
  }
  checkAndRefreshIfStale() {
    if (!this.cacheTimestamp || this.isRefreshing) {
      return;
    }
    if (Date.now() - this.cacheTimestamp > this.config.cacheTTL) {
      this.isRefreshing = true;
      return this.fetchAndUpdate().catch(t => {}).finally(() => {
        this.isRefreshing = false;
      });
    } else {
      return undefined;
    }
  }
  async initialize() {
    if (!this.features) {
      this.initPromise ||= (async () => {
        const t = await this.loadFromCache();
        if (t) {
          this.features = t.payload.features;
          this.cacheTimestamp = t.timestamp;
          this.config.onFeaturesUpdated?.(t.payload.features);
          if (Date.now() - t.timestamp > this.config.cacheTTL / 2) {
            this.isRefreshing = true;
            try {
              await this.fetchAndUpdate();
            } catch (e) {} finally {
              this.isRefreshing = false;
            }
          }
          return;
        }
        try {
          await this.fetchAndUpdate();
        } catch {}
      })();
      return this.initPromise;
    }
  }
  getFeatureValue(t, e) {
    this.checkAndRefreshIfStale();
    const n = this.features?.[t];
    if (n && n.value !== undefined && n.value !== null) {
      return n.value;
    } else {
      return e;
    }
  }
  async getFeatureValueAsync(t, e) {
    await this.checkAndRefreshIfStale();
    const n = this.features?.[t];
    if (n && n.value !== undefined && n.value !== null) {
      return n.value;
    } else {
      return e;
    }
  }
  isFeatureEnabled(t) {
    this.checkAndRefreshIfStale();
    const e = this.features?.[t];
    return e?.on ?? false;
  }
  async isFeatureEnabledAsync(t) {
    await this.checkAndRefreshIfStale();
    const e = this.features?.[t];
    return e?.on ?? false;
  }
  getFeature(t) {
    this.checkAndRefreshIfStale();
    return this.features?.[t];
  }
  async getFeatureAsync(t) {
    await this.checkAndRefreshIfStale();
    return this.features?.[t];
  }
  async refresh() {
    await this.fetchAndUpdate();
  }
  isReady() {
    return this.features !== null;
  }
}
async function k() {
  if (await __cpShouldBypassAnthropicTraffic()) {
    return {
      features: {}
    };
  }
  return C.fetch("/api/bootstrap/features/claude_in_chrome");
}
let I = null;
const R = t.createContext(null);
function L({
  children: n
}) {
  const [r, i] = t.useState(null);
  const [s, o] = t.useState(false);
  const [a, c] = t.useState(null);
  const u = t.useRef(null);
  t.useEffect(() => {
    const t = t => {
      i(t);
      c(null);
    };
    n = t;
    I ||= new P({
      fetchFeatures: k,
      onFeaturesUpdated: n
    });
    const e = I;
    var n;
    u.current = e;
    e.setOnFeaturesUpdated(t);
    e.initialize().then(() => {
      o(true);
    }).catch(t => {
      c(t instanceof Error ? t : new Error(String(t)));
      o(true);
    });
  }, []);
  const l = t.useCallback((t, e) => u.current ? u.current.getFeatureValue(t, e) : e, [r]);
  const h = t.useCallback(t => !!u.current && u.current.isFeatureEnabled(t), [r]);
  const d = t.useCallback(t => {
    if (u.current) {
      return u.current.getFeature(t);
    }
  }, [r]);
  const p = t.useCallback(t => r?.[t] !== undefined, [r]);
  const f = t.useCallback(async () => {
    if (u.current) {
      await u.current.refresh();
    }
  }, []);
  const m = t.useMemo(() => ({
    isReady: s,
    error: a,
    getFeatureValue: l,
    isFeatureEnabled: h,
    getFeature: d,
    hasFeature: p,
    refresh: f
  }), [s, a, l, h, d, p, f]);
  return e.jsx(R.Provider, {
    value: m,
    children: n
  });
}
function M() {
  const e = t.useContext(R);
  if (!e) {
    throw new Error("useFeatures must be used within a FeatureProvider");
  }
  return e;
}
function N(t, e) {
  const {
    getFeatureValue: n
  } = M();
  return n(t, e);
}
function D(t) {
  const {
    isFeatureEnabled: e
  } = M();
  return e(t);
}
function U() {
  const {
    isReady: t
  } = M();
  return t;
}
var B = (t => {
  t.ACCESS_TOKEN = "accessToken";
  t.REFRESH_TOKEN = "refreshToken";
  t.TOKEN_EXPIRY = "tokenExpiry";
  t.OAUTH_STATE = "oauthState";
  t.CODE_VERIFIER = "codeVerifier";
  t.LAST_AUTH_FAILURE_REASON = "lastAuthFailureReason";
  t.ACCOUNT_UUID = "accountUuid";
  t.ANTHROPIC_API_KEY = "anthropicApiKey";
  t.SELECTED_MODEL = "selectedModel";
  t.SELECTED_MODEL_QUICK_MODE = "selectedModelQuickMode";
  t.SYSTEM_PROMPT = "systemPrompt";
  t.PURL_CONFIG = "purlConfig";
  t.DEBUG_MODE = "debugMode";
  t.MODEL_SELECTOR_DEBUG = "modelSelectorDebug";
  t.SHOW_TRACE_IDS = "showTraceIds";
  t.SHOW_SYSTEM_REMINDERS = "showSystemReminders";
  t.USE_SESSIONS_API = "useSessionsAPI";
  t.SESSIONS_API_HOSTNAME = "sessionsApiHostname";
  t.BROWSER_CONTROL_PERMISSION_ACCEPTED = "browserControlPermissionAccepted";
  t.PERMISSION_STORAGE = "permissionStorage";
  t.LAST_PERMISSION_MODE_PREFERENCE = "lastPermissionModePreference";
  t.ANONYMOUS_ID = "anonymousId";
  t.TEST_DATA_MESSAGES = "test_data_messages";
  t.SCHEDULED_TASK_LOGS = "scheduledTaskLogs";
  t.SCHEDULED_TASK_STATS = "scheduledTaskStats";
  t.PENDING_SCHEDULED_TASK = "pendingScheduledTask";
  t.TARGET_TAB_ID = "targetTabId";
  t.UPDATE_AVAILABLE = "updateAvailable";
  t.TIP_DISPLAY_COUNTS = "tipDisplayCounts";
  t.NOTIFICATIONS_ENABLED = "notificationsEnabled";
  t.ANNOUNCEMENT_DISMISSED = "announcementDismissed";
  t.MODEL_OVERRIDE_SEEN = "modelOverrideSeen";
  t.SAVED_PROMPTS = "savedPrompts";
  t.SAVED_PROMPT_CATEGORIES = "savedPromptCategories";
  t.TAB_GROUPS = "tabGroups";
  t.DISMISSED_TAB_GROUPS = "dismissedTabGroups";
  t.MCP_TAB_GROUP_ID = "mcpTabGroupId";
  t.MCP_CONNECTED = "mcpConnected";
  t.QUICK_MODE_TIP_DISMISSED = "quickModeTipDismissed";
  return t;
})(B || {});
async function $(t, e) {
  const n = await chrome.storage.local.get(t);
  if (n[t] !== undefined) {
    return n[t];
  } else {
    return e;
  }
}
async function j(t, e) {
  await chrome.storage.local.set({
    [t]: e
  });
}
async function F(t) {
  const e = Array.isArray(t) ? t : [t];
  await chrome.storage.local.remove(e);
}
async function z(t) {
  await chrome.storage.local.set(t);
}
const G = new Set(["anonymousId", "updateAvailable"]);
async function V() {
  const t = Object.values(B).filter(t => !G.has(t));
  await F(t);
}
let H = null;
async function q() {
  if (await __cpShouldBypassAnthropicTraffic()) {
    return {
      features: {}
    };
  }
  const t = E();
  const e = await Ae();
  if (!e) {
    throw new Error("No valid OAuth token available for feature fetch");
  }
  const n = await fetch(`${t.apiBaseUrl}/api/bootstrap/features/claude_in_chrome`, {
    headers: {
      Authorization: `Bearer ${e}`,
      "Content-Type": "application/json"
    }
  });
  if (n.status === 401) {
    await F([B.ACCESS_TOKEN, B.TOKEN_EXPIRY]);
    throw new Error("OAuth token rejected by server (401)");
  }
  if (!n.ok) {
    throw new Error(`Failed to fetch features: ${n.status}`);
  }
  return n.json();
}
function W() {
  H ||= new P({
    fetchFeatures: q
  });
  return H;
}
async function K(t) {
  const e = W();
  await e.initialize();
  const n = await e.getFeatureValueAsync(t, {});
  if ((r = n) && typeof r == "object" && Object.keys(r).some(t => r[t] !== undefined && r[t] !== null)) {
    return n;
  } else {
    return {};
  }
  var r;
}
function Y(t, e) {
  return W().getFeatureValue(t, e);
}
async function X() {
  const t = W();
  await t.refresh();
}
const J = 10000;
const Q = 8000;
const Z = 30000;
function tt() {
  return Y("cic_ext_timeouts", {});
}
const et = 10;
const nt = 45000;
const rt = 40000;
const it = 8000;
function st() {
  return tt().oauthRefreshMs ?? J;
}
function ot() {
  return tt().debuggerAttachMs ?? Q;
}
function at() {
  return tt().cdpSendCommandMs ?? Z;
}
const ct = 5000;
function ut() {
  return Y("cic_screencast_warmup", false);
}
function lt(t, e) {
  return (lt = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (t, e) {
    t.__proto__ = e;
  } || function (t, e) {
    for (var n in e) {
      if (Object.prototype.hasOwnProperty.call(e, n)) {
        t[n] = e[n];
      }
    }
  })(t, e);
}
function ht(t, e) {
  if (typeof e != "function" && e !== null) {
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  }
  function n() {
    this.constructor = t;
  }
  lt(t, e);
  t.prototype = e === null ? Object.create(e) : (n.prototype = e.prototype, new n());
}
function dt() {
  dt = Object.assign || function (t) {
    var e;
    for (var n = 1, r = arguments.length; n < r; n++) {
      for (var i in e = arguments[n]) {
        if (Object.prototype.hasOwnProperty.call(e, i)) {
          t[i] = e[i];
        }
      }
    }
    return t;
  };
  return dt.apply(this, arguments);
}
function pt(t, e, n, r) {
  return new (n ||= Promise)(function (i, s) {
    function o(t) {
      try {
        c(r.next(t));
      } catch (e) {
        s(e);
      }
    }
    function a(t) {
      try {
        c(r.throw(t));
      } catch (e) {
        s(e);
      }
    }
    function c(t) {
      var e;
      if (t.done) {
        i(t.value);
      } else {
        (e = t.value, e instanceof n ? e : new n(function (t) {
          t(e);
        })).then(o, a);
      }
    }
    c((r = r.apply(t, e || [])).next());
  });
}
function ft(t, e) {
  var n;
  var r;
  var i;
  var s;
  var o = {
    label: 0,
    sent: function () {
      if (i[0] & 1) {
        throw i[1];
      }
      return i[1];
    },
    trys: [],
    ops: []
  };
  s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  };
  if (typeof Symbol == "function") {
    s[Symbol.iterator] = function () {
      return this;
    };
  }
  return s;
  function a(a) {
    return function (c) {
      return function (a) {
        if (n) {
          throw new TypeError("Generator is already executing.");
        }
        while (s && (s = 0, a[0] && (o = 0)), o) {
          try {
            n = 1;
            if (r && (i = a[0] & 2 ? r.return : a[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, a[1])).done) {
              return i;
            }
            r = 0;
            if (i) {
              a = [a[0] & 2, i.value];
            }
            switch (a[0]) {
              case 0:
              case 1:
                i = a;
                break;
              case 4:
                o.label++;
                return {
                  value: a[1],
                  done: false
                };
              case 5:
                o.label++;
                r = a[1];
                a = [0];
                continue;
              case 7:
                a = o.ops.pop();
                o.trys.pop();
                continue;
              default:
                if (!(i = o.trys, (i = i.length > 0 && i[i.length - 1]) || a[0] !== 6 && a[0] !== 2)) {
                  o = 0;
                  continue;
                }
                if (a[0] === 3 && (!i || a[1] > i[0] && a[1] < i[3])) {
                  o.label = a[1];
                  break;
                }
                if (a[0] === 6 && o.label < i[1]) {
                  o.label = i[1];
                  i = a;
                  break;
                }
                if (i && o.label < i[2]) {
                  o.label = i[2];
                  o.ops.push(a);
                  break;
                }
                if (i[2]) {
                  o.ops.pop();
                }
                o.trys.pop();
                continue;
            }
            a = e.call(t, o);
          } catch (c) {
            a = [6, c];
            r = 0;
          } finally {
            n = i = 0;
          }
        }
        if (a[0] & 5) {
          throw a[1];
        }
        return {
          value: a[0] ? a[1] : undefined,
          done: true
        };
      }([a, c]);
    };
  }
}
function mt(t, e, n) {
  if (n || arguments.length === 2) {
    var r;
    for (var i = 0, s = e.length; i < s; i++) {
      if (!!r || !(i in e)) {
        r ||= Array.prototype.slice.call(e, 0, i);
        r[i] = e[i];
      }
    }
  }
  return t.concat(r || Array.prototype.slice.call(e));
}
var gt = function (t) {
  function e(e, n) {
    var r = t.call(this, `${e} ${n}`) || this;
    r.field = e;
    return r;
  }
  ht(e, t);
  return e;
}(Error);
function _t(t) {
  return typeof t == "string";
}
function yt(t) {
  return t != null;
}
function vt(t) {
  return Object.prototype.toString.call(t).slice(8, -1).toLowerCase() === "object";
}
var bt = "is not a string";
var wt = "is not an object";
var Et = "is nil";
function St(t) {
  (function (t) {
    if (!yt(t)) {
      throw new gt("Event", Et);
    }
    if (typeof t != "object") {
      throw new gt("Event", wt);
    }
  })(t);
  (function (t) {
    if (!_t(t.type)) {
      throw new gt(".type", bt);
    }
  })(t);
  if (t.type === "track") {
    (function (t) {
      if (!_t(t.event)) {
        throw new gt(".event", bt);
      }
    })(t);
    (function (t) {
      if (!vt(t.properties)) {
        throw new gt(".properties", wt);
      }
    })(t);
  }
  if (["group", "identify"].includes(t.type)) {
    (function (t) {
      if (!vt(t.traits)) {
        throw new gt(".traits", wt);
      }
    })(t);
  }
  (function (t) {
    var e;
    var s = ".userId/anonymousId/previousId/groupId";
    var o = (e = t).userId ?? e.anonymousId ?? e.groupId ?? e.previousId;
    if (!yt(o)) {
      throw new gt(s, Et);
    }
    if (!_t(o)) {
      throw new gt(s, bt);
    }
  })(t);
}
var Tt = function () {
  function t(t) {
    this.user = t.user;
    this.createMessageId = t.createMessageId;
  }
  t.prototype.track = function (t, e, n, r) {
    return this.normalize(dt(dt({}, this.baseEvent()), {
      event: t,
      type: "track",
      properties: e ?? {},
      options: dt({}, n),
      integrations: dt({}, r)
    }));
  };
  t.prototype.page = function (t, e, n, r, i) {
    var o = {
      type: "page",
      properties: dt({}, n),
      options: dt({}, r),
      integrations: dt({}, i)
    };
    if (t !== null) {
      o.category = t;
      o.properties = o.properties ?? {};
      o.properties.category = t;
    }
    if (e !== null) {
      o.name = e;
    }
    return this.normalize(dt(dt({}, this.baseEvent()), o));
  };
  t.prototype.screen = function (t, e, n, r, i) {
    var s = {
      type: "screen",
      properties: dt({}, n),
      options: dt({}, r),
      integrations: dt({}, i)
    };
    if (t !== null) {
      s.category = t;
    }
    if (e !== null) {
      s.name = e;
    }
    return this.normalize(dt(dt({}, this.baseEvent()), s));
  };
  t.prototype.identify = function (t, e, n, r) {
    return this.normalize(dt(dt({}, this.baseEvent()), {
      type: "identify",
      userId: t,
      traits: e ?? {},
      options: dt({}, n),
      integrations: r
    }));
  };
  t.prototype.group = function (t, e, n, r) {
    return this.normalize(dt(dt({}, this.baseEvent()), {
      type: "group",
      traits: e ?? {},
      options: dt({}, n),
      integrations: dt({}, r),
      groupId: t
    }));
  };
  t.prototype.alias = function (t, e, n, r) {
    var i = {
      userId: t,
      type: "alias",
      options: dt({}, n),
      integrations: dt({}, r)
    };
    if (e !== null) {
      i.previousId = e;
    }
    if (t === undefined) {
      return this.normalize(dt(dt({}, i), this.baseEvent()));
    } else {
      return this.normalize(dt(dt({}, this.baseEvent()), i));
    }
  };
  t.prototype.baseEvent = function () {
    var t = {
      integrations: {},
      options: {}
    };
    if (!this.user) {
      return t;
    }
    var e = this.user;
    if (e.id()) {
      t.userId = e.id();
    }
    if (e.anonymousId()) {
      t.anonymousId = e.anonymousId();
    }
    return t;
  };
  t.prototype.context = function (t) {
    var n = ["userId", "anonymousId", "timestamp"];
    delete t.integrations;
    var r = Object.keys(t);
    var i = t.context ?? {};
    var s = {};
    r.forEach(function (e) {
      if (e !== "context") {
        if (n.includes(e)) {
          p(s, e, t[e]);
        } else {
          p(i, e, t[e]);
        }
      }
    });
    return [i, s];
  };
  t.prototype.normalize = function (t) {
    var r;
    var i;
    var s = Object.keys(t.integrations ?? {}).reduce(function (e, n) {
      var r;
      return dt(dt({}, e), ((r = {})[n] = Boolean(t.integrations?.[n]), r));
    }, {});
    r = t.options || {};
    i = function (t, e) {
      return e !== undefined;
    };
    t.options = Object.keys(r).filter(function (t) {
      return i(t, r[t]);
    }).reduce(function (t, e) {
      t[e] = r[e];
      return t;
    }, {});
    var o = dt(dt({}, s), t.options?.integrations);
    var a = t.options ? this.context(t.options) : [];
    var c = a[0];
    var u = a[1];
    t.options;
    var l = function (t, e) {
      var n = {};
      for (var r in t) {
        if (Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0) {
          n[r] = t[r];
        }
      }
      if (t != null && typeof Object.getOwnPropertySymbols == "function") {
        var i = 0;
        for (r = Object.getOwnPropertySymbols(t); i < r.length; i++) {
          if (e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i])) {
            n[r[i]] = t[r[i]];
          }
        }
      }
      return n;
    }(t, ["options"]);
    var h = dt(dt(dt({
      timestamp: new Date()
    }, l), {
      integrations: o,
      context: c
    }), u);
    var d = dt(dt({}, h), {
      messageId: this.createMessageId()
    });
    St(d);
    return d;
  };
  return t;
}();
function xt(t, e) {
  return new Promise(function (n, r) {
    var i = setTimeout(function () {
      r(Error("Promise timed out"));
    }, e);
    t.then(function (t) {
      clearTimeout(i);
      return n(t);
    }).catch(r);
  });
}
function At(t, e, n) {
  var r;
  return (r = n, new Promise(function (t) {
    return setTimeout(t, r);
  })).then(function () {
    return xt(function () {
      try {
        return Promise.resolve(e(t));
      } catch (n) {
        return Promise.reject(n);
      }
    }(), 1000);
  }).catch(function (e) {
    if (t != null) {
      t.log("warn", "Callback Error", {
        error: e
      });
    }
    if (t != null) {
      t.stats.increment("callback_error");
    }
  }).then(function () {
    return t;
  });
}
var Ot = function () {
  function t(t) {
    this.callbacks = {};
    this.warned = false;
    this.maxListeners = (t == null ? undefined : t.maxListeners) ?? 10;
  }
  t.prototype.warnIfPossibleMemoryLeak = function (t) {
    if (!this.warned) {
      if (this.maxListeners && this.callbacks[t].length > this.maxListeners) {
        this.warned = true;
      }
    }
  };
  t.prototype.on = function (t, e) {
    if (this.callbacks[t]) {
      this.callbacks[t].push(e);
      this.warnIfPossibleMemoryLeak(t);
    } else {
      this.callbacks[t] = [e];
    }
    return this;
  };
  t.prototype.once = function (t, e) {
    var n = this;
    function r() {
      var i = [];
      for (var s = 0; s < arguments.length; s++) {
        i[s] = arguments[s];
      }
      n.off(t, r);
      e.apply(n, i);
    }
    this.on(t, r);
    return this;
  };
  t.prototype.off = function (t, e) {
    var r = (this.callbacks[t] ?? []).filter(function (t) {
      return t !== e;
    });
    this.callbacks[t] = r;
    return this;
  };
  t.prototype.emit = function (t) {
    var e;
    var n = this;
    var r = [];
    for (; i < arguments.length; i++) {
      r[i - 1] = arguments[i];
    }
    (this.callbacks[t] ?? []).forEach(function (t) {
      t.apply(n, r);
    });
    return this;
  };
  return t;
}();
function Ct(t) {
  var e = Math.random() + 1;
  var n = t.minTimeout;
  var r = n === undefined ? 500 : n;
  var i = t.factor;
  var s = i === undefined ? 2 : i;
  var o = t.attempt;
  var a = t.maxTimeout;
  var c = a === undefined ? Infinity : a;
  return Math.min(e * r * Math.pow(s, o), c);
}
var Pt = "onRemoveFromFuture";
var kt = function (t) {
  function e(e, n, r) {
    var i = t.call(this) || this;
    i.future = [];
    i.maxAttempts = e;
    i.queue = n;
    i.seen = r ?? {};
    return i;
  }
  ht(e, t);
  e.prototype.push = function () {
    var t = this;
    var e = [];
    for (var n = 0; n < arguments.length; n++) {
      e[n] = arguments[n];
    }
    var r = e.map(function (e) {
      return !(t.updateAttempts(e) > t.maxAttempts) && !t.includes(e) && (t.queue.push(e), true);
    });
    this.queue = this.queue.sort(function (e, n) {
      return t.getAttempts(e) - t.getAttempts(n);
    });
    return r;
  };
  e.prototype.pushWithBackoff = function (t) {
    var e = this;
    if (this.getAttempts(t) === 0) {
      return this.push(t)[0];
    }
    var n = this.updateAttempts(t);
    if (n > this.maxAttempts || this.includes(t)) {
      return false;
    }
    var r = Ct({
      attempt: n - 1
    });
    setTimeout(function () {
      e.queue.push(t);
      e.future = e.future.filter(function (e) {
        return e.id !== t.id;
      });
      e.emit(Pt);
    }, r);
    this.future.push(t);
    return true;
  };
  e.prototype.getAttempts = function (t) {
    return this.seen[t.id] ?? 0;
  };
  e.prototype.updateAttempts = function (t) {
    this.seen[t.id] = this.getAttempts(t) + 1;
    return this.getAttempts(t);
  };
  e.prototype.includes = function (t) {
    return this.queue.includes(t) || this.future.includes(t) || Boolean(this.queue.find(function (e) {
      return e.id === t.id;
    })) || Boolean(this.future.find(function (e) {
      return e.id === t.id;
    }));
  };
  e.prototype.pop = function () {
    return this.queue.shift();
  };
  Object.defineProperty(e.prototype, "length", {
    get: function () {
      return this.queue.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "todo", {
    get: function () {
      return this.queue.length + this.future.length;
    },
    enumerable: false,
    configurable: true
  });
  return e;
}(Ot);
var It = function () {
  function t() {
    this._logs = [];
  }
  t.prototype.log = function (t, e, n) {
    var r = new Date();
    this._logs.push({
      level: t,
      message: e,
      time: r,
      extras: n
    });
  };
  Object.defineProperty(t.prototype, "logs", {
    get: function () {
      return this._logs;
    },
    enumerable: false,
    configurable: true
  });
  t.prototype.flush = function () {
    if (this.logs.length > 1) {
      var t = this._logs.reduce(function (t, e) {
        var n;
        var r;
        var s = dt(dt({}, e), {
          json: JSON.stringify(e.extras, null, " "),
          extras: e.extras
        });
        delete s.time;
        var o = ((r = e.time) === null || r === undefined ? undefined : r.toISOString()) ?? "";
        if (t[o]) {
          o = `${o}-${Math.random()}`;
        }
        return dt(dt({}, t), ((n = {})[o] = s, n));
      }, {});
      if (console.table) {
        console.table(t);
      }
    } else {
      this.logs.forEach(function (t) {
        var e = t.level;
        var n = t.message;
        var r = t.extras;
        if (e !== "info" && e !== "debug") {
          console[e](n, r ?? "");
        }
      });
    }
    this._logs = [];
  };
  return t;
}();
var Rt = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  ht(e, t);
  e.prototype.gauge = function () {};
  e.prototype.increment = function () {};
  e.prototype.flush = function () {};
  e.prototype.serialize = function () {
    return [];
  };
  return e;
}(function () {
  function t() {
    this.metrics = [];
  }
  t.prototype.increment = function (t, e = 1, n) {
    this.metrics.push({
      metric: t,
      value: e,
      tags: n ?? [],
      type: "counter",
      timestamp: Date.now()
    });
  };
  t.prototype.gauge = function (t, e, n) {
    this.metrics.push({
      metric: t,
      value: e,
      tags: n ?? [],
      type: "gauge",
      timestamp: Date.now()
    });
  };
  t.prototype.flush = function () {
    var t = this.metrics.map(function (t) {
      return dt(dt({}, t), {
        tags: t.tags.join(",")
      });
    });
    if (console.table) {
      console.table(t);
    }
    this.metrics = [];
  };
  t.prototype.serialize = function () {
    return this.metrics.map(function (t) {
      return {
        m: t.metric,
        v: t.value,
        t: t.tags,
        k: (e = t.type, {
          gauge: "g",
          counter: "c"
        }[e]),
        e: t.timestamp
      };
      var e;
    });
  };
  return t;
}());
var Lt = function () {
  return function (t) {
    var e;
    this.retry = (e = t.retry) === null || e === undefined || e;
    this.type = t.type ?? "plugin Error";
    this.reason = t.reason ?? "";
  };
}();
var Mt = function () {
  function t(t, e = _(), n = new Rt(), r = new It()) {
    this.attempts = 0;
    this.event = t;
    this._id = e;
    this.logger = r;
    this.stats = n;
  }
  t.system = function () {};
  t.prototype.isSame = function (t) {
    return t.id === this.id;
  };
  t.prototype.cancel = function (t) {
    if (t) {
      throw t;
    }
    throw new Lt({
      reason: "Context Cancel"
    });
  };
  t.prototype.log = function (t, e, n) {
    this.logger.log(t, e, n);
  };
  Object.defineProperty(t.prototype, "id", {
    get: function () {
      return this._id;
    },
    enumerable: false,
    configurable: true
  });
  t.prototype.updateEvent = function (t, e) {
    if (t.split(".")[0] === "integrations") {
      var r = t.split(".")[1];
      if (this.event.integrations?.[r] === false) {
        return this.event;
      }
    }
    p(this.event, t, e);
    return this.event;
  };
  t.prototype.failedDelivery = function () {
    return this._failedDelivery;
  };
  t.prototype.setFailedDelivery = function (t) {
    this._failedDelivery = t;
  };
  t.prototype.logs = function () {
    return this.logger.logs;
  };
  t.prototype.flush = function () {
    this.logger.flush();
    this.stats.flush();
  };
  t.prototype.toJSON = function () {
    return {
      id: this._id,
      event: this.event,
      logs: this.logger.logs,
      metrics: this.stats.metrics
    };
  };
  return t;
}();
function Nt(t, e) {
  t.log("debug", "plugin", {
    plugin: e.name
  });
  var n = new Date().getTime();
  var r = e[t.event.type];
  if (r === undefined) {
    return Promise.resolve(t);
  } else {
    return function (t) {
      return pt(this, undefined, undefined, function () {
        var e;
        return ft(this, function (n) {
          switch (n.label) {
            case 0:
              n.trys.push([0, 2,, 3]);
              return [4, t()];
            case 1:
              return [2, n.sent()];
            case 2:
              e = n.sent();
              return [2, Promise.reject(e)];
            case 3:
              return [2];
          }
        });
      });
    }(function () {
      return r.apply(e, [t]);
    }).then(function (t) {
      var r = new Date().getTime() - n;
      t.stats.gauge("plugin_time", r, [`plugin:${e.name}`]);
      return t;
    }).catch(function (n) {
      if (n instanceof Lt && n.type === "middleware_cancellation") {
        throw n;
      }
      if (n instanceof Lt) {
        t.log("warn", n.type, {
          plugin: e.name,
          error: n
        });
        return n;
      } else {
        t.log("error", "plugin Error", {
          plugin: e.name,
          error: n
        });
        t.stats.increment("plugin_error", 1, [`plugin:${e.name}`]);
        return n;
      }
    });
  }
}
function Dt(t, e) {
  return Nt(t, e).then(function (e) {
    if (e instanceof Mt) {
      return e;
    }
    t.log("debug", "Context canceled");
    t.stats.increment("context_canceled");
    t.cancel(e);
  });
}
var Ut = function (t) {
  function e(e) {
    var n;
    var r;
    var i;
    var s = t.call(this) || this;
    i = 0;
    s.criticalTasks = {
      done: function () {
        return n;
      },
      run: function (t) {
        var e;
        var s = t();
        if (typeof (e = s) == "object" && e !== null && "then" in e && typeof e.then == "function") {
          if (++i === 1) {
            n = new Promise(function (t) {
              return r = t;
            });
          }
          s.finally(function () {
            return --i === 0 && r();
          });
        }
        return s;
      }
    };
    s.plugins = [];
    s.failedInitializations = [];
    s.flushing = false;
    s.queue = e;
    s.queue.on(Pt, function () {
      s.scheduleFlush(0);
    });
    return s;
  }
  ht(e, t);
  e.prototype.register = function (t, e, n) {
    return pt(this, undefined, undefined, function () {
      var r = this;
      return ft(this, function (i) {
        switch (i.label) {
          case 0:
            return [4, Promise.resolve(e.load(t, n)).then(function () {
              r.plugins.push(e);
            }).catch(function (n) {
              if (e.type === "destination") {
                r.failedInitializations.push(e.name);
                t.log("warn", "Failed to load destination", {
                  plugin: e.name,
                  error: n
                });
                return;
              }
              throw n;
            })];
          case 1:
            i.sent();
            return [2];
        }
      });
    });
  };
  e.prototype.deregister = function (t, e, n) {
    return pt(this, undefined, undefined, function () {
      var r;
      return ft(this, function (i) {
        switch (i.label) {
          case 0:
            i.trys.push([0, 3,, 4]);
            if (e.unload) {
              return [4, Promise.resolve(e.unload(t, n))];
            } else {
              return [3, 2];
            }
          case 1:
            i.sent();
            i.label = 2;
          case 2:
            this.plugins = this.plugins.filter(function (t) {
              return t.name !== e.name;
            });
            return [3, 4];
          case 3:
            r = i.sent();
            t.log("warn", "Failed to unload destination", {
              plugin: e.name,
              error: r
            });
            return [3, 4];
          case 4:
            return [2];
        }
      });
    });
  };
  e.prototype.dispatch = function (t) {
    return pt(this, undefined, undefined, function () {
      var e;
      return ft(this, function (n) {
        t.log("debug", "Dispatching");
        t.stats.increment("message_dispatched");
        this.queue.push(t);
        e = this.subscribeToDelivery(t);
        this.scheduleFlush(0);
        return [2, e];
      });
    });
  };
  e.prototype.subscribeToDelivery = function (t) {
    return pt(this, undefined, undefined, function () {
      var e = this;
      return ft(this, function (n) {
        return [2, new Promise(function (n) {
          function r(i, s) {
            if (i.isSame(t)) {
              e.off("flush", r);
              n(i);
            }
          }
          e.on("flush", r);
        })];
      });
    });
  };
  e.prototype.dispatchSingle = function (t) {
    return pt(this, undefined, undefined, function () {
      var e = this;
      return ft(this, function (n) {
        t.log("debug", "Dispatching");
        t.stats.increment("message_dispatched");
        this.queue.updateAttempts(t);
        t.attempts = 1;
        return [2, this.deliver(t).catch(function (n) {
          if (e.enqueuRetry(n, t)) {
            return e.subscribeToDelivery(t);
          } else {
            t.setFailedDelivery({
              reason: n
            });
            return t;
          }
        })];
      });
    });
  };
  e.prototype.isEmpty = function () {
    return this.queue.length === 0;
  };
  e.prototype.scheduleFlush = function (t) {
    var e = this;
    if (t === undefined) {
      t = 500;
    }
    if (!this.flushing) {
      this.flushing = true;
      setTimeout(function () {
        e.flush().then(function () {
          setTimeout(function () {
            e.flushing = false;
            if (e.queue.length) {
              e.scheduleFlush(0);
            }
          }, 0);
        });
      }, t);
    }
  };
  e.prototype.deliver = function (t) {
    return pt(this, undefined, undefined, function () {
      var e;
      var n;
      var r;
      var i;
      return ft(this, function (s) {
        switch (s.label) {
          case 0:
            return [4, this.criticalTasks.done()];
          case 1:
            s.sent();
            e = Date.now();
            s.label = 2;
          case 2:
            s.trys.push([2, 4,, 5]);
            return [4, this.flushOne(t)];
          case 3:
            t = s.sent();
            n = Date.now() - e;
            this.emit("delivery_success", t);
            t.stats.gauge("delivered", n);
            t.log("debug", "Delivered", t.event);
            return [2, t];
          case 4:
            r = s.sent();
            i = r;
            t.log("error", "Failed to deliver", i);
            this.emit("delivery_failure", t, i);
            t.stats.increment("delivery_failed");
            throw r;
          case 5:
            return [2];
        }
      });
    });
  };
  e.prototype.enqueuRetry = function (t, e) {
    return (!(t instanceof Lt) || !!t.retry) && this.queue.pushWithBackoff(e);
  };
  e.prototype.flush = function () {
    return pt(this, undefined, undefined, function () {
      var t;
      var e;
      return ft(this, function (n) {
        switch (n.label) {
          case 0:
            if (this.queue.length === 0) {
              return [2, []];
            }
            if (!(t = this.queue.pop())) {
              return [2, []];
            }
            t.attempts = this.queue.getAttempts(t);
            n.label = 1;
          case 1:
            n.trys.push([1, 3,, 4]);
            return [4, this.deliver(t)];
          case 2:
            t = n.sent();
            this.emit("flush", t, true);
            return [3, 4];
          case 3:
            e = n.sent();
            if (!this.enqueuRetry(e, t)) {
              t.setFailedDelivery({
                reason: e
              });
              this.emit("flush", t, false);
            }
            return [2, []];
          case 4:
            return [2, [t]];
        }
      });
    });
  };
  e.prototype.isReady = function () {
    return true;
  };
  e.prototype.availableExtensions = function (t) {
    var e;
    var n;
    var r = this.plugins.filter(function (e) {
      var n;
      if (e.type !== "destination" && e.name !== "Segment.io") {
        return true;
      }
      var s = undefined;
      if ((n = e.alternativeNames) !== null && n !== undefined) {
        n.forEach(function (e) {
          if (t[e] !== undefined) {
            s = t[e];
          }
        });
      }
      return t[e.name] ?? s ?? (e.name === "Segment.io" || t.All) !== false;
    });
    e = "type";
    n = {};
    r.forEach(function (t) {
      var i;
      var s = t[e];
      if ((i = typeof s != "string" ? JSON.stringify(s) : s) !== undefined) {
        n[i] = mt(mt([], n[i] ?? [], true), [t], false);
      }
    });
    var i = n;
    var s = i.before;
    var o = s === undefined ? [] : s;
    var a = i.enrichment;
    var c = a === undefined ? [] : a;
    var u = i.destination;
    var l = u === undefined ? [] : u;
    var h = i.after;
    return {
      before: o,
      enrichment: c,
      destinations: l,
      after: h === undefined ? [] : h
    };
  };
  e.prototype.flushOne = function (t) {
    return pt(this, undefined, undefined, function () {
      var r;
      var i;
      var s;
      var o;
      var a;
      var c;
      var u;
      var l;
      var h;
      var d;
      var p;
      var f;
      var m;
      var g;
      return ft(this, function (_) {
        switch (_.label) {
          case 0:
            if (!this.isReady()) {
              throw new Error("Not ready");
            }
            if (t.attempts > 1) {
              this.emit("delivery_retry", t);
            }
            r = this.availableExtensions(t.event.integrations ?? {});
            i = r.before;
            s = r.enrichment;
            o = 0;
            a = i;
            _.label = 1;
          case 1:
            if (o < a.length) {
              c = a[o];
              return [4, Dt(t, c)];
            } else {
              return [3, 4];
            }
          case 2:
            if ((d = _.sent()) instanceof Mt) {
              t = d;
            }
            this.emit("message_enriched", t, c);
            _.label = 3;
          case 3:
            o++;
            return [3, 1];
          case 4:
            u = 0;
            l = s;
            _.label = 5;
          case 5:
            if (u < l.length) {
              h = l[u];
              return [4, Nt(t, h)];
            } else {
              return [3, 8];
            }
          case 6:
            if ((d = _.sent()) instanceof Mt) {
              t = d;
            }
            this.emit("message_enriched", t, h);
            _.label = 7;
          case 7:
            u++;
            return [3, 5];
          case 8:
            p = this.availableExtensions(t.event.integrations ?? {});
            f = p.destinations;
            m = p.after;
            return [4, new Promise(function (e, n) {
              setTimeout(function () {
                var r = f.map(function (e) {
                  return Nt(t, e);
                });
                Promise.all(r).then(e).catch(n);
              }, 0);
            })];
          case 9:
            _.sent();
            t.stats.increment("message_delivered");
            this.emit("message_delivered", t);
            g = m.map(function (e) {
              return Nt(t, e);
            });
            return [4, Promise.all(g)];
          case 10:
            _.sent();
            return [2, t];
        }
      });
    });
  };
  return e;
}(Ot);
const Bt = "1.3.0";
class $t {
  constructor(t) {
    this.id = _();
    this.items = [];
    this.sizeInBytes = 0;
    this.maxEventCount = Math.max(1, t);
  }
  tryAdd(t) {
    if (this.length === this.maxEventCount) {
      return {
        success: false,
        message: `Event limit of ${this.maxEventCount} has been exceeded.`
      };
    }
    const e = this.calculateSize(t.context);
    if (e > 32768) {
      return {
        success: false,
        message: "Event exceeds maximum event size of 32 KB"
      };
    } else if (this.sizeInBytes + e > 491520) {
      return {
        success: false,
        message: "Event has caused batch size to exceed 480 KB"
      };
    } else {
      this.items.push(t);
      this.sizeInBytes += e;
      return {
        success: true
      };
    }
  }
  get length() {
    return this.items.length;
  }
  calculateSize(t) {
    return encodeURI(JSON.stringify(t.event)).split(/%..|i/).length;
  }
  getEvents() {
    return this.items.map(({
      context: t
    }) => t.event);
  }
  getContexts() {
    return this.items.map(t => t.context);
  }
  resolveEvents() {
    this.items.forEach(({
      resolver: t,
      context: e
    }) => t(e));
  }
}
function jt(t) {
  return new Promise(e => setTimeout(e, t));
}
function Ft() {}
class zt {
  constructor({
    host: t,
    path: e,
    maxRetries: n,
    flushAt: r,
    flushInterval: i,
    writeKey: s,
    httpRequestTimeout: o,
    httpClient: a,
    disable: c
  }, u) {
    var h;
    this._emitter = u;
    this._maxRetries = n;
    this._flushAt = Math.max(r, 1);
    this._flushInterval = i;
    this._auth = (h = `${s}:`, l.Buffer.from(h).toString("base64"));
    this._url = ((t, e) => new URL(e || "", t).href.replace(/\/$/, ""))(t ?? "https://api.segment.io", e ?? "/v1/batch");
    this._httpRequestTimeout = o ?? 10000;
    this._disable = Boolean(c);
    this._httpClient = a;
  }
  createBatch() {
    if (this.pendingFlushTimeout) {
      clearTimeout(this.pendingFlushTimeout);
    }
    const t = new $t(this._flushAt);
    this._batch = t;
    this.pendingFlushTimeout = setTimeout(() => {
      if (t === this._batch) {
        this._batch = undefined;
      }
      this.pendingFlushTimeout = undefined;
      if (t.length) {
        this.send(t).catch(Ft);
      }
    }, this._flushInterval);
    return t;
  }
  clearBatch() {
    if (this.pendingFlushTimeout) {
      clearTimeout(this.pendingFlushTimeout);
    }
    this._batch = undefined;
  }
  flush(t) {
    if (!t) {
      return;
    }
    this._flushPendingItemsCount = t;
    if (!this._batch) {
      return;
    }
    if (this._batch.length === t) {
      this.send(this._batch).catch(Ft);
      this.clearBatch();
    }
  }
  enqueue(t) {
    const e = this._batch ?? this.createBatch();
    const {
      promise: n,
      resolve: r
    } = function () {
      var t;
      var e;
      var n = new Promise(function (n, r) {
        t = n;
        e = r;
      });
      return {
        resolve: t,
        reject: e,
        promise: n
      };
    }();
    const i = {
      context: t,
      resolver: r
    };
    if (e.tryAdd(i).success) {
      const t = e.length === this._flushPendingItemsCount;
      if (e.length === this._flushAt || t) {
        this.send(e).catch(Ft);
        this.clearBatch();
      }
      return n;
    }
    if (e.length) {
      this.send(e).catch(Ft);
      this.clearBatch();
    }
    const s = this.createBatch();
    const o = s.tryAdd(i);
    if (o.success) {
      if (s.length === this._flushPendingItemsCount) {
        this.send(s).catch(Ft);
        this.clearBatch();
      }
      return n;
    }
    t.setFailedDelivery({
      reason: new Error(o.message)
    });
    return Promise.resolve(t);
  }
  async send(t) {
    if (this._flushPendingItemsCount) {
      this._flushPendingItemsCount -= t.length;
    }
    const e = t.getEvents();
    const n = this._maxRetries + 1;
    let r = 0;
    while (r < n) {
      let s;
      r++;
      try {
        if (this._disable) {
          return t.resolveEvents();
        }
        const n = {
          url: this._url,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${this._auth}`,
            "User-Agent": "analytics-node-next/latest"
          },
          data: {
            batch: e,
            sentAt: new Date()
          },
          httpRequestTimeout: this._httpRequestTimeout
        };
        this._emitter.emit("http_request", {
          body: n.data,
          method: n.method,
          url: n.url,
          headers: n.headers
        });
        const r = await this._httpClient.makeRequest(n);
        if (r.status >= 200 && r.status < 300) {
          t.resolveEvents();
          return;
        }
        if (r.status === 400) {
          Gt(t, new Error(`[${r.status}] ${r.statusText}`));
          return;
        }
        s = new Error(`[${r.status}] ${r.statusText}`);
      } catch (i) {
        s = i;
      }
      if (r === n) {
        Gt(t, s);
        return;
      }
      await jt(Ct({
        attempt: r,
        minTimeout: 25,
        maxTimeout: 1000
      }));
    }
  }
}
function Gt(t, e) {
  t.getContexts().forEach(t => t.setFailedDelivery({
    reason: e
  }));
  t.resolveEvents();
}
var Vt = {};
const Ht = () => typeof process == "object" && process && Vt && typeof process.version == "string" ? "node" : typeof window == "object" ? "browser" : typeof WebSocketPair != "undefined" ? "cloudflare-worker" : typeof EdgeRuntime == "string" ? "vercel-edge" : typeof WorkerGlobalScope != "undefined" && typeof importScripts == "function" ? "web-worker" : "unknown";
function qt(t) {
  function e(e) {
    (function (t) {
      t.updateEvent("context.library.name", "@segment/analytics-node");
      t.updateEvent("context.library.version", Bt);
      const e = Ht();
      if (e === "node") {
        t.updateEvent("_metadata.nodeVersion", process.version);
      }
      t.updateEvent("_metadata.jsRuntime", e);
    })(e);
    return t.enqueue(e);
  }
  return {
    name: "Segment.io",
    type: "destination",
    version: "1.0.0",
    isLoaded: () => true,
    load: () => Promise.resolve(),
    alias: e,
    group: e,
    identify: e,
    page: e,
    screen: e,
    track: e
  };
}
const Wt = () => `node-next-${Date.now()}-${_()}`;
class Kt extends Tt {
  constructor() {
    super({
      createMessageId: Wt
    });
  }
}
class Yt extends Mt {
  static system() {
    return new this({
      type: "track",
      event: "system"
    });
  }
}
const Xt = async (t, e, n, r) => {
  try {
    const s = new Yt(t);
    const o = await function (t, e, n, r) {
      return pt(this, undefined, undefined, function () {
        var i;
        var s;
        return ft(this, function (o) {
          switch (o.label) {
            case 0:
              n.emit("dispatch_start", t);
              i = Date.now();
              if (e.isEmpty()) {
                return [4, e.dispatchSingle(t)];
              } else {
                return [3, 2];
              }
            case 1:
              s = o.sent();
              return [3, 4];
            case 2:
              return [4, e.dispatch(t)];
            case 3:
              s = o.sent();
              o.label = 4;
            case 4:
              if (r == null ? undefined : r.callback) {
                return [4, At(s, r.callback, (a = i, c = r.timeout, u = Date.now() - a, Math.max((c ?? 300) - u, 0)))];
              } else {
                return [3, 6];
              }
            case 5:
              s = o.sent();
              o.label = 6;
            case 6:
              if (r == null ? undefined : r.debug) {
                s.flush();
              }
              return [2, s];
          }
          var a;
          var c;
          var u;
        });
      });
    }(s, e, n, {
      ...(r ? {
        callback: (i = r, t => {
          const e = t.failedDelivery();
          return i(e ? e.reason : undefined, t);
        })
      } : {})
    });
    const a = o.failedDelivery();
    if (a) {
      n.emit("error", {
        code: "delivery_failure",
        reason: a.reason,
        ctx: o
      });
    } else {
      n.emit(t.type, o);
    }
  } catch (s) {
    n.emit("error", {
      code: "unknown",
      reason: s
    });
  }
  var i;
};
class Jt extends Ot {}
class Qt extends kt {
  constructor() {
    super(1, []);
  }
  getAttempts(t) {
    return t.attempts ?? 0;
  }
  updateAttempts(t) {
    t.attempts = this.getAttempts(t) + 1;
    return this.getAttempts(t);
  }
}
class Zt extends Ut {
  constructor() {
    super(new Qt());
  }
}
let te = class {
  constructor() {
    this.onabort = null;
    this.aborted = false;
    this.eventEmitter = new Ot();
  }
  toString() {
    return "[object AbortSignal]";
  }
  get [Symbol.toStringTag]() {
    return "AbortSignal";
  }
  removeEventListener(...t) {
    this.eventEmitter.off(...t);
  }
  addEventListener(...t) {
    this.eventEmitter.on(...t);
  }
  dispatchEvent(t) {
    const e = {
      type: t,
      target: this
    };
    const n = `on${t}`;
    if (typeof this[n] == "function") {
      this[n](e);
    }
    this.eventEmitter.emit(t, e);
  }
};
let ee = class {
  constructor() {
    this.signal = new te();
  }
  abort() {
    if (!this.signal.aborted) {
      this.signal.aborted = true;
      this.signal.dispatchEvent("abort");
    }
  }
  toString() {
    return "[object AbortController]";
  }
  get [Symbol.toStringTag]() {
    return "AbortController";
  }
};
const ne = async (...t) => {
  if (globalThis.fetch) {
    return globalThis.fetch(...t);
  }
  if (typeof EdgeRuntime != "string") {
    return (await d(async () => {
      const {
        default: t
      } = await import("./index-DeoomIOo.js");
      return {
        default: t
      };
    }, __vite__mapDeps([0, 1, 2]))).default(...t);
  }
  throw new Error("Invariant: an edge runtime that does not support fetch should not exist");
};
class re {
  constructor(t) {
    this._fetch = t ?? ne;
  }
  async makeRequest(t) {
    const [e, n] = (t => {
      if (Ht() === "cloudflare-worker") {
        return [];
      }
      const e = new (globalThis.AbortController || ee)();
      const n = setTimeout(() => {
        e.abort();
      }, t);
      n?.unref?.();
      return [e.signal, n];
    })(t.httpRequestTimeout);
    const r = {
      url: t.url,
      method: t.method,
      headers: t.headers,
      body: JSON.stringify(t.data),
      signal: e
    };
    return this._fetch(t.url, r).finally(() => clearTimeout(n));
  }
}
class ie extends Jt {
  constructor(t) {
    super();
    this._isClosed = false;
    this._pendingEvents = 0;
    this._isFlushing = false;
    (t => {
      if (!t.writeKey) {
        throw new gt("writeKey", "writeKey is missing.");
      }
    })(t);
    this._eventFactory = new Kt();
    this._queue = new Zt();
    const e = t.flushInterval ?? 10000;
    this._closeAndFlushDefaultTimeout = e * 1.25;
    const {
      plugin: n,
      publisher: r
    } = ((t, e) => {
      const n = new zt(t, e);
      return {
        publisher: n,
        plugin: qt(n)
      };
    })({
      writeKey: t.writeKey,
      host: t.host,
      path: t.path,
      maxRetries: t.maxRetries ?? 3,
      flushAt: t.flushAt ?? t.maxEventsInBatch ?? 15,
      httpRequestTimeout: t.httpRequestTimeout,
      disable: t.disable,
      flushInterval: e,
      httpClient: typeof t.httpClient == "function" ? new re(t.httpClient) : t.httpClient ?? new re()
    }, this);
    this._publisher = r;
    this.ready = this.register(n).then(() => {});
    this.emit("initialize", t);
    (function (t) {
      var e = t.constructor.prototype;
      for (var n = 0, r = Object.getOwnPropertyNames(e); n < r.length; n++) {
        var i = r[n];
        if (i !== "constructor") {
          var s = Object.getOwnPropertyDescriptor(t.constructor.prototype, i);
          if (s && typeof s.value == "function") {
            t[i] = t[i].bind(t);
          }
        }
      }
    })(this);
  }
  get VERSION() {
    return Bt;
  }
  closeAndFlush({
    timeout: t = this._closeAndFlushDefaultTimeout
  } = {}) {
    return this.flush({
      timeout: t,
      close: true
    });
  }
  async flush({
    timeout: t,
    close: e = false
  } = {}) {
    if (this._isFlushing) {
      return;
    }
    this._isFlushing = true;
    if (e) {
      this._isClosed = true;
    }
    this._publisher.flush(this._pendingEvents);
    const n = new Promise(t => {
      if (this._pendingEvents) {
        this.once("drained", () => {
          t();
        });
      } else {
        t();
      }
    }).finally(() => {
      this._isFlushing = false;
    });
    if (t) {
      return xt(n, t).catch(() => {});
    } else {
      return n;
    }
  }
  _dispatch(t, e) {
    if (this._isClosed) {
      this.emit("call_after_close", t);
    } else {
      this._pendingEvents++;
      Xt(t, this._queue, this, e).catch(t => t).finally(() => {
        this._pendingEvents--;
        if (!this._pendingEvents) {
          this.emit("drained");
        }
      });
    }
  }
  alias({
    userId: t,
    previousId: e,
    context: n,
    timestamp: r,
    integrations: i
  }, s) {
    const o = this._eventFactory.alias(t, e, {
      context: n,
      integrations: i,
      timestamp: r
    });
    this._dispatch(o, s);
  }
  group({
    timestamp: t,
    groupId: e,
    userId: n,
    anonymousId: r,
    traits: i = {},
    context: s,
    integrations: o
  }, a) {
    const c = this._eventFactory.group(e, i, {
      context: s,
      anonymousId: r,
      userId: n,
      timestamp: t,
      integrations: o
    });
    this._dispatch(c, a);
  }
  identify({
    userId: t,
    anonymousId: e,
    traits: n = {},
    context: r,
    timestamp: i,
    integrations: s
  }, o) {
    const a = this._eventFactory.identify(t, n, {
      context: r,
      anonymousId: e,
      userId: t,
      timestamp: i,
      integrations: s
    });
    this._dispatch(a, o);
  }
  page({
    userId: t,
    anonymousId: e,
    category: n,
    name: r,
    properties: i,
    context: s,
    timestamp: o,
    integrations: a
  }, c) {
    const u = this._eventFactory.page(n ?? null, r ?? null, i, {
      context: s,
      anonymousId: e,
      userId: t,
      timestamp: o,
      integrations: a
    });
    this._dispatch(u, c);
  }
  screen({
    userId: t,
    anonymousId: e,
    category: n,
    name: r,
    properties: i,
    context: s,
    timestamp: o,
    integrations: a
  }, c) {
    const u = this._eventFactory.screen(n ?? null, r ?? null, i, {
      context: s,
      anonymousId: e,
      userId: t,
      timestamp: o,
      integrations: a
    });
    this._dispatch(u, c);
  }
  track({
    userId: t,
    anonymousId: e,
    event: n,
    properties: r,
    context: i,
    timestamp: s,
    integrations: o
  }, a) {
    const c = this._eventFactory.track(n, r, {
      context: i,
      userId: t,
      anonymousId: e,
      timestamp: s,
      integrations: o
    });
    this._dispatch(c, a);
  }
  register(...t) {
    return this._queue.criticalTasks.run(async () => {
      const e = Yt.system();
      const n = t.map(t => this._queue.register(e, t, this));
      await Promise.all(n);
      this.emit("register", t.map(t => t.name));
    });
  }
  async deregister(...t) {
    const e = Yt.system();
    const n = t.map(t => {
      const n = this._queue.plugins.find(e => e.name === t);
      if (n) {
        return this._queue.deregister(e, n, this);
      }
      e.log("warn", `plugin ${t} not found`);
    });
    await Promise.all(n);
    this.emit("deregister", t);
  }
}
const se = async () => {
  let t = await $(B.ANONYMOUS_ID);
  if (!t) {
    t = crypto.randomUUID();
    await j(B.ANONYMOUS_ID, t);
  }
  return t;
};
const oe = t => ({
  email: t.account.email,
  organizationID: t.organization.uuid,
  organizationUUID: t.organization.uuid,
  applicationSlug: "claude-browser-use",
  isMax: t.account.has_claude_max,
  isPro: t.account.has_claude_pro,
  orgType: t.organization.organization_type
});
let ae = null;
let ce = null;
let ue = null;
const le = async (t, e) => {
  const n = await fetch(t, e);
  return {
    status: n.status,
    statusText: n.statusText,
    headers: Object.fromEntries(n.headers.entries()),
    json: () => n.json(),
    text: () => n.text()
  };
};
const he = async () => {
  if (await __cpShouldBypassAnthropicTraffic()) {
    ae = null;
    ce = null;
    ue = null;
    return;
  }
  if (ce) {
    return ce;
  }
  if (!ae) {
    ce = (async () => {
      try {
        const t = E();
        t.segmentWriteKey;
        ae = new ie({
          writeKey: t.segmentWriteKey,
          flushAt: 1,
          flushInterval: 10000,
          httpClient: le
        });
        await de();
      } catch (t) {}
    })();
    await ce;
  }
};
const de = async () => {
  if (await __cpShouldBypassAnthropicTraffic()) {
    ue = null;
    return null;
  }
  if (ae) {
    try {
      const t = await (async () => {
        try {
          const t = await Ae();
          if (!t) {
            return null;
          }
          const e = `${E().apiBaseUrl}/api/oauth/profile`;
          const n = await fetch(e, {
            headers: {
              Authorization: `Bearer ${t}`,
              "Content-Type": "application/json"
            }
          });
          if (n.ok) {
            return await n.json();
          } else {
            return null;
          }
        } catch {
          return null;
        }
      })();
      const e = await se();
      const n = chrome.runtime.getManifest().version;
      if (t) {
        ue = t.account.uuid;
        ae.identify({
          userId: ue,
          anonymousId: e,
          traits: {
            ...oe(t),
            extensionVersion: n
          }
        });
      } else {
        ue = null;
      }
    } catch (t) {}
  }
};
const pe = async (t, e = {}) => {
  try {
    if (await __cpShouldBypassAnthropicTraffic()) {
      return;
    }
    if (!ae) {
      await he();
    }
    if (!ae) {
      return;
    }
    const n = await se();
    const r = chrome.runtime.getManifest().version;
    const i = {
      anonymousId: n,
      event: t,
      properties: {
        ...e,
        extension_version: r
      }
    };
    if (ue) {
      i.userId = ue;
    }
    ae.track(i);
  } catch (n) {}
};
const fe = 3600000;
function me(t, e) {
  pe("chrome_ext_oauth_refresh", {
    outcome: t,
    ...e
  });
}
const ge = t => btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
const _e = t => {
  const e = new Uint8Array(t);
  crypto.getRandomValues(e);
  return ge(e);
};
const ye = async t => {
  const e = new TextEncoder().encode(t);
  const n = await crypto.subtle.digest("SHA-256", e);
  return ge(new Uint8Array(n));
};
const ve = async (t, e, n, r) => {
  try {
    const i = await fetch(r.TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: r.CLIENT_ID,
        code: t,
        redirect_uri: r.REDIRECT_URI,
        state: e,
        code_verifier: n
      }),
      signal: AbortSignal.timeout(st())
    });
    if (!i.ok) {
      const t = await i.text();
      return {
        success: false,
        error: `Token exchange failed: ${i.status} ${t}`
      };
    }
    const s = await i.json();
    if (s.error) {
      return {
        success: false,
        error: s.error_description || s.error
      };
    } else {
      return {
        success: true,
        accessToken: s.access_token,
        refreshToken: s.refresh_token,
        expiresAt: s.expires_in ? Date.now() + s.expires_in * 1000 : undefined
      };
    }
  } catch (i) {
    return {
      success: false,
      error: i instanceof Error ? i.message : "Network error during token exchange"
    };
  }
};
const be = async (t, e) => {
  await F(B.LAST_AUTH_FAILURE_REASON);
  await z({
    [B.ACCESS_TOKEN]: t.accessToken,
    [B.REFRESH_TOKEN]: t.refreshToken,
    [B.TOKEN_EXPIRY]: t.expiresAt,
    [B.OAUTH_STATE]: e
  });
};
let we = false;
async function Ee() {
  if (!Y("cic_ext_silent_reauth", false)) {
    return "disabled_by_gate";
  }
  const t = await $(B.ACCOUNT_UUID);
  if (!t) {
    return "no_stored_account";
  }
  const e = E();
  const n = _e(32);
  const r = ge(crypto.getRandomValues(new Uint8Array(32)));
  const i = await ye(r);
  const s = chrome.identity.getRedirectURL();
  const o = new URLSearchParams({
    client_id: e.oauth.CLIENT_ID,
    response_type: "code",
    scope: e.oauth.SCOPES_STR,
    redirect_uri: s,
    state: n,
    code_challenge: i,
    code_challenge_method: "S256",
    prompt: "none",
    login_hint: t
  });
  if (we) {
    return "authorize_failed";
  }
  we = true;
  let a;
  let c;
  let u;
  try {
    c = await Promise.race([chrome.identity.launchWebAuthFlow({
      url: `${e.oauth.AUTHORIZE_URL}?${o.toString()}`,
      interactive: false
    }).finally(() => {
      we = false;
    }), new Promise((t, e) => {
      a = setTimeout(() => e(new Error("launchWebAuthFlow timeout")), 15000);
    })]);
  } catch {
    return "authorize_failed";
  } finally {
    if (a) {
      clearTimeout(a);
    }
  }
  if (!c) {
    return "authorize_failed";
  }
  try {
    u = new URL(c);
  } catch {
    return "authorize_failed";
  }
  const l = u.searchParams.get("error");
  if (l) {
    if (l === "login_required") {
      return "account_mismatch";
    } else {
      return "interaction_required";
    }
  }
  if (u.searchParams.get("state") !== n) {
    return "authorize_failed";
  }
  const h = u.searchParams.get("code");
  if (!h) {
    return "authorize_failed";
  }
  const d = await ve(h, n, r, {
    ...e.oauth,
    REDIRECT_URI: s
  });
  if (d.success) {
    await be(d, n);
    return "success";
  } else {
    return "code_exchange_failed";
  }
}
const Se = async (t, e) => {
  const n = st();
  const r = new AbortController();
  const i = setTimeout(() => r.abort(), n);
  try {
    const n = await fetch(e.TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: e.CLIENT_ID,
        refresh_token: t
      }),
      signal: r.signal
    });
    if (!n.ok) {
      const t = await n.text();
      const e = n.status === 400 && t.includes("invalid_grant") ? "invalid_grant" : "server_error";
      return {
        success: false,
        error: `Token refresh failed: ${n.status} ${t}`,
        failureReason: e
      };
    }
    const i = await n.json();
    if (i.error) {
      return {
        success: false,
        error: i.error_description || i.error,
        failureReason: i.error === "invalid_grant" ? "invalid_grant" : "server_error"
      };
    } else {
      return {
        success: true,
        accessToken: i.access_token,
        refreshToken: i.refresh_token || t,
        expiresAt: i.expires_in ? Date.now() + i.expires_in * 1000 : undefined
      };
    }
  } catch (s) {
    return {
      success: false,
      error: s instanceof DOMException && s.name === "AbortError" ? `Token refresh timed out after ${n}ms (auth endpoint unreachable or slow)` : s instanceof Error ? s.message : "Network error during token refresh",
      failureReason: "network_error"
    };
  } finally {
    clearTimeout(i);
  }
};
let Te = null;
const xe = () => Te || (Te = async function () {
  try {
    const t = await async function (t) {
      return await chrome.storage.local.get(t);
    }([B.ACCESS_TOKEN, B.REFRESH_TOKEN, B.TOKEN_EXPIRY]);
    const e = !!t[B.ACCESS_TOKEN];
    const n = !!t[B.REFRESH_TOKEN];
    if (!e && !n) {
      return {
        isValid: false,
        isRefreshed: false
      };
    }
    const r = Date.now();
    const i = t[B.TOKEN_EXPIRY];
    const s = e && !!i && r < i;
    if (!!e && (!i || !(r >= i - fe))) {
      return {
        isValid: s,
        isRefreshed: false
      };
    }
    if (!n) {
      if (!s) {
        await j(B.LAST_AUTH_FAILURE_REASON, "session_expired");
      }
      return {
        isValid: s,
        isRefreshed: false
      };
    }
    const o = E();
    const a = {
      was_access_token_expired: !s,
      was_access_token_missing: !e
    };
    for (let c = 0; c < 3; c++) {
      const e = await Se(t[B.REFRESH_TOKEN], o.oauth);
      if (e.success) {
        await be(e);
        me("success", {
          ...a,
          attempt: c,
          tokens_deleted: false
        });
        return {
          isValid: true,
          isRefreshed: true
        };
      }
      if (e.failureReason === "invalid_grant") {
        await F(B.REFRESH_TOKEN);
        const t = await Ee();
        if (t === "success") {
          me("invalid_grant", {
            ...a,
            attempt: c,
            tokens_deleted: false,
            silent_reauth_outcome: t
          });
          return {
            isValid: true,
            isRefreshed: true
          };
        } else {
          if (!s) {
            await j(B.LAST_AUTH_FAILURE_REASON, "session_expired");
          }
          me("invalid_grant", {
            ...a,
            attempt: c,
            tokens_deleted: false,
            silent_reauth_outcome: t
          });
          return {
            isValid: s,
            isRefreshed: false
          };
        }
      }
      if (c === 2) {
        me(e.failureReason ?? "network_error", {
          ...a,
          attempt: c,
          tokens_deleted: false
        });
        return {
          isValid: s,
          isRefreshed: false
        };
      }
    }
    return {
      isValid: s,
      isRefreshed: false
    };
  } catch {
    return {
      isValid: false,
      isRefreshed: false
    };
  }
}().finally(() => {
  Te = null;
}), Te);
const Ae = async () => {
  if (!(await xe()).isValid) {
    return;
  }
  return (await $(B.ACCESS_TOKEN)) || undefined;
};
const Oe = async () => {
  if ("ServiceWorkerGlobalScope" in globalThis) {
    return Ae();
  }
  try {
    const t = await chrome.runtime.sendMessage({
      type: "check_and_refresh_oauth"
    });
    if (t?.isValid) {
      return $(B.ACCESS_TOKEN);
    }
    if (t) {
      return;
    }
  } catch {}
  return Ae();
};
const Ce = async t => {
  if (await __cpShouldBypassAnthropicTraffic()) {
    return;
  }
  const e = t ?? (await Ae());
  if (e) {
    try {
      const t = E();
      const n = await fetch(`${t.apiBaseUrl}/api/oauth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json"
        },
        signal: AbortSignal.timeout(st())
      });
      if (!n.ok) {
        return;
      }
      const r = await n.json();
      return r?.account?.uuid;
    } catch (n) {
      return;
    }
  }
};
const Pe = async (t, e) => {
  try {
    const n = new URLSearchParams(new URL(t).search);
    const r = n.get("code");
    const i = n.get("error");
    const s = n.get("error_description");
    const o = n.get("state");
    if (i) {
      return {
        success: false,
        error: `Authentication failed: ${i}${s ? " - " + s : ""}`
      };
    }
    if (!r) {
      return {
        success: false,
        error: "No authorization code received"
      };
    }
    const a = (await $(B.CODE_VERIFIER)) || "";
    const c = E();
    const u = await ve(r, o || "", a, c.oauth);
    if (u.success) {
      await be(u, o || undefined);
      await F(B.ACCOUNT_UUID);
      const t = "https://claude.ai/chrome/installed";
      if (e) {
        await chrome.tabs.update(e, {
          url: t
        });
      }
      Ce(u.accessToken).then(t => {
        if (t) {
          j(B.ACCOUNT_UUID, t);
        }
      });
      return {
        success: true,
        message: "Authentication successful!"
      };
    }
    return {
      success: false,
      error: u.error || "Failed to exchange authorization code for token"
    };
  } catch (n) {
    return {
      success: false,
      error: n instanceof Error ? n.message : "An unexpected error occurred during authentication"
    };
  }
};
const ke = async () => {
  await V();
};
const Ie = async () => {
  const t = E();
  const e = _e(32);
  const n = ge(crypto.getRandomValues(new Uint8Array(32)));
  const r = await ye(n);
  await z({
    [B.OAUTH_STATE]: e,
    [B.CODE_VERIFIER]: n
  });
  const i = new URLSearchParams({
    client_id: t.oauth.CLIENT_ID,
    response_type: "code",
    scope: t.oauth.SCOPES_STR,
    redirect_uri: t.oauth.REDIRECT_URI,
    state: e,
    code_challenge: r,
    code_challenge_method: "S256"
  });
  const s = `${t.oauth.AUTHORIZE_URL}?${i.toString()}`;
  chrome.tabs.create({
    url: s
  });
};
const Re = Object.freeze(Object.defineProperty({
  __proto__: null,
  base64URLEncode: ge,
  checkAndRefreshOAuthTokenIfNeeded: xe,
  clearAuthTokenAndLocalStorage: ke,
  exchangeCodeForToken: ve,
  generateCodeChallenge: ye,
  generateRandomString: _e,
  getAuthToken: Ae,
  getAuthTokenCrossRealm: Oe,
  getUserId: Ce,
  handleOAuthRedirect: Pe,
  initiateOAuthFlow: Ie,
  refreshToken: Se,
  storeTokens: be
}, Symbol.toStringTag, {
  value: "Module"
}));
const Le = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__;
const Me = globalThis;
const Ne = "10.22.0";
function De() {
  Ue(Me);
  return Me;
}
function Ue(t) {
  const e = t.__SENTRY__ = t.__SENTRY__ || {};
  e.version = e.version || Ne;
  return e[Ne] = e[Ne] || {};
}
function Be(t, e, n = Me) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {};
  const i = r[Ne] = r[Ne] || {};
  return i[t] ||= e();
}
const $e = ["debug", "info", "warn", "error", "log", "assert", "trace"];
const je = {};
function Fe(t) {
  if (!("console" in Me)) {
    return t();
  }
  const e = Me.console;
  const n = {};
  const r = Object.keys(je);
  r.forEach(t => {
    const r = je[t];
    n[t] = e[t];
    e[t] = r;
  });
  try {
    return t();
  } finally {
    r.forEach(t => {
      e[t] = n[t];
    });
  }
}
function ze() {
  return Ve().enabled;
}
function Ge(t, ...e) {
  if (Le && ze()) {
    Fe(() => {
      Me.console[t](`Sentry Logger [${t}]:`, ...e);
    });
  }
}
function Ve() {
  if (Le) {
    return Be("loggerSettings", () => ({
      enabled: false
    }));
  } else {
    return {
      enabled: false
    };
  }
}
const He = {
  enable: function () {
    Ve().enabled = true;
  },
  disable: function () {
    Ve().enabled = false;
  },
  isEnabled: ze,
  log: function (...t) {
    Ge("log", ...t);
  },
  warn: function (...t) {
    Ge("warn", ...t);
  },
  error: function (...t) {
    Ge("error", ...t);
  }
};
const qe = "?";
const We = /\(error: (.*)\)/;
const Ke = /captureMessage|captureException/;
function Ye(...t) {
  const e = t.sort((t, e) => t[0] - e[0]).map(t => t[1]);
  return (t, n = 0, r = 0) => {
    const i = [];
    const s = t.split("\n");
    for (let o = n; o < s.length; o++) {
      let t = s[o];
      if (t.length > 1024) {
        t = t.slice(0, 1024);
      }
      const n = We.test(t) ? t.replace(We, "$1") : t;
      if (!n.match(/\S*Error: /)) {
        for (const t of e) {
          const e = t(n);
          if (e) {
            i.push(e);
            break;
          }
        }
        if (i.length >= 50 + r) {
          break;
        }
      }
    }
    return function (t) {
      if (!t.length) {
        return [];
      }
      const e = Array.from(t);
      if (/sentryWrapped/.test(Xe(e).function || "")) {
        e.pop();
      }
      e.reverse();
      if (Ke.test(Xe(e).function || "")) {
        e.pop();
        if (Ke.test(Xe(e).function || "")) {
          e.pop();
        }
      }
      return e.slice(0, 50).map(t => ({
        ...t,
        filename: t.filename || Xe(e).filename,
        function: t.function || qe
      }));
    }(i.slice(r));
  };
}
function Xe(t) {
  return t[t.length - 1] || {};
}
const Je = "<anonymous>";
function Qe(t) {
  try {
    return t && typeof t == "function" && t.name || Je;
  } catch {
    return Je;
  }
}
function Ze(t) {
  const e = t.exception;
  if (e) {
    const t = [];
    try {
      e.values.forEach(e => {
        if (e.stacktrace.frames) {
          t.push(...e.stacktrace.frames);
        }
      });
      return t;
    } catch {
      return;
    }
  }
}
const tn = {};
const en = {};
function nn(t, e) {
  tn[t] = tn[t] || [];
  tn[t].push(e);
}
function rn(t, e) {
  if (!en[t]) {
    en[t] = true;
    try {
      e();
    } catch (n) {
      if (Le) {
        He.error(`Error while instrumenting ${t}`, n);
      }
    }
  }
}
function sn(t, e) {
  const n = t && tn[t];
  if (n) {
    for (const i of n) {
      try {
        i(e);
      } catch (r) {
        if (Le) {
          He.error(`Error while triggering instrumentation handler.\nType: ${t}\nName: ${Qe(i)}\nError:`, r);
        }
      }
    }
  }
}
let on = null;
function an() {
  on = Me.onerror;
  Me.onerror = function (t, e, n, r, i) {
    sn("error", {
      column: r,
      error: i,
      line: n,
      msg: t,
      url: e
    });
    return !!on && on.apply(this, arguments);
  };
  Me.onerror.__SENTRY_INSTRUMENTED__ = true;
}
let cn = null;
function un() {
  cn = Me.onunhandledrejection;
  Me.onunhandledrejection = function (t) {
    sn("unhandledrejection", t);
    return !cn || cn.apply(this, arguments);
  };
  Me.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}
const ln = Object.prototype.toString;
function hn(t) {
  switch (ln.call(t)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return true;
    default:
      return wn(t, Error);
  }
}
function dn(t, e) {
  return ln.call(t) === `[object ${e}]`;
}
function pn(t) {
  return dn(t, "ErrorEvent");
}
function fn(t) {
  return dn(t, "DOMError");
}
function mn(t) {
  return dn(t, "String");
}
function gn(t) {
  return typeof t == "object" && t !== null && "__sentry_template_string__" in t && "__sentry_template_values__" in t;
}
function _n(t) {
  return t === null || gn(t) || typeof t != "object" && typeof t != "function";
}
function yn(t) {
  return dn(t, "Object");
}
function vn(t) {
  return typeof Event != "undefined" && wn(t, Event);
}
function bn(t) {
  return Boolean(t?.then && typeof t.then == "function");
}
function wn(t, e) {
  try {
    return t instanceof e;
  } catch {
    return false;
  }
}
function En(t) {
  return typeof t == "object" && t !== null && (!!t.__isVue || !!t._isVue);
}
const Sn = Me;
function Tn(t, e = {}) {
  if (!t) {
    return "<unknown>";
  }
  try {
    let n = t;
    const r = 5;
    const i = [];
    let s = 0;
    let o = 0;
    const a = " > ";
    const c = a.length;
    let u;
    const l = Array.isArray(e) ? e : e.keyAttrs;
    const h = !Array.isArray(e) && e.maxStringLength || 80;
    while (n && s++ < r && (u = xn(n, l), u !== "html" && (!(s > 1) || !(o + i.length * c + u.length >= h)))) {
      i.push(u);
      o += u.length;
      n = n.parentNode;
    }
    return i.reverse().join(a);
  } catch {
    return "<unknown>";
  }
}
function xn(t, e) {
  const n = t;
  const r = [];
  if (!n?.tagName) {
    return "";
  }
  if (Sn.HTMLElement && n instanceof HTMLElement && n.dataset) {
    if (n.dataset.sentryComponent) {
      return n.dataset.sentryComponent;
    }
    if (n.dataset.sentryElement) {
      return n.dataset.sentryElement;
    }
  }
  r.push(n.tagName.toLowerCase());
  const i = e?.length ? e.filter(t => n.getAttribute(t)).map(t => [t, n.getAttribute(t)]) : null;
  if (i?.length) {
    i.forEach(t => {
      r.push(`[${t[0]}="${t[1]}"]`);
    });
  } else {
    if (n.id) {
      r.push(`#${n.id}`);
    }
    const t = n.className;
    if (t && mn(t)) {
      const e = t.split(/\s+/);
      for (const t of e) {
        r.push(`.${t}`);
      }
    }
  }
  const s = ["aria-label", "type", "name", "title", "alt"];
  for (const o of s) {
    const t = n.getAttribute(o);
    if (t) {
      r.push(`[${o}="${t}"]`);
    }
  }
  return r.join("");
}
function An() {
  try {
    return Sn.document.location.href;
  } catch {
    return "";
  }
}
function On(t, e = 0) {
  if (typeof t != "string" || e === 0 || t.length <= e) {
    return t;
  } else {
    return `${t.slice(0, e)}...`;
  }
}
function Cn(t, e) {
  if (!Array.isArray(t)) {
    return "";
  }
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const e = t[r];
    try {
      if (En(e)) {
        n.push("[VueViewModel]");
      } else {
        n.push(String(e));
      }
    } catch {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(e);
}
function Pn(t, e, n = false) {
  return !!mn(t) && (dn(e, "RegExp") ? e.test(t) : !!mn(e) && (n ? t === e : t.includes(e)));
}
function kn(t, e = [], n = false) {
  return e.some(e => Pn(t, e, n));
}
function In(t, e, n) {
  if (!(e in t)) {
    return;
  }
  const r = t[e];
  if (typeof r != "function") {
    return;
  }
  const i = n(r);
  if (typeof i == "function") {
    Ln(i, r);
  }
  try {
    t[e] = i;
  } catch {
    if (Le) {
      He.log(`Failed to replace method "${e}" in object`, t);
    }
  }
}
function Rn(t, e, n) {
  try {
    Object.defineProperty(t, e, {
      value: n,
      writable: true,
      configurable: true
    });
  } catch {
    if (Le) {
      He.log(`Failed to add non-enumerable property "${e}" to object`, t);
    }
  }
}
function Ln(t, e) {
  try {
    const n = e.prototype || {};
    t.prototype = e.prototype = n;
    Rn(t, "__sentry_original__", e);
  } catch {}
}
function Mn(t) {
  return t.__sentry_original__;
}
function Nn(t) {
  if (hn(t)) {
    return {
      message: t.message,
      name: t.name,
      stack: t.stack,
      ...Un(t)
    };
  }
  if (vn(t)) {
    const e = {
      type: t.type,
      target: Dn(t.target),
      currentTarget: Dn(t.currentTarget),
      ...Un(t)
    };
    if (typeof CustomEvent != "undefined" && wn(t, CustomEvent)) {
      e.detail = t.detail;
    }
    return e;
  }
  return t;
}
function Dn(t) {
  try {
    e = t;
    if (typeof Element != "undefined" && wn(e, Element)) {
      return Tn(t);
    } else {
      return Object.prototype.toString.call(t);
    }
  } catch {
    return "<unknown>";
  }
  var e;
}
function Un(t) {
  if (typeof t == "object" && t !== null) {
    const e = {};
    for (const n in t) {
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        e[n] = t[n];
      }
    }
    return e;
  }
  return {};
}
let Bn;
function $n(t = function () {
  const t = Me;
  return t.crypto || t.msCrypto;
}()) {
  try {
    if (t?.randomUUID) {
      return t.randomUUID().replace(/-/g, "");
    }
  } catch {}
  Bn ||= "10000000100040008000100000000000";
  return Bn.replace(/[018]/g, t => (t ^ (Math.random() * 16 & 15) >> t / 4).toString(16));
}
function jn(t) {
  return t.exception?.values?.[0];
}
function Fn(t) {
  const {
    message: e,
    event_id: n
  } = t;
  if (e) {
    return e;
  }
  const r = jn(t);
  if (r) {
    if (r.type && r.value) {
      return `${r.type}: ${r.value}`;
    } else {
      return r.type || r.value || n || "<unknown>";
    }
  } else {
    return n || "<unknown>";
  }
}
function zn(t, e, n) {
  const r = t.exception = t.exception || {};
  const i = r.values = r.values || [];
  const s = i[0] = i[0] || {};
  s.value ||= e || "";
  s.type ||= "Error";
}
function Gn(t, e) {
  const n = jn(t);
  if (!n) {
    return;
  }
  const r = n.mechanism;
  n.mechanism = {
    type: "generic",
    handled: true,
    ...r,
    ...e
  };
  if (e && "data" in e) {
    const t = {
      ...r?.data,
      ...e.data
    };
    n.mechanism.data = t;
  }
}
function Vn(t) {
  if (function (t) {
    try {
      return t.__sentry_captured__;
    } catch {}
  }(t)) {
    return true;
  }
  try {
    Rn(t, "__sentry_captured__", true);
  } catch {}
  return false;
}
function Hn() {
  return Date.now() / 1000;
}
let qn;
function Wn() {
  return (qn ??= function () {
    const {
      performance: t
    } = Me;
    if (!t?.now || !t.timeOrigin) {
      return Hn;
    }
    const e = t.timeOrigin;
    return () => (e + t.now()) / 1000;
  }())();
}
function Kn(t) {
  const e = Wn();
  const n = {
    sid: $n(),
    init: true,
    timestamp: e,
    started: e,
    duration: 0,
    status: "ok",
    errors: 0,
    ignoreDuration: false,
    toJSON: () => function (t) {
      return {
        sid: `${t.sid}`,
        init: t.init,
        started: new Date(t.started * 1000).toISOString(),
        timestamp: new Date(t.timestamp * 1000).toISOString(),
        status: t.status,
        errors: t.errors,
        did: typeof t.did == "number" || typeof t.did == "string" ? `${t.did}` : undefined,
        duration: t.duration,
        abnormal_mechanism: t.abnormal_mechanism,
        attrs: {
          release: t.release,
          environment: t.environment,
          ip_address: t.ipAddress,
          user_agent: t.userAgent
        }
      };
    }(n)
  };
  if (t) {
    Yn(n, t);
  }
  return n;
}
function Yn(t, e = {}) {
  if (e.user) {
    if (!t.ipAddress && e.user.ip_address) {
      t.ipAddress = e.user.ip_address;
    }
    if (!t.did && !e.did) {
      t.did = e.user.id || e.user.email || e.user.username;
    }
  }
  t.timestamp = e.timestamp || Wn();
  if (e.abnormal_mechanism) {
    t.abnormal_mechanism = e.abnormal_mechanism;
  }
  if (e.ignoreDuration) {
    t.ignoreDuration = e.ignoreDuration;
  }
  if (e.sid) {
    t.sid = e.sid.length === 32 ? e.sid : $n();
  }
  if (e.init !== undefined) {
    t.init = e.init;
  }
  if (!t.did && e.did) {
    t.did = `${e.did}`;
  }
  if (typeof e.started == "number") {
    t.started = e.started;
  }
  if (t.ignoreDuration) {
    t.duration = undefined;
  } else if (typeof e.duration == "number") {
    t.duration = e.duration;
  } else {
    const e = t.timestamp - t.started;
    t.duration = e >= 0 ? e : 0;
  }
  if (e.release) {
    t.release = e.release;
  }
  if (e.environment) {
    t.environment = e.environment;
  }
  if (!t.ipAddress && e.ipAddress) {
    t.ipAddress = e.ipAddress;
  }
  if (!t.userAgent && e.userAgent) {
    t.userAgent = e.userAgent;
  }
  if (typeof e.errors == "number") {
    t.errors = e.errors;
  }
  if (e.status) {
    t.status = e.status;
  }
}
function Xn(t, e, n = 2) {
  if (!e || typeof e != "object" || n <= 0) {
    return e;
  }
  if (t && Object.keys(e).length === 0) {
    return t;
  }
  const r = {
    ...t
  };
  for (const i in e) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      r[i] = Xn(r[i], e[i], n - 1);
    }
  }
  return r;
}
function Jn() {
  return $n();
}
function Qn() {
  return $n().substring(16);
}
const Zn = "_sentrySpan";
function tr(t, e) {
  if (e) {
    Rn(t, Zn, e);
  } else {
    delete t[Zn];
  }
}
function er(t) {
  return t[Zn];
}
class nr {
  constructor() {
    this._notifyingListeners = false;
    this._scopeListeners = [];
    this._eventProcessors = [];
    this._breadcrumbs = [];
    this._attachments = [];
    this._user = {};
    this._tags = {};
    this._extra = {};
    this._contexts = {};
    this._sdkProcessingMetadata = {};
    this._propagationContext = {
      traceId: Jn(),
      sampleRand: Math.random()
    };
  }
  clone() {
    const t = new nr();
    t._breadcrumbs = [...this._breadcrumbs];
    t._tags = {
      ...this._tags
    };
    t._extra = {
      ...this._extra
    };
    t._contexts = {
      ...this._contexts
    };
    if (this._contexts.flags) {
      t._contexts.flags = {
        values: [...this._contexts.flags.values]
      };
    }
    t._user = this._user;
    t._level = this._level;
    t._session = this._session;
    t._transactionName = this._transactionName;
    t._fingerprint = this._fingerprint;
    t._eventProcessors = [...this._eventProcessors];
    t._attachments = [...this._attachments];
    t._sdkProcessingMetadata = {
      ...this._sdkProcessingMetadata
    };
    t._propagationContext = {
      ...this._propagationContext
    };
    t._client = this._client;
    t._lastEventId = this._lastEventId;
    tr(t, er(this));
    return t;
  }
  setClient(t) {
    this._client = t;
  }
  setLastEventId(t) {
    this._lastEventId = t;
  }
  getClient() {
    return this._client;
  }
  lastEventId() {
    return this._lastEventId;
  }
  addScopeListener(t) {
    this._scopeListeners.push(t);
  }
  addEventProcessor(t) {
    this._eventProcessors.push(t);
    return this;
  }
  setUser(t) {
    this._user = t || {
      email: undefined,
      id: undefined,
      ip_address: undefined,
      username: undefined
    };
    if (this._session) {
      Yn(this._session, {
        user: t
      });
    }
    this._notifyScopeListeners();
    return this;
  }
  getUser() {
    return this._user;
  }
  setTags(t) {
    this._tags = {
      ...this._tags,
      ...t
    };
    this._notifyScopeListeners();
    return this;
  }
  setTag(t, e) {
    this._tags = {
      ...this._tags,
      [t]: e
    };
    this._notifyScopeListeners();
    return this;
  }
  setExtras(t) {
    this._extra = {
      ...this._extra,
      ...t
    };
    this._notifyScopeListeners();
    return this;
  }
  setExtra(t, e) {
    this._extra = {
      ...this._extra,
      [t]: e
    };
    this._notifyScopeListeners();
    return this;
  }
  setFingerprint(t) {
    this._fingerprint = t;
    this._notifyScopeListeners();
    return this;
  }
  setLevel(t) {
    this._level = t;
    this._notifyScopeListeners();
    return this;
  }
  setTransactionName(t) {
    this._transactionName = t;
    this._notifyScopeListeners();
    return this;
  }
  setContext(t, e) {
    if (e === null) {
      delete this._contexts[t];
    } else {
      this._contexts[t] = e;
    }
    this._notifyScopeListeners();
    return this;
  }
  setSession(t) {
    if (t) {
      this._session = t;
    } else {
      delete this._session;
    }
    this._notifyScopeListeners();
    return this;
  }
  getSession() {
    return this._session;
  }
  update(t) {
    if (!t) {
      return this;
    }
    const e = typeof t == "function" ? t(this) : t;
    const n = e instanceof nr ? e.getScopeData() : yn(e) ? t : undefined;
    const {
      tags: r,
      extra: i,
      user: s,
      contexts: o,
      level: a,
      fingerprint: c = [],
      propagationContext: u
    } = n || {};
    this._tags = {
      ...this._tags,
      ...r
    };
    this._extra = {
      ...this._extra,
      ...i
    };
    this._contexts = {
      ...this._contexts,
      ...o
    };
    if (s && Object.keys(s).length) {
      this._user = s;
    }
    if (a) {
      this._level = a;
    }
    if (c.length) {
      this._fingerprint = c;
    }
    if (u) {
      this._propagationContext = u;
    }
    return this;
  }
  clear() {
    this._breadcrumbs = [];
    this._tags = {};
    this._extra = {};
    this._user = {};
    this._contexts = {};
    this._level = undefined;
    this._transactionName = undefined;
    this._fingerprint = undefined;
    this._session = undefined;
    tr(this, undefined);
    this._attachments = [];
    this.setPropagationContext({
      traceId: Jn(),
      sampleRand: Math.random()
    });
    this._notifyScopeListeners();
    return this;
  }
  addBreadcrumb(t, e) {
    const n = typeof e == "number" ? e : 100;
    if (n <= 0) {
      return this;
    }
    const r = {
      timestamp: Hn(),
      ...t,
      message: t.message ? On(t.message, 2048) : t.message
    };
    this._breadcrumbs.push(r);
    if (this._breadcrumbs.length > n) {
      this._breadcrumbs = this._breadcrumbs.slice(-n);
      this._client?.recordDroppedEvent("buffer_overflow", "log_item");
    }
    this._notifyScopeListeners();
    return this;
  }
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  clearBreadcrumbs() {
    this._breadcrumbs = [];
    this._notifyScopeListeners();
    return this;
  }
  addAttachment(t) {
    this._attachments.push(t);
    return this;
  }
  clearAttachments() {
    this._attachments = [];
    return this;
  }
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: er(this)
    };
  }
  setSDKProcessingMetadata(t) {
    this._sdkProcessingMetadata = Xn(this._sdkProcessingMetadata, t, 2);
    return this;
  }
  setPropagationContext(t) {
    this._propagationContext = t;
    return this;
  }
  getPropagationContext() {
    return this._propagationContext;
  }
  captureException(t, e) {
    const n = e?.event_id || $n();
    if (!this._client) {
      if (Le) {
        He.warn("No client configured on scope - will not capture exception!");
      }
      return n;
    }
    const r = new Error("Sentry syntheticException");
    this._client.captureException(t, {
      originalException: t,
      syntheticException: r,
      ...e,
      event_id: n
    }, this);
    return n;
  }
  captureMessage(t, e, n) {
    const r = n?.event_id || $n();
    if (!this._client) {
      if (Le) {
        He.warn("No client configured on scope - will not capture message!");
      }
      return r;
    }
    const i = new Error(t);
    this._client.captureMessage(t, e, {
      originalException: t,
      syntheticException: i,
      ...n,
      event_id: r
    }, this);
    return r;
  }
  captureEvent(t, e) {
    const n = e?.event_id || $n();
    if (this._client) {
      this._client.captureEvent(t, {
        ...e,
        event_id: n
      }, this);
      return n;
    } else {
      if (Le) {
        He.warn("No client configured on scope - will not capture event!");
      }
      return n;
    }
  }
  _notifyScopeListeners() {
    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      this._scopeListeners.forEach(t => {
        t(this);
      });
      this._notifyingListeners = false;
    }
  }
}
class rr {
  constructor(t, e) {
    let n;
    let r;
    n = t || new nr();
    r = e || new nr();
    this._stack = [{
      scope: n
    }];
    this._isolationScope = r;
  }
  withScope(t) {
    const e = this._pushScope();
    let n;
    try {
      n = t(e);
    } catch (r) {
      this._popScope();
      throw r;
    }
    if (bn(n)) {
      return n.then(t => {
        this._popScope();
        return t;
      }, t => {
        this._popScope();
        throw t;
      });
    } else {
      this._popScope();
      return n;
    }
  }
  getClient() {
    return this.getStackTop().client;
  }
  getScope() {
    return this.getStackTop().scope;
  }
  getIsolationScope() {
    return this._isolationScope;
  }
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  _pushScope() {
    const t = this.getScope().clone();
    this._stack.push({
      client: this.getClient(),
      scope: t
    });
    return t;
  }
  _popScope() {
    return !(this._stack.length <= 1) && !!this._stack.pop();
  }
}
function ir() {
  const t = Ue(De());
  return t.stack = t.stack || new rr(Be("defaultCurrentScope", () => new nr()), Be("defaultIsolationScope", () => new nr()));
}
function sr(t) {
  return ir().withScope(t);
}
function or(t, e) {
  const n = ir();
  return n.withScope(() => {
    n.getStackTop().scope = t;
    return e(t);
  });
}
function ar(t) {
  return ir().withScope(() => t(ir().getIsolationScope()));
}
function cr(t) {
  const e = Ue(t);
  if (e.acs) {
    return e.acs;
  } else {
    return {
      withIsolationScope: ar,
      withScope: sr,
      withSetScope: or,
      withSetIsolationScope: (t, e) => ar(e),
      getCurrentScope: () => ir().getScope(),
      getIsolationScope: () => ir().getIsolationScope()
    };
  }
}
function ur() {
  return cr(De()).getCurrentScope();
}
function lr() {
  return cr(De()).getIsolationScope();
}
function hr() {
  return ur().getClient();
}
function dr(t) {
  const e = t.getPropagationContext();
  const {
    traceId: n,
    parentSpanId: r,
    propagationSpanId: i
  } = e;
  const s = {
    trace_id: n,
    span_id: i || Qn()
  };
  if (r) {
    s.parent_span_id = r;
  }
  return s;
}
const pr = "sentry.profile_id";
const fr = "sentry.exclusive_time";
function mr(t) {
  if (t) {
    if (typeof t == "object" && "deref" in t && typeof t.deref == "function") {
      try {
        return t.deref();
      } catch {
        return;
      }
    }
    return t;
  }
}
function gr(t) {
  const e = t;
  return {
    scope: e._sentryScope,
    isolationScope: mr(e._sentryIsolationScope)
  };
}
const _r = /^sentry-/;
function yr(t) {
  const e = function (t) {
    if (!t || !mn(t) && !Array.isArray(t)) {
      return;
    }
    if (Array.isArray(t)) {
      return t.reduce((t, e) => {
        const n = vr(e);
        Object.entries(n).forEach(([e, n]) => {
          t[e] = n;
        });
        return t;
      }, {});
    }
    return vr(t);
  }(t);
  if (!e) {
    return;
  }
  const n = Object.entries(e).reduce((t, [e, n]) => {
    if (e.match(_r)) {
      t[e.slice(7)] = n;
    }
    return t;
  }, {});
  if (Object.keys(n).length > 0) {
    return n;
  } else {
    return undefined;
  }
}
function vr(t) {
  return t.split(",").map(t => {
    const e = t.indexOf("=");
    if (e === -1) {
      return [];
    }
    return [t.slice(0, e), t.slice(e + 1)].map(t => {
      try {
        return decodeURIComponent(t.trim());
      } catch {
        return;
      }
    });
  }).reduce((t, [e, n]) => {
    if (e && n) {
      t[e] = n;
    }
    return t;
  }, {});
}
const br = /^o(\d+)\./;
const wr = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function Er(t, e = false) {
  const {
    host: n,
    path: r,
    pass: i,
    port: s,
    projectId: o,
    protocol: a,
    publicKey: c
  } = t;
  return `${a}://${c}${e && i ? `:${i}` : ""}@${n}${s ? `:${s}` : ""}/${r ? `${r}/` : r}${o}`;
}
function Sr(t) {
  return {
    protocol: t.protocol,
    publicKey: t.publicKey || "",
    pass: t.pass || "",
    host: t.host,
    port: t.port || "",
    path: t.path || "",
    projectId: t.projectId
  };
}
function Tr(t) {
  const e = t.getOptions();
  const {
    host: n
  } = t.getDsn() || {};
  let r;
  if (e.orgId) {
    r = String(e.orgId);
  } else if (n) {
    r = function (t) {
      const e = t.match(br);
      return e?.[1];
    }(n);
  }
  return r;
}
function xr(t) {
  const e = typeof t == "string" ? function (t) {
    const e = wr.exec(t);
    if (!e) {
      Fe(() => {});
      return;
    }
    const [n, r, i = "", s = "", o = "", a = ""] = e.slice(1);
    let c = "";
    let u = a;
    const l = u.split("/");
    if (l.length > 1) {
      c = l.slice(0, -1).join("/");
      u = l.pop();
    }
    if (u) {
      const t = u.match(/^\d+/);
      if (t) {
        u = t[0];
      }
    }
    return Sr({
      host: s,
      pass: i,
      path: c,
      projectId: u,
      port: o,
      protocol: n,
      publicKey: r
    });
  }(t) : Sr(t);
  if (e && function (t) {
    if (!Le) {
      return true;
    }
    const {
      port: e,
      projectId: n,
      protocol: r
    } = t;
    return !["protocol", "publicKey", "host", "projectId"].find(e => !t[e] && (He.error(`Invalid Sentry Dsn: ${e} missing`), true)) && !(n.match(/^\d+$/) ? function (t) {
      return t === "http" || t === "https";
    }(r) ? e && isNaN(parseInt(e, 10)) && (He.error(`Invalid Sentry Dsn: Invalid port ${e}`), 1) : (He.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), 1) : (He.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), 1));
  }(e)) {
    return e;
  }
}
let Ar = false;
function Or(t) {
  const {
    spanId: e,
    traceId: n,
    isRemote: r
  } = t.spanContext();
  const i = r ? e : Ir(t).parent_span_id;
  const s = gr(t).scope;
  return {
    parent_span_id: i,
    span_id: r ? s?.getPropagationContext().propagationSpanId || Qn() : e,
    trace_id: n
  };
}
function Cr(t) {
  if (t && t.length > 0) {
    return t.map(({
      context: {
        spanId: t,
        traceId: e,
        traceFlags: n,
        ...r
      },
      attributes: i
    }) => ({
      span_id: t,
      trace_id: e,
      sampled: n === 1,
      attributes: i,
      ...r
    }));
  } else {
    return undefined;
  }
}
function Pr(t) {
  if (typeof t == "number") {
    return kr(t);
  } else if (Array.isArray(t)) {
    return t[0] + t[1] / 1000000000;
  } else if (t instanceof Date) {
    return kr(t.getTime());
  } else {
    return Wn();
  }
}
function kr(t) {
  if (t > 9999999999) {
    return t / 1000;
  } else {
    return t;
  }
}
function Ir(t) {
  if (function (t) {
    return typeof t.getSpanJSON == "function";
  }(t)) {
    return t.getSpanJSON();
  }
  const {
    spanId: e,
    traceId: n
  } = t.spanContext();
  if (function (t) {
    const e = t;
    return !!e.attributes && !!e.startTime && !!e.name && !!e.endTime && !!e.status;
  }(t)) {
    const {
      attributes: r,
      startTime: i,
      name: s,
      endTime: o,
      status: a,
      links: c
    } = t;
    return {
      span_id: e,
      trace_id: n,
      data: r,
      description: s,
      parent_span_id: "parentSpanId" in t ? t.parentSpanId : "parentSpanContext" in t ? t.parentSpanContext?.spanId : undefined,
      start_timestamp: Pr(i),
      timestamp: Pr(o) || undefined,
      status: Rr(a),
      op: r["sentry.op"],
      origin: r["sentry.origin"],
      links: Cr(c)
    };
  }
  return {
    span_id: e,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Rr(t) {
  if (t && t.code !== 0) {
    if (t.code === 1) {
      return "ok";
    } else {
      return t.message || "unknown_error";
    }
  }
}
function Lr(t) {
  return t._sentryRootSpan || t;
}
function Mr() {
  if (!Ar) {
    Fe(() => {});
    Ar = true;
  }
}
function Nr(t) {
  He.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`);
}
function Dr(t, e) {
  if (!e?.length || !t.description) {
    return false;
  }
  for (const n of e) {
    if (Br(n)) {
      if (Pn(t.description, n)) {
        if (Le) {
          Nr(t);
        }
        return true;
      }
      continue;
    }
    if (!n.name && !n.op) {
      continue;
    }
    const e = !n.name || Pn(t.description, n.name);
    const r = !n.op || t.op && Pn(t.op, n.op);
    if (e && r) {
      if (Le) {
        Nr(t);
      }
      return true;
    }
  }
  return false;
}
function Ur(t, e) {
  const n = e.parent_span_id;
  const r = e.span_id;
  if (n) {
    for (const i of t) {
      if (i.parent_span_id === r) {
        i.parent_span_id = n;
      }
    }
  }
}
function Br(t) {
  return typeof t == "string" || t instanceof RegExp;
}
const $r = "production";
function jr(t, e) {
  const n = e.getOptions();
  const {
    publicKey: r
  } = e.getDsn() || {};
  const i = {
    environment: n.environment || $r,
    release: n.release,
    public_key: r,
    trace_id: t,
    org_id: Tr(e)
  };
  e.emit("createDsc", i);
  return i;
}
function Fr(t) {
  const e = hr();
  if (!e) {
    return {};
  }
  const n = Lr(t);
  const r = Ir(n);
  const i = r.data;
  const s = n.spanContext().traceState;
  const o = s?.get("sentry.sample_rate") ?? i["sentry.sample_rate"] ?? i["sentry.previous_trace_sample_rate"];
  function a(t) {
    if (typeof o == "number" || typeof o == "string") {
      t.sample_rate = `${o}`;
    }
    return t;
  }
  const c = n._frozenDsc;
  if (c) {
    return a(c);
  }
  const u = s?.get("sentry.dsc");
  const l = u && yr(u);
  if (l) {
    return a(l);
  }
  const h = jr(t.spanContext().traceId, e);
  const d = i["sentry.source"];
  const p = r.description;
  if (d !== "url" && p) {
    h.transaction = p;
  }
  if (function () {
    if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__) {
      return false;
    }
    const t = hr()?.getOptions();
    return !!t && (t.tracesSampleRate != null || !!t.tracesSampler);
  }()) {
    h.sampled = String(function (t) {
      const {
        traceFlags: e
      } = t.spanContext();
      return e === 1;
    }(n));
    h.sample_rand = s?.get("sentry.sample_rand") ?? gr(n).scope?.getPropagationContext().sampleRand.toString();
  }
  a(h);
  e.emit("createDsc", h, n);
  return h;
}
function zr(t, e = 100, n = Infinity) {
  try {
    return Vr("", t, e, n);
  } catch (r) {
    return {
      ERROR: `**non-serializable** (${r})`
    };
  }
}
function Gr(t, e = 3, n = 102400) {
  const r = zr(t, e);
  i = r;
  if (function (t) {
    return ~-encodeURI(t).split(/%..|./).length;
  }(JSON.stringify(i)) > n) {
    return Gr(t, e - 1, n);
  } else {
    return r;
  }
  var i;
}
function Vr(t, e, n = Infinity, r = Infinity, i = function () {
  const t = new WeakSet();
  function e(e) {
    return !!t.has(e) || (t.add(e), false);
  }
  function n(e) {
    t.delete(e);
  }
  return [e, n];
}()) {
  const [s, o] = i;
  if (e == null || ["boolean", "string"].includes(typeof e) || typeof e == "number" && Number.isFinite(e)) {
    return e;
  }
  const a = function (t, e) {
    try {
      if (t === "domain" && e && typeof e == "object" && e._events) {
        return "[Domain]";
      }
      if (t === "domainEmitter") {
        return "[DomainEmitter]";
      }
      if (typeof global != "undefined" && e === global) {
        return "[Global]";
      }
      if (typeof window != "undefined" && e === window) {
        return "[Window]";
      }
      if (typeof document != "undefined" && e === document) {
        return "[Document]";
      }
      if (En(e)) {
        return "[VueViewModel]";
      }
      if (yn(n = e) && "nativeEvent" in n && "preventDefault" in n && "stopPropagation" in n) {
        return "[SyntheticEvent]";
      }
      if (typeof e == "number" && !Number.isFinite(e)) {
        return `[${e}]`;
      }
      if (typeof e == "function") {
        return `[Function: ${Qe(e)}]`;
      }
      if (typeof e == "symbol") {
        return `[${String(e)}]`;
      }
      if (typeof e == "bigint") {
        return `[BigInt: ${String(e)}]`;
      }
      const r = function (t) {
        const e = Object.getPrototypeOf(t);
        if (e?.constructor) {
          return e.constructor.name;
        } else {
          return "null prototype";
        }
      }(e);
      if (/^HTML(\w*)Element$/.test(r)) {
        return `[HTMLElement: ${r}]`;
      } else {
        return `[object ${r}]`;
      }
    } catch (r) {
      return `**non-serializable** (${r})`;
    }
    var n;
  }(t, e);
  if (!a.startsWith("[object ")) {
    return a;
  }
  if (e.__sentry_skip_normalization__) {
    return e;
  }
  const c = typeof e.__sentry_override_normalization_depth__ == "number" ? e.__sentry_override_normalization_depth__ : n;
  if (c === 0) {
    return a.replace("object ", "");
  }
  if (s(e)) {
    return "[Circular ~]";
  }
  const u = e;
  if (u && typeof u.toJSON == "function") {
    try {
      return Vr("", u.toJSON(), c - 1, r, i);
    } catch {}
  }
  const l = Array.isArray(e) ? [] : {};
  let h = 0;
  const d = Nn(e);
  for (const p in d) {
    if (!Object.prototype.hasOwnProperty.call(d, p)) {
      continue;
    }
    if (h >= r) {
      l[p] = "[MaxProperties ~]";
      break;
    }
    const t = d[p];
    l[p] = Vr(p, t, c - 1, r, i);
    h++;
  }
  o(e);
  return l;
}
function Hr(t, e = []) {
  return [t, e];
}
function qr(t, e) {
  const [n, r] = t;
  return [n, [...r, e]];
}
function Wr(t, e) {
  const n = t[1];
  for (const r of n) {
    if (e(r, r[0].type)) {
      return true;
    }
  }
  return false;
}
function Kr(t) {
  const e = Ue(Me);
  if (e.encodePolyfill) {
    return e.encodePolyfill(t);
  } else {
    return new TextEncoder().encode(t);
  }
}
function Yr(t) {
  const [e, n] = t;
  let r = JSON.stringify(e);
  function i(t) {
    if (typeof r == "string") {
      r = typeof t == "string" ? r + t : [Kr(r), t];
    } else {
      r.push(typeof t == "string" ? Kr(t) : t);
    }
  }
  for (const s of n) {
    const [t, e] = s;
    i(`\n${JSON.stringify(t)}\n`);
    if (typeof e == "string" || e instanceof Uint8Array) {
      i(e);
    } else {
      let t;
      try {
        t = JSON.stringify(e);
      } catch {
        t = JSON.stringify(zr(e));
      }
      i(t);
    }
  }
  if (typeof r == "string") {
    return r;
  } else {
    return function (t) {
      const e = t.reduce((t, e) => t + e.length, 0);
      const n = new Uint8Array(e);
      let r = 0;
      for (const i of t) {
        n.set(i, r);
        r += i.length;
      }
      return n;
    }(r);
  }
}
function Xr(t) {
  const e = typeof t.data == "string" ? Kr(t.data) : t.data;
  return [{
    type: "attachment",
    length: e.length,
    filename: t.filename,
    content_type: t.contentType,
    attachment_type: t.attachmentType
  }, e];
}
const Jr = {
  session: "session",
  sessions: "session",
  attachment: "attachment",
  transaction: "transaction",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile: "profile",
  profile_chunk: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  feedback: "feedback",
  span: "span",
  raw_security: "security",
  log: "log_item",
  metric: "metric",
  trace_metric: "metric"
};
function Qr(t) {
  return Jr[t];
}
function Zr(t) {
  if (!t?.sdk) {
    return;
  }
  const {
    name: e,
    version: n
  } = t.sdk;
  return {
    name: e,
    version: n
  };
}
function ti(t, e, n, r) {
  const i = Zr(n);
  const s = t.type && t.type !== "replay_event" ? t.type : "event";
  (function (t, e) {
    if (!e) {
      return t;
    }
    const n = t.sdk || {};
    t.sdk = {
      ...n,
      name: n.name || e.name,
      version: n.version || e.version,
      integrations: [...(t.sdk?.integrations || []), ...(e.integrations || [])],
      packages: [...(t.sdk?.packages || []), ...(e.packages || [])],
      settings: t.sdk?.settings || e.settings ? {
        ...t.sdk?.settings,
        ...e.settings
      } : undefined
    };
  })(t, n?.sdk);
  const o = function (t, e, n, r) {
    const i = t.sdkProcessingMetadata?.dynamicSamplingContext;
    return {
      event_id: t.event_id,
      sent_at: new Date().toISOString(),
      ...(e && {
        sdk: e
      }),
      ...(!!n && r && {
        dsn: Er(r)
      }),
      ...(i && {
        trace: i
      })
    };
  }(t, i, r, e);
  delete t.sdkProcessingMetadata;
  return Hr(o, [[{
    type: s
  }, t]]);
}
function ei(t) {
  return new ri(e => {
    e(t);
  });
}
function ni(t) {
  return new ri((e, n) => {
    n(t);
  });
}
class ri {
  constructor(t) {
    this._state = 0;
    this._handlers = [];
    this._runExecutor(t);
  }
  then(t, e) {
    return new ri((n, r) => {
      this._handlers.push([false, e => {
        if (t) {
          try {
            n(t(e));
          } catch (i) {
            r(i);
          }
        } else {
          n(e);
        }
      }, t => {
        if (e) {
          try {
            n(e(t));
          } catch (i) {
            r(i);
          }
        } else {
          r(t);
        }
      }]);
      this._executeHandlers();
    });
  }
  catch(t) {
    return this.then(t => t, t);
  }
  finally(t) {
    return new ri((e, n) => {
      let r;
      let i;
      return this.then(e => {
        i = false;
        r = e;
        if (t) {
          t();
        }
      }, e => {
        i = true;
        r = e;
        if (t) {
          t();
        }
      }).then(() => {
        if (i) {
          n(r);
        } else {
          e(r);
        }
      });
    });
  }
  _executeHandlers() {
    if (this._state === 0) {
      return;
    }
    const t = this._handlers.slice();
    this._handlers = [];
    t.forEach(t => {
      if (!t[0]) {
        if (this._state === 1) {
          t[1](this._value);
        }
        if (this._state === 2) {
          t[2](this._value);
        }
        t[0] = true;
      }
    });
  }
  _runExecutor(t) {
    const e = (t, e) => {
      if (this._state === 0) {
        if (bn(e)) {
          e.then(n, r);
        } else {
          this._state = t;
          this._value = e;
          this._executeHandlers();
        }
      }
    };
    const n = t => {
      e(1, t);
    };
    const r = t => {
      e(2, t);
    };
    try {
      t(n, r);
    } catch (i) {
      r(i);
    }
  }
}
function ii(t, e, n, r = 0) {
  try {
    const i = si(e, n, t, r);
    if (bn(i)) {
      return i;
    } else {
      return ei(i);
    }
  } catch (i) {
    return ni(i);
  }
}
function si(t, e, n, r) {
  const i = n[r];
  if (!t || !i) {
    return t;
  }
  const s = i({
    ...t
  }, e);
  if (Le && s === null) {
    He.log(`Event processor "${i.id || "?"}" dropped event`);
  }
  if (bn(s)) {
    return s.then(t => si(t, e, n, r + 1));
  } else {
    return si(s, e, n, r + 1);
  }
}
function oi(t, e) {
  const {
    fingerprint: n,
    span: r,
    breadcrumbs: i,
    sdkProcessingMetadata: s
  } = e;
  (function (t, e) {
    const {
      extra: n,
      tags: r,
      user: i,
      contexts: s,
      level: o,
      transactionName: a
    } = e;
    if (Object.keys(n).length) {
      t.extra = {
        ...n,
        ...t.extra
      };
    }
    if (Object.keys(r).length) {
      t.tags = {
        ...r,
        ...t.tags
      };
    }
    if (Object.keys(i).length) {
      t.user = {
        ...i,
        ...t.user
      };
    }
    if (Object.keys(s).length) {
      t.contexts = {
        ...s,
        ...t.contexts
      };
    }
    if (o) {
      t.level = o;
    }
    if (a && t.type !== "transaction") {
      t.transaction = a;
    }
  })(t, e);
  if (r) {
    (function (t, e) {
      t.contexts = {
        trace: Or(e),
        ...t.contexts
      };
      t.sdkProcessingMetadata = {
        dynamicSamplingContext: Fr(e),
        ...t.sdkProcessingMetadata
      };
      const n = Lr(e);
      const r = Ir(n).description;
      if (r && !t.transaction && t.type === "transaction") {
        t.transaction = r;
      }
    })(t, r);
  }
  (function (t, e) {
    t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [];
    if (e) {
      t.fingerprint = t.fingerprint.concat(e);
    }
    if (!t.fingerprint.length) {
      delete t.fingerprint;
    }
  })(t, n);
  (function (t, e) {
    const n = [...(t.breadcrumbs || []), ...e];
    t.breadcrumbs = n.length ? n : undefined;
  })(t, i);
  (function (t, e) {
    t.sdkProcessingMetadata = {
      ...t.sdkProcessingMetadata,
      ...e
    };
  })(t, s);
}
function ai(t, e) {
  const {
    extra: n,
    tags: r,
    user: i,
    contexts: s,
    level: o,
    sdkProcessingMetadata: a,
    breadcrumbs: c,
    fingerprint: u,
    eventProcessors: l,
    attachments: h,
    propagationContext: d,
    transactionName: p,
    span: f
  } = e;
  ci(t, "extra", n);
  ci(t, "tags", r);
  ci(t, "user", i);
  ci(t, "contexts", s);
  t.sdkProcessingMetadata = Xn(t.sdkProcessingMetadata, a, 2);
  if (o) {
    t.level = o;
  }
  if (p) {
    t.transactionName = p;
  }
  if (f) {
    t.span = f;
  }
  if (c.length) {
    t.breadcrumbs = [...t.breadcrumbs, ...c];
  }
  if (u.length) {
    t.fingerprint = [...t.fingerprint, ...u];
  }
  if (l.length) {
    t.eventProcessors = [...t.eventProcessors, ...l];
  }
  if (h.length) {
    t.attachments = [...t.attachments, ...h];
  }
  t.propagationContext = {
    ...t.propagationContext,
    ...d
  };
}
function ci(t, e, n) {
  t[e] = Xn(t[e], n, 1);
}
let ui;
let li;
let hi;
let di;
function pi(t, e, n, r, i, s) {
  const {
    normalizeDepth: o = 3,
    normalizeMaxBreadth: a = 1000
  } = t;
  const c = {
    ...e,
    event_id: e.event_id || n.event_id || $n(),
    timestamp: e.timestamp || Hn()
  };
  const u = n.integrations || t.integrations.map(t => t.name);
  (function (t, e) {
    const {
      environment: n,
      release: r,
      dist: i,
      maxValueLength: s = 250
    } = e;
    t.environment = t.environment || n || $r;
    if (!t.release && r) {
      t.release = r;
    }
    if (!t.dist && i) {
      t.dist = i;
    }
    const o = t.request;
    if (o?.url) {
      o.url = On(o.url, s);
    }
  })(c, t);
  (function (t, e) {
    if (e.length > 0) {
      t.sdk = t.sdk || {};
      t.sdk.integrations = [...(t.sdk.integrations || []), ...e];
    }
  })(c, u);
  if (i) {
    i.emit("applyFrameMetadata", e);
  }
  if (e.type === undefined) {
    (function (t, e) {
      const n = function (t) {
        const e = Me._sentryDebugIds;
        const n = Me._debugIds;
        if (!e && !n) {
          return {};
        }
        const r = e ? Object.keys(e) : [];
        const i = n ? Object.keys(n) : [];
        if (di && r.length === li && i.length === hi) {
          return di;
        }
        li = r.length;
        hi = i.length;
        di = {};
        ui ||= {};
        const s = (e, n) => {
          for (const r of e) {
            const e = n[r];
            const i = ui?.[r];
            if (i && di && e) {
              di[i[0]] = e;
              if (ui) {
                ui[r] = [i[0], e];
              }
            } else if (e) {
              const n = t(r);
              for (let t = n.length - 1; t >= 0; t--) {
                const i = n[t];
                const s = i?.filename;
                if (s && di && ui) {
                  di[s] = e;
                  ui[r] = [s, e];
                  break;
                }
              }
            }
          }
        };
        if (e) {
          s(r, e);
        }
        if (n) {
          s(i, n);
        }
        return di;
      }(e);
      t.exception?.values?.forEach(t => {
        t.stacktrace?.frames?.forEach(t => {
          if (t.filename) {
            t.debug_id = n[t.filename];
          }
        });
      });
    })(c, t.stackParser);
  }
  const l = function (t, e) {
    if (!e) {
      return t;
    }
    const n = t ? t.clone() : new nr();
    n.update(e);
    return n;
  }(r, n.captureContext);
  if (n.mechanism) {
    Gn(c, n.mechanism);
  }
  const h = i ? i.getEventProcessors() : [];
  const d = Be("globalScope", () => new nr()).getScopeData();
  if (s) {
    ai(d, s.getScopeData());
  }
  if (l) {
    ai(d, l.getScopeData());
  }
  const p = [...(n.attachments || []), ...d.attachments];
  if (p.length) {
    n.attachments = p;
  }
  oi(c, d);
  return ii([...h, ...d.eventProcessors], c, n).then(t => {
    if (t) {
      (function (t) {
        const e = {};
        t.exception?.values?.forEach(t => {
          t.stacktrace?.frames?.forEach(t => {
            if (t.debug_id) {
              if (t.abs_path) {
                e[t.abs_path] = t.debug_id;
              } else if (t.filename) {
                e[t.filename] = t.debug_id;
              }
              delete t.debug_id;
            }
          });
        });
        if (Object.keys(e).length === 0) {
          return;
        }
        t.debug_meta = t.debug_meta || {};
        t.debug_meta.images = t.debug_meta.images || [];
        const n = t.debug_meta.images;
        Object.entries(e).forEach(([t, e]) => {
          n.push({
            type: "sourcemap",
            code_file: t,
            debug_id: e
          });
        });
      })(t);
    }
    if (typeof o == "number" && o > 0) {
      return function (t, e, n) {
        if (!t) {
          return null;
        }
        const r = {
          ...t,
          ...(t.breadcrumbs && {
            breadcrumbs: t.breadcrumbs.map(t => ({
              ...t,
              ...(t.data && {
                data: zr(t.data, e, n)
              })
            }))
          }),
          ...(t.user && {
            user: zr(t.user, e, n)
          }),
          ...(t.contexts && {
            contexts: zr(t.contexts, e, n)
          }),
          ...(t.extra && {
            extra: zr(t.extra, e, n)
          })
        };
        if (t.contexts?.trace && r.contexts) {
          r.contexts.trace = t.contexts.trace;
          if (t.contexts.trace.data) {
            r.contexts.trace.data = zr(t.contexts.trace.data, e, n);
          }
        }
        if (t.spans) {
          r.spans = t.spans.map(t => ({
            ...t,
            ...(t.data && {
              data: zr(t.data, e, n)
            })
          }));
        }
        if (t.contexts?.flags && r.contexts) {
          r.contexts.flags = zr(t.contexts.flags, 3, n);
        }
        return r;
      }(t, o, a);
    } else {
      return t;
    }
  });
}
function fi(t, e) {
  return ur().captureEvent(t, e);
}
function mi(t) {
  const e = lr();
  const n = ur();
  const {
    userAgent: r
  } = Me.navigator || {};
  const i = Kn({
    user: n.getUser() || e.getUser(),
    ...(r && {
      userAgent: r
    }),
    ...t
  });
  const s = e.getSession();
  if (s?.status === "ok") {
    Yn(s, {
      status: "exited"
    });
  }
  gi();
  e.setSession(i);
  return i;
}
function gi() {
  const t = lr();
  const e = ur().getSession() || t.getSession();
  if (e) {
    (function (t) {
      let e = {};
      if (t.status === "ok") {
        e = {
          status: "exited"
        };
      }
      Yn(t, e);
    })(e);
  }
  _i();
  t.setSession();
}
function _i() {
  const t = lr();
  const e = hr();
  const n = t.getSession();
  if (n && e) {
    e.captureSession(n);
  }
}
function yi(t = false) {
  if (t) {
    gi();
  } else {
    _i();
  }
}
function vi(t, e, n) {
  return e || `${function (t) {
    return `${function (t) {
      const e = t.protocol ? `${t.protocol}:` : "";
      const n = t.port ? `:${t.port}` : "";
      return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
    }(t)}${t.projectId}/envelope/`;
  }(t)}?${function (t, e) {
    const n = {
      sentry_version: "7"
    };
    if (t.publicKey) {
      n.sentry_key = t.publicKey;
    }
    if (e) {
      n.sentry_client = `${e.name}/${e.version}`;
    }
    return new URLSearchParams(n).toString();
  }(t, n)}`;
}
const bi = [];
function wi(t) {
  const e = t.defaultIntegrations || [];
  const n = t.integrations;
  let r;
  e.forEach(t => {
    t.isDefaultInstance = true;
  });
  if (Array.isArray(n)) {
    r = [...e, ...n];
  } else if (typeof n == "function") {
    const t = n(e);
    r = Array.isArray(t) ? t : [t];
  } else {
    r = e;
  }
  return function (t) {
    const e = {};
    t.forEach(t => {
      const {
        name: n
      } = t;
      const r = e[n];
      if (!r || !!r.isDefaultInstance || !t.isDefaultInstance) {
        e[n] = t;
      }
    });
    return Object.values(e);
  }(r);
}
function Ei(t, e) {
  for (const n of e) {
    if (n?.afterAllSetup) {
      n.afterAllSetup(t);
    }
  }
}
function Si(t, e, n) {
  if (n[e.name]) {
    if (Le) {
      He.log(`Integration skipped because it was already installed: ${e.name}`);
    }
  } else {
    n[e.name] = e;
    if (bi.indexOf(e.name) === -1 && typeof e.setupOnce == "function") {
      e.setupOnce();
      bi.push(e.name);
    }
    if (e.setup && typeof e.setup == "function") {
      e.setup(t);
    }
    if (typeof e.preprocessEvent == "function") {
      const n = e.preprocessEvent.bind(e);
      t.on("preprocessEvent", (e, r) => n(e, r, t));
    }
    if (typeof e.processEvent == "function") {
      const n = e.processEvent.bind(e);
      const r = Object.assign((e, r) => n(e, r, t), {
        id: e.name
      });
      t.addEventProcessor(r);
    }
    if (Le) {
      He.log(`Integration installed: ${e.name}`);
    }
  }
}
function Ti(t, e) {
  const n = e ?? function (t) {
    return xi().get(t);
  }(t) ?? [];
  if (n.length === 0) {
    return;
  }
  const r = t.getOptions();
  const i = function (t, e, n, r) {
    const i = {};
    if (e?.sdk) {
      i.sdk = {
        name: e.sdk.name,
        version: e.sdk.version
      };
    }
    if (n && r) {
      i.dsn = Er(r);
    }
    return Hr(i, [(s = t, [{
      type: "log",
      item_count: s.length,
      content_type: "application/vnd.sentry.items.log+json"
    }, {
      items: s
    }])]);
    var s;
  }(n, r._metadata, r.tunnel, t.getDsn());
  xi().set(t, []);
  t.emit("flushLogs");
  t.sendEnvelope(i);
}
function xi() {
  return Be("clientToLogBufferMap", () => new WeakMap());
}
function Ai(t, e) {
  const n = e ?? function (t) {
    return Oi().get(t);
  }(t) ?? [];
  if (n.length === 0) {
    return;
  }
  const r = t.getOptions();
  const i = function (t, e, n, r) {
    const i = {};
    if (e?.sdk) {
      i.sdk = {
        name: e.sdk.name,
        version: e.sdk.version
      };
    }
    if (n && r) {
      i.dsn = Er(r);
    }
    return Hr(i, [(s = t, [{
      type: "trace_metric",
      item_count: s.length,
      content_type: "application/vnd.sentry.items.trace-metric+json"
    }, {
      items: s
    }])]);
    var s;
  }(n, r._metadata, r.tunnel, t.getDsn());
  Oi().set(t, []);
  t.emit("flushMetrics");
  t.sendEnvelope(i);
}
function Oi() {
  return Be("clientToMetricBufferMap", () => new WeakMap());
}
function Ci(t) {
  const e = [];
  if (t.message) {
    e.push(t.message);
  }
  try {
    const n = t.exception.values[t.exception.values.length - 1];
    if (n?.value) {
      e.push(n.value);
      if (n.type) {
        e.push(`${n.type}: ${n.value}`);
      }
    }
  } catch {}
  return e;
}
const Pi = "Not capturing exception because it's already been captured.";
const ki = "Discarded session because of missing or non-string release";
const Ii = Symbol.for("SentryInternalError");
const Ri = Symbol.for("SentryDoNotSendEventError");
function Li(t) {
  return {
    message: t,
    [Ii]: true
  };
}
function Mi(t) {
  return {
    message: t,
    [Ri]: true
  };
}
function Ni(t) {
  return !!t && typeof t == "object" && Ii in t;
}
function Di(t) {
  return !!t && typeof t == "object" && Ri in t;
}
function Ui(t, e, n, r, i) {
  let s;
  let o = 0;
  t.on(n, () => {
    o = 0;
    clearTimeout(s);
  });
  t.on(e, e => {
    o += r(e);
    if (o >= 800000) {
      i(t);
    } else {
      clearTimeout(s);
      s = setTimeout(() => {
        i(t);
      }, 5000);
    }
  });
  t.on("flush", () => {
    i(t);
  });
}
class Bi {
  constructor(t) {
    this._options = t;
    this._integrations = {};
    this._numProcessing = 0;
    this._outcomes = {};
    this._hooks = {};
    this._eventProcessors = [];
    if (t.dsn) {
      this._dsn = xr(t.dsn);
    } else if (Le) {
      He.warn("No DSN provided, client will not send events.");
    }
    if (this._dsn) {
      const e = vi(this._dsn, t.tunnel, t._metadata ? t._metadata.sdk : undefined);
      this._transport = t.transport({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...t.transportOptions,
        url: e
      });
    }
    if (this._options.enableLogs) {
      Ui(this, "afterCaptureLog", "flushLogs", zi, Ti);
    }
    if (this._options._experiments?.enableMetrics) {
      Ui(this, "afterCaptureMetric", "flushMetrics", Fi, Ai);
    }
  }
  captureException(t, e, n) {
    const r = $n();
    if (Vn(t)) {
      if (Le) {
        He.log(Pi);
      }
      return r;
    }
    const i = {
      event_id: r,
      ...e
    };
    this._process(this.eventFromException(t, i).then(t => this._captureEvent(t, i, n)));
    return i.event_id;
  }
  captureMessage(t, e, n, r) {
    const i = {
      event_id: $n(),
      ...n
    };
    const s = gn(t) ? t : String(t);
    const o = _n(t) ? this.eventFromMessage(s, e, i) : this.eventFromException(t, i);
    this._process(o.then(t => this._captureEvent(t, i, r)));
    return i.event_id;
  }
  captureEvent(t, e, n) {
    const r = $n();
    if (e?.originalException && Vn(e.originalException)) {
      if (Le) {
        He.log(Pi);
      }
      return r;
    }
    const i = {
      event_id: r,
      ...e
    };
    const s = t.sdkProcessingMetadata || {};
    const o = s.capturedSpanScope;
    const a = s.capturedSpanIsolationScope;
    this._process(this._captureEvent(t, i, o || n, a));
    return i.event_id;
  }
  captureSession(t) {
    this.sendSession(t);
    Yn(t, {
      init: false
    });
  }
  getDsn() {
    return this._dsn;
  }
  getOptions() {
    return this._options;
  }
  getSdkMetadata() {
    return this._options._metadata;
  }
  getTransport() {
    return this._transport;
  }
  async flush(t) {
    const e = this._transport;
    if (!e) {
      return true;
    }
    this.emit("flush");
    const n = await this._isClientDoneProcessing(t);
    const r = await e.flush(t);
    return n && r;
  }
  async close(t) {
    const e = await this.flush(t);
    this.getOptions().enabled = false;
    this.emit("close");
    return e;
  }
  getEventProcessors() {
    return this._eventProcessors;
  }
  addEventProcessor(t) {
    this._eventProcessors.push(t);
  }
  init() {
    if (this._isEnabled() || this._options.integrations.some(({
      name: t
    }) => t.startsWith("Spotlight"))) {
      this._setupIntegrations();
    }
  }
  getIntegrationByName(t) {
    return this._integrations[t];
  }
  addIntegration(t) {
    const e = this._integrations[t.name];
    Si(this, t, this._integrations);
    if (!e) {
      Ei(this, [t]);
    }
  }
  sendEvent(t, e = {}) {
    this.emit("beforeSendEvent", t, e);
    let n = ti(t, this._dsn, this._options._metadata, this._options.tunnel);
    for (const r of e.attachments || []) {
      n = qr(n, Xr(r));
    }
    this.sendEnvelope(n).then(e => this.emit("afterSendEvent", t, e));
  }
  sendSession(t) {
    const {
      release: e,
      environment: n = $r
    } = this._options;
    if ("aggregates" in t) {
      const r = t.attrs || {};
      if (!r.release && !e) {
        if (Le) {
          He.warn(ki);
        }
        return;
      }
      r.release = r.release || e;
      r.environment = r.environment || n;
      t.attrs = r;
    } else {
      if (!t.release && !e) {
        if (Le) {
          He.warn(ki);
        }
        return;
      }
      t.release = t.release || e;
      t.environment = t.environment || n;
    }
    this.emit("beforeSendSession", t);
    const r = function (t, e, n, r) {
      const i = Zr(n);
      return Hr({
        sent_at: new Date().toISOString(),
        ...(i && {
          sdk: i
        }),
        ...(!!r && e && {
          dsn: Er(e)
        })
      }, ["aggregates" in t ? [{
        type: "sessions"
      }, t] : [{
        type: "session"
      }, t.toJSON()]]);
    }(t, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(r);
  }
  recordDroppedEvent(t, e, n = 1) {
    if (this._options.sendClientReports) {
      const r = `${t}:${e}`;
      if (Le) {
        He.log(`Recording outcome: "${r}"${n > 1 ? ` (${n} times)` : ""}`);
      }
      this._outcomes[r] = (this._outcomes[r] || 0) + n;
    }
  }
  on(t, e) {
    const n = this._hooks[t] = this._hooks[t] || new Set();
    const r = (...t) => e(...t);
    n.add(r);
    return () => {
      n.delete(r);
    };
  }
  emit(t, ...e) {
    const n = this._hooks[t];
    if (n) {
      n.forEach(t => t(...e));
    }
  }
  async sendEnvelope(t) {
    this.emit("beforeEnvelope", t);
    if (this._isEnabled() && this._transport) {
      try {
        return await this._transport.send(t);
      } catch (e) {
        if (Le) {
          He.error("Error while sending envelope:", e);
        }
        return {};
      }
    }
    if (Le) {
      He.error("Transport disabled");
    }
    return {};
  }
  _setupIntegrations() {
    const {
      integrations: t
    } = this._options;
    this._integrations = function (t, e) {
      const n = {};
      e.forEach(e => {
        if (e) {
          Si(t, e, n);
        }
      });
      return n;
    }(this, t);
    Ei(this, t);
  }
  _updateSessionFromEvent(t, e) {
    let n = e.level === "fatal";
    let r = false;
    const i = e.exception?.values;
    if (i) {
      r = true;
      for (const t of i) {
        const e = t.mechanism;
        if (e?.handled === false) {
          n = true;
          break;
        }
      }
    }
    const s = t.status === "ok";
    if (s && t.errors === 0 || s && n) {
      Yn(t, {
        ...(n && {
          status: "crashed"
        }),
        errors: t.errors || Number(r || n)
      });
      this.captureSession(t);
    }
  }
  async _isClientDoneProcessing(t) {
    let e = 0;
    while (!t || e < t) {
      await new Promise(t => setTimeout(t, 1));
      if (!this._numProcessing) {
        return true;
      }
      e++;
    }
    return false;
  }
  _isEnabled() {
    return this.getOptions().enabled !== false && this._transport !== undefined;
  }
  _prepareEvent(t, e, n, r) {
    const i = this.getOptions();
    const s = Object.keys(this._integrations);
    if (!e.integrations && s?.length) {
      e.integrations = s;
    }
    this.emit("preprocessEvent", t, e);
    if (!t.type) {
      r.setLastEventId(t.event_id || e.event_id);
    }
    return pi(i, t, e, n, this, r).then(t => {
      if (t === null) {
        return t;
      }
      this.emit("postprocessEvent", t, e);
      t.contexts = {
        trace: dr(n),
        ...t.contexts
      };
      const r = function (t, e) {
        const n = e.getPropagationContext();
        return n.dsc || jr(n.traceId, t);
      }(this, n);
      t.sdkProcessingMetadata = {
        dynamicSamplingContext: r,
        ...t.sdkProcessingMetadata
      };
      return t;
    });
  }
  _captureEvent(t, e = {}, n = ur(), r = lr()) {
    if (Le && $i(t)) {
      He.log(`Captured error event \`${Ci(t)[0] || "<unknown>"}\``);
    }
    return this._processEvent(t, e, n, r).then(t => t.event_id, t => {
      if (Le) {
        if (Di(t)) {
          He.log(t.message);
        } else if (Ni(t)) {
          He.warn(t.message);
        } else {
          He.warn(t);
        }
      }
    });
  }
  _processEvent(t, e, n, r) {
    const i = this.getOptions();
    const {
      sampleRate: s
    } = i;
    const o = ji(t);
    const a = $i(t);
    const c = t.type || "error";
    const u = `before send for type \`${c}\``;
    const l = s === undefined ? undefined : function (t) {
      if (typeof t == "boolean") {
        return Number(t);
      }
      const e = typeof t == "string" ? parseFloat(t) : t;
      if (typeof e != "number" || isNaN(e) || e < 0 || e > 1) {
        return undefined;
      } else {
        return e;
      }
    }(s);
    if (a && typeof l == "number" && Math.random() > l) {
      this.recordDroppedEvent("sample_rate", "error");
      return ni(Mi(`Discarding event because it's not included in the random sample (sampling rate = ${s})`));
    }
    const h = c === "replay_event" ? "replay" : c;
    return this._prepareEvent(t, e, n, r).then(t => {
      if (t === null) {
        this.recordDroppedEvent("event_processor", h);
        throw Mi("An event processor returned `null`, will not send event.");
      }
      if (e.data && e.data.__sentry__ === true) {
        return t;
      }
      const n = function (t, e, n, r) {
        const {
          beforeSend: i,
          beforeSendTransaction: s,
          beforeSendSpan: o,
          ignoreSpans: a
        } = e;
        let c = n;
        if ($i(c) && i) {
          return i(c, r);
        }
        if (ji(c)) {
          if (o || a) {
            const e = function (t) {
              const {
                trace_id: e,
                parent_span_id: n,
                span_id: r,
                status: i,
                origin: s,
                data: o,
                op: a
              } = t.contexts?.trace ?? {};
              return {
                data: o ?? {},
                description: t.transaction,
                op: a,
                parent_span_id: n,
                span_id: r ?? "",
                start_timestamp: t.start_timestamp ?? 0,
                status: i,
                timestamp: t.timestamp,
                trace_id: e ?? "",
                origin: s,
                profile_id: o?.[pr],
                exclusive_time: o?.[fr],
                measurements: t.measurements,
                is_segment: true
              };
            }(c);
            if (a?.length && Dr(e, a)) {
              return null;
            }
            if (o) {
              const t = o(e);
              if (t) {
                c = Xn(n, {
                  type: "transaction",
                  timestamp: (u = t).timestamp,
                  start_timestamp: u.start_timestamp,
                  transaction: u.description,
                  contexts: {
                    trace: {
                      trace_id: u.trace_id,
                      span_id: u.span_id,
                      parent_span_id: u.parent_span_id,
                      op: u.op,
                      status: u.status,
                      origin: u.origin,
                      data: {
                        ...u.data,
                        ...(u.profile_id && {
                          [pr]: u.profile_id
                        }),
                        ...(u.exclusive_time && {
                          [fr]: u.exclusive_time
                        })
                      }
                    }
                  },
                  measurements: u.measurements
                });
              } else {
                Mr();
              }
            }
            if (c.spans) {
              const e = [];
              const n = c.spans;
              for (const t of n) {
                if (a?.length && Dr(t, a)) {
                  Ur(n, t);
                } else if (o) {
                  const n = o(t);
                  if (n) {
                    e.push(n);
                  } else {
                    Mr();
                    e.push(t);
                  }
                } else {
                  e.push(t);
                }
              }
              const r = c.spans.length - e.length;
              if (r) {
                t.recordDroppedEvent("before_send", "span", r);
              }
              c.spans = e;
            }
          }
          if (s) {
            if (c.spans) {
              const t = c.spans.length;
              c.sdkProcessingMetadata = {
                ...n.sdkProcessingMetadata,
                spanCountBeforeProcessing: t
              };
            }
            return s(c, r);
          }
        }
        var u;
        return c;
      }(this, i, t, e);
      return function (t, e) {
        const n = `${e} must return \`null\` or a valid event.`;
        if (bn(t)) {
          return t.then(t => {
            if (!yn(t) && t !== null) {
              throw Li(n);
            }
            return t;
          }, t => {
            throw Li(`${e} rejected with ${t}`);
          });
        }
        if (!yn(t) && t !== null) {
          throw Li(n);
        }
        return t;
      }(n, u);
    }).then(i => {
      if (i === null) {
        this.recordDroppedEvent("before_send", h);
        if (o) {
          const e = 1 + (t.spans || []).length;
          this.recordDroppedEvent("before_send", "span", e);
        }
        throw Mi(`${u} returned \`null\`, will not send event.`);
      }
      const s = n.getSession() || r.getSession();
      if (a && s) {
        this._updateSessionFromEvent(s, i);
      }
      if (o) {
        const t = (i.sdkProcessingMetadata?.spanCountBeforeProcessing || 0) - (i.spans ? i.spans.length : 0);
        if (t > 0) {
          this.recordDroppedEvent("before_send", "span", t);
        }
      }
      const c = i.transaction_info;
      if (o && c && i.transaction !== t.transaction) {
        const t = "custom";
        i.transaction_info = {
          ...c,
          source: t
        };
      }
      this.sendEvent(i, e);
      return i;
    }).then(null, t => {
      if (Di(t) || Ni(t)) {
        throw t;
      }
      this.captureException(t, {
        mechanism: {
          handled: false,
          type: "internal"
        },
        data: {
          __sentry__: true
        },
        originalException: t
      });
      throw Li(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${t}`);
    });
  }
  _process(t) {
    this._numProcessing++;
    t.then(t => {
      this._numProcessing--;
      return t;
    }, t => {
      this._numProcessing--;
      return t;
    });
  }
  _clearOutcomes() {
    const t = this._outcomes;
    this._outcomes = {};
    return Object.entries(t).map(([t, e]) => {
      const [n, r] = t.split(":");
      return {
        reason: n,
        category: r,
        quantity: e
      };
    });
  }
  _flushOutcomes() {
    if (Le) {
      He.log("Flushing outcomes...");
    }
    const t = this._clearOutcomes();
    if (t.length === 0) {
      if (Le) {
        He.log("No outcomes to send");
      }
      return;
    }
    if (!this._dsn) {
      if (Le) {
        He.log("No dsn provided, will not send outcomes");
      }
      return;
    }
    if (Le) {
      He.log("Sending outcomes:", t);
    }
    n = t;
    const e = Hr((r = this._options.tunnel && Er(this._dsn)) ? {
      dsn: r
    } : {}, [[{
      type: "client_report"
    }, {
      timestamp: Hn(),
      discarded_events: n
    }]]);
    var n;
    var r;
    this.sendEnvelope(e);
  }
}
function $i(t) {
  return t.type === undefined;
}
function ji(t) {
  return t.type === "transaction";
}
function Fi(t) {
  let e = 0;
  if (t.name) {
    e += t.name.length * 2;
  }
  if (typeof t.value == "string") {
    e += t.value.length * 2;
  } else {
    e += 8;
  }
  return e + Gi(t.attributes);
}
function zi(t) {
  let e = 0;
  if (t.message) {
    e += t.message.length * 2;
  }
  return e + Gi(t.attributes);
}
function Gi(t) {
  if (!t) {
    return 0;
  }
  let e = 0;
  Object.values(t).forEach(t => {
    if (Array.isArray(t)) {
      e += t.length * Vi(t[0]);
    } else if (_n(t)) {
      e += Vi(t);
    } else {
      e += 100;
    }
  });
  return e;
}
function Vi(t) {
  if (typeof t == "string") {
    return t.length * 2;
  } else if (typeof t == "number") {
    return 8;
  } else if (typeof t == "boolean") {
    return 4;
  } else {
    return 0;
  }
}
function Hi(t, e) {
  if (e.debug === true) {
    if (Le) {
      He.enable();
    } else {
      Fe(() => {});
    }
  }
  ur().update(e.initialScope);
  const n = new t(e);
  (function (t) {
    ur().setClient(t);
  })(n);
  n.init();
  return n;
}
const qi = Symbol.for("SentryBufferFullError");
function Wi(t = 100) {
  const e = new Set();
  function n(t) {
    e.delete(t);
  }
  return {
    get $() {
      return Array.from(e);
    },
    add: function (r) {
      if (!(e.size < t)) {
        return ni(qi);
      }
      const i = r();
      e.add(i);
      i.then(() => n(i), () => n(i));
      return i;
    },
    drain: function (t) {
      if (!e.size) {
        return ei(true);
      }
      const n = Promise.allSettled(Array.from(e)).then(() => true);
      if (!t) {
        return n;
      }
      const r = [n, new Promise(e => setTimeout(() => e(false), t))];
      return Promise.race(r);
    }
  };
}
function Ki(t, {
  statusCode: e,
  headers: n
}, r = Date.now()) {
  const i = {
    ...t
  };
  const s = n?.["x-sentry-rate-limits"];
  const o = n?.["retry-after"];
  if (s) {
    for (const a of s.trim().split(",")) {
      const [t, e,,, n] = a.split(":", 5);
      const s = parseInt(t, 10);
      const o = (isNaN(s) ? 60 : s) * 1000;
      if (e) {
        for (const a of e.split(";")) {
          if (a !== "metric_bucket" || !n || !!n.split(";").includes("custom")) {
            i[a] = r + o;
          }
        }
      } else {
        i.all = r + o;
      }
    }
  } else if (o) {
    i.all = r + function (t, e = Date.now()) {
      const n = parseInt(`${t}`, 10);
      if (!isNaN(n)) {
        return n * 1000;
      }
      const r = Date.parse(`${t}`);
      if (isNaN(r)) {
        return 60000;
      } else {
        return r - e;
      }
    }(o, r);
  } else if (e === 429) {
    i.all = r + 60000;
  }
  return i;
}
function Yi(t, e, n = Wi(t.bufferSize || 64)) {
  let r = {};
  return {
    send: function (i) {
      const s = [];
      Wr(i, (e, n) => {
        const i = Qr(n);
        if (!function (t, e, n = Date.now()) {
          return function (t, e) {
            return t[e] || t.all || 0;
          }(t, e) > n;
        }(r, i)) {
          s.push(e);
        } else {
          t.recordDroppedEvent("ratelimit_backoff", i);
        }
      });
      if (s.length === 0) {
        return Promise.resolve({});
      }
      const o = Hr(i[0], s);
      const a = e => {
        Wr(o, (n, r) => {
          t.recordDroppedEvent(e, Qr(r));
        });
      };
      return n.add(() => e({
        body: Yr(o)
      }).then(t => {
        if (t.statusCode !== undefined && (t.statusCode < 200 || t.statusCode >= 300) && Le) {
          He.warn(`Sentry responded with status code ${t.statusCode} to sent event.`);
        }
        r = Ki(r, t);
        return t;
      }, t => {
        a("network_error");
        if (Le) {
          He.error("Encountered error running transport request:", t);
        }
        throw t;
      })).then(t => t, t => {
        if (t === qi) {
          if (Le) {
            He.error("Skipped sending event because buffer is full.");
          }
          a("queue_overflow");
          return Promise.resolve({});
        }
        throw t;
      });
    },
    flush: t => n.drain(t)
  };
}
function Xi(t) {
  if (!t) {
    return {};
  }
  const e = t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!e) {
    return {};
  }
  const n = e[6] || "";
  const r = e[8] || "";
  return {
    host: e[4],
    path: e[5],
    protocol: e[2],
    search: n,
    hash: r,
    relative: e[5] + n + r
  };
}
function Ji(t) {
  if ("aggregates" in t) {
    if (t.attrs?.ip_address === undefined) {
      t.attrs = {
        ...t.attrs,
        ip_address: "{{auto}}"
      };
    }
  } else if (t.ipAddress === undefined) {
    t.ipAddress = "{{auto}}";
  }
}
const Qi = 100;
function Zi(t, e) {
  const n = hr();
  const r = lr();
  if (!n) {
    return;
  }
  const {
    beforeBreadcrumb: i = null,
    maxBreadcrumbs: s = Qi
  } = n.getOptions();
  if (s <= 0) {
    return;
  }
  const o = {
    timestamp: Hn(),
    ...t
  };
  const a = i ? Fe(() => i(o, e)) : o;
  if (a !== null) {
    if (n.emit) {
      n.emit("beforeAddBreadcrumb", a, e);
    }
    r.addBreadcrumb(a, s);
  }
}
let ts;
const es = new WeakMap();
const ns = () => ({
  name: "FunctionToString",
  setupOnce() {
    ts = Function.prototype.toString;
    try {
      Function.prototype.toString = function (...t) {
        const e = Mn(this);
        const n = es.has(hr()) && e !== undefined ? e : this;
        return ts.apply(n, t);
      };
    } catch {}
  },
  setup(t) {
    es.set(t, true);
  }
});
const rs = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/, /^ResizeObserver loop completed with undelivered notifications.$/, /^Cannot redefine property: googletag$/, /^Can't find variable: gmo$/, /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/, "can't redefine non-configurable property \"solana\"", "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)", "Can't find variable: _AutofillCallbackHandler", /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/, /^Java exception was raised during method invocation$/];
const is = (t = {}) => {
  let e;
  return {
    name: "EventFilters",
    setup(n) {
      const r = n.getOptions();
      e = os(t, r);
    },
    processEvent(n, r, i) {
      if (!e) {
        const n = i.getOptions();
        e = os(t, n);
      }
      if (function (t, e) {
        if (t.type) {
          if (t.type === "transaction" && function (t, e) {
            if (!e?.length) {
              return false;
            }
            const n = t.transaction;
            return !!n && kn(n, e);
          }(t, e.ignoreTransactions)) {
            if (Le) {
              He.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${Fn(t)}`);
            }
            return true;
          }
        } else {
          if (function (t, e) {
            if (!e?.length) {
              return false;
            }
            return Ci(t).some(t => kn(t, e));
          }(t, e.ignoreErrors)) {
            if (Le) {
              He.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${Fn(t)}`);
            }
            return true;
          }
          if (function (t) {
            if (!t.exception?.values?.length) {
              return false;
            }
            return !t.message && !t.exception.values.some(t => t.stacktrace || t.type && t.type !== "Error" || t.value);
          }(t)) {
            if (Le) {
              He.warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${Fn(t)}`);
            }
            return true;
          }
          if (function (t, e) {
            if (!e?.length) {
              return false;
            }
            const n = as(t);
            return !!n && kn(n, e);
          }(t, e.denyUrls)) {
            if (Le) {
              He.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${Fn(t)}.\nUrl: ${as(t)}`);
            }
            return true;
          }
          if (!function (t, e) {
            if (!e?.length) {
              return true;
            }
            const n = as(t);
            return !n || kn(n, e);
          }(t, e.allowUrls)) {
            if (Le) {
              He.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${Fn(t)}.\nUrl: ${as(t)}`);
            }
            return true;
          }
        }
        return false;
      }(n, e)) {
        return null;
      } else {
        return n;
      }
    }
  };
};
const ss = (t = {}) => ({
  ...is(t),
  name: "InboundFilters"
});
function os(t = {}, e = {}) {
  return {
    allowUrls: [...(t.allowUrls || []), ...(e.allowUrls || [])],
    denyUrls: [...(t.denyUrls || []), ...(e.denyUrls || [])],
    ignoreErrors: [...(t.ignoreErrors || []), ...(e.ignoreErrors || []), ...(t.disableErrorDefaults ? [] : rs)],
    ignoreTransactions: [...(t.ignoreTransactions || []), ...(e.ignoreTransactions || [])]
  };
}
function as(t) {
  try {
    const e = [...(t.exception?.values ?? [])].reverse().find(t => t.mechanism?.parent_id === undefined && t.stacktrace?.frames?.length);
    const n = e?.stacktrace?.frames;
    if (n) {
      return function (t = []) {
        for (let e = t.length - 1; e >= 0; e--) {
          const n = t[e];
          if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]") {
            return n.filename || null;
          }
        }
        return null;
      }(n);
    } else {
      return null;
    }
  } catch {
    if (Le) {
      He.error(`Cannot extract url for event ${Fn(t)}`);
    }
    return null;
  }
}
function cs(t, e, n, r, i, s) {
  if (!i.exception?.values || !s || !wn(s.originalException, Error)) {
    return;
  }
  const o = i.exception.values.length > 0 ? i.exception.values[i.exception.values.length - 1] : undefined;
  if (o) {
    i.exception.values = us(t, e, r, s.originalException, n, i.exception.values, o, 0);
  }
}
function us(t, e, n, r, i, s, o, a) {
  if (s.length >= n + 1) {
    return s;
  }
  let c = [...s];
  if (wn(r[i], Error)) {
    ls(o, a);
    const s = t(e, r[i]);
    const u = c.length;
    hs(s, i, u, a);
    c = us(t, e, n, r[i], i, [s, ...c], s, u);
  }
  if (Array.isArray(r.errors)) {
    r.errors.forEach((r, s) => {
      if (wn(r, Error)) {
        ls(o, a);
        const u = t(e, r);
        const l = c.length;
        hs(u, `errors[${s}]`, l, a);
        c = us(t, e, n, r, i, [u, ...c], u, l);
      }
    });
  }
  return c;
}
function ls(t, e) {
  t.mechanism = {
    handled: true,
    type: "auto.core.linked_errors",
    ...t.mechanism,
    ...(t.type === "AggregateError" && {
      is_exception_group: true
    }),
    exception_id: e
  };
}
function hs(t, e, n, r) {
  t.mechanism = {
    handled: true,
    ...t.mechanism,
    type: "chained",
    source: e,
    exception_id: n,
    parent_id: r
  };
}
function ds() {
  if ("console" in Me) {
    $e.forEach(function (t) {
      if (t in Me.console) {
        In(Me.console, t, function (e) {
          je[t] = e;
          return function (...e) {
            sn("console", {
              args: e,
              level: t
            });
            const n = je[t];
            n?.apply(Me.console, e);
          };
        });
      }
    });
  }
}
function ps(t) {
  if (t === "warn") {
    return "warning";
  } else if (["fatal", "error", "warning", "log", "info", "debug"].includes(t)) {
    return t;
  } else {
    return "log";
  }
}
const fs = () => {
  let t;
  return {
    name: "Dedupe",
    processEvent(e) {
      if (e.type) {
        return e;
      }
      try {
        if (function (t, e) {
          if (!e) {
            return false;
          }
          if (function (t, e) {
            const n = t.message;
            const r = e.message;
            if (!n && !r) {
              return false;
            }
            if (n && !r || !n && r) {
              return false;
            }
            if (n !== r) {
              return false;
            }
            if (!gs(t, e)) {
              return false;
            }
            if (!ms(t, e)) {
              return false;
            }
            return true;
          }(t, e)) {
            return true;
          }
          if (function (t, e) {
            const n = _s(e);
            const r = _s(t);
            if (!n || !r) {
              return false;
            }
            if (n.type !== r.type || n.value !== r.value) {
              return false;
            }
            if (!gs(t, e)) {
              return false;
            }
            if (!ms(t, e)) {
              return false;
            }
            return true;
          }(t, e)) {
            return true;
          }
          return false;
        }(e, t)) {
          if (Le) {
            He.warn("Event dropped due to being a duplicate of previously captured event.");
          }
          return null;
        }
      } catch {}
      return t = e;
    }
  };
};
function ms(t, e) {
  let n = Ze(t);
  let r = Ze(e);
  if (!n && !r) {
    return true;
  }
  if (n && !r || !n && r) {
    return false;
  }
  if (r.length !== n.length) {
    return false;
  }
  for (let i = 0; i < r.length; i++) {
    const t = r[i];
    const e = n[i];
    if (t.filename !== e.filename || t.lineno !== e.lineno || t.colno !== e.colno || t.function !== e.function) {
      return false;
    }
  }
  return true;
}
function gs(t, e) {
  let n = t.fingerprint;
  let r = e.fingerprint;
  if (!n && !r) {
    return true;
  }
  if (n && !r || !n && r) {
    return false;
  }
  try {
    return n.join("") === r.join("");
  } catch {
    return false;
  }
}
function _s(t) {
  return t.exception?.values?.[0];
}
function ys(t) {
  if (t === undefined) {
    return undefined;
  } else if (t >= 400 && t < 500) {
    return "warning";
  } else if (t >= 500) {
    return "error";
  } else {
    return undefined;
  }
}
const vs = Me;
function bs(t) {
  return t && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString());
}
function ws() {
  if (typeof EdgeRuntime == "string") {
    return true;
  }
  if (!function () {
    if (!("fetch" in vs)) {
      return false;
    }
    try {
      new Headers();
      new Request("http://www.example.com");
      new Response();
      return true;
    } catch {
      return false;
    }
  }()) {
    return false;
  }
  if (bs(vs.fetch)) {
    return true;
  }
  let t = false;
  const e = vs.document;
  if (e && typeof e.createElement == "function") {
    try {
      const n = e.createElement("iframe");
      n.hidden = true;
      e.head.appendChild(n);
      if (n.contentWindow?.fetch) {
        t = bs(n.contentWindow.fetch);
      }
      e.head.removeChild(n);
    } catch (n) {
      if (Le) {
        He.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", n);
      }
    }
  }
  return t;
}
function Es(t, e) {
  const n = "fetch";
  nn(n, t);
  rn(n, () => function (t, e = false) {
    if (e && !ws()) {
      return;
    }
    In(Me, "fetch", function (t) {
      return function (...e) {
        const n = new Error();
        const {
          method: r,
          url: i
        } = function (t) {
          if (t.length === 0) {
            return {
              method: "GET",
              url: ""
            };
          }
          if (t.length === 2) {
            const [e, n] = t;
            return {
              url: Ts(e),
              method: Ss(n, "method") ? String(n.method).toUpperCase() : "GET"
            };
          }
          const e = t[0];
          return {
            url: Ts(e),
            method: Ss(e, "method") ? String(e.method).toUpperCase() : "GET"
          };
        }(e);
        const s = {
          args: e,
          fetchData: {
            method: r,
            url: i
          },
          startTimestamp: Wn() * 1000,
          virtualError: n,
          headers: xs(e)
        };
        sn("fetch", {
          ...s
        });
        return t.apply(Me, e).then(async t => {
          sn("fetch", {
            ...s,
            endTimestamp: Wn() * 1000,
            response: t
          });
          return t;
        }, t => {
          sn("fetch", {
            ...s,
            endTimestamp: Wn() * 1000,
            error: t
          });
          if (hn(t) && t.stack === undefined) {
            t.stack = n.stack;
            Rn(t, "framesToPop", 1);
          }
          if (t instanceof TypeError && (t.message === "Failed to fetch" || t.message === "Load failed" || t.message === "NetworkError when attempting to fetch resource.")) {
            try {
              const e = new URL(s.fetchData.url);
              t.message = `${t.message} (${e.host})`;
            } catch {}
          }
          throw t;
        });
      };
    });
  }(0, e));
}
function Ss(t, e) {
  return !!t && typeof t == "object" && !!t[e];
}
function Ts(t) {
  if (typeof t == "string") {
    return t;
  } else if (t) {
    if (Ss(t, "url")) {
      return t.url;
    } else if (t.toString) {
      return t.toString();
    } else {
      return "";
    }
  } else {
    return "";
  }
}
function xs(t) {
  const [e, n] = t;
  try {
    if (typeof n == "object" && n !== null && "headers" in n && n.headers) {
      return new Headers(n.headers);
    }
    r = e;
    if (typeof Request != "undefined" && wn(r, Request)) {
      return new Headers(e.headers);
    }
  } catch {}
  var r;
}
const As = Me;
let Os = 0;
function Cs() {
  return Os > 0;
}
function Ps(t, e = {}) {
  if (typeof t != "function") {
    return t;
  }
  try {
    const e = t.__sentry_wrapped__;
    if (e) {
      if (typeof e == "function") {
        return e;
      } else {
        return t;
      }
    }
    if (Mn(t)) {
      return t;
    }
  } catch {
    return t;
  }
  const n = function (...n) {
    try {
      const r = n.map(t => Ps(t, e));
      return t.apply(this, r);
    } catch (r) {
      Os++;
      setTimeout(() => {
        Os--;
      });
      (function (...t) {
        const e = cr(De());
        if (t.length === 2) {
          const [n, r] = t;
          if (n) {
            return e.withSetScope(n, r);
          } else {
            return e.withScope(r);
          }
        }
        e.withScope(t[0]);
      })(t => {
        var i;
        t.addEventProcessor(t => {
          if (e.mechanism) {
            zn(t, undefined);
            Gn(t, e.mechanism);
          }
          t.extra = {
            ...t.extra,
            arguments: n
          };
          return t;
        });
        i = r;
        ur().captureException(i, undefined);
      });
      throw r;
    }
  };
  try {
    for (const e in t) {
      if (Object.prototype.hasOwnProperty.call(t, e)) {
        n[e] = t[e];
      }
    }
  } catch {}
  Ln(n, t);
  Rn(t, "__sentry_wrapped__", n);
  try {
    if (Object.getOwnPropertyDescriptor(n, "name").configurable) {
      Object.defineProperty(n, "name", {
        get: () => t.name
      });
    }
  } catch {}
  return n;
}
function ks(t, e) {
  const n = Ls(t, e);
  const r = {
    type: Ds(e),
    value: Us(e)
  };
  if (n.length) {
    r.stacktrace = {
      frames: n
    };
  }
  if (r.type === undefined && r.value === "") {
    r.value = "Unrecoverable error caught";
  }
  return r;
}
function Is(t, e, n, r) {
  const i = hr();
  const s = i?.getOptions().normalizeDepth;
  const o = function (t) {
    for (const e in t) {
      if (Object.prototype.hasOwnProperty.call(t, e)) {
        const n = t[e];
        if (n instanceof Error) {
          return n;
        }
      }
    }
    return;
  }(e);
  const a = {
    __serialized__: Gr(e, s)
  };
  if (o) {
    return {
      exception: {
        values: [ks(t, o)]
      },
      extra: a
    };
  }
  const c = {
    exception: {
      values: [{
        type: vn(e) ? e.constructor.name : r ? "UnhandledRejection" : "Error",
        value: js(e, {
          isUnhandledRejection: r
        })
      }]
    },
    extra: a
  };
  if (n) {
    const e = Ls(t, n);
    if (e.length) {
      c.exception.values[0].stacktrace = {
        frames: e
      };
    }
  }
  return c;
}
function Rs(t, e) {
  return {
    exception: {
      values: [ks(t, e)]
    }
  };
}
function Ls(t, e) {
  const n = e.stacktrace || e.stack || "";
  const r = function (t) {
    if (t && Ms.test(t.message)) {
      return 1;
    }
    return 0;
  }(e);
  const i = function (t) {
    if (typeof t.framesToPop == "number") {
      return t.framesToPop;
    }
    return 0;
  }(e);
  try {
    return t(n, r, i);
  } catch {}
  return [];
}
const Ms = /Minified React error #\d+;/i;
function Ns(t) {
  return typeof WebAssembly != "undefined" && WebAssembly.Exception !== undefined && t instanceof WebAssembly.Exception;
}
function Ds(t) {
  const e = t?.name;
  if (!e && Ns(t)) {
    if (t.message && Array.isArray(t.message) && t.message.length == 2) {
      return t.message[0];
    } else {
      return "WebAssembly.Exception";
    }
  }
  return e;
}
function Us(t) {
  const e = t?.message;
  if (Ns(t)) {
    if (Array.isArray(t.message) && t.message.length == 2) {
      return t.message[1];
    } else {
      return "wasm exception";
    }
  } else if (e) {
    if (e.error && typeof e.error.message == "string") {
      return e.error.message;
    } else {
      return e;
    }
  } else {
    return "No error message";
  }
}
function Bs(t, e, n, r, i) {
  let s;
  if (pn(e) && e.error) {
    return Rs(t, e.error);
  }
  if (fn(e) || dn(e, "DOMException")) {
    const i = e;
    if ("stack" in e) {
      s = Rs(t, e);
    } else {
      const e = i.name || (fn(i) ? "DOMError" : "DOMException");
      const o = i.message ? `${e}: ${i.message}` : e;
      s = $s(t, o, n, r);
      zn(s, o);
    }
    if ("code" in i) {
      s.tags = {
        ...s.tags,
        "DOMException.code": `${i.code}`
      };
    }
    return s;
  }
  if (hn(e)) {
    return Rs(t, e);
  }
  if (yn(e) || vn(e)) {
    s = Is(t, e, n, i);
    Gn(s, {
      synthetic: true
    });
    return s;
  }
  s = $s(t, e, n, r);
  zn(s, `${e}`);
  Gn(s, {
    synthetic: true
  });
  return s;
}
function $s(t, e, n, r) {
  const i = {};
  if (r && n) {
    const r = Ls(t, n);
    if (r.length) {
      i.exception = {
        values: [{
          value: e,
          stacktrace: {
            frames: r
          }
        }]
      };
    }
    Gn(i, {
      synthetic: true
    });
  }
  if (gn(e)) {
    const {
      __sentry_template_string__: t,
      __sentry_template_values__: n
    } = e;
    i.logentry = {
      message: t,
      params: n
    };
    return i;
  }
  i.message = e;
  return i;
}
function js(t, {
  isUnhandledRejection: e
}) {
  const n = function (t, e = 40) {
    const n = Object.keys(Nn(t));
    n.sort();
    const r = n[0];
    if (!r) {
      return "[object has no keys]";
    }
    if (r.length >= e) {
      return On(r, e);
    }
    for (let i = n.length; i > 0; i--) {
      const t = n.slice(0, i).join(", ");
      if (!(t.length > e)) {
        if (i === n.length) {
          return t;
        } else {
          return On(t, e);
        }
      }
    }
    return "";
  }(t);
  const r = e ? "promise rejection" : "exception";
  if (pn(t)) {
    return `Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\``;
  }
  if (vn(t)) {
    return `Event \`${function (t) {
      try {
        const e = Object.getPrototypeOf(t);
        if (e) {
          return e.constructor.name;
        } else {
          return undefined;
        }
      } catch {}
    }(t)}\` (type=${t.type}) captured as ${r}`;
  }
  return `Object captured as ${r} with keys: ${n}`;
}
class Fs extends Bi {
  constructor(t) {
    n = t;
    const e = {
      release: typeof __SENTRY_RELEASE__ == "string" ? __SENTRY_RELEASE__ : As.SENTRY_RELEASE?.id,
      sendClientReports: true,
      parentSpanIsAlwaysRootSpan: true,
      ...n
    };
    var n;
    (function (t, e, n = [e], r = "npm") {
      const i = t._metadata || {};
      i.sdk ||= {
        name: `sentry.javascript.${e}`,
        packages: n.map(t => ({
          name: `${r}:@sentry/${t}`,
          version: Ne
        })),
        version: Ne
      };
      t._metadata = i;
    })(e, "browser", ["browser"], As.SENTRY_SDK_SOURCE || "npm");
    if (e._metadata?.sdk) {
      e._metadata.sdk.settings = {
        infer_ip: e.sendDefaultPii ? "auto" : "never",
        ...e._metadata.sdk.settings
      };
    }
    super(e);
    const {
      sendDefaultPii: r,
      sendClientReports: i,
      enableLogs: s,
      _experiments: o
    } = this._options;
    if (As.document && (i || s || o?.enableMetrics)) {
      As.document.addEventListener("visibilitychange", () => {
        if (As.document.visibilityState === "hidden") {
          if (i) {
            this._flushOutcomes();
          }
          if (s) {
            Ti(this);
          }
          if (o?.enableMetrics) {
            Ai(this);
          }
        }
      });
    }
    if (r) {
      this.on("beforeSendSession", Ji);
    }
  }
  eventFromException(t, e) {
    return function (t, e, n, r) {
      const i = Bs(t, e, n?.syntheticException || undefined, r);
      Gn(i);
      i.level = "error";
      if (n?.event_id) {
        i.event_id = n.event_id;
      }
      return ei(i);
    }(this._options.stackParser, t, e, this._options.attachStacktrace);
  }
  eventFromMessage(t, e = "info", n) {
    return function (t, e, n = "info", r, i) {
      const s = $s(t, e, r?.syntheticException || undefined, i);
      s.level = n;
      if (r?.event_id) {
        s.event_id = r.event_id;
      }
      return ei(s);
    }(this._options.stackParser, t, e, n, this._options.attachStacktrace);
  }
  _prepareEvent(t, e, n, r) {
    t.platform = t.platform || "javascript";
    return super._prepareEvent(t, e, n, r);
  }
}
const zs = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__;
const Gs = Me;
let Vs;
let Hs;
let qs;
let Ws;
function Ks() {
  if (!Gs.document) {
    return;
  }
  const t = sn.bind(null, "dom");
  const e = Ys(t, true);
  Gs.document.addEventListener("click", e, false);
  Gs.document.addEventListener("keypress", e, false);
  ["EventTarget", "Node"].forEach(e => {
    const n = Gs;
    const r = n[e]?.prototype;
    if (r?.hasOwnProperty?.("addEventListener")) {
      In(r, "addEventListener", function (e) {
        return function (n, r, i) {
          if (n === "click" || n == "keypress") {
            try {
              const r = this.__sentry_instrumentation_handlers__ = this.__sentry_instrumentation_handlers__ || {};
              const s = r[n] = r[n] || {
                refCount: 0
              };
              if (!s.handler) {
                const r = Ys(t);
                s.handler = r;
                e.call(this, n, r, i);
              }
              s.refCount++;
            } catch {}
          }
          return e.call(this, n, r, i);
        };
      });
      In(r, "removeEventListener", function (t) {
        return function (e, n, r) {
          if (e === "click" || e == "keypress") {
            try {
              const n = this.__sentry_instrumentation_handlers__ || {};
              const i = n[e];
              if (i) {
                i.refCount--;
                if (i.refCount <= 0) {
                  t.call(this, e, i.handler, r);
                  i.handler = undefined;
                  delete n[e];
                }
                if (Object.keys(n).length === 0) {
                  delete this.__sentry_instrumentation_handlers__;
                }
              }
            } catch {}
          }
          return t.call(this, e, n, r);
        };
      });
    }
  });
}
function Ys(t, e = false) {
  return n => {
    if (!n || n._sentryCaptured) {
      return;
    }
    const r = function (t) {
      try {
        return t.target;
      } catch {
        return null;
      }
    }(n);
    if (function (t, e) {
      return t === "keypress" && (!e?.tagName || e.tagName !== "INPUT" && e.tagName !== "TEXTAREA" && !e.isContentEditable);
    }(n.type, r)) {
      return;
    }
    Rn(n, "_sentryCaptured", true);
    if (r && !r._sentryId) {
      Rn(r, "_sentryId", $n());
    }
    const i = n.type === "keypress" ? "input" : n.type;
    if (!function (t) {
      if (t.type !== Hs) {
        return false;
      }
      try {
        if (!t.target || t.target._sentryId !== qs) {
          return false;
        }
      } catch {}
      return true;
    }(n)) {
      t({
        event: n,
        name: i,
        global: e
      });
      Hs = n.type;
      qs = r ? r._sentryId : undefined;
    }
    clearTimeout(Vs);
    Vs = Gs.setTimeout(() => {
      qs = undefined;
      Hs = undefined;
    }, 1000);
  };
}
function Xs(t) {
  const e = "history";
  nn(e, t);
  rn(e, Js);
}
function Js() {
  function t(t) {
    return function (...e) {
      const n = e.length > 2 ? e[2] : undefined;
      if (n) {
        const r = Ws;
        const i = function (t) {
          try {
            return new URL(t, Gs.location.origin).toString();
          } catch {
            return t;
          }
        }(String(n));
        Ws = i;
        if (r === i) {
          return t.apply(this, e);
        }
        sn("history", {
          from: r,
          to: i
        });
      }
      return t.apply(this, e);
    };
  }
  Gs.addEventListener("popstate", () => {
    const t = Gs.location.href;
    const e = Ws;
    Ws = t;
    if (e === t) {
      return;
    }
    sn("history", {
      from: e,
      to: t
    });
  });
  if ("history" in vs && vs.history) {
    In(Gs.history, "pushState", t);
    In(Gs.history, "replaceState", t);
  }
}
const Qs = {};
const Zs = "__sentry_xhr_v3__";
function to() {
  if (!Gs.XMLHttpRequest) {
    return;
  }
  const t = XMLHttpRequest.prototype;
  t.open = new Proxy(t.open, {
    apply(t, e, n) {
      const r = new Error();
      const i = Wn() * 1000;
      const s = mn(n[0]) ? n[0].toUpperCase() : undefined;
      const o = function (t) {
        if (mn(t)) {
          return t;
        }
        try {
          return t.toString();
        } catch {}
        return;
      }(n[1]);
      if (!s || !o) {
        return t.apply(e, n);
      }
      e[Zs] = {
        method: s,
        url: o,
        request_headers: {}
      };
      if (s === "POST" && o.match(/sentry_key/)) {
        e.__sentry_own_request__ = true;
      }
      const a = () => {
        const t = e[Zs];
        if (t && e.readyState === 4) {
          try {
            t.status_code = e.status;
          } catch {}
          sn("xhr", {
            endTimestamp: Wn() * 1000,
            startTimestamp: i,
            xhr: e,
            virtualError: r
          });
        }
      };
      if ("onreadystatechange" in e && typeof e.onreadystatechange == "function") {
        e.onreadystatechange = new Proxy(e.onreadystatechange, {
          apply: (t, e, n) => {
            a();
            return t.apply(e, n);
          }
        });
      } else {
        e.addEventListener("readystatechange", a);
      }
      e.setRequestHeader = new Proxy(e.setRequestHeader, {
        apply(t, e, n) {
          const [r, i] = n;
          const s = e[Zs];
          if (s && mn(r) && mn(i)) {
            s.request_headers[r.toLowerCase()] = i;
          }
          return t.apply(e, n);
        }
      });
      return t.apply(e, n);
    }
  });
  t.send = new Proxy(t.send, {
    apply(t, e, n) {
      const r = e[Zs];
      if (!r) {
        return t.apply(e, n);
      }
      if (n[0] !== undefined) {
        r.body = n[0];
      }
      sn("xhr", {
        startTimestamp: Wn() * 1000,
        xhr: e
      });
      return t.apply(e, n);
    }
  });
}
function eo(t, e = function (t) {
  const e = Qs[t];
  if (e) {
    return e;
  }
  let n = Gs[t];
  if (bs(n)) {
    return Qs[t] = n.bind(Gs);
  }
  const r = Gs.document;
  if (r && typeof r.createElement == "function") {
    try {
      const e = r.createElement("iframe");
      e.hidden = true;
      r.head.appendChild(e);
      const i = e.contentWindow;
      if (i?.[t]) {
        n = i[t];
      }
      r.head.removeChild(e);
    } catch (i) {
      if (zs) {
        He.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `, i);
      }
    }
  }
  if (n) {
    return Qs[t] = n.bind(Gs);
  } else {
    return n;
  }
}("fetch")) {
  let n = 0;
  let r = 0;
  return Yi(t, async function (i) {
    const s = i.body.length;
    n += s;
    r++;
    const o = {
      body: i.body,
      method: "POST",
      referrerPolicy: "strict-origin",
      headers: t.headers,
      keepalive: n <= 60000 && r < 15,
      ...t.fetchOptions
    };
    try {
      const n = await e(t.url, o);
      return {
        statusCode: n.status,
        headers: {
          "x-sentry-rate-limits": n.headers.get("X-Sentry-Rate-Limits"),
          "retry-after": n.headers.get("Retry-After")
        }
      };
    } catch (a) {
      Qs.fetch = undefined;
      throw a;
    } finally {
      n -= s;
      r--;
    }
  });
}
function no(t, e, n, r) {
  const i = {
    filename: t,
    function: e === "<anonymous>" ? qe : e,
    in_app: true
  };
  if (n !== undefined) {
    i.lineno = n;
  }
  if (r !== undefined) {
    i.colno = r;
  }
  return i;
}
const ro = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
const io = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
const so = /\((\S*)(?::(\d+))(?::(\d+))\)/;
const oo = /at (.+?) ?\(data:(.+?),/;
const ao = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
const co = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
const uo = Ye(...[[30, t => {
  const e = t.match(oo);
  if (e) {
    return {
      filename: `<data:${e[2]}>`,
      function: e[1]
    };
  }
  const n = ro.exec(t);
  if (n) {
    const [, t, e, r] = n;
    return no(t, qe, +e, +r);
  }
  const r = io.exec(t);
  if (r) {
    if (r[2] && r[2].indexOf("eval") === 0) {
      const t = so.exec(r[2]);
      if (t) {
        r[2] = t[1];
        r[3] = t[2];
        r[4] = t[3];
      }
    }
    const [t, e] = lo(r[1] || qe, r[2]);
    return no(e, t, r[3] ? +r[3] : undefined, r[4] ? +r[4] : undefined);
  }
}], [50, t => {
  const e = ao.exec(t);
  if (e) {
    if (e[3] && e[3].indexOf(" > eval") > -1) {
      const t = co.exec(e[3]);
      if (t) {
        e[1] = e[1] || "eval";
        e[3] = t[1];
        e[4] = t[2];
        e[5] = "";
      }
    }
    let t = e[3];
    let n = e[1] || qe;
    [n, t] = lo(n, t);
    return no(t, n, e[4] ? +e[4] : undefined, e[5] ? +e[5] : undefined);
  }
}]]);
const lo = (t, e) => {
  const n = t.indexOf("safari-extension") !== -1;
  const r = t.indexOf("safari-web-extension") !== -1;
  if (n || r) {
    return [t.indexOf("@") !== -1 ? t.split("@")[0] : qe, n ? `safari-extension:${e}` : `safari-web-extension:${e}`];
  } else {
    return [t, e];
  }
};
const ho = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__;
const po = 1024;
const fo = (t = {}) => {
  const e = {
    console: true,
    dom: true,
    fetch: true,
    history: true,
    sentry: true,
    xhr: true,
    ...t
  };
  return {
    name: "Breadcrumbs",
    setup(t) {
      var n;
      if (e.console) {
        (function (t) {
          const e = "console";
          nn(e, t);
          rn(e, ds);
        })(function (t) {
          return function (e) {
            if (hr() !== t) {
              return;
            }
            const n = {
              category: "console",
              data: {
                arguments: e.args,
                logger: "console"
              },
              level: ps(e.level),
              message: Cn(e.args, " ")
            };
            if (e.level === "assert") {
              if (e.args[0] !== false) {
                return;
              }
              n.message = `Assertion failed: ${Cn(e.args.slice(1), " ") || "console.assert"}`;
              n.data.arguments = e.args.slice(1);
            }
            Zi(n, {
              input: e.args,
              level: e.level
            });
          };
        }(t));
      }
      if (e.dom) {
        n = function (t, e) {
          return function (n) {
            if (hr() !== t) {
              return;
            }
            let r;
            let i;
            let s = typeof e == "object" ? e.serializeAttribute : undefined;
            let o = typeof e == "object" && typeof e.maxStringLength == "number" ? e.maxStringLength : undefined;
            if (o && o > po) {
              if (ho) {
                He.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${o} was configured. Sentry will use 1024 instead.`);
              }
              o = po;
            }
            if (typeof s == "string") {
              s = [s];
            }
            try {
              const t = n.event;
              const e = function (t) {
                return !!t && !!t.target;
              }(t) ? t.target : t;
              r = Tn(e, {
                keyAttrs: s,
                maxStringLength: o
              });
              i = function (t) {
                if (!Sn.HTMLElement) {
                  return null;
                }
                let e = t;
                for (let n = 0; n < 5; n++) {
                  if (!e) {
                    return null;
                  }
                  if (e instanceof HTMLElement) {
                    if (e.dataset.sentryComponent) {
                      return e.dataset.sentryComponent;
                    }
                    if (e.dataset.sentryElement) {
                      return e.dataset.sentryElement;
                    }
                  }
                  e = e.parentNode;
                }
                return null;
              }(e);
            } catch {
              r = "<unknown>";
            }
            if (r.length === 0) {
              return;
            }
            const a = {
              category: `ui.${n.name}`,
              message: r
            };
            if (i) {
              a.data = {
                "ui.component_name": i
              };
            }
            Zi(a, {
              event: n.event,
              name: n.name,
              global: n.global
            });
          };
        }(t, e.dom);
        nn("dom", n);
        rn("dom", Ks);
      }
      if (e.xhr) {
        (function (t) {
          nn("xhr", t);
          rn("xhr", to);
        })(function (t) {
          return function (e) {
            if (hr() !== t) {
              return;
            }
            const {
              startTimestamp: n,
              endTimestamp: r
            } = e;
            const i = e.xhr[Zs];
            if (!n || !r || !i) {
              return;
            }
            const {
              method: s,
              url: o,
              status_code: a,
              body: c
            } = i;
            const u = {
              method: s,
              url: o,
              status_code: a
            };
            const l = {
              xhr: e.xhr,
              input: c,
              startTimestamp: n,
              endTimestamp: r
            };
            const h = {
              category: "xhr",
              data: u,
              type: "http",
              level: ys(a)
            };
            t.emit("beforeOutgoingRequestBreadcrumb", h, l);
            Zi(h, l);
          };
        }(t));
      }
      if (e.fetch) {
        Es(function (t) {
          return function (e) {
            if (hr() !== t) {
              return;
            }
            const {
              startTimestamp: n,
              endTimestamp: r
            } = e;
            if (r && (!e.fetchData.url.match(/sentry_key/) || e.fetchData.method !== "POST")) {
              e.fetchData.method;
              e.fetchData.url;
              if (e.error) {
                const i = e.fetchData;
                const s = {
                  data: e.error,
                  input: e.args,
                  startTimestamp: n,
                  endTimestamp: r
                };
                const o = {
                  category: "fetch",
                  data: i,
                  level: "error",
                  type: "http"
                };
                t.emit("beforeOutgoingRequestBreadcrumb", o, s);
                Zi(o, s);
              } else {
                const i = e.response;
                const s = {
                  ...e.fetchData,
                  status_code: i?.status
                };
                e.fetchData.request_body_size;
                e.fetchData.response_body_size;
                const o = {
                  input: e.args,
                  response: i,
                  startTimestamp: n,
                  endTimestamp: r
                };
                const a = {
                  category: "fetch",
                  data: s,
                  type: "http",
                  level: ys(s.status_code)
                };
                t.emit("beforeOutgoingRequestBreadcrumb", a, o);
                Zi(a, o);
              }
            }
          };
        }(t));
      }
      if (e.history) {
        Xs(function (t) {
          return function (e) {
            if (hr() !== t) {
              return;
            }
            let n = e.from;
            let r = e.to;
            const i = Xi(As.location.href);
            let s = n ? Xi(n) : undefined;
            const o = Xi(r);
            if (!s?.path) {
              s = i;
            }
            if (i.protocol === o.protocol && i.host === o.host) {
              r = o.relative;
            }
            if (i.protocol === s.protocol && i.host === s.host) {
              n = s.relative;
            }
            Zi({
              category: "navigation",
              data: {
                from: n,
                to: r
              }
            });
          };
        }(t));
      }
      if (e.sentry) {
        t.on("beforeSendEvent", function (t) {
          return function (e) {
            if (hr() === t) {
              Zi({
                category: "sentry." + (e.type === "transaction" ? "transaction" : "event"),
                event_id: e.event_id,
                level: e.level,
                message: Fn(e)
              }, {
                event: e
              });
            }
          };
        }(t));
      }
    }
  };
};
const mo = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "BroadcastChannel", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "SharedWorker", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"];
const go = (t = {}) => {
  const e = {
    XMLHttpRequest: true,
    eventTarget: true,
    requestAnimationFrame: true,
    setInterval: true,
    setTimeout: true,
    unregisterOriginalCallbacks: false,
    ...t
  };
  return {
    name: "BrowserApiErrors",
    setupOnce() {
      if (e.setTimeout) {
        In(As, "setTimeout", _o);
      }
      if (e.setInterval) {
        In(As, "setInterval", _o);
      }
      if (e.requestAnimationFrame) {
        In(As, "requestAnimationFrame", yo);
      }
      if (e.XMLHttpRequest && "XMLHttpRequest" in As) {
        In(XMLHttpRequest.prototype, "send", vo);
      }
      const t = e.eventTarget;
      if (t) {
        (Array.isArray(t) ? t : mo).forEach(t => function (t, e) {
          const n = As;
          const r = n[t]?.prototype;
          if (!r?.hasOwnProperty?.("addEventListener")) {
            return;
          }
          In(r, "addEventListener", function (n) {
            return function (r, i, s) {
              try {
                if (typeof i.handleEvent == "function") {
                  i.handleEvent = Ps(i.handleEvent, {
                    mechanism: {
                      data: {
                        handler: Qe(i),
                        target: t
                      },
                      handled: false,
                      type: "auto.browser.browserapierrors.handleEvent"
                    }
                  });
                }
              } catch {}
              if (e.unregisterOriginalCallbacks) {
                (function (t, e, n) {
                  if (t && typeof t == "object" && "removeEventListener" in t && typeof t.removeEventListener == "function") {
                    t.removeEventListener(e, n);
                  }
                })(this, r, i);
              }
              return n.apply(this, [r, Ps(i, {
                mechanism: {
                  data: {
                    handler: Qe(i),
                    target: t
                  },
                  handled: false,
                  type: "auto.browser.browserapierrors.addEventListener"
                }
              }), s]);
            };
          });
          In(r, "removeEventListener", function (t) {
            return function (e, n, r) {
              try {
                const i = n.__sentry_wrapped__;
                if (i) {
                  t.call(this, e, i, r);
                }
              } catch {}
              return t.call(this, e, n, r);
            };
          });
        }(t, e));
      }
    }
  };
};
function _o(t) {
  return function (...e) {
    const n = e[0];
    e[0] = Ps(n, {
      mechanism: {
        handled: false,
        type: `auto.browser.browserapierrors.${Qe(t)}`
      }
    });
    return t.apply(this, e);
  };
}
function yo(t) {
  return function (e) {
    return t.apply(this, [Ps(e, {
      mechanism: {
        data: {
          handler: Qe(t)
        },
        handled: false,
        type: "auto.browser.browserapierrors.requestAnimationFrame"
      }
    })]);
  };
}
function vo(t) {
  return function (...e) {
    const n = this;
    ["onload", "onerror", "onprogress", "onreadystatechange"].forEach(t => {
      if (t in n && typeof n[t] == "function") {
        In(n, t, function (e) {
          const n = {
            mechanism: {
              data: {
                handler: Qe(e)
              },
              handled: false,
              type: `auto.browser.browserapierrors.xhr.${t}`
            }
          };
          const r = Mn(e);
          if (r) {
            n.mechanism.data.handler = Qe(r);
          }
          return Ps(e, n);
        });
      }
    });
    return t.apply(this, e);
  };
}
const bo = () => ({
  name: "BrowserSession",
  setupOnce() {
    if (As.document !== undefined) {
      mi({
        ignoreDuration: true
      });
      yi();
      Xs(({
        from: t,
        to: e
      }) => {
        if (t !== undefined && t !== e) {
          mi({
            ignoreDuration: true
          });
          yi();
        }
      });
    } else if (ho) {
      He.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");
    }
  }
});
const wo = (t = {}) => {
  const e = {
    onerror: true,
    onunhandledrejection: true,
    ...t
  };
  return {
    name: "GlobalHandlers",
    setupOnce() {
      Error.stackTraceLimit = 50;
    },
    setup(t) {
      if (e.onerror) {
        (function (t) {
          (function (t) {
            const e = "error";
            nn(e, t);
            rn(e, an);
          })(e => {
            const {
              stackParser: n,
              attachStacktrace: r
            } = So();
            if (hr() !== t || Cs()) {
              return;
            }
            const {
              msg: i,
              url: s,
              line: o,
              column: a,
              error: c
            } = e;
            const u = function (t, e, n, r) {
              const i = t.exception = t.exception || {};
              const s = i.values = i.values || [];
              const o = s[0] = s[0] || {};
              const a = o.stacktrace = o.stacktrace || {};
              const c = a.frames = a.frames || [];
              const u = r;
              const l = n;
              const h = function (t) {
                if (!mn(t) || t.length === 0) {
                  return;
                }
                if (t.startsWith("data:")) {
                  const e = t.match(/^data:([^;]+)/);
                  return `<data:${e ? e[1] : "text/javascript"}${t.includes("base64,") ? ",base64" : ""}>`;
                }
                return t.slice(0, 1024);
              }(e) ?? An();
              if (c.length === 0) {
                c.push({
                  colno: u,
                  filename: h,
                  function: qe,
                  in_app: true,
                  lineno: l
                });
              }
              return t;
            }(Bs(n, c || i, undefined, r, false), s, o, a);
            u.level = "error";
            fi(u, {
              originalException: c,
              mechanism: {
                handled: false,
                type: "auto.browser.global_handlers.onerror"
              }
            });
          });
        })(t);
        Eo("onerror");
      }
      if (e.onunhandledrejection) {
        (function (t) {
          (function (t) {
            const e = "unhandledrejection";
            nn(e, t);
            rn(e, un);
          })(e => {
            const {
              stackParser: n,
              attachStacktrace: r
            } = So();
            if (hr() !== t || Cs()) {
              return;
            }
            const i = function (t) {
              if (_n(t)) {
                return t;
              }
              try {
                if ("reason" in t) {
                  return t.reason;
                }
                if ("detail" in t && "reason" in t.detail) {
                  return t.detail.reason;
                }
              } catch {}
              return t;
            }(e);
            const s = _n(i) ? {
              exception: {
                values: [{
                  type: "UnhandledRejection",
                  value: `Non-Error promise rejection captured with value: ${String(i)}`
                }]
              }
            } : Bs(n, i, undefined, r, true);
            s.level = "error";
            fi(s, {
              originalException: i,
              mechanism: {
                handled: false,
                type: "auto.browser.global_handlers.onunhandledrejection"
              }
            });
          });
        })(t);
        Eo("onunhandledrejection");
      }
    }
  };
};
function Eo(t) {
  if (ho) {
    He.log(`Global Handler attached: ${t}`);
  }
}
function So() {
  const t = hr();
  return t?.getOptions() || {
    stackParser: () => [],
    attachStacktrace: false
  };
}
const To = () => ({
  name: "HttpContext",
  preprocessEvent(t) {
    if (!As.navigator && !As.location && !As.document) {
      return;
    }
    const e = function () {
      const t = An();
      const {
        referrer: e
      } = As.document || {};
      const {
        userAgent: n
      } = As.navigator || {};
      return {
        url: t,
        headers: {
          ...(e && {
            Referer: e
          }),
          ...(n && {
            "User-Agent": n
          })
        }
      };
    }();
    const n = {
      ...e.headers,
      ...t.request?.headers
    };
    t.request = {
      ...e,
      ...t.request,
      headers: n
    };
  }
});
const xo = (t = {}) => {
  const e = t.limit || 5;
  const n = t.key || "cause";
  return {
    name: "LinkedErrors",
    preprocessEvent(t, r, i) {
      cs(ks, i.getOptions().stackParser, n, e, t, r);
    }
  };
};
function Ao() {
  return !!function () {
    if (As.window === undefined) {
      return false;
    }
    const t = As;
    if (t.nw) {
      return false;
    }
    const e = t.chrome || t.browser;
    if (!e?.runtime?.id) {
      return false;
    }
    const n = An();
    const r = ["chrome-extension", "moz-extension", "ms-browser-extension", "safari-web-extension"];
    return As !== As.top || !r.some(t => n.startsWith(`${t}://`));
  }() && (ho && Fe(() => {}), true);
}
function Oo(t) {
  return [ss(), ns(), go(), fo(), wo(), xo(), fs(), To(), bo()];
}
const Co = () => {
  const t = Oo().filter(t => !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(t.name));
  (function (t = {}) {
    const e = !t.skipBrowserExtensionCheck && Ao();
    const n = {
      ...t,
      enabled: !e && t.enabled,
      stackParser: (r = t.stackParser || uo, Array.isArray(r) ? Ye(...r) : r),
      integrations: wi({
        integrations: t.integrations,
        defaultIntegrations: t.defaultIntegrations == null ? Oo() : t.defaultIntegrations
      }),
      transport: t.transport || eo
    };
    var r;
    Hi(Fs, n);
  })({
    dsn: "https://60bea3ee4ef1022e4035b23ba50f44d0@o1158394.ingest.us.sentry.io/4509876992278529",
    transport: eo,
    stackParser: uo,
    integrations: t,
    initialScope: {
      tags: {
        extension_version: chrome.runtime.getManifest().version
      }
    },
    beforeSend: t => {
      t.contexts = {
        ...t.contexts,
        extension: {
          id: chrome.runtime.id,
          version: chrome.runtime.getManifest().version,
          environment: "production"
        }
      };
      return t;
    }
  });
};
var Po = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {};
var ko = "1.9.0";
var Io = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
var Ro = function (t) {
  var e = new Set([t]);
  var n = new Set();
  var r = t.match(Io);
  if (!r) {
    return function () {
      return false;
    };
  }
  var i = +r[1];
  var s = +r[2];
  var o = +r[3];
  if (r[4] != null) {
    return function (e) {
      return e === t;
    };
  }
  function a(t) {
    n.add(t);
    return false;
  }
  function c(t) {
    e.add(t);
    return true;
  }
  return function (t) {
    if (e.has(t)) {
      return true;
    }
    if (n.has(t)) {
      return false;
    }
    var r = t.match(Io);
    if (!r) {
      return a(t);
    }
    var u = +r[1];
    var l = +r[2];
    var h = +r[3];
    if (r[4] != null || i !== u) {
      return a(t);
    } else if (i === 0) {
      if (s === l && o <= h) {
        return c(t);
      } else {
        return a(t);
      }
    } else if (s <= l) {
      return c(t);
    } else {
      return a(t);
    }
  };
}(ko);
var Lo = ko.split(".")[0];
var Mo = Symbol.for("opentelemetry.js.api." + Lo);
var No = Po;
function Do(t, e, n, r) {
  if (r === undefined) {
    r = false;
  }
  var s = No[Mo] = No[Mo] ?? {
    version: ko
  };
  if (!r && s[t]) {
    var o = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + t);
    n.error(o.stack || o.message);
    return false;
  }
  if (s.version !== ko) {
    o = new Error("@opentelemetry/api: Registration of version v" + s.version + " for " + t + " does not match previously registered API v" + ko);
    n.error(o.stack || o.message);
    return false;
  }
  s[t] = e;
  n.debug("@opentelemetry/api: Registered a global for " + t + " v" + ko + ".");
  return true;
}
function Uo(t) {
  var r = No[Mo]?.version;
  if (r && Ro(r)) {
    return No[Mo]?.[t];
  }
}
function Bo(t, e) {
  e.debug("@opentelemetry/api: Unregistering a global for " + t + " v" + ko + ".");
  var n = No[Mo];
  if (n) {
    delete n[t];
  }
}
var $o;
var jo;
var Fo = function () {
  function t(t) {
    this._namespace = t.namespace || "DiagComponentLogger";
  }
  t.prototype.debug = function () {
    var t = [];
    for (var e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    return zo("debug", this._namespace, t);
  };
  t.prototype.error = function () {
    var t = [];
    for (var e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    return zo("error", this._namespace, t);
  };
  t.prototype.info = function () {
    var t = [];
    for (var e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    return zo("info", this._namespace, t);
  };
  t.prototype.warn = function () {
    var t = [];
    for (var e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    return zo("warn", this._namespace, t);
  };
  t.prototype.verbose = function () {
    var t = [];
    for (var e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    return zo("verbose", this._namespace, t);
  };
  return t;
}();
function zo(t, e, n) {
  var r = Uo("diag");
  if (r) {
    n.unshift(e);
    return r[t].apply(r, function (t, e, n) {
      if (n || arguments.length === 2) {
        var r;
        for (var i = 0, s = e.length; i < s; i++) {
          if (!!r || !(i in e)) {
            r ||= Array.prototype.slice.call(e, 0, i);
            r[i] = e[i];
          }
        }
      }
      return t.concat(r || Array.prototype.slice.call(e));
    }([], function (t, e) {
      var n = typeof Symbol == "function" && t[Symbol.iterator];
      if (!n) {
        return t;
      }
      var r;
      var i;
      var s = n.call(t);
      var o = [];
      try {
        while ((e === undefined || e-- > 0) && !(r = s.next()).done) {
          o.push(r.value);
        }
      } catch (a) {
        i = {
          error: a
        };
      } finally {
        try {
          if (r && !r.done && (n = s.return)) {
            n.call(s);
          }
        } finally {
          if (i) {
            throw i.error;
          }
        }
      }
      return o;
    }(n), false));
  }
}
(jo = $o ||= {})[jo.NONE = 0] = "NONE";
jo[jo.ERROR = 30] = "ERROR";
jo[jo.WARN = 50] = "WARN";
jo[jo.INFO = 60] = "INFO";
jo[jo.DEBUG = 70] = "DEBUG";
jo[jo.VERBOSE = 80] = "VERBOSE";
jo[jo.ALL = 9999] = "ALL";
var Go = function () {
  function t() {
    function t(t) {
      return function () {
        var e = [];
        for (var n = 0; n < arguments.length; n++) {
          e[n] = arguments[n];
        }
        var r = Uo("diag");
        if (r) {
          return r[t].apply(r, function (t, e, n) {
            if (n || arguments.length === 2) {
              var r;
              for (var i = 0, s = e.length; i < s; i++) {
                if (!!r || !(i in e)) {
                  r ||= Array.prototype.slice.call(e, 0, i);
                  r[i] = e[i];
                }
              }
            }
            return t.concat(r || Array.prototype.slice.call(e));
          }([], function (t, e) {
            var n = typeof Symbol == "function" && t[Symbol.iterator];
            if (!n) {
              return t;
            }
            var r;
            var i;
            var s = n.call(t);
            var o = [];
            try {
              while ((e === undefined || e-- > 0) && !(r = s.next()).done) {
                o.push(r.value);
              }
            } catch (a) {
              i = {
                error: a
              };
            } finally {
              try {
                if (r && !r.done && (n = s.return)) {
                  n.call(s);
                }
              } finally {
                if (i) {
                  throw i.error;
                }
              }
            }
            return o;
          }(e), false));
        }
      };
    }
    var e = this;
    e.setLogger = function (t, n) {
      if (n === undefined) {
        n = {
          logLevel: $o.INFO
        };
      }
      if (t === e) {
        var o = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
        e.error(o.stack ?? o.message);
        return false;
      }
      if (typeof n == "number") {
        n = {
          logLevel: n
        };
      }
      var a = Uo("diag");
      var c = function (t, e) {
        function n(n, r) {
          var i = e[n];
          if (typeof i == "function" && t >= r) {
            return i.bind(e);
          } else {
            return function () {};
          }
        }
        if (t < $o.NONE) {
          t = $o.NONE;
        } else if (t > $o.ALL) {
          t = $o.ALL;
        }
        e = e || {};
        return {
          error: n("error", $o.ERROR),
          warn: n("warn", $o.WARN),
          info: n("info", $o.INFO),
          debug: n("debug", $o.DEBUG),
          verbose: n("verbose", $o.VERBOSE)
        };
      }(n.logLevel ?? $o.INFO, t);
      if (a && !n.suppressOverrideMessage) {
        var u = new Error().stack ?? "<failed to generate stacktrace>";
        a.warn("Current logger will be overwritten from " + u);
        c.warn("Current logger will overwrite one already registered from " + u);
      }
      return Do("diag", c, e, true);
    };
    e.disable = function () {
      Bo("diag", e);
    };
    e.createComponentLogger = function (t) {
      return new Fo(t);
    };
    e.verbose = t("verbose");
    e.debug = t("debug");
    e.info = t("info");
    e.warn = t("warn");
    e.error = t("error");
  }
  t.instance = function () {
    this._instance ||= new t();
    return this._instance;
  };
  return t;
}();
var Vo = function () {
  function t(t) {
    this._entries = t ? new Map(t) : new Map();
  }
  t.prototype.getEntry = function (t) {
    var e = this._entries.get(t);
    if (e) {
      return Object.assign({}, e);
    }
  };
  t.prototype.getAllEntries = function () {
    return Array.from(this._entries.entries()).map(function (t) {
      var e = function (t, e) {
        var n = typeof Symbol == "function" && t[Symbol.iterator];
        if (!n) {
          return t;
        }
        var r;
        var i;
        var s = n.call(t);
        var o = [];
        try {
          while ((e === undefined || e-- > 0) && !(r = s.next()).done) {
            o.push(r.value);
          }
        } catch (a) {
          i = {
            error: a
          };
        } finally {
          try {
            if (r && !r.done && (n = s.return)) {
              n.call(s);
            }
          } finally {
            if (i) {
              throw i.error;
            }
          }
        }
        return o;
      }(t, 2);
      return [e[0], e[1]];
    });
  };
  t.prototype.setEntry = function (e, n) {
    var r = new t(this._entries);
    r._entries.set(e, n);
    return r;
  };
  t.prototype.removeEntry = function (e) {
    var n = new t(this._entries);
    n._entries.delete(e);
    return n;
  };
  t.prototype.removeEntries = function () {
    var e;
    var n;
    var r = [];
    for (var i = 0; i < arguments.length; i++) {
      r[i] = arguments[i];
    }
    var s = new t(this._entries);
    try {
      for (var o = function (t) {
          var e = typeof Symbol == "function" && Symbol.iterator;
          var n = e && t[e];
          var r = 0;
          if (n) {
            return n.call(t);
          }
          if (t && typeof t.length == "number") {
            return {
              next: function () {
                if (t && r >= t.length) {
                  t = undefined;
                }
                return {
                  value: t && t[r++],
                  done: !t
                };
              }
            };
          }
          throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }(r), a = o.next(); !a.done; a = o.next()) {
        var c = a.value;
        s._entries.delete(c);
      }
    } catch (u) {
      e = {
        error: u
      };
    } finally {
      try {
        if (a && !a.done && (n = o.return)) {
          n.call(o);
        }
      } finally {
        if (e) {
          throw e.error;
        }
      }
    }
    return s;
  };
  t.prototype.clear = function () {
    return new t();
  };
  return t;
}();
var Ho = Symbol("BaggageEntryMetadata");
var qo = Go.instance();
function Wo(t = {}) {
  return new Vo(new Map(Object.entries(t)));
}
function Ko(t) {
  return Symbol.for(t);
}
var Yo;
var Xo;
var Jo = new (function () {
  return function t(e) {
    var n = this;
    n._currentContext = e ? new Map(e) : new Map();
    n.getValue = function (t) {
      return n._currentContext.get(t);
    };
    n.setValue = function (e, r) {
      var i = new t(n._currentContext);
      i._currentContext.set(e, r);
      return i;
    };
    n.deleteValue = function (e) {
      var r = new t(n._currentContext);
      r._currentContext.delete(e);
      return r;
    };
  };
}())();
var Qo = [{
  n: "error",
  c: "error"
}, {
  n: "warn",
  c: "warn"
}, {
  n: "info",
  c: "info"
}, {
  n: "debug",
  c: "debug"
}, {
  n: "verbose",
  c: "trace"
}];
var Zo = function () {
  return function () {
    function t(t) {
      return function () {
        var e = [];
        for (var n = 0; n < arguments.length; n++) {
          e[n] = arguments[n];
        }
        if (console) {
          var r = console[t];
          if (typeof r != "function") {
            r = console.log;
          }
          if (typeof r == "function") {
            return r.apply(console, e);
          }
        }
      };
    }
    for (var e = 0; e < Qo.length; e++) {
      this[Qo[e].n] = t(Qo[e].c);
    }
  };
}();
var ta = function () {
  function t(e, n) {
    return (t = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        if (Object.prototype.hasOwnProperty.call(e, n)) {
          t[n] = e[n];
        }
      }
    })(e, n);
  }
  return function (e, n) {
    if (typeof n != "function" && n !== null) {
      throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
    }
    function r() {
      this.constructor = e;
    }
    t(e, n);
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
var ea = function () {
  function t() {}
  t.prototype.createGauge = function (t, e) {
    return pa;
  };
  t.prototype.createHistogram = function (t, e) {
    return fa;
  };
  t.prototype.createCounter = function (t, e) {
    return da;
  };
  t.prototype.createUpDownCounter = function (t, e) {
    return ma;
  };
  t.prototype.createObservableGauge = function (t, e) {
    return _a;
  };
  t.prototype.createObservableCounter = function (t, e) {
    return ga;
  };
  t.prototype.createObservableUpDownCounter = function (t, e) {
    return ya;
  };
  t.prototype.addBatchObservableCallback = function (t, e) {};
  t.prototype.removeBatchObservableCallback = function (t) {};
  return t;
}();
var na = function () {
  return function () {};
}();
var ra = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  ta(e, t);
  e.prototype.add = function (t, e) {};
  return e;
}(na);
var ia = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  ta(e, t);
  e.prototype.add = function (t, e) {};
  return e;
}(na);
var sa = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  ta(e, t);
  e.prototype.record = function (t, e) {};
  return e;
}(na);
var oa = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  ta(e, t);
  e.prototype.record = function (t, e) {};
  return e;
}(na);
var aa = function () {
  function t() {}
  t.prototype.addCallback = function (t) {};
  t.prototype.removeCallback = function (t) {};
  return t;
}();
var ca = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  ta(e, t);
  return e;
}(aa);
var ua = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  ta(e, t);
  return e;
}(aa);
var la = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  ta(e, t);
  return e;
}(aa);
var ha = new ea();
var da = new ra();
var pa = new sa();
var fa = new oa();
var ma = new ia();
var ga = new ca();
var _a = new ua();
var ya = new la();
(Xo = Yo ||= {})[Xo.INT = 0] = "INT";
Xo[Xo.DOUBLE = 1] = "DOUBLE";
var va;
var ba;
var wa = {
  get: function (t, e) {
    if (t != null) {
      return t[e];
    }
  },
  keys: function (t) {
    if (t == null) {
      return [];
    } else {
      return Object.keys(t);
    }
  }
};
var Ea = {
  set: function (t, e, n) {
    if (t != null) {
      t[e] = n;
    }
  }
};
var Sa = function () {
  function t() {}
  t.prototype.active = function () {
    return Jo;
  };
  t.prototype.with = function (t, e, n) {
    var r = [];
    for (var i = 3; i < arguments.length; i++) {
      r[i - 3] = arguments[i];
    }
    return e.call.apply(e, function (t, e, n) {
      if (n || arguments.length === 2) {
        var r;
        for (var i = 0, s = e.length; i < s; i++) {
          if (!!r || !(i in e)) {
            r ||= Array.prototype.slice.call(e, 0, i);
            r[i] = e[i];
          }
        }
      }
      return t.concat(r || Array.prototype.slice.call(e));
    }([n], function (t, e) {
      var n = typeof Symbol == "function" && t[Symbol.iterator];
      if (!n) {
        return t;
      }
      var r;
      var i;
      var s = n.call(t);
      var o = [];
      try {
        while ((e === undefined || e-- > 0) && !(r = s.next()).done) {
          o.push(r.value);
        }
      } catch (a) {
        i = {
          error: a
        };
      } finally {
        try {
          if (r && !r.done && (n = s.return)) {
            n.call(s);
          }
        } finally {
          if (i) {
            throw i.error;
          }
        }
      }
      return o;
    }(r), false));
  };
  t.prototype.bind = function (t, e) {
    return e;
  };
  t.prototype.enable = function () {
    return this;
  };
  t.prototype.disable = function () {
    return this;
  };
  return t;
}();
var Ta = "context";
var xa = new Sa();
var Aa = function () {
  function t() {}
  t.getInstance = function () {
    this._instance ||= new t();
    return this._instance;
  };
  t.prototype.setGlobalContextManager = function (t) {
    return Do(Ta, t, Go.instance());
  };
  t.prototype.active = function () {
    return this._getContextManager().active();
  };
  t.prototype.with = function (t, e, n) {
    var r;
    var i = [];
    for (var s = 3; s < arguments.length; s++) {
      i[s - 3] = arguments[s];
    }
    return (r = this._getContextManager()).with.apply(r, function (t, e, n) {
      if (n || arguments.length === 2) {
        var r;
        for (var i = 0, s = e.length; i < s; i++) {
          if (!!r || !(i in e)) {
            r ||= Array.prototype.slice.call(e, 0, i);
            r[i] = e[i];
          }
        }
      }
      return t.concat(r || Array.prototype.slice.call(e));
    }([t, e, n], function (t, e) {
      var n = typeof Symbol == "function" && t[Symbol.iterator];
      if (!n) {
        return t;
      }
      var r;
      var i;
      var s = n.call(t);
      var o = [];
      try {
        while ((e === undefined || e-- > 0) && !(r = s.next()).done) {
          o.push(r.value);
        }
      } catch (a) {
        i = {
          error: a
        };
      } finally {
        try {
          if (r && !r.done && (n = s.return)) {
            n.call(s);
          }
        } finally {
          if (i) {
            throw i.error;
          }
        }
      }
      return o;
    }(i), false));
  };
  t.prototype.bind = function (t, e) {
    return this._getContextManager().bind(t, e);
  };
  t.prototype._getContextManager = function () {
    return Uo(Ta) || xa;
  };
  t.prototype.disable = function () {
    this._getContextManager().disable();
    Bo(Ta, Go.instance());
  };
  return t;
}();
(ba = va ||= {})[ba.NONE = 0] = "NONE";
ba[ba.SAMPLED = 1] = "SAMPLED";
var Oa = "0000000000000000";
var Ca = "00000000000000000000000000000000";
var Pa = {
  traceId: Ca,
  spanId: Oa,
  traceFlags: va.NONE
};
var ka = function () {
  function t(t = Pa) {
    this._spanContext = t;
  }
  t.prototype.spanContext = function () {
    return this._spanContext;
  };
  t.prototype.setAttribute = function (t, e) {
    return this;
  };
  t.prototype.setAttributes = function (t) {
    return this;
  };
  t.prototype.addEvent = function (t, e) {
    return this;
  };
  t.prototype.addLink = function (t) {
    return this;
  };
  t.prototype.addLinks = function (t) {
    return this;
  };
  t.prototype.setStatus = function (t) {
    return this;
  };
  t.prototype.updateName = function (t) {
    return this;
  };
  t.prototype.end = function (t) {};
  t.prototype.isRecording = function () {
    return false;
  };
  t.prototype.recordException = function (t, e) {};
  return t;
}();
var Ia = Ko("OpenTelemetry Context Key SPAN");
function Ra(t) {
  return t.getValue(Ia) || undefined;
}
function La() {
  return Ra(Aa.getInstance().active());
}
function Ma(t, e) {
  return t.setValue(Ia, e);
}
function Na(t) {
  return t.deleteValue(Ia);
}
function Da(t, e) {
  return Ma(t, new ka(e));
}
function Ua(t) {
  var e;
  if ((e = Ra(t)) === null || e === undefined) {
    return undefined;
  } else {
    return e.spanContext();
  }
}
var Ba = /^([0-9a-f]{32})$/i;
var $a = /^[0-9a-f]{16}$/i;
function ja(t) {
  return Ba.test(t) && t !== Ca;
}
function Fa(t) {
  return ja(t.traceId) && (e = t.spanId, $a.test(e) && e !== Oa);
  var e;
}
function za(t) {
  return new ka(t);
}
var Ga = Aa.getInstance();
var Va = function () {
  function t() {}
  t.prototype.startSpan = function (t, e, n = Ga.active()) {
    if (Boolean(e == null ? undefined : e.root)) {
      return new ka();
    }
    var r;
    var i = n && Ua(n);
    if (typeof (r = i) == "object" && typeof r.spanId == "string" && typeof r.traceId == "string" && typeof r.traceFlags == "number" && Fa(i)) {
      return new ka(i);
    } else {
      return new ka();
    }
  };
  t.prototype.startActiveSpan = function (t, e, n, r) {
    var i;
    var s;
    var o;
    if (!(arguments.length < 2)) {
      if (arguments.length === 2) {
        o = e;
      } else if (arguments.length === 3) {
        i = e;
        o = n;
      } else {
        i = e;
        s = n;
        o = r;
      }
      var a = s ?? Ga.active();
      var c = this.startSpan(t, i, a);
      var u = Ma(a, c);
      return Ga.with(u, o, undefined, c);
    }
  };
  return t;
}();
var Ha;
var qa;
var Wa;
var Ka;
var Ya;
var Xa;
var Ja = new Va();
var Qa = function () {
  function t(t, e, n, r) {
    this._provider = t;
    this.name = e;
    this.version = n;
    this.options = r;
  }
  t.prototype.startSpan = function (t, e, n) {
    return this._getTracer().startSpan(t, e, n);
  };
  t.prototype.startActiveSpan = function (t, e, n, r) {
    var i = this._getTracer();
    return Reflect.apply(i.startActiveSpan, i, arguments);
  };
  t.prototype._getTracer = function () {
    if (this._delegate) {
      return this._delegate;
    }
    var t = this._provider.getDelegateTracer(this.name, this.version, this.options);
    if (t) {
      this._delegate = t;
      return this._delegate;
    } else {
      return Ja;
    }
  };
  return t;
}();
var Za = new (function () {
  function t() {}
  t.prototype.getTracer = function (t, e, n) {
    return new Va();
  };
  return t;
}())();
var tc = function () {
  function t() {}
  t.prototype.getTracer = function (t, e, n) {
    return this.getDelegateTracer(t, e, n) ?? new Qa(this, t, e, n);
  };
  t.prototype.getDelegate = function () {
    return this._delegate ?? Za;
  };
  t.prototype.setDelegate = function (t) {
    this._delegate = t;
  };
  t.prototype.getDelegateTracer = function (t, e, n) {
    var r;
    if ((r = this._delegate) === null || r === undefined) {
      return undefined;
    } else {
      return r.getTracer(t, e, n);
    }
  };
  return t;
}();
(qa = Ha ||= {})[qa.NOT_RECORD = 0] = "NOT_RECORD";
qa[qa.RECORD = 1] = "RECORD";
qa[qa.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
(Ka = Wa ||= {})[Ka.INTERNAL = 0] = "INTERNAL";
Ka[Ka.SERVER = 1] = "SERVER";
Ka[Ka.CLIENT = 2] = "CLIENT";
Ka[Ka.PRODUCER = 3] = "PRODUCER";
Ka[Ka.CONSUMER = 4] = "CONSUMER";
(Xa = Ya ||= {})[Xa.UNSET = 0] = "UNSET";
Xa[Xa.OK = 1] = "OK";
Xa[Xa.ERROR = 2] = "ERROR";
var ec = Aa.getInstance();
var nc = Go.instance();
var rc = new (function () {
  function t() {}
  t.prototype.getMeter = function (t, e, n) {
    return ha;
  };
  return t;
}())();
var ic = "metrics";
var sc = function () {
  function t() {}
  t.getInstance = function () {
    this._instance ||= new t();
    return this._instance;
  };
  t.prototype.setGlobalMeterProvider = function (t) {
    return Do(ic, t, Go.instance());
  };
  t.prototype.getMeterProvider = function () {
    return Uo(ic) || rc;
  };
  t.prototype.getMeter = function (t, e, n) {
    return this.getMeterProvider().getMeter(t, e, n);
  };
  t.prototype.disable = function () {
    Bo(ic, Go.instance());
  };
  return t;
}().getInstance();
var oc = function () {
  function t() {}
  t.prototype.inject = function (t, e) {};
  t.prototype.extract = function (t, e) {
    return t;
  };
  t.prototype.fields = function () {
    return [];
  };
  return t;
}();
var ac = Ko("OpenTelemetry Baggage Key");
function cc(t) {
  return t.getValue(ac) || undefined;
}
function uc() {
  return cc(Aa.getInstance().active());
}
function lc(t, e) {
  return t.setValue(ac, e);
}
function hc(t) {
  return t.deleteValue(ac);
}
var dc = "propagation";
var pc = new oc();
var fc = function () {
  function t() {
    this.createBaggage = Wo;
    this.getBaggage = cc;
    this.getActiveBaggage = uc;
    this.setBaggage = lc;
    this.deleteBaggage = hc;
  }
  t.getInstance = function () {
    this._instance ||= new t();
    return this._instance;
  };
  t.prototype.setGlobalPropagator = function (t) {
    return Do(dc, t, Go.instance());
  };
  t.prototype.inject = function (t, e, n = Ea) {
    return this._getGlobalPropagator().inject(t, e, n);
  };
  t.prototype.extract = function (t, e, n = wa) {
    return this._getGlobalPropagator().extract(t, e, n);
  };
  t.prototype.fields = function () {
    return this._getGlobalPropagator().fields();
  };
  t.prototype.disable = function () {
    Bo(dc, Go.instance());
  };
  t.prototype._getGlobalPropagator = function () {
    return Uo(dc) || pc;
  };
  return t;
}().getInstance();
var mc = "trace";
var gc = function () {
  function t() {
    this._proxyTracerProvider = new tc();
    this.wrapSpanContext = za;
    this.isSpanContextValid = Fa;
    this.deleteSpan = Na;
    this.getSpan = Ra;
    this.getActiveSpan = La;
    this.getSpanContext = Ua;
    this.setSpan = Ma;
    this.setSpanContext = Da;
  }
  t.getInstance = function () {
    this._instance ||= new t();
    return this._instance;
  };
  t.prototype.setGlobalTracerProvider = function (t) {
    var e = Do(mc, this._proxyTracerProvider, Go.instance());
    if (e) {
      this._proxyTracerProvider.setDelegate(t);
    }
    return e;
  };
  t.prototype.getTracerProvider = function () {
    return Uo(mc) || this._proxyTracerProvider;
  };
  t.prototype.getTracer = function (t, e) {
    return this.getTracerProvider().getTracer(t, e);
  };
  t.prototype.disable = function () {
    Bo(mc, Go.instance());
    this._proxyTracerProvider = new tc();
  };
  return t;
}().getInstance();
let _c = class {
  emit(t) {}
};
const yc = new _c();
const vc = new class {
  getLogger(t, e, n) {
    return new _c();
  }
}();
let bc = class {
  constructor(t, e, n, r) {
    this._provider = t;
    this.name = e;
    this.version = n;
    this.options = r;
  }
  emit(t) {
    this._getLogger().emit(t);
  }
  _getLogger() {
    if (this._delegate) {
      return this._delegate;
    }
    const t = this._provider.getDelegateLogger(this.name, this.version, this.options);
    if (t) {
      this._delegate = t;
      return this._delegate;
    } else {
      return yc;
    }
  }
};
let wc = class {
  getLogger(t, e, n) {
    return this.getDelegateLogger(t, e, n) ?? new bc(this, t, e, n);
  }
  getDelegate() {
    return this._delegate ?? vc;
  }
  setDelegate(t) {
    this._delegate = t;
  }
  getDelegateLogger(t, e, n) {
    var r;
    if ((r = this._delegate) === null || r === undefined) {
      return undefined;
    } else {
      return r.getLogger(t, e, n);
    }
  }
};
const Ec = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {};
const Sc = Symbol.for("io.opentelemetry.js.api.logs");
const Tc = Ec;
const xc = class t {
  constructor() {
    this._proxyLoggerProvider = new wc();
  }
  static getInstance() {
    this._instance ||= new t();
    return this._instance;
  }
  setGlobalLoggerProvider(t) {
    if (Tc[Sc]) {
      return this.getLoggerProvider();
    } else {
      e = 1;
      n = t;
      r = vc;
      Tc[Sc] = t => t === e ? n : r;
      this._proxyLoggerProvider.setDelegate(t);
      return t;
    }
    var e;
    var n;
    var r;
  }
  getLoggerProvider() {
    var t;
    return ((t = Tc[Sc]) === null || t === undefined ? undefined : t.call(Tc, 1)) ?? this._proxyLoggerProvider;
  }
  getLogger(t, e, n) {
    return this.getLoggerProvider().getLogger(t, e, n);
  }
  disable() {
    delete Tc[Sc];
    this._proxyLoggerProvider = new wc();
  }
}.getInstance();
const Ac = "service.name";
const Oc = "telemetry.sdk.language";
const Cc = "telemetry.sdk.name";
const Pc = "telemetry.sdk.version";
const kc = "process.runtime.name";
const Ic = {
  [Cc]: "opentelemetry",
  [kc]: "browser",
  [Oc]: "webjs",
  [Pc]: "2.0.1"
};
const Rc = t => t !== null && typeof t == "object" && typeof t.then == "function";
class Lc {
  _rawAttributes;
  _asyncAttributesPending = false;
  _memoizedAttributes;
  static FromAttributeList(t) {
    const e = new Lc({});
    e._rawAttributes = Uc(t);
    e._asyncAttributesPending = t.filter(([t, e]) => Rc(e)).length > 0;
    return e;
  }
  constructor(t) {
    const e = t.attributes ?? {};
    this._rawAttributes = Object.entries(e).map(([t, e]) => {
      if (Rc(e)) {
        this._asyncAttributesPending = true;
      }
      return [t, e];
    });
    this._rawAttributes = Uc(this._rawAttributes);
  }
  get asyncAttributesPending() {
    return this._asyncAttributesPending;
  }
  async waitForAsyncAttributes() {
    if (this.asyncAttributesPending) {
      for (let t = 0; t < this._rawAttributes.length; t++) {
        const [e, n] = this._rawAttributes[t];
        this._rawAttributes[t] = [e, Rc(n) ? await n : n];
      }
      this._asyncAttributesPending = false;
    }
  }
  get attributes() {
    if (this.asyncAttributesPending) {
      nc.error("Accessing resource attributes before async attributes settled");
    }
    if (this._memoizedAttributes) {
      return this._memoizedAttributes;
    }
    const t = {};
    for (const [e, n] of this._rawAttributes) {
      if (Rc(n)) {
        nc.debug(`Unsettled resource attribute ${e} skipped`);
      } else if (n != null) {
        t[e] ??= n;
      }
    }
    if (!this._asyncAttributesPending) {
      this._memoizedAttributes = t;
    }
    return t;
  }
  getRawAttributes() {
    return this._rawAttributes;
  }
  merge(t) {
    if (t == null) {
      return this;
    } else {
      return Lc.FromAttributeList([...t.getRawAttributes(), ...this.getRawAttributes()]);
    }
  }
}
function Mc(t) {
  return Lc.FromAttributeList(Object.entries(t));
}
function Nc() {
  return Mc({});
}
function Dc() {
  return Mc({
    [Ac]: "unknown_service",
    [Oc]: Ic[Oc],
    [Cc]: Ic[Cc],
    [Pc]: Ic[Pc]
  });
}
function Uc(t) {
  return t.map(([t, e]) => Rc(e) ? [t, e.catch(e => {
    nc.debug("promise rejection for resource attribute: %s - %s", t, e);
  })] : [t, e]);
}
const Bc = (t = {}) => (t.detectors || []).map(e => {
  try {
    n = e.detect(t);
    const r = new Lc(n);
    nc.debug(`${e.constructor.name} found resource.`, r);
    return r;
  } catch (r) {
    nc.debug(`${e.constructor.name} failed: ${r.message}`);
    return Nc();
  }
  var n;
}).reduce((t, e) => t.merge(e), Nc());
const $c = Ko("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function jc(t) {
  const e = {};
  if (typeof t != "object" || t == null) {
    return e;
  }
  for (const [n, r] of Object.entries(t)) {
    if (Fc(n)) {
      if (zc(r)) {
        if (Array.isArray(r)) {
          e[n] = r.slice();
        } else {
          e[n] = r;
        }
      } else {
        nc.warn(`Invalid attribute value set for key: ${n}`);
      }
    } else {
      nc.warn(`Invalid attribute key: ${n}`);
    }
  }
  return e;
}
function Fc(t) {
  return typeof t == "string" && t.length > 0;
}
function zc(t) {
  return t == null || (Array.isArray(t) ? function (t) {
    let e;
    for (const n of t) {
      if (n != null) {
        if (!e) {
          if (Gc(n)) {
            e = typeof n;
            continue;
          }
          return false;
        }
        if (typeof n !== e) {
          return false;
        }
      }
    }
    return true;
  }(t) : Gc(t));
}
function Gc(t) {
  switch (typeof t) {
    case "number":
    case "boolean":
    case "string":
      return true;
  }
  return false;
}
let Vc = t => {
  nc.error(function (t) {
    if (typeof t == "string") {
      return t;
    } else {
      return JSON.stringify(function (t) {
        const e = {};
        let n = t;
        while (n !== null) {
          Object.getOwnPropertyNames(n).forEach(t => {
            if (e[t]) {
              return;
            }
            const r = n[t];
            if (r) {
              e[t] = String(r);
            }
          });
          n = Object.getPrototypeOf(n);
        }
        return e;
      }(t));
    }
  }(t));
};
function Hc(t) {
  try {
    Vc(t);
  } catch {}
}
const qc = performance;
const Wc = "exception.message";
const Kc = "exception.type";
const Yc = Math.pow(10, 6);
const Xc = Math.pow(10, 9);
function Jc(t) {
  const e = t / 1000;
  return [Math.trunc(e), Math.round(t % 1000 * Yc)];
}
function Qc() {
  let t = qc.timeOrigin;
  if (typeof t != "number") {
    const e = qc;
    t = e.timing && e.timing.fetchStart;
  }
  return t;
}
function Zc(t) {
  return Array.isArray(t) && t.length === 2 && typeof t[0] == "number" && typeof t[1] == "number";
}
function tu(t) {
  return Zc(t) || typeof t == "number" || t instanceof Date;
}
function eu(t, e) {
  const n = [t[0] + e[0], t[1] + e[1]];
  if (n[1] >= Xc) {
    n[1] -= Xc;
    n[0] += 1;
  }
  return n;
}
var nu;
var ru;
(ru = nu ||= {})[ru.SUCCESS = 0] = "SUCCESS";
ru[ru.FAILED = 1] = "FAILED";
const iu = "[object Null]";
const su = "[object Undefined]";
const ou = Function.prototype.toString;
const au = ou.call(Object);
const cu = Object.getPrototypeOf;
const uu = Object.prototype;
const lu = uu.hasOwnProperty;
const hu = Symbol ? Symbol.toStringTag : undefined;
const du = uu.toString;
function pu(t) {
  if (!function (t) {
    return t != null && typeof t == "object";
  }(t) || function (t) {
    if (t == null) {
      if (t === undefined) {
        return su;
      } else {
        return iu;
      }
    }
    if (hu && hu in Object(t)) {
      return function (t) {
        const e = lu.call(t, hu);
        const n = t[hu];
        let r = false;
        try {
          t[hu] = undefined;
          r = true;
        } catch (s) {}
        const i = du.call(t);
        if (r) {
          if (e) {
            t[hu] = n;
          } else {
            delete t[hu];
          }
        }
        return i;
      }(t);
    } else {
      return function (t) {
        return du.call(t);
      }(t);
    }
  }(t) !== "[object Object]") {
    return false;
  }
  const e = cu(t);
  if (e === null) {
    return true;
  }
  const n = lu.call(e, "constructor") && e.constructor;
  return typeof n == "function" && n instanceof n && ou.call(n) === au;
}
function fu(t) {
  if (_u(t)) {
    return t.slice();
  } else {
    return t;
  }
}
function mu(t, e, n = 0, r) {
  let i;
  if (!(n > 20)) {
    n++;
    if (bu(t) || bu(e) || yu(e)) {
      i = fu(e);
    } else if (_u(t)) {
      i = t.slice();
      if (_u(e)) {
        for (let t = 0, n = e.length; t < n; t++) {
          i.push(fu(e[t]));
        }
      } else if (vu(e)) {
        const t = Object.keys(e);
        for (let n = 0, r = t.length; n < r; n++) {
          const r = t[n];
          i[r] = fu(e[r]);
        }
      }
    } else if (vu(t)) {
      if (vu(e)) {
        if (!function (t, e) {
          if (!pu(t) || !pu(e)) {
            return false;
          }
          return true;
        }(t, e)) {
          return e;
        }
        i = Object.assign({}, t);
        const s = Object.keys(e);
        for (let o = 0, a = s.length; o < a; o++) {
          const a = s[o];
          const c = e[a];
          if (bu(c)) {
            if (c === undefined) {
              delete i[a];
            } else {
              i[a] = c;
            }
          } else {
            const s = i[a];
            const o = c;
            if (gu(t, a, r) || gu(e, a, r)) {
              delete i[a];
            } else {
              if (vu(s) && vu(o)) {
                const n = r.get(s) || [];
                const i = r.get(o) || [];
                n.push({
                  obj: t,
                  key: a
                });
                i.push({
                  obj: e,
                  key: a
                });
                r.set(s, n);
                r.set(o, i);
              }
              i[a] = mu(i[a], c, n, r);
            }
          }
        }
      } else {
        i = e;
      }
    }
    return i;
  }
}
function gu(t, e, n) {
  const r = n.get(t[e]) || [];
  for (let i = 0, s = r.length; i < s; i++) {
    const n = r[i];
    if (n.key === e && n.obj === t) {
      return true;
    }
  }
  return false;
}
function _u(t) {
  return Array.isArray(t);
}
function yu(t) {
  return typeof t == "function";
}
function vu(t) {
  return !bu(t) && !_u(t) && !yu(t) && typeof t == "object";
}
function bu(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || t === undefined || t instanceof Date || t instanceof RegExp || t === null;
}
let wu = class {
  _promise;
  _resolve;
  _reject;
  constructor() {
    this._promise = new Promise((t, e) => {
      this._resolve = t;
      this._reject = e;
    });
  }
  get promise() {
    return this._promise;
  }
  resolve(t) {
    this._resolve(t);
  }
  reject(t) {
    this._reject(t);
  }
};
let Eu = class {
  _callback;
  _that;
  _isCalled = false;
  _deferred = new wu();
  constructor(t, e) {
    this._callback = t;
    this._that = e;
  }
  get isCalled() {
    return this._isCalled;
  }
  get promise() {
    return this._deferred.promise;
  }
  call(...t) {
    if (!this._isCalled) {
      this._isCalled = true;
      try {
        Promise.resolve(this._callback.call(this._that, ...t)).then(t => this._deferred.resolve(t), t => this._deferred.reject(t));
      } catch (e) {
        this._deferred.reject(e);
      }
    }
    return this._deferred.promise;
  }
};
class Su {
  _spanContext;
  kind;
  parentSpanContext;
  attributes = {};
  links = [];
  events = [];
  startTime;
  resource;
  instrumentationScope;
  _droppedAttributesCount = 0;
  _droppedEventsCount = 0;
  _droppedLinksCount = 0;
  name;
  status = {
    code: Ya.UNSET
  };
  endTime = [0, 0];
  _ended = false;
  _duration = [-1, -1];
  _spanProcessor;
  _spanLimits;
  _attributeValueLengthLimit;
  _performanceStartTime;
  _performanceOffset;
  _startTimeProvided;
  constructor(t) {
    const e = Date.now();
    this._spanContext = t.spanContext;
    this._performanceStartTime = qc.now();
    this._performanceOffset = e - (this._performanceStartTime + Qc());
    this._startTimeProvided = t.startTime != null;
    this._spanLimits = t.spanLimits;
    this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
    this._spanProcessor = t.spanProcessor;
    this.name = t.name;
    this.parentSpanContext = t.parentSpanContext;
    this.kind = t.kind;
    this.links = t.links || [];
    this.startTime = this._getTime(t.startTime ?? e);
    this.resource = t.resource;
    this.instrumentationScope = t.scope;
    if (t.attributes != null) {
      this.setAttributes(t.attributes);
    }
    this._spanProcessor.onStart(this, t.context);
  }
  spanContext() {
    return this._spanContext;
  }
  setAttribute(t, e) {
    if (e == null || this._isSpanEnded()) {
      return this;
    }
    if (t.length === 0) {
      nc.warn(`Invalid attribute key: ${t}`);
      return this;
    }
    if (!zc(e)) {
      nc.warn(`Invalid attribute value set for key: ${t}`);
      return this;
    }
    const {
      attributeCountLimit: n
    } = this._spanLimits;
    if (n !== undefined && Object.keys(this.attributes).length >= n && !Object.prototype.hasOwnProperty.call(this.attributes, t)) {
      this._droppedAttributesCount++;
      return this;
    } else {
      this.attributes[t] = this._truncateToSize(e);
      return this;
    }
  }
  setAttributes(t) {
    for (const [e, n] of Object.entries(t)) {
      this.setAttribute(e, n);
    }
    return this;
  }
  addEvent(t, e, n) {
    if (this._isSpanEnded()) {
      return this;
    }
    const {
      eventCountLimit: r
    } = this._spanLimits;
    if (r === 0) {
      nc.warn("No events allowed.");
      this._droppedEventsCount++;
      return this;
    }
    if (r !== undefined && this.events.length >= r) {
      if (this._droppedEventsCount === 0) {
        nc.debug("Dropping extra events.");
      }
      this.events.shift();
      this._droppedEventsCount++;
    }
    if (tu(e)) {
      if (!tu(n)) {
        n = e;
      }
      e = undefined;
    }
    const i = jc(e);
    this.events.push({
      name: t,
      attributes: i,
      time: this._getTime(n),
      droppedAttributesCount: 0
    });
    return this;
  }
  addLink(t) {
    this.links.push(t);
    return this;
  }
  addLinks(t) {
    this.links.push(...t);
    return this;
  }
  setStatus(t) {
    if (!this._isSpanEnded()) {
      this.status = {
        ...t
      };
      if (this.status.message != null && typeof t.message != "string") {
        nc.warn(`Dropping invalid status.message of type '${typeof t.message}', expected 'string'`);
        delete this.status.message;
      }
    }
    return this;
  }
  updateName(t) {
    if (!this._isSpanEnded()) {
      this.name = t;
    }
    return this;
  }
  end(t) {
    if (this._isSpanEnded()) {
      nc.error(`${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`);
    } else {
      this._ended = true;
      this.endTime = this._getTime(t);
      this._duration = function (t, e) {
        let n = e[0] - t[0];
        let r = e[1] - t[1];
        if (r < 0) {
          n -= 1;
          r += Xc;
        }
        return [n, r];
      }(this.startTime, this.endTime);
      if (this._duration[0] < 0) {
        nc.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
        this.endTime = this.startTime.slice();
        this._duration = [0, 0];
      }
      if (this._droppedEventsCount > 0) {
        nc.warn(`Dropped ${this._droppedEventsCount} events because eventCountLimit reached`);
      }
      this._spanProcessor.onEnd(this);
    }
  }
  _getTime(t) {
    if (typeof t == "number" && t <= qc.now()) {
      e = t + this._performanceOffset;
      return eu(Jc(Qc()), Jc(typeof e == "number" ? e : qc.now()));
    }
    var e;
    if (typeof t == "number") {
      return Jc(t);
    }
    if (t instanceof Date) {
      return Jc(t.getTime());
    }
    if (Zc(t)) {
      return t;
    }
    if (this._startTimeProvided) {
      return Jc(Date.now());
    }
    const n = qc.now() - this._performanceStartTime;
    return eu(this.startTime, Jc(n));
  }
  isRecording() {
    return this._ended === false;
  }
  recordException(t, e) {
    const n = {};
    if (typeof t == "string") {
      n[Wc] = t;
    } else if (t) {
      if (t.code) {
        n[Kc] = t.code.toString();
      } else if (t.name) {
        n[Kc] = t.name;
      }
      if (t.message) {
        n[Wc] = t.message;
      }
      if (t.stack) {
        n["exception.stacktrace"] = t.stack;
      }
    }
    if (n[Kc] || n[Wc]) {
      this.addEvent("exception", n, e);
    } else {
      nc.warn(`Failed to record an exception ${t}`);
    }
  }
  get duration() {
    return this._duration;
  }
  get ended() {
    return this._ended;
  }
  get droppedAttributesCount() {
    return this._droppedAttributesCount;
  }
  get droppedEventsCount() {
    return this._droppedEventsCount;
  }
  get droppedLinksCount() {
    return this._droppedLinksCount;
  }
  _isSpanEnded() {
    if (this._ended) {
      const t = new Error(`Operation attempted on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`);
      nc.warn(`Cannot execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`, t);
    }
    return this._ended;
  }
  _truncateToLimitUtil(t, e) {
    if (t.length <= e) {
      return t;
    } else {
      return t.substring(0, e);
    }
  }
  _truncateToSize(t) {
    const e = this._attributeValueLengthLimit;
    if (e <= 0) {
      nc.warn(`Attribute value limit must be positive, got ${e}`);
      return t;
    } else if (typeof t == "string") {
      return this._truncateToLimitUtil(t, e);
    } else if (Array.isArray(t)) {
      return t.map(t => typeof t == "string" ? this._truncateToLimitUtil(t, e) : t);
    } else {
      return t;
    }
  }
}
var Tu;
(function (t) {
  t[t.NOT_RECORD = 0] = "NOT_RECORD";
  t[t.RECORD = 1] = "RECORD";
  t[t.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
})(Tu ||= {});
class xu {
  shouldSample() {
    return {
      decision: Tu.NOT_RECORD
    };
  }
  toString() {
    return "AlwaysOffSampler";
  }
}
class Au {
  shouldSample() {
    return {
      decision: Tu.RECORD_AND_SAMPLED
    };
  }
  toString() {
    return "AlwaysOnSampler";
  }
}
class Ou {
  _root;
  _remoteParentSampled;
  _remoteParentNotSampled;
  _localParentSampled;
  _localParentNotSampled;
  constructor(t) {
    this._root = t.root;
    if (!this._root) {
      Hc(new Error("ParentBasedSampler must have a root sampler configured"));
      this._root = new Au();
    }
    this._remoteParentSampled = t.remoteParentSampled ?? new Au();
    this._remoteParentNotSampled = t.remoteParentNotSampled ?? new xu();
    this._localParentSampled = t.localParentSampled ?? new Au();
    this._localParentNotSampled = t.localParentNotSampled ?? new xu();
  }
  shouldSample(t, e, n, r, i, s) {
    const o = gc.getSpanContext(t);
    if (o && Fa(o)) {
      if (o.isRemote) {
        if (o.traceFlags & va.SAMPLED) {
          return this._remoteParentSampled.shouldSample(t, e, n, r, i, s);
        } else {
          return this._remoteParentNotSampled.shouldSample(t, e, n, r, i, s);
        }
      } else if (o.traceFlags & va.SAMPLED) {
        return this._localParentSampled.shouldSample(t, e, n, r, i, s);
      } else {
        return this._localParentNotSampled.shouldSample(t, e, n, r, i, s);
      }
    } else {
      return this._root.shouldSample(t, e, n, r, i, s);
    }
  }
  toString() {
    return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
  }
}
class Cu {
  _ratio;
  _upperBound;
  constructor(t = 0) {
    this._ratio = t;
    this._ratio = this._normalize(t);
    this._upperBound = Math.floor(this._ratio * 4294967295);
  }
  shouldSample(t, e) {
    return {
      decision: ja(e) && this._accumulate(e) < this._upperBound ? Tu.RECORD_AND_SAMPLED : Tu.NOT_RECORD
    };
  }
  toString() {
    return `TraceIdRatioBased{${this._ratio}}`;
  }
  _normalize(t) {
    if (typeof t != "number" || isNaN(t)) {
      return 0;
    } else if (t >= 1) {
      return 1;
    } else if (t <= 0) {
      return 0;
    } else {
      return t;
    }
  }
  _accumulate(t) {
    let e = 0;
    for (let n = 0; n < t.length / 8; n++) {
      const r = n * 8;
      e = (e ^ parseInt(t.slice(r, r + 8), 16)) >>> 0;
    }
    return e;
  }
}
function Pu() {
  return {
    sampler: ku(),
    forceFlushTimeoutMillis: 30000,
    generalLimits: {
      attributeValueLengthLimit: Infinity,
      attributeCountLimit: 128
    },
    spanLimits: {
      attributeValueLengthLimit: Infinity,
      attributeCountLimit: 128,
      linkCountLimit: 128,
      eventCountLimit: 128,
      attributePerEventCountLimit: 128,
      attributePerLinkCountLimit: 128
    }
  };
}
function ku() {
  const t = "parentbased_always_on";
  switch (t) {
    case "always_on":
      return new Au();
    case "always_off":
      return new xu();
    case "parentbased_always_on":
      return new Ou({
        root: new Au()
      });
    case "parentbased_always_off":
      return new Ou({
        root: new xu()
      });
    case "traceidratio":
      return new Cu(Iu());
    case "parentbased_traceidratio":
      return new Ou({
        root: new Cu(Iu())
      });
    default:
      nc.error(`OTEL_TRACES_SAMPLER value "${t}" invalid, defaulting to "parentbased_always_on".`);
      return new Ou({
        root: new Au()
      });
  }
}
function Iu() {
  nc.error("OTEL_TRACES_SAMPLER_ARG is blank, defaulting to 1.");
  return 1;
}
const Ru = Infinity;
class Lu {
  _exporter;
  _maxExportBatchSize;
  _maxQueueSize;
  _scheduledDelayMillis;
  _exportTimeoutMillis;
  _isExporting = false;
  _finishedSpans = [];
  _timer;
  _shutdownOnce;
  _droppedSpansCount = 0;
  constructor(t, e) {
    this._exporter = t;
    this._maxExportBatchSize = typeof e?.maxExportBatchSize == "number" ? e.maxExportBatchSize : 512;
    this._maxQueueSize = typeof e?.maxQueueSize == "number" ? e.maxQueueSize : 2048;
    this._scheduledDelayMillis = typeof e?.scheduledDelayMillis == "number" ? e.scheduledDelayMillis : 5000;
    this._exportTimeoutMillis = typeof e?.exportTimeoutMillis == "number" ? e.exportTimeoutMillis : 30000;
    this._shutdownOnce = new Eu(this._shutdown, this);
    if (this._maxExportBatchSize > this._maxQueueSize) {
      nc.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
      this._maxExportBatchSize = this._maxQueueSize;
    }
  }
  forceFlush() {
    if (this._shutdownOnce.isCalled) {
      return this._shutdownOnce.promise;
    } else {
      return this._flushAll();
    }
  }
  onStart(t, e) {}
  onEnd(t) {
    if (!this._shutdownOnce.isCalled) {
      if ((t.spanContext().traceFlags & va.SAMPLED) !== 0) {
        this._addToBuffer(t);
      }
    }
  }
  shutdown() {
    return this._shutdownOnce.call();
  }
  _shutdown() {
    return Promise.resolve().then(() => this.onShutdown()).then(() => this._flushAll()).then(() => this._exporter.shutdown());
  }
  _addToBuffer(t) {
    if (this._finishedSpans.length >= this._maxQueueSize) {
      if (this._droppedSpansCount === 0) {
        nc.debug("maxQueueSize reached, dropping spans");
      }
      this._droppedSpansCount++;
      return;
    }
    if (this._droppedSpansCount > 0) {
      nc.warn(`Dropped ${this._droppedSpansCount} spans because maxQueueSize reached`);
      this._droppedSpansCount = 0;
    }
    this._finishedSpans.push(t);
    this._maybeStartTimer();
  }
  _flushAll() {
    return new Promise((t, e) => {
      const n = [];
      for (let r = 0, i = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize); r < i; r++) {
        n.push(this._flushOneBatch());
      }
      Promise.all(n).then(() => {
        t();
      }).catch(e);
    });
  }
  _flushOneBatch() {
    this._clearTimer();
    if (this._finishedSpans.length === 0) {
      return Promise.resolve();
    } else {
      return new Promise((t, e) => {
        const n = setTimeout(() => {
          e(new Error("Timeout"));
        }, this._exportTimeoutMillis);
        ec.with(ec.active().setValue($c, true), () => {
          let r;
          if (this._finishedSpans.length <= this._maxExportBatchSize) {
            r = this._finishedSpans;
            this._finishedSpans = [];
          } else {
            r = this._finishedSpans.splice(0, this._maxExportBatchSize);
          }
          const i = () => this._exporter.export(r, r => {
            clearTimeout(n);
            if (r.code === nu.SUCCESS) {
              t();
            } else {
              e(r.error ?? new Error("BatchSpanProcessor: span export failed"));
            }
          });
          let s = null;
          for (let t = 0, e = r.length; t < e; t++) {
            const e = r[t];
            if (e.resource.asyncAttributesPending && e.resource.waitForAsyncAttributes) {
              s ??= [];
              s.push(e.resource.waitForAsyncAttributes());
            }
          }
          if (s === null) {
            i();
          } else {
            Promise.all(s).then(i, t => {
              Hc(t);
              e(t);
            });
          }
        });
      });
    }
  }
  _maybeStartTimer() {
    if (this._isExporting) {
      return;
    }
    const t = () => {
      this._isExporting = true;
      this._flushOneBatch().finally(() => {
        this._isExporting = false;
        if (this._finishedSpans.length > 0) {
          this._clearTimer();
          this._maybeStartTimer();
        }
      }).catch(t => {
        this._isExporting = false;
        Hc(t);
      });
    };
    if (this._finishedSpans.length >= this._maxExportBatchSize) {
      return t();
    }
    if (this._timer === undefined) {
      this._timer = setTimeout(() => t(), this._scheduledDelayMillis);
      this._timer;
    }
  }
  _clearTimer() {
    if (this._timer !== undefined) {
      clearTimeout(this._timer);
      this._timer = undefined;
    }
  }
}
class Mu extends Lu {
  _visibilityChangeListener;
  _pageHideListener;
  constructor(t, e) {
    super(t, e);
    this.onInit(e);
  }
  onInit(t) {
    if (t?.disableAutoFlushOnDocumentHide !== true && typeof document != "undefined") {
      this._visibilityChangeListener = () => {
        if (document.visibilityState === "hidden") {
          this.forceFlush().catch(t => {
            Hc(t);
          });
        }
      };
      this._pageHideListener = () => {
        this.forceFlush().catch(t => {
          Hc(t);
        });
      };
      document.addEventListener("visibilitychange", this._visibilityChangeListener);
      document.addEventListener("pagehide", this._pageHideListener);
    }
  }
  onShutdown() {
    if (typeof document != "undefined") {
      if (this._visibilityChangeListener) {
        document.removeEventListener("visibilitychange", this._visibilityChangeListener);
      }
      if (this._pageHideListener) {
        document.removeEventListener("pagehide", this._pageHideListener);
      }
    }
  }
}
class Nu {
  generateTraceId = Uu(16);
  generateSpanId = Uu(8);
}
const Du = Array(32);
function Uu(t) {
  return function () {
    for (let e = 0; e < t * 2; e++) {
      Du[e] = Math.floor(Math.random() * 16) + 48;
      if (Du[e] >= 58) {
        Du[e] += 39;
      }
    }
    return String.fromCharCode.apply(null, Du.slice(0, t * 2));
  };
}
class Bu {
  _sampler;
  _generalLimits;
  _spanLimits;
  _idGenerator;
  instrumentationScope;
  _resource;
  _spanProcessor;
  constructor(t, e, n, r) {
    const i = function (t) {
      const e = {
        sampler: ku()
      };
      const n = Pu();
      const r = Object.assign({}, n, e, t);
      r.generalLimits = Object.assign({}, n.generalLimits, t.generalLimits || {});
      r.spanLimits = Object.assign({}, n.spanLimits, t.spanLimits || {});
      return r;
    }(e);
    this._sampler = i.sampler;
    this._generalLimits = i.generalLimits;
    this._spanLimits = i.spanLimits;
    this._idGenerator = e.idGenerator || new Nu();
    this._resource = n;
    this._spanProcessor = r;
    this.instrumentationScope = t;
  }
  startSpan(t, e = {}, n = ec.active()) {
    if (e.root) {
      n = gc.deleteSpan(n);
    }
    const r = gc.getSpan(n);
    if (n.getValue($c) === true) {
      nc.debug("Instrumentation suppressed, returning Noop Span");
      return gc.wrapSpanContext(Pa);
    }
    const i = r?.spanContext();
    const s = this._idGenerator.generateSpanId();
    let o;
    let a;
    let c;
    if (i && gc.isSpanContextValid(i)) {
      a = i.traceId;
      c = i.traceState;
      o = i;
    } else {
      a = this._idGenerator.generateTraceId();
    }
    const u = e.kind ?? Wa.INTERNAL;
    const l = (e.links ?? []).map(t => ({
      context: t.context,
      attributes: jc(t.attributes)
    }));
    const h = jc(e.attributes);
    const d = this._sampler.shouldSample(n, a, t, u, h, l);
    c = d.traceState ?? c;
    const p = {
      traceId: a,
      spanId: s,
      traceFlags: d.decision === Ha.RECORD_AND_SAMPLED ? va.SAMPLED : va.NONE,
      traceState: c
    };
    if (d.decision === Ha.NOT_RECORD) {
      nc.debug("Recording is off, propagating context in a non-recording span");
      return gc.wrapSpanContext(p);
    }
    const f = jc(Object.assign(h, d.attributes));
    return new Su({
      resource: this._resource,
      scope: this.instrumentationScope,
      context: n,
      spanContext: p,
      name: t,
      kind: u,
      links: l,
      parentSpanContext: o,
      attributes: f,
      startTime: e.startTime,
      spanProcessor: this._spanProcessor,
      spanLimits: this._spanLimits
    });
  }
  startActiveSpan(t, e, n, r) {
    let i;
    let s;
    let o;
    if (arguments.length < 2) {
      return;
    }
    if (arguments.length === 2) {
      o = e;
    } else if (arguments.length === 3) {
      i = e;
      o = n;
    } else {
      i = e;
      s = n;
      o = r;
    }
    const a = s ?? ec.active();
    const c = this.startSpan(t, i, a);
    const u = gc.setSpan(a, c);
    return ec.with(u, o, undefined, c);
  }
  getGeneralLimits() {
    return this._generalLimits;
  }
  getSpanLimits() {
    return this._spanLimits;
  }
}
class $u {
  _spanProcessors;
  constructor(t) {
    this._spanProcessors = t;
  }
  forceFlush() {
    const t = [];
    for (const e of this._spanProcessors) {
      t.push(e.forceFlush());
    }
    return new Promise(e => {
      Promise.all(t).then(() => {
        e();
      }).catch(t => {
        Hc(t || new Error("MultiSpanProcessor: forceFlush failed"));
        e();
      });
    });
  }
  onStart(t, e) {
    for (const n of this._spanProcessors) {
      n.onStart(t, e);
    }
  }
  onEnd(t) {
    for (const e of this._spanProcessors) {
      e.onEnd(t);
    }
  }
  shutdown() {
    const t = [];
    for (const e of this._spanProcessors) {
      t.push(e.shutdown());
    }
    return new Promise((e, n) => {
      Promise.all(t).then(() => {
        e();
      }, n);
    });
  }
}
var ju;
var Fu;
(Fu = ju ||= {})[Fu.resolved = 0] = "resolved";
Fu[Fu.timeout = 1] = "timeout";
Fu[Fu.error = 2] = "error";
Fu[Fu.unresolved = 3] = "unresolved";
class zu {
  _config;
  _tracers = new Map();
  _resource;
  _activeSpanProcessor;
  constructor(t = {}) {
    const e = function (...t) {
      let e = t.shift();
      const n = new WeakMap();
      while (t.length > 0) {
        e = mu(e, t.shift(), 0, n);
      }
      return e;
    }({}, Pu(), function (t) {
      const e = Object.assign({}, t.spanLimits);
      e.attributeCountLimit = t.spanLimits?.attributeCountLimit ?? t.generalLimits?.attributeCountLimit ?? undefined ?? undefined ?? 128;
      e.attributeValueLengthLimit = t.spanLimits?.attributeValueLengthLimit ?? t.generalLimits?.attributeValueLengthLimit ?? undefined ?? undefined ?? Ru;
      return Object.assign({}, t, {
        spanLimits: e
      });
    }(t));
    this._resource = e.resource ?? Dc();
    this._config = Object.assign({}, e, {
      resource: this._resource
    });
    const n = [];
    if (t.spanProcessors?.length) {
      n.push(...t.spanProcessors);
    }
    this._activeSpanProcessor = new $u(n);
  }
  getTracer(t, e, n) {
    const r = `${t}@${e || ""}:${n?.schemaUrl || ""}`;
    if (!this._tracers.has(r)) {
      this._tracers.set(r, new Bu({
        name: t,
        version: e,
        schemaUrl: n?.schemaUrl
      }, this._config, this._resource, this._activeSpanProcessor));
    }
    return this._tracers.get(r);
  }
  forceFlush() {
    const t = this._config.forceFlushTimeoutMillis;
    const e = this._activeSpanProcessor._spanProcessors.map(e => new Promise(n => {
      let r;
      const i = setTimeout(() => {
        n(new Error(`Span processor did not completed within timeout period of ${t} ms`));
        r = ju.timeout;
      }, t);
      e.forceFlush().then(() => {
        clearTimeout(i);
        if (r !== ju.timeout) {
          r = ju.resolved;
          n(r);
        }
      }).catch(t => {
        clearTimeout(i);
        r = ju.error;
        n(t);
      });
    }));
    return new Promise((t, n) => {
      Promise.all(e).then(e => {
        const r = e.filter(t => t !== ju.resolved);
        if (r.length > 0) {
          n(r);
        } else {
          t();
        }
      }).catch(t => n([t]));
    });
  }
  shutdown() {
    return this._activeSpanProcessor.shutdown();
  }
}
class Gu {
  _enabled = false;
  _currentContext = Jo;
  _bindFunction(t = Jo, e) {
    const n = this;
    const r = function (...r) {
      return n.with(t, () => e.apply(this, r));
    };
    Object.defineProperty(r, "length", {
      enumerable: false,
      configurable: true,
      writable: false,
      value: e.length
    });
    return r;
  }
  active() {
    return this._currentContext;
  }
  bind(t = this.active(), e) {
    if (typeof e == "function") {
      return this._bindFunction(t, e);
    } else {
      return e;
    }
  }
  disable() {
    this._currentContext = Jo;
    this._enabled = false;
    return this;
  }
  enable() {
    if (!this._enabled) {
      this._enabled = true;
      this._currentContext = Jo;
    }
    return this;
  }
  with(t, e, n, ...r) {
    const i = this._currentContext;
    this._currentContext = t || Jo;
    try {
      return e.call(n, ...r);
    } finally {
      this._currentContext = i;
    }
  }
}
const Vu = Ko("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function Hu(t) {
  return t.getValue(Vu) === true;
}
const qu = "baggage";
function Wu(t) {
  const e = t.split(";");
  if (e.length <= 0) {
    return;
  }
  const n = e.shift();
  if (!n) {
    return;
  }
  const r = n.indexOf("=");
  if (r <= 0) {
    return;
  }
  const i = decodeURIComponent(n.substring(0, r).trim());
  const s = decodeURIComponent(n.substring(r + 1).trim());
  let o;
  var a;
  if (e.length > 0) {
    if (typeof (a = e.join(";")) != "string") {
      qo.error("Cannot create baggage metadata from unknown type: " + typeof a);
      a = "";
    }
    o = {
      __TYPE__: Ho,
      toString: function () {
        return a;
      }
    };
  }
  return {
    key: i,
    value: s,
    metadata: o
  };
}
class Ku {
  inject(t, e, n) {
    const r = fc.getBaggage(t);
    if (!r || Hu(t)) {
      return;
    }
    const i = function (t) {
      return t.getAllEntries().map(([t, e]) => {
        let n = `${encodeURIComponent(t)}=${encodeURIComponent(e.value)}`;
        if (e.metadata !== undefined) {
          n += ";" + e.metadata.toString();
        }
        return n;
      });
    }(r).filter(t => t.length <= 4096).slice(0, 180);
    const s = function (t) {
      return t.reduce((t, e) => {
        const n = `${t}${t !== "" ? "," : ""}${e}`;
        if (n.length > 8192) {
          return t;
        } else {
          return n;
        }
      }, "");
    }(i);
    if (s.length > 0) {
      n.set(e, qu, s);
    }
  }
  extract(t, e, n) {
    const r = n.get(e, qu);
    const i = Array.isArray(r) ? r.join(",") : r;
    if (!i) {
      return t;
    }
    const s = {};
    if (i.length === 0) {
      return t;
    }
    i.split(",").forEach(t => {
      const e = Wu(t);
      if (e) {
        const t = {
          value: e.value
        };
        if (e.metadata) {
          t.metadata = e.metadata;
        }
        s[e.key] = t;
      }
    });
    if (Object.entries(s).length === 0) {
      return t;
    } else {
      return fc.setBaggage(t, fc.createBaggage(s));
    }
  }
  fields() {
    return [qu];
  }
}
class Yu {
  _propagators;
  _fields;
  constructor(t = {}) {
    this._propagators = t.propagators ?? [];
    this._fields = Array.from(new Set(this._propagators.map(t => typeof t.fields == "function" ? t.fields() : []).reduce((t, e) => t.concat(e), [])));
  }
  inject(t, e, n) {
    for (const i of this._propagators) {
      try {
        i.inject(t, e, n);
      } catch (r) {
        nc.warn(`Failed to inject with ${i.constructor.name}. Err: ${r.message}`);
      }
    }
  }
  extract(t, e, n) {
    return this._propagators.reduce((t, r) => {
      try {
        return r.extract(t, e, n);
      } catch (i) {
        nc.warn(`Failed to extract with ${r.constructor.name}. Err: ${i.message}`);
      }
      return t;
    }, t);
  }
  fields() {
    return this._fields.slice();
  }
}
const Xu = "[_0-9a-z-*/]";
const Ju = new RegExp(`^(?:${`[a-z]${Xu}{0,255}`}|${`[a-z0-9]${Xu}{0,240}@[a-z]${Xu}{0,13}`})$`);
const Qu = /^[ -~]{0,255}[!-~]$/;
const Zu = /,|=/;
class tl {
  _internalState = new Map();
  constructor(t) {
    if (t) {
      this._parse(t);
    }
  }
  set(t, e) {
    const n = this._clone();
    if (n._internalState.has(t)) {
      n._internalState.delete(t);
    }
    n._internalState.set(t, e);
    return n;
  }
  unset(t) {
    const e = this._clone();
    e._internalState.delete(t);
    return e;
  }
  get(t) {
    return this._internalState.get(t);
  }
  serialize() {
    return this._keys().reduce((t, e) => {
      t.push(e + "=" + this.get(e));
      return t;
    }, []).join(",");
  }
  _parse(t) {
    if (!(t.length > 512)) {
      this._internalState = t.split(",").reverse().reduce((t, e) => {
        const n = e.trim();
        const r = n.indexOf("=");
        if (r !== -1) {
          const i = n.slice(0, r);
          const s = n.slice(r + 1, e.length);
          if (function (t) {
            return Ju.test(t);
          }(i) && function (t) {
            return Qu.test(t) && !Zu.test(t);
          }(s)) {
            t.set(i, s);
          }
        }
        return t;
      }, new Map());
      if (this._internalState.size > 32) {
        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32));
      }
    }
  }
  _keys() {
    return Array.from(this._internalState.keys()).reverse();
  }
  _clone() {
    const t = new tl();
    t._internalState = new Map(this._internalState);
    return t;
  }
}
const el = "traceparent";
const nl = "tracestate";
const rl = new RegExp("^\\s?((?!ff)[\\da-f]{2})-((?![0]{32})[\\da-f]{32})-((?![0]{16})[\\da-f]{16})-([\\da-f]{2})(-.*)?\\s?$");
class il {
  inject(t, e, n) {
    const r = gc.getSpanContext(t);
    if (!r || Hu(t) || !Fa(r)) {
      return;
    }
    const i = `00-${r.traceId}-${r.spanId}-0${Number(r.traceFlags || va.NONE).toString(16)}`;
    n.set(e, el, i);
    if (r.traceState) {
      n.set(e, nl, r.traceState.serialize());
    }
  }
  extract(t, e, n) {
    const r = n.get(e, el);
    if (!r) {
      return t;
    }
    const i = Array.isArray(r) ? r[0] : r;
    if (typeof i != "string") {
      return t;
    }
    const s = function (t) {
      const e = rl.exec(t);
      if (e) {
        if (e[1] === "00" && e[5]) {
          return null;
        } else {
          return {
            traceId: e[2],
            spanId: e[3],
            traceFlags: parseInt(e[4], 16)
          };
        }
      } else {
        return null;
      }
    }(i);
    if (!s) {
      return t;
    }
    s.isRemote = true;
    const o = n.get(e, nl);
    if (o) {
      const t = Array.isArray(o) ? o.join(",") : o;
      s.traceState = new tl(typeof t == "string" ? t : undefined);
    }
    return gc.setSpanContext(t, s);
  }
  fields() {
    return [el, nl];
  }
}
class sl extends zu {
  constructor(t = {}) {
    super(t);
  }
  register(t = {}) {
    var e;
    gc.setGlobalTracerProvider(this);
    if ((e = t.propagator) !== null) {
      if (e !== undefined) {
        fc.setGlobalPropagator(e);
      } else {
        fc.setGlobalPropagator(new Yu({
          propagators: [new il(), new Ku()]
        }));
      }
    }
    (function (t) {
      if (t !== null) {
        if (t === undefined) {
          const t = new Gu();
          t.enable();
          ec.setGlobalContextManager(t);
          return;
        }
        t.enable();
        ec.setGlobalContextManager(t);
      }
    })(t.contextManager);
  }
}
const ol = "exception.message";
const al = "exception.stacktrace";
const cl = "exception.type";
const ul = "service.name";
const ll = "service.version";
const hl = "user_agent.original";
const dl = "browser.platform";
const pl = "browser.brands";
const fl = "browser.mobile";
const ml = "browser.language";
const gl = "browser.user_agent";
const _l = new class {
  detect(t) {
    if (typeof navigator == "undefined") {
      return Nc();
    }
    const e = function () {
      const t = {};
      const e = navigator.userAgentData;
      if (e) {
        t[dl] = e.platform;
        t[pl] = e.brands.map(t => `${t.brand} ${t.version}`);
        t[fl] = e.mobile;
      } else {
        t[gl] = navigator.userAgent;
      }
      t[ml] = navigator.language;
      return t;
    }();
    return this._getResourceAttributes(e, t);
  }
  _getResourceAttributes(t, e) {
    if (t[gl] || t[dl]) {
      return {
        attributes: t
      };
    } else {
      nc.debug("BrowserDetector failed: Unable to find required browser resources. ");
      return Nc();
    }
  }
}();
const yl = Ko("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function vl(t) {
  return t == null || (Array.isArray(t) ? function (t) {
    let e;
    for (const n of t) {
      if (n != null) {
        if (!e) {
          if (bl(n)) {
            e = typeof n;
            continue;
          }
          return false;
        }
        if (typeof n !== e) {
          return false;
        }
      }
    }
    return true;
  }(t) : bl(t));
}
function bl(t) {
  switch (typeof t) {
    case "number":
    case "boolean":
    case "string":
      return true;
  }
  return false;
}
let wl = t => {
  nc.error(function (t) {
    if (typeof t == "string") {
      return t;
    } else {
      return JSON.stringify(function (t) {
        const e = {};
        let n = t;
        while (n !== null) {
          Object.getOwnPropertyNames(n).forEach(t => {
            if (e[t]) {
              return;
            }
            const r = n[t];
            if (r) {
              e[t] = String(r);
            }
          });
          n = Object.getPrototypeOf(n);
        }
        return e;
      }(t));
    }
  }(t));
};
function El(t) {
  try {
    wl(t);
  } catch {}
}
const Sl = performance;
const Tl = Math.pow(10, 6);
const xl = Math.pow(10, 9);
function Al(t) {
  const e = t / 1000;
  return [Math.trunc(e), Math.round(t % 1000 * Tl)];
}
function Ol() {
  let t = Sl.timeOrigin;
  if (typeof t != "number") {
    const e = Sl;
    t = e.timing && e.timing.fetchStart;
  }
  return t;
}
function Cl(t) {
  return function (t, e) {
    const n = [t[0] + e[0], t[1] + e[1]];
    if (n[1] >= xl) {
      n[1] -= xl;
      n[0] += 1;
    }
    return n;
  }(Al(Ol()), Al(typeof t == "number" ? t : Sl.now()));
}
function Pl(t) {
  e = t;
  if (Array.isArray(e) && e.length === 2 && typeof e[0] == "number" && typeof e[1] == "number") {
    return t;
  }
  if (typeof t == "number") {
    if (t < Ol()) {
      return Cl(t);
    } else {
      return Al(t);
    }
  }
  if (t instanceof Date) {
    return Al(t.getTime());
  }
  throw TypeError("Invalid input type");
  var e;
}
function kl(t) {
  return t[0] * 1000000 + t[1] / 1000;
}
var Il;
(function (t) {
  t[t.SUCCESS = 0] = "SUCCESS";
  t[t.FAILED = 1] = "FAILED";
})(Il ||= {});
const Rl = "[object Null]";
const Ll = "[object Undefined]";
const Ml = Function.prototype.toString;
const Nl = Ml.call(Object);
const Dl = Object.getPrototypeOf;
const Ul = Object.prototype;
const Bl = Ul.hasOwnProperty;
const $l = Symbol ? Symbol.toStringTag : undefined;
const jl = Ul.toString;
function Fl(t) {
  if (!function (t) {
    return t != null && typeof t == "object";
  }(t) || function (t) {
    if (t == null) {
      if (t === undefined) {
        return Ll;
      } else {
        return Rl;
      }
    }
    if ($l && $l in Object(t)) {
      return function (t) {
        const e = Bl.call(t, $l);
        const n = t[$l];
        let r = false;
        try {
          t[$l] = undefined;
          r = true;
        } catch (s) {}
        const i = jl.call(t);
        if (r) {
          if (e) {
            t[$l] = n;
          } else {
            delete t[$l];
          }
        }
        return i;
      }(t);
    } else {
      return function (t) {
        return jl.call(t);
      }(t);
    }
  }(t) !== "[object Object]") {
    return false;
  }
  const e = Dl(t);
  if (e === null) {
    return true;
  }
  const n = Bl.call(e, "constructor") && e.constructor;
  return typeof n == "function" && n instanceof n && Ml.call(n) === Nl;
}
function zl(t) {
  if (Hl(t)) {
    return t.slice();
  } else {
    return t;
  }
}
function Gl(t, e, n = 0, r) {
  let i;
  if (!(n > 20)) {
    n++;
    if (Kl(t) || Kl(e) || ql(e)) {
      i = zl(e);
    } else if (Hl(t)) {
      i = t.slice();
      if (Hl(e)) {
        for (let t = 0, n = e.length; t < n; t++) {
          i.push(zl(e[t]));
        }
      } else if (Wl(e)) {
        const t = Object.keys(e);
        for (let n = 0, r = t.length; n < r; n++) {
          const r = t[n];
          i[r] = zl(e[r]);
        }
      }
    } else if (Wl(t)) {
      if (Wl(e)) {
        if (!function (t, e) {
          if (!Fl(t) || !Fl(e)) {
            return false;
          }
          return true;
        }(t, e)) {
          return e;
        }
        i = Object.assign({}, t);
        const s = Object.keys(e);
        for (let o = 0, a = s.length; o < a; o++) {
          const a = s[o];
          const c = e[a];
          if (Kl(c)) {
            if (c === undefined) {
              delete i[a];
            } else {
              i[a] = c;
            }
          } else {
            const s = i[a];
            const o = c;
            if (Vl(t, a, r) || Vl(e, a, r)) {
              delete i[a];
            } else {
              if (Wl(s) && Wl(o)) {
                const n = r.get(s) || [];
                const i = r.get(o) || [];
                n.push({
                  obj: t,
                  key: a
                });
                i.push({
                  obj: e,
                  key: a
                });
                r.set(s, n);
                r.set(o, i);
              }
              i[a] = Gl(i[a], c, n, r);
            }
          }
        }
      } else {
        i = e;
      }
    }
    return i;
  }
}
function Vl(t, e, n) {
  const r = n.get(t[e]) || [];
  for (let i = 0, s = r.length; i < s; i++) {
    const n = r[i];
    if (n.key === e && n.obj === t) {
      return true;
    }
  }
  return false;
}
function Hl(t) {
  return Array.isArray(t);
}
function ql(t) {
  return typeof t == "function";
}
function Wl(t) {
  return !Kl(t) && !Hl(t) && !ql(t) && typeof t == "object";
}
function Kl(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || t === undefined || t instanceof Date || t instanceof RegExp || t === null;
}
let Yl = class t extends Error {
  constructor(e) {
    super(e);
    Object.setPrototypeOf(this, t.prototype);
  }
};
class Xl {
  _promise;
  _resolve;
  _reject;
  constructor() {
    this._promise = new Promise((t, e) => {
      this._resolve = t;
      this._reject = e;
    });
  }
  get promise() {
    return this._promise;
  }
  resolve(t) {
    this._resolve(t);
  }
  reject(t) {
    this._reject(t);
  }
}
class Jl {
  _callback;
  _that;
  _isCalled = false;
  _deferred = new Xl();
  constructor(t, e) {
    this._callback = t;
    this._that = e;
  }
  get isCalled() {
    return this._isCalled;
  }
  get promise() {
    return this._deferred.promise;
  }
  call(...t) {
    if (!this._isCalled) {
      this._isCalled = true;
      try {
        Promise.resolve(this._callback.call(this._that, ...t)).then(t => this._deferred.resolve(t), t => this._deferred.reject(t));
      } catch (e) {
        this._deferred.reject(e);
      }
    }
    return this._deferred.promise;
  }
}
const Ql = {
  _export: function (t, e) {
    return new Promise(n => {
      ec.with(ec.active().setValue(yl, true), () => {
        t.export(e, t => {
          n(t);
        });
      });
    });
  }
};
const Zl = "1.1.0";
var th;
var eh;
var nh;
var rh = function () {
  if (eh) {
    return th;
  }
  function t(t) {
    return typeof t == "function";
  }
  eh = 1;
  var e = function () {}.bind();
  function n(t, e, n) {
    var r = !!t[e] && t.propertyIsEnumerable(e);
    Object.defineProperty(t, e, {
      configurable: true,
      enumerable: r,
      writable: true,
      value: n
    });
  }
  function r(n) {
    if (n && n.logger) {
      if (t(n.logger)) {
        e = n.logger;
      } else {
        e("new logger isn't a function, not replacing");
      }
    }
  }
  function i(r, i, s) {
    if (r && r[i]) {
      if (!s) {
        e("no wrapper function");
        e(new Error().stack);
        return;
      }
      if (t(r[i]) && t(s)) {
        var o = r[i];
        var a = s(o, i);
        n(a, "__original", o);
        n(a, "__unwrap", function () {
          if (r[i] === a) {
            n(r, i, o);
          }
        });
        n(a, "__wrapped", true);
        n(r, i, a);
        return a;
      }
      e("original object and wrapper must be functions");
    } else {
      e("no original function " + i + " to wrap");
    }
  }
  function s(t, n) {
    if (t && t[n]) {
      if (t[n].__unwrap) {
        return t[n].__unwrap();
      } else {
        e("no original to unwrap to -- has " + n + " already been unwrapped?");
        return;
      }
    } else {
      e("no function to unwrap.");
      e(new Error().stack);
      return;
    }
  }
  r.wrap = i;
  r.massWrap = function (t, n, r) {
    if (!t) {
      e("must provide one or more modules to patch");
      e(new Error().stack);
      return;
    }
    if (!Array.isArray(t)) {
      t = [t];
    }
    if (n && Array.isArray(n)) {
      t.forEach(function (t) {
        n.forEach(function (e) {
          i(t, e, r);
        });
      });
    } else {
      e("must provide one or more functions to wrap on modules");
    }
  };
  r.unwrap = s;
  r.massUnwrap = function (t, n) {
    if (!t) {
      e("must provide one or more modules to patch");
      e(new Error().stack);
      return;
    }
    if (!Array.isArray(t)) {
      t = [t];
    }
    if (n && Array.isArray(n)) {
      t.forEach(function (t) {
        n.forEach(function (e) {
          s(t, e);
        });
      });
    } else {
      e("must provide one or more functions to unwrap on modules");
    }
  };
  return th = r;
}();
var ih = {
  exports: {}
};
var sh;
var oh;
if (!nh) {
  nh = 1;
  sh = ih;
  (function (t) {
    if (t) {
      var e = {};
      var n = t.TraceKit;
      var r = [].slice;
      var i = "?";
      var s = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
      e.noConflict = function () {
        t.TraceKit = n;
        return e;
      };
      e.wrap = function (t) {
        return function () {
          try {
            return t.apply(this, arguments);
          } catch (n) {
            e.report(n);
            throw n;
          }
        };
      };
      e.report = function () {
        var n;
        var r;
        var i;
        var a;
        var c = [];
        var u = null;
        var l = null;
        function h(t, n, r) {
          var i = null;
          if (!n || e.collectWindowErrors) {
            for (var s in c) {
              if (o(c, s)) {
                try {
                  c[s](t, n, r);
                } catch (a) {
                  i = a;
                }
              }
            }
            if (i) {
              throw i;
            }
          }
        }
        function d(t, r, i, o, a) {
          if (l) {
            e.computeStackTrace.augmentStackTraceWithInitialElement(l, r, i, t);
            f();
          } else if (a) {
            h(e.computeStackTrace(a), true, a);
          } else {
            var c;
            var u = {
              url: r,
              line: i,
              column: o
            };
            var d = t;
            if ({}.toString.call(t) === "[object String]") {
              var p = t.match(s);
              if (p) {
                c = p[1];
                d = p[2];
              }
            }
            u.func = e.computeStackTrace.guessFunctionName(u.url, u.line);
            u.context = e.computeStackTrace.gatherContext(u.url, u.line);
            h({
              name: c,
              message: d,
              mode: "onerror",
              stack: [u]
            }, true, null);
          }
          return !!n && n.apply(this, arguments);
        }
        function p(t) {
          h(e.computeStackTrace(t.reason), true, t.reason);
        }
        function f() {
          var t = l;
          var e = u;
          l = null;
          u = null;
          h(t, false, e);
        }
        function m(t) {
          if (l) {
            if (u === t) {
              return;
            }
            f();
          }
          var n = e.computeStackTrace(t);
          l = n;
          u = t;
          setTimeout(function () {
            if (u === t) {
              f();
            }
          }, n.incomplete ? 2000 : 0);
          throw t;
        }
        m.subscribe = function (e) {
          if (r !== true) {
            n = t.onerror;
            t.onerror = d;
            r = true;
          }
          if (a !== true) {
            i = t.onunhandledrejection;
            t.onunhandledrejection = p;
            a = true;
          }
          c.push(e);
        };
        m.unsubscribe = function (e) {
          for (var s = c.length - 1; s >= 0; --s) {
            if (c[s] === e) {
              c.splice(s, 1);
            }
          }
          if (c.length === 0) {
            if (r) {
              t.onerror = n;
              r = false;
            }
            if (a) {
              t.onunhandledrejection = i;
              a = false;
            }
          }
        };
        return m;
      }();
      e.computeStackTrace = function () {
        var n = {};
        function r(r) {
          if (typeof r != "string") {
            return [];
          }
          if (!o(n, r)) {
            var i = "";
            var s = "";
            try {
              s = t.document.domain;
            } catch (c) {}
            var a = /(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(r);
            if (a && a[2] === s) {
              i = function (n) {
                if (!e.remoteFetching) {
                  return "";
                }
                try {
                  var r = function () {
                    try {
                      return new t.XMLHttpRequest();
                    } catch (c) {
                      return new t.ActiveXObject("Microsoft.XMLHTTP");
                    }
                  }();
                  r.open("GET", n, false);
                  r.send("");
                  return r.responseText;
                } catch (c) {
                  return "";
                }
              }(r);
            }
            n[r] = i ? i.split("\n") : [];
          }
          return n[r];
        }
        function s(t, e) {
          var n;
          var s = /function ([^(]*)\(([^)]*)\)/;
          var o = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/;
          var c = "";
          var u = r(t);
          if (!u.length) {
            return i;
          }
          for (var l = 0; l < 10; ++l) {
            if (!a(c = u[e - l] + c)) {
              if (n = o.exec(c)) {
                return n[1];
              }
              if (n = s.exec(c)) {
                return n[1];
              }
            }
          }
          return i;
        }
        function c(t, n) {
          var i = r(t);
          if (!i.length) {
            return null;
          }
          var s = [];
          var o = Math.floor(e.linesOfContext / 2);
          var c = o + e.linesOfContext % 2;
          var u = Math.max(0, n - o - 1);
          var l = Math.min(i.length, n + c - 1);
          n -= 1;
          for (var h = u; h < l; ++h) {
            if (!a(i[h])) {
              s.push(i[h]);
            }
          }
          if (s.length > 0) {
            return s;
          } else {
            return null;
          }
        }
        function u(t) {
          return t.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&");
        }
        function l(t) {
          return u(t).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace("\"", "(?:\"|&quot;)").replace(/\s+/g, "\\s+");
        }
        function h(t, e) {
          var n;
          var i;
          for (var s = 0, o = e.length; s < o; ++s) {
            if ((n = r(e[s])).length && (n = n.join("\n"), i = t.exec(n))) {
              return {
                url: e[s],
                line: n.substring(0, i.index).split("\n").length,
                column: i.index - n.lastIndexOf("\n", i.index) - 1
              };
            }
          }
          return null;
        }
        function d(t, e, n) {
          var i;
          var s = r(e);
          var o = new RegExp("\\b" + u(t) + "\\b");
          n -= 1;
          if (s && s.length > n && (i = o.exec(s[n]))) {
            return i.index;
          } else {
            return null;
          }
        }
        function p(e) {
          if (!a(t && t.document)) {
            var n;
            var r;
            var i;
            var s;
            var o = [t.location.href];
            for (var c = t.document.getElementsByTagName("script"), d = "" + e, p = 0; p < c.length; ++p) {
              var f = c[p];
              if (f.src) {
                o.push(f.src);
              }
            }
            if (i = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(d)) {
              var m = i[1] ? "\\s+" + i[1] : "";
              var g = i[2].split(",").join("\\s*,\\s*");
              n = u(i[3]).replace(/;$/, ";?");
              r = new RegExp("function" + m + "\\s*\\(\\s*" + g + "\\s*\\)\\s*{\\s*" + n + "\\s*}");
            } else {
              r = new RegExp(u(d).replace(/\s+/g, "\\s+"));
            }
            if (s = h(r, o)) {
              return s;
            }
            if (i = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(d)) {
              var _ = i[1];
              n = l(i[2]);
              if (s = h(r = new RegExp("on" + _ + "=[\\'\"]\\s*" + n + "\\s*[\\'\"]", "i"), o[0])) {
                return s;
              }
              if (s = h(r = new RegExp(n), o)) {
                return s;
              }
            }
            return null;
          }
        }
        function f(t) {
          if (!t.stack) {
            return null;
          }
          var e;
          var n;
          var r;
          var o = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
          var u = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
          var l = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
          var h = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
          var p = /\((\S*)(?::(\d+))(?::(\d+))\)/;
          var f = t.stack.split("\n");
          var m = [];
          var g = /^(.*) is undefined$/.exec(t.message);
          for (var _ = 0, y = f.length; _ < y; ++_) {
            if (n = o.exec(f[_])) {
              var v = n[2] && n[2].indexOf("native") === 0;
              if (n[2] && n[2].indexOf("eval") === 0 && (e = p.exec(n[2]))) {
                n[2] = e[1];
                n[3] = e[2];
                n[4] = e[3];
              }
              r = {
                url: v ? null : n[2],
                func: n[1] || i,
                args: v ? [n[2]] : [],
                line: n[3] ? +n[3] : null,
                column: n[4] ? +n[4] : null
              };
            } else if (n = l.exec(f[_])) {
              r = {
                url: n[2],
                func: n[1] || i,
                args: [],
                line: +n[3],
                column: n[4] ? +n[4] : null
              };
            } else {
              if (!(n = u.exec(f[_]))) {
                continue;
              }
              if (n[3] && n[3].indexOf(" > eval") > -1 && (e = h.exec(n[3]))) {
                n[3] = e[1];
                n[4] = e[2];
                n[5] = null;
              } else if (_ === 0 && !n[5] && !a(t.columnNumber)) {
                m[0].column = t.columnNumber + 1;
              }
              r = {
                url: n[3],
                func: n[1] || i,
                args: n[2] ? n[2].split(",") : [],
                line: n[4] ? +n[4] : null,
                column: n[5] ? +n[5] : null
              };
            }
            if (!r.func && r.line) {
              r.func = s(r.url, r.line);
            }
            r.context = r.line ? c(r.url, r.line) : null;
            m.push(r);
          }
          if (m.length) {
            if (m[0] && m[0].line && !m[0].column && g) {
              m[0].column = d(g[1], m[0].url, m[0].line);
            }
            return {
              mode: "stack",
              name: t.name,
              message: t.message,
              stack: m
            };
          } else {
            return null;
          }
        }
        function m(t, e, n, r) {
          var i = {
            url: e,
            line: n
          };
          if (i.url && i.line) {
            t.incomplete = false;
            i.func ||= s(i.url, i.line);
            i.context ||= c(i.url, i.line);
            var o = / '([^']+)' /.exec(r);
            if (o) {
              i.column = d(o[1], i.url, i.line);
            }
            if (t.stack.length > 0 && t.stack[0].url === i.url) {
              if (t.stack[0].line === i.line) {
                return false;
              }
              if (!t.stack[0].line && t.stack[0].func === i.func) {
                t.stack[0].line = i.line;
                t.stack[0].context = i.context;
                return false;
              }
            }
            t.stack.unshift(i);
            t.partial = true;
            return true;
          }
          t.incomplete = true;
          return false;
        }
        function g(t, n) {
          var r;
          var o;
          var a;
          var c = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i;
          var u = [];
          var l = {};
          for (var h = false, f = g.caller; f && !h; f = f.caller) {
            if (f !== _ && f !== e.report) {
              o = {
                url: null,
                func: i,
                args: [],
                line: null,
                column: null
              };
              if (f.name) {
                o.func = f.name;
              } else if (r = c.exec(f.toString())) {
                o.func = r[1];
              }
              if (o.func === undefined) {
                try {
                  o.func = r.input.substring(0, r.input.indexOf("{"));
                } catch (b) {}
              }
              if (a = p(f)) {
                o.url = a.url;
                o.line = a.line;
                if (o.func === i) {
                  o.func = s(o.url, o.line);
                }
                var y = / '([^']+)' /.exec(t.message || t.description);
                if (y) {
                  o.column = d(y[1], a.url, a.line);
                }
              }
              if (l["" + f]) {
                h = true;
              } else {
                l["" + f] = true;
              }
              u.push(o);
            }
          }
          if (n) {
            u.splice(0, n);
          }
          var v = {
            mode: "callers",
            name: t.name,
            message: t.message,
            stack: u
          };
          m(v, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description);
          return v;
        }
        function _(e, n) {
          var i = null;
          n = n == null ? 0 : +n;
          try {
            i = function (t) {
              var e = t.stacktrace;
              if (e) {
                var n;
                var r = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
                var i = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i;
                for (var o = e.split("\n"), a = [], u = 0; u < o.length; u += 2) {
                  var l = null;
                  if (n = r.exec(o[u])) {
                    l = {
                      url: n[2],
                      line: +n[1],
                      column: null,
                      func: n[3],
                      args: []
                    };
                  } else if (n = i.exec(o[u])) {
                    l = {
                      url: n[6],
                      line: +n[1],
                      column: +n[2],
                      func: n[3] || n[4],
                      args: n[5] ? n[5].split(",") : []
                    };
                  }
                  if (l) {
                    if (!l.func && l.line) {
                      l.func = s(l.url, l.line);
                    }
                    if (l.line) {
                      try {
                        l.context = c(l.url, l.line);
                      } catch (h) {}
                    }
                    l.context ||= [o[u + 1]];
                    a.push(l);
                  }
                }
                if (a.length) {
                  return {
                    mode: "stacktrace",
                    name: t.name,
                    message: t.message,
                    stack: a
                  };
                } else {
                  return null;
                }
              }
            }(e);
            if (i) {
              return i;
            }
          } catch (a) {}
          try {
            if (i = f(e)) {
              return i;
            }
          } catch (a) {}
          try {
            i = function (e) {
              var n = e.message.split("\n");
              if (n.length < 4) {
                return null;
              }
              var i;
              var a = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
              var u = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
              var d = /^\s*Line (\d+) of function script\s*$/i;
              var p = [];
              var f = t && t.document && t.document.getElementsByTagName("script");
              var m = [];
              for (var g in f) {
                if (o(f, g) && !f[g].src) {
                  m.push(f[g]);
                }
              }
              for (var _ = 2; _ < n.length; _ += 2) {
                var y = null;
                if (i = a.exec(n[_])) {
                  y = {
                    url: i[2],
                    func: i[3],
                    args: [],
                    line: +i[1],
                    column: null
                  };
                } else if (i = u.exec(n[_])) {
                  y = {
                    url: i[3],
                    func: i[4],
                    args: [],
                    line: +i[1],
                    column: null
                  };
                  var v = +i[1];
                  var b = m[i[2] - 1];
                  if (b) {
                    var w = r(y.url);
                    if (w) {
                      var E = (w = w.join("\n")).indexOf(b.innerText);
                      if (E >= 0) {
                        y.line = v + w.substring(0, E).split("\n").length;
                      }
                    }
                  }
                } else if (i = d.exec(n[_])) {
                  var S = t.location.href.replace(/#.*$/, "");
                  var T = h(new RegExp(l(n[_ + 1])), [S]);
                  y = {
                    url: S,
                    func: "",
                    args: [],
                    line: T ? T.line : i[1],
                    column: null
                  };
                }
                if (y) {
                  y.func ||= s(y.url, y.line);
                  var x = c(y.url, y.line);
                  var A = x ? x[Math.floor(x.length / 2)] : null;
                  if (x && A.replace(/^\s*/, "") === n[_ + 1].replace(/^\s*/, "")) {
                    y.context = x;
                  } else {
                    y.context = [n[_ + 1]];
                  }
                  p.push(y);
                }
              }
              if (p.length) {
                return {
                  mode: "multiline",
                  name: e.name,
                  message: n[0],
                  stack: p
                };
              } else {
                return null;
              }
            }(e);
            if (i) {
              return i;
            }
          } catch (a) {}
          try {
            if (i = g(e, n + 1)) {
              return i;
            }
          } catch (a) {}
          return {
            name: e.name,
            message: e.message,
            mode: "failed"
          };
        }
        _.augmentStackTraceWithInitialElement = m;
        _.computeStackTraceFromStackProp = f;
        _.guessFunctionName = s;
        _.gatherContext = c;
        _.ofCaller = function (t) {
          t = 1 + (t == null ? 0 : +t);
          try {
            throw new Error();
          } catch (e) {
            return _(e, t + 1);
          }
        };
        _.getSource = r;
        return _;
      }();
      e.extendToAsynchronousCallbacks = function () {
        function n(n) {
          var i = t[n];
          t[n] = function () {
            var t = r.call(arguments);
            var n = t[0];
            if (typeof n == "function") {
              t[0] = e.wrap(n);
            }
            if (i.apply) {
              return i.apply(this, t);
            } else {
              return i(t[0], t[1]);
            }
          };
        }
        n("setTimeout");
        n("setInterval");
      };
      e.remoteFetching ||= true;
      e.collectWindowErrors ||= true;
      if (!e.linesOfContext || e.linesOfContext < 1) {
        e.linesOfContext = 11;
      }
      if (sh.exports && t.module !== sh) {
        sh.exports = e;
      } else {
        t.TraceKit = e;
      }
    }
    function o(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    function a(t) {
      return t === undefined;
    }
  })(typeof window != "undefined" ? window : n);
}
var ah = ih.exports;
class ch {
  _delegate;
  constructor(t) {
    this._delegate = t;
  }
  export(t, e) {
    this._delegate.export(t, e);
  }
  forceFlush() {
    return this._delegate.forceFlush();
  }
  shutdown() {
    return this._delegate.shutdown();
  }
}
class uh extends Error {
  code;
  name = "OTLPExporterError";
  data;
  constructor(t, e, n) {
    super(t);
    this.data = n;
    this.code = e;
  }
}
function lh(t) {
  if (Number.isFinite(t) && t > 0) {
    return t;
  }
  throw new Error(`Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '${t}')`);
}
function hh(t) {
  if (t != null) {
    return () => t;
  }
}
function dh(t, e, n) {
  return {
    timeoutMillis: lh(t.timeoutMillis ?? e.timeoutMillis ?? n.timeoutMillis),
    concurrencyLimit: t.concurrencyLimit ?? e.concurrencyLimit ?? n.concurrencyLimit,
    compression: t.compression ?? e.compression ?? n.compression
  };
}
class ph {
  _concurrencyLimit;
  _sendingPromises = [];
  constructor(t) {
    this._concurrencyLimit = t;
  }
  pushPromise(t) {
    if (this.hasReachedLimit()) {
      throw new Error("Concurrency Limit reached");
    }
    this._sendingPromises.push(t);
    const e = () => {
      const e = this._sendingPromises.indexOf(t);
      this._sendingPromises.splice(e, 1);
    };
    t.then(e, e);
  }
  hasReachedLimit() {
    return this._sendingPromises.length >= this._concurrencyLimit;
  }
  async awaitAll() {
    await Promise.all(this._sendingPromises);
  }
}
function fh(t) {
  return new ph(t.concurrencyLimit);
}
function mh() {
  return {
    handleResponse(t) {
      if (t != null && function (t) {
        return Object.prototype.hasOwnProperty.call(t, "partialSuccess");
      }(t) && t.partialSuccess != null && Object.keys(t.partialSuccess).length !== 0) {
        nc.warn("Received Partial Success response:", JSON.stringify(t.partialSuccess));
      }
    }
  };
}
(function (t) {
  t[t.SUCCESS = 0] = "SUCCESS";
  t[t.FAILED = 1] = "FAILED";
})(oh ||= {});
class gh {
  _transport;
  _serializer;
  _responseHandler;
  _promiseQueue;
  _timeout;
  _diagLogger;
  constructor(t, e, n, r, i) {
    this._transport = t;
    this._serializer = e;
    this._responseHandler = n;
    this._promiseQueue = r;
    this._timeout = i;
    this._diagLogger = nc.createComponentLogger({
      namespace: "OTLPExportDelegate"
    });
  }
  export(t, e) {
    this._diagLogger.debug("items to be sent", t);
    if (this._promiseQueue.hasReachedLimit()) {
      e({
        code: oh.FAILED,
        error: new Error("Concurrent export limit reached")
      });
      return;
    }
    const n = this._serializer.serializeRequest(t);
    if (n != null) {
      this._promiseQueue.pushPromise(this._transport.send(n, this._timeout).then(t => {
        if (t.status !== "success") {
          if (t.status === "failure" && t.error) {
            e({
              code: oh.FAILED,
              error: t.error
            });
          } else if (t.status === "retryable") {
            e({
              code: oh.FAILED,
              error: new uh("Export failed with retryable status")
            });
          } else {
            e({
              code: oh.FAILED,
              error: new uh("Export failed with unknown error")
            });
          }
        } else {
          if (t.data != null) {
            try {
              this._responseHandler.handleResponse(this._serializer.deserializeResponse(t.data));
            } catch (n) {
              this._diagLogger.warn("Export succeeded but could not deserialize response - is the response specification compliant?", n, t.data);
            }
          }
          e({
            code: oh.SUCCESS
          });
        }
      }, t => e({
        code: oh.FAILED,
        error: t
      })));
    } else {
      e({
        code: oh.FAILED,
        error: new Error("Nothing to send")
      });
    }
  }
  forceFlush() {
    return this._promiseQueue.awaitAll();
  }
  async shutdown() {
    this._diagLogger.debug("shutdown started");
    await this.forceFlush();
    this._transport.shutdown();
  }
}
function _h(t, e, n) {
  r = {
    transport: n,
    serializer: e,
    promiseHandler: fh(t)
  };
  i = {
    timeout: t.timeoutMillis
  };
  return new gh(r.transport, r.serializer, mh(), r.promiseHandler, i.timeout);
  var r;
  var i;
}
const yh = Math.pow(10, 9);
function vh(t) {
  if (t >= 48 && t <= 57) {
    return t - 48;
  } else if (t >= 97 && t <= 102) {
    return t - 87;
  } else {
    return t - 55;
  }
}
function bh(t) {
  const e = new Uint8Array(t.length / 2);
  let n = 0;
  for (let r = 0; r < t.length; r += 2) {
    const i = vh(t.charCodeAt(r));
    const s = vh(t.charCodeAt(r + 1));
    e[n++] = i << 4 | s;
  }
  return e;
}
function wh(t) {
  const e = BigInt(1000000000);
  return BigInt(t[0]) * e + BigInt(t[1]);
}
function Eh(t) {
  const e = wh(t);
  n = e;
  return {
    low: Number(BigInt.asUintN(32, n)),
    high: Number(BigInt.asUintN(32, n >> BigInt(32)))
  };
  var n;
}
const Sh = typeof BigInt != "undefined" ? function (t) {
  return wh(t).toString();
} : function (t) {
  return t[0] * yh + t[1];
};
function Th(t) {
  return t;
}
function xh(t) {
  if (t !== undefined) {
    return bh(t);
  }
}
const Ah = {
  encodeHrTime: Eh,
  encodeSpanContext: bh,
  encodeOptionalSpanContext: xh
};
function Oh(t) {
  if (t === undefined) {
    return Ah;
  }
  const e = t.useLongBits ?? true;
  const n = t.useHex ?? false;
  return {
    encodeHrTime: e ? Eh : Sh,
    encodeSpanContext: n ? Th : bh,
    encodeOptionalSpanContext: n ? Th : xh
  };
}
function Ch(t) {
  return {
    attributes: kh(t.attributes),
    droppedAttributesCount: 0
  };
}
function Ph(t) {
  return {
    name: t.name,
    version: t.version
  };
}
function kh(t) {
  return Object.keys(t).map(e => Ih(e, t[e]));
}
function Ih(t, e) {
  return {
    key: t,
    value: Rh(e)
  };
}
function Rh(t) {
  const e = typeof t;
  if (e === "string") {
    return {
      stringValue: t
    };
  } else if (e === "number") {
    if (Number.isInteger(t)) {
      return {
        intValue: t
      };
    } else {
      return {
        doubleValue: t
      };
    }
  } else if (e === "boolean") {
    return {
      boolValue: t
    };
  } else if (t instanceof Uint8Array) {
    return {
      bytesValue: t
    };
  } else if (Array.isArray(t)) {
    return {
      arrayValue: {
        values: t.map(Rh)
      }
    };
  } else if (e === "object" && t != null) {
    return {
      kvlistValue: {
        values: Object.entries(t).map(([t, e]) => Ih(t, e))
      }
    };
  } else {
    return {};
  }
}
function Lh(t, e) {
  const n = function (t) {
    const e = new Map();
    for (const n of t) {
      const {
        resource: t,
        instrumentationScope: {
          name: r,
          version: i = "",
          schemaUrl: s = ""
        }
      } = n;
      let o = e.get(t);
      if (!o) {
        o = new Map();
        e.set(t, o);
      }
      const a = `${r}@${i}:${s}`;
      let c = o.get(a);
      if (!c) {
        c = [];
        o.set(a, c);
      }
      c.push(n);
    }
    return e;
  }(t);
  return Array.from(n, ([t, n]) => ({
    resource: Ch(t),
    scopeLogs: Array.from(n, ([, t]) => ({
      scope: Ph(t[0].instrumentationScope),
      logRecords: t.map(t => function (t, e) {
        return {
          timeUnixNano: e.encodeHrTime(t.hrTime),
          observedTimeUnixNano: e.encodeHrTime(t.hrTimeObserved),
          severityNumber: t.severityNumber,
          severityText: t.severityText,
          body: Rh(t.body),
          eventName: t.eventName,
          attributes: Mh(t.attributes),
          droppedAttributesCount: t.droppedAttributesCount,
          flags: t.spanContext?.traceFlags,
          traceId: e.encodeOptionalSpanContext(t.spanContext?.traceId),
          spanId: e.encodeOptionalSpanContext(t.spanContext?.spanId)
        };
      }(t, e)),
      schemaUrl: t[0].instrumentationScope.schemaUrl
    })),
    schemaUrl: undefined
  }));
}
function Mh(t) {
  return Object.keys(t).map(e => Ih(e, t[e]));
}
var Nh;
var Dh;
var Uh;
var Bh;
var $h;
var jh;
var Fh;
var zh;
var Gh;
var Vh;
function Hh(t, e) {
  return Array.from(t.map(t => ({
    scope: Ph(t.scope),
    metrics: t.metrics.map(t => function (t, e) {
      const n = {
        name: t.descriptor.name,
        description: t.descriptor.description,
        unit: t.descriptor.unit
      };
      const r = function (t) {
        switch (t) {
          case Nh.DELTA:
            return Gh.AGGREGATION_TEMPORALITY_DELTA;
          case Nh.CUMULATIVE:
            return Gh.AGGREGATION_TEMPORALITY_CUMULATIVE;
        }
      }(t.aggregationTemporality);
      switch (t.dataPointType) {
        case $h.SUM:
          n.sum = {
            aggregationTemporality: r,
            isMonotonic: t.isMonotonic,
            dataPoints: qh(t, e)
          };
          break;
        case $h.GAUGE:
          n.gauge = {
            dataPoints: qh(t, e)
          };
          break;
        case $h.HISTOGRAM:
          n.histogram = {
            aggregationTemporality: r,
            dataPoints: Wh(t, e)
          };
          break;
        case $h.EXPONENTIAL_HISTOGRAM:
          n.exponentialHistogram = {
            aggregationTemporality: r,
            dataPoints: Kh(t, e)
          };
      }
      return n;
    }(t, e)),
    schemaUrl: t.scope.schemaUrl
  })));
}
function qh(t, e) {
  return t.dataPoints.map(n => function (t, e, n) {
    const r = {
      attributes: kh(t.attributes),
      startTimeUnixNano: n.encodeHrTime(t.startTime),
      timeUnixNano: n.encodeHrTime(t.endTime)
    };
    switch (e) {
      case Yo.INT:
        r.asInt = t.value;
        break;
      case Yo.DOUBLE:
        r.asDouble = t.value;
    }
    return r;
  }(n, t.descriptor.valueType, e));
}
function Wh(t, e) {
  return t.dataPoints.map(t => {
    const n = t.value;
    return {
      attributes: kh(t.attributes),
      bucketCounts: n.buckets.counts,
      explicitBounds: n.buckets.boundaries,
      count: n.count,
      sum: n.sum,
      min: n.min,
      max: n.max,
      startTimeUnixNano: e.encodeHrTime(t.startTime),
      timeUnixNano: e.encodeHrTime(t.endTime)
    };
  });
}
function Kh(t, e) {
  return t.dataPoints.map(t => {
    const n = t.value;
    return {
      attributes: kh(t.attributes),
      count: n.count,
      min: n.min,
      max: n.max,
      sum: n.sum,
      positive: {
        offset: n.positive.offset,
        bucketCounts: n.positive.bucketCounts
      },
      negative: {
        offset: n.negative.offset,
        bucketCounts: n.negative.bucketCounts
      },
      scale: n.scale,
      zeroCount: n.zeroCount,
      startTimeUnixNano: e.encodeHrTime(t.startTime),
      timeUnixNano: e.encodeHrTime(t.endTime)
    };
  });
}
function Yh(t, e) {
  return {
    resourceMetrics: t.map(t => function (t, e) {
      const n = Oh(e);
      return {
        resource: Ch(t.resource),
        schemaUrl: undefined,
        scopeMetrics: Hh(t.scopeMetrics, n)
      };
    }(t, e))
  };
}
function Xh(t, e) {
  const n = t.spanContext();
  const r = t.status;
  const i = t.parentSpanContext?.spanId ? e.encodeSpanContext(t.parentSpanContext?.spanId) : undefined;
  return {
    traceId: e.encodeSpanContext(n.traceId),
    spanId: e.encodeSpanContext(n.spanId),
    parentSpanId: i,
    traceState: n.traceState?.serialize(),
    name: t.name,
    kind: t.kind == null ? 0 : t.kind + 1,
    startTimeUnixNano: e.encodeHrTime(t.startTime),
    endTimeUnixNano: e.encodeHrTime(t.endTime),
    attributes: kh(t.attributes),
    droppedAttributesCount: t.droppedAttributesCount,
    events: t.events.map(t => function (t, e) {
      return {
        attributes: t.attributes ? kh(t.attributes) : [],
        name: t.name,
        timeUnixNano: e.encodeHrTime(t.time),
        droppedAttributesCount: t.droppedAttributesCount || 0
      };
    }(t, e)),
    droppedEventsCount: t.droppedEventsCount,
    status: {
      code: r.code,
      message: r.message
    },
    links: t.links.map(t => function (t, e) {
      return {
        attributes: t.attributes ? kh(t.attributes) : [],
        spanId: e.encodeSpanContext(t.context.spanId),
        traceId: e.encodeSpanContext(t.context.traceId),
        traceState: t.context.traceState?.serialize(),
        droppedAttributesCount: t.droppedAttributesCount || 0
      };
    }(t, e)),
    droppedLinksCount: t.droppedLinksCount
  };
}
function Jh(t, e) {
  const n = function (t) {
    const e = new Map();
    for (const n of t) {
      let t = e.get(n.resource);
      if (!t) {
        t = new Map();
        e.set(n.resource, t);
      }
      const r = `${n.instrumentationScope.name}@${n.instrumentationScope.version || ""}:${n.instrumentationScope.schemaUrl || ""}`;
      let i = t.get(r);
      if (!i) {
        i = [];
        t.set(r, i);
      }
      i.push(n);
    }
    return e;
  }(t);
  const r = [];
  const i = n.entries();
  let s = i.next();
  while (!s.done) {
    const [t, n] = s.value;
    const o = [];
    const a = n.values();
    let c = a.next();
    while (!c.done) {
      const t = c.value;
      if (t.length > 0) {
        const n = t.map(t => Xh(t, e));
        o.push({
          scope: Ph(t[0].instrumentationScope),
          spans: n,
          schemaUrl: t[0].instrumentationScope.schemaUrl
        });
      }
      c = a.next();
    }
    const u = {
      resource: Ch(t),
      scopeSpans: o,
      schemaUrl: undefined
    };
    r.push(u);
    s = i.next();
  }
  return r;
}
(Dh = Nh ||= {})[Dh.DELTA = 0] = "DELTA";
Dh[Dh.CUMULATIVE = 1] = "CUMULATIVE";
(Bh = Uh ||= {}).COUNTER = "COUNTER";
Bh.GAUGE = "GAUGE";
Bh.HISTOGRAM = "HISTOGRAM";
Bh.UP_DOWN_COUNTER = "UP_DOWN_COUNTER";
Bh.OBSERVABLE_COUNTER = "OBSERVABLE_COUNTER";
Bh.OBSERVABLE_GAUGE = "OBSERVABLE_GAUGE";
Bh.OBSERVABLE_UP_DOWN_COUNTER = "OBSERVABLE_UP_DOWN_COUNTER";
(jh = $h ||= {})[jh.HISTOGRAM = 0] = "HISTOGRAM";
jh[jh.EXPONENTIAL_HISTOGRAM = 1] = "EXPONENTIAL_HISTOGRAM";
jh[jh.GAUGE = 2] = "GAUGE";
jh[jh.SUM = 3] = "SUM";
(zh = Fh ||= {})[zh.DEFAULT = 0] = "DEFAULT";
zh[zh.DROP = 1] = "DROP";
zh[zh.SUM = 2] = "SUM";
zh[zh.LAST_VALUE = 3] = "LAST_VALUE";
zh[zh.EXPLICIT_BUCKET_HISTOGRAM = 4] = "EXPLICIT_BUCKET_HISTOGRAM";
zh[zh.EXPONENTIAL_HISTOGRAM = 5] = "EXPONENTIAL_HISTOGRAM";
(Vh = Gh ||= {})[Vh.AGGREGATION_TEMPORALITY_UNSPECIFIED = 0] = "AGGREGATION_TEMPORALITY_UNSPECIFIED";
Vh[Vh.AGGREGATION_TEMPORALITY_DELTA = 1] = "AGGREGATION_TEMPORALITY_DELTA";
Vh[Vh.AGGREGATION_TEMPORALITY_CUMULATIVE = 2] = "AGGREGATION_TEMPORALITY_CUMULATIVE";
const Qh = {
  serializeRequest: t => {
    const e = {
      resourceLogs: Lh(t, Oh({
        useHex: true,
        useLongBits: false
      }))
    };
    return new TextEncoder().encode(JSON.stringify(e));
  },
  deserializeResponse: t => {
    if (t.length === 0) {
      return {};
    }
    const e = new TextDecoder();
    return JSON.parse(e.decode(t));
  }
};
const Zh = {
  serializeRequest: t => {
    const e = Yh([t], {
      useLongBits: false
    });
    return new TextEncoder().encode(JSON.stringify(e));
  },
  deserializeResponse: t => {
    if (t.length === 0) {
      return {};
    }
    const e = new TextDecoder();
    return JSON.parse(e.decode(t));
  }
};
const td = {
  serializeRequest: t => {
    const e = {
      resourceSpans: Jh(t, Oh({
        useHex: true,
        useLongBits: false
      }))
    };
    return new TextEncoder().encode(JSON.stringify(e));
  },
  deserializeResponse: t => {
    if (t.length === 0) {
      return {};
    }
    const e = new TextDecoder();
    return JSON.parse(e.decode(t));
  }
};
function ed() {
  return Math.random() * 0.4 - 0.2;
}
class nd {
  _transport;
  constructor(t) {
    this._transport = t;
  }
  retry(t, e, n) {
    return new Promise((r, i) => {
      setTimeout(() => {
        this._transport.send(t, e).then(r, i);
      }, n);
    });
  }
  async send(t, e) {
    const n = Date.now() + e;
    let r = await this._transport.send(t, e);
    let i = 5;
    let s = 1000;
    while (r.status === "retryable" && i > 0) {
      i--;
      const e = Math.max(Math.min(s, 5000) + ed(), 0);
      s *= 1.5;
      const o = r.retryInMillis ?? e;
      const a = n - Date.now();
      if (o > a) {
        return r;
      }
      r = await this.retry(t, a, o);
    }
    return r;
  }
  shutdown() {
    return this._transport.shutdown();
  }
}
function rd(t) {
  return new nd(t.transport);
}
function id(t) {
  if (t == null) {
    return;
  }
  const e = Number.parseInt(t, 10);
  if (Number.isInteger(e)) {
    if (e > 0) {
      return e * 1000;
    } else {
      return -1;
    }
  }
  const n = new Date(t).getTime() - Date.now();
  if (n >= 0) {
    return n;
  } else {
    return 0;
  }
}
class sd {
  _parameters;
  constructor(t) {
    this._parameters = t;
  }
  send(t, e) {
    return new Promise(n => {
      const r = new XMLHttpRequest();
      r.timeout = e;
      r.open("POST", this._parameters.url);
      const i = this._parameters.headers();
      Object.entries(i).forEach(([t, e]) => {
        r.setRequestHeader(t, e);
      });
      r.ontimeout = t => {
        n({
          status: "failure",
          error: new Error("XHR request timed out")
        });
      };
      r.onreadystatechange = () => {
        var t;
        if (r.status >= 200 && r.status <= 299) {
          nc.debug("XHR success");
          n({
            status: "success"
          });
        } else if (r.status && (t = r.status, [429, 502, 503, 504].includes(t))) {
          n({
            status: "retryable",
            retryInMillis: id(r.getResponseHeader("Retry-After"))
          });
        } else if (r.status !== 0) {
          n({
            status: "failure",
            error: new Error("XHR request failed with non-retryable status")
          });
        }
      };
      r.onabort = () => {
        n({
          status: "failure",
          error: new Error("XHR request aborted")
        });
      };
      r.onerror = () => {
        n({
          status: "failure",
          error: new Error("XHR request errored")
        });
      };
      r.send(t);
    });
  }
  shutdown() {}
}
class od {
  _params;
  constructor(t) {
    this._params = t;
  }
  send(t) {
    return new Promise(e => {
      if (navigator.sendBeacon(this._params.url, new Blob([t], {
        type: this._params.blobType
      }))) {
        nc.debug("SendBeacon success");
        e({
          status: "success"
        });
      } else {
        e({
          status: "failure",
          error: new Error("SendBeacon failed")
        });
      }
    });
  }
  shutdown() {}
}
function ad(t, e, n) {
  const r = {
    ...n()
  };
  const i = {};
  return () => {
    if (e != null) {
      Object.assign(i, e());
    }
    if (t != null) {
      Object.assign(i, t());
    }
    return Object.assign(i, r);
  };
}
function cd(t) {
  if (t != null) {
    try {
      new URL(t);
      return t;
    } catch {
      throw new Error(`Configuration: Could not parse user-provided export URL: '${t}'`);
    }
  }
}
function ud(t, e, n) {
  r = {
    url: t.url,
    timeoutMillis: t.timeoutMillis,
    headers: hh(t.headers),
    concurrencyLimit: t.concurrencyLimit
  };
  i = {};
  s = function (t, e) {
    return {
      timeoutMillis: 10000,
      concurrencyLimit: 30,
      compression: "none",
      headers: () => t,
      url: "http://localhost:4318/" + e,
      agentOptions: {
        keepAlive: true
      }
    };
  }(n, e);
  return {
    ...dh(r, i, s),
    headers: ad((o = r.headers, () => {
      const t = {};
      Object.entries(o?.() ?? {}).forEach(([e, n]) => {
        if (n !== undefined) {
          t[e] = String(n);
        } else {
          nc.warn(`Header "${e}" has invalid value (${n}) and will be ignored`);
        }
      });
      return t;
    }), i.headers, s.headers),
    url: cd(r.url) ?? i.url ?? s.url,
    agentOptions: r.agentOptions ?? i.agentOptions ?? s.agentOptions
  };
  var r;
  var i;
  var s;
  var o;
}
function ld(t, e, n, r) {
  const i = !!t.headers || typeof navigator.sendBeacon != "function";
  const s = ud(t, n, r);
  if (i) {
    return function (t, e) {
      return _h(t, e, rd({
        transport: (n = t, new sd(n))
      }));
      var n;
    }(s, e);
  } else {
    return function (t, e) {
      return _h(t, e, rd({
        transport: (n = {
          url: t.url,
          blobType: t.headers()["Content-Type"]
        }, new od(n))
      }));
      var n;
    }(s, e);
  }
}
class hd extends ch {
  constructor(t = {}) {
    super(ld(t, td, "v1/traces", {
      "Content-Type": "application/json"
    }));
  }
}
var dd;
var pd;
(pd = dd ||= {})[pd.DELTA = 0] = "DELTA";
pd[pd.CUMULATIVE = 1] = "CUMULATIVE";
pd[pd.LOWMEMORY = 2] = "LOWMEMORY";
const fd = () => Nh.CUMULATIVE;
const md = t => {
  switch (t) {
    case Uh.COUNTER:
    case Uh.OBSERVABLE_COUNTER:
    case Uh.GAUGE:
    case Uh.HISTOGRAM:
    case Uh.OBSERVABLE_GAUGE:
      return Nh.DELTA;
    case Uh.UP_DOWN_COUNTER:
    case Uh.OBSERVABLE_UP_DOWN_COUNTER:
      return Nh.CUMULATIVE;
  }
};
const gd = t => {
  switch (t) {
    case Uh.COUNTER:
    case Uh.HISTOGRAM:
      return Nh.DELTA;
    case Uh.GAUGE:
    case Uh.UP_DOWN_COUNTER:
    case Uh.OBSERVABLE_UP_DOWN_COUNTER:
    case Uh.OBSERVABLE_COUNTER:
    case Uh.OBSERVABLE_GAUGE:
      return Nh.CUMULATIVE;
  }
};
function _d(t) {
  if (t != null) {
    if (t === dd.DELTA) {
      return md;
    } else if (t === dd.LOWMEMORY) {
      return gd;
    } else {
      return fd;
    }
  } else {
    return function () {
      const t = "cumulative".toLowerCase();
      if (t === "cumulative") {
        return fd;
      } else if (t === "delta") {
        return md;
      } else if (t === "lowmemory") {
        return gd;
      } else {
        nc.warn(`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE is set to '${t}', but only 'cumulative' and 'delta' are allowed. Using default ('cumulative') instead.`);
        return fd;
      }
    }();
  }
}
const yd = Object.freeze({
  type: Fh.DEFAULT
});
class vd extends ch {
  _aggregationTemporalitySelector;
  _aggregationSelector;
  constructor(t, e) {
    super(t);
    this._aggregationSelector = function (t) {
      return t?.aggregationPreference ?? (() => yd);
    }(e);
    this._aggregationTemporalitySelector = _d(e?.temporalityPreference);
  }
  selectAggregation(t) {
    return this._aggregationSelector(t);
  }
  selectAggregationTemporality(t) {
    return this._aggregationTemporalitySelector(t);
  }
}
class bd extends vd {
  constructor(t) {
    super(ld(t ?? {}, Zh, "v1/metrics", {
      "Content-Type": "application/json"
    }), t);
  }
}
class wd extends ch {
  constructor(t = {}) {
    super(ld(t, Qh, "v1/logs", {
      "Content-Type": "application/json"
    }));
  }
}
class Ed {
  _sessionIdProvider;
  constructor(t) {
    this._sessionIdProvider = t;
  }
  async forceFlush() {}
  onStart(t, e) {
    const n = this._sessionIdProvider?.getSessionId();
    if (n) {
      t.setAttribute("session.id", n);
    }
  }
  onEnd(t) {}
  async shutdown() {}
}
var Sd;
var Td = {
  exports: {}
};
var xd = Td.exports;
if (!Sd) {
  Sd = 1;
  (function (t, e) {
    (function (n, r) {
      var i = "function";
      var s = "undefined";
      var o = "object";
      var a = "string";
      var c = "major";
      var u = "model";
      var l = "name";
      var h = "type";
      var d = "vendor";
      var p = "version";
      var f = "architecture";
      var m = "console";
      var g = "mobile";
      var _ = "tablet";
      var y = "smarttv";
      var v = "wearable";
      var b = "embedded";
      var w = "Amazon";
      var E = "Apple";
      var S = "ASUS";
      var T = "BlackBerry";
      var x = "Browser";
      var A = "Chrome";
      var O = "Firefox";
      var C = "Google";
      var P = "Huawei";
      var k = "LG";
      var I = "Microsoft";
      var R = "Motorola";
      var L = "Opera";
      var M = "Samsung";
      var N = "Sharp";
      var D = "Sony";
      var U = "Xiaomi";
      var B = "Zebra";
      var $ = "Facebook";
      var j = "Chromium OS";
      var F = "Mac OS";
      var z = " Browser";
      function G(t) {
        var e = {};
        for (var n = 0; n < t.length; n++) {
          e[t[n].toUpperCase()] = t[n];
        }
        return e;
      }
      function V(t, e) {
        return typeof t === a && H(e).indexOf(H(t)) !== -1;
      }
      function H(t) {
        return t.toLowerCase();
      }
      function q(t, e) {
        if (typeof t === a) {
          t = t.replace(/^\s\s*/, "");
          if (typeof e === s) {
            return t;
          } else {
            return t.substring(0, 500);
          }
        }
      }
      function W(t, e) {
        var n;
        var s;
        var a;
        var c;
        for (var u, l, h = 0; h < e.length && !u;) {
          var d = e[h];
          var p = e[h + 1];
          for (n = s = 0; n < d.length && !u && d[n];) {
            if (u = d[n++].exec(t)) {
              for (a = 0; a < p.length; a++) {
                l = u[++s];
                if (typeof (c = p[a]) === o && c.length > 0) {
                  if (c.length === 2) {
                    if (typeof c[1] == i) {
                      this[c[0]] = c[1].call(this, l);
                    } else {
                      this[c[0]] = c[1];
                    }
                  } else if (c.length === 3) {
                    if (typeof c[1] !== i || c[1].exec && c[1].test) {
                      this[c[0]] = l ? l.replace(c[1], c[2]) : r;
                    } else {
                      this[c[0]] = l ? c[1].call(this, l, c[2]) : r;
                    }
                  } else if (c.length === 4) {
                    this[c[0]] = l ? c[3].call(this, l.replace(c[1], c[2])) : r;
                  }
                } else {
                  this[c] = l || r;
                }
              }
            }
          }
          h += 2;
        }
      }
      function K(t, e) {
        for (var n in e) {
          if (typeof e[n] === o && e[n].length > 0) {
            for (var i = 0; i < e[n].length; i++) {
              if (V(e[n][i], t)) {
                if (n === "?") {
                  return r;
                } else {
                  return n;
                }
              }
            }
          } else if (V(e[n], t)) {
            if (n === "?") {
              return r;
            } else {
              return n;
            }
          }
        }
        if (e.hasOwnProperty("*")) {
          return e["*"];
        } else {
          return t;
        }
      }
      var Y = {
        ME: "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        2000: "NT 5.0",
        XP: ["NT 5.1", "NT 5.2"],
        Vista: "NT 6.0",
        7: "NT 6.1",
        8: "NT 6.2",
        8.1: "NT 6.3",
        10: ["NT 6.4", "NT 10.0"],
        RT: "ARM"
      };
      var X = {
        browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [p, [l, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [p, [l, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [l, p], [/opios[\/ ]+([\w\.]+)/i], [p, [l, L + " Mini"]], [/\bop(?:rg)?x\/([\w\.]+)/i], [p, [l, L + " GX"]], [/\bopr\/([\w\.]+)/i], [p, [l, L]], [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i], [p, [l, "Baidu"]], [/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i], [p, [l, "Maxthon"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i, /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i, /(heytap|ovi|115)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [l, p], [/quark(?:pc)?\/([-\w\.]+)/i], [p, [l, "Quark"]], [/\bddg\/([\w\.]+)/i], [p, [l, "DuckDuckGo"]], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [p, [l, "UC" + x]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i], [p, [l, "WeChat"]], [/konqueror\/([\w\.]+)/i], [p, [l, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [p, [l, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [p, [l, "Yandex"]], [/slbrowser\/([\w\.]+)/i], [p, [l, "Smart Lenovo " + x]], [/(avast|avg)\/([\w\.]+)/i], [[l, /(.+)/, "$1 Secure " + x], p], [/\bfocus\/([\w\.]+)/i], [p, [l, O + " Focus"]], [/\bopt\/([\w\.]+)/i], [p, [l, L + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [p, [l, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [p, [l, "Dolphin"]], [/coast\/([\w\.]+)/i], [p, [l, L + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [p, [l, "MIUI" + z]], [/fxios\/([\w\.-]+)/i], [p, [l, O]], [/\bqihoobrowser\/?([\w\.]*)/i], [p, [l, "360"]], [/\b(qq)\/([\w\.]+)/i], [[l, /(.+)/, "$1Browser"], p], [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i], [[l, /(.+)/, "$1" + z], p], [/samsungbrowser\/([\w\.]+)/i], [p, [l, M + " Internet"]], [/metasr[\/ ]?([\d\.]+)/i], [p, [l, "Sogou Explorer"]], [/(sogou)mo\w+\/([\d\.]+)/i], [[l, "Sogou Mobile"], p], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i], [l, p], [/(lbbrowser|rekonq)/i, /\[(linkedin)app\]/i], [l], [/ome\/([\w\.]+) \w* ?(iron) saf/i, /ome\/([\w\.]+).+qihu (360)[es]e/i], [p, l], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[l, $], p], [/(Klarna)\/([\w\.]+)/i, /(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(alipay)client\/([\w\.]+)/i, /(twitter)(?:and| f.+e\/([\w\.]+))/i, /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i], [l, p], [/\bgsa\/([\w\.]+) .*safari\//i], [p, [l, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [p, [l, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [p, [l, A + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[l, A + " WebView"], p], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [p, [l, "Android " + x]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [l, p], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [p, [l, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [p, l], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [l, [p, K, {
          "1.0": "/8",
          1.2: "/1",
          1.3: "/3",
          "2.0": "/412",
          "2.0.2": "/416",
          "2.0.3": "/417",
          "2.0.4": "/419",
          "?": "/"
        }]], [/(webkit|khtml)\/([\w\.]+)/i], [l, p], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[l, "Netscape"], p], [/(wolvic|librewolf)\/([\w\.]+)/i], [l, p], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [p, [l, O + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i], [l, [p, /_/g, "."]], [/(cobalt)\/([\w\.]+)/i], [l, [p, /master.|lts./, ""]]],
        cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, H]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", H]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, H]]],
        device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [d, M], [h, _]], [/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]((?!sm-[lr])[-\w]+)/i, /sec-(sgh\w+)/i], [u, [d, M], [h, g]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [d, E], [h, g]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [d, E], [h, _]], [/(macintosh);/i], [u, [d, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [d, N], [h, g]], [/(?:honor)([-\w ]+)[;\)]/i], [u, [d, "Honor"], [h, g]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [d, P], [h, _]], [/(?:huawei)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [d, P], [h, g]], [/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i], [[u, /_/g, " "], [d, U], [h, g]], [/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i, /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [d, U], [h, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [d, "OPPO"], [h, g]], [/\b(opd2\d{3}a?) bui/i], [u, [d, "OPPO"], [h, _]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [d, "Vivo"], [h, g]], [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i], [u, [d, "Realme"], [h, g]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [d, R], [h, g]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [d, R], [h, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [d, k], [h, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [d, k], [h, g]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [d, "Lenovo"], [h, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [d, "Nokia"], [h, g]], [/(pixel c)\b/i], [u, [d, C], [h, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [d, C], [h, g]], [/droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [d, D], [h, g]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [d, D], [h, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [d, "OnePlus"], [h, g]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [d, w], [h, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [d, w], [h, g]], [/(playbook);[-\w\),; ]+(rim)/i], [u, d, [h, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [d, T], [h, g]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [d, S], [h, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [d, S], [h, g]], [/(nexus 9)/i], [u, [d, "HTC"], [h, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [d, [u, /_/g, " "], [h, g]], [/droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i], [u, [d, "TCL"], [h, _]], [/(itel) ((\w+))/i], [[d, H], u, [h, K, {
          tablet: ["p10001l", "w7001"],
          "*": "mobile"
        }]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [d, "Acer"], [h, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [d, "Meizu"], [h, g]], [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i], [u, [d, "Ulefone"], [h, g]], [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i], [u, [d, "Energizer"], [h, g]], [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i], [u, [d, "Cat"], [h, g]], [/((?:new )?andromax[\w- ]+)(?: bui|\))/i], [u, [d, "Smartfren"], [h, g]], [/droid.+; (a(?:015|06[35]|142p?))/i], [u, [d, "Nothing"], [h, g]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i, /; (imo) ((?!tab)[\w ]+?)(?: bui|\))/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [d, u, [h, g]], [/(imo) (tab \w+)/i, /(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [d, u, [h, _]], [/(surface duo)/i], [u, [d, I], [h, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [d, "Fairphone"], [h, g]], [/(u304aa)/i], [u, [d, "AT&T"], [h, g]], [/\bsie-(\w*)/i], [u, [d, "Siemens"], [h, g]], [/\b(rct\w+) b/i], [u, [d, "RCA"], [h, _]], [/\b(venue[\d ]{2,7}) b/i], [u, [d, "Dell"], [h, _]], [/\b(q(?:mv|ta)\w+) b/i], [u, [d, "Verizon"], [h, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [d, "Barnes & Noble"], [h, _]], [/\b(tm\d{3}\w+) b/i], [u, [d, "NuVision"], [h, _]], [/\b(k88) b/i], [u, [d, "ZTE"], [h, _]], [/\b(nx\d{3}j) b/i], [u, [d, "ZTE"], [h, g]], [/\b(gen\d{3}) b.+49h/i], [u, [d, "Swiss"], [h, g]], [/\b(zur\d{3}) b/i], [u, [d, "Swiss"], [h, _]], [/\b((zeki)?tb.*\b) b/i], [u, [d, "Zeki"], [h, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[d, "Dragon Touch"], u, [h, _]], [/\b(ns-?\w{0,9}) b/i], [u, [d, "Insignia"], [h, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [d, "NextBook"], [h, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[d, "Voice"], u, [h, g]], [/\b(lvtel\-)?(v1[12]) b/i], [[d, "LvTel"], u, [h, g]], [/\b(ph-1) /i], [u, [d, "Essential"], [h, g]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [d, "Envizen"], [h, _]], [/\b(trio[-\w\. ]+) b/i], [u, [d, "MachSpeed"], [h, _]], [/\btu_(1491) b/i], [u, [d, "Rotor"], [h, _]], [/(shield[\w ]+) b/i], [u, [d, "Nvidia"], [h, _]], [/(sprint) (\w+)/i], [d, u, [h, g]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [d, I], [h, g]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [d, B], [h, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [d, B], [h, g]], [/smart-tv.+(samsung)/i], [d, [h, y]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [d, M], [h, y]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[d, k], [h, y]], [/(apple) ?tv/i], [d, [u, E + " TV"], [h, y]], [/crkey/i], [[u, A + "cast"], [d, C], [h, y]], [/droid.+aft(\w+)( bui|\))/i], [u, [d, w], [h, y]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [d, N], [h, y]], [/(bravia[\w ]+)( bui|\))/i], [u, [d, D], [h, y]], [/(mitv-\w{5}) bui/i], [u, [d, U], [h, y]], [/Hbbtv.*(technisat) (.*);/i], [d, u, [h, y]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[d, q], [u, q], [h, y]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, y]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [d, u, [h, m]], [/droid.+; (shield) bui/i], [u, [d, "Nvidia"], [h, m]], [/(playstation [345portablevi]+)/i], [u, [d, D], [h, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [d, I], [h, m]], [/\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i], [u, [d, M], [h, v]], [/((pebble))app/i], [d, u, [h, v]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [d, E], [h, v]], [/droid.+; (glass) \d/i], [u, [d, C], [h, v]], [/droid.+; (wt63?0{2,3})\)/i], [u, [d, B], [h, v]], [/droid.+; (glass) \d/i], [u, [d, C], [h, v]], [/(pico) (4|neo3(?: link|pro)?)/i], [d, u, [h, v]], [/; (quest( \d| pro)?)/i], [u, [d, $], [h, v]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [d, [h, b]], [/(aeobc)\b/i], [u, [d, w], [h, b]], [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i], [u, [h, g]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [h, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, g]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [d, "Generic"]]],
        engine: [[/windows.+ edge\/([\w\.]+)/i], [p, [l, "EdgeHTML"]], [/(arkweb)\/([\w\.]+)/i], [l, p], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [p, [l, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [l, p], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [p, l]],
        os: [[/microsoft (windows) (vista|xp)/i], [l, p], [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i], [l, [p, K, Y]], [/windows nt 6\.2; (arm)/i, /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i, /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[p, K, Y], [l, "Windows"]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[p, /_/g, "."], [l, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[l, F], [p, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [p, l], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish|openharmony)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [l, p], [/\(bb(10);/i], [p, [l, T]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [p, [l, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [p, [l, O + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [p, [l, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [p, [l, "watchOS"]], [/crkey\/([\d\.]+)/i], [p, [l, A + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[l, j], p], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [l, p], [/(sunos) ?([\w\.\d]*)/i], [[l, "Solaris"], p], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [l, p]]
      };
      function J(t, e) {
        if (typeof t === o) {
          e = t;
          t = r;
        }
        if (!(this instanceof J)) {
          return new J(t, e).getResult();
        }
        var m = typeof n !== s && n.navigator ? n.navigator : r;
        var y = t || (m && m.userAgent ? m.userAgent : "");
        var v = m && m.userAgentData ? m.userAgentData : r;
        var b = e ? function (t, e) {
          var n = {};
          for (var r in t) {
            if (e[r] && e[r].length % 2 == 0) {
              n[r] = e[r].concat(t[r]);
            } else {
              n[r] = t[r];
            }
          }
          return n;
        }(X, e) : X;
        var w = m && m.userAgent == y;
        this.getBrowser = function () {
          var t;
          var e = {
            [l]: r,
            [p]: r
          };
          W.call(e, y, b.browser);
          e[c] = typeof (t = e[p]) === a ? t.replace(/[^\d\.]/g, "").split(".")[0] : r;
          if (w && m && m.brave && typeof m.brave.isBrave == i) {
            e[l] = "Brave";
          }
          return e;
        };
        this.getCPU = function () {
          var t = {
            [f]: r
          };
          W.call(t, y, b.cpu);
          return t;
        };
        this.getDevice = function () {
          var t = {
            [d]: r,
            [u]: r,
            [h]: r
          };
          W.call(t, y, b.device);
          if (w && !t[h] && v && v.mobile) {
            t[h] = g;
          }
          if (w && t[u] == "Macintosh" && m && typeof m.standalone !== s && m.maxTouchPoints && m.maxTouchPoints > 2) {
            t[u] = "iPad";
            t[h] = _;
          }
          return t;
        };
        this.getEngine = function () {
          var t = {
            [l]: r,
            [p]: r
          };
          W.call(t, y, b.engine);
          return t;
        };
        this.getOS = function () {
          var t = {
            [l]: r,
            [p]: r
          };
          W.call(t, y, b.os);
          if (w && !t[l] && v && v.platform && v.platform != "Unknown") {
            t[l] = v.platform.replace(/chrome os/i, j).replace(/macos/i, F);
          }
          return t;
        };
        this.getResult = function () {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function () {
          return y;
        };
        this.setUA = function (t) {
          y = typeof t === a && t.length > 500 ? q(t, 500) : t;
          return this;
        };
        this.setUA(y);
        return this;
      }
      J.VERSION = "1.0.40";
      J.BROWSER = G([l, p, c]);
      J.CPU = G([f]);
      J.DEVICE = G([u, d, h, m, g, y, _, v, b]);
      J.ENGINE = J.OS = G([l, p]);
      if (t.exports) {
        e = t.exports = J;
      }
      e.UAParser = J;
      var Q = typeof n !== s && (n.jQuery || n.Zepto);
      if (Q && !Q.ua) {
        var Z = new J();
        Q.ua = Z.getResult();
        Q.ua.get = function () {
          return Z.getUA();
        };
        Q.ua.set = function (t) {
          Z.setUA(t);
          var e = Z.getResult();
          for (var n in e) {
            Q.ua[n] = e[n];
          }
        };
      }
    })(typeof window == "object" ? window : xd);
  })(Td, Td.exports);
}
var Ad = Td.exports;
const Od = r(Ad);
var Cd;
var Pd;
var kd;
var Id;
var Rd;
function Ld(t) {
  return t != null;
}
function Md(t) {
  let e = Object.keys(t);
  if (e.length === 0) {
    return "";
  } else {
    e = e.sort();
    return JSON.stringify(e.map(e => [e, t[e]]));
  }
}
(function (t) {
  t[t.DELTA = 0] = "DELTA";
  t[t.CUMULATIVE = 1] = "CUMULATIVE";
})(Cd ||= {});
(function (t) {
  t.COUNTER = "COUNTER";
  t.GAUGE = "GAUGE";
  t.HISTOGRAM = "HISTOGRAM";
  t.UP_DOWN_COUNTER = "UP_DOWN_COUNTER";
  t.OBSERVABLE_COUNTER = "OBSERVABLE_COUNTER";
  t.OBSERVABLE_GAUGE = "OBSERVABLE_GAUGE";
  t.OBSERVABLE_UP_DOWN_COUNTER = "OBSERVABLE_UP_DOWN_COUNTER";
})(Pd ||= {});
(function (t) {
  t[t.HISTOGRAM = 0] = "HISTOGRAM";
  t[t.EXPONENTIAL_HISTOGRAM = 1] = "EXPONENTIAL_HISTOGRAM";
  t[t.GAUGE = 2] = "GAUGE";
  t[t.SUM = 3] = "SUM";
})(kd ||= {});
class Nd extends Error {
  constructor(t) {
    super(t);
    Object.setPrototypeOf(this, Nd.prototype);
  }
}
function Dd(t, e) {
  let n;
  const r = new Promise(function (t, r) {
    n = setTimeout(function () {
      r(new Nd("Operation timed out."));
    }, e);
  });
  return Promise.race([t, r]).then(t => {
    clearTimeout(n);
    return t;
  }, t => {
    clearTimeout(n);
    throw t;
  });
}
function Ud(t) {
  return t.status === "rejected";
}
function Bd(t, e) {
  const n = [];
  t.forEach(t => {
    n.push(...e(t));
  });
  return n;
}
(Rd = Id ||= {})[Rd.DROP = 0] = "DROP";
Rd[Rd.SUM = 1] = "SUM";
Rd[Rd.LAST_VALUE = 2] = "LAST_VALUE";
Rd[Rd.HISTOGRAM = 3] = "HISTOGRAM";
Rd[Rd.EXPONENTIAL_HISTOGRAM = 4] = "EXPONENTIAL_HISTOGRAM";
class $d {
  kind = Id.DROP;
  createAccumulation() {}
  merge(t, e) {}
  diff(t, e) {}
  toMetricData(t, e, n, r) {}
}
class jd {
  startTime;
  _boundaries;
  _recordMinMax;
  _current;
  constructor(t, e, n = true, r = function (t) {
    const e = t.map(() => 0);
    e.push(0);
    return {
      buckets: {
        boundaries: t,
        counts: e
      },
      sum: 0,
      count: 0,
      hasMinMax: false,
      min: Infinity,
      max: -Infinity
    };
  }(e)) {
    this.startTime = t;
    this._boundaries = e;
    this._recordMinMax = n;
    this._current = r;
  }
  record(t) {
    if (Number.isNaN(t)) {
      return;
    }
    this._current.count += 1;
    this._current.sum += t;
    if (this._recordMinMax) {
      this._current.min = Math.min(t, this._current.min);
      this._current.max = Math.max(t, this._current.max);
      this._current.hasMinMax = true;
    }
    const e = function (t, e) {
      let n = 0;
      let r = t.length - 1;
      let i = t.length;
      while (r >= n) {
        const s = n + Math.trunc((r - n) / 2);
        if (t[s] < e) {
          n = s + 1;
        } else {
          i = s;
          r = s - 1;
        }
      }
      return i;
    }(this._boundaries, t);
    this._current.buckets.counts[e] += 1;
  }
  setStartTime(t) {
    this.startTime = t;
  }
  toPointValue() {
    return this._current;
  }
}
class Fd {
  _boundaries;
  _recordMinMax;
  kind = Id.HISTOGRAM;
  constructor(t, e) {
    this._boundaries = t;
    this._recordMinMax = e;
  }
  createAccumulation(t) {
    return new jd(t, this._boundaries, this._recordMinMax);
  }
  merge(t, e) {
    const n = t.toPointValue();
    const r = e.toPointValue();
    const i = n.buckets.counts;
    const s = r.buckets.counts;
    const o = new Array(i.length);
    for (let u = 0; u < i.length; u++) {
      o[u] = i[u] + s[u];
    }
    let a = Infinity;
    let c = -Infinity;
    if (this._recordMinMax) {
      if (n.hasMinMax && r.hasMinMax) {
        a = Math.min(n.min, r.min);
        c = Math.max(n.max, r.max);
      } else if (n.hasMinMax) {
        a = n.min;
        c = n.max;
      } else if (r.hasMinMax) {
        a = r.min;
        c = r.max;
      }
    }
    return new jd(t.startTime, n.buckets.boundaries, this._recordMinMax, {
      buckets: {
        boundaries: n.buckets.boundaries,
        counts: o
      },
      count: n.count + r.count,
      sum: n.sum + r.sum,
      hasMinMax: this._recordMinMax && (n.hasMinMax || r.hasMinMax),
      min: a,
      max: c
    });
  }
  diff(t, e) {
    const n = t.toPointValue();
    const r = e.toPointValue();
    const i = n.buckets.counts;
    const s = r.buckets.counts;
    const o = new Array(i.length);
    for (let a = 0; a < i.length; a++) {
      o[a] = s[a] - i[a];
    }
    return new jd(e.startTime, n.buckets.boundaries, this._recordMinMax, {
      buckets: {
        boundaries: n.buckets.boundaries,
        counts: o
      },
      count: r.count - n.count,
      sum: r.sum - n.sum,
      hasMinMax: false,
      min: Infinity,
      max: -Infinity
    });
  }
  toMetricData(t, e, n, r) {
    return {
      descriptor: t,
      aggregationTemporality: e,
      dataPointType: kd.HISTOGRAM,
      dataPoints: n.map(([e, n]) => {
        const i = n.toPointValue();
        const s = t.type === Pd.GAUGE || t.type === Pd.UP_DOWN_COUNTER || t.type === Pd.OBSERVABLE_GAUGE || t.type === Pd.OBSERVABLE_UP_DOWN_COUNTER;
        return {
          attributes: e,
          startTime: n.startTime,
          endTime: r,
          value: {
            min: i.hasMinMax ? i.min : undefined,
            max: i.hasMinMax ? i.max : undefined,
            sum: s ? undefined : i.sum,
            buckets: i.buckets,
            count: i.count
          }
        };
      })
    };
  }
}
class zd {
  backing;
  indexBase;
  indexStart;
  indexEnd;
  constructor(t = new Gd(), e = 0, n = 0, r = 0) {
    this.backing = t;
    this.indexBase = e;
    this.indexStart = n;
    this.indexEnd = r;
  }
  get offset() {
    return this.indexStart;
  }
  get length() {
    if (this.backing.length === 0 || this.indexEnd === this.indexStart && this.at(0) === 0) {
      return 0;
    } else {
      return this.indexEnd - this.indexStart + 1;
    }
  }
  counts() {
    return Array.from({
      length: this.length
    }, (t, e) => this.at(e));
  }
  at(t) {
    const e = this.indexBase - this.indexStart;
    if (t < e) {
      t += this.backing.length;
    }
    t -= e;
    return this.backing.countAt(t);
  }
  incrementBucket(t, e) {
    this.backing.increment(t, e);
  }
  decrementBucket(t, e) {
    this.backing.decrement(t, e);
  }
  trim() {
    for (let t = 0; t < this.length; t++) {
      if (this.at(t) !== 0) {
        this.indexStart += t;
        break;
      }
      if (t === this.length - 1) {
        this.indexStart = this.indexEnd = this.indexBase = 0;
        return;
      }
    }
    for (let t = this.length - 1; t >= 0; t--) {
      if (this.at(t) !== 0) {
        this.indexEnd -= this.length - t - 1;
        break;
      }
    }
    this._rotate();
  }
  downscale(t) {
    this._rotate();
    const e = 1 + this.indexEnd - this.indexStart;
    const n = 1 << t;
    let r = 0;
    let i = 0;
    for (let s = this.indexStart; s <= this.indexEnd;) {
      let t = s % n;
      if (t < 0) {
        t += n;
      }
      for (let o = t; o < n && r < e; o++) {
        this._relocateBucket(i, r);
        r++;
        s++;
      }
      i++;
    }
    this.indexStart >>= t;
    this.indexEnd >>= t;
    this.indexBase = this.indexStart;
  }
  clone() {
    return new zd(this.backing.clone(), this.indexBase, this.indexStart, this.indexEnd);
  }
  _rotate() {
    const t = this.indexBase - this.indexStart;
    if (t !== 0) {
      if (t > 0) {
        this.backing.reverse(0, this.backing.length);
        this.backing.reverse(0, t);
        this.backing.reverse(t, this.backing.length);
      } else {
        this.backing.reverse(0, this.backing.length);
        this.backing.reverse(0, this.backing.length + t);
      }
      this.indexBase = this.indexStart;
    }
  }
  _relocateBucket(t, e) {
    if (t !== e) {
      this.incrementBucket(t, this.backing.emptyBucket(e));
    }
  }
}
class Gd {
  _counts;
  constructor(t = [0]) {
    this._counts = t;
  }
  get length() {
    return this._counts.length;
  }
  countAt(t) {
    return this._counts[t];
  }
  growTo(t, e, n) {
    const r = new Array(t).fill(0);
    r.splice(n, this._counts.length - e, ...this._counts.slice(e));
    r.splice(0, e, ...this._counts.slice(0, e));
    this._counts = r;
  }
  reverse(t, e) {
    const n = Math.floor((t + e) / 2) - t;
    for (let r = 0; r < n; r++) {
      const n = this._counts[t + r];
      this._counts[t + r] = this._counts[e - r - 1];
      this._counts[e - r - 1] = n;
    }
  }
  emptyBucket(t) {
    const e = this._counts[t];
    this._counts[t] = 0;
    return e;
  }
  increment(t, e) {
    this._counts[t] += e;
  }
  decrement(t, e) {
    if (this._counts[t] >= e) {
      this._counts[t] -= e;
    } else {
      this._counts[t] = 0;
    }
  }
  clone() {
    return new Gd([...this._counts]);
  }
}
const Vd = 1023;
const Hd = Vd;
const qd = Math.pow(2, -1022);
function Wd(t) {
  const e = new DataView(new ArrayBuffer(8));
  e.setFloat64(0, t);
  return ((e.getUint32(0) & 2146435072) >> 20) - Vd;
}
function Kd(t) {
  const e = new DataView(new ArrayBuffer(8));
  e.setFloat64(0, t);
  const n = e.getUint32(0);
  const r = e.getUint32(4);
  return (n & 1048575) * Math.pow(2, 32) + r;
}
function Yd(t, e) {
  if (t === 0 || t === Number.POSITIVE_INFINITY || t === Number.NEGATIVE_INFINITY || Number.isNaN(t)) {
    return t;
  } else {
    return t * Math.pow(2, e);
  }
}
class Xd extends Error {}
class Jd {
  _shift;
  constructor(t) {
    this._shift = -t;
  }
  mapToIndex(t) {
    if (t < qd) {
      return this._minNormalLowerBoundaryIndex();
    }
    return Wd(t) + this._rightShift(Kd(t) - 1, 52) >> this._shift;
  }
  lowerBoundary(t) {
    const e = this._minNormalLowerBoundaryIndex();
    if (t < e) {
      throw new Xd(`underflow: ${t} is < minimum lower boundary: ${e}`);
    }
    const n = this._maxNormalLowerBoundaryIndex();
    if (t > n) {
      throw new Xd(`overflow: ${t} is > maximum lower boundary: ${n}`);
    }
    return Yd(1, t << this._shift);
  }
  get scale() {
    if (this._shift === 0) {
      return 0;
    } else {
      return -this._shift;
    }
  }
  _minNormalLowerBoundaryIndex() {
    let t = -1022 >> this._shift;
    if (this._shift < 2) {
      t--;
    }
    return t;
  }
  _maxNormalLowerBoundaryIndex() {
    return Hd >> this._shift;
  }
  _rightShift(t, e) {
    return Math.floor(t * Math.pow(2, -e));
  }
}
class Qd {
  _scale;
  _scaleFactor;
  _inverseFactor;
  constructor(t) {
    this._scale = t;
    this._scaleFactor = Yd(Math.LOG2E, t);
    this._inverseFactor = Yd(Math.LN2, -t);
  }
  mapToIndex(t) {
    if (t <= qd) {
      return this._minNormalLowerBoundaryIndex() - 1;
    }
    if (Kd(t) === 0) {
      return (Wd(t) << this._scale) - 1;
    }
    const e = Math.floor(Math.log(t) * this._scaleFactor);
    const n = this._maxNormalLowerBoundaryIndex();
    if (e >= n) {
      return n;
    } else {
      return e;
    }
  }
  lowerBoundary(t) {
    const e = this._maxNormalLowerBoundaryIndex();
    if (t >= e) {
      if (t === e) {
        return Math.exp((t - (1 << this._scale)) / this._scaleFactor) * 2;
      }
      throw new Xd(`overflow: ${t} is > maximum lower boundary: ${e}`);
    }
    const n = this._minNormalLowerBoundaryIndex();
    if (t <= n) {
      if (t === n) {
        return qd;
      }
      if (t === n - 1) {
        return Math.exp((t + (1 << this._scale)) / this._scaleFactor) / 2;
      }
      throw new Xd(`overflow: ${t} is < minimum lower boundary: ${n}`);
    }
    return Math.exp(t * this._inverseFactor);
  }
  get scale() {
    return this._scale;
  }
  _minNormalLowerBoundaryIndex() {
    return -1022 << this._scale;
  }
  _maxNormalLowerBoundaryIndex() {
    return (1024 << this._scale) - 1;
  }
}
const Zd = Array.from({
  length: 31
}, (t, e) => e > 10 ? new Qd(e - 10) : new Jd(e - 10));
function tp(t) {
  if (t > 20 || t < -10) {
    throw new Xd(`expected scale >= -10 && <= 20, got: ${t}`);
  }
  return Zd[t + 10];
}
class ep {
  low;
  high;
  static combine(t, e) {
    return new ep(Math.min(t.low, e.low), Math.max(t.high, e.high));
  }
  constructor(t, e) {
    this.low = t;
    this.high = e;
  }
}
class np {
  startTime;
  _maxSize;
  _recordMinMax;
  _sum;
  _count;
  _zeroCount;
  _min;
  _max;
  _positive;
  _negative;
  _mapping;
  constructor(t = t, e = 160, n = true, r = 0, i = 0, s = 0, o = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY, c = new zd(), u = new zd(), l = tp(20)) {
    this.startTime = t;
    this._maxSize = e;
    this._recordMinMax = n;
    this._sum = r;
    this._count = i;
    this._zeroCount = s;
    this._min = o;
    this._max = a;
    this._positive = c;
    this._negative = u;
    this._mapping = l;
    if (this._maxSize < 2) {
      nc.warn(`Exponential Histogram Max Size set to ${this._maxSize},                 changing to the minimum size of: 2`);
      this._maxSize = 2;
    }
  }
  record(t) {
    this.updateByIncrement(t, 1);
  }
  setStartTime(t) {
    this.startTime = t;
  }
  toPointValue() {
    return {
      hasMinMax: this._recordMinMax,
      min: this.min,
      max: this.max,
      sum: this.sum,
      positive: {
        offset: this.positive.offset,
        bucketCounts: this.positive.counts()
      },
      negative: {
        offset: this.negative.offset,
        bucketCounts: this.negative.counts()
      },
      count: this.count,
      scale: this.scale,
      zeroCount: this.zeroCount
    };
  }
  get sum() {
    return this._sum;
  }
  get min() {
    return this._min;
  }
  get max() {
    return this._max;
  }
  get count() {
    return this._count;
  }
  get zeroCount() {
    return this._zeroCount;
  }
  get scale() {
    if (this._count === this._zeroCount) {
      return 0;
    } else {
      return this._mapping.scale;
    }
  }
  get positive() {
    return this._positive;
  }
  get negative() {
    return this._negative;
  }
  updateByIncrement(t, e) {
    if (!Number.isNaN(t)) {
      if (t > this._max) {
        this._max = t;
      }
      if (t < this._min) {
        this._min = t;
      }
      this._count += e;
      if (t !== 0) {
        this._sum += t * e;
        if (t > 0) {
          this._updateBuckets(this._positive, t, e);
        } else {
          this._updateBuckets(this._negative, -t, e);
        }
      } else {
        this._zeroCount += e;
      }
    }
  }
  merge(t) {
    if (this._count === 0) {
      this._min = t.min;
      this._max = t.max;
    } else if (t.count !== 0) {
      if (t.min < this.min) {
        this._min = t.min;
      }
      if (t.max > this.max) {
        this._max = t.max;
      }
    }
    this.startTime = t.startTime;
    this._sum += t.sum;
    this._count += t.count;
    this._zeroCount += t.zeroCount;
    const e = this._minScale(t);
    this._downscale(this.scale - e);
    this._mergeBuckets(this.positive, t, t.positive, e);
    this._mergeBuckets(this.negative, t, t.negative, e);
  }
  diff(t) {
    this._min = Infinity;
    this._max = -Infinity;
    this._sum -= t.sum;
    this._count -= t.count;
    this._zeroCount -= t.zeroCount;
    const e = this._minScale(t);
    this._downscale(this.scale - e);
    this._diffBuckets(this.positive, t, t.positive, e);
    this._diffBuckets(this.negative, t, t.negative, e);
  }
  clone() {
    return new np(this.startTime, this._maxSize, this._recordMinMax, this._sum, this._count, this._zeroCount, this._min, this._max, this.positive.clone(), this.negative.clone(), this._mapping);
  }
  _updateBuckets(t, e, n) {
    let r = this._mapping.mapToIndex(e);
    let i = false;
    let s = 0;
    let o = 0;
    if (t.length === 0) {
      t.indexStart = r;
      t.indexEnd = t.indexStart;
      t.indexBase = t.indexStart;
    } else if (r < t.indexStart && t.indexEnd - r >= this._maxSize) {
      i = true;
      o = r;
      s = t.indexEnd;
    } else if (r > t.indexEnd && r - t.indexStart >= this._maxSize) {
      i = true;
      o = t.indexStart;
      s = r;
    }
    if (i) {
      const t = this._changeScale(s, o);
      this._downscale(t);
      r = this._mapping.mapToIndex(e);
    }
    this._incrementIndexBy(t, r, n);
  }
  _incrementIndexBy(t, e, n) {
    if (n === 0) {
      return;
    }
    if (t.length === 0) {
      t.indexStart = t.indexEnd = t.indexBase = e;
    }
    if (e < t.indexStart) {
      const n = t.indexEnd - e;
      if (n >= t.backing.length) {
        this._grow(t, n + 1);
      }
      t.indexStart = e;
    } else if (e > t.indexEnd) {
      const n = e - t.indexStart;
      if (n >= t.backing.length) {
        this._grow(t, n + 1);
      }
      t.indexEnd = e;
    }
    let r = e - t.indexBase;
    if (r < 0) {
      r += t.backing.length;
    }
    t.incrementBucket(r, n);
  }
  _grow(t, e) {
    const n = t.backing.length;
    const r = t.indexBase - t.indexStart;
    const i = n - r;
    o = e;
    o--;
    o |= o >> 1;
    o |= o >> 2;
    o |= o >> 4;
    o |= o >> 8;
    o |= o >> 16;
    let s = ++o;
    var o;
    if (s > this._maxSize) {
      s = this._maxSize;
    }
    const a = s - r;
    t.backing.growTo(s, i, a);
  }
  _changeScale(t, e) {
    let n = 0;
    while (t - e >= this._maxSize) {
      t >>= 1;
      e >>= 1;
      n++;
    }
    return n;
  }
  _downscale(t) {
    if (t === 0) {
      return;
    }
    if (t < 0) {
      throw new Error(`impossible change of scale: ${this.scale}`);
    }
    const e = this._mapping.scale - t;
    this._positive.downscale(t);
    this._negative.downscale(t);
    this._mapping = tp(e);
  }
  _minScale(t) {
    const e = Math.min(this.scale, t.scale);
    const n = ep.combine(this._highLowAtScale(this.positive, this.scale, e), this._highLowAtScale(t.positive, t.scale, e));
    const r = ep.combine(this._highLowAtScale(this.negative, this.scale, e), this._highLowAtScale(t.negative, t.scale, e));
    return Math.min(e - this._changeScale(n.high, n.low), e - this._changeScale(r.high, r.low));
  }
  _highLowAtScale(t, e, n) {
    if (t.length === 0) {
      return new ep(0, -1);
    }
    const r = e - n;
    return new ep(t.indexStart >> r, t.indexEnd >> r);
  }
  _mergeBuckets(t, e, n, r) {
    const i = n.offset;
    const s = e.scale - r;
    for (let o = 0; o < n.length; o++) {
      this._incrementIndexBy(t, i + o >> s, n.at(o));
    }
  }
  _diffBuckets(t, e, n, r) {
    const i = n.offset;
    const s = e.scale - r;
    for (let o = 0; o < n.length; o++) {
      let e = (i + o >> s) - t.indexBase;
      if (e < 0) {
        e += t.backing.length;
      }
      t.decrementBucket(e, n.at(o));
    }
    t.trim();
  }
}
class rp {
  _maxSize;
  _recordMinMax;
  kind = Id.EXPONENTIAL_HISTOGRAM;
  constructor(t, e) {
    this._maxSize = t;
    this._recordMinMax = e;
  }
  createAccumulation(t) {
    return new np(t, this._maxSize, this._recordMinMax);
  }
  merge(t, e) {
    const n = e.clone();
    n.merge(t);
    return n;
  }
  diff(t, e) {
    const n = e.clone();
    n.diff(t);
    return n;
  }
  toMetricData(t, e, n, r) {
    return {
      descriptor: t,
      aggregationTemporality: e,
      dataPointType: kd.EXPONENTIAL_HISTOGRAM,
      dataPoints: n.map(([e, n]) => {
        const i = n.toPointValue();
        const s = t.type === Pd.GAUGE || t.type === Pd.UP_DOWN_COUNTER || t.type === Pd.OBSERVABLE_GAUGE || t.type === Pd.OBSERVABLE_UP_DOWN_COUNTER;
        return {
          attributes: e,
          startTime: n.startTime,
          endTime: r,
          value: {
            min: i.hasMinMax ? i.min : undefined,
            max: i.hasMinMax ? i.max : undefined,
            sum: s ? undefined : i.sum,
            positive: {
              offset: i.positive.offset,
              bucketCounts: i.positive.bucketCounts
            },
            negative: {
              offset: i.negative.offset,
              bucketCounts: i.negative.bucketCounts
            },
            count: i.count,
            scale: i.scale,
            zeroCount: i.zeroCount
          }
        };
      })
    };
  }
}
class ip {
  startTime;
  _current;
  sampleTime;
  constructor(t, e = 0, n = [0, 0]) {
    this.startTime = t;
    this._current = e;
    this.sampleTime = n;
  }
  record(t) {
    this._current = t;
    this.sampleTime = Al(Date.now());
  }
  setStartTime(t) {
    this.startTime = t;
  }
  toPointValue() {
    return this._current;
  }
}
class sp {
  kind = Id.LAST_VALUE;
  createAccumulation(t) {
    return new ip(t);
  }
  merge(t, e) {
    const n = kl(e.sampleTime) >= kl(t.sampleTime) ? e : t;
    return new ip(t.startTime, n.toPointValue(), n.sampleTime);
  }
  diff(t, e) {
    const n = kl(e.sampleTime) >= kl(t.sampleTime) ? e : t;
    return new ip(e.startTime, n.toPointValue(), n.sampleTime);
  }
  toMetricData(t, e, n, r) {
    return {
      descriptor: t,
      aggregationTemporality: e,
      dataPointType: kd.GAUGE,
      dataPoints: n.map(([t, e]) => ({
        attributes: t,
        startTime: e.startTime,
        endTime: r,
        value: e.toPointValue()
      }))
    };
  }
}
class op {
  startTime;
  monotonic;
  _current;
  reset;
  constructor(t, e, n = 0, r = false) {
    this.startTime = t;
    this.monotonic = e;
    this._current = n;
    this.reset = r;
  }
  record(t) {
    if (!this.monotonic || !(t < 0)) {
      this._current += t;
    }
  }
  setStartTime(t) {
    this.startTime = t;
  }
  toPointValue() {
    return this._current;
  }
}
class ap {
  monotonic;
  kind = Id.SUM;
  constructor(t) {
    this.monotonic = t;
  }
  createAccumulation(t) {
    return new op(t, this.monotonic);
  }
  merge(t, e) {
    const n = t.toPointValue();
    const r = e.toPointValue();
    if (e.reset) {
      return new op(e.startTime, this.monotonic, r, e.reset);
    } else {
      return new op(t.startTime, this.monotonic, n + r);
    }
  }
  diff(t, e) {
    const n = t.toPointValue();
    const r = e.toPointValue();
    if (this.monotonic && n > r) {
      return new op(e.startTime, this.monotonic, r, true);
    } else {
      return new op(e.startTime, this.monotonic, r - n);
    }
  }
  toMetricData(t, e, n, r) {
    return {
      descriptor: t,
      aggregationTemporality: e,
      dataPointType: kd.SUM,
      dataPoints: n.map(([t, e]) => ({
        attributes: t,
        startTime: e.startTime,
        endTime: r,
        value: e.toPointValue()
      })),
      isMonotonic: this.monotonic
    };
  }
}
class cp {
  static DEFAULT_INSTANCE = new $d();
  createAggregator(t) {
    return cp.DEFAULT_INSTANCE;
  }
}
class up {
  static MONOTONIC_INSTANCE = new ap(true);
  static NON_MONOTONIC_INSTANCE = new ap(false);
  createAggregator(t) {
    switch (t.type) {
      case Pd.COUNTER:
      case Pd.OBSERVABLE_COUNTER:
      case Pd.HISTOGRAM:
        return up.MONOTONIC_INSTANCE;
      default:
        return up.NON_MONOTONIC_INSTANCE;
    }
  }
}
class lp {
  static DEFAULT_INSTANCE = new sp();
  createAggregator(t) {
    return lp.DEFAULT_INSTANCE;
  }
}
class hp {
  static DEFAULT_INSTANCE = new Fd([0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 10000], true);
  createAggregator(t) {
    return hp.DEFAULT_INSTANCE;
  }
}
class dp {
  _recordMinMax;
  _boundaries;
  constructor(t, e = true) {
    this._recordMinMax = e;
    if (t == null) {
      throw new Error("ExplicitBucketHistogramAggregation should be created with explicit boundaries, if a single bucket histogram is required, please pass an empty array");
    }
    const n = (t = (t = t.concat()).sort((t, e) => t - e)).lastIndexOf(-Infinity);
    let r = t.indexOf(Infinity);
    if (r === -1) {
      r = undefined;
    }
    this._boundaries = t.slice(n + 1, r);
  }
  createAggregator(t) {
    return new Fd(this._boundaries, this._recordMinMax);
  }
}
class pp {
  _maxSize;
  _recordMinMax;
  constructor(t = 160, e = true) {
    this._maxSize = t;
    this._recordMinMax = e;
  }
  createAggregator(t) {
    return new rp(this._maxSize, this._recordMinMax);
  }
}
const fp = new cp();
const mp = new up();
const gp = new lp();
const _p = new hp();
const yp = new class {
  _resolve(t) {
    switch (t.type) {
      case Pd.COUNTER:
      case Pd.UP_DOWN_COUNTER:
      case Pd.OBSERVABLE_COUNTER:
      case Pd.OBSERVABLE_UP_DOWN_COUNTER:
        return mp;
      case Pd.GAUGE:
      case Pd.OBSERVABLE_GAUGE:
        return gp;
      case Pd.HISTOGRAM:
        if (t.advice.explicitBucketBoundaries) {
          return new dp(t.advice.explicitBucketBoundaries);
        } else {
          return _p;
        }
    }
    nc.warn(`Unable to recognize instrument type: ${t.type}`);
    return fp;
  }
  createAggregator(t) {
    return this._resolve(t).createAggregator(t);
  }
}();
var vp;
function bp(t) {
  switch (t.type) {
    case vp.DEFAULT:
      return yp;
    case vp.DROP:
      return fp;
    case vp.SUM:
      return mp;
    case vp.LAST_VALUE:
      return gp;
    case vp.EXPONENTIAL_HISTOGRAM:
      {
        const e = t;
        return new pp(e.options?.maxSize, e.options?.recordMinMax);
      }
    case vp.EXPLICIT_BUCKET_HISTOGRAM:
      {
        const e = t;
        if (e.options == null) {
          return _p;
        } else {
          return new dp(e.options?.boundaries, e.options?.recordMinMax);
        }
      }
    default:
      throw new Error("Unsupported Aggregation");
  }
}
(function (t) {
  t[t.DEFAULT = 0] = "DEFAULT";
  t[t.DROP = 1] = "DROP";
  t[t.SUM = 2] = "SUM";
  t[t.LAST_VALUE = 3] = "LAST_VALUE";
  t[t.EXPLICIT_BUCKET_HISTOGRAM = 4] = "EXPLICIT_BUCKET_HISTOGRAM";
  t[t.EXPONENTIAL_HISTOGRAM = 5] = "EXPONENTIAL_HISTOGRAM";
})(vp ||= {});
const wp = t => ({
  type: vp.DEFAULT
});
const Ep = t => Cd.CUMULATIVE;
class Sp {
  _shutdown = false;
  _metricProducers;
  _sdkMetricProducer;
  _aggregationTemporalitySelector;
  _aggregationSelector;
  _cardinalitySelector;
  constructor(t) {
    this._aggregationSelector = t?.aggregationSelector ?? wp;
    this._aggregationTemporalitySelector = t?.aggregationTemporalitySelector ?? Ep;
    this._metricProducers = t?.metricProducers ?? [];
    this._cardinalitySelector = t?.cardinalitySelector;
  }
  setMetricProducer(t) {
    if (this._sdkMetricProducer) {
      throw new Error("MetricReader can not be bound to a MeterProvider again.");
    }
    this._sdkMetricProducer = t;
    this.onInitialized();
  }
  selectAggregation(t) {
    return this._aggregationSelector(t);
  }
  selectAggregationTemporality(t) {
    return this._aggregationTemporalitySelector(t);
  }
  selectCardinalityLimit(t) {
    if (this._cardinalitySelector) {
      return this._cardinalitySelector(t);
    } else {
      return 2000;
    }
  }
  onInitialized() {}
  async collect(t) {
    if (this._sdkMetricProducer === undefined) {
      throw new Error("MetricReader is not bound to a MetricProducer");
    }
    if (this._shutdown) {
      throw new Error("MetricReader is shutdown");
    }
    const [e, ...n] = await Promise.all([this._sdkMetricProducer.collect({
      timeoutMillis: t?.timeoutMillis
    }), ...this._metricProducers.map(e => e.collect({
      timeoutMillis: t?.timeoutMillis
    }))]);
    const r = e.errors.concat(Bd(n, t => t.errors));
    return {
      resourceMetrics: {
        resource: e.resourceMetrics.resource,
        scopeMetrics: e.resourceMetrics.scopeMetrics.concat(Bd(n, t => t.resourceMetrics.scopeMetrics))
      },
      errors: r
    };
  }
  async shutdown(t) {
    if (this._shutdown) {
      nc.error("Cannot call shutdown twice.");
    } else {
      if (t?.timeoutMillis == null) {
        await this.onShutdown();
      } else {
        await Dd(this.onShutdown(), t.timeoutMillis);
      }
      this._shutdown = true;
    }
  }
  async forceFlush(t) {
    if (this._shutdown) {
      nc.warn("Cannot forceFlush on already shutdown MetricReader.");
    } else if (t?.timeoutMillis != null) {
      await Dd(this.onForceFlush(), t.timeoutMillis);
    } else {
      await this.onForceFlush();
    }
  }
}
class Tp extends Sp {
  _interval;
  _exporter;
  _exportInterval;
  _exportTimeout;
  constructor(t) {
    super({
      aggregationSelector: t.exporter.selectAggregation?.bind(t.exporter),
      aggregationTemporalitySelector: t.exporter.selectAggregationTemporality?.bind(t.exporter),
      metricProducers: t.metricProducers
    });
    if (t.exportIntervalMillis !== undefined && t.exportIntervalMillis <= 0) {
      throw Error("exportIntervalMillis must be greater than 0");
    }
    if (t.exportTimeoutMillis !== undefined && t.exportTimeoutMillis <= 0) {
      throw Error("exportTimeoutMillis must be greater than 0");
    }
    if (t.exportTimeoutMillis !== undefined && t.exportIntervalMillis !== undefined && t.exportIntervalMillis < t.exportTimeoutMillis) {
      throw Error("exportIntervalMillis must be greater than or equal to exportTimeoutMillis");
    }
    this._exportInterval = t.exportIntervalMillis ?? 60000;
    this._exportTimeout = t.exportTimeoutMillis ?? 30000;
    this._exporter = t.exporter;
  }
  async _runOnce() {
    try {
      await Dd(this._doRun(), this._exportTimeout);
    } catch (t) {
      if (t instanceof Nd) {
        nc.error("Export took longer than %s milliseconds and timed out.", this._exportTimeout);
        return;
      }
      El(t);
    }
  }
  async _doRun() {
    const {
      resourceMetrics: t,
      errors: e
    } = await this.collect({
      timeoutMillis: this._exportTimeout
    });
    if (e.length > 0) {
      nc.error("PeriodicExportingMetricReader: metrics collection errors", ...e);
    }
    if (t.resource.asyncAttributesPending) {
      try {
        await t.resource.waitForAsyncAttributes?.();
      } catch (r) {
        nc.debug("Error while resolving async portion of resource: ", r);
        El(r);
      }
    }
    if (t.scopeMetrics.length === 0) {
      return;
    }
    const n = await Ql._export(this._exporter, t);
    if (n.code !== Il.SUCCESS) {
      throw new Error(`PeriodicExportingMetricReader: metrics export failed (error ${n.error})`);
    }
  }
  onInitialized() {
    this._interval = setInterval(() => {
      this._runOnce();
    }, this._exportInterval);
    this._interval;
  }
  async onForceFlush() {
    await this._runOnce();
    await this._exporter.forceFlush();
  }
  async onShutdown() {
    if (this._interval) {
      clearInterval(this._interval);
    }
    await this.onForceFlush();
    await this._exporter.shutdown();
  }
}
class xp {
  _shutdown = false;
  _temporalitySelector;
  constructor(t) {
    this._temporalitySelector = t?.temporalitySelector ?? Ep;
  }
  export(t, e) {
    if (!this._shutdown) {
      return xp._sendMetrics(t, e);
    }
    setImmediate(e, {
      code: Il.FAILED
    });
  }
  forceFlush() {
    return Promise.resolve();
  }
  selectAggregationTemporality(t) {
    return this._temporalitySelector(t);
  }
  shutdown() {
    this._shutdown = true;
    return Promise.resolve();
  }
  static _sendMetrics(t, e) {
    for (const n of t.scopeMetrics) {
      for (const t of n.metrics) {
        console.dir({
          descriptor: t.descriptor,
          dataPointType: t.dataPointType,
          dataPoints: t.dataPoints
        }, {
          depth: null
        });
      }
    }
    e({
      code: Il.SUCCESS
    });
  }
}
class Ap {
  _registeredViews = [];
  addView(t) {
    this._registeredViews.push(t);
  }
  findViews(t, e) {
    return this._registeredViews.filter(n => this._matchInstrument(n.instrumentSelector, t) && this._matchMeter(n.meterSelector, e));
  }
  _matchInstrument(t, e) {
    return (t.getType() === undefined || e.type === t.getType()) && t.getNameFilter().match(e.name) && t.getUnitFilter().match(e.unit);
  }
  _matchMeter(t, e) {
    return t.getNameFilter().match(e.name) && (e.version === undefined || t.getVersionFilter().match(e.version)) && (e.schemaUrl === undefined || t.getSchemaUrlFilter().match(e.schemaUrl));
  }
}
function Op(t, e, n) {
  if (!function (t) {
    return t.match(Pp) != null;
  }(t)) {
    nc.warn(`Invalid metric name: "${t}". The metric name should be a ASCII string with a length no greater than 255 characters.`);
  }
  return {
    name: t,
    type: e,
    description: n?.description ?? "",
    unit: n?.unit ?? "",
    valueType: n?.valueType ?? Yo.DOUBLE,
    advice: n?.advice ?? {}
  };
}
function Cp(t, e) {
  n = t.name;
  r = e.name;
  return n.toLowerCase() === r.toLowerCase() && t.unit === e.unit && t.type === e.type && t.valueType === e.valueType;
  var n;
  var r;
}
const Pp = /^[a-z][a-z0-9_.\-/]{0,254}$/i;
class kp {
  _writableMetricStorage;
  _descriptor;
  constructor(t, e) {
    this._writableMetricStorage = t;
    this._descriptor = e;
  }
  _record(t, e = {}, n = ec.active()) {
    if (typeof t == "number") {
      if (this._descriptor.valueType !== Yo.INT || Number.isInteger(t) || (nc.warn(`INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`), t = Math.trunc(t), Number.isInteger(t))) {
        this._writableMetricStorage.record(t, e, n, Al(Date.now()));
      }
    } else {
      nc.warn(`non-number value provided to metric ${this._descriptor.name}: ${t}`);
    }
  }
}
class Ip extends kp {
  add(t, e, n) {
    this._record(t, e, n);
  }
}
class Rp extends kp {
  add(t, e, n) {
    if (t < 0) {
      nc.warn(`negative value provided to counter ${this._descriptor.name}: ${t}`);
    } else {
      this._record(t, e, n);
    }
  }
}
class Lp extends kp {
  record(t, e, n) {
    this._record(t, e, n);
  }
}
class Mp extends kp {
  record(t, e, n) {
    if (t < 0) {
      nc.warn(`negative value provided to histogram ${this._descriptor.name}: ${t}`);
    } else {
      this._record(t, e, n);
    }
  }
}
class Np {
  _observableRegistry;
  _metricStorages;
  _descriptor;
  constructor(t, e, n) {
    this._observableRegistry = n;
    this._descriptor = t;
    this._metricStorages = e;
  }
  addCallback(t) {
    this._observableRegistry.addCallback(t, this);
  }
  removeCallback(t) {
    this._observableRegistry.removeCallback(t, this);
  }
}
class Dp extends Np {}
class Up extends Np {}
class Bp extends Np {}
function $p(t) {
  return t instanceof Np;
}
class jp {
  _meterSharedState;
  constructor(t) {
    this._meterSharedState = t;
  }
  createGauge(t, e) {
    const n = Op(t, Pd.GAUGE, e);
    const r = this._meterSharedState.registerMetricStorage(n);
    return new Lp(r, n);
  }
  createHistogram(t, e) {
    const n = Op(t, Pd.HISTOGRAM, e);
    const r = this._meterSharedState.registerMetricStorage(n);
    return new Mp(r, n);
  }
  createCounter(t, e) {
    const n = Op(t, Pd.COUNTER, e);
    const r = this._meterSharedState.registerMetricStorage(n);
    return new Rp(r, n);
  }
  createUpDownCounter(t, e) {
    const n = Op(t, Pd.UP_DOWN_COUNTER, e);
    const r = this._meterSharedState.registerMetricStorage(n);
    return new Ip(r, n);
  }
  createObservableGauge(t, e) {
    const n = Op(t, Pd.OBSERVABLE_GAUGE, e);
    const r = this._meterSharedState.registerAsyncMetricStorage(n);
    return new Up(n, r, this._meterSharedState.observableRegistry);
  }
  createObservableCounter(t, e) {
    const n = Op(t, Pd.OBSERVABLE_COUNTER, e);
    const r = this._meterSharedState.registerAsyncMetricStorage(n);
    return new Dp(n, r, this._meterSharedState.observableRegistry);
  }
  createObservableUpDownCounter(t, e) {
    const n = Op(t, Pd.OBSERVABLE_UP_DOWN_COUNTER, e);
    const r = this._meterSharedState.registerAsyncMetricStorage(n);
    return new Bp(n, r, this._meterSharedState.observableRegistry);
  }
  addBatchObservableCallback(t, e) {
    this._meterSharedState.observableRegistry.addBatchCallback(t, e);
  }
  removeBatchObservableCallback(t, e) {
    this._meterSharedState.observableRegistry.removeBatchCallback(t, e);
  }
}
class Fp {
  _instrumentDescriptor;
  constructor(t) {
    this._instrumentDescriptor = t;
  }
  getInstrumentDescriptor() {
    return this._instrumentDescriptor;
  }
  updateDescription(t) {
    this._instrumentDescriptor = Op(this._instrumentDescriptor.name, this._instrumentDescriptor.type, {
      description: t,
      valueType: this._instrumentDescriptor.valueType,
      unit: this._instrumentDescriptor.unit,
      advice: this._instrumentDescriptor.advice
    });
  }
}
class zp {
  _hash;
  _valueMap = new Map();
  _keyMap = new Map();
  constructor(t) {
    this._hash = t;
  }
  get(t, e) {
    e ??= this._hash(t);
    return this._valueMap.get(e);
  }
  getOrDefault(t, e) {
    const n = this._hash(t);
    if (this._valueMap.has(n)) {
      return this._valueMap.get(n);
    }
    const r = e();
    if (!this._keyMap.has(n)) {
      this._keyMap.set(n, t);
    }
    this._valueMap.set(n, r);
    return r;
  }
  set(t, e, n) {
    n ??= this._hash(t);
    if (!this._keyMap.has(n)) {
      this._keyMap.set(n, t);
    }
    this._valueMap.set(n, e);
  }
  has(t, e) {
    e ??= this._hash(t);
    return this._valueMap.has(e);
  }
  *keys() {
    const t = this._keyMap.entries();
    let e = t.next();
    while (e.done !== true) {
      yield [e.value[1], e.value[0]];
      e = t.next();
    }
  }
  *entries() {
    const t = this._valueMap.entries();
    let e = t.next();
    while (e.done !== true) {
      yield [this._keyMap.get(e.value[0]), e.value[1], e.value[0]];
      e = t.next();
    }
  }
  get size() {
    return this._valueMap.size;
  }
}
class Gp extends zp {
  constructor() {
    super(Md);
  }
}
class Vp {
  _aggregator;
  _activeCollectionStorage = new Gp();
  _cumulativeMemoStorage = new Gp();
  _cardinalityLimit;
  _overflowAttributes = {
    "otel.metric.overflow": true
  };
  _overflowHashCode;
  constructor(t, e) {
    this._aggregator = t;
    this._cardinalityLimit = (e ?? 2000) - 1;
    this._overflowHashCode = Md(this._overflowAttributes);
  }
  record(t, e, n, r) {
    let i = this._activeCollectionStorage.get(e);
    if (!i) {
      if (this._activeCollectionStorage.size >= this._cardinalityLimit) {
        const e = this._activeCollectionStorage.getOrDefault(this._overflowAttributes, () => this._aggregator.createAccumulation(r));
        e?.record(t);
        return;
      }
      i = this._aggregator.createAccumulation(r);
      this._activeCollectionStorage.set(e, i);
    }
    i?.record(t);
  }
  batchCumulate(t, e) {
    Array.from(t.entries()).forEach(([t, n, r]) => {
      const i = this._aggregator.createAccumulation(e);
      i?.record(n);
      let s = i;
      if (this._cumulativeMemoStorage.has(t, r)) {
        const e = this._cumulativeMemoStorage.get(t, r);
        s = this._aggregator.diff(e, i);
      } else if (this._cumulativeMemoStorage.size >= this._cardinalityLimit && (t = this._overflowAttributes, r = this._overflowHashCode, this._cumulativeMemoStorage.has(t, r))) {
        const e = this._cumulativeMemoStorage.get(t, r);
        s = this._aggregator.diff(e, i);
      }
      if (this._activeCollectionStorage.has(t, r)) {
        const e = this._activeCollectionStorage.get(t, r);
        s = this._aggregator.merge(e, s);
      }
      this._cumulativeMemoStorage.set(t, i, r);
      this._activeCollectionStorage.set(t, s, r);
    });
  }
  collect() {
    const t = this._activeCollectionStorage;
    this._activeCollectionStorage = new Gp();
    return t;
  }
}
class Hp {
  _aggregator;
  _unreportedAccumulations = new Map();
  _reportHistory = new Map();
  constructor(t, e) {
    this._aggregator = t;
    e.forEach(t => {
      this._unreportedAccumulations.set(t, []);
    });
  }
  buildMetrics(t, e, n, r) {
    this._stashAccumulations(n);
    const i = this._getMergedUnreportedAccumulations(t);
    let s;
    let o = i;
    if (this._reportHistory.has(t)) {
      const e = this._reportHistory.get(t);
      const n = e.collectionTime;
      s = e.aggregationTemporality;
      o = s === Cd.CUMULATIVE ? Hp.merge(e.accumulations, i, this._aggregator) : Hp.calibrateStartTime(e.accumulations, i, n);
    } else {
      s = t.selectAggregationTemporality(e.type);
    }
    this._reportHistory.set(t, {
      accumulations: o,
      collectionTime: r,
      aggregationTemporality: s
    });
    c = o;
    const a = Array.from(c.entries());
    var c;
    if (a.length !== 0) {
      return this._aggregator.toMetricData(e, s, a, r);
    }
  }
  _stashAccumulations(t) {
    const e = this._unreportedAccumulations.keys();
    for (const n of e) {
      let e = this._unreportedAccumulations.get(n);
      if (e === undefined) {
        e = [];
        this._unreportedAccumulations.set(n, e);
      }
      e.push(t);
    }
  }
  _getMergedUnreportedAccumulations(t) {
    let e = new Gp();
    const n = this._unreportedAccumulations.get(t);
    this._unreportedAccumulations.set(t, []);
    if (n === undefined) {
      return e;
    }
    for (const r of n) {
      e = Hp.merge(e, r, this._aggregator);
    }
    return e;
  }
  static merge(t, e, n) {
    const r = t;
    const i = e.entries();
    let s = i.next();
    while (s.done !== true) {
      const [e, o, a] = s.value;
      if (t.has(e, a)) {
        const i = t.get(e, a);
        const s = n.merge(i, o);
        r.set(e, s, a);
      } else {
        r.set(e, o, a);
      }
      s = i.next();
    }
    return r;
  }
  static calibrateStartTime(t, e, n) {
    for (const [r, i] of t.keys()) {
      const t = e.get(r, i);
      t?.setStartTime(n);
    }
    return e;
  }
}
class qp extends Fp {
  _attributesProcessor;
  _aggregationCardinalityLimit;
  _deltaMetricStorage;
  _temporalMetricStorage;
  constructor(t, e, n, r, i) {
    super(t);
    this._attributesProcessor = n;
    this._aggregationCardinalityLimit = i;
    this._deltaMetricStorage = new Vp(e, this._aggregationCardinalityLimit);
    this._temporalMetricStorage = new Hp(e, r);
  }
  record(t, e) {
    const n = new Gp();
    Array.from(t.entries()).forEach(([t, e]) => {
      n.set(this._attributesProcessor.process(t), e);
    });
    this._deltaMetricStorage.batchCumulate(n, e);
  }
  collect(t, e) {
    const n = this._deltaMetricStorage.collect();
    return this._temporalMetricStorage.buildMetrics(t, this._instrumentDescriptor, n, e);
  }
}
function Wp(t, e) {
  let n = "";
  if (t.unit !== e.unit) {
    n += `\t- Unit '${t.unit}' does not match '${e.unit}'\n`;
  }
  if (t.type !== e.type) {
    n += `\t- Type '${t.type}' does not match '${e.type}'\n`;
  }
  if (t.valueType !== e.valueType) {
    n += `\t- Value Type '${t.valueType}' does not match '${e.valueType}'\n`;
  }
  if (t.description !== e.description) {
    n += `\t- Description '${t.description}' does not match '${e.description}'\n`;
  }
  return n;
}
function Kp(t, e) {
  if (t.valueType !== e.valueType) {
    return function (t, e) {
      return `\t- use valueType '${t.valueType}' on instrument creation or use an instrument name other than '${e.name}'`;
    }(t, e);
  } else if (t.unit !== e.unit) {
    return function (t, e) {
      return `\t- use unit '${t.unit}' on instrument creation or use an instrument name other than '${e.name}'`;
    }(t, e);
  } else if (t.type !== e.type) {
    return function (t, e) {
      const n = {
        name: e.name,
        type: e.type,
        unit: e.unit
      };
      const r = JSON.stringify(n);
      return `\t- create a new view with a name other than '${t.name}' and InstrumentSelector '${r}'`;
    }(t, e);
  } else if (t.description !== e.description) {
    return function (t, e) {
      const n = {
        name: e.name,
        type: e.type,
        unit: e.unit
      };
      const r = JSON.stringify(n);
      return `\t- create a new view with a name other than '${t.name}' and InstrumentSelector '${r}'\n    \t- OR - create a new view with the name ${t.name} and description '${t.description}' and InstrumentSelector ${r}\n    \t- OR - create a new view with the name ${e.name} and description '${t.description}' and InstrumentSelector ${r}`;
    }(t, e);
  } else {
    return "";
  }
}
class Yp {
  _sharedRegistry = new Map();
  _perCollectorRegistry = new Map();
  static create() {
    return new Yp();
  }
  getStorages(t) {
    let e = [];
    for (const r of this._sharedRegistry.values()) {
      e = e.concat(r);
    }
    const n = this._perCollectorRegistry.get(t);
    if (n != null) {
      for (const r of n.values()) {
        e = e.concat(r);
      }
    }
    return e;
  }
  register(t) {
    this._registerStorage(t, this._sharedRegistry);
  }
  registerForCollector(t, e) {
    let n = this._perCollectorRegistry.get(t);
    if (n == null) {
      n = new Map();
      this._perCollectorRegistry.set(t, n);
    }
    this._registerStorage(e, n);
  }
  findOrUpdateCompatibleStorage(t) {
    const e = this._sharedRegistry.get(t.name);
    if (e === undefined) {
      return null;
    } else {
      return this._findOrUpdateCompatibleStorage(t, e);
    }
  }
  findOrUpdateCompatibleCollectorStorage(t, e) {
    const n = this._perCollectorRegistry.get(t);
    if (n === undefined) {
      return null;
    }
    const r = n.get(e.name);
    if (r === undefined) {
      return null;
    } else {
      return this._findOrUpdateCompatibleStorage(e, r);
    }
  }
  _registerStorage(t, e) {
    const n = t.getInstrumentDescriptor();
    const r = e.get(n.name);
    if (r !== undefined) {
      r.push(t);
    } else {
      e.set(n.name, [t]);
    }
  }
  _findOrUpdateCompatibleStorage(t, e) {
    let n = null;
    for (const r of e) {
      const e = r.getInstrumentDescriptor();
      if (Cp(e, t)) {
        if (e.description !== t.description) {
          if (t.description.length > e.description.length) {
            r.updateDescription(t.description);
          }
          nc.warn("A view or instrument with the name ", t.name, " has already been registered, but has a different description and is incompatible with another registered view.\n", "Details:\n", Wp(e, t), "The longer description will be used.\nTo resolve the conflict:", Kp(e, t));
        }
        n = r;
      } else {
        nc.warn("A view or instrument with the name ", t.name, " has already been registered and is incompatible with another registered view.\n", "Details:\n", Wp(e, t), "To resolve the conflict:\n", Kp(e, t));
      }
    }
    return n;
  }
}
class Xp {
  _backingStorages;
  constructor(t) {
    this._backingStorages = t;
  }
  record(t, e, n, r) {
    this._backingStorages.forEach(i => {
      i.record(t, e, n, r);
    });
  }
}
class Jp {
  _instrumentName;
  _valueType;
  _buffer = new Gp();
  constructor(t, e) {
    this._instrumentName = t;
    this._valueType = e;
  }
  observe(t, e = {}) {
    if (typeof t == "number") {
      if (this._valueType !== Yo.INT || Number.isInteger(t) || (nc.warn(`INT value type cannot accept a floating-point value for ${this._instrumentName}, ignoring the fractional digits.`), t = Math.trunc(t), Number.isInteger(t))) {
        this._buffer.set(e, t);
      }
    } else {
      nc.warn(`non-number value provided to metric ${this._instrumentName}: ${t}`);
    }
  }
}
class Qp {
  _buffer = new Map();
  observe(t, e, n = {}) {
    if (!$p(t)) {
      return;
    }
    let r = this._buffer.get(t);
    if (r == null) {
      r = new Gp();
      this._buffer.set(t, r);
    }
    if (typeof e == "number") {
      if (t._descriptor.valueType !== Yo.INT || Number.isInteger(e) || (nc.warn(`INT value type cannot accept a floating-point value for ${t._descriptor.name}, ignoring the fractional digits.`), e = Math.trunc(e), Number.isInteger(e))) {
        r.set(n, e);
      }
    } else {
      nc.warn(`non-number value provided to metric ${t._descriptor.name}: ${e}`);
    }
  }
}
class Zp {
  _callbacks = [];
  _batchCallbacks = [];
  addCallback(t, e) {
    if (!(this._findCallback(t, e) >= 0)) {
      this._callbacks.push({
        callback: t,
        instrument: e
      });
    }
  }
  removeCallback(t, e) {
    const n = this._findCallback(t, e);
    if (!(n < 0)) {
      this._callbacks.splice(n, 1);
    }
  }
  addBatchCallback(t, e) {
    const n = new Set(e.filter($p));
    if (n.size === 0) {
      nc.error("BatchObservableCallback is not associated with valid instruments", e);
      return;
    }
    if (!(this._findBatchCallback(t, n) >= 0)) {
      this._batchCallbacks.push({
        callback: t,
        instruments: n
      });
    }
  }
  removeBatchCallback(t, e) {
    const n = new Set(e.filter($p));
    const r = this._findBatchCallback(t, n);
    if (!(r < 0)) {
      this._batchCallbacks.splice(r, 1);
    }
  }
  async observe(t, e) {
    const n = this._observeCallbacks(t, e);
    const r = this._observeBatchCallbacks(t, e);
    return (await async function (t) {
      return Promise.all(t.map(async t => {
        try {
          return {
            status: "fulfilled",
            value: await t
          };
        } catch (e) {
          return {
            status: "rejected",
            reason: e
          };
        }
      }));
    }([...n, ...r])).filter(Ud).map(t => t.reason);
  }
  _observeCallbacks(t, e) {
    return this._callbacks.map(async ({
      callback: n,
      instrument: r
    }) => {
      const i = new Jp(r._descriptor.name, r._descriptor.valueType);
      let s = Promise.resolve(n(i));
      if (e != null) {
        s = Dd(s, e);
      }
      await s;
      r._metricStorages.forEach(e => {
        e.record(i._buffer, t);
      });
    });
  }
  _observeBatchCallbacks(t, e) {
    return this._batchCallbacks.map(async ({
      callback: n,
      instruments: r
    }) => {
      const i = new Qp();
      let s = Promise.resolve(n(i));
      if (e != null) {
        s = Dd(s, e);
      }
      await s;
      r.forEach(e => {
        const n = i._buffer.get(e);
        if (n != null) {
          e._metricStorages.forEach(e => {
            e.record(n, t);
          });
        }
      });
    });
  }
  _findCallback(t, e) {
    return this._callbacks.findIndex(n => n.callback === t && n.instrument === e);
  }
  _findBatchCallback(t, e) {
    return this._batchCallbacks.findIndex(n => n.callback === t && function (t, e) {
      if (t.size !== e.size) {
        return false;
      }
      for (const n of t) {
        if (!e.has(n)) {
          return false;
        }
      }
      return true;
    }(n.instruments, e));
  }
}
class tf extends Fp {
  _attributesProcessor;
  _aggregationCardinalityLimit;
  _deltaMetricStorage;
  _temporalMetricStorage;
  constructor(t, e, n, r, i) {
    super(t);
    this._attributesProcessor = n;
    this._aggregationCardinalityLimit = i;
    this._deltaMetricStorage = new Vp(e, this._aggregationCardinalityLimit);
    this._temporalMetricStorage = new Hp(e, r);
  }
  record(t, e, n, r) {
    e = this._attributesProcessor.process(e, n);
    this._deltaMetricStorage.record(t, e, n, r);
  }
  collect(t, e) {
    const n = this._deltaMetricStorage.collect();
    return this._temporalMetricStorage.buildMetrics(t, this._instrumentDescriptor, n, e);
  }
}
class ef {
  _processors;
  constructor(t) {
    this._processors = t;
  }
  process(t, e) {
    let n = t;
    for (const r of this._processors) {
      n = r.process(n, e);
    }
    return n;
  }
}
function nf() {
  return rf;
}
const rf = new class {
  process(t, e) {
    return t;
  }
}();
class sf {
  _meterProviderSharedState;
  _instrumentationScope;
  metricStorageRegistry = new Yp();
  observableRegistry = new Zp();
  meter;
  constructor(t, e) {
    this._meterProviderSharedState = t;
    this._instrumentationScope = e;
    this.meter = new jp(this);
  }
  registerMetricStorage(t) {
    const e = this._registerMetricStorage(t, tf);
    if (e.length === 1) {
      return e[0];
    } else {
      return new Xp(e);
    }
  }
  registerAsyncMetricStorage(t) {
    return this._registerMetricStorage(t, qp);
  }
  async collect(t, e, n) {
    const r = await this.observableRegistry.observe(e, n?.timeoutMillis);
    const i = this.metricStorageRegistry.getStorages(t);
    if (i.length === 0) {
      return null;
    }
    const s = i.map(n => n.collect(t, e)).filter(Ld);
    if (s.length === 0) {
      return {
        errors: r
      };
    } else {
      return {
        scopeMetrics: {
          scope: this._instrumentationScope,
          metrics: s
        },
        errors: r
      };
    }
  }
  _registerMetricStorage(t, e) {
    let n = this._meterProviderSharedState.viewRegistry.findViews(t, this._instrumentationScope).map(n => {
      const r = function (t, e) {
        return {
          name: t.name ?? e.name,
          description: t.description ?? e.description,
          type: e.type,
          unit: e.unit,
          valueType: e.valueType,
          advice: e.advice
        };
      }(n, t);
      const i = this.metricStorageRegistry.findOrUpdateCompatibleStorage(r);
      if (i != null) {
        return i;
      }
      const s = n.aggregation.createAggregator(r);
      const o = new e(r, s, n.attributesProcessor, this._meterProviderSharedState.metricCollectors, n.aggregationCardinalityLimit);
      this.metricStorageRegistry.register(o);
      return o;
    });
    if (n.length === 0) {
      const r = this._meterProviderSharedState.selectAggregations(t.type).map(([n, r]) => {
        const i = this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(n, t);
        if (i != null) {
          return i;
        }
        const s = r.createAggregator(t);
        const o = n.selectCardinalityLimit(t.type);
        const a = new e(t, s, nf(), [n], o);
        this.metricStorageRegistry.registerForCollector(n, a);
        return a;
      });
      n = n.concat(r);
    }
    return n;
  }
}
class of {
  resource;
  viewRegistry = new Ap();
  metricCollectors = [];
  meterSharedStates = new Map();
  constructor(t) {
    this.resource = t;
  }
  getMeterSharedState(t) {
    const e = function (t) {
      return `${t.name}:${t.version ?? ""}:${t.schemaUrl ?? ""}`;
    }(t);
    let n = this.meterSharedStates.get(e);
    if (n == null) {
      n = new sf(this, t);
      this.meterSharedStates.set(e, n);
    }
    return n;
  }
  selectAggregations(t) {
    const e = [];
    for (const n of this.metricCollectors) {
      e.push([n, bp(n.selectAggregation(t))]);
    }
    return e;
  }
}
class af {
  _sharedState;
  _metricReader;
  constructor(t, e) {
    this._sharedState = t;
    this._metricReader = e;
  }
  async collect(t) {
    const e = Al(Date.now());
    const n = [];
    const r = [];
    const i = Array.from(this._sharedState.meterSharedStates.values()).map(async i => {
      const s = await i.collect(this, e, t);
      if (s?.scopeMetrics != null) {
        n.push(s.scopeMetrics);
      }
      if (s?.errors != null) {
        r.push(...s.errors);
      }
    });
    await Promise.all(i);
    return {
      resourceMetrics: {
        resource: this._sharedState.resource,
        scopeMetrics: n
      },
      errors: r
    };
  }
  async forceFlush(t) {
    await this._metricReader.forceFlush(t);
  }
  async shutdown(t) {
    await this._metricReader.shutdown(t);
  }
  selectAggregationTemporality(t) {
    return this._metricReader.selectAggregationTemporality(t);
  }
  selectAggregation(t) {
    return this._metricReader.selectAggregation(t);
  }
  selectCardinalityLimit(t) {
    return this._metricReader.selectCardinalityLimit?.(t) ?? 2000;
  }
}
const cf = /[\^$\\.+?()[\]{}|]/g;
class uf {
  _matchAll;
  _regexp;
  constructor(t) {
    if (t === "*") {
      this._matchAll = true;
      this._regexp = /.*/;
    } else {
      this._matchAll = false;
      this._regexp = new RegExp(uf.escapePattern(t));
    }
  }
  match(t) {
    return !!this._matchAll || this._regexp.test(t);
  }
  static escapePattern(t) {
    return `^${t.replace(cf, "\\$&").replace("*", ".*")}$`;
  }
  static hasWildcard(t) {
    return t.includes("*");
  }
}
class lf {
  _matchAll;
  _pattern;
  constructor(t) {
    this._matchAll = t === undefined;
    this._pattern = t;
  }
  match(t) {
    return !!this._matchAll || t === this._pattern;
  }
}
class hf {
  _nameFilter;
  _type;
  _unitFilter;
  constructor(t) {
    this._nameFilter = new uf(t?.name ?? "*");
    this._type = t?.type;
    this._unitFilter = new lf(t?.unit);
  }
  getType() {
    return this._type;
  }
  getNameFilter() {
    return this._nameFilter;
  }
  getUnitFilter() {
    return this._unitFilter;
  }
}
class df {
  _nameFilter;
  _versionFilter;
  _schemaUrlFilter;
  constructor(t) {
    this._nameFilter = new lf(t?.name);
    this._versionFilter = new lf(t?.version);
    this._schemaUrlFilter = new lf(t?.schemaUrl);
  }
  getNameFilter() {
    return this._nameFilter;
  }
  getVersionFilter() {
    return this._versionFilter;
  }
  getSchemaUrlFilter() {
    return this._schemaUrlFilter;
  }
}
class pf {
  name;
  description;
  aggregation;
  attributesProcessor;
  instrumentSelector;
  meterSelector;
  aggregationCardinalityLimit;
  constructor(t) {
    var e;
    (function (t) {
      if ((e = t).instrumentName == null && e.instrumentType == null && e.instrumentUnit == null && e.meterName == null && e.meterVersion == null && e.meterSchemaUrl == null) {
        throw new Error("Cannot create view with no selector arguments supplied");
      }
      var e;
      if (t.name != null && (t?.instrumentName == null || uf.hasWildcard(t.instrumentName))) {
        throw new Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.");
      }
    })(t);
    if (t.attributesProcessors != null) {
      this.attributesProcessor = (e = t.attributesProcessors, new ef(e));
    } else {
      this.attributesProcessor = nf();
    }
    this.name = t.name;
    this.description = t.description;
    this.aggregation = bp(t.aggregation ?? {
      type: vp.DEFAULT
    });
    this.instrumentSelector = new hf({
      name: t.instrumentName,
      type: t.instrumentType,
      unit: t.instrumentUnit
    });
    this.meterSelector = new df({
      name: t.meterName,
      version: t.meterVersion,
      schemaUrl: t.meterSchemaUrl
    });
    this.aggregationCardinalityLimit = t.aggregationCardinalityLimit;
  }
}
class ff {
  _sharedState;
  _shutdown = false;
  constructor(t) {
    this._sharedState = new of(t?.resource ?? Dc());
    if (t?.views != null && t.views.length > 0) {
      for (const e of t.views) {
        this._sharedState.viewRegistry.addView(new pf(e));
      }
    }
    if (t?.readers != null && t.readers.length > 0) {
      for (const e of t.readers) {
        const t = new af(this._sharedState, e);
        e.setMetricProducer(t);
        this._sharedState.metricCollectors.push(t);
      }
    }
  }
  getMeter(t, e = "", n = {}) {
    if (this._shutdown) {
      nc.warn("A shutdown MeterProvider cannot provide a Meter");
      return ha;
    } else {
      return this._sharedState.getMeterSharedState({
        name: t,
        version: e,
        schemaUrl: n.schemaUrl
      }).meter;
    }
  }
  async shutdown(t) {
    if (this._shutdown) {
      nc.warn("shutdown may only be called once per MeterProvider");
    } else {
      this._shutdown = true;
      await Promise.all(this._sharedState.metricCollectors.map(e => e.shutdown(t)));
    }
  }
  async forceFlush(t) {
    if (this._shutdown) {
      nc.warn("invalid attempt to force flush after MeterProvider shutdown");
    } else {
      await Promise.all(this._sharedState.metricCollectors.map(e => e.forceFlush(t)));
    }
  }
}
class mf {
  emit(t) {}
}
const gf = new mf();
const _f = new class {
  getLogger(t, e, n) {
    return new mf();
  }
}();
class yf {
  constructor(t, e, n, r) {
    this._provider = t;
    this.name = e;
    this.version = n;
    this.options = r;
  }
  emit(t) {
    this._getLogger().emit(t);
  }
  _getLogger() {
    if (this._delegate) {
      return this._delegate;
    }
    const t = this._provider.getDelegateLogger(this.name, this.version, this.options);
    if (t) {
      this._delegate = t;
      return this._delegate;
    } else {
      return gf;
    }
  }
}
class vf {
  getLogger(t, e, n) {
    return this.getDelegateLogger(t, e, n) ?? new yf(this, t, e, n);
  }
  getDelegate() {
    return this._delegate ?? _f;
  }
  setDelegate(t) {
    this._delegate = t;
  }
  getDelegateLogger(t, e, n) {
    var r;
    if ((r = this._delegate) === null || r === undefined) {
      return undefined;
    } else {
      return r.getLogger(t, e, n);
    }
  }
}
const bf = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {};
const wf = Symbol.for("io.opentelemetry.js.api.logs");
const Ef = bf;
class Sf {
  constructor() {
    this._proxyLoggerProvider = new vf();
  }
  static getInstance() {
    this._instance ||= new Sf();
    return this._instance;
  }
  setGlobalLoggerProvider(t) {
    if (Ef[wf]) {
      return this.getLoggerProvider();
    } else {
      e = 1;
      n = t;
      r = _f;
      Ef[wf] = t => t === e ? n : r;
      this._proxyLoggerProvider.setDelegate(t);
      return t;
    }
    var e;
    var n;
    var r;
  }
  getLoggerProvider() {
    var t;
    return ((t = Ef[wf]) === null || t === undefined ? undefined : t.call(Ef, 1)) ?? this._proxyLoggerProvider;
  }
  getLogger(t, e, n) {
    return this.getLoggerProvider().getLogger(t, e, n);
  }
  disable() {
    delete Ef[wf];
    this._proxyLoggerProvider = new vf();
  }
}
const Tf = Sf.getInstance();
class xf {
  hrTime;
  hrTimeObserved;
  spanContext;
  resource;
  instrumentationScope;
  attributes = {};
  _severityText;
  _severityNumber;
  _body;
  _eventName;
  totalAttributesCount = 0;
  _isReadonly = false;
  _logRecordLimits;
  set severityText(t) {
    if (!this._isLogRecordReadonly()) {
      this._severityText = t;
    }
  }
  get severityText() {
    return this._severityText;
  }
  set severityNumber(t) {
    if (!this._isLogRecordReadonly()) {
      this._severityNumber = t;
    }
  }
  get severityNumber() {
    return this._severityNumber;
  }
  set body(t) {
    if (!this._isLogRecordReadonly()) {
      this._body = t;
    }
  }
  get body() {
    return this._body;
  }
  get eventName() {
    return this._eventName;
  }
  set eventName(t) {
    if (!this._isLogRecordReadonly()) {
      this._eventName = t;
    }
  }
  get droppedAttributesCount() {
    return this.totalAttributesCount - Object.keys(this.attributes).length;
  }
  constructor(t, e, n) {
    const {
      timestamp: r,
      observedTimestamp: i,
      eventName: s,
      severityNumber: o,
      severityText: a,
      body: c,
      attributes: u = {},
      context: l
    } = n;
    const h = Date.now();
    this.hrTime = Pl(r ?? h);
    this.hrTimeObserved = Pl(i ?? h);
    if (l) {
      const t = gc.getSpanContext(l);
      if (t && Fa(t)) {
        this.spanContext = t;
      }
    }
    this.severityNumber = o;
    this.severityText = a;
    this.body = c;
    this.resource = t.resource;
    this.instrumentationScope = e;
    this._logRecordLimits = t.logRecordLimits;
    this._eventName = s;
    this.setAttributes(u);
  }
  setAttribute(t, e) {
    if (this._isLogRecordReadonly() || e === null) {
      return this;
    } else if (t.length === 0) {
      nc.warn(`Invalid attribute key: ${t}`);
      return this;
    } else if (vl(e) || typeof e == "object" && !Array.isArray(e) && Object.keys(e).length > 0) {
      this.totalAttributesCount += 1;
      if (Object.keys(this.attributes).length >= this._logRecordLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, t)) {
        if (this.droppedAttributesCount === 1) {
          nc.warn("Dropping extra attributes.");
        }
        return this;
      } else {
        if (vl(e)) {
          this.attributes[t] = this._truncateToSize(e);
        } else {
          this.attributes[t] = e;
        }
        return this;
      }
    } else {
      nc.warn(`Invalid attribute value set for key: ${t}`);
      return this;
    }
  }
  setAttributes(t) {
    for (const [e, n] of Object.entries(t)) {
      this.setAttribute(e, n);
    }
    return this;
  }
  setBody(t) {
    this.body = t;
    return this;
  }
  setEventName(t) {
    this.eventName = t;
    return this;
  }
  setSeverityNumber(t) {
    this.severityNumber = t;
    return this;
  }
  setSeverityText(t) {
    this.severityText = t;
    return this;
  }
  _makeReadonly() {
    this._isReadonly = true;
  }
  _truncateToSize(t) {
    const e = this._logRecordLimits.attributeValueLengthLimit;
    if (e <= 0) {
      nc.warn(`Attribute value limit must be positive, got ${e}`);
      return t;
    } else if (typeof t == "string") {
      return this._truncateToLimitUtil(t, e);
    } else if (Array.isArray(t)) {
      return t.map(t => typeof t == "string" ? this._truncateToLimitUtil(t, e) : t);
    } else {
      return t;
    }
  }
  _truncateToLimitUtil(t, e) {
    if (t.length <= e) {
      return t;
    } else {
      return t.substring(0, e);
    }
  }
  _isLogRecordReadonly() {
    if (this._isReadonly) {
      nc.warn("Can not execute the operation on emitted log record");
    }
    return this._isReadonly;
  }
}
class Af {
  instrumentationScope;
  _sharedState;
  constructor(t, e) {
    this.instrumentationScope = t;
    this._sharedState = e;
  }
  emit(t) {
    const e = t.context || ec.active();
    const n = new xf(this._sharedState, this.instrumentationScope, {
      context: e,
      ...t
    });
    this._sharedState.activeProcessor.onEmit(n, e);
    n._makeReadonly();
  }
}
class Of {
  forceFlush() {
    return Promise.resolve();
  }
  onEmit(t, e) {}
  shutdown() {
    return Promise.resolve();
  }
}
class Cf {
  processors;
  forceFlushTimeoutMillis;
  constructor(t, e) {
    this.processors = t;
    this.forceFlushTimeoutMillis = e;
  }
  async forceFlush() {
    const t = this.forceFlushTimeoutMillis;
    await Promise.all(this.processors.map(e => function (t, e) {
      let n;
      const r = new Promise(function (t, r) {
        n = setTimeout(function () {
          r(new Yl("Operation timed out."));
        }, e);
      });
      return Promise.race([t, r]).then(t => {
        clearTimeout(n);
        return t;
      }, t => {
        clearTimeout(n);
        throw t;
      });
    }(e.forceFlush(), t)));
  }
  onEmit(t, e) {
    this.processors.forEach(n => n.onEmit(t, e));
  }
  async shutdown() {
    await Promise.all(this.processors.map(t => t.shutdown()));
  }
}
class Pf {
  resource;
  forceFlushTimeoutMillis;
  logRecordLimits;
  processors;
  loggers = new Map();
  activeProcessor;
  registeredLogRecordProcessors = [];
  constructor(t, e, n, r) {
    this.resource = t;
    this.forceFlushTimeoutMillis = e;
    this.logRecordLimits = n;
    this.processors = r;
    if (r.length > 0) {
      this.registeredLogRecordProcessors = r;
      this.activeProcessor = new Cf(this.registeredLogRecordProcessors, this.forceFlushTimeoutMillis);
    } else {
      this.activeProcessor = new Of();
    }
  }
}
class kf {
  _shutdownOnce;
  _sharedState;
  constructor(t = {}) {
    const e = function (...t) {
      let e = t.shift();
      const n = new WeakMap();
      while (t.length > 0) {
        e = Gl(e, t.shift(), 0, n);
      }
      return e;
    }({}, {
      forceFlushTimeoutMillis: 30000,
      logRecordLimits: {
        attributeValueLengthLimit: Infinity,
        attributeCountLimit: 128
      },
      includeTraceContext: true
    }, t);
    const n = t.resource ?? Dc();
    var r;
    this._sharedState = new Pf(n, e.forceFlushTimeoutMillis, {
      attributeCountLimit: (r = e.logRecordLimits).attributeCountLimit ?? undefined ?? undefined ?? 128,
      attributeValueLengthLimit: r.attributeValueLengthLimit ?? undefined ?? undefined ?? Infinity
    }, t?.processors ?? []);
    this._shutdownOnce = new Jl(this._shutdown, this);
  }
  getLogger(t, e, n) {
    if (this._shutdownOnce.isCalled) {
      nc.warn("A shutdown LoggerProvider cannot provide a Logger");
      return gf;
    }
    if (!t) {
      nc.warn("Logger requested without instrumentation scope name.");
    }
    const r = t || "unknown";
    const i = `${r}@${e || ""}:${n?.schemaUrl || ""}`;
    if (!this._sharedState.loggers.has(i)) {
      this._sharedState.loggers.set(i, new Af({
        name: r,
        version: e,
        schemaUrl: n?.schemaUrl
      }, this._sharedState));
    }
    return this._sharedState.loggers.get(i);
  }
  forceFlush() {
    if (this._shutdownOnce.isCalled) {
      nc.warn("invalid attempt to force flush after LoggerProvider shutdown");
      return this._shutdownOnce.promise;
    } else {
      return this._sharedState.activeProcessor.forceFlush();
    }
  }
  shutdown() {
    if (this._shutdownOnce.isCalled) {
      nc.warn("shutdown may only be called once per LoggerProvider");
      return this._shutdownOnce.promise;
    } else {
      return this._shutdownOnce.call();
    }
  }
  _shutdown() {
    return this._sharedState.activeProcessor.shutdown();
  }
}
class If {
  export(t, e) {
    this._sendLogRecords(t, e);
  }
  shutdown() {
    return Promise.resolve();
  }
  _exportInfo(t) {
    return {
      resource: {
        attributes: t.resource.attributes
      },
      instrumentationScope: t.instrumentationScope,
      timestamp: kl(t.hrTime),
      traceId: t.spanContext?.traceId,
      spanId: t.spanContext?.spanId,
      traceFlags: t.spanContext?.traceFlags,
      severityText: t.severityText,
      severityNumber: t.severityNumber,
      body: t.body,
      attributes: t.attributes
    };
  }
  _sendLogRecords(t, e) {
    for (const n of t) {
      console.dir(this._exportInfo(n), {
        depth: 3
      });
    }
    e?.({
      code: Il.SUCCESS
    });
  }
}
class Rf {
  _exporter;
  _shutdownOnce;
  _unresolvedExports;
  constructor(t) {
    this._exporter = t;
    this._shutdownOnce = new Jl(this._shutdown, this);
    this._unresolvedExports = new Set();
  }
  onEmit(t) {
    if (this._shutdownOnce.isCalled) {
      return;
    }
    const e = () => Ql._export(this._exporter, [t]).then(t => {
      if (t.code !== Il.SUCCESS) {
        El(t.error ?? new Error(`SimpleLogRecordProcessor: log record export failed (status ${t})`));
      }
    }).catch(El);
    if (t.resource.asyncAttributesPending) {
      const n = t.resource.waitForAsyncAttributes?.().then(() => {
        this._unresolvedExports.delete(n);
        return e();
      }, El);
      if (n != null) {
        this._unresolvedExports.add(n);
      }
    } else {
      e();
    }
  }
  async forceFlush() {
    await Promise.all(Array.from(this._unresolvedExports));
  }
  shutdown() {
    return this._shutdownOnce.call();
  }
  _shutdown() {
    return this._exporter.shutdown();
  }
}
class Lf {
  constructor(t = {}) {
    var r;
    this._resource = Dc().merge(t.resource ?? Mc({}));
    this._resourceDetectors = t.resourceDetectors ?? [_l];
    this._serviceName = t.serviceName;
    this._serviceVersion = t.serviceVersion;
    this._autoDetectResources = (r = t.autoDetectResources) === null || r === undefined || r;
    if (t.spanProcessor || t.traceExporter || t.spanProcessors) {
      const e = {};
      if (t.sampler) {
        e.sampler = t.sampler;
      }
      if (t.spanLimits) {
        e.spanLimits = t.spanLimits;
      }
      if (t.idGenerator) {
        e.idGenerator = t.idGenerator;
      }
      const n = t.spanProcessors || [];
      if (t.traceExporter) {
        n.push(new Mu(t.traceExporter));
      }
      this._tracerProviderConfig = {
        tracerConfig: e,
        spanProcessor: t.spanProcessor,
        spanProcessors: n,
        contextManager: t.contextManager,
        textMapPropagator: t.textMapPropagator
      };
    }
    if (t.metricExporters) {
      this._meterProviderConfig = {
        metricExporters: t.metricExporters
      };
    }
    if (t.logExporters) {
      this._loggerProviderConfig = {
        logExporters: t.logExporters
      };
    }
    let i = [];
    if (t.instrumentations) {
      i = t.instrumentations;
    }
    this._instrumentations = i;
  }
  start() {
    if (this._disabled) {
      return;
    }
    if (this._autoDetectResources) {
      const t = {
        detectors: this._resourceDetectors
      };
      this._resource = this._resource.merge(Bc(t));
    }
    this._resource = this._serviceName === undefined ? this._resource : this._resource.merge(Mc({
      [ul]: this._serviceName
    }));
    if (this._serviceVersion !== undefined) {
      this._resource = this._resource.merge(Mc({
        [ll]: this._serviceVersion
      }));
    }
    const s = [];
    if (this._tracerProviderConfig?.spanProcessor) {
      s.push(this._tracerProviderConfig.spanProcessor);
    }
    if (this._tracerProviderConfig?.spanProcessors) {
      s.push(...this._tracerProviderConfig.spanProcessors);
    }
    const o = new sl(Object.assign(Object.assign({}, this._tracerProviderConfig?.tracerConfig), {
      resource: this._resource,
      spanProcessors: s
    }));
    this._tracerProvider = o;
    o.register({
      contextManager: this._tracerProviderConfig?.contextManager,
      propagator: this._tracerProviderConfig?.textMapPropagator
    });
    if (this._meterProviderConfig) {
      const t = this._meterProviderConfig.metricExporters.map(t => new Tp({
        exporter: t
      }));
      this._meterProvider = new ff({
        resource: this._resource,
        readers: t
      });
      sc.setGlobalMeterProvider(this._meterProvider);
    }
    if (this._loggerProviderConfig) {
      const t = this._loggerProviderConfig.logExporters.map(t => new Rf(t));
      this._loggerProvider = new kf({
        resource: this._resource,
        processors: t
      });
      Tf.setGlobalLoggerProvider(this._loggerProvider);
    }
    (function (t) {
      const e = t.tracerProvider || gc.getTracerProvider();
      const n = t.meterProvider || sc.getMeterProvider();
      const r = t.loggerProvider || xc.getLoggerProvider();
      const i = t.instrumentations?.flat() ?? [];
      (function (t, e, n, r) {
        for (let i = 0, s = t.length; i < s; i++) {
          const s = t[i];
          if (e) {
            s.setTracerProvider(e);
          }
          if (n) {
            s.setMeterProvider(n);
          }
          if (r && s.setLoggerProvider) {
            s.setLoggerProvider(r);
          }
          if (!s.getConfig().enabled) {
            s.enable();
          }
        }
      })(i, e, n, r);
    })({
      instrumentations: this._instrumentations
    });
  }
  getResourceAttributes() {
    return this._resource.attributes;
  }
  forceFlush() {
    const t = [];
    if (this._tracerProvider) {
      t.push(this._tracerProvider.forceFlush());
    }
    if (this._meterProvider) {
      t.push(this._meterProvider.forceFlush());
    }
    if (this._loggerProvider) {
      t.push(this._loggerProvider.forceFlush());
    }
    return Promise.all(t).then(() => {});
  }
  shutdown() {
    const t = [];
    if (this._tracerProvider) {
      t.push(this._tracerProvider.shutdown());
    }
    if (this._meterProvider) {
      t.push(this._meterProvider.shutdown());
    }
    if (this._loggerProvider) {
      t.push(this._loggerProvider.shutdown());
    }
    return Promise.all(t).then(() => {});
  }
}
const Mf = "https://api.honeycomb.io";
const Nf = "v1/traces";
const Df = `${Mf}/${Nf}`;
const Uf = "v1/metrics";
const Bf = `${Mf}/${Uf}`;
const $f = "v1/logs";
const jf = `${Mf}/${$f}`;
const Ff = {
  apiKey: "",
  tracesApiKey: "",
  endpoint: Df,
  tracesEndpoint: Df,
  serviceName: "unknown_service",
  debug: false,
  sampleRate: 1,
  skipOptionsValidation: false,
  localVisualizations: false,
  webVitalsInstrumentationConfig: {
    enabled: true
  }
};
const zf = t => `@honeycombio/opentelemetry-web: ${t}`;
const Gf = /^[a-f0-9]*$/;
const Vf = /^hc[a-z]ic_[a-z0-9]*$/;
function Hf(t) {
  return t != null && t.length !== 0 && (t.length === 32 ? Gf.test(t) : t.length === 64 && Vf.test(t));
}
function qf(t, e) {
  if (t.endsWith(e) || t.endsWith(`${e}/`)) {
    return t;
  } else if (t.endsWith("/")) {
    return t + e;
  } else {
    return t + "/" + e;
  }
}
const Wf = t => (t == null ? undefined : t.tracesEndpoint) ? t.tracesEndpoint : (t == null ? undefined : t.endpoint) ? qf(t.endpoint, Nf) : Df;
const Kf = t => (t == null ? undefined : t.metricsEndpoint) ? t.metricsEndpoint : (t == null ? undefined : t.endpoint) ? qf(t.endpoint, Uf) : Bf;
const Yf = t => (t == null ? undefined : t.logsEndpoint) ? t.logsEndpoint : (t == null ? undefined : t.endpoint) ? qf(t.endpoint, $f) : jf;
const Xf = t => (t == null ? undefined : t.tracesApiKey) || (t == null ? undefined : t.apiKey);
const Jf = t => typeof (t == null ? undefined : t.sampleRate) == "number" && Number.isSafeInteger(t == null ? undefined : t.sampleRate) && (t == null ? undefined : t.sampleRate) >= 0 ? t == null ? undefined : t.sampleRate : 1;
const Qf = zf("❌ Missing API Key. Set `apiKey` in HoneycombOptions. Telemetry will not be exported.");
const Zf = zf(`❌ Missing Service Name. Set \`serviceName\` in HoneycombOptions. Defaulting to '${Ff.serviceName}'`);
zf("🔕 Dataset is ignored in favor of service name.");
zf("❌ Missing dataset. Specify either HONEYCOMB_DATASET environment variable or dataset in the options parameter.");
zf("⏭️ Skipping options validation. To re-enable, set skipOptionsValidation option or HONEYCOMB_SKIP_OPTIONS_VALIDATION to false.");
zf("⏭️ Skipping options validation, because a custom collector is being used.");
zf("🔨 Default deterministic sampler has been overridden. Honeycomb requires a resource attribute called SampleRate to properly show weighted values. Non-deterministic sampleRate could lead to missing spans in Honeycomb. See our docs for more details. https://docs.honeycomb.io/getting-data-in/opentelemetry/node-distro/#sampling-without-the-honeycomb-sdk");
zf("🔕 Disabling local visualizations - must have both service name and API key configured.");
zf("🔕 Disabling local visualizations - cannot infer auth and ui url roots from endpoint url.");
zf("🔕 Failed to get proper auth response from Honeycomb. No local visualization available.");
zf("🔕 Default honeycomb exporter disabled but no exporters provided");
const tm = t => {
  var n;
  if (t == null ? undefined : t.logLevel) {
    t.logLevel;
  } else {
    $o.DEBUG;
  }
  if (t == null ? undefined : t.skipOptionsValidation) {
    $o.DEBUG;
    return;
  }
  const r = (t == null ? undefined : t.tracesEndpoint) ?? (t == null ? undefined : t.endpoint);
  if (!r || !(t => {
    try {
      return !new URL(t).hostname.endsWith(".honeycomb.io");
    } catch (e) {
      return false;
    }
  })(r)) {
    if (!(t == null ? undefined : t.apiKey)) {
      $o.WARN;
    }
    if (!(t == null ? undefined : t.serviceName)) {
      $o.WARN;
    }
    if ((t == null ? undefined : t.apiKey) && !Hf(t == null ? undefined : t.apiKey) && (t == null ? undefined : t.dataset)) {
      $o.WARN;
    }
    if ((t == null ? undefined : t.apiKey) && Hf(t == null ? undefined : t.apiKey) && !(t == null ? undefined : t.dataset)) {
      $o.WARN;
    }
    if (t == null ? undefined : t.sampler) {
      $o.DEBUG;
    }
    if ((t == null ? undefined : t.disableDefaultTraceExporter) === true && !(t == null ? undefined : t.traceExporter)) {
      if ((n = t == null ? undefined : t.traceExporters) !== null && n !== undefined) {
        n.length;
      }
    }
    return t;
  }
  $o.DEBUG;
};
function em(t) {
  if (!(t == null ? undefined : t.debug)) {
    return;
  }
  nc.setLogger(new Zo(), $o.DEBUG);
  nc.debug(zf("🐝 Honeycomb Web SDK Debug Mode Enabled 🐝"));
  const e = Wf(t);
  const n = Object.assign(Object.assign(Object.assign({}, Ff), t), {
    tracesEndpoint: e
  });
  (function (t) {
    const e = Xf(t) || "";
    if (!e) {
      nc.debug(Qf);
      return;
    }
    nc.debug(zf(`API Key configured for traces: '${e}'`));
  })(n);
  (function (t) {
    const e = t.serviceName || Ff.serviceName;
    if (e === Ff.serviceName) {
      nc.debug(Zf);
      return;
    }
    nc.debug(`@honeycombio/opentelemetry-web: Service Name configured for traces: '${e}'`);
  })(n);
  (function (t) {
    const e = Wf(t);
    if (!e) {
      nc.debug(zf("No endpoint configured for traces"));
      return;
    }
    nc.debug(zf(`Endpoint configured for traces: '${e}'`));
  })(n);
  (function (t) {
    const e = Jf(t);
    if (!e) {
      nc.debug("No sampler configured for traces");
      return;
    }
    nc.debug(zf(`Sample Rate configured for traces: '${e}'`));
  })(n);
}
const nm = t => {
  if (t == null ? undefined : t.sampler) {
    return t.sampler;
  }
  const e = Jf(t);
  return new rm(e);
};
class rm {
  constructor(t) {
    this._sampleRate = t;
    switch (t) {
      case 0:
        this._sampler = new xu();
        break;
      case 1:
        this._sampler = new Au();
        break;
      default:
        {
          const e = 1 / t;
          this._sampler = new Cu(e);
          break;
        }
    }
  }
  shouldSample(t, e, n, r, i, s) {
    const o = this._sampler.shouldSample(t, e, n, r, i, s);
    return Object.assign(Object.assign({}, o), {
      attributes: Object.assign(Object.assign({}, o.attributes), {
        SampleRate: this._sampleRate
      })
    });
  }
  toString() {
    return `DeterministicSampler(${this._sampler.toString()})`;
  }
}
class im {
  t;
  o = 0;
  i = [];
  u(t) {
    if (t.hadRecentInput) {
      return;
    }
    const e = this.i[0];
    const n = this.i.at(-1);
    if (this.o && e && n && t.startTime - n.startTime < 1000 && t.startTime - e.startTime < 5000) {
      this.o += t.value;
      this.i.push(t);
    } else {
      this.o = t.value;
      this.i = [t];
    }
    this.t?.(t);
  }
}
const sm = () => {
  const t = performance.getEntriesByType("navigation")[0];
  if (t && t.responseStart > 0 && t.responseStart < performance.now()) {
    return t;
  }
};
const om = t => {
  if (document.readyState === "loading") {
    return "loading";
  }
  {
    const e = sm();
    if (e) {
      if (t < e.domInteractive) {
        return "loading";
      }
      if (e.domContentLoadedEventStart === 0 || t < e.domContentLoadedEventStart) {
        return "dom-interactive";
      }
      if (e.domComplete === 0 || t < e.domComplete) {
        return "dom-content-loaded";
      }
    }
  }
  return "complete";
};
const am = t => {
  const e = t.nodeName;
  if (t.nodeType === 1) {
    return e.toLowerCase();
  } else {
    return e.toUpperCase().replace(/^#/, "");
  }
};
const cm = t => {
  let e = "";
  try {
    while (t?.nodeType !== 9) {
      const n = t;
      const r = n.id ? "#" + n.id : [am(n), ...Array.from(n.classList).sort()].join(".");
      if (e.length + r.length > 99) {
        return e || r;
      }
      e = e ? r + ">" + e : r;
      if (n.id) {
        break;
      }
      t = n.parentNode;
    }
  } catch {}
  return e;
};
const um = new WeakMap();
function lm(t, e) {
  if (!um.get(t)) {
    um.set(t, new e());
  }
  return um.get(t);
}
let hm = -1;
const dm = () => hm;
const pm = t => {
  addEventListener("pageshow", e => {
    if (e.persisted) {
      hm = e.timeStamp;
      t(e);
    }
  }, true);
};
const fm = (t, e, n, r) => {
  let i;
  let s;
  return o => {
    var a;
    var c;
    if (e.value >= 0 && (o || r)) {
      s = e.value - (i ?? 0);
      if (s || i === undefined) {
        i = e.value;
        e.delta = s;
        e.rating = (a = e.value) > (c = n)[1] ? "poor" : a > c[0] ? "needs-improvement" : "good";
        t(e);
      }
    }
  };
};
const mm = t => {
  requestAnimationFrame(() => requestAnimationFrame(() => t()));
};
const gm = () => {
  const t = sm();
  return t?.activationStart ?? 0;
};
const _m = (t, e = -1) => {
  const n = sm();
  let r = "navigate";
  if (dm() >= 0) {
    r = "back-forward-cache";
  } else if (n) {
    if (document.prerendering || gm() > 0) {
      r = "prerender";
    } else if (document.wasDiscarded) {
      r = "restore";
    } else if (n.type) {
      r = n.type.replace(/_/g, "-");
    }
  }
  return {
    name: t,
    value: e,
    rating: "good",
    delta: 0,
    entries: [],
    id: `v5-${Date.now()}-${Math.floor(Math.random() * 8999999999999) + 1000000000000}`,
    navigationType: r
  };
};
const ym = (t, e, n = {}) => {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(t)) {
      const r = new PerformanceObserver(t => {
        Promise.resolve().then(() => {
          e(t.getEntries());
        });
      });
      r.observe({
        type: t,
        buffered: true,
        ...n
      });
      return r;
    }
  } catch {}
};
const vm = t => {
  let e = false;
  return () => {
    if (!e) {
      t();
      e = true;
    }
  };
};
let bm = -1;
const wm = () => document.visibilityState !== "hidden" || document.prerendering ? Infinity : 0;
const Em = t => {
  if (document.visibilityState === "hidden" && bm > -1) {
    bm = t.type === "visibilitychange" ? t.timeStamp : 0;
    Tm();
  }
};
const Sm = () => {
  addEventListener("visibilitychange", Em, true);
  addEventListener("prerenderingchange", Em, true);
};
const Tm = () => {
  removeEventListener("visibilitychange", Em, true);
  removeEventListener("prerenderingchange", Em, true);
};
const xm = () => {
  if (bm < 0) {
    const t = gm();
    const e = document.prerendering ? undefined : globalThis.performance.getEntriesByType("visibility-state").filter(e => e.name === "hidden" && e.startTime > t)[0]?.startTime;
    bm = e ?? wm();
    Sm();
    pm(() => {
      setTimeout(() => {
        bm = wm();
        Sm();
      });
    });
  }
  return {
    get firstHiddenTime() {
      return bm;
    }
  };
};
const Am = t => {
  if (document.prerendering) {
    addEventListener("prerenderingchange", () => t(), true);
  } else {
    t();
  }
};
const Om = [1800, 3000];
const Cm = (t, e = {}) => {
  Am(() => {
    const n = xm();
    let r;
    let i = _m("FCP");
    const s = ym("paint", t => {
      for (const e of t) {
        if (e.name === "first-contentful-paint") {
          s.disconnect();
          if (e.startTime < n.firstHiddenTime) {
            i.value = Math.max(e.startTime - gm(), 0);
            i.entries.push(e);
            r(true);
          }
        }
      }
    });
    if (s) {
      r = fm(t, i, Om, e.reportAllChanges);
      pm(n => {
        i = _m("FCP");
        r = fm(t, i, Om, e.reportAllChanges);
        mm(() => {
          i.value = performance.now() - n.timeStamp;
          r(true);
        });
      });
    }
  });
};
const Pm = [0.1, 0.25];
const km = t => t.find(t => t.node?.nodeType === 1) || t[0];
let Im = 0;
let Rm = Infinity;
let Lm = 0;
const Mm = t => {
  for (const e of t) {
    if (e.interactionId) {
      Rm = Math.min(Rm, e.interactionId);
      Lm = Math.max(Lm, e.interactionId);
      Im = Lm ? (Lm - Rm) / 7 + 1 : 0;
    }
  }
};
let Nm;
const Dm = () => Nm ? Im : performance.interactionCount ?? 0;
let Um = 0;
class Bm {
  l = [];
  h = new Map();
  m;
  p;
  v() {
    Um = Dm();
    this.l.length = 0;
    this.h.clear();
  }
  M() {
    const t = Math.min(this.l.length - 1, Math.floor((Dm() - Um) / 50));
    return this.l[t];
  }
  u(t) {
    this.m?.(t);
    if (!t.interactionId && t.entryType !== "first-input") {
      return;
    }
    const e = this.l.at(-1);
    let n = this.h.get(t.interactionId);
    if (n || this.l.length < 10 || t.duration > e.T) {
      if (n) {
        if (t.duration > n.T) {
          n.entries = [t];
          n.T = t.duration;
        } else if (t.duration === n.T && t.startTime === n.entries[0].startTime) {
          n.entries.push(t);
        }
      } else {
        n = {
          id: t.interactionId,
          entries: [t],
          T: t.duration
        };
        this.h.set(n.id, n);
        this.l.push(n);
      }
      this.l.sort((t, e) => e.T - t.T);
      if (this.l.length > 10) {
        const t = this.l.splice(10);
        for (const e of t) {
          this.h.delete(e.id);
        }
      }
      this.p?.(n);
    }
  }
}
const $m = t => {
  const e = globalThis.requestIdleCallback || setTimeout;
  if (document.visibilityState === "hidden") {
    t();
  } else {
    t = vm(t);
    document.addEventListener("visibilitychange", t, {
      once: true
    });
    e(() => {
      t();
      document.removeEventListener("visibilitychange", t);
    });
  }
};
const jm = [200, 500];
const Fm = (t, e = {}) => {
  const n = lm(e = Object.assign({}, e), Bm);
  let r = [];
  let i = [];
  let s = 0;
  const o = new WeakMap();
  const a = new WeakMap();
  let c = false;
  const u = () => {
    if (!c) {
      $m(l);
      c = true;
    }
  };
  const l = () => {
    const t = n.l.map(t => o.get(t.entries[0]));
    const e = i.length - 50;
    i = i.filter((n, r) => r >= e || t.includes(n));
    const a = new Set();
    for (const n of i) {
      const t = h(n.startTime, n.processingEnd);
      for (const e of t) {
        a.add(e);
      }
    }
    const u = r.length - 1 - 50;
    r = r.filter((t, e) => t.startTime > s && e > u || a.has(t));
    c = false;
  };
  n.m = t => {
    const e = t.startTime + t.duration;
    let n;
    s = Math.max(s, t.processingEnd);
    for (let r = i.length - 1; r >= 0; r--) {
      const s = i[r];
      if (Math.abs(e - s.renderTime) <= 8) {
        n = s;
        n.startTime = Math.min(t.startTime, n.startTime);
        n.processingStart = Math.min(t.processingStart, n.processingStart);
        n.processingEnd = Math.max(t.processingEnd, n.processingEnd);
        n.entries.push(t);
        break;
      }
    }
    if (!n) {
      n = {
        startTime: t.startTime,
        processingStart: t.processingStart,
        processingEnd: t.processingEnd,
        renderTime: e,
        entries: [t]
      };
      i.push(n);
    }
    if (t.interactionId || t.entryType === "first-input") {
      o.set(t, n);
    }
    u();
  };
  n.p = t => {
    if (!a.get(t)) {
      const n = (e.generateTarget ?? cm)(t.entries[0].target);
      a.set(t, n);
    }
  };
  const h = (t, e) => {
    const n = [];
    for (const i of r) {
      if (!(i.startTime + i.duration < t)) {
        if (i.startTime > e) {
          break;
        }
        n.push(i);
      }
    }
    return n;
  };
  ym("long-animation-frame", t => {
    r = r.concat(t);
    u();
  });
  ((t, e = {}) => {
    if (globalThis.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype) {
      Am(() => {
        if (!("interactionCount" in performance) && !Nm) {
          Nm = ym("event", Mm, {
            type: "event",
            buffered: true,
            durationThreshold: 0
          });
        }
        let n;
        let r = _m("INP");
        const i = lm(e, Bm);
        const s = t => {
          $m(() => {
            for (const n of t) {
              i.u(n);
            }
            const e = i.M();
            if (e && e.T !== r.value) {
              r.value = e.T;
              r.entries = e.entries;
              n();
            }
          });
        };
        const o = ym("event", s, {
          durationThreshold: e.durationThreshold ?? 40
        });
        n = fm(t, r, jm, e.reportAllChanges);
        if (o) {
          o.observe({
            type: "first-input",
            buffered: true
          });
          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
              s(o.takeRecords());
              n(true);
            }
          });
          pm(() => {
            i.v();
            r = _m("INP");
            n = fm(t, r, jm, e.reportAllChanges);
          });
        }
      });
    }
  })(e => {
    const r = (t => {
      const e = t.entries[0];
      const r = o.get(e);
      const i = e.processingStart;
      const s = Math.max(e.startTime + e.duration, i);
      const c = Math.min(r.processingEnd, s);
      const u = r.entries.sort((t, e) => t.processingStart - e.processingStart);
      const l = h(e.startTime, c);
      const d = n.h.get(e.interactionId);
      const p = {
        interactionTarget: a.get(d),
        interactionType: e.name.startsWith("key") ? "keyboard" : "pointer",
        interactionTime: e.startTime,
        nextPaintTime: s,
        processedEventEntries: u,
        longAnimationFrameEntries: l,
        inputDelay: i - e.startTime,
        processingDuration: c - i,
        presentationDelay: s - c,
        loadState: om(e.startTime),
        longestScript: undefined,
        totalScriptDuration: undefined,
        totalStyleAndLayoutDuration: undefined,
        totalPaintDuration: undefined,
        totalUnattributedDuration: undefined
      };
      (t => {
        if (!t.longAnimationFrameEntries?.length) {
          return;
        }
        const e = t.interactionTime;
        const n = t.inputDelay;
        const r = t.processingDuration;
        let i;
        let s;
        let o = 0;
        let a = 0;
        let c = 0;
        let u = 0;
        for (const d of t.longAnimationFrameEntries) {
          a = a + d.startTime + d.duration - d.styleAndLayoutStart;
          for (const t of d.scripts) {
            const c = t.startTime + t.duration;
            if (c < e) {
              continue;
            }
            const l = c - Math.max(e, t.startTime);
            const h = t.duration ? l / t.duration * t.forcedStyleAndLayoutDuration : 0;
            o += l - h;
            a += h;
            if (l > u) {
              s = t.startTime < e + n ? "input-delay" : t.startTime >= e + n + r ? "presentation-delay" : "processing-duration";
              i = t;
              u = l;
            }
          }
        }
        const l = t.longAnimationFrameEntries.at(-1);
        const h = l ? l.startTime + l.duration : 0;
        if (h >= e + n + r) {
          c = t.nextPaintTime - h;
        }
        if (i && s) {
          t.longestScript = {
            entry: i,
            subpart: s,
            intersectingDuration: u
          };
        }
        t.totalScriptDuration = o;
        t.totalStyleAndLayoutDuration = a;
        t.totalPaintDuration = c;
        t.totalUnattributedDuration = t.nextPaintTime - e - o - a - c;
      })(p);
      return Object.assign(t, {
        attribution: p
      });
    })(e);
    t(r);
  }, e);
};
class zm {
  m;
  u(t) {
    this.m?.(t);
  }
}
const Gm = [2500, 4000];
const Vm = [800, 1800];
const Hm = t => {
  if (document.prerendering) {
    Am(() => Hm(t));
  } else if (document.readyState !== "complete") {
    addEventListener("load", () => Hm(t), true);
  } else {
    setTimeout(t);
  }
};
const qm = "browser.name";
const Wm = "browser.version";
const Km = "browser.touch_screen_enabled";
const Ym = "browser.width";
const Xm = "browser.height";
const Jm = "device.type";
const Qm = "network.effectiveType";
const Zm = "screen.width";
const tg = "screen.height";
const eg = "screen.size";
const ng = "page.hash";
const rg = "page.url";
const ig = "page.route";
const sg = "page.hostname";
const og = "page.search";
const ag = "url.path";
const cg = "entry_page.url";
const ug = "entry_page.path";
const lg = "entry_page.search";
const hg = "entry_page.hash";
const dg = "entry_page.hostname";
const pg = "entry_page.referrer";
const fg = "honeycomb.distro.version";
const mg = "honeycomb.distro.runtime_version";
const gg = "cls.id";
const _g = "cls.value";
const yg = "cls.delta";
const vg = "cls.rating";
const bg = "cls.navigation_type";
const wg = "lcp.id";
const Eg = "lcp.value";
const Sg = "lcp.delta";
const Tg = "lcp.rating";
const xg = "lcp.navigation_type";
const Ag = "inp.id";
const Og = "inp.value";
const Cg = "inp.delta";
const Pg = "inp.rating";
const kg = "inp.navigation_type";
const Ig = "fcp.id";
const Rg = "fcp.value";
const Lg = "fcp.delta";
const Mg = "fcp.rating";
const Ng = "fcp.navigation_type";
const Dg = "ttfb.id";
const Ug = "ttfb.value";
const Bg = "ttfb.delta";
const $g = "ttfb.rating";
const jg = "ttfb.navigation_type";
const Fg = "cls.largest_shift_target";
const zg = "cls.element";
const Gg = "cls.largest_shift_time";
const Vg = "cls.largest_shift_value";
const Hg = "cls.load_state";
const qg = "cls.had_recent_input";
const Wg = "lcp.element";
const Kg = "lcp.url";
const Yg = "lcp.time_to_first_byte";
const Xg = "lcp.resource_load_delay";
const Jg = "lcp.resource_load_duration";
const Qg = "lcp.element_render_delay";
const Zg = "lcp.resource_load_time";
const t_ = "inp.input_delay";
const e_ = "inp.interaction_target";
const n_ = "inp.interaction_time";
const r_ = "inp.interaction_type";
const i_ = "inp.load_state";
const s_ = "inp.next_paint_time";
const o_ = "inp.presentation_delay";
const a_ = "inp.processing_duration";
const c_ = "inp.duration";
const u_ = "inp.element";
const l_ = "inp.event_type";
const h_ = "inp.timing.script.entry_type";
const d_ = "inp.timing.script.start_time";
const p_ = "inp.timing.script.execution_start";
const f_ = "inp.timing.script.duration";
const m_ = "inp.timing.script.forced_style_and_layout_duration";
const g_ = "inp.timing.script.invoker";
const __ = "inp.timing.script.pause_duration";
const y_ = "inp.timing.script.source_url";
const v_ = "inp.timing.script.source_function_name";
const b_ = "inp.timing.script.source_char_position";
const w_ = "inp.timing.script.window_attribution";
const E_ = "inp.timing.duration";
const S_ = "inp.timing.entryType";
const T_ = "inp.timing.name";
const x_ = "inp.timing.renderStart";
const A_ = "inp.timing.startTime";
const O_ = "fcp.time_to_first_byte";
const C_ = "fcp.time_since_first_byte";
const P_ = "fcp.load_state";
const k_ = "ttfb.waiting_duration";
const I_ = "ttfb.dns_duration";
const R_ = "ttfb.connection_duration";
const L_ = "ttfb.request_duration";
const M_ = "ttfb.cache_duration";
const N_ = "ttfb.waiting_time";
const D_ = "ttfb.dns_time";
const U_ = "ttfb.connection_time";
const B_ = "ttfb.request_time";
class $_ {
  constructor(t, e, n = {}) {
    this.instrumentationName = t;
    this.instrumentationVersion = e;
    this._wrap = rh.wrap;
    this._unwrap = rh.unwrap;
    this._massWrap = rh.massWrap;
    this._massUnwrap = rh.massUnwrap;
    this._config = Object.assign({
      enabled: true
    }, n);
    this._diag = nc.createComponentLogger({
      namespace: t
    });
    this._tracer = gc.getTracer(t, e);
    this._meter = sc.getMeter(t, e);
    this._updateMetricInstruments();
  }
  get meter() {
    return this._meter;
  }
  setMeterProvider(t) {
    this._meter = t.getMeter(this.instrumentationName, this.instrumentationVersion);
    this._updateMetricInstruments();
  }
  _updateMetricInstruments() {}
  getConfig() {
    return this._config;
  }
  setConfig(t = {}) {
    this._config = Object.assign({}, t);
  }
  setTracerProvider(t) {
    this._tracer = t.getTracer(this.instrumentationName, this.instrumentationVersion);
  }
  get tracer() {
    return this._tracer;
  }
}
class j_ extends $_ {
  constructor({
    enabled: t = true,
    vitalsToTrack: e = ["CLS", "LCP", "INP", "TTFB", "FCP"],
    lcp: n,
    cls: r,
    inp: i,
    fcp: s,
    ttfb: o
  } = {}) {
    super("@honeycombio/instrumentation-web-vitals", Zl, {
      enabled: t,
      vitalsToTrack: e,
      lcp: n,
      cls: r,
      inp: i,
      fcp: s,
      ttfb: o
    });
    this.onReportCLS = (t, e = {}) => {
      const {
        applyCustomAttributes: n
      } = e;
      if (!this.isEnabled()) {
        return;
      }
      const {
        name: r,
        attribution: i
      } = t;
      const {
        largestShiftTarget: s,
        largestShiftTime: o,
        largestShiftValue: a,
        loadState: c,
        largestShiftEntry: u
      } = i;
      const l = this.tracer.startSpan(r);
      l.setAttributes({
        [gg]: t.id,
        [yg]: t.delta,
        [_g]: t.value,
        [vg]: t.rating,
        [bg]: t.navigationType,
        [Fg]: s,
        [zg]: s,
        [Gg]: o,
        [Vg]: a,
        [Hg]: c,
        [qg]: u == null ? undefined : u.hadRecentInput
      });
      if (n) {
        n(t, l);
      }
      l.end();
    };
    this.onReportLCP = (t, e = {}) => {
      const {
        applyCustomAttributes: n,
        dataAttributes: r
      } = e;
      if (!this.isEnabled()) {
        return;
      }
      const {
        name: i,
        attribution: s
      } = t;
      const {
        target: o,
        url: a,
        timeToFirstByte: c,
        resourceLoadDelay: u,
        resourceLoadDuration: l,
        elementRenderDelay: h,
        lcpEntry: d
      } = s;
      const p = this.tracer.startSpan(i);
      p.setAttributes({
        [wg]: t.id,
        [Sg]: t.delta,
        [Eg]: t.value,
        [Tg]: t.rating,
        [xg]: t.navigationType,
        [Wg]: o,
        [Kg]: a,
        [Yg]: c,
        [Xg]: u,
        [Jg]: l,
        [Qg]: h,
        [Zg]: l
      });
      this.addDataAttributes(d == null ? undefined : d.element, p, r, "lcp");
      if (n) {
        n(t, p);
      }
      p.end();
    };
    this.onReportINP = (t, e = {
      includeTimingsAsSpans: false
    }) => {
      const {
        applyCustomAttributes: n,
        includeTimingsAsSpans: r,
        dataAttributes: i
      } = e;
      if (!this.isEnabled()) {
        return;
      }
      const {
        name: s,
        attribution: o
      } = t;
      const {
        inputDelay: a,
        interactionTarget: c,
        interactionTime: u,
        interactionType: l,
        loadState: h,
        nextPaintTime: d,
        presentationDelay: p,
        processingDuration: f,
        longAnimationFrameEntries: m
      } = o;
      const g = a + f + p;
      this.tracer.startActiveSpan(s, {
        startTime: u
      }, e => {
        const s = {
          [Ag]: t.id,
          [Cg]: t.delta,
          [Og]: t.value,
          [Pg]: t.rating,
          [kg]: t.navigationType,
          [t_]: a,
          [e_]: c,
          [n_]: u,
          [r_]: l,
          [i_]: h,
          [s_]: d,
          [o_]: p,
          [a_]: f,
          [c_]: g,
          [u_]: c,
          [l_]: l
        };
        e.setAttributes(s);
        t.entries.forEach(t => {
          this.addDataAttributes(this.getElementFromNode(t.target), e, i, "inp");
        });
        if (n) {
          n(t, e);
        }
        if (r) {
          m.forEach(t => {
            this.processPerformanceLongAnimationFrameTimingSpans("inp", t);
          });
        }
        e.end(u + g);
      });
    };
    this.onReportFCP = (t, e = {}) => {
      const {
        applyCustomAttributes: n
      } = e;
      if (!this.isEnabled()) {
        return;
      }
      const {
        name: r,
        attribution: i
      } = t;
      const {
        timeToFirstByte: s,
        firstByteToFCP: o,
        loadState: a
      } = i;
      const c = this.tracer.startSpan(r);
      c.setAttributes({
        [Ig]: t.id,
        [Lg]: t.delta,
        [Rg]: t.value,
        [Mg]: t.rating,
        [Ng]: t.navigationType,
        [O_]: s,
        [C_]: o,
        [P_]: a
      });
      if (n) {
        n(t, c);
      }
      c.end();
    };
    this.onReportTTFB = (t, e = {}) => {
      const {
        applyCustomAttributes: n
      } = e;
      if (!this.isEnabled()) {
        return;
      }
      const {
        name: r,
        attribution: i
      } = t;
      const {
        cacheDuration: s,
        connectionDuration: o,
        dnsDuration: a,
        requestDuration: c,
        waitingDuration: u
      } = i;
      const l = {
        [Dg]: t.id,
        [Bg]: t.delta,
        [Ug]: t.value,
        [$g]: t.rating,
        [jg]: t.navigationType,
        [k_]: u,
        [I_]: a,
        [R_]: o,
        [L_]: c,
        [M_]: s,
        [N_]: u,
        [D_]: a,
        [U_]: o,
        [B_]: c
      };
      const h = this.tracer.startSpan(r);
      h.setAttributes(l);
      if (n) {
        n(t, h);
      }
      h.end();
    };
    this.vitalsToTrack = [...e];
    this.lcpOpts = n;
    this.clsOpts = r;
    this.inpOpts = i;
    this.fcpOpts = s;
    this.ttfbOpts = o;
    this._isEnabled = t;
    this._setupWebVitalsCallbacks();
  }
  init() {}
  _setupWebVitalsCallbacks() {
    if (this.vitalsToTrack.includes("CLS")) {
      ((t, e = {}) => {
        const n = lm(e = Object.assign({}, e), im);
        const r = new WeakMap();
        n.t = t => {
          if (t?.sources?.length) {
            const n = km(t.sources);
            if (n) {
              const t = (e.generateTarget ?? cm)(n.node);
              r.set(n, t);
            }
          }
        };
        ((t, e = {}) => {
          Cm(vm(() => {
            let n;
            let r = _m("CLS", 0);
            const i = lm(e, im);
            const s = t => {
              for (const e of t) {
                i.u(e);
              }
              if (i.o > r.value) {
                r.value = i.o;
                r.entries = i.i;
                n();
              }
            };
            const o = ym("layout-shift", s);
            if (o) {
              n = fm(t, r, Pm, e.reportAllChanges);
              document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "hidden") {
                  s(o.takeRecords());
                  n(true);
                }
              });
              pm(() => {
                i.o = 0;
                r = _m("CLS", 0);
                n = fm(t, r, Pm, e.reportAllChanges);
                mm(() => n());
              });
              setTimeout(n);
            }
          }));
        })(e => {
          const n = (t => {
            let e = {};
            if (t.entries.length) {
              const n = t.entries.reduce((t, e) => t.value > e.value ? t : e);
              if (n?.sources?.length) {
                const t = km(n.sources);
                if (t) {
                  e = {
                    largestShiftTarget: r.get(t),
                    largestShiftTime: n.startTime,
                    largestShiftValue: n.value,
                    largestShiftSource: t,
                    largestShiftEntry: n,
                    loadState: om(n.startTime)
                  };
                }
              }
            }
            return Object.assign(t, {
              attribution: e
            });
          })(e);
          t(n);
        }, e);
      })(t => {
        this.onReportCLS(t, this.clsOpts);
      }, this.clsOpts);
    }
    if (this.vitalsToTrack.includes("LCP")) {
      ((t, e = {}) => {
        const n = lm(e = Object.assign({}, e), zm);
        const r = new WeakMap();
        n.m = t => {
          if (t.element) {
            const n = (e.generateTarget ?? cm)(t.element);
            r.set(t, n);
          }
        };
        ((t, e = {}) => {
          Am(() => {
            const n = xm();
            let r;
            let i = _m("LCP");
            const s = lm(e, zm);
            const o = t => {
              if (!e.reportAllChanges) {
                t = t.slice(-1);
              }
              for (const e of t) {
                s.u(e);
                if (e.startTime < n.firstHiddenTime) {
                  i.value = Math.max(e.startTime - gm(), 0);
                  i.entries = [e];
                  r();
                }
              }
            };
            const a = ym("largest-contentful-paint", o);
            if (a) {
              r = fm(t, i, Gm, e.reportAllChanges);
              const n = vm(() => {
                o(a.takeRecords());
                a.disconnect();
                r(true);
              });
              for (const t of ["keydown", "click", "visibilitychange"]) {
                addEventListener(t, () => $m(n), {
                  capture: true,
                  once: true
                });
              }
              pm(n => {
                i = _m("LCP");
                r = fm(t, i, Gm, e.reportAllChanges);
                mm(() => {
                  i.value = performance.now() - n.timeStamp;
                  r(true);
                });
              });
            }
          });
        })(e => {
          const n = (t => {
            let e = {
              timeToFirstByte: 0,
              resourceLoadDelay: 0,
              resourceLoadDuration: 0,
              elementRenderDelay: t.value
            };
            if (t.entries.length) {
              const n = sm();
              if (n) {
                const i = n.activationStart || 0;
                const s = t.entries.at(-1);
                const o = s.url && performance.getEntriesByType("resource").filter(t => t.name === s.url)[0];
                const a = Math.max(0, n.responseStart - i);
                const c = Math.max(a, o ? (o.requestStart || o.startTime) - i : 0);
                const u = Math.min(t.value, Math.max(c, o ? o.responseEnd - i : 0));
                e = {
                  target: r.get(s),
                  timeToFirstByte: a,
                  resourceLoadDelay: c - a,
                  resourceLoadDuration: u - c,
                  elementRenderDelay: t.value - u,
                  navigationEntry: n,
                  lcpEntry: s
                };
                if (s.url) {
                  e.url = s.url;
                }
                if (o) {
                  e.lcpResourceEntry = o;
                }
              }
            }
            return Object.assign(t, {
              attribution: e
            });
          })(e);
          t(n);
        }, e);
      })(t => {
        this.onReportLCP(t, this.lcpOpts);
      }, this.lcpOpts);
    }
    if (this.vitalsToTrack.includes("INP")) {
      Fm(t => {
        this.onReportINP(t, this.inpOpts);
      }, this.inpOpts);
    }
    if (this.vitalsToTrack.includes("TTFB")) {
      ((t, e = {}) => {
        ((t, e = {}) => {
          let n = _m("TTFB");
          let r = fm(t, n, Vm, e.reportAllChanges);
          Hm(() => {
            const i = sm();
            if (i) {
              n.value = Math.max(i.responseStart - gm(), 0);
              n.entries = [i];
              r(true);
              pm(() => {
                n = _m("TTFB", 0);
                r = fm(t, n, Vm, e.reportAllChanges);
                r(true);
              });
            }
          });
        })(e => {
          const n = (t => {
            let e = {
              waitingDuration: 0,
              cacheDuration: 0,
              dnsDuration: 0,
              connectionDuration: 0,
              requestDuration: 0
            };
            if (t.entries.length) {
              const n = t.entries[0];
              const r = n.activationStart || 0;
              const i = Math.max((n.workerStart || n.fetchStart) - r, 0);
              const s = Math.max(n.domainLookupStart - r, 0);
              const o = Math.max(n.connectStart - r, 0);
              const a = Math.max(n.connectEnd - r, 0);
              e = {
                waitingDuration: i,
                cacheDuration: s - i,
                dnsDuration: o - s,
                connectionDuration: a - o,
                requestDuration: t.value - a,
                navigationEntry: n
              };
            }
            return Object.assign(t, {
              attribution: e
            });
          })(e);
          t(n);
        }, e);
      })(t => {
        this.onReportTTFB(t, this.ttfbOpts);
      }, this.ttfbOpts);
    }
    if (this.vitalsToTrack.includes("FCP")) {
      ((t, e = {}) => {
        Cm(e => {
          const n = (t => {
            let e = {
              timeToFirstByte: 0,
              firstByteToFCP: t.value,
              loadState: om(dm())
            };
            if (t.entries.length) {
              const n = sm();
              const r = t.entries.at(-1);
              if (n) {
                const i = n.activationStart || 0;
                const s = Math.max(0, n.responseStart - i);
                e = {
                  timeToFirstByte: s,
                  firstByteToFCP: t.value - s,
                  loadState: om(t.entries[0].startTime),
                  navigationEntry: n,
                  fcpEntry: r
                };
              }
            }
            return Object.assign(t, {
              attribution: e
            });
          })(e);
          t(n);
        }, e);
      })(t => {
        this.onReportFCP(t, this.fcpOpts);
      }, this.fcpOpts);
    }
  }
  getAttrPrefix(t) {
    return t.toLowerCase();
  }
  getAttributesForPerformanceLongAnimationFrameTiming(t) {
    return {
      [E_]: t.duration,
      [S_]: t.entryType,
      [T_]: t.name,
      [x_]: t.renderStart,
      [A_]: t.startTime
    };
  }
  getAttributesForPerformanceScriptTiming(t) {
    return {
      [h_]: t.entryType,
      [d_]: t.startTime,
      [p_]: t.executionStart,
      [f_]: t.duration,
      [m_]: t.forcedStyleAndLayoutDuration,
      [g_]: t.invoker,
      [__]: t.pauseDuration,
      [y_]: t.sourceURL,
      [v_]: t.sourceFunctionName,
      [b_]: t.sourceCharPosition,
      [w_]: t.windowAttribution
    };
  }
  processPerformanceLongAnimationFrameTimingSpans(t, e) {
    if (!e) {
      return;
    }
    const n = this.getAttributesForPerformanceLongAnimationFrameTiming(e);
    this.tracer.startActiveSpan(e.name, {
      startTime: e.startTime
    }, r => {
      r.setAttributes(n);
      this.processPerformanceScriptTimingSpans(t, e.scripts);
      r.end(e.startTime + e.duration);
    });
  }
  processPerformanceScriptTimingSpans(t, e) {
    if (e && (e == null ? undefined : e.length)) {
      e.map(t => {
        this.tracer.startActiveSpan(t.name, {
          startTime: t.startTime
        }, e => {
          const n = this.getAttributesForPerformanceScriptTiming(t);
          e.setAttributes(n);
          e.end(t.startTime + t.duration);
        });
      });
    }
  }
  getElementFromNode(t) {
    if ((t == null ? undefined : t.nodeType) === Node.ELEMENT_NODE) {
      return t;
    }
  }
  addDataAttributes(t, e, n, r) {
    const i = t;
    if (i == null ? undefined : i.dataset) {
      for (const s in i.dataset) {
        const t = i.dataset[s];
        if (t !== undefined && (n === undefined || !!n.includes(s))) {
          e.setAttribute(`${r}.element.data.${s}`, t);
        }
      }
    }
  }
  disable() {
    if (this.isEnabled()) {
      this._isEnabled = false;
      this._diag.debug("Instrumentation  disabled");
    } else {
      this._diag.debug("Instrumentation already disabled");
    }
  }
  enable() {
    if (this.isEnabled()) {
      this._diag.debug("Instrumentation already enabled");
    } else {
      this._isEnabled = true;
      this._diag.debug("Instrumentation  enabled");
      this._diag.debug(`Sending spans for ${this.vitalsToTrack.join(",")}`);
    }
  }
  isEnabled() {
    return this._isEnabled;
  }
}
const F_ = "@honeycombio/instrumentation-global-errors";
function z_(t, e = {}, n = gc.getTracer(F_), r) {
  const i = t.message;
  const s = t.name;
  const o = Object.assign(Object.assign({
    [cl]: s,
    [ol]: i,
    [al]: t.stack
  }, function (t) {
    if (!t) {
      return {};
    }
    const e = ah.computeStackTrace(t).stack;
    const n = [];
    const r = [];
    const i = [];
    const s = [];
    if (Array.isArray(e)) {
      e.forEach(t => {
        n.push(t.line);
        r.push(t.column);
        i.push(t.func);
        s.push(t.url);
      });
      return {
        "exception.structured_stacktrace.columns": r,
        "exception.structured_stacktrace.lines": n,
        "exception.structured_stacktrace.functions": i,
        "exception.structured_stacktrace.urls": s
      };
    } else {
      return {};
    }
  }(t)), e);
  const a = n.startSpan("exception", {
    attributes: o
  }, ec.active());
  if (r) {
    r(a, t);
  }
  a.setStatus({
    code: Ya.ERROR,
    message: i
  });
  a.end();
}
class G_ extends $_ {
  constructor({
    enabled: t = true,
    applyCustomAttributesOnSpan: e
  } = {}) {
    super(F_, Zl, {
      enabled: t,
      applyCustomAttributesOnSpan: e
    });
    this.onError = t => {
      const e = "reason" in t ? t.reason : t.error;
      if (e) {
        z_(e, {}, this.tracer, this.applyCustomAttributesOnSpan);
      }
    };
    if (t) {
      this.enable();
    }
    this._isEnabled = t;
    this.applyCustomAttributesOnSpan = e;
  }
  init() {}
  disable() {
    if (this.isEnabled()) {
      this._isEnabled = false;
      window.removeEventListener("error", this.onError);
      window.removeEventListener("unhandledrejection", this.onError);
      this._diag.debug("Instrumentation  disabled");
    } else {
      this._diag.debug("Instrumentation already disabled");
    }
  }
  enable() {
    if (this.isEnabled()) {
      this._diag.debug("Instrumentation already enabled");
    } else {
      this._isEnabled = true;
      window.addEventListener("error", this.onError);
      window.addEventListener("unhandledrejection", this.onError);
      this._diag.debug("Instrumentation  enabled");
    }
  }
  isEnabled() {
    return this._isEnabled;
  }
}
const V_ = "x-honeycomb-team";
const H_ = "x-honeycomb-dataset";
function q_(t, e, n, r = false) {
  const i = Object.assign(Object.assign({}, t == null ? undefined : t.headers), n);
  if (e && !i[V_]) {
    i[V_] = e;
  }
  if (Hf(e)) {
    if (r && (t == null ? undefined : t.metricsDataset)) {
      i[H_] = t == null ? undefined : t.metricsDataset;
    } else if (t == null ? undefined : t.dataset) {
      i[H_] = t == null ? undefined : t.dataset;
    }
  }
  return i;
}
const W_ = (t = "") => {
  const e = new URL(t);
  const n = /(api)([.|-])?(.*?)(\.?)(honeycomb\.io)(.*)/.exec(e.host);
  if (n === null) {
    return {
      authRoot: undefined,
      uiRoot: undefined
    };
  }
  let r;
  let i;
  if (n[2] === "-") {
    r = `api-${n[3]}`;
    i = `ui-${n[3]}`;
  } else {
    r = n[3] ? `api.${n[3]}` : "api";
    i = n[3] ? `ui.${n[3]}` : "ui";
  }
  return {
    authRoot: `${e.protocol}//${r}.honeycomb.io/1/auth`,
    uiRoot: `${e.protocol}//${i}.honeycomb.io`
  };
};
class K_ {
  constructor(t, e, n, r, i) {
    this._traceUrl = "";
    this._logLevel = $o.DEBUG;
    if (n) {
      this._logLevel = n;
    }
    if (!t || !e) {
      this._logLevel;
      $o.DEBUG;
      return;
    }
    if (!r || !i) {
      this._logLevel;
      $o.DEBUG;
      return;
    }
    fetch(r, {
      headers: {
        "x-honeycomb-team": e
      }
    }).then(t => {
      if (t.ok) {
        return t.json();
      }
      throw new Error();
    }).then(n => {
      const a = n;
      if (!a.team?.slug) {
        throw new Error();
      }
      this._traceUrl = function (t, e, n, r, i) {
        let s = `${i}/${n}`;
        if (!Hf(t) && r) {
          s += `/environments/${r}`;
        }
        s += `/datasets/${e}/trace?trace_id`;
        return s;
      }(e, t, a.team?.slug, a.environment?.slug, i);
    }).catch(() => {
      this._logLevel;
      $o.INFO;
    });
  }
  export(t, e) {
    if (this._traceUrl) {
      t.forEach(t => {
        if (!t.parentSpanContext?.spanId) {
          this._logLevel;
          $o.INFO;
        }
      });
    }
    e({
      code: Il.SUCCESS
    });
  }
  shutdown() {
    return Promise.resolve();
  }
}
function Y_(t) {
  const e = [];
  if (t == null ? undefined : t.localVisualizations) {
    e.push(function (t) {
      const e = Xf(t);
      const {
        authRoot: n,
        uiRoot: r
      } = W_((t == null ? undefined : t.tracesEndpoint) || Wf(t));
      return new K_(t == null ? undefined : t.serviceName, e, t == null ? undefined : t.logLevel, n, r);
    }(t));
  }
  if (t == null ? undefined : t.traceExporter) {
    e.push(t == null ? undefined : t.traceExporter);
  }
  if (t == null ? undefined : t.traceExporters) {
    e.push(...t.traceExporters);
  }
  if ((t == null ? undefined : t.disableDefaultTraceExporter) !== true) {
    e.unshift(function (t) {
      const e = Xf(t);
      return new hd({
        url: Wf(t),
        headers: q_(t, e, t == null ? undefined : t.tracesHeaders),
        timeoutMillis: (t == null ? undefined : t.tracesTimeout) || (t == null ? undefined : t.timeout) || 10000
      });
    }(t));
  }
  n = [...e];
  return new Q_(n);
  var n;
}
function X_(t) {
  const e = [];
  if (t == null ? undefined : t.metricExporters) {
    e.push(...t.metricExporters);
  }
  if ((t == null ? undefined : t.disableDefaultMetricExporter) !== true) {
    e.unshift(function (t) {
      const e = (t => (t == null ? undefined : t.metricsApiKey) || (t == null ? undefined : t.apiKey))(t);
      return new bd({
        url: Kf(t),
        headers: q_(t, e, t == null ? undefined : t.metricsHeaders, true),
        timeoutMillis: (t == null ? undefined : t.metricsTimeout) || (t == null ? undefined : t.timeout) || 10000
      });
    }(t));
  }
  if (t == null ? undefined : t.localVisualizations) {
    e.push(new xp());
  }
  return e;
}
function J_(t) {
  const e = [];
  e.push(function (t) {
    const e = (t => (t == null ? undefined : t.logsApiKey) || (t == null ? undefined : t.apiKey))(t);
    return new wd({
      url: Yf(t),
      headers: q_(t, e, t == null ? undefined : t.logsHeaders),
      timeoutMillis: (t == null ? undefined : t.logsTimeout) || (t == null ? undefined : t.timeout) || 10000
    });
  }(t));
  if (t == null ? undefined : t.localVisualizations) {
    e.push(new If());
  }
  return e;
}
class Q_ {
  constructor(t) {
    this._exporters = t;
  }
  export(t, e) {
    this._exporters.forEach(n => n.export(t, e));
    e({
      code: Il.SUCCESS
    });
  }
  async shutdown() {
    const t = [];
    this._exporters.forEach(e => t.push(e.shutdown()));
    await Promise.all(t);
  }
}
class Z_ {
  constructor() {}
  onStart(t, e) {
    var n;
    (((n = fc.getBaggage(e)) === null || n === undefined ? undefined : n.getAllEntries()) ?? []).forEach(e => {
      t.setAttribute(e[0], e[1].value);
      nc.debug(`@honeycombio/opentelemetry-web: 🚨 Baggage in all outgoing headers: ${e[0]}=${e[1].value} `);
    });
  }
  onEnd() {}
  forceFlush() {
    return Promise.resolve();
  }
  shutdown() {
    return Promise.resolve();
  }
}
class ty {
  constructor() {}
  onStart(t) {
    const {
      href: e,
      pathname: n,
      search: r,
      hash: i,
      hostname: s
    } = window.location;
    t.setAttributes({
      [Ym]: window.innerWidth,
      [Xm]: window.innerHeight,
      [ng]: i,
      [rg]: e,
      [ig]: n,
      [sg]: s,
      [og]: r,
      [ag]: n
    });
  }
  onEnd() {}
  forceFlush() {
    return Promise.resolve();
  }
  shutdown() {
    return Promise.resolve();
  }
}
const ey = new Nu().generateTraceId();
const ny = {
  getSessionId: () => ey
};
const ry = t => {
  const e = [];
  var n;
  if (!(t == null ? undefined : t.disableBrowserAttributes)) {
    e.push(new ty());
  }
  e.push(new Z_(), (n = (t == null ? undefined : t.sessionProvider) || ny, new Ed(n)), ...((t == null ? undefined : t.spanProcessors) || []));
  return e;
};
const iy = "browser.language";
const sy = "browser.mobile";
const oy = "telemetry.distro.name";
const ay = "telemetry.distro.version";
const cy = {
  path: true,
  hash: true,
  hostname: true,
  referrer: true,
  url: false,
  search: false
};
function uy(t) {
  if (t === false || !window?.location) {
    return Mc({});
  }
  const e = function (t) {
    if (!t) {
      return cy;
    }
    return Object.assign(Object.assign({}, cy), t);
  }(t);
  const {
    href: n,
    pathname: r,
    search: i,
    hash: s,
    hostname: o
  } = window.location;
  return Mc({
    [cg]: ly(e.url, n),
    [ug]: ly(e.path, r),
    [lg]: ly(e.search, i),
    [hg]: ly(e.hash, s),
    [dg]: ly(e.hostname, o),
    [pg]: ly(e.referrer, document.referrer)
  });
}
function ly(t, e) {
  if (t) {
    return e;
  }
}
function hy() {
  const {
    browserName: t,
    browserVersion: e,
    deviceType: n
  } = (t => {
    const e = new Od(t);
    const {
      name: n,
      version: r
    } = e.getBrowser();
    return {
      browserName: n ?? "unknown",
      browserVersion: r ?? "unknown",
      deviceType: (i = e.getDevice().type, s = n, i || s ? i || "desktop" : "unknown")
    };
    var i;
    var s;
  })(navigator.userAgent);
  var r;
  var i;
  return Mc({
    [hl]: navigator.userAgent,
    [sy]: navigator.userAgent.includes("Mobi"),
    [Km]: navigator.maxTouchPoints > 0,
    [iy]: navigator.language,
    [qm]: t,
    [Wm]: e,
    [Jm]: n,
    [Qm]: (i = navigator.connection, (i == null ? undefined : i.effectiveType) ?? "unknown"),
    [Zm]: window.screen.width,
    [tg]: window.screen.height,
    [eg]: (r = window.screen.width, r <= 768 ? "small" : r > 768 && r <= 1024 ? "medium" : r > 1024 ? "large" : "unknown")
  });
}
const dy = t => {
  let e = Mc({});
  if (!(t == null ? undefined : t.disableBrowserAttributes)) {
    e = e.merge(uy(t == null ? undefined : t.entryPageAttributes)).merge(hy());
  }
  e = e.merge(Mc({
    [fg]: Zl,
    [mg]: "browser",
    [oy]: "@honeycombio/opentelemetry-web",
    [ay]: Zl
  }));
  if (t == null ? undefined : t.resource) {
    e = e.merge(t.resource);
  }
  if (t == null ? undefined : t.resourceAttributes) {
    e = e.merge(Mc(t.resourceAttributes));
  }
  return e;
};
class py extends Lf {
  constructor(t) {
    const r = [...((t == null ? undefined : t.instrumentations) || [])];
    if ((t == null ? undefined : t.webVitalsInstrumentationConfig)?.enabled !== false) {
      r.push(new j_(t == null ? undefined : t.webVitalsInstrumentationConfig));
    }
    if ((t == null ? undefined : t.globalErrorsInstrumentationConfig)?.enabled !== false) {
      r.push(new G_(t == null ? undefined : t.globalErrorsInstrumentationConfig));
    }
    super(Object.assign(Object.assign({}, t), {
      instrumentations: r,
      resource: dy(t),
      sampler: nm(t),
      spanProcessors: ry(t),
      traceExporter: Y_(t),
      metricExporters: X_(t),
      logExporters: J_(t)
    }));
    tm(t);
    if (t == null ? undefined : t.debug) {
      em(t);
    }
  }
}
const fy = "claude-browser-extension";
async function my(t, e, n) {
  return gc.getTracer(fy).startActiveSpan(t, {
    kind: Wa.INTERNAL
  }, n ? gc.setSpan(ec.active(), n) : ec.active(), async t => {
    try {
      const n = await e(t);
      t.setStatus({
        code: Ya.OK
      });
      return n;
    } catch (n) {
      t.setStatus({
        code: Ya.ERROR,
        message: n.message
      });
      t.recordException(n);
      throw n;
    } finally {
      t.end();
    }
  });
}
function gy(t) {
  const e = "0123456789abcdef";
  const n = Array.from({
    length: 32
  }, () => e[Math.floor(Math.random() * 16)]).join("");
  const r = Array.from({
    length: 16
  }, () => e[Math.floor(Math.random() * 16)]).join("");
  const i = {
    traceparent: `00-${n}-${r}-01`,
    "x-cloud-trace-context": `${n}/${parseInt(r, 16).toString()};o=1`,
    baggage: "forceTrace=true",
    "x-refinery-force-trace": "true"
  };
  return {
    traceId: n,
    headers: i
  };
}
function _y() {
  const t = E();
  const e = chrome.runtime.getManifest();
  try {
    new py({
      debug: t.environment !== "production" || false,
      apiKey: "hcaik_01k4x5jaf9v7sdymjzmxvktd6whp9x2y75jj8y5f8y7aaf1zy6aedg9858",
      serviceName: fy,
      sampleRate: 1,
      resourceAttributes: {
        "extension.version": e.version,
        "build.type": "external"
      },
      webVitalsInstrumentationConfig: {
        enabled: false
      }
    }).start();
  } catch {
    return;
  }
}
class yy {
  static async getAllPrompts() {
    return (await $(B.SAVED_PROMPTS)) || [];
  }
  static async getPromptById(t) {
    return (await this.getAllPrompts()).find(e => e.id === t);
  }
  static async getPromptByCommand(t) {
    return (await this.getAllPrompts()).find(e => e.command === t);
  }
  static async savePrompt(t) {
    const e = await this.getAllPrompts();
    if (t.command) {
      if (e.find(e => e.command === t.command)) {
        throw new Error(`/${t.command} is already in use`);
      }
    }
    const n = {
      ...t,
      id: `prompt_${Date.now()}`,
      createdAt: t.createdAt || Date.now(),
      usageCount: t.usageCount || 0
    };
    e.push(n);
    await j(B.SAVED_PROMPTS, e);
    if (n.repeatType && n.repeatType !== "none") {
      await this.updateAlarmForPrompt(n);
    }
    return n;
  }
  static async updatePrompt(t, e) {
    const n = await this.getAllPrompts();
    const r = n.findIndex(e => e.id === t);
    if (r === -1) {
      return;
    }
    if (e.command && e.command !== n[r].command) {
      if (n.find(t => t.command === e.command)) {
        throw new Error(`/${e.command} is already in use`);
      }
    }
    const i = n[r];
    n[r] = {
      ...n[r],
      ...e
    };
    await j(B.SAVED_PROMPTS, n);
    const s = n[r];
    if (i.repeatType !== s.repeatType || i.specificTime !== s.specificTime || i.specificDate !== s.specificDate || i.dayOfWeek !== s.dayOfWeek || i.dayOfMonth !== s.dayOfMonth || i.monthAndDay !== s.monthAndDay) {
      await this.updateAlarmForPrompt(s);
    }
    return n[r];
  }
  static async deletePrompt(t) {
    const e = await this.getAllPrompts();
    const n = e.find(e => e.id === t);
    const r = e.filter(e => e.id !== t);
    return r.length !== e.length && (n?.repeatType && n.repeatType !== "none" && (await chrome.alarms.clear(t)), await j(B.SAVED_PROMPTS, r), true);
  }
  static async recordPromptUsage(t) {
    const e = await this.getAllPrompts();
    const n = e.find(e => e.id === t);
    if (n) {
      n.lastUsedAt = Date.now();
      n.usageCount = (n.usageCount || 0) + 1;
      await j(B.SAVED_PROMPTS, e);
    }
  }
  static async searchPrompts(t) {
    const e = await this.getAllPrompts();
    const n = t.toLowerCase();
    return e.filter(t => t.prompt.toLowerCase().includes(n) || t.command && t.command.toLowerCase().includes(n));
  }
  static async exportPrompts(t) {
    const e = await this.getAllPrompts();
    const n = t ? e.filter(e => t.includes(e.id)) : e;
    return JSON.stringify(n, null, 2);
  }
  static async importPrompts(t, e = false) {
    const n = JSON.parse(t);
    const r = e ? [] : await this.getAllPrompts();
    const i = n.map(t => ({
      ...t,
      id: `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      usageCount: 0,
      lastUsedAt: undefined
    }));
    const s = [...r, ...i].filter(t => t.command).map(t => t.command);
    const o = new Set(s);
    if (s.length !== o.size) {
      throw new Error("Import contains duplicate command shortcuts");
    }
    const a = [...r, ...i];
    await j(B.SAVED_PROMPTS, a);
    return i.length;
  }
  static async updateAlarmForPrompt(t) {
    const e = t.id;
    await chrome.alarms.clear(e);
    if (!t.repeatType || t.repeatType === "none" || !t.specificTime) {
      return;
    }
    const n = new Date();
    const [r, i] = t.specificTime.split(":").map(Number);
    switch (t.repeatType) {
      case "once":
        {
          if (!t.specificDate) {
            return;
          }
          const [s, o, a] = t.specificDate.split("-").map(Number);
          const c = new Date(s, o - 1, a, r, i, 0, 0);
          if (c > n) {
            await chrome.alarms.create(e, {
              when: c.getTime()
            });
          }
          break;
        }
      case "daily":
        {
          const t = new Date();
          t.setHours(r, i, 0, 0);
          if (t <= n) {
            t.setDate(t.getDate() + 1);
          }
          await chrome.alarms.create(e, {
            when: t.getTime(),
            periodInMinutes: 1440
          });
          break;
        }
      case "weekly":
        {
          if (t.dayOfWeek === undefined) {
            return;
          }
          let s = (t.dayOfWeek - n.getDay() + 7) % 7;
          if (s === 0) {
            const t = new Date();
            t.setHours(r, i, 0, 0);
            if (t <= n) {
              s = 7;
            }
          }
          const o = new Date();
          o.setDate(n.getDate() + s);
          o.setHours(r, i, 0, 0);
          await chrome.alarms.create(e, {
            when: o.getTime(),
            periodInMinutes: 10080
          });
          break;
        }
      case "monthly":
        {
          if (!t.dayOfMonth) {
            return;
          }
          const s = new Date();
          s.setDate(t.dayOfMonth);
          s.setHours(r, i, 0, 0);
          if (s <= n) {
            s.setMonth(s.getMonth() + 1);
          }
          await chrome.alarms.create(e, {
            when: s.getTime()
          });
          break;
        }
      case "annually":
        {
          if (!t.monthAndDay) {
            return;
          }
          const [s, o] = t.monthAndDay.split("-").map(Number);
          const a = new Date();
          a.setMonth(s - 1);
          a.setDate(o);
          a.setHours(r, i, 0, 0);
          if (a <= n) {
            a.setFullYear(a.getFullYear() + 1);
          }
          await chrome.alarms.create(e, {
            when: a.getTime()
          });
          break;
        }
    }
  }
  static async updateNextRunTimes() {
    const t = await this.getAllPrompts();
    const e = await chrome.alarms.getAll();
    let n = false;
    for (const r of t) {
      if (r.repeatType && r.repeatType !== "none") {
        const t = e.find(t => t.name === r.id);
        const i = t?.scheduledTime;
        if (r.nextRun !== i) {
          r.nextRun = i;
          n = true;
        }
      } else if (r.nextRun) {
        r.nextRun = undefined;
        n = true;
      }
    }
    if (n) {
      await j(B.SAVED_PROMPTS, t);
    }
  }
}
var vy = (t => {
  t.NAVIGATE = "navigate";
  t.READ_PAGE_CONTENT = "read_page_content";
  t.READ_CONSOLE_MESSAGES = "read_console_messages";
  t.READ_NETWORK_REQUESTS = "read_network_requests";
  t.CLICK = "click";
  t.TYPE = "type";
  t.UPLOAD_IMAGE = "upload_image";
  t.DOMAIN_TRANSITION = "domain_transition";
  t.PLAN_APPROVAL = "plan_approval";
  t.EXECUTE_JAVASCRIPT = "execute_javascript";
  t.REMOTE_MCP = "remote_mcp";
  return t;
})(vy || {});
var by = (t => {
  t.ALLOW = "allow";
  t.DENY = "deny";
  return t;
})(by || {});
var wy = (t => {
  t.ONCE = "once";
  t.ALWAYS = "always";
  return t;
})(wy || {});
function Ey(t) {
  return {
    [vy.NAVIGATE]: "navigate to",
    [vy.READ_PAGE_CONTENT]: "read page content on",
    [vy.READ_CONSOLE_MESSAGES]: "read debugging information on",
    [vy.READ_NETWORK_REQUESTS]: "read debugging information on",
    [vy.CLICK]: "click on",
    [vy.TYPE]: "type text into",
    [vy.UPLOAD_IMAGE]: "upload an image to",
    [vy.DOMAIN_TRANSITION]: "navigate from",
    [vy.PLAN_APPROVAL]: "approve plan for",
    [vy.EXECUTE_JAVASCRIPT]: "execute JavaScript on",
    [vy.REMOTE_MCP]: "access"
  }[t];
}
const Sy = ["follow_a_plan", "skip_all_permission_checks"];
const Ty = "follow_a_plan";
class xy {
  permissions = [];
  cache = new Map();
  getSkipAllPermissions;
  forcePrompt = false;
  bypassLocalhostForMcp = false;
  turnApprovedDomains = new Set();
  constructor(t, e) {
    this.getSkipAllPermissions = t;
    this.bypassLocalhostForMcp = e?.bypassLocalhostForMcp ?? false;
    this.loadPermissions();
    this.setupStorageListener();
  }
  setForcePrompt(t) {
    this.forcePrompt = t;
  }
  setTurnApprovedDomains(t) {
    this.turnApprovedDomains.clear();
    for (const e of t) {
      const t = this.normalizeDomain(e);
      if (t) {
        this.turnApprovedDomains.add(t);
      }
    }
  }
  clearTurnApprovedDomains() {
    this.turnApprovedDomains.clear();
  }
  isTurnApprovedDomain(t) {
    const e = this.normalizeDomain(t);
    return !!e && this.turnApprovedDomains.has(e);
  }
  getTurnApprovedDomains() {
    return Array.from(this.turnApprovedDomains);
  }
  normalizeDomain(t) {
    try {
      if (t.startsWith("http://") || t.startsWith("https://")) {
        return new URL(t).hostname.toLowerCase().replace(/^www\./, "");
      }
      const e = t.toLowerCase().replace(/^www\./, "").split("/")[0];
      if (e.startsWith("[")) {
        const t = e.indexOf("]");
        if (t === -1) {
          return e;
        } else {
          return e.slice(1, t);
        }
      }
      const n = e.indexOf(":");
      if (n !== e.lastIndexOf(":") || n === -1) {
        return e;
      } else {
        return e.slice(0, n);
      }
    } catch {
      return null;
    }
  }
  async checkPermission(t, e, n) {
    const r = new URL(t).hostname;
    if (r && this.turnApprovedDomains.size > 0 && !this.isTurnApprovedDomain(r)) {
      return {
        allowed: false,
        needsPrompt: false
      };
    }
    if (this.bypassLocalhostForMcp && this.isLocalhostUrl(t)) {
      return {
        allowed: true,
        needsPrompt: false
      };
    }
    if (!this.forcePrompt && this.getSkipAllPermissions()) {
      return {
        allowed: true,
        permission: undefined
      };
    }
    const {
      host: i
    } = new URL(t);
    if (!this.forcePrompt && this.isTurnApprovedDomain(i)) {
      return {
        allowed: true,
        needsPrompt: false
      };
    }
    await this.loadPermissions();
    const s = this.findApplicablePermission(i, e);
    if (s) {
      if (!n?.readonly) {
        s.lastUsed = Date.now();
        await this.savePermissions();
      }
      return {
        allowed: s.action === by.ALLOW,
        permission: s
      };
    } else {
      this.forcePrompt;
      return {
        allowed: false,
        needsPrompt: true
      };
    }
  }
  async checkDomainTransition(t, e) {
    if (this.bypassLocalhostForMcp) {
      const n = this.isLocalhostDomain(t);
      const r = this.isLocalhostDomain(e);
      if (r) {
        return {
          allowed: true,
          needsPrompt: false
        };
      }
      if (n && !r) {
        return {
          allowed: false,
          needsPrompt: true
        };
      }
    }
    if (this.forcePrompt) {
      return {
        allowed: false,
        needsPrompt: true
      };
    }
    if (this.isTurnApprovedDomain(e)) {
      return {
        allowed: true,
        needsPrompt: false
      };
    }
    await this.loadPermissions();
    const n = this.permissions.filter(n => n.scope.type === "domain_transition" && n.scope.fromDomain === t && n.scope.toDomain === e);
    const r = n.find(t => t.action === by.DENY);
    if (r) {
      r.lastUsed = Date.now();
      await this.savePermissions();
      return {
        allowed: false,
        permission: r
      };
    }
    const i = n.find(t => t.action === by.ALLOW);
    if (i) {
      i.lastUsed = Date.now();
      await this.savePermissions();
      return {
        allowed: true,
        permission: i
      };
    } else {
      return {
        allowed: false,
        needsPrompt: true
      };
    }
  }
  async grantPermission(t, e, n) {
    const r = {
      id: crypto.randomUUID(),
      scope: t,
      action: by.ALLOW,
      duration: e,
      createdAt: Date.now(),
      toolUseId: e === wy.ONCE ? n : undefined
    };
    this.permissions.push(r);
    await this.savePermissions();
    this.clearCache();
  }
  async denyPermission(t, e) {
    if (e === wy.ONCE) {
      return;
    }
    const n = {
      id: crypto.randomUUID(),
      scope: t,
      action: by.DENY,
      duration: e,
      createdAt: Date.now()
    };
    if (e === wy.ALWAYS) {
      this.permissions.push(n);
    }
    await this.savePermissions();
    this.clearCache();
  }
  async revokePermission(t) {
    this.permissions = this.permissions.filter(e => e.id !== t);
    await this.savePermissions();
    this.clearCache();
  }
  async clearAllPermissions() {
    this.permissions = [];
    await this.savePermissions();
    this.clearCache();
  }
  async clearOncePermissions() {
    const t = this.permissions.length;
    this.permissions = this.permissions.filter(t => t.duration !== wy.ONCE);
    if (t - this.permissions.length > 0) {
      await this.savePermissions();
      this.clearCache();
    }
  }
  getPermissionsByScope() {
    return {
      netloc: this.permissions.filter(t => t.scope.type === "netloc"),
      domain_transition: this.permissions.filter(t => t.scope.type === "domain_transition")
    };
  }
  getAllPermissions() {
    return [...this.permissions];
  }
  findApplicablePermission(t, e) {
    const n = `${t}:${e || "no-tool"}`;
    if (this.cache.has(n)) {
      return this.cache.get(n);
    }
    if (e) {
      const n = this.permissions.find(n => n.duration === wy.ONCE && n.toolUseId === e && n.scope.type === "netloc" && n.scope.netloc && this.matchesNetloc(t, n.scope.netloc));
      if (n) {
        this.revokePermission(n.id);
        return n;
      }
    }
    this.permissions.forEach(t => {});
    const r = this.permissions.filter(e => e.scope.type === "netloc" && e.duration !== wy.ONCE && e.scope.netloc && this.matchesNetloc(t, e.scope.netloc));
    const i = r.find(t => t.action === by.DENY);
    if (i) {
      this.cache.set(n, i);
      return i;
    }
    const s = r.find(t => t.action === by.ALLOW);
    if (s) {
      this.cache.set(n, s);
      return s;
    } else {
      return null;
    }
  }
  async hasSiteWidePermissions(t) {
    await this.loadPermissions();
    return this.permissions.some(e => e.scope.type === "netloc" && e.duration === wy.ALWAYS && e.action === by.ALLOW && e.scope.netloc && this.matchesNetloc(t, e.scope.netloc));
  }
  matchesNetloc(t, e) {
    if (e.startsWith("*.")) {
      const n = e.slice(2);
      return t === n || t.endsWith("." + n);
    }
    return t === e || t.replace(/^www\./, "") === e.replace(/^www\./, "");
  }
  async loadPermissions() {
    try {
      const t = await $(B.PERMISSION_STORAGE);
      if (t) {
        this.permissions = t.permissions || [];
      }
    } catch (t) {}
  }
  async savePermissions() {
    try {
      const t = {
        permissions: this.permissions
      };
      await j(B.PERMISSION_STORAGE, t);
    } catch (t) {}
  }
  setupStorageListener() {
    chrome.storage.onChanged.addListener((t, e) => {
      if (e === "local" && t[B.PERMISSION_STORAGE]) {
        this.loadPermissions();
        this.clearCache();
      }
    });
  }
  clearCache() {
    this.cache.clear();
  }
  isLocalhostDomain(t) {
    const e = t.toLowerCase();
    return e === "localhost" || e === "127.0.0.1" || e === "[::1]" || e === "::1" || e.startsWith("127.") || e.endsWith(".localhost");
  }
  isLocalhostUrl(t) {
    try {
      const e = new URL(t);
      const n = e.protocol;
      return (n === "http:" || n === "https:") && this.isLocalhostDomain(e.hostname);
    } catch {
      return false;
    }
  }
}
export { ke as A, de as B, Pe as C, Ty as D, X as E, L as F, nt as G, Oe as H, ot as I, ut as J, at as K, it as L, ct as M, Ae as N, Ce as O, wy as P, Re as Q, rt as R, B as S, vy as T, Sy as U, et as W, d as _, C as a, l as b, yy as c, Ey as d, K as e, gy as f, $ as g, M as h, D as i, E as j, Ya as k, se as l, xy as m, Co as n, _y as o, Ie as p, p as q, F as r, j as s, U as t, N as u, _ as v, my as w, pe as x, he as y, xe as z };
