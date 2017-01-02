---
layout: post
title: "golang学习笔记（一）开发环境的搭建"
date: 2017-01-01 15:36:36
description: "golang学习笔记（一）开发环境的搭建"
category: golang笔记
tags: [go语言]
mathjax: false
toc: true
highlight: true
header-img: banner_golang.jpg
cdn: 'header-on'
---

## 下载安装golang 

下载地址:[http://www.golangtc.com/download](http://www.golangtc.com/download)

通过上面的网址下载你操作系统对应的版本的程序进行安装，由于我用的window7所以下载了`go1.7.4.windows-386.msi`这个包，根据安装提示进行安装，安装好之后go使用的一些系统变量也会被设置好。但是我们需要自己设置一个gopath的环境变量。

### GOPATH的设置

`GOPATH` 环境变量指定了你的工作空间位置,除不能和go的安装目录相同，可以放在磁盘的任何位置。
点击开始-》计算机-》右键-属性-》高级系统设置-》环境变量-》新建系统变量：
变量名设置为：GOPATH 
变量值设置为：E:\\study-go   

> 多个GOPATH目录通过分号连接,例如`E:\\study-go;E:\\go-work`

`ctrl+R`打开命令行窗口输入:`go env`输出如下则设置成功。

![go env](/images/go-01-getstart/01.jpg)

### go语言项目基本目录结构介绍


		E:\study-go  # 环境变量中设置的GOPATH路径
		     + bin    # 存放编译后的二进制可执行文件
		     + pkg    # 存放编译后的包文件
		     - src    # 源码目录（必须创建）


### go语言常用的命令

* `go run test.go`运行test.go
* `go build test.go `编译test.go
* `go get 'github.com/'  `安装github的第三方包
* `go help`查看更多的go命令

## 包管理的安装

> 在使用过nodejs的包管理工具npm，python的包管理工具pip,和ruby的包管理工具gem后,他们安装依赖的方式是那么的简单和方便，以至于现在学习go的时候的第一件就是去寻找购go的包管理工具，但是发现go语言到目前为止，官方还没有提供包管理工具，但是Go1.5引入了go vendor目录，用于将go编译时的应用路径搜索调整成为当前`项目目录/vendor目录`的方式。查资料发现go社区有很多基于此的第三方包管理的工具可以使用，这里就选择了[glide][https://github.com/Masterminds/glide](https://github.com/Masterminds/glide) 这个工具来管理go项目的依赖。

### 初始化

		glide init  #glide会扫描代码目录，创建一个glide.yaml文件，记录项目依赖


### 安装指定依赖包


		# "#"后面的0.9.2表示版本号，如果团队协作开发的时候最好指定版本号
		glide get github.com/json-iterator/go#0.9.2


### 查看项目依赖列表


		glide list


### 更新项目依赖列表


		glide update 或 glide up


### glide.yaml文件说明


		package: test
		import:
		- package: github.com/json-iterator/go   #包所在的github仓库的地址
		  version: 0.9.2  #指定包的版本


### 安装项目依赖

>  我们也可以通过glide.yaml配置文件来安装依赖 该命令将会读取glide.lock文件，当glide.lock文件和glide.yaml不同步时，如glide.yaml发生改变，glide将会提供一个警告。运行glide up命令更新依赖树，将会重建glide.lock文件。


		# 安装整个项目的依赖包
		glide install
	

### 使用包管理后的工作目录的结构

		E:\study-go  # 环境变量中设置的GOPATH路径
		     + bin    # 存放编译后的二进制可执行文件
		     + pkg    # 存放编译后的包文件
		     - src    # 源码目录
			  + github.com 
			  - myproject  # 项目文件夹
				    + biz   # 源码目录
				    - a.go  
				    - b.go  
				    - hello-world.go  
				    - glide.yaml  # glide配置文件
				    + vendor  # glide安装的项目依赖都在这个文件夹里
				    - glide.lock


> 有了glide.yaml文件和glide.lock文件，团队开发的时候就不需要吧第三方包纳入到版本控制里面，只需要将这两个文件纳入版本控制就行了。

## 学习文档

> 学习一门语言最好的教程就是官方提供的document、Q&A、wiki、example等，但是的官网经常访问不了，所以我们可以通过下面的方式，来阅读官方文档。


### 本地浏览go官方文档

		godoc -http=:6060


打开命令窗口，执行上面的命令，打开浏览器输入：https://localhost:6060 就可以浏览go的官方文档了。

###　其它文档

对于阅读英文原文文档有障碍的可以看下面这些网站。

* go官方文档中文版 ：[http://zh-golang.appsp0t.com/](http://zh-golang.appsp0t.com/)
* golang中文社区：[http://studygolang.com/](http://studygolang.com/)
* golang中国：[http://golangtc.com/](http://golangtc.com/)
* go项目搜索：[https://gowalker.org/search?q=&auto_redirect=true](https://gowalker.org/search?q=&auto_redirect=true)



## 编辑器推荐

> 学习一门新语言的时候，能不用IDE就不要使用IDE、推荐使用文本编辑器、原因有两个。

* 一、由于ide集成东西比较多，体积大，占用内存多，响应速度慢。

* 二、ide会帮你完成很多的工作，程序编译到执行的过程会被隐藏，使你不能感受和理解整个程序从代码到执行完成的整个过程。

> 当然如果对一门语言熟练掌握了，用它来开发大型系统的时候在去使用IDE，那会帮你节省很多时间。

这里我推荐使用`sublime text3`当然你也可以使用其它的编辑器如`vscode`，`atom`等，按照自己喜好来，我使用sublime text2主要是因为平时用它比较的多。		

## hello world

> 环境搭建好了，下面通过一个“hello world”正式进入go语言编程的世界。

新建一个文件`hello-world.go`,在文件中写入如下代码：


		package main
		import "fmt"
		func main(){
		  var str="我的第一个go语言代码"
		  fmt.Printf("hello world!!!\n")
		  fmt.Printf(str+"\n")
		}


运行`go run hello-world.go`

![go语言版 hello world](/images/go-01-getstart/02.jpg)