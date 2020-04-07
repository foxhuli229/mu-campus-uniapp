<template>
	<view class="search-bar">
		<navigator class="search-left" url="/pages/search/search">
			<!-- <input type="text" class="search-bar__input" placeholder="搜索" placeholder-class="" value="{{inputVal}}" /> -->
			<image class="search-icon" :src="searchIcon"></image>
		</navigator>
		<view class="search-right">
			<view class="side-pull" @click="show('left')"><icon class="iconfont icon-caidan1"></icon></view>
			<view class="release" bindtap="openRelease"><icon class="iconfont icon-icon"></icon></view>
		</view>

		<!-- <view class="word-btn draw-cotrol-btn"
			hover-class="word-btn--hover"
			:hover-start-time="20" 
			:hover-stay-time="70" 
			@click="show('left')">
			<text class="word-btn-white">显示Drawer</text>
		</view> -->
		<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer('left')">
			<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
			<uni-list>
				<view class="avatar" @click="gomyuser()">
					<image :src="avatar" class="avatar-img"></image>
					<text>{{ nickname }}</text>
				</view>
				<uni-list-item :title="college" 
					thumb="/static/icons/mysite.png" 
					@click="gomyuserinfo()"/>
				<uni-list-item title="首页" 
					thumb="/static/icons/home/home.png"
					@click="goindex()" />
				<uni-list-item title="团队招募" 
					thumb="/static/icons/home/home-tearm.png"
					@click="gotearm()" />
				<uni-list-item 
					title="悬赏" 
					thumb="/static/icons/home/home-reward.png"
					@click="goreward()" />
				<uni-list-item title="活动"
					thumb="/static/icons/home/home-activity.png"
					@click="goactity()" />
				<uni-list-item title="通知" 
					thumb="/static/icons/myinform.png"
					@click="gomyinform()"/>
			</uni-list>
			<!-- #endif -->
			<!-- #ifdef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
			<view class="uni-list">
				<view class="avatar" @click="gomyuser()">
					<image :src="avatar" class="avatar-img"></image>
					<text>{{ nickname }}</text>
				</view>
				<uni-list-item 
					:title="college" 
					thumb="/static/icons/mysite.png" 
					@click="gomyuserinfo()" />
				<uni-list-item 
					title="首页" 
					thumb="/static/icons/home/home.png"
					@click="goindex()"/>
				<uni-list-item title="团队招募" 
					thumb="/static/icons/home/home-tearm.png"
					@click="gotearm()"/>
				<uni-list-item title="悬赏" 
					thumb="/static/icons/home/home-reward.png"
					@click="goreward()" />
				<uni-list-item title="活动" 
					thumb="/static/icons/home/home-activity.png"
					@click="goactity()" />
				<uni-list-item title="通知"
					thumb="/static/icons/myinform.png"
					@click="gomyinform()"/>
			</view>
			<!-- #endif -->
		</uni-drawer>
	</view>
</template>

<script>
const app = getApp();
const common = require('../../publicjs/common.js');
// import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
export default {
	name: 'uniSearchBar',
	components: {
		// uniIcons,
		uniDrawer,
		uniList,
		uniListItem
	},
	props: {
		searchIcon: { //搜索图标
			type: String, 
			default: 'https://cmrs-oos.oss-cn-beijing.aliyuncs.com/sys/icon_search.png' ,
		},
		inputVal: { 
			 //搜索默认值
			type: String, 
			value: '' ,
		}
	},
	data() {
		return {
			showRight: false,
			showLeft: false,
			avatar: 'https://cdn.jsdelivr.net/gh/foxhuli229/cdn@1.4/images/z_avater.png',
			nickname: '没有昵称咯',
			college: '暂未填写咯'
		};
	},
	mounted() {
		this.getuserinfo();
	},
	onShow() {
		console.log("onshow")
	},
	onNavigationBarButtonTap(e) {
		this.showRight = !this.showRight;
	},
	onBackPress() {
		if (this.showRight || this.showLeft) {
			this.hide();
			return true;
		}
	},
	methods: {
		//获取缓存中的系统信息
		getuserinfo() {
			try {
			    const value = uni.getStorageSync('userinfolist');
			    if (value) {
					this.avatar =  value.portrait;
					this.nickname =  value.nickname || "没有昵称咯";
					this.college = (value.college == null || value.college == "" ? "暂未填写咯" : value.college)
			    }
			} catch (e) {
			    // error
				console.log("获取失败")
			}
		},
		show(e) {
			console.log('show', e);
			if (e === 'left') {
				this.showLeft = true;
			} else {
				this.showRight = true;
			}
		},
		closeDrawer(e) {
			if (e === 'left') {
				this.showLeft = false;
			} else {
				this.showRight = false;
			}
		},
		//跳转我的用户主页
		gomyuser() {
			uni.navigateTo({
				url: '/pages/userCentre/index/index'
			})
		},
		//跳转到个人信息页面
		gomyuserinfo() {
			let param = {
				pagesurl: '/pages/userCentre/index/index'
			}
			param = JSON.stringify(param)
			uni.navigateTo({
				url: "/pages/userCentre/baseinfo/baseinfo?item=" + param
			})
		},
		//跳转到首页
		goindex() {
			uni.navigateTo({
				url: "/pages/home/index/index"
			})
		},
		//跳转到团队招募
		gotearm() {
			uni.navigateTo({
				url: "/pages/teamRecruitment/index/index"
			})
		},
		//跳转到悬赏
		goreward() {
			console.log("未填写跳转的url地址，请填写");
		},
		//跳转到活动
		goactity() {
			uni.navigateTo({
				url: "/pages/universityActivities/activityIndex/activityIndex"
			})
		},
		//跳转到通知
		gomyinform() {
			let param = {
				pagesurl: '/pages/userCentre/index/index'
			}
			param = JSON.stringify(param)
			uni.navigateTo({
				url: "/pages/userCentre/inform/inform?item=" + param
			})
		},
		openRelease: function() {
			wx.showActionSheet({
				itemList: ['活动', '悬赏', '招募'],
				success(res) {
					if (res.tapIndex == 0) {
						console.log('发布活动');
					} else if (res.tapIndex == 1) {
						console.log('发布悬赏');
					} else {
						console.log('发布招募');
					}
				},
				fail(res) {
					console.log(res.errMsg);
				}
			});
		}
	}
};
</script>

<style scoped>
@import '/wxcomponents/weui.wxss';
@import '/wxcomponents/iconfont.wxss';
@import '/common/unidrawer.css'; //侧滑弹框
.search-bar {
	display: flex;
	align-items: center;
	padding: 18rpx 10rpx;
}

.search-bar .search-left {
	background: #4c6ff3;
	height: 60rpx;
	border-radius: 30rpx;
	position: relative;
	flex: 2;
}

.search-bar .search-right {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.search-bar .search-right icon {
	font-size: 44rpx;
}
.search-bar .search-right .side-pull {
	margin-right: 14rpx;
}

/* input.search-bar__input {
	  background-color: #4c6ff3;
	  border-radius: 50rpx;
	  height: 60rpx;
	  color: #fff;
	  padding-left: 10rpx;
	}
	 */

.search-bar__input {
	background-color: #f5f5f5;
	color: #f5f5f5;
}

.search-icon {
	position: absolute;
	top: 10rpx;
	right: 20rpx;
	width: 35rpx;
	height: 34rpx;
}
</style>
