<template>

  <view class="container">
    <view class="publishNewGoods">
      <!-- 名称 -->
      <view class="PGgoodName fx-row fx-row-center fx-col-space-around fs3a28">
        <view class="Gname fs3a28">商品名称</view>
        <view class="Ginput">
          <input type="text" placeholder="请输入商品名称" v-model="goodsName" />
        </view>
      </view>
      <!-- 品类 -->
      <view class="PGgoodName PGgoodsKind fx-row fx-row-center fx-col-space-around fs3a28" @click="goodsCategory">
        <view class="Gname fs3a28">商品品类</view>
        <view class="Ginput">
          <input type="text" placeholder="请选择商品品类" :value="itemShopClassify ? itemShopClassify.classifyName : ''"  disabled="disabled"/>
        </view>
        <view class="gotoDetail">
          <image class="Dimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
        </view>
      </view>
      <!--属性  -->
      <view class="PGgoodName PGgoodsKind  fx-row fx-row-center fx-col-space-around fs3a28" @click="goodsAttribute">
        <view class="Gname fs3a28">商品属性</view>
        <view class="Ginput">
          <input type="text" placeholder="请填写商品规格属性" :value="skuShow"   disabled="disabled" />
        </view>
        <view class="gotoDetail">
          <image class="Dimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
        </view>
      </view>
			<!-- 商品参数 -->
			<view class="PGgoodName PGgoodsKind  fx-row fx-row-center fx-col-space-around fs3a28" @click="goodsParaneterTap">
				<view class="Gname fs3a28">商品参数</view>
				<view class="Ginput">
					<input type="text" placeholder="请填写商品参数" :value="goodsParaneterShow"  disabled="disabled" />
				</view>
				<view class="gotoDetail">
					<image class="Dimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
				</view>
			</view>
			<!-- 商品服务 -->
			<view class="PGgoodName PGgoodsKind  fx-row fx-row-center fx-col-space-around fs3a28" @click="goodsSevTap">
				<view class="Gname fs3a28">商品服务</view>
				<view class="Ginput">
					<input type="text" placeholder="请填写商品服务"  :value="goodsServicesArr.length>0?goodsServicesArr[0].serviceKey+'...':''" disabled="disabled" />
				</view>
				<view class="gotoDetail">
					<image class="Dimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
				</view>
			</view>
			 <!--邮费  -->
			<view class="PGgoodName PGgoodsKind  fx-row fx-row-center fx-col-space-around fs3a28">
			  <view class="Gname fs3a28">邮费</view>
			  <view class="Ginput">
			    <input type="number" placeholder="默认邮费为 0"  v-model="franking"  />
			  </view>
			  <view class="gotoDetail">
			    <image class="Dimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
			  </view>
			</view>
      <!-- 商品视频 -->
      <view class="PGgoodsVideo">
        <view class="Vtitle fs3a32">商品视频</view>
        <view class="VupLoadVideo fx-row fx-row-center">
          <view class="VideoBox" @click="VideoClick">
            <image class="Vimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/shangchuanship.png'" lazy-load></image>
            <view class="fs9a24">管理视频</view>
          </view>
        </view>
				 <view class="VLVitem" v-if="videoUrl">
				  <video :src="videoUrl" @error="videoErrorCallback" controls></video>
				</view>
      </view>
      <!-- 商品图片 -->
      <view class="PGgoodsVideo PGgoodsImages">
        <view class="Vtitle fs3a32">商品图片</view>
				<view style="display: flex;flex-direction: row;flex-wrap: wrap; ">
					<image class="GoodsImgsClass" :src="item" lazy-load mode="aspectFill"  v-for="(item,index) of GoodsImgs"  @click="goodsImgClick(index,GoodsImgs,1)" :key='item'></image>
					<image v-if="GoodsImgs.length<5"  style="width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'" @click="upGoodsImgTap(1)" lazy-load></image>
				</view>
      </view>
			<!-- 封面图 -->
			<view class="PGgoodsVideo PGgoodsImages">
				<view class="Vtitle fs3a32">封面图</view>
				<view style="display: flex;flex-direction: row;flex-wrap: wrap; ">
					<image class="GoodsImgsClass" :src="item" lazy-load mode="widthFix"  v-for="(item,index) of homeImgs"   @click="goodsImgClick(index,homeImgs,2)" :key='item'></image>
					<image v-if="homeImgs.length==0"  style="width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'" @click="
					upGoodsImgTap(2)" lazy-load></image>
				</view>
			</view>
    </view>
    <!-- 下一步 -->
    <view class="publishNext" @click="checkNewGoodsDetalis">
      <view class="PNnext">下一步</view>
    </view>
  </view>

