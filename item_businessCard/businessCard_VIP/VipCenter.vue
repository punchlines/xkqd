<template>
	<view>
		<view class="HeaderBox">
			<view class="HeaderInfor top" style="background-image:url('https://xk.gzskxx.com/myqcloud/cardImages/my/bbb.png');background-size:100%;background-repeat:no-repeat">
				<view class="PersonalCenter" style="background-image: url('https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.gpft6xQW4wWMd8d97330e9cbbdc6a16a62c07e302451.png');background-size:100%;background-repeat:no-repeat">
					<view class="content-header-photo">
						<image :src="headImage" style="width: 80rpx; height: 80rpx;"></image>
						<view class="icon" v-for="item in listIcon" :key="item.id" :id="item.id" v-if="userType==item.id">
							<image :src="item.img" mode="" style="width: 48rpx; height: 50rpx;"></image>
						</view>
					</view>
					<view class="content-header-left">
						<view class="content-header-left-label">
							<text style="font-size: 20px; font-weight: bold;">{{username}}</text><text>{{this.merchantStatus==1?'(个人)':'',this.businessMerchantStatus==2?'企业':''}}</text>
						</view>
						<view class="content-header-left-label" style="padding-top: 20rpx;">
							开通时间：{{startTime}}
						</view>
						<view class="content-header-left-label" style="padding-top: 20rpx;">
							到期时间：{{endTime}}
						</view>
						<view class="content-header-left-label" style="margin-top:40rpx; ">
							<text @click="renew(1)" style="margin-right: 20rpx;">续费</text>
							<!-- <text @click="renew(2)" style="margin-right: 20rpx;">升级</text> -->
							<text @click="renew(3)">开通记录</text>
						</view>
					</view>
					<view class="content-header-right" v-for="item in listuser" :key="item.id" :id="item.id" v-if="userType==item.id">
						<view class="content-header-right-div">
							<image :src="item.img" mode="" style="width: 154rpx; height: 170rpx;"></image>
						</view>
						<view class="content-header-right-dataimg">
							<image :src="dataimg" mode="" style="width: 184rpx; height: 146rpx;" v-if="status==2"></image>
						</view>
						<view class="content-header-right-text">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 功能列表 -->
		<view class="content-middle">
			<view class="content-middle-box" v-for="item in lists" :key="item.id" @tap="goList" :id="item.id">
				<view class="content-middle-box-img">
					<image :src="item.img" mode="" style="width: 50rpx; height: 50rpx;"></image>
				</view>
				<view class="content-middle-text">
					{{item.labels}}
				</view>
			</view>
		</view>
		<Modal v-model="show" title='用户需要打款到此账号进行激活' :text='showtext' :texts='showtexts' @cancel='cancel' @confirm='confirm'
		 @event='event' />
		<!-- 会员轮播 -->
		<view class="content-swpier">
			<swiper class="swiper" :interval="interval" :duration="duration" :circular="circular" display-multiple-items="1"
			 previous-margin="30" @change="swiperChange" next-margin="15" :current="swiperCurrent">
				<swiper-item v-for="item in swiperList" :key="item.id" :id="item.id">
					<view class="swiper-item-huangjing">
						<image :src="item.img" mode="" style="width: 98%;height: 300rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <uni-popup ref="popup" type="center">
			<view class="">
				123
			</view>
		</uni-popup> -->
		<view class="content-user">
			<view class="content-user-text">
				<QSTabs :current="current_1" :tabs="tabs_1" minWidth="250" @change="change($event, '1')" activeBold="true"
				 animationLineWidth="50" defaultColor="#BEBBBF" height="120" lineColor="#566EE3" />
			</view>
			<view class="content-user-power" v-for="(items,index) in  vipinfo" :key="index" v-if="current_1==index">
				<view class="content-user-power-soider">
					<view class="content-user-power-soiders"></view>
					<view class="content-user-power-text" >专属特权</view>
					<view class="content-user-power-soiders"></view>
				</view>
				<view class="content-user-power-info" :style="items.content.length>8?'height:400rpx;':'height:250rpx;'">
					<view class="content-user-powers" v-for="(list,indexs) in items.content" :key="indexs">
						<view class="content-user-power-img" v-for="(imgs,index) in powerlist" :key="index">
							<image :src="imgs.img" mode="" style="width: 40rpx;height: 40rpx;" v-if="imgs.text==list"></image>
						</view>
						<view class="content-user-power-img-text">
							<text style="font-size: 12px;">{{list}}</text>
						</view>
					</view>
				</view>
				<view class="content-user-power-button" v-for="(itemlist,index) in listPower" :key="index" v-if="current_1==itemlist.vipGrade-1"
				 @click="updata(index,itemlist.price,itemlist.prices)">{{itemlist.prices=='续费'?itemlist.prices:itemlist.price+'元升级'}}</view>
			</view>
		</view>
		<view class="content-guanggao" @click="goguanggao" v-if="advertisements[0].img">
			<image :src="advertisements[0].img" mode="" style="height: 100rpx;width: 100%;"></image>
			<web-view :src="advertisements[0].link" v-if="goshow" style="width: 100%; height: 100%;"></web-view>
		</view>
		<view class="shops">

			<!-- 推荐商品 -->
			<!-- <view class="goods_list">
				<goodsItem v-for="(n,index) in shopGoods" :key='index' :goods="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
				 :cardUserId='cardUserId' :showBtn="true" :isSelfShop="isSelfShop" @addCar="addCar" @allMoreInfo="allmoreInfo"
				 :recommend-id="recommendId"></goodsItem>
				<view v-if="shopGoods.length==0 && !loading" style="align-items: center;width: 100%;">
					<default-page :messageToPage="messageToPage2"></default-page>
				</view>
			</view> -->

			<recommend :shopId="shopId"></recommend>

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
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	// import tabBar from '../../module/shop/_component/tabBar.vue';
	import Modal from '@/components/x-modal/x-modal'
	import goodsItem from '@/components/goodsItem';
	import recommend from '@/components/recommend';
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	
	//import goodsItemHot from '../../module/shop/_component/goodsItemHot';
	export default {
		components: {
			//tabBar,
			Modal,
			recommend,
			goodsItem,
			QSTabs,
			uniPopup
			//goodsItemHot,
		},
		data() {
			return {
				lists: [{
						id: '1',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.3mcIJfpgzMEk0f4b3b3dcdfaebc60077d676fd848089.png',
						labels: '销售总额'
					},
					{
						id: '2',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.iU3GrISwDaaQfc803108d7de47165ec55f201ba3f826.png',
						labels: '积分总额'
					},
					// {   id:'3',
					// 	img: 'https://xk.gzskxx.com/myqcloud/cardImages/my/qianbao.png',
					// 	labels: '优惠卷'
					// }, 
					{
						id: '4',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.o3xF92MwwD2N67320046115ab8f5d9fd30036c798864.png',
						labels: '订单管理'
					},
					{
						id: '5',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.m0bcb8Ax1Kj13271957679443b80a585de8517786441.png',
						labels: '店铺管理'
					},
					{
						id: '6',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.kvHrrK16dRos06ab135f1d8e1f84afff91710c624279.png',
						labels: '收款管理'
					},
					// {
					// 	id: '7',
					// 	img: 'https://xk.gzskxx.com/myqcloud/cardImages/my/qianbao.png',
					// 	labels: '发票管理'
					// },
					{
						id: '8',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.aMVpO0etRfdL2bd4a92f4d22b6a9ee799924d50e2ade.png',
						labels: '地址管理'
					},
					{
						id: '9',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.59MybUja8ghl76853797aea266ed6d8dd2d5aa6a42aa.png',
						labels: '企业认证'
					},
					// {
					// 	id: '10',
					// 	img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.vlhUtLP3unQXb951ab0cb0ac533f30f16b88d2fc0746.png',
					// 	labels: '我的购物车'
					// },
					{
						id: '11',
						img: '',
						labels: ''
					},
					{
						id: '12',
						img: '',
						labels: ''
					},
					{
						id: '13',
						img: '',
						labels: ''
					},


				],
				background: ['color1', 'color2', 'color3'],
				listPower: [],
				showtexts: '',
				powerlist: [{
						text: '商城功能',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.D4npqs4hlid72dfb2aea6c535223f65729b0eca82687.png',
					},
					{
						text: '建收费社群',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.ZzMk0euwms7782e9a35c8633976d6c35f39fae32b680.png'
					},
					{
						text: '发起团购',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.SBxIuhV5DpcN69927232fbea22640ac50e8f515f3c3c.png'
					},
					{
						text: '智能名片',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.49XI3tTMtvgY54f0306d12ec20c94ff5f9b2ca6128c3.png'
					},
					{
						text: '分享赚钱',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.hMPLhmTLNo3G081ba5135305d140bfcf7c662db7a4f6.png'
					},
					{
						text: '建课程社群',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.d8sm3KYDx3TV2ef1f506190c7ce71039298c3f6dcac2.png'
					},
					{
						text: '团队管理',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.6w9LAtV7qCWXf8c6a81227d19a80fc72ad223da8f558.png'
					},
					{
						text: '数据管理',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.u4eTMBiXM9KX13619f9f95afbcd40a9381ab963c70a5.png'
					},
					{
						text: '活动管理',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.QOidGywHLk0A4933dbabbe008e8bcd3d5d0414cbc760.png'
					},
					{
						text: '成为平台供应商',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.ve0PXFHrcbny51d00d6632a5e4339b669497e3b1ac0f.png'
					},
					{
						text: '店铺引流',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.euokoxq7ir6518cdd341e1a9d6dc0ca6dc9837a0328d.png'
					},
					{
						text: '店铺管理',
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs6LSOwzPnrb6Y59x1azqt5w.40zBmx5cZmatde5105f271572b5cb113506bed8a1b27.png'
					}
				],
				swiperList: [{
						id: 1,
						text: "黄金会员",
						img: "https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.qY97AzyLzmfI9544452ba8bc95029dd20b35c945e0eb.png"
					},
					{
						id: 2,
						text: "白金会员",
						img: "https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.Q7THEEYlTeQb0d196edd90a6f239235a76f6d06d60eb.png"
					},
					{
						id: 3,
						text: "钻石会员",
						img: "https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.h79swv5sQwQu331a299198ed5b67c249d2e54c144b16.png"
					}
				],
				indicatorDots: true,
				interval: 2000,
				startTime: '',
				grade: 1, //升级vip等级
				endTime: '',
				duration: 500,
				circular: true,
				shopId: 1,
				dataimg: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.1pJT0WcRhlIMaf558bbcc01f5231378e93b0f43deedc.png',
				swiperCurrent: 0,
				userType: '',
				cardUserId: '',
				showtext: '',
				shopGoods: [], //所有商品
				shopIdOtherPeople: '',
				current_1: 0,
				tabs_1: ['黄金会员', '白金会员', '钻石会员'],
				userId: '',
				onlineSite: this.global.onlineSite,
				showDropDown: false,
				skuModalVisible: false,
				vipinfo: [],
				goshow: false,
				exclusiveVisible: false,
				myIntegralVisible: false, //积分签到成功
				recommendList: [], //商家推荐列表
				recommendShopGoods: [],
				type: '1', //个人或者企业
				types: '1',
				status: '',
				goodSku: {}, //商品规格
				pageNo: 1, //页码
				is_lod_status: false,
				SignIn: '', //是否签到
				goodsId: '', //当前商品id
				recommendId: 0,
				showVIPModal: false,
				headImage: '',
				show: false,
				pointsScore: 0,
				username: '',
				contentinfo: [],
				acctName: '123', //账户名
				actiDeadLine: '123', //截止打款日期
				amount: '123', //打款激活金额
				openingBank: '123', //开户银行
				userAccount: '123', //资金账号
				merchantStatus: '', //个人商户状态
				businessMerchantStatus: '', //企业商户状态
				advertisements: [],
				renewVips: [],
				listIcon: [{
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.LYygc1sZlGrra6dce7fea72b5afe5ff6ba655e920242.png',
						id: 1
					},
					{
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.7I4ataeqGNhy2f88bdd8dbf61154f1bf8dacc188724b.png',
						id: 2
					},
					{
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.zZIsbTjdBoZl406a6aa9b54f4a631b11436b4847405e.png',
						id: 3
					}
				],
				listuser: [{
						id: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.to2Lb4E1vxV608af3840344b5543809ec4316196961d.png',
						text: '黄金会员'
					}, {
						id: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.4VKotSOn93V3ff5444dd7904cfdd150c363b7953184e.png',
						text: '白金会员'
					},
					{
						id: 3,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.KojOKaJYKUnMf3e772c0f4e513fb601b95994621b46a.png',
						text: '钻石会员'
					}
				]
			}
		},

		mixins: [shopMixins, loadMoreMixins],
		onLoad(options) {
			//this.text()
			this.getUserCoreInfo()
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
			getUserCoreInfo() {
				console.log('chenggong')
				this.$api.getUserCoreInfo()
					.then(res => {
						console.log('12312312', res)
						this.username = res.name
						this.headImage = res.headImage
						this.listPower = res.upgradeVips
						this.userType = res.lastVip
						this.vipinfo = res.vipInfos
						this.renewVips = res.renewVips
						this.status = res.status
						this.endTime = res.endTime
						this.startTime = res.startTime
						this.businessMerchantStatus = res.businessMerchantStatus
						this.merchantStatus = res.merchantStatus
						this.advertisements = res.advertisements
						if (this.userType == 1) {
							this.listPower.push({
								"prices": '续费',
								"vipGrade": 1
							})
						} else if (this.userType == 2) {
							this.listPower.push({
								"prices": '续费',
								"vipGrade": 2
							})
						} else if (this.userType == 3) {
							this.listPower.push({
								"prices": '续费',
								"vipGrade": 3
							})
						}
						console.log(this.listPower)
                        
						
						for (let i = 0; i <= this.vipinfo.length; i++) {
							//this.vipinfo[i].content = this.vipinfo[i].content.replace(/<br\/>/g, '')
							this.vipinfo[i].content = this.vipinfo[i].content.split(',')
						}

						// if(this.merchantStatus==0){

						// }
					})
			},
			test(){
				console.log('123')
				uni.scanCode({
					success:(res)=>{
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						
						this.flowNum=res.result;
					}
				});
			},
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
			//获取企业信息
			getShopDetail() {
				this.$api.getShopDetail(this.shopIdOtherPeople).then(result => {
					console.info('获取企业信息')
					console.log(result)
					this.isCollect = result.collectStatus == 1;
					this.shopData = result.shopData;
					this.shopData.shopScore = this.shopData.shopScore ? this.shopData.shopScore.toFixed(1) : ''
					console.info(this.shopData.shopScore)
					// uni.setNavigationBarTitle({
					// 	title: result.shopData.shopName
					// });
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
			updata(index, price, prices) {
				console.log(index, price)
				let title = ''
				if (price == 890) {
					title = 'VIP2'
				} else {
					title = 'VIP3'
				}
				price = '￥' + price
				if (price == '￥890') {
					let _self = this
					_self.type = 2
					if (_self.listPower[0].vipGrade == 2) {
						_self.grade = 2

					} else if (_self.listPower[0].vipGrade == 3) {
						_self.grade = 3
					}
					let _order = ""
					uni.showModal({
						title: '升级VIP',
						content: '升级店铺' + title + '\n' + '价格：' + price,
						confirmText: '升级',
						success: function(res) {
							if (res.confirm) {
								uni.showLoading();
								_self.$api.saveUpgradeOrRenewVipOrder(_self.type, _self.grade)
									.then(res => {
										console.log(res)
										_order = res
										return _self.$api.unifiedorder(_order)
									}).then(result => {
										return _self.requestPayment(result.prePayInfo)
									}).then(result => {
										uni.showToast({
											title: '升级成功',
											duration: 2000
										});
										this.getUserCoreInfo()
									}).catch(error => {
										uni.hideLoading();
										_self.showError(error)
									})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

				} else if (price == '￥3880') {
					let _self = this
					if (_self.listPower[1].vipGrade == 3) {
						_self.type = 2
						_self.grade = 3
						console.log(_self.grade)
						let _order = ""
						uni.showModal({
							title: '升级VIP',
							content: '升级店铺' + title + '\n' + '价格：' + price,
							confirmText: '升级',
							success: function(res) {
								if (res.confirm) {
									uni.showLoading();
									_self.$api.saveUpgradeOrRenewVipOrder(_self.type, _self.grade)
										.then(res => {
											console.log(res)
											_order = res
											return _self.$api.unifiedorder(_order)
										}).then(result => {
											return _self.requestPayment(result.prePayInfo)
										}).then(result => {
											uni.showToast({
												title: '升级成功',
												duration: 2000
											});
											this.getUserCoreInfo()
										}).catch(error => {
											uni.hideLoading();
											_self.showError(error)
										})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}

				} else if (prices == '续费') {
					let type = 1
					this.renew(type)
				}
			},
			change(index, i) {
				this['current_' + i] = index;
				this.swiperCurrent = index
				this.current_1 = this.swiperCurrent
			},
			cancel() {},
			confirm() {},
			event() {},
			swiperChange(event) {
				this.current_1 = event.detail.current
				// 
			},
			goguanggao() {
				this.goshow = true
			},

			renew(type) {

				if (type == 1) {
					let _self = this
					_self.type = 1
					let _order = ""
					let price = ''
					for (let i = 0; i < this.renewVips.length; i++) {
						if (this.userType == this.renewVips[i].vipGrade) {
							price = this.renewVips[i].price
						}
					}
					price = '￥' + price
					let title = ''
					if (this.userType == 1) {
						title = 'VIP1'
					} else if (this.userType == 2) {
						title = 'VIP2'
					} else {
						title = 'VIP3'
					}
					uni.showModal({
						title: '续费',
						content: '续费店铺' + title + '\n' + '价格：' + price,
						success: function(res) {
							if (res.confirm) {
								uni.showLoading();
								_self.$api.saveUpgradeOrRenewVipOrder(_self.type)
									.then(res => {
										console.log(res)
										_order = res
										return _self.$api.unifiedorder(_order)
									}).then(result => {
										return _self.requestPayment(result.prePayInfo)
									}).then(result => {
										uni.showToast({
											title: '升级成功',
											duration: 2000
										});
										this.getUserCoreInfo()
									}).catch(error => {
										uni.hideLoading();
										_self.showError(error)
									})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

				} else {
					uni.navigateTo({
						url: 'businessCard_VIP_Opening_record'
					})
				}
			},
			goList(e) {
				if (e.currentTarget.id == '1') {
					let shopId = uni.getStorageSync('shopId');
					uni.navigateTo({
						url: '../../item_businessCard/businessCard_DataTopic/businessCard_DataTopic?userId=' + this.userId
					});
				} else if (e.currentTarget.id == '2') {
					uni.navigateTo({
						//url: '../../item_my/myself_myInvoice/myself_myInvoice'
						url: '../../item_my/myself_MyIntegral/myself_MyIntegral'
					});
				} else if (e.currentTarget.id == '4') {
					uni.navigateTo({
						url: '../../item_my/myself_shoppingOrder/myself_shoppingOrder'
					})
				} else if (e.currentTarget.id == '5') {
					// 我的店铺
					// let shopId = uni.getStorageSync('shopId');
					// if (!shopId) {
					// 	this.navigateTo('/item_businessCard/businessCard_ShopInfo/step2_1/step2_1')
					// } else { //TODO
					// 	this.showVIPModal = false;
					// 	this.navigateTo('../../item_businessCard/businessCard_MyShop/businessCard_MyShop', {
					// 		shopId: shopId,
					// 		userId: this.userId,
					// 		cardUserId: this.cardUserId,
					// 		recommendId: this.cardUserId
					// 	})
					// }
					uni.navigateTo({
						url: '../../item_my/myself_storeInform/myself_storeInform',
						// url: '../../item_businessCard/businessCard_EditCard/businessCard_EditCard',
					});
				} else if (e.currentTarget.id == '6') {
					uni.showActionSheet({
						itemList: ["个人账户", "企业账户"],
						success: (res) => {
							if (res.tapIndex + 1 == 1) {
								this.type = 1
								this.$api.setUserReceivablesAccount(this.type)
									.then(res => {
										console.log(res)
										uni.showToast({
											title: '设置成功',
											duration: 2000
										});

									})
									.catch(err => {
										if (err.code == '3333') {
											uni.showModal({
												title: '提示',
												content: '尚未完善子商户信息，请先完善信息',
												success: function(res) {
													if (res.confirm) {
														uni.navigateTo({
															url: "/item_businessCard/businessCard_BindBankcard/businessCard_BindBankcard?from=1"
														})
													}
												}
											});
										} else if (err.code == '0000') {
											uni.showToast({
												title: '设置成功',
												duration: 2000
											});
										}
									})
							} else {
								this.type = 2
								this.$api.setUserReceivablesAccount(this.type)
									.then(res => {
										uni.showToast({
											title: '设置成功',
											duration: 2000
										});
									})
									.catch(err => {
										if (err.code == '3333') {
											uni.showModal({
												title: '提示',
												content: '尚未完善企业商户信息，请先完善信息',
												success: function(res) {
													if (res.confirm) {
														uni.navigateTo({
															url: "/item_businessCard/businessCard_BusinessAttestation/businessCard_BusinessAttestation"
														})
													} else if (res.cancel) {
														console.log('用户点击取消');
													}
												}
											});

										} else if (err.code = '2222') {
											this.acctName = err.result.acctName
											this.actiDeadLine = err.result.actiDeadLine
											this.amount = err.result.amount
											this.openingBank = err.result.openingBank
											this.userAccount = err.result.userAccount
											this.show = true
											this.showtext = '账户名:' + '<br/>' + '资金账号:' + '<br/>' + '开户银行:' + '<br/>' + '打款激活金额:' + '<br/>' +
												'打款激活截止日期:'
											this.showtexts = this.acctName + '<br/>' + this.userAccount + '<br/>' + this.openingBank + '<br/>' + '￥' +
												this.amount + '<br/>' + this.actiDeadLine
											// uni.showModal({
											// 	title: '用户需要打款到此账号进行激活',
											// 	content: '账户名:'+this.acctName+'\n'+'资金账号:'+this.userAccount+'\n'+'开户银行:'+this.openingBank+'\n'+'打款激活金额:'+'￥'+this.amount+'\n'+'打款激活截止日期:'+this.actiDeadLine,
											// 	success: function(res) {}
											// })
										}
									})
							}
						}
					})
				} else if (e.currentTarget.id == '8') {
					uni.navigateTo({
						url: '../../module/shop/address/address?adressFrom=0'
					});
				} else if (e.currentTarget.id == '9') {
					uni.showActionSheet({
						itemList: ["个人商户", "企业商户"],
						success: (res) => {
							console.log(res.tapIndex + 1)
							if (res.tapIndex + 1 == 1) {
								if (this.merchantStatus == '1') {
									uni.showToast({
										title: '已认证成功',
										duration: 2000
									});
								} else {
									uni.navigateTo({
										url: "/item_businessCard/businessCard_BindBankcard/businessCard_BindBankcard"
									})
								}
							} else {
								if (this.businessMerchantStatus == '2') {
									uni.showToast({
										title: '已认证成功',
										duration: 2000
									});
								} else if (this.businessMerchantStatus == '1') {
									this.type = 2
									this.$api.setUserReceivablesAccount(this.type)
										.then(res => {})
										.catch(err => {
											if (err.code = '2222') {
												this.acctName = err.result.acctName
												this.actiDeadLine = err.result.actiDeadLine
												this.amount = err.result.amount
												this.openingBank = err.result.openingBank
												this.userAccount = err.result.userAccount
												this.show = true
												this.showtext = '账户名:' + '<br/>' + '资金账号:' + '<br/>' + '开户银行:' + '<br/>' + '打款激活金额:' + '<br/>' +
													'打款激活截止日期:'
												this.showtexts = this.acctName + '<br/>' + this.userAccount + '<br/>' + this.openingBank + '<br/>' +
													'￥' + this.amount + '<br/>' + this.actiDeadLine
											}
										})
								}else if(this.status==2){
									uni.showModal({
									    title: '续费提醒',
									    content: '请先续费或升级店铺',
									    success: function (res) {
									       
									    }
									});
								}
								 else {
									uni.navigateTo({
										url: "/item_businessCard/businessCard_BusinessAttestation/businessCard_BusinessAttestation"
									})
								}
							}

						}
					})
				}
			}
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
	.HeaderBox {
		height: 420upx;

		.HeaderInfor {
			width: 100%;
			height: 300upx;
			position: relative;

			.PersonalCenter {
				display: flex;
				justify-content: space-around;
				position: absolute;
				width: 94%;
				height: 325upx;
				left: 50%;
				top: 20%;
				transform: translateX(-50%);
				/* 移动元素本身50% */
				border-radius: 20upx;
			}
		}
	}

	.content-header-photo {
		margin-left: 10rpx;
		margin-top: 40rpx;
		width: 80rpx;
		height: 80rpx;
		border: #ffffff solid 1px;

	}

	.content-header-left {
		margin-top: 40rpx;
		margin-left: -20px;
		display: flex;
		flex-direction: column;
	}

	.content-header-left-label {
		//line-height: 20rpx;
		font-size: 24rpx;
		color: #3B456A;
	}

	.content-user-power-soider {
		width: 380rpx;
		display: flex;
		margin-left: 195rpx;
	}

	.content-user-power-soiders {
		margin-top: 24rpx;
		width: 100rpx;
		height: 1rpx;
		background-color: #000000;
	}

	.content-header-right-div {
		margin-top: 40rpx;
		height: 170rpx;
		width: 154rpx;
	}

	.content-header-right-dataimg {
		height: 170rpx;
		width: 154rpx;
		position: absolute;
		top: 25%;
	}

	.content-header-right-text {
		font-size: 38rpx;
		color: #3B476D;
		font-weight: bold;
		margin-top: 30rpx;
		text-align: center;
	}

	.content-middle {
		margin-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		padding-bottom: 30rpx;
		margin-left: 25rpx;
		margin-right: 25rpx;

	}

	.content-middle-box {
		width: 120rpx;
		margin-top: 20rpx;
		margin-right: 15rpx;
	}

	.content-middle-box-img {
		margin: 0 auto;
		text-align: center;

		image {
			width: 70rpx;
			height: 70rpx;
		}
	}

	.content-middle-text {
		text-align: center;
		font-size: 24rpx;
		color: #666666;
		font-family: SourceHanSansCN;
		font-weight: 500;
		margin-top: 15rpx;
	}

	.content-user-power-text {
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.content-swpier {
		background-color: #F5F5F5;
		margin: 40rpx;

	}

	.content-user-power-img-text {
		margin: 0 auto;
		width: 120rpx;
	}

	.swiper {
		width: 100%;
		height: 300rpx;
	}

	.swiper-item-huangjing {
		width: 98%;
		height: 300rpx;

		border-radius: 20upx;
	}

	.content-user-powers {
		width: 25%;
		text-align: center;

	}


	.content-user-text {
		background-color: #F5F5F5;
	}

	.content-header-right {
		position: relative;
		margin-right: 10rpx;
	}

	.content-user-power-soider {
		float: left;
	}

	.content-user-power {
		display: flex;
		// margin-left: 25rpx;
		// margin-right: 25rpx;
		//       border-radius: 20rpx;
		flex-direction: column;
		padding-top: 20rpx;
		padding-bottom: 20rpx;

		background-color: #F5F5F5;
		// text-align: center;

		.content-user-power-button {
			height: 80rpx;
			margin: 0 auto;
			color: #FFFFFF;
			font-size: 18px;
			line-height: 80rpx;
			font-weight: bold;
			text-align: center;
			background-color: #385776;
			width: 500rpx;
			border-radius: 40upx;
			margin-top: 50rpx;
		}
	}

	.content-user-power-info {
		display: flex;
		flex-wrap: wrap;
		margin-top: 60rpx;
		height: 400rpx;
	}

	.content-guanggao {
		padding: 25rpx;

		height: 100rpx;
		background-color: #F5F5F5;
	}

	.goods_list {
		padding-left: 38rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.page {
		background: #F5F5F5;
		padding-bottom: 128upx;
		min-height: 100vh;
	}

	.shops {

		background: #F5F5F5;
		padding-top: 40rpx;
		width: 100%;
	}

	.text {
		font-size: 24rpx;
		text-align: center;
		margin: 0 auto;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.content-swpier {
		margin: 0rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
	}

	.icon {
		position: absolute;
		top: 10%;
		left: 13%
	}
</style>
