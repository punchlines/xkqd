<template>

  <view class="container">
    <view class="questionDescript">
      <textarea  @click="focusArea" :focus="focus" @blur="blurArea" @input="TotalNum" name="" id="" cols="30" rows="10" maxlength="300" placeholder="请填写问题描述，以便我们更好地帮助您…"></textarea>
      <view class="TextNum fs9a24">{{number}}/300</view>
    </view>
    <view class="questionButton fs3a32" @click="SubmitSuggestions">提交</view>
  </view>

</template>

<script>
	import api from "../../js/api.js";
  export default {
    data () {
      return {
				number:'0',
				content:'',
				focus:true
      }
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
			
			// 统计字符数
      TotalNum(e){
				this.number=e.detail.value.length;
				this.content=e.detail.value;
			},
			// 提交意见反馈
			SubmitSuggestions(){
				if(!this.content){
					this.showTips('请输入您的问题').then(res=>{})
				}else{
					this.$api.insertSuggestion(this.content).then(res=>{
						this.showTips('提交成功，感谢您的反馈').then(res=>{
							uni.navigateBack({});
						})
					}).catch(error=>{
						this.showError(error);
					})
				}
			},
    }

  }

</script>

<style scoped lang="less">


	@import '../../css/mzl_base.less';
  .container{
    background:@grayBg;width:100%;border-top:1upx solid #eee;position: fixed;height:100%;
    .questionDescript{
     padding:30upx;box-sizing:border-box;position: relative;
      textarea{
        border:none;background: #fff;padding:20upx;box-sizing:border-box;width: 100%; height:510upx;font-size:28upx;
      }
      .TextNum{
        position:absolute;bottom:60upx;right: 60upx;
      }
    }
    .questionButton{
      .buttonRadius(@w:620upx,@h:88upx);text-align: center;line-height: 88upx;color:#fff;margin:80upx auto;
    }
      
}


</style>