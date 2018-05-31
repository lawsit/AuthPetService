//Set up mongoose connection 
const mongoose = require('mongoose');
  
mongoose.connect(process.env.CUSTOMCONNSTR_PetConnectionString); 

mongoose.Promise = global.Promise;
console.log('DB connected');

module.exports = mongoose; 