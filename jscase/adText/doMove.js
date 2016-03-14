function doMove(obj,attr,iTarget){
	clearInterval(obj.timer)
	obj.timer=setInterval(function(){
		var iCur=parseInt(getStyle(obj,attr));
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

		if (iCur>iTarget && iSpeed>0 || iCur<iTarget && iSpeed<0) {
			iCur == iTarget;
		};
		
		if (iCur == iTarget) {
			clearInterval(obj.timer);
			document.title=iCur;
		}else{
			obj.style[attr]=iCur+iSpeed+'px';
		}
	},30)

} 
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
}