define([
	'dojo/_base/array',
	'dojo/_base/lang',
	'dojo/router',
	'app/components/navbar/Navbar'
], function (
	array,
	lang,
	router,
	Navbar
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

			// TODO: change this to a JSON file
			var keypairs = [{
				uri: 'app/pages/landing/Landing',
				route: '/home'
			}, {
				uri: 'app/pages/login/Login',
				route: '/login'
			}];

			array.forEach(keypairs, function (keypair, i) {
				require([keypair.uri], function (Block) {
					router.register(keypair.route, function (evt) {
						context.clearCurrentView();

						currentView = new Block();

						if (currentView.navbar) {
							Navbar.show();
						} else {
							Navbar.hide();
						}

						currentView.placeAt(options.containerNode);
						currentView.startup();
					});

					if (i === keypairs.length - 1) {
						router.startup();
						router.go('/login');
					}
				});
			});
		},
		clearCurrentView: function () {
			if (currentView !== null) {
				currentView.destroy();
			}
		}
	};
});
