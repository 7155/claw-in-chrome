import { e as r } from "./index-BVS4T5_D.js";
var n = {};
var t = {};
var e = [];
for (var u = 0; u < 64;) {
  e[u] = Math.sin(++u % Math.PI) * 4294967296 | 0;
}
const i = r(Object.freeze(Object.defineProperty({
  __proto__: null,
  default: function (r) {
    var n;
    var t;
    var i;
    var o = [n = 1732584193, t = 4023233417, ~n, ~t];
    var f = [];
    var a = unescape(encodeURI(r)) + "";
    var c = a.length;
    r = --c / 4 + 2 | 15;
    f[--r] = c * 8;
    while (~c) {
      f[c >> 2] |= a.charCodeAt(c) << c-- * 8;
    }
    for (u = a = 0; u < r; u += 16) {
      for (c = o; a < 64; c = [i = c[3], n + ((i = c[0] + [n & t | ~n & i, i & n | ~i & t, n ^ t ^ i, t ^ (n | ~i)][c = a >> 4] + e[a] + ~~f[u | [a, a * 5 + 1, a * 3 + 5, a * 7][c] & 15]) << (c = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][c * 4 + a++ % 4]) | i >>> -c), n, t]) {
        n = c[1] | 0;
        t = c[2];
      }
      for (a = 4; a;) {
        o[--a] += c[a];
      }
    }
    for (r = ""; a < 32;) {
      r += (o[a >> 3] >> (a++ ^ 1) * 4 & 15).toString(16);
    }
    return r;
  }
}, Symbol.toStringTag, {
  value: "Module"
})));
var o;
var f;
var a;
var c;
var l;
var s;
var v;
var p;
var y;
var d;
var h;
var b;
var g;
var m;
var _;
var w;
var A;
var j;
var O;
var k;
var S;
var N;
var E;
var U;
var I;
var P;
var M;
var F;
var T;
var x;
var C;
var H;
var J;
var G;
var L;
var D;
var R;
var V;
var W;
var B;
var Q;
var Y;
var q;
var z;
var K;
var X;
var Z;
var $;
var rr;
var nr;
var tr;
var er;
var ur;
var ir;
var or;
var fr;
var ar;
var cr;
var lr;
var sr;
var vr;
var pr;
var yr;
var dr;
var hr;
var br;
var gr;
var mr;
var _r;
var wr;
var Ar;
var jr;
var Or;
var kr;
var Sr;
var Nr;
var Er;
var Ur;
var Ir;
var Pr;
var Mr;
var Fr;
var Tr;
var xr;
var Cr;
var Hr;
var Jr;
var Gr;
var Lr;
var Dr;
var Rr;
var Vr;
var Wr;
var Br;
var Qr;
var Yr;
var qr;
var zr;
var Kr;
var Xr;
var Zr;
var $r;
var rn;
var nn;
var tn;
var en;
var un;
var on;
var fn;
var an;
var cn;
var ln;
var sn;
var vn;
var pn;
var yn;
var dn;
var hn;
var bn;
var gn;
var mn;
var _n;
var wn;
var An;
var jn;
var On;
var kn;
var Sn;
var Nn;
var En;
var Un;
var In;
var Pn;
var Mn;
var Fn;
var Tn;
var xn;
var Cn;
var Hn;
var Jn;
var Gn;
var Ln;
var Dn;
var Rn;
var Vn;
var Wn;
var Bn;
var Qn;
var Yn;
var qn;
var zn;
var Kn;
var Xn;
var Zn;
var $n;
var rt;
var nt;
var tt;
var et;
var ut;
var it;
var ot;
var ft;
var at;
var ct;
var lt;
var st;
var vt;
var pt;
var yt;
var dt;
var ht;
var bt;
var gt;
var mt;
var _t;
var wt;
var At;
var jt;
var Ot;
var kt;
var St;
var Nt;
var Et;
var Ut;
var It;
var Pt;
var Mt = {
  exports: {}
};
function Ft() {
  if (!o) {
    o = 1;
    Mt.exports = function (r, n, t, e, u) {
      n = n.split ? n.split(".") : n;
      e = 0;
      for (; e < n.length; e++) {
        r = r ? r[n[e]] : u;
      }
      if (r === u) {
        return t;
      } else {
        return r;
      }
    };
  }
  return Mt.exports;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Tt() {
  if (a) {
    return f;
  }
  a = 1;
  var r = Number.POSITIVE_INFINITY;
  return f = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function xt() {
  if (v) {
    return s;
  }
  v = 1;
  var r = l ? c : (l = 1, c = Number);
  return s = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ct() {
  if (y) {
    return p;
  }
  y = 1;
  var r = xt().NEGATIVE_INFINITY;
  return p = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ht() {
  if (h) {
    return d;
  }
  h = 1;
  return d = 1023;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Jt() {
  if (S) {
    return k;
  }
  S = 1;
  var r = O ? j : (O = 1, j = function (r) {
    return r != r;
  });
  return k = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gt() {
  if (I) {
    return U;
  }
  I = 1;
  var r = function () {
    if (E) {
      return N;
    }
    E = 1;
    var r = Tt();
    var n = Ct();
    return N = function (t) {
      return t === r || t === n;
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return U = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2022 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Lt() {
  if (J) {
    return H;
  }
  J = 1;
  var r = function () {
    if (C) {
      return x;
    }
    C = 1;
    var r = typeof Object.defineProperty == "function" ? Object.defineProperty : null;
    return x = r;
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2021 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return H = function () {
    try {
      r({}, "x", {});
      return true;
    } catch (n) {
      return false;
    }
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Dt() {
  if (W) {
    return V;
  }
  W = 1;
  var r;
  var n = Lt();
  var t = function () {
    if (L) {
      return G;
    }
    L = 1;
    var r = Object.defineProperty;
    return G = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = function () {
    if (R) {
      return D;
    }
    R = 1;
    var r = Object.prototype;
    var n = r.toString;
    var t = r.__defineGetter__;
    var e = r.__defineSetter__;
    var u = r.__lookupGetter__;
    var i = r.__lookupSetter__;
    return D = function (o, f, a) {
      var c;
      var l;
      var s;
      var v;
      if (typeof o != "object" || o === null || n.call(o) === "[object Array]") {
        throw new TypeError("invalid argument. First argument must be an object. Value: `" + o + "`.");
      }
      if (typeof a != "object" || a === null || n.call(a) === "[object Array]") {
        throw new TypeError("invalid argument. Property descriptor must be an object. Value: `" + a + "`.");
      }
      if (l = "value" in a) {
        if (u.call(o, f) || i.call(o, f)) {
          c = o.__proto__;
          o.__proto__ = r;
          delete o[f];
          o[f] = a.value;
          o.__proto__ = c;
        } else {
          o[f] = a.value;
        }
      }
      s = "get" in a;
      v = "set" in a;
      if (l && (s || v)) {
        throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");
      }
      if (s && t) {
        t.call(o, f, a.get);
      }
      if (v && e) {
        e.call(o, f, a.set);
      }
      return o;
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  r = n() ? t : e;
  return V = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Rt() {
  if (q) {
    return Y;
  }
  q = 1;
  var r = function () {
    if (Q) {
      return B;
    }
    Q = 1;
    var r = Dt();
    return B = function (n, t, e) {
      r(n, t, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: e
      });
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return Y = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Vt() {
  if (Z) {
    return X;
  }
  Z = 1;
  var r = K ? z : (K = 1, z = function () {
    return typeof Symbol == "function" && typeof Symbol("foo") == "symbol";
  });
  return X = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Wt() {
  if (tr) {
    return nr;
  }
  tr = 1;
  var r = function () {
    if (rr) {
      return $;
    }
    rr = 1;
    var r = Vt()();
    return $ = function () {
      return r && typeof Symbol.toStringTag == "symbol";
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return nr = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Bt() {
  if (ur) {
    return er;
  }
  ur = 1;
  var r = Object.prototype.toString;
  return er = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Qt() {
  if (lr) {
    return cr;
  }
  lr = 1;
  var r = function () {
    if (ar) {
      return fr;
    }
    ar = 1;
    var r = Object.prototype.hasOwnProperty;
    return fr = function (n, t) {
      return n != null && r.call(n, t);
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return cr = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Yt() {
  if (yr) {
    return pr;
  }
  yr = 1;
  var r = Qt();
  var n = function () {
    if (vr) {
      return sr;
    }
    vr = 1;
    var r = typeof Symbol == "function" ? Symbol.toStringTag : "";
    return sr = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  t = Bt();
  return pr = function (e) {
    var u;
    var i;
    var o;
    if (e == null) {
      return t.call(e);
    }
    i = e[n];
    u = r(e, n);
    try {
      e[n] = undefined;
    } catch (f) {
      return t.call(e);
    }
    o = t.call(e);
    if (u) {
      e[n] = i;
    } else {
      delete e[n];
    }
    return o;
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function qt() {
  if (hr) {
    return dr;
  }
  hr = 1;
  var r;
  var n = Wt();
  var t = function () {
    if (or) {
      return ir;
    }
    or = 1;
    var r = Bt();
    return ir = function (n) {
      return r.call(n);
    };
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = Yt();
  r = n() ? e : t;
  return dr = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function zt() {
  if (_r) {
    return mr;
  }
  _r = 1;
  var r = function () {
    if (gr) {
      return br;
    }
    gr = 1;
    var r = qt();
    var n = typeof Uint32Array == "function";
    return br = function (t) {
      return n && t instanceof Uint32Array || r(t) === "[object Uint32Array]";
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return mr = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Kt() {
  if (Sr) {
    return kr;
  }
  Sr = 1;
  var r = zt();
  var n = Ar ? wr : (Ar = 1, wr = 4294967295);
  var t = function () {
    if (Or) {
      return jr;
    }
    Or = 1;
    var r = typeof Uint32Array == "function" ? Uint32Array : null;
    return jr = r;
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return kr = function () {
    var e;
    var u;
    if (typeof t != "function") {
      return false;
    }
    try {
      u = new t(u = [1, 3.14, -3.14, n + 1, n + 2]);
      e = r(u) && u[0] === 1 && u[1] === 3 && u[2] === n - 2 && u[3] === 0 && u[4] === 1;
    } catch (i) {
      e = false;
    }
    return e;
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Xt() {
  if (Tr) {
    return Fr;
  }
  Tr = 1;
  var r;
  var n = function () {
    if (Er) {
      return Nr;
    }
    Er = 1;
    var r = Kt();
    return Nr = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  t = function () {
    if (Ir) {
      return Ur;
    }
    Ir = 1;
    var r = typeof Uint32Array == "function" ? Uint32Array : undefined;
    return Ur = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = Mr ? Pr : (Mr = 1, Pr = function () {
    throw new Error("not implemented");
  });
  r = n() ? t : e;
  return Fr = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Zt() {
  if (Jr) {
    return Hr;
  }
  Jr = 1;
  var r = function () {
    if (Cr) {
      return xr;
    }
    Cr = 1;
    var r = qt();
    var n = typeof Float64Array == "function";
    return xr = function (t) {
      return n && t instanceof Float64Array || r(t) === "[object Float64Array]";
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return Hr = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $t() {
  if (Rr) {
    return Dr;
  }
  Rr = 1;
  var r = Zt();
  var n = function () {
    if (Lr) {
      return Gr;
    }
    Lr = 1;
    var r = typeof Float64Array == "function" ? Float64Array : null;
    return Gr = r;
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return Dr = function () {
    var t;
    var e;
    if (typeof n != "function") {
      return false;
    }
    try {
      e = new n([1, 3.14, -3.14, NaN]);
      t = r(e) && e[0] === 1 && e[1] === 3.14 && e[2] === -3.14 && e[3] != e[3];
    } catch (u) {
      t = false;
    }
    return t;
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function re() {
  if (Kr) {
    return zr;
  }
  Kr = 1;
  var r;
  var n = function () {
    if (Wr) {
      return Vr;
    }
    Wr = 1;
    var r = $t();
    return Vr = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  t = function () {
    if (Qr) {
      return Br;
    }
    Qr = 1;
    var r = typeof Float64Array == "function" ? Float64Array : undefined;
    return Br = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = qr ? Yr : (qr = 1, Yr = function () {
    throw new Error("not implemented");
  });
  r = n() ? t : e;
  return zr = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ne() {
  if (rn) {
    return $r;
  }
  rn = 1;
  var r = function () {
    if (Zr) {
      return Xr;
    }
    Zr = 1;
    var r = qt();
    var n = typeof Uint8Array == "function";
    return Xr = function (t) {
      return n && t instanceof Uint8Array || r(t) === "[object Uint8Array]";
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return $r = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function te() {
  if (fn) {
    return on;
  }
  fn = 1;
  var r = ne();
  var n = tn ? nn : (tn = 1, nn = 255);
  var t = function () {
    if (un) {
      return en;
    }
    un = 1;
    var r = typeof Uint8Array == "function" ? Uint8Array : null;
    return en = r;
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return on = function () {
    var e;
    var u;
    if (typeof t != "function") {
      return false;
    }
    try {
      u = new t(u = [1, 3.14, -3.14, n + 1, n + 2]);
      e = r(u) && u[0] === 1 && u[1] === 3 && u[2] === n - 2 && u[3] === 0 && u[4] === 1;
    } catch (i) {
      e = false;
    }
    return e;
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ee() {
  if (dn) {
    return yn;
  }
  dn = 1;
  var r;
  var n = function () {
    if (cn) {
      return an;
    }
    cn = 1;
    var r = te();
    return an = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  t = function () {
    if (sn) {
      return ln;
    }
    sn = 1;
    var r = typeof Uint8Array == "function" ? Uint8Array : undefined;
    return ln = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = pn ? vn : (pn = 1, vn = function () {
    throw new Error("not implemented");
  });
  r = n() ? t : e;
  return yn = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ue() {
  if (mn) {
    return gn;
  }
  mn = 1;
  var r = function () {
    if (bn) {
      return hn;
    }
    bn = 1;
    var r = qt();
    var n = typeof Uint16Array == "function";
    return hn = function (t) {
      return n && t instanceof Uint16Array || r(t) === "[object Uint16Array]";
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return gn = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ie() {
  if (kn) {
    return On;
  }
  kn = 1;
  var r = ue();
  var n = wn ? _n : (wn = 1, _n = 65535);
  var t = function () {
    if (jn) {
      return An;
    }
    jn = 1;
    var r = typeof Uint16Array == "function" ? Uint16Array : null;
    return An = r;
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  return On = function () {
    var e;
    var u;
    if (typeof t != "function") {
      return false;
    }
    try {
      u = new t(u = [1, 3.14, -3.14, n + 1, n + 2]);
      e = r(u) && u[0] === 1 && u[1] === 3 && u[2] === n - 2 && u[3] === 0 && u[4] === 1;
    } catch (i) {
      e = false;
    }
    return e;
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function oe() {
  if (Fn) {
    return Mn;
  }
  Fn = 1;
  var r;
  var n = function () {
    if (Nn) {
      return Sn;
    }
    Nn = 1;
    var r = ie();
    return Sn = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  t = function () {
    if (Un) {
      return En;
    }
    Un = 1;
    var r = typeof Uint16Array == "function" ? Uint16Array : undefined;
    return En = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = Pn ? In : (Pn = 1, In = function () {
    throw new Error("not implemented");
  });
  r = n() ? t : e;
  return Mn = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function fe() {
  if (Hn) {
    return Cn;
  }
  Hn = 1;
  var r;
  var n;
  var t = function () {
    if (xn) {
      return Tn;
    }
    xn = 1;
    var r = ee();
    var n = oe();
    return Tn = {
      uint16: n,
      uint8: r
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  (n = new t.uint16(1))[0] = 4660;
  r = new t.uint8(n.buffer)[0] === 52;
  return Cn = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ae() {
  if (Gn) {
    return Jn;
  }
  Gn = 1;
  var r = fe();
  return Jn = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ce() {
  if (Vn) {
    return Rn;
  }
  Vn = 1;
  var r = Xt();
  var n = re();
  var t = function () {
    if (Dn) {
      return Ln;
    } else {
      Dn = 1;
      if (ae() === true) {
        r = 1;
        n = 0;
      } else {
        r = 0;
        n = 1;
      }
      return Ln = {
        HIGH: r,
        LOW: n
      };
    }
    var r;
    var n;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = new n(1);
  var u = new r(e.buffer);
  var i = t.HIGH;
  var o = t.LOW;
  return Rn = function (r, n, t, f) {
    e[0] = r;
    n[f] = u[i];
    n[f + t] = u[o];
    return n;
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function le() {
  if (Yn) {
    return Qn;
  }
  Yn = 1;
  var r = Rt();
  var n = function () {
    if (Bn) {
      return Wn;
    }
    Bn = 1;
    var r = ce();
    return Wn = function (n) {
      return r(n, [0, 0], 1, 0);
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  r(n, "assign", ce());
  return Qn = n;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function se() {
  if (Xn) {
    return Kn;
  }
  Xn = 1;
  var r = Xt();
  var n = re();
  var t = function () {
    if (zn) {
      return qn;
    }
    zn = 1;
    var r = ae();
    return qn = r === true ? 1 : 0;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = new n(1);
  var u = new r(e.buffer);
  return Kn = function (r) {
    e[0] = r;
    return u[t];
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ve() {
  if ($n) {
    return Zn;
  }
  $n = 1;
  var r = se();
  return Zn = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function pe() {
  if (et) {
    return tt;
  }
  et = 1;
  var r = Xt();
  var n = re();
  var t = function () {
    if (nt) {
      return rt;
    } else {
      nt = 1;
      if (ae() === true) {
        r = 1;
        n = 0;
      } else {
        r = 0;
        n = 1;
      }
      return rt = {
        HIGH: r,
        LOW: n
      };
    }
    var r;
    var n;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  e = new n(1);
  var u = new r(e.buffer);
  var i = t.HIGH;
  var o = t.LOW;
  return tt = function (r, n) {
    u[i] = r;
    u[o] = n;
    return e[0];
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ye() {
  if (it) {
    return ut;
  }
  it = 1;
  var r = pe();
  return ut = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function de() {
  if (ft) {
    return ot;
  }
  ft = 1;
  var r = M ? P : (M = 1, P = 2147483648);
  var n = T ? F : (T = 1, F = 2147483647);
  var t = le();
  var e = ve();
  var u = ye();
  var i = [0, 0];
  return ot = function (o, f) {
    var a;
    var c;
    t.assign(o, i, 1, 0);
    a = i[0];
    a &= n;
    c = e(f);
    return u(a |= c &= r, i[1]);
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function he() {
  if (dt) {
    return yt;
  }
  dt = 1;
  var r = pt ? vt : (pt = 1, vt = function (r) {
    return Math.abs(r);
  });
  return yt = r;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function be() {
  if (bt) {
    return ht;
  }
  bt = 1;
  var r = st ? lt : (st = 1, lt = 2.2250738585072014e-308);
  var n = Gt();
  var t = Jt();
  var e = he();
  return ht = function (u, i, o, f) {
    if (t(u) || n(u)) {
      i[f] = u;
      i[f + o] = 0;
      return i;
    } else if (u !== 0 && e(u) < r) {
      i[f] = u * 4503599627370496;
      i[f + o] = -52;
      return i;
    } else {
      i[f] = u;
      i[f + o] = 0;
      return i;
    }
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ge() {
  if (wt) {
    return _t;
  }
  wt = 1;
  var r = Rt();
  var n = function () {
    if (mt) {
      return gt;
    }
    mt = 1;
    var r = be();
    return gt = function (n) {
      return r(n, [0, 0], 1, 0);
    };
  }();
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  r(n, "assign", be());
  return _t = n;
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function me() {
  if (kt) {
    return Ot;
  }
  kt = 1;
  var r = ve();
  var n = jt ? At : (jt = 1, At = 2146435072);
  var t = Ht();
  return Ot = function (e) {
    var u = r(e);
    return (u = (u & n) >>> 20) - t | 0;
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _e() {
  if (Ut) {
    return Et;
  }
  Ut = 1;
  var r = Tt();
  var n = Ct();
  var t = Ht();
  var e = g ? b : (g = 1, b = 1023);
  var u = _ ? m : (_ = 1, m = -1023);
  var i = A ? w : (A = 1, w = -1074);
  var o = Jt();
  var f = Gt();
  var a = function () {
    if (ct) {
      return at;
    }
    ct = 1;
    var r = de();
    return at = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  c = ge();
  var l = function () {
    if (Nt) {
      return St;
    }
    Nt = 1;
    var r = me();
    return St = r;
  }();
  var
  /**
   * @license Apache-2.0
   *
   * Copyright (c) 2018 The Stdlib Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  s = le();
  var v = ye();
  var p = [0, 0];
  var y = [0, 0];
  return Et = function (d, h) {
    var b;
    var g;
    if (d === 0 || o(d) || f(d)) {
      return d;
    } else {
      c(p, d);
      h += p[1];
      if ((h += l(d = p[0])) < i) {
        return a(0, d);
      } else if (h > e) {
        if (d < 0) {
          return n;
        } else {
          return r;
        }
      } else {
        if (h <= u) {
          h += 52;
          g = 2.220446049250313e-16;
        } else {
          g = 1;
        }
        s(y, d);
        b = y[0];
        b &= 2148532223;
        return g * v(b |= h + t << 20, y[1]);
      }
    }
  };
}
/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var we;
var Ae = {};
var je;
var Oe;
var ke = {};
function Se() {
  if (Oe) {
    return t;
  }
  Oe = 1;
  var r = t && t.__importDefault || function (r) {
    if (r && r.__esModule) {
      return r;
    } else {
      return {
        default: r
      };
    }
  };
  Object.defineProperty(t, "__esModule", {
    value: true
  });
  var n = r(i);
  var e = r(Ft());
  var u = r(function () {
    if (Pt) {
      return It;
    }
    Pt = 1;
    var r = _e();
    return It = r;
  }());
  if (!we) {
    we = 1;
    Ae.dset = function (r, n, t) {
      if (n.split) {
        n = n.split(".");
      }
      var e;
      for (var u, i = 0, o = n.length, f = r; i < o && (u = "" + n[i++]) != "__proto__" && u !== "constructor" && u !== "prototype";) {
        f = f[u] = i === o ? t : typeof (e = f[u]) == typeof n ? e : n[i] * 0 != 0 || ~("" + n[i]).indexOf(".") ? {} : [];
      }
    };
  }
  var o = Ae;
  var f = function () {
    if (je) {
      return ke;
    }
    je = 1;
    var r = ke && ke.__importDefault || function (r) {
      if (r && r.__esModule) {
        return r;
      } else {
        return {
          default: r
        };
      }
    };
    Object.defineProperty(ke, "__esModule", {
      value: true
    });
    ke.unset = undefined;
    var n = r(Ft());
    ke.unset = function (r, t) {
      if ((0, n.default)(r, t)) {
        for (var e = t.split("."), u = e.pop(); e.length && e[e.length - 1].slice(-1) === "\\";) {
          u = e.pop().slice(0, -1) + "." + u;
        }
        while (e.length) {
          r = r[t = e.shift()];
        }
        return delete r[u];
      }
      return true;
    };
    return ke;
  }();
  function a(r, n) {
    l(r, n.drop, function (r, n) {
      n.forEach(function (n) {
        return delete r[n];
      });
    });
  }
  function c(r, n) {
    l(r, n.allow, function (r, n) {
      Object.keys(r).forEach(function (t) {
        if (!n.includes(t)) {
          delete r[t];
        }
      });
    });
  }
  function l(r, n, t) {
    Object.entries(n).forEach(function (n) {
      var u = n[0];
      var i = n[1];
      function o(r) {
        if (typeof r == "object" && r !== null) {
          t(r, i);
        }
      }
      var f = u === "" ? r : (0, e.default)(r, u);
      if (Array.isArray(f)) {
        f.forEach(o);
      } else {
        o(f);
      }
    });
  }
  function s(r, n) {
    var t = JSON.parse(JSON.stringify(r));
    for (var u in n.map) {
      if (n.map.hasOwnProperty(u)) {
        var i = n.map[u];
        var a = u.split(".");
        var c = undefined;
        if (a.length > 1) {
          a.pop();
          c = (0, e.default)(t, a.join("."));
        } else {
          c = r;
        }
        if (typeof c == "object") {
          if (i.copy) {
            var l = (0, e.default)(t, i.copy);
            if (l !== undefined) {
              (0, o.dset)(r, u, l);
            }
          } else if (i.move) {
            var s = (0, e.default)(t, i.move);
            if (s !== undefined) {
              (0, o.dset)(r, u, s);
            }
            (0, f.unset)(r, i.move);
          } else if (i.hasOwnProperty("set")) {
            (0, o.dset)(r, u, i.set);
          }
          if (i.to_string) {
            var v = (0, e.default)(r, u);
            if (typeof v == "string" || typeof v == "object" && v !== null) {
              continue;
            }
            if (v !== undefined) {
              (0, o.dset)(r, u, JSON.stringify(v));
            } else {
              (0, o.dset)(r, u, "undefined");
            }
          }
        }
      }
    }
  }
  function v(r, t) {
    return !(t.sample.percent <= 0) && (t.sample.percent >= 1 || (t.sample.path ? function (r, t) {
      var i = (0, e.default)(r, t.sample.path);
      var o = (0, n.default)(JSON.stringify(i));
      var f = -64;
      var a = [];
      p(o.slice(0, 8), a);
      var c = 0;
      for (var l = 0; l < 64 && a[l] !== 1; l++) {
        c++;
      }
      if (c !== 0) {
        var s = [];
        p(o.slice(9, 16), s);
        f -= c;
        a.splice(0, c);
        s.splice(64 - c);
        a = a.concat(s);
      }
      a[63] = a[63] === 0 ? 1 : 0;
      return (0, u.default)(parseInt(a.join(""), 2), f) < t.sample.percent;
    }(r, t) : (i = t.sample.percent, Math.random() <= i)));
    var i;
  }
  function p(r, n) {
    for (var t = 0; t < 8; t++) {
      var e = r[t];
      for (var u = 128; u >= 1; u /= 2) {
        if (e - u >= 0) {
          e -= u;
          n.push(1);
        } else {
          n.push(0);
        }
      }
    }
  }
  t.default = function (r, n) {
    var t = r;
    for (var e = 0, u = n; e < u.length; e++) {
      var i = u[e];
      switch (i.type) {
        case "drop":
          return null;
        case "drop_properties":
          a(t, i.config);
          break;
        case "allow_properties":
          c(t, i.config);
          break;
        case "sample_event":
          if (v(t, i.config)) {
            break;
          }
          return null;
        case "map_properties":
          s(t, i.config);
          break;
        case "hash_properties":
          break;
        default:
          throw new Error(`Transformer of type "${i.type}" is unsupported.`);
      }
    }
    return t;
  };
  return t;
}
var Ne;
var Ee = {};
function Ue() {
  if (Ne) {
    return Ee;
  }
  Ne = 1;
  var r = Ee && Ee.__importDefault || function (r) {
    if (r && r.__esModule) {
      return r;
    } else {
      return {
        default: r
      };
    }
  };
  Object.defineProperty(Ee, "__esModule", {
    value: true
  });
  var n = r(Ft());
  function t(r, n) {
    if (!Array.isArray(r)) {
      return e(r, n) === true;
    }
    var f = r[0];
    switch (f) {
      case "!":
        return !t(r[1], n);
      case "or":
        for (var a = 1; a < r.length; a++) {
          if (t(r[a], n)) {
            return true;
          }
        }
        return false;
      case "and":
        for (a = 1; a < r.length; a++) {
          if (!t(r[a], n)) {
            return false;
          }
        }
        return true;
      case "=":
      case "!=":
        return function (r, n, e, i) {
          if (u(r)) {
            r = t(r, i);
          }
          if (u(n)) {
            n = t(n, i);
          }
          if (typeof r == "object" && typeof n == "object") {
            r = JSON.stringify(r);
            n = JSON.stringify(n);
          }
          switch (e) {
            case "=":
              return r === n;
            case "!=":
              return r !== n;
            default:
              throw new Error(`Invalid operator in compareItems: ${e}`);
          }
        }(e(r[1], n), e(r[2], n), f, n);
      case "<=":
      case "<":
      case ">":
      case ">=":
        return function (r, n, e, i) {
          if (u(r)) {
            r = t(r, i);
          }
          if (u(n)) {
            n = t(n, i);
          }
          if (typeof r != "number" || typeof n != "number") {
            return false;
          }
          switch (e) {
            case "<=":
              return r <= n;
            case ">=":
              return r >= n;
            case "<":
              return r < n;
            case ">":
              return r > n;
            default:
              throw new Error(`Invalid operator in compareNumbers: ${e}`);
          }
        }(e(r[1], n), e(r[2], n), f, n);
      case "in":
        return function (r, n, t) {
          return n.find(function (n) {
            return e(n, t) === r;
          }) !== undefined;
        }(e(r[1], n), e(r[2], n), n);
      case "contains":
        return function (r, n) {
          if (typeof r != "string" || typeof n != "string") {
            return false;
          }
          return r.indexOf(n) !== -1;
        }(e(r[1], n), e(r[2], n));
      case "match":
        return function (r, n) {
          if (typeof r != "string" || typeof n != "string") {
            return false;
          }
          return function (r, n) {
            var t;
            var e;
            r: while (r.length > 0) {
              var u = undefined;
              var f = undefined;
              u = (t = i(r)).star;
              f = t.chunk;
              r = t.pattern;
              if (u && f === "") {
                return true;
              }
              var a = o(f, n);
              var c = a.t;
              var l = a.ok;
              var s = a.err;
              if (s) {
                return false;
              }
              if (!l || c.length !== 0 && !(r.length > 0)) {
                if (u) {
                  for (var v = 0; v < n.length; v++) {
                    c = (e = o(f, n.slice(v + 1))).t;
                    l = e.ok;
                    s = e.err;
                    if (l) {
                      if (r.length === 0 && c.length > 0) {
                        continue;
                      }
                      n = c;
                      continue r;
                    }
                    if (s) {
                      return false;
                    }
                  }
                }
                return false;
              }
              n = c;
            }
            return n.length === 0;
          }(n, r);
        }(e(r[1], n), e(r[2], n));
      case "lowercase":
        var c = e(r[1], n);
        if (typeof c != "string") {
          return null;
        } else {
          return c.toLowerCase();
        }
      case "typeof":
        return typeof e(r[1], n);
      case "length":
        return function (r) {
          if (r === null) {
            return 0;
          }
          if (!Array.isArray(r) && typeof r != "string") {
            return NaN;
          }
          return r.length;
        }(e(r[1], n));
      default:
        throw new Error(`FQL IR could not evaluate for token: ${f}`);
    }
  }
  function e(r, t) {
    if (Array.isArray(r)) {
      return r;
    } else if (typeof r == "object") {
      return r.value;
    } else {
      return (0, n.default)(t, r);
    }
  }
  function u(r) {
    return !!Array.isArray(r) && ((r[0] === "lowercase" || r[0] === "length" || r[0] === "typeof") && r.length === 2 || (r[0] === "contains" || r[0] === "match") && r.length === 3);
  }
  function i(r) {
    var n = {
      star: false,
      chunk: "",
      pattern: ""
    };
    for (; r.length > 0 && r[0] === "*";) {
      r = r.slice(1);
      n.star = true;
    }
    var t;
    var e = false;
    r: for (t = 0; t < r.length; t++) {
      switch (r[t]) {
        case "\\":
          if (t + 1 < r.length) {
            t++;
          }
          break;
        case "[":
          e = true;
          break;
        case "]":
          e = false;
          break;
        case "*":
          if (!e) {
            break r;
          }
      }
    }
    n.chunk = r.slice(0, t);
    n.pattern = r.slice(t);
    return n;
  }
  function o(r, n) {
    var t;
    var e;
    var u = {
      t: "",
      ok: false,
      err: false
    };
    for (; r.length > 0;) {
      if (n.length === 0) {
        return u;
      }
      switch (r[0]) {
        case "[":
          var i = n[0];
          n = n.slice(1);
          var o = true;
          if ((r = r.slice(1)).length > 0 && r[0] === "^") {
            o = false;
            r = r.slice(1);
          }
          var a = false;
          var c = 0;
          while (true) {
            if (r.length > 0 && r[0] === "]" && c > 0) {
              r = r.slice(1);
              break;
            }
            var l;
            var s = "";
            l = (t = f(r)).char;
            r = t.newChunk;
            if (t.err) {
              return u;
            }
            s = l;
            if (r[0] === "-" && (s = (e = f(r.slice(1))).char, r = e.newChunk, e.err)) {
              return u;
            }
            if (l <= i && i <= s) {
              a = true;
            }
            c++;
          }
          if (a !== o) {
            return u;
          }
          break;
        case "?":
          n = n.slice(1);
          r = r.slice(1);
          break;
        case "\\":
          if ((r = r.slice(1)).length === 0) {
            u.err = true;
            return u;
          }
        default:
          if (r[0] !== n[0]) {
            return u;
          }
          n = n.slice(1);
          r = r.slice(1);
      }
    }
    u.t = n;
    u.ok = true;
    u.err = false;
    return u;
  }
  function f(r) {
    var n = {
      char: "",
      newChunk: "",
      err: false
    };
    if (r.length === 0 || r[0] === "-" || r[0] === "]" || r[0] === "\\" && (r = r.slice(1)).length === 0) {
      n.err = true;
      return n;
    } else {
      n.char = r[0];
      n.newChunk = r.slice(1);
      if (n.newChunk.length === 0) {
        n.err = true;
      }
      return n;
    }
  }
  Ee.default = function (r, n) {
    if (!n) {
      throw new Error("No matcher supplied!");
    }
    switch (n.type) {
      case "all":
        return true;
      case "fql":
        return function (r, n) {
          if (!r) {
            return false;
          }
          try {
            r = JSON.parse(r);
          } catch (u) {
            throw new Error(`Failed to JSON.parse FQL intermediate representation "${r}": ${u}`);
          }
          var e = t(r, n);
          if (typeof e != "boolean") {
            return false;
          }
          return e;
        }(n.ir, r);
      default:
        throw new Error(`Matcher of type ${n.type} unsupported.`);
    }
  };
  return Ee;
}
var Ie;
var Pe;
var Me = {};
if (!Pe) {
  Pe = 1;
  (function (r) {
    var t = n && n.__importDefault || function (r) {
      if (r && r.__esModule) {
        return r;
      } else {
        return {
          default: r
        };
      }
    };
    Object.defineProperty(r, "__esModule", {
      value: true
    });
    r.Store = r.matches = r.transform = undefined;
    var e = Se();
    Object.defineProperty(r, "transform", {
      enumerable: true,
      get: function () {
        return t(e).default;
      }
    });
    var u = Ue();
    Object.defineProperty(r, "matches", {
      enumerable: true,
      get: function () {
        return t(u).default;
      }
    });
    var i = function () {
      if (Ie) {
        return Me;
      }
      Ie = 1;
      Object.defineProperty(Me, "__esModule", {
        value: true
      });
      var r = function () {
        function r(r) {
          this.rules = [];
          this.rules = r || [];
        }
        r.prototype.getRulesByDestinationName = function (r) {
          var n = [];
          for (var t = 0, e = this.rules; t < e.length; t++) {
            var u = e[t];
            if (u.destinationName === r || u.destinationName === undefined) {
              n.push(u);
            }
          }
          return n;
        };
        return r;
      }();
      Me.default = r;
      return Me;
    }();
    Object.defineProperty(r, "Store", {
      enumerable: true,
      get: function () {
        return t(i).default;
      }
    });
  })(n);
}
var Fe = n;
function Te(r) {
  return function (n) {
    var t = n.payload;
    var e = n.integration;
    var u = n.next;
    new Fe.Store(r).getRulesByDestinationName(e).forEach(function (r) {
      for (var n = r.matchers, e = r.transformers, i = 0; i < n.length; i++) {
        if (Fe.matches(t.obj, n[i]) && (t.obj = Fe.transform(t.obj, e[i]), t.obj === null)) {
          return u(null);
        }
      }
    });
    u(t);
  };
}
export { Te as tsubMiddleware };