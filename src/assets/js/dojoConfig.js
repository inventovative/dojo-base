var dojoConfig = {
	baseUrl: './',
	has: {
		'dojo-firebug': true,
		'dojo-debug-messages': true
	},
	parseOnLoad: false,
	async: true,
	packages: [{
		name: 'dojo',
		location: 'dojo'
	}, {
		name: 'dijit',
		location: 'dijit'
	}, {
		name: 'dojox',
		location: 'dojox'
	}, {
		name: 'app',
		location: 'app'
	}],
	isOnline: {
		status: false,
		link: ''
	},
	cacheBust: false
};
