<template>
	<view class="login">
		<!-- 自定义导航 -->
		<view class="example-body">
			<uni-nav-bar text="募校园" backgroundColor="#4C6FF3" circular="true" @clickLeft="back"/>
		</view>
		<view class="login-center">
			<image src="../../../static/logo.png"></image>
			<text class="logintext">募校园</text>
			<button class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
				<text>一键登录</text>
			</button>
		</view>
	</view>
</template>

<script>
const app = getApp();
const common = require('../../../publicjs/common.js');
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
export default {
	components: {
		uniNavBar
	},
	data() {
		return {};
	},
	onLoad: () => {
		common.fonts(); //网络字体
	},
	methods: {
		//返回
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		getUserInfo(res) {
			//获取用户信息
			console.log(res);
			let iv = res.detail.iv;
			let encryptedData = res.detail.encryptedData;
			uni.login({
				provider: 'weixin',
				success: res => {
					let code = res.code;
					common
						.requestURL({
							url: '/user/wxlogin',
							method: 'POST',
							params: JSON.stringify({ code, encryptedData, iv })
						})
						.then(res => {
							console.log(res);
							if (res.code === 200) {
								uni.setStorage({key: 'token',data: res.data.token});
								uni.setStorage({key: "userinfolist",data: res.data.user});
								
								uni.redirectTo({
									url: "../index/index"
								})
							}else {
								uni.showModal({
									title: '提示',
									content: '登录失败,请重试！',
								})
							}
						});
				},
				fail: res => {
					console.log('拒绝了');
				}
			});
		}
	}
};
</script>

<style scoped>
.login {
	text-align: center;
}
.login image {
	margin: 0 auto;
	margin-top: 92rpx;
	width: 180rpx;
	height: 180rpx;
	border-radius: 50%;
	text-align: center;
}
.logintext {
	display: block;
	margin: 20rpx 0 0 0;
	text-align: center;
	font-size: 26rpx;
	font-weight: 300;
	color: rgba(65, 65, 65, 1);
}
.login-btn {
	margin: 0 auto;
	margin-top: 324rpx;
	width: 640rpx;
	height: 90rpx;
	border-radius: 45rpx;
	background: rgba(76, 111, 243, 1);
}
.login-btn text {
	display: flex;
	justify-content: center;
	justify-items: center;
	font-size: 30rpx;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
}
</style>
