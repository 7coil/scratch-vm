export = Scratch3GdxForBlocks;
/**
 * Scratch 3.0 blocks to interact with a GDX-FOR peripheral.
 */
declare class Scratch3GdxForBlocks {
    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME(): string;
    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID(): string;
    /**
     * Construct a set of GDX-FOR blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor(runtime: any);
    get AXIS_MENU(): {
        text: string;
        value: string;
    }[];
    get TILT_MENU(): {
        text: string;
        value: string;
    }[];
    get TILT_MENU_ANY(): {
        text: string;
        value: string;
    }[];
    get PUSH_PULL_MENU(): {
        text: string;
        value: string;
    }[];
    get GESTURE_MENU(): {
        text: string;
        value: string;
    }[];
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    runtime: any;
    _peripheral: GdxFor;
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    whenForcePushedOrPulled(args: any): boolean;
    getForce(): number;
    whenGesture(args: any): boolean;
    _isFacing(direction: any): boolean;
    _facingUp: boolean;
    _facingDown: boolean;
    whenTilted(args: any): boolean;
    isTilted(args: any): boolean;
    getTilt(args: any): number;
    _isTilted(direction: any): boolean;
    _getTiltAngle(direction: any): number;
    getSpinSpeed(args: any): number;
    getAcceleration(args: any): number;
    /**
     * @param {number} x - x axis vector
     * @param {number} y - y axis vector
     * @param {number} z - z axis vector
     * @return {number} - the magnitude of a three dimension vector.
     */
    magnitude(x: number, y: number, z: number): number;
    accelMagnitude(): number;
    gestureMagnitude(): number;
    spinMagnitude(): number;
    isFreeFalling(): boolean;
}
/**
 * Manage communication with a GDX-FOR peripheral over a Scratch Link client socket.
 */
declare class GdxFor {
    /**
     * Construct a GDX-FOR communication object.
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
     * An @vernier/godirect Device
     * @type {Device}
     * @private
     */
    private _device;
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
     * Interval ID for data reading timeout.
     * @type {number}
     * @private
     */
    private _timeoutID;
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
     * Called by the runtime when user wants to scan for a peripheral.
     */
    scan(): void;
    /**
     * Called by the runtime when user wants to connect to a certain peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect(id: number): void;
    /**
     * Called by the runtime when a user exits the connection popup.
     * Disconnect from the GDX FOR.
     */
    disconnect(): void;
    /**
     * Return true if connected to the goforce device.
     * @return {boolean} - whether the goforce is connected.
     */
    isConnected(): boolean;
    /**
     * Handler for sensor value changes from the goforce device.
     * @param {object} sensor - goforce device sensor whose value has changed
     * @private
     */
    private _onSensorValueChanged;
    _spinSpeedFromGyro(val: any): any;
    getForce(): number;
    getTiltFrontBack(back?: boolean): number;
    getTiltLeftRight(right?: boolean): number;
    getAccelerationX(): number;
    getAccelerationY(): number;
    getAccelerationZ(): number;
    getSpinSpeedX(): number;
    getSpinSpeedY(): number;
    getSpinSpeedZ(): number;
}
