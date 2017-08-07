(function(angular){
    var app = angular.module("home_page",["ngRoute"]);
    app.config(["$routeProvider",function($routeProvider) {
        console.log(22);
        $routeProvider.when("/home_page?",{
            template:'<div class="list"><img src="assets/img/home_page.png" alt=""></div>',
            controller:"home_pageController"
        })
    }])
    app.controller("home_pageController",["$scope",function($scope) {
    }]);
})(angular);