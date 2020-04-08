<template>

	<view class="container">
		<view class="qrimg">
			<qrcode :val="qrval" :size="qrsize" :colorDark="qrColorDark" :colorLight="qrColorLight" ref="qrcode" @result="qrR"></qrcode>
		</view>
		<view class="StaffManage">
			<!-- 头部 -->
			<view class="SMheader fx-row fx-row-center fx-row-space-around">
				<view class="Himage">
					<image class="HIMG" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shangwuhezuo.png'" alt=""></image>
				</view>
				<!-- <view class="Htitle" @click="gotoStaffRecruit">招募员工</view> -->
				<button class="Htitle" @click="creatQrcode">招募员工</button>
				<view class="Hgoto">
					<image class="HGimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/you.png'" alt=""></image>
				</view>
			</view>
			<!-- 员工列表 -->
			<view class="staffListBOX">
				<view class="SLheader borderB fs3a28  fx-row fx-row-center fx-row-space-around">
					<view class="Hstaff">员工</view>
					<view class="Hcustomer fx-row fx-row-center" @click="sortCustomerList">
						<view class="HCtitle">新客户数</view>
						<view class="SortImage">
							<view class="Himage">
								<image class="HCimage" :src="isshowHead?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shang.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shang1.png'"
								 alt=""></image>
							</view>
							<view class="Bimage">
								<image class="HCimage HCimage1" :src="isshowBottom?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/xia1.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/xia.png'"></image>
							</view>
						</view>
					</view>
					<view class="Hsales fx-row fx-row-center" @click="sortSaleList">
						<view class="HCtitle">总销售额</view>
						<view class="SortImage">
							<view class="Himage">
								<image class="HCimage" :src="isshowHeadSale?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shang.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shang1.png'"
								 alt=""></image>
							</view>
							<view class="Bimage">
								<image class="HCimage HCimage1" :src="isshowBottomSale?'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/xia1.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/xia.png'"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="SLlist">
					<view v-if="employee.length>0" class="SListItem fx-row fx-row-center fx-row-space-around fs6a24" v-for="(item,index) in employee"
					 :key="index" @click="gotoStallDetail(item.userId,item.groupLogo,item.groupName,item.joinTime,item.customerCount,item.salesAmount)">
						<view class="STname">{{item.name}}</view>
						<view class="STnum">{{item.customerCount}}人</view>
						<view class="STprice">¥{{item.salesAmount}}</view>
					</view>
					<view v-if="employee.length==0" class="default">
						<default-page :messageToPage="messageToPage"></default-page>
					</view>
				</view>
			</view>
			<!--审核  -->
			<view class="staffExamine">
				<view class="SEbutton fs3a32" @click="gotoExamine">员工申请审核（{{staffNum?staffNum:0}}）</view>
			</view>
		</view>
	</view>

</template>

