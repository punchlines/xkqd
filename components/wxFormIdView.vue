<template>
	
	<!-- 收集用户操作 保存formId 用于推送  只用于小程序端-->
	<view :class="customClass">
		<!-- #ifdef MP-WEIXIN -->
			<form  class="ff form_opacity" @submit="formSubmit" report-submit>
				<button  formType="submit" class='btn'>
						<slot></slot>
				</button>
			</form>
		<!-- #endif -->	
		<!-- #ifndef MP-WEIXIN -->
			<slot></slot>
		<!-- #endif -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		
		props:{
			customClass:String,
		},
		methods:{
			// #ifdef MP-WEIXIN
				formSubmit(e){
					console.log(e.detail.formId)
					if(e.detail.formId.indexOf("mock one")==-1)
						this.$store.dispatch('addFormIdx',e.detail.formId);
				}
			// #endif
			
		}
	}
</script>

<style lang="less" scoped>
	/* #ifdef MP-WEIXIN */
	
		.ff,.btn{
			font-size: inherit;
			color:inherit;
			line-height:inherit;
			text-align: inherit;

		}

		.form_opacity{
			width: 100%;
			height: auto;
			
	
			.btn{
				width: 100%;
				height: auto;
				margin: 0;
				padding: 0;
				border-radius: 0;
				background: rgba(0,0,0,0);
				overflow:visible;
				&::after{
				border:none;
			  }
			  }
			  
		}
	/* #endif */


</style>
