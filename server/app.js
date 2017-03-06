var express = require('express');
var app = express();
var path = require('path');
var treats = require('./routes/treats');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

/*** Build out a module to manage our treats requests. ***/
app.use('/treats', treats);
app.get('/treats', function(req, res){
  console.log('got treats');
});


// Get static files and req.body
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// Get index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});


app.listen(port, function() {
  console.log('Server running on port: ', port);
});
