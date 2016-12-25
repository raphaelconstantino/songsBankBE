var mongoose = require('mongoose');

var schema = mongoose.Schema({

    login: {
        type: String, 
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    nome : {
    	type: String, 
        required: true
    }
});

mongoose.model('Usuario', schema);