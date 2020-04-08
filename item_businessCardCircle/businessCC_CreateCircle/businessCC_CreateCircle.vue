<template>
	<view>
		<view class="txtList">
			<view class="circleName">
				<text class="txt">圈名称</text>
				<input v-model="cardCirclePublish.circleName" name="input" type="text" placeholder="请输入圈子名称" class="input" />
			</view>
			<view class="way" @click="openJoinTypeSelect">
				<text class="txt">加圈方式</text>
				<view class="txtRight">
					<text class="condition">{{ showSelectJoinType }}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
			</view>
		</view>
		<view class="createBtn" @click="createCircle">
			<text class="createTxt">创建名片圈</text>
		</view>

		<vip-tuan v-if="showModal" @close="showModal=false" @go="go"></vip-tuan>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		vipTuan
	} from '../_components/vipTuan';
	export default {

		data() {

			return {
				onlineSite: this.global.onlineSite,
				showModal:false

			};
		},
		
		components: {
			vipTuan
		},

		computed: {
		
			cardCirclePublish() {
				return this.$store.state.cardCirclePublish;
			},
			showSelectJoinType() {
				if (!this.cardCirclePublish.joinType.id) return '请选择加圈方式';
				return this.cardCirclePublish.joinType.text;
			},
		},

		onLoad(options) {
			if (!options.noClear)
				this.$store.dispatch('resetCardCirclePublish');
		},

		methods: {
			
			go(){
					this.showModal = false;
					this.navigateTo('/item_businessCard/businessCard_VIP/businessCard_VIP_New', {
						isCreateCircle: 1
					});
			},
		
			openJoinTypeSelect() {
				uni.navigateTo({
					url: '../businessCC_JoinCircleType/businessCC_JoinCircleType'
				});
			},


			createCircle() {
				if ((this.cardCirclePublish.joinType.id == 4 || this.cardCirclePublish.joinType.id == 5) && this.currentUser.userType <=
					1) {
						
					this.showModal = true;
	

					return;
				}
				//如果是会员 没有填写商户信息 则跳转到填写页面
				// if (this.cardCirclePublish.joinType.id == 4 && this.shopRegInfo.regMer == 1 && this.currentUser.userType > 1) {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '您需要填写一些信息才可以开团或者开圈哦',
				// 		confirmText: '去填写',
				// 		success: (e) => {
				// 			if (e.confirm) {
				// 				//确定  跳转到VIP购买isCreateCircle=true
				// 				this.reLaunch('/item_businessCard/businessCard_regMer/businessCard_regMer', {
				// 					froms: 1,
				// 					redirect: encodeURIComponent(
				// 						`/item_businessCardCircle/businessCC_CreateCircle/businessCC_CreateCircle?noClear=1`)
				// 				});
				// 			}
				// 		}
				// 	});

				// 	return;
				// }


				if (!this.cardCirclePublish.circleName.trim()) {
					this.showTips('请输入圈子名称')
					return;
				} else if (this.cardCirclePublish.circleName.length > 10) {
					this.showTips('最多输入10个字符')
					return;
				}

				if (this.checkHasSensitiveWord(this.cardCirclePublish.circleName)) {
					return;
				}
				if (!this.cardCirclePublish.joinType.id) {
					this.showTips('请选择加圈方式')
					return;
				}

				uni.showLoading();
				const percent = this.cardCirclePublish.percent || 0;
				this.$api.setNewCardCircle(
					this.cardCirclePublish.circleName,
					this.cardCirclePublish.joinType.id,
					this.cardCirclePublish.joinMoney,
					percent
				).then(result => {
					this.showTips('创建成功');
					this.$store.commit('setNeedCircleHomeUpdate', true)
					this.redirectTo('/item_businessCardCircle/businessCC_Detail/businessCC_Detail', {
						id: result.cardCircleId
					})
					uni.hideLoading();
				}).catch(error => {
					uni.hideLoading();
					this.showError(error);
				})
			},

		},

	};
</script>

<style lang="less">
	@import "../../css/jss_base.less";

	.txtList {
		margin: 0 auto;
		.flex(@justCon: center;
		);
		width: 92%;
		flex-direction: column;

		.circleName {
			width: 100%;
			.flex(@justCon: space-between;
			);
			height: 112upx;
			line-height: 112upx;
			border-bottom: 1px solid #eeeeee;

			.txt {
				font-size: @fsSubTitle;
				color: @title;
			}

			.input {
				flex: 1;
				margin-left: 60upx;
				font-size: @fsSubTitle;
				color: #333333;
			}
		}

		.way {
			width: 100%;
			height: 112upx;
			line-height: 112upx;
			border-bottom: 1px solid #eeeeee;
			.flex(@justCon: space-between;
			);

			.txt {
				font-size: @fsSubTitle;
				color: @title;
			}

			.txtRight {
				flex: 1;
				margin-left: 60upx;
				.flex(@justCon: space-between;
				);

				.condition {
					font-size: @fsSubTitle;
					color: #666666;
				}

				.rightImg {
					width: 14upx;
					height: 24upx;
				}
			}

		}

	}

	.createBtn {
		margin: 132upx auto;
		text-align: center;
		.buttonRadius();

		.createTxt {
			line-height: 88upx;
			font-size: @fsContentTitle ;
			color: #ffffff;
		}
	}
</style>
