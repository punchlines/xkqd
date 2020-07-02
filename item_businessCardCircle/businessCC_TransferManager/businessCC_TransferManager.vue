<template>
	<view class="container">
		<!-- 搜索组件 -->
		<view class="CMsearch-container">
			<view class="CMsearch">
				<view class="CMimage">
					<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
				</view>
				<view class="CMinput">
					<input type="" class="" placeholder="请输入成员姓名,公司,职位" v-model="searchKey" confirm-type="search" @confirm="search"></input>
				</view>
			</view>
		</view>
		
		<!-- 成员列表模板 -->
		<view class="memberListContainer">
			<view class="memberBox">
				<view class="member" v-for="item of list"
					  :key="item.id"
					  :class="{ active: currentMemberId == item.userId }"
					  @click="selectMember(item)"
				>
					<image :src="item.headImage" class="avatar"></image>
					<view class="member-meta">
						<view class="user-info">
							<text class="name">{{ item.name }}</text>
							<text class="job">{{ item.job }}</text>
						</view>
						<view class="company"></view>
					</view>
				</view>
				<uni-load-more :loading-type="loadingType"></uni-load-more>
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
       	: this.$api.listCircleMember(this.circleId, this.currentPage)
       
       action.then(result => {
          this.loading = false;
          const list = result.memberList;
		  list.forEach(item => {
			  
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
      confirm () {
        this.cardCirclePublish.managerUserId = this.currentMemberId;
        uni.navigateBack();
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
	background:#F5F5F5 ;
}
//搜索按钮
.container1{
    width:100%;margin-top:20upx;
    .CMsearch{
        .flex(flex-start);width:95%;margin:0 auto;text-align:left;background:#fff;height:72upx;color:#ccc;font-size:28upx;
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
	padding: 0 30upx;
	height: 100%;
	padding-top: 100rpx;
	

	.memberBox{
		height: 100%;
		overflow-y: auto;
	}
	.member{
		height:180upx;
		background:rgba(255,255,255,1);
		border:1upx solid rgba(238,238,238,1);
		display: flex;
		box-sizing: border-box;
		padding: 40upx 30upx;
		position: relative;
		margin-bottom: 20upx;

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
			height:100upx;
			margin-right: 30upx;
		}

		.member-meta {

		}
		.user-info {
			display: flex;
			align-items: center;
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
			background:@grayBg;
			position: fixed;
			z-index: 999;
		}

 .CMsearch{

			z-index: 999;

            .flex(flex-start);text-align:left;background:#fff;height:72upx;color:#ccc;font-size:28upx;margin: 0 auto;margin-top:20upx;

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
  background: #f5f5f5;
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
    bottom: 0;
	  display: flex;
	  align-items: center;
	.createBtn{
	  height: 80upx;
	  line-height: 80upx;
	  margin: 0 auto;
	  text-align: center;
	  .buttonRadius();
	  .createTxt{
		line-height: 80upx;
		font-size:@fsContentTitle ;
		color: #ffffff;
	  }
	}
  }
}
</style>
