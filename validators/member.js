const { check } = require('express-validator');

exports.memberValidator = [
      check('firstName')
      .not()
      .isEmpty()
      .withMessage('First name is required'),

      check('lastName')
      .not()
      .isEmpty()
      .withMessage('Last name is required'),

      check('email')
      .not()
      .isEmpty()
      .withMessage('Email name is required'),

      check('contactNumber')
      .not()
      .isEmpty()
      .withMessage('Contact name is required'),

      check('designation')
      .not()
      .isEmpty()
      .withMessage('Designation name is required'),

      check('department')
      .not()
      .isEmpty()
      .withMessage('Department name is required'),

];
