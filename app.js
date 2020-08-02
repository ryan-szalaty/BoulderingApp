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

/*Prefecture.create({
	name: "Minato",
	gyms: [
		{
			gym_name: "The Wall-E",
			image: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
		}
	]
}, (err, newPrefecture) => {
	if(err) {
		console.log(err);
	} else {
		console.log("Prefecture created.");
	}
}); */

app.listen(process.env.PORT || 3000, process.env.IP, (req, res) => {
	console.log("Server initiated.");
});