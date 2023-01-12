const express = require('express');
const router = express.Router();
const method = require("../security/method");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/',method.ensureToken, (req, res, next) => {
  res.status(200).send("Coucou")
});



module.exports = router;
