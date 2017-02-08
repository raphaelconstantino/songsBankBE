var mongoose = require('mongoose');

module.exports = function(app) {

	var api = {};

	var model = mongoose.model('Songs');

	api.genderCount = function (req, res) {
		var agg = [
			{
				$group : {
					_id : "$genders",
					total : {$sum: 1},
					genders : {$first:'$genders'},
				}
			},
			{
				$project : {
					_id : 0,
					total : 1,
					genders : 1,
				}
			}
		];

		model.aggregate(agg, function(err, genders)
		{

			model.populate( genders, { "path": "genders" }, function(err, results) {
				if (err) throw err;
				
				res.json(results);
			});
			
		});
	}

	api.statusCount = function (req, res) {
		var agg = [{
				$group: {
					_id: "$status",
					count: { $sum: 1 }
				}
			}
		];

		model.aggregate(agg, function(err, results)
		{
			if (err) throw err;
			res.json(results);
		});
	}

	api.instrummentCount = function (req, res) {
		var agg = [
			{
				$group : {
					_id : "$instrumments",
					total : {$sum: 1},
					instrumments : {$first:'$instrumments'},
				}
			},
			{
				$project : {
					_id : 0,
					total : 1,
					instrumments : 1,
				}
			}
		];

		model.aggregate(agg, function(err, instrumments)
		{

			model.populate( instrumments, { "path": "instrumments" }, function(err, results) {
				if (err) throw err;
				
				res.json(results);
			});
			
		});
	}	

	api.list = function(req, res) {

		var query = {}
		
		if (req && req.query)
		{
			if (req.query.status)
			{
				query.status = req.query.status;
			}

			if (req.query.genders)
			{
				query.genders = req.query.genders;
			}

			if (req.query.instrumments)
			{
				query.instrumments = req.query.instrumments;
			}

			if (req.query.complexity)
			{
				query.complexity = req.query.complexity;
			}
		}	

		model.find(query)
		.populate("genders")
		.populate("instrumments")
		.sort({status: 1, lastReview: 1})
		.exec(function(err, songs) {
			res.json(songs);
		});

	};

	api.fetchById = function(req, res) {
		
		model.findById(req.params.id)
		.populate("genders")
		.populate("instrumments")
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
			res.json(song);
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

	return api;
};

