hmapp.controller('jobsearchController', jobsearchController);

jobsearchController.$inject = ['DATA', 'PagerService', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function jobsearchController(DATA, PagerService, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {data: DATA};

	$scope.jobs_bk = DATA.data;

	$scope.filteredItems = $scope.jobs_bk;

	$scope.pager = {};

	$scope.setPage = function(page) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }

        // get pager object from service
        $scope.pager = PagerService.GetPager($scope.filteredItems.length, page, 10);
        $scope.pager.label = 'jobs';
        // get current page of items
        $scope.jobs = $scope.filteredItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }

    $scope.setPage(1);

    $scope.category = [];
    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
    });
}