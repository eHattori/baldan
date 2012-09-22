$(function(){
	$('.carousel').carousel();
	
	$("a[id^='link_img_']").click(function(event){
		event.preventDefault();
		var temp 	= this.id.split("_");
		var id		= temp[2];
		$(".active").removeClass("active");
		$("#item_carousel_"+id).addClass("active");
	});
});