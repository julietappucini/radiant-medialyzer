module.exports = function (grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      es6: {
        files: [
          'src/rml-class.js',
          'app/js/rml-app-es6.js',
          'test/spec/rml-spec-es6.js'
        ],
        tasks: ['shell:jshint']
      },
      less: {
        files: [
          'site/css/rml-theme.less'
        ],
        tasks: ['less']
      }
    },
    less: {
      production: {
        options: {
          compress: true,
          lint: true,
          ieCompat: false
        },
        files: {
          'site/css/rml-theme.<%= pkg.version %>.min.css': 'site/css/rml-theme.less'
        }
      }
    },
    replace: {
      versionLib: {
        src: [
          'src/rml-class.js',
          'app/js/rml-app-es6.js',
          'test/spec/rml-spec-es6.js'
        ],
        overwrite: true,
        replacements: [
          {
            from: /Radiant MediaLyzer\s+\d+\.\d+\.\d+/,
            to: 'Radiant MediaLyzer <%= pkg.version %>'
          },
          {
            from: /this\.version\s+=\s+'\d+\.\d+\.\d+'/,
            to: 'this.version = \'<%= pkg.version %>\''
          }
        ]
      },
      versionSite: {
        src: [
          'site/*.html'
        ],
        overwrite: true,
        replacements: [
          {
            from: /css\/rml-theme\.\d+\.\d+\.\d+\.min\.css/,
            to: 'css/rml-theme.<%= pkg.version %>.min.css'
          },
          {
            from: />\d+\.\d+\.\d+<\/a>/,
            to: '><%= pkg.version %></a>'
          }
        ]
      }
    },
    shell: {
      jshint: {
        command: 'jshint Gruntfile.js src/rml-class.js app/js/rml-app-es6.js test/spec/rml-spec-es6.js'
      },
      browserify: {
        command: 'browserify app/js/rml-app-es6.js -o app/js/rml-app.js -t [ babelify ] -v'
      },
      browserifyTest: {
        command: 'browserify test/spec/rml-spec-es6.js -o test/spec/rml-spec.js -t [ babelify ] -v'
      },
      watchify: {
        command: 'watchify app/js/rml-app-es6.js -o app/js/rml-app.js -t [ babelify ] -v'
      },
      watchifyTest: {
        command: 'watchify test/spec/rml-spec-es6.js -o test/spec/rml-spec.js -t [ babelify ] -v'
      }
    },
    copy: {
      main: {
        files: [
          {
            src: [
              'app/js/rml-app.js',
            ],
            dest: 'site/js/rml-app.js',
            filter: 'isFile'
          }
        ]
      }
    },
    concurrent: {
      dev: ['watch:es6', 'shell:watchify', 'shell:watchifyTest'],
      options: {
        logConcurrentOutput: true
      }
    }
  });
  // Default task(s).
  grunt.registerTask('default', [
    'shell:jshint',
    'replace:versionLib',
    'shell:browserify',
    'shell:browserifyTest'
  ]);
  grunt.registerTask('site', [
    'shell:jshint',
    'replace:versionLib',
    'shell:browserify',
    'shell:browserifyTest',
    'less',
    'replace:versionSite',
    'copy'
  ]);
};