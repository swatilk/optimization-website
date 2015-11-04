'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

  // Load grunt tasks

require('load-grunt-tasks')(grunt);

// Grunt configuration
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  clean: {
        dev: {
          src: ['dist']
        },
  },
  uglify: {
      my_target: {
        files: [{
            expand: true,
            cwd: 'js',
            src: '**/*.js',
            dest: 'dist/js',
            ext: '.min.js'
        }]
      }
  },
  cssmin: {
    target: {
      files: [{
        expand: true,
        cwd: 'css',
        src: ['*.css'],
        dest: 'dist/css',
        ext: '.min.css'
      }]
    }
  },
  imagemin: {
    dynamic: {
      options: {
      optimizationLevel: 4,
      progressive: true,
      cache: false
    },
      files: [{
        expand: true,
        src: ['**/*.{jpg,gif,png}'],
        cwd:'img/',
        dest: 'dist/minImg'
     }]
    }
  },
  responsive_images: {
    dev: {
      options: {
          engine: 'im',
          sizes: [{
            width: '10%',
            suffix: "_small",
            quality: 30
          },{
            suffix: "_medium",
            width: '25%',
            quality: 40
          },{
            suffix: "_large",
            width: '45%',
            quality: 65
          }]
      },
      files: [{
        expand: true,
        src: ['views/images/*.{jpg,gif,png}'],
        dest: 'dist/responsive_images/'
      }]
    }
  },
  pagespeed: {
    options: {
      nokey: true,
      locale: "en_GB",
      threshold: 20
    },
    local: {
      options: {
        strategy: "desktop"
      }
    },
    mobile: {
      options: {
        strategy: "mobile"
      }
    }
  }
});

  // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 8080;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  // Register default tasks
  grunt.registerTask('default', ['clean','imagemin', 'uglify','cssmin','responsive_images', 'psi-ngrok']);
}



