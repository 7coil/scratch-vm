export = VideoMotion;
/**
 * Store the necessary image pixel data to compares frames of a video and
 * detect an amount and direction of motion in the full sample or in a
 * specified area.
 * @constructor
 */
declare class VideoMotion {
    /**
     * The number of frames that have been added from a source.
     * @type {number}
     */
    frameNumber: number;
    /**
     * The frameNumber last analyzed.
     * @type {number}
     */
    lastAnalyzedFrame: number;
    /**
     * The amount of motion detected in the current frame.
     * @type {number}
     */
    motionAmount: number;
    /**
     * The direction the motion detected in the frame is general moving in.
     * @type {number}
     */
    motionDirection: number;
    /**
     * A copy of the current frame's pixel values. A index of the array is
     * represented in RGBA. The lowest byte is red. The next is green. The
     * next is blue. And the last is the alpha value of that pixel.
     * @type {Uint32Array}
     */
    curr: Uint32Array;
    /**
     * A copy of the last frame's pixel values.
     * @type {Uint32Array}
     */
    prev: Uint32Array;
    /**
     * A buffer for holding one component of a pixel's full value twice.
     * One for the current value. And one for the last value.
     * @type {number}
     */
    _arrays: number;
    /**
     * A clamped uint8 view of _arrays. One component of each index of the
     * curr member is copied into this array.
     * @type {number}
     */
    _curr: number;
    /**
     * A clamped uint8 view of _arrays. One component of each index of the
     * prev member is copied into this array.
     * @type {number}
     */
    _prev: number;
    /**
     * Reset internal state so future frame analysis does not consider values
     * from before this method was called.
     */
    reset(): void;
    /**
     * Add a frame to be next analyzed. The passed array represent a pixel with
     * each index in the RGBA format.
     * @param {Uint32Array} source - a source frame of pixels to copy
     */
    addFrame(source: Uint32Array): void;
    /**
     * Analyze the current frame against the previous frame determining the
     * amount of motion and direction of the motion.
     */
    analyzeFrame(): void;
    /**
     * Build motion amount and direction values based on stored current and
     * previous frame that overlaps a given drawable.
     * @param {Drawable} drawable - touchable and bounded drawable to build motion for
     * @param {MotionState} state - state to store built values to
     */
    getLocalMotion(drawable: any, state: any): void;
}
