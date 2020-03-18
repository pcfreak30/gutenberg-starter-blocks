<?php


namespace Gutenberg_Starter_Blocks;


use Gutenberg_Starter_Blocks\Core\Manager;

class Blocks extends Manager {
	const MODULE_NAMESPACE = '\Gutenberg_Starter_Blocks\Blocks';

	protected $modules = [
		'Simple',
		'Repeater',
	];
}
