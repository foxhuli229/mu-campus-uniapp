<template>
	<view class="login" style="overflow: hidden;">
		<!-- 自定义导航 -->
		<!-- #ifndef H5 -->
		<uni-nav-bar
			leftIcon="arrowleft" 
			leftText="个人信息" 
			backgroundColor="#4C6FF3" 
			circular="true"
			fixed="true"
			:url="pagesurl"
			/>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<uni-nav-bar
			leftIcon="arrowleft" 
			title="个人信息" 
			backgroundColor="#4C6FF3" 
			circular="true" 
			fixed="true"
			:url="pagesurl"
			/>
		<!-- #endif -->
		<!-- 表单  :style="{marginTop: marginTop}"-->
		<form style="overflow-y: auto;">
				<!-- 头像 -->
				<view class="base-avatar">
					<image class="avatar-img" :src="avatar" @click="chooseImage" />
					<input class="nickname" maxlength="30" v-model.trim="nickname" />
				</view>
				<!-- 性别 -->
				<view class="form-item">
					<text class="form-title">性别</text>
					<view class="form-value">
						<radio-group @change="radioChange">
							<label class="form-label">
								<radio color="#4C6FF3" value="0" :checked="sex == 0"/>
								<text>男</text>
							</label>
							<label class="radiosex_1">
								<radio color="#4C6FF3" value="1" :checked="sex == 1"/>
								<text>女</text>
							</label>
						</radio-group>
					</view>
				</view>
				<!-- 生日 -->
				<view class="form-item">
					<text class="form-title">生日</text>
					<view class="form-value">
						<picker mode="date" 
							:value="date" 
							:start="startDate" 
							:end="endDate"
							 @change="bindDateChange">
							<text class="uni-input">{{ date }}</text>
						</picker>
					</view>
				</view>
				<!-- 手机 -->
				<view class="form-item">
					<text class="form-title">手机</text>
					<view class="form-value">
						<view 
							@click="navskip($event, '手机', 'tel')">
							<text>请绑定</text>
							<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
						</view>
					</view>
				</view>
				<!-- 邮箱 -->
				<view class="form-item">
					<text class="form-title">邮箱</text>
					<view class="form-value">
						<view
							@click="navskip($event, '邮箱', 'email')">
							<text>请绑定</text>
							<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
						</view>
					</view>
				</view>
				<!-- 院校 -->
				<view class="form-item">
					<text class="form-title">院校</text>
					<view class="form-value">
						<input type="text" 
							v-model.trim="school" 
							placeholder-class="placeholderClass"
							placeholder="请输入院校"/>
					</view>
				</view>
				<!-- 院系 -->
				<view class="form-item">
					<text class="form-title">院系</text>
					<view class="form-value">
						<input type="text" 
							v-model.trim="department" 
							placeholder="请输入院系" 
							placeholder-class="placeholderClass"
							cursor-spacing="4"/>
					</view>
				</view>
				<!-- 专业 -->
				<view class="form-item">
					<text class="form-title">专业</text>
					<view class="form-value">
						<input type="text" 
							v-model.trim="major" 
							placeholder="请输入专业" 
							placeholder-class="placeholderClass"
							cursor-spacing="4"/>
					</view>
				</view>
				<!-- 实名认证 -->
				<view class="form-item">
					<text class="form-title">实名认证</text>
					<view class="form-value">
						<view
							@click="navskip($event, '身份证', 'identity')">
							<text>请绑定</text>
							<uni-icons type="arrowright" size="18" color="#797979"></uni-icons>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button class="form-btn" @click="saveBseInfo">
						<text>提交</text>
					</button>
				</view>
			</form>
	</view>
</template>

<script>
const app = getApp();
const common = require('../../../publicjs/common.js');
const utils = require('../../../utils/utils.js');
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from "@/components/uni-icons/uni-icons.vue";

