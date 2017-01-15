---
layout: post
title: "golang学习笔记（二）go语言基础知识"
date: 2017-01-01 15:36:36
description: "golang学习笔记（二）go语言基础知识"
category: golang学习笔记
tags: [go语言]
mathjax: false
toc: true
highlight: true
header-img: banner_golang.jpg
cdn: 'header-on'
---

## 1、go语言中的关键字

go语言中一共有25个标识符（关键字）他们分别是：
var、const、type、package、import、func、return、defer、go、select、interface、struct、break、case、continue、for、fallthrough、else、if、switch、goto、default、chan、type、map、range。
[关键字的作用见文章末尾附录](#4-1、go中关键字的解释)

## 2、go程序的组成

		package main  #声明包

		import "fmt"  #导入包

		var userName string="李明"  #声明变量

		func main(){
		     fmt.Println("hello world!!!");
		}

### 2.1、包的声明

go语言中通过关键字`package`来声明一个包，语法：`package <包名>`，假如我们声明一个main包`package main`，需要注意的是，包的声明语句必须文件的最上面，不然编译器就会报错。
> 注意：声明为main包的文件中必须存在一个mian方法（入口方法），并且一个程序中有且只有一个main包和main方法。

### 2.2、包的导入

#### 2.2.1、基本方式导入包

导入包使用关键字`import`，语法`import <包名>`，例如导入`fmt`、`time`包的语句：

		import "fmt"
		import "time"

> 注意：如果导入的包没有使用，编译的时候就会出现编译异常。

#### 2.2.2、简写方式导入包

如果有时候需要导入的包比较多，通过上面的方式会写很多的`import`，所以我们也可以通过简便的方式导入多个包，同样是使用关键字`import`，然后使用一对圆括号将所有要导入的包名写在圆括号中，每个包占一行。
同时导入`fmt`、`time`包的语句就变的简单了，如下：

		import (
		     "fmt"
		     "time"
		)

#### 2.2.3、包的重命名

有时候我们在使用自己写的程序包的时候，或者使用第三方程序包的时候，包名的重复在所难免，如果包名相同就会使程序运行出现错误，还有的时候我们觉的导入的包的名字比较长或者拼写比较麻烦，在这些场景下就可以通过包的重命名来重命名导入的包，举个例子：

		package main
		import (
			out "fmt"  //把fmt重命名为out		     	
		)
		main(){
			out.Println("hello world!!!")  //控制台打印hello world!!!		
		}

<!--因为go语言的原码编码类型unicode所以重命名的包名可以是中文，但是避免不必要的问题建议不要使用中文重命名包。-->

### 2.3、代码注释

go语言的注释比较简单，和大多数编程语言差不多。

		package main

		import "fmt"

		/**
		 ** 这是多行注释
		**/
		func main(){

		    fmt.println("hello world!")    //单行注释

		}

### 2.4、函数

> go语言中通过关键字`func`来声明一个函数，如下：

		package main

		import "fmt"

		/**
		** 声明一个自定义函数
		**/
		func myfunc(i int) int{
		     return 2 * i
		}

		func main(){
		     var r int=myfunc(1) //调用函数 并接受返回值
		     fmt.Println(r)   //打印返回值为2
		}


### 2.5、变量的声明

> go语言中通过关键字`var <变量名> <变量类型>`来声明变量。

声明一个变量并且赋值

		var i int=10; //声明一个整形变量，并且为它赋值为10

声明多个变量和赋值

		var i,j int=10,20  //声明两个整型变量i和j并且赋值为i=10和j=20

简写方式声明多个变量（只适用于全局变量）

		var (
		   id int
		   name string
		   sex bool     
		)

> 同时声明了三个变量整型变量id，字符串类型变量name,和bool类型的变量sex

不指定变量类型来声明变量，声明变量的时候不指定类型，通过初始化值来确定变量的类型（这点和使用javascript,python的动态语言的用法很类似）
		
		var b=true;   //声明一个变量b，为它赋值true，所以它的类型应该是bool型的。

简写方式变量声明和赋值（只适用于局部变量）

		name :="李明" //等价于 var name string="liming"

### 2.5、变量作用域

#### 2.5.1、全局变量

在函数体外声明的变量都是全局变量，全局变量可以在所有的函数中使用。

		package main

		import "fmt"

		var param string = "这是一个全局变量,所有函数中都可以使用"

		func main(){
		     fmt.Println(param)
		}

> 注意：全局变量的声明不能省略var关键字

#### 2.5.2、局部变量

在函数体内定义的变量都是局部变量，包括函数的参数和返回值参数。它们只能在当前函数使用。

		package main

		import "fmt"

		func myfunc(){
		   var param string = "这是一个局部变量,变量的作用域在此函数中有效"
		}

		func main(){
		    fmt.Println(param)   // 报错  "undefined: param"
		}

在函数作用域中使用不会报错

		package main

		import "fmt"

		func myfunc(){
		   var param string = "这是一个局部变量,变量的作用域在此函数中有效"
		   fmt.Println(param)  // 打印param的值
		}

		func main(){
		    myfunc()
		}

> 全局变量和局部变量可以重名，但是局部变量的优先级要高于全局变量。

		package main

		import "fmt"

		var param string = "这是一个全局变量，该变量可以在所有函数中使用"


		func myfunc(){
		   var param string = "这是一个局部变量,变量的作用域在此函数中有效"
		   fmt.Println(param)  // 打印出  "这是一个局部变量,变量的作用域在此函数中有效"
		}

		func main(){
		    myfunc()
		}


## 3、go语言中访问控制

go语言中没有private，public关键字，那么我们该如何控制访问权限？go语言中通过约束命名（命名大小写）来实现对常量，变量，函数，接口，类型是否可以在外部包中使用。

### 3.1、private类型

go语言中约定如果命名首字母小写那么它就是`private`的，只能在当前包中可见。

### 3.2、public类型

go语言中约定如果命名首字母大写那么它就是`public`的，所有包中可见。现在我们就知道了为什么打印控制台的语句`fmt.Println('hello world')`的方法`Println`首字字母是大写的了吧。

## 4、附录

### 4.1、go中关键字的解释

|关键字|作用|
|---------|---------------|
|var和const|变量和常量的声明|
|package和import|包的声明和导入|
|func|定义函数和方法|
|return|定义函数返回值|
|defer|在函数退出之前执行|
|go|并行执行|
|select| 用于选择不同类型的通讯|
|interface|定义接口|
|struct|定义抽象数据类型|
|break、case、continue、for、fallthrough、else、if、switch、goto、default| 流程控制|
|chan|channel通讯|
|type|声明自定义类型|
|map|声明map类型数据|
|range|读取slice、map等|
