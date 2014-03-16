<?php
	global $post;

	function format_url($url) {
	    if(!(strpos($url, "http://") === 0)
		&& !(strpos($url, "https://") === 0)) {
	        $url = "http://$url";
		}
	    return $url;
	}

	$sources = get_post_meta($post->ID,'resourcify_sources',TRUE);

	$total_sources = count($sources['source_title']);

	if($sources['source_title'][0] === '') $total_sources = null;

	if(is_single() && $total_sources){
		$source_html = '<h4>' . $total_sources . ' Sources:</h4><ul>';
		for ($i = 0; $i < $total_sources; $i++){

			$source_type = $sources['source_type'][$i];
			$source_title = $sources['source_title'][$i];
			$source_url = $sources['source_url'][$i];

			if ($source_url) $source_url = format_url($source_url);

			if ($source_url != ''){
				if ($source_title === '') $source_title = $source_url;
				$source_html .= '<li><a target="_blank" href="' . $source_url . '" title="' . $source_title . '">' . $source_title . '</a></li>';
			}
		}

		$source_html .= '</ul>';

		echo $source_html;
	}
?>