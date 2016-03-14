function startMove(obj,json,endFn){
	clearInterval(obj.timer);
	var iCur=0;
	obj.timer=setInterval(function (){
		var bBtn=true;
		for(var attr in json){
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
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
}