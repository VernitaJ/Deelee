var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({ 
    firstName : {type : String},
    lastName : {type: String},
    age : {type : Number},
    location : {type : String}
});

module.exports = mongoose.model('users', userSchema);