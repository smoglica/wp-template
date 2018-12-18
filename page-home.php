<?php
/**
 * Template Name: Home
 *
 * The template for displaying the home page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package wp-template
 */

get_header();
?>

<div class="page-home">
	<?php get_template_part( 'loop', 'home' ); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
