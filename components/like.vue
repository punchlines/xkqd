<template>
	<view>
		<view class="like-wraper">
			<view class="" style="color: #007AFF; font-size: 18px; position: absolute; top: 300rpx;">{{likeNumber}}</view>
			<view class="animation" @click="like"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'like',
		props:{
			likeNumber:{
				type:Number,
				value:0
			}
		},
		data() {
			return {
				 animation: false,
				 aniUrl: ''
			};
		},
		 methods: {
		            like() {
		                if (!this.animation) {
		                    this.aniUrl = '/static/images/gift-ani.gif'
		                    this.animation = true
		                    const timmer = setTimeout(() => {
		                        clearTimeout(timmer)
		                        this.aniUrl = ''
		                        this.animation = false
		                    }, 760)
		                    this.$emit('like')
		                } else {}
		            }
		        },
	}
</script>

<style type="less">
	.like {
        width: 64rpx;
        height: 64rpx;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .ani-like {
        width: 130rpx;
        height: 280rpx;
        position: absolute;
        bottom: -21rpx;
        left: -33rpx;
    }
    .like-wraper {
        width: 64rpx;
        height: 64rpx;
        display: inline-block;
        vertical-align: middle;
        position: relative;
    }
    .gka-wrap {
        width: 130rpx;
        height: 280rpx;
    }
    .animation {
        width: 130rpx;
        height: 280rpx;
        background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf0-e797afd02f87699f25d19783ae57cf0223d086af.png");
        background-size: 130rpx 280rpx;
        background-repeat: no-repeat;
        animation-duration: 0.76s;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
        animation-timing-function: steps(1);
        position: absolute;
        bottom: -21rpx;
        left: -33rpx;

    }
    .animation.start{
        animation-name: keyframes-like;
    }
    @keyframes keyframes-like {
        0% {
            width: 130rpx;
            height: 280rpx;
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf0-e797afd02f87699f25d19783ae57cf0223d086af.png");
            background-size: 130rpx 280rpx;
        }
        5.26% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf1-09a111164700987acf8ea6072e22a6d534fad304.png");
        }
        10.53% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf2-f2ef016e350f830915b25960ff8d0414ad2cc865.png");
        }
        15.79% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf4-ad54397b732bb30e8b2a9fcdaa9ce7681f31a2b7.png");
        }
        21.05% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf4-ad54397b732bb30e8b2a9fcdaa9ce7681f31a2b7.png");
        }
        26.32% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf5-742cd350b14a2e813f26eb6d8e0e6a2b7f0f7495.png");
        }
        31.58% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf6-55fe138217c7daeefe2886d3230458c9854dee32.png");
        }
        36.84% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf7-f610909dd0a47f420bf43672ba7e71c40ab7ca1b.png");
        }
        42.11% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf8-c8e2b501456ce61ddd23f3042d9cdacf4ce35d99.png");
        }
        47.37% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf9-4781d568d9edb682a71e5847401e2702c2a0d347.png");
        }
        52.63% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf10-3521679fdde136e5726aa8d681b25189347a6a3f.png");
        }
        57.89% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf11-3ee9c05cf585261a3f19ba6146b4f406d525f852.png");
        }
        63.16% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf12-129cf91dc532eb3eac55e66114094361e89400e6.png");
        }
        68.42% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf13-1fa7ebc06b177d5626fbbf23022c4eb0272f2050.png");
        }
        73.68% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf14-fa72d68535cbef624e121f3a6f6dd6ccb5f53267.png");
        }
        78.95% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf15-5c79af40e583b983152cb2cbe7c40a5f695d3983.png");
        }
        84.21% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf16-ff6d0b1776362d1d4178e6068f0bdfe875bc08e6.png");
        }
        89.47% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf17-acea8422f00f098361c92cb4338b1114d1144a07.png");
        }
        94.74%,
        100% {
            background-image: url("https://upload-dianshi-1255598498.file.myqcloud.com/gf18-e797afd02f87699f25d19783ae57cf0223d086af.png");
        }
    }
</style>
