<template>
	<view class="container">
		<view class="page-body">

			<view>
				<view>
					<view class="toolbar">
						<view class="iconfont icon-bold" @click="toolBarClick('bold')"></view>
						<view class="iconfont icon-italic" @click="toolBarClick('italic')"></view>
						<view class="iconfont icon-xiahuaxian1" @click="toolBarClick('header')"></view>
						<view class="iconfont icon-underline" @click="toolBarClick('underline')"></view>
						<view class="iconfont icon-strike" @click="toolBarClick('strike')"></view>
						<view class="iconfont icon-sup" @click="toolBarClick('sup')"></view>
						<view class="iconfont icon-sub" @click="toolBarClick('sub')"></view>
						<view class="iconfont icon-alignleft" @click="toolBarClick('alignleft')"></view>
						<view class="iconfont icon-aligncenter" @click="toolBarClick('aligncenter')"></view>
						<view class="iconfont icon-alignright" @click="toolBarClick('alignright')"></view>
						<view class="iconfont icon-link" @click="toolBarClick('link')"></view>
						<view class="iconfont icon-image" @click="toolBarClick('imgage')"></view>
						<view class="iconfont icon-code" @click="toolBarClick('code')"></view>
						<view class="iconfont icon-table" @click="toolBarClick('table')"></view>
						<view class="iconfont icon-qingkong" @click="toolBarClick('clear')"></view>
					</view>
					<view class="input-content">
						<textarea auto-height maxlength="-1" v-model="textareaData" @blur="getCursor"></textarea>
					</view>
				</view>
				<view class="preview" v-if="textareaHtml">
					<scroll-view scroll-y :style="'height:'+screenHeight/2.5+'px;padding:10px;box-sizing: border-box;'">
						<wxParse :content="textareaHtml" @preview="preview" @navigate="navigate"></wxParse>
					</scroll-view>
				</view>
			</view>

		</view>
		<view class="publishNext" @click="nextClick">
			<view class="PNnext">{{ submitText }}</view>
		</view>
	</view>
</template>

