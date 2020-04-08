<template>
  <view class="page" :class="{ expand: footerExpand || emoiconExpand }">

    <view class="message-list">

      <template v-for="(message, index) in showMessageList">

        <view class="tips" v-if="message.isTips"><view class="tips-info">{{ message.time }}</view></view>

        <view v-else class="message" :class="{ 'self-message': message.isSelfSend }">
          <image class="avatar" :src="message.headImage"></image>
          <view class="message-content-container">
            <view v-if="message.isGoods" style="width: 320upx">
              <goods-item :goods="message.goods" :auto="true"></goods-item>
            </view>
            <image v-else-if="message.image" class="message-image" :src="message.image" @click="previewImage(message.image)" mode="aspectFill" />
            <template v-else-if="message.isIntro">
              <view>您好！我是{{ message.intro.name }}，欢迎进入我的名片，有什么可以帮到您的吗？您可以在这里跟我实时沟通。</view>
              <view>通过我的名片您还可以：</view>
              <view class="action-list">
                <view class="action" @click="openUserDetail(message.intro.id)">进入名片</view>
                <view class="action" :class="{ disabled: !message.intro.phone }" @click="callPhone(message.intro.phone)">拨打我的电话</view>
                <view class="action" v-if="message.intro.latitude" @click="openUserLocation(message.intro)">查看我的位置</view>
              </view>
            </template>
            <template v-else>
              <template v-for="(elem, elemIndex) in message.elems">
                <image v-if="elem._isFace" class="face-icon" :src="elem._content"></image>
                <template v-else>{{ elem._content.text }}</template>
              </template>
            </template>
          </view>
        </view>
      </template>

    </view>


    <view class="footer-container">
      <view class="footer">
        <!--<image class="ic ic-voice" src="/static/chat/yuyin@2x.png"></image>-->
        <view class="input-container">
          <input v-model="message" confirm-type="send" @confirm="sendMessage()" :focus="isFocus" @blur="isFocus = false" />
          <image class="ic ic-expression" src="/static/chat/biaoqing@2x.png" @click="emoiconExpand = !emoiconExpand"></image>
        </view>
        <image @click="footerExpand = !footerExpand" class="ic ic-more" :src="footerExpand ? '/static/chat/jianpan@2x.png' : '/static/chat/zhankai@2x.png'"></image>
      </view>
      <!-- 底部展开 -->
      <view class="footer-expand" v-if="footerExpand || emoiconExpand">

        <view class="emoicon-pane" v-if="emoiconExpand">
          <image v-for="icon in emoicon" @click="appendEmoicon(icon)" :src="'http://card-1254165941.cosgz.myqcloud.com/emoticon/emoicon/' + icon.src" />
        </view>

        <view class="list" v-if="footerExpand">
          <view class="item" @click="selectImageBySelect"><image class="icon" src="/static/chat/zhaop@2x.png" /><view class="name">图片</view></view>
          <view class="item" @click="selectImageByCamera"><image class="icon" src="/static/chat/xiangji@2x.png" /><view class="name">相机</view></view>
          <view class="item" @click="openQuickModal"><image class="icon" src="/static/chat/xiaoxihuif@2x.png" /><view class="name">快捷回复</view></view>
          <view class="item" :class="{ disabled: noShop }" @click="collectShop">
            <template v-if="isCollect">
              <image class="icon" src="/static/chat/shoucang@2x.png" /><view class="name active">已收藏店铺</view>
            </template>
            <template v-else>
              <image class="icon" src="/static/chat/shoucangun@2x.png" /><view class="name">收藏店铺</view>
            </template>
          </view>
          <view class="item" :class="{ disabled: noShop }" @click="openShopHome"><image class="icon" src="/static/chat/dianpu@2x.png" /><view class="name">进入店铺</view></view>
        </view>
      </view>
    </view>

    <quick-message-modal ref="quickMessageModal" @send="sendQuickMessage"></quick-message-modal>

  </view>
</template>

