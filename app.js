const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bibliotheque';


const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'votre_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Middleware pour vérifier l'authentification
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// Routes
const etudiantRoutes = require('./routes/etudiants');
const livreRoutes = require('./routes/livres');
const empruntRoutes = require('./routes/emprunts');
const authRoutes = require('./routes/auth');

app.use('/etudiants', requireLogin, etudiantRoutes);
app.use('/livres', requireLogin, livreRoutes);
app.use('/emprunts', requireLogin, empruntRoutes);
app.use('/auth', authRoutes);

// Route d'accueil
app.get('/', requireLogin, (req, res) => {
  res.render('index');
});

// Route de login
app.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

// Route de logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});