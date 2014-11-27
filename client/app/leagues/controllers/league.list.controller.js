;(function() {
  angular.module('giraffeDraft')
  .controller('LeagueListController', LeagueListController)

  function LeagueListController($scope){
  	console.log('List controller instantiated')
  	console.log(this)
  	vm = this;
  	vm.name = 'YOU ARE THE GIRAFFE'
  	vm.leagues = ['league1','league2'];
  	console.log($scope.name)
  }
}).call(this);
