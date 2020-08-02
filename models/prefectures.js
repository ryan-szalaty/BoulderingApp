const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prefectureSchema = new Schema({
	name: String,
	gyms: [
		{
			gym_name: String,
			image: String
		}
	]
});


module.exports = mongoose.model("Prefecture", prefectureSchema);