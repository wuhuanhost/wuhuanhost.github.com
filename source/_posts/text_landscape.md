
---
layout: post
title: "网页文字竖排的几种实现方式"
date: 2017-04-05 10:21:36
description: "网页文字竖排的几种实现方式"
category: 前端开发
tags: [前端笔记]
mathjax: false
toc: true
highlight: true
---


![网页文字竖排效果截图](/images/text_landscape/cover.jpg)

古时候的书籍里面文字的书写方式都是从上到下从右向左书写的，我们可不可以在网页上实现这种文字排版效果，虽然现在竖排在网页上用的比较的少，但是我们可以在我们自己的个人网站或者博客介绍页面用竖排来排版，使网页样式看起来更加的丰富和复古！

通过一些尝试我找到了如下3中方式在网页上竖排文字的方法，各有各的缺点和优点，下面我们就来看看具体的方法和实现效果吧！

### 方式1、css属性float实现文字竖排

**实现原理：**把一短话的每一句放在一个div中，设置div的宽度和要显示的字体的大小一样（div的高度=字数×字体大小）,div就变成了一个竖条每一行就只能显示一个文字，第二个文字就会被挤到下一行，然后把div的float设置为right向右浮动排列。就达到了一首诗的竖排显示。

**代码实现:**

	<style>
	* {
	    font-family: Georgia;
	}

	#content {
	    position: absolute;
	    width: 1200px;
	    height: 400px;
	    left: 50%;
	    top: 50%;
	    margin-top: -300px;
	    margin-left: -600px;
	    border: 1px dashed #2f96b4;
	    padding-top: 50px;
	    border-radius: 20px;
	}

	#contentRemark {
	    position: absolute;
	    width: 1200px;
	    height: 300px;
	    left: 50%;
	    top: 56%;
	    margin-left: -600px;
	    padding-top: 50px;
	    text-indent: 2em;
	    font-size: 20px;
	    line-height: 2em;
	}

	.PoetryName {
	    font-size: xx-large;
	    font-weight: bold;
	    line-height: 1.5em;
	    width: 1.5em;
	    float: right;
	    font-size: 36px;
	    padding-top: 40px;
	    padding-right: 20px;
	}

	.PoetryPerson {
	    width: 1.5em;
	    float: right;
	    line-height: 2em;
	    padding-top: 70px;
	    font-size: 18px;
	    color: #d3524e;
	}

	.PoetryContent {
	    width: 1.5em;
	    float: right;
	    line-height: 1.5em;
	    padding-top: 30px;
	    font-size: 20px;
	}

	.PoetryContent:hover {
	    width: 1.5em;
	    float: right;
	    line-height: 1.5em;
	    padding-top: 30px;
	    font-size: 20px;
	    cursor: pointer;
	    color: #d3524e;
	}
	</style>
	<div id="content">
	    <div class="PoetryName">爱莲说</div>
	    <div style="width:1.5em; float:right;"> </div>
	    <div class="PoetryPerson">周 敦 颐 </div>
	    <div style="width:1.5em; float:right;"> </div>
	    <div class="PoetryContent">水陆草木之花　</div>
	    <div class="PoetryContent">可爱者甚蕃　</div>
	    <div class="PoetryContent">晋陶渊明独爱菊　</div>
	    <div class="PoetryContent">自李唐来　</div>
	    <div class="PoetryContent">世人甚爱牡丹　</div>
	    <div class="PoetryContent">予独爱莲之出淤泥而不染　</div>
	    <div class="PoetryContent">濯清涟而不妖　</div>
	    <div class="PoetryContent">中通外直　</div>
	    <div class="PoetryContent">不蔓不枝　</div>
	    <div class="PoetryContent">香远益清　</div>
	    <div class="PoetryContent"> 亭亭净植　</div>
	    <div class="PoetryContent"> 可远观而不可亵玩焉　</div>
	    <div class="PoetryContent">予谓菊花之隐逸者也　</div>
	    <div class="PoetryContent">牡丹花之富贵者也　</div>
	    <div class="PoetryContent">莲花之君子者也　</div>
	    <div class="PoetryContent">噫菊之爱　</div>
	    <div class="PoetryContent">陶后鲜有闻　</div>
	    <div class="PoetryContent"> 莲之爱　</div>
	    <div class="PoetryContent"> 同予者何人　</div>
	    <div class="PoetryContent"> 牡丹之爱　</div>
	    <div class="PoetryContent"> 宜乎众矣　</div>
	    <div style="margin-left:40px;margin-top:-20px;">![](http://upload-images.jianshu.io/upload_images/2054-980f1bc940e1b9b9.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)</div>
	</div>

[通过float的方式实现文字竖排的demo](https://jsfiddle.net/Dreamer666/4uae1v45/7/)

>**这种方式的优缺点：**
**优点：**网页文档的书写和我们平时正常书写网页时候一样，可以为每一行设置不同的显示样式。
**缺点：**如果一行文字比较长，没有办法换行~


### 方式2、css属性transform:rotate实现文字竖排

**实现原理：**把一段话的每一个字放在一个span标签中(文字比较多可以通过js生成span)，然后把这些span标签放在一个大的div容器中，将容器div顺时针旋转90度，然后将容器中的span逆时针旋转90度，经过两次旋转之后就达到了竖排文字的需求。

**代码实现：**

	<style>
	.container {
	    position: absolute;
	    right: 300px;
	    margin-top: -200px;
	    width: 440px;
	    height: 1000px;
	    background-color: #FFFFFF;
	    padding-left: 36px;
	    font-family: "楷体";
	    border: 1px solid #999999;
	    margin-left: 100px;
	    overflow-y: scroll;
	    overflow-x: hidden;
	    -webkit-transform: rotate(90deg);
	}


	/**每一行的容器（竖列）**/

	.container .items {
	    width: 445px;
	    height: 34px;
	    /*background-color: #EEEEEE;*/
	    /*border-left: 1px solid #999999;*/
	}

	.container .items .item {
	    display: inline-block;
	    width: 20px;
	    height: 20px;
	    font-size: 20px;
	    text-align: center;
	    line-height: 20px;
	    /*border-bottom: 1px solid #CCCCCC;*/
	}

	.container .items .item:hover {
	    background-color: pink;
	    cursor: pointer;
	    font-size: 22px;
	}

	.action1 {
	    width: 100px !important;
	    padding-left: 20px;
	}

	.rotate {
	    -webkit-transform: rotate(-90deg);
	}

	.style1 {
	    background-color: #ff6699;
	    color: #EEEEEE;
	}

	.style2 {
	    background-color: #4c98ce;
	    color: #EEEEEE;
	}

	#vertical div {
	    width: 1.5em;
	    float: right;
	}

	#vertical .title {
	    font-size: xx-large;
	    font-weight: bold;
	    line-height: 1em;
	}
	</style>
	<div class="container">
	    <p> </p>
	    <div class="items">
		<div class="item"></div>
		<div class="item"></div>
		<div class="item"></div>
		<div class="item rotate" style="font-size:36px;font-weight:bold;">爱</div>
		<div class="item"></div>
		<div class="item rotate" style="font-size:36px;font-weight:bold;">莲</div>
		<div class="item"></div>
		<div class="item rotate" style="font-size:36px;font-weight:bold;">说</div>
		<div class="item"></div>
		<div class="item"></div>
		<div class="item"></div>
		<div class="item"></div>
		<p> </p>
	    </div>
	    <p class='action1'></p>
	</div>
	<!--引入jquery依赖-->
	<script src="jquery.min.js"></script>
	<script>
	var arr = "水陆草木之花，可爱者甚蕃。晋陶渊明独爱菊。自李唐来，世人甚爱牡丹。予独爱莲之出淤泥而不染，濯清涟而不妖，中通外直，不蔓不枝，香远益清，亭亭净植，可远观而不可亵玩焉。予谓菊，花之隐逸者也；牡丹，花之富贵者也；莲，花之君子者也。噫！菊之爱，陶后鲜有闻。莲之爱，同予者何人？牡丹之爱，宜乎众矣！".split("");

	var cHeight = $(".items").height();

	var textHeight = $(".item").height();

	var vCount = parseInt(cHeight / textHeight); //每列显示的字数

	var textArr = [];
	for (var i = 0; i < arr.length; i++) {
	    if (i % 20 == 0) {
		textArr.push({
		    "hanzi": arr[i]
		});
	    } else {
		textArr[textArr.length - 1].hanzi += arr[i];
	    }
	}

	var html = "";
	for (var j = 0; j < textArr.length; j++) {
	    html += "<div class='items'>";
	    var tempArr = textArr[j].hanzi.split("");
	    console.log(tempArr)
	    for (var k = 0; k < tempArr.length; k++) {
		if (/[<>《》！*(^)$%~!@#$…&%￥—+=、。，；‘’“”：·`]/.test(tempArr[k])) {
		    html += "<div class='item' style='display:inline'>" + tempArr[k] + "</div>";
		} else {
		    html += "<div class='item rotate'>" + tempArr[k] + "</div>";
		}
	    }
	    html += "</div>";
	}

	$(".action1").after(html);
	</script>



[通过transform:rotate方式实现文字竖排的demo](https://jsfiddle.net/Dreamer666/57y9yqva/2/)

>**这种方式的优缺点：**
**优点：一大段文字也可以实现自动换行。
**缺点：在具体位置实现换行控制比较麻烦，而且每个字写都要用一个span标签来包住。

## 方式3、CSS属性write-mode实现文字竖排

**writing-mode**直译过来就是书写模式，它是为了控制文本布局而产生的，换句话说它就是用来实现文字竖排的，只不过文字竖排我们平时用的少，所以这个css属性也不常见，发现这个属性之前我还是在用一些其它方式（前两中方法）实现文字的竖排。

**writing-mode**的属性比较多，详细请看[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode),文字竖排使用到的属性是`writing-mode:vertical-rl`从右向左竖排,`writing-mode:vertical-lr`从左向右竖排

代码实现

	<style>
	#content1 {
	    width: 900px;
	    height: 200px;
	    -webkit-writing-mode: vertical-rl;
	    writing-mode: vertical-rl;
	    padding-top: 40px;
	    font-size: 16px;
	}

	#content2 {
	    width: 900px;
	    height: 200px;
	    -webkit-writing-mode: vertical-lr;
	    writing-mode: vertical-lr;
	    padding-top: 40px;
	    font-size: 16px;
	}
	</style>
	<div id="content1">
	    <p style="letter-spacing:1em;font-size:20px;">水调歌头 </p>
	    <p style="letter-spacing:.3em;font-size:18px;">苏 轼</p>
	    <p>明月几时有</p>
	    <p>把酒问青天</p>
	    <p>不知天上宫阙</p>
	    <p>今夕是何年</p>
	    <p>我欲乘风归去</p>
	    <p>惟恐琼楼玉宇</p>
	    <p>高处不胜寒</p>
	    <p>起舞弄清影</p>
	    <p>何似在人间</p>
	    <p> 转朱阁</p>
	    <p>低绮户</p>
	    <p>照无眠</p>
	    <p>不应有恨</p>
	    <p>何事长向别时圆</p>
	    <p>人有悲欢离合</p>
	    <p>月有阴晴圆缺</p>
	    <p>此事古难全</p>
	    <p>但愿人长久</p>
	    <p>千里共蝉娟</p>
	</div>
	<hr>
	<div id="content2">
	    <p style="letter-spacing:1em;font-size:20px;">水调歌头 </p>
	    <p style="letter-spacing:.3em;font-size:18px;">苏 轼</p>
	    <p>明月几时有</p>
	    <p>把酒问青天</p>
	    <p>不知天上宫阙</p>
	    <p>今夕是何年</p>
	    <p>我欲乘风归去</p>
	    <p>惟恐琼楼玉宇</p>
	    <p>高处不胜寒</p>
	    <p>起舞弄清影</p>
	    <p>何似在人间</p>
	    <p> 转朱阁</p>
	    <p>低绮户</p>
	    <p>照无眠</p>
	    <p>不应有恨</p>
	    <p>何事长向别时圆</p>
	    <p>人有悲欢离合</p>
	    <p>月有阴晴圆缺</p>
	    <p>此事古难全</p>
	    <p>但愿人长久</p>
	    <p>千里共蝉娟</p>
	</div>


[通过write-mode方式实现文字竖排的demo](https://jsfiddle.net/Dreamer666/5fjk4ozc/4/)

>**这种方式的优缺点：**
**优点：实现文字竖排的方式比较的方便和优雅
**缺点：语法比较多，而且有两套不同的规范（IE和css3）！

**注意事项：**write-mode会改变一些原有的规则，如我们队上面的content1中的p设置行高，那么行高会变成左右行距离而不是上下行距。

> 本文如有误，请不吝赐教！
如果你有更好的实现竖排的方式和方法，可以在评论区交流讨论。
