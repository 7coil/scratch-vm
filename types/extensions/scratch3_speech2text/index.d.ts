export = Scratch3Speech2TextBlocks;
declare class Scratch3Speech2TextBlocks {
    /**
     * The key to load & store a target's speech-related state.
     * @type {string}
     */
    static get STATE_KEY(): string;
    constructor(runtime: any);
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    runtime: any;
    /**
     * An array of phrases from the [when I hear] hat blocks.
     * The list of phrases in the when I hear hat blocks.  This list is sent
     * to the speech api to seed the recognition engine and for deciding
     * whether the transcription results match.
     * @type {Array}
     * @private
     */
    private _phraseList;
    /**
     * The most recent transcription result received from the speech API that we decided to keep.
     * This is the value returned by the reporter block.
     * @type {String}
     * @private
     */
    private _currentUtterance;
    /**
     *  Similar to _currentUtterance, but set back to '' at the beginning of listening block
     *  and on green flag.
     *  Used to get the hat blocks to edge trigger.  In order to detect someone saying
     *  the same thing twice in two subsequent listen and wait blocks
     *  and still trigger the hat, we need this to go from
     *  '' at the beginning of the listen block to '<transcription value>' at the end.
     * @type {string}
     * @private
     */
    private _utteranceForEdgeTrigger;
    /**
     * The list of queued `resolve` callbacks for 'Listen and Wait' blocks.
     * We only listen to for one utterance at a time.  We may encounter multiple
     * 'Listen and wait' blocks that tell us to start listening. If one starts
     * and hasn't receieved results back yet, when we encounter more, any further ones
     * will all resolve when we get the next acceptable transcription result back.
     * @type {!Array}
     * @private
     */
    private _speechPromises;
    /**
     * The id of the timeout that will run if we start listening and don't get any
     * transcription results back. e.g. because we didn't hear anything.
     * @type {number}
     * @private
     */
    private _speechTimeoutId;
    /**
     * The id of the timeout that will run to wait for after we're done listening but
     * are still waiting for a potential isFinal:true transcription result to come back.
     * @type {number}
     * @private
     */
    private _speechFinalResponseTimeout;
    /**
     * The ScriptProcessorNode hooked up to the audio context.
     * @type {ScriptProcessorNode}
     * @private
     */
    private _scriptNode;
    /**
     * The socket used to communicate with the speech server to send microphone data
     * and recieve transcription results.
     * @type {WebSocket}
     * @private
     */
    private _socket;
    /**
     * The AudioContext used to manage the microphone.
     * @type {AudioContext}
     * @private
     */
    private _context;
    /**
     * MediaStreamAudioSourceNode to handle microphone data.
     * @type {MediaStreamAudioSourceNode}
     * @private
     */
    private _sourceNode;
    /**
     * A Promise whose fulfillment handler receives a MediaStream object when the microphone has been obtained.
     * @type {Promise}
     * @private
     */
    private _audioPromise;
    /**
     * Diff Match Patch is used to do some fuzzy matching of the transcription results
     * with what is in the hat blocks.
     */
    _dmp: any;
    /**
     * Callback called when it is time to setup the new web socket.
     * @param {Function} resolve - function to call when the web socket opens succesfully.
     * @param {Function} reject - function to call if opening the web socket fails.
     */
    _newSocketCallback(resolve: Function, reject: Function): void;
    /**
     * Callback to handle initial setting up of a socket.
     * Currently we send a setup message (only contains sample rate) but might
     * be useful to send more data so we can do quota stuff.
     * @param {Array} values The
     */
    _setupSocketCallback(values: any[]): void;
    /**
     * Callback called once we've initially established the web socket is open and working.
     * Sets up the callback for subsequent messages (i.e. transcription results)  and
     * connects to the script node to get data.
     * @private
     */
    private _socketMessageCallback;
    /**
     * Called when we have data from the microphone. Takes that data and ships
     * it off to the speech server for transcription.
     * @param {audioProcessingEvent} e The event with audio data in it.
     * @private
     */
    private _processAudioCallback;
    /**
     * Handle a message from the socket. It contains transcription results.
     * @param {MessageEvent} e The message event containing data from speech server.
     * @private
     */
    private _onTranscriptionFromServer;
    /**
     * Resets all things related to listening. Called on Red Stop sign button.
     *   - suspends audio processing
     *   - closes socket with speech socket server
     *   - clears out any remaining speech blocks that are waiting.
     * @private.
     */
    private _resetListening;
    /**
     * Called when we want to stop listening (e.g. when a listen block times out)
     * but we still want to wait a little to see if we get any transcription results
     * back before yielding the block execution.
     * @private
     */
    private _stopTranscription;
    /**
     * Scans all the 'When I hear' hat blocks for each sprite and pulls out the text.  The list
     * is sent off to the speech recognition server as hints.  This *only* reads the value out of
     * the hat block shadow.  If a block is dropped on top of the shadow, it is skipped.
     * @returns {Array} list of strings from the hat blocks in the project.
     * @private
     */
    private _scanBlocksForPhraseList;
    /**
     * Get the viewer's language code.
     * @return {string} the language code.
     */
    _getViewerLanguageCode(): string;
    /**
     * Reset the utterance we look for in the when I hear hat block back to
     * the empty string.
     * @private
     */
    private _resetEdgeTriggerUtterance;
    /**
     * Close the connection to the socket server if it is open.
     * @private
     */
    private _closeWebsocket;
    /**
     * Call to suspend getting data from the microphone.
     * @private
     */
    private _stopListening;
    /**
     * Resolves all the speech promises we've accumulated so far and empties out the list.
     * @private
     */
    private _resolveSpeechPromises;
    /**
     * Decides whether to keep a given transcirption result.
     * @param {number} fuzzyMatchIndex Index of the fuzzy match or -1 if there is no match.
     * @param {object} result The json object representing the transcription result.
     * @param {string} normalizedTranscript The transcription text used for matching (i.e. lowercased, no punctuation).
     * @returns {boolean} true If a result is good enough to be kept.
     * @private
     */
    private _shouldKeepResult;
    /**
     * Normalizes text a bit to facilitate matching.  Lowercases, removes some punctuation and whitespace.
     * @param {string} text The text to normalzie
     * @returns {string} The normalized text.
     * @private
     */
    private _normalizeText;
    /**
     * Call into diff match patch library to compute whether there is a fuzzy match.
     * @param {string} text The text to search in.
     * @param {string} pattern The pattern to look for in text.
     * @returns {number} The index of the match or -1 if there isn't one.
     */
    _computeFuzzyMatch(text: string, pattern: string): number;
    /**
     * Processes the results we get back from the speech server.  Decides whether the results
     * are good enough to keep. If they are, resolves the 'Listen and Wait' blocks promise and cleans up.
     * @param {object} result The transcription result.
     * @private
     */
    private _processTranscriptionResult;
    /**
     * Decide whether the pattern given matches the text. Uses fuzzy matching
     * @param {string} pattern The pattern to look for.  Usually this is the transcription result
     * @param {string} text The text to look in. Usually this is the set of phrases from the when I hear blocks
     * @returns {boolean} true if there is a fuzzy match.
     * @private
     */
    private _speechMatches;
    /**
     * Kick off the listening process.
     * @private
     */
    private _startListening;
    /**
     * Resume listening for audio and re-open the socket to send data.
     * @private
     */
    private _resumeListening;
    /**
     * Does all setup to get microphone data and initializes the web socket.
     * that data to the speech server.
     * @private
     */
    private _initListening;
    /**
     * Initialize the audio context and connect the microphone.
     * @private
     */
    private _initializeMicrophone;
    /**
     * Sets up the script processor and the web socket.
     * @private
     *
     */
    private _initScriptNode;
    /**
     * Sets up callback for when socket and audio are initialized.
     * @private
     */
    private _newWebsocket;
    _micStream: any;
    /**
     * Do setup so we can start streaming mic data.
     * @private
     */
    private _startByteStream;
    /**
     * @returns {object} Metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    /**
     * Start the listening process if it isn't already in progress.
     * @return {Promise} A promise that will resolve when listening is complete.
     */
    listenAndWait(): Promise<any>;
    /**
     * An edge triggered hat block to listen for a specific phrase.
     * @param {object} args - the block arguments.
     * @return {boolean} true if the phrase matches what was transcribed.
     */
    whenIHearHat(args: object): boolean;
    /**
     * Reporter for the last heard phrase/utterance.
     * @return {string} The lastest thing we heard from a listen and wait block.
     */
    getSpeech(): string;
}
