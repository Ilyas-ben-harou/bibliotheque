

// routes/livres.js
const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');

// Routes pour les livres
router.get('/', livreController.getAllLivres);
router.get('/new', livreController.getNewLivreForm);
router.post('/', livreController.createLivre);
router.get('/:id', livreController.getLivreById);
router.get('/:id/edit', livreController.getEditLivreForm);
router.put('/:id', livreController.updateLivre);
router.delete('/:id', livreController.deleteLivre);

module.exports = router;