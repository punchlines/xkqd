<template>
	<view class="container">
		<view class="container">
			<!-- 头部返回组件 -->
			<!-- <topTabBarComponents id="topTabBar" bindtap="showToast" title="发布话题" backShow="true"></topTabBarComponents> -->
			<view class="publishTopTitle">
				<view class="PTtitle">标题</view>
				<view class="PTinput">
					<input v-model="chapter.title" type="text" placeholder="请输入章节标题" :focus="true"></input>
				</view>
			</view>
			<!-- 发布按钮 -->
			<view class="publishTopic top">
				<view class="ptName" @click="submit">
					确定
				</view>
			</view>
			
			<view class="uploadImage noflex">
				<view style="margin-bottom: 15rpx;">章节封面:</view>
				
				<wx-view v-if="!chapter.cover">
					<view class="UIuserinfo" @click="upLoadCover">
						<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
					</view>
				</wx-view>
				
				<block v-else class="UImage">
					<view class="UIimageBox">
						<image class="UIImage" :src="chapter.cover"  mode="aspectFit" />
						<image @click="removeImage()" class="DelImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/del_zi.png'"></image>
					</view>
				</block>
			</view>
			
			
				<view style="margin-bottom: 15rpx;margin-left: 3%;">章节视频:</view>
				<view class="uploadImage">
					
					<wx-view v-if="!chapter.video">
						<view class="UIuserinfo" @click="addVideo">
							<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
						</view>
					</wx-view>
					
					<block v-else class="UImage">
						<view class="UIimageBox">
							<image class="UIImage" src="" style="background-color: #000" mode="aspectFit" />
							<image @click="removeVideo()" class="DelImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/del_zi.png'"></image>
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
				width: 18%;
			}

			.PTinput {
				width: 80%;
				color: #ccc;
				font-size: 32upx;

				input {
					color: @title;
				}
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

			.PTnum {
				position: absolute;
				bottom: 40upx;
				right: 50upx;
				color: @logoNote;
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
				margin: 0 auto;
				color: #fff;
				.buttonRadius(@w: 620upx;
				@h: 80upx;
				)
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
