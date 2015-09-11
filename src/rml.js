/**
 * Radiant MediaLyzer 1.2.4 | http://www.radiantmedialyzer.net
 * Copyright (c) 2014-2015  Radiant Media Player | Arnaud Leyder EIRL
 * https://www.radiantmediaplayer.com/
 * MIT License http://www.radiantmedialyzer.net/license.html
 */

/**
 * RadiantML class definition
 * @class
 */
window.RadiantML = (function (win, doc, nav) {
  "use strict";
  /**
   * Creates an instance of RadiantML
   * @constructor
   */
  function RadiantML() {
    this._userAgent = _getUserAgent();
    this._video = doc.createElement('video');
    this._audio = doc.createElement('audio');
    this._canvas = doc.createElement('canvas');
    this._version = '1.2.4';
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

  /**** public methods start here ****/
  /*** public getters ***/
  /**
   * Getter getVersion
   * @public
   * @returns {string} lib version
   */
  RadiantML.prototype.getVersion = function () {
    return this._version;
  };
  /**
   * Getter getUserAgent
   * @public
   * @returns {string|null} user agent string or null
   */
  RadiantML.prototype.getUserAgent = function () {
    return this._userAgent;
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
   * Feature: WebM with VP9 video and Vorbis audio
   * @public
   * @returns {boolean} has WebM VP9/Vorbis support in HTML5 video (or not)
   */
  RadiantML.prototype.webmVP9Vorbis = function () {
    if (this.video5()) {
      return _canPlayType(
              'video',
              'video/webm; codecs="vp9, vorbis"',
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
   * Feature: M4A/AAC-LC audio
   * @public
   * @returns {boolean} M4A/AAC (low complexity) support in HTML5 audio
   */
  RadiantML.prototype.m4aAACLC = function () {
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
   * Feature: M4A/HE-AAC audio
   * @public
   * @returns {boolean} M4A/AAC (high efficiency) support in HTML5 audio
   */
  RadiantML.prototype.m4aHEAAC = function () {
    if (this.audio5()) {
      return _canPlayType(
              'audio',
              'audio/mp4; codecs="mp4a.40.5"',
              true,
              this
              );
    }
    return false;
  };
  /**
   * Feature: M4A/HE-AACv2 audio
   * @public
   * @returns {boolean} M4A/AAC (high efficiency v2) support in HTML5 audio
   */
  RadiantML.prototype.m4aHEAACv2 = function () {
    if (this.audio5()) {
      return _canPlayType(
              'audio',
              'audio/mp4; codecs="mp4a.40.29"',
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
   * Feature: localStorage support
   * @public
   * @returns {boolean} has localStorage support (or not)
   */
  RadiantML.prototype.localStorage = function () {
    var localStorage = win.localStorage;
    return !!localStorage;
  };
  /**
   * Feature: sessionStorage support
   * @public
   * @returns {boolean} has sessionStorage support (or not)
   */
  RadiantML.prototype.sessionStorage = function () {
    var sessionStorage = win.sessionStorage;
    return !!sessionStorage;
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

  /*** streaming protocols detection ***/
  /**
   * Apple HTTP Live Streaming video support (.m3u8)
   * @public
   * @returns {boolean} has Apple HTTP Live Streaming video support (or not)
   */
  RadiantML.prototype.hlsVideo = function () {
    if (this.video5()) {
      // HLS video MIME type as per
      // https://tools.ietf.org/html/draft-pantos-http-live-streaming-14
      return _canPlayType('video',
              'application/vnd.apple.mpegurl',
              false,
              this
              );
    }
    return false;
  };
  /**
   * Apple HTTP Live Streaming audio support (.m3u)
   * @public
   * @returns {boolean} has Apple HTTP Live Streaming audio support (or not)
   */
  RadiantML.prototype.hlsAudio = function () {
    if (this.audio5()) {
      // HLS audio MIME type as per
      // https://tools.ietf.org/html/draft-pantos-http-live-streaming-14
      return _canPlayType('audio',
              'audio/mpegurl',
              false,
              this
              );
    }
    return false;
  };

  return RadiantML;

})(window, document, navigator);