<?php
	/**
	 * Registering Blocks here
	 */
	$blocks = array(

		array(
			'slug' => 'alert',
			'callback' => 'render_alert',
			'css' => 'bootstrap',
			'js' => false,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'button',
			'callback' => 'render_button',
			'css' => 'bootstrap',
			'js' => false,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'list-group',
			'callback' => 'render_list_group',
			'css' => 'bootstrap',
			'js' => false,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'list-item',
			'callback' => 'render_list_item',
			'css' => 'bootstrap',
			'js' => false,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'panel',
			'callback' => 'render_panel',
			'css' => 'bootstrap',
			'js' => false,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'icon',
			'callback' => 'render_icon',
			'css' => true,
			'js' => true,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'pricing-table',
			'callback' => 'render_pricing_table',
			'css' => true,
			'js' => false,
			'depends' => array('jquery'),
		),
		array(
			'slug' => 'testimonial',
			'callback' => 'render_testimonial',
			'css' => true,
			'localize' => true,
			'js' => false,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'profile',
			'callback' => 'render_profile',
			'localize' => true,
			'css' => true,
			'js' => false,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'product-card',
			'callback' => 'render_product_card',
			'css' => true,
			'localize' => true,
			'js' => false,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'image-hover',
			'callback' => 'render_image_hover',
			'css' => true,
			'js' => true,
			'localize' => true,
			'depends' => array('jquery'),
		),

		array(
			'slug' => 'count-up',
			'callback' => 'render_count_up',
			'css' => false,
			'js' => true,
			'depends' => array('jquery'),
		),
	);
?>