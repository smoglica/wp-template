<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package <%= conf.get("themeDir") %>
 */
define('THEME_DIR', get_template_directory());
define('THEME_URL', get_template_directory_uri());
define('THEME_JS', get_template_directory_uri() . '/js');
define('THEME_CSS', get_template_directory_uri() . '/css');
define('THEME_IMAGES', get_template_directory_uri() . '/images');
define('THEME_PLUGIN_DIR', get_template_directory() . '/includes/plugin');
define('THEME_INCLUDES_DIR', get_template_directory() . '/includes');
define('THEME_LANGUAGES_DIR', get_template_directory() . '/languages');

/**
 * Basic theme setup
 *
 * @return void
 */
if (!function_exists('setup')) {
	function setup() {
		load_theme_textdomain('<%= conf.get("themeDir") %>', THEME_LANGUAGES_DIR);

		add_theme_support('menus');
		add_theme_support('automatic-feed-links');
		add_theme_support('post-thumbnails');

		add_theme_support('html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		));

		add_theme_support('custom-background', apply_filters('custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		)));
	}
}
add_action('after_setup_theme', 'setup');

/**
 * Enqueue scripts
 *
 * @return void
 */
if (!is_admin()) {
	function theme_enqueue_scripts() {
		wp_register_script('require', THEME_JS . '/vendor/requirejs/require.js', array(), false, true);
		wp_enqueue_script('require');
	
		if (is_production()) {
			wp_register_script('global', THEME_JS . '/optimized.min.js', array('require'), false, true);
			wp_enqueue_script('global');
		} else {
			wp_register_script('global', THEME_JS . '/global.js', array('require'), false, true);
			wp_register_script('livereload', '<%= conf.get("url") %>:35729/livereload.js?snipver=1', null, false, true);
	
			wp_enqueue_script('global');
			wp_enqueue_script('livereload');
		}
	
		wp_enqueue_style('global', THEME_CSS . '/global.css');
	}

	add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');
}

/**
 * Checks if the current environment is production
 *
 * @return boolean
 */
function is_production() {
	return empty(getenv('WP_ENV')) || getenv('WP_ENV') !== 'development';
}

/**
 * Changes excerpt more string
 *
 * @param [String] $more
 * @return void
 */
function excerpt_more($more) {
	return '...';
}
add_filter('excerpt_more', 'excerpt_more');

/**
 * Clean up the <head>
 *
 * @return void
 */
function removeHeadLinks() {
	remove_action('wp_head', 'rsd_link'); // EditURI link
	remove_action('wp_head', 'wlwmanifest_link'); // Windows Live Writer
	remove_action('wp_head', 'feed_links_extra', 3 ); // Category Feeds
	remove_action('wp_head', 'feed_links', 2 ); // Post and Comment Feeds
	remove_action('wp_head', 'index_rel_link' ); // Index link
	remove_action('wp_head', 'parent_post_rel_link', 10, 0 ); // Previous link
	remove_action('wp_head', 'start_post_rel_link', 10, 0 ); // Start link
	remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 ); // Links for Adjacent Posts
	remove_action('wp_head', 'wp_generator' ); // WP version
}
add_action('init', 'removeHeadLinks');

/**
 * Registration of the menus
 *
 * @return void
 */
function register_menus() {
	register_nav_menus(
		array(
			'main-nav' => 'Main Navigation',
			'secondary-nav' => 'Secondary Navigation',
			'sidebar-menu' => 'Sidebar Menu'
		)
	);
}
add_action( 'init', 'register_menus' );

/**
 * Registration of the widgets
 *
 * @return void
 */
function register_widgets() {
	register_sidebar( array(
		'name' => __( 'Sidebar' ),
		'id' => 'main-sidebar',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	));
}
add_action( 'widgets_init', 'register_widgets' );

/**
 * If you want to make sure only people who are logged in can see the site you can redirect
 * all unlogged in requests to the WordPress login page. Handy for keeping clients from nosing
 * around your development environment.
 *
 * @return void
 */
function password_protected() {
	if (!is_user_logged_in() && (ENVIRONMENT === 'development' || ENVIRONMENT == 'staging')) {
		wp_redirect(get_option('siteurl') .'/wp-login.php');
	}
}
add_action('template_redirect', 'password_protected');

/**
 * Allow SVG through wp media uploader
 *
 * @param [Array] $mimes
 * @return Array
 */
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';

	return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');