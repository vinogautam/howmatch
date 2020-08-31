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

    $(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});
}