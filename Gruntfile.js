module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON("package.json"),
		concat: {
			options : {
				banner : "/**\n" +
				" * <%= pkg.name %>\n" +
				" *\n" +
				" * @copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
				" * @license <%= pkg.license %>\n" +
				" * @version <%= pkg.version %>\n" +
				" */\n"
			},
			dist: {
				src : [
					"<banner>",
					"src/intro.js",
					"src/retsu.js",
					"src/outro.js"
				],
				dest : "lib/<%= pkg.name %>.es6.js"
			}
		},
		"babel": {
			options: {
				sourceMap: false,
				presets: ["babel-preset-es2015"]
			},
			dist: {
				files: {
					"lib/<%= pkg.name %>.js": "lib/<%= pkg.name %>.es6.js"
				}
			}
		},
		eslint: {
			target: ["lib/<%= pkg.name %>.es6.js"]
		},
		nodeunit : {
			all : ["test/*.js"]
		},
		"string-replace": {
			dist: {
				files: {
					"lib/": "lib/<%= pkg.name %>.es6.js"
				},
				options: {
					replacements: [{
						pattern: /\{\{VERSION}}/,
						replacement: "<%= pkg.version %>"
					}]
				}
			}
		},
		uglify: {
			options: {
				banner : "/*\n" +
				" <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
				" @version <%= pkg.version %>\n" +
				" */",
				sourceMap: true,
				sourceMapIncludeSources: true
			},
			target: {
				files: {
					"lib/<%= pkg.name %>.min.js" : ["lib/<%= pkg.name %>.js"]
				}
			}
		},
		watch : {
			js : {
				files : "<%= concat.dist.src %>",
				tasks : "build"
			},
			pkg: {
				files : "package.json",
				tasks : "build"
			}
		}
	});

	// tasks
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-string-replace");

	// aliases
	grunt.registerTask("test", ["eslint", "nodeunit"]);
	grunt.registerTask("build", ["concat", "string-replace", "babel"]);
	grunt.registerTask("default", ["build", "test", "uglify"]);
};