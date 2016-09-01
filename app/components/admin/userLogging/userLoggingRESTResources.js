'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const userLoggingRESTResources = (app) => {

	app.factory('userLoggingRESTResources', ['$http', '$base64', '$cookies', '$window', ($http, $base64, $cookies, $window) => {
		return (user, callback) => {
		  return {
    	     signIn: (user, callback) => {
    	       var encoded = $base64.encode(user.username + ':' + user.password);
    	       $http.get('/auth/login', {
    	         headers: {'Authorization': 'Basic ' + encoded}
    	       })
    	       .success( (data) => {
                //set expiration to one day from login
                let today = new Date();
                let expireDate = new Date(today);
                expireDate.setDate(today.getDate() + 1); //Set expireDate date to tomorrow
                $cookies.put('token', data.token, {'expires': expireDate, 'path': '/'});
                $cookies.put('interopAdmin', data.admin, {'expires': expireDate, 'path': '/'});
                $cookies.put('username', data.username, {'expires': expireDate, 'path': '/'});
                $cookies.put('useremail', data.email, {'expires': expireDate, 'path': '/'});
                $window.sessionStorage.token = data.token;
                $http.defaults.headers.common.Authorization = data.token;
                callback(null);
    	       })
    	       .error( (data) => {
    	         callback(data);
    	       })
    	     },
	   
    	     /*create: function (user, callback) {
    	       $http.post('/api/create_user', user)
    	         .success(function (data) {
    	           $cookies.put('eat', data.eat)
    	           callback(null);
    	         })
    	         .error(function (data) {
    	           callback(data);
    	         });
    	     },
	   
    	     logout: function () {
    	       $cookies.put('eat', '');
    	     },
	   
    	     isSignedIn: function () {
    	       return !!($cookies.get('eat').length);
	   
    	     }*/
    	   };
		}


	}])
}

module.exports = userLoggingRESTResources;