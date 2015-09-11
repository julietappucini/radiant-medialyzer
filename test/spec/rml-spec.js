describe("Radiant MediaLyzer unit test suite for Google Chrome 45 on Windows 10", function () {
  var rml = new RadiantML();
  // user agent
  it("User agent support", function () {
    var ua = rml.getUserAgent();
    var res = false;
    if (typeof ua === 'string' || ua === null) {
      res = true;
    }
    expect(res).toBe(true);
  });
  // lib version
  it("RML version", function () {
    var version = rml.getVersion();
    var res = false;
    if (typeof version === 'string') {
      res = true;
    }
    expect(res).toBe(true);
  });
  // video
  it("HTML5 video tag support", function () {
    expect(rml.video5()).toBe(true);
  });
  it("mp4H264AAC support", function () {
    expect(rml.mp4H264AAC()).toBe(true);
  });
  it("mp4H264AAC('main30') support", function () {
    expect(rml.mp4H264AAC('main30')).toBe(true);
  });
  it("mp4H264AAC('high30') support", function () {
    expect(rml.mp4H264AAC('high30')).toBe(true);
  });
  it("mp4H264AAC('high40') support", function () {
    expect(rml.mp4H264AAC('high40')).toBe(true);
  });
  it("mp4H264AAC('high50') support", function () {
    expect(rml.mp4H264AAC('high50')).toBe(true);
  });
  it("webmVP8Vorbis support", function () {
    expect(rml.webmVP8Vorbis()).toBe(true);
  });
  it("webmVP9Vorbis support", function () {
    expect(rml.webmVP9Vorbis()).toBe(true);
  });
  it("oggTheoraVorbis support", function () {
    expect(rml.oggTheoraVorbis()).toBe(true);
  });
  it("Native fullscreen support", function () {
    expect(rml.nativeFS()).toBe(true);
  });
  // audio
  it("HTML5 audio tag support", function () {
    expect(rml.audio5()).toBe(true);
  });
  it("m4aAACLC support", function () {
    expect(rml.m4aAACLC()).toBe(true);
  });
  it("m4aHEAAC support", function () {
    expect(rml.m4aHEAAC()).toBe(true);
  });
  it("m4aHEAACv2 support", function () {
    expect(rml.m4aHEAACv2()).toBe(true);
  });
  it("mp3 support", function () {
    expect(rml.mp3()).toBe(true);
  });
  it("oggVorbis support", function () {
    expect(rml.oggVorbis()).toBe(true);
  });
  it("webmOpus support", function () {
    expect(rml.webmOpus()).toBe(true);
  });
  it("wavPCM support", function () {
    expect(rml.wavPCM()).toBe(true);
  });
  it("Web Audio API support", function () {
    expect(rml.webAudio()).toBe(true);
  });
  // Stream
  it("MSE support", function () {
    expect(rml.mse()).toBe(true);
  });
  it("EME support", function () {
    expect(rml.eme()).toBe(true);
  });
  it("HLS video support", function () {
    expect(rml.hlsVideo()).toBe(false);
  });
  it("HLS audio support", function () {
    expect(rml.hlsAudio()).toBe(false);
  });
  it("getUserMedia support", function () {
    expect(rml.getUserMedia()).toBe(true);
  });
  it("rtcPeerConnection support", function () {
    expect(rml.rtcPeerConnection()).toBe(true);
  });
  it("rtcSessionDescription support", function () {
    expect(rml.rtcSessionDescription()).toBe(true);
  });
  it("Web Socket support", function () {
    expect(rml.webSocket()).toBe(true);
  });
  // effiency
  it("Web Worker support", function () {
    expect(rml.webWorker()).toBe(true);
  });
  it("localStorage support", function () {
    expect(rml.localStorage()).toBe(true);
  });
  it("sessionStorage support", function () {
    expect(rml.sessionStorage()).toBe(true);
  });
  // canvas 
  it("Canvas support", function () {
    expect(rml.canvas()).toBe(true);
  });
  it("canvasText support", function () {
    expect(rml.canvasText()).toBe(true);
  });
  it("canvasBlending support", function () {
    expect(rml.canvasBlending()).toBe(true);
  });
  it("canvasWebGL support", function () {
    expect(rml.canvasWebGL()).toBe(true);
  });
});
