export default {

  data () {
    return {
      dataList: [],
      loadMoreLoading: false,
      noMore: false,
      currentPage: 1,
    }
  },

  computed: {
    loadMoreText () {
      if (this.loadMoreLoading) return '加载中...'
      if (this.noMore) return '无更多数据'
      return '';
    }
  },

  methods: {
    fetch () {
      this.fetchAction.then(result => {
        const list = result.shopGoodsList;
        this.dataList = this.dataList.concat(list)
        this.currentPage += 1;
        this.loadMoreLoading = false;
      }).catch(error => {
        this.loadMoreLoading = false;
      })
    },

    reset () {
      this.currentPage = 1;
      this.noMore = false;
    },

  },

  onReachBottom () {
    if (this.loadMoreLoading || this.noMore) return;
    this.fetch();
  }

}