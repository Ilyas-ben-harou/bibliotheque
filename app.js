const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
require('dotenv').config(); // Ensure you load environment variables

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bibliotheque';
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
  process.exit(1);  // Exit the process if MongoDB connection fails
});

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-here', // Make sure you use a secure key
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'lax'
  },
  name: 'myapp.sid'
}));

// Set userId to locals
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

// Middleware pour vérifier l'authentification
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// Import des routes
const etudiantRoutes = require('./routes/etudiants');
const livreRoutes = require('./routes/livres');
const empruntRoutes = require('./routes/emprunts');
const authRoutes = require('./routes/auth');

// Routes Auth (non protégées)
app.use('/', authRoutes);

// Routes protégées
app.use('/etudiants', requireLogin, etudiantRoutes);
app.use('/livres', requireLogin, livreRoutes);
app.use('/emprunts', requireLogin, empruntRoutes);

// Page d'accueil (protégée)
app.get('/', requireLogin, (req, res) => {
  res.render('index');
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).send('Page non trouvée');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
