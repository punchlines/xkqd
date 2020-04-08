
<template>
	<view class="page">

		<app-share-top-banner></app-share-top-banner>

		<view class="shop-info">
			<image class="shop-back" src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/bg2.png"></image>
			<image class="shop-logo" :src="shopData.logo"></image>
			<!-- shopData -->
				<view class="shop_name">{{shopData.shopName?shopData.shopName:''}} </view>
				

			<view v-if="!isSelfShop" v-bind:class="[isCollect ? '' : 'collected', 'btn_shop_collect']" @click="CollectTap">{{isCollect?'已收藏':'收藏店铺'}}
			</view>

			<view class="more">
				<view class="icon_more" @click="showDropDown = true">
					<text class="more_text"></text>
					<text class="more_sec"></text>
					<text class="more_thr"></text>
				</view>
				<view class="dropDown" v-if="showDropDown" @click="showDropDown = false">
					<view @click="viewShopInfo">查看店铺资料</view>
					<view @click="viewExclusiveShopImage">专属店铺图片</view>
					<!-- #ifdef APP-PLUS -->
					<view @click="shareToFriend">分享至微信好友</view>
					<!-- #endif -->

					<!-- #ifdef MP-WEIXIN -->
					<view style="position: relative;">
						<text>分享至微信好友</text>
						<button class="but" open-type="share"></button>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<!-- 图标 -->
		<view class="icon_img"  v-if="isSelfShop">
			<view class="icon_mel" @click="changeTemplate">
				<view class="fir">
					<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/scon1.png" alt="" mode="aspectFit">
				</view>
				
				<view>店铺模板</view>
			</view>
			<view class="icon_sec" @click="pusblishGoods">
				<view class="fir">
					<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/scon2.png" alt="" mode="aspectFit">
				</view>
				<view>发布新商品</view>
			</view>
			<view class="icon_thi" @click="underGoods">
				<view class="fir">
					<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/scon3.png" alt="" mode="aspectFit">
				</view>
				<view>下架商品</view>
			</view>
			<view class="icon_fou"  @click="openVip">
				<view class="fir">
					<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/scon4.png" alt="" mode="aspectFit">
				</view>
				<view>尊享VIP</view>
			</view>
		</view>



		<!-- #2 店主推荐 -->
		<view class="title">
			<image class="icon_hot" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/remen.png'"></image>
			<view>店主推荐</view>
		</view>
		<view class="goods_hot_list">
			<goodsSecond v-for="(n,index) in recommendShopGoods" :key='index' :value="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
			 :cardUserId='cardUserId'  :isSelfShop="isSelfShop" @allMoreInfo="allmoreInfo"  @addCar="addCar" :recommend-id="recommendId"></goodsSecond>
			<view v-if="recommendShopGoods.length==0">
				<default-page :messageToPage="messageToPage1"></default-page>
			</view>
		</view>

		<!-- #3 全部商品 -->
		<view class="title" style="margin-top: 100upx;z-index: 10;">全部商品</view>
		<view class="goods_list">
			<goodsItem v-for="(n,index) in shopGoods" :key='index' :goods="n" :value="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
			 :cardUserId='cardUserId'  @addCar="addCar"  :showBtn="true"  :isSelfShop="isSelfShop" @allMoreInfo="allmoreInfo"  :recommend-id="recommendId"></goodsItem>
			<view v-if="shopGoods.length==0 && !loading" style="align-items: center;width: 100%;">
				<default-page :messageToPage="messageToPage2"></default-page>
			</view>
	
		</view>
		
		<uni-load-more  v-if="!(shopGoods.length==0 && !loading)"  :loading-type="loadingType" ></uni-load-more>
		<!-- float button -->
		<car-float-button  v-if="!isSelfShop" :value="cardProductNum"></car-float-button>

		<!-- bottom bar -->
		<tab-bar v-if="!isSelfShop" active="首页" :shop-id="shopIdOtherPeople" :recommend-id="recommendId" :card-user-id="cardUserId"></tab-bar>

		<view class="dropDownBackground" @click="showDropDown = false" v-if="showDropDown"></view>

		<goods-sku-select-modal   @select="onSelect" v-if="skuModalVisible" :goods-sku='goodSku' @close="skuModalVisible = false" @confirm="confirm"></goods-sku-select-modal>
		<exclusive-shop-modal :shop-data='shopData' :recommend-list='recommendShopGoods' :shop-id="shopIdOtherPeople" :card-user-id="cardUserId" v-if="exclusiveVisible" @close="exclusiveVisible = false"></exclusive-shop-modal>

		<!-- 积分签到弹出层 -->
		<integral v-if="myIntegralVisible" @close="myIntegralVisible = false" :pointsScore="pointsScore" :continuation="false"></integral>


		  <!-- 热门推荐弹窗 -->
	<view class="recommendModel" v-if="isShow">
		<view class="recommedCon">
			<view class="topCon">
				<view class="goodsCon fx-row">
					<view class="img">
						<image :src="oneGoods.covermage" mode="aspectFill" class="bb"></image>
					</view>
					<view class="infoCon fx-column fx-row-space-between">
						<view class="name single-line">{{oneGoods.title}}</view>
						<view class="detail fx-row fx-row-space-between">
							<text class="price">￥{{oneGoods.preferentialPrice}}</text>
							<text class="number">已售{{oneGoods.salesNum}}</text>
						</view>
					</view>
				</view>
				<!-- <view class="date">上次编辑时间：{{oneGoods.updateTime | formatDate}}</view> -->
			</view>
			<view class="bottomCon fx-column fx-row-center">
				<view class="cancel" @click="cancelRecommend(oneGoods.goodsId)" v-if="oneGoods.shopRecommend==1">取消店主推荐</view>
				<view class="cancel" @click="toRecommend(oneGoods.goodsId)" v-else>设为店主推荐</view>
				<view class="down" @click="downGoods(oneGoods.goodsId)">下架商品</view>
			</view>
			<!-- 退出 -->
			<view class="out" @click="outClick">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tuichu.png'"></image>
			</view>
		</view>
		<!-- 分享至微信 -->
		<view class="shareWX fx-column fx-row-center" @click="shareClick">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/weixinhaoyou.png'" mode="widthFix"></image>
			<text>微信好友</text>
			<button class="but" open-type="share"></button>
		</view>

	</view>
	</view>
