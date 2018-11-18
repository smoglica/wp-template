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
