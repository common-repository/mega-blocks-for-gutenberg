<?php
$rand_id = rand(5,500);
?>
<div class="mbg-product-card" id="rard-<?php echo $rand_id; ?>">
	<figure>
	  <img src="<?php echo $image_url; ?>"/>
	  <div class="price" style="background-color: <?php echo $primary_color; ?>; color: <?php echo $primary_color_text; ?>"><?php echo $price_tag ?></div>
	  <figcaption style="background-color: <?php echo $bg_color; ?>">
		<h3 style="background-color: <?php echo $primary_color; ?>; color: <?php echo $primary_color_text; ?>"> <?php echo $heading_text ?> </h3>
		<p style="color: <?php echo $change_text_color; ?>; font-size: <?php echo $font_size; ?>px;"><?php echo $content; ?></p>
		<a href="<?php echo $btn_url; ?>" style="background-color: <?php echo $primary_color; ?>; color: <?php echo $primary_color_text; ?>"><?php echo $buying_text ?></a>
	  </figcaption>
	</figure>
</div>
<style>
	#rard-<?php echo $rand_id; ?> figure .price:before {
		border-color: transparent <?php echo $primary_color; ?> transparent;
	}
	#rard-<?php echo $rand_id; ?> figure h3:before {
		border-color: transparent transparent transparent <?php echo $primary_color; ?>
	}
	#rard-<?php echo $rand_id; ?> figure a:before {
		border-color: transparent transparent <?php echo $primary_color; ?>;
	}	
</style>