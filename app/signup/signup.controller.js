hmapp.controller('signupController', signupController);

signupController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function signupController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.signupData = {profile: {}, user_type: '3'};

	$scope.register = function(fl){
		if(fl){
			ApiService.register($scope.signupData).then(function(){

			});
		} else {
			
		}
	};

	$scope.openLogin = function(){
		$("#signupModal").modal('hide');
		$("#signinModal").modal('show');
	};
}