var app=angular.module('NPOHomeAngular',[]);

app.controller('NPOHomeAngular',function($scope,$http){

	console.log("try this");

	$scope.createNewProject = function()
	{
		console.log("try this 1");
		window.location.assign("/projects/getProjectAddPage");
	}


}
);