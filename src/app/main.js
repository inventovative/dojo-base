require([
	'dojo/dom-construct',
	'dojo/dom',
	'app/components/navbar/Navbar',
	'app/config/routes',
	'dojo/domReady!'
], function (
	domConstruct,
	dom,
	Navbar,
	routes
) {
	var navbarContainer = dom.byId('navbarContainer');
	var mainContainer = dom.byId('mainContainer');

	// Initialise the Navbar
	Navbar.init(navbarContainer);

	// Initialize all routes
	routes.init(mainContainer);
});
