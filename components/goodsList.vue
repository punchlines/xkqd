<template>
	<view class="goods-inner" >
		<view class="goods-title">点击商品，体验购买消息~</view>
		<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.CnfkhZEOyIrBf36b1611167a5dad16428780fee9f110.png"
		 class="close" @tap="hidegoods" />
		<view class="goods-box">
			<view class="goods-item" v-for="item in goods" :key="item.gid" @tap="sendgoods(item.name)">
				<image class="goods-img" src="/static/images/goods-item.png" />
				<view class="goods-info">
					<view class="name">{{item.name}}</view>
					<view class="price">￥ {{item.price}}</view>
				</view>
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.aNcYvJSqvn8b54cedd5f31b30933c973264c017d1826.png"
				 class="cart" @tap="sendgoods(item.name)" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'goodsList',
		props:{
			goods:{
				type:Array,
				value:[]
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			hidegoods() {
			    this.$emit('hidegoods')
			},
			sendgoods(name) {
			                wx.showModal({
			                    title:'提示',
			                    content:"确认购买该商品？",
			                    success:(data)=>{
			                        if(data.confirm){
			                            this.$emit('buy',{
			                            name:name
			                        })
			                        }else{
			                            console.log(data)
			                        }
			                    },
			                    fail:(data)=>{
			                        console.log(data)
			                    }
			                })
			            }
		}
	}
</script>

<style type="less">
	.goods-inner {
        padding: 0 24rpx;
        position: absolute;
        width: 100%;
        box-sizing: border-box;
    }
    .goods-title {
        height: 114rpx;
        line-height: 114rpx;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #111111;
        letter-spacing: 0;
        text-align: left;
        display: block;
        border-bottom: 1px solid #DBDBDB;
    }
    .close {
        height: 64rpx;
        width: 64rpx;
        position: absolute;
        right: 24rpx;
        top: 24rpx;
    }
    .goods-item {
        padding: 24rpx 0;
        border-bottom: 1px solid #DBDBDB;
        height: 140rpx;
        position: relative;

    }
    .goods-box {
        padding: 24rpx;
    }
    .goods-item-img {
        width: 84rpx;
        height: 171rpx;
        margin-top: 24rpx;
    }
    .goods-info {
        display: inline-block;
        vertical-align: middle;
        padding-left: 24rpx;
    }
    .goods-img {
        height: 140rpx;
        width: 140rpx;
        display: inline-block;
        vertical-align: middle;
    }
    .name {
        height: 110rpx;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30rpx;
    }
    .price {
        height: 30rpx;
        line-height: 30rpx;
        font-size: 14px;
        color: #EE4E4E;
    }
    .cart{
        position: absolute;
        right: 24rpx;
        width: 36rpx;
        height: 36rpx;
        bottom: 28rpx;
    }
</style>
