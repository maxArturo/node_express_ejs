module.exports = function(grunt) {
  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
    env: {
      dev: {
        NODE_ENV: 'DEVELOPMENT'
      },
      prod: {
        NODE_ENV: 'PRODUCTION'
      }
    },
    clean: {
      // clean folders built from src folder
      public: [
        'public/data/*', '!public/data/*.gitignore',
        'public/fonts/*', '!public/fonts/*.gitignore',
        'public/images/*', '!public/images/*.gitignore',
        'public/javascripts/*', '!public/javascripts/*.gitignore',
        'public/stylesheets/*', '!public/stylesheets/*.gitignore',
        'public/views/*', '!public/views/*.gitignore'
      ],
      // clean dependencies from node_modules folder
      nodeModules: ['node_modules/**/*']
    },
    copy: {
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
      // copy image files (TODO: imagemin with optimizationLevel 3)
      images: {
        cwd: 'src/images',
        src: '**/*',
        dest: 'public/images',
        expand: true
      }
    },
    preprocess: {
      // preprocess view ejs files based on env
      views: {
        files: {
          'public/views/templates/footer.ejs': 'src/views/templates/footer.ejs',
          'public/views/templates/header.ejs': 'src/views/templates/header.ejs',
          'public/views/about.ejs': 'src/views/about.ejs',
          'public/views/browserify_test.ejs': 'src/views/browserify_test.ejs',
          'public/views/error.ejs': 'src/views/error.ejs',
          'public/views/index.ejs': 'src/views/index.ejs'
        }
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded',
          sourcemap: false
        },
        files: {
          'public/stylesheets/app.css': 'src/stylesheets/app.scss'
        }
      },
      prod: {
        options: {
          outputStyle: 'compressed',
          sourcemap: false
        },
        files: {
          'public/stylesheets/app.<%= pkg.version %>.min.css': [
            'src/stylesheets/app.scss'
          ]
        }
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
    jshint: {
      all: ['Gruntfile.js','src/javascripts/**/*.js','routes/*.js'],
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
          'public/javascripts/views/browserify_test.js': [
            'src/javascripts/views/browserify_test.js'
          ]
        }
      }
    },
    uglify: {
      // uglify js with pkg.version in file names for cache busting in prod env
      options: {
        banner: '<%= banner %>',
        compress: {
          drop_console: true
        }
      },
      prod: {
        files: {
          'public/javascripts/app.<%= pkg.version %>.min.js': [
            'public/javascripts/app.js'
          ],
          'public/javascripts/views/browserify_test.<%= pkg.version %>.min.js': [
            'public/javascripts/views/browserify_test.js'
          ]
        }
      }
    },
    watch: {
      // various watch tasks to handle changes in src folder in dev env
      viewsEJS: {
        files: ['src/views/**/*.ejs'],
        tasks: ['preprocess:views']
      },
      baseCSS: {
        files: ['src/stylesheets/**/*.scss'],
        tasks: ['sass:dev']
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
        // reload browser when these files change
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
          'express:dev'
        ],
        options: {
          spawn: false,
          atBegin: true
        }
      }
    },
    parallel: {
      // kick off server and watch tasks together in dev env
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
      // server for dev env
      options: {
        port: 8080
      },
      dev: {
        options: {
          script: 'bin/www'
        }
      }
    },
    open: {
      // open the browser in dev env
      dev: {
        url: 'http://localhost:<%= express.options.port%>'
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-open');

  // task configurations
  grunt.registerTask('default', ['env:dev','clean:public','copy',
    'preprocess:views','sass:dev','concat','jshint:all','jscs:all','browserify',
    'open:dev','parallel:dev'
  ]);
  grunt.registerTask('prod', ['env:prod','clean:public','copy',
    'preprocess:views','sass:prod','concat','browserify','uglify:prod'
  ]);
  grunt.registerTask('resetPublic', ['clean:public']);
  grunt.registerTask('resetNodeModules', ['clean:nodeModules']);
};
