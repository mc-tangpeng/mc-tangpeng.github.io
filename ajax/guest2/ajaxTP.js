//method,url,opts,success
function ajax(opts) {
	var xhr = null;
	var options = {
		method : 'GET',
		url : '',
		data : '',
		async : true,
		timeout : function(){},
		success : function(){},
		error : function(){}
	}
	for(var key in opts){
		options[key] = opts[key]
	}
	if (window.XMLHttpRequest) {
		xhr = new  XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (options.method.toUpperCase() == 'GET'&& options.data) {
		var empty = '';
		for(var key in options.data ){  //options.data {'name' : 'bob', 'age' : 67}
			empty += encodeURI(key)+'='+encodeURI(options.data[key])+'&';
		}
		options.url+'?'+empty+new Date().getTime();
		
	};
	xhr.open(options.method,options.url,options.async);
	
	if (options.method.toUpperCase() == 'GET') {
		xhr.send();
	}else{
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var data='';
		for(var key in options.data){
			data += key +'='+options.data[key]+'&';
		}
		data.slice(0,-1)
		xhr.send(data);
	}
	
	

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				// alert(xhr.responseText)
				options.success && options.success(xhr.responseText);
			}else {
				alert('出错了:' + xhr.status)
			}
		};
	}
}