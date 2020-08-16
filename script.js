// Create variables to select applicable #ids in index.html

var viewHighscoresButton = document.querySelector("#view-highscores");
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

// Create object within quizContent array to store quiz questions, answer options, and the correct answer  

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

// Set needed global variables: secondsLeft for the timer countdown and userScore to be used to display finalScore at the end of quiz

var secondsLeft = 30;

var userScore = 0;

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

// Initialize quiz by hiding the intro content and showing the quizBody with the first question and answer options populated

startQuizButton.addEventListener("click", startQuiz);

function startQuiz() {
    startQuizButton.addEventListener("click", startQuiz);
    hideElement(quizIntro);
    showElement(quizBody);
    startTimer();
    renderQuestion();
}

// Create global quizContentIndex to help loop through the quizContent array, and create renderQuestion function to populate each set of questions and answers

var quizContentIndex = 0;

function renderQuestion() {
    i = quizContentIndex;
    if (i < quizContent.length && secondsLeft >= 1) {
        quizQuestion.textContent = quizContent[i].question;
        quizOption1.textContent = quizContent[i].options[0].text;
        quizOption2.textContent = quizContent[i].options[1].text;
        quizOption3.textContent = quizContent[i].options[2].text;
        quizOption4.textContent = quizContent[i].options[3].text;
        // renderQuestion should skip to the submission page if there are no quizContent loops remaining
    } else {
        renderSubmission();
    }
}

// Create checkSolution function to check each answer option selected against correct answer

function checkSelection() {
    var selection = quizOptions.value;
    if (i < quizContent.length) {
        if (selection === quizContent[i].answer) {
            showElement(answerResult);
            answerResult.textContent = "Correct!";
            userScore = userScore + 10;
            // this setTimeOut function keeps the answerResult box from flashing too fast; allows user to see the result
            setTimeout(nextQuestion, 500);
        } else if (selection !== "" && selection !== quizContent[i].answer) {
            showElement(answerResult);
            answerResult.textContent = "Wrong!";
            userScore = userScore - 10;
            if (secondsLeft >= 11) {
                secondsLeft = secondsLeft - 10;
            } else {
                secondsLeft = 1;
                renderSubmission();
            }
            setTimeout(nextQuestion, 500);
        }
    }
}

// Add checkSelection function to each click within the quizOptions form (html form that holds all options)

quizOptions.addEventListener("click", checkSelection);

// Create nextQuestion function to tie in with checkSelection function; this iterates to the next quizContent item after a seelction made

function nextQuestion() {
    quizContentIndex++;
    // note that the answerResult box needs to be hidden again as questions and answers are iterated
    hideElement(answerResult);
    renderQuestion();
}

// For simplicity, create two arrays; one to hold each player's intials and one to hold the corresponding player scores

var playerInitials = [];
var playerScores = [];

// Insert and call function to populate playerInitials and playerScores with existing localData before adding data

function getPlayerData() {
    var storedPlayerInitials = JSON.parse(localStorage.getItem("player-initials"));
    if (storedPlayerInitials !== null) {
        playerInitials = storedPlayerInitials;
    }
    var storedPlayerScores = JSON.parse(localStorage.getItem("player-scores"));
    if (storedPlayerScores !== null) {
        playerScores = storedPlayerScores;
    }
}

getPlayerData();

// Now create a function to render the submission card. Data from this card will be pushed into the playerData arrays (end of the playerData arrays if populated with stored data). 

function renderSubmission() {

    hideElement(quizIntro);
    hideElement(quizBody);
    showElement(quizSubmit);

    // To give the player a bonus for completing the quiz quickly, we add 10 points per correct answer (less negative 10 points for wrong answers) and add the total to secondsLeft
    var thisScore = userScore;
    finalScore.textContent = thisScore;

    // Also need to add the current player's initials to playerInitials array
    submitInitials.addEventListener("click", function(event) {

        event.preventDefault();

        var initials = initialInput.value;

        // alert and return out of this function if player does not submit initials
        if (initials === "") {
            alert("You must submit your initials. Use an alias if needed!")
            return;
        }

        // once player submits initials, also push those into the playerInitials array
        playerInitials.push(initials);
        // also push thisScore so that arrays are populated at same time
        playerScores.push(thisScore);

        // Call function to retrieve this + all other player data before rendering to the high scores page
        storeSubmission();
    });
}

function storeSubmission() {
    // stringify playerScore and playInitials and set into localStorage
    localStorage.setItem("player-initials", JSON.stringify(playerInitials));
    localStorage.setItem("player-scores", JSON.stringify(playerScores));
    // after current data is stored, can call renderHighScores
    renderHighScores();
}

function renderHighScores() {

    hideElement(quizSubmit);
    showElement(quizHighscores);

    // using the playerInitials array, loop through the playerData object to display the results
    for (var i = 0; i < playerInitials.length; i++) {
        var renderInitials = playerInitials[i];
        var renderScore = playerScores[i];
        // create a list element for each render and store rendered content in the list element
        var renderLi = document.createElement("li");
        renderLi.textContent = renderInitials + " - " + renderScore;
        // ensure new list element is set to appropriate bootstrap class
        renderLi.setAttribute("class", "list-group-item");
        // append each list element to its parent ul element (already named at beginning of script.js)
        highscoresList.appendChild(renderLi);
    }
}

// Add functionality for viewHighscore, goBack, and clearHighscores elements / buttons

viewHighscoresButton.addEventListener("click", function() {
    hideElement(quizIntro);
    hideElement(quizBody);
    hideElement(quizSubmit);
    storeSubmission();
});

goBackButton.addEventListener("click", function() {
    location.reload();
});

clearHighscoresButton.addEventListener("click", function() {
    highscoresList.innerHTML = "";
    localStorage.clear();
})