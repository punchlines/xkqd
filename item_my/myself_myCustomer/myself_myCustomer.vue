<template>

	<view class="container">
		<view class="Content">
			
			<!-- 搜索框 -->
			<view class="searchTemplateContainer" >
				<wx-view custom-class="container1">
					<view class="CMsearch">
						<view class="CMimage">
							<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'" mode="widthFix"></image>
						</view>
						<view class="CMinput">
							<input type="text" class="" v-model="key" placeholder="搜索客户" ref="input" @confirm-type="search" @confirm="search"></input>
						</view>
					</view>
				</wx-view>
			</view>
			
			<!-- 我的客户 -->
			<view class="storeListBox">
				<view class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in myCustomer" :key="index"
				 @click="gotoMyCard(item.mpUserInfo.id)">
					<view class="Limage">
						<default-image :src="item.mpUserInfo.headImage" custom-class="Cimage"></default-image>
					</view>
					<view class="LTitle fs3a32 fx-row fx-row-left">
						<view class="LtitleName">{{item.mpUserInfo.name}}</view>
						<view class="LtitleSubName fs6a24">{{item.mpUserInfo.job}}</view>
					</view>
					<view class="applyBox">
						<view class="Bapply fs9a24">{{item.time}}</view>
					</view>
				</view>
				<view v-if="myCustomer.length==0" class="default">
					<default-page :messageToPage="messageToPage"></default-page>
				</view>
				<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	export default {
		data() {
			return {
				myCustomer: [],
				currentPage: 1,
				loading: false,
				noMore: false,
				// 缺省页
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '当前无客户'
				},
				showDefaultPage: false,
				key:""
			}
		},
		components: {
			uniLoadMore,
		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.getCustomerList();
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.myCustomer.length > 0;
		  },
		},
		methods: {
			search(){
				this.currentPage=1;
				this.myCustomer=[];
				this.noMore=false;
				this.getCustomerList();
			},
			
			
			//跳转到名片
			gotoMyCard(cardUserId) {
				uni.navigateTo({
					url: '../../pages/businessCard2/businessCard2?cardUserId=' + cardUserId
				});
			},
			// 加载客户列表
			getCustomerList() {
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.myCustomer(this.currentPage,this.key).then(result => {
					this.hideLoading();
					console.log(result)
					this.loading = false;
					if (result.customerList.length == 0) {
						// this.showDefaultPage = true;
						this.noMore = true;
					}
					
					this.currentPage++;
					this.myCustomer = this.myCustomer.concat(result.customerList);
					
					// this.myCustomer = result.customerList;
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			},
		},
		onLoad() {
			this.getCustomerList();
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';



	page {
		// background: @grayBg;
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
	}

	.container {
		border-top: 1upx solid #eee;
		padding: 0 30upx;
		width: 100%;
		height: 100%;
		background: #fff;
		background-color: #f5f5f5;
		.searchTemplateContainer {
			padding: 15upx 15upx 0 15upx;
			margin-bottom: 5upx;
			
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
		
		.listContainer {
			padding: 0 30upx;
		
			.listOne {
				margin-bottom: 24upx;
			}
		}

		// 店铺列表
		.storeListBox {
			.SBlist {
				padding: 30upx 0 30upx 0;
				border-bottom: 1upx solid #eee;

				.Limage {
					width: 15%;
					text-align: left;

					.Cimage {
						width: 80upx;
						height: 80upx;
						vertical-align: middle;
					}
				}

				.LTitle {
					width: 65%;
					text-align: left;

					.LtitleName {
						margin-right: 30upx;
						font-size: 30upx;
					}

					.LtitleSubName {
						background: #F1F1F1;
						border-radius: 18upx;
						font-size: 20upx;
						height: 36upx;
						line-height: 36upx;
						padding: 0 20upx 0 20upx;
					}
				}

				.applyBox {
					width: 20%;
					text-align: center;
					line-height: 64upx;
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
