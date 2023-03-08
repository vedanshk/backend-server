const express = require("express");

const morgan = require("morgan");
const router = require('./router');
const PORT = 4001;
// app setup
const app = express();

// adding body parser and logging middleware
app.use(morgan("combined"));

app.use(express.json({type: '*/*'}));

app.use(express.urlencoded({ extended: false }));


//  routes setup
router(app);









// start server
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
