$(function(){
	FI._actions();
});

FI = {
	_actions : function(){
	
		$("a[id^='btnExcluir_']").click(function(){
			$descricao_id = FI._getId(this);
			if(confirm(MI.M09)){
				$.ajax({
					async	: false,
					type	: 'post',
					url 	: site_url + "admin/categoriacontroller/excluir/" +$descricao_id,
					success : function(data){
						data = $.parseJSON(data);
						if(data){
							window.location.reload();
						}else{
							alert(MI.M15);
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