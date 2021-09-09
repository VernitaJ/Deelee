var express = require('express');
var router = express.Router();
var Company = ('../models/company');

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

module.exports = router;