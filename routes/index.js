const express = require('express');
const router = express.Router();
const CarModel = require('../model/carModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'SkidPad.io'
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

module.exports = router;