<script>
	import qrcode from '../../components/qrcode/qrcode.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				onlineSite: this.global.onlineSite,
				shopId: '',
				groupId: '',
				userType: '', //用户等级
				isshowHead: false,
				isshowBottom: true,
				isshowHeadSale: true,
				isshowBottomSale: false,
				employee: [], //员工列表
				count: '',
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '您暂无员工，请去招募员工'
				},
				qrval: '../businessCard/businessCard', // 要生成的二维码值
				qrsize: 200, // 二维码大小
				qrColorDark: '#000', // 二维码背景色
				qrColorLight: '#fff', // 二维码前景色
				qrSrc: '',
				// vip2/3的店铺信息////销售总监的小组信息。传到招募员工页面
				salesGroupAvip: '',
			}
		},
		computed: {
			//Vuex引入属性
			...mapState(['staffNum'])
		},
		components: {
			qrcode
		},
		methods: {
			// 新客户数排序vip2/3跟销售总监
			sortCustomerList() {
				// vip2/vip3:等级分别是：3/4
				if (this.userType == 3 || this.userType == 4) {
					if (this.isshowHead) {
						// 上面亮，下面暗	   DESC:'',
						this.isshowHead = false;
						this.isshowBottom = true;
						this.$api.sortAllEmployeeList(this.shopId, 1, 'DESC', 'customerCount').then(res => {
							this.employee = res.employeeSortList;
						}).catch(error => {
							this.showError(error);
						})
					} else if (this.isshowBottom) {
						// 下面亮，上面暗  ASC:'',
						this.isshowHead = true;
						this.isshowBottom = false;
						this.$api.sortAllEmployeeList(this.shopId, 1, 'ASC', 'customerCount').then(res => {
							this.employee = res.employeeSortList;
						}).catch(error => {
							this.showError(error);
						})
					}
				} else {
					// 销售总监5
					if (this.isshowHead) {
						// 上面亮，下面暗	   DESC:'',
						this.isshowHead = false;
						this.isshowBottom = true;
						this.$api.sortEmployeeList(this.shopId, this.groupId, 1, 'DESC', 'customerCount').then(res => {
							console.log(res);
							this.employee = res.employeeSortList;
						}).catch(error => {
							this.showError(error);
						})
					} else if (this.isshowBottom) {
						// 下面亮，上面暗  ASC:'',
						this.isshowHead = true;
						this.isshowBottom = false;
						this.$api.sortEmployeeList(this.shopId, this.groupId, 1, 'ASC', 'customerCount').then(res => {
							console.log(res);
							this.employee = res.employeeSortList;
						}).catch(error => {
							this.showError(error);
						})
					}
				}
				return;
			},
			// 总销售额排序 vip2/3跟销售总监
			sortSaleList() {
				if (this.userType == 3 || this.userType == 4) {
					if (this.isshowHeadSale) {
						// 上面亮，下面暗	   ASC:'',
						this.isshowHeadSale = false;
						this.isshowBottomSale = true;
						this.$api.sortAllEmployeeList(this.shopId, 1, 'DESC', 'salesAmount').then(res => {
							this.employee = res.employeeSortList;
						}).catch(error => {
							this.showError(error);
						})
					} else if (this.isshowBottomSale) {
						// 下面亮，上面暗DESC:'',
						this.isshowHeadSale = true;
						this.isshowBottomSale = false;
						this.$api.sortAllEmployeeList(this.shopId, 1, 'ASC', 'salesAmount').then(res => {
							this.employee = res.employeeSortList;
						}).catch(error => {
							this.showError(error);
						})
					}
				} else {
					// 销售总监5
					if (this.isshowHeadSale) {
						// 上面亮，下面暗	   DESC:'',
						this.isshowHeadSale = false;
						this.isshowBottomSale = true;
						this.$api.sortEmployeeList(this.shopId, this.groupId, 1, 'DESC', 'salesAmount').then(res => {
							this.employee = res.employeeSortList;
						}).catch(error => {
							this.showError(error);
						})
					} else if (this.isshowBottomSale) {
						// 下面亮，上面暗  ASC:'',
						this.isshowHeadSale = true;
						this.isshowBottomSale = false;
						this.$api.sortEmployeeList(this.shopId, this.groupId, 1, 'ASC', 'salesAmount').then(res => {
							this.employee = res.employeeSortList;
						}).catch(error => {
							this.showError(error);
						})
					}
				}
			},
			//Vuex引入方法
			...mapMutations(['totalStaffNum']),
			//获取小组列表（销售总监）
			getGroupSaleList() {
				let groupId = uni.getStorageSync('groupId');
				this.$api.listEmployee(this.shopId, groupId).then(res => {
					console.log(res);
					this.employee = res.employeeList;
					// this.count=res.groupApplyCount;
					this.totalStaffNum(res.groupApplyCount);
					this.salesGroupAvip = {};
				}).catch(error => {
					this.showError(error);
				})
			},
			//获取员工列表（vip）
			getGroupListVip() {
				this.$api.listAllEmployee(this.shopId).then(res => {
					console.log(res);
					this.employee = res.employeeList;
					// this.count=res.applyCount;
					this.totalStaffNum(res.applyCount);
					this.salesGroupAvip = res.employeeList[0];
				}).catch(error => {
					this.showError(error);
				})
			},
			// 审核
			gotoExamine() {
				uni.navigateTo({
					url: '../myself_staffReview/myself_staffReview'
				});
			},
			// 员工详情
			gotoStallDetail(userId, groupLogo, groupName, joinTime, customerCount, salesAmount) {
				if (!groupName) {
					groupName = '';
				}
				if (!groupLogo) {
					groupLogo = "";
				}
				uni.navigateTo({
					url: '../myself_staffDetails/myself_staffDetails?userId=' + userId + '&groupLogo=' + groupLogo + '&groupName=' +
						groupName + '&joinTime=' + joinTime + '&customerCount=' + customerCount + '&salesAmount=' + salesAmount
				});
			},
			// 返回二维码路径
			qrR(res) {
				// 弃用
				this.qrSrc = res;
				console.log('二维码路径：' + res);
				uni.setStorageSync('codeImage', res);
				if (this.qrSrc) {
					console.log('页面跳转');
					uni.navigateTo({
						url: '../myself_recruitingStaff/myself_recruitingStaff?salesGroupAvip=' + this.salesGroupAvip
					});
				}
			},
			
			// 生成二维码
			getShopWXCodeUrlLimitless(){
				return new Promise((RES,REJ)=>{
					this.$api.getShopWXCodeUrlLimitless(0,this.shopId).then(res=>{
						console.log('开始生二维码');
						console.log(res.WXCodeUrl);
						this.qrSrc=res.WXCodeUrl;
						RES();
					})
				})
			},
			creatQrcode() {
				// this.$refs.qrcode._makeCode();
				this.getShopWXCodeUrlLimitless().then(res=>{
					uni.navigateTo({
						url: '../myself_recruitingStaff/myself_recruitingStaff?salesGroupAvip=' + this.salesGroupAvip+'&WXCodeUrl='+this.qrSrc
					});
				});
				
			},
		},
		onShow() {
			this.shopId = uni.getStorageSync('shopId');
			this.userType = uni.getStorageSync('userType');
			console.log(this.userType);
			if (this.userType == 5) {
				this.getGroupSaleList(); //销售总监组员列表
				this.groupId = uni.getStorageSync('groupId');
				console.log('groupId:' + this.groupId);
			} else {
				this.getGroupListVip(); //vip2、3组员列表
			}
		},
		onLoad(options) {

		}
	}
