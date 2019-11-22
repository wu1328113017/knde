//域名配置
var HOST = "localhost:8080";
//获取到token
var token = typeof $.cookie('token') == 'undefined' ? null : $.cookie('token');