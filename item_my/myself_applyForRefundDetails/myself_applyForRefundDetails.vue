<template>
	<view class="container">
		<!-- 收货商品 -->
		<view class="ReceiveProduct" :class="{'ReceiveP':showItem[0].show==true}">
			<view class="RPlist">
				<view class="ProductList">
					<view class="ProductItem fx-row fx-row-center fx-row-space-around">
						<view class="PIimage" @click="gotoProductDetail(item.goodsId)">
							<image :src="item.cover" class="Pimage"></image>
						</view>
						<view class="PIinformation">
							<view class="PFheader fx-row fx-row-top fx-row-space-around">
								<view class="Htitle fs3a28">{{item.title}}</view>
							</view>
							<view class="Hdescript fs6a24">
								{{item.attributesDesc}}
							</view>
							<view class="Hprice fx-row fx-row-center fx-row-space-around">
								<view class="price"><text>¥ </text> {{ item.goodsPrice * item.goodsNum }}</view>
								<view class="Num fs6a24 fx-row fx-row-center fx-row-space-around">
									<!--  @click="reduceNum(item.goodsNum,item.goodsPrice)" -->
									<view class="reduce">-</view>
									<view class="AllNum">{{ item.goodsNum }}</view>
									<!-- @click="addNum(item.goodsNum,item.goodsPrice)" -->
									<view class="add">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 退款方式-->
				<view class="RefundInfrom">
					<view class="RIstyle fx-row fx-row-center fx-row-space-around fs3a28">
						<view class="Stitle1">退款方式</view>
						<view class="Simage1">{{refundKind}}</view>
					</view>
				</view>
				<!--退款原因-->
				<view class="RefundInfrom" @click="refReason">
					<view class="RIstyle fx-row fx-row-center fx-row-space-around fs3a28">
						<view class="Stitle">退款原因</view>
						<view class="StitleName">{{refundReasonItem}}</view>
						<view class="Simage">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'"></image>
						</view>
					</view>
				</view>
				<!--退款说明-->
				<view class="refundDescript fs3a28">
					<view class="RDtitle">退款说明</view>
					<view class="RDdetails" v-if="showTextare">
						<textarea :focus="focus" @click="focus=true" @focus="focus=true" @blur="bindTextAreaBlur(refundContent)" placeholder="请在此处输入退款说明…" v-model="refundContent" maxlength="200"
						 show-confirm-bar="true" adjust-position="true" />
						</view>
				</view>
				<!--拍照上传-->
				<view class="TakePhote" >
					<view class="TPimage fx-row fx-row-left">
						<image class="UploadImage" v-for="(img,imgIndex) in UploadImageList" :key="imgIndex" @click="goodsImgClick(imgIndex,img)" :src="img"></image>
						<view v-if="UploadImageList.length<3" class="UploadImage" @click="takePicture">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/camera.png'"></image>
							<view>上传图片</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 提交申请 -->
			<view class="submite fs3a32">
				<view class="Sbutton" @click="submitApp()">提交申请</view>
			</view>
		</view>
		<!-- 弹出层 退款方式 -->
		<view class="container3">
			<view class="popup fs3a28" v-show="showItem[0].show">
				<!-- 退款原因 -->
				<view class="RefundReson fs6a28" v-show="showItem[2].show">
					<view class="RReason fx-row fx-row-center fx-col-space-around">
						<view class="ReasonTitle fs3a32">退款原因</view>
						<view class="Rcancle fs6a28" @click="cancle">取消</view>
					</view>
					<view class="ReasonList">
						<view :class="{'Litem':true,'LitemActive':index==LitemActiveIndex}" v-for="(item,index) in refundReason"
						:key="index" @click="changeTitleA(index,item.title)">{{item.title}}
						<image v-show="index==LitemActiveIndex" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png'"></image>
						</view>
					</view>
					<view class="Refundbutton" @click="AgreeReason">
						<view class="RBbutton">确定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {upImg,uploadFile} from "../../js/mzl.js";
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				ProductNum:1,
				// 弹出层显示
				focus:false,
				showItem:[
					{id:0,show:false},
					{id:1,show:false},
					{id:2,show:false}
				],
				// 退款方式
				refundStyle:[
					{id:0,title:'仅退款'},
					{id:1,title:'退货退款'},
				],
				// 退款原因
				refundReason:[
					
				],
				refundReasonItem:'',//退款原因
				refundReasonItem1:'',
				refundContent:'',//退款说明
				// 退款下标
				LitemActiveIndex:-1,
				refundKind:'',//传递过来的退款方式
				flowState:0,
				UploadImageList:[],//上传的图片
				goodsNum:1,//商品数量
				goodsAmount:0,//商品总价
				childId:0,
				itemId:0,
				showTextare:true,
				item:null
			};
		},
		async onLoad(options) {
				/**
				 *  os: 0=待支付 1=支付成功 2=支付失败 3=取消支付 4=订单超时 5=仅退款 6=退货退款 7=仅退货 8=特殊状态（正在申请全单售后）
				 *  t:  0 -在线 1-货到付款
				 *  fs: 物流状态 -1=未确认 0=未发货 1=已发货 2=已签收 3=退货
				 */
			let reason = await this.$api.getRefundsTypeList();
			
			this.refundReason = reason;
			
			this.flowState=options.flowState;
			// //退款方式：仅退款0 、退货退款1
			this.refundKind = [1,2].includes(Number(this.flowState))?'退货退款':'仅退款';
			
			const data = JSON.parse(decodeURIComponent(options.data));
			
			this.item = data;
			
			this.itemId= data.id;
			//this.sendOrderDetail();
		},
		methods:{
			// 提交申请
			submitApp(){
				if (!this.refundReasonItem) {
					this.showError('请选择退款原因');
					return;
				}
				if (!this.refundContent) {
					this.showError('请输入退款说明');
					return;
				}
				
				let action = null;
				
				const list = JSON.stringify(this.UploadImageList);
								
				if(this.refundKind=="仅退款"){
					action = this.$api.applyMoeny(this.refundContent,this.itemId,list,this.refundReason[this.LitemActiveIndex].id);
				}else{
					action = this.$api.applyRefundMoeny(this.refundContent,this.itemId,list,this.refundReason[this.LitemActiveIndex].id);
				}
				
				action.then(res=>{
					this.showTips('提交成功').then(() => {
						uni.setStorageSync('_needUpdateShopOrder',true);
						//退款详情
						uni.redirectTo({
							url: '../myself_refundsDetail/myself_refundsDetail?refundId='+res
						})
					})
				}).catch(err=>{
					this.showError(err);
					
				});
			
				
				

			},
			// 获取商品信息 待发货详情
			
		
			// 取消弹出层
			cancle(){
				for(var i of this.showItem){
					i.show=false;
				}
				this.showTextare=true;
			},
			// 退款原因
			refReason(){
				for(var i of this.showItem){
					i.show=false;
				}
				this.showItem[0].show=true;
				this.showItem[2].show=true;
				this.showTextare=false;
			},
			// 退款下标
			changeTitleA(index,title){
				this.LitemActiveIndex=index;
				console.log(title);
				this.refundReasonItem1=title;
			},
			// 确定退款原因
			AgreeReason(){
				for(var i of this.showItem){
					i.show=false;
				}
				this.refundReasonItem=this.refundReasonItem1;
				this.showTextare=true;
			},
			// 退款说明
			bindTextAreaBlur(refundContent){
				this.focus = false;
				console.log(refundContent);
			},
			// 删除图片或者预览
			goodsImgClick(index,img){
				console.info(index)
				uni.showActionSheet({
					itemList: ['预览','删除'],
					success:(res)=>{
						if(res.tapIndex==0){
							this.previewImage(index,img)
						}else{
							this.delImg(index,img)
						}
					},
					fail:(res)=>{
						console.log(res.errMsg);
					}
				});
			},
			//删除图片
			delImg(index,img){
				this.UploadImageList=this.UploadImageList.filter(o=>o!=this.UploadImageList[index])

			},
			//预览图片
			previewImage(index,img){
				console.info(index)
				uni.previewImage({
					current:this.UploadImageList[index],
					urls:this.UploadImageList,
					loop:true
				});
			},
			// 拍照上传
			takePicture(){
				upImg((res=>{
					console.info(res);
					this.UploadImageList.push(res);
				}))
			},
			// 商品详情
			gotoProductDetail(goodsId){
				uni.navigateTo({
					url: '../../module/shop/goodsDetail/goodsDetail?goodsId='+goodsId
				});
			},
		},

	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container{
		background:@grayBg;padding-bottom:100upx; z-index: 88;
		// 收货商品
		.ReceiveProduct{
			.RPlist{
				padding:30upx;border-top:1upx solid #eee;background:#fff;
				padding-top: 0;
				.ProductList{
					.ProductItem{
						padding-top: 30upx;
						border-bottom:1upx solid #eee;padding-bottom:30upx;
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
									width:40%;text-align:left;
									text{font-size:28upx;}
								}
								.Num{
									width:60%;height: 64upx;border:1upx solid #eee;text-align: center;line-height: 64upx;font-size:32upx;
									.reduce{width:25%;height: 64upx;border-right:1upx solid #eee;font-size:60upx;font-weight: 900upx;}
									.AllNum{
										width:50%;
										input{height: 64upx;}
									}
									.add{width:25%;height: 64upx;border-left:1upx solid #eee;font-size:40upx;font-weight: 900upx;}
								}
							}
						}
					}
				}
				// 退款方式，退款原因
				.RefundInfrom{
					padding:40upx 0;border-bottom:1upx solid #eee;
					.RIstyle{

						.Stitle1{width:70%;text-align: left;}
						.Simage1{
							width:30%;text-align: right;
							image{width:14upx;height: 24upx;}
						}
						.StitleName{width:40%;text-align: right;}
						.Stitle{width:50%;text-align: left;}
						.Simage{
							width:10%;text-align: right;
							image{width:14upx;height: 24upx;}
						}
					}
				}
				// 退款说明
				.refundDescript{
					padding:40upx 0;
					z-index:0;
					.RDtitle{padding-bottom:30upx;}
					.RDdetails{
						textarea{
							width:auto;height:300upx;padding:24upx;background:#F5F5F5;
							z-index:0;
						}
					}
				}
				// 拍照上传
				.TakePhote{
					.TPimage{
						.UploadImage{
							line-height: 50upx;text-align:center;
							width:140upx;height: 140upx;border:1upx solid #eee;
							image{width:40upx;height: 32upx;vertical-align: middle;margin-top:35upx;}
							view{color:#6B7AF8;font-size: 20upx;}
						}
						.UploadImage{
							width:140upx;height: 140upx;
							&+.UploadImage {
								margin-left:20upx;
							}
						}
					}
				}
			}
			// 提交申请
			.submite{
				color:#fff;width:100%;height: 100upx;background: #fff;position: fixed;bottom:0;border-top:1upx solid #eee;
				.Sbutton{
					.buttonRadius(@w:620upx,@h:80upx);
					text-align: center;line-height: 80upx;
					position: absolute;top:10%;left:50%;margin-left:-310upx;
				}
			}
		}
		.ReceiveP{width:100%;position: fixed;}
		// 弹出层
		.container3{
			z-index:9999;
			.popup{
				width:100%;height:100%;position:fixed;bottom:0;left:0;background:rgba(0,0,0,.5);text-align:center;
				z-index:999999;
				// 退款方式
				.Plist{
					margin-bottom:10upx;
					width:100%;height: 300upx;position: absolute;background:rgba(0,0,0,.5);bottom:-10upx;
					.plistItem,.Pcancle{
						width:100%;height:98upx;line-height:98upx;border-bottom:1upx solid #eee;background: #fff;
					}
					.plistItemLast{margin-bottom:10upx;}
				}
				// 退款原因
				.RefundReson{
					width:100%;background: #fff;position: fixed;bottom: 0;
					.RReason{
						padding:30upx;
						.ReasonTitle{width:50%;text-align: left;color:000;font-weight:bold;}
						.Rcancle{width:50%;text-align: right;}
					}
					.ReasonList{
						.Litem{
							padding:35upx 30upx;border-bottom:1upx solid #eee;text-align: left;position: relative;
							image{width:28upx;height: 22upx;vertical-align: middle;position: absolute;right:40upx;}
						}
						.Litem:last-child{border-bottom: none;}
						.LitemActive{color: #6B7AF8;}
					}
					.Refundbutton{
						width:100%;height:88upx;background: #6B7AF8;
						font-size: 32upx;color:#fff;text-align: center;line-height: 88upx;
					}
				}
			}
		}
	}
</style>
