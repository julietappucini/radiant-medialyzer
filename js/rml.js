/** Radiant MediaLyzer 1.1.0 | http://www.radiantmedialyzer.net | https://www.radiantmediaplayer.com
 * Copyright (c) 2014-2015 Arnaud Leyder | Leyder Consuling | https://www.leyder-consulting.com
 * MIT Licensed | http://www.radiantmedialyzer.net/license.html
 * For contact information please visit http://www.radiantmedialyzer.net/about.html
 */
"use strict";
/**
 * RadiantML class definition
 * @class
 */
var RadiantML = (function () {

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
            if (!!canPlayType) {
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
            if (!!canPlayType) {
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
            if (!!canPlayType) {
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
            if (!!canPlayType) {
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
            if (!!canPlayType) {
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
            if (!!canPlayType) {
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
            if (!!canPlayType) {
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
     * Feature: Apple HTTP Live Streaming video support (.m3u8 playlist)
     * @public
     * @returns {boolean} has Apple HTTP Live Streaming video support (or not)
     */
    RadiantML.prototype.hlsVideo = function () {
        if (this.video5()) {
            var canPlayType = document.
                createElement('video').
                canPlayType('application/vnd.apple.mpegurl');
            if (!!canPlayType) {
                return true;
            }
        }
        return false;
    };
    /**
     * Feature: Apple HTTP Live Streaming audio support (.m3u playlist)
     * @public
     * @returns {boolean} has Apple HTTP Live Streaming audio support (or not)
     */
    RadiantML.prototype.hlsAudio = function () {
        if (this.audio5()) {
            var canPlayType = document.
                createElement('audio').
                canPlayType('audio/mpegurl');
            if (!!canPlayType) {
                return true;
            }
        }
        return false;
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
        // IE 8,9,10 with ActiveXObject
        var ie = this.isIE();
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

    /*** User agent based detection ***/
    /** OS detection **/
    /**
     * User agent: Mac OS X
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Mac OS X is 
     * detected and Object is an Array holding the version [major, minor, pacth] or 
     * null if not available.
     */
    RadiantML.prototype.isMacOSX = function () {
        var isMacOSX = false;
        var macOSXVersion = null;
        var support = [isMacOSX, macOSXVersion];
        var pattern1 = /(macintosh|mac os)/i;
        if (pattern1.test(this._userAgent) && !this.isIOS()[0]) {
            isMacOSX = true;
            var pattern2 = /mac os x\s(\d+)\_(\d+)\_?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern2);
            if (!!versionArray) {
                macOSXVersion = [
                    parseInt(versionArray[1], 10),
                    parseInt(versionArray[2], 10),
                    parseInt(versionArray[3] || 0, 10)
                ];
            }
            support = [isMacOSX, macOSXVersion];
        }
        return support;
    };
    /**
     * User agent: Windows OS (Desktop, Windows Phone, Surface ... all Windows OS)
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Windows OS is 
     * detected and Object is an Array holding null - see below for Windows OS version.
     */
    RadiantML.prototype.isWindows = function () {
        var pattern = /windows/i;
        return [pattern.test(this._userAgent), null];
    };
    /**
     * User agent: Windows NT OS (Desktop, Surface but not Windows Phone)
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Windows NT OS 
     * is detected and Object is an Array holding the version [major, minor, pacth] or 
     * null if not available.
     */
    RadiantML.prototype.isWindowsNT = function () {
        var isWindowsNT = false;
        var windowsNTVersion = null;
        var support = [isWindowsNT, windowsNTVersion];
        var pattern = /windows nt/i;
        if (pattern.test(this._userAgent)) {
            isWindowsNT = true;
            var pattern = /windows nt\s(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
            if (!!versionArray) {
                windowsNTVersion = [
                    parseInt(versionArray[1], 10),
                    parseInt(versionArray[2], 10),
                    parseInt(versionArray[3] || 0, 10)
                ];
            }
            support = [isWindowsNT, windowsNTVersion];
        }
        return support;
    };
    /**
     * User agent: Windows Phone (7+ only)
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Windows Phone 
     * is detected and Object is an Array holding the version [major, minor, pacth] or 
     * null if not available.
     */
    RadiantML.prototype.isWindowsPhone = function () {
        var isWindowsPhone = false;
        var windowsPhoneVersion = null;
        var support = [isWindowsPhone, windowsPhoneVersion];
        var pattern = /(?=.*windows)(?=.*phone)/i;
        if (pattern.test(this._userAgent)) {
            isWindowsPhone = true;
            var pattern = /windows phone\s(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
            if (!versionArray) {
                pattern = /windows phone os\s(\d+)\.(\d+)\.?(\d+)?/i;
                versionArray = this._userAgent.match(pattern);
            }
            if (!!versionArray) {
                windowsPhoneVersion = [
                    parseInt(versionArray[1], 10),
                    parseInt(versionArray[2], 10),
                    parseInt(versionArray[3] || 0, 10)
                ];
            }
            support = [isWindowsPhone, windowsPhoneVersion];
        }
        return support;
    };
    /**
     * User agent: Linux OS
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Linux OS is 
     * detected and Object is an Array holding null
     */
    RadiantML.prototype.isLinux = function () {
        var pattern = /linux/i;
        return [pattern.test(this._userAgent), null];
    };
    /**
     * User agent: UNIX OS
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if UNIX OS is 
     * detected and Object is an Array holding null
     */
    RadiantML.prototype.isUnix = function () {
        var pattern = /x11/i;
        return [pattern.test(this._userAgent), null];
    };
    /**
     * User agent: Chrome OS
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Chrome OS is 
     * detected and Object is an Array holding null
     */
    RadiantML.prototype.isChromeOS = function () {
        var pattern = /cros/i;
        return [pattern.test(this._userAgent), null];
    };
    /**
     * User agent: iOS
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if iOS 
     * is detected and Object is an Array holding the version [major, minor, pacth] or 
     * null if not available.
     */
    RadiantML.prototype.isIOS = function () {
        var isIOS = false;
        var iOSVersion = null;
        var support = [isIOS, iOSVersion];
        var pattern = /(ipad|iphone|ipod|apple tv)/i;
        if (pattern.test(this._userAgent)) {
            isIOS = true;
            var pattern = /os\s(\d+)_(\d+)_?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
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
     * User agent: Android
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Android 
     * is detected and Object is an Array holding the version [major, minor, pacth] or 
     * null if not available.
     */
    RadiantML.prototype.isAndroid = function () {
        var isAndroid = false;
        var androidVersion = null;
        var support = [isAndroid, androidVersion];
        var pattern = /android/i;
        if (pattern.test(this._userAgent)) {
            isAndroid = true;
            var pattern = /android\s(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
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
     * User agent: BlackBerry OS
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if BlackBerry OS is 
     * detected and Object is an Array holding null
     */
    RadiantML.prototype.isBlackBerryOS = function () {
        var pattern = /(bb10|blackberry|rim tablet)/i;
        return [pattern.test(this._userAgent), null];
    };

    /** Browser detection **/
    /**
     * User agent: Safari browser
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Safari browser
     * is detected and Object is an Array holding the version [major, minor, pacth] or 
     * null if not available.
     */
    RadiantML.prototype.isSafari = function () {
        var isSafari = false;
        var safariVersion = null;
        var support = [isSafari, safariVersion];
        var pattern1 = /safari/i;
        var pattern2 = /chrome/i;
        if (pattern1.test(this._userAgent) &&
            !pattern2.test(this._userAgent) &&
            !this._standalone &&
            !this.isNativeAndroid()[0]) {
            isSafari = true;
            var pattern = /version\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
            if (!!versionArray) {
                safariVersion = [
                    parseInt(versionArray[1], 10),
                    parseInt(versionArray[2], 10),
                    parseInt(versionArray[3] || 0, 10)
                ];
            }
            support = [isSafari, safariVersion];
        }
        return support;
    };
    /**
     * User agent: Chrome browser
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Chrome browser
     * is detected and Object is an Array holding the version [major, minor, pacth] or 
     * null if not available.
     */
    RadiantML.prototype.isChrome = function () {
        var isChrome = false;
        var chromeVersion = null;
        var support = [isChrome, chromeVersion];
        var windowChrome = !!window.chrome;
        // check it is not a WebView
        if (!this.isAndroidChromeWebView() && !this.isNativeAndroid()[0]) {
            if (windowChrome) {
                // Opera returns true on !!window.chrome 
                var pattern = /(opr|opera)/i;
                if (!pattern.test(this._userAgent)) {
                    isChrome = true;
                }
            } else {
                // Chrome iOS specific test
                var pattern = /crios/i;
                if (pattern.test(this._userAgent)) {
                    isChrome = true;
                }
            }
        }
        if (isChrome) {
            var pattern = /chrome\/(\d+)\.(\d+)\.?(\d+)?/i;
            var pattern2 = /crios\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
            if (!versionArray) {
                versionArray = this._userAgent.match(pattern2);
            }
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
     * User agent: Internet Explorer browser (Desktop, mobile ... all IE)
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Internet Explorer 
     * browser is detected and Object is an Array holding the version [major, minor, pacth] or 
     * null if not available.
     */
    RadiantML.prototype.isIE = function () {
        var isIE = false;
        var ieVersion = null;
        var support = [isIE, ieVersion];
        var pattern = /(msie|trident)/i;
        if (pattern.test(this._userAgent) && !this.isIEMobile()[0]) {
            if (window.ActiveXObject !== 'undefined') {
                isIE = true;
                ieVersion = [11, 0, 0];
                if (!document.querySelector)
                    ieVersion = [7, 0, 0];
                if (!document.addEventListener)
                    ieVersion = [8, 0, 0];
                if (!window.atob)
                    ieVersion = [9, 0, 0];
                if (!document.__proto__)
                    ieVersion = [10, 0, 0];
            }
            support = [isIE, ieVersion];
        }
        return support;
    };
    /**
     * User agent: Internet Explorer Mobile browser
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Internet Explorer 
     * Mobile browser is detected and Object is an Array holding the version [major, minor, pacth] 
     * or null if not available.
     */
    RadiantML.prototype.isIEMobile = function () {
        var isIEMobile = false;
        var ieMobileVersion = null;
        var support = [isIEMobile, ieMobileVersion];
        var pattern = /iemobile/i;
        if (pattern.test(this._userAgent)) {
            isIEMobile = true;
            var pattern = /iemobile\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
            if (!!versionArray) {
                ieMobileVersion = [
                    parseInt(versionArray[1], 10),
                    parseInt(versionArray[2], 10),
                    parseInt(versionArray[3] || 0, 10)
                ];
            }
            support = [isIEMobile, ieMobileVersion];
        }
        return support;
    };
    /**
     * User agent: Firefox browser
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Firefox browser 
     * is detected and Object is an Array holding the version [major, minor, pacth] 
     * or null if not available.
     */
    RadiantML.prototype.isFirefox = function () {
        var isFirefox = false;
        var firefoxVersion = null;
        var support = [isFirefox, firefoxVersion];
        var pattern = /firefox/i;
        if (pattern.test(this._userAgent)) {
            isFirefox = true;
            var pattern = /firefox\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
            if (!!versionArray) {
                firefoxVersion = [
                    parseInt(versionArray[1], 10),
                    parseInt(versionArray[2], 10),
                    parseInt(versionArray[3] || 0, 10)
                ];
            }
            support = [isFirefox, firefoxVersion];
        }
        return support;
    };
    /**
     * User agent: Opera (15+ only) browser
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Opera browser 
     * is detected and Object is an Array holding the version [major, minor, pacth] 
     * or null if not available.
     */
    RadiantML.prototype.isOpera = function () {
        var isOpera = false;
        var operaVersion = null;
        var support = [isOpera, operaVersion];
        // includes iOS opera detection
        var pattern = /(opr|opios)/i;
        if (pattern.test(this._userAgent)) {
            isOpera = true;
            var pattern = /opr\/(\d+)\.(\d+)\.?(\d+)?/i;
            var pattern2 = /opios\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray = this._userAgent.match(pattern);
            if (!versionArray) {
                versionArray = this._userAgent.match(pattern2);
            }
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
     * User agent: Opera Mini browser
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Opera Mini browser
     *  is detected and Object is an Array holding null
     */
    RadiantML.prototype.isOperaMini = function () {
        var pattern = /opera mini/i;
        return [pattern.test(this._userAgent), null];
    };
    /**
     * User agent: Native (stock) Android browser
     * @public
     * @returns {Object} an Array as [boolean, Object] where boolean indicates if Native Android 
     * browser is detected and Object is an Array holding null
     */
    RadiantML.prototype.isNativeAndroid = function () {
        var support = [false, null];
        if (this.isAndroid()[0]) {
            var pattern1 = /(?=.*mozilla\/5.0)(?=.*applewebkit)(?=.*android)/i;
            var pattern2 = /chrome/i;
            if (pattern1.test(this._userAgent) && !pattern2.test(this._userAgent)) {
                support[0] = true;
            }
        }
        return support;
    };

    /** WebView detection **/
    /**
     * User agent: iOS standalone mode = <meta name="apple-mobile-web-app-capable" content="yes">
     * @public
     * @returns {boolean} is iOS in standalone mode (or not)
     */
    RadiantML.prototype.isIOSStandalone = function () {
        if (this.isIOS()[0]) {
            var pattern = /safari/i;
            var safari = pattern.test(this._userAgent);
            if (this._standalone && !safari) {
                return true;
            }
        }
        return false;
    };
    /**
     * User agent: iOS WebView
     * @public
     * @returns {boolean} is iOS WebView (or not)
     */
    RadiantML.prototype.isIOSWebView = function () {
        if (this.isIOS()[0]) {
            var pattern = /safari/i;
            var safari = pattern.test(this._userAgent);
            if (!this._standalone && !safari) {
                return true;
            }
        }
        return false;
    };
    /**
     * User agent: Android Chrome WebView
     * @public
     * @returns {boolean} is Android Chrome WebView (or not)
     */
    RadiantML.prototype.isAndroidChromeWebView = function () {
        if (this.isAndroid()[0]) {
            var pattern1 = /version\/(\d+)\.(\d+)/i;
            var webView = pattern1.test(this._userAgent);
            var pattern2 = /chrome/i;
            var chrome = pattern2.test(this._userAgent);
            if (webView && chrome) {
                return true;
            }
        }
        return false;
    };

    /** Additional Device detection **/
    /**
     * User agent: Chromecast 
     * @public
     * @returns {boolean} is Chromecast (or not)
     */
    RadiantML.prototype.isChromecast = function () {
        var pattern = /crkey/i;
        return pattern.test(this._userAgent);
    };
    /**
     * User agent: iPhone 
     * @public
     * @returns {boolean} is iPhone (or not)
     */
    RadiantML.prototype.isIphone = function () {
        var pattern = /(iphone|ipod)/i;
        return pattern.test(this._userAgent);
    };
    /**
     * User agent: iPad 
     * @public
     * @returns {boolean} is iPad (or not)
     */
    RadiantML.prototype.isIpad = function () {
        var pattern = /ipad/i;
        return pattern.test(this._userAgent);
    };
    /**
     * User agent: Apple TV 
     * @public
     * @returns {boolean} is Apple TV  (or not)
     */
    RadiantML.prototype.isAppleTV = function () {
        var pattern = /apple tv/i;
        return pattern.test(this._userAgent);
    };

    /** Hybrid  detection **/
    /**
     * Hybrid detection: Apple HTTP Live Streaming video support - real world conditions (.m3u8)
     * @public
     * @returns {boolean} has Apple HTTP Live Streaming video support - real world conditions (or not)
     */
    RadiantML.prototype.safeHLSVideo = function () {
        if (this.video5()) {
            var isAndroid = this.isAndroid();
            if (this.isIOS()[0] ||
                (isAndroid[0] && isAndroid[1][0] >= 4) ||
                this.hlsVideo()) {
                return true;
            }
        }
        return false;
    };
    /**
     * Hybrid detection: Apple HTTP Live Streaming audio support - real world conditions (.m3u8)
     * @public
     * @returns {boolean} has Apple HTTP Live Streaming audio support - real world conditions (or not)
     */
    RadiantML.prototype.safeHLSAudio = function () {
        if (this.audio5()) {
            var isAndroid = this.isAndroid();
            if (this.isIOS()[0] ||
                (isAndroid[0] && isAndroid[1][0] >= 4) ||
                this.hlsAudio()) {
                return true;
            }
        }
        return false;
    };
    /**
     * Hybrid detection: MPEG-DASH DASH264 video support - real world conditions (.mpd)
     * @public
     * @returns {boolean} has MPEG-DASH DASH264 video support - real world conditions (or not)
     */
    RadiantML.prototype.safeDASH264 = function () {
        if (this.video5()) {
            // MPEG-DASH is crancky on OS X 10.10 => no go
            if (this.isMacOSX()[0] && this.isSafari()[0]) {
                return false;
            }
            // MPEG-DASH is ok on Android 4.2 and above
            var isAndroid = this.isAndroid();
            if (isAndroid[0] && isAndroid[1][0] >= 4 && isAndroid[1][1] >= 2) {
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
     * Hybrid detection: MPEG-DASH WebM Dash video support - real world conditions (.mpd)
     * @public
     * @returns {boolean} has MPEG-DASH WebM Dash video support - real world conditions (or not)
     */
    RadiantML.prototype.safeWebMDASH = function () {
        if (this.video5()) {
            if (this.mse() && (this.webmVP9Opus() || this.webmVP8Vorbis())) {
                return true;
            }
        }
        return false;
    };


    return RadiantML;

})();