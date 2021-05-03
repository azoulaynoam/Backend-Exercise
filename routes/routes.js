 'use strict';

module.exports = function(app) {
    var tweets = require('../controllers/tweetController');
    var retweets = require('../controllers/reTweetController')
    var likes = require('../controllers/likeController')

    app.route('/tweets')
        .get(tweets.get_tweets)
        .post(tweets.create_new_tweet)
    
    app.route('/tweets/:id/retweet')
        .post(tweets.tweet_validator, retweets.retweet)

    app.route('/tweets/:id/likes')
        .post(tweets.tweet_validator, likes.like)

    app.route('/retweets')
        .get(retweets.get_retweets)
}