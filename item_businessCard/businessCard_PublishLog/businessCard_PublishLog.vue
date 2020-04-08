<template>
	<view class="container">
		<view >
			<textarea  @click="focusArea" :focus="focus" @blur="blurArea" class="contentCon" v-model="journal.content" placeholder="这一刻,你想说点什么" placeholder-style="color: #CCCCCC"
					maxlength="700" auto-focus="true">
			</textarea>
		</view>
		<!-- 上传图片 -->
		<view class="uploadImage">
			<block v-for="(item, index) in journal.images" :key="item" class="UImage">
				<view class="UIimageBox">
					<image class="UIImage" :src="item" @click="previewImage(item)" mode="aspectFit" />
					<image class="DelImage" @click="removeImage(index)" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/del_zi.png'"></image>
				</view>
			</block>
			<wx-view v-if="journal.images.length < 9">
				<view class="UIuserinfo" @click="upload" >
					<image class="addImage"  :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'"></image>
				</view>
			</wx-view>
			
		</view>
		<!-- 选择 -->
		<view class="local fx-row fx-row-space-between fx-row-center" @click="toLocal">
			<view class="left fx-row fx-row-center">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/dibiao.png'" class="localImg"></image>
				<text class="label">所在位置</text>
				<text>{{ showLocation }}</text>
			</view>
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/qian.png'" class="go"></image>
		</view>
		<view class="type fx-row fx-row-space-between fx-row-center" @click="toDynamic">
			<view class="left fx-row fx-row-center">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/leibie.png'" class="typeImg"></image>
				<text class="label">动态分类</text>
				<text>{{ showCateList }}</text>
			</view>
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/qian.png'" class="go"></image>
		</view>
		<view class="conn fx-row fx-row-space-between fx-row-center" @click="toConnectGoods" :class="{ noBorder: journal.goodsList.length > 0 }" v-if="isVipUser">
			<view class="left fx-row fx-row-center">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/shangp.png'" class="connImg"></image>
				<text class="label">关联商品</text>
			</view>
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/qian.png'" class="go"></image>
		</view>

		<view class="select-goods-list" v-if="isVipUser">
			<view class="goods" v-for="(goods, index) in journal.goodsList">
				<image class="goods-cover" :src="goods.coverImage"></image>
				<view class="goods-meta">
					<view class="goods-name">{{ goods.title }}</view>
					<view class="price">￥{{ goods.preferentialPrice }}</view>
				</view>
				<view class="close-area" @click="removeGoods(index)">
					<image src="http://card-1254165941.cosgz.myqcloud.com/images/goods_del.png"></image>
				</view>
			</view>
		</view>

		<!-- 发布日志按钮 -->
		<view class="fabuBtnCon">
			<wx-view>
				<view class="fabuBtn" @click="publish">发布日志</view>
			</wx-view>
			
		</view>
	</view>
</template>
<script>
  // import {mapState,mapMutations} from 'vuex';

  import { upImg } from '@/js/mzl';

  export default {
    data() {
      return {
        images: [],
		countNum:9,
		focus:true
      }
    },

	computed: {
      journal () {
        return this.$store.state.journalPublish;
	  },
      showLocation () {
        return this.journal.location.addressName;
	  },
      showCateList () {
        return this.journal.cate.map(item => item.name).join(' ');
      },
	},

	onLoad () {
      this.$store.dispatch('resetJournalPublish');
	},

		methods: {
			
			blurArea(){
				console.log(this.focus)
				this.focus = false;
				this.$forceUpdate();
			},
			
			focusArea(){
				console.log(this.focus)
				this.focus = true;
				this.$forceUpdate();
			},
			
			upload () {
				uni.chooseImage({
					count: 9 - this.journal.images.length,
					success: (res) => {
						uni.showLoading({ title: '上传中...' });
						let count = res.tempFilePaths.length;
						res.tempFilePaths.forEach(path => {
							this.uniUploadFile(path, url => {
								if(this.journal.images.length<9){
									this.journal.images.push(url)
								}
							}, null, () => {
								if (--count <= 0) {
									uni.hideLoading();
								}
							});
						})
					}
				})
			},

      previewImage (item) {
        uni.previewImage({
          current: item,
          urls: this.journal.images,
        });
	  },

      removeImage (index) {
        this.journal.images.splice(index, 1);
	  },

      // 所在位置
      toLocal () {
		  // #ifdef MP-WEIXIN
			const that = this;
			uni.authorize({
				scope: 'scope.userLocation',
				success () {
					uni.chooseLocation({
						success: (res) => {
							that.journal.location = {
								address: res.address,
								addressName: res.name,
								lat: res.latitude,
								lng: res.longitude,
							}
						}
					});
				},
				fail () {
					that.openConfirm()
				}
			})
		  // #endif
		  //app端选择定位
		  // #ifdef APP-PLUS
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success:  (res)=> {
					const { latitude , longitude } = res;
					//打开地图
					this.navigateTo('/item_descover/desvover_map/desvover_map',{
						latitude , longitude 
					});
					
				},
				fail: (err) => {
					this.showTips('获取位置失败,请打开位置获取权限');
				}
			});
		// #endif
		
      },

			openConfirm () {
				wx.showModal({
					content: '检测到您没打开销刻渠道的定位权限，是否去设置打开？',
					confirmText: "确认",
					cancelText: "取消",
					success: (res) => {
						if (res.confirm) {
							wx.openSetting({
								success: (res) => { }
							})
						}
					}
				});
			},


      // 动态类型
      toDynamic () {
        uni.navigateTo({
          url: '../businessCard_Dynamic/businessCard_Dynamic'
        });
      },

      // 关联商品
      toConnectGoods () {
        if (this.currentUser.shopId === 0) {
          this.showError('请先上传商品')
          return;
		}
        uni.navigateTo({
          url: '../businessCard_ConnectGoods/businessCard_ConnectGoods'
        });
      },

      removeGoods (index) {
        this.journal.goodsList.splice(index, 1);
	  },

      publish () {
        if (!this.journal.content && !this.journal.images.length) {
          this.showTips('请输入文字或上传图片！');
          return;
		}
        if (this.journal.cate.length === 0) {
          this.showTips('请选择分类！');
          return;
        }
				if (this.checkHasSensitiveWord(this.journal.content)) {
					return;
				}

        const journal = this.journal;
        const postData = {
          content: journal.content,
          images: JSON.stringify(journal.images),
          longitude: journal.location.lng,
          latitude: journal.location.lat,
          address: journal.location.address,
          addressName: journal.location.addressName,
          journalTypeId: JSON.stringify(journal.cate.map(item => item.id)),
          goodsId: JSON.stringify(journal.goodsList.map(item => item.goodsId)),
		};

        uni.showLoading();
        this.$api.setNewJournal(postData).then(result => {
          uni.hideLoading()
          this.showTips('发布成功');
					this.$store.commit('setNeedUpdateDiscovery', true);
		  uni.setStorageSync('_newJournalFlag', true);
          uni.navigateBack();
		}).catch(error => {
		  uni.hideLoading();
		  this.showError(error, '发布失败')
		})
	  },

    },
  }
