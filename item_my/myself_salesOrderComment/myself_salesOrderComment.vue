<template>
	<view class="container">
		<view class="CommentList" v-for="(item,ind) in goodsAppraiseList" :key="ind">
			<view class="CLstore fx-row fx-row-center fx-row-space-around">
				<view class="Simage">
					<default-image :src="item.headImage" custom-class="Pimage"></default-image>
					<text class="fs9a24">{{item.userName}}</text>
				</view>
				<view class="Sstar">
					<image v-for="items in item.score" :key="items" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/xingxing.png'"></image>
				</view> 
			</view>
			<view class="CLdescript">
				<view class="Dname fs3a28">{{item.appraiseContent}}</view>
			</view>
			<view class="CLlistImage">
				<view class="CLIitem fx-row fx-row-center fx-row-space-around" style="justify-content: left">
					<default-image v-for="(image,imageIndex) in item.image" :key="imageIndex" :src="image" custom-class="Pimage"></default-image>
				</view>
			</view>
			<view class="CLinfor fx-row fx-row-center fx-row-space-around">
				<view class="Linfor fs9a24">
					{{item.skuValue}}
				</view>
				<view class="LinforTime fs9a24">{{item.createTime}}</view>
			</view>
			<!-- 回复买家的按钮 -->
			<view v-if="item.appraiseReply.length<1&&(userType==2||userType==3||userType==4)" class="callBack fx-row fx-row-right">
				<view class="CBbtn fs6a24" @click="callBackBuyer(item.goodsId,item.orderId)">回复买家</view>
			</view>
			<!--显示商家回复卖家的评语 -->
			<view class="shopCallBack" v-if="item.appraiseReply.length>0">
				<text class="iconDown"></text>
				<view class="SCBcontent fs6a28">店家回复:{{item.appraiseReply}}</view>
			</view>
		</view>
		<view v-if="goodsAppraiseList.length==0" class="fs6a24 commentNone fx-row fx-row-center fx-row-space-around">买家暂未评价</view>
		<!-- 弹出层 -->
		<view class="container3" v-show="showpopup">
			<view class="popup fs3a28">
				<!-- 解除企业绑定 -->
				<view class="DeleteLog">
					<view class="DLlist">
						<view class="DLtitle">回复买家</view>
						<textarea  @click="focusArea" :focus="focus" @blur="blurArea" maxlength="200" v-model="content" placeholder="请输入回复" />
						<view class="DLbutton fx-row fx-row-center fx-row-space-around">
							<view class="DLagree" @click="DeleteLogAgree(content)">确定</view>
							<view class="DLreject" @click="DeletaLogCancle">取消</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mzlJS from "../../js/mzl.js";
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				list:[
					{id:0},{id:0},{id:0},{id:0},{id:0}
				],
				list1:[
					{id:0},{id:0}
				],
				content:'',
				itemId:0,
				goodsId:0,
				goodsAppraiseList:[],
				orderCreateTime:[],
				showpopup:false,
				userType:0,
				focus:true
			};
		},
		onLoad(e) {
			this.itemId=e.itemId;
			this.userType=uni.getStorageSync('userType');
			this.queryGoodsAppraise();
		},
		methods:{		
			
			
			blurArea(){
				console.log(this.focus)
				this.focus = false;
				this.$forceUpdate();
			},
			
			focusArea(){
				console.log(this.focus)
				this.focus = true;
				this.$forceUpdate();
			},
			
			// 获取评价内容信息
			queryGoodsAppraise(){
				// this.childId
				this.$api.queryGoodsAppraise(this.itemId).then(res=>{
					console.log(res.resultMap);
					for(let i of res.resultMap){
						i.createTime=(mzlJS.formatTime(i.createTime));
						i.score=Number(i.score);
						i.image = JSON.parse(i.image);
					}
					this.goodsAppraiseList=res.resultMap;
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 回复买家
			callBackBuyer(goodsId,orderId){
				this.content='';
				this.showpopup=true;
				this.goodsId=goodsId;
				this.orderId=orderId;
				console.info('goodsId:'+goodsId);
				console.info('orderId:'+orderId);
			},
			// 取消评价
			DeletaLogCancle(){
				this.showpopup=false;
			},
			// 确定评价内容
			DeleteLogAgree(content){
				if(content){
					console.log(content);
					this.$api.replyGoodsAppraise(content,this.itemId).then(res=>{
						console.log(res);
						this.queryGoodsAppraise();
						uni.setStorageSync('_needUpdateSaleOrder',true)
					}).catch(error=>{
						this.showError(error);
					})
				}
				this.showpopup=false;
			},
		},
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container{
		background: #fff;border-top:1upx solid #eee;
		.CommentList{
			margin:30upx 0;padding:0 30upx 30upx 30upx;border-bottom:1upx solid #eee;
			.CLstore{
				margin-bottom:30upx;
				.Simage{
					width:60%;.Pimage{width:62upx;height: 62upx;vertical-align: middle;margin-right: 30upx;}
				}
				.Sstar{
					text-align: right;width:40%;image{width:30upx;height: 30upx;vertical-align: middle;margin-right:12upx;}
				}
			}
			.CLdescript{
				line-height:40upx;margin-bottom:30upx;
			}
			.CLlistImage{
				margin-bottom:30upx;
				.CLIitem{
					.Pimage{width:221upx;height: 221upx;vertical-align: middle;}
				}
			}
			.CLinfor{
				margin:30upx 0;
				.Linfor{width:60%;text-align: left;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
				.LinforTime{width:40%;text-align: right;}
			}
			.callBack{
				width:100%;
				.CBbtn{.buttonRadius(@w:140upx;@h:60upx;@bg:none);color:#6B7AF8;border:1upx solid #6B7AF8;}
			}
			.shopCallBack{
				width:100%;margin-top:30upx;position: relative;z-index:1;
				.SCBcontent{
					padding:30upx;width:690upx;height:auto;background:rgba(245,245,245,1);border-radius:10upx;
				}
				.iconDown{
					width:0;height:0;border-width:20upx;border-style:solid;border-color:transparent transparent rgba(245,245,245,1);position:absolute;top:-40upx;left:70upx;
				}
			}
		}
		.commentNone{
			margin-top:30upx;
		}
		// 弹出层
		.container3{	
			.popup{
				z-index:99999999;width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);text-align:center;
				// 删除日志
				.DeleteLog{
					.DLlist{
						// height: 260upx;
						width:560upx;height: auto;background: #fff;position: absolute;border-radius: 10upx;
						top:50%;left:50%;margin-left:-280upx;margin-top:-130upx;
						.DLtitle{
							font-size: 32upx;color:#000;text-align: center;padding:40upx;font-weight:200;line-height: 50upx;
						}
						textarea{height:150upx;border-top:1upx solid #E1E1E1;padding:30upx;width:auto;text-align: left;white-space: pre-wrap;}
						.DLbutton{
							font-size: 28upx;border-top:1upx solid #E1E1E1;
							.DLagree,.DLreject{width:50%;height:87upx;line-height: 87upx;;}
							.DLagree{color:#3576EE;border-right:1upx solid  #E1E1E1;}
							.DLreject{color:#999999;}
						}
					}
				}
			}
		}
	}
</style>
