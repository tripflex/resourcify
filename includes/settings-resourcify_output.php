        <div class="wrap">
            <h2><?php echo __( 'Resourcify Ouput', 'resourcify'); ?></h2>
            <?php
            	if( !empty( $_GET['settings-updated'] ) && $screen->parent_base != 'options-general' ){
					echo '<div class="updated settings-error" id="setting-error-settings_updated">';
					echo '<p><strong>' . __('Settings saved.', 'resourcify') . '</strong></p></div>';
				}
            ?>            
            <p><?php echo __("Output Sources","resourcify"); ?></p>
            <form method="post" action="options.php" class="resourcify-options-form">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'resourcify_output' );
                do_settings_sections( 'resourcify_output' );
