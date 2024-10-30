/**
 * Button Blocks for Gutenberg 
 *
 */
( function( blocks, i18n, element ) {
	var el = element.createElement;
	var __ = i18n.__;
    Fragment = wp.element.Fragment
    registerBlockType = wp.blocks.registerBlockType,
    RichText = wp.editor.RichText,
    BlockControls = wp.editor.BlockControls,
    TextControl = wp.components.TextControl,
    AlignmentToolbar = wp.editor.AlignmentToolbar;
	var PanelBody = wp.components.PanelBody;
	var ColorPalette = wp.components.ColorPalette;
	var SelectControl = wp.components.SelectControl;
	var CheckboxControl = wp.components.CheckboxControl;

	var blockColors = [
		{ name: 'Blue', color: '#007bff' },
		{ name: 'Indigo', color: '#6610f2' },
		{ name: 'Purple', color: '#6f42c1' },
		{ name: 'Pink', color: '#e83e8c' },
		{ name: 'Red', color: '#dc3545' },
		{ name: 'Orange', color: '#fd7e14' },
		{ name: 'Yellow', color: '#ffc107' },
		{ name: 'Green', color: '#28a745' },
		{ name: 'Teal', color: '#20c997' },
		{ name: 'Cyan', color: '#17a2b8' },
		{ name: 'White', color: '#fff' },
		{ name: 'Gray', color: '#6c757d' },
		{ name: 'Gray Dark', color: '#343a40' },
	];


	/**
	 * Alert Block
	 * @return {null}       Rendered through PHP
	 */
	blocks.registerBlockType( 'mega-blocks-gutenberg/button', {
		title: __( 'Button' ),
		icon: 'admin-links',
		category: 'mega_blocks',
	    keywords: [
            __('link'),
            __('btn'),
            __('href')
	    ],
	    description: __( 'Displays interactive button' ),
		attributes: {
	        label: {
	            type: 'text',
	            default: 'Add text...',
	        },
	        alignment: {
	            type: 'string',
	        },
	        url: {
	            type: 'string',
	        },
	        link_target: {
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
	        outline: {
	            type: 'boolean',
	            default: false,
	        },
	        block: {
	            type: 'boolean',
	            default: false,
	        },
	        size: {
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
		    var button_style_class = 	props.attributes.style;
		    var block_class = 	'';
		    if (props.attributes.outline) {
		    	button_style_class = 'outline-'+button_style_class;
		    }
		    if (props.attributes.block) {
		    	block_class = 'btn-block';
		    }
	        return [!!props.isSelected && el(
	                wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },
				    el( PanelBody, {
				        title: __( 'Customize Button' ),
				        initialOpen: true,
					    },
						el(
		                    TextControl, {
		                        label: __('Button Text'),
		                        value: props.attributes.label,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                label: value,
		                            });
		                        },
		                    }
	                    ),
						el(
		                    TextControl, {
		                        label: __('Button Url'),
		                        value: props.attributes.url,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                url: value,
		                            });
		                        },
		                    }
	                    ),
	                    el(
	                        SelectControl, {
	                            label: __('Click Behavior'),
	                            options: [
	                            	{label: __('Same Tab'), value: '_self'},
	                            	{label: __('New Tab'), value: '_blank'},
	                            ],
	                            value: props.attributes.link_target,
	                            onChange: function(value) {
	                                props.setAttributes({
	                                    link_target: value
	                                });
	                            },
	                        }
	                    ),
	                    el(
	                        SelectControl, {
	                            label: __('Button Size'),
	                            options: [
	                            	{label: __('Medium'), value: ''},
	                            	{label: __('Small'), value: 'btn-sm'},
	                            	{label: __('Large'), value: 'btn-lg'},
	                            ],
	                            value: props.attributes.size,
	                            onChange: function(value) {
	                                props.setAttributes({
	                                    size: value
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
		                        label: __('Button Style'),
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
						el(
		                    CheckboxControl, {
		                        label: __('Button Outline'),
		                        checked: props.attributes.outline,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                outline: value,
		                            });
		                        },
		                    }
	                    ),
						el(
		                    CheckboxControl, {
		                        label: __('Button Block'),
		                        checked: props.attributes.block,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                block: value,
		                            });
		                        },
		                    }
	                    ),
						[!! (props.attributes.block == false) && el(
		                    AlignmentToolbar,
		                    {
		                        value: alignment,
		                        label: __('Alignment'),
		                        onChange: onChangeAlignment,
		                    }
		                ),						
						],	                    
		            ),
	            ),
	            el(
					'div',
					{ className: 'mbg-wrapper', style: {'text-align': alignment} },
			        el(
			            'a',
			            {className: 'btn btn-'+button_style_class+' '+block_class+' '+props.attributes.size, href: 'javascript:void(0)', style: {'background-color': bg_color, 'color': color }},
			            props.attributes.label
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