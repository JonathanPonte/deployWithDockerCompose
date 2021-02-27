const mongoose = require('../../database');


const PeopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date
    },
    academicEducation:{
        type: String
    },
    profession:{
        type:String 
    },
    genre:{
        type:String
    },
    user: {
        //forma que o mongo guarda um objeto no banco
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const People = mongoose.model('People', PeopleSchema);

module.exports = People;
