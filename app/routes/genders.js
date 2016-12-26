module.exports = function(app) {
	
	if (app.api === null || app.api === undefined)
	{
		return;
	}

	var api = app.api.genders;

	app.route('/v1/genders')
		.get(api.list)
		.post(api.add);

	app.route('/v1/genders/:id')
		.get(api.fetchById)
		.delete(api.removeById)
		.put(api.update);
};