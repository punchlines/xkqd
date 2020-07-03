<template>
	<view class="container">
		<view class="container">
			<!-- 头部返回组件 -->
			<!-- <topTabBarComponents id="topTabBar" bindtap="showToast" title="发布话题" backShow="true"></topTabBarComponents> -->
			<view class="publishTopTitle">
				<view class="PTtitle">标题</view>
				<view class="PTinput">
					<input v-model="Course.name" type="text" placeholder="请输入视频标题" :focus="true" maxlength="20"></input>
					<view class="PTnum">
						<text class="PTentry">{{ Course.name.length }} / </text>
						<text class="PTresidue">20</text>
					</view>
				</view>
			</view>
			<!-- 多行文本输入框 -->
			<view class="publishTextE">
				<textarea v-model="Course.describe" @click="focusArea" :focus="focus" @blur="blurArea" placeholder="请输入课程描述"
				 placeholder-class="textarea-placeholder" maxlength="2000">
						</textarea>
				<view class="PTnum">
					<text class="PTentry">{{ Course.describe.length }} / </text>
					<text class="PTresidue">2000</text>
				</view>
			</view>
			<!-- 发布按钮 -->

			<template>
				<view class="btn" @click="delCourse" v-if="edit==1">删除视频</view>
				<view class="btn save" @click="submit" v-if="edit==1">发布视频</view>

				<view class="btns saves" @click="submit" v-if="edit==0">发布视频</view>
			</template>
			<!-- 	<view class="publishTopic top">
				<view class="ptName" @click="submit">
					发布课程
				</view>
			</view> -->

			<view class="uploadImage noflex">
				<view style="margin-bottom: 15rpx;" class="PTtitles">视频封面</view>

				<wx-view v-if="!Course.coverUrl">
					<view class="UIuserinfo" @click="upLoadCover">
						<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
					</view>

				</wx-view>

				<block v-else class="UImage">
					<view class="UIimageBox">
						<image class="UIImage" :src="Course.coverUrl" mode="aspectFit" />
						<image @click="removeImage()" class="DelImage" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.G8p5eQ3mWF7Z2a5177c82fb98de4af6133de4ee9309d.png'"></image>
					</view>
				</block>
				<view class="tips">
					（尺寸最好是336x212）
				</view>
			</view>


			<view style="margin-bottom: 15rpx;margin-left: 3%;" class="PTtitles">视频数量</view>
			<view class="uploadImage">
				<block v-for="(item, index) in  Course.nodes" :key="index" class="UImage">
					<view class="UIimageBox">
						<image class="UIImage" :src="item.cover" @click="addChapter(index)" :data-index="index" mode="aspectFit" />
						<image @click="removeChapter(index)" class="DelImage" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.G8p5eQ3mWF7Z2a5177c82fb98de4af6133de4ee9309d.png'"></image>
					</view>
				</block>
				<wx-view>
					<view class="UIuserinfo" @click="addChapter(-1)">
						<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
					</view>
				</wx-view>

			</view>


		</view>
	</view>
</template>

