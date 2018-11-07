//生成图片的json数据的工具

//图片命名规范
//[序号]_[日期]_[标题]_[标签]_[描述].jpg
//标签不填，显示默认
//描述为空默认使用标题作为描述

//数据格式
// {
//     dateList: {//按照日期排序
//             "2018-10": [{
//                 index:001,
//                 date: "2018-10-01",
//                 year: "2018",
//                 month: "10",
//                 day: "01",
//                 imgSrc: "",
//                 minImgSrc: "",
//                 width:"宽度",
//                 height:"高度",
//                 title: "图片标题",
//                 tag: "标签",
//                 desc: "图片描述"
//             }]
//     },
//         tagList: [{
//     "tag": "二维码",
//     "data": [
//     {
//         "index": "001",
//         "date": "2018-09-01",
//         "year": "2018",
//         "month": "09",
//         "day": "01",
//         "imgSrc": "2017-09/001_2018-09-01_二维码_二维码_美丽的图片可以给人一种快乐的感受.png",
//         "minImgSrc": "2017-09/001_2018-09-01_二维码_二维码_美丽的图片可以给人一种快乐的感受.png",
//         "width": 300,
//         "height": 300,
//         "title": "二维码",
//         "tag": "二维码",
//         "desc": "美丽的图片可以给人一种快乐的感受.png"
//     }
//     ]
// }]
// };

var fs = require("fs");
var path = require("path");
var sizeOf = require("image-size");
var _ = require("lodash");

const imgPath = path.join(__dirname, "photos"); //图片目录
const dataJsonPath = path.join(__dirname, "data.json"); //生成的json文件的位置
var data = {};
//主函数
function main() {
    console.log("------------------------" + imgPath);
    readPhotoFiles();
}

/**
 * 递归读取所有的图片文件
 */
function readPhotoFiles() {
    var dir = fs.readdirSync(imgPath);
    var dataList = {};
    dir.forEach(element => {
        // console.log(element);
        var allMonthData = {};
        var monthData = [];
        var imgDir = path.join(__dirname, "photos", element);
        var imgArr = fs.readdirSync(imgDir);
        imgArr.forEach((img, index) => {
            // console.log(index + "  " + img);
            //解析图片
            var imgNameObj = resolveImgName(element, index, img);
            monthData.push(imgNameObj);

            //按照标签分类图片
            //Todo
        });
        dataList[element] = monthData;
        // dataList.push(allMonthData);

        var sortDataList = {}; //排序后的数据
        _.forEachRight(dataList, function(value, key) {
            //console.log(value);
            //console.log(key);
            sortDataList[key] = value;
        });
        data["dataList"] = sortDataList;
        //console.log("--")
    });

    //按照标签分类
    var aaa = _.flatMap(dataList, duplicate);
    let groupedItems = _(aaa)
        .groupBy(item => item.tag)
        .map((items, tag) => {
            return {
                tag: tag,
                list: items
            };
        })
        .reverse() // 为了反转数组排序
        .value();
    //console.log(groupedItems);
    //console.log(aaa.length)
    //writeJsonFile(dataJsonPath, JSON.stringify(groupedItems, null, 2));
    // console.log(JSON.stringify(data, null, 2));
    //写文件
    data["tagList"] = groupedItems;

	 //按照title分类(分类)
    var bbb = _.flatMap(dataList, duplicate);//二维数组转换为一维数组
    let groupedItems1 = _(bbb)
        .groupBy(item => item.title)
        .map((items, title) => {
            return {
                title: title,
                list: items
            };
        })
        .reverse() // 为了反转数组排序
        .value();

    data["classifyList"] = groupedItems1;
    writeJsonFile(dataJsonPath, JSON.stringify(data, null, 2));
}

function duplicate(n) {
    return _.concat(n);
}

/**
 * 解析图片名称
 */
function resolveImgName(pathSrc, index, name) {
    var nameArr = name.split("_");
    var dateArr = nameArr[1].split("-");
    var imgAbsolute = path.join(__dirname, "photos", pathSrc, name); //图片绝对地址
    var dimensions = sizeOf(imgAbsolute); //获取图片宽度和高度
    // console.log(dimensions);
    // consoole.log(dimensions);
    var nameObj = {
        index: nameArr[0] || index,
        date: nameArr[1],
        year: dateArr[0],
        month: dateArr[1],
        day: dateArr[2],
        imgSrc: pathSrc + "/" + name,
        minImgSrc: pathSrc + "/" + name,
        width: dimensions.width,
        height: dimensions.height,
        title: nameArr[2]||"未分类",
        tag: nameArr[3]||"无标签",
        desc: nameArr[4].replace(/\..*$/,"")|| nameArr[2]
    };
    return nameObj;
}

/**
 * 将json数据写到文件中
 * @param {*} json
 * @param {*} path
 */
function writeJsonFile(path, json) {
    fs.writeFileSync(path, json);
}

main();
