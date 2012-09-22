var grid = '';
$(function(){
	FI._init();
});

FI = {
	_init : function(){
		grid = $("#grid_galeria").jGrid({
			limite: 15
		    ,url: site_url + 'admin/galeriacontroller/ajax_consultar'
		    ,colluns: [
		               {header : "Descrição", width:50, align : "left"},
		               {header : "Tipo", width:20, align : "left"},
		               {header : "Ações", width:30, align : "left"}
		       ]
		});
		
		$("a[id^='btnExcluir']").live("click", function(){
			if(confirm(MI.M17)){
				$.ajax({
					async	: false,
					type	: 'post',
					url 	: site_url + "admin/galeriacontroller/excluir",
					data 	: {galeria_id : FI._getId(this)},
					success : function(data){
						data = $.parseJSON(data);
						if(data.status){
							window.location.reload();
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