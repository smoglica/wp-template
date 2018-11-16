<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes() ?>><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8" <?php language_attributes() ?>><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9" <?php language_attributes() ?>><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" <?php language_attributes() ?>><!--<![endif]-->
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no">

    <link rel="manifest" href="<?php print THEME_URL . '/site.webmanifest'; ?>">
    <link rel="shortcut icon" href="<?php print THEME_URL . '/favicon.ico'; ?>">
    <link rel="apple-touch-icon" href="<?php print THEME_URL . '/icon.png'; ?>">

    <title><?php bloginfo('name'); wp_title('—'); ?></title>

    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <noscript>
      <strong>We're sorry but this website doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <header>
      <h1>
        <?php if (!is_front_page()): ?>
          <a href="<?php bloginfo('url'); ?>" title="<?php bloginfo('name'); ?> - <?php bloginfo('description'); ?>">
            <?php bloginfo('name'); ?>
          </a>
        <?php else: ?>
          <span>
            <?php bloginfo('name'); ?>
          </span>
        <?php endif; ?>
      </h1>
      <?php
        wp_nav_menu([
          'theme_location' => 'main-nav',
          'container' => 'nav',
          'container_id' => 'primary-nav'
        ]);
      ?>
    </header>
    <main>
