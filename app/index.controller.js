hmapp.controller('indexController', indexController);

indexController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function indexController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
    var vm = this;

    $scope.user = localStorage.getItem('hmuser');
    $rootScope.loggedInUserInfo = {};
    if(!!$scope.user){
        $rootScope.loggedInUserInfo = JSON.parse($scope.user);
    }

    $rootScope.menu = {};
    $rootScope.currentState = $state.current.name;
    $rootScope.currentStateDetails = $state.current;

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
        $rootScope.currentState = toState.name;
        $rootScope.currentStateDetails = toState;
        $rootScope.preloader = false;
        if($('body').hasClass('sidebar-open')){
            $('.sidebar-header i.fa-close').trigger('click');
        }
        $('.tooltip').removeClass('show');
        if(toState.name != fromState.name){
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    });

    $rootScope.preloader = true;

    window.addEventListener('load', (event) => {
        $('body').addClass('loaded');
        $rootScope.preloader = false;
        $scope.$apply();
    });
    
    $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams, options) { 
        $rootScope.preloader = true;
        if(toState.auth && !$rootScope.loggedInUserInfo){
            event.preventDefault();
            $state.go('home');
        }
    });
    
    
    $scope.copy = function(data){
        return angular.copy(data);
    };
    
    $scope.loadPlugin = function(){
       $timeout(function(){
       	$.Pages.initSidebar();
       }, 100);
    };
    
    $scope.initTooltip = function(){
        $('[data-toggle="tooltip"]').tooltip();
    };
    
    $scope.focus = function(id){
        $timeout(function(){
            $('#'+id).focus();
        }, 200);
    };

    $scope.logout = function(){
        localStorage.removeItem('hmuser');
        $rootScope.loggedInUserInfo = {};
        $state.go('home');
    };

    $scope.show_modal = function(id){
        $(id).modal('show');
    };

    $scope.openSignUp = function(e, emp){
        e.preventDefault();
        $scope.show_modal('#signupModal');
        $rootScope.$broadcast('signUpType', emp);
    };
}