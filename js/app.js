jQuery(document).ready(function ($) {

	/**
	 * YQL supports JSONP & CORS!
	 * http://developer.yahoo.com/yql/
	 * http://stackoverflow.com/a/8579158
	 */

	var projectSlug = 'awesome-support',
		endpoint = 'https://www.transifex.com/_/userspace/ajax/widgets/languages/project/' + projectSlug + '/?all=1';

	if (sessionStorage.getItem(projectSlug + '-translations')) {

		renderTranslations();

	} else {

		$.getJSON('//query.yahooapis.com/v1/public/yql', {
				q: 'select * from json where url=\"' + endpoint + '&fmt=JSON\"',
				format: 'json'
			},
			function (data) {
				if (data.query.results) {
					sessionStorage.setItem(projectSlug + '-translations', JSON.stringify(data.query.results.json));
					renderTranslations();
				} else {
					alert('Something went wrong. Please try again.');
				}
			}
		);

	}

	function renderTranslations() {

		var json = $.parseJSON(sessionStorage.getItem(projectSlug + '-translations')),
			getTemplate = $('#languages-template').html(),
			template = Handlebars.compile(getTemplate);

		// Render the table
		$('#language-list').html(template(json));

		// Count translations
		$('#languages-count').text(json.languages.length);
	}

});