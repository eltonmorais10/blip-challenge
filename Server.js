var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var YQL = require('yql');

// use the assetz dir in the application
router.use(express.static(__dirname + '/assetz'));

// console.log the requested method, just for fun
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

// when access the localhost:4000 then show index page
router.get("/",function(req,res){
  res.sendFile(path + "index.html", { layout: path + 'header.html' });
});

// used for the AJAX call at the index page
// and also for test purpose
router.get('/forecast', function(req, res){
	var city = req.query.city;

	var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"' + city + '\")');


	query.exec(function(err, data) {
		if (err) {
			res.send(JSON.stringify({"status" : "error", "error" : err}));
		} else {
			res.send(JSON.stringify({"status" : "ok", "data" : data}));
		}
	});
});

// attribute the built router
app.use("/",router);

// in case anyone tries to access to another location
// redirects them to the 404 page
app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

// set the application to listen at the port 4000
app.listen(4000,function(){
  console.log("Live at Port 4000");
});