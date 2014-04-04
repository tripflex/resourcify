<?php
/**
 * @package   Resourcify
 * @author    Myles McNamara <myles@hostt.net>
 * @license   GPL-2.0+
 * @link      http://smyl.es
 * @copyright 2014 Myles McNamara
 *
 * @wordpress-plugin
 * Plugin Name: Resourcify
 * Plugin URI:  https://github.com/tripflex/resourcify
 * Description: Resourcify is a Wordpress Plugin that will allow you to add Sources, Resources, and Quote Sources to a post.
 * Version:     1.2
 * Author:      Myles McNamara
 * Author URI:  http://smyl.es
 * Text Domain: resourcify
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once( plugin_dir_path( __FILE__ ) . 'class-resourcify.php' );


// Register hooks that are fired when the plugin is activated or deactivated.
// When the plugin is deleted, the uninstall.php file is loaded.
register_activation_hook( __FILE__, array( 'Resourcify', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'Resourcify', 'deactivate' ) );

// Load instance
add_action( 'plugins_loaded', array( 'Resourcify', 'get_instance' ) );
//Resourcify::get_instance();
?>