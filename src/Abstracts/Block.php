<?php


namespace Gutenberg_Starter_Blocks\Abstracts;


use Gutenberg_Starter_Blocks\Core\Component;

/**
 * Class Block
 *
 * @package Gutenberg_Starter_Blocks\Abstracts
 * @property \Gutenberg_Starter_Blocks\Plugin $plugin
 */
abstract class Block extends Component {

	const NAME = '';

	/**
	 * @return bool|void
	 */
	public function setup() {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend' ), 9 );
	}

	/**
	 *
	 */
	function enqueue_frontend() {
		$name         = static::NAME;
		$asset_folder = $this->plugin->use_node ? 'dist' : 'blocks';
		$path         = "{$asset_folder}/blocks/{$asset_folder}/frontend.css";
		if ( $this->plugin->wp_filesystem->is_file( $this->plugin->get_asset_path( $path ) ) ) {
			wp_enqueue_style(
				"{$this->plugin->safe_slug}-block-{$name}",
				$this->plugin->get_asset_url( $path ),
				$this->plugin->version
			);
		}
	}

	/**
	 *
	 */
	function register_block() {
		$name          = static::NAME;
		$asset_folder  = $this->plugin->use_node ? 'dist' : 'blocks';
		$editor_handle = "{$this->plugin->safe_slug}-{$name}-block-editor";

		wp_register_script(
			$editor_handle,
			$this->plugin->get_asset_url( "{$asset_folder}/blocks/{$name}/editor.js" ),
			[ 'wp-blocks', 'wp-editor', 'wp-components', 'wp-element', 'wp-i18n' ],
			$this->plugin->version
		);

		wp_register_style(
			$editor_handle,
			$this->plugin->get_asset_url( "{$asset_folder}/blocks/{$name}/editor.css" ),
			[],
			$this->plugin->version
		);
		register_block_type(
			"{$this->plugin->slug}/{$name}",
			[
				'editor_script' => $editor_handle,
				'editor_style'  => $editor_handle,
			]
		);
	}

}
