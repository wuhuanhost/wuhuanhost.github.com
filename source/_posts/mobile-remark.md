---
layout: post
title: "html5，css3前端开发相关内容整理（持续更新）"
date: 2016-01-11 11:06:30
description: "html5，css3前端开发相关内容整理（持续更新）"
category: html5笔记
tags: [tips,前端笔记]
mathjax: false
toc: true
highlight: true
cdn: "header-on"
header-img: banner_2.jpg
---

web、webapp前端开发过程中遇到的问题的常用处理方式整理。

<!-- more -->


### **1、单行文字垂直居中**

`html`

		<div class="row">单行文字垂直居中，单行文字垂直居中，单行文字垂直居中</div>

`css`
	
		.row {
			display: block;
			height: 100px;
			line-height: 100px;
			width: 600px;
			background-color: #d5effc;
		    }

### **2、多行文字垂直居中**

`html`	

		    <div class="wrap">
				<div id="content">多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中，多行文字垂直居中</div>
		    </div>


`css`
	
			.wrap {
				display: table;
				width: 600px;
				height: 150px;
				background-color: #f780a4;
			    }
			    
			#content {
				display: table-cell;
				vertical-align: middle;/**垂直居中**/
			    }


### **3、单行文本溢出**

`html`

			<div class='text-overflow'> 单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出，单行文本溢出 </div>



`css`

			    .text-overflow {
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


### **4、文本内容自动换行**

			word-break{
				word-wrap: break-word; 
				word-break: normal; 
			}



### **5、多行文本溢出**

`html`

			<div class='more-text-overflow'>
				webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出，webkit浏览器多行文本溢出
			 </div>		


`css`	

			    .more-text-overflow {
					width: 600px;
					display: -webkit-box;
					-webkit-line-clamp: 3;/*显示的行数,多余的行数将被隐藏*/
					-webkit-box-orient: vertical;
					overflow: hidden;
					background-color: #dcf791;
			    }


### **6、表格细边框设置**


`css样式代码`

			    table,table th,table td{
					border:1px solid #999;
					border-collapse: collapse;
			    }


### **7、hr细边框**

				hr{
				    height: 1px; background:#ccc; border:0;
				}


### **8、禁止长按链接与图片弹出菜单**

				a, img {
				    -webkit-touch-callout: none; 
				}


###  **9、safari浏览器下div中的滚动不流畅解决方法**

				-webkit-overflow-scrolling: touch;



> 或者使用**iscroll.js**


### **10、清除手机点击页面标签时候出现高亮**

			* {
			       -webkit-tap-highlight-color: rgba(0,0,0,0);
			}


### **11、改变选中的内容的样式**

		::selection
			{
				color:#ff0000;
			}

		::-moz-selection
			{
				color:#ff0000;
			}


### **12、禁止用户选中文本内容**

		.content {
			-webkit-user-select:none;
			-moz-user-select:none;
			-o-user-select:none;
			user-select:none;
		}


### 微信浏览器页面禁止下拉显示网址信息

> [禁止下拉显示网址信息](https://gist.github.com/wuhuanhost/f978f14976a59bd96dbb567be594dee5)


[查看效果](/demo/mobile-remark.html)




