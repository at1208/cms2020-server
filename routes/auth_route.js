const express = require('express');
const router = express.Router()

const { inviteonBoard, signup, signin } = require('../controllers/auth_controller')

const { memberValidator } = require('../validators/member');
const { runValidation }  = require('../validators/index');

router.post('/invite-on-board',memberValidator, runValidation, inviteonBoard);
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
