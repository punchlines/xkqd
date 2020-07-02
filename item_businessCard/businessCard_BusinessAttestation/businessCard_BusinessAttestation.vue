<template>
	<view class="container">
		<!-- <view class="name list fx-row fx-row-left fx-row-center">
			<text class="left">{{getParam==1?"真实姓名":"持卡人"}}</text>
			<input type="text" value=""  placeholder="请输入真实姓名" placeholder-class="before" v-model="username" />
		</view> -->
		<view class="name list fx-row fx-row-left fx-row-center" style="border-bottom: 1px solid #E1E1E1;margin-top:42upx;">
			<text class="left">公司名称</text>
			<input type="text" value="" placeholder="请输入公司名称" placeholder-class="before" v-model="businessName" />
		</view>
		<view class="name list fx-row fx-row-left fx-row-center">
			<text class="left">营业执照号</text>
			<input type="text" value="" placeholder="请输入营业执照号" placeholder-class="before" v-model="idNos" />
		</view>
		<view class="name list fx-row fx-row-left fx-row-center">
			<text class="left">税务登记号</text>
			<input type="text" value="" placeholder="请输入税务登记号" placeholder-class="before" v-model="taxCert" />
		</view>
		<view class="name list fx-row fx-row-left fx-row-center">
			<text class="left">组织机构代码</text>
			<input type="text" value="" placeholder="请输入组织机构代码" placeholder-class="before" v-model="orgCode" />
		</view>
		<view class="name list fx-row fx-row-left fx-row-center">
			<text class="left">法人姓名</text>
			<input type="text" value="" placeholder="请输入法人姓名" placeholder-class="before" v-model="corpName" />
		</view>
		<view class="name list fx-row fx-row-left fx-row-center">
			<text class="left">法人证件号</text>
			<input type="text" value="" placeholder="请输入法人证件号" placeholder-class="before" v-model="legPerId" />
		</view>
		<view class="name list fx-row fx-row-left fx-row-center">
			<text class="left">联系手机号</text>
			<input type="text" value="" placeholder="请输入联系手机号" placeholder-class="before" v-model="mobile" />
		</view>
		<view class="number list fx-row fx-row-left fx-row-center">
			<text class="left">银行卡号</text>
			<input style="flex: 1" type="text" value="" placeholder="请输入卡号" placeholder-class="before" v-model="cardNum" />
		</view>

		<view class="number list fx-row fx-row-left fx-row-center">
			<text class="left">银行名称</text>
			<picker @change="bindPickerChange" style="flex: 1" range-key='bankName' :value="index" :range="array">
				<view class="uni-input">{{array[index].bankName}}</view>
			</picker>

		</view>

		<!-- 身份证正面 -->
		<view class="PGgoodsVideo PGgoodsImages">
			<view class="Vtitle fs3a32">身份证正面</view>
			<view style="display: flex;flex-direction: row;flex-wrap: wrap; ">
				<image class="GoodsImgsClass" :src="item" lazy-load mode="aspectFill" v-for="(item,index) of idcardFront" @click="goodsImgClick(index,idcardFront,1)"
				 :key='item'></image>
				<image v-if="idcardFront.length<1" style="width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"
				 @click="upGoodsImgTap(1)" lazy-load></image>
			</view>
		</view>
		<!-- 身份证反面 -->
		<view class="PGgoodsVideo PGgoodsImages">
			<view class="Vtitle fs3a32">身份证反面</view>
			<view style="display: flex;flex-direction: row;flex-wrap: wrap; ">
				<image class="GoodsImgsClass" :src="item" lazy-load mode="aspectFill" v-for="(item,index) of idcardReverse" @click="goodsImgClick(index,idcardReverse,2)"
				 :key='item'></image>
				<image v-if="idcardReverse.length<1" style="width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"
				 @click="upGoodsImgTap(2)" lazy-load></image>
			</view>
		</view>
		<!-- 营业执照 -->
		<view class="PGgoodsVideo PGgoodsImages">
			<view class="Vtitle fs3a32">营业执照</view>
			<view style="display: flex;flex-direction: row;flex-wrap: wrap; ">
				<image class="GoodsImgsClass" :src="item" lazy-load mode="aspectFill" v-for="(item,index) of certificate" @click="goodsImgClick(index,certificate,1)"
				 :key='item'></image>
				<image v-if="certificate.length<1" style="width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"
				 @click="upGoodsImgTap(3)" lazy-load></image>
			</view>
		</view>
		<!-- 税务登记证 -->
		<view class="PGgoodsVideo PGgoodsImages">
			<view class="Vtitle fs3a32">税务登记证</view>
			<view style="display: flex;flex-direction: row;flex-wrap: wrap; ">
				<image class="GoodsImgsClass" :src="item" lazy-load mode="aspectFill" v-for="(item,index) of authority" @click="goodsImgClick(index,authority,1)"
				 :key='item'></image>
				<image v-if="authority.length<1" style="width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"
				 @click="upGoodsImgTap(4)" lazy-load></image>
			</view>
		</view>
		<!-- 组织机构代码证 -->
		<view class="PGgoodsVideo PGgoodsImages">
			<view class="Vtitle fs3a32">组织机构代码证</view>
			<view style="display: flex;flex-direction: row;flex-wrap: wrap; ">
				<image class="GoodsImgsClass" :src="item" lazy-load mode="aspectFill" v-for="(item,index) of organization" @click="goodsImgClick(index,organization,1)"
				 :key='item'></image>
				<image v-if="organization.length<1" style="width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"
				 @click="upGoodsImgTap(5)" lazy-load></image>
			</view>
		</view>
		<!-- <view class="number list fx-row fx-row-left fx-row-center">
			<text class="left">手机号</text>
			<input style="flex: 1" type="text" value="" placeholder="请输入手机号" placeholder-class="before" v-model="phone" />
		</view>
		<view class="number list fx-row fx-row-left fx-row-center">
			<text class="left">身份证号</text>
			<input style="flex: 1" type="text" value="" placeholder="请输入身份证号" placeholder-class="before" v-model="idNo" />
		</view> -->
		<view class="btn" @click="next">{{getParam==1?"确认完善":"企业认证"}}</view>
		<view class="noBind" @click="goBack">{{getParam==1?"暂不完善":"暂不绑定"}}</view>
	</view>
