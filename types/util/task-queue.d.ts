export = TaskQueue;
/**
 * This class uses the token bucket algorithm to control a queue of tasks.
 */
declare class TaskQueue {
    /**
     * Creates an instance of TaskQueue.
     * To allow bursts, set `maxTokens` to several times the average task cost.
     * To prevent bursts, set `maxTokens` to the cost of the largest tasks.
     * Note that tasks with a cost greater than `maxTokens` will be rejected.
     *
     * @param {number} maxTokens - the maximum number of tokens in the bucket (burst size).
     * @param {number} refillRate - the number of tokens to be added per second (sustain rate).
     * @param {object} options - optional settings for the new task queue instance.
     * @property {number} startingTokens - the number of tokens the bucket starts with (default: `maxTokens`).
     * @property {number} maxTotalCost - reject a task if total queue cost would pass this limit (default: no limit).
     * @memberof TaskQueue
     */
    constructor(maxTokens: number, refillRate: number, options?: object);
    _maxTokens: number;
    _refillRate: number;
    _pendingTaskRecords: any[];
    _tokenCount: any;
    _maxTotalCost: any;
    _timer: Timer;
    _timeout: number;
    _lastUpdateTime: number;
    /**
     * Loop until the task queue is empty, running each task and spending tokens to do so.
     * Any time the bucket can't afford the next task, delay asynchronously until it can.
     *
     * @memberof TaskQueue
     */
    _runTasks(): void;
    /**
     * Get the number of queued tasks which have not yet started.
     *
     * @readonly
     * @memberof TaskQueue
     */
    readonly get length(): number;
    /**
     * Wait until the token bucket is full enough, then run the provided task.
     *
     * @param {Function} task - the task to run.
     * @param {number} [cost=1] - the number of tokens this task consumes from the bucket.
     * @returns {Promise} - a promise for the task's return value.
     * @memberof TaskQueue
     */
    do(task: Function, cost?: number): Promise<any>;
    /**
     * Cancel one pending task, rejecting its promise.
     *
     * @param {Promise} taskPromise - the promise returned by `do()`.
     * @returns {boolean} - true if the task was found, or false otherwise.
     * @memberof TaskQueue
     */
    cancel(taskPromise: Promise<any>): boolean;
    /**
     * Cancel all pending tasks, rejecting all their promises.
     *
     * @memberof TaskQueue
     */
    cancelAll(): void;
    /**
     * Shorthand for calling _refill() then _spend(cost).
     *
     * @see {@link TaskQueue#_refill}
     * @see {@link TaskQueue#_spend}
     * @param {number} cost - the number of tokens to try to spend.
     * @returns {boolean} true if we had enough tokens; false otherwise.
     * @memberof TaskQueue
     */
    _refillAndSpend(cost: number): boolean;
    /**
     * Refill the token bucket based on the amount of time since the last refill.
     *
     * @memberof TaskQueue
     */
    _refill(): void;
    /**
     * If we can "afford" the given cost, subtract that many tokens and return true.
     * Otherwise, return false.
     *
     * @param {number} cost - the number of tokens to try to spend.
     * @returns {boolean} true if we had enough tokens; false otherwise.
     * @memberof TaskQueue
     */
    _spend(cost: number): boolean;
}
import Timer = require("../util/timer");
