var app = angular.module('collegeApp',['ngRoute','ngMessages']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'view/main.html',
            controller: 'mainCtrl'
        })
        .when('/upload',{
            templateUrl: 'view/upload.html',
            controller: 'uploadCtrl'
        })
        .when('/about',{
            templateUrl: 'view/about.html',
            controller: 'aboutCtrl'
        })
        .when('/error',{
            templateUrl: 'view/error.html',
            controller: 'errorCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);