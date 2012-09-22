<!DOCTYPE html>
<html lang="en">
<head>
<title>Baldan</title>
<meta charset="utf-8">
<link rel="stylesheet" href="<?php echo url_css("reset.css")?>" type="text/css" media="all">
<link rel="stylesheet" href="<?php echo url_css("layout.css")?>" type="text/css" media="all">
<link rel="stylesheet" href="<?php echo url_css("style.css")?>" type="text/css" media="all">
<link rel="shortcut icon" href="<?php echo url_img("favicon.ico")?>">

<!--[if lt IE 9]>
	<script type="text/javascript" src="js/html5.js"></script>
	<style type="text/css">
		.slider_bg {behavior:url(js/PIE.htc)}
	</style>
<![endif]-->
<!--[if lt IE 7]>
	<div style='clear:both;text-align:center;position:relative'>
		<a href="http://www.microsoft.com/windows/internet-explorer/default.aspx?ocid=ie6_countdown_bannercode"><img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" alt="" /></a>
	</div>
<![endif]-->
</head>
<body id="page1">
<div class="body6">
	<div class="body1">
		<div class="body5">
			<div class="main">
<!-- header -->
				<header>
					<h1><a href="<?php echo site_url();?>" id="logo">Madeira - Diversos tipos de Madeira</a></h1>
					<nav>
						<?php echo get_menu_portal()?>
					</nav>
				</header>
<!-- / header -->
<!-- content -->
				<?php echo @$conteudo;?>
			</div>
		</div>
	</div>
</div>
<div class="body3">
	<div class="body4">
		<div class="main">
			<footer>
				<div class="wrapper">
					<section class="col1">
						<br><br><br>
						<a href="https://www.cartaobndes.gov.br/cartaobndes/" target="blank"><img hspace="0" border="0" align="absbiddle" src="<?php echo base_url()."assets/img/bnds.png";?>" alt="" height="80" width="auto"></a>
					</section>
					<section class="col5 pad_left1">
						<h3>Ligue Agora:<span>(16) 3251-9800</span></h3>
						Av. 9 de Julho, nº 836 - Centro - Guariba/SP<br><br>
	                    Desenvolvido por EC9 
					</section>
				</div>
			</footer>
		</div>
	</div>
</div>
<script type="text/javascript" src="<?php echo url_js("libs/jquery-1.7.2.min.js")?>" ></script>
<script type="text/javascript" src="<?php echo url_js("libs/cufon-yui.js")?>"></script>
<script type="text/javascript" src="<?php echo url_js("libs/cufon-replace.js")?>"></script>  
<script type="text/javascript" src="<?php echo url_js("libs/Forum_400.font.js")?>"></script>
<script type="text/javascript" src="<?php echo url_js("libs/jquery.easing.1.3.js")?>"></script>
<script type="text/javascript" src="<?php echo url_js("libs/tms-0.3.js")?>"></script>
<script type="text/javascript" src="<?php echo url_js("libs/tms_presets.js")?>"></script>
<script type="text/javascript" src="<?php echo url_js("libs/atooltip.jquery.js")?>"></script>
<script type="text/javascript">
	var site_url = "<?php echo site_url()?>";
	var url_img  = "<?php echo url_img()?>";
	Cufon.now();
</script>
<?php
    	echo $_scripts;
    	echo $_styles;
?>
</body>
</html>