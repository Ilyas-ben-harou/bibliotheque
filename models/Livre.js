const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  titre: {
    type: String,
    required: true
  },
  auteur: {
    type: String,
    required: true
  },
  categorie: {
    type: String
  },
  anneePublication: {
    type: Number
  },
  quantiteDisponible: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model('Livre', livreSchema);