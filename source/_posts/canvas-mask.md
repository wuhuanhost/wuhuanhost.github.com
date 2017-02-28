---
layout: post
title: "canvas中遮罩效果的实现方法"
date: 2015-12-31 10:20:25
description: "canvas中遮罩效果的实现方法"
category: html5笔记
tags: [canvas,Demo]
mathjax: false
toc: false
highlight: true
---

最近做的一个项目需要支持多终端，html5移动版需要用到html5中canvas画布对一组数据进行渲染还原，但是在实际实现过程中遇到了一个问题，canvas中没有mask（遮罩）层的概念，所以一些效果实现不了，最后翻看文档的时候发现可以通过Context对象的`globalCompositeOperation`属性或者Context的`clip()`裁剪路径方法实现遮罩的效果。

<!-- more -->

## globalCompositeOperation属性介绍

接下来先详细了解下Context的`globalCompositeOperation`的各种值描述，然后通过它实现一个**刮刮卡**的效果。

属性值|描述|显示效果
:------|:------|------:|
**source-over (default)**|新图形会覆盖在原有内容之上|![canvas实现mask效果](/images/canvas-mask/source-over.png)
**destination-over**|会在原有内容之下绘制新图形|![canvas实现mask效果](/images/canvas-mask/destination-over.png)
**source-in**|新图形会仅仅出现与原有内容重叠的部分。其它区域都变成透明的|![canvas实现mask效果](/images/canvas-mask/source-in.png)
**destination-in**|原有内容中与新图形重叠的部分会被保留，其它区域都变成透明的|![canvas实现mask效果](/images/canvas-mask/destination-in.png)
**source-out**|结果是只有新图形中与原有内容不重叠的部分会被绘制出来|![canvas实现mask效果](/images/canvas-mask/source-out.png)
**destination-out**|原有内容中与新图形不重叠的部分会被保留|![canvas实现mask效果](/images/canvas-mask/destination-out.png)
**source-atop**|新图形中与原有内容重叠的部分会被绘制，并覆盖于原有内容之上|![canvas实现mask效果](/images/canvas-mask/source-atop.png)
**destination-atop**|原有内容中与新内容重叠的部分会被保留，并会在原有内容之下绘制新图形|![canvas实现mask效果](/images/canvas-mask/destination-atop.png)
**lighter**|两图形中重叠部分作加色处理|![canvas实现mask效果](/images/canvas-mask/lighter.png)
**darker**|两图形中重叠的部分作减色处理|![canvas实现mask效果](/images/canvas-mask/darker.png)
**xor**|重叠的部分会变成透明|![canvas实现mask效果](/images/canvas-mask/xor.png)
**copy**|只有新图形会被保留，其它都被清除掉|![canvas实现mask效果](/images/canvas-mask/copy.png)

> ***`蓝色`*** 表示先绘制的图形、***`红色`*** 表示后绘制的图形

**浏览器支持：** `Internet Explorer 9`、`Firefox`、`Opera`、`Chrome`、`Safari` 支持globalCompositeOperation 属性

通过Context的`globalCompositeOperation`我们可以灵活的掌握绘制图形之间层叠显示关系，做出很多漂亮的显示效果。接下来我们就使用`globalCompositeOperation=destination-out`来实现一个刮刮卡的效果。

## globalCompositeOperation属性应用

**刮刮卡实现效果图**

![canvas实现刮刮卡效果](/images/canvas-mask/canvas-mask.gif)

**实现原理**

1. 在页面上放一个`div`容器，设置这个div的宽高、把`机器猫`的图片设为背景,
2. 在div中放一个`canvas`标签，设置canvas的**宽高**和父容器div的一样。
3. 获取canvas的context对象绘制一个以灰色为背景宽高和canvas宽高相同的矩形，这样机器猫背景图就被遮住了，只能看见一个灰色的背景。
4. canvas绑定鼠标mousedown,mousemove和mouseup事件(移动端绑定事件分别是：touchstart,touchmove,touchend)，设置鼠标按下标志，鼠标按下或者鼠标按下并且移动时记录鼠标坐标值。
5. 鼠标点击或者按住鼠标移动的时候开始绘图，绘图的时候设置`context.globalCompositeOperation='destination-out'`根据上面属性的解释，原有图形（灰色矩形）与新图形（画的线条）不重叠的部分会被保留，所以画过线条的部分不会被保留就可以看见下面机器猫图片背景了。
6. 鼠标抬起设置鼠标按下标志为false，清空坐标数组。 

