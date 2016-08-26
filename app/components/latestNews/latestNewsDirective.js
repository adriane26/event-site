'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const latestNewsDirective = (app) => {
	app.directive('latestNewsDirective', [function() {
		const latestNewsDirectiveObj = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, elem, attrs) {
				// scope.rss1(); 
				// scope.rss2();
				
			}
		}
		return latestNewsDirectiveObj;
	}])
};

module.exports = latestNewsDirective;