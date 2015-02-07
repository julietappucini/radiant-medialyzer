/**
 * Radiant MediaLyzer 1.2.0 | http://www.radiantmedialyzer.net
 * Copyright (c) 2014-2015 Arnaud Leyder | Leyder Consuling | https://www.leyder-consulting.com
 * Sponsored by Radiant Media Player https://www.radiantmediaplayer.com
 * MIT Licensed http://www.radiantmedialyzer.net/license.html
 * Contact information http://www.radiantmedialyzer.net/about.html
 */

/**
 * RadiantML class definition
 * @class
 */
var RadiantML = (function () {
  "use strict";
  /**
   * Creates an instance of RadiantML
   * @constructor
   */
  function RadiantML() {
    this._userAgent = _getUserAgent();
    this._plugins = _getPlugins();
    this._mimeTypes = _getMimeTypes();
    this._standalone = _getStandaloneMode();
  }

  /**** private methods start here ****/
  /**
   * Get plugin version from version property
   * @private
   * @param {string} version - the version string
   * @returns {Object} Array with the version number [major, minor, patch]
   */
  var _parsePluginVersion = function (version) {
    if (!!version) {
      var versionArray = version.split('.');
      if (versionArray[0] && versionArray[1]) {
        return [
          parseInt(versionArray[0], 10),
          parseInt(versionArray[1], 10),
          parseInt(versionArray[2] || 0, 10)
        ];
      }
    }
    return null;
  };
  /**
   * Get plugin version from description property
   * @private
   * @param {string} description - the description string
   * @returns {Object} Array with the version number [major, minor, patch]
   */
  var _parsePluginDescription = function (description) {
    if (!!description) {
      var matches = description.match(/[\d]+/g);
      if (matches) {
        if (matches.length >= 3) {
          matches.length = 3;
        }
        if (matches[0] && matches[1]) {
          return [
            parseInt(matches[0], 10),
            parseInt(matches[1], 10),
            parseInt(matches[2] || 0, 10)
          ];
        }
      }
    }
    return null;
  };
  /**
   * Obtain user agent string
   * @private
   * @returns {string|null} user agent string or null
   */
  var _getUserAgent = function () {
    if (!!window.navigator.userAgent) {
      return window.navigator.userAgent;
    }
    return null;
  };
  /**
   * Obtain user agent plugins list
   * @private
   * @returns {Object|null} PluginArray or null
   */
  var _getPlugins = function () {
    if (!!window.navigator.plugins && window.navigator.plugins.length > 0) {
      return window.navigator.plugins;
    }
    return null;
  };
  /**
   * Obtain user agent mime types list
   * @private
   * @returns {Object|null} MimeTypeArray or null
   */
  var _getMimeTypes = function () {
    if (!!window.navigator.mimeTypes && window.navigator.mimeTypes.length > 0) {
      return window.navigator.mimeTypes;
    }
    return null;
  };
  /**
   * Obtain user agent standalone mode (iOS only)
   * @private
   * @returns {boolean|null} is in standalone mode or null
   */
  var _getStandaloneMode = function () {
    if (!!window.navigator.standalone) {
      return window.navigator.standalone;
    }
    return null;
  };
  /**
   * User agent detection: Native (stock) Android browser
   * @private
   * @param {string} ua - user agent string
   * @returns {boolean} true if native Android browser detected, false otherwise
   */
  var _isNativeAndroidBrowser = function (ua) {
    var isAndroid = _isAndroid();
    if (isAndroid[0]) {
      var pattern1 = /(?=.*mozilla\/5.0)(?=.*applewebkit)(?=.*android)/i;
      var pattern2 = /chrome/i;
      if (pattern1.test(ua) && !pattern2.test(ua)) {
        return true;
      }
    }
    return false;
  };
  /**
   * User agent detection: Chrome browser + version
   * @public
   * @param {string} ua - user agent string
   * @returns {Object} an Array as [boolean, Object] where boolean indicates if
   * Chrome browser is detected and Object is an Array holding the
   * version [major, minor, pacth] or null if not available.
   */
  var _isChrome = function (ua) {
    var isChrome = false;
    var chromeVersion = null;
    var support = [isChrome, chromeVersion];
    var windowChrome = !!window.chrome;
    // check it is not a WebView
    if (!_isNativeAndroidBrowser()) {
      if (windowChrome) {
        // Opera returns true on !!window.chrome
        var pattern = /(opr|opera)/i;
        if (!pattern.test(ua)) {
          isChrome = true;
        }
      }
    }
    if (isChrome) {
      var pattern = /chrome\/(\d+)\.(\d+)\.?(\d+)?/i;
      var versionArray = ua.match(pattern);
      if (!!versionArray) {
        chromeVersion = [
          parseInt(versionArray[1], 10),
          parseInt(versionArray[2], 10),
          parseInt(versionArray[3] || 0, 10)
        ];
      }
      support = [isChrome, chromeVersion];
    }
    return support;
  };
  /**
   * User agent detection: iOS + version
   * @private
   * @param {string} ua - user agent string
   * @returns {Object} an Array as [boolean, Object] where boolean indicates if iOS
   * is detected and Object is an Array holding the version [major, minor, pacth] or
   * null if not available.
   */
  var _isIOS = function (ua) {
    var isIOS = false;
    var iOSVersion = null;
    var support = [isIOS, iOSVersion];
    var pattern = /(ipad|iphone|ipod|apple tv)/i;
    if (pattern.test(ua)) {
      isIOS = true;
      var pattern = /os\s(\d+)_(\d+)_?(\d+)?/i;
      var versionArray = ua.match(pattern);
      if (!!versionArray) {
        iOSVersion = [
          parseInt(versionArray[1], 10),
          parseInt(versionArray[2], 10),
          parseInt(versionArray[3] || 0, 10)
        ];
      }
      support = [isIOS, iOSVersion];
    }
    return support;
  };
  /**
   * User agent: Android + version
   * @private
   * @param {string} ua - user agent string
   * @returns {Object} an Array as [boolean, Object] where boolean indicates if Android
   * is detected and Object is an Array holding the version [major, minor, pacth] or
   * null if not available.
   */
  var _isAndroid = function (ua) {
    var isAndroid = false;
    var androidVersion = null;
    var support = [isAndroid, androidVersion];
    var pattern = /android/i;
    ;
    if (pattern.test(ua)) {
      isAndroid = true;
      var pattern = /android\s(\d+)\.(\d+)\.?(\d+)?/i;
      var versionArray = ua.match(pattern);
      if (!!versionArray) {
        androidVersion = [
          parseInt(versionArray[1], 10),
          parseInt(versionArray[2], 10),
          parseInt(versionArray[3] || 0, 10)
        ];
      }
      support = [isAndroid, androidVersion];
    }
    return support;
  };
  /**
   * User agent: Internet Explorer browser
   * @public
   * @param {string} ua - user agent string
   * @returns {Object} an Array as [boolean, Object] where boolean indicates
   * if Internet Explorer browser is detected and Object is an Array holding the
   * version [major, minor, pacth] or null if not available.
   */
  var _isIE = function (ua) {
    var isIE = false;
    var ieVersion = null;
    var pattern = /(msie|trident)/i;
    var pattern1 = /msie/i;
    if (pattern.test(ua)) {
      isIE = true;
      if (pattern1.test(ua)) {
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) !== null) {
          ieVersion = parseFloat(RegExp.$1);
        }
      } else {
        ieVersion = 11;
      }

    }
    return [isIE, [ieVersion, 0, 0]];
  };
  /**
   * User agent: Opera (15+ only) browser
   * @public
   * @param {string} ua - user agent string
   * @returns {Object} an Array as [boolean, Object] where boolean indicates if
   * Opera browser is detected and Object is an Array holding the
   * version [major, minor, pacth] or null if not available.
   */
  var _isOpera = function (ua) {
    var isOpera = false;
    var operaVersion = null;
    var support = [isOpera, operaVersion];
    // includes iOS opera detection
    var pattern = /(opr|opios)/i;
    if (pattern.test(ua)) {
      isOpera = true;
      var pattern = /opr\/(\d+)\.(\d+)\.?(\d+)?/i;
      var versionArray = ua.match(pattern);
      if (!!versionArray) {
        operaVersion = [
          parseInt(versionArray[1], 10),
          parseInt(versionArray[2], 10),
          parseInt(versionArray[3] || 0, 10)
        ];
      }
      support = [isOpera, operaVersion];
    }
    return support;
  };

  /**** public methods start here ****/
  /*** public getters ***/
  /**
   * Getter getUserAgent
   * @public
   * @returns {string|null} user agent string or null
   */
  RadiantML.prototype.getUserAgent = function () {
    return this._userAgent;
  };
  /**
   * Getter getPlugins
   * @public
   * @returns {Object|null} PluginArray or null
   */
  RadiantML.prototype.getPlugins = function () {
    return this._plugins;
  };
  /**
   * Getter getMimeTypes
   * @public
   * @returns {Object|null} MimeTypeArray or null
   */
  RadiantML.prototype.getMimeTypes = function () {
    return this._mimeTypes;
  };
  /**
   * Getter getStandaloneMode
   * @public
   * @returns {boolean|null} is in standalone mode or null
   */
  RadiantML.prototype.getStandaloneMode = function () {
    return this._standalone;
  };

  /*** feature detection ***/
  /**
   * Feature: video tag support
   * @public
   * @returns {boolean} has HTML5 video tag support (or not)
   */
  RadiantML.prototype.video5 = function () {
    return !!document.createElement('video').canPlayType;
  };
  /**
   * Feature: mp4 with H264 baseline video and AAC low complexity audio
   * @public
   * @param {string} profile - the H.264 profile
   * @returns {boolean} has mp4/H264 (with the param profile) support in HTML5 video (or not)
   */
  RadiantML.prototype.mp4H264AAC = function (profile) {
    var videoCodec = 'avc1.42E01E'; // baseline profile
    if (!!profile) {
      if (profile === 'main30') {
        videoCodec = 'avc1.4D401E';
      } else if (profile === 'high30') {
        videoCodec = 'avc1.64001E';
      } else if (profile === 'high40') {
        videoCodec = 'avc1.640028';
      } else if (profile === 'high50') {
        videoCodec = 'avc1.640032';
      }
    }
    if (this.video5()) {
      var canPlayType = document.
          createElement('video').
          canPlayType('video/mp4; codecs="' + videoCodec + ',mp4a.40.2"');
      if (canPlayType  === 'probably') {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: WebM with VP8 video and Vorbis audio
   * @public
   * @returns {boolean} has WebM VP8/Vorbis support in HTML5 video (or not)
   */
  RadiantML.prototype.webmVP8Vorbis = function () {
    if (this.video5()) {
      var canPlayType = document.
          createElement('video').
          canPlayType('video/webm; codecs="vp8, vorbis"');
      if (canPlayType  === 'probably') {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: WebM with VP9 video and Opus audio
   * @public
   * @returns {boolean} has WebM VP9/Opus support in HTML5 video (or not)
   */
  RadiantML.prototype.webmVP9Opus = function () {
    if (this.video5()) {
      var canPlayType = document.
          createElement('video').
          canPlayType('video/webm; codecs="vp9, opus"');
      if (canPlayType  === 'probably') {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: Ogg with Theora video and Vorbis audio
   * @public
   * @returns {boolean} has Ogg Theora/Vorbis support in HTML5 video (or not)
   */
  RadiantML.prototype.oggTheoraVorbis = function () {
    if (this.video5()) {
      var canPlayType = document.
          createElement('video').
          canPlayType('video/ogg; codecs="theora, vorbis"');
      if (canPlayType  === 'probably') {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: Native fullscreen support
   * @public
   * @returns {boolean} has native fullscreen support (or not)
   */
  RadiantML.prototype.nativeFS = function () {
    var fs = document.documentElement.requestFullscreen ||
        document.documentElement.mozRequestFullScreen ||
        document.documentElement.webkitRequestFullscreen ||
        document.documentElement.msRequestFullscreen;
    return !!fs;
  };
  /**
   * Feature: audio tag
   * @public
   * @returns {boolean} has HTML5 audio tag support (or not)
   */
  RadiantML.prototype.audio5 = function () {
    return !!document.createElement('audio').canPlayType;
  };
  /**
   * Feature: M4A/AAC audio
   * @public
   * @returns {boolean} has M4A/AAC audio support in HTML5 audio (or not)
   */
  RadiantML.prototype.m4aAAC = function () {
    if (this.audio5()) {
      var canPlayType = document.
          createElement('audio').
          canPlayType('audio/mp4; codecs="mp4a.40.2"');
      if (canPlayType  === 'probably') {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: MP3 audio
   * @public
   * @returns {boolean} has MP3 audio support in HTML5 audio (or not)
   */
  RadiantML.prototype.mp3 = function () {
    if (this.audio5()) {
      var canPlayType = document.
          createElement('audio').
          canPlayType('audio/mpeg');
      if (!!canPlayType) {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: Vorbis audio in Ogg
   * @public
   * @returns {boolean} has Vorbis/Ogg audio support in HTML5 audio (or not)
   */
  RadiantML.prototype.oggVorbis = function () {
    if (this.audio5()) {
      var canPlayType = document.
          createElement('audio').
          canPlayType('audio/ogg; codecs="vorbis"');
      if (canPlayType  === 'probably') {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: Opus audio in WebM
   * @public
   * @returns {boolean} has Opus/WebM audio support in HTML5 audio (or not)
   */
  RadiantML.prototype.webmOpus = function () {
    if (this.audio5()) {
      var canPlayType = document.
          createElement('audio').
          canPlayType('audio/webm; codecs="opus"');
      if (canPlayType  === 'probably') {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: WAVE/PCM audio
   * @public
   * @returns {boolean} has WAVE/PCM audio support in HTML5 audio (or not)
   */
  RadiantML.prototype.wavPCM = function () {
    if (this.audio5()) {
      var canPlayType = document.
          createElement('audio').
          canPlayType('audio/wav');
      if (!!canPlayType) {
        return true;
      }
    }
    return false;
  };
  /**
   * Feature: Web Audio API
   * @public
   * @returns {boolean} has Web Audio API support (or not)
   */
  RadiantML.prototype.webAudio = function () {
    var audioContext = window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.msAudioContext;
    return !!audioContext;
  };
  /**
   * Feature: Media Source Extensions - required for MPEG-DASH
   * @public
   * @returns {boolean} has Media Source Extensions support (or not)
   */
  RadiantML.prototype.mse = function () {
    var mse = "MediaSource" in window || "WebKitMediaSource" in window;
    return !!mse;
  };
  /**
   * Feature: Encrypted Media Extensions - required for DRM in HTML5
   * @public
   * @returns {boolean} has Encrypted Media Extensions support (or not)
   */
  RadiantML.prototype.eme = function () {
    var eme = "MediaKeys" in window || "WebKitMediaKeys" in window || "MSMediaKeys" in window;
    return !!eme;
  };
  /**
   * Feature: getUserMedia API support
   * @public
   * @returns {boolean} has getUserMedia API support (or not)
   */
  RadiantML.prototype.getUserMedia = function () {
    var getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    return !!getUserMedia;
  };
  /**
   * Feature: RTCPeerConnection API
   * @public
   * @returns {boolean} has RTCPeerConnection API support (or not)
   */
  RadiantML.prototype.rtcPeerConnection = function () {
    var RTCPeerConnection = window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection ||
        window.msRTCPeerConnection;
    return !!RTCPeerConnection;
  };
  /**
   * Feature: RTCSessionDescription API
   * @public
   * @returns {boolean} has RTCSessionDescription API support (or not)
   */
  RadiantML.prototype.rtcSessionDescription = function () {
    var RTCSessionDescription = window.RTCSessionDescription ||
        window.mozRTCSessionDescription ||
        window.webkitRTCSessionDescription ||
        window.msRTCSessionDescription;
    return !!RTCSessionDescription;
  };
  /**
   * Feature: WebSocket API
   * @public
   * @returns {boolean} has WebSocket API support (or not)
   */
  RadiantML.prototype.webSocket = function () {
    var WebSocket = window.WebSocket || window.MozWebSocket;
    return !!WebSocket;
  };
  /**
   * Feature: Web Worker API
   * @public
   * @returns {boolean} has Web Worker API support (or not)
   */
  RadiantML.prototype.webWorker = function () {
    var webWorker = window.Worker;
    return !!webWorker;
  };
  /**
   * Feature: Web Storage  API
   * @public
   * @returns {boolean} has Web Storage  API support (or not)
   */
  RadiantML.prototype.webStorage = function () {
    //try/catch to fix a bug in older versions of Firefox
    try {
      if (typeof window.localStorage !== 'undefined' &&
          window['localStorage'] !== null &&
          typeof window.sessionStorage !== 'undefined') {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
  /**
   * Feature: canvas element support
   * @public
   * @returns {boolean} has canvas element support (or not)
   */
  RadiantML.prototype.canvas = function () {
    return !!document.createElement('canvas').getContext;
  };
  /**
   * Feature: canvas text API support
   * @public
   * @returns {boolean} has canvas text API support (or not)
   */
  RadiantML.prototype.canvasText = function () {
    if (this.canvas()) {
      var context = document.createElement('canvas').getContext('2d');
      return typeof context.fillText === 'function';
    }
    return false;
  };
  /**
   * Feature: canvas blending support
   * @public
   * @returns {boolean} has canvas blending support (or not)
   */
  RadiantML.prototype.canvasBlending = function () {
    if (this.canvas()) {
      var context = document.createElement('canvas').getContext('2d');
      context.globalCompositeOperation = 'screen';
      return context.globalCompositeOperation === 'screen';
    }
    return false;
  };
  /**
   * Feature: canvas WebGL support
   * @public
   * @returns {boolean} has canvas WebGL support (or not)
   */
  RadiantML.prototype.canvasWebGL = function () {
    if (this.canvas()) {
      var canvas = document.createElement('canvas'), context;
      try {
        context = canvas.getContext('webgl');
        return true;
      } catch (e) {
        context = null;
      }
      if (context === null) {
        try {
          context = canvas.getContext("experimental-webgl");
          return true;
        } catch (e) {
          return false;
        }
      }
    }
    return false;
  };

  /*** Plugin detection ***/
  /**
   * Feature: Flash plugin support
   * @public
   * @returns {Object} an Array as [boolean, Object] where boolean indicates if flash is
   * supported and Object is an Array holding the version [major, minor, pacth] or
   * null if not available.
   */
  RadiantML.prototype.flash = function () {
    var hasFlash = false;
    var flashVersion = null;
    var support = [hasFlash, flashVersion];
    var ua = this.getUserAgent();
    // IE 9, 10 with ActiveXObject (not tested on IE 8)
    var ie = _isIE(ua);
    if (ie[0] && ie[1][0] < 11) {
      try {
        var flash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        hasFlash = true;
        flashVersion = _parsePluginDescription(flash.GetVariable('$version'));
        support = [hasFlash, flashVersion];
      } catch (e) {
        support = [hasFlash, flashVersion];
      }
    } else if (this._plugins) {
      // check by plugin direct name first as explained
      // on https://developer.mozilla.org/en-US/docs/Web/API/NavigatorPlugins.plugins
      var flash = navigator.plugins['Shockwave Flash'];
      if (!!flash) {
        hasFlash = true;
        if (!!flash.version) {
          flashVersion = _parsePluginVersion(flash.version);
        } else if (!!flash.description) {
          flashVersion = _parsePluginDescription(flash.description);
        }
        support = [hasFlash, flashVersion];
      }
    } else if (this._mimeTypes) {
      // check by mimeTypes as a fallback
      var flash = navigator.mimeTypes['application/x-shockwave-flash'];
      if (!!flash && flash.enabledPlugin) {
        hasFlash = true;
        if (!!flash.enabledPlugin.description) {
          flashVersion = _parsePluginDescription(flash.enabledPlugin.description);
        }
        support = [hasFlash, flashVersion];
      }
    }
    return support;
  };

  /*** streaming protocols detection ***/
  /**
   * Apple HTTP Live Streaming video support (.m3u8)
   * Real world conditions (feature detection + user agent detection)
   * @public
   * @returns {boolean} has Apple HTTP Live Streaming video support (or not)
   */
  RadiantML.prototype.hlsVideo = function () {
    if (this.video5()) {
      var _rawHlsVideo = function () {
        var canPlayType = document.
            createElement('video').
            canPlayType('application/vnd.apple.mpegurl');
        if (!!canPlayType) {
          return true;
        }
        return false;
      };
      var ua = this.getUserAgent();
      var isAndroid = _isAndroid(ua);
      var isIOS = _isIOS(ua);
      // iOS and Android 4+ are sure ok
      if (isIOS[0] ||
          (isAndroid[0] && isAndroid[1][0] >= 4) ||
          _rawHlsVideo()) {
        return true;
      }
    }
    return false;
  };
  /**
   * Apple HTTP Live Streaming audio support (.m3u)
   * Real world conditions (feature detection + user agent detection)
   * @public
   * @returns {boolean} has Apple HTTP Live Streaming audio support (or not)
   */
  RadiantML.prototype.hlsAudio = function () {
    if (this.audio5()) {
      var _rawHlsAudio = function () {
        var canPlayType = document.
            createElement('audio').
            canPlayType('audio/mpegurl');
        if (!!canPlayType) {
          return true;
        }
        return false;
      };
      var ua = this.getUserAgent();
      var isAndroid = _isAndroid(ua);
      var isIOS = _isIOS(ua);
      // iOS and Android 4+ are sure ok
      if (isIOS[0] ||
          (isAndroid[0] && isAndroid[1][0] >= 4) ||
          _rawHlsAudio()) {
        return true;
      }
    }
    return false;
  };
  /**
   * MPEG-DASH DASH264 video support (.mpd)
   * real world conditions (feature detection + user agent detection)
   * @public
   * @returns {boolean} has MPEG-DASH DASH264 video support (or not)
   */
  RadiantML.prototype.dash264 = function () {
    if (this.video5()) {
      var ua = this.getUserAgent();
      // Opera only supports WebM Dash as of now
      var isOpera = _isOpera(ua);
      if (isOpera[0]) {
        return false;
      }
      // MPEG-DASH is ok on Android 4.2 and above with Chrome 34+
      var isAndroid = _isAndroid(ua);
      var isChrome = _isChrome(ua);
      if (isAndroid[0] && isAndroid[1][0] >= 4 && isAndroid[1][1] >= 2 &&
          isChrome[0] && isChrome[1][0] >= 34) {
        return true;
      }
      // Default should be ok
      if (this.mse() && this.mp4H264AAC()) {
        return true;
      }
    }
    return false;
  };
  /**
   * MPEG-DASH WebM Dash video support (.mpd)
   * @public
   * @returns {boolean} has MPEG-DASH WebM Dash video support (or not)
   */
  RadiantML.prototype.dashWebM = function () {
    if (this.video5()) {
      if (this.mse() && (this.webmVP9Opus() || this.webmVP8Vorbis())) {
        return true;
      }
    }
    return false;
  };

  return RadiantML;

})();