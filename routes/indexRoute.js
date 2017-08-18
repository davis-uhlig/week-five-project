// const express = require('express');
// const router = express.Router();
// const main = require("../models/index");
// const fs = require("file-system");
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
// let word = words[Math.floor(Math.random()*words.length)];
// console.log(word);
// let letters = word.split("");
//
// let underscores = [];
// let messages = [];
// let correctLetters = [];
// let lettersGuessed = [];
// let guessesLeft = 8;
//
// underscores = main.pushUnderscore(letters);
//
// router.get("/", function(req, res){
//   res.render("index", {underscore: underscores, correct: correctLetters, allLetters: lettersGuessed, guesses: guessesLeft, errors: messages});
//
// });
//
// router.post("/", function(req, res){
//   let match = false;
//   messages = [];
//   req.checkBody("userGuess", "Please Guess A Letter").notEmpty();
//   req.checkBody("userGuess", "Only One Letter At A Time!!").isLength({max: 1});
//   req.checkBody("userGuess", "Guess a Letter Not A Number").isAlpha();
//
//   let errors = req.validationErrors();
//
//   if (errors) {
//     errors.forEach(function(error) {
//       messages.push(error.msg);
//       match = true;
//     });
//   }
//
//   for (var i = 0; i < letters.length; i++) {
//     letter = letters[i]
//
//     if (letter === req.body.userGuess) {
//       correctLetters.push(letter);
//       underscores[i] = letters[i];
//       match = true;
//
//     }
//   }
//
//   for (var i = 0; i < lettersGuessed.length; i++) {
//     guessedLetter = lettersGuessed[i];
//     if(guessedLetter === req.body.userGuess){
//       messages.push("Try Again, You've Already Guessed That");
//       match = true;
//     }
//   }
//
//   if (match === false) {
//     guessesLeft = guessesLeft - 1;
//   }
//
//   if(req.body.userGuess){
//     lettersGuessed.push(req.body.userGuess)
//   }
//
//   if (guessesLeft === 0) {
//     res.render("gameover", {words: word});
//   } else {
//
//   for (var i = 0; i < underscores.length; i++) {
//     let underscore = underscores[i];
//     if (underscores.indexOf("_") < 0) {
//       res.redirect("/winner");
//     } else {
//     res.redirect("/")
//     }
//   }
// }
// });
//
// module.exports = router;
