// deliveryman model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceMan = new Schema({
    userId: {
        ref: "users",
        type: Schema.Types.ObjectId,
        required: true
    },
    localisation: {
        location: {
            lat: {
                type: Number,
                required: false
            },
            lng: {
                type: Number,
                required: false
            }
        },
    },
    age: {
        type: Number,
        required: false
    },
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});
const serviceManModel = mongoose.model("serviceMan", serviceMan);
module.exports = serviceManModel;



