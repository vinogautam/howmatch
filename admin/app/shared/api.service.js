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

    apiService.hm_packages = function(){
        return httpService.get(APIURL+'hm_packages')
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

    apiService.hm_save_package = function(data){
        return httpService.post(APIURL+'hm_save_package', data)
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

    apiService.hm_delete_package = function(id){
        return httpService.post(APIURL+'hm_delete_package', {delete:[id]})
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

    apiService.hm_change_package_status = function(st, id){
        return httpService.post(APIURL+'hm_change_package_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    }


    apiService.hm_skills = function(){
        return httpService.get(APIURL+'hm_skills')
        .then(function (res) {
            return res['data'];
        });
    }
    apiService.hm_save_skill = function(data){
        return httpService.post(APIURL+'hm_save_skill', data)
        .then(function (res) {
            return res['data'];
        });
    }


    apiService.hm_delete_skill = function(id){
        return httpService.post(APIURL+'hm_delete_skill', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    }

     apiService.hm_change_skill_status = function(st, id){
        return httpService.post(APIURL+'hm_change_skill_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_users = function(){
        return httpService.get(APIURL+'hm_users')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_company = function(){
        return httpService.get(APIURL+'hm_company')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_save_user = function(data){
        return httpService.post(APIURL+'hm_save_user', data)
        .then(function (res) {
            return res['data'];
        });
    }


    apiService.hm_delete_user = function(id){
        return httpService.post(APIURL+'hm_delete_user', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    }

     apiService.hm_change_user_status = function(st, id){
        return httpService.post(APIURL+'hm_change_user_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    }






    apiService.hm_industry= function(){
        return httpService.get(APIURL+'hm_industry')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_save_industry = function(data){
        return httpService.post(APIURL+'hm_save_industry', data)
        .then(function (res) {
            return res['data'];
        });
    }


    apiService.hm_delete_industry = function(id){
        return httpService.post(APIURL+'hm_delete_industry', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    }

     apiService.hm_change_industry_status = function(st, id){
        return httpService.post(APIURL+'hm_change_industry_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    }

apiService.hm_education = function(){
        return httpService.get(APIURL+'hm_education')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_save_education = function(data){
        return httpService.post(APIURL+'hm_save_education', data)
        .then(function (res) {
            return res['data'];
        });
    }


    apiService.hm_delete_education = function(id){
        return httpService.post(APIURL+'hm_delete_education', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    }

     apiService.hm_change_education_status = function(st, id){
        return httpService.post(APIURL+'hm_change_education_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    }

apiService.hm_joblevel = function(){
        return httpService.get(APIURL+'hm_joblevel')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_save_joblevel = function(data){
        return httpService.post(APIURL+'hm_save_joblevel', data)
        .then(function (res) {
            return res['data'];
        });
    }


    apiService.hm_delete_joblevel = function(id){
        return httpService.post(APIURL+'hm_delete_joblevel', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    }

     apiService.hm_change_joblevel_status = function(st, id){
        return httpService.post(APIURL+'hm_change_joblevel_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    }


    return apiService;
});