<style scoped lang="less">
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

	.shop-info {
		background: #FFFFFF;
		padding: 40upx 30upx;
		display: flex;
		margin-bottom: 53upx;

		.shop-logo {
			width: 110upx;
			height: 110upx;
			background-color: #eee;
			margin-right: 20upx;
		}

		.shop-meta {
			flex: 1;

			.shop_name {
				font-size: 32upx;
				margin-bottom: 16upx;
				font-weight: bold;
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
		}

		.btn_shop_collect {
			border: 1upx solid #7483FF;
			border-radius: 20upx;
			font-size: 20upx;
			color: #7483FF;
			padding: 0 16upx;
			margin-right: 38upx;
			height: 40upx;
			line-height: 40upx;

			&.collected {
				border: 1upx solid #AAAAAA;
				color: #999999;
			}

		}

		.icon_more {
			width: 40upx;
			height: 40upx;
			background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDQwOCA0MDgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwOCA0MDg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0ia2V5Ym9hcmQtY29udHJvbCI+CgkJPHBhdGggZD0iTTUxLDE1M2MtMjguMDUsMC01MSwyMi45NS01MSw1MXMyMi45NSw1MSw1MSw1MXM1MS0yMi45NSw1MS01MVM3OS4wNSwxNTMsNTEsMTUzeiBNMzU3LDE1M2MtMjguMDUsMC01MSwyMi45NS01MSw1MSAgICBzMjIuOTUsNTEsNTEsNTFzNTEtMjIuOTUsNTEtNTFTMzg1LjA1LDE1MywzNTcsMTUzeiBNMjA0LDE1M2MtMjguMDUsMC01MSwyMi45NS01MSw1MXMyMi45NSw1MSw1MSw1MXM1MS0yMi45NSw1MS01MSAgICBTMjMyLjA1LDE1MywyMDQsMTUzeiIgZmlsbD0iIzY2NjY2NiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
			background-size: 100% 100%;
		}
	}

	.title {
		font-size: 32upx;
		color: #333333;
		display: flex;
		align-items: center;
		margin-bottom: 40upx;
		font-weight: bold;
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
	}

	.more {
		position: relative;
	}

	.dropDown {
		width: 280upx;
		position: absolute;
		top: 70upx;
		right: -10upx;
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
<template>
	<view class="page">

		<app-share-top-banner></app-share-top-banner>

		<view class="shop-info">
			<image class="shop-logo" :src="shopData.logo"></image>
			<!-- shopData -->
			<view class="shop-meta">
				<view class="shop_name">{{shopData.shopName?shopData.shopName:''}} </view>
				<view class="shop_footer-meta">
					<text class="shop_meta_type">{{shopData.businessLicence?'企业':'个体'}} </text>
					<text class="shop_meta_score">综合评分{{shopData.shopScore?shopData.shopScore:'5.0'}}</text>
				</view>
			</view>

			<view v-bind:class="[isCollect ? '' : 'collected', 'btn_shop_collect']" @click="CollectTap">{{isCollect?'已收藏':'收藏店铺'}}
			</view>

			<view class="more">
				<view class="icon_more" @click="showDropDown = true"></view>
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

		<!-- #2 店主推荐 -->
		<view class="title">
			<image class="icon_hot" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/remen.png'"></image>
			<view>店主推荐</view>
		</view>
		<view class="goods_hot_list">
			<goodsItemHot v-for="(n,index) in recommendList" :key='index' :value="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
			 :cardUserId='cardUserId' @addCar="addCar" :recommend-id="recommendId"></goodsItemHot>
			<view v-if="recommendList.length==0">
				<default-page :messageToPage="messageToPage1"></default-page>
			</view>
		</view>

		<!-- #3 全部商品 -->
		<view class="title" style="margin-top: 140upx;z-index: 10;">全部商品</view>
		<view class="goods_list">
			<goodsItem v-for="(n,index) in shopGoods" :key='index' :goods="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
			 :cardUserId='cardUserId' :recommend-id="recommendId"></goodsItem>
			<view v-if="shopGoods.length==0 && !loading" style="align-items: center;width: 100%;">
				<default-page :messageToPage="messageToPage2"></default-page>
			</view>
			<view style="flex: 1" v-else>
				<uni-load-more :loading-type="loadingType" ></uni-load-more>
			</view>


		</view>

		<!-- float button -->
		<car-float-button :value="cardProductNum"></car-float-button>

		<!-- bottom bar -->
		<tab-bar active="首页" :shop-id="shopIdOtherPeople" :recommend-id="recommendId" :card-user-id="cardUserId"></tab-bar>

		<view class="dropDownBackground" @click="showDropDown = false" v-if="showDropDown"></view>

		<goods-sku-select-modal v-if="skuModalVisible" :goods-sku='goodSku' @close="skuModalVisible = false" @confirm="confirm"></goods-sku-select-modal>
		<exclusive-shop-modal :shop-data='shopData' :recommend-list='recommendList' :shop-id="shopIdOtherPeople" :card-user-id="cardUserId" v-if="exclusiveVisible" @close="exclusiveVisible = false"></exclusive-shop-modal>

		<!-- 积分签到弹出层 -->
		<integral v-if="myIntegralVisible" @close="myIntegralVisible = false" :pointsScore="pointsScore" :continuation="false"></integral>

	</view>
</template>

<script>
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2';
	import shopMixins from '../_mixins/shopMixins';
	import tabBar from '../_component/tabBar';
	import goodsItem from '@/components/goodsItem';
	import goodsItemHot from '../_component/goodsItemHot';
	import GoodsSkuSelectModal from "../_modal/goodsSkuSelectModal";
	import exclusiveShopModal from "../_modal/exclusiveShopModal";
	import carFloatButton from "../_component/carFloatButton";
	import integral from '../../../components/myIntegral';
	import {
		isLog,
		disposeSku
	} from '../../../js/mzl.js'
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
				isCollect: false,
				myIntegralVisible: false, //积分签到成功
				shopData: {}, //店铺信息
				shopGoods: [], //所有商品
				recommendList: [], //商家推荐列表
				// 缺省页
				messageToPage1: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wushangpin.png',
					title: '商家没有推荐商品',
				},
				messageToPage2: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wushangpin.png',
					title: '商家没有上传商品',
				},
				goodSku: {}, //商品规格
				pageNo: 1, //页码
				is_lod_status: false,
				shopIdOtherPeople: '', //商家id
				SignIn: '', //是否签到
				goodsId: '', //当前商品id
				userId: '', //当前用户id、
				cardProductNum: 0,
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
			goodsItemHot,
			carFloatButton,
			integral
		},

		mixins: [shopMixins, loadMoreMixins],

		onLoad(options) {
			//获取token 调用登录
			
			let userId  = uni.getStorageSync('userId');
			let token  = uni.getStorageSync('token');
			let openid  = uni.getStorageSync('openid');
			
		if(!userId){ // 没读取到缓存 设置回调
					uni.login({
						  provider: 'weixin',
						  success: loginRes => {
							uni.showLoading();
							
								this.$api.GetUserId(loginRes.code).then(res=>{
										uni.setStorageSync('token', res.token);
										uni.setStorageSync('tokenTime',new Date().getTime());
										uni.setStorageSync('openid', res.openId);
										//登录成功
										if(res.userId){
											uni.setStorageSync('userId', res.userId);
							
											this.$store.dispatch('updateCurrentUserInfo').then(res=>{
													this.init(options);
											});
									
										}else this.init(options);
										
										
										uni.hideLoading();
										
								}).catch(error=>{
										this.init(options);
									 uni.hideLoading();
								});
								
						  }
					});
					
				}else{//获取到缓存数据
						this.$store.dispatch('updateCurrentUserInfo').then(res=>{
								this.init(options);
						});
						uni.hideLoading();
					
				}
			

		},
		// 监听页面显示
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
				

				this.getShopDetail();
				this.listShopRecommendGoods();
				this.fetch();
				this.showShoppingCart();

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
			// 获取购物车数量
			showShoppingCart() {
				if (!this.checkHasLogin()) {
					return false
				}
				this.$api.showShoppingCart().then(res => {
					console.log(res);
					this.cardProductNum = res.shoppingCartList.length;
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

			shareToTimeline() {

			},
			// 确定加入购物车 this.callbackData.skuNum,this.userId,this.callbackData.number,this.goodsId
			confirm(callbackData) {
				if (!this.checkHasLogin()) {
					return;
				}

				console.info(callbackData)
				this.$api.shoppingCart(callbackData.skuNum, this.userId, callbackData.number, this.goodsId, this.recommendId).then(
					res => {
						console.log(res);
						if (res.resultMap.length > 0) {
							this.showTips('加入购物车成功').then(value => {})
							this.cardProductNum += 1
						} else {
							this.showTips('加入购物车失败').then(value2 => {})
						}
					}).catch(res => {
					console.info(res)
					this.showTips('加入购物车失败').then(value2 => {})
				})
			},
			// 打开规格弹窗 ifExpire 0未过期 ，1过期
			addCar(goodsId) {
				if (!isLog()) {
					return false
				}
				if (this.shopData.ifExpire == 1) {
					this.showTips('店铺已过期...')
					return false
				}
				console.info(goodsId)
				this.goodsId = goodsId;
				this.$api.getGoodsSku(goodsId).then((result) => {
					let {
						skuJson,
						skuIdJson,
						mpGoodsSkuList,
						mpGoods
					} = result;
					let list = []

					skuJson = JSON.parse(skuJson.replace(/\'/g, '"'));
					skuIdJson = JSON.parse(skuIdJson.replace(/\'/g, '"'));

					const skuJsonKeys = Object.keys(skuJson);
					const skuIdJsonKeys = Object.keys(skuIdJson);

					skuJsonKeys.forEach((key, index) => {
						let idKey = skuIdJsonKeys[index];
						list.push({
							id: idKey,
							name: key,
							sku: this.toSkuArray(skuJson[key], skuIdJson[idKey], mpGoodsSkuList)
						})
					})

					let map = {};
					mpGoodsSkuList.forEach(item => {
						const key = Object.keys(item)[0];
						map[key] = item[key]
					})

					this.goodSku = {
						list,
						dataMap: map,
						mpGoods,
					}

					this.skuModalVisible = true;
					console.info(this.goodSku)
				}).catch(err => {
					console.info(err)
				})
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
			...mapMutations(['setCardUserId', 'setUPinfo', 'setCarGoods'])
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
