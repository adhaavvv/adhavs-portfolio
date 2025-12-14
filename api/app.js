// api/app.js
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

// IMPORTANT: Use __dirname for Vercel
app.set('views', path.join(__dirname, '../views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/coding', (req, res) => {
    res.render('coding');
});

module.exports = app;