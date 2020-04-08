<template>
	<view class="page">
		<!-- 轮播 -->
		<uni-swiper-dot :info="bannerUrl" :current="current" mode="default" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" autoplay="true" interval="5000" duration="1000" circular="true" @change="change">
				<swiper-item v-for="(item, index) in bannerUrl" :key="index">
					<view class="swiper-item"><image class="image" :src="item" mode="aspectFill" /></view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<view class="share-tab" style="display: flex; align-items: center; justify-content: space-between;">
			<!-- 收藏和分享 -->
			<view class="collection-share">
				<icon :class="['iconfont', iscollect ? 'icon-xin1' : 'icon-shoucang']" @click="acollect"></icon>
				<icon class="iconfont icon-fenxiang" @click="share"></icon>
			</view>
			<view class="weui-navbar">
				<block v-for="(item, index) of tabs" :key="index">
					<view :id="index" :class="['weui-navbar__item ', activeIndex == index ? 'weui-bar__item_on' : '']" @click="tabClick">
						<view class="weui-navbar__title">{{ item }}</view>
					</view>
				</block>
				<view class="weui-navbar__slider" :style="{ left: `${sliderLeft}px`, transform: `translateX(${sliderOffset}px)` }"></view>
			</view>
		</view>

		<!-- 内容 -->
		<block>
			<!-- 内容1 -->
			<view class="weui-tab__panel" v-show="activeIndex == 0">
				<view class="weui-tab__content">
					<view class="active_name">{{ vo.theme}}</view>
					<view>举办单位：{{ vo.postUnit}}</view>
					<view>报名时间：{{ vo.applyStartTime}} - {{ vo.applyDeadline }}</view>
					<view>面向人群：{{ vo.crowd }}</view>
					<view class="remark">
						<text>备注：</text>
						{{vo.note}}
					</view>
					<view class="file">
						<image src="http://mumu-small.oss-cn-shenzhen.aliyuncs.com/img/active/word.png"></image>
						<text @click="viewDoc">在线预览活动策划</text>
						<text @click="downLoadDoc">下载</text>
					</view>
				</view>
			</view>

			<!-- 内容2 -->
			<view class="activity_tearm" v-show="activeIndex == 1">
				<block>
					<teamitem 
						:name="item.name" 
						:title="item.title" 
						:content="item.content"></teamitem>
				</block>
			</view>
		</block>
	</view>
</template>

<script>
var app = getApp();
const common = require('../../../publicjs/common.js');
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'; //轮播

