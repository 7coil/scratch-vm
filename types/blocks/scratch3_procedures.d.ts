export = Scratch3ProcedureBlocks;
declare class Scratch3ProcedureBlocks {
    constructor(runtime: any);
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    runtime: any;
    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives(): any;
    definition(): void;
    call(args: any, util: any): void;
    argumentReporterStringNumber(args: any, util: any): any;
    argumentReporterBoolean(args: any, util: any): any;
}
