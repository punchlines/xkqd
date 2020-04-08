<template>

  <view class="page">

		<view class="goods_list">
			<goods-item v-for="goods in goodsList" :goods="goods" :recommend-id="recommendId"></goods-item>
		</view>

    <view v-if="goodsList.length>0" class="load-more-text">{{ loadMoreText }}</view>
		<view v-else="shopGoods.length==0" style="align-items: center;width: 100%;margin-top: 40%;">
			<default-page :messageToPage="messageToPage2"></default-page>
		</view>
  </view>

</template>

<script>

  import loadMoreMixins from '../../../js/mixins/loadMoreMixins'
  import goodsItem from '@/components/goodsItem';

  export default {

    components: {
      goodsItem,
    },

    data () {
      return {
        goodsList: [],
        // 搜索
        searchKey: '',
        // 分类
        cateId: '',
        recommendId: '',
				messageToPage2:{
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/sousuo.png',
					title:'无该类型商品',
				},	
      }
    },

    mixins: [loadMoreMixins],

    onLoad (options) {
      this.shopId = options.shopId || 3;
      this.searchKey = options.search;
      this.cateId = options.cateId;
      this.isParent = options.isParent;
      this.recommendId = options.recommendId;
    },

    mounted () {
      this.fetch();
    },

    methods: {
      fetch () {
        const key = this.searchKey
          ? 'searchList'
          : 'shopGoodsList';
        const action = this.searchKey
          ? this.$api.searchShopGoods(this.shopId, this.searchKey, this.currentPage)
          : this.$api.getShopGoodsByClassifyId(this.shopId, this.cateId, this.isParent, this.currentPage)

        action.then(result => {
					console.info(result)
          const list = result[key];
          this.goodsList = this.goodsList.concat(list)
          this.currentPage += 1;
          this.loadMoreLoading = false;
          if (list.length === 0) {
            this.noMore = true;
          }
        }).catch(error => {
          this.loadMoreLoading = false;
        })
      },
    },


  }


</script>

<style scoped lang="less">


  .page {
    background-color: #f5f5f5;
    min-height: calc(100vh - 88upx);
    box-sizing: border-box;
	padding-top: 40upx;
  }

.goods_list {
		padding: 0 30upx;
		display: flex;
		flex-wrap: wrap;
	}
	
 .empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 30upx;
    color: #666;
    text-align: center;
    line-height: 100vh;
  }

</style>