<template>

  <view class="container">
    <view class="Content">
      <!-- 店铺列表 -->
      <view class="storeListBox">
        <view class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in list" :key="index">
          <view class="Limage">
						<default-image src="headImage" custom-class="Image"></default-image>
          </view>
          <view class="LTitle fs3a32 fx-row fx-row-left">
            <view class="LtitleName ">{{item.title}}</view>
            <view class="LtitleSubName fs6a24">{{item.subTitle}}</view>
          </view>
          <view class="applyBox">
            <view class="Bapply fs9a24">{{item.time}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>

  export default {
    data () {
      return {
          list:[
            {id:0,title:'银色小马',subTitle:'外贸经理',time:'1小时前'},
            {id:1,title:'银色小马',subTitle:'外贸经理',time:'1小时前'},
            {id:2,title:'银色小马',subTitle:'外贸经理',time:'2018.11.15'},
            {id:3,title:'银色小马',subTitle:'外贸经理',time:'2018.11.15'},
            {id:4,title:'银色小马',subTitle:'外贸经理',time:'2018.11.15'},
            {id:5,title:'银色小马',subTitle:'外贸经理',time:'2018.11.15'},
            {id:7,title:'银色小马',subTitle:'外贸经理',time:'1小时前'},
            {id:8,title:'银色小马',subTitle:'外贸经理',time:'2018.11.15'},
            {id:9,title:'银色小马',subTitle:'外贸经理',time:'2018.11.15'},
            {id:10,title:'银色小马',subTitle:'外贸经理',time:'2018.11.15'},
            {id:11,title:'银色小马',subTitle:'外贸经理',time:'2018.11.15'}
          ]
      }
    },

  }

</script>

<style scoped lang="less">
  @import '../../css/mzl_base.less';

  .container{
    background:#fff;width:100%;border-top:1upx solid #eee;padding:0 30upx;
    // .Content{padding:40upx;margin-bottom:60upx;}
    // 店铺列表
    .storeListBox{
      .SBlist{
        background:#fff;padding:30upx 0 30upx 0;border-bottom:1upx solid #eee;
        .Limage{
          width:15%;
          .Image{width:80upx;height:80upx;vertical-align: middle}
        }
        .LTitle{
          width:60%;text-align:left;
          .LtitleName{width:35%;font-size:30upx;}
          .LtitleSubName{font-size: 20upx;padding:10upx 20upx 10upx 20upx;background:#F1F1F1;border-radius: 18upx;font-size: 20upx;}
        }
        .applyBox{
          width:20%;
          text-align:center;line-height: 64upx;
        }
      }
    }
}

</style>