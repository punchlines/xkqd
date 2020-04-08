<template>
	<view class="container1">
		<view class="commentBox" v-for="(item,index) in commentList" :key="index">
			<view class="CBimage">
				<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/yaoqing.png'" mode="widthFix"></image>
			</view>
			<view class="commnentList">
				<view class="CLtitle fs6a24 fx-row fx-row-center fx-row-space-around">
					<view class="CLname">木子李</view>
					<view class="CLBfloor">{{index+1}}楼</view>
				</view>
				<view class="CLsubTitle">所以以后不要再说买毛线了，因为你连毛线都买不</view>
				<view class="cLbottom">
					<view class="CLBtime">
						<view class="CLBnowTime">1分钟前</view>
					</view>
					<view class="CLBmessage">
						<view class="CLBmess">
							<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'" mode="widthFix" ></image>
							<text class="CLBMessNum"> 520</text>
						</view>
						<view class="CLBzan">
							<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'" mode="widthFix" ></image>
							<text class="ClBzanNum"> 520</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="CommentInfor fx-row fx-row-center fx-row-right">
			<view class="CIcontent">
				<view class="CIcallBack">
					<text class="CBmy">木子李</text> 回复
					<text class="CByou">目小温</text>：真棒
				</view>
				<view class="CIcallBack">
					<text class="CBmy">目小温</text>：所以以后不要再说买毛线了，因为你连毛线都买不
				</view>
				<view class="CIcallBack">
					<text class="CBmy">low哈</text>：所以以后不要再说买毛线了，因为你连毛线都买不
				</view>
				<view class="CIhideCallBack">共10条回复 》</view>
			</view>
		</view>
		<view class="CpublishCom">
			<view class="CPlist fx-row fx-row-center fx-row-space-around">
				<view class="CPinput">
					<input type="text" placeholder="说点什么" focus="true">
				</view>
				<view class="PCsend">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentList:[
					{id:0},
					{id:1},
					{id:2}
				],
			};
		}
	}
</script>

<style lang="less">

	@import '../../css/mzl_base.less';
	.container1{
		border-top:1upx solid @grayBg;margin-bottom:100upx;
		.commentBox{
			.flex(@alignIt:top;);box-sizing: border-box;margin-top:30upx;padding:20upx;
			.CBimage{
				width:12%;
				image{width:100%;vertical-align: top;}
			}
			.commnentList{
				width:80%;border-bottom:1upx solid @grayBg;padding-bottom:20upx;
				image{width:28upx;height:28upx}
				.CLtitle{
					.CLname{width:50%;text-align:left;}
					.CLBfloor{width:50%;text-align:right;}
				}
				.CLsubTitle{padding:15upx 0;font-weight:600;line-height:50upx;color:@title;font-size:@fsSubTitle;}
				.cLbottom{
					.flex(space-between);
					color:#999;font-size:@fsNum;
					.CLBtime{
						.flex(flex-start);width:40%;
						.CLBfloor{margin-right:30upx;}
					}
					.CLBmessage{
						.flex(flex-between);width:40%;
						 view{width:50%;}
						 .CLBzan{text-align: right;}
					}
				}
			}
		}
		.CommentInfor{
			padding:20upx;color:@fsC6;
			.CIcontent{
				font-size: 28upx;width:83%;background:#F8F8F8;padding:20upx;
				.CIcallBack{
					line-height:40upx;margin-bottom:10upx;
					.CBmy,.CByou{color:#4E7CB1;}
				}
				.CIhideCallBack{color:#4E7CB1;margin-top:20upx;}
			}
		}
		.CpublishCom{
			width:100%;height:93upx;position: fixed;border-top:1upx solid #E1E1E1;bottom: 0;padding:10upx;background: #fff;
			.CPlist{
				input{
					width:610upx;height:70upx;border-radius:35upx;font-size: 28upx;
					padding-left:20upx;background:#E1E1E1;
				}
			}
			.PCsend{color:#6B7AF8;font-size:30upx;display: inline-block;}
		}
	}
</style>
