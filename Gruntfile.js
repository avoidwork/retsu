module.exports = function (grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON("package.json"),
		concat : {
			options : {
				banner : "/**\n" +
				         " * <%= pkg.description %>\n" +
				         " *\n" +
				         " * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n" +
				         " * @copyright <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
				         " * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n" +
				         " * @link <%= pkg.homepage %>\n" +
				         " * @module <%= pkg.name %>\n" +
				         " * @version <%= pkg.version %>\n" +
				         " */\n"
			},
			dist : {
				src : [
					"src/intro.js",
					"src/array.js",
					"src/json.js",
					"src/label.js",
					"src/math.js",
					"src/number.js",
					"src/regex.js",
					"src/string.js",
					"src/utility.js",
					"src/xml.js",
					"src/outro.js"
				],
				dest : "lib/<%= pkg.name %>.js"
			}
		},
		exec : {
			closure : {
				cmd : "cd lib\nclosure-compiler --compilation_level WHITESPACE_ONLY --js <%= pkg.name %>.js --js_output_file <%= pkg.name %>.min.js --create_source_map ./<%= pkg.name %>.map"
			},
			sourcemap : {
				cmd : "echo //# sourceMappingURL=<%= pkg.name %>.map >> lib/<%= pkg.name %>.min.js"
			}
		},
		jsdoc : {
			dist : {
				src: ["lib/<%= pkg.name %>.js", "README.md"],
				options: {
				    destination : "doc",
				    template    : "node_modules/ink-docstrap/template",
				    configure   : "docstrap.json",
				    "private"   : false
				}
			}
		},
		jshint : {
			options : {
				jshintrc : ".jshintrc"
			},
			src : "lib/<%= pkg.name %>.js"
		},
		nodeunit : {
			all : ["test/*.js"]
		},
		sed : {
			version : {
				pattern : "{{VERSION}}",
				replacement : "<%= pkg.version %>",
				path : ["<%= concat.dist.dest %>"]
			}
		},
		watch : {
			js : {
				files : "<%= concat.dist.src %>",
				tasks : "default"
			},
			pkg: {
				files : "package.json",
				tasks : "default"
			}
		}
	});

	// tasks
	grunt.loadNpmTasks("grunt-sed");
	grunt.loadNpmTasks("grunt-exec");
	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// aliases
	grunt.registerTask("test", ["jshint", "nodeunit"]);
	grunt.registerTask("build", ["concat", "sed", "test"]);
	grunt.registerTask("default", ["build", "exec", "jsdoc"]);
};
