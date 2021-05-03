var express = require('express'),
    mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    app = express(),
    port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var connection = mongoose.createConnection('mongodb://mongo:27017/BackendExercise', { useUnifiedTopology: true });
module.exports.connection = connection;

autoIncrement.initialize(connection);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var routes = require('./routes/routes');
routes(app);

app.listen(port);
console.log('Excersice server has started on port', port);