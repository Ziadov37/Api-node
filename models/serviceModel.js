// product model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    category: {
        ref: "Category",
        type: Schema.Types.ObjectId,
    },
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;