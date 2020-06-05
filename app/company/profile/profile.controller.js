hmapp.controller('companyProfileController', companyProfileController);

companyProfileController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function companyProfileController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
}