<template>
	<view>
		<view class="no-owner">
		        <view class="avatar-wraper">
		            <image :src="ownerInfo.avatar" class="avatar" />
		        </view>
		        <view class="tips nick">
		            {{ ownerInfo.nick }}
		        </view>
		        <view class="tips other">
		            主播不在线，再逛逛吧
		        </view>
		    </view>
	</view>
</template>

<script>
	export default {
		name:'noowner',
		props:{
			ownerInfo: {
				type:Object,
				value:''
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style type="less">
    .no-owner {
        height: 100vh;
        width: 100vw;
        /* background-color: #494949; */
    }
    .avatar {
        width: 166rpx;
        height: 166rpx;
        border-radius: 50%;
        overflow: hidden;
    }
    .avatar-wraper {
        padding-top: 280rpx;
        text-align: center
    }
    .tips {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        /* color: #FFFFFF; */
        letter-spacing: 0;
        text-align: center;
    }
    .nick{
        padding-top: 30rpx;
        line-height: 37rpx;
    }
    .other{
        margin-top: 20rpx;
    }
</style>
