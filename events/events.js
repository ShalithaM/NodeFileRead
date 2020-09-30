var events = require("events");
var fs = require('fs')

/*
 * Import data models
 */
var FileData = require('../models/fileData');

/*
 * Bind events
 */
var eventsEmitter = new events.EventEmitter();

eventsEmitter.on('read', readFileContent);
eventsEmitter.on('write', writeFileContent);


//Read file data event
function readFileContent(fileName) {
    console.log("Reading " + fileName + " file started");
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            eventsEmitter.emit('write', data);
        }
    });
}

//Write file data event
function writeFileContent(data) {
    console.log("Write file data to db");

    FileData.find({})
        .exec(function (err, fileData) {
            if (err) {
                console.log(err);
            } else {
                if (fileData.length == 0) {
                    //save file data into db
                    var newFileData = new FileData()

                    newFileData.data = data

                    newFileData.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                else {
                    //update file data into db
                    FileData.update({}, {
                        $set: {
                            data: data
                        }
                    },
                        {
                            new: true
                        },
                        function (err, updatedDetails) {
                            if (err) {
                                console.log(err);
                            }
                        });
                }
            }
        });
}


exports.eventsEmitter = eventsEmitter