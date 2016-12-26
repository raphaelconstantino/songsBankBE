var mongoose = require('mongoose');

module.exports = function(app) {

	var api = {};

	var model = mongoose.model('Instrumments');

	api.list = function(req, res) {

		model.find()
		.then(function(instrumments) {
			res.json(instrumments);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});

	};

	api.fetchById = function(req, res) {

		model.findById(req.params.id)
		.then(function(instrumment) {
			if (!instrumment) throw new Error('Instrumment not found');
			res.json(instrumment);
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
		.then(function(instrumment) {
			res.json(instrumment);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res) {

		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(instrumment) {
			res.json(instrumment);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		})
	};

	return api;
};

