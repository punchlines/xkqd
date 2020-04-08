<template>
	<view class="container">
		<view class="PagePassward">
			<!-- 设置支付密码 -->
			<view class="PPbox">
				<view class="Ptitle fs3a32">{{settindPWtitle}}</view>
				<view class="pSubTitle fs6a24">{{settingPWsubTitle}}</view>
			</view>
			<!-- 未设置六位密码 -->
			<view class="PWpassword">
				<view class="pwTable fx-row fx-row-center fx-row-space-around">
					<view class="pwTabItem" v-for="(item,index) in list" :key="index">
						<text v-if="password.length>index"></text>
					</view>
				</view>
				<view class="PWinput">
					<!-- :confirm-hold="confirmHold"  -->
					<input v-for="(item,index) in payInput" :key="index" type="number" :confirm-hold="confirmHold"
					 maxlength="6" :focus="item.payFocus" :value="password" @input='inputPwd' >
				</view>
			</view>
			<!-- 按钮 -->
			<view class="Pbutton">
				<view class="PBbtn fsf28" @click="agreePw">{{settingBtn}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import MD5 from "../../js/md5.js" // md5加密
	import api from "../../js/api.js";
	export default {
		data() {
			return {
				settindPWtitle:'设置支付密码',
				settingPWsubTitle:'为了您的账户安全，请在下面输入6位数的支付密码',
				settingBtn:'确定',
				settingStatus:'',
				confirmHold:true, //键盘收起false  不收起：true
				payFocus:false, //文本框焦点
				list:[{id:0},{id:1},{id:2},{id:3},{id:4},{id:5}],
				password:'',
				payInput:[
					{id:0,payFocus:true,}
				],	
			}
		},
		methods:{
			// 输入框的原点显示
			inputPwd(e) {
				// console.log(e.detail.value);
				this.password = e.detail.value;
				if(e.detail.value.length >= 6){
					this.payInput[0].payFocus=false;
					this.confirmHold=false;
				}else{
					return;
				}
			},
			// 提交时校验输入的设置密码，修改密码的校验，设置新密码
			agreePw(){
				// md5加密
				if(this.password.length>=6){
					let len=this.password.slice(0,6);
					var mdPassWord = MD5.md5(len);
					console.log('加密处理：'+len,mdPassWord);
					// 修改密码  校验密码然后修改密码
					if(this.settingStatus==1){
						this.$api.testUpPassword(mdPassWord).then(res=>{
							console.log(res);
							if(res.status == 1){
								this.showTips('输入正确，请重新输入密码').then(res=>{});
								this.password='';
								this.settingStatus=0;//修改会状态为0，回到未设置密码的状态
								this.settindPWtitle='设置支付密码';
								this.settingPWsubTitle='请设置支付密码，用于支付验证';
								this.settingBtn='确定';
							}else if(res.status==0){
								this.showTips('输入的密码与原密码不一致，请重新输入').then(res=>{});
							}
						});
					}else{
						// 未设置密码时，设置密码 
						this.$api.setPassward(mdPassWord).then(result=>{
							this.showTips('设置密码成功').then(res=>{
								uni.navigateBack({});
// 								uni.navigateTo({
// 									url: '../myself_mySetting/myself_mySetting'
// 								});
							})						
						}).catch(error=>{
							this.showError(error);
						})
					}					
				}else{
					this.showTips('请输入六位密码').then(res=>{})
				}
			},
			//已设置， 修改密码
			
			
		},

		onLoad(options) {
			// 获取支付密码状态，已经设置了密码settingStatus：1，未设置的为：0
			console.log('密码设置状态'+options.passwordStatus);
			this.settingStatus=options.passwordStatus;
			if(this.settingStatus==0){
				this.settindPWtitle='设置支付密码';
				this.settingPWsubTitle='为了您的账户安全，请在下面输入6位数的支付密码';
				this.settingBtn='确定';
			}else{
				this.settindPWtitle='修改支付密码';
				this.settingPWsubTitle='请输入原支付密码，以验证身份';
				this.settingBtn='下一步';
			}
		}
	}
</script>
<style lang="less">

	@import '../../css/mzl_base.less';
	.container {
			background: #fff;width: 100%;border-top: 1upx solid #eee;position: fixed;height: 100%;
			// 支付密码
			.PagePassward {
				width: 100%;text-align: center;padding: 30upx;
				.PPbox {
					.Ptitle {margin: 100upx 0 30upx 0;font-size:40upx;font-weight:500;}
					.pSubTitle {	margin-bottom: 30upx;}	
				}
				.PWpassword{
					margin-top:100upx;
					.pwTable{
						width:100%;height:100upx;
						.pwTabItem{
							width:14%;height:100upx;line-height: 100upx;border-bottom:1upx solid #aaa;
							 text{width:20upx;height: 20upx;border-radius: 20upx;display: inline-block;background-color: #555;}
						}
					}
					.PWinput{
						input{width:200%;text-align: left;height:200upx;position: absolute;left:-150upx;top:300upx;opacity:0;}
					}					
				}
			}
			.Pbutton {
				margin-top: 100upx;
				.PBbtn {
					.buttonRadius();margin: 0 auto;
				}
			}
	}
</style>