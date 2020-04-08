<template>
  <view class="container">
	

  </view>

</template>

<script>
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2';

	import {mapState,mapMutations} from 'vuex';
	import ShopGuide from "./ShopGuide";
  export default {

	  mixins: [loadMoreMixins],

	  data () {
      return {
        onlineSite:this.global.onlineSite,
        messageToPage1:{//缺省页
          image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wushangpin.png',
          title:'暂无推荐商品'
        },
        messageToAPage2:{
          image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wushangpin.png',
          title:'您当前还没上传商品哦！'
        },
        isShow:false,
        recommendShopGoods:[],
        //全部商品
        allShopGoods: [],
        oneGoods:[],
        goodsId:'',
        status:'',
        shopRecommend:'',
        sta404:'',
        all404:'',
        shopId:1,
        userId:'',
        shopName:'',
        shopDetail: {},
				availableCount: 0,
      }
    },

		onLoad(e){
			//this.shopId=e.shopId||uni.getStorageSync('shopId');
			
					//获取token 调用登录
			
			
			this.userId=uni.getStorageSync('userId');
			uni.showLoading();
			
			this.doLoginHandle((hasLogin)=>{
				this.init(e);
			});
			
			
		},

		onShow () {
			//this.reset();
			//this.fetch();
		},

    onShareAppMessage (res) {
      return this.shareInfo;
    },

    methods: {
			init(options){
				this.shopId=options.shopId||uni.getStorageSync('shopId');
				//获取店铺模板Id  重定向
				this.showLoading();
				
				this.$api.getShopDetail(this.shopId).then(result => {
					//console.info('获取企业信息')
					console.log(result)
						let templateId = result.shopData.templetId || 0;
						
						let finalOptions = Object.assign(options,{...result});
						console.log(finalOptions)
						finalOptions.shopData = encodeURIComponent(JSON.stringify(finalOptions.shopData));
						uni.hideLoading();
						this.redirectTo(`/module/shop/model/model${templateId}`,finalOptions);					
						//uni.hideLoading();
				}).catch(error => {
					uni.hideLoading();
					console.error(error)
				})
				
				
				
			},
			
			
      fetch(){
				this.$api.getShopDetail(this.shopId).then(result => {
					this.shopDetail = result.shopData;
					this.availableCount = this.shopDetail.availableQuantity
					console.log(this.shareInfo)
				}).catch(error => {
					this.showError(error)
				})

        //我的店铺商品列表
        this.$api.listMyShopGoods(this.shopId, 0, this.currentPage).then(result => {
						if (this.currentPage === 1) {
							this.allShopGoods = [];
							this.recommendShopGoods = result.myShopGoodsList.filter(item => item.shopRecommend == 1);
			}

			this.loading = false;
			const list = result.myShopGoodsList;
			if (list.length === 0) {
				this.noMore = true;
			}
			this.allShopGoods = this.allShopGoods.concat(list);
			this.currentPage++;

          console.log(this.recommendShopGoods, this.allShopGoods)

        }).catch(error => {
          console.log(2222)
          console.error(error)
        })
      },
      //取消店家推荐
      setShopRecommend(goodsId){
        if(this.oneGoods.shopRecommend == 1){//取消
          this.$api.setShopRecommend(goodsId, 0).then(result => {
			  this.reset();
            this.fetch()
            this.isShow = false
            this.showTips('取消成功')
          }).catch(error => {
            console.error(error)
          })
        }
        else{//设置
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
      setGoodsStatus(goodsId){
        this.$api.setGoodsStatus(goodsId,1,0).then(result => {
          this.showTips('修改成功');
          this.isShow = false;
          this.fetch()
        })
            .catch(error => {
              console.error(error)
            })
      },
      cancelRecommend(goodsId){//取消店主推荐
        this.setShopRecommend(goodsId);
      },
      toRecommend(goodsId){//设为店主推荐
        this.setShopRecommend(goodsId);
      },
      downGoods(goodsId){//下架商品
        this.setGoodsStatus(goodsId)
        this.isShow = false
      },
      //点击事件
      changeTemplate(){//更换店铺模板
        uni.navigateTo({
          url: '../businessCard_ShopTemplate/businessCard_ShopTemplate'
        });
      },
      pusblishGoods(){
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
					url: '../businessCard_publishNewGoods/businessCard_publishNewGoods?shopId='+this.shopId + '&count=' + this.availableCount
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
          url: '../businessCard_VIP/businessCard_VIP_New?urlType='+'myShop'
        });
      },
      underGoods(){//下架商品
        uni.navigateTo({
          url: '../businessCard_UnderGoods/businessCard_UnderGoods?shopId='+this.shopId
        });
      },
      goodsDetail(id){//跳转到商品详情页
        uni.navigateTo({
          url: '../../module/shop/goodsDetail/goodsDetail?id='+id + '&shopId='+this.shopId
        });
      },
      shareClick(){//分享到朋友圈
        uni.share({
          provider: "weixin",
          scene: "WXSenceTimeline",
          type: 0,
          href: "http://uniapp.dcloud.io/",
          title: "uni-app分享",
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni.png'",
          success: (res) => {
            this.showTips('分享成功');
          },
          fail: function (err) {
          }
        });
      },


      //弹窗 下架商品  shopRecommend
      allmoreInfo(item){
        this.isShow = !this.isShow;
        this.oneGoods = item;
        console.info(this.oneGoods)
      },
      outClick(){//退出
        this.isShow = !this.isShow;
      },
      //Vuex引入方法
      ...mapMutations(['setUserType'])
    },
    //注册组件
    components:{
			ShopGuide

    },
    computed: {
      //Vuex引入属性
      ...mapState(['cardUserId','userType','carGoods']),
      shareInfo () {
        return {
          title: this.shopDetail.shopName,
          path: '/module/shop/home/home?shopId='+this.shopId,
          imageUrl: this.shopDetail.logo,
        }
      },
    },
  }

