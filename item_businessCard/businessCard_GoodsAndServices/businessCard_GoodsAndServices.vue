<style scoped="scoped" lang="less">

	@import '../../css/mzl_base.less';
	.noeService1{
		margin: 20upx;
		padding: 20upx;
		margin-bottom: 20upx;
		border: solid #999 1upx;
		border-radius: 10upx;
		color: #999;
	}
	.noeService2{
		margin: 20upx;
		padding: 20upx;
		margin-bottom: 20upx;
		border: solid #4C8CFF 1upx !important;
		border-radius: 10upx;
		color:#4C8CFF ;
	}
	.noeService_title{
		font-weight: bold;
		font-size: 30upx;
	}
	.noeService_valaue{
		font-size: 26upx;
		padding-left: 20upx;
		margin-top: 10upx;
	}
	
	.gd{
		position: fixed;
		bottom: 0;
		display: flex;flex-direction: column;align-items: center;
		width: 100%;
		padding-bottom: 30upx;
	}
	 .questionButton{
	  .buttonRadius(@w:620upx,@h:88upx);text-align: center;line-height: 88upx;color:#fff;
	}
</style>
<template>
	<view class="fu">
		<view style="padding-bottom: 200upx;">
			<block v-for="(item,index) in goodsServices" :key='index'>
				<view :class="[item.status?'noeService2':'noeService1']" @click="ServiceTap(item,index)">
					<view class="noeService_title">{{item.serviceKey}}</view>
					<view class="noeService_valaue">{{item.serviceValue}}</view>
				</view>
			</block>
		</view>
		<view style="opacity: 0;">{{keyindex}}</view>
		<view class="gd">
			 <view class="questionButton fs3a32 " @click="SubmitSuggestions">确认</view>
		</view>
	</view>
</template>

<script>
	import api from "../../js/api.js";
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				goodsServices:[],
				keyindex:-1
			};
		},
		onLoad() {
			this.getListGoodsService()
		},
		methods:{
			// 发布商品-获取服务列表 
			getListGoodsService(){
				this.$api.listGoodsService().then(res=>{
					console.info(res)
					this.goodsServices=res.goodsServices
					for(let i=0;i<this.goodsServices.length;i++){
						this.goodsServices[i].status=false
					}
					if(this.goodsServicesArr.length!=0){
						for (let value of this.goodsServicesArr) {
							for(let i=0;i<this.goodsServices.length;i++){
								if(value.id==this.goodsServices[i].id){
									this.goodsServices[i].status=true;
									break;
								}
							}
						}
					}
				}).catch(err=>{
					this.showTips('网络异常，请检查...')
				})
			},
			//
			ServiceTap(item,index){
				this.keyindex=this.keyindex+1
				for(let i=0;i<this.goodsServices.length;i++){
					if(this.goodsServices[i].id==item.id){
						if(this.goodsServices[i].status){
							this.goodsServices[i].status=false
						}else{
							this.goodsServices[i].status=true
						}
					}
				}
				console.info(this.goodsServices[index].status)
			},
			SubmitSuggestions(){
				let arr1=[]
				let arr2=[]
				arr1=this.goodsServices.filter(o=>o.status==true)
				arr2=this.goodsServices.filter(o=>o.status==false)
				if(arr1.length==0){
					this.showTips('请选择您的产品服务...').then(res=>{})
				}else{
					// 填写完毕
					this.setGoodsServicesArr(arr1);
					uni.navigateBack({
						delta: 1
					});
				}
			},
		//Vuex引入方法
		...mapMutations(['setGoodsServicesArr'])	
		},
		computed: {
		//Vuex引入属性
			...mapState(['goodsServicesArr'])
		}, 
	}
</script>


