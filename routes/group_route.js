const express = require('express');
const router = express.Router()

const { create_group, get_group_chats } = require('../controllers/group_controller')


router.post('/create/group', create_group);
router.get('/get/groupchat/:id', get_group_chats);

module.exports = router;
