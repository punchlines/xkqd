<template>
  <view class="container">
	  <!-- 余额明细 -->
      <view class="balanceDetail">
        <view class="BDlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in list" :key="index">
          <view class="Lleft">
            <view class="Ltitle fs6a30">{{item.type }}</view>
            <view class="Ltime fs9a24">{{item.time }}</view>
          </view>
          <view class="Lright fs3a32">{{ item.addType }}{{item.change_money}}</view>
        </view>
      </view>
    <view class="load-more-text">{{ loadMoreText }}</view>
  </view>
</template>

<script>

  import loadMoreMixins from '../../js/mixins/loadMoreMixins'
	
  export default {
    data () {
      return {
        list: [],
      }
    },

    filters: {

    },

    mixins: [loadMoreMixins],

    mounted () {
      this.fetch();
    },

    methods: {
      fetch () {
        this.$api.getRemainCashFlow(this.currentPage).then(result => {
          result.remainingSumDetails.forEach(item => {
            item.addType = this.addInfoFormat(item.type);
            item.type = this.formatType(item.type);
            item.time = this.formatDate(item.time);
          })
          console.log(result)
          this.list = this.list.concat(result.remainingSumDetails)
          this.currentPage += 1;
          this.loadMoreLoading = false;
          if (result.remainingSumDetails.length === 0) {
            this.noMore = true;
						
          }
        }).catch(error => {
						this.showError(error);
        })
      },

      addInfoFormat (type) {
        if (type == 1) {
          return '-'
        } else if (type == 2) {
          return '-'
        } else if (type == 3) {
          return '+'
        }
      },

      formatType (type) {
        if (type == 1) {
          return '提现'
        } else if (type == 2) {
          return '消费'
        } else if (type == 3) {
          return '销售商品'
        }
        return ''
      }

    },

  }

</script>

<style scoped lang="less">
  @import '../../css/mzl_base.less';

  .container{
    background: #fff;width:100%;padding:0 40upx;border-top:1upx solid #eee;
	// 余额明细
    .balanceDetail{
      .BDlist{
        border-bottom:1upx solid #eee;padding:30upx 0;
        .Lleft{
          width:70%;text-align: left;
          .Ltitle{margin-bottom:20upx;color:#000;font-size: 32upx;font-weight: 900upx;}
        }
        .Lright{width:30%;text-align: right;}
      }
    }
  }

</style>