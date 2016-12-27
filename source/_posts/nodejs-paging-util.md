---
layout: post
title: "对Node.js分页查询（mysql）的封装"
subtitle: ""
date: "2016-12-27 15:32:23"
description: "对Node.js分页查询（mysql）的封装"
category: Node
tags: [node.js,mysql]
mathjax: false
toc: false
highlight: true
---

## 前言

最近用node.js+mysql搭了一个web系统，后台管理界面涉及很多查询操作，而且查询的数据量还比较大，对于大批量数据显示的时候需要做分页处理，一来对于管理员来说数据展示比较友好，二来减轻服务器的数据读取压力和流量，java开发的时候分页通常会封装成了一个pagebean对象来简化分页查询，所以基于以前开发java的经验和思想，就用node封装了一个简单的mysql分页查询的对象PagingUtil。

由于比较简单，就直接上代码了。


## 代码实现



		var db = require('./db');

		/**
		 * 分页对象
		 * @param {[type]} totalRows   数据总条数
		 * @param {[type]} currentPage 当前显示的第几页
		 * @param {[type]} pageSize    每页显示的条数
		 */
		function PagingUtil(totalRows, currentPage, pageSize) {
		    this.currentPage = currentPage === undefined ? 1 : currentPage; //当前是第几页,默认为第一页
		    this.totalPages = 1; //最多能分多少页
		    this.totalRows = totalRows === undefined ? 0 : totalRows; //总数据条数
		    this.hasNextPage = false; //是否有下一页
		    this.hasPrevPage = false; //是否有上一页
		    this.pageSize = pageSize === undefined ? 10 : pageSize; //每页显示几条数据，默认为10条
		    this.startRow = 0; //起始行
		    // this.endRow = 0; //结束行
		    this.listData = null; //当前页的分页数据
		}

		/**
		 * 设置查询数据
		 * @param {[type]} result [description]
		 */
		PagingUtil.prototype.setListData = function(result) {
		    this.listData = result;

		}

		/**
		 * 获取数据
		 * @return {[type]} [description]
		 */
		PagingUtil.prototype.getListData = function() {
		    return this.listData;
		}

		/**
		 * 设置每页需要显示的条数
		 */
		PagingUtil.prototype.setPageSize = function(pageSize) {
		    this.pageSize = pageSize;

		}

		/**
		 * 数据一共能分多少页
		 * @param {[type]} num [description]
		 */
		PagingUtil.prototype.setTotalPages = function() {
		    var totalPages = 0;
		    totalPages = parseInt((this.totalRows - 1) / this.pageSize) + 1;
		    this.totalPages = totalPages;
		};


		/**
		 * 设置当前第几页
		 * @param {[type]} currentPage [description]
		 */
		PagingUtil.prototype.setCurrentPage = function(currentPage) {
		    this.currentPage = currentPage;
		}

		/**
		 * 分页
		 * @return {[type]} [description]
		 */
		PagingUtil.prototype.paging = function() {
		    this.setTotalPages();
		    if (this.currentPage === 1) { //第一页
			this.startRow = 0; //设置起始条数
			this.hasPrevPage = false;
			this.hasNextPage = true;
		    } else if (1 < this.currentPage && this.currentPage < this.totalPages) { //中间页
			this.hasNextPage = true;
			this.hasPrevPage = true;
			this.startRow = (this.currentPage - 1) * this.pageSize;
		    } else if (this.currentPage === this.totalPages) { //最后一页
			this.startRow = (this.currentPage - 1) * this.pageSize;
			this.hasNextPage = false;
			this.hasPrevPage = true;
		    }
		}

		/**
		 * 设置总条数
		 * @param {[type]} totalRows [description]
		 */
		PagingUtil.prototype.setTotalRows = function(totalRows) {
		    this.totalRows = totalRows;
		}


		module.exports = PagingUtil;



## 使用


		/**
		** 测试分页查询
		**/
		var db=require('./db');//对数据库操作的封装
		var PagingUtil=require('./PagingUtil');//分页操作的封装
		exports.testPagingQuery = function(cb) {
		    var sql = "select count(*) as count from books";
		    //先查询数据的总条数
		    db.execSql(sql, [], function(err, result) {
			console.log("总记录条数:" + result[0].count);
			//1、实例化分页对象
			var paging = new PagingUtil(result[0].count, 3, 2); 
			//2、分页
			paging.paging();
			var sql1 = "select * from books limit ?,?";
			var params = [paging.startRow, paging.pageSize];
			//分页查询数据
			db.execSql(sql1, params, function(err, res) {
			    //3、设置数据
			    paging.setListData(res);
			    console.log(paging);
			    //返回个前端的分页测试数据
			    //{"currentPage":3,"totalPages":5,"totalRows":9,"hasNextPage":true,"hasPrevPage":true,"pageSize":2,"startRow":4,"listData":[{"id":5,"book_name":"Node.js权威指南","book_author":"陆凌牛","book_press":"机械工业出版社","book_isbn":"9787111460787"},{"id":6,"book_name":"HTML5权威指南","book_author":"（美）弗里曼","book_press":"人民邮电出版社","book_isbn":"9787115338365"}]}
			    cb(null, paging);
			});
		    })
		}


[源码见github](https://github.com/wuhuanhost/node-utils/blob/master/src/paging_util.js)


## 后记

分页一般有两种实现方式，一种就是基于数据实现分页，数据库不同实现的分页方式也有所不同，另一种就是基于内存的分页，把所有的数据查询出来放在内存中，程序操作这份内存数据来实现分页，如果数据量不是太大，完全可以吧数据返回给前端，让前端去实现数据的分页。

封装的这个分页对象还不是那么理想，例如获取总条数这些东西都是可以封装进去的，甚至是整个查询都可以封装进去，项目赶时间，后续慢慢完善。




