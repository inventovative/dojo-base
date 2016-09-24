require([
	'dojo/dom-construct',
	'dojo/dom',
	'app/components/navbar/Navbar',
	'app/config/routes',
	'app/services/auth',
	'dojo/domReady!'
], function (
	domConstruct,
	dom,
	Navbar,
	routes,
	auth
) {
	var navbarContainer = dom.byId('navbarContainer');
	var mainContainer = dom.byId('mainContainer');

	// Initialise the Navbar
	Navbar.init(navbarContainer);

	// Initialize all routes
	routes.init(mainContainer);

	auth.getLoginStatus().then(function (status) {
		console.log('logged in: ' + status);
		return auth.setLoginStatus(true);
	}).then(function () {
		return auth.getLoginStatus();
	}).then(function (status) {
		console.log('logged in: ' + status);
	});
});
