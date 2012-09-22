$(function(){
	$("a[id^='link_img_']").click(function(event){
		event.preventDefault();
		var temp 	= this.id.split("_");
		var id		= temp[2];
		$("#descricao_video").text($("#div_descricao_"+id).text());
		$("#conteudo_modal_video").html(FI.create_video($("#hdd_video_"+id).val()));
		$("#myModal").modal();
	});
	
	$("#myModal").on("hide", function(){
		$("#conteudo_modal_video").text("");
	});
});

FI = {
	create_video : function(video){
		return '<object width="640" height="360">'+
					'<param name="movie" value="http://www.youtube.com/v/'+video+'?version=3&amp;hl=pt_BR"></param>'+
					'<param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>'+
					'<embed src="http://www.youtube.com/v/'+video+'?version=3&amp;hl=pt_BR&autoplay=1" type="application/x-shockwave-flash" width="640" height="360" allowscriptaccess="always" allowfullscreen="true"></embed>'+
				'</object>';
	}
}