(function() {
	//弹框区
	//start
	
	
	
	//end
	//打开连接执行的函数
	function open(event){
		console.log('WebSocket连接成功');
	}
	//服务端推送消息执行的函数
	function message(event){
		//alert('WebSocket收到消息：%c' + event.data, 'color:green');
		alert(event.data,'color:green');
	}
	//关闭连接执行的函数
	function close(event){
		console.log('WebSocket关闭连接');
	}
	//建立websocket连接
	/**
	 * WebSocket客户端
	 *
	 * 使用说明：
	 * 1、WebSocket客户端通过回调函数来接收服务端消息。例如：webSocket.onmessage
	 * 2、WebSocket客户端通过send方法来发送消息给服务端。例如：webSocket.send();
	 */
	if (window.WebSocket) {
		alert("您的浏览器支持websocket");
	} else {
		alert("您的浏览器不支持websocket");
	}
	/**
	 * WebSocket客户端 PS：URL开头表示WebSocket协议 中间是域名端口 结尾是服务端映射地址
	 */
	var user = JSON.parse(localStorage.getItem('userInfo'));
	var webSocket = new WebSocket('ws://192.168.42.54:8801/chat/' + user.userId);
	/**
	 * 通信失败
	 */
	webSocket.onerror = function(event) {
		console.log('WebSocket发生异常');
		/**
		 * 重新连接:因为本地电脑连接websocket是要用localhost
		 */
		/**
		 * WebSocket客户端 PS：URL开头表示WebSocket协议 中间是域名端口 结尾是服务端映射地址
		 */
		webSocket = new WebSocket('ws://localhost:8801/chat/' + user.userId);
		/**
		 * 当服务端打开连接
		 */
		webSocket.onopen = function(event) {
			open(event);
		};

		/**
		 * 当服务端发来消息：1.广播消息 2.更新在线人数
		 */
		webSocket.onmessage = function(event) {
			message(event);
		};

		/**
		 * 关闭连接
		 */
		webSocket.onclose = function(event) {
			close(event);
		};

		/**
		 * 通信失败
		 */
		webSocket.onerror = function(event) {
			console.log('WebSocket发生异常');

		};
	};
	/**
	 * 当服务端打开连接
	 */
	webSocket.onopen = function(event) {
		open(event);
	};

	/**
	 * 当服务端发来消息：1.广播消息 2.更新在线人数
	 */
	webSocket.onmessage = function(event) {
		message(event);
	};

	/**
	 * 关闭连接
	 */
	webSocket.onclose = function(event) {
		close(event);
	};

	/**
	 * 通过WebSocket对象发送消息给服务端
	 */
	function sendMsgToServer() {
		webSocket.send(JSON.stringify({
			msg: "您好啊"
		}));
	}
	/**
	 * 清屏
	 */
	function clearMsg() {
		$(".message-container").empty();
	}

	/**
	 * 使用ENTER发送消息
	 */
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		e.keyCode === 13 && sendMsgToServer();
	};



	//校验手机号码格式是否正确
	function checkPhone(phone) {
		var zzbds = /^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/;
		if (!zzbds.test(phone)) {
			return false;
		}
		return true;
	}
	//获取url里面的参数
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return (false);
	}
})()
