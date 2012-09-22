$(function(){
	FI._actions();
});

FI = {
	_actions : function(){
		$("a[id^='btnExcluir_']").click(function(){
			if(confirm(MI.M04)){
				$.ajax({
					async	: false,
					type	: 'post',
					url 	: site_url + "admin/idiomacontroller/excluir",
					data 	: {idioma_id : FI._getId(this)},
					success : function(data){
						data = $.parseJSON(data);
						if(data.status){
							window.location.reload();
						}else{
							alert("Idioma vinculado com um ou mais itens (produtos/categorias/especificações)");
						}
					}
				});
			}
		});
	},
	
	_getId : function(obj){
		var split = obj.id.split("_");
		return split[1];
	}
}