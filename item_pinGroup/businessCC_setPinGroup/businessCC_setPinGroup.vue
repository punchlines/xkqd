<template>
	<view class="container">
			<!-- 开团按钮 -->
			<view class="publishTopic top">
				<view class="ptName" @click="submit">立即开团</view>
			</view>
			<!-- 上传商品 -->
			<view class="selGoods">选择店铺商品</view>
			<view class="uploadImage"  @click="setGoods">				
				<wx-view v-if="!pinGoodInfo">
					<view class="UIuserinfo">
						<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
					</view>
				</wx-view>
				
				<wx-view v-else>
					<pin-goods-item2 :noMargin="true" :showSel="false" :item="pinGoodInfo"></pin-goods-item2>
				</wx-view>
				
			</view>
			
			<!-- 设置拼团返现条件 -->
			<view class="setMon">
				<view class="setTitle">设置拼团返现条件:</view>
				<view class="setPer" v-for="(item,index) in retCashArr" @longpress="delCash(index)" :key="index">
					<view>
						<text>满</text>
						<input type="number" v-model="item.targetNum" class="perNum" >
						<text>人</text>
						
						<text class="fan">每人返</text>
						<input type="digit"  v-model="item.rebateAmount"  class="perNum" >
						<text>元</text>	
					</view>
					<view class="setinfo" v-if="index==retCashArr.length-1" @click="addCash">
						<image class="addImage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
					</view>
				</view>
			</view>
			
			<view class="setOnly">
				<view class="setTitle">设置好友开团收益:</view>
				<view class="price">￥ <input :style="{'width':getInputWidth()}" type="digit" class="gainInput" v-model="proxyGain"> </view>
			</view>
			
			
			<view class="setOnly">
				<view class="setTitle">设置好友邀请好友开团收益:</view>
				<view class="price">￥ <input :style="{'width':getInputWidth()}" type="digit" class="gainInput" v-model="gainOne"> </view>
			</view>
			
		<!-- 	<view class="setShou">
				<view class="setTitle">设置团友开团发起人的收益:</view>
				<view class="setPer">
					<text>好友开团每单收益</text>
					<input type="digit" class="perNum" v-model="gainOne" value>
					<text>元</text>
					
				
				</view>
			</view> -->
		
			
			<view class="setTime">
				<view class="setTitle">结束时间:</view>
				
				 <picker mode="selector" :range="timeRange" value="0" @change="timeChange">
                        	<view class="time" v-if="endType==0">
								<input type="digit" disabled class="hour" v-model="continueHour" value>:
								<input type="digit" disabled class="min" value="00">:
								<input type="digit" disabled class="second" value="00">
							</view>
							<view class="setTitle" v-else>预售库存</view>
               </picker>
			
			</view>
			
			<!-- 选择规格 -->
			<view class="skusection" v-if="goodSku">
					<view class="btnbox fx-row fx-row-right">
						<view @click="oneKu" class="btn">统一库存</view>
						<view  @click="onePrice" class="btn">统一优惠价</view>
						<view @click="onexPrice" class="btn">统一原价</view>
					</view>
				
				
					<view class="div-table" style="min-width: 100%;">
						<view class="thead th-bg">
							<view class="th">
								<!-- <view class="td">颜色</view>
								<view class="td">规格</view> -->
								<view class="td" :key="index" v-for="(item,index) in theader">{{item}}</view>
								
								<view class="td">库存</view>
								<view class="td">优惠价</view>
								<view class="td">原价</view>
							</view>
						</view>
						
						<view class="tbody" v-if="skuJson">
							<template v-if="!cSpan">
								<view class="tr" :key="index" v-for="(item,index) in skuJson[0].list">
									<view class="td">{{item}}</view>
									<view class="td" v-if="skuJson[1]">{{skuJson[1].list[0]}}</view>
									<input class="td" type="number" v-model="goodsRepertory[index]"/>
									<input class="td" type="digit" v-model="preferentialPrice[index]"/>
									<input class="td" type="digit" v-model="goodsPrice[index]"/>
								</view>
							</template>
							<!-- 跨行的处理 -->
							<template v-else>
								<view class="tr" :key="index" v-for="(item,index) in skuJson[0].list">
										<view class="td">{{item}}</view>
										
										<view class="td noPadding">
											<view class="rowspan">
												<view class="tr" :key="index2" v-for="(item2,index2) in skuJson[1].list"><view class="td">{{item2}}</view></view>
												<!-- <view class="tr"><view class="td">100</view></view> -->
											</view>
										</view>
										
										<view class="td noPadding" v-for="i in 3" :key="i" v-if="goodsPrice">
											<view class="rowspan">
												<template  v-for="(item3,index3) in skuJson[1].list">
													<view :key="index3" class="tr" v-if="i==0"><input class="td" type="number"  v-model="goodsRepertory[index*skuJson[1].list.length+(index3)]"></view>
													<view :key="index3" class="tr" v-else-if="i==1" ><input class="td" type="digit" v-model="preferentialPrice[index*skuJson[1].list.length+(index3)]"></view>
													<view :key="index3" class="tr" v-else ><input class="td" type="digit" v-model="goodsPrice[index*skuJson[1].list.length+(index3)]"></view>
												</template>
											</view>
										</view>

									</view>
							</template>
							
						
						</view>
						
					</view>
			</view>
			
			
			
			
			<view class="intro">
				<view class="onIntro">开团收益说明:</view>
				<view class="introText">
					团长收益有三个来源:团友参团收益,团友开团收益,团友团团收益.具体说:团长成功开的团里多少个团友下的单,团长就有自营收益或团友开团获利,团长收益在团友购买并确认收货15日后,自动到账.
				</view>
			</view>
			
		</view>
