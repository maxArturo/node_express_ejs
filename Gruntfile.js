module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      // clean public sub-folders
      data: ['public/data/*', '!public/data/*.gitignore'],
      images: ['public/images/*', '!public/images/*.gitignore'],
      javascripts: ['public/javascripts/*', '!public/javascripts/*.gitignore'],
      stylesheets: ['public/stylesheets/*', '!public/stylesheets/*.gitignore']
    },
    copy: {
      // copy base css
      // TODO: SASS
      baseCSS: {
        files: {
          'public/stylesheets/app.css': 'application/stylesheets/app.css'
        }
      },
      // copy vendor css
      vendorCSS: {
        files: {
          'public/stylesheets/vendor/bootstrap.min.css': 'node_modules/bootstrap/dist/css/bootstrap.min.css'
        }
      },
      // copy data files
      data: {
        cwd: 'application/data',
        src: '**/*',
        dest: 'public/data',
        expand: true
      },
      // copy image files
      images: {
        cwd: 'application/images',
        src: '**/*',
        dest: 'public/images',
        expand: true
      }
    },
    browserify: {
      // generate base js
      baseJS: {
        files: {
          'public/javascripts/app.js': ['application/javascripts/app.js']
        }
      },
      // generate view specific js
      viewsJS: {
        files: {
          'public/javascripts/views/browserify_test.js': ['application/javascripts/views/browserify_test.js']
        }
      }
    },
    jshint: {
      all: ['application/javascripts/**/*.js','routes/*.js'],
      base: ['application/javascripts/app.js'],
      views: ['application/javascripts/views/*.js'],
      routes: ['routes/*.js']
    },
    jscs: {
      all: ['application/javascripts/**/*.js','routes/*.js'],
      base: ['application/javascripts/app.js'],
      views: ['application/javascripts/views/*.js'],
      routes: ['routes/*.js']
    },
    watch: {
      baseCSS: { // TODO: SASS
        files: ['application/stylesheets/app.css'],
        tasks: ['copy:baseCSS']
      },
      baseJS: {
        files: ['application/javascripts/app.js'],
        tasks: ['jshint:base','jscs:base','browserify:baseJS']
      },
      viewsJS: {
        files: ['application/javascripts/views/*.js'],
        tasks: ['jshint:views','jscs:views','browserify:viewsJS']
      },
      routesJS: {
        files: ['routes/*.js'],
        tasks: ['jshint:routes','jscs:routes']
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify'); // TODO

  // default task
  grunt.registerTask('default', ['clean','copy','jshint:all','jscs:all','browserify','watch']);

  // other tasks
  grunt.registerTask('reset', ['clean']);
  grunt.registerTask('deploy', ['clean','copy','browserify']);

};