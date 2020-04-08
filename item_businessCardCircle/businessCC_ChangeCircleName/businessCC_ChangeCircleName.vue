<template>
	<view class="container">
		<view class="name">
		  <input type="text" v-model="name"  class="input" maxlength="10" />
		  <image @click="name = ''" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/del.png'" class="del"></image>
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
        onlineSite:this.global.onlineSite,
		name: '',
		type:0
      };
    },

	onLoad (options) {
		this.type=options.type;
      this.name = options.type==1?this.cardCirclePublish.subheading:this.cardCirclePublish.circleName
	},

    computed: {
      cardCirclePublish () {
        return this.$store.state.cardCirclePublish;
      },
    },

	methods: {
      confirm () {
        if (!this.name) {
          this.showTips('请输入圈子名称')
          return;
		}
		if(this.type==0)
			this.cardCirclePublish.circleName = this.name;
		else this.cardCirclePublish.subheading = this.name;
        uni.navigateBack();
	  }
	},

  };
</script>

<style lang="less">
@import "../../css/jss_base.less";
page{
  background: #f5f5f5;
}
.container{
  width: 100%;
  .name{
    height: 106upx;
    margin-top: 41upx;
    background: #ffffff;
    color: #666666;
	  display: flex;

	  .input{
		flex: 1;
		color: #666666;
		font-size: 28upx;
		font-family: PingFangSC;
		font-weight: 400;
	}
    .flex(@justCon:space-between;@alignIt:center;);
    input{
      margin-left: 30upx;
    }
    .del{
      width: 30upx;
      height: 30upx;
      margin-right: 30upx;
    }
  }
  .button{
    .buttonRadius();
    margin: 100upx auto;
    line-height: 88upx;
    text-align: center;
    .text{
      font-family: PingFangSC;
      color: #ffffff;
      font-weight: 400;
    }
  }
}
</style>
