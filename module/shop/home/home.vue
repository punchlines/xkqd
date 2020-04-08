
<template>
	<view class="page">

	
	</view>
</template>

<script>

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
			
		},

		onLoad(options) {
			
					//获取token 调用登录
			
			let userId  = uni.getStorageSync('userId');
			let token  = uni.getStorageSync('token');
			let openid  = uni.getStorageSync('openid');
			uni.showLoading();
			this.doLoginHandle(()=>{
				this.init2(options);
				this.hideLoading();
			});
		

				
			

		},
		// 监听页面显示
		onShow: function() {},
		methods: {
			init2(options){
				
								
				this.shopIdOtherPeople = options.shopIdOtherPeople || options.shopId;
				
				//获取店铺模板Id  重定向
				this.showLoading();
				
				this.$api.getShopDetail(this.shopIdOtherPeople).then(result => {
					//console.info('获取企业信息')
					console.log(result)
					let templateId = result.shopData.templetId || 0;
						
						let finalOptions = Object.assign(options,{...result});
						console.log(finalOptions)
						finalOptions.shopData = encodeURIComponent(JSON.stringify(finalOptions.shopData));
						uni.hideLoading();
						this.redirectTo(`/module/shop/model/model${templateId}`,finalOptions);					
					
				}).catch(error => {
					uni.hideLoading();
					console.error(error)
				})
			}
			
			
			
			}
	}
</script>
