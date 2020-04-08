<template>
	<view class="container">
		<view class="underCon fx-row" v-for="(item,index) of underGoods" :key="index">
			<view class="imgCon">
				<default-image :src="item.covermage" custom-class="aa"></default-image>
			</view>
			<view class="infoCon">
				<view class="name single-line">{{item.title}}</view>
				<view class="saleNum">已售{{item.salesNum}}</view>
				<view class="priceCon fx-row fx-row-space-between fx-row-center">
					<text class="priceNow">￥{{item.preferentialPrice}}</text>
					<text class="priceOld">￥{{item.originalPrice}}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/more.png'" class="more" @click="moreInfo(index)"></image>
				</view>
			</view>
		</view>
		<default-page :messageToPage="messageToPage" v-if="underGoods.length === 0"></default-page>
		<!-- 下架商品弹窗 -->
			<view class="underModel" v-show="isShow">
				<view class="undCon">
					<view class="topCon">
						<view class="goodsCon fx-row">
							<view class="imgCon">
								<default-image :src="goods.covermage" custom-class="aa"></default-image>
							</view>
							<view class="infoCon fx-column fx-row-space-between">
								<view class="name single-line">{{goods.title}}</view>
								<view class="detail fx-row fx-row-space-between">
									<text class="price">￥{{goods.preferentialPrice}}</text>
									<text class="number">已售{{goods.salesNum}}</text>
								</view>	
							</view>
						</view>
						<view class="date">上次编辑时间：{{goods.updataTime}}</view>
					</view>
					<view class="bottomCon fx-column fx-row-center">
						<view class="cancel" @click="setToRecommend">上架并设为店主推荐</view>
						<view class="down btn" @click="setUp">仅上架商品</view>
						<view class="del btn" @click="deleteOneGoods">删除商品</view>
					</view>
					<!-- 退出 -->
					<view class="out" @click="outClick">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tuichu.png'"></image>
					</view>
				</view>
			</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				messageToPage:{//缺省页
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wushangpin.png',
					title:'暂无下架商品'
				},
				isShow:false,
				underGoods:[],
				goodsId:'',
				goods:[],
				shopId:''
			};
		},
		methods: {
			listMyShopGoods(){
				this.$api.listMyShopGoods(this.shopId,1,1).then(result => {
					this.underGoods = result.myShopGoodsList || [];
				})
				.catch(error => {
					console.error(error)
				})
			},
			deleteGoods(){//删除商品
				let that=this;
				this.$api.deleteGoods(this.goodsId).then(result => {
					this.underGoods=this.underGoods.filter(o=>o.goodsId!=this.goodsId)
					console.info(this.underGoods)
					this.showTips('删除成功');
				})
				.catch(error => {
					console.error(error)
				})
			},
			setGoodsStatus(status,type){//修改商品状态
							this.$api.setGoodsStatus(this.goodsId,status,type).then(result => {
								this.showTips('修改成功');
								this.underGoods=this.underGoods.filter(o=>o.goodsId!=this.goodsId)
							})
							.catch(error => {
								console.error(error)
							})
			},
			
			setToRecommend(){//上架并设为推荐
				this.setGoodsStatus(0,1)
				this.isShow = false
			},
			setUp(){//仅上架商品
				this.setGoodsStatus(0,0)
				this.isShow = false
			},
			deleteOneGoods(){//删除商品
				this.deleteGoods()
				// this.listMyShopGoods()
				this.isShow = false
			},
			
				 //点击事件
					moreInfo(index){//显示弹窗
						this.isShow = !this.isShow;
						this.goodsId = this.underGoods[index].goodsId
						this.goods = this.underGoods[index]
					},
					outClick(){//关闭弹窗
						this.isShow = !this.isShow;
					},			  
		 },
				  //注册组件
				  components:{
				   
				  },
					//监听计算属性
				  computed: {
				   
				 
				  },
		
				// 监听页面加载
				  onLoad: function (e) {
						this.shopId=e.shopId;
						console.info(this.shopId)
				  	this.listMyShopGoods()
				  },


	}
</script>

<style lang="less">

  @import "../../css/jss_base.less";
	page{
		background:#F5F5F5;width: 100%;
	}
.container{width: 100%;box-sizing: border-box;padding-top:20upx;}
.underCon{
    width: 92%; height: 298upx;margin:20upx auto; background: #ffffff;box-sizing: border-box;padding:20upx 30upx;border-radius: 20upx;margin-bottom: 30upx;
    .imgCon{
			width: 40%;
			.aa{ width: 248upx;height: 248upx;border-radius: 20upx;}
      }
      .infoCon{
			width: 55%;margin-left: 30upx;
        .name{font-size: 32upx;color: #333333;}
        .saleNum{font-size: 28upx;color: #999999;margin:15upx 0 49upx 0;}
        .priceCon{
          .priceNow{font-size: 40upx;color: #FF5858;}
          .priceOld{font-size: 28upx;color: #999999;text-decoration: line-through;}
          .more{width: 40upx;height: 40upx;}
        }
      }
  }
  // 弹窗
  .underModel{
  	position: fixed;width: 100%;height: 100%;top: 0;left:0;background:rgba(0,0,0,0.5);
  	.undCon{
  		width:80%;height: 648upx;position: absolute;left:50%;top:50%;margin-top:-282upx;margin-left:-300upx;border-radius: 10upx;
  		.topCon{
  			width:100%;height: 42%;background-color: #F8F8F8;box-sizing: border-box;padding: 30upx;border-radius: 10upx 10upx 0 0;
				
  			.goodsCon{
					.imgCon{width:40%;}
  				image{width: 160upx;height: 160upx;margin-right: 30upx;}
  				.infoCon{width:60%;
  					.name{font-size: 30upx;color: #333333;width:65%; text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
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
  					width:90%;height: 88upx;line-height: 88upx; margin: 0 auto;font-size: 32upx;color: #FFFFFF;text-align: center;
					background:#6B7AF8 ;border-radius: 44upx;margin-top: 54upx;
  				}
				.btn{width: 48%;height: 64upx;line-height: 64upx;margin: 0 auto;font-size: 28upx;text-align: center;border-radius: 44upx;}
  				.down{color: #6B7AF8;background:#F8F8FF;margin:30upx 0;}
				.del{color: #999999;background:#F8F8F8;margin-bottom: 40upx;}
  			}
  			.out{
  				position:absolute;right: 0;top:-70upx;
  				image{width:50upx;height: 50upx;}
  			}
  		}
  }
</style>
