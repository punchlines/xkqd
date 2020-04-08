<template>
	<view>
		<view class="infoDe" :style="cardStyle" :class="cardClass">
			<view class="ava fx-row">
				<image class="avaimage" :src="userDetails.headImage"></image>
				<view class="nameInfoCon">
					<view class="nameInfo fx-row">
						<view class="name">{{userDetails.name}}</view>
						<view class="posi">{{userDetails.job}}</view>
					</view>
					<view class="company">{{userDetails.company}}</view>
				</view>
			</view>
			<view class="per_de">
				<view class="fx-row fx-row-center ma">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/phone.png'" class="tell" @click="callClick"></image>
					<text class="wenzi">{{phone}}</text>
				</view>
				<view class="fx-row fx-row-center ma">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/email.png'" class="email"></image>
					<text class="wenzi">{{userDetails.email}}</text>
				</view>
				<view class="detail fx-row fx-row-center ma">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/qianming.png'" class="edit"></image>
					<text class="wenzi">{{userDetails.autograph}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	import { CARD_BACKGROUND } from '@/js/constant';

	export default {
		data() {
			return {

			};
		},
		computed: {
			phone() {
				return this.userDetails.hidePhoneNum==0?this.userDetails.phone:this.hidePhone(this.userDetails.phone);
			},
			imageUrl () {
				const find = CARD_BACKGROUND.find(item => item.id == this.cardBgId);
				return find ? find.image : '';
			},
			cardStyle () {
				return `background-image: url('${this.imageUrl}');`;
			},
			cardClass () {
				const find = CARD_BACKGROUND.find(item => item.id == this.cardBgId);
				return `cardBg${find ? find.id : ''}`;
			}
			
		},
		props:{
			userDetails:Object,
			cardBgId: [Number, String],
		},
		// 监听页面加载
		onLoad(){
				
		},
	
		methods: {
			
		},
	}
</script>

<style scoped lang="less">

	@import "../../css/jss_base.less";
	//个人信息
	.fontColorW{color:#fff;}
	.infoDe{
		width: 100%;background: #FFFFFF;height: 379upx;box-sizing: border-box;
		padding: 0 30upx 0 40upx;
		border-radius: 10upx;color:#333;
		background-position: 50%;
		background-size: 100%;
		background-repeat: no-repeat;
		box-shadow: 0 1upx 20upx 0 rgba(91, 119, 240, 0.23);

		.name{font-size: 36upx;color:#FFF;font-weight:500}
		.posi{margin-left:22upx;width:auto;height: 36upx;line-height: 36upx; border-radius:23upx;background: #FFF;font-size: 20upx;color: #FFF;text-align: center;padding:0upx 20upx !important;}
		.company{margin-top: 17upx; font-size: 24upx;font-family: PingFangSC;color:#FFF; text-align: left; }
		.wenzi {
			color:#FFF;
		}
		.posi {
			color:#FFF !important;
			background:rgba(255,255,255,0.5) !important;
		}

		.ava{
			&>.avaimage{width: 120upx;height: 120upx;margin-top: 56upx;margin-right: 24upx;}
			.nameInfoCon{
				flex: 1;
				margin-top: 56upx;margin-bottom: 30upx;
				.nameInfo{
					line-height:60upx;align-items:center;

				}
			}
		}
		.per_de{
			.wenzi{font-size: 24upx;font-family: PingFangSC;margin-left: 28upx;}
			.wenzi_color{color: #333333;}
				image{width:32upx;height: 32upx;}
				.ma{margin-bottom: 12upx;}
				.detail{
					text-align: left;
					// 超出部分显示...
					.edit{flex:1;}
					.wenzi{flex:18; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
				}
			}
	}

	.cardBg0 {
		.name {
			color:#333333;
		}
		.posi {
			color:#666666 !important;
			background:#F1F1F1 !important;
		}
		.company {
			color: #333333;
		}
		.wenzi {
			color:#333333;
		}
	}

	.cardBg1, .cardBg3 {
		.name {
			color:#333333;
		}
		.posi {
			color:#666666 !important;
			background:#F1F1F1 !important;
		}
		.company {
			color: #999999;
		}
		.wenzi {
			color:#333333;
		}
	}

	.cardBg3 {
		.name {
			color: #374A59;
		}
		.posi {
			color:#4185F7 !important;
			background:rgba(192,214,252,0.3) !important;
		}
	}

	.cardBg2 {
		.name {
			color:rgba(201,143,83,1);
		}
		.posi {
			color:rgba(255,255,255,0.73) !important;
			background:rgba(65,83,136,1) !important;
		}
		.company {
			color:rgba(255,255,255,0.6);
		}
		.wenzi {
			color:rgba(255,255,255,1);
		}
	}

</style>
