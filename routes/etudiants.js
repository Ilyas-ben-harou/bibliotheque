const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

// Routes pour les étudiants
router.get('/', (req, res) => {
  etudiantController.getAllEtudiants(req, res, { currentPage: 'etudiants' });
});

router.get('/new', (req, res) => {
  etudiantController.getNewEtudiantForm(req, res, { currentPage: 'etudiants' });
});

router.post('/', etudiantController.createEtudiant);

router.get('/:id', (req, res) => {
  etudiantController.getEtudiantById(req, res, { currentPage: 'etudiants' });
});

router.get('/:id/edit', (req, res) => {
  etudiantController.getEditEtudiantForm(req, res, { currentPage: 'etudiants' });
});

router.put('/:id', etudiantController.updateEtudiant);
router.delete('/:id', etudiantController.deleteEtudiant);

module.exports = router;