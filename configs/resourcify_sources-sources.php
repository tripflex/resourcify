<?php
/**
*
* fieldconfig for resourcify/Sources
*
* @package Resourcify
* @author Myles McNamara myles@hostt.net
* @license GPL-2.0+
* @link http://smyl.es
* @copyright 2014 Myles McNamara
*/


$group = array(
	'label' => __('Sources','resourcify'),
	'id' => '827230',
	'master' => 'source_type',
	'fields' => array(
		'source_type'	=>	array(
			'label'		=> 	__('Type','resourcify'),
          'caption'   =>  '',
			'type'		=>	'onoff',
			'default'	=> 	'*source||Source,resource||Resource,quote||Quote',
			'inline'	=> 	true,
		),
		'source_title'	=>	array(
			'label'		=> 	__('Title','resourcify'),
			'caption'	=>	__('What title should we use for the link?','resourcify'),
			'type'		=>	'textfield',
			'default'	=> 	'',
		),
		'source_url'	=>	array(
			'label'		=> 	__('URL','resourcify'),
			'caption'	=>	__('Full URL to source','resourcify'),
			'type'		=>	'textfield',
			'default'	=> 	'',
		),
	),
	'styles'	=> array(
		'toggles.css',
	),
	'scripts'	=> array(
		'toggles.min.js',
	),
	'multiple'	=> true,
);

