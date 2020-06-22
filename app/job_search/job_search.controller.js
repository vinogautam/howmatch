hmapp.controller('jobsearchController', jobsearchController);

jobsearchController.$inject = ['$filter', 'DATA', 'PagerService', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function jobsearchController($filter, DATA, PagerService, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {data: DATA, filter: {category: {}, salary: parseInt(DATA.salary.maxsalary)}};

	$scope.jobs_bk = DATA.data;

    $scope.filteredItems = angular.copy($scope.jobs_bk);

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

    $scope.fiterResult = function(){
        $scope.filteredItems = angular.copy($scope.jobs_bk);
        $scope.filteredItems = $filter("filter")($scope.filteredItems, {title: $scope.pageInfo.filter.title, type: $scope.pageInfo.filter.type, location: $scope.pageInfo.filter.location});
        
        var cate = [];
        angular.forEach($scope.pageInfo.filter.category, function(v,k){
            if(v){
                cate.push(k);
            }
        });

        if(cate.length){
            $scope.filteredItems = $scope.filteredItems.filter(function(a){
                return cate.indexOf(a.category) != -1;
            });
        }
        
        $scope.filteredItems = $scope.filteredItems.filter(function(a){
            return a.salary <= $scope.pageInfo.filter.salary;
        });

        $scope.setPage(1);
    };

    $scope.category = [];
    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
    });

    if($rootScope.search){
        $scope.pageInfo.filter.title = angular.copy($rootScope.search.title);
        $scope.pageInfo.filter.location = angular.copy($rootScope.search.location);
        $rootScope.search = undefined;
        $scope.fiterResult();
    }
}