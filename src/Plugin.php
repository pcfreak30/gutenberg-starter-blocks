<?php


namespace Gutenberg_Starter_Blocks;

use Gutenberg_Starter_Blocks\Core\Plugin as PluginBase;

/**
 * Class Plugin
 *
 * @package Gutenberg_Starter_Blocks
 * @property bool $use_node
 */
class Plugin extends PluginBase {

	/**
	 * Plugin version
	 */
	const VERSION = '0.1.0';

	/**
	 * Plugin slug name
	 */
	const PLUGIN_SLUG = 'gutenberg-starter-blocks';

	/**
	 * Plugin namespace
	 */
	const PLUGIN_NAMESPACE = '\Gutenberg_Starter_Blocks';

	/**
	 * Set this to `false` to never use the compiled JS & CSS, if you don't want to install Node
	 *
	 * @var boolean
	 */
	private $use_node = true;
	/**
	 * @var \Gutenberg_Starter_Blocks\Blocks
	 */
	private $blocks_manager;

	/**
	 * Plugin constructor.
	 *
	 * @param \Gutenberg_Starter_Blocks\Blocks $blocks_manager
	 */
	public function __construct( Blocks $blocks_manager ) {
		$this->blocks_manager = $blocks_manager;
		parent::__construct();
	}

	/**
	 * Plugin activation and upgrade
	 *
	 * @param $network_wide
	 *
	 * @return void
	 */
	public function activate( $network_wide ) {

	}

	/**
	 * Plugin de-activation
	 *
	 * @param $network_wide
	 *
	 * @return void
	 */
	public function deactivate( $network_wide ) {

	}

	/**
	 * Plugin uninstall
	 *
	 * @return void
	 */
	public function uninstall() {

	}

	/**
	 * @return \Gutenberg_Starter_Blocks\Blocks
	 */
	public function get_blocks_manager() {
		return $this->blocks_manager;
	}

	/**
	 * @return bool
	 */
	public function is_use_node() {
		return $this->use_node;
	}

	/**
	 * @param bool $use_node
	 */
	public function set_use_node( $use_node ) {
		$this->use_node = $use_node;
	}
}
