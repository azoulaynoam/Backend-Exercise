'use strict';

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    uniqueValidator = require('mongoose-unique-validator'),
    tweetSchema = require('./tweetSchema'),
    likeSchema = require('./likeSchema'),
    reTweetSchema = require('./reTweetSchema');

tweetSchema.plugin(autoIncrement.plugin, 'Tweets');
tweetSchema.plugin(uniqueValidator);
reTweetSchema.plugin(autoIncrement.plugin, 'ReTweets');
reTweetSchema.plugin(uniqueValidator);
likeSchema.plugin(autoIncrement.plugin, 'Likes');
likeSchema.plugin(uniqueValidator);

module.exports.tweet = mongoose.model('Tweets', tweetSchema);
module.exports.reTweet = mongoose.model('ReTweets', reTweetSchema);
module.exports.like = mongoose.model('Likes', likeSchema);