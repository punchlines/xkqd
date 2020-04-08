<template>
  <view class="vip-flag" :class="vipClass">
    {{ vipType }}
  </view>
</template>

<script>

  const VIP_MAP = {
    1: '普通用户',
    2: '黄金会员',
    3: '铂金会员',
    4: '钻石会员',
    5: '销售总监',
    6: '销售经理',
  }

  export default {

    name: "VipFlag",

    props: {
      // 2 => VIP1  黄金会员
      // 3 => VIP2  铂金会员
      // 4 => VIP3  钻石会员
      type: {
        type: Number,
        default: 1,
      }
    },

    computed: {
      vipClass () {
        return `vip${this.type - 1}`
      },

      vipType () {
        return VIP_MAP[Number(this.type)]
      },
    },

  }
</script>

<style scoped>

  .vip-flag {
    display: inline-block;
    height:32upx;
    line-height:32upx;
    background: #DEDEDE;
    border-radius:18px;
    text-align: center;
    padding: 0 11upx;

    font-size:18upx;
    color: #666666;
    font-weight: normal;
  }

  .vip1 {

    background: linear-gradient(top, rgba(244, 215, 147, .2) 0%, rgba(222, 175, 97, .2) 100%);
    color: #A36E19;
  }
  .vip2 {
    background: linear-gradient(top, rgba(199, 220, 254, .2) 0%, rgba(135, 162, 227, .2) 100%);
    color: #404F7A;
  }
  .vip3 {
    background: linear-gradient(top, rgba(134, 138, 255, .2) 0%, rgba(81, 82, 200, .2) 100%);
    color: #5355AD;
  }


</style>
