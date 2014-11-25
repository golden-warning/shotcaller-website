;(function (){
	"use strict";
	angular.module("giraffeDraft", ['ui.router', 'giraffeDraft.services'])
	.config(function($stateProvider) {
		$stateProvider
			.state('leagues', {
				url: '/leagues',
				templateUrl: './leagues/view.html',
				controller: 'leaguesController as c'
			})
			.state('league', {
				url: '/league',
				templateUrl: './league/view.html',
				controller: 'leagueController as c'
			})
			.state('matchup', {
				url: '/matchup',
				templateUrl: './matchup/view.html',
				controller: 'matchupController as c'
			})
	})

	.run(function($state) {
		$state.go('leagues')
	})

}).call(this);
