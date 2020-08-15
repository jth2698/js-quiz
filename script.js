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
var initialInput = document.querySelector("#initials");
var submitInitials = document.querySelector("#submit-initials");
var quizHighscores = document.querySelector("#quiz-highscores");
var highscoresList = document.querySelector("#highscores-list");
var goBackButton = document.querySelector("#go-back-button");
var clearHighscoresButton = document.querySelector("#clear-highscores-button");

// Create objects to store quiz questions and possible answers amd store all question values in array

var quizContent = [{
        question: "Commonly used data types DO NOT include:",
        options: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }
        ],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statment is enclosed within ____.",
        options: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false },
            { text: "parentheses", correct: true },
            { text: "square brackets", correct: false }
        ],
        answer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        options: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true }
        ],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        options: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parentheses", correct: false }
        ],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true }
        ],
        answer: "console.log"
    }
];

var secondsLeft = 10;

var userScore = 0;

var playerData = [];

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
            renderSubmission();
        }
    }, 1000);
}

// Initialize quiz with question and options for first question

startQuizButton.addEventListener("click", startQuiz);

function startQuiz() {
    startQuizButton.addEventListener("click", startQuiz);
    hideElement(quizIntro);
    showElement(quizBody);
    startTimer();
    renderQuestion();
}

var quizContentIndex = 0;

function renderQuestion() {
    i = quizContentIndex;
    if (i < quizContent.length) {
        quizQuestion.textContent = quizContent[i].question;
        quizOption1.textContent = quizContent[i].options[0].text;
        quizOption2.textContent = quizContent[i].options[1].text;
        quizOption3.textContent = quizContent[i].options[2].text;
        quizOption4.textContent = quizContent[i].options[3].text;
    } else {
        renderSubmission();
    }
}

function checkSelection() {
    var selection = quizOptions.value;
    if (i < quizContent.length) {
        if (selection === quizContent[i].answer) {
            console.log("correct");
            showElement(answerResult);
            answerResult.textContent = "Correct!";
            userScore = userScore + 10;
            setTimeout(nextQuestion, 500);
        } else if (selection !== "" && selection !== quizContent[i].answer) {
            console.log("nope");
            showElement(answerResult);
            answerResult.textContent = "Wrong!";
            userScore = userScore - 10;
            setTimeout(nextQuestion, 500);
        }
    }
}

quizOptions.addEventListener("click", checkSelection);

function nextQuestion() {
    quizContentIndex++;
    hideElement(answerResult);
    renderQuestion();
}

function renderSubmission() {

    hideElement(quizIntro);
    hideElement(quizBody);
    showElement(quizSubmit);

    var playerScore = userScore + secondsLeft;
    finalScore.textContent = playerScore;

    submitInitials.addEventListener("click", function(event) {

        event.preventDefault();

        var initials = initialInput.value;
        var playerText = initials + "-" + playerScore;

        if (playerText === "") {
            return;
        }

        playerData.push(playerText);
        submitInitials.value = "";

        renderHighScores();
    });
}

function renderHighScores() {

    hideElement(quizSubmit);
    showElement(quizHighscores);

    for (var i = 0; i < playerData.length; i++) {
        var playerEntry = playerData[i];
        var playerLi = document.createElement("li");
        playerLi.textContent = playerEntry;
        playerLi.setAttribute("class", "list-group-item");
        highscoresList.appendChild(playerLi);
    }

    console.log(playerData);
}