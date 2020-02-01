<?php
/**
 * Perhaps more unneccessary object oriented bloat code, but I like it.
 */

namespace GutenbergStarter;

class SimpleBlock {

	public $Parsedown;

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
			'simple-block',
			$this->asset_uri . 'simple/frontend.css',
			array(),
			$this->block_version
		);

	}

	function register_block() {

		wp_register_script(
			'simple-block-editor',
			$this->asset_uri . 'simple/simple.js',
			array( 'wp-blocks', 'wp-editor', 'wp-components', 'wp-element', 'wp-i18n' ),
			$this->block_version
		);

		wp_register_style(
			'simple-block-editor',
			$this->asset_uri . 'simple/editor.css',
			array(),
			$this->block_version
		);

		register_block_type(
			'gutenberg-starter/simple-block',
			array(
				'render_callback' => array( $this, 'render_block' ),
				'editor_script'   => 'simple-block-editor',
				'editor_style'    => 'simple-block-editor',
			)
		);

	}

	function render_block( $attrs, $content ) {

		// render_callback isn't actually necessary, but if you need it, here it is!

		return $content;

	}


}

new SimpleBlock();