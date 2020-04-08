<template>
	<view class="container">
		<view class="introduceInfo">
			<textarea  @click="focusArea" :focus="focus" @blur="blurArea" placeholder="请输入圈介绍..." maxlength="500" v-model="introduce"></textarea>
			<view class="wordNumber">
				<text>{{ introduce.length }}</text>
				<text>/</text>
				<text>500</text>
			</view>
		</view>
		<view class="button" @click="confirm">
			<text class="text">确定</text>
		</view>
	</view>
</template>

<script>
  export default {

    data() {
      return {
        introduce: '',
						focus:true
      };
    },

    computed: {
      cardCirclePublish () {
        return this.$store.state.cardCirclePublish;
      },
    },

	onLoad () {
      this.introduce = this.cardCirclePublish.introduce;
	},

	methods: {
				blurArea(){
			console.log(this.focus)
			this.focus = false;
			this.$forceUpdate();
		},
		
		focusArea(){
			console.log(this.focus)
			this.focus = true;
			this.$forceUpdate();
		},
		
      confirm () {
        this.cardCirclePublish.introduce = this.introduce;
        uni.navigateBack();
	  },
	},

  };
</script>

<style lang="less">
	@import "../../css/jss_base.less";
.container{
  width: 100%;
  .introduceInfo{
    position: relative;
    width: 92%;
    height: 400upx;
    margin: 30upx auto;
    background: #f8f8f8;
    textarea{
      padding:30upx 0 0 30upx;
      font-weight: 400;
      color: #333333;
      font-size: @fsSubTitle;
      font-family: PingFangSC;
    }

    .wordNumber{
      position: absolute;
      right: 31upx;
      bottom: 25upx;
      color: #999999;
      font-size: @fsNum;
    }
  }
  .button{
    .buttonRadius();
    margin: 81upx auto;
    line-height: 88upx;
    text-align: center;
    .text{
      color: #ffffff;
      font-size: @fsContentTitle;
      font-weight: 400;
      font-family: PingFangSC-Regular;
    }
  }
}
</style>
