var express = require("express");
var logfmt = require("logfmt");
var hbs = require('hbs');
var mongojs = require('mongojs');

var logger = require('morgan');
var bodyParser = require('body-parser');


var databaseUrl = "mongodb://yanipra:d1200pyani@dbh63.mongolab.com:27637/pemilba"; 
var collections = ["news"]
var db = require("mongojs").connect(databaseUrl, collections);

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//-- setting app using hbs to parse .html remove it.
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(logfmt.requestLogger());
app.use(express.static('public'));

//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); 

//showing on index page
app.get('/', function (req, res) {
  db.news.find('', function(err, users) {
  if( err || !users) console.log("No users found");
    else 
  {
    res.render('index',{title:"Blog me", entries: users} )
  }
  });

});

//show per id
app.get('/article/:id', function(req, res) {
  console.log(req.params.id);
  db.news.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, users) {
  if( err || !users) console.log("No users found");
    else 
    {
      res.render('article',{title:"Blog me", blog: users} )
    }
  });
});

//edit
app.get('/edit/:id', function(req, res){
  console.log(req.params.id);
  db.news.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, users) {
  if( err || !users) console.log("No users found");
    else 
    {
      res.render('edit',{title:"Blog me", blog: users} )
    }
  });

});

//update 
app.post('/updatedata', function(req, res)
  {
    console.log(req.body);
    var idvar = req.body.id;
    var titlevar = req.body.title;
    var isivar = req.body.isi;
    var date = req.body.date;
    console.log(idvar + " " + titlevar + isivar);

  
    db.news.update({ _id: mongojs.ObjectId(idvar) },{title: req.body.title, body:req.body.isi, published:date})

    res.redirect('/');

  });

//add 
app.post('/adddata', function(req, res)
  {
    console.log(req.body);
    var idvar = req.body.title;
    var isivar = req.body.isi;
    var date = req.body.example1;

     db.news.insert({title:idvar, body: isivar, published:date})

    res.redirect('/');
  }
);

//about page
app.get('/about',function(req, res)
{
	res.render('about',{title:"About Me"})
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var port = Number(process.env.PORT || 6000);
app.listen(port, function() {
  console.log("Listening on " + port);
});