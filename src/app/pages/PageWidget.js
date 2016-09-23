// All pages will inherit this PageWidget

define([
	'dojo/_base/declare',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase'
], function (
	declare,
	_TemplatedMixin,
	_WidgetBase
) {
	return declare('app.pages.PageWidget', [_WidgetBase, _TemplatedMixin], {
		navbar: true // Show the navbar by default
	});
});