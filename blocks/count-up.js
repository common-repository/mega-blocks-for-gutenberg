/**
 * Count Up for Gutenberg 
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
	var FontSizePicker = wp.editor.FontSizePicker;
	var PanelBody = wp.components.PanelBody;
	var ColorPalette = wp.components.ColorPalette;
	var SelectControl = wp.components.SelectControl;

	/**
	 * Count Up Block
	 * @return {null}       Rendered through PHP
	 */
	blocks.registerBlockType( 'mega-blocks-gutenberg/count-up', {
		title: __( 'Count Up' ),
		icon: 'dashboard',
		category: 'mega_blocks',
	    keywords: [
            __('counter'),
            __('increment'),
            __('number')
	    ],
	    description: __( 'Displays Number Counter' ),
		attributes: {
	        counter_content: {
	            type: 'string',
	            default: '1,734,195.10'
	        },
	        before_text: {
	            type: 'string',
	            default: '',
	        },
	        after_text: {
	            type: 'string',
	            default: '',
	        },
	        number_color: {
	            type: 'string',
	            default: '',
	        },
	        text_color: {
	            type: 'string',
	            default: '',
	        },
	        font_family: {
	            type: 'string',
	            default: '',
	        },
			alignment: {
				type: 'string',
				default: 'center'
			},
	        font_size: {
	            type: 'number',
	            default: '',
	        },
			delay: {
				type: 'number',
				default: '10'
			},
			time: {
				type: 'number',
				default: '1000'
			},
		},
	    edit: function(props) {

	        return [!!props.isSelected && el(
	                wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },
				    el( PanelBody, {
				        title: __( 'Settings' ),
				        initialOpen: true,
					    },
						el(
		                    TextControl, {
		                        label: __('Number'),
		                        help: __('Here you can use integers: 12345, floats: 0.1234, formatted numbers: 1,234,567.00'),
		                        value: props.attributes.counter_content,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                counter_content: value,
		                            });
		                        },
		                    }
	                    ),
						el(
		                    TextControl, {
		                        label: __('Before Text'),
		                        value: props.attributes.before_text,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                before_text: value,
		                            });
		                        },
		                    }
	                    ),
						el(
		                    TextControl, {
		                        label: __('After Text'),
		                        value: props.attributes.after_text,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                after_text: value,
		                            });
		                        },
		                    }
	                    ),
						el(
		                    TextControl, {
		                        label: __('Font Family'),
		                        value: props.attributes.font_family,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                font_family: value,
		                            });
		                        },
		                    }
	                    ),
	                    el(
	                        SelectControl, {
	                            options: [
	                            	{label: __('Center'), value: 'center'},
	                            	{label: __('Left'), value: 'left'},
	                            	{label: __('Right'), value: 'right'},
	                            	{label: __('Justify'), value: 'justify'},
	                            ],
	                            label: __('Alignment'),
	                            value: props.attributes.alignment,
	                            onChange: function(value) {
	                                props.setAttributes({
	                                    alignment: value
	                                });
	                            },
	                        }
	                    ),
						el(
		                    TextControl, {
		                        label: __('Delay'),
		                        help: __('The delay in milliseconds per number count up'),
		                        value: props.attributes.delay,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                delay: value,
		                            });
		                        },
		                    }
	                    ),
						el(
		                    TextControl, {
		                        label: __('Time'),
		                        help: __('The total duration of the count up animation'),
		                        value: props.attributes.time,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                time: value,
		                            });
		                        },
		                    }
	                    ),	                    
						el(
		                    FontSizePicker,
		                    {
		                        value: props.attributes.font_size,
		                        label: __('Font Size'),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                font_size: value,
		                            });
		                        },
		                    }
						),
		            ),
	                el(
	                    PanelColorSettings, {
	                        title: __( 'Colors' ),
	                        colorSettings: [{
		                        value: props.attributes.number_color,
	                        	label: __( 'Number Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                number_color: value
		                            })
		                        }
	                        },
	                        {
		                        value: props.attributes.text_color,
	                        	label: __( 'Text Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                text_color: value
		                            })
		                        }
	                        }]
	                    },
	                )
	            ),
	            el(
					'div',
					{ class: 'mbg-wrapper-counter', style: {textAlign: props.attributes.alignment}},
			        el('span', {className: 'counter-wrapper', style: {
			        		fontSize: props.attributes.font_size+'px',
			        		fontFamily: props.attributes.font_family,
			        	}},
			        	el('span', {className: 'counter-before', style: {
			        		color: props.attributes.text_color
			        	}}, 
			        		props.attributes.before_text
			        	),
			        	el('span', {className: 'main-counter', style: {
			        		color: props.attributes.number_color
			        	}}, 
			        		props.attributes.counter_content
			        	),
			        	el('span', {className: 'counter-after', style: {
			        		color: props.attributes.text_color
			        	}}, 
			        		props.attributes.after_text
			        	),
			        ),					
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