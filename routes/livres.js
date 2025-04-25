const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');

// Routes pour les livres
router.get('/', (req, res) => {
  livreController.getAllLivres(req, res, { currentPage: 'livres' });
});

router.get('/new', (req, res) => {
  livreController.getNewLivreForm(req, res, { currentPage: 'livres' });
});

router.post('/', livreController.createLivre);

router.get('/:id', (req, res) => {
  livreController.getLivreById(req, res, { currentPage: 'livres' });
});

router.get('/:id/edit', (req, res) => {
  livreController.getEditLivreForm(req, res, { currentPage: 'livres' });
});

router.put('/:id', livreController.updateLivre);
router.delete('/:id', livreController.deleteLivre);

module.exports = router;