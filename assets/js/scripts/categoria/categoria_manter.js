$(function(){
	FI._validate();
	FI._actions();
	
	$("input[id^='idioma']").each(function(){
		if($(this).val()){
			$(this).addClass("required");
		}
	});
	
});

FI = {
		_actions : function(){
			$("#btnCadastrar").click(function(){
				$("#form_categoria").submit();
			});
			
			$("#btnVoltar").click(function(){
				window.location.href = site_url + "admin/categoriacontroller/";
			});
		},
		
		_validate : function(){
			$("#form_categoria").validate({
				submitHandler : function(form){
				
				var campoPreenchido = false;
				
				$("input[id^=idioma]").each(function(){
					if($.trim($(this).val())){
						campoPreenchido = true;
					}
				});
				
				if(!campoPreenchido){
					Validate.show_errors($("input[id^=idioma]"), MI.M08);
					return false;
				}
				
				$("#btnCadastrar").attr("disabled", "disabled").text(MI.M06);
					$(form).ajaxSubmit(function(data){
						if(data == 1){
							alert(MI.M01);
							window.location.href = site_url + "/admin/categoriacontroller";
						}else{
							alert('Ocorreu uma falha no momento da inclusão, tente novamente'); //Nao sei ainda o que pode acontecer, mas vai que acontece...
						}
						window.scrollTo(0,0);
					});
				}
			});
		}
}
