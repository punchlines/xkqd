<template>
	<view class="container2">
		<!-- 动态列表 -->
		<view class="trendBox">
			<!-- 轮播头部 -->
			<view class="TBHeader fx-row fx-row-center fx-col-space-around">
				<view class="Himage">
					<default-image src="userInfor.headImage" custom-class="Pimage"></default-image>
					<text class="fs6a24">木子李</text>
				</view>
				<view class="Hmore" @tap="getMore">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/more.png'" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 轮播图 -->
			<view class="TBmiddle">
				<swiper @change="changeSwiperNum($event)" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration" indicator-color="#E1E1E1" circular="true" indicator-active-color="#6B7AF8" display-multiple-items="1">
					<swiper-item v-for="(item,index) in SwiperList" :key="index" :display-multiple-items="index">
						<image :src="item.image" mode="widthFix"></image>
					</swiper-item>
				</swiper>
				<view class="TBMswiperNum fsf24">{{currentNum+1}}/{{SwiperList.length}}</view>
			</view>
			<!-- 轮播底部段落 -->
			<view class="TBbottom">
				<view v-if="hideText" class="TBtitle fs3a28">{{sliceCountText}} ...
					<text class="countTextNum fs3a28" @tap="openTextTitle">展开</text>
				</view>	
				<view v-if="OpenText" class="TBtitle fs3a28">{{countTextNum}}
					<view class="countTextNum2 fs3a28" @tap="hideTextTitle">收起</view>
				</view>
				<view class="TBCenter fs9a24 fx-row fx-row-center fx-row-space-between">
					<view class="TBCtime">1分钟前</view>
					<view class="TBCinfor fx-row fx-row-center fx-col-space-around">
						<view class="Czan">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"></image>
							<text>200</text>
						</view>
						<view class="Cmessage" @tap="GoToComment">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'" mode="widthFix"></image>
							<text>367</text>
						</view>
						<view class="Csend" @tap="SendFriend">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/share.png'"></image>
							<text>5445</text>
						</view>
					</view>
				</view>
				<view class="TBcomment">
					<default-image src="userInfor.headImage" custom-class="Pimage"></default-image>
					<text class="fs3a28" @tap="GoToComment">添加评价</text>
					<!-- <input class="fs3a28" type="text" placeholder="添加评价"> -->
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<view class="container3">
			<view class="popup fs3a28" @tap="prevention" v-show="showBox">
				<!-- 分享 -->
				<view class="Plist" v-show="showShare">
					<view v-for="(item,index) in PolupList" :key="index" :class="{'plistItem':true,'plistItemLast':index==PolupList.length-1}" @tap="getShare($event,index)">
						{{item.title}}
					</view>		
					<view class="Pcancle"  @tap="cancle">取消</view>
				</view>
				<!-- 举报 -->
				<view class="report fs3a28" v-show="showReport">
					<view class="ReportList fs3a28">
						<view class="Rcancle" @tap="ReportCancle">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/tuichu.png'"></image>
						</view>
						<view class="RtypeInfort">
							<view class="RTtitle">举报这条动态</view>
							<view class="RTlistInfore fx-wrap fx-row fx-row-center fx-row-space-around">
								<view @tap="changeTitle(index,item.title)" :class="{'RTIttle':true,'RTtitleActive':index==Ractive}" v-for="(item,index) in ReportList" :key="index">{{item.title}}</view>
							</view>
						</view>
						<view class="Tbutton" @tap="ReportTrends">举报</view>
					</view>
				</view>
				<!-- 删除日志弹窗 -->
				<view class="DeleteLog" v-show="showDeleteLog">
					<view class="DLlist">
						<view class="DLtitle">删除日志后将不能恢复，是否要继续删除？</view>
						<view class="DLbutton fx-row fx-row-center fx-row-space-around">
							<view class="DLagree" @tap="DeleteLogAgree">同意</view>
							<view class="DLreject" @tap="DeletaLogCancle">取消</view>
						</view>
					</view>
				</view>
				<!-- 生成动态分享图 -->
				<view class="ProductShareImg" v-show="showShareImage">
					<view class="PSIList">
						<view class="PSIcancle" @tap="cancleR">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/tuichu.png'"></image>
						</view>
						<view class="Limage">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/header.png'"  mode="widthFix"></image>
						</view>
						<view class="Ltitle fs3a28 TwolineText">在不少女孩心中，蒂芙尼就是浪漫订婚钻戒的代名词，而“蒂芙尼蓝”也成为了一种</view>
						<view class="Licon fx-row fx-row-center fx-row-left fs9a24">
							<view class="Lzan">
								<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"></image>
								<text>200</text>
							</view>
							<view class="Lmessage">
								<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'" mode=""></image>
								<text>451</text>
							</view>
							<view class="Lstar fx-row fx-row-center fx-row-space-around">
								<view class="LsImage">
									<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang2.png'" mode=""></image>
								</view>
								<view>230</view>
							</view>
						</view>
						<view class="Lcode fs6a28 fx-row fx-row-center fx-row-space-around">
							<view class="LCimage ">
								<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/erweima.png'"></image>
							</view>
							<view class="LCtext">我发现了一个有趣的动态，赶紧扫码一起围观吧</view>
						</view>
						<view class="PSIsavePhone">
							<view class="Phone">保存至手机</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import shareView from '@/pages/descover/subPage/descover_TshareView.vue';
	export default {
		name:'trends',
		data() {
			return {
				onlineSite:this.global.onlineSite,
				// 轮播图
				SwiperList:[
					{id:0,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'},
					{id:1,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'},
					{id:2,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'},
					{id:3,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'},
					{id:4,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'},
					{id:5,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'}
				],
				indicatorDots:true,
				autoplay:true,
				interval:5000,
				duration:1000,
				currentNum:0,
				list:[{id:0},{id:1}],//用于循环列表
				countTextNum:'在不少女孩心中，蒂芙尼就是浪漫订婚钻戒的代名词，而“蒂芙尼蓝”也成为了一种标志性的颜在不少女孩心中，蒂芙尼就是浪漫订婚钻戒的代名词，而“蒂芙尼蓝”也成为了一种标志性的颜',
				sliceCountText:'',//切割后的字符
				hideText:true,//显示切割后的字符
				OpenText:false,//打开原数组
				//分享弹出层
				PolupList:[
					{id:0,title:'分享到微信好友'},
					{id:1,title:'生成分享图'},
					{id:2,title:'删除日志'},
					{id:3,title:'举报'}
				],
				PLindex:0,
				showBox:false,// 蒙层最低层
				showShare:false,//分享列表弹出层
				// 举报内容
				ReportList:[
					{id:0,title:'垃圾营销'},{id:1,title:'有害信息'},{id:2,title:'涉黄信息'},
					{id:3,title:'违法信息'},{id:4,title:'抄袭他人内容'},{id:5,title:'不实信息'}
				],
				Ractive:0,
				showReport:false,//举报弹出层
				// 删除日志
				showDeleteLog:false,
				// 生成分享图
				showShareImage:false,
				
			};
		},
		methods:{
			// 轮播图图片数量
			changeSwiperNum(event){
				this.currentNum=event.detail.current;
			},
			// 展开文本标题
			openTextTitle(){
				this.hideText=false;
				this.OpenText=true;
				this.countTextNum=this.countTextNum;
			},
			// 收起文本标题
			hideTextTitle(){
				this.hideText=true;
				this.OpenText=false;
				this.sliceCountText=this.countTextNum.slice(0,40);
			},
			// 跳转至评价列表
			GoToComment(){
				uni.navigateTo({
						url: '../descover_Comment/descover_Comment'
				});
			},
			// 获取更多
			getMore(){
				this.showBox=true;
				this.showShare=true;
			},
			//取消分享列表弹出层
			cancle(){
				this.showBox=false;
				this.showShare=false;//分享列表
			},
			//取消生成分享图弹出层
			cancleR(){
				this.showBox=false;
				this.showShareImage=false;//举报
			},
			// 同意删除日志
			DeleteLogAgree(){
				this.showBox=false;
				this.showDeleteLog=false;//日志
			},
			// 取消删除日志
			DeletaLogCancle(){
				this.showBox=false;
				this.showDeleteLog=false;//日志
			},
			// 同意举报
			ReportTrends(){
				this.showBox=false;
				this.showReport=false;//举报
			},
			// 取消举报
			ReportCancle(){
				this.showBox=false;
				this.showReport=false;//举报
			},
			// 转发
			SendFriend(){
				// 分享到微信好友
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "转发成功",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
				
			},
			// 分享列表
			getShare(e,index){
				this.PLindex=index;
				// console.log(index);
				// 分享到微信好友
				if(index==0){
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 1,
						summary: "微信分享成功",
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
				// 生成分享图
				else if(index==1){
					this.showBox=true;//蒙层
					this.showShare=false;//分享列表
					this.showShareImage=true;//分享图
					this.showReport=false;//举报
					this.showDeleteLog=false;//删除日志
				}
				// 删除日志
				else if(index==2){
					this.showBox=true;//蒙层
					this.showShare=false;//分享列表
					this.showShareImage=false;//分享图
					this.showReport=false;//举报
					this.showDeleteLog=true;//删除日志
				}
				// 举报
				else if(index==3){
					this.showBox=true;//蒙层
					this.showShare=false;//分享列表
					this.showShareImage=false;//分享图
					this.showReport=true;//举报
					this.showDeleteLog=false;//删除日志
				}
			},
			//举报切换标题
			changeTitle(index,title){
				this.Ractive=index;
			}
		},
		components:{
			shareView,
		},
		onLoad:function(){
			// 默认加载切割
			this.sliceCountText=this.countTextNum.slice(0,38);
			//判断登录
			
			
		}
	}
</script>

<style lang="less">

	@import '../../css/mzl_base.less';
	.container2{padding-bottom:20upx;}
	.triangle{position:absolute;top:104upx;left:497upx;}
	.trendBox{
		margin:0 0 30upx 0;background:#fff;
		.TBHeader{
			padding:20upx;
			.Himage{
				width:90%;
				.Pimage{width:60upx;height:60upx;vertical-align: middle;margin-right:30upx;}
			}
			.Hmore{
				width:10%;text-align: center;
				image{width:36upx;height:8upx;vertical-align: middle;}
			}
		}
		.TBmiddle{
			position: relative;
			swiper{
				width:100%;height:820upx;
				image{width:100%;}
			}
			.TBMswiperNum{
				width:80upx;height: 42upx;background:rgba(0,0,0,.4);position: absolute;top:20upx;right:30upx;border-radius:21upx;text-align: center;line-height: 42upx;
			}	
		}
		.TBbottom{
			padding:25upx;
			.TBtitle{
				margin:10upx 0 20upx 0;
				position: relative;font-size:30upx;line-height: 50upx;
				.countTextNum{width:100%;position:relative;right: 0;font-weight: bold;font-weight: bold;}
				.countTextNum2{width:100%;position:relative;right: 20upx;text-align: right;font-weight: bold;margin:10upx 0;}
			}
			.TBCenter{
				margin-bottom: 40upx;
				image{width:28upx;height: 24upx;vertical-align: middle;margin-right:10upx;}
				.TBCtime{width:40%;}
				.TBCinfor{
					width:60%;text-align: right;
					.Czan,.Cmessage,.Csend{width:33.33%;}
					.Cmessage{image{width:28upx;height:24upx;vertical-align: middle;}}
					.Czan{image{width:28upx;height:28upx;vertical-align: middle;}}
					.Csend{image{width:28upx;height:23upx;vertical-align: top;}}
				}
			}
			.TBcomment{
				.Pimage{width:50upx;height: 50upx;vertical-align:top;margin-right: 20upx;}
				// input{width:80%;display: inline-block;}
				text{color:#aaa;}
			}
		}
	}
// 	.popup{
	.container3{	
		z-index:99999999;
		.popup{
			width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);text-align:center;
			// 分享
			.Plist{
				margin-bottom:10upx;
				width:100%;height: 500upx;position: absolute;background:rgba(0,0,0,.5);bottom:-10upx;
				.plistItem,.Pcancle{
					width:100%;height:98upx;line-height:98upx;border-bottom:1upx solid #eee;background: #fff;
				}
				.plistItemLast{margin-bottom:10upx;}
			}
			//举报
			.report{
				width:690upx;height:550upx;background: #fff;position: absolute;top:50%;left:50%;border-radius: 10upx;
				margin-top:-275upx;margin-left:-345upx;
				.ReportList{
					position:relative;
					.Rcancle{
						position:absolute;top:-80upx;right:0;
						image{width:50upx;height:50upx;}
					}
					.RtypeInfort{
						width:100%;padding:30upx;
						.RTtitle{width:100%;text-align: left;margin-left:10upx;}
						.RTlistInfore{
							margin:20upx;
							.RTIttle{
								.buttonRadius(@w:300upx;@h:70upx;@bg:none);
								color:#666;border:1upx solid #DDDDDD;line-height: 70upx;margin:20upx 0;
							}
							.RTtitleActive{
								color:@tabActive;border-color:@tabActive;
							}
						}
					}
					.Tbutton{
						.buttonRadius(@w:630upx;@h:80upx;@bg:@tabActive;);margin:0 auto;line-height: 80upx;color:#fff;
					}
				}
			}
			// 删除日志
			.DeleteLog{
				.DLlist{
					width:560upx;height: 260upx;background: #fff;position: absolute;border-radius: 10upx;
					top:50%;left:50%;margin-left:-280upx;margin-top:-130upx;
					.DLtitle{
						font-size: 32upx;color:#333;text-align: left;height:170upx;padding:40upx;font-weight:200;line-height: 50upx;
					}
					.DLbutton{
						font-size: 28upx;border-top:1upx solid #E1E1E1;
						.DLagree,.DLreject{width:50%;height:87upx;line-height: 87upx;;}
						.DLagree{color:#3576EE;border-right:1upx solid  #E1E1E1;}
						.DLreject{color:#999999;}
					}
				}
			}
			// 生成动态分享图
			.ProductShareImg{
				width:630upx;background:#F8F8F8;border-radius: 10upx;height: 850upx;position: absolute;top:50%;left:50%;border-radius: 10upx;
				margin-left:-315upx;margin-top:-425upx;
				.PSIList{
					position: relative;
					.PSIcancle{
						position: absolute;top:-70upx;right:0;
						image{width:50upx;height: 50upx;}
					}
					.Limage{		
						width:100%;height:500upx;overflow: hidden;
					}
					.Ltitle{
						padding:20upx;height:100upx;line-height:40upx;background: #fff;
					}
					.Licon{
						padding:20upx;background: #fff;
						image{width:25upx;height: 25upx;vertical-align:middle;margin-right:20upx;}
						.Lzan,.Lmessage,.Lstar{width:120upx;}
					}
					.Lcode{
						padding:30upx;
						image{width:120upx;height: 120upx;}
						.LCtext{text-align: left;margin-left:20upx;line-height: 40upx;}
					}
					.PSIsavePhone{
						position: absolute;bottom:-100upx;color:#fff;left:50%;margin-left:-110upx;
						.Phone{
							.buttonRadius(@w:220upx,@h:80upx,@bg:rgba(0,0,0,.5));line-height:80upx;
						}
					}
				}
				
			}
		}
	}
</style>