</script>

<style scoped lang="less">

	@import '../../css/mzl_base.less';

	.container {
		background: #fff;
		width: 100%;
		height: 100%;
		position: relative;

		.qrimg {
			position: absolute;
			z-index: -999;
		}

		.StaffManage {
			z-index: 9999;

			//头部
			.SMheader {
				padding: 10upx 30upx;
				background: @tabActive;

				.Himage {
					width: 10%;

					.HIMG {
						width: 38upx;
						height: 38upx;
						vertical-align: middle;
					}
				}

				.Htitle {
					width: 80%;
					font-size: 30upx;
					color: #fff;
					border: none;
					background: none;
					text-align: left;
					position: sticky;
				}

				button::after {
					border: none
				}

				.plain {
					border: none;
					border-color: transparent;
				}

				.Hgoto {
					width: 10%;
					text-align: right;

					.HGimage {
						width: 12upx;
						height: 24upx;
						vertical-align: middle
					}
				}
			}

			// 员工列表
			.staffListBOX {
				text-align: center;
				margin-bottom: 100upx;

				.SLheader {
					font-weight: bold;
					padding: 30upx 0;

					.Hstaff {
						width: 33.33%;
					}

					.Hcustomer {
						width: 33.33%;
						justify-content: center;

						.SortImage {

							// width:10%;border:1upx solid red;
							.HCimage {
								margin-left: 20upx;
								width: 17upx;
								height: 9upx;
								vertical-align: middle
							}

							.Himage {

								// border:1upx solid red;
								image {
									position: relative;
									top: 5upx;
								}
							}

							.Bimage {

								// border:1upx solid red;
								image {
									position: relative;
									top: -5upx;
								}
							}
						}
					}

					.Hsales {
						width: 33.33%;
						justify-content: center;

						.SortImage {

							// width:10%;border:1upx solid red;
							.HCimage {
								margin-left: 20upx;
								width: 17upx;
								height: 9upx;
								vertical-align: middle
							}

							.Himage {

								// border:1upx solid red;
								image {
									position: relative;
									top: 5upx;
								}
							}

							.Bimage {

								// border:1upx solid red;
								image {
									position: relative;
									top: -5upx;
								}
							}
						}
					}
				}

				// 列表
				.SLlist {
					width: 100%;

					.SListItem {
						padding: 30upx 0;

						.STname {
							width: 33.33%;
						}

						.STnum {
							width: 33.33%;
						}

						.STprice {
							width: 33.33%;
						}
					}

					.SListItem:nth-of-type(even) {
						background: #F9FAFD;
					}

					.default {
						text-align: center;
						margin: 0 auto;
						position: fixed;
						top: 50%;
						left: 50%;
						margin-top: -86upx;
						margin-left: -170upx;
					}
				}
			}

			// 按钮
			.staffExamine {
				position: fixed;
				bottom: 0;
				background: #fff;
				border-top: 1upx solid #eee;
				width: 100%;
				height: 100upx;

				.SEbutton {
					color: #fff;
					.buttonRadius();
					margin: 6upx auto;
				}
			}
		}

	}
</style>
