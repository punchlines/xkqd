<template>

  <view class="page">
    <view class="car-item" v-for="(item,index) in carList" :key="index">
      <view class="header">
        <view class="car-check"></view>
				<!-- <default-image :src="item.shopLogo" custom-class="logo"></default-image> -->
				<image :src="item.shopLogo" class="logo"></image>
        <view class="name">{{item.shopName}}</view>
      </view>
      <view class="goods_list">

				<view class="car_goods_item">
					<view class="car-goods-container" :class="{ invalid: item.isFailure == 1 }">
						<view class="car-check">
							<view class="inputImage">
								<image class='inputImage' @click="checkedAllCheckedbox(index,item.discountPrice)" :src="item.isSelected?'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image>
							</view>
						</view>
						<view class="container">
						<view @click='openGoodsDetail(item,index)'>
							<!-- <default-image  :src="item.goodsImage" custom-class="cover"></default-image> -->
							<image :src="item.goodsImage" class="cover"></image>
						</view>
							<view class="content">
								<view class="name" @click='openGoodsDetail(item,index)'>
									<view :class="{'mod_tag':item.shopGrade==2||item.shopGrade==3}">{{item.shopGrade==2?'品牌':item.shopGrade==3?'旗舰':''}}</view>
									{{item.goodsTitle}}
								</view>
								<view class="sku" @click='openGoodsDetail(item,index)'>
									{{item.propertySku_S}}
								</view>
								<view class="footer1">
									<view class="price"><price :size="36" :value="item.discountPrice"></price></view>
									<view class="numberInput">
										<numberInput :newVal="item.goodsNum" @inputTap2='addTap' :index='index' autoWidth></numberInput>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="btn-delete" @click="deleteProduct(item,index)">删除商品</view>
				</view>




      </view>
    </view>

    <view class="footer">
      <view class="check" @click="selectAll">
					<view class="inputImage" style="margin-right: 10upx">
						<image class='inputImage' v-if="allSelected" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png"></image>
						<image class='inputImage' v-else src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png"></image>
					</view>
        <text>全选</text>
      </view>
      <view class="total">合计：¥{{allInputPriceShow}}</view>
      <button class="btn-primary" @click="openOrderTap">结算</button>
    </view>

  </view>

</template>

<script>
	import price from '../_component/price.vue';
	import numberInput from '@/components/shop/_component/numberInput.vue';

	import {mapState,mapMutations} from 'vuex';

  export default {
    data () {
      return {
				checkImage:false,
				allSelected:false,
				onlineSite:this.global.onlineSite,
				newVal: false,
				disabled:false,
				carList:[],
				allInputPrice:0,
				totalPrice:'',
				indexNumber:0
      }
    },
		watch: {
			newVal () {
				this.$emit('input', this.newVal);
			},
			value () {
				this.newVal = this.value
			},
		},
		mounted () {
			this.newVal = this.value;
		},
    methods: {
	
		
			// 数量
			addTap(value){
				console.info(value)
				// 原来的数量
				var  yunVal=this.carList[value.index].goodsNum;
				// 单价
				var price=this.carList[value.index].discountPrice;
				// 当前点击商品是否选中
				var is_clickStatus=this.carList[value.index].isSelected
				if(is_clickStatus){
					if(yunVal<value.newVal){
						this.allInputPrice+=price
					}else{
						this.allInputPrice-=price
					}
				}
				this.carList[value.index].goodsNum=value.newVal
				this.$api.updateShoppingCartData(this.carList[value.index].cartId, value.newVal).then(result => {

				}).catch(error => {
					this.showError(error)
				});
			},
			// 选中图片的按钮
			changeValue () {
				if (this.disabled) return;
						this.newVal = !this.newVal
			},
			// 获取购物车列表
			showShoppingCart(){
				this.$api.showShoppingCart().then(res=>{
					console.log(res,"res");
					for(let i=0;i<res.shoppingCartList.length;i++){
						res.shoppingCartList[i].isSelected=false;
						res.shoppingCartList[i].propertySku_S=''
						for(var j=0;j<res.shoppingCartList[i].propertySku.length;j++){
							res.shoppingCartList[i].propertySku_S+=res.shoppingCartList[i].propertySku_S?'-'+res.shoppingCartList[i].propertySku[j]:res.shoppingCartList[i].propertySku[j]
						}
					}
					console.log(this.carList,"this.carList-a")
					this.carList=res.shoppingCartList;
					console.log(this.carList,"this.carList-b")
					this.totalPrice=res.amount;
				})
			},
			//单选选
			checkedAllCheckedbox(index,price){
				if (this.carList[index].isFailure == 1) {
					return;
				}

				this.carList[index].isSelected = !this.carList[index].isSelected;
				if(this.carList[index].isSelected){
					this.allInputPrice+=price*this.carList[index].goodsNum;
					this.indexNumber+=1
				}else{
					this.allInputPrice-=price*this.carList[index].goodsNum;
					this.indexNumber-=1
				}
				console.info(this.indexNumber)
				if(this.indexNumber==this.carList.filter(item => item.isFailure == 0).length){
					// 判断是否已选满
					this.allSelected=true
				}else{
					this.allSelected=false
				}
			},
			//全选所有按钮
			selectAll(){
				// 是否全选
				this.allSelected=!this.allSelected;
				if(this.allSelected){
					this.allInputPrice=0;
					this.indexNumber=this.carList.length;
					for(let i=0;i < this.carList.length;i++){
						if (this.carList[i].isFailure == 0) {
							this.carList[i].isSelected=true;
							this.allInputPrice+=this.carList[i].discountPrice*this.carList[i].goodsNum;
						}
					}
				}else{
					for(let i=0;i < this.carList.length;i++){
						this.carList[i].isSelected=false;
					}
					this.allInputPrice=0;
					this.indexNumber=0;
				}
			},
			// 删除商品
			deleteProduct(item,index){
				uni.showLoading();
				this.$api.deleteShoppingCartGoods(item.cartId).then(res=>{
					this.checkedAllCheckedbox(index,item.discountPrice);
					this.carList=this.carList.filter(o=>o.cartId!=item.cartId);
					//this.$store.dispatch('setCarListNoFetch',this.carList.filter(o=>o.cartId!=item.cartId));
						if(this.indexNumber==this.carList.filter(item => item.isFailure == 0).length){
							// 判断是否已选满
							this.allSelected=true
						}else{
							this.allSelected=false
						}
					this.showTips('成功删除商品').then(res=>{});
					uni.hideLoading();
				}).catch(error => {
					uni.hideLoading();
					this.showError(error);
				})
			},
			// 结算
			openOrderTap(){
				if(this.indexNumber==0){
					this.showTips('请选择商品商品').then(res=>{})
					return false;
				}else{
					for(let value of 	this.carList){
						console.info(value)
					}
					var goodsArr=this.carList.filter(o=>o.isSelected==true);
					this.setCarGoods(goodsArr)
					console.info(goodsArr)
					uni.navigateTo({ url: '../order/order?urlType=1' });
					this.logTap()
				}
			},
			//初始购物车数据
			logTap(){
				for(let i of this.carList){
					i.isSelected=false;
				}
				this.allInputPrice=0;
				this.indexNumber=0;
				this.allSelected=false;
			},
			openGoodsDetail (item,index) {
				this.navigateTo('../goodsDetail/goodsDetail',{id:item.goodsId ,shopId:item.shopId})
			},
			//Vuex引入方法
				...mapMutations(['setCardUserId','setUPinfo','setCarGoods'])
    },
		onLoad(){
			this.showShoppingCart();
		},
		onShow(){
			
			//this.allSelected = false;
		},
		components: { price,numberInput },
		computed: {
		//Vuex引入属性
		...mapState(['cardUserId','UPinfo','carGoods']),
          allInputPriceShow () {
		  	return this.allInputPrice.toFixed(2)
		  },
		},
  }


