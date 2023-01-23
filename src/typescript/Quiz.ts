/**
 * The `Quiz` class.
 */
export default class Quiz {

    private questions = new Map<Question, Answer | null>();

    /**
     * Adds questions to this quiz.
     * 
     * **Parameters**
     * ```ts
     * let questions: Question[]
     * ```
     * - The questions to add
     * 
     * **Example**
     * ```ts
     * let quiz = new Quiz();
     * 
     * let question: Question = {
     *     text: "What is your favorite color?",
     *     choices: [
     *         {
     *             text: "Green",
     *             weightCategory: "color",
     *             weightValue: 10
     *         }
     *     ]
     * };
     * 
     * quiz.addQuestion(question);
     * ```
     * 
     */
    public addQuestion(...questions: Question[]): void {
        questions.forEach(question => this.questions.set(question, null));
    }

    public answer(question: Question, answer: Answer): void {
       this.questions.set(question, answer);
    }
}

export interface Answer {
    text: string;
    weightCategory: string;
    weightValue: number;   
}

export interface Question {
    text: string;
    choices: Answer[];
}
