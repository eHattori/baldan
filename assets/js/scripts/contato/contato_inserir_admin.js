$(function(){	
	loadEstado();
	loadMask();
	loadValidate();
	bind();
});

function loadEstado(){
	$("#estado").change(function(){
		if($(this).val()==""){
			$("#complemento").hide("slow");
		} else {
			loadCidade();
		}
	});
}

function loadCidade(){	
	$.ajax({
		url		: site_url + "admin/contatocontroller/ajaxcarregacidade",
		type	: "post",
		data	: {id: $("#estado option:selected").val()},
		dataType: "json",
		async	: false,
		success: function(data){			
			var options = '<option value="">Selecione</option>';

            for(i in data){
               options += '<option value="' + data[i].id+ '">' + data[i].nome + '</option>';
            }
            $("#cidade").html(options);
			
		},
		complete: function(){
			if($("#complemento").attr("style") != ""){
				$("#complemento").show("slow");
				$("#cidade").focus();
			}
		}
	});
}

function loadMask(){
	$("#telefone, #celular").mask("(9999)9999-9999");
}

function loadValidate(){
	$("#formContato").validate({
		rules:{
	    	email: {
	           required: true,
	           email: true
	       	}
    	},
    	messages:{
              email: {
    			email: MI.M14
             }
    	},
		submitHandler : function(form) {
		
		var id  = $("#contato_id").val();
		var msg; 
		
		if(id){
			msg = MI.M12;
		} else {
			msg = MI.M10;	
		}		
		if(confirm(msg)){
				var form = $(form).serialize();
				$.ajax({
					url     : site_url + "admin/contatocontroller/salvar",
					type    :"post",
					data    : form,
					dataType: "json",
					success : function(data){
						if(data.status){
							alert(MI.M01);
							window.location.href = site_url+"admin/contatocontroller/";							
						} else {							
							$("#grupoEmail").addClass("error");
							$("#grupoEmail .help-inline").text(MI.M13);
						}
					}
				});
				return false;
			}
		}		
	});
}

function bind(){
	$("#btnSalvar").click(function(){
		Validate.clear_erros();
		$("#formContato").submit();
	});
	$("#btnCancelar").click(function(){
		window.location.href = site_url + "admin/contatocontroller/index#jgrid=1";
	});
}