<template>
	<view class="container">
		<view class="container">
			<!-- 头部返回组件 -->
			<!-- <topTabBarComponents id="topTabBar" bindtap="showToast" title="发布话题" backShow="true"></topTabBarComponents> -->
			<view class="publishTopTitle">
				<view class="PTtitle">标题</view>
				<view class="PTinput">
					<input v-model="title" type="text" placeholder="请输入话题标题" :focus="true"></input>
				</view>
			</view>
			<!-- 多行文本输入框 -->
			<view class="publishTextE">
				<textarea v-model="content"  @click="focusArea" :focus="focus" @blur="blurArea" placeholder="这一刻,你想说点什么" placeholder-class="textarea-placeholder" maxlength="2000">
						</textarea>
				<view class="PTnum">
					<text class="PTentry">{{ content.length }} / </text>
					<text class="PTresidue">2000</text>
				</view>
			</view>
			<!-- 发布按钮 -->
			<view class="publishTopic top">
				<view class="ptName" @click="submit">
					发布话题
				</view>
			</view>
			<!-- 上传图片 -->
			<view class="uploadImage">
				<block v-for="(image, index) in images" :key="index" class="UImage">
					<view class="UIimageBox">
						<image class="UIImage" :src="image" @click="listenerButtonPreviewImage" :data-index="index" mode="aspectFit" />
						<image @click="removeImage(index)" class="DelImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/del_zi.png'"></image>
					</view>
				</block>
				<wx-view  v-if="images.length < 6">
					<view class="UIuserinfo" @click="upload">
						<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
					</view>
				</wx-view>
				
			</view>
		</view>
	</view>
</template>

<script>
	// import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				circleId: '',
				title: '',
				content: '',
				images: [],
				countNum:6,
				focus:true
			};
		},

		onLoad(option) {
			this.circleId = option.id;
			console.log(option.id);
		},
		methods: {
			
			blurArea(){
				console.log(this.focus)
				this.focus = false;
				this.$forceUpdate();
			},
			
			focusArea(){
				console.log(this.focus)
				this.focus = true;
				this.$forceUpdate();
			},
			
			
			submit() {
				if (!this.title) {
					this.showTips('请输入标题！');
					return;
				}
				if (!this.content) {
					this.showTips('请输入内容！');
					return;
				}
				if (this.checkHasSensitiveWord(this.title) || this.checkHasSensitiveWord(this.content)) {
					return;
				}
				uni.showLoading();
				this.$api.setNewTopic(this.circleId, this.title, this.content, JSON.stringify(this.images)).then(result => {
					
					uni.hideLoading();
					this.showTips('发布成功！');
					uni.setStorageSync("_needFetchTopic",true);
// 					const pages = getCurrentPages();
// 					const page = pages[pages.length - 2];
// 					if (page) {
// 						page.$vm.needUpdate = false;
// 					}

					this.redirectTo('../businessCC_TopicDetail/businessCC_TopicDetail', {
						id: result.topicId,
						circleId:this.circleId
					})
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},

			upload() {
				uni.chooseImage({
					count: 6-this.images.length,
					success: (res) => {
						uni.showLoading({
							title: '上传中...'
						});
						let count = res.tempFilePaths.length;
						for (const path of res.tempFilePaths) {
							this.uniUploadFile(path, url => {
								if (this.images.length < 6) {
									this.images.push(url)
								}
							}, null, () => {
								if (--count <= 0) {
									uni.hideLoading();
								}
							})
						}
					}
				})
			},

			removeImage(index) {
				this.images.splice(index, 1)
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
				height: 680upx !important;
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
