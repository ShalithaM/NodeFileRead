var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileDataSchema = Schema({
    data: { type: String, required: true, unique: false },
},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

module.exports = mongoose.model('FileData', FileDataSchema);