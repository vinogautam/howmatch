hmapp.controller('viewcandidateController', viewcandidateController);

viewcandidateController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function viewcandidateController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	
	$scope.pageInfo = {};

	$scope.candidate = DATA.data;

	if($scope.candidate.benefits_list){
		$scope.candidate.benefits_list=JSON.parse($scope.candidate.benefits_list);
	}
}