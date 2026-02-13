// app.js

console.log("RUNNING FILE:", __filename);

const nodemailer = require("nodemailer");
require("dotenv").config();

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

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

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    res.redirect("/contact?sent=1");
  } catch (err) {
    console.error(err);
    res.redirect("/contact?sent=0");
  }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});