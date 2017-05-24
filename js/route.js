angular.module('TP', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/summary', {
        templateUrl: 'view/summary.html'
    }).otherwise('/summary');
}]);