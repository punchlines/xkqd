<template>
	<view class="container">
		<view class="title">名片信息</view>
		<view class="cardInfo info">
			<view class="row fx-row">
				<view class="row-left">姓名</view>
				<view class="row-right">{{userDetails.name}}</view>
			</view>
			<view class="row fx-row">
				<view class="row-left">职位</view>
				<view class="row-right">{{userDetails.job}}</view>
			</view>
			<view class="row fx-row">
				<view class="row-left">公司</view>
				<view class="row-right">{{ userDetails.company }}</view>
			</view>
			<view class="row fx-row">
				<view class="row-left">手机号</view>
				<view class="row-right">{{userDetails.phone}}</view>
			</view>
			<view class="fx-row auto">
				<view class="row-left">签名</view>
				<view class="row-right">
					{{userDetails.autograph}}
				</view>
			</view>
		</view>
		<view class="title">个人基本信息</view>
		<view class="personInfo info">
			<view class="row fx-row">
				<view class="row-left">生日</view>
				<view class="row-right">{{userDetails.birthday}}</view>
			</view>
			<view class="row fx-row">
				<view class="row-left">其他联系方式</view>
				<view class="row-right">{{userDetails.otherConnection}}</view>
			</view>
			<view class="row fx-row">
				<view class="row-left">地址</view>
				<view class="row-right">{{userDetails.address}}</view>
			</view>
			<view class="row fx-row">
				<view class="row-left">详细地址</view>
				<view class="row-right">{{userDetails.addressDetail}}</view>
			</view>
			<view class="row fx-row">
				<view class="row-left">邮箱地址</view>
				<view class="row-right">{{userDetails.email}}</view>
			</view>
			<view class="row fx-row">
				<view class="row-left">URL</view>
				<view class="row-right">{{userDetails.personalUrl}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				// 个人信息
				userDetails:[],
			};
		},

		methods:{	
			getUserCardDetails(id){
				this.$api.getUserCardDetails(id).then(result => {
					console.info(result)
					// 0 不隐藏  1 隐藏
					if(result.userMap.hidePhoneNum==1){
						result.userMap.phone=this.hidePhone(result.userMap.phone);
					}
					this.userDetails = result.userMap;
					

				}).catch(error => {
					console.error(error)
				})
			}
		},
		computed: {
		//Vuex引入属性
		...mapState(['cardUserId','UPinfo'])
		},
		
		onLoad (option){

			console.info(333333)
			this.getUserCardDetails(option.userId)
		}
	}
</script>

<style lang="less">

.container{
	background:#F5F5F5;box-sizing: border-box;padding: 37upx 30upx 40upx 30upx;font-family:PingFangSC;
	.title{font-size:30upx;color:#333333;margin-bottom:33upx;}
	.info{
		width:100%;background: #FFFFFF;box-shadow:0px 0px 24px 0px rgba(170,170,170,0.2); box-sizing:border-box;padding:0 30upx;
		border-radius:4upx;
		.row{
				width:100%;height:97upx;line-height:97upx;border-bottom:1px solid #E1E1E1;font-size:28upx;color:#333333;
				.row-left{width:30%;}
				.row-right{width:70%;}
			}
			.auto{
				height:auto;font-size:28upx;color:#333333;line-height:46upx;padding: 30upx 0;
				.row-left{width:30%;}
				.row-right{width:70%;}
				}
	}
	.info:last-child{border:none;}
	.cardInfo{margin-bottom: 54upx;}
}
</style>
