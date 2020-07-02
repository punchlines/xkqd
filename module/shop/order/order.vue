<template>

	<view class="page">

		<!-- 收件人信息 - 无 -->
		<view class="recipient-empty-container" v-if="!fetch">
			<view class="content" @click="openAddAddress">
				<image class="icon" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/tianjia.png'"></image>
				<view class="text">添加收件人信息</view>
			</view>
		</view>
		<!-- 收件人信息 - 有 -->
		<view class="recipient-container" @click="openAddress" v-else>
			<view class="row row1">
				<view class="col1">{{ fetch.name }}</view>
				<view class="col2">{{ fetch.phone }}</view>
			</view>
			<view class="row row2">
				<view class="col1">收货地址</view>
				<view class="col2">{{fetch.province}}-{{fetch.city}}-{{fetch.area}}-{{fetch.detailedAddress}}</view>
			</view>
		</view>

		<!-- orderList -->
		<block v-for="(item,index) in orderGoods" :key="index">
			<order-item :value1='item' @remarkTap='remarkTap1'></order-item>
		</block>


		<!-- footer -->
		<view class="footer">
			<view class="price_info">
				<!-- -couponMoney -->
				应付金额：<price :size="36" :value="showTotalPrice" color="#151515"></price>
			</view>
			<button class="btn btn-gray" @click="commitByCOD" v-if="canCOD">货到付款</button>
			<button class="btn btn-primary" @click="commit">提交订单</button>
		</view>

	</view>

</template>

