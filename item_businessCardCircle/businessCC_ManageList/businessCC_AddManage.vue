<template>
	<view class="container">
		<!-- 搜索组件 -->
		<view class="CMsearch-container">
			<view class="CMsearch">
				<view class="CMimage">
					<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
				</view>
				<view class="CMinput">
					<input type="" class="" placeholder="请输入群员的名字" v-model="searchKey" confirm-type="search" @confirm="search"></input>
				</view>
			</view>
		</view>
		
		<!-- 成员列表模板 -->
		<view class="memberListContainer">
			<view class="memberBox">
				<view class="list" v-for="(item,index) of list" :key="item.id">
				<view class="isCheck" @click="addUid(item.isCheck,index)">
					<image :src=" item.isCheck==0?'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.yOucamAENO9619766e00ffedd01b399def5a56424eeb.png':'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.JUF1xYiAQVtm542f9bf31a5ed4b779bf9db807dfa3ae.png'"
					 style="width: 44rpx;height: 44rpx;margin-top: -10rpx;"></image>
				</view>
				<view class="member" >    <!-- :class="{ active: currentMemberId == item.userId }" -->
					<image :src="item.headImage" class="avatar"></image>
					<view class="member-meta">
						<view class="user-info">
							<text class="name">{{ item.name }}</text>
							
						</view>
						
					</view>
				</view>
				<uni-load-more :loading-type="loadingType"></uni-load-more>
				</view>
				
			</view>
			
		</view>
		<!-- 转让确定按钮 -->
		<view class="sureButton">
			<view class="createBtn" @click="confirm">
				<text class="createTxt">确定</text>
			</view>
		</view>
	</view>
</template>

<script>
  export default {

    data() {
      return {
		circleId: '',
        currentPage: 1,
        list: [],
        loading: false,
		searchKey:'',
        noMore: false,
        placeholders:'',
		currentMemberId: '',
		code:'',
		uid:[],
		listLength:0
      };
    },

    computed: {
      cardCirclePublish () {
        return this.$store.state.cardCirclePublish;
      },
      loadingType() {
        if (this.noMore) return 2;
        if (this.loading) return 1;
        return 0;
      },
    },

	onLoad (option) {
      this.circleId = option.id;
      this.currentMemberId = this.cardCirclePublish.managerUserId
	  this.listLength=option.listLength
	  console.log(option)
      this.fetch();
	},

    onReachBottom () {
		this.fetch();
      if (this.noMore || this.loading) return;
      
    },

	methods: {
      fetch () {
        if (this.loading) return;
        this.loading = true;
       const action = this.currentSearch
       	? this.$api.searchCircleMember(this.circleId, this.currentSearch, this.currentPage)
       	: this.$api.listCircleMember(this.circleId, 1, this.currentPage)
       
       action.then(result => {
          this.loading = false;
          const list = result.memberList;
		  list.forEach(item => {
			item.isCheck=0
		    item._showDropDown = false;
		    item._joinTime = this.formatDate(item.joinTime)
		  })
          if (list.length === 0) {
            this.noMore = true;
          }
          this.list = this.list.concat(list);
          this.currentPage++;
		   
		}).catch(error => {
          this.loading = false;
          this.showTips('加载失败')
          console.error(error);
        })
	  },
     search () {
       this.currentSearch = this.searchKey;
       this.reset();
       this.fetch();
     },
      selectMember (user) {
        this.currentMemberId = user.userId;
	  },
      reset () {
        this.currentPage = 1;
        this.list = [];
        this.loading = false;
        this.noMore = false;
      },
	  addUid(isCheck, index) {
	  	this.code = ''
	  	if (this.list[index].isCheck == 0) {
	  		this.list[index].isCheck = 1
	  		this.uid.push(this.list[index].userId)
	  
	  		for (let i in this.uid) {
	  			if (this.uid.length - i === 1) {
	  				this.code += this.uid[i]
	  			} else {
	  				this.code += this.uid[i] + ','
	  			}
	  		}
	  		console.log(this.uid)
	  	} else if (this.list[index].isCheck == 1) {
	  		this.code = ''
	  		this.list[index].isCheck = 0
	  		if (this.uid.length > 0) {
	  			for (let i in this.uid) {
	  				if (this.uid[i] == this.list[index].userId) {
	  					this.uid.splice(i, 1)
	  					for (let i in this.uid) {
	  						if (this.uid.length - i === 1) {
	  							this.code += this.uid[i]
	  						} else {
	  							this.code += this.uid[i] + ','
	  						}
	  					}
	  				}
	  			}
	  			console.log(this.uid)
	  		}
	  	}
	  },
      confirm () {
        // this.cardCirclePublish.managerUserId = this.currentMemberId;
		uni.showModal({
			title: '确认将此用户设为管理员？',
			success: (res) => {
				if (res.confirm) {
					if(this.uid.length<=3){
						uni.showLoading();
						this.$api.setAdministrators(this.circleId,  this.code)
							.then(res => {
								uni.hideLoading();
								uni.showToast({
									title:'设置成功',
									duration:2000
								})
								this.reset();
								this.fetch();
								uni.navigateBack({
									
								})
							})
							.catch(err => {
								uni.hideLoading();
								this.showError(error)
							})
					}else{
						uni.showToast({
							title:"管理员人数以超过3人",
							duration:2000
						})
					}
					
				} else if (res.cancel) {
					console.log("用户取消选择")
				}
			}
		})
        // uni.navigateBack();
	  },

	},

  };
