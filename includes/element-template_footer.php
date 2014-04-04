<?php
	// Only continue if this is a blog post page
	if(get_post_type() == 'post'){
		global $post;
		$sources = get_post_meta($post->ID,'resourcify_sources',TRUE);

		// Check if setting was set to use custom template
		$use_custom_template = intval($sources['use_custom_template']);
		// Get custom template code
		$template_code = $sources['template_code'];
		// Set default template code
		$default_template_code = '<h4>{{resourcify_count}} {{resourcify_count_title}}</h4><ul>{{#resourcify_sources}}<li><a target="_blank" href="{{source_url}}">{{source_title}}</a></li>{{/resourcify_sources}}</ul>';
		// $wsempty_template_code = preg_replace('/^\s+|\n|\r|\s+$/m', '', $template_code);
		// $ready_template_code = $template_code;

		// Start processing only if there are sources for this blog post
		if($sources){
			// Count how many sources we have
			$total_sources = count($sources['source_url']);

			// Check total sources again just for shits and giggles
			if($total_sources){

				// Check if we're only processing a single source
				if($total_sources == 1) $is_single_source = true;

				// Check if single source has title or url set, if title is not set, url will be used as title
				if($is_single_source && $sources['source_url'][0]) $single_source_has_data = true;

				end($sources['source_url']);

				$source_url_key = key($sources['source_url']);

				// Check if single source has data or total sources is greater than 1 before outputting opening UL and heading tags
				if($single_source_has_data || ($total_sources > 1)){
					// Set count title to singular or plural based on amount of sources
					$count_title = _n('Source:', 'Sources:', $total_sources, 'resourcify' );
					// Check if we need to use custom template, if not set the default template code as template code
					if($use_custom_template != 1) $template_code = $default_template_code;

					// Create array values to convert to JSON
					$source_json = array();
					$source_json['resourcify_count_title'] = $count_title;
					$source_json['resourcify_count'] = $total_sources;

					// Loop through all sources creating array
					for ($i = 0; $i <= $source_url_key; $i++){
						if(!$sources['source_url']) continue;
						$source_type = $sources['source_type'][$i];
						$source_title = $sources['source_title'][$i];
						$source_url = $sources['source_url'][$i];

						if ($source_url){
							$source_url = esc_url_raw($source_url);

							if (!$source_title) $source_title = $source_url;

            				$source_json['resourcify_sources'][$i]['source_type'] = $source_type;
            				$source_json['resourcify_sources'][$i]['source_title'] = $source_title;
            				$source_json['resourcify_sources'][$i]['source_url'] = $source_url;
						}
					}

					//sort($source_json['resourcify_sources']);

					// Convert array to JSON to use with Handlebars
					$encoded_source_json = json_encode($source_json);

					// Output template inside script tags (may be changed later on)
					?>
					<script id="resourcify-template" type="text/x-handlebars-template">
						<?php echo $template_code; ?>
					</script>
					<script>
						jQuery(document).ready(function(){
							var resourcify_template_code = jQuery('#resourcify-template').html();
							var resourcify_template = Handlebars.compile(resourcify_template_code);
							var resourcify_data = <?php echo $encoded_source_json; ?>;
							var resourcify_output = resourcify_template(resourcify_data);
							jQuery('#resourcify-output-wrapper').html(resourcify_output);
						});
					</script>
	<?php
				}
			}
		}
	}
?>