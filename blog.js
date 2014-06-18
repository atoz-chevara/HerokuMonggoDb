
var databaseUrl = "mongodb://yanipra:d1200pyani@dbh63.mongolab.com:27637/pemilba"; 
var collections = ["news"]
var db = require("mongojs").connect(databaseUrl, collections);


var data = [];

//db ge_Data
  exports.getBlogEntries = function(){
  	db.news.find('', function(err, users) {
  		if( err || !users) console.log("No users found");
    	else 
  		{
    		//res.writeHead(200, {'Content-Type': 'text/plain'});
    		str='';
    		users.forEach( function(user) {
      			str = str + user.body +'\n';
    		});
    	

    	data = str;
    	return data;
    	console.log(data);
  		}
  	});
  }



/*//getdata
exports.getBlogEntries = function() {
 mongo.Db.connect(mongoUri, function (err, db) {
 	 db.collection('news', function(er, collection) {
 	 	collection.find();
 	 	 console.log(collection.find().toArray());
 	 });

 });
}*/