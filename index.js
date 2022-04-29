const express = require("express");

const mongoose = require("mongoose");
const todoHandler = require('./todoHandler')
const port = 5000
const app = express();
app.use(express.json())




mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("Something went wrong", e);
  });


  // application routes
app.use("/todo", todoHandler);

  function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }



app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
