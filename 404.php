<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package <%= conf.get("themePackageName") %>
 */

get_header();
?>

<div class="404">
	<h1>Error 404</h1>
	<?php get_search_form(); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
