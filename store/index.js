import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/js/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	  //搜索条件
	searchArea:[],
	searchMinPrice:0,
	searchMaxPrice:0,
	
	// 课程
	
	Course:{
		"name": "",
		"describe": "",
		"coverUrl": "",
		"nodes": [
			
		]
	},
		
	formIdList:[],
    currentUser: null,
    systemInfo: {
      screenWidth: 375,
      statusBarHeight: 0,
      pixelRatio: 2,
    },
	templateId:null,
	tempFilePaths:[],//名片模板库
	avatarImg:'', //头像链接
    //名片所属人id
    cardUserId: uni.getStorageSync('userId')||1,
    //用户等级 1=普通用户 2=vip1  3=vip2 4=vip3  5=销售总监  6=销售经理
    userType:'',
    //微信授权的用户信息
    UPinfo:{},
    // 视频信息
    VideoInfo:'',
    //分享人的id
    shareId:"",
    //购物车商品
    carGoods:[],
    //行业分类
    itemShopClassify:"",
    //发布商品-产品参数
    goodsParaneter: [],
    //发布商品-商品服务
    goodsServicesArr:[],
    //发布新商品信息
    newGoodsDetalis:'',
		requestIndex:-1,
		requestUid:'',
    skuInfo: {
      skuJson: [],
      goodsPrice: [],
      preferentialPrice: [],
      goodsRepertory: [],
    },
    logisticsCompany:'',//物流公司
    staffNum:0,//员工数量
    goodsRepertory:0,//商品库存
    // 下单使用优惠券
    couponTitle:null,
    couponMoney:null,
    couponId:null,
    //名片背景
    cardbgId:0,//背景图片id
    cardBgImage:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/bgwhite.png',//背景图片url
    // 发现定位信息
    adressDetail:null,
    // 积分数量
    accumulateNum:0,

    journalPublish: {
      content: '',
      images: [],
	  video:[],
      location: {
        address: '',
        addressName: '',
        lat: '',
        lng: '',
      },
      cate: [],
      goodsList: [],
    },

    cardCirclePublish: {
      circleName: '',
      joinType: { id: 1, text: '允许任何人加入团' },
      joinMoney: '',

      // 修改
      headImage: '',
      circleTypeId: '',
      circleTypeName: '',
      _circleType: {},
      introduce: '',
      isPermitSee: '',
      managerUserId: '',
    },
    needCircleHomeUpdate: false,
    currentOrderItem: null,

    refundLogisticsInfo: {
      flowNum: '',
      logisticsCompany: '',
    },
    inviteJoin: {
      id: '',
    },
    needUpdateDiscovery: false,
    sensitiveWord: [],
		
		shopRegInfo:{
			userType:0,
			regMer:0,
			inviterId:0
		},
		//拼团选择的商品信息
		pinGoodInfo:null
  }
  ,
  mutations: {
	  
	  setCourse(state,Course){
	  	state.Course=Course;
	  },
	 setSearchArea(state,searchArea){
	 	state.searchArea=searchArea;
	 },
	 setSearchMinPrice(state,searchMinPrice){
	 	state.searchMinPrice=searchMinPrice;
	 },
	 setSearchMaxPrice(state,searchMaxPrice){
	 	state.searchMaxPrice=searchMaxPrice;
	 },
	  
	setPinGoodInfo(state,pinGoodInfo){
		state.pinGoodInfo=pinGoodInfo;
	},
		
			 // 设置入驻注册信息
    setShopRegInfo(state,shopRegInfo){
      state.shopRegInfo=shopRegInfo;
    },
		setAvatar(state,image){
			state.avatarImg = image;
		},
		pushCardPath(state,path){
			state.tempFilePaths.push(path);
		},

    // 积分数量
    accumulate(state,accumu){
      state.accumulateNum=accumu;
    },
    // 发现定位信息
    adress(state,adress){
      state.adressDetail=adress;
    },
    // 名片背景id
    getCardbgId(state,card){
      state.cardbgId=card
    },
    // 名片背景url
    getCardbgUrl(state,card){
      state.cardBgImage=card
    },
    // 下单使用优惠券
    orderCouponTitle(state,coupon){
      state.couponTitle=coupon;
    },
    orderCouponMoney(state,coupon){
      state.couponMoney=coupon;
    },
    orderCouponId(state,coupon){
      state.couponId=coupon;
    },
    // 商品库存
    productNum(state,goodsRepertory){
      state.goodsRepertory=goodsRepertory;
    },
    // 员工审批数量
    totalStaffNum(state,staffNum){
      state.staffNum=staffNum;
    },
    // 选择物流公司
    selectLogCompanyName(state,Company){
      state.logisticsCompany=Company;
    },
    updateCurrentUser (state, user) {
      state.currentUser = user;
    },
    //名片所属人id
    setCardUserId(state, data) {
      state.cardUserId = data;
    },
    //修改用户登录信息
    setUPinfo(state, data){
      state.UPinfo=data
    },
    //修改分享id
    setShareId(state, data){
      state.shareId = data;
    },
    //修改购物车商品数据
    setCarGoods(state,data){
      state.carGoods = data;
    },
    //修改行业分类
    setItemShopClassify(state,data){
      state.itemShopClassify = data;
    },
    //修改视频信息
    setVideoInfo(state,data){
      state.VideoInfo = data;
    },
    //修改发布商品-产品参数
    setGoodsParaneter(state,data){
      state.goodsParaneter = data;
    },
    //修改发布商品-商品服务
    setGoodsServicesArr(state,data){
      state.goodsServicesArr = data;
    },
    //修改发布新商品信息
    setNewGoodsDetalis(state,data){
      state.newGoodsDetalis=data
    },
    setNewGoodsSku (state,data){
      state.skuInfo=data
    },
    //修改用户等级
    setUserType(state,data){
      state.userType=data
    },

    updateJournalPublish (state, journal) {
      state.journalPublish = journal;
    },
    updateCardCirclePublish (state, cardCirclePublish) {
      state.cardCirclePublish = cardCirclePublish;
    },

    setNeedCircleHomeUpdate (state, isNeed) {
      state.needCircleHomeUpdate = isNeed;
    },
    setCurrentOrderItem (state, orderItem) {
      state.currentOrderItem = orderItem;
    },
    setRefundLogisticsInfo (state, refundLogisticsInfo) {
      state.refundLogisticsInfo = refundLogisticsInfo;
    },
    setInviteJoin (state, inviteJoin) {
      state.inviteJoin = inviteJoin;
    },
    setNeedUpdateDiscovery (state, needUpdateDiscovery) {
      state.needUpdateDiscovery = needUpdateDiscovery;
    },
    setSystemInfo (state, systemInfo) {
      state.systemInfo = systemInfo;
    },
		addFormId(state,formId){
			state.formIdList.push(formId);
		},
		clearFormId(state){
			console.log('clear...');
				state.formIdList = [];
		}
  },

  actions: {
		//addFormId
		
		addFormIdx({commit},formId){
			commit('addFormId',formId);
		},
		clearFormIdx({commit}){
			commit('clearFormId');
		},
		
		pushCardPath({commit},path){
				commit('pushCardPath',path);
		},

		//处理me接口的信息存储 包括资料填写状态 用户类型 邀请人ID
		setShopRegInfo({commit}){
			return new Promise((resolve,reject)=>{
				resolve("");
					// api.getShopInfoIsReg().then(res=>{
					// 	//1- 没填静默填写 0- 填了
						
					// 	commit('setShopRegInfo',res);
					// 	resolve(res);
							
					// }).catch(error=>{
					// 		reject(error)
					// });
				
			});			
		
		},


    updateCurrentUserInfo ({ commit }) {
      const userId = uni.getStorageSync('userId');
      if (userId) {
				return new Promise((resolve,reject)=>{
					 api.getUserInfor(userId).then(result => {
							const user = result.userMap;
							if(user.shopId!=0) uni.setStorageSync('shopId',user.shopId)
							commit('updateCurrentUser', user);
							resolve();
							//TODO
							
						}).catch(error => {
							// TODO: 请求失败处理
							reject(error);
						})
					
				});

      }
    },
    clearPublishInfo ({ commit }) {
			uni.setStorageSync('GoodsDetails','');
      commit('setItemShopClassify', '')
      commit('setVideoInfo', '')
      commit('setGoodsParaneter', [])
      commit('setGoodsServicesArr', [])
      commit('setNewGoodsDetalis', '')
      commit('setNewGoodsSku', {
        skuJson: [],
        goodsPrice: [],
        preferentialPrice: [],
        goodsRepertory: [],
      })
    },
    resetJournalPublish ({ commit }) {
      commit('updateJournalPublish', {
        content: '',
        images: [],
		video:'',
        location: {
          address: '',
          addressName: '',
          lat: '',
          lng: '',
        },
        cate: [],
        goodsList: [],
		goodsLists:[],
		goodList:[],
		list:[]
      })
    },
    resetCardCirclePublish ({ commit }) {
      commit('updateCardCirclePublish', {
        circleName: '',
        joinType: { id: 1, text: '允许任何人加入团' },
        joinMoney: '',
      })
    },

    getStatusBarHeight ({ commit }) {
      try {
       	// #ifdef MP-WEIXIN
					 const systemInfo = uni.getSystemInfoSync()
					console.log(systemInfo)
					commit('setSystemInfo', systemInfo)
				// #endif
				
				
				// #ifdef APP-PLUS
				
					uni.getSystemInfo({
						success:  (systemInfo)=> {
								console.log(1213,JSON.stringify(systemInfo))
								commit('setSystemInfo', systemInfo)
						}
					});
					
				// #endif

      } catch (e) {
        // Do something when catch error
      }
    },

    getSensitiveWord ({ state }) {
      // #1 获取缓存数据
      const localWordData = uni.getStorageSync('sensitiveWord');
      if (localWordData) {
        api.getSwVersion().then(result => {
          const needUpdate = !!result;
          if (needUpdate) { 
            return api.pullKeyWord();
          } else {
            return Promise.resolve(localWordData);
          }
        }).then(word => {
          uni.setStorageSync('sensitiveWord', word);
          state.sensitiveWord = word;
        })
        return;
      }
      // #2 如果没有，直接获取
      api.pullKeyWord().then(word => {
        uni.setStorageSync('sensitiveWord', word);
        state.sensitiveWord = word;
      });
    }

  },

})

export default store
// 姓名：曾继贤
// 生日：960910
// 星座：处女座
// 岗位：前端工程师
// 爱好：睡觉
// 座右铭：让专业的人做擅长的事。
// 头像：附图

// 姓名：徐庆文
// 生日：990604
// 星座：双子座
// 岗位：前端工程师
// 爱好：打游戏
// 座右铭：脚踏实地,一步一个脚印。
// 头像：附图