<template>
  <view class="page">
		<title-bar title="选择收货地址"></title-bar>
		<view class="alarmText">
		选择收货地址接收礼品
	</view>
    <view class="address-list">
      <address-item v-for="(address,index) in list" :datas="address" @update="update" :active="index==activeIndex" @itemclick="selectAddr(index)"></address-item>
    </view>
    <view class="footer">
      <button class="btn-primary" @click="openAddAddress">
        <image class="icon" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/add.png'"></image>添加新地址
      </button>
			
			<button class="btn-primary btn-white" @click="buyvip">
        确认购买
      </button>
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
  import addressItem from './VipAddressItem';

  export default {

    components: { addressItem },

    data () {
      return {
        list: [],
				onlineSite:this.global.onlineSite,
				activeIndex:0,
				postData:null,
				adId:-1,
				isCreateCircle:null,
				orderNum:'',
				showLoadings:false
      }
    },

    onShow () {
      this.fetch();
    },
		
		computed:{
			
			
		},
		

    methods: {
			selectAddr(index){
				this.activeIndex = index;
				this.adId = this.list[index].id;
			},
			
		  fetch () {
			this.$api.getAddressList().then(result => {
			  this.list = result;
						if(this.list.length>0){
							this.activeIndex = 0;
							this.adId = this.list[0].id;
						}
			  //console.log(result)
			})
		  },
		  openAddAddress () {
			uni.navigateTo({ url: '../../module/shop/addressAdd/addressAdd' });
		  },
		  update () {
			this.fetch();
		  },
			buyvip(){
				
				if(this.adId==-1){
					this.showTips("请选择收货地址!");
					return
				}
				const postDatax = Object.assign(this.postData,{adId:this.adId});
				this.showLoading();
				if(!this.orderNum)
					this.$api.insertVipOrderNew(postDatax.currentShowVipLevel, postDatax.skuId, postDatax.recommendId || 1, postDatax.adId).then(result => {
						if(result){
							this.orderNum=result;
							this.requestPay(result);
						} else {
							this.hideLoading();
							this.showTips('下单失败');
						}
					});
				else this.requestPay(this.orderNum);
			},
			
			requestPay(orderNum){
				this.$api.unifiedorder(orderNum).then(result => {
					this.showLoading();
					return this.requestPayment(result.prePayInfo)
				}).then(result => {
					this.hideLoading();
					this.showLoadings = true;
					setTimeout(()=>{
						this.showLoadings = false;
						this.$api.paymentStatusCallback(orderNum,4);
						this.showTips('支付成功').then(res => {
							this.$store.dispatch('updateCurrentUserInfo').then(res=>{
								this.$store.dispatch('setShopRegInfo').then(()=>{
										//如果是开群付费 跳转到填写个人资料页面
									if(this.isCreateCircle){
										this.reLaunch('/item_businessCardCircle/businessCC_CreateCircle/businessCC_CreateCircle?noClear=1');
										return;
									}
									
									uni.reLaunch({
										url:'/pages/businessCard/businessCard?showFirstVipModal=1'
									});
								})
							});
						});
					},15000)
					
					
					
				
				}).catch(error => {
					console.log(error)
					//this.showError(error);
					this.hideLoading();
				});
				
			},
				
		},
		onLoad(options) {
			//console.log(options);
			this.postData = Object.assign(options,{});
			this.isCreateCircle = options.isCreateCircle==1?1:0;
			console.log(this.isCreateCircle,"this.isCreateCircle")
			delete this.postData.isCreateCircle;
		}
  }

</script>

<style scoped lang="less">

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
  .page {
    background-color: #f5f5f5;
    padding-bottom: 100upx;
    box-sizing: border-box;
    min-height: calc(100vh - 100upx);
		
		.alarmText{
			color:red;
			font-size: 22upx;
			text-align: center;
			padding-top: 10upx;
		}
		
  }

  .address-list {
    padding: 40upx 30upx;
		padding-top: 10upx;
  }

  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100upx;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-primary {
      width: 45%;
			margin-left: 3%;
      font-size: 32upx;
      color: #FFFFFF;
			height: 80upx;
			line-height: 80upx;
			
			&.btn-white{
				background-color: #f1c372;
				color: #ffffff;
				
			}

      .icon {
				display: inline-block;
        width: 30upx;
        height: 30upx;
        margin-right: 20upx;
				vertical-align: middle;
				margin-top: -0.2em;
      }

    }

  }


</style>