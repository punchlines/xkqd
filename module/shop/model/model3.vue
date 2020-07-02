

<template>
	<view class="page">

		<app-share-top-banner></app-share-top-banner>

		<view class="shop-info">
			<image class="shop-back" src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/bg3.png"></image>
			<image class="shop-logo" :src="shopData.logo"></image>
			<!-- shopData -->
				<view class="shop_name">{{shopData.shopName?shopData.shopName:''}} </view>
				

			<view v-if="!isSelfShop" v-bind:class="[isCollect ? '' : 'collected', 'btn_shop_collect']" @click="CollectTap">{{isCollect?'已收藏':'收藏店铺'}}
			</view>

			<view class="more">
				<view class="icon_more"  @click="showDropDown = true">
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
			<!-- 文字 -->
			<view class="wen">商品上新</view>
			<view class="su">速来抢购</view>
			
			
			<!-- 图标 -->
			<view class="icon_img"  v-if="isSelfShop&& userType <5">
				<view class="icon_mel" @click="changeTemplate">
					<view class="fir">
						<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/ticon1.png" alt="" mode="aspectFit">
					</view>
					
					<view>店铺模板</view>
				</view>
				<view class="icon_sec" @click="pusblishGoods">
					<view class="fir">
						<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/ticon2.png" alt="" mode="aspectFit">
					</view>
					<view>发布新商品</view>
				</view>
				<view class="icon_thi" @click="underGoods">
					<view class="fir">
						<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/ticon3.png" alt="" mode="aspectFit">
					</view>
					<view>下架商品</view>
				</view>
				<view class="icon_fou" @click="openVip">
					<view class="fir">
						<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/ticon4.png" alt="" mode="aspectFit">
					</view>
					<view>尊享VIP</view>
				</view>
			</view>
		</view>

		



		<!-- #2 店主推荐 -->
		<view class="title">			
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
		<view class="title" style="z-index: 10;">全部商品</view>
		<view class="goods_list">
			<goodsThird v-for="(n,index) in shopGoods" :key='index' :value="n" :goods="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
			 :cardUserId='cardUserId'  :isSelfShop="isSelfShop" @allMoreInfo="allmoreInfo"  @addCar="addCar" :recommend-id="recommendId"></goodsThird>
			<view v-if="shopGoods.length==0 && !loading" style="align-items: center;width: 100%;">
				<default-page :messageToPage="messageToPage2"></default-page>
			</view>
			<view style="flex: 1" v-else>
				<uni-load-more :loading-type="loadingType" ></uni-load-more>
			</view>
		</view>

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
						<!-- <default-image :src="oneGoods.covermage" custom-class="bb"></default-image> -->
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
				<view class="cancel" @click="cancelRecommend(oneGoods.goodsId)" v-if="oneGoods.shopRecommend==1" :style="{background:(userType <5 ?'#6B7AF8':'#999999'),pointerEvents:(userType <5 ?'':'none')}">取消店主推荐</view>
				<view class="cancel" @click="toRecommend(oneGoods.goodsId)" v-else :style="{background:(userType <5 ?'#6B7AF8':'#999999'),pointerEvents:(userType <5 ?'':'none')}">设为店主推荐</view>
				<view class="down" @click="downGoods(oneGoods.goodsId)" :style="{background:(userType <5 ?'#F8F8FF':'#999999'),color:(userType <5 ?'#6B7AF8':'#ffffff'),pointerEvents:(userType <5 ?'':'none')}">下架商品</view>
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
	import goodsThird from '../_component/goodsThird';
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
				userType:'',
				recommendId: 0,
				pointsScore: 0,

				cardUserId: '',
			};
		},
		components: {
			GoodsSkuSelectModal,
			exclusiveShopModal,
			tabBar,
			goodsThird,
			goodsSecond,
			carFloatButton,
			integral
		},

		mixins: [shopMixins, loadMoreMixins],

		// 监听页面显示
		// 监听页面显示
			onShow() {
			// let options = uni.getStorageSync('option');
			// this.init(options)
			// this.getShopDetail()
		},
		onLoad(options) {
			// console.log(options)
			// this.option=options
			// uni.setStorageSync('option', this.option);
		},
		methods: {
			init(options){
				this.userId = uni.getStorageSync('userId')
				this.userType=options.userType
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
		position: absolute;
		display: flex;
		top: 304upx;
		left: 28upx;
		.icon_mel{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 68upx;
				height: 68upx;
			}
			view{
				font-size: 24upx;
				text-align: center;
				color: rgba(255, 254, 254, 1);
			}
		}
		.icon_sec{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 68upx;
				height: 68upx;
			}
			view{
				font-size: 24upx;
				text-align: center;
				color: rgba(255, 254, 254, 1);
			}
		}
		.icon_thi{
			flex: 1;
			width: 185upx;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 68upx;
				height: 68upx;
			}
			view{
				font-size: 24upx;
				text-align: center;
				color: rgba(255, 254, 254, 1);
			}
		}
		.icon_fou{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 68upx;
				height: 68upx;
			}
			view{
				font-size: 24upx;
				text-align: center;
				color: rgba(255, 254, 254, 1);
			}
		}
	}
	.shop-info {
		.shop-back{
			position: relative;
			width: 100%;
			height: 418upx;
		}
		.shop-logo {
			width: 176upx;
			height: 176upx;
			position: absolute;
			left: 28upx;
			top: 55upx;
			border-radius: 50%;
		}
			
			.shop_name {
				font-size: 40upx;
				font-weight: bold;
				position: absolute;
				top: 139upx;
				left: 245upx;
				color: #fff;
				letter-spacing: 4rpx;
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
			// 文字
			.wen{
				position: absolute;
				color: #fff;
				top: 180upx;
				left: 413upx;
				font-size: 54upx;
				font-weight: bold;
			}
			.su{
				position: absolute;
				color: #fff;
				top: 270upx;
				left: 509upx;
				font-size: 46upx;
				font-weight: bold;
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
			
			.more_text{
				width: 5upx;
				height: 5upx;
				border: 1upx solid #fff;
				border-radius: 20upx;
				background: #fff;
				position: absolute;
				top: 65upx;
				right: 29upx;
			}
			.more_sec{
				width: 5upx;
				height: 5upx;
				border: 1upx solid #fff;
				border-radius: 20upx;
				background: #fff;
				position: absolute;
				top: 65upx;
				right: 45upx;
			}
			.more_thr{
				width: 5upx;
				height: 5upx;
				border: 1upx solid #fff;
				border-radius: 20upx;
				background: #fff;
				position: absolute;
				top: 65upx;
				right: 61upx;
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
		font-size: 40upx;
		color: #333333;
		display: flex;
		align-items: center;
		margin-bottom: 40upx;
		font-weight: bold;
		padding: 30upx 30upx 0 30upx;			
	}

	.goods_hot_list {
		padding: 0 30upx;
	}

	.goods_list {
		padding: 0 30upx;
		//display: flex;
		//flex-wrap: wrap;
	}

	.more {
		// position: relative;
	}

	.dropDown {
		width: 280upx;
		position: absolute;
		top: 96upx;
		right: 8upx;
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

