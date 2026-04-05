import { ar as t, as as n, at as i, au as e, av as r, aw as o, ax as s, ay as a, az as u, aA as c, aB as l, aC as d, aD as h, aE as v, aF as f, aG as p, aH as g, aI as m, aJ as y, aK as w, aL as b, aM as z } from "./useStorageState-hbwNMVUA.js";
import { i as S } from "./is-plan-event-enabled-CTGFxau4.js";
import "./index-BVS4T5_D.js";
import "./index-5uYI7rOK.js";
import "./PermissionManager-9s959502.js";
function _(t) {
  return t.toLowerCase().replace(".", "").replace(/\s+/g, "-");
}
function P(t, n = false) {
  if (n) {
    return btoa(t).replace(/=/g, "");
  } else {
    return undefined;
  }
}
function I(r, s, a, u) {
  return t(this, undefined, undefined, function () {
    var t;
    var c;
    var l;
    var d;
    var h;
    var v;
    return n(this, function (n) {
      switch (n.label) {
        case 0:
          t = _(s);
          c = P(t, u);
          l = e();
          d = `${l}/integrations/${c ?? t}/${a}/${c ?? t}.dynamic.js.gz`;
          n.label = 1;
        case 1:
          n.trys.push([1, 3,, 4]);
          return [4, i(d)];
        case 2:
          n.sent();
          (function (t, n, i) {
            var e;
            try {
              var s = (((e = window?.performance) === null || e === undefined ? undefined : e.getEntriesByName(t, "resource")) ?? [])[0];
              if (s) {
                n.stats.gauge("legacy_destination_time", Math.round(s.duration), o([i], s.duration < 100 ? ["cached"] : [], true));
              }
            } catch (a) {}
          })(d, r, s);
          return [3, 4];
        case 3:
          h = n.sent();
          r.stats.gauge("legacy_destination_time", -1, [`plugin:${s}`, "failed"]);
          throw h;
        case 4:
          v = window[`${t}Deps`];
          return [4, Promise.all(v.map(function (t) {
            return i(l + t + ".gz");
          }))];
        case 5:
          n.sent();
          window[`${t}Loader`]();
          return [2, window[`${t}Integration`]];
      }
    });
  });
}
function k(i, e) {
  return t(this, undefined, undefined, function () {
    var r;
    var o = this;
    return n(this, function (s) {
      switch (s.label) {
        case 0:
          r = [];
          if (a()) {
            return [2, e];
          } else {
            return [4, y(function () {
              return e.length > 0 && z();
            }, function () {
              return t(o, undefined, undefined, function () {
                var t;
                var o;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      if (t = e.pop()) {
                        return [4, w(t, i)];
                      } else {
                        return [2];
                      }
                    case 1:
                      o = n.sent();
                      if (!(o instanceof b)) {
                        r.push(t);
                      }
                      return [2];
                  }
                });
              });
            })];
          }
        case 1:
          s.sent();
          r.map(function (t) {
            return e.pushWithBackoff(t);
          });
          return [2, e];
      }
    });
  });
}
var N = function () {
  function i(t, n, i, e = {}, r, o) {
    var s = this;
    this.options = {};
    this.type = "destination";
    this.middleware = [];
    this.initializePromise = p();
    this.flushing = false;
    this.name = t;
    this.version = n;
    this.settings = u({}, e);
    this.disableAutoISOConversion = r.disableAutoISOConversion || false;
    this.integrationSource = o;
    if (this.settings.type && this.settings.type === "browser") {
      delete this.settings.type;
    }
    this.initializePromise.promise.then(function (t) {
      return s._initialized = t;
    }, function () {});
    this.options = r;
    this.buffer = r.disableClientPersistence ? new g(4, []) : new m(4, `${i}:dest-${t}`);
    this.scheduleFlush();
  }
  i.prototype.isLoaded = function () {
    return !!this._ready;
  };
  i.prototype.ready = function () {
    var t = this;
    return this.initializePromise.promise.then(function () {
      return t.onReady ?? Promise.resolve();
    });
  };
  i.prototype.load = function (i, e) {
    var r;
    return t(this, undefined, undefined, function () {
      var t;
      var o;
      var a = this;
      return n(this, function (n) {
        switch (n.label) {
          case 0:
            if (this._ready || this.onReady !== undefined) {
              return [2];
            } else if ((r = this.integrationSource) === null || r === undefined) {
              return [3, 1];
            } else {
              o = r;
              return [3, 3];
            }
          case 1:
            return [4, I(i, this.name, this.version, this.options.obfuscate)];
          case 2:
            o = n.sent();
            n.label = 3;
          case 3:
            t = o;
            this.integration = function (t, n, i) {
              var e;
              if ("Integration" in t) {
                t({
                  user: function () {
                    return i.user();
                  },
                  addIntegration: function () {}
                });
                e = t.Integration;
              } else {
                e = t;
              }
              var r = new e(n);
              r.analytics = i;
              return r;
            }(t, this.settings, e);
            this.onReady = new Promise(function (t) {
              a.integration.once("ready", function () {
                a._ready = true;
                t(true);
              });
            });
            this.integration.on("initialize", function () {
              a.initializePromise.resolve(true);
            });
            try {
              s(i, {
                integrationName: this.name,
                methodName: "initialize",
                type: "classic"
              });
              this.integration.initialize();
            } catch (u) {
              s(i, {
                integrationName: this.name,
                methodName: "initialize",
                type: "classic",
                didError: true
              });
              this.initializePromise.resolve(false);
              throw u;
            }
            return [2];
        }
      });
    });
  };
  i.prototype.unload = function (i, o) {
    return function (i, o, s) {
      return t(this, undefined, undefined, function () {
        var t;
        var a;
        var u;
        var c;
        return n(this, function (n) {
          t = e();
          a = _(i);
          u = P(i, s);
          c = `${t}/integrations/${u ?? a}/${o}/${u ?? a}.dynamic.js.gz`;
          return [2, r(c)];
        });
      });
    }(this.name, this.version, this.options.obfuscate);
  };
  i.prototype.addMiddleware = function () {
    var t;
    var n = [];
    for (var i = 0; i < arguments.length; i++) {
      n[i] = arguments[i];
    }
    this.middleware = (t = this.middleware).concat.apply(t, n);
  };
  i.prototype.shouldBuffer = function (t) {
    return t.event.type !== "page" && (a() || this._ready !== true || this._initialized !== true);
  };
  i.prototype.send = function (i, e, r) {
    return t(this, undefined, undefined, function () {
      var t;
      var d;
      var h;
      var v;
      var f;
      var p;
      return n(this, function (n) {
        switch (n.label) {
          case 0:
            if (this.shouldBuffer(i)) {
              this.buffer.push(i);
              this.scheduleFlush();
              return [2, i];
            } else {
              t = this.options?.plan?.track;
              d = i.event.event;
              if (t && d && this.name !== "Segment.io") {
                h = t[d];
                if (S(t, h)) {
                  i.updateEvent("integrations", u(u({}, i.event.integrations), h == null ? undefined : h.integrations));
                } else {
                  i.updateEvent("integrations", u(u({}, i.event.integrations), {
                    All: false,
                    "Segment.io": true
                  }));
                  i.cancel(new c({
                    retry: false,
                    reason: `Event ${d} disabled for integration ${this.name} in tracking plan`,
                    type: "Dropped by plan"
                  }));
                }
                if ((h == null ? undefined : h.enabled) && (h == null ? undefined : h.integrations[this.name]) === false) {
                  i.cancel(new c({
                    retry: false,
                    reason: `Event ${d} disabled for integration ${this.name} in tracking plan`,
                    type: "Dropped by plan"
                  }));
                }
              }
              return [4, l(this.name, i.event, this.middleware)];
            }
          case 1:
            if ((v = n.sent()) === null) {
              return [2, i];
            }
            f = new e(v, {
              traverse: !this.disableAutoISOConversion
            });
            s(i, {
              integrationName: this.name,
              methodName: r,
              type: "classic"
            });
            n.label = 2;
          case 2:
            n.trys.push([2, 5,, 6]);
            if (this.integration) {
              return [4, this.integration.invoke.call(this.integration, r, f)];
            } else {
              return [3, 4];
            }
          case 3:
            n.sent();
            n.label = 4;
          case 4:
            return [3, 6];
          case 5:
            p = n.sent();
            s(i, {
              integrationName: this.name,
              methodName: r,
              type: "classic",
              didError: true
            });
            throw p;
          case 6:
            return [2, i];
        }
      });
    });
  };
  i.prototype.track = function (i) {
    return t(this, undefined, undefined, function () {
      return n(this, function (t) {
        return [2, this.send(i, d.Track, "track")];
      });
    });
  };
  i.prototype.page = function (i) {
    return t(this, undefined, undefined, function () {
      return n(this, function (t) {
        switch (t.label) {
          case 0:
            if (this.integration?._assumesPageview && !this._initialized) {
              this.integration.initialize();
            }
            return [4, this.initializePromise.promise];
          case 1:
            t.sent();
            return [2, this.send(i, d.Page, "page")];
        }
      });
    });
  };
  i.prototype.identify = function (i) {
    return t(this, undefined, undefined, function () {
      return n(this, function (t) {
        return [2, this.send(i, d.Identify, "identify")];
      });
    });
  };
  i.prototype.alias = function (i) {
    return t(this, undefined, undefined, function () {
      return n(this, function (t) {
        return [2, this.send(i, d.Alias, "alias")];
      });
    });
  };
  i.prototype.group = function (i) {
    return t(this, undefined, undefined, function () {
      return n(this, function (t) {
        return [2, this.send(i, d.Group, "group")];
      });
    });
  };
  i.prototype.scheduleFlush = function () {
    var i = this;
    if (!this.flushing) {
      setTimeout(function () {
        return t(i, undefined, undefined, function () {
          var t;
          return n(this, function (n) {
            switch (n.label) {
              case 0:
                if (a() || this._ready !== true || this._initialized !== true) {
                  this.scheduleFlush();
                  return [2];
                } else {
                  this.flushing = true;
                  t = this;
                  return [4, k(this, this.buffer)];
                }
              case 1:
                t.buffer = n.sent();
                this.flushing = false;
                if (this.buffer.todo > 0) {
                  this.scheduleFlush();
                }
                return [2];
            }
          });
        });
      }, Math.random() * 5000);
    }
  };
  return i;
}();
function j(t, n, i, e, r, s) {
  if (i === undefined) {
    i = {};
  }
  if (e === undefined) {
    e = {};
  }
  if (h()) {
    return [];
  }
  if (n.plan) {
    (e = e ?? {}).plan = n.plan;
  }
  var l = n.middlewareSettings?.routingRules ?? [];
  var d = n.integrations;
  var p = e.integrations;
  var g = v(n, e ?? {});
  var m = s == null ? undefined : s.reduce(function (t, n) {
    var i;
    return u(u({}, t), ((i = {})[function (t) {
      return ("Integration" in t ? t.Integration : t).prototype.name;
    }(n)] = n, i));
  }, {});
  var y = new Set(o(o([], Object.keys(d).filter(function (t) {
    return function (t, n) {
      var i;
      var e = n.type;
      var r = n.bundlingStatus;
      var o = n.versionSettings;
      var s = r !== "unbundled" && (e === "browser" || ((i = o == null ? undefined : o.componentTypes) === null || i === undefined ? undefined : i.includes("browser")));
      return !t.startsWith("Segment") && t !== "Iterable" && s;
    }(t, d[t]);
  }), true), Object.keys(m || {}).filter(function (t) {
    return f(d[t]) || f(p == null ? undefined : p[t]);
  }), true));
  return Array.from(y).filter(function (t) {
    return !function (t, n) {
      var i = n.All === false && n[t] === undefined;
      return n[t] === false || i;
    }(t, i);
  }).map(function (n) {
    var i = function (t) {
      return (t == null ? undefined : t.versionSettings)?.override ?? (t == null ? undefined : t.versionSettings)?.version ?? "latest";
    }(d[n]);
    var o = new N(n, i, t, g[n], e, m == null ? undefined : m[n]);
    if (l.filter(function (t) {
      return t.destinationName === n;
    }).length > 0 && r) {
      o.addMiddleware(r);
    }
    return o;
  });
}
export { N as LegacyDestination, j as ajsDestinations };