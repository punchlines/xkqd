<template>
	<view class="container">
		<view class="goods-list">

			<view class="goods" v-for="(goods, index) in recommendList" :key="index" @click="openGoodsDetail(goods)">
				<view class="goods_cover">
					<!-- <default-image :src="goods.coverImage"></default-image> -->
					<image class="goods_cover-image" :src="goods.coverImage" style="width: 100%;height: 100%;position: absolute;"></image>
					<text class="godds_score">评分 {{ goods.score }}</text>
				</view>
				<view class="goods_info_container">
					<view class="goods_name single-line">{{ goods.title }}</view>
					<view class="goods_meta">
						<view class="godds_price"><price v-model="goods.preferentialPrice"></price></view>
						<text class="goods_sell_count">已售{{ goods.salesNum||0 }}</text>
					</view>
				</view>
			</view>
			<view v-if="recommendList.length==0 && !loading" class="default">
				<default-page :messageToPage="messageToPage"></default-page>
			</view>

			<!--<goods-item :goods="item" :auto="true" v-for="(item, index) in recommendList"></goods-item>-->
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
    //import GoodsItem from "../../../components/goodsItem";

	export default {
		name:"descoverCollection",
		
		data() {
			return {
				recommendList:[],
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/shoucang.png',
					title: '当前暂无收藏'
				},
				showPraise:true,
				currentPage: 1,
				loading: false,
				noMore: false,
			};
		},
		mounted() {
			this.getMessage();
		},
		components: {
			uniLoadMore
		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.getMessage();
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.recommendList.length > 0;
		  },
		},
		methods:{
          openGoodsDetail (goods) {
            this.navigateTo('/module/shop/goodsDetail/goodsDetail',{
              id: goods.goodsId || goods.id ,
              shopId: goods.shopId,
            })
          },

			// 跳转至详情页
			gotoDetail(){
				uni.navigateTo({
					url: '../../item_descover/descover_details/descover_details',
				});
			},
			// 获取推荐列表
			getMessage(){
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.getMessage(3,this.currentPage).then(res=>{
					this.hideLoading();
					this.loading = false;
					res.journalMessage.forEach(item => {
                      if (!item.score) item.score = 0;
                      item.score = item.score ==0 ? 0 : item.score.toFixed(1)
					})
					console.log('收藏');
					console.info(res);
					if (res.journalMessage.length == 0) {
						this.noMore = true;
					}
					
					this.currentPage++;
					this.recommendList = this.recommendList.concat(res.journalMessage);
                  console.log(this.recommendList)
                  // this.recommendList=res.journalMessage;
				}).catch(error => {
					this.hideLoading();
					this.loading = false;
					this.showError(error);
				})
			},
		}
	}
</script>

<style scoped lang="less">
	@import '../../../css/mzl_base.less';

	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 30upx;
	}


	.page {
		width: 100%;
		height: 100%;
		background: @grayBg;
	}
	.container{
		width: 100%;
		box-sizing: border-box;
		.descoverItem {
			width:100%;
		}
		.default {
			position: fixed;
			top: 50%;
			left: 50%;
			margin-top: -86upx;
			margin-left: -115upx;
		}
	}

	.goods {
		width: calc(~"50% -"9upx);
		margin-right:16upx;
		border-radius: 8upx;
		margin-bottom: 20upx;
		position: relative;

		&.auto {
			width: auto;
		}

		&:nth-child(2n) {
			margin-right: 0;
		}

		.goods_cover {
			width: 100%;
			padding-bottom: 100%;
			height: 0;
			background-color: #EEEEEE;
			position: relative;

			.goods_cover-image {
				width: 100%;
				height: 100%;
				position: absolute;
			}

			.godds_score {
				position: absolute;
				bottom: 0;
				right: 20upx;
				width: 100upx;
				height: 40upx;
				line-height: 40upx;
				background: #DDAB5C;
				border-radius: 4px;
				transform: translateY(50%);
				font-size: 20upx;
				color: #FFFFFF;
				text-align: center;
			}

		}

		.goods_name {
			font-size: 28upx;
			color: #333333;
			margin-bottom: 20upx;
		}

		.goods_meta {
			display: flex;
			align-items: center;
		}

		.godds_price {
			flex: 1;
			color: #FF5858;
		}

		.goods_sell_count {
			font-size: 24upx;
			color: #999999;
		}

		.goods_info_container {
			background-color: #FFFFFF;
			padding: 0 20upx;
			padding-top: 30upx;
			padding-bottom: 37upx;
		}


	}
		
</style>
