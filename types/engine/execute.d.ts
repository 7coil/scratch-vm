export = execute;
/**
 * Execute a block.
 * @param {!Sequencer} sequencer Which sequencer is executing.
 * @param {!Thread} thread Thread which to read and execute.
 */
declare function execute(sequencer: any, thread: Thread): void;
import Thread = require("./thread");