</template>

<script>
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2';
	import shopMixins from '../_mixins/shopMixins';
	import tabBar from '../_component/tabBar';
	import goodsItem from '@/components/goodsItem';
	import goodsSecond from '../_component/goodsSecond';
	import GoodsSkuSelectModal from '@/components/shop/modal/goodsSkuSelectModal';
	import exclusiveShopModal from "../_modal/exclusiveShopModal";
	import carFloatButton from "../_component/carFloatButton";
	import integral from '../../../components/myIntegral';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				onlineSite: this.global.onlineSite,
				showDropDown: false,
				skuModalVisible: false,
				exclusiveVisible: false,
				myIntegralVisible: false, //积分签到成功
				shopGoods: [], //所有商品
				recommendList: [], //商家推荐列表
				recommendShopGoods:[],
				goodSku: {}, //商品规格
				pageNo: 1, //页码
				is_lod_status: false,
				shopIdOtherPeople: '', //商家id
				SignIn: '', //是否签到
				goodsId: '', //当前商品id
				userId: '', //当前用户id、
				recommendId: 0,
				pointsScore: 0,

				cardUserId: '',
			};
		},
		components: {
			GoodsSkuSelectModal,
			exclusiveShopModal,
			tabBar,
			goodsItem,
			goodsSecond,
			carFloatButton,
			integral
		},

		mixins: [shopMixins, loadMoreMixins],


		// 监听页面显示
		onShow: function() {},
		methods: {
			init(options){
				this.userId = uni.getStorageSync('userId')
				//console.log(this.userId,this.$store.state.currentUser)
				this.shopIdOtherPeople = options.shopIdOtherPeople || options.shopId;
				if (!this.checkHasLogin(`/module/shop/home/home?shopId=${this.shopIdOtherPeople}`,true)) {
					//console.log('123')
					return false;
				}
		
				console.info(Number(options.SignIn));
				if (Number(options.SignIn) == 0) {
					this.myIntegralVisible = true;
				}
				if (options.pointsScore) {
					this.pointsScore = options.pointsScore;
				}

				this.recommendId = options.recommendId || '';
				if (this.shopIdOtherPeople === this.currentUser.shopId && !this.isVipUser) {
					this.recommendId = this.userId;
				}
				

				//this.getShopDetail();
				this.listShopRecommendGoods();
				this.fetch();
			

				this.cardUserId = options.cardUserId;
				
			},
			fetch () {
				this.$api.listMyShopGoods(this.shopIdOtherPeople, 0, this.currentPage).then(result => {
					if (this.currentPage === 1) {
						this.shopGoods = [];
						this.recommendShopGoods = result.myShopGoodsList.filter(item => item.shopRecommend == 1);
					}

					this.loading = false;
					const list = result.myShopGoodsList;
					if (list.length === 0) {
						this.noMore = true;
					}
					this.shopGoods = this.shopGoods.concat(list);
					this.currentPage++;

					// console.log(result)
					// if ((!result.code) && result.myShopGoodsList.length > 0) {
					// 	this.pageNo += 1
					// 	this.is_lod_status = false
					// 	this.shopGoods = [...this.shopGoods, ...result.myShopGoodsList]
					// } else {
					// 	this.is_lod_status = true
					// }
				}).catch(error => {
					console.error(error)
				})
			},
		
			// 收藏事件
			CollectTap() {
				if (!this.checkHasLogin()) {
					return false
				}
				this.$api.collect(this.userId, this.shopIdOtherPeople, 2).then(res => {
					this.isCollect = !this.isCollect
					uni.showToast({
						title: this.isCollect ? '收藏成功' : '已取消',
						duration: 2000
					});
				})
			},
			openCar() {
				uni.navigateTo({
					url: '../car/car'
				});
			},
			viewShopInfo() {
				this.navigateTo('../shopInfo/shopInfo', {
					shopIdOtherPeople: this.shopIdOtherPeople
				})
			},
			viewExclusiveShopImage() {
				this.exclusiveVisible = true;
			},
			// 分享app
			shareToFriend() {
				let recommendId = '';
				if (this.shopIdOtherPeople === this.currentUser.shopId && !this.isVipUser) {
					recommendId = this.userId;
				}
				this.appShare('/module/shop/home/home?shopIdOtherPeople=' + this.shopIdOtherPeople + '&cardUserId=' + this.cardUserId +
								'&shareId=' + recommendId, this.shopData.shopName)
			},

			toSkuArray(array, idArray) {
				const result = []
				const skuList = JSON.parse(array);
				const skuIdList = idArray;
				for (let i = 0; i < skuList.length; i++) {
					result.push({
						id: skuIdList[i],
						name: skuList[i],
						select: i === 0,
					})
				}
				return result;
			},
			// 积分签到成功
			agreeSignin() {
				this.showSignIn = false;
			},
			// 获取企业信息 shopGrade ifExpire 0未过期 ，1过期
			getShopDetail() {
				this.$api.getShopDetail(this.shopIdOtherPeople).then(result => {
					console.info('获取企业信息')
					console.log(result)
					this.isCollect = result.collectStatus == 1;
					this.shopData = result.shopData;
					this.shopData.shopScore = this.shopData.shopScore ? this.shopData.shopScore.toFixed(1) : ''
					console.info(this.shopData.shopScore)
					uni.setNavigationBarTitle({
						title: result.shopData.shopName
					});
				}).catch(error => {
					console.error(error)
				})
			},
			// 获取商家推荐列表 shopIdOtherPeople,pageNo
			listShopRecommendGoods() {
				this.$api.listShopRecommendGoods(this.shopIdOtherPeople, 1).then(result => {
					// console.log(result.recommendList)
					this.recommendList = result.recommendList
				}).catch(error => {
					console.error(error)
				})
			},
			//Vuex引入方法
			...mapMutations(['setCardUserId', 'setUPinfo', 'setCarGoods']),
			//点击事件
			changeTemplate(){//更换店铺模板
			  uni.navigateTo({
			    url: '../../../item_businessCard/businessCard_ShopTemplate/businessCard_ShopTemplate?shopId='+this.shopId+"&templateId="+this.templateId
			  });
			},
			pusblishGoods(){ //发布商品
				const userType = Number(this.currentUser.userType);
				if (this.availableCount <= 0) {
					if (userType === 2 || userType === 3) {
						this.showModalTap();
					} else {
						this.showTips('已到达产品上传上限');
					}
					return;
				}
			
				uni.navigateTo({
					url: '../../../item_businessCard/businessCard_publishNewGoods/businessCard_publishNewGoods?shopId='+this.shopId + '&count=' + this.availableCount
				});
			},
			showModalTap(){
			  let that=this
			  uni.showModal({
			    title: '已到达产品上传上限',
			    content: '去开通更高级VIP权限吗？',
			    success: function (res) {
			      if (res.confirm) {
			        // 关闭当前页跳转
			        that.openVip()
			      } else if (res.cancel) {
			        console.log('用户点击取消');
			      }
			    }
			  });
			},
			openVip(){//开通Vip
			  uni.navigateTo({
			    url: '../../../item_businessCard/businessCard_VIP/businessCard_VIP_New?urlType='+'myShop'
			  });
			},
			underGoods(){//下架商品
			  uni.navigateTo({
			    url: '../../../item_businessCard/businessCard_UnderGoods/businessCard_UnderGoods?shopId='+this.shopId
			  });
			},
		},
		computed: {
			//Vuex引入属性
			...mapState(['UPinfo', 'carGoods'])
		},

		/**
		 * 页面分享 shopData.logo
		 */
		onShareAppMessage(res) {
			let recommendId = '';
			if (this.shopIdOtherPeople === this.currentUser.shopId && !this.isVipUser) {
				recommendId = this.userId;
			}
			this.$api.share(this.shopIdOtherPeople, 2);
			return {
				title: this.shopData.shopName,
				path: '/module/shop/home/home?shopIdOtherPeople=' + this.shopIdOtherPeople + '&cardUserId=' + this.cardUserId +
					'&shareId=' + recommendId,
				success(p) {}
			}
		},
	}
