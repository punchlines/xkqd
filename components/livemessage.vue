<template name="livemessage">
	<view>
		<view v-if="item.message" >
			<view class="msg-item" v-if="item.type!==2" :id="'text'+index">
				<!-- 头像 -->
				<!-- <image src="../static/chat/shoucang@2x.png" class="lv" /> -->
				<!-- 名字 -->
				<text class="name">{{item.name}}：</text>
				<!-- msg -->
				<text class="text">{{item.message}}</text>
			</view>
			<view class="msg-item" v-else :id="'text'+index">
				<!-- 名字 -->
				<text class="name notice">{{item.name}}：</text>
				<!-- msg -->
				<text class="text">{{item.message}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'livemessage',
		props: {
		    item: {
				type:Object,
				value:{}
				},
				index: {
					type:Number,
					value:0
					}
		},
		data() {
			return {
				 
			};
		}
	}
</script>

<style type="less">
	.msg-item {
        background: rgba(0, 0, 0, 0.25);
        border-radius: 40rpx;
        border-radius: 40rpx;
        display: inline-block;
        padding: 14rpx 20rpx;
        max-width: 80vw;
        color: #fff;
        font-size: 12px;
        margin-bottom: 16rpx;
    }
    .lv {
        height: 30rpx;
        width: 50rpx;
        vertical-align: middle
    }
    .name {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9FE5FF;
        letter-spacing: 0;
        vertical-align: middle;
    }
    .text {
        line-height: 14px;
        word-wrap:break-word
    }
</style>
