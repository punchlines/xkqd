<template>
	<view class="container2">
		<view class="triangle">
			<view class="triangleBorderUp"></view>
		</view>
		<!-- 滚动导航 -->
		<view class="scrollTopBarBox">
			<view class="STBtabList fsf28">
				<view @click="getJournalType(scrollItem,scrollIndex)" v-for="(scrollItem,scrollIndex) in JournalType" :key="scrollIndex" :class="{'BTtitle':true,'HeaderTitle':scrollIndex==STBactive}">{{scrollItem.name}}</view>
			</view>
		</view>

		<journal-item :journal="journal" v-for="journal in journalList" :key="journal.journalMap.id" descover  @shareImage="shareImage1"></journal-item>
		<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>
		
		<make-share-image @touchmove.prevent v-if="makeShareImageVisible && currentJournal"  @close="makeShareImageVisible = false" :WXCodeUrl="WXCodeUrl"
			:journal="currentJournal" ></make-share-image>
	</view>
</template>

<script>
	import shareView from './descover_TshareView.vue';
	import JournalItem from "../../../components/JournalItem.vue";
	import uniLoadMore from '@/template/uni-load-more.vue';
	import makeShareImage from '../../../components/makeShareImage.vue';
	

	export default {
		name: 'trends',
		data() {
			return {
				commentContent: '',
				expand: false,
				showExpand: false,
				showDefaultPage: false,
				noMore: false,
				loading: false,
				currentPage:1,
				journalTypeId:0,	
				// 滚动导航
				scrollTopBar: [{
						id: 0,
						title: '全部'
					},
					{
						id: 1,
						title: '热门货源'
					},
					{
						id: 2,
						title: '采购信息'
					},
					{
						id: 3,
						title: '企业服务'
					},
					{
						id: 4,
						title: '热门货源'
					},
					{
						id: 5,
						title: '采购信息'
					},
					{
						id: 6,
						title: '木子李'
					}
				],
				JournalType: [], //获取日志分类列表
				journalList: [], //根据类型获取日志（动态）列表
				STBactive:0,
				WXCodeUrl:'',
				makeShareImageVisible: false,
				currentJournal: null,
			};
		},

		components: {
			shareView,
			JournalItem,
			makeShareImage,
			uniLoadMore,
		},
		onLoad() {
			this.listJournalType();
			this.listJournalByType(3);
		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.listJournalByType(this.journalTypeId);
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.journalList.length > 0;
		  },
		},
		methods: {
			shareImage1(e){
				console.log(e);
				this.makeShareImageVisible= true
				this.WXCodeUrl=e.WXCodeUrl;
				this.currentJournal = e.journal;
			},
				
			// 获取日志分类
			listJournalType() {
				this.showLoading();
				this.$api.listJournalType().then(res => {
					this.hideLoading();
					console.info(res);
					let all=[
						{id:0,name:'全部'}
					];
					this.JournalType =all.concat(res.journalTypeList);
				}).catch(error => {
					this.showError(error);
					this.hideLoading();
				})
			},
			// 根据类型获取日志（动态）列表
			getJournalType(scrollItem,index) {
				this.STBactive=index;
				this.journalTypeId=scrollItem.id;
				this.currentPage=1;
				this.journalList=[];
				if(index==0){
					this.listJournalByType(0);
				}else{
					this.listJournalByType(scrollItem.id);
				}
			},
			listJournalByType(type) {
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.listJournalByType(type, this.currentPage).then(res => {
					this.hideLoading();
					console.info(res);
					this.loading = false;
					const list = res.journalList;

					if (list.length == 0) {
						this.showDefaultPage = true;
						this.noMore = true;
					}
					list.forEach(item => {
						try {
							item.journalMap.images = JSON.parse(item.journalMap.images)
						} catch (e) {
							item.journalMap.images = []
						}
					})
					for (let i of list) {
						i.journalMap.isF = true;
					}
					this.currentPage++;
					this.journalList = this.journalList.concat(list);
				}).catch(error => {
					this.showError(error);
					this.hideLoading();
				})
			},

			// 轮播图图片数量
			changeSwiperNum(event) {
				this.currentNum = event.detail.current;
			},
		},
	}
</script>

<style scoped lang="less">

	@import '../../../css/mzl_base.less';

	.container2 {
		padding-bottom: 20upx;
	}

	.triangle {
		position: absolute;
		top: 104upx;
		left: 618upx;
	}

	.scrollTopBarBox {
		background: @tabActive;
		width: 100%;
		display: flex;
		height: 88upx;
		line-height: 88upx;

		.STBtabList {
			display: flex;
			width: 100%;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;

			.BTtitle {
				padding: 0 28upx;
				flex-shrink: 0;
			}
			.HeaderTitle{
				font-weight: 900;
			}
		}
	}
</style>
