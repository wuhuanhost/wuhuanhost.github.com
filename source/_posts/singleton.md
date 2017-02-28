---
layout: post
title: "设计模式（一）之单例模式"
date: 2014-06-17 14:21:36
description: "设计模式之单例模式"
category: 设计模式
tags: [设计模式,JAVA]
mathjax: false
toc: false
highlight: true
---

## 单例模式概念

> 一个类有且仅有一个实例，并且自行实例化向整个系统提供。
   
## 单例模式类图

![单例模式类图](/images/singleton.jpg)

根据单例模式的描述和类图可以看出单例模式其实是设计模式中很简单的一种模式，一个私有变量，一个私有构造方法，一个公开的方法，就是一个单例模式的基本结构。（ps：类图对于学习和理解设计模式作用非常大）。


## 单例模式应用场景及缺点

**使用场景**：比如一个系统中有多个地方需要读取系统的核心配置文件的时候，那么这个读取类就可设计成单例的，这样可以节约系统内存资源，再比如Hibernate中的SessionFactory（它本身不是单例的）我们在使用的时候一般会写一个获取sessioFactory的单例工具类去获取它的实例。 

**单例模式的缺点**：实例化的对象长时间不使用那么很可能会被垃圾回收器回收，就会导致对象的状态丢失！所以具体用什么设计模式用不用这个模式都需要根据实际的情况和使用场景去决定，**不要不设计，也不要过度设计**！Ps:如果每写一个类都去遵循设计模式中给出的原则，那么你会发现连一个最简单的类都不知道该如何去写了！

<!--more-->

**单例模式java实现之【饿汉式】**


    package com.datainfo.utils;
    
    /**
     * 饿汉式单例模式
     *
     * @author will
     *
     */
    public class Singleton {
    
         /**
          * 实例化（此类的构造方法是私有的所以只能在当前类中自己实例化自己）
          */
         private static Singleton instance = new Singleton();
    
         /**
          * 私有构造方法（说明在其它类中不能通过new关键字来创建此对象）
          */
         private Singleton() {
         };
    
         /**
          * 提供一个公开的获取对象的方法（如果此方法也设成私有的那么这个单例也就没意义了）
          *
          * @return Singleton
          */
         public static Singleton getInstance() {
    
               return instance;
         }

       
         public static void main(String[] args) {
              
              Singleton singleton1=Singleton. getInstance();
              Singleton singleton2=Singleton. getInstance();
              
               /**
               * 测试：比较两个对象的引用(地址)是否相等
               */
              System. out.println( "singleton1和singleton2是否是同一个对象>>>" +(singleton1==singleton2));
                  
         }
    }



**单例模式java实现之【懒汉式】**



	package com.datainfo.util;

	/**
	 * 懒汉式单例模式
	 *
	 * @author will
	 *
	 */
	public class Singleton {

	      /**
	      *和饿汉式不同的是定义变量的时候只申明变量，不实例化！
	      */
	      private static Singleton instance;

	      /**
	      * 私有构造方法（说明在其它类中不能通过new关键字来创建此对象）
	      */
	      private Singleton() {
	     };

	      /**
	      * 调用获取实例的方法的时候才实例化对象（如果有多线程同时调用这个方法的时候可能会出现问题，所以加了一个同步关键字synchronized)
	      *
	      * @return Singleton
	      */
	      public synchronized static Singleton getInstance() {
		   if ( instance == null) {
		       instance = new Singleton();
		  }
		   return instance;
	     }


	      public static void main(String[] args) {

		  Singleton singleton1 = Singleton. getInstance();
		  Singleton singleton2 = Singleton. getInstance();

		   /**
		   * 测试：比较两个对象的引用(地址)是否相等
		   */
		  System. out.println( "singleton1和singleton2是否是同一个对象>>>"
			   + (singleton1 == singleton2));

	     }
	}



**运行结果**

![运行结果](/images/singletondemo.jpg)


## 后记

* 单例模式的实现方式有很多种，懒汉式和饿汉式是实际应用中使用比较多的两种实现方式，因为它的写法简单，易于理解！

* 设计模式没有想象中的复杂它其实就是一套编程大师在以前的开发过程中对如何写出健壮、稳定、可靠、易于扩展、易于维护的一套代码设计经验的总结。

## 备注

* 原文链接：[http://www.mengxiangjia.info/2014/06/17/singleton/](http://www.mengxiangjia.info/2014/06/17/singleton/) 
* 版权声明：自由转载-非商用-非衍生-保持署名 | <a href='http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh'>Creative Commons BY-NC-ND 3.0</a>

