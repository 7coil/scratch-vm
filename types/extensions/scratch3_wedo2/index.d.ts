export = Scratch3WeDo2Blocks;
/**
 * Scratch 3.0 blocks to interact with a LEGO WeDo 2.0 peripheral.
 */
declare class Scratch3WeDo2Blocks {
    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID(): string;
    /**
     * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
     */
    static get TILT_THRESHOLD(): number;
    /**
     * Construct a set of WeDo 2.0 blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor(runtime: any);
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    runtime: any;
    _peripheral: WeDo2;
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
     * Turn specified motor(s) off.
     * @param {object} args - the block's arguments.
     * @property {MotorID} MOTOR_ID - the motor(s) to be affected.
     * @property {int} POWER - the new power level for the motor(s).
     * @return {Promise} - a Promise that resolves after some delay.
     */
    startMotorPower(args: object): Promise<any>;
    /**
     * Set the direction of rotation for specified motor(s).
     * If the direction is 'reverse' the motor(s) will be reversed individually.
     * @param {object} args - the block's arguments.
     * @property {MotorID} MOTOR_ID - the motor(s) to be affected.
     * @property {MotorDirection} MOTOR_DIRECTION - the new direction for the motor(s).
     * @return {Promise} - a Promise that resolves after some delay.
     */
    setMotorDirection(args: object): Promise<any>;
    /**
     * Set the LED's hue.
     * @param {object} args - the block's arguments.
     * @property {number} HUE - the hue to set, in the range [0,100].
     * @return {Promise} - a Promise that resolves after some delay.
     */
    setLightHue(args: object): Promise<any>;
    /**
     * Make the WeDo 2.0 peripheral play a MIDI note for the specified duration.
     * @param {object} args - the block's arguments.
     * @property {number} NOTE - the MIDI note to play.
     * @property {number} DURATION - the duration of the note, in seconds.
     * @return {Promise} - a promise which will resolve at the end of the duration.
     */
    playNoteFor(args: object): Promise<any>;
    /**
     * Compare the distance sensor's value to a reference.
     * @param {object} args - the block's arguments.
     * @property {string} OP - the comparison operation: '<' or '>'.
     * @property {number} REFERENCE - the value to compare against.
     * @return {boolean} - the result of the comparison, or false on error.
     */
    whenDistance(args: object): boolean;
    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} TILT_DIRECTION_ANY - the tilt direction to test (up, down, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     */
    whenTilted(args: object): boolean;
    /**
     * @return {number} - the distance sensor's value, scaled to the [0,100] range.
     */
    getDistance(): number;
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
     * Call a callback for each motor indexed by the provided motor ID.
     * @param {MotorID} motorID - the ID specifier.
     * @param {Function} callback - the function to call with the numeric motor index for each motor.
     * @private
     */
    private _forEachMotor;
    /**
     * @param {number} midiNote - the MIDI note value to convert.
     * @return {number} - the frequency, in Hz, corresponding to that MIDI note value.
     * @private
     */
    private _noteToTone;
}
/**
 * Manage communication with a WeDo 2.0 peripheral over a Bluetooth Low Energy client socket.
 */
