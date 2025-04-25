const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  // Vérification des identifiants admin
  if (username === 'Admin' && password === 'Admin') {
    req.session.userId = 'admin';
    return res.redirect('/');
  }

  try {
    const user = await User.findOne({ username });
    
    if (!user || user.password !== password) {
      return res.render('auth/login', { error: 'Identifiants incorrects' });
    }
    
    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('auth/login', { error: 'Erreur de connexion' });
  }
};