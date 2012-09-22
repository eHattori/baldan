$(function(){
	$("a[id^='link_img']").click(function(event){
		event.preventDefault();
		$("#img_modal").attr("src", $(this).find("input[type='hidden']").val());
		$("#myModal").modal();
	});
	
	$("tr:even").css("background", "#FFDEAD");
});