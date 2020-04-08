<template>
	<view class="container">
		<!-- 我的积分 -->
		<view class="MyIntegralBoX">
			<!-- 我的积分 -->
			<view class="MIIntegral fx-row-center" :style="{backgroundImage:'url(http://card-1254165941.cosgz.myqcloud.com/cardImages/my/aaa.png)',backgroundRepeat:'no-repeat',backgroundSize:'100%'}">
				<view class="MNum">{{accumulateNum}}</view>
				<view class="Mtitle fsf24" @click="gotoIrecored">积分记录</view>
				<view class="integralDescript">
					<image class="IDimge" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/jifensm.png'" alt=""></image>
					<text class="fsf24" @click="integralDetail">积分说明</text>
				</view>
			</view>
			<!-- 每日签到 -->
			<view class="SingInEveryDay">
				<view class="SEday">
					<view class="SEtitle fx-row fx-row-center fx-row-space-around">
						<view class="EtitleName">
							<view class="Tname fs3a32">每日签到</view>
							<view class="EarnIntegral fs9a24">每日签到，最高可赚10积分</view>
						</view>
						<!-- myIntegralVisible=true -->
						<view v-if="!isSingIn" class="ESingInToday fsf24" @click="goSigned()">今日签到</view>
						<view v-if="isSingIn" class="ESingInToday ESingInToday1 fsf24">今日已签到</view>
					</view>
				</view>
				<view class="IntegralInform">
					<view class='signIn'>
						<view class='sign-com'>
							<view class='modle'>
								<view class='mol'>
									<view class='mol-ites'>
										<view class="ite">
											<image class="widget__arrow" :src="signNum>=min?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/yiqiandao.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/weiqiandao.png'"></image>
										</view>
										<view class="ite">
											<image class="widget__arrow" :src="signNum>=min+1?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/yiqiandao.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/weiqiandao.png'"></image>
										</view>
										<view class="ite">
											<image class="widget__arrow" :src="signNum>=min+2?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/yiqiandao.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/weiqiandao.png'"></image>
										</view>
										<view class="ite">
											<image class="widget__arrow" :src="signNum>=min+3?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/yiqiandao.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/weiqiandao.png'"></image>
										</view>
										<view class="ite">
											<image class="widget__arrow" :src="signNum>=min+4?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/yiqiandao.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/weiqiandao.png'"></image>
										</view>
										<view class="ite">
											<image class="widget__arrow" :src="signNum>=min+5?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/yiqiandao.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/weiqiandao.png'"></image>
										</view>
										<view class="ite">
											<image class="widget__arrow" :src="signNum>=min+6?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/yiqiandao.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/weiqiandao.png'"></image>
										</view>
									</view>
								</view>
								<view class='moday'>
									<text class='dd'>{{min}}天</text>
									<text class='dd'>{{min+1}}天</text>
									<text class='dd'>{{min+2}}天</text>
									<text class='dd'>{{min+3}}天</text>
									<text class='dd'>{{min+4}}天</text>
									<text class='dd'>{{min+5}}天</text>
									<text class='dd'>{{max}}天</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 店铺签到 -->
		<view class="storeIntegralBox">
			<view class="storeTitle fs3a32">店铺签到</view>
			<view class="StoreList" v-for="(shopItem,ind) in shopMessage" :key="ind">
				<view class="StoreHeader fx-row fx-row-center fx-row-space-around">
					<view class="Simage" @click="gotoShop(shopItem.shopId)">
						<default-image :src="shopItem.logo" custom-class="Simg"></default-image>
					</view>
					<view class="STitle">
						<view class="StitleName fs3a28">{{shopItem.shopName}}</view>
						<view class="StitleSub fs6a24">销量{{shopItem.saleNums}}件</view>
					</view>
					<view class="Ssingin ">
						<view v-if="shopItem.ifSign!=1" class="SingTitle fs6a24" @click="shopGoSigned(shopItem.shopId)">去签到</view>
						<view v-if="shopItem.ifSign==1" class="SingTitle SingTitle1 fs6a24">已签到</view>
					</view>
				</view>
				<view class="StoreGoods fx-row fx-row-center fx-row-space-around">
					<view class="GoogsList" v-for="(item,index) in shopItem.shopList" :key="index">
						<view class="GLimg" @click="gotoGoodsDetail(item.goodsId,shopItem.shopId)">
							<default-image :src="item.goodsImage" custom-class="GLImage"></default-image>
						</view>
						<view class="GLtitle">{{item.goodsName}}</view>
						<view class="GLprice">¥ {{item.preferentialPrice}}</view>
					</view>
				</view>
			</view>
		</view>


		<integral v-if="myIntegralVisible" @close="myIntegralVisible = false" :pointsScore="pointsScore" :continuation='true'></integral>


	</view>

