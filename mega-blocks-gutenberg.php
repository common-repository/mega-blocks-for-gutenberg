<?php
/**
 * Plugin Name: Mega Blocks for Gutenberg
 * Plugin URI: http://webcodingplace.com/mega-blocks-gutenberg
 * Description: A Collection of Beautifully Designed UI Blocks for Gutenberg and WordPress 5
 * Version: 1.0
 * Author: WebCodingPlace
 * Author URI: http://webcodingplace.com/
 * License: GNU General Public License version 3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: mega-blocks-gutenberg
 */

define('MBG_PATH', untrailingslashit(plugin_dir_path( __FILE__ )) );
define('MBG_URL', untrailingslashit(plugin_dir_url( __FILE__ )) );
define('MBG_VERSION', '1.0' );

require_once('plugin.class.php');


if( class_exists('Mega_Blocks_Gutenberg')){
	
	$mbg_init = new Mega_Blocks_Gutenberg;
}

?>