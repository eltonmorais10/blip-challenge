var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var YQL = require('yql');

router.use(express.static(__dirname + '/assetz'));


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html", { layout: path + 'header.html' });
});

router.get('/forecast', function(req, res){
	var city = req.query.city;

	var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"' + city + '\")');


	query.exec(function(err, data) {
		if (err) {
			res.send(JSON.stringify({"status" : "error", "error" : err}));
		} else {
			res.send(JSON.stringify({"status" : "ok", "data" : data}));
		}
		/*
		var location = data.query.results.channel.location;
	  	var condition = data.query.results.channel.item.condition;
	  
	  	console.log("condition" + condition);
	  	console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');*/
	});
	//console.log('body: ' + + JSON.stringify(req.body));
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(4000,function(){
  console.log("Live at Port 4000");
});