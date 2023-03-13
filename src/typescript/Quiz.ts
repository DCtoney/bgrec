import quizData from './data/quizzes.json';

/**
 * The `Quiz` class. defines quiz fields for access
 */
export default class Quiz {
    public image: string;
    public title: string;
    public author: string;
    public time: number;
    public info: string;
    public questions: Question[];
    public results: Result[];

    public constructor(quiz: any) {
        Object.keys(quiz).forEach(key => this[key] = quiz[key]);
    }

    /**
     * Applies the impacts of the answer to the scores of the results.
     * 
     * **Parameters**
     * ```ts
     * let answer:Answer
     * ```
     * - the Answer object to be processed
     */
    public processAnswer(answer: Answer) {
        answer.impacts.forEach(impact => {
            this.results.forEach(result => {
                if (result.text === impact[0]) {
                    result.value += impact[1];
                }
            });
        });
    }

    /**
     * Finds the highest scoring result in the list of possible results the user can recieve.
     * 
     * **Returns**
     * 
     * Returns Result object with highest sccore
     */
    public selectResult(): Result {
        let bestResult = this.results[0];

        this.results.forEach(result => {
            if(result.value > bestResult.value) {
                bestResult = result;
            }
        });

        return bestResult;
    }
}

export const quizzes: Quiz[] = []
quizData.quizzes.forEach(quiz => quizzes.push(new Quiz(quiz)));

export interface Answer {
    text: string;
    impacts: [string, number][];
}

export interface Question {
    text: string;
    image: string;
    answers: Answer[];
}

export interface Result {
    value: number;
    text: string;
    info: string;
    suggestions: [string, number][];
}