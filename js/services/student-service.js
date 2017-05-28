angular.module("TP").factory("studentAPI", function($http, config){
	var _getStudents = function(){
		return $http.get(config.baseUrl+"/student/list");
	}

	return {
		getStudents: _getStudents
	}
});
