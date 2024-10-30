/**
 * Pricing table Blocks for Gutenberg 
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
	var SelectControl = wp.components.SelectControl;
	var TextControl = wp.components.TextControl;
	var PanelColorSettings = wp.editor.PanelColorSettings;
	console.log(wp.components);

	/**
	 * Alert Block
	 * @return {null}       Rendered through PHP
	 */
	blocks.registerBlockType( 'mega-blocks-gutenberg/pricing-table', {
		title: __( 'Pricing Table' ),
		icon: 'editor-table',
		category: 'mega_blocks',
	    keywords: [
            __('price'),
            __('table'),
            __('compare')
	    ],
	    description: __( 'Displays pricing table' ),
		attributes: {
	        content: {
	            source: 'html',
	            default: '',
	        },
	        price_header:{
	        	type:'string',
	        	default:'Starter Package'
	        },
	        header_color: {
	            type: 'string',
	            default: '',
	        },
	        price_color:
	        {
	        	type:'string',
	        	default:''
	        },
	        tag_line_color:
	        {
	        	type:'string',
	        	default:''
	        },
	        bg_color:
	        {
	        	type:'string',
	        	default:'Starter'
	        },
	        price:
	        {
	        	type:'string',
	        	default:'$19'
	        },
	        tag_line:
	        {
	        	type:'string',
	        	default:'/MONTH'
	        },
	        border_radius:
	        {
	        	type:'string',
	        	default:'5px'
	        },
	        btn_text:
	        {
	        	type:'string',
	        	default:'Purchase Now'
	        },
	        btn_url:{
	        	type:'string',
	        	default:''
	        },
	        link_target:{
	        	type:'string',
	        	default:''
	        },
	        btn_border_radius:{
	        	type:'string',
	        	default:'8px'
	        },
	        unique_id:{
	        	type:'string',
	        	default:'some-id'
	        },
	        btn_background_color: {
	        	type:'string',
	        	default:''
	        },
	        btn_text_color:{
	        	type:'string',
	        	default:''
	        },
	        btn_background_color_h: {
	        	type:'string',
	        	default:''
	        },
	        btn_text_color_h:{
	        	type:'string',
	        	default:''
	        },
	        content_font_size:{
	        	type:'number',
	        	default:'14px'
	        },
	        content_color:{
	        	type:'string',
	        	default:''
	        },
		},
	    edit: function(props) {
	        return [!!props.isSelected && el(
	                wp.editor.InspectorControls, {
	                    key: 'inspector'
	                },
				    el(
				    	PanelBody,{
				    		title:__('Content Settings'),
				    	},
				    	el(
				    		TextControl, {
		                        type: 'text',
		                        label: __('Heading'),
		                        value: props.attributes.price_header,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                price_header: value
		                            });
		                        },
		                    }
				    	),
				    	el(
		                    FontSizePicker,
		                    {
		                        value: props.attributes.content_font_size,
		                        label: __('Features Font Size'),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                content_font_size: value,
		                            });
		                        },
		                    }
						),
				    	el(
				    		TextControl, {
		                        type: 'text',
		                        label: __('Price'),
		                        value: props.attributes.price,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                price: value
		                            });
		                        },
		                    }
				    	),
				    	el(
				    		TextControl, {
		                        type: 'text',
		                        label: __('Tagline'),
		                        value: props.attributes.tag_line,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                tag_line: value
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
	                        TextControl, {
	                            label: __('Unique ID'),
	                            help: __('Please specify custom id to differenciate styles if using more than one different pricing tables'),
	                            value: props.attributes.unique_id,
	                            onChange: function(value) {
	                                props.setAttributes({
	                                    unique_id: value
	                                });
	                            },
	                        }
                    	),				    	
				   	),
			   		el(
			   			PanelBody,{
			   				initialOpen:false,
			   				title:__('Button Settings'),
			   			},
				    	el(
				    		TextControl, {
		                        type: 'text',
		                        label: __('Button Text'),
		                        value: props.attributes.btn_text,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                btn_text: value
		                            });
		                        },
		                    }
				    	),
				    	el(
				    		TextControl, {
		                        type: 'text',
		                        label: __('Button Url'),
		                        value: props.attributes.btn_url,
		                        onChange: function(value) {
		                            props.setAttributes({
		                                btn_url: value
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
	                            label: __('Button Border Radius'),
	                            value: props.attributes.btn_border_radius,
	                            onChange: function(value) {
	                                props.setAttributes({
	                                    btn_border_radius: value
	                                });
	                            },
	                        }
                    	),			
			   		),
			   		el(
	                	PanelColorSettings,{
	                		initialOpen: false,
	                		title:__('Button Colors'),
	                		colorSettings:[
			                    {
			                        value: props.attributes.btn_text_color,
			                        label: __( 'Text Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                btn_text_color: value
			                            });
			                        },
			                    },
			                    {
			                        value: props.attributes.btn_text_color_h,
			                        label: __( 'Text Color Hover' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                btn_text_color_h: value
			                            });
			                        },
			                    },
			                    {
			                        value: props.attributes.btn_background_color,
			                        label: __( 'Background Color' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                btn_background_color: value
			                            });
			                        },
			                    },
			                    {
			                        value: props.attributes.btn_background_color_h,
			                        label: __( 'Background Color Hover' ),
			                        onChange: function(value) {
			                            props.setAttributes({
			                                btn_background_color_h: value
			                            });
			                        },
			                    },
			                ]
			            },
			        ),
            	    el(
	                	PanelColorSettings,{
	                		initialOpen: false,
	                		title:__('Custom Colors'),
	                		colorSettings:[
		                    {
		                        value: props.attributes.header_color,
		                        label: __( 'Heading Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                header_color: value
		                            });
		                        },
		                    },
	                		{
		                        value: props.attributes.price_color,
		                        label: __( 'Price Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                price_color: value
		                            });
		                        },
		                    },
	                		{
		                    value: props.attributes.tag_line_color,
		                        label: __( 'Tagline Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                tag_line_color: value
		                            });
		                        },
		                    },
	                		{
		                    value: props.attributes.content_color,
		                        label: __( 'Content Color' ),
		                        onChange: function(value) {
		                            props.setAttributes({
		                                content_color: value
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
	        	el('div',
	        		{className:'mbg-pricing-table', id: props.attributes.unique_id},
	        		el(
	        			'div',
	        			{className:'plan',style:{
	        				borderRadius:props.attributes.border_radius,
	        				backgroundColor:props.attributes.bg_color,
	        			},},
	        			el(
	        				'header',
	        				{className:''},
	        				el(
	        					'h4',
	        					{className:'plan-title',style:{
	        						color:props.attributes.header_color,
	        					},},props.attributes.price_header,
	        				),
	        				el(
	        					'div',
	        					{className:'plan-cost'},
	        					el(
	        						'span',
	        						{className:'plan-price', style:{
	        							color:props.attributes.price_color,
	        						},},props.attributes.price,
	        					),
	        					el(
	        						'span',
	        						{className:'plan-type',style:{
	        							color:props.attributes.tag_line_color,
	        						},},props.attributes.tag_line,
	        					),
	        				),
	        			),
			            el(
			                RichText,
			                {
			                    key: 'editable',
			                    tagName: 'ul',
			                    className: 'plan-features',
			                    multiline: 'li',
		                        onChange: function(value) {
		                            props.setAttributes({
		                                content: value
		                            });
		                        },
			                    value: props.attributes.content,
			                }
			            ),
			            el('style', 
			            	null, 
			            	'#'+props.attributes.unique_id+' ul.plan-features li {font-size: '+props.attributes.content_font_size+'px; color:'+props.attributes.content_color+'} #'+props.attributes.unique_id+' .plan-select a:hover {color: '+props.attributes.btn_text_color_h+' !important; background-color:'+props.attributes.btn_background_color_h+' !important;}'
			            ),
			            el(
			            	'div',
			            	{class:'plan-select'},
				            el(
								'a',
				            	{
				            		style:{
				            			borderRadius:props.attributes.btn_border_radius,
				            			color:props.attributes.btn_text_color,
				            			backgroundColor:props.attributes.btn_background_color,
				            		},
				            		href:'javascript:void(0)',
				            		target:props.attributes.link_target,
				            	},
				            	props.attributes.btn_text,
				            )
			            ),
	        		),
	        	),
	        ];
	    },
		save: function(props) {
			return el(RichText.Content, {value: props.attributes.content});
		},
	});

} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);