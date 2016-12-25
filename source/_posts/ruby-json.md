---
layout: post
title: "ruby解析json"
date: 2015-09-25 16:39:36
description: "ruby解析json"
category: 
tags: []
mathjax: false
toc: false
highlight: true
---

做项目的时候需要一个小工具，为了方便就用ruby脚本写了一个小工具，这个小工具有个功能需要对json数据做解析，小工具实现了，顺便就把ruby中解析json的过程记录下来。

JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式，简单易用便于阅读和理解，最重要的是几乎所有的语言基本都支持json并且都有很多好用的解析工具，很多的api接口也都使用json作为数据交换格式。

<!-- more -->

## 环境配置

1.ruby编码解码json首先本地需要安装ruby的开发环境，安装方式有很多种，windows上建议下载`RubyInstaller for Windows`安装包进行安装。

2.通过gem的方式安装`json模块`，通过RubyInstaller安装的ruby中默认已经安装好了`rubygems`

`gem install json`		

## 使用ruby解析json

**需要解析的高三一班部分学生json格式数据,存储在`classInfo.json`文件中**

	[
	    {
			"name": "小美",
			"class": "高三一班"
			"id": "1",
			"phone": "66666661"
	    },
	    {
			"name": "小雷",
			"class": "高三一班",
			"id": "2",
			"phone": "66666662"
	    },
	    {
			"name": "小红",
			"class": "高三一班",
			"id": "3",
			"phone": "66666663"
	    }
	]

**ruby脚本**

	# encoding: utf-8
	require 'json'  #导入json模块
	require 'pp'

	json = File.read('classInfo.json')   #读取classInfo.json文件中的json字符串
	classInfo = JSON.parse(json)         #字符串转换为json对象
	pp classInfo                       #输出json对象

	# 迭代所有学生的信息
	puts  "-------------学生信息如下--------------"
	classInfo.each do |stu|
		puts stu["id"]+"   "+stu["name"]+"  "+stu["class"]+"    "+stu["phone"]
	end
	puts  "---------------------------------------"


**输出结果**

	[{"name"=>"\u5C0F\u7F8E",
	  "class"=>"\u9AD8\u4E09\u4E00\u73ED",
	  "id"=>"1",
	  "phone"=>"66666661"},
	 {"name"=>"\u5C0F\u96F7",
	  "class"=>"\u9AD8\u4E09\u4E00\u73ED",
	  "id"=>"2",
	  "phone"=>"66666662"},
	 {"name"=>"\u5C0F\u7EA2",
	  "class"=>"\u9AD8\u4E09\u4E00\u73ED",
	  "id"=>"3",
	  "phone"=>"66666663"}]

	-------------学生信息如下--------------
	1   小美  高三一班    66666661
	2   小雷  高三一班    66666662
	3   小红  高三一班    66666663
	---------------------------------------

**Tips**

`JSON.pretty_generate(json)`方法可以美化json输出 
