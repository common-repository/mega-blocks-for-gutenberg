(function(blocks,i18n,element){
	var el = element.createElement;
	var __ = i18n.__;
	var Editable = blocks.Editable;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var BlockControls = wp.blocks.BlockControls;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.components.TextControl;
	var RangeControl = wp.components.RangeControl;
	var PanelColorSettings = wp.editor.PanelColorSettings;
	var SelectControl = wp.components.SelectControl;
	var TextareaControl = wp.components.TextareaControl;
	var FormFileUpload = wp.components.FormFileUpload;
	var MediaUpload = wp.editor.MediaUpload;
	var CheckboxControl = wp.components.CheckboxControl;
	var RichText = wp.editor.RichText;
	var PanelBody = wp.components.PanelBody;
	var FontSizePicker = wp.editor.FontSizePicker;
	console.log(wp.components);	
	blocks.registerBlockType('mega-blocks-gutenberg/testimonial',{
		title:__('Testimonial'),
		icon: 'testimonial',
		category:'mega_blocks',
		attributes:{
			image_url:{
				type:'img',
				default: mbg_vars.mbg_assets_dir+'/images/user.jpg',
			},
			content: {
	            source: 'html',
	            default: 'Some awesome feedback goes here.'
	        },
			change_heading:{
				type:'text',
				default:'Some Name',
			},
			last_heading:{
				type:'text',
				default:'Company Name Inc'
			},
			change_text_color : {
				type: 'string',
				default: 'white'
			},
			change_text_bgcolor : {
				type: 'string',
				default: 'rgb(0, 123, 255)'
			},
			change_name_color : {
				type: 'string',
				default: 'black'
			},
			font_size:{
				type:'number',
				default:'15'
			},
			change_company_color:{
				type:'string',
				default:''
			},
		},
		edit: function(props)
		{
			var heading_text = props.attributes.last_heading;
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
	                    	initialOpen:true,
	                        title: __('Settings'),
	                    },
		                el(
		                    TextControl, {
		                        type: 'text',
		                        label: __('Name'),
		                        value: props.attributes.change_heading,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                change_heading: value
		                            });
		                        },
		                    }
		                ),
		                el(
		                	TextControl,{
		                		type:'text',
		                		label:__('Company'),
		                		value:props.attributes.last_heading,
		                		onChange:function(value){
		                			props.setAttributes({
		                				last_heading:value
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
		                el(
		                    PanelBody, {
		                    	initialOpen:false,
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
						}),
						),
		                el(
		                	PanelColorSettings,{
		                		initialOpen: false,
		                		title:__('Color Settings'),
		                		colorSettings:[
			                    {
			                        value: props.attributes.change_text_bgcolor,
			                        label: __( 'Background Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                change_text_bgcolor: value
			                            });
			                        },
			                    },
		                		{
			                        value: props.attributes.change_name_color,
			                        label: __( 'Name Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                change_name_color: value
			                            });
			                        },
			                    },
		                		{
			                        value: props.attributes.change_company_color,
			                        label: __( 'Company Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                change_company_color: value
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
		                		]
		                	},
		                ),
	                ),
	            ),
			// +props.attributes.hover_style, id:props.attributes.unique_id
					el( 
						'div',
						{className:'mbg-testimonial'},
						el(
							'figure',{class:''},
			                el(
				                RichText,
				                {
				                    key: 'editable',
				                    tagName: 'blockquote',
				                    style:{
				                    	color:props.attributes.change_text_color,
										backgroundColor:props.attributes.change_text_bgcolor,
										'font-size':props.attributes.font_size+'px',
				                    },
				                    onChange: onChangeContent,
				                    value: content,
				                }
				            ),
							el(
								'div',
								{class:'author'},
								el(
									'img',
									{src:props.attributes.image_url},
								),
								el(
									'h5',
									{class:'', style:{
										color:props.attributes.change_name_color,
									}},props.attributes.change_heading,
								),
								el(
									'span',
									{style:{
										color:props.attributes.change_company_color,
									}},
									heading_text,
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