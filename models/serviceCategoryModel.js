// product category model 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});
const serviceCategory = mongoose.model("serviceCategory", serviceCategorySchema);
module.exports = serviceCategory;