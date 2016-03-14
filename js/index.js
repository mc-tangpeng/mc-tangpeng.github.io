
window.onload=function(){
	/** frame start**/
	var oHeader=$('header');
	var oNav=$('nav');
	var aNavLi=nav.getElementsByTagName('li');
	var oArrow=$('downArrow');
	var oMenu=$('menu');
	var oContainer=$('container');
	var oContentMain=$('contentMain');
	var aColumn=getByClass(oContentMain,'column');
	var aColumnContent=getByClass(oContentMain,'columnContent');
	var oHomeContent1=getByClass(aColumnContent[0],'columnContent1');
	var oHomeContent2=getByClass(aColumnContent[0],'columnContent2');
	var oJsCaseContent=$('case');
	var oJsCaseContent3=getByClass(oJsCaseContent,'columnContent3')[0];
	var oPlanContent=$('plan');
	var oPlanContent3=getByClass(oPlanContent,'columnContent3')[0];
	var oNotesContent=$('notes');
	var oMeContent=$('me');
	var oLoad=$('loading');

	// var oStage=$('stage');
	// var oStageWrap=$('stageWrap');
	// var aStageLi=oStageWrap.getElementsByTagName('li');
	// var moreBtn=oStage.getElementsByTagName('input')[0];

	var iWrapHeight=600; //网页内容高
	var iNow=0;  //用作与索引相关的接口
	var prevIndex=0;
	var iContentHeight=0;


	loading();
	binNav(oNav);
	contentAuto();
	columentContenAuto();
	mouseScroll(oContentMain);
	homeContent();
	jsCaseContent();
	planContent();
	aboutMeContent();
	menu();

	

	window.onresize=function(){
		/** 只有与iContentHeight有关，在resize时都要重新加载 **/
		contentAuto();
		columentContenAuto();
		oContentMain.style.top=-iNow*iContentHeight+'px'; //因为当缩放时，iContentHeight不断变化
	}
	function binNav(nav){  //绑定nav，执行navLi的事件
		var oDiv=aNavLi[0].getElementsByTagName('div')[0];
		oDiv.style.width='100%';
		oArrow.style.left=aNavLi[0].offsetLeft+aNavLi[0].offsetWidth/2-oArrow.offsetWidth/2+'px';
		
		for (var i = 0; i < aNavLi.length; i++) {
			aNavLi[i].index=i;
			aNavLi[i].onclick=function(){
				prevIndex=iNow;
				iNow=this.index;
				toMove(this.index);
			}
		}
	}
	function toMove(index){  //navLi的事件
		for (var i = 0; i < aNavLi.length; i++) {
			var oDiv=aNavLi[i].getElementsByTagName('div')[0];
			oDiv.style.width="";  //必须等于空，等于其它任何值都不行
		}
		var oDiv=aNavLi[index].getElementsByTagName('div')[0];
		oDiv.style.width='100%';
		oArrow.style.left=aNavLi[index].offsetLeft+aNavLi[index].offsetWidth/2-oArrow.offsetWidth/2+'px';
		oContentMain.style.top=-index*iContentHeight+'px';
		menu();

		if( cjAnimation[index].inAn ){
			cjAnimation[index].inAn();
		}
		if( cjAnimation[prevIndex].outAn ){
			cjAnimation[prevIndex].outAn();
		}
	}
	function contentAuto(){  //内容区域和各个栏目的宽高自适应,
		iContentHeight=viewHeight()-oHeader.offsetHeight;
		oContainer.style.height=iContentHeight+'px';
		for (var i = 0; i < aColumn.length; i++) {
			aColumn[i].style.height=iContentHeight+'px';
			
		}

	}
	function columentContenAuto(){   //栏目内容的height和marginTop
		var iHeight=iWrapHeight-oHeader.offsetHeight;
		var mt=(iContentHeight-iHeight)/2
		for (var i = 0; i < aColumnContent.length; i++) {
			aColumnContent[i].style.height=iHeight+'px';
			aColumnContent[i].style.marginTop=mt+'px';  //marginTop失效，可以给父级加overflow,但是会有其它一些问题
		};
		
	}
	function mouseScroll(obj){  //鼠标滚动屏幕，事件加在oContentMain
		var oBtn=false;
		var scrollTimer=null;
		if (obj.addEventListener) {
			obj.addEventListener('DOMMouseScroll',show,false);
		}
		obj.onmousewheel=show;
		
		function show(ev){
			var ev=ev || window.event;
			clearTimeout(scrollTimer);
			scrollTimer=setTimeout(function(){
				if (ev.detail) {
					oBtn=ev.detail < 0 ? true : false;  //-3 up  ;  3 down
				}else{
					oBtn=ev.wheelDelta > 0 ? true : false;  //120 up; -120 down
				}
				if ( (iNow==0 && oBtn) || (iNow==aColumn.length-1 && !oBtn) ) {return};
				prevIndex=iNow;
				if (oBtn) {  //up
					if(iNow != 0 ){
						iNow--;
					}
				}else{  //down
					if(iNow !=  aColumn.length-1){
						iNow++;
					}
				}
				toMove(iNow);
			},200)
			
		}
	}
	/***右侧menu**/
	function menu(){
		var aLi=oMenu.getElementsByTagName('li');
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].className='';
		};
		aLi[iNow].className="active";
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].index=i;
			aLi[i].onclick=function(){
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].className='';
				};
				this.className="active";
				prevIndex=iNow;
				iNow=this.index;
				toMove(iNow)
			}
		};
	}
	
	

	//出场入场动画
	
	var cjAnimation=[
			{
				inAn : function(){
					oHomeContent1[0].style.opacity=1;
					oHomeContent2[0].style.opacity=1;
					setStyle(oHomeContent1[0],'transform','translate(0,0)');
					setStyle(oHomeContent2[0],'transform','translate(0,0)');
				},
				outAn : function(){
					// oHomeContent1.style.transform="transition"
					oHomeContent1[0].style.opacity=0;
					oHomeContent2[0].style.opacity=0;
					setStyle(oHomeContent1[0],'transform','translate(0,-150px)');
					setStyle(oHomeContent2[0],'transform','translate(0,100px)');
				}
			},
			{
				//oJsCaseContent
				inAn : function(){
					var plane1=getByClass(oJsCaseContent,'plane1')[0];
					var plane2=getByClass(oJsCaseContent,'plane2')[0];
					var plane3=getByClass(oJsCaseContent,'plane3')[0];
					setStyle(plane1,'transform','translate(0,0)');
					setStyle(plane2,'transform','translate(0,0)');
					setStyle(plane3,'transform','translate(0,0)');
				},
				outAn : function(){
					var plane1=getByClass(oJsCaseContent,'plane1')[0];
					var plane2=getByClass(oJsCaseContent,'plane2')[0];
					var plane3=getByClass(oJsCaseContent,'plane3')[0];

					setStyle(plane1,'transform','translate(-200px,-200px)');
					setStyle(plane2,'transform','translate(-200px,200px)');
					setStyle(plane3,'transform','translate(200px,-200px)');
				}
			},
			{
				//oNotesContent
				inAn : function(){
					var pencel1=getByClass(oNotesContent,'pencel1')[0];
					var pencel2=getByClass(oNotesContent,'pencel2')[0];
					var pencel3=getByClass(oNotesContent,'pencel3')[0];
					setStyle(pencel1,'transform','translate(0,0)');
					setStyle(pencel2,'transform','translate(0,0)');
					setStyle(pencel3,'transform','translate(0,0)');
				},
				outAn : function(){
					var pencel1=getByClass(oNotesContent,'pencel1')[0];
					var pencel2=getByClass(oNotesContent,'pencel2')[0];
					var pencel3=getByClass(oNotesContent,'pencel3')[0];

					setStyle(pencel1,'transform','translate(0,-130px)');
					setStyle(pencel2,'transform','translate(0,100px)');
					setStyle(pencel3,'transform','translate(0,100px)');
				}
			},
			{
				//oPlanContent planImg
				inAn : function(){
					var planImgs=getByClass(oPlanContent,'planImg');
					
					setStyle(planImgs[0],'transform','rotate(0deg)');
					setStyle(planImgs[1],'transform','rotate(0deg)');
				},
				outAn : function(){
					var planImgs=getByClass(oPlanContent,'planImg');
					
					setStyle(planImgs[0],'transform','rotate(45deg)');
					setStyle(planImgs[1],'transform','rotate(-45deg)');
				}
			},
			{
				//oMeContent 
				inAn : function(){
					var oMeContent1=getByClass(me,'columnContent1')[0];
					var oMeContent2=getByClass(me,'columnContent2')[0];

					setStyle(oMeContent1,'transform','translate(0,0)');
					setStyle(oMeContent2,'transform','translate(0,0)');
					
				},
				outAn : function(){
					var oMeContent1=getByClass(me,'columnContent1')[0];
					var oMeContent2=getByClass(me,'columnContent2')[0];

					setStyle(oMeContent1,'transform','translate(0,200px)');
					setStyle(oMeContent2,'transform','translate(0,-100px)');
				}
			}
	]
	for (var i = 0; i < cjAnimation.length; i++) {
		cjAnimation[i].outAn();
	};
	function loading(){
		var oSpan=oLoad.getElementsByTagName('span')[0];
		var aDiv=oLoad.getElementsByTagName('div');
		var arr=['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','pencel1.png','pencel2.png','pencel3.png','plane1.png','plane1.png','plane1.png','ie11.png','firefox.png','chrome.png','sorry.jpg','zoomico.png','pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','js.jpg','practice.jpg','moble.jpg']
		var iNow=0;
		
		for (var i = 0; i < arr.length; i++) {
			var objImg=new Image();
			objImg.src='img/'+arr[i];
			
			objImg.onload=function(){
				iNow++;
				oSpan.style.width = iNow/arr.length*100 + '%';

			}
		};

		oSpan.addEventListener('webkitTransitionend',spanChange,false);
		oSpan.addEventListener('transitionend',spanChange,false);
		
		function spanChange(){
			if (oSpan.style.width=='100%') {
				oSpan.style.display='none';
				aDiv[0].style.height = 0;
				aDiv[1].style.height = 0;
			};
		}

		aDiv[0].addEventListener('webkitTransitionend',divChange,false);
		aDiv[0].addEventListener('transitionend',divChange,false);

		function divChange(){
			cjAnimation[0].inAn();
		}
	}
	// cjAnimation[3].outAn();
	
	// setTimeout(function(){
	// 	cjAnimation[3].inAn();
		
	// },4000);
	/** frame end**/

	/** js home start **/
	function homeContent(){  //home内容
		var oUl1=oHomeContent1[0].getElementsByTagName('ul')[0];
		var oUl2=oHomeContent2[0].getElementsByTagName('ul')[0];
		var aLi1=oUl1.getElementsByTagName('li');
		var aLi2=oUl2.getElementsByTagName('li');
		var oldIndex=0;
		var iHomeNow=0;
		var data=[
			{'title':'{white-space:nowrap}','text':'前端，一条不归路~'},
			{'title':'&lt;strong&gt; me &lt;/strong&gt;','text':'不断的学习，才能变强~'},
			{'title':'&lt;h5&gt; 你可知道？ &lt;/h5&gt;','text':'江湖上的传说，都不属于我'},
			{'title':'console.log(“这就是我”)','text':'爱前端、爱电商、爱钓鱼~'}
		]
		createData()
		function createData(){
			for (var i = 0; i < data.length; i++) {
				var oLi1=document.createElement('li');
				oLi1.innerHTML='<h3><span>'+(data[i].title)+'</span><br /><span>'+(data[i].text)+'</span></h3>'
				
				var oLi2=document.createElement('li');
				if (i==0) {
					oLi1.className='active';
					oLi2.className='active';
				}

				oUl1.appendChild(oLi1);
				oUl2.appendChild(oLi2);
			};
		}
		for (var i = 0; i < aLi2.length; i++) {
			aLi2[i].index=i;
			aLi2[i].onmouseover=function(){
				clearInterval(timer)
				for (var i = 0; i < aLi2.length; i++) {
					aLi2[i].className='';
				};
				this.className='active';
				if (oldIndex < this.index) {  //left 》 right
					aLi1[oldIndex].className="leftHidden";
					aLi1[this.index].className="rightShow";

				}else if(oldIndex > this.index ){  //right  > left
					aLi1[oldIndex].className="rightHidden";
					aLi1[this.index].className="leftShow";
				}
				oldIndex=this.index;
				iHomeNow=this.index;
			}
		}
		var timer=setInterval(change,4000);
		function change(){
			iHomeNow++;
			if (iHomeNow == aLi1.length) {
				iHomeNow=0;
			}
			for (var i = 0; i < aLi2.length; i++) {
				aLi2[i].className='';
			};
			aLi2[iHomeNow].className='active';
			aLi1[iHomeNow].className='active';

			aLi1[oldIndex].className="leftHidden";
			aLi1[iHomeNow].className="rightShow";

			oldIndex=iHomeNow;
		}
		oUl1.onmouseover=function(){
			clearInterval(timer)
		}
		oUl1.onmouseout=function(){
			timer=setInterval(change,4000);
		}
		window.onblur=function(){
			clearInterval(timer);
		}
		window.onfocus=function(){
			clearInterval(timer);
			timer=setInterval(change,4000);
		}
	}
	/** js home end **/

	/** jsCase start **/
	function jsCaseContent(){  //js案例
		// oJsCaseContent3
		var w=120; 
		var oUl= oJsCaseContent3.getElementsByTagName('ul')[0];
		var data=[
			{'imgSrc':'img/huawei.png','text':'华为官网轮播图','href':'jscase/huawei/huawei.html'},
			{'imgSrc':'img/bee.png','text':'小蜜蜂游戏','href':'jscase/bee.html'},
			{'imgSrc':'img/snake.png','text':'贪吃蛇','href':'jscase/snake.html'},
			{'imgSrc':'img/clear.png','text':'消除相同的图形','href':'jscase/memory/memory.html'},
			{'imgSrc':'img/youku.png','text':'优酷电视频道轮播','href':'jscase/youku/youku.html'},
			{'imgSrc':'img/timer.png','text':'图片时钟','href':'jscase/time/timeSnake.html'},
			{'imgSrc':'img/keepMove.png','text':'无缝滚动','href':'jscase/keepMove/step1.html'},
			{'imgSrc':'img/puzzle.png','text':'拼图游戏','href':'jscase/puzzle.html'},
			{'imgSrc':'img/qiang.png','text':'抢购','href':'jscase/time/qianggou.html'},
			{'imgSrc':'img/scale.png','text':'图片放大','href':'notes/miaov/j19/text4.html'},
			{'imgSrc':'img/miaov.png','text':'miaov课堂','href':'miaov.html'},
			{'imgSrc':'img/more.png','text':'更多...','href':'jscase.html'}
		]
		createData()
		function createData(){
			for (var i = 0; i <5; i++) {  //线条
				var oDiv=document.createElement('div');
				oDiv.className="caseLine";

				
				oJsCaseContent3.appendChild(oDiv);
				oDiv.style.left=i*w+'px';
			}
			for (var i = 0; i < data.length; i++) {
				var oLi=document.createElement('li');
				oLi.innerHTML='<a href=" '+(data[i].href)+' " target="_blank"> <div class="caseBefore" style="background:url('+(data[i].imgSrc)+') center center no-repeat"></div><div class="caseAfter">'+(data[i].text)+'</div> </a>'
				oUl.appendChild(oLi);
			};
		}
		
	}
	/** jsCase end **/

	/** plan start**/
	//oPlanContent3
	function planContent(){
		var aUl=oPlanContent3.getElementsByTagName('ul');
		
		var aImg=oPlanContent3.getElementsByTagName('img')
		for (var i = 0; i < aUl.length; i++) {
			change(aUl[i],aImg[i])
		};
		function change(ul,img){

			var w=ul.offsetWidth/2;
			var h=ul.offsetHeight/2;
			// var src=ul.dataset.src;  居然ie10都都不支持，，好吧，太前卫了
			var src='img/pic4.jpg';
			var posData=[
				{'top':'-87','left':'0'},
				{'left':'130','top':'0'},
				{'left':'-130','top':'0'},
				{'top':'87','left':'0'}
			]
			for (var i = 0; i < 4; i++) {
				var oLi=document.createElement('li');
				oLi.style.width=w+'px';
				oLi.style.height=h+'px';
				oLi.style.background='url('+( src )+') '
				oLi.style.backgroundPosition=' '+( -i%2 * w )+'px '+( - Math.floor(i/2) * h )+'px ';
				oLi.style.left= posData[i].left+'px';
				oLi.oldleft=posData[i].left;
				oLi.style.top= posData[i].top+'px';
				oLi.oldtop=posData[i].top;


				ul.appendChild(oLi);
				
				
			};
			var data = [
				{ name : 'top' , value : 0 },
				{ name : 'left' , value :0 },
				{ name : 'left' , value : 0},
				{ name : 'top' , value : 0 }
			];
			var aImg=ul.getElementsByTagName('li');

			ul.onmouseover=function(){
				for (var i = 0; i < aImg.length; i++) {
					aImg[i].style[ data[i].name ]=0+'px';

				};
				setStyle(img,'transform','scale(1)')
			}
			ul.onmouseout=function(){
				for (var i = 0; i < aImg.length; i++) {
					aImg[i].style[ data[i].name ]=aImg[i]['old'+data[i].name] +'px';

				};
				setStyle(img,'transform','scale(1.3)')
			}
		}
		
		
	
		
	}
	/** plan end**/

	/**关于我 start  **/
	
	var lenOfRli=8;  //初始化时旋转元素的个数
	

	var rData=[
				{'bgSrc':'img/r1.jpg','title':'关于我','text':'你好! 我叫唐鹏，男，今年22岁，本科学历，一名2016年的应届毕业生，求职方向是web前端开发实习生。'},		
				{'bgSrc':'img/r2.jpg','title':'就读学校','text':'湘潭大学兴湘学院，欢迎大家来毛主席的家乡玩，来湘大玩啊，湘大很美的，就是湖南有点热。本科专业是电子商务，我对电商也很感兴趣，特别是那些互联网思维。'},		
				{'bgSrc':'img/r3.jpg','title':'设计理念','text':'不管什么样的网站，最后设计出来，落脚点都是用户。所以，我追求的设计理念是：简约、专注、极致、注重用户体验、用户思维。'},		
				{'bgSrc':'img/r4.jpg','title':'目前技能','text':'能写静态页面，配合js，完成一些效果，目前正在学习bootstrap，开发响应式布局。jQ有过了解，但没有深入，大约在9月中旬开始学习。web前端，一天不学习，就会被淘汰。[痛并快乐着]'},		
				{'bgSrc':'img/r5.jpg','title':'性格','text':'性格开朗，和他人聊得开。对待生活，积极乐观；对待他人，热情、尊重。对待工作，细心，负责。我相信没有沟通解决不了的争论。'},
				{'bgSrc':'img/r10.jpg','title':'联系方式','text':'求职目标是web前端开发实习生，如果您有一份工作，觉得我合适，您可以通过电话联系我：15974469194，或者：QQ：1210255803。'},		
				{'bgSrc':'img/r6.jpg','title':'不足之处','text':'就web前端来说，目前所掌握的技能太少了，对后台的了解也缺乏，任重道远，虽然道路是坎坷的，但我坚信前途是光明的。'},		
				{'bgSrc':'img/r7.jpg','title':'爱好','text':'最大的爱好，是钓鱼。其次，还有跑步、打乒乓球、电商方面的东西，玩些小游戏，看电影啊，听歌啊，看天天向上，暴走大事件（唐马儒真的是男神），轻松时刻。。。。。'},		
				{'bgSrc':'img/r8.jpg','title':'家乡','text':'我的家乡是5A级的旅游胜地——张家界。额，遗憾，我家在乡下，我还并没有去张家界那些旅游景点玩过，不过欢迎你们来玩。'},		
				{'bgSrc':'img/r9.jpg','title':'信念','text':'受文科政治的影响，最大的信念就是”道路是坎坷的，前途是光明的，所以我们要对前途充满希望“，受电商的影响，信念是”免费永远是最贵的“和”不忘初心，方得始终“'},
				{'bgSrc':'img/r11.jpg','title':'交个朋友','text':'你好! 咱们交个朋友吧'}		
			]

	function aboutMeContent(){
		var me=$('me');
		var oMeContent1=getByClass(me,'columnContent1')[0];
		var oUl=getByClass(me,'columnContent2')[0].getElementsByTagName('ul')[0];
		var aLi=oUl.getElementsByTagName('li');
		var aImg=oMeContent1.getElementsByTagName('img');
		var liWidth=aLi[0].offsetWidth;
		oUl.style.width=aLi.length*liWidth+'px';
		document.onmousemove=function(ev){
			var ev=ev || window.event;
			for (var i = 0; i < aImg.length; i++) {
				var c=posMouse(ev,aImg[i]);
				var scaleX=1-c/300;
				
				if (scaleX<0.5) {
					scaleX=0.5
				};
			
				aImg[i].style.width=scaleX*128+'px';
			};

		}
		function posMouse(ev,obj){  //鼠标到图片中点的距离
			var a=ev.clientX-posLeft(obj)-obj.offsetWidth/2;
			var b=ev.clientY-posTop(obj)-obj.offsetHeight/2;
			var c=Math.sqrt(a*a+b*b);
			return c;

		}
		for (var i = 0; i < aImg.length; i++) {
			aImg[i].index=i;
			bindImg( aImg[i] )
		};
		function bindImg(img){
			img.onclick=function(){
				var iLeft=-img.index*liWidth;
				
				startMove(oUl,{left:iLeft})
			}
		}
	}		
	// moreBtn.onclick=function(){
		
	// 	oStageWrap.innerHTML='';
	// 	lenOfRli+=1
	// 	initRli();
	// 	if (lenOfRli==rData.length) {  //      lenOfRli==11
	// 		moreBtn.disabled=true;
	// 		delRli();
	// 	}
	// }
	// initRli(); //初始化旋转元素
	// function initRli(){

	// 	var ry=360/lenOfRli;  //旋转角度
	// 	var tz = Math.round( ( oStageWrap.offsetWidth / 2 ) /  Math.tan( ry / 2 / 180 * Math.PI ) ) + 30;  //
		
	// 	// r = 64 / Math.tan(20 / 180 * Math.PI) ≈ 175.8
	// 	for (var i = 0; i < lenOfRli; i++) {
	// 		var oLi=document.createElement('li');
	// 		// oLi.style.background='url('+rData[i].bgSrc+') no-repeat';
	// 		oLi.style.transform='rotateY('+(i*ry)+'deg) translateZ('+(tz)+'px)';
	// 		oLi.innerHTML='<h2>'+(rData[i].title)+'</h2><p>'+(rData[i].text)+'</p>'
	// 		oStageWrap.appendChild(oLi)
	// 	};
	// 	startRotate(ry)
	// }

	// function startRotate(ry){
	// 	var oldIndex=0;
	// 	for (var i = 0; i < aStageLi.length; i++) {
	// 		aStageLi[i].index=i;
	// 		aStageLi[i].onclick=function(){
	// 			var iRY=this.index-oldIndex //开始旋转是的索引值
	// 			// iRY可以做些处理
	// 			oStageWrap.style.transform="rotateY("+(-iRY*ry)+"deg)";
	// 			console.log(iRY,this.index)
	// 			iRY=this.index;
	// 		}
	// 	};
	// }
	// function delRli(){
	// 	var oTisp=document.createElement('div');

	// 	oTisp.className="tips";
	// 	oStage.appendChild(oTisp);
	// 	for (var i = 0; i < aStageLi.length; i++) {
	// 		startMove(aStageLi[i],{height:0,width:0,opacity:0},function(){
	// 			oTisp.style.transform="rotateY(0)";
	// 			startMove(oTisp,{height:440,width:oStage.offsetWidth})
	// 		})
	// 	}
	// 	oTisp.innerHTML='<p>Hi, 相见不如偶遇！交个朋友吧，咱们可以秉烛夜谈、从诗词歌赋，聊到人生哲理~~^ ~~ ^</p><input type="button" value="残忍拒绝" /><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1210255803&site=qq&menu=yes">立刻开聊</a>';
	// 	var oBtn=oTisp.getElementsByTagName('input')[0];
	// 	oBtn.onclick=function(){  //还原所有设置
	// 		startMove(oTisp,{height:0},function(){
	// 			oStage.removeChild(oTisp);
	// 			oStageWrap.innerHTML='';
	// 			lenOfRli=7;
	// 			initRli();
	// 			moreBtn.disabled=false;
	// 		})
	// 	}

	// }
	/** 关于我 end**/
	/** 一些框架  start**/
	function startMove(obj,json,endFn){
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bBtn=true;
			for(var attr in json){
				
				var iCur=0;
				if (attr=='opacity') {
					iCur=Math.round(parseFloat(getStyle(obj,attr))*100)
				}else{
					iCur=parseInt(getStyle(obj,attr));
				};
				var iSpeed=(json[attr]-iCur)/6;
				iSpeed=iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);

				if (iCur != json[attr]) bBtn=false;

				if (attr=='opacity') {
					obj.style.opacity=(iCur+iSpeed)/100;
					obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				}else{
					obj.style[attr]=iCur+iSpeed+'px';
				};

			}
				if (bBtn) {
					clearInterval(obj.timer);
					//alert(111)
					endFn && endFn();
				};
			
		},30)
		
		
	}
	function posLeft(obj){
		var result=0;
		while(obj){
			result+=obj.offsetLeft;
			obj=obj.offsetParent;
		}
		return result;
	}
	function posTop(obj){
		var result=0;
		while(obj){
			result+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return result;
	}
	function viewWidth(){
		return window.innerWidth || document.documentElement.clientWidth;
	}
	function viewHeight(){
		return window.innerHeight || document.documentElement.clientHeight;
	}
	function $(id){
		return document.getElementById(id);
	}
	function getStyle(obj,attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
	}
	function setStyle(obj,attr,value){
		obj.style[attr] = value;
		obj.style['webkit'+attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
	}
	function getByClass(oParent,sClass){
		var elems=oParent.getElementsByTagName('*');
		var result=[];
		for (var i = 0; i < elems.length; i++) {
			var aClassName=elems[i].className.split(' ');
			for (var j = 0; j < aClassName.length; j++) {
				if(aClassName[j]==sClass){
					result.push(elems[i])
				}
			}
		}
		return result;
	}
	/** 一些框架 end **/
}