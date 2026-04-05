import { az as n } from "./useStorageState-hbwNMVUA.js";
import { i as e } from "./is-plan-event-enabled-CTGFxau4.js";
import "./index-BVS4T5_D.js";
import "./index-5uYI7rOK.js";
import "./PermissionManager-9s959502.js";
function t(t, i) {
  function r(r) {
    var o = t;
    var a = r.event.event;
    if (o && a) {
      var s = o[a];
      if (!e(o, s)) {
        r.updateEvent("integrations", n(n({}, r.event.integrations), {
          All: false,
          "Segment.io": true
        }));
        return r;
      }
      var u = function (n, e) {
        if (!n || !Object.keys(n)) {
          return {};
        }
        var r = n.integrations ? Object.keys(n.integrations).filter(function (e) {
          return n.integrations[e] === false;
        }) : [];
        var o = [];
        (e.remotePlugins ?? []).forEach(function (n) {
          r.forEach(function (e) {
            if (n.creationName == e) {
              o.push(n.name);
            }
          });
        });
        return (e.remotePlugins ?? []).reduce(function (n, e) {
          if (e.settings.subscriptions && o.includes(e.name)) {
            e.settings.subscriptions.forEach(function (t) {
              return n[`${e.name} ${t.partnerAction}`] = false;
            });
          }
          return n;
        }, {});
      }(s, i);
      r.updateEvent("integrations", n(n(n({}, r.event.integrations), s == null ? undefined : s.integrations), u));
    }
    return r;
  }
  return {
    name: "Schema Filter",
    version: "0.1.0",
    isLoaded: function () {
      return true;
    },
    load: function () {
      return Promise.resolve();
    },
    type: "before",
    page: r,
    alias: r,
    track: r,
    identify: r,
    group: r
  };
}
export { t as schemaFilter };