<template>

  <view class="system_message_list">
    <system-message-item v-for="n in list" :key='n'></system-message-item>
  </view>

</template>

<script>

  import systemMessageItem from '../_component/systemMessageItem';

  import uniLoadMore from '../../../template/uni-load-more.vue';
  
  export default {
  	 name: 'system',
    components: { systemMessageItem ,uniLoadMore},
    data () {
      return {
  			list: [],
  			loadingType: 0,
  			contentText: {
  				contentdown: "上拉显示更多",
  				contentrefresh: "正在加载...",
  				contentnomore: "没有更多数据了"
  			}
      }
    },
  	methods: {
  		 onLoad (option) {
				 
  			let list = [];
  			for (let i = 1; i < 11; i++) {
  				list.push(i);
  			}
  			this.list = list;
      },
  
      onShow() {
				console.info(1)
      },
			getList(){
					let list = [];
				for (let i = 1; i < 11; i++) {
					list.push(i);
				}
				this.list = list;
			},
  		// 触发
  		onReachBottom() {
  			if (this.loadingType !== 0) {
  				return;
  			}
  			this.loadingType = 1;
  			let list = [],
  				maxItem = this.list[this.list.length - 1],
  				length = maxItem + 6;
  			for (let i = maxItem + 1; i < length; i++) {
  				list.push(i);
  			}
  			setTimeout(() => {
  				if (length > 26) {
  					this.loadingType = 2;
  					return;
  				}
  				this.list = this.list.concat(list);
  				this.loadingType = 0;
  			}, 800);
  		},
  	}
  }
  

</script>

<style scoped lang="less">

</style>