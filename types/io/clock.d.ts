export = Clock;
declare class Clock {
    constructor(runtime: any);
    _projectTimer: Timer;
    _pausedTime: number;
    _paused: boolean;
    /**
     * Reference to the owning Runtime.
     * @type{!Runtime}
     */
    runtime: any;
    projectTimer(): number;
    pause(): void;
    resume(): void;
    resetProjectTimer(): void;
}
import Timer = require("../util/timer");
