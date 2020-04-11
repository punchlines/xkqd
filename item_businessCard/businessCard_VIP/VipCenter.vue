<template>
	<view>
		<view class="content">
			<view class="content-header">
				<view class="content-header-left">
					<view class="content-header-left-label">
						王大哥（企业第一年）
					</view>
					<view class="content-header-left-label">
						开通时间：2020-3-21
					</view>
					<view class="content-header-left-label">
						你还不是用户-去开通
					</view>
					<view class="content-header-left-label">
						续费 升级 开通记录
					</view>
				</view>
				<view class="content-header-right">
					<view class="content-header-right-div">
						<image></image>
					</view>
					<view class="content-header-right-text">
						白金会员
					</view>
				</view>
			</view>
			<view class="content-middle">
				<view class="content-middle-box" v-for="(item,index) in lists" :key="index">
					<view class="content-middle-box-img">
					</view>
					<view class="content-middle-text">
						{{item.labels}}
					</view>
				</view>
			</view>
		</view>
		<view class="content-swpier">
			<swiper class="swiper" :interval="interval" :duration="duration" :circular="circular" display-multiple-items="2">
				<swiper-item>
					<view class="swiper-item-huangjing">黄金会员</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item-baijing">白金会员</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item-zhuangshi">钻石会员</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="content-user">
			<view class="content-user-text">
				1980 元续费/升级
			</view>
		</view>
		<view class="content-guanggao">
			广告
		</view>
		<view class="shops">
			<view class="text">为你推荐</view>
			<view class="goods_list">
				<goodsItem v-for="(n,index) in shopGoods" :key='index' :goods="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
				 :cardUserId='cardUserId' :showBtn="true" :isSelfShop="isSelfShop" @addCar="addCar" @allMoreInfo="allmoreInfo"
				 :recommend-id="recommendId"></goodsItem>
				<view v-if="shopGoods.length==0 && !loading" style="align-items: center;width: 100%;">
					<default-page :messageToPage="messageToPage2"></default-page>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import shopMixins from '../../module/shop/_mixins/shopMixins.js';
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2';
	// import tabBar from '../../module/shop/_component/tabBar.vue';
	import goodsItem from '@/components/goodsItem';
	//import goodsItemHot from '../../module/shop/_component/goodsItemHot';
	export default {
		data() {
			return {
				lists: [{
						img: '',
						labels: '销售总额'
					},
					{
						img: '',
						labels: '积分总额'
					},
					{
						img: '',
						labels: '优惠卷'
					}, {
						img: '',
						labels: '订单管理'
					},
					{
						img: '',
						labels: '店铺管理'
					},
					{
						img: '',
						labels: '收款管理'
					},
					{
						img: '',
						labels: '发票管理'
					},
					{
						img: '',
						labels: '地址管理'
					},
					{
						img: '',
						labels: '企业认证'
					},
					{
						img: '',
						labels: '我的拼团'
					},
					{
						img: '',
						labels: '我的社群'
					},
					{
						img: '',
						labels: '我的直播'
					},
					{
						img: '',
						labels: '我的购物车'
					},
					{
						img: '',
						labels: ''
					},
					{
						img: '',
						labels: ''
					},
				],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				interval: 2000,
				duration: 500,
				circular: true,
				shopId: 1,
				cardUserId: '',
				shopGoods: [], //所有商品
				shopIdOtherPeople: '',
				userId: '',
				onlineSite: this.global.onlineSite,
				showDropDown: false,
				skuModalVisible: false,
				exclusiveVisible: false,
				myIntegralVisible: false, //积分签到成功
				recommendList: [], //商家推荐列表
				recommendShopGoods: [],
				goodSku: {}, //商品规格
				pageNo: 1, //页码
				is_lod_status: false,
				SignIn: '', //是否签到
				goodsId: '', //当前商品id
				recommendId: 0,
				pointsScore: 0,

			}

		},
		components: {
			//tabBar,
			goodsItem,
			//goodsItemHot,
		},
		mixins: [shopMixins, loadMoreMixins],
		onLoad(options) {
			//获取token 调用登录

			let userId = uni.getStorageSync('userId');
			let token = uni.getStorageSync('token');
			let openid = uni.getStorageSync('openid');

			if (!userId) { // 没读取到缓存 设置回调
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						uni.showLoading();

						this.$api.GetUserId(loginRes.code).then(res => {
							uni.setStorageSync('token', res.token);
							uni.setStorageSync('tokenTime', new Date().getTime());
							uni.setStorageSync('openid', res.openId);
							//登录成功
							if (res.userId) {
								uni.setStorageSync('userId', res.userId);

								this.$store.dispatch('updateCurrentUserInfo').then(res => {
									this.init(options);
								});

							} else this.init(options);


							uni.hideLoading();

						}).catch(error => {
							this.init(options);
							uni.hideLoading();
						});

					}
				});

			} else { //获取到缓存数据
				this.$store.dispatch('updateCurrentUserInfo').then(res => {
					this.init(options);
				});
				uni.hideLoading();

			}


		},
		// 监听页面显示
		onShow: function() {},
		methods: {
			init(options) {
				this.userId = uni.getStorageSync('userId')
				//console.log(this.userId,this.$store.state.currentUser)
				this.shopIdOtherPeople = options.shopIdOtherPeople || options.shopId;
				if (!this.checkHasLogin(`/module/shop/home/home?shopId=${this.shopIdOtherPeople}`, true)) {
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
			fetch() {
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
					console.log(this.shopGoods, "shopGoods")

				}).catch(error => {
					console.error(error)
				})
			},
			// 获取商家推荐列表 shopIdOtherPeople,pageNo
			listShopRecommendGoods() {
				this.$api.listShopRecommendGoods(this.shopIdOtherPeople, 1).then(result => {
					// console.log(result.recommendList)
					this.recommendList = result.recommendList.map(item => {
						return Object.assign(item, {
							shopRecommend: 1
						})
					});
				}).catch(error => {
					console.error(error)
				})
			},
		},
		computed: {
			//Vuex引入属性
			...mapState(['UPinfo', 'carGoods']),
			//计算样式
			listStyle() {
				return this.recommendShopGoods.length == 0 ? 'block' : 'flex';
			}
		},

	}
