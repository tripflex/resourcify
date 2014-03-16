<?php
	global $post;
	$sources = get_post_meta($post->ID,'resourcify_sources',TRUE);

	$total_sources = count($sources['source_title']);

	if($sources['source_title'][0] === '') $total_sources = null;

	if(is_single() && $total_sources){
		$source_html = '<h4>' . $total_sources . ' Sources:</h4><ul>';
		for ($i = 0; $i < $total_sources; $i++){
			$source_type = $sources['source_type'][$i];
			$source_title = $sources['source_title'][$i];
			$source_url = $sources['source_url'][$i];

			$source_html .= '<li><a target="_blank" href="' . $source_url . '" title="' . $source_title . '">' . $source_title . '</a></li>';
		}

		$source_html .= '</ul>';

		echo $source_html;
	}
?>