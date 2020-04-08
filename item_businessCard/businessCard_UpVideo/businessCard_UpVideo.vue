<template>
	<view class="container">
		<view class="videoCon fx-row fx-row-center fx-row-middle" @click="upVideoTap">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/shipin.png'" mode="widthFix"></image>
			<text>上传视频</text>
		</view>
		<!-- 选择上传的视频 -->
		<view v-if="videoList.length>0"  style="padding-bottom: 100upx;" >
			<view  v-for="(item,index) of videoList" :key="index">
				<view class="video fx-row fx-row-center fx-row-space-between" :class="{'active': currentVideo && currentVideo.video === item.video }" @click="pitchOn(index,item)" >
					<view class="videoImgCon">
						<image :src="item.videoImage" mode='aspectFill' class="vImg" style="background-color: #000"></image>
						<!-- <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/bofang.png'" mode="widthFix" class="vBofang"></image> -->
					</view>
					<view class="videoTimeCon">
						<view class="time">视频时长：{{item.videoTime}}</view>
						<view class="date">上传时间:{{item.time}}</view>
					</view>
					<view class="imgCon fx-column fx-row-space-between">
                      <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tuichu.png'" mode="widthFix" class="noImg" @tap.stop="delVideo(item,index)"></image>
                      <image :src="yesImg" mode="widthFix" class="yesImg" v-if="currentVideo && currentVideo.video === item.video"></image>
					</view>
				</view>
			</view>
		</view>

	<!-- 确定按钮 -->
		<view class="BtnCon" >
			<view class="Btn" @click="btnTap">确定</view>
		</view>
	</view>
</template>

<script>
	import {upVideo,uploadFile,formatTime} from '../../js/mzl.js'
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				keyIndex:-1,
				videoList:[],
				userType:2, //视频类型。1：个人视频；2：企业视频
				yesImg:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/gouxuan.png',
				currentVideo: null,
				shopId: 0,
				videoId:'',
			};
		},
		
	  mounted () {
		  this.$api.getUserCardShowVideo(this.currentUser.id, this.shopId).then(result => {
		    if (result.userVideoMap) {
              result.userVideoMap.video = result.userVideoMap.videoUrl;
			}
			if (result.shopVideoMap) {
              result.shopVideoMap.video = result.shopVideoMap.videoUrl;
			}
		    this.currentVideo = this.userType == 2
				? result.shopVideoMap || null
				: result.userVideoMap || null;
		  })
	  },

		methods: {
			//确认选项视频
			btnTap(){
				if(!this.currentVideo){
					this.showTips('请选择视频...');
					return false;
				}
              const video = this.currentVideo;
			  console.log(this.currentVideo)
			  this.setVideoInfo(this.currentVideo)
			  if(this.userType==2){

			    uni.showLoading()
                this.$api.updateVideo(video.id, video.video, video.videoImage, 2, video.videoTime, this.shopId).then(res=>{
                  uni.navigateBack();
                  uni.hideLoading()
                  uni.setStorageSync('_video', video);
				  uni.setStorageSync('_needUpateUserInfo',true);
                }).catch(err => {
                  uni.hideLoading()
				  this.showError(err)
                  console.info(err)
                })

				  // 企业

				  return false;
			  }
			  if(this.userType==1){
				  //个人
				 this.$api.updateVideo(video.id, video.video,video.videoImage,1, video.videoTime).then(res=>{
					console.info(res)
					if(!res){
						uni.navigateBack({
							delta: 1
						});
						uni.setStorageSync('_needUpateUserInfo',true);
					}else{
						this.showTips('请重新确认...');
					}
				}).catch(err=>{
				  this.showError(err)
				})
			  }




			},
				// 获取视屏列表 type 视频类型。1：个人视频；2：企业视频
				listVideoRecord(){
					this.$api.listVideoRecord(this.userType,1).then(res=>{
						if(res.videoList.length>0){
							this.videoList=res.videoList
							for(let i=0;i<this.videoList.length;i++){
								this.videoList[i].time=formatTime(this.videoList[i].time)
							}
						}else{
							this.videoList=[]
						}
					}).catch(err=>{

					})
				},
				upVideoTap(){
				//上传视频 tempFilePath thumbTempFilePath

                  upVideo((url, duration, fileId) => {
                    this.setUserCardShowVideo(url, '', duration, fileId)
                    this.videoUrl = url
                  })
				},
				//上传文件
				uploadFileTap(data){
					return new Promise((YES,NO)=>{
							uploadFile(data,(res)=>{
								if(res){
									YES(res)
								}else{
									this.showTips('文件上传失败');
									NO(res)
								}
							})
					})
				},
				// 保存视频
				setUserCardShowVideo(videoUrl,videoImage,duration, fileId){
			  		uni.showLoading()
                  this.$api.setUserCardShowVideo(videoUrl,videoImage,this.userType,duration, fileId).then(res=>{
                    this.listVideoRecord();
					uni.setStorageSync('_needUpateUserInfo',true);
                    uni.hideLoading()
                  }).catch(err=>{
                    uni.hideLoading()
                    this.showError(err)
                  })
				},

				pitchOn(index,item){//选中要上传的视频
			  		this.currentVideo = item;
					if(this.keyIndex==index){
						this.keyIndex=-1;
					}else{
						this.keyIndex=index
					}


				},
				//删除当前视频
				delVideo(e,index){
					let that=this;
					uni.showModal({
						title: '提示',
						content: '确定删除该视频吗',
						success: function (res) {
							if (res.confirm) {
								uni.setStorageSync('_needUpateUserInfo',true);
								that.deleteVideoTap(e)
							}
							
						}
					});
				},
				deleteVideoTap(video){
					this.$api.deleteVideo(video.id).then(res=>{
						this.videoList = this.videoList.filter(o=>o.id!=video.id)
						if (video.id == this.currentVideo.id) {
							this.$api.setUserCardShowVideo('', '', this.userType, 0, 0);
							this.currentVideo = null;
							this.setVideoInfo("")
						}
					}).catch(err=>{
						console.info(err)
					})
				},
				//Vuex引入方法
					...mapMutations(['setVideoInfo'])
				  },
				  //注册组件
				  components:{
				   
				  },
				//监听计算属性
				  computed: {
				   	//Vuex引入属性
					...mapState(['VideoInfo'])
				  },


				// 监听页面加载
				  onLoad: function (e) {
					this.userType= e.type || 1;

					if (this.userType == 2) {
                      uni.setNavigationBarTitle({
						title: '企业视频'
                      })
					  this.shopId = e.shopId;
					  this.videoId = e.videoId;
					}

				  	this.listVideoRecord()
				  },
				  // 监听页面显示
				  onShow: function () {
				   console.log('监听页面显示2');
				  },
				  //监听页面隐藏
				  onHide: function () {
				   console.log('监听页面隐藏');
				  },
				  
				  // 监听页面卸载
				  onUnload: function () {
				   console.log('监听页面卸载');
				  },
				  //监听下拉刷新
				  onPullDownRefresh() {
				   console.log('onPullDownRefresh');
				   
				  },
				  //监听上拉刷新
				  onReachBottom() {
				   console.log('onReachBottom');
				  },
	}
