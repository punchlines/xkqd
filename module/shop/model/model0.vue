
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

			<view  v-if="!isSelfShop" v-bind:class="[isCollect ? '' : 'collected', 'btn_shop_collect']" @click="CollectTap">{{isCollect?'已收藏':'收藏店铺'}}
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

		<!-- 图标 -->
		<view class="icon_img" v-if="isSelfShop&& userType <5">
				<view class="icon_mel" @click="changeTemplate">
					<wx-view>
						<view class="fir">
							<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/icon1.png" alt="" mode="aspectFit">
						</view>
					</wx-view>
					<view>店铺模板</view>
				</view>
			<view class="icon_sec"  @click="pusblishGoods">
				<wx-view>
					<view class="fir">
						<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/icon2.png" alt="" mode="aspectFit">
					</view>
				</wx-view>
				<view>发布新商品</view>
			</view>
			<view class="icon_thi" @click="underGoods">
				<wx-view>
					<view class="fir">
						<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/icon3.png" alt="" mode="aspectFit">
					</view>
				</wx-view>
				<view>下架商品</view>
			</view>
			<view class="icon_fou" @click="openVip">
				<wx-view>
					<view class="fir">
						<img src="http://card-1254165941.cosgz.myqcloud.com/shopTemplate/icon4.png" alt="" mode="aspectFit" >
					</view>
				</wx-view>
				<view>尊享VIP</view>
			</view>
		</view>



		<!-- #2 店主推荐 -->
		<view class="title" style="margin-top: 20upx;">
			<image class="icon_hot" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/remen.png'"></image>
			<view>店主推荐</view>
		</view>
		<view class="goods_hot_list" :style="{'display':listStyle}">
			<goodsCopy v-for="(n,index) in recommendShopGoods" :key='index' :value="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
			 :cardUserId='cardUserId' :isSelfShop="isSelfShop" @allMoreInfo="allmoreInfo"  @addCar="addCar" :recommend-id="recommendId"></goodsCopy>
			<view v-if="recommendShopGoods.length==0">
				<default-page :messageToPage="messageToPage1"></default-page>
			</view>
		</view>

		<!-- #3 全部商品 -->
		<view class="title" style="margin-top: 50upx;z-index: 10;">全部商品</view>
		<view class="goods_list">
			<goodsItem v-for="(n,index) in shopGoods" :key='index' :goods="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
			 :cardUserId='cardUserId' :showBtn="true" :isSelfShop="isSelfShop" @addCar="addCar" @allMoreInfo="allmoreInfo" :recommend-id="recommendId"></goodsItem>
			<view v-if="shopGoods.length==0 && !loading" style="align-items: center;width: 100%;">
				<default-page :messageToPage="messageToPage2"></default-page>
			</view>
			
		</view>
		
	
		<uni-load-more v-if="!(shopGoods.length==0 && !loading)" :loading-type="loadingType" ></uni-load-more>
		

		<!-- float button -->
		<car-float-button  v-if="!isSelfShop" :value="cardProductNum"></car-float-button>

		<!-- bottom bar -->
		<tab-bar  v-if="!isSelfShop" active="首页" :shop-id="shopIdOtherPeople" :recommend-id="recommendId" :card-user-id="cardUserId"></tab-bar>

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
						<image :src="oneGoods.covermage" class="bb" mode="aspectFill"></image>
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
	import goodsItem from '@/components/goodsItem';
	import goodsCopy from '../_component/goodsCopy';
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
				shopId:1,
				recommendId: 0,
				userType:'',
				pointsScore: 0,
				option:'',
				cardUserId: '',
			};
		},
		components: {
			GoodsSkuSelectModal,
			exclusiveShopModal,
			tabBar,
			goodsItem,
			goodsCopy,
			carFloatButton,
			integral
		},

		mixins: [shopMixins, loadMoreMixins],
		// 监听页面显示
			onShow() {
			// let options = uni.getStorageSync('option');
			// this.getShopDetail()
			// this.currentPage=1
			// this.init(options)
			
			
		},
		onLoad(options) {
			// console.log(options)
			// this.option=options
			// uni.setStorageSync('option', this.option);
		},
		methods: {
			
			init(options){
				this.userId = uni.getStorageSync('userId')
				//console.log(this.userId,this.$store.state.currentUser)
				console.log(options)
				this.userType=options.userType
				this.shopIdOtherPeople = options.shopIdOtherPeople || options.shopId;
				if (!this.checkHasLogin(`/module/shop/home/home?shopId=${this.shopIdOtherPeople}`,true)) {
					//console.log('123')
						console.log("aaaabbbbb")
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
				//this.showShoppingCart();

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
					console.log(this.shopGoods,"shopGoods")
				
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

			shareToTimeline() {

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
					this.recommendList = result.recommendList.map(item=>{return Object.assign(item,{shopRecommend:1})});
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
			...mapState(['UPinfo', 'carGoods']),
			//计算样式
			listStyle(){
				return this.recommendShopGoods.length==0?'block':'flex';
			}
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
				width: 86upx;
				height: 86upx;
			}
			view{
				font-size: 24upx;
				text-align: center;
			}
		}
		.icon_sec{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 86upx;
				height: 86upx;
			}
			view{
				font-size: 24upx;
				text-align: center;
			}
		}
		.icon_thi{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 86upx;
				height: 86upx;
			}
			view{
				font-size: 24upx;
				text-align: center;
			}
		}
		.icon_fou{
			flex: 1;
			.fir{
				vertical-align: middle;
			}
			img{
				width: 86upx;
				height: 86upx;
			}
			view{
				font-size: 24upx;
				text-align: center;
			}
		}
	}
	.shop-info {
		background: #FFFFFF;
		padding: 40upx 30upx;
		display: flex;
		// margin-bottom: 53upx;

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
		
		flex-wrap: wrap;
		
	}

	.goods_list {
		padding: 0 30upx;
		display: flex;
		flex-wrap: wrap;
		//overflow-x: scroll;
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

