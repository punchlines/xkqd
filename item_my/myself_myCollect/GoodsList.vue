<template>
  <view>

    <view class="goods_list">
      <!--<goods-item v-for="goods in list" :goods="goods" :key="goods.goodsId"></goods-item>-->
      <view class="goods" @click="openGoodsDetail(goods)" v-for="goods in list" :key="goods.goodsId">
        <view class="goods_cover">
          <image class="goods_cover-image" :src="goods.covermage || goods.coverImage" style="width: 100%;height: 100%;position: absolute;"></image>
          <text class="godds_score">评分 {{ goods.score }}</text>
        </view>
        <view class="goods_info_container">
          <view class="goods_name single-line">{{ goods.title }}</view>
          <view class="goods_meta">
            <view class="godds_price"><price v-model="goods.preferentialPrice"></price></view>
            <text class="goods_sell_count">已售{{ goods.salesNum||0 }}</text>
          </view>
        </view>
      </view>

    </view>


    <view class="load-more-text">{{ loadMoreText }}</view>

  </view>
</template>

<script>
  import loadMoreMixins from '@/js/mixins/loadMoreMixins'
  import GoodsItem from "../../module/shop/_component/goodsItem";
  export default {
    name: "GoodsList",

    components: {GoodsItem},

    data () {
      return {
        list: [],
      }
    },

    props: {
      active: Boolean,
    },

    mixins: [loadMoreMixins],

    watch: {
      active (active) {
        if (active) this.fetch();
      }
    },

    // mounted () {
    //   this.fetch();
    // },

    onShow () {
      this.fetch();
    },

    methods: {
      fetch () {
        this.$api.myCollect(3, 1).then(result => {
          result.goodsList.forEach(item => {
            item.score = item.score.toFixed(1)
          })
          const GoodsList = result.goodsList;
          console.log(GoodsList)
          this.list = this.list.concat(GoodsList)
          this.currentPage += 1;
          this.loadMoreLoading = false;
          if (GoodsList.length === 0) {
            this.noMore = true;
          }
        });
      },

      openGoodsDetail (goods) {
        this.navigateTo('/module/shop/goodsDetail/goodsDetail',{ id:goods.goodsId ,shopId: goods.shopId })
      }

    },

  }
</script>

<style scoped lang="less">

  .goods_list {
    padding: 0 30upx;
    display: flex;
    flex-wrap: wrap;
  }

  .goods {
    width: calc(~"50% -"9upx);
    margin-right:16upx;
    border-radius: 8upx;
    margin-bottom: 20upx;
    position: relative;

    &:nth-child(2n) {
      margin-right: 0;
    }

    .goods_cover {
      width: 100%;
      padding-bottom: 100%;
      height: 0;
      background-color: #EEEEEE;
      position: relative;

      .goods_cover-image {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .godds_score {
        position: absolute;
        bottom: 0;
        right: 20upx;
        width: 100upx;
        height: 40upx;
        line-height: 40upx;
        background: #DDAB5C;
        border-radius: 4px;
        transform: translateY(50%);
        font-size: 20upx;
        color: #FFFFFF;
        text-align: center;
      }

    }

    .goods_name {
      font-size: 28upx;
      color: #333333;
      margin-bottom: 20upx;
    }

    .goods_meta {
      display: flex;
      align-items: center;
    }

    .godds_price {
      flex: 1;
      color: #FF5858;
    }

    .goods_sell_count {
      font-size: 24upx;
      color: #999999;
    }

    .goods_info_container {
      background-color: #FFFFFF;
      padding: 0 20upx;
      padding-top: 30upx;
      padding-bottom: 37upx;
    }


  }

</style>