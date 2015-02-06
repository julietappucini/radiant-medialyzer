# Radiant MediaLyzer
Home Page: [http://www.radiantmedialyzer.net](http://www.radiantmedialyzer.net)

Radiant MediaLyzer is a JavaScript API to detect media features for web-based 
environnements.

It includes feature detection for MPEG-DASH, Apple HLS, 
common video/audio codecs, HTML5 media elements, Web Audio API and more. 

It will come in handy for any media oriented front-end JavaScript development. 

Radiant MediaLyzer is an open source project released under 
[MIT license](http://www.radiantmedialyzer.net/license.html) 
and sponsored by [Radiant Media Player](https://www.radiantmediaplayer.com) a 
versatile HTML5 video player with support for live and on-demand streaming, 
MPEG-DASH, video ads, call to actions and more.

Included features:
* Media features detection for 34 media related features
* Built with pure JavaScript (no dependency) and a pseudo-class model for 
easier works of extension
* Works on most devices of the current market from mobile phones to TVs
* Error resilience
* Complete [documentation](http://www.radiantmedialyzer.net/documentation.html) 
with JSDoc 3 commented sources
* Available on jsDelivr CDN or self-hosted
* Available on bower: `bower install radiant-medialyzer`
* Pick the whole library or browse the source code to get the function you need
* Pick the whole library or browse the source code to get the function you need
* Lightweight: only 8 kB minified (2kB gzipped)

## Complete documentation

[http://www.radiantmedialyzer.net/documentation.html]
(http://www.radiantmedialyzer.net/documentation.html)

## Install 

#### Bower 

`bower install radiant-medialyzer`

#### GitHub 

Checkout sources or download ZIP package from GitHub

#### jsDelivr 

```<script src="//cdn.jsdelivr.net/radiant-medialyzer/1.2.0/rml.min.js"></script>```

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
rml.dash264();
rml.getUserMedia();
```
Do something with the result:

```javascript
var dash264 = rml.dash264();
if (dash264) {
    // we have DASH264 support do something
} else {
    // No go for DASH264 do something different 
}
```
Done! :bowtie:
