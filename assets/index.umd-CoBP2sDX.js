import { g as e } from "./index-BVS4T5_D.js";
function t(e, t) {
  for (var a = 0; a < t.length; a++) {
    const n = t[a];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const t in n) {
        if (t !== "default" && !(t in e)) {
          const a = Object.getOwnPropertyDescriptor(n, t);
          if (a) {
            Object.defineProperty(e, t, a.get ? a : {
              enumerable: true,
              get: () => n[t]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
    value: "Module"
  }));
}
var a;
var n = {
  exports: {}
};
var i = a ? n.exports : (a = 1, window, n.exports = function (e) {
  var t = {};
  function a(n) {
    if (t[n]) {
      return t[n].exports;
    }
    var i = t[n] = {
      i: n,
      l: false,
      exports: {}
    };
    e[n].call(i.exports, i, i.exports, a);
    i.l = true;
    return i.exports;
  }
  a.m = e;
  a.c = t;
  a.d = function (e, t, n) {
    if (!a.o(e, t)) {
      Object.defineProperty(e, t, {
        enumerable: true,
        get: n
      });
    }
  };
  a.r = function (e) {
    if (typeof Symbol != "undefined" && Symbol.toStringTag) {
      Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      });
    }
    Object.defineProperty(e, "__esModule", {
      value: true
    });
  };
  a.t = function (e, t) {
    if (t & 1) {
      e = a(e);
    }
    if (t & 8) {
      return e;
    }
    if (t & 4 && typeof e == "object" && e && e.__esModule) {
      return e;
    }
    var n = Object.create(null);
    a.r(n);
    Object.defineProperty(n, "default", {
      enumerable: true,
      value: e
    });
    if (t & 2 && typeof e != "string") {
      for (var i in e) {
        a.d(n, i, function (t) {
          return e[t];
        }.bind(null, i));
      }
    }
    return n;
  };
  a.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    a.d(t, "a", t);
    return t;
  };
  a.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  };
  a.p = "";
  return a(a.s = 2);
}([function (e, t, a) {
  a.r(t);
  var n = typeof fetch == "function" ? fetch.bind() : function (e, t) {
    t = t || {};
    return new Promise(function (a, n) {
      var i = new XMLHttpRequest();
      i.open(t.method || "get", e, true);
      for (var r in t.headers) {
        i.setRequestHeader(r, t.headers[r]);
      }
      function o() {
        var e;
        var t = [];
        var a = [];
        var n = {};
        i.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (i, r, o) {
          t.push(r = r.toLowerCase());
          a.push([r, o]);
          e = n[r];
          n[r] = e ? e + "," + o : o;
        });
        return {
          ok: (i.status / 100 | 0) == 2,
          status: i.status,
          statusText: i.statusText,
          url: i.responseURL,
          clone: o,
          text: function () {
            return Promise.resolve(i.responseText);
          },
          json: function () {
            return Promise.resolve(i.responseText).then(JSON.parse);
          },
          blob: function () {
            return Promise.resolve(new Blob([i.response]));
          },
          headers: {
            keys: function () {
              return t;
            },
            entries: function () {
              return a;
            },
            get: function (e) {
              return n[e.toLowerCase()];
            },
            has: function (e) {
              return e.toLowerCase() in n;
            }
          }
        };
      }
      i.withCredentials = t.credentials == "include";
      i.onload = function () {
        a(o());
      };
      i.onerror = n;
      i.send(t.body);
    });
  };
  t.default = n;
}, function (e, t, a) {
  Object.defineProperty(t, "__esModule", {
    value: true
  });
  var n = function () {
    function e(e, t) {
      for (var a = 0; a < t.length; a++) {
        var n = t[a];
        n.enumerable = n.enumerable || false;
        n.configurable = true;
        if ("value" in n) {
          n.writable = true;
        }
        Object.defineProperty(e, n.key, n);
      }
    }
    return function (t, a, n) {
      if (a) {
        e(t.prototype, a);
      }
      if (n) {
        e(t, n);
      }
      return t;
    };
  }();
  var i = function () {
    function e(t, a) {
      (function (e, t) {
        if (!(e instanceof t)) {
          throw new TypeError("Cannot call a class as a function");
        }
      })(this, e);
      this.pluginName = t;
    }
    n(e, [{
      key: "track",
      value: function (e, t) {
        window.analytics.track(e, t, {
          integration: {
            name: this.pluginName
          }
        });
      }
    }]);
    return e;
  }();
  t.default = i;
}, function (e, t, a) {
  Object.defineProperty(t, "__esModule", {
    value: true
  });
  t.YouTubeAnalytics = t.VimeoAnalytics = undefined;
  var n = r(a(3));
  var i = r(a(4));
  function r(e) {
    if (e && e.__esModule) {
      return e;
    } else {
      return {
        default: e
      };
    }
  }
  t.VimeoAnalytics = n.default;
  t.YouTubeAnalytics = i.default;
}, function (e, t, a) {
  Object.defineProperty(t, "__esModule", {
    value: true
  });
  var n = function () {
    function e(e, t) {
      for (var a = 0; a < t.length; a++) {
        var n = t[a];
        n.enumerable = n.enumerable || false;
        n.configurable = true;
        if ("value" in n) {
          n.writable = true;
        }
        Object.defineProperty(e, n.key, n);
      }
    }
    return function (t, a, n) {
      if (a) {
        e(t.prototype, a);
      }
      if (n) {
        e(t, n);
      }
      return t;
    };
  }();
  var i = r(a(0));
  function r(e) {
    if (e && e.__esModule) {
      return e;
    } else {
      return {
        default: e
      };
    }
  }
  var o = function (e) {
    function t(e, a) {
      (function (e, t) {
        if (!(e instanceof t)) {
          throw new TypeError("Cannot call a class as a function");
        }
      })(this, t);
      var n = function (e, t) {
        if (!e) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        if (!t || typeof t != "object" && typeof t != "function") {
          return e;
        } else {
          return t;
        }
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "VimeoAnalytics"));
      n.authToken = a;
      n.player = e;
      n.metadata = {
        content: {},
        playback: {
          videoPlayer: "Vimeo"
        }
      };
      n.mostRecentHeartbeat = 0;
      n.isPaused = false;
      return n;
    }
    (function (e, t) {
      if (typeof t != "function" && t !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      }
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (t) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(e, t);
        } else {
          e.__proto__ = t;
        }
      }
    })(t, e);
    n(t, [{
      key: "initialize",
      value: function () {
        var e = this;
        var t = {
          loaded: this.retrieveMetadata,
          play: this.trackPlay,
          pause: this.trackPause,
          ended: this.trackEnded,
          timeupdate: this.trackHeartbeat
        };
        for (var a in t) {
          this.registerHandler(a, t[a]);
        }
        this.player.getVideoId().then(function (t) {
          e.retrieveMetadata({
            id: t
          });
        }).catch(console.error);
      }
    }, {
      key: "registerHandler",
      value: function (e, t) {
        var a = this;
        this.player.on(e, function (e) {
          a.updateMetadata(e);
          t.call(a, e);
        });
      }
    }, {
      key: "trackPlay",
      value: function () {
        if (this.isPaused) {
          this.track("Video Playback Resumed", this.metadata.playback);
          this.isPaused = false;
        } else {
          this.track("Video Playback Started", this.metadata.playback);
          this.track("Video Content Started", this.metadata.content);
        }
      }
    }, {
      key: "trackEnded",
      value: function () {
        this.track("Video Playback Completed", this.metadata.playback);
        this.track("Video Content Completed", this.metadata.content);
      }
    }, {
      key: "trackHeartbeat",
      value: function () {
        var e = this.mostRecentHeartbeat;
        var t = this.metadata.playback.position;
        if (t !== e && t - e >= 10) {
          this.track("Video Content Playing", this.metadata.content);
          this.mostRecentHeartbeat = Math.floor(t);
        }
      }
    }, {
      key: "trackPause",
      value: function () {
        this.isPaused = true;
        this.track("Video Playback Paused", this.metadata.playback);
      }
    }, {
      key: "retrieveMetadata",
      value: function (e) {
        var t = this;
        return new Promise(function (a, n) {
          var r = e.id;
          (0, i.default)("https://api.vimeo.com/videos/" + r, {
            headers: {
              Authorization: "Bearer " + t.authToken
            }
          }).then(function (e) {
            if (e.ok) {
              return e.json();
            } else {
              return n(e);
            }
          }).then(function (e) {
            t.metadata.content.title = e.name;
            t.metadata.content.description = e.description;
            t.metadata.content.publisher = e.user.name;
            t.metadata.playback.position = 0;
            t.metadata.playback.totalLength = e.duration;
          }).catch(function (e) {
            return n(e);
          });
        });
      }
    }, {
      key: "updateMetadata",
      value: function (e) {
        var t = this;
        return new Promise(function (a, n) {
          t.player.getVolume().then(function (n) {
            if (n) {
              t.metadata.playback.sound = n * 100;
            }
            t.metadata.playback.position = e.seconds;
            a();
          }).catch(n);
        });
      }
    }]);
    return t;
  }(r(a(1)).default);
  t.default = o;
}, function (e, t, a) {
  Object.defineProperty(t, "__esModule", {
    value: true
  });
  var n = function () {
    function e(e, t) {
      for (var a = 0; a < t.length; a++) {
        var n = t[a];
        n.enumerable = n.enumerable || false;
        n.configurable = true;
        if ("value" in n) {
          n.writable = true;
        }
        Object.defineProperty(e, n.key, n);
      }
    }
    return function (t, a, n) {
      if (a) {
        e(t.prototype, a);
      }
      if (n) {
        e(t, n);
      }
      return t;
    };
  }();
  var i = r(a(0));
  function r(e) {
    if (e && e.__esModule) {
      return e;
    } else {
      return {
        default: e
      };
    }
  }
  var o = function (e) {
    function t(e, a) {
      (function (e, t) {
        if (!(e instanceof t)) {
          throw new TypeError("Cannot call a class as a function");
        }
      })(this, t);
      var n = function (e, t) {
        if (!e) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        if (!t || typeof t != "object" && typeof t != "function") {
          return e;
        } else {
          return t;
        }
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "YoutubeAnalytics"));
      n.player = e;
      n.apiKey = a;
      n.playerLoaded = false;
      n.playbackStarted = false;
      n.contentStarted = false;
      n.isPaused = false;
      n.isBuffering = false;
      n.isSeeking = false;
      n.lastRecordedTime = {
        timeReported: Date.now(),
        timeElapsed: 0
      };
      n.metadata = [{
        playback: {
          video_player: "youtube"
        },
        content: {}
      }];
      n.playlistIndex = 0;
      return n;
    }
    (function (e, t) {
      if (typeof t != "function" && t !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      }
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (t) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(e, t);
        } else {
          e.__proto__ = t;
        }
      }
    })(t, e);
    n(t, [{
      key: "initialize",
      value: function () {
        window.segmentYoutubeOnStateChange = this.onPlayerStateChange.bind(this);
        window.segmentYoutubeOnReady = this.onPlayerReady.bind(this);
        this.player.addEventListener("onReady", "segmentYoutubeOnReady");
        this.player.addEventListener("onStateChange", "segmentYoutubeOnStateChange");
      }
    }, {
      key: "onPlayerReady",
      value: function (e) {
        this.retrieveMetadata();
      }
    }, {
      key: "onPlayerStateChange",
      value: function (e) {
        var t = this.player.getCurrentTime();
        if (this.metadata[this.playlistIndex]) {
          this.metadata[this.playlistIndex].playback.position = this.metadata[this.playlistIndex].content.position = t;
          this.metadata[this.playlistIndex].playback.quality = this.player.getPlaybackQuality();
          this.metadata[this.playlistIndex].playback.sound = this.player.isMuted() ? 0 : this.player.getVolume();
        }
        switch (e.data) {
          case -1:
            if (this.playerLoaded) {
              break;
            }
            this.retrieveMetadata();
            this.playerLoaded = true;
            break;
          case YT.PlayerState.BUFFERING:
            this.handleBuffer();
            break;
          case YT.PlayerState.PLAYING:
            this.handlePlay();
            break;
          case YT.PlayerState.PAUSED:
            this.handlePause();
            break;
          case YT.PlayerState.ENDED:
            this.handleEnd();
        }
        this.lastRecordedTime = {
          timeReported: Date.now(),
          timeElapsed: this.player.getCurrentTime() * 1000
        };
      }
    }, {
      key: "retrieveMetadata",
      value: function () {
        var e = this;
        return new Promise(function (t, a) {
          var n = e.player.getVideoData();
          var r = e.player.getPlaylist() || [n.video_id];
          var o = r.join();
          (0, i.default)("https://www.googleapis.com/youtube/v3/videos?id=" + o + "&part=snippet,contentDetails&key=" + e.apiKey).then(function (e) {
            if (!e.ok) {
              var t = new Error("Segment request to Youtube API failed (likely due to a bad API Key. Events will still be sent but will not contain video metadata)");
              t.response = e;
              throw t;
            }
            return e.json();
          }).then(function (a) {
            e.metadata = [];
            var n = 0;
            for (var i = 0; i < r.length; i++) {
              var o = a.items[i];
              e.metadata.push({
                content: {
                  title: o.snippet.title,
                  description: o.snippet.description,
                  keywords: o.snippet.tags,
                  channel: o.snippet.channelTitle,
                  airdate: o.snippet.publishedAt
                }
              });
              n += s(o.contentDetails.duration);
            }
            for (i = 0; i < r.length; i++) {
              e.metadata[i].playback = {
                total_length: n,
                video_player: "youtube"
              };
            }
            t();
          }).catch(function (t) {
            e.metadata = r.map(function (e) {
              return {
                playback: {
                  video_player: "youtube"
                },
                content: {}
              };
            });
            a(t);
          });
        });
      }
    }, {
      key: "handleBuffer",
      value: function () {
        var e = this.determineSeek();
        if (!this.playbackStarted) {
          this.playbackStarted = true;
          this.track("Video Playback Started", this.metadata[this.playlistIndex].playback);
        }
        if (e && !this.isSeeking) {
          this.isSeeking = true;
          this.track("Video Playback Seek Started", this.metadata[this.playlistIndex].playback);
        }
        if (this.isSeeking) {
          this.track("Video Playback Seek Completed", this.metadata[this.playlistIndex].playback);
          this.isSeeking = false;
        }
        var t = this.player.getPlaylist();
        if (t && this.player.getCurrentTime() === 0 && this.player.getPlaylistIndex() !== this.playlistIndex) {
          this.contentStarted = false;
          if (this.playlistIndex === t.length - 1 && this.player.getPlaylistIndex() === 0) {
            this.track("Video Playback Completed", this.metadata[this.player.getPlaylistIndex()].playback);
            this.track("Video Playback Started", this.metadata[this.player.getPlaylistIndex()].playback);
          }
        }
        this.track("Video Playback Buffer Started", this.metadata[this.playlistIndex].playback);
        this.isBuffering = true;
      }
    }, {
      key: "handlePlay",
      value: function () {
        if (!this.contentStarted) {
          this.playlistIndex = this.player.getPlaylistIndex();
          if (this.playlistIndex === -1) {
            this.playlistIndex = 0;
          }
          this.track("Video Content Started", this.metadata[this.playlistIndex].content);
          this.contentStarted = true;
        }
        if (this.isBuffering) {
          this.track("Video Playback Buffer Completed", this.metadata[this.playlistIndex].playback);
          this.isBuffering = false;
        }
        if (this.isPaused) {
          this.track("Video Playback Resumed", this.metadata[this.playlistIndex].playback);
          this.isPaused = false;
        }
      }
    }, {
      key: "handlePause",
      value: function () {
        var e = this.determineSeek();
        if (this.isBuffering) {
          this.track("Video Playback Buffer Completed", this.metadata[this.playlistIndex].playback);
          this.isBuffering = false;
        }
        if (!this.isPaused) {
          if (e) {
            this.track("Video Playback Seek Started", this.metadata[this.playlistIndex].playback);
            this.isSeeking = true;
          } else {
            this.track("Video Playback Paused", this.metadata[this.playlistIndex].playback);
            this.isPaused = true;
          }
        }
      }
    }, {
      key: "handleEnd",
      value: function () {
        this.track("Video Content Completed", this.metadata[this.playlistIndex].content);
        this.contentStarted = false;
        var e = this.player.getPlaylistIndex();
        var t = this.player.getPlaylist();
        if (t && e === t.length - 1 || e === -1) {
          this.track("Video Playback Completed", this.metadata[this.playlistIndex].playback);
          this.playbackStarted = false;
        }
      }
    }, {
      key: "determineSeek",
      value: function () {
        var e = this.isPaused || this.isBuffering ? 0 : Date.now() - this.lastRecordedTime.timeReported;
        var t = this.player.getCurrentTime() * 1000 - this.lastRecordedTime.timeElapsed;
        return Math.abs(e - t) > 2000;
      }
    }]);
    return t;
  }(r(a(1)).default);
  function s(e) {
    var t = e.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    t = t.slice(1).map(function (e) {
      if (e != null) {
        return e.replace(/\D/, "");
      }
    });
    return (parseInt(t[0]) || 0) * 3600 + (parseInt(t[1]) || 0) * 60 + (parseInt(t[2]) || 0);
  }
  t.default = o;
}]));
const r = t({
  __proto__: null,
  default: e(i)
}, [i]);
export { r as i };