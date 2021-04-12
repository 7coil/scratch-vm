export = VirtualMachine;
/**
 * Handles connections between blocks, stage, and extensions.
 * @constructor
 */
declare class VirtualMachine extends EventEmitter {
    constructor();
    /**
     * VM runtime, to store blocks, I/O devices, sprites/targets, etc.
     * @type {!Runtime}
     */
    runtime: Runtime;
    /**
     * The "currently editing"/selected target ID for the VM.
     * Block events from any Blockly workspace are routed to this target.
     * @type {Target}
     */
    editingTarget: any;
    /**
     * The currently dragging target, for redirecting IO data.
     * @type {Target}
     */
    _dragTarget: any;
    extensionManager: ExtensionManager;
    /**
     * Handle a Blockly event for the current editing target.
     * @param {!Blockly.Event} e Any Blockly event.
     */
    blockListener(e: any): void;
    /**
     * Handle a Blockly event for the flyout.
     * @param {!Blockly.Event} e Any Blockly event.
     */
    flyoutBlockListener(e: any): void;
    /**
     * Handle a Blockly event for the flyout to be passed to the monitor container.
     * @param {!Blockly.Event} e Any Blockly event.
     */
    monitorBlockListener(e: any): void;
    /**
     * Handle a Blockly event for the variable map.
     * @param {!Blockly.Event} e Any Blockly event.
     */
    variableListener(e: any): void;
    /**
     * Start running the VM - do this before anything else.
     */
    start(): void;
    /**
     * "Green flag" handler - start all threads starting with a green flag.
     */
    greenFlag(): void;
    /**
     * Set whether the VM is in "turbo mode."
     * When true, loops don't yield to redraw.
     * @param {boolean} turboModeOn Whether turbo mode should be set.
     */
    setTurboMode(turboModeOn: boolean): void;
    /**
     * Set whether the VM is in 2.0 "compatibility mode."
     * When true, ticks go at 2.0 speed (30 TPS).
     * @param {boolean} compatibilityModeOn Whether compatibility mode is set.
     */
    setCompatibilityMode(compatibilityModeOn: boolean): void;
    /**
     * Stop all threads and running activities.
     */
    stopAll(): void;
    /**
     * Clear out current running project data.
     */
    clear(): void;
    /**
     * Get data for playground. Data comes back in an emitted event.
     */
    getPlaygroundData(): void;
    /**
     * Post I/O data to the virtual devices.
     * @param {?string} device Name of virtual I/O device.
     * @param {object} data Any data object to post to the I/O device.
     */
    postIOData(device: string | null, data: object): void;
    setVideoProvider(videoProvider: any): void;
    setCloudProvider(cloudProvider: any): void;
    /**
     * Tell the specified extension to scan for a peripheral.
     * @param {string} extensionId - the id of the extension.
     */
    scanForPeripheral(extensionId: string): void;
    /**
     * Connect to the extension's specified peripheral.
     * @param {string} extensionId - the id of the extension.
     * @param {number} peripheralId - the id of the peripheral.
     */
    connectPeripheral(extensionId: string, peripheralId: number): void;
    /**
     * Disconnect from the extension's connected peripheral.
     * @param {string} extensionId - the id of the extension.
     */
    disconnectPeripheral(extensionId: string): void;
    /**
     * Returns whether the extension has a currently connected peripheral.
     * @param {string} extensionId - the id of the extension.
     * @return {boolean} - whether the extension has a connected peripheral.
     */
    getPeripheralIsConnected(extensionId: string): boolean;
    /**
     * Load a Scratch project from a .sb, .sb2, .sb3 or json string.
     * @param {string | object} input A json string, object, or ArrayBuffer representing the project to load.
     * @return {!Promise} Promise that resolves after targets are installed.
     */
    loadProject(input: string | object): Promise<any>;
    /**
     * Load a project from the Scratch web site, by ID.
     * @param {string} id - the ID of the project to download, as a string.
     */
    downloadProjectId(id: string): void;
    /**
     * @returns {string} Project in a Scratch 3.0 JSON representation.
     */
    saveProjectSb3(): string;
    get assets(): any;
    _addFileDescsToZip(fileDescs: any, zip: any): void;
    /**
     * Exports a sprite in the sprite3 format.
     * @param {string} targetId ID of the target to export
     * @param {string=} optZipType Optional type that the resulting
     * zip should be outputted in. Options are: base64, binarystring,
     * array, uint8array, arraybuffer, blob, or nodebuffer. Defaults to
     * blob if argument not provided.
     * See https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#type-option
     * for more information about these options.
     * @return {object} A generated zip of the sprite and its assets in the format
     * specified by optZipType or blob by default.
     */
    exportSprite(targetId: string, optZipType?: string | undefined): object;
    /**
     * Export project as a Scratch 3.0 JSON representation.
     * @return {string} Serialized state of the runtime.
     */
    toJSON(): string;
    /**
     * Load a project from a Scratch JSON representation.
     * @param {string} json JSON string representing a project.
     * @returns {Promise} Promise that resolves after the project has loaded
     */
    fromJSON(json: string): Promise<any>;
    /**
     * Load a project from a Scratch JSON representation.
     * @param {string} projectJSON JSON string representing a project.
     * @param {?JSZip} zip Optional zipped project containing assets to be loaded.
     * @returns {Promise} Promise that resolves after the project has loaded
     */
    deserializeProject(projectJSON: string, zip: JSZip | null): Promise<any>;
    /**
     * Install `deserialize` results: zero or more targets after the extensions (if any) used by those targets.
     * @param {Array.<Target>} targets - the targets to be installed
     * @param {ImportedExtensionsInfo} extensions - metadata about extensions used by these targets
     * @param {boolean} wholeProject - set to true if installing a whole project, as opposed to a single sprite.
     * @returns {Promise} resolved once targets have been installed
     */
    installTargets(targets: Array<any>, extensions: any, wholeProject: boolean): Promise<any>;
    /**
     * Add a sprite, this could be .sprite2 or .sprite3. Unpack and validate
     * such a file first.
     * @param {string | object} input A json string, object, or ArrayBuffer representing the project to load.
     * @return {!Promise} Promise that resolves after targets are installed.
     */
    addSprite(input: string | object): Promise<any>;
    /**
     * Add a single sprite from the "Sprite2" (i.e., SB2 sprite) format.
     * @param {object} sprite Object representing 2.0 sprite to be added.
     * @param {?ArrayBuffer} zip Optional zip of assets being referenced by json
     * @returns {Promise} Promise that resolves after the sprite is added
     */
    _addSprite2(sprite: object, zip: ArrayBuffer | null): Promise<any>;
    /**
     * Add a single sb3 sprite.
     * @param {object} sprite Object rperesenting 3.0 sprite to be added.
     * @param {?ArrayBuffer} zip Optional zip of assets being referenced by target json
     * @returns {Promise} Promise that resolves after the sprite is added
     */
    _addSprite3(sprite: object, zip: ArrayBuffer | null): Promise<any>;
    /**
     * Add a costume to the current editing target.
     * @param {string} md5ext - the MD5 and extension of the costume to be loaded.
     * @param {!object} costumeObject Object representing the costume.
     * @property {int} skinId - the ID of the costume's render skin, once installed.
     * @property {number} rotationCenterX - the X component of the costume's origin.
     * @property {number} rotationCenterY - the Y component of the costume's origin.
     * @property {number} [bitmapResolution] - the resolution scale for a bitmap costume.
     * @param {string} optTargetId - the id of the target to add to, if not the editing target.
     * @param {string} optVersion - if this is 2, load costume as sb2, otherwise load costume as sb3.
     * @returns {?Promise} - a promise that resolves when the costume has been added
     */
    addCostume(md5ext: string, costumeObject: object, optTargetId: string, optVersion: string): Promise<any> | null;
    /**
     * Add a costume loaded from the library to the current editing target.
     * @param {string} md5ext - the MD5 and extension of the costume to be loaded.
     * @param {!object} costumeObject Object representing the costume.
     * @property {int} skinId - the ID of the costume's render skin, once installed.
     * @property {number} rotationCenterX - the X component of the costume's origin.
     * @property {number} rotationCenterY - the Y component of the costume's origin.
     * @property {number} [bitmapResolution] - the resolution scale for a bitmap costume.
     * @returns {?Promise} - a promise that resolves when the costume has been added
     */
    addCostumeFromLibrary(md5ext: string, costumeObject: object): Promise<any> | null;
    /**
     * Duplicate the costume at the given index. Add it at that index + 1.
     * @param {!int} costumeIndex Index of costume to duplicate
     * @returns {?Promise} - a promise that resolves when the costume has been decoded and added
     */
    duplicateCostume(costumeIndex: any): Promise<any> | null;
    /**
     * Duplicate the sound at the given index. Add it at that index + 1.
     * @param {!int} soundIndex Index of sound to duplicate
     * @returns {?Promise} - a promise that resolves when the sound has been decoded and added
     */
    duplicateSound(soundIndex: any): Promise<any> | null;
    /**
     * Rename a costume on the current editing target.
     * @param {int} costumeIndex - the index of the costume to be renamed.
     * @param {string} newName - the desired new name of the costume (will be modified if already in use).
     */
    renameCostume(costumeIndex: any, newName: string): void;
    /**
     * Delete a costume from the current editing target.
     * @param {int} costumeIndex - the index of the costume to be removed.
     * @return {?function} A function to restore the deleted costume, or null,
     * if no costume was deleted.
     */
    deleteCostume(costumeIndex: any): Function | null;
    /**
     * Add a sound to the current editing target.
     * @param {!object} soundObject Object representing the costume.
     * @param {string} optTargetId - the id of the target to add to, if not the editing target.
     * @returns {?Promise} - a promise that resolves when the sound has been decoded and added
     */
    addSound(soundObject: object, optTargetId: string): Promise<any> | null;
    /**
     * Rename a sound on the current editing target.
     * @param {int} soundIndex - the index of the sound to be renamed.
     * @param {string} newName - the desired new name of the sound (will be modified if already in use).
     */
    renameSound(soundIndex: any, newName: string): void;
    /**
     * Get a sound buffer from the audio engine.
     * @param {int} soundIndex - the index of the sound to be got.
     * @return {AudioBuffer} the sound's audio buffer.
     */
    getSoundBuffer(soundIndex: any): AudioBuffer;
    /**
     * Update a sound buffer.
     * @param {int} soundIndex - the index of the sound to be updated.
     * @param {AudioBuffer} newBuffer - new audio buffer for the audio engine.
     * @param {ArrayBuffer} soundEncoding - the new (wav) encoded sound to be stored
     */
    updateSoundBuffer(soundIndex: any, newBuffer: AudioBuffer, soundEncoding: ArrayBuffer): void;
    /**
     * Delete a sound from the current editing target.
     * @param {int} soundIndex - the index of the sound to be removed.
     * @return {?Function} A function to restore the sound that was deleted,
     * or null, if no sound was deleted.
     */
    deleteSound(soundIndex: any): Function | null;
    /**
     * Get a string representation of the image from storage.
     * @param {int} costumeIndex - the index of the costume to be got.
     * @return {string} the costume's SVG string if it's SVG,
     *     a dataURI if it's a PNG or JPG, or null if it couldn't be found or decoded.
     */
    getCostume(costumeIndex: any): string;
    /**
     * Update a costume with the given bitmap
     * @param {!int} costumeIndex - the index of the costume to be updated.
     * @param {!ImageData} bitmap - new bitmap for the renderer.
     * @param {!number} rotationCenterX x of point about which the costume rotates, relative to its upper left corner
     * @param {!number} rotationCenterY y of point about which the costume rotates, relative to its upper left corner
     * @param {!number} bitmapResolution 1 for bitmaps that have 1 pixel per unit of stage,
     *     2 for double-resolution bitmaps
     */
    updateBitmap(costumeIndex: any, bitmap: ImageData, rotationCenterX: number, rotationCenterY: number, bitmapResolution: number): void;
    /**
     * Update a costume with the given SVG
     * @param {int} costumeIndex - the index of the costume to be updated.
     * @param {string} svg - new SVG for the renderer.
     * @param {number} rotationCenterX x of point about which the costume rotates, relative to its upper left corner
     * @param {number} rotationCenterY y of point about which the costume rotates, relative to its upper left corner
     */
    updateSvg(costumeIndex: any, svg: string, rotationCenterX: number, rotationCenterY: number): void;
    /**
     * Add a backdrop to the stage.
     * @param {string} md5ext - the MD5 and extension of the backdrop to be loaded.
     * @param {!object} backdropObject Object representing the backdrop.
     * @property {int} skinId - the ID of the backdrop's render skin, once installed.
     * @property {number} rotationCenterX - the X component of the backdrop's origin.
     * @property {number} rotationCenterY - the Y component of the backdrop's origin.
     * @property {number} [bitmapResolution] - the resolution scale for a bitmap backdrop.
     * @returns {?Promise} - a promise that resolves when the backdrop has been added
     */
    addBackdrop(md5ext: string, backdropObject: object): Promise<any> | null;
    /**
     * Rename a sprite.
     * @param {string} targetId ID of a target whose sprite to rename.
     * @param {string} newName New name of the sprite.
     */
    renameSprite(targetId: string, newName: string): void;
    /**
     * Delete a sprite and all its clones.
     * @param {string} targetId ID of a target whose sprite to delete.
     * @return {Function} Returns a function to restore the sprite that was deleted
     */
    deleteSprite(targetId: string): Function;
    /**
     * Duplicate a sprite.
     * @param {string} targetId ID of a target whose sprite to duplicate.
     * @returns {Promise} Promise that resolves when duplicated target has
     *     been added to the runtime.
     */
    duplicateSprite(targetId: string): Promise<any>;
    /**
     * Set the audio engine for the VM/runtime
     * @param {!AudioEngine} audioEngine The audio engine to attach
     */
    attachAudioEngine(audioEngine: any): void;
    /**
     * Set the renderer for the VM/runtime
     * @param {!RenderWebGL} renderer The renderer to attach
     */
    attachRenderer(renderer: any): void;
    /**
     * @returns {RenderWebGL} The renderer attached to the vm
     */
    get renderer(): any;
    attachV2SVGAdapter(): void;
    /**
     * Set the bitmap adapter for the VM/runtime, which converts scratch 2
     * bitmaps to scratch 3 bitmaps. (Scratch 3 bitmaps are all bitmap resolution 2)
     * @param {!function} bitmapAdapter The adapter to attach
     */
    attachV2BitmapAdapter(bitmapAdapter: Function): void;
    /**
     * Set the storage module for the VM/runtime
     * @param {!ScratchStorage} storage The storage module to attach
     */
    attachStorage(storage: any): void;
    /**
     * set the current locale and builtin messages for the VM
     * @param {!string} locale       current locale
     * @param {!object} messages     builtin messages map for current locale
     * @returns {Promise} Promise that resolves when all the blocks have been
     *     updated for a new locale (or empty if locale hasn't changed.)
     */
    setLocale(locale: string, messages: object): Promise<any>;
    /**
     * get the current locale for the VM
     * @returns {string} the current locale in the VM
     */
    getLocale(): string;
    /**
     * Set an editing target. An editor UI can use this function to switch
     * between editing different targets, sprites, etc.
     * After switching the editing target, the VM may emit updates
     * to the list of targets and any attached workspace blocks
     * (see `emitTargetsUpdate` and `emitWorkspaceUpdate`).
     * @param {string} targetId Id of target to set as editing.
     */
    setEditingTarget(targetId: string): void;
    /**
     * Called when blocks are dragged from one sprite to another. Adds the blocks to the
     * workspace of the given target.
     * @param {!Array<object>} blocks Blocks to add.
     * @param {!string} targetId Id of target to add blocks to.
     * @param {?string} optFromTargetId Optional target id indicating that blocks are being
     * shared from that target. This is needed for resolving any potential variable conflicts.
     * @return {!Promise} Promise that resolves when the extensions and blocks have been added.
     */
    shareBlocksToTarget(blocks: Array<object>, targetId: string, optFromTargetId: string | null): Promise<any>;
    /**
     * Called when costumes are dragged from editing target to another target.
     * Sets the newly added costume as the current costume.
     * @param {!number} costumeIndex Index of the costume of the editing target to share.
     * @param {!string} targetId Id of target to add the costume.
     * @return {Promise} Promise that resolves when the new costume has been loaded.
     */
    shareCostumeToTarget(costumeIndex: number, targetId: string): Promise<any>;
    /**
     * Called when sounds are dragged from editing target to another target.
     * @param {!number} soundIndex Index of the sound of the editing target to share.
     * @param {!string} targetId Id of target to add the sound.
     * @return {Promise} Promise that resolves when the new sound has been loaded.
     */
    shareSoundToTarget(soundIndex: number, targetId: string): Promise<any>;
    /**
     * Repopulate the workspace with the blocks of the current editingTarget. This
     * allows us to get around bugs like gui#413.
     */
    refreshWorkspace(): void;
    /**
     * Emit metadata about available targets.
     * An editor UI could use this to display a list of targets and show
     * the currently editing one.
     * @param {bool} triggerProjectChange If true, also emit a project changed event.
     * Disabled selectively by updates that don't affect project serialization.
     * Defaults to true.
     */
    emitTargetsUpdate(triggerProjectChange: any): void;
    /**
     * Emit an Blockly/scratch-blocks compatible XML representation
     * of the current editing target's blocks.
     */
    emitWorkspaceUpdate(): void;
    /**
     * Get a target id for a drawable id. Useful for interacting with the renderer
     * @param {int} drawableId The drawable id to request the target id for
     * @returns {?string} The target id, if found. Will also be null if the target found is the stage.
     */
    getTargetIdForDrawableId(drawableId: any): string | null;
    /**
     * Reorder target by index. Return whether a change was made.
     * @param {!string} targetIndex Index of the target.
     * @param {!number} newIndex index that the target should be moved to.
     * @returns {boolean} Whether a target was reordered.
     */
    reorderTarget(targetIndex: string, newIndex: number): boolean;
    /**
     * Reorder the costumes of a target if it exists. Return whether it succeeded.
     * @param {!string} targetId ID of the target which owns the costumes.
     * @param {!number} costumeIndex index of the costume to move.
     * @param {!number} newIndex index that the costume should be moved to.
     * @returns {boolean} Whether a costume was reordered.
     */
    reorderCostume(targetId: string, costumeIndex: number, newIndex: number): boolean;
    /**
     * Reorder the sounds of a target if it exists. Return whether it occured.
     * @param {!string} targetId ID of the target which owns the sounds.
     * @param {!number} soundIndex index of the sound to move.
     * @param {!number} newIndex index that the sound should be moved to.
     * @returns {boolean} Whether a sound was reordered.
     */
    reorderSound(targetId: string, soundIndex: number, newIndex: number): boolean;
    /**
     * Put a target into a "drag" state, during which its X/Y positions will be unaffected
     * by blocks.
     * @param {string} targetId The id for the target to put into a drag state
     */
    startDrag(targetId: string): void;
    /**
     * Remove a target from a drag state, so blocks may begin affecting X/Y position again
     * @param {string} targetId The id for the target to remove from the drag state
     */
    stopDrag(targetId: string): void;
    /**
     * Post/edit sprite info for the current editing target or the drag target.
     * @param {object} data An object with sprite info data to set.
     */
    postSpriteInfo(data: object): void;
    /**
     * Set a target's variable's value. Return whether it succeeded.
     * @param {!string} targetId ID of the target which owns the variable.
     * @param {!string} variableId ID of the variable to set.
     * @param {!*} value The new value of that variable.
     * @returns {boolean} whether the target and variable were found and updated.
     */
    setVariableValue(targetId: string, variableId: string, value: any): boolean;
    /**
     * Get a target's variable's value. Return null if the target or variable does not exist.
     * @param {!string} targetId ID of the target which owns the variable.
     * @param {!string} variableId ID of the variable to set.
     * @returns {?*} The value of the variable, or null if it could not be looked up.
     */
    getVariableValue(targetId: string, variableId: string): any | null;
    /**
     * Allow VM consumer to configure the ScratchLink socket creator.
     * @param {Function} factory The custom ScratchLink socket factory.
     */
    configureScratchLinkSocketFactory(factory: Function): void;
}
import EventEmitter = require("events");
import Runtime = require("./engine/runtime");
import ExtensionManager = require("./extension-support/extension-manager");
import JSZip = require("jszip");