export default {
	components: {
		uniNavBar,
		uniIcons,
	},
	data() {
		return {
			avatar: 'https://cdn.jsdelivr.net/gh/foxhuli229/cdn@1.4/images/z_avater.png', //头像
			nickname: '未毕之毕_', //昵称
			sex: 1, //性别
			date: utils.dateformat({ format: true }), //生日选择日期
			startDate: utils.dateformat('start'), //生日开始日期
			endDate: utils.dateformat('end'), //生日结束日期
			tel: '', //手机
			email: '',//邮箱
			school: '', //院校
			department: '', //系
			major: '', //专业，
			identity: '', //身份证
			placeholderClass: {
				textAlign: 'right',
				fontSize: '30rpx'
			},
			homepagesurl: '/pages/userCentre/baseinfo/baseinfo', //返回跳转的页面
			pagesurl: ''
		};
	},
	onLoad(option) {
		if(option !== "") {
			let param = JSON.parse(option.item);
			this.pagesurl = param.pagesurl;
		}
	},
	onShow() {
		
	},
	mounted() {
		
	},
	watch: {
		pagesurl(newVal, val) {
			//需要跳转返回的页面
			this.pagesurl = newVal;
			return newVal;
		}
	},
	methods: {
		//打开手机的图库, 头像上传
		chooseImage(event) {
			uni.chooseImage({
				count: 1,
				sourceType: 'album',
				success: res => {
					console.log(res);
					this.avatar = res.tempFilePaths[0];
				},
				fail: err => {
					// #ifdef MP
					uni.getSetting({
						success: res => {
							let authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
							if (!authStatus) {
								uni.showModal({
									title: '授权失败',
									content: '需要从您的相册获取图片，请在设置界面打开相关权限',
									success: res => {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							}
						}
					});
					// #endif
				}
			});
		},

		navskip(event, title, value) {
			console.log(this[value]);
			let param = {
				pagesurl: "/pages/userCentre/baseinfo/baseinfo",
				leftIcon: "arrowleft",
				leftText: "个人信息",
				backgroundColor: "#4C6FF3",
				circular: "true",
				title,
				"avatar": this.avatar,
				"value": this[value]
			}
			param = JSON.stringify(param)
			uni.navigateTo({
				url: "../navBackInfoVerify/navBackInfoVerify?item="+ param,
			})
		},

		radioChange(event) {
			this.sex = event.target.value;
		},
		//出生日期
		bindDateChange: function(e) {
			this.date = e.detail.value;
		},
		saveBseInfo() {
			
		}
	}
};
</script>

<style lang="scss" scoped>
// @import "/common/Variables.scss";

form:not(:first-child) {
	text-align: right;
}
form:nth-last-child(2) {
	border-bottom: 2rpx solid #f8f8f8;
}

.base-avatar {
	display: flex;
	display: -webkit-flex; 
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	height: 172rpx;
	// line-height: 172rpx;
	margin-left: 30rpx;

	.avatar-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 0;
		vertical-align: middle;
	}

	.nickname {
		width: 60vw;
		margin-left: 15rpx;
		margin-right: 20rpx;
		font-size: 28rpx;
		font-weight: 300;
		color: rgba(88, 88, 88, 1);
		vertical-align: middle;
		text-align: left;

		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
}
.form-item {
	display: flex;
	display: -webkit-flex; /* Safari */
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 110rpx;
	padding: 0 60rpx 0 45rpx;
	border-top: 2rpx solid #f8f8f8;
	box-sizing: border-box;

	.form-title {
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 500;
		color: rgba(65, 65, 65, 1);
	}
	
	.form-value {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 300;
		color: rgba(121, 121, 121, 1);
		
		&:first-child{
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
		font-size: 26rpx;
	}
	input[type='text'] {
		padding-right: 12rpx;
	}
	
	/* #ifdef H5 */
	.input-placeholder {
		font-size: 26rpx;
	}
	/* #endif */
}
.form-btn {
	margin: 75rpx auto;
	width: 640rpx;
	height: 90rpx;
	border-radius: 45rpx;
	background: rgba(76, 111, 243, 1);
	
	text {
		display: flex;
		justify-content: center;
		justify-items: center;
		font-size: 30rpx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}
}
</style>
