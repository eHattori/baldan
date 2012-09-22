var grid = '';
$(function(){	
	carregaGrid();
	bindPesquisa();
	bindInserir();
	
	$("a[id^='visualizar_grid']").live("click", function(){
		var id = get_id(this.id, 2);
		$.ajax({
			url : site_url + "admin/contatocontroller/ajaxvisualizar",
			data: {id: id},
			dataType: "json",
			type: "post",
			async: false,
			success: function(data){
				var celular = data.celular == null ? "" : data.celular;
				var telefone= data.telefone == null ? "" : data.telefone;
				$("#nome").html(data.nome);
				$("#email").html(data.email);
				$("#telefone").html("Tel.:"+telefone);
				$("#celular").html("Cel.:"+celular);
			},
			complete: function(){
				$("#modalVisualizar").modal("show");				
			}
		});
	});
	
	$("a[id^='excluir_grid']").live("click", function(){
		var id = get_id(this.id, 2);
		if(confirm(MI.M11)){
			$.ajax({
				url 	: site_url + "admin/contatocontroller/ajax_excluir",
				data 	: {id : id},
				dataType: "json",
				type	: "post",
				async	: false,
				success	: function(data){
					if(data.status){
						alert(MI.M01);
						grid.reload({consultar:true});
					}
				}
			});
		}
	});
});

function get_id(id, pos){
	var temp = id.split("_");
	return temp[pos];
}

function carregaGrid(){
	grid = $("#gridContatos").jGrid({
		limite	: 15
	    ,url	: site_url + 'admin/contatocontroller/ajaxconsultar'
	    ,data 	: {
			nome : $("#txtNome"),
			email: $("#txtEmail")
		}
	    ,colluns: [
	               {header : "ID"		, width:10, align : "left"},
	               {header : "Nome"		, width:35, align : "left"},
	               {header : "E-mail"	, width:35, align : "left"},
	               {header : "Ações"	, width:20, align : "left"}]
	});
}

function bindPesquisa(){
	$("#btnPesquisar").click(function(){
		grid.reload({consultar:true});
	});
}

function bindInserir(){
	$("#btnCadastrar").live("click",function(){
		window.location.href= site_url + "admin/contatocontroller/inserir";
		return false;
	});
}