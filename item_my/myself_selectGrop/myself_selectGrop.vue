<template>
  <view class="container">
    <view class="Content">
      <!-- 店铺列表 -->
      <view class="storeListBox">
        <view class="SBlist fx-row fx-row-center fx-row-space-around">
          <view class="Limage">
				<default-image :src="shopInfo.logo" custom-class="Image"></default-image>
          </view>
          <view class="LTitle LTitle1" @click="gotoShop">
            <view class="LtitleName fs3a32">{{shopInfo.shopName}}</view>
            <view class="LtitleSubName fs6a24">已有员工{{shopInfo.employeeNum}}名  |  提成{{shopInfo.gainTotal}}%  </view>
          </view>
		  <view class="applyBox" @click="applyForStaff()">
		    <view class="Bapply fs6a28">申请</view>
		  </view>
        </view>
      </view>
       <!-- 搜索 -->
      <view class="Search fx-row fx-row-center fx-row-space-around">
          <view class="Simage" @click="searchShopGroup">
            <image class="Image" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
          </view>
          <view class="Sinput fs6a28">
            <input type="text" placeholder="搜索小组" v-model="value" @blur="blurEvent($event)" maxlength="100"></input>
          </view>
      </view>
	<view class="SaleGrap fs3a28">销售小组</view>
	  <!-- 小组列表 -->
    <view class="storeListBox">
        <view v-for="(group,groupIndex) in shopGroupList" :key="groupIndex" class="SBlist fx-row fx-row-center fx-row-space-around" v-if="showGroup">
          <view class="Limage">
				<default-image :src="group.logo" custom-class="Image"></default-image>
          </view>
          <view class="LTitle" @click="gotoShop">
            <view class="LtitleName fs3a32">{{group.groupName}}</view>
            <view class="LtitleSubName fs6a24">已有员工{{group.memberNum}}名</view>
          </view>
          <view class="applyBox" @click="applyForGrop(group.groupId)">
            <view class="Bapply fs6a28">申请</view>
          </view>
        </view>
		<view v-if="shopGroupListNull" class="fs3a28 fx-row fx-row-center fx-row-space-around">暂无销售小组</view>
		<!-- 搜索的小组列表 -->
		<view class="SBlist fx-row fx-row-center fx-row-space-around"  v-if="showSearchGroup">
			<view class="Limage">
				<default-image :src="groupItem.logo" custom-class="Image"></default-image>
			</view>
			<view class="LTitle" @click="gotoShop">
				<view class="LtitleName fs3a32">{{groupItem.groupName}}</view>
				<view class="LtitleSubName fs6a24">{{groupItem.memberNum}}</view>
			</view>
			<view class="applyBox" @click="applyForGrop(groupItem.groupId)">
				<view class="Bapply fs6a28">申请</view>
			</view>
		</view>
		<!-- 缺省页 -->
		<view class="default" v-if="showNotDate">
			<default-page :messageToPage="messageToPage"></default-page>
		</view>
    </view>
		</view>
		<!-- 弹出层 -->
		<view class="container3" v-show="showpopup">
			<view class="popup fs3a28">
				<!-- 申请加入小组-->
				<view class="DeleteLog">
					<view class="DLlist">
						<view class="DLtitle">申请成功，店铺管理员将会尽快处理您的申请</view>
						<view class="DLbutton fx-row fx-row-center fx-row-space-around">
							<view class="DLagree" @tap="DeleteLogAgree">确定</view>
						</view>
					</view>
				</view>
			</view>
		</view>
  </view>
</template>

