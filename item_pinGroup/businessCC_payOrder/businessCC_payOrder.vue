<template>
	<view class="page" v-if="init">
		<!-- 收货地址 -->
		<view class="box">
				<!-- https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/addplus.png -->
				<view class="addAdr fx-row fx-row-center"  @click="selAdr" v-if="!adr">
					<view>
						<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/addplus.png "></image>
					</view>
					<view>
						新增收货地址
					</view>
				</view>
				
				
				<view class="boxAdr" @click="selAdr" v-else>
					<view class="cname fx-row fx-row-space-between">
						<view class="fx-3">{{adr.name}}</view>
						<view class="fx-8">{{adr.phone}}</view>
						<view class="fx-1"><image style="width:14upx;height:24upx;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image></view>
					</view>
					
					<view class="cname small fx-row fx-row-space-between">
						<view class="fx-3">收货地址</view>
						<view class="nowrap fx-8">{{adr.province+adr.city+adr.city+adr.detailedAddress}}</view>
						<view class="fx-1"></view>
					</view>
				</view>
		</view>
		
		<!-- 商品信息 -->
		<view class="box goodInfo">
			<view class="title">商品信息</view>
			
			<pin-goods-item :item="detail" @add="add" @sub="sub"></pin-goods-item>
			
		</view>
		
	<!-- 结算信息 -->
		<view class="box payInfo fx-column">
			<view class="title fx-row fx-row-space-between">
				<view>
					商品总价
				</view>
				<view>
					<price size="29" :value="totalPrice.toFixed(2)" color="#333333"></price>
				</view>
				
			</view>
			
			<view class="expressFee title fx-row fx-row-space-between">
				<view>
					运费
				</view>
				<view>
					<price size="29" :value="Number(detail.franking).toFixed(2)" color="#333333"></price>
				</view>
			</view>
			
			<view class="expressFee title fx-row fx-row-right">
			
				<view>
					合计:
					<price size="29" :value="Number(totalPrice+detail.franking).toFixed(2)" color="#FF0000"></price>
				</view>
			</view>

			<view class="botBox fx-row fx-row-center fx-row-space-between">
				<view>
					<text class="fan">返</text>
					<text class="fanText">拼团成功最高返现</text>
				</view>
				
				<price size="29" :value="Number(detail.fullPrice).toFixed(2)" color="#FF0000"></price>
			</view>
			
			
		</view>
		
		<!-- 支付方式 -->
		
		<view class="box payment">
			<view class="paytitle">支付方式</view>
			
			<view class="paymethod fx-row fx-row-center fx-row-space-between">
				<view class="fx-row fx-row-center">
					<image class="icon" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/weixin.png" mode="aspectFill"></image>
					<text class="t">微信支付</text>
				</view>
				
				<view class="circle">
					<view class="c"></view>
				</view>
			</view>
		</view>
		
		
		<!-- 立即支付 -->
		
		<view class="bottomBar fx-row fx-row-center fx-row-space-between">
			
			<view class="leftBox fx-row fx-row fx-row-space-between">
				<view>
					<text>付款金额:</text>
					<price :value="Number(totalPrice+detail.franking).toFixed(2)" color="#ff0000" size="32"></price>
				</view>
				
				<view>
					<text>拼成最高返:</text>
					<price :value="Number(detail.fullPrice).toFixed(2)" color="#ff0000" size="32"></price>
				</view>
			</view>
			
			
			<view>
				<view class="btn-pay" @click="insertorder">
					立即支付
				</view>
			</view>
		</view>
		
		<!-- 保存成功弹框 -->
		<view class="saveModel fx-row fx-row-center fx-col-center" style="z-index: 100;" v-if="showLoadings">
			<view class="saveCon fx-column fx-row-center">
				<!-- https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png -->
				
				<image class="rotate" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png'"
				 mode="widthFix"></image>
				<view class="succ">请稍等，正在保存</view>
				<!-- <view class="txt">{{isLoading?'您的信息已提交，正在审核中...':'点击按钮返回首页'}}</view> -->
				<!-- 	<view class="bindC but" @click="bindCa">绑定银行卡</view> -->
				<!-- <view v-if="!isLoading" class="shop but" @click="retIndex">回到首页</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { pinGoodsItem } from '../_components/pinGoodsItem/pinGoodsItem';
	import { price } from '../_components/price/price.vue';
	export default {
		data() {
			return {
				detail:null,
				init:false,
				orderNum:null,
				adr:null,
				showLoadings:false
			};
		},
		components: {
			pinGoodsItem,price
		},
		computed: {
			totalPrice() {
				return this.detail?this.detail.goodPrice * this.detail.number:0
			}
		},
		
		onLoad(option) {
			this.detail = JSON.parse(decodeURIComponent(option.data));
			console.log(this.detail)
			this.init=true;
		},
		
		onShow() {
			//获取收货地址
			this.$api.getAddressList().then(res=>{
				this.adr=res.filter(it=>it.isDefault==1)[0];
				if(!this.adr) this.adr = res[0] || null;
			});
		},
		
		methods: {
			selAdr(){
				//选择收货地址
				uni.navigateTo({
					url:'/module/shop/address/address'
				})
			},
			
			add() {
				//
				this.detail.number+=1;
			},
			sub() {
				
				this.detail.number=this.detail.number-1<=0?1:this.detail.number-1
				//this.detail.nubmer-=1;
				// this.$set(this.detail,'number',this.detail.nubmer-1);
			},
			insertorder(){
				this.showLoading();
				//pinId,addressId,msgs,item
				const pinId = this.detail.pinId;
				if(!this.adr){
					this.hideLoading();
					return this.showError("请选择收货地址！");
				}
				const addressId = this.adr.id;
				 
			
				const msgs = JSON.stringify({});
				const item = JSON.stringify({
					"goodsNum": this.detail.number,
					"skuId": this.detail.skuId,
					"goodsName": this.detail.goodName,
					"identity": this.detail.skuName
				});
				uni.requestSubscribeMessage({
					tmplIds: ['aBw6JoyVaU8-1iSXbw3tpY80kmTIpqpYh-2NAC19pSs'],
					success(res) {
						console.log('test', res)
						this.shares=share
					}
				})
				if(!this.orderNum){
					this.$api.orderPin(pinId,addressId,msgs,item).then(res=>{
						this.orderNum = res;
						this.pay(res)
						
					}).catch(err=>this.showError(err));
				}else{
					this.pay(this.orderNum)
				}
				
			},
			
			pay(res){
				const pinId = this.detail.pinId;
					this.$api.unifiedorder(res).then(result=>{
							
							return this.requestPayment(result.prePayInfo)
						}).then(res2=>{
							//ToDo
							this.showLoadings = true;
							setTimeout(()=>{
								this.showLoadings = false;
								this.$api.paymentStatusCallback(res,2,pinId);
								uni.setStorageSync('setNeedUpdatePinDetail',true)
								this.orderNum=null;
								this.hideLoading();
								uni.redirectTo({
									url:"../businessCC_paySuccess/businessCC_paySuccess?pinId="+this.detail.pinId
								})
							},15000)
							
							
							
						}).catch(err=>{
							this.hideLoading();
							this.showError(err)
						})
			}
		},
	}