</template>

<script>
	import {
		getBankCard
	} from '../../js/lib/bankCard';
	import {
		upVideo,
		upImg,
		uploadFile,
		formatTime
	} from '../../js/mzl.js'
	export default {
		data() {
			return {
				username: '',
				idNo: '',
				idcardFront: [], //身份证正面
				phone: '',
				idNos: '', //营业执照号
				cardNum: '',
				certificate:'',//营业执照
				authority:'',//税务登记证
				organization:'',//组织机构代码证
				idcardReverse:'',//身份证反面
				corpName: '', //法人姓名
				taxCert: '', //税务登记号
				businessName: '', //公司名称
				mobile: '', //联系手机号
				legPerId: '', //法人证件号
				orgCode: '', //组织机构代码
				array: [],
				index: 0,
				getParam: '', //获取从哪个页面过来的参数
			};
		},
		methods: {
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			//点击事件
			next() { //下一步
				if (!this.businessName) {
					this.showError('请输入公司名称', '提示');
					return;
				}
				if (!this.cardNum) {
					this.showError('请输入卡号', '提示');
					return;
				}
				if (!this.idNos) {
					this.showError('请输入营业执照号', '提示');
					return;
				}
				if (!this.mobile) {
					this.showError('请输入联系手机号', '提示');
					return;
				}
				if (!this.orgCode) {
					this.showError('请输入组织机构代码', '提示');
					return;
				}
				if (!this.legPerId) {
					this.showError('请输入法人证件号', '提示');
					return;
				}
				if (!this.taxCert) {
					this.showError('请输入税务登记号', '提示');
					return;
				}
				if (!this.corpName) {
					this.showError('请输入法人姓名', '提示');
					return;
				}
				uni.showLoading();

				const card = {
					bankName: this.array[this.index].bankName,
					bankCardNo: this.cardNum,
                    corpName:this.corpName,
					realName:this.businessName,
					orgCode:this.orgCode,
					taxCert:this.taxCert,
					legPerId:this.legPerId,
					idcardFront:this.idcardFront,
					idcardReverse:this.idcardReverse,
					certificate:this.certificate,
					authority:this.authority,
					organization:this.organization,
					mobile: this.mobile,
					idNo: this.idNos,
					returnUrl:'https://xk.gzskxx.com/static/do.html'
				}
				this.showLoading();
				const action =  this.$api.registerBusinessMerchant //: this.$api.addBankCard;

				// if (this.getParam == 1)
					// card.returnUrl = `https://www.baidu.com`;
					//card.returnUrl = `https://xk.gzskxx.com/static/do.html`;

				action(card).then(result => {
					this.hideLoading();
					uni.showToast({
					    title: '已经提交认证',
					    duration: 2000
					});
					uni.setStorageSync("_resetWallet", true)
					// if (this.getParam == 1) {
					// 	let host = result.url + "?" + result.parameterString
					// 	console.log(host)
					// 	uni.redirectTo({
					// 		url: "/pages/WebView?url=" + encodeURIComponent(host)
					// 	})

					// } else {
					// 	this.showTips("绑定完成").then(res => {
					// 		uni.navigateBack();
					// 	})
					// }
					//this.redirect();
				}).catch(error => {
					console.log(error)
					this.showError(error)
					this.hideLoading();
				})
				// getBankCard(this.cardNum).then(data => {
				//   uni.hideLoading()
				//   this.navigateTo(
				//       '../businessCard_BindBankcardNext/businessCard_BindBankcardNext',
				//       Object.assign({ from: this.getParam, cardNum: this.cardNum, username: this.username }, data)
				//   )
				// }).catch(error => {
				//   uni.hideLoading()
				//   this.showError(error, '提示');
				// })
			},
			// 暂时不绑定
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			//点击
			goodsImgClick(index, arr, type) {
				console.info(index)
				let that = this
				uni.showActionSheet({
					itemList: ['预览', '删除'],
					success: function(res) {
						if (res.tapIndex == 0) {
							that.previewImage(index, arr, type)
						} else {
							that.delImg(index, arr, type)
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			upGoodsImgTap(type) {
				let that = this;
				console.log(type)
				let count = type == 1 ? 3 : 1;
				upImg((res) => {
					console.info(res)
					if (type == 1) {
						if (that.idcardFront.length >= 5)
							return
						//that.GoodsImgs.push(res)
						that.idcardFront = that.idcardFront.concat(res)
					} else if(type==2){
						that.idcardReverse = []
						that.idcardReverse.push(res)
					} else if(type==3){
						that.certificate = []
						that.certificate.push(res)
					}else if(type==4){
						that.authority = []
						that.authority.push(res)
					}else if(type==5){
						that.organization = []
						that.organization.push(res)
					}
				}, count);
			},
			//删除
			delImg(index, arr, type) {
				if (type == 1) {
					this.GoodsImgs = this.GoodsImgs.filter(o => o != this.GoodsImgs[index])
				} else {
					this.homeImgs = []
				}
			},
			//预览
			previewImage(index, arr, type) {
				console.info(index)
				let that = this
				uni.previewImage({
					current: arr[index],
					urls: arr,
					loop: true
				});
			},
		},
		onLoad(options) {
			this.getParam = options.from;

			if (this.getParam == 1) {
				uni.setNavigationBarTitle({
					title: "填写资料"
				});
			}
			this.$api.getBankCode().then(res => {
				this.array = res;
			})
		},


	}
</script>

<style lang="less">
	@import "../../css/jss_base.less";

	.container {
		width: 100%;
		background: #F5F5F5;
		font-size: 28upx;
		color: #333333;

		.list {
			width: 100%;
			height: 106upx;
			background: #ffffff;
			box-sizing: border-box;
			padding: 0 30upx;
		}

		.left {
			width: 30%;
		}

		.text {
			color: #333333;
		}

		.before {
			color: #CCCCCC;
		}

		// .name{border-bottom: 1px solid #E1E1E1;margin-top:42upx;}
		.btn {
			.buttonRadius();
			margin: 101upx auto;
			margin-bottom: 24upx;
			line-height: 88upx;
			text-align: center;
			color: #FFFFFF;
			font-size: 32upx;
			font-family: PingFangSC;
		}

		.noBind {
			width: 100%;
			text-align: center;
			color: #999999;
		}
	}

	.PGgoodsVideo {
		padding: 30upx;

		.Vtitle {
			font-weight: bold
		}

		;

		.VupLoadVideo {
			border: 1upx solid #ccc;
			width: 220upx;
			height: 220upx;
			text-align: center;
			margin-top: 40upx;

			.VideoBox {
				margin: 0 auto;
				line-height: 60upx;

				.Vimage {
					width: 50upx;
					height: 32upx;
					vertical-align: middle
				}
			}
		}
	}

	.Vtitle {
		font-weight: bold
	}

	;

	.GoodsImgsClass {
		width: 200upx;
		height: 200upx;
		margin: 0;
		padding: 20upx 20upx 0 0;
	}

	.PGgoodsImages {
		.VupLoadVideo {
			.Vimage {
				width: 220upx;
				height: 220upx;
			}
		}
	}
</style>
