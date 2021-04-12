export = Scratch3VideoSensingBlocks;
/**
 * Class for the motion-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
declare class Scratch3VideoSensingBlocks {
    /**
     * After analyzing a frame the amount of milliseconds until another frame
     * is analyzed.
     * @type {number}
     */
    static get INTERVAL(): number;
    /**
     * Dimensions the video stream is analyzed at after its rendered to the
     * sample canvas.
     * @type {Array.<number>}
     */
    static get DIMENSIONS(): number[];
    /**
     * The key to load & store a target's motion-related state.
     * @type {string}
     */
    static get STATE_KEY(): string;
    /**
     * The default motion-related state, to be used when a target has no existing motion state.
     * @type {MotionState}
     */
    static get DEFAULT_MOTION_STATE(): any;
    static get SensingAttribute(): {
        /** The amount of motion. */
        MOTION: string;
        /** The direction of the motion. */
        DIRECTION: string;
    };
    static get SensingSubject(): {
        /** The sensor traits of the whole stage. */
        STAGE: string;
        /** The senosr traits of the area overlapped by this sprite. */
        SPRITE: string;
    };
    /**
     * States the video sensing activity can be set to.
     * @readonly
     * @enum {string}
     */
    static readonly get VideoState(): {
        /** Video turned off. */
        OFF: string;
        /** Video turned on with default y axis mirroring. */
        ON: string;
        /** Video turned on without default y axis mirroring. */
        ON_FLIPPED: string;
    };
    constructor(runtime: any);
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    runtime: Runtime;
    /**
     * The motion detection algoritm used to power the motion amount and
     * direction values.
     * @type {VideoMotion}
     */
    detect: VideoMotion;
    /**
     * The last millisecond epoch timestamp that the video stream was
     * analyzed.
     * @type {number}
     */
    _lastUpdate: number;
    /**
     * A flag to determine if this extension has been installed in a project.
     * It is set to false the first time getInfo is run.
     * @type {boolean}
     */
    firstInstall: boolean;
    set globalVideoTransparency(arg: number);
    /**
     * The transparency setting of the video preview stored in a value
     * accessible by any object connected to the virtual machine.
     * @type {number}
     */
    get globalVideoTransparency(): number;
    set globalVideoState(arg: number);
    /**
     * The video state of the video preview stored in a value accessible by any
     * object connected to the virtual machine.
     * @type {number}
     */
    get globalVideoState(): number;
    /**
     * Get the latest values for video transparency and state,
     * and set the video device to use them.
     */
    updateVideoDisplay(): void;
    /**
     * Reset the extension's data motion detection data. This will clear out
     * for example old frames, so the first analyzed frame will not be compared
     * against a frame from before reset was called.
     */
    reset(): void;
    /**
     * Occasionally step a loop to sample the video, stamp it to the preview
     * skin, and add a TypedArray copy of the canvas's pixel data.
     * @private
     */
    private _loop;
    /**
     * Create data for a menu in scratch-blocks format, consisting of an array
     * of objects with text and value properties. The text is a translated
     * string, and the value is one-indexed.
     * @param {object[]} info - An array of info objects each having a name
     *   property.
     * @return {array} - An array of objects with text and value properties.
     * @private
     */
    private _buildMenu;
    /**
     * @param {Target} target - collect motion state for this target.
     * @returns {MotionState} the mutable motion state associated with that
     *   target. This will be created if necessary.
     * @private
     */
    private _getMotionState;
    /**
     * An array of choices of whether a reporter should return the frame's
     * motion amount or direction.
     * @type {object[]}
     * @param {string} name - the translatable name to display in sensor
     *   attribute menu
     * @param {string} value - the serializable value of the attribute
     */
    get ATTRIBUTE_INFO(): any[];
    /**
     * An array of info about the subject choices.
     * @type {object[]}
     * @param {string} name - the translatable name to display in the subject menu
     * @param {string} value - the serializable value of the subject
     */
    get SUBJECT_INFO(): any[];
    /**
     * An array of info on video state options for the "turn video [STATE]" block.
     * @type {object[]}
     * @param {string} name - the translatable name to display in the video state menu
     * @param {string} value - the serializable value stored in the block
     */
    get VIDEO_STATE_INFO(): any[];
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    /**
     * Analyze a part of the frame that a target overlaps.
     * @param {Target} target - a target to determine where to analyze
     * @returns {MotionState} the motion state for the given target
     */
    _analyzeLocalMotion(target: any): any;
    /**
     * A scratch reporter block handle that analyzes the last two frames and
     * depending on the arguments, returns the motion or direction for the
     * whole stage or just the target sprite.
     * @param {object} args - the block arguments
     * @param {BlockUtility} util - the block utility
     * @returns {number} the motion amount or direction of the stage or sprite
     */
    videoOn(args: object, util: any): number;
    /**
     * A scratch hat block edge handle that analyzes the last two frames where
     * the target sprite overlaps and if it has more motion than the given
     * reference value.
     * @param {object} args - the block arguments
     * @param {BlockUtility} util - the block utility
     * @returns {boolean} true if the sprite overlaps more motion than the
     *   reference
     */
    whenMotionGreaterThan(args: object, util: any): boolean;
    /**
     * A scratch command block handle that configures the video state from
     * passed arguments.
     * @param {object} args - the block arguments
     * @param {VideoState} args.VIDEO_STATE - the video state to set the device to
     */
    videoToggle(args: {
        VIDEO_STATE: VideoState;
    }): void;
    /**
     * A scratch command block handle that configures the video preview's
     * transparency from passed arguments.
     * @param {object} args - the block arguments
     * @param {number} args.TRANSPARENCY - the transparency to set the video
     *   preview to
     */
    setVideoTransparency(args: {
        TRANSPARENCY: number;
    }): void;
}
import Runtime = require("../../engine/runtime");
import VideoMotion = require("./library");
/**
 * States the video sensing activity can be set to.
 */
type VideoState = string;
declare namespace VideoState {
    const OFF: string;
    const ON: string;
    const ON_FLIPPED: string;
}