</template>

<script>
import { pinGoodsItem2 } from '../_components/pinGoodsItem2/pinGoodsItem2';
import { processSkuData } from '@/js/util';

	export default {
		data() {
			return {
				circleId: '',
				title: '',
				content: '',
				images: [],
				countNum:6,
				focus:true,
				retCashArr:[
					{targetNum:0,rebateAmount:0}
				],//返现条件数组
				proxyGain:10, //一级收益
				gainOne:0, //二级收益
				// gainTwo:0 ,//三级收益
				continueHour:24, //持续时间
				timeRange:[...new Array(10).keys()].map(i=>i=i+1+"天"),
				goodSku:null,
				skuJson:null,
				goodsPrice:null,
				preferentialPrice:null,
				goodsRepertory:null,
				cSpan:false, //是否跨列
				skuIDs:[],
				endType:0
			};
		},
		components: {
			pinGoodsItem2
		},
		watch: {
			pinGoodInfo(g) {
				this.goodSku =null;
				this.cSpan=false;
				this.skuJson=null;
				this.goodsPrice=null;
				this.preferentialPrice=null;
				this.goodsRepertory=null;
				if(g && g.goodsId){
					this.$api.getGoodsSku(g.goodsId).then(res=>{
						
						this.goodSku = processSkuData(res);
						//console.log(this.goodSku)
						this.disposeSku(this.goodSku);
					});
				}
			}
		},
		
		computed: {
			pinGoodInfo(){
				return this.$store.state.pinGoodInfo;
			},
			theader(){
				//计算表头
				if(this.goodSku){
					const arr = this.goodSku.list.map(item=>item.name)
					return arr;
				}
				else
				return []
			}
		},
	
		onUnload() {
			this.$store.commit('setPinGoodInfo',null);
		},
		
		onLoad(option) {
			// this.circleId = option.id;
			// console.log(option.id);
			this.timeRange.push("预售库存")
			
		},
		methods: {
			timeChange(e){
				if(e.detail.value==10){
					this.endType = 1;
				}else{
					this.endType = 0;
					this.continueHour = (Number(e.detail.value)+1)*24;
				}
				
				console.log(e)
				
			},
			
			updateSku(){
				const skus = this.skuIDs.map((it,inx)=>{
					return {
						skuId:it,
						perPrice:this.preferentialPrice[inx],
						orgPrice:this.goodsPrice[inx],
						repo:this.goodsRepertory[inx]
					}
				});
				
				console.log(skus)
				return new Promise((resolve,rej)=>{
					 this.$api.updateSku(this.pinGoodInfo.goodsId,JSON.stringify(skus)).then(res=>{
						 
						 resolve(res);
						 
					 }).catch(err=>rej(err))
					
				});
			
			},
			
			
			getInputWidth(){
				return String(this.proxyGain).length<=4?uni.upx2px(65)+'px':String(this.proxyGain).length*uni.upx2px(18)+'px';
			},
					
			addCash(){
				if(this.retCashArr.length>2) return
				this.retCashArr.push({targetNum:0,rebateAmount:0});
			},
	
				
			delCash(index){
				if(this.retCashArr.length==1) return
				this.retCashArr.splice(index,1);
			},
			
			submit() {
				this.$forceUpdate();
				//马上开团
				if(this.check()){
					this.showLoading();
					this.updateSku().then(res=>{
						
						let form  = {
							goodsId:this.pinGoodInfo.goodsId,
							proxyGain:this.proxyGain,
							gainOne:this.gainOne,
							// gainTwo:this.gainTwo,
							continueHour:this.continueHour,
							endType:this.endType
						};
						
						form.conditions = JSON.stringify(this.retCashArr);
						console.log(form);
						
						this.$api.createPinGroup(form).then(res=>{
							//res = pinID
							uni.setStorageSync('_needFetchTopic',true);
							
							this.redirectTo('/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup',{id:res,showShareModal:1})
							
						}).catch(err=>{
							this.hideLoading();
							this.showError(err);
						})
					
					
					}).catch(err=>{
						this.hideLoading();
						this.showError(err)
						});
					
				}

			},
			
			getSku(){
				//商品规格
				
				
			},
			
			//统一库存
			oneKu(){
				this.goodsRepertory = this.goodsRepertory.map(it=>this.goodsRepertory[0]);
				this.$forceUpdate();
			},
			//统一优惠价
			onePrice(){
				this.preferentialPrice = this.preferentialPrice.map(it=>this.preferentialPrice[0]);
				this.$forceUpdate();
			},
			//统一原价
			onexPrice(){
				this.goodsPrice = this.goodsPrice.map(it=>this.goodsPrice[0]);
				this.$forceUpdate();
			},
			
			disposeSku(skus){
				this.skuIDs = [];
				let skuJson = [];
				//计算skujson
				skus.list.forEach(item=>{
					let key  = item.name;
					let list = item.sku.map(it=>it.name);
					skuJson.push({
						key,list
					});
				});
				
				let goodsPrice = [];
				let goodsRepertory = [];
				let preferentialPrice = [];
				this.cSpan = skus.list[1] && skus.list[1].sku.length>1;
				
				//计算商品价格
				
				skus.list[0].sku.forEach((it,idx)=>{
					let pid = it.id;//1级id
					let key = "";
					if(skus.list[1]){
						skus.list[1].sku.forEach((it2,idx2)=>{
							let cid = it2.id;//2级id
							key = `[${pid}, ${cid}]`;
							goodsPrice.push(skus.dataMap[key].goodsPrice);
							goodsRepertory.push(skus.dataMap[key].goodsRepertory);
							preferentialPrice.push(skus.dataMap[key].preferentialPrice);
							this.skuIDs.push(skus.dataMap[key].id);
						});
					}else{
						key = `[${pid}]`;
						goodsPrice.push(skus.dataMap[key].goodsPrice);
						goodsRepertory.push(skus.dataMap[key].goodsRepertory);
						preferentialPrice.push(skus.dataMap[key].preferentialPrice);
						this.skuIDs.push(skus.dataMap[key].id);
					}
				});
				
				this.skuJson  = skuJson;
				this.goodsPrice  = goodsPrice;
				this.preferentialPrice = preferentialPrice;
				this.goodsRepertory  = goodsRepertory;
				
			
			},
			
			
			
			
			check(){
				if(!this.pinGoodInfo) return this.showError("请选择商品！");
				for(let it of this.retCashArr){
					if(it.targetNum<=0 || it.rebateAmount<=0)
						return this.showError("返现条件参数填写错误！");
				}
				// proxyGain:10, //一级收益
				// gainOne:0, //二级收益
				// gainTwo:0 ,//三级收益
				if(Number(this.proxyGain)<=0 || Number(this.gainOne)<=0) 
					return this.showError("开团收益返现金额填写错误！");
				if(this.continueHour<=0 || this.continueHour>240)
					return this.showError("开团时间填写错误！");
				
				//检查库存价格是否非法
				
				for(let item of this.goodsPrice){
					if(Number(item)<=0){
						return this.showError("商品价格必须大于0");
					}
				}
				
				 for(let item of this.preferentialPrice){
					if(Number(item)<=0){
						return this.showError("商品优惠价必须大于0");
					}
				}
				
				
				return true;
			},

			setGoods() {
				uni.navigateTo({
					url:'../businessCC_setpinGood/businessCC_setpinGood'
				})
			}

			

		},

	}
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';
	@import '../../css/table.css';
	.container {
		background: #f5f5f5;
		padding-bottom: 170upx;
		
		input{
			text-align: center;
			background: skyblue;
		}
		
		}
		.publishTopic {
			width: 100%;
			background: #fff;
			font-size: @fsContentTitle;
			margin: 0 auto;
			padding: 20upx 0 20upx 0;
			position: fixed;
			bottom: 0;
			z-index: 999;

			.ptName {
				text-align: center;
				line-height: 80upx;
				margin: 0 auto;
				color: #fff;
				.buttonRadius(@w: 620upx;
				@h: 80upx;
				)
			}
		}
		
		.selGoods{
			height: 80upx;
			margin-left: 30upx;
			font-size:36upx;
			font-family:PingFangSC-Regular;
			font-weight:bold;
			color:rgba(0,0,0,1);
			line-height: 80upx;
		}
		
		.uploadImage {
			.flex(flex-start);
			overflow: hidden;
			width: 100%;
			height: 180upx;
			margin: 0 auto;
			margin-bottom: 20upx;
			flex-wrap: wrap;
			background: #fff;
			.UIuserinfo {
				width: 150upx;
				height: 150upx;
				margin-right: 10upx;
				border: 1upx solid #F8F8F8;
				margin-left: 30upx;
				image {
					width: 150rpx;
					height: 150rpx;
					
				}
			}

			.UIimageBox {
				position: relative;
				width: 150upx;
				height: 150upx;
				margin-left: 30upx;
				margin-right: 10upx;
				margin-bottom: 10upx;

				.UIImage {
					width: 150upx;
					height: 150upx;
					// width:100%;
					margin-right: 10upx;
					display: inline-block;
				}

				.DelImage {
					width: 40upx;
					height: 40upx;
					position: absolute;
					top: 0;
					right: 0;
				}
			}
		}
		// 返现
		.setMon{
			width: 100%;
			padding-bottom: 20upx;
			background: #fff;
			.setTitle{
				font-size:32upx;
				font-family:PingFangSC-Regular;
				font-weight:bold;
				color:rgba(51,51,51,1);
				margin-left: 27upx;
				padding-top: 12upx;
				padding-bottom: 12upx;
			}
			.setPer{
				display: flex;
				width:690upx;
				height:100upx;
				line-height: 100upx;
				margin: 0 auto;
				background:rgba(107,122,249,0.1);
				border:1px solid rgba(204,204,204,0.1);
				// border-radius:15upx;
				text{
					font-size:28upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:#666;
					margin-left: 10upx;
				}
				.perNum{
					display: inline-block;
					width: 65upx;
					height: 45upx;
					border: none;
					border:1px solid rgba(216,216,216,1);
					margin:0upx 10upx 0 10upx;
					font-size: 28upx;
					background: #fff;
					line-height: 45upx;
					vertical-align: middle;
				}
				.setinfo{
					width: 71upx;
					height: 71upx;
					background: #fff;
					margin-left: 30upx;
					margin-top: 15upx;
					image{
						width: 71upx;
						height: 71upx;
					}
				}
				.fan{
					margin-left: 30upx;
					
				}
			}
		}
		// 收益
		.setShou{
			width: 100%;
			padding-bottom: 20upx;
			background: #fff;
			margin-top: 20upx;
			.setTitle{
				font-size:32upx;
				font-family:PingFangSC-Regular;
				font-weight:bold;
				color:rgba(51,51,51,1);
				margin-left: 27upx;
				padding-top: 12upx;
				padding-bottom: 12upx;
			}
			.setPer{
				width:690upx;
				height:100upx;
				line-height: 100upx;
				margin: 0 auto;
				background:rgba(107,122,249,0.1);
				border:1px solid rgba(204,204,204,0.1);
				border-radius:15upx;
				text{
					font-size:28upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:#666;
				}				
				.perNum{
					display: inline-block;
					width: 65upx;
					height: 45upx;
					border: none;
					border:1px solid rgba(216,216,216,1);
					font-size: 28upx;
					background: #fff;
					vertical-align: middle;
					line-height: 45upx;
				}
				.fan{
					margin-left: 20upx;
					font-size: 23upx;
				}
			}
		}
		
		.setOnly{
			display: flex;
			width: 100%;
			height: 80upx;
			background: #fff;
			margin-top: 20upx;
			.setTitle{
				flex: 2;
				font-size:32upx;
				font-family:PingFangSC-Regular;
				font-weight:bold;
				color:rgba(51,51,51,1);
				margin-left: 27upx;
				line-height: 80upx;
			}
			.price{
				text-align: right;
				font-size:30upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(251,0,0,1);
				margin-right: 30upx;
				margin-top: 20upx;
				.gainInput{
					display: inline-block;
					display:inline-block;
					width:65upx;
					height:45upx;
					// border:none;
					border:1px solid #d8d8d8;
					font-size:28upx;
					background:#fff;
					vertical-align:middle;
					line-height:45upx;

				}
			}			
		}
		
		.skusection{
			width: 100%;
			// height: 80upx;
			margin-top: 20upx;
			background: #fff;
			padding: 15upx;
			overflow-x: scroll;
			font-size: 21upx;
			.th-bg{
				background: #eee;
			}
			
			.btnbox{
				padding:  10upx 0;
				.btn{
					background:rgba(107,122,248,0.09);
				    border-radius:4upx;
					border:1upx solid #6B7AF8;
					color: #6B7AF8;
					font-size:24upx;
					box-sizing: border-box;
					text-align: center; 
					padding: 7upx 17upx;
					margin-left: 15upx;
				}
			}
			input{
				text-align: center;
			
			}
			
		}
		
		.setTime{
			display: flex;
			width: 100%;
			height: 80upx;
			background: #fff;
			margin-top: 20upx;
			.setTitle{
				font-size:32upx;
				font-family:PingFangSC-Regular;
				font-weight:bold;
				color:rgba(51,51,51,1);
				margin-left: 27upx;
				line-height: 80upx;
			}
			.time{
				line-height: 70upx;
				.hour,.min,.second{
					display: inline-block;
					width: 65upx;
					height: 45upx;
					border: none;
					border:1px solid rgba(216,216,216,1);
					font-size: 28upx;
					background: #fff;
					vertical-align: middle;
					line-height: 45upx;
					margin-left: 10upx;
					margin-right: 10upx;
				}
			}
		}
		
		.intro{
			.onIntro{
				font-size:32upx;
				font-weight:bold;
				color:rgba(107,122,249,1);
				margin: 21upx 0upx 21upx 27upx;
			}
			.introText{
				width: 702upx;
				margin: 0 auto;
				font-size:24upx;
				font-weight:bold;
				color:rgba(153,153,153,1);
				opacity:0.84;
				letter-spacing: 5upx;
				line-height: 36upx;
			}
		}
</style>
