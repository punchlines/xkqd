<template>
	<view class="container">
		<view class="GoodsCommentBox" >
			<view class="CBHeaderTitle fs3a28">共有 1 件商品待评价</view>
			<view class="GCBlist" v-if="datas">
				<view class="RPlist">
					<!-- v-for="(item,index) in list" :key="index" -->
					<view class="ProductList">
						<view class="ProductItem fx-row fx-row-center fx-row-space-around">
							<view class="PIimage">
								<image :src="datas.cover" class="Pimage"></image>
							</view>
							<view class="PIinformation">
								<view class="PFheader fx-row fx-row-top fx-row-space-around">
									<view class="Htitle fs3a28">{{datas.title}}</view>
								</view>
							<!-- 	<view class="Hdescript fs6a24">
									{{item.propertyValue.length>2?item.propertyValue[1]+'-'+item.propertyValue[3]:item.propertyValue[1]}}
								</view> -->
								<view class="Hprice fx-row fx-row-center fx-row-space-around">
									<view class="price"><text>¥ </text> {{datas.goodsPrice}}</view>
									<view class="Num fs6a24">× {{datas.goodsNum}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 评分 -->
				<view class="PRgrade fx-row fx-row-center fx-row-space-around">
					<view class="Gtitle fs3a28">商品评分</view>
					<view class="Gimage">
						<image v-for="(todo,to) in 5" :key="to" @click="changeImage(to)" :src="to<score?imageA:imageG"></image>
					</view>
				</view>
				<!-- 评价内容 -->
				<view class="PRCommentDetail">
					<view class="Detail">
						<!-- <textarea-text  placeholder="请在此处输入评价…" @inputText="inputText"></textarea-text> -->
						<textarea class="fs3a28"  placeholder="请在此处输入评价…" v-model="content" maxlength="200" show-confirm-bar="true" adjust-position="true"/>
					</view>
				</view>
				<!--拍照上传-->
				<view class="TakePhote">
					<view class="TPimage fx-row fx-row-center">
						<view class="UploadImageList" v-for="(img,imgIndex) in UploadImageList" :key="imgIndex" >
							<view class="imageBox">
								<image @longtap="deletedImage(ind,imgIndex)" :src="img"></image>
							</view>						
						</view>
						
						<view class="UploadImage" v-if="UploadImageList.length<3"  @click="takePicture(ind)">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/camera.png'"></image>
							<view>上传图片</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="CommitButton">
			<view class="Button" @click="successComment">确定</view>
		</view>
	</view>
</template>

<script>
	import textareaText from '../../template/textarea.vue';
	import {upImg} from '@/js/mzl.js'
	export default {
		components:{
			textareaText
		},
		data() {
			return {
				onlineSite:this.global.onlineSite,
				list:[
					{id:0},{id:1}
				],

				UploadImageList:[],
				uploadImage:this.global.uploadImage,
				childId:0,
				childIdFrom:0,
				judgeOrderDetailList:[],
				startNum:0,//点赞数量
				content1:'',
				content2:'',
				goodsIdList:[],//订单id
				shopId:0,
				startNumOne:0,
				startNumTwo:0,
				datas:null,
				score:5,
				imageG:'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang3.png',
				imageA:'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang2.png',
				content:''
			};
		},
		onLoad(e) {
			this.datas = JSON.parse(decodeURIComponent(e.data));
			//this.childIdFrom=e.orderId;
			//console.log('childIdFrom:'+e.orderId);
			// this.shopId=uni.getStorageSync('shopId');
			//this.judgeOrderDetail();
			// 获取从待收货页面确认收货后调到评价页面
		},
		methods:{		
			// 输入框内容
			inputText(content){				
				this.content = content.content;
			},
			// 拍照上传
			takePicture(ind){
				let that = this;
				upImg((res)=>{
				  console.log(res)				  
					if(that.UploadImageList.length<3){
						
						that.UploadImageList.push(res);
							return
						
						}else{
							that.showTips('最多上传3张图片').then(res=>{})
							return;
					 }
				});							
			},
			// 星星评分
			changeImage(to){
				this.score = to+1;
				
			},
			
			// 商品评价
			successComment(){
				
				if(this.content.length<=0){
					return this.showError("请输入评价内容");
				}
				
				
				let shopId = this.datas.shopId; //店铺id
				let itemId = this.datas.itemId; //商品项id
				let score = this.score; //评分
				let content = this.content;
				let images = JSON.stringify(this.UploadImageList);//图片
				
				


				this.$api.judgeGoods(itemId,shopId,score,content,images).then(res=>{
					console.log(res);
					uni.navigateTo({
						url: '../myself_successComment/myself_successComment'
					});
					uni.setStorageSync('_needUpdateShopOrder',true);
					
				}).catch(function(error){
					this.showError(error);
				}.bind(this))
			},
			// 长按删除图片
			deletedImage(ind,index){
				this.UploadImageList.splice(index,1);
			},
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container{
		background: @grayBg;width:100%;padding:20upx;
		.GoodsCommentBox{
			.CBHeaderTitle{margin:30upx 0;}
			.GCBlist{
				width:100%;
				background: #fff;
				padding:30upx;
				border-radius: 20upx;
				margin-bottom:30upx;
				.RPlist{
					.ProductList{
						border-bottom:1upx solid #eee;
						.ProductItem{
							padding:20upx 0;
							.PIimage{
								width:25%;.Pimage{width:160upx;height: 160upx;}
							}
							.PIinformation{
								width:70%;
								.PFheader{
									height:50upx;
									.Htitle{width:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
								}
								.Hdescript{marign:10upx 0;height:70upx;}
								.Hprice{
									height:40upx;
									.price{
										width:50%;text-align: left;text{font-size:28upx;}
									}
									.Num{width:50%;text-align: right;}
								}
							}
						}
					}
				}
				// 评分
				.PRgrade{
					padding:20upx 0;
					.Gtitle{width:50%;text-align: left;}
					.Gimage{width:50%;text-align: right;image{width:30upx;height: 30upx;vertical-align: middle;margin-right: 10upx;}}
				}
				// 评价内容
				.PRCommentDetail{
					width:100%;margin:20upx 0 30upx 0;
					.Detail{width:auto;height:300upx;background:#F5F5F5;padding:20upx;}
				}
				// 拍照上传
				.TakePhote{
					margin-bottom:20upx;
					.imageBox{
						line-height:70upx;width:140upx;height: 140upx;border:1upx solid #eee;text-align: center;margin-right: 25upx;
						image{width:40upx;height: 32upx;vertical-align: middle;}
					}
					.TPimage{
						width:100%;
						.UploadImage{
							line-height:70upx;width:140upx;height: 140upx;border:1upx solid #eee;text-align: center;margin-right: 25upx;
							image{width:40upx;height: 32upx;vertical-align: middle;}
							view{color:#6B7AF8;font-size: 20upx;}
						}
						.UploadImageList{
							width:25%;
							image{width:140upx;height: 140upx;margin-right:10upx;}
						}
					}
				}
			}
		}
		.CommitButton{
			.Button{
				.buttonRadius(@w:620upx,@h:88upx);text-align: center;line-height: 88upx;margin:0 auto;color:#fff;font-size: 32upx;
			}
		}
	}
</style>
