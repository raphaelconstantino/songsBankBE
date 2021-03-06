module.exports = function(app) {
	
	var api = app.api.songs;

	app.route('/v1/songs')
		.get(api.list)
		.post(api.add);

	app.route('/v1/song/name/:name')
		.get(api.fetchByName);

	app.route('/v1/songs/:id')
		.get(api.fetchById)
		.delete(api.removeById)
		.put(api.update);

	app.route('/v1/gendersCount')
		.get(api.genderCount);	

	app.route('/v1/instrummentCount')
		.get(api.instrummentCount);			

	app.route('/v1/statusCount')
		.get(api.statusCount);			

	app.route('/v1/topPlayed')
		.get(api.topPlayed);					

	app.route('/v1/listPlayedByDate')
		.get(api.listPlayedByDate);					
};