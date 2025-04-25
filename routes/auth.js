const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Page de login (GET)
router.get('/login', (req, res) => {
    if (req.session.userId) return res.redirect('/');
    res.render('auth/login', { error: null });
});

// Traitement du login (POST)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.render('auth/login', { error: 'Email ou mot de passe incorrect' });
    }

    req.session.userId = user._id;
    res.redirect('/');
});

// Page de register (GET)
router.get('/register', (req, res) => {
    if (req.session.userId) return res.redirect('/');
    res.render('auth/register', { error: null });
});

// Traitement du register (POST)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
        return res.render('auth/register', { error: 'Cet email est déjà utilisé' });
    }

    const user = new User({ username, email, password });
    await user.save();

    req.session.userId = user._id;
    res.redirect('/');
});

// Déconnexion (GET)
router.get('/logout', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const sessionCookieName = req.session.cookie.name || 'myapp.sid';

    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion :', err);
            return res.redirect('/');
        }

        res.clearCookie(sessionCookieName, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.redirect('/login');
    });
});

module.exports = router;
