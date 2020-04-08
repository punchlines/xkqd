<template>

  <view class="page">

    <view class="tab-container">
      <view class="tab" @click="tabTap(1)" :class="{ active: tab == 1 }">普通消息</view>
      <view class="tab" @click="tabTap(2)" :class="{ active: tab == 2 }">
		  <view class="text">
			  系统消息
			  <view class="unread" v-if="messageCount > 0">{{ messageCount }}</view>
		  </view>
	  </view>
    </view>

	  <view class="tab-content">
		  <!-- #1 普通消息 -->
		  <view v-if="tab==1 && statusCode==1">

			  <view class="list-view">
				  <messageItem class="list-item" v-for="(item, index) in list" :item="item" :key="index" @remove="remove(index)"></messageItem>
			  </view>
			  <uniLoadMore :loadingType="loadingType" :contentText="contentText"></uniLoadMore>
		  </view>

		  <!-- #2 系统消息 -->
		  <view v-if="tab==2&&statusCode==1">

			  <view class="list-view">
				  <systemMessageItem class="list-item" v-for="(value1,index) in list" :key="index" :value1='value1'></systemMessageItem>
			  </view>
			  <uniLoadMore :loadingType="loadingType" :contentText="contentText"></uniLoadMore>
		  </view>
	  </view>


		<view v-if="statusCode==2" style="height: 100vh;display: flex;flex-direction: column;align-items: center;justify-content: center;">
		  <!-- 您还没有上传商品哦，赶紧去上传吧~ -->
		  <defaultpage :messageToPage="messageToPage4"  ></defaultpage>
		</view>
  </view>

</template>