<script>
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	import marked from '@/components/marked'

	import markdown from './markdown';
	import lyMarkdown from '../../components/ly-markdown/ly-markdown.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			lyMarkdown,
			wxParse
		},
		data() {
			return {
				textareaData: "",
				textareaHtml: "",
				showPreview: false,
				name: '七月_',
				goodsId: '',
				shopId: 0,
				screenHeight: 0,
				cursor: 0,
				updateMode: null,
				count: 0,
			}
		},

		mixins: [markdown],

		computed: {
			submitText() {
				if(this.updateMode) return "修改详情";
				return this.newGoodsDetalis.goodsId ? '修改商品' : '发布商品';
			},
			//Vuex引入属性
			...mapState(['newGoodsDetalis'])
		},

		watch: {
			"textareaData": function(newValue, oldValue) {
				//if(!this.newGoodsDetalis) return
				if (!this.updateMode) {
					this.newGoodsDetalis.details = newValue;
					this.textareaHtml = marked(newValue)
				} else this.textareaHtml = marked(newValue)

			}
		},

		onLoad(option) {
			this.updateMode = option.updateMode;
			if (this.updateMode == 1) {
				this.textareaHtml = option.details || '';
				this.goodsId = option.goodsId;
				this.textareaData = this.textareaHtml.replace(/<p>(.*?)<\/p>/g, '$1\n')
					.replace(/<img src="(.*?)".*?>/g, '![]($1)\n')
					.replace(/(<([^>]+)>)/ig, '');
			} else {

				this.count = option.count;
				this.shopId = option.shopId;
				const textareaData = uni.getStorageSync('GoodsDetails');
				this.textareaHtml = textareaData || '';
				this.textareaData = this.textareaHtml.replace(/<p>(.*?)<\/p>/g, '$1\n')
					.replace(/<img src="(.*?)".*?>/g, '![]($1)\n')
					.replace(/(<([^>]+)>)/ig, '');
			}



		},
		onUnload() {

			if (this.textareaData) {
				uni.setStorageSync("GoodsDetails", this.textareaData);
			}

		},


		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.screenHeight = res.screenHeight
				}
			})
		},

		methods: {
			//发布商品
			nextClick() {
				if (!this.updateMode) {
					let upDeta = this.newGoodsDetalis;
					upDeta.details = this.textareaHtml;
					if (!upDeta) {
						this.showTips('信息不全...');
						return false
					}
					console.info(upDeta)

					uni.showLoading({
						title: '提交中...'
					});

					const action = upDeta.goodsId ?
						this.$api.updateGoods(upDeta) :
						this.$api.setNewGoods(upDeta);

					action.then(res => {
						console.info(res)
						uni.hideLoading()
						// "ERROR": "30001"
						if (res.ERROR == 30001) {
							uni.showModal({
								title: '发布失败',
								content: '达到发布商品上限（vip1:10/vip2:30/vip3:100）,需要去升级吗',
								success: function(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: '../businessCard_VIP/businessCard_VIP?urlType=describe'
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						} else if (res.goodsId) {
							uni.setStorageSync('_newGoodsFlag', true);
							uni.showModal({
								title: '提示',
								content: '发布成功',
								confirmText: '继续发布',
								cancelText: '返回店铺',
								success: (res) => {
									uni.setStorageSync('_needUpdateGoods', true);
									if (res.confirm) {
										const userType = Number(this.currentUser.userType);
										if (this.count - 1 <= 0) {
											if (userType === 2 || userType === 3) {
												this.showModalTap();
											} else {
												this.showTips('已到达产品上传上限');
												this.$store.dispatch('clearPublishInfo');
												uni.navigateBack({
													delta: 2
												});
											}
										} else {
											this.$store.dispatch('clearPublishInfo');
											uni.navigateBack({
												delta: 2
											}).then(() => {
												this.navigateTo('/item_businessCard/businessCard_publishNewGoods/businessCard_publishNewGoods', {
													count: this.count,
													shopId: this.shopId
												});
											});
											//this.redirectTo('../businessCard_publishNewGoods/businessCard_publishNewGoods',{count:this.count,shopId:this.shopId});

										}

									} else if (res.cancel) {
										this.$store.dispatch('clearPublishInfo');
										uni.navigateBack({
											delta: 2
										});
									}
								}
							});


						} else {
							if (upDeta.goodsId) {
								uni.showModal({
									title: '提示',
									content: '修改成功',
									showCancel: false,
									confirmText: '查看商品',
									success: function(res) {
										uni.setStorageSync('_needUpdateGoods', true);

										if (res.confirm) {
											uni.setStorageSync('_tempModifyGoods', true);

											uni.navigateBack({
												delta: 2
											});
										}
									}
								});
							}
							uni.setStorageSync('_newGoodsFlag', true);
						}
					}).catch(err => {
						console.info(err)
						this.showError(err)
						uni.hideLoading()
					})
				}else{
					//更新描述
					uni.showLoading()
					this.$api.updateDetails(this.goodsId,this.textareaHtml).then(res=>{
						uni.hideLoading();
						uni.showModal({
							showCancel:false,
							content:"更新成功",
							complete() {
								uni.setStorageSync('setNeedUpdatePinDetail',true);
								uni.navigateBack();
								
							}
						})
					}).catch(err => {
						console.info(err)
						this.showError(err)
						uni.hideLoading()
					})
					
				}
				//	https://card-1254165941.cos.ap-guangzhou.myqcloud.com/images/posterBg.jpg
			},
			
			preview(e){
				console.log(e)
			},

			showModalTap() {
				let that = this
				uni.showModal({
					title: '已到达产品上传上限',
					content: '去开通更高级VIP权限吗？',
					success: (res) => {
						uni.navigateBack({
							delta: 2
						});

						if (res.confirm) {
							that.openVip()
						}
					}
				});
			},

			openVip() { //开通Vip
				uni.navigateTo({
					url: '../businessCard_VIP/businessCard_VIP?urlType=' + 'myShop'
				});
			},

		},
	}
</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';
	@import '../../components/ly-markdown/markdown.css';

	//@import url("../../components/mpvue-wxparse/src/wxParse.css");
	.publishNext {
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 0;
		background: #fff;
		border-top: 1upx solid #eee;

		.PNnext {
			.buttonRadius();
			text-align: center;
			line-height: 88upx;
			left: 50%;
			margin-left: -310upx;
			position: absolute;
			color: #fff;
			font-size: 32upx;
			top: 10upx;
		}
	}

	.container {
		padding-bottom: 200upx;
	}

	.input-content {
		width: 100%;
	}

	.page-body {
		background: #FFFFFF;
	}

	.input-content textarea {
		padding: 16upx 25upx 15upx 25upx;
		font-size: 30upx;
		min-height: 500upx;
		line-height: 1.5;
	}

	.preview {
		border-top: 1upx solid #e0e0e0;
		width: 100%;
	}

	.toolbar {
		width: 100%;
		border: none;
		box-shadow: 0 0upx 4upx rgba(0, 0, 0, 0.157), 0 0upx 4upx rgba(0, 0, 0, 0.227);
	}

	.toolbar .iconfont {
		display: inline-block;
		cursor: pointer;
		height: 61.6upx;
		width: 61.6upx;
		margin: 13upx 0 11upx 0upx;
		font-size: 33upx;
		padding: 10upx 13upx 11upx 8upx;
		color: #757575;
		border-radius: 11upx;
		text-align: center;
		background: none;
		border: none;
		outline: none;
		line-height: 2.2;
		vertical-align: middle;
	}
</style>
