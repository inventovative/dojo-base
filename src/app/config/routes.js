define([
	'dojo/_base/array',
	'dojo/_base/lang',
	'dojo/router',
	'app/components/navbar/Navbar',
	'app/services/http'
], function (
	array,
	lang,
	router,
	Navbar,
	http
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

			http.get('assets/data/page_data.json').then(function (response) {
				var keypairs = response;

				array.forEach(keypairs, function (keypair, i) {
					router.register(keypair.route, function (evt) {
						require([keypair.uri], function (Block) {
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
