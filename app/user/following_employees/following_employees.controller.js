hmapp.controller('followingEmployeesController', followingEmployeesController);

followingEmployeesController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function followingEmployeesController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
}