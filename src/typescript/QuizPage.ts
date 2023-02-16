import Quiz, { Question, Answer } from "./Quiz";   

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

   let radio = document.createElement("input");
   radio.type = "radio";
   radio.name = `${container.id}`;
   

   answerDiv.appendChild(radio);
   answerDiv.appendChild(answerText);

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
   answersDiv.id = `${question.text}`;

   question.answers.forEach(answer => {
      displayAnswer(answersDiv, answer);
   });
   questionDiv.appendChild(answersDiv);

   container.appendChild(questionDiv);
}

console.log(document.body);
let main = document.getElementsByTagName("main")[0]!;
let quiz = new Quiz(JSON.parse(sessionStorage.getItem("quiz")!));


let quizData = document.createElement("div");
quizData.classList.add("quizData");

let title = document.createElement("h2");
title.classList.add("quiz-title");
title.innerText = quiz.title;
quizData.appendChild(title);

let info = document.createElement("h3");
info.classList.add("quiz-data");
info.innerText = `${quiz.author} - ${quiz.time} minutes - ${quiz.questions.length} Questions`;
quizData.appendChild(info);

let description = document.createElement("p");
description.classList.add("quiz-description");
description.innerText = quiz.info;
quizData.appendChild(description);

main.appendChild(quizData);

let questionNum = 1;
const numOfQuestions = quiz.questions.length;
quiz.questions.forEach(question => {
   displayQuestion(main, question, questionNum)
   questionNum++;
});

let button = document.createElement("button");
let selectedAnswerText: string;
button.innerHTML = "See results!";
button.onclick = function() {
   Array.from(main.children).forEach((questionDiv, qstIndex) => {
      if (questionDiv.classList.contains("questionContainer")){
         Array.from(questionDiv.children.item(1)!.children).forEach((answerDiv, ansIndex) => {
            if ((Array.from(answerDiv.children)[0] as HTMLInputElement).checked) {         
               quiz.processAnswer(quiz.questions[qstIndex - 1].answers[ansIndex]);
            }
         });
      }
   });
   sessionStorage.setItem("result", JSON.stringify(quiz.selectResult()));
   window.location.href = "./quiz-results.html"
};

main.appendChild(button);