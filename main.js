import Vue from 'vue'
import App from './App'
import api from './js/api'
Vue.config.productionTip = false
import {md5} from "./js/md5";
import qs from 'qs';

App.mpType = 'app'

// 全局默认图
import defaultImage from './components/defaultImage.vue'
Vue.component('default-image', defaultImage)

// 全局缺省图
import defaultPage from './components/defaultPage.vue';
Vue.component('default-page', defaultPage)

import VideoContainer from './components/VideoContainer.vue';
Vue.component('VideoContainer', VideoContainer)

import uniLoadMore from '@/template/uni-load-more.vue';
Vue.component('uniLoadMore', uniLoadMore)

import AppShareTopBanner from './components/AppShareTopBanner';
Vue.component('AppShareTopBanner', AppShareTopBanner)

import TitleBar from './components/TitleBar';
Vue.component('TitleBar', TitleBar)

import wxFormIdView from './components/wxFormIdView';
Vue.component("wxView",wxFormIdView);

import format from 'date-fns/format'

Vue.prototype.$api = api;


import store from './store'
// 线上图片公共域名
import onlineSite from './components/gloabl.vue'



Vue.mixin({
  data () {
    return {
      onlineSite: '',

      // #ifdef MP-WEIXIN
      isWechat: true,
      // #endif
      // #ifndef MP-WEIXIN
      isWechat: false,
      // #endif
    }
  },
  computed: {
  	currentUser () {
  	  return store.state.currentUser || {}
		},
    // 1 => 普通用户
	isNormalUser () {
		  if (!this.currentUser) return false;
  	  return Number(this.currentUser.userType) === 1
	},
    // 2 => VIP1
    // 3 => VIP2
    // 4 => VIP3
	isVipUser () {
		if (!this.currentUser) return false;
      const type = Number(this.currentUser.userType);
      return type > 1 && type < 5;
	},
    // 5 => 销售总监
    // 6 => 销售经理
    isStaff () {
			if (!this.currentUser) return false;
      const type = Number(this.currentUser.userType);
      return type >= 5;
    },
  },
  filters: {
    price (value) {
      if (value && value.toFixed) return value.toFixed(2)
      return value || '0.00';
    },

  },
  methods: {
		//登录页面 判断登录
		// 未登录新用户(-userId -token) 未登录老用户(-userId)
		// 已获取token新用户(-userId) 已获取token老用户()
		doLoginHandle(successCallback=()=>{}){
			//successCallback(hasRegister) true-已注册 false-未注册
			let userId  = uni.getStorageSync('userId');

			uni.showLoading({
				mask:true
			})
			console.log(userId)
			if(!userId){ //新用户  或是无缓存的老用户
					let token  = uni.getStorageSync('token');
					let openid  = uni.getStorageSync('openid');
					// #ifdef APP-PLUS
					const whiteList = ["pages/login/login"]; //APP无需跳转登录页面的白名单
					
					let pages = getCurrentPages();
					let redirect = pages[pages.length-1];
					if(whiteList.indexOf(redirect.route)==-1){ //如果不在白名单
							uni.reLaunch({
								url:'/pages/login/login?redirect='+encodeURIComponent(redirect)
							})
					}else
						successCallback(false)
					// #endif
					
					
					// #ifdef MP-WEIXIN
					
						if(!!token){ //新用户已经获取过token 直接执行初始化
							successCallback(false);
							return;
						}
					
					
						uni.login({
							  provider: 'weixin',
							  success: loginRes => {
								
									this.$api.GetUserId(loginRes.code).then(res=>{
											uni.setStorageSync('token', res.token);
											uni.setStorageSync('tokenTime',new Date().getTime());
											//登录成功
											if(res.userId){
												uni.setStorageSync('userId', res.userId);

												if(!this.currentUser.id){
													this.$store.dispatch('updateCurrentUserInfo').then(res=>{
															successCallback(true);
													}).catch(err=>{successCallback(true);});
												}else successCallback(true);
										
											}else{
												//新用户
												successCallback(false);
											}
											//uni.hideLoading();
											
									}).catch(error=>{
											//successCallback(false);
											setTimeout(()=>{this.doLoginHandle(successCallback)},3000)
											//uni.hideLoading();
									});
									
							  }
						});
					// #endif
				
			}else{//获取到缓存的老用户
					if(!this.currentUser.id){
						this.$store.dispatch('updateCurrentUserInfo').then(res=>{
							successCallback(true);
						}).catch(err=>{successCallback(true);});
					}else successCallback(true);
					//uni.hideLoading();
			}
			
		},
		
		
    formatUrlWithParams (url, params) {
      return `${url}?${qs.stringify(params, { encode: false })}`;
    },
    /**
     * uni 页面跳转修改，支持传入对象参数，保留当前页面，跳转到应用内的某个页面
     * @param url uni 跳转的页面
     * @param params 参数
     */
    navigateTo (url, params = {}) {
      uni.navigateTo({ url: this.formatUrlWithParams(url, params) });
    },

    /**
     * uni 页面跳转修改，支持传入对象参数，关闭当前页面，跳转到应用内的某个页面
     * @param url uni 跳转的页面
     * @param params 参数
     */
    redirectTo (url, params = {}) {
      uni.redirectTo({ url: this.formatUrlWithParams(url, params) });
    },

    /**
     * uni 页面跳转修改，支持传入对象参数，关闭当前页面，跳转到应用内的某个页面
     * @param url uni 跳转的页面
     * @param params 参数
     */
    reLaunch (url, params = {}) {
      uni.reLaunch({ url: this.formatUrlWithParams(url, params) });
    },

    showLoading(title="请求中") {
      uni.showLoading({
        title:title,
        mask: false
      });
    },
    hideLoading() {
      uni.hideLoading();
    },
    showError (error, title = '提示') {
 
			if(error.message != "登陆已过期,请重新登陆"){
				
				uni.showModal({
					title,
					content: error ? error.message || error : '请检查网络是否已连接',
					showCancel: false,
					success: function (res) {
					}
				});
				
			}
      
    },
    showTips(title='提示',icon='none'){
      return new Promise((res,rej)=>{
        uni.showToast({
          title: title,
          icon: icon,
          duration: 700
        })
        setTimeout(()=>{
          res();
        },1000)
      })
    },
    hidePhone (phone) {
      if (phone && phone.length === 11) {
        return phone.substring(0, 3) + '****' + phone.substring(7)
      }
    },
    formatDate (date, dateFormat = 'YYYY-MM-DD HH:mm:ss') {
      if (!date) return '';
      return format(date, dateFormat);
    },

    appWXgetUserInfor (e) {
					
			// #ifdef APP-PLUS
					//APP微信登录
					console.log(123123123)
					uni.login({
						provider: 'weixin',
						success: loginRes => {
									console.log(JSON.stringify(loginRes))
									 uni.getUserInfo({
										provider: 'weixin',
										success: function (infoRes) {
												console.log(JSON.stringify(infoRes))
										}
									});
						},
						fail: (err) => {
							console.log(JSON.stringify(err))
						}
					});
					//console.log(JSON.stringify(e))
	
					
					//
			// #endif

      
    },

    getOpenUserInfo (openId) {
      this.$api.GetUserId(openId).then(res=>{
        uni.hideLoading();
        if(res.userInfoId){
          this.showTips('登录成功').then(value=>{
            uni.setStorageSync('userId',res.userInfoId)
            this.userId = res.userInfoId;
            uni.setStorageSync('shopId',res.shopId)
            // 更新上次登录时间
            this.$api.updateLastLoginTime().then(value=>{
							console.log(' 更新上次登录时间');
						})

            //
            if (this.isDefaultCard) {
              uni.switchTab({url: '/pages/businessCard/businessCard'});
            }

          })
        }else{
          // TODO: APP 处理
          uni.navigateTo({ url: '/pages/register/register?id=' + this.cardUserId })
          // uni.showModal({
          //   title: '还未注册..',
          //   content: '手机号码登录，还是注册',
          //   cancelText:'手机登录',
          //   confirmText:'注册',
          //   success: (res)=> {
          //     if (res.confirm) {
          //       uni.navigateTo({ url: '/pages/register/register?id=' + this.cardUserId })
          //     } else if (res.cancel) {
          //       uni.navigateTo({ url: '/pages/login/login' });
          //     }
          //   }
          // });
        }
      }).catch(error => {
        this.showError(error)
      })
    },

    requestPayment (data) {
      const that = this;
			if(typeof data == "string"){
				data=JSON.parse(data)
			}
      return new Promise((resolve, reject) => {
        uni.requestPayment({
          provider: 'wxpay',
          ...data,
          success (res) {
            resolve(res)
          },
          fail (err) {
						console.log(JSON.stringify(err))
            if (!err.errMsg.indexOf('cancel')) {
              that.showError('支付失败: ' + err.errMsg, '提示')
            }
            reject(err)
          }
        });
      })
    },

		formatPrice (value) {
		  if (value && value.toFixed) return value.toFixed(2)
		  return value || '0.00';
		},

    checkHasLogin (redirect, isRedirect) {
      // #ifdef H5
      // 分享页面不判断是否已登录
      // 对所有需要登录的操作都跳转至下载页
      uni.navigateTo({ url: '/pages/Download' })
      return false;
      // #endif
			//console.log(uni.getStorageSync('userId'));
      if (!this.currentUser.id) {
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const redirectPath = encodeURIComponent(this.formatUrlWithParams(`/${currentPage.route}`, currentPage.options));
				
				console.log(redirect,redirectPath)
				
        const params = {
          id: this.cardUserId || this.recommendId || '',
          redirect: redirect?encodeURIComponent(redirect):redirectPath,
        };
				
				console.log(params);
				
        if (isRedirect) {
          this.redirectTo('/pages/register/register', params);
        } else {
          this.navigateTo('/pages/register/register', params);
        }

        // uni.showModal({
        //   title: '还未注册..',
        //   content: '手机号码登录，还是注册',
        //   cancelText:'手机登录',
        //   confirmText:'注册',
        //   success: (res)=> {
        //     if (res.confirm) {
        //       uni.navigateTo({ url: '/pages/register/register?id=' + this.cardUserId })
        //     } else if (res.cancel) {
        //       uni.navigateTo({ url: '/pages/login/login' });
        //     }
        //   }
        // });
        return false;
      }
      return true;
    },

    checkHasLoginInSharePage () {
      return this.checkHasLogin('', true);
    },

		
		 weixinLogin () {
      uni.login({
        provider: 'weixin',
        success: loginRes => {
          this.$api.GetUserId(loginRes.code).then(res => {
            uni.setStorageSync('openid', res.openId);
            uni.setStorageSync('token', res.token);
						uni.setStorageSync('tokenTime',new Date().getTime());
						if(res.userId){
							uni.setStorageSync('userId', res.userId);
							this.$store.dispatch('updateCurrentUserInfo');
						}else{
								uni.navigateTo({ url: '/pages/register/register?id=' + this.cardUserId })
						}
						
						 uni.hideLoading();
						
          }).catch(error => {
                uni.hideLoading();
                this.showError(error);
            })
        }
      });
    },

    needUpdateCardCircle () {
      this.$store.commit('setNeedCircleHomeUpdate', true)
    },

		appShare (path, title) {
          // #ifdef H5
          uni.navigateTo({ url: '/pages/Download' })
          return false;
          // #endif
					 const url = 'http://h5.apemoon.com/business-card-mall-share/#' + path
					uni.share({
						provider: 'weixin',
						type: 5,
						imageUrl: 'http://card-1254165941.cosgz.myqcloud.com/logo/icon.png',
						title: title,
						miniProgram: {
								id: 'gh_d858f574eb59',
								path: path,
								type: 0,
								webUrl: url
						},
						success: ret => {
								console.log(JSON.stringify(ret));
						}
				});
					
					

          
          // uni.share({
          //   provider: 'weixin',
          //   scene: 'WXSceneSession',
          //   title: title,
          //   type: 0,
          //   href: url,
          //   summary: '',
          //   imageUrl: 'http://card-1254165941.cosgz.myqcloud.com/logo/icon.png',
          //   success: res => {
          //     // this.shareSuccessHandle(res);
          //   },
          //   fail: err => {
          //     // this.shareFailHandle(err);
          //   }
          // });

		},

    uniUploadFile (path, successCallback, failCallback, completeCallback) {
      this.$api.uploadFile(path, successCallback, failCallback, completeCallback)
    },

    copyText (text) {
      uni.setClipboardData({
        data: text,
        success: () => {
          this.showTips('复制成功')
        }
      });
    },

    checkHasSensitiveWord (content) {
      const sensitiveWord = this.$store.state.sensitiveWord;
      for(let i = 0; i < sensitiveWord.length; i++){
        if (content.indexOf(sensitiveWord[i]) !== -1){
          this.showError('请勿发布违法违规内容，否则将被封禁');
          return true;
        }
      }
      return false;
    }

  }
})

// 设置用户userId
Vue.prototype.$store = store
// store.updateUser(1);

import global from './template/common.vue'
import config from "./js/config";
Vue.prototype.global = global


Vue.prototype.global = onlineSite
Vue.prototype.test = (a,b,c)=>{
	console.log(App)
};


const app = new Vue({
    store,...App
})

app.$mount()
