<template>
  <view class="message" @click="openMessage" @longtap="longtap" @touchend="onTouchend">
    <view class="avatar-container">
      <img class="avatar" :src="item.C2cImage">
      <view class="unread" v-if="item.UnreadMsgCount > 0">{{ item.UnreadMsgCount }}</view>
    </view>
    <view class="content">
      <view class="name">{{ item.C2cNick }}</view>
      <view class="last_message single-line">{{ item.MsgShow }}</view>
    </view>
    <view class="date">{{ time }}</view>
  </view>

</template>

<script>

  var webim = require('@/js/lib/im/webim_wx.js');
  import isToday from 'date-fns/is_today'
  import isYesterday from 'date-fns/is_yesterday'
  import isThisYear from 'date-fns/is_this_year'
  import format from 'date-fns/format'

  export default {
    name: "messageItem",

    data () {
      return {
        lock: false,
      }
    },

    props: {
      item: Object,
    },

    computed: {
      time () {
        let date = this.item.MsgTimeStamp * 1000;
        if (isToday(date)) {
          return format(date, 'HH:mm')
        }
        if (isYesterday(date)) {
          return '昨天';
        }
        if (isThisYear(date)) {
          return format(date, 'MM-DD')
        }
        return format(date, 'YYYY-MM-DD')
      }
    },

    methods: {

      openMessage () {
        if (this.lock) return;

        // 消息类型判断
        if (this.item.type === 'orbit') {  // 轨迹
          this.navigateTo('/module/message/track/track')
        } else if (this.item.type === 'complain') { // 投诉
          this.navigateTo('/module/message/complain/complain')
        } else {
          this.navigateTo('/module/message/chat/chat', {
            selToID: this.item.To_Account,
            title: this.item.C2cNick,
            headImage: this.item.C2cImage,
            channel: 'history'
          })
        }
      },

      onTouchend () {
        if (this.lock) {
          setTimeout(() => {
            this.lock = false;
          }, 100);
        }
      },

      longtap () {
        this.lock = true;
        if (this.item.type) return;
        const vue = this;
        uni.showActionSheet({
          itemList: ['标记已读', '删除'],
          success (res) {
            if (res.tapIndex === 0) {
              vue.markRead();
            } else {
              vue.remove();
            }
          },
        });
      },

      markRead () {

        const vue = this;
        var data = {
          'To_Account': this.item.To_Account,
          'LastedMsgTime': this.item.MsgTimeStamp
        }
        webim.c2CMsgReaded(
            data,
            (resp) => {

              var sessMap = webim.MsgStore.sessMap();
              console.log(sessMap)
              for (var i in sessMap) {
                var sess = sessMap[i];
                console.log(sess)
                if (vue.item.To_Account == sess.id()) {

                  sess._impl.unread = 0;
                }
              }

              vue.item.UnreadMsgCount = 0;
              uni.hideLoading()
            }
        );
      },

      remove () {
        const vue = this;
        uni.showLoading();
        var data = {
          'To_Account': this.item.To_Account,
          'chatType': 1
        }
        webim.deleteChat(
            data,
            (resp) => {
              uni.hideLoading()
              vue.$emit('remove')
            }
        );
      },

    },

  }

</script>

<style scoped lang="less">


  .message {
    position: relative;
    display: flex;
    padding: 40upx 30upx;
    background-color: #ffffff;
    border-bottom: 1upx solid #e1e1e1;

    &:last-of-type {
      border-bottom: none;
    }

    &:active {
      background-color: #eee;
    }

    &.unread {
      .avatar-container:after {
        content: "";
        width:20upx;
        height:20upx;
        border-radius: 50%;
        background:rgba(255,65,65,1);
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
      }
    }

    .avatar-container {
      margin-right: 30upx;
      position: relative;

      .unread {
        position: absolute;
        width:36upx;
        height:36upx;
        line-height: 36upx;
        background:rgba(255,65,65,1);
        font-size:20upx;
        text-align: center;
        color:rgba(255,255,255,1);
        border-radius: 50%;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
      }

      .avatar {
        width: 100upx;
        height: 100upx ;
      }
    }
    .content {
      flex: 1;
      overflow: hidden;

      .name {
        font-size:32upx;
        color: #333333;
        font-weight: bold;
        margin-bottom: 15upx;
      }
      .last_message {
        font-size:28upx;
        color: #999999;
      }
    }
    .date {
      font-size:24upx;
      color: #999;
    }
  }


</style>