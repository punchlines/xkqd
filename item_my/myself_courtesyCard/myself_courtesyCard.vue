<template>
	<view class="container">
		<!-- 积分数量 -->
		<view class="HeaderTitle fx-row fx-row-center fx-col-space-around">
			<view class="HnowScore fs6a28">
				当前积分：<text class="Hscore">{{accumulateNum}}</text>
			</view>
			<view class="gerMoreScore fs6a24" @click="gotoGetMoreCode">获取更多积分</view>
		</view>
		<!-- 优惠券 -->
		<view class="CouponBox fx-row fx-row-center fx-col-space-around fx-wrap">
			<view class="CBlist fx-row fx-row-center fx-col-space-around" v-for="(item,index) in couponList" :key="index">
				<view class="CBLeft fx-row fx-row-center fx-col-space-around" style="background-image:url('http://card-1254165941.cosgz.myqcloud.com/cardImages/my/juanB.png');background-repeat:no-repeat;background-size:100%">
					<view class="CBLmoney fs6a30">¥ <text class="Lmoney">{{item.preferentialMoney}}</text></view>
					<view class="CBLTitle">
						<view class="LtitleName fs3a30">{{item.nameCoupon}}</view>
						<view class="LtitleSub fs9a20">消费满{{item.satisfiedMoney}}元使用</view>
						<view class="Ltime fs9a20">{{item.beginTime}}至{{item.endTime}}</view>
					</view>
				</view>
				<!-- receiveStatus:1  (已经领取过)  -->
				<!-- receiveStatus:0  (还没领取)  -->

				<!-- 蓝色 -->

				<view v-if="item.receiveStatus==0&&item.isGetCoupon==true" class="CBright fx-row fx-row-center fs9a24" @click="receiveCouponList(index,item,item.templetId,item.couponChange)"
				 style="background-image:url('http://card-1254165941.cosgz.myqcloud.com/cardImages/my/juanL.png')">
					<view class="CBbox">
						<view class="CBRnum">{{item.couponChange}}</view>
						<view class="CBRcoupon">积分兑换</view>
					</view>
				</view>


				<!-- 灰色   -->
				<view v-if="item.receiveStatus==1" class="CBright fx-row fx-row-center fs9a24" style="background-image:url('http://card-1254165941.cosgz.myqcloud.com/cardImages/my/juanH.png')">
					<view class="CBbox">
						<view class="CBRnum">{{item.couponChange}}</view>
						<view class="CBRcoupon">已领取</view>
					</view>
				</view>

				<view v-if="item.receiveStatus==0&&item.isGetCoupon==false" class="CBright fx-row fx-row-center fs9a24" style="background-image:url('http://card-1254165941.cosgz.myqcloud.com/cardImages/my/juanH.png')">
					<view class="CBbox">
						<view class="CBRnum">{{item.couponChange}}</view>
						<view class="CBRcoupon">积分不够</view>
					</view>
				</view>

			</view>
			

			
		</view>

		<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>




		<view v-if="couponList.length==0" class="default">
			<default-page :messageToPage="messageToPage"></default-page>
		</view>
	</view>

</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				onlineSite: this.global.onlineSite,
				couponList: [],
				currentPage: 1,
				loading: false,
				noMore: false,
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wuyouhuiquan.png',
					title: '当前暂无优惠券'
				},
				accumulateNum: 0, //积分数量
			}
		},
		onLoad() {
			this.getDataDisplay().then(res=>{
				this.getSendCouponList();
			});
		},
		components: {
			uniLoadMore,
		},
		onShow() {

		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.getSendCouponList();
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.couponList.length > 0;
		  },
		  //Vuex引入属性
		  ...mapState(['accumulateNum'])
		},
		methods: {
			//Vuex引入方法
			...mapMutations(['accumulate']),
			// 优惠券列表
			getSendCouponList() {
				this.showLoading();
				if (this.loading) return;
				this.loading = true;
				this.$api.getSendCouponList(this.currentPage,20).then(res => {
					this.hideLoading();
					this.loading = false;
					
					if (res.couponMessage.length == 0) {
						// this.showDefaultPage = true;
						this.noMore = true;
					}
					for (let i of res.couponMessage) {
						if (Number(i.couponChange) > Number(this.accumulateNum)) {
							i.isGetCoupon = false;
							console.log('000000');
						} else {
							i.isGetCoupon = true;
							console.log('1111111');
						}
					}
					console.info(res);
					this.currentPage++;
					this.couponList = this.couponList.concat(res.couponMessage);
					// this.couponList = res.couponList;
				}).catch(error => {
					this.showError(error);
					this.hideLoading();
					this.loading = false;
				})
			},
			// 兑换优惠券
			receiveCouponList(index,item, templetId, couponChange) {
				console.info(item);
				this.showLoading();
				this.$api.receiveCouponList(templetId, 1, couponChange).then(res => {
					this.hideLoading();
					this.accumulateNum = this.accumulateNum - Number(couponChange);
					this.couponList[index].receiveStatus=1;
					this.accumulate(this.accumulateNum);
					// this.currentPage=1;
					// this.getSendCouponList();
					// this.onLoad();
					console.info(res);
				}).catch(error => {
					this.showError(error);
					this.hideLoading();
				})
			},
			// 获取当前积分数量
			getDataDisplay() {
				return new Promise((RES,REJ)=>{
					this.showLoading();
					this.$api.getDataDisplay().then(res => {
						this.hideLoading();
						console.info(res);
						this.accumulateNum = res.accumulateNum;
						RES();
					}).catch(error => {
						this.showError(error);
						this.hideLoading();
					})
				})
				
			},
			// 获取更多积分
			gotoGetMoreCode() {
				uni.navigateTo({
					url: '../myself_MyIntegral/myself_MyIntegral'
				});
			}
		},
	}
</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';

	page {
		width: 100%;
		height: 100%;
		background: #F5F5F5;
	}
	.container {
		width: 100%;
		height: 100%;
		border-top: 1upx solid #eee;

		// 头部积分
		.HeaderTitle {
			padding: 40upx;
			background: #fff;
			
			.HnowScore {
				width: 50%;
				text-align: left;

				.Hscore {
					font-size: 36upx;
					color: #151515;
				}
			}

			.gerMoreScore {
				color: #6B7AF8;
				width: 50%;
				text-align: right;
			}
		}

		// 优惠券
		.CouponBox {
			padding: 30upx;
			margin-bottom: 30upx;

			.CBlist {
				margin-bottom: 30upx;

				.CBLeft {
					height: 200upx;

					.CBLmoney {
						color: #F03329;
						width: 30%;
						text-align: right;

						.Lmoney {
							font-size: 60upx;
							font-weight: bold;
						}
					}

					.CBLTitle {
						margin-left: 30upx;
						width: 60%;

						.LtitleName {
							height: 70upx;
							line-height: 70upx;
							width:100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.LtitleSub {
							height: 40upx;
						}
					}
				}

				.CBright {
					height: 200upx;
					width: 29%;
					background-repeat: no-repeat;
					background-size: 100%;

					.CBbox {
						margin: 0 auto;
						text-align: center;
						color: #fff;
						line-height: 60upx;
					}
				}
			}
		}
		.load-more{width:100% !important;text-align: center !important;}
		.default {
			position: fixed;
			top: 50%;
			left: 50%;
			margin-top: -86upx;
			margin-left: -115upx;
		}
	}
	
</style>
