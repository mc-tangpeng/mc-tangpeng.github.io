window.onload = function() {
	var oUsername1 = document.getElementById('username1');
	var oVerifyUserNameMsg = document.getElementById('verifyUserNameMsg');
	var iPage = 1;
	var oUser = document.getElementById('user')
	var oUserInfo = document.getElementById('userinfo');
	var oReg = document.getElementById('reg');
	var oLogin = document.getElementById('login');

	//初始化用户状态
	updateUserStatus();
	
	function updateUserStatus() {
		var uid = getCookie('uid');
		var username = getCookie('username');

		if (uid) {
			//如果是登陆状态
			oUser.style.display = 'block';
			oUserInfo.innerHTML = username;
			oReg.style.display = 'none';
			oLogin.style.display = 'none';
		} else {
			oUser.style.display = 'none';
			oUserInfo.innerHTML = '';
			oReg.style.display = 'block';
			oLogin.style.display = 'block';
		}
	}

	showList()
	
	/*
	验证用户名
	get
		guestbook/index.php
			m : index
			a : verifyUserName
			username : 要验证的用户名
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	
	oUsername1.onblur = function() {
		// ajax('get','guestbook/index.php','m=index&a=verifyUserName&username='+this.value+'',function(data){
		// 	var d = JSON.parse(data);
		// 	oVerifyUserNameMsg.innerHTML = d.message;
		// 	if (!d.code) {
		// 		oVerifyUserNameMsg.style.color = 'green';
		// 	} else {
		// 		oVerifyUserNameMsg.style.color = 'red';
		// 	}
		// })

		ajax({
			method : 'GET',
			url : 'guestbook/index.php',
			data : {"m" : "index", "a" : "verifyUserName", "username" : this.value },
			success : function(data) {
				var d = JSON.parse(data);
				oVerifyUserNameMsg.innerHTML = d.message;
				if (!d.code) {
					oVerifyUserNameMsg.style.color = 'green';
				} else {
					oVerifyUserNameMsg.style.color = 'red';
				}
			}
		})
	}

	/*
	用户注册
	get/post
		guestbook/index.php
			m : index
			a : reg
			username : 要注册的用户名
			password : 注册的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	var oPassword1 = document.getElementById('password1');
	var oBtnReg = document.getElementById('btnReg');
	oBtnReg.onclick = function() {
		// ajax('post','guestbook/index.php','m=index&a=reg&username='+encodeURI(username1.value)+'&password='+password1.value+'',function(data){
		// 	var d = JSON.parse(data);
		// 	alert(d.message)
		// })
		ajax({
			method : 'post',
			url : 'guestbook/index.php',
			data : {"m" : "index", "a" : "reg", "username" : username1.value, "password" : password1.value },
			success : function(data) {
				var d = JSON.parse(data);
				alert(d.message)
			}
		})
	}
	/*
	用户登陆
	get/post
		guestbook/index.php
			m : index
			a : login
			username : 要登陆的用户名
			password : 登陆的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	var oUsername2 = document.getElementById('username2');
	var oPassword2 = document.getElementById('password2');
	var oBtnLogin = document.getElementById('btnLogin');
	
	oBtnLogin.onclick = function() {
		// ajax('get','guestbook/index.php','m=index&a=login&username='+encodeURI(oUsername2.value)+'&password='+password2.value+'',function(data){
		// 	var d = JSON.parse(data);
		// 	if (!d.code) {
		// 		updateUserStatus();
		// 	}else {
		// 		alert(d.message)
		// 	}
			
		// })
		ajax({
			method : 'get',
			url : 'guestbook/index.php',
			data : {"m" : "index", "a" : "login", "username" : username2.value, "password" : password2.value },
			success : function(data) {
				var d = JSON.parse(data);
				if (!d.code) {
					updateUserStatus();
				}else {
					alert(d.message)
				}
			}
		})
	}

	/*
	用户退出
	get/post
		guestbook/index.php
			m : index
			a : logout
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	var oLogout = document.getElementById('logout');
	
	oLogout.onclick = function() {
		// ajax('get','guestbook/index.php','m=index&a=logout',function(data) {
		// 	var d = JSON.parse(data);
		// 	if (!d.code) {
		// 		updateUserStatus();
		// 	}else {
		// 		alert(d.message)
		// 	}
		// })
		ajax({
			method : 'get',
			url : 'guestbook/index.php',
			data : {"m" : "index", "a" : "logout"},
			success : function(data) {
				var d = JSON.parse(data);
				if (!d.code) {
					updateUserStatus();
				}else {
					alert(d.message)
				}
			}
		})
		return false;
	}
	/*
	留言
	post
		guestbook/index.php
			m : index
			a : send
			content : 留言内容
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
					{
						cid : 留言id	
						content : 留言内容 
						uid : 留言人的id
						username : 留言人的名称
						dateline : 留言的时间戳(秒)
						support : 当前这条留言的顶的数量
						oppose : 当前这条留言的踩的数量
					}
				message : 返回的信息 具体返回信息
			}
	*/

	var oContent = document.getElementById('content');
	var oBtnPost = document.getElementById('btnPost');
	var oList = document.getElementById('list')

	oBtnPost.onclick = function() {
		// ajax('post','guestbook/index.php','m=index&a=send&content='+encodeURI(oContent.value)+'',function(data){
		// 	var d = JSON.parse(data);
		// 	if (!d.code) {  //留言成功
		// 		creatList(d.data , true)
		// 	} else {
		// 		alert(d.message)
		// 	}
		// })
		ajax({
			method : "post",
			url : "guestbook/index.php",
			data : {"m" : "index", "a" : "send", "content" : encodeURI(oContent.value)},
			success : function(data) {
				var d = JSON.parse(data);
				if (!d.code) {  //留言成功
					creatList(d.data , true)
				} else {
					alert(d.message)
				}
			}
		})
	}
	function creatList(data,insert) {
		var oDl = document.createElement('dl');
		oDl.innerHTML = '<dt>'+
			'<strong>'+data.username+'</strong> 说 :'+
		'</dt>'+
		'<dd>'+encodeURI(data.content)+'</dd>'+
		'<dd class="t">'+
			'<a href="javascript:;" id="support">顶(<span>'+data.support+'</span>)</a>'+
			 '|' +
			'<a href="javascript:;" id="oppose">踩(<span>'+data.oppose+'</span>)</a>'+
		'</dd>';
		if (insert) {
			oList.insertBefore(oDl,oList.children[0] || null)
		} else {
			oList.appendChild(oDl)
		}
		
	}
	/*
	初始化留言列表
	get
		guestbook/index.php
			m : index
			a : getList
			page : 获取的留言的页码，默认为1
			n : 每页显示的条数，默认为10
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
					{
						cid : 留言id	
						content : 留言内容 
						uid : 留言人的id
						username : 留言人的名称
						dateline : 留言的时间戳(秒)
						support : 当前这条留言的顶的数量
						oppose : 当前这条留言的踩的数量
					}
				message : 返回的信息 具体返回信息
			}
	*/
	var oShowMore = document.getElementById('showMore')
	function showList() {
		// ajax('get','guestbook/index.php','m=index&a=getList&n=3&page='+iPage,function(data){
		// 	var d = JSON.parse(data);
		// 	var arr = d.data;
		// 	if (arr) {
		// 		for (var i = 0; i < arr.list.length; i++) {
		// 			creatList(arr.list[i])
		// 		};
		// 	} else {
		// 		if (iPage == 1) {
		// 			oList.innerHTML = '现在还没有留言，快来抢沙发...';
		// 		}
		// 		oShowMore.style.display = 'none';
		// 	}
			
		// })
		ajax({
			method : 'get',
			url : 'guestbook/index.php',
			data : {"m" : "index", "a" : "getList", "n" : 3, "page" : iPage},
			success : function(data) {
				var arr = d.data;
				if (arr) {
					for (var i = 0; i < arr.list.length; i++) {
						creatList(arr.list[i])
					};
				} else {
					if (iPage == 1) {
						oList.innerHTML = '现在还没有留言，快来抢沙发...';
					}
					oShowMore.style.display = 'none';
				}
			}
		})
	}

	//点击显示更多的内容
	oShowMore.onclick = function() {
		iPage++;
		showList();
	}
}
function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i = 0; i < arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if (arr2[0] == key ) {

			return arr2[1]

		};
	};
}

