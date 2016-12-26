var mongoose = require('mongoose');

module.exports = function(app) {

	var api = {};

	var model = mongoose.model('Genders');

	api.list = function(req, res) {

		model.find()
		.then(function(genders) {
			res.json(genders);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});

	};

	api.fetchById = function(req, res) {

		model.findById(req.params.id)
		.then(function(gender) {
			if (!gender) throw new Error('Gender not found');
			res.json(gender);
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
		.then(function(gender) {
			res.json(gender);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res) {

		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(gender) {
			res.json(gender);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		})
	};
	
	console.log(app);
	return api;
};

