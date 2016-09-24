define([
	'dojo/Deferred'
], function (
	Deferred
) {
	var auth = {};

	//JWT needs to be applied here

	auth.getLoginStatus = function () {
		var deferred = new Deferred();

		localforage.getItem('isLoggedIn', function (value) {
			if (value === null) {
				localforage.setItem('isLoggedIn', false, function () {
					deferred.resolve(false);
				});
			} else {
				deferred.resolve(value);
			}
		});

		return deferred.promise;
	};

	auth.setLoginStatus = function (status) {
		var deferred = new Deferred();

		if (typeof status === 'boolean') {
			localforage.setItem('isLoggedIn', status, function () {
				deferred.resolve();
			});
		}

		return deferred.promise;
	};

	return auth;
});
