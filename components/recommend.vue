<template>
  <view class="recommend">
    <view class="recommend_title">为你推荐</view>
    <!--<view class="reduce_button">减少此类推荐</view>-->
    <view class="recommend_goods_list">
      <goods-item v-for="goods in list" :goods="goods" @onUnlike="onUnlike" :key="goods.goodsId"></goods-item>
    </view>
  </view>
</template>

<script>

  function getUnique(arr, comp) {

    const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  }

  import goodsItem from '@/components/goodsItem.vue'

  export default {

    components: { goodsItem },

    data () {
      return {
        list: [],
        currentPage: 1,
      }
    },

    props: {
      shopId: [String, Number],
    },

    mounted () {
      this.$api.listRecommendGoods(this.shopId || '33', this.currentPage).then(result => {
        const list = getUnique([...result.advertisementGoodsList, ...result.shopGoodsList], 'goodsId');

        // this.list = result.advertisementGoodsList;
        this.list = this.list.concat(list);
        this.currentPage++;
      }).catch(error => {
        console.error(error)
      })
    },

    methods: {
      onUnlike (goods) {
        const index = this.list.findIndex(item => item.goodsId == goods.goodsId);
        if (index >= 0) {
          this.list.splice(index, 1)
        }
      },
    },

  }


</script>

<style scoped lang="less">


  .recommend {
    .recommend_title {
      font-size: 30upx;
      color: #333333;
      position: relative;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20upx;
      &:before, &:after {
        content: "";
        width: 80upx;
        height: 2upx;
        background: #aaa;
        display: block;
      }
      &:before { margin-right: 20upx; }
      &:after { margin-left: 20upx; }
    }
    .reduce_button {
      background: #EEEEEE;
      border-radius: 30upx;
      width: 300upx;
      line-height: 60upx;
      text-align: center;
      margin: 0 auto;
      font-size: 24upx;
      color: #888888;
    }
    .recommend_goods_list {
      padding: 0 30upx;
      padding-top: 30upx;
      display: flex;
			//overflow-x: scroll;
			
       flex-wrap: wrap;
    }
  }

</style>