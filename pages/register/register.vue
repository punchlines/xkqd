<template>
	<view class="container">
			<!-- 头像上传 -->
			<view class="HeaderInfor fx-row fx-row-center fx-row-space-around">
				<view class="HItitle fs3a28">个人头像</view>
				<view class="HIimage" @click="uploadLogo">
					<image :src="avatarUrl ? avatarUrl : 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 用户基本信息 -->
			<view class="UserInfor">
				<!-- 姓名 -->
				<view class="UIName fx-row fx-row-center fx-row-space-around borderB">
					<view class="Ntitle fs3a28">姓名</view>
					<view class="Ninput fs3a28">
						<input type="text" maxlength="8" v-model="nickName" placeholder="请输入您的用户名">
					</view>
				</view>

				<view class="UIName fx-row fx-row-center fx-row-space-around borderB" style="margin-top: 0; border-bottom: 0" v-if="isShowAuthPhone">
					<view class="Ntitle fs3a28">手机号</view>
					<view class="Ninput fs3a28 form-control">
						<view v-if="authPhone" style="color: #666666; flex: 1">{{ authPhone }}</view>
						<button v-else class="phone-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">点击授权微信手机号</button>
						<image class="change-icon" src="http://card-1254165941.cosgz.myqcloud.com/images/zhuanhuan@3x.png" @click="isShowAuthPhone = false"></image>
					</view>
				</view>

				<template v-else>
					<!-- 手机号码 -->
					<view  class="UIphone fx-row fx-row-center fx-row-space-around borderB">
						<view class="PareaCode fs3a28" @click="getPhoneCode">
							+86 <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/down.png'"></image>
						</view>
						<view class="PinputP fs3a28">
							<input type="number" maxlength="11" minlength="7" v-model="phone" placeholder="请输入手机号码">
						</view>
						<view class="PgetCode" @click="CheckGetCode">
							<view v-show="show" class="CodeNum fs3a28">{{getCodeText}}</view>
							<view v-show="!show" class="CodeNum fs3a28">{{count}} s</view>
						</view>
						<image class="change-icon" src="http://card-1254165941.cosgz.myqcloud.com/images/zhuanhuan@3x.png" v-if="!isApp" @click="isShowAuthPhone = true"></image>
					</view>

					<!-- 验证码 -->
					<view class="UIName fx-row fx-row-center fx-row-space-around" style="margin-top: 0">
						<view class="Ntitle fs3a28">验证码</view>
						<view class="Ninput fs3a28">
							<input type="number" placeholder="请输入验证码"  v-model="codeValue">
						</view>
						<!-- 测试直接获取到验证码到页面使用，后期删掉 -->
						<!--<view>{{GetCode}}</view>-->
					</view>
				</template>

			</view>
			<!--职位  -->
			<view class="UIName fx-row fx-row-center fx-row-space-around borderB">
				<view class="Ntitle  fs3a28">职位</view>
				<view class="Ninput fs3a28">
					<input type="text" maxlength="10" placeholder="请输入职位名称"  v-model="job">
				</view>
			</view>
			<view class="UIName UIName2 fx-row fx-row-center fx-row-space-around">
				<view class="Ntitle fs3a28">公司/学校</view>
				<view class="Ninput fs3a28">
					<input type="text" maxlength="30"  placeholder="请输入公司/学校名称"  v-model="Company">
				</view>
			</view>
			<!--《外贸圈用户协议》  -->
			<view class="ReadMement">
				<view class="RMimage">
					<image @click="AgressMen" v-if="showImage" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/register/chose_un.png"></image>
					<image @click="AgressMen" v-else src="http://card-1254165941.cosgz.myqcloud.com/cardImages/register/chose.png"></image>

					<text class='RMtitle fs6a24'>阅读并接受</text>
					<text class="RMmenent fs6a24" @click="openUserAgreement">《用户协议》</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="CreateButton">
				<!--  @click="CreateCard" -->
				<view class="Cbtn fs3a32" @click="CreateCardInfo">创建</view>
				<view class="Cpreview fs6a30" @click="previewCard">预览名片</view>
			</view>
			<!-- 弹出层 -->
			<view class="container3" v-if="showPopus">
			<view class="popup fs3a28" @click="prevention">
				<!-- 预览名片 -->
				<view class="previewCard" v-if="showPcard">
					<view class="PCheader fx-row fx-row-center fx-row-space-around">
						<view class="Himage">
							<image :src="avatarUrl ? avatarUrl : ''" mode="aspectFit"></image>
						</view>
						<view class="Htitle">
							<view class="HNname">
								<text class="nName fs3a32">{{nickName}}</text>
								<text v-if="job" class="nJob">{{job}}</text>
							</view>
							<view class="Hcompany fs9a24">{{Company}}</view>
						</view>
					</view>
					<view class="PCPhone">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/fill_1.png'"></image>
						<text v-if="isShowAuthPhone" class="Phone">{{ authPhone }}</text>
						<text v-else class="Phone">{{ phone }}</text>
					</view>
					<view class="Pdelete" @click="closeCard">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/tuichu.png'"></image>
					</view>
				</view>
			</view>
			</view>


		<view class="shouquanModel fx-row fx-row-center" v-show="authShow">
			<view class="shouquanCon fx-column fx-row-center fx-col-center">
				<view class="title">微信授权</view>
				<view class="logoCon fx-column fx-row-center fx-col-center">
					<image src="http://card-1254165941.cosgz.myqcloud.com/logo/icon.png" class="logoImg"></image>
					<text class="logoName">销刻渠道</text>
				</view>
				<view class="tishi">*获取你的公开信息（头像/昵称）</view>
				<view class="opCon fx-row fx-row-center fx-col-center">
					<view class="no" @click="authShow = false" >拒绝</view>
					<view class="line"></view>
					<button plain="true" class="yes" lang="zh_CN" open-type="getUserInfo" @getuserinfo="WXgetUserInfor">允许</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				showImage:false,
				showPopus:false,//弹出层
				showLocation:false,//地理位置授权
				showPcard:false,//预览名片
				showWXgetUserInfo:false,//微信授权
				createCard:false,//创建名片信息成功后，预览
				GetPhone:'',//授权的手机号码
				nickName:'',//昵称
				avatarUrl:'',//头像
				getCodeText:'获取验证码',//获取验证码
				// showEenterP:false,//输入手机号
				showAuthor:true,//微信授权手机号码
				phone:'',//输入的手机号码
				codeValue:'',//用户输入的验证码
				codeStatus:true,//验证码是否正确-开发阶段是true
				job:'',//职位
				Company:'',//公司
				countdown:60,
				show: true,
				count: '',
				timer: null,
				token:null,
				cardUserId: '',
				isShowAuthPhone: true,
				authPhone: '',
				isDefault: false,
				isApp: false,
				redirectPath: '',
        authShow: false,
			}
		},

		methods:{
			getPhoneNumber (e) {
				console.log(e)
				let { iv, encryptedData, errMsg } = e.detail;
				console.log(e)
				if (errMsg && errMsg.indexOf('fail') !== -1) return;
				if(e.target){
					let errMsg2 = e.target.errMsg;
					if(errMsg2 && errMsg2.indexOf('deny')!==-1) return;
				}
			
				uni.showLoading();
				
				encryptedData  = encodeURIComponent(encryptedData).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
					return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
				});
				
				iv  = encodeURIComponent(iv).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
					return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
				});
				this.token = uni.getStorageSync('token');
				this.$api.WXDecrypt(encryptedData, iv, this.token).then(res=>{
					
					this.authPhone = JSON.parse(res).phoneNumber;
						uni.hideLoading();
				}).catch(error=>{
						uni.hideLoading();
						this.showError(error)
				});
				
			
			},

			// 手机区号
			getPhoneCode(){
				uni.navigateTo({
					url: '../register_SelectZone/register_SelectZone'
				});
			},
			// 获取用户头像
			uploadLogo(){
				var that = this;
				uni.chooseImage({
					count: 1,
					success: (res) => {
						that.tempFilePath = res.tempFilePaths[0]
						uni.showLoading();
						this.uniUploadFile(that.tempFilePath, url => {
							that.avatarUrl = url;
							uni.hideLoading();
						})
					}
				})
			},
			// 同意条款
			AgressMen(){
				this.showImage=!this.showImage;
			},
			// 不允许地理位置授权
			rejLocation(){
				this.showPopus=false;//弹出层
				this.showLocation=false;//地理位置
				this.showPcard=false;//预览名片
				this.showWXgetUserInfo=false;//app授权用户信息
			},
			// 同意地理位置授权
			agreeeLocation(){
				this.showPopus=true;//弹出层
				this.showLocation=false;//地理位置
				this.showPcard=false;//预览名片
				this.showWXgetUserInfo=true;//app授权用户信息
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
			// app拒绝微信授权用户信息
			rejuctGetUser(){
				this.showPopus=false;//弹出层
				this.showLocation=false;//地理位置
				this.showPcard=false;//预览名片
				this.showWXgetUserInfo=false;//app授权用户信息
				uni.setStorageSync("userInfo", '');
			},
			// app同意微信授权
			getUserInfor(){
				this.showPopus=false;//弹出层
				this.showLocation=false;//地理位置
				this.showPcard=false;//预览名片
				this.showWXgetUserInfo=false;//app授权用户信息
				var that=this;
				uni.login({
					provider: 'weixin',
					success: function (loginRes) {
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success:function(infoRes){
								uni.setStorageSync("userInfo", infoRes);
								console.log('用户昵称为：' + infoRes.userInfo.nickName);
								console.log('用户头像是：'+ infoRes.userInfo.avatarUrl);
								that.nickName=infoRes.userInfo.nickName || '';
								that.avatarUrl=infoRes.userInfo.avatarUrl || '';
							}
						});
					}
				});
			},
			prevention(){},
			// 验证码倒计时60s
			getCode(){
				const TIME_COUNT = 60;
				if(!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						}else{
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			// 获取验证码
			CheckGetCode(){
				if(!this.phone.match(/\d{11}/)){
					this.showTips('手机号码有误，请重填').then(res=>{});
					return false;
				}else{
					console.log(this.phone);
					this.showTips('验证码在发送中，请注意查收验证码').then(res=>{});
					this.$api.sendSms(this.phone,1).then(res=>{
						this.getCode();
						//console.log(res);
						//this.GetCode=res.code;
					})
				}
			},
		

			// 创建名片
			CreateCardInfo(){
				this.token = uni.getStorageSync('token');
				let phoneNum=this.GetPhone?this.GetPhone:this.phone;

				if (!this.avatarUrl) return this.showTips('请上传头像');

				if (!this.nickName.trim()) return this.showTips('请输入姓名');
				if (this.isShowAuthPhone && !this.authPhone) {
					this.showTips('请授权手机号或手动输入手机号')
					return;
				}
				if (!this.isShowAuthPhone && !this.phone) {
					this.showTips('请输入手机号')
					return;
				}
				
				if(!this.isShowAuthPhone && (this.codeValue=="" || !this.codeValue)){
					this.showTips('验证码输入错误，请检查').then(res=>{})
					
					return;
				}
				
				if (!this.job.trim()) return this.showTips('请输入职位');
				if (!this.Company.trim()) return this.showTips('请输入公司/学校');

				this.showTips('请阅读并接受《外贸圈用户协议》').then(res=>{
					this.createCard=false;
					return;
				})
				//isShowAuthPhone - true  授权
				let openid=uni.getStorageSync('openid');
				
				
				let form={
					phone: this.isShowAuthPhone ? undefined : this.phone,
					name: this.nickName,
					headImage: this.avatarUrl,
					company: this.Company,
					job:this.job,
					token:this.token,
					code:this.isShowAuthPhone ? undefined : this.codeValue,
				};
				
				if (this.cardUserId) {
					form.refereeUserId = this.cardUserId;
				}
				console.log(form);
				uni.showLoading();
				
				if(this.showImage){
						uni.hideLoading();
						this.showTips('请同意用户协议！')
						return false
				}
				this.$api.register(form).then(value=>{
					uni.hideLoading();
					
					//console.log(value);
					if(value.ERROR==10001){
						this.showTips('该手机号已经注册！').then(res=>{})
					}else if(value.ERROR==10002){
						this.showTips('该微信号已经绑定！').then(res=>{})
					}else if(value.ERROR==2000){
						this.showTips('上级用户不存在！').then(res=>{})
					}else{
						this.createCard=true;
						this.login(this.isShowAuthPhone ? this.authPhone : this.phone, value)
					}
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},
			login (phoneNum, value){
				const successAction = () => {
					uni.hideLoading();
					if (!!this.redirectPath) {

						uni.reLaunch({url: this.redirectPath});
					} else {
						uni.switchTab({ url: '/pages/businessCard/businessCard' });
					}
				}
				uni.showLoading();
				
				uni.setStorageSync('userId',value.userInfoId);
				
				
				this.setCardUserId(value.userInfoId)
				
				const action = this.$store.dispatch('updateCurrentUserInfo');
					if (action) {
						action.then(result => {
							successAction();
						})
					} else {
						successAction()
				}
				// this.$api.login(phoneNum).then(res2=>{
				// 	this.showTips('注册成功')
				// 	uni.setStorageSync('userId',value.userInfoId);
				// 	this.setCardUserId(value.userInfoId)
				// 	const action = this.$store.dispatch('updateCurrentUserInfo');
				// 	if (action) {
				// 		action.then(result => {
				// 			successAction();
				// 		})
				// 	} else {
				// 		successAction()
				// 	}
				// }).catch(error => {
				// 	uni.hideLoading();
				// 	this.showError(error)
				// })
			},

			// 预览名片
			previewCard(){
				let phoneNum=this.phone?this.phone:this.GetPhone;
				// if(this.createCard){
				this.showPopus=true;//弹出层
				this.showLocation=false;//地理位置
				this.showPcard=true;//预览名片
				this.showWXgetUserInfo=false;//app授权用户信息
				// }else{
				// 	this.showTips('请先创建名片后预览').then(res=>{})
				// }
			},
			// 关闭名片预览
			closeCard(){
				this.showPopus=false;//弹出层
				this.showLocation=false;//地理位置
				this.showPcard=false;//预览名片
				this.showWXgetUserInfo=false;//app授权用户信息
			},

			openUserAgreement () {
				this.navigateTo('/pages/WebView', { url: encodeURIComponent('https://xk.gzskxx.com/usercenter-service/view/service') })
			},

      WXgetUserInfor (e) {
		  //console.log(e)
        if(e.detail.errMsg == 'getUserInfo:fail auth deny'){
        }else{
		console.log(e.detail.userInfo)
          this.$store.commit('setUPinfo', e.detail.userInfo);
          this.getUserInfoCallback();
          this.authShow = false;
        }
      },

      getUserInfoCallback () {
        this.nickName = this.UPinfo.nickName || '';
        this.avatarUrl = this.UPinfo.avatarUrl || '';

        this.saveGuest();
	},

	saveGuest () {
		if (this.cardUserId && this.UPinfo && this.UPinfo.nickName) {
			this.$api.saveGuestRecord(this.cardUserId, uni.getStorageSync('openid'), this.nickName, this.avatarUrl);
		}
	},

			//Vuex引入方法
			...mapMutations(['setCardUserId','setUPinfo'])
		},
		onLoad (option) {
			this.redirectPath = decodeURIComponent(option.redirect || '');
			//#ifdef APP-PLUS
			this.isApp = true;
			this.isShowAuthPhone = false;
			//#endif
			//#ifdef MP-WEIXIN
			if(this.UPinfo) {
        this.nickName = this.UPinfo.nickName || '';
        this.avatarUrl = this.UPinfo.avatarUrl || '';
        if (!this.UPinfo.nickName) {
          this.authShow = true;
				}
			}
			wx.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			});
			//#endif
			this.cardUserId = option.id || option.cardUserId || option.recommendId || '';
			this.isDefault = !!option.isDefault;

			this.saveGuest();

			console.log(this.cardUserId);
		},

		computed: {
			//Vuex引入属性
			...mapState(['UPinfo'])},
	}

