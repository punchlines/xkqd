<template>
	<view class="container1">
		<view>
			<!-- 处理按钮 -->
			<view class="DealWithBtn fx-row fx-row-center fx-row-left">
				<view :class="{'arealyDeal':true,'fsf28':true,'waitDealActive':index==titleActive}" @click="ChangeTitle(index)"
					v-for="(item,index) in titleName" :key="index" >
					{{item.title}}
				</view>
			</view>
			<!--售后订单列表 待处理 -->
			<view v-if="titleActive==0" class="AllOrderListBox">
				<waitDeal :Alllist="Alllist" status="0"></waitDeal>
				<view v-if="Alllist.length==0" class="default">
					<default-page  :messageToPage="messageToPage"></default-page>
				</view>
			</view>
			<!--售后订单列表 已经处理 -->
			<view v-if="titleActive==1" class="AllOrderListBox">
				<waitDeal :Alllist="Alllist" status="1"></waitDeal>
				<view v-if="Alllist.length==0" class="default">
					<default-page  :messageToPage="messageToPage"></default-page>
				</view>
			</view>
		</view>
		<uni-load-more :loading-type="loadingType" v-if="Alllist.length!=0"></uni-load-more>
	</view>
</template>

<script>

	import waitDeal from './waitDeal.vue';
	import alreayDeal from './alreayDeal.vue';

	const STATUS_MAP = {
		1: '待处理',
		2: '同意',
		3: '拒绝',
		4: '已撤销',
	}

	export default {
		name:'AfterService',



		data() {
			return {
				// 未处理的订单
				Alllist:[],
				// 已经处理的订单
				arealyDeal:[],
				titleName:[
					{id:0,title:'待处理'},{id:1,title:'已处理'},
				],
				titleActive:0,
				type: 1,
				messageToPage:{
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/dingdan.png',
					title:'您当前没有订单'
				},
				showDefaultPage:true,
				pendingCount: 0,
				loading:false,
				noMore:false,
				currentPage:1
			};
		},
		components:{
			waitDeal,
			alreayDeal
		},
		mounted () {
			this.fetch();
		},

		onShow () {
			
		},

		methods:{
			// 获取售后数据     类型(type:  1.待处理 2.已经处理)
			fetch (){
				if(this.loading || this.noMore)
					return
				
				this.loading = true;
				this.$api.getShopRefundList(this.currentPage,this.titleActive).then(res => {
					this.loading =false;
					console.log(res)
					
					if(res.length==0){
						this.noMore = true;
						return;
					}
						
					this.currentPage++;
					this.Alllist = this.Alllist.concat(res);
					
					
					// 	if(!result){
					// 	
					// 	return
					// }
					// if (this.type == 1) {
					// 	this.pendingCount = result.pendingCount || 0;
					// }
					// this.loading = false;
					// const list = result.refundList;
					// list.forEach(item => {
					// 	item._status = STATUS_MAP[Number(item.status)]
					// })
					// if (list.length === 0) {
					// 	this.noMore = true;
					// }
					// this.Alllist = this.Alllist.concat(list);
					// this.currentPage++;
				}).catch(error => {
					this.loading = false;
				})
			},


			refetch(){
				this.Alllist = [];
				this.loading = false;
				this.noMore = false;
				this.currentPage = 1;
				this.fetch();
			},
			// 切换标题
			ChangeTitle(index){
				this.titleActive = index;
				this.Alllist = [];
				this.loading = false;
				this.noMore = false;
				this.currentPage = 1;
				this.fetch();
			},
			 
			
		}
	}
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';

	// 处理按钮
	.DealWithBtn{
		padding:30upx 0 0 30upx;
		.arealyDeal{
			.buttonRadius(@w:190upx,@h:64upx,@bg:#ccc);margin-right:30upx;
		}
		.waitDealActive{.buttonRadius(@w:190upx,@h:64upx,@bg:#6B7AF8)}
	}
	/* // 售后订单列表 */
	.AllOrderListBox{
		margin-top:40upx;background: #fff;
	}
	.default{
		position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
	}
</style>
