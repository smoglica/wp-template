<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package wp-template
 */

?>

<aside class="sidebar">
	<ul>
		<?php if ( ! dynamic_sidebar( 'main-sidebar' ) ) : ?>
		<?php endif; ?>
	</ul>
</aside>
