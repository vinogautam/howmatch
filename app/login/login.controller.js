hmapp.controller('loginController', loginController);

loginController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function loginController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.signupData = {};

	$scope.register = function(){

	};

	$scope.openSignup = function(){
		$("#signinModal").modal('hide');
		$("#signupModal").modal('show');
	};
}