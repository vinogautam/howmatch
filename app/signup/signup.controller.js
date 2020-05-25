hmapp.controller('signupController', signupController);

signupController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function signupController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.signupData = {};

	$scope.register = function(){

	};

	$scope.openLogin = function(){
		$("#signupModal").modal('hide');
		$("#signinModal").modal('show');
	};
}