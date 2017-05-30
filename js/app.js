var app = angular.module('TP', [ 'ngRoute', 'controllers', 'ui.bootstrap', 'angularjs-dropdown-multiselect', 'daterangepicker', 'ngAnimate', 'ngSanitize']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/summary', {
        templateUrl: 'view/summary.html'
    }).otherwise('/summary');
}]);
app.run(function ($rootScope) {
});
