export = VideoMotionView;
/**
 * Manage a debug canvas with VideoMotion input frames running parts of what
 * VideoMotion does to visualize what it does.
 * @param {VideoMotion} motion - VideoMotion with inputs to visualize
 * @param {OUTPUT} output - visualization output mode
 * @constructor
 */
declare class VideoMotionView {
    /**
     * Modes of debug output that can be rendered.
     * @type {object}
     */
    static get OUTPUT(): any;
    constructor(motion: any, output?: any);
    /**
     * VideoMotion instance to visualize.
     * @type {VideoMotion}
     */
    motion: any;
    canvas: HTMLCanvasElement;
    /**
     * 2D context to draw to debug canvas.
     * @type {CanvasRendering2DContext}
     */
    context: any;
    /**
     * Visualization output mode.
     * @type {OUTPUT}
     */
    output: any;
    /**
     * Pixel buffer to store output values into before they replace the last frames info in the debug canvas.
     * @type {Uint32Array}
     */
    buffer: Uint32Array;
    /**
     * Iterate each pixel address location and call a function with that address.
     * @param {number} xStart - start location on the x axis of the output pixel buffer
     * @param {number} yStart - start location on the y axis of the output pixel buffer
     * @param {nubmer} xStop - location to stop at on the x axis
     * @param {number} yStop - location to stop at on the y axis
     * @param {function} fn - handle to call with each iterated address
     */
    _eachAddress(xStart: number, yStart: number, xStop: any, yStop: number, fn: Function): void;
    /**
     * Iterate over cells of pixels and call a function with a function to
     * iterate over pixel addresses.
     * @param {number} xStart - start location on the x axis
     * @param {number} yStart - start lcoation on the y axis
     * @param {number} xStop - location to stop at on the x axis
     * @param {number} yStop - location to stop at on the y axis
     * @param {number} xStep - width of the cells
     * @param {number} yStep - height of the cells
     * @param {function} fn - function to call with a bound handle to _eachAddress
     */
    _eachCell(xStart: number, yStart: number, xStop: number, yStop: number, xStep: number, yStep: number, fn: Function): void;
    /**
     * Build horizontal, vertical, and temporal difference of a pixel address.
     * @param {number} address - address to build values for
     * @returns {object} a object with a gradX, grady, and gradT value
     */
    _grads(address: number): object;
    /**
     * Build component values used in determining a motion vector for a pixel
     * address.
     * @param {function} eachAddress - a bound handle to _eachAddress to build
     *   component values for
     * @returns {object} a object with a A2, A1B2, B1, C2, C1 value
     */
    _components(eachAddress: Function): object;
    /**
     * Visualize the motion code output mode selected for this view to the
     * debug canvas.
     */
    draw(): void;
}
