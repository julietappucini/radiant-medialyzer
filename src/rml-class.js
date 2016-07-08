/**
 * Radiant MediaLyzer 2.0.3 | http://www.radiantmedialyzer.net
 * @license Copyright (c) 2016  Arnaud Leyder EIRL
 * MIT License http://www.radiantmedialyzer.net/license.html
 */
export class RadiantML {

  // Class constructor
  constructor() {
    this.userAgent = window.navigator.userAgent || null;
    this.testVideo = document.createElement('video');
    this.testAudio = document.createElement('audio');
    this.testCanvas = document.createElement('canvas');
    this.body = document.body || document.getElementsByTagName('body')[0];
    this.version = '2.0.3';
  }

  // get Radiant MediaLyzer version
  getVersion() {
    return this.version;
  }

  // get current userAgent
  getUserAgent() {
    return this.userAgent;
  }

  // get protocol 
  getProtocol() {
    if (typeof window.location.protocol !== 'undefined') {
      return (window.location.protocol).toLowerCase();
    }
    return null;
  }

  // get document URL
  getCurrentURL() {
    if (typeof document.URL !== 'undefined') {
      return document.URL;
    }
    return null;
  }

  // get viewport width
  getWidthViewport() {
    return window.innerWidth || document.documentElement.clientWidth ||
      this.body.clientWidth || null;
  }

  // get viewport width
  getHeightViewport() {
    return window.innerHeight || document.documentElement.clientHeight ||
      this.body.clientHeight || null;
  }

  // get online status 
  isOnline() {
    if (typeof window.navigator.onLine === 'undefined') {
      return null;
    }
    if (window.navigator.onLine) {
      return true;
    }
    return false;
  }

  // canPlayType helper function
  canPlayType(type, mime, strict) {
    let testElement = this.testVideo;
    if (type === 'audio') {
      testElement = this.testAudio;
    }
    let canPlayType = testElement.canPlayType(mime);
    if ((strict && canPlayType === 'probably') || (!strict && canPlayType !== '')) {
      return true;
    }
    return false;
  }

  // test for HTML5 video support
  video5() {
    return !!this.testVideo.canPlayType;
  }

  // test for playbackRate support
  playbackRate() {
    if ('playbackRate' in this.testVideo) {
      return true;
    }
    return false;
  }

  // test for loop support
  loop() {
    if ('loop' in this.testVideo) {
      return true;
    }
    return false;
  }

  // test for autoplay support
  autoplay() {
    if ('autoplay' in this.testVideo) {
      return true;
    }
    return false;
  }

  // test for muted support
  muted() {
    if ('muted' in this.testVideo) {
      return true;
    }
    return false;
  }

