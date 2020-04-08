<template>
	<view>
		<view class="ys-mask"></view>
		<view class="ys-dialog">
			<view class="ys-dialog-title">{{title}}</view>
			<view class="ys-dialog-content">{{content}}</view>
			<view class="ys-dialog-bottom">
				<view class="ys-dialog-btn">{{cancelText}}</view>
				<view class="ys-dialog-btn ys-dialog-ok-btn" >{{okText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'dialog',
// 		props:{
// 			title: {
// 				type: String,
// 				value: '弹窗标题'
// 			},
// 			content: {
// 				type: String,
// 				value: '弹窗内容'
// 			},
// 			cancelText: {
// 				type: String,
// 				value: '取消'
// 			},
// 			okText: {
// 				type: String,
// 				value: '确定'
// 			}
// 		},
		data() {
			return {
				title:'sdfasdf',
				content:'02510',
				cancelText:'取消',
				okText:'确定'
			};
		}
	}
</script>

<style lang="less">
	.ys-mask{
	  position: fixed;
	  z-index: 1000;
	  top: 0;
	  right: 0;
	  left: 0;
	  bottom: 0;
	  background: rgba(0, 0, 0, 0.6);
	}
	.ys-dialog{
	  position: fixed;
	  z-index: 5000;
	  width: 80%;
	  max-width:560upx;
	  top: 50%;
	  left: 50%;
	  -webkit-transform: translate(-50%, -50%);
	  transform: translate(-50%, -50%);
	  background-color: #FFFFFF;
	  text-align: center;
	  border-radius: 10upx;
	  overflow: hidden;
	}
	.ys-dialog-title{
	  padding:1.3upx 1.6upx 0.5upx;
	  font-weight:400;
	  font-size:32upx;
	}
	.ys-dialog-content{
	  padding: 0 1.6upx 0.8upx;
	  min-height: 40upx;
	  font-size: 15upx;
	  line-height: 1.3;
	  word-wrap: break-word;
	  word-break: break-all;
	  color: #808080;
	}
	.ys-dialog-bottom{
	  position: relative;
	  line-height: 48upx;
	  font-size: 18upx;
	  display: -webkit-box;
	  display: -webkit-flex;
	  display: flex;
	}
	.ys-dialog-bottom:after {
	  content: " ";
	  position: absolute;
	  left: 0;
	  top: 0;
	  right: 0;
	  height: 1upx;
	  border-top: 1upx solid #D5D5D6;
	  color: #D5D5D6;
	  -webkit-transform-origin: 0 0;
	  transform-origin: 0 0;
	  -webkit-transform: scaleY(0.5);
	  transform: scaleY(0.5);
	}
	.ys-dialog-btn{
	  position: relative;
	  display: block;
	  -webkit-box-flex: 1;
	  -webkit-flex: 1;
	  flex: 1;
	  color: #999;
	  line-height: 48upx;
	  font-size: 28upx;
	  text-decoration: none;
	  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	.ys-dialog-ok-btn{
	  color: #6B7AF8;
	}
	.ys-dialog-btn:active{
	  background-color:#eee;
	}
	.ys-dialog-btn:after{
	  content: " ";
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 1upx;
	  bottom: 0;
	  border-left: 1upx solid #D5D5D6;
	  color: #D5D5D6;
	  -webkit-transform-origin: 0 0;
	  transform-origin: 0 0;
	  -webkit-transform: scaleX(0.5);
	  transform: scaleX(0.5);
	}
</style>
