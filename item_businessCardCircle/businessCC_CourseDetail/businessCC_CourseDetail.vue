<template>
	<view class="body">
		
		<view class="videoBox">
			<video id="myVideo" v-if="detail.nodeList.length>0" class="video" :src="detail.nodeList[currentIndex].video" :poster="detail.nodeList[currentIndex].cover"></video>
			
		</view>
		
		<view class="Coursetitle">{{detail.course.name}}</view>
		
		<view class="desc">课程描述:{{detail.course.describe}}</view>
		
		<template v-if="canEdit==1" >
			<view class="btn" @click="setInvite">推广</view>
			<view class="btn save" @click="editCourse">编辑</view>
		</template>
		
		<view class="h3">课程章节:</view>
		<!-- 章节列表 -->
		<view class="courseList  fx-row fx-wrap fx-row-space-between" >

			<view class="courseItem" v-for="(item,index) in detail.nodeList" :key="index" @click="goChapterDetail(index)">
				<image :src="item.cover" class="courseImage" mode=""></image>
				<view class="chapterTip">{{formateSeconds(parseInt(item.time))}}</view>
				<view class="info">
					<view class="title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<!-- 打赏 -->
		
		<view class="RewardBox fx-column fx-row-space-around fx-row-center">
			<view class="Reward" @click="openReward">赏</view>
			<view style="margin-top: 20rpx;">共有{{reward.count}}人打赏</view>
			<view class="fx-row fx-wrap fx-row-start" style="margin-top: 10rpx;padding: 0 30rpx;width: auto;">
				<image v-for="(item,index) in reward.list" :key="index" :src="item" class="avatar"></image>
			</view>
		</view>
		
		
		
		<!-- 评论 -->
		
		<view class="commentContainer">
			<view class="topicTitle">
				<view class="titleTxt">
					<text class="title_txt">精彩评论</text>
					<!-- <text class="title_txt">(0)</text> -->
				</view>
			</view>
			<template v-for="(item,index) in list" >
				<course-comment :item="item" :key="index" @deleteComment="deleteComment(index)" @reply="reply(index)"></course-comment>
			</template>

		</view>
		
		
		<view class="sayContainer" >
			<input v-model="commentContent" confirm-type="send" @confirm="send" type="text" :placeholder="commentPlaceholder" class="input" placeholder-class="tishi" />
			<text class="sendMess" @click="send">发送</text>
		</view>
	
	
		<uni-popup ref="popup" type="bottom">
			
			<view class="RewardContent">
					<view class="title">请选择打赏金额</view>
					<view class="priceBox fx-row fx-row-space-between fx-wrap" >
						<view class="price" v-for="(item,index) in detail.rewards"  @click="change(index)">
							<view class="priceInner" :class="{'active':index==active}">{{item}} 元</view>
						</view>


					</view>
					
					<view class="pay" @click="pay">微信支付</view>
					
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import  loadMoreMixins  from "@/js/mixins/loadMoreMixins2.js";
	import {formateSeconds} from '@/js/mzl.js'
	import uniPopup from "../_components/uni-popup/uni-popup.vue"
	import courseComment from "../_components/courseComment.vue"
	export default {
		mixins:[loadMoreMixins],
		data() {
			return {
				id:"",
				detail:"",
				circleId:"",
				currentIndex:0,
				videoContext:null,
				active:0,
				canEdit:0,
				commentContent:'',
				commentType:0,
				list:[],
				replyUserId:null,
				replyUserName:"",
				reward:{
					count:0,
					list:[]
				}
			};
		},
		components:{uniPopup,courseComment},
		
		onLoad(option) {
			this.id=option.id;
			this.circleId = option.circleId;
			this.videoContext =  uni.createVideoContext('myVideo')
			this.canEdit= option.canEdit;
			this.fetch();
			this.getReward();
			
		},
		
		onShow() {
			this.$api.getCourseInfo(this.id).then(detail=>{
				this.detail = detail;
			})
		},
		
		computed: {
			commentPlaceholder() {
				if(this.commentType==0){
					return "输入你想说的话"
				}else{
					return "回复: @"+this.replyUserName
				}
				
			}
		},
		
		methods:{
			getReward(type=0){
				this.$api.getCourseRewardUserList(type,this.id).then(res=>{
					this.reward = res;
				})
			},
			
			resetInput(){
				this.commentType=0;
				this.commentContent="";
				this.replyUserId = null;
				this.replyUserName = "";
			},
			
			send(){
				if(!this.commentContent){
					return this.showTips("请输入内容！")
				}
			
					this.$api.saveCourseComment(this.commentContent,this.id,this.replyUserId).then(res=>{
						this.showTips("评论成功");
						this.list.unshift({
							callUserFace: "",
							callUserId: this.replyUserId,
							callUserName: this.replyUserName,
							content: this.commentContent,
							courseId: this.id,
							createTime: new Date().getTime(),
							id: res,
							star: 5,
							userFace: this.currentUser.headImage,
							userId: this.currentUser.id,
							userName: this.currentUser.name
						})
						
						this.resetInput();
					}).catch(err=>{
						this.showError(err)
					})
				
				
			},
			
			reply(index){
			
				this.replyUserId = this.list[index].userId
				this.replyUserName = this.list[index].userName
				this.commentType=1;
			},
			
			deleteComment(index){
				uni.showModal({
					showCancel:true,
					content:"确定删除这条评论?",
					success: (res) => {
						if(res.confirm){
							this.$api.delCourseComment(this.list[index].id).then(res=>{
								this.showTips("删除成功")
								this.list.splice(index,1)
							}).catch(err=>{
								this.showError(err)
							})
						}
					}
				})
			},	
			fetch() {
				uni.showLoading();
				this.loading=true;
				this.$api.getCourseCommentList(this.id,this.currentPage).then(res=>{
					uni.hideLoading();
					this.loading=false;
					this.currentPage++;
					
					if(res.length==0){
						this.noMore=true;
						return;
					}
					
					this.list = this.list.concat(res); 
				}).catch(err=>{
					uni.hideLoading();
					this.showError(err)
				})
			},
			
			change(index){
				this.active=index
			},
			
			openReward(){
				this.$refs.popup.open()
			},
			pay(){
				this.$api.saveCircleCourseRewardOrder(this.circleId,this.id,this.detail.rewards[this.active]).then(res=>{
					let orderNum = res;
					return this.$api.unifiedorder(orderNum)
					// this.$refs.popup.close();
					// this.showTips("打赏成功")
				}).then(result=>{
					// this.$refs.popup.close();
					// this.showTips("打赏成功")
					return this.requestPayment(result.prePayInfo)
				}).then(result=>{
					this.getReward(1);
					this.$refs.popup.close();
					this.showTips("打赏成功");
					
					
				}).catch(err=>{
					uni.hideLoading();
					this.showError(err)
				})
				
			},
			editCourse(){
				let obj = {
						"courseId": this.id,
						"name": this.detail.course.name,
						"describe": this.detail.course.describe,
						"coverUrl": this.detail.course.cover,
						"nodes": JSON.parse(JSON.stringify(this.detail.nodeList))
				}
				
				for(let x of obj.nodes){
					x.time = this.formateSeconds(parseInt(x.time))
				}
				
				this.$store.commit('setCourse',obj)
				uni.navigateTo({
					url:"../businessCC_PublishClass/businessCC_PublishClass?id="+this.id+"&edit=1"
				})
			},

			
			formateSeconds(v){
				return formateSeconds(v)
			},
			goChapterDetail(index){
				if(index!=this.currentIndex){
					this.videoContext.stop();
					this.currentIndex=index;
					setTimeout(()=>{
						this.videoContext.play();
					},500)
				}
					
				// uni.navigateTo({
				// 	url:"../businessCC_ChapterDetail/businessCC_ChapterDetail?bjson="+encodeURIComponent(JSON.stringify(this.detail.nodeList[index]))
				// })
			},
			setInvite(){
				uni.showModal({
					content:"设置成功后将会在您邀请还有关注之前展示给好友，默认可免费观看前4节视频，其他用户关注后可以全部观看",
					success: (res) => {
						if(res.confirm){
							this.$api.setExtensionCourse(this.circleId,this.id).then(res=>{
								this.showTips("设置成功")
								// uni.setStorageSync('_needFetchCourse', true)
								// uni.navigateBack();
							}).catch(err=>{
								this.showError(err)
							})
						}
					}
				})
			}
			

		}
	}
