<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package wp-template
 */

get_header();
?>

<div class="page">
	<?php get_template_part( 'loop', 'page' ); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
