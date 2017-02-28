---
layout: post
title: "设计模式（二）之观察者模式"
date: 2014-07-07 16:52:36
description: "设计模式之观察者模式"
category: 设计模式
tags: [设计模式,JAVA]
mathjax: false
highlight: true
---

## 生活中的观察者模式

例如一个订阅者A在某出版社订阅了一份一年期的xxxx报纸，那么出版社每次出版新版本的报纸的时候就会给订阅者A送过去，另外一个订阅者B也在该出版社订阅一份半年期的xxxx报纸，同样的出版社出版新报纸后也会给订阅者B送过去，半年时间过去了由于订阅者B没有续订，那么出版社不会在给B送报纸。

在上面这个过程中出版社和订阅者A，B其实就是一种观察者模式，订阅者A，B（观察者）先在出版社（主题）登记订阅报纸成为订阅者（观察者对象），然后出版社（主题）的状态（报纸）一旦更新就会给订阅者A，B（观察者）送过去，**观察者必须要注册成为主题的观察者对象之后，主题对象的状态发生变化才能通知到所有观察者**，（就好比你不去出版社告诉你需要订阅报纸，出版社有新报纸出版的时候是不会给你送去的，因为根本不知道给谁送）。半年后订阅者B（观察者）订阅时间到期不再续订，那么出版社（主题）就取消用户B（观察者）的订阅，将订阅者从被订阅者中移除！


## 观察者模式的定义

观察者模式（有时又被称为发布-订阅Subscribe>模式、模型-视图View>模式、源-收听者Listener>模式或从属者模式）是软件设计模式中的一种。观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。这个主题对象在状态上发生变化时，会通知所有观察者对象，让他们能够自动更新自己。

<!--more-->

## 观察者模式的类图

![单例模式类图](/images/observer.jpg)

