(function(angular){
    var app = angular.module("myMode",["ngRoute"]);
    console.log(app);
    app.directive("autoActive",["$location",function($location) {
        console.log(33);
        return {
            link:function(scope,element,attr){
                element.on("click",function() {
                    element.parent().children().removeClass("active");
                    element.addClass("active");
                });
                scope.locatUrl = $location.url();
                scope.$watch("locatUrl",function(now,old) {
                    var hash = element.find("a").attr("href").substr(1);
                    if(now.startsWith(hash)) {
                        element.parent().children().removeClass("active");
                        element.addClass("active");
                    }
                })
            }
        }
    }]);
})(angular);