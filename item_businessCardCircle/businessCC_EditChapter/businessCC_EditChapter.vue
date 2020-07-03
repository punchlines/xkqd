<template>
	<view class="container">
		<view class="container">
			<!-- 头部返回组件 -->
			<!-- <topTabBarComponents id="topTabBar" bindtap="showToast" title="发布话题" backShow="true"></topTabBarComponents> -->
			<view class="publishTopTitle">
				<view class="PTtitle">视频标题</view>
			</view>
			<view class="bold"></view>
				
			
			<view class="PTinput">
				<input v-model="chapter.title" type="text" placeholder="请输入该视频的标题" :focus="true" maxlength="20"></input>
				<view class="PTnum">
					<text class="PTentry">{{ chapter.title.length }} / </text>
					<text class="PTresidue">20</text>
				</view>
			</view>
			<!-- 发布按钮 -->
			<view class="publishTopic top">
				<view class="ptName" @click="submit">
					确定
				</view>
			</view>
			
			<view class="uploadImage noflex">
				<view style="margin-bottom: 15rpx;  margin-top: 32rpx;">视频封面</view>
				
				<wx-view v-if="!chapter.cover">
					<view class="UIuserinfo" @click="upLoadCover">
						<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
					</view>
				</wx-view>
				
				<block v-else class="UImage">
					<view class="UIimageBox">
						<image class="UIImage" :src="chapter.cover"  mode="aspectFit" />
						<image @click="removeImage()" class="DelImage" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.G8p5eQ3mWF7Z2a5177c82fb98de4af6133de4ee9309d.png'"></image>
					</view>
				</block>
				<view class="tips">
					（尺寸最好是336x212）
				</view>
			</view>
			
			
				<view style="margin-bottom: 15rpx;margin-left: 3%; margin-top: 32rpx;">添加视频</view>
				<view class="uploadImage">
					
					<wx-view v-if="!chapter.video">
						<view class="UIuserinfo" @click="addVideo">
							<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
						</view>
					</wx-view>
					
					<block v-else class="UImage">
						<view class="UIimageBox">
							<image class="UIImage" src="" style="background-color: #000" mode="aspectFit" />
							<image @click="removeVideo()" class="DelImage" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.G8p5eQ3mWF7Z2a5177c82fb98de4af6133de4ee9309d.png'"></image>
							<view style="position: absolute;right: 5rpx; bottom: 0;font-size: 23rpx;color: white;">{{chapter.time}}</view>
						</view>
					</block>
					
				</view>
		
			
		</view>
	</view>
</template>

<script>
	import {upVideo,formateSeconds,upImg} from '@/js/mzl.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				index: '',
				title: '',
				content: '',
				images: [],
				
				chapter:{
					"title": "",
					"cover": "",
					"video": "",
					"time": "",
					"videoFileId": "",
				},
				focus:true
			};
		},
		computed: {
			...mapState(['Course'])
		},
		

		onLoad(option) {
			this.index = option.index;
			if(this.index!=-1){
				
				this.chapter = JSON.parse(JSON.stringify(this.Course.nodes[this.index]));
			}
		},
		methods: {
			formateSeconds(value){
				return formateSeconds(value)
			},
			
			submit() {
				if (!this.chapter.title) {
					this.showTips('请输入标题！');
					return;
				}
				if (!this.chapter.cover) {
					this.showTips('请上传封面！');
					return;
				}
				
				
				if (!this.chapter.video) {
					this.showTips('请上传视频！');
					return;
				}
				
				
				if (this.checkHasSensitiveWord(this.chapter.title) || this.checkHasSensitiveWord(this.chapter.title)) {
					return;
				}
				uni.showLoading();
				if(this.index!=-1){
					this.Course.nodes[this.index] = this.chapter;
				}else{
					this.Course.nodes.push(this.chapter)
				}
				
				
				uni.hideLoading();
				// let object={
				// 	edit:1
				// }
				// var pages = getCurrentPages();
				// var prevPage = pages[pages.length - 2];
				// prevPage.$vm.otherFun(object);
				//  prevPage.onShow(object);
				uni.$emit("handClick",{edit: 1});
				uni.navigateBack();
			},
			
			upLoadCover(){
				upImg(url=>{
					this.chapter.cover=url
				})
			},
			
			addVideo(){
				upVideo((url,duration,id,time)=>{
					this.chapter.video=url;
					this.chapter.time=formateSeconds(parseInt(time));
					this.chapter.videoFileId=id;
				},300)
			
			},

			removeImage(index) {
				this.chapter.cover="";
			},
			removeVideo(){
				this.chapter.video="";
				this.chapter.time="";
				this.chapter.videoFileId="";
			}

		},

	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container {
		background: #fff;
		padding-bottom: 70upx;

		.publishTopTitle {
			.flex(flex-start);
			box-sizing: border-box;
			padding: 50upx 0upx;
			;
			background: #fff;
			height: 72upx;
			font-size: @fsContentTitle;
			color: @title;
			border-bottom: 1upx solid @grayBg;
			width: 92%;
			margin: 0 auto;

			.PTtitle {
				width: 21%;
				font-size: 34rpx;
				font-weight: 500;
			}

			
		}
		.bold{
			width: 100%;
			height: 15rpx;
			background-color: #F5F5F5;
		}
		.PTinput {
			width: 100%;
			height: 100rpx;
			font-size: 32upx;
			padding: 30rpx;
			border-bottom: 1px solid #E5E5E5;
			input {
				color: @title;
			}
			.PTnum {
				position: absolute;
				top: 145rpx;
				right: 20upx;
				color: @logoNote;
			}
		}
		.publishTextE {
			position: relative;
			padding: 30upx;
			box-sizing: border-box;
			font-size: @fsSubTitle;
			background: #fff;

			textarea {
				width: 100%;
				height: 380upx !important;
				color: @title;
				background: #F8F8F8;
				padding: 20upx;
				box-sizing: border-box;
			}

			
		}

		.publishTopic {
			width: 100%;
			background: #fff;
			font-size: @fsContentTitle;
			margin: 0 auto;
			padding: 20upx 0 20upx 0;
			position: fixed;
			bottom: 0;
			z-index: 999;

			.ptName {
				text-align: center;
				line-height: 80upx;
				width:686rpx;
				height:88rpx;
				background:rgba(71,172,255,1);
				border-radius:44rpx;
				line-height: 88rpx;
				position: fixed;
				bottom: 20rpx;
				left: 32rpx;
				color: #fff;
			}
		}

		.uploadImage {
			.flex(flex-start);
			width: 93%;
			margin: 0 auto;
			margin-bottom: 20upx;
			flex-wrap: wrap;
			
				
			&.noflex{
				display: block;
			}
			.tips{
				font-size:28rpx;
				color: #666666;
				position: absolute;
				top: 485rpx;
				right: 160rpx;
			}
			.UIuserinfo {
				width: 220upx;
				height: 220upx;
				margin-right: 10upx;
				border: 1upx solid #F8F8F8;

				image {
					width: 220rpx;
					height: 220rpx;
				}
			}

			.UIimageBox {
				position: relative;
				width: 220upx;
				height: 220upx;
				margin-right: 10upx;
				margin-bottom: 10upx;

				.UIImage {
					width: 220upx;
					height: 220upx;
					// width:100%;
					margin-right: 10upx;
					display: inline-block;
				}

				.DelImage {
					width: 40upx;
					height: 40upx;
					position: absolute;
					top: 0;
					right: 0;
				}
			}


		}
	}
</style>
