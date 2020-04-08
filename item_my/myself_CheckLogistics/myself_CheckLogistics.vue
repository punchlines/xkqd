<template>

  <view class="container">
    <view class="LogInfor">
      <!-- 物流信息 -->
      <view class="logCompany fx-row fx-row-center fx-row-space-around fs3a28 borderB">
        <view class="LCname">物流公司</view>
        <view class="LCinput">
          <input type="text" placeholder="请输入物流公司">
        </view>
      </view>
      <!-- 物流单号 -->
      <view class="logCompany fx-row fx-row-center fx-row-space-around fs3a28">
        <view class="LCname">物流单号</view>
        <view class="LCinput">
          <input type="text" placeholder="请输入物流单号">
        </view>
      </view>
    </view>
    <!-- 按钮 -->
    <view class="LogButton">
      <view class="logBtn fs3a32" @click="goBack">确定</view>
    </view>
  </view>

</template>

<script>

  export default {
    data () {
      return {
      
      }

    },
    methods:{
      goBack(){
		  uni.navigateBack({
		  	delta: 1
		  });
	  }
    }

  }

</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';

  .container{
    background:@grayBg;width:100%;border-top:1upx solid #eee;height:100%;position:fixed;
    .LogInfor{
      margin-top:30upx;background:#fff;
      .logCompany{
        padding:30upx;
        .LCname{
          width:30%;
        }
        .LCinput{
          width:70%;
        }
      }
    }
    // 按钮
    .LogButton{
      margin-top:100upx;
      .logBtn{
        .buttonRadius();color:#fff;margin:0 auto;
      }   
    }
    
}


</style>