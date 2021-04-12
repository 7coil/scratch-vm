export = Scratch3Ev3Blocks;
declare class Scratch3Ev3Blocks {
    /**
     * The ID of the extension.
     * @return {string} the id
     */
    static get EXTENSION_ID(): string;
    /**
     * Creates a new instance of the EV3 extension.
     * @param  {object} runtime VM runtime
     * @constructor
     */
    constructor(runtime: object);
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    runtime: any;
    _peripheral: EV3;
    _playNoteForPicker(note: any, category: any): void;
    /**
     * Define the EV3 extension.
     * @return {object} Extension description.
     */
    getInfo(...args: any[]): object;
    motorTurnClockwise(args: any): Promise<any>;
    motorTurnCounterClockwise(args: any): Promise<any>;
    motorSetPower(args: any): void;
    getMotorPosition(args: any): number;
    whenButtonPressed(args: any): boolean;
    whenDistanceLessThan(args: any): boolean;
    whenBrightnessLessThan(args: any): boolean;
    buttonPressed(args: any): boolean;
    getDistance(): any;
    getBrightness(): any;
    beep(args: any): Promise<any>;
    /**
     * Call a callback for each motor indexed by the provided motor ID.
     *
     * Note: This way of looping through motors is currently unnecessary, but could be
     * useful if an 'all motors' option is added in the future (see WeDo2 extension).
     *
     * @param {MotorID} motorID - the ID specifier.
     * @param {Function} callback - the function to call with the numeric motor index for each motor.
     * @private
     */
    private _forEachMotor;
    /**
     * Formats menus into a format suitable for block menus, and loading previously
     * saved projects:
     * [
     *   {
     *    text: label,
     *    value: index
     *   },
     *   {
     *    text: label,
     *    value: index
     *   },
     *   etc...
     * ]
     *
     * @param {array} menu - a menu to format.
     * @return {object} - a formatted menu as an object.
     * @private
     */
    private _formatMenu;
}
declare class EV3 {
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
     * A list of the names of the sensors connected in ports 1,2,3,4.
     * @type {string[]}
     * @private
     */
    private _sensorPorts;
    /**
     * A list of the names of the motors connected in ports A,B,C,D.
     * @type {string[]}
     * @private
     */
    private _motorPorts;
    /**
     * The state of all sensor values.
     * @type {string[]}
     * @private
     */
    private _sensors;
    /**
     * The motors which this EV3 could possibly have connected.
     * @type {string[]}
     * @private
     */
    private _motors;
    /**
     * The polling interval, in milliseconds.
     * @type {number}
     * @private
     */
    private _pollingInterval;
    /**
     * The polling interval ID.
     * @type {number}
     * @private
     */
    private _pollingIntervalID;
    /**
     * The counter keeping track of polling cycles.
     * @type {string[]}
     * @private
     */
    private _pollingCounter;
    /**
     * The Bluetooth socket connection for reading/writing peripheral data.
     * @type {BT}
     * @private
     */
    private _bt;
    /**
     * A rate limiter utility, to help limit the rate at which we send BT messages
     * over the socket to Scratch Link to a maximum number of sends per second.
     * @type {RateLimiter}
     * @private
     */
    private _rateLimiter;
    /**
     * Reset all the state and timeout/interval ids.
     */
    reset(): void;
    /**
     * When the EV3 peripheral connects, start polling for sensor and motor values.
     * @private
     */
    private _onConnect;
    /**
     * Message handler for incoming EV3 reply messages, either a list of connected
     * devices (sensors and motors) or the values of the connected sensors and motors.
     *
     * See 'EV3 Communication Developer Kit', section 4.1, page 24 at
     * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits
     * for more details on direct reply formats.
     *
     * The direct reply byte array sent takes the following format:
     * Byte 0 – 1: Reply size, Little Endian. Reply size not including these 2 bytes
     * Byte 2 – 3: Message counter, Little Endian. Equals the Direct Command
     * Byte 4:     Reply type. Either DIRECT_REPLY or DIRECT_REPLY_ERROR
     * Byte 5 - n: Resonse buffer. I.e. the content of the by the Command reserved global variables.
     *             I.e. if the command reserved 64 bytes, these bytes will be placed in the reply
     *             packet as the bytes 5 to 68.
     *
     * See 'EV3 Firmware Developer Kit', section 4.8, page 56 at
     * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits
     * for direct response buffer formats for various commands.
     *
     * @param {object} params - incoming message parameters
     * @private
     */
    private _onMessage;
    /**
     * Poll the EV3 for sensor and motor input values, based on the list of
     * known connected sensors and motors. This is sent as many compound commands
     * in a direct command, with a reply expected.
     *
     * See 'EV3 Firmware Developer Kit', section 4.8, page 46, at
     * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits
     * for a list of polling/input device commands and their arguments.
     *
     * @private
     */
    private _pollValues;
    get distance(): any;
    get brightness(): any;
    /**
     * Access a particular motor on this peripheral.
     * @param {int} index - the zero-based index of the desired motor.
     * @return {EV3Motor} - the EV3Motor instance, if any, at that index.
     */
    motor(index: any): EV3Motor;
    isButtonPressed(port: any): boolean;
    beep(freq: any, time: any): void;
    stopAll(): void;
    stopSound(): void;
    stopAllMotors(): void;
    /**
     * Called by the runtime when user wants to scan for an EV3 peripheral.
     */
    scan(): void;
    /**
     * Called by the runtime when user wants to connect to a certain EV3 peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect(id: number): void;
    /**
     * Called by the runtime when user wants to disconnect from the EV3 peripheral.
     */
    disconnect(): void;
    /**
     * Called by the runtime to detect whether the EV3 peripheral is connected.
     * @return {boolean} - the connected state.
     */
    isConnected(): boolean;
    /**
     * Send a message to the peripheral BT socket.
     * @param {Uint8Array} message - the message to send.
     * @param {boolean} [useLimiter=true] - if true, use the rate limiter
     * @return {Promise} - a promise result of the send operation.
     */
    send(message: Uint8Array, useLimiter?: boolean): Promise<any>;
    /**
     * Genrates direct commands that are sent to the EV3 as a single or compounded byte arrays.
     * See 'EV3 Communication Developer Kit', section 4, page 24 at
     * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
     *
     * Direct commands are one of two types:
     * DIRECT_COMMAND_NO_REPLY = a direct command where no reply is expected
     * DIRECT_COMMAND_REPLY = a direct command where a reply is expected, and the
     * number and length of returned values needs to be specified.
     *
     * The direct command byte array sent takes the following format:
     * Byte 0 - 1: Command size, Little Endian. Command size not including these 2 bytes
     * Byte 2 - 3: Message counter, Little Endian. Forth running counter
     * Byte 4:     Command type. Either DIRECT_COMMAND_REPLY or DIRECT_COMMAND_NO_REPLY
     * Byte 5 - 6: Reservation (allocation) of global and local variables using a compressed format
     *             (globals reserved in byte 5 and the 2 lsb of byte 6, locals reserved in the upper
     *             6 bits of byte 6) – see documentation for more details.
     * Byte 7 - n: Byte codes as a single command or compound commands (I.e. more commands composed
     *             as a small program)
     *
     * @param {number} type - the direct command type.
     * @param {string} byteCommands - a compound array of EV3 Opcode + arguments.
     * @param {number} allocation - the allocation of global and local vars needed for replies.
     * @return {array} - generated complete command byte array, with header and compounded commands.
     */
    generateCommand(type: number, byteCommands: string, allocation?: number): any[];
    _updateDevices: boolean;
}
/**
 * Manage power, direction, and timers for one EV3 motor.
 */
