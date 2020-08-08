// Create objects to store quiz questions and possible answers

var questions = {
    question1: "Commonly used data types DO NOT include:",
    question2: "The condition in an if / else statment is enclosed within ____.",
    question3: "Arrays in JavaScript can be used to store ____.",
    question4: "String values must be enclosed within ____ when being assigned to variables.",
    question5: "A very useful tool used furing development and debugging for printing content to the debugger is:",
}

var answerOptions = {
    question1Options: ["1. strings", "2. booleans", "3. numbers", "4. numbers"],
    question2Options: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    question3Options: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    question4Options: ["1. commas", "2., curly brackets", "3. quotes", "4. parentheses"],
    question5Options: ["1. JavaScript", "2. terminal/bash", "3. for loops", "console.log"]
}

// Create variables to select applicable #ids in index.html

var startQuizButton = document.querySelector("#start-quiz-button");
var quizQuestion = document.querySelector("#quiz-question");
var quizOptions = document.querySelector("#quiz-options");
var answerResult = document.querySelector("#answer-result");
var finalScore = document.querySelector("#final-score");
var submitInitials = document.querySelector("#submit-initials");
var highscoresList = document.querySelector("#highscores-list");
var goBackButton = document.querySelector("#go-back-button");
var clearHighscoresButton = document.querySelector("#clear-highscores-button");



// Start quiz to hide introduction and show first question




document.addEventListener("keydown", keydown);