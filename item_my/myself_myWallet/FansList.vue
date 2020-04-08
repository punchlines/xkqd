<template>
  <view class="page">
    <view class="Content">

      <view class="storeListBox">
        <view class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in list" :key="index" @click="gotoMycard(item.id)">
          <view class="Limage">
            <image :src="item.image" class="Pimage"></image>
          </view>
          <view class="LTitle fs3a32 fx-row fx-row-left">
            <view class="LtitleName ">{{item.nickName}}</view>
          </view>
          <view class="applyBox">
            {{ !!item.register ? '已注册' : '未注册' }}
          </view>
        </view>
        <view v-if="noMore && list.length==0" class="default">
          <default-page :messageToPage="messageToPage"></default-page>
        </view>

        <uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>

      </view>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@/template/uni-load-more.vue';
  import VipFlag from "../../components/VipFlag";
  export default {
    data () {
      return {
        list:[],
        currentPage: 1,
        loading: false,
        noMore: false,
        messageToPage:{
          image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
          title:'当前无名片粉丝'
        },
      }
    },
    components: {
      VipFlag,
      uniLoadMore,
    },
    onReachBottom () {
      if (this.noMore || this.loading) return;
      this.getCustomerList();
    },
    computed: {
      loadingType() {
        if (this.noMore) return 2;
        if (this.loading) return 1;
        return 0;
      },
      showLoadMore () {
        return this.list.length > 0;
      },
    },
    onLoad() {
      this.getCustomerList();
    },
    methods:{

      gotoMycard(userId){
        if (userId) {
          uni.navigateTo({
            url: '/pages/businessCard2/businessCard2?cardUserId='+userId
          });
        }
      },
      // 加载我的人气列表
      getCustomerList(){
        if (this.loading) return;
        this.loading = true;
        this.showLoading();
        this.$api.getMyFansList(this.currentPage).then(res=>{
          this.hideLoading();
          console.log(res)
          this.loading = false;

          if (res.length == 0) {
            this.noMore = true;
          }

          this.currentPage++;
          this.list = this.list.concat(res);

        }).catch(error=>{
          this.hideLoading();
          this.showError(error);
          this.loading = false;
        })
      },
    },
  }

</script>

<style lang="less" scoped>
  .page {
    background:#fff;width:100%;border-top:1upx solid #eee;padding:0 30upx;
		box-sizing:border-box;
    // 店铺列表
    .storeListBox{
      .SBlist{
        background:#fff;padding:30upx 0 30upx 0;border-bottom:1upx solid #eee;
        .Limage{
          width:80upx;
          height:80upx;
          margin-right: 30upx;
          .Pimage{width:80upx;height:80upx;vertical-align: middle;}
        }
        .LTitle{
          flex: 1;
          text-align:left;
          .LtitleName{width:35%;font-size:30upx;}
          .LtitleSubName{font-size: 20upx;background:#F1F1F1;border-radius: 18upx;padding:0 20upx 0 20upx;height: 36upx;line-height: 36upx;}
        }
        .applyBox{
          font-size:24upx;
          color:rgba(153,153,153,1);
          line-height:33upx;
        }
      }
    }
    .default{
      position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
    }
  }

</style>
