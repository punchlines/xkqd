<template>

  <view class="page">
    <view class="address-list">
      <address-item v-for="address in list" :datas="address" @update="update"></address-item>
    </view>
    <view class="footer">
      <button class="btn-primary" @click="openAddAddress">
        <image class="icon" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/add.png'"></image>添加新地址
      </button>
    </view>
  </view>

</template>

<script>


  import addressItem from '../_component/addressItem.vue';

  export default {

    components: { addressItem },

    data () {
      return {
        list: [],
				onlineSite:this.global.onlineSite,
      }
    },

    onShow () {
      this.fetch();
    },

    methods: {
      fetch () {
        this.$api.getAddressList().then(result => {
          this.list = result;
					
          console.log(result)
        })
      },
      openAddAddress () {
        uni.navigateTo({ url: '../addressAdd/addressAdd' });
      },
      update () {
        this.fetch();
      },
    },
		onLoad(options) {
			console.log(options.adressFrom);
		}
  }

</script>

<style scoped lang="less">


  .page {
    background-color: #f5f5f5;
    padding-bottom: 100upx;
    box-sizing: border-box;
    min-height: calc(100vh - 100upx);
  }

  .address-list {
    padding: 40upx 30upx;
  }

  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100upx;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-primary {
      width: 620upx;
      font-size: 32upx;
      color: #FFFFFF;
	  height: 80upx;
	  line-height: 80upx;

      .icon {
				display: inline-block;
        width: 30upx;
        height: 30upx;
        margin-right: 20upx;
				vertical-align: middle;
				margin-top: -0.2em;
      }

    }

  }


</style>