</template>

<script>
	import integral from '../../components/myIntegral';
	export default {
		components: {
			integral
		},
		data() {
			return {
				onlineSite: this.global.onlineSite,
				list: [{
						id: 0,
						title: '今天'
					},
					{
						id: 1,
						title: '1天'
					},
					{
						id: 2,
						title: '2天'
					},
					{
						id: 3,
						title: '3天'
					},
					{
						id: 4,
						title: '4天'
					},
					{
						id: 5,
						title: '5天'
					},
					{
						id: 6,
						title: '6天'
					},
				],
				listItem: [{
					id: 0
				}, {
					id: 0
				}, {
					id: 0
				}],
				shopMessage: [],
				myIntegralVisible: false,
				accumulateNum: 0, //积分数量
				isSingIn: false, //记录今天是否已经签到
				newSignNum: 0, //签到天数
				pointsScore: 0, //签到第几天加的分数
				//签到模块
				signNum: 0, //签到数
				signState: false, //签到状态
				min: 1, //默认值日期第一天1
				max: 7, //默认值日期最后一天7
				be: 0, //默认倍数

				isSingInShop: false, //记录今天店铺是否签到
			}
		},
		onShow() {
// 			this.getMyIntegral();
// 			this.getShopMessage();
			// this.alreadySignedRecord();
		},
		onLoad() {
			this.getMyIntegral();
			this.getShopMessage();
			this.alreadySignedRecord();
			// uni.setStorageSync('userId',34);
		},
		methods: {
			// 获取积分数量
			getMyIntegral() {
				this.showLoading();
				this.$api.getMyIntegral().then(res => {
					this.hideLoading();
					console.info(res);
					this.accumulateNum = res.accumulateNum;
				}).catch(error => {
					this.showError(error);
					this.hideLoading();
				})
			},
			// 获取是否已经签到  今日签到 
			alreadySignedRecord() {
				this.$api.alreadySignedRecord(1).then(res => {
					console.info(res);
					if (res.signInNum <= 7) {
						this.be = 0;
						this.max = 7;
						this.min = 1;
					} else if (res.signInNum % 7 == 0) {
						this.be = parseInt(res.signInNum / 7 - 1);
						this.max = (this.be + 1) * 7;
						this.min = this.be * 7 + 1;
					} else {
						this.be = parseInt(res.signInNum / 7);
						this.max = (this.be + 1) * 7;
						this.min = this.be * 7 + 1;
					}

					if (res && res.pointsMessage == 900003) {
						//今日已经签到
						this.isSingIn = true;
						this.signNum = res.signInNum;
					} else if (!res.pointsMessage) {
						this.isSingIn = false;
						this.signNum = res.signInNum;
					}
					console.log('签到天数:' + this.signNum + '周期:' + this.be + '最小值:' + this.min + '最大值:' + this.max);
				})
			},
			// 今日普通签到
			goSigned() {
				this.showLoading();
				this.$api.goSigned(1).then(res => {
					this.myIntegralVisible=true;
					this.hideLoading();
					this.isSingIn = true;
					console.log('签到+分数');
					console.info(res);
					this.pointsScore = res.pointsScore;
					this.alreadySignedRecord();
					if (res && res.pointsScore) {
						this.accumulateNum = this.accumulateNum + res.pointsScore;
					}
				}).catch(error => {
					this.showError(error);
					this.hideLoading();
				})
			},
			// 去店铺签到
			shopGoSigned(shopId) {
				console.log('shopId');
				console.log(shopId);
				this.showLoading();
				this.$api.shopGoSigned(2, shopId).then(res => {
					this.hideLoading();
					console.info(res);
					this.accumulateNum = this.accumulateNum + res.pointsScore;
					uni.navigateTo({
						url: '../../module/shop/home/home?SignIn=0&pointsScore=' + res.pointsScore+'&shopIdOtherPeople='+shopId
					});
					this.getShopMessage().then(res=>{});
					
				}).catch(error => {
					this.showError(error);
					this.hideLoading();
				})
			},
			// 获取签到店铺信息
			getShopMessage() {
				return new Promise((RES,REJ)=>{
					this.showLoading();
					this.$api.getShopMessage().then(res => {
						this.hideLoading();
						console.info(res);
						res.shopMessage.forEach(detail => {
							detail.shopList.forEach(item => {
								item.preferentialPrice = this.formatPrice(item.preferentialPrice)
							})
						})
					
						this.shopMessage = res.shopMessage;
						RES();
					}).catch(error => {
						this.showError(error);
						this.hideLoading();
					})
				})			
			},
			// 积分说明
			integralDetail() {
				uni.navigateTo({
					url: '../myself_integralExplanat/myself_integralExplanat'
				});
			},
			// 积分记录
			gotoIrecored() {
				uni.navigateTo({
					url: '../myself_integralRecored/myself_integralRecored'
				});
			},
			// 去商品详情
			gotoGoodsDetail(goodsId,shopId) {
				uni.navigateTo({
					url: '../../module/shop/goodsDetail/goodsDetail?goodsId=' + goodsId+'&shopId='+shopId
				});
			},
			// 去到店铺
			gotoShop(shopId){
				uni.navigateTo({
					url: '/module/shop/home/home?shopId='+shopId
				});
			},
		}

	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container {
		background: @grayBg;
		width: 100%;
		border-top: 1upx solid #eee;

		// 我的积分
		.MyIntegralBoX {
			background: #fff;
			width: 100%;
			padding-bottom: 30upx;
			padding-top: 30upx;

			//我的积分
			.MIIntegral {
				margin: 30upx 30upx 0 30upx;
				// background:linear-gradient(270deg,rgba(255,145,71,1) 0%,rgba(255,91,76,1) 100%);
				position: relative;
				height: 290upx;
				border-radius: 10upx;
				text-align: center;
				line-height: 200upx;

				.MNum {
					font-size: 80upx;
					color: #fff;
					font-weight: bold;
				}

				.Mtitle {
					width: 150upx;
					height: 50upx;
					text-align: center;
					line-height: 50upx;
					background: rgba(255, 255, 255, 0.14);
					border-radius: 25upx;
					border: 1upx solid;
					margin: 0 auto;
					font-size: 24upx;
				}

				.integralDescript {
					position: absolute;
					top: -50upx;
					right: 30upx;

					.IDimge {
						width: 26upx;
						height: 26upx;
						vertical-align: middle;
						margin: 5upx 20upx 0 0;
					}
				}
			}

			// 每日签到
			.SingInEveryDay {
				margin-top: 20upx;

				.SEday {
					padding: 30upx;

					.EtitleName {
						width: 70%;
						line-height: 50upx;

						.Tname {
							font-weight: 900upx;
						}
					}

					.ESingInToday {
						.buttonRadius(@w: 150upx, @h: 60upx);
						width: 30%;
						line-height: 60upx;
						text-align: center;
					}

					.ESingInToday1 {
						.buttonRadius(@w: 150upx, @h: 60upx, @bg: #F1F1F1);
						color: #666;
					}
				}

				.IntegralInform {
					text-align: center;

					.Image {
						width: 14.3%;

						.IIimage {
							width: 35upx;
							height: 41upx;
							vertical-align: middle;
						}

						.Title {
							margin-top: 20upx;
						}

						.TitleActive {
							color: #FF9637;
						}
					}
				}
			}
		}

		// 店铺积分
		.storeIntegralBox {
			padding: 30upx;

			.storeTitle {
				font-weight: 900upx;
			}

			.StoreList {
				margin: 30upx 0;
				background: #fff;
				border-radius: 10upx;
				padding: 30upx;

				.StoreHeader {
					border-bottom: 1upx solid #eee;
					padding-bottom: 20upx;

					.Simage {
						width: 20%;

						.Simg {
							width: 80upx;
							height: 80upx;
						}
					}

					.STitle {
						width: 60%;
						text-align: left;

						.StitleName {
							height: 50upx;
							vertical-align: top;
						}
					}

					.Ssingin {
						width: 20%;
						text-align: right;

						.SingTitle {
							width: 120upx;
							height: 54upx;
							line-height: 54upx;
							text-align: center;
							background: rgba(244, 245, 255, 1);
							color: #7483FF;
							border-radius: 30upx;
							border: 1upx solid;
						}

						.SingTitle1 {
							background: #F1F1F1;
							color: #666;
							border: none;
						}
					}
				}

				.StoreGoods {
					padding: 30upx 0 0;

					.GoogsList {
						width: 33.33%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;

						.GLimg {
							.GLImage {
								width: 200upx;
								height: 200upx;
								vertical-align: middle;
							}
						}

						.GLtitle {
							font-size: 24upx;
							color: rgba(51, 51, 51, 1);
							margin: 20upx 0;
							padding-left: 10upx;
						}

						.GLprice {
							font-size: 24upx;
							color: rgba(51, 51, 51, 1);
							padding-left: 10upx;
						}
					}
				}
			}

		}
	}
</style>
<style>
	.signIn {
		width: 100%;
		height: auto;
	}

	.widget__arrow {
		width: 35upx;
		height: 41upx;
	}

	.sign-com {
		width: 100%;
		height: auto;
		padding: 0 30upx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.sign-com .thead {
		width: 100%;
		text-align: center;
		padding: 50upx 0 35upx;
	}

	.sign-com .thead .tt {
		font-size: 24upx;
	}

	.sign-com .thead .mm {
		margin-top: 10upx;
		font-size: 24upx;
	}

	.sign-com .thead .mm .n {
		font-size: 66upx;
		margin-right: 25upx;
	}

	.sign-com .thead .pp {
		color: #999;
		font-size: 24upx;
		margin-top: 10upx;
	}

	.sign-com .modle {
		width: 100%;
		height: 100upx;
		margin-top: 10upx;
	}

	.sign-com .modle .mol {
		width: 100%;
		height: 52upx;
		position: relative;
	}

	.sign-com .mol-line {
		width: 100%;
		height: 4upx;
		background-color: #e6e6e6;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.sign-com .mol-ites {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.mol-ites .ite {
		width: 52upx;
		height: 52upx;
		background-color: #fff;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
	}

	.mol-ites .ite .n {
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		text-align: center;
		border-radius: 50%;
		background-color: #f5f5f5;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 22upx;
	}

	.mol-ites .ite:last-of-type::after {
		width: 0;
	}

	.mol-ites .ite:nth-of-type(2) {
		left: 107upx;
	}

	.mol-ites .ite:nth-of-type(3) {
		left: 214upx;
	}

	.mol-ites .ite:nth-of-type(4) {
		left: 321upx;
	}

	.mol-ites .ite:nth-of-type(5) {
		left: 428upx;
	}

	.mol-ites .ite:nth-of-type(6) {
		left: 535upx;
	}

	.mol-ites .ite:nth-of-type(7) {
		left: 642upx;
	}

	.mol-ites .ite.hover {
		border-color: #ff614a;
	}

	.mol-ites .ite.hover .n {
		background-color: #ff614a;
		color: #fff;
	}

	.mol-ites .ite.hover::after {
		background-color: #ff614a;
	}

	.moday {
		width: 100%;
		height: 40upx;
		overflow: hidden;
		position: relative;
		margin-top: 20upx;
	}

	.moday .dd {
		width: 60upx;
		height: 40upx;
		line-height: 1;
		text-align: center;
		font-size: 22upx;
		position: absolute;
		left: 0;
		bottom: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.moday .dd:nth-of-type(2) {
		left: 107upx;
	}

	.moday .dd:nth-of-type(3) {
		left: 214upx;
	}

	.moday .dd:nth-of-type(4) {
		left: 321upx;
	}

	.moday .dd:nth-of-type(5) {
		left: 428upx;
	}

	.moday .dd:nth-of-type(6) {
		left: 535upx;
	}

	.moday .dd:nth-of-type(7) {
		left: 632upx;
	}

	.the-btn {
		margin: 50upx 0;
	}

	.the-btn .btn {
		background-color: #ff614a;
		color: #fff;
	}

	.the-btn.signed .btn {
		background-color: rgba(153, 153, 153, 0.61);
	}

	.explax {
		padding: 0 30upx;
		font-size: 28upx;
		color: #666;
	}
</style>
