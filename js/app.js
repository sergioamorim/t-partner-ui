var app = angular.module('TP', [ 'ngRoute', 'controllers', 'angularModalService', 'ngSanitize', 'ui.bootstrap', 'ui.router']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/summary', {
        templateUrl: 'view/summary.html'
    }).otherwise('/summary');
}]);
app.run(function ($rootScope) {
});
