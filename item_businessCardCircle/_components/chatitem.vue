<template>
	<view class="container" :class="{'reserve':reserve}">
		<!-- <view class="time">{{ftime}}</view> -->
		<view class="time" v-if="item.createTime !=undefined">
			<!-- {{item.createTime}} -->
			{{timestamp2dates(item.createTime,2)}}
		</view>
		<template v-if="item.type==6&&item.data.type==1">
			<view class="" style="text-align: center;color: #999999; font-size: 14px; margin-bottom: 20rpx;"  v-if="item.data.inviteUserId==0"><text  @click="goDetail(item.data.invitedUserId)" style="color: #416F94;margin-right: 10rpx;">{{item.data.invitedUserName}}</text>进入了社群</view>
			<view class="" style="text-align: center;color: #999999; font-size: 14px;margin-bottom: 20rpx;" v-else>{{item.data.inviteUserName}}邀请了<text  @click="goDetail(item.data.invitedUserId)" style="color: #416F94;margin-left: 10rpx;margin-right: 10rpx;">{{item.data.invitedUserName}}</text> 进入了社群</view>
		</template>
		<template v-if="item.type==6&&item.data.type==2">
			<view class="" style="text-align: center;color: #999999; font-size: 14px;margin-bottom: 20rpx;" >{{item.data.message}}</view>
		</template>
		<view class="chatContainer fx-row fx-row-top" :class="{'fx-row':!reserve,'fx-row-reverse':reserve}" v-if="item.type!=6">
			<view @click="goDetail(item.userId)" style="display: flex; flex-direction: column;">
				<image class="avatar" :src="item.headImage" mode=""></image>
				<view class="qunzhu" v-if="item.isManager==1 &&userId!=item.userId">群主</view>
				<view class="qunzhu" v-if="item.isManager==2 &&userId!=item.userId">管理员</view>
			</view>
			<view class="" style="display: flex; flex-direction: column;">
				<view class="nick" :key="index" v-if="userId!=item.userId">{{item.userName}}</view>
				<view class="context" @longpress.stop="longpress" :class="item.type==2||item.type==4?'hide':''">
					<!-- 杀人啦！ -->
					<template v-if="item.type==0">
						<template v-for="(item,index) in item.data">
							<image v-if="item.type=='img'" :key="index" class="face" :src="'http://card-1254165941.cosgz.myqcloud.com/emoticon/emoicon/'+item.msg"
							 style="border-radius: 10px;"></image>
							<text class="text" v-else :key="index">{{item.msg}}</text>
						</template>
					</template>

					<template v-else-if="item.type==1">
						<!-- audio -->
						<view class="voiceBox fx-row fx-row-space-between" @click="play">
							<image class="playicon" v-if="!item.isPlaying" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice/%E6%92%AD%E6%94%BEicon.png"
							 mode=""></image>
							<image class="playicon" v-else src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice/%E6%9A%82%E5%81%9Cicon.png"
							 mode=""></image>
							{{item.duration}}"
						</view>
					</template>

					<template v-else-if="item.type==2">
						<!-- video -->
						<view class="videoBox" @click="playVideo">
							<!-- <image class="thumb" :src="item.data.thumb"></image> -->
							<image class="play" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice/%E6%92%AD%E6%94%BEicon.png"
							 mode=""></image>
							<view class="time">{{item.duration}}秒 </view>
						</view>
					</template>

					<template v-else-if="item.type==4">
						<image class="image" @click="priview" :src="item.data" mode="widthFix" style="border-radius: 10px;"></image>
					</template>


					<template v-else-if="item.type==5">
						<template>
							<view @click="goShop" style="width: 320rpx; height: 320rpx; padding: 10rpx; display: flex;flex-direction: column; font-size: 34rpx; ">
								<view class="" style="text-align: center;">
									我的店铺快来看看吧
								</view>
								<view class="" style="text-align: center;margin-top: 15rpx; margin-bottom: 15rpx;font-weight: 600;">
									<text class="text" :key="index">店名：{{item.data.shopName}}</text>
								</view>
								<view class="" style="display: flex;flex-wrap: wrap; align-content:space-between; margin-bottom: 10rpx; justify-content: space-between;">
									<image :key="index" class="face" :src="item" v-for="(item,index) in item.data.goodsCover" style="border-radius: 10px; border-radius: 10px;width: 100rpx;height: 100rpx;margin-bottom: 10rpx;"></image>
								</view>
							</view>
						</template>
					</template>
					<!-- <template v-else-if="item.type==6">
						<view class="text">不支持的消息类型</view>
					</template> -->
					<template v-else>
						<view class="text">不支持的消息类型</view>
					</template>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		formatTime,timestamp2date,times
	} from '../../js/mzl.js'
	export default {
		data() {
			return {
				ftime: ''
			};
		},
		mounted() {

		},

		props: {
			reserve: {
				type: Boolean,
				default: true
			},
			item: {
				type: Object,
				default: null
			},
			userId: {
				type: Number,
				default: 0
			}
		},
		methods: {
			goDetail(id) {
				console.log(id)
				//if (!this.item.own) {
					
					uni.navigateTo({
						url: "../../pages/businessCard2/businessCard2?cardUserId=" + id

					})
				//}
			},

			longpress(e) {
				this.$emit('longClick', e)
			},
			priview() {
				uni.previewImage({
					urls: [this.item.data],
					current: 0
				})
			},
			formatTimes(v) {
				console.log('123',formatTime(v))				
				return formatTime(v)
			},
			timess(v){
				return times(v)
			},
			timestamp2dates(v,a){
				console.log('djfjfjfj',timestamp2date(v,a))
				return timestamp2date(v,a)
			},
			goShop(){
				uni.navigateTo({
					url:'../../module/shop/home/home?shopIdOtherPeople=' + this.item.data.shopId + '&cardUserId=' + this.item.userId +
					'&shareId=' + this.item.userId,
				})
			},
			play() {
				this.$emit('play')
			},
			playVideo() {
				this.$emit('playVideo')
			}
		}

	}
