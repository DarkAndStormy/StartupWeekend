(function() {
	var config = module.exports;

	config['Browser Tests'] = {
		rootPath: "../",
		environment: "browser",
		sources: [
			"client/js/*.js"
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
	        "lib/**/*.js"
	    ],
	    tests: [
	        "test/server/test-*.js"
	    ]
	};

}());
