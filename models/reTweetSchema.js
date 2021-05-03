var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var reTweetSchema = new Schema({
    post_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

module.exports = reTweetSchema;