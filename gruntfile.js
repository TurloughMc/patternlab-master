module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-shell');
	grunt.initConfig ({
		uglify: {
			my_target: {
				files: {
					'js/bootstrap.min.js': ['Bootstrap_components/javascripts/bootstrap/affix.js']
				} // files
			} // my_target

		}, // uglify
		compass: {
			dev: {
				options: {
					config: 'config.rb'
				} //options
			} //dev
		}, //compass
        // Rebuilds our Pattern Lab site if a template file has changed.
        shell: {
            patternlab: {
                command: "php core/builder.php -pg"
            }
        },
		watch: {
			options: { livereload: true },
			scripts: {
				files: ['Bootstrap_components/javascripts/*.js'],
				tasks: ['uglify']
			}, // scripts
			sass: {
				files: ['source/css/**/*.{scss,sass}'],
				tasks: ['compass:dev']
			}, //sass
			html: {
				files: ['*.html']
			},
            // Keep an eye on the Pattern Lab pattern templates...
            patterns: {
                files: [
                    'source/_patterns/**/*.mustache',
                    'source/_patterns/**/*.json',
                    'source/_data/*.json'
                ],
                tasks: [ 'shell:patternlab' ],
                options: {
                    spawn: false,
                    livereload: true
                }
            } // patterns
		} // watch
	}) // initConfig
	grunt.registerTask('default', 'watch')
} // exports