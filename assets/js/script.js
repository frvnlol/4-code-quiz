// Start Page
var startEl = document.querySelector("#start-page");
var startBtn = document.querySelector("#start-btn");

// Question page elements.
var questionsPg = document.querySelector("#questions-pg");
var questionTitle = document.querySelector("#questions");
var answersEl = document.querySelector("#answer-key");
var checkAnswer = document.querySelector("#correct-incorrect");

// List of answers to choose from.
var choicesBtn = document.querySelectorAll(".choices-btn");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

// Highscores and Timer
var timerEl = document.querySelector("#time-left");
var viewHighscores = document.querySelector("#view-Highscores");

// Quiz finished screen
var quizFin = document.querySelector("#quiz-fin");
var submitBtn = document.querySelector("#submit-btn");
var backBtn = document.querySelector("#back-btn");
var userInitials = document.querySelector("#user-initials");

var clearHighscores = document.querySelector("#clear-hs");
var highscoresPg = document.querySelector("#highscores-pg");
var highscoresEl = document.querySelector("#highscore-list");
var scoreEl = document.querySelector("#score");

// Questions and answers variable
var questions = [
  {
    question: "Where are Thorfinn and his family from?",
    answers: ["1. England", "2. Iceland", "3. Denmark", "4. Vinland"],
    correctAnswer: "2",
  },
  {
    question: "Thofinns father was a  _________",
    answers: ["1. Jomsviking", "2. Pirate", "3. Viking", "4. Civilian"],
    correctAnswer: "1",
  },
  {
    question: "After the fall of King Sweyn, who took over as King of Denmark?",
    answers: [
      "1. Canute",
      "2. Askeladd",
      "3. Harald II",
      "4. Canute and Harald",
    ],
    correctAnswer: "3",
  },
  {
    question:
      "Vinland Saga season 2 is animated by _______",
    answers: ["1. Wit Studio", "2. Studio Perriot", "3. Mappa", "4. Studio Ghibli"],
    correctAnswer: "3",
  },
  {
    question: "How does Thorkell know Thorfinns father, Thors?",
    answers: [
      "1. They were enemies",
      "2. They were both Jomsvikings",
      "3. They met in Iceland",
      "4. All of the above",
    ],
    correctAnswer: "2",
  },
  {
    question: "Which of these is said by Thorfinn?",
    answers: [
      "1. I want to be a kinder, gentler person. I want to be a stronger person.",
      "2. Does not have one",
      "3. Believe it!",
      "4. When granted everything, you cant do anything",
    ],
    correctAnswer: "1",
  },
];

//
var timerCount = 60;
var currQuestion = 0;
var score = 0;
var timer;

// Starts game after Start Journey button is clicked.
function startGame() {
  startEl.style.display = "none";
  questionsPg.style.display = "block";
  currQuestion = 0;
  startTimer();
  loadQuestions(currQuestion);
}

// Starts timer when startGame function is initiated.
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = "Time: " + timerCount;
    if (timerCount <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Displays current question and answers associated with that given question.
function loadQuestions() {
  questionTitle.textContent = questions[currQuestion].question;
  answer1.textContent = questions[currQuestion].answers[0];
  answer2.textContent = questions[currQuestion].answers[1];
  answer3.textContent = questions[currQuestion].answers[2];
  answer4.textContent = questions[currQuestion].answers[3];
}

// Checks whether user answer is correct or wrong. Then moves onto next question.
function answerCheck(event) {
  event.preventDefault();
  // Displays whether correct or incorrect
  checkAnswer.style.display = "block";
  setTimeout(function () {
    checkAnswer.style.display = "none";
  }, 2000);

  // Check to see if answer is correct or wrong
  if (questions[currQuestion].correctAnswer === event.target.value) {
    checkAnswer.textContent = "Correct";
    score = score + 25;
  } else {
    timerCount = timerCount - 15;
    checkAnswer.textContent = "Wrong";
  }
  // Move on to next question

  currQuestion++;
  if (currQuestion === questions.length) {
    clearInterval(timer);
    endGame();
  } else {
    loadQuestions();
  }
}

// Function for quiz end
function endGame() {
  questionsPg.style.display = "none";
  quizFin.style.display = "block";
  scoreEl.textContent = score + " / 150";
  timerEl.style.display = "none";
}

function showHighscores() {
  var scores = readScores();
  console.log(scores[0].name);
  console.log(scores[0].score)
  highscoresPg.style.display = "block";
  questionsPg.style.display = "none";
  startEl.style.display = "none";
  quizFin.style.display = 'none';

  for(var i = 0; i < scores.length; i++){
   var scoreList = document.createElement('li');
   scoreList.textContent = scores[i].name + ":  " + scores[i].score;
   highscoresEl.appendChild(scoreList);
  }
}

function storedScores() {
  var initials = userInitials.value;
  console.log(initials);
  var nameScore = {
    name: initials,
    score: score,
  }
 var scoreArr = readScores();
 if (scoreArr === null){
  scoreArr = [];
 };
  // add initials and score to the array
  scoreArr.push(nameScore);
  // sort array by score
  scoreArr.sort((a, b) => b.score - a.score);
  // turn the JS object into a string JSON.stringify
  var scoreString = JSON.stringify(scoreArr);
  // store string in localStorage localStorage.setItem(itemName);
  localStorage.setItem('scores', scoreString);
 
  showHighscores();
}

function readScores() {

  // get data from localStorage localStorage.getItem(itemName);
  var getScores = localStorage.getItem('scores');
  // turn the string into a JS object JSON.parse
  var parseScores = JSON.parse(getScores);
  // return
  return parseScores;
}

function clearHS() {
  highscoresEl.innerHTML = '';
}

function refresh() {
  window.location.reload();
}

// Event Listeners
startBtn.addEventListener("click", startGame);
viewHighscores.addEventListener("click", showHighscores);
submitBtn.addEventListener('click', storedScores);
clearHighscores.addEventListener('click', clearHS)
backBtn.addEventListener('click', refresh);
choicesBtn.forEach(function (click) {
  click.addEventListener("click", answerCheck);
});

