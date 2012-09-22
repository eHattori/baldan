$(function(){
	FI._init();
	FI._validate();
	FI._actions();
	FI._upload();
});

FI = {
		_actions : function(){
			$("#btnSalvar").click(function(){
				$("#form_galeria").submit();
			});
			
			$("#btnCancelar").click(function(){
				window.location.href = site_url + "admin/galeriacontroller/";
			});
		},
		
		_init : function(){
			if($("#tipo option:selected").val() == "F"){
				$("#form_foto_galeria").show();
				$("#input_arquivo").hide();
				$("#name_arquivo").val("");
			}else{
				$("#form_foto_galeria").hide();
				$("#input_arquivo").show();
			}
			
			if($.trim($("#imagem_old").val()) != ""){
				$("#img_galeria").attr("src", url_arq+"/galeria/"+$("#imagem_old").val()).show();
			}
			
			$("#tipo").change(function(){
				if($(this).find("option:selected").val() == "F"){
					$("#form_foto_galeria").show();
					$("#input_arquivo").hide();
					$("#name_arquivo").val("");
				}else{
					$("#form_foto_galeria").hide();
					$("#input_arquivo").show();
				}
			});
		},
		
		_validate : function(){
			$("#form_galeria").validate({
				submitHandler : function(form){
					if($("#tipo option:selected").val() == "F" && $.trim($("#imagem").val()) == ""){
						Validate.show_errors("#span_img", MI.M03);
					}else{
						$(form).ajaxSubmit(function(data){
							data = $.parseJSON(data);
							if(data.status){
								alert(MI.M01);
								window.location.href = site_url + "admin/galeriacontroller/";
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
						'new_width'			: 552,
						'new_height'		: 400,
						'allowed_types'		: 'png|jpeg|jpg'
					};
				},
				done : function (e, data){
					var retorno = $.parseJSON(data.result);
					if(retorno.status){
						$("#img_galeria").attr("src", url_arq+"/tmp_file/"+retorno.nome_arquivo).show();
						$("#imagem").val(retorno.nome_arquivo);
					}else{
						alert(retorno.msg);
					}
				}
			});
		}
}