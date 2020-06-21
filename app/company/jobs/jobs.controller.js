hmapp.controller('jobsController', jobsController);

jobsController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function jobsController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
 	//$('.select2multiple').select2();

 	
	$scope.pagingSize = 5;
    $scope.dataPerPage = 10;
    $scope.totalItems = [];
    $scope.displayItems = [];

    $scope.pageInfo = {submitted: false};
    $scope.job_form_data = {industry: {}};
    $scope.totalItems = DATA.data;

    $scope.save_job = function(frm){
    	$scope.pageInfo.submitted = true;
    	if(frm.$valid){
    		ApiService.hm_save_job($scope.job_form_data).then(function(res){
    			$('#addNewAppModal').modal('hide');
    			ApiService.notification(res.msg, 'success');
    			$state.reload();
    		});
    	} else {
    		ApiService.notification('Please fill all required fields', 'error');
    	}
    };

    $scope.edit_job = function(data){
    	$scope.job_form_data = data;
    	$('#addNewAppModal').modal('show');
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

    $scope.category = [];
    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
    });

    $scope.education = [];
    ApiService.hm_education().then(function(res){
        $scope.education = res.data;
    });

    $scope.industry = [];
    ApiService.hm_industry().then(function(res){
        $scope.industry = res.data;
    });

    $scope.joblevel = [];
    ApiService.hm_joblevel().then(function(res){
        $scope.joblevel = res.data;
    });

     $scope.location = [];
    ApiService.hm_location().then(function(res){
        $scope.location = res.data;
    });

}