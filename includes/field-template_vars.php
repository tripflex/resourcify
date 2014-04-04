<strong>The following are the available variables you can use inside the template panel.</strong><br>
<p><code>{{resourcify_count}}</code> - Outputs numerical value of total sources</p><br>
<p><code>{{resourcify_count_title}}</code> - Outputs language specific title (ex. "Sources").</p><br>
<p><code>{{source_type}}</code> - Inside loop will output the Type for each source.</p><br>
<p><code>{{source_title}}</code> - Inside loop will output the Title for each source.</p><br>
<p><code>{{source_url}}</code> - Inside loop will output the URL for each source.</p><br>
<p><code>{{#resourcify_sources}}</code> - start loop of sources</p>
<p><code>{{/resourcify_sources}}</code> - Everything inside these loop tags will be ouptut for each source</p>
<br>
Resourcify uses the very popular and amazing <a href="http://handlebarsjs.com/" target="_blank">Handlebars JS</a> to render and compile templates.