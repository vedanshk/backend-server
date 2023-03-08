const express = require("express");

const morgan = require("morgan");

const PORT = 4001;
// app setup
const app = express();

// adding body parser and logging middleware
app.use(morgan("combined"));
app.use(express.json({type: '*/*'}));

app.use(express.urlencoded({ extended: false }));


// get routes
app.get('/' , (req , res)=>{

        res.json("Hello");


});









// start server
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
