define([
	'dojo/_base/array',
	'dojo/router',
	'app/components/navbar/Navbar',
	'app/services/http'
], function (
	array,
	router,
	Navbar,
	http
) {
	var containerNode;
	var currentView;

	return {
		init: function (node) { // Second argument (options object) can be placed (for future reference)
			var context = this;

			containerNode = node;

			if (containerNode === undefined) {
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

							currentView.placeAt(containerNode);
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
			if (currentView !== undefined) {
				currentView.destroy();
			}
		}
	};
});
