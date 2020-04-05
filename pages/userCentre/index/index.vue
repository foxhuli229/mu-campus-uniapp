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
			return {
				
			}
		},
		onLoad:function(){
			common.fonts();
			common.checkToken();
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
