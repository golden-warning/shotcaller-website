;(function (){
	"use strict";
	angular.module("giraffeDraft", ['ui.router', 'giraffeDraft.services'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('leagues', {
				url: '/leagues',
				templateUrl: './leagues/views/league.list.view.html',
				controller: 'leagueListController as vm'
			})
			.state('league', {
				url: '/leagues/{leagueID}',
				templateUrl: './league/view.html',
				controller: 'leagueController as vm'
			})
			.state('matchup', {
				url: '/leagues/{leagueID}/{matchupID}',
				templateUrl: './matchup/view.html',
				controller: 'matchupController as vm'
			})
		$urlRouterProvider.otherwise('/leagues');
	})

	.run(function($state) {
		$state.go('leagues')
	})

}).call(this);
