<template>
	<view class="login">
		<!-- 自定义导航 -->
		<!-- #ifndef H5 -->
		<uni-nav-bar leftText="募校园" backgroundColor="#4C6FF3" circular="true" fixed="true"/>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<uni-nav-bar title="募校园" backgroundColor="#4C6FF3" circular="true" fixed="true"/>
		<!-- #endif -->
		<!-- <view :style="{marginTop: marginTop}"></view> -->
		<view class="login-center">
			<image src="../../../static/logo.png"></image>
			<text class="logintext">募校园</text>
			<!-- #ifdef MP-WEIXIN -->
			<button class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
				<text>微信一键登录</text>
			</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			
			<!-- #endif -->
			
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
		return {
		};
	},
	onLoad() {
		uni.stopPullDownRefresh(); //停止刷新
	},
	methods: {
		getUserInfo(res) {
			//获取用户信息
			let this_ = this;
			console.log(this)
			let iv = res.detail.iv;
			let encryptedData = res.detail.encryptedData;
			uni.getProvider({
				service: 'oauth',
				success(ProvRes) {
					console.log(ProvRes)
					if(~ProvRes.provider.indexOf("weixin")) {
						uni.login({
							provider: 'weixin',
							success:function(res){
								let code = res.code;
								common
									.requestURL({
										url: '/user/wxlogin',
										method: 'POST',
										params: JSON.stringify({ code, encryptedData, iv })
									})
									.then(res => {
										if (res.code == 200) {
											this_.$store.commit("userinfolist", res.data.user)
											this_.$store.commit("token", res.data.token);
											
											uni.redirectTo({
												url: "../index/index"
											})
											
											if(typeof res.data.college != "undefined"
												&& res.data.college != null
												&& res.data.college != "") {
													//已填写学院信息
													
												}else {
													//未填写学院信息的时候
													
													
												}
											
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
								uni.showModal({
									title:"温馨提示",
									content: "请同意！",
									showCancel: false,
								})
							}
						});
					}else {
						uni.showModal({
							title:"温馨提示",
							content: "目前暂不支持，其他设备登录！",
							showCancel: false,
						})
					}
						
				}
			})
			
		}
	}
};
</script>

<style scoped>
.login {
	overflow: hidden;
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
