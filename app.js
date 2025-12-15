// app.js

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
  });

app.get('/coding', (req, res) => {
    res.render('coding');
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});