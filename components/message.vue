<template>
	<view>
		<view :class="displayInputShow==='none'?'':'input-for-display'" :style="{bottom:displayInputBottom}">
			<input :value="text" :disabled="!isTimReady" :placeholder="isTimReady?'我想问主播...':'初始化中，请稍等'"
			 placeholder-style="color:#fff;font-size:12px" type="text" :class="displayInputShow==='none'?'message-input':'inner-input'"
			 confirm-type="send" @confirm="confirm" @input="textInput" :adjust-position="false"
			 @keyboardheightchange="bindkeyboardheightchange" @blur="bindblur" />
		</view>
	</view>
</template>

<script>
	export default {
		name:'message',
		props: {
			isTimReady: {
				type: Boolean,
				value: false
			}
			
		},
		data() {
			return {
				 text: '',
				 displayInputShow: 'none',
				 displayInputBottom: '0px',
				 
			};
		}, 
		onLoad() {
			
		},
		methods: {
            bindblur() {
                this.displayInputShow = 'none'
            },
            bindkeyboardheightchange(event) {
				console.log(event)
                this.displayInputShow = 'none'
                const {
                    height,
                    duration
                } = event.detail
                this.displayInputBottom = height + 'px'
                if (height > 0) {
                    setTimeout(()=>{
                        this.displayInputShow = 'block'
                    },duration*1000)
                }
            },
            textInput(data) {
				console.log(data)
                this.text = data.detail.value
            },
            confirm() {
                this.$emit('send-message', this.text)
                this.text = ''
            },
        },
	}
</script>

<style type="less">
	.message-input {
        height: 64rpx;
        width: 226rpx;
        border-radius: 40rpx;
        border-radius: 40rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;
        line-height: 64rpx;
        border: 0;
        outline: none;
        font-size: 12px;
        color: #fff;
    }
    .input-for-display {
        width: 100vw;
        height: 110rpx;
        position: fixed;
        left: 0;
        background: #EDEDED;
        z-index: 10000;
    }
    .inner-input {
        background: #FFFFFF;
        border-radius: 8rpx;
        border-radius: 8rpx;
        width: 700rpx;
        margin: 20rpx auto;
        height: 68rpx;
        line-height: 68rpx;
        padding: 0 20rpx;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #111111;
        letter-spacing: 0;
    }
</style>
