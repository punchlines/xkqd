<template>
  <view class="container">
    <!-- 积分说明 -->
    <view class="IntegralExplanat">
        <view class="IEtitle">积分获取渠道：</view>
        <view class="IElist">
          <view class="IElistItem" v-for="(item,index) in IntrgralList" :key="index">
            <view class="ItemTitle fs3a28">{{item.title}}</view>
          </view>
        </view>
    </view>
  </view>
</template>

<script>

  export default {
    data () {
      return {
		  IntrgralList:[
				{id:0,title:'1.财富轮盘抽奖获得'},
				{id:1,title:'2.每日签到获得，连续签到，1为起点，每次+1，最多10 分，此后连续签到每次得10分，中断后从1开始；'},
				{id:2,title:'3.每日点赞他人名片5个，+5积分'},
				{id:3,title:'4. 每日收藏他人名片5个，+5积分'},
				{id:4,title:'5. 每日点赞动态/资讯5次，+5积分'},
				{id:5,title:'6. 每日评价动态/资讯5次，+5积分'},
				{id:6,title:'7. 每日去店铺签到，每家店铺+5积分'},
		  ]
      }
    },
    methods:{
      
    }

  }

</script>

<style scoped lang="less">

	@import '../../css/mzl_base.less';
  .container{
    background:@grayBg;width:100%;border-top:1upx solid #eee;position: fixed;height: 100%;
   .IntegralExplanat{
     padding:30upx;
     .IEtitle{font-weight:bold;font-size:32upx;margin-bottom:30upx;}
     .IElist{
       .IElistItem{
         margin:16upx 0;
         .ItemTitle{line-height: 40upx;}
       }
     }
   }
}
</style>