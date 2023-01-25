import Quiz, {quizzes} from "./Quiz";

/**
 * Generates text metadata display, exclusively called by createQuizDisplay
 * 
 * **Parameters**
 * ```ts
 * let quiz: Quiz
 * ```
 *  - The quiz whose data is to be read
 * 
 * **Returns**
 * 
 * The created div containing name, author, time to complete, and description for the quiz
 */
export default function displayQuizMetadata(quiz: Quiz): HTMLElement {
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

   return quizData;
}

/**
 * Generates full quiz display card
 * 
 * **Parameters**
 * ```ts
 * let quiz: Quiz
 * ```
 *  - The quiz whose data is to be read
 * 
 * **Returns**
 * 
 * The created div containing all quiz data. It will be clickable to lead to the actual quiz page.
 */
export function createQuizDisplay(quiz: Quiz): HTMLElement {
   let quizCard = document.createElement("div");
   quizCard.classList.add("quiz-card");
   
   let pic = document.createElement("img");
   pic.src = quiz.image;
   pic.classList.add("quiz-thumbnail");
   quizCard.appendChild(pic);

   quizCard.appendChild(displayQuizMetadata(quiz));
   quizCard.onclick = function() {
      sessionStorage.removeItem("quiz");
      sessionStorage.setItem("quiz", JSON.stringify(quiz));
      window.location.href = "./quiz.html"
   };

   return quizCard;
}


let main = document.getElementById("quizzes")!;
quizzes.forEach(quiz => {
   main.appendChild(createQuizDisplay(quiz));
});
