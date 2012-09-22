$(function(){
	loadValidate();
	bind();
	$("#senha").keypress(function(event){
		if(event.which == 13){
			$("#formLogin").submit();
		}
	});
});

function loadValidate(){
	$("#formLogin").validate({
		rules:{
	    	email: {
	           required: true,
	           email: true
	       	},
	       	senha: {
	       		required : true
	       	}
    	},
    	messages:{
              email: {
    			email: MI.M14
             },
    	senha: {
            	 email: ""
    	}
    	},
		submitHandler : function(form) {
		
				var form = $(form).serialize();				
				$.ajax({
					url     : site_url + "admin/logincontroller/logar",
					type    :"post",
					data    : form,
					dataType: "json",
					success : function(data){
						if(data == 1){
							window.location.href = site_url + "admin/main";							
						} else {
							$("#formLogin .control-group").addClass("error");
							$("#formLogin .help-inline:first").text(MI.M16);
						}
						
					}
				});
				return false;
			}
	});
}

function bind(){
	$("#btLogar").click(function(){
		$("#formLogin").submit();
		return false;
		}
	);
}