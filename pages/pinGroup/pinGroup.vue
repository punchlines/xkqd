<template>
	<view>
		<!-- <view class="swiper-container">
			<Image @click="go" class="swiper-item" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/pinGroup/banner2.png"></Image>
		</view>	 -->
		
		<!-- 列表 -->
		
		<view class="searchTemplateContainer">
			<view class="container1">
				<view class="CMsearch">
					<view class="CMimage">
						<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'" mode="widthFix"></image>
					</view>
					<view class="CMinput">
						<input type="text" class="" v-model="key" placeholder="搜索拼团商品" confirm-type="search"  @confirm="search" ref="input"></input>
					</view>
					<view class="CMFilter" :class="{'active':hasFilter}" @click="goFilter">筛选</view>
				</view>
				<view class="CMClass">
					<view class="classItem" v-for="(item,index) in classList" 
					:key="index" :class="{'active':classActive==index}"
					@click="classChange(index)"
					>{{item.classifyName}}</view>
					
				</view>
			</view>
		</view>
		
		<!-- 选项卡 -->
		<view class="tabbox fx-row fx-row-space-around">
			<view class="tab" :class="{'active':active==0}" @click="change(0)">我发起的拼团</view>
			<view class="tab" :class="{'active':active==1}" @click="change(1)">正在进行中的团</view>		
		</view>
		<view class="list fx-row fx-wrap fx-row-space-between">
			<!-- <template v-for="(item,index) in list" v-if="list.length>0">
				<circle-group :key="index"  @reduce="reduces(index)" :item='item' @share="goSharePost" :canClick="active==0"></circle-group>
			</template>
			<image v-if="list.length<=0" style="width: 690rpx;height: 411rpx;margin-top: 50rpx;" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/chat/defalutPage.jpg" mode=""></image> -->
			
			<view class="goodsItem" v-for="(item,index) in list" :key="index" @click="goDetail(item.id)">
				<!-- {{1}} -->
				<image :src="item.cover" class="goodImage" mode=""></image>
				<view class="info">
					<view class="title">{{item.goodsName}}</view>
					<view class="subTitle">
						<text v-for="(i,d) in item.conditionVos" :key="d">满{{i.targetNum}}人返现 <text class="yellow">{{i.rebateAmount}}</text> 元{{d!=item.conditionVos.length-1?",":""}}</text>
						<!-- <text>满3人返现 <text class="yellow">10</text> 元,</text>
						<text>满3人返现 <text class="yellow">10</text> 元</text> -->
					</view>
					<view class="price fx-row fx-row-bottom fx-row-space-around">
						<view class="fx-row fx-row-bottom">
							<view class="red">￥{{item.preferentialPrice}}</view>
							<view class="dis">￥{{item.originalPrice}}</view>
						</view>
					
						<view class="avatar">
							<image v-for="(i,d) in item.userCoverList" :key="d" :src="i" mode=""></image>
							<!-- <image src="/static/chat/biaoqing@2x.png" mode=""></image> -->
						</view>
						
					</view>
					
				</view>
				
			</view>
			
			
			
		</view>
		
		<vip-on v-if="showVipModal" @go="goBuyVip" @proxy="proxy" @close="showVipModal=false"></vip-on>
		
		<view class="invite" @click="go">
			规则
		</view>
		<view class="fbtn orange" @click="goPin">开</view>
		<!-- 底部按钮 -->
	<!-- 	<view class="footerBtn" @click="goPin">
			快速开团
		</view> -->
	</view>
</template>