<script>

  export default {
    data () {
      return {
		onlineSite:this.global.onlineSite,
		groupItem:[],
		showpopup:false,
		showSearchGroup:false,//显示搜索的结果
		showGroup:false,//显示销售小组
		showNotDate:false,//缺省页
		shopInfo:[],
		value:'',
		shopId:'',//上个页面带过来的shopId
		shopGroupList:[],
		messageToPage:{
			image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/sousuo.png',
			title:'没搜到相关内容呢，换个关键字试试～'
		},
		shopGroupListNull:false,
      }
    },
		methods:{
			// 申请成为vip3的员工
			applyForStaff(){
				this.$api.insertEmployApplication3(this.shopId,0).then(res=>{
				// console.log(res);
					if(res==null){
						this.showpopup=true;
					}else{
						this.showTips(res.ERROR).then(res=>{})
					}
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 获取销售小组
			listShopGroup(){
				this.$api.listShopGroup(this.shopId,1).then(res=>{
					console.log(res);
					if(res.shopGroupList.length==0){
						this.shopGroupListNull=true;
						return;
					}
					this.shopGroupList=res.shopGroupList;
				})
			},
			// 获取店铺资料
			getShopDetail(){
				// 获取店铺资料的userId可以随意，shopId对上就可以
				this.$api.getShopDetail(this.shopId,1).then(res=>{
					console.log(res);
					this.shopInfo=res.shopData;
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 申请加入小组
			applyForGrop(groupId){
				this.$api.insertEmployApplication3(this.shopId,groupId).then(res=>{
					// console.log(res);
					if(res==null){
						this.showpopup=true;
					}else{
						this.showTips(res.ERROR).then(res=>{})
					}
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 申请成功
			DeleteLogAgree(){
				this.showpopup=false;
			},
			// 搜索小组
			searchShopGroup(){
				if(this.value){
					this.$api.searchShopGroup(this.shopId,this.value,1).then(res=>{
						// console.log(res);
						if(res.groupList){
							this.showSearchGroup=true;//显示搜索的结果
							this.showGroup=false;//显示销售小组
							this.showNotDate=false;//缺省页
							this.groupItem=res.groupList;
						}else{
							this.showSearchGroup=false;//显示搜索的结果
							this.showGroup=false;//显示销售小组
							this.showNotDate=true;//缺省页
						}
					}).catch(error=>{
						this.showError(error);
					})
				}else{
					this.showTips('请输入搜索的小组').then(res=>{})
				}
			},
			// 失去焦点
			blurEvent(e){
				this.showSearchGroup=false;//显示搜索的结果
				this.showGroup=true;//显示销售小组
				this.showNotDate=false;//缺省页
			},
			// 跳转至店铺
			gotoShop(){
				uni.navigateTo({
					url: '../../module/shop/home/home?shopId='+this.shopId
				});
			},
		},
		onLoad(options) {
			this.shopId=options.shopId;
			console.log('shopId:'+this.shopId);
			this.showSearchGroup=false;//显示搜索的结果
			this.showGroup=true;//显示销售小组
			this.showNotDate=false;//缺省页
			this.getShopDetail();
			this.listShopGroup();
		}

  }

</script>

<style lang="less">
  @import '../../css/mzl_base.less';

  .container{
    background: @grayBg;width:100%;height:100%;border-top:1upx solid #eee;
    .Content{padding:30upx;margin-bottom:60upx;}
    // 搜索
    .Search{
      background: #fff;padding:20upx;height: 72upx;box-sizing:border-box;
      .Simage{
        width:10%;
        .Image{width:32upx;height: 32upx;vertical-align: middle;margin-left:10upx;}
      }
      .Sinput{
        width:88%;
        input{width:100%;height:72upx;border:none;margin-top:10upx;}
      }
    }
		.SaleGrap{margin:50upx 0;font-size:32upx;font-weight: 600;}
			// 店铺列表
		.storeListBox{
			background:@grayBg;
			.SBlist{
				background:#fff;padding:30upx;margin-bottom:30upx;
				.Limage{
					width:22%;
					.Image{width:110upx;height:110upx;vertical-align: middle}
				}
				.LTitle{
					width:58%;
					.LtitleName{font-size:30upx;height:70upx;}
				}
				.applyBox{
					width:10%;
				}
				.LTitle1{width:60%;}
				.applyBox{
					width:20%;text-align: right;
					.buttonRadius(@w:130upx,@h:64upx,@bg:#F4F5FF);
					text-align:center;line-height: 64upx;border:1upx solid @tabActive;color:@tabActive;
				}
			}
		}
		.default{
			position: fixed;top:50%;left:50%;margin-left:-230upx;text-align: center;
		}
		// 弹出层
		.container3{	
			.popup{
				width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);text-align:center;z-index:99999999;
			// 删除日志
				.DeleteLog{
					.DLlist{
						width:560upx;height: 260upx;background: #fff;position: absolute;border-radius: 10upx;
						top:50%;left:50%;margin-left:-280upx;margin-top:-130upx;
						.DLtitle{
							font-size: 32upx;color:#333;text-align: center;font-weight: bold;height:170upx;padding:40upx;font-weight:200;line-height: 50upx;
						}
						.DLbutton{
							font-size: 28upx;border-top:1upx solid #E1E1E1;
							.DLagree{width:100%;height:87upx;line-height: 87upx;color:#6B7AF8;}
						}
					}
				}
			}
		}
	}
</style>