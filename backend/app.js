const createError = require('http-errors');
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
require("./dotenv");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');


const database = require("./database/connexion");
database.connect()
.then(() => {
  console.log("Database connection successful !");

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false })); 

  
  

  // routes
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/login', loginRouter);

  
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
  console.log("Database connection failed !");
  res.status(500).send("Database connection failed ! Verify your database.")
})










