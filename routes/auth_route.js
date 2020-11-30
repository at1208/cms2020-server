const express = require('express');
const router = express.Router()

const { inviteonBoard, signup, signin, one_tap_google_login, google_user_profile  } = require('../controllers/auth_controller')

const { memberValidator } = require('../validators/member');
const { runValidation }  = require('../validators/index');

router.post('/invite-on-board',memberValidator, runValidation, inviteonBoard);
router.post('/signup', signup);
router.post('/signin', signin);
router.post("/google/onetap/login", one_tap_google_login);

router.get("/get/google/user/:id", google_user_profile )

module.exports = router;
