hmapp.controller('loginController', loginController);

loginController.$inject = ['facebookService', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function loginController(facebookService, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {login: true};

	$scope.signupData = {};

	$scope.register = function(){

	};

	$scope.openSignup = function(){
		$("#signinModal").modal('hide');
		$("#signupModal").modal('show');
	};

	$scope.fbLogin = function() {
	   facebookService.getMyLastName() 
	     .then(function(response) {
	       //$scope.last_name = response.last_name;
	       console.log(response);
	     }
	   );
	};

	$scope.login = function(fl){
		if(fl){
			ApiService.login($scope.signupData).then(function(response){
				if (response.status === 'Success') {
					if(response.data.user_type == 2){
						$("#signinModal").modal('hide');
		                $rootScope.loggedInUserInfo = response.data;
		                localStorage.setItem('hmuser', JSON.stringify(response.data));
	                	$state.go('company.dashboard');
	                } else if(response.data.user_type == 2){
	                	$("#signinModal").modal('hide');
		                $rootScope.loggedInUserInfo = response.data;
		                localStorage.setItem('hmuser', JSON.stringify(response.data));
	                	$state.go('user.dashboard');
	                } else {
	                	ApiService.notification(response.msg, 'error');
	                }
	            } else {
	                ApiService.notification(response.msg, 'error');
	            }
			});
		} else {
			ApiService.notification(response.msg, 'error');
		}
		

	};

	$scope.lostPassword = function(){
		ApiService.forgotPassword({email: $scope.pageInfo.email}).then(function(){

		});
	};
}