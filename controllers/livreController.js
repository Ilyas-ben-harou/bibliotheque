const Livre = require('../models/Livre');

// Obtenir tous les livres
exports.getAllLivres = async (req, res) => {
  try {
    const livres = await Livre.find();
    res.render('livres/index', { livres });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher le formulaire de création
exports.getNewLivreForm = (req, res) => {
  res.render('livres/new');
};

// Créer un nouveau livre
exports.createLivre = async (req, res) => {
  try {
    const nouveauLivre = new Livre(req.body);
    await nouveauLivre.save();
    res.redirect('/livres');
  } catch (err) {
    console.error(err);
    res.render('livres/new', { erreur: err.message });
  }
};

// Afficher les détails d'un livre
exports.getLivreById = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) {
      return res.status(404).send('Livre non trouvé');
    }
    res.render('livres/show', { livre });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher le formulaire de modification
exports.getEditLivreForm = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) {
      return res.status(404).send('Livre non trouvé');
    }
    res.render('livres/edit', { livre });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Mettre à jour un livre
exports.updateLivre = async (req, res) => {
  try {
    await Livre.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/livres/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.render('livres/edit', { 
      livre: { ...req.body, _id: req.params.id }, 
      erreur: err.message 
    });
  }
};

// Supprimer un livre
exports.deleteLivre = async (req, res) => {
  try {
    await Livre.findByIdAndDelete(req.params.id);
    res.redirect('/livres');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};
