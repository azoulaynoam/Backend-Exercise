var server = require('../server'),
    models = require('../models/models'),
    Tweet = server.connection.model('Tweets', server.tweet),
    ReTweet = server.connection.model('ReTweets', server.retweets),
    Like = server.connection.model('Likes', server.like);

module.exports.like = function(req, res){
        var new_like = new Like({
            post_id: req.params.id,
            username: req.body.username,
            timestamp: Date.now()
        })
        new_like.save(function(err, like){
            if (err || !like)
                res.sendStatus(403)
            else
                res.sendStatus(200)
        })
    }