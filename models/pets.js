const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
	petname     : {
		type     : String,
		required : true
	},
	petage      : {
		type     : Number,
		required : true
	},
	breed       : {
		type     : String,
		required : true
	},

	color       : {
		type     : String,
		required : true
	},
	phone       : {
		type     : String,
		required : true
	},
	pet_image   : {
		type : String
	},
	owner_email : {
		type : String
	},
	owner_email : {
		type : String
	}
});

const Pets = mongoose.model('Pets', PetSchema);

module.exports = Pets;
