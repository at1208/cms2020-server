const express = require('express');
const router = express.Router()

const { create_contact, } = require('../controllers/contact_controller')


router.post('/create/contact', create_contact);


module.exports = router;