</template>

<script>
  import {upVideo,upImg,uploadFile,formatTime} from '../../js/mzl.js'
  import {mapState,mapMutations} from 'vuex';
  import { processSkuData } from '@/js/util';

  export default {
    data () {
      return {
        shopId:'',//商品id
        goodsId: '',

        goodsName:'',//商品名称
        onlineSite:this.global.onlineSite,
        //视频url
        videoUrl:'',
        //商品图片
        GoodsImgs:[],
        //封面图片上传
        homeImgs:[],
        franking:'',

        skuData: null,

        details: '',

        count: 0,
      }

    },
    onLoad(op) {
      this.count = op.count;
      this.shopId=op.shopId||uni.getStorageSync('shopId');
      this.goodsId= op.goodsId;
      if (this.goodsId) {
        uni.setNavigationBarTitle({title: '编辑商品'});
				this.$store.dispatch('clearPublishInfo');
        uni.showLoading();
        this.$api.getGoodsDetail(this.goodsId).then(result => {
          const { goodsDetail } = result;
          this.goodsName = goodsDetail.title
          this.GoodsImgs = JSON.parse(goodsDetail.trundleImages);
          this.franking = goodsDetail.franking;
          this.homeImgs = [goodsDetail.coverImage];
          this.videoUrl = goodsDetail.coverVideo;
          this.details = goodsDetail.details
					uni.setStorageSync('GoodsDetails',this.details);
          this.$store.commit('setGoodsParaneter', JSON.parse(goodsDetail.paramJson))
          this.$store.commit('setGoodsServicesArr', result.serviceIdList)
          this.$store.commit('setItemShopClassify', result.goodsClassify)

          return this.$api.getGoodsSku(this.goodsId);
        }).then(result => {
				
          const skuData = processSkuData(result);
					this.skuData = skuData;
					this.$forceUpdate();
          
          uni.hideLoading();
        })
      } else {
        this.$store.dispatch('clearPublishInfo');
      }

    },
    onShow() {
			const hasSkuData = uni.getStorageSync('needForceUpdate');
			console.log(hasSkuData,this.skuData,this.skuInfo)
      if(hasSkuData){
				if(this.skuData  && this.skuData.list.length >	this.skuInfo.skuJson.length){
						if(!this.skuData.list){
										this.skuData.list=[];
								}
					this.skuData.list  = this.skuData.list.splice(0,this.skuInfo.skuJson.length);
				}
				
			
				this.skuInfo.skuJson.forEach((item,index)=>{
						if(this.skuData && this.skuData.list[index]){
								this.skuData.list[index].name = item.key;
						}else{
								let itemX = {};
								itemX.name = item.key;
								if(!this.skuData.list){
										this.skuData.list=[];
								}
								this.skuData.list.push(itemX);
						}
					
				});
				uni.setStorageSync('needForceUpdate',false);
			}
    },
    methods:{
      goodsCategory(){//商品品类
        uni.navigateTo({
          url: '../businessCard_GoodsCategory/businessCard_GoodsCategory'
        });
      },
      nextClick(data){
        this.setNewGoodsDetalis(data)
        //跳转到商品描述
        this.navigateTo('/item_businessCard/businessCard_GoodsDescribe/businessCard_GoodsDescribe',{count:this.count,shopId:this.shopId});
      },
      //校验参数
      checkNewGoodsDetalis(){
        let data={
          shopId:this.shopId,title:this.goodsName,
          classifyId:this.itemShopClassify.id,//品类id（三级分类id）
          skuJson: JSON.stringify(this.skuInfo.skuJson),//临时sku
          goodsPrice: JSON.stringify(this.skuInfo.goodsPrice),//原价
          preferentialPrice: JSON.stringify(this.skuInfo.preferentialPrice),//优惠价
          goodsRepertory: JSON.stringify(this.skuInfo.goodsRepertory),//库存
          video:this.videoUrl,coverImage:this.homeImgs[0],//商品封面
          trundleImages:JSON.stringify(this.GoodsImgs),
          details: this.details,//富文本
          serviceId:"",//商品服务保障id数组，传参形式：[value1,value2,value3…]
          paramJson: JSON.stringify(this.goodsParaneter),//商品参数json
          franking:this.franking||0,//邮费
        }
				console.log('商品属性');
				console.log(data);
        if (this.goodsId) {
          data.goodsId = this.goodsId;
        }
        let a0=[]
        for (let value of this.goodsServicesArr) {
          a0.push(value.id)
        }
        data.serviceId=JSON.stringify(a0)

        console.info(this.skuInfo)
        // return false
        if(!data.title ){
          this.showTips('请输入商品名称');
          return false;
        } else if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(data.title)){
					this.showTips('商品名称只能由字母数字中文组成');
          return false;
				}else if(!data.classifyId){
          this.showTips('请输入选择品类');
          return false;
        } else if (this.skuInfo.skuJson.length === 0 && !this.goodsId) {
          this.showTips('请填写商品规格属性');
          return false;
        }else if (!data.paramJson) {
          this.showTips('请选择商品参数');
          return false;
        } else if(!data.serviceId) {
          this.showTips('请选择商品服务');
          return false;
        }else if (!data.coverImage) {
          this.showTips('请上传商品封面照');
          return false;
        } else if(!data.trundleImages){
          this.showTips('请上传产品图片');
        }else if(!data.skuJson){
          this.showTips('请选择产品规格属性');
        }else if(!data.goodsPrice){
          this.showTips('请选择产品原价');
        }else if(!data.preferentialPrice){
          this.showTips('请选择产品优惠价');
        }else if(!data.goodsRepertory){
          this.showTips('请选择产品规库存量');
        }else {
          //发起请求
          this.nextClick(data)
        }

      },
      goodsAttribute(){//跳转到商品属性
        let params = {};
        if (this.skuInfo.skuJson.length > 0) {
          params.temp = encodeURIComponent(JSON.stringify({ data: this.skuInfo }))
        } else if (this.goodsId) {
          params.data = encodeURIComponent(JSON.stringify(this.skuData))
        }
        this.navigateTo('../businessCard_GoodsAttribute/businessCard_GoodsAttribute', params);
      },
      goodsParaneterTap(){//商品参数
        uni.navigateTo({
          url: '../businessCard_GoodsParaneter/businessCard_GoodsParaneter'
        });
      },
      goodsSevTap(){//商品服务
        uni.navigateTo({
          url: '../businessCard_GoodsAndServices/businessCard_GoodsAndServices'
        });
      },
      //点击
      goodsImgClick(index,arr,type){
        console.info(index)
        let that=this
        uni.showActionSheet({
          itemList: ['预览','删除'],
          success: function (res) {
            if(res.tapIndex==0){
              that.previewImage(index,arr,type)
            }else{
              that.delImg(index,arr,type)
            }
          },
          fail: function (res) {
            console.log(res.errMsg);
          }
        });
      },
      //删除
      delImg(index,arr,type){
        if(type==1){
          this.GoodsImgs=this.GoodsImgs.filter(o=>o!=this.GoodsImgs[index])
        }else{
          this.homeImgs=[]
        }
      },
      //预览
      previewImage(index,arr,type){
        console.info(index)
        let that=this
        uni.previewImage({
          current:arr[index],
          urls:arr,
          loop:true
        });
      },

      //上传产品图片
      upGoodsImgTap(type){
        let that=this;
				let count = type==1?3:1;
        upImg((res)=>{
          console.info(res)
          if(type==1){
						if(that.GoodsImgs.length>=5)
							return
            //that.GoodsImgs.push(res)
						that.GoodsImgs = that.GoodsImgs.concat(res)
          }else{
            that.homeImgs=[]
            that.homeImgs.push(res)
          }
        },count);
      },
      //点击
      VideoClick(index,arr,type){
        console.info(index)
        let that=this
        uni.showActionSheet({
          itemList: ['视频上传','视频删除'],
          success: function (res) {
            if(res.tapIndex==0){
              that.upVideoTap()
            }else{
              that.videoUrl=''
            }
          },
          fail: function (res) {
            console.log(res.errMsg);
          }
        });
      },
      upVideoTap(){
        upVideo(url => {
          this.videoUrl = url
        })

        // upVideo((res1)=>{
        // 	if(res1.size>20 * 1024 * 1024){
        // 		this.showTips('视频大于20M，请重新上传');
        // 	}else{
        // 		this.uploadFileTap(res1.tempFilePath).then(res2=>{
        // 			//封面图片路径
        // 			console.info('视频路径')
        // 			console.info(res2)
        // 			that.videoUrl=res2
        // 		}).catch(err2=>{
        // 			console.info(err2)
        // 		})
        // 	}
        // })
      },
      //上传文件
      uploadFileTap(data){
        uni.showLoading({title: '上传中...'});
        return new Promise((YES,NO)=>{
          uploadFile(data,(res)=>{
            uni.hideLoading();
            if(res){
              YES(res)
            }else{
              this.showTips('文件上传失败');
              NO(res)
            }
          })
        })
      },
      //Vuex引入方法
      ...mapMutations(['setNewGoodsDetalis'])
    },
    computed: {
      //Vuex引入属性
      ...mapState(['itemShopClassify','goodsParaneter','goodsServicesArr','newGoodsDetalis', 'skuInfo']),
      goodsParaneterShow () {
        if (!this.goodsParaneter) return '';
        return this.goodsParaneter.map(item => `${item.name}:${item.value}`).join(',')
      },
      skuShow () {
        if (this.skuData) {
          return this.skuData.list.map(item => item.name).join(' ');
        }
        if (this.skuInfo && this.skuInfo.skuJson) {
          return this.skuInfo.skuJson.map(item => item.key).join(' ')
        }
        return ''
      },
    },

  }

