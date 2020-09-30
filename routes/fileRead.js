var express = require('express');
var router = express.Router();
var emitter = require('../events/events')

/*
 * Import data models
 */
var FileData = require('../models/fileData');


router.get('/', function (req, res) {

    var printEmitter = emitter.eventsEmitter
    printEmitter.emit('read', './test.txt');

    res.json({ Status: 'Success', Content: {} });
})



router.get('/getData', function (req, res) {
    FileData.find({})
        .exec(function (err, fileData) {
            if (err) {
                console.log(err);
                res.json({ Status: 'Failed', ErrorCode: '#FR001' });
            } else {
                res.json({ Status: 'Success', Content: fileData });
            }
        });
})
module.exports = router;