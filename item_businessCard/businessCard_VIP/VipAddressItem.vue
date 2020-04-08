<template>

  <view class="address-item" @click="itemclick">
    <view class="user">
      <view class="name">{{ datas.name }}</view>
      <view class="phone">{{ datas.phone }}</view>
    </view>
    <view class="address">
      收货地址：{{datas.province}} {{datas.city}} {{datas.area}} {{datas.detailedAddress}}
    </view>
    <view class="footer">
    
      <view class="btn-group">
        <view class="button" @click="editAddress">
          <image class="icon icon_edit" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/edit.png'"></image>编辑
        </view>
        <view class="button" @click="deleteAddress">
          <image class="icon icon_delete" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/shanchu1.png'" mode="aspectFit"></image>删除
        </view>
				<view class="buttonr" v-if="active">
					<image class="icon" src="http://card-1254165941.cos.ap-guangzhou.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.tCFJDDsn9IMYcfbde4a45a208fd776706229021fb759.png"></image>
				</view>
      </view>
    </view>

  </view>

</template>

<script>


  export default {
    name: "orderItem",
		data () {
			return {
				onlineSite:this.global.onlineSite,
			}
		},
		components: {
			
		},

    props: {
      datas: Object,
			active:{type:Boolean,default:false}
    },

    methods: {
			itemclick(){
				this.$emit("itemclick");
			},
			
      editAddress () {
        this.navigateTo('../../module/shop/addressAdd/addressAdd', this.datas)
      },

      deleteAddress (item) {
        const postDelete = () => {
          this.$api.deleteAddress(this.datas.id).then(result => {
            this.$emit('update');
          }).catch(error => {
            this.showError(error, '删除失败')
          })
        }

        uni.showModal({
          title: '提示',
          content: '是否删除该地址？',
          success: (res) => {
            if (res.confirm) {
              postDelete();
            }
          }
        });
      },

      changeValue () {
        if (this.datas.isDefault == 1) {
          return;
        }
        const postData = Object.assign({}, this.datas);
        postData.addressId = this.datas.id;
        for (const key in postData) {
          const newKey = key.replace(/_(\w)/g, (value, b) => value.replace('_', '').toUpperCase());
          postData[newKey] = postData[key]
          if (newKey !== key) delete postData.key
        }
        postData.isDefault = 1;

        this.$api.addOrUpdateAddress(postData).then(result => {
          this.$emit('update',postData);
        }).catch(error => {
          this.showError(error)
        })
      }

    },
		
  }

</script>

<style scoped lang="less">


  .address-item {
    background: #FFFFFF;
    border: 1upx solid #E1E1E1;
    border-radius: 10upx;
    margin-bottom: 30upx;
    padding: 40upx 30upx 35upx;
	
	
	
  }

  .user {
    font-size: 32upx;
    color: #333333;
    font-weight: bold;
    display: flex;
    margin-bottom: 3upx;
    line-height: 45upx;

    .name {
      width: 177upx;
      margin-right: 43upx;
    }
    .phone {
      font-size: 32upx;
      color: #333333;
    }
  }

  .address {
    font-size: 24upx;
    color: #666666;
    letter-spacing: 0.6upx;
    line-height: 36upx;
    padding-bottom: 36upx;
    border-bottom: 3upx solid #E1E1E1 ;
    margin-bottom: 40upx;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .default_address {
      font-size: 24upx;
      color: #333333;
			display: flex;
			align-items: center;
			text {
				margin-left: 16upx;
			}
    }
    .btn-group {
      display: flex;
    }
    .button {
      display: flex;
      align-items: center;
      font-size: 24upx;
      color: #666666;
      &+.button {
        margin-left: 40upx;
      }
			
			
    }
		
		.buttonr{
			display: flex;
      align-items: center;
      font-size: 24upx;
					font-size: 24upx;
					margin-left: 350upx;
			}
    .icon {
      display: inline-block;
      width: 30upx;
      height: 30upx;
      margin-right: 10upx;
    }
  }

// 	radio {
// 		width: 30upx;
// 		height: 30upx;
// 	}


</style>