const Emprunt = require('../models/Emprunt');
const Etudiant = require('../models/Etudiant');
const Livre = require('../models/Livre');

// Obtenir tous les emprunts
exports.getAllEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find()
      .populate('etudiant')
      .populate('livre');
    res.render('emprunts/index', { emprunts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher le formulaire de création
exports.getNewEmpruntForm = async (req, res) => {
  try {
    const etudiants = await Etudiant.find();
    const livres = await Livre.find({ quantiteDisponible: { $gt: 0 } });
    res.render('emprunts/new', { etudiants, livres });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Créer un nouvel emprunt
exports.createEmprunt = async (req, res) => {
  try {
    // Vérifier disponibilité du livre
    const livre = await Livre.findById(req.body.livre);
    if (livre.quantiteDisponible <= 0) {
      throw new Error('Ce livre n\'est pas disponible');
    }
    
    // Créer l'emprunt
    const nouvelEmprunt = new Emprunt(req.body);
    await nouvelEmprunt.save();
    
    // Mettre à jour la quantité disponible du livre
    livre.quantiteDisponible -= 1;
    await livre.save();
    
    res.redirect('/emprunts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur: ' + err.message);
  }
};

// Afficher les détails d'un emprunt
exports.getEmpruntById = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id)
      .populate('etudiant')
      .populate('livre');
    if (!emprunt) {
      return res.status(404).send('Emprunt non trouvé');
    }
    res.render('emprunts/show', { emprunt });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher le formulaire de modification
exports.getEditEmpruntForm = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);
    const etudiants = await Etudiant.find();
    const livres = await Livre.find();
    
    if (!emprunt) {
      return res.status(404).send('Emprunt non trouvé');
    }
    
    res.render('emprunts/edit', { emprunt, etudiants, livres });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Mettre à jour un emprunt
exports.updateEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);
    
    // Si on change le statut à "Retourné", mettre à jour la date de retour effective
    if (req.body.statut === 'Retourné' && emprunt.statut !== 'Retourné') {
      req.body.dateRetourEffective = new Date();
      
      // Augmenter la quantité disponible du livre
      const livre = await Livre.findById(emprunt.livre);
      livre.quantiteDisponible += 1;
      await livre.save();
    }
    
    await Emprunt.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/emprunts/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur: ' + err.message);
  }
};

// Supprimer un emprunt
exports.deleteEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);
    
    // Si l'emprunt est toujours en cours, réincrémenter la quantité de livres
    if (emprunt.statut === 'En cours') {
      const livre = await Livre.findById(emprunt.livre);
      livre.quantiteDisponible += 1;
      await livre.save();
    }
    
    await Emprunt.findByIdAndDelete(req.params.id);
    res.redirect('/emprunts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};