  // test for H.264/AAC in mp4 container support 
  // accepted paramater is the profile name
  // 'high50' can be tested for 4K video support 
  mp4H264AAC(profile, level) {
    // default to baseline
    let profileString = 'avc1.42E0';
    if (typeof profile === 'string') {
      if (profile === 'main') {
        profileString = 'avc1.4D40';
      } else if (profile === 'high') {
        profileString = 'avc1.6400';
      }
    }
    let levelString = '1E';
    if (typeof level === 'number') {
      levelString = level * 10;
      levelString = levelString.toString(16);
    }
    let mimeType = 'video/mp4; codecs="' + profileString + levelString + ',mp4a.40.2"';
    if (this.video5()) {
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  }

  // test for WebM VP8 video support
  webmVP8() {
    if (this.video5()) {
      let mimeType = 'video/webm; codecs="vp8, vorbis"';
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  }

  // test for WebM VP9 video support
  webmVP9() {
    if (this.video5()) {
      let mimeType = 'video/webm; codecs="vp9, vorbis"';
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  }

  // test for OGG Theora video support
  oggTheora() {
    if (this.video5()) {
      let mimeType = 'video/ogg; codecs="theora, vorbis"';
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  }

  // test for 3GPP with MPEG-4 Visual Simple Profile Level 0 video  
  // and Low-Complexity AAC audio
  threeGPP() {
    if (this.video5()) {
      let mimeType = 'video/3gpp; codecs="mp4v.20.8, mp4a.40.2"';
      return this.canPlayType('video', mimeType, true);
    }
    return false;
  }

  // test for Apple HTTP Live Streaming video support (.m3u8)
  hlsVideo() {
    if (this.video5()) {
      // HLS video MIME type as per
      // https://tools.ietf.org/html/draft-pantos-http-live-streaming-14
      let mimeType = 'application/vnd.apple.mpegurl';
      return this.canPlayType('video', mimeType, false);
    }
    return false;
  }

  // test for HTML5 audio support
  audio5() {
    return !!this.testAudio.canPlayType;
  }

  // test for AAC-LC in mp4/m4a container support
  m4aAAC(type) {
    if (this.audio5()) {
      let mimeType = 'audio/mp4; codecs="mp4a.40.2"';
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
  }

  // test for AC3 in mp4/m4a container support
  m4aAC3() {
    if (this.audio5()) {
      let mimeType1 = 'audio/ac3';
      let mimeType2 = 'audio/x-ac3';
      if (this.canPlayType('audio', mimeType1, false) ||
        this.canPlayType('audio', mimeType2, false)) {
        return true;
      }
    }
    return false;
  }

  // test for mp3 support
  mp3() {
    if (this.audio5()) {
      let mimeType = 'audio/mpeg';
      return this.canPlayType('audio', mimeType, false);
    }
    return false;
  }

  // test for WebM with Vorbis audio support
  webmVorbis() {
    if (this.audio5()) {
      let mimeType = 'audio/webm; codecs="vorbis"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  }

  // test for WebM with Opus audio support
  webmOpus() {
    if (this.audio5()) {
      let mimeType = 'audio/webm; codecs="opus"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  }

  // test for OGG with Vorbis audio support
  oggVorbis() {
    if (this.audio5()) {
      let mimeType = 'audio/ogg; codecs="vorbis"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  }

  // test for OGG with Opus audio support
  oggOpus() {
    if (this.audio5()) {
      let mimeType = 'audio/ogg; codecs="opus"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  }

  // test for OGG with Opus audio support
  oggFLAC() {
    if (this.audio5()) {
      let mimeType = 'audio/ogg; codecs="flac"';
      return this.canPlayType('audio', mimeType, true);
    }
    return false;
  }

  // test for PCM in wav container support
  wavPCM() {
    if (this.audio5()) {
      let mimeType1 = 'audio/wav';
      let mimeType2 = 'audio/wave';
      let mimeType3 = 'audio/x-wav';
      if (this.canPlayType('audio', mimeType1, false) ||
        this.canPlayType('audio', mimeType2, false) ||
        this.canPlayType('audio', mimeType3, false)) {
        return true;
      }
    }
    return false;
  }

  // test for Apple HTTP Live Streaming audio support (.m3u)
  hlsAudio() {
    if (this.audio5()) {
      // HLS video MIME type as per
      // https://tools.ietf.org/html/draft-pantos-http-live-streaming-14
      let mimeType = 'audio/mpegurl';
      return this.canPlayType('audio', mimeType, false);
    }
    return false;
  }

  // test for Web Audio API support
  webAudio() {
    let audioContext = window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.msAudioContext;
    return !!audioContext;
  }

  // test for native fullscreen support on targeted device
  nativeFS() {
    let fs = document.documentElement.requestFullscreen ||
      document.documentElement.mozRequestFullScreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.msRequestFullscreen;
    return !!fs;
  }

  // test for Web Worker support
  webWorker() {
    var webWorker = window.Worker;
    return !!webWorker;
  }

  // test for Media Source Extensions (MSE) support
  mse() {
    let mse = 'MediaSource' in window || 'WebKitMediaSource' in window;
    return !!mse;
  }

  // test for Media Source Extensions (MSE) support
  eme() {
    let eme = 'MediaKeys' in window ||
      'WebKitMediaKeys' in window ||
      'MSMediaKeys' in window;
    return !!eme;
  }

  // test for requestMediaKeySystemAccess support
  requestMediaKeySystemAccess() {
    let requestMediaKeySystemAccess = 'requestMediaKeySystemAccess' in window.navigator;
    return !!requestMediaKeySystemAccess;
  }

  cdm() {
    var config = [{
      'initDataTypes': ['cenc'],
      'audioCapabilities': [{
        'contentType': 'audio/mp4; codecs="mp4a.40.2"'
      }],
      'videoCapabilities': [{
        'contentType': 'video/mp4; codecs="avc1.42E01E"'
      }]
    }];
    let promiseWidevine = window.navigator.
      requestMediaKeySystemAccess('com.widevine.alpha', config);
    let promisePlayready = window.navigator.
      requestMediaKeySystemAccess('com.microsoft.playready', config);
    let promisePrimetime = window.navigator.
      requestMediaKeySystemAccess('com.adobe.primetime', config);
    let promiseClearkey = window.navigator.
      requestMediaKeySystemAccess('org.w3.clearkey', config);
    return [promiseWidevine, promisePlayready, promiseClearkey, promisePrimetime];
  }

  // test for canvas support
  canvas() {
    return !!this.testCanvas.getContext;
  }

  // test for canvas text API support
  canvasText() {
    if (this.canvas()) {
      let context = this.testCanvas.getContext('2d');
      return typeof context.fillText === 'function';
    }
    return false;
  }

  // test for canvas blending support
  canvasBlending() {
    if (this.canvas()) {
      let context = this.testCanvas.getContext('2d');
      context.globalCompositeOperation = 'screen';
      return context.globalCompositeOperation === 'screen';
    }
    return false;
  }

  // test for canvas WebGL support
  canvasWebGL() {
    if (this.canvas()) {
      let canvas = this.testCanvas;
      let context;
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
  }

}