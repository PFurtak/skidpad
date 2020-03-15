const express = require('express');
const router = express.Router();
const CarModel = require('../model/carModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const cars = await CarModel.getAllCars();
  console.log('cars array: ', cars);
  res.render('template', {
    locals: {
      title: 'SkidPad.io',
      cars: cars,
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-vehicles'
    }
  });
});

module.exports = router;
