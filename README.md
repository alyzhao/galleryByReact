## 项目概览
链接:https://gegehehehe.github.io/galleryByReact/ <br />

项目需求：
- 刷新网页，每张图片随机排布，而且图片在-30度~30度之间随机旋转
- 点击位于中心的图片，翻转
- 点击除了中心外的图片，与中心图片互换位置
- 圆点导航栏：
  - 位于中心的图片所在的导航点，高亮显示。点击该圆点，图片翻转
  - 位于四周的图片所在的导航点，被点击时，与中心图片互换位置

## 项目简介
- 使用`YEOMAN`搭建项目，生成项目文件、代码结构
- 使用`webpack`实现前端自动化
- 使用`HTML5`新增标签，如`<section>、<figure>、<figcaption>、<nav>`等
- 使用`lessc`编译器将less文件编译成css文件，并使用`wr`工具，实现chrome调试样式并映射到本地文件保存
- 使用`react+ES6`框架完成画廊页面制作
- 使用`CSS3`的transition属性，实现旋转、平移、背景色的逐渐过渡
- 使用`iconfont`字体文件代替图片文件，支持CSS3对字体的修饰效果
- 使用`json`格式存放图片信息

## 在本地打开项目
```bash
# 在终端执行以下命令安装环境依赖(下载慢的情况下，可以使用淘宝镜像：cnpm；或者直接在终端使用代理翻墙)
  npm install

# 安装成功后执行以下命令，即可在浏览器中打开
  npm start

# dist文件的编译，执行
  npm run dist
```


