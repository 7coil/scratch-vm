export = specMap;
/**
 * @typedef {object} SB2SpecMap_blockInfo
 * @property {string} opcode - the Scratch 3.0 block opcode. Use 'extensionID.opcode' for extension opcodes.
 * @property {Array.<SB2SpecMap_argInfo>} argMap - metadata for this block's arguments.
 */
/**
 * @typedef {object} SB2SpecMap_argInfo
 * @property {string} type - the type of this arg (such as 'input' or 'field')
 * @property {string} inputOp - the scratch-blocks shadow type for this arg
 * @property {string} inputName - the name this argument will take when provided to the block implementation
 */
/**
 * Mapping of Scratch 2.0 opcode to Scratch 3.0 block metadata.
 * @type {object.<SB2SpecMap_blockInfo>}
 */
declare const specMap: any;
declare namespace specMap {
    export { SB2SpecMap_blockInfo, SB2SpecMap_argInfo };
}
type SB2SpecMap_blockInfo = {
    /**
     * - the Scratch 3.0 block opcode. Use 'extensionID.opcode' for extension opcodes.
     */
    opcode: string;
    /**
     * - metadata for this block's arguments.
     */
    argMap: Array<SB2SpecMap_argInfo>;
};
type SB2SpecMap_argInfo = {
    /**
     * - the type of this arg (such as 'input' or 'field')
     */
    type: string;
    /**
     * - the scratch-blocks shadow type for this arg
     */
    inputOp: string;
    /**
     * - the name this argument will take when provided to the block implementation
     */
    inputName: string;
};
