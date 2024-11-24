const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    userName: {
        type: String,
        required : true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    photoUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/03/05/08/38/character-2117975_1280.png"
    }
    
})

const User = mongoose.model('User', userSchema);

module.exports =  User;

