var server = require('../server'),
    models = require('../models/models'),
    Like = server.connection.model('Likes', server.like);

/**
 * Like a Tweet
 * @param {Number} req.params.id - ID of the tweet.
 * @param {String} req.body.username - Username of the retweeter.
 */
module.exports.like = function (req, res) {
    var new_like = new Like({
        post_id: req.params.id,
        username: req.body.username,
        timestamp: Date.now()
    })
    new_like.save(function (err, like) {
        if (err || !like)
            res.sendStatus(403)
        else
            res.sendStatus(200)
    })
}