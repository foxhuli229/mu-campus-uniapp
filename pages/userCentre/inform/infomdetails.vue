<!-- 我的通知-详情 -->
<template>
	<view class="user">
		<!-- 自定义导航 -->
		<!-- #ifndef H5 -->
		<uni-nav-bar leftIcon="arrowleft" leftText="通知详情" backgroundColor="#4C6FF3" circular="true" fixed="true" :url="pagesurl" />
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<uni-nav-bar leftIcon="arrowleft" title="通知详情" backgroundColor="#4C6FF3" circular="true" fixed="true" :url="pagesurl" />
		<!-- #endif -->
		
		<view :style="{ marginTop: marginTop }"></view>
		
		<view class="inform-title">{{title}}</view>
		<view class="inform-time">{{time}}</view>
		<view class="inform-cont">{{cont}}</view>
		<image class="inform-picture" :src="picture"></image>
		
		<view class="inform-del">
			<image src="../../../static/icons/del.png"></image>
			<view>删除</view>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	const common = require('../../../publicjs/common.js');
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {
			uniNavBar,
			uniIcons
		},
		data() {
			return {
				marginTop: 0, //离自定义头部的距离
				pagesurl: '',
				title: '申请加入通知',
				time: '2019/11/21 11:00',
				cont: '您已成功加入Annine_的队伍，特邀您加入微信群',
				picture: 'https://cdn.jsdelivr.net/gh/foxhuli229/cdn@1.4/images/z_avater.png'
			};
		},
		onLoad(option) {
			if(option !== "") {
				let param =  JSON.parse(option.item);
				this.pagesurl = param.pagesurl;
			}
		},
		mounted() {
			this.marginTop = this.$store.state.SET_CUSTOM_BAR + 25 + 'px';
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
.user {
	overflow: hidden;
	box-sizing: border-box;
	
	.inform-title {
		margin: 22rpx 41rpx;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:300;
		color:rgba(65,65,65,1);
	}
	
	.inform-time {
		margin: 0 41rpx;
		font-size:18rpx;
		font-family:Microsoft YaHei;
		font-weight:300;
		color:rgba(65,65,65,1);
	}
	.inform-cont {
		width: 85%;
		min-height: 100rpx;
		max-height: 600rpx;
		margin: 65rpx 41rpx 20rpx 41rpx ;
		padding: 10rpx;
		
		border-radius: 20rpx;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:300;
		
		color:rgba(121,121,121,1);
		
		overflow-x: hidden;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.inform-picture {
		margin: 0 41rpx;
	}
	
	.inform-del {
		// position: fixed;
		// bottom: 0;
		margin: 80rpx auto;
		text-align: center;
		
		image {
			width: 33rpx;
			height: 33rpx;
		}
		view {
			font-size:20rpx;
			font-family:Microsoft YaHei;
			font-weight:300;
			color:rgba(65,65,65,1);
		}
	}
}
</style>
