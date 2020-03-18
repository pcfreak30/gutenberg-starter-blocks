<?php

/*
 * Plugin Name: Gutenberg Starter Blocks
 * Version: 0.1.0
 * Text Domain:     gutenberg-starter-blocks
 * Domain Path:     /languages
*/

use ComposePress\Dice\Dice;


/**
 * Singleton instance function. We will not use a global at all as that defeats the purpose of a singleton and is a bad design overall
 *
 * @SuppressWarnings(PHPMD.StaticAccess)
 * @return Gutenberg_Starter_Blocks\Plugin
 */
function gutenberg_starter_blocks() {
	return gutenberg_starter_blocks_container()->create( '\Gutenberg_Starter_Blocks\Plugin' );
}

/**
 * This container singleton enables you to setup unit testing by passing an environment file to map classes in Dice
 *
 * @param string $env
 *
 * @return \ComposePress\Dice\Dice
 */
function gutenberg_starter_blocks_container( $env = 'prod' ) {
	static $container;
	if ( empty( $container ) ) {
		$container = new Dice();
		include __DIR__ . "/config_{$env}.php";
	}

	return $container;
}

/**
 * Init function shortcut
 */
function gutenberg_starter_blocks_init() {
	gutenberg_starter_blocks()->init();
}

/**
 * Activate function shortcut
 */
function gutenberg_starter_blocks_activate( $network_wide ) {
	register_uninstall_hook( __FILE__, 'gutenberg_starter_blocks_uninstall' );
	gutenberg_starter_blocks()->init();
	gutenberg_starter_blocks()->activate( $network_wide );
}

/**
 * Deactivate function shortcut
 */
function gutenberg_starter_blocks_deactivate( $network_wide ) {
	gutenberg_starter_blocks()->deactivate( $network_wide );
}

/**
 * Uninstall function shortcut
 */
function gutenberg_starter_blocks_uninstall() {
	gutenberg_starter_blocks()->uninstall();
}

/**
 * Error for older php
 */
function gutenberg_starter_blocks_php_upgrade_notice() {
	$info = get_plugin_data( __FILE__ );
	_e(
		sprintf(
			'
	<div class="error notice">
		<p>Opps! %s requires a minimum PHP version of 7.1.0. Your current version is: %s. Please contact your host/developer to upgrade.</p>
	</div>', $info['Name'], $GLOBALS['wp_version']
		)
	);
}

/**
 * Error for older wp
 */
function gutenberg_starter_blocks_wp_upgrade_notice() {
	$info = get_plugin_data( __FILE__ );
	_e(
		sprintf(
			'
	<div class="error notice">
		<p>Opps! %s requires a minimum Wordpress version of 5.2.0. Your current version is: %s. Please contact your host to upgrade.</p>
	</div>', $info['Name'], PHP_VERSION
		)
	);
}

/**
 * Error if vendors autoload is missing
 */
function gutenberg_starter_blocks_php_vendor_missing() {
	$info = get_plugin_data( __FILE__ );
	_e(
		sprintf(
			'
	<div class="error notice">
		<p>Opps! %s is corrupted it seems, please re-install the plugin.</p>
	</div>', $info['Name']
		)
	);
}

/*
 * We want to use a fairly modern php version, and minimum wp version for gutenberg, feel free to increase the minimum requirement
 */

$php_version = version_compare( PHP_VERSION, '7.1.0' ) < 0;
$wp_version  = function_exists( 'register_block_type' ) && version_compare( $GLOBALS['wp_version'], '5.2.0', '>=' );

if ( ! $php_version ) {
	add_action( 'admin_notices', 'gutenberg_starter_blocks_php_upgrade_notice' );
}
if ( ! $wp_version ) {
	add_action( 'admin_notices', 'gutenberg_starter_blocks_wp_upgrade_notice' );
}
if ( $php_version && $wp_version ) {
	if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
		include_once __DIR__ . '/vendor/autoload.php';
		add_action( 'plugins_loaded', 'gutenberg_starter_blocks_init', 11 );
		register_activation_hook( __FILE__, 'gutenberg_starter_blocks_activate' );
		register_deactivation_hook( __FILE__, 'gutenberg_starter_blocks_deactivate' );
	} else {
		add_action( 'admin_notices', 'gutenberg_starter_blocks_php_vendor_missing' );
	}
}
