const { check } = require('express-validator');

exports.projectValidator = [
      check('projectName')
      .not()
      .isEmpty()
      .withMessage('Project name is required'),

      check('domainAddress')
      .not()
      .isEmpty()
      .withMessage('Domain address is required'),

      check('teamMember')
      .not()
      .isEmpty()
      .withMessage('Team member is required'),

      check('teamLeader')
      .not()
      .isEmpty()
      .withMessage('Team leader is required')
];
