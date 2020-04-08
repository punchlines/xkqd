<template>
	<view class="editCardCon">
		<!-- 个人头像 -->
		<view class="perAva fx-row fx-row-space-between fx-row-center" @click="uploadLogo">
			<text>个人头像</text>
			<default-image :src="avatarImg" custom-class="avatar"></default-image>
		</view>

		<!-- 默认背景 -->
		<view v-if="cardbgId==1" class="perBg fx-row fx-row-space-between fx-row-center" @click="changeBg">
			<text>名片背景</text>
			<view class="moRen">默认</view>
		</view>
		<!-- 名片背景 -->
		<view v-else class="perBg fx-row fx-row-space-around fx-row-center" @click="changeBg">
			<view class="pertitle">名片背景</view>
			<view class="perImage">
				<image :src="imageUrl"></image>

			</view>
		</view>

		<!-- 个人视频 -->
		<view class="perVideo oneList fx-row fx-row-center fx-row-left fx-row-middle" @click="toUpVideo">
			<view class="left">个人视频</view>
			<view class="perRight fx-row fx-row-space-between">
				<input placeholder="上传个人视频" :value="VideoInfo.id||ifExistUserVideo==1?'已选':''"  placeholder-class="hintMessage" disabled="disabled"></input>
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image>
			</view>
		</view>
		<!-- 姓名 -->
		<view class="perName oneList fx-row fx-row-center fx-row-left">
			<text class="left">姓名</text>
			<input type="text"  v-model="userDetails.name" placeholder="个人名字"    />
		</view>
		<!-- 职位 -->
		<view class="perPosition oneList fx-row fx-row-center fx-row-left">
			<text class="left">职位</text>
			<input type="text" v-model="userDetails.job" maxlength="8" />
		</view>
		<!-- 公司学校 -->
		<view class="perSC oneList fx-row fx-row-center fx-row-left">
			<text class="left">公司/学校</text>
			<input type="text" v-model="userDetails.company" maxlength="20" />
		</view>
		<!-- 其他联系方式-->
		<view class="other oneList fx-row fx-row-center fx-row-left">
			<text class="left">其他联系方式</text>
			<input type="text" placeholder="手机号码/座机需要加-" placeholder-class="hintMessage" v-model="userDetails.otherConnection" maxlength="12" />
		</view>
		<!-- 签名 -->
		<view class="perQian oneList fx-row fx-row-center fx-row-left" @click="toAutograph">
			<text class="left">签名</text>
			<view class="perRight fx-row fx-row-space-between">
				<input type="text" placeholder="个人介绍" placeholder-class="hintMessage" disabled="disabled" v-model="userDetails.autograph"></input>
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image>
			</view>
		</view>
		<!-- 生日 :range="date"-->

		 <picker class="picker-item" mode="date"  @change="dateChange" start="1900-01-01" :end="endDate" :value="userDetails.birthday">
				<view class="perBirth oneList fx-row fx-row-center fx-row-left">
					<text class="left">生日</text>
					<view class="perRight fx-row fx-row-space-between fx-row-center">
						<input type="text" placeholder="请选择您的生日年月日" placeholder-class="hintMessage" :value="userDetails.birthday" disabled ></input>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image>
					</view>
				</view>
		</picker>

		<!-- 地址 -->
			<view class="perAddress oneList fx-row fx-row-center fx-row-left">
				<text class="left">地址</text>
				<view class="perRight fx-row fx-row-space-between fx-row-center">
					<input placeholder="住址/常住地/公司地址等" placeholder-class="hintMessage" disabled="disabled"  @click="showMulLinkageThreePicker" :value="userDetails.address"></input>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image>
				</view>
			</view>

		<!-- 详细地址 -->
		<view class="perEmail oneList fx-row fx-row-center fx-row-left">
			<text class="left">详细地址</text>
			<input type="text" value="userDetails.addressDetail" placeholder="请输入详细地址" placeholder-class="" v-model="userDetails.addressDetail" />
		</view>

		<!-- 邮箱 -->
		<view class="perEmail oneList fx-row fx-row-center fx-row-left">
			<text class="left">邮箱</text>
			<input type="email"  placeholder="请输入邮箱" placeholder-class="" v-model="userDetails.email" />
		</view>
		<!-- URL -->
		<view class="perUrl oneList fx-row fx-row-center fx-row-left">
			<text class="left">URL</text>
			<input type="text" placeholder="个人博客/官网等" placeholder-class="" v-model="userDetails.personalUrl" />
		</view>
		<!-- 保存按钮 -->
		<wx-view>
			<view class="btn" @click="updateUserCard">保存</view>
		</wx-view>
		
		<!--城市三级联动 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm">
		</mpvue-city-picker>
		<!--城市三级联动 -->

		<view v-if="isAutograph" class="batc" @click="toAutograph" >
			<Autograph :autograph="userDetails.autograph"  @autographTap='autographCallback' ></Autograph>
		</view>

	</view>
