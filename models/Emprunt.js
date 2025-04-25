const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema({
  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etudiant',
    required: true
  },
  livre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livre',
    required: true
  },
  dateEmprunt: {
    type: Date,
    default: Date.now
  },
  dateRetourPrevue: {
    type: Date,
    required: true
  },
  dateRetourEffective: {
    type: Date
  },
  statut: {
    type: String,
    enum: ['En cours', 'Retourné', 'En retard'],
    default: 'En cours'
  }
});

module.exports = mongoose.model('Emprunt', empruntSchema);