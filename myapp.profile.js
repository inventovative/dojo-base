var profile = (function () {
	return {
		basePath: "./src",
		releaseDir: "../release",
		releaseName: "",
		action: "release",
		packages: [{
			name: "dojo",
			location: "dojo"
		}, {
			name: "dijit",
			location: "dijit"
		}, {
			name: "dojox",
			location: "dojox"
		}, {
			name: "app",
			location: "app"
		}],
		layers: {
			"dojo/dojo": {
				include: [
					"dojo/dojo"
				],
				customBase: true,
				boot: true
			}
		},
		defaultConfig: {
			async: 1
		},
		stripConsole: "warn"
	};
})();