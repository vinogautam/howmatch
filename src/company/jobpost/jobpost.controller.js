hmapp.controller('jobpostController', jobpostController);

jobpostController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function jobpostController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval, datepicker) {
	$scope.pageInfo = {};
 	//$('.select2multiple').select2();
    //$('.datepicker').datepicker();
 	
    

	$scope.pagingSize = 5;
    $scope.dataPerPage = 10;
    $scope.totalItems = [];
    $scope.displayItems = [];

    $scope.pageInfo = {submitted: false};
    $scope.job_form_data = {industry: {}};

    angular.forEach(DATA.data, function(j){
        $arr = [ 'keywords', 'location'];
        angular.forEach($arr, function(a){
            j[a+'_name'] = [];
            angular.forEach(j[a], function(l){
                var ld = $rootScope.lov_obj[a][l] ? $rootScope.lov_obj[a][l] : '';
                j[a+'_name'].push(ld);
            });
            j[a+'_name'] = j[a+'_name'].join(',');
        });
    });

    $scope.totalItems = DATA.data;

    $scope.save_job = function(frm){
    	$scope.pageInfo.submitted = true;
    	if(frm.$valid){
            var cpy = angular.copy($scope.job_form_data);
            delete cpy.company_name;
            delete cpy.company_image;
            delete cpy.no_of_applicants;
    		ApiService.hm_save_job(cpy).then(function(res){
    			$('#submitjobModal').modal('hide');
    			ApiService.notification(res.msg, 'success');
    			$state.reload();
    		});
    	} else {
    		ApiService.notification('Please fill all required fields', 'error');
    	}
    };

    $scope.edit_job = function(data){
        data.last_date = new Date(data.last_date);
    	$scope.job_form_data = data;
    	$('#submitjobModal').modal('show');
    };

    $scope.delete_job = function(data){
    	$scope.pageInfo.actionId = data;
    	$('#deleteAppModal').modal('show');
    };

    $scope.delete_job2 = function(id){
    	ApiService.hm_delete_job($scope.pageInfo.actionId).then(function(res){
            $('#deleteAppModal').modal('hide');
            ApiService.notification(res.msg, 'success');
            $state.reload();
        });
    };

    $scope.applicants = [];
    $scope.getApplicants = function(data){
        if(data.no_of_applicants == 0){
            return;
        }
        $scope.job_form_data = data;
        $scope.applicants = [];
        $rootScope.preloader = true;
        ApiService.hm_get_Applicants(data.id).then(function(res){
            $('#showApplicantModal').modal('show');
            $rootScope.preloader = false;
            $scope.applicants = res.data;
        });
    };

    $scope.category = [];
    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
    });
}