<script>

  // import IM from '../../lib/im/IM2.js';

  const TYPE_MESSAGE = 1;

  import isToday from 'date-fns/is_today'
  import format from 'date-fns/format'

  import GoodsItem from "@/components/goodsItem";
  import QuickMessageModal from "./QuickMessageModal";
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

  const emoicon = [
  ]

  for (let i = 1; i < 100; i++) {
    emoicon.push({ key: `\:[${i}]`, src: i + '.gif' })
  }

  export default {
    name: "Chat",

    components: {QuickMessageModal, GoodsItem},

    data () {
      return {
        emoicon,

        isFocus: false,
        message: '',
        footerExpand: false,
        emoiconExpand: false,

        selToID: '61',
        messageList: [],

        headImage: '',

        shopId: '',
        isCollect: false,

        isLoadRemoteMsg: false,
        noMore: false,
        LastedMsgTime: 0,

        noShop: false,

        user: {},
      }
    },

    computed: {
       showMessageList () {
         const list = []
         let time = '';
         // if (first && first.type === TYPE_MESSAGE) {
         //   time = first.showTime;
         // }
         this.messageList.forEach(item => {
           if (item.type === TYPE_MESSAGE) {
             if (item.showTime !== time) {
               time = item.showTime;
               list.push({ time, isTips: true, })
             }
           }
           list.push(item);
         })

         return list;
       },

      UPinfo () {
         return this.$store.state.UPinfo;
      },
      isPrivacy() {
        //陌生人是否可见 0可见 1不可见
        return Number(this.user.strangerCanSee) != 0;
      },
    },

    watch: {
      footerExpand (val) {
        if (val) this.emoiconExpand = false;
      },
      emoiconExpand (val) {
        if (val) this.footerExpand = false;
      },
    },

    onLoad (option) {
      var listeners = {
        "onMsgNotify": this.onMsgNotify,
      };

      const goods = uni.getStorageSync('_goods');
      uni.removeStorageSync('_goods');

      this.selToID = option.selToID;
      this.headImage = option.headImage;
      this.channel = option.channel;

      const isFormContactList = this.channel === 'history';
      const isFormBuyer = this.channel === 'buyer';
      const isFormCard = this.channel === 'card';

      if (!this.currentUser.id) {
        config.identifier = uni.getStorageSync('openid');
        config.identifierNick = this.UPinfo.nickName;
      } else {
        config.identifier = this.currentUser.id;
        config.identifierNick = this.currentUser.name;
      }

      console.log(this.UPinfo)

      if (this.selToID == this.currentUser.id) {
        uni.navigateBack();
        return;
      }

      uni.showLoading();

      let username = '';
      let shopName = '';
      let chatUserShopId = '';
      let user = {};
			console.log(this.selToID,'this.selToID')

      // 如果是 openId 用户，即该用户未注册
      if (!this.selToID.match(/^\d+$/)) {
        this.noShop = true;
        uni.setNavigationBarTitle({ title: option.title });
        this.$api.getTLSSig().then(result => {
          config.userSig = result;
          uni.hideLoading();
          console.log(config)
          webim.login(config, listeners,{}, () => {
            this.getMessage().then(result => {
            });
          });
        }).catch(error => {
          console.error(error)
          uni.hideLoading();
        });
        return;
      }

      this.$api.getUserCardDetails(this.selToID).then(result => {
        user = result.userMap;
        this.user = user;
        username = user.name;
        chatUserShopId = user.shopId;
        this.headImage = user.headImage;
        this.shopId = isFormBuyer ? this.currentUser.shopId : user.shopId || this.currentUser.shopId;
        if (this.shopId) {
          this.noShop = false;
          return this.$api.getShopDetail(this.shopId);
        } else {
          this.noShop = true;
          return Promise.resolve()
        }
      }).then(result => {
        if (result) {
          shopName = result.shopData.shopName;
          this.isCollect = result.collectStatus == 1;
        }
        // 如果不是从聊天列表进入
        if (!isFormContactList && !isFormBuyer && !isFormCard) {
          uni.setNavigationBarTitle({title: shopName});
        } else {
          uni.setNavigationBarTitle({title: user.name});
        }

        if (this.currentUser.id) {
          return this.$api.getTLSSig();
        } else {
          return this.$api.getTLSSigByOpenId(config.identifier);
        }
      }).then(result => {
        config.userSig = result;
        uni.hideLoading();
        console.log(config)
        webim.login(config, listeners,{}, () => {

          if (!this.currentUser.id) {
            const options = {
              "ProfileItem": [{
                "Tag": "Tag_Profile_IM_Nick",
                "Value": this.UPinfo.nickName
              },
                {
                  "Tag": "Tag_Profile_IM_Image",
                  "Value": this.UPinfo.avatarUrl
                }
              ]
            }
            webim.setProfilePortrait(options, () => (console.log('更新资料成功')));
          }





          this.getMessage().then(result => {

            if (goods) {
              this.sendGoods(goods);
            }

            if (chatUserShopId && !isFormContactList && !isFormBuyer && !isFormCard) {
              this.messageList.push({ time: `${shopName} ${username}为您服务`, isTips: true, })
            }

          });

          // this.sendImage();
        });
      }).catch(error => {
        console.error(error)
        uni.hideLoading();
      })

    },

    onShow () {
      if (this.$refs.quickMessageModal) {
        this.$refs.quickMessageModal.onShow();
      }
    },

    onPageScroll (e) {
      if (e.scrollTop === 0 && this.isLoadRemoteMsg && !this.noMore && !this.msgLoading) {
        console.log('=================')
        console.log('load more')
        console.log('=================')
        this.getMessage();
      }
      // console.log(e.scrollTop)
    },

    methods: {
      sendMessage (quickMessage) {
        let sendMessage = quickMessage || this.message;
        if (sendMessage.trim().length === 0) {
          this.showTips('发送内容不能为空');
          return;
        }

        var isSend = true; //是否为自己发送
        var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
        var subType = webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型


        var selType = webim.SESSION_TYPE.C2C;
        var selToID = this.selToID;
		console.log("selToID",selToID)

        var selSess = new webim.Session(selType, selToID, selToID, this.currentUser.headImage, Math.round(new Date().getTime() / 1000));
        console.log(selSess)
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, config.identifier, subType, this.currentUser.headImage);



        var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;

      const emotions = sendMessage.match(/:\[(.*?)\]/g);
        if (!emotions || emotions.length < 1) {
          text_obj = new webim.Msg.Elem.Text(sendMessage);
          msg.addText(text_obj);
        } else {
          for (var i = 0; i < emotions.length; i++) {
            tmsg = sendMessage.substring(0, sendMessage.indexOf(emotions[i]));
            if (tmsg) {
              text_obj = new webim.Msg.Elem.Text(tmsg);
              msg.addText(text_obj);
            }
            emotionIndex = this.emoicon.findIndex(item => item.key === emotions[i]);
            emotion = this.emoicon[emotionIndex];
            if (emotion) {
              face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
              msg.addFace(face_obj);
            } else {
              text_obj = new webim.Msg.Elem.Text(emotions[i]);
              msg.addText(text_obj);
            }
            restMsgIndex = sendMessage.indexOf(emotions[i]) + emotions[i].length;
            sendMessage = sendMessage.substring(restMsgIndex);
          }
          if (sendMessage) {
            text_obj = new webim.Msg.Elem.Text(sendMessage);
            msg.addText(text_obj);
          }
        }

		const oldMessage = this.message;
        if (!quickMessage) this.message = '';
        this.addMsg(msg);
        this.scrollToBottom()
		console.log(msg)
		let that = this;
        webim.sendMsg(msg, function(resp) {
          webim.Log.info("发消息成功", resp);
		  //发送通知
			that.$api.imReplyNotice(that.selToID,oldMessage)
		  
		  
        }, function(err) {
          webim.Log.error("发消息失败:" + err.ErrorInfo);
          console.error("发消息失败:" + err.ErrorInfo);
        });
      },

      sendImage (url) {
        var isSend = true; //是否为自己发送
        var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
        var subType = webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型


        var selType = webim.SESSION_TYPE.C2C;
        var selToID = this.selToID

        var selSess = new webim.Session(selType, selToID, selToID, this.currentUser.headImage, Math.round(new Date().getTime() / 1000));
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, config.identifier, subType, '');

        var images_obj = new webim.Msg.Elem.Images('cb');
        var newImg = new webim.Msg.Elem.Images.Image(1, 1232, 132, 132, url);
        images_obj.addImage(newImg);
        msg.addImage(images_obj);

        this.message = '';
        this.addMsg(msg);
        this.scrollToBottom()

        webim.sendMsg(msg, function(resp) {
          webim.Log.info("发消息成功", resp);
        }, function(err) {
          webim.Log.error("发消息失败:" + err.ErrorInfo);
          console.error("发消息失败:" + err.ErrorInfo);
        });
      },

      sendGoods (goods) {
        var isSend = true; //是否为自己发送
        var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
        var subType = webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型


        var selType = webim.SESSION_TYPE.C2C;
        var selToID = this.selToID

        var selSess = new webim.Session(selType, selToID, selToID, this.currentUser.headImage, Math.round(new Date().getTime() / 1000));
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, config.identifier, subType, '');

        var data = goods;
        var custom_obj = new webim.Msg.Elem.Custom(JSON.stringify(data), '', '');
        msg.addCustom(custom_obj);

        this.message = '';
        this.addMsg(msg);
        this.scrollToBottom()

        webim.sendMsg(msg, function(resp) {
          webim.Log.info("发消息成功", resp);
        }, function(err) {
          webim.Log.error("发消息失败:" + err.ErrorInfo);
          console.error("发消息失败:" + err.ErrorInfo);
        });
      },

      sendIntro () {
        this.$api.sendIntroMsgByServe(this.selToID, config.identifier).then(result => {
          this.scrollToBottom()
          const chatList = uni.getStorageSync('firstChatList') || [];
          chatList.push(this.selToID);
          uni.setStorageSync('firstChatList', chatList)
        });
      },

      onMsgNotify (newMsgList) {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log(newMsgList)
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

        var sess, newMsg, selSess;
        //获取所有聊天会话
        var sessMap = webim.MsgStore.sessMap();
        for (var j in newMsgList) {//遍历新消息
          newMsg = newMsgList[j];
          if (newMsg.getSession().id() == this.selToID) {//为当前聊天对象的消息
            selSess = newMsg.getSession();
            //在聊天窗体中新增一条消息
            //console.warn(newMsg);
            this.addMsg(newMsg);
            this.scrollToBottom()
          }
        }

        //消息已读上报，以及设置会话自动已读标记
        webim.setAutoRead(selSess, true, true);


      },

      transformMessage (msg) {
        const isSelfSend = msg.getIsSend();
        const subType = msg.getSubType();
        const time = msg.getTime();

        const elems = msg.getElems();
        let isGoods = false;
        let isImage = false;
        let isIntro = false;
        let image = '';
        let goods = {};
        let intro = {
          id: '',
          phone: '',
        };

        elems.forEach(elem => {
          console.log(elem)
          if (elem.type === webim.MSG_ELEMENT_TYPE.CUSTOM) {
            let data = null;
            try {
              data = JSON.parse(elem.content.data || '');
            } catch (e) {
            }
            if (data) {
              if (data.goodsId || data.id) {
                isGoods = true;
              }
              if (data.type === 'intro') {
                isIntro = true;
                if (isSelfSend) {
                  intro.id = this.currentUser.id;
                  intro.phone = this.currentUser.phone;
                  intro.name = this.currentUser.name;
                  intro.longitude = this.currentUser.longitude;
                  intro.latitude = this.currentUser.latitude;
                } else {
                  intro.id = this.user.id;
                  intro.phone = this.user.phone;
                  intro.name = this.user.name;
                  intro.longitude = this.user.longitude;
                  intro.latitude = this.user.latitude;
                }
              }
            }
          }

          isImage = elem.type === webim.MSG_ELEMENT_TYPE.IMAGE;
          if (isGoods && elem.content.data) {
            goods = JSON.parse(elem.content.data)
          }
          if (isImage) {
            image = elem.content.ImageInfoArray[0].url;
          }
          if (elem.type === webim.MSG_ELEMENT_TYPE.FACE) {
            elem._isFace = true;
            elem._content = this.emoicon[elem.getContent().index] ? 'http://card-1254165941.cosgz.myqcloud.com/emoticon/emoicon/' + this.emoicon[elem.getContent().index].src : '';
          } else {
            elem._content = elem.getContent();
          }

        })

        let showTime = '';
        const today = isToday(new Date(msg.time * 1000));
        showTime = format(msg.time * 1000, today ? 'HH:mm' : 'MM-DD HH:mm')

        let headImage = this.headImage;
        if (isSelfSend) {
          if (!this.currentUser.id) {
            headImage = this.UPinfo.avatarUrl;
          } else {
            headImage = this.currentUser.headImage;
          }
        }
        console.log(headImage)

        return {
          headImage,
          type: TYPE_MESSAGE,
          showTime,
          isSelfSend,
          subType,
          time,
          elems,

          isGoods,
          goods,

          isIntro,
          intro: intro,

          image,
        }
      },

      addMsg (msg) {
        const message = this.transformMessage(msg);
        this.messageList.push(message);
      },

      getMessage () {
        // var sessMap = webim.MsgStore.sessMap();
        // console.log(sessMap);


        return new Promise((resolve, reject) => {
          var options = {
            'Peer_Account': this.selToID, //好友帐号
            'MaxCnt': 10, //拉取消息条数
            'LastMsgTime': this.LastedMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
            'MsgKey': ''
          };

          this.msgLoading = true;
          webim.getC2CHistoryMsgs(
              options,
              (resp) => {
                this.msgLoading = false;



                // for (const message of resp.MsgList) {
                //   this.addMsg(message);
                // }
                const msgList = resp.MsgList.map(item => this.transformMessage(item));
                this.messageList.unshift(...msgList);

                if (this.LastedMsgTime === 0) {
                  this.scrollToBottom();
                }

                this.isLoadRemoteMsg = true;
                var firstMsg = resp.MsgList[0];
                var lastMsg = resp.MsgList[resp.MsgList.length - 1];
                if (lastMsg) {
                  var opts = {
                    'To_Account': this.selToID, //好友帐号
                    'LastedMsgTime': lastMsg.getTime() //消息时间戳
                  };

                  webim.c2CMsgReaded(opts, (resp) => {
                  });
                } else {
                  this.noMore = true;
                }

                if (firstMsg) {
                  this.LastedMsgTime = firstMsg.getTime() - 1;
                }

                resolve();
              },
              error => {
                this.msgLoading = false;
                reject(error)
              }
          );
        })



        // webim.getLastC2CHistoryMsgs(messageList => {
        //   for (const message of messageList) {
        //     this.addMsg(message);
        //   }
        // });


      },

      scrollToBottom () {
        setTimeout(() => {
          uni.pageScrollTo({ scrollTop: 9999, duration: 100 });
        }, 100)
      },

      previewImage (url) {
        uni.previewImage({
          current: url,
          urls: [url],
        })
      },

      openQuickModal () {
        this.$refs.quickMessageModal.show();
      },

      chooseImage (sourceType) {
        uni.chooseImage({
          count: 1,
          sourceType,
          sizeType: ['compressed'],
          success: (res) => {
            uni.showLoading({ title: '上传中...' });
            let count = res.tempFilePaths.length;
            for (const path of res.tempFilePaths) {
              this.uniUploadFile(path, url => {
                this.sendImage(url);
              }, null, () => {
                uni.hideLoading();
              });
            }
          }
        })
      },

      selectImageBySelect () {
        this.chooseImage(['album']);
      },

      selectImageByCamera () {
        this.chooseImage(['camera']);
      },

      collectShop () {
        if (this.noShop) {
          return;
        }
        if (!this.checkHasLogin()) {
          return false
        }
        this.$api.collect(this.currentUser.id, this.shopId, 2).then(res=>{
          this.isCollect = !this.isCollect
          uni.showToast({
            title: this.isCollect ? '收藏成功' : '已取消',
            duration: 2000
          });
        })
      },

      openShopHome () {
        if (this.noShop) {
          return;
        }
        this.navigateTo('/module/shop/home/home',{
          shopIdOtherPeople: this.shopId,
          cardUserId: this.selToID,
        });
      },

      sendQuickMessage (message) {
        console.log(message)
        this.sendMessage(message.content);
      },

      appendEmoicon (icon) {
        this.isFocus = true;
        this.message += icon.key;
      },

      openUserDetail (id) {
        uni.navigateTo({
          url: '/pages/businessCard2/businessCard2?cardUserId=' + id
        });
      },

      callPhone (phone) {
        if (!phone || this.isPrivacy) {
          this.showTips('对方设置了号码隐藏')
          return;
        }
        uni.makePhoneCall({
          phoneNumber: phone
        });
      },

      openUserLocation (intro) {
        this.navigateTo('/module/message/chat/UserLocation', { longitude: intro.longitude ,latitude: intro.latitude })
      }

    }

  }
