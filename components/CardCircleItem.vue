<template>
	<view class="c_container" @click="toCircleDetail">
		<wx-view>
			<view class="avaContainer">
				<circle-avatar  :images="datas.headImages" :width="width"></circle-avatar>
			</view>
			<!--<image :src="datas.urlH" class="ava"></image>-->
		</wx-view>
		<view class="bottom_border" :style="list-1!=index  ?'border-bottom: 1px solid #F0F0F0;':'border-bottom:none;'" >
		<view class="content">
			<view class="title single-line" v-if="highlight">
				<text v-for="(text,index) in highlightTitleTextList" :key="index" :class="{ highlight: text.highlight }">{{ text.text }}</text>
			</view>

			<view class="title single-line" v-else>{{ datas.title}}</view>
			<!-- 消息 -->
			<view class="detail single-line" v-if="datas.userName !=''&&datas.type==0">{{datas.userName}}:{{ datas.message }}</view>
			<view class="detail single-line"  v-else-if="datas.userName ==''&&datas.type==0 ">{{ datas.message }}</view>
			<!-- 语音 -->
			<view class="detail single-line" v-if="datas.userName !=''&&datas.type==1">{{datas.userName}}:[语音]</view>
			<view class="detail single-line"  v-else-if="datas.userName ==''&&datas.type==1 ">[语音]</view>
			<!-- 视频 -->
			<view class="detail single-line" v-if="datas.userName !=''&&datas.type==2">{{datas.userName}}:[视频]</view>
			<view class="detail single-line"  v-else-if="datas.userName ==''&&datas.type==2 ">[视频]</view>
			<!-- 定位 -->
			<view class="detail single-line" v-if="datas.userName !=''&&datas.type==3">{{datas.userName}}:[定位]</view>
			<view class="detail single-line"  v-else-if="datas.userName ==''&&datas.type==3 ">[定位]</view>
			<!-- 图片 -->
			<view class="detail single-line" v-if="datas.userName !=''&&datas.type==4">{{datas.userName}}:[图片]</view>
			<view class="detail single-line"  v-else-if="datas.userName ==''&&datas.type==4 ">[图片]</view>
		</view>
		<view class="numberContainer">
			<view class="sign">
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.z3t2igSQmsjjd9146c328a9291344bb3a3565969b244.png"
				 class="chengyuan"></image>
				<text class="number">{{ datas.memberNum }}</text>
			</view>
			<view class="sign">
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.hd1ORRhBwEHX50e401b5b34340cad84e84ce2fd1d74a.png"
				 class="huati"></image>
				<text class="number">{{ datas.demandNum }}</text>
			</view>
			<view class="sign">
				<text class="numberspan">{{datas.messageTime}}</text>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import CircleAvatar from "./CircleAvatar";
	export default {
		name: "CardCircleItem",
		components: {
			CircleAvatar
		},
		props: {
			datas: Object,
			addFlag: Boolean,
			highlight: String,
			index:{
				type:Number,
				default:0
			},
			canClick: {
				type: Boolean,
				default: true
			},
			list:{
				type:Number,
				default:0
			},
			width: {
				type: Boolean,
				default: false
			},
			select:{
				type:Boolean,
				default:false
			}
		},
		
		computed: {
			highlightTitleTextList() {
				if (this.highlight) {
					const key = this.highlight;
					if (this.datas.title.indexOf(key) === -1) return [{
						highlight: false,
						text: this.datas.title
					}]
					if (key === this.datas.title) return [{
						highlight: true,
						text: key
					}]

					return this.datas.title
						.split(key)
						.filter((item, index) => index || item)
						.reduce((pv, cv) => (pv.push({
							highlight: true,
							text: key
						}), pv.push({
							text: cv
						}), pv), [])
						.filter(item => item)

				}
				return []
			}
		},

		methods: {
			toCircleDetail() {
				if (!this.canClick) {
					return this.$emit("oclick")
				}

				if (this.addFlag) {
					this.navigateTo('/item_businessCardCircle/businessCC_InviteJoin/businessCC_InviteJoin', {
						id: this.datas.id
					})
				} else {
					this.navigateTo('/item_businessCardCircle/businessCC_Detail/businessCC_Detail', {
						id: this.datas.id
					})
				}

			},
		},

	}
</script>

<style scoped lang="less">
	// 模板样式
	.c_container {
		padding-bottom: 16rpx;
		padding-left: 32rpx;
		padding-top: 24rpx;
		overflow: hidden;
		background: #ffffff;
		display: flex;
		// margin-bottom: 15rpx;
		&>view {
			float: left;
		}

		.avaContainer {
			width: 135upx;
			height: 155upx;
			// margin: 10upx 0 10upx 10upx;

			&>image {
				width: 100%;
				height: 100%;
			}
		}
		.bottom_border{
			border-bottom: 1px solid #F0F0F0;
			display: flex;
			width: 100%;
			flex-direction: row;
		}
		.content {
			width: calc(100% - 140upx - 150upx - 80upx);
			// padding: 21upx 28upx 14upx 34upx;
			flex: 1;
			margin-left: 10rpx;
			max-width: 440rpx;
			.title {
				margin-bottom: 30upx;
				color: #333333;
				font-size: 32upx;
				font-family: PingFangSC-Medium;
				letter-spacing: 1px;
				font-weight: 500;
			}

			.detail {
				width: 100%;
				font-size: 28upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				letter-spacing: 1px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #9B9B9B;
			}
		}

		.numberContainer {
			// width: 150upx;
			display: flex;
			// justify-content: center;
			//align-items: center;
			flex-direction: column;

			.chengyuan {
				width: 28rpx;
				height: 28upx;
			}

			.huati {
				width: 28rpx;
				height: 28upx;
			}

			.sign {
				display: flex;
				// align-items: center;
				flex-direction: row;
				
			}

			.sign:first-child {
				margin-bottom: 12rpx;
				margin-left: 22rpx;
			}

			.sign:nth-child(2) {
				margin-bottom: 4rpx;
				margin-left: 22rpx;
			}

			.number {
				font-size: 22rpx;
				color:rgba(51,51,51,1);
				font-family:PingFangSC-Regular,PingFang SC;
				margin-left: 10upx;
			}

			.numberspan {
				margin-left: 22rpx;
				font-size:20rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(128,127,127,1);
				line-height:28px;
			}
		}
	}

	.highlight {
		color: #2EA1FF;
	}
</style>
