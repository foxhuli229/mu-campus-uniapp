<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-header" @click="gouserinfo()">
			<view>
				<image class="avatar-img" :src="avatar" />
				<text class="nickname">{{ nickname }}</text>
			</view>
			<view>
				<block v-if="identity">
					<text>已实名</text>
				</block>
				<block v-else>
					<text>未实名</text>
				</block>
				<uni-icons type="arrowright" size="18" color="#ffffff"></uni-icons>
			</view>
		</view>
		<!-- 卡片 -->
		<view class="pay-card">
			<view>
				<text>金额（10元以上可提现）</text>
				<text>{{ money }}</text>
			</view>
			<button @click="depositClick">提现</button>
		</view>

		<!-- 表单 -->
		<view class="login-center">
			<!-- 地址 -->
			<view class="form-item">
				<view class="form-title">
					<image src="../../../static/icons/mysite.png" style="width: 34rpx; height: 42rpx;"/>
					<text class="form-title">我的地址</text>
				</view>
				<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
			</view>
			<!-- 悬赏 -->
			<view class="form-item">
				<view class="form-title">
					<image src="../../../static/icons/myreward.png" style="width: 36rpx; height: 42rpx;"/>
					<text class="form-title">我的悬赏</text>
				</view>
				<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
			</view>
			<!-- 团队 -->
			<view class="form-item">
				<view class="form-title">
					<image src="../../../static/icons/mytearm.png" style="width: 41rpx; height: 39rpx;"/>
					<text class="form-title">我参与的团队</text>
				</view>
				<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
			</view>
			<!-- 收藏 -->
			<view class="form-item">
				<view class="form-title">
					<image src="../../../static/icons/mycollect.png" style="width: 41rpx; height: 37rpx;"/>
					<text class="form-title">我的收藏</text>
				</view>
				<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
			</view>
			<!-- 发布 -->
			<view class="form-item">
				<view class="form-title">
					<image src="../../../static/icons/myissue.png" style="width: 41rpx; height: 37rpx;"/>
					<text class="form-title">我的发布</text>
				</view>
				<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
			</view>
		</view>

		<!-- 表单 -->
		<view class="login-center">
			<!-- 通知 -->
			<view class="form-item" @click="goinform()">
				<view class="form-title">
					<image src="../../../static/icons/myinform.png" style="width: 41rpx; height: 41rpx;"/>
					<text class="form-title">我的通知</text>
				</view>
				<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
			</view>
			<!-- 意见反馈 -->
			<view class="form-item">
				<view class="form-title">
					<image src="../../../static/icons/myfeedback.png" style="width: 41rpx; height: 39rpx;"/>
					<text class="form-title">意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
const common = require('../../../publicjs/common.js');
const utils = require('../../../utils/utils.js');
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
export default {
	components: {
		uniNavBar,
		uniIcons,
	},
	data() {
		return {
			avatar: '', //头像
			nickname: '', //昵称
			money: 0, //提现金额
			identity: '', //身份证
			placeholderClass: {
				textAlign: 'right'
			},
			viewTop: 0,
			marginTop: 0,
			showRight: false,
			showLeft: false
		};
	},
	onShow() {
		this.marginTop = this.$store.state.SET_CUSTOM_BAR + 25 + 'px';
		this.viewTop = this.$store.state.SET_CUSTOM_BAR;
		this.getuserinfo(); //获取系统信息
	},
	watch: {},
	methods: {
		//获取缓存中的系统信息
		getuserinfo() {
			try {
			    const value = uni.getStorageSync('userinfolist');
			    if (value) {
			        console.log(value);
					this.avatar =  value.portrait;
					this.nickname =  value.nickname;
			    }
			} catch (e) {
			    // error
				console.log("获取失败")
			}
		},
		
		//跳转到个人信息页面 - 未实名
		gouserinfo() {
			let param = {
				pagesurl: '/pages/userCentre/index/index'
			}
			param = JSON.stringify(param)
			uni.navigateTo({
				url: '../baseinfo/baseinfo?item=' + param
			})
		},
		//跳转到我的通知页面
		goinform() {
			let param = {
				pagesurl: '/pages/userCentre/index/index'
			}
			param = JSON.stringify(param)
			uni.navigateTo({
				url: '../inform/inform?item=' + param
			})
		},
		//提现
		depositClick() {
			console.log('点击了提现按钮');
		},
	},
	onNavigationBarButtonTap(e) {
		this.showRight = !this.showRight;
	},
	onBackPress() {
		if (this.showRight || this.showLeft) {
			this.hide();
			return true;
		}
	}
};
</script>

<style lang="scss" scoped>
/* #ifdef H5 */
.uni-page-head {
	left: 35px;
	right: 0;
}
.uni-page-head .uni-page-head__title {
	text-align: left;
}
/* #endif */
//用户
.user {
	background: rgba(248, 248, 248, 1);

	.user-header {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 24rpx;
		background-color: #4c6ff3;
		color: rgba(255, 255, 255, 1);
		vertical-align: middle;

		.avatar-img {
			display: inline-block;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}

		.nickname {
			display: inline-block;
			margin-left: 15rpx;
			font-size: 28rpx;
			font-weight: 300;
			text-align: left;
			line-height: 100rpx;
			vertical-align: top;
			color: rgba(255, 255, 255, 1);
		}
		
		view:nth-of-type(2) {
			font-size:28rpx;
			font-family:Microsoft YaHei;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}
}
// 提现
.pay-card {
	display: flex;
	-webkit-flex: -webkit-flex;
	justify-content: space-around;
	align-items: center;
	width: 700rpx;
	height: 200rpx;
	margin: 28rpx auto;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0 4rpx 15rpx 1rpx rgba(115, 115, 115, 0.25);
	border-radius: 20rpx;

	view:first-of-type {
		margin: 0 auto;
		font-size: 30rpx;
	}

	text:first-of-type {
		display: block;
		margin: 0 auto;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 500;
		color: rgba(65, 65, 65, 1);
	}
	text:nth-of-type(2) {
		margin: 5rpx 0 0 5rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 300;
		color: rgba(65, 65, 65, 1);
	}
	button:first-of-type {
		display: inline-block;
		width: 157rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: rgba(76, 111, 243, 1);
		border-radius: 15rpx;
		border: 0;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #ffffff;
	}
}
//表单
.login-center {
	background: rgba(248, 248, 248, 1);

	&:not(:first-child) {
		margin-top: 20rpx;
	}

	.form-item {
		display: flex;
		display: -webkit-flex; /* Safari */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 92rpx;
		padding: 0 40rpx 0 40rpx;
		box-sizing: border-box;
		background-color: #ffffff;

		&:not(:first-of-type) {
			border-top: 2rpx solid #f8f8f8;
		}

		.form-title {
			display: flex;
			display: -webkit-flex; /* Safari */
			font-size: 26rpx;
			font-family: Microsoft YaHei;
			font-weight: 500;
			color: rgba(65, 65, 65, 1);

			image {
				width: 41rpx;
				height: 42rpx;
				padding-right: 25rpx;
			}
		}

		.form-value {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 26rpx;
			font-family: Microsoft YaHei;
			font-weight: 300;
			color: rgba(121, 121, 121, 1);

			&:first-child {
				display: inline-block;
			}
			uni-icons {
				margin-left: 14rpx;
			}
		}

		// 单选框
		radio-group:first-child {
			margin-right: 30rpx;
		}
		radio {
			transform: scale(0.7);
		}

		.placeholderClass {
			text-align: right;
		}
		input[type='text'] {
			padding-right: 12rpx;
		}
	}
}
</style>
