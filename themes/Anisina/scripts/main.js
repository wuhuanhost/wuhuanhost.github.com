/**
**	图片处理的插件
*
hexo.extend.filter.register('before_post_render', function(data){
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log(data.content);
  data.title = data.title.toLowerCase();

  data.content.replace(/\{%(.*)%\}/gi,function(p1,p2){
	 data.title=p1+p2;
	 var imgArr=p2.split(' ');
	 var src=imgArr[0]?imgArr[0]:'';
	 var data_original=imgArr[1]?imgArr[1]:'';
	 var alt=imgArr[2]?imgArr[2]:'图片';
	 var title=imgArr[3]?imgArr[3]:'图片';
     var img='<img src="'+src+'" data-original="'+data_original+'" alt="'+alt+'" title="'+title+'" style="max-width:100%">';
	 return p1;
  });
  return data;
});
*/



if (hexo.config.postcdn && hexo.config.postcdn.enable) {
    hexo.extend.filter.register('after_render:html', require('./imgprocess'));
}