</script>

<style scoped lang="less">

  .page {
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: 40upx;
    background-color: #EAEAEA;
    padding-bottom: 98upx;

    display: flex;
    flex-direction: column;

    &.expand {
      padding-bottom: calc(98upx + 478upx + 20upx);
    }

  }

  .tips {
    text-align: center;
    height: 40upx;
    margin-bottom: 28upx;
  }

  .tips-info {
    height:40upx;
    line-height:40upx;
    display: inline-block;
    padding: 0 20upx;
    background:rgba(204,204,204,1);
    border-radius:20upx;

    font-size:24upx;
    color:rgba(255,255,255,1);
    margin: 0 auto;
  }

  .footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .footer {
    width: 100%;
    height: 98upx;
    background:rgba(245,245,245,1);
    display: flex;
    padding: 0 30upx;
    box-sizing: border-box;
    align-items: center;

    .ic {
      width: 58upx;
      height: 58upx;
    }

    .input-container {
      position: relative;
      flex: 1;
      margin-right: 20upx;

      input {
        height: 72upx;
        background-color: #ffffff;
        padding: 0 20upx;
        padding-right: 60upx;
      }

      .ic-expression {
        position: absolute;
        width:40upx;
        height:40upx;
        right: 20upx;
        z-index: 99;
        top: 50%;
        transform: translateY(-50%);
      }

    }

  }

  .footer-expand {
    border-top: 1upx solid #E1E1E1;
    background-color: #F5F5F5;
    .list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 40upx;
      padding-bottom: 36upx;
      box-sizing: border-box;
      height: 478upx;

      .item {
        width: 33.33%;
        text-align: center;
        margin-bottom: 35upx;
        &.disabled {
          opacity: 0.5;
        }
        .icon {
          width:130upx;
          height:130upx;
        }
        .name {
          font-size:24upx;
          color:rgba(136,136,136,1);
          line-height:33upx;
          &.active {
            color: #6B7AF8;
          }
        }
      }
    }
  }

  .message-list {
    padding: 0 32upx;
    box-sizing: border-box;
    flex: 1;
  }

  .message {
    margin-bottom: 30upx;
    display: flex;

    &.self-message {
      flex-direction: row-reverse;
      .avatar {
        margin-right: 0;
        margin-left: 16upx;
      }
      .message-content-container {
        background:linear-gradient(90deg,rgba(121,135,255,1) 0%,rgba(131,144,255,1) 100%);
        color: #ffffff;

        &:after {
          left: initial;
          right: -2upx;
          top: 10upx;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAiCAYAAAAge+tMAAADK0lEQVRYR9XYT2wUZRjH8e+zpYXaptAF2tIYFGMiEkPin0gMeDAxMUbTcFA4SExaYjZisgNED9ppounulop/9o/UaAxKwokbFwMBwkEO6sXIBa54k6BRNBBY5v2Z2dKmtNt2WHe300kmc3nnnc/7zvO+7/O+RswuSTZWYscHafthIZrFzE22oCcwXhlO2/iygo8W9I7BU75ne5cXPK+TZiR9z55fNvBiUV3XxVWJv0f2W++ygWeLetM5joXgztV0Hxi0v+bDx2pwZvI6JXgpxFqCbX7afo49fHxCj5XLXJKodGYiweBw2r6LPTyb14SDt6egZnzje/ZWrOG5L7Q2CPgN8cAM+GXfs8djDc/k9blg/2xkezvr303ZtWr4JR+coyVtIuAy0DYbaMZO37OTsYRn8joheL0qzvjE9+y92MEzRb0hx/F549j40ffsuVjBxyb0yJ0yvyC6Flghb3f0s+bgLrs5J4yWIjs8f14rLvzKBWDbot83Xh7x7FQs4KMF5RDvL4oOV1DjaLVMsemzSragF5w4Gy6OUeDAnz3t9KVSVp5ZvqnwbF5bHZwD1kVETxarEi5Ng48V9WQgzkisvS/0POHSFPhYQU8HVNDd94u+W35OuDQcninqWTlOA2tqRFcNl4bCcyVtDxzfLzJXR2qPGd/6ng1NJ2GR3qqhULjpRXxWLQepobpwgN5oX8VDU0lX3Xu8sm90fC3YXRNwoZeMj0Y8+3ByoqnjlStpIHAcQTxYx2qnqzLjj/Wr2JhK2Y26wA8VtLEMnyJeawT4noUngeenrfi/4Ie/VM+tWwxjpCRWNhpdCRHjyvatPFoTPFfSZjn2SQwJOpoBntXreyLDw0H3j+NVGYMSLzYbew/cuDgvPDw1HT/ClrJjB2KASeyc7dVSNcDCHXZrCy3lOyQD6DOxwcTDTjxjVknyXXgLnIGAVkSbwqdVGtJmokNGZ3gAZdAxdTbSyEZFDpWoiPBPfXyUTv1Ld7CCpHMkW0TSiXUGvYKe8DboQ/TLKs/pY4mo36k7POqHZ5Y79JVWu9tsCKA/EUw2RqIH6DWjW9BlVGat8O//bsZP/wGEOBPIvDfGfgAAAABJRU5ErkJggg==');
        }

      }
    }

    .message-image {
      max-width: 320upx;
      height: 320upx;
    }

    .avatar {
      width:72upx;
      height:72upx;
      border-radius:4upx;
      margin-right: 16upx;
    }
    .message-content-container {
      width:auto;
      max-width: 420upx;
      display: inline-block;
      background:linear-gradient(90deg,rgba(121,135,255,1) 0%,rgba(131,144,255,1) 100%);
      line-height:40upx;
      padding: 18upx 20upx;
      border-radius: 30upx;
      background: #ffffff;
      color: #333333;
      position: relative;
      font-size:28upx;

      &:after {
        content: "";
        position: absolute;
        left: -2upx;
        top: 10upx;
        width: 23upx;
        height: 17upx;
        background-size: 100% 100%;
        transform: rotateX(180deg);
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAiCAYAAAAge+tMAAAClUlEQVRYR9WYS6hNYRTHf3+hmBBidk2ZKBMMGCEyuTMTyiMZUMqjlAkTGZgwQNKlxEAMJJJSBq5EHpE8Sl7J9X51Kc+lpX2077HP3t855zv7nLPra5/a6/uv3/7O+ta39hIFl5nNAfolWZFtmc9V5MzMNgNnJN0psi3zeQh4H3BD0p4ywYp8hYBfBN5L6i0SK/N5CPgrYAwwUdLnMuHyfOWCm9lY4EMisEzS4W4BnwFcSWDPSVrYLeDLgUMJrKfDqZIedAJ8UagcAFalQPdJWtMN4PeAKSnQr0CPpHfthq+54mY2AXiTAbhL0vpOBve8fTID8Lv/C5IetxM+b8V3AptqwB2XtLhTwS8Ds3Lglko62i74zBU3s1HAR2BkDpifotMlPWoHfC1wP2jOBgD54TRb0s8A26gmtcC9IlwZ6GmHpC2BttHM/gM3sxHAS2BcoJffwDxJFwLto5hlgYeGSRrgLTBX0u0oVAEiWeD1hEnahZ+m8yXdDPDbtMkQ8AbCpBrAS2CHv940WYFANXgjYVLtwtPoAklXWwlfDX4QWBHBoef4RZIuRdDKlPgHnhRVT4HRkZx5TbOhVR/ZafBtwNZI0GmZY8Dq2N+rf8HNzFf5GTC+BeAu+RxYK+lULP0K+DpgdyzRHJ0TwEZJvkhNXTKz4cBDYHJTSuGTvwH7ge2SXodPG2rp4EuAI40KNDHvC+BZbK+k+/XqOPgtYFq9EyPbn0+6CadDN7GDd1IX1lOov4Rv4n7gbq0ucVngvjgeGoPJ8N8O6eNH6u7JYlhq+EF2DXiSVKwD3scEfjUK7m0KL31fJHffZD68z+iVootXhtcvg7H76w7u/e+ZwKTkTX3X+5u6QwdxoAqkgw5I+hQ5xuuW+wPreuYzNu5Z6gAAAABJRU5ErkJggg==');
      }

    }
  }


  .emoicon-pane {
    height: 478upx;
    display: flex;
    flex-wrap: wrap;
    padding: 10upx;
    box-sizing: border-box;
    overflow-y: auto;
    justify-content: center;

    image {
      display: inline-block;
      width: 56upx;
      height: 56upx;
      margin-right: 8upx;
      margin-bottom: 8upx;
    }

  }

  .face-icon {
    display: inline-block;
    width: 56upx;
    height: 56upx;
    margin: 0 4upx;
  }

  .action-list {
    margin-top: 12upx;
    .action {
      font-size: 28upx;
      border: 1upx solid #dcdcdc;
      border-radius: 12upx;
      line-height: 60upx;
      padding: 0 16upx;
      background-color: #ffffff;
      color: #333333;
      &.disabled {
        opacity: 0.5;
      }
      &+.action {
        margin-top: 12upx;
      }
    }
  }

</style>
