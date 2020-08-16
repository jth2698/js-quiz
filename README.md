# js-quiz
A timed JavaScript quiz

## Overview
This is a timed JavaScript quiz. The quiz consists of a simple html page styled with Bootstrap and minimal additional css. The quiz itself is powered by the scripts.js file.

## The HTML and CSS
The index.html file consists of the following:
1. Standard head.
2. body divs as follows -
    1. A header with a View Highscores button and a timer.
    2. A body card with intro text and a start quiz button.
    3. Another body card with a question container.
    4. Another body card with an initial submit form.
    5. A final body card with a high score list.
All body cards except for the intro card are hidden (in the styles.css file) by default.

## The JS
The scripts.js file powers the quiz. The scripts.js file works as follows - 
1. First, the js target all elements needed to power the quiz.
2. Second, the js creates an object to hold predetermined questions and answer options.
3. Third, the js sets the quiz time (secondsLeft) and a default user score of "0".
4. Fourth, basic functions are created to show or hide cards as needed.
5. Fifth, functions are created to set the time and to trigger coutdown when user clicks the startQuiz button.
6. Sixth, the startQuiz button displays the first question via a renderQuestion function.
7. Seventh, functions are created to loop through the questions object and to display applicable questions and answer options.
8. Eighth, a checkSelection function is called within the renderQuestion function to check user's selection against the correct answer.
9. Ninth, a nextQuestion function is called within the checkSelection function to manage iteration through the questions object.
10. Tenth, empty arrays for the player's initials and score are created by default.
11. Eleventh, a getPlayerData function is called to populate the arrays with any data from localStorage. getPlayerData is always called to ensure arrays are populated with local data.
12. Twelfth, a renderSubmission function is created to log current data into the arrays upon user submission through the html submit form.
13. Thirteenth, new arrays inclusive of user submission are stringified and stored in localStorage.
14. Fourteenth, a renderHighScore function is called within the storage function to display all highscores through creation of list elements within the html high score list.
15. Fifteenth, logic is added to the view high score, go back, and clear high score buttons to complete quiz functionality.

## Final thoughts.
This was hard.
