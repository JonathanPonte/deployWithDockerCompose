const mongoose = require('mongoose');

 mongoose.connect('mongodb://mongodb:27017/projectEmprend',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

mongoose.Promise = global.Promise;

module.exports = mongoose;
