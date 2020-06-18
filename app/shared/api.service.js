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

    apiService.upload = function(data){
        return httpService
        .post(APIURL+'hm_upload', data)
        .then(function (res) {
            return res['data'];
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

    apiService.company_dashboard = function () {
        return httpService
        .post(APIURL+'hm_company_dashboard', {user_id: $rootScope.loggedInUserInfo.id})
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


    apiService.company_jobs = function(){
        return httpService.post(APIURL+'hm_company_jobs', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_save_job = function(data){
        data.posted_by = $rootScope.loggedInUserInfo.id;
        return httpService.post(APIURL+'hm_save_job', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_delete_job = function(id){
        return httpService.post(APIURL+'hm_delete_job', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_change_status = function(st, id){
        return httpService.post(APIURL+'hm_change_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    };

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
     apiService.hm_skills = function(){
        return httpService.get(APIURL+'hm_skills')
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
    
    apiService.hm_education = function(){
        return httpService.get(APIURL+'hm_education')
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

    apiService.hm_benefits = function(){
        return httpService.get(APIURL+'hm_benefits')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_location = function(){
        return httpService.get(APIURL+'hm_location')
        .then(function (res) {
            return res['data'];
        });
    }
    
    apiService.hm_language = function(){
        return httpService.get(APIURL+'hm_language')
        .then(function (res) {
            return res['data'];
        });
    }
    
    apiService.hm_designation= function(){
        return httpService.get(APIURL+'hm_designation')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.job_search= function(data){
        return httpService.post(APIURL+'hm_job_search', data)
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.view_company= function(id){
        return httpService.post(APIURL+'hm_view_company', {id: id})
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.view_job= function(id){
        return httpService.post(APIURL+'hm_view_job', {id: id})
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.view_candidate= function(id){
        return httpService.post(APIURL+'hm_view_candidate', {id: id})
        .then(function (res) {
            return res['data'];
        });
    }
    return apiService;
});