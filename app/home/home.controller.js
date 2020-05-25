hmapp.controller('homeController', homeController);

homeController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function homeController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
 	$('#carousel-one, #carousel-two').carousel();
}