</script>
<style lang="less" scoped>

@import "../../css/jss_base.less";
.container{
	background: #F8F8F8;
	min-height: 100vh;
	box-sizing: border-box;
	padding-bottom: 120upx;

	.contentCon{
		width:100%;
		height:250upx;
		box-sizing:border-box;
		padding:40upx 30upx;
		background:#ffffff;
	}
	//上传图片
	.uploadImage{
			.flex(flex-start);width:100%;margin:0 auto;margin-bottom:20upx;box-sizing:border-box;padding:40upx 30upx;background:#FFFFFF;
			flex-wrap: wrap;
		.UImage {
			margin-right:16upx;
		}

			.UIuserinfo{
					width:220upx;height:220upx;
					image{width:220rpx;height:220rpx;}
			}
			.UIimageBox{
					position: relative;width:220upx;height:220upx; margin-right: 10upx; margin-bottom: 10upx;
					.UIImage{
							width:220upx;height:220upx;
							// width:100%;
							display: inline-block;
					}
					.DelImage{width:40upx;height: 40upx;position: absolute;top:0;right:0;}
			}

	}
	.label {
		margin-right: 60upx;
	}
	// 选择
	.go{width: 14upx;height: 24upx;}
	.local{
		width: 100%;box-sizing: border-box; padding: 0 30upx;background: #FFFFFF;height:106upx ;border-bottom: 1px solid #E1E1E1;font-size: 28upx;color: #666666;
		.localImg{width: 32upx;height: 32upx;margin-right: 10upx;}
	}
	.type{
		width: 100%;box-sizing: border-box;padding: 0 30upx;height:106upx ;border-bottom: 1px solid #E1E1E1;font-size: 28upx;color: #666666;background: #FFFFFF;
		.typeImg{width: 32upx;height: 32upx;margin-right: 10upx;}
	}
	.conn{
		width: 100%;box-sizing: border-box;padding: 0 30upx;height:106upx ;border-bottom: 1px solid #E1E1E1;font-size: 28upx;color: #666666;background: #FFFFFF;
		.connImg{width: 32upx;height: 32upx;margin-right: 10upx;}

	}
// 发布按钮
	.fabuBtnCon{
		position: fixed;bottom: 0;z-index: 99;width: 100%;height:98upx;text-align: center;background: #FFFFFF;
		.fabuBtn{
			width:620upx ;height: 80upx;line-height: 80upx;margin: 10upx auto;font-size:28upx ;color: #FFFFFF;background: #6B7AF8;border-radius: 40upx;
		}
	}
}

.select-goods-list {
	background-color: #ffffff;
	padding: 30upx;

	.goods {
		padding: 20upx;
		background:rgba(245,245,245,1);
		display: flex;
		position: relative;
		margin-bottom: 24upx;
	}
	.goods-cover {
		width:140upx;
		height:140upx;
		margin-right: 44upx;
	}
	.goods-meta {
		flex: 1;
		position: relative;
	}
	.goods-name {
		font-size:28upx;
		color:rgba(51,51,51,1);
		line-height:40upx;
	}
	.price {
		position: absolute;
		font-size:30upx;
		color:rgba(255,88,88,1);
		line-height:42upx;
		bottom: 0;
		left: 0;
	}
	.close-area {
		width: 36upx;
		height: 36upx;
		position: relative;
		image {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 18upx;
			height: 18upx;
		}
	}
}

	.noBorder {
		border-bottom: none !important;
	}


</style>
