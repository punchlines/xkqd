<template>
	<view class="container">
		<view class="reason">
			<textarea v-model="content" placeholder="为什么想要加入这个圈子..." maxlength="30" placeholder-class="tishi" class="readetail"/>
			<view class="number">
				<text>{{ content.length }}/</text>
				<text>30</text>
			</view>
		</view>
		<view class="btn" @click="send">发送</view>
	</view>
</template>

<script>
  export default {
    data() {
      return {
        cardCircleId: '',
        recommendId: '',
        content: '',
      };
    },

	onLoad (option) {
      this.cardCircleId = option.id;
      this.recommendId = option.recommendId || '';
	},

    methods: {
      send () {
        if (!this.content) {
          return this.showError('请输入内容');
		}
		uni.showLoading();
        this.$api.setJoinCircleApply(this.cardCircleId, this.content, this.recommendId).then(result => {
          uni.hideLoading();
          uni.switchTab({ url: '/pages/businessCardCircle/businessCardCircle' })
		}).catch(error => {
          uni.hideLoading();
		  this.showError(error)
		})
      },
    },

  }
</script>

<style lang="less">

.container{
	font-family: PingFangSC;box-sizing:border-box;padding-top:30upx;
	.reason{
		position:relative;width:92%;margin:0 auto; height:400upx;background:#F8F8F8;margin-bottom:80upx;
		.tishi{font-size: 28upx;color: #CCCCCC;}
		.readetail{font-size: 28upx;color: #333333;padding: 30upx;line-height: 40upx;}
		.number{position:absolute;font-size: 24upx;color: #999999;right: 32upx;bottom: 25upx;}
	}
	.btn{
		width: 92%;height: 88upx;line-height: 88upx; margin: 0 auto;border-radius: 44upx;
		background:#6B7AF8;color: #fff;text-align: center;font-size: 32upx;
	}
}
</style>
