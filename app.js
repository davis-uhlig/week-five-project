const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");
const path = require("path");
const session = require("express-session");
const writeJson = require("write-json");
const fs = require("file-system");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let word = words[Math.floor(Math.random()*words.length)];
console.log(word);
let letters = word.split("");
let underscores = [];


const app = express();

// const indexRouter = require("./routes/indexRoute");

app.use(express.static(path.join(__dirname, "public")));

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: true}));


app.use(session({
  secret: 'aswd',
  resave: false,
  saveUninitialized: false
}));

// app.use("/", indexRouter);

let messages = [];
let correctLetters = [];
let lettersGuessed = [];
let guessesLeft = 8;

letters.forEach(function(newUnderscore){
  underscores.push("_");
});

app.get("/", function(req, res){
  res.render("index", {underscore: underscores, correct: correctLetters, allLetters: lettersGuessed, guesses: guessesLeft, errors: messages});

});
app.get("/gameover", function(req, res){

  res.render("gameover", {words: word});
});

app.get("/winner", function(req, res){
  res.render("winner");
});

app.post("/", function(req, res){
  let match = false;
  messages = [];
  req.checkBody("userGuess", "Please Guess A Letter").notEmpty();
  req.checkBody("userGuess", "Only One Letter At A Time!!").isLength({max: 1});
  req.checkBody("userGuess", "Guess a Letter Not A Number").isAlpha();

  let errors = req.validationErrors();

  if (errors) {
    errors.forEach(function(error) {
      messages.push(error.msg);
      match = true;
    });
  }

  for (var i = 0; i < letters.length; i++) {
    letter = letters[i]

    if (letter === req.body.userGuess) {
      correctLetters.push(letter);
      underscores[i] = letters[i];
      match = true;

    }
  }

  for (var i = 0; i < lettersGuessed.length; i++) {
    guessedLetter = lettersGuessed[i];
    if(guessedLetter === req.body.userGuess){
      messages.push("Try Again, You've Already Guessed That");
      match = true;
    }
  }

  if (match === false) {
    guessesLeft = guessesLeft - 1;
  }



  if(req.body.userGuess){
    lettersGuessed.push(req.body.userGuess)
  }

  if (guessesLeft === 0) {
    res.redirect("/gameover");

  }

  for (var i = 0; i < underscores.length; i++) {
    let underscore = underscores[i];
    if (underscores.indexOf("_") < 0) {
      res.redirect("/winner");
    } else {
    res.redirect("/")
    }
  }

});

app.post("/gameover", function(req, res){
  req.session.destroy();
  word = words[Math.floor(Math.random()*words.length)];
  letters = word.split("");
  underscores = [];
  letters.forEach(function(newUnderscore){
    underscores.push("_");
  });
  lettersGuessed = [];
  guessesLeft = 8;
  res.redirect("/");

});

app.post("/winner", function(req, res){
  req.session.destroy();
  word = words[Math.floor(Math.random()*words.length)];
  letters = word.split("");
  underscores = [];
  letters.forEach(function(newUnderscore){
    underscores.push("_");
  });
  lettersGuessed = [];
  guessesLeft = 8;
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("your app is running on localhost:3000");
});
