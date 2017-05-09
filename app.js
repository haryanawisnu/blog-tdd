var express = require('express');
var app = express();
var mongoose = require('mongoose');
var blog = require('./routes/blog');
var bodyParser = require('body-parser');
var cors = require('cors')

var db_config = {
  development: "mongodb://localhost/blog",
  test: "mongodb://localhost/blog-test"
}

var app_env = app.settings.env;
mongoose.connect(db_config[app_env], function(err, res) {
  console.log('Connect to database : ' + db_config[app_env]);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
  next()
});


// app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//Corse


app.use('/blog', blog);

app.listen(3000);
module.exports = app;