export default {
	components: {
		uniSwiperDot
	},
	data() {
		return {
			iscollect: false, //检查是否已经被收藏
			//轮播图
			bannerUrl: ['https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg','https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'],
			current: 0, //轮播
			dotsStyles: {}, //轮播样式

			//tab选项卡
			tabs: ['活动详情','组  队'],
			activeIndex: 0, //当前的选项卡。0：活动详情，1：组队
			sliderOffset: 0,
			sliderLeft: 0,
	
			//活动详情
			// vo: {
			// 	theme: '',
			// 	postUnit: '',
			// 	applyStartTime: '',
			// 	applyDeadline: '',
			// 	crowd: '',
			// 	note: '',
			// },
			
			vo: {
				"id":"00006",
				"theme":"微电影大赛",
				"posters":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586104414589&di=15e8b9148233e7d8e130ff63cd36a87a&imgtype=0&src=http%3A%2F%2Fwww.hrtv.cn%2Ftemplets%2Fdefault%2F2017new%2Fimage%2Fsmallvideo.jpg",
				"document":"https://cmrs-dev.oss-cn-chengdu.aliyuncs.com/adocment/%E8%81%8C%E4%B8%9A%E7%94%9F%E6%B6%AF%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98.docx",
				"postUnit":"重庆文理学院",
				"types":"艺术",
				"crowd":"重庆文理学院全校学生",
				"region":"校级",
				"note":"重庆文理学院",
				"city":"重庆",
				"district":"永川区",
				"college":"重庆文理学院",
				"department":"全体学生",
				"applyStartTime":"2020-05-20",
				"applyDeadline":"2020-05-27",
				"openTeam":0
			},
			
			
			activeParams: {
				id: "", //活动参数值
			},
			
			//组队
			teamList: [
				{
					name:'Annine_',
					title:'参加重庆市计算机设计大赛',
					content:'12月17日，位于日内瓦的世界贸 。易组织（总部并不平静当天，WTO对美国  展开贸易政策审议。在会议上，中国对美国今年以来实施的钢铝关税等单边主义和保护主义政策以及美国阻挠上诉。'
				},
				{
					name:'Annine_2',
					title:'报考驾校组队优惠1000元',
					content:'12月17日，位于日内瓦的世界贸 。易组织（总部并不平静当天，WTO对美国  展开贸易政策审议。在会议上，中国对美国今年以来实施的钢铝关税等单边主义和保护主义政策以及美国阻挠上诉。'
				},
			]
		};
	},
	onLoad(option) {
		if(typeof option != "undefined" || option != "") {
			this.activeParams.id = option.url
		}
	},
	onShow() {
		//获取字体
		common.fonts();
		this.getlist(); 
		this.checkCollect(); //检查是否收藏
	},
	methods: {
		//获取页面数据
		getlist() {
			let url = "/activity/detail";
			if(this.activeIndex == 1) {
				url = "";
				return; //记得删除哦
			}
			common
				.requestURL({
					url: url,
					method: 'GET',
					params: {
						id: this.activeParams.id
					}
				})
				.then(res => {
					if(res.code == 200) {
						this.vo = res.data;
						this.bannerUrl = [];
						if(typeof res.data.posters != "undefined") {
							this.bannerUrl = res.data.posters.split("||");
						}
					}
				});
		},
		//检查是否已经收藏
		checkCollect(){
			common.requestURL({
				url: '/activity/collect/check',
				params: {
					id: this.activeParams.id
				},
				method: 'GET',
			}).then( res => {
				console.log(res);
				if(res.code == 200) {
					
				}
			})
		},
		
		//轮播切换
		change: function(e) {
			this.current = e.detail.current;
		},
		//预览文档
		viewDoc: function() {
			uni.downloadFile({
				url: this.vo.document,
				success(res) {
					if (res.statusCode === 200) {
						const filePath = res.tempFilePath;
						uni.openDocument({
							filePath,
							success(res) {
								console.log('打开文档成功');
							}
						});
					}
				}
			});
		},
		//下载文档
		downLoadDoc: function() {
			let doxurl = this.vo.document; //文档路径
			uni.downloadFile({
				url: doxurl,
				success(res) {
					const filePath = res.tempFilePath;
					uni.saveFile({
						tempFilePath: filePath,
						success(res) {
							let savedFilePath = res.savedFilePath;
							
							uni.getSavedFileInfo({
							  filePath: doxurl,
							  success: function (res) {
							    console.log(res);
								
								uni.showToast({
									title: '下载成功,路径为：' + savedFilePath,
									duration: 2000
								});
								
							  },
							  fail(res) {
								console.log(res);
								uni.showToast({
									title: "文件下载失败！"
								})
							  }
							});
							
							
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}
			});
		},

		//收藏
		acollect(e) {
			//检查是否已经收藏
			console.log("点击了收藏按钮")
			console.log(e);
			e.target
			
			// commonn.requestURL({
			//   url: "/activity/collect",
			//   method: "GET",
			//   params: {
			//     id: this.data.vo.id
			//   }
			// }).then(res=>({

			// }))
		},
		
		//分享
		share() {
			
		},

		//选项卡切换
		tabClick(e) {
			this.sliderOffset = e.currentTarget.offsetLeft;
			this.activeIndex = e.currentTarget.id;
		}
	}
};
</script>

<style scoped>
	.share-tab {
		width: 100%;
		height: 110rpx;
		border-bottom: 2rpx solid #4c6ff3;
	}
.weui-navbar {
	width: auto;
	top: unset; //去除top之前的属性值
	border-bottom: none;
	color: #585858;
	font-size: 0.9rem;
}
.weui-navbar__item {
	flex: unset;
	padding: 12rpx 16rpx;
}
.weui-navbar__item .weui-navbar__title {
	padding: 10rpx 16rpx;
}

.weui-navbar__item.weui-bar__item_on .weui-navbar__title {
	color: #ffffff;
	background-color: #4c6ff3;
	font-size: 0.7rem;
	border-radius: 15rpx;
}
.weui-navbar__slider {
	display: none;
}

/* 收藏和分享 */
.collection-share {
	position: absolute; 
	/* display: flex; */
	
	right: 0;
}

.collection-share icon {
	font-size: 42rpx;
	margin-right: 25rpx;
	color: #515151;
	/* margin-top: 20rpx */
}

/* 活动详情 */
.weui-tab__content {
	color: #585858;
	font-size: 0.8rem;
	padding: 30rpx 40rpx;
}
.active_name {
	font-family: PangMenZhengDao;
	font-size: 1.2rem;
}

.remark {
	font-size: 0.6rem;
	margin-top: 50rpx;
}
.remark text {
	color: #4c6ff3;
	padding-right: 10rpx;
}
.file {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 200rpx;
}
.file image {
	width: 70rpx;
	height: 70rpx;
}
.file text {
	text-decoration: underline;
	color: #4c6ff3;
}
.file text:nth-child(2) {
	margin: 0 40rpx;
}
.swiper-item .image {
	width: 100%;
}

/* 组队 */
.activity_tearm {
	margin: 30rpx 18rpx;
	/* padding-top: 100rpx; */
}
.tearm_item {
	width: 704rpx;
	height: auto;
	margin: 0 auto;
	border-radius: 20rpx;
	background: rgba(248, 248, 248, 1);
}
.tearm_item .title {
	/* display: flex;
	align-items: center; */
	margin: 0 9px;
	padding: 22rpx 0;
	height: 100rpx;
	border-bottom: 2rpx solid rgba(162,185,253,1);
}
.tearm_item .title view:first-of-type {
	display: inline-block;
}
.tearm_item .avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}
.tearm_item .tearm-mid {
	display: inline-block;
	vertical-align: super;
	margin-left: 24rpx;
}
.tearm_item .tearm-mid view {
	font-size:20rpx;
	font-family:Microsoft YaHei;
	font-weight:300;
	color:rgba(65,65,65,1);
}
.tearm_item .tearm-mid view:first-of-type{
	font-size:28rpx;
	font-family:Microsoft YaHei;
	font-weight:bold;
	color:rgba(88,88,88,1);
}
.right {
	position: absolute;
	right: 24px;
	height: 50px;
	line-height: 50px;
	font-size: 24rpx;
	font-family:Microsoft YaHei;
	font-weight:300;
	color:rgba(74,87,106,1);
}
.tearm-mid .iconfont {
    font-size: 0.6rem;
    color: #1297DC;
    margin-right: 5px;
}
</style>