</script>
<style scoped lang="less">
		@import "../../../css/jss_base.less";
	.but {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	.page {
		background: #F5F5F5;
		padding-bottom: 128upx;
		min-height: 100vh;
	}
// 图标
	.icon_img{
		display: flex;
		width: 100%;
		margin-bottom: 45upx;
		margin-top: 5upx;
		background: #fff;
		padding: 25upx 0 25upx 0;
		.icon_mel{
			flex: 1;
			margin-left: 7upx;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 50upx;
				height: 50upx;
			}
			view{
				font-size: 30upx;
				text-align: center;
				color: rgba(149, 149, 149, 1);
			}
		}
		.icon_sec{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 50upx;
				height: 50upx;
			}
			view{
				font-size: 30upx;
				text-align: center;
				color: rgba(149, 149, 149, 1);
			}
		}
		.icon_thi{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 50upx;
				height: 50upx;
			}
			view{
				font-size: 30upx;
				text-align: center;
				color: rgba(149, 149, 149, 1);
			}
		}
		.icon_fou{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 50upx;
				height: 50upx;
			}
			view{
				font-size: 30upx;
				text-align: center;
				color: rgba(149, 149, 149, 1);
			}
		}
	}
	.shop-info {
		.shop-back{
			position: relative;
			width: 100%;
			height: 227upx;
		}
		.shop-logo {
			width: 100upx;
			height: 100upx;
			position: absolute;
			left: 25upx;
			top: 115upx;
			border-radius: 10upx;
		}
			
			.shop_name {
				font-size: 40upx;
				font-weight: bold;
				position: absolute;
				top: 140upx;
				left: 142upx;
				color: #fff;
			}

			.shop_footer-meta {
				display: flex;

				.shop_meta_type {
					font-size: 20upx;
					color: #FFFFFF;
					background: #4CA3FF;
					border-radius: 18upx;
					padding: 4upx 16upx;
					margin-right: 20upx;
				}

				.shop_meta_score {
					font-size: 24upx;
					color: #666666;
				}
			}

		.btn_shop_collect {
			border: 1upx solid #7483FF;
			border-radius: 20upx;
			font-size: 22upx;
			color: #7483FF;
			padding: 0 16upx;
			height: 40upx;
			line-height: 36upx;
			position: absolute;
			top: 50upx;
			right: 101upx;

			&.collected {
				border: 1upx solid #fff;
				color: #fff;
			}

		}

		.icon_more {
			width: 53upx;
			height: 10upx;
			//background-image: url(http://card-1254165941.cosgz.myqcloud.com/shopTemplate/small.png);
			//background-size: 100% 100%;
			//background-repeat: no-repeat;
			position: absolute;
			right: 25upx;
			top: 50upx;
			
			.more_text{
				width: 5upx;
				height: 5upx;
				border: 1upx solid #fff;
				border-radius: 20upx;
				background: #fff;
				position: absolute;
				
			}
			.more_sec{
				width: 5upx;
				height: 5upx;
				border: 1upx solid #fff;
				border-radius: 20upx;
				background: #fff;
				position: absolute;
				left:22upx;
			}
			.more_thr{
				width: 5upx;
				height: 5upx;
				border: 1upx solid #fff;
				border-radius: 20upx;
				background: #fff;
				position: absolute;
				left:45upx;
			}
		}
// 		.icon_more {
// 			width: 40upx;
// 			height: 40upx;
// 			background-image: url(http://card-1254165941.cosgz.myqcloud.com/shopTemplate/dot.png);
// 			background-size: 100% 100%;
// 			position: absolute;
// 			top: 65upx;
// 			right: 29upx;
// 			background-repeat: no-repeat;
// 		}
	}

	.title {
		font-size: 32upx;
		color: #333333;
		display: flex;
		align-items: center;
		margin-bottom: 40upx;
		font-weight: 600;
		padding: 0 30upx;

		.icon_hot {
			width: 29upx;
			height: 29upx;
			margin-right: 20upx;
		}		
	}

	.goods_hot_list {
		padding: 0 30upx;
	
	}

	.goods_list {
		padding: 0 30upx;
		display: flex;
		flex-wrap: wrap;
		//overflow-x: scroll;
	}

	.more {
		// position: relative;
	}

	.dropDown {
		width: 280upx;
		position: absolute;
		top: 98upx;
		right: 10upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0upx 1upx 8upx 0upx rgba(187, 187, 187, 0.55);
		z-index: 1000;
		zoom: 1;
		border-radius: 8upx;

		view {
			font-size: 28upx;
			color: #333333;
			line-height: 104upx;
			text-align: center;

			&:after {
				content: "";
				display: block;
				width: calc(~"100%"- 40upx);
				height: 2upx;
				background-color: #E1E1E1;
				margin-left: 20upx;
			}

			&:active {
				background-color: #eee;
			}

			&:last-child {
				&:after {
					display: none;
				}
			}

		}

		&:before {
			content: "";
			position: absolute;
			width: 0;
			height: 0;
			top: 0;
			right: -15upx;
			box-sizing: border-box;
			border: 16upx solid black;
			border-color: transparent transparent #fff #fff;
			transform-origin: 0 0;
			transform: rotate(135deg);
			box-shadow: -1upx 1upx 8upx -1upx rgba(187, 187, 187, 0.55);
		}
	}

	.dropDownBackground {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
	}

	.fs3a32 {
		color: #333;
		font-size: 32upx;
	}

	.fs6a24 {
		color: #666;
		font-size: 24upx
	}

	.fsf28 {
		color: #fff;
		font-size: 28upx;
	}

	.fs3a28 {
		color: #333;
		font-size: 28upx;
	}

	//按钮
	.buttonRadius(@w: 620upx;
	@h: 88upx;
	@bg: #7483FF;

	) {
		width: @w;
		height: @h;
		background: @bg;
		border-radius: @h/2;
		text-align: center;
		line-height: @h;
	}

	// 弹出层
	.container3 {
		z-index: 999999;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		text-align: center;

		// 删除日志
		.DLlist {
			width: 624upx;
			height: 660upx;
			background: #fff;
			position: absolute;
			border-radius: 28upx;
			top: 50%;
			left: 50%;
			margin-left: -312upx;
			margin-top: -330upx;

			image {
				width: 100%;
				height: 340upx;
			}

			.SinginSucc {
				color: #7483FF;
				margin-top: 50upx;
				margin-bottom: 30upx;
			}

			.SinginButon {
				margin: 30upx auto;
				.buttonRadius(@w: 328upx, @h: 80upx);
			}
		}
	}
</style>

