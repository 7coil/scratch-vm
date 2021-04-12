export type ImportedProject = {
    /**
     * - the imported Scratch 3.0 target objects.
     */
    targets: Array<any>;
    /**
     * - the ID of each extension actually used by this project.
     */
    extensionsInfo: ImportedExtensionsInfo;
};
export type ImportedExtensionsInfo = {
    /**
     * - the ID of each extension actually in use by blocks in this project.
     */
    extensionIDs: Set<string>;
    /**
     * - map of ID => URL from project metadata. May not match extensionIDs.
     */
    extensionURLs: Map<string, string>;
};
/**
 * Serializes the specified VM runtime.
 * @param {!Runtime} runtime VM runtime instance to be serialized.
 * @param {string=} targetId Optional target id if serializing only a single target
 * @return {object} Serialized runtime instance.
 */
export function serialize(runtime: any, targetId?: string | undefined): object;
/**
 * Deserialize the specified representation of a VM runtime and loads it into the provided runtime instance.
 * @param  {object} json - JSON representation of a VM runtime.
 * @param  {Runtime} runtime - Runtime instance
 * @param {JSZip} zip - Sb3 file describing this project (to load assets from)
 * @param {boolean} isSingleSprite - If true treat as single sprite, else treat as whole project
 * @returns {Promise.<ImportedProject>} Promise that resolves to the list of targets after the project is deserialized
 */
export function deserialize(json: object, runtime: any, zip: any, isSingleSprite: boolean): Promise<ImportedProject>;
/**
 * Covnert serialized INPUT and FIELD primitives back to hydrated block templates.
 * Should be able to deserialize a format that has already been deserialized.  The only
 * "east" path to adding new targets/code requires going through deserialize, so it should
 * work with pre-parsed deserialized blocks.
 *
 * @param {object} blocks Serialized SB3 "blocks" property of a target. Will be mutated.
 * @return {object} input is modified and returned
 */
export function deserializeBlocks(blocks: object): object;
/**
 * Serialize the given blocks object (representing all the blocks for the target
 * currently being serialized.)
 * @param {object} blocks The blocks to be serialized
 * @return {Array} An array of the serialized blocks with compressed inputs and
 * compressed primitives and the list of all extension IDs present
 * in the serialized blocks.
 */
export function serializeBlocks(blocks: object): any[];
/**
 * Get sanitized non-core extension ID for a given sb3 opcode.
 * Note that this should never return a URL. If in the future the SB3 loader supports loading extensions by URL, this
 * ID should be used to (for example) look up the extension's full URL from a table in the SB3's JSON.
 * @param {!string} opcode The opcode to examine for extension.
 * @return {?string} The extension ID, if it exists and is not a core extension.
 */
export function getExtensionIdForOpcode(opcode: string): string | null;