</template>

<script>
  import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
  import Autograph from "../../components/businessCard_Autograph_components.vue";
  import {mapState,mapMutations} from 'vuex';

	import { CARD_BACKGROUND } from '@/js/constant';


	function validateEmail(email) {
    //var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }


  export default {
    data() {
      return {
        onlineSite:this.global.onlineSite,
        userId:'',
        userDetails:{},
        date:'',
        cityPickerValueDefault: [0, 0, 1],
        themeColor: '#6B7AF8',
        pickerValueDefault: [0],
        pickerText:'',
        isAutograph:false,//是否显示个人签名弹框
		ifExistUserVideo:0,//是否有用户视频 0没有 1有
		bg1:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/bg.png',
		bg2:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/bg2.png'
      };
    },

    components:{
      mpvueCityPicker,Autograph
    },
    methods: {
			//获取名片信息
      getUserCardDetails(){
        uni.showLoading();
        return new Promise((res,rej)=>{
          this.$api.getUserCardDetails(this.userId,this.userId).then(result => {
			this.getCardbgId(result.userMap.cardBackgroundId);
			this.setAvatar(result.userMap.headImage);
            this.userDetails = result.userMap;
			this.ifExistUserVideo=result.ifExistUserVideo
			console.info(result)
			res();
			uni.hideLoading();
          }).catch(error => {
            uni.hideLoading();
            rej(error)
            console.error(error)
          })
        })
      },
      // 三级联动选择选择省市区
      showMulLinkageThreePicker() {
        this.$refs.mpvueCityPicker.show()
      },
      // 选择的省市区
      onConfirm(e) {
        this.pickerText = e.label;
				this.userDetails.address= e.label;
      },
      // 获取用户头像
      uploadLogo(){
        var that = this;
		
		uni.showActionSheet({
			itemList:["从模板库选取","从相册或拍照上传"],
			success: (res) => {
				if(res.tapIndex==1){
					uni.chooseImage({
					  count: 1,
					  success: (res) => {
					    that.tempFilePath = res.tempFilePaths[0]
							this.uniUploadFile(that.tempFilePath, url => {
								that.userDetails.headImage = url;
								that.setAvatar(url);
							})
					  }
					});
				}else if(res.tapIndex==0){
					//跳转到模板页面
					this.navigateTo('/item_businessCard/businessCard_Background/businessCard_Background?mode=1');
					
				}
			}
		})
        
      },
      toUpVideo(){//上传个人视频
        uni.navigateTo({
          url: '../businessCard_UpVideo/businessCard_UpVideo?type=1'
        });
      },
      dateChange(evt){//选择日期
        this.date = evt.detail.value;
        this.userDetails.birthday = evt.detail.value;
      },
      toAutograph(){//签名
        this.isAutograph=!this.isAutograph
      },
      autographCallback(e){
        console.info(e);
        this.userDetails.autograph=e;
        console.info(this.userDetails.autograph)
        this.toAutograph()
      },
      changeBg(){//切换名片背景
        uni.navigateTo({
          url: '../businessCard_Background/businessCard_Background'
        });
      },
      saveInfo(){//保存个人名片信息
        uni.navigateTo({
          url: '../myself/myself'
        });
      },
      // 选择地址
      cityChange(){

      },
      aaTap(){
        console.info(this.userDetails.name)
      },
      //编辑用户信息
      updateUserCard(){
      	if (this.userDetails.name.trim().length === 0) {
			this.showTips('请输入姓名')
			return;
		}else if(this.userDetails.name.length>11){
			this.showTips('姓名最多输入11个字符')
			return;
		}
		if (this.userDetails.job.trim().length === 0) {
			this.showTips('请输入职位')
			return;
		}
		if (this.userDetails.company.trim().length === 0) {
			this.showTips('请输入公司/学校')
			return;
		}
        if (this.userDetails.email && !validateEmail(this.userDetails.email.trim())) {
          this.showTips('请输入有效的邮箱')
          return;
		}
        if (this.userDetails.personalUrl && !this.userDetails.personalUrl.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) {
          this.showTips('请输入有效的URL')
          return;
        }
				if (this.userDetails.otherConnection && !this.userDetails.otherConnection.match(/^(((0|4)\d{2,3}-\d{7,8})|(1[3679584]\d{9}))$/)) {
					this.showTips('请输入有效的电话/座机号')
					return;
				}

        let data={
          userId:this.userId,//用户id
          headImage:this.avatarImg,//用户头像
          cardBackgroundId:this.cardbgId,//背景id2期
          userVideo:'',//视频url
          name:this.userDetails.name,//用户昵称
          job:this.userDetails.job,//职位
          company:this.userDetails.company,//公司/学校名
          autograph:this.userDetails.autograph,//个性签名
          birthday:this.userDetails.birthday,//生日
          otherConnection:this.userDetails.otherConnection,//电话
          address:this.userDetails.address,//地址
		  addressDetail:this.userDetails.addressDetail,//详细地址
          email:this.userDetails.email,//邮箱
          personalUrl:this.userDetails.personalUrl,//博客
        }
        uni.showLoading();
        this.$api.updateUserCard(data).then(res=>{
          uni.hideLoading();
          this.showTips('保存成功').then(() => {
					uni.setStorageSync('_needUpateUserInfo',true);
								uni.navigateBack();
					})
        }).catch(error =>{
          uni.hideLoading();
          this.showError(error)
		})
      },
			//Vuex引入方法
				...mapMutations(['setVideoInfo','getCardbgId','getCardbgUrl','setAvatar'])
    },
    computed: {
      //Vuex引入属性
      ...mapState(['cardUserId','UPinfo','VideoInfo','cardbgId','cardBgImage','avatarImg']),
      endDate () {
        return this.formatDate(new Date(), 'YYYY-MM-DD')
      },
			imageUrl () {
				const find = CARD_BACKGROUND.find(item => item.id == this.cardbgId);
				return find ? find.image : '';
			},
    },
    // 监听页面加载
    onLoad: function (options) {
      this.userId =  options.userId || this.currentUser.id ;
			this.setVideoInfo("")
      this.getUserCardDetails();
    },
    // 监听页面显示
    onShow: function () {
      console.log('监听页面显示1');

    },
    //监听页面隐藏
    onHide: function () {
      console.log('监听页面隐藏1');

    },

    // 监听页面卸载
    onUnload: function () {
      console.log('监听页面卸载1');

    },


  }
</script>

<style lang="less">

@import "../../css/jss_base.less";
.editCardCon{
	width: 100%;background:#F5F5F5;font-size: 28upx;color: #333333;font-family: PingFangSC;box-sizing:border-box;padding-bottom:41upx;
	.hintMessage{
		font-size:28upx;color:#cccccc;font-family:PingFangSC;
	}
	.left{width: 28%;font-size:28upx;text-align: left;}
	.perRight{
		width:72%;text-align: left;
		align-items: center;
		input{width:90%;}
	}
	.go{width:14upx;height:24upx;}
	.perAva{
		width:100%;background:#ffffff;box-sizing:border-box;padding:25upx 30upx;border-bottom:1px solid #E1E1E1;
			.avatar{width: 120upx;height: 120upx;}
		}
	.perBg{
		width: 100%;height: 170upx;box-sizing:border-box;padding:0 30upx;margin-bottom:24upx; background: #FFFFFF;
		.pertitle{width:50%;text-align: left;}
		.perImage{
			width:50%;text-align: right;
			image{
				width: 210upx;height: 116upx;
			}
		}
		.moRen{width: 210upx;height: 116upx;line-height: 116upx; text-align:center;background:#F5F5F5;font-size: 26upx;color: #666666;}
	}
	.oneList{
		width: 100%;height: 106upx; background: #FFFFFF;box-sizing:border-box;padding:0 30upx;border-bottom: 1px solid #E1E1E1;
	}
	.perQian{border: none;margin-bottom: 24upx;}
	.perUrl{border: none;margin-bottom:100upx;}
	.btn{
		.buttonRadius();
		margin: 0 auto;margin-bottom: 41upx;line-height: 88upx;text-align: center;color: #FFFFFF;font-size: 32upx;font-family: PingFangSC;
	}
}
</style>
