// Configuration for Usemin task(s)
// Reads base template for usemin blocks to enable smart builds that automatically
// concat and minify files.
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('useminPrepare', {
    html: '<%= yeogurt.tmp %>/index.html',
    options: {
      root: '<%= yeogurt.client %>',
      dest: '<%= yeogurt.dist %>/client'
    }
  });

  grunt.config.set('usemin', {
    html: '<%= yeogurt.dist %>/client/*.html',
    css: ['<%= yeogurt.dist %>/client/styles/**/*.css'],
    options: {
      assetsDirs: ['<%= yeogurt.client %>', '<%= yeogurt.client %>/images']
    }
  });

};

module.exports = taskConfig;
