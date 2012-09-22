$(function(){
	FI._init();
	FI._validate();
	FI._actions();
	FI._upload();
});

FI = {
		_actions : function(){
			$("#btnSalvar").click(function(){
				$("#form_idioma").submit();
			});
			
			$("#btnCancelar").click(function(){
				window.location.href = site_url + "admin/idiomacontroller/";
			});
		},
		
		_init : function(){
			if($.trim($("#imagem_old").val()) != ""){
				$("#img_bandeira").attr("src", url_arq+"/idiomas/"+$("#imagem_old").val()).show();
			}
		},
		
		_validate : function(){
			$("#form_idioma").validate({
				submitHandler : function(form){
					if($.trim($("#imagem").val()) == ""){
						Validate.show_errors("#span_img", MI.M03);
					}else{
						$(form).ajaxSubmit(function(data){
							data = $.parseJSON(data);
							if(data.status){
								alert(MI.M01);
								window.location.href = site_url + "admin/idiomacontroller/";
							}else{
								$("#form_idioma .control-group").addClass("error");
								$("#form_idioma .help-inline:first").text(MI.M02);
							}
						});
					}
				}
			});
		},
		
		_upload : function(){
			$("#arquivo").fileupload({
				submit : function (e, data){
					data.formData = {
						'redimensionar'		: true,
						'new_width'			: 32,
						'new_height'		: 32,
						'allowed_types'		: 'png|jpeg|jpg'
					};
				},
				done : function (e, data){
					var retorno = $.parseJSON(data.result);
					if(retorno.status){
						$("#img_bandeira").attr("src", url_arq+"/tmp_file/"+retorno.nome_arquivo).show();
						$("#imagem").val(retorno.nome_arquivo);
					}else{
						alert(retorno.msg);
					}
				}
			});
		}
}