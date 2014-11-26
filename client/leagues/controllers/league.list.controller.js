;(function() {
  angular.module('giraffeDraft')
  .controller('LeagueListController', LeagueListController);

  function LeagueListController(){
  	$scope.name = 'HELLO'
  	console.log('List controller instantiated')
  }
}).call(this);
