<template>
	<view>
		<view class="listContainer">
			<card-circle-item :canClick="false" @oclick="oclick(item.id)" v-for="item in list" :key="item.id" :datas="item"></card-circle-item>
			
			<uni-load-more :loading-type="loadingType"></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	import CardCircleItem from "@/components/CardCircleItem";
	export default {
		data() {
			return {
				list: [],
				loading: false,
				noMore: false,
				currentPage: 1,
				msgId:null
			};
		},
		components: {
			CardCircleItem,
			uniLoadMore
		},
		computed: {
			loadingType() {
				if (this.noMore) return 2;
				if (this.loading) return 1;
				return 0;
			}
		},
		
		onLoad(options) {
			this.msgId = options.msgId;
			this.fetch();		
		},
		
		onReachBottom() {
			if (this.noMore || this.loading) return;
			this.fetch();
		},
		methods:{
			oclick(id){
				console.log("oclick");
				uni.showModal({
					title:"提示",
					content:"确定转发到这个群吗",
					success: (res) => {
						if(res.confirm){
							this.$api.transmitCircleUserMessage(id,this.msgId).then(res=>{
								this.showTips("转发成功").then(uni.navigateBack);
							}).catch(err=>this.showError(err));
						}
					}
				})
			},
			fetch() {
				if (this.loading) return;
			
				this.loading = true;
				this.$api.getUserCardCircleList(this.currentPage).then(result => {
					const list = result;
					if (list.length === 0) this.noMore = true;
					this.list = this.list.concat(list);
					this.loading = false;
					this.currentPage++;
					uni.hideLoading();
				}).catch(error => {
					this.showError(error);
					this.loading = false;
					uni.hideLoading();
				})
			},
			reset() {
				this.currentPage = 1;
				this.list = [];
				this.loading = false;
				this.noMore = false;
			}
		}
		
	}
</script>

<style lang="less">
	page{
		background-color: #f5f5f5;
		padding-top: 30rpx;
	}
	.listContainer {
		.listOne {
			margin-bottom: 24upx;
		}
	}
</style>
