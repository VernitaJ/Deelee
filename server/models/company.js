var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({ 
    name : {type : String},
    address : { street : {type: String},
                number : {type : Number},
                postcode : {type : Number},
                city : {type : String},
            },
    category : { type: String,
        allowedValues: ['restaurant', 'groceries', 'clothing', 'pub']},
});

module.exports = mongoose.model('companies', companySchema);