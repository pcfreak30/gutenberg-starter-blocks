( function( wp ) {

	const { __ }                                       = wp.i18n;
	const { Fragment, createElement }                  = wp.element;
	const {
		InspectorControls,
		BlockControls,
		MediaUpload,
		RichText,
	} = wp.blockEditor;
	const {
		Button,
		IconButton,
		PanelBody,
		RangeControl,
		ToggleControl,
		Toolbar
	} = wp.components;

	// this isn't strictly necessary but saves a lot of keystrokes below:
	const el = createElement;

	wp.blocks.registerBlockType( 'gutenberg-starter/simple', {
		title:    'Simple Block',
		icon:     'hammer',
		category: 'common',
		attributes: {
			headerTitle: {
				type: 'string',
				source: 'html',
				selector: 'h3'
			},
			imageCropHeight: {
				type:    'integer',
				default: 50
			},
			imageDim: {
				type:    'integer',
				default: 50
			},
			imageIsDark: {
				type:    'boolean',
				default: false
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
				source: 'html',
				selector: 'figcaption'
			},
			blockContents: {
				type: 'string',
				source: 'html',
				selector: '.wp-block-gutenberg-starter-simple__content'
			},
		},
		supports: {
			html:   false,
			anchor: true,
			align:  false
		},

		edit: function ( props ) {

			const { attributes, setAttributes } = props;

			const { imageCropHeight, imageId, imageUrl, imageCaption, imageDim, imageIsDark, headerTitle, blockContents } = attributes;

			const renderImage = function( renderProps ) {

				if ( imageId ) {

					return el(
						'img',
						{
							src: imageUrl,
							style: {
								'opacity': parseFloat( imageDim ) / 100
							}
						}
					);

				} else {

					return el(
						Button,
						{
							className: 'select-card-btn',
							onClick: renderProps.open,
						},
						__( 'Select Image', 'gutenberg-starter' )
					)
				
				}

			};

			if ( imageCropHeight < 25 || imageCropHeight > 200 ) {
				imageCropHeight = 50;
			}

			let imageSpacerStyle = {
				'padding-top': imageCropHeight + '%'
			};

			let headerComponentClass = 'wp-block-gutenberg-starter-simple__header';
			if ( imageIsDark ) {
				headerComponentClass += ' image-is-dark';
			}

			const onSelectMedia = function( media ) {

				props.setAttributes( {
					imageId: media.id,
					imageUrl: media.url
				} );

			}

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
						BlockControls,
						null,
						el( 
							Toolbar,
							{},
							imageId ? el(
								MediaUpload,
								{
									value: imageId,
									allowedTypes: [ 'image' ],
									onSelect: onSelectMedia,
									render: ( renderProps ) => {
										return el(
											IconButton,
											{
												className: "components-toolbar__control",
												label: __( 'Edit media', 'gutenberg-starter' ),
												icon: 'format-image',
												onClick: renderProps.open
											}
										);
									}
								}
							): null
						) 
					),
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
									),
									el(
										RangeControl,
										{
											label: 'Image Opacity (%)',
											value: imageDim || 50,
											min: 0,
											max: 100,
											onChange: ( newValue ) => {
												setAttributes( { imageDim: newValue } );
											}
										},
										null
									),
									el(
										ToggleControl,
										{
											label: 'Reverse Image Text Color',
											checked: imageIsDark,
											onChange: ( checked ) => { setAttributes( { imageIsDark: checked } ) }
										},
										null
									)
								]
							),
						]
					),

					// here we start to define the block's DOM inside the editor, ...
					// div.wp-block-gutenberg-starter-simple
					// . div.wp-block-gutenberg-starter-simple__image
					// . . h3: (Rich text content)
					// . . figure
					// . . . img: background image selected by MediaUpload component
					// . . . component: MediaUpload (Media library chooser)
					// . . . figcaption: RichText (content editor field)
					// . div.wp-block-gutenberg-starter-simple__content: RichText
					el(
						'div',
						{ className: 'wp-block-gutenberg-starter-simple' },
						[
							el(
								'header',
								{ className: headerComponentClass },
								[
									el(
										RichText,
										{
											tagName: 'h3',
											placeholder: __( 'Content header', 'gutenberg-starter' ),
											value: headerTitle || '',
											onChange: ( newValue ) => {
												setAttributes( { headerTitle: newValue } );
											}
										},
										null
									),
									el(
										'figure',
										{
											className: 'image-wrapper',
											style: imageSpacerStyle,
										},
										[
											el(
												MediaUpload,
												{
													className: 'imageSelector',
													value: imageId || null,
													allowedTypes: [ 'image' ],
													onSelect: onSelectMedia,
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
								RichText,
								{
									tagname: 'div',
									placeholder: __( 'Type something', 'gutenberg-starter' ),
									value: blockContents || '',
									className: 'wp-block-gutenberg-starter-simple__content',
									onChange: ( newValue ) => {
										setAttributes( { blockContents: newValue } );
									}
								},
								null
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
				null,
				[
					el(
						"header",
						{ className: 'wp-block-gutenberg-starter-simple__header' + ( attributes.imageIsDark ? ' image-is-dark' : '' ) },
						[
							el(
								"h3",
								{},
								attributes.headerTitle
							),
							el(
								"figure",
								{
									className: 'image-wrapper',
									style: {
										'padding-top': attributes.imageCropHeight
									}
								}, [
									el(
										"img",
										{
											src: attributes.imageUrl,
											style: { opacity: parseInt( attributes.imageDim ) / 100 }
										}
									),
									el(
										"figcaption",
										{},
										attributes.imageCaption
									),
								]
							)
						]
					),
					el(
						"div",
						{ className: 'wp-block-gutenberg-starter-simple__content' },
						attributes.blockContents
					)
				]
			);

		}
	} );

}( window.wp ) );