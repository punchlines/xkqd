<template>
	<view>
		<textarea  @click="focusArea" :focus="focus"  :placeholder="placeholder" :item="item" v-model="content" @blur="inputContent(content)"  show-confirm-bar="true" adjust-position="true"/>
	</view>
	
</template>

<script>
	export default {
		name:'textareaText',
		data() {
			return {
				content:'',
				focus:false,
			};
		},
		props:{
			placeholder: {
				type: String,
				default: ''
			},
			// maxlength: {
			// 	type: Number,
			// 	default:''
			// },
			item: {
				type: Number,
				default:0
			},
		},
		methods:{
			blurArea(){
				console.log(this.focus)
				this.focus = false;
				this.$forceUpdate();
			},
			
			focusArea(){
				console.log(this.focus)
				this.focus = true;
				this.$forceUpdate();
			},
			inputContent(){
				this.focus = false;
				this.$emit('inputText',{item:this.item,content:this.content});
			}
		}
		
	}
</script>

<style scoped lang="less">
	textarea{
		font-size: 28upx;
	}
</style>
