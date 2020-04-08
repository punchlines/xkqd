<template>
  <view class="page">

    <view class="search-bar">
      <image class="search-bar-icon" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
      <input v-model="searchKey" placeholder="搜索商品" confirm-type="search" @confirm="search">
    </view>

    <view class="cate" v-for="(cate, index) in cateList">
      <view class="title" @click="openCateGoodsList(cate)">
				<text>{{ cate.classifyName }}</text>
				<image class="right" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/you.png'"></image>
			</view>
      <view class="cate-list">
        <view class="cate-item" v-for="(subCate, subIndex) in cate.child" @click="openCateGoodsList(cate)">{{ subCate.classifyName }}</view>
      </view>
    </view>

	<tab-bar active="查找商品" :shop-id="shopId" :recommend-id="recommendId"></tab-bar>

  </view>
</template>

<script>

 // import shopMixins from '../_mixins/shopMixins';
  import tabBar from '../_component/tabBar';

  export default {
	  
	components: { tabBar },

    data () {
      return {
				onlineSite:this.global.onlineSite,
        cateList: [],
        searchKey: '',
        recommendId: '',
				shopId:0
      }
    },

    //mixins: [shopMixins],

    onLoad (option) {
      this.recommendId = option.recommendId || '';
      this.shopId = option.shopId
    },

    mounted () {
	  this.showLoading();
	  this.$api.getShopGoodsClassify(this.shopId).then(result => {
	    const list = result.shopGoodsClassifyList;
	    const cateMap = {};
	    const cateList = [];
        list.forEach(item => {
          if (item.parentIdClassifyId) {
            if (!cateMap[item.parentIdClassifyId]) {
              cateMap[item.parentIdClassifyId] = {
                classifyId: item.parentIdClassifyId,
                classifyName: item.parentClassifyName,
                isParent: true,
                child: [item],
              }
            } else {
              cateMap[item.parentIdClassifyId].child.push(item);
            }
          } else {
            cateMap[item.classifyId] = { ...item, child: [] };
          }
        })
        Object.keys(cateMap).forEach(key => {
          cateList.push(cateMap[key])
        })
        this.cateList = cateList;
        console.log(cateList)
        uni.hideLoading()
      }).catch(error => {
        uni.hideLoading()
        console.error(error)
      });
    },

    methods: {
      search () {
        this.navigateTo('../searchResult/searchResult', {
          shopId: this.shopId,
          search: this.searchKey,
          recommendId: this.recommendId,
        })
      },
      openCateGoodsList (cate) {
        this.navigateTo('../searchResult/searchResult', {
          shopId: this.shopId,
          cateId: cate.classifyId,
          isParent: cate.isParent ? 1 : 0,
          recommendId: this.recommendId,
        })
      }
    },

  }


</script>

<style scoped lang="less">


  .page {
    background-color: #f5f5f5;
    padding: 40upx 30upx 100upx;
    min-height: calc(100vh - 88upx);
    box-sizing: border-box;
  }

  .search-bar {
    display: flex;
    background: #FFFFFF;
    border-radius: 2upx;
    align-items: center;
    padding: 0 30upx;
    margin-bottom: 30upx;
    height: 72upx;

    .search-bar-icon {
      width: 32upx;
      height: 32upx;
      margin-right: 24upx;
    }
    input {
      flex: 1;
      font-size: 28upx;
      line-height: 72upx;
      height: 72upx;
      &::placeholder {
        color: #CCCCCC;
      }
    }
  }

  .cate {
    background: #FFFFFF;
    border-radius: 20upx;
    padding: 24upx 30upx 10upx;
    margin-bottom: 30upx;

    .title {
      font-size: 32upx;
      color: #333333;
      margin-bottom: 32upx;
			display: flex;
			align-items: center;
			text {
				flex: 1;
			}
			image {
				width:30upx;
				height:30upx;
			}
    }
    .cate-list {

      .cate-item {
        width: calc(~"50% - "12upx);
        display: inline-block;
        background: #F8F8F8;
        border-radius: 4upx;
        margin-right: 23upx;
        text-align: center;
        font-size: 24upx;
        color: #666666;
        line-height: 64upx;
        margin-bottom: 20upx;

        &:nth-child(2) {
          margin-right: 0;
        }

      }
    }
  }



</style>