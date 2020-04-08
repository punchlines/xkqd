<template>
	<view class="container">
		<view class="drawAbill">
			<!-- 发票金额 -->
			<view class="DBprice fx-row fx-row-center fx-row-space-around borderB">
				<view class="Ptitle fs3a28">发票金额</view>
				<view class="Pprice fs3a28">¥{{money}}</view>
			</view>
			<!--发票抬头  -->
			<view class="InvoiceRise fx-row fx-row-center fx-row-space-around">
				<view class="IRtitle fs3a28">发票抬头</view>
				<view class="IRperson fs3a28" @click="personBill">
					<template v-if="showPerson"><image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shanchu2.png"></image>个人</template>
					<template v-else><image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shanchu21.png"></image>个人</template>
				</view>
				<view class="IRCompany fs3a28" @click="companyBill">
					<template v-if="showCompany"><image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shanchu2.png"></image>单位</template>
					<template v-else><image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shanchu21.png"></image>单位</template>
				</view>
			</view>
			<!-- 收票人手机 -->
			<view class="billPhone fx-row fx-row-center fx-row-space-around" v-if="showPersonInfor">
				<view class="BPtitle fs3a28">发票人手机</view>
				<view class="BPphone fs6a28">{{phone?phone:'13632426955'}}</view>
			</view>
			<!-- 纳税人识别号 -->
			<view class="billInform billCompany" v-if="showCompanyInfor">
				<view class="BIadress fx-row fx-row-center fx-row-space-around borderB" v-for="(item,index) in companyInfor" :key="index">
					<view class="Atitle fs3a28">{{item.title}}</view>
					<view class="Ainput fs3a28">
						<input type="text" :placeholder="item.placeh" v-model="item.subDetail" />
					</view>
				</view>
			</view>
			<!--邮箱地址  -->
			<view class="billInform">
				<!--邮箱地址  -->
				<view class="BIadress fx-row fx-row-center fx-row-space-around borderB">
					<view class="Atitle fs3a28">邮箱地址</view>
					<view class="Ainput fs3a28">
						<input type="text" placeholder="请输入邮箱地址（必填）" v-model="email"/>
					</view>
				</view>
				<!-- 所在地 -->
				<view class="BIlocation fx-row fx-row-center fx-row-space-around borderB">
					<view class="Ltitle fs3a28">所在地</view>
					<view class="Linput fs3a28" @click="showMulLinkageThreePicker">
						<input disabled="true" type="text" placeholder="选择省市区（必填）" v-model="pickerText">
					</view>
					<view class="Lgoto">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'"></image>
					</view>
				</view>
				<!-- 详细地址 -->
				<view class="BIadress fx-row fx-row-center fx-row-space-around">
					<view class="Atitle fs3a28">详细地址</view>
					<view class="Ainput fs3a28">
						<input type="text" placeholder="请输入详细收件地址（必填）" value="" v-model="adressDetail" />
					</view>
				</view>
			</view>
			<!-- 提交 -->
			<view class="submitButton" @click="SubmitBillInfor">
				<view class="SBtn fs3a32">提交</view>
			</view>
		</view>
		<!--城市三级联动 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		@onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		<!--城市三级联动 -->
	</view>
</template>

