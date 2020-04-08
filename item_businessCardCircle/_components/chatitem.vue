<template>
	<view class="container" :class="{'reserve':reserve}" >
		<!-- <view class="time">{{ftime}}</view> -->
		<view class="chatContainer fx-row fx-row-top" :class="{'fx-row':!reserve,'fx-row-reverse':reserve}">
			<view @click="goDetail">
				<image class="avatar" :src="item.headImage" mode=""></image>
			</view>
			<view class="context" @longpress.stop="longpress">
				
				<!-- 杀人啦！ -->
				<template v-if="item.type==0">
					<template v-for="(item,index) in item.data">
						<image v-if="item.type=='img'" :key="index" class="face" :src="'http://card-1254165941.cosgz.myqcloud.com/emoticon/emoicon/'+item.msg" mode=""></image>
						<text class="text" v-else :key="index">{{item.msg}}</text>
					</template>
				</template>
				
				<template v-else-if="item.type==1">
					<!-- audio -->
					<view class="voiceBox fx-row fx-row-space-between" @click="play">
						<image class="playicon" v-if="!item.isPlaying" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice/%E6%92%AD%E6%94%BEicon.png" mode=""></image>
						<image class="playicon" v-else src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice/%E6%9A%82%E5%81%9Cicon.png" mode=""></image>
						{{item.duration}}"
					</view>
				</template>
				
				<template v-else-if="item.type==2">
					<!-- video -->
					<view class="videoBox" @click="playVideo">
						<!-- <image class="thumb" :src="item.data.thumb"></image> -->
						<image class="play" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice/%E6%92%AD%E6%94%BEicon.png" mode=""></image>
						<view class="time">{{item.duration}}秒 </view>
					</view>
				</template>
				
				<template v-else-if="item.type==4">
					<image class="image" @click="priview" :src="item.data" mode="widthFix"></image>
				</template>
			
				
				<template v-else>
					<view class="text">不支持的消息类型</view>
				</template>	
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ftime:''
			};
		},
		mounted(){
			
		},
		
		props: {
			reserve: {
				type: Boolean,
				default: true
			},
			item:{
				type:Object,
				default:null
			},
		},
		methods:{
			goDetail(){
				if(!this.item.own){
					uni.navigateTo({
						url:"../../pages/businessCard2/businessCard2?cardUserId="+this.item.userId
						
					})
				}
			},
			
			longpress(e){
				this.$emit('longClick',e)
			},
			priview(){
				uni.previewImage({
						urls:[this.item.data],
						current:0
				})
			},
			play(){
				this.$emit('play')
			},
			playVideo(){
				this.$emit('playVideo')
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.container{
		padding: 18upx;
	
		box-sizing: border-box;
		.image{
			max-width: 200upx;
		}
		
		.chatContainer{
			box-sizing: border-box;
			.avatar{
				width:76upx;
				height:76upx;
				
				border-radius:10rpx;
			}
			.context{
				margin-left: 30upx;
				padding: 20upx;
				box-sizing: border-box;
				font-size:28upx;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:38upx;
				background: white;
				position: relative;
				border-radius: 15upx;
				.face{
					width: 50upx;
					height: 50upx;
					display: inline-block;
					vertical-align: middle;
				}
				
				.text{
					vertical-align: middle;
				}
				
				&::before{
					background: white;
					content: "";
					width: 25upx;
					height: 25upx;
					position: absolute;
					top: 22upx;
					left:-13upx;
					transform: rotate(45deg)
				}
				.voiceBox{
					width:200rpx;
					.playicon{
						width: 50rpx;
						height: 50rpx;
						display: inline-block;
						margin-right: 20rpx;
						vertical-align: middle;
					}
				}

				.videoBox{
					width: 300rpx;
					height: 200rpx;
					position: relative;
					background:black;
					.thumb{
						width: 100%;
						height: 100%;
					}
						
					.play{
						width: 80rpx;
						height: 80rpx;
						position: absolute;
						left: 50%;
						top:50%;
						transform: translateX(-50%) translateY(-50%);
					}
					.time{
						position: absolute;
						color: white;
						font-size: 21rpx;
						bottom:0;
						right: 8rpx;
					}
				}


			}
		}
	
	
		&.reserve{
			// .time{
			// 	margin-left: 490upx;
			// }
			.context{
				margin-left: 0;
				margin-right: 30upx;
				background:rgba(107,121,245,1);
				color: white;
				&::before{
					left: auto;
					right:-13upx;
					background:rgba(107,121,245,1);
				
				}
			}
		}
		
	}
	
</style>
