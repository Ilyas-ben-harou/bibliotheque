const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

// Routes pour les étudiants
router.get('/', etudiantController.getAllEtudiants);
router.get('/new', etudiantController.getNewEtudiantForm);
router.post('/', etudiantController.createEtudiant);
router.get('/:id', etudiantController.getEtudiantById);
router.get('/:id/edit', etudiantController.getEditEtudiantForm);
router.put('/:id', etudiantController.updateEtudiant);
router.delete('/:id', etudiantController.deleteEtudiant);

module.exports = router;