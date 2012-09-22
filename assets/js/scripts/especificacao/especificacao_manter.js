$(function(){
	FI._validate();
	FI._actions();
});

FI = {
		_actions : function(){
			$("#btnCadastrar").click(function(){
				$("#form_especificacao").submit();
			});
		},
		
		_validate : function(){
			$("#form_especificacao").validate({
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
							window.location.href = site_url + "/admin/especificacaocontroller";
						}else{
							alert('Ocorreu uma falha no momento da inclusão, tente novamente');
						}
						window.scrollTo(0,0);
					});
				}
			});
		}
}