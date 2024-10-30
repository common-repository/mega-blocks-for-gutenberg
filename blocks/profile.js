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
	blocks.registerBlockType('mega-blocks-gutenberg/profile',{
		title:__('Profile Card'),
		icon: 'admin-users',
		category:'mega_blocks',
		attributes: {
			content: {
	            source: 'html',
	            default:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'
	        },
			bg_color:{
				type:'string',
				default:''
			},
			icons_color:{
				type:'string',
				default:''
			},
			change_text_color:{
				type:'string',
				default:''
			},
			change_heading_color:{
				type:'string',
				default:''
			},
			company_color:{
				type:'string',
				default:''
			},
			founder_name:
			{
				type:'string',
				default:'Founder'
			},
			image_url: {
				type: 'img',
				default: mbg_vars.mbg_assets_dir+'/images/user.jpg'
			},
			image_title: {
				type: 'string',
				default: 'Some Name',
			},
			img_border:{
				type:'string',
				default:'5px'
			},
			icon_size:{
				type:'string',
				default:'20px'
			},
			fb_url:{
				type:'string',
				default:'#'
			},
			twitter_url:{
				type:'string',
				default:'#'
			},
			insta_url:{
				type:'string',
				default:'#'
			},
			skype_url:{
				type:'string',
				default:''
			},
			whatsapp_url:{
				type:'string',
				default:''
			},
			link_target:{
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
	                        title: __('Other Settings'),
	                    },
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Name'),
		                        value: props.attributes.image_title,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                image_title: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                	TextControl,{
		                		type:'text',
		                		label:__('Company/Role'),
		                		value:props.attributes.founder_name,
		                		onChange:function(value){
		                			props.setAttributes({
		                				founder_name:value
		                			});
		                		},
		                	}
		                ),
	                ),
	                el(
	                   	PanelBody, {
	                    	initialOpen:false,
	                        title: __('Image Settings'),
	                    },
		                el(
		                    TextControl,
		                    {
		                    	label:__('Border Radius'),
		                        value: props.attributes.img_border,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                img_border: value,
		                            });
		                        },
		                    }
						),
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
							type: 'image',
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
	                   	PanelBody, {
	                    	initialOpen:false,
	                        title: __('Social Networks'),
	                    },
						el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Icons Size'),
		                        value: props.attributes.icon_size,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                icon_size: value
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
		                    TextControl, {
		                        type: 'text',
		                        label: __('Facebook URL'),
	                        	help: __('Provide url to enable'),
		                        value: props.attributes.fb_url,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                fb_url: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Twitter URL'),
		                        value: props.attributes.twitter_url,
	                        	help: __('Provide url to enable'),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                twitter_url: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Instagram URL'),
		                        value: props.attributes.insta_url,
	                        	help: __('Provide url to enable'),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                insta_url: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Skype URL'),
	                        	help: __('Provide url to enable'),
		                        value: props.attributes.skype_url,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                skype_url: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('WhatsApp URL'),
		                        value: props.attributes.whatsapp_url,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                whatsapp_url: value
		                            });
		                        },
		                    }
		                ),
		            ),
		                el(
		                	PanelColorSettings,{
		                		initialOpen: false,
		                		title:__('Custom Colors'),
		                		colorSettings:[
		                		{
			                    value: props.attributes.change_heading_color,
			                        label: __( 'Name Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                change_heading_color: value
			                            });
			                        },
			                    },
		                		{
			                    value: props.attributes.company_color,
			                        label: __( 'Company Name Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                company_color: value
			                            });
			                        },
			                    },
		                		{
			                        value: props.attributes.change_text_color,
			                        label: __( 'Text Color' ),
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
			                    {
			                        value: props.attributes.icons_color,
			                        label: __( 'Icons Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                icons_color: value
			                            });
			                        },
			                    },
		                	]
		                },
		            ),
	            ),
				el('div',{className:"first-"},
					el('figure',{className:'mbg-profile-card'},
						el('figcaption',{className:'',style:{
									backgroundColor:props.attributes.bg_color,
			                    }, },
							el('h3',{className:'', style :{
								color:props.attributes.change_heading_color,
							}},props.attributes.image_title),
							el('h4',{className:'', style : {
								color:props.attributes.company_color,
							}},props.attributes.founder_name),
							el('p',{className:''},props.attributes.change_text),
							el(
			                	RichText,
			                {
			                    key: 'editable',
			                    tagName: 'p',
			                    onChange: onChangeContent,
			                    value: content,
			                    style:{
			                    	color:props.attributes.change_text_color,
			                    },
			                },
			            ),
						el('style', '', '.mbg-profile-card figcaption:after {border-color: '+props.attributes.bg_color+ ' transparent transparent transparent;} .mbg-profile-card i { color: '+props.attributes.icons_color+';}')
						),
						el('div',{className:'profile-image'},
							el('img',{src:props.attributes.image_url,className:'',style:{
								borderRadius:props.attributes.img_border,
							},}),
							el('div',{className:'icons'},
								[!! props.attributes.fb_url != '' && el(
									'a',
									{
										href:'javascript:void(0)',
									},
									el('i',{className:'fab fa-facebook',
										style: {
										fontSize:props.attributes.icon_size,
									}
									}),
								)],
								[!! props.attributes.twitter_url != '' && el('a',
									{
										href: 'javascript:void(0)',
									},
									el('i',{className:'fab fa-twitter',
										style:{
										fontSize:props.attributes.icon_size,
									}
									}),
								)],
								[!! props.attributes.insta_url != '' && el('a',
									{
										href: 'javascript:void(0)',
									},
									el('i',{className:'fab fa-instagram',
										style:{
										fontSize:props.attributes.icon_size,
									}
									}),
								)],
								[!! props.attributes.skype_url != '' && el(
									'a',
									{
										href: 'javascript:void(0)',
									},
									el('i',{class:'fab fa-skype',
										style:{
										fontSize:props.attributes.icon_size,
									}
									}),
								)],
								[!! props.attributes.whatsapp_url != '' && el('a',
									{
										href: 'javascript:void(0)',
									},
									el('i',{class:'fab fa-whatsapp-square',
										style:{
										fontSize:props.attributes.icon_size,
									}
									}),
								)],
							),
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