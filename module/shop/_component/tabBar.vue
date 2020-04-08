<template>
  <view class="tab-container">
    <view v-for="tab in tabList" class="tab-item" @click="navigate(tab)">
      <image :src="active === tab.text ? tab.selectedIconPath : tab.iconPath"></image>
      <view>{{ tab.text }}</view>
    </view>
  </view>

</template>

<script>
  export default {

    name: "tabBar",

    data () {
      return {
        tabList: [
          {
            text: '首页',
            iconPath : "http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/dianpu_un.png",
            selectedIconPath : "http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/dianpu.png",
						path: '../home/home',
          },
          {
            text: '查找商品',
            iconPath : "http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/sousuo_un.png",
            selectedIconPath : "http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/sousuo.png",
						path: '../search/search',
          },
          {
            chat: true,
            text: '客服',
            iconPath : "http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/kefu_un.png",
            selectedIconPath : "http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/kefu_un.png",
						path: '/module/message/chat/chat',
          },
        ],
      }
    },

    props: {
      active: String,
      shopId: String,
      recommendId: String,
      cardUserId: String,
    },
		
		methods: {
			navigate (tab) {
				if (tab.text === this.active) return;

              if (!this.checkHasLogin()) {
                return;
              }

				if (tab.chat) {
                  this.navigateTo(tab.path, { selToID: this.cardUserId, })
                } else {
                  uni.redirectTo({
                    url: tab.path + '?shopId=' + this.shopId + '&recommendId=' + this.recommendId
                  });
                }
			},
		},

  }
</script>

<style scoped lang="less">

  .tab-container {
		z-index:10;
    display: flex;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
		padding-bottom: 8upx;
    .tab-item {
      height: 98upx;
      flex: 1;
      color: #999999;
      text-align: center;
      font-size: 20upx;

      &.active {
        color: #7483FF;
      }

      image {
        width: 40upx;
        height: 40upx;
        margin-bottom: 8upx;
        margin-top: 14upx;
      }

    }

  }

</style>