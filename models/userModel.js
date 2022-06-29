const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: "{VALUE} is not a valid email address!"
        }

    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 64,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,64}/.test(value);
            },
            message: "{VALUE} is not a valid password!"
        }
    },

    profilePicture: {
        type: String,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    },


});
const User = mongoose.model("User", userSchema);
module.exports = User;