<template>
  <view class="number-input" :style="autoWidth ? 'width: auto' : ''">
    <view class="btn btn-down" @click="down">-</view>
    <input :value="newVals" @input="input"  @blur="blur" :disabled="disabled" type="number"/>
    <view class="btn btn-up" @click="up">+</view>
  </view>
</template>

<script>
  export default {

    name: "numberInput",

    data () {
      return {
				newVals:1
      }
    },
		
		mounted(){
			this.newVals = this.newVal;
		},

    props: {
			index:{
				type: Number,
				default: -1,
			},
      newVal:{
				type: Number,
				default: 1,
			},
      max: {
        type: Number,
        default: 99,
      },
      min: {
        type: Number,
        default: 1,
      },
			disabled: Boolean,
      autoWidth: Boolean,
    },

    watch: {
     newVals () {
			 if(this.index==-1){
			 	this.$emit('inputTap', this.newVals);
			 }else{
			 	// this.$emit('inputTap2',{newVal:this.newVal,index:this.index});
			 }
		 }
    },

    methods: {
      down () {
				if (this.disabled) return;
        if (this.newVals === this.min) return;
        this.newVals -= 1;
        this.$emit('inputTap2',{newVal:this.newVals,index:this.index});
      },
      up () {
				if (this.disabled) return;
        if (this.newVals === this.max) return;
        this.newVals += 1;
        this.$emit('inputTap2',{newVal:this.newVals,index:this.index});
      },
			input(e){
				
				if (this.disabled) return;
				if (this.newVals === this.max) return;
				setTimeout(() => { this.newVals = e.detail.value 
				  this.$emit('inputTap2',{newVal:this.newVals,index:this.index});
				}, 50);
				
			},
			
      blur () {
        const val = this.newVals;
        if (val < this.min) this.newVals = this.min;
        if (val > this.max) this.newVals = this.max;
        this.$emit('inputTap2',{newVal:this.newVals,index:this.index});
      },
    },

  }
</script>

<style scoped lang="less">

  @height: 63upx;

  .number-input {
    display: flex;
    width: 250upx;
    border: 1px solid #EEEEEE;

  }

  .btn {
    width: @height;
    line-height: @height;
    text-align: center;
    font-size: 32upx;
    font-weight: bold;
    &:active {
      background-color: #eee;
    }
  }
  .btn-down {
    border-right: 1upx solid #EEEEEE;
  }
  .btn-up {
    border-left: 1upx solid #EEEEEE;
  }

  input {
    height: @height;
    line-height: @height;
    flex: 1;
    text-align: center;
    font-size: 28upx;
  }

</style>
