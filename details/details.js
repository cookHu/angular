(function (angular) {
    var app = angular.module("details", ["ngRoute", "jsonpService"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/details/:id", {
            template: '<div class="detail">'
            + ' < h1 > {{data.title }}</h1 > '
            + ' <div class="dt-info"> '
                + ' <div class="dti-i"><img ng-src="{{data.images.large}}" alt=""></div> '
                    + ' <div class="dti-w"> '
                        + ' <p> '
                            + ' <strong>导演：</strong> '
                            + ' <span>{{ data.name }}</span> '
                        + ' </p> '
                        + ' <p> '
                            + ' <strong>主演：</strong> '
                            + ' <span>{{ data.name }}</span> '
                        + ' </p> '
                        + ' <p><strong>类型：</strong>{{ data.genres.join("、") }}</p> '
                        + ' <p><strong>国家：</strong>{{ data.countries.join("、") }}</p> '
                        + ' <p><strong>评分：</strong>{{ data.rating.average }}</p> '
                        + ' <p><strong>时间：</strong>{{ data.year }}</p> '
                        + ' <p><strong>又名：</strong>{{ data.aka.join("、") }}</p> '
                    + ' </div> '
                + ' </div> '
                + ' <h3>剧情简介:</h3> '
                + ' <p style="color:#676767">{{ data.summary }}</p> '
            + ' </div>',
            controller: "detailsController"
        });
    }]);
app.controller("detailsController", ["$scope", "myser", "$routeParams", function ($scope, myser, $routeParams) {
    $scope.data = {};
    myser.jsonp(
        "http://api.douban.com/v2/movie/subject/" + $routeParams.id,
        {},
        function (data) {
            $scope.data = data;
            $scope.$apply();
        }
    );
}]);
})(angular);