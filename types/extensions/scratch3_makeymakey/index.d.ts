export = Scratch3MakeyMakeyBlocks;
/**
 * Class for the makey makey blocks in Scratch 3.0
 * @constructor
 */
declare class Scratch3MakeyMakeyBlocks {
    constructor(runtime: any);
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    runtime: any;
    /**
     * A toggle that alternates true and false each frame, so that an
     * edge-triggered hat can trigger on every other frame.
     * @type {boolean}
     */
    frameToggle: boolean;
    keyPressed(key: any): void;
    /**
     * Clear the key press buffer.
     */
    _clearkeyPressBuffer(): void;
    sequences: {};
    keyPressBuffer: any[];
    get KEY_TEXT_SHORT(): {
        SPACE: string;
        LEFT: string;
        UP: string;
        RIGHT: string;
        DOWN: string;
    };
    get DEFAULT_SEQUENCES(): string[];
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    buildSequenceMenu(sequencesArray: any): any;
    getMenuItemForSequenceString(sequenceString: any): {
        text: any;
        value: any;
    };
    whenMakeyKeyPressed(args: any, util: any): boolean;
    addSequence(sequenceString: any, sequenceArray: any): void;
    whenCodePressed(args: any): any;
}
