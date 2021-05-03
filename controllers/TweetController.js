var server = require('../server'),
    models = require('../models/models'),
    Tweet = server.connection.model('Tweets', server.tweet),
    ReTweet = server.connection.model('ReTweets', server.retweets),
    Like = server.connection.model('Likes', server.like);

/**
 * New Tweet
 * @param {String} req.body.content - Content of the tweet. 
 * @param {String} req.body.username - Usernamer of the tweeter.
 * @returns {JSON} - Returns json object if succeed, else returns error.
 */
exports.tweet = function (req, res) {
    if (req.body.username === undefined || req.body.content === undefined)
        res.sendStatus(403)
    else {
        var new_tweet = new Tweet({
            content: req.body.content,
            username: req.body.username,
            timestamp: Date.now()
        })

        new_tweet.save(function (err, tweet) {
            if (err)
                res.send(err);
            else
                res.json(tweet);
        })
    }
}

/**
 * Get Tweets with likes and retweets count
 * @returns {Array} - Array of JSON's containing all tweets with the added info. 
 */
exports.get_tweets = async function (req, res) {
    const tweets = JSON.parse(JSON.stringify(await Tweet.find({}))),
        new_tweets = [];
    for (const tweet of tweets) {
        var likes = await Like.find({ post_id: tweet.id })
        var retweets = await ReTweet.find({ post_id: tweet.id })
        new_tweets.push({ ...tweet, likes_count: likes.length, retweets_count: retweets.length })
    }
    res.json(new_tweets)
}

/**
 * Tweet Validator - A middleware for validating if a tweet exists.
 * @param {Number} req.params.id - ID of the Tweet
 * @returns {Number} - If NOT Exists then return a 404 error.
 */
exports.tweet_validator = function (req, res, next) {
    Tweet.findById(req.params.id, function (err, tweet) {
        if (err || !tweet)
            res.sendStatus(404);
        else
            next()
        return;
    })
}