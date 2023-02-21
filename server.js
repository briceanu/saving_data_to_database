require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
mongoose.set('strictQuery', true);

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.DB_KEY);

const schema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  age: Number,
});
//
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
//create a schema
const Model = mongoose.model('Model', schema);
app.post('/', (req, res) => {
  let newPost = new Model({
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    age: req.body.age,
  });
  newPost.save();
  res.redirect('/');
});
app.listen(8080, () => {
  console.log(' app listening at port 8080');
});
