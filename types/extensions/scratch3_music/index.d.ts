export = Scratch3MusicBlocks;
/**
 * Class for the music-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
declare class Scratch3MusicBlocks {
    /**
     * The key to load & store a target's music-related state.
     * @type {string}
     */
    static get STATE_KEY(): string;
    /**
     * The default music-related state, to be used when a target has no existing music state.
     * @type {MusicState}
     */
    static get DEFAULT_MUSIC_STATE(): any;
    /**
     * The minimum and maximum MIDI note numbers, for clamping the input to play note.
     * @type {{min: number, max: number}}
     */
    static get MIDI_NOTE_RANGE(): {
        min: number;
        max: number;
    };
    /**
     * The minimum and maximum beat values, for clamping the duration of play note, play drum and rest.
     * 100 beats at the default tempo of 60bpm is 100 seconds.
     * @type {{min: number, max: number}}
     */
    static get BEAT_RANGE(): {
        min: number;
        max: number;
    };
    /** The minimum and maximum tempo values, in bpm.
     * @type {{min: number, max: number}}
     */
    static get TEMPO_RANGE(): {
        min: number;
        max: number;
    };
    /**
     * The maximum number of sounds to allow to play simultaneously.
     * @type {number}
     */
    static get CONCURRENCY_LIMIT(): number;
    constructor(runtime: any);
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    runtime: any;
    /**
     * The number of drum and instrument sounds currently being played simultaneously.
     * @type {number}
     * @private
     */
    private _concurrencyCounter;
    /**
     * An array of sound players, one for each drum sound.
     * @type {Array}
     * @private
     */
    private _drumPlayers;
    /**
     * An array of arrays of sound players. Each instrument has one or more audio players.
     * @type {Array[]}
     * @private
     */
    private _instrumentPlayerArrays;
    /**
     * An array of arrays of sound players. Each instrument mya have an audio player for each playable note.
     * @type {Array[]}
     * @private
     */
    private _instrumentPlayerNoteArrays;
    /**
     * An array of audio bufferSourceNodes. Each time you play an instrument or drum sound,
     * a bufferSourceNode is created. We keep references to them to make sure their onended
     * events can fire.
     * @type {Array}
     * @private
     */
    private _bufferSources;
    /**
     * When a music-playing Target is cloned, clone the music state.
     * @param {Target} newTarget - the newly created target.
     * @param {Target} [sourceTarget] - the target used as a source for the new clone, if any.
     * @listens Runtime#event:targetWasCreated
     * @private
     */
    private _onTargetCreated;
    _playNoteForPicker(noteNum: any, category: any): void;
    /**
     * Decode the full set of drum and instrument sounds, and store the audio buffers in arrays.
     */
    _loadAllSounds(): void;
    /**
     * Decode a sound and store the player in an array.
     * @param {string} filePath - the audio file name.
     * @param {number} index - the index at which to store the audio player.
     * @param {array} playerArray - the array of players in which to store it.
     * @return {Promise} - a promise which will resolve once the sound has been stored.
     */
    _storeSound(filePath: string, index: number, playerArray: any[]): Promise<any>;
    /**
     * Decode a sound and return a promise with the audio buffer.
     * @param  {ArrayBuffer} soundBuffer - a buffer containing the encoded audio.
     * @return {Promise} - a promise which will resolve once the sound has decoded.
     */
    _decodeSound(soundBuffer: ArrayBuffer): Promise<any>;
    /**
     * Create data for a menu in scratch-blocks format, consisting of an array of objects with text and
     * value properties. The text is a translated string, and the value is one-indexed.
     * @param  {object[]} info - An array of info objects each having a name property.
     * @return {array} - An array of objects with text and value properties.
     * @private
     */
    private _buildMenu;
    /**
     * An array of info about each drum.
     * @type {object[]}
     * @param {string} name - the translatable name to display in the drums menu.
     * @param {string} fileName - the name of the audio file containing the drum sound.
     */
    get DRUM_INFO(): any[];
    /**
     * An array of info about each instrument.
     * @type {object[]}
     * @param {string} name - the translatable name to display in the instruments menu.
     * @param {string} dirName - the name of the directory containing audio samples for this instrument.
     * @param {number} [releaseTime] - an optional duration for the release portion of each note.
     * @param {number[]} samples - an array of numbers representing the MIDI note number for each
     *                           sampled sound used to play this instrument.
     */
    get INSTRUMENT_INFO(): any[];
    /**
     * An array that is a mapping from MIDI instrument numbers to Scratch instrument numbers.
     * @type {number[]}
     */
    get MIDI_INSTRUMENTS(): number[];
    /**
     * An array that is a mapping from MIDI drum numbers in range (35..81) to Scratch drum numbers.
     * It's in the format [drumNum, pitch, decay].
     * The pitch and decay properties are not currently being used.
     * @type {Array[]}
     */
    get MIDI_DRUMS(): any[][];
    /**
     * @param {Target} target - collect music state for this target.
     * @returns {MusicState} the mutable music state associated with that target. This will be created if necessary.
     * @private
     */
    private _getMusicState;
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    /**
     * Play a drum sound for some number of beats.
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     * @property {int} DRUM - the number of the drum to play.
     * @property {number} BEATS - the duration in beats of the drum sound.
     */
    playDrumForBeats(args: object, util: object): void;
    /**
     * Play a drum sound for some number of beats according to the range of "MIDI" drum codes supported.
     * This block is implemented for compatibility with old Scratch projects that use the
     * 'drum:duration:elapsed:from:' block.
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     */
    midiPlayDrumForBeats(args: object, util: object): void;
    /**
     * Internal code to play a drum sound for some number of beats.
     * @param {number} drumNum - the drum number.
     * @param {beats} beats - the duration in beats to pause after playing the sound.
     * @param {object} util - utility object provided by the runtime.
     */
    _playDrumForBeats(drumNum: number, beats: any, util: object): void;
    /**
     * Play a drum sound using its 0-indexed number.
     * @param {object} util - utility object provided by the runtime.
     * @param {number} drumNum - the number of the drum to play.
     * @private
     */
    private _playDrumNum;
    /**
     * Rest for some number of beats.
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     * @property {number} BEATS - the duration in beats of the rest.
     */
    restForBeats(args: object, util: object): void;
    /**
     * Play a note using the current musical instrument for some number of beats.
     * This function processes the arguments, and handles the timing of the block's execution.
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     * @property {number} NOTE - the pitch of the note to play, interpreted as a MIDI note number.
     * @property {number} BEATS - the duration in beats of the note.
     */
    playNoteForBeats(args: object, util: object): void;
    /**
     * Play a note using the current instrument for a duration in seconds.
     * This function actually plays the sound, and handles the timing of the sound, including the
     * "release" portion of the sound, which continues briefly after the block execution has finished.
     * @param {object} util - utility object provided by the runtime.
     * @param {number} note - the pitch of the note to play, interpreted as a MIDI note number.
     * @param {number} durationSec - the duration in seconds to play the note.
     * @private
     */
    private _playNote;
    /**
     * The samples array for each instrument is the set of pitches of the available audio samples.
     * This function selects the best one to use to play a given input note, and returns its index
     * in the samples array.
     * @param  {number} note - the input note to select a sample for.
     * @param  {number[]} samples - an array of the pitches of the available samples.
     * @return {index} the index of the selected sample in the samples array.
     * @private
     */
    private _selectSampleIndexForNote;
    /**
     * Calcuate the frequency ratio for a given musical interval.
     * @param  {number} interval - the pitch interval to convert.
     * @return {number} a ratio corresponding to the input interval.
     * @private
     */
    private _ratioForPitchInterval;
    /**
     * Clamp a duration in beats to the allowed min and max duration.
     * @param  {number} beats - a duration in beats.
     * @return {number} - the clamped duration.
     * @private
     */
    private _clampBeats;
    /**
     * Convert a number of beats to a number of seconds, using the current tempo.
     * @param  {number} beats - number of beats to convert to secs.
     * @return {number} seconds - number of seconds `beats` will last.
     * @private
     */
    private _beatsToSec;
    /**
     * Check if the stack timer needs initialization.
     * @param {object} util - utility object provided by the runtime.
     * @return {boolean} - true if the stack timer needs to be initialized.
     * @private
     */
    private _stackTimerNeedsInit;
    /**
     * Start the stack timer and the yield the thread if necessary.
     * @param {object} util - utility object provided by the runtime.
     * @param {number} duration - a duration in seconds to set the timer for.
     * @private
     */
    private _startStackTimer;
    /**
     * Check the stack timer, and if its time is not up yet, yield the thread.
     * @param {object} util - utility object provided by the runtime.
     * @private
     */
    private _checkStackTimer;
    /**
     * Select an instrument for playing notes.
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     * @property {int} INSTRUMENT - the number of the instrument to select.
     */
    setInstrument(args: object, util: object): void;
    /**
     * Select an instrument for playing notes according to a mapping of MIDI codes to Scratch instrument numbers.
     * This block is implemented for compatibility with old Scratch projects that use the 'midiInstrument:' block.
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     * @property {int} INSTRUMENT - the MIDI number of the instrument to select.
     */
    midiSetInstrument(args: object, util: object): void;
    /**
     * Internal code to select an instrument for playing notes. If mapMidi is true, set the instrument according to
     * the MIDI to Scratch instrument mapping.
     * @param {number} instNum - the instrument number.
     * @param {object} util - utility object provided by the runtime.
     * @param {boolean} mapMidi - whether or not instNum is a MIDI instrument number.
     */
    _setInstrument(instNum: number, util: object, mapMidi: boolean): void;
    /**
     * Set the current tempo to a new value.
     * @param {object} args - the block arguments.
     * @property {number} TEMPO - the tempo, in beats per minute.
     */
    setTempo(args: object): void;
    /**
     * Change the current tempo by some amount.
     * @param {object} args - the block arguments.
     * @property {number} TEMPO - the amount to change the tempo, in beats per minute.
     */
    changeTempo(args: object): void;
    /**
     * Update the current tempo, clamping it to the min and max allowable range.
     * @param {number} tempo - the tempo to set, in beats per minute.
     * @private
     */
    private _updateTempo;
    /**
     * Get the current tempo.
     * @return {number} - the current tempo, in beats per minute.
     */
    getTempo(): number;
}
