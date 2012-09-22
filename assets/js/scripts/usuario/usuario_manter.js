$(function(){
	FI._validate();
	FI._actions();
});

FI = {
		_actions : function(){
			$("#btnCadastrar").click(function(){
				$("#form_usuario").submit();
			});
		},
		
		_validate : function(){
			$("#form_usuario").validate({
				submitHandler : function(form){

				if(!verificaConfSenha()){
					Validate.show_errors($("#confSenha"), MI.M05);
					return false;
				}
				$("#btnCadastrar").attr("disabled", "disabled").text(MI.M06);
					$(form).ajaxSubmit(function(data){
						data = $.parseJSON(data);
						if(!data.status){
							$("#btnCadastrar").attr("disabled", false).text("Cadastrar");
							Validate.show_errors($("#email"), MI.M07);
						}else{
							alert(MI.M01);
							window.location.href = site_url + "/admin/main";
						}
						window.scrollTo(0,0);
					});
				}
			});
		}
}

function verificaConfSenha(){
	if($("#senha").val() == $("#confSenha").val()){
		return true;
	}
	return false;
}


