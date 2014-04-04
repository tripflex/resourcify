<?php
/**
*
* fieldconfig for resourcify/Template Help
*
* @package Resourcify
* @author Myles McNamara myles@hostt.net
* @license GPL-2.0+
* @link http://smyl.es
* @copyright 2014 Myles McNamara
*/


$group = array(
	'label' => __('Template Help','resourcify'),
	'id' => '1264780',
	'master' => 'variables',
	'fields' => array(
		'variables'	=>	array(
			'label'		=> 	__('Available Variables:','resourcify'),
			'caption'	=>	__('If title is not specified for source, the URL is used by default.','resourcify'),
			'type'		=>	'template_vars',
			'default'	=> 	'EL533C884743717',
		),
	),
	'multiple'	=> false,
);

