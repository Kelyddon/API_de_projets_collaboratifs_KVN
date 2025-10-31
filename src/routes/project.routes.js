const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// Routes for project management
router.post('/', authMiddleware.verifyToken, upload.single('image'), projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', authMiddleware.verifyToken, upload.single('image'), projectController.updateProject);
router.delete('/:id', authMiddleware.verifyToken, projectController.deleteProject);

module.exports = router;