<script>
	import {
		formatTime,
		upImg
	} from '@/js/mzl.js';

	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				courseId: '',
				title: '',
				content: '',
				images: [],
				edit: 0,
				focus: true
			};
		},

		onLoad(option) {
			this.courseId = option.id;
			this.edit = option.edit == 1 ? 1 : 0;
			if (this.edit == 1) {
				uni.setNavigationBarTitle({
					title: '编辑视频'
				})
			}
			// if(this.edit==0){
			// 	this.Course={}
			// }
		},
		onShow() {
			
			// if (this.edit == 0 &&object==undefined) {
			// 	this.Course.courseId = ""
			// 	this.Course.coverUrl = ""
			// 	this.Course.describe = ""
			// 	this.Course.name = ""
			// 	this.Course.nodes = []
			// }
			// else if(object.edit==1) {
			// 	console.log(object.id)
			// }
			uni.$on("handClick", res => {
			    console.log(res);
				let ress = res
			    // 清除监听
			    uni.$off('handClick');
			})
			console.log(ress)
			if (this.edit == 0 && ress ==undefined) {
				this.Course.courseId = ""
				this.Course.coverUrl = ""
				this.Course.describe = ""
				this.Course.name = ""
				this.Course.nodes = []
			}
			

		},
		otherFun(object){
		if(!!object){
			console.log(object)
		}
		},
		computed: {
			//if(edit==1){
			...mapState(['Course'])
			//}

		},

		methods: {

			delCourse() {
				uni.showModal({
					content: "确定要删除这个课程?",
					success: (res) => {
						if (res.confirm) {
							this.$api.delCourse(this.courseId).then(res => {
								uni.setStorageSync('_needFetchCourse', true)
								uni.navigateBack({
									delta: 2
								});
							})
						}
					}
				})
			},
			removeChapter(index) {
				this.Course.nodes.splice(index, 1);
			},
			removeImage() {
				this.Course.coverUrl = "";
			},

			upLoadCover() {
				upImg(url => {
					this.Course.coverUrl = url
				})
			},

			blurArea() {

				this.focus = false;
				this.$forceUpdate();
			},

			focusArea() {

				this.focus = true;
				this.$forceUpdate();
			},


			submit() {
				if (!this.Course.name) {
					this.showTips('请输入标题！');
					return;
				}
				if (!this.Course.describe) {
					this.showTips('请输入内容！');
					return;
				}
				if (!this.Course.coverUrl) {
					this.showTips('请上传课程封面！');
					return;
				}

				if (this.Course.nodes.length == 0) {
					this.showTips('请上传章节！');
					return;
				}

				if (this.checkHasSensitiveWord(this.title) || this.checkHasSensitiveWord(this.content)) {
					return;
				}
				uni.showLoading();
				const action = this.edit == 1 ? this.$api.editCourse : this.$api.addCourse;
				action(this.courseId, this.Course.name, this.Course.describe, this.Course.coverUrl, JSON.stringify(this.Course.nodes))
					.then(res => {
						this.$store.commit('setCourse', {
							"name": "",
							"describe": "",
							"coverUrl": "",
							"nodes": [

							]
						})
						uni.hideLoading();
						uni.setStorageSync('_needFetchCourse', true)
						uni.navigateBack();
					})




			},

			addChapter(index) {

				uni.navigateTo({
					url: "../businessCC_EditChapter/businessCC_EditChapter?index=" + index
				})
			}

		},

	}
</script>

<style lang="less" scoped>
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
				font-size: 34rpx;
				font-weight: 500;

			}

			.PTinput {
				width: 60%;
				color: #ccc;
				font-size: 32upx;

				input {
					color: @title;
				}

				.PTnum {
					position: absolute;
					top: 31rpx;
					right: 50upx;
					color: @logoNote;
				}
			}
		}

		.btn {
			z-index: 99;
			position: fixed;
			bottom: 39upx;
			.buttonRadius(320rpx, 80rpx, #E0F1FF);
			font-size: 36rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #2EA1FF;
			line-height: 80rpx;
			text-align: center;
			left: 39rpx;

			&.save {
				left: 397rpx;
				background-color: #2EA1FF;
				color: #FFFFFF;
			}

			&.quick {
				width: 450rpx;

				left: 150rpx;
			}
		}

		.btns {
			width: 686rpx;
			height: 88rpx;
			background: rgba(71, 172, 255, 1);
			border-radius: 44px;
			left: 39rpx;
			font-family: PingFangSC-Regular;
			text-align: center;
			line-height: 88rpx;
			color: #fff;
			font-size: 36rpx;
			position: fixed;
			bottom: 39upx;
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


			&.noflex {
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

			.tips {
				font-size: 28rpx;
				color: #666666;
				position: absolute;
				bottom: 628rpx;
				right: 160rpx;
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

	.PTtitles {
		width: 28%;
		font-size: 34rpx;
		font-weight: 500;
	}
</style>
