
	window.onload=function(){


	var oSnakeBox=document.getElementById('snakeBox');
	var oSnakeUl=oSnakeBox.getElementsByTagName('ul')[0];
	var aSnakeLi=oSnakeUl.getElementsByTagName('li');
	var oSnakeBtn=oSnakeBox.getElementsByTagName('input')[0];
	
	var oSnake=document.getElementById('snake');
	var aSnake=oSnake.getElementsByTagName('div');

	var oHeadSnake=null;
	var oFood=null;
	var snakeTimer=null;
	var gridSize=20;
	var rows=20;
	var cols=25;
	var score=0; //积分
	var dir=0; //键盘方位

	initSnake();
	function initSnake(){
		createGrids();
		// bindBtn();
	}
	function createGrids(){
		var oFrag=document.createDocumentFragment();
		var len=rows*cols;
		oSnakeBox.style.width=(gridSize+1)*cols+"px";
		oSnakeUl.style.width=(gridSize+1)*cols+"px";
		for (var i = 0; i < len; i++) {
			var oLi=document.createElement('li');
			oLi.index=i;
			oLi.style.width=gridSize+'px';
			oLi.style.height=gridSize+'px';
			oFrag.appendChild(oLi);
		};
		oSnakeUl.appendChild(oFrag);
	}
	// document.onkeydown=function(ev){   //oSnakeBtn.focus();
	// 	if (ev.keyCode==13) {
	// 		oSnakeBtn.onclick();
	// 	};
	// }
	function bindBtn(){
		var onOff=true;
		var first=true;
		oSnakeBtn.focus();
		oSnakeBtn.onclick=function(){
			if (onOff) {
				oSnakeBtn.value="暂停";
				if (first) {
					initSnakeHead();
					first=false;
				}else{
					playSnake()
				}
				
			}else{
				oSnakeBtn.value="开始";
				stopSnake();
			}
			onOff=!onOff;
		}
	}
	function initSnakeHead(){
		
		var pos=65;
		oHeadSnake=document.createElement('div');
		oHeadSnake.id="headSnake";
		oHeadSnake.style.width=gridSize+'px';
		oHeadSnake.style.height=gridSize+'px';
		oHeadSnake.index=pos;
		oSnake.appendChild(oHeadSnake);
		oHeadSnake.style.left=aSnakeLi[pos].offsetLeft+'px';
		oHeadSnake.style.top=aSnakeLi[pos].offsetTop+'px';
		createFood();
		moveSnake();
		bindDir();
	}
	function createFood(){
		oFood=document.createElement('div');
		oFood.className="food";
		oFood.style.width=gridSize+'px';
		oFood.style.height=gridSize+'px';
		oSnakeBox.appendChild(oFood);
		var arr=[];
		for (var i = 0; i < aSnakeLi.length; i++) {
			if (filterLi(aSnakeLi[i])) {
				arr.push(aSnakeLi[i])
			};
		};
		
		function filterLi(obj){
			for (var i = 0; i < aSnake.length; i++) {
				if(obj.index==aSnake[i].index){
					return false;
				}
			}
			return true;
		}
		var randomLi=arr[Math.floor(Math.random()*arr.length)];
		
		oFood.style.left=randomLi.offsetLeft+'px';
		oFood.style.top=randomLi.offsetTop+'px';
	}
	function moveSnake(){
		snakeTimer=setInterval(function(){  //做该做的事

			for (var i = aSnake.length-1; i > 0; i--) {  //注意顺序
				aSnake[i].style.left=aSnake[i-1].offsetLeft+'px';
				aSnake[i].style.top=aSnake[i-1].offsetTop+'px';
				aSnake[i].index=aSnake[i-1].index;
			};
			
			switch(dir){
				case 37:
				oHeadSnake.style.left=oHeadSnake.offsetLeft-(gridSize+1)+'px';
				oHeadSnake.index=oHeadSnake.index-1;
				break;

				case 38:
				oHeadSnake.style.top=oHeadSnake.offsetTop-(gridSize+1)+'px';
				oHeadSnake.index=oHeadSnake.index-cols;
				break;

				case 39:
				oHeadSnake.style.left=oHeadSnake.offsetLeft+(gridSize+1)+'px';
				oHeadSnake.index=oHeadSnake.index+1;
				break;

				case 40:
				oHeadSnake.style.top=oHeadSnake.offsetTop+(gridSize+1)+'px';
				oHeadSnake.index=oHeadSnake.index+cols;
				break;

				default:
				break;
			}
			for (var i = 0; i < aSnake.length; i++) {  //自己碰到自己
				if(pz(oHeadSnake,aSnake[i]) && oHeadSnake != aSnake[i]){
					gameOver();
				}
			};
			if (oHeadSnake.offsetLeft<0 || oHeadSnake.offsetTop<0 || oHeadSnake.offsetLeft>oSnakeUl.offsetWidth-oHeadSnake.offsetWidth || oHeadSnake.offsetTop>oSnakeUl.offsetHeight-oHeadSnake.offsetHeight ) {
				gameOver();
			};
			if (pz(oHeadSnake,oFood)) {
				addSnakeBody();
				createFood();
				setScore();
			};
			
		},100)
		
	}
	function bindDir(){  //做该做的事
		document.onkeydown=function(ev){
			var ev=ev || window.event;
			switch(ev.keyCode){
				case 37:
					dir=37;
				break;

				case 38:
					dir=38;
				break;

				case 39:
					dir=39;
				break;

				case 40:
					dir=40;
				break;

				default:
				break;
			}
		}
	}
	function pz(obj1,obj2){
		var l1=obj1.offsetLeft;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var t1=obj1.offsetTop;
		var b1=obj1.offsetTop+obj1.offsetHeight;

		var l2=obj2.offsetLeft;
		var r2=obj2.offsetLeft+obj2.offsetWidth;
		var t2=obj2.offsetTop;
		var b2=obj2.offsetTop+obj2.offsetHeight;

		if (l1>r2 || r1< l2 || t1 > b2 || b1 < t2) {  //没碰到
			return false;
		};
		return true;  //碰到
	}
	function addSnakeBody(){
		oFood.className="bodySnake";
		oSnake.appendChild(oFood)
	}
	function setScore(){
		var oSpan=oSnakeBox.getElementsByTagName('span')[0];
		score+=10;
		oSpan.innerHTML='积分 :'+score;
	}
	function stopSnake(){
		clearInterval(snakeTimer);
	}
	function playSnake(){
		moveSnake();
	}
	function gameOver(){
		alert('游戏失败！');
		window.location.reload();
	}
}