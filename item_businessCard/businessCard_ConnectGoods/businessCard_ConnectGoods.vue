<template>
	<view class="connContainer">
		<!-- 复选框列表 -->
		<view class="goodsListCon fx-row fx-row-center fx-row-space-between" v-for="(goods, index) in goodsList" :key="goods.goodsId" @click="selectGoods(goods)">
			<image class="checkCircle" style="width: 34upx; height: 34upx;"
				   :src="goods._select ? 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"
				   ></image>
			<view class="goodsCon fx-row">
				<image :src="goods.coverImage"></image>
				<view class="goodsDetail fx-column fx-row-space-between">
					<view class="goodsName">{{ goods.title }}</view>
					<view class="price">￥{{ goods.preferentialPrice }}</view>
				</view>
			</view>
		</view>

		<uni-load-more :loading-type="loadingType"></uni-load-more>

		<!-- 按钮 -->
		<view class="BtnCon">
			<view class="Btn" @click="confirm">确定</view>
		</view>
	</view>
</template>

<script>

  import uniLoadMore from '@/template/uni-load-more.vue';

  export default {

    components: { uniLoadMore },

    data() {
      return {
        currentPage: 1,
		loading: true,
		noMore: false,
        goodsList: [],
      };
    },

    computed: {
      loadingType() {
        if (this.noMore) return 2;
        if (this.loading) return 1;
        return 0;
      },
      journal () {
        return this.$store.state.journalPublish;
      },
      selectGoodsList () {
        return this.journal.goodsList;
      },
    },

	onLoad () {
      this.fetch();
	},

    onReachBottom () {
      if (this.loading || this.noMore) return;
      this.fetch();
	},

    methods: {
      fetch () {
        this.loading = true;
        this.$api.listCardShop(this.currentUser.id, this.currentPage).then(result => {
          this.loading = false;
          const list = result.cardShopGoodsList;
          if (list.length === 0) {
            this.noMore = true;
		  }
          list.forEach(goods => {
            goods._select = !!this.selectGoodsList.find(item => item.goodsId === goods.goodsId);
		  })
		  this.currentPage++;
          this.goodsList = this.goodsList.concat(list);
        }).catch(error => {
          console.error(error)
          this.loading = false;
          this.showError(error)
        })
	  },

      //点击事件
      selectGoods (goods) {
        goods._select = !goods._select;
      },

      confirm () {
        this.journal.goodsList = this.goodsList.filter(item => item._select);
        uni.navigateBack();
	  },

    }
  }
</script>

<style lang="less" scoped>

	@import "../../css/jss_base.less";
.connContainer{
	background:#F8F8F8 ;
	box-sizing: border-box;
	min-height: 100vh;
	padding-bottom: 120upx;

	.checkCircle {
		width: 34upx;
		height: 34upx;
	}



	.goodsListCon{
		widht:100%;box-sizing:border-box;padding:0 30upx;
		&>image{width: 34upx;height: 34upx;margin-right: 20upx;}
		.goodsCon{box-sizing: border-box;padding: 20upx;background: #FFFFFF;margin-top: 30upx;font-family: PingFangSC;
			&>image{width: 140upx;height: 140upx;margin-right: 44upx;}
			.goodsDetail{
				flex: 1;
				.goodsName{font-size:@fsSubTitle;color: @title;}
				.price{font-size: 30upx;color: #FF5858;}
				}
		}
	}

	//按钮
	.BtnCon{
		position: fixed;bottom: 0;z-index: 99;width: 100%;height:98upx;text-align: center;background: #FFFFFF;
		.Btn{
			width:620upx ;height: 80upx;line-height: 80upx;margin: 10upx auto;font-size:28upx ;color: #FFFFFF;background: #6B7AF8;border-radius: 40upx;
		}
	}
}
</style>
