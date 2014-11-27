;(function (){
	angular.module("giraffeDraft", ['ui.router', 'giraffeDraft.services'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('leagues', {
				url: '/leagues',
				templateUrl: 'app/leagues/views/league.list.view.html',
				controller: 'LeagueListController as vm'
			})
			.state('league', {
				url: 'app/leagues/{leagueID}',
				templateUrl: './league/view.html',
				controller: 'leagueController as vm'
			})
			.state('matchup', {
				url: 'app/leagues/{leagueID}/{matchupID}',
				templateUrl: './matchup/view.html',
				controller: 'matchupController as vm'
			})
		$urlRouterProvider.otherwise('/leagues');
	})

	.run(function($state) {
		$state.go('leagues')
	})

}).call(this);
