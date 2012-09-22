var especificacoes 	= new Array();
var imagens			= new Array();

Especificacao = function(id, descricao_esp, texto){
	this.id;
	this.descricao_esp
	this.texto;
	{this.id = id; this.texto = texto; this.descricao_esp = descricao_esp;}
}

Imagem	= function(nome, destaque){
	this.id
	this.nome
	this.destaque
	{this.nome = nome; this.destaque = destaque}
}

$(function(){
	FI._init();
	FI._validate();
	FI._uploads();
	
	var hddEspecificacoes = $.trim($("#especificacoes_produtos").val());
	if(hddEspecificacoes){
		especificacoes = $.parseJSON(hddEspecificacoes);
		FI._build_grid_especificacao();
	}
	
	var hddImagens = $.trim($("#imagens").val());
	if(hddImagens){
		imagens = $.parseJSON(hddImagens);
	}
	FI._build_grid_imagens();
});

function alterar_esp(event, i){
	event.preventDefault();
	var especificacao = especificacoes[i];
	$("#especificacao").val(especificacao.id);
	$("#descricao_espeficicacao").val(especificacao.texto);
}

function excluir_esp(event, i){
	event.preventDefault();
	if(confirm(MI.M17)){
		Uteis.removeItemArray(especificacoes, i);
		$("#especificacoes_produtos").val(JSON.stringify(especificacoes));
		FI._build_grid_especificacao();
	}
}

function excluir_img(event, i){
	event.preventDefault();
	if(confirm(MI.M17)){
		var destaque = imagens[i].destaque;
		Uteis.removeItemArray(imagens, i);
		if(imagens.length > 0 && destaque){
			imagens[imagens.length - 1].destaque = true;
		}
		$("#imagens").val(JSON.stringify(imagens));
		FI._build_grid_imagens();
	}
}

function destacar_img(event, indice){
	event.preventDefault();
	for(i in imagens){
		var imagem 		= imagens[i];
		imagem.destaque = false;
	}
	imagens[indice].destaque = true;
	$("#imagens").val(JSON.stringify(imagens));
	FI._build_grid_imagens();
}

FI = {
	_init : function(){
		$("#btnAddEspecificacoes").click(function(){
			FI._limpar_erro_produto();
			$("#form_especificacoes").submit();
		});
		
		$("#btnSalvar").click(function(){
			$("#form_produtos").submit();
		});
		
		$("#btnCancelar").click(function(){
			window.location.href = site_url + "admin/produtocontroller/index";
		});
		
	},
	
	_validate : function(){
		$("#form_especificacoes").validate({
			errorPlacement : function(element, msg){
				FI._mostra_erro_produto(element, msg);
			},
			submitHandler 	: function(){
				var selected 		= $("#especificacao option:selected");
				var string			= $.trim($("#descricao_espeficicacao").val());
				var exist			= false;
				for(i in especificacoes){
					if(especificacoes[i].id == selected.val()){
						especificacoes[i].texto = string;
						exist = true;
						break;
					}
				}
				if(!exist){
					var espeficicacao 	= new Especificacao(selected.val(), selected.text(), string);
					especificacoes.push(espeficicacao);	
				}
				FI._build_grid_especificacao();
				$("#especificacoes_produtos").val(JSON.stringify(especificacoes));
				$("#form_especificacoes").resetForm();
			}
		});
		
		$("#form_produtos").validate({
			submitHandler : function(form){
				var isEmpty = true;
				
				$("input[id^=idioma]").each(function(){
					if($.trim($(this).val())){
						isEmpty = false;
						return false;
					}
				});
				
				if(isEmpty){
					Validate.show_errors($("input[id^=idioma]"), MI.M08);
					scrollTo(0, 0);
					return false;
				}else{
					$(form).ajaxSubmit(function(data){
						data = $.parseJSON(data);
						if(data.status){
							alert(MI.M01);
							window.location.href = site_url + "admin/produtocontroller/";
						}
					});
				}
			}
		})
	},
	
	_uploads : function(){
		$("#form_imagens").fileupload({
			submit : function (e, data){
				data.formData = {
					'redimensionar'		: true,
					'new_width'			: 620,
					'new_height'		: 380,
					'allowed_types'		: 'png|jpeg|jpg'
				};
			},
			done : function (e, data){
				var retorno = $.parseJSON(data.result);
				if(retorno.status){
					var destaque 	= imagens.length == 0 ? true : false;  
					var imagem 		= new Imagem(retorno.nome_arquivo, destaque);
					imagens.push(imagem);
					$("#imagens").val(JSON.stringify(imagens));
					FI._build_grid_imagens();
				}else{
					alert(retorno.msg);
				}
			}
		});
		
		$("#form_manual").fileupload({
			submit : function (e, data){
				data.formData = {
					'allowed_types'		: 'pdf'
				};
			},
			done : function (e, data){
				var retorno = $.parseJSON(data.result);
				if(retorno.status){
					$("#arq_manual").val(retorno.nome_arquivo);
					$("#manual").val(retorno.arquivo_original);
					$("#nome_manual").html(retorno.arquivo_original);
				}else{
					alert(retorno.msg);
				}
			}
		});
	},
	
	_mostra_erro_produto : function(element, msg){
		var conteudo = $.trim($("#erros").html());
		if(conteudo.indexOf(msg) == -1){
			$("#erros").html(msg);
		}
	},
	
	_limpar_erro_produto : function(){
		$("#erros").text("");
		$("#control_especificacoes_produto").removeClass("error");
	},
	
	_build_grid_especificacao : function(){
		$("#table_especificacao tbody").html("");
		for(i in especificacoes){
			var especificacao = especificacoes[i];
			$("#table_especificacao tbody").append(FI._monta_tr(especificacao.descricao_esp, especificacao.texto, i));
		}
	},
	
	_build_grid_imagens : function(){
		$("#table_imagens tbody").html("");
		if(imagens.length == 0){
			$("#table_imagens").hide();
		}else{
			$("#table_imagens").show();
			for(i in imagens){
				var imagem = imagens[i];
				$("#table_imagens tbody").append(FI._monta_tr_imagens(imagem.nome, i, imagem.id, imagem.destaque));
			}
		}
	},
	
	_monta_tr_imagens : function(nome_imagem, indice, id_imagem, destaque){
		var url		= id_imagem ? url_arq+'/produtos/' : url_arq+'/tmp_file/';
		var action	= destaque ? "" : FI._build_action("Destacar Imagem", "icon-thumbs-up", "destacar_img(event, "+indice+")")
		var linha 	= '<tr>';
		linha		+= '<td><img src="'+ url + nome_imagem+'" width="150"/></td>';
		linha		+= '<td>'+ action + FI._build_action("Excluir Imagem", "icon-remove-sign", "excluir_img(event, "+indice+")")+'</td>';
		linha		+= '</tr>';
		return linha;
	},
	
	_monta_tr : function(descricao_esp, texto, indice){
		var linha 	= '<tr>';
		linha		+= '<td>'+descricao_esp+'</td>';
		linha		+= '<td>'+texto+'</td>';
		linha		+= '<td>'+FI._build_action("Editar Especificação", "icon-edit", "alterar_esp(event, "+indice+")")+FI._build_action("Excluir Especificação", "icon-remove-sign", "excluir_esp(event, "+indice+")")+'</td>';
		linha		+= '</tr>';
		return linha;
	},
	
	_build_action : function(title, icone, metodo){
		return '<a href="#" onclick="'+metodo+'" title="'+title+'"><span class="'+icone+'"></span></a>';
	}
	
}