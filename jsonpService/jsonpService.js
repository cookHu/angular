(function (angular) {
    // jsonp服务模块 - 由于接口不支持angular的jsonp请求方式 进行封装jsonp请求
    var app = angular.module("jsonpService", []);
    app.service("myser", [function () {
        this.jsonp = function (url, argu, fn) {
            var scrip = document.createElement("script");
            var str = '';
            for (var k in argu) {
                str += k + "=" + argu[k] + "&";
            }
            var fnname = "fn" + (Math.ceil(Math.random() * 10000)) + (Math.ceil(Math.random() * 10000)) + "123";
            window[fnname] = function (data) {
                fn(data);
            }
            scrip.src = url + "?" + str + "callback=" + fnname;
            document.body.appendChild(scrip);
        }
    }]);
})(angular);