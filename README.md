# Radiant MediaLyzer ![GitHub Logo](https://www.radiantmediaplayer.com/images/radiantmedialyzer-github-320.png)

Home Page: [http://www.radiantmedialyzer.net](http://www.radiantmedialyzer.net)

Radiant MediaLyzer is a JavaScript API to detect media features for web-based environnements.
It includes complimentary RegExp user agent string parsing to better fit real-world conditions (OS, browser, WebView with version number).
It will come in handy for any media oriented front-end JavaScript development. 

Radiant MediaLyzer is an open source project released under <a href="http://www.radiantmedialyzer.net/license.html">MIT license</a> and sponsored by [Radiant Media Player](https://www.radiantmediaplayer.com) a versatile HTML5 video player with support for live and on-demand streaming, MPEG-DASH, video ads, call to actions and more.

It features:
* Media features detection with complimentary user agent string parsing for fine tuning
* Feature detection for 29 media related features
* User agent string parsing for OS, browser, WebView and specific devices (with version number)
* Built with pure JavaScript (no dependency) and a pseudo-class model for easier works of extension
* Built with JavaScript pseudo class model (prototype) for easier works of extension
* Regular expressions are used to match/test user agent strings for faster results
* Works on most devices of the current market from mobile phones to TVs
* Error resilience
* Complete documentation with JSDoc 3 commented sources
* Pick the whole library or browse the source code to get the function you need
* Lightweight: only 10 kB minified (2.2kB gzipped)

## Complete documentation
<a href="http://www.radiantmedialyzer.net/documentation.html">http://www.radiantmedialyzer.net/documentation.html</a>

## Install 

#### Bower 

`bower install magneticmediajs`

#### GitHub 

Checkout sources or download ZIP package from GitHub

## Quick start guide

Include Radiant MediaLyzer JavaScript file:

```<script src="js/radiantmedialyzer.min.js"></script>```

Create a new instance:

```javascript
var rml = new RadiantML();
```
Start making calls to the API:

```javascript
rml.mp4H264AAC();
rml.safeDASH264();
rml.isIOS();
```
Do something with the result:

```javascript
var dash264 = rml.safeDASH264();
if (dash264) {
    // we have DASH264 support do something
} else {
    // No go for DASH264 do something different 
}
```
Done! :bowtie:



