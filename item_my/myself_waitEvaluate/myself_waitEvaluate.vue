<template>
	<view class="container1">
		<!-- 待评价订单列表 -->
		<view  v-for="(it,index) in Alllist" :key="index">
			<view class="AllOrderListBox">
				<view class="AOLlist">
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName" @click="gotoShop(it.shopId)">
							<image :src="it.shopCover" mode="aspectFill" class="Image"></image>
							<text class="fs3a28">{{it.shopName}}</text>
						</view>
						<view class="LHorderState fs6a24">待评价</view>
					</view>
				</view>
				<!-- <view v-for="(todo,to) in it.orderItemList" :key="to"  @tap="gotoWaitEvaluateDetail(todo.goodsId)"> -->
					<view class="ListCenter" @click="gotoWaitEvaluateDetail(it)">
						<view class="LCproductList fx-row fx-row-center">
							<view class="PLitem">
								<image :src="it.cover" mode="aspectFill" class="Image"></image>
							</view>
						</view>
					</view>
					<view class="ListBottom">
						<!-- <view class="LBproductNum fs3a28 fx-row-right">共{{todo.goodsNum}}件商品，共¥{{todo.goodsAmount}}</view> -->
						<view  class="LBproductNum fs3a28 fx-row-right">
							共 1 件商品，共¥{{it.goodsTotalPrice}}
						</view>
					</view>
				<!-- </view> -->
			</view>
		</view>

		<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>

		<view v-if="Alllist.length==0" class="default">
			<default-page  :messageToPage="messageToPage"></default-page>
		</view>
	</view>
</template>

<script>
	import shoppingListMixins from '../_orderMixins/shoppingListMixins.js';
	import uniLoadMore from '@/template/uni-load-more.vue';
	export default {
		name:'WaitEvaluate',
		mixins:[shoppingListMixins],
		
		onShow () {
			
		},
		
		
		methods:{
			
			gotoWaitEvaluateDetail(it){//TODO 去评价
				
				this.navigateTo('../myself_goodsComment/myself_goodsComment',{
					data:encodeURIComponent(JSON.stringify(it))
				});
			},
			
			// 获取待评价商品列表
			fetch(){
				if(this.loading || this.noMore) return
				this.loading = true;
				this.showLoading();
				this.$api.getWaitAppraise(this.currentPage).then(res=>{
					this.hideLoading();
					this.loading = false;
					
					this.currentPage++;
					this.Alllist = this.Alllist.concat(res);

					if(res.length==0){
						this.noMore=true;
					}
					

				}).catch(error=>{
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			}
		},
		
	}
</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';

	/* // 待评价订单列表 */
	.AllOrderListBox{
		margin-top:40upx;background: #fff;
		.AOLlist{
			.ListHeader{
				 padding:30upx;
				.LHstoreName{
					width:80%;
					.Image{width:60upx;height: 60upx;vertical-align: middle;margin-right: 20upx;}
				}
				.LHorderState{
					width:20%;text-align: right;
				}
			}
		}
		.ListCenter{
			background:@grayBg;padding:30upx;
			.LCproductList{
				flex-wrap:wrap;
				.PLitem{
					width:25%;margin-bottom:20upx;
					.Image{width:160upx;height: 160upx;vertical-align: middle;margin-right:30upx;}
				}
			}
		}
		.ListBottom{
			background: #fff;text-align: right;padding:30upx;
		}
	}
</style>
<style lang="less">
	.default{
		position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
	}
</style>
