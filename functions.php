<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package wp-template
 */
define('VERSION', '1.0');
define('WP_ENV', getenv('WP_ENV'));

$is_production = is_production();
$base_dir = $is_production ? '/dist' : '';

define('THEME_NAME', 'wp-template');
define('THEME_DIR', get_template_directory());
define('THEME_URL', get_template_directory_uri());

define('JS_DIR', THEME_URL . "${base_dir}/js");
define('CSS_DIR', THEME_URL . "${base_dir}/css");
define('IMAGES_DIR', THEME_URL . "${base_dir}/assets/images");

define('PLUGIN_DIR', THEME_DIR . '/includes/plugin');
define('INCLUDES_DIR', THEME_DIR . '/includes');
define('LANGUAGES_DIR', THEME_DIR . '/languages');

/**
 * Basic theme setup
 *
 * @return void
 */
if (!function_exists('setup')) {
  function setup() {
    load_theme_textdomain(THEME_NAME, THEME_LANGUAGES_DIR);

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
    wp_enqueue_script('main', JS_DIR . '/main.js', array(), VERSION, true);

    if ($is_production) {
      wp_enqueue_style('main', CSS_DIR . '/main.css', array(), VERSION, false);
    }
  }

  add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');
}

/**
 * Checks if the current environment is production
 *
 * @return boolean
 */
function is_production() {
  return !empty(WP_ENV) && WP_ENV !== 'development';
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
  remove_action('wp_head', 'feed_links_extra', 3); // Category Feeds
  remove_action('wp_head', 'feed_links', 2); // Post and Comment Feeds
  remove_action('wp_head', 'index_rel_link'); // Index link
  remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Previous link
  remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0); // Links for Adjacent Posts
  remove_action('wp_head', 'wp_generator'); // WP version
  remove_action('wp_head', 'rest_output_link_wp_head', 10); // Disable REST API link tag
  remove_action('wp_head', 'wp_oembed_add_discovery_links', 10); // Disable oEmbed Discovery Links
  remove_action('wp_head', 'print_emoji_detection_script', 7); // Emoji script

  remove_action('wp_print_styles', 'print_emoji_styles'); // Emoji styles
  remove_action('template_redirect', 'rest_output_link_header', 11, 0); // Disable REST API link in HTTP headers
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
    'name' => __('Sidebar'),
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
  if (!is_user_logged_in() && (WP_ENV === 'development' || WP_ENV == 'staging')) {
    wp_redirect(get_option('siteurl') . '/wp-login.php');
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
