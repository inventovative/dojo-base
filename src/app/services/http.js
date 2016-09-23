define([
	'dojo/request/xhr',
	'dojo/Deferred'
], function (xhr, Deferred) {
	var http = {};

	http.get = function (url) {
		if (url === undefined) {
			throw new Error('url is undefined.');
		}

		if (typeof url !== 'string') {
			throw new Error('typeof url is not String.');
		}

		var deferred = new Deferred();

		xhr(url, {
			// TODO: headers
			method: 'GET',
			handleAs: 'json'
		}).then(function (response) {
			deferred.resolve(response);
		}, function (err) {
			throw new Error(err);
		});

		return deferred.promise;
	};

	return http;
});
