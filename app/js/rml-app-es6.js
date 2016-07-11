/**
 * Radiant MediaLyzer 2.1.2 | https://www.radiantmedialyzer.net
 * @license Copyright (c) 2016  Arnaud Leyder EIRL
 * MIT License https://www.radiantmedialyzer.net/license.html
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

  let vp8VorbisWebMSpan = document.getElementById('vp8-vorbis-webm');
  let vp9VorbisWebMSpan = document.getElementById('vp9-vorbis-webm');
  let vp9OpusWebMSpan = document.getElementById('vp9-opus-webm');
  let daalaOpusSpan = document.getElementById('daala-opus-ogg');
  let theoraVorbisSpan = document.getElementById('theora-vorbis-ogg');
  let diracVorbisSpan = document.getElementById('dirac-vorbis-ogg');
  let threeGPPSpan = document.getElementById('3gpp');
  let hlsSpan = document.getElementById('hls');
  let dashSpan = document.getElementById('dash');

  if (rml.webmVP8Vorbis()) {
    vp8VorbisWebMSpan.innerHTML = supportedHTML;
  } else {
    vp8VorbisWebMSpan.innerHTML = notSupportedHTML;
  }
  if (rml.webmVP9Vorbis()) {
    vp9VorbisWebMSpan.innerHTML = supportedHTML;
  } else {
    vp9VorbisWebMSpan.innerHTML = notSupportedHTML;
  }
  if (rml.webmVP9Opus()) {
    vp9OpusWebMSpan.innerHTML = supportedHTML;
  } else {
    vp9OpusWebMSpan.innerHTML = notSupportedHTML;
  }
  if (rml.oggDaalaOpus()) {
    daalaOpusSpan.innerHTML = supportedHTML;
  } else {
    daalaOpusSpan.innerHTML = notSupportedHTML;
  }
  if (rml.oggTheoraVorbis()) {
    theoraVorbisSpan.innerHTML = supportedHTML;
  } else {
    theoraVorbisSpan.innerHTML = notSupportedHTML;
  }
  if (rml.oggDiracVorbis()) {
    diracVorbisSpan.innerHTML = supportedHTML;
  } else {
    diracVorbisSpan.innerHTML = notSupportedHTML;
  }
  if (rml.threeGPPM4VSPAAC()) {
    threeGPPSpan.innerHTML = supportedHTML;
  } else {
    threeGPPSpan.innerHTML = notSupportedHTML;
  }
  if (rml.nativeHLSVideo()) {
    hlsSpan.innerHTML = supportedHTML;
  } else {
    hlsSpan.innerHTML = notSupportedHTML;
  }
  if (rml.nativeMPEGDASHVideo()) {
    dashSpan.innerHTML = supportedHTML;
  } else {
    dashSpan.innerHTML = notSupportedHTML;
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
  let aacLCSpan = document.getElementById('aac-lc');
  let heAACSpan = document.getElementById('he-aac');
  let heAACv2Span = document.getElementById('he-aacv2');
  let hlsAudioSpan = document.getElementById('hls-audio');
  let ac3Span = document.getElementById('ac3');
  let mp3Span = document.getElementById('mp3');
  let webmVorbisSpan = document.getElementById('webm-vorbis');
  let webmOpusSpan = document.getElementById('webm-opus');
  let oggVorbisSpan = document.getElementById('ogg-vorbis');
  let oggOpusSpan = document.getElementById('ogg-opus');
  let oggFLACSpan = document.getElementById('ogg-flac');
  let oggSpeexSpan = document.getElementById('ogg-speex');
  let wavSpan = document.getElementById('wav');
  let webAudioSpan = document.getElementById('web-audio');

  if (rml.audio5()) {
    audioSpan.innerHTML = supportedHTML;
  } else {
    audioSpan.innerHTML = notSupportedHTML;
  }
  if (rml.m4aAAC()) {
    aacLCSpan.innerHTML = supportedHTML;
  } else {
    aacLCSpan.innerHTML = notSupportedHTML;
  }
  if (rml.m4aAAC('he-aac')) {
    heAACSpan.innerHTML = supportedHTML;
  } else {
    heAACSpan.innerHTML = notSupportedHTML;
  }
  if (rml.m4aAAC('he-aacv2')) {
    heAACv2Span.innerHTML = supportedHTML;
  } else {
    heAACv2Span.innerHTML = notSupportedHTML;
  }
  if (rml.nativeHLSAudio()) {
    hlsAudioSpan.innerHTML = supportedHTML;
  } else {
    hlsAudioSpan.innerHTML = notSupportedHTML;
  }
  if (rml.m4aAC3()) {
    ac3Span.innerHTML = supportedHTML;
  } else {
    ac3Span.innerHTML = notSupportedHTML;
  }
  if (rml.mp3()) {
    mp3Span.innerHTML = supportedHTML;
  } else {
    mp3Span.innerHTML = notSupportedHTML;
  }
  if (rml.webmVorbis()) {
    webmVorbisSpan.innerHTML = supportedHTML;
  } else {
    webmVorbisSpan.innerHTML = notSupportedHTML;
  }
  if (rml.webmOpus()) {
    webmOpusSpan.innerHTML = supportedHTML;
  } else {
    webmOpusSpan.innerHTML = notSupportedHTML;
  }
  if (rml.oggVorbis()) {
    oggVorbisSpan.innerHTML = supportedHTML;
  } else {
    oggVorbisSpan.innerHTML = notSupportedHTML;
  }
  if (rml.oggOpus()) {
    oggOpusSpan.innerHTML = supportedHTML;
  } else {
    oggOpusSpan.innerHTML = notSupportedHTML;
  }
  if (rml.oggFLAC()) {
    oggFLACSpan.innerHTML = supportedHTML;
  } else {
    oggFLACSpan.innerHTML = notSupportedHTML;
  }
  if (rml.oggSpeex()) {
    oggSpeexSpan.innerHTML = supportedHTML;
  } else {
    oggSpeexSpan.innerHTML = notSupportedHTML;
  }
  if (rml.wavPCM()) {
    wavSpan.innerHTML = supportedHTML;
  } else {
    wavSpan.innerHTML = notSupportedHTML;
  }
  if (rml.webAudio()) {
    webAudioSpan.innerHTML = supportedHTML;
  } else {
    webAudioSpan.innerHTML = notSupportedHTML;
  }

  let canvasSpan = document.getElementById('canvas');
  let canvasTextSpan = document.getElementById('canvas-text');
  let canvasBlendingSpan = document.getElementById('canvas-blending');
  let canvasWebGLSpan = document.getElementById('canvas-webgl');
  let webWorkersSpan = document.getElementById('web-workers');

  if (rml.canvas()) {
    canvasSpan.innerHTML = supportedHTML;
  } else {
    canvasSpan.innerHTML = notSupportedHTML;
  }
  if (rml.canvasText()) {
    canvasTextSpan.innerHTML = supportedHTML;
  } else {
    canvasTextSpan.innerHTML = notSupportedHTML;
  }
  if (rml.canvasBlending()) {
    canvasBlendingSpan.innerHTML = supportedHTML;
  } else {
    canvasBlendingSpan.innerHTML = notSupportedHTML;
  }
  if (rml.canvasWebGL()) {
    canvasWebGLSpan.innerHTML = supportedHTML;
  } else {
    canvasWebGLSpan.innerHTML = notSupportedHTML;
  }
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