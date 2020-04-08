
<script>
  import store from '@/js/store';
	import { mapState,mapMutations} from 'vuex';
	export default {
		data(){
			return {
				OnlineTime:0
			}
		},
		 onLaunch: function (e) {
			 // #ifdef APP-PLUS
					// uni.setStorageSync('userId', "404");
					// uni.setStorageSync('token', "1b1d4c5cc7f51d4c8c3ae3cde94043f5");
					// uni.setStorageSync('openid', "oQMv64pxksusAnR__pFF-BXA-pUk");
			 // #endif

		  // 获取状态栏高度
      this.$store.dispatch('getStatusBarHeight');
      //this.$store.dispatch('getSensitiveWord');

      // uni.setStorageSync('userId', 55);

      const userId = uni.getStorageSync('userId');
	//const token = uni.getStorageSync('token');

	// #ifdef MP-WEIXIN

      if (wx.canIUse('getUpdateManager')) { // 基础库 1.9.90 开始支持，低版本需做兼容处理
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function(result) {
          if (result.hasUpdate) { // 有新版本
            updateManager.onUpdateReady(function() { // 新的版本已经下载好
              wx.showModal({
                title: '更新提示',
                content: '新版本已经下载好，请重启应用。',
                success: function(result) {
                  if (result.confirm) { // 点击确定，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                }
              });
            });
				
						
            updateManager.onUpdateFailed(function() { // 新的版本下载失败
              wx.showModal({
                title: '已经有新版本了哟~',
                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
              });
            });
          }
        });
      }
      else { // 有更新肯定要用户使用新版本，对不支持的低版本客户端提示
        wx.showModal({
          title: '温馨提示',
          content: '当前微信版本过低，无法使用该应用，请升级到最新微信版本后重试。'
        });
      }

			//删除过期的token
			
			let tokenTime = uni.getStorageSync('tokenTime');
			if(tokenTime){
				if(new Date().getTime()-23*60*60*1000 > tokenTime){
					uni.setStorageSync('userId', "");
					uni.setStorageSync('token', "");
					uni.setStorageSync('openid', "");
				}
			}
			

			if(e.query){
				if(e.query.cardUserId){
					this.setCardUserId(e.query.cardUserId||uni.getStorageSync('userId'))
					this.setShareId(e.query.shareId)
					//shareId
				}else{
					this.setCardUserId(1)
				}
			}
		  // #endif

			// #ifdef APP-PLUS
			if (userId) {
				this.$store.dispatch('updateCurrentUserInfo');
			}
			// #endif

		},
		onShow: function () {
				this.OnlineTime=new Date().getTime();
				
				// #ifdef MP-WEIXIN
				
					 if (wx.canIUse('getUpdateManager')) { // 基础库 1.9.90 开始支持，低版本需做兼容处理
							const updateManager = wx.getUpdateManager();
							updateManager.onCheckForUpdate(function(result) {
								if (result.hasUpdate) { // 有新版本
									updateManager.onUpdateReady(function() { // 新的版本已经下载好
										wx.showModal({
											title: '更新提示',
											content: '新版本已经下载好，请重启应用。',
											success: function(result) {
												if (result.confirm) { // 点击确定，调用 applyUpdate 应用新版本并重启
													updateManager.applyUpdate();
												}
											}
										});
									});
							
									
									updateManager.onUpdateFailed(function() { // 新的版本下载失败
										wx.showModal({
											title: '已经有新版本了哟~',
											content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
										});
									});
								}
							});
						}
						else { // 有更新肯定要用户使用新版本，对不支持的低版本客户端提示
							wx.showModal({
								title: '温馨提示',
								content: '当前微信版本过低，无法使用该应用，请升级到最新微信版本后重试。'
							});
						}
							
				
				// #endif
	

				
				
				
		},
		onHide: function () {
				var date=new Date().getTime();
				var time=date-this.OnlineTime;
				console.info('更新登录时长')
				// console.info(time)
				if(uni.getStorageSync('userId')){
					//更新登录时长
					this.$api.updateUserOnlineTime(time).then(res=>{
						console.info('更新登录时长')
						// console.info(res)
					}).catch(err=>{
						console.info(err)
					})
				}

		},
		methods:{
			
		 //Vuex引入方法
			 ...mapMutations(['setCardUserId','setShareId'])
		},
		computed: {
		//Vuex引入属性
		...mapState(['cardUserId'])},
	}
</script>

<style lang="less">

  @import "css/main.less";
  @import 'css/flex.css';

</style>
