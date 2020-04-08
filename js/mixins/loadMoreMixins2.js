import uniLoadMore from '@/template/uni-load-more.vue';

export default {

  components: { uniLoadMore },

  data () {
    return {
      currentPage: 1,
      loading: false,
      noMore: false,
      list: [],
    }
  },

  computed: {
    loadingType() {
      if (this.noMore) return 2;
      if (this.loading) return 1;
      return 0;
    },
  },

  onReachBottom () {
    if (this.loading || this.noMore) return;
    this.fetch();
  },

  methods: {
    fetch () {
    },

    reset () {
      this.currentPage = 1;
      this.loading = false;
      this.noMore = false;
      this.list = [];
    },

  },

}