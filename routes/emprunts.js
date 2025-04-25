

// routes/emprunts.js
const express = require('express');
const router = express.Router();
const empruntController = require('../controllers/empruntController');

// Routes pour les emprunts
router.get('/', empruntController.getAllEmprunts);
router.get('/new', empruntController.getNewEmpruntForm);
router.post('/', empruntController.createEmprunt);
router.get('/:id', empruntController.getEmpruntById);
router.get('/:id/edit', empruntController.getEditEmpruntForm);
router.put('/:id', empruntController.updateEmprunt);
router.delete('/:id', empruntController.deleteEmprunt);
module.exports = router;