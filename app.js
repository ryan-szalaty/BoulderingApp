const express = require("express"),
	  app = express(),
	  mongoose = require("mongoose"),
	  bodyParser = require("body-parser"),
	  Prefecture = require("./models/prefectures");

mongoose.connect("mongodb://localhost:27017/bouldering_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/prefectures", (req, res) => {
	Prefecture.find({}, (err, allPrefectures) => {
		if(err) {
			console.log(err);
		} else {
			res.render("prefectures", {prefecture: allPrefectures});
		}
	})
});

app.get("/prefectures/:id", (req, res) => {
	Prefecture.findById(req.params.id, (err, foundPrefecture) => {
		if(err) {
			console.log(err);
		} else {
			res.render("show", {foundPrefecture: foundPrefecture});
		}
	});
});

Prefecture.create({
	name: "Okinawa",
	gyms: [
		{
			gym_name: "Coral Rock",
			location: "369-2 Chunjun, 中頭郡北中城村 Nakagami District, Okinawa 901-2303"
		},
		{
			gym_name: "LOOK ROCK Bouldering Park",
			location: "〒904-2143 Okinawa, Chibana, 4 Chome−12−1 別館 2F"
		},
		{
			gym_name: "Borubaka",
			location: "882 Ameku, Naha, Okinawa 900-0005"
		},
	]
}, (err, newPrefecture) => {
	if(err) {
		console.log(err);
	} else {
		console.log("Prefecture created.");
	}
}); 

app.listen(process.env.PORT || 3000, process.env.IP, (req, res) => {
	console.log("Server initiated.");
});