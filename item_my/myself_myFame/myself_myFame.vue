<template>

  <view class="container">
    <view class="Content">
      <!-- 店铺列表 -->
	  
	<view class="headerbox">
		<!-- 搜索框 -->
		<view class="searchTemplateContainer" >
			<wx-view custom-class="container1">
				<view class="CMsearch">
					<view class="CMimage">
						<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'" mode="widthFix"></image>
					</view>
					<view class="CMinput">
						<input type="text" class="" v-model="key" placeholder="搜索客户" ref="input" @confirm-type="search" @confirm="search"></input>
					</view>
				</view>
			</wx-view>
		</view>
	</view>
      <view class="storeListBox">
        <view class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in list" :key="index" @click="gotoMycard(item.mpUserInfo.id)">
          <view class="Limage">
						<default-image :src="item.mpUserInfo.headImage" custom-class="Pimage"></default-image>
					</view>
          <view class="LTitle fs3a32 fx-row fx-row-left">
            <view class="LtitleName ">{{item.mpUserInfo.name}}</view>
          </view>
          <view class="applyBox">
            <!-- <vip-flag :type="item.mpUserInfo.userType"></vip-flag> -->
          </view>
        </view>
				<view v-if="noMore && list.length==0" class="default">
					<default-page :messageToPage="messageToPage"></default-page>
				</view>

				<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>

      </view>
    </view>
  </view>

</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
  import VipFlag from "../../components/VipFlag";
  export default {
    data () {
      return {
          list:[],
					currentPage: 1,
					loading: false,
					noMore: false,
					messageToPage:{
						image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
						title:'当前无客户'
					},
					key:""
      }
    },
		components: {
			VipFlag,
			uniLoadMore,
		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.getCustomerList();
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.list.length > 0;
		  },
		},
		onLoad() {
			this.getCustomerList();
		},
		methods:{
			search(){
				this.currentPage=1;
				this.list=[];
				this.noMore=false;
				this.getCustomerList();
			},
			gotoMycard(userId){
				uni.navigateTo({
					url: '/pages/businessCard2/businessCard2?cardUserId='+userId
				});
			},
			// 加载我的人气列表
			getCustomerList(){
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.listMyImportUser(this.currentPage,this.key).then(res=>{
					this.hideLoading();
					console.log(res)
					this.loading = false;

					if (res.myImportUserList.length == 0) {
						this.noMore = true;
					}

					this.currentPage++;
					this.list = this.list.concat(res.myImportUserList);

				}).catch(error=>{
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			},
		},
  }

</script>

<style lang="less">
  @import '../../css/mzl_base.less';

  .container{
    background:#f5f5f5;width:100%;border-top:1upx solid #eee;
    // .Content{padding:40upx;margin-bottom:60upx;}
    // 店铺列表
	
		
	.headerbox{
		 background:#f5f5f5;
		 margin-bottom:15rpx;
	}
    .storeListBox{
      .SBlist{
        background:#fff;padding:30upx 0 30upx 0;border-bottom:1upx solid #eee;
        .Limage{
          width:15%;
					.Pimage{width:80upx;height:80upx;vertical-align: middle;}
        }
        .LTitle{
          width:60%;text-align:left;
          .LtitleName{width:35%;font-size:30upx;}
          .LtitleSubName{font-size: 20upx;background:#F1F1F1;border-radius: 18upx;padding:0 20upx 0 20upx;height: 36upx;line-height: 36upx;}
        }
        .applyBox{
          text-align:center;line-height: 64upx;
        }
      }
    }
	.searchTemplateContainer {
		padding: 15upx 15upx 0 15upx;
		margin-bottom: 5upx;
		
	}
	
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
					margin-top: 10upx;
				}
			}
		}
	}
	
	.listContainer {
		padding: 0 30upx;
	
		.listOne {
			margin-bottom: 24upx;
		}
	}
		.default{
			position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
		}
}

</style>
