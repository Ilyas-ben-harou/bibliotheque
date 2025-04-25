const Etudiant = require('../models/Etudiant');

// Obtenir tous les étudiants
exports.getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find();
    res.render('etudiants/index', { etudiants });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher le formulaire de création
exports.getNewEtudiantForm = (req, res) => {
    res.render('etudiants/new', { 
      etudiant: { prenom: '', nom: '', matricule: '', email: '', telephone: '' }
    });
  };

// Créer un nouvel étudiant
exports.createEtudiant = async (req, res) => {
  try {
    const nouvelEtudiant = new Etudiant(req.body);
    await nouvelEtudiant.save();
    res.redirect('/etudiants');
  } catch (err) {
    console.error(err);
    res.render('etudiants/new', { erreur: err.message });
  }
};

// Afficher les détails d'un étudiant
exports.getEtudiantById = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) {
      return res.status(404).send('Étudiant non trouvé');
    }
    res.render('etudiants/show', { etudiant });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher le formulaire de modification
exports.getEditEtudiantForm = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) {
      return res.status(404).send('Étudiant non trouvé');
    }
    res.render('etudiants/edit', { etudiant });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// Mettre à jour un étudiant
exports.updateEtudiant = async (req, res) => {
  try {
    await Etudiant.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/etudiants/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.render('etudiants/edit', { 
      etudiant: { ...req.body, _id: req.params.id }, 
      erreur: err.message 
    });
  }
};

// Supprimer un étudiant
exports.deleteEtudiant = async (req, res) => {
  try {
    await Etudiant.findByIdAndDelete(req.params.id);
    res.redirect('/etudiants');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};