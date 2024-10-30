/**
 * List Group Blocks for Gutenberg 
 *
 */
( function( blocks, i18n, element ) {
	var el = element.createElement;
	var __ = i18n.__;
    var Fragment = wp.element.Fragment
    var registerBlockType = wp.blocks.registerBlockType,
    RichText = wp.editor.RichText,
    BlockControls = wp.editor.BlockControls,
    InnerBlocks = wp.editor.InnerBlocks,
    FontSizePicker = wp.editor.FontSizePicker,
    AlignmentToolbar = wp.editor.AlignmentToolbar;
	var PanelColorSettings = wp.editor.PanelColorSettings;
	var PanelBody = wp.components.PanelBody;
	var ColorPalette = wp.components.ColorPalette;
	var SelectControl = wp.components.SelectControl;

	/**
	 * Alert Block
	 * @return {null}       Rendered through PHP
	 */
	blocks.registerBlockType( 'mega-blocks-gutenberg/panel', {
		title: __( 'Panel' ),
		icon: 'align-center',
		category: 'mega_blocks',
	    keywords: [
            __('card'),
            __('heading'),
            __('box')
	    ],
	    description: __( 'Displays panel' ),
		attributes: {
	        title: {
	            type: 'string',
	            default: 'Panel Title',
	        },
	        alignment: {
	            type: 'string',
	        },
	        style: {
	            type: 'string',
	            default: 'primary',
	        },
	        title_color: {
	            type: 'string',
	            default: '',
	        },
	        title_size: {
	            type: 'number',
	            default: '',
	        },
		},
	    edit: function(props) {
		    var color = props.attributes.text_color,
		    	bg_color = props.attributes.bg_color,
		        alignment = props.attributes.alignment;

		    function onChangeAlignment( newAlignment ) {
		        props.setAttributes( { alignment: newAlignment } );
		    }
		    function onChangeSize( newSize ) {
		        props.setAttributes( { title_size: newSize } );
		    }
	        return [!!props.isSelected && el(
	                wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },
				    el( PanelBody, {
				        title: __( 'Panel Styles' ),
				        initialOpen: true,
					    },
						el(
		                    TextControl, {
		                        label: __('Panel Title'),
		                        value: props.attributes.title,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                title: value,
		                            });
		                        },
		                    }
	                    ),					    
						el(
		                    SelectControl, {
		                        options: [
		                        	{label: __('Primary'), value: 'primary'},
		                        	{label: __('Secondary'), value: 'secondary'},
		                        	{label: __('Success'), value: 'success'},
		                        	{label: __('Danger'), value: 'danger'},
		                        	{label: __('Warning'), value: 'warning'},
		                        	{label: __('Info'), value: 'info'},
		                        	{label: __('Light'), value: 'light'},
		                        	{label: __('Dark'), value: 'dark'},
		                        ],
		                        label: __('Panel Background'),
		                        value: props.attributes.style,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                style: value,
		                            });
		                        },
		                    }
	                    ),
						el(
		                    AlignmentToolbar,
		                    {
		                        value: alignment,
		                        label: __('Alignment'),
		                        onChange: onChangeAlignment,
		                    }
						),
						el(
		                    FontSizePicker,
		                    {
		                        value: props.attributes.title_size,
		                        label: __('Title Font Size'),
		                        onChange: onChangeSize,
		                    }
						),

		            ),
	                el(
	                    PanelColorSettings, {
	                        title: __( 'Title Color' ),
	                        colorSettings: [{
		                        value: props.attributes.title_color,
	                        	label: __( 'Title Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                title_color: value
		                            })
		                        }
	                        }]
	                    },
	                ),
	            ),
	            el(
					'div',
					{ class: 'mbg-wrapper'},
			        el(
			            Fragment,
			            null,
			            null,
			            el(
			                'div',
			                {
			                    className: 'card bg-'+props.attributes.style,
			                    style: {textAlign: props.attributes.alignment}
			                },
				            el(
				                'div',
				                {
				                    className: 'card-header',
				                    style: {color: props.attributes.title_color, fontSize: props.attributes.title_size}
				                },
				                props.attributes.title
				            ),
				            el(
				                'div',
				                {
				                    className: 'card-body',
				                },
					            el(
					                InnerBlocks,
					                {
					                    allowedBlocks: [ 'core/button', 'mega-blocks-gutenberg/icon', 'core/paragraph', 'core/heading', 'mega-blocks-gutenberg/button' ],
					                }
					            )
				            ),
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