// Create variables to select applicable #ids in index.html

var timeLeft = document.querySelector("#time-left");
var quizIntro = document.querySelector("#quiz-intro");
var startQuizButton = document.querySelector("#start-quiz-button");
var quizBody = document.querySelector("#quiz-body");
var quizQuestion = document.querySelector("#quiz-question");
var quizOptions = document.querySelector("#quiz-options");
var quizOption1 = document.querySelector("#quiz-option-1");
var quizOption2 = document.querySelector("#quiz-option-2");
var quizOption3 = document.querySelector("#quiz-option-3");
var quizOption4 = document.querySelector("#quiz-option-4");
var answerResult = document.querySelector("#answer-result");
var quizSubmit = document.querySelector("#quiz-submit");
var finalScore = document.querySelector("#final-score");
var submitInitials = document.querySelector("#submit-initials");
var quizHighscores = document.querySelector("#quiz-highscores");
var highscoresList = document.querySelector("#highscores-list");
var goBackButton = document.querySelector("#go-back-button");
var clearHighscoresButton = document.querySelector("#clear-highscores-button");

// Create objects to store quiz questions and possible answers amd store all question values in array

var questions = {
    question1: "Commonly used data types DO NOT include:",
    question2: "The condition in an if / else statment is enclosed within ____.",
    question3: "Arrays in JavaScript can be used to store ____.",
    question4: "String values must be enclosed within ____ when being assigned to variables.",
    question5: "A very useful tool used during development and debugging for printing content to the debugger is:"
}

var allQuestions = Object.values(questions);

// 

var answerOptions = {
    question1Options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    question2Options: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    question3Options: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    question4Options: ["1. commas", "2., curly brackets", "3. quotes", "4. parentheses"],
    question5Options: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"]
}

var allAnswerOptions = Object.values(answerOptions);

// 

var correctAnswers = {
    question1Answer: "3. alerts",
    question2Answer: "3. parentheses",
    question3Answer: "4. all of the above",
    question4Answer: "4. parentheses",
    question5Answer: "4. console.log"
}

var allCorrectAnswers = Object.values(correctAnswers);

// 

var secondsLeft = 60;

// Create hide element function to hide content by adding .hide class as buttons are clicked

function hideElement(element) {
    element.className += " hide";
}

// Create show element function to show content by removing .hide class as buttons are clicked

function showElement(element) {
    element.classList.remove("hide");
}

// Create function to set quiz timer when startQuizButtonClicked

function setTime() {
    timeLeft.textContent = secondsLeft;
}

// Create timer countdown function

function startTimer() {
    setTime();
    timerInterval = setInterval(function() {
        secondsLeft--;
        timeLeft.textContent = secondsLeft;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Initialize quiz

function initializeQuiz() {
    for (i = 0; i < allQuestions.length; i++) {
        quizQuestion.textContent = allQuestions[i];
        quizOption1.textContent = allAnswerOptions[i][0];
        quizOption2.textContent = allAnswerOptions[i][1];
        quizOption3.textContent = allAnswerOptions[i][2];
        quizOption4.textContent = allAnswerOptions[i][3];
        checkAnswer();
    }
}

function checkAnswer() {
    for (i = 0; i < allQuestions.length; i++) {
        let correctAnswer = allCorrectAnswers[i];
        quizOptions.addEventListener("click", function() {
            if (quizOptions.value === correctAnswer) {
                showElement(answerResult);
                answerResult.textContent = "Correct!";
                return;
            }
            if (quizOptions.value !== correctAnswer) {
                showElement(answerResult);
                answerResult.textContent = "Wrong!";
                return;
            }
        })
    }
}

// Begin quiz and time on startQuizButton click

function startQuiz() {
    hideElement(quizIntro);
    showElement(quizBody);
    startTimer();
    initializeQuiz();
}


startQuizButton.addEventListener("click", startQuiz);