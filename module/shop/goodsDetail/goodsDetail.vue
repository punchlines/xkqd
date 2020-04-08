<template>
	<view class="page">
		<!-- <title-bar :title="title" ref="titlebar"></title-bar> -->
		<app-share-top-banner></app-share-top-banner>
		<!-- 商品轮播图  -->
		<view class="goods-banner">
			<view class="banner-image" v-show="bannerTabActive === 'image'">
        <view class="banner-image-count">{{ imageBannerCurrent + 1 }}/{{ trundleImageList.length }}</view>
        <swiper class="swiper" autoplay @change="bannerChange" :current="imageBannerCurrent" v-if="trundleImageList.length > 0">
          <swiper-item v-for="item in trundleImageList" :key="item">
            <image :src="item" @click="previewImage(item)" mode="aspectFill"></image>
          </swiper-item>
        </swiper>
      </view>
			<view class="banner-video" v-show="bannerTabActive === 'video' && !isShowModal">
				<view class="video-cover-container">
					<video-container :cover="goods.coverImage" :video="goods.coverVideo"></video-container>
				</view>
				<!--<video :src="goods.coverVideo"></video>-->
			</view>
			<!-- #ifndef APP-PLUS -->
				<template v-if="goods.coverVideo && !isShowModal">
					<cover-view class="banner-tab"></cover-view>
					<cover-view class="coverView video" :class="{ active: bannerTabActive === 'video' }" @click="bannerTabActive = 'video'">视频</cover-view>
					<cover-view class="coverView" :class="{ active: bannerTabActive === 'image' }" @click="bannerTabActive = 'image'">图片</cover-view>
					<!-- <view class="coverView" :class="{ active: bannerTabActive === 'video' }" @click="bannerTabActive = 'video'">视频</view>
					<view class="coverView" :class="{ active: bannerTabActive === 'image' }" @click="bannerTabActive = 'image'">图片</view> -->
				</template>
			<!-- #endif -->
		

		</view>

		<!-- 商品简要信息 -->
		<view class="fn-wrap">
			<view class="price-wrap">
				<view class="goods-price">
					<price :size="40" v-model="goodsPrice" color="#FF5858"></price>
				</view>
				<view class="old_price">¥{{ originalPriceShow }}</view>
				<view class="right" v-if="!isGift">
					<!--  #ifdef  APP-PLUS -->
					<button class="shareBtn" @click="shareGoods">
						<image src="http://card-1254165941.cosgz.myqcloud.com/images/share@2x.png" />
						<view>分享</view>
					</button>
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<button class="shareBtn" open-type="share">
						<image src="http://card-1254165941.cosgz.myqcloud.com/images/share@2x.png" />
						<view>分享</view>
					</button>
					<!--  #endif -->
				</view>
			</view>
			<view class="fn_goods_name">
				<view class="mod_tag" v-if="shopGrade">{{ shopGrade }}</view>
				<text class="goods_name">{{ goods.title }}</text>
			</view>
			<view class="detail_serve">
				<view class="detail_serve-item">快递：{{ goods.franking | price }}</view>
				<view class="detail_serve-item">已售：{{ goods.salesNum }}</view>
				<view class="detail_serve-item">{{ shop.province }}{{ shop.city }}</view>
			</view>
		</view>

		<!-- 商品 sku -->
		<view class="sku_container">
			<view class="sku_choose_info" @click="selectSku">
				<text class="sku_choose_label">规格</text>
				<text class="sku_choose">{{skuData?'已选：'+skuData:'请选择规格'}} </text>
			</view>
			<view class="sku_choose_info" @click="protectionModalVisible = true" v-if="goodsService">
				<text class="sku_choose_label">服务</text>
				<text class="sku_choose">{{ goodsService }}</text>
			</view>
			<view class="sku_choose_info" @click="goodsParamsModalVisible = true" v-if="goodsParamsName">
				<text class="sku_choose_label">参数</text>
				<text class="sku_choose">{{ goodsParamsName }}</text>
			</view>
		</view>

		<!-- 评论 -->
		<view class="comment_container" v-if="commentList.length > 0">
			<view class="title">评论（{{ commentList.length }}）</view>

			<scroll-view scroll-x>
				<view class="comment_list">
					<view class="comment_item" v-for="(comment,index) in commentList" :key="index">
						<view class="comment_user">
							<image class="avatar" :src="comment.headImage"></image>
							<text class="user">{{ comment.name }}</text>
							<text class="date">{{ comment.createTime }}</text>
						</view>
						<view class="comment_info">
							{{ comment.appraiseContent }}
						</view>
						<view class="comment_goods_sku">
							<view class="comment_goods_sku_item">{{comment.skuList.length>1?comment.skuList[0]+'-'+comment.skuList[1]:comment.skuList[0]}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="comment_button" @click="openComment">查看更多评论 <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/qianwang.png'"></image>
			</view>
		</view>

		<!-- 店主推荐 -->
		<view class="owner_recommend" v-if="!isGift">
			<view class="title">店主推荐</view>
			<view class="goods_list">
				<label v-for="(item,index) in recommendList" :key="index" @click="openGoodsDetail(item.goodsId)">
					<view class="owner_recommend_goods">
						<image :src="item.covermage" class="cover"></image>
						<view class="goods_name single-line" style="width: 300upx;">{{item.title}}</view>
						<view class="buy_wrap">
							<view class="price">
								<price :value="item.preferentialPrice||0" :size="30"></price>
							</view>
							<text class="count">已售{{item.salesNum}}</text>
						</view>
					</view>
				</label>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="goods_detail">
			<view class="title">商品详情</view>
			<view class="goods_detail_content">
				<rich-text :nodes="goods.details"></rich-text>
			</view>
		</view>

		<!-- 猜你喜欢 -->
		 <recommend v-if="!isGift" :shopId="shopId"></recommend>

		<!-- 底部操作按钮 -->
		<view class="footer_bar" v-if="!isGift">
			<view class="icon_btn" @click="homeTap">
				<image class="icon icon_home" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/dianpu.png'"></image>
				<view class="text">首页</view>
			</view>
			<view class="icon_btn" @click="openChat">
				<image class="icon icon_service" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/kefu.png'"></image>
				<view class="text">客服</view>
			</view>
			<view class="icon_btn" @click="CollectTap">
				<image v-if="isCollect" class="icon icon_collect" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/shoucang.png'"></image>
				<image v-else class="icon icon_collect" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/shoucangun.png'"></image>
				<view class="text">收藏</view>
			</view>
			<view class="btn_group">
				<view class="button one" :class="{'disabled':hasEvent==1}" v-if="isSelfGoods" @click="editGoods">编辑商品</view>
				<template v-else>
					<view class="button add_car" @click="addCar" :disabled="isOutOfStock">加入购物车</view>
					<view class="button buy" @click="buy" :disabled="isOutOfStock">立即购买</view>
				</template>
			</view>
		</view>

		<template v-if="isNormalUser && !!currentUser.id && isGift">
			<view style="height: 100upx"></view>
			<button class="footer-button btn-primary"  @click="buyVip">立即购买</button>
		</template>


		<car-float-button v-if="!isGift" :value="cardProductNum"></car-float-button>

		<protection-modal v-if="protectionModalVisible" @close="protectionModalVisible = false" :value="serviceIdList"></protection-modal>

		<goods-params-modal v-if="goodsParamsModalVisible" @close="goodsParamsModalVisible = false" :value='paramsList'></goods-params-modal>

		<goods-sku-select-modal v-if="skuModalVisible" :goods-sku='goodSku' @close="skuModalVisible = false" @select="onSelect" @confirm="confirm" :isGift="isGift"></goods-sku-select-modal>

	<!-- 	<protection-modal v-if="serviceModal" :goods-service="goodService" @cloce="serviceModal = false"></protection-modal> -->

	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import appView from '@/js/app-plus/appViewPaint.js';
	// #endif
	
	import price from '../_component/price.vue';
	import goodsItem from '@/components/goodsItem.vue'
	import recommend from '../_component/recommend.vue'
	import protectionModal from '../_modal/protectionModal.vue';
	import goodsParamsModal from '../_modal/goodsParamsModal.vue';
	import goodsSkuSelectModal from '@/components/shop/modal/goodsSkuSelectModal';
	import carFloatButton from "../_component/carFloatButton";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		isLog,
		formatDate,
		disposeSku
	} from '../../../js/mzl.js'

	import {
		processSkuData
	} from '@/js/util';

	const BUY_TYPE_SELECT = 0; // 选择 SKU
	const BUY_TYPE_ADD = 1; // 添加购物车
	const BUY_TYPE_BUY = 2; // 立即购买
	const BUY_TYPE_VIP = 3; // 立即购买
	const SHOP_GRADE_MAP = {
		1: '',
		2: '品牌',
		3: '旗舰',
	}
	export default {
		components: {
			price,
			goodsItem,
			protectionModal,
			goodsParamsModal,
			recommend,
			carFloatButton,
			goodsSkuSelectModal
		},
		data() {
			return {
				title: '',
				onlineSite: this.global.onlineSite,
				bannerTabActive: 'image',
				buyType: '', //
				skuModalVisible: false,
				// serviceModal:false,
				protectionModalVisible: false,
				goodsParamsModalVisible: false,
				isCollect: false,
				goods: {},
				trundleImageList: [],
				shop: {},
				goodsId: '',
				commentList: [],
				commentCount: 0,
				simpleCommentList: [],
				goodSku: {}, //规格
				skuData: '', //选择的规格
				imageBannerCurrent: 0,
				recommendList: [], //商家推荐
				shopId: '',
				SignIn: '',
				userId: '',
				cardProductNum: 0,
				//规格对象
				callbackData: '',
				 serviceIdList: [],
				recommendId: '',
				cardUserId: '',
				initial:false,
				// 该商品所属的商家用户 ID
				goodsUserId: '',
				// 是否为 VIP
				isGift: false,
				vipLevel: 1,
				bannerTabBtn:null,
				hasEvent:0
			}
		},
		
		watch: {
			// #ifdef APP-PLUS
				isShowModal(newValue) {
					if(newValue){
						//隐藏按钮
						this.bannerTabBtn.hide();
					}else if(this.goods.coverVideo){
						//如果有视频 则在模态框关闭时候显示
						this.bannerTabBtn.show();
					}
				}
			// #endif
			
		},
	

		onLoad(option) {
				this.userId = uni.getStorageSync('userId');
				// #ifdef APP-PLUS
				this.bannerTabBtn = uni.getSubNVueById('bannerTab');
				this.bannerTabBtn.hide();
				// #endif
				
				this.doLoginHandle(()=>{
					this.init(option);
					
					//this.hideLoading();
				});


		},
		

		
		// 监听页面显示
		onShow: function() {
			this.userId = uni.getStorageSync('userId');
			if (this.userId && this.initial) {
				this.showShoppingCart();
			}
			if (uni.getStorageSync('_tempModifyGoods')) {
				this.getGoodsDetail();
				this.getSku(true);
				//this.getService(true);
				uni.removeStorageSync('_tempModifyGoods')
			}
		},
		
		
		methods: {
		
			
			
			onSelect(data){
				//选中
				const {sIndex,pIndex} = data;
				let parent = this.goodSku.list[pIndex];
				let sku = parent.sku[sIndex];
				parent.sku.forEach(item => item.select = false);
				sku.select = true;
				
			},
			
			
			
			
			init(option){
				
				this.goodsId = option.id || option.goodsId;
				this.shopId = option.shopId;
				this.SignIn = option.SignIn
				this.isGift = JSON.parse(option.isGift || 'false');
				this.vipLevel = option.vipLevel;

				// 如果是 VIP 礼品，禁止分享
				if (this.isGift) {
					// #ifdef MP-WEIXIN
						uni.hideShareMenu();
					// #endif
					
				}

				this.recommendId = option.recommendId || '';
				if (this.shopId === this.currentUser.shopId && !this.isVipUser) {
					this.recommendId = this.userId;
				}
				this.cardUserId = option.cardUserId || '';

				this.getGoodsDetail();
				
				// 评论
				this.$api.getGoodsAppraise(this.goodsId).then(result => {
					console.info(result)
					result.goodsAppraiseList.forEach(item => {
						item.createTime = this.formatDate(item.createTime)
					})
					this.commentList = result.goodsAppraiseList
					this.commentCount = result.appraiseCount
				})
				//this.hideLoading();
				// 点击商品,记录浏览的次数
				this.getLookGoodsNum();
				this.showShoppingCart();
				
			},
			
			
			getGoodsDetail() {
				// 商品详情
				this.$api.getGoodsDetail(this.goodsId).then(result => {
					console.info(result)
					console.info('商品详情')

					result.goodsDetail.details = result.goodsDetail.details.replace(/\<img/gi,
						'<img style=" display:block; width: 100%; max-width:100%;height:auto" ');
					this.hasEvent = result.hasEvent;
					this.goods = result.goodsDetail
					this.serviceIdList = result.serviceIdList
					this.goods.trundleImages = JSON.parse(result.goodsDetail.trundleImages)
					this.shop = result.shopDetail
					this.trundleImageList = result.trundleImageList
					this.goodsUserId = result.shopDetail.userId;
					this.shopId = result.goodsDetail.shopId;
					// 判断是否收藏
					if (result.collectStatus) {
						if (result.collectStatus == 0) {
							this.isCollect = false
						} else {
							this.isCollect = true
						}
					} else {
						this.isCollect = false
					}

					// 如果从其它入口进入，没有带上销售人员的 id
					// 则默认为该店的店主
					if (!this.cardUserId) {
						this.cardUserId = result.vipId
					}

					
					uni.setNavigationBarTitle({
						title: this.shop.shopName
					});
					this.title = this.shop.shopName;
					
					// 获取店家推荐
					if(!this.isGift)
						this.listShopRecommendGoods()
					
					// #ifdef APP-PLUS
					if(this.goods.coverVideo){
						this.bannerTabBtn.show();
					}
					uni.$off('evv').$on('evv',data=>{
						let index = data.index;
						this.bannerTabActive = index==1?'image':'video';
						
						
					})
					
					// #endif
					
					
					this.$nextTick(()=>{
						uni.hideLoading();
					})
				})
			},
			// 点击商品,记录浏览的次数
			getLookGoodsNum() {
				if (!this.currentUser.id) {
				  this.$api.getLookGoodsNum(this.goodsId).then(res => {
					console.info(res);
				  })
				}
			},
		
			async showShoppingCart() {
				if (!this.checkHasLogin()) {
					return false
				}
				this.cardProductNum = await this.$api.getCarSize();
				this.initial=true;
			},
			
			// 首页
			homeTap() {
				this.navigateTo('/module/shop/home/home', {
					shopId: this.shopId,
					SignIn: this.SignIn,
					cardUserId:this.cardUserId,
					recommendId: this.recommendId
				})
			},
			//详情
			openGoodsDetail(goodsId) {
				this.navigateTo('../goodsDetail/goodsDetail', {
					id: goodsId
				})
			},
			showSkuModal() {
				// 获取规格
				this.getSku()
			},
			selectSku() {
				// 重新选择规格
				this.buyType = BUY_TYPE_SELECT;
				//拿规格
				this.showSkuModal();
			},
			addCar() {
				if (!this.checkHasLogin()) {
					return;
				}
				if (this.shop.ifExpire == 1) {
					this.showTips('店铺已过期...')
					return false
				}
				if (this.isOutOfStock) {
					this.showTips('该商品已下架')
					return;
				}
				// 加入购物车
				this.buyType = BUY_TYPE_ADD;
				if (this.callbackData) {
					console.log(this.callbackData)
					this.$api.shoppingCart(this.callbackData.skuId, this.userId, this.callbackData.number, this.recommendId)
						.then(res => {
							console.log(res);
							this.showTips('加入购物车成功')
							this.showShoppingCart()
						})
				} else {
					//拿规格
					this.showSkuModal();
				}

			},
			buy() {
				if (!this.checkHasLogin()) {
					return;
				}
				if (this.shop.ifExpire == 1) {
					this.showTips('店铺已过期...')
					return false
				}
				if (this.isOutOfStock) {
					this.showTips('该商品已下架')
					return;
				}
				// 立即购买
				this.buyType = BUY_TYPE_BUY;
				if (this.callbackData) {
					console.info(this.goods)
					console.info(this.callbackData)
					console.info(this.shop)

					var aa = this.disposeBuy();
					this.setCarGoods(aa)
					uni.navigateTo({
						url: '../order/order?urlType=0'
					});
				} else {
					//拿规格
					this.showSkuModal();
				}
			},
			//处理立即购买数据
			disposeBuy() {
				if (!this.checkHasLogin()) {
					return;
				}
				
				//console.log(this.callbackData)
				let arr1 = this.callbackData.skuName.split('-');
				var arr1_s = ''
				for (var j = 0; j < arr1.length; j++) {
					arr1_s += arr1_s ? '-' + arr1[j] : arr1[j]
				}
				let arr3 = []
				let data = {
					//this.callbackData.skuNum,this.userId,this.callbackData.number,this.goodsId
					discountPrice: this.goodsPrice,
					franking: this.goods.franking,
					skuId:this.callbackData.skuId,
					goodsId: this.goods.id,
					goodsImage: this.goods.trundleImages[0],
					goodsName: this.goods.title,
					goodsNum: this.callbackData.number,
					goodsTitle: this.goods.title,
					isSelected: false,
					originalPrice: this.originalPrice,
					propertySku: arr1,
					propertySku_S: arr1_s,
					shopGrade: this.shop.shopGrade,
					shopId: this.goods.shopId,
					shopLogo: this.shop.logo,
					shopName: this.shop.shopName,
					skuValue: this.callbackData.skuNum,
					totalPrice: this.callbackData.number * this.goodsPrice,
					frankingType: this.shop.frankingType || 1,
					recommendId: this.recommendId,
					cod: !!this.serviceIdList.find(item => item.id === 5) ? 1 : 0
				}
				console.info(data)
				arr3.push(data);
				return arr3;
			},
			confirm(callbackData) {
				console.info(callbackData)

				this.skuData = callbackData.skuName + ' 数量：' + callbackData.number;
				this.callbackData = callbackData
				console.log(callbackData)
				// 立即购买
				if (this.buyType === BUY_TYPE_BUY) {
					this.buy()
				} else if (this.buyType == BUY_TYPE_ADD) {
					// 加入购物车
					this.addCar();
				} else if (this.buyType == BUY_TYPE_VIP) {
					this.buyVipRequest();
				}
			},
			openComment() {
				this.navigateTo('../comment/comment', {
					goodsId: this.goodsId
				});
				// uni.navigateTo({url: '../comment/comment'});
			},
			previewImage(current) {
				uni.previewImage({
					urls: this.goods.trundleImages,
					current,
				});
			},
			// 收藏事件
			CollectTap() {
				if (!this.checkHasLogin()) {
					return;
				}
				this.$api.collect(this.userId, this.goodsId, 3).then(result => {
					console.info(result)
					this.isCollect = !this.isCollect
				}).catch(error => {
					console.log(error)
				})
			},
			// 规格
			getSku(flag) {
				if (Object.keys(this.goodSku).length > 0 && !flag) {
				  this.skuModalVisible = true;
				  return;
				}
				this.$api.getGoodsSku(this.goodsId).then(result => {
					this.goodSku = processSkuData(result);
					if(!flag)
						this.skuModalVisible = true;
				}).catch(err => {
					console.info(err)
				})
			},
			// 服务
// 			getService(flag){
// 				if (Object.keys(this.goodService).length > 0 && !flag) {
// 				  this.serviceModal = true;
// 				  return;
// 				}
// 			},


			// 获取商家推荐列表 shopId,pageNo
			listShopRecommendGoods() {
				this.$api.listShopRecommendGoods(this.shopId, 1).then(result => {
					this.recommendList = result.recommendList
				}).catch(error => {
					console.error(error)
				})
			},

			bannerChange(e) {
				this.imageBannerCurrent = e.detail.current
				console.log(e)
			},

			openChat() {
				if (!this.checkHasLogin()) {
					return;
				}

				if (this.isSelfGoods) {
					this.showTips('不能跟自己聊天');
					return;
				}

				uni.setStorageSync('_goods', this.goods);
				// goods: JSON.stringify(this.goods),
				this.navigateTo('/module/message/chat/chat', {
					selToID: this.cardUserId,
					shopId: this.shopId,
					title: this.shop.shopName,
				})
			},

			editGoods() {
				if(this.hasEvent==1){
					this.showTips("商品正参与拼团不可修改");
					return
				}
				this.navigateTo('/item_businessCard/businessCard_publishNewGoods/businessCard_publishNewGoods', {
					shopId: this.shopId,
					goodsId: this.goodsId,
				})
			},

			shareGoods () {
				let recommendId = '';
				if (this.userType != 1) {
					recommendId = this.userId;
				}

				this.$api.share(this.goodsId, 3);

				const path = '/module/shop/goodsDetail/goodsDetail?shopId=' + this.shopId + '&shareId=' + this.userId + '&id=' + this.goodsId + '&cardUserId=' + this.cardUserId + '&recommendId=' + recommendId
				this.appShare(path, this.goods.title)
			},

			buyVip () {
				// 重新选择规格
				this.buyType = BUY_TYPE_VIP;
				// 拿规格
				this.showSkuModal();
			},

			buyVipRequest () {
				if (!this.currentUser.id) {
					this.reLaunch('/pages/register/register', {
						redirect: encodeURIComponent(`/item_businessCard/businessCard_VIP/businessCard_VIP_New?recommendId=${this.recommendId}&vipLevel=${this.vipLevel}`),
						cardUserId: this.recommendId
					});
					return;
				}
				
				let data = {
					currentShowVipLevel:this.vipLevel,
					skuId:this.callbackData.data.id,
					recommendId:this.recommendId || 1
				}
				
				this.navigateTo('/item_businessCard/businessCard_VIP/businessCard_VIP_Addr',data);

				//this.showLoading();
				// this.$api.insertVipOrderNew(this.vipLevel, this.callbackData.data.id, this.recommendId).then(result => {
				// 	if(result.orderNum){
				// 		return this.$api.unifiedorderByVip(result.orderNum);
				// 	} else {
				// 		this.hideLoading();
				// 		this.showTips('下单失败');
				// 	}
				// }).then(result => {
				// 	return this.requestPayment(result.result)
				// }).then(result => {
				// 	this.showTips('支付成功').then(res => {
				// 		uni.reLaunch({
				// 			url:'/item_businessCard/businessCard_ShopInfo/businessCard_ShopInfo'
				// 		})
				// 		// uni.switchTab({
				// 		// 	url: '/pages/businessCard/businessCard'
				// 		// });
				// 	})
				// }).catch(error => {
				// 	this.hideLoading();
				// });
			},

			//Vuex引入方法
			...mapMutations(['setCardUserId', 'setUPinfo', 'setCarGoods'])
		},
		computed: {
			isShowModal(){
				return this.protectionModalVisible || this.goodsParamsModalVisible || this.skuModalVisible;
			},
			
			shopGrade() {
				return SHOP_GRADE_MAP[this.shop.shopGrade];
			},
			// 参数
			paramsList() {
				let result = [];
				try {
					result = JSON.parse(this.goods.paramJson)
				} catch (error) {}
				if (result instanceof Array === false) return [];
				return result;
			},
			// 规格
			goodsParamsName() {
				return this.paramsList.map(item => item.name).join(' ')
			},
			
			
			goodsService(){
				return this.serviceIdList.map(item => item.serviceKey).join(' ')
			},
			isOutOfStock() {
				return this.goods.status == 1;
			},
			goodsPrice() {
				if (this.callbackData) {
					return this.callbackData.data.preferentialPrice;
				}
				return this.goods.preferentialPrice
			},
			originalPrice() {
				if (this.callbackData) {
					return this.callbackData.data.goodsPrice;
				}
				return this.goods.originalPrice
			},
			originalPriceShow() {
				return this.originalPrice
			},
			isSelfGoods() {
				return this.currentUser.id == this.goodsUserId;
			},

			//Vuex引入属性
			...mapState(['UPinfo', 'carGoods'])
		},
		/**
		 * 页面分享
		 */
		onShareAppMessage(res) {
			let recommendId = '';
			if (this.userType != 1) {
				recommendId = this.userId;
			}

			this.$api.share(this.goodsId, 3);

			return {
				title: this.goods.title,
				path: '/module/shop/goodsDetail/goodsDetail?shopId=' + this.shopId + '&shareId=' + this.userId + '&id=' + this.goodsId +
					'&cardUserId=' + this.cardUserId + '&recommendId=' + recommendId,
				imageUrl: this.goods.trundleImages[0],
				success(p) {}
			}
		},

	}
