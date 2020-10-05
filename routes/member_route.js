const express = require('express');
const router = express.Router()

const { get_all_members, get_member_by_id } = require('../controllers/member_controller')


router.get('/get/members', get_all_members);
router.get('/get/member/:id', get_member_by_id);

module.exports = router;
