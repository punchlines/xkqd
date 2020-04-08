<template>
	<view>
		<view class="swiper-container">
			<Image @click="go" class="swiper-item" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/pinGroup/banner2.png"></Image>
		</view>	 
		
		<view class="list">
			<template v-for="(item,index) in list" v-if="list.length>0">
				<circle-group :key="index"  @reduce="reduces(index)" :item='item'  :canClick="false"></circle-group>
			</template>
			
			
		</view>
		
	</view>
</template>

<script>
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2.js';
	import circleGroup from '@/components/circleGroup/circleGroup';
	export default {
		mixins:[loadMoreMixins],
		components:{circleGroup},
		data() {
			return {
				uid:null
			};
		},
		
		onLoad(options) {
			this.uid=options.uid;
			this.fetch();
		},
		methods:{
			reduces(index){
				this.$set(this.list[index],'endTime',this.list[index].endTime-1);
			},
			go(){
				this.navigateTo('/item_pinGroup/businessCC_rule/businessCC_rule');
			},
			fetch(){
				uni.showLoading({
					mask:true
				})
				const action  = this.$api.getMyAssembleList(this.currentPage,this.uid)
			
				this.loading=true;
				action.then(res=>{
				
					console.log(res)
					this.currentPage++;
					if(res.length==0){
						this.loading=false;
						this.noMore=true;
						uni.hideLoading();
						return;
					}
					res=res.map(item=>{
						let endTime = item.overTime - new Date().getTime();
						endTime = endTime<=0?0:~~(endTime/1000);
						return Object.assign({
							endTime:endTime
						},item)
						
					});
					this.list = this.list.concat(res);
					this.loading=false;
					uni.hideLoading();
				}).catch(err=>{
					
					this.loading=false;
					uni.hideLoading();
				});
				
			}
			
		}
	}
</script>

<style lang="less">
	Page{
		background: #F1F2F4;
		min-height: 100vh;
		padding-bottom: 130upx;
	}
	
	.swiper-container{
		width:100%;
		height:300upx;
		box-sizing: border-box;
		padding: 30upx;
		border-radius:10upx;
		Image{
			border-radius:10upx;
			width:690upx;
			height:300upx;
			
		}
	}
	.list{
		padding: 0upx 30upx;
		margin-top: 60rpx;
	}
</style>
