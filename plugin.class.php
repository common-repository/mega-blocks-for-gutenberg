<?php
/**
* Main Class
*/
class Mega_Blocks_Gutenberg
{
	
	function __construct()
	{
		add_action( 'init', array( $this, 'init_gutenberg_blocks' ) );
        add_action( 'enqueue_block_editor_assets', array($this, 'block_editor_assets') );
        add_filter( 'block_categories', array($this, 'block_category'), 10, 2 );
        add_action( 'admin_enqueue_scripts', array($this, 'load_admin_scripts') );
	}

    function load_admin_scripts() {
        wp_enqueue_style( 'mgb-admin-styles', MBG_URL .'/assets/css/admin.css');
    }

    function get_blocks(){
        $blocks = array();
        include MBG_PATH.'/inc/blocks.php';
        return apply_filters( 'mbg_blocks_list', $blocks );
    }

	function init_gutenberg_blocks(){

        /**
         * Registering Blocks with Styles and Scripts
         */
        $blocks = $this->get_blocks();
        foreach ($blocks as $block) {
            $settings = array();
            if ($block['callback'] != '') {
                $settings['render_callback'] = array($this, $block['callback']);
            }
            
            // Styles
            if (isset($block['css']) && $block['css'] != '') {
                if ($block['css'] == true && file_exists(MBG_PATH.'/assets/css/'.$block['slug'].'.css')) {
                    wp_register_style('mbg-front-'.$block['slug'] , MBG_URL.'/assets/css/'.$block['slug'].'.css');   
                    $settings['style'] = 'mbg-front-'.$block['slug'];
                } elseif ($block['css'] == 'bootstrap') {
                    wp_register_style('mbg-bootstrap' , MBG_URL.'/assets/css/bootstrap.css');   
                    $settings['style'] = 'mbg-bootstrap';
                }
            }
            // Scripts
            if (isset($block['js']) && $block['js'] != '') {
                if ($block['js'] == true && file_exists(MBG_PATH.'/assets/js/'.$block['slug'].'.js')) {
                    wp_register_script('mbg-front-'.$block['slug'] , MBG_URL.'/assets/js/'.$block['slug'].'.js', $block['depends']);
                    $settings['script'] = 'mbg-front-'.$block['slug'];
                }
            }

            if (function_exists('register_block_type')) {

                register_block_type( 'mega-blocks-gutenberg/'.$block['slug'], $settings );
            }
        }

    }

    function gutenberg_install_notice() {
        $plugin_name = 'Mega Blocks for Gutenberg';
        echo '
        <div class="updated">
          <p>'.sprintf('<strong>%s</strong> requires <strong>Gutenberg</strong> plugin to be installed and activated on your site.', $plugin_name).'</p>
        </div>';
    }

