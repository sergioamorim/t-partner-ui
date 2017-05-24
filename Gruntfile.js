module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },
    bower_concat: {
      all: {
        dest: {
          'js': 'build/_bower.js',
          'css': 'build/_bower.css'
        },
        exclude: [],
        bowerOptions: {
          relative: false
        }
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
    
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', ['uglify', 'bower_concat']);

};