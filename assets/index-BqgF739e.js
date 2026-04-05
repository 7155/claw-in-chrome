import { ar as e, as as t, aD as r, au as a, at as n } from "./useStorageState-hbwNMVUA.js";
import "./index-BVS4T5_D.js";
import "./index-5uYI7rOK.js";
import "./PermissionManager-9s959502.js";
function i(i, s, o) {
  return e(this, undefined, undefined, function () {
    var u;
    var l;
    var d;
    var m;
    var f = this;
    return t(this, function (p) {
      switch (p.label) {
        case 0:
          if (r()) {
            return [2, []];
          } else {
            u = a();
            l = s.enabledMiddleware ?? {};
            d = Object.entries(l).filter(function (e) {
              e[0];
              return e[1];
            }).map(function (e) {
              return e[0];
            });
            m = d.map(function (r) {
              return e(f, undefined, undefined, function () {
                var e;
                var a;
                var s;
                var c;
                return t(this, function (t) {
                  switch (t.label) {
                    case 0:
                      e = r.replace("@segment/", "");
                      a = e;
                      if (o) {
                        a = btoa(e).replace(/=/g, "");
                      }
                      s = `${u}/middleware/${a}/latest/${a}.js.gz`;
                      t.label = 1;
                    case 1:
                      t.trys.push([1, 3,, 4]);
                      return [4, n(s)];
                    case 2:
                      t.sent();
                      return [2, window[`${e}Middleware`]];
                    case 3:
                      c = t.sent();
                      i.log("error", c);
                      i.stats.increment("failed_remote_middleware");
                      return [3, 4];
                    case 4:
                      return [2];
                  }
                });
              });
            });
            return [4, Promise.all(m)];
          }
        case 1:
          return [2, p.sent().filter(Boolean)];
      }
    });
  });
}
export { i as remoteMiddlewares };