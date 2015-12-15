module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'public/javascripts/application.js': ['application/js_include_test.js']
    },
    watch: {
      browserifyAppScrpits: {
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-jscs");

  // default tasks
  grunt.registerTask('default', ['browserify','watch']);

};