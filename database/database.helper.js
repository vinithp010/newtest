const mongoose = require('mongoose')
const config = require("../configs/env.config");

const DBURI = config.database.DBURI

mongoose.connect(DBURI, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
console.log(DBURI)

db.on('connected', function () {
    console.log('Mongoose default connection open to ' + DBURI);
});
    
  // If the connection throws an error
db.on('error',function (err) { 
    console.log('Mongoose default connection error: ' + err);
}); 
  
  // When the connection is disconnected
db.on('disconnected', function () { 
    console.log('Mongoose default connection disconnected'); 
});
  
  // If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {   
    db.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
});

module.exports ={
    db
}