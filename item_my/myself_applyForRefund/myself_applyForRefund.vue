<template>
	<view class="container">
		<!-- 收货商品 -->
		<view class="ReceiveProduct">
			<view class="RPlist">
				<view class="ProductList">
					<view class="ProductItem fx-row fx-row-center fx-row-space-around" v-for="(item,index) in waitSendDetail" :key="index">
						<view class="PIimage">
							<default-image :src="item.goodsImage" custom-class="Image"></default-image>
						</view>
						<view class="PIinformation">
							<view class="PFheader fx-row fx-row-top fx-row-space-around">
								<view class="Htitle fs3a28">{{item.goodsName}}</view>
							</view>
							<view class="Hdescript fs6a24">
								{{item.propertyValue.length>2?item.propertyValue[1]+'-'+item.propertyValue[3]:item.propertyValue[1]}}
							</view>
							<view class="Hprice fx-row fx-row-center fx-row-space-around">
								<view class="price"><text>¥ </text>{{item.goodsPrice}}</view>
								<view class="Num fs6a24">×{{item.goodsNum}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 退款方式-->
				<view class="RefundInfrom">
					<view @click="refundKind(item.id)" v-if="flowState==1&&index==0" class="RIstyle fx-row fx-row-center fx-row-space-around fs3a28" v-for="(item,index) in refundTitle" :key="index">
						<view class="Stitle">{{item.title}}</view>
						<view class="Simage">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'"></image>
						</view>
					</view>
				</view>
				<view v-if="flowState>1" class="RefundInfrom">
					<view @click="refundKind(item.id)" class="RIstyle fx-row fx-row-center fx-row-space-around fs3a28" v-for="(item,index) in refundTitle" :key="index">
						<view class="Stitle">{{item.title}}</view>
						<view class="Simage">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				refundTitle:[
					{id:0,title:'仅退款'},
					{id:1,title:'退货并退款'},
				],
				waitSendDetail:[],
				childId:0,
				itemId:0,
				flowState:0,//待发货时  没有退货并且退款
			};
		},
		onLoad(e) {
			this.childId= e.childId;
			this.itemId= Number(e.itemId);
			this.flowState=e.flowState;
			this.fetch();
		},
		methods:{
			// 退款方式
			refundKind(index){
				this.navigateTo('../myself_applyForRefundDetails/myself_applyForRefundDetails', {
					childId: this.childId,
					itemId: this.itemId,
					flowState: this.flowState,
					refundType: index
				})
			},
			fetch(){
				this.$api.getRefundsInfo(this.itemId).then(res=>{
					console.log(res)
				})
			}
		},
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container{
		background:@grayBg;width:100%;border-top:1upx solid #eee;position:fixed;height:100%;
		// 收货商品
		.ReceiveProduct{
			.RPlist{
				.ProductList{
					background:#fff;padding:30upx;
					.ProductItem{
						padding-top: 30upx;
						border-bottom:1upx solid #eee;padding-bottom:30upx;

						.PIimage{
							width:25%;
							.Image{width:160upx;height: 160upx;}
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
									width:40%;text-align:left;
									text{font-size:28upx;}
								}
								.Num{
									width:55%;text-align:right;font-size:28upx;
								}
							}
						}
					}
				}
				// 退款方式，退款原因
				.RefundInfrom{
					background: #fff;margin-top:30upx;
					.RIstyle{
						border-bottom:1upx solid #eee;padding:40upx 30upx;
						.Stitle{
							width:90%;text-align: left;
						}
						.Simage{
							width:10%;text-align: right;
							image{width:14upx;height: 24upx;}
						}
					}
				}
			}
		}
	}
</style>
