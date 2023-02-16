import Quiz, {Result} from "./Quiz";
import {Games} from "./Game" // For game result display

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

        let suggestionLink = document.createElement("a");
        suggestionLink.href = "/src/html/game.html"
        suggestionLink.innerHTML = suggestion[0];
        suggestionLink.onclick = function() {
            sessionStorage.setItem("game", JSON.stringify(game));
        }
        suggestionContainer.appendChild(suggestionLink);
        suggestions.appendChild(suggestionContainer);
    });
    return suggestions;
}

function displayQuizResults(quiz: Quiz, quizResult: Result): HTMLElement{
    let resultDiv = document.createElement("div")
    resultDiv.classList.add("results-box")

    let quizTitle = document.createElement("h3")
    resultDiv.appendChild(quizTitle)
    quizTitle.innerText = quiz.title

    let ageScore = document.createElement("H4")
    resultDiv.appendChild(ageScore);
    ageScore.innerHTML = quizResult.text

    let results = document.createElement("h4")
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