    function block_editor_assets(){
        $blocks = $this->get_blocks();

        foreach ($blocks as $block) {
            // Styles
            if (isset($block['css']) && $block['css'] != '') {
                if ($block['css'] == true && file_exists(MBG_PATH.'/assets/css/'.$block['slug'].'.css')) {
                    wp_enqueue_style('mbg-front-'.$block['slug'] , MBG_URL.'/assets/css/'.$block['slug'].'.css');
                } elseif ($block['css'] == 'bootstrap') {
                    wp_enqueue_style('mbg-bootstrap' , MBG_URL.'/assets/css/bootstrap.css');
                }
            }
            if (file_exists(MBG_PATH.'/blocks/'.$block['slug'].'.js')) {
                wp_enqueue_script( 'mbg-admin-'.$block['slug'], MBG_URL.'/blocks/'.$block['slug'].'.js', array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), MBG_PATH.'/blocks/'.$block['slug'].'.js');
                if (isset($block['localize']) && $block['localize'] == true) {
                    $localize_vars = array(
                        'mbg_assets_dir' => MBG_URL.'/assets',
                    );                
                    wp_localize_script( 'mbg-admin-'.$block['slug'], 'mbg_vars', $localize_vars );
                }
            }
        }

    }

    function block_category($categories){
        return array_merge(
            $categories,
            array(
                array(
                    'slug' => 'mega_blocks',
                    'title' => __( 'Mega Blocks', 'mega-blocks' ),
                ),
            )
        );
    }


    function render_alert($attrs, $content){
        extract( shortcode_atts( array(
            'style' => 'primary',
            'alignment' => '',
            'text_color' => '',
            'bg_color' => '',
        ), $attrs ) );
        ob_start();
            include MBG_PATH.'/render/alert.php';
        return ob_get_clean();
    }


    function render_button($attrs, $content){
        extract( shortcode_atts( array(
            'style' => 'primary',
            'alignment' => '',
            'label' => 'Button Label',
            'text_color' => '',
            'bg_color' => '',
            'link_target' => '',
            'url' => '',
            'outline' => '',
            'block' => '',
            'size' => '',
        ), $attrs ) );
        $style = ($outline) ? 'outline-'.$style : $style ;
        $style = ($block) ? $style.' btn-block' : $style ;
        $style = $style.' '.$size;
        ob_start();
            include MBG_PATH.'/render/button.php';
        return ob_get_clean();
    }

    function render_panel($attrs, $content){
        extract( shortcode_atts( array(
            'title' => 'Panel Title',
            'alignment' => '',
            'style' => 'primary',
            'title_color' => '',
            'title_size' => '',
        ), $attrs ) );
        ob_start();
            include MBG_PATH.'/render/panel.php';
        return ob_get_clean();
    }

    function render_list_group($attrs, $content){
        ob_start();
            include MBG_PATH.'/render/list-group.php';
        return ob_get_clean();
    }

    function render_list_item($attrs){
        extract( shortcode_atts( array(
            'text' => 'List Item',
            'alignment' => '',
            'style' => 'primary',
            'active' => false,
        ), $attrs ) );
        ob_start();
            include MBG_PATH.'/render/list-item.php';
        return ob_get_clean();
    }

    function render_icon($attrs, $content){
        extract( shortcode_atts( array(
            'icon_class' => 'fab fa-blogger',
            'font_size' => '',
            'icon_color' => '',
            'bg_color' => '',
            'padding' => '',
            'border_radius' => '',
            'width' => '',
            'alignment' => 'center',
        ), $attrs ) );
        ob_start();
            include MBG_PATH.'/render/icon.php';
        return ob_get_clean();
    }
    function render_pricing_table($attrs, $content){
        extract( shortcode_atts( array(
            'header_color' => 'white',
            'price_color' => '',
            'tag_line_color' => '',
            'bg_color' => '',
            'price' => '$19',
            'tag_line' => '/MONTH',
            'price_header' => 'Starter',
            'border_radius' => '5px',
            'btn_text' => 'Purchase Now',
            'btn_url' => '',
            'link_target' => '',
            'btn_border_radius' => '',
            'btn_background_color' => '',
            'btn_text_color' => '',
            'content_font_size' => '14px',
            'content_color' => '',
            'unique_id' => 'some-id',
            'btn_text_color_h' => '',
            'btn_background_color_h' => '',
        ), $attrs ) );
        ob_start();
            include MBG_PATH.'/render/pricing-table.php';
        return ob_get_clean();   
    }
    function render_testimonial($attrs, $content){
        extract( shortcode_atts( array(
            'image_url' => MBG_URL.'/assets/images/user.jpg',
            'change_heading' => 'Some Name',
            'last_heading' => 'Company Name Inc',
            'change_text_color' => 'white',
            'change_text_bgcolor' => 'rgb(0, 123, 255)',
            'change_name_color' => '',
            'change_company_color' => '',
            'font_size'=>'15',
        ), $attrs ) );
        ob_start();
        include MBG_PATH.'/render/testimonial.php';
        return ob_get_clean();      
    }
    function render_profile($attrs, $content){
        extract( shortcode_atts( array(
            'bg_color' => '',
            'icons_color' => '',
            'company_color' => '',
            'change_text_color' => '',
            'change_heading_color' => '',
            'founder_name' => 'Founder',
            'image_url' => MBG_URL.'/assets/images/user.jpg',
            'image_title' => 'Sue Shei',
            'img_border' => '5px',
            'icon_size'=>'20px',
            'fb_url'=>'#',
            'twitter_url'=>'#',
            'insta_url'=>'#',
            'whatsapp_url'=>'',
            'skype_url'=>'',
            'link_target'=>'',
        ), $attrs ) );
        $social_networks = array(
            'fab fa-facebook' => $fb_url,
            'fab fa-twitter' => $twitter_url,
            'fab fa-instagram' => $insta_url,
            'fab fa-whatsapp' => $whatsapp_url,
            'fab fa-skype' => $skype_url,
        );
        ob_start();
        include MBG_PATH.'/render/profile.php';
        return ob_get_clean();      

    }

    function render_product_card($attrs, $content){
        extract( shortcode_atts( array(
            'bg_color' => 'white',
            'change_text_color' => '',
            'font_size' => '',
            'primary_color_text' => '',
            'primary_color' => '#000',
            'image_url' => MBG_URL.'/assets/images/placeholder.gif',
            'price_tag' => '$19.00',
            'buying_text' => 'Add to Cart',
            'heading_text' => 'Denim Shirt',
            'btn_url' => '',
        ), $attrs ) );
        ob_start();
        include MBG_PATH.'/render/product-card.php';
        return ob_get_clean();        
    }

    function render_count_up($attrs, $content){
        extract( shortcode_atts( array(
            'counter_content' => '1,734,195.10',
            'before_text' => '',
            'after_text' => '',
            'number_color' => '',
            'text_color' => '',
            'font_family' => '',
            'alignment' => 'center',
            'font_size' => '',
            'delay' => '10',
            'time' => '1000',
        ), $attrs ) );
        ob_start();
        include MBG_PATH.'/render/count-up.php';
        return ob_get_clean();        
    }

    function render_image_hover($attrs){
        extract( shortcode_atts( array(
            'hover_style'     =>      'zoom-in',
            'image_url'       =>      MBG_URL.'/assets/images/placeholder.gif',
            'image_alt'       =>      '',
            'image_title'     =>      '',
            'title'           =>      'TITLE HERE',
            'font_size'       =>      '24px',
            'font_family'     =>      'Roboto, sans-serif',
            'title_color'     =>      '',
            'overlay_color'   =>      '',
            'overlay_opacity' =>      '0.5',
            'link'            =>      '',
            'link_target'     =>      '',
            'unique_id'       =>      'change-this-id',
            'alignment'       =>      'center',
            'animation_speed'       =>      '',
            'border_width'       =>      '',
            'border_color'       =>      '',
            'border_radius'       =>      '',
            'transition_duration'       =>      '',
            'border_type'       =>      'none',
            'shadow'       =>      '',
        ), $attrs ) );
        if ($link_target == 'disable') {
            $link = 'javascript:void(0)';
        }
        $popup_attrs = '';
        // var_dump($link_target);
        if ($link_target == 'popup') {
            wp_enqueue_style( 'ihe-popup-css', MBG_URL . '/assets/css/featherlight.css');
            wp_enqueue_script( 'ihe-popup-js', MBG_URL . '/assets/js/featherlight.js', array('jquery'));
            $popup_attrs = 'data-featherlight="image"';
        }
        ob_start(); ?>

        <div class="wcp-caption-plugin"
            ontouchstart=""
            style="
                border-width:<?php echo $border_width; ?>;
                border-style:<?php echo $border_type; ?>;
                border-color:<?php echo $border_color; ?>;
                border-radius:<?php echo $border_radius; ?>;
                box-shadow:<?php echo $shadow; ?>;
            ">
                <a <?php echo $popup_attrs; ?> href="<?php echo $link; ?>" target="<?php echo $link_target; ?>">
                    <div class="image-caption-box">
                        <div class="caption <?php echo $hover_style; ?>" style="
                            border-radius:<?php echo $border_radius; ?>;
                            background-color: <?php echo $overlay_color; ?>;
                            opacity: <?php echo ''; ?>;
                            transition-duration: <?php echo $transition_duration; ?>;
                            -webkit-transition-duration: <?php echo $animation_speed; ?>;
                        ">
                            <div style="display:table;height:100%;width: 100%;">
                                <p class="centered-text" style="
                                    color: <?php echo $title_color; ?>;
                                    font-size: <?php echo $font_size; ?>;
                                    font-family: <?php echo $font_family; ?>;
                                    text-align: <?php echo $alignment; ?>;
                                "><?php echo $title; ?></p>
                            </div>
                        </div>
                        <img class="wcp-caption-image"
                            style="transition-duration: <?php echo $transition_duration; ?>;border-radius:<?php echo $border_radius; ?>;"
                            src="<?php echo $image_url; ?>"
                            title="<?php echo $image_title; ?>"
                            alt="<?php echo $image_alt; ?>"/>
                    </div>
                </a>
        </div>

        <?php return ob_get_clean();
    }
}
?>