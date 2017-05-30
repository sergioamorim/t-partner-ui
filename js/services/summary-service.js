angular.module("TP").factory("summaryAPI", function($http, config){
	
	var getSummaries = function(requestData) {
        return $http.post(config.baseUrl+'/student/summary', requestData);
	}

	return {
		getSummaries: getSummaries
	}
});
