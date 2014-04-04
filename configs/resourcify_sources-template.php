<?php
/**
*
* fieldconfig for resourcify/Template
*
* @package Resourcify
* @author Myles McNamara myles@hostt.net
* @license GPL-2.0+
* @link http://smyl.es
* @copyright 2014 Myles McNamara
*/


$group = array(
	'label' => __('Template','resourcify'),
	'id' => '151913410',
	'master' => 'use_custom_template',
	'fields' => array(
		'use_custom_template'	=>	array(
			'label'		=> 	__('Use Custom Template?','resourcify'),
			'caption'	=>	__('Default template will be used if set to No','resourcify'),
			'type'		=>	'onoff',
			'default'	=> 	'1||Yes,*0||No',
			'inline'	=> 	true,
		),
		'use_template'	=>	array(
			'label'		=> 	__('Use Template','resourcify'),
			'caption'	=>	__('Select a template from the dropdown to fill the code box below','resourcify'),
			'type'		=>	'dropdown',
			'default'	=> 	'*0||Select a Pre-Made Template,default||Default',
		),
		'template_code'	=>	array(
			'label'		=> 	__('Template Code','resourcify'),
			'caption'	=>	__('Go to the Template Help section for details on template syntax and available variables','resourcify'),
			'type'		=>	'codeeditor',
			'default'	=> 	'',
		),
	),
	'styles'	=> array(
		'toggles.css',
		'editor.css',
	),
	'scripts'	=> array(
		'toggles.min.js',
		'codemirror-compressed.js',
	),
	'multiple'	=> false,
);

