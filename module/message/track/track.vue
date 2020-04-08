<template>

  <view class="page">

    <view class="track" v-for="item in list" @click="viewUserCard(item)">
      <img class="avatar" :src="item.userHeadImage">
      <view class="content">
        <view class="text">{{ item.mpOrbit.content }}</view>
        <view class="date">{{ item.time }}</view>
      </view>
      <view class="btn" v-if="false">查看</view>
    </view>
    <uni-load-more :loading-type="loadingType"></uni-load-more>


  </view>

</template>

<script>
  import loadMoreMixins from '@/js/mixins/loadMoreMixins2';

  export default {

    data () {
      return {
      }
    },

    mixins: [loadMoreMixins],

    mounted () {
      this.fetch();
    },

    methods: {
      fetch() {
        this.loading = true;
        this.$api.listOrbit(this.currentPage).then(result => {
          this.loading = false;
          const list = result.orbitList;
          if (list.length === 0) {
            this.noMore = true;
          }
          this.list = this.list.concat(list);
          this.currentPage++;
        }).catch(error => {
          this.loading = false;
        })
      },

      viewUserCard (item) {
        this.navigateTo('/pages/businessCard2/businessCard2', { cardUserId: item.mpOrbit.fromUserId })
      }

    }

  }

</script>

<style scoped lang="less">


  .page {
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .track {
    background-color: #ffffff;
    padding: 40upx 30upx 23upx;
    display: flex;
    position: relative;

    &+.track {
      border-top: 1upx solid #e1e1e1;
    }

    .avatar {
      width: 60upx;
      height: 60upx;
      margin-right: 30upx;
    }
		.text {
			margin-bottom: 23upx;
		}
    .content {
      font-size: 28upx;
      color: #666666;
    }
    .name {
      color: #4E7CB1;
    }
    .date {
      font-size:24upx;
      color: #999999;
    }
    .btn {
      color: #6B7AF8;
      font-size: 24upx;
      position: absolute;
      bottom: 23upx;
      right: 40upx;
    }
  }



</style>
