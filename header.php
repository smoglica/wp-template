<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package wp-template
 */

?>

<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); ?>><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8" <?php language_attributes(); ?>><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9" <?php language_attributes(); ?>><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" <?php language_attributes(); ?>><!--<![endif]-->
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no">

		<link rel="manifest" href="<?php print esc_html( THEME_URL . '/site.webmanifest' ); ?>">
		<link rel="shortcut icon" href="<?php print esc_html( THEME_URL . '/favicon.ico' ); ?>">
		<link rel="apple-touch-icon" href="<?php print esc_html( THEME_URL . '/icon.png' ); ?>">

		<title>
		<?php
		bloginfo( 'name' );
		wp_title( '—' );
		?>
		</title>

		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<noscript>
			<strong>
				<?php esc_html_e( 'We\'re sorry but this website doesn\'t work properly without JavaScript enabled. Please enable it to continue.', 'wp-template' ); ?>
			</strong>
		</noscript>
		<?php get_template_part( 'template-parts/navbar' ); ?>
		<main>
