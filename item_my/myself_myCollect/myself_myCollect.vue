<template>
	<view class="container">
		<!-- 头部标题 -->
		<view class="HeaderTitle">
			<view class="Title fx-row fx-row-center fx-row-space-around fs6a28">
				<view :class="{'Titem':true,'ItemActive':index==titleActiveIndex}" @click="changeTitle(index)" v-for="(item,index) in title"
				 :key="index">{{item.title}}</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="productList fx-row fx-row-center fx-row-space-around fx-wrap" v-if="titleActiveIndex==0">
			<goods-item :GoodsList="GoodsList"></goods-item>
			<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>
		</view>
		<!-- 店铺列表 -->
		<view class="storeList" v-if="titleActiveIndex==1">
			<shop-item :ShoreList="ShoreList"></shop-item>
			<uni-load-more :loading-type="loadingType1" v-if="showLoadMore1"></uni-load-more>
		</view>
		<!-- 资讯列表 -->
		<view class="consultList" v-if="titleActiveIndex==2">
			<view class="consultMess fs3a28">暂未开通</view>
		</view>
	</view>
</template>

<script>
	import goodsItem from './goodsItem.vue';
	import shopItem from './shopItem.vue';
	import uniLoadMore from '@/template/uni-load-more.vue';
	export default {
		data() {
			return {
				onlineSite: this.global.onlineSite,
				title: [{
						id: 0,
						title: '商品'
					},
					{
						id: 1,
						title: '店铺'
					},
					// {id:3,title:'资讯'}
				],
				titleActiveIndex: 0,
				GoodsList: [], //商品
				currentPage: 1,
				loading: false,
				noMore: false,
				ShoreList: [], //店铺
				currentPage1: 1,
				loading1: false,
				noMore1: false,
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/shoucang.png',
					title: '当前无收藏的商品'
				},
				
			}
		},
		components: {
			goodsItem,
			shopItem,
			uniLoadMore
		},
		onReachBottom () {
		  
			if(this.titleActiveIndex==0){
				if (this.noMore || this.loading) return;
				this.getCustomerList();
			}else if(this.titleActiveIndex==1){
				if (this.noMore1 || this.loading1) return;
				this.getShopList();
			}
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.GoodsList.length > 0;
		  },
			loadingType1() {
			  if (this.noMore1) return 2;
			  if (this.loading1) return 1;
			  return 0;
			},
			showLoadMore1 () {
			  return this.ShoreList.length > 0;
			},
		},
		methods: {
			// 获取收藏列表数据 ，3：商品 
			getCustomerList() {
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.myCollect(3, this.currentPage).then(result => {
					this.hideLoading();
					if (this.currentPage === 1) {
						this.GoodsList = []
					}
					this.loading = false;
					if (result.goodsList.length == 0) {
						// this.showDefaultPage = true;
						this.noMore = true;
					}
					
					this.currentPage++;
					this.GoodsList = this.GoodsList.concat(result.goodsList);
					
					// this.GoodsList = result.goodsList;
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			},
			// 获取收藏列表数据  2：店铺
			getShopList() {
				if (this.loading1) return;
				this.loading1 = true;
				this.showLoading();
				this.$api.myCollect(2, this.currentPage1).then(result => {
					this.hideLoading();
					if (this.currentPage1 === 1) {
						this.ShoreList = []
					}
					this.loading1= false;
					if (result.shopList.length == 0) {
						this.noMore1 = true;
					}
					this.currentPage1++;
					this.ShoreList = this.ShoreList.concat(result.shopList);
					
					// this.ShoreList = result.shopList;
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
					this.loading1 = false;
				})
			},
			// 切换标题
			changeTitle(index) {
				this.currentPage = 1;
				this.noMore = false;
				this.currentPage1 = 1;
				//2：店铺，3：商品 
				this.titleActiveIndex = index;
				if (index == 0) {
					//商品
					this.getCustomerList();
				} else if (index == 1) {
					// 店铺
					this.getShopList();
				}
			},
		},
		onShow () {
		  this.currentPage = 1;
		  this.currentPage1 = 1;
          if (this.titleActiveIndex == 0) {
            //商品
            this.getCustomerList();
          } else if (this.titleActiveIndex == 1) {
            // 店铺
            this.getShopList();
          }

			this.getCustomerList();
		}

	}
</script>
<!-- scoped -->
<style lang="less">
	@import '../../css/mzl_base.less';


	page {
		background: @grayBg;
		width: 100%;
		height: 100%;
	}

	.container {
		border-top: 1upx solid #eee;
		width: 100%;
		height: 100%;
		background: @grayBg;

		// 标题
		.HeaderTitle {
			width: 100%;
			background: #fff;

			.Title {
				.Titem {
					padding: 30upx;
				}

				.ItemActive {
					border-bottom: 3upx solid @tabActive;
					color: @tabActive;
				}
			}
		}
	}
</style>
