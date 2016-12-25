---
layout: post
title: "使用TypeScript来写javascript代码"
date: 2016-03-15 14:21:36
description: "TypeScript使用笔记"
category: 前端开发
tags: [前端工具,web前端]
mathjax: false
toc: true
highlight: true
---

从机器码到汇编语言再到c语言，java等的高级语言的过程其实在不断的抽象，目的就是让人们使用起来更加的方便和简单，想象一下如果让你用0和1来写程序会是一种什么样的体验。编程语言不断的演化，未来也越来越会趋于自然语言。

## 为什么要使用`TypeScript`?

了解为什么要使用TypeScript的时候我们有必要先了解什么是**TypeScript**是`javascript`的一个超级，添加了静态数据类型和基于类的面向对象编程语言的特性，由c#架构师主持开发。

我们可以把它理解成一种生成标准javascript语言的语言，用一张图来说明下他们之间的关系

![TypeScript编译javascript](/images/typescript.jpg)

1、使用简单，会使java,c#,as3的看看文档就很容易上手了。
2、方便代码的重用（类，继承），而且TypeScript生成的代码很干净整洁。
3、更好的组织代码，尤其是大型项目（模块，命名空间）
4、我认为TypeScript是未来javascript的一种过渡。未来的ES标准应该向TypeScript靠拢。

<!-- more -->

## 安装配置

首先要在本机安装`Node.js`环境，然后使用Node.js的包管理工具`npm`安装TypeScript，安装命令如下：

	npm install -g TypeScript

## 简单使用

安装好TypeScript后，在D盘新建一个名叫TypeScript-demo的目录，打开记事本在里面写入如下代码：
	
		class Animate {

		    animateType: string;//动物属性
		    animateName: string;//动物名称

		    // 构造方法
		    constructor(animateType: string, animateName: string) {
			this.animateType = animateType;
			this.animateName = animateName;
		    };
		    //移动的方法

		    run() {
			// return "<h1>我是一只【" + this.animateType + "】我叫【" + this.animateName + "】我正在移动......</h1>";
			console.log("我是一只【" + this.animateType + "】我叫【" + this.animateName + "】我正在移动......");
		    }
		}

		//实现继承
		class FlyAnimate extends Animate {

		    speed: number;//飞行速度
		    height: number;//飞行高度

		    constructor(speed: number, height: number, animateType: string, animateName: string) {
			super(animateType, animateName);
			this.height = height;
			this.speed = speed;

		    }

		    run() {//重写父类的移动方法
			super.run();//继承父类的移动方法
			//添加自己特有的移动方式
			console.log("我正在飞行，速度【" + this.speed + "】高度【" + this.height+"】米");

		    }
		}

			// let dog: Animate = new Animate("小狗", "dog");
			// document.body.innerHTML = dog.run();

			//实例化Animate对象
			let dog: Animate = new Animate("小狗", "dog");
			dog.run();
			console.log("-------------------------------------")
			//实例化FlyAnimate对象
			let fly:FlyAnimate=new FlyAnimate(10,100,"小鸟","小小鸟");
			fly.run();



				    
然后把这段代码另存为`typescript-1.ts`到当前目录下的src目录下。一个typescript文件编写好了，现在编写好的文件是不能直接在浏览器中执行的，所以要在浏览器中运行这段代码，还需要通过typescript的编译器进行编译。

编译之前我们需要在当前目录下面新建立一个`tsconfig.json`，这个文件指定了这个项目的根文件和编译选项。这个文件可以是空文件，那么使用`tsc`进行编译的时候，编译器就会按照默认的编译选项进行编译。如果当前目录不存在这个文件，那么编译的时候编译器会逐级向上搜索父目录，当然也可在命令行中指定一个`tsconfig.json`文件，那么编译器会忽略当前目录下的`tsconfig.json`。


编译配置文件`tsconfig.json`文件内容

			{
			    "compilerOptions": {      
				"module": "commonjs",    #使用commonjs编译
				"target": "es5",         #ECMAScript目标版本为ES5
				"noImplicitAny": false,  #在表达式和声明上有隐含的'any'类型时报错。
				"outDir": "bin",         #编译后的输出目录
				"rootDir": ".",          #控制输出的目录结构
				"removeComments":true,   #删除所有注释，除了以/!*开头的版权信息
				"sourceMap": true,       #生成sourceMap 
				"sourceRoot":"src",      #*.ts源文件的所在目录 
				"outFile":"bin/.js"      #编译后多个文件合并成一个文件
			    },
			    "exclude": [
				"node_modules"           #此目录会被编译器忽略 
			    ]
			}


通过`tsc`命令来编译

	tsc  ./src/typescript-1.ts  #编译指定的文件,不加参数将编译tscongif.json中所配置的所有配置


运行结果
	我是一只【小狗】我叫【dog】我正在移动......
	-------------------------------------
	我是一只【小鸟】我叫【小小鸟】我正在移动......
	我正在飞行，速度【10】高度【100】米

我们可以到./bin目录中来看看TypeScript编译后的js文件的内容是怎样的。

		
		/**属性继承的核心,会迭代父类的所有属性，然后把这些属性添加到子类对象中**/
		
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		
		/**匿名函数自动执行，然后把执行结果给Animate变量**/
		var Animate = (function () {

		    /**构造函数	**/
		    function Animate(animateType, animateName) {
			this.animateType = animateType;
			this.animateName = animateName;
		    };
		    /**在Animate的原型链上添加一个run方法**/	
		    Animate.prototype.run = function () {
			console.log("我是一只【" + this.animateType + "】我叫【" + this.animateName + "】我正在移动......");
		    };

		    return Animate;
		})();

	
		var FlyAnimate = (function (_super) {
		    __extends(FlyAnimate, _super);//继承父类的属性
		    function FlyAnimate(speed, height, animateType, animateName) {
			_super.call(this, animateType, animateName);
			this.height = height;
			this.speed = speed;
		    }
		    FlyAnimate.prototype.run = function () {
		    /**我们知道call()方法可以改变this的指向，_super替换this执行run()方法**/
			_super.prototype.run.call(this);
			console.log("我正在飞行，速度【" + this.speed + "】高度【" + this.height + "】米");
		    };
		    return FlyAnimate;
		})(Animate);


		var dog = new Animate("小狗", "dog");
		dog.run();
		console.log("-------------------------------------");
		var fly = new FlyAnimate(10, 100, "小鸟", "小小鸟");
		fly.run();


			
通过对注释我们对typescript编译后的js进行了简单的解读，你把两份代码放在一起看对比一下的时候你会发现用TypeScript写起来还是很舒服的。如果能通过一种简单的方式实现我们的需求，那么为什么不适用简单的方式呢。


更多关于的文档可以去TypeScript官网查看，或者[TypeScript中文手册](https://zhongsp.gitbooks.io/TypeScript-handbook/content/doc/handbook/Enums.html)

## 备注

* 原文链接：[http://www.mengxiangjia.info/2016/03/15/tyscript-getStart//](http://www.mengxiangjia.info/2016/03/15/tyscript-getStart/) 
* 版权声明：自由转载-非商用-非衍生-保持署名 | <a href='http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh'>Creative Commons BY-NC-ND 3.0</a>


