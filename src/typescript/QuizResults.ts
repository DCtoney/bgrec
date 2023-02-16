import Quiz from "./Quiz";
import Game from "./Game" // For game result display

function displayQuizResults(quiz: Quiz): void{
    let resultDiv = document.createElement("div")
    resultDiv.classList.add("results-box")
    
    let quizTitle = document.createElement("h3")
    resultDiv.appendChild(quizTitle)
    quizTitle.innerText = quiz.title

    let quizResult = JSON.parse(sessionStorage.getItem("result")!);

    let ageScore = document.createElement("H4")
    resultDiv.appendChild(ageScore)
    ageScore.innerHTML = `Your recommended age rage is ${quizResult.text}`
    
    let results = document.createElement("h4")
    resultDiv.appendChild(results)
    results.innerText = quizResult.info

    document.body.appendChild(resultDiv)
}

let theQuiz = JSON.parse(sessionStorage.getItem("quiz")!);
displayQuizResults(theQuiz)
