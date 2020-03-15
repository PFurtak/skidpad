const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');
const bcrypt = require('bcryptjs');

router.get('/signup', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Sign Up',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-signup'
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Login',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-login'
    }
  });
});

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

  const user = new UserModel(null, username, null, password);
  const loginResponse = await user.loginUser();
  console.log('loginResponse is', loginResponse.isValid);

  console.table(loginResponse);

  if (!!loginResponse.isValid) {
    req.session.is_logged_in = loginResponse.isValid;
    req.session.user_id = loginResponse.user_id;
    req.session.username = loginResponse.username;
    res.redirect('/');
  } else {
    res.sendStatus(403);
  }
});

const { userValidationRules, validate } = require('../validator');
router.post('/signup', userValidationRules(), validate, async function(
  req,
  res,
  next
) {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = new UserModel(null, username, email, hash);

  user
    .addUser({
      username: req.body.username,
      email: req.body.password,
      password: req.body.password
    })
    .then(user => res.json(user));
  // res.sendStatus(200);
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