</script>

<style lang="less">
	@import "../../css/jss_base.less";
	@import '../../css/mzl_base.less';
	page{
		
		.body{
			padding-bottom: 120rpx;
		}
		padding: 30rpx;
		// padding-bottom: 150rpx;
		box-sizing: border-box;
		.videoBox{
			width: 100%;
			min-width: 750rpx;
			position: fixed;
			left: 0rpx;
			top: 0;
			z-index: 9999;
			background: white;
			height: 500rpx;
			
			.video{
				width:690rpx;
				// position: fixed;
				// left: 30rpx;
				// top: 0;
				// z-index: 9999;
				margin-left: 30rpx;
				height: 500rpx;
			}
		}
			
		.avatar{
			width: 50rpx;
			height: 50rpx;
			border-radius: 5rpx;
			margin-right: 8rpx;
			margin-top: 10rpx;
		}
		
	
		
		//评价输入框
		.sayContainer{
			.flex(center);
			width: 100%;
			height: 98upx;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index:99;
			background:#ffffff;
			.input{
				width: 80%;
				height: 70upx;
				margin-right: 20upx;
				border-radius: 35upx;
				background: #F8F8F8;
				padding-left:50upx;
				box-sizing: border-box;
				font-size:30upx;
			}
			.tishi{
				font-size: 28upx;
				color: #AAAAAA;
			}
			.sendMess{
				font-size: 30upx;
				color: #6B7AF8;
				font-family: PingFangSC;
			}
		}
		
		.commentContainer{
			margin-top: 50rpx;
			
			.titleTxt{
				font-weight: bold;
				border-bottom: 1px solid #ccc;
				padding-bottom: 15rpx;
			}
			

		}
		
		.RewardContent{
			height: 500rpx;
			background: white;
			position: relative;
			.pay{
				background: #6B7AF8;
				color: white;
				height: 100rpx;
				position: absolute;
				bottom: 0;
				text-align: center;
				width: 100%;
				line-height: 100rpx;
			}
			.title{
				padding-top: 10rpx;
				text-align: center;
			}
			.priceBox{
				margin: 0 auto;
				width: 690rpx;
				.price{
					margin-top: 50rpx;
					width: 25%;
					.priceInner{
						width: 90rpx;
						height: 90rpx;
						margin: 0 auto;
						text-align: center;
						line-height: 90rpx;
						border-radius: 50%;
						border: 1px solid black;
						&.active{
							border: 1px solid #FDBA44;
							background: #FDBA44;
							color: white;
						}
					}
				}
			}
		}
		
		.RewardBox{
			padding: 100rpx 0;
			.Reward{
				margin: 0 auto;
				background: #FDBA44;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				line-height: 90rpx;
				text-align: center;
				color: white;
			}
		}
		.courseList{
			box-sizing: border-box;
		
			.courseItem{
				width: 330rpx;
				box-sizing: border-box;
				border: 1rpx solid #ddd;
				box-shadow: 1rpx 1rpx 10rpx 1rpx #ccc;
				position: relative;
				.chapterTip{
					position: absolute;
					right: 5rpx;
					top: 193rpx;
					color: white;
					font-size: 28rpx;
					background: rgba(0,0,0,0.3);
				}
				&:nth-of-type(n+3){
					margin-top: 30rpx;
				}
				.courseImage{
					width: 330rpx;
					height:  230rpx;
				}
				
			}
			.info{
				width: 100%;
				padding: 15rpx;
				
				.title{
					font-size: 28rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				}
		}
	}
	
	.desc{
		min-height: 300rpx;
		background: #f6f6f6;
		padding: 10rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
	}
	
	.Coursetitle{
		font-size: 35rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
		margin-top: 500rpx;
	}
	.h3{
		margin: 20rpx 0;
	}
	
	.btn{
		position: fixed;
		bottom: 200upx;
		.buttonRadius(90rpx,90rpx,#FDBA44);
		font-size:32rpx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:90rpx;
		text-align: center;
		right:39rpx;
		z-index: 99;
		&.save{
			// left: 397rpx;
				bottom: 330upx;
			background-color: #6B78FA;
		}
	
	}
</style>
