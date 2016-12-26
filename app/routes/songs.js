module.exports = function(app) {
	
	var api = app.app.api.songs;

	app.route('/v1/songs')
		.get(api.list)
		.post(api.add);

	app.route('/v1/songs/:id')
		.get(api.fetchById)
		.delete(api.removeById)
		.put(api.update);
};