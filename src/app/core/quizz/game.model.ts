export class Game {
    constructor(
        public totalQuestion: number,
        public currentQuestion: number,
        public score: number,
        public isRunning: boolean,
        public isPaused: boolean,
    ) { }
}
