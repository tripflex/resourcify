<?php
/**
*
* fieldconfig for resourcify/About
*
* @package Resourcify
* @author Myles McNamara myles@hostt.net
* @license GPL-2.0+
* @link http://smyl.es
* @copyright 2014 Myles McNamara
*/


$group = array(
	'label' => __('About','resourcify'),
	'id' => '11101108',
	'master' => 'resourcify_about_details',
	'fields' => array(
		'resourcify_about_details'	=>	array(
			'label'		=> 	__('More Details:','resourcify'),
          'caption'   =>  '',
			'type'		=>	'resourcify_about',
			'default'	=> 	'EL533ED4FF3E271',
		),
	),
	'multiple'	=> false,
);