declare class WeDo2 {
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
     * A list of the ids of the motors or sensors in ports 1 and 2.
     * @type {string[]}
     * @private
     */
    private _ports;
    /**
     * The motors which this WeDo 2.0 could possibly have.
     * @type {WeDo2Motor[]}
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
    private _batteryLevelIntervalId;
    /**
     * Reset all the state and timeout/interval ids.
     */
    reset(): void;
    /**
     * Sets LED mode and initial color and starts reading data from peripheral after BLE has connected.
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
     * Check the battery level on the WeDo 2.0. If the WeDo 2.0 has disconnected
     * for some reason, the BLE socket will get an error back and automatically
     * close the socket.
     */
    _checkBatteryLevel(): void;
    /**
     * @return {number} - the latest value received for the tilt sensor's tilt about the X axis.
     */
    get tiltX(): number;
    /**
     * @return {number} - the latest value received for the tilt sensor's tilt about the Y axis.
     */
    get tiltY(): number;
    /**
     * @return {number} - the latest value received from the distance sensor.
     */
    get distance(): number;
    /**
     * Access a particular motor on this peripheral.
     * @param {int} index - the zero-based index of the desired motor.
     * @return {WeDo2Motor} - the WeDo2Motor instance, if any, at that index.
     */
    motor(index: any): WeDo2Motor;
    /**
     * Stop all the motors that are currently running.
     */
    stopAllMotors(): void;
    /**
     * Set the WeDo 2.0 peripheral's LED to a specific color.
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
     * Switch off the LED on the WeDo 2.0.
     * @return {Promise} - a promise of the completion of the stop led send operation.
     */
    stopLED(): Promise<any>;
    /**
     * Play a tone from the WeDo 2.0 peripheral for a specific amount of time.
     * @param {int} tone - the pitch of the tone, in Hz.
     * @param {int} milliseconds - the duration of the note, in milliseconds.
     * @return {Promise} - a promise of the completion of the play tone send operation.
     */
    playTone(tone: any, milliseconds: any): Promise<any>;
    /**
     * Stop the tone playing from the WeDo 2.0 peripheral, if any.
     * @return {Promise} - a promise that the command sent.
     */
    stopTone(): Promise<any>;
    /**
     * Stop the tone playing and motors on the WeDo 2.0 peripheral.
     */
    stopAll(): void;
    /**
     * Called by the runtime when user wants to scan for a WeDo 2.0 peripheral.
     */
    scan(): void;
    /**
     * Called by the runtime when user wants to connect to a certain WeDo 2.0 peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect(id: number): void;
    /**
     * Disconnects from the current BLE socket.
     */
    disconnect(): void;
    /**
     * Called by the runtime to detect whether the WeDo 2.0 peripheral is connected.
     * @return {boolean} - the connected state.
     */
    isConnected(): boolean;
    /**
     * Write a message to the WeDo 2.0 peripheral BLE socket.
     * @param {number} uuid - the UUID of the characteristic to write to
     * @param {Array} message - the message to write.
     * @param {boolean} [useLimiter=true] - if true, use the rate limiter
     * @return {Promise} - a promise result of the write operation
     */
    send(uuid: number, message: any[], useLimiter?: boolean): Promise<any>;
    /**
     * Generate a WeDo 2.0 'Output Command' in the byte array format
     * (CONNECT ID, COMMAND ID, NUMBER OF BYTES, VALUES ...).
     *
     * This sends a command to the WeDo 2.0 to actuate the specified outputs.
     *
     * @param  {number} connectID - the port (Connect ID) to send a command to.
     * @param  {number} commandID - the id of the byte command.
     * @param  {array}  values    - the list of values to write to the command.
     * @return {array}            - a generated output command.
     */
    generateOutputCommand(connectID: number, commandID: number, values?: any[]): any[];
    /**
     * Generate a WeDo 2.0 'Input Command' in the byte array format
     * (COMMAND ID, COMMAND TYPE, CONNECT ID, TYPE ID, MODE, DELTA INTERVAL (4 BYTES),
     * UNIT, NOTIFICATIONS ENABLED).
     *
     * This sends a command to the WeDo 2.0 that sets that input format
     * of the specified inputs and sets value change notifications.
     *
     * @param  {number}  connectID           - the port (Connect ID) to send a command to.
     * @param  {number}  type                - the type of input sensor.
     * @param  {number}  mode                - the mode of the input sensor.
     * @param  {number}  delta               - the delta change needed to trigger notification.
     * @param  {array}   units               - the unit of the input sensor value.
     * @param  {boolean} enableNotifications - whether to enable notifications.
     * @return {array}                       - a generated input command.
     */
    generateInputCommand(connectID: number, type: number, mode: number, delta: number, units: any[], enableNotifications: boolean): any[];
    /**
     * Register a new sensor or motor connected at a port.  Store the type of
     * sensor or motor internally, and then register for notifications on input
     * values if it is a sensor.
     * @param {number} connectID - the port to register a sensor or motor on.
     * @param {number} type - the type ID of the sensor or motor
     * @private
     */
    private _registerSensorOrMotor;
    /**
     * Clear the sensor or motor present at port 1 or 2.
     * @param {number} connectID - the port to clear.
     * @private
     */
    private _clearPort;
}
/**
 * Manage power, direction, and timers for one WeDo 2.0 motor.
 */
declare class WeDo2Motor {
    /**
     * Construct a WeDo 2.0 Motor instance.
     * @param {WeDo2} parent - the WeDo 2.0 peripheral which owns this motor.
     * @param {int} index - the zero-based index of this motor on its parent peripheral.
     */
    constructor(parent: WeDo2, index: any);
    /**
     * The WeDo 2.0 peripheral which owns this motor.
     * @type {WeDo2}
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
     * Is this motor currently moving?
     * @type {boolean}
     * @private
     */
    private _isOn;
    /**
     * If the motor has been turned on or is actively braking for a specific duration, this is the timeout ID for
     * the end-of-action handler. Cancel this when changing plans.
     * @type {Object}
     * @private
     */
    private _pendingTimeoutId;
    /**
     * The starting time for the pending timeout.
     * @type {Object}
     * @private
     */
    private _pendingTimeoutStartTime;
    /**
     * The delay/duration of the pending timeout.
     * @type {Object}
     * @private
     */
    private _pendingTimeoutDelay;
    /**
     * Start active braking on this motor. After a short time, the motor will turn off.
     */
    startBraking(): void;
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
     * @param {int} value - this motor's new power level, in the range [0,100].
     */
    set power(arg: any);
    /**
     * @return {int} - this motor's current power level, in the range [0,100].
     */
    get power(): any;
    /**
     * @return {boolean} - true if this motor is currently moving, false if this motor is off or braking.
     */
    get isOn(): boolean;
    /**
     * @return {boolean} - time, in milliseconds, of when the pending timeout began.
     */
    get pendingTimeoutStartTime(): boolean;
    /**
     * @return {boolean} - delay, in milliseconds, of the pending timeout.
     */
    get pendingTimeoutDelay(): boolean;
    /**
     * Turn this motor on indefinitely.
     */
    turnOn(): void;
    /**
     * Turn this motor on for a specific duration.
     * @param {number} milliseconds - run the motor for this long.
     */
    turnOnFor(milliseconds: number): void;
    /**
     * Clear the motor action timeout, if any. Safe to call even when there is no pending timeout.
     * @private
     */
    private _clearTimeout;
    /**
     * Set a new motor action timeout, after clearing an existing one if necessary.
     * @param {Function} callback - to be called at the end of the timeout.
     * @param {int} delay - wait this many milliseconds before calling the callback.
     * @private
     */
    private _setNewTimeout;
}
