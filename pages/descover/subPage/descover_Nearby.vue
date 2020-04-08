<template>
	<view class="Nearby">
		<!-- v-if="showLocaIcon" -->
		<view class="recomendLocation" v-if="adressDetail">
			<view class="Llist fs6a24">
				<image class="Limage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/dibiao.png'" mode=""></image>
				{{adressDetail}}
			</view>
		</view>

		

		<view class="recommendBox fx-row fx-row-center fx-row-space-around">
			<descover-item  :showAdress="showAdress" :recommendList="recommendList"></descover-item>
		</view>

	
		<view v-if="recommendList.length==0 && !loading" class="default">
			<default-page v-if="this.getAddressSuccess" :messageToPage="messageToPage"></default-page>
			<button class="btn-primary" v-if="(recommendList.length!=0  && !loading) || !this.getAddressSuccess" @click="opensetting">重新获取位置</button>
		</view>
		
	<!-- 	<view v-if="this.getAddressSuccess" @click="getRegeo">获取当前地址信息</view> -->
		
		<uni-load-more v-else :loading-type="loadingType2" ></uni-load-more>

	</view>
</template>

<script>
	// 引入高德小程序 SDK
	//import loadMoreMixins from '@/js/mixins/loadMoreMixins2';
	import amap from '../../../js/amap-wx.js';
	import descoverItem from './descoverItem.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		name: "descoverNearby",
	
		components: {
			descoverItem
		},
		props: {
			loadingType: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				currentPage: 1,
				loading: false,
				recommendList: [],
				// 定位信息
				amapPlugin: null,
				key: "ec1f158648af1a94e2c082d3a186983f",
				addressName: null,
				weather: {
					hasData: false,
					data: []
				},
				// 弹窗，获取地理位置
				showLocation: false,
				showLocaIcon: false,
				showAdress: true,
				failShow: false,
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/shoucang.png',
					title: '当前暂无数据'
				},
				getAddressSuccess:false,
				latitude: 0,
				longitude: 0,
			};
		},
		mounted () {
			this.adress('');
			// this.showLocation=true;
			// this.getMessage();
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});

			

			this.getRegeo();

			const journalMessage = uni.getStorageSync('tempNearby') || [];
			journalMessage.forEach(item => {
				try {
					item.praiseType = Number(item.praiseType)
					item.images = JSON.parse(item.images)
					item.distance = Number(item.distance).toFixed(1);
				} catch (e) {
					item.images = []
				}
			})
			this.recommendList = journalMessage;

		},
		
		computed: {
			...mapState(['adressDetail', 'needUpdateDiscovery']),
		
			loadingType2() {
				return this.loadingType;
			}
	
		},
		methods: {
			//Vuex引入方法
			...mapMutations(['adress']),
			opensetting(){
				// #ifdef MP-WEIXIN
				uni.openSetting({
				  success:(res)=> {
					if(res.authSetting["scope.userLocation"]){
						//console.log(this)
						this.getRegeo();
					}
				  }
				});
				// #endif
			},
			
			
			
			reFetch(){
				if (this.needUpdateDiscovery) {
					this.recommendList = [];
					this.currentPage=1;
					//this.reset();
					this.fetch();
					this.$store.commit('setNeedUpdateDiscovery', false);
				}
			},
			
			
			// 获取地理位置信息
			getRegeo() {
				uni.showLoading({
					title: '获取信息中'
				});
				this.amapPlugin.getRegeo({
					success: (data) => {
						//console.log(data)
						this.getAddressSuccess=true;
						const address = data[0]
						if (address) {
							this.latitude = address.latitude;
							this.longitude = address.longitude;
					
						}
						this.adress(data[0].name);
						uni.hideLoading();
						this.fetch();
						
					},
					fail: () => {
						//this.fetch();
						this.getAddressSuccess=false;
						
						this.recommendList=[];
						uni.hideLoading()
						
					}
				});
			},
			// 获取推荐列表
			fetch() {
				this.loading = true;
				this.showLoading();
				this.$api.getMessage(2, this.currentPage, this.latitude, this.longitude).then(res => {
					// 缓存第一页的数据
					let list = res.journalMessage;
					if (this.currentPage === 1) {
						this.recommendList = [];
						uni.setStorageSync('tempNearby', res.journalMessage);
					}

					this.hideLoading();
					list.forEach(item => {
						try {
							item.images = JSON.parse(item.images)
							item.distance = Number(item.distance).toFixed(1);
						} catch (e) {
							item.images = []
						}
					})
					if (list.length === 0) {
						//this.noMore = true;
						this.$emit("noMore");
					}
					this.recommendList = this.recommendList.concat(list);
					this.loading = false;
					this.$emit("finish");
					this.currentPage++;
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			},
			// 允许获取地理位置信息
			// 			Agree() {
			// 				setTimeout(() => {
			// 					this.getRegeo();
			// 					this.showLocation = false;
			// 				}, 0)
			// 				this.showLocaIcon = true;
			// 			},
			// 不允许获取地理信息
			// 			Cancle() {
			// 				this.showLocation = false;
			// 				this.showLocaIcon = false;
			// 			},

		}
	}
</script>

<style lang="less" scoped>
	@import '../../../css/mzl_base.less';

	.Nearby {
		.recomendLocation {
			height: 56upx;
			line-height: 56upx;
			display: inline-block;
			padding: 10upx 20upx;
			margin-bottom: 40upx;

			.Llist {
				width: auto;
				background: #EEEEEE;
				border-radius: 28upx;
				padding: 0 20upx;

				.Limage {
					width: 23upx;
					height: 28upx;
					vertical-align: middle;
				}
			}
		}

		.container3 {
			z-index: 99999999;
			position: fixed;

			.popup {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, .5);
				text-align: center;

				// 删除日志
				.DeleteLog {
					.DLlist {
						width: 560upx;
						height: auto;
						background: #fff;
						position: absolute;
						border-radius: 10upx;
						top: 50%;
						left: 50%;
						margin-left: -280upx;
						margin-top: -130upx;

						.DLtitle {
							font-size: 32upx;
							color: #333;
							text-align: center;
							padding: 40upx;
							font-weight: 500;
							line-height: 50upx;
						}

						.DLbutton {
							font-size: 28upx;
							border-top: 1upx solid #E1E1E1;
							text-align: center;

							.DLagree,
							.DLreject {
								width: 50%;
								height: 87upx;
								line-height: 87upx;
								padding-bottom: 2upx;
							}

							.DLagree {
								color: #3576EE;
							}

							.DLreject {
								color: #999999;
								border-right: 1upx solid #E1E1E1;
							}
						}
					}
				}
			}

		}

		.default {
			position: fixed;
			top: 50%;
			left: 50%;
			margin-top: -86upx;
			margin-left: -115upx;
		}
	}
</style>
