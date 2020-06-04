hmapp.controller('userProfileController', userProfileController);

userProfileController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function userProfileController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.profile = DATA.data;

	$scope.save = function(flag){
		if(flag){

		} else {
			ApiService.notification('Please fill all required fields', 'Warning');
		}
	};
}