</script>

<style lang="less">
	.content {
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.content-header {
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.content-header-left {
		display: flex;
		flex-direction: column;
	}

	.content-header-left-label {
		margin-top: 40rpx;
		font-size: 24rpx;
		color: #333333;
		font-weight: bold;
	}

	.content-header-right-div {
		margin-top: 40rpx;
		height: 260rpx;
		width: 200rpx;
		border: #000000 solid 1px;
	}

	.content-header-right-text {
		font-size: 24rpx;
		color: #333333;
		font-weight: bold;
		margin-top: 10rpx;
		text-align: center;
	}

	.content-middle {
		margin-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
	}

	.content-middle-box {
		width: 120rpx;
		margin-top: 20rpx;
		margin-right: 15rpx;
	}

	.content-middle-box-img {
		margin: 0 auto;
		width: 70rpx;
		height: 70rpx;
		background-color: #007AFF;
	}

	.content-middle-text {
		text-align: center;
		font-size: 24rpx;
		color: #333333;
		font-weight: bold;
		margin-top: 15rpx;
	}

	.content-swpier {
		margin: 40rpx;
	}

	.swiper {
		width: 100%;
		height: 200rpx;
	}

	.swiper-item-huangjing {
		width: 400rpx;
		height: 200rpx;
		background-color: #000000;
		margin-left: 5rpx;
	}

	.swiper-item-baijing {
		width: 400rpx;
		height: 200rpx;
		background-color: #007AFF;
		margin-left: 5rpx;
	}

	.swiper-item-zhuangshi {
		width: 400rpx;
		height: 200rpx;
		background-color: #1AAD19;
	}

	.content-user {
		text-align: center;
	}

	.content-user-text {
		margin: 0 auto;
		text-align: center;
		width: 400rpx;
		height: 50rpx;
		border: #000000 solid 1px;
	}

	.content-guanggao {
		margin-top: 40rpx;
		text-align: center;
		border: #000000 solid 1px;
		height: 100rpx;
	}

	.goods_list {
		padding: 0 30upx;
		display: flex;
		flex-wrap: wrap;
	}

	.page {
		background: #F5F5F5;
		padding-bottom: 128upx;
		min-height: 100vh;
	}
	.shops{
		margin-top: 40rpx;
		width: 100%;
		background: #F5F5F5;
	}
	.text{
		font-size: 24rpx;
		text-align: center;
		margin: 0 auto;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		}
		.content-swpier{
			margin: 0rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}
</style>
