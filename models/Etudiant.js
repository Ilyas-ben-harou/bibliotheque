const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
  matricule: {
    type: String,
    required: true,
    unique: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telephone: {
    type: String
  },
  dateInscription: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Etudiant', etudiantSchema);