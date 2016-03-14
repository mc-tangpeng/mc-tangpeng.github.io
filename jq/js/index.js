//网页尺寸 ：1010 * 600
jQuery.noConflict();

(function($) { 
  $(function() {
  	var $headerNav = $('.headerNav');
  	var $banner = $('.banner');
  	var $bannerLi = $('.banner').find('li');
    var $bannerBtn = $('.bannerBtn').find('a');
    var bannerPrev = 0;
    var bannerWidth = 1010;
    var bannerTimer = null;
    var $container = $('.container');
    var $columns = $('.columns');
    var $contents = $('.content');
    var $main = $('.main');
   	var viewHeight = $(window).height();
   	var $lgUl1 = $('.ul1');
   	var $lgUl2 = $('.ul2');
   	var $lgUl3 = $('.ul3');
   	var $lgEm = $('.icon');
   	var $oCase = $('.case')
   	var $range = $('.range').find('div');
    var $sideBar = $('.sideBar');
    var $loading =$('.loading').find('div');
    var $ball = $('.ball');
   	var iIndex = 0; //banner
    var prevIndex = 0;
   	var iNow = 0;
    var iPage = 0;
    var iPress = 0;
    var pageTimer = null;
    var oContainer = document.getElementById('container');


   	init();
   	// moveTo(0)
    $(window).resize(function() {
      columnHeightAuto();
      setContentTop();
    })

   	function init() {
   		columnHeightAuto(); //注意顺序，因为下面的函数会用到content的height，所以她必须提前执行
   		setContentTop();
   		bannerTab();
   		bindUl($headerNav);
   		lagou();
   		range($range);
      sideBar();
      throwBall($ball)
      mouseScroll(oContainer);
      loading()
   		
   	}
   	function bindUl(ul) {  //header-nav
	     	var a = ul.find('a');

     		ul.delegate('li','click',function() { //写a取不到索引值
    			var num = $(this).index()
    			a.attr('class','');
    			a.eq(num).attr('class','active');
    			iNow = num;
          $sideBar.find('li').eq(num).attr('class','active').siblings().attr('class','');
    			moveTo( num )
		  })
   	}
   	function columnHeightAuto() { 
   		viewHeight = $(window).height();
   		var iColumensH = viewHeight-70;  //可视区-
   		$columns.each(function(i,elem) {  //栏目区
   			$(this).css('height',iColumensH)
   		});
   		$container.css('height',iColumensH);
   		$main.animate({"top" : -iNow*iColumensH},500,'linear' )  //这句话怎理解？？因为iColumensH（与它有关的都要重新计算）在缩小放大是变了，$container的值也变了

   	}
   	function setContentTop() { 
   		$contents.each(function(i,elem) { //内容区
   			var ih = 600 - 70;  //网页height - 头部height
   			var mt = ($container.height() - ih)/2
   			$(this).css({"height" : ih, "marginTop" : mt})
   		})

   	}
   
    function bannerTab() {
    	$bannerLi.eq(bannerPrev).siblings().css('left',bannerWidth)
    	$bannerBtn.mouseover(function() {
    		clearTimeout(bannerTimer);
    		clearInterval(timer);
    		bannerTimer = setTimeout($.proxy(function() {
    			var iNow = $(this).index();
    			if (iNow == bannerPrev) {
    				return;
    			}else if (iNow > bannerPrev) {
    				$bannerLi.eq(iNow).css('left',bannerWidth);
    				$bannerLi.eq(bannerPrev).animate({"left" : -bannerWidth},200,'linear');

    			}else if (iNow < bannerPrev) {
    				$bannerLi.eq(iNow).css('left',-bannerWidth);
    				$bannerLi.eq(bannerPrev).animate({"left" : bannerWidth},200,'linear');
    			}
    			$bannerBtn.eq(iNow).attr('class','active').siblings().attr('class','')
    			$bannerLi.eq(iNow).animate({"left" : 0},200,'linear');
    			bannerPrev = iNow;
    			iIndex = iNow;
    		},this),200)
    	})
    }
    var timer = setInterval(bannerTabPlay,4000)
    function bannerTabPlay() {
    	iIndex++;
    	if (iIndex >= $bannerLi.length) {iIndex = 0};
    	var iNow = iIndex;
    	if (iNow == bannerPrev) {
    		return;
    	}else if (iNow > bannerPrev) {
    		$bannerLi.eq(iNow).css('left',bannerWidth);
    		$bannerLi.eq(bannerPrev).animate({"left" : -bannerWidth},200,'linear');

    	}else if (iNow < bannerPrev) {
    		$bannerLi.eq(iNow).css('left',-bannerWidth);
    		$bannerLi.eq(bannerPrev).animate({"left" : bannerWidth},200,'linear');
    	}
    	$bannerBtn.eq(iNow).attr('class','active').siblings().attr('class','')
    	$bannerLi.eq(iNow).animate({"left" : 0},200,'linear');
    	bannerPrev = iNow
    }
    $banner.mouseover(function() {
    	clearInterval(timer);
    })
    $banner.mouseout(function() {
    	timer = setInterval(bannerTabPlay,4000)
    })
    function moveTo(num) {
      iPage = num;
      $main.css("top",-num * $container.height())
      if (prevIndex == num) {return};
    	if (cjAnimation[num].inAn != null){
        cjAnimation[num].inAn();
      }
      if (cjAnimation[prevIndex].outAn != null){
        cjAnimation[prevIndex].outAn();
      }
      prevIndex = num;
    }
    function lagou() {
    	var aBtn = $lgUl2.find('li');
    	aBtn.each(function(i,elem) {
    		$(this).mouseover(function() {
    			$(this).attr('class','active').siblings().removeClass('active')
    			$lgEm.stop(true).animate({"top" : $(this).index()*55},50,'linear')
    			$lgUl1.stop(true).animate({"top" : -$(this).index()*$lgUl1.height()},100,'linear')
    		})
    	});

    	var adLi = $lgUl3.find('li')

    	adLi.each(function(i,elem) {
    		$(this).mouseover(function() {
    			var oInfo = $(this).find('div');
    			oInfo.css({"left" : 0,"top" :0})
    		});

    		$(this).mouseout(function(ev) {
    			var iLeft = $(this).offset().left;
				var iTop = $(this).offset().top;
				var iBottom = iTop + $(this).height();
				var iRight = iLeft + $(this).width(); 
    			var oInfo = $(this).find('div');
    			
    			if (ev.pageX < iLeft) { //向左消失
    				oInfo.css({"left" : '-100%' ,"top" :0})
    			} else if (ev.pageY < iTop) { //向上消失
    				oInfo.css({"left" : 0,"top" : '-100%'})
    			} else if (ev.pageX > iRight) { //向右消失
    				oInfo.css({"left" : '100%',"top" :0})
    			} else if (ev.pageY > iBottom) { //向下消失

					oInfo.css({"left" : 0,"top" : '100%'})
    			}
    			
    		})
    	})
    };
    function range(obj) {
    	var disX = 0;
    	var disY = 0;
    	var prevX = 0;
    	var r = 126,
    		g = 199,
    		b = 55;
    	obj.mousedown(function(ev) {
    		var This = $(this);
    		console.log( This.parent().width() )
    		
    		$(this).css('cursor','move');
    		disX = ev.clientX - $(this).position().left;  //到父级就可以了
    		
    		$(document).mousemove(function(ev) {
    			
    			var iLeft = ev.clientX - disX;
    			if( iLeft <= 0 ){
    				iLeft = 0;
    				r = 126,
		    		g = 199,
		    		b = 55;
    			}else if(iLeft >= This.parent().width() - This.width()) {
    				iLeft = This.parent().width() - This.width()
    			}
    			obj.css('left',iLeft);
    			if (ev.clientX > prevX && iLeft < This.parent().width() - This.width()) {
    				console.log(iLeft < This.parent().width() - This.width())
    				r++;
    				g++;
    				b++;
    			}else if(ev.clientX < prevX && iLeft > 0){
    				r--;
    				g--;
    				b--;
    			}
    			prevX = ev.clientX;
    			$oCase.css('backgroundColor','rgb('+r+','+g+','+b+')')
    		})
			$(document).mouseup(function() {
				This.css('cursor','default')
				$(this).off();
				
			})
    		return false;
    	})
    }
    function sideBar() {
      var li = $sideBar.find('li');
      li.each(function(i,elem) {
        $(this).click(function() {
          $(this).attr('class','active').siblings().attr('class','');
          $headerNav.find('a').attr('class','')
          $headerNav.find('a').eq($(this).index()).attr('class','active')
          moveTo($(this).index())
        })
      })
    }
    function mouseScroll(obj) {
      
      console.log(iPage)
      if (obj.addEventListener) {
        obj.addEventListener('DOMMouseScroll',function(ev){
          var ev = ev || window.event;
          clearTimeout(pageTimer);
          pageTimer = setTimeout(function() {
              pageScroll(ev);
          },200)
        },false)
      } else {
        obj.onmousewheel = function(ev) {
          var ev = ev || window.event;
          clearTimeout(pageTimer);
          pageTimer = setTimeout(function() {
              pageScroll(ev);
          },200)
        }
      }

      function pageScroll(ev) {
        var oBtn = false;
        if (ev.detail) {
          oBtn = ev.detail < 0 ? true : false;  //上 ：下
        } else {
          oBtn = ev.wheelDelta > 0 ? true : false ; 
        }
        console.log('up:'+iPage)

        if (oBtn) {  //up
          if (iPage <= 0) {
            iPage = 0; 
          } else {
            iPage--;
          }
          // console.log('up:'+iPage)
         
        } else { //down
          if (iPage > $bannerLi.length) {
            iPage = iPage;  
          } else {
           
            iPage++;
          }
       
         
        };
        
        moveTo(iPage);
        $headerNav.find('a').attr('class','')
        $headerNav.find('a').eq(iPage).attr('class','active')
        $sideBar.find('li').eq(iPage).attr('class','active').siblings().attr('class','');
      }
     
      
    }
    var cjAnimation=[
        {
          inAn : function() {
             var bannerBtn = $('.bannerBtn');
           
            bannerBtn.animate({'bottom' : 10, 'opacity' :1},500,'linear');
            $banner.animate({'top' : 0,'opacity' : 1},500,'linear');
          },
          outAn : function() {
            var bannerBtn = $('.bannerBtn');
            bannerBtn.animate({'bottom' : -60, 'opacity' :0},500,'linear');
            $banner.animate({'top' : -150,'opacity' : 0},500,'linear')
          }
        },
        {
          inAn : function() {
            var triangle1 = $('.triangle1');
            var triangle2 = $('.triangle2');
            var banner22 = $('.banner22');
            var banner23 = $('.banner23');
            banner22.css('transform','translate(0,0)');
            banner23.css('transform','translate(0,0)');
            triangle1.css('transform','translate(0,0)');
            triangle2.css('transform','translate(0,0)');

          },
          outAn : function() {
            var triangle1 = $('.triangle1');
            var triangle2 = $('.triangle2');
            var banner22 = $('.banner22');
            var banner23 = $('.banner23');

            banner22.css('transform','translate(591px,0)');
            banner23.css('transform','translate(691px,0)');
            triangle1.css('transform','translate(0,195px)');
            triangle2.css('transform','translate(0,130px)');
          }
        },
        {
          inAn : function() {
            var banner2 = $('.banner2');
            var ad = $('.ad');

            banner2.css({'transform':'translate(0,0)', 'opacity' : 1})
            ad.css({'transform':'translate(0,0)', 'opacity' : 1})
          },
          outAn : function() {
            var banner2 = $('.banner2');
            var ad = $('.ad');

            banner2.css({'transform':'translate(-300px,0)', 'opacity' : 0})
            ad.css({'transform':'translate(300px,0)', 'opacity' : 0})
          }
        },
        {
          inAn : function() {

          },
          outAn : function() {

          }
        },
        {
          inAn : function() {
            var plan2 = $('.plan2');
            plan2.css("transform","rotate(0deg)")
          },
          outAn : function() {
            var plan2 = $('.plan2');
            plan2.css("transform","rotate(20deg)")
          }
        },
        {
          inAn : function() {
            var about1 = $('.about1');
            about1.css('transform','scale(1)')
          },
          outAn : function() {
            var about1 = $('.about1');
            about1.css('transform','scale(0.1)')
          }
        },
        {
          inAn : function() {
            var index = $('.index');
            index.css('translate','translate(0,0)')
          },
          outAn : function() {
            var index = $('.index');
            index.css('translate','translate(0,-40px)')
          }
        }
    ]
    for (var i = 0; i < cjAnimation.length; i++) {
      cjAnimation[i].outAn();
    };
    function loading() {
      var srcArr = ['bg1.jpg','sky.jpg','bg1.jpg','sky.jpg','bg1.jpg','sky.jpg','bg1.jpg','sky.jpg','bg1.jpg','sky.jpg','bg1.jpg','sky.jpg','bg1.jpg','sky.jpg','bg1.jpg','sky.jpg']
      for (var i = 0; i < srcArr.length; i++) {
        var oImg = new Image();
        oImg.src = "images/"+srcArr[i];
        oImg.onload = function() {
          iPress++;
          $loading.css('width' , iPress/srcArr.length*100+'%');
          if (iPress == srcArr.length) {
           $loading.fadeOut();
            cjAnimation[0].inAn();
          };
        }

        
      };
    }
    throwBall($ball)
    function throwBall(obj) {
      var disX = 0;
      var disY = 0;
      var prevX = 0;
      var prevY = 0;
      var iSpeedX = 0;
      var iSpeedY = 0;
      var timer = null;
      obj.mousedown(function(ev) {
        obj.css('cursor','move')
        disX = ev.clientX - obj.position().left;
        disY = ev.clientY - obj.position().top;

        prevX = ev.clientX;
        prevY = ev.clientY;
        $(document).mousemove(function(ev) {
          // var ev = ev || window.event;
          var iLeft = ev.clientX - disX;
          var iTop = ev.clientY - disY;
          iSpeedX = ev.clientX - prevX;
          iSpeedY = ev.clientY - prevY;
          // obj.style.left = iLeft + 'px';
          // obj.style.top = iTop +'px';
          obj.css({'left' : iLeft, 'top' : iTop})
          prevX = ev.clientX;
          prevY = ev.clientY;
        })
        $(document).mouseup(function(ev) {

         $(this).off();
          runing() 
        })
        return false;
      })
      function runing() {
        clearInterval(timer);
        timer = setInterval(function() {
          iSpeedY += 3;
          var iLeft = obj.position().left + iSpeedX;
          var iTop = obj.position().top + iSpeedY;
          obj.css('cursor','default')
          if (iTop <= 0) {
            iTop = 0;
            iSpeedY *= -1;
            iSpeedY *= 0.75;
          } else if(iTop >= obj.parent().height() - obj.height()) {
            iTop = obj.parent().height() - obj.height();
            iSpeedY *= -1;
            iSpeedY *= 0.75;
            iSpeedX *= 0.75;
          }
          if (iLeft <= 0) {
            iLeft = 0;
            iSpeedX *= -1;
            iSpeedX *= 0.75;
          } else if(iLeft >= obj.parent().width() - obj.width()) {
            iLeft = obj.parent().width() - obj.width();
            iSpeedX *= -1;
            iSpeedX *= 0.75;
          }
          obj.css({'left' : iLeft, 'top' : iTop});
          if (Math.floor( Math.abs(iSpeedY)) <= 1 && iTop == obj.parent().height() - obj.height() ) {
            clearInterval(timer);
            $('.game').css('opacity',1);
          };
          
        },30)
      }

    } 
    
  })
})(jQuery);
