const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
  return [
    // username must be 5 chars long
    body('username').isLength({ min: 5 }),
    //email must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  res.render('template', {
    locals: {
      title: 'User Sign Up',
      extractedErrors: extractedErrors,
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-signup'
    }
  });
};

module.exports = {
  userValidationRules,
  validate
};
