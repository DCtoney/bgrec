import quizData from './data/quizzes.json';

export const quizzes = quizData.quizzes as Quiz[];
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

    public processAnswer(answer: Answer) {
        answer.impacts.forEach(impact => {
            this.results.forEach(result => {
                if (result.text === impact[0]) {
                    result.value += impact[1];
                }
            });
        });
    }
}

export interface Answer {
    text: string;
    impacts: [string, number][];
}

export interface Question {
    text: string;
    answers: Answer[];
}

export interface Result {
    value: number;
    text: string;
    info: string;
    suggestions: [string, number][];
}