<template>
  <view class="storeList">
    <view class="storeListBox">
      <view class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in list" :key="index" @click="gotoStore(item.shopId)">
        <view class="Limage">
          <image :src="item.logo" class="Image"></image>
        </view>
        <view class="LTitle">
          <view class="LtitleName fs3a32">{{item.shopName}}</view>
          <view class="LtitleSubName fs6a24">{{item.goodsCount}}个商品</view>
        </view>
        <view class="applyBox">
          <view class="Bapply fs6a28">
            <image class="ABimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/jinru.png'" alt=""></image>
          </view>
        </view>
      </view>
    </view>

    <view class="load-more-text">{{ loadMoreText }}</view>

  </view>
</template>

<script>
  import loadMoreMixins from '@/js/mixins/loadMoreMixins'
  export default {
    name: "ShopList",

    data () {
      return {
        list: [],
      }
    },

    mixins: [loadMoreMixins],

    onShow () {
      this.fetch();
    },

    methods: {
      fetch () {
        this.$api.myCollect(2, 1).then(result => {
          const GoodsList = result.shopList;
          this.list = this.list.concat(GoodsList)
          this.currentPage += 1;
          this.loadMoreLoading = false;
          if (GoodsList.length === 0) {
            this.noMore = true;
          }
        });
      },

      gotoStore (shopId) {
        uni.navigateTo({ url: '/module/shop/home/home?shopId='+shopId });
      }

    },

  }
</script>

<style scoped lang="less">
  @import '../../css/mzl_base.less';

  // 店铺
  .storeList{
    padding:30upx;
    .storeListBox{
      background:@grayBg;
      .SBlist{
        background:#fff;padding:30upx;margin-bottom:30upx;
        .Limage{
          width:22%;
          .Image{width:110upx;height:110upx;vertical-align: middle}
        }
        .LTitle{
          width:58%;
          .LtitleName{font-size:30upx;height:70upx;}
        }
        .LTitle1{width:85%;}
        .applyBox{
          width:20%;text-align: right;
          .Bapply{
            .ABimage{width:30upx;height:30upx;vertical-align: middle;}
          }
        }
      }
    }
  }

</style>