</script>

<style lang="less" scoped>
	.page {
		background-color: #F5F5F5;
		padding-bottom: 100upx;
	}

	/* 商品轮播图 */
	.goods-banner {
		width: 100%;
		height: 750upx;
		position: relative;

		.banner-image {
			width: 100%;
			height: 100%;
			background-color: #eee;

			.banner-image-count {
				position: absolute;
				top: 30upx;
				right: 30upx;
				background: rgba(0, 0, 0, 0.40);
				border-radius: 28upx;
				font-size: 24upx;
				color: #FFFFFF;
				text-align: center;
				width: 80upx;
				line-height: 42upx;
				z-index: 99;
			}

			swiper {
				width: 100%;
				height: 100%;
			}

			swiper image {
				width: 100%;
				height: 100%;
			}
		}

		.banner-video {
			video {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 9;
			}
		}

		.banner-tab {
			width: 200upx;
			height: 56upx;
			position: absolute;
			bottom: 28upx;
			left: 50%;
			transform: translateX(-50%);
			background: rgba(255, 255, 255, 0.8);
			border-radius: 32upx;
			display: flex;
			z-index: 998;

		}
		.coverView{
				width: 105upx;
				height: 58upx;
				line-height: 58upx;
				color: #666666;
				text-align: center;
				border-radius: 32upx;
				font-size: 24upx;
				vertical-align: middle;
				position: absolute;
				bottom: 28upx;
				left: calc(50% + 47upx);
				transform: translateX(-50%);
				z-index: 999;
				&.active {
					background: #7483FF;
					color: #ffffff;
					font-size:24upx;
				}
				
				&.video{
					left: calc(50% - 47upx);
				}
		}
	}

	/* 商品简要信息 */
	.fn-wrap {
		background-color: #fff;
		padding: 30upx;
		margin-bottom: 24upx;

		.price-wrap {
			margin-bottom: 42upx;

			.goods-price {
				display: inline-block;
				font-size: 40upx;
				color: #FF5858;
				margin-right: 22upx;
			}

			.old_price {
				display: inline-block;
				font-size: 24upx;
				color: #999999;
				text-decoration: line-through;
			}
		}

		.fn_goods_name {
			margin-bottom: 23upx;

			.mod_tag {
				height:36upx;
				line-height:36upx;
				background: #E0B97A;
				border-radius: 18upx;
				padding: 0upx 16upx;
				display: inline-block;
				color: #fff;
				font-size: 20upx;
				margin-right: 16upx;
				vertical-align: middle;
				margin-top: -.2em;
			}

			.goods_name {
				font-size: 32upx;
				color: #333333;
			}
		}
		.detail_serve {
			display: flex;
			width: 100%;
			font-size: 24upx;
			color: #666666;

			.detail_serve-item {
				flex: 1;

				&:nth-child(2) {
					text-align: center;
				}

				&:last-child {
					text-align: right;
				}
			}
		}

	}

	/* 商品 sku */
	.sku_container {
		background-color: #fff;
		margin-bottom: 24upx;

		.sku_choose_info {
			padding: 34upx 32upx;
			border-bottom: 1upx solid #E1E1E1;
			position: relative;

			&:last-child {
				border-bottom: none;
			}

			.sku_choose_label {
				display: inline-block;
				font-size: 28upx;
				color: #999999;
				width: 84upx;
				position: absolute;
			}

			.sku_choose {
				font-size: 28upx;
				color: #333333;
				display: inline-block;
				width: 330upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-left: 90upx;
			}

			&:active {
				background-color: #eee;
			}

			&:after {
				content: "";
				width: 22upx;
				height: 22upx;
				background-size: 100% 100%;
				background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPHBhdGggZD0iTTM2MC43MzEsMjI5LjA3NWwtMjI1LjEtMjI1LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwcy01LjMsMTMuOCwwLDE5LjFsMjE1LjUsMjE1LjVsLTIxNS41LDIxNS41ICAgYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0YzMuNCwwLDYuOS0xLjMsOS41LTRsMjI1LjEtMjI1LjFDMzY1LjkzMSwyNDIuODc1LDM2NS45MzEsMjM0LjI3NSwzNjAuNzMxLDIyOS4wNzV6ICAgIiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
				position: absolute;
				right: 32upx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}

	/* 评论 */
	.comment_container {
		padding: 40upx 0;
		background-color: #fff;
		margin-bottom: 24upx;

		.title {
			font-size: 32upx;
			color: #333333;
			margin-left: 32upx;
			margin-bottom: 30upx;
		}

		.comment_list {
			/*overflow-x: auto;*/
			white-space: nowrap;
		}

		.comment_item {
			padding: 25upx;
			box-sizing: border-box;
			display: inline-block;
			width: 646upx;
			background: #FFFFFF;
			border: 1upx solid #DCDCDC;
			margin-right: 22upx;
			border-radius: 20upx;

			&:first-child {
				margin-left: 32upx;
			}

			.comment_user {
				font-size: 24upx;
				color: #999999;
				display: flex;
				align-items: center;
				margin-bottom: 20upx;

				.avatar {
					width: 62upx;
					height: 62upx;
					margin-right: 23upx;
				}

				.user {
					flex: 1;
				}

				.date {
					float: right;
				}
			}

			.comment_info {
				font-size: 28upx;
				color: #333333;
				line-height: 40upx;
				white-space: initial;
				margin-bottom: 37upx;
				height: 120upx;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}

			.comment_goods_sku {
				font-size: 24upx;
				color: #999999;
			}
		}

		.comment_button {
			background: rgba(0, 0, 0, 0.00);
			border: 1upx solid #7483FF;
			color: #7483FF;
			line-height: 66upx;
			width: 252upx;
			font-size: 28upx;
			text-align: center;
			border-radius: 40upx;
			margin: 30upx auto 0;

			image {
				width: 16upx;
				height: 16upx;
			}
		}
	}

	/* 店主推荐 */
	.owner_recommend {
		background: #FFFFFF;
		padding-top: 40upx;
		padding-bottom: 30upx;
		margin-bottom: 26upx;

		.title {
			font-size: 28upx;
			color: #333333;
			margin-left: 32upx;
			margin-bottom: 20upx;
		}

		.goods_list {
			white-space: nowrap;
			overflow-x: auto;
		}

		.owner_recommend_goods {
			display: inline-block;
			margin-right: 22upx;

			&:first-child {
				margin-left: 32upx;
			}

			.cover {
				width: 300upx;
				height: 300upx;
				margin-bottom: 23upx;
			}

			.goods_name {
				font-size: 28upx;
				color: #666666;
				margin-bottom: 24upx;
			}

			.buy_wrap {
				display: flex;
				align-items: center;

				.price {
					flex: 1;
					font-size: 30upx;
					color: #FF5858;
				}

				.count {
					font-size: 24upx;
					color: #999999;
				}
			}
		}
	}

	.goods_detail {
		background-color: #fff;
		padding-top: 40upx;
		padding-bottom: 20upx;
		margin-bottom: 40upx;

		.title {
			font-size: 32upx;
			color: #333333;
			margin-left: 32upx;
			margin-bottom: 30upx;
		}

		.goods_detail_content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
			;
		}

		.goods_detail_content p {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 30upx;
			font-size: 28upx;
			width: 100vw;
		}

		.goods_detail_content img {
			width: 100vw;
		}
	}



	@buttonGroupRadius: 40upx;

	.footer_bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		height: 100upx;
		display: flex;
		align-items: center;

		.icon_btn {
			display: inline-block;
			width: 110upx;
			text-align: center;

			.icon {
				display: inline-block;
				width: 40upx;
				height: 40upx;
			}

			.text {
				font-size: 20upx;
				color: #666666;
			}
		}

		.btn_group {
			.button {
				text-align: center;
				color: #fff;
				width: 202upx;
				line-height: 82upx;
				display: inline-block;
				font-size: 28upx;
				border-radius: 0;
				border: none;

				&.disabled{
					opacity: 0.5;
				}
				&[disabled] {
					opacity: 0.5;
				}

			}

			.one {
				width: 404upx;
				background-color: #7483FF;
				border-radius: @buttonGroupRadius;
			}

			.add_car {
				background-color: #4CA5FF;
				border-top-left-radius: @buttonGroupRadius;
				border-bottom-left-radius: @buttonGroupRadius;
			}

			.buy {
				background-color: #7483FF;
				border-top-right-radius: @buttonGroupRadius;
				border-bottom-right-radius: @buttonGroupRadius;
			}
		}

	}

	.video-cover-container {
		position: absolute;
		width: 100%;
		height: 100%;

		.video-cover {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 8;
			background-color: #000;
		}

		.play-icon {
			position: absolute;
			width: 100upx;
			height: 100upx;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 9;
		}
	}

	.price-wrap {


		.right {
			float: right;
		}
		.shareBtn {
			border: none;
			background-color: transparent;
			border-radius: 0;
			background: none !important;
			padding: 0;
			&:after { display: none }

			font-size:20upx;
			color:rgba(102,102,102,1);
			line-height:28upx;

			image {
				width: 32upx;
				height: 32upx;
				margin-bottom: 8upx;
			}

			> view {
				line-height: 28upx;
			}

		}
	}

	.footer-button {
		position: fixed;
		left: 50%;
		bottom: 30upx;
		transform: translateX(-50%);
		width: 620upx;
	}

</style>
