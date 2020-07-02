<template name="chatroom">
	<view>
			<scroll-view class="chatroom-scoll" id="message-area" :scroll-into-view="viewID" scroll-y="true"
			 scroll-with-animation="true" scroll-anchoring="true" >
				<livemessage v-for="(item,index) in message" :key="index" :item="item" :id="'text'+index" v-if="item.name !='admin'"></livemessage>
			</scroll-view>
	</view>
</template>

<script>
	import livemessage from './livemessage';
	export default {
		components:{livemessage},
		name: 'chatroom',
		props: {
		    message: {
				type:Array,
				value:[]
				}
		},
		
		data() {
			return {
				viewID:'',
				timestamp:''
				
			};
		},
		onLoad() {
			this.timestamp = (new Date()).getTime();
			console.log('时间',this.timestamp);
		},
		watch: {
		        message(nexto, preo) {
					
		          if (nexto.length) {
		             //const last = 
								this.viewID = 'text'+(nexto.length-2)
							console.log(this.viewID)
		                    // 限制展示在页面上的消息条数
		                }
						
		            }
		        },
		onLoad() {
			console.log(message)
		},
		methods:{
			// test(event){
			// 	console.log(event)
			// 	this.top=event.detail.scrollTop
			// }
		},
		
	}
</script>

<style type="less">
	.chatroom-scoll {
        max-height: 30vh;
        widows: 100%;
    }
</style>
