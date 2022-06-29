const express = require('express');
const cors = require('cors');
const app = express();


const PORT = 5000;
const { connect } = require("./config/index.js");
// cookie parser
const cookieParser = require('cookie-parser');
// cors middleware
app.use(cors());
app.use(cookieParser());


app.use(express.json());
// import user router from userRoutes.js
const userRouter = require("./api_routes/userRoutes.js");
// import service router from serviceRoutes.js
const serviceRouter = require("./api_routes/serviceRoutes.js");
// import service category router from serviceCategoryRoutes.js
const serviceCategoryRouter = require("./api_routes/serviceCategoryRoutes.js");


app.use(express.static('public'));
app.use(express.static('images'));

app.use('/api/user', userRouter);
app.use('/api/service', serviceRouter);
app.use('/api/serviceCategory', serviceCategoryRouter);




app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
    connect();
});
