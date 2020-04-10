<template>
	<view class="uni-navbar status_bar">
		<view
			:class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }"
			:style="{ 'background-color': backgroundColor }"
			class="uni-navbar__content"
		>
			<view class="uni-navbar__header uni-navbar__content_view"
				:style="{ color: color, backgroundColor: backgroundColor, height: customBarHieight + 'px', lineHeight: customBarHieight + 'px' }" 
				>
				<view @tap="onClickLeft" 
				class="uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view"
				:style="{marginTop : customTitleTop}">
					<view class="uni-navbar__content_view" v-if="leftIcon.length"><uni-icons :color="color" :type="leftIcon" size="40" /></view>
					<view :class="{ 'uni-navbar-btn-icon-left': !leftIcon.length }" 
					class="uni-navbar-btn-text uni-navbar__content_view" 
					v-if="leftText.length">
						<text :style="{ color: color, fontSize: '32rpx', height: customBarTitle}">{{ leftText }}</text>
					</view>
					<slot name="left" />
				</view>
				<view class="uni-navbar__header-container uni-navbar__content_view" :style="{marginTop : customTitleTop}">
					<view class="uni-navbar__header-container-inner uni-navbar__content_view" v-if="title.length">
						<text class="uni-nav-bar-text" :style="{ color: color , height: customBarTitle}">{{ title }}</text>
					</view>
					<!-- 标题插槽 -->
					<slot />
				</view>
				<view :class="title.length ? 'uni-navbar__header-btns-right' : ''" @tap="onClickRight" 
						class="uni-navbar__header-btns uni-navbar__content_view"
						:style="{marginTop : customTitleTop}">
					<view class="uni-navbar__content_view" v-if="rightIcon.length">
						<uni-icons :color="color" :type="rightIcon" size="40" />
					</view>
					<!-- 优先显示图标 -->
					<view class="uni-navbar-btn-text uni-navbar__content_view" v-if="rightText.length && !rightIcon.length">
						<text class="uni-nav-bar-right-text" :style="{height: customBarTitle}">{{ rightText }}</text>
					</view>
					<slot name="right" />
				</view>
			</view>

			<!-- 圆角 -->
			<view v-if="circular">
				<view class="white_raduis"></view>
			</view>
		</view>
		
		<!-- 占位 -->
		<view :style="{marginTop: marginTop}"></view>
		
	</view>
</template>

<script>
import uniIcons from '../uni-icons/uni-icons.vue';
/**
 * NavBar 自定义导航栏
 * @description 导航栏组件，主要用于头部导航
 * @tutorial https://ext.dcloud.net.cn/plugin?id=52
 * @property {String} url 跳转的url地址
 * @property {String} circular 是否需要圆角样式
 * @property {String} title 标题文字
 * @property {String} leftText 左侧按钮文本
 * @property {String} rightText 右侧按钮文本
 * @property {String} leftIcon 左侧按钮图标（图标类型参考 [Icon 图标](http://ext.dcloud.net.cn/plugin?id=28) type 属性）
 * @property {String} rightIcon 右侧按钮图标（图标类型参考 [Icon 图标](http://ext.dcloud.net.cn/plugin?id=28) type 属性）
 * @property {String} color 图标和文字颜色
 * @property {String} backgroundColor 导航栏背景颜色
 * @property {Boolean} fixed = [true|false] 是否固定顶部
 * @property {Boolean} statusBar = [true|false] 是否包含状态栏
 * @property {Boolean} shadow = [true|false] 导航栏下是否有阴影
 * @event {Function} clickLeft 左侧按钮点击时触发
 * @event {Function} clickRight 右侧按钮点击时触发
 */
