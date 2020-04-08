<template>
	<view class="container">
		<!-- 提成记录 -->
		<view class="balanceDetail">
			<view class="BDlist" v-for="(item,index) in Balance" :key="index">
				<view class="ListBox fx-row fx-row-center fx-row-space-around">
					<view class="Lleft">
						<view class="Ltitle fs6a30">订单号：{{item.orderNum}}</view>
						<view class="Ltime fs9a24 fx-row fx-row-center fx-row-space-around">
							<view class="Time">{{formatTime[index]}}</view>
							<view class="Lright fs3a32">¥{{item.gainMoney}}</view>
						</view>
					</view>
				</view>
				<view class="Lbottom">
					<view class="lfromW" v-if="item.fromUserName">来自 {{item.fromUserName}}</view>
				</view>
			</view>

			<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>

			<view v-if="showDefaultPage" class="default">
				<default-page :messageToPage="messageToPage"></default-page>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	import mzlJS from '../../js/mzl.js';
	export default {
		data() {
			return {
				Balance: [],
				formatTime: [],
				currentPage: 1,
				loading: false,
				noMore: false,
				showDefaultPage: false,
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/dingdan.png',
					title: '您当前没有提成记录'
				}
			}
		},
		components: {
			uniLoadMore,
		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.listGainRecord();
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.Balance.length > 0;
		  },
		},
		methods: {
			listGainRecord() {
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.listGainRecord(this.currentPage).then(res => {
					console.log(res);
					this.hideLoading();
					if (res.gainRecordList.length == 0) {
						this.showDefaultPage = true;
						this.noMore = true;
					}
					for (var i of res.gainRecordList) {
						i.gainTime;
						this.formatTime.push(mzlJS.formatTime(i.gainTime));
					}
					
					this.currentPage++;
					this.Balance = this.Balance.concat(res.gainRecordList);
					
					// this.Balance = res.gainRecordList;
					
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			}
		},
		onLoad() {
			this.listGainRecord();
		}

	}
</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';


	.container {
		background: #fff;
		width: 100%;
		padding: 0 40upx;
		border-top: 1upx solid #eee;

		// 余额明细
		.balanceDetail {
			.BDlist {
				border-bottom: 1upx solid #eee;
				padding-bottom: 20upx;

				.ListBox {
					padding: 30upx 0;

					.Lleft {
						width: 100%;
						text-align: left;

						.Ltitle {
							width: 100%;
							margin-bottom: 20upx;
							color: #000;
							font-size: 32upx;
							font-weight: 900upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.Ltime {
							.Time {
								width: 80%;
							}

							.Lright {
								width: 20%;
							}
						}
					}

					.Lright {
						width: 30%;
						text-align: right;
					}
				}

				.Lbottom {
					.lfromW {
						display: inline-block;
						line-height: 50upx;
						height: 50upx;
						background: rgba(244, 245, 255, 1);
						border-radius: 25px;
						padding: 0 30upx;
						color: #6B7AF8;
						font-size: 25upx;
					}
				}
			}

			.default {
				position: fixed;
				top: 50%;
				left: 50%;
				margin-top: -86upx;
				margin-left: -115upx;
			}
		}

	}
</style>
