<template>
	<view>
		<view class="info-wrap">
			<!-- 主播信息 -->
			<view class="back" @click="goBack">
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.QW8EuXYh17l59805479320e1e3d77c0118f76efd331d.png" style="width: 50rpx; height: 50rpx; position: relative;"></image>
			</view>
			<view class="an-infos" v-if="ownerInfo&&ownerInfo.avatar">
				<image :src="ownerInfo.avatar" class="avtar" />
				<view class="info">
					<view class="an-name">{{ownerInfo.nick}}</view>
					<view class="an-fans">{{groupinfo.memberNum}}人在看</view>
				</view>
				<button class="attention" @click="attentionBtn" v-if="show">{{attentionStatus==1?'已关注':'关注'}}</button>
			</view>
			<!-- 直播间信息 -->
			<!-- <view class="room-id-info" v-if="groupinfo&&groupinfo.groupID">
				直播间ID：{{groupinfo.groupID}}
			</view> -->
			<!-- <view class="online" v-if="groupinfo.memberNum!==undefinded">{{groupinfo.memberNum}}人在看</view> -->
			<!-- 区域信息 -->
			<!-- 观看人数信息 -->
			<!-- 优惠券 -->
			<view class="" style="margin-top: 20rpx;display: flex;flex-direction: column;">
			<image :src="speakImg" style="width: 150rpx;height: 150rpx;"/>
			<image :src="tuiJian" style="width: 150rpx;height: 150rpx;margin-top: 20rpx;"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'roomheader',
		props: {
			userInfo:{
				type:Object,
				value:{}
			},
			groupinfo:{
				type:Object,
				value:{}
			},
			ownerInfo:{
				type:Object,
				value:{}
			},
			attentionStatus:{
				type:Number,
				value:0
			},
			speakImg:{
				type:String,
				value:''
			},
			tuiJian:{
				type:String,
				value:''
			},
			show:{
				type:Boolean,
				value:true
			}
		},
		data() {
			return {
				 attention: true,
				 fans: '0'
			};
		},
		methods:{
			coupon(){
			                this.$emit('coupon')
			            },
			            _getVarsByKey(arr, key) {
			                var res
			                for (var i = 0; i < arr.length; i++) {
			                    if (arr[i].key === key) {
			                        res = arr[i].value;
			                        break;
			                    }
			                }
			                return res
			            },
			            attentionBtn() {
			                if (!this.attention) {
			                    this.$emit('attention')
			                }
							
			            },
						goBack(){
							this.$emit('goBack')
						}
		},
		watch: {
		            groupinfo: function(nexto, pre) {
		                if (nexto.groupCustomField) {
		                    this.fans = this._getVarsByKey(nexto.groupCustomField, 'attent') || '0'
		                }
		            },
		            userInfo: function(nexto, pre) {
						console.log(nexto, pre)
		                var at = false
		                if (nexto.userID) {
		                    var profileCustomField = nexto.profileCustomField
		                    var profile = JSON.parse(this._getVarsByKey(profileCustomField, "Tag_Profile_Custom_avlist") || "[]")
							console.log(profile)
		                    for (let i in profile) {
		                        if (profile[i].ownerid == this.ownerInfo.userID) {
									console.log(profile[i].ownerid,this.ownerInfo.userID)
		                            at = true
		                            break;
		                        }
		                    }
		                }
		                this.attention = at
		            }
		        },
	}
</script>

<style type="less">
	.avtar {
        width: 72rpx;
        height: 72rpx;
        display: inline-block;
        vertical-align: middle;
        border-radius: 36rpx;
        overflow: hidden;
		
    }
    .info {
        display: inline-block;
        color: #000;
        vertical-align: middle;
        padding-left: 10rpx;
        max-width: 140rpx;
    }
    .attention {
        width: 94rpx;
        height: 60rpx;
        background: #FFFFFF;
        border-radius: 30rpx;
        border-radius: 30rpx;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #FF5353;
        letter-spacing: 0;
        text-align: center;
        display: inline-block;
        padding: 0;
        line-height: 60rpx;
        vertical-align: middle;
        position: absolute;
        top: 10rpx;
        right: 10rpx;
    }
    .an-infos {
        background: rgba(0, 0, 0, 0.25);
        border-radius: 40rpx;
        width: 322rpx;
        height: 72rpx;
        padding: 4rpx;
        position: relative;
		left: 65rpx;
		top: -35px;
    }
    .an-name {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: left;
        line-height: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap
    }
    .an-fans {
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: left;
        line-height: 10px;
        margin-top: 10rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap
    }
    .info-wrap {
        padding: 92rpx 22rpx;
    }
    .room-id-info {
        
        height: 24rpx;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 40rpx;
        border-radius: 40rpx;
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 24rpx;
        padding: 8rpx;
        margin-top: 10rpx;
    }
    .online {
        width: 157rpx;
        height: 43rpx;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 40rpx;
        border-radius: 40rpx;
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 43rpx;
        position: absolute;
        right: -350rpx;
        top: 190rpx;
    }
    .red-pack {
        /* background-image: linear-gradient(180deg, #FF9C9C 8%, #F37474 100%); */
        border-radius: 4rpx;
        height: 109rpx;
        width: 83rpx;
        position: absolute;
        left: 24rpx;
        top: 270rpx;
        z-index: 1000;
    }
</style>
