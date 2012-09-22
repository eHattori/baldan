$(function(){
	FI._init();
	FI.validate();
	loadScript();
});

FI = {
	_init	: function(){
		$("#btnEnviar").click(function(event){
			event.preventDefault();
			$("#alert_msg").text("");
			$(".alert").hide();
			$("#ContactForm").submit();
		});
		
		$("#btnLimpar").click(function(event){
			event.preventDefault();
			$("#alert_msg").text("");
			$(".alert").hide();
			$("#ContactForm").resetForm();
		});
		
		$("#estados").change(function(){
			FI._get_cidades($(this).find("option:selected").val());
		});
	},
	validate : function(){
		$("#ContactForm").validate({
			errorPlacement : function(element, error){
				if($("#alert_msg").text().indexOf(error) == -1){
					var msg = $.trim($("#alert_msg").text()) != "" ? $("#alert_msg").text() + "<br/>" + error : error;
					$("#alert_msg").html(msg);
				}
				$(".alert").show();
			},
			submitHandler : function(form){
				$(form).ajaxSubmit(function(data){
					data = $.parseJSON(data);
					if(data.status){
						$(form).resetForm();
						alert("Mensagem enviada com sucesso!");
					}else{
						alert(data.msg);
					}
				});
			}
		});
	},
	
	_get_cidades : function(id_estado){
		$.ajax({
			url		: site_url + "contatocontroller/ajax_get_cidades",
			type	: "post",
			async	: false,
			data	: {id_estado : id_estado},
			success	: function(data){
				$("#div_cidades").html(data);
			}
		});
	}
}

function initialize() {
	var latitude_longitude = new google.maps.LatLng(-21.359814, -48.227832);
	var mapOptions = {
	    zoom: 16,
	    center: latitude_longitude,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  }
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var latitude_longitude = new google.maps.LatLng(-21.360214,-48.227816);
	var marker = new google.maps.Marker({
		position: latitude_longitude,
	    map: map,
	    icon: url_img + "/baldan32x32.png",
	    title: 'Baldan Máquinas e Equipamentos'
	});
}

function loadScript() {
	  var script = document.createElement("script");
	  script.type = "text/javascript";
	  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
	  document.body.appendChild(script);
}