</script>

<style lang="less">

	.videoCon{width: 92%;height: 124upx; margin: 42upx auto;border: 1px dashed #6B7AF8;font-size: 28upx;color: #6B7AF8;margin-right:24upx;
		&>image{width: 40upx;height: 25upx;margin-right: 24upx;}
	}
	.active{background: #F7F7FF;border: 1px solid #CBCBFF;}
	.video{
		width: 92%;height: 180upx;margin: 0 auto;border-radius:8upx ;box-sizing: border-box;padding:20upx;font-family: PingFangSC;margin-bottom: 24upx;border:1px solid #E1E1E1;
		.videoImgCon{
			position:relative;width:22%;margin-right:28upx;
			.vImg{width: 140upx;height: 140upx;border-radius: 4upx;}
				.vBofang{width: 50upx;height: 50upx;position: absolute; left: 50%;top: 50%;margin-top: -25upx;margin-left:-25upx;}
		}
		.videoTimeCon{
			width: 72%;
			.time{font-size: 30upx;color: #333333;margin-bottom: 12upx;}
			.date{font-size: 24upx; color: #666666;}
		}
		.imgCon{
			width: 5%;height: 100%;
			.noImg{width: 22upx;height: 22upx;}
			.yesImg{width: 28upx;height: 22upx;}
		}
}
	.BtnCon{
			position: fixed;bottom: 0;z-index: 99;width: 100%;height:98upx;text-align: center;background: #FFFFFF;
			.Btn{
				width:620upx ;height: 80upx;line-height: 80upx;margin: 10upx auto;font-size:28upx ;color: #FFFFFF;background: #6B7AF8;border-radius: 40upx;
			}
		}
</style>
