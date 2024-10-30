/**
 * List Group Blocks for Gutenberg 
 *
 */
( function( blocks, i18n, element ) {
	var el = element.createElement;
	var __ = i18n.__;
    Fragment = wp.element.Fragment
    registerBlockType = wp.blocks.registerBlockType,
    RichText = wp.editor.RichText,
    BlockControls = wp.editor.BlockControls,
    InnerBlocks = wp.editor.InnerBlocks,
    AlignmentToolbar = wp.editor.AlignmentToolbar;
	var PanelBody = wp.components.PanelBody;
	var ColorPalette = wp.components.ColorPalette;
	var SelectControl = wp.components.SelectControl;

	/**
	 * Alert Block
	 * @return {null}       Rendered through PHP
	 */
	blocks.registerBlockType( 'mega-blocks-gutenberg/list-group', {
		title: __( 'List Group' ),
		icon: 'list-view',
		category: 'mega_blocks',
	    keywords: [
            __('items'),
            __('ul'),
            __('listing')
	    ],
	    description: __( 'Displays list group' ),
	    edit: function(props) {   	
	        return [!!props.isSelected && el(
	                wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },  
	            ),
	            el(
					'div',
					{ class: 'mbg-wrapper'},
			        el(
			            Fragment,
			            null,
			            null,
			            el(
			                'ul',
			                {className: 'list-group'},
				            el(
				                InnerBlocks,
				                {
				                    allowedBlocks: [ 'mega-blocks-gutenberg/list-item' ],
				                }
				            )
			            ),
			        )					
				)
	        ];
	    },
		save: function(props) {
	        return el( InnerBlocks.Content );
		},
	});

} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);