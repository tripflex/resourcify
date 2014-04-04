<?php
	global $post;

	$sources = get_post_meta($post->ID,'resourcify_sources',TRUE);

	$total_sources = 0; if(isset($sources['source_title'])) $total_sources = count($sources['source_title']);

	if((get_post_type() == 'post') && $total_sources){
		$source_html = '<h4>' . $total_sources . ' Sources:</h4><ul>';
		for ($i = 0; $i < $total_sources; $i++){

			$source_type = $sources['source_type'][$i];
			$source_title = $sources['source_title'][$i];
			$source_url = $sources['source_url'][$i];

			if ($source_url != ''){
				$source_url = esc_url_raw($source_url);
				if ($source_title === '') $source_title = $source_url;
				$source_html .= '<li><a target="_blank" href="' . $source_url . '" title="' . $source_title . '">' . $source_title . '</a></li>';
			}
		}

		$source_html .= '</ul>';

		echo $source_html;
	}
?>
