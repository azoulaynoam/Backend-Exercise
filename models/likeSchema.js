var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var likeSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    post_id: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true
    }
});

module.exports = likeSchema;