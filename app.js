// app.js

console.log("RUNNING FILE:", __filename);

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

app.get('/design', (req, res) => {
  console.log("HIT /design");
  res.render('design');
});

app.get('/certifications', (req,res) => res.render('certifications'));

app.get('/contact', (req, res) => {
  res.render('contact');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});