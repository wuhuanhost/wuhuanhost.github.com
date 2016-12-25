---
layout: post
title: "Express连接mysql数据库实现简单的数据查询"
date: 2015-12-25 11:32:23
description: "Express连接mysql数据库实现简单的数据查询"
category: JavaScript
tags: [node.js,mysql,express]
mathjax: false
toc: false
highlight: true
---

## 第一步，安装node.js
打开[node.js官网](http://www.nodejs.org)，根据系统选择对应的稳定版本进行下载，windows下建议下载`.msi`为后缀的安装文件。因为安装好后环境变量也会帮你配置好，新版的nodejs安装好包管理工具`npm`也会默认帮你安装好。

<!-- more -->

安装好后使用`win+r`组合键打开运行对话框，在对话框中输入cmd打开命令窗口，输入

	 node -v

如果不报错，并且打印出版本号信息

	v4.2.4   # 我的nodejs版本号

然后输入

	 npm -v

如果不报错，并且打印出版本号信息

	3.5.3     # 我的npm版本号

那么说明nodejs和npm都安装成功了，我使用的nodejs的版本号是v4.2.4 LTS这是一个长期支持的版本。



## 第二步，数据库中建立一张测试表
打开***`Navicat`***连接mysql，新建一个测试数据库`bookinfo`,选中`bookinfo`数据库，新建查询编辑器并且输入如下建表语句建立一张`books`测试表		

	DROP TABLE IF EXISTS books;
	CREATE TABLE  books 
	(
		id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,	#主键
		book_name VARCHAR(200) NOT NULL,		#书名
		book_author VARCHAR(200) NOT NULL,	#作者 
		book_press VARCHAR(200) NOT NULL,		#出版社
		book_isbn VARCHAR(200) NOT NULL		#isbn	
	)ENGINE=INNODB DEFAULT  CHARSET=utf8 AUTO_INCREMENT=1


添加几条测试数据


	INSERT INTO books VALUES(null,'Java编程思想（第4版）','[美]埃克尔','机械工业出版社','9787111213826');
	INSERT INTO books VALUES(null,'算法导论（原书第3版）','（美）Thomas H.Cormen，Charles E.Leiserson，Ronald L.Rivest，Clifford Stein','机械工业出版社','9787111407010');
	INSERT INTO books VALUES(null,'编程珠玑（第2版·修订版）','[美]乔恩·本特利（Jon Bentley）','人民邮电出版社','9787115357618');
	INSERT INTO books VALUES(null,'深入浅出Node.js','朴灵','人民邮电出版社','9787115335500');
	INSERT INTO books VALUES(null,'Node.js权威指南','陆凌牛','机械工业出版社','9787111460787');
	INSERT INTO books VALUES(null,'HTML5权威指南','（美）弗里曼','人民邮电出版社','9787115338365');



## 第三步，全局安装所需的依赖包和工具包

安装`express`nodejs中的一个web开发框架

	 npm install -g express   #安装

安装`express-generator`应用生成器

	 npm install express-generator -g  #可以帮我们快速创建一个应用的基本结构

安装`mysql`的nodejs驱动包

	 npm install -g mysql      #全局安装驱动包

安装`node supervisor`工具包

	 npm install -g supervisor  #安装

> node.js程序启动后，每次修改了文件必须重新启动服务才会生效，这样的设计提高了性能，却不利于开发调试，supervisor可以帮助我们监视代码的变动，一旦代码有所改变就自动重启服务。


## 第四步，代码实现
使用express-generator生成express基本项目结构

	 express book-web  #生成一个项目

	 cd book-web	#进入生成的项目

	 npm install      #安装项目依赖包

如下就是express-generator帮我们创建的项目的基本结构

	.
	├── app.js
	├── bin
	│   └── www			#项目的入口
	├── package.json
	├── public			#静态资源文件夹
	│   ├── images				#图片资源
	│   ├── javascripts			#javascript文件
	│   └── stylesheets			#样式文件
	│       └── style.css
	├── routes			#路由文件夹
	│   ├── index.js
	│   └── users.js
	└── views			#视图文件夹 
	    ├── error.jade
	    ├── index.jade
	    └── layout.jade

安装mysql驱动包到项目中

	 npm install mysql -save    # 安装到项目

在`routes`中添加一个`book.js`文件，将如下内容写入`book.js`中

	//加载express
	var express = require('express');

	//通过express获取Router对象
	var router = express.Router();

	//加载bookDao
	var bookDao = require('../dao/bookDao');

	//拦截/book请求
	router.get('/', function(req, res, next) {
	    res.send('respond with a resource');
	});

	/**
	 * 查询全部书籍信息
	 * 访问链接 localhost:3000/book/queryAll
	 * @param  {[type]} req   [description]
	 * @param  {[type]} res   [description]
	 * @param  {[type]} next) {               bookDao.query(req, res, next);} [description]
	 * @return {[type]}       [description]
	 */
	router.get('/queryAll', function(req, res, next) {

	    bookDao.queryAll(req, res, next);

	});


	module.exports = router;

	
项目根目录新建`dao`文件夹，并且在文件夹中新建`bookDao.js`,写入如下代码
	
	//加载mysql驱动
	var mysql = require('mysql');

	//创建连接  
	var client = mysql.createConnection({
	    host: '192.168.1.200', //数据库的ip地址
	    user: 'root',
	    password: 'root',
	    database: 'bookinfo',
	    port: 3306
	});

	//连接
	client.connect();

	module.exports = {
	    queryAll: function(req, res, next) {
		client.query('select * from books', function(err, results, fields) {
		    if (err) {
			throw err;
		    }
		    if (results) {
			// 返回json
			// res.json(results);
			var arr = [];
			for (var i = 0; i < results.length; i++) {
			    console.log("%d\t%s\t%s", results[i].id, results[i].book_name, results[i].book_author, results[i].book_press, results[i].book_isbn);
			    var book = {};
			    book.id = results[i].id;
			    book.name = results[i].book_name;
			    book.author = results[i].book_author;
			    book.press = results[i].book_press;
			    book.isbn = results[i].book_isbn;
			    arr.push(book);
			}
			//返回视图
			res.render('book', {
			    "data": arr,
			    "name": "李明",
			    "pwd": "123456"
			});
		    }
		    client.end();
		});
	    }
	}

在`views`文件夹中新建`book.jade`文件，在文件中写入如下内容
	
	// 继承默认布局模版
	extends layout
	block content
	  h1 图书信息列表
	  table
	   tr
	     th="ID"
	     th="书名"
	     th="作者"
	     th="出版社"
	     th="ISBN"
	   //迭代后台传过来的数据 
	   each item in data
	    tr
	     td=item.id
	     td=item.name
	     td=item.author
	     td=item.press
	     td=item.isbn

> jade是express默认的模版渲染引擎，如果觉的这种代码方式不习惯，你也可以安装使用ejs模版引擎

修改项目根目录的app.js文件在`var users = require('./routes/users');`后面添加
	
	var book = require('./routes/book');  #加载book路由

在`app.use('/users', users);`后面添加
	
	app.use('/book', book)  #指定/book路径使用的路由

简单修改下`table`和`h1`的样式，在`public/stylesheets/style.css`文件中添加如下代码
	
	h1{
		font-size:36px;
	}

	table,
	table td,
	table th {
	    border: 1px solid #999999;
	    border-collapse: collapse;
	    padding:10px;
	}

	table th{
		background-color: #e3e3e3;
		color: #cf4646;
		font-size:16px;
		font-family: '微软雅黑'
	}

## 第五步，启动项目，测试

		 supervisor ./bin/www        # 启动项目


## 第六步，测试结果

	浏览器输入  http://localhost:3000/book/queryAll

![nodejs-express-mysq](/images/nodejs-express-mysql.jpg)




到此使用nodejs+express+mysql实现的简单数据***单表数据全查***操作已经完成。

## 参考文档

* jade模版引擎详细文档见 [**jade官网**](http://jade-lang.com/)

* express详细文档见 [**express中文网**](http://www.expressjs.com.cn/)

* node.js参考文档见 [**node.js中文网**](http://nodejs.cn/)

## 备注

* 原文链接：[http://www.mengxiangjia.info/2015/12/25/nodejs-express-mysql-basic-md/](http://www.mengxiangjia.info/2015/12/25/nodejs-express-mysql-basic-md/) 
* 版权声明：自由转载-非商用-非衍生-保持署名 | <a href='http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh'>Creative Commons BY-NC-ND 3.0</a>

