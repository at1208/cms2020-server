const express = require('express');
const router = express.Router()

const { create_project, get_all_project } = require('../controllers/project_controller')

const { projectValidator } = require('../validators/project');
const { runValidation }  = require('../validators/index');

router.post('/create/project', projectValidator, runValidation, create_project);
router.get('/get/projects', get_all_project);

module.exports = router;
