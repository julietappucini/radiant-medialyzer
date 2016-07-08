# Radiant MediaLyzer 2
Home Page: [http://www.radiantmedialyzer.net](http://www.radiantmedialyzer.net)

Radiant MediaLyzer is a JavaScript API to detect media features for web-based
environnements. It includes feature detection for Media Source Extensions, 
Apple HLS, common video/audio codecs, HTML5 media elements, Web Audio API and more.

Radiant MediaLyzer is an open source project released under
[MIT license](http://www.radiantmedialyzer.net/license.html). Parts of it are used in production 
with [Radiant Media Player](https://www.radiantmediaplayer.com).

Radiant MediaLyzer is provided as an ES2015 JavaScript class. This class would need to be 
imported into your project to start query to Radiant MediaLyzer API. It can be compiled 
to ES5 JavaScript with [Babel](https://babeljs.io/) and [Browserify](http://browserify.org/#install). 
See the app folder for an example. Jasmine unit test are provided.

## Get the latest package

#### GitHub

[Download latest release](https://github.com/arnaudleyder/radiant-medialyzer/releases)

#### NPM

`npm install radiant-medialyzer`

#### For developers

You must have the following cli (command line) tools installed:

- grunt
- jshint
- browserify
- watchify (optional but will really make your life easier)

Once you have retrieved the package go to the root of the project 
(with install from npm that would be in node_modules/radiant-medialyzer). Then type `npm install` to install the devDependencies.

Once done to compile type: `grunt`

To develop (requires watchify) type: `grunt concurrent`

If you modify the src/rml-class.js file make sure to run jshint and tests at test/SpecRunner.html (add your tests at test/spec/rml-spec-es6.js)

Contributions are welcome.

## Quick start guide

Include Radiant MediaLyzer JavaScript file:

```
// This is required for compilation to ES5
import 'core-js/es6';
// We import our RadiantML class
import {RadiantML} from '../../src/rml-class';
(() => {
  'use strict';
  // We create an instance of the RadiantML class
  const rml = new RadiantML();
  // We start making calls to the API
  console.log(rml.video5());
  console.log(rml.mp4H264AAC('main', 4.0));
})();
```

## Complete documentation

[http://www.radiantmedialyzer.net/documentation.html]
(http://www.radiantmedialyzer.net/documentation.html)

## Test your device media capabilities 
Go to [http://www.radiantmedialyzer.net](http://www.radiantmedialyzer.net) and see what is green!