<script>
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				showPerson:true,
				showCompany:false,
				showCompanyInfor:false,
				showPersonInfor:true,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#6B7AF8',
				pickerValueDefault: [0],
				phone:'',//开发票的手机
				money:'',//金额
				email:'',//邮箱
				pickerText:'',//省市区
				adressDetail:'',//详细地址
				province:'',//省
				city:'',//市
				area:'',//区
				companyInfor:[
					{id:0,title:'发票抬头',placeh:'请输入公司名称（必填）',subDetail:''},
					{id:1,title:'纳税人识别号',placeh:'必填',subDetail:''},
					{id:2,title:'注册地址',placeh:'选填',subDetail:''},
					{id:3,title:'注册电话',placeh:'选填',subDetail:''},
					{id:4,title:'开户银行',placeh:'选填',subDetail:''},
					{id:5,title:'银行账号',placeh:'选填',subDetail:''},
				],
				type:1,//个人还是单位	
			};
		},
		components:{
			mpvueCityPicker,
		},
		methods:{
			// 三级联动选择选择省市区
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			// 选择的省市区
			onConfirm(e) {
				// console.log(e.label.split('-'));
				let adressDetails=e.label.split('-')
				this.province=adressDetails[0];
				this.city=adressDetails[1];
				this.area=adressDetails[2];
				this.pickerText = e.label.split('-').join('');
			},
			// 个人发票
			personBill(){
				this.showPerson=!this.showPerson;
				if(this.showPerson){
					this.type=1;
					this.showCompany=false;
					this.showPersonInfor=true;
					this.showCompanyInfor=false;
				}
				console.log(this.type);
			},
			// 单位发票
			companyBill(){
				this.showCompany=!this.showCompany;			
				if(this.showCompany){
					this.type=2;
					this.showPerson=false;
					this.showPersonInfor=false;
					this.showCompanyInfor=true;
				}
				console.log(this.type);
			},
			// 开发票提交信息 
			SubmitBillInfor(){
				let form;
				if(this.showPerson){
					form={
						orderId:Number(this.goodsId),
						type:this.type,
						phone:this.phone,
						email:this.email,
						province:this.province,
						city:this.city,
						area:this.area,
						detailedAddress:this.adressDetail,
					};
					if(this.type&&this.phone&&this.email&&this.pickerText&&this.adressDetail){
						this.$api.openInvoiceMessage(form).then(res=>{
							console.log(res);
							this.showTips('开具发票成功').then(res=>{
								uni.redirectTo({
									url: '../myself_drawAbillGoodsList/myself_drawAbillGoodsList'
								});
							})
						}).catch(error=>{
							this.showError(error);
						})
					}else{
						this.showTips('请完善所有信息再提交').then(res=>{})
					}
				}else if(this.showCompany){
					form={
						orderId:Number(this.goodsId),
						type:this.type,
						phone:this.companyInfor[3].subDetail,
						companyName:this.companyInfor[0].subDetail,
						dutyParagraph:this.companyInfor[1].subDetail,
						companyAddress:this.companyInfor[2].subDetail,
						bank:this.companyInfor[4].subDetail,
						bankCard:this.companyInfor[5].subDetail,
						email:this.email,
						province:this.province,
						city:this.city,
						area:this.area,
						detailedAddress:this.adressDetail
					};
					if(this.type&&this.email&&this.pickerText&&this.adressDetail){
						this.$api.openInvoiceMessage(form).then(res=>{
							console.log(res);
							this.showTips('开具发票成功').then(res=>{
								uni.redirectTo({
									url: '../myself_drawAbillGoodsList/myself_drawAbillGoodsList'
								});
							})
						}).catch(error=>{
							this.showError(error);
						})
					}else{
						this.showTips('请完善所有信息再提交').then(res=>{})
					}
				}
				console.info(form);
			}
		},
		onLoad(options) {
			console.log(options);
			this.phone=options.phone;
			this.goodsId=options.orderId;
			this.money=options.goodsAmount;
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page{width:100%;height: 100%;background: @grayBg;}
	.container{
		padding-bottom:130upx;
		.drawAbill{
			margin-top:40upx;
			.DBprice{
				padding:30upx;background: #fff;
				.Ptitle{width:30%;text-align: left;}
				.Pprice{width:70%;text-align: left;}
			}
			.InvoiceRise{
				padding:30upx;background: #fff;
				.IRtitle{width:30%;text-align: left;}
				image{width:30upx;height: 30upx;vertical-align: middle;margin-right: 20upx;}
				.IRperson{width:30%;text-align:left;}
				.IRCompany{width:40%;text-align: left;}
			}
			.billPhone{
				padding:30upx;margin:30upx 0;background: #fff;
				.BPtitle{width:30%;text-align:left;}
				.BPphone{width:70%;text-align: left;}
			}
			.billCompany{
				margin-top:30upx;
				.BIadress:nth-last-child(1){margin-bottom:30upx;}
			}
			.billInform{
				background: #fff;
				.BIadress{
					padding:30upx;
					.Atitle{width:30%;text-align: left;}
					.Ainput{width:70%;text-align: left;}
				}
				.BIlocation{
					padding:30upx;
					.Ltitle{width:30%;text-align: left;}
					.Linput{width:60%;text-align: left;}
					.Lgoto{width:10%;text-align: right;image{width:12upx;height: 24upx;vertical-align: middle;}}
				}
			}
			.submitButton{
				width:100%;height:100upx;z-index:999;border-top:1upx solid #eee;position: fixed;bottom: 0;background:#fff;
				.SBtn{
					.buttonRadius();color:#fff;margin:6upx auto;
				}
			}
		}
	}
</style>
