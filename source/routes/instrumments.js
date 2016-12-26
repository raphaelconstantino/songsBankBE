module.exports = function(app) {
	
	var api = app.api.instrumments;

	app.route('/v1/instrumments')
		.get(api.list)
		.post(api.add);

	app.route('/v1/instrumments/:id')
		.get(api.fetchById)
		.delete(api.removeById)
		.put(api.update);
};