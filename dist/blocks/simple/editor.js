"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

(function (wp) {
  var __ = wp.i18n.__;
  var _wp$element = wp.element,
      Fragment = _wp$element.Fragment,
      createElement = _wp$element.createElement;
  var _wp$blockEditor = wp.blockEditor,
      InspectorControls = _wp$blockEditor.InspectorControls,
      BlockControls = _wp$blockEditor.BlockControls,
      MediaUpload = _wp$blockEditor.MediaUpload,
      RichText = _wp$blockEditor.RichText;
  var _wp$components = wp.components,
      Button = _wp$components.Button,
      IconButton = _wp$components.IconButton,
      PanelBody = _wp$components.PanelBody,
      RangeControl = _wp$components.RangeControl,
      ToggleControl = _wp$components.ToggleControl,
      Toolbar = _wp$components.Toolbar; // this isn't strictly necessary but saves a lot of keystrokes below:

  var el = createElement;
  wp.blocks.registerBlockType('gutenberg-starter/simple', {
    title: 'Simple Block',
    icon: 'hammer',
    category: 'common',
    attributes: {
      headerTitle: {
        type: 'string',
        source: 'html',
        selector: 'h3'
      },
      imageCropHeight: {
        type: 'integer',
        default: 50
      },
      imageDim: {
        type: 'integer',
        default: 50
      },
      imageIsDark: {
        type: 'boolean',
        default: false
      },
      imageId: {
        type: 'integer',
        default: 0
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
      }
    },
    supports: {
      html: false,
      anchor: true,
      align: false
    },
    edit: function edit(props) {
      var attributes = props.attributes,
          setAttributes = props.setAttributes;
      var imageCropHeight = attributes.imageCropHeight,
          imageId = attributes.imageId,
          imageUrl = attributes.imageUrl,
          imageCaption = attributes.imageCaption,
          imageDim = attributes.imageDim,
          imageIsDark = attributes.imageIsDark,
          headerTitle = attributes.headerTitle,
          blockContents = attributes.blockContents;

      var renderImage = function renderImage(renderProps) {
        if (imageId) {
          return el('img', {
            src: imageUrl,
            style: {
              'opacity': parseFloat(imageDim) / 100
            }
          });
        } else {
          return el(Button, {
            className: 'select-card-btn',
            onClick: renderProps.open
          }, __('Select Image', 'gutenberg-starter'));
        }
      };

      if (imageCropHeight < 25 || imageCropHeight > 200) {
        imageCropHeight = (_readOnlyError("imageCropHeight"), 50);
      }

      var imageSpacerStyle = {
        'padding-top': imageCropHeight + '%'
      };
      var headerComponentClass = 'wp-block-gutenberg-starter-simple__header';

      if (imageIsDark) {
        headerComponentClass += ' image-is-dark';
      }

      var onSelectMedia = function onSelectMedia(media) {
        props.setAttributes({
          imageId: media.id,
          imageUrl: media.url
        });
      };

      var blockStructure = el(
      /**
       * This block has two components which must be wrapped in React's
       * Fragment component. The first component defines the attribute
       * panel (InspectorControls) and the second component defines the
       * block editor itself.
       */
      Fragment, null, [el(BlockControls, null, el(Toolbar, {}, imageId ? el(MediaUpload, {
        value: imageId,
        allowedTypes: ['image'],
        onSelect: onSelectMedia,
        render: function render(renderProps) {
          return el(IconButton, {
            className: "components-toolbar__control",
            label: __('Edit media', 'gutenberg-starter'),
            icon: 'format-image',
            onClick: renderProps.open
          });
        }
      }) : null)), el(InspectorControls, null, [// inside InspectorControls, you can have an array of panels
      el(PanelBody, {
        'title': __('Block Attribute Panel', 'gutenberg-starter')
      }, [// inside each PanelBody, you create control components
      // https://developer.wordpress.org/block-editor/components/
      el(RangeControl, {
        label: 'Image Crop Ratio (%)',
        value: imageCropHeight || 50,
        min: 25,
        max: 200,
        onChange: function onChange(newValue) {
          setAttributes({
            imageCropHeight: newValue
          });
        }
      }, null), el(RangeControl, {
        label: 'Image Opacity (%)',
        value: imageDim || 50,
        min: 0,
        max: 100,
        onChange: function onChange(newValue) {
          setAttributes({
            imageDim: newValue
          });
        }
      }, null), el(ToggleControl, {
        label: 'Reverse Image Text Color',
        checked: imageIsDark,
        onChange: function onChange(checked) {
          setAttributes({
            imageIsDark: checked
          });
        }
      }, null)])]), // here we start to define the block's DOM inside the editor, ...
      // div.wp-block-gutenberg-starter-simple
      // . div.wp-block-gutenberg-starter-simple__image
      // . . h3: (Rich text content)
      // . . figure
      // . . . img: background image selected by MediaUpload component
      // . . . component: MediaUpload (Media library chooser)
      // . . . figcaption: RichText (content editor field)
      // . div.wp-block-gutenberg-starter-simple__content: RichText
      el('div', {
        className: 'wp-block-gutenberg-starter-simple'
      }, [el('header', {
        className: headerComponentClass
      }, [el(RichText, {
        tagName: 'h3',
        placeholder: __('Content header', 'gutenberg-starter'),
        value: headerTitle || '',
        onChange: function onChange(newValue) {
          setAttributes({
            headerTitle: newValue
          });
        }
      }, null), el('figure', {
        className: 'image-wrapper',
        style: imageSpacerStyle
      }, [el(MediaUpload, {
        className: 'imageSelector',
        value: imageId || null,
        allowedTypes: ['image'],
        onSelect: onSelectMedia,
        render: renderImage
      }, null), el(RichText, {
        tagName: 'figcaption',
        placeholder: __('Write an image caption', 'gutenberg-starter'),
        value: imageCaption || '',
        onChange: function onChange(newValue) {
          setAttributes({
            imageCaption: newValue
          });
        }
      }, null)])]), el(RichText, {
        tagname: 'div',
        placeholder: __('Type something', 'gutenberg-starter'),
        value: blockContents || '',
        className: 'wp-block-gutenberg-starter-simple__content',
        onChange: function onChange(newValue) {
          setAttributes({
            blockContents: newValue
          });
        }
      }, null)])]);
      return blockStructure;
    },
    save: function save(props) {
      var attributes = props.attributes;
      return el("div", null, [el("header", {
        className: 'wp-block-gutenberg-starter-simple__header' + (attributes.imageIsDark ? ' image-is-dark' : '')
      }, [el("h3", {}, attributes.headerTitle), el("figure", {
        className: 'image-wrapper',
        style: {
          'padding-top': attributes.imageCropHeight
        }
      }, [el("img", {
        src: attributes.imageUrl,
        style: {
          opacity: parseInt(attributes.imageDim) / 100
        }
      }), el("figcaption", {}, attributes.imageCaption)])]), el("div", {
        className: 'wp-block-gutenberg-starter-simple__content'
      }, attributes.blockContents)]);
    }
  });
})(window.wp);
//# sourceMappingURL=editor.js.map