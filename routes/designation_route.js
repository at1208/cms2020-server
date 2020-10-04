const express = require('express');
const router = express.Router()

const { create_designation, get_all_designations } = require('../controllers/designation_controller')


router.post('/create/designation', create_designation);
router.get('/get/designations',get_all_designations);

module.exports = router;
