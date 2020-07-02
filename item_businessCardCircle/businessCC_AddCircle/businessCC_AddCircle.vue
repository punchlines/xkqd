<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="search-container">
			<view class="search">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
				<input v-model="searchKey" type="text" class="input" focus placeholder="请输入关键词，如：防疫、创业、兼职等" placeholder-class="place" confirm-type="search" @confirm="search()" @input="cancel=false" @blur="cancel=true">
				<image v-if="!cancel" @click="searchKey=''" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.dhoIDdKklu2j177dc399d1d822dd17eb1ae7ad1f0265.png" style="margin-right: 30rpx;"></image>
			</view>
			<view class="cancel" @click="searchAndCancel">
				{{cancel?'取消':'搜索'}}
			</view>
		</view>


		<!-- 搜索结果显示 -->
		<view class="resultContainer">
			<card-circle-item v-for="item in list" :key="item.id" :datas="item" :add-flag="!isSearch" :highlight="currentSearchKey" :select="select"></card-circle-item>

			<uni-load-more :loading-type="loadingType"></uni-load-more>

		</view>
	</view>
</template>

<script>
  import CardCircleItem from "../../components/CardCircleItem";
  export default {
    components: {CardCircleItem},
    data() {
      return {
        onlineSite:this.global.onlineSite,
		searchKey: '',
		currentSearchKey: '',
        circleList: [],
		isSearch: false,
		cancel:true,
        list: [],
        loading: false,
        noMore: false,
		select:true,
        currentPage: 1,
      };
    },

    computed: {
      loadingType () {
        if (this.noMore) return 2;
        if (this.loading) return 1;
        return 0;
      },
    },

	onLoad (option) {
      if (option.search) {
        this.isSearch = true;
        uni.setNavigationBarTitle({ title: '搜索社群' });
	  }
	},

    onReachBottom () {
      if (this.noMore || this.loading) return;
      this.search(true);
    },

	methods: {
      search (more) {
        if (this.loading) return;
        if (!more) {
          this.list = [];
          this.noMore = false;
          this.currentPage = 1;
        }
        this.loading = true;
        this.currentSearchKey = this.searchKey;

        const action = this.isSearch
			? this.$api.getUserCardCircleList(this.currentPage,this.currentSearchKey)
			: this.$api.searchCardCircleList(this.currentPage,this.currentSearchKey);

        action.then(result => {
          setTimeout(() => {
            this.loading = false;
		  }, 100)
          const list = result
          if (list.length === 0) this.noMore = true;
          this.list = this.list.concat(list);
          this.currentPage++;
		}).catch(error => {
		  this.loading = false;
		})
	  },
	  searchAndCancel(){
		  if(this.cancel==false){
			  this.search()
		  }else{
			  uni.navigateBack({
			  	
			  })
			  this.searchKey=''
		  }
	  }
	},

  }
</script>

<style lang="less" scoped>
	@import "../../css/jss_base.less";
	.container{
		padding-top: 30px;
		width: 100%;
		min-height: 100vh;
		background: #FFF;

		/*position: fixed;*/
		top:0;
		left:0;

		.search-container {
			position:fixed;
			z-index: 10;
			top:0;
			left:0;
			width:100%;
			padding:30upx 0;
			background-color: #FFFFFF;
		}
		.cancel{
			position: fixed;
			right: 40rpx;
			top: 20rpx;
			font-size:32rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(46,161,255,1);
			line-height:45px;
			}
		.search{
				border-radius:4rpx;
				width: 78%;
				height: 72upx;
				display: flex;
				margin-left: 32rpx;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				background: #F2F2F2;
				&>image{
					width: 28rpx;
					height: 28rpx;
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
			.c_container {
			    margin-bottom: 24upx;
			    overflow: hidden;
			    background: #ffffff;
			    & > view {
			        float: left;
			    }
			    .avaContainer {
			        width: 20%;
			        height: 140upx;
			        padding: 10upx 0 10upx 10upx;
			        & > image {
			            width: 100%;
			            height: 100%;
			        }
			    }
			    .content {
			        padding: 21upx 28upx 14upx 34upx;
			        width:63%;
			        .title {
			            margin-bottom: 30upx;
			            color: #333333;
			            font-size: 32upx;
			            font-family: PingFangSC-Medium;
			            letter-spacing: 1px;
			            font-weight: 500;
			        }
			        .detail {
			            width: 100%;
			            font-size: 28upx;
			            font-family: PingFangSC-Regular;
			            font-weight: 400;
			            letter-spacing: 1px;
			            white-space: nowrap;
			            overflow: hidden;
			            text-overflow: ellipsis;
						color: #9B9B9B;
			        }
			    }
			    .numberContainer {
			        width: 15%;
			        margin-top: 21upx;
			        .chengyuan {
			            width: 37upx;
			            height: 27upx;
			        }
			        .huati {
			            width: 32upx;
			            height: 32upx;
			        }
			        .sign:first-child {
			            margin-bottom: 15upx;
			        }
			        .number {
			            font-size: 24upx;
			            color: #333333;
			            margin-left: 18upx;
			        }
			    }
			}
			.resultContainer{
				width: 100%;
				padding-top: 70upx;
			.container1 {
			    width: 100%;
			    margin-top: 20upx;
			    .CMsearch {
			        .flex(flex-start);
			        width: 95%;
			        margin: 0 auto;
			        text-align: left;
			        background: #fff;
			        height: 72upx;
			        color: #ccc;
			        font-size: 28upx;
			        .CMimage {
			            width: 10%;
			            margin-left: 20upx;
			            image {
			                width: 32upx;
			                height: 32upx;
			                vertical-align: middle;
			            }
			        }
			        .CMinput {
			            width: 80%;
			            input {
			                background: #fff;
			                margin-top: 10upx;
			            }
			        }
			    }
			}
		}
	}
</style>
