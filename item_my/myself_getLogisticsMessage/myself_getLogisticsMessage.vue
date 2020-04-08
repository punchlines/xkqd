<template>
	<view>
		<view class="container">
			<view class="SearchBox">
				<view class="Search fx-row fx-row-center fx-row-space-around">
					<view class="SearchIcon">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
					</view>
					<view class="SearchInput fs3a28">
						<input v-model="searchContent" type="text" placeholder="请输入物流公司名称进行搜索" confirm-type="search" @confirm="shareTap">
					</view>
				</view>
			</view>
			<!-- 全部数据列表 -->
			<view class="CompanyList">
				<view @click="selectCompany(index,item.id)" v-for="(item,index) in list" :key="index" class="LogCompanyBox fx-row fx-row-center fx-row-space-around">
					<view :class="{'CompanyName':true,'fs3a28':true,'ActiveTitle':index==ActiveIndex}">{{item.logisticsCompany}}</view>
					<view class="CompanySelect">
						<image :style="{'opacity':ActiveIndex==index?1:0}" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png" mode="aspectFit"></image>
					</view>
				</view>
				<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</view>
			<view class="selectCompany" @click="goBackLogistics()">
				<view class="CompanyBtn fsf28">确定</view>
			</view>
		</view>
	</view>
</template>
<script>

	import {mapState,mapMutations} from 'vuex';
	import loadMoreMixins2 from '@/js/mixins/loadMoreMixins2';
	
	export default {
		
		mixins:[loadMoreMixins2],
		data() {
			return {
				onlineSite: this.global.onlineSite,
				ActiveIndex: 0,
				list: [],
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				logisticsCompany: '',//物流公司
				searchContent: '',//搜索到的内容
				isSearch:false
			}
		},
		watch: {
		
		},
		
		methods: {
			//搜索框回车
			shareTap(){
				if(this.searchContent.trim()==""){
					this.isSearch=false;
				}else this.isSearch=true;
				this.noMore = false;
				this.currentPage=1;
				this.ActiveIndex = 0;
				//this.logisticsCompany='';
				this.list=[];
				this.fetch();
			},
			
			successCB(res){
				this.currentPage+=1;
				this.isLoading=false;
				if(res.length==0){
					this.noMore=true;
					return;
				}
				
				this.list=this.list.concat(res);
				this.logisticsCompany = this.list[this.ActiveIndex].id;
				console.info(this.list);
			},
		
		
			// 获取物流公司信息
			fetch() {
				this.isLoading=true;
				if(!this.isSearch)
					this.$api.getLogisticsMessage(this.currentPage).then(res => {
						this.successCB(res);
					}).catch(error => {
						this.showError(error);
					});
				else 
					this.$api.getLogisticsData(this.searchContent,this.currentPage).then(res=>{
						this.successCB(res);
					}).catch(error => {
						this.showError(error);
					});
			},
			// 下标
			selectCompany(index, logisticsCompany) {
				console.log(index);
				this.ActiveIndex = index;
				this.logisticsCompany = logisticsCompany;
			},
			//Vuex引入方法
			...mapMutations(['selectLogCompanyName']),
			// 确定后返回上个页面
			goBackLogistics() {
				console.log('公司：'+this.logisticsCompany);
				this.selectLogCompanyName(this.list[this.ActiveIndex]);
				uni.navigateBack({
					delta: 1
				});
// 				uni.navigateTo({
// 					url: '../myself_salesOrderSendsGoods/myself_salesOrderSendsGoods'
// 				});
			},
		},
		onLoad() {
			this.fetch(); //默认加载10条数据
		},
		
	
		// onReachBottom() {
		// 	if (this.loadingType !== 0) {
		// 		return;
		// 	}
		// 	this.loadingType = 1;
		// 	
		// 	let list = [],
		// 		maxItem = this.list[this.list.length - 1],
		// 		length = maxItem + 6;
		// 	for (let i = maxItem + 1; i < length; i++) {
		// 		list.push(i);
		// 	}
		// 	
		// 	setTimeout(() => {
		// 		//下拉加载搜索的结果
		// 		if(this.isSearch&&this.list.length<this.totalpage){
		// 			this.pageNumber++;
		// 			this.getLogisticsData(this.pageNumber,10);
		// 		}else if(this.isLogList&&this.list.length<this.totalpage){
		// 			//下拉加载全部的数据
		// 			this.pageNumber++;
		// 			this.getLogisticsMessage(this.pageNumber, 10);	
		// 		}else{
		// 			// 没有数据
		// 			this.loadingType = 2;
		// 			return;
		// 		}	
		// 		this.loadingType = 0;
		// 		console.log('长度：' + this.list.length);
		// 	}, 800);
		// },

	}
</script>

<style scoped lang="less">

	@import '../../css/mzl_base.less';
	page {
		width: 100%;
		height: 100%;
		background: @grayBg;
	}
	.container {
		width: 100%;background:@grayBg;;
		.SearchBox {
			padding: 30upx;
			background: #fff;
			margin: 30upx 0;
			border-top:1upx solid #E1E1E1;
			.Search {
				.SearchIcon {
					width: 10%;

					image {
						width: 32upx;
						height: 32upx;
						vertical-align: middle;
					}
				}

				.SearchInput {
					width: 90%;
					text-align: left;
				}
			}
		}

		.CompanyList {
			padding-bottom: 120upx;
			background: #fff;
			min-height: 90vh;
			.LogCompanyBox {
				border-bottom: 1upx solid #EEEEEE;
				padding: 25upx 0;
				padding: 30upx;

				.CompanyName {
					width: 50%;
					text-align: left;
				}

				.ActiveTitle {
					color: #6B7AF8
				}

				.CompanySelect {
					width: 50%;
					text-align: right;

					image {
						width: 28upx;
						height: 22upx;
						vertical-align: middle;
					}
				}
			}
		}

		.selectCompany {
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 100upx;
			border-top: 1upx solid #E1E1E1;
			background: #fff;

			.CompanyBtn {
				.buttonRadius();
				font-size: 32upx;
				margin: 6upx auto;
				text-align: center;
			}
		}
	}
</style>
