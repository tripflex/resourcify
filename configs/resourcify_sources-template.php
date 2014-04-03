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
          'caption'   =>  '',
			'type'		=>	'onoff',
			'default'	=> 	'1||Yes,*0||No',
			'inline'	=> 	true,
		),
		'template_code'	=>	array(
			'label'		=> 	__('Template Code','resourcify'),
			'caption'	=>	__('See the Template Help tab for more details about the template and variables','resourcify'),
			'type'		=>	'codeeditor',
			'default'	=> 	'<h4>
    {{resourcify_count}} {{resourcify_count_title}}
</h4>
<ul>
    {{#resourcify_sources}}
    <li>
        <a target="_blank" href="{{source_url}}">{{source_title}}</a>
    </li>
    {{/resourcify_sources}}
</ul>',
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

