# Radiant MediaLyzer
Home Page: [http://www.radiantmedialyzer.net](http://www.radiantmedialyzer.net)

Radiant MediaLyzer is a JavaScript API to detect media features for web-based
environnements. It includes feature detection for Media Source Extensions, 
Apple HLS, common video/audio codecs, HTML5 media elements, Web Audio API and more.

Radiant MediaLyzer is an open source project released under
[MIT license](http://www.radiantmedialyzer.net/license.html)
and sponsored by [Radiant Media Player](https://www.radiantmediaplayer.com) an 
HTML5-first video player with MPEG-DASH, HLS & Wowza support, HTML5 video ads and 
an advanced Flash fallback.

Included features:
* Media features detection for over 30 media related features
* Built with vanilla JavaScript (no dependency)
* Jasmine unit tested and JSHint compliant
* Works on most devices of the current market from mobile phones to TVs
* Error resilience
* Complete [documentation](http://www.radiantmedialyzer.net/documentation.html)
with JSDoc 3 commented sources
* Available on jsDelivr CDN or self-hosted
* Available on bower: `bower install radiant-medialyzer`
* Pick the whole library or browse the source code to get the function you need
* Lightweight: only 4 kB minified

## Complete documentation

[http://www.radiantmedialyzer.net/documentation.html]
(http://www.radiantmedialyzer.net/documentation.html)

## Install

#### Bower

`bower install radiant-medialyzer`

#### GitHub

Checkout sources or download ZIP package from GitHub

#### jsDelivr

```<script src="//cdn.jsdelivr.net/radiant-medialyzer/1.2.4/rml.min.js"></script>```

## Quick start guide

Include Radiant MediaLyzer JavaScript file:

```<script src="js/rml.min.js"></script>```

Create a new instance:

```javascript
var rml = new RadiantML();
```
Start making calls to the API:

```javascript
rml.mp4H264AAC();
rml.mse();
rml.getUserMedia();
```
Do something with the result:

```javascript
var mse = rml.mse();
var mp4H264AAC = rml.mp4H264AAC('high40');
var m4aHEAACv2 = rml.m4aHEAACv2();
if (mse && mp4H264AAC && m4aHEAACv2) {
    // we could have DASH264 support do something
} else {
    // No go for DASH264 do something different
}
```
Done! :bowtie:

## Contributors

Thanks to @jcready for various code optimization