</script>

<style scoped lang="less">

	.page {
		padding-bottom: 100upx;
		box-sizing: border-box;
		min-height: 100vh;
	}

.inputImage{
		width: 30upx;
		height: 30upx;
		display: inline-block;
	}
  .car-check {
    width: 30upx;
    height: 30upx;
    display: inline-block;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .car_goods_item {
    padding-top: 32upx;
    padding-bottom: 24upx;
    border-bottom: 1upx solid #E1E1E1;

    .car-goods-container {
      display: flex;
      align-items: center;
			&.invalid {
				opacity: 0.6;
			}
    }
    .car-check {
      margin-left: 16upx;
      margin-right: 23upx;
    }
    .container {
      display: flex;
      margin-bottom: 24upx;
      padding-right: 22upx;
      box-sizing: border-box;
      flex: 1;
			overflow: hidden;
    }
    .cover {
      width: 202upx;
      height: 202upx;
      margin-right: 20upx;
    }
    .content {
      display: flex;
      flex-direction: column;
    }
    .name {
      font-size: 28upx;
      color: #333333;
      margin-bottom: 20upx;
    }
    .mod_tag {
      display: inline-block;
      background: #E0B97A;
      border-radius: 19upx;
      font-size: 20upx;
      color: #FFFFFF;
      padding: 5upx 16upx;
			margin-right: 8upx;
    }
    .sku {
      font-size: 24upx;
      color: #666666;
      line-height: 46upx;
      flex: 1;
    }
    .footer1 {
      display: flex;
			justify-content:space-between;
			align-items: center;
			width:100%;
    }
    .price {
			width:50%;
    }
    .numberInput {
			width:50%;
    }
    .btn-delete {
      background: #F8F8FF;
      border-radius: 25upx;
      font-size: 20upx;
      color: #666666;
      line-height: 50upx;
			text-align: center;
      width: 140upx;
			height: 50upx;
      margin-left: 70upx;
    }
  }
	.car-check {
    width: 30upx;
    height: 30upx;
    display: inline-block;
  }

  .page {
    background-color: #f5f5f5;
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: 24upx;
  }

  .car-item {
    background-color: #ffffff;
    margin-bottom: 24upx;
    .header {
      height: 100upx;
      display: flex;
      align-items: center;
      padding: 0 16upx;
      border-bottom: 1upx solid #E1E1E1;

      .car-check {
        margin-right: 23upx;
      }
      .logo {
        width: 60upx;
        height: 60upx;
        margin-right: 22upx;
      }
      .name {
        font-size: 28upx;
        color: #333333;
      }
    }
    .goods_list {

    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    height: 100upx;
		z-index: 99;
    .check {
      font-size: 28upx;
      color: #666666;
      margin-right: 98upx;
      margin-left: 16upx;
      display:flex;
			align-items:center;
    }
    .car-check {
      margin-right: 17upx;
    }
    .total {
      font-size: 30upx;
      color: #333333;
      font-weight: bold;
      flex: 1;
    }
    .btn-primary {
      width: 242upx;
      height: 82upx;
      line-height: 82upx;
      font-size: 30upx;
      color: #FFFFFF;
      margin-right: 30upx;
    }
  }


</style>
