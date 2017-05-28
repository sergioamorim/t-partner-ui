angular.module("TP").factory("summaryAPI", function($http, config){
	
	var _getSummary = function(requestData){
		return $http.post(config.baseUrl+"/student/summary", resquestData);
	}
	
	return {
		getSummary: _getSummary
	}
});
