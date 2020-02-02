( function( wp ) {

	const { __ }                                       = wp.i18n;
	const { Fragment, createElement }                  = wp.element;
	const {
		InspectorControls,
		InnerBlocks
	} = wp.blockEditor;
	const {
		PanelBody,
		RangeControl
	} = wp.components;

	// this isn't strictly necessary but saves a lot of keystrokes below:
	const el = createElement;

	wp.blocks.registerBlockType( 'gutenberg-starter/repeater', {
		title:    'Block Repeater',
		icon:     'grid-view',
		category: 'common',
		attributes: {
			columns: {
				type: 'integer',
				default: 2
			}
		},
		supports: {
			html:   false,
			anchor: true,
			align:  [ 'wide', 'full' ]
		},

		edit: function ( props ) {

			const { attributes, setAttributes } = props;

			let blockStructure = el(
				Fragment,
				null,
				[
					el(
						InspectorControls,
						null,
						[
							// inside InspectorControls, you can have an array of panels
							el(
								PanelBody,
								{
									'title': __( 'Block Attribute Panel', 'gutenberg-starter' ),
								},
								[
									// inside each PanelBody, you create control components
									// https://developer.wordpress.org/block-editor/components/
									el(
										RangeControl,
										{
											label: 'Columns',
											value: attributes.columns,
											min: 2,
											max: 4,
											onChange: ( newValue ) => {
												setAttributes( { columns: newValue } );
											}
										},
										null
									),
								]
							),
						]
					),
					el(
						'div',
						{ 
							className: 'wp-block-gutenberg-starter-repeater',
							'data-columns': attributes.columns
						},
						[
							el( 
								InnerBlocks,
								{
									className: 'wp-block-gutenberg-starter-repeater__inner',
									allowedBlocks: [ 'gutenberg-starter/simple' ],
									
									// commented out because it's broken and i don't know why
									/*template: [
										[ 'gutenberg-starter/simple', {} ],
										[ 'gutenberg-starter/simple', {} ]
									]*/
								}
							)
						]
					)
				]
			);

			return blockStructure;
		},

		save: function( props ) {

			const { attributes } = props;

			return el(
				"div",
				{
					className: 'num-of-columns-' + ( attributes.columns || 2 ),
					'data-columns': ( attributes.columns || 2 ),
				},
				el(
					'div',
					{
						className: 'wp-block-gutenberg-starter-repeater__inner',
					},
					el( wp.blockEditor.InnerBlocks.Content, null )
				)
			);

		}
	} );

}( window.wp ) );