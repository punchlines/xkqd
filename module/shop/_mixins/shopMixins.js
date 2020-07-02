	import {isLog,disposeSku} from '../../../js/mzl.js'
	import {processSkuData} from '@/js/util';
	export default {

		data() {
			return {
				isCollect: false,
				shopId: '',
				shopData: {}, //店铺信息
				templateId: 0,
				isShow: false,
				oneGoods: [],
				cardProductNum: 0,
				initial:false
			}
		},
		methods: {
			onSelect(data) {
				//选中
				const {
					sIndex,
					pIndex
				} = data;
				let parent = this.goodSku.list[pIndex];
				let sku = parent.sku[sIndex];
				parent.sku.forEach(item => item.select = false);
				sku.select = true;

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

					// 				let {
					// 					skuJson,
					// 					skuIdJson,
					// 					mpGoodsSkuList,
					// 					mpGoods
					// 				} = result;
					// 				let list = []
					// 
					// 				skuJson = JSON.parse(skuJson.replace(/\'/g, '"'));
					// 				skuIdJson = JSON.parse(skuIdJson.replace(/\'/g, '"'));
					// 
					// 				const skuJsonKeys = Object.keys(skuJson);
					// 				const skuIdJsonKeys = Object.keys(skuIdJson);
					// 
					// 				skuJsonKeys.forEach((key, index) => {
					// 					let idKey = skuIdJsonKeys[index];
					// 					list.push({
					// 						id: idKey,
					// 						name: key,
					// 						sku: this.toSkuArray(skuJson[key], skuIdJson[idKey], mpGoodsSkuList)
					// 					})
					// 				})
					// 
					// 				let map = {};
					// 				mpGoodsSkuList.forEach(item => {
					// 					const key = Object.keys(item)[0];
					// 					map[key] = item[key]
					// 				});

					this.goodSku = {};

					this.$nextTick(() => {
						this.goodSku = processSkuData(result);

						this.$nextTick(() => {
							this.skuModalVisible = true;
						});

					});
					//console.info(this.goodSku)
				}).catch(err => {
					console.info(err)
				})
			},

			async showShoppingCart() {
				if (!this.checkHasLogin()) {
					return false
				}
				this.cardProductNum = await this.$api.getCarSize();
				this.initial=true;
			},

			allmoreInfo(item) {
				this.oneGoods = item;
				console.log(item)
				this.isShow = !this.isShow;
				console.log(this.oneGoods, "this.oneGoods")
			},
			outClick() { //退出
				this.isShow = !this.isShow;
			},


			// 确定加入购物车 this.callbackData.skuNum,this.userId,this.callbackData.number,this.goodsId
			confirm(callbackData) {
				if (!this.checkHasLogin()) {
					return;
				}

				console.info(callbackData)
				this.$api.shoppingCart(callbackData.skuId, this.userId, callbackData.number, this.recommendId).then(
					res => {
						console.log(res);
						if (res.resultMap.length > 0) {
							this.showTips('加入购物车成功').then(value => {})
							this.showShoppingCart();
						} else {
							this.showTips('加入购物车失败').then(value2 => {})
						}
					}).catch(res => {
					console.info(res)
					this.showTips('加入购物车失败').then(value2 => {})
				})
			},

			//取消店家推荐
			setShopRecommend(goodsId) {
				if (this.oneGoods.shopRecommend == 1) { //取消
					this.$api.setShopRecommend(goodsId, 0).then(result => {
						this.reset();
						this.fetch()
						this.isShow = false
						this.showTips('取消成功')
					}).catch(error => {
						console.error(error)
					})
				} else { //设置
					this.$api.setShopRecommend(goodsId, 1).then(result => {
						this.reset();
						this.fetch()
						
						this.isShow = false
						this.showTips('推荐成功')
					}).catch(error => {
						console.error(error)
					})
				}
			},
			//下架商品
			setGoodsStatus(goodsId) {
				this.$api.setGoodsStatus(goodsId, 1, 0).then(result => {
					this.showTips('修改成功');
					this.isShow = false;
					this.reset();
					this.fetch()
					
				}).catch(error => {
					console.error(error)
				})
			},
			cancelRecommend(goodsId) { //取消店主推荐
				this.setShopRecommend(goodsId);
			},
			toRecommend(goodsId) { //设为店主推荐
				this.setShopRecommend(goodsId);
			},
			downGoods(goodsId) { //下架商品
				this.setGoodsStatus(goodsId)
				this.isShow = false
			}

		},

		computed: {

			isSelfShop() {
				return this.currentUser.shopId == this.shopId;
			},


			// 缺省页
			messageToPage1() {
				return {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wushangpin.png',
					title: this.isSelfShop ? '没有推荐商品' : '商家没有推荐商品'
				}

			},
			messageToPage2() {
				return {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wushangpin.png',
					title: this.isSelfShop ? '没有上传商品' : '商家没有上传商品'
				}
			},
		},

		onLoad(options) {

			this.doLoginHandle(() => {
				this.shopId = options.shopId || 3;

				if (options.shopData) {
					//console.info('获取企业信息')
					options.shopData = JSON.parse(decodeURIComponent(options.shopData));
					console.log(options)
					this.templateId = options.shopData.templetId || 0;
					this.isCollect = options.collectStatus == 1;
					this.shopData = options.shopData;
					this.shopData.shopScore = this.shopData.shopScore ? this.shopData.shopScore.toFixed(1) : ''
					console.info(this.shopData.shopScore)
					uni.setNavigationBarTitle({
						title: options.shopData.shopName
					});
				}
				this.init(options);
				this.showShoppingCart();
			
				this.hideLoading();
			});




			// this.shopId=options.shopId||uni.getStorageSync('shopId');

		},

		onShow() {
			//如果是自己的店铺 不抓取购物车数量
			if (!this.isSelfShop && !!this.currentUser.id && this.initial)
				this.showShoppingCart();

			//如果有需要更新商店数据 则重新抓取
			if (uni.getStorageSync('_needUpdateGoods')) {
				this.reset();
				this.fetch();
				this.init()
				uni.setStorageSync('_needUpdateGoods', false)
			}
		}

	}
