module.exports = function (grunt) {
  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env : {
      dev: {
        NODE_ENV : 'DEVELOPMENT'
      },
      prod : {
        NODE_ENV : 'PRODUCTION'
      }
    },
    clean: {
      // clean folders built from src folder on build
      data: ['public/data/*', '!public/data/*.gitignore'],
      fonts: ['public/fonts/*', '!public/fonts/*.gitignore'],
      images: ['public/images/*', '!public/images/*.gitignore'],
      javascripts: ['public/javascripts/*', '!public/javascripts/*.gitignore'],
      stylesheets: ['public/stylesheets/*', '!public/stylesheets/*.gitignore'],
      views: ['views/*', '!views/*.gitignore']
    },
    preprocess: {
      // preprocess view ejs files based on env
      views: {
        files : {
          'views/templates/footer.ejs': 'src/views/templates/footer.ejs',
          'views/templates/header.ejs': 'src/views/templates/header.ejs',
          'views/about.ejs': 'src/views/about.ejs',
          'views/browserify_test.ejs': 'src/views/browserify_test.ejs',
          'views/error.ejs': 'src/views/error.ejs',
          'views/index.ejs': 'src/views/index.ejs'
        }
      }
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
      // various watch tasks to handle changes in src folder during dev
      viewsEJS: {
        files: ['src/views/**/*.ejs'],
        tasks: ['preprocess:views']
      },
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
      },
      frontend: {
        // reload in browser when these files change
        files: [
          'views/**/*.ejs',
          'public/stylesheets/**/*.css',
          'public/javascripts/**/*.js'
        ],
        options: {
          livereload: true
        }
      },
      backend: {
        files: [
          // restart server when these files change
          'app.js',
          'routes/**/*.js'
        ],
        tasks: [
          'express:web'
        ],
        options: {
          spawn: false,
          atBegin: true
        }
      }
    },
    parallel: {
      // kick off dev server and watch tasks together
      dev: {
        options: {
          stream: true
        },
        tasks: [
          {
            grunt: true,
            args: ['watch:viewsEJS']
          },
          {
            grunt: true,
            args: ['watch:baseCSS']
          },
          {
            grunt: true,
            args: ['watch:baseJS']
          },
          {
            grunt: true,
            args: ['watch:viewsJS']
          },
          {
            grunt: true,
            args: ['watch:routesJS']
          },
          {
            grunt: true,
            args: ['watch:frontend']
          },
          {
            grunt: true,
            args: ['watch:backend']
          }
        ]
      }
    },
    express: {
      // dev server
      options: {
        port: 8080
      },
      web: {
        options: {
          script: 'bin/www'
        }
      }
    },
    open: {
      dev: {
        url: 'http://localhost:<%= express.options.port%>'
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-uglify'); // TODO

  // task configurations
  grunt.registerTask('default', ['env:dev','clean','preprocess:views','copy','concat','jshint:all','jscs:all','browserify','open','parallel:dev']);
  grunt.registerTask('prod', ['env:prod','clean','preprocess:views','copy','concat','browserify']);
  grunt.registerTask('reset', ['clean']);
};