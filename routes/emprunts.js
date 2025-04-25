const express = require('express');
const router = express.Router();
const empruntController = require('../controllers/empruntController');

// Routes pour les emprunts
router.get('/', (req, res) => {
  empruntController.getAllEmprunts(req, res, { currentPage: 'emprunts' });
});

router.get('/new', (req, res) => {
  empruntController.getNewEmpruntForm(req, res, { currentPage: 'emprunts' });
});

router.post('/', empruntController.createEmprunt);

router.get('/:id', (req, res) => {
  empruntController.getEmpruntById(req, res, { currentPage: 'emprunts' });
});

router.get('/:id/edit', (req, res) => {
  empruntController.getEditEmpruntForm(req, res, { currentPage: 'emprunts' });
});

router.put('/:id', empruntController.updateEmprunt);
router.delete('/:id', empruntController.deleteEmprunt);

module.exports = router;