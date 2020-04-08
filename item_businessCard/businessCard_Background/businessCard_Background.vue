<template>
	<view class="page">

		<view class="templateCardBg">
			<card-bg-item1 :userDetails="userDetails" :cardBgId="currentSelectItem ? currentSelectItem.id : ''"></card-bg-item1>
		</view>

		<!-- 选择模板 -->
		<view class="bgTemCon">
			<view class="title">{{mode==1?"请选择默认头像":"请选择名片背景"}}</view>
			<view class="bgTemList" style="flex-wrap: wrap;">
				<view class="bgOne fx-column fx-row-center" v-for="(item,index) in (mode==1?avatarList:cardBackground)"  :key="index">
					<image @click="changeBg(index)" :src="item.image" :class="{'avaImg':mode==1}"  class="bgImg"></image>
					<image v-if="item.id === (mode==1?currentSelectAvatar.id:currentSelectItem.id)" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/xuanzec.png'" class="getImg"></image>
					<text class="bgtxt">{{item.title}}</text>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<wx-view custom-class="BtnCon">
			<view  @click="SelectCardBg" class="Btn">确定</view>
		</wx-view>
	</view>
</template>

<script>
	import cardBgItem1 from '../../components/cardBg/cardBgItem1.vue';


	import { CARD_BACKGROUND } from '@/js/constant';

	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				onlineSite: this.global.onlineSite,
				userDetails:{},
				userId: 0,
				bg0:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/bgwhite.png',
				bg1:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/bg.png',
				bg2:'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/bg2.png',
				cardBackground: CARD_BACKGROUND,
				currentSelectItem: {},
				mode:0 ,//1-选取头像模式
				avatarList:[],
				currentSelectAvatar:{}
			};
		},

		computed: {
		  //Vuex引入属性
		  ...mapState(['cardbgId','cardBgImage'])
		  
		},

		components:{
			cardBgItem1
		},

		created () {
			this.cardBackground.forEach(item => {
				item.isSelected = false;
			});
		},

		methods: {
			 //Vuex引入方法
			...mapMutations(['getCardbgId','getCardbgUrl','setAvatar']),
			// 改变图片的背景
			changeBg(index) {
				let item = this.mode==1?this.avatarList[index]:this.cardBackground[index];
				console.log(item)
				if(this.mode==1){
					this.setAvatar(item.image);
					this.currentSelectAvatar = item;
					this.userDetails.headImage=item.image;
					return;
				}
				this.getCardbgId(item.id);
				this.getCardbgUrl(item.image);
				this.currentSelectItem = item;
			},
			SelectCardBg(){
				uni.navigateBack({});
			},
			//获取名片信息
			getUserCardDetails() {
				uni.showLoading();
				this.$api.getUserCardDetails(this.userId, this.userId).then(result => {
					uni.hideLoading();
					const find = this.cardBackground.find(item => result.userMap.cardBackgroundId == item.id);
					if (find) {
						this.currentSelectItem = find;
					} else {
						this.currentSelectItem = this.cardBackground[0];
					}

					this.userDetails = result.userMap;
					//找到头像
					const find2 = this.avatarList.find(item => result.userMap.headImage == item.image);
					
					if (find2) {
						this.currentSelectAvatar = find2;
					} else {
						this.currentSelectAvatar = this.avatarList[0];
					}
					
					
					console.info(result)
				}).catch(error => {
					uni.hideLoading();
					console.error(error)
				})
			},
		},
		// 监听页面加载
		onLoad(options){
			this.userId = uni.getStorageSync('userId');
			console.log('监听页面加载');
			this.getUserCardDetails();
			const title = options.mode==1?"头像库":"名片背景"
			uni.setNavigationBarTitle({
				title
			})
			this.mode = options.mode || 0;
			//console.log('getUserCardDetails')
			if(this.mode==1){
				for(let i in [...Array(20).keys()]){
					this.avatarList.push({
						id:i,
						image:`http://card-1254165941.cosgz.myqcloud.com/avatarTemplate/${Number(i)+1}.jpeg`,
						title:""
					})
				}
			}

		},

	}
</script>

<style lang="less">

	@import "../../css/jss_base.less";

	.page {
		width: 100%;
		min-height: 100vh;
		background: #F5F5F5;
		padding-bottom: 100upx;
	}
	.page{
		width:100%;
		.templateCardBg{
			width:92%;text-align: center;margin:30upx auto;
		}
	}
	//个人信息
	.infoDe {
		width: 92%;
		margin: 30upx auto;
		background: #FFFFFF;
		height: 379upx;
		box-sizing: border-box;
		padding: 0 30upx 0 40upx;
		border-radius: 10upx;
		color: #333;
		background-image: url('http://card-1254165941.cosgz.myqcloud.com/cardImages/card/bg.png');
		background-position: 50%;
		background-size: 100%;
		background-repeat: no-repeat;

		.ava {
			&>image {
				width: 120upx;
				height: 120upx;
				margin-top: 56upx;
				margin-right: 24upx;
			}

			.nameInfoCon {
				margin-top: 56upx;
				margin-bottom: 30upx;

				.nameInfo {
					line-height: 60upx;
					align-items: center;

					.name {
						font-size: 36upx;
					}

					.posi {
						margin-left: 22upx;
						width: auto;
						height: 36upx;
						line-height: 36upx;
						border-radius: 23upx;
						background: #F1F1F1;
						font-size: 20upx;
						color: #666666;
						text-align: center;
						padding: 5upx 10upx;
					}
				}
			}

			.company {
				margin-top: 17upx;
				font-size: 24upx;
				font-family: PingFangSC;
			}
		}

		.per_de {
			.wenzi {
				font-size: 24upx;
				font-family: PingFangSC;
				margin-left: 28upx;
			}

			.wenzi_color {
				color: #333333;
			}

			image {
				width: 32upx;
				height: 32upx;
			}

			.ma {
				margin-bottom: 12upx;
			}

			.detail {

				// 超出部分显示...
				.edit {
					flex: 1;
				}

				.wenzi {
					flex: 18;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}

	// 选择名片背景
	.bgTemCon {
		margin-top: 93upx;

		.title {
			padding-left: 30upx;
			font-size: 32upx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 40upx;
		}

		.bgTemList {
			display: flex;

			.bgOne {
				position: relative;
				font-size: 28upx;
				color: #666666;
				width: 33.33%;
				margin-bottom: 30upx;

				.bgImg {
					width: 212upx;
					height: 124upx;
					
					&.avaImg{
						height: 212upx;
					}
				}
				
				

				.getImg {
					width: 48upx;
					height: 48upx;
					position: absolute;
					top: 50%;
					left: 50%;
					margin-top: -50upx;
					margin-left: -24upx;
				}

				.bgtxt {
					padding-top: 15upx;
					font-size: 28upx;
					color: #666666;
				}
			}

		}

		//选中的名片背景
		.active {
			color: #6B7AF8;
			font-size: 28upx;

			.mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 212upx;
				height: 124upx;
				background: rgba(0, 0, 0, 0.5);
				opacity: 0;
			}
		}
	}

	//按钮
	.BtnCon {
		position: fixed;
		bottom: 0;
		z-index: 99;
		width: 100%;
		height: 98upx;
		text-align: center;
		background: #FFFFFF;

		.Btn {
			width: 620upx;
			height: 80upx;
			line-height: 80upx;
			margin: 10upx auto;
			font-size: 28upx;
			color: #FFFFFF;
			background: #6B7AF8;
			border-radius: 40upx;
		}
	}
</style>
