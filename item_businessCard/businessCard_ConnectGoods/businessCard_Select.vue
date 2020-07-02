<template>
	<view class="connContainer">
		<view class="search-container">
			<view class="search">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
				<input v-model="searchKey" type="text" class="input" :placeholder="search==1?'搜索企业':'搜索商品'"  placeholder-class="place" confirm-type="search" @confirm="searchs()">
			</view>
		</view>
		<!-- 复选框列表 -->
		<view class="goodsListCon fx-row fx-row-center fx-row-space-between" v-for="(goods, index) in goodsList" :key="goods.id" @click="selectGoods(goods)" v-if="show">
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

		<!-- <uni-load-more :loading-type="loadingType"></uni-load-more> -->

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
		search:'',
		show:false,
		searchKey:'',
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

	onLoad (options) {
	  this.search=options.search
	  console.log(this.search)
	},
    onReachBottom () {
      if (this.loading || this.noMore) return;
	},

    methods: {
      

      //点击事件
      selectGoods (goods) {
		  console.log(goods)
        goods._select = !goods._select;
      },
	  searchs(){
		   this.loading = true;
		  this.$api.searchGoods(this.searchKey,this.currentPage)
			.then(res=>{
			   this.loading = false;
			   this.show=true
			   const list = res;
			   if (list.length === 0) {
			     this.noMore = true;
			   }
			   list.forEach(goods => {
			     goods._select = !!this.selectGoodsList.find(item => item.id === goods.id);
				 console.log(goods)
			   })
			   this.currentPage++;
			   this.goodsList = this.goodsList.concat(list);
		  })
		  .catch(error => {
		    console.error(error)
		    this.loading = false;
		    this.showError(error)
		  })
	  },
      confirm () {
        this.journal.goodsList = this.goodsList.filter(item => item._select);
        uni.navigateBack({
        	delta: 2
        })
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
.search-container {
			
			background:#F5F5F5;
			top:0;
			left:0;
			width:100%;
			padding:30upx 0;

		}

		.search{

				width: 92%;
				height: 72upx;
				display: flex;
			margin: 0 auto;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				background: #FFFFFF;
				&>image{
					width: 32rpx;
					height: 32rpx;
					margin-left: 30upx;
				}
				.input{
					flex: 1;
					margin-left: 24upx;
					font-size: 28upx;
					color: #333333;
				}
				.place{
					font-size: 28upx;
					color: #cccccc;
				}
			}
</style>