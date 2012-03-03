(function() {
	var config = module.exports;

	config["My tests"] = {
	    rootPath: "../",
	    environment: "node", // or "node"
	    sources: [
	        "lib/**/*.js"
	    ],
	    tests: [
	        "test/test-*.js"
	    ]
	}
}());
