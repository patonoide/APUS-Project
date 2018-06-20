module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");




    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js']
        },
        watch:{

            files: ['Gruntfile.js'],
            tasks: ['jshint']

        }
    });
};
