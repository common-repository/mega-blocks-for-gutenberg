/**
 * Image Hover for Gutenberg 
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
	var MediaUpload = wp.editor.MediaUpload;

	var hover_styles_arr = [
		{ label:__('caption-slide-up'), value: 'caption-slide-up' },
		{ label:__('slide-left-to-right'), value: 'slide-left-to-right' },
		{ label:__('slide-right-to-left'), value: 'slide-right-to-left' },
		{ label:__('slide-top-to-bottom'), value: 'slide-top-to-bottom' },
		{ label:__('slide-bottom-to-top'), value: 'slide-bottom-to-top' },
		{ label:__('image-flip-up'), value: 'image-flip-up' },
		{ label:__('image-flip-down'), value: 'image-flip-down' },
		{ label:__('image-flip-right'), value: 'image-flip-right' },
		{ label:__('image-flip-left'), value: 'image-flip-left' },
		{ label:__('rotate-image-down'), value: 'rotate-image-down' },
		{ label:__('image-turn-around'), value: 'image-turn-around' },
		{ label:__('zoom-and-pan'), value: 'zoom-and-pan' },
		{ label:__('tilt-image'), value: 'tilt-image' },
		{ label:__('morph'), value: 'morph' },
		{ label:__('move-image-right'), value: 'move-image-right' },
		{ label:__('move-image-left'), value: 'move-image-left' },
		{ label:__('move-image-top'), value: 'move-image-top' },
		{ label:__('move-image-bottom'), value: 'move-image-bottom' },
		{ label:__('image-squeez-right'), value: 'image-squeez-right' },
		{ label:__('image-squeez-left'), value: 'image-squeez-left' },
		{ label:__('image-squeez-top'), value: 'image-squeez-top' },
		{ label:__('image-squeez-bottom'), value: 'image-squeez-bottom' },
		{ label:__('fall-down-caption'), value: 'fall-down-caption' },
		{ label:__('fall-down-image'), value: 'fall-down-image' },
		{ label:__('swap-caption'), value: 'swap-caption' },
		{ label:__('swap-image'), value: 'swap-image' },
		{ label:__('puffin-caption'), value: 'puffin-caption' },
		{ label:__('puffin-image'), value: 'puffin-image' },
		{ label:__('puffout-caption'), value: 'puffout-caption' },
		{ label:__('puffout-image'), value: 'puffout-image' },
		{ label:__('opendoordown-caption'), value: 'opendoordown-caption' },
		{ label:__('opendoordown-image'), value: 'opendoordown-image' },
		{ label:__('opendoorup-caption'), value: 'opendoorup-caption' },
		{ label:__('opendoorup-image'), value: 'opendoorup-image' },
		{ label:__('opendoorright-caption'), value: 'opendoorright-caption' },
		{ label:__('opendoorright-image'), value: 'opendoorright-image' },
		{ label:__('opendoorleft-caption'), value: 'opendoorleft-caption' },
		{ label:__('opendoorleft-image'), value: 'opendoorleft-image' },
		{ label:__('rotatedown-caption'), value: 'rotatedown-caption' },
		{ label:__('rotatedown-image'), value: 'rotatedown-image' },
		{ label:__('rotateup-caption'), value: 'rotateup-caption' },
		{ label:__('rotateup-image'), value: 'rotateup-image' },
		{ label:__('rotateright-caption'), value: 'rotateright-caption' },
		{ label:__('rotateright-image'), value: 'rotateright-image' },
		{ label:__('rotateleft-caption'), value: 'rotateleft-caption' },
		{ label:__('rotateleft-image'), value: 'rotateleft-image' },
		{ label:__('spaceoutup-caption'), value: 'spaceoutup-caption' },
		{ label:__('spaceoutup-image'), value: 'spaceoutup-image' },
		{ label:__('spaceoutdown-caption'), value: 'spaceoutdown-caption' },
		{ label:__('spaceoutdown-image'), value: 'spaceoutdown-image' },
		{ label:__('spaceoutright-caption'), value: 'spaceoutright-caption' },
		{ label:__('spaceoutright-image'), value: 'spaceoutright-image' },
		{ label:__('spaceoutleft-caption'), value: 'spaceoutleft-caption' },
		{ label:__('spaceoutleft-image'), value: 'spaceoutleft-image' },
		{ label:__('foolish-caption'), value: 'foolish-caption' },
		{ label:__('foolish-image'), value: 'foolish-image' },
		{ label:__('tinright-caption'), value: 'tinright-caption' },
		{ label:__('tinright-image'), value: 'tinright-image' },
		{ label:__('tinleft-caption'), value: 'tinleft-caption' },
		{ label:__('tinleft-image'), value: 'tinleft-image' },
		{ label:__('tinup-caption'), value: 'tinup-caption' },
		{ label:__('tinup-image'), value: 'tinup-image' },
		{ label:__('tindown-caption'), value: 'tindown-caption' },
		{ label:__('tindown-image'), value: 'tindown-image' },
		{ label:__('simple-fade'), value: 'simple-fade' },
		{ label:__('zoom-in'), value: 'zoom-in' },
		{ label:__('zoom-out'), value: 'zoom-out' },
		{ label:__('zoom-in-twist'), value: 'zoom-in-twist' },
		{ label:__('zoom-out-twist'), value: 'zoom-out-twist' },
		{ label:__('zoom-caption-in-image-out'), value: 'zoom-caption-in-image-out' },
		{ label:__('zoom-caption-out-image-in'), value: 'zoom-caption-out-image-in' },
		{ label:__('zoom-image-out-caption-twist'), value: 'zoom-image-out-caption-twist' },
		{ label:__('zoom-image-in-caption-twist'), value: 'zoom-image-in-caption-twist' },
		{ label:__('flip-image-vertical'), value: 'flip-image-vertical' },
		{ label:__('flip-image-horizontal'), value: 'flip-image-horizontal' },
		{ label:__('flip-image-vertical-back'), value: 'flip-image-vertical-back' },
		{ label:__('flip-image-horizontal-back'), value: 'flip-image-horizontal-back' },
		{ label:__('page-turn-from-top'), value: 'page-turn-from-top' },
		{ label:__('page-turn-from-bottom'), value: 'page-turn-from-bottom' },
		{ label:__('page-turn-from-left'), value: 'page-turn-from-left' },
		{ label:__('page-turn-from-right'), value: 'page-turn-from-right' },
		{ label:__('no-effect'), value: 'no-effect' },
		{ label:__('no-hover-still-caption'), value: 'no-hover-still-caption' },
		{ label:__('static-caption-zoom'), value: 'static-caption-zoom' },
	]

	/**
	 * Alert Block
	 * @return {null}       Rendered through PHP
	 */
	blocks.registerBlockType( 'mega-blocks-gutenberg/image-hover', {
		title: __( 'Image Hover' ),
		icon: 'images-alt',
		category: 'mega_blocks',
	    keywords: [
            __('caption'),
            __('effects'),
            __('css3')
	    ],
	    description: __( 'Displays images with captions' ),
		attributes: {
			hover_style: {
				type: 'string',
				default: 'zoom-in'
			},
			image_url: {
				type: 'string',
				default: mbg_vars.mbg_assets_dir+'/images/placeholder.gif'
			},
			image_alt: {
				type: 'string',
				default: ''
			},
			image_title: {
				type: 'string',
				default: ''
			},


			title: {
				type: 'string',
				default: 'TITLE HERE'
			},
			font_size: {
				type: 'string',
				default: '24px'
			},
			font_family: {
				type: 'string',
				default: 'Roboto, sans-serif'
			},
			alignment: {
				type: 'string',
				default: 'center'
			},
			animation_speed: {
				type: 'string',
				default: ''
			},
			border_width: {
				type: 'string',
				default: ''
			},
			border_color: {
				type: 'string',
				default: ''
			},
			border_radius: {
				type: 'string',
				default: ''
			},
			border_type: {
				type: 'string',
				default: 'none'
			},
			shadow: {
				type: 'string',
				default: ''
			},
			

			title_color: {
				type: 'string',
				default: ''
			},

			overlay_color: {
				type: 'string',
				default: ''
			},

			overlay_opacity: {
				type: 'string',
				default: '1'
			},

			link: {
				type: 'string',
				default: ''
			},
			link_target: {
				type: 'string',
				default: ''
			},

			unique_id: {
				type: 'string',
				default: 'change-this-id'
				// default: new Date().getUTCMilliseconds()
			},			
		},
	    edit: function(props) {
	        return [!!props.isSelected && el(wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },
	                el(
	                    SelectControl, {
	                        options: hover_styles_arr,
	                        label: __('Choose Hover Style'),
	                        value: props.attributes.hover_style,
	                        onChange: function(value) {
	                            props.setAttributes({
	                                hover_style: value
	                            });
	                        },
	                    }
	                ),
	                el(
	                    PanelBody, {
	                        title: __('Image'),
	                    },
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Provide URL or Upload Image'),
		                        value: props.attributes.image_url,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                image_url: value
		                            });
		                        },
		                    }
		                ),						
						el( MediaUpload, {
							onSelect: function(media){
	                            props.setAttributes({
	                                image_url: media.url
	                            });
							},
							allowedTypes: ['image'],
							value: props.attributes.image_url,
							render: function( obj ) {
								return el( wp.components.Button, {
									className: 'button button-secondary media-btn-margin',
									onClick: obj.open
									},
									__( 'Upload Image' )
								);
							}
						}),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Image title'),
		                        help: __('It will be used for title attribute of img tag'),
		                        value: props.attributes.image_title,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                image_title: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Image alternative text'),
		                        help: __('It will be used for alt attribute of img tag'),
		                        value: props.attributes.image_alt,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                image_alt: value
		                            });
		                        },
		                    }
		                ),						
	                ),

	                el(
	                    PanelBody, {
	                        title: __('Caption'),
	                    },
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Title'),
		                        value: props.attributes.title,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                title: value
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
		                        type: 'text',
		                        label: __('Font Size'),
		                        value: props.attributes.font_size,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                font_size: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Font Family'),
		                        value: props.attributes.font_family,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                font_family: value
		                            });
		                        },
		                    }
		                ),
	                ),
	                el(
	                	PanelColorSettings,{
	                		initialOpen: false,
	                		title:__('Color Settings'),
	                		colorSettings:[
		                    {
		                        value: props.attributes.title_color,
		                        label: __( 'Title Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                title_color: value
		                            });
		                        },
		                    },
		                    {
		                        value: props.attributes.overlay_color,
		                        label: __( 'Overlay Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                overlay_color: value
		                            });
		                        },
		                    },

		                    {
		                        value: props.attributes.border_color,
		                        label: __( 'Border Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                border_color: value
		                            });
		                        },
		                    },
	                		]
	                	},
	                ),
	                el(
	                    PanelBody, {
	                        title: __('Border Settings'),
	                        colorValue: props.attributes.border_color,
	                    },
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Border Width'),
		                        help: __('Provide with unit. Leave blank to disable border'),
		                        value: props.attributes.border_width,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                border_width: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Border Radius'),
		                        value: props.attributes.border_radius,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                border_radius: value
		                            });
		                        },
		                    }
		                ),
	                    el(
	                        SelectControl, {
	                            options: [
	                            	{label: __('None'), value: 'none'},
	                            	{label: __('Solid'), value: 'solid'},
	                            	{label: __('Dotted'), value: 'dotted'},
	                            	{label: __('Dashed'), value: 'dashed'},
	                            	{label: __('Double'), value: 'double'},
	                            	{label: __('Groove'), value: 'groove'},
	                            	{label: __('Ridge'), value: 'ridge'},
	                            	{label: __('Inset'), value: 'inset'},
	                            	{label: __('Outset'), value: 'outset'},
	                            ],
	                            label: __('Border Type'),
	                            value: props.attributes.border_type,
	                            onChange: function(value) {
	                                props.setAttributes({
	                                    border_type: value
	                                });
	                            },
	                        }
	                    ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Shadow'),
		                        value: props.attributes.shadow,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                shadow: value
		                            });
		                        },
		                    }
		                ),		                
	                ),

	                el(
	                    PanelBody, {
	                        title: __('Link Options'),
	                    },
	                    el(
	                        SelectControl, {
	                            options: [
	                            	{label: __('Same Tab'), value: '_self'},
	                            	{label: __('New Tab'), value: '_blank'},
	                            	{label: __('Popup'), value: 'popup'},
	                            	{label: __('Disable Link'), value: 'disable'},
	                            ],
	                            label: __('Link Behavior'),
	                            value: props.attributes.link_target,
	                            onChange: function(value) {
	                                props.setAttributes({
	                                    link_target: value
	                                });
	                            },
	                        }
	                    ),
		                el(
		                    TextControl, {
		                        type: 'url',
		                        label: __('Link To'),
		                        help: __('If you want to open image in popup, paste image url here as well. It can be used to display larger version of image in popup.'),
		                        value: props.attributes.link,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                link: value
		                            });
		                        },
		                    }
		                ),
	                ),

	                el(
	                    PanelBody, {
	                        title: __('Other Settings'),
	                    },
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Animation Speed'),
		                        help: __('Provide speed of animation in ms'),
		                        value: props.attributes.animation_speed,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                animation_speed: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Unique ID'),
		                        help: __('Provide unique ID if you are using multiple instances of same hover styles on a single page to avoid conflict'),
		                        value: props.attributes.unique_id,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                unique_id: value
		                            });
		                        },
		                    }
		                ),
	                ),
	            ),
	            el(
					'div',
					{ class: 'wcp-caption-plugin', id: 'ihe-box-'+props.attributes.unique_id,
					style: {
						borderWidth: props.attributes.border_width,
						borderStyle: props.attributes.border_type,
						borderColor: props.attributes.border_color,
						borderRadius: props.attributes.border_radius,
						boxShadow: props.attributes.shadow,
						overflow: 'hidden'
					} },
					el(
						'a',
						{href: 'javascript:void(0)'},
						el(
							'div',
							{class: 'image-caption-box'},
							el(
								'div',
								{class: 'caption '+props.attributes.hover_style, 
								style: {
									borderRadius: props.attributes.border_radius,
									backgroundColor: props.attributes.overlay_color,
									// opacity: props.attributes.overlay_opacity,
									transitionDuration: props.attributes.animation_speed,
								}},
								el(
									'div',
									{style: {display: 'table', height: '100%', width: '100%'}},
									el(
										'p', {class: 'centered-text', style: {
											color: props.attributes.title_color,
											fontSize: props.attributes.font_size,
											fontFamily: props.attributes.font_family,
											textAlign: props.attributes.alignment
										}

										},
										props.attributes.title
									),
								),
							),
							el(
								'img',
								{
									class: 'wcp-caption-image',
									src : props.attributes.image_url,
									alt: props.attributes.image_alt,
									style: {transitionDuration: props.attributes.animation_speed, borderRadius: props.attributes.border_radius,}
								}
							),							
						),
					),
					el(
						'style',
						'',
						''
					)
				)
	        ];
	    },
		save: function(props) {
			// Renering from PHP
			return null;
		},
	});

} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);