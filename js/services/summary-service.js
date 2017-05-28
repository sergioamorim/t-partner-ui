angular.module("TP").factory("summaryAPI", function($http, config){
	
	var _getSummary = function(requestData){
        var req = {
            method: 'POST',
            url: config.baseUrl+'/student/summary',
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestData
        }
        return $http(req);
	}
	
	return {
		getSummary: _getSummary
	}
});