Ps:类图使用在线做图工具 [processon](http://www.processon.com/) 绘制。


## 观察者模式的组成

1. **抽象主题(Subject)角色**：抽象主题角色把所有对观察者对象的引用保存在一个聚集放在一个集合对象ArrayList对象里，每个主题都可以有任何数量的观察者。抽象主题提供一个接口（也可以使一个抽象类），可以对观察者进行增加，删除，通知等操作。

2. **具体主题(ConcreteSubject)角色**：将主题的状态存入具体观察者对象；在具体主题的内部状态改变时，给所有注册过的观察者发出通知。

3. **抽象观察者(Observer)角色**：为所有的观察者提供一个接口，获得主题的通知时候自己更新自己。

4. **具体观察者(ConcreteObserver)角色**：存储和主题状态相同的状态，具体观察者实现抽象观察者接口中的更新接口，使观察者自身的状态和主题的状态相协调。


## 观察者模式java实现方式

为了便于理解使用上面的出版社和订阅者的例子来实现java的观察者模式代码。一共使用了五个类，1、抽象出版社类，2、具体出版社类，3、抽象订阅者，4、具体订阅者A，5、具体订阅者B。

**抽象出版社类**



	package Observer;
	import java.util.ArrayList;
	import java.util.List;

	/**
	 * 抽象主题类（出版社）
	 * 
	 * @author Will  创建日期  2014-07-03
	 * 
	 */
	public abstract class Press {

		public List<Subscribers> list = new ArrayList<Subscribers>();// 观察者集合

		public abstract void add(Subscribers subscribers);// 添加观察者的方法

		public abstract void remove(Subscribers subscribers);// 移除观察者的方法

		public abstract void Notify();// 通知观察者的方法

	}


**具体出版社类**



	package Observer;
	/**
	 * 具体主题类（出版社）
	 * 
	 * @author Will  创建日期  2014-07-03
	 * 
	 */
	public class PressABC extends Press {

		
		private String newspaper;// 主题的状态，报纸南方周末

		/**
		 * 主题发生变化，通知观察者
		 */
		public void setNewspaper(String newspaper) {
			System.out.println("观察者的状态:" + newspaper);
			this.newspaper = newspaper;
			Notify();
		}

		/**
		 * 构造方法
		 */
		public PressABC() {
		}

		/**
		 * 添加观察者
		 */
		public void add(Subscribers subscribers) {
			list.add(subscribers);
		}

		/**
		 * 移除观察者
		 */
		public void remove(Subscribers subscribers) {
			int i = list.indexOf(subscribers);
			if (i > 0) {
				list.remove(i);
			}

		}

		/**
		 * 更新消息
		 */
		public void update() {
			for (Subscribers subscribers : list) {
				subscribers.update(newspaper);
			}
		}

		/**
		 * 通知观察者
		 */
		public void Notify() {
			update();
		}
	}



**抽象观察类**



	package Observer;

	/**
	 * 观察者接口
	 * 
	 * @author Will  创建日期  2014-07-03
	 * 
	 */
	public interface Subscribers {

		public void update(String newspaper);// 更新状态的方法

	}



**具体观察者类A**



	package Observer;

	/**
	 * 观察者实现类A，（报纸订阅者A）
	 * 
	 * @author Will  创建日期  2014-07-03
	 * 
	 */
	public class SubscribersAImpl implements Subscribers {

		private String newspaper;// 主题的状态
		private Press press;// 主题对象

		/**
		 * 构造方法
		 * 
		 * @param postOffice
		 */
		public SubscribersAImpl(Press press) {
			this.press = press;

			press.add(this);
		}

		/**
		 * 更新状态
		 */
		public void update(String newspaper) {

			this.newspaper = newspaper;
			display();

		}

		/**
		 * 通知订阅者的方法
		 */
		public void display() {

			System.out.println("A观察者接收到的状态>>>>>>:" + newspaper);

		}
	}



**具体观察者B**



	package Observer;

	/**
	 * 观察者实现类B，（报纸订阅者B）
	 * 
	 * @author Will  创建日期  2014-07-03
	 * 
	 */
	public class SubscribersBImpl implements Subscribers {

		private String newspaper;// 主题的状态
		private Press press;// 主题对象

		/**
		 * 构造方法
		 * 
		 * @param postOffice
		 */
		public SubscribersBImpl(Press press) {
			this.press = press;
			this.press.add(this);
		}

		/**
		 * 更新对象状态
		 */
		public void update(String newspaper) {

			this.newspaper = newspaper;
			display();

		}

		/**
		 * 通知订阅者的方法
		 */
		public void display() {

			System.out.println("B观察者接收到状态>>>>>>:" + newspaper);

		}
	}



**测试代码**



	package Observer;
	/**
	 * 测试类
	 * @author Will  创建日期  2014-07-03
	 * 
	 *
	 */
	public class Test {

		public static void main(String[] args) {

			PressABC press = new PressABC();// 实例化主体对象

			SubscribersAImpl pA = new SubscribersAImpl(press);// 实例化观察者对象A，并且将它加入到主题中
			SubscribersBImpl pB = new SubscribersBImpl(press);// 实例化观察者对象B，并且将它加入到主题中

			press.setNewspaper("南方周末第xxxxxxx期号已经出版......");// 修改主题的状态
			System.out.println("----------------------------------------------------");
			System.out
					.println("------------------移除观察者B后--------------------------");
			
			System.out.println("----------------------------------------------------");
			press.remove(pB);//移除观察者B
			press.setNewspaper("南方周末第yyyyyyy期号已经出版......");// 修改主题的状态

		}
	}



**运行结果**

![运行结果](/images/observer_test.jpg)


## 后记

以前在一篇文章中看到这么一句话:**“设计模式孜孜不倦追求的是调用者和被调用者之间的解耦”**，上软件工程这门课关于面向对象的设计和分析的时候老师告诉我们一句话：**“高内聚，低耦合”**，就是模块和模块之间依赖联系尽量达到最低，模块内部的个元素联系和紧密程度尽量高，各个模块尽量独立存在，这样才可以使模块达到最大程度的复用，例如现在的电脑一般都是由主板，cpu,显卡，声卡，网卡，硬盘，输入输出设备等组成，这些东西之间就是低耦合的，他们之间依赖的是主板的接口，只要这些模块的接口和主板上接口一致那么都能组成一台电脑正常开机和使用，就算去掉一个声卡，电脑只不过是没声音而已，不会影响到其它的模块，所以在面向对象编程的时候就有这样一个原则:"**针对接口编程，而不是针对实现编程**"就是这个道理。观察者模式中就使用了这样的原则，主题对象不依赖于具体的观察者对象，而是依赖于一个抽象的观察者接口的集合。

其实java语言已经杜观察者模式提供支持，在java.util包中提供了一个Observable类以及一个Observer接口，使用的时候只需直接实现它就可以了。自己还是比较喜欢用原生的方法去实现，因为这样对观察者的原理理解的比较的透彻，而且更符合开发过程中实际的需求，原生实现定制性比较强。


## 参考资料

1. 《HeadFirst设计模式》中文版

2.  观察者模式百度百科

3.  博客园博客

## 备注

* 原文链接：[http://www.mengxiangjia.info/2014/07/07/observer/](http://www.mengxiangjia.info/2014/07/07/observer/)
* 版权声明：自由转载-非商用-非衍生-保持署名 | <a href='http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh'>Creative Commons BY-NC-ND 3.0</a>

