;(function (){
	"use strict";
	angular.module("giraffeDraft", [])
	.controller('apiTester', function($scope, services){
		$scope.link = "myteams";

		$scope.sendRequest = function(){	
			services.getRequest($scope.link).then(function(data){
				console.log(data)
			})

		}

	})

}).call(this);