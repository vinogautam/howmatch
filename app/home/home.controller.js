hmapp.controller('homeController', homeController);

homeController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function homeController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
 	$('#carousel-one, #carousel-two').carousel();

 	$(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 

    $(".show-toast").click(function(){
        $("#myToast").toast({ delay: 3000 });
        $("#myToast").toast('show');
    }); 

    $scope.pageInfo = {search: {}};

    $scope.search_job= function(){
        $rootScope.search = angular.copy($scope.pageInfo.search);
        $state.go('job_search');
    };
}