<script>
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2.js';
	import { processSkuData } from '@/js/util';
	import circleGroup from '@/components/circleGroup/circleGroup';
	import vipOn from '@/components/vipOn.vue'
	import {mapState} from "vuex"
	export default {
		mixins:[loadMoreMixins],
		components:{circleGroup,vipOn},
		data() {
			return {
				active:1,
				showVipModal:false,
				key:"",
				mode:0, // 1-搜索
				classList:[],
				classActive:0
			};
		},
		onLoad(){
				//获取品列
				this.$api.parentClassify().then(res=>{
					this.classList = [{
						child: [],
						classifyImage: "",
						classifyName: "全部",
						id: null
					}].concat(res)
				})
			 this.fetch();
		},
		
		onShow() {
			this.change(1);
		},
		computed:{
			classId(){
				return this.classList[this.classActive]?this.classList[this.classActive].id:null
			},
			...mapState(['searchArea', 'searchMinPrice', 'searchMaxPrice']),
			hasFilter(){
				return this.searchArea.length>0 || this.searchMinPrice>0 || this.searchMaxPrice>0
			}
		},
		
		onShareAppMessage(res) {
			console.log(res)
			if (res.target.id.indexOf("shareBtn") != -1) {
				const id = res.target.id.split('Btn')[1];
				const title = this.list.filter(item=>item.id==id)[0].userName;
				// const title = this.circle.managerName;
				return {
					title: title + "邀请你开团",
					path: '/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup?id=' + id + '&recommendId=' +
						this.currentUser.id,
				}
			}
		},
		
		methods:{
			
			goFilter(){
				uni.navigateTo({
					url:"/pages/searchFilter/searchFilter"
				})
			},
			
			classChange(index){
				this.mode=1;
				this.classActive=index;
				this.reset();
				this.fetch();
			},
			
			goDetail(id){
				this.navigateTo('/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup',{id});
			},
			
			reduces(index){
				this.$set(this.list[index],'endTime',this.list[index].endTime-1);
			},
			
			goBuyVip(){
				this.navigateTo('/item_businessCard/businessCard_VIP/businessCard_VIP_New');
				
			},
			
			goSharePost(item){
				console.log(item);

					let shareObject = {
						goodsName:item.goodsName,
						price:item.preferentialPrice,
						sku:'',
						cdtext:item.conditionVos.map(it=>`拼到${it.targetNum}人，每人返${it.rebateAmount}元`).join(','),
						cover:item.cover,
						id:item.goodsId,
						oprice:item.originalPrice
					};
					//拉sku
					uni.showLoading();
					this.$api.getGoodsSku(item.goodsId).then(result => {
						uni.hideLoading();
						const goodSku = processSkuData(result);
						let sku = goodSku.list[0].name+"-"+goodSku.list[0].sku[0].name;
						shareObject.sku = sku;
						// console.log(shareObject)
						this.navigateTo(`../../item_pinGroup/businessCC_Share/businessCC_Share`,shareObject);
						
					}).catch(err => {
						uni.hideLoading();
						this.showError(err);
					});
					
				
			},
			
			proxy(){
				this.showVipModal=false;
				this.change(1);
			},
			go(){
				this.navigateTo('/item_pinGroup/businessCC_rule/businessCC_rule');
			},
			
			change(index){
				if(index==this.active || this.loading) return
				this.reset();
				this.mode=0;
				this.key="";
				this.list=[];
				this.active=index;
				this.fetch();
			},
			//开团
			goPin(){
				if(this.currentUser.userType>1)
					this.navigateTo('/item_pinGroup/businessCC_setPinGroup/businessCC_setPinGroup');
				else this.showVipModal=true;
			},
			
			search(){
				if(this.key==""){
					this.mode=0;
				}else this.mode=1;

				this.reset();
				this.fetch();
			},
			
			
			fetch(){
				uni.showLoading({
					mask:true
				})
				if(this.mode==1 ){
					//搜索部分
					this.$api.searchAssembleList(this.key,this.currentPage,this.classId,this.searchMinPrice,this.searchMaxPrice,this.searchArea[2]?this.searchArea[2]:"").then(res=>{
						console.log(res)
						this.currentPage++;
						if(res.length==0){
							this.loading=false;
							this.noMore=true;
							uni.hideLoading();
							return;
						}
						this.list = this.list.concat(res);
						this.loading=false;
						uni.hideLoading();
					}).catch(err=>{
					
					this.loading=false;
					uni.hideLoading();
				});
					
					
					
					return
				}
				
				
				const action  = this.active==0?this.$api.getMyAssembleList(this.currentPage,uni.getStorageSync('userId')):
				this.$api.getInProgressAssembleList(this.currentPage);
				this.loading=true;
				action.then(res=>{
				
					console.log(123,res)
					this.currentPage++;
					if(res.length==0){
						this.loading=false;
						this.noMore=true;
						uni.hideLoading();
						return;
					}
					// res=res.map(item=>{
					// 	let endTime = item.overTime - new Date().getTime();
					// 	endTime = endTime<=0?0:~~(endTime/1000);
					// 	return Object.assign({
					// 		endTime:endTime
					// 	},item)
						
					// });
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
	@import '../../css/mzl_base.less';
	@import '../../css/jss_base.less';
	Page{
		background: #F1F2F4;
		min-height: 100vh;
		padding-bottom: 130upx;
	}
	.searchTemplateContainer {
		padding: 15upx 15upx 0 15upx;
		margin-bottom: 30upx;
		background: white;
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999;
	}
	
	.fbtn{
		width: 100upx;
		height: 100upx;
		padding: 15upx 10upx;
		position: fixed;
		bottom: 277upx;
		bottom:calc(277rpx + constant(safe-area-inset-bottom));
		bottom:calc(277rpx + env(safe-area-inset-bottom));
		right: 29upx;
		background:rgba(107,120,250,1);
		font-size:32upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:70upx;
		text-align: center;
		border-radius: 50%;
		&.orange{
			// background:rgba(253,186,68,1);
			background: red;
			bottom: 163upx;
			bottom:calc(163rpx + constant(safe-area-inset-bottom));
			bottom:calc(163rpx + env(safe-area-inset-bottom));
		}
	}
	.invite{
		width:100rpx;
		height:100rpx;
		border-radius:50rpx;
		color:rgba(255,255,255,1);
		background:rgba(107,121,245,1);
		font-size:30rpx;
		font-family:PingFangSC-Light;
		font-weight:bold;
		box-sizing: border-box;
		line-height:70rpx;
		text-align: center;
		position: fixed;
		padding: 17rpx;
		right: 30rpx;
		bottom: 307rpx;
		bottom:calc(307rpx + constant(safe-area-inset-bottom));
		bottom:calc(307rpx + env(safe-area-inset-bottom));
		// animation: 2.5s move;
	}
	
	.container1 {
		width: 100%;
		margin-top: 20upx;
	
		.CMsearch {
			.flex(flex-start);
			width: 95%;
			margin: 0 auto;
			text-align: left;
			background: #fff;
			height: 72upx;
			color: #333;
			font-size: 28upx;
			background: #f5f5f5;
			.CMimage {
				width: 10%;
				margin-left: 20upx;
	
				image {
					width: 32upx;
					height: 32upx;
					vertical-align: middle;
				}
			}
				
			.CMFilter{
				width: 5%;
				white-space: nowrap;
				&.active{
					color:#6B7AF8;
				}
			}
			
			.CMinput {
				width: 75%;
	
				input {
					margin-top: 10upx;
					
				}
			}
		}
		.CMClass{
			
			overflow-x: scroll;
			width: 95%;
			margin: 0 auto;
			margin-top: 10rpx;
			white-space: nowrap;
			.classItem{
				display: inline-block;
				padding-bottom: 30rpx;
				text-align: center;
				font-size: 28rpx;
				margin-right: 15rpx;
					
				&.active{
					color:rgba(107,120,250,1);
				}
			}
		}
			
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
		padding:  30upx;
		box-sizing: border-box;
		.goodsItem{
			width: 330rpx;
			box-sizing: border-box;
			border: 1rpx solid #ddd;
			box-shadow: 1rpx 1rpx 10rpx 1rpx #ccc;
			&:nth-of-type(n+3){
				margin-top: 30rpx;
			}
			.goodImage{
				width: 330rpx;
				height:  330rpx;
			}
			
				
			.info{
				width: 100%;
				padding: 15rpx;
				
				.title{
					font-size: 28rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				
				.subTitle{
					margin-top: 15rpx;
					font-size: 24rpx;
					color: #bbb;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					text-overflow:ellipsis;
					.yellow{
						color: orange;
						padding: 0 5rpx;
					}
				}
				
				.price{
					color: red;
					font-size: 24rpx;
					margin-top: 25rpx;
					
					.dis{
						color: #ccc;
						font-size: 28rpx;
						margin-left: 10rpx;
						text-decoration: line-through;
					}
					
						
					.avatar{
						width: 100rpx;
						height: 50rpx;
						position: relative;
						image{
							width: 50rpx;
							height: 50rpx;
							position: absolute;
							top: 0;
							left: 0;
						}
						image:nth-of-type(2){
							left: 30rpx;
						}
					}
				}
				
				
			}
			
		}
		
	}
		
	.tabbox{
		margin-top: 167upx;
	
		padding: 30upx;
			padding-bottom: 15rpx;
		box-sizing: border-box;
		.tab{
			width:332upx;
			height:75upx;
			border-radius:15upx;
			text-align: center;
			line-height: 75upx;
			background:rgba(204,204,204,1);
			font-size:36upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(255,255,255,1);
			&.active{
				background:rgba(107,120,250,1);
			}
		}
	}
	.footerBtn{
		width:620upx;
		height:80upx;
		background:rgba(107,120,250,1);
		border-radius:40upx;
		// margin: 0 auto;
		margin-left: calc(50% - 310upx);
		position: fixed;
		bottom: 40upx;
		font-size:32upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:80upx;
		text-align: center;
	}
</style>