</script>

<style scoped lang="less">

	@import '../../css/mzl_base.less';
  .container{
    background:@grayBg;width:100%;border-top:1upx solid #eee;padding-bottom:50px;box-sizing:border-box;
    .publishNewGoods{
      margin-top:30upx;
      // 名称
      .PGgoodName{
        width:100%;padding:30upx;background:#fff;border-bottom:1upx solid #eee;
        .Gname{width:30%;}
        .Ginput{
          width:70%;text-align:left;
          input{padding-left:20upx;border:none;width:100%;}
        }
      }
      // 品类
      .PGgoodsKind{
        .Ginput{width:65%;}
        .gotoDetail{
          width:5%;text-align:right;
          .Dimage{width:12upx;height: 24upx;}
        }
      }
      // 属性
      // .PGoodsNature{border:none;}
      // 商品视频
      .PGgoodsVideo{
        padding:30upx;
        .Vtitle{font-weight: bold};
        .VupLoadVideo{
          border:1upx solid #ccc;width:220upx;height: 220upx;text-align:center;margin-top:40upx;
          .VideoBox{
            margin:0 auto;line-height:60upx;
            .Vimage{width:50upx;height: 32upx;vertical-align: middle}
          }
        }
      }
      // 商品图片
      .PGgoodsImages{
        .VupLoadVideo{
          .Vimage{width:220upx;height: 220upx;}
        }
      }
    }
		//视频
		 .VLVitem {
		  height: 388upx;
			padding: 20upx 0;
		  video {
		    width: 100%;
		    height: 388upx;
		  }
		}
		//产品图片
		.GoodsImgsClass{
			width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;
			}
    // 下一步
    .publishNext{
      width:100%;height:100upx;position: fixed;bottom:0;background:#fff;border-top:1upx solid #eee;
      .PNnext{
        .buttonRadius();text-align: center;line-height: 88upx;left:50%;margin-left:-310upx;position:absolute;color:#fff;font-size: 32upx;top:10upx;
      }
    }
      
}


</style>