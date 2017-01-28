var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Genders = mongoose.model('Genders');
var Instrumments = mongoose.model('Instrumments');

var schema = mongoose.Schema({

	name: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	genders : {
		type: Schema.Types.ObjectId, 
		ref: 'Genders' 
	},
	instrumments : {
		type: Schema.Types.ObjectId, 
		ref: 'Instrumments' 
	},
	status: {
		type: String,
		required: true
	},
	complexity: {
		type: String,
		required: false // 0 - 10
	},	
	lastReview : {
		type: Date,
		required: false
	},
	masteryDate : {
		type: Date,
		required: false
	},
	description: {
		type: String,
		required: false
	},
	reviewCount : {
		type : Number,
		required : false
	}
});

mongoose.model('Songs', schema);


