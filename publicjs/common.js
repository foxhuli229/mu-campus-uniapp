const app = getApp();
console.log(app.globalData.host)
const requestURL = ({
	url,
	method = "POST",
	params
}) => {
	// 返回一个Promise实例对象
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中',
		})
		//获取token
		var token = uni.setStorage("token")
		console.log(token);
		uni.request({
			url: app.globalData.host + url,
			header: {
				"token": token,
				// 'content-type': "application/x-www-form-urlencoded"
				'content-type': "application/json;charset=utf-8"
			},
			method: method,
			data: params,
			success: res => {
				resolve(res.data);
			},
			fail: function(res) {
				uni.showToast({
					title: res.errMsg || url + '调用失败！',
					icon: 'none',
					duration: 2000,
					mask: true
				})
				reject(res)
			},
			complete: function() {
				//接口调用结束的回调函数
				uni.hideLoading()
			}
		})
	})
}

/**
 * 检查token是否存在
 */
const checkToken = function checkToken() {
	let token = uni.getStorageSync({key: 'token'});
	console.log("token值为：", token);
	if(typeof token === "undefined" || typeof token === "") {
		uni.redirectTo({
			url: '/pages/home/login/login.vue'
		})
	}else {
		//检查token是否存在
		uni.checkSession({
			fail: (res) => {
				uni.request({
					url: app.globalData.host + "/user/refresh",
					method: 'POST',
					data: {"token": uni.getStorageSync("token")},
					success: (res) => {
						console.log("刷新了token值", res);
						uni.setStorage({key: 'token', data: res.token})
					}
				})
			}
		})
	}
}

/**
 * 检查是否登录
 * 从本地缓存中异步获取指定 key 对应的内容。
 */
const checkLogin = function checkLogin() {
	uni.checkSession({
		fail: () => {
			login(); //登录
		}
	})
}


/**
 * 登录
 */
const login = function login() {
	uni.login({
		provider: 'weixin',
		success(res) {
			if (res.code) {
				let code = res.code;
				uni.getUserInfo({
					provider: 'weixin',
					success: (userRes) => {
						console.log(userRes);
						let iv = userRes.iv;
						let encryptedData = userRes.encryptedData;
						let param = {
							code,
							iv,
							encryptedData
						}
						console.log(param)
						uni.request({
							url: app.globalData.host +  '/user/wxlogin',
							method: 'POST',
							params: JSON.stringify({ code, encryptedData, iv }),
							success: (res) => {
								res = res.data;
								if (res.code === 200) {
									uni.setStorageSync({key: "token", data: res.data.token});
									uni.setStorageSync({key: "userinfolist", data: res.data.user});
									console.log("common.js 登录成功")
								}else {
									uni.showModal({
										title: '提示',
										content: '登录失败,请重试！',
									})
								}
							},
							fail: (res) => {
								uni.showModal({
									title: '提示',
									content: '登录失败,请重试！',
								})
							}
						})
					},
					fail(userRes) {
						console.log("获取用户信息报错了", userRes);
					}
				})
			} 
		},
		fail: (res) => {
			console.log("登录失败", res)
			uni.showModal({
				title: '提示',
				content: '登录失败,请重试！',
			})
		}
	})
}

// 加载网络字体
const fonts = function fonts() {
	// 动态加载网络字体，文件地址需为下载类型。
	uni.loadFontFace({
		family: "PangMenZhengDao",
		source: "url('https://cmrs-oos.oss-cn-beijing.aliyuncs.com/font/pmzd.ttf')",
	});
}

module.exports = {
	requestURL,
	login,
	fonts,
	checkLogin,
	checkToken
}
