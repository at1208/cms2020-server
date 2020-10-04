const express = require('express');
const router = express.Router()

const { create_department, get_all_departments } = require('../controllers/department_controller')


router.post('/create/department', create_department);
router.get('/get/departments',get_all_departments);

module.exports = router;
