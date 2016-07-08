/**
 * Radiant MediaLyzer 2.0.2 | http://www.radiantmedialyzer.net
 * @license Copyright (c) 2016  Arnaud Leyder EIRL
 * MIT License http://www.radiantmedialyzer.net/license.html
 */
import 'core-js/es6';
import {RadiantML} from '../../src/rml-class';

((window, document) => {

  'use strict';
  const rml = new RadiantML();


  let supportedHTML = '<code class="supported"><span aria-hidden="true" ' +
    'class="glyphicon glyphicon-ok"></span><span class="text-support">Supported</span></code>';
  let notSupportedHTML = '<code class="not-supported"><span aria-hidden="true" ' +
    'class="glyphicon glyphicon-remove"></span><span class="text-support">Not supported</span></code>';

  // video feature detection
  let videoSpan = document.getElementById('video');
  if (rml.video5()) {
    videoSpan.innerHTML = supportedHTML;
  } else {
    videoSpan.innerHTML = notSupportedHTML;
  }
  let autoplaySpan = document.getElementById('autoplay');
  if (rml.autoplay()) {
    autoplaySpan.innerHTML = supportedHTML;
  } else {
    autoplaySpan.innerHTML = notSupportedHTML;
  }
  let playbackRateSpan = document.getElementById('playbackRate');
  if (rml.playbackRate()) {
    playbackRateSpan.innerHTML = supportedHTML;
  } else {
    playbackRateSpan.innerHTML = notSupportedHTML;
  }
  let loopSpan = document.getElementById('loop');
  if (rml.loop()) {
    loopSpan.innerHTML = supportedHTML;
  } else {
    loopSpan.innerHTML = notSupportedHTML;
  }
  let mutedSpan = document.getElementById('muted');
  if (rml.muted()) {
    mutedSpan.innerHTML = supportedHTML;
  } else {
    mutedSpan.innerHTML = notSupportedHTML;
  }

  let baselineSpan = document.getElementById('baseline');
  let mainSpan = document.getElementById('main');
  let highSpan = document.getElementById('high');
  let main40Span = document.getElementById('main40');
  let main50Span = document.getElementById('main50');
  let main51Span = document.getElementById('main51');
  let main52Span = document.getElementById('main52');
  if (rml.mp4H264AAC('baseline', 3.0)) {
    baselineSpan.innerHTML = supportedHTML;
  } else {
    baselineSpan.innerHTML = notSupportedHTML;
  }
  if (rml.mp4H264AAC('main', 3.0)) {
    mainSpan.innerHTML = supportedHTML;
  } else {
    mainSpan.innerHTML = notSupportedHTML;
  }
  if (rml.mp4H264AAC('high', 3.0)) {
    highSpan.innerHTML = supportedHTML;
  } else {
    highSpan.innerHTML = notSupportedHTML;
  }
  if (rml.mp4H264AAC('main', 4.0)) {
    main40Span.innerHTML = supportedHTML;
  } else {
    main40Span.innerHTML = notSupportedHTML;
  }
  if (rml.mp4H264AAC('main', 5.0)) {
    main50Span.innerHTML = supportedHTML;
  } else {
    main50Span.innerHTML = notSupportedHTML;
  }
  if (rml.mp4H264AAC('main', 5.1)) {
    main51Span.innerHTML = supportedHTML;
  } else {
    main51Span.innerHTML = notSupportedHTML;
  }
  if (rml.mp4H264AAC('main', 5.2)) {
    main52Span.innerHTML = supportedHTML;
  } else {
    main52Span.innerHTML = notSupportedHTML;
  }

  let vp8WebMSpan = document.getElementById('vp8-webm');
  let vp9WebMSpan = document.getElementById('vp9-webm');
  let theoraSpan = document.getElementById('theora-ogg');
  let threeGPPSpan = document.getElementById('3gpp');
  let hlsSpan = document.getElementById('hls');

  if (rml.webmVP8()) {
    vp8WebMSpan.innerHTML = supportedHTML;
  } else {
    vp8WebMSpan.innerHTML = notSupportedHTML;
  }
  if (rml.webmVP9()) {
    vp9WebMSpan.innerHTML = supportedHTML;
  } else {
    vp9WebMSpan.innerHTML = notSupportedHTML;
  }
  if (rml.oggTheora()) {
    theoraSpan.innerHTML = supportedHTML;
  } else {
    theoraSpan.innerHTML = notSupportedHTML;
  }
  if (rml.threeGPP()) {
    threeGPPSpan.innerHTML = supportedHTML;
  } else {
    threeGPPSpan.innerHTML = notSupportedHTML;
  }
  if (rml.hlsVideo() && rml.mp4H264AAC('baseline', 3.0)) {
    hlsSpan.innerHTML = supportedHTML;
  } else {
    hlsSpan.innerHTML = notSupportedHTML;
  }

  let mseSpan = document.getElementById('mse');
  let emeSpan = document.getElementById('eme');
  let rmksaSpan = document.getElementById('rmksa');
  let widevineSpan = document.getElementById('widevine');
  let playreadySpan = document.getElementById('playready');
  let primetimeSpan = document.getElementById('primetime');
  let clearkeySpan = document.getElementById('clearkey');

  if (rml.mse()) {
    mseSpan.innerHTML = supportedHTML;
  } else {
    mseSpan.innerHTML = notSupportedHTML;
  }
  if (rml.eme()) {
    emeSpan.innerHTML = supportedHTML;
  } else {
    emeSpan.innerHTML = notSupportedHTML;
  }
  if (rml.requestMediaKeySystemAccess()) {
    rmksaSpan.innerHTML = supportedHTML;
  } else {
    rmksaSpan.innerHTML = notSupportedHTML;
  }
  if (rml.requestMediaKeySystemAccess()) {
    let cdmPromise = rml.cdm();
    cdmPromise[0].then(() => {
      widevineSpan.innerHTML = supportedHTML;
    }).catch((e) => {
      console.log(e);
      widevineSpan.innerHTML = notSupportedHTML;
    });
    cdmPromise[1].then(() => {
      playreadySpan.innerHTML = supportedHTML;
    }).catch((e) => {
      console.log(e);
      playreadySpan.innerHTML = notSupportedHTML;
    });
    cdmPromise[2].then(() => {
      primetimeSpan.innerHTML = supportedHTML;
    }).catch((e) => {
      console.log(e);
      primetimeSpan.innerHTML = notSupportedHTML;
    });
    cdmPromise[3].then(() => {
      clearkeySpan.innerHTML = supportedHTML;
    }).catch((e) => {
      console.log(e);
      clearkeySpan.innerHTML = notSupportedHTML;
    });
  } else {
    let drmItems = document.getElementsByClassName('drm-items');
    for (let i = 0, len = drmItems.length; i < len; i++) {
      if (drmItems[i]) {
        drmItems[i].style.display = 'none';
      }
    }
  }

  let audioSpan = document.getElementById('audio');
  if (rml.audio5()) {
    audioSpan.innerHTML = supportedHTML;
  } else {
    audioSpan.innerHTML = notSupportedHTML;
  }
  let aacLCSpan = document.getElementById('aac-lc');
  if (rml.m4aAAC()) {
    aacLCSpan.innerHTML = supportedHTML;
  } else {
    aacLCSpan.innerHTML = notSupportedHTML;
  }
  let heAACSpan = document.getElementById('he-aac');
  if (rml.m4aAAC('he-aac')) {
    heAACSpan.innerHTML = supportedHTML;
  } else {
    heAACSpan.innerHTML = notSupportedHTML;
  }
  let heAACv2Span = document.getElementById('he-aacv2');
  if (rml.m4aAAC('he-aacv2')) {
    heAACv2Span.innerHTML = supportedHTML;
  } else {
    heAACv2Span.innerHTML = notSupportedHTML;
  }
  let hlsAudioSpan = document.getElementById('hls-audio');
  if (rml.hlsAudio()) {
    hlsAudioSpan.innerHTML = supportedHTML;
  } else {
    hlsAudioSpan.innerHTML = notSupportedHTML;
  }
  let ac3Span = document.getElementById('ac3');
  if (rml.m4aAC3()) {
    ac3Span.innerHTML = supportedHTML;
  } else {
    ac3Span.innerHTML = notSupportedHTML;
  }
  let mp3Span = document.getElementById('mp3');
  if (rml.mp3()) {
    mp3Span.innerHTML = supportedHTML;
  } else {
    mp3Span.innerHTML = notSupportedHTML;
  }
  let webmVorbisSpan = document.getElementById('webm-vorbis');
  if (rml.webmVorbis()) {
    webmVorbisSpan.innerHTML = supportedHTML;
  } else {
    webmVorbisSpan.innerHTML = notSupportedHTML;
  }
  let webmOpusSpan = document.getElementById('webm-opus');
  if (rml.webmOpus()) {
    webmOpusSpan.innerHTML = supportedHTML;
  } else {
    webmOpusSpan.innerHTML = notSupportedHTML;
  }
  let oggVorbisSpan = document.getElementById('ogg-vorbis');
  if (rml.oggVorbis()) {
    oggVorbisSpan.innerHTML = supportedHTML;
  } else {
    oggVorbisSpan.innerHTML = notSupportedHTML;
  }
  let oggOpusSpan = document.getElementById('ogg-opus');
  if (rml.oggOpus()) {
    oggOpusSpan.innerHTML = supportedHTML;
  } else {
    oggOpusSpan.innerHTML = notSupportedHTML;
  }
  let oggFLACSpan = document.getElementById('ogg-flac');
  if (rml.oggFLAC()) {
    oggFLACSpan.innerHTML = supportedHTML;
  } else {
    oggFLACSpan.innerHTML = notSupportedHTML;
  }
  let wavSpan = document.getElementById('wav');
  if (rml.wavPCM()) {
    wavSpan.innerHTML = supportedHTML;
  } else {
    wavSpan.innerHTML = notSupportedHTML;
  }
  let webAudioSpan = document.getElementById('web-audio');
  if (rml.webAudio()) {
    webAudioSpan.innerHTML = supportedHTML;
  } else {
    webAudioSpan.innerHTML = notSupportedHTML;
  }

  let canvasSpan = document.getElementById('canvas');
  if (rml.canvas()) {
    canvasSpan.innerHTML = supportedHTML;
  } else {
    canvasSpan.innerHTML = notSupportedHTML;
  }
  let canvasTextSpan = document.getElementById('canvas-text');
  if (rml.canvasText()) {
    canvasTextSpan.innerHTML = supportedHTML;
  } else {
    canvasTextSpan.innerHTML = notSupportedHTML;
  }
  let canvasBlendingSpan = document.getElementById('canvas-blending');
  if (rml.canvasBlending()) {
    canvasBlendingSpan.innerHTML = supportedHTML;
  } else {
    canvasBlendingSpan.innerHTML = notSupportedHTML;
  }
  let canvasWebGLSpan = document.getElementById('canvas-webgl');
  if (rml.canvasWebGL()) {
    canvasWebGLSpan.innerHTML = supportedHTML;
  } else {
    canvasWebGLSpan.innerHTML = notSupportedHTML;
  }

  let webWorkersSpan = document.getElementById('web-workers');
  if (rml.webWorker()) {
    webWorkersSpan.innerHTML = supportedHTML;
  } else {
    webWorkersSpan.innerHTML = notSupportedHTML;
  }

  // user agent
  let uaDiv = document.getElementById('ua');
  uaDiv.textContent = rml.getUserAgent();

  let online = document.getElementById('online');
  if (rml.isOnline()) {
    online.textContent = 'online';
  } else {
    online.textContent = 'offline';
  }

  let currentURL = document.getElementById('current-url');
  currentURL.textContent = rml.getCurrentURL();

  let protocol = document.getElementById('protocol');
  let getProtocol = rml.getProtocol();
  if (getProtocol.charAt(getProtocol.length - 1) === ':') {
    getProtocol = (getProtocol.slice(0, -1)).toUpperCase();
  }
  protocol.textContent = getProtocol;

  let fullscreen = document.getElementById('fullscreen');
  let nativeFS = rml.nativeFS();
  if (nativeFS) {
    fullscreen.textContent = 'Native fullscreen is available';
  } else {
    fullscreen.textContent = 'Native fullscreen is NOT available';
  }

  let viewportWidth = document.getElementById('viewport-width');
  viewportWidth.textContent = rml.getWidthViewport() + 'px';

  let viewportHeight = document.getElementById('viewport-height');
  viewportHeight.textContent = rml.getHeightViewport() + 'px';

  window.addEventListener('resize', function () {
    viewportWidth.textContent = rml.getWidthViewport() + 'px';
    viewportHeight.textContent = rml.getHeightViewport() + 'px';
  });

  window.addEventListener('orientationchange', function () {
    viewportWidth.textContent = rml.getWidthViewport() + 'px';
    viewportHeight.textContent = rml.getHeightViewport() + 'px';
  });

  let flash = document.getElementById('flash');
  let flashVersion = document.getElementById('flash-version');
  let version = swfobject.getFlashPlayerVersion();
  if (version && typeof version.major === 'number' && version.major > 0 &&
    typeof version.minor === 'number' && typeof version.release === 'number') {
    let major = version.major;
    let minor = version.minor;
    let release = version.release;
    flash.textContent = 'Flash is available';
    flashVersion.textContent = 'Detected Flash version: ' + major + '.' + minor + '.' + release;
  } else {
    flash.textContent = 'Flash is NOT available';
    flashVersion.style.display = 'none';
  }


})(window, document);