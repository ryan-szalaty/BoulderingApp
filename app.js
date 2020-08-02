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
	name: "Akita",
	gyms: [
		{
			gym_name: "タカ・クライミングジム",
			location: "9-10 Kotobukicho, Yokote, Akita 013-0025"
		},
		{
			gym_name: "ガラパカ クライミング",
			location: "1 Chome-3-7 Yabaseohata, Akita, 010-0962"
		},
		{
			gym_name: "クラムボンクライミング",
			location: "〒024-0004 Iwate, Kitakami, Murasakino, 14 Chiwari−457-4"
		},
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