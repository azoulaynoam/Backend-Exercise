var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tweetSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    content: {
        type: String,
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
}, {versionKey: false, });

tweetSchema.methods.toJSON = function () {
    return {
      id: this._id,
      content: this.content,
      username: this.username,
      timestamp: this.timestamp.toISOString()
    }
}

module.exports = tweetSchema;