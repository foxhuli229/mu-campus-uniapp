<template>
	<view class="page">
		<view class="department">
			<view>您的院系</view>
			<view>用户绑定院系</view>
		</view>
		<view class="weui-cell">
			<view class="weui-cell__hd">
				<view class="weui-label title">加入说明</view>
			</view>
			<view class="weui-cell__bd">
				<textarea class="weui-textarea" maxlength="200" placeholder="点击填写" style="min-height: 250rpx" auto-height />
				<view class="weui-textarea-counter">200</view>
<!-- 				<view class="weui-cells weui-cells_after-title">
					<view class="weui-cell">
						<view class="weui-cell__bd">
							
						</view>
					</view>
				</view>
 -->			</view>
		</view>
		<view class="tip">备注：申请成功后对方能够获取您的联系方式，请谨慎申请！</view>
		<button class="submit-btn" type="default" size="mini">提交</button>
		
	</view>
</template>

<script>
	var app = getApp();
	const common = require('../../../publicjs/common.js');
	export default {
		data() {
			return {
				oosHost: app.globalData.oosHost,
				
			};
		},
		// onLoad: function(options) {
		// 	common.fonts(); //获取网络字体
		// 	common.checkToken(); //检查token是否有效
		// 	this.loadActivityInfo(); //获取活动信息
		// },
		methods: {
			
		}
	};
		
	
</script>

<style scoped>
	.page{
		background-color: #F3F3F3;
		height: 100vh;
		font-size: 24rpx;
		
	}
	.department{
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #4C6FF3;
		padding: 28rpx 40rpx;
		background-color: #FFFFFF;
	}
	.weui-cell{
		background-color: #FFFFFF;
		align-items: flex-start;
		color: #414141;
		margin-top: 27rpx;
	}
	.weui-cell::before{
		border-top: unset;
	}
	.tip{
		color: #585858;
		text-align: center;
		margin: 46rpx 0;
	}
	button.submit-btn{
		  background-color: #4C6FF3;
		  color: #fff;
		  font-size: 26rpx;
		  width: 70%;
		  margin: 0 15%;
	}
</style>
