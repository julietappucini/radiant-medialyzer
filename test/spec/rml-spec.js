(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Radiant MediaLyzer 2.0.0 | http://www.radiantmedialyzer.net
 * @license Copyright (c) 2016  Arnaud Leyder EIRL
 * MIT License http://www.radiantmedialyzer.net/license.html
 */

var RadiantML = exports.RadiantML = function () {

  // Class constructor

  function RadiantML() {
    _classCallCheck(this, RadiantML);

    this.userAgent = window.navigator.userAgent || null;
    this.testVideo = document.createElement('video');
    this.testAudio = document.createElement('audio');
    this.testCanvas = document.createElement('canvas');
    this.body = document.body || document.getElementsByTagName('body')[0];
    this.version = '2.0.0';
  }

  // get Radiant MediaLyzer version


  RadiantML.prototype.getVersion = function getVersion() {
    return this.version;
  };

  // get current userAgent


  RadiantML.prototype.getUserAgent = function getUserAgent() {
    return this.userAgent;
  };

  // get protocol


  RadiantML.prototype.getProtocol = function getProtocol() {
    if (typeof window.location.protocol !== 'undefined') {
      return window.location.protocol.toLowerCase();
    }
    return null;
  };

  // get document URL


  RadiantML.prototype.getCurrentURL = function getCurrentURL() {
    if (typeof document.URL !== 'undefined') {
      return document.URL;
    }
    return null;
  };

  // get viewport width


  RadiantML.prototype.getWidthViewport = function getWidthViewport() {
    return window.innerWidth || document.documentElement.clientWidth || this.body.clientWidth || null;
  };

  // get viewport width


  RadiantML.prototype.getHeightViewport = function getHeightViewport() {
    return window.innerHeight || document.documentElement.clientHeight || this.body.clientHeight || null;
  };

  // get online status


  RadiantML.prototype.isOnline = function isOnline() {
    if (typeof window.navigator.onLine === 'undefined') {
      return null;
    }
    if (window.navigator.onLine) {
      return true;
    }
    return false;
  };

  // canPlayType helper function


  RadiantML.prototype.canPlayType = function canPlayType(type, mime, strict) {
    var testElement = this.testVideo;
    if (type === 'audio') {
      testElement = this.testAudio;
    }
    var canPlayType = testElement.canPlayType(mime);
    if (strict && canPlayType === 'probably' || !strict && canPlayType !== '') {
      return true;
    }
    return false;
  };

  // test for HTML5 video support


  RadiantML.prototype.video5 = function video5() {
    return !!this.testVideo.canPlayType;
  };

  // test for playbackRate support


  RadiantML.prototype.playbackRate = function playbackRate() {
    if ('playbackRate' in this.testVideo) {
      return true;
    }
    return false;
  };

  // test for loop support


  RadiantML.prototype.loop = function loop() {
    if ('loop' in this.testVideo) {
      return true;
    }
    return false;
  };

  // test for autoplay support


  RadiantML.prototype.autoplay = function autoplay() {
    if ('autoplay' in this.testVideo) {
      return true;
    }
    return false;
  };

  // test for muted support


  RadiantML.prototype.muted = function muted() {
    if ('muted' in this.testVideo) {
      return true;
    }
    return false;
  };

  // test for H.264/AAC in mp4 container support
  // accepted paramater is the profile name
  // 'high50' can be tested for 4K video support


  RadiantML.prototype.mp4H264AAC = function mp4H264AAC(profile, level) {
    // default to baseline
    var profileString = 'avc1.42E0';
    if (typeof profile === 'string') {
      if (profile === 'main') {
        profileString = 'avc1.4D40';
      } else if (profile === 'high') {
        profileString = 'avc1.6400';
      }
    }
    var levelString = '1E';
    if (typeof level === 'number') {
      levelString = level * 10;
      levelString = levelString.toString(16);
    }
    var mimeType = 'video/mp4; codecs="' + profileString + levelString + ',mp4a.40.2"';
    if (this.video5()) {
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  };

  // test for WebM VP8 video support


  RadiantML.prototype.webmVP8 = function webmVP8() {
    if (this.video5()) {
      var mimeType = 'video/webm; codecs="vp8, vorbis"';
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  };

  // test for WebM VP9 video support


  RadiantML.prototype.webmVP9 = function webmVP9() {
    if (this.video5()) {
      var mimeType = 'video/webm; codecs="vp9, vorbis"';
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  };

  // test for OGG Theora video support


  RadiantML.prototype.oggTheora = function oggTheora() {
    if (this.video5()) {
      var mimeType = 'video/ogg; codecs="theora, vorbis"';
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  };

  // test for 3GPP with MPEG-4 Visual Simple Profile Level 0 video 
  // and Low-Complexity AAC audio


  RadiantML.prototype.threeGPP = function threeGPP() {
    if (this.video5()) {
      var mimeType = 'video/3gpp; codecs="mp4v.20.8, mp4a.40.2"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for Apple HTTP Live Streaming video support (.m3u8)


  RadiantML.prototype.hlsVideo = function hlsVideo() {
    if (this.video5()) {
      // HLS video MIME type as per
      // https://tools.ietf.org/html/draft-pantos-http-live-streaming-14
      var mimeType = 'application/vnd.apple.mpegurl';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for HTML5 audio support


  RadiantML.prototype.audio5 = function audio5() {
    return !!this.testAudio.canPlayType;
  };

  // test for AAC-LC in mp4/m4a container support


  RadiantML.prototype.m4aAAC = function m4aAAC(type) {
    if (this.audio5()) {
      var mimeType = 'audio/mp4; codecs="mp4a.40.2"';
      if (typeof type === 'string') {
        if (type === 'he-aac') {
          mimeType = 'audio/mp4; codecs="mp4a.40.5"';
        } else if (type === 'he-aacv2') {
          mimeType = 'audio/mp4; codecs="mp4a.40.29"';
        }
      }
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for AC3 in mp4/m4a container support


  RadiantML.prototype.m4aAC3 = function m4aAC3() {
    if (this.audio5()) {
      var mimeType1 = 'audio/ac3';
      var mimeType2 = 'audio/x-ac3';
      if (this.canPlayType('audio', mimeType1, false) || this.canPlayType('audio', mimeType2, false)) {
        return true;
      }
    }
    return false;
  };

  // test for mp3 support


  RadiantML.prototype.mp3 = function mp3() {
    if (this.audio5()) {
      var mimeType = 'audio/mpeg';
      return this.canPlayType('audio', mimeType, false);
    }
    return false;
  };

  // test for WebM with Vorbis audio support


  RadiantML.prototype.webmVorbis = function webmVorbis() {
    if (this.audio5()) {
      var mimeType = 'audio/webm; codecs="vorbis"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for WebM with Opus audio support


  RadiantML.prototype.webmOpus = function webmOpus() {
    if (this.audio5()) {
      var mimeType = 'audio/webm; codecs="opus"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for OGG with Vorbis audio support


  RadiantML.prototype.oggVorbis = function oggVorbis() {
    if (this.audio5()) {
      var mimeType = 'audio/ogg; codecs="vorbis"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for OGG with Opus audio support


  RadiantML.prototype.oggOpus = function oggOpus() {
    if (this.audio5()) {
      var mimeType = 'audio/ogg; codecs="opus"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for OGG with Opus audio support


  RadiantML.prototype.oggFLAC = function oggFLAC() {
    if (this.audio5()) {
      var mimeType = 'audio/ogg; codecs="flac"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for PCM in wav container support


  RadiantML.prototype.wavPCM = function wavPCM() {
    if (this.audio5()) {
      var mimeType1 = 'audio/wav';
      var mimeType2 = 'audio/wave';
      var mimeType3 = 'audio/x-wav';
      if (this.canPlayType('audio', mimeType1, false) || this.canPlayType('audio', mimeType2, false) || this.canPlayType('audio', mimeType3, false)) {
        return true;
      }
    }
    return false;
  };

  // test for Apple HTTP Live Streaming audio support (.m3u)


  RadiantML.prototype.hlsAudio = function hlsAudio() {
    if (this.audio5()) {
      // HLS video MIME type as per
      // https://tools.ietf.org/html/draft-pantos-http-live-streaming-14
      var mimeType = 'audio/mpegurl';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  };

  // test for Web Audio API support


  RadiantML.prototype.webAudio = function webAudio() {
    var audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    return !!audioContext;
  };

  // test for native fullscreen support on targeted device


  RadiantML.prototype.nativeFS = function nativeFS() {
    var fs = document.documentElement.requestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullscreen || document.documentElement.msRequestFullscreen;
    return !!fs;
  };

  // test for Web Worker support


  RadiantML.prototype.webWorker = function webWorker() {
    var webWorker = window.Worker;
    return !!webWorker;
  };

  // test for Media Source Extensions (MSE) support


  RadiantML.prototype.mse = function mse() {
    var mse = 'MediaSource' in window || 'WebKitMediaSource' in window;
    return !!mse;
  };

  // test for Media Source Extensions (MSE) support


  RadiantML.prototype.eme = function eme() {
    var eme = 'MediaKeys' in window || 'WebKitMediaKeys' in window || 'MSMediaKeys' in window;
    return !!eme;
  };

  // test for requestMediaKeySystemAccess support


  RadiantML.prototype.requestMediaKeySystemAccess = function requestMediaKeySystemAccess() {
    var requestMediaKeySystemAccess = 'requestMediaKeySystemAccess' in window.navigator;
    return !!requestMediaKeySystemAccess;
  };

  RadiantML.prototype.cdm = function cdm() {
    var config = [{
      'initDataTypes': ['cenc'],
      'audioCapabilities': [{
        'contentType': 'audio/mp4; codecs="mp4a.40.2"'
      }],
      'videoCapabilities': [{
        'contentType': 'video/mp4; codecs="avc1.42E01E"'
      }]
    }];
    var promiseWidevine = window.navigator.requestMediaKeySystemAccess('com.widevine.alpha', config);
    var promisePlayready = window.navigator.requestMediaKeySystemAccess('com.microsoft.playready', config);
    var promisePrimetime = window.navigator.requestMediaKeySystemAccess('com.adobe.primetime', config);
    var promiseClearkey = window.navigator.requestMediaKeySystemAccess('org.w3.clearkey', config);
    return [promiseWidevine, promisePlayready, promiseClearkey, promisePrimetime];
  };

  // test for canvas support


  RadiantML.prototype.canvas = function canvas() {
    return !!this.testCanvas.getContext;
  };

  // test for canvas text API support


  RadiantML.prototype.canvasText = function canvasText() {
    if (this.canvas()) {
      var context = this.testCanvas.getContext('2d');
      return typeof context.fillText === 'function';
    }
    return false;
  };

  // test for canvas blending support


  RadiantML.prototype.canvasBlending = function canvasBlending() {
    if (this.canvas()) {
      var context = this.testCanvas.getContext('2d');
      context.globalCompositeOperation = 'screen';
      return context.globalCompositeOperation === 'screen';
    }
    return false;
  };

  // test for canvas WebGL support


  RadiantML.prototype.canvasWebGL = function canvasWebGL() {
    if (this.canvas()) {
      var canvas = this.testCanvas;
      var context = void 0;
      try {
        context = canvas.getContext('webgl');
        return true;
      } catch (e) {
        context = null;
      }
      if (context === null) {
        try {
          context = canvas.getContext('experimental-webgl');
          return true;
        } catch (e) {
          return false;
        }
      }
    }
    return false;
  };

  return RadiantML;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _rmlClass = require('../../src/rml-class');

(function () {

  'use strict';

  var rml = new _rmlClass.RadiantML();

  describe("Radiant MediaLyzer unit test suite for Google Chrome 51 on Windows 10", function () {
    // user agent
    it("getUserAgent", function () {
      var ua = rml.getUserAgent();
      var res = false;
      if (typeof ua === 'string' || ua === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    // lib version
    it("getVersion", function () {
      var version = rml.getVersion();
      var res = false;
      if (typeof version === 'string') {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("getProtocol", function () {
      var protocol = rml.getProtocol();
      var res = false;
      if (typeof protocol === 'string' || protocol === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("getCurrentURL", function () {
      var url = rml.getCurrentURL();
      var res = false;
      if (typeof url === 'string' || url === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("getWidthViewport", function () {
      var viewportWidth = rml.getWidthViewport();
      var res = false;
      if (typeof viewportWidth === 'number' || viewportWidth === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("getHeightViewport", function () {
      var viewportHeight = rml.getHeightViewport();
      var res = false;
      if (typeof viewportHeight === 'number' || viewportHeight === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("isOnline", function () {
      var isOnline = rml.isOnline();
      var res = false;
      if (typeof isOnline === 'boolean' || isOnline === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("video5", function () {
      expect(rml.video5()).toBe(true);
    });
    it("playbackRate", function () {
      expect(rml.playbackRate()).toBe(true);
    });
    it("loop", function () {
      expect(rml.loop()).toBe(true);
    });
    it("autoplay", function () {
      expect(rml.autoplay()).toBe(true);
    });
    it("muted", function () {
      expect(rml.muted()).toBe(true);
    });
    it("mp4H264AAC", function () {
      expect(rml.mp4H264AAC()).toBe(true);
      expect(rml.mp4H264AAC('high', 4.1)).toBe(true);
    });
    it("webmVP8", function () {
      expect(rml.webmVP8()).toBe(true);
    });
    it("webmVP9", function () {
      expect(rml.webmVP9()).toBe(true);
    });
    it("oggTheora", function () {
      expect(rml.oggTheora()).toBe(true);
    });
    it("threeGPP", function () {
      expect(rml.threeGPP()).toBe(false);
    });
    it("hlsVideo", function () {
      expect(rml.hlsVideo()).toBe(false);
    });
    it("audio5", function () {
      expect(rml.audio5()).toBe(true);
    });
    it("m4aAAC", function () {
      expect(rml.m4aAAC()).toBe(true);
      expect(rml.m4aAAC('he-aac')).toBe(true);
    });
    it("m4aAC3", function () {
      expect(rml.m4aAC3()).toBe(false);
    });
    it("mp3", function () {
      expect(rml.mp3()).toBe(true);
    });
    it("webmVorbis", function () {
      expect(rml.webmVorbis()).toBe(true);
    });
    it("webmOpus", function () {
      expect(rml.webmOpus()).toBe(true);
    });
    it("oggVorbis", function () {
      expect(rml.oggVorbis()).toBe(true);
    });
    it("oggOpus", function () {
      expect(rml.oggOpus()).toBe(true);
    });
    it("oggFLAC", function () {
      expect(rml.oggFLAC()).toBe(false);
    });
    it("wavPCM", function () {
      expect(rml.wavPCM()).toBe(true);
    });
    it("hlsAudio", function () {
      expect(rml.hlsAudio()).toBe(false);
    });
    it("webAudio", function () {
      expect(rml.nativeFS()).toBe(true);
    });
    it("nativeFS", function () {
      expect(rml.nativeFS()).toBe(true);
    });
    it("webWorker", function () {
      expect(rml.webWorker()).toBe(true);
    });
    it("mse", function () {
      expect(rml.mse()).toBe(true);
    });
    it("eme", function () {
      expect(rml.eme()).toBe(true);
    });
    it("requestMediaKeySystemAccess", function () {
      expect(rml.requestMediaKeySystemAccess()).toBe(true);
    });
    it("canvas", function () {
      expect(rml.canvas()).toBe(true);
    });
    it("canvasText", function () {
      expect(rml.canvasText()).toBe(true);
    });
    it("canvasBlending", function () {
      expect(rml.canvasBlending()).toBe(true);
    });
    it("canvasWebGL", function () {
      expect(rml.canvasWebGL()).toBe(true);
    });
  });
})(); /**
       * Radiant MediaLyzer 2.0.0 | http://www.radiantmedialyzer.net
       * @license Copyright (c) 2016  Arnaud Leyder EIRL
       * MIT License http://www.radiantmedialyzer.net/license.html
       */

},{"../../src/rml-class":1}]},{},[2]);
