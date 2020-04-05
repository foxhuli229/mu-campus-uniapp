<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	//全局变量
	globalData: {
		//主机域名 https://www.gomumu.top
		host: 'http://192.168.0.5:8025',
		//OSS 存储系统域名
		oosHost: 'https://cmrs-oos.oss-cn-beijing.aliyuncs.com/' //图片host
	}
};
</script>

<style>
@import '/wxcomponents/weui.wxss';
@import '/wxcomponents/iconfont.wxss';

/*每个页面公共css */
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 200rpx 0;
	box-sizing: border-box;
}

/* 水平滚动 */
.classify_list {
	display: flex;
	align-items: center;
	overflow-y: hidden;
	white-space: nowrap;
	width: 80%;
	height: 50rpx;
	line-height: 50rpx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 4rpx 15rpx 1rpx rgba(115, 115, 115, 0.25);
	border-radius: 20rpx;
	margin: 5rpx auto;
	color: #797979;
	font-size: 0.8rem;
	padding: 17rpx 9rpx;
}

.classify {
	height: 100%;
	width: 100rpx;
	margin-right: 40rpx;
	line-height: 50rpx;
}
.classify.active_classify {
	transition: all 1s;
	border-radius: 15rpx;
	background: #4c6ff3;
	color: #fff;
	padding: 5rpx 19rpx;
}

.blue_color {
	color: #4c6ff3;
}
.red_color {
	color: #ff3b3b;
}
</style>
