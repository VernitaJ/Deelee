var express = require('express');
var router = express.Router();
var Deal = ('../models/deal');

// Deals - database functions
router.get('/deals', function(req, res, next) {
    Deal.find(function(err, deals) {
        if (err) {return next(err); } 
        res.json({"deals": deals});
    });
});

router.get('/deals/:id', function(req, res) {
    res.json(deals[req.params.id]);
});

router.post('/deals', function(req, res, next) {
    var deal= new Deal(req.body);
    var new_deal = {
        "id" : id,
        "tag" : req.body.tag,
        "name" : req.body.name
    }
    deal.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(deal);
    });
});

router.delete('/deals', function(req, res){
    var deals = deals;
    delete deals;
});

router.put ('/deals:id', function(req,res){
    var id = req.params.id;
    var updated_deal = {
        "id" : id,
        "tag" : req.body.tag,
        "name" : req.body.name
    }
    deals[id] =updated_deal;
    res.json(updated_deal);
});

module.exports = router;