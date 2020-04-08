# 募校园
## 1. 编写目的

根据调查 400 人次调查线上调研、学生会工作经验及线下调查，发现在校生获取活动主 要途径是社交平台，朋友告知。网络也有提供类似活动的平台，但仅仅提供了校内及市级活 动，缺乏由商家提供利于大学生提升等活动。而本平台提供了更为独特的宣传模式，集合宣 传策划展示及组队招募，进一步提升的大学生参与活动的积极性，实现大学生专门的多样化 活动获取，为大学生提供更多的活动以达到提升当代大学生自身素质水平的目的，同时达到 推动发展本平台的其他特色功能的效果。

该项目具有 平台资讯、活动、用户个人中心、通知、反馈、团队招募 6个模块功能，其中已完成 主页、资讯、活动、通知、团队招募前端设计。

## 2. 结构图

![募校园需求结构图](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/需求结构图.png)

## 3. 分工情况

我负责 主页、资讯、个人中心-活动、通知、反馈前端页面实现  以及 所有页面接口对接，性能的优化，打包部署上线。

另外一个负责：团队招募模块、搜索模块、个人中心-团队招募模块 前端页面。不负责接口对接。

> 注：因悬赏模块功能较为复杂，实现耗时较长 以及 个人账户无法支持支付功能，故暂不开发此功能。

##  4. 完成情况

目前已完成 主页、资讯、活动、个人中心、通知、团队招募 等前端布局，以及主页、资讯、活动 页面接口对接。该项目处于开发中。

## 5.涉及技术栈

- 自定义圆弧导航，采用 uni.getSystemInfo()获取系统，计算不同平台的导航间距， 从而做到适应各端设备，避免出现样式上的兼容问题
- 使用 web-view 组件实现小程序外部跳转
- tabs 选项卡切换
- 采用 onPullDownRefresh（）下拉监听事件，实现滚动加载更多方式 显示活动列表，从而提高用户体验感 、 
- 文件上传下载与预览功能、
- swiper 触滑动模块
- 个人信息侧滑效果

## 6. 项目部分截图

> 该项目只展示微信端效果图
>
> 登录

![登录页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/登录.png)

> 主页

![主页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/主页.png)

> web-view外部页面跳转

![web-view外部页面跳转](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/web-view外部跳转.png)

> 侧滑信息页

![侧滑信息页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/侧滑信息页.png)

> 资讯页

![平台资讯](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/平台资讯.png)

> 大学活动列表页

![大学活动列表页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/活动主页.png)

> 活动详情页 

![活动详情页-](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/大学活动详情页.png)

> 组队信息

![组队信息](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/组队信息.png)

> 团队招募列表页

![团队招募列表页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/团队招募主页-2.png)

> 申请加入

![申请加入](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/申请加入.png)

> 团队招募发布页

![团队招募发布页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/团队招募发布页.png)

> 个人中心

![个人中心](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/个人主页.png)

> 个人信息页

![个人信息页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/个人信息页.png)

> 修改个人信息页

![修改个人信息页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/修改个人信息页.png)

> 通知

![通知主页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/通知.png)

> 通知详情页

![通知详情页](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/mu-uniapp/通知详情.png)