**具体代码**

html代码（canvas动态创建的）

	<div id='div' style='width:540px;min-height:360px;background:url("../images/test.jpg") no-repeat'>
	</div>

javascript代码

	function init() {
		if (!document.getElementById("myCanvas")) {
		    var width = "";
		    var height = "";
		    var canvas = document.createElement("canvas");
		    width = document.getElementById("div").offsetWidth;
		    height = document.getElementById("div").offsetHeight;
		    canvas.setAttribute("width", width + "px");
		    canvas.setAttribute("height", height + "px");
		    canvas.setAttribute("style", "border:1px solid green");
		    canvas.id = "myCanvas";
		    document.getElementById("div").appendChild(canvas);
		}

		var myCanvasObject = document.getElementById("myCanvas");
		var ctx = myCanvasObject.getContext("2d");

		//绘制黑色矩形	
		ctx.beginPath();
		ctx.fillStyle = "#939393";
		ctx.rect(0, 0, width, height);
		ctx.closePath();
		ctx.fill();

		var isDown = false; //鼠标是否按下标志
		var pointerArr = []; //鼠标移动坐标数组
		var xPointer = 0;//鼠标当前x坐标
		var yPointer = 0;//鼠标当前y坐标


		//pc，移动事件兼容写法
		var hastouch = "ontouchstart" in window ? true : false,
		tapstart = hastouch ? "touchstart" : "mousedown",
		tapmove = hastouch ? "touchmove" : "mousemove",
		tapend = hastouch ? "touchend" : "mouseup";


		//鼠标按下
		myCanvasObject.addEventListener(tapstart, function(event) {
		    this.style.cursor = "move";
		    isDown = true;
		    xPointer = hastouch ? e.targetTouches[0].pageX : e.clientX - this.offsetLeft;
		    yPointer = hastouch ? e.targetTouches[0].pageY : e.clientY - this.offsetTop;;
		    pointerArr.push([xPointer, yPointer]);
		    circleReset(ctx);
		});


		//鼠标按下后拖动
		myCanvasObject.addEventListener(tapmove, function(event) {
		    if (isDown) {
			xPointer = hastouch ? e.targetTouches[0].pageX : e.clientX - this.offsetLeft;;
			yPointer = hastouch ? e.targetTouches[0].pageY : e.clientY - this.offsetTop;;
			pointerArr.push([xPointer, yPointer]);
			circleReset(ctx);
		    }
		});


		//鼠标抬起取消事件
		myCanvasObject.addEventListener(tapend, function(event) {
		    isDown = false;
		    pointerArr = [];
		});


		//圆形橡皮檫
		function circleReset(ctx) {
		    ctx.save();
		    ctx.beginPath();
		    ctx.moveTo(pointerArr[0][0], pointerArr[0][1]);
		    ctx.lineCap = "round";　　 //设置线条两端为圆弧
		    ctx.lineJoin = "round";　　 //设置线条转折为圆弧
		    ctx.lineWidth = 60;
		    ctx.globalCompositeOperation = "destination-out";
		    if (pointerArr.length == 1) {
				ctx.lineTo(pointerArr[0][0] + 1, pointerArr[0][1] + 1);
		    } else {
				for (var i=1;i<pointerArr.length;i++) {
				    ctx.lineTo(pointerArr[i][0], pointerArr[i][1]);
				    ctx.moveTo(pointerArr[i][0], pointerArr[i][1]);
				}
		    }
		    ctx.closePath();
		    ctx.stroke();
		    ctx.restore();
		}
	}


## 参考文档
	   
canvas参考文档 [canvas api](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

## 备注

* 原文链接：[http://www.mengxiangjia.info/2015/12/31/canvas-mask/](http://www.mengxiangjia.info/2015/12/31/canvas-mask/) 
* 版权声明：自由转载-非商用-非衍生-保持署名 | <a href='http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh'>Creative Commons BY-NC-ND 3.0</a>

