import Quiz, { Question, Answer } from "./Quiz";   
import displayQuizMetadata from "./QuizHomePage";

/**
 * generates element for individual answer
 * 
 * **Parameters**
 * ```ts
 * let container: HTMLElement 
 * ```
 *  - The containing element that holds the answer elements
 * 
 * ```ts
 * let answer: Answer
 * ```
 *  - The answer to be displayed
 */
function displayAnswer(container: HTMLElement, answer: Answer): void {
   let answerDiv = document.createElement("div");
   answerDiv.classList.add("answer");

   let answerText = document.createElement("p");
   answerText.classList.add("answer-text");
   answerText.innerText = answer.text;
   answerDiv.appendChild(answerText);

   answerDiv.onclick = function () {
      quiz.processAnswer(answer);
   }

   container.appendChild(answerDiv);
}

/**
 * generates header with Question Data
 * 
 * **Parameters**
 * ```ts
 * let container: HTMLElement 
 * ```
 *  - The containing element that holds the question elements
 * 
 * ```ts
 * let question: Question
 * ```
 *  - The question being displayed
 * 
 * ```ts
 * let questionNum: number
 * ```
 *  - what number question is being displayed to help see progress
 * 
 */
function displayQuestionInfo(container: HTMLElement, question: Question, questionNum: number): void {
   let questionInfo = document.createElement("div");
   questionInfo.classList.add("question-info");

   if(question.image != null) {
      let pic = document.createElement("img");
      pic.src = question.image;
      pic.classList.add("question-thumbnail");
      questionInfo.appendChild(pic);
   }

   let questionTitle = document.createElement("h4");
   questionTitle.innerText = `Question ${questionNum}/${numOfQuestions}: ${question.text}`;
   questionTitle.classList.add("question-title");
   questionInfo.appendChild(questionTitle);

   container.appendChild(questionInfo);
}

/**
 * generates full Question display 
 * 
 * **Parameters**
 * ```ts
 * let container: HTMLElement 
 * ```
 *  - The containing element that holds the question elements
 * 
 * ```ts
 * let question: Question
 * ```
 *  - The question being displayed
 * 
 * ```ts
 * let questionNum: number
 * ```
 *  - what number question is being displayed to help see progress
 * 
 */
function displayQuestion(container: HTMLElement, question: Question, questionNum: number): void {
   let questionDiv = document.createElement("div");
   questionDiv.classList.add("questionContainer");

   displayQuestionInfo(questionDiv, question, questionNum)
   
   let answersDiv = document.createElement("div");
   answersDiv.classList.add("answers-container");

   question.answers.forEach(answer => {
      displayAnswer(answersDiv, answer);
   });
   questionDiv.appendChild(answersDiv);

   container.appendChild(questionDiv);
}

let main = document.getElementById("quizzes")!;
let quiz = JSON.parse(sessionStorage.getItem("quiz")!);

displayQuizMetadata(quiz);

let questionNum = 1;
const numOfQuestions = quiz.questions.length;
quiz.questions.forEach(question => {
   displayQuestion(main, question, questionNum)
   questionNum++;
});

let button = document.createElement("button");
button.innerHTML = "See results!";
button.onclick = function() {
   sessionStorage.setItem("result", quiz.selectResult());
   window.location.href = "./results.html"
};
main.appendChild(button);