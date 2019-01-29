<?php
/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package <%= conf.get("themePackageName") %>
 */

?>

<?php
if (
	! empty( sanitize_text_field( wp_unslash( $_SERVER['SCRIPT_FILENAME'] ) ) ) &&
	'comments.php' === basename( sanitize_text_field( wp_unslash( $_SERVER['SCRIPT_FILENAME'] ) ) )
	) {
	die( 'Please do not load this page directly. Thanks!' );
}
?>
<?php if ( post_password_required() ) : ?>
This post is password protected. Enter the password to view comments.
<?php endif; ?>

<?php if ( have_comments() ) : ?>
<h2 class="comments-header">
	<?php comments_number( 'No Responses', 'One Response', '% Responses' ); ?>
</h2>
<div class="comments-navigation">
	<div class="next-posts"><?php previous_comments_link(); ?></div>
	<div class="prev-posts"><?php next_comments_link(); ?></div>
</div>
<ol class="comment-list">
	<?php wp_list_comments(); ?>
</ol>
<div class="comments-navigation">
	<div class="next-posts"><?php previous_comments_link(); ?></div>
	<div class="prev-posts"><?php next_comments_link(); ?></div>
</div>
<?php else : // this is displayed if there are no comments so far! ?>
	<?php if ( comments_open() ) : ?>
	<p>No comments so far.</p>
	<?php else : // comments are closed! ?>
	<p>Comments are closed.</p>
	<?php endif; ?>
<?php endif; ?>

<?php if ( comments_open() ) : ?>
	<div class="comment-form-container">
		<h2 class="comment-form-title">
			<?php comment_form_title( 'Leave a Reply', 'Leave a Reply to %s' ); ?>
		</h2>
		<div class="cancel-comment_reply">
			<?php cancel_comment_reply_link(); ?>
		</div>
		<?php if ( esc_html( get_option( 'comment_registration' ) ) && ! is_user_logged_in() ) : ?>
			<p>You must be <a href="<?php print esc_url( wp_login_url( get_permalink() ) ); ?>">logged in</a> to post a comment.</p>
		<?php else : ?>
			<form action="<?php print esc_html( get_option( 'siteurl' ) ); ?>/wp-comments-post.php" method="post" class="comment-form">
				<?php if ( is_user_logged_in() ) : ?>
				<p>Logged in as <a href="<?php print esc_html( get_option( 'siteurl' ) ); ?>/wp-admin/profile.php"><?php print esc_html( $user_identity ); ?></a>.<a href="<?php echo esc_url( wp_logout_url( get_permalink() ) ); ?>" title="Log out of this account">Log out &raquo;</a></p>
				<?php else : ?>
				<div class="input-wrap text <?php echo ( $req ) ? 'required' : ''; ?>">
					<label for="input-author">Name</label>
					<input type="text" name="author" id="input-author" value="<?php echo esc_attr( $comment_author ); ?>"<?php echo ( $req ) ? ' aria-required="true"' : ''; ?> />
				</div>

				<div class="input-wrap text <?php echo ( $req ) ? 'required' : ''; ?>">
					<label for="input-email">Mail (will not be published)</label>
					<input type="text" name="email" id="input-email" value="<?php echo esc_attr( $comment_author_email ); ?>"<?php echo ( $req ) ? ' aria-required="true"' : ''; ?> />
				</div>

				<div class="input-wrap text <?php echo ( $req ) ? 'required' : ''; ?>">
					<label for="input-url">Website</label>
					<input type="text" name="url" id="input-url" value="<?php echo esc_attr( $comment_author_url ); ?>" />
				</div>
				<?php endif; ?>

				<div class="input-wrap textarea <?php echo ( $req ) ? 'required' : ''; ?>">
					<label for="input-comment">Message</label>
					<textarea name="comment" id="input-comment"></textarea>
					<p class="caption">You can use these tags: <code><?php echo allowed_tags(); ?></code></p>
				</div>
				<div class="input-wrap submit">
					<input class="button" type="submit" value="Submit Comment" />
					<?php comment_id_fields(); ?>
				</div>

				<?php do_action( 'wpt_template_comment_form', $post->ID ); ?>
			</form>
		<?php endif; ?>
	</div>
<?php endif; ?>
