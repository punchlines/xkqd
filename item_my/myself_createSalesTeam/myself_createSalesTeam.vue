<template>

  <view class="container">
    <view class="createSalesG">
      <!-- 小组logo -->
      <view class="CSgroup fx-row fx-row-center fx-row-space-around">
        <view class="Gname fs3a28">小组logo</view>
        <view class="Gimage" @click="uploadImage">
          <image class="Gimg" :src="avatarUrl?avatarUrl:'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'" alt=""></image>
        </view>
      </view>
      <!-- 小组名称 -->
      <view class="GroupName fx-row fx-row-center fx-row-space-around">
        <view class="GNname fs3a28">小组名称</view>
        <view class="GNinput fs3a28">
          <input type="text" placeholder="请输入小组名称"  v-model="name"/>
        </view>
      </view>
      <!-- 创建小组 -->
      <view class="groupButton">
        <view class="GBbtn" @click="gotoStaffManage">创建小组</view>
        <view class="BtnDescrip fs3a28">创建成功后，最多可招募100人</view>
      </view>
    </view>
  </view>

</template>

<script>
	import {upImg} from '../../js/mzl.js';
  export default {
    data () {
      return {
				onlineSite:this.global.onlineSite,
        imageURL:'',//图片路径
				name:'',//创建销售小组
				avatarUrl:'',//
      }

    },
    methods:{
			// 上传图片
			uploadImage(){
				upImg(res=>{
					console.log(res);
					this.avatarUrl=res;
				});
			},
			// 创建销售小组
			gotoStaffManage(){
				let shopId=uni.getStorageSync('shopId');
				console.log(shopId);
				if(this.avatarUrl&&this.name){
					this.$api.insertShopGroup(shopId,this.avatarUrl,this.name).then(res=>{
						console.log(res.groupId);
						uni.setStorageSync('groupId',res.groupId)
						this.showTips('创建成功').then(result=>{
							uni.navigateTo({
								url: '../../item_my/myself_staffManage/myself_staffManage'
							});
						})
					}).catch(error=>{
						this.showError(error);
					})
				}else{
					this.showTips('请完善创建小组的基本信息').then(res=>{})
				}
			},
    }
  }
</script>

<style scoped lang="less">


	@import '../../css/mzl_base.less';
  .container{
    background:@grayBg;width:100%;height:100%;position: fixed;
    .createSalesG{
      .CSgroup{
        background: #fff;padding:30upx;margin-top:30upx;
        .Gname{width:80%;}
        .Gimage{
          width:20%;
          .Gimg{width:120upx;height: 120upx;vertical-align: middle;}
        }
      }
      .GroupName{
        margin-top:30upx;background: #fff;padding:30upx;
        .GNname{width:30%;}
        .GNinput{width:70%;}
      }
      .groupButton{
        margin:100upx auto;
        .GBbtn{
          .buttonRadius();font-size: 32upx;color:#fff;margin:0 auto;
        }
        .BtnDescrip{
          text-align: center;margin:30upx 0;color:#999;
        }
      }
    }
}


</style>