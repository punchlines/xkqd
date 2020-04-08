<template>
	<view class="uni-video-container">
		<!-- 播放中才把视频加载出来 controls -->
		<video id="myVideo" :src="video" @play="onPlay" @pause="onPause" @ended="onEnd" :poster="cover" :show-fullscreen-btn="false"></video>
		<!--&lt;!&ndash; 没有播放中的图片展示 &ndash;&gt;-->
		<!--<view @click="play" v-else>-->
		<!--<image class="video-cover" :src="cover" mode="aspectFit"></image>-->
		<!--<image class="play-icon" src="http://card-1254165941.cosgz.myqcloud.com/images/video_play.png"></image>-->
		<!--</view>-->
	</view>
</template>

<script>
	export default {
		name: "VideoContainer",

		data() {
			return {
				isPlaying: false,
				videoContext: '',
			}
		},
		props: {
			cover: String,
			video: String,
			mobileNetworkAutoplay: Number,
		},

		watch: {
			mobileNetworkAutoplay(newValue) {

				if (Number(this.mobileNetworkAutoplay) == 1) {

					this.play();
				}
			}
		},

		mounted() {
			this.videoContext = uni.createVideoContext('myVideo');
			if (Number(this.mobileNetworkAutoplay) == 1) {
				this.play();

			} else {
				// console.log('没放');
			}
		},

		onHide() {
			this.onEnd()
		},

		methods: {
			play() {
				console.log("play")
				if (this.videoContext.play)
					this.videoContext.play();
			},
			onPlay() {

			},
			onPause() {

			},
			onEnd() {
				this.isPlaying = false;
				console.log(this.videoContext)
				if (this.videoContext)
					this.videoContext.pause();
			},
		},

	}
</script>

<style scoped lang="less">
	.uni-video-container {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 99;

		video {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 100;
		}

		.video-cover {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 8;
			border-radius: 8upx;
			background-color: #000;
		}

		.play-icon {
			position: absolute;
			width: 90upx;
			height: 90upx;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 9;
		}

	}
</style>