declare class EV3Motor {
    /**
     * Construct a EV3 Motor instance, which could be of type 'largeMotor' or
     * 'mediumMotor'.
     *
     * @param {EV3} parent - the EV3 peripheral which owns this motor.
     * @param {int} index - the zero-based index of this motor on its parent peripheral.
     * @param {string} type - the type of motor (i.e. 'largeMotor' or 'mediumMotor').
     */
    constructor(parent: EV3, index: any, type: string);
    /**
     * The EV3 peripheral which owns this motor.
     * @type {EV3}
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
     * The type of EV3 motor this could be: 'largeMotor' or 'mediumMotor'.
     * @type {string}
     * @private
     */
    private _type;
    /**
     * This motor's current direction: 1 for "clockwise" or -1 for "counterclockwise"
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
     * This motor's current position, in the range [0,360].
     * @type {number}
     * @private
     */
    private _position;
    /**
     * An ID for the current coast command, to help override multiple coast
     * commands sent in succession.
     * @type {number}
     * @private
     */
    private _commandID;
    /**
     * A delay, in milliseconds, to add to coasting, to make sure that a brake
     * first takes effect if one was sent.
     * @type {number}
     * @private
     */
    private _coastDelay;
    /**
     * @param {string} value - this motor's new type: 'largeMotor' or 'mediumMotor'
     */
    set type(arg: string);
    /**
     * @return {string} - this motor's type: 'largeMotor' or 'mediumMotor'
     */
    get type(): string;
    /**
     * @param {int} value - this motor's new direction: 1 for "clockwise" or -1 for "counterclockwise"
     */
    set direction(arg: any);
    /**
     * @return {int} - this motor's current direction: 1 for "clockwise" or -1 for "counterclockwise"
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
     * @param {int} array - this motor's new position, in the range [0,360].
     */
    set position(arg: any);
    /**
     * @return {int} - this motor's current position, in the range [-inf,inf].
     */
    get position(): any;
    /**
     * Turn this motor on for a specific duration.
     * Found in the 'EV3 Firmware Developer Kit', page 56, at
     * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
     *
     * Opcode arguments:
     * (Data8) LAYER – Specify chain layer number [0 - 3]
     * (Data8) NOS – Output bit field [0x00 – 0x0F]
     * (Data8) SPEED – Power level, [-100 – 100]
     * (Data32) STEP1 – Time in milliseconds for ramp up
     * (Data32) STEP2 – Time in milliseconds for continues run
     * (Data32) STEP3 – Time in milliseconds for ramp down
     * (Data8) BRAKE - Specify break level [0: Float, 1: Break]
     *
     * @param {number} milliseconds - run the motor for this long.
     */
    turnOnFor(milliseconds: number): void;
    /**
     * Set the motor to coast after a specified amount of time.
     * @param {number} time - the time in milliseconds.
     */
    coastAfter(time: number): void;
    /**
     * Set the motor to coast.
     */
    coast(): void;
    /**
     * Generate motor run values for a given input.
     * @param  {number} run - run input.
     * @return {array} - run values as a byte array.
     */
    _runValues(run: number): any[];
    /**
     * Return a port value for the EV3 that is in the format for 'output bit field'
     * as 1/2/4/8, generally needed for motor ports, instead of the typical 0/1/2/3.
     * The documentation in the 'EV3 Firmware Developer Kit' for motor port arguments
     * is sometimes mistaken, but we believe motor ports are mostly addressed this way.
     * @param {number} port - the port number to convert to an 'output bit field'.
     * @return {number} - the converted port number.
     */
    _portMask(port: number): number;
}
