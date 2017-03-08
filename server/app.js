var express = require('express');
var app = express();
var path = require('path');
var treats = require('./routes/treats');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var port = process.env.PORT || 3000;

/*** Build out a module to manage our treats requests. ***/
app.use('/treats', treats);
app.get('/treats', function(req, res){
  console.log('got treats');
});


// Get static files and req.body
app.use(express.static('./server/public'));


// Get index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.post('/treats', function(req, res) {
   var newTreat = req.body; // comes in as treat
   console.log('newTreat', newTreat);
   pool.connect(function(err, client, done) {
       if (err) {
           console.log('Error connecting to database: ', err);
           res.sendStatus(500);
       } else {
           client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3);',
           [newTreat.name, newTreat.description, newTreat.url],
               function(err, result) {
                   done();
                   if (err) {
                       console.log('Error making the database query: ', err);
                       res.sendStatus(500);
                   } else {
                       res.sendStatus(201);
                       console.log('newTask with newTaskDescription', newTreat);
                   } // end else
               }); //end query
       } // end else
   }); //end pool connect
}); // end router.post


app.listen(port, function() {
  console.log('Server running on port: ', port);
});
