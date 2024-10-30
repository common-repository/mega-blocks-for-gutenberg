/**
 * Alerts Blocks for Gutenberg 
 *
 */
( function( blocks, i18n, element ) {
	var el = element.createElement;
	var __ = i18n.__;
    Fragment = wp.element.Fragment
    registerBlockType = wp.blocks.registerBlockType,
    RichText = wp.editor.RichText,
    BlockControls = wp.editor.BlockControls,
    AlignmentToolbar = wp.editor.AlignmentToolbar;
	var PanelColorSettings = wp.editor.PanelColorSettings;
	var PanelBody = wp.components.PanelBody;
	var ColorPalette = wp.components.ColorPalette;
	var SelectControl = wp.components.SelectControl;

	/**
	 * Alert Block
	 * @return {null}       Rendered through PHP
	 */
	blocks.registerBlockType( 'mega-blocks-gutenberg/alert', {
		title: __( 'Alert' ),
		icon: 'warning',
		category: 'mega_blocks',
	    keywords: [
            __('notification'),
            __('warning'),
            __('notice')
	    ],
	    description: __( 'Displays interactive alert' ),
		attributes: {
	        content: {
	            source: 'html',
	            default: 'Alert content is here, click to edit it.',
	        },
	        alignment: {
	            type: 'string',
	        },
	        style: {
	            type: 'string',
	            default: 'primary',
	        },
	        text_color: {
	            type: 'string',
	            default: '',
	        },
	        bg_color: {
	            type: 'string',
	            default: '',
	        },
		},
	    edit: function(props) {
		    var content = props.attributes.content,
		    	color = props.attributes.text_color,
		    	bg_color = props.attributes.bg_color,
		        alignment = props.attributes.alignment;

		    function onChangeContent( newContent ) {
		        props.setAttributes( { content: newContent } );
		    }

		    function onChangeAlignment( newAlignment ) {
		        props.setAttributes( { alignment: newAlignment } );
		    }	    	
	        return [!!props.isSelected && el(
	                wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },
				    el( PanelBody, {
				        title: __( 'Alert Style' ),
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
		                        	{label: __('Custom'), value: 'custom'},
		                        ],
		                        label: __('Alert Style'),
		                        value: props.attributes.style,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                style: value,
		                                text_color: '',
		                                bg_color: '',
		                            });
		                        },
		                    }
	                    ),
		            ),
		            [!! (props.attributes.style == 'custom') &&
	                el(
	                    PanelColorSettings, {
	                        title: __( 'Custom Colors' ),
	                        colorSettings: [{
		                        value: props.attributes.text_color,
	                        	label: __( 'Text Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                text_color: value
		                            })
		                        }
	                        },
	                        {
		                        value: props.attributes.bg_color,
	                        	label: __( 'Background Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                bg_color: value
		                            })
		                        }
	                        }]
	                    },
	                )],
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
			                RichText,
			                {
			                    key: 'editable',
			                    tagName: 'div',
			                    className: 'alert alert-'+props.attributes.style,
			                    style: { textAlign: alignment, 'background-color': bg_color, 'color': color },
			                    onChange: onChangeContent,
			                    value: content,
			                }
			            )
			        )					
				)
	        ];
	    },
		save: function(props) {
	        return el( RichText.Content, {
	            value: props.attributes.content
	        } );
		},
	});

} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);