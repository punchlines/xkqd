<template>
	<view class="container">
		<view class="cardCircleContainer">
			<!-- 关注 -->
			<!--  #ifdef  MP-WEIXIN -->
			<view class="attentionContainer fx-row fx-row-center fx-row-space-around" v-if="showOfficialAccount">
				<official-account style="position: absolute; left: -20upx; top: -30upx;opacity: 0; width: 100%; height: 140upx"></official-account>

				<view class="Aimage">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'"></image>
				</view>
				<view class="Atitle">
					<view class="conTxt fsf28">销刻渠道公众号</view>
					<view class="fsf24">关注公众号获取更多服务</view>
				</view>
				<view class="butt">
					<view class="txt fsf28">关注</view>
				</view>
			</view>
			<!--  #endif -->
			<view class="listMaxBox">

				<!-- 搜索框 -->
				<view class="searchTemplateContainer" @click="navigateTo('/item_businessCardCircle/businessCC_AddCircle/businessCC_AddCircle', { search: 1 })">
					<wx-view custom-class="container1">
						<view class="CMsearch">
							<view class="CMimage">
								<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'" mode="widthFix"></image>
							</view>
							<view class="CMinput">
								<input type="text" class="" placeholder="搜索名片圈" ref="input" disabled></input>
							</view>
						</view>
					</wx-view>
				</view>

				<!-- 圈子列表 -->
				<view class="listContainer">
				
				

					<card-circle-item v-for="item in list" :key="item.id" :datas="item"></card-circle-item>

					<uni-load-more :loading-type="loadingType"></uni-load-more>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<wx-view custom-class="button">
			<view class="button" @click="circleOperation">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/more.png'" class="more"></image>
			</view>
		</wx-view>
	

	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	import CardCircleItem from "../../components/CardCircleItem";

	export default {

		data() {
			return {
				onlineSite: this.global.onlineSite,
				disableClick: '', //游客时不显示页面信息
				circleList: [],

				list: [],
				loading: false,
				noMore: false,
				currentPage: 1,

				showOfficialAccount: false,
			};
		},

		components: {
			CardCircleItem,
			uniLoadMore
		},

		computed: {
			loadingType() {
				if (this.noMore) return 2;
				if (this.loading) return 1;
				return 0;
			},
			isNeedUpdate() {
				return this.$store.state.needCircleHomeUpdate
			},
			inviteJoinId () {
				return this.$store.state.inviteJoin.id;
			}
		},

		mounted() {
			// this.fetch();
		},

		onLoad () {			
			if (this.inviteJoinId) {
				this.navigateTo('/item_businessCardCircle/businessCC_Detail/businessCC_Detail', { id: this.inviteJoinId })
			}
			
			//this.fetch();
		},

		onShow() {
			// #ifdef MP-WEIXIN
				const { scene } = wx.getLaunchOptionsSync()
				console.log(scene)
	// 			if ([1011, 1047, 1089, 1038].indexOf(scene) !== -1) {
	// 				this.showOfficialAccount = true;
	// 			}


				if ([1047].indexOf(scene) !== -1) {
					this.showOfficialAccount = true;
				}
			// #endif

			this.doLoginHandle(hasReg=>{
				
				// 暂时每次进去就重新加载，如果后面体验不好再加上判断条件
				//if (this.isNeedUpdate) {
					this.reset();
					this.fetch();
					//this.$store.commit('setNeedCircleHomeUpdate', false);
				//}
				
			});

			
		},

		onReachBottom() {
			if (this.noMore || this.loading) return;
			this.fetch();
		},

		methods: {
			fetch() {
				if (this.loading) return;

				this.loading = true;
				this.$api.listUserCircle(this.currentPage).then(result => {
					const list = result.userCircleList;
					if (list.length === 0) this.noMore = true;
					this.list = this.list.concat(list);
					this.loading = false;
					this.currentPage++;
					uni.hideLoading();
				}).catch(error => {
					this.showError(error);
					this.loading = false;
					uni.hideLoading();
				})
			},

			circleOperation() {
				uni.showActionSheet({
					itemList: ['创建名片圈', '加入名片圈'],
					success: res => {
						const index = res.tapIndex;
						if (index === 0) { // 创建
							this.onCreateTap();
						} else {
							this.onAddTap();
						}
					}
				});
			},

			onCreateTap() {
				uni.navigateTo({
					url: '../../item_businessCardCircle/businessCC_CreateCircle/businessCC_CreateCircle'
				});
			},

			onAddTap() {
				uni.navigateTo({
					url: '../../item_businessCardCircle/businessCC_AddCircle/businessCC_AddCircle'
				});
			},

			reset() {
				this.currentPage = 1;
				this.list = [];
				this.loading = false;
				this.noMore = false;
			},

		},

	};
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';
	@import '../../css/jss_base.less';

	.cardCircleContainer {
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #f5f5f5;

		.attentionContainer {
			line-height: initial;
			padding: 30upx;
			background: #6B7AF8;
			text-align: left;
			border-radius: 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.Aimage {
				width: 72upx;
				height: 72upx;
				margin-right: 28upx;

				image {
					width: 72upx;
					height: 72upx;
					border-radius: 10upx;
					border: 5upx solid #fff;
				}
			}

			.Atitle {
				flex: 1;

				.conTxt {
					font-weight: bold;
					margin-bottom: 4px;
				}
			}

			.butt {
				width: 20%;
				text-align: right;

				.txt {
					.buttonRadius(@w: 130upx, @h: 64upx, @bg: none);
					border: 1upx solid #fff;
				}
			}
		}

		.listMaxBox {
			background-color: #f5f5f5;
			padding: 0 0 30upx 0;

			.searchTemplateContainer {
				padding: 15upx 15upx 0 15upx;
				margin-bottom: 30upx;
			}

			.listContainer {
				padding: 0 30upx;

				.listOne {
					margin-bottom: 24upx;
				}
			}
		}
	}

	.button {
		position: fixed;
		right: 10px;
		bottom: 15px;

		&>image {
			width: 100upx;
			height: 100upx;
		}
	}

	.model {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		background: rgba(0, 0, 0, 0.5);
		overflow: hidden;
		z-index: 9999;

		.footSelect {
			position: absolute;
			bottom: 0;
			width: 100%;
			text-align: center;

			.selection {
				margin-bottom: 13upx;
				font-size: 28upx;
				color: #333333;
				font-weight: 400;
				background: #ffffff;

				.crateCard {
					height: 98upx;
					line-height: 98upx;
					border-bottom: 1px solid #eeeeee;
				}

				.addCard {
					height: 98upx;
					line-height: 98upx;
				}
			}

			.cancle {
				height: 97upx;
				line-height: 97upx;
				text-align: center;
				font-weight: 400;
				font-size: 28upx;
				color: #666666;
				background: #ffffff;
			}
		}
	}



	.container1 {
		width: 100%;
		margin-top: 20upx;

		.CMsearch {
			.flex(flex-start);
			width: 95%;
			margin: 0 auto;
			text-align: left;
			background: #fff;
			height: 72upx;
			color: #ccc;
			font-size: 28upx;

			.CMimage {
				width: 10%;
				margin-left: 20upx;

				image {
					width: 32upx;
					height: 32upx;
					vertical-align: middle;
				}
			}

			.CMinput {
				width: 80%;

				input {
					margin-top: 10upx;
				}
			}
		}
	}
</style>
