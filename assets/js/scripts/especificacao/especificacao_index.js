var grid = '';
$(function(){
	FI._init();
});

FI = {
	_init : function(){
		grid = $("#grid_especificacoes").jGrid({
			limite: 10
		    ,url: site_url + 'admin/especificacaocontroller/ajax_consultar'
		    ,colluns: [
		               {header : "Descrição", width:70, align : "left"},
		               {header : "Ações", width:30, align : "left"}
		       ]
		});
		
		$("a[id^='btnExcluir']").live("click", function(){
			if(confirm(MI.M19)){
				$.ajax({
					async	: false,
					type	: 'post',
					url 	: site_url + "admin/especificacaocontroller/excluir",
					data 	: {especificacao_id : FI._getId(this)},
					success : function(data){
						data = $.parseJSON(data);
						if(data.status){
							window.location.reload();
						}else{
							alert(MI.M20);
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