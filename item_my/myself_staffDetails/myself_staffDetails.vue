<template>
  <view class="container">
      <view class="staffDetails">
        <!-- 头部分享信息 -->
        <view class="sdHeader fsf24 fx-row fx-row-center fx-row-space-around">
          <view class="hSeeNum">{{viewNum}}人看过Ta</view>
          <view class="hLikes" @click="praiseStateTotal()">
            <image class="HLimage" :src="praiseState==0?'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/like_2un.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/like_2.png'" alt=""></image>
            <text class="HLnum">{{praiseNum}}</text>
          </view>
          <view class="hShare" @click="share">
            <image class="HLimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/34_share.png'" alt=""></image>
				<!-- #ifdef APP-PLUS -->
				<text>分享</text>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="shareBtn" open-type="share">分享</button>
				<!-- #endif -->
          </view>
        </view>
        <!-- 名片信息 -->
        <view class="staffCard">
            <view class="SCheader fx-row fx-row-center fx-row-space-around">
              <view class="Himage">
				<default-image :src="userInfo.headImage" custom-class="HIMG"></default-image>
              </view>
              <view class="HtitleInfor">
                <view class="HIname">
                  {{userInfo.name}} <view class="Hposition">{{userInfo.job}}</view>
                </view>
                <view class="Hcompany fs9a24">{{userInfo.company}} </view>
              </view>
				<view class="HsetPosit" v-if="userInfo.userType!=5">
					<view class="Pname" @click="setGroupManager">设为销售总监</view>
				</view>
            </view>
            <view class="SFdetails">
              <view class="SFPhone">
                <image class="PIMG" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/phone.png'" alt=""></image>
                {{userInfo.phone}}
              </view>
              <view class="SFemial">
                <image class="PIMG" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/email.png'" alt=""></image>
                {{userInfo.email?userInfo.email:'暂无'}}
              </view>
              <view class="SFadress">
                <image class="PIMG" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/qianming.png'" alt=""></image>
                {{userInfo.autograph?userInfo.autograph:'暂无'}}
              </view>
            </view>
        </view>
      </view>
	  <!-- 加入时间 -->
	  <view class="StaffTime">
		  <view class="STtime fs6a28">加入时间：{{joinTime}}</view>
		  <view class="STopenTime fs6a28">上次打开：{{lastLoginTime}}</view>
		  <view class="STposition fs6a28">职务：{{userInfo.job}}</view>
		  <view class="STnewStaff fs6a28">新客户数：{{customerCount}}人</view>
		  <view class="STsalesTotal fs6a28">销售总额：¥{{salesAmount}}.00元</view>
		  <view class="STgroup fx-row fx-row-center fx-row-space-around" v-if="groupName">
			  <view class="stgName fs6a28">所在小组：{{groupName}}</view>
			  <view class="stgImage">
					<default-image :src="groupLogo" custom-class="HIMG"></default-image>
			  </view>
		  </view>
	  </view>
	  <!-- 按钮 -->
	  <view class="StaffButton fx-row fx-row-center fx-row-space-around">
	  	<view class="delRelation" @click="unbind">解除员工关系</view>
	  	<view class="CheackCard" @click="gotoShop">查看员工名片</view>
	  </view>
    <view class="CheackCard2" @click="chat">发消息</view>

  </view>
</template>

