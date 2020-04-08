<template>
	<view class="page">
		<!-- 模板展示区 -->
		<!-- <transition-group tag="ul" name="image">
			<li v-for="(item,index) in scrollTopBar" v-show="index==STBactive" :key="index">
				<image class="preview" :src="item.img" mode="aspectFit"></image>
			</li>
			
		</transition-group> -->
		<swiper class="swiperContainer" :indicator-dots="true" :current="STBactive"  @change="swiperChange" :duration="1000">
			<swiper-item  v-for="(item,index) in scrollTopBar" :key="index">
				<view class="swiper-item">
					<image class="preview" :src="item.img" mode="aspectFit"></image>
				</view>
			</swiper-item>
		</swiper>
		
		
		<!-- 滚动导航 -->
		<view class="scrollContainer">
			<scroll-view class="listCon" scroll-x scroll-with-animation :scroll-left="scrollX">
				<view style="display: inline-block;" v-for="(item,index) in scrollTopBar" :key="index">
					<view class="list" :class="{'BTtitle':true,'active':index==STBactive}" @click="getTem(index,item.id)" > 
						<view class="imgCon">
							 <image class="list-preview-image" :src="item.img" mode="aspectFit"></image>
							 <image class="active-image" v-if="index==STBactive" src="http://card-1254165941.cosgz.myqcloud.com/images/gouxuan@2x.png"></image>
						</view>
						<view class="lName">{{item.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				// 滚动导航
				scrollTopBar:[
					{id:0,img:'http://card-1254165941.cosgz.myqcloud.com/shopTemplate/shop4.jpg',name:'默认'},
					{id:1,img:'http://card-1254165941.cosgz.myqcloud.com/shopTemplate/shop3.jpg',name:'中国风'},
					{id:2,img:'http://card-1254165941.cosgz.myqcloud.com/shopTemplate/shop1.jpg',name:'小清新'},
					{id:3,img:'http://card-1254165941.cosgz.myqcloud.com/shopTemplate/shop2.jpg',name:'科技感'}	
				],
				STBactive:0,
				shopId:1,
				templateId:'',
				scrollX:0
			};
		},
		methods: {
				swiperChange(e){
					console.log(e.detail.current);
					this.scrollX = uni.upx2px(e.detail.current*220);
				},
			
				//点击事件
				getTem(index,id){//选中模板
					console.log(index);
					console.log(this.scrollTopBar[index].img)
					this.STBactive = index;
					this.$api.setShopTemplate(this.shopId,id).then(res=>{
						uni.setStorageSync('templateId',id);
						
						this.showTips("设置成功,重新进入店铺生效").then(res=>{
							uni.switchTab({
								url:'/pages/businessCard/businessCard'
							})
							// uni.navigateBack().then(()=>{
							// 	this.redirectTo('/item_businessCard/businessCard_MyShop/businessCard_MyShop',{
							// 		shopId: this.shopId,
							// 		userId: this.currentUser.id
							// 	});
							// });
							
						});
						console.log(res)
					});
				},
				
				
			
		},
				  //注册组件
				  components:{
				   
				  },
					//监听计算属性
				  computed: {
				   
				  // ...mapState(['ISneedRefreshuserInfo'])
				  },


				// 监听页面加载
				  onLoad: function (options) {
				   this.shopId = options.shopId;
					this.templateId = options.templateId;
					this.STBactive = Number(options.templateId);
					this.scrollX = uni.upx2px(this.templateId*220);
					console.log('监听页面加载');
				  },
				  // 监听页面显示
				  onShow: function () {
				   console.log('监听页面显示');
				  },
				  //监听页面隐藏
				  onHide: function () {
				   console.log('监听页面隐藏');
				  },
				  
				  // 监听页面卸载
				  onUnload: function () {
				   console.log('监听页面卸载');
				  },
				  //监听下拉刷新
				  onPullDownRefresh() {
				   console.log('onPullDownRefresh');
				   
					
				  },
				  //监听上拉刷新
				  onReachBottom() {
				   console.log('onReachBottom');
					//    var bool = false;
					//    this.getalldataNetwork(bool);
				  },
	}
</script>

<style lang="less" scoped>

	@import "../../css/jss_base.less";

	.page {
		display: flex;
		flex-direction: column;
	}

	.preview {
		width: 100%;
		height: calc(100vh - 310upx);
	}

	.swiperContainer{
		height:calc(100vh - 310upx);
	}

	//滑动框
	.scrollContainer{
		background: #333333;width: 100%;display: flex;height:310upx;position:fixed;bottom:0;
		align-items: center;
		padding: 0 30upx;
		.listCon{
			transition: .5s;
			width:100%;
			white-space: nowrap;
			.list{
				width:200upx;margin-right:20upx;text-align: center;
				border-radius: 10upx;
				flex-shrink:0;
				display:flex;
				flex-direction:column;
				justify-content:center;
				border-radius: 16upx;



				.imgCon{
					position: relative;
					border-radius: 16upx;
					width: 200upx;
					height: 200upx;
					position:relative;
					margin-bottom:10upx;
					background:#fff;
					.list-preview-image {
							width: 200upx;
							height: 200upx;
							border-radius: 10upx; 
							border-radius: 16upx;
						}
					.active-image {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 40upx;
					}
				}


				&.active {
					.active-image {
						display: block;
					}
				}

				.lName{font-size: 24upx;color: #fff;}
			}
		}
	}
</style>
