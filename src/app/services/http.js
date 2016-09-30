define([
	'dojo/_base/array',
	'dojo/_base/config',
	'dojo/_base/lang',
	'dojo/request/xhr',
	'dojo/Deferred'
], function (array, config, lang, xhr, Deferred) {
	var http = {};

	var headers = {}; // TODO: add headers

	http.getLocal = function (url) {
		validateUrl(url);

		var deferred = new Deferred();

		xhr(url, {
			method: 'GET',
			handleAs: 'json'
		}).then(function (response) {
			deferred.resolve(response);	
		}, function (err) {
			throw new Error(err);
		});

		return deferred.promise;
	};

	http.get = function (url, obj) {
		validateUrl(url);

		var headerObj = {};

		if (typeof obj === 'object') {
			if (typeof obj.headers === 'object') {
				headerObj = lang.mixin(lang.clone(headers), obj.headers);
			}
		} else {
			obj = {};
		}

		var deferred = new Deferred();

		xhr(obj.absoluteUrl ? url : config.restUrl + url, {
			headers: headerObj,
			method: 'GET',
			handleAs: 'json'
		}).response.then(function (response) {
			if (Array.isArray(obj.getHeaders)) {
				var returnHeaders = {};
				array.forEach(obj.getHeaders, function (header) {
					returnHeaders[header] = response.getHeader(header);
				});

				deferred.resolve({
					headers: returnHeaders,
					data: response.data
				});
			} else {
				deferred.resolve(response.data);
			}
		}, function (err) {
			throw new Error(err);
		});

		return deferred.promise;
	};

	http.post = function (url, data, headerObj) {
		validateUrl(url);

		if (typeof headerObj === 'object') {
			headerObj = lang.mixin(lang.clone(headers), headerObj);
		}

		var deferred = new Deferred();

		xhr(url, {
			headers: headerObj,
			method: 'POST',
			handleAs: 'json',
			data: data
		}).then(function (response) {
			deferred.resolve(response);
		}, function (err) {
			throw new Error(err);
		});

		return deferred.promise;
	};

	function validateUrl(url) {
		if (url === undefined) {
			throw new Error('url is undefined.');
		}

		if (typeof url !== 'string') {
			throw new Error('typeof url is not String.');
		}
	}

	return http;
});
