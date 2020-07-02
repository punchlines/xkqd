export default {

  data () {
    return {
      goodsMixins: {
        currentPage: 1,
        list: [],
        loading: false,
        noMore: false,
        hasLoad: false,
      },
    }
  },

  computed: {
    loadingType2 () {
      if (this.goodsMixins.noMore) return 2;
      if (this.goodsMixins.loading) return 1;
      return 0;
    },
    showLoadMore2 () {
      return this.goodsMixins.list.length > 0;
    },
  },

  watch: {
    shopId (newId) {
      if (newId) {
        setTimeout(() => {
          this.fetchGoods();
        }, 800)
      }
    }
  },

  methods: {

    goodsOnShow () {
			//发布新商品时候重新抓取
				const newGoods = uni.getStorageSync('_newGoodsFlag');
				if(newGoods){
					this.resetGoods();
					this.fetchGoods();
					uni.setStorageSync('_newGoodsFlag',false);
				}
    },

    fetchGoods () {
      if (this.goodsMixins.loading) return;
      this.goodsMixins.loading = true;
      this.$api.listCardShop(this.cardUserId, this.goodsMixins.currentPage).then(result => {
        this.goodsMixins.hasLoad = true;
		console.log('商品数量',result.cardShopData)
        //店铺信息
        if (result.cardShopData) {
          this.cardShopData = result.cardShopData;
        }
        //商品列表
        const list = result.cardShopGoodsList;
        if (this.goodsMixins.currentPage == 1) {
          this.loadCount++;
        }
        if (list.length === 0) {
          this.goodsMixins.noMore = true;
        }
        this.goodsMixins.loading = false;
        this.goodsMixins.currentPage++;
        this.goodsMixins.list = this.goodsMixins.list.concat(list);
      }).catch(error => {
				console.log(error);
		
				// setTimeout(()=>{
			 	this.goodsMixins.loading = false;
				// 	this.fetchGoods();
				// },1000)
    //   
        // this.showTips(error)
      })
    },

    resetGoods () {
      this.goodsMixins = {
        currentPage: 1,
        list: [],
        loading: false,
        noMore: false,
      };
    },

  },

}
