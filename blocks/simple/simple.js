( function( wp ) {

	const { __ }                                       = wp.i18n;
	const { Fragment, createElement }                  = wp.element;
	const { 
		InspectorControls,
		MediaUpload,
		RichText,
		InnerBlocks
	} = wp.blockEditor;
	const { PanelBody, RangeControl }        = wp.components;

	// this isn't strictly necessary but saves a lot of keystrokes below:
	const el = createElement;

	wp.blocks.registerBlockType( 'gutenberg-starter/simple-block', {
		title:    'Simple Block',
		icon:     'hammer',
		category: 'common',
		attributes: {
			imageCropHeight: {
				type:    'integer',
				default: 50
			},
			imageId: {
				type:    'integer',
				default: 0,
			},
			imageUrl: {
				type: 'string',
				default: ''
			},
			imageCaption: {
				type: 'string',
				source: 'text',
				selector: 'figcaption'
			}
		},
		supports: {
			html:   false,
			anchor: true,
			align:  false
		},

		edit: function ( props ) {

			const { attributes, setAttributes } = props;

			const { imageCropHeight, imageId, imageUrl, imageCaption } = attributes;

			const renderImage = function( renderProps ) {

				if ( imageId ) {

					return el(
						'img',
						{
							src: imageUrl,
							onClick: renderProps.open
						}
					);

				} else {

					return el(
						'button',
						{
							className: 'select-card-btn',
							onClick: renderProps.open,
						},
						__( 'Select Image', 'gutenberg-starter' )
					);

				}

			};

			if ( imageCropHeight < 25 || imageCropHeight > 200 ) {
				imageCropHeight = 50;
			}

			console.log( 'padding-top: ' + imageCropHeight + '%' );

			let blockStructure = el(
				/**
				 * This block has two components which must be wrapped in React's
				 * Fragment component. The first component defines the attribute
				 * panel (InspectorControls) and the second component defines the
				 * block editor itself.
				 */
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
											label: 'Image Crop Ratio (%)',
											value: imageCropHeight || 50,
											min: 25,
											max: 200,
											onChange: ( newValue ) => {
												setAttributes( { imageCropHeight: newValue } );
											}
										},
										null
									)
									// @todo : more advanced component examples will be added in a future version
								]
							),
						]
					),

					// here we start to define the block's DOM inside the editor, ...
					// div.wp-block-gutenberg-starter-simple
					// . div.wp-block-gutenberg-starter-simple__image
					// . . figure
					// . . . component: MediaUpload (Media library chooser)
					// . . . figcaption
					// . . . . component: RichText (content editor field)
					// . div.wp-block-gutenberg-starter-simple__content
					// . . component: InnerBlocks (a container for all blocks)
					el(
						'div',
						{ className: 'wp-block-gutenberg-starter-simple' },
						[
							el(
								'div',
								{ className: 'wp-block-gutenberg-starter-simple__image' },
								[
									el(
										'figure',
										{
											className: 'image-wrapper',
										},
										[
											el(
												MediaUpload,
												{
													className: 'imageSelector',
													value: attributes.imageId || null,
													allowedTypes: [ 'image' ],
													onSelect: function( media ) {

														props.setAttributes( {
															imageId: media.id,
															imageUrl: media.url
														} );

													},
													render: renderImage
												},
												null
											),
											el(
												RichText,
												{
													tagName: 'figcaption',
													placeholder: __( 'Write an image caption', 'gutenberg-starter' ),
													value: imageCaption || '',
													onChange: ( newValue ) => {
														setAttributes( { imageCaption: newValue } );
													}
												},
												null
											)
										]
									)
								]
							),
							el(
								'div',
								{ className: 'wp-block-gutenberg-starter-simple__content'},
								[ 
									el(
										InnerBlocks,
										null
									)
								]
							)
						]
					)
				]
			);

			return blockStructure;
		},

		save: function( props ) {

			const { attributes } = props;

			return createElement(
				"div",
				{
					className: 'wp-block-gutenberg-starter-simple',
				},
				attributes.content
			);

		}
	} );

}( window.wp ) );