export default {
	name: 'UniNavBar',
	components: {
		uniIcons
	},
	props: {
		url: {
			type: String,
			default: ''
		},
		circular: {
			//是否需要圆角
			type: [Boolean, String],
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		leftText: {
			type: String,
			default: ''
		},
		rightText: {
			type: String,
			default: ''
		},
		leftIcon: {
			type: String,
			default: ''
		},
		rightIcon: {
			type: String,
			default: ''
		},
		fixed: {
			type: [Boolean, String],
			default: true
		},
		color: {
			type: String,
			default: '#000000'
		},
		backgroundColor: {
			type: String,
			default: '#FFFFFF'
		},
		statusBar: {
			type: [Boolean, String],
			default: false
		},
		shadow: {
			type: [Boolean, String],
			default: false
		},
		border: {
			type: [Boolean, String],
			default: false
		}
	},
	data() {
		return {
			customBarHieight: 0 ,//设置自定义导航距离
			customTitleTop: 0 ,//设置自定义标题高度
			customBarTitle: false,
			marginTop: 0, //占位
		};
	},
	created() {
		this.getSystemInfo(); //获取系统信息
	},
	mounted() {
		if (uni.report && this.title !== '') {
			uni.report('title', this.title);
		}
	},
	methods: {
		onClickLeft() {
			console.log(this.$emit('clickLeft'))
			if(this.url !== "") {
				uni.redirectTo({
					url: this.url,
				})
			}else {
				console.log("url地址为空")
			}
		},
		onClickRight() {
			this.$emit('clickRight');
			if(this.url !== "") {
				uni.redirectTo({
					url: this.url,
				})
			}else {
				console.log("url地址为空")
			}
		},
		//获取系统信息
		getSystemInfo() {
			uni.getSystemInfo({
				success: e => {
					// console.log(e);
					let statusBar = 0;
					let customBar = 0;

					// #ifdef MP
					statusBar = e.statusBarHeight;
					customBar = e.statusBarHeight + 39;
					if (e.platform === 'android') {
						this.$store.commit('SET_SYSTEM_IOSANDROID', false);
						customBar = e.statusBarHeight + 50;
					}
					// #endif
					
					// #ifdef MP-WEIXIN
					statusBar = e.statusBarHeight;
					// @ts-ignore
					const custom = uni.getMenuButtonBoundingClientRect(); // 获取胶囊信息
					// console.log(custom);
					if(e.model.includes("iPhone X") ){
						this.customBarTitle = custom.bottom + 'px';
					}else {
						this.customBarTitle = false;
					}
					this.customTitleTop = custom.top/2 + 'px'; 
					customBar = custom.bottom + custom.top - e.statusBarHeight + 10;
					// #endif

					// #ifdef MP-ALIPAY
					statusBar = e.statusBarHeight;
					customBar = e.statusBarHeight + e.titleBarHeight;
					// #endif

					// #ifdef APP-PLUS
					statusBar = e.statusBarHeight;
					customBar = e.statusBarHeight + 45;
					// #endif

					// #ifdef H5
					statusBar = 0;
					customBar = e.statusBarHeight + 60;
					// this.customTitleTop = custom.top/2 + 'px'; 
					// #endif

					this.customBarHieight = customBar;
					this.marginTop = customBar + 25 + "px"

					// 这里你可以自己决定存放方式，建议放在store中，因为store是实时变化的
					this.$store.commit('SET_STATUS_BAR', statusBar);
					this.$store.commit('SET_CUSTOM_BAR', customBar);
					this.$store.commit('SET_SYSTEM_INFO', e);
				}
			});
		}
	}
};
</script>

<style scoped>
	/* .uni-navbar {
		position: fixed;
		top: 0;
		left: 0;
	} */
.uni-nav-bar-text {
	/* #ifdef APP-PLUS */
	font-size: 34rpx;
	/* #endif */
	/* #ifndef APP-PLUS */
	font-size: 32rpx;
	/* #endif */
}

.uni-nav-bar-right-text {
	font-size: 28rpx;
	/* #ifndef weixin */
	height: 20rpx;
	/* #endif */
}

.uni-navbar__content {
	top: 0;
	position: relative;
	background-color: #ffffff;
	overflow: hidden;
}

.uni-navbar__content_view {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	align-items: center;
	flex-direction: row;
	/* background-color: #FFFFFF;
 */
}

.uni-navbar__header {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	/* #ifndef weixin */
/* 	height: var(--status-bar-height + 39);
	line-height: var(--status-bar-height + 39); */
	/* #endif */
	width: 100%;
	font-size: 16px;
	/* background-color: #ffffff;
 */
}

.uni-navbar__header-btns {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-wrap: nowrap;
	width: 120rpx;
	padding: 0 6px;
	justify-content: center;
	align-items: center;
}

.uni-navbar__header-btns-left {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	width: 180rpx;
	justify-content: flex-start;
}

.uni-navbar__header-btns-right {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	width: 150rpx;
	padding-right: 30rpx;
	justify-content: flex-end;
}

.uni-navbar__header-container {
	flex: 1;
}

.uni-navbar__header-container-inner {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex: 1;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
}

.uni-navbar__placeholder-view {
	height: 44px;
}

.uni-navbar--fixed {
	position: fixed;
	z-index: 998;
}

.uni-navbar--shadow {
	/* #ifndef APP-NVUE */
	box-shadow: 0 1px 6px #ccc;
	/* #endif */
}

.uni-navbar--border {
	border-bottom-width: 1rpx;
	border-bottom-style: solid;
	border-bottom-color: #e5e5e5;
}
.uni-nav-bar-text::before{
	display: inline-block;
	content: "";
	height: 100%;
	vertical-align: middle;
}
.white_raduis {
	width: 100vw;
	height: 48rpx;
	background-color: #ffffff;
	border-top-left-radius: 30rpx;
	border-top-right-radius: 30rpx;
	vertical-align: bottom;
}
</style>
