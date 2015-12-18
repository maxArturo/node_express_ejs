module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      // clean public sub-folders
      data: ['public/data/*', '!public/data/*.gitignore'],
      fonts: ['public/fonts/*', '!public/fonts/*.gitignore'],
      images: ['public/images/*', '!public/images/*.gitignore'],
      javascripts: ['public/javascripts/*', '!public/javascripts/*.gitignore'],
      stylesheets: ['public/stylesheets/*', '!public/stylesheets/*.gitignore']
    },
    copy: {
      // copy base css
      // TODO: SASS
      baseCSS: {
        files: {
          'public/stylesheets/app.css': 'src/stylesheets/app.css'
        },
      },
      // copy data files
      data: {
        cwd: 'src/data',
        src: '**/*',
        dest: 'public/data',
        expand: true
      },
      // copy font files (required by font-awesome)
      fonts: {
        cwd: 'node_modules/font-awesome/fonts',
        src: '*',
        dest: 'public/fonts',
        expand: true
      },
      // copy image files
      images: {
        cwd: 'src/images',
        src: '**/*',
        dest: 'public/images',
        expand: true
      }
    },
    concat: {
      options: {
        seperator: '\n\n'
      },
      // concatenate vendor css
      vendorCSS: {
        src: [
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/font-awesome/css/font-awesome.min.css'
        ],
        dest: 'public/stylesheets/vendor.min.css'
      }
    },
    browserify: {
      // generate base js
      baseJS: {
        files: {
          'public/javascripts/app.js': ['src/javascripts/app.js']
        }
      },
      // generate view specific js
      viewsJS: {
        files: {
          'public/javascripts/views/browserify_test.js': ['src/javascripts/views/browserify_test.js']
        }
      }
    },
    jshint: {
      all: ['src/javascripts/**/*.js','routes/*.js'],
      base: ['src/javascripts/app.js'],
      views: ['src/javascripts/views/*.js'],
      routes: ['routes/*.js']
    },
    jscs: {
      all: ['src/javascripts/**/*.js','routes/*.js'],
      base: ['src/javascripts/app.js'],
      views: ['src/javascripts/views/*.js'],
      routes: ['routes/*.js']
    },
    watch: {
      baseCSS: { // TODO: SASS
        files: ['src/stylesheets/app.css'],
        tasks: ['copy:baseCSS']
      },
      baseJS: {
        files: ['src/javascripts/app.js'],
        tasks: ['jshint:base','jscs:base','browserify:baseJS']
      },
      viewsJS: {
        files: ['src/javascripts/views/*.js'],
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify'); // TODO

  // task configurations
  grunt.registerTask('default', ['clean','copy','concat','jshint:all','jscs:all','browserify','watch']);
  grunt.registerTask('reset', ['clean']);
  grunt.registerTask('deploy', ['clean','copy','concat','browserify']);

};
