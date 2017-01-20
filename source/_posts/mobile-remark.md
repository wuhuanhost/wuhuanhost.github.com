---
layout: post
title: "html5，css3前端开发Tips【持续整理添加】"
date: 2016-01-11 11:06:30
description: "html5，css3前端开发Tips【持续整理添加】"
category: html5笔记
tags: [tips]
mathjax: false
toc: true
highlight: true
cdn: "header-on"
header-img: banner_2.jpg
---

html5,css3开发备忘......

<!-- more -->

### **单行文字垂直居中**

`html代码`

			 <div id="row">单行文字垂直居中，单行文字垂直居中，单行文字垂直居中</div>

`css代码`
	
		#row {
			display: block;
			height: 100px;
			line-height: 100px;
			width: 600px;
			background-color: #d5effc;
		    }

### **多行文字垂直居中**

`html代码`
	
		    <div id="wrap">
				<div id="content">多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中</div>
		    </div>


`css代码`
	
			#wrap {
				display: table;
				width: 600px;
				height: 150px;
				background-color: #f780a4;
			    }
			    
			#content {
				display: table-cell;
				vertical-align: middle;/**垂直居中**/
			    }


### **单行文本溢出**

`html代码`

			<div id='text-overflow'> 单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出 </div>


`css代码`

			    #text-overflow {
					width: 200px;/**设置显示的长度**/
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-overflow: ellipsis;
					/* IE/Safari */
					-ms-text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					/* Opera */
					-moz-binding: url("ellipsis.xml#ellipsis");
					/*FireFox*/
					background-color: #f4cd89;
			    }




### **多行文本溢出**

`html代码`

			<div id='more-text-overflow'>
				webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出
			 </div>		

`css代码`
	
			    #more-text-overflow {
					width: 600px;
					display: -webkit-box;
					-webkit-line-clamp: 3;/*显示的行数,多余的行数将被隐藏*/
					-webkit-box-orient: vertical;
					overflow: hidden;
					background-color: #dcf791;
			    }


### **表格细边框设置**

`css样式代码`

			    table,table th,table td{
					border:1px solid #999;
					border-collapse: collapse;
			    }


### hr细边框

		hr{
		    height: 1px; background:#ccc; border:0;
		}



### ios系统浏览器滚动不流畅解决方法

		-webkit-overflow-scrolling: touch;
		或者使用
		iscroll.js


### ios系统





[查看效果](/demo/mobile-remark.html)


## 备注

* 原文链接：[http://www.mengxiangjia.info/2016/01/11/mobile-remark/](http://www.mengxiangjia.info/2016/01/11/mobile-remark/) 
* 版权声明：自由转载-非商用-非衍生-保持署名 | <a href='http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh'>Creative Commons BY-NC-ND 3.0</a>