<script>
	import mzlJS from '../../js/mzl.js'
  export default {
    data () {
      return {
		onlineSite:this.global.onlineSite,
		shopId:'',
		userId:'',//上个页面带过来的id
		userInfo:'',//用户信息
		collectState:'',//收藏状态
		praiseState:'',//点赞状态
		praiseNum:'',//点赞数量
		viewNum:'',//名片浏览量
		groupLogo:'',//小组logo
		groupName:'',//小组名称
		joinTime:'',//加入时间
		customerCount:'',//新客户数量
		salesAmount:'',//销售金额
		lastLoginTime:'',//上次登录时间
      }
    },
    methods:{
			// 获取员工详情
			getUser(){
				let userId=this.userId;
				console.log(userId);
				this.$api.getUserInfor(userId,userId).then(res=>{
					console.log(res);
					console.log('输出用户信息：'+res.userMap.phone);
					this.userInfo=res.userMap;//用户信息
					this.collectState=res.collectState;//收藏状态
					this.praiseState=res.praiseState;//点赞状态
					this.praiseNum=res.userMap.praiseNum;//点赞数量
					this.viewNum=res.viewNum;//名片浏览量
					this.lastLoginTime=mzlJS.formatTime(res.userMap.lastLoginTime);//上次登录时间
				}).catch(error=>{
						this.showError(error);
				})
			},
			// 设置为销售总监
			setGroupManager(){
				// 获取销售总监数量
				this.$api.getShopManagerNum(this.shopId).then(res=>{
					console.log('总监数量：');
					console.info(res);
					if(res.managerNum<=100){
						this.$api.setGroupManager(this.userId).then(res=>{
							// console.log(res);
							this.showTips('设置销售总监成功').then(res=>{
								this.getUser();
							})
						}).catch(error=>{
							this.showError(error);
						})
					}else{
						this.showTips('您的销售总监数量已经满100人,继续添加请先联系客服').then(res=>{})
					}
				}).catch(error=>{
					this.showError(error);
				})

			},
			// 解除合约（上级对下级）
			unbind(){
				this.$api.unbind(this.userId).then(res=>{
					console.log(res);
					this.showTips('解除成功').then(res=>{
						uni.navigateTo({
							url: '../myself_staffManage/myself_staffManage'
						});
					})
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 查看员工名片
			gotoShop(){
				uni.navigateTo({
					url: '/pages/businessCard2/businessCard2?cardUserId='+this.userId
				});
			},
			// 点赞
			praiseStateTotal(){
				this.$api.praise(this.userId,3).then(res=>{
					console.log(res);
					if(this.praiseState==0){
						this.praiseState=1;
						this.praiseNum++;
					}else{
						this.praiseState=0;
						this.praiseNum--;
					}
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 员工列表排序（vip）
			sortAllEmployeeList(){
				let shopId=uni.getStorageSync('shopId');
				let sortType='';
				let sortKey="";
				this.$api.sortAllEmployeeList(shopId,sortType,sortKey).then(res=>{
					console.log(res);
				}).catch(error=>{
					this.showError(error);
				})
			},

      chat () {
        this.navigateTo('/module/message/chat/chat', { selToID: this.userId, channel: 'card' })
      },
    },
		// 分享当前页面
		onShareAppMessage (res) {
			 return {
				title:'员工详情',
				path:'',
				imageUrl:'',
				success(p) {}
			 }
		},
		onLoad(options) {
			this.userId=options.userId;
			this.groupLogo=options.groupLogo;
			this.groupName=options.groupName;
			this.shopId=uni.getStorageSync('shopId');
			this.joinTime=mzlJS.formatTime(Number(options.joinTime));
			this.customerCount=options.customerCount;
			console.log('jinqian:'+options.salesAmount);
			this.salesAmount=options.salesAmount;
			// console.log(mzlJS.formatTime(options.joinTime));
			this.getUser();
		}

  }

</script>

<style lang="less">

	  @import '../../css/mzl_base.less';
	page{
		background:@grayBg;width:100%;height:100%;
	}
  .container{
    .staffDetails{
      // 头部分享信息
      width:100%;height:400upx;padding:30upx;background:linear-gradient(360deg,rgba(141,141,241,1) 0%,rgba(86,112,255,1) 100%);
      .sdHeader{
        .hSeeNum{width:70%;}
        .HLimage{width:28upx;height: 28upx;vertical-align: middle;margin-right: 20upx;}
        .hLikes{width:15%;}
        .hShare{
			width:15%;
				// .shareBtn{width:100%;height:100%;position:absolute;left:0;top:0;opacity:0;z-index:9}
			.shareBtn{border:none;display:inline-block;background:none !important;padding:0;line-height:33upx;color:#fff !important;font-size:24upx;overflow:visible;}
			button::after { border: 0;}
		}
      }
      // 名片信息
      .staffCard{
				height:379upx;position:relative;
        margin-top:50upx;background:rgba(255,255,255,1);box-shadow:0upx 2upx 12upx 2upx rgba(101,120,251,0.2);border-radius:10upx;
				.SCheader{
          padding:50upx 30upx 30upx 20upx;
          .Himage{
            width:20%;
            .HIMG{width:120upx;height: 120upx;vertical-align: middle;text-align: left;}
          }
          .HtitleInfor{
            width:70%;
            .HIname{
              height:70upx;
              .Hposition{
				  height:36upx;line-height: 36upx;background:#F1F1F1;vertical-align: middle;margin-left:20upx;
				  border-radius:18upx;padding:5upx 10upx;display: inline-block;font-size:20upx;color:#999;
				}
            }
          }
		  .HsetPosit{
			  position: absolute;top:18upx;right:18upx;
			  .Pname{height:48upx;background:rgba(248,248,255,1);padding:0 10upx;border-radius:4px;border:1px solid;color:#6B7AF8;line-height: 48upx;font-size: 24upx;}
		  }
        }
        .SFdetails{
          padding:10upx 30upx 30upx 30upx;
          .PIMG{width:32upx;height:32upx;vertical-align:middle;margin-right: 10upx;}
          .SFPhone,.SFemial,.SFadress{font-size:24upx;color:#333;margin-bottom: 10upx;width:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
        }
      }
	}
	//  加入时间
	.StaffTime{
		margin:120upx 0;line-height:50upx;padding:30upx;background:@grayBg;
    flex-wrap: wrap;
		.STgroup{
			margin-top:20upx;
			.stgName{width:80%;text-align: left;}
			.stgImage{
				width:20%;text-align: right;
				image{width:60upx;height: 60upx;vertical-align: middle;}
			}
		}
	}
	 // 按钮
	.StaffButton{
		color:#fff;width:100%;position: fixed;background:@grayBg;padding-bottom:100upx;
	   .delRelation{
		.buttonRadius(@w:320upx;@h:80upx;@bg:#aaa); font-size:28upx;
		}
	   .CheackCard{
			.buttonRadius(@w:320upx;@h:80upx);font-size:28upx;
		}
    .CheackCard2 {
      .buttonRadius(@w:320upx;@h:80upx);font-size:28upx;
      width: 100%;
      margin-top: 16upx;
    }
	}
  }
</style>