<script>
	import price from '../_component/price'
	import orderItem from '../_component/orderItem.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {


		components: {
			orderItem,
			price
		},

		data() {
			return {
				onlineSite: this.global.onlineSite,
				orderGoods: [],
				orderJson: [],
				remarkList: [],
				totalPrice: 0,
				fetch: "",
				//0.立即购买 1.购物车购买
				urlType: -1,
				orderNum: '',
				anchorUserId: '',
				liveId: '',
				pinId: ''

			}
		},
		onLoad(e) {
			this.orderCouponTitle(null);
			this.orderCouponMoney(null);
			this.orderCouponId(null);
			this.remarkList = new Map();
			console.info(this.carGoods)
			console.log(this.carGoods)
			// this.urlType=e.urlType
			this.liveId = e.liveId
			this.anchorUserId = e.anchorUserId
			this.pinId = e.pinId
			console.log(this.liveId, this.anchorUserId)
			this.setShopId();
			this.orderCouponTitle('');
			this.orderCouponMoney('');
		},
		onShow() {
			this.getFetch();
		},
		methods: {
			//获取地址列表
			getFetch() {
				this.$api.getAddressList().then(result => {
					this.fetch = result[0];
				}).catch(error => {
					this.showError(error)
				})
			},
			remarkTap1(e) {

				this.remarkList.set(e.shopId, e.remark);
				console.log(this.remarkList);

			},
			// 处理 汇总店铺下的商品
			setShopId() {
				let aa = [];
				let bb = [];

				for (let value of this.carGoods) {
					aa.push(value.shopId)
					this.totalPrice += value.discountPrice * value.goodsNum
				}
				var set = new Set(aa);
				bb = [...set]
				for (let value1 of bb) {
					let objItem1 = {
						franking: 0,
						value: ''
					}
					var cc = this.carGoods.filter(o => o.shopId == value1)
					objItem1.value = cc
					objItem1.franking = this.franking(cc)
					this.totalPrice += objItem1.franking
					this.orderGoods.push(objItem1)
				}
				console.log('123123', this.orderGoods)
				console.info(this.orderGoods)
				this.setCarGoods(this.orderGoods)
			},
			//处理邮费
			franking(data) {
				console.info(data)
				let franking = 0;
				if (data[0].frankingType == 1) {
					for (let item of data) {
						// 按最高的算
						if (item.franking > franking) {
							franking = item.franking
							console.info(item.franking)
							console.info('最高组')
						}
					}
				} else {
					//叠加费用
					for (let item of data) {
						franking += item.franking
						console.info(item.franking)
						console.info('累加组')
					}
				}
				return franking
			},
			openAddAddress() {
				uni.navigateTo({
					url: '../addressAdd/addressAdd'
				});
			},

			openAddress() {
				uni.navigateTo({
					url: '../address/address'
				});
			},
			// 处理订单
			disposeCommit() {
				const data = {};

				data.addressId = this.fetch.id;

				data.items = [];

				for (let item of this.orderGoods) {

					//处理items 订单项
					for (let item2 of item.value) {
						const it = {
							goodsNum: item2.goodsNum,
							skuId: item2.skuId,
							goodsName: item2.goodsTitle,
							identity: item2.propertySku.join('-')
						};

						if (item2.recommendId || this.shareId) {
							it.reCommandUserId = item2.recommendId || this.shareId;
						}

						data.items.push(it);
					}

				}

				data.msgs = {};
				//TODO 优惠券
				this.remarkList.forEach((v, k, r) => {
					/**
					 * v - remark  k - shopid  r -item
					 */
					data.msgs[k] = {
						msg: v
					};

				});
				data.msgs = JSON.stringify(data.msgs);
				data.items = JSON.stringify(data.items);
				console.log(data);

				return data;

				//         this.orderJson=[];
				//         for (let item1 of this.orderGoods) {
				// 
				//           let obj1={
				//             couponId: item1.coupon ? item1.coupon.couponId : '',
				//             content:'',
				//             // shopId:item1[0].shopId,
				//             orderItems:[],
				//           };
				// 
				//           for(let i=0;i<this.remarkList.length;i++){
				//             if(this.remarkList[i].shopId==item1.value[0].shopId){
				//               obj1.content=this.remarkList[i].remark
				//             }
				//           }
				// 
				// 
				//           let order = {
				//             goodsList: [],
				//             coupon: item1.coupon ? item1.coupon.couponId : '',
				//             message: obj1.content,
				//             shopId: item1.value[0].shopId,
				//           }
				// 
				//           for(let item2 of item1.value){
				// 
				//             order.goodsList.push({
				//               goodsId: item2.goodsId,
				//               count: item2.goodsNum,
				//               cartId: item2.cartId || '',
				//               skuValue: item2.skuValue,
				//               shopUserId: item2.recommendId || this.shareId || '',
				//             })
				// 
				//             console.info(item2)
				//             let obj2={
				//               goodsId:'',goodsPrice:'',goodsNum:'',goodsAmount:'',goodsName:'',goodsImage:'',skuValue:''
				//             };
				//             obj2.goodsId=item2.goodsId;
				//             obj2.goodsPrice=item2.discountPrice;
				//             obj2.goodsNum=item2.goodsNum;
				//             obj2.goodsAmount=item2.discountPrice*item2.goodsNum;
				//             obj2.goodsName=item2.goodsName || item2.goodsTitle;
				//             obj2.goodsImage=item2.goodsImage;
				//             obj2.skuValue=item2.skuValue;
				//             obj2.cod=item2.cod;
				//             if (item2.recommendId) obj2.recommendId=item2.recommendId;
				//             obj1.orderItems.push(obj2);
				//           };
				// 
				// 
				// 
				// 
				//           this.orderJson.push(order)
				//           console.info(	this.orderJson)
				//         };
				//         let data={
				//           shareUserId:this.shareId || '',
				//           userAddressId:this.fetch.id,
				//           userId:	uni.getStorageSync('userId'),
				//           orderJson:JSON.stringify(this.orderJson),
				//           type:this.urlType
				//         }
				// 
				//         console.log(this.orderJson)
				// 
				//         return data;
			},
			// 提交订单
			commit() {
				if (!this.fetch) {
					this.showTips('请填写收货地址');
					return false;
				}
				let data = this.disposeCommit();
				console.info(data)
				uni.requestSubscribeMessage({
					tmplIds: ['aBw6JoyVaU8-1iSXbw3tpY80kmTIpqpYh-2NAC19pSs'],
					success(res) {
						console.log('test', res)
						this.shares = share
					}
				})
				uni.showLoading()
				//if(!this.orderNum)
				console.log(this.anchorUserId, this.liveId)
				if (this.anchorUserId != undefined && this.liveId != undefined) {

					let openid = uni.getStorageSync('openid');
					if (this.pinId != undefined) {
						this.$api.saveLivePinOrder(data.msg, 0, openid, data.item, data.addressId, this.pinId, this.liveId, this.anchorUserId)
							.then(res => {
								uni.hideLoading()
								console.log(res)
								return this.$api.unifiedorder(res.orderNum)
									.then(res => {
										return _self.requestPayment(result.prePayInfo)
									}).then(result => {
										uni.showToast({
											title: '支付成功',
											duration: 2000
										});
								
									})
							})
					} else {
						this.$api.saveLiveGoodsOrder(data.msg, 0, openid, data.item, data.addressId, this.liveId, this.anchorUserId)
							.then(res => {
								uni.hideLoading()
								console.log(res)
								return this.$api.unifiedorder(res.orderNum)
									.then(res => {
										return _self.requestPayment(result.prePayInfo)
									}).then(result => {
										uni.showToast({
											title: '支付成功',
											duration: 2000
										});

									})

							})
					}
				} else {
					this.$api.createOrder(data.addressId, data.items, data.msgs, 0).then((res) => {
						uni.hideLoading()
						if (res) {
							this.orderNum = res;
							this.getPayData(res)
						} else {
							this.showTips('提交订单失败');
						}

					}).catch((err) => {
						uni.hideLoading()
						console.info(err)
						this.showError(err, '创建订单失败')
					})
				}
				//else this.getPayData(this.orderNum)
			},

			commitByCOD() {
				if (!this.fetch) {
					this.showTips('请填写收货地址');
					return false;
				}

				const action = () => {
					let data = this.disposeCommit();
					uni.showLoading()
					this.$api.createOrder(data.addressId, data.items, data.msgs, 1).then((res) => {
						uni.hideLoading()
						uni.redirectTo({
							url: '../paySuccess/paySuccess?type=cod'
						});
					}).catch((err) => {
						uni.hideLoading()
						console.info(err)
						this.showError(err, '创建订单失败')
					})
				}

				uni.showModal({
					title: '是否确认使用货到付款提交订单？',
					content: '货到付款订单总价：' + this.showTotalPrice,
					success: (res) => {
						if (res.confirm) {
							action();
						}
					}
				});
			},

			//获取支付参数  orderType：订单类型。1：vip购买；2：名片圈入圈；3：商品交易
			getPayData(orderNum) {
				this.$api.unifiedorder(orderNum).then(result => {
					//TODO
					console.log(result)
					return this.requestPayment(result.prePayInfo);
				}).then(result => {
					uni.redirectTo({
						url: '../paySuccess/paySuccess'
					});
				}).catch(error => {
					uni.hideLoading();
					this.showTips(error.message)
					// uni.redirectTo({ url:'../order/order' });
				})
			},
			// 拉起微信支付
			payWeiXin() {

			},
			//Vuex引入方法
			...mapMutations(['setCardUserId', 'setUPinfo', 'setCarGoods', 'orderCouponTitle', 'orderCouponMoney',
				'orderCouponId'
			]),
		},
		computed: {
			//Vuex引入属性
			...mapState(['cardUserId', 'UPinfo', 'carGoods', 'shareId', 'couponMoney', 'couponId']),
			showTotalPrice() {
				let total = 0;
				for (const order of this.orderGoods) {
					let itemTotalPrice = 0;
					for (let item of order.value) {
						itemTotalPrice += item.discountPrice * item.goodsNum;
					}
					const couponMoney = order.coupon ? order.coupon.preferentialMoney : 0;
					total += (itemTotalPrice + order.franking - couponMoney > 0 ? (itemTotalPrice + order.franking - couponMoney) : 0)
				}
				return total
			},
			canCOD() {
				for (const order of this.orderGoods) {
					for (let goods of order.value) {
						if (goods.cod !== 1) return false;
					}
				}
				return true;
			},
		},
	}
