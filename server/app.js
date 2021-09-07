var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*var db = mongoose.connect('mongodb://localhost:27017/deelee', {useNewUrlParser: true}); */

var morgan = require('morgan');
var path = require('path');

var userSchema = new Schema({ 
    firstName : {type : String},
    lastName : {type: String},
    age : {type : Number},
    location : {type : String}
})

var companySchema = new Schema({ 
    name : {type : String},
    address : { street : {type: String},
                number : {type : Number},
                postcode : {type : Number},
                city : {type : String},
            },
    category : { type: String,
        allowedValues: ['restaurant', 'groceries', 'clothing', 'pub']},
})

var User = mongoose.model("users", userSchema);
var Company = mongoose.model("companies", companySchema);

var cors = require('cors');
var history = require('connect-history-api-fallback');

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deeleedb';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Users - database functions
app.get('/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {return next(err); } 
        res.json({"users": users});
    });
});

app.post('/users', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
});

// Companies - database functions
app.get('/companies', function(req, res, next) {
    Company.find(function(err, companies) {
        if (err) {return next(err); } 
        res.json({"companies": companies});
    });
});

app.post('/companies', function(req, res, next) {
    var company = new Company(req.body);
    company.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(company);
    });
});

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
