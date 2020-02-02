<?php
/**
 * Perhaps more unneccessary object oriented bloat code, but I like it.
 */

namespace GutenbergStarter;

class RepeaterBlock {

	private $block_version;
	private $editor_script;

	function __construct() {

		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend' ), 9 );

		// if you take this class out of the plugin, you will need to
		// replace the following line with something else:
		$this->block_version = Plugin::$build_version;

		// similarly, just set this to plugins_url( __FILE__ ) or something if
		// you are not using the starter Plugin class
		$this->asset_uri = Plugin::js_uri();

	}

	function enqueue_frontend() {

		wp_enqueue_style(
			'repeater-block',
			$this->asset_uri . 'repeater/frontend.css',
			array(),
			$this->block_version
		);

	}

	function register_block() {

		wp_register_script(
			'repeater-block-editor',
			$this->asset_uri . 'repeater/editor.js',
			array( 'wp-blocks', 'wp-editor', 'wp-components', 'wp-element', 'wp-i18n' ),
			$this->block_version
		);

		wp_register_style(
			'repeater-block-editor',
			$this->asset_uri . 'repeater/editor.css',
			array(),
			$this->block_version
		);

		register_block_type(
			'gutenberg-starter/repeater',
			array(
				'editor_script'   => 'repeater-block-editor',
				'editor_style'    => 'repeater-block-editor',
			)
		);

	}

}

new RepeaterBlock();