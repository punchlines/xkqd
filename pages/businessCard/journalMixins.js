export default {

  data () {
    return {
      journalMixins: {
        currentPage: 1,
        list: [],
        loading: false,
        noMore: false,
      },
    }
  },

  computed: {
    loadingType() {
      if (this.journalMixins.noMore) return 2;
      if (this.journalMixins.loading) return 1;
      return 0;
    },
    showLoadMore () {
      return this.journalMixins.list.length > 0;
    },
  },

  watch: {
    cardUserId (newId, oldId) {
      setTimeout(() => {
        this.fetchJournal();
      }, 1000)
    }
  },

  mounted () {
    // this.fetchJournal();
  },

  methods: {
    journalOnShow () {
      const newFlag = uni.getStorageSync('_newJournalFlag');
      const _tempCommentCount = uni.getStorageSync('_tempCommentCount');
      const deleteFlag = uni.getStorageSync('_deleteJournalFlag');

      if (newFlag) {
        this.resetJournal();
        this.fetchJournal()
        uni.removeStorageSync('_newJournalFlag');
      }

      if (_tempCommentCount) {
        const { id, count } = _tempCommentCount;
        const find = this.journalMixins.list.find(item => item.journalMap.id == id)
        if (find) {
          find.journalMap.commentCount = count;
        }
        uni.removeStorageSync('_tempCommentCount');
      }

      if (deleteFlag) {
        const id = deleteFlag;
        const index = this.journalMixins.list.findIndex(item => item.journalMap.id == id)
        if (index >= 0) {
          this.journalMixins.list.splice(index, 1);
        }
        uni.removeStorageSync('_deleteJournalFlag');
      }


    },

    fetchJournal () {
      if (this.journalMixins.loading) return;
      this.journalMixins.loading = true;
      this.$api.listUserJournal(this.cardUserId, this.journalMixins.currentPage).then(result => {
        this.journalMixins.loading = false;
        const list = result.journalList;
        if (this.journalMixins.currentPage == 1) {
          this.loadCount++;
        }
        if (list.length === 0) {
          this.journalMixins.noMore = true;
        }
        list.forEach(item => {
          try {
            item.journalMap.images = JSON.parse(item.journalMap.images)
          } catch (e) {
            item.journalMap.images = []
          }
        })
        this.journalMixins.currentPage++;
        this.journalMixins.list = this.journalMixins.list.concat(list);
      }).catch(error => {
        this.journalMixins.loading = false;
        // this.showTips(error)
      })
    },

    resetJournal () {
      this.journalMixins = {
        currentPage: 1,
        list: [],
        loading: false,
        noMore: false,
      };
    },

    onDeleteSuccess (index) {
      this.journalMixins.list.splice(index, 1)
    }


  },

}
