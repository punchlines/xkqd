<template>
  <view class="container">


    <!-- 个人信息 -->
    <view class="perInfoCon">
      <view class="bgCon">
        <view class="br_l">{{viewNum}}人看过Ta</view>
        <view class="bg_r">
          <view >
            <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/like2.png'" v-if="praiseState==1"></image>
            <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/like.png'" v-else></image>
            <text>{{userDetails.praiseNum}}</text>
          </view>
          <view class="shouCang">
            <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang2.png'" v-if="collectState==1"></image>
            <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang.png'" v-else></image>
            <text>{{userDetails.collectNum}}</text>
          </view>
        </view>
      </view>
      <!-- 信息详情 -->
      <view class="infoDe">
        <view class="ava fx-row">
          <default-image :src="userDetails.headImage" custom-class="home-avatar"></default-image>
          <view class="nameInfoCon">
            <view class="nameInfo fx-row">
              <view class="name">{{userDetails.name}}</view>
              <view class="posi">{{userDetails.job}}</view>
            </view>
            <view class="company">{{userDetails.company}}</view>
          </view>
        </view>
        <view class="per_de">
          <view class="fx-row fx-row-center ma">
            <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/phone.png'" class="tell"></image>
            <text class="wenzi">{{ showPhone }}</text>
          </view>
          <view class="fx-row fx-row-center ma" v-if="userDetails.email">
            <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/email.png'" class="email"></image>
            <text class="wenzi">{{ userDetails.email }}</text>	
          </view>
          <view class="detail fx-row fx-row-center ma" v-if="userDetails.autograph">
            <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/qianming.png'" class="edit"></image>
            <text class="wenzi">{{ userDetails.autograph }}</text>
          </view>
        </view>
        <!-- 个人资料按钮 -->
        <view class="data" @click.stop="editCard">编辑资料</view>
       
      </view>
    </view>

   

    <!-- 导航（我的名片） -->
    <view class="subNav fx-row fx-row-center" >
      <view class="fx-column fx-row-center nav-item" @click="myCustomer" v-if="userType>1 ">
        <view class="cuCon">
          <text class="cuNum">{{userDetails.customerNum}}</text>
        </view>
        <text class="nav_ti">我的客户</text>
      </view>
      <view class="fx-column fx-row-center nav-item" @click="toWheel">
        <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/caifulunp.png'" mode="widthFix"></image>
        <text class="nav_ti">财富轮盘</text>
      </view>
      <view class="fx-column fx-row-center nav-item" @click="tosearchCard">
        <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/email%20copy%203.png'" mode="widthFix"></image>
        <text class="nav_ti">搜名片</text>
      </view>
      <view class="fx-column fx-row-center nav-item" @click="toThematic" v-if="userType>1 ">
        <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/zhuanti.png'" mode="widthFix"></image>
        <text class="nav_ti">专题数据</text>
      </view>
    </view>

    <!-- 个人视频 -->
    <view class="VideoList">
      <view class="VLtitle fx-row fx-row-center fx-row-space-left"> 
        <view @click.stop="changeVideoTitle(index)" :class="{'Tname':true,'titleActive':VideoList.VTitleActive==index}"
              v-for="(item,index) in VideoList.VideoTitle" :key='index' v-if="item.id !== 1 || !!shopId">{{item.title}}</view>
      </view>
      <view class="Vlvideo">
        <view class="VLVitem" v-if="VideoList.VTitleActive==0">
          <video v-if="videoResult.userVideoMap" :src="videoResult.userVideoMap.videoUrl" @error="videoErrorCallback" controls></video>
					<view v-else @click.stop="editCard">
						 <defaultpage   :messageToPage="messageToPage5"  ></defaultpage>
					</view>
        </view>
        <view class="VLVitem" v-if="VideoList.VTitleActive==1">
          <video v-if="videoResult.shopVideoMap" :src="videoResult.shopVideoMap.videoUrl" @error="videoErrorCallback" controls></video>
					 <view v-else  @click.stop="editCard">
						 <defaultpage   :messageToPage="messageToPage5"  ></defaultpage>
					 </view>
        </view>
      </view>
    </view>

    <!-- 商品日志 -->
    <view class="dayCon">
      <!-- 标题切换 -->
      <view class="dayCon_title fx-row">
        <view v-for="(item,index) in auditTitleBox.auditTitle" :key="index" @tap.stop="changeTitle($event,index)" :class="{'ATname':true,'ATactive':audiTitleActive==index}"
              class="title">{{item.title}}
        </view>
      </view>

      <!-- 商品 -->
      <view class="shopContainer fx-column fx-col-center" v-if="audiTitleActive==0">

        <view v-if="userType>1">
          <!-- 店铺logo -->
					
          <view  class="bannerCon" @click.stop="toShop" v-if="userType<5&&userType>1">
            <default-image :src="cardShopData.logo" custom-class=""></default-image>
            <view class="shopName">
              <view class="name">{{cardShopData.shopName}}</view>
              <view class="goodsNum">{{cardShopData.goodsNum||0}}个商品</view>
            </view>
            <view class="shopButton">进店</view>
          </view>
          <!-- 商品列表 -->
          <view class="goodsListCon fx-wrap fx-row fx-row-space-between">
            <!-- 判断2——有没有商品  (是否有商品数量)-->
            <view class="goodsCon" v-for="(item,index) of cardShopGoodsList" :key="index" @click.stop="goodsDetail">
              <view class="imgCon">
                <default-image :src="item.coverImage" custom-class=""></default-image>
                <view class="score">评分<text>{{item.score}}{{userType}}</text></view>
              </view>
              <view class="textDetail">
                <view class="goodsName">{{item.name}}</view>
                <view class="goodsDe fx-row fx-row-space-between fx-col-center">
                  <text class="price">￥{{item.originalPrice}}</text>
                  <text class="saleNum">已售{{item.salesNum}}</text>
                </view>
              </view>
            </view>

            <!-- 判断2-没有商品-->
            <view v-if="cardShopGoodsList.length == 0 &&userType>1" style="align-items: center;width: 100%;">
              <view>
                <!-- 您还没有上传商品哦，赶紧去上传吧~ -->
                <defaultpage :messageToPage="messageToPage4"  ></defaultpage>
              </view>
            </view>
          </view>
        </view>
        <!-- 判断1 没开店 -->
        <view  v-if="userType==1">
          <view  @click='businessCard_VIP'>
            <!-- 会员才能开店哦，赶紧开通吧~ -->
            <defaultpage :messageToPage="messageToPage3"></defaultpage>
          </view>
        </view>
      </view>

      <view class="logCon" v-if="audiTitleActive==1">
        <view class="TBmiddle">
          <swiper @change="changeSwiperNum($event)" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
                  :duration="duration" indicator-color="#E1E1E1" circular="true" indicator-active-color="#6B7AF8" display-multiple-items="1">
            <swiper-item v-for="(item,index) in SwiperList" :key="index" :display-multiple-items="index">
              <image :src="item.image" mode="widthFix"></image>
            </swiper-item>
          </swiper>
          <view class="TBMswiperNum fsf24">{{currentNum+1}}/{{SwiperList.length}}</view>
        </view>

        <view class="detailCon">
          <text>在不少女孩心中，蒂芙尼就是浪漫订婚钻戒的代名词，而“蒂芙尼蓝”也成为了一种标志性的成为了一种标志性的</text>
        </view>
        <!-- 轮播底部段落 -->
        <view class="TBbottom">
          <!-- 	<view v-if="hideText" class="TBtitle fs3a28">{{sliceCountText}} ...
                  <text class="countTextNum fs3a28" @tap="openTextTitle">展开</text>
              </view>
              <view v-if="OpenText" class="TBtitle fs3a28">{{countTextNum}}
                  <view class="countTextNum2 fs3a28" @tap="hideTextTitle">收起</view>
              </view> -->
          <view class="TBCenter fs9a24 fx-row fx-row-center fx-row-space-between">
            <view class="TBCtime">1分钟前</view>
            <view class="TBCinfor fx-row fx-row-center fx-col-space-around">
              <view class="Czan">
                <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'" mode=""></image>
                <text>200</text>
              </view>
              <view class="Cmessage">
                <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'" mode=""></image>
                <text>367</text>
              </view>
              <view class="Csend">
                <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/share.png'" mode=""></image>
                <text>5445</text>
              </view>
            </view>
          </view>
          <view class="TBcomment">
            <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/yaoqing.png'"></image>
            <input class="fs3a28" type="text" placeholder="添加评价">
          </view>
        </view>
        <!-- 轮播底部段落结束 -->
      </view>


    </view>

   

    <!--消息通知按钮  -->
    <view class="notice" @click="messageTo">
      <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'" mode="widthFix" class="noticeImg"></image>
      <view class="number">1</view>
    </view>
   

  </view>
