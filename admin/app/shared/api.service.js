hmapp.factory('ApiService', function (httpService, $q, APIURL, $rootScope) {
	var apiService = {};
    
    apiService.notification = function(msg, type){
        $('body').pgNotification({
            style: 'flip',
            message: msg,
            position: 'top-middle',
            timeout: 1000,
            type: type
        }).show();
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

    apiService.hm_jobs = function(){
        return httpService.get(APIURL+'hm_jobs')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_save_job = function(data){
        return httpService.post(APIURL+'hm_save_job', data)
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_delete_job = function(id){
        return httpService.post(APIURL+'hm_delete_job', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_change_status = function(st, id){
        return httpService.post(APIURL+'hm_change_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    }

     apiService.hm_category = function(){
        return httpService.get(APIURL+'hm_category')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_save_category = function(data){
        return httpService.post(APIURL+'hm_save_category', data)
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_delete_category = function(id){
        return httpService.post(APIURL+'hm_delete_category', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_change_status_cat = function(st, id){
        return httpService.post(APIURL+'hm_change_status_cat', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    }

    return apiService;
});