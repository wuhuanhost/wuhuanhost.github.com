'use strict';

var cheerio = require('cheerio');
var URL = require('url');


function stringStartsWith(string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}



module.exports = function(source){
  var config = this.config;
  var baseUrl = config.postcdn.cdnlink;
  var loading = config.postcdn.tmpimglink;
  var yourclass = config.postcdn.tagclass;
  var oldsrc = '';
  
  var $ = cheerio.load(source, {
      decodeEntities: false
  });
  
  
  
    $('article div div div img').each(function(index, element) {
        oldsrc = $(element).attr('src');
		if (oldsrc && !$(element).hasClass("'"+yourclass+"'") && !$(element).hasClass('skip')) {
            if (baseUrl!=null){
			if (oldsrc.indexOf(baseUrl)!=-1)
			{	
			
			$(element).addClass("'"+yourclass+"'");
            $(element).attr({
                src: loading,
                'data-original': oldsrc 
            });
		    }
			else
			{
			$(element).addClass("'"+yourclass+"'");
            $(element).attr({
                src: loading,
                'data-original': baseUrl + oldsrc 
            });	
			}
			                }
							else
							{
			$(element).addClass("'"+yourclass+"'");
            $(element).attr({
                src: loading,
                'data-original': oldsrc 
            });
							}
        }
    });
	

  return $.html();
};