</script>

<style scoped lang="less">
	.page {
		background-color: #f5f5f5;
		padding-bottom: 100upx;
		box-sizing: border-box;
		min-height: 100vh;
	}

	.recipient-empty-container {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		height: 322upx;
		margin-bottom: 24upx;

		.content {
			text-align: center;
		}

		.icon {
			width: 110upx;
			height: 110upx;
		}

		.text {
			font-size: 28upx;
			color: #666666;
		}

	}

	.recipient-container {
		padding: 30upx;
		background-color: #ffffff;
		margin-bottom: 25upx;

		&:active {
			background-color: #eee;
		}

		.row {
			display: flex;

			.col1 {
				width: 160upx;
				margin-right: 60upx;
			}

			.col2 {
				flex: 1;
			}
		}

		.row1 {
			font-size: 32upx;
			color: #333333;
			margin-bottom: 15upx;
			font-weight: bold;
			align-items: center;

			&:after {
				content: "";
				width: 22upx;
				height: 22upx;
				background-size: 100% 100%;
				background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPHBhdGggZD0iTTM2MC43MzEsMjI5LjA3NWwtMjI1LjEtMjI1LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwcy01LjMsMTMuOCwwLDE5LjFsMjE1LjUsMjE1LjVsLTIxNS41LDIxNS41ICAgYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0YzMuNCwwLDYuOS0xLjMsOS41LTRsMjI1LjEtMjI1LjFDMzY1LjkzMSwyNDIuODc1LDM2NS45MzEsMjM0LjI3NSwzNjAuNzMxLDIyOS4wNzV6ICAgIiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
			}
		}

		.row2 {
			font-size: 28upx;
			color: #666666;
		}
	}

	.footer {
		background: #FFFFFF;
		height: 100upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding: 32upx;
		box-sizing: border-box;
		z-index: 999;

		.price_info {
			font-size: 28upx;
			color: #333333;
			flex: 1;
		}

		.btn {
			font-size: 28upx;
			color: #FFFFFF;
			height: 70upx;
			line-height: 70upx;
			width: 180upx;
			border-radius: 40upx;

			&:after {
				display: none;
			}

			&+.btn {
				margin-left: 16upx;
			}
		}

		.btn-gray {
			background: #F5F5F5;
			color: #666666;
			border-color: #F5F5F5;
		}
	}
</style>
