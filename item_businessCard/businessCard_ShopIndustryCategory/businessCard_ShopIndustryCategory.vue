<template>
	<view class="container">
		<view class="title">请选择行业类别</view>
		<view class="cateCon fx-row fx-row-space-between fx-row-center fx-wrap">
			<view class="cate fx-row fx-row-center" v-for="(item,index) of cateList" :key="index" @click="getCate(index,item)">
				<view class="cate-item" :class="{'active':index==Tactive}">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="btnCon">
			<view class="btn" @click="gotoBeforePage">确定</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	
	export default {
		data() {		
			return {
				Tactive:0,
				cateList:[],
				fromMyself:'',//个人中心中的修改店铺资料
				
			};
		},
		methods:{
			listShopClassify(){
				this.$api.listShopClassify(1).then(result => {
					this.cateList = result.shopClassifyList
				}).catch(error => {
				console.error(error)
				})
			},
			getCate(index,item){//选择行业类别
				this.Tactive=index;
			},
			gotoBeforePage(){
				this.setItemShopClassify(this.cateList[this.Tactive])
					uni.navigateBack({
						//返回上一页 
						delta: 1
					});		
			},
			//Vuex引入方法
				...mapMutations(['setCardUserId','setUPinfo','setCarGoods','setItemShopClassify'])
		},
		onLoad(options){
			this.listShopClassify();
		},
		computed: {
		//Vuex引入属性
		...mapState(['cardUserId','UPinfo','carGoods','shareId','itemShopClassify'])
		},
	}
</script>

<style lang="less">

page{
	background:#F5F5F5;width:100%;height: 100%;
}
.container{
	width:100%;font-family:PingFangSC;
	box-sizing:border-box;padding:37upx 0 100upx 0;
	.title{font-size:32upx;color:#333333;margin-bottom:33upx;font-weight:500;padding-left:30upx;}
	.cateCon{
		width:100%;box-sizing:border-box;padding:0 15upx;
		.cate{
			width:33.3%;margin-bottom:30upx;
			.cate-item{
				width: 210upx;margin: 0 auto; height: 88upx;line-height: 88upx;border: 1px solid #CCCCCC;
				text-align: center;border-radius:4upx;font-size:28upx;
			}
		}
		
		.active{
			border: 1px solid #6B7AF8;background: #F4F5FF;color: #6B7AF8;
		}
	}
	.btnCon{
		position: fixed;width: 100%;height:98upx;bottom: 0;background: #FFFFFF;
		.btn{
			width:620upx; height: 80upx;line-height: 80upx; margin: 0 auto;border-radius: 40upx;
			background:#6B7AF8 ;text-align: center;font-size:32upx;color: #FFFFFF;margin-top:9upx;
		}
	}
}
</style>
