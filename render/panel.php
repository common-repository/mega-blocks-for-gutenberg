<div class="mbg-wrapper">
	<div class="card bg-<?php echo $style; ?>" style="text-align: <?php echo $alignment; ?>">
		<h5 class="card-header" style="color: <?php echo $title_color; ?>; font-size: <?php echo trim($title_size); ?>px"><?php echo $title; ?></h5>
		<div class="card-body">
		<?php echo apply_filters( 'the_content', $content ); ?>
		</div>
	</div>	
</div>