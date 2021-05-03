var server = require('../server'),
    models = require('../models/models'),
    Tweet = server.connection.model('Tweets', server.tweet),
    ReTweet = server.connection.model('ReTweets', server.retweets),
    Like = server.connection.model('Likes', server.like);

module.exports.retweet = function (req, res) {
    var new_retweet = new ReTweet({
        post_id: req.params.id,
        username: req.body.username,
        timestamp: Date.now()
    })
    new_retweet.save(function (err, retweet) {
        if (err || !retweet)
            res.sendStatus(403)
        else
            res.sendStatus(200)
    })
}

module.exports.get_retweets = async function (req, res) {
    var new_retweets = []
    const retweets = await ReTweet.find({});
    for (const retweet of retweets) {
        var tweet = await Tweet.findById(retweet.post_id)
        new_retweets.push({
            content: tweet.content,
            retweet_user: retweet.username,
            tweet_id: retweet.post_id,
            tweet_user: tweet.username,
            timestamp: retweet.timestamp.toISOString()
        })
    }
    res.json(new_retweets)
}