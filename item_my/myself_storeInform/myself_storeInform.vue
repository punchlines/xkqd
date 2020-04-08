<template>

  <view class="container top">
    <!-- 店铺logo -->
    <view class="storeLogo fx-row fx-row-center fx-row-space-around">
      <view class="SLname fs3a28" @click="uploadLogo">店铺logo</view>
      <view class="SLimage" @click="uploadLogo">
				<default-image :src="shoreLogo" custom-class="SLimg"></default-image>
        <!-- <image class="SLimg" :src="shoreLogo" alt=""></image> -->
      </view>
    </view>
    <!-- 店铺名称 -->
    <view class="storeName fx-row fx-row-center fx-row-space-around borderB">
      <view class="SNtitle fs3a28">店铺名称</view>
      <view class="SNinput fs6a28">
        <input type="text" v-model="shopName" placeholder="">
      </view>
    </view>
    <!-- 店铺品类 -->
    <view class="storeCategory fx-row fx-row-center fx-row-space-around" @click="gotoShopCategory">
      <view class="SCtitle fs3a28">品类</view>
			<!-- @click="gotoShopCategory" -->
      <view class="SCinput fs6a28" >{{shopClassify}}</view>
      <view class="SCgoto">
        <image class="SCimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
      </view>
    </view>
    <!-- 所在地 -->
    <view class="storeName storeCategory fx-row fx-row-center fx-row-space-around borderB">
      <view class="SCtitle fs3a28">所在地</view>
			<!-- @click="showMulLinkageThreePicker" -->
			 <picker  class="perRight fx-row fx-row-space-between fx-row-center" style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-left: 43upx;color: #666;" mode="region"  @change="regionChange" @onConfirm="onConfirm">
				<view style="font-size:28upx;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					<text>
						{{province}}--
					</text>
					<text>
						{{city}}--
					</text>
					<text>
						{{area}}
					</text>
				</view>
			</picker>
			
			
    </view>
    <!--详细地址  -->
    <view class="storeCategory adressDetail fx-row fx-row-center fx-row-space-around borderB">
      <view class="SCtitle fs3a28">详细地址</view>
			<view class="SCinput fs6a28">
				<input  v-model="address" placeholder="请输入详细地址">
			</view>
    </view>
    <!-- 宣传视频 -->
    <view class="storeCategory fx-row fx-row-center fx-row-space-around"  @click="UploadVideo">
      <view class="SCtitle fs3a28">宣传视频</view>
			<!-- @click="UploadVideo" -->
      <view class="SCinput fs6a28">时长 {{videoTime}}</view>
      <view class="SCgoto">
        <image class="SCimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
      </view>
    </view>
    <!-- 按钮 -->
    <view class="saveInform">
      <view class="SIbtn fs3a32" @click="updateShopData">保存</view>
    </view>
  </view>
</template>

