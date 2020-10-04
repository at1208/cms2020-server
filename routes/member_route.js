const express = require('express');
const router = express.Router()

const { get_all_members } = require('../controllers/member_controller')


router.get('/get/members',get_all_members);

module.exports = router;