</script>

<style lang="less" scoped>
	@keyframes rotateicon {
		0% {
			transform: rotate(0deg)
		}
	
		100% {
			transform: rotate(360deg)
		}
	}
	
	.rotate {
		animation: rotateicon 3s infinite linear;
	}
	@import "../../css/jss_base.less";
	// 弹出层
	.saveModel {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	
		.saveCon {
			width: 84%;
			margin: 0 auto;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 40upx;
			border-radius: 20upx;
	
			image {
				width: 120upx;
				height: 120upx;
				margin-top: 10upx
			}
	
			.succ {
				font-size: 36upx;
				color: #333333;
				margin: 32upx 0 20upx 0;
			}
	
			.txt {
				font-size: 28upx;
				color: #666666;
				margin: 20upx 0 50upx 0;
				text-align: center;
			}
	
			.but {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 28upx;
				border-radius: 40upx;
			}
	
			.bindC {
				border: 1px solid #6B7AF8;
				color: #6B7AF8;
				margin-bottom: 24upx;
			}
	
			.shop {
				border: 1px solid #CCCCCC;
				color: #CCCCCC
			}
		}
	}
	.page{
		background: #f5f5f5;
		min-height: 100vh;
		padding: 30upx 30upx 0 30upx;
		
		.box{
			background: white;
			width: 100%;
				position: relative;
		}
		
		.boxAdr{
			padding: 21upx;
			background: white;
			font-size:30upx;
			font-family:PingFangSC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
			
			.cname.small{
				font-size:26upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(102,102,102,1);
				margin-top: 20upx;
					
				.nowrap{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		
		.addAdr{
			height: 100upx;
			Image{
				width: 50upx;
				height: 50upx;
			}
			View{
				height: 50upx;
				margin-left: 30upx;
			}
			font-size:30upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:50upx;
		}
		
		.goodInfo{
			width: calc(100% - 60upx);
			margin-top: 23upx;
			padding: 30upx;
			
			.title{
				margin-bottom: 25upx;
				height:29upx;
				font-size:30upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:29upx;
			}
		}
		
		.payInfo{
			// width:690px;
			height:329upx;
			width: calc(100% - 60upx);
			margin-top: 23upx;
			padding: 30upx;
			.title{
				font-size:28upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(51,51,51,1);
				&.expressFee{
					margin-top: 58upx;
				}
			}
		}
		.botBox{
			position: absolute;
			padding: 0 30upx;
			width:630upx;
			height:91upx;
			background:rgba(107,120,250,0.2);
			bottom:0;
			left:0;
			font-size:28upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(51,51,51,1);
	
			.fan{
				width:42upx;
				display: inline-block;
				height:42upx;
				background:rgba(107,120,250,1);
				border-radius:10upx;
				color: white;
				text-align: center;
				line-height: 42upx;
				margin-right: 15upx;
				font-size:28upx;
				font-family:PingFangSC-Regular;
				font-weight:400;

			}
		}

			
		.payment{
			margin-top: 23upx;
			padding: 30upx 19upx;
			width: calc(100% - 38upx);
			.paytitle{
				font-size:28upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(51,51,51,1);
				
				border-bottom: 2px solid rgba(234,234,234,1);
				padding-bottom: 30upx;
			}
			.paymethod{
				margin-top: 25upx;
				line-height: 37upx;
				.icon{
					width:47upx;
					height:37upx;
				
				}
				.t{
					font-size:28upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-left:22upx; 
				}
				
				.circle{
					
					width:41upx;
					height:41upx;
					border:3upx solid rgba(107,120,250,1);
					border-radius:50%;
					text-align: center;
					line-height: 35upx;
						.c{
							display: inline-block;
							width:20upx;
							height:20upx;
							background:rgba(107,120,250,1);
							border-radius:50%;
						}
				}
			}
		}
	
			
		.bottomBar{
			width:calc(100% - 54upx);
			height:100upx;
			position: fixed;
			bottom:0;
			left: 0;
			padding: 0 27upx;
			background:rgba(255,255,255,1);
			font-size:22upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(102,102,102,1);
			
			.leftBox{
				width: 424upx;
			}
			
			.btn-pay{
				.buttonRadius(@w:200upx,@h:55upx);
				background:rgba(107,120,250,1);
				font-size:30upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height: 55upx;
				text-align: center;
			}
		}
		
	}
</style>
