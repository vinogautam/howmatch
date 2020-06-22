hmapp.controller('followingEmployeesController', followingEmployeesController);

followingEmployeesController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function followingEmployeesController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.employees = DATA.data;
}