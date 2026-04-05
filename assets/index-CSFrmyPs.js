import { bA as r, aF as a } from "./useStorageState-hbwNMVUA.js";
import "./index-BVS4T5_D.js";
import "./index-5uYI7rOK.js";
import "./PermissionManager-9s959502.js";
function s(r, a) {
  return Object.keys(a).reduce(function (s, e) {
    if (e.startsWith(r)) {
      s[e.substr(r.length)] = a[e];
    }
    return s;
  }, {});
}
function e(e, t) {
  var i = document.createElement("a");
  i.href = t;
  var n = i.search.slice(1).split("&").reduce(function (a, s) {
    var e = s.split("=");
    var t = e[0];
    var i = e[1];
    a[t] = r(i);
    return a;
  }, {});
  var u = [];
  var o = n.ajs_uid;
  var d = n.ajs_event;
  var j = n.ajs_aid;
  var _ = a(e.options.useQueryString) ? e.options.useQueryString : {};
  var c = _.aid;
  var p = c === undefined ? /.+/ : c;
  var v = _.uid;
  var f = v === undefined ? /.+/ : v;
  if (j) {
    var y = Array.isArray(n.ajs_aid) ? n.ajs_aid[0] : n.ajs_aid;
    if (p.test(y)) {
      e.setAnonymousId(y);
    }
  }
  if (o) {
    var m = Array.isArray(n.ajs_uid) ? n.ajs_uid[0] : n.ajs_uid;
    if (f.test(m)) {
      var A = s("ajs_trait_", n);
      u.push(e.identify(m, A));
    }
  }
  if (d) {
    var l = Array.isArray(n.ajs_event) ? n.ajs_event[0] : n.ajs_event;
    var h = s("ajs_prop_", n);
    u.push(e.track(l, h));
  }
  return Promise.all(u);
}
export { e as queryString };