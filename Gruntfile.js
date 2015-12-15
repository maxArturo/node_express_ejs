module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      // copy base css
      baseCSS: {
        files: {
          'public/stylesheets/base.css': 'application/stylesheets/base.css',
          'public/stylesheets/bootstrap.min.css': 'node_modules/bootstrap/dist/css/bootstrap.min.css'
        }
      }
    },
    browserify: {
      //copy base js
      'public/javascripts/base.js': ['application/javascripts/base.js'],
      // copy view specific js
      'public/javascripts/browserify_test.js': ['application/javascripts/browserify_test.js']
    },
    watch: {
      baseCSS: {
        files: ["application/**/*.css"],
        tasks: ["copy:baseCSS"]
      },
      browserifyScrpits: {
        files: ["application/**/*.js"],
        tasks: ["browserify"]
      },
      lintExpressRoutes: {
        files: ["routes/*.js"],
        tasks: ["jshint:lintRoutes"]
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      lintRoutes: ["routes/*.js"]
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-jscs");

  // default tasks
  grunt.registerTask('default', ['copy','browserify','watch']);

};