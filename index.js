const express = require("express");

const morgan = require("morgan");
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4001;
// app setup
const app = express();



//DB setup

//mongoose.connect('mongdb://locahost:auth/auth');


// adding body parser and logging middleware

app.use(morgan("combined"));
app.use(cors());
app.use(express.json({type: '*/*'}));

app.use(express.urlencoded({ extended: false }));


//  routes setup
router(app);









// start server
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
