##记录问题
1.修改测试的端口号在cfg/default.js 中修改dfltPor
2.git 操作:
	> 新建repositories 
	> git clone url
	> git add -A 	// 全部添加
	> git commit -m "describe"
	> git push 		// 提交到github
3.ES6特性：
	let  申明块级作用变量
	const  申明常量
	extends  继承
	super	关键字，它指代父类的实例（即父类的this对象）。子类必须在constructor方法中调用super方法，否则新建实例时会报错。
	arrow function 	(parma) => {}
	`...${a}...` 	输出变量
	export与export default均可用于导出常量、函数、文件、模块等
	import (常量 | 函数 | 文件 | 模块)名的方式将其导入

4.Array的map()方法
	arr.map((x) => retuen x*x )		// 输出数组元素的平方






遇到的错误:
	1.imageDatas没有解析出来,defaut.js中添加对.json的解析 npm install json-loader
	2.App.less 没有解析出来, npm install less-loader    // 尝试另一种方法使用lessc 和 wr



