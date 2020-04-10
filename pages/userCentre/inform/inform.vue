<!-- 
个人中心-我的通知
 -->
<template>
	<view class="user">
		<!-- 自定义导航 -->
		<!-- #ifndef H5 -->
		<uni-nav-bar 
		 leftText="我的通知" backgroundColor="#4C6FF3" circular="true" fixed="true" :url="pagesurl" />
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<uni-nav-bar leftIcon="arrowleft" title="我的通知" backgroundColor="#4C6FF3" circular="true" fixed="true" :url="pagesurl" />
		<!-- #endif -->

		<!-- 卡片 -->
		<view class="user-contentr">
			<view class="uni-card" @click="goinformdetails()">
				<view class="icon-new"></view>
				<uni-swipe-action>
					<uni-swipe-action-item :options="options1" @click="bindClick">
						<view class="uni-card-cont">
							<text class="title">通知：全国大学生计算机大赛招募,通知：全国大学生计算机大赛招募</text>
							<text class="time">2019/11/20</text>
							<view class="cont">通知：全国大学生计算机大赛招募 2019/11/20 通知：全国大学生计算机大赛招募 2019/11/20</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			
			<view class="uni-card" @click="goinformdetails()">
				<view class="icon-new"></view>
				<uni-swipe-action>
					<uni-swipe-action-item :options="options1" @click="bindClick">
						<view class="uni-card-cont">
							<text class="title">通知：全国大学生计算机大赛招募,通知：全国大学生计算机大赛招募</text>
							<text class="time">2019/11/20</text>
							<view class="cont">通知：全国大学生计算机大赛招募 2019/11/20 通知：全国大学生计算机大赛招募 2019/11/20</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			
			<view class="uni-card" @click="goinformdetails()">
				<uni-swipe-action>
					<uni-swipe-action-item :options="options1" @click="bindClick">
						<view class="uni-card-cont">
							<text class="title">通知：全国大学生计算机大赛招募,通知：全国大学生计算机大赛招募</text>
							<text class="time">2019/11/20</text>
							<view class="cont">通知：全国大学生计算机大赛招募 2019/11/20 通知：全国大学生计算机大赛招募 2019/11/20</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
const common = require('../../../publicjs/common.js');
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
export default {
	components: {
		uniNavBar,
		uniIcons,
		uniSwipeAction,
		uniSwipeActionItem
	},
	data() {
		return {
			options1: [
				{
					text: '删除',
					style: {
						backgroundColor: "#4C6FF3",
						fontSize: '26rpx',
						btnHeight: '140rpx',
						borderRadius: '0 15rpx 15rpx 0'
					}
				}
			],
			pagesurl: '',
		};
	},
	onLoad(option) {
		if(option !== "" && typeof option.pagesurl != "") {
			let param = JSON.parse(option.item);
			this.pagesurl = param.pagesurl;
		}
	},
	onShow() {
		this.userinfo();
	},
	watch: {
		pagesurl(newVal, val) {
			this.pagesurl = newVal;
		}
	},
	methods: {
		userinfo() {},
		//滑块
		bindClick(e) {
			uni.showToast({
				title: `点击了${e.content.text}按钮`,
				icon: 'none'
			});
		},
		
		//点击进入通知详情
		goinformdetails() {
			let params= {
				pagesurl: "/pages/userCentre/inform/inform"
			}
			params = JSON.stringify(params)
			uni.navigateTo({
				url: './infomdetails?item=' + params
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.user {
	overflow: hidden;
	box-sizing: border-box;

	.user-contentr {
		margin: 0 25rpx 19rpx 25rpx;
	}
	// 卡片
	.uni-card {
		width: 700rpx;
		height: 140rpx;
		margin-bottom: 30rpx;
		border-radius: 15rpx;
		// border: 2rpx solid #000000;
		background: #F0F9FF;

		.uni-card-cont {
			padding: 21rpx 0 0 16rpx;
		}

		.title,
		.time,
		.cont {
			white-space: nowrap !important;
			overflow: hidden !important;
			text-overflow: ellipsis !important;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 300;
			color: rgba(65, 65, 65, 1);
		}

		.title {
			display: inline-block;
			padding-right: 40rpx;
			width: 62%;
		}
		.time {
			display: inline-block;
			width: 25%;
			font-size: 28rpx;
		}
		.cont {
			width: 90%;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 300;
			color: rgba(121, 121, 121, 1);
		}
		
		/* 自定义样式 */
		.icon-new {
			position: absolute;
			margin: -1px;
			height: 10px;
			width: 10px;
			left: 10px;
			border-radius: 50%;
			background-color: #de6866db;
		}
	}
}
</style>
