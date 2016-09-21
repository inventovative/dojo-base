var profile = (function () {
	// Checks if mid (Module ID) is in the app/tests directory
	var testResourceRe = /^app\/tests\//;

	var copyOnly = function (filename, mid) {
		// This is the list of files that we want to only copy and not modify
		var list = {
			"app/app.profile": true,
			"app/package.json": true,
			"app/assets/**": true
		};

		// Check if it is one of the special files,
		// if it is in app/resources (but not CSS) or is an image
		return (mid in list) || (/^app\/resources\//.test(mid) && !/\.css$/.test(filename)) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
	};

	return {
		resourceTags: {
			test: function (filename, mid) {
				// Tag test files
				return testResourceRe.test(mid) || (mid === "app/tests");
			},
			copyOnly: function (filename, mid) {
				// Tag files to copy only
				return copyOnly(filename, mid);
			},
			amd: function (filename, mid) {
				// If it isn't a test resource or copy only, and
				// is a .js file, tag it as AMD
				return !testResourceRe.test(mid) && !copyOnly(filename, mid) && /\.js$/.test(filename);
			}
		}
	};
})();
