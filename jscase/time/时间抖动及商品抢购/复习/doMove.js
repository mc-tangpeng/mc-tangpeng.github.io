function doMove(obj,attr,iTarget,endFn){
	clearInterval(obj.timer)
	obj.timer=setInterval(function(){

		var iCur=0;
		if (attr=='opacity') {
			//存小数，乘以100.干掉小数部分
			iCur=Math.round(parseFloat(getStyle(obj,attr)*100));
		}else{
			
			iCur=parseInt(getStyle(obj,attr));
		};
		
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		//因为速度在不断的变化，趋近0.所以，不用再判断下面的条件了，以前都是固定速度，所以才有下面的额判断条件
		// if (iCur>iTarget && iSpeed>0 || iCur<iTarget && iSpeed<0) {
		// 	iCur == iTarget;
		// };
		
		if (iCur == iTarget) {
			clearInterval(obj.timer);
			//document.title=iCur;
			endFn && endFn();
		}else{
			if (attr=='opacity') {
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')'; //ie
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
				//console.log(iCur)
			};
		}
		//console.log(iTarget)
	},30)

} 
function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}