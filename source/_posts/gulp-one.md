---
layout: post
title: "gulp使用笔记"
date: 2015-09-24 15:15:36
description: "随笔..."
category: 前端开发
tags: [前端工具,web前端]
mathjax: false
toc: true
highlight: true
---

如果科学技术是第一生产力，那么客观需求就是学习的动力，也就是说学习一种新的东西知识首先要明白它的作用是什么，如果弄不清楚这个原因我们会去排斥学习它的，甚至根本不想去学习它。所以我们开始就来说说为什么要使用项目自动化构建工具，以及gulp的有点，本文仅仅是自己学习使用后的整理笔记，分享给还在使用手动构建项目和需要它的人们，所以高手可以略过......

<!-- more -->

## 为什么要使用项目自动化构建工具？

假如下面是我们正在做的一个项目的基本结构

		|-{project name}
		     |-source
		        |-js
		        |-css
		        |-images
		     |-dist
		        |-js
		        |-css
		        |-images
		     |-doc
		     |-test
		     |-index.html
		       .
		       .
		       .

在开发的时候常会把`js,css,images`文件放在项目的`source文件夹`对应的文件夹中，当发布这个项目时候，有一下几点基本构建要求和步骤

1. 清理`dist/`目录下的所有文件
2. `source/js`文件夹中的所有的`js文件`合并，压缩,改名为`mian.min.js`，同时保留一份未压缩的`main.js`，然后将这两个文件复制到`dist/js`中。
3. `source/css`文件夹中的所有`css文件`合并，压缩,改名`style.min.css`，同时保留一份未压缩的`style.css`，然后将这两个文件复制到`dist/css`中。
4. `source/images`中的所有的图片压缩之后复制到`dist/images`中
5. 根目录中的所有的`html文件`压缩后复制到`dist目录`中

如果项目中的文件很少我们可以手工一个一个去处理，**但是**如果项目中的`js,css,images,html`很多，那么手工处理会很**无趣**，而且极容易出错，而且实际的情况下构建任务远比这个复杂的多，比如有时候还要编译项目中`Sass`,`CoffceScript`等预编译语言文件，如果这个时候我们学会使用某种构建工具，那么我们会发现手工构建和自动构建就像是原始农耕走向了机械化生产......***一旦遇见便会爱恋***。



## gulp在项目构建上的优点

`gulp`是目前比较流行的前端项目构建工具，流行的前端框架`Angular`就是使用它构建的。经常拿他来做比较的前端构建工具还有`grunt`,著名的`jquery`就是用它构建的。

***1. gulp的api非常的简单，这也是我使用它的原因之一，掌握下面四个函数就可以使用gulp进行前端项目自动化构架了。***

 *  `gulp.src(globs[, options])`
	 获取一个或一组虚拟文件流（Vinyl files）

 *  `gulp.dest(path[, options])`
	 写文件,并且重新输出（emits）所有数据到指定文件夹，文件夹如果不存在会自动创建

 *  `gulp.task(name[, deps], fn)`
	 定义一个任务，如果需要在命令行下运行某些任务，任务名中请不要用空格

 *  `gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])`
	 监视文件，并且可以在文件发生改动时候做一些事情

	[详细api文档](http://www.gulpjs.com.cn/docs/api/)

***2. 通过脚本代码的方式来构建任务，比配置文件的方式更加灵活方便***
***3. 一个插件只完成一个功能，多个插件组合可以实现复杂的构建任务，而且代码比较清晰***
***4. 基于流的方式，不会产生中间文件***


## gulp安装运行

由于`gulp`是基于`node.js`的所以要在本机安装`node.js`的运行环境，`node.js`安装好了就可以使用`npm`来安装gulp了 `npm是node.js的包管理工具，安装node.js的时候就会默认安装`

1. **安装命令行工具**
`npm install -g gulp`

2. **在项目下安装gulp依赖<devDependencies>组件**
`npm install gulp --save`
    ***-save和-save-dev***
    `npm install module-name -save 自动把模块和版本号添加到dependencies部分`
    `npm install module-name -save-dev 自动把模块和版本号添加到devdependencies部分`

3. **创建Gulpfile.js文件，初始内容为**

		var gulp = require('gulp');//加载gulp
		  
		gulp.task('default', function () {//执行默认任务

			//任务内容

		});

4. **运行（在项目根目录下使用命令行运行如下命令）**
`gulp`
***执行指定任务***   `gulp <task1> <task2>`


**常用插件**


		sass的编译                   	（gulp-ruby-sass）
		自动添加css前缀              	（gulp-autoprefixer）
		压缩css                      	（gulp-minify-css）
		js代码校验                   	（gulp-jshint）
		合并js文件                   	（gulp-concat）
		压缩js代码                   	（gulp-uglify）
		压缩图片                     	（gulp-imagemin）
		自动刷新页面                 	（gulp-livereload）
		图片缓存，只有图片替换了才压缩	（gulp-cache）
		更改提醒                    	（gulp-notify）
		清除文件                    	（del）
		html压缩                     	（gulp-htmlmin）





