var express = require('express');
var app = express();
var mongoose = require('mongoose');
var blog = require('./routes/blog');
var bodyParser = require('body-parser');

var db_config = {
  development: "mongodb://localhost/blog",
  test: "mongodb://localhost/blog-test"
}

var app_env = app.settings.env;
mongoose.connect(db_config[app_env], function(err, res) {
  console.log('Connect to database : ' + db_config[app_env]);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/blog', blog);

app.listen(3000);
module.exports = app;
