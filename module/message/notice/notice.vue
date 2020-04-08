<template>
  <view class="system_message_list">
    <system-message-item v-for="n in 2"></system-message-item>
  </view>
</template>

<script>

  import systemMessageItem from '../_component/systemMessageItem';

  export default {

    components: { systemMessageItem },

  }

</script>

<style scoped lang="less">

</style>