</script>

<style lang="less" scoped>
	.container {
		padding: 18upx;

		box-sizing: border-box;

		.image {
			max-width: 200upx;
		}

		.chatContainer {
			box-sizing: border-box;

			.avatar {
				width: 76upx;
				height: 76upx;

				border-radius: 10rpx;
			}

			.context.hide {
				background-color: transparent;
				padding: 0px;
				border-radius: 10px;

				&::before {
					background-color: transparent;
				}
			}

			.context {
				margin-left: 30rpx;
				margin-top: 10rpx;
				padding: 20upx;
				box-sizing: border-box;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 38upx;
				background: white;
				position: relative;
				max-width: 460rpx;
				border-radius: 15upx;

				.face {
					width: 50upx;
					height: 50upx;
					display: inline-block;
					vertical-align: middle;
				}

				.text {
					vertical-align: middle;
				}

				&::before {
					background: white;
					content: "";
					width: 25upx;
					height: 25upx;
					position: absolute;
					top: 22upx;
					left: -13upx;
					transform: rotate(45deg)
				}

				.voiceBox {
					width: 200rpx;

					.playicon {
						width: 50rpx;
						height: 50rpx;
						display: inline-block;
						margin-right: 20rpx;
						vertical-align: middle;
					}
				}

				.videoBox {
					width: 300rpx;
					height: 200rpx;
					position: relative;
					background: black;

					.thumb {
						width: 100%;
						height: 100%;
					}

					.play {
						width: 80rpx;
						height: 80rpx;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translateX(-50%) translateY(-50%);
					}

					.time {
						position: absolute;
						color: white;
						font-size: 21rpx;
						bottom: 0;
						right: 8rpx;
					}
				}
			}


		}


		&.reserve {

			// .time{
			// 	margin-left: 490upx;
			// }


			.context {
				margin-right: 20rpx;
				background: #2EA1FF;
				color: white;
				margin-top: -2rpx;

				&::before {
					left: auto;
					right: -11upx;
					background: #2EA1FF;

				}
			}

			.content.hide {
				padding: 0px;
				background-color: transparent;
				border-radius: 10px;

				&::before {
					background-color: transparent;
				}
			}
		}

	}

	.nick {
		color: #807F7F;
		font-size: 11px;
		margin-left: 20rpx;

	}

	.qunzhu {
		font-size: 20rpx;
		text-align: center;
		color: #2EA1FF;
		padding-top: 5rpx;
	}

	.time {
		color: #999999;
		font-size: 22rpx;
		text-align: center;
		margin-bottom: 20rpx;
	}
</style>
