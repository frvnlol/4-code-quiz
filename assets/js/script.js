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
var scoreEl = document.querySelector('#score');


// Questions and answers variable
var questions = [
    {
        question: "Which country is Thorfinn from?",
        answers: ["1. England", "2. Iceland", "3. Denmark", "4. Vinland"],
        correctAnswer: "2",
    },
    {
        question: "Thofinns father was a  _________",
        answers: ["1. Jomsviking", "2. Pirate", "3. Vikingiking", "4. Civilian"],
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
        "In Season 2, who befriended Thorfinn when they first arrived at the farm?",
        answers: ["1. Ketil", "2. Olmar", "3. Einar", "4. Snake"],
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
        question: "What is Thorfinns most famous quote?",
        answers: [
            "1. I want to be a kinder, gentler person. I want to be a stronger person.",
            "2. Tatakae, Tatakae",
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
  console.log('hi there')
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
  };
  // Move on to next question
  
  currQuestion++;
  if (currQuestion === questions.length){
      clearInterval(timer);
      endGame();
    } else {
        console.log('Hello')
        loadQuestions();
  }
}

// Function for quiz end
function endGame() {
  questionsPg.style.display = "none";
  quizFin.style.display = "block";
  scoreEl.textContent = score;
  timerEl.style.display = 'none';
}

// Event Listeners
startBtn.addEventListener("click", startGame);

choicesBtn.forEach(function (click) {
  click.addEventListener("click", answerCheck);
});
