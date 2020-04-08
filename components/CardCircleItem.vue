<template>
  <view class="c_container" @click="toCircleDetail">
    <wx-view>
			<view class="avaContainer">
							<circle-avatar :avatar="datas.headImage" :images="datas.headImages"></circle-avatar>
			</view>
      <!--<image :src="datas.urlH" class="ava"></image>-->
    </wx-view>
    <view class="content">
      <view class="title single-line" v-if="highlight">
        <text v-for="text in highlightTitleTextList" :class="{ highlight: text.highlight }">{{ text.text }}</text>
      </view>
			
      <view class="title single-line" v-else>{{ datas.name }}</view>
      <view class="detail single-line">{{ datas.circleIntroduce }}</view>
    </view>
    <view class="numberContainer">
      <view class="sign">
        <image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chengyuan.png" class="chengyuan"></image>
        <text class="number">{{ datas.memberNum }}</text>
      </view>
      <view class="sign">
        <image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/huati.png" class="huati"></image>
        <text class="number">{{ datas.topicNum }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import CircleAvatar from "./CircleAvatar";
  export default {
    name: "CardCircleItem",
    components: {CircleAvatar},
    props: {
      datas: Object,
      addFlag: Boolean,
      highlight: String,
		  
	  canClick:{
		  type:Boolean,
		  default:true
	  }
    },

    computed: {
      highlightTitleTextList () {
        if (this.highlight) {
          const key = this.highlight;
          if (this.datas.name.indexOf(key) === -1) return [{ highlight: false, text: this.datas.name }]
          if (key === this.datas.name) return [{ highlight: true, text: key }]

          return this.datas.name
              .split(key)
              .filter((item,index) => index || item)
              .reduce((pv, cv) => (pv.push({ highlight: true, text: key }), pv.push({ text: cv }), pv), [])
              .filter(item => item)

        }
        return []
      }
    },

    methods: {
      toCircleDetail () {
		if(!this.canClick){
			return this.$emit("oclick")
		}
		  
        if (this.addFlag) {
          this.navigateTo('/item_businessCardCircle/businessCC_InviteJoin/businessCC_InviteJoin', { id: this.datas.id })
        } else {
          this.navigateTo('/item_businessCardCircle/businessCC_Detail/businessCC_Detail', { id: this.datas.id })
        }

      },
    },

  }
</script>

<style scoped lang="less">

  // 模板样式
  .c_container {
    margin-bottom: 24upx;
    overflow: hidden;
    background: #ffffff;
    display: flex;
    & > view {
      float: left;
    }
    .avaContainer {
      width: 140upx;
      height: 140upx;
      margin: 10upx 0 10upx 10upx;
      & > image {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      width: calc(100% - 140upx - 150upx - 80upx);
      padding: 21upx 28upx 14upx 34upx;
      flex: 1;
      .title {
        margin-bottom: 30upx;
        color: #333333;
        font-size: 32upx;
        font-family: PingFangSC-Medium;
        letter-spacing: 1px;
        font-weight: 500;
      }
      .detail {
        width: 100%;
        font-size: 28upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        letter-spacing: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #9B9B9B;
      }
    }
    .numberContainer {
      width: 150upx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .chengyuan {
        width: 37upx;
        height: 27upx;
      }
      .huati {
        width: 32upx;
        height: 32upx;
      }
      .sign {
        display: flex;
        align-items: center;
      }
      .sign:first-child {
        margin-bottom: 44upx;
      }
      .number {
        font-size: 24upx;
        color: #333333;
        margin-left: 18upx;
      }
    }
  }

  .highlight {
    color: #6B7AF8;
  }

</style>