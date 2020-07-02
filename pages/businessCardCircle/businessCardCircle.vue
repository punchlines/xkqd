<template>
	<view>
		<!-- <customizeHeader title="名片圈"></customizeHeader> -->
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
					<!-- <view class="searchTemplateContainer" @click="navigateTo('/item_businessCardCircle/businessCC_AddCircle/businessCC_AddCircle', { search: 1 })">
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
				</view> -->
					<view class="header">
						<view class="header_Text">
							社群
						</view>
						<view class="header_Search" @click="navigateTo('/item_businessCardCircle/businessCC_AddCircle/businessCC_AddCircle')">
							<image class="icon" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.2mKiwv0hyU80282442cbbf1581f5ce539ccd618696d7.png"
							 mode=""></image>
						</view>
						<view class="header_Add" @click="showAdd">
							<image class="icon" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.npTvTsIfOpwy7611a418653ccd613447610f5eada17b.png"
							 mode=""></image>
						</view>
					</view>
					<view class="add_List" v-if="show_Add">
						<view class="add_CreateCircle" @click="navigateTo('/item_businessCardCircle/businessCC_CreateCircle/businessCC_CreateCircle'),show_Add = false">
							创建社群
						</view>
						<view class="add_CreateCircle" @click="navigateTo('/item_businessCardCircle/businessCC_AddCircle/businessCC_AddCircle', { search: 1 }),show_Add = false">
							搜索社群
						</view>
					</view>
					<!-- 层 -->
					<view class="ceng" v-if="ceng_show" @click="show_Add=false,ceng_show=false"></view>
					<!-- 圈子列表 -->
					<view class="listContainer">



						<card-circle-item v-for="(item,index) in list" :key="item.id" :datas="item" :index="index" :select="select" :list="list.length"></card-circle-item>

						<uni-load-more :loading-type="loadingType"></uni-load-more>
					</view>
				</view>
			</view>
			<!-- 按钮 -->
			<!-- <wx-view custom-class="button">
				<view class="button" @click="circleOperation">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/more.png'" class="more"></image>
				</view>
			</wx-view> -->
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	import CardCircleItem from "../../components/CardCircleItem";
	// import customizeHeader from "@/components/customizeHeader.vue"
	export default {

		data() {
			return {
				onlineSite: this.global.onlineSite,
				disableClick: '', //游客时不显示页面信息
				circleList: [],
				show_Add: false,
				ceng_show:false,
				list: [],
				loading: false,
				noMore: false,
				select:false,
				currentPage: 1,
				showOfficialAccount: false,
			};
		},

		components: {
			CardCircleItem,
			uniLoadMore,
			//customizeHeader
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
			inviteJoinId() {
				return this.$store.state.inviteJoin.id;
			}
		},

		mounted() {
			// this.fetch();
		},

		onLoad() {
			if (this.inviteJoinId) {
				this.navigateTo('/item_businessCardCircle/businessCC_Detail/businessCC_Detail', {
					id: this.inviteJoinId
				})
			}

			//this.fetch();
		},

		onShow() {
			// #ifdef MP-WEIXIN
			const {
				scene
			} = wx.getLaunchOptionsSync()
			console.log(scene)
			// 			if ([1011, 1047, 1089, 1038].indexOf(scene) !== -1) {
			// 				this.showOfficialAccount = true;
			// 			}
			if ([1047].indexOf(scene) !== -1) {
				this.showOfficialAccount = true;
			}
			// #endif

			this.doLoginHandle(hasReg => {

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
				this.$api.getUserCardCircleList(this.currentPage).then(result => {
					const list = result;
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
			// circleOperation() {
			// 	uni.showActionSheet({
			// 		itemList: ['创建名片圈', '加入名片圈'],
			// 		success: res => {
			// 			const index = res.tapIndex;
			// 			if (index === 0) { // 创建
			// 				this.onCreateTap();
			// 			} else {
			// 				this.onAddTap();
			// 			}
			// 		}
			// 	});
			// },
			showAdd() {
				this.ceng_show=true
				if (this.show_Add == false) {
					this.show_Add = true
				} else {
					this.show_Add = false
				}
			},
			
			// onCreateTap() {
			// 	uni.navigateTo({
			// 		url: '../../item_businessCardCircle/businessCC_CreateCircle/businessCC_CreateCircle'
			// 	});
			// },

			// onAddTap() {
			// 	uni.navigateTo({
			// 		url: '../../item_businessCardCircle/businessCC_AddCircle/businessCC_AddCircle'
			// 	});
			// },

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
		background-color: #fff;

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
			background-color: #fff;
			padding: 0 0 30upx 0;

			// .searchTemplateContainer {
			// 	padding: 15upx 15upx 0 15upx;
			// 	margin-bottom: 30upx;
			// }
			.header {
				height: 82rpx;
				padding: 0 32rpx;
				display: flex;
				justify-content: space-between;
				background-color: #f5f5f5;
				.header_Text {
					padding-top: 5rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 42px;
					letter-spacing: 1px;
				}

				.header_Search {
					padding-top: 30rpx;
					margin-left: 390rpx;
				}

				.header_Add {
					padding-top: 30rpx;
					margin-right: 10rpx;
				}
			}

			.add_List {
				width: 194rpx;
				height: 155rpx;
				background: rgba(77, 77, 77, 1);
				border-radius: 16rpx;
				position: absolute;
				right: 30rpx;
				top: 80rpx;
				z-index: 999;
				&::before {
					content: '';
					width: 0;
					height: 0;
					border: 10px solid transparent;
					border-top-color: #4d4d4d;
					transform: rotate(65deg);
					position: absolute;
					right: 20rpx;
					top: 30rpx;
					margin-top: -20px;
				}

				// .add_List:after {
				// 	content: "";
				// 	width: 0;
				// 	height: 0;
				// 	border: 18px solid transparent;
				// 	border-top-color: rgba(77, 77, 77, 1);
				// 	position: absolute;
				// 	left: 0;
				// 	top: 20rpx;
				// 	margin-top: -18px;
				// }

				.add_CreateCircle {
					text-align: center;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					line-height: 40px;
					letter-spacing: 1px;
					border-bottom: 1rpx solid #CCCCCC;
				}

				.add_CreateCircle:nth-child(2) {
					border: none;
				}
			}

			.listContainer {
				//padding: 0 30upx;

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
	.ceng{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 998;
	}


	// .container1 {
	// 	width: 100%;
	// 	margin-top: 20upx;

	// 	.CMsearch {
	// 		.flex(flex-start);
	// 		width: 95%;
	// 		margin: 0 auto;
	// 		text-align: left;
	// 		background: #fff;
	// 		height: 72upx;
	// 		color: #ccc;
	// 		font-size: 28upx;

	// 		.CMimage {
	// 			width: 10%;
	// 			margin-left: 20upx;

	// 			image {
	// 				width: 32upx;
	// 				height: 32upx;
	// 				vertical-align: middle;
	// 			}
	// 		}

	// 		.CMinput {
	// 			width: 80%;

	// 			input {
	// 				margin-top: 10upx;
	// 			}
	// 		}
	// 	}
	// }
</style>
