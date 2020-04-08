<template>
  <view class="page">

    <view class="option" v-for="(option, index) in list" :key="option.id">
      <input class="option-name" placeholder="参数名" v-model="option.name">
      <input class="option-value" placeholder="参数属性" v-model="option.value">
      <view class="remove-icon" @click="removeRow(index)"></view>
    </view>

    <button class="btn-primary add-button" @click="addRow">新增参数</button>

    <view class="footer">
      <view class="btn-primary" @click="SubmitSuggestions">确认</view>
    </view>
  </view>

</template>

<script>

  import {mapState,mapMutations} from 'vuex';

  export default {
    data () {
      return {
        list: [],
        value: '',
        index: 0,
      }
    },

    computed: {
      ...mapState(['goodsParaneter'])
    },

    onShow() {
      this.list = this.goodsParaneter || [];
    },

    methods:{
      SubmitSuggestions () {
        this.setGoodsParaneter(this.list.filter(item => item.name));
        uni.navigateBack({
          delta: 1
        });
      },

      addRow () {
        this.list.push({
          id: Math.random().toString(36).substring(7),
          name: '',
          value: '',
        })
      },

      removeRow (index) {
        this.list.splice(index, 1);
      },

      ...mapMutations(['setGoodsParaneter'])
    },

  }

</script>

<style scoped lang="less">

  .page {
    min-height: 100vh;
    position: relative;
    box-sizing: border-box;
    padding-bottom: 120upx;
  }

  .option {
    display: flex;
    padding: 16upx;

    .option-name {
      width: 200upx;
      margin-right: 12upx;
      font-size: 28upx;
    }
    .option-value {
      flex: 1;
      font-size: 28upx;
    }
    .remove-icon {
      width: 48upx;
      height: 48upx;
      margin-left: 12upx;
      background-size: 100% 100%;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC2UlEQVRYhe2Xv08UQRTHv2+eR6yhYqCgssNEE+20ILH20IKCeAnJ5cidFMaaYhLpryEuXC4hOSsrj3+ABOgkgUQrO01goEHbC5fZZ3HL5W53du8HaKOv2sy+mc933r55+wb4143GmVSv1ydFZFZEpgGAiM6J6LRYLP78YwKCIJhj5oKI5AE8SHE7IaKmc65RLpe/34qAzc3NqVwutw6gAmBiSL1XAN4z87tBUckUEATBY6XUJwB6SHDcLBHlS6XSUZqDSntRq9VeKqX2bwAHAC0iB1tbWy/SHLwRiHa+D+DuDeC91iKip75IJARE3/wLbrZzn1lmno/nROITRAnng7dFZG8QJfJpe15p59x6fLBPQBAEc+hkewJOREsXFxfPiKiRBieiRuSzlCLidcTwC2DmAjxHTUQOrbW7xpjQWrviE0FEDWvtSuSzKyKHHgETSqlXqQKiIuPb2YLWescYo3wieuHGGKW13iGiBd9aAPoY3SSs1+uTzrnLlEmpIACIj4lIIWsdZp66TsZuBERkNmtS5FOIR2JUOAA452aun+/0LD49aGKPCBhjVowxIQCMAgcAItIAvgIZlfBvWVcAEZ0PMyGeB2mJmWUiYn0CTkeFa613sk5HmjnnuqyugCgrT0aBi0jBl5gDRBxXKpVfCQERpOmbISJ7WdnuE5FRtvsYfT+jIAjmlFLfkKyGbSJastbuZmX7dZS01s9F5COAXMzlipnvFYvFH14BALC9vV0F8MazfltEDjMqHIBOtIjoiQcOANXV1dW3vQOJY9hutzcA2Pg4gNwgONAp2ylwy8wb8cGEgLW1tcswDBcBtAbBRrAWEeV9/aG3EJXL5c8isnxLIloispzWF2Y2pbVa7ZGINDF+d3RGRItjNaUAUCqVjph5HkAVnVZ7WLsCUGXm+1lwYMSLSdRM5AE8THE7BtAMw/DDrV1MfBb1DjPRXw0iYpn5bJyr2X/7DTZZoyKzC68HAAAAAElFTkSuQmCC');
    }
  }

  .add-button {
    margin-top: 60upx;
    width: 80%;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100upx;
    border-top: 1upx solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    background-color: #ffffff;

    .btn-primary {
      width: 90%;
    }

  }


</style>