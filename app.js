const createError = require('http-errors');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("./backend/dotenv");

const indexRouter = require('./backend/routes/index');
const usersRouter = require('./backend/routes/users');
const loginRouter = require('./backend/routes/login');
const voitureRouter = require('./backend/routes/voitures');

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URL,{ useUnifiedTopology: true })
.then(() => {
  console.log("Database connection successful !");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req,res,next)=> {
    res.set("Access-Control-Allow-Origin","*");
    res.set("Access-Control-Allow-Headers",
    "*");
    res.set("Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,PUT,OPTIONS");
    next();
  });

  app.use(express.static(path.join(__dirname, 'dist/garage')));

  // routes
  app.use('/api', indexRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/client/voitures',voitureRouter);
  app.use('/api/login', loginRouter);

  // Catch all other routes and return the index file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/garage/index.html'));
    // res.render("index.html")
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // Listen
  const port = process.env.PORT || 5000;
  app.listen(port, function () {
    console.log(`Listening on ${port}`)
  })

}).catch((error)=>{
  console.error("Database connection failed !");
  console.error(error)
})










