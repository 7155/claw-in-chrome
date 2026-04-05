import { bz as t } from "./useStorageState-hbwNMVUA.js";
import "./index-BVS4T5_D.js";
import "./index-5uYI7rOK.js";
import "./PermissionManager-9s959502.js";
function e(e, n, r, o) {
  var i = this;
  if (e) {
    (e instanceof Element ? [e] : "toArray" in e ? e.toArray() : e).forEach(function (e) {
      e.addEventListener("click", function (a) {
        var u;
        var s = n instanceof Function ? n(e) : n;
        var f = r instanceof Function ? r(e) : r;
        var l = e.getAttribute("href") || e.getAttributeNS("http://www.w3.org/1999/xlink", "href") || e.getAttribute("xlink:href") || ((u = e.getElementsByTagName("a")[0]) === null || u === undefined ? undefined : u.getAttribute("href"));
        var h = t(i.track(s, f, o ?? {}), i.settings.timeout ?? 500);
        if (!function (t, e) {
          return t.target === "_blank" && !!e;
        }(e, l) && !function (t) {
          var e = t;
          return !!e.ctrlKey || !!e.shiftKey || !!e.metaKey || !!e.button && e.button == 1;
        }(a)) {
          if (l) {
            if (a.preventDefault) {
              a.preventDefault();
            } else {
              a.returnValue = false;
            }
            h.catch(console.error).then(function () {
              window.location.href = l;
            }).catch(console.error);
          }
        }
      }, false);
    });
    return this;
  } else {
    return this;
  }
}
function n(e, n, r, o) {
  var i = this;
  if (e) {
    if (e instanceof HTMLFormElement) {
      e = [e];
    }
    e.forEach(function (e) {
      if (!(e instanceof Element)) {
        throw new TypeError("Must pass HTMLElement to trackForm/trackSubmit.");
      }
      function a(a) {
        if (a.preventDefault) {
          a.preventDefault();
        } else {
          a.returnValue = false;
        }
        var c = n instanceof Function ? n(e) : n;
        var s = r instanceof Function ? r(e) : r;
        t(i.track(c, s, o ?? {}), i.settings.timeout ?? 500).catch(console.error).then(function () {
          e.submit();
        }).catch(console.error);
      }
      var u = window.jQuery || window.Zepto;
      if (u) {
        u(e).submit(a);
      } else {
        e.addEventListener("submit", a, false);
      }
    });
    return this;
  } else {
    return this;
  }
}
export { n as form, e as link };