module.exports = function(grunt) {
  var globalConfig = {
    src: 'src',
    dest: 'dist'
  };

  // load all packages matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    globalConfig: globalConfig,

    execute: {
      build_page: {
        options: {
          args: ['page']
        },
        src: ['./scripts/index.js']
      },
      build_permalink: {
        options: {
          args: ['permalink']
        },
        src: ['./scripts/index.js']
      }
    },

    clean: {
      build: ['build'],
      dist: ['dist']
    },

    copy: {
      build: {
        expand: true,
        cwd: 'src/',
        src: ['images/**', 'js/**'],
        dest: 'build/',
      },
      dist: {
        expand: true,
        cwd: 'src/',
        src: ['images/**', 'js/**'],
        dest: 'dist/',
      }
    },

    sass: {
      options: {
        sourcemap: 'none'
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: 'theme.scss',
          dest: 'build/css',
          ext: '.css'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: 'theme.scss',
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({ browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 5%'] }),
          require('cssnano')()
        ]
      },
      build: {
        src: 'build/css/theme.css'
      },
      dist: {
        src: 'dist/css/theme.css'
      }
    },

    watch: {
      serve: {
        files: ['src/*'],
        tasks: ['build:page'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // By default, running `grunt` renders the frontpage.
  grunt.registerTask('default', ['build:page']);

  // Renders theme.html into a sample content of your choice.
  //
  // arg1: can be either `page` or `permalink`
  grunt.registerTask('build', 'Renders `theme.html` into a sample content.', function(arg1) {
    if (arguments.length === 0) {
      grunt.fail.warn('No arguments set.', 3);
    } else {
      switch (arg1) {
        case 'page':
          grunt.task.run(['clean:build', 'sass:build', 'postcss:build', 'copy:build', 'execute:build_page']);
          break;
        case 'permalink':
          grunt.task.run(['clean:build', 'sass:build', 'postcss:build', 'copy:build', 'execute:build_permalink']);
          break;
        default:
          grunt.fail.warn('Invalid argument specified for `build`.', 3);
          break;
      }
    }
  });

  grunt.registerTask('dist', ['clean:dist', 'sass:dist', 'postcss:dist', 'copy:dist']);
};
