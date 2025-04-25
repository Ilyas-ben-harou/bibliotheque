const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/bibliotheque', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  // Vérifier si l'admin existe déjà
  const adminExists = await User.findOne({ username: 'Admin' });
  if (adminExists) {
    console.log('Le compte admin existe déjà');
    process.exit();
  }

  // Créer le compte admin
  const admin = new User({
    username: 'Admin',
    password: 'Admin'
  });

  await admin.save();
  console.log('Compte admin créé avec succès');
  process.exit();
})
.catch(err => {
  console.error('Erreur:', err);
  process.exit(1);
});