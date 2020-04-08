<template>
	<view class="container">
		<view class="descoverItem fx-row fx-row-center fx-row-space-around">
			<descover-item :showPraise="showPraise" @praise="onPraise" :recommendList="recommendList"></descover-item>
		</view>
		<view v-if="recommendList.length==0 && !loading" class="default">
			<default-page :messageToPage="messageToPage"></default-page>
		</view>
		<uni-load-more v-else :loading-type="loadingType2" ></uni-load-more>
	</view>
</template>

<script>
	//import loadMoreMixins from '@/js/mixins/loadMoreMixins2';
	import descoverItem from './descoverItem.vue';
	export default {
		name:"descoverRecommend",
		//mixins: [loadMoreMixins],
		components:{descoverItem},
		props: {
			loadingType: {
				type: Number,
				default: 0
			},
		},
		
		computed: {
			loadingType2() {
				return this.loadingType;
			}
		},
		
		data() {
			return {
				loading: false,
				recommendList:[],
				showPraise:true,
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/shoucang.png',
					title: '当前暂无推荐'
				},
				currentPage: 1,
			};
		},
		mounted () {
			
			this.doLoginHandle(hasReg=>{
				const journalMessage = uni.getStorageSync('tempRecommend') || [];
				journalMessage.forEach(item => {
					try {
						item.praiseType = Number(item.praiseType)
						item.images = JSON.parse(item.images)
					} catch (e) {
						item.images = []
					}
				})
				this.recommendList = journalMessage;
				this.fetch();
			})
			
			
			
		},
		
		methods:{
			onPraise(data){
				let {index} = data;
				this.$api.praise(this.recommendList[index].journalId, 1).then(()=>{
					console.log("check")
					this.recommendList[index].praiseType = this.recommendList[index].praiseType ? 0 : 1;
					this.recommendList[index].praiseNum += !!this.recommendList[index].praiseType ? 1 : -1;
				
				}).catch(error => {
					this.showError(error);
				});
			},
			
			reFetch(){
				if (this.$store.state.needUpdateDiscovery) {
					this.recommendList = [];
					//this.reset();
					this.currentPage=1;
					this.fetch();
					this.$store.commit('setNeedUpdateDiscovery', false);
				}
			},
			
			// 跳转至详情页
			gotoDetail(){
				uni.navigateTo({
					url: '../../item_descover/descover_details/descover_details',
				});
			},
			// 获取推荐列表
			fetch(){
				console.log("fetch")
				this.loading = true;
				this.showLoading();
				this.$api.getMessage(1, this.currentPage).then(res=>{
					//this.hideLoading();
					// 缓存第一页的数据
					let list = res.journalMessage;
					if (this.currentPage === 1) {
						this.recommendList = [];
						uni.setStorageSync('tempRecommend', list);
					}

					list.forEach(item => {
					  try {
					  	item.praiseType = Number(item.praiseType)
					    item.images = JSON.parse(item.images)
					  } catch (e) {
					    item.images = []
					  }
					})
					if (list.length === 0) {
						//this.noMore = true;
						this.$emit("noMore");
					}
					
					
					this.recommendList = this.recommendList.concat(list);
					this.$emit("finish");
					this.loading = false;
					this.currentPage++;
					
					this.hideLoading();
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
					this.$emit("finish");
					this.loading = false;
					
				})
			},
		}
	}
</script>

<style scoped lang="less">
	@import '../../../css/mzl_base.less';

	page {
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

</style>
