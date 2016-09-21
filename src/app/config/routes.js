define([
	'dojo/_base/lang',
	'dojo/router',
	'app/components/navbar/Navbar',
	'app/pages/landing/Landing',
	'app/pages/login/Login'
], function (
	lang,
	router,
	Navbar,
	Landing,
	Login
) {	
	var options = {
		containerNode: undefined
	};

	var currentView = null;

	return {
		init: function (opts) {
			var context = this;

			lang.mixin(options, opts !== undefined ? opts : {});

			if (options.containerNode === undefined) {
				throw new Error('containerNode is undefined.');
			} else {
				context.setupRoutes();
			}
		},
		setupRoutes: function () {
			var context = this;

			router.register('/home', function (evt) {
				context.clearCurrentView();
				Navbar.show();

				currentView = new Landing();
				currentView.placeAt(options.containerNode);
				currentView.startup();
			});

			router.register('/login', function (evt) {
				context.clearCurrentView();
				Navbar.hide();

				currentView = new Login();
				currentView.placeAt(options.containerNode);
				currentView.startup();
			});

			router.register('/logout', function (evt) {
				// TODO: Do the logout process
				// Then go to the login screen
				router.go('/login');
			});

			router.startup();
			router.go('/login');
		},
		clearCurrentView: function () {
			if (currentView !== null) {
				currentView.destroy();
			}
		}
	};
});