<script>
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import mzlJS from '../../js/mzl.js';
	import {mapState,mapMutations} from 'vuex';
  export default {
    data () {
			return {
				shoreLogo:'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/more.png',
				// shoreLogo:'',
				themeColor: '#6B7AF8',
				src: '',
				videoUrl:'',
				videoTime:'',
				videoImage:'',
				shopName:'',
				//shopClassify:"科学",
				shopClassifyId:'',//品类分类
				shopInfo:[],
				address:'',
				province:'广东省',
				city:'广州市',
				area:'白云区',
				currentVideo: {},
			}
    },
	components:{
		mpvueCityPicker,
	},
	computed: {
		shopClassify(){
			//return this.cate.map(item => item.name).join(' ');
			return this.itemShopClassify.name || this.itemShopClassify;
		},
		
		
		...mapState(['itemShopClassify'])
	},
    methods:{
			...mapMutations(['setItemShopClassify']),
			// 获取店铺资料
			getShopDetail(){

			  if (!this.shopId) {
					uni.redirectTo({
						url:'/item_businessCard/businessCard_ShopInfo/step2_1/step2_1'
					})
			    return;
				}

				this.$api.getShopDetail(this.shopId).then(res=>{
					console.log(res);
					this.shopInfo=res.shopData;
					this.shoreLogo=res.shopData.logo;
					this.shopName=res.shopData.shopName;
					this.province=res.shopData.province;
					this.area=res.shopData.area;
					this.city=res.shopData.city;
					this.address=res.shopData.address;
					this.setItemShopClassify(res.shopData.shopClassify);
					//this.shopClassify=res.shopData.shopClassify;					
					this.videoTime= Number(res.shopData.videoTime) ? mzlJS.formateSeconds(res.shopData.videoTime) : res.shopData.videoTime;
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 修改品类
			gotoShopCategory(){
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_ShopIndustryCategory/businessCard_ShopIndustryCategory?fromMyself=1'
				});
			},
		
			regionChange(e){			
				this.province = e.detail.value[0];
				this.city = e.detail.value[1];
				this.area = e.detail.value[2];
					console.log(this.province);
			},
			// 选择的省市区
			onConfirm(e) {
				const data = e.label.split('-').join('');
				console.log(e);
				this.province = data.value1[0];
				this.city = data.value1[1];
				this.area = data.value1[2];
			},
			// 上传店铺logo
			uploadLogo(){
				mzlJS.upImg(res=>{
					console.info("上传图片："+res);
					this.shoreLogo=res;
				})
			},
			//上传视频
			UploadVideo(){
				console.log(231231312312)
				uni.navigateTo({
					url: '/item_businessCard/businessCard_UpVideo/businessCard_UpVideo?type=2&shopId=' + this.shopId
				});
			},
			//上传文件
			uploadFileTap(data){
				console.info(2222)
				return new Promise((YES,NO)=>{
					console.info(333)
						mzlJS.uploadFile(data,(res)=>{
							console.info(res)
							if(res){
								YES(res)
							}else{
								this.showTips('文件上传失败');
								NO(res)
							}
						})
				})
			},
			//修改店铺资料
			updateShopData(){
				
				let logo=this.shoreLogo;
				let shopName=this.shopName;
				let province=this.province;
				let city=this.city;
				let area=this.area;
				let shopClassifyId = this.shopClassifyId || this.itemShopClassify.id;
				let address=this.address;
				console.log(logo,shopName,province,address);
				if(!logo){
					this.showTips('店铺logo不能为空').then(res=>{})
					return;
				}
				if(!shopName){
					this.showTips('店铺名不能为空').then(res=>{});
					return;
				}else if(shopName.length>20){
					this.showTips('店铺名不能超过20个字符').then(res=>{});
					return;
				}
				
				
				this.$api.updateShopData(this.shopId,logo,shopName,province,city,area,address,shopClassifyId).then(res=>{
					console.log(res);
					this.showTips('修改成功').then(res=>{
						uni.switchTab({
								url: '/pages/myself/myself'
						});
					})
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 修改展示视频  后台存缓存数据
			updateVideo(){
			    uni.showLoading();
				this.$api.updateVideo(this.currentVideo.id, this.currentVideo.video, '', 2, this.currentVideo.videoTime, this.shopId).then(res=>{
					console.info(res);
                  uni.hideLoading()
				}).catch(error=>{
                  uni.hideLoading()
					this.showError(error);
				})
			}
		},
		onLoad(options){
			console.log(options)
			if(options.id){
				this.value1 = [options.province,options.city,options.area];
			}
			this.shopId=uni.getStorageSync('shopId');
			this.address = options.address;
			// console.log(options.shopClassifyName);
			//this.shopClassify=options.shopClassifyName;
			this.shopClassifyId=options.id;
			this.getShopDetail();
		},
    onShow () {
      const video = uni.getStorageSync('_video');
      if (video) {
        this.currentVideo = video;
        this.videoTime = video.videoTime;
        uni.removeStorageSync('_video');
      }
    }
  }

</script>

<style lang="less">

  @import '../../css/mzl_base.less';
  .page{width:100%;height: 100%;background:@grayBg;}
  .container{
    background:@grayBg;width:100%;height: 100%;
    // 店铺logo
    .storeLogo{
      width:100%;height: 170upx;background: #fff;margin-top:40upx;line-height:170upx;padding:0 30upx;
      .SLname{width:50%;text-align: left;}
      .SLimage{
        width:50%;text-align:right;
        .SLimg{width:120upx;height: 120upx;vertical-align: middle;}
      }
    }
    // 店铺名称
    .storeName{
      margin-top:30upx;background: #fff;padding:30upx;
      .SNtitle{width:25%;text-align:left;}
      .SNinput{
        width:75%;text-align:left;
        input{border:none;}
      }
    }
    // 店铺品类
    .storeCategory{
      background: #fff;padding:30upx;
      .SCtitle{width:25%;text-align: left;}
      .SCinput{width:60%;text-align: left;}
      .SCgoto{
        width:15%;text-align:right;
        .SCimage{width:12upx;height: 24upx;vertical-align: middle;}
      }
    }
    // 公司
    .storeCommany{margin-top:30upx;}
    // 详细地址
    .adressDetail{
      .SCtitle{width:25%;text-align: left;}
      .SCinput{width:75%;height:40upx;text-align:left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    }
    // 按钮
    .saveInform{
      width:100%;margin:100upx 0;
      .SIbtn{
        .buttonRadius();color:#fff;margin:0 auto;
      }
    }
  }


</style>
