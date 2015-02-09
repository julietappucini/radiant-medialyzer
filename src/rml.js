/**
 * Radiant MediaLyzer 1.2.1 | http://www.radiantmedialyzer.net
 * Copyright (c) 2014-2015 Arnaud Leyder | Leyder Consuling
 * https://www.leyder-consulting.com
 * MIT License http://www.radiantmedialyzer.net/license.html
 */

/**
 * RadiantML class definition
 * @class
 */
var RadiantML = (function (win, doc, nav) {
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
    this._video = doc.createElement('video');
    this._audio = doc.createElement('audio');
    this._canvas = doc.createElement('canvas');
  }

  /**** private methods start here ****/
  /**
   * Obtain user agent string
   * @private
   * @returns {string|null} user agent string or null
   */
  var _getUserAgent = function () {
    return nav.userAgent || null;
  };
  /**
   * Obtain user agent plugins list
   * @private
   * @returns {Object|null} PluginArray or null
   */
  var _getPlugins = function () {
    if (!!nav.plugins && nav.plugins.length > 0) {
      return nav.plugins;
    }
    return null;
  };
  /**
   * Obtain user agent mime types list
   * @private
   * @returns {Object|null} MimeTypeArray or null
   */
  var _getMimeTypes = function () {
    if (!!nav.mimeTypes && nav.mimeTypes.length > 0) {
      return nav.mimeTypes;
    }
    return null;
  };
  /**
   * Obtain user agent standalone mode (iOS only)
   * @private
   * @returns {boolean|null} is in standalone mode or null
   */
  var _getStandaloneMode = function () {
    return nav.standalone || null;
  };
  /**
   * Can play type (MIME types) method for HTML5 media elements
   * @private
   * @param {string} element - the HTML5 media element to be tested
   * @param {string} mime - the MIME type to be tested
   * @param {string} strict - level of support to test ('probably' or/and 'maybe')
   * @returns {boolean} the MIME type is supported or not
   */
  var _canPlayType = function (element, mime, strict, context) {
    var testElement = context._video;
    if (element === 'audio') {
      testElement = context._audio;
    }
    if ((strict && testElement.canPlayType(mime) === 'probably') ||
        (!strict && testElement.canPlayType(mime) !== '')) {
      return true;
    }
    return false;
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
    var windowChrome = !!win.chrome;
    var pattern;
    if (!_isNativeAndroidBrowser()) {
      if (windowChrome) {
        // Opera returns true on !!window.chrome
        pattern = /(opr|opera)/i;
        if (!pattern.test(ua)) {
          isChrome = true;
        }
      }
    }
    if (isChrome) {
      pattern = /chrome\/(\d+)\.(\d+)\.?(\d+)?/i;
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
    if (pattern.test(ua)) {
      isAndroid = true;
      pattern = /android\s(\d+)\.(\d+)\.?(\d+)?/i;
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
    if (pattern.test(ua)) {
      isIE = true;
      pattern = /msie/i;
      if (pattern.test(ua)) {
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
      pattern = /opr\/(\d+)\.(\d+)\.?(\d+)?/i;
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
    return !!this._video.canPlayType;
  };
  /**
   * Feature: mp4 with H264 baseline video and AAC low complexity audio
   * @public
   * @param {string} profile - the H.264 profile
   * @returns {boolean} has mp4/H264 (with the param profile) support in HTML5 video (or not)
   */
  RadiantML.prototype.mp4H264AAC = function (profile) {
    var videoCodec = 'avc1.42E01E'; // baseline 3.0 profile
    if (!!profile) {
      if (profile === 'main30') { // main 3.0 profile
        videoCodec = 'avc1.4D401E';
      } else if (profile === 'high30') { // high 3.0 profile
        videoCodec = 'avc1.64001E';
      } else if (profile === 'high40') { // high 4.0 profile
        videoCodec = 'avc1.640028';
      } else if (profile === 'high50') { // high 5.0 profile
        videoCodec = 'avc1.640032';
      }
    }
    var mimeType = 'video/mp4; codecs="' + videoCodec + ',mp4a.40.2"';
    if (this.video5()) {
      return _canPlayType('video', mimeType, true, this);
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
      return _canPlayType(
          'video',
          'video/webm; codecs="vp8, vorbis"',
          true,
          this
          );
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
      return _canPlayType(
          'video',
          'video/webm; codecs="vp9, opus"',
          true,
          this
          );
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
      return _canPlayType(
          'video',
          'video/ogg; codecs="theora, vorbis"',
          true,
          this
          );
    }
    return false;
  };
  /**
   * Feature: Native fullscreen support
   * @public
   * @returns {boolean} has native fullscreen support (or not)
   */
  RadiantML.prototype.nativeFS = function () {
    var fs = doc.documentElement.requestFullscreen ||
        doc.documentElement.mozRequestFullScreen ||
        doc.documentElement.webkitRequestFullscreen ||
        doc.documentElement.msRequestFullscreen;
    return !!fs;
  };
  /**
   * Feature: audio tag
   * @public
   * @returns {boolean} has HTML5 audio tag support (or not)
   */
  RadiantML.prototype.audio5 = function () {
    return !!this._audio.canPlayType;
  };
  /**
   * Feature: M4A/AAC audio
   * @public
   * @returns {boolean} has M4A/AAC audio support in HTML5 audio (or not)
   */
  RadiantML.prototype.m4aAAC = function () {
    if (this.audio5()) {
      return _canPlayType(
          'audio',
          'audio/mp4; codecs="mp4a.40.2"',
          true,
          this
          );
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
      return _canPlayType(
          'audio',
          'audio/mpeg',
          false,
          this
          );
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
      return _canPlayType(
          'audio',
          'audio/ogg; codecs="vorbis"',
          true,
          this
          );
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
      return _canPlayType(
          'audio',
          'audio/webm; codecs="opus"',
          true,
          this
          );
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
      return _canPlayType(
          'audio',
          'audio/wav',
          false,
          this
          );
    }
    return false;
  };
  /**
   * Feature: Web Audio API
   * @public
   * @returns {boolean} has Web Audio API support (or not)
   */
  RadiantML.prototype.webAudio = function () {
    var audioContext = win.AudioContext ||
        win.webkitAudioContext ||
        win.mozAudioContext ||
        win.msAudioContext;
    return !!audioContext;
  };
  /**
   * Feature: Media Source Extensions - required for MPEG-DASH
   * @public
   * @returns {boolean} has Media Source Extensions support (or not)
   */
  RadiantML.prototype.mse = function () {
    var mse = "MediaSource" in win || "WebKitMediaSource" in win;
    return !!mse;
  };
  /**
   * Feature: Encrypted Media Extensions - required for DRM in HTML5
   * @public
   * @returns {boolean} has Encrypted Media Extensions support (or not)
   */
  RadiantML.prototype.eme = function () {
    var eme = "MediaKeys" in win ||
        "WebKitMediaKeys" in win ||
        "MSMediaKeys" in win;
    return !!eme;
  };
  /**
   * Feature: getUserMedia API support
   * @public
   * @returns {boolean} has getUserMedia API support (or not)
   */
  RadiantML.prototype.getUserMedia = function () {
    var getUserMedia = nav.getUserMedia ||
        nav.webkitGetUserMedia ||
        nav.mozGetUserMedia ||
        nav.msGetUserMedia;
    return !!getUserMedia;
  };
  /**
   * Feature: RTCPeerConnection API
   * @public
   * @returns {boolean} has RTCPeerConnection API support (or not)
   */
  RadiantML.prototype.rtcPeerConnection = function () {
    var RTCPeerConnection = win.RTCPeerConnection ||
        win.mozRTCPeerConnection ||
        win.webkitRTCPeerConnection ||
        win.msRTCPeerConnection;
    return !!RTCPeerConnection;
  };
  /**
   * Feature: RTCSessionDescription API
   * @public
   * @returns {boolean} has RTCSessionDescription API support (or not)
   */
  RadiantML.prototype.rtcSessionDescription = function () {
    var RTCSessionDescription = win.RTCSessionDescription ||
        win.mozRTCSessionDescription ||
        win.webkitRTCSessionDescription ||
        win.msRTCSessionDescription;
    return !!RTCSessionDescription;
  };
  /**
   * Feature: WebSocket API
   * @public
   * @returns {boolean} has WebSocket API support (or not)
   */
  RadiantML.prototype.webSocket = function () {
    var WebSocket = win.WebSocket || win.MozWebSocket;
    return !!WebSocket;
  };
  /**
   * Feature: Web Worker API
   * @public
   * @returns {boolean} has Web Worker API support (or not)
   */
  RadiantML.prototype.webWorker = function () {
    var webWorker = win.Worker;
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
      if (typeof win.localStorage !== 'undefined' &&
          win['localStorage'] !== null &&
          typeof win.sessionStorage !== 'undefined') {
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
    return !!this._canvas.getContext;
  };
  /**
   * Feature: canvas text API support
   * @public
   * @returns {boolean} has canvas text API support (or not)
   */
  RadiantML.prototype.canvasText = function () {
    if (this.canvas()) {
      var context = this._canvas.getContext('2d');
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
      var context = this._canvas.getContext('2d');
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
      var canvas = this._canvas, context;
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
      var flash = nav.plugins['Shockwave Flash'];
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
      var flash = nav.mimeTypes['application/x-shockwave-flash'];
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
      // HLS video MIME type as per
      // https://tools.ietf.org/html/draft-pantos-http-live-streaming-14
      var hlsVideoMimeType = _canPlayType('video',
          'application/vnd.apple.mpegurl',
          false,
          this
          );
      var ua = this.getUserAgent();
      var isAndroid = _isAndroid(ua);
      // Android before 4.0.0 just do not handle HLS well
      if (isAndroid[0] && isAndroid[1][0] < 4) {
        return false;
      }
      if (hlsVideoMimeType) {
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
      // HLS audio MIME type as per
      // https://tools.ietf.org/html/draft-pantos-http-live-streaming-14
      var hlsAudioMimeType = _canPlayType('audio',
          'audio/mpegurl',
          false,
          this
          );
      var ua = this.getUserAgent();
      var isAndroid = _isAndroid(ua);
      // Android before 4.0.0 just do not handle HLS well
      if (isAndroid[0] && isAndroid[1][0] < 4) {
        return false;
      }
      if (hlsAudioMimeType) {
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
      // Default should be ok for the rest
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

})(window, document, navigator);