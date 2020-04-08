<template>
	<view class="container2">
		<view class="popup fs3a28" @tap="prevention" v-show="showBox">
			<!-- 分享 -->
			<view class="Plist" v-show="showShare">
				<view v-for="(item,index) in PolupList" :key="index" class="plistItem" @tap="getShare($event,index)">
					{{item.title}}
				</view>		
				<view class="Pcancle"  @tap="cancle">取消</view>
			</view>
			<!-- 举报 -->
			<view class="report fs3a28" v-show="showReport">
				<view class="ReportList fs3a28">
					<view class="Rcancle">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/tuichu.png'"></image>
					</view>
					<view class="RtypeInfort">
						<view class="RTtitle">举报这条动态</view>
						<view class="RTlistInfore fx-wrap fx-row fx-row-center fx-row-space-around">
							<view @tap="changeTitle(index,item.title)" :class="{'RTIttle':true,'RTtitleActive':index==Ractive}" v-for="(item,index) in ReportList" :key="index">{{item.title}}</view>
						</view>
					</view>
					<view class="Tbutton">举报</view>
				</view>
			</view>
			<!-- 删除日志弹窗 -->
			<view class="DeleteLog" v-show="showDeleteLog">
				<view class="DLlist">
					<view class="DLtitle">删除日志后将不能恢复，是否要继续删除？</view>
					<view class="DLbutton fx-row fx-row-center fx-row-space-around">
						<view class="DLagree">同意</view>
						<view class="DLreject">取消</view>
					</view>
				</view>
			</view>
			<!-- 生成动态分享图 -->
			<view class="ProductShareImg" v-show="showShareImage">
				<view class="PSIList">
					<view class="PSIcancle">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/tuichu.png'"></image>
					</view>
					<view class="Limage">
						<default-image src="userInfor.headImage" custom-class="Pimage"></default-image>
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
</template>

<script>
	export default{
		name:'shareView',
		props:{
			show:Boolean
		},
		data() {
			return {
				onlineSite:this.global.onlineSite,
				//分享弹出层
				PolupList:[
					{id:0,title:'分享到微信好友'},
					{id:1,title:'生成分享图'},
					{id:2,title:'不感兴趣'},
					{id:3,title:'举报'}
				],
				PLindex:0,
				showBox:true,//最层
				showShare:true,//分享弹出层
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
			cancle(){// 取消
				if(this.show){
					this.showBox=true;
					this.showShare=true;
				}else{
					this.showShare=false;
					this.showBox=false;
				}
			},
			getShare(e,index){
				this.PLindex=index;
				console.log(index);
 				//if(index==0){
			},
			//举报切换标题
			changeTitle(index,title){
				this.Ractive=index;
				// console.log(title);
			}
		},
		onLoad:function(){
			console.log(this.show);
			if(this.show){
// 				this.showShare=true;
// 				this.showBox=true;
			}
		}
	}
</script>

<style lang="less">

	@import '../../../css/mzl_base.less';
	.container2{	
		z-index:99999999;
		.popup{
			width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);text-align:center;
			// 分享
			.Plist{
				margin-bottom:10upx;
				width:100%;height: 500upx;position: absolute;background:rgba(0,0,0,.5);
				// top:0;
				bottom:-10upx;
				.plistItem,.Pcancle{
					width:100%;height:98upx;line-height:98upx;border-bottom:1upx solid #eee;background: #fff;
				}
				.plistItem:last-child{margin-bottom:10upx;}
				.Pcancle{
					// margin-top:15upx;
				}
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
						.Pimage{width:100%;}
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
