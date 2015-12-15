module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    watch: {
      media: {
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jscs");

  // default tasks
  grunt.registerTask('default', ['watch']);

};