export = Scratch3BoostBlocks;
/**
 * Scratch 3.0 blocks to interact with a LEGO Boost peripheral.
 */
declare class Scratch3BoostBlocks {
    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID(): string;
    /**
     * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
     */
    static get TILT_THRESHOLD(): number;
    /**
     * Construct a set of Boost blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor(runtime: any);
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    runtime: any;
    _peripheral: Boost;
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    /**
     * Turn specified motor(s) on for a specified duration.
     * @param {object} args - the block's arguments.
     * @property {MotorID} MOTOR_ID - the motor(s) to activate.
     * @property {int} DURATION - the amount of time to run the motors.
     * @return {Promise} - a promise which will resolve at the end of the duration.
     */
    motorOnFor(args: object): Promise<any>;
    /**
     * Turn specified motor(s) on for a specified rotation in full rotations.
     * @param {object} args - the block's arguments.
     * @property {MotorID} MOTOR_ID - the motor(s) to activate.
     * @property {int} ROTATION - the amount of full rotations to turn the motors.
     * @return {Promise} - a promise which will resolve at the end of the duration.
     */
    motorOnForRotation(args: object): Promise<any>;
    /**
     * Turn specified motor(s) on indefinitely.
     * @param {object} args - the block's arguments.
     * @property {MotorID} MOTOR_ID - the motor(s) to activate.
     * @return {Promise} - a Promise that resolves after some delay.
     */
    motorOn(args: object): Promise<any>;
    /**
     * Turn specified motor(s) off.
     * @param {object} args - the block's arguments.
     * @property {MotorID} MOTOR_ID - the motor(s) to deactivate.
     * @return {Promise} - a Promise that resolves after some delay.
     */
    motorOff(args: object): Promise<any>;
    /**
     * Set the power level of the specified motor(s).
     * @param {object} args - the block's arguments.
     * @property {MotorID} MOTOR_ID - the motor(s) to be affected.
     * @property {int} POWER - the new power level for the motor(s).
     * @return {Promise} - returns a promise to make sure the block yields.
     */
    setMotorPower(args: object): Promise<any>;
    /**
     * Set the direction of rotation for specified motor(s).
     * If the direction is 'reverse' the motor(s) will be reversed individually.
     * @param {object} args - the block's arguments.
     * @property {MotorID} MOTOR_ID - the motor(s) to be affected.
     * @property {MotorDirection} MOTOR_DIRECTION - the new direction for the motor(s).
     * @return {Promise} - returns a promise to make sure the block yields.
     */
    setMotorDirection(args: object): Promise<any>;
    /**
     * @param {object} args - the block's arguments.
     * @return {number} - returns the motor's position.
     */
    getMotorPosition(args: object): number;
    /**
     * Call a callback for each motor indexed by the provided motor ID.
     * @param {MotorID} motorID - the ID specifier.
     * @param {Function} callback - the function to call with the numeric motor index for each motor.
     * @private
     */
    private _forEachMotor;
    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} TILT_DIRECTION_ANY - the tilt direction to test (up, down, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     */
    whenTilted(args: object): boolean;
    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} TILT_DIRECTION_ANY - the tilt direction to test (up, down, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     */
    isTilted(args: object): boolean;
    /**
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} TILT_DIRECTION - the direction (up, down, left, right) to check.
     * @return {number} - the tilt sensor's angle in the specified direction.
     * Note that getTiltAngle(up) = -getTiltAngle(down) and getTiltAngle(left) = -getTiltAngle(right).
     */
    getTiltAngle(args: object): number;
    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {TiltDirection} direction - the tilt direction to test (up, down, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     * @private
     */
    private _isTilted;
    /**
     * @param {TiltDirection} direction - the direction (up, down, left, right) to check.
     * @return {number} - the tilt sensor's angle in the specified direction.
     * Note that getTiltAngle(up) = -getTiltAngle(down) and getTiltAngle(left) = -getTiltAngle(right).
     * @private
     */
    private _getTiltAngle;
    /**
     * Edge-triggering hat function, for when the vision sensor is detecting
     * a certain color.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true when the color sensor senses the specified color.
     */
    whenColor(args: object): boolean;
    /**
     * A boolean reporter function, for whether the vision sensor is detecting
     * a certain color.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true when the color sensor senses the specified color.
     */
    seeingColor(args: object): boolean;
    /**
     * Set the LED's hue.
     * @param {object} args - the block's arguments.
     * @property {number} HUE - the hue to set, in the range [0,100].
     * @return {Promise} - a Promise that resolves after some delay.
     */
    setLightHue(args: object): Promise<any>;
}
/**
 * Manage communication with a Boost peripheral over a Bluetooth Low Energy client socket.
 */
declare class Boost {
    constructor(runtime: any, extensionId: any);
    /**
     * The Scratch 3.0 runtime used to trigger the green flag button.
     * @type {Runtime}
     * @private
     */
    private _runtime;
    /**
     * The id of the extension this peripheral belongs to.
     */
    _extensionId: any;
    /**
     * A list of the ids of the physical or virtual sensors.
     * @type {string[]}
     * @private
     */
    private _ports;
    /**
     * A list of motors registered by the Boost hardware.
     * @type {BoostMotor[]}
     * @private
     */
    private _motors;
    /**
     * The most recently received value for each sensor.
     * @type {Object.<string, number>}
     * @private
     */
    private _sensors;
    /**
     * An array of values from the Boost Vision Sensor.
     * @type {Array}
     * @private
     */
    private _colorSamples;
    /**
     * The Bluetooth connection socket for reading/writing peripheral data.
     * @type {BLE}
     * @private
     */
    private _ble;
    /**
     * A rate limiter utility, to help limit the rate at which we send BLE messages
     * over the socket to Scratch Link to a maximum number of sends per second.
     * @type {RateLimiter}
     * @private
     */
    private _rateLimiter;
    /**
     * An interval id for the battery check interval.
     * @type {number}
     * @private
     */
    private _pingDeviceId;
    /**
     * Reset all the state and timeout/interval ids.
     */
    reset(): void;
    /**
     * Starts reading data from peripheral after BLE has connected.
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
     * Ping the Boost hub. If the Boost hub has disconnected
     * for some reason, the BLE socket will get an error back and automatically
     * close the socket.
     * @private
     */
    private _pingDevice;
    /**
     * @return {number} - the latest value received for the tilt sensor's tilt about the X axis.
     */
    get tiltX(): number;
    /**
     * @return {number} - the latest value received for the tilt sensor's tilt about the Y axis.
     */
    get tiltY(): number;
    /**
     * @return {number} - the latest color value received from the vision sensor.
     */
    get color(): number;
    /**
     * @return {number} - the previous color value received from the vision sensor.
     */
    get previousColor(): number;
    /**
     * Look up the color id for an index received from the vision sensor.
     * @param {number} index - the color index to look up.
     * @return {BoostColor} the color id for this index.
     */
    boostColorForIndex(index: number): BoostColor;
    /**
     * Access a particular motor on this peripheral.
     * @param {int} index - the index of the desired motor.
     * @return {BoostMotor} - the BoostMotor instance, if any, at that index.
     */
    motor(index: any): BoostMotor;
    /**
     * Stop all the motors that are currently running.
     */
    stopAllMotors(): void;
    /**
     * Set the Boost peripheral's LED to a specific color.
     * @param {int} inputRGB - a 24-bit RGB color in 0xRRGGBB format.
     * @return {Promise} - a promise of the completion of the set led send operation.
     */
    setLED(inputRGB: any): Promise<any>;
    /**
     * Sets the input mode of the LED to RGB.
     * @return {Promise} - a promise returned by the send operation.
     */
    setLEDMode(): Promise<any>;
    /**
     * Stop the motors on the Boost peripheral.
     */
    stopAll(): void;
    /**
     * Called by the runtime when user wants to scan for a Boost peripheral.
     */
    scan(): void;
    /**
     * Called by the runtime when user wants to connect to a certain Boost peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect(id: number): void;
    /**
     * Disconnects from the current BLE socket and resets state.
     */
    disconnect(): void;
    /**
     * Called by the runtime to detect whether the Boost peripheral is connected.
     * @return {boolean} - the connected state.
     */
    isConnected(): boolean;
    /**
     * Write a message to the Boost peripheral BLE socket.
     * @param {number} uuid - the UUID of the characteristic to write to
     * @param {Array} message - the message to write.
     * @param {boolean} [useLimiter=true] - if true, use the rate limiter
     * @return {Promise} - a promise result of the write operation
     */
    send(uuid: number, message: any[], useLimiter?: boolean): Promise<any>;
    /**
     * Generate a Boost 'Output Command' in the byte array format
     * (COMMON HEADER, PORT ID, EXECUTION BYTE, SUBCOMMAND ID, PAYLOAD).
     *
     * Payload is accepted as an array since these vary across different subcommands.
     *
     * @param  {number} portID - the port (Connect ID) to send a command to.
     * @param  {number} execution - Byte containing startup/completion information
     * @param  {number} subCommand - the id of the subcommand byte.
     * @param  {array}  payload    - the list of bytes to send as subcommand payload
     * @return {array}            - a generated output command.
     */
    generateOutputCommand(portID: number, execution: number, subCommand: number, payload: any[]): any[];
    /**
     * Generate a Boost 'Input Command' in the byte array format
     * (COMMAND ID, COMMAND TYPE, CONNECT ID, TYPE ID, MODE, DELTA INTERVAL (4 BYTES),
     * UNIT, NOTIFICATIONS ENABLED).
     *
     * This sends a command to the Boost that sets that input format
     * of the specified inputs and sets value change notifications.
     *
     * @param  {number}  portID           - the port (Connect ID) to send a command to.
     * @param  {number}  mode                - the mode of the input sensor.
     * @param  {number}  delta               - the delta change needed to trigger notification.
     * @param  {boolean} enableNotifications - whether to enable notifications.
     * @return {array}                       - a generated input command.
     */
    generateInputCommand(portID: number, mode: number, delta: number, enableNotifications: boolean): any[];
    /**
     * Register a new sensor or motor connected at a port.  Store the type of
     * sensor or motor internally, and then register for notifications on input
     * values if it is a sensor.
     * @param {number} portID - the port to register a sensor or motor on.
     * @param {number} type - the type ID of the sensor or motor
     * @private
     */
    private _registerSensorOrMotor;
    /**
     * Clear the sensors or motors present on the ports.
     * @param {number} portID - the port to clear.
     * @private
     */
    private _clearPort;
}
/**
 * Ids for each color sensor value used by the extension.
 */
type BoostColor = string;
declare namespace BoostColor {
    const ANY: string;
    const NONE: string;
    const RED: string;
    const BLUE: string;
    const GREEN: string;
    const YELLOW: string;
    const WHITE: string;
    const BLACK: string;
}
/**
 * Manage power, direction, position, and timers for one Boost motor.
 */
declare class BoostMotor {
    /**
     * Construct a Boost Motor instance.
     * @param {Boost} parent - the Boost peripheral which owns this motor.
     * @param {int} index - the zero-based index of this motor on its parent peripheral.
     */
    constructor(parent: Boost, index: any);
    /**
     * The Boost peripheral which owns this motor.
     * @type {Boost}
     * @private
     */
    private _parent;
    /**
     * The zero-based index of this motor on its parent peripheral.
     * @type {int}
     * @private
     */
    private _index;
    /**
     * This motor's current direction: 1 for "this way" or -1 for "that way"
     * @type {number}
     * @private
     */
    private _direction;
    /**
     * This motor's current power level, in the range [0,100].
     * @type {number}
     * @private
     */
    private _power;
    /**
     * This motor's current relative position
     * @type {number}
     * @private
     */
    private _position;
    /**
     * Is this motor currently moving?
     * @type {boolean}
     * @private
     */
    private _status;
    /**
     * If the motor has been turned on or is actively braking for a specific duration, this is the timeout ID for
     * the end-of-action handler. Cancel this when changing plans.
     * @type {Object}
     * @private
     */
    private _pendingDurationTimeoutId;
    /**
     * The starting time for the pending duration timeout.
     * @type {number}
     * @private
     */
    private _pendingDurationTimeoutStartTime;
    /**
     * The delay/duration of the pending duration timeout.
     * @type {number}
     * @private
     */
    private _pendingDurationTimeoutDelay;
    /**
     * The target position of a turn-based command.
     * @type {number}
     * @private
     */
    private _pendingRotationDestination;
    /**
     * If the motor has been turned on run for a specific rotation, this is the function
     * that will be called once Scratch VM gets a notification from the Move Hub.
     * @type {Object}
     * @private
     */
    private _pendingRotationPromise;
    /**
     * Turn this motor off.
     * @param {boolean} [useLimiter=true] - if true, use the rate limiter
     */
    turnOff(useLimiter?: boolean): void;
    /**
     * @param {int} value - this motor's new direction: 1 for "this way" or -1 for "that way"
     */
    set direction(arg: any);
    /**
     * @return {int} - this motor's current direction: 1 for "this way" or -1 for "that way"
     */
    get direction(): any;
    /**
     * @param {int} value - this motor's new power level, in the range [10,100].
     */
    set power(arg: any);
    /**
     * @return {int} - this motor's current power level, in the range [0,100].
     */
    get power(): any;
    /**
     * @param {int} value - set this motor's current position.
     */
    set position(arg: any);
    /**
     * @return {int} - this motor's current position, in the range of [-MIN_INT32,MAX_INT32]
     */
    get position(): any;
    /**
     * @param {BoostMotorState} value - set this motor's state.
     */
    set status(arg: {
        OFF: number;
        ON_FOREVER: number;
        ON_FOR_TIME: number;
        ON_FOR_ROTATION: number;
    });
    /**
     * @return {BoostMotorState} - the motor's current state.
     */
    get status(): {
        OFF: number;
        ON_FOREVER: number;
        ON_FOR_TIME: number;
        ON_FOR_ROTATION: number;
    };
    /**
     * @return {number} - time, in milliseconds, of when the pending duration timeout began.
     */
    get pendingDurationTimeoutStartTime(): number;
    /**
     * @return {number} - delay, in milliseconds, of the pending duration timeout.
     */
    get pendingDurationTimeoutDelay(): number;
    /**
     * @return {number} - target position, in degrees, of the pending rotation.
     */
    get pendingRotationDestination(): number;
    /**
     * @param {function} func - function to resolve pending rotation Promise
     */
    set pendingRotationPromise(arg: Promise<any>);
    /**
     * @return {Promise} - the Promise function for the pending rotation.
     */
    get pendingRotationPromise(): Promise<any>;
    /**
     * Turn this motor on indefinitely
     * @private
     */
    private _turnOn;
    /**
     * Turn this motor on indefinitely
     */
    turnOnForever(): void;
    /**
     * Turn this motor on for a specific duration.
     * @param {number} milliseconds - run the motor for this long.
     */
    turnOnFor(milliseconds: number): void;
    /**
     * Turn this motor on for a specific rotation in degrees.
     * @param {number} degrees - run the motor for this amount of degrees.
     * @param {number} direction - rotate in this direction
     */
    turnOnForDegrees(degrees: number, direction: number): void;
    /**
     * Clear the motor action timeout, if any. Safe to call even when there is no pending timeout.
     * @private
     */
    private _clearDurationTimeout;
    /**
     * Set a new motor action timeout, after clearing an existing one if necessary.
     * @param {Function} callback - to be called at the end of the timeout.
     * @param {int} delay - wait this many milliseconds before calling the callback.
     * @private
     */
    private _setNewDurationTimeout;
    /**
     * Clear the motor states related to rotation-based commands, if any.
     * Safe to call even when there is no pending promise function.
     * @private
     */
    private _clearRotationState;
}