</template>

<script>

  const DEFAULT_CARD_ID = 1;

  import store from "@/js/store.js";
  import defaultpage from '@/components/defaultPage.vue';
  import {mapState,mapMutations} from 'vuex';
	import{isLog} from '../../js/mzl.js'
  export default{

    name: 'homeCommon',

    data(){
      return{
        userDetails: [],//名片信息详情
        collectState: 0,
        praiseState: 0,
        viewNum: 0,
        showMenu:'',
        shopId: '',
        cardShopData:{},//店铺信息
        cardShopGoodsList:[],//店铺商品列表
        userId: '', //缓存中的用户ID
       
        isShowCreate:false,//是否显示注册按钮
        isCall:false,//是否拨打电话
        //缺省页
        messageToPage3: {
          image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
          title: '点击开通，您的专属店铺~'
        },
        messageToPage4: {
          image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
          title: '您还没有上传商品哦，赶紧去上传吧~'
        },
				 messageToPage5: {
				  image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
				  title: '您还没有上传视频哦，赶紧去上传吧~'
				},
        //商品日志切换
        auditTitleBox: {
          auditTitle: [{
            id: 0,
            title: '商品'
          }, {
            id: 1,
            title: '日志'
          }],
        },
        audiTitleActive: 0,
        // 视频
        VideoList: {
          VideoTitle: [{
            id: 0,
            title: '个人视频'
          }, {
            id: 1,
            title: '企业视频'
          }],
          VTitleActive: 0,
        },
				//用户视频
        videoResult: {},
        // 轮播图-日志
        SwiperList:[
          {id:0,image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'},
          {id:1,image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'},
          {id:2,image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'},
          {id:3,image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'},
          {id:4,image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'},
          {id:5,image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'}
        ],
        indicatorDots:true,
        autoplay:true,
        interval:5000,
        duration:1000,
        currentNum:0,
        showPhone: '',
      }
    },

    props: {
      home: Boolean,  // 是否首页
    },

    computed: {
      ...mapState(['UPinfo','userType']),
      
      isHidePhone () {
        return !!Number(this.userDetails.hidePhoneNum);
      }
    },


    methods:{
      onLoad (option) {
				
      },
      onShow() {
        this.init()
      },
      // 初始化
      init () {
// 				  uni.setStorageSync('shopId',17);
// 				  uni.setStorageSync('userId',33);
        this.userId = uni.getStorageSync('userId');
        if (!this.userId) {
         // 查看王总名片
				 this.otherPeople()
				 return false;
        }
				
        uni.showLoading({ title: '加载中' });
        this.$api.getUserCardDetails(this.userId).then(result => {
				
          this.userDetails = result.userMap;
          this.viewNum = result.viewNum;
          this.collectState = result.collectState;
          this.praiseState = result.praiseState;
          this.shopId = this.userDetails.shopId;
					if(this.shopId){
						this.listCardShop()
					}
					uni.setStorageSync('shopId',this.shopId)
          uni.hideLoading()
          this.showPhone = this.isHidePhone 
              ? this.hidePhone(this.userDetails.phone)
              : this.userDetails.phone;

							uni.setNavigationBarTitle({ title: '我的名片' });
							this.$store.commit('updateCurrentUser', this.userDetails);
							this.setUserType(this.userDetails.userType)
							console.info(this.userDetails)
							this.getUserCardShowVideo();
        }).catch(error => {
          this.showError(error);
          uni.hideLoading()
        })
      },
			//跳转别人的名片
			otherPeople(){
				uni.reLaunch({
					url: '/pages/businessCard2/businessCard2'
				});
			},
      // 获取用户视频
      getUserCardShowVideo() {
        this.$api.getUserCardShowVideo(this.userId, this.shopId).then(result => {
					console.info(result)
          this.videoResult = result;
        }).catch(error => {
          console.log(error)
        })
      },

     

      //开通VIP
      businessCard_VIP(){
				// if(!isLog()){
				// 	return false
				// }
				// if(this.userType==1){
				// 	uni.navigateTo({
				// 	  url: '../../item_businessCard/businessCard_VIP/businessCard_VIP?urlType=card'
				// 	});
				// }else{
				// 	//填写店铺资料
				// 	uni.navigateTo({
				// 		url:'/item_businessCard/businessCard_ShopInfo/step1/step1'
				// 	})
				// }
        
      },

      listCardShop() {
        this.$api.listCardShop(this.userId).then(result => {
           console.log(result)
          //店铺信息
          this.cardShopData = result.cardShopData;
          //商品列表
          this.cardShopGoodsList = result.cardShopGoodsList;
        }).catch(error => {
          console.log(error)
        })
      },



      changeVideoTitle(index) {// 切换视频标题
        // if(!this.isShowCreate){return false}
        this.VideoList.VTitleActive = index;
      },
      changeTitle(e, index) {//切换标题(日志，商品)
        // if(!this.isShowCreate){return false}
        this.audiTitleActive = index;
      },
     
      toWheel() { //财富轮盘
				if(!isLog()){
					return false
				}
        uni.navigateTo({
          url: '../../item_businessCard/businessCard_Wheel/businessCard_Wheel?userId='+this.userId
        });
      },
      myCustomer() { //我的客户页面
				if(!isLog()){
					return false
				}
        uni.navigateTo({
          url: '../../item_businessCard/businessCard_MyCustomer/businessCard_MyCustomer?userId='+this.userId
        });
      },
      toThematic() { //专题数据
				if(!isLog()){
					return false
				}
        uni.navigateTo({
          url: '../../item_businessCard/businessCard_DataTopic/businessCard_DataTopic?userId='+this.userId
        });
      },
      tosearchCard() { //搜索名片
				if(!isLog()){
					return false
				}
        uni.navigateTo({
          url: '../../item_businessCard/businessCard_SearchCard/businessCard_SearchCard?userId='+this.userId
        });
      },
      goodsDetail() { //商品详情
				 if(!isLog()){
					return false
				 }
        uni.navigateTo({
          url: '../../shop/goodsDetail/goodsDetail'
        });
      },
      messageTo() { //查看消息
        uni.navigateTo({
          url: '../../module/message/home/home'
        });
      },
      editCard(){//编辑自己的资料
        uni.navigateTo({
          url: '../../item_businessCard/businessCard_EditCard/businessCard_EditCard?userId='+this.userId
        })
      },
      toShop(){
				if(!isLog()){
					return false
				}
				if(this.userType>1&&this.userType<5){
					  // 我的店铺
					this.navigateTo('../../item_businessCard/businessCard_MyShop/businessCard_MyShop',{shopId:this.shopId,userId:this.userId})
				}else{
					this.showTips('等级不够..')
				}
					
      },
      changeSwiperNum(event) {// 轮播图图片数量
        // console.log(event.detail.current);
        this.currentNum = event.detail.current;
      },
      videoErrorCallback(){//视频错误信息
        // console.log('视频错误信息:' + e.target.errMsg)
      },
     
      //Vuex引入方法
      ...mapMutations(['setCardUserId','setUPinfo','setUserType']),
			
			/**
			 * 页面分享
			 */
			onShareAppMessage (res) {
			  return {
			    title:this.userDetails.name,
			    path: '/pages/businessCard2/businessCard2?cardUserId='+this.userId+'&shareId='+this.userId,
			    imageUrl:this.userDetails.headImage,
			    success(p) {}
			  }
			},
    },


    components: {
      defaultpage
    },
  }

</script>

<style lang="less">


  @import "../../css/mzl_base.less";
  @import "../../css/jss_base.less";
  .container {
    font-family: PingFangSC;
    background: #F5F5F5;
    padding-bottom: 100upx;
  }

  .Box {
    width: 100%;
    height: auto;
    background: rgba(0, 0, 0, .8);
    border: 1upx solid red;
  }
  //顶部个人信息
  .perInfoCon {
    .bgCon {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding: 0 30upx;
      height: 390upx;
      background: -webkit-linear-gradient(90deg, #8D8DF1, #5670FF);
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      image {
        width: 26upx;
        height: 25upx;
        margin-right: 18upx;
      }

      .br_l {
        margin-top: 40upx;
        font-size: 24upx;
        color: #FFFFFF;
      }

      .bg_r {
        margin-top: 40upx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 24upx;
        color: #FFFFFF;

        .shouCang {
          margin-left: 40upx;
        }
      }
    }

    .infoDe {
      position: absolute;
      z-index: 10;
      left: 30upx;
      top: 103upx;
      width: 92%;
      background: #FFFFFF;
      height: 379upx;
      box-sizing: border-box;
      padding: 0 30upx 0 40upx;
      border-radius: 10upx;
      box-shadow: 0 1px 20px 0 rgba(91, 119, 240, 0.23);

      .ava {
        image {
          width: 120upx;
          height: 120upx;
          margin-top: 56upx;
          margin-right: 24upx;
        }

        .nameInfoCon {
          margin-top: 56upx;
          margin-bottom: 30upx;

          .nameInfo {
            line-height: 60upx;
            align-items: center;

            .name {
              font-size: 36upx;
              color: #333333;
            }

            .posi {
              margin-left: 22upx;
              height: 36upx;
              padding: 0 15upx;
              line-height: 36upx;
              border-radius: 23upx;
              background: #F1F1F1;
              font-size: 20upx;
              color: #666666;
              text-align: center;
            }
          }
        }

        .company {
          margin-top: 17upx;
          font-size: 24upx;
          color: #999999;
          font-family: PingFangSC;
        }
      }

      .per_de {
        .wenzi {
          font-size: 24upx;
          color: #333333;
          font-family: PingFangSC;
          margin-left: 28upx;
        }

        image {
          width: 32upx;
          height: 32upx;
        }

        .ma {
          margin-bottom: 12upx;
        }

        .detail {

          // 超出部分显示...
          .edit {
            flex: 1;
          }

          .wenzi {
            flex: 18;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .data {
        position: absolute;
        right: 0;
        top: 30upx;
        width: 134upx;
        height: 54upx;
        line-height: 54upx;
        background: #F4F5FF;
        color: #6D7CF8;
        font-size: 24upx;
        text-align: center;
        border-radius: 27upx 0 0 27upx;
      }
    }
  }
  //导航栏
  .subNav {
    padding-top: 144upx;
    background: #FFFFFF;

    .nav-item {
      width: 25%;
    }

    &[disabled] {
      filter: grayscale(100%);
    }

    image {
      width: 90upx;
      height: 90upx;
    }

    .cuCon {
      width: 90upx;
      height: 90upx;
      background: #F8F8FF;
      text-align: center;
      border-radius: 50%;

      .cuNum {
        font-size: 34upx;
        color: #6B7AF8;
        line-height: 90upx;
        font-family: Arial-BoldMT;
        font-weight: bold;
      }
    }

    .nav_ti {
      margin-top: 20upx;
      margin-bottom: 50upx;
      font-size: 28upx;
      color: #666666;
      font-family: PingFangSC;
    }
  }
  //个人视频
  .VideoList {
    padding: 30upx;

    .VLtitle {
      .Tname {
        padding: 30upx 0;
        width: 30%;
        font-size: 36upx;
        font-weight: 600;
        color: #AAAAAA;
      }

      .titleActive {
        color: #333333;
      }
    }

    .Vlvideo {
      margin-top: 15upx;
      .VLVitem {
        height: 388upx;
        video {
          width: 100%;
          height: 388upx;
        }
      }
    }
  }
  // 日志
  .dayCon {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30upx;

    .logCon {
      background: #FFFFFF;
      margin-bottom: 30upx;
    }

    .dayCon_title {
      margin-bottom: 32upx;
      font-size: 36upx;
      color: #333333;
      font-family: PingFangSC;
      font-weight: 600;
      color: #AAAAAA;

      .title {
        margin-right: 68upx;
        padding: 15upx;
      }

      .ATactive {
        color: #333333;
      }

      .goods {
        margin-left: 68upx;
      }
    }

    // 轮播图片
    .TBmiddle {
      position: relative;
      width: 100%;

      swiper {
        width: 100%;
        height: 750upx;

        image {
          width: 100%;
          border-top-left-radius: 8upx;
          border-top-right-radius: 8upx;
        }
      }

      .TBMswiperNum {
        width: 80upx;
        height: 42upx;
        background: rgba(0, 0, 0, .4);
        position: absolute;
        top: 20upx;
        right: 30upx;
        border-radius: 21upx;
        text-align: center;
        line-height: 42upx;
        color: #FFFFFF;
        font-size: 24upx;
      }

    }

    //轮播底部文字
    .TBbottom {
      padding: 25upx;

      .TBtitle {
        margin: 10upx 0 20upx 0;
        position: relative;
        font-size: 30upx;

        .countTextNum {
          width: 100%;
          position: relative;
          right: 0;
          font-weight: bold;
        }

        .countTextNum2 {
          width: 100%;
          position: relative;
          right: 20upx;
          text-align: right;
          font-weight: bold;
          margin: 10upx 0;
        }
      }

      .TBCenter {
        margin-bottom: 40upx;
        font-size: 24upx;
        color: #999999;

        image {
          width: 28upx;
          height: 24upx;
          vertical-align: middle;
          margin-right: 10upx;
        }

        .TBCtime {
          width: 40%;
        }

        .TBCinfor {
          width: 60%;
          text-align: right;

          .Czan,
          .Cmessage,
          .Csend {
            width: 33.33%;
          }
        }
      }

      .TBcomment {
        image {
          width: 50upx;
          height: 50upx;
          vertical-align: top;
          margin-right: 20upx;
        }

        input {
          width: 80%;
          display: inline-block;
        }
      }
    }

    .detailCon {
      width: 90%;
      margin: 0 auto;
      margin-bottom: 28upx;
      font-size: 28upx;
      color: #333333;

    }

    .operationCon {
      width: 90%;
      margin: 0 auto;

      .time {
        width: 45%;
        color: #999999;
        font-size: 24upx;
      }

      .opCon_r {
        display: flex;
        flex-direction: row;
        justify-content: center;

        image {
          width: 28upx;
          height: 24upx;
        }

        font-size:24upx;
        color:#999999;
        line-height: 48upx;
        //超出两行显示...
        width:100%;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;

        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
    }

  }
  //商品
  .shopContainer {
    margin-bottom: 130upx;
    .bannerCon {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 0 auto;
      height: 170upx;
      padding: 0 30upx;
      background: #FFFFFF;
      margin-bottom: 30upx;

      &>image {
        width: 110upx;
        height: 110upx;
        margin-right: 20upx;
      }

      .shopName {
        width: 60%;
        font-family: PingFangSC;

        .name {
          margin-bottom: 18upx;
          font-size: 30upx;
          color: #333333;
        }

        .goodsNum {
          font-size: 24upx;
          color: #666666;
        }
      }

      .shopButton {
        width: 130upx;
        height: 64upx;
        line-height: 64upx;
        text-align: center;
        background: #F8F9FF;
        color: #6B7AF8;
        border-radius: 32upx;
        font-size: 28upx;
      }
    }

    //商品列表
    .goodsListCon {
      width: 100%;
      @ff: PingFangSC;

      .goodsCon {
        width: 334upx;

        .imgCon {
          position: relative;
          font-size: 0;

          &>image {
            width: 334upx;
            height: 334upx;
          }

          .score {
            position: absolute;
            right: 14upx;
            bottom: -20upx;
            width: 100upx;
            height: 40upx;
            line-height: 40upx;
            background: #DDAB5C;
            font-size: 20upx;
            color: #FFFFFF;
            border-radius: 4upx;
            text-align: center;
          }
        }

        .textDetail {
          padding: 35upx 20upx 0 20upx;
          background: #FFFFFF;
          font-family: @ff;

          .goodsName {
            margin-bottom: 21upx;
            font-size: 28upx;
            color: #333333;
          }

          .goodsDe {
            margin-bottom: 33upx;

            .price {
              color: #FF5858;
              font-size: 20upx;
              font-family: Arial;
            }

            .saleNum {
              font-size: 24upx;
              color: #999999;
              margin-bottom: 33upx;
            }
          }
        }

      }
    }

  }
  // 创建按钮
  .createCon {
    position: fixed;
    bottom: 0;
    z-index: 999999;
    width: 100%;
    height: 98upx;
    text-align: center;
    background: #FFFFFF;

    .creButton {
      width: 620upx;
      height: 80upx;
      line-height: 80upx;
      margin: 10upx auto;
      font-size: 28upx;
      color: #FFFFFF;
      background: #6B7AF8;
      border-radius: 44upx;
      border: none;
    }
  }
  //消息提醒按钮
  .notice {
    position: fixed;
    right: 30upx;
    bottom: 60upx;
    z-index: 99;

    .noticeImg {
      width: 100upx;
      height: 100upx;
      border-radius: 50%;
    }

    .number {
      font-size: 24upx;
      position: absolute;
      width: 34upx;
      height: 34upx;
      line-height: 34upx;
      text-align: center;
      background: #FF5858;
      color: #FFFFFF;
      border-radius: 50%;
      top: 0;
      right: 0;
    }
  }
  //是否拨打电话
  .callModel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    background: rgba(0, 0, 0, 0.5);

    .cmCon {
      width: 630upx;
      background: #FFFFFF;
      position: absolute;
      top: 50%;
      margin-top: -130upx;
      left: 50%;
      margin-left: -315upx;
      border-radius: 8upx;

      .callNum {
        margin: 29upx 0 21upx 0;
        font-size: 36upx;
        color: #333333;
      }

      .isCall {
        margin-bottom: 30upx;
        font-size: 28upx;
        color: #666666;
      }

      .confim {
        border-top: 1px solid #E1E1E1;
        width: 100%;
        height: 87upx;
        line-height: 87upx;
        text-align: center;

        .conNo {
          width: 50%;
          font-size: 28upx;
          color: #666666;
        }

        .conYes {
          width: 50%;
          font-size: 28upx;
          color: #6B7AF8;
        }

        .line {
          background: #D8D8D8;
          height: 88upx;
          width: 1px;
        }
      }
    }

  }

</style>