/**
 * Radiant MediaLyzer 2.1.1 | https://www.radiantmedialyzer.net
 * @license Copyright (c) 2016  Arnaud Leyder EIRL
 * MIT License https://www.radiantmedialyzer.net/license.html
 */
import {RadiantML} from '../../src/rml-class';

(() => {

  'use strict';

  const rml = new RadiantML();

  describe("Radiant MediaLyzer unit test suite for Google Chrome 51 on Windows 10", () => {
    // user agent
    it("getUserAgent", () => {
      let ua = rml.getUserAgent();
      let res = false;
      if (typeof ua === 'string' || ua === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    // lib version
    it("getVersion", () => {
      let version = rml.getVersion();
      let res = false;
      if (typeof version === 'string') {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("getProtocol", () => {
      let protocol = rml.getProtocol();
      let res = false;
      if (typeof protocol === 'string' || protocol === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("getCurrentURL", () => {
      let url = rml.getCurrentURL();
      let res = false;
      if (typeof url === 'string' || url === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("getWidthViewport", () => {
      let viewportWidth = rml.getWidthViewport();
      let res = false;
      if (typeof viewportWidth === 'number' || viewportWidth === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("getHeightViewport", () => {
      let viewportHeight = rml.getHeightViewport();
      let res = false;
      if (typeof viewportHeight === 'number' || viewportHeight === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("isOnline", () => {
      let isOnline = rml.isOnline();
      let res = false;
      if (typeof isOnline === 'boolean' || isOnline === null) {
        res = true;
      }
      expect(res).toBe(true);
    });
    it("video5", () => {
      expect(rml.video5()).toBe(true);
    });
    it("playbackRate", () => {
      expect(rml.playbackRate()).toBe(true);
    });
    it("loop", () => {
      expect(rml.loop()).toBe(true);
    });
    it("autoplay", () => {
      expect(rml.autoplay()).toBe(true);
    });
    it("muted", () => {
      expect(rml.muted()).toBe(true);
    });
    it("mp4H264AAC", () => {
      expect(rml.mp4H264AAC()).toBe(true);
      expect(rml.mp4H264AAC('high', 4.1)).toBe(true);
    });
    it("webmVP8Vorbis", () => {
      expect(rml.webmVP8Vorbis()).toBe(true);
    });
    it("webmVP9Vorbis", () => {
      expect(rml.webmVP9Vorbis()).toBe(true);
    });
    it("webmVP9Opus", () => {
      expect(rml.webmVP9Opus()).toBe(true);
    });
    it("oggDalaaOpus", () => {
      expect(rml.oggDalaaOpus()).toBe(false);
    });
    it("oggTheoraVorbis", () => {
      expect(rml.oggTheoraVorbis()).toBe(true);
    });
    it("oggDiracVorbis", () => {
      expect(rml.oggDiracVorbis()).toBe(false);
    });
    it("threeGPPM4VSPAAC", () => {
      expect(rml.threeGPPM4VSPAAC()).toBe(false);
    });
    it("nativeHLSVideo", () => {
      expect(rml.nativeHLSVideo()).toBe(false);
    });
    it("nativeMPEGDASHVideo", () => {
      expect(rml.nativeMPEGDASHVideo()).toBe(false);
    });
    it("audio5", () => {
      expect(rml.audio5()).toBe(true);
    });
    it("m4aAAC", () => {
      expect(rml.m4aAAC()).toBe(true);
      expect(rml.m4aAAC('he-aac')).toBe(true);
    });
    it("m4aAC3", () => {
      expect(rml.m4aAC3()).toBe(false);
    });
    it("mp3", () => {
      expect(rml.mp3()).toBe(true);
    });
    it("webmVorbis", () => {
      expect(rml.webmVorbis()).toBe(true);
    });
    it("webmOpus", () => {
      expect(rml.webmOpus()).toBe(true);
    });
    it("oggVorbis", () => {
      expect(rml.oggVorbis()).toBe(true);
    });
    it("oggOpus", () => {
      expect(rml.oggOpus()).toBe(true);
    });
    it("oggFLAC", () => {
      expect(rml.oggFLAC()).toBe(false);
    });
    it("oggSpeex", () => { 
      expect(rml.oggSpeex()).toBe(false);
    });
    it("wavPCM", () => {
      expect(rml.wavPCM()).toBe(true);
    });
    it("nativeHLSAudio", () => {
      expect(rml.nativeHLSAudio()).toBe(false);
    });
    it("webAudio", () => {
      expect(rml.nativeFS()).toBe(true);
    });
    it("nativeFS", () => {
      expect(rml.nativeFS()).toBe(true);
    });
    it("webWorker", () => {
      expect(rml.webWorker()).toBe(true);
    });
    it("mse", () => {
      expect(rml.mse()).toBe(true);
    });
    it("eme", () => {
      expect(rml.eme()).toBe(true);
    });
    it("requestMediaKeySystemAccess", () => {
      expect(rml.requestMediaKeySystemAccess()).toBe(true);
    });
    it("canvas", () => {
      expect(rml.canvas()).toBe(true);
    });
    it("canvasText", () => {
      expect(rml.canvasText()).toBe(true);
    });
    it("canvasBlending", () => {
      expect(rml.canvasBlending()).toBe(true);
    });
    it("canvasWebGL", () => {
      expect(rml.canvasWebGL()).toBe(true);
    });
  });
})();