</script>

<style lang="less">


  @import "../../css/jss_base.less";
	page{
		background: #F5F5F5;width:100%;
	}
.container{
  padding-bottom:20upx;height:100%;
  // 导航栏
  .navCon{
    width:100%;height: 190upx;background:#ffffff;
    .nav{
			width:25%;
      .one{width: 52upx;height: 52upx; }
      .two{width: 52upx;height: 52upx; }
      .three{width: 52upx;height: 52upx;}
      .four{width:52upx;height: 52upx;}
      .txt{font-size: 28upx;color: #666666;margin-top: 24upx;}
    }
  }
  // 店主推荐
  .title{font-size:36upx;color: #333333;margin: 54upx 0 30upx 32upx;font-family: PingFangSC;}
  .recommCon{
    width: 92%; height: 298upx;margin:0 auto; background: #ffffff;box-sizing: border-box;padding:20upx 30upx;border-radius: 20upx;margin-bottom: 30upx;
    .imgCon{
			width: 40%;
     .aa{ width: 248upx;height: 248upx;border-radius: 20upx;}
      }
      .infoCon{
				width: 55%;
        margin-left: 30upx;
        .name{font-size: 32upx;color: #333333;}
        .saleNum{font-size: 28upx;color: #999999;margin:15upx 0 49upx 0;}
        .priceCon{
          .priceNow{font-size: 40upx;color: #FF5858;}
          .priceOld{font-size: 28upx;color: #999999;text-decoration: line-through;}
          .more{width: 40upx;height: 40upx;}
        }
      }
  }
	//热门推荐弹窗
	.recommendModel{
		position: fixed;width: 100%;height: 100%;top: 0;left:0;background:rgba(0,0,0,0.5);
		.recommedCon{
			width:80%;height: 564upx;position: absolute;left:50%;top:50%;margin-top:-282upx;margin-left:-300upx;border-radius: 10upx;
			.topCon{
				width:100%;height: 50%;background-color: #F8F8F8;box-sizing: border-box;padding: 30upx;border-radius: 10upx 10upx 0 0;
				.goodsCon{
					.img{
						width:40%;
						.bb{width: 160upx;height: 160upx;margin-right: 30upx;}
						}

					.infoCon{width:60%;
						.name{font-size: 30upx;color: #333333;}
						.detail{font-size: 24upx;
							.price{color: #FF5858;}
							.number{color: #666666;}
							}
						}
					}
					.date{font-size: 24upx;color: #999999;margin-top:24upx;}
				}
				.bottomCon{
					width:100%;background:#FFFFFF;border-radius: 0 0 10upx 10upx;
					.cancel{
						width:90%;height: 88upx;line-height: 88upx; margin: 0 auto;font-size: 32upx;color: #FFFFFF;text-align: center;background:#6B7AF8 ;border-radius: 44upx;margin-top: 54upx;
					}
					.down{
						width: 48%;height: 64upx;line-height: 64upx;margin: 0 auto;font-size: 28upx;color: #6B7AF8;background:#F8F8FF;text-align: center;border-radius: 44upx;margin:30upx 0 50upx 0;
					}
				}
				.out{
					position:absolute;right: 0;top:-70upx;
					image{width:50upx;height: 50upx;}
				}
			}
			//分享至微信
			.shareWX{
				position: absolute;bottom:90upx;color: #FFFFFF;font-size: 24upx;
				image{width:80upx;height: 80upx;margin-bottom: 20upx;}
			}
			.but{width:100%;height:100%;position:absolute;left:0;top:0;opacity:0;}
	}
	//缺省页
	.default404{
		height:100%;
	}
}

</style>
