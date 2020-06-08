hmapp.controller('companiesController', companiesController);

companiesController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function companiesController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
}