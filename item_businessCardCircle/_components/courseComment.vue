<template>
	<view class="container1" >
	  <view class="commentBox">
	    <view class="CBimage">
	      <image :src="item.userFace" @click="goDetail(item.userId)"></image>
	    </view>
	    <view class="commnentList">
	      <view class="CLcon">
	        <view class="CLtitle">{{item.userName}}</view>
	        <view class="CLBfloor"> </view>
	      </view>
	      <view class="CLsubTitle">
			  	回复 <text style="color: #00BFFF;" @click="goDetail(item.callUserId)" v-if="item.callUserId">@{{item.callUserName}}:</text>
			{{item.content}}
		  </view>
	      <view class="cLbottom">
	       <!-- v-if="currentUser.id==item.userId" -->
	        <view class="CLBmessage" >
				 <view class="CLBdel"  @click="deleteComment" v-if="currentUser.id==item.userId">
					<image style="width: 21upx; height: 25upx" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/undel.png'"></image>
					<text class="txt">删除</text>
				</view>
				 <view class="CLBmess" @click="reply" v-if="currentUser.id!=item.userId">
					<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'" mode="widthFix" lazy-load="false" binderror="" bindload=""></image>
					<text class="CLBMessNum">回复</text>
				</view>
	        </view>
	    
			<view class="CLBtime">
			  <view class="CLBnowTime">{{formatTimes(item.createTime)}}</view>
			</view>
		  </view>
	    </view>
	  </view>
	
	</view>
</template>

<script>
	import {formatTime} from '@/js/mzl.js'
	export default{
		data(){
			return {
				
			}
		},
		props:{
			item:{
				type:Object
			}
			
		},
		methods:{
			goDetail(id){
				if(id!=this.currentUser.id)
					this.navigateTo('../businessCard2/businessCard2', {
						cardUserId: id
					})
			},
			deleteComment(){
				this.$emit("deleteComment")
			},
			reply(){
				this.$emit("reply")
			},
			formatTimes(v){
				return formatTime(v)
			}
		}
	}
</script>

<style lang="less">
	@import "../../css/jss_base.less";
	@import '../../css/mzl_base.less';
	.container1{
	  border-bottom:1px solid #EEEEEE;
	  .commentBox{
	    display: flex;
	    .flex(@alignIt:top;);padding:30upx;box-sizing: border-box;
	    padding-top: 45upx;
	    .CBimage{
	      width:60upx;
	      margin-right: 23upx;
	      image{width:60upx;
	        height:60upx;;vertical-align: top;}
	    }
	    .commnentList{
	      flex: 1;
	      image{width:28upx;height:28upx}
	      .CLcon{
	        .flex(space-between);
	        .CLtitle{color:#666;font-size:@fsNum;}
	        .CLBfloor{font-size: 24upx;color: #999999;}
	      }
	
	      .CLsubTitle{padding:15upx 0;color:@title;font-size:@fsSubTitle;line-height: 40upx; margin-bottom: 15upx}
	      .cLbottom{
	        .flex(space-between);
	        color:#999;font-size:@fsNum;
	        .CLBtime{
	          .flex(flex-end);width:40%;
			  font-size: 23rpx;white-space: nowrap;
	        }
	        .CLBmessage{
	          display: flex;
	          .flex(flex-between);width:60%;
	          justify-content: flex-start;
	          > view {
	            display: flex;
	            align-items: center;
	            justify-content: flex-start;
	            width:33.33%;
	            image {
	              margin-right: 8upx;
	            }
	          }
	          .CLBdel{
	            &>image{width: 22upx;height: 28upx;margin-right: 10upx;}
	            .txt{font-size: 24rpx;color: #999999;}
	          }
	          .CLBMessNum{margin-left: 9upx;}
	          
	          .CLBzan{text-align: right;}
	        }
	      }
	    }
	  }
	}
	
	
</style>






