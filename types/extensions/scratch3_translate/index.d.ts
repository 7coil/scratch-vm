export = Scratch3TranslateBlocks;
/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
declare class Scratch3TranslateBlocks {
    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY(): string;
    /**
     * Language code of the viewer, based on their locale.
     * @type {string}
     * @private
     */
    private _viewerLanguageCode;
    /**
     * List of supported language name and language code pairs, for use in the block menu.
     * Filled in by getInfo so it is updated when the interface language changes.
     * @type {Array.<object.<string, string>>}
     * @private
     */
    private _supportedLanguages;
    /**
     * A randomly selected language code, for use as the default value in the language menu.
     * Properly filled in getInfo so it is updated when the interface languages changes.
     * @type {string}
     * @private
     */
    private _randomLanguageCode;
    /**
     * The result from the most recent translation.
     * @type {string}
     * @private
     */
    private _translateResult;
    /**
     * The language of the text most recently translated.
     * @type {string}
     * @private
     */
    private _lastLangTranslated;
    /**
     * The text most recently translated.
     * @type {string}
     * @private
     */
    private _lastTextTranslated;
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    /**
     * Computes a list of language code and name pairs for the given language.
     * @param {string} code The language code to get the list of language pairs
     * @return {Array.<object.<string, string>>} An array of languge name and
     *   language code pairs.
     * @private
     */
    private _getSupportedLanguages;
    /**
     * Get the human readable language value for the reporter block.
     * @return {string} the language name of the project viewer.
     */
    getViewerLanguage(): string;
    /**
     * Get the viewer's language code.
     * @return {string} the language code.
     */
    getViewerLanguageCode(): string;
    /**
     * Get a language code from a block argument. The arg can be a language code
     * or a language name, written in any language.
     * @param  {object} arg A block argument.
     * @return {string} A language code.
     */
    getLanguageCodeFromArg(arg: object): string;
    /**
     * Translates the text in the translate block to the language specified in the menu.
     * @param {object} args - the block arguments.
     * @return {Promise} - a promise that resolves after the response from the translate server.
     */
    getTranslate(args: object): Promise<any>;
}
