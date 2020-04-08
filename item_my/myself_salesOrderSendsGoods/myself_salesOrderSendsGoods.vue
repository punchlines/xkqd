<template>
	<view class="container">
		<!-- 物流信息 -->
		<view class="LoginforBox">
			
			<view class="LogInfor fx-row fx-row-center fx-row-space-around">
				<view class="Lnum fs3a28">发货方式</view>
				<view class="Linput fs6a28" @click="selectTakeWay">{{take==0?"卖家配送":'买家自提'}}</view>
				<view class="Lscan Lscan1" @click="selectTakeWay">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/fanhui.png'" mode=""></image>
				</view>
			</view>
			<template v-if="take==0">
				<view class="LogInfor fx-row fx-row-center fx-row-space-around borderB">
				<view class="Lnum fs3a28">物流单号</view>
				<view class="Linput fs6a28">
					<input type="text" v-model="flowNum" placeholder="请填写物流单号">
				</view>
				<view class="Lscan" @click="scanCode">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/saoma.png'" mode=""></image>
				</view>
				</view>
				<view class="LogInfor fx-row fx-row-center fx-row-space-around">
					<view class="Lnum fs3a28">物流公司</view>
					<view class="Linput fs6a28" @click="selectCompany">{{logName?logName:'请选择物流公司'}}</view>
					<view class="Lscan Lscan1" @click="selectCompany">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/fanhui.png'" mode=""></image>
					</view>
				</view>
			</template>
			
		</view>		
		<!-- 商品列表 -->
		<view class="ProductList">
			<view class="RPlist">
				<view class="ProductList"  v-for="(item,index) in orderProductList" :key="index">
					<view class="ProductItem fx-row fx-row-center fx-row-space-around">
						<view class="PIimage">
							<image :src="item.cover" class="Pimage"></image>
						</view>
						<view class="PIinformation" @click="gotoProductDetail(item.goodsId)">
							<view class="PFheader fx-row fx-row-top fx-row-space-around">
								<view class="Htitle fs3a28">{{item.title}}</view>
							</view>
							<view class="Hdescript fs6a24">
								{{item.attributesDesc}}
							</view>
							<view class="Hprice fx-row fx-row-center fx-row-space-around">
								<view class="price"><text>¥ </text> {{item.goodsPrice}}</view>
								<view class="Num fs6a24">× {{item.goodsNum}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 发货按钮 -->
		<view class="sendButton">	
			 <!-- <view class="Sbtn" v-if="isRefund" @click="getLogCompony">确定</view> -->
			<view class="Sbtn" @click="sendGoods">发货</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				list:[
					{id:0},{id:1},
				],
				salesOrderSendD:[],
				childId:0,
				flowNum:'',//物流单号
				orderProductList:[],
				isRefund: false,
				take:0,
				firstLevel: false,
			};
		},
		computed: {
			//Vuex引入属性
			...mapState(['logisticsCompany']),
			
			logName(){
				return this.logisticsCompany.logisticsCompany || '';
			}
			
			
			
		},

		onLoad(e) {
			
			let data = decodeURIComponent(e.data);
			
			data = JSON.parse(data);
			
			this.childId = data.childId;
			
			
			
			this.orderProductList = data.items;
			
	

		},

		methods:{
			selectTakeWay(){
					uni.showActionSheet({
						itemList: ["卖家配送",'买家自提'],
						
						success: (res) => {
							this.take=res.tapIndex;
						}
					});
			},
			
			// 选择物流公司
			selectCompany(){
				uni.navigateTo({
					url: '../myself_getLogisticsMessage/myself_getLogisticsMessage'
				});
			},
			// 扫码
			scanCode(){
				// 允许从相机和相册扫码
				uni.scanCode({
					success:(res)=>{
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.flowNum=res.result;
					}
				});
			},
			
			// 发货
			sendGoods(){
				let data = [this.take,this.childId];
				if(this.take==0){
					if(!this.flowNum){
						this.showTips('请填写物流单号').then(res=>{})
					return;
					}
					if (!this.flowNum.match(/^[A-Za-z0-9]+$/)) {
						this.showTips('物流单号只能由数字和英文组成');
						return;
					}
					if (!this.logisticsCompany.id) {
						this.showTips('请选择物流公司');
						return;
					}
					data.push(this.flowNum);
					data.push(this.logisticsCompany.id);
				}
				
				uni.showLoading();
				this.$api.sentGoods(...data).then(res=>{
						console.log(res);
						uni.setStorageSync('_needUpdateSaleOrder', true);
						this.showTips('发货成功').then(res=>{
							uni.navigateBack({
								delta: this.firstLevel ? 1 : 2
							});
						})
					uni.hideLoading();
				}).catch(error=>{
					uni.hideLoading();
					this.showError(error);
				})
			},
			// 商品详情
			gotoProductDetail(goodsId){
				uni.navigateTo({
					url: '../../module/shop/goodsDetail/goodsDetail?goodsId='+goodsId
				});
			},
			// 确定，购物订单退货详情中的物流信息
			getLogCompony(){
				let flowNum = this.flowNum;
				let logisticsCompany = this.logisticsCompany;
				this.$store.commit('setRefundLogisticsInfo', { flowNum, logisticsCompany });
				uni.navigateBack();
			},
		},

	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page{
	  height: 100%;background:@grayBg;width:100%;
	}
	.container{
		.LoginforBox{
			margin-top:30upx;
			.LogInfor{
				padding:30upx;background:#fff;
				.Lnum{
					width:25%;text-align: left;color: #000;
				}
				.Linput{
					width:65%;
				}
				.Lscan{
					width:10%;text-align: right;
					image{width:32upx;height: 32upx;vertical-align: middle;}
				}
				.Lscan1{
					image{width:12upx;height: 24upx;}
				}
			}
		}
		// 商品列表
		.ProductList{
			margin-top:30upx;background: #fff;
			.RPlist{
				.ProductList{
					border-bottom:1upx solid #eee;
					.ProductItem{
						padding:30upx;
						.PIimage{
							width:25%;
							.Pimage{width:160upx;height: 160upx;}
						}
						.PIinformation{
							width:73%;
							.PFheader{
								height:50upx;
								.Htitle{width:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
							}
							.Hdescript{
								marign:10upx 0;height:70upx;
							}
							.Hprice{
								height:40upx;
								.price{
									width:50%;text-align: left;
									text{font-size:28upx;}
								}
								.Num{width:50%;text-align: right;}
							}
						}
					}
				}
			}
		}
		// 
		.sendButton{
			margin:100upx 0;
			.Sbtn{.buttonRadius();margin:0 auto;color:#fff;font-size: 32upx;}
		}
	}
</style>
