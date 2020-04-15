  
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	  extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/baseball', {
   useNewUrlParser: true
});

const scoreSchema = new mongoose.Schema({
   username: String,
   score: String, 
 });
 
 const Score = mongoose.model('Score', scoreSchema);

app.post('/api/scores', async (req, res) => {
   const score = new Score({
     username: req.body.username,
     score: req.body.score,
   });
   try {
     await score.save();
     res.send(score);
   } catch (error) {
     console.log(error);
     res.sendStatus(500);
   }
 });

 app.get('/api/scores', async (req, res) => {
   try {
     let scores = await Score.find();
     res.send(scores);
   } catch (error) {
     console.log(error);
     res.sendStatus(500);
   }
 });


 // find a way to store the BofM file here rather than front end? faster?
app.listen(3000, () => console.log('Server listening on port 3000!'));
