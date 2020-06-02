hmapp.factory('ApiService', function (httpService, $q, APIURL, $rootScope) {
	var apiService = {};
    
    apiService.notification = function(msg, type){
        $.toast({
            heading: type,
            text: msg,
            showHideTransition: 'plain',
            icon: type.toLowerCase(),
            position: 'top-right'
        });
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

    apiService.user_dashboard = function () {
        return httpService
        .post(APIURL+'hm_user_dashboard', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_profile = function (data) {
        data.user_id = $rootScope.loggedInUserInfo.id;
        return httpService
        .post(APIURL+'hm_user_profile', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_applied_job = function () {
        return httpService
        .post(APIURL+'hm_user_applied_job', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_shortlist_job = function () {
        return httpService
        .post(APIURL+'hm_user_shortlist_job', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_following_employees = function () {
        return httpService
        .post(APIURL+'hm_user_following_employees', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_alerts = function () {
        return httpService
        .post(APIURL+'hm_user_alerts', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    return apiService;
});