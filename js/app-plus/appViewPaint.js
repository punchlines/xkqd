class appView extends plus.nativeObj.View{
	/*
		APP端 绘制cover-view upx转px
	
	*/
	constructor(...arg) {
		let styles = arg[1];
		//APP端绘制专用  尺寸自动转换upx  暂不支持百分比
		let width  = styles.width ||  "100%";
		let height = styles.height || "100%";
		//暂时使用left  bottom定位
		let left  = styles.left || 0;
		let bottom = styles.bottom || 0;
		//let {width,height,left,right,top,bottom} = styles || 0;
		styles.width = uni.upx2px(width)+"px";
		styles.height = uni.upx2px(height)+"px";
		styles.left = uni.upx2px(left)+"px";
		styles.bottom = uni.upx2px(bottom)+"px";

		super(...arg);
	}
	
	drawRectUpx(...arg){
		//绘制upx 矩形
		let rectStyle = arg[0];
		let rectPosition = arg[1];
		
		let radius = rectStyle.radius;
		let borderWidth = rectStyle.borderWidth;
		
		rectStyle.radius = radius?uni.upx2px(radius)+"px":"0px";
		rectStyle.borderWidth = borderWidth?uni.upx2px(borderWidth)+"px":"0px";
		//暂时使用left top 定位
		let {left,top,width,height} = rectPosition;
		
		rectPosition.left = left?uni.upx2px(left)+"px":"0px";
		rectPosition.top = top?uni.upx2px(top)+"px":"0px";
		rectPosition.width = width?uni.upx2px(width)+"px":"0px";
		rectPosition.height = height?uni.upx2px(height)+"px":"0px";
		this.drawRect(...arg);
	}
	
	drawTextUpx(...arg){
		 //绘制upx文字
		 let position = arg[1];
		 let styles = arg[2];
		 let {left,top,width,height} = position;
		 //暂时使用left top 定位
		 position.left = left?uni.upx2px(left)+"px":"0px";
		 position.top = top?uni.upx2px(top)+"px":"0px";
		 position.width = width?uni.upx2px(width)+"px":"0px";
		 position.height = height?uni.upx2px(height)+"px":"0px";
		 //字体size
		 styles.size =  styles.size?uni.upx2px(styles.size)+"px":uni.upx2px(21)+"px";

		 this.drawText(...arg);
	}
	
}
module.exports = appView;