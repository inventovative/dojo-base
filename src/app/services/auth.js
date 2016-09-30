define([
	'dojo/Deferred',
	'app/services/http'
], function (
	Deferred,
	http
) {
	var auth = {};

	auth.login = function (username, password) {
		var deferred = new Deferred();

		http.get('/key', {
			headers: {
				'Access-Control-Allow-Headers': 'Key'
			},
			getHeaders: ['Key']
		}).then(function (response) {
			var jsEncrypt = new JSEncrypt();
			jsEncrypt.setPublicKey(response.headers.Key);
			var encrypted = jsEncrypt.encrypt(username + '.' + password);
			
			return http.post('http://localhost:3000/login', {
				data: encrypted
			});
		}).then(function (response) {
			if (response.error) {
				throw new Error(response.errorDesc);
			}

			// Save JWT token here

			deferred.resolve();
		});

		return deferred.promise;
	};

	auth.getLoginStatus = function () {
		var deferred = new Deferred();

		localforage.getItem('isLoggedIn').then(function (value) {
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
			localforage.setItem('isLoggedIn', status).then(function () {
				deferred.resolve();
			});
		}

		return deferred.promise;
	};

	return auth;
});
