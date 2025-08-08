
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    password: 
    {
        type: String,
        required: true
    },
    timezone:
    [
        {
            name:
            {
             type: String
            },
            city:
            {
                type: String
            },
            difference:
            {
                type: Number
            },
        },
    ],
    role: {
        type: String,
        default: 'user',
        required: true,
        enum:['user', 'moderator', 'admin']
    }
})

module.exports = User = mongoose.model('users',UserSchema);