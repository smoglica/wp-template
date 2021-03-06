<?php
/**
 * The search form which will show the search results page.
 *
 * @package wp-template
 */

?>

<form action="<?php bloginfo( 'url' ); ?>" class="search-form">
	<div class="input-wrap search">
		<label for="input-s" class="screen-reader-text">Search for:</label>
		<input type="search" id="input-s" name="s" />
	</div>
	<div class="input-wrap submit">
		<input type="submit" value="Search" class="button" />
	</div>
</form>