<script>
  var webim = require('@/js/lib/im/webim_wx.js');
  var IMConfig = require('@/js/lib/im/config').IM;

  var config = {
    sdkAppID: IMConfig.sdkAppID,
    appIDAt3rd: IMConfig.appIDAt3rd, //用户所属应用id，必填
    accountType: IMConfig.accountType, //用户所属应用帐号类型，必填
    identifier: '', //当前用户ID,必须是否字符串类型，选填
    identifierNick: '', //当前用户昵称，选填
    userSig: '', //当前用户身份凭证，必须是字符串类型，选填
  };


  import messageItem from './messageItem';
	 import defaultpage from '@/components/defaultPage.vue';
  import systemMessageItem from '../_component/systemMessageItem';
	import uniLoadMore from '../../../template/uni-load-more.vue';
  export default {
    components: { messageItem,systemMessageItem,uniLoadMore,defaultpage},
    data () {
      return {
		  pageNo:1,
		  tab: 1,
		  statusCode:0,//0初始状态，1有数据，2无数据
		  list: [],
		  loadingType: 0,
		  contentText: {
			  contentdown: "上拉显示更多",
			  contentrefresh: "正在加载...",
			  contentnomore: "没有更多数据了"
		  },
		  messageToPage4: {
			  image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
			  title: '暂无任何消息~'
		  },

		  messageCount: 0,
		  isLogin: false,
      }
    },
		 onLoad (option) {
			 this.list = uni.getStorageSync('CACHE_MESSAGE') || [];
           this.loadingType = 1;


           var listeners = {
             "onMsgNotify": () => {
             },
           };
           config.identifier = this.currentUser.id;
           // config.identifierNick = this.currentUser.name;

           this.$api.getTLSSig().then(result => {
             config.userSig = result;
             uni.hideLoading();
             webim.login(config, listeners, {}, () => {
               this.isLogin = true;
               webim.syncMsgs(msgList => {
                 this.getList();
               })
             }, error => {
               console.error(error)
             });
           })


           // webim.syncMsgs(msgList => {
           //   console.log(msgList)
           // })

    },

    onShow() {

      this.list = [];
      this.pageNo=1;
      if (this.tab == 1) {
				this.list = uni.getStorageSync('CACHE_MESSAGE') || [];
        if (this.isLogin) this.getList();

      } else {
        this.getList();
	  }
    },
		methods:{
          remove (index) {
            this.list.splice(index, 1)
		  },
			tabTap(value){
				this.list = [];
				this.pageNo=1;
				this.loadingType = 0;
				this.tab=value;
				this.getList();
			},

          getSystemMessagePage () {
            return this.$api.getSystemMessagePage().then(result => {
            	this.messageCount = result.messageCount;
              const list = []

              const orbit = result.newestOrbit
			  if (orbit) {
                const orbitMessage = {
                  type: 'orbit',
                  C2cImage: 'http://card-1254165941.cosgz.myqcloud.com/images/guiji@2x.png',
                  UnreadMsgCount: -1, // 轨迹暂时以小红点代替
                  C2cNick: '轨迹',
                  MsgShow: orbit.content,
                  MsgTimeStamp: orbit.createTime / 1000,
                }
                list.push(orbitMessage);
			  }

              const complain = result.newestComplain
              if (complain) {
                const complainMessage = {
                  type: 'complain',
                  C2cImage: 'http://card-1254165941.cosgz.myqcloud.com/images/tousu@2x.png',
                  UnreadMsgCount: result.complainCount, // 轨迹暂时以小红点代替
                  C2cNick: '投诉',
                  MsgShow: complain.complainContent,
                  MsgTimeStamp: complain.createTime / 1000,
                }
                list.push(complainMessage);
			  }

              return Promise.resolve(list)
            })
		  },

          getRecentContactList () {
            return new Promise((resolve, reject) => {
              webim.getRecentContactList({
                'Count': 20 //最近的会话数 ,最大为 100
              },(resp) => {

                var sessMap = webim.MsgStore.sessMap();
                console.log('=============================')
                console.log(sessMap)
                console.log('=============================')

                for (var i in sessMap) {
                  var sess = sessMap[i];
                  resp.SessionItem.map((item, index) => {
                    if (item.To_Account == sess.id()) {
                      item.UnreadMsgCount = sess.unread()
                    }
                    return item;
                  })
                }
                resolve(resp.SessionItem || [])
                // this.list = resp.SessionItem
                // this.statusCode = 1;
                // this.loadingType = 2;
                //业务处理
              }, function(resp){
                resolve([])
              });
			})
		  },

			getList(){

			  if (this.tab == 1) {

                webim.syncMsgs(msgList => {
                  Promise.all([
                    this.getSystemMessagePage(),
                    this.getRecentContactList()
                  ]).then(resultList => {
                    //console.log(resultList)
                    const sysMsg = resultList[0];
                    const imMsg = resultList[1];
                    if (this.tab == 1) {
											this.list = [...sysMsg, ...imMsg].sort((a, b) => b.MsgTimeStamp - a.MsgTimeStamp)
										}

										uni.setStorageSync('CACHE_MESSAGE', this.list);
                    this.statusCode = 1;
                    this.loadingType = 2;
                  })

                })


                return;
			  }

			 this.$api.listSystemMessage(this.pageNo).then(res=>{
			 	this.messageCount = 0;
				 if (this.tab !== 1) {
					 this.list=[...this.list,...res.messageList];
				 }

				 if(res.messageList.length==0&&this.list.length>0){
						// 加载完毕
						this.loadingType = 2;
						this.statusCode=1;
				 }else if(res.messageList.length==0&&this.list.length==0){
						 // 无数据
						 this.loadingType = 2;
						 this.statusCode=2;
				 }else{
						 // 加载
						this.loadingType = 0;
						this.statusCode=1;
						this.pageNo+=1;
				 }
					 console.info(this.list.length)
					 console.info(this.statusCode)
			 }).catch(err=>{
				 console.info(err)

			 })
		},

		},
		// 触发
		onReachBottom() {
			 console.info(this.loadingType)
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.getList();
		},

  }

</script>

<style scoped lang="less">


  .page {
    background-color: #f5f5f5;
    min-height: 100vh
  }

  .tab-container {
    display: flex;
    background-color: #ffffff;
    position: fixed;
    width: 100%;
    top:0upx;
    z-index: 99;

    .tab {
      flex: 1;
      height: 88upx;
      line-height: 88upx;
      position: relative;
      text-align: center;
      font-size:28upx;
      color: #666666;

		.text {
			display: inline-block;
			position: relative;
		}


      &.active {
        color: #6B7AF8;
        &:after {
          content: "";
          width:80upx;
          height:6upx;
          background:rgba(107,122,248,1);
          border-radius:3upx;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
        }
      }

    }
  }

	.tab-content {
		padding-top: calc(88upx + 30upx);
	}

  .unread {
	  position: absolute;
	  width:28upx;
	  height:28upx;
	  line-height: 28upx;
	  background:rgba(255,65,65,1);
	  font-size:20upx;
	  text-align: center;
	  color:rgba(255,255,255,1);
	  border-radius: 50%;
	  top: 10upx;
	  right: 0;
	  transform: translateX(100%);
  }


</style>
