angular.module("TP").factory("summaryAPI", function($http, config){
	
	var _getSummaries = function(requestData){
        var req = {
            method: 'POST',
            url: config.baseUrl+'/student/summary',
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestData
        }
        $http(req).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            console.log(response);
            return null;
        });
	}
	
	return {
		getSummaries: _getSummaries
	}
});
