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
function displayQuizMetadata(quiz: Quiz): HTMLElement {
   let quizData = document.createElement("div");
   quizData.classList.add("quizData");
   
   let title = document.createElement("h2");
   title.innerText = quiz.title;
   quizData.appendChild(title);

   let info = document.createElement("h3");
   info.innerText = `${quiz.author} - ${quiz.time} minutes`;
   quizData.appendChild(info);
   
   let description = document.createElement("p");
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
function createQuizDisplay(quiz: Quiz): HTMLElement {
   let quizCard = document.createElement("div");
   
   let pic = document.createElement("img");
   quizCard.classList.add("quizCard");
   pic.src = quiz.image;
   quizCard.appendChild(pic);

   quizCard.appendChild(displayQuizMetadata(quiz));
   quizCard.onclick = function() {
      sessionStorage.setItem("quiz", JSON.stringify(quiz));
      window.location.href = "./quiz.html"
   };

   return quizCard;
}


let main = document.getElementById("quizzes")!;
quizzes.forEach(quiz => {
   main.appendChild(createQuizDisplay(quiz));
});
