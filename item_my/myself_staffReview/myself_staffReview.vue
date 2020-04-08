<template>
	<view class="container">
		<view class="auditBox">
			<view class="auditTitleBox top">
				<!-- 复选框列表 -->
				<block v-for="(item,index) in applicationList" :key="index">
					<view class='item_container'>
						<image class='select_icon' @click="checkedAllCheckedbox(index)" :src="item.isSelected?'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image>
						<view class="auditList">
							<view class="auditCard">
								<view class="ACcardHeader" @click="gotoUserCard(item.userId)">
									<view class="ACimage">
										<default-image :src="item.headImage" custom-class="Pimage"></default-image>
									</view>
									<view class="ACtitle">
										<view class="ACTitlebOX">
											<text class="ACTname">{{item.name}}</text>
											<text class="ACTsubname">{{item.job}}</text>
										</view>
										<view class="ACcomany">{{item.company}}</view>
									</view>
								</view>
								<view class="ACadd" v-if="item.importerName">
									由{{item.importerName}}邀请加入
								</view>
								<view class="ACcardBottem">
									<view class="ACrefuse" @click="refuseAppli(index,item.userId)">拒绝</view>
									<view class="ACreagree" @click="agreeAppli(index,item.userId)">同意</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view v-if="applicationList.length==0 && !loading" class="default" style="margin-top: 250upx">
					<default-page :messageToPage="messageToPage"></default-page>
				</view>
				<!-- 复选框列表 -->
			</view>
			<!--全选 -->
			<view class="allChecked">
				<view class="selectAll">
					<image class='select_icon' @click="selectAll" :src="allSelected?'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image> 全选
				</view>
				<view class="buttonAll">
					<view class="allRefuse" @click="allRejectAppli">全部拒绝</view>
					<view class="allAgree" @click="allAgreeAppli">全部同意</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mzlJS from '../../js/mzl.js';
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				//标题
				userId:'',//缓存中的userId
				shopId:'',
				groupId:'',
				auditTitleBox:{
				  auditTitle:[
					{id:0,title:'待处理'},{id:1,title:'已处理'}
				  ],		  
				},
				// audiTitleActive:0,   //切换标题
				allSelected:false,//全选按钮
				len:'',
				list:[],
				applicationList: [],
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '当前暂无员工申请'
				},
			}
		},		
		methods:{	
			// 去到改用户的名片
			gotoUserCard(userId){
				uni.navigateTo({
					url: '../../pages/businessCard2/businessCard2?cardUserId='+userId
				});
			},
			// 判断是否全选
			checkSelect(){
				var temp = [];
				var temp1 = [];
				for(let i=0; i < this.applicationList.length; i++){
					if(this.applicationList[i].isSelected == true){
						temp.push(this.applicationList[i].userId)
					}
				}
				temp1 = temp;
				this.list = temp1;
				if(temp.length == this.applicationList.length){
					this.allSelected=true;
				}
				else{
					this.allSelected=false;
				}
				temp=[];//清空原数组
			},
			//单选选满时全选选中
			checkedAllCheckedbox(index){
				this.applicationList[index].isSelected = !this.applicationList[index].isSelected;
				this.checkSelect();
			},
			//全选所有按钮
			selectAll(){
				this.allSelected=!this.allSelected;
				if(this.allSelected){
					for(let i of this.applicationList){
						i.isSelected=true;
					}
				}else{
					for(let i of this.applicationList){
						i.isSelected=false;
					}
				}			
			},
			// 获取员工审核列表
			listEmployeeApplication(){
				// vip时groupId为0
				this.$api.listEmployeeApplication(this.shopId,this.groupId,1).then(res=>{
					console.log(res);
					for(let i=0;i<res.applicationList.length;i++){
						res.applicationList[i].isSelected=false;
					}
					this.applicationList=res.applicationList;
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 拒绝员工/组员申请
			refuseAppli(index,userId){	
				let employeeUserId='['+userId+']';
				this.$api.refuseApplication(this.shopId,this.groupId,employeeUserId,this.userId).then(res=>{
					console.log(res);
					this.showTips('拒绝成功').then(res=>{})
					this.applicationList=this.applicationList.filter(o=>o.userId!=userId)
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 同意员工申请
			agreeAppli(index,userId){
				let employeeUserId='['+userId+']';
				this.$api.agreeApplication(this.shopId,this.groupId,employeeUserId,this.userId,1).then(res=>{
					const failList = res.failList || [];
					if (failList.indexOf(userId) !== -1) {
						uni.showModal({
							title: '同意失败',
							content: '该用户已成为其他店的员工或已自己开店',
							showCancel: false,
						});
						return;
					}
					this.applicationList=this.applicationList.filter(o=>o.userId!=userId)
					this.showTips('同意加为员工').then(res=>{})

				}).catch(error=>{
					this.showError(error);
				})
			},
			// 全部拒绝
			allRejectAppli(){
				var appliLen=[];
				for(let i=0;i<this.applicationList.length;i++){
					if(this.applicationList[i].isSelected){
						appliLen.push(this.applicationList[i].userId);
					}
				}
				let employeeUserId='['+appliLen.join(',')+']';
				if(appliLen.length>0){
					console.log('拒绝');
					this.$api.refuseApplication(this.shopId,this.groupId,employeeUserId,this.userId).then(res=>{
						console.log(res);
						this.showTips('拒绝成功').then(res=>{})
						this.applicationList=[]
					}).catch(error=>{
						this.showError(error);
					})
				}else{
					this.showTips('请先选择员工').then(res=>{})
				}
			},
			// 全部同意
			allAgreeAppli(){
				var appliLen=[];
				const userMap = {};
				for(let i=0;i<this.applicationList.length;i++){
					if(this.applicationList[i].isSelected){
						userMap[this.applicationList[i].userId] = this.applicationList[i];
						appliLen.push(this.applicationList[i].userId);
					}
				}
				let employeeUserId='['+appliLen.join(',')+']';
				if(appliLen.length>0){
					console.log('同意');
					uni.showLoading();
					this.$api.agreeApplication(this.shopId,this.groupId,employeeUserId,this.userId,appliLen.length).then(res=>{
						const failList = res.failList || [];
						const hasSuccess = failList.length < appliLen.length;

						if (failList.length > 0) {
							uni.showModal({
								title: '部分用户同意失败',
								content: `用户${failList.map(item => userMap[item].name).join(', ')}已成为其他店的员工或已自己开店`,
								showCancel: false,
								success: (res) => {
									if (res.confirm && hasSuccess) {
										uni.navigateBack();
									}
								}
							});
						} else {
							this.showTips('全部同意加为员工').then(res=>{})
							uni.navigateBack();
						}


						uni.hideLoading();
					}).catch(error => {
						this.showError(error)
						uni.hideLoading();
					})
				}else{
					this.showTips('请先选择员工').then(res=>{})
				}
			},
		},
		onLoad(options){
			this.userId=uni.getStorageSync('userId');
			this.shopId=uni.getStorageSync('shopId');
			// 销售总监userType==5,   vip2/3:groupId为0
			if(uni.getStorageSync('userType')==5){
				this.groupId=uni.getStorageSync('groupId');
			}else{
				this.groupId=0;
			}
			this.listEmployeeApplication();
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';
	page{
		background:@grayBg;width:100%;height:100%;
	}
	.container{padding-bottom:100upx;box-sizing:border-box;}
	// 复选框列表
	.auditTitleBox{
		padding-top:30upx;
		.auditList{
			width:100%;margin-left:20upx;box-sizing:border-box;background:#fff;
			.auditCard{
				.ACcardHeader{
					padding:30upx 30upx 0 30upx;
					.flex();width:100%;
					.ACimage{
						width:20%;
						image{width:100upx;height: 100upx;}
					}
					.ACtitle{
						width:80%;padding:20upx;box-sizing:border-box;
						.ACTitlebOX{
							width:100%;height:80upx;
							.ACTname{margin-right:30upx;font-size:@fsContentTitle;color:@title;font-weight: bold;}
							.ACTsubname{display: inline-block;height:36upx;font-size:20upx;color:#666;background:#F8F8F8;text-align:center;line-height:36upx;border-radius: 18upx;padding:5upx 10upx;}
						}
						.ACcomany{
							width:100%;height:40upx;font-size:@fsNum;color:@logoNote;
						}
					}
				}
				.ACadd{
					// padding:10upx 30upx 10upx 30upx;
					width: 90%;margin:0 auto;height:80upx;line-height:80upx;background:#F8F8F8;box-sizing:border-box;font-size:@fsNum;color:#666;padding-left:20upx;
				}
				.ACcardBottem{
					border-top:1upx solid @grayBg;font-size:28upx;color:#666;margin-top:20upx;text-align: center;
					.flex();
					.ACrefuse{width:50%;border-right:1upx solid @grayBg;padding:20upx;}
					.ACreagree{width:50%;font-size:28upx;color:@tabActive;padding:20upx;}
				}
			}
			
		}
	}
	// 底部全选按钮
	.allChecked{
		.flex();position: fixed;font-size:@fsSubTitle;bottom:0;background:#fff;border-top:1upx solid @grayBg;padding:20upx;box-sizing: border-box;
		.selectAll{
			width:20%;
			image{            
				width: 34upx; height: 34upx;border-radius: 50%;
			}
		}
		.buttonAll{
			.flex(space-between);width:65%;text-align: center;line-height: 70upx;
			.allRefuse{
				.buttonRadius(@w:200upx;@h:70upx;@bg:none;);
				border:1upx solid @logoNote;
			}
			.allAgree{
				.buttonRadius(@w:200upx;@h:70upx;@bg:none;);
				border:1upx solid @tabActive;color:@tabActive ;
			}
		}
	}
	// 复选框按钮
	.item_container {
		display: flex;
		flex-direction: row;
		align-items: top;
		padding: 20upx;
		
		.select_icon {
			width: 34upx;
			height: 34upx;
			border-radius: 50%;
		}
	  }
	//   已处理的审批页面
	.dealWith{
		width:100%;
		.auditList{
			width:90%;padding:30upx;box-sizing:border-box;background:#fff;margin:0 auto;margin-top:30upx;
			.auditCard{
				.ACcardHeader{
					.flex();width:100%;
					.ACimage{
						width:20%;
						image{width:100upx;height: 100upx;}
					}
					.ACtitle{
						width:80%;padding:20upx;box-sizing:border-box;
						.ACTitlebOX{
							width:100%;height:70upx;
							.ACTname{margin-right:30upx;font-size:@fsContentTitle;color:@title;font-weight: bold;}
							.ACTsubname{width:auto;padding:0 10upx;display: inline-block;height:36upx;font-size:20upx;color:#666;background:#F8F8F8;text-align:center;line-height:36upx;border-radius: 18upx; }
							.ACTagress{position: relative;right:-110upx;font-size:24upx;color:#666;}
						}
						.ACcomany{
							width:100%;font-size:@fsNum;color:@logoNote;
						}
					}
				}
				.ACadd{
					height:80upx;line-height:80upx;background:#F8F8F8;box-sizing:border-box;font-size:@fsNum;color:#666;padding-left:20upx;
				}
				.ACcardBottem{
					height:80upx;border:1px solid @grayBg;font-size:28upx;color:#666;
					.flex();
					.ACrefuse{border-right:1upx solid @grayBg;}
					.ACreagree{font-size:28upx;color:@tabActive;}
				}
			}
			
		}
	}

</style>
