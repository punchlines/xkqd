<template>
	<view class="container">
		<view class="mainTitle">
			<text>请选择圈类型</text>
		</view>
		<view class="subTitle" v-for="type in circleTypeList" :key="type.id" @click="selectType(type)" :class="{ selected: currentType.id === type.id }">
			<text>{{ type.name }}</text>
		</view>

		<view class="button" @click="confirm">
			<text>确定</text>
		</view>
	</view>
</template>

<script>
  export default {

    data() {
      return {
        circleTypeList: [],
        currentType: {},
      };
    },

    computed: {
      cardCirclePublish () {
        return this.$store.state.cardCirclePublish;
      },
    },

	onLoad () {
      this.currentType = this.cardCirclePublish._circleType || {};
      uni.showLoading();
      this.$api.listCircleType().then(result => {
        this.circleTypeList = result.circleTypeList;
        uni.hideLoading();
	  }).catch(error => {
	    uni.hideLoading();
	  })
	},

	methods: {
      selectType (type) {
        this.currentType = type;
	  },
      confirm () {
        this.cardCirclePublish._circleType = this.currentType;
        uni.navigateBack();
	  },
	},

  };
</script>

<style lang="less">
@import "../../css/jss_base.less";
.container{
  width: 92%;
  margin: 0 auto;
  background: #ffffff;
  .mainTitle{
    font-size: @fsContentTitle;
    color: @title;
    height: 104upx;
    line-height: 104upx;
    font-weight: 500;
    font-family: PingFangSC-Medium;
  }
  .subTitle{
    height: 106upx;
    line-height: 106upx;
    border-bottom: 1px solid #eeeeee;
    font-size: @fsSubTitle;
    color: @title;
    font-family: PingFangSC-Regular;
    font-weight: 400;
  }
  .selected{
    .flex(@justCon:space-between;@alignIt:center;);
    color: @tabActive;
	  position: relative;
	  &:after {
		  content: "";
		  width: 28upx;
		  height: 22upx;
		  position: absolute;
		  top: 50%;
		  right: 0;
		  transform: translateY(-50%);
		  background-image: url("http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png");
		  background-size: 100% 100%;
	  }
    .selImg{
      width: 28upx;
      height: 22upx;
    }
  }
  .button{
    .buttonRadius();
    margin: 100upx auto;
    line-height: 88upx;
    text-align: center;
    color: #ffffff;
  }
}
</style>
