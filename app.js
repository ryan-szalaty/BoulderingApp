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
	name: "Yamanashi",
	gyms: [
		{
			gym_name: "Coccinelle Rock",
			location: "Sutamacho Hishi, Hokuto, Yamanashi 408-0102"
		},
		{
			gym_name: "クライミングジムピラニア 富士吉田店",
			location: "4235-1 Kamiyoshida, Fujiyoshida, Yamanashi 403-0005"
		},
		{
			gym_name: "クライミングジムアクティバ（Ａｃｔｉｖ−Ａ)",
			location: "701 Kobarahigashi, Yamanashi, 405-0018"
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