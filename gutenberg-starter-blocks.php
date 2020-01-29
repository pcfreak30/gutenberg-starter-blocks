<?php
/**
 * Plugin Name: Gutenberg Starter Blocks
 * Description: Some sample blocks to help you learn how to develop Gutenberg blocks
 * Version: 1.0
 * Author: Paul Houser
 * Author URI: https://plaidpowered.com/custom-development
 * Domain: gutenberg-starter
 *
 * @package GutenbergStarter
 */


class Plugin {

	/**
	 * Used for cache busting JS and CSS.
	 *
	 * @var string
	 */
	public static $build_version = null;

	/**
	 * Contents of package.json after class is instantiated.
	 *
	 * @var array
	 */
	private $package = null;

	/**
	 * Set this to `false` to never use the transpiled version, if you don't want to install Node
	 * 
	 * @var boolean
	 */
	public $js_compatibility = true;

	public function __construct() {

		add_action( 'admin_notices', array( $this, 'requirement_notices' ) );

		if ( ! $this->is_php_version_safe() || ! $this->is_wordpress_safe() ) {
			return;
		}

		$this->setup_package_info();


	}

	/**
	 * Checks to ensure the server PHP version is compatible with this plugin
	 */
	public function is_php_version_safe() {
		return version_compare( PHP_VERSION, '7.1.0', '>=' );
	}

	/**
	 * Checks to ensure WordPress is Gutenberg compatible
	 */
	public function is_wordpress_safe() {
		global $wp_version;
		return function_exists( 'register_block_type' ) && version_compare( $wp_version, '5.2.0', '>=' );
	}

	/**
	 * Outputs warnings to admin screen if plugin initialization failed.
	 */
	public function requirement_notices() {

		$message = '';

		if ( ! $this->is_php_version_safe() ) {
			$messages .= '<li>' . esc_html( __( 'PHP must be running on version 7.1 or above to use this plugin.', 'gutenberg-starter' ) ) . '</li>';
		}

		if ( ! $this->is_wordpress_safe() ) {
			$messages .= '<li>' . esc_html( __( 'This plugin requires WordPress 5.2 or above', 'gutenberg-starter' ) ) . '</li>';
		}

		if ( empty( $messages ) ) {
			return;
		}

		echo '<div class="notice notice-error">';
		echo '<p>' . esc_html( __( 'The Gutenberg Starter Blocks plugin is active but not functioning!', 'gutenberg-starter' ) ) . '</p>';
		echo '<ul>';
		echo $messages;
		echo '</ul></div>';

	}

	/**
	 * Loads package.json from plugin root and sets up private variables
	 */
	private function setup_package_info() {

		if ( ! file_exists( __DIR__ . '/package.json' ) ) {
			return;
		}

		$packagefile = file_get_contents( __DIR__ . '/package.json' );
		if ( empty( $packagefile ) ) {
			return;
		}

		$this->package = json_decode( $packagefile );
		if ( empty( $this->package ) ) {
			return;
		}

		if ( isset( $this->package->version ) ) {
			self::$build_version = $this->package->version;
		}

	}


}

new Plugin();