</script>

<style lang="less">

@import "../../css/jss_base.less";

.container{
	width: 100%;
	height: 100%;
	//position: fixed;
	top: 0;
	left: 0;
	background:#FFFFFF ;
}
//搜索按钮
.container1{
    width:100%;margin-top:20upx;
    .CMsearch{
        .flex(flex-start);width:95%;margin:0 auto;text-align:left;background:#f2f2f2;height:72upx;color:#ccc;font-size:28upx;
        .CMimage{
            width:10%;margin-left:20upx;
            image{width:32upx;height:32upx;vertical-align: middle;}
        }
        .CMinput{
            width:80%;
            input{background:#fff;margin-top:10upx;}
        }
    }
}


.memberListContainer{
	width: 100%;
	box-sizing: border-box;
	
	height: 100%;
	padding-top: 120rpx;
	

	.memberBox{
		height: 100%;
		overflow-y: auto;
	}
	.member{
		
	
	border-radius: 10px;
	display: flex;
	box-sizing: border-box;
	padding: 20rpx;
	position: relative;
	margin-bottom: 20upx;
	width: 100%;
	padding: 20rpx 0rpx 20rpx 20rpx;
	margin-left: 30rpx;
	flex-direction: row;
		
		&.active {
			&:after {
				content: "";
				width: 28upx;
				height: 22upx;
				position: absolute;
				top: 50%;
				right: 30upx;
				transform: translateY(-50%);
				background-image: url("http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png");
				background-size: 100% 100%;
			}
		}

		.avatar {
			width:100upx;
			height:80upx;
			border-radius: 10rpx;
			margin-right: 30upx;
		}

		.member-meta {
			width: 100%;
			padding-bottom: 30rpx;
			border-bottom: 1px solid #E5E5E5;
		}
		.user-info {
			display: flex;
			align-items: center;
			margin-top: 20rpx;

		}
		.name {
			font-size:32upx;
			font-weight: bold;
			color:rgba(51,51,51,1);
			line-height:45upx;
			margin-right: 22upx;
		}
		.job {
			height:36upx;
			line-height:36upx;
			background:rgba(241,241,241,1);
			border-radius:18upx;
			padding: 4upx 18upx;
			font-size:20upx;
			color:rgba(102,102,102,1);
		}
		.company {
			font-size:24upx;
			color:rgba(153,153,153,1);
			line-height:33upx;
		}
	}
}

.CMsearch-container {
			padding: 0 30upx;
			height: 110upx;
			background:#fff;
			position: fixed;
			z-index: 999;
		}

 .CMsearch{

			z-index: 999;

            .flex(flex-start);text-align:left;background:#f2f2f2;height:72upx;color:#ccc;font-size:28upx;margin: 0 auto;margin-top:20upx;border-radius: 2px;

			.CMimage{
				margin:0 30upx;
				image{width:32upx;height: 32upx;vertical-align: middle;}
			}
			.CMinput{
				input{
					color: #333333;
					width:600upx;
				}
            }
        }

.container{
  background: #fff;
  .search{
	position: fixed;
	// margin: 30upx auto;
	width: 100%;
	 z-index: 999;
  }
  .sureButton{
    position: fixed;
    width: 100%;
	height: 100upx;
    background: #ffffff;
    bottom: 10rpx;
	  display: flex;
	  align-items: center;
	.createBtn{
		background-color: #2EA1FF;
		width:686rpx;
	  height: 88upx;
	  border-radius: 44rpx;
	  line-height: 88upx;
	  margin: 0 auto;
	  text-align: center;
	  .createTxt{
		line-height: 80upx;
		font-size:@fsContentTitle ;
		color: #ffffff;
	  }
	}
  }
}
.list {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30rpx;

	}
</style>
