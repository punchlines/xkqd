<template>
	<view class="container">
		<view class="invoiceDetail">
			<view v-if="showCompany" class="IDprice fx-row fx-row-center fx-row-space-around borderB" v-for="(item,index) in listCompany" :key="index">
				<view class="Ptitle fs3a28">{{item.title}}</view>
				<view class="Pprice fs3a28">{{item.num}}</view>
			</view>
			
			<view v-if="showPerson" class="IDprice fx-row fx-row-center fx-row-space-around borderB" v-for="(item,index) in listPerson" :key="index">
				<view class="Ptitle fs3a28">{{item.title}}</view>
				<view class="Pprice fs3a28">{{item.num}}</view>
			</view>
			
			<view class="IDtime fs9a24">
				申请开票时间：{{applyTime}}
			</view>
		</view>
	</view>
</template>

<script>
	import mzlJS from '../../js/mzl.js';
	export default {
		data() {
			return {
				showCompany:false,
				showPerson:true,
				applyTime:'2018.11.01 12:30',
				goodsId:'',//商品id
				price:'',//价格
				phone:'',//电话
				listCompany:[
					{id:0,title:'发票金额',num:'¥156.00'},
					{id:1,title:'发票抬头',num:'广州外贸有限公司'},
					{id:2,title:'纳税人识别号',num:'12345678900976'},
					{id:3,title:'注册地址',num:'广东省广州市天河区'},
					{id:4,title:'注册电话',num:'020-1234123'},
					{id:5,title:'开户银行',num:'中国农业银行'},
					{id:6,title:'银行账号',num:'6228 **** **** **** 234'},
					{id:7,title:'邮箱地址',num:'Muxiaowen@sina.com'},
					{id:8,title:'所在地',num:'广东省广州市天河区'},
					{id:9,title:'详细地址',num:'中山大道中123号'}
				],
				listPerson:[
					{id:0,title:'发票金额',num:'¥156.00'},
					{id:1,title:'发票抬头',num:'个人'},
					{id:2,title:'收票人电话',num:'166****234'},
					{id:3,title:'邮箱地址',num:'Muxiaowen@sina.com'},
					{id:4,title:'所在地',num:'广东省广州市天河区'},
					{id:5,title:'详细地址',num:'中山大道中123号'}
				],
			};
		},
		methods:{
			getInvoiceDetail(){
				// this.goodsId
				console.log('goodsId:'+this.goodsId);
				this.$api.getInvoiceDetail(this.goodsId).then(res=>{
					// console.log(res);
					// invoiceHead:1个人  2：单位 
					if(res.invoiceHead==1){
						this.showCompany=false;
						this.showPerson=true;
						let addres=res.province+res.city+res.area;
						let GetList=['',res.phone,res.email,addres,res.detailedAddress];
						this.listPerson[0].num=res.invoiceMoney;
						this.listPerson[2].num=res.phone;
						this.listPerson[3].num=res.email;
						this.listPerson[4].num=res.province+res.city+res.area;
						this.listPerson[5].num=res.detailedAddress;
						this.applyTime=mzlJS.formatTime(res.createTime);
					}else{
						this.showCompany=true;
						this.showPerson=false;
						// this.listCompany=res;
						let address=res.province+res.city+res.area;
						let getList=['',res.companyName,res.dutyParagraph,res.companyAddress,res.phone,res.bank,res.bankCard,res.email,address,res.detailedAddress];
						this.listCompany[0].num=res.invoiceMoney;
						this.listCompany[1].num=res.companyName||'暂无';
						this.listCompany[2].num=res.dutyParagraph||'暂无';
						this.listCompany[3].num=res.companyAddress||'暂无';
						this.listCompany[4].num=res.phone||'暂无';
						this.listCompany[5].num=res.bank||'暂无';
						this.listCompany[6].num=res.bankCard||'暂无';
						this.listCompany[7].num=res.email;
						this.listCompany[8].num=res.province+res.city+res.area;
						this.listCompany[9].num=res.detailedAddress;
					}
				}).catch(error=>{
					this.showError(error);
				})
			},
		},
		onLoad(options) {
			this.goodsId=options.goodsId;
			this.listPerson[0].num==options.goodsAmount;
			this.listCompany[0].num==options.goodsAmount;
			this.phone=options.phone;
			// console.log(options);
			this.getInvoiceDetail();
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page{width:100%;height: 100%;background: @grayBg;}
	.container{
		.invoiceDetail{
			margin-top:40upx;
			.IDprice{
				padding:30upx;background:#fff;
				.Ptitle{width:30%;text-align:left;}
				.Pprice{width:70%;text-align:left;}
			}
			.IDprice:nth-of-type(3){margin-bottom:30upx;border:none;}
			.IDprice:nth-of-type(7){margin-bottom:30upx;border:none;}
			.IDtime{padding:30upx;}
		}
	}
</style>
