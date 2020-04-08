<template>
	<view class="container">
		<view class="title"> 全部商品 </view>
		<view class="list">
			<template v-for="(item,index) in list">
				<pin-goods-item2 :item="item" :index="index" @sel="sel(index)" :active="active"></pin-goods-item2>
			</template>
			
		</view>
	
		<uni-load-more :loadingType="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import  loadMoreMixins  from "@/js/mixins/loadMoreMixins2.js";

	import {pinGoodsItem2} from '../_components/pinGoodsItem2/pinGoodsItem2'
	// import { mapState } from 'vuex'
	export default {
		mixins:[loadMoreMixins],
		data() {
			return {
				list:[],
				shopId:0,
				active:0
			};
		},
	
	
		components: {
			pinGoodsItem2
		},
				
		
		onLoad() {
			//抓取商品
			this.shopId = uni.getStorageSync('shopId');
			
			//let res = await this.$api.listMyShopGoods(shopId,0,this.currentPage);
			this.fetch();
		},
		
		methods: {
			fetch() {
				if(!this.shopId) return
				uni.showLoading();
				this.loading=true;
				this.$api.listMyShopGoods(this.shopId,0,this.currentPage,1).then(res=>{
					uni.hideLoading();
					this.loading=false;
					this.currentPage++;
					
					if(res.myShopGoodsList.length==0){
						this.noMore=true;
						return;
					}
					
					this.list = this.list.concat(res.myShopGoodsList); 
				})
			},
			sel(index){
				this.active=index;
				//setvuex
				this.$store.commit('setPinGoodInfo',this.list[index]);
				this.showTips('设置成功').then(()=>uni.navigateBack({
					
				}))
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		padding: 30upx;
		background: #f5f5f5;
		min-height: 100vh;
		
		
		.title{
			font-size:30upx;
			font-family:Adobe Heiti Std R;
			font-weight:bold;
			color:rgba(26,26,26,1);
		}
		.list{
			padding: 10upx;
				
			
		}
	}
	
</style>
