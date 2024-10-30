(function (blocks, i18n, element){
	var el = element.createElement;
	var __ = i18n.__;
	var Editable = blocks.Editable;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var BlockControls = wp.blocks.BlockControls;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.components.TextControl;
	var RangeControl = wp.components.RangeControl;
	var PanelBody = wp.components.PanelBody;
	var SelectControl = wp.components.SelectControl;
	var TextareaControl = wp.components.TextareaControl;
	var FormFileUpload = wp.components.FormFileUpload;
	var MediaUpload = wp.editor.MediaUpload;
	var RichText = wp.editor.RichText;
	var PanelColorSettings = wp.editor.PanelColorSettings;
	var FontSizePicker = wp.editor.FontSizePicker;
	blocks.registerBlockType('mega-blocks-gutenberg/product-card',{
		title:__('Product Card'),
		icon: 'cart',
		category:'mega_blocks',
		attributes: {
			content: {
	            source: 'html',
	            default:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et '
	        },
			bg_color:{
				type:'string',
				default:'white'
			},
			change_text_color:{
				type:'string',
				default:''
			},
			font_size:{
				type:'number',
				default:''
			},
			primary_color:{
				type:'string',
				default: '#000'
			},
			primary_color_text:{
				type:'string',
				default:''
			},
			image_url: {
				type: 'img',
				default: mbg_vars.mbg_assets_dir+'/images/placeholder.gif'
			},
			price_tag: {
				type: 'string',
				default: '$19.00',
			},
			buying_text:{
				type:'string',
				default:'Add to Cart'
			},
			heading_text:{
				type:'string',
				default:'Denim Shirt'
			},
			btn_url:{
				type:'string',
				default:''
			},
		},
		edit: function(props)
		{
			var content = props.attributes.content;
		    function onChangeContent( newContent ) {
		        props.setAttributes( { content: newContent } );
		    }
			return [!!props.isSelected && el(
	                wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },
	                el(
	                    PanelBody, {
	                        title: __('Settings'),
	                    },
		                el(
		                	TextControl,{
		                		type:'text',
		                		label:__('Price'),
		                		value:props.attributes.price_tag,
		                		onChange:function(value){
		                			props.setAttributes({
		                				price_tag:value
		                			});
		                		},
		                	}
		                ),
		                el(
		                	TextControl,{
		                		type:'text',
		                		label:__('Button Label'),
		                		value:props.attributes.buying_text,
		                		onChange:function(value){
		                			props.setAttributes({
		                				buying_text:value
		                			});
		                		},
		                	}
		                ),
		                el(
		                	TextControl,{
		                		type:'text',
		                		label:__('Product Name'),
		                		value:props.attributes.heading_text,
		                		onChange:function(value){
		                			props.setAttributes({
		                				heading_text:value
		                			});
		                		},
		                	}
		                ),
		                el(
		                	TextControl,{
		                		type:'text',
		                		label:__('Button URL'),
		                		value:props.attributes.btn_url,
		                		onChange:function(value){
		                			props.setAttributes({
		                				btn_url:value
		                			});
		                		},
		                	}
		                ),
						el(
		                    FontSizePicker,
		                    {
		                        value: props.attributes.font_size,
		                        label: __('Content Font Size'),
		                		onChange:function(value){
		                			props.setAttributes({
		                				font_size:value
		                			});
		                		},
		                    }
						),
		                el(
	                   		PanelBody, {
	                    	initialOpen:true,
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
						el(
							MediaUpload, {
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
						}
						),
					),
		                el(
		                	PanelColorSettings,{
		                		initialOpen: false,
		                		title:__('Custom Colors'),
		                		colorSettings:[
		                		{
			                    value: props.attributes.primary_color,
			                        label: __( 'Primary Background Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                primary_color: value
			                            });
			                        },
			                    },
		                		{
			                    value: props.attributes.primary_color_text,
			                        label: __( 'Primary Text Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                primary_color_text: value
			                            });
			                        },
			                    },
		                		{
			                        value: props.attributes.change_text_color,
			                        label: __( 'Content Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                change_text_color: value
			                            });
			                        },
			                    },
			                    {
			                        value: props.attributes.bg_color,
			                        label: __( 'Background Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                bg_color: value
			                            });
			                        },
			                    },
		                		]
		                	},
		                ),
	                ),
	            ),
				el(
					'div',
					{className:'mbg-product-card'},
					el(
						'figure',
						{className:''},
						el(
							'img', {src:props.attributes.image_url},
						),
						el(
							'div',
							{className:'price',style:{
								backgroundColor:props.attributes.primary_color,
								color:props.attributes.primary_color_text,
							}},props.attributes.price_tag,
						),
						el(
							'figcaption',
							{className:'',style:{
								backgroundColor:props.attributes.bg_color,
							}},
							el(
								'h3',
								{className:'',style:{
									backgroundColor:props.attributes.primary_color,
									color:props.attributes.primary_color_text,
								}},props.attributes.heading_text,
							),
							el(
									RichText,
					                {
					                    key: 'editable',
					                    tagName: 'p',
					                    onChange: onChangeContent,
					                    value: content,
					                    style:{
					                    	color:props.attributes.change_text_color,
					                    	'font-size': props.attributes.font_size+'px'
					                    }
					                },
							),
							el(
								'a', {href:'javascript:void(0)',style:{
									backgroundColor:props.attributes.primary_color,
									color:props.attributes.primary_color_text,
								}},props.attributes.buying_text,
							),
							el('style', '', '.mbg-product-card figure .price:before {border-color: transparent '+props.attributes.primary_color+' transparent;} .mbg-product-card figure h3:before {border-color: transparent transparent transparent '+props.attributes.primary_color+'} .mbg-product-card figure a:before {border-color: transparent transparent '+props.attributes.primary_color+';}'),
						),
					),
				),	
			];	
		},
		save: function(props) {
				return el( RichText.Content, {
	            value: props.attributes.content
	        } );
		},

	});
})
(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);