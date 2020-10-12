hmapp.controller('jobdashboardController', jobdashboardController);

jobdashboardController.$inject = [ '$stateParams', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function jobdashboardController($stateParams, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$( ".user-short-info").draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move",
      classes: {
	    "ui-draggable": "highlight"
	  }
    });
 
    // Let the trash be droppable, accepting the gallery items
    $('.draggable-panel').droppable({
      accept: ".user-short-info",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        //deleteImage( ui.draggable );
      }
    });

}