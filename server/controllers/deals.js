var express = require('express');
var router = express.Router();
var Deal = require('../models/deal');

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
    Deal.delete(function (err, deals) {
        if (err) {return next(err); }
        res.status(200).json(deal);
    });
});

router.delete('/deals/:id', function(req, res){
    var id = req.params.id;
    var deal = deals[id];
    deal.delete(function(err) {
        if (err) {return next(err); }
        res.status(200).json(deal);
    });    
});

router.put ('/deals/:id', function(req,res){
    var id = req.params.id;
    var updated_deal = {
        "id" : id,
        "tag" : req.body.tag,
        "name" : req.body.name
    }
    deals[id] =updated_deal;
    res.json(updated_deal);
});

router.patch('/deals/:id', function(req, res){
    var id = req.params.id;
    var deal = deals[id];
    var updated_deal = {
        "id" : id,
        "tag" : (req.body.tag || deal.tag),
        "name" : (req.body.name || deal.name)
    };
    deals[id] = updated_deal;
    res.json(updated_deal)
});

module.exports = router;