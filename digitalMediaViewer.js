//CREATOR JY
//CREATED 2017-01-25
//UPDATED 2017-07-11
//VERSION 2.4

function set_iframe(){
	if(!!$('iframe')[0]){
		if(!$('.video_wrapper')[0]){
			var offset = 280;
		 	var height = (window.innerHeight-offset)+'px';
			$('iframe').css('height', height);	
			$('iframe').css('margin-top', '20px');	
			$(window).resize(function(){		
				var height = (window.innerHeight-offset)+'px';
				$('iframe').css('height', height);	
			});
		}
	}
}

function thumbnail_handler(){		
	$('.showPicture').hover(function(){
		$('.Style').css('visibility','hidden'); 
		var image_id = $(this).data("img");		
		document.getElementsByClassName('Style '+image_id)[0].style.visibility = 'visible';
	}, function(){
		$('.Style').css('visibility','hidden'); 
	});

	if($('.in-images').length > 0){
		var frame = $('.in-images');
		var width = $('.in-images').parent()[0].clientWidth;		
		var height = width*11/8.5;	
		frame.css('width', width);
		frame.css('height', height);
		$(window).resize(function(){
			width = $('.in-images').parent()[0].clientWidth;
			height = width*11/8.5;	
			frame.css('width', width);
			frame.css('height', height);
		});
	}	
} 

function navtabs_handler(){
	$('.tab-content').hide();
	var checked = $(":checked");
	var element = checked[0];
	if(element){
		if(element.checked){
			var number = element.id.replace('tab', '');
		}
		$('#tab-content'+number).show();
		$('.tabs').on('click', function(){
			$('.tab-content').hide();
			var checked = $(":checked");
			var element = checked[0];
			if(element.checked){
				var number = element.id.replace('tab', '');
			}
			$('#tab-content'+number).show();
		});
	}
}
 
function scroll_handler(){
	var tabs_height = $('.tabs').length > 0 ? $('.tabs')[0].clientHeight : 0;
	var default_gap = 205;
	var thumbnail_padding = 30;	
	var xs_width = 641;
	var sm_width = 1026;
	$('.scroll').click(function(event){
	  event.preventDefault();  
	  $('html, body').animate({scrollTop: "0"}, 600, 'swing');    
	});
	$('[href="#top"]').hide();
	$(window).scroll(function() {		
		if(window.innerWidth > xs_width){
			var thumbnail_top_gap = window.innerWidth < sm_width ? tabs_height + default_gap : default_gap;
			if($(window).scrollTop() < thumbnail_top_gap){
				$('.in-images').css('position', 'relative');
				$('.in-images').css('top', '0');
			}
			if($(window).scrollTop() >= thumbnail_top_gap){
				$('.in-images').css('position', 'fixed');
				$('.in-images').css('top', thumbnail_padding+'px');
			}
		}
		if($(window).scrollTop() < 200){
			$('[href="#top"]').fadeOut('fast');	 
		}
		if($(window).scrollTop() >= 200){
			$('[href="#top"]').fadeIn('fast');
		}
	});
}

function expand_all(){
	var id = $('.tabs [id^="tab"]:checked').attr('id');	
	if(!!id){
		id = id.replace(/tab/, '');
		var tabs = $('#tab-content'+id+' .ac-input');
		var l = tabs.length;
		for(var x = 0; x < l; x++){
			var tab = tabs[x];
			tab.checked = true;
		}
	}else{
		var ac = $('.ac-input');
		for(var x = 0; x < ac.length; x++){
			ac[x].checked = true;
		}
	}
}

function collapse_all(){
	var id = $('.tabs [id^="tab"]:checked').attr('id');	
	if(!!id){
		id = id.replace(/tab/, '');
		var tabs = $('#tab-content'+id+' .ac-input');
		var l = tabs.length;
		for(var x = 0; x < l; x++){
			var tab = tabs[x];
			tab.checked = false;
		}
	}else{
		var ac = $('.ac-input');
		for(var x = 0; x < ac.length; x++){
			ac[x].checked = false;
		}
	}
}
function has_accordion(){	
	var id = $('.tabs [id^="tab"]:checked').attr('id');	
	if(!!id){
		id = id.replace(/tab/, '');
		if($('#tab-content'+id+' .ac').length <= 0){
			return false;
		}else{
			return true;
		}
	}else{
		if($('.ac').length > 0){		
			return true;	
		}else{
			return false;	
		}		
	}	 
}
function check_accordions(){	
	var toolbar = $(".toolbar");		
	if(!!has_accordion()){toolbar.removeClass('disabled');}else{toolbar.addClass('disabled');}
}	

$('.tabs').click(function(){
	check_accordions();
});

function set_accessible_version_link() {
	$(".accessible-version-link").each(function(){
		var str = this.href.match(/fn=.+/);
		if(str) {
			str = str[0].replace(/fn=/, "");
			str = decodeURIComponent(str);
			this.href = str;
			return true;
		}

	})
}

$(document).ready(function(){ 
	scroll_handler();
	navtabs_handler(); 
	thumbnail_handler();	
	check_accordions();
	set_iframe();
	set_accessible_version_link();
});
