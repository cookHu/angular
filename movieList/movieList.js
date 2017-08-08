(function (angular) {
    var app = angular.module("movieList", ["ngRoute", "jsonpService"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/:movieList/:id?", {
            template: '<div class="list">'
                +' <ul>'
                    +' <li ng-repeat="k in data.subjects track by $index">'
                        +' <a href="#/details/{{k.id}}">'
                                    +' <img src="{{k.images.large}}" alt="">'
                                +' </a>'
                        +' <div class="meta">'
                            +' <h4><span>{{k.title}}</span> <em>{{k.reting.average}}</em></h4>'
                            +' <div class="otherinfo">类型:<span>{{k.genres.join('-')}}</span></div>'
                        +' </div>'
                    +' </li>'
                +' </ul>'
                +' <div class="paging">'
                    +' <label>总共：{{total}}条记录,第{{hoPage}}/{{page}}页;</label>'
                    +' <button ng-class="{disable:hoPage-1<=0}" ng-click="clickPage(hoPage-1)" class="prev ">上一页</button>'
                    +' <button ng-class="{disable:hoPage>=page}" ng-click="clickPage(hoPage+1)" class="next">下一页</button>'
                +' </div>'
            +' </div>'
            +' <div ng-show="loading" class="loading-box"></div>'
            +' <div ng-show="loading" class="spinner">'
                +' <div class="rect1"></div>'
                +' <div class="rect2"></div>'
                +' <div class="rect3"></div>'
                +' <div class="rect4"></div>'
                +' <div class="rect5"></div>'
            +'</div>',
            controller: "movieListController"
        });
    }]);
    app.controller("movieListController", ["$scope", "myser", "$routeParams", "$route", function ($scope, myser, $routeParams, $route) {
        $scope.query = "";
        $scope.loading = true;
        $scope.data = {};
        $scope.total = 0;
        $scope.page = 0;
        $scope.nums = 5;
        $scope.hoPage = ($routeParams.id || "1") - 0;
        $scope.hovePage = ($scope.hoPage - 1) * $scope.nums;
        myser.jsonp(
            "https://api.douban.com/v2/movie/" + $routeParams.movieList,
            { start: $scope.hovePage, count: $scope.nums, q: $routeParams.q },
            function (data) {
                $scope.loading = false;
                $scope.data = data;
                $scope.total = data.total;
                $scope.page = Math.ceil($scope.total / $scope.nums);
                $scope.$apply();
            });
        $scope.clickPage = function (num) {
            if (num <= 0 || num >= $scope.page) {
                return;
            }
            $route.updateParams({ id: num });
        }

    }]);
})(angular);