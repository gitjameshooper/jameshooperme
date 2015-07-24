(function(){
	var num = 20;
	var offset = 0;
	function lazyLoad(limit, offset){
		$.get("http://www.stellarbiotechnologies.com/media/press-releases/json?limit="+limit+"&offset="+offset, function(data) {
			var $list = $('.news-list');
			var newsList = data.news;
			if(newsList.length > 0){
				$.each(newsList, function(k, v){
					$list.append('<li class="new"><span class="date">'+newsList[k].published+'</span><span class="title">'+newsList[k].title+'</span></li>');
					$list.find(".new").hide().fadeIn(2000).removeClass('new');
				});
			}else{
				$(".news-list").off('scroll');
			}
		});
	}
	$(".news-list").scroll(function() {
		var $elem = $(this);
		    if ($elem[0].scrollHeight - $elem.scrollTop() == $elem.outerHeight()) {
    			lazyLoad(num,offset += num); 	
    		}
	});
	lazyLoad(num,offset);
})();