<template>
  <view class="container">
    <!-- 积分记录 -->
    <view class="IntrgralRecord fx-row fx-row-center fx-row-space-around" v-for="item in IntrgralList">
      <view class="IRtitle">
        <view class="RtitleName fs3a30">{{item.pointsType}}</view>
        <view class="RtitleTime fs9a24">{{item.createTime}}</view>
      </view>
      <view v-if="item.getPoints>0" class="IRnum fs3a32">+{{item.getPoints}}</view>
      <view v-if="item.getPoints<1"  class="IRnum fs3a32">{{item.getPoints}}</view>
    </view>
		
		<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>
		
		<view v-if="IntrgralList.length==0" class="default">
			<default-page :messageToPage="messageToPage"></default-page>
		</view>
  </view>
</template>

<script>
import uniLoadMore from '@/template/uni-load-more.vue';
  export default {
    data () {
      return {
          IntrgralList:[],
					messageToPage:{
						image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
						title:'当前无积分记录'
					},
					showDefaultPage:false,
					currentPage: 1,
					loading: false,
					noMore: false,
      }
    },
		onLoad() {
			this.record();
		},
		components: {
			uniLoadMore,
		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.record();
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.IntrgralList.length > 0;
		  },
		},
    methods:{
			// 获取积分记录
      record(){
				if (this.loading) return;
				this.loading = true;
      	this.showLoading();
      	this.$api.record(this.currentPage,20).then(res=>{
      		this.hideLoading();
					this.loading = false;
      		console.info(res);
					if(res&&res.recordMessage.length==0){
						this.showDefaultPage=true;
						this.noMore = true;
					}else{
						this.currentPage++;
						this.IntrgralList = this.IntrgralList.concat(res.recordMessage);
					}
      		// this.IntrgralList=res.recordMessage;
      	}).catch(error=>{
      		this.showError(error);
      		this.hideLoading();
					this.loading = false;
      	})
      },
    }

  }

</script>

<style scoped lang="less">


	@import '../../css/mzl_base.less';
  .container{
    background:#fff;width:100%;border-top:1upx solid #eee;
    .IntrgralRecord{
      padding:30upx;border-bottom:1upx solid #eee;
      .IRtitle{
        width:80%;text-align: left;
        .RtitleName{color:#000;font-weight: bold;margin-bottom:10upx;}
      }
      .IRnum{
          width:20%;text-align: right;font-weight:900upx;
      }
    }
		.default{
			position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
		}
}


</style>