</script>
<style lang="less">

	@import '../../css/mzl_base.less';
	page{width:100%;background:@grayBg;height:100%;}
	.container{
		margin-top:30upx;
		// 头像上传
		.HeaderInfor{
			padding:30upx;background:#fff;
			.HItitle{width:50%;text-align: left;}
			.HIimage{
				width:50%;text-align: right;
				image{width:120upx;height:120upx;vertical-align: middle;}
			}
		}
		// 用户基本信息
		.UserInfor{
			background:#fff;margin-top:20upx;
			.UIName{
				padding:30upx;
				.Ntitle{width:25%;text-align: left;}
				.Ninput{width:75%;text-align: left;}
			}
		}
		.UIphone{
			padding:30upx;
			.PareaCode{
				width:25%;text-align: left;
				image{width:20upx;height: 11upx;vertical-align: middle;margin-left:10upx;}
			}
			.PinputP{
				width:35%;
			}
			.PgetCode{
				width:30%;
				.CodeNum{
					.buttonRadius(@w:180upx;@h:64upx;@bg:none);border:1upx solid #6B7AF8;color:#6B7AF8;text-align: center;
				}
			}
			.PchangeIm{
				width:10%;text-align: right;image{width:32upx;height: 32upx;vertical-align: middle;}
			}
		}
		.UIgetPhone{
			padding:25upx;
			.Pnum{width:25%;text-align: left;}
			.PTitle{width:60%;text-align:left;color:#6B7AF8;border:none;padding:0;}
			.GetPhone{color:#000;}
			.Pimage{width:15%;text-align:right;image{width:32upx;height:32upx;vertical-align: middle;}}
		}
		.textL{text-align: left;}
		.UIName{
			margin-top:20upx;background: #fff;padding:30upx;
			.Ntitle{width:25%;text-align: left;}
			.Ninput{width:75%;text-align: left;}
		}
		.UIName2{margin-top:0;}
		.ReadMement{
			margin-top:30upx;padding:0 30upx;
			.RMimage{
				image{width:34upx;height: 34upx;vertical-align: middle;margin-right:20upx;}
				.RMmenent{color:#6B7AF8;margin-left:20upx;}
			}
		}
		.CreateButton{
			width:100%;margin:50upx 0;
			.Cbtn{
				.buttonRadius();color:#fff;margin:0 auto;
			}
			.Cpreview{margin:30upx 0;width:100%;text-align: center;}
		}
		// 弹出层
		.container3{
		.popup{
			width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);text-align:center;z-index:99999999;
			//获取地理位置
			.DeleteLog{
				.DLlist{
					width:560upx;height: 260upx;background: #fff;position: absolute;border-radius: 10upx;
					top:50%;left:50%;margin-left:-280upx;margin-top:-130upx;
					.DLtitle{
						font-size: 32upx;color:#333;text-align: center;height:170upx;padding:40upx;font-weight:200;line-height: 50upx;
					}
					.DLbutton{
						font-size: 28upx;border-top:1upx solid #E1E1E1;
						.DLagree,.DLreject{width:50%;height:87upx;line-height: 87upx;;}
						.DLagree{color:#3576EE;}
						.DLreject{color:#999999;border-right:1upx solid  #E1E1E1;}
					}
				}
			}
			// app授权微信
			.WXgetInfor{
				.UserInfo{
					width:630upx;background: #fff;border-radius:8px;position: absolute;
					top:50%;left:50%;margin-left:-315upx;margin-top:-267.5upx;
					.UITitle{width:100%;padding:40upx 0;text-align: center;}
					.UIlogo{
						text-align: center;padding:30upx 0;
						image{width:100upx;height: 100upx;vertical-align: middle;}
						.UIname{padding-top:30upx;}
					}
					.UIgetPublic{
						text-align: center;height:150upx;line-height: 150upx;
						.point{width:12upx;height:12upx;border-radius: 50%;margin-right:20upx;background:rgba(204,204,204,1);display:inline-block;}
					}
					.UIbutton{
						position: relative;bottom:0;height:100upx;
						.Brej{width:50%;border-right:1upx solid #E1E1E1;border-top:1upx solid #E1E1E1;text-align: center;height:100upx;line-height: 100upx;}
						.Bagree{width:50%;text-align: center;color:#6B7AF8;border:none;border-top:1upx solid #E1E1E1;height:100upx;line-height: 100upx;border-radius: 0;}
					}
				}
			}
			// 预览名片
			.previewCard{
				width:690upx;height: 250upx;background:#fff;border-radius: 8upx;
				position: absolute;top:50%;left:50%;margin-left:-345upx;margin-top:-145upx;
				.PCheader{
					padding:30upx;
					.Himage{
						width:25%;text-align: left;
						image{width:120upx;height: 120upx;vertical-align: middle;}
					}
					.Htitle{
						width:75%;text-align: left;
						.HNname{
							.nName{height:60upx;display: inline-block;font-size: 36upx;font-weight: 500;margin-right: 20upx;}
							.nJob{font-size:20upx;color:#666;height:36px;background:rgba(241,241,241,1);line-height: 36upx;border-radius:18px;padding:0 15upx;}
						}
						.Hcompany{width:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
					}
				}
				.PCPhone{
					padding:0 30upx;font-size: 24upx;color:#333;text-align: left;
					image{width:18upx;height: 28upx;vertical-align: middle;margin-right:30upx;}
				}
				.Pdelete{
					width:100%;text-align: center;margin-top:100upx;
					image{width:70upx;height: 70upx;vertical-align: middle;}
				}
			}
			.WXgetInfor{
				.UserInfo{
					width:630upx;background: #fff;border-radius:8px;position: absolute;
					top:50%;left:50%;margin-left:-315upx;margin-top:-267.5upx;
					.UITitle{width:100%;padding:30upx 0;text-align: center;}
					.UIlogo{
						text-align: center;padding:30upx 0;
						image{width:100upx;height: 100upx;vertical-align: middle;}
						.UIname{padding-top:30upx;}
					}
					.UIgetPublic{
						text-align: left;padding:40upx;line-height: 100upx;
						.point{width:12upx;height:12upx;border-radius: 50%;margin-right:20upx;background:rgba(204,204,204,1);display:inline-block;}
					}
					.UIbutton{
						border-top:1upx solid #E1E1E1;line-height:100upx;
						.Brej{width:50%;border:none;border-right:1upx solid #E1E1E1;text-align: center;}
						.Bagree{width:50%;text-align: center;color:#6B7AF8;border:none;}
					}
				}
			}
		}
		}
	}

	.form-control {
		display: flex;
	}

	.phone-button {
		font-size:28upx;
		color:rgba(107,122,248,1);
		line-height:40upx;
		border: none;
		background: none;
		text-align: left;
		padding: 0;
		flex: 1;
		align-items: center;
		&:after {
			display: none;
		}
	}

	.change-icon {
		width:32upx;
		height:32upx;
		background:rgba(102,102,102,1);
	}

	//微信授权头像昵称
	.shouquanModel{
		position: fixed;z-index: 1; width: 100%;height: 100%;top: 0;left: 0;background:rgba(0,0,0,0.5);box-sizing:border-box;padding:60upx;
		.shouquanCon{
			width:84% ;position: absolute;top: 50%;margin-top: -270upx; background: #FFFFFF;text-align:center;border-radius:8upx;
			.title{width: 100%; height: 100upx;font-size: 32upx;color: #333333;border-bottom: 1px solid #E1E1E1;font-family:PingFangSC-Medium;font-weight:500;padding-top: 36upx;}
			.logoCon{
				width: 100%;border-bottom: 1px solid #E1E1E1;
				.logoImg{width: 100upx; height: 100upx; border-radius: 50%;margin: 39upx 0 17upx 0;}
				.logoName{font-size: 28upx;color: #333333;margin-bottom: 30upx;}
			}
			.tishi{width: 100%; height: 119upx;line-height: 119upx; font-size: 24upx;color: #666666;border-bottom: 1px solid #E1E1E1;}

			.opCon{
				height:87upx ;line-height: 87upx; width: 100%;text-align: center;
				.no{width: 50%; color:#666666 ;font-size: 28upx;}
				.line{height: 87upx;width: 1px;background: #E1E1E1;}
				.yes{width: 50%;color:#6B7AF8;font-size: 28upx;}
			}
		}
	}

</style>





