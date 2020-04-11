<template>
	<!-- v-if="disableClick" -->
	<view class="container">
		<!-- 头部名片信息 -->
		<view class="HeaderBox">

			<!-- <view class="HeaderInfor top" :style="{backgroundImage: 'url('+onlineSite+'https://xk.gzskxx.com/myqcloud/cardImages/my/bbb.png)',backgroundSize:'100%',backgroundRepeat:'no-repeat'}"> -->
			<view class="HeaderInfor top" style="background-image:url('https://xk.gzskxx.com/myqcloud/cardImages/my/bbb.png');background-size:100%;background-repeat:no-repeat">
				<view class="PersonalCenter">
					<!-- 'bg0':userInfor.cardBackgroundId==0,'bg1':userInfor.cardBackgroundId==1,'bg2':userInfor.cardBackgroundId==2,'bg3':userInfor.cardBackgroundId>2 -->
					<!-- 名片信息 -->
					<view class="PCinformation fx-row fx-row-center fx-col-space-around">
						<view class="PFimage">
							<image :src="userInfor.headImage" class="Pimage"></image>
						</view>
						<view class="PFtitleBox" @click="gotoCardDetil(userInfor.userType)">
							<view class="FBtitle fs3a32">{{userInfor.company}}</view>
							<view class="FBposition fs6a24">
								<text>{{userInfor.name}} |</text>
								<text>&nbsp;&nbsp;{{userInfor.job}}</text>
								<text :class="{'PActiveVip0':userInfor.userType==1,'PActiveVip1':userInfor.userType==2,
								'PActiveVip2':userInfor.userType==3,'PActiveVip3':userInfor.userType==4,
								'PActiveVip4':userInfor.userType==5||userInfor.userType==6,}">{{userType[userInfor.userType]}}</text>
							</view>
						</view>
						<view class="FBgoToNext">
							<image src="https://xk.gzskxx.com/myqcloud/cardImages/images/right.png"></image>
						</view>
					</view>
					<!-- 销售订单vip123  我的钱包：普通用户 -->
					<view class="PCsaleOrder fx-row fx-row-center fx-row-left">
						<!-- 提成：销售总监、销售经理 -->
						<!-- 销售订单，我的客户：vip123,销售总监、销售经理 -->
						<view v-if="userInfor.userType==5&&index==0||userInfor.userType==6&&index==0" class="SOorderNum" v-for="(item,index) in getCountRecord"
						 :key="index" @click="gotoMystaff(index)">
							<view class="OrderNum fs3a32">{{item.num}}</view>
							<view class="OrderTitle fs6a24">{{item.title}}</view>
							<view v-if="item.subtract > 0" class="OrderMessageNum" style="background-image:url('https://xk.gzskxx.com/myqcloud/cardImages/my/Numbg.png');background-size:100%;background-repeat:no-repeat">
								{{item.subtract}}
							</view>
						</view>
						<!-- 销售订单跟我的客户 -->
						<view v-if="userInfor.userType==2&&index>0||userInfor.userType==3&&index>0||userInfor.userType==4&&index>0||userInfor.userType==5&&index>0||userInfor.userType==6&&index>0"
						 class="SOorderNum" v-for="(item,index) in getCountRecord" :key="index" @click="gotoMystaff(index)">
							<view class="OrderNum fs3a32">{{item.num}}</view>
							<view class="OrderTitle fs6a24">{{item.title}}</view>
							<view v-if="item.subtract > 0" class="OrderMessageNum" style="background-image:url('https://xk.gzskxx.com/myqcloud/cardImages/my/Numbg.png');background-size:100%;background-repeat:no-repeat">
								{{item.subtract}}
							</view>
						</view>
						<!-- 我的钱包：普通用户 -->
						<view v-if="userInfor.userType==1" class="SOorderNum" v-for="(item,index) in defaultUser" :key="index" @click="gotoMystaff(index)">
							<view class="OrderNum fs3a32">{{item.num}}</view>

							<view class="OrderTitle fs6a24">{{item.title}}</view>

						</view>

						<view class="SOorderNum" @click="navigateTo('/pages/CardTemplate/CardTemplate')">
							<!-- <view class="SOorderNum" @click="navigateTo('./canvas')"> -->
							<view class="OrderNum fs3a32">18</view>
							<view class="OrderTitle fs6a24">名片模板</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 购物订单 -->
		<view class="ShoppingOrder">
			<view class="SOstate">
				<wx-view custom-class="nav-item">
					<view class="SOtitle fx-row fx-row-center fx-row-space-around">
						<view class="Sorder fs3a30">购物订单</view>
						<view class="SallOrder fs9a24" @tap="gotoShoppingOrder">
							查看全部
							<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/my/fanhui.png'"></image>
						</view>
					</view>
				</wx-view>
				
				<wx-view custom-class="nav-item">
					<view class="SOorderList fx-row fx-row-top fx-row-space-around">
					
							<view class="nav-item">
								<view class="OLlist" @tap="gotoShoppingOrderDetail(index)" v-for="(item,index) in shoppingOrder" :key="index">
									<image :src="item.image"></image>
									<view class="OLtitle fs6a24">{{item.title}}</view>
								</view>
							</view>
					</view>		
				</wx-view>
			</view>
		</view>
		<!-- 普通用户发票 -->
		<!-- <view class="walletBox" v-if="userInfor.userType==1">
			<view class="WBlist">
				<view @click="gotowallet(3)" class="WBLitem fx-row fx-row-center fx-row-space-around">
					<view class="WBLtitle">
						<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/my/fapiao.png'"></image>
						<text class="fs3a28">发票</text>
					</view>
					<view class="WBLnum fs6a24"></view>
					<view class="WBback">
						<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/images/right.png'"></image>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 钱包，优惠券，积分,发票管理 -->
		<view class="walletBox" >
			<view class="WBlist">
				<wx-view custom-class="nav-item">
					<view @click="gotowallet(index)" class="WBLitem fx-row fx-row-center fx-row-space-around" v-for="(item,index) in walletList"
					 :key="index">
						<view class="WBLtitle">
							<image :src="item.image"></image>
							<text class="fs3a28">{{item.title}}</text>
						</view>
						<view class="WBLnum fs6a24">{{item.num}}</view>
						<view class="WBback">
							<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/images/right.png'"></image>
						</view>
					</view>
				</wx-view>	
			
				
			</view>
		</view>
		<!-- 我的人气，员工管理，收藏，设置 -->
		<view class="walletBox">

			<!-- 员工管理 vip2(3): vip3(4) 销售总监（5）-->
			<view class="WBlist" v-if="userInfor.userType==3||userInfor.userType==4||userInfor.userType==5">
				<view class="WBLitem fx-row fx-row-center fx-row-space-around borderB" @click="gotoStaffManage">
					<view class="WBLtitle">
						<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/my/yuangong.png'"></image>
						<text class="fs3a28">员工管理</text>
					</view>
					<view class="WBLnum fs6a24">待审核（{{staffNum?staffNum:0}}个）</view>
					<view class="WBback">
						<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/images/right.png'"></image>
					</view>
				</view>
			</view>
			<!-- 申请成为员工 普通（1）-->
			<view class="WBlist" v-if="userInfor.userType==1">
				<wx-view>
					<view class="WBLitem fx-row fx-row-center fx-row-space-around" @click="gotoApplyStaff">
						<view class="WBLtitle">
							<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/my/yuangong.png'"></image>
							<text class="fs3a28">优质供应商展示</text>
						</view>
						<view class="WBLnum fs6a24">成为员工赚取销售分成</view>
						<view class="WBback">
							<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/images/right.png'"></image>
						</view>
					</view>
				</wx-view>
			</view>
			<!-- 共有的部分 -->
			<!-- <view class="WBlist">
				<wx-view>
				<view class="WBLitem fx-row fx-row-center fx-row-space-around" @click="gotoRegInfo" v-if="shopRegInfo.regMer==1">
					
					 <view class="WBLtitle">
					  <image src="http://card-1254165941.cos.ap-guangzhou.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.RItcMpWBweqkcbe72620ba6a99f52e380cca7b9beff7.png"></image>
					  <text class="fs3a28">入驻信息填写</text>
					 </view>
					 <view class="WBLnum fs6a24"></view>
					 <view class="WBback">
					  <image :src="'https://xk.gzskxx.com/myqcloud/cardImages/images/right.png'"></image>
					 </view>
					
				</view>
				</wx-view>
			</view> -->
				
				<view class="WBlist">
						<wx-view>
							<view class="WBLitem fx-row fx-row-center fx-row-space-around" v-for="(item,index) in myHuman" :key="index" @click="gotoDetail(index)">
								<view class="WBLtitle">
									<image :src="item.image"></image>
									<text class="fs3a28">{{item.title}}</text>
								</view>
								<view class="WBLnum fs6a24">{{item.num}}</view>
								<view class="WBback">
									<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/images/right.png'"></image>
							
								</view>
							</view>	
						</wx-view>
				
				
				</view>
			
				
				
		

		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				isNormalUser:true,
				aa: 'https://xk.gzskxx.com/myqcloud/cardImages/other/bgwhite.png',
				bb: 'https://xk.gzskxx.com/myqcloud/cardImages/card/bg.png',
				cc: 'https://xk.gzskxx.com/myqcloud/cardImages/card/bg2.png',
				onlineSite: this.global.onlineSite,
				auditCount: 0, //待审核员工数量
				balanceCustomerNum: 0, //计算后的未读用户数量
				cacheCustomerNum: 0, //缓存中的客户数量
				balanceOrderNum: 0, //计算后的未读销售订单数量
				cacheOrderNum: 0, //缓存中的销售订单数量
				balanceGainAmount: 0, //计算后的未读提成
				cacheGainAmount: 0, //缓存中的提成
				getIfHaveGroup: 0,
				disableClick: false, //游客时不显示页面信息
				userInfor: [], //用户信息
				phone: '', //13046286132  17800009988  13912345678
				// // vip1:白银  vip2：黄金  vip3:钻石  销售总监  销售经理
				userType: ['', '', '黄金会员', '铂金会员', '钻石会员', '销售总监', '销售经理'],
				userTypeNum: '', //用户等级
				userPhone: '', //传到设置里面
				// 销售订单
				getCountRecord: [{
						id: 0,
						title: '我的提成(元)',
						num: '0',
						subtract: '1'
					},
					{
						id: 1,
						title: '销售订单',
						num: '0',
						subtract: '1'
					},
					{
						id: 2,
						title: '我的客户',
						num: '0',
						subtract: '1'
					}
				],
				// 普通用户钱包
				defaultUser: [
					// {
					// 	id: 1,
					// 	title: '优惠券',
					// 	num: '0'
					// },
					{
						id: 1,
						title: '我的积分',
						num: '0'
					},
					{
						id: 2,
						title: '我的人脉',
						num: '0'
					},
				],
				getCountNumber: [],
				// 订单
				shoppingOrder: [{
						id: 0,
						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/daifahuo.png',
						title: '待发货'
					},
					{
						id: 1,
						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/daishouhuo.png',
						title: '待收货'
					},
					{
						id: 2,
						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/daipingjia.png',
						title: '待评价'
					},
					{
						id: 3,
						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/tuihuo.png',
						title: '退货/售后'
					},
				],
				// 钱包
				walletList: [{
						id: 0,
						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/qianbao.png',
						title: '我的钱包',
						num: ''
					},
					{
							id: 1,
							image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/qianbao.png',
							title: 'VIP设置',
							num: ''
						},
					// {
					// 	id: 1,
					// 	image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/youhuiquan.png',
					// 	title: '优惠券',
					// 	num: '0个'
					// },
					{
						id: 2,
						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/jifen.png',
						title: '我的积分',
						num: '0'
					}
					// {
					// 	id: 3,
					// 	image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/fapiao.png',
					// 	title: '发票管理'
					// },
				],
				// 我的人气
				myHuman: [{
						id: 1,
						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/shoucang.png',
						title: '我的收藏',
						num: '',
						show: true,
					},
					{
						id: 2,
						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/shezhi.png',
						title: '设置',
						num: '',
						show: true,
					},
					// 					{
					// 						id: 3,
					// 						image: 'https://xk.gzskxx.com/myqcloud/cardImages/my/bangzhu.png',
					// 						title: '帮助',
					// 						num: '',
					// 						show:true,
					// 					},
				]
			};
		},

		computed: {
			//Vuex引入属性
			...mapState(['staffNum'])
		},
		methods: {
			//Vuex引入方法
			...mapMutations(['totalStaffNum']),
			// 获取用户信息
			gotoRegInfo(){
				uni.navigateTo({
					url:'../../item_businessCard/businessCard_regMer/businessCard_regMer?froms=1'
				})
			},
			
			
			getUserInfo() {
				this.showLoading();
				var userId = uni.getStorageSync('userId');
				// console.log('用户userId：'+userId);
				this.$api.getUserInfor(userId).then(result => {
					console.log(result);
					this.userInfor = result.userMap;
					this.hideLoading();
					if (result.userMap.shopId) {
						uni.setStorageSync('shopId', result.userMap.shopId);
					}
					
					
					if(result.userMap.userType!=1)
						this.getCountRecordList();
					
					uni.setStorageSync('userType', result.userMap.userType);
					this.userTypeNum = result.userMap.userType;
					this.userPhone = result.userMap.phone;
					// userType===5 销售总监。判断是否已经有小组
					console.log('用户等级：' + result.userMap.userType);
					if (result.userMap.userType == 5) {
						this.$api.getIfHaveGroup().then(res => {
							console.log(res);
							// res.status==1 已经创建过小组，不显示创建小组的页面
							if (res.status == 1) {
								console.log('groupId:' + res.groupId);
								uni.setStorageSync('小组id：', res.groupId);
								this.getIfHaveGroup = 1;
								return;
							}
							// res.status==0 未创建小组
							console.log('还没有创建销售小组');
							this.getIfHaveGroup = 0;

						})
					}
				});
			},
			// 跳转至编辑名片
			gotoCardDetil(userType) {
				// 用户类型。1：普通用户；2：vip1；3：vip2；4：vip3；5：销售总监；6：销售经理
				if (userType == 1 || userType == 5 || userType == 6) {
					let userId = uni.getStorageSync('userId');
					uni.navigateTo({
						url: '../../item_businessCard/businessCard_EditCard/businessCard_EditCard?userId=' + userId,
						// url: '../../item_my/myself_storeInform/myself_storeInform'
					});
				} else if (userType == 2 || userType == 3 || userType == 4) {
					uni.navigateTo({
						url: '../../item_my/myself_storeInform/myself_storeInform',
						// url: '../../item_businessCard/businessCard_EditCard/businessCard_EditCard',
					});
				}
			},
			// 进入购物订单
			gotoShoppingOrder() {
				uni.navigateTo({
					url: '../../item_my/myself_shoppingOrder/myself_shoppingOrder'
				})
			},
			// 进入购物订单的详情
			gotoShoppingOrderDetail(index) {
				uni.navigateTo({
					url: '../../item_my/myself_shoppingOrder/myself_shoppingOrder?index=' + index
				});

			},
			// 跳转链接 钱包，优惠券，积分 ，发票管理
			gotowallet(index) {
				if (index == 0) {
					uni.navigateTo({
						url: '../../item_my/myself_myWallet/myself_myWallet'
					})
				}  else if (index == 1) {
					
					if (this.isNormalUser==false) {
						uni.showModal({
							title: '提示',
							content: '该功能对VIP开放，去开通VIP',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url:'/item_businessCard/businessCard_VIP/businessCard_VIP_New',
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						return;
					}else{
						let shopId = uni.getStorageSync('shopId');
						this.navigateTo('../../item_businessCard/businessCard_VIP/VipCenter', {
							shopId: shopId,
							userId: this.userId,
							cardUserId: this.cardUserId,
							recommendId: this.cardUserId
						})
						// uni.navigateTo({
						// 	url:'/item_businessCard/businessCard_VIP/VipCenter',
							
						// })
					}
				} else if (index == 2) {
					uni.navigateTo({
						//url: '../../item_my/myself_myInvoice/myself_myInvoice'
						url: '../../item_my/myself_MyIntegral/myself_MyIntegral'
					});
				}
				
				// else if (index == 1) {
				// 	uni.navigateTo({
				// 		url: '../../item_my/myself_courtesyCard/myself_courtesyCard'
				// 	})
				// }
			},
			// 跳转链接 我的人气，员工管理，申请成为员工，收藏，设置
			gotoMyFame() {
				uni.navigateTo({
					url: '../../item_my/myself_myFame/myself_myFame'
				})
			},
			// 员工管理
			gotoStaffManage() {
				if (this.getIfHaveGroup == 0 && this.userTypeNum == 5) {
					uni.navigateTo({
						url: '../../item_my/myself_createSalesTeam/myself_createSalesTeam'
					})
					return;
				}
				uni.navigateTo({
					url: '../../item_my/myself_staffManage/myself_staffManage'
				})

			},
			// 申请成为员工
			gotoApplyStaff() {
				uni.navigateTo({
					url: '../../item_my/myself_ApplyForStaff/myself_ApplyForStaff'
				})
			},
			// 剩下的公共部分
			gotoDetail(index) {
				if (index == 0) {
					uni.navigateTo({
						url: '../../item_my/myself_myCollect/myself_myCollect'
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: '../../item_my/myself_mySetting/myself_mySetting?phone=' + this.userPhone
					})
				}
			},
			// 我的提成，销售订单。我的客户
			gotoMystaff(index) {
				this.getCountRecordList();
				if (this.userInfor.userType == 1) {
					if (index == 0) {
						uni.navigateTo({
							url: '../../item_my/myself_courtesyCard/myself_courtesyCard'
						});
					} else if (index == 1) {
						// uni.navigateTo({
						// 	url: '../../item_my/myself_MyIntegral/myself_MyIntegral'
						// });
						uni.navigateTo({
							url: '../../item_my/myself_myFame/myself_myFame'
						});
					} else if (index == 2) {
						// uni.navigateTo({
						// 	url: '../../item_my/myself_myFame/myself_myFame'
						// });
					}
				} else {
					if (index == 0) {
						uni.navigateTo({
							url: '../../item_my/myself_Recording/myself_Recording'
						});
					} else if (index == 1) {
						uni.navigateTo({
							url: '../../item_my/myself_salesOrder/myself_salesOrder'
						});
					} else if (index == 2) {
						uni.navigateTo({
							url: '../../item_my/myself_myCustomer/myself_myCustomer'
						});
					}
				}
			},
			// 获取提成、订单、客户总数
			getCountRecordList() {
				if (this.userInfor.userType != 1) {
					this.showLoading();
					this.$api.getCountRecord().then(res => {
						this.hideLoading();
						let Num = [res.gainAmount, 0, res.customerNum]; //提成、订单、客户总数4

						
						this.$api.conOrders().then(ress=>{
							Num[1] = ress.sale_orders;
							console.log(Num)
								// 计算客户数量的未读数量
							if (uni.getStorageSync('balanceCustomerNum')==undefined) {
								console.log('缓存中没有值');
								uni.setStorageSync('balanceCustomerNum', res.customerNum);
							} else {
								this.cacheCustomerNum = uni.getStorageSync('balanceCustomerNum');
								console.log('缓存中的值：' + uni.getStorageSync('balanceCustomerNum'));
								if (Number(res.customerNum) >= Number(this.cacheCustomerNum)) {
									this.balanceCustomerNum = res.customerNum - this.cacheCustomerNum;
									uni.setStorageSync('balanceCustomerNum', res.customerNum);
									console.log('计算后的缓存中的值：' + this.balanceCustomerNum);
								}
							}
							// 计算销售订单未处理的订单数量  balanceOrderNum  cacheOrderNum
							if (uni.getStorageSync('balanceOrderNum')==undefined) {
								uni.setStorageSync('balanceOrderNum', res.orderNum);
							} else {
								this.cacheOrderNum = uni.getStorageSync('balanceOrderNum');
								if (Number(res.orderNum) >= Number(this.cacheOrderNum)) {
								
									this.balanceOrderNum = res.orderNum - this.cacheOrderNum;
										//console.log(this.balanceOrderNum,"balanceOrderNum")
									uni.setStorageSync('balanceOrderNum', res.orderNum);
								}
							}
							// 计算提成差额
							if (uni.getStorageSync('balanceGainAmount')==undefined) {
								uni.setStorageSync('balanceGainAmount', res.gainAmount);
							} else {
								this.cacheGainAmount = uni.getStorageSync('balanceGainAmount');
								if (Number(res.gainAmount) >= Number(this.cacheGainAmount)) {
									this.balanceGainAmount = res.gainAmount - this.cacheGainAmount;
									uni.setStorageSync('balanceGainAmount', res.gainAmount);
								}
							}

							// 计算后的差额
							let balanceNum = [this.balanceGainAmount, this.balanceOrderNum, this.balanceCustomerNum];
						
							for (let i = 0; i < this.getCountRecord.length; i++) {
								this.getCountRecord[i].num = Num[i];
								this.getCountRecord[i].subtract = balanceNum[i];
								//console.log(this.getCountRecord[i]);
							}
						}).catch(error => {
							this.showError(error);
							this.hideLoading();
						})
						
					
					}).catch(error => {
						this.showError(error);
						this.hideLoading();
					})
				}
			},
			// 获取钱包余额总数，待审核员工数量,积分数量
			getDataDisplay() {
				this.showLoading();
				this.$api.getDataDisplay().then(res => {
					this.hideLoading();
					console.info(res);
					console.log('钱包' + res.remainMoney);
					this.auditCount = res.auditCount; //待审核的员工数量
					this.totalStaffNum(res.auditCount);
					this.walletList[0].num = '¥' + res.remainMoney || 0; //vip钱包余额
					// this.walletList[1].num = res.couponNum; //vip 优惠券
					this.walletList[1].num = res.accumulateNum; //vip 积分

					//this.defaultUser[0].num = res.remainMoney || 0; //普通用户 钱包余额
					// this.defaultUser[0].num = res.couponNum; //普通用户优惠券
					this.defaultUser[0].num = res.accumulateNum; //普通用户积分
					this.defaultUser[1].num = res.popularity; //我的人脉

				}).catch(error => {
					this.showError(error);
					this.hideLoading();
				})
			},
		},
		onShow() {
			console.log('onshow请求');
			this.doLoginHandle(hasReg=>{
				this.getUserInfo();
				this.getDataDisplay();
			})
			
		},
		onLoad() {
			// uni.setStorageSync('userId',55);
			
			// this.getDataDisplay();
			//this.getUserInfo();
			//console.log(this.shopRegInfo)
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page {
		width: 100%;
		height: 100%;
		background: #F5F5F5;
	}

	.container {
		// 头部名片详情
		padding-bottom: 60upx;

		.HeaderBox {
			height: 420upx;

			.HeaderInfor {
				width: 100%;
				height: 300upx;

				.PersonalCenter {
					width: 92%;
					height: 334upx;
					margin: 50upx auto;
					border-radius: 20upx;
					background: #fff;
					padding: 40upx 30upx;
					box-shadow: 0 1upx 20upx 0 rgba(91, 119, 240, 0.23);

					// 名片信息
					.PCinformation {
						padding-bottom: 40upx;
						border-bottom: 1upx solid @grayBg;

						.PFimage {
							width: 20%;

							.Pimage {
								width: 100upx;
								height: 100upx;
								vertical-align: middle;
							}
						}

						.PFtitleBox {
							font-size: 32upx;
							width: 75%;

							.FBtitle {
								height: 65upx;
								font-weight: 500;
							}

							.FBposition {
								height: 30upx;
								.PublicGrade(@rg1: rgba(134, 138, 255, .2) 0%;
								@rg2: rgba(81, 82, 200, .2) 100%;

								@col: #5355AD) {
									background-image: -webkit-linear-gradient(top, @rg1, @rg2);
									background-image: -moz-linear-gradient(top, @rg1, @rg2);
									background-image: -o-linear-gradient(top, @rg1, @rg2);
									background-image: linear-gradient(top, @rg1, @rg2);
									color: @col;
									height: 36upx;
									line-height: 36upx;
									font-size: 18upx;
									border-radius: 18px;
									margin-left: 20upx;
									padding: 5upx 15upx 5upx 15upx;
								}

								;

								.PActiveVip0 {
									.PublicGrade(@rg1: none;
									@rg2: none;
									)
								}

								.PActiveVip1 {
									.PublicGrade(rgba(244, 215, 147, .2) 0%, rgba(222, 175, 97, .2) 100%, #A36E19);
								}

								.PActiveVip2 {
									.PublicGrade(rgba(199, 220, 254, .2) 0%, rgba(135, 162, 227, .2) 100%, #404F7A);
								}

								.PActiveVip3 {
									.PublicGrade(rgba(134, 138, 255, .2) 0%, rgba(81, 82, 200, .2) 100%, #5355AD);
								}

								.PActiveVip4 {
									.PublicGrade(@rg1: none;
									@rg2: none;
									@col: #666);
									background: #DEDEDE;
								}
							}
						}

						.FBgoToNext {
							width: 5%;
							text-align: right;

							image {
								width: 12.5upx;
								height: 24upx;
							}
						}
					}

					// 销售订单
					.PCsaleOrder {
						.SOorderNum {
							position: relative;
							width: 28.33%;
							margin: 30upx 0 0 0;
							text-align: center;

							.OrderNum {
								font-size: 32upx;
								font-weight: 500;
							}

							.OrderTitle {
								margin-top: 20upx;
							}

							.OrderMessageNum {
								width: 40upx;
								height: 30upx;
								text-align: center;
								line-height: 30upx;
								position: absolute;
								top: -10upx;
								left: 130upx;
								font-size: 18upx;
								color: #fff;
							}
						}
					}
				}
			}
		}

		// 购物订单
		.ShoppingOrder {
			width: 92%;
			background: #fff;
			margin: 0 auto;
			border-radius: 10upx;
			padding-bottom: 20upx;

			.SOstate {
				.SOtitle {
					font-size: 30upx;
					font-weight: 400;
					padding: 30upx 0 20upx 30upx;

					.Sorder {
						width: 50%;
						text-align: left;
					}

					.SallOrder {
						width: 50%;
						text-align: right;
						margin-right: 30upx;

						image {
							width: 12upx;
							height: 22upx;
							margin-left: 15upx;
						}
					}
				}

				.SOorderList {
					.nav-item{
						width: 100%;
						display: flex;
						
						.btn{
							width: 100%;
							display: flex;
						}
					}
					.OLlist {
						//flex: 1;
						 width: 25%;
						 text-align: center;
						// margin-top: 20upx;
						image {
							width: 44upx;
							height: 44upx;
							vertical-align: middle;
							margin: 10upx 0;
						}

						.OLtitle {
							padding-top: 20upx;
						}
					}
				}
			}
		}

		// 钱包，优惠券，积分 ，发票管理
		.walletBox {
			width: 92%;
			padding: 0 30upx;
			margin: 0 auto;
			background: #fff;
			border-radius: 10upx;
			margin-top: 30upx;

			.WBlist {
				.WBLitem {
					border-bottom: 1upx solid @grayBg;
					height: 105upx;
					line-height: 106upx;

					.WBLtitle {
						 width: 40%;
					
						image {
							width: 30upx;
							height: 30upx;
							vertical-align: middle;
							margin-right: 20upx;
						}

						text {
							font-weight: 400;
							
						}
					}

					.WBLnum {
						width: 55%;
						text-align: right;
						font-weight: 400;
					}

					.WBback {
						width: 5%;
						text-align: left;

						image {
							width: 14upx;
							height: 24upx;
							vertical-align: middle;
							margin-left: 20upx;
							margin-top: -5upx;
						}
					}
				}

				// .WBLitem:last-child {border: none;}
			}
		}
	}
</style>
