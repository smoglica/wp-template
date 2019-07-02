<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package wp-template
 */

define( 'THEME_ENV', getenv( 'WP_ENV' ) ?: 'production' );

define( 'THEME_VERSION', '1.0' );
define( 'THEME_SLUG', 'wp-template' );
define( 'THEME_DIR', get_template_directory() );
define( 'THEME_URL', get_template_directory_uri() );
define( 'THEME_TEXT_DOMAIN', THEME_SLUG );

define( 'THEME_JS_DIR', THEME_URL . '/js' );
define( 'THEME_CSS_DIR', THEME_URL . '/css' );
define( 'THEME_IMAGES_DIR', THEME_URL . '/assets/images' );

define( 'THEME_PLUGIN_DIR', THEME_DIR . '/includes/plugin' );
define( 'THEME_INCLUDES_DIR', THEME_DIR . '/includes' );
define( 'THEME_LANGUAGES_DIR', THEME_DIR . '/languages' );

if ( ! function_exists( 'wpt_setup' ) ) {
	/**
	 * Basic theme setup
	 *
	 * @return void
	 */
	function wpt_setup() {
		load_theme_textdomain( THEME_TEXT_DOMAIN, THEME_LANGUAGES_DIR );

		add_theme_support( 'menus' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-thumbnails' );

		add_theme_support(
			'html5',
			[
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			]
		);

		add_theme_support(
			'custom-background',
			apply_filters(
				'wpt_custom_background_args',
				[
					'default-color' => 'ffffff',
					'default-image' => '',
				]
			)
		);
	}
}
add_action( 'after_setup_theme', 'wpt_setup' );

/**
 * Enqueue scripts
 *
 * @return void
 */
if ( ! is_admin() ) {
	/**
	 * Enqueue scripts and styles.
	 *
	 * @return void
	 */
	function wpt_theme_enqueue_scripts() {
		wp_deregister_script( 'jquery' );

		wp_enqueue_script( 'main', THEME_JS_DIR . '/main.js', [], THEME_VERSION, true );

		if ( wpt_is_production() ) {
			wp_enqueue_style( 'main', THEME_CSS_DIR . '/main.css', [], THEME_VERSION, false );
		}
	}

	add_action( 'wp_enqueue_scripts', 'wpt_theme_enqueue_scripts' );
}

/**
 * Checks if the current environment is production
 *
 * @return boolean
 */
function wpt_is_production() {
	return ! empty( THEME_ENV ) && 'production' === THEME_ENV;
}

/**
 * Changes excerpt more string
 *
 * @param [String] $more more.
 * @return String
 */
function wpt_excerpt_more( $more ) {
	return '...';
}
add_filter( 'excerpt_more', 'wpt_excerpt_more' );

/**
 * Clean up the <head>
 *
 * @return void
 */
function wpt_remove_head_links() {
	remove_action( 'wp_head', 'rsd_link' ); // EditURI link!
	remove_action( 'wp_head', 'wlwmanifest_link' ); // Windows Live Writer!
	remove_action( 'wp_head', 'feed_links_extra', 3 ); // Category Feeds!
	remove_action( 'wp_head', 'feed_links', 2 ); // Post and Comment Feeds!
	remove_action( 'wp_head', 'index_rel_link' ); // Index link!
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // Previous link!
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 ); // Start link!
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 ); // Links for Adjacent Posts!
	remove_action( 'wp_head', 'wp_generator' ); // WP version!
	remove_action( 'wp_head', 'rest_output_link_wp_head', 10 ); // Disable REST API link tag!
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 ); // Disable oEmbed Discovery Links!
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); // Emoji script!

	remove_action( 'wp_print_styles', 'print_emoji_styles' ); // Emoji styles!
	remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 ); // Disable REST API link in HTTP headers!
}
add_action( 'init', 'wpt_remove_head_links' );

/**
 * Registration of the menus
 *
 * @return void
 */
function wpt_register_menus() {
	register_nav_menus(
		[
			'main-nav'      => 'Main Navigation',
			'secondary-nav' => 'Secondary Navigation',
			'sidebar-menu'  => 'Sidebar Menu',
		]
	);
}
add_action( 'init', 'wpt_register_menus' );

/**
 * Registration of the widgets
 *
 * @return void
 */
function wpt_register_widgets() {
	register_sidebar(
		[
			'name'          => __( 'Sidebar', 'wp-template' ),
			'id'            => 'main-sidebar',
			'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
			'after_widget'  => '</li>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		]
	);
}
add_action( 'widgets_init', 'wpt_register_widgets' );

/**
 * If you want to make sure only people who are logged in can see the site you can redirect
 * all unlogged in requests to the WordPress login page. Handy for keeping clients from nosing
 * around your development environment.
 *
 * @return void
 */
function wpt_password_protected() {
	if ( ! is_user_logged_in() && ( 'development' === THEME_ENV || 'staging' === THEME_ENV ) ) {
		wp_safe_redirect( get_option( 'siteurl' ) . '/wp-login.php' );
		exit;
	}
}
add_action( 'template_redirect', 'wpt_password_protected' );

/**
 * Allow SVG through wp media uploader
 *
 * @param [Array] $mimes mimes.
 * @return Array
 */
function wpt_cc_mime_types( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';

	return $mimes;
}
add_filter( 'upload_mimes', 'wpt_cc_mime_types' );
