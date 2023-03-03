import Quiz, {Result} from "./Quiz";
import {Games} from "./Game" // For game result display

/**
 * Helper function to generate suggestions for results.
 * 
 * **Parameters**
 * ```ts
 * let result:Result
 * ```
 *  - The Result object to pull the data from
 * 
 * **Returns**
 * 
 * The created div containing all required information about the game suggestions for the result.
 */
function displaySuggestions(result: Result): HTMLElement {
    let suggestions = document.createElement("div");
    suggestions.classList.add("suggestions-container")
    result.suggestions.forEach(suggestion => {
        let game = Games.getGameByID(suggestion[1]);

        let suggestionContainer = document.createElement("div");
        suggestionContainer.classList.add("suggestion");

        let suggestionImage = document.createElement("img");
        suggestionImage.src = game.imageLink;
        suggestionContainer.appendChild(suggestionImage);

        let suggestionName = document.createElement("p");
        suggestionName.innerHTML = suggestion[0];
        suggestionContainer.appendChild(suggestionName);
        
        suggestionContainer.onclick = function() {
            sessionStorage.setItem("game", JSON.stringify(game));
            window.location.href = "/src/html/gameDisplay.html";
        }
        suggestions.appendChild(suggestionContainer);
    });
    return suggestions;
}

/**
 * Generates all required elements for overview of the user results after quiz.
 * 
 * **Parameters**
 * ```ts
 * let quiz: Quiz
 * ```
 *  - The Quiz object from storage that has been completed
 * ```ts
 * let quizResult: Result
 * ```
 *  - The Result object selected by the user's choices.
 * 
 * 
 * **Returns**
 * 
 * The created div containing all required information about the user result
 */
function displayQuizResults(quiz: Quiz, quizResult: Result): HTMLElement{
    let resultDiv = document.createElement("div")
    resultDiv.classList.add("results-box")

    let quizTitle = document.createElement("h3")
    resultDiv.appendChild(quizTitle)
    quizTitle.innerText = quiz.title

    let ageScore = document.createElement("H4")
    resultDiv.appendChild(ageScore);
    ageScore.innerHTML = quizResult.text

    let results = document.createElement("p")
    resultDiv.appendChild(results)
    results.innerText = quizResult.info

    return resultDiv;
}

let main = document.getElementById("quiz-results")!;
let theQuiz = JSON.parse(sessionStorage.getItem("quiz")!);
let quizResult = JSON.parse(sessionStorage.getItem("result")!);
main.appendChild(displayQuizResults(theQuiz, quizResult));

if(quizResult.suggestions != null) {
    main.appendChild(displaySuggestions(quizResult));
}
