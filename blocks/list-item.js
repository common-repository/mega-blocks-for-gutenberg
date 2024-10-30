/**
 * List Item Blocks for Gutenberg 
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
	var CheckboxControl = wp.components.CheckboxControl;


	/**
	 * Alert Block
	 * @return {null}       Rendered through PHP
	 */
	blocks.registerBlockType( 'mega-blocks-gutenberg/list-item', {
		title: __( 'List Item' ),
		icon: 'list-view',
		category: 'mega_blocks',
	    keywords: [
            __('items'),
            __('ul'),
            __('listing')
	    ],
	    parent: [ 'mega-blocks-gutenberg/list-group' ],
	    description: __( 'Displays single list item' ),
		attributes: {
	        text: {
	            type: 'string',
	            default: 'List Item Text',
	        },
	        alignment: {
	            type: 'string',
	        },
	        style: {
	            type: 'string',
	            default: 'primary',
	        },
	        active: {
	            type: 'boolean',
	            default: false,
	        },
		},
	    edit: function(props) {
		    var alignment = props.attributes.alignment;
		    var style = props.attributes.style;
		    var active_class = '';
		    if (props.attributes.active) {
		    	active_class = 'active';
		    }

		    function onChangeAlignment( newAlignment ) {
		        props.setAttributes( { alignment: newAlignment } );
		    }	    	
	        return [!!props.isSelected && el(
	                wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },
				    el( PanelBody, {
				        title: __( 'List Item Style' ),
				        initialOpen: true,
					    },
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
		                        label: __('List Item Style'),
		                        value: props.attributes.style,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                style: value,
		                            });
		                        },
		                    }
	                    ),
						el(
		                    TextControl, {
		                        label: __('Inner Text'),
		                        value: props.attributes.text,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                text: value,
		                            });
		                        },
		                    }
	                    ),
		            ),
					el(
	                    CheckboxControl, {
	                        label: __('Active'),
	                        checked: props.attributes.active,
	                        onChange: function(value) {
	                            props.setAttributes({
	                                active: value,
	                            });
	                        },
	                    }
                    ),
	            ),
	            el(
					'div',
					{ class: 'mbg-wrapper'},
			        el(
			            Fragment,
			            null,
			            el(
			                BlockControls,
			                null,
			                el(
			                    AlignmentToolbar,
			                    {
			                        value: alignment,
			                        onChange: onChangeAlignment,
			                    }
			                )
			            ),
			            el(
			                'li',
			                {
			                    className: 'list-group-item list-group-item-'+style+' '+active_class,
			                    style: {textAlign: alignment}
			                },
			                props.attributes.text,
			            ),
			        )					
				)
	        ];
	    },
		save: function(props) {
	        return null;
		},
	});

} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);