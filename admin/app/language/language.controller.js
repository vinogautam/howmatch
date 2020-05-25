angular.module('app')
        .controller('languageController', languageController);

languageController.$inject = ['$scope', '$state', '$rootScope', 'APIURL', '$http', 'ApiService']

function languageController($scope, $state, $rootScope, APIURL, $http, ApiService) {

    $('.select2multiple').select2();
    $('#show-modal').click(function() {
        $('#addNewAppModal').modal('show');
    });

    $scope.pagingSize = 5;
    $scope.dataPerPage = 10;
    $scope.totalItems = [];
    $scope.displayItems = [];

    $scope.pageInfo = {submitted: false};
    $scope.form_data = {};
    $scope.totalItems = [];
    ApiService.hm_language().then(function(res){
    	$scope.totalItems = res.data;
    });

    $scope.save = function(frm){
    	$scope.pageInfo.submitted = true;
    	if(frm.$valid){
    		ApiService.hm_save_language($scope.form_data).then(function(res){
    			$('#addNewAppModal').modal('hide');
    			ApiService.notification(res.msg, 'success');
    			ApiService.hm_language().then(function(res){
			    	$scope.totalItems = res.data;
			    });
			    $scope.form_data = {};
    		});
    	} else {
    		ApiService.notification('Please fill all required fields', 'error');
    	}
    };

    $scope.edit = function(data){
    	$scope.form_data = data;
    	$('#addNewAppModal').modal('show');
    };

    $scope.delete = function(data){
    	$scope.pageInfo.actionId = data;
    	$('#deleteAppModal').modal('show');
    };

    $scope.delete2 = function(id){
    	ApiService.hm_delete_language($scope.pageInfo.actionId).then(function(res){
    		$('#deleteAppModal').modal('hide');
    		ApiService.notification(res.msg, 'success');
    		ApiService.hm_language().then(function(res){
		    	$scope.totalItems = res.data;
		    });
    	});
    };

    $scope.change_status = function(st, id){
    	ApiService.hm_change_language_status(st, id).then(function(res){
    		ApiService.notification(res.msg, 'success');
    		ApiService.hm_language().then(function(res){
		    	$scope.totalItems = res.data;
		    });
    	});
    };
}