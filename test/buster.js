(function(global) {
	var config = module.exports;

	config['Browser Tests'] = {
		rootPath: "../",
		environment: "browser",
		sources: [
			"client/js/jquery*.js",
			"client/js/*.js",
			"test/bootstrap.js"
		],
		tests: [
			"test/client/test-*.js"
		]
	};

	/* make sure this one is last! */
	config["Server Tests"] = {
		rootPath: "../",
	    environment: "node",
	    sources: [
	        "lib/**/*.js",
	        "test/bootstrap.js"
	    ],
	    tests: [
	        "test/server/test-*.js"
	    ]
	};

}(this));
