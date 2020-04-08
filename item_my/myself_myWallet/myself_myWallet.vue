<template>
	<view class="page">
		<image class="bg" src="http://card-1254165941.cosgz.myqcloud.com/images/bg%403x.png" />

		<view class="card-container">

			<view class="basic-info">
				<image class="avatar" :src="currentUser.headImage" />
				<view class="basic-info-meta">
					<view class="basic-info-name">
						<text style="margin-right: 16upx">{{ currentUser.name }}</text>
						<vip-flag :type="currentUser.userType"></vip-flag>
					</view>
					<view class="basic-info-id">ID：{{ currentUser.id }}</view>
				</view>
			</view>
			<view class="count-info">
				<view class="count-item" @click="openFansListPage">
					<view class="count">{{ fanCount }}</view>
					<view class="count-type">名片粉丝</view>
				</view>
				<view class="count-item" @click="gotoMyFame">
					<view class="count">{{ popularity }}</view>
					<view class="count-type">我的人脉</view>
				</view>
				<view class="count-item" v-if="userType!=5 && userType!=6" @click="openInviteVipListPage">
					<view class="count">{{ inviteVipCount }}</view>
					<view class="count-type">VIP</view>
				</view>
			</view>
		</view>

		<view class="padding-area"></view>

		<view class="income-container" @click="openMyIncome" >
			<view class="title">
				我的收入
				<!--<text class="more">查看详情 ></text>-->
			</view>
			<view class="price"><text class="small">¥</text>{{ remainMoney }}</view>
		</view>
		<!-- <bank-card-manage v-else></bank-card-manage> -->

		<image v-if="isNormalUser" @click="openVipPage" class="invite-banner" src="http://card-1254165941.cosgz.myqcloud.com/2.gif"></image>
		<image v-else-if="userType!=5 && userType!=6" @click="openVipPage" class="invite-banner" src="http://card-1254165941.cosgz.myqcloud.com/2.gif"></image>

		<view class="college-banner">
			<image class="icon" src="http://card-1254165941.cosgz.myqcloud.com/images/xueyuan@2x.png"></image>
			<text>销刻学院</text>
			<view class="college-button" @click="priview">必学GO</view>
		</view>

	</view>
</template>

<script>
	import {mapState} from 'vuex'
  import VipFlag from "../../components/VipFlag";
	import BankCardManage from "./BankCardManage";
	export default {
		components: {BankCardManage, VipFlag},
		data() {
      return {
				popularity: 0,
				remainMoney: '0.00',
				fanCount: 0,
				inviteVipCount: 0,
			};
    },
	
	computed:{
		...mapState(['userType'])
	},

		mounted () {
			
			uni.showLoading();
			this.$api.getDataDisplay().then(result => {
				this.hideLoading();
				this.remainMoney = result.remainMoney.toFixed(2)
				this.popularity = result.popularity
				this.fanCount = result.fanCount
				this.inviteVipCount = result.inviteVipCount
			}).catch(error => {
				this.showError(error);
				this.hideLoading();
			})
		},

		methods: {
			priview(){
				uni.previewImage({
					urls:["https://card-1254165941.cos.ap-guangzhou.myqcloud.com/qr.jpg"]
				})
			},
			
			gotoMyFame() {
				uni.navigateTo({
					url: '../../item_my/myself_myFame/myself_myFame'
				})
			},
			openFansListPage () {
				this.navigateTo('./FansList');
			},
			openInviteVipListPage () {
				this.navigateTo('./InviteVipList');
			},
			openVipPage () {
				this.navigateTo('/item_businessCard/businessCard_VIP/businessCard_VIP_New')
			},
			openMyIncome () {
				// if (!this.currentUser.shopId && this.isVipUser) {
				// 	this.navigateTo('/item_businessCard/businessCard_ShopInfo/step1/step1');
				// 	return;
				// }
				this.navigateTo('/item_my/myself_myWallet/myself_myWallet2');
			},
		}

	}
</script>

<style lang="less" scoped>

	.page {
		padding: 78upx 30upx 0;
		background: #F8F8F8;
		min-height: 100vh;
		box-sizing: border-box;
	}

	.bg {
		width: 100%;
		height: 300upx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.card-container {
		position: absolute;
		padding: 30upx;
		width: calc(100% - 60upx);
		height:328upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2upx 20upx 0px rgba(170,170,170,0.2);
		border-radius:20upx;
		z-index: 99;
		margin: 0 auto;
		box-sizing: border-box;

		.basic-info {
			z-index: 9;
			display: flex;
			padding-bottom: 40upx;
			border-bottom: 1upx solid #E1E1E1;
			.avatar {
				width:100upx;
				height:100upx;
				margin-right: 24upx;
			}
			.basic-info-meta {
				.basic-info-name {
					display: flex;
					align-items: center;
					color: #333333;
					font-size: 32upx;
					font-weight: bold;
					line-height: 45upx;
					margin-top: 6upx;
					margin-bottom: 10upx;
				}
			}
			.basic-info-id {
				font-size:24upx;
				color:rgba(102,102,102,1);
				line-height:33upx;
			}
		}

		.count-info {
			display: flex;
			padding-top: 30upx;
			.count-item {
				flex: 1;
				text-align: center;
				.count {
					font-weight: bold;
					font-size:32upx;
					color:rgba(51,51,51,1);
					line-height:45upx;
					margin-bottom: 5upx;
				}
				.count-type {
					font-size:24upx;
					color:rgba(102,102,102,1);
					line-height:33upx;
				}
			}
		}

	}

	.padding-area {
		height: calc(328upx + 30upx);
	}

	.income-container {
		height:194upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 20px 0px rgba(170,170,170,0.16);
		border-radius:10px;
		padding: 25upx 30upx;
		box-sizing: border-box;

		.title {
			font-size:24upx;
			color:rgba(102,102,102,1);
			line-height:33upx;
			margin-bottom: 20upx;
			.more {
				font-size:24upx;
				color:rgba(116,131,255,1);
				line-height:33upx;
				float: right;
			}
		}

		.price {
			font-size:80upx;
			font-weight: bold;
			color:rgba(51,51,51,1);
			line-height:90upx;
			letter-spacing:1upx;
			.small {
				font-size:36upx;
				margin-right: 10upx;
			}
		}
	}

	.invite-banner {
		width: 680upx;
		height: 136upx;
		margin-top: 30upx;
	}

	.college-banner {
		position: absolute;
		bottom: 40upx;
		left: 30upx;

		width: calc(100% - 60upx);
		height:88upx;
		line-height:88upx;
		border-radius:44upx;
		border:1upx solid rgba(116,131,255,0.56);
		padding: 0 40upx;
		display: flex;
		align-items: center;
		box-sizing: border-box;

		font-size:28upx;
		color:rgba(51,51,51,1);

		.icon {
			width: 36upx;
			height: 27upx;
			margin-right: 16upx;
		}

		> text { flex: 1 }

		.college-button {
			font-size:24upx;
			color:rgba(255,255,255,1);
			text-align: center;

			width:110upx;
			height:48upx;
			line-height:48upx;
			background:linear-gradient(90deg,rgba(70,66,215,1) 0%,rgba(67,161,254,1) 100%);
			border-radius:24upx;
		}
	}

	.BankCardManage {
		margin: 0;
		width: 100%;
	}

</style>
