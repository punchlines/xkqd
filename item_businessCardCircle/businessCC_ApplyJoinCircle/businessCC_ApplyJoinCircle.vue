<template>
	<view class="container">
		<view class="reason">
			<textarea v-model="content" placeholder="请输入加入社群的理由！" maxlength="30" placeholder-class="tishi" class="readetail"/>
			<view class="number">
				<text>{{ content.length }}/</text>
				<text>30</text>
			</view>
		</view>
		<view class="btn" @click="send">确认</view>
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
			uni.showToast({
				title:'申请成功',
				duration:2000
			})
          uni.hideLoading();
		  uni.navigateBack({})
		  	
		  
          // uni.switchTab({ url: '/pages/businessCardCircle/businessCardCircle' })
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
		position:relative;width:92%;margin:0 auto; height:400upx;border: 1px #cccccc solid;border-radius: 10px;margin-bottom:80upx;
		.tishi{font-size: 28upx;color: #CCCCCC;}
		.readetail{font-size: 28upx;padding: 30upx;line-height: 40upx;}
		.number{position:absolute;font-size: 24upx;color: #999999;right: 32upx;bottom: 25upx;}
	}
	.btn{
		width: 92%;height: 98upx;line-height: 98upx; margin: 0 auto;border-radius: 44upx;
		background:#2EA1FF;color: #fff;text-align: center;font-size: 32upx;
	}
}
</style>
