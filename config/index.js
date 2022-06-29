require('dotenv').config();
// mongoose
const mongoose = require('mongoose');
// connect mongoose
function connect() {
    mongoose
        .connect(process.env.URL, {
            useNewUrlParser: true,
        })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));
}
module.exports = { connect }