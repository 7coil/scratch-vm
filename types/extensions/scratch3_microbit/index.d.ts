export = Scratch3MicroBitBlocks;
/**
 * Scratch 3.0 blocks to interact with a MicroBit peripheral.
 */
declare class Scratch3MicroBitBlocks {
    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME(): string;
    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID(): string;
    /**
     * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
     */
    static get TILT_THRESHOLD(): number;
    /**
     * Construct a set of MicroBit blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor(runtime: any);
    /**
     * @return {array} - text and values for each buttons menu element
     */
    get BUTTONS_MENU(): any[];
    /**
     * @return {array} - text and values for each gestures menu element
     */
    get GESTURES_MENU(): any[];
    /**
     * @return {array} - text and values for each pin state menu element
     */
    get PIN_STATE_MENU(): any[];
    /**
     * @return {array} - text and values for each tilt direction menu element
     */
    get TILT_DIRECTION_MENU(): any[];
    /**
     * @return {array} - text and values for each tilt direction (plus "any") menu element
     */
    get TILT_DIRECTION_ANY_MENU(): any[];
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    runtime: any;
    _peripheral: MicroBit;
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    /**
     * Test whether the A or B button is pressed
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if the button is pressed.
     */
    whenButtonPressed(args: object): boolean;
    /**
     * Test whether the A or B button is pressed
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if the button is pressed.
     */
    isButtonPressed(args: object): boolean;
    /**
     * Test whether the micro:bit is moving
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if the micro:bit is moving.
     */
    whenGesture(args: object): boolean;
    /**
     * Display a predefined symbol on the 5x5 LED matrix.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after a tick.
     */
    displaySymbol(args: object): Promise<any>;
    /**
     * Display text on the 5x5 LED matrix.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the text is done printing.
     * Note the limit is 19 characters
     * The print time is calculated by multiplying the number of horizontal pixels
     * by the default scroll delay of 120ms.
     * The number of horizontal pixels = 6px for each character in the string,
     * 1px before the string, and 5px after the string.
     */
    displayText(args: object): Promise<any>;
    /**
     * Turn all 5x5 matrix LEDs off.
     * @return {Promise} - a Promise that resolves after a tick.
     */
    displayClear(): Promise<any>;
    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} DIRECTION - the tilt direction to test (front, back, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     */
    whenTilted(args: object): boolean;
    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} DIRECTION - the tilt direction to test (front, back, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     */
    isTilted(args: object): boolean;
    /**
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} DIRECTION - the direction (front, back, left, right) to check.
     * @return {number} - the tilt sensor's angle in the specified direction.
     * Note that getTiltAngle(front) = -getTiltAngle(back) and getTiltAngle(left) = -getTiltAngle(right).
     */
    getTiltAngle(args: object): number;
    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {TiltDirection} direction - the tilt direction to test (front, back, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     * @private
     */
    private _isTilted;
    /**
     * @param {TiltDirection} direction - the direction (front, back, left, right) to check.
     * @return {number} - the tilt sensor's angle in the specified direction.
     * Note that getTiltAngle(front) = -getTiltAngle(back) and getTiltAngle(left) = -getTiltAngle(right).
     * @private
     */
    private _getTiltAngle;
    /**
     * @param {object} args - the block's arguments.
     * @return {boolean} - the touch pin state.
     * @private
     */
    private whenPinConnected;
}
/**
 * Manage communication with a MicroBit peripheral over a Scrath Link client socket.
 */
declare class MicroBit {
    /**
     * Construct a MicroBit communication object.
     * @param {Runtime} runtime - the Scratch 3.0 runtime
     * @param {string} extensionId - the id of the extension
     */
    constructor(runtime: any, extensionId: string);
    /**
     * The Scratch 3.0 runtime used to trigger the green flag button.
     * @type {Runtime}
     * @private
     */
    private _runtime;
    /**
     * The BluetoothLowEnergy connection socket for reading/writing peripheral data.
     * @type {BLE}
     * @private
     */
    private _ble;
    /**
     * The id of the extension this peripheral belongs to.
     */
    _extensionId: string;
    /**
     * The most recently received value for each sensor.
     * @type {Object.<string, number>}
     * @private
     */
    private _sensors;
    /**
     * The most recently received value for each gesture.
     * @type {Object.<string, Object>}
     * @private
     */
    private _gestures;
    /**
     * Interval ID for data reading timeout.
     * @type {number}
     * @private
     */
    private _timeoutID;
    /**
     * A flag that is true while we are busy sending data to the BLE socket.
     * @type {boolean}
     * @private
     */
    private _busy;
    /**
     * ID for a timeout which is used to clear the busy flag if it has been
     * true for a long time.
     */
    _busyTimeoutID: number;
    /**
     * Reset all the state and timeout/interval ids.
     */
    reset(): void;
    /**
     * Starts reading data from peripheral after BLE has connected to it.
     * @private
     */
    private _onConnect;
    /**
     * Process the sensor data from the incoming BLE characteristic.
     * @param {object} base64 - the incoming BLE data.
     * @private
     */
    private _onMessage;
    /**
     * @param {string} text - the text to display.
     * @return {Promise} - a Promise that resolves when writing to peripheral.
     */
    displayText(text: string): Promise<any>;
    /**
     * @param {Uint8Array} matrix - the matrix to display.
     * @return {Promise} - a Promise that resolves when writing to peripheral.
     */
    displayMatrix(matrix: Uint8Array): Promise<any>;
    /**
     * @return {number} - the latest value received for the tilt sensor's tilt about the X axis.
     */
    get tiltX(): number;
    /**
     * @return {number} - the latest value received for the tilt sensor's tilt about the Y axis.
     */
    get tiltY(): number;
    /**
     * @return {boolean} - the latest value received for the A button.
     */
    get buttonA(): boolean;
    /**
     * @return {boolean} - the latest value received for the B button.
     */
    get buttonB(): boolean;
    /**
     * @return {number} - the latest value received for the motion gesture states.
     */
    get gestureState(): number;
    /**
     * @return {Uint8Array} - the current state of the 5x5 LED matrix.
     */
    get ledMatrixState(): Uint8Array;
    /**
     * Called by the runtime when user wants to scan for a peripheral.
     */
    scan(): void;
    /**
     * Called by the runtime when user wants to connect to a certain peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect(id: number): void;
    /**
     * Disconnect from the micro:bit.
     */
    disconnect(): void;
    /**
     * Return true if connected to the micro:bit.
     * @return {boolean} - whether the micro:bit is connected.
     */
    isConnected(): boolean;
    /**
     * Send a message to the peripheral BLE socket.
     * @param {number} command - the BLE command hex.
     * @param {Uint8Array} message - the message to write
     */
    send(command: number, message: Uint8Array): void;
    /**
     * @param {number} pin - the pin to check touch state.
     * @return {number} - the latest value received for the touch pin states.
     * @private
     */
    private _checkPinState;
}
