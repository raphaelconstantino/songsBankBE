var mongoose = require('mongoose');

module.exports = function(app) {

	var api = {};

	var model = mongoose.model('Songs');

	api.genderCount = function (req, res) {
		var agg = [
			{$group: {
				_id: "$genders",
				total: {$sum: 1}
			}}
		];

		model.aggregate(agg, function(err, logs)
		{
			if (err) { console.log(err); }

			res.json(logs);
		});
	}

	api.list = function(req, res) {

		model.find()
		.populate("genders")
		.populate("instrumments")
		.sort({status: 1, lastReview: 1})
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
			api.list(null, res);
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
			api.list(null, res);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		})
	};

	return api;
};

