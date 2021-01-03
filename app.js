const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiId = "51bf09bce9461a0cfb7e5a0f1ee81b61";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiId + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write('<p>Weather is ' + weatherDescription + ' in ' + query + ' .</p>' );
      res.write('<h1>The temperature in ' + query +' is ' + temp + ' degrees celsius.</h1>');
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(port, function(){
  console.log('Server is running on port 3000.');
});
