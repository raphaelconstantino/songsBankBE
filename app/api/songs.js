var mongoose = require('mongoose');

module.exports = function(app) {

	var api = {};

	var model = mongoose.model('Songs');

	api.list = function(req, res) {

		model.find()
		.populate("genders")
		.populate("instrumments")
		.exec(function(err, songs) {
			res.json(songs);
		});

	};

	api.fetchById = function(req, res) {

		model.findById(req.params.id)
		.then(function(song) {
			if (!song) throw new Error('Song not found');
			res.json(song);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
	};

	api.removeById = function(req, res) {

		model.remove({'_id' : req.params.id})
		.then(function() {
			res.sendStatus(200);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});

	};

	api.add = function(req, res) {

		model.create(req.body)
		.then(function(song) {
			api.list(null, res);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res) {

		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(song) {
			res.json(song);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		})
	};

	console.log(app);
	return api;
};

