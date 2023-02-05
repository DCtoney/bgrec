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

    public processAnswer(answer: Answer) {
        answer.impacts.forEach(impact => {
            this.results.forEach(result => {
                if (result.text === impact[0]) {
                    result.value += impact[1];
                }
            });
        });
    }

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