hmapp.factory('ApiService', function (httpService, $q, APIURL, $rootScope) {
	var apiService = {};
    
    apiService.notification = function(msg, type){
        /*$('body').pgNotification({
            style: 'flip',
            message: msg,
            position: 'top-middle',
            timeout: 1000,
            type: type
        }).show();*/
    };
    
	apiService.login = function (data) {
	    return httpService
        .post(APIURL+'hm_login', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.forgotPassword = function (data) {
        return httpService
        .post(APIURL+'hm_forgot_password', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.resetPassword = function (data) {
        return httpService
        .post(APIURL+'hw_reset_password', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.register = function (data) {
        return httpService
        .post(APIURL+'hm_save_user', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.dahboard = function (data) {
        data.user_id = $rootScope.lo
        return httpService
        .post(APIURL+'hm_save_user', data)
        .then(function (res) {
            return res['data'];
        });
    };

    return apiService;
});