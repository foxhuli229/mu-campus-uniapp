<template>
	<view class="form-content">
		<!-- 自定义导航 -->
		<!-- #ifndef H5 -->
		<uni-nav-bar 
			leftText="个人信息" 
			leftIcon="arrowleft"
			:url="pagesurl"
			backgroundColor="#4C6FF3" 
			circular="true" 
			fixed="true"/>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<uni-nav-bar leftIcon="arrowleft" title="个人信息" :url="pagesurl" backgroundColor="#4C6FF3" circular="true" fixed="true"/>
		<!-- #endif -->
		
		<view class="login-center">
			<image :src="avatar"></image>
			<!-- 手机或者邮箱 -->
			<view class="form-item">
				<!-- 手&nbsp;&nbsp;&nbsp;&nbsp;机 -->
				<text class="form-title">{{title}}</text>
				<view class="form-value">
					<input type="text" 
						v-model.trim="value" 
						:placeholder="'请输入' + title"/>
				</view>
			</view>
			<view class="form-item">
				<text class="form-title">验证码</text>
				<view class="form-value">
					<input type="text" 
						v-model.trim="yzcode" 
						placeholder="请输入验证码" />
				</view>
				<button class="code-btn" @click="code()">发送验证</button>	
			</view>
			
			<button class="login-btn" @click="saveBaseinfo">
				<text>提交</text>
			</button>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	const common = require("../../../publicjs/common.js");
	const utils = require("../../../common/utils.js");
	export default {
		name: 'navBackInfoVerify',
		components: {
			uniNavBar,
			uniIcons
		},
		data() {
			return {
				yzcode: '', //验证码
				tel: '', //手机号
				email: '', //邮箱
				pagesurl: '' ,//返回跳转的url地址
				avatar: '' ,//头像
				value: '' ,//文本框value值
				title: '手机号'
			}
		},
		onLoad(option) {
			let item = ""
			if(option !== "") {
				item = JSON.parse(decodeURIComponent(option.item));
				this.pagesurl = item.pagesurl;
				this.avatar = item.avatar;
				this.title = item.title;
				this.value = item.value;
			}
		},
		onShow() {
			
		},
		methods:{
			saveBaseinfo() {
				console.log("保存成功")
			},
			onClickLeft() {
				this.$emit('clickLeft');
			},
			//发送验证码
			code() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-content {
		overflow: hidden;
		text-align: center;
		
		image {
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
		.form-item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 80%;
			margin: 50rpx auto;
			border-bottom: 2rpx solid #f8f8f8;
			text-align: left;
			
			&:first-of-type{
				margin-top: 127rpx;
			}
			
			.form-title {
				margin: 0 60rpx 0 8rpx;
				font-size:30rpx;
				font-weight:500;
				color:rgba(65,65,65,1);
				
				&:first-of-type {
					letter-spacing: 4rpx;
				}
				
			}
			.form-value {
				font-size:30rpx;
				font-weight:300;
				color:rgba(121,121,121,1);
			}
			.code-btn {
				margin: 0;
				padding: 2rpx 10rpx !important;
				font-size: 24rpx;
				text-align: center;
				color: #FFFFFF;
				background-color: #4C6FF3;
			}
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
	}
	
</style>
