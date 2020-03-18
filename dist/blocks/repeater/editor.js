"use strict";

(function (wp) {
  var __ = wp.i18n.__;
  var _wp$element = wp.element,
      Fragment = _wp$element.Fragment,
      createElement = _wp$element.createElement;
  var _wp$blockEditor = wp.blockEditor,
      InspectorControls = _wp$blockEditor.InspectorControls,
      InnerBlocks = _wp$blockEditor.InnerBlocks;
  var _wp$components = wp.components,
      PanelBody = _wp$components.PanelBody,
      RangeControl = _wp$components.RangeControl; // this isn't strictly necessary but saves a lot of keystrokes below:

  var el = createElement;
  wp.blocks.registerBlockType('gutenberg-starter/repeater', {
    title: 'Block Repeater',
    icon: 'grid-view',
    category: 'common',
    attributes: {
      columns: {
        type: 'integer',
        default: 2
      }
    },
    supports: {
      html: false,
      anchor: true,
      align: ['wide', 'full']
    },
    edit: function edit(props) {
      var attributes = props.attributes,
          setAttributes = props.setAttributes;
      var blockStructure = el(Fragment, null, [el(InspectorControls, null, [// inside InspectorControls, you can have an array of panels
      el(PanelBody, {
        'title': __('Block Attribute Panel', 'gutenberg-starter')
      }, [// inside each PanelBody, you create control components
      // https://developer.wordpress.org/block-editor/components/
      el(RangeControl, {
        label: 'Columns',
        value: attributes.columns,
        min: 2,
        max: 4,
        onChange: function onChange(newValue) {
          setAttributes({
            columns: newValue
          });
        }
      }, null)])]), el('div', {
        className: 'wp-block-gutenberg-starter-repeater',
        'data-columns': attributes.columns
      }, [el(InnerBlocks, {
        className: 'wp-block-gutenberg-starter-repeater__inner',
        allowedBlocks: ['gutenberg-starter/simple'] // commented out because it's broken and i don't know why

        /*template: [
        	[ 'gutenberg-starter/simple', {} ],
        	[ 'gutenberg-starter/simple', {} ]
        ]*/

      })])]);
      return blockStructure;
    },
    save: function save(props) {
      var attributes = props.attributes;
      return el("div", {
        className: 'num-of-columns-' + (attributes.columns || 2),
        'data-columns': attributes.columns || 2
      }, el('div', {
        className: 'wp-block-gutenberg-starter-repeater__inner'
      }, el(wp.blockEditor.InnerBlocks.Content, null)));
    }
  });
})(window.wp);
//# sourceMappingURL=editor.js.map