angular.module("TP").factory("summaryAPI", function($http, config){
	
	var _getSummaries = function(requestData){
        return $http.post(config.baseUrl+'/student/summary', requestData);
	}
	
	return {
		getSummaries: _getSummaries
	}
});
