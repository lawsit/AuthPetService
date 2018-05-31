const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const PetSchema = new Schema({
	name: {
		type: String,
		trim: true,		
		required: true,
	},
	status: {
		type: String,
		trim: true,		
		required: true,
	},
	categoryName: {
		type: String,
		trim: true,		
		required: true,
	},
	origin: {
		type: String,
		trim: true,		
		required: true,
	},
	age: {
		type: Number,
		trim: true,
		required: true
	}
});

module.exports = mongoose.model('Pet', PetSchema)