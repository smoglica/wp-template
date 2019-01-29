<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package <%= conf.get("themePackageName") %>
 */

get_header();
?>

<div class="single">
	<?php get_template_part( 'loop', 'single' ); ?>
	<?php comments_template(); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
