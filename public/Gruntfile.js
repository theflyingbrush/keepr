module.exports = function(grunt){
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-m-dd") %> */\n',
				compress: true
			},
			mangle:	{	cwd: "src/",
						src: 'js/*.js',
						dest: 'tmp/',
						ext: ".min.js",
						expand: true
			},
			setup: {
				files: [{
					src: "bower_components/modernizr/modernizr.js",
					dest: "js/modernizr.min.js"
				}]
			}	
		},
		coffee: {
			build: {
				cwd: "src/",
				files:[
					{expand: true, cwd:"src/coffee", src:["*.coffee"], dest:"src/js", ext:".js", filter:'isFile'}
				]
			}
		},
		copy: {
			src: {
				files:[
					
					{expand: true, src:['tmp/css/*.min.css'], flatten:true, dest:'css', filter:'isFile'},
					{expand: true, src:['tmp/js/*.c.min.js'], flatten:true, dest:'js', filter:'isFile'}
				]
			},
			setup: {
				files: [
					{expand: true, src:'bower_components/bootstrap/dist/css/bootstrap.min.css', flatten:true, dest:'css', filter:'isFile'},
					{expand: true, src:'bower_components/bootstrap/dist/js/bootstrap.min.js', flatten:true, dest:'js', filter:'isFile'},
					{expand: true, src:'bower_components/bootstrap/fonts/**', flatten:true, dest:'fonts', filter:'isFile'},
					{expand: true, src:'bower_components/jquery/jquery.min.js', flatten:true, dest:'js', filter:'isFile'},
				]
			}
		},
		concat: {
			plugins: {
				src:"src/plugins/*.js",
				dest:"js/plugins.js"
			},
			js: {
				src:"tmp/js/*.min.js",
				dest:"js/main.c.min.js"
			}
		},

		less: {
			options: {
				paths: ["less"],
				compress: true
			},
			dynamic_mappings: {
				files: [{
					cwd: "less",
					src: "*.less",
					dest: "tmp/css",
					ext: ".min.css",
					expand: true
				}]
			}
		},
		watch: {
			options: {
				livereload: true
			},
			all: {
				files: ['less/*.less', 'less/mixins/*.less', 'src/coffee/*.coffee'],
				tasks: ['build']
			}
		},
		clean: {
			all:["tmp", "css", "js"],
			tmp:["tmp"]
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('setup', ['clean:all', 'uglify:setup', 'copy:setup', 'clean:tmp'])
	grunt.registerTask('build', ['less', "coffee",'uglify:mangle', 'concat', 'copy:src', 'clean:tmp']);
	grunt.registerTask('jshint', ['jshint']);
	grunt.registerTask('default', ['watch']);
	//grunt.registerTask('clean', 'clean');

}