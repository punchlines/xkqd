<template>
	<view class="mpvue-picker">
		<view class="uni-padding-wrap uni-common-mt">
			<view style="uni-title">选中的值 : </view>
			<view class="uni-textarea uni-common-mt">
				<textarea :value="pickerText" disabled placeholder="请点击下面的按钮进行选择"></textarea>
			</view>
			<view class="uni-btn-v">
				<button type="default" @click="showMulLinkageThreePicker">三级城市联动</button>
			</view>
		</view>
		<!-- <mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker> -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		 <!--   -->
		 <!--  -->
	</view>
</template>

<script>
	// import mpvuePicker from '../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../components/mpvue-citypicker/mpvueCityPicker.vue'

	export default {
		components: {
			// mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				// mode: '',
				// deepLength: 1,
				pickerValueDefault: [0],
				// pickerValueArray:[]
			};
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
			}
		},
